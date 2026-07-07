const { chromium } = require('playwright');
const BASE = 'http://localhost:4175';
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];

  // ===== DESKTOP =====
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => logs.push(`DESKTOP PAGEERROR: ${e.message}`));
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/diag-desktop-hero.png` });

  // Programs section (the "awful" cards)
  await page.locator('#programs').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/diag-desktop-cards.png` });

  // Capture the cards HTML to understand current structure
  const cardsHtml = await page.locator('#program-grid').innerHTML();
  console.log('=== CURRENT CARDS HTML ===');
  console.log(cardsHtml.substring(0, 800));

  // ===== MOBILE (390 - the problem viewport) =====
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mpage = await mctx.newPage();
  mpage.on('pageerror', e => logs.push(`MOBILE PAGEERROR: ${e.message}`));
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(800);
  await mpage.screenshot({ path: `${OUT}/diag-mobile-hero.png` });

  // Mobile hero computed styles to diagnose crop
  const heroStyles = await mpage.evaluate(() => {
    const hero = document.querySelector('.hp-hero');
    const heroBefore = document.querySelector('.hp-hero');
    const cs = window.getComputedStyle(hero);
    const bf = window.getComputedStyle(heroBefore, '::before');
    return {
      minHeight: cs.minHeight,
      bgImage: bf.backgroundImage?.substring(0, 80),
      bgSize: bf.backgroundSize,
      bgPos: bf.backgroundPosition,
      filter: bf.filter,
    };
  });
  console.log('=== MOBILE HERO COMPUTED ===');
  console.log(JSON.stringify(heroStyles, null, 2));

  // Mobile cards
  await mpage.locator('#programs').scrollIntoViewIfNeeded();
  await mpage.waitForTimeout(600);
  await mpage.screenshot({ path: `${OUT}/diag-mobile-cards.png` });

  // Tablet
  const tctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tpage = await tctx.newPage();
  await tpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await tpage.waitForTimeout(600);
  await tpage.screenshot({ path: `${OUT}/diag-tablet-hero.png` });
  await tpage.locator('#programs').scrollIntoViewIfNeeded();
  await tpage.waitForTimeout(500);
  await tpage.screenshot({ path: `${OUT}/diag-tablet-cards.png` });

  console.log('=== ERRORS ===');
  console.log(logs.length ? logs.join('\n') : '(none)');
  await browser.close();
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
