import React from 'react';
import { Link } from 'react-router-dom';
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

      {/* View FAQ Button */}
      <div className="flex justify-center mt-16 mb-8">
         <Link to="/faq" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-3">
           <HelpCircle className="w-6 h-6" /> 
           <span className="text-lg">View Frequently Asked Questions</span>
         </Link>
      </div>
    </div>
  );
}
