const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  "import React, { useState, useEffect } from 'react';\nimport { getRedirectResult } from 'firebase/auth';\nimport { auth } from './lib/firebase';",
  "import React, { useState } from 'react';"
);

appCode = appCode.replace(
  `  useEffect(() => {
    getRedirectResult(auth).catch(err => {
      console.error("Redirect auth error:", err);
    });
  }, []);`,
  ""
);
fs.writeFileSync('src/App.tsx', appCode, 'utf8');

let loginCode = fs.readFileSync('src/components/auth/LoginModal.tsx', 'utf8');

const oldGoogleLoginPattern = /const handleGoogleLogin = async \(\) => \{[\s\S]*?setLoading\(false\);\n    \}\n  \};/;

const cleanGoogleLogin = `const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/popup-blocked') {
         setError("Google Login popup was blocked. Please click the 'Open in new tab' button (arrow icon at top right) and try again.");
      } else {
         setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };`;

loginCode = loginCode.replace(oldGoogleLoginPattern, cleanGoogleLogin);
fs.writeFileSync('src/components/auth/LoginModal.tsx', loginCode, 'utf8');

