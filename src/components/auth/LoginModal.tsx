import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { auth, loginWithGoogle, loginWithGoogleRedirect } from '../../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await sendPasswordResetEmail(auth, email);
        setSuccessMsg('Password reset email sent! Check your inbox.');
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`.trim()
        });
        onClose();
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      <style>{`
        @keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-15px) scale(1.08); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-15px,20px) scale(1.1); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10px,10px) scale(1.05); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.7s ease forwards; }
        .animate-fade-up-delayed { animation: fadeUp 0.7s ease forwards; animation-delay: 0.3s; opacity: 0; }
      `}</style>
      
      <div className="w-full max-w-[780px] min-h-[460px] bg-white dark:bg-[#0b0e1a] rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex flex-col md:flex-row overflow-hidden relative">
        
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col relative w-1/2 bg-[#f7f6f2] dark:bg-[#080b15] overflow-hidden items-center p-8 text-[#1a1a1a] dark:text-white">
          <div className="absolute rounded-full blur-[60px] bg-[#55b97a] opacity-35 w-[220px] h-[220px] -top-[60px] -left-[40px] animate-[drift1_9s_ease-in-out_infinite]" />
          <div className="absolute rounded-full blur-[60px] bg-[#ff6bb8] opacity-30 w-[240px] h-[240px] -bottom-[50px] -right-[30px] animate-[drift2_11s_ease-in-out_infinite]" />
          <div className="absolute rounded-full blur-[60px] bg-[#3abdf6] opacity-[0.28] w-[180px] h-[180px] top-[40%] right-[10%] animate-[drift3_8s_ease-in-out_infinite]" />
          <div className="absolute rounded-full blur-[60px] bg-[#ffcd16] opacity-[0.22] w-[160px] h-[160px] top-[20%] left-[15%]" />

          <div className="flex items-center gap-2 z-10 self-start">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#029197] via-[#ffcd16] to-[#ff31cd]"></span>
            <span className="text-[13px] font-semibold tracking-[0.02em]">Arcade Buddy</span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center w-full z-10">
            {isLogin ? (
              <div className="w-[230px] mx-auto mb-2">
                <svg fill="none" height="100%" width="100%" viewBox="0 0 428 123" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gwelcome" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="118.488" y2="29.074" x1="-253.742" y1="-70.793">
                      <stop offset="0%" stopColor="#029197" /><stop offset="9.3%" stopColor="#55b97a" /><stop offset="18.7%" stopColor="#a8e15d" /><stop offset="29.3%" stopColor="#d3d739" /><stop offset="39.9%" stopColor="#ffcd16" /><stop offset="50.4%" stopColor="#ff981d" /><stop offset="60.9%" stopColor="#ff6323" /><stop offset="71.2%" stopColor="#ff4a78" /><stop offset="81.4%" stopColor="#ff31cd" /><stop offset="90.7%" stopColor="#9d77e1" /><stop offset="100%" stopColor="#3abdf6" />
                    </linearGradient>
                  </defs>
                  <g transform="matrix(1,0,0,1,-6.415,-5.654)">
                    <g transform="matrix(1,0,0,1,217.377,69.099)">
                      <path strokeDasharray="0 100" pathLength="100" d="M-188.452,-48.737C-188.452,-48.737,-194.876,41.341,-174.88,37.534C-160.604,34.815,-150.861,-18.684,-150.861,-18.684C-150.861,-18.684,-158.308,40.671,-139.413,37.589C-124.335,35.129,-95.863,-42.443,-115.605,-41.153C-127.671,-40.365,-127.003,16.879,-102.747,24.964C-87.5,30.047,-71.828,19.784,-71.062,8.04C-70.179,-5.502,-88.551,-7.79,-94.211,9.061C-99.415,24.556,-90.415,43.418,-70.73,37.677C-42.63,29.482,-26.705,-13.731,-25.253,-28.982C-23.721,-45.067,-35.466,-46.599,-42.615,-32.301C-49.293,-18.945,-60.282,38.678,-36.232,38.678C-22.97,38.678,-16.117,10.383,-2.148,2.178C7.77,-3.647,14.548,-2.029,14.548,-2.029C14.548,-2.029,-8.324,-0.73,-12.773,17.608C-14.931,26.504,-5.801,46.599,15.027,35.678C34.382,25.529,27.606,2.376,51.708,-0.699C61.488,-1.946,67.989,9.975,67.342,18.38C66.449,29.997,55.47,39.827,44.619,38.295C34.707,36.896,28.36,22.842,32.237,14.423C38.336,1.178,45.491,-0.19,51.708,-0.699C66.853,-1.938,71.06,18.604,79.124,17.623C87.008,16.664,92.418,5.764,92.418,5.764C92.418,5.764,86.665,37.388,86.665,37.388C86.665,37.388,98.219,1.19,107.665,2.07C118.394,3.07,112.358,29.353,112.358,29.353C112.358,29.353,122.575,0.435,133.077,2.635C143.241,4.764,127.415,31.733,138.465,37.258C150.888,43.47,178.595,20.299,179.361,8.554C180.245,-4.988,161.872,-7.276,156.212,9.575C151.659,23.134,159.988,38.803,175.587,38.838C185.465,38.86,192.86,33.324,194.876,31.741" strokeLinejoin="round" strokeLinecap="round" strokeWidth="9" stroke="url(#gwelcome)">
                        <animate repeatCount="indefinite" fill="freeze" begin="0s" dur="8.217s" calcMode="spline"
                          keySplines="0 0 1 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0.409 0.273 0.588 1; 0 0 1 1"
                          keyTimes="0; 0.024341; 0.030426; 0.060852; 0.091278; 0.119675; 0.397566; 0.592292; 0.953347; 1"
                          values="0 100; 0 100; 1.121 98.879; 7.712 92.288; 15.973 84.027; 25.131 74.869; 100 0; 100 0; 0 100; 0 100"
                          attributeName="stroke-dasharray" />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            ) : (
              <div className="w-[160px] mx-auto mb-2">
                <svg fill="none" height="100%" width="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ghello" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="134.5" y2="-3" x1="-135" y1="19">
                      <stop offset="0%" stopColor="#009196" /><stop offset="5.5%" stopColor="#2f9dad" /><stop offset="11%" stopColor="#5ea9c5" /><stop offset="17.1%" stopColor="#8ecd82" /><stop offset="23.3%" stopColor="#bdf13f" /><stop offset="29.9%" stopColor="#dee328" /><stop offset="36.5%" stopColor="#ffd510" /><stop offset="42.2%" stopColor="#ffc51c" /><stop offset="48%" stopColor="#ffb628" /><stop offset="54.3%" stopColor="#ff8825" /><stop offset="60.5%" stopColor="#ff5b22" /><stop offset="67.1%" stopColor="#ff4481" /><stop offset="73.8%" stopColor="#ff2ddf" /><stop offset="80.6%" stopColor="#a473e9" /><stop offset="87.5%" stopColor="#49b9f3" /><stop offset="93.8%" stopColor="#39bdf7" /><stop offset="100%" stopColor="#28c1fa" />
                    </linearGradient>
                  </defs>
                  <g transform="matrix(1.087,0,0,1.087,-21.135,-19.235)">
                    <g transform="matrix(1,0,0,1,252,245.918)">
                      <path strokeDasharray="0 100" pathLength="100" d="M-145.66,43.747C-145.66,43.747,-86.107,10.264,-81.851,-26.162C-79.424,-46.943,-98.573,-44.137,-101.426,-23.013C-103.757,-5.755,-109.596,40.561,-109.596,40.561C-109.596,40.561,-103.979,-0.034,-85.851,1.753C-65.936,4.083,-91.979,40.05,-69,40.305C-48.573,40.532,-27.639,22.688,-26.873,10.943C-25.99,-2.599,-44.362,-4.886,-50.022,11.966C-55.226,27.461,-43.584,44.902,-23.54,40.581C7.341,33.922,22.483,-10.827,23.936,-26.077C25.467,-42.162,13.723,-43.694,6.574,-29.397C-0.104,-16.04,-11.245,37.085,12.958,41.583C41.809,46.944,64.277,-5.906,67.086,-23.779C69.802,-41.066,58.656,-45.952,50.234,-30.673C41.166,-14.223,27.843,44.077,59.937,41.326C86.746,39.028,76.916,2.264,102.898,-0.05C114.562,-1.088,119.386,9.92,118.532,21.029C117.638,32.646,106.66,42.475,95.809,40.943C85.898,39.544,80.838,25.973,83.425,17.072C86.617,6.094,96.662,0.12,102.898,-0.05C111.766,-0.29,116.234,5.327,124.149,5.199C131.179,5.086,138.27,-2.922,138.27,-2.922" strokeLinejoin="round" strokeLinecap="round" strokeWidth="9" stroke="url(#ghello)">
                        <animate repeatCount="indefinite" fill="freeze" begin="0s" dur="3.45s" calcMode="spline"
                          keySplines="0 0 1 1; 0.302 0.14 0.665 1; 0.302 0.14 0.665 1; 0.302 0.14 0.665 1; 0.302 0.14 0.665 1; 0.302 0.14 0.665 1; 0.302 0.14 0.665 1"
                          keyTimes="0; 0.060386; 0.072464; 0.108696; 0.142512; 0.724638; 1; 1"
                          values="0 100; 0 100; 0.877 99.123; 4.288 95.712; 8.593 91.407; 99 1; 99 1; 0 100"
                          attributeName="stroke-dasharray" />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            )}

            <p key={isLogin ? 'sub-in' : 'sub-up'} className="text-[13px] text-[#6b6a63] dark:text-slate-400 font-medium mb-[20px] max-w-[270px] animate-fade-up">
              {isLogin ? 'Sign in to track your Arcade points and milestones.' : 'Create your account and start earning Arcade points.'}
            </p>

            <div key={isLogin ? 'badges-in' : 'badges-up'} className="flex gap-[22px] animate-fade-up-delayed">
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#029197" strokeWidth="2" className="w-[17px] h-[17px]"><path d="M12 15a6 6 0 100-12 6 6 0 000 12z"/><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/></svg>
                <span className="text-[11px] text-[#6b6a63] dark:text-slate-400 font-medium">Badges</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ff981d" strokeWidth="2" className="w-[17px] h-[17px]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-[11px] text-[#6b6a63] dark:text-slate-400 font-medium">Points</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ff31cd" strokeWidth="2" className="w-[17px] h-[17px]"><path d="M8 21h8M12 17v4M17 5h3a1 1 0 011 1c0 3-2 5-4 5M7 5H4a1 1 0 00-1 1c0 3 2 5 4 5M7 3h10v6a5 5 0 01-10 0V3z"/></svg>
                <span className="text-[11px] text-[#6b6a63] dark:text-slate-400 font-medium">Milestones</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-8 md:px-[36px] flex flex-col justify-center relative bg-white dark:bg-[#0b0e1a]">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
          
          <h1 className="text-[20px] font-medium mb-1 text-[#1a1a1a] dark:text-white">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-[13px] text-[#6b6b6b] dark:text-[#a8adc0] mb-5">
            {isForgotPassword 
              ? "Enter your email to receive a reset link."
              : isLogin 
                ? "Enter your details to access your account." 
                : "Enter your details to create your account."}
          </p>
          
          {!isForgotPassword && (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-[#161a2c] text-[#1a1a1a] dark:text-white border border-[#dcdcdc] dark:border-[#33384f] rounded-[10px] h-[38px] text-[14px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-4"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.8c-.5 2.7-2 5-4.3 6.5v5.4h7C42.6 37 45.1 31.3 45.1 24.5z" />
                  <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7-5.4c-2 1.3-4.5 2.1-7.5 2.1-5.8 0-10.6-3.9-12.4-9.1h-7.2v5.6C7.6 40.9 15.2 46 24 46z" />
                  <path fill="#FBBC05" d="M11.6 28.3c-.5-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3v-5.6H4.4C2.9 17 2 20.4 2 24s.9 7 2.4 10l7.2-5.7z" />
                  <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.2-6.2C34.9 4.3 29.9 2 24 2 15.2 2 7.6 7.1 4.4 14l7.2 5.6c1.8-5.2 6.6-8.9 12.4-8.9z" />
                </svg>
                Continue with Google
              </button>
              
              <div className="flex items-center gap-[10px] mb-4">
                <div className="flex-1 h-[0.5px] bg-[#e2e2e2] dark:bg-[#33384f]"></div>
                <span className="text-[12px] text-[#9a9a9a] dark:text-[#7d8299]">or continue with email</span>
                <div className="flex-1 h-[0.5px] bg-[#e2e2e2] dark:bg-[#33384f]"></div>
              </div>
            </>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col">
            {!isLogin && !isForgotPassword && (
              <div className="flex gap-[10px] mb-[14px]">
                <div className="flex-1">
                  <label className="block text-[12px] text-[#4a4a4a] dark:text-[#c7cde0] mb-1">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#f7f7f8] dark:bg-[#161a2c] border border-[#dcdcdc] dark:border-[#33384f] text-[#1a1a1a] dark:text-white rounded-[10px] h-[36px] px-[10px] text-[13px] focus:outline-none focus:border-[#c98a1f] dark:focus:border-[#f6c453] transition-colors"
                    placeholder="Khushi"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[12px] text-[#4a4a4a] dark:text-[#c7cde0] mb-1">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#f7f7f8] dark:bg-[#161a2c] border border-[#dcdcdc] dark:border-[#33384f] text-[#1a1a1a] dark:text-white rounded-[10px] h-[36px] px-[10px] text-[13px] focus:outline-none focus:border-[#c98a1f] dark:focus:border-[#f6c453] transition-colors"
                    placeholder="Dey"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="mb-[14px]">
              <label className="block text-[12px] text-[#4a4a4a] dark:text-[#c7cde0] mb-1">Email</label>
              <div className="relative">
                <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] dark:text-[#7d8299]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f7f7f8] dark:bg-[#161a2c] border border-[#dcdcdc] dark:border-[#33384f] text-[#1a1a1a] dark:text-white rounded-[10px] h-[36px] pl-[34px] pr-[10px] text-[13px] focus:outline-none focus:border-[#c98a1f] dark:focus:border-[#f6c453] transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            {!isForgotPassword && (
              <div className="mb-2">
                <label className="block text-[12px] text-[#4a4a4a] dark:text-[#c7cde0] mb-1">Password</label>
                <div className="relative">
                  <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] dark:text-[#7d8299]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f7f7f8] dark:bg-[#161a2c] border border-[#dcdcdc] dark:border-[#33384f] text-[#1a1a1a] dark:text-white rounded-[10px] h-[36px] pl-[34px] pr-[34px] text-[13px] focus:outline-none focus:border-[#c98a1f] dark:focus:border-[#f6c453] transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <svg onClick={() => setShowPassword(!showPassword)} className="absolute right-[10px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] dark:text-[#7d8299] cursor-pointer hover:text-slate-600 dark:hover:text-slate-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                {isLogin && (
                  <div className="text-right mt-2 mb-4">
                    <span onClick={() => toggleMode('forgot')} className="text-[12px] text-[#c98a1f] dark:text-[#f6c453] cursor-pointer hover:underline">
                      Forgot password?
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {error && <div className="text-red-500 text-[12px] mb-3">{error}</div>}
            {successMsg && <div className="text-green-500 text-[12px] mb-3">{successMsg}</div>}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full border-none rounded-[10px] h-[38px] text-[14px] font-medium text-[#1a1a1a] dark:text-[#12162a] bg-[#f6c453] cursor-pointer transition-colors hover:opacity-90 disabled:opacity-70 ${isLogin || isForgotPassword ? 'mt-0' : 'mt-[14px]'}`}
            >
              {loading ? 'Processing...' : isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          {!isForgotPassword && (
            <p className="text-center text-[12px] m-0 mt-4 text-[#6b6b6b] dark:text-[#a8adc0]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => toggleMode(isLogin ? 'signup' : 'login')} className="text-[#c98a1f] dark:text-[#f6c453] cursor-pointer hover:underline">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          )}
          
          {isForgotPassword && (
            <p className="text-center text-[12px] m-0 mt-4 text-[#6b6b6b] dark:text-[#a8adc0]">
              <span onClick={() => toggleMode('login')} className="text-[#c98a1f] dark:text-[#f6c453] cursor-pointer hover:underline">
                Back to sign in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LoginModal;
