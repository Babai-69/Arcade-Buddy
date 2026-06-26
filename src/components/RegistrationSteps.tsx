import React from 'react';
import { UserPlus, Bell, PlayCircle, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up on Google Skills & make your profile public.',
    btnText: 'Sign Up',
    link: 'https://www.cloudskillsboost.google/',
    bgClass: 'bg-[#4285F4]',
    hoverClass: 'hover:bg-blue-600',
    textClass: 'text-[#4285F4]',
  },
  {
    step: 2,
    icon: Bell,
    title: 'Subscribe Arcade',
    description: 'Subscription to receive important updates.',
    btnText: 'Subscribe Here!',
    link: 'https://forms.gle/2h6xCvY3sW29pw4p7',
    bgClass: 'bg-[#34A853]',
    hoverClass: 'hover:bg-green-600',
    textClass: 'text-[#34A853]',
  },
  {
    step: 3,
    icon: PlayCircle,
    title: 'Start Learning',
    description: 'Begin your journey with games and skill badges.',
    btnText: 'Play Now',
    link: 'https://www.youtube.com/@ARCADEWITHUS_We',
    bgClass: 'bg-[#EA4335]',
    hoverClass: 'hover:bg-red-600',
    textClass: 'text-[#EA4335]',
  },
  {
    step: 4,
    icon: Activity,
    title: 'Track Progress',
    description: 'Monitor achievements using Calculator.',
    btnText: 'Calculate Now',
    link: '/dashboard',
    bgClass: 'bg-[#FBBC05]',
    hoverClass: 'hover:bg-yellow-600',
    textClass: 'text-[#FBBC05]',
  },
];

export function RegistrationSteps() {
  return (
    <section className="py-20 relative bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">
            How to Get Started with Google Cloud Arcade?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Follow these simple steps to begin your gamified learning adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, i) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center relative shadow-sm border border-slate-100 dark:border-slate-700/50"
            >
              {/* Step number badge */}
              <div 
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-md ${st.bgClass}`}
              >
                {st.step}
              </div>

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center">
                <st.icon className={`w-8 h-8 ${st.textClass}`} />
              </div>

              <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">{st.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                {st.description}
              </p>

              <a
                href={st.link}
                target={st.link.startsWith('http') ? '_blank' : '_self'}
                rel={st.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`inline-flex items-center justify-center w-full gap-2 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${st.bgClass} ${st.hoverClass}`}
              >
                {st.btnText} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
