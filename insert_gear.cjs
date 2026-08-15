const fs = require('fs');

let code = fs.readFileSync('src/components/FacilitatorSyllabus.tsx', 'utf8');

// Ensure Calendar and Gift are imported
if (!code.includes('Calendar')) {
  code = code.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Calendar, Gift, Zap } from 'lucide-react';");
}

const gearSection = `
        {/* GEAR Badges Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-blue-500 fill-current" /> GEAR Badges - Facilitator 2026
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Earn both on your Google Developer Profile to qualify for Bonus Points when you reach a milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Badge 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1a1d27] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/10"
            >
              {/* Top half: gradient background */}
              <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-600 relative flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-xs font-bold text-blue-600">GEAR</span>
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-amber-900">Required</span>
                </div>
                
                <img 
                  src="https://developers.google.com/static/profile/badges/community/gear/badge.svg" 
                  alt="GEAR Program Enrolment Badge"
                  className="w-28 h-28 object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Bottom half: details */}
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">GEAR Program Enrolment Badge</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Deadline: 14/09/26, 11:59 PM</span>
                </div>
                <a 
                  href="https://developers.google.com/program/gear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  View Badge <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Badge 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#1a1d27] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/10"
            >
              {/* Top half: gradient background */}
              <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-600 relative flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-xs font-bold text-blue-600">GEAR</span>
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-amber-900">Required</span>
                </div>
                
                <img 
                  src="https://developers.google.com/profile/badges/community/gear/arcade/award" 
                  alt="Arcade - GEAR Badge"
                  className="w-32 h-32 object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Bottom half: details */}
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">Arcade - GEAR Badge</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Deadline: 14/09/26, 11:59 PM</span>
                </div>
                <a 
                  href="https://developers.google.com/profile/badges/community/gear/arcade/award"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  View Badge <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Warning Banner */}
          <div className="max-w-4xl mx-auto bg-[#fffbeb] border border-[#fde68a] dark:bg-amber-500/10 dark:border-amber-500/20 rounded-xl p-4 flex gap-4 items-start shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </div>
            <p className="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed">
              Earning BOTH the <a href="https://youtu.be/_vTVDxbVlhQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">GEAR program enrollment badge</a> & <a href="https://youtu.be/HdmX2tQFRVI?si=09aPtP7WVp3A9Xa0" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Arcade - GEAR badge</a> on your Google Developer Profile is <strong>MANDATORY / REQUIRED</strong> for you to be eligible to receive <strong>Bonus Points</strong> when you reach a milestone.
            </p>
          </div>
        </div>

`;

code = code.replace("{/* Arcade Games Section */}", gearSection + "{/* Arcade Games Section */}");

fs.writeFileSync('src/components/FacilitatorSyllabus.tsx', code, 'utf8');

