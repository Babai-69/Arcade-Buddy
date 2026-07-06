import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const allFaqs = [
{
    id: "c1_1",
    question: "What is the eligibility criteria for enrolling in the program?",
    answer: (
      <div className="space-y-2">
        <p>You need to meet these requirements if you want enrol in the program:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You need to have access to a working internet connection & a laptop with latest chrome browser.</li>
          <li>You need to be above 18 years of age.</li>
          <li>You must have been referred by any of the "Facilitators" that are part of the program or should get auto assigned to a "Facilitator Team" once enrolled.</li>
          <li>You are part of the countries supported under the Google Skills Terms of Service.</li>
        </ul>
      </div>
    )
  },
  {
    id: "c1_2",
    question: "The enrolment form is closed. How should I enrol in the program?",
    answer: (
      <div className="space-y-2">
        <p>Each cohort has limited seats. If the enrolment form is closed, then it means that the seats of that cohort has been filled and thus we request you to please wait for the next cohort to start to enrol in the program.</p>
        <p>Keep an eye out on the home page of the site for the new cohort start dates.</p>
      </div>
    )
  },
  {
    id: "c1_3",
    question: "I did not receive an invitation email after applying through the enrolment form. What should I do?",
    answer: (
      <div className="space-y-2">
        <p>Here's what you can do:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Please wait for 24-48 hours after filling the form and you will surely receive your email</li>
          <li>Check for the email under your SPAM/JUNK/PROMOTIONS folder.</li>
          <li>Just reach out to your Facilitators and they will help you get the instructions and enrol you in the program.</li>
        </ul>
      </div>
    )
  },
  {
    id: "c1_4",
    question: "I need to make some changes to the my registration details in the enrolment form, but it's closed now? What should I do?",
    answer: (
      <div className="space-y-2">
        <p>Note that while the enrolment form will remain open throughout your cohort, if its has been closed, that means that the seats in the program are now full and we DO NOT allow changes to be made to the enrolment form once its closed.</p>
        <p>Though you can still reach out to your "Facilitators" and share the correct information with them. They can share that information with us and we can then decide to update the details or not based on the type of request. Note: Email Id changes are NOT allowed once the enrolment form has been closed.</p>
      </div>
    )
  },
  {
    id: "c1_5",
    question: "The links are not working in my enrolment email. What should I do?",
    answer: "Sometimes due to how you have setup your email inbox, the links in the enrolment email might come out to be broken. Please do not worry about this. You can just copy and paste the hardcoded URLs in your browser added beside each link in the email and those should work too."
  },
  {
    id: "c1_6",
    question: "I have more questions about the Google Skills Arcade, where can I find them?",
    answer: (
      <p>
        You can check out the FAQs section on the Google Skills Arcade main website here - <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://go.cloudskillsboost.google/arcade</a>. Just scroll down to the bottom of the page.
      </p>
    )
  },
{
    id: "c2_1",
    question: "If I have already participated in last year's cohort of the program, can I participate in this year's cohort as well?",
    answer: "Yes, you CAN. We motivate you that you participate in the program using the same email address that you used last time so that your progress can move forward with you as you progress in this year's cohort."
  },
  {
    id: "c2_2",
    question: "Are users who participated/are participating in any other cloud campaigns or Arcade individually eligible for the program?",
    answer: (
      <div className="space-y-2">
        <p>Yes! You can participate in the program as long as your badge completions are on or after 13th July 2026 i.e. the start date of the program.</p>
        <p className="italic text-sm">Note: Anyone participating in the Arcade Facilitator Indonesia 2026 cohort is NOT eligible to participate in the Arcade Facilitator India Cohort and vice-a-versa.</p>
      </div>
    )
  },
  {
    id: "c2_3",
    question: "I have already completed the skill badges/games in the program, what should I do?",
    answer: "Please note that in order to get the prizes, you need to complete the skill badges/games on or after 13th July 2026 and before the end date of the program. Any badges completed before or after that won't be counted. If you want, you can make a new account on Google Skills with a new email ID and enrol in the program using that email ID instead."
  },
  {
    id: "c2_4",
    question: "I am a part of a Google Cloud Partner organisation or am currently doing specific skill badges which are specifically assigned to my organisation and not available in the public GCSB catalog? Can I participate in the program?",
    answer: (
      <div className="space-y-2">
        <p>Please note that you can certainly participate in the program at your own personal capacity and we recommend that you join the program using your personal email IDs instead of organisational email Ids.</p>
        <p>Also, since Arcade Facilitator program is a public campaign and we DO NOT partner with any institutions/organisations, we do not track badge completions which are NOT part of the Google Skills public catalog here.</p>
      </div>
    )
  },
  {
    id: "c2_5",
    question: "I have achieved all the milestones in the program. Will I get the Bonus Points associated with each of them?",
    answer: "Please note that we will evaluate your progress at the end of your cohort and you will only get the bonus points for the milestone that you achieve & not for the ones before that."
  },
  {
    id: "c2_6",
    question: "I have completed few/all of the milestones. When will I get my prizes?",
    answer: "If you have completed any of the milestones mentioned in the Points System section and have acquired enough Arcade Points for redemption, then you will need to wait until the Arcade Prize Counter opens up in January 2027. You will be able to redeem your points on the counter then. Until then, we motivate you to keep completing more badges to acquire more points."
  },
  {
    id: "c2_7",
    question: "Where will the schwags be delivered - to my address ?",
    answer: "You will be asked to enter your preferred address at the time of prize redemption and your claimed schwags will be delivered there. It usually takes 8-12 weeks for the prizes to be shipped after you place the order."
  },
  {
    id: "c2_8",
    question: "Is my country eligible for shipping prizes?",
    answer: "We make every effort to reach you wherever you are, whenever possible. Items cannot be shipped to countries on the list of US Treasury Department’s Sanctions Programs and the following countries: Pakistan, Bangladesh, Iraq, Iran, North Korea, Crimea, Cuba, Sevastopol city and Syria. Each challenge includes details about prizes and shipping availability, as this list may change at any time (locations may be added or removed based on unforeseen events). If you’re in one of these countries, you are welcome to participate within the Terms of Service. You may decline a prize or select an address in a country where shipping is available. (Though re-routing of swags to any country mentioned above would be against our terms of service)"
  },
  {
    id: "c2_9",
    question: "Will users receive any certificate after completing any milestone in the program?",
    answer: "Note that as part of the program users will get digital badges from Google on their Google Skills profile once they complete a game or a trivia or a skill badge or a lab-free course. There are no separate certificates for the participating users."
  },
  {
    id: "new_10",
    question: "How many points will I get when I complete a skill badge?",
    answer: "After you complete 2 skill badges you are eligible to earn 1 Arcade point. For every 6 skills badges you will get 3 Arcade points and so on..."
  },
  {
    id: "new_11",
    question: "I have earned only 1 skill badges. How many points will I get?",
    answer: "Unfortunately, earning 1 skill badges will not be enough to claim an Arcade point. You will need to complete at least 2 Skill Badges to earn one point."
  },
  {
    id: "new_12",
    question: "Will I receive any swags or physical certificates for the games?",
    answer: "Users will get a special badge for each game they complete in this event and for each badge earned user will also receive 1 Arcade point which in turn will be used to redeem goodies when the prize counter opens. Please note there won't be any physical certificates or goodies just for completing the game."
  },
  {
    id: "new_13",
    question: "Are there prizes? What are the prizes?",
    answer: "Yes! The more badges you earn, the more arcade points you accumulate. Redeem points for prizes at the prize counter. The prize counter will be open at the end of the year."
  },
  {
    id: "new_14",
    question: "Do I get a prize as soon as I earn a badge?",
    answer: "No. You will not be able to claim a prize immediately. You'll be able to claim prizes when the prize counter opens."
  },
  {
    id: "new_15",
    question: "When does the prize counter open?",
    answer: "Great question. The prize counter dates would be announced soon. Stay tuned for exact dates."
  },
  {
    id: "new_16",
    question: "What do I have to do to get a prize?",
    answer: "Activate the Arcade for your account. Then join games, complete labs, learn skills, and earn badges! Each challenge consists of multiple labs. Complete all the labs successfully to earn the badge. Each badge gets you one point. Periodically, the prize counter will open and you'll be able to use points to claim swag."
  },
  {
    id: "new_17",
    question: "How will I know when the prize counter opens?",
    answer: "There are many ways to stay up to date. Add us to your calendar. Keep an eye on your email. And, follow us on our Google Developer Program Forum"
  },
  {
    id: "new_18",
    question: "How do arcade points work?",
    answer: "One point per eligible game/trivia badge. All eligible game/trivia badges are listed on this page. If it's not listed here, it's not eligible. Points expire after 6 months. You'll have at least one opportunity to redeem points, so please use it, don't lose it!"
  },
  {
    id: "new_19",
    question: "How do I know how many arcade points I have?",
    answer: "Compare the list of eligible arcade games to your Google Skills profile to calculate points."
  },
  {
    id: "new_20",
    question: "How can I get more arcade points?",
    answer: "Play more games! The more you learn, the more you earn."
  },
  {
    id: "new_21",
    question: "What are the upcoming arcade games?",
    answer: "Keep an eye on this page for current and upcoming games."
  },
  {
    id: "new_22",
    question: "I don't want a prize. Can I still play?",
    answer: "Yes! When the prize counter opens, participation is totally optional."
  },
  {
    id: "new_23",
    question: "What is the cost? Do I need quarters?",
    answer: "There is no cost to participate in Arcade games. No quarters needed! (Or any other currency!)"
  },
  {
    id: "new_24",
    question: "Can I participate if I'm already in another Google program? (Ex: Innovators, education programs, Learn to Earn, OnAir, Study Jams, DevFest)",
    answer: "Yes! Please keep in mind that different programs have varying requirements so check with other programs as well."
  },
  {
    id: "new_25",
    question: "Can I participate if I'm located in [your country of residence, whatever that may be]?",
    answer: "Yes, you may participate within the Google Skills Terms of Service!"
  },
  {
    id: "new_26",
    question: "What about sending prizes to [your country of residence, whatever that may be]?",
    answer: "We make every effort to reach you wherever you are, whenever possible. Items cannot be shipped to countries on the list of US Treasury Department’s Sanctions Programs and the following countries: Pakistan, Bangladesh, Iraq, Iran, North Korea, Crimea, Cuba, Sevastopol city and Syria. Each challenge includes details about prizes and shipping availability, as this list may change at any time (locations may be added or removed based on unforeseen events). If you’re in one of these countries, you are welcome to participate within the Terms of Service. You may decline a prize, select an address in a country where shipping is available."
  },
  {
    id: "new_27",
    question: "What if a lab isn't working?",
    answer: "Great question. The community is a great place to get questions answered. Or, you can request assistance from our support team directly within the Google Skills platform."
  },
  {
    id: "new_28",
    question: "What if there are no more seats in a game?",
    answer: "That happens sometimes! Seats are available on a first come, first serve basis. Sometimes additional seats open up, so keep an eye out for more opportunities to join if you miss the first round."
  },
  {
    id: "new_29",
    question: "How does Google Skills Arcade ensure a safe and supportive community?",
    answer: "The platform promotes a culture of respect, integrity, and fairness. Policies are in place to deter misconduct and maintain a positive learning environment for all participants."
  },
  {
    id: "new_30",
    question: "How can I ensure my participation is meaningful and aligned with the program’s goals?",
    answer: "Focus on learning, avoid shortcuts, and fully engage with the labs and games to develop genuine skills. Upholding the values of fairness and integrity is key to making the most of your experience in Google Skills Arcade."
  },
  {
    id: "new_31",
    question: "What should I do if I suspect someone is using unfair practices?",
    answer: "If you suspect someone is violating the rules, raise your concern with the Google Skills Arcade Team via Google Cloud Communities or report it to the support team. All reports are handled confidentially, and appropriate actions will be taken after investigation."
  },
  {
    id: "new_32",
    question: "Are there any learning resources available to help me complete labs?",
    answer: "The lab instructions provided are sufficient to help you complete the labs. If you still face challenges, you can reach out to the support team for assistance."
  },
  {
    id: "new_33",
    question: "Can I appeal a disqualification decision?",
    answer: "Yes, if you believe you were disqualified unfairly, contact the Arcade Team via Google Cloud Communities or the support team with relevant details. They will review your case and provide a resolution based on the evidence."
  },
  {
    id: "new_34",
    question: "How does Google Skills Arcade handle violations of its policies?",
    answer: "Violations, such as using scripts or engaging in unfair practices, result in immediate disqualification and exclusion from Google Skills Arcade and related programs. This strict approach ensures a fair and equitable environment for all participants."
  },
  {
    id: "new_35",
    question: "I've never used Google Skills before. Help!",
    answer: "Welcome, I'm so glad you're here. This tour of Google Cloud and the Google Skills platform will help you get oriented. It's available at no cost."
  },
  {
    id: "new_36",
    question: "Are Arcade Facilitator Milestones different from the Google Skills Arcade Player achievements?",
    answer: (
      <div className="space-y-2">
        <p>Yes! They are completely different. The milestones in the Arcade Facilitator program are different from the Arcade Player achievements.</p>
        <p>Note that, under the facilitator program, you mainly earn &quot;Bonus&quot; points when you complete a milestone and you earn &quot;Arcade&quot; points according to the Google Skills Arcade points system. Thus you can accumulate the Bonus points earned in the facilitator program and add that to your actual Arcade points to reach any of the mentioned player achievements and receive swags for that particular swag tier at the end of an Arcade season.</p>
      </div>
    )
  },
  {
    id: "new_37",
    question: "Will there be more swag items in the Arcade?",
    answer: "YES absolutely! Please note that until you specifically hear from us in any of our community posts that this wraps up for swag drops, those will keep happening on Google Developer Program Forums."
  },
  {
    id: "new_38",
    question: "I have already completed a few labs from this game in the past; do I need to redo them, or will my past completions automatically sync?",
    answer: "Each game environment is unique. Even if you have completed certain labs previously, those completions do not automatically sync, which may result in you not receiving a game badge."
  },
  {
    id: "new_39",
    question: "Can I share or gift my Arcade points with someone else?",
    answer: "No. Because points are based on your learning record, they stick with you."
  },

];

