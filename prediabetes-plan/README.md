# Prediabetes Reset Plan: sales page

Static, mobile-first sales page (English, US audience). No dependencies: a tiny Node script turns `site.config.mjs` into plain HTML in `dist/`. Lives in its own folder, separate from the rest of this repo.

Pages: `/` (sales), `/terms/`, `/privacy/`, `/disclaimer/`, `/contact/`, `/thank-you/` (Purchase event, not indexed).

## Edit anything
**Everything** (copy, price, links, FAQ, legal text) is in `site.config.mjs`. Then:
```bash
npm run dev      # build + preview at http://localhost:3000
npm run check    # build + scan for forbidden wording
```
Text written as `[[like this]]` is a placeholder: it shows highlighted in yellow on the page and the build lists it.
`npm run launch-check` fails while any placeholder or warning is open. Use it right before turning on ads.

## Deploy on Vercel
1. Vercel → Add New → Project → import this repo.
2. **Root Directory:** `prediabetes-plan`. Framework preset: Other. (`vercel.json` already sets build command and output `dist`.)
3. Settings → Environment Variables (all optional, they override the config):
   | Name | Example |
   |---|---|
   | `CHECKOUT_URL` | your merchant-of-record checkout link |
   | `META_PIXEL_ID` | your numeric pixel ID |
   | `SITE_URL` | `https://yourdomain.com` (canonical, Open Graph, sitemap) |
   | `SUPPORT_EMAIL` | `support@yourdomain.com` |
4. Redeploy after changing a variable (they are read at build time).
5. In your checkout, set the post-purchase redirect to `https://yourdomain.com/thank-you/`.

## Change the checkout link or pixel
- Quick: change `CHECKOUT_URL` / `META_PIXEL_ID` in Vercel and redeploy.
- Or edit `checkoutUrl` and `tracking.metaPixelId` in `site.config.mjs`.
- Events: `PageView` and `ViewContent` on load, `InitiateCheckout` on any buy button click, `Purchase` on `/thank-you/` (uses `?value=` if your checkout adds it, otherwise the page price). Names/params are deliberately generic (`content_name: "14-Day Meal Plan"`): never put a health term in them, or in your domain/URL.
- `utm_*` and `fbclid` are passed on to the checkout link (`passQueryToCheckout`).

## Compliance guardrails built in
- `npm run check` (also runs on every Vercel build) fails if the built pages contain cure, reverse, treat/treatment, heal, A1C, "get off medication", "diabetes-proof", "guaranteed results", or "you have prediabetes", or if the tracking payload mentions a health term.
- The exact disclaimer shows next to every buy button and in the footer.
- No testimonials, ratings, counters, quiz, pop-ups or data fields. Only the CDC statistic from the brief is used.
- Note: your brief's FAQ question "Is this a cure?" would trip the checker, so it is worded "Is this medical advice or a medical program?" with the same honest answer.

## Still needed from you
1. **Merchant of record** (Gumroad / Lemon Squeezy / Paddle / Hotmart): decision pending → then `CHECKOUT_URL`, refund terms (and set `guarantee.confirmedWithMerchant: true`, fix the FAQ and Terms refund lines).
2. **Registered Dietitian:** real name, credential/license number, bio, optional photo. Do not publish the "Reviewed by" seal before a real review has happened.
3. **Product mockup image** → `static/mockup.png`, set `images.mockup`. Replace `static/og.png` (placeholder, 1200×630) too.
4. **The PDF itself** (not written yet) and RD sign-off on the 2 sample recipes on the page.
5. **Business details:** legal name, mailing address, support email, brand name (`Steady Plate` is just a working name), domain.
6. **Meta Pixel ID** and the 3 pixel events verified in Events Manager (Test Events).
7. **Lawyer review** of Terms and Privacy (drafts) and of the Meta health-ads policy before running ads.
8. Re-verify the CDC statistic wording on cdc.gov.
9. Later: order bump ($7) and upsell pages live at the checkout, not here. Spanish version is phase 2.
