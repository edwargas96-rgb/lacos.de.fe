// Zero-dependency static site generator. Reads site.config.mjs, writes ./dist.
// Usage: node build.mjs   (STRICT_PLACEHOLDERS=1 fails the build if any [[placeholder]] is left)
import { mkdir, rm, cp, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import cfg from './site.config.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const warnings = [];

// ---------- helpers ----------
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Escape, then turn [[placeholder]] into a visible highlighted marker.
const t = (s = '') => esc(s).replace(/\[\[(.+?)\]\]/g, '<mark class="ph" title="Placeholder: replace before launch">[$1]</mark>');
const fmt = (s) =>
  s
    .replaceAll('{year}', new Date().getFullYear())
    .replaceAll('{legalName}', cfg.site.legalName)
    .replaceAll('{supportEmail}', cfg.site.supportEmail)
    .replaceAll('{guaranteeDays}', cfg.guarantee.days);
const siteUrl = cfg.site.url.replace(/\/$/, '');
const checkoutSet = !/\[\[/.test(cfg.checkoutUrl);
const checkoutHref = checkoutSet ? cfg.checkoutUrl : '#buy';
const priceAttr = `${cfg.price.display}`;

// ---------- shared pieces ----------
const disclaimer = (cls = '') => `<p class="disclaimer ${cls}"><strong>Disclaimer:</strong> ${esc(cfg.disclaimer)} <a href="/disclaimer/">Read more</a></p>`;

const cta = (label, where) => `
  <div class="cta-wrap">
    <a class="btn" href="${esc(checkoutHref)}" data-checkout data-where="${where}">${esc(label)} <span aria-hidden="true">· ${esc(priceAttr)}</span></a>
    <p class="cta-note">${esc(cfg.price.note)} ${esc(cfg.hero.finePrint)}</p>
    ${disclaimer()}
  </div>`;

const mockup = () =>
  cfg.images.mockup
    ? `<img class="mockup" src="${esc(cfg.images.mockup)}" alt="${esc(cfg.images.mockupAlt)}" width="560" height="560" fetchpriority="high">`
    : `<div class="mockup cover" role="img" aria-label="${esc(cfg.images.mockupAlt)}">
         <div class="cover-badge">14 DAYS</div>
         <div class="cover-title">${esc(cfg.site.productName)}</div>
         <div class="cover-sub">${esc(cfg.site.productSubtitle)}</div>
         <div class="cover-tag">Meals · Grocery Lists · Habits</div>
         <mark class="ph cover-ph">Mockup placeholder</mark>
       </div>`;

function layout({ title, description, path: urlPath, body, noindex = false, page = '', ogImage = true }) {
  const canonical = siteUrl ? `${siteUrl}${urlPath}` : '';
  const og = siteUrl ? `${siteUrl}${cfg.seo.ogImage}` : cfg.seo.ogImage;
  const pixelId = cfg.tracking.metaPixelId;
  const pixel = pixelId
    ? `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${esc(pixelId)}');fbq('track','PageView');</script>`
    : '';
  const siteData = JSON.stringify({
    page,
    pixel: Boolean(pixelId),
    value: cfg.price.amount,
    currency: cfg.price.currency,
    contentName: cfg.tracking.contentName,
    passQuery: cfg.passQueryToCheckout,
  }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#14532d">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.site.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
${ogImage ? `<meta property="og:image" content="${esc(og)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:image" content="${esc(og)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/styles.css">
${pixel}
<noscript>${pixelId ? `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${esc(pixelId)}&ev=PageView&noscript=1">` : ''}</noscript>
<script>window.__SITE__=${siteData};</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${body}
<script src="/site.js" defer></script>
</body>
</html>`;
}

const header = (home = false) => `
<header class="header">
  <div class="wrap header-in">
    <a class="brand" href="/">${esc(cfg.site.brand)}</a>
    ${home ? `<a class="header-cta" href="${esc(checkoutHref)}" data-checkout data-where="header">Get the Plan</a>` : ''}
  </div>
</header>`;

const footer = () => `
<footer class="footer">
  <div class="wrap">
    ${disclaimer('on-dark')}
    <nav class="footer-nav" aria-label="Footer">
      <a href="/terms/">Terms</a>
      <a href="/privacy/">Privacy</a>
      <a href="/disclaimer/">Disclaimer</a>
      <a href="/contact/">Contact</a>
    </nav>
    <p class="copy">${t(fmt(cfg.footer.copyright))}</p>
  </div>
</footer>`;

// ---------- home page ----------
function home() {
  const c = cfg;
  const body = `
${header(true)}
<div class="topbar"><div class="wrap">${esc(c.topbar)}</div></div>
<main id="main">

<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>${esc(c.hero.headline)}</h1>
      <p class="sub">${esc(c.hero.subheadline)}</p>
      <ul class="ticks">${c.hero.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      ${cta(c.hero.cta, 'hero')}
    </div>
    <div class="hero-img">${mockup()}</div>
  </div>
</section>

<section class="band-warm">
  <div class="wrap narrow">
    <p class="stat">${esc(c.stat.text)} <a class="src" href="${esc(c.stat.sourceUrl)}" target="_blank" rel="noopener nofollow">${esc(c.stat.source)}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap narrow">
    <h2>${esc(c.familiar.title)}</h2>
    <div class="cards">
      ${c.familiar.items.map((i) => `<div class="card"><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}
    </div>
    <p class="closing">${esc(c.familiar.closing)}</p>
  </div>
</section>

<section class="section band-warm">
  <div class="wrap">
    <h2 class="center">${esc(c.inside.title)}</h2>
    <p class="lead center">${esc(c.inside.intro)}</p>
    <div class="grid">
      ${c.inside.items
        .map((i) => `<div class="tile"><div class="icon" aria-hidden="true">${i.icon}</div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`)
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="center">${esc(c.samples.title)}</h2>
    <p class="lead center">${esc(c.samples.intro)}</p>
    <div class="recipes">
      ${c.samples.recipes
        .map(
          (r) => `<article class="recipe">
        <h3>${esc(r.name)}</h3>
        <p class="meta">${esc(r.meta)}</p>
        <h4>Ingredients</h4>
        <ul>${r.ingredients.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <h4>Steps</h4>
        <ol>${r.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
      </article>`,
        )
        .join('')}
    </div>
    <p class="small center">${esc(c.samples.note)}</p>
  </div>
</section>

<section class="section cta-section">
  <div class="wrap narrow center">
    ${cta(c.hero.cta, 'mid')}
  </div>
</section>

<section class="section">
  <div class="wrap narrow">
    <h2>${esc(c.steps.title)}</h2>
    <ol class="steps">
      ${c.steps.items.map((s) => `<li><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section band-warm">
  <div class="wrap narrow">
    <div class="rd">
      ${c.dietitian.photo ? `<img class="rd-photo" src="${esc(c.dietitian.photo)}" alt="${esc(c.dietitian.name)}" width="120" height="120" loading="lazy">` : `<div class="rd-seal" aria-hidden="true">RD</div>`}
      <div>
        <h2>${esc(c.dietitian.title)}</h2>
        <p>${esc(c.dietitian.text)}</p>
        <p class="rd-name"><strong>${t(c.dietitian.name)}</strong>, ${t(c.dietitian.credential)}</p>
        <p>${t(c.dietitian.bio)}</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="center">${esc(c.audience.title)}</h2>
    <div class="two">
      <div class="panel yes"><h3>${esc(c.audience.forTitle)}</h3><ul>${c.audience.forItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="panel no"><h3>${esc(c.audience.notTitle)}</h3><ul>${c.audience.notItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>

<section class="section band-warm">
  <div class="wrap narrow">
    <div class="guarantee">
      <div class="g-badge" aria-hidden="true"><span>${esc(c.guarantee.days)}</span>days</div>
      <div><h2>${esc(c.guarantee.title)}</h2><p>${esc(c.guarantee.text)}</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap narrow">
    <h2>${esc(c.faq.title)}</h2>
    <div class="faq">
      ${c.faq.items.map((f) => `<details><summary>${esc(f.q)}</summary><p>${t(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section final" id="buy">
  <div class="wrap narrow center">
    <h2>${esc(c.finalCta.title)}</h2>
    <p class="lead">${esc(c.finalCta.text)}</p>
    <p class="price"><span class="price-label">${esc(c.finalCta.priceLabel)}</span> <span class="price-num">${esc(c.price.display)}</span></p>
    ${cta(c.finalCta.cta, 'final')}
    ${checkoutSet ? '' : '<p class="ph-box"><mark class="ph">CHECKOUT_URL not set. Buttons do not go anywhere yet.</mark></p>'}
  </div>
</section>

</main>
${footer()}`;
  return layout({ title: c.seo.title, description: c.seo.description, path: '/', body, page: 'home' });
}

// ---------- simple pages ----------
function textPage(key, urlPath) {
  const p = cfg.pages[key];
  const body = `
${header()}
<main id="main" class="section">
  <div class="wrap narrow legal">
    <h1>${esc(p.title)}</h1>
    <p class="small">Last updated: ${esc(cfg.site.effectiveDate)}</p>
    ${p.draft ? '<p class="ph-box"><mark class="ph">DRAFT: have an attorney review this page before launch.</mark></p>' : ''}
    ${p.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((x) => `<p>${t(fmt(x))}</p>`).join('')}`).join('')}
    <p><a href="/">&larr; Back to home</a></p>
  </div>
</main>
${footer()}`;
  return layout({ title: `${p.title} | ${cfg.site.brand}`, description: p.title, path: urlPath, body, ogImage: false });
}

function contact() {
  const p = cfg.pages.contact;
  const body = `
${header()}
<main id="main" class="section">
  <div class="wrap narrow legal">
    <h1>${esc(p.title)}</h1>
    <p>${esc(p.intro)}</p>
    <p class="big-email"><strong>${esc(p.emailLabel)}:</strong> ${
      /\[\[/.test(cfg.site.supportEmail) ? t(cfg.site.supportEmail) : `<a href="mailto:${esc(cfg.site.supportEmail)}">${esc(cfg.site.supportEmail)}</a>`
    }</p>
    <p>${esc(p.hint)}</p>
    <p class="small">${t(cfg.site.legalName)}<br>${t(cfg.site.legalAddress)}</p>
    <p><a href="/">&larr; Back to home</a></p>
  </div>
</main>
${footer()}`;
  return layout({ title: `${p.title} | ${cfg.site.brand}`, description: p.title, path: '/contact/', body, ogImage: false });
}

function thankYou() {
  const ty = cfg.thankYou;
  const body = `
${header()}
<main id="main" class="section">
  <div class="wrap narrow center">
    <h1>${esc(ty.title)}</h1>
    <p class="lead">${esc(ty.text)}</p>
    <p>${esc(ty.note)}</p>
    ${disclaimer()}
    <p><a href="/contact/">Contact support</a></p>
  </div>
</main>
${footer()}`;
  return layout({ title: `${ty.title} | ${cfg.site.brand}`, description: ty.title, path: '/thank-you/', body, noindex: true, page: 'thank-you', ogImage: false });
}

// ---------- write ----------
const pages = [
  ['index.html', home()],
  ['terms/index.html', textPage('terms', '/terms/')],
  ['privacy/index.html', textPage('privacy', '/privacy/')],
  ['disclaimer/index.html', textPage('disclaimer', '/disclaimer/')],
  ['contact/index.html', contact()],
  ['thank-you/index.html', thankYou()],
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const [file, html] of pages) {
  const out = path.join(dist, file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}
await cp(path.join(root, 'static'), dist, { recursive: true });
await cp(path.join(root, 'src', 'styles.css'), path.join(dist, 'styles.css'));
await cp(path.join(root, 'src', 'site.js'), path.join(dist, 'site.js'));
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nDisallow: /thank-you/\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
if (siteUrl) {
  const urls = ['/', '/terms/', '/privacy/', '/disclaimer/', '/contact/'];
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${siteUrl}${u}</loc></url>`).join('\n')}\n</urlset>\n`,
  );
}

// ---------- launch-readiness warnings ----------
const placeholders = new Set();
for (const [, html] of pages) for (const m of html.matchAll(/<mark class="ph"[^>]*>\[(.+?)\]<\/mark>/g)) placeholders.add(m[1]);
if (!checkoutSet) placeholders.add('CHECKOUT_URL');
for (const [k, v] of Object.entries(cfg.pages)) if (v.draft) placeholders.add(`Attorney review of the ${k} page`);
if (!cfg.tracking.metaPixelId) warnings.push('META_PIXEL_ID is empty: Meta Pixel is not loaded.');
if (!siteUrl) warnings.push('SITE_URL is empty: canonical URL, og:image URL and sitemap are skipped.');
if (!cfg.images.mockup) placeholders.add('Product mockup image (images.mockup)');
if (!cfg.guarantee.confirmedWithMerchant) warnings.push('Refund/guarantee terms not yet confirmed with the merchant of record.');
if (!existsSync(path.join(root, 'static', 'og.png'))) warnings.push('static/og.png is missing.');

console.log(`Built ${pages.length} pages into dist/`);
if (placeholders.size) {
  console.log(`\nPlaceholders still open (${placeholders.size}):`);
  for (const p of placeholders) console.log(`  - ${p}`);
}
if (warnings.length) {
  console.log('\nWarnings:');
  for (const w of warnings) console.log(`  - ${w}`);
}
if (process.env.STRICT_PLACEHOLDERS === '1' && (placeholders.size || warnings.length)) {
  console.error('\nSTRICT_PLACEHOLDERS=1: build failed because the items above are unresolved.');
  process.exit(1);
}
