const fs = require('fs');
let code = fs.readFileSync('src/components/BadgeTracker.tsx', 'utf8');

// The bottom of the file should close the motion.div and the div properly
code = code.replace(
`        </div>
        </div>
      </motion.div>
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
console.log("Patched bottom syntax");
