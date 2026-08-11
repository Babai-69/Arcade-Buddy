import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, HelpCircle, Send, Info, Edit, Loader2, CheckCircle2 } from 'lucide-react';
import { submitSupportQuery, uploadAttachments } from '../lib/queriesService';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export function SupportPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileUrl: '',
    queryType: '',
    message: '',
    attachments: null as unknown as FileList
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          name: currentUser.displayName || '',
          email: currentUser.email || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 5 * 1024 * 1024) {
            alert(`File ${files[i].name} is too large. Maximum size is 5MB per file.`);
            e.target.value = '';
            return;
          }
        }
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? (e.target as HTMLInputElement).files : e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      let attachmentData: any[] = [];
      if (formData.attachments && formData.attachments.length > 0) {
        attachmentData = await uploadAttachments(formData.attachments);
      }
      
      // Fire and forget to make the UI respond instantly
      submitSupportQuery({
        name: formData.name as string,
        email: formData.email as string,
        profileUrl: formData.profileUrl as string,
        queryType: formData.queryType as string,
        message: formData.message as string,
        attachments: attachmentData
      }).then(({ emailSuccess, errorMessage }) => {
        if (emailSuccess === false) {
          console.error('Email notification failed:', errorMessage);
        }
      });
      
      setShowToast(true);
      
      setFormData({
        name: user.displayName || '',
        email: user.email || '',
        profileUrl: '',
        queryType: '',
        message: '',
        attachments: null as unknown as FileList
      });
    } catch (error) {
      console.error('Failed to submit query:', error);
      alert('Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] bg-emerald-900 border border-emerald-500 text-emerald-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md w-[90%]">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">Your query has been submitted. It will be reviewed, and you will get the answer within 48 hours.</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 mb-6 ring-1 ring-blue-500/20 shadow-sm">
            <MessageSquare className="w-8 h-8" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Help &amp; Support Center
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Report issues, ask questions, or get help from our community to maximize your Arcade points.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Guidelines & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">How Can We Help You?</h2>
              
              <div className="space-y-4">
                <div className="group p-5 rounded-2xl bg-slate-50 hover:bg-red-50 dark:bg-slate-900/50 dark:hover:bg-red-500/5 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-3 mb-3 text-red-500 dark:text-red-400 font-semibold">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <h4 className="text-lg text-slate-900 dark:text-white">Technical Issues</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Report calculation errors, missing badges, or technical problems with the points system.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li>Points calculation errors</li>
                    <li>Missing badges</li>
                    <li>System malfunctions</li>
                    <li>Data sync issues</li>
                  </ul>
                </div>

                <div className="group p-5 rounded-2xl bg-slate-50 hover:bg-blue-50 dark:bg-slate-900/50 dark:hover:bg-blue-500/5 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-3 mb-3 text-blue-500 dark:text-blue-400 font-semibold">
                    <HelpCircle className="w-5 h-5 shrink-0" />
                    <h4 className="text-lg text-slate-900 dark:text-white">General Support</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    For general inquiries about the Arcade program, join our community platforms for quick assistance.
                  </p>
                  <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li>Program questions</li>
                    <li>How-to guides</li>
                    <li>General inquiries</li>
                    <li>Community discussions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#123123] to-[#166534] rounded-3xl p-8 shadow-lg text-emerald-50 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4 text-3xl">⏱️</div>
                <h4 className="text-xl font-bold mb-3">Response Time</h4>
                <p className="text-sm text-emerald-100/90 leading-relaxed mb-6">
                  We strive to respond to all queries within 24-48 hours. For urgent matters, please reach out through our communities for faster assistance.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="https://t.me/arcadebuddy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl transition-colors backdrop-blur-sm border border-white/10">
                    Telegram Community
                  </a>
                  <a href="https://chat.whatsapp.com/JBPTktVT9sHHZ60mHlpk0l" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl transition-colors backdrop-blur-sm border border-white/10">
                    WhatsApp Group
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-3xl p-6 flex gap-4 text-slate-700 dark:text-blue-200 shadow-sm items-start">
              <Info className="w-6 h-6 shrink-0 text-blue-500 dark:text-blue-400 mt-1" />
              <div>
                <strong className="block font-bold text-blue-800 dark:text-blue-300 text-lg mb-1">Before Submitting a Query</strong>
                <p className="text-sm leading-relaxed text-blue-900/80 dark:text-blue-100/80">
                  Please check our FAQ section for common questions. For technical issues like missing badges or calculation errors, use the form below with detailed information for faster resolution.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Edit className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Submit Your Query</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Please provide detailed information about your issue.</p>
                  </div>
                </div>

                {!user ? (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="inline-flex items-center justify-center p-4 bg-amber-100 dark:bg-amber-500/10 rounded-full mb-4">
                      <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                    </div>
                    <p className="text-lg text-slate-900 dark:text-white font-medium mb-2">Authentication Required</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">You must be logged in to submit a query.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                        <input 
                          type="text"
                          name="name"
                          required
                          readOnly
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name" 
                          className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input 
                          type="email"
                          name="email"
                          required
                          readOnly
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address" 
                          className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed transition-all"
                        />
                      </div>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Public Profile URL</label>
                      <input 
                        type="url"
                        name="profileUrl"
                        required
                        value={formData.profileUrl}
                        onChange={handleChange}
                        placeholder="https://www.cloudskillsboost.google/public_profiles/PROFILE_ID" 
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type of Query</label>
                      <select 
                        name="queryType"
                        required
                        value={formData.queryType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                      >
                        <option value="" disabled>Select query type...</option>
                        <option value="Website Glitch">Website Glitch</option>
                        <option value="Content Information">Content Information</option>
                        <option value="Incorrect amount of Arcade Points">Incorrect amount of Arcade Points</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Lab Issue">Lab Issue</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Proof Attachments</label>
                      <input 
                        type="file"
                        name="attachments"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 dark:file:bg-blue-500/10 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-200 dark:hover:file:bg-blue-500/20 transition-all cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Detailed Message</label>
                      <textarea 
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your issue in detail. Include badge names, completion dates, or any error messages you encountered..." 
                        rows={5}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      />
                      <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
                        <span>The more details you provide, the better we can assist you.</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 dark:disabled:bg-blue-600/50 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        {isSubmitting ? 'Submitting query...' : 'Submit Query'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
