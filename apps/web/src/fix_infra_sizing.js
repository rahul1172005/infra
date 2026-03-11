const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p, cb);
        else if (p.endsWith('.tsx')) cb(p);
    });
}

let c = 0;
walk('apps/web/src/app/(app)', p => {
    let text = fs.readFileSync(p, 'utf8');
    let text2 = text.replace(/className=\"([^"]*text-\d?xl md:text-\[\d+px\][^"]*)\"/g, (m, c1) => {
        return c1.includes('break-words') ? m : 'className="' + c1 + ' break-words"';
    });
    // also find any h1 that does not have break-words and has md:text-6xl lg:text-7xl or similar
    text2 = text2.replace(/className=\"([^"]*text-\d?xl[ \t]+md:text-\d?xl[^"]*)\"/g, (m, c1) => {
        if (!c1.includes('break-words') && m.includes('<h1') || m.includes('<h2') || m.includes('<h3')) {
            return 'className="' + c1 + ' break-words"';
        }
        return m;
    });

    if (text !== text2) {
        fs.writeFileSync(p, text2);
        c++;
        console.log(p);
    }
});
console.log('TOTAL:', c);
