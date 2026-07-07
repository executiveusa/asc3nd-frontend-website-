const { chromium } = require('playwright');
const BASE = 'http://localhost:4175';
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];

  // Desktop
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => logs.push(`DESKTOP PAGEERROR: ${e.message}`));
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/v2-desktop-hero.png` });
  await page.locator('#programs').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/v2-desktop-cards.png` });

  // Verify new card structure
  const cardCount = await page.locator('.hp-program-card-v2').count();
  const cardImgs = await page.locator('.hp-program-card-v2 img').count();
  const heroMinH = await page.evaluate(() => window.getComputedStyle(document.querySelector('.hp-hero')).minHeight);
  console.log(`desktop cards: ${cardCount} (want 5), card imgs: ${cardImgs} (want 5)`);
  console.log(`desktop hero min-height: ${heroMinH}`);

  // Mobile hero (the fix target)
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mpage = await mctx.newPage();
  mpage.on('pageerror', e => logs.push(`MOBILE PAGEERROR: ${e.message}`));
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(900);
  await mpage.screenshot({ path: `${OUT}/v2-mobile-hero.png` });

  const mHeroMinH = await mpage.evaluate(() => window.getComputedStyle(document.querySelector('.hp-hero')).minHeight);
  const mHeroPos = await mpage.evaluate(() => window.getComputedStyle(document.querySelector('.hp-hero'), '::before').backgroundPosition);
  console.log(`mobile hero min-height: ${mHeroMinH} (want ~82vh)`);
  console.log(`mobile hero bg-pos: ${mHeroPos}`);

  await mpage.locator('#programs').scrollIntoViewIfNeeded();
  await mpage.waitForTimeout(700);
  await mpage.screenshot({ path: `${OUT}/v2-mobile-cards.png` });

  // Tablet
  const tctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tpage = await tctx.newPage();
  await tpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await tpage.waitForTimeout(700);
  await tpage.locator('#programs').scrollIntoViewIfNeeded();
  await tpage.waitForTimeout(500);
  await tpage.screenshot({ path: `${OUT}/v2-tablet-cards.png` });

  console.log('=== ERRORS ===');
  console.log(logs.length ? logs.join('\n') : '(none)');
  await browser.close();
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
