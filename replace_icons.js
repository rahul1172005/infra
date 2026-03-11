const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps/web/src/app/(app)');

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.join(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (err, res) => {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    if (file.endsWith('.tsx')) {
                        results.push(file);
                    }
                    next();
                }
            });
        })();
    });
}

walk(baseDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');

        // find lucide-react imports
        const regex = /import\s+\{([^}]+)\}\s+from\s+['"`]lucide-react['"`]\s*;/;
        const match = content.match(regex);
        if (match) {
            console.log(`Processing ${file}`);
            const icons = match[1].split(',').map(i => i.trim()).filter(i => i);

            // Remove the import statement
            content = content.replace(regex, '');

            icons.forEach(icon => {
                // Find tags with empty children: <Icon ... />
                const tagRegex = new RegExp(`<\\s*${icon}\\b([^>]*?)(?:/\\s*>|>.*?</\\s*${icon}\\s*>)`, 'g');
                content = content.replace(tagRegex, `<span $1>[X]</span>`);
            });

            // Also remove font-sans
            content = content.replace(/font-sans/g, '');

            fs.writeFileSync(file, content);
        }
    });
});
