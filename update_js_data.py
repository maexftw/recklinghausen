import json
import os

ARCHIVE_FILE = 'news_archive.json'
JS_DATA_FILE = 'assets/js/news_data.js'
EXPORT_LIMIT = 36

with open(ARCHIVE_FILE, 'r', encoding='utf-8') as f:
    archive = json.load(f)

def repair_text(value):
    if isinstance(value, str):
        if 'Ã' in value or 'Â' in value:
            try:
                return value.encode('latin1').decode('utf-8')
            except UnicodeError:
                return value
        return value
    if isinstance(value, list):
        return [repair_text(item) for item in value]
    if isinstance(value, dict):
        return {key: repair_text(item) for key, item in value.items()}
    return value

def normalize_headline(value):
    if not isinstance(value, str):
        return value
    return value.translate(str.maketrans({
        chr(0x00e4): chr(0x00c4),
        chr(0x00f6): chr(0x00d6),
        chr(0x00fc): chr(0x00dc)
    }))

# Sort by id descending
archive.sort(key=lambda x: int(x['id']), reverse=True)

export = repair_text(archive[:EXPORT_LIMIT])
for article in export:
    article['title'] = normalize_headline(article.get('title', ''))
js_content = "window.newsData = " + json.dumps(export, ensure_ascii=False, indent=4) + ";"

with open(JS_DATA_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Updated {JS_DATA_FILE} with {len(export)} of {len(archive)} articles.")
