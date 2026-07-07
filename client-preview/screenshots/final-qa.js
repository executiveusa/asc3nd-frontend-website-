const { chromium } = require('playwright');
const BASE = 'http://localhost:4175';
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') logs.push(`CONSOLE ERROR: ${m.text()}`); });
  page.on('pageerror', e => logs.push(`PAGEERROR: ${e.message()}`));

  // Home: full sweep
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  for (const s of ['#mission','#programs','#blog','#store','#get-involved','#contact']) {
    await page.locator(s).scrollIntoViewIfNeeded().catch(()=>{});
    await page.waitForTimeout(300);
  }
  await page.evaluate(() => window.scrollTo(0,0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/final-desktop-hero.png` });
  await page.locator('#programs').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/final-desktop-cards.png` });
  await page.locator('#contact').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/final-desktop-contact.png` });

  // Verify counts + image loads after lazy scroll
  const checks = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map(i => ({ s: (i.currentSrc||i.src).split('/').pop(), ok: i.complete && i.naturalWidth>0 }));
    return {
      cards: document.querySelectorAll('.hp-program-card-v2').length,
      cardImgs: document.querySelectorAll('.hp-program-card-v2 img').length,
      blogTeaser: document.querySelectorAll('#blog-grid .blog-card').length,
      storeTeaser: document.querySelectorAll('#store-grid .store-card').length,
      failedImgs: imgs.filter(i=>!i.ok).map(i=>i.s),
    };
  });
  console.log('=== HOME CHECKS ===');
  console.log(JSON.stringify(checks, null, 2));

  // Blog page
  await page.goto(`${BASE}/blog.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  const blogCards = await page.locator('#blog-grid .blog-card').count();
  const chips = await page.locator('#blog-toolbar .blog-chip').count();
  console.log(`BLOG: ${blogCards} cards, ${chips} chips`);
  await page.screenshot({ path: `${OUT}/final-desktop-blog.png` });

  // Merch page
  await page.goto(`${BASE}/merch.html`, { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  const merchCards = await page.locator('#store-grid .store-card').count();
  console.log(`MERCH: ${merchCards} cards`);
  await page.screenshot({ path: `${OUT}/final-desktop-merch.png` });

  // Theme + lang toggle still work
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await page.waitForTimeout(400);
  await page.evaluate(() => localStorage.setItem('asc3nd_theme','dark')); await page.reload({ waitUntil:'networkidle' }); await page.waitForTimeout(400);
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log(`dark theme: ${theme}`);
  await page.screenshot({ path: `${OUT}/final-desktop-dark.png` });

  // Mobile
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mpage = await mctx.newPage();
  mpage.on('pageerror', e => logs.push(`MOBILE PAGEERROR: ${e.message()}`));
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await mpage.waitForTimeout(700);
  await mpage.screenshot({ path: `${OUT}/final-mobile-hero.png` });
  await mpage.locator('#programs').scrollIntoViewIfNeeded(); await mpage.waitForTimeout(500);
  await mpage.screenshot({ path: `${OUT}/final-mobile-cards.png` });

  console.log('=== ERRORS ===');
  console.log(logs.length ? logs.join('\n') : '(none)');
  await browser.close();
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
