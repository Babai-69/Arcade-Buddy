const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

code = code.replace(
`      </motion.div>
      </div>
    )}
    </AnimatePresence>`,
`        </div>
      </motion.div>
      </div>
    )}
    </AnimatePresence>`
);

fs.writeFileSync('src/components/BadgeTracker.tsx', code, 'utf8');
console.log("Patched 3");
