import os
import re

base_dir = r'c:\Users\Raja\OneDrive\Desktop\scoreboard\apps\web\src'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Standardize spaces in inline styles so regex matching is easier
    # The previous script used style={{"transform": ...}} or style={{ "transform": ... }}
    # Let's target the exact image tags.

    # 1. Update w-full h-full to scale(1.3) translate(0px, 1px)
    pattern_full = re.compile(r'className="w-full h-full(?: [^"]*)?object-contain" style=\{\{[ ]*"transform":[ ]*"scale\([0-9.]+\) translate\([^)]+\)"[ ]*\}\}')
    content = pattern_full.sub(r'className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }}', content)

    # 2. Update specific w-X h-X to scale(2.2) translate(0px, 0px)
    pattern_fixed = re.compile(r'className="([w|h]-\d+[^"]*?object-contain)" style=\{\{[ ]*"transform":[ ]*"scale\([0-9.]+\) translate\([^)]+\)"[ ]*\}\}')
    def repl_fixed(m):
        return f'className="{m.group(1)}" style={{{{ "transform": "scale(2.2) translate(0px, 0px)" }}}}'
    content = pattern_fixed.sub(repl_fixed, content)

    # 3. Update dynamic classNames like className={`...`}
    pattern_dynamic = re.compile(r'className=\{\`([^\`]*?object-contain)\`\} style=\{\{[ ]*"transform":[ ]*"scale\([0-9.]+\) translate\([^)]+\)"[ ]*\}\}', flags=re.DOTALL)
    def repl_dynamic(m):
        return f'className={{`{m.group(1)}`}} style={{{{ "transform": "scale(2.2) translate(0px, 0px)" }}}}'
    content = pattern_dynamic.sub(repl_dynamic, content)

    # Special case, replace any left over style={{"transform": "scale(1)...
    content = re.sub(
        r'style=\{\{[ ]*"transform":[ ]*"scale\(1\) translate\([^)]+\)"[ ]*\}\}',
        r'style={{ "transform": "scale(2.2) translate(0px, 0px)" }}',
        content
    )

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file_path}')

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.tsx'):
            process_file(os.path.join(root, f))
