import json
import os
import re

# Paths
ARCHIVE_FILE = 'news_archive.json'
TEMPLATE_FILE = 'stitch_modern_news_archive_page (2)/code.html'
OUTPUT_DIR = 'pages/news'
PLACEHOLDER_IMAGE = "../../assets/images/news-placeholder.svg"

# Ensure output directory exists
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Load archive
with open(ARCHIVE_FILE, 'r', encoding='utf-8') as f:
    archive = json.load(f)

# Load template
with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
    template = f.read()

def generate_page(article, all_articles):
    article_id = article['id']
    title = article['title']
    date = article['date']
    content_html = article.get('content_html', '')
    content_text = article.get('content_text', '')
    
    # Get image
    main_image = PLACEHOLDER_IMAGE
    if article['images'] and len(article['images']) > 0:
        main_image = "../../" + article['images'][0]['local']
    
    # Process content_html to fix image paths
    processed_content = content_html

    def rewrite_content_src(match):
        quote = match.group(1)
        path = match.group(2)

        if path.startswith('assets/images/uploads/'):
            filename = path.rsplit('/', 1)[-1]
            local_path = os.path.join('news_assets', str(article_id), filename)
            if not os.path.exists(local_path):
                return f'src={quote}{PLACEHOLDER_IMAGE}{quote}'

            return f'src={quote}../../news_assets/{article_id}/{filename}{quote}'

        return f'src={quote}../../{path}{quote}'

    processed_content = re.sub(
        r'src=(["\'])(?:\.\./\.\./)?(assets/images/uploads/[^"\']+|news_assets/[^"\']+)\1',
        rewrite_content_src,
        processed_content
    )
    
    # Use content_text for quote if it's long enough, otherwise use title
    quote = article['title']
    if len(content_text) > 50:
        quote = content_text.split('.')[0] + "."

    # Replace placeholders in template
    page = template
    
    # Replace background image
    page = re.sub(r'url\("https?://.*?"\)', f'url("{main_image}")', page)
    
    # Replace Title
    page = page.replace('Starker Auftritt der RLC-Athleten...', title)
    
    # Replace Date
    page = page.replace('12. Oktober 2023', date)
    
    # Replace Quote
    page = page.replace('"Es war ein Wochenende voller Emotionen..."', f'"{quote}"')
    
    # Replace main content
    # We'll replace the entire #article-content div content
    start_tag = '<div id="article-content" class="subpage-news-content">'
    end_tag = '</div>\n\n                    <div class="subpage-actions"'
    
    if start_tag in page:
        # We need to construct the new content section
        quote_p = f'<div class="subpage-news-quote">\n                            "{quote}"\n                        </div>'
        new_body = f'{start_tag}\n                        {quote_p}\n                        <div class="space-y-6">\n                            {processed_content}\n                        </div>\n                    '
        
        # Replace up to the end tag
        pattern = re.compile(f'{re.escape(start_tag)}.*?{re.escape(end_tag)}', re.DOTALL)
        page = pattern.sub(f'{new_body}{end_tag}', page)

    # Generate Sidebar (Latest 3 news, excluding current)
    sidebar_html = ""
    sidebar_count = 0
    for other in all_articles:
        if other['id'] == article_id: continue
        if sidebar_count >= 3: break
        
        other_img = PLACEHOLDER_IMAGE
        if other['images']: other_img = "../../" + other['images'][0]['local']
        
        sidebar_html += f'''
                            <a href="{other['id']}.html" class="news-sidebar-card">
                                <div class="news-sidebar-card__media" style="background-image: url('{other_img}');"></div>
                                <div class="news-sidebar-card__body">
                                    <span class="news-sidebar-card__title">{other['title']}</span>
                                    <span class="news-sidebar-card__meta">{other['date']}</span>
                                </div>
                            </a>'''
        sidebar_count += 1
        
    page = page.replace('<!-- Will be filled by script if needed, or static if generated -->', sidebar_html)

    # Fix relative paths for the logo/nav (handled in template mostly, but double check)
    # The template already has relative paths ../../index.html and ../news.html
    
    # Save output
    output_path = os.path.join(OUTPUT_DIR, f"{article_id}.html")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(page)

# Generate pages for all articles
print(f"Generating {len(archive)} detail pages...")
archive.sort(key=lambda x: int(x['id']), reverse=True) # Ensure we get latest for sidebar
for i, article in enumerate(archive):
    if i % 100 == 0:
        print(f"  Processed {i} articles...")
    generate_page(article, archive)

print("Done.")
