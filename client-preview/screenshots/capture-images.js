const { chromium } = require('playwright');
const BASE = 'http://localhost:4174';
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', m => logs.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', e => logs.push(`PAGEERROR: ${e.message}`));
  page.on('requestfailed', r => logs.push(`REQFAIL: ${r.url()} ${r.failure()?.errorText}`));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Scroll through the whole page to trigger all lazy loads
  const sections = ['#mission', '#programs', '#blog', '#store', '#get-involved', '#contact'];
  for (const s of sections) {
    await page.locator(s).scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Now check all imgs (lazy should have loaded)
  const imgCheck = await page.evaluate(() => {
    return [...document.querySelectorAll('img')].map(img => ({
      src: (img.currentSrc || img.src).split('/').pop(),
      loaded: img.complete && img.naturalWidth > 0,
      natW: img.naturalWidth,
    }));
  });
  console.log('=== IMG LOAD CHECK (after lazy scroll) ===');
  imgCheck.forEach(i => console.log(i.loaded ? 'OK  ' : 'FAIL', i.natW, i.src));

  // Re-verify sections render with content
  const missionImg = await page.locator('#mission img').count();
  const programBanner = await page.locator('.hp-program-banner img').count();
  const contactBanner = await page.locator('.hp-contact-banner img').count();
  const blogCards = await page.locator('#blog-grid .blog-card').count();
  const storeCards = await page.locator('#store-grid .store-card').count();
  console.log(`mission img: ${missionImg}, program banner: ${programBanner}, contact banner: ${contactBanner}`);
  console.log(`blog teaser: ${blogCards}, store teaser: ${storeCards}`);

  // Screenshots
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/images-desktop-hero.png` });
  await page.locator('#mission').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/images-desktop-mission.png` });
  await page.locator('#programs').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/images-desktop-programs.png` });
  await page.locator('#get-involved').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/images-desktop-cta.png` });
  await page.locator('#contact').scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/images-desktop-contact.png` });

  // Mobile
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mpage = await mctx.newPage();
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(600);
  await mpage.screenshot({ path: `${OUT}/images-mobile-hero.png` });
  for (const s of ['#mission', '#programs', '#contact']) {
    await mpage.locator(s).scrollIntoViewIfNeeded().catch(() => {});
    await mpage.waitForTimeout(300);
  }
  await mpage.locator('#mission').scrollIntoViewIfNeeded(); await mpage.waitForTimeout(400);
  await mpage.screenshot({ path: `${OUT}/images-mobile-mission.png` });
  await mpage.locator('#contact').scrollIntoViewIfNeeded(); await mpage.waitForTimeout(400);
  await mpage.screenshot({ path: `${OUT}/images-mobile-contact.png` });

  console.log('=== CONSOLE LOGS ===');
  console.log(logs.length ? logs.join('\n') : '(none)');

  await browser.close();
})().catch(e => { console.error('CAPTURE FAILED:', e.message); process.exit(1); });
