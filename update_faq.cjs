const fs = require('fs');
const content = fs.readFileSync('src/pages/FaqPage.tsx', 'utf8');

const replacement = `
type FaqCategory = 'General' | 'Swags' | 'Credits' | 'Eligibility' | 'Labs & Progress';

const getCategory = (faq: {question: string, answer: any}): FaqCategory => {
  const q = faq.question.toLowerCase();
  const a = typeof faq.answer === 'string' ? faq.answer.toLowerCase() : '';
  const text = q + ' ' + a;
  
  if (text.includes('swag') || text.includes('prize') || text.includes('goodies')) return 'Swags';
  if (text.includes('point') || text.includes('credit')) return 'Credits';
  if (text.includes('eligibl') || text.includes('enrol')) return 'Eligibility';
  if (text.includes('lab') || text.includes('game') || text.includes('badge')) return 'Labs & Progress';
  return 'General';
};

const categoryIcons = {
  'General': <HelpCircle className="w-5 h-5 text-blue-500" />,
  'Swags': <Gift className="w-5 h-5 text-pink-500" />,
  'Credits': <Zap className="w-5 h-5 text-yellow-500" />,
  'Eligibility': <CheckCircle className="w-5 h-5 text-green-500" />,
  'Labs & Progress': <Award className="w-5 h-5 text-purple-500" />
};

export function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'General': true,
    'Swags': true,
    'Credits': true,
    'Eligibility': true,
    'Labs & Progress': true
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [votes, setVotes] = useState<Record<string, 'up' | 'down'>>({});

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleVote = (e: React.MouseEvent, id: string, type: 'up' | 'down') => {
    e.stopPropagation();
    setVotes(prev => ({ ...prev, [id]: prev[id] === type ? null : type } as any));
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let faqs = allFaqs;
    if (q) {
      faqs = allFaqs.filter(faq => {
        const qText = faq.question.toLowerCase();
        const aText = typeof faq.answer === 'string' ? faq.answer.toLowerCase() : '';
        return qText.includes(q) || aText.includes(q);
      });
    }
    
    const grouped = faqs.reduce((acc, faq) => {
      const cat = getCategory(faq);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(faq);
      return acc;
    }, {} as Record<FaqCategory, typeof allFaqs>);
    
    return grouped;
  }, [searchQuery]);

  const renderFAQ = (faq: { id: string, question: string, answer: React.ReactNode }) => (
    <motion.div 
      key={faq.id} 
      whileHover={{ scale: 1.01 }}
      className="border border-slate-200/50 dark:border-slate-800/50 rounded-xl bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden text-left hover:bg-white/60 dark:hover:bg-slate-900/50 transition-colors duration-300"
    >
      <button 
        onClick={() => toggleFAQ(faq.id)}
        className="w-full flex items-start justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-start gap-4 pr-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] leading-snug block">{faq.question}</span>
          </div>
        </div>
        <ChevronDown className={\`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-300 \${openId === faq.id ? 'rotate-180' : ''}\`} />
      </button>
      
      <AnimatePresence>
        {openId === faq.id && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 pl-[4.5rem]">
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {faq.answer}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <span className="text-xs text-slate-500 font-medium">Was this helpful?</span>
                <button 
                  onClick={(e) => handleVote(e, faq.id, 'up')}
                  className={\`p-1.5 rounded-lg transition-colors \${votes[faq.id] === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}\`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => handleVote(e, faq.id, 'down')}
                  className={\`p-1.5 rounded-lg transition-colors \${votes[faq.id] === 'down' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}\`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto pt-24 pb-20 px-4">
      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 mb-4 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Find answers to common queries about the program, rewards, and eligibility</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
            />
          </div>
        </div>
        
        {Object.keys(filteredFaqs).length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No questions found matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-purple-600 dark:text-purple-400 hover:underline font-medium">Clear Search</button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(filteredFaqs).map(([category, faqs]) => (
              <div key={category} className="bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-5 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {categoryIcons[category as FaqCategory] || <HelpCircle className="w-5 h-5 text-slate-500" />}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{category}</h3>
                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {faqs.length}
                    </span>
                  </div>
                  <ChevronDown className={\`w-5 h-5 text-slate-500 transition-transform duration-300 \${openCategories[category] ? 'rotate-180' : ''}\`} />
                </button>
                
                <AnimatePresence>
                  {openCategories[category] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          {faqs.filter((_, i) => i % 2 === 0).map(renderFAQ)}
                        </div>
                        <div className="space-y-4">
                          {faqs.filter((_, i) => i % 2 !== 0).map(renderFAQ)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`;

const startIndex = content.indexOf('export function FaqPage() {');
if (startIndex !== -1) {
  const newContent = content.substring(0, startIndex) + replacement;
  fs.writeFileSync('src/pages/FaqPage.tsx', newContent);
  console.log('FaqPage successfully updated!');
} else {
  console.log('Error: FaqPage function not found.');
}
