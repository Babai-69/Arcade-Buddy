import React, { useState, useEffect } from 'react';
import { MessageSquare, X, AlertCircle, HelpCircle, Send, Info, Edit, Loader2, CheckCircle2 } from 'lucide-react';
import { submitSupportQuery, uploadAttachments } from '../lib/queriesService';

export function HelpSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
    let timer: NodeJS.Timeout;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? (e.target as HTMLInputElement).files : e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let attachmentData: any[] = [];
      if (formData.attachments && formData.attachments.length > 0) {
        attachmentData = await uploadAttachments(formData.attachments);
      }
      
      const emailSuccess = await submitSupportQuery({
        name: formData.name as string,
        email: formData.email as string,
        profileUrl: formData.profileUrl as string,
        queryType: formData.queryType as string,
        message: formData.message as string,
        attachments: attachmentData
      });
      
      setIsOpen(false);
      
      if (emailSuccess === false) {
        alert('Your query was saved, but the email notification failed. Please ensure SMTP_PASS is a valid App Password (not your normal Google password) and SMTP_USER is correct.');
      } else {
        setShowToast(true);
      }
      
      setFormData({
        name: '',
        email: '',
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
    <>
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[200] bg-emerald-900 border border-emerald-500 text-emerald-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md w-[90%]">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">Your query has been submitted. It will be reviewed, and you will get the answer within 48 hours.</p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-110"
        aria-label="Help and Support"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl shadow-2xl relative my-8 flex flex-col border border-slate-700">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-t-2xl p-8 text-center text-white overflow-hidden">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute -top-4 -left-4 p-2 bg-white/10 rounded-b-xl border border-white/20">
                <MessageSquare className="w-8 h-8 text-white/50" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Help &amp; Support Center</h1>
              <p className="text-xl md:text-2xl mb-2 max-w-3xl mx-auto">Get assistance with your Arcade Buddy</p>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">Report issues, ask questions, or get help from our community</p>
            </div>

            <div className="p-6 md:p-8 space-y-8 bg-slate-900 text-slate-300">
              {/* How can we help */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">How Can We Help You?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 mb-3 text-red-400 font-semibold">
                      <AlertCircle className="w-5 h-5" />
                      <h4>Technical Issues</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Report calculation errors, missing badges, or technical problems with the points system.
                    </p>
                    <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
                      <li>Points calculation errors</li>
                      <li>Missing badges</li>
                      <li>System malfunctions</li>
                      <li>Data sync issues</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 mb-3 text-blue-400 font-semibold">
                      <HelpCircle className="w-5 h-5" />
                      <h4>General Support</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      For general inquiries about the Arcade program, join our community platforms for quick assistance.
                    </p>
                    <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
                      <li>Program questions</li>
                      <li>How-to guides</li>
                      <li>General inquiries</li>
                      <li>Community discussions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-blue-200 text-sm">
                <Info className="w-5 h-5 shrink-0 text-blue-400" />
                <div>
                  <strong className="font-semibold text-blue-300 flex items-center gap-1"><Info className="w-4 h-4"/> Before Submitting a Query</strong>
                  <p className="text-xs mt-1 opacity-80">
                    Please check our FAQ section below for common questions. For technical issues like missing badges or calculation errors, use the form below with detailed information for faster resolution.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-700">
                <div className="text-center mb-6">
                  <div className="inline-block p-2 bg-blue-500/10 rounded-lg text-blue-400 mb-2">
                    <Edit className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Submit Your Query</h3>
                  <p className="text-xs text-slate-400 mt-1">Please provide detailed information about the issue you're experiencing</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 flex gap-2 text-blue-200 text-xs mb-6">
                  <Info className="w-4 h-4 shrink-0 text-blue-400" />
                  <div>
                    <strong className="font-semibold text-blue-300">Before You Submit</strong>
                    <p className="opacity-80 mt-0.5">Please provide accurate information to help us resolve your issue quickly. All fields are required for proper assistance.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Public Profile URL</label>
                    <input 
                      type="url"
                      name="profileUrl"
                      required
                      value={formData.profileUrl}
                      onChange={handleChange}
                      placeholder="https://www.cloudskillsboost.google/public_profiles/PROFILE_ID" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Type of Query</label>
                    <select 
                      name="queryType"
                      required
                      value={formData.queryType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>Type of Query:</option>
                      <option value="Website Glitch">Website Glitch</option>
                      <option value="Content Information">Content Information</option>
                      <option value="Incorrect amount of Arcade Points">Incorrect amount of Arcade Points</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Lab Issue">Lab Issue</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Add attachments for the proof</label>
                    <input 
                      type="file"
                      name="attachments"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Detailed Message</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your issue in detail. Include badge names, completion dates, or any error messages you encountered..." 
                      rows={4}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <p className="text-[10px] text-slate-500">The more details you provide, the better we can assist you.</p>

                  <div className="flex gap-3 mt-4">
                    <button 
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isSubmitting ? 'Submitting...' : 'Submit Query'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Response Time Section */}
              <div className="bg-[#123123] border border-[#166534] rounded-xl p-6 text-center shadow-lg mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">⏱️</span>
                  <h4 className="text-lg font-semibold text-emerald-50">Response Time</h4>
                </div>
                <p className="text-sm text-emerald-100 leading-relaxed max-w-3xl mx-auto">
                  We strive to respond to all queries within 24-48 hours. For urgent matters, please reach out through our <a href="#" className="text-emerald-400 hover:text-emerald-300 underline font-medium underline-offset-2">Telegram community</a> or <a href="https://chat.whatsapp.com/JRvoPJxMibzLPnqWcASG0I" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline font-medium underline-offset-2">WhatsApp group</a> for faster assistance.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
