const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';\nimport { getRedirectResult } from 'firebase/auth';\nimport { auth } from './lib/firebase';"
);

const appStart = "export default function App() {\n  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);\n  const location = useLocation();";

const appStartNew = `export default function App() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const location = useLocation();

  useEffect(() => {
    getRedirectResult(auth).catch(err => {
      console.error("Redirect auth error:", err);
    });
  }, []);`;

appCode = appCode.replace(appStart, appStartNew);

fs.writeFileSync('src/App.tsx', appCode, 'utf8');
