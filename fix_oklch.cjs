const fs = require('fs');

let content = fs.readFileSync('src/components/AdminCertificatePreview.tsx', 'utf8');

// Replace arbitrary background colors
content = content.replace(/className="([^"]*)bg-\[#([A-Fa-f0-9]+)\]([^"]*)"/g, (match, p1, p2, p3) => {
    return `className="${(p1 + p3).replace(/\s+/g, ' ').trim()}" style={{ backgroundColor: '#${p2}' }}`;
});

// Replace arbitrary text colors
content = content.replace(/className="([^"]*)text-\[#([A-Fa-f0-9]+)\]([^"]*)"/g, (match, p1, p2, p3) => {
    return `className="${(p1 + p3).replace(/\s+/g, ' ').trim()}" style={{ color: '#${p2}' }}`;
});

// Replace arbitrary border colors
content = content.replace(/className="([^"]*)border-\[#([A-Fa-f0-9]+)\]([^"]*)"/g, (match, p1, p2, p3) => {
    return `className="${(p1 + p3).replace(/\s+/g, ' ').trim()}" style={{ borderColor: '#${p2}' }}`;
});

// Deal with existing styles and merge them (simplified for this specific file)
content = content.replace(/style=\{\{ backgroundColor: '#([A-Fa-f0-9]+)' \}\} style=\{\{/g, "style={{ backgroundColor: '#$1', ");
content = content.replace(/style=\{\{ color: '#([A-Fa-f0-9]+)' \}\} style=\{\{/g, "style={{ color: '#$1', ");
content = content.replace(/style=\{\{ borderColor: '#([A-Fa-f0-9]+)' \}\} style=\{\{/g, "style={{ borderColor: '#$1', ");

// Specific merge for the corner blobs
content = content.replace(/className="absolute -top-16 -left-16 w-64 h-64 rounded-full mix-blend-multiply opacity-90 filter blur-\[1px\]" style=\{\{ backgroundColor: '#EA4335' \}\} style=\{\{ borderRadius:/g, `className="absolute -top-16 -left-16 w-64 h-64 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#EA4335', borderRadius:`);
content = content.replace(/className="absolute -top-24 -right-12 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-\[1px\]" style=\{\{ backgroundColor: '#4285F4' \}\} style=\{\{ borderRadius:/g, `className="absolute -top-24 -right-12 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#4285F4', borderRadius:`);
content = content.replace(/className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply opacity-90 filter blur-\[1px\]" style=\{\{ backgroundColor: '#34A853' \}\} style=\{\{ borderRadius:/g, `className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#34A853', borderRadius:`);
content = content.replace(/className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-\[1px\]" style=\{\{ backgroundColor: '#FBBC05' \}\} style=\{\{ borderRadius:/g, `className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full mix-blend-multiply opacity-90 filter blur-[1px]" style={{ backgroundColor: '#FBBC05', borderRadius:`);

// specific merge for the h2 which has fontFamily
content = content.replace(/className="text-6xl font-bold font-serif mb-1" style=\{\{ color: '#F4A300' \}\} style=\{\{ fontFamily: 'Georgia, serif' \}\}/g, `className="text-6xl font-bold font-serif mb-1" style={{ color: '#F4A300', fontFamily: 'Georgia, serif' }}`);


fs.writeFileSync('src/components/AdminCertificatePreview.tsx', content, 'utf8');

