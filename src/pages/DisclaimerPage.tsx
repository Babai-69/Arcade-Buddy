import React from 'react';
import { Shield, CheckCircle2, RefreshCw, AlertCircle, PlayCircle } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">Legal <span className="text-[#f59e0b]">Disclaimer</span></h1>
        <p className="text-slate-500 dark:text-gray-400">Important legal notices regarding our third-party simulation status and trademark attributions.</p>
      </div>

      <div className="space-y-12">
        {/* 1 */}
        <div className="bg-[#1f1606] dark:bg-[#1a1103] border border-[#f59e0b]/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <AlertCircle className="absolute -right-4 -bottom-4 w-32 h-32 text-[#f59e0b]/5" strokeWidth={1} />
          <div className="relative z-10">
            <h2 className="flex items-center gap-3 text-[#f59e0b] font-bold text-xl mb-4">
              <AlertCircle className="w-6 h-6" />
              1. NON-OFFICIAL THIRD-PARTY STATUS
            </h2>
            <p className="text-white font-bold mb-4">
              ArcadeBuddy Calc is an <span className="text-[#f59e0b] border-b border-[#f59e0b]">independent community simulator</span>. It is NOT affiliated with, sponsored by, endorsed by, or in any way officially associated with Google LLC, Google Cloud, Qwiklabs Inc., or any of their corporate parent entities or subsidiaries.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The official Google Cloud Arcade program is owned and managed exclusively by Google. Our point calculator exists strictly as an educational utility to assist students and cloud developers in mapping their badge completions against monthly catalogs. We do not represent Google, nor do we issue official certifications, scoring sheets, or prize redemptions.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div>
          <h2 className="flex items-center gap-3 text-[#10b981] font-bold text-xl mb-4">
            <CheckCircle2 className="w-6 h-6" />
            2. TRADEMARK ATTRIBUTIONS
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            All product names, brand identities, registered trademarks, service marks, logos, and emblems appearing on this portal are the sole property of their respective legal owners.
          </p>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
            The terms <strong>"Google Cloud," "Google Cloud Arcade," "Google Cloud Skills Boost," "Qwiklabs,"</strong> and related cloud product assets are utilized strictly for descriptive and nominative identification purposes. Their presence does not imply any co-branding, endorsement partnerships, or commercial arrangements.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="flex items-center gap-3 text-[#3b82f6] font-bold text-xl mb-4">
            <RefreshCw className="w-6 h-6" />
            3. DATA ACCURACY & CATALOG FRESHNESS
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            While we go to extraordinary lengths to ensure that our point-scoring indexes, milestones, game lists, and skill badge maps represent the active rules of the 2026 season, Google Cloud reserves the absolute right to alter program requirements, retire badges, or change points thresholds without prior warning.
          </p>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
            Because of these real-time catalog changes and distributed sync delays on Skills Boost profile pages, our calculator results may occasionally carry temporary variations. <strong>Always rely on the official Google Cloud Arcade registration portal for the final, definitive validation of your program points and rewards eligibility.</strong>
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="flex items-center gap-3 text-[#38bdf8] font-bold text-xl mb-4">
            <AlertCircle className="w-6 h-6" />
            4. NO SWAG TIER & PRIZE GUARANTEE
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            ArcadePoints Calc operates strictly as a virtual calculation sandbox. We carry zero responsibility or liability regarding:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-gray-400 text-sm space-y-2 mb-4">
            <li>Missing, damaged, or delayed physical swag packages.</li>
            <li>The size, type, or color availability of Google Cloud Arcade goodies inside the prize catalog.</li>
            <li>Changes in the conversion rate between Arcade points and redeemable swag tier tickets.</li>
            <li>Account suspensions, token expirations, or lab runtime blockages enforced by the Qwiklabs automated spam filters.</li>
          </ul>
        </div>

        {/* 5 */}
        <div>
          <h2 className="flex items-center gap-3 text-[#f87171] font-bold text-xl mb-4">
            <PlayCircle className="w-6 h-6" />
            5. WALKTHROUGH SOLUTIONS DISCLAIMER
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
            The solution hyperlinks integrated across our Resource catalogs refer to video walk-through playlists produced independently by <strong>GCP DECODE</strong> on YouTube. These tutorials are voluntary student-to-student community contributions. We carry no administrative authority over those channels, nor do we guarantee that future script changes by Qwiklabs will not render specific commands in those videos outdated. Utilize external walkthroughs responsibly as auxiliary debugging mechanisms.
          </p>
        </div>
      </div>
    </div>
  );
}
