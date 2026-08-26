import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export function SupportPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          type: 'PREFILL_USER_DATA',
          name: currentUser.displayName,
          email: currentUser.email
        }, '*');
      }
    });
    return () => unsubscribe();
  }, []);

  // Also send user data when iframe loads
  const handleIframeLoad = () => {
    if (user && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'PREFILL_USER_DATA',
        name: user.displayName,
        email: user.email
      }, '*');
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { type, payload } = event.data || {};
      
      try {
        if (type === 'SUBMIT_QUERY') {
          // Save to firestore
          const docRef = await addDoc(collection(db, 'queries'), {
            name: payload.fullName,
            email: payload.emailAddr,
            profileUrl: payload.profileUrl,
            queryType: payload.queryType,
            message: payload.detailMsg,
            status: 'pending',
            createdAt: serverTimestamp()
          });
          
          const ticketId = docRef.id.substring(0, 4).toUpperCase();
          
          iframeRef.current?.contentWindow?.postMessage({ type: 'SUBMIT_SUCCESS', ticketId }, '*');
          setToastMessage('Query submitted successfully!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
        }
      } catch (err: any) {
        console.error('Failed to save to Firestore:', err);
        iframeRef.current?.contentWindow?.postMessage({ type: 'SUBMIT_ERROR', error: err.message }, '*');
        setToastMessage(`Error: ${err.message}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 8000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 73px)' }}>
      <iframe 
        ref={iframeRef}
        onLoad={handleIframeLoad}
        src="/arcade-support.html" 
        className="w-full h-full border-0 block"
        title="Arcade Buddy Support Center"
      />
      
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-2xl p-4 flex items-center gap-4 min-w-[320px]">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-base">Success</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
