const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

code = code.replace(
`      </div>
      </motion.div>
    )}
    </AnimatePresence>`,
`      </motion.div>
      </div>
    )}
    </AnimatePresence>`
);

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Patched 2");
