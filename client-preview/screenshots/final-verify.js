const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(require('os').tmpdir(), 'asc3nd-final-' + Date.now());
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const logs = [];
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  p.on('console', m => { if (m.type()==='error') logs.push('CONSOLE: '+m.text()); });
  p.on('pageerror', e => logs.push('PAGEERROR: '+e.message()));

  // Light mode full sweep
  await p.goto('http://localhost:4176/', { waitUntil: 'networkidle' }); await p.waitForTimeout(900);
  for (const s of ['#mission','#programs','#blog','#store','#approval-path','#get-involved','#contact']) {
    await p.locator(s).scrollIntoViewIfNeeded().catch(()=>{}); await p.waitForTimeout(200);
  }
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/light-full.png`, fullPage:true });

  // Dark mode
  await p.evaluate(() => localStorage.setItem('asc3nd_theme','dark'));
  await p.reload({ waitUntil:'networkidle' }); await p.waitForTimeout(700);
  const theme = await p.evaluate(()=>document.documentElement.getAttribute('data-theme'));
  const bg = await p.evaluate(()=>getComputedStyle(document.body).backgroundColor);
  console.log('dark theme attr:', theme, '| body bg:', bg);
  await p.screenshot({ path: `${OUT}/dark-hero.png` });
  await p.locator('#programs').scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/dark-cards.png` });

  // Store teaser rhythm check
  await p.evaluate(() => localStorage.setItem('asc3nd_theme','light'));
  await p.reload({ waitUntil:'networkidle' }); await p.waitForTimeout(500);
  await p.locator('#store').scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  const storeCols = await p.evaluate(() => getComputedStyle(document.querySelector('.hp-store .hp-store-grid')).gridTemplateColumns);
  console.log('store teaser columns:', storeCols);
  await p.screenshot({ path: `${OUT}/light-store.png` });

  console.log('=== ERRORS ==='); console.log(logs.length ? logs.join('\n') : '(none)');
  console.log('OUTPUT:', OUT);
  await b.close();
})().catch(e=>{ console.error('FAIL:',e.message); process.exit(1); });
