import React, { useState, useEffect } from 'react';
import { BookOpen, X, Youtube, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function RegistrationGuideWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleCloseAll = () => setIsOpen(false);
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, []);

  // Use the preview URL instead of edit URL for cleaner display
  const docUrl = "https://docs.google.com/document/d/1NDgPcOeDHYHkbIAFaXe0h-MaurN3zNUad2vm78UnEag/preview";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-press btn-press--icon fixed bottom-6 left-6 z-40"
        style={{ background: 'var(--card)', color: 'var(--ink)' }}
        aria-label="Completion Guide"
        title="Completion Guide"
      >
        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Completion Guide</h3>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://docs.google.com/document/d/1NDgPcOeDHYHkbIAFaXe0h-MaurN3zNUad2vm78UnEag/export?format=pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-press btn-press--sm btn-press--secondary flex items-center gap-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                  <a 
                    href="https://youtu.be/v8ZzN5sJzOs?si=qDXVzruVv1TooNRB" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-press btn-press--sm btn-press--red flex items-center gap-2 text-sm font-medium"
                  >
                    <Youtube className="w-4 h-4" />
                    Watch Completion Guide
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-press btn-press--icon text-slate-500 dark:text-slate-400"
                    style={{ background: 'var(--card)' }}
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full relative bg-slate-100 dark:bg-slate-950">
                {/* Loader placeholder behind iframe */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium">Loading document...</p>
                  </div>
                </div>
                
                <iframe
                  src={docUrl}
                  className="absolute inset-0 w-full h-full border-0 relative z-10 bg-white"
                  title="Completion Guide Document"
                  allow="autoplay; fullscreen"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
