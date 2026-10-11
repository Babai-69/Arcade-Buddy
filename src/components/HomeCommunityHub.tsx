import React from 'react';
import { Send, MessageCircle, Youtube, Cloud, Users, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const communities = [
  {
    name: 'Telegram Discussion',
    desc: 'Instant lab assistance, arcade announcements, and peer support.',
    members: '2,500+ Members',
    href: 'https://t.me/arcadebuddy',
    icon: Send,
    iconColor: 'text-[#0088cc]',
    iconBg: 'bg-[#0088cc]/10',
    btnText: 'Join Telegram',
  },
  {
    name: 'WhatsApp Community',
    desc: 'Active study group sharing daily arcade lab tips and milestones.',
    members: '1,000+ Members',
    href: 'https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l',
    icon: MessageCircle,
    iconColor: 'text-[#25D366]',
    iconBg: 'bg-[#25D366]/10',
    btnText: 'Join WhatsApp',
  },
  {
    name: 'YouTube Guide Channel',
    desc: 'Watch step-by-step video walkthroughs for tricky Arcade quests.',
    members: 'Video Guides',
    href: 'https://www.youtube.com/@ARCADEWITHUS_We',
    icon: Youtube,
    iconColor: 'text-[#FF0000]',
    iconBg: 'bg-[#FF0000]/10',
    btnText: 'Watch Guides',
  },
  {
    name: 'GDG Announcements',
    desc: 'Official Google Developer Group events, webinars, and updates.',
    members: 'Official Forum',
    href: 'https://discuss.google.dev/tag/learning',
    icon: Cloud,
    iconColor: 'text-[#4285F4]',
    iconBg: 'bg-[#4285F4]/10',
    btnText: 'Visit Forum',
  },
];

export function HomeCommunityHub() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-display">
            Mentorship & Support
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Learn Together, Never Get Stuck
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Connect with thousands of fellow Google Cloud learners, facilitators, and mentors across our active social and technical groups.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl p-6 bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {item.members}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
              >
                <span>{item.btnText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Direct Query Assistance Card */}
        <div className="mt-8 rounded-2xl p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white dark:from-slate-800/70 dark:via-indigo-950/20 dark:to-slate-900 border border-blue-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Have a specific question about badges or points?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Submit a query ticket and our facilitator community will assist you.</p>
            </div>
          </div>
          <Link
            to="/support"
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 text-xs font-semibold shadow-2xs hover:bg-blue-50 dark:hover:bg-slate-750 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Raise a Query Ticket →
          </Link>
        </div>
      </div>
    </section>
  );
}
