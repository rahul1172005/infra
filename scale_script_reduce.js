const fs = require('fs');
const path = require('path');

const targetFiles = [
    'shield_logo.png',
    'bell_logo.png',
    'eye_logo.png',
    'targaryen_logo.png',
    'stark_logo.png',
    'wolf.png',
    'hand_logo.png'
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Pattern searching for the logo source and checking for the transform scale
            // We'll replace scale(2.5) with scale(1.6)
            const regex = /style={{ transform: "scale\(2\.5\)" }}/g;
            if (regex.test(content)) {
                content = content.replace(regex, 'style={{ transform: "scale(1.6)" }}');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

const srcDir = path.join(__dirname, 'apps/web/src');
console.log(`Searching in: ${srcDir}`);
processDirectory(srcDir);
console.log('Done!');
