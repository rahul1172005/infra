const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = path.join(__dirname, 'apps/web/src/app');

walk(targetDir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;

        // Replace UPPERCASE_WORDS with UPPERCASE WORDS between tags
        const textRegex = />([^<]*?)</g;
        content = content.replace(textRegex, (match, p1) => {
            // Check if there's any lowercase letter in p1 to avoid touching actual code (like _id)
            if (/[a-z]/.test(p1)) return match;

            // Check if there's _
            if (!p1.includes('_')) return match;

            const newText = p1.replace(/([A-Z0-9])_([A-Z0-9])/g, '$1 $2');
            if (newText !== p1) {
                modified = true;
                return `>${newText}<`;
            }
            return match;
        });

        // Also replace in template strings `... UPPER_CASE ...` and strings
        // This is riskier so I'll only do it if the word looks like a title like "TEAM_ALPHA: ..."
        // We'll skip it for now and do it manually if needed, or do a specific regex
        const objTextRegex = /'([A-Z0-9]+(?:_[A-Z0-9]+)+[^a-z']*)'/g;
        content = content.replace(objTextRegex, (match, p1) => {
            const newText = p1.replace(/_/g, ' ');
            if (newText !== p1) {
                modified = true;
                return `'${newText}'`;
            }
            return match;
        });

        const objTextRegex2 = /"([A-Z0-9]+(?:_[A-Z0-9]+)+[^a-z"]*)"/g;
        content = content.replace(objTextRegex2, (match, p1) => {
            // Ignore if it has className or style meaning (e.g., CSS vars, though usually lower)
            if (match.includes('className') || match.includes('bg-[#')) return match;
            const newText = p1.replace(/_/g, ' ');
            if (newText !== p1) {
                modified = true;
                return `"${newText}"`;
            }
            return match;
        });

        // Button cylinder shaping
        // Find tags like <button ...> or <Link ...> or <div ... onClick ...>
        // and replace rounded-xl | rounded-2xl | rounded-lg with rounded-full
        // Specifically replacing rounded-xl, rounded-lg, rounded-md with rounded-full if it has button intent
        // It's safer to just look for things with `button` or `Link` or `hover:` or `cursor-pointer` and `px-` `py-` 
        // We'll just replace 'rounded-xl', 'rounded-2xl', 'rounded-lg' with 'rounded-full' when there is 'px-' and 'py-' and 'hover:'
        /*
        content = content.replace(/(class[Nn]ame=(?:\{`|["']).*?)(rounded-(?:xl|2xl|3xl|lg|md))(.*?(?:`\}|["']))/g, (match, p1, p2, p3) => {
            if (match.includes('px-') && match.includes('py-') && match.includes('hover:')) {
                modified = true;
                return `${p1}rounded-full${p3}`;
            }
            return match;
        });
        */

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
