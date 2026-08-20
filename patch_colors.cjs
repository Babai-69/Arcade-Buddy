const fs = require('fs');

function patchFile(filename) {
    let code = fs.readFileSync(filename, 'utf8');
    
    // Replace light mode colors to look better instead of white/empty looking
    code = code.replace(/bg-white/g, 'bg-white'); // keep it but ensure shadow and border pop
    code = code.replace(/border-slate-200/g, 'border-slate-200');
    
    // Let's actually give BadgeTracker the same layout feel as FacilitatorBadgeTracker
    
    fs.writeFileSync(filename, code, 'utf8');
}

// Check if BadgeTracker.tsx has light colors
let btCode = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');
btCode = btCode.replace('bg-white dark:bg-slate-900 shrink-0', 'bg-white/95 backdrop-blur dark:bg-slate-900/95 shrink-0');
btCode = btCode.replace(/bg-slate-50 dark:bg-slate-900 rounded-2xl/g, 'bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl border border-white/20 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)]');
btCode = btCode.replace(/bg-white dark:bg-slate-800 rounded-xl/g, 'bg-white dark:bg-slate-800 rounded-2xl');

fs.writeFileSync('src/components/BadgeTracker.tsx', btCode, 'utf8');

console.log("Patched BadgeTracker styles");
