import os
import re

base_dir = r'c:\Users\Raja\OneDrive\Desktop\scoreboard\apps\web\src\app\(app)'

# We want to remove dots like:
# <div className="w-2.5 h-2.5 rounded-full bg-[#E81414] shadow-[0_0_15px_rgba(232,20,20,0.5)]" />
# <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
# <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full animate-ping" />
# Basically, small divs with width/height <= 10 (e.g. w-3, w-2, w-1.5, w-4, w-5) containing bg-[#E81414] or bg-red-* or bg-green-* or bg-yellow-* and rounded-full.

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Find small rounded dots (red, green, yellow, etc)
    # Match <div className="... w-[\d.]+ h-[\d.]+ ... rounded-full ... " /> or </div>
    # Also we'll look for animate-ping or animate-pulse to catch those
    pattern_dots = re.compile(r'<div className=\"[^\"]*(?:w-[\d.]+ h-[\d.]+)[^\"]*(?:rounded-full|animate-(?:ping|pulse))[^\"]*\"\s*(?:></div>|/>)')
    
    # We only want to remove it if it has color bg-red, bg-green, bg-yellow, bg-[#E...
    def repl_dot(m):
        match_str = m.group(0)
        # Check if it's a small dot that's colored
        if ('bg-red' in match_str or 'bg-[#E81414]' in match_str or 
            'bg-green' in match_str or 'bg-yellow' in match_str or 'bg-emerald' in match_str):
            if 'rounded-full' in match_str or 'animate-ping' in match_str or 'animate-pulse' in match_str:
                return ""  # Remove it entirely
        return match_str

    content = pattern_dots.sub(repl_dot, content)
    
    # Second pass: Any lonely w-X h-X rounded-full elements that we might have missed if they only had animate-ping
    pattern_dots_2 = re.compile(r'<div className=\"[^\"]*(?:rounded-full).*?animate-(?:ping|pulse)[^\"]*\"\s*(?:></div>|/>)')
    content = pattern_dots_2.sub('', content)

    # Some dots might not have w-X h-X but are just tiny dots
    pattern_dots_3 = re.compile(r'<div className=\"[^\"]*(?:w-[1-4]\.?[0-5]?\s+h-[1-4]\.?[0-5]?)[^\"]*(?:bg-[^\"]+|)rounded-full[^\"]*\"\s*(?:></div>|/>)')
    def repl_dot_3(m):
        match_str = m.group(0)
        # Check if it specifies a red/green/yellow color
        if ('bg-red' in match_str or 'bg-[#E81414]' in match_str or 
            'bg-green' in match_str or 'bg-yellow' in match_str or 'bg-emerald' in match_str or 'animate-ping' in match_str):
            return ""  # Remove it
        return match_str
    content = pattern_dots_3.sub(repl_dot_3, content)

    # Sometimes dots are spans
    pattern_spans = re.compile(r'<span className=\"[^\"]*(?:w-[\d.]+ h-[\d.]+)[^\"]*(?:rounded-full|animate-(?:ping|pulse))[^\"]*\"\s*(?:></span>|/>)')
    def repl_span(m):
        match_str = m.group(0)
        if ('bg-red' in match_str or 'bg-[#E81414]' in match_str or 
            'bg-green' in match_str or 'bg-yellow' in match_str or 'bg-emerald' in match_str or 'animate' in match_str):
            return ""
        return match_str
    
    content = pattern_spans.sub(repl_span, content)

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file_path}')

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.tsx'):
            process_file(os.path.join(root, f))
