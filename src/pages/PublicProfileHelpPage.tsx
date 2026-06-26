import React from 'react';
import { AlertCircle, CheckCircle2, Ban, ExternalLink, Siren } from 'lucide-react';

export function PublicProfileHelpPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-violet-600 dark:text-violet-400 mb-4">
          Find Your Public Profile URL
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Quick guide to locate your Google Cloud Skills Boost public profile URL after the latest UI update
        </p>
      </div>

      <div className="space-y-6">
        {/* Important Update */}
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50 rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-violet-100 dark:bg-violet-900/50 p-3 rounded-full shrink-0">
            <Siren className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              <span className="font-bold text-violet-700 dark:text-violet-400">Important Update:</span> Due to a recent UI change, many users are having trouble finding their profile link. We're here to help!
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row gap-6">
          <div className="bg-violet-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
            01
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Open Your Profile</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Start by accessing your Google Cloud Skills Boost profile page. You'll need to be signed in to proceed.
            </p>
            <a 
              href="https://www.cloudskillsboost.google/my_account/profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Open Profile Page
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row gap-6">
          <div className="bg-violet-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
            02
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Locate Your Profile URL</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              After logging in, scroll down to find your Public Profile Link. The link will be clearly displayed on your profile page.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-4">Public Profile</h3>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg text-sm mb-4 break-all font-mono">
                Your profile is public and accessible at<br/>
                <span className="text-blue-600 dark:text-blue-400">https://www.cloudskillsboost.google/public_profiles/b02a35bc-283f-4714-8148-...</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Make profile public</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Reminder */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6">
          <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full shrink-0">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4">Important Reminder</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span className="text-red-900 dark:text-red-200">Always keep your profile public to maintain eligibility for rewards</span>
              </li>
              <li className="flex items-start gap-3">
                <Ban className="w-5 h-5 text-red-500 dark:text-red-500 shrink-0 mt-0.5" />
                <span className="text-red-900 dark:text-red-200">Setting your profile to private may disqualify you from earning swags</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
