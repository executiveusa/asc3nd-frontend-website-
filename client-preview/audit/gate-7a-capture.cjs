const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = __dirname.replace(/\\audit$/, "");
const outDir = path.join(root, "audit", "screenshots", "gate-7a");
const evidencePath = path.join(root, "audit", "gate-7a-evidence.json");
const url = process.env.ASC3ND_AUDIT_URL || "https://client-preview-nine.vercel.app/";
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const viewports = [
  { name: "mobile-390", width: 390, height: 1200 },
  { name: "tablet-768", width: 768, height: 1200 },
  { name: "laptop-1024", width: 1024, height: 1200 },
  { name: "desktop-1440", width: 1440, height: 1200 },
  { name: "wide-1920", width: 1920, height: 1200 },
];

fs.mkdirSync(outDir, { recursive: true });

const evidence = {
  url,
  capturedAt: new Date().toISOString(),
  viewports: [],
  links: [],
  buttons: [],
  modalTests: [],
  formTests: {},
  resources: {},
  console: [],
  screenshotWrapper: null,
};

async function goto(page, target = url) {
  await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(1200);
}

async function captureViewport(browser, vp) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  page.on("console", (msg) => evidence.console.push({ viewport: vp.name, type: msg.type(), text: msg.text() }));
  await goto(page);
  const title = await page.title();
  const bodyText = await page.locator("body").innerText().catch(() => "");
  const heroVisible = await page.locator("#home, .hp-hero").first().isVisible().catch(() => false);
  const navVisible = await page.locator("header, .a3-nav").first().isVisible().catch(() => false);
  const hasFrame = await page.locator(".frame").count();
  const hasPreviewImage = await page.locator(".preview-image").count();
  await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true });
  await page.screenshot({ path: path.join(outDir, `${vp.name}-viewport.png`), fullPage: false });
  evidence.viewports.push({
    ...vp,
    title,
    heroVisible,
    navVisible,
    hasFrame,
    hasPreviewImage,
    bodyPreview: bodyText.slice(0, 500),
  });
  await page.close();
}

