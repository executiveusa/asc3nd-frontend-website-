const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = 'http://localhost:4176';
const OUT = path.join(require('os').tmpdir(), 'asc3nd-brutal-' + Date.now());
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];

  // Desktop 1440
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await d.newPage();
  dp.on('console', m => { if (m.type()==='error') logs.push('D CONSOLE: '+m.text()); });
  dp.on('pageerror', e => logs.push('D PAGEERROR: '+e.message()));
  await dp.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await dp.waitForTimeout(1000);
  await dp.screenshot({ path: `${OUT}/brutal-d-hero.png` });
  for (const s of ['#mission','#programs','#blog','#store','#approval-path','#get-involved','#contact']) {
    await dp.locator(s).scrollIntoViewIfNeeded().catch(()=>{}); await dp.waitForTimeout(250);
  }
  await dp.evaluate(()=>window.scrollTo(0,0)); await dp.waitForTimeout(300);
  await dp.screenshot({ path: `${OUT}/brutal-d-full.png`, fullPage:true });
  await dp.locator('#mission').scrollIntoViewIfNeeded(); await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/brutal-d-mission.png` });
  await dp.locator('#programs').scrollIntoViewIfNeeded(); await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/brutal-d-cards.png` });
  await dp.locator('#store').scrollIntoViewIfNeeded(); await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/brutal-d-store.png` });
  await dp.locator('#contact').scrollIntoViewIfNeeded(); await dp.waitForTimeout(400);
  await dp.screenshot({ path: `${OUT}/brutal-d-contact.png` });

  // Mobile 390
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor:2 });
  const mp = await m.newPage();
  await mp.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await mp.waitForTimeout(700);
  await mp.screenshot({ path: `${OUT}/brutal-m-hero.png` });
  await mp.locator('#programs').scrollIntoViewIfNeeded(); await mp.waitForTimeout(500);
  await mp.screenshot({ path: `${OUT}/brutal-m-cards.png` });
  await mp.locator('#contact').scrollIntoViewIfNeeded(); await mp.waitForTimeout(500);
  await mp.screenshot({ path: `${OUT}/brutal-m-contact.png` });
  await mp.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await mp.waitForTimeout(500);
  await mp.screenshot({ path: `${OUT}/brutal-m-footer.png` });

  // Tablet 768
  const t = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tp = await t.newPage();
  await tp.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await tp.waitForTimeout(600);
  await tp.screenshot({ path: `${OUT}/brutal-t-hero.png` });

  console.log('=== ERRORS ==='); console.log(logs.length ? logs.join('\n') : '(none)');
  console.log('OUTPUT DIR:', OUT);
  await browser.close();
})().catch(e=>{ console.error('FAIL:',e.message); process.exit(1); });
