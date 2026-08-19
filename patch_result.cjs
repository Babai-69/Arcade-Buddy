const fs = require('fs');

let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

// I need to replace the entire `{result && (...)}` block.
// Let's use a regex or string replacement strategy that grabs from `{result && (` up to the end of the `)}` before `BadgeTracker`
