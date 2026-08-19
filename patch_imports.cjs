const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

code = code.replace('RefreshCw } from \'lucide-react\';', 'RefreshCw, Info } from \'lucide-react\';');

fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
console.log("Imports updated");
