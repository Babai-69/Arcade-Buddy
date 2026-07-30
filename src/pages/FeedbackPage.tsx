import React, { useState } from 'react';
import { MessageSquare, Star, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });
  
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setError('Please select a rating.');
      return;
    }
    
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
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit feedback');
      }
      
      setShowToast(true);
      setFormData({
        name: '',
        email: '',
        rating: 0,
        review: ''
      });
      
      setTimeout(() => setShowToast(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Community feedback
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Share your Arcade Points
            <br />
            Calculator platform
            <br />
            experience
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tell us what is working well, what feels confusing, and what you want improved. Every
            submission is reviewed before it appears on the public reviews page.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Guidelines & Support */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Before you submit</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Use this form for reviews, suggestions, and experience reports. If you are describing a bug or data issue, include enough detail for manual review to understand what happened.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Share a rating that matches your overall experience.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Explain what helped you or what needs improvement.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Keep the review constructive and specific.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Ratings help us quickly understand your overall experience.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Need help instead?</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    This page is only for sharing your experience, suggestions, and feedback about Arcade Points. If you have questions about the Google Cloud Arcade Program, found incorrect data, or are facing technical issues, please use our dedicated Query page. Our team reviews every query and responds via email.
                  </p>
                  <a href="/support" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
                    Go to Query Page →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback Form */}
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm backdrop-blur-sm h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Leave a review</h2>
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
                    placeholder="Your Name"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                    placeholder="you@email.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rating</label>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{formData.rating} / 5</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleRatingClick(star)}
                      className={`p-2 rounded-xl transition-colors ${
                        star <= (hoveredStar || formData.rating)
                          ? 'text-yellow-500 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10'
                          : 'text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Review</label>
                <textarea
                  name="review"
                  required
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Amazing website! It makes tracking my Arcade journey much easier and ..."
                  rows={5}
                  maxLength={1000}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>Be specific about what worked well or what should change.</span>
                  <span>{formData.review.length}/1000</span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {showToast && (
                <div className="p-4 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <p>Feedback submitted successfully! Thank you.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4 shadow-sm"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? 'Submitting...' : 'Submit feedback'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
