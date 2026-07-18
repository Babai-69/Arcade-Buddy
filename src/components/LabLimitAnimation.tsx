import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle, Info, Play, Pointer } from 'lucide-react';

interface LabLimitAnimationProps {
  defaultOpen?: boolean;
}

export function LabLimitAnimation({ defaultOpen = false }: LabLimitAnimationProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [labs, setLabs] = useState<('success' | 'failed')[]>([]);
  const [status, setStatus] = useState<'safe' | 'warning' | 'expired'>('safe');
  const maxLabs = 15;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen && mode === 'auto') {
      if (labs.length < maxLabs) {
        timeout = setTimeout(() => {
          // Randomly fail ~20% of the time to simulate 2-3 failed out of 15
          const isFailed = Math.random() < 0.2;
          const newLabs = [...labs, isFailed ? 'failed' : 'success'] as ('success' | 'failed')[];
          setLabs(newLabs);
          
          if (newLabs.length >= 15) setStatus('expired');
          else if (newLabs.length >= 12) setStatus('warning');
          else setStatus('safe');
        }, 800);
      } else if (labs.length === maxLabs) {
        timeout = setTimeout(() => {
          setLabs([]);
          setStatus('safe');
        }, 3000);
      }
    }
    return () => clearTimeout(timeout);
  }, [isOpen, mode, labs]);

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
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white text-lg">Daily Lab Limit — How it works</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>

      {isOpen && (
        <div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-700">
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
      )}
    </div>
  );
}
