const fs = require('fs');

let loginCode = fs.readFileSync('src/components/auth/LoginModal.tsx', 'utf8');

const oldGoogleLoginPattern = /const handleGoogleLogin = async \(\) => \{[\s\S]*?setLoading\(false\);\n    \}\n  \};/;

const cleanGoogleLogin = `const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
         setError("Login cancelled. If you didn't cancel, your browser or ad-blocker may be blocking the Google popup. Please allow popups for this site.");
      } else if (err.code === 'auth/popup-blocked') {
         setError("Popup blocked by browser. Please allow popups for this site and try again.");
      } else {
         setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };`;

loginCode = loginCode.replace(oldGoogleLoginPattern, cleanGoogleLogin);
fs.writeFileSync('src/components/auth/LoginModal.tsx', loginCode, 'utf8');

