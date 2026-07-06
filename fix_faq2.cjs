const fs = require('fs');
const content = fs.readFileSync('temp_faq_dump.tsx', 'utf8');

const regexCol1 = /const faqsCol1 = \[\s*([\s\S]*?)\s*\];\s*const faqsCol2/;
const regexCol2 = /const faqsCol2 = \[\s*([\s\S]*?)\s*\];\s*export function FaqPage/;

const m1 = content.match(regexCol1);
const m2 = content.match(regexCol2);

const newFaqs = require('./new_faqs.json');
let extraArrayStr = '';
let counter = 10;
newFaqs.forEach(faq => {
    let ansStr = '';
    if (faq.answer.includes('\n')) {
        let partsAns = faq.answer.split('\n');
        ansStr = `(\n      <div className="space-y-2">\n${partsAns.map(p => `        <p>${p.replace(/"/g, '&quot;')}</p>`).join('\n')}\n      </div>\n    )`;
    } else {
        ansStr = `"${faq.answer.replace(/"/g, '\\"')}"`;
    }
    
    extraArrayStr += `  {
    id: "new_${counter}",
    question: "${faq.question.replace(/"/g, '\\"')}",
    answer: ${ansStr}
  },\n`;
    counter++;
});

const newFaqFileContent = `import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const allFaqs = [
${m1[1]},
${m2[1]},
${extraArrayStr}
];

export function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return allFaqs;
    return allFaqs.filter(faq => {
      const qText = faq.question.toLowerCase();
      // For JSX elements, we could extract text, but let's just search the question for simplicity
      // since the prompt says "filter through frequently asked questions" (which usually means titles).
      // We'll also try to match answer if it's a string.
      const aText = typeof faq.answer === 'string' ? faq.answer.toLowerCase() : '';
      return qText.includes(q) || aText.includes(q);
    });
  }, [searchQuery]);

  const { leftCol, rightCol } = useMemo(() => {
    const left: typeof allFaqs = [];
    const right: typeof allFaqs = [];
    filteredFaqs.forEach((faq, index) => {
      if (index % 2 === 0) {
        left.push(faq);
      } else {
        right.push(faq);
      }
    });
    return { leftCol: left, rightCol: right };
  }, [filteredFaqs]);

  const renderFAQ = (faq: { id: string, question: string, answer: React.ReactNode }) => (
    <div key={faq.id} className="border border-slate-200/50 dark:border-slate-800/50 rounded-xl bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden text-left hover:bg-white/60 dark:hover:bg-slate-900/50 transition-colors duration-300">
      <button 
        onClick={() => toggle(faq.id)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3 pr-4">
          <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">?</div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{faq.question}</span>
        </div>
        <ChevronDown className={\`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 \${openId === faq.id ? 'rotate-180' : ''}\`} />
      </button>
      
      <AnimatePresence>
        {openId === faq.id && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm pl-14">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto pt-24 pb-20 px-4">
      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 mb-4 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-[#8b5cf6]" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Find answers to common queries about the program, rewards, and eligibility</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No questions found matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-blue-500 hover:underline font-medium">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="space-y-4">
              {leftCol.map(renderFAQ)}
            </div>
            <div className="space-y-4">
              {rightCol.map(renderFAQ)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/FaqPage.tsx', newFaqFileContent);
