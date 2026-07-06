const fs = require('fs');
let code = fs.readFileSync('src/components/UserProgressDashboard.tsx', 'utf8');

const replacement = `
  // Calculate remaining for ultimate milestone
  const gameBadgesRemaining = Math.max(0, 12 - completedGameBadgesCount);
  const skillBadgesRemaining = Math.max(0, 66 - completedSkillBadgesCount);
  const isUltimateReached = gameBadgesRemaining === 0 && skillBadgesRemaining === 0;

  const milestones = [
    { name: 'Milestone 1', games: 6, skills: 18 },
    { name: 'Milestone 2', games: 8, skills: 34 },
    { name: 'Milestone 3', games: 10, skills: 50 },
    { name: 'Ultimate Milestone', games: 12, skills: 66 }
  ];
  
  let currentMilestone = null;
  let nextMilestone = null;
  
  for (let i = 0; i < milestones.length; i++) {
    if (completedGameBadgesCount >= milestones[i].games && completedSkillBadgesCount >= milestones[i].skills) {
      currentMilestone = milestones[i];
    } else {
      nextMilestone = milestones[i];
      break;
    }
  }

  const nextMilestoneGamesRemaining = nextMilestone ? Math.max(0, nextMilestone.games - completedGameBadgesCount) : 0;
  const nextMilestoneSkillsRemaining = nextMilestone ? Math.max(0, nextMilestone.skills - completedSkillBadgesCount) : 0;
`;

code = code.replace(/  \/\/ Calculate remaining for ultimate milestone\n  const gameBadgesRemaining[\s\S]*?const isUltimateReached = gameBadgesRemaining === 0 && skillBadgesRemaining === 0;/, replacement.trim());

const renderReplacement = `
          {/* Next Milestone Card */}
          <div className={\`p-5 rounded-xl border flex flex-col sm:flex-row gap-4 items-start sm:items-center \${!nextMilestone ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-800/50'}\`}>
            <div className={\`p-3 rounded-full shrink-0 \${!nextMilestone ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'}\`}>
              {!nextMilestone ? <CheckCircle className="w-8 h-8" /> : <BellRing className="w-8 h-8" />}
            </div>
            <div className="flex-1">
              <h3 className={\`font-bold text-xl mb-1 \${!nextMilestone ? 'text-indigo-900 dark:text-indigo-300' : 'text-purple-900 dark:text-purple-300'}\`}>
                {!nextMilestone ? 'Ultimate Milestone Achieved! 🎉' : \`Next Reward: \${nextMilestone.name}\`}
              </h3>
              <p className={\`text-sm \${!nextMilestone ? 'text-indigo-800 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}\`}>
                {!nextMilestone 
                  ? 'Incredible work! You have completed enough game and skill badges to reach the Ultimate Milestone.'
                  : (
                    <>
                      You need <strong className="text-purple-700 dark:text-purple-400">{nextMilestoneGamesRemaining} more Game Badge{nextMilestoneGamesRemaining !== 1 ? 's' : ''}</strong> and <strong className="text-blue-700 dark:text-blue-400">{nextMilestoneSkillsRemaining} more Skill Badge{nextMilestoneSkillsRemaining !== 1 ? 's' : ''}</strong> to reach {nextMilestone.name}.
                    </>
                  )
                }
              </p>
              {nextMilestone && (
                <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden flex">
                   {/* Just a visual progress bar representation */}
                   <div className="bg-purple-500 h-2.5" style={{ width: \`\${Math.min(100, (completedGameBadgesCount / nextMilestone.games) * 50)}%\` }}></div>
                   <div className="bg-blue-500 h-2.5" style={{ width: \`\${Math.min(100, (completedSkillBadgesCount / nextMilestone.skills) * 50)}%\` }}></div>
                </div>
              )}
            </div>
          </div>
`;

code = code.replace(/          \{\/\* Daily Reminder \/ Recommendations \*\/\}[\s\S]*?<\/div>\n          \}/, renderReplacement.trim());

fs.writeFileSync('src/components/UserProgressDashboard.tsx', code);
