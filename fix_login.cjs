const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginModal.tsx', 'utf8');

code = code.replace(
  "import { auth, loginWithGoogle } from '../../lib/firebase';",
  "import { auth, loginWithGoogle, loginWithGoogleRedirect } from '../../lib/firebase';"
);

const oldGoogleLogin = `  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };`;

const newGoogleLogin = `  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/popup-blocked') {
        try {
          await loginWithGoogleRedirect();
          return; // don't set loading to false, page is redirecting
        } catch (redirectErr: any) {
          setError(redirectErr.message || 'Failed to sign in with Google Redirect');
        }
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
      setLoading(false);
    }
  };`;

code = code.replace(oldGoogleLogin, newGoogleLogin);
fs.writeFileSync('src/components/auth/LoginModal.tsx', code, 'utf8');
