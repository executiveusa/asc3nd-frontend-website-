const { chromium } = require('playwright');

const BASE = 'http://localhost:4173';
const OUT = __dirname;

const shot = async (page, name) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log('captured', name);
};

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', (m) => logs.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}`));

  // ===== Homepage desktop =====
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const heroH1 = await page.locator('h1').first().innerText();
  const blogCards = await page.locator('#blog-grid .blog-card').count();
  const storeCards = await page.locator('#store-grid .store-card').count();
  const pillars = await page.locator('#pillars-grid .hp-pillar').count();
  const programs = await page.locator('#program-grid .hp-program-card').count();
  const socialSvgs = await page.locator('#social-row svg').count();
  console.log('HOME hero:', JSON.stringify(heroH1));
  console.log('HOME blog teaser cards:', blogCards, '(want 4)');
  console.log('HOME store teaser cards:', storeCards, '(want 3)');
  console.log('HOME pillars:', pillars, '(want 4)');
  console.log('HOME programs:', programs, '(want 5)');
  console.log('HOME social svgs:', socialSvgs, '(want 5)');
  await shot(page, 'desktop-home');

  // scroll to reveal + capture mission
  await page.locator('#mission').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await shot(page, 'desktop-mission');

  // contact + modal
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, 'desktop-contact');

  // dark mode
  await page.evaluate(() => localStorage.setItem('asc3nd_theme', 'dark'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('HOME dark theme attr:', themeAttr, '(want dark)');
  await shot(page, 'desktop-dark-mode');

  // events modal
  await page.evaluate(() => localStorage.setItem('asc3nd_theme', 'light'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.locator('[data-modal-trigger="events"]').first().click();
  await page.waitForTimeout(500);
  const modalOpen = await page.locator('#modal.is-open').count();
  console.log('HOME events modal open:', modalOpen, '(want 1)');
  await shot(page, 'desktop-modal-open');
  await page.keyboard.press('Escape');

  // Spanish toggle
  await page.locator('#lang-toggle').click();
  await page.waitForTimeout(400);
  const esH1 = await page.locator('h1').first().innerText();
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  console.log('HOME ES hero:', JSON.stringify(esH1));
  console.log('HOME ES html lang:', htmlLang, '(want es-MX)');
  await shot(page, 'desktop-spanish');

  // ===== Blog desktop =====
  await page.goto(`${BASE}/blog.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const blogFull = await page.locator('#blog-grid .blog-card').count();
  const chips = await page.locator('#blog-toolbar .blog-chip').count();
  console.log('BLOG full cards:', blogFull, '(want 8)');
  console.log('BLOG filter chips:', chips);
  await shot(page, 'desktop-stories');

  // ===== Merch desktop =====
  await page.goto(`${BASE}/merch.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const merchFull = await page.locator('#store-grid .store-card').count();
  console.log('MERCH full cards:', merchFull, '(want 7)');
  await shot(page, 'desktop-merch');

  // ===== Mobile =====
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mctx.newPage();
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(500);
  await shot(mpage, 'mobile-home');
  // open mobile menu
  await mpage.locator('#mobile-toggle').click();
  await mpage.waitForTimeout(400);
  const menuOpen = await mpage.locator('#mobile-menu[hidden]').count();
  console.log('MOBILE menu visible (hidden attr absent?):', menuOpen === 0, '(want true)');
  await shot(mpage, 'mobile-nav');
  await mpage.locator('#mobile-toggle').click();
  await mpage.goto(`${BASE}/blog.html`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(400);
  await shot(mpage, 'mobile-stories');
  await mpage.goto(`${BASE}/merch.html`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(400);
  await shot(mpage, 'mobile-merch');

  console.log('=== console logs ===');
  console.log(logs.length ? logs.join('\n') : '(none)');

  await browser.close();
})().catch((e) => { console.error('CAPTURE FAILED:', e.message); process.exit(1); });
