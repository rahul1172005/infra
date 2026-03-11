const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(path.join(__dirname, 'app'), (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let originalContent = fs.readFileSync(filePath, 'utf8');
        let newContent = originalContent
            .replace(/leading-\[0\.85\]/g, 'leading-none')
            .replace(/ -rotate-1 /g, ' ')
            .replace(/ rotate-1 /g, ' ')
            .replace(/ -rotate-2 /g, ' ')
            .replace(/ rotate-2 /g, ' ')
            .replace(/"-rotate-1\s/g, '"')
            .replace(/"rotate-1\s/g, '"')
            .replace(/"-rotate-2\s/g, '"')
            .replace(/"rotate-2\s/g, '"')
            .replace(/\s-rotate-1"/g, '"')
            .replace(/\srotate-1"/g, '"')
            .replace(/\s-rotate-2"/g, '"')
            .replace(/\srotate-2"/g, '"');

        // Extra cleanups for overlapping absolute layouts in these templates
        newContent = newContent
            .replace(/absolute left-1\/2 -translate-x-1\/2 bottom-0 text-center w-full/g, 'text-center w-full');

        if (originalContent !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Cleaned:', filePath);
        }
    }
});
