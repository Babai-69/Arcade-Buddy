import React, { useState, useEffect, useMemo, useRef } from 'react';
import Papa from 'papaparse';
import { collection, doc, writeBatch, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth, loginWithGoogle, loginWithGoogleRedirect, logout } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Search, Clock, ChevronUp, ChevronDown, Minus, Lock, Unlock, UploadCloud, FileText, Trash2, Trophy, Medal, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { ArcadeLoader } from '../components/ArcadeLoader';

const ADMIN_EMAILS = ["deya58690@gmail.com", "tripti.arcade.25@gmail.com"];

export function TrueLeaderboardPage() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // States for uploading
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Dashboard UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [milestoneFilter, setMilestoneFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [accessFilter, setAccessFilter] = useState('');
  const [sortKey, setSortKey] = useState('rank');
  const [sortDir, setSortDir] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => {
      setUser(u);
    });
    
    // Listen to leaderboard changes
    const unsubData = onSnapshot(collection(db, 'leaderboard'), snapshot => {
      const rows = snapshot.docs.map(d => d.data());
      // Handle the case where we save an array inside one doc, or multiple docs.
      // Based on structure: Let's assume we save one document per user for better scaling,
      // but to preserve ranking maybe we just read all docs into one array.
      if (rows.length === 1 && rows[0].participants) {
          // Alternative: stored entirely in one doc
          setData(rows[0].participants);
      } else {
          // Stored as multiple documents
          setData(rows);
      }
      setIsLoading(false);
    }, err => {
      console.error(err);
      setIsLoading(false);
    });

    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // File upload security validation
    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
      alert("Invalid file type. Please upload a CSV file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert("File is too large. Maximum size is 10MB.");
      return;
    }
    
    setUploading(true);
    setUploadStatus('Parsing CSV...');
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: async (results) => {
        const rows = results.data as any[];
        setUploadStatus(`Parsing complete. Found ${rows.length} rows.`);
        await processAndUpload(rows);
      }
    });
  };

  const processAndUpload = async (rows: any[]) => {
    try {
      const processed = rows.map((r) => {
        const skill = parseInt(r['# of Skill Badges Completed']) || 0;
        const game = parseInt(r['# of Arcade Games Completed']) || 0;
        const trivia = parseInt(r['# of Trivia Games Completed']) || 0;
        const lab = parseInt(r['# of Lab-free Courses Completed']) || 0;
        const pts = Math.round(((skill * 0.5) + (game * 1) + (trivia * 1) + (lab * 0.5)) * 10) / 10;
        
        let tier = 'No Tier';
        if (pts >= 120) tier = 'Legend';
        else if (pts >= 95) tier = 'Champion';
        else if (pts >= 75) tier = 'Ranger';
        else if (pts >= 50) tier = 'Trooper';

        let rawMilestone = r['General Milestone Earned'] || r['Milestone Earned'] || 'No Milestone';
        if (rawMilestone === 'None' || rawMilestone === '') rawMilestone = 'No Milestone';

        return {
          id: String(r['User Name'] || Math.random()),
          name: (r['User Name'] || '—').trim(),
          skill,
          game,
          trivia,
          lab,
          milestone: rawMilestone,
          access: r['Access Code Redemption Status'] || 'No',
          points: pts,
          tier,
        };
      });

      const oldRanks: Record<string, number> = {};
      data.forEach(d => {
        if (d.name) oldRanks[d.name] = d.rank;
      });

      // Sort by points to assign rank
      processed.sort((a, b) => b.points - a.points);
      processed.forEach((p, i) => {
        (p as any).rank = i + 1;
        (p as any).previousRank = oldRanks[p.name] || (i + 1);
      });

      setUploadStatus(`Saving to Firebase...`);
      
      // We will store it all in one document for simplicity since it's < 1MB 
      // typically unless there are >10k rows. 
      // If we use multiple, we have to batch them up to 500 at a time and delete old ones.
      // Let's use batches.
      const collRef = collection(db, 'leaderboard');
      const existingDocs = await getDocs(collRef);
      
      // Delete existing
      let batch = writeBatch(db);
      let opCount = 0;
      
      for (const docSnap of existingDocs.docs) {
        batch.delete(docSnap.ref);
        opCount++;
        if (opCount >= 400) {
          await batch.commit();
          batch = writeBatch(db);
          opCount = 0;
        }
      }
      
      // Important to use the document 'data' instead of individual rows? 
      // One doc is much faster and simpler for just reading it all at once!
      // max 1 MB per document. Example row: ~200 bytes. 1MB = 5000 rows.
      // Let's use a single document `data` containing `{ participants: [...] }`.
      await batch.commit();

      const singleDocRef = doc(db, 'leaderboard', 'data');
      await writeBatch(db).set(singleDocRef, { participants: processed, updatedAt: Date.now() }).commit();

      setUploadStatus('Upload successful! Data is live.');
    } catch (err: any) {
      console.error(err);
      setUploadStatus('Error uploading: ' + err.message);
    } finally {
      setTimeout(() => setUploading(false), 3000);
    }
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteData = async () => {
    setUploading(true);
    setUploadStatus('Deleting data...');
    try {
      const collRef = collection(db, 'leaderboard');
      const existingDocs = await getDocs(collRef);
      const batches = [];
      let currentBatch = writeBatch(db);
      let opCount = 0;
      
      existingDocs.docs.forEach((docSnap) => {
        currentBatch.delete(docSnap.ref);
        opCount++;
        if (opCount === 490) {
          batches.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          opCount = 0;
        }
      });
      if (opCount > 0) {
        batches.push(currentBatch.commit());
      }
      await Promise.all(batches);
      setData([]);
      setShowConfirmDelete(false);
      setUploadStatus('Data deleted successfully.');
    } catch (e: any) {
      console.error(e);
      setUploadStatus('Error deleting data: ' + e.message);
    } finally {
      setTimeout(() => { setUploading(false); setUploadStatus(''); }, 3000);
    }
  };

  // ----- Filtering and Sorting -----
  const filtered = useMemo(() => {
    let res = data.filter(r => {
      if (searchTerm && !r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.milestone.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (milestoneFilter && r.milestone !== milestoneFilter) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (accessFilter && r.access !== accessFilter) return false;
      return true;
    });

    res.sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir;
      if (av > bv) return -sortDir;
      return 0;
    });
    return res;
  }, [data, searchTerm, milestoneFilter, tierFilter, accessFilter, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d * -1);
    else {
      setSortKey(key);
      setSortDir(-1);
    }
  };

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  // Stats
  const statTotal = data.length;
  const statActive = data.filter(r => r.access === 'Yes').length;
  const statPoints = Math.round(data.reduce((s, r) => s + r.points, 0) * 10) / 10;
  const statMilestone = data.filter(r => r.milestone !== 'No Milestone').length;

  const top5 = useMemo(() => {
    return [...data].sort((a, b) => b.points - a.points).slice(0, 5);
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-100 dark:bg-[#0b2144] rounded-2xl p-8 mb-10 text-slate-900 dark:text-white max-w-4xl mx-auto shadow-sm border border-slate-200 dark:border-[#1e3a6a] text-center">
         <h2 className="text-3xl md:text-4xl font-bold font-display flex items-center justify-center gap-3 mb-4 text-slate-900 dark:text-white">
           🏆 Arcade Leaderboard 🏆
         </h2>
         <p className="text-slate-700 dark:text-slate-200 text-lg mb-4 max-w-2xl mx-auto font-medium">
           Climb the ranks, earn exclusive rewards, and secure your spot among the top achievers!
         </p>
         <p className="text-[#e29302] dark:text-[#FBBC05] font-semibold text-lg mb-8">
           ✨ Top achievers can earn exclusive vouchers from the Arcade Team. ✨
         </p>
         
         <div className="bg-white dark:bg-[#4d5e75] border border-slate-200 dark:border-white/20 rounded-xl p-6 shadow-sm mb-8">
           <h3 className="text-[#e29302] dark:text-[#FBBC05] font-bold text-xl md:text-2xl mb-2">Want to win exclusive rewards?</h3>
           <p className="text-slate-800 dark:text-white font-medium">Keep earning points and climb the leaderboard to receive Arcade-exclusive rewards!</p>
         </div>

         <div className="bg-[#f4f7fc] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm">
           <div className="bg-[#e4effe] dark:bg-blue-800/50 p-3 rounded-2xl flex-shrink-0">
             <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
           </div>
           <div>
             <div className="flex flex-wrap items-center gap-3 mb-1">
               <h4 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">Daily Leaderboard Update</h4>
               <span className="bg-[#e4effe] dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                 Once Every 24 Hours
               </span>
             </div>
             <p className="text-[13.5px] md:text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1 md:mt-0">
               The leaderboard updates once every 24 hours, specifically between <span className="text-blue-600 dark:text-blue-400 font-bold">1:00 PM and 8:00 PM</span> daily.
             </p>
           </div>
         </div>
      </div>

      {isAdmin && (
        <div className="bg-[#eff4ff] dark:bg-blue-900/20 border-2 border-dashed border-[#93b4fd] dark:border-blue-500/50 rounded-2xl p-8 text-center mb-10 transition-colors">
           <div className="flex justify-center mb-3">
             <UploadCloud className="w-10 h-10 text-blue-500" />
           </div>
           <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Upload Daily CSV</h3>
           <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
             Upload the roster from Google Cloud Skills Boost. Only you can see this panel.
           </p>
           
           <label className="relative inline-flex items-center justify-center cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors">
             <span>Choose CSV File</span>
             <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={uploading} />
           </label>
           {data.length > 0 && (
             <div className="inline-block relative ml-4">
               {!showConfirmDelete ? (
                 <button 
                   onClick={() => setShowConfirmDelete(true)} 
                   disabled={uploading}
                   className="relative inline-flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 font-semibold py-2.5 px-6 rounded-xl transition-colors"
                 >
                   <Trash2 className="w-4 h-4 mr-2" /> Delete Data
                 </button>
               ) : (
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={handleDeleteData} 
                     disabled={uploading}
                     className="relative inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
                   >
                     Confirm
                   </button>
                   <button 
                     onClick={() => setShowConfirmDelete(false)} 
                     disabled={uploading}
                     className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl transition-colors"
                   >
                     Cancel
                   </button>
                 </div>
               )}
             </div>
           )}
           
           {uploadStatus && (
             <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
               {uploadStatus}
             </div>
           )}
        </div>
      )}

      {/* TOP 5 LEADERBOARD */}
      {data.length >= 5 && !isLoading && (
        <div className="mb-16 mt-10 text-center">
          
          <div className="relative flex justify-center items-end gap-3 md:gap-6 max-w-5xl mx-auto h-[320px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/20 dark:bg-yellow-500/10 blur-3xl rounded-full pointer-events-none -z-10"></div>
            {top5[3] && <PodiumStep participant={top5[3]} rank={4} />}
            {top5[1] && <PodiumStep participant={top5[1]} rank={2} />}
            {top5[0] && <PodiumStep participant={top5[0]} rank={1} />}
            {top5[2] && <PodiumStep participant={top5[2]} rank={3} />}
            {top5[4] && <PodiumStep participant={top5[4]} rank={5} />}
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard color="blue" label="Total Participants" value={statTotal} sub="Registered" />
        <StatCard color="green" label="Access Redeemed" value={statActive} sub="Confirmed" />
        <StatCard color="orange" label="Points Earned" value={statPoints} sub="Across all" />
        <StatCard color="purple" label="Milestone Achievers" value={statMilestone} sub="Any milestone" />
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="relative w-full lg:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Search name or milestone..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <SelectFilter value={milestoneFilter} onChange={setMilestoneFilter} defaultLabel="All Milestones" options={['Ultimate Milestone', 'Milestone 3', 'Milestone 2', 'Milestone 1', 'No Milestone']} />
          <SelectFilter value={tierFilter} onChange={setTierFilter} defaultLabel="All Tiers" options={['Legend', 'Champion', 'Ranger', 'Trooper', 'No Tier']} />
          <SelectFilter value={accessFilter} onChange={setAccessFilter} defaultLabel="All Access" options={[{v: 'Yes', l: 'Redeemed'}, {v: 'No', l: 'Not Redeemed'}]} />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm max-w-[1148px] mx-auto w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase text-xs tracking-wider font-semibold">
                <SortableHeader label="RANK" field="rank" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                <SortableHeader label="PARTICIPANT" field="name" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                <SortableHeader label="POINTS" field="points" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                <th className="px-6 py-4">BADGES</th>
                <SortableHeader label="MILESTONE" field="milestone" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                <SortableHeader label="TIER" field="tier" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                <th className="px-6 py-4">ACCESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <ArcadeLoader />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-500">No participants match filters.</td></tr>
              ) : (
                paginated.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-slate-500 dark:text-slate-400">
                       <div className="flex items-center gap-2">
                         <span>{r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `#${r.rank}`}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="font-semibold text-slate-900 dark:text-white">{r.name.trim()}</div>
                       <div className="text-[11px] text-slate-500 mt-0.5">Skill: {r.skill} | Game: {r.game} | Trivia: {r.trivia} | Lab: {r.lab}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-blue-600 dark:text-blue-400">
                       <div className="flex items-center gap-1.5">
                         {r.points}
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex gap-1.5 flex-wrap">
                         {r.skill > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">🎯 {r.skill} Skill</span>}
                         {r.game > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">🎮 {r.game} Game</span>}
                         {r.trivia > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">❓ {r.trivia} Trivia</span>}
                         {r.lab > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">📚 {r.lab} Lab</span>}
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <MilestonePill milestone={r.milestone} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <TierPill tier={r.tier} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                       <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${r.access === 'Yes' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       {r.access === 'Yes' ? 'Redeemed' : 'Pending'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between text-sm">
          <span className="text-slate-500">
             Showing {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Prev</button>
             <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function StatCard({ color, label, value, sub }: any) {
  const clrMap: any = { blue: 'text-blue-600', green: 'text-green-600', orange: 'text-orange-500', purple: 'text-purple-600' };
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 text-left">
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-3xl font-mono font-bold ${clrMap[color]}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  );
}

function SelectFilter({ value, onChange, defaultLabel, options }: any) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-700 dark:text-slate-300">
      <option value="">{defaultLabel}</option>
      {options.map((o: any) => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function SortableHeader({ label, field, sortKey, sortDir, onClick }: any) {
  const isSorted = sortKey === field;
  return (
    <th className="px-6 py-4 cursor-pointer hover:text-blue-500 transition-colors group select-none" onClick={() => onClick(field)}>
      <div className="flex items-center gap-1">
        {label}
        <span className={`text-slate-400 group-hover:text-blue-500 ${isSorted ? 'opacity-100' : 'opacity-30'}`}>
          {isSorted ? (sortDir === 1 ? '↑' : '↓') : '↕'}
        </span>
      </div>
    </th>
  );
}

function MilestonePill({ milestone }: { milestone: string }) {
  let clr = "";
  if (milestone === 'Ultimate Milestone') clr = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  else if (milestone === 'Milestone 3') clr = "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  else if (milestone === 'Milestone 2') clr = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
  else if (milestone === 'Milestone 1') clr = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  else clr = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${clr}`}>{milestone}</span>;
}

function TierPill({ tier }: { tier: string }) {
  let clr = "";
  if (tier === 'Legend') clr = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  else if (tier === 'Champion') clr = "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  else if (tier === 'Ranger') clr = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
  else if (tier === 'Trooper') clr = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  else clr = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${clr}`}>{tier}</span>;
}

function PodiumStep({ participant, rank }: { participant: any; rank: number }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const isThird = rank === 3;
  const isFourth = rank === 4;
  const isFifth = rank === 5;

  let heightClass = "h-[100px]"; 
  let podiumColorClass = "";
  let borderColorClass = "";
  let textColorClass = "";
  let numberTextClass = "text-3xl";

  let pointsColorClass = "";
  let avatarBgColor = '607D8B';
  let avatarBorderClass = "border-slate-200 dark:border-slate-700";
  let hoverGlowClass = "";
  
  if (isFirst) {
    heightClass = "h-[180px]";
    podiumColorClass = "bg-[#FFF5CC] dark:bg-[#433108]";
    borderColorClass = "border-[#FDE047] dark:border-[#a18121]";
    textColorClass = "text-[#EAB308] dark:text-[#FDE047]";
    numberTextClass = "text-5xl font-display font-black";
    pointsColorClass = "bg-[#F59E0B] text-white border-transparent shadow-sm";
    avatarBgColor = "EA580C";
    avatarBorderClass = "border-[#EA580C] border-[3px]";
    hoverGlowClass = "group-hover:shadow-[0_0_40px_rgba(250,204,21,0.6)] group-hover:border-[#FDE047]";
  } else if (isSecond) {
    heightClass = "h-[140px]";
    podiumColorClass = "bg-[#F5F3FF] dark:bg-[#2e264d]";
    borderColorClass = "border-[#DDD6FE] dark:border-[#5b4d99]";
    textColorClass = "text-[#8B5CF6] dark:text-[#DDD6FE]";
    numberTextClass = "text-4xl font-display font-bold";
    pointsColorClass = "bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE] dark:bg-[#2e264d] dark:text-[#DDD6FE] dark:border-[#5b4d99]";
    avatarBgColor = "8B5CF6";
    avatarBorderClass = "border-[#C4B5FD] border-[2px]";
    hoverGlowClass = "group-hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] group-hover:border-[#DDD6FE]";
  } else if (isThird) {
    heightClass = "h-[110px]";
    podiumColorClass = "bg-[#FFFBEB] dark:bg-[#433716]";
    borderColorClass = "border-[#FEF08A] dark:border-[#85712c]";
    textColorClass = "text-[#F59E0B] dark:text-[#FEF08A]";
    numberTextClass = "text-4xl font-display font-bold";
    pointsColorClass = "bg-[#FFFBEB] text-[#F59E0B] border-[#FEF08A] dark:bg-[#433716] dark:text-[#FEF08A] dark:border-[#85712c]";
    avatarBgColor = "F59E0B";
    avatarBorderClass = "border-[#FDE047] border-[2px]";
    hoverGlowClass = "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] group-hover:border-[#FDE047]";
  } else if (isFourth) {
    heightClass = "h-[80px]";
    podiumColorClass = "bg-[#F8FAFC] dark:bg-[#1E293B]";
    borderColorClass = "border-[#E2E8F0] dark:border-[#334155]";
    textColorClass = "text-[#94A3B8] dark:text-[#CBD5E1]";
    numberTextClass = "text-3xl font-display font-bold";
    pointsColorClass = "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#94A3B8] dark:border-[#334155]";
    avatarBgColor = "06B6D4";
    avatarBorderClass = "border-[#E2E8F0] border-[2px]";
    hoverGlowClass = "group-hover:shadow-[0_0_30px_rgba(148,163,184,0.5)] group-hover:border-[#CBD5E1]";
  } else if (isFifth) {
    heightClass = "h-[65px]";
    podiumColorClass = "bg-[#F8FAFC] dark:bg-[#1E293B]";
    borderColorClass = "border-[#E2E8F0] dark:border-[#334155]";
    textColorClass = "text-[#94A3B8] dark:text-[#CBD5E1]";
    numberTextClass = "text-3xl font-display font-bold";
    pointsColorClass = "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#94A3B8] dark:border-[#334155]";
    avatarBgColor = "64748B";
    avatarBorderClass = "border-[#E2E8F0] border-[2px]";
    hoverGlowClass = "group-hover:shadow-[0_0_30px_rgba(148,163,184,0.5)] group-hover:border-[#CBD5E1]";
  }

  // Handle name avatars
  const avatarUrl = participant.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name.trim())}&background=${avatarBgColor}&color=fff&size=128`;
  
  // Animation delay
  const delay = rank * 0.1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`flex flex-col items-center justify-end w-[70px] md:w-[130px] group cursor-pointer`}
    >
      <div className="flex flex-col items-center justify-center mb-3 z-10 w-full relative">
        {isFirst && (
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-10 text-4xl drop-shadow-md z-20 flex justify-center w-full"
          >
            <div className="relative flex items-center justify-center">
              <Crown className="w-8 h-8 text-[#EA580C] fill-[#EA580C]" />
            </div>
          </motion.div>
        )}
        
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className={`rounded-full overflow-hidden bg-white dark:bg-slate-800 shadow-sm ${isFirst ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-16 md:h-16'} ${avatarBorderClass} mb-2`}
        >
           <img src={avatarUrl} alt={participant.name} className="w-full h-full object-cover" />
        </motion.div>
        
        <h3 className="font-bold text-slate-900 dark:text-white text-[10px] md:text-sm mb-1.5 text-center w-[150%] md:w-[130%] truncate px-1">
          {participant.name.trim()}
        </h3>
        
        <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full font-semibold text-[9px] md:text-xs border flex items-center justify-center gap-0.5 md:gap-1 ${pointsColorClass} whitespace-nowrap`}>
          {participant.points} Pts
        </div>
      </div>
      
      <div className={`w-full rounded-t-xl md:rounded-t-2xl border-t border-l border-r transition-all duration-300 ${podiumColorClass} ${borderColorClass} ${hoverGlowClass} flex items-center justify-center relative ${heightClass}`}>
         <span className={`absolute top-[20%] md:top-1/4 ${textColorClass} ${numberTextClass}`}>
           {rank}
         </span>
      </div>
    </motion.div>
  );
}
