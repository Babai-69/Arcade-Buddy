import { useEffect } from 'react';

export function useGlobalShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;

      // "/" to focus search
      if (e.key === '/') {
        if (isInput) return;
        
        e.preventDefault(); // Prevent typing '/' in the input immediately
        
        // Find the most relevant search input on the page
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search" i], input[type="search"]') as HTMLInputElement;
        
        if (searchInput) {
          searchInput.focus();
        }
      }

      // "Escape" to close modals or blur inputs
      if (e.key === 'Escape') {
        if (isInput) {
          target.blur();
        }
        
        // Dispatch a custom event that any modal can listen to
        window.dispatchEvent(new CustomEvent('close-all-modals'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
