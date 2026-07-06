import re
import json

existing_questions = [
    "What is the eligibility criteria for enrolling in the program?",
    "The enrolment form is closed. How should I enrol in the program?",
    "I did not receive an invitation email after applying through the enrolment form. What should I do?",
    "I need to make some changes to the my registration details in the enrolment form, but it's closed now? What should I do?",
    "The links are not working in my enrolment email. What should I do?",
    "I have more questions about the Google Skills Arcade, where can I find them?",
    "If I have already participated in last year's cohort of the program, can I participate in this year's cohort as well?",
    "Are users who participated/are participating in any other cloud campaigns or Arcade individually eligible for the program?",
    "I have already completed the skill badges/games in the program, what should I do?",
    "I am a part of a Google Cloud Partner organisation or am currently doing specific skill badges which are specifically assigned to my organisation and not available in the public GCSB catalog? Can I participate in the program?",
    "I have achieved all the milestones in the program. Will I get the Bonus Points associated with each of them?",
    "I have completed few/all of the milestones. When will I get my prizes?",
    "Where will the schwags be delivered - to my address ?",
    "Is my country eligible for shipping prizes?",
    "Will users receive any certificate after completing any milestone in the program?"
]

new_qa_text = """
How many points will I get when I complete a skill badge?
After you complete 2 skill badges you are eligible to earn 1 Arcade point. For every 6 skills badges you will get 3 Arcade points and so on...

I have earned only 1 skill badges. How many points will I get?
Unfortunately, earning 1 skill badges will not be enough to claim an Arcade point. You will need to complete at least 2 Skill Badges to earn one point.

Will I receive any swags or physical certificates for the games?
Users will get a special badge for each game they complete in this event and for each badge earned user will also receive 1 Arcade point which in turn will be used to redeem goodies when the prize counter opens. Please note there won't be any physical certificates or goodies just for completing the game.

Are there prizes? What are the prizes?
Yes! The more badges you earn, the more arcade points you accumulate. Redeem points for prizes at the prize counter. The prize counter will be open at the end of the year.

Do I get a prize as soon as I earn a badge?
No. You will not be able to claim a prize immediately. You'll be able to claim prizes when the prize counter opens.

When does the prize counter open?
Great question. The prize counter dates would be announced soon. Stay tuned for exact dates.

What do I have to do to get a prize?
Activate the Arcade for your account. Then join games, complete labs, learn skills, and earn badges! Each challenge consists of multiple labs. Complete all the labs successfully to earn the badge. Each badge gets you one point. Periodically, the prize counter will open and you'll be able to use points to claim swag.

How will I know when the prize counter opens?
There are many ways to stay up to date. Add us to your calendar. Keep an eye on your email. And, follow us on our Google Developer Program Forum

How do arcade points work?
One point per eligible game/trivia badge. All eligible game/trivia badges are listed on this page. If it's not listed here, it's not eligible. Points expire after 6 months. You'll have at least one opportunity to redeem points, so please use it, don't lose it!

How do I know how many arcade points I have?
Compare the list of eligible arcade games to your Google Skills profile to calculate points.

How can I get more arcade points?
Play more games! The more you learn, the more you earn.

What are the upcoming arcade games?
Keep an eye on this page for current and upcoming games.

I don't want a prize. Can I still play?
Yes! When the prize counter opens, participation is totally optional.

What is the cost? Do I need quarters?
There is no cost to participate in Arcade games. No quarters needed! (Or any other currency!)

Can I participate if I'm already in another Google program? (Ex: Innovators, education programs, Learn to Earn, OnAir, Study Jams, DevFest)
Yes! Please keep in mind that different programs have varying requirements so check with other programs as well.

Can I participate if I'm located in [your country of residence, whatever that may be]?
Yes, you may participate within the Google Skills Terms of Service!

What about sending prizes to [your country of residence, whatever that may be]?
We make every effort to reach you wherever you are, whenever possible. Items cannot be shipped to countries on the list of US Treasury Department’s Sanctions Programs and the following countries: Pakistan, Bangladesh, Iraq, Iran, North Korea, Crimea, Cuba, Sevastopol city and Syria. Each challenge includes details about prizes and shipping availability, as this list may change at any time (locations may be added or removed based on unforeseen events). If you’re in one of these countries, you are welcome to participate within the Terms of Service. You may decline a prize, select an address in a country where shipping is available.

What if a lab isn't working?
Great question. The community is a great place to get questions answered. Or, you can request assistance from our support team directly within the Google Skills platform.

What if there are no more seats in a game?
That happens sometimes! Seats are available on a first come, first serve basis. Sometimes additional seats open up, so keep an eye out for more opportunities to join if you miss the first round.

How does Google Skills Arcade ensure a safe and supportive community?
The platform promotes a culture of respect, integrity, and fairness. Policies are in place to deter misconduct and maintain a positive learning environment for all participants.

How can I ensure my participation is meaningful and aligned with the program’s goals?
Focus on learning, avoid shortcuts, and fully engage with the labs and games to develop genuine skills. Upholding the values of fairness and integrity is key to making the most of your experience in Google Skills Arcade.

What should I do if I suspect someone is using unfair practices?
If you suspect someone is violating the rules, raise your concern with the Google Skills Arcade Team via Google Cloud Communities or report it to the support team. All reports are handled confidentially, and appropriate actions will be taken after investigation.

Are there any learning resources available to help me complete labs?
The lab instructions provided are sufficient to help you complete the labs. If you still face challenges, you can reach out to the support team for assistance.

Can I appeal a disqualification decision?
Yes, if you believe you were disqualified unfairly, contact the Arcade Team via Google Cloud Communities or the support team with relevant details. They will review your case and provide a resolution based on the evidence.

How does Google Skills Arcade handle violations of its policies?
Violations, such as using scripts or engaging in unfair practices, result in immediate disqualification and exclusion from Google Skills Arcade and related programs. This strict approach ensures a fair and equitable environment for all participants.

I've never used Google Skills before. Help!
Welcome, I'm so glad you're here. This tour of Google Cloud and the Google Skills platform will help you get oriented. It's available at no cost.

Are Arcade Facilitator Milestones different from the Google Skills Arcade Player achievements?
Yes! They are completely different. The milestones in the Arcade Facilitator program are different from the Arcade Player achievements.
Note that, under the facilitator program, you mainly earn "Bonus" points when you complete a milestone and you earn "Arcade" points according to the Google Skills Arcade points system. Thus you can accumulate the Bonus points earned in the facilitator program and add that to your actual Arcade points to reach any of the mentioned player achievements and receive swags for that particular swag tier at the end of an Arcade season.

Will there be more swag items in the Arcade?
YES absolutely! Please note that until you specifically hear from us in any of our community posts that this wraps up for swag drops, those will keep happening on Google Developer Program Forums.

I have already completed a few labs from this game in the past; do I need to redo them, or will my past completions automatically sync?
Each game environment is unique. Even if you have completed certain labs previously, those completions do not automatically sync, which may result in you not receiving a game badge.

Can I share or gift my Arcade points with someone else?
No. Because points are based on your learning record, they stick with you.
"""

blocks = new_qa_text.strip().split('\n\n')
pairs = []
i = 0
while i < len(blocks):
    if blocks[i].endswith('?'):
        q = blocks[i]
        a = []
        i += 1
        while i < len(blocks) and not blocks[i].endswith('?'):
            a.append(blocks[i])
            i += 1
        pairs.append({"question": q, "answer": "\n".join(a)})
    else:
        # Fallback split
        lines = blocks[i].split('\n')
        q = lines[0]
        a = "\n".join(lines[1:])
        pairs.append({"question": q, "answer": a})
        i += 1

filtered_pairs = []
for p in pairs:
    # Basic similarity check or exact match
    if p["question"] not in existing_questions:
        if "Is my country eligible" in p["question"] and "country of residence" in p["question"]:
            continue
        filtered_pairs.append(p)

with open('new_faqs.json', 'w') as f:
    json.dump(filtered_pairs, f)

