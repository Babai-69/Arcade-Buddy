import React, { useState, useEffect } from 'react';
import { Play, Pointer, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export function LabLimitAnimation({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [mode, setMode] = useState<'auto' | 'manual'>('manual');
  const [labs, setLabs] = useState<('success' | 'failed')[]>([]);
  const [status, setStatus] = useState<'safe' | 'warning' | 'expired'>('safe');
  const maxLabs = 15;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (mode === 'auto') {
      if (labs.length < maxLabs) {
        timeout = setTimeout(() => {
          const newLabs = [...labs, Math.random() > 0.2 ? 'success' : 'failed'] as ('success' | 'failed')[];
          setLabs(newLabs);
          if (newLabs.length >= 15) setStatus('expired');
          else if (newLabs.length >= 12) setStatus('warning');
          else setStatus('safe');
        }, 800); // Fast simulation
      } else {
        // Reset after a delay when limit reached
        timeout = setTimeout(() => {
          setLabs([]);
          setStatus('safe');
        }, 3000);
      }
    }
    return () => clearTimeout(timeout);
  }, [mode, labs]);

  const toggleMode = (newMode: 'auto' | 'manual') => {
    setMode(newMode);
    setLabs([]);
    setStatus('safe');
  };

  const addLab = (type: 'success' | 'failed') => {
    if (labs.length < maxLabs) {
      const newLabs = [...labs, type];
      setLabs(newLabs);
      if (newLabs.length >= 15) setStatus('expired');
      else if (newLabs.length >= 12) setStatus('warning');
      else setStatus('safe');
    }
  };

  const remaining = maxLabs - labs.length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-all duration-300">
      <div className="p-6 md:p-8">
        
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">New Lab Limits - 15 labs/24 hours:</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            As per the new lab limits on Google Cloud Skills Boost - to prevent misuse of the platform, any user can <strong className="text-slate-900 dark:text-white">ONLY complete 15 labs per 24 hours.</strong> Once this limit expires, you will receive <strong className="text-slate-900 dark:text-white">1 NEW lab attempt every 2 hours.</strong> You can find more detailed information on this in our FAQs here.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
            Once you are near your 15th lab in the last 24 hours, you will also receive <strong className="text-blue-600 dark:text-blue-400">the following warning</strong> from the platform using which you can effectively track your labs usage and plan your lab time for the future.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-lg inline-flex">
            <button 
              onClick={() => toggleMode('auto')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'auto' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'}`}
            >
              <Play className="w-4 h-4" /> Auto Demo
            </button>
            <button 
              onClick={() => toggleMode('manual')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'}`}
            >
              <Pointer className="w-4 h-4" /> Try it yourself
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex-1 w-full">
            <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-start">
              {Array.from({ length: maxLabs }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    i < labs.length 
                      ? (labs[i] === 'success' ? 'bg-[#34A853]' : 'bg-[#EA4335]') 
                      : 'bg-slate-200 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {mode === 'manual' && labs.length < maxLabs && (
              <div className="flex gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => addLab('success')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Complete Lab
                </button>
                <button 
                  onClick={() => addLab('failed')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium text-sm"
                >
                  <XCircle className="w-4 h-4 text-[#EA4335]" /> Failed Lab
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-64 shrink-0">
            <div className={`p-6 rounded-xl text-center border-2 transition-colors duration-300 ${
              status === 'safe' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
              status === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
              'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}>
              {status === 'safe' && (
                <>
                  <CheckCircle className="w-8 h-8 text-[#34A853] mx-auto mb-2" />
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{remaining} labs remaining</p>
                </>
              )}
              {status === 'warning' && (
                <>
                  <AlertTriangle className="w-8 h-8 text-[#FBBC05] mx-auto mb-2" />
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">Almost at limit ({remaining} left)</p>
                </>
              )}
              {status === 'expired' && (
                <>
                  <XCircle className="w-8 h-8 text-[#EA4335] mx-auto mb-2" />
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">Quota expired!</p>
                </>
              )}
            </div>
          </div>
        </div>

        {status === 'expired' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                ⏳ Wait 24 hrs
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Full 15 labs reset. Timer starts from FIRST lab of day, NOT from midnight.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                🔄 +1 lab every 2 hrs
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Partial restore after hitting limit. You'll gradually earn back attempts.
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#4285F4]/10 border border-[#4285F4]/20 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="w-6 h-6 text-[#4285F4] shrink-0" />
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">While waiting, complete Lab-free Courses</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">They don't use lab attempts and still count toward your milestones!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
            <p className="font-bold text-slate-800 dark:text-white text-sm mb-1">Failed labs count</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Every attempt uses a slot</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
            <p className="font-bold text-slate-800 dark:text-white text-sm mb-1">Not midnight reset</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Timer from your first lab</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
            <p className="font-bold text-slate-800 dark:text-white text-sm mb-1">Lab-free courses</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Always available, no attempts used</p>
          </div>
        </div>

      </div>
    </div>
  );
}
