import json
import os

ARCHIVE_FILE = 'news_archive.json'
JS_DATA_FILE = 'assets/js/news_data.js'

with open(ARCHIVE_FILE, 'r', encoding='utf-8') as f:
    archive = json.load(f)

# Sort by id descending
archive.sort(key=lambda x: int(x['id']), reverse=True)

js_content = "window.newsData = " + json.dumps(archive, ensure_ascii=False, indent=4) + ";"

with open(JS_DATA_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Updated {JS_DATA_FILE} with {len(archive)} articles.")
