const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to roadmap...');
  await page.goto('https://labx-azure.vercel.app/roadmap', { waitUntil: 'networkidle2' });
  
  console.log('Taking screenshot...');
  const screenshotPath = 'C:\\Users\\rithi\\.gemini\\antigravity-ide\\brain\\ecbb559d-b16f-4dcd-9cbc-26f1c566d868\\scratch\\roadmap_screenshot.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  console.log('Done! Screenshot saved to', screenshotPath);
  await browser.close();
})();
