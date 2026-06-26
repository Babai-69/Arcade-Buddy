import React from 'react';
import { Check } from 'lucide-react';

export function DeliveryTimelineCard() {
  return (
    <div className="w-full h-full rounded-2xl p-6 shadow-sm border-l-4 border-l-[#e53e3e] border-r-4 border-r-[#38a169] overflow-hidden relative group timeline-card bg-[#f8faff] dark:bg-slate-900" style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <style>{`
        .timeline-card {
          --n-bg: #f8faff;
        }
        :global(.dark) .timeline-card, html.dark .timeline-card, .dark .timeline-card {
          --n-bg: #0f172a;
        }

        @keyframes drawLineCycle {
          0%, 95%, 100% { width: 0%; }
          5%, 30% { width: 33.33%; }
          35%, 60% { width: 66.66%; }
          65%, 90% { width: 100%; }
        }

        @keyframes drawLineMobileCycle {
          0%, 95%, 100% { height: 0%; }
          5%, 30% { height: 33.33%; }
          35%, 60% { height: 66.66%; }
          65%, 90% { height: 100%; }
        }

        @keyframes truckRideCycle {
          0%, 95%, 100% { left: 0%; }
          5%, 30% { left: 33.33%; }
          35%, 60% { left: 66.66%; }
          65%, 90% { left: 100%; }
        }

        @keyframes truckRideMobileCycle {
          0%, 95%, 100% { top: 0%; }
          5%, 30% { top: 33.33%; }
          35%, 60% { top: 66.66%; }
          65%, 90% { top: 100%; }
        }

        @keyframes truckBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes node2Style {
          0%, 2% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
          5%, 16%, 28% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 0 rgba(59,91,219,0.4); }
          10%, 22% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 8px rgba(59,91,219,0); }
          30%, 90% { background-color: #16a34a; border-color: #16a34a; color: transparent; box-shadow: none; }
          95%, 100% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
        }
        @keyframes node2Icon {
          0%, 28% { opacity: 0; }
          30%, 90% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes node2Text {
          0%, 28% { opacity: 1; }
          30%, 90% { opacity: 0; }
          95%, 100% { opacity: 1; }
        }

        @keyframes node3Style {
          0%, 32% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
          35%, 46%, 58% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 0 rgba(59,91,219,0.4); }
          40%, 52% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 8px rgba(59,91,219,0); }
          60%, 90% { background-color: #16a34a; border-color: #16a34a; color: transparent; box-shadow: none; }
          95%, 100% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
        }
        @keyframes node3Icon {
          0%, 58% { opacity: 0; }
          60%, 90% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes node3Text {
          0%, 58% { opacity: 1; }
          60%, 90% { opacity: 0; }
          95%, 100% { opacity: 1; }
        }

        @keyframes node4Style {
          0%, 62% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
          65%, 76%, 88% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 0 rgba(59,91,219,0.4); }
          70%, 82% { background-color: var(--n-bg); border-color: #3b5bdb; color: #3b5bdb; box-shadow: 0 0 0 8px rgba(59,91,219,0); }
          90%, 90% { background-color: #16a34a; border-color: #16a34a; color: transparent; box-shadow: none; }
          95%, 100% { background-color: var(--n-bg); border-color: #d1d5db; color: #9ca3af; box-shadow: none; }
        }
        @keyframes node4Icon {
          0%, 88% { opacity: 0; }
          90%, 90% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes node4Text {
          0%, 88% { opacity: 1; }
          90%, 90% { opacity: 0; }
          95%, 100% { opacity: 1; }
        }

        @keyframes shimmerSweep { 
          from { left: -60%; } to { left: 110%; } 
        }

        .anim-line-h { animation: drawLineCycle 20s ease-in-out infinite; }
        .anim-line-v { animation: drawLineMobileCycle 20s ease-in-out infinite; }
        .anim-truck-h { animation: truckRideCycle 20s ease-in-out infinite, truckBounce 0.6s ease-in-out infinite; }
        .anim-truck-v { animation: truckRideMobileCycle 20s ease-in-out infinite, truckBounce 0.6s ease-in-out infinite; }
        .node-2 { animation: node2Style 20s linear infinite; }
        .node-2-icon { animation: node2Icon 20s linear infinite; }
        .node-2-txt { animation: node2Text 20s linear infinite; }
        .node-3 { animation: node3Style 20s linear infinite; }
        .node-3-icon { animation: node3Icon 20s linear infinite; }
        .node-3-txt { animation: node3Text 20s linear infinite; }
        .node-4 { animation: node4Style 20s linear infinite; }
        .node-4-icon { animation: node4Icon 20s linear infinite; }
        .node-4-txt { animation: node4Text 20s linear infinite; }
      `}</style>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-0 text-left">Reward delivery logistics</h2>
      </div>

      <div className="relative mt-4 mb-6">
        
        {/* Horizontal timeline (desktop) */}
        <div className="hidden sm:block relative py-6">
          <div className="absolute top-[32px] left-[12.5%] right-[12.5%]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="absolute top-0 left-0 h-[2px] bg-blue-600 rounded-full anim-line-h"></div>
            <div className="absolute top-[-15px] w-8 h-8 -ml-4 text-2xl flex items-center justify-center anim-truck-h z-20">🚚</div>
          </div>
          
          <div className="grid grid-cols-4 relative z-10 w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="text-center mt-1">
                <div className="text-[9px] font-bold text-green-600 uppercase tracking-wider mb-1">DEC 2026</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Programme<br/>completion</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 node-2 relative overflow-hidden">
                <span className="node-2-txt absolute inset-0 flex items-center justify-center font-bold text-sm">2</span>
                <Check className="w-5 h-5 text-white absolute node-2-icon" />
              </div>
              <div className="text-center mt-1">
                <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1">JAN 2027</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Prize counter<br/><span className="text-[9px] font-normal text-slate-500">(Tentative opening)</span></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 node-3 relative overflow-hidden">
                <span className="node-3-txt absolute inset-0 flex items-center justify-center font-bold text-sm">3</span>
                <Check className="w-5 h-5 text-white absolute node-3-icon" />
              </div>
              <div className="text-center mt-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Post-email</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Address verification<br/>& confirmation</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 node-4 relative overflow-hidden">
                <span className="node-4-txt absolute inset-0 flex items-center justify-center font-bold text-sm">4</span>
                <Check className="w-5 h-5 text-white absolute node-4-icon" />
              </div>
              <div className="text-center mt-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dispatch</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Shipping<br/>begins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical timeline (mobile) */}
        <div className="block sm:hidden relative py-2 pl-4">
          <div className="absolute left-[33px] top-[24px]" style={{ height: 'calc(100% - 48px)' }}>
            <div className="absolute top-0 left-0 w-[2px] h-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-[2px] bg-blue-600 rounded-full anim-line-v"></div>
            <div className="absolute left-[-16px] w-8 h-8 -mt-4 text-2xl flex items-center justify-center anim-truck-v z-20">🚚</div>
          </div>
          
          <div className="flex flex-col gap-8 relative z-10 pl-16">
            {/* Step 1 */}
            <div className="flex items-center relative h-8">
              <div className="absolute -left-16 w-8 h-8 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center shrink-0 top-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-green-600 uppercase tracking-wider mb-1">DEC 2026</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Programme completion</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center relative h-8">
              <div className="absolute -left-16 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 node-2 overflow-hidden top-0">
                <span className="node-2-txt absolute inset-0 flex items-center justify-center font-bold text-xs">2</span>
                <Check className="w-4 h-4 text-white absolute node-2-icon" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1">JAN 2027</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Prize counter <span className="text-[9px] font-normal text-slate-500">(Tentative opening)</span></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center relative h-8 mt-4">
              <div className="absolute -left-16 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 node-3 overflow-hidden top-0">
                <span className="node-3-txt absolute inset-0 flex items-center justify-center font-bold text-xs">3</span>
                <Check className="w-4 h-4 text-white absolute node-3-icon" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Post-email</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Address verification & confirmation</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center relative h-8 mt-4">
              <div className="absolute -left-16 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 node-4 overflow-hidden top-0">
                <span className="node-4-txt absolute inset-0 flex items-center justify-center font-bold text-xs">4</span>
                <Check className="w-4 h-4 text-white absolute node-4-icon" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dispatch</div>
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-tight">Shipping begins</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-4 bg-blue-600 border border-blue-500 rounded-xl p-4 flex items-center justify-center gap-3 relative overflow-hidden transition-all">
        <div className="absolute top-0 left-[-60%] w-[40%] h-full bg-gradient-to-r from-transparent cursor-pointer via-white/30 to-transparent z-10" style={{ animation: 'shimmerSweep 2.4s ease-in-out 2.5s infinite' }}></div>
        <span className="text-2xl z-20">🚚</span>
        <div className="text-left z-20">
          <div className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-0.5">Estimated delivery time</div>
          <div className="text-[13px] font-medium text-white">2–3 months after confirmation</div>
        </div>
      </div>
    </div>
  );
}
