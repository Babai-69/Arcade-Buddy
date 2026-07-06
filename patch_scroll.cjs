const fs = require('fs');
let content = fs.readFileSync('src/components/ScrollToTop.tsx', 'utf8');

const newContent = `import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}`;

fs.writeFileSync('src/components/ScrollToTop.tsx', newContent);
