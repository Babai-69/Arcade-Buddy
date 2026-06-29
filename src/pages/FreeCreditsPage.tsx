import React from 'react';
import { Gift, Video, Link as LinkIcon, CheckCircle2, ArrowRight, AlertTriangle, Lightbulb, PlayCircle, ExternalLink } from 'lucide-react';

export function FreeCreditsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-16">
      {/* Header */}
      <div className="w-full bg-[#8b5cf6] py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <Gift className="w-12 h-12 text-white mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display leading-tight">
            How to Claim Google Skills Credits<br />Worth $309 for FREE
          </h1>
          <p className="text-lg text-white/90 font-medium mb-8">
            Follow these simple steps to successfully claim your 309 free credits
          </p>
          <a href="#steps" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full font-medium transition-colors">
            <CheckCircle2 className="w-5 h-5" />
            Complete Step-by-Step Guide
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Watch the Video Tutorial */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Watch the Video Tutorial</h2>
          <p className="text-slate-400">Follow along with this step-by-step video guide</p>
          
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-black">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/JA4RqST1DMQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>

        {/* Special Credit Link */}
        <div className="bg-[#1e293b] border border-orange-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-orange-500" />
                Special Credit Link
              </h3>
              <p className="text-slate-400 text-sm">Use this exclusive link to receive your <strong className="text-green-400">309 credits</strong></p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400">Last updated & verified: <strong className="text-white">February 2026</strong></span>
              </div>
            </div>
            <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 self-start md:self-center">
              <CheckCircle2 className="w-3 h-3" /> WORKING
            </div>
          </div>
          
          <div className="mt-6 bg-[#0f172a] rounded-xl border border-slate-700 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-sm break-all w-full text-slate-300">
              <span className="text-blue-400">https://www.skills.google/catalog?</span><span className="text-orange-400 bg-orange-500/10 px-1 py-0.5 rounded">qlcampaign=1m-cloud-39</span>
            </div>
            <a 
              href="https://www.cloudskillsboost.google/catalog?qlcampaign=1m-cloud-39"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
            >
              Open Link <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            What You'll Get
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">9</div>
              <div className="text-sm text-slate-400 font-medium">Initial Credits</div>
            </div>
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">300</div>
              <div className="text-sm text-slate-400 font-medium">Bonus Credits</div>
            </div>
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 text-center bg-gradient-to-b from-[#0f172a] to-blue-900/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">309</div>
              <div className="text-sm text-slate-400 font-medium">Total Credits</div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div id="steps" className="pt-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Step-by-Step Guide</h2>
          <div className="space-y-4">
            
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">1</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-red-400" /> Sign Out of Your Google Skills Account
                  </h4>
                  <p className="text-slate-400 text-sm">Before starting, make sure you log out of your Google Skills account. This is important to ensure the credits are applied correctly.</p>
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 flex gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-sm text-yellow-500/90 font-medium"><strong>Important:</strong> This step is crucial! Credits may not apply if you're already logged in.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">2</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-400" /> Open the Special Credit Link
                  </h4>
                  <p className="text-slate-400 text-sm">Visit the exclusive link provided above or in the video description.</p>
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 flex gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-sm text-yellow-500/90 font-medium"><strong>Important:</strong> This link contains a special code at the end of the URL, which is required to activate the credits.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">3</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-green-400" /> Sign In to Your Google Skills Account
                  </h4>
                  <p className="text-slate-400 text-sm">Once the link opens, sign in using your Google account, or your email and password manually.</p>
                  <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-sm text-blue-300"><strong>Tip:</strong> Use the same account you plan to complete Skill Badges.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">4</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-400" /> Receive Initial Credits
                  </h4>
                  <p className="text-slate-400 text-sm">After signing in through the special link, you will automatically receive 9 credits in your account.</p>
                  <div className="inline-flex bg-purple-900/50 text-purple-300 px-3 py-1 rounded text-xs font-bold border border-purple-700/50">
                    9 Credits
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">5</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">L</div> Complete One Lab from the Catalog
                  </h4>
                  <p className="text-slate-400 text-sm">To unlock the remaining credits, from the Google Skills Catalog, search for 'hands on'. Select 'A Tour of Google Cloud Hands-on Labs' (recommended for beginners).</p>
                  <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-sm text-blue-300"><strong>Tip:</strong> This lab is perfect for beginners and takes about 3-5 minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">6</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Finish the Lab with 100% Score
                  </h4>
                  <p className="text-slate-400 text-sm">Complete the selected lab and ensure you achieve a 100/100 score. This may include opening the Google Cloud Console, assigning permissions to a principal, and enabling a required API.</p>
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 flex gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-sm text-yellow-500/90 font-medium"><strong>Important:</strong> Partial completion will not unlock the remaining credits.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0 mt-1">7</div>
                <div className="space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" /> Verify Your Total Credits
                  </h4>
                  <p className="text-slate-400 text-sm">After ending the lab, visit the Billing / Payments page of your Google Skills Account and confirm that 300 additional credits have been added.</p>
                  <div className="inline-flex bg-teal-900/50 text-teal-300 px-3 py-1 rounded text-xs font-bold border border-teal-700/50">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" /> 309 Total Credits
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-[#0a1914] border border-green-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Pro Tips for Success
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
              <p className="text-slate-300 text-sm"><strong className="text-white">Always sign out first</strong> - This is the most common reason credits don't apply</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
              <p className="text-slate-300 text-sm"><strong className="text-white">Use the special link</strong> - The code at the end of the URL is essential</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
              <p className="text-slate-300 text-sm"><strong className="text-white">Complete the lab 100%</strong> - Follow all instructions carefully for full credit</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
              <p className="text-slate-300 text-sm"><strong className="text-white">Check your billing page</strong> - Verify credits are added after completing the lab</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
              <p className="text-slate-300 text-sm"><strong className="text-white">Be patient</strong> - Sometimes credits take a few minutes to appear</p>
            </li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="space-y-6 pt-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions (FAQs)</h2>
            <p className="text-slate-400 text-sm">Get answers to common questions about claiming credits</p>
          </div>
          
          <div className="bg-[#1e293b] border border-blue-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">1. Why do I need to sign out before opening the credit link?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">You must sign out of your Google Skills account first. Opening the link while logged in may prevent the credits from being applied correctly.</p>
          </div>

          <div className="bg-[#1e293b] border border-green-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">2. How many credits will I receive?</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
              <li>You'll receive <strong className="text-pink-400">9 credits</strong> immediately after signing in through the special link.</li>
              <li>After completing one lab with 100% progress, an additional <strong className="text-green-400">300 credits</strong> will be added — making a total of <strong className="text-blue-400">309 credits</strong>.</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] border border-orange-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">3. Which lab should I complete to unlock the remaining credits?</h4>
            <p className="text-sm text-slate-400 mb-4">You can complete any eligible lab, but we recommend:</p>
            <div className="bg-[#0f172a] border border-orange-900/50 rounded-lg p-4">
              <p className="text-orange-400 font-bold mb-1">"A Tour of Google Cloud Hands-on Labs"</p>
              <p className="text-xs text-slate-500">It's quick, beginner-friendly, and works reliably.</p>
            </div>
          </div>

          <div className="bg-[#1e293b] border border-purple-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">4. What are these credits used for?</h4>
            <p className="text-sm text-slate-400 mb-4">These credits can be used to:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Complete paid Google Cloud labs
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Earn Skill Badges
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Progress in Google Skills Arcade challenges
              </li>
            </ul>
          </div>

          <div className="bg-[#1e293b] border border-cyan-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">5. How long are these credits valid?</h4>
            <div className="flex items-start gap-2 mb-4">
              <div className="bg-blue-500/20 p-1 rounded-full shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <p className="text-sm text-slate-300">The credits are valid for <strong className="text-blue-400">6 months</strong> from the date of redemption.</p>
            </div>
            <div className="bg-[#0f172a] border border-blue-900/50 rounded-lg p-3 flex gap-2">
              <Lightbulb className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-sm text-blue-300"><strong>Tip:</strong> You can check the exact expiry date in the Billing / Payments page of your Google Skills account.</p>
            </div>
          </div>

          <div className="bg-[#1e293b] border border-red-800/50 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">6. I completed the lab but didn't get the credits. What should I do?</h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-slate-300 mb-6">
              <li>Ensure the lab shows <strong className="text-white">100% completion</strong>, then refresh your Billing / Payments page.</li>
              <li>If the credits don't appear immediately, wait a few minutes and check again.</li>
            </ul>
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-4">
              <p className="text-sm text-slate-400"><strong className="text-white">Still having issues?</strong> Join our community channels for support and troubleshooting help.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
