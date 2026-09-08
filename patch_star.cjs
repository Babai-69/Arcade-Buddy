const fs = require('fs');
let code = fs.readFileSync('src/components/ProgramInformation.tsx', 'utf8');

code = code.replace(
  "import { Calendar, Clock, PlayCircle, Info } from 'lucide-react';",
  "import { Calendar, Clock, PlayCircle, Info, Star } from 'lucide-react';"
);

fs.writeFileSync('src/components/ProgramInformation.tsx', code);
