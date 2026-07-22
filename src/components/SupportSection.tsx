import React from 'react';
import { Mail, Clock, Youtube, MessageCircle, Send, HelpCircle, ExternalLink, AlertCircle } from 'lucide-react';

export function SupportSection() {
  return (
    <div className="w-full text-left mt-16 font-sans">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
        Get In <span className="text-[#F15A24] dark:text-[#F15A24]">Touch</span>
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-10 max-w-3xl leading-relaxed">
        Have questions about calculating your points, need help troubleshooting a public profile URL, or want to share feedback? Our community-driven team is here to support you.
      </p>

      {/* Top Row: Email & Response Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Direct Support Email */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[#F15A24]" />
            <h3 className="text-lg font-bold text-[#F15A24]">Direct Support Email</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 relative z-10 max-w-xl">
            For primary assistance, bug submissions, or collaborative opportunities, write to our official email address. Make sure to attach screenshots of your browser console or include your exact Skills Boost public URL to expedite diagnostics.
          </p>
          <div className="bg-[#F15A24] text-white font-bold px-6 py-3 rounded-lg inline-block text-sm relative z-10">
            abir.facilitator@gmail.com
          </div>
          
          {/* Faded Background Icon */}
          <Mail className="absolute -bottom-6 -right-6 w-48 h-48 text-slate-100 dark:text-white/[0.02] -rotate-12 pointer-events-none" />
        </div>

        {/* Response Hours */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-green-500 uppercase tracking-wide text-sm">RESPONSE HOURS</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1">Email Response Timeline:</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Typically within 24 to 48 operational business hours.
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1">Quick Chat Support:</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Directly ask questions inside the comments section on our YouTube videos.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 font-bold text-xs mt-2">
              <AlertCircle className="w-4 h-4" /> Non-Stop Active Monitoring
            </div>
          </div>
        </div>
      </div>

      {/* Companion Learning Platform */}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Companion Learning Platform</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* YouTube */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center shrink-0">
              <Youtube className="w-5 h-5 text-red-500" />
            </div>
            <h4 className="font-bold text-red-500">ARCADE WITH US (YouTube)</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
            Our premier learning pipeline offering visual solution guides, challenge lab debugging tactics, and deep-dives on newly released Google Cloud Arcade Games. Join thousands of cloud learners interacting and asking questions daily.
          </p>
          <a href="https://www.youtube.com/@ARCADEWITHUS_We" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-red-500 hover:text-red-600 font-bold text-sm mt-auto group">
            Visit Channel <ExternalLink className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* WhatsApp */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <h4 className="font-bold text-[#25D366]">WhatsApp Channel</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
            Our <strong className="text-slate-900 dark:text-white">primary community</strong> for instant updates, point tracking strategies, quiz discussions, and direct peer support. Get real-time answers from fellow Arcade participants.
          </p>
          <a href="https://whatsapp.com/channel/0029VbCahmFFCCoVQMV7ix1s" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[#25D366] hover:text-green-600 font-bold text-sm mt-auto group">
            Join Community <ExternalLink className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Telegram */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 text-[#0088cc]" />
            </div>
            <h4 className="font-bold text-[#0088cc]">Telegram Community</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
            Get solutions & updates instantly via our Telegram channel. Ask questions, share badge completions, and stay in the loop with all latest Google Cloud Arcade 2026 news.
          </p>
          <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[#0088cc] hover:text-blue-500 font-bold text-sm mt-auto group">
            Join Channel <ExternalLink className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Support FAQ */}
      <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Support Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Q1 */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">How accurate are the points calculated?</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Our scoring logic strictly mirrors the official 2026 Google Cloud Arcade scoring catalogs. It maps active monthly games, skill badges, and milestone parameters precisely. Always ensure your public profile contains the correct matching badge titles to fetch exact results.
            </p>
          </div>
          
          {/* Q2 */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Can the support team manually credit missing points?</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              No. ArcadeBuddy is an independent community project. We do not have access to Google Cloud Skills Boost database servers, qwiklabs infrastructure, or swag distribution consoles. All point adjustments and tier redemptions must occur officially through the Google Cloud program coordinates.
            </p>
          </div>

          {/* Q3 */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">What should I include when reporting a system bug?</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Please email us your Google Cloud Skills Boost public profile URL, list which badge is displaying incorrectly or missing, and note your operating system or browser (Chrome, Safari, Firefox). This details helps us isolate code anomalies and roll out patches rapidly!
            </p>
          </div>

          {/* Q4 */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Is there a cost associated with the solution guides?</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Absolutely not. All resources, solution video companion playlists, catalog links, and points calculations available on this platform are 100% free of charge. We are passionate about promoting cloud education and enabling students across the globe!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
