const fs = require('fs');
let content = fs.readFileSync('src/components/FacilitatorSyllabus.tsx', 'utf8');

const targetStr = `        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Syllabus for the program
          </h1>
        </div>`;

const insertStr = `        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Syllabus for the program
          </h1>
        </div>

        <div className="mb-8 text-slate-700 dark:text-slate-300">
          <p className="mb-4">
            While you can find all the active games on the <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Skills Arcade website</a> directly, we are maintaining a copy of the same here so that it becomes easier for you to find badges and complete them so that you can earn <strong>"Arcade Points"</strong>. <em>(See <Link to="/facilitator" className="text-blue-600 dark:text-blue-400 hover:underline">points system</Link> for more details)</em>
          </p>
          <p>
            <strong>Recommended</strong> - Its better to complete the Arcade games first since they have a deadline in a given month. Complete as many skill badges as you can later to earn more "Arcade Points".
          </p>
        </div>`;

content = content.replace(targetStr, insertStr);
if (!content.includes("import { Link }")) {
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';");
}

fs.writeFileSync('src/components/FacilitatorSyllabus.tsx', content);
