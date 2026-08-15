const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginModal.tsx', 'utf8');

const oldGoogleLogin = `  const handleGoogleLogin = async () => {
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

const newGoogleLogin = `  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/popup-blocked') {
        if (window !== window.parent) {
          setError("Google Login is blocked inside this preview window. Please click the 'Open in new tab' button (arrow icon at the top right) to log in.");
        } else {
          try {
            await loginWithGoogleRedirect();
            return; // don't set loading to false, page is redirecting
          } catch (redirectErr: any) {
            setError(redirectErr.message || 'Failed to sign in with Google Redirect');
          }
        }
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
      setLoading(false);
    }
  };`;

code = code.replace(oldGoogleLogin, newGoogleLogin);
fs.writeFileSync('src/components/auth/LoginModal.tsx', code, 'utf8');
