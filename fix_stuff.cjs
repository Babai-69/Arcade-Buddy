const fs = require('fs');

// 1. Move the button in FacilitatorCalculator.tsx
let calcContent = fs.readFileSync('src/components/FacilitatorCalculator.tsx', 'utf8');

// Remove it from its current place
calcContent = calcContent.replace(/          \{\/\* View Progress Button \*\/\}[\s\S]*?<\/div>\n/m, '');

// Put it right under the "Check Progress" button but only if data is present
const checkProgressForm = `          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Progress'}
          </button>
        </form>`;

const newCheckProgressForm = `          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Progress'}
          </button>
        </form>
        {data && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-center">
            <Link to="/my-progress" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto">
              View Detailed Progress & Share Card
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}`;

calcContent = calcContent.replace(checkProgressForm, newCheckProgressForm);
fs.writeFileSync('src/components/FacilitatorCalculator.tsx', calcContent);

// 2. Reduce height of the Community Welcome modal
let modalContent = fs.readFileSync('src/components/CommunityWelcomeModal.tsx', 'utf8');

// Reduce vertical margins/paddings
modalContent = modalContent.replace(/className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950\/80 backdrop-blur-sm overflow-y-auto font-sans"/, 'className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans"');
modalContent = modalContent.replace(/my-2 max-h-\[95vh\]/, 'my-0 max-h-[98vh]');
modalContent = modalContent.replace(/p-4 md:p-6/, 'p-4 md:p-5');

// Make boxes a bit tighter
modalContent = modalContent.replace(/mb-4/g, 'mb-3');
modalContent = modalContent.replace(/mb-6/g, 'mb-4');
modalContent = modalContent.replace(/mb-3/g, 'mb-2');

fs.writeFileSync('src/components/CommunityWelcomeModal.tsx', modalContent);
