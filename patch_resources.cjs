const fs = require('fs');
let code = fs.readFileSync('src/pages/ResourcesPage.tsx', 'utf8');

// Replace lab limit item
const oldLabLimit = `{
    id: "lab-limit",
    category: "INFO",
    title: "Daily Lab Limit — How it works",
    description: "Understand the daily lab limits, what happens when you exceed them, and how to track your progress.",
    linkText: "Read More ➡",
    link: "#",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782318350/12_a0wpls.png",
    bg: "bg-blue-50 dark:bg-slate-800",
  }`;

const newLabLimit = `{
    category: "INFO",
    title: "Daily Lab Limit — How it works",
    description: "Understand the daily lab limits, what happens when you exceed them, and how to track your progress.",
    linkText: "Read More ➡",
    link: "/resources/daily-lab-limit-guide",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782318350/12_a0wpls.png",
    bg: "bg-blue-50 dark:bg-slate-800",
  }`;

code = code.replace(oldLabLimit, newLabLimit);

// Replace tier waterfall item
const oldWaterfall = `{
    id: "tier-waterfall",
    category: "INFO",
    title: "Tier Swag Distribution System",
    description: "Understand the Google Cloud Arcade 2026 Waterfall Tier System.",
    linkText: "CHECK IT ➡",
    link: "#",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782320743/image_nnuehs.png",
    bg: "bg-purple-50 dark:bg-slate-800",
  }`;

const newWaterfall = `{
    category: "INFO",
    title: "Tier Swag Distribution System",
    description: "Understand the Google Cloud Arcade 2026 Waterfall Tier System.",
    linkText: "CHECK IT ➡",
    link: "/resources/swag-distribution-system",
    internal: true,
    image: "https://res.cloudinary.com/dqj9yaa0g/image/upload/v1782320743/image_nnuehs.png",
    bg: "bg-purple-50 dark:bg-slate-800",
  }`;

code = code.replace(oldWaterfall, newWaterfall);

// Remove the modals part from the bottom of the component
// Since there's multiple lines and potential formatting issues, I'll use regex.
code = code.replace(/\{\/\* Modals \*\/\}\s*\{activeModal === 'tier-waterfall'[\s\S]*?<\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/, "</div>\n  );\n}");

// Remove LabLimitAnimation import since it's no longer used in this file
code = code.replace(/import \{ LabLimitAnimation \} from '\.\.\/components\/LabLimitAnimation';\n/, "");

fs.writeFileSync('src/pages/ResourcesPage.tsx', code);
