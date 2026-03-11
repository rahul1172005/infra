const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps/web/src');

function walkSync(dir, filelist = []) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            const dirFile = path.join(dir, file);
            if (fs.statSync(dirFile).isDirectory()) {
                filelist = walkSync(dirFile, filelist);
            } else {
                if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
                    filelist.push(dirFile);
                }
            }
        });
    }
    return filelist;
}

const files = walkSync(baseDir);
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // aggressively remove tailwind font classes
    content = content.replace(/\bfont-sans\b/g, '');
    content = content.replace(/\bfont-mono\b/g, '');
    content = content.replace(/\bfont-serif\b/g, '');

    // Also clean up any potential double spaces left by removal
    content = content.replace(/ \s+/g, ' ');
    content = content.replace(/\" /g, '"');
    content = content.replace(/ \'/g, "'");

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        count++;
    }
});
console.log(`Aggressively removed font-classes from ${count} files.`);
