import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Can I still earn Arcade points now that the Facilitator program cohort ended?',
    a: 'Yes, absolutely! The Facilitator cohort concluded on September 14, 2026, but the Google Cloud Arcade program itself runs continuously through December 31, 2026. Any active Arcade games, Basecamp badges, and skill badges you complete will continue to accumulate toward your total Arcade points for the 2027 Prize Counter.',
  },
  {
    q: 'How do Skill Badges and Arcade Games convert into Arcade Points?',
    a: 'Each Arcade Game is worth 1 full Arcade Point. Skill Badges are worth 0.5 Arcade Points each (meaning 2 Skill Badges equal 1 Arcade Point). Facilitator milestones awarded additional bonus point multipliers during the facilitator window.',
  },
  {
    q: 'When does the Prize Counter open and how do I claim swags?',
    a: 'The official Prize Counter is scheduled to open in early January 2027 (approx. January 7, 2027). During the redemption window, you will receive an invitation email on your registered Google Skills Boost email address to log in and order official Google Cloud swags corresponding to your earned point tier.',
  },
  {
    q: 'Are the hands-on labs on Google Cloud Skills Boost free to complete?',
    a: 'Yes! Participating in the Google Cloud Arcade provides free access or monthly credit passes to all qualifying Arcade games, quests, and skill badge challenge labs without requiring a paid credit card.',
  },
  {
    q: 'Where can I see my live position and point tally?',
    a: 'You can check our Live Leaderboard to see ranked participants, or use the interactive Calculator to simulate your current badges and see which swag tier you have reached.',
  },
];

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-display">
            Quick Intel
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Clear answers to common questions about points, deadlines, and prize redemptions.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-750 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 font-display">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-750">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <span>Looking for more detailed program guidelines? </span>
          <Link
            to="/faq"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Visit the Full FAQ Directory</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
