import json
import os
import requests
import re
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.rlc1952.de/"
ASSETS_DIR = "news_assets"
ARCHIVE_FILE = "news_archive.json"
JS_DATA_FILE = "assets/js/news_data.js"
JS_EXPORT_LIMIT = 36

if not os.path.exists(ASSETS_DIR):
    os.makedirs(ASSETS_DIR)

def download_image(url, article_id):
    try:
        if not url or "lsb-logo" in url or "rlc_logo" in url or "arrow" in url or "Bodynostic" in url:
            return None
            
        article_dir = os.path.join(ASSETS_DIR, str(article_id))
        if not os.path.exists(article_dir):
            os.makedirs(article_dir)
            
        filename = os.path.basename(urlparse(url).path)
        if not filename:
            filename = "image.jpg"
            
        local_path = os.path.join(article_dir, filename).replace('\\', '/')
        
        if os.path.exists(local_path):
            return local_path
            
        print(f"Downloading {url} -> {local_path}")
        r = requests.get(url, stream=True, timeout=10)
        if r.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            return local_path
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return None

def repair_text(value):
    if isinstance(value, str):
        if "Ã" in value or "Â" in value:
            try:
                return value.encode("latin1").decode("utf-8")
            except UnicodeError:
                return value
        return value
    if isinstance(value, list):
        return [repair_text(item) for item in value]
    if isinstance(value, dict):
        return {key: repair_text(item) for key, item in value.items()}
    return value

def sync():
    # Load existing archive
    if os.path.exists(ARCHIVE_FILE):
        with open(ARCHIVE_FILE, 'r', encoding='utf-8') as f:
            archive = json.load(f)
    else:
        archive = []
        
    updated_count = 0
    
    # Process each article in the archive to ensure images are local
    for article in archive:
        article_id = article.get('id')
        if not article_id: continue
        
        images = article.get('images', [])
        new_images = []
        changed = False
        
        for img in images:
            remote = img.get('remote')
            local = img.get('local')
            
            # Ensure local path exists in the filesystem
            if not local or not os.path.exists(local):
                print(f"Missing local image for {article_id}: {remote}")
                new_local = download_image(remote, article_id)
                if new_local:
                    img['local'] = new_local
                    changed = True
            new_images.append(img)
            
        if changed:
            updated_count += 1

    # Sort archive by ID (descending)
    try:
        archive.sort(key=lambda x: int(x['id']), reverse=True)
    except:
        pass
    
    # Save back to JSON
    with open(ARCHIVE_FILE, 'w', encoding='utf-8') as f:
        json.dump(archive, f, ensure_ascii=False, indent=4)
        
    # Update JS file with a launch-sized recent archive for the overview page
    js_export = repair_text(archive[:JS_EXPORT_LIMIT])
    js_content = "window.newsData = " + json.dumps(js_export, ensure_ascii=False, indent=4) + ";"
    with open(JS_DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Finished sync. Updated images for {updated_count} articles. Updated {JS_DATA_FILE} with {min(len(archive), JS_EXPORT_LIMIT)} articles.")

if __name__ == "__main__":
    sync()
