/**
 * Page Header Retheme v3
 * Updates page-level hero headers to the new editorial white/black/red design:
 * - Black section bg for primary header cards
 * - Red for section badges
 * - Sharper, more editorial look
 */

const fs = require('fs');
const path = require('path');

// These are the exact patterns for the colored hero header cards that still have old colors
const HEADER_REPLACEMENTS = [
    // Teal header (leaderboard) → black
    ['bg-[#E81414] rounded-xl p-6 md:p-10 bg-[#E81414]', 'bg-black rounded-xl p-6 md:p-10'],

    // Any remaining warm bg header cards → black or white
    // Page header wrappers with old colors that slipped through
    ['mb-12 rounded-xl border-[4px] border-black bg-[#40E0D0]', 'mb-6 rounded-xl border-[4px] border-black bg-black'],
    ['mb-16 border-[4px] border-black p-6 md:p-10 bg-[#40E0D0]', 'mb-8 border-[4px] border-black p-6 md:p-10 bg-black'],
    ['bg-[#40E0D0] rounded-xl', 'bg-black rounded-xl'],

    // pb-32 is excessive now → pb-12
    ['pb-32', 'pb-12'],
    ['pb-20', 'pb-10'],

    // Gap overrides  
    ['gap-12', 'gap-6'],

    // Remaining stat padding artefacts
    ['min-w-[150px] md:min-w-[200px]', 'min-w-[130px] md:min-w-[180px]'],

    // Reduce over-sized mb-16 → mb-8
    ['mb-16', 'mb-8'],

    // Replace leftover colored hero card backgrounds in the page header modules
    // These are the big colored wrappers: motion.div with a full bg color
    ["bg-[#FFD4A1] rounded-xl", "bg-white rounded-xl"],
    ["bg-[#E81414] rounded-xl p-6 md:p-10 bg-[#FFD4A1]", "bg-black rounded-xl p-6 md:p-10"],
];

function walk(dir, cb) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p, cb);
        else if (p.endsWith('.tsx')) cb(p);
    });
}

const APP_DIR = path.join(__dirname, 'app', '(app)');
let count = 0;

walk(APP_DIR, filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    for (const [from, to] of HEADER_REPLACEMENTS) {
        content = content.split(from).join(to);
    }
    if (content !== orig) {
        fs.writeFileSync(filePath, content);
        count++;
        console.log('✓', path.basename(filePath));
    }
});

console.log('\nTotal:', count);
