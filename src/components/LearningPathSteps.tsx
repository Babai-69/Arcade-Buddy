import React from 'react';
import { ArrowRight, ExternalLink, ShieldCheck, Compass, Award, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Activate Skills Boost Profile',
    description: 'Create your account on Google Cloud Skills Boost, enable your public profile, and access hands-on lab credits.',
    actionLabel: 'Skills Boost Portal',
    href: 'https://www.cloudskillsboost.google/',
    isExternal: true,
  },
  {
    num: '02',
    title: 'Complete Hands-on Labs',
    description: 'Solve interactive quests and earn verified digital skill badges across Cloud Architecture, DevOps, and Generative AI.',
    actionLabel: 'Explore Syllabus',
    href: '/syllabus',
    isExternal: false,
  },
  {
    num: '03',
    title: 'Track Points & Milestones',
    description: 'Use the Arcade Buddy calculator to tally badge conversions, check facilitator bonuses, and monitor your leaderboard rank.',
    actionLabel: 'Open Calculator',
    href: '/calculator',
    isExternal: false,
  },
  {
    num: '04',
    title: 'Redeem Official Swags',
    description: 'When the Prize Counter opens in early 2027, exchange your accumulated points for exclusive Google Cloud merchandise.',
    actionLabel: 'Swag Guide',
    href: '/swags',
    isExternal: false,
  },
];

export function LearningPathSteps() {
  return (
    <section className="py-16 md:py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-display">
            The Roadmap
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            How Google Cloud Arcade Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            A step-by-step pathway from zero cloud experience to earning industry-recognized badges and authentic Google merchandise.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xl sm:text-2xl font-black text-blue-600/80 dark:text-blue-400/80">
                    {step.num}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div>
                {step.isExternal ? (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{step.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={step.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
