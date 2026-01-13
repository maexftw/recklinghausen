
from playwright.sync_api import sync_playwright
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        index_path = f"file://{cwd}/index.html"

        print(f"Navigating to {index_path}")
        page.goto(index_path)

        # Verify Title
        title = page.title()
        print(f"Page Title: {title}")

        # Verify Header Navigation exists (Touch Targets)
        nav_items = page.locator("nav a")
        count = nav_items.count()
        print(f"Found {count} navigation items")

        # Verify Footer Scorecard exists
        scorecard = page.locator("text=Web Performance Certificate")
        if scorecard.is_visible():
            print("Scorecard is visible")
        else:
            print("Scorecard NOT found")

        # Verify LCP Image (Hero) has fetchpriority
        hero_img = page.locator("img[fetchpriority='high']")
        if hero_img.count() > 0:
             print("LCP Image with fetchpriority='high' found")
        else:
             print("LCP Image NOT found")

        # Screenshot Homepage
        page.screenshot(path="verification/homepage_after.png", full_page=True)
        print("Screenshot saved to verification/homepage_after.png")

        # Check News Page
        news_path = f"file://{cwd}/pages/news.html"
        page.goto(news_path)
        page.screenshot(path="verification/news_after.png", full_page=True)
        print("Screenshot saved to verification/news_after.png")

        # Check Contact Page
        contact_path = f"file://{cwd}/pages/contact.html"
        page.goto(contact_path)
        page.screenshot(path="verification/contact_after.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run_verification()
