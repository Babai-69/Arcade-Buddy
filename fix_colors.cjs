const fs = require('fs');
let content = fs.readFileSync('src/components/FacilitatorCards.tsx', 'utf8');

const oldGetIcon = `const getIcon = (title: string) => {
  const className = "w-6 h-6 text-blue-500 dark:text-blue-400";
  switch (title.toLowerCase()) {
    case 'linkedin': return <Linkedin className={className} />;
    case 'github': return <Github className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'youtube': return <Youtube className={className} />;
    case 'portfolio': return <Globe className={className} />;
    default: return <ExternalLink className={className} />;
  }
};`;

const newGetIcon = `import { Send } from 'lucide-react';
const getIcon = (title: string) => {
  const baseClass = "w-6 h-6";
  switch (title.toLowerCase()) {
    case 'linkedin': return <Linkedin className={\`\${baseClass} text-[#0077b5]\`} />;
    case 'github': return <Github className={\`\${baseClass} text-slate-900 dark:text-white\`} />;
    case 'instagram': return <Instagram className={\`\${baseClass} text-[#e1306c]\`} />;
    case 'youtube': return <Youtube className={\`\${baseClass} text-[#ff0000]\`} />;
    case 'telegram': return <Send className={\`\${baseClass} text-[#0088cc]\`} />;
    case 'portfolio': return <Globe className={\`\${baseClass} text-emerald-500\`} />;
    default: return <ExternalLink className={\`\${baseClass} text-slate-500\`} />;
  }
};`;

content = content.replace(oldGetIcon, newGetIcon);
content = content.replace("import { ExternalLink, Code, Linkedin, Github, Instagram, Globe, Youtube } from 'lucide-react';", "import { ExternalLink, Code, Linkedin, Github, Instagram, Globe, Youtube, Send } from 'lucide-react';");
fs.writeFileSync('src/components/FacilitatorCards.tsx', content);
