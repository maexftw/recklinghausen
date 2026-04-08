const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // List of news pages to audit
  const newsPages = [
    '/pages/news/10001.html',
    '/pages/news/10023.html',
    '/pages/news/10193.html'
  ];

  const baseUrl = 'http://localhost:8001';
  const results = [];

  for (const relPath of newsPages) {
    const url = baseUrl + relPath;
    console.log(`Auditing: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Basic Audit Data
      const auditData = {
        url,
        title: await page.title(),
        hasH1: await page.locator('h1').count() > 0,
        imagesWithoutAlt: 0,
      };

      const images = await page.$$('img');
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (!alt || alt.trim() === '') {
          auditData.imagesWithoutAlt++;
        }
      }

      results.push(auditData);
    } catch (error) {
      console.error(`Error auditing ${url}:`, error);
      results.push({ url, error: error.message });
    }
  }

  fs.writeFileSync('audit_results.json', JSON.stringify(results, null, 2));
  console.log('Audit complete. Results saved to audit_results.json');

  await browser.close();
})();