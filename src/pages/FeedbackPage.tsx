import React, { useState } from 'react';
import { MessageSquare, Star, Send, Loader2, CheckCircle, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';

export function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      setShowToast(true);
      setFormData({ name: '', email: '', rating: 5, review: '' });
      setTimeout(() => setShowToast(false), 5000);
    } catch (err: any) {
      console.error('Failed to submit feedback:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 mb-6 ring-1 ring-blue-500/20 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            We value your thoughts
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Help us improve the Google Cloud Arcade Facilitator program by sharing your feedback, ideas, or suggestions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Guidelines & Help */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Community feedback</h2>
              </div>
              
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/50 dark:hover:bg-indigo-500/5 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300">1</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1.5">Share a rating that matches your overall experience with our platform.</p>
                </div>
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/50 dark:hover:bg-indigo-500/5 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300">2</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1.5">Explain what helped you the most or what you feel needs improvement.</p>
                </div>
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-900/50 dark:hover:bg-indigo-500/5 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300">3</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1.5">Keep the review constructive, specific, and respectful.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-lg text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl shrink-0 backdrop-blur-sm">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Need technical help?</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    This page is for sharing your experience. If you have questions about the Arcade Program, found incorrect data, or are facing technical issues, please use our dedicated Query page.
                  </p>
                  <a href="/support" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
                    Go to Query Page →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Leave a review</h2>
                <p className="text-slate-600 dark:text-slate-400">Fill out the form below to share your experience with us.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">How would you rate your experience?</label>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300">
                      {formData.rating} <span className="text-slate-400 dark:text-slate-500 font-normal">out of</span> 5
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-4 justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => handleRatingClick(star)}
                        className={`p-3 rounded-2xl transition-all transform hover:scale-110 ${
                          star <= (hoveredStar || formData.rating)
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 shadow-sm'
                            : 'text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700'
                        }`}
                      >
                        <Star className={`w-8 h-8 ${star <= (hoveredStar || formData.rating) ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Review</label>
                  <textarea
                    name="review"
                    required
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Tell us what you think. What did you love? What could be improved?"
                    rows={5}
                    maxLength={1000}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                  <div className="flex justify-between mt-3 text-xs font-medium text-slate-500">
                    <span>Be specific and constructive.</span>
                    <span className={formData.review.length >= 1000 ? 'text-amber-500' : ''}>{formData.review.length} / 1000</span>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{error}</p>
                  </div>
                )}

                {showToast && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <p className="font-medium">Feedback submitted successfully! Thank you.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 dark:disabled:bg-blue-600/50 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:shadow-none mt-6"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSubmitting ? 'Submitting review...' : 'Submit review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
