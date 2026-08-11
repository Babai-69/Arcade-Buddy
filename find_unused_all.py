import os
import glob
import re

files_to_check = glob.glob('src/**/*.ts', recursive=True) + glob.glob('src/**/*.tsx', recursive=True)

unused = []
for file_path in files_to_check:
    # Ignore index.ts, main.tsx, App.tsx, vite-env.d.ts, types.ts
    if os.path.basename(file_path) in ['index.ts', 'main.tsx', 'App.tsx', 'vite-env.d.ts', 'types.ts', 'server.ts']:
        continue
        
    name = os.path.basename(file_path).replace('.tsx', '').replace('.ts', '')
    
    # Check if 'name' is mentioned in any other file
    found = False
    for root, dirs, files in os.walk('src'):
        for f in files:
            if not f.endswith('.ts') and not f.endswith('.tsx'):
                continue
            path = os.path.join(root, f)
            if path == file_path:
                continue
            with open(path, 'r', encoding='utf-8') as file_obj:
                content = file_obj.read()
                if re.search(r'\b' + re.escape(name) + r'\b', content):
                    found = True
                    break
        if found:
            break
            
    if not found:
        unused.append(file_path)

for u in unused:
    print(u)
