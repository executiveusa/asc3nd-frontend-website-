const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://localhost:4176/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.locator('#programs').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const data = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('.hp-program-card-v2')];
    return {
      cards: cards.map(c => ({
        title: c.querySelector('h3')?.textContent?.trim(),
        body: c.querySelector('p')?.textContent?.trim()?.substring(0, 45),
        badge: c.querySelector('.hp-program-card-badge span')?.textContent?.trim(),
        img: c.querySelector('img')?.src?.split('/').pop(),
        imgOk: c.querySelector('img')?.complete && c.querySelector('img')?.naturalWidth > 0,
        hasRule: !!c.querySelector('.hp-program-card-rule'),
        hasTint: !!c.querySelector('.hp-program-card-tint'),
      })),
      // hero readability + trust strip presence
      heroH1: document.querySelector('.hp-hero h1')?.textContent?.replace(/\s+/g,' ').trim(),
      trustStrip: [...document.querySelectorAll('.hp-hero-trust span')].map(s => s.textContent.trim()),
      // contact form fields
      contactFields: [...document.querySelectorAll('#contact-form label > span')].map(s => s.textContent.trim()),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await b.close();
})();
