import React, { useEffect, useState, useMemo } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { AlertCircle, Clock, CheckCircle2, ExternalLink, Search, Filter, Download, CheckSquare, Square, X, Maximize2, Mail, Paperclip, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export function AdminQueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; name: string } | null>(null);

  const handleReplyEmail = (q: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!q || !q.email) return;

    const recipient = q.email;
    const querySummary = q.queryType || (q.message ? q.message.slice(0, 40) : 'query');
    const subject = `Reply on your ${querySummary}`;
    
    const body = `Hi ${q.name || 'there'},

Thank you for reaching out to Arcade Buddy Support regarding your query:
"${q.message || ''}"

[Type your response here]

---
Best regards,
Arcade Buddy Support Team
support.arcadebuddy@gmail.com`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedQuery, setSelectedQuery] = useState<any | null>(null);

  const fetchQueries = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, 'queries'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setQueries(data);
    } catch (err: any) {
      console.error("Error fetching queries:", err);
      setError(err.message || "Failed to load queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
      if (user) {
        fetchQueries();
      } else {
        setLoading(false);
        setError("You must be logged in as an administrator to view this page.");
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      await updateDoc(doc(db, 'queries', id), {
        status: currentStatus === 'resolved' ? 'pending' : 'resolved'
      });
      fetchQueries();
    } catch(e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  const queryTypes = useMemo(() => {
    return Array.from(new Set(queries.map(q => q.queryType).filter(Boolean)));
  }, [queries]);

  const filteredQueries = queries.filter(q => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (q.name || '').toLowerCase().includes(term) || 
      (q.email || '').toLowerCase().includes(term) || 
      (q.message || '').toLowerCase().includes(term) ||
      (q.id || '').toLowerCase().includes(term);
    
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'resolved' 
        ? q.status === 'resolved' 
        : q.status !== 'resolved';
    
    const matchesType = typeFilter === 'all' ? true : q.queryType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const exportToCSV = () => {
    if (filteredQueries.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Type', 'Status', 'Submitted At', 'Message', 'Profile URL'];
    const rows = filteredQueries.map(q => {
      const date = q.createdAt ? new Date(q.createdAt.seconds * 1000).toLocaleString() : '';
      return [
        q.id,
        `"${(q.name || '').replace(/"/g, '""')}"`,
        `"${(q.email || '').replace(/"/g, '""')}"`,
        `"${(q.queryType || '').replace(/"/g, '""')}"`,
        q.status || 'pending',
        `"${date}"`,
        `"${(q.message || '').replace(/"/g, '""')}"`,
        `"${(q.profileUrl || '').replace(/"/g, '""')}"`
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `queries_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bulkResolve = async () => {
    if (selectedIds.size === 0) return;
    try {
      const promises = Array.from(selectedIds).map(id => 
        updateDoc(doc(db, 'queries', id), { status: 'resolved' })
      );
      await Promise.all(promises);
      setSelectedIds(new Set());
      fetchQueries();
    } catch(e) {
      console.error(e);
      alert("Failed to bulk resolve");
    }
  };

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };
  
  const toggleAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIds.size === filteredQueries.length && filteredQueries.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredQueries.map(q => q.id)));
    }
  };

  const totalCount = queries.length;
  const resolvedCount = queries.filter(q => q.status === 'resolved').length;
  const pendingCount = totalCount - resolvedCount;
  
  const chartData = [
    { name: 'Resolved', value: resolvedCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#f59e0b' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Queries Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and resolve user support tickets. {currentUserEmail && <span className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded ml-2">Logged in as {currentUserEmail}</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={fetchQueries} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            Refresh
          </button>
        </div>
      </div>

      {!error && !loading && queries.length > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center shadow-sm">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Queries</span>
            <span className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{totalCount}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center shadow-sm">
            <span className="text-sm font-medium text-amber-600 dark:text-amber-500">Pending</span>
            <span className="text-4xl font-bold text-amber-700 dark:text-amber-400 mt-2">{pendingCount}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center shadow-sm">
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">Resolved</span>
            <span className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">{resolvedCount}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 h-32 flex items-center justify-center shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {!error && !loading && queries.length > 0 && (
        <div className="mb-6 flex flex-col gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search tickets by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 sm:w-auto w-full">
              <div className="relative flex-1 sm:flex-initial sm:w-40">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="relative flex-1 sm:flex-initial sm:w-48">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Types</option>
                  {queryTypes.map(type => (
                    <option key={String(type)} value={String(type)}>{String(type)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <button onClick={toggleAll} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                {selectedIds.size === filteredQueries.length && filteredQueries.length > 0 ? (
                  <CheckSquare className="w-5 h-5 text-blue-500" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                Select All
              </button>
              <span className="text-sm text-slate-500">
                {selectedIds.size} selected
              </span>
            </div>
            {selectedIds.size > 0 && (
              <button 
                onClick={bulkResolve}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Bulk Resolve
              </button>
            )}
          </div>
        </div>
      )}

      {error ? (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="text-sm mt-1">
              This usually means you are logged in with an unauthorized email address. 
              <br/>Your current email: <strong>{currentUserEmail || 'Not logged in or Anonymous'}</strong>
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredQueries.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {queries.length === 0 ? 'Inbox Zero!' : 'No matches found.'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {queries.length === 0 ? 'No support queries found.' : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredQueries.map(q => {
            const createdAt = q.createdAt ? new Date(q.createdAt.seconds * 1000) : new Date();
            const timePassedMs = Date.now() - createdAt.getTime();
            const hoursPassed = timePassedMs / (1000 * 60 * 60);
            const hoursRemaining = Math.max(0, 48 - hoursPassed);
            
            const isRed = hoursRemaining < 2;
            const isYellow = hoursRemaining < 24 && hoursRemaining >= 2;
            const isGreen = hoursRemaining >= 24;
            const isOverdue = hoursRemaining === 0 && q.status !== 'resolved';

            let timerColorClass = "";
            if (isRed) {
              timerColorClass = "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
            } else if (isYellow) {
              timerColorClass = "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
            } else {
              timerColorClass = "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
            }

            const timeRemainingText = hoursRemaining === 0 
              ? 'OVERDUE' 
              : `${Math.floor(hoursRemaining)}h ${Math.floor((hoursRemaining % 1) * 60)}m remaining`;
            
            const isSelected = selectedIds.has(q.id);
            
            let rowClasses = "group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ";
            
            if (isSelected) {
              rowClasses += "bg-blue-50/80 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 ring-1 ring-blue-500/50";
            } else if (q.status === 'resolved') {
              rowClasses += "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800/80";
            } else if (isOverdue) {
              rowClasses += "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 hover:bg-red-100/50 dark:hover:bg-red-900/20";
            } else if (isYellow) {
              rowClasses += "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/20";
            } else {
              rowClasses += "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50";
            }

            return (
              <div 
                key={q.id} 
                onClick={() => setSelectedQuery(q)}
                className={rowClasses}
              >
                <div onClick={(e) => toggleSelection(q.id, e)} className="shrink-0 p-2 text-slate-400 hover:text-blue-500 transition">
                  {isSelected ? <CheckSquare className="w-5 h-5 text-blue-500" /> : <Square className="w-5 h-5" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{q.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium shrink-0">
                      {q.queryType}
                    </span>
                    {((q.images && q.images.length > 0) || (q.attachments && q.attachments.length > 0) || q.imageUrl) && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-[11px] font-bold shrink-0">
                        <Paperclip className="w-3 h-3" />
                        <span>{(q.images?.length || q.attachments?.length || 1)} Screenshot{(q.images?.length || q.attachments?.length || 1) > 1 ? 's' : ''}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {q.email} • {q.message}
                  </p>

                  {/* Reply Button Section */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => handleReplyEmail(q, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-sm transition cursor-pointer"
                      title={`Reply to ${q.email} from support.arcadebuddy@gmail.com`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </button>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      To: {q.email}
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-3">
                  {q.status !== 'resolved' ? (
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${timerColorClass}`}>
                      <Clock className="w-3 h-3" />
                      {timeRemainingText}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3 h-3" />
                      RESOLVED
                    </div>
                  )}
                  <Maximize2 className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedQuery(null)}>
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedQuery.name}</h2>
                <a href={`mailto:${selectedQuery.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">{selectedQuery.email}</a>
              </div>
              <button onClick={() => setSelectedQuery(null)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Type: {selectedQuery.queryType}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedQuery.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}`}>
                  Status: {selectedQuery.status || 'pending'}
                </span>
                {selectedQuery.createdAt && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Submitted: {new Date(selectedQuery.createdAt.seconds * 1000).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Message</h4>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-100 dark:border-slate-800 leading-relaxed">
                  {selectedQuery.message}
                </div>
              </div>

              {selectedQuery.profileUrl && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Profile Link</h4>
                  <a href={selectedQuery.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                    <ExternalLink className="w-4 h-4" /> Open Cloud Skills Profile
                  </a>
                </div>
              )}

              {/* Uploaded Attachments / Screenshots Section */}
              {(() => {
                const rawImages: any[] = [
                  ...(Array.isArray(selectedQuery.images) ? selectedQuery.images : []),
                  ...(Array.isArray(selectedQuery.attachments) ? selectedQuery.attachments : [])
                ];
                if (selectedQuery.imageUrl && !rawImages.some(i => (i.dataUrl || i.url) === selectedQuery.imageUrl)) {
                  rawImages.push({ name: 'Screenshot', dataUrl: selectedQuery.imageUrl, url: selectedQuery.imageUrl });
                }

                if (rawImages.length === 0) return null;

                return (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/80">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Uploaded Proof / Screenshots ({rawImages.length})</span>
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click image to inspect / enlarge</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {rawImages.map((img: any, idx: number) => {
                        const src = img.dataUrl || img.url || '';
                        const name = img.name || `Screenshot ${idx + 1}`;
                        const sizeKb = img.size ? `${Math.round(img.size / 1024)} KB` : '';
                        return (
                          <div
                            key={idx}
                            className="group relative bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                          >
                            <div
                              className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative cursor-pointer overflow-hidden flex items-center justify-center"
                              onClick={() => setLightboxImage({ url: src, name })}
                              title="Click to view full image"
                            >
                              {src ? (
                                <img
                                  src={src}
                                  alt={name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                                />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-400" />
                              )}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition gap-1.5 text-white text-xs font-bold backdrop-blur-[1px]">
                                <ZoomIn className="w-4 h-4" />
                                <span>Inspect</span>
                              </div>
                            </div>

                            <div className="p-2.5 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={name}>
                                  {name}
                                </span>
                                {sizeKb && <span className="text-[10px] text-slate-400 font-mono shrink-0">{sizeKb}</span>}
                              </div>

                              <div className="flex gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setLightboxImage({ url: src, name })}
                                  className="flex-1 py-1 px-2 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-[11px] font-bold text-center transition cursor-pointer"
                                >
                                  Preview
                                </button>
                                <a
                                  href={src}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={name}
                                  className="py-1 px-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-[11px] font-bold text-center transition flex items-center gap-1 cursor-pointer"
                                  title="Open in new window"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
            
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleReplyEmail(selectedQuery)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                title={`Opens compose to ${selectedQuery.email} using support.arcadebuddy@gmail.com`}
              >
                <Mail className="w-4 h-4" />
                Reply via Email (support.arcadebuddy@gmail.com)
              </button>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedQuery(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    toggleStatus(selectedQuery.id, selectedQuery.status || 'pending');
                    setSelectedQuery({
                      ...selectedQuery,
                      status: selectedQuery.status === 'resolved' ? 'pending' : 'resolved'
                    });
                  }}
                  className={`px-6 py-2 text-white font-bold rounded-lg transition ${selectedQuery.status === 'resolved' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                  {selectedQuery.status === 'resolved' ? 'Mark as Pending' : 'Mark as Resolved'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-resolution Attachment Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden p-2 flex flex-col shadow-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm truncate pr-4">
                <ImageIcon className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{lightboxImage.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={lightboxImage.name}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title="Close screenshot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-3 overflow-auto flex items-center justify-center flex-1 max-h-[75vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.name}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-slate-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