export function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return allFaqs;
    return allFaqs.filter(faq => {
      const qText = faq.question.toLowerCase();
      // For JSX elements, we could extract text, but let's just search the question for simplicity
      // since the prompt says "filter through frequently asked questions" (which usually means titles).
      // We'll also try to match answer if it's a string.
      const aText = typeof faq.answer === 'string' ? faq.answer.toLowerCase() : '';
      return qText.includes(q) || aText.includes(q);
    });
  }, [searchQuery]);

  const { leftCol, rightCol } = useMemo(() => {
    const left: typeof allFaqs = [];
    const right: typeof allFaqs = [];
    filteredFaqs.forEach((faq, index) => {
      if (index % 2 === 0) {
        left.push(faq);
      } else {
        right.push(faq);
      }
    });
    return { leftCol: left, rightCol: right };
  }, [filteredFaqs]);

  const renderFAQ = (faq: { id: string, question: string, answer: React.ReactNode }) => (
    <div key={faq.id} className="border border-slate-200/50 dark:border-slate-800/50 rounded-xl bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden text-left hover:bg-white/60 dark:hover:bg-slate-900/50 transition-colors duration-300">
      <button 
        onClick={() => toggle(faq.id)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3 pr-4">
          <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">?</div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{faq.question}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {openId === faq.id && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 text-sm pl-14">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto pt-24 pb-20 px-4">
      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 mb-4 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-[#8b5cf6]" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Find answers to common queries about the program, rewards, and eligibility</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No questions found matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-blue-500 hover:underline font-medium">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="space-y-4">
              {leftCol.map(renderFAQ)}
            </div>
            <div className="space-y-4">
              {rightCol.map(renderFAQ)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
