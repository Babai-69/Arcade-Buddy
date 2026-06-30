import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { auth, loginWithGoogle } from '../../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const validatePassword = (pwd: string) => {
    // 8 characters, at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!isLogin && !isForgotPassword && !validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain a mixture of numbers and letters.');
      return;
    }

    setLoading(true);

    try {
      if (isForgotPassword) {
        await sendPasswordResetEmail(auth, email);
        setSuccessMsg('Password reset email sent. Please check your inbox.');
        setIsForgotPassword(false);
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        onClose();
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Account may not exist.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        setError(err.message || 'Google login failed.');
      }
    }
  };

  const toggleMode = (mode: 'login' | 'signup' | 'forgot') => {
    setError('');
    setSuccessMsg('');
    if (mode === 'login') {
      setIsLogin(true);
      setIsForgotPassword(false);
    } else if (mode === 'signup') {
      setIsLogin(false);
      setIsForgotPassword(false);
    } else if (mode === 'forgot') {
      setIsForgotPassword(true);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              {isForgotPassword && (
                <button onClick={() => toggleMode('login')} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {isForgotPassword ? 'Reset Password' : isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isForgotPassword && (
            <>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors mb-6 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="relative flex items-center py-2 mb-6">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or continue with email</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              </div>
            </>
          )}

          {isForgotPassword && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-slate-500 mt-2">
                    Password must be at least 8 characters long and contain a mixture of numbers and letters.
                  </p>
                )}
                {isLogin && (
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => toggleMode('forgot')}
                      className="text-xs text-[#4285F4] hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
            
            {successMsg && (
              <div className="text-green-500 text-sm mt-2 font-medium">{successMsg}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4285F4] hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? 'Processing...' : isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {!isForgotPassword && (
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => toggleMode(isLogin ? 'signup' : 'login')}
                className="text-[#4285F4] font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
