import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, BookOpen, Star, HelpCircle, Gamepad2, Cloud, Shield, Instagram, Github, Linkedin, Twitter, Users, User, UserCheck, Youtube, ExternalLink, Mail } from 'lucide-react';
import footerLogo from '../../assets/images/regenerated_image_1782574219934.png';

export function Footer() {
  const buildDate = new Date(typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : Date.now());
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(buildDate);
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata',
  }).format(buildDate);

  return (
    <footer className="glass-card mt-24 border-t dark:border-slate-800 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={footerLogo} alt="Google Cloud" className="w-[30px] h-[26px] object-contain flex-shrink-0" />
                <span className="font-display font-bold text-lg">Google Cloud Arcade Buddy</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
                Master Cloud Skills. Earn Badges & Bonus Points. Unlock Exclusive Google Cloud Rewards through the Facilitator Program 2026.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/dey_babai001/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://github.com/Arcade-With-Us/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/abir-dey-a34914254/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
                  <Send className="w-5 h-5" />
                </a>
                <a href="https://x.com/abir_dey18" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-md">
              <Link to="/support" className="flex items-center justify-between p-3.5 rounded-xl bg-purple-50 dark:bg-slate-900/50 border border-purple-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-slate-800 transition-colors group">
                 <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 min-w-0 pr-2">
                    <span className="text-red-500 dark:text-red-400 text-base font-bold flex-shrink-0">❓</span> 
                    <span className="text-slate-700 dark:text-slate-300">Have a question or need assistance?</span>
                 </div>
                 <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-400 group-hover:translate-x-1 transition-transform bg-purple-200 dark:bg-purple-500/20 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">Raise a query →</span>
              </Link>
              <Link to="/feedback" className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 dark:bg-slate-900/50 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors group">
                 <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 min-w-0 pr-2">
                    <span className="text-blue-500 dark:text-blue-400 text-base flex-shrink-0">💙</span> 
                    <span className="text-slate-700 dark:text-slate-300">We'd love to hear your thoughts.</span>
                 </div>
                 <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-400 group-hover:translate-x-1 transition-transform bg-blue-200 dark:bg-blue-500/20 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">Share your feedback →</span>
              </Link>
            </div>

            {/* System Stats Section */}
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl p-3.5 border border-white/20 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-bold text-lg">1,290</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">Total Visits</span>
              </div>
              <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl p-3.5 border border-white/20 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-green-500 dark:text-green-400 fill-current flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-bold text-lg whitespace-nowrap">4.5 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">out of 5</span></span>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">Average Rating</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/facilitator" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><BookOpen className="w-4 h-4 text-[#4285F4] flex-shrink-0"/> About Program</Link></li>
              <li><Link to="/leaderboard" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><Star className="w-4 h-4 text-[#FBBC04] flex-shrink-0"/> Leaderboard</Link></li>
              <li><Link to="/syllabus" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><BookOpen className="w-4 h-4 text-[#34A853] flex-shrink-0"/> Syllabus</Link></li>
              <li><a href="/resources/point-system" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><Star className="w-4 h-4 text-[#EA4335] flex-shrink-0"/> Points System</a></li>
              <li><Link to="/faq" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><HelpCircle className="w-4 h-4 text-[#4285F4] flex-shrink-0"/> FAQs</Link></li>
              <li><Link to="/resources" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><span className="w-4 h-4 flex items-center justify-center text-sm flex-shrink-0">💡</span> Resources</Link></li>
              <li><a href="/swags" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><Gamepad2 className="w-4 h-4 text-[#34A853] flex-shrink-0"/> Swags</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#4285F4] whitespace-nowrap transition-colors"><Shield className="w-4 h-4 text-[#EA4335] flex-shrink-0"/> Privacy Policy</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 font-display">Community</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#4285F4] whitespace-nowrap transition-colors">
                  <Send className="h-4 w-4 text-[#4285F4] flex-shrink-0" /> Telegram Group
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#34A853] whitespace-nowrap transition-colors">
                  <MessageCircle className="h-4 w-4 text-[#34A853] flex-shrink-0" /> WhatsApp Group
                </a>
              </li>
              <li>
                <a href="https://discuss.google.dev/tag/learning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#EA4335] whitespace-nowrap transition-colors">
                  <Cloud className="h-4 w-4 text-[#EA4335] flex-shrink-0" /> GDG Announcements
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#FBBC04] whitespace-nowrap transition-colors">
                  <span className="flex-shrink-0">📧</span> Contact Us
                </Link>
              </li>
              <li>
                <a href="https://www.youtube.com/@ARCADEWITHUS_We" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#FF0000] whitespace-nowrap transition-colors">
                  <Youtube className="h-4 w-4 text-[#FF0000] flex-shrink-0" /> YouTube Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Official Portals & Official Support Section */}
          <div className="md:col-span-2 lg:col-span-3 space-y-5 text-left">
            <div>
              <h4 className="font-display font-black italic tracking-wider text-xs uppercase text-slate-800 dark:text-slate-200 mb-3 whitespace-nowrap">
                Official Portals
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://go.cloudskillsboost.google/arcade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors font-medium group whitespace-nowrap"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                    <span>Google Cloud Arcade</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://rsvp.withgoogle.com/events/arcade-facilitator/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors font-medium group whitespace-nowrap"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                    <span>Arcade Facilitator</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800 pt-3.5">
              <h4 className="font-display font-black italic tracking-wider text-xs uppercase text-slate-800 dark:text-slate-200 mb-2.5 whitespace-nowrap">
                Official Support
              </h4>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-normal whitespace-nowrap">Facilitator Support:</span>
                  <a
                    href="mailto:arcade-facilitator@google.com"
                    className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-[#4285F4] dark:hover:text-[#60A5FA] hover:underline transition-colors whitespace-nowrap text-[12px] sm:text-[12.5px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8] flex-shrink-0" />
                    <span>arcade-facilitator@google.com</span>
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-normal whitespace-nowrap">Skills Boost Support:</span>
                  <a
                    href="mailto:support-skills@google.com"
                    className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-[#4285F4] dark:hover:text-[#60A5FA] hover:underline transition-colors whitespace-nowrap text-[12px] sm:text-[12.5px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8] flex-shrink-0" />
                    <span>support-skills@google.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col items-center justify-between text-sm text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-4 md:mb-0 gap-4">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p>© 2026 Arcade. All rights reserved.</p>
              <p className="text-xs text-slate-400">Last Updated: {formattedDate} at {formattedTime} IST</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
              <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms</Link>
              <Link to="/code-of-conduct" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Code of Conduct</Link>
              <Link to="/program-tncs" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Program TnCs</Link>
            </div>
          </div>
          <p className="mt-6 md:mt-4 font-medium text-center w-full border-t border-slate-200 dark:border-slate-800 pt-6">
            Made with ❤️ by <a href="https://www.linkedin.com/in/abir-dey-a34914254/" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-[#4285F4] transition-colors underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4">Abir Dey</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
