import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Single line
    content = re.sub(r"language === 'ta' \? '[^']*' : ('[^']*')", r'\1', content)
    # Multiline
    content = re.sub(r"\{language === 'ta'\s*\?\s*'[^']+'\s*:\s*('[^']+')\}", r'{\1}', content, flags=re.MULTILINE)
    
    # Unused language declarations
    content = re.sub(r"const \{ language \} = useLanguage\(\);\n?", "", content)
    content = re.sub(r"const \{ t, language \} = useLanguage\(\);\n?", "const { t } = useLanguage();\n", content)
    content = re.sub(r"const \{ language, t \} = useLanguage\(\);\n?", "const { t } = useLanguage();\n", content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('src/components/EventsSection.tsx')
process_file('src/components/GuestbookSection.tsx')
process_file('src/components/GallerySection.tsx')
