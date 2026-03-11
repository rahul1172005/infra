const fs = require('fs');
try {
    let content = fs.readFileSync('apps/web/tsc-errors.txt');
    let errText = content.toString('utf16le');
    if (!errText.includes('error TS')) {
        errText = content.toString('utf8');
    }

    const filesMap = {};

    const lines = errText.split('\n');
    lines.forEach(line => {
        // line format: "apps/web/src/app/(app)/achievements/page.tsx(63,87): error TS2304: Cannot find name 'Zap'."
        const match = line.match(/(apps\/web\/.*?\.(tsx|ts))\(\d+,\d+\): error TS2304: Cannot find name '(.+?)'/);
        if (match) {
            const file = match[1];
            const name = match[3];
            if (!filesMap[file]) filesMap[file] = new Set();
            filesMap[file].add(name);
        }
    });

    let out = "";
    for (const [file, names] of Object.entries(filesMap)) {
        out += `${file}: ${Array.from(names).join(', ')}\n`;
    }
    fs.writeFileSync('parsed-errors-utf8.txt', out, 'utf8');
} catch (e) { console.error(e) }
