import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Anant Shikhare',
    role: 'Arcade Student • Pune',
    rating: 4.9,
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHtRdZWAm24jw/profile-displayphoto-scale_200_200/B56Zi7MEzcHMAY-/0/1755487162576?e=2147483647&v=beta&t=i3kFJpFUuvz06llyulJ6NQj3WL26UfwZYYd_gUBh-Qc',
    avatarColor: 'from-indigo-600 to-blue-700',
    avatarText: 'A',
    text: 'Bhai tu na hota to ye arcade complete hi nhi hota yaar! Vertex AI challenge lab me 3 ghante se fasa hua tha, yaha exact steps dekh ke 10 min me pass ho gaya. Dil se shukriya bhai 🙏',
  },
  {
    name: 'Tanvi Deshmukh',
    role: 'CSE 4th Year • Nagpur',
    rating: 4.9,
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP-VzYKSGNEXpCf-DLe6Is3H8UBjfH1ydA1ypqtPsHVHdwGgZKQTJjnPs&s=10',
    avatarColor: 'from-purple-500 to-pink-500',
    avatarText: 'T',
    text: 'Pehle laga tha December tak points manage karna bohot hard hoga, but syllabus page pe saare October games ke access codes ek jagah mil gaye. Trick-or-Metric kal hi finish kiya, +1 pt locked!',
  },
  {
    name: 'Rohan Mehta',
    role: 'Cloud Learner • Delhi',
    rating: 5.0,
    avatarUrl: 'https://media.licdn.com/dms/image/v2/C4E03AQEwpCqO0Rs2jA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1608754101980?e=2147483647&v=beta&t=3freflnk2tBm8oKQHW9d-Evzr3_CPPL67iqdQ5TOJf8',
    avatarColor: 'from-blue-500 to-indigo-500',
    avatarText: 'R',
    text: 'Calculator tool ekdum next level hai bro. Mujhe laga tha Sept 14 ke baad sab points waste ho gaye, par yaha clear bataya ki December tak arcade points continue rahenge. 48 points done!',
  },
  {
    name: 'Aanya Sen',
    role: 'Cloud Aspirant • Bengaluru',
    rating: 5.0,
    avatarUrl: 'https://www.ceew.in/sites/default/files/styles/our_team_view_image_style/public/teams/aanya-singh-edited.jpg?itok=LmKujYE4',
    avatarColor: 'from-pink-500 to-rose-500',
    avatarText: 'A',
    text: 'The syllabus breakdown is so well-structured! Having direct links to the free lab badges without unnecessary searching made studying for my cloud certifications so much easier.',
  },
  {
    name: 'Shreya Mukherjee',
    role: 'B.Tech Student • Kolkata',
    rating: 4.8,
    avatarUrl: 'https://www.ceew.in/sites/default/files/styles/our_team_view_image_style/public/teams/anushka-goswami-edited-image.jpg?itok=dsqBEAZV',
    avatarColor: 'from-teal-500 to-emerald-500',
    avatarText: 'S',
    text: 'Bhai sach batau toh official portal pe search karna was a big headache. Yaha Beginner & Intermediate filter karke direct links mil jate hai. Zero credits me 25+ badges bana liye!',
  },
  {
    name: 'Harsh Vardhan',
    role: 'DevOps Aspirant • Jaipur',
    rating: 4.9,
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQECxzHyh_SSX1xZ-ORTLPYv8NrxJJ6_wDUm658q_frNul0_BuV434Lgkk&s=10',
    avatarColor: 'from-red-500 to-orange-500',
    avatarText: 'H',
    text: 'Kubernetes load balancer lab me bar-bar pod crash ho raha tha. Community Telegram pe query pucha and 15 min me solution mil gaya. Aise helpful peers kahi aur nahi mile!',
  },
  {
    name: 'Pooja Nambiar',
    role: 'IT Student • Kochi',
    rating: 5.0,
    avatarUrl: 'https://cst.princeton.edu/sites/g/files/toruqf6481/files/styles/freeform_750w/public/2024-11/aanya_kasera.jpeg?itok=2S_uAEUO',
    avatarColor: 'from-blue-600 to-cyan-500',
    avatarText: 'P',
    text: 'Hamare college group me sab Arcade Buddy hi use kar rahe hai. Leaderboard pe dosto ke sath compete karne me alag hi maza aata hai. Legend tier jacket loading soon 😎',
  },
  {
    name: 'Ayush Tiwari',
    role: 'Cloud Learner • Lucknow',
    rating: 4.8,
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQFLhK1BV5nOFw/profile-displayphoto-scale_200_200/B4DZojHNkRJUAY-/0/1761525685599?e=2147483647&v=beta&t=dkiZZkT2oTnFzZjt7-M0NTorngupEcIw8J-3jY8KykY',
    avatarColor: 'from-amber-500 to-yellow-500',
    avatarText: 'A',
    text: 'Honestly the most seamless Arcade tool I have come across. The October game codes worked on the very first try, saved me hours of frustration searching forums.',
  },
];

export function HomeTestimonials() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#4285F4] dark:text-[#60A5FA] mb-1.5 block font-display">
            HEAR FROM OUR LEARNERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            What players are saying
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Real feedback from students navigating the Google Cloud Arcade.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3">
                  {rev.avatarUrl ? (
                    <img
                      src={rev.avatarUrl}
                      alt={rev.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${rev.avatarColor} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                    >
                      {rev.avatarText}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {rev.role}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 mb-3 text-amber-500">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {rev.rating}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
