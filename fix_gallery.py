import re
with open('src/components/GallerySection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# For single line single quote:
content = re.sub(r"language === 'ta' \? '[^']*' : ('[^']*')", r'\1', content)

# For multiline replacements (e.g. lines 250-252 and 446-448)
content = re.sub(r"\{language === 'ta'\s*\?\s*'[^']+'\s*:\s*('[^']+')\}", r'{\1}', content, flags=re.MULTILINE)

# specifically handle the line 402-406 progress conditions:
content = re.sub(r"\(language === 'ta' \? '[^']*' : ('[^']*')\)", r'\1', content)

# Remove const { language } = useLanguage();
content = content.replace("const { language } = useLanguage();", "")

with open('src/components/GallerySection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
