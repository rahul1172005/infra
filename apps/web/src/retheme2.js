/**
 * Design Language Retheme v2
 * Reduces border-radius from neobrutalist (40px) to sharp editorial (8-12px)
 * and adjusts card padding/spacing to match the reference graphic design aesthetic.
 */

const fs = require('fs');
const path = require('path');

const RADIUS_REPLACEMENTS = [
    // Large rounded → sharp editorial
    ['rounded-[40px]', 'rounded-xl'],
    ['rounded-[32px]', 'rounded-xl'],
    ['rounded-[28px]', 'rounded-xl'],
    ['rounded-3xl', 'rounded-xl'],
    ['rounded-2xl', 'rounded-lg'],
    // Keep xl and below as is — just fix the extreme ones

    // Shadow adjustments — make them crisper/more graphic
    ['shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]', 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'],
    ['shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]', 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'],
    ['shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]', 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'],
    ['hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]', 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'],
    ['hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]', 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'],

    // Border thickness — keep 4px on cards but reduce some inner elements
    // ['border-[4px]', 'border-[3px]'], // too broad — skip

    // Padding reduction on large hero cards
    ['p-8 md:p-12', 'p-6 md:p-10'],
];

function walk(dir, cb) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p, cb);
        else if (p.endsWith('.tsx') || p.endsWith('.ts')) cb(p);
    });
}

const APP_DIR = path.join(__dirname, 'app', '(app)');
let count = 0;

walk(APP_DIR, filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    for (const [from, to] of RADIUS_REPLACEMENTS) {
        content = content.split(from).join(to);
    }
    if (content !== orig) {
        fs.writeFileSync(filePath, content);
        count++;
        console.log('✓', path.basename(path.dirname(filePath)) + '/' + path.basename(filePath));
    }
});

console.log('\nFiles updated:', count);
