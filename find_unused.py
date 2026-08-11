import os
import glob
import re

components = glob.glob('src/components/**/*.tsx', recursive=True) + glob.glob('src/pages/**/*.tsx', recursive=True)

unused = []
for comp in components:
    name = os.path.basename(comp).replace('.tsx', '')
    
    # Check if 'name' is mentioned in any other file
    found = False
    for root, dirs, files in os.walk('src'):
        for f in files:
            if not f.endswith('.ts') and not f.endswith('.tsx'):
                continue
            path = os.path.join(root, f)
            if path == comp:
                continue
            with open(path, 'r', encoding='utf-8') as file_obj:
                content = file_obj.read()
                if re.search(r'\b' + re.escape(name) + r'\b', content):
                    found = True
                    break
        if found:
            break
            
    if not found:
        unused.append(comp)

for u in unused:
    print(u)