async function testModal(page, triggerName, closeMode) {
  await goto(page);
  const trigger = page.locator(`[data-modal-trigger="${triggerName}"]`).first();
  const triggerExists = await trigger.count();
  if (!triggerExists) return { triggerName, closeMode, pass: false, reason: "missing trigger" };
  await trigger.click();
  await page.waitForTimeout(300);
  const open = await page.locator("#modal:not([hidden])").isVisible().catch(() => false);
  const title = await page.locator("#modal-title").innerText().catch(() => "");
  if (closeMode === "x") await page.locator("[data-modal-close]").first().click();
  if (closeMode === "button") await page.locator(".modal__actions [data-modal-close]").click();
  if (closeMode === "escape") await page.keyboard.press("Escape");
  if (closeMode === "overlay") await page.mouse.click(20, 20);
  await page.waitForTimeout(450);
  const closed = (await page.locator("#modal[hidden]").count()) > 0;
  const focusReturned = await page.evaluate(() => document.activeElement?.dataset?.modalTrigger || document.activeElement?.textContent?.trim() || document.activeElement?.tagName);
  return { triggerName, closeMode, open, title, closed, focusReturned };
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chrome,
    args: ["--disable-gpu", "--disable-dev-shm-usage"],
  });

  for (const vp of viewports) await captureViewport(browser, vp);

  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await goto(page);
  evidence.screenshotWrapper = {
    frameCount: await page.locator(".frame").count(),
    previewImageCount: await page.locator(".preview-image").count(),
    sections: await page.locator("main section").evaluateAll((nodes) =>
      nodes.map((node) => ({
        id: node.id,
        className: String(node.className),
        text: (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
      })),
    ),
  };
  evidence.links = await page.locator("a").evaluateAll((els) =>
    els.map((el, index) => ({
      index,
      text: (el.textContent || "").trim().replace(/\s+/g, " "),
      href: el.href,
      rawHref: el.getAttribute("href"),
      aria: el.getAttribute("aria-label"),
    })),
  );
  evidence.buttons = await page.locator("button").evaluateAll((els) =>
    els.map((el, index) => ({
      index,
      text: (el.textContent || "").trim().replace(/\s+/g, " "),
      modal: el.getAttribute("data-modal-trigger"),
      id: el.id,
      aria: el.getAttribute("aria-label"),
    })),
  );

  for (const resource of ["llms.txt", "robots.txt", "sitemap.xml", "blog.html", "merch.html"]) {
    const response = await page.goto(`${url}${resource}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const text = await page.locator("body").innerText().catch(() => "");
    evidence.resources[resource] = {
      status: response?.status(),
      title: await page.title().catch(() => ""),
      textPreview: text.slice(0, 500),
      hasLocalPath: /[A-Z]:\\|Users\\execu/i.test(text),
      hasSecretToken: /(api[_-]?key|secret|token|password)\s*[:=]/i.test(text),
    };
  }

  await goto(page);
  for (const [triggerName, closeMode] of [
    ["events", "x"],
    ["volunteer", "button"],
    ["privacy", "escape"],
    ["terms", "overlay"],
  ]) {
    evidence.modalTests.push(await testModal(page, triggerName, closeMode));
  }

  await goto(page);
  const langBefore = await page.locator("html").getAttribute("lang");
  await page.locator("#lang-toggle").click();
  await page.waitForTimeout(500);
  const langAfter = await page.locator("html").getAttribute("lang");
  const spanishText = await page.locator("body").innerText().then((text) => /JÓVENES|Contacto|Donar|FUTUROS/.test(text)).catch(() => false);
  evidence.language = { langBefore, langAfter, spanishText };

  await goto(page);
  const themeBefore = await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-toggle").click();
  await page.waitForTimeout(500);
  const themeAfter = await page.locator("html").getAttribute("data-theme");
  await page.screenshot({ path: path.join(outDir, "desktop-theme-toggled.png"), fullPage: false });
  evidence.theme = { themeBefore, themeAfter };

  await goto(page);
  await page.locator("#contact-form button[type='submit']").click();
  await page.waitForTimeout(300);
  const invalidCount = await page.locator(":invalid").count().catch(() => null);
  await page.fill("#contact-name", "Gate 7A Tester");
  await page.fill("#contact-email", "bad-email");
  await page.fill("#contact-message", "Testing validation.");
  await page.locator("#contact-form button[type='submit']").click();
  await page.waitForTimeout(300);
  const badEmailInvalid = await page.locator("#contact-email:invalid").count().catch(() => null);
  await page.fill("#contact-email", "tester@example.com");
  await page.selectOption("#contact-interest", { label: "Volunteer" }).catch(async () => {
    const firstValue = await page.locator("#contact-interest option").nth(1).getAttribute("value");
    await page.selectOption("#contact-interest", firstValue || "Volunteer");
  });
  await page.locator("#contact-form button[type='submit']").click();
  await page.waitForTimeout(500);
  const successVisible = await page.locator("#contact-success").isVisible().catch(() => false);
  const summary = await page.locator("#contact-summary").innerText().catch(() => "");
  const mailto = await page.locator("#mailto-link").getAttribute("href").catch(() => "");
  await page.locator("#copy-summary").click().catch(() => {});
  await page.waitForTimeout(300);
  const toastText = await page.locator("#toast").innerText().catch(() => "");
  evidence.formTests = {
    invalidCount,
    badEmailInvalid,
    successVisible,
    summaryPreview: summary.slice(0, 500),
    mailtoPreview: (mailto || "").slice(0, 220),
    toastText,
  };

  for (const [name, selector] of [
    ["hero", ".hp-hero"],
    ["nav", "header"],
    ["mission-programs", "#mission"],
    ["stories", "#blog"],
    ["store", "#store"],
    ["contact", "#contact"],
    ["footer", "footer"],
  ]) {
    await goto(page);
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `desktop-${name}.png`), fullPage: false });
    }
  }

  for (const modal of ["events", "volunteer", "privacy", "terms"]) {
    await goto(page);
    const trigger = page.locator(`[data-modal-trigger="${modal}"]`).first();
    if (await trigger.count()) {
      await trigger.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `desktop-modal-${modal}.png`), fullPage: false });
    }
  }

  await browser.close();
  fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ outDir, evidencePath, screenshots: fs.readdirSync(outDir).length }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
