import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Participant } from '../types';
import { UploadCloud, CheckCircle } from 'lucide-react';

interface AdminPanelProps {
  onUpdateParticipants: (data: Participant[]) => void;
}

export function AdminPanel({ onUpdateParticipants }: AdminPanelProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setSuccess(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as any[];
        
        // Basic mapping and generating IDs. 
        // In a real app we would compute ranks carefully and compare to historical data in DB.
        const parsed: Participant[] = rawData.map((row, idx) => {
          const gameBadges = parseInt(row['# of Arcade Games Completed'] || '0') || 0;
          const triviaBadges = parseInt(row['# of Trivia Games Completed'] || '0') || 0;
          const skillBadges = parseInt(row['# of Skill Badges Completed'] || '0') || 0;
          const arcadePoints = gameBadges + triviaBadges + Math.floor(skillBadges / 2);

          return {
            id: String(idx + 1),
            name: row['User Name'] || row['Name'] || 'Unknown',
            email: row['User Email'] || row['Email'] || '',
            profileUrl: row['Google Cloud Skills Boost Profile URL'] || row['Public Profile URL'] || '',
            skillBadges,
            gameBadges,
            triviaBadges,
            arcadePoints,
            milestoneEarned: row['Milestone Earned'] || 'None',
            dailyPoints: 0,
            totalPoints: arcadePoints,
            lastUpdated: new Date().toISOString(),
            previousRank: 0,
            currentRank: 0,
          };
        });

        // Sort by points to assign currentRank
        parsed.sort((a, b) => b.arcadePoints - a.arcadePoints);
        parsed.forEach((p, index) => {
          p.currentRank = index + 1;
          // Just a mock improvement logic for visual testing
          p.previousRank = p.currentRank + Math.floor(Math.random() * 3);
        });

        onUpdateParticipants(parsed);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
      error: () => {
        setLoading(false);
        alert('Failed to parse CSV');
      }
    });
  };

  return (
    <section className="py-20 mb-10 max-w-2xl mx-auto px-4">
      <div className="glass-panel p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
        <h2 className="text-2xl font-bold font-display mb-2">Admin Dashboard</h2>
        <p className="text-slate-500 mb-8 items-center">Upload latest CSV to update the leaderboard.</p>

        <input 
          type="file" 
          accept=".csv" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-slate-400 border-t-white rounded-full" />
          ) : success ? (
            <><CheckCircle className="h-5 w-5 text-green-500" /> Success</>
          ) : (
            <><UploadCloud className="h-5 w-5" /> Upload CSV Data</>
          )}
        </button>
      </div>
    </section>
  );
}
