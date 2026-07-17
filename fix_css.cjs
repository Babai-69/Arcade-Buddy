const fs = require('fs');

let content = fs.readFileSync('src/index.css', 'utf8');

const cssToAdd = `
@layer base {
  button,
  a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim) {
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, filter 0.3s ease-out, background-color 0.3s ease-out !important;
  }

  button:focus-visible,
  a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):focus-visible {
    outline: 2px solid var(--color-google-blue);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    button:hover:not(:disabled),
    a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):hover {
      transform: translateY(-4px) scale(1.02);
      filter: brightness(1.08);
      box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .dark button:hover:not(:disabled),
    .dark a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):hover {
      box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    }

    button:active:not(:disabled),
    a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):active {
      transform: scale(0.97) translateY(0);
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }

    button svg,
    a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim) svg {
      transition: transform 0.3s ease-out;
    }
    
    button:hover:not(:disabled) svg,
    a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):hover svg {
      transform: translateY(-2px);
    }
    
    button:active:not(:disabled) svg,
    a[class*="px-"][class*="py-"][class*="rounded-"]:not(.no-btn-anim):active svg {
      transform: translateY(0);
    }
  }
}
`;

if (!content.includes('button:focus-visible')) {
  content = content + cssToAdd;
  fs.writeFileSync('src/index.css', content);
}
