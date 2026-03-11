/**
 * Color Retheme Script: Multi-color Neobrutalist → White/Black/Red
 *
 * OLD PALETTE → NEW PALETTE
 * #E5FF00 (yellow)   → #E81414 (primary red accent)
 * #C0FF8A (lime)     → #FFFFFF (white)
 * #FFA6D9 (pink)     → #F5F5F5 (light gray)
 * #B490FF (purple)   → #000000 (black)
 * #FFD4A1 (peach)    → #FFFFFF (white)
 * #40E0D0 (teal)     → #E81414 (red)
 * #F4F4F0 (warm off) → #F5F5F5 (neutral off-white)
 */

const fs = require('fs');
const path = require('path');

// ── Simple string replacements ─────────────────────────────────────────────
const SIMPLE = [
    // Background colours
    ['bg-[#E5FF00]', 'bg-[#E81414]'],
    ['bg-[#C0FF8A]', 'bg-white'],
    ['bg-[#FFA6D9]', 'bg-[#F5F5F5]'],
    ['bg-[#B490FF]', 'bg-black'],
    ['bg-[#FFD4A1]', 'bg-white'],
    ['bg-[#40E0D0]', 'bg-[#E81414]'],
    ['bg-[#F4F4F0]', 'bg-[#F5F5F5]'],

    // Text colours
    ['text-[#40E0D0]', 'text-[#E81414]'],
    ['text-[#B490FF]', 'text-[#E81414]'],
    ['text-[#FFA6D9]', 'text-[#E81414]'],
    ['text-[#C0FF8A]', 'text-white'],
    ['text-[#E5FF00]', 'text-white'],
    ['text-[#FFD4A1]', 'text-black'],

    // Border colours
    ['border-[#E5FF00]', 'border-[#E81414]'],
    ['border-[#B490FF]', 'border-black'],
    ['border-[#C0FF8A]', 'border-white'],
    ['border-[#FFA6D9]', 'border-[#E81414]'],

    // Ring / focus
    ['ring-yellow-400', 'ring-red-600'],
    ['focus:ring-yellow-400', 'focus:ring-red-600'],

    // Shadow with yellow
    ['rgba(229,255,0', 'rgba(232,20,20'],

    // Gradient tokens
    ['from-yellow-400', 'from-red-600'],
    ['via-yellow-400', 'via-red-600'],
    ['to-yellow-400', 'to-red-600'],
    ['from-lime-300', 'from-red-400'],
    ['via-teal-300', 'via-red-300'],
    ['to-lime-300', 'to-red-400'],

    // Hover variants of colours
    ['hover:bg-[#C0FF8A]', 'hover:bg-[#F5F5F5]'],
    ['hover:bg-[#FFA6D9]', 'hover:bg-[#FFE5E5]'],
    ['hover:bg-[#E5FF00]', 'hover:bg-[#E81414]'],
    ['hover:bg-[#B490FF]', 'hover:bg-black'],

    // Selection tint
    ['selection:bg-[#E5FF00]', 'selection:bg-[#E81414]'],
    ['selection:text-black', 'selection:text-white'],

    // Animate-pulse dot colours (status indicators)
    ['bg-[#C0FF8A] border-[2px] border-black animate-pulse', 'bg-[#E81414] border-[2px] border-black animate-pulse'],
];

// ── Context-aware replacement: fix text-black on now-red backgrounds ───────
// After the simple pass, any className that contains bg-[#E81414] and text-black
// should use text-white instead (red backgrounds need white text for contrast)
function fixTextContrastInClassNames(content) {
    // Match complete className="..." strings
    return content.replace(/className="([^"]*)"/g, (full, classes) => {
        if (classes.includes('bg-[#E81414]') && classes.includes('text-black')) {
            // Only flip if the element isn't a child-targeting context (like group-hover:text-black)
            const fixed = classes
                .replace(/\btext-black\b/g, 'text-white')
                .replace(/\bplaceholder-black\b/g, 'placeholder-white')
                .replace(/\bstroke-black\b/g, 'stroke-white');
            return `className="${fixed}"`;
        }
        // For bg-black elements that had text-white already — keep
        // For elements with bg-black and text-black — invert
        if (classes.includes('bg-black') && classes.includes('text-black') && !classes.includes('hover:bg-black')) {
            const fixed = classes.replace(/\btext-black\b/g, 'text-white');
            return `className="${fixed}"`;
        }
        return full;
    });
}

// ── Template literal className (template strings won't be caught by above) ─
// Also handle backtick classNames for dynamic classes
function fixTemplateLiterals(content) {
    return content.replace(/className={`([^`]*)`}/g, (full, classes) => {
        let fixed = classes;
        // background
        fixed = fixed.replace(/#E5FF00/g, '#E81414');
        fixed = fixed.replace(/#C0FF8A/g, '#FFFFFF');
        fixed = fixed.replace(/#FFA6D9/g, '#F5F5F5');
        fixed = fixed.replace(/#B490FF/g, '#000000');
        fixed = fixed.replace(/#FFD4A1/g, '#FFFFFF');
        fixed = fixed.replace(/#40E0D0/g, '#E81414');
        fixed = fixed.replace(/#F4F4F0/g, '#F5F5F5');
        return 'className={`' + fixed + '`}';
    });
}

// ── Walk directory ──────────────────────────────────────────────────────────
function walk(dir, cb) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) walk(p, cb);
        else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) cb(p);
    });
}

const APP_DIR = path.join(__dirname, 'app', '(app)');
const AUTH_DIR = path.join(__dirname, 'app', 'auth');

let patchedCount = 0;

function processDir(dir) {
    walk(dir, filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;

        // Simple string replacements
        for (const [from, to] of SIMPLE) {
            content = content.split(from).join(to);
        }

        // Template literal fixes
        content = fixTemplateLiterals(content);

        // Context-aware text contrast fixes
        content = fixTextContrastInClassNames(content);

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            patchedCount++;
            console.log('✓ patched:', path.relative(process.cwd(), filePath));
        }
    });
}

processDir(APP_DIR);
// also fix auth pages for consistency
if (fs.existsSync(AUTH_DIR)) processDir(AUTH_DIR);

console.log(`\nTotal files patched: ${patchedCount}`);
