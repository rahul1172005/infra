const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColor(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('#D4FF00') || content.includes('lime-400')) {
                content = content.replace(/#D4FF00/g, '#FFD700');
                content = content.replace(/lime-400/g, 'yellow-400');
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ', fullPath);
            }
        }
    }
}

replaceColor('c:/Users/Raja/OneDrive/Desktop/scoreboard/apps/web/src/app');
replaceColor('c:/Users/Raja/OneDrive/Desktop/scoreboard/apps/web/src/components');
