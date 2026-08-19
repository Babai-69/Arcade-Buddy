const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileChecker.tsx', 'utf8');

code = code.replace('</div></div>\n                    </motion.div>', '</div>\n                    </motion.div>');

fs.writeFileSync('src/components/ProfileChecker.tsx', code, 'utf8');
console.log("Fixed");
