const fs = require('fs');

let btCode = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

// I will make BadgeTracker match FacilitatorBadgeTracker's nice sliding drawer or modal look
btCode = btCode.replace(/import React, \{ useState, useMemo \} from 'react';\nimport \{ X, Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp \} from 'lucide-react';/, 
`import React, { useState, useMemo } from 'react';
import { X, Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';`);

btCode = btCode.replace(
`  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        aria-hidden="true" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-800 rounded-2xl">`,
`  return (
    <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          aria-hidden="true" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative bg-slate-50 dark:bg-slate-900 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all transform z-50 border border-slate-200 dark:border-slate-800 rounded-2xl"
        >`
);

btCode = btCode.replace(
`  if (!isOpen) return null;`,
``
);

btCode = btCode.replace(
`    </div>
  );
}`,
`      </div>
    )}
    </AnimatePresence>
  );
}`
);

fs.writeFileSync('src/components/BadgeTracker.tsx', btCode, 'utf8');

