const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'apps', 'web', 'src');

const targets = [
  'shield_logo.png',
  'bell_logo.png',
  'eye_logo.png',
  'targaryen_logo.png',
  'stark_logo.png',
  'wolf.png',
  'hand_logo.png'
];

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Find all img tags using regex
      const imgRegex = /<img[^>]*src=["']\/([^"']+\.png)["'][^>]*>/g;
      
      content = content.replace(imgRegex, (match, srcPath) => {
        if (targets.includes(srcPath)) {
          // If the tag already has a style attribute doing a transform, maybe update it?
          // Instead of a complex AST parsing, let's just use replacement chunks.
          // Wait, I already removed ALL style tags from these imgs previously.
          // Let's check if it has a style tag.
          if (match.includes('style={{')) {
             if (match.includes('transform')) {
                 return match; // skip if already has transform
             }
             // append to style
             modified = true;
             return match.replace('style={{', `style={{ transform: "scale(2.5)", `);
          } else {
             // add style 
             modified = true;
             return match.replace('<img', `<img style={{ transform: "scale(2.5)" }}`);
          }
        }
        return match;
      });

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log('Done!');
