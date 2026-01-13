import requests
from bs4 import BeautifulSoup
import json
import os
import time
from datetime import datetime
import urllib.parse

BASE_URL = "https://www.rlc1952.de/"
NEWS_URL = "https://www.rlc1952.de/rlc.php"
ASSETS_DIR = "news_assets"

# Ensure assets directory exists
if not os.path.exists(ASSETS_DIR):
    os.makedirs(ASSETS_DIR)

def get_soup(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        # The site seems to use ISO-8859-1 or similar based on its age
        response.encoding = response.apparent_encoding
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_image(img_url, article_id):
    if not img_url:
        return None
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    try:
        # Create a folder for the article's images
        article_dir = os.path.join(ASSETS_DIR, str(article_id))
        if not os.path.exists(article_dir):
            os.makedirs(article_dir)
            
        filename = os.path.basename(urllib.parse.urlparse(img_url).path)
        if not filename:
            filename = f"image_{int(time.time())}.jpg"
            
        local_path = os.path.join(article_dir, filename).replace('\\', '/')
        
        # Avoid re-downloading
        if os.path.exists(local_path):
            return local_path
            
        response = requests.get(img_url, headers=headers, stream=True)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            return local_path
    except Exception as e:
        print(f"Error downloading image {img_url}: {e}")
    return None

def scrape_article_detail(url):
    soup = get_soup(url)
    if not soup:
        return None

    article_id = url.split('-')[-1]
    data = {
        "url": url,
        "id": article_id,
        "title": "",
        "date": "",
        "content_html": "",
        "content_text": "",
        "images": []
    }

    # The main container seems to be #stage
    stage = soup.select_one('#stage')
    if not stage:
        # Fallback to body
        stage = soup.find('body')

    # Title
    headline_el = stage.select_one('.headlineHolder h1') or stage.select_one('.headlineHolder')
    if headline_el:
        data['title'] = headline_el.get_text(strip=True)

    # Date
    date_el = stage.select_one('.redDate')
    if date_el:
        data['date'] = date_el.get_text(strip=True)

    # Content and Images
    # We look for containers that usually hold content on this site
    content_containers = stage.select('.detailViewTop, .detailViewBottom, .newsText, .preView')
    
    if not content_containers:
        # If no specific containers, fallback to anything that looks like content
        # avoiding the navigation/header
        content_html_parts = []
        for p in stage.find_all(['p', 'div']):
            # Skip known non-content classes
            if p.get('class') and any(c in ['redDate', 'headlineHolder', 'sepPrev'] for c in p.get('class')):
                continue
            # Skip layout containers if they don't have direct text/images
            if p.get('id') in ['header', 'nav', 'footer', 'logo', 'scroller']:
                continue
            
            # Simple heuristic: if it has substantial text or an image
            if (p.name == 'p' and len(p.get_text(strip=True)) > 20) or p.find('img'):
                content_html_parts.append(str(p))
        data['content_html'] = "".join(content_html_parts)
    else:
        # Include all relevant containers
        data['content_html'] = "".join([str(c) for c in content_containers])

    # Extract images from both the content_html AND the stage globally just in case
    temp_soup = BeautifulSoup(data['content_html'], 'html.parser')
    all_imgs = temp_soup.find_all('img')
    
    # Also check .preView specifically since it's common for main images
    preview_img = stage.select_one('.preView img')
    if preview_img and preview_img not in all_imgs:
        all_imgs.append(preview_img)

    for img in all_imgs:
        src = img.get('src')
        if src:
            # Filter out UI elements
            if any(x in src for x in ['logo', 'arrow', 'bodynostic', 'lsb-logo']):
                continue
                
            full_src = urllib.parse.urljoin(BASE_URL, src)
            local_path = download_image(full_src, article_id)
            if local_path:
                img_entry = {"remote": full_src, "local": local_path}
                if img_entry not in data['images']:
                    data['images'].append(img_entry)

    data['content_text'] = BeautifulSoup(data['content_html'], 'html.parser').get_text(separator='\n', strip=True)

    return data

def extract_news_items(page_id=0):
    url = f"{NEWS_URL}?id=0-0000-{page_id}"
    print(f"\n--- Scraping page {page_id}: {url} ---")
    soup = get_soup(url)
    if not soup:
        return []

    articles = []
    # Identify unique article links on the page
    links = soup.select('.headlineHolder a')
    article_urls = []
    for link in links:
        href = link.get('href')
        if href and 'id=0-0000-' in href:
            # Detail links look like id=0-0000-X-YYYY
            # Page links look like id=0-0000-X
            id_part = href.split('=')[-1]
            if id_part.count('-') == 3:
                full_url = urllib.parse.urljoin(BASE_URL, href)
                if full_url not in article_urls:
                    article_urls.append(full_url)

    for art_url in article_urls:
        print(f"  Scraping article: {art_url}")
        article_data = scrape_article_detail(art_url)
        if article_data:
            articles.append(article_data)
        time.sleep(0.3)

    return articles

def load_existing_data():
    if os.path.exists('news_archive.json'):
        try:
            with open('news_archive.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading existing data: {e}")
    return []

def main():
    all_news = load_existing_data()
    existing_ids = {item['id'] for item in all_news}
    print(f"Loaded {len(all_news)} existing articles.")

    # The site has 283 pages (0 to 282)
    total_pages = 283 
    
    # Heuristic: Start from the first page that might have new content
    # or just iterate all and skip known IDs.
    # To be safe and thorough for Cline, we iterate all pages.
    
    new_articles_count = 0
    
    try:
        for i in range(total_pages):
            print(f"\n--- Progress: Page {i}/{total_pages-1} ({(i/total_pages)*100:.1f}%) ---")
            items = extract_news_items(i)
            
            if not items:
                print(f"No items found on page {i}. This might be the end or a temporary error.")
                # We don't break immediately to handle potential empty pages in the middle
                continue

            page_added = 0
            for item in items:
                if item['id'] not in existing_ids:
                    all_news.append(item)
                    existing_ids.add(item['id'])
                    new_articles_count += 1
                    page_added += 1
            
            print(f"  Added {page_added} new articles from this page.")

            # Save progress every 5 pages
            if i % 5 == 0 and page_added > 0:
                with open('news_archive.json', 'w', encoding='utf-8') as f:
                    json.dump(all_news, f, ensure_ascii=False, indent=4)
                print(f"  [SAVED] Total articles now: {len(all_news)}")
        
    except KeyboardInterrupt:
        print("\nScraping interrupted by user. Saving progress...")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
    finally:
        with open('news_archive.json', 'w', encoding='utf-8') as f:
            json.dump(all_news, f, ensure_ascii=False, indent=4)
        
        print(f"\n--- Scraping Finished ---")
        print(f"Total new articles added: {new_articles_count}")
        print(f"Total articles in archive: {len(all_news)}")
        print(f"Data saved to news_archive.json")
        print(f"Assets saved to {ASSETS_DIR}/")

if __name__ == "__main__":
    main()
