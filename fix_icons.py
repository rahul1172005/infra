import os
import re

base_dir = r'c:\Users\Raja\OneDrive\Desktop\scoreboard\apps\web\src'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Replace <span className="... w-... h-... "></span> or <span className="..." />
    pattern_with_class = re.compile(r'<span className="([^>]*?w-\d+[^>]*?)"(?:></span>| />)')
    def repl_with_class(m):
        classes = m.group(1).replace(' text-', ' ')
        classes = re.sub(r'text-\[[^\]]+\]', '', classes).strip()
        return f'<img src="/suriken.png" alt="icon" className="{classes} object-contain" style={{{{"transform": "scale(1) translate(0px, 0px)"}}}} />'

    content = pattern_with_class.sub(repl_with_class, content)

    # Now replace <span ></span> exactly
    pattern_empty = re.compile(r'<span ></span>')
    content = pattern_empty.sub(r'<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{"transform": "scale(1) translate(0px, 0px)"}} />', content)

    # Now replace dynamically templated spans <span className={`...`}></span>
    pattern_dynamic = re.compile(r'<span className=\{\`([^\`]*?w-\d+[^\`]*?)\`\} ?>.*?</span>', flags=re.DOTALL)
    def repl_dynamic(m):
        classes = m.group(1)
        # remove dynamic text colors if any, though it's ok to leave them since img ignores them
        return f'<img src="/suriken.png" alt="icon" className={{`{classes} object-contain`}} style={{{{"transform": "scale(1) translate(0px, 0px)"}}}} />'
    
    content = pattern_dynamic.sub(repl_dynamic, content)

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file_path}')

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.tsx'):
            process_file(os.path.join(root, f))
