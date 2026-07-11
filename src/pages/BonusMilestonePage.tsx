import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Award, Clock, AlertCircle, CheckCircle2, UserCheck, ShieldCheck, Target, Layers, Cloud, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BonusMilestonePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/facilitator" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#4285F4] dark:text-slate-400 dark:hover:text-[#4285F4] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Facilitator Program
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBBC05]/10 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-6 border border-[#FBBC05]/20">
              <Award className="w-4 h-4" />
              Bonus Milestone
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              How to Earn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-[#FBBC05]">+10 Points</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 font-medium leading-relaxed max-w-3xl">
              The Facilitator Program now has a second way to earn Bonus Points. Complete it and you'll also come away having built your <strong className="text-slate-900 dark:text-white">first AI agent</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Time Needed</p>
                  <p className="font-bold text-slate-900 dark:text-white">~1 day (if done in order)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Prerequisite</p>
                  <p className="font-bold text-slate-900 dark:text-white">Official Enrollment Email</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Important Note</h3>
                <p className="text-amber-800/90 dark:text-amber-200/90 text-sm leading-relaxed">
                  Points are only credited once your submission (Step 4) is verified. Google's submission form is currently listed as <strong>"Opening Soon"</strong> — you can complete Steps 1–3 now, but final credit depends on when submissions open.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-12" />

          {/* Eligibility Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-[#4285F4]" />
              Are you eligible?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">You need all three of these before you can start:</p>

            <div className="grid gap-4">
              <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Enrolled in the Facilitator Cohort</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">You must be an actively enrolled participant in the Facilitator 2026 cohort.</p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md">
                    <UserCheck className="w-3.5 h-3.5" /> Check your enrollment confirmation email
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">GEAR Badge on Developer Profile</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">You've earned the GEAR badge on your Google Developer Profile (separate from your Skills Boost profile).</p>
                  <a href="https://developers.google.com/program/gear" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 px-3 py-1.5 rounded-md transition-colors">
                    Sign up for GEAR <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Reached Milestone 1</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">You've reached Milestone 1 in the regular points system.</p>
                  <Link to="/facilitator" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4285F4] bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-1.5 rounded-md transition-colors">
                    Check Points System <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-6 px-4 border-l-2 border-slate-200 dark:border-slate-700">
              Our calculator on the Facilitator page can auto-check #3 for you from your public profile. #1 and #2 aren't publicly visible, so you'll confirm those yourself.
            </p>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-12" />

          {/* Steps Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-[#34A853]" />
              The 4 steps to earn the +10 points
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] bg-[#4285F4] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10 font-bold text-lg">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Complete GEAR Badges</h3>
                    <span className="text-xs font-bold text-[#4285F4] bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Under 5 hrs</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    These are part of the Gemini Enterprise Agent Ready (GEAR) program and also count toward your normal points total, so there's no tradeoff.
                  </p>
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-sm border border-slate-100 dark:border-slate-700/50">
                    <div className="flex gap-2 text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" /> <span><strong>Badge 1:</strong> <a href="https://www.skills.google/course_templates/1586" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline">Create Your First Gemini Enterprise Application</a></span></div>
                    <div className="flex gap-2 text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" /> <span><strong>Badge 2:</strong> <a href="https://www.skills.google/course_templates/1596" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline">Engineer AI Agents with Agent Development Kit (ADK)</a></span></div>
                    <div className="flex gap-2 text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" /> <span><strong>Badge 3:</strong> <a href="https://www.skills.google/course_templates/1445" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline">Deploy Multi-Agent Architectures</a></span></div>
                    <div className="flex gap-2 text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" /> <span><strong>Badge 4:</strong> <a href="https://www.skills.google/course_templates/1682" target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline">Orchestrate Multi-agent Workflows with Gemini Enterprise</a></span></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] bg-[#EA4335] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10 font-bold text-lg">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sign up for Free Trial</h3>
                    <span className="text-xs font-bold text-[#EA4335] bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Under 10 mins</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    This gets you $300 in Google Cloud credit (local currency) for 90 days, so you can build without worrying about cost.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex gap-2"><Cloud className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> You'll need a card to sign up, but <strong>you won't be charged</strong> unless you manually upgrade.</li>
                    <li className="flex gap-2"><Cloud className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> <strong>Skip this step only if</strong> you already have a billing account under your enrolled email.</li>
                    <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-[#EA4335] shrink-0 mt-0.5" /> <strong className="text-slate-800 dark:text-slate-200">Important:</strong> you must use the email address you enrolled in the program with.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] bg-[#34A853] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10 font-bold text-lg">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Build your first AI agent</h3>
                    <span className="text-xs font-bold text-[#34A853] bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Under 10 mins</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    Using Vertex AI (Agent Platform), you'll build a simple working agent — it's a short guided project, not a full build from scratch.
                  </p>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p>After building it, you'll be asked to grant permission to a verifier email so your agent's creation can be confirmed. Don't skip that part.</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] bg-[#FBBC05] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 z-10 font-bold text-lg">
                  4
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Submit your Details</h3>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Under 5 mins</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    Your last step is verification. You'll submit:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <li><strong className="text-slate-900 dark:text-white">Project ID</strong> — the same project where you built your agent</li>
                    <li><strong className="text-slate-900 dark:text-white">Billing Account ID</strong> — from your project's Billing section (format: <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[#EA4335]">XXXXXX-XXXXXX-XXXXXX</code>)</li>
                  </ul>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                    <Send className="w-4 h-4" /> Submissions opening soon!
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Where your calculator stands</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Your <strong>potential total</strong> on this site will only include the +10 once Steps 1–4 above are marked complete. Reaching a milestone (Milestone 1, 2, 3, or Ultimate) on its own does <strong>not</strong> add the +10 automatically — that's a separate achievement with its own steps, shown above.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

