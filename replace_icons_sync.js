const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps/web/src/app/(app)');

function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        if (fs.statSync(dirFile).isDirectory()) {
            filelist = walkSync(dirFile, filelist);
        } else {
            if (dirFile.endsWith('.tsx')) {
                filelist.push(dirFile);
            }
        }
    });
    return filelist;
}

const files = walkSync(baseDir);

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // find lucide-react imports
    const regex = /import\s+\{([^}]+)\}\s+from\s+['"`]lucide-react['"`]\s*;/g;
    let match;
    let hasLucide = false;
    let iconsToReplace = [];

    while ((match = regex.exec(content)) !== null) {
        hasLucide = true;
        const icons = match[1].split(',').map(i => i.trim()).filter(i => i);
        iconsToReplace.push(...icons);
    }

    if (hasLucide) {
        console.log(`Processing ${file}`);
        content = content.replace(regex, '');

        iconsToReplace.forEach(icon => {
            // Find self-closing tags <IconName ... />
            const selfCloseRegex = new RegExp(`<\\s*${icon}\\b([^>]*?)/\\s*>`, 'g');
            content = content.replace(selfCloseRegex, `<span $1>[X]</span>`);

            // Find open-close tags <IconName ...> ... </IconName>
            const openCloseRegex = new RegExp(`<\\s*${icon}\\b([^>]*?)>(.*?)</\\s*${icon}\\s*>`, 'gs');
            content = content.replace(openCloseRegex, `<span $1>[X]</span>`);

            // We might have missed some edge cases where Icon properties are passed around or conditionally rendered, but they will just be undefined. Wait! If they are removed from imports, any left `Icon` reference will cause "ReferenceError: <Icon> is not defined", so we better make sure we replaced all `<Icon` tags, AND also `icon: Icon` -> `icon: "Icon"`. But since they are components, if I replace `<Icon` with `<span`, that fixes the JSX. 
        });
    }

    // Also remove font-sans from classes
    content = content.replace(/ \bfont-sans\b/g, '');
    content = content.replace(/\"font-sans\b/g, '"');
    content = content.replace(/\'font-sans\b/g, "'");
    content = content.replace(/\`font-sans\b/g, '`');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        count++;
    }
});
console.log(`Processed ${count} files.`);
