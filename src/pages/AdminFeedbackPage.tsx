import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { onAuthStateChanged } from 'firebase/auth';

const MOOD_COLORS: Record<string, string> = {
  'Frustrated': '#ef4444',
  'Meh': '#f59e0b',
  'Good': '#3b82f6',
  'Loving it': '#10b981'
};
const DEFAULT_COLOR = '#8b5cf6';

export function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
      if (user) {
        setIsAdmin(true); // Actual rule check happens on Firestore side
        fetchFeedbacks();
      } else {
        setIsAdmin(false);
        setLoading(false);
        setError('You must be logged in as an administrator to view this page.');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const feedbacksRef = collection(db, 'feedbacks');
      const q = query(feedbacksRef);
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt descending
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setFeedbacks(data);
    } catch (err: any) {
      console.error("Error fetching feedbacks:", err);
      setError(err.message || 'Failed to fetch feedback data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin && !loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">You need administrator privileges to view this dashboard.</p>
        </div>
      </div>
    );
  }

  // Calculate stats for charts
  const generalFeedbacks = feedbacks.filter(f => f.type === 'general' || !f.type);
  
  const moodCounts = generalFeedbacks.reduce((acc, curr) => {
    const mood = curr.mood || 'Unspecified';
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodData = Object.entries(moodCounts).map(([name, value]) => ({
    name,
    value
  }));

  const chipCounts = generalFeedbacks.reduce((acc, curr) => {
    if (curr.chips && Array.isArray(curr.chips)) {
      curr.chips.forEach((chip: string) => {
        acc[chip] = (acc[chip] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const chipData = Object.entries(chipCounts)
    .map(([name, value]) => ({ name, count: value }))
    .sort((a, b) => (Number(b.count) || 0) - (Number(a.count) || 0));

  // Pagination calculations
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Feedback Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Monitor user sentiment and feature requests. {currentUserEmail && <span className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded ml-2">Logged in as {currentUserEmail}</span>}
            </p>
          </div>
          <button
            onClick={fetchFeedbacks}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

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
        ) : loading && feedbacks.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mood Chart */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">User Sentiment (Mood)</h3>
                <div className="h-64 w-full">
                  {moodData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={moodData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {moodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={MOOD_COLORS[entry.name] || DEFAULT_COLOR} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">No mood data available</div>
                  )}
                </div>
              </div>

              {/* Topics Chart */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Feedback Topics (Tags)</h3>
                <div className="h-64 w-full">
                  {chipData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chipData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                        <RechartsTooltip 
                          cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500">No topic data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Responses ({feedbacks.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Sentiment/Priority</th>
                      <th className="px-6 py-4 font-semibold">Review/Text</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {paginatedFeedbacks.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                          No feedback submitted yet.
                        </td>
                      </tr>
                    ) : (
                      paginatedFeedbacks.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'roadmap' 
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                            }`}>
                              {item.type || 'general'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {item.type === 'roadmap' ? (
                              <div className="font-medium text-slate-900 dark:text-white">Anonymous</div>
                            ) : (
                              <>
                                <div className="font-medium text-slate-900 dark:text-white">{item.name || 'Anonymous'}</div>
                                <div className="text-xs text-slate-500">{item.email}</div>
                              </>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {item.type === 'roadmap' ? (
                              <>
                                <div className="font-medium text-slate-900 dark:text-white">{item.category}</div>
                                <div className="text-xs text-slate-500">{item.priority}</div>
                              </>
                            ) : (
                              <>
                                <div className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                                  {item.rating}/5 <span className="text-amber-500">★</span>
                                </div>
                                <div className="text-xs text-slate-500">{item.mood}</div>
                              </>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <p className="max-w-md truncate" title={item.review || item.text}>
                              {item.review || item.text || '-'}
                            </p>
                            {item.chips && item.chips.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.chips.map((chip: string, idx: number) => (
                                  <span key={idx} className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-300">
                                    {chip}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, feedbacks.length)} of {feedbacks.length} entries
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
