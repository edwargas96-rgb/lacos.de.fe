// =====================================================================
//  ALL page copy, prices and links live in THIS file. Edit here, run
//  `npm run build`, deploy. No need to touch build.mjs or styles.
//
//  Anything written like "[[ ... ]]" is a PLACEHOLDER. The build warns
//  about every one left, and `STRICT_PLACEHOLDERS=1` makes the build
//  fail, so nothing unfinished goes live by accident.
//
//  COMPLIANCE: do not add the words cure, reverse, treat/treatment, heal,
//  "lower your A1C", "get off medication", "diabetes-proof" or any health
//  result claim. `npm run check` scans the built pages and fails if found.
// =====================================================================

const env = process.env;

export default {
  // ---------- Business / links (placeholders must be replaced) ----------
  site: {
    brand: 'Steady Plate', // [[working brand name, change freely]]
    productName: 'The Prediabetes Reset Plan', // working name
    productSubtitle: '14 Days of Easy Meals, Grocery Lists & Daily Habits',
    url: env.SITE_URL || '', // e.g. https://yourdomain.com (set in Vercel env vars)
    supportEmail: env.SUPPORT_EMAIL || '[[support@yourdomain.com]]',
    legalName: '[[Legal business name]]',
    legalAddress: '[[Business mailing address]]',
    effectiveDate: 'October 2026', // legal pages "last updated"
  },

  // ---------- Price & checkout ----------
  price: {
    amount: 19, // test range: 17 to 27
    currency: 'USD',
    display: '$19',
    note: 'One-time payment. No subscription.',
  },
  // Replace with your merchant-of-record checkout link (Gumroad, Lemon Squeezy,
  // Paddle, Hotmart). Or set the CHECKOUT_URL env var in Vercel.
  checkoutUrl: env.CHECKOUT_URL || '[[CHECKOUT_URL]]',
  // Pass utm_* and fbclid from the ad to the checkout link (handy for attribution).
  passQueryToCheckout: true,

  // ---------- Meta Pixel ----------
  // Set META_PIXEL_ID in Vercel (or paste below). Empty = pixel not loaded.
  // Events: PageView + ViewContent (landing), InitiateCheckout (buy click),
  // Purchase (/thank-you). Event names/params are deliberately generic:
  // never put a health condition in them.
  tracking: {
    metaPixelId: env.META_PIXEL_ID || '',
    contentName: '14-Day Meal Plan', // generic on purpose
    // In your checkout, set the "after purchase" redirect to: <site>/thank-you/
  },

  // ---------- Disclaimer (required, exact text) ----------
  disclaimer:
    'Educational information only. Not medical advice. Talk to your doctor or a registered dietitian before changing your diet, especially if you take medication or have a medical condition.',

  // ---------- SEO / social ----------
  seo: {
    title: 'The Prediabetes Reset Plan: 14 Days of Easy Meals, Grocery Lists & Daily Habits',
    description:
      'Know exactly what to eat, buy and do every day, so you stop guessing. A 14-day meal and habit plan with simple recipes, grocery lists and a printable tracker. Instant PDF.',
    ogImage: '/og.png', // placeholder image in static/, replace with your real one
  },

  // ---------- Images ----------
  images: {
    // Put your real product mockup in static/ (e.g. static/mockup.png) and set it
    // here ('/mockup.png'). Empty = a clearly-labeled placeholder cover is shown.
    mockup: '',
    mockupAlt: 'The Prediabetes Reset Plan: 14-day meal plan PDF on a tablet and printed pages',
  },

  // ---------- Page sections ----------
  topbar: 'Instant PDF download · Works on your phone · Printable',

  hero: {
    headline: 'Know exactly what to eat, buy and do every day, so you stop guessing.',
    subheadline:
      'A simple 14-day plan of easy meals, grocery lists and daily habits, for anyone who was told their blood sugar is “a little high.”',
    cta: 'Get the 14-Day Plan',
    points: [
      '14 days of meals, planned for you',
      '30 simple recipes, 30 minutes or less',
      'Grocery lists, including a budget version',
    ],
    finePrint: 'Instant PDF download. Works on your phone. Print it if you like.',
  },

  familiar: {
    title: 'Does this sound familiar?',
    items: [
      {
        title: '“Watch what you eat.” But what does that mean on a Tuesday night?',
        text: 'Someone says to eat better, then you’re left to figure out dinner on your own.',
      },
      {
        title: 'You’re tired of Googling.',
        text: 'Ten websites, ten different answers. It’s hard to know what to trust or where to start.',
      },
      {
        title: 'The grocery store feels confusing.',
        text: 'Every label says something different, and you end up standing in the aisle with your phone out.',
      },
      {
        title: 'You don’t want to give up everything you enjoy.',
        text: 'You want real food that fits your life, not a plan you’ll quit by Friday.',
      },
    ],
    closing: 'You don’t need another complicated diet. You need a clear plan you can follow.',
  },

  inside: {
    title: 'What’s inside',
    intro: 'One PDF. Everything laid out so there’s nothing left to figure out.',
    items: [
      {
        icon: '📅',
        title: '14-Day Meal Plan',
        text: 'Breakfast, lunch, dinner and snacks for every day. Just open it and follow along.',
      },
      {
        icon: '🍳',
        title: '30 Simple Recipes',
        text: 'Ready in 30 minutes or less, made with ingredients from a regular grocery store.',
      },
      {
        icon: '🛒',
        title: 'Weekly Grocery Lists',
        text: 'Know what to buy before you go. A budget-friendly version is included.',
      },
      {
        icon: '🚶',
        title: 'Daily Habits Guide',
        text: 'A 10-minute walk after meals, sleep basics, the order foods go on your plate, and the plate method.',
      },
      {
        icon: '🍽️',
        title: 'Eating Out Guide',
        text: 'Easy ways to order at restaurants and fast-food places without the stress.',
      },
      {
        icon: '✅',
        title: '14-Day Printable Tracker',
        text: 'A one-page checklist to tick off meals and habits each day.',
      },
      {
        icon: '🩺',
        title: 'Questions for Your Doctor',
        text: 'A short list to bring to your next appointment so you get the most out of it.',
      },
    ],
  },

  // Sample recipes shown as a preview. Final recipes must be reviewed by your RD.
  samples: {
    title: 'Peek inside: 2 sample recipes',
    intro: 'This is the format you’ll get for all 30 recipes: short, clear and made with everyday ingredients.',
    note: 'Samples shown for format. Final recipes are reviewed by a Registered Dietitian before release.',
    recipes: [
      {
        name: 'Veggie Egg Scramble Plate',
        meta: 'Breakfast · 10 minutes · Serves 1',
        ingredients: [
          '2 eggs',
          '1 handful baby spinach',
          '¼ cup diced bell pepper',
          '1 tsp olive oil',
          'Salt and pepper',
          '½ cup berries on the side',
        ],
        steps: [
          'Warm the oil in a small pan over medium heat. Add the pepper and cook 2 minutes.',
          'Add the spinach and stir until it wilts. Crack in the eggs and stir gently until set.',
          'Season, then serve with the berries.',
        ],
      },
      {
        name: 'Sheet-Pan Lemon Chicken & Green Beans',
        meta: 'Dinner · 30 minutes · Serves 2',
        ingredients: [
          '2 chicken breasts',
          '2 cups green beans, trimmed',
          '1 lemon (zest and juice)',
          '1 tbsp olive oil',
          '1 tsp garlic powder',
          'Salt and pepper',
        ],
        steps: [
          'Heat the oven to 425°F. Line a sheet pan with foil.',
          'Toss the green beans with half the oil on the pan. Add the chicken and rub with the rest of the oil, garlic powder, lemon zest, salt and pepper.',
          'Roast 20 to 25 minutes, until the chicken is cooked through. Squeeze lemon juice over everything.',
        ],
      },
    ],
  },

  steps: {
    title: 'How it works',
    items: [
      { title: 'Open your plan', text: 'Download the PDF right after checkout. Read it on your phone, tablet or computer.' },
      { title: 'Follow the 14 days', text: 'Each day tells you what to eat and which small habits to do. The grocery list tells you what to buy.' },
      { title: 'Check off your tracker', text: 'Print the one-page tracker or use it on screen, and tick off each day as you go.' },
    ],
  },

  // The RD seal. Fill in REAL details only after a real RD has reviewed the content.
  dietitian: {
    title: 'Reviewed by a Registered Dietitian',
    text: 'Every meal plan and recipe in this guide is reviewed by a Registered Dietitian (RD/RDN) before release.',
    name: '[[RD full name]]',
    credential: '[[Credential, e.g. RDN, CDCES, license/CDR number]]',
    bio: '[[One or two real sentences about the dietitian’s background]]',
    photo: '', // optional, e.g. '/rd.jpg' placed in static/
  },

  audience: {
    title: 'Is this for you?',
    forTitle: 'This is for you if…',
    forItems: [
      'You were told your blood sugar is a little high and want a clear place to start',
      'You want simple meals without special ingredients or hard-to-find products',
      'You like checklists and a plan you can follow day by day',
      'You want to keep enjoying real food',
      'You’d like a list of good questions to bring to your doctor',
    ],
    notTitle: 'This is not for you if…',
    notItems: [
      'You’re looking for a quick fix or a miracle',
      'You want personalized medical care or a diagnosis. Please see your doctor for that',
      'You’re looking to change or stop any medication. Always follow your doctor’s advice',
      'You’re looking for a complicated program that needs special products or supplements',
    ],
  },

  // Confirm the guarantee terms with your merchant of record before publishing.
  guarantee: {
    confirmedWithMerchant: false, // set to true once confirmed (clears a build warning)
    days: 30,
    title: '30-Day Money-Back Guarantee',
    text: 'Try the plan for 30 days. If it isn’t useful to you, email us and we’ll refund your purchase. No long forms, no hoops.',
  },

  faq: {
    title: 'Questions, answered',
    items: [
      {
        q: 'Is this medical advice or a medical program?',
        a: 'No. This is a meal and habit plan for general education. It doesn’t diagnose anything or replace care from your doctor or a registered dietitian.',
      },
      {
        q: 'Can I use this if I take medication?',
        a: 'Talk to your doctor first, and keep taking what they prescribed. This plan never replaces your medication or your doctor’s instructions.',
      },
      {
        q: 'Do I need special ingredients?',
        a: 'No. Everything is available at a regular grocery store, and there’s a budget-friendly grocery list too.',
      },
      {
        q: 'What format is it?',
        a: 'An instant PDF download. You can read it on your phone, tablet or computer, or print it. The tracker is made for printing.',
      },
      {
        q: 'How much time does it take each day?',
        a: 'The recipes take 30 minutes or less, and the daily habits are small, like a 10-minute walk after a meal.',
      },
      {
        q: 'What if I don’t like it?',
        a: 'Email us within 30 days of purchase and we’ll refund you. [[Confirm exact refund terms with your merchant of record]]',
      },
      {
        q: 'How do I get the plan?',
        a: 'Right after checkout you’ll get a download link on the confirmation page and by email. Only your email address is needed.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to stop guessing?',
    text: 'Get the full 14-day plan, grocery lists, 30 recipes, habit guide, eating-out guide, tracker and doctor questions in one instant PDF.',
    cta: 'Get the 14-Day Plan',
    priceLabel: 'Today',
  },

  stat: {
    // CDC figure supplied in the project brief. Re-check the number and wording
    // against the CDC page before you run ads.
    text: 'About 1 in 3 U.S. adults, roughly 115 million people, have prediabetes, according to the CDC. Many don’t know it.',
    source: 'Source: CDC, National Diabetes Statistics Report',
    sourceUrl: 'https://www.cdc.gov/diabetes/php/data-research/index.html',
  },

  thankYou: {
    title: 'Thank you!',
    text: 'Your purchase is complete. Your download link is on this page if your checkout provides one, and a copy is sent to the email you used at checkout.',
    note: 'Don’t see it? Check your spam folder, or email us and we’ll help right away.',
  },

  // Footer: legal pages are in pages below.
  footer: {
    copyright: '© {year} {legalName}. All rights reserved.',
  },

  // ---------- Legal / info pages (DRAFTS: have a lawyer review) ----------
  pages: {
    disclaimer: {
      title: 'Medical & Educational Disclaimer',
      sections: [
        { h: 'Educational information only', p: ['The content on this website and in our digital products, including the meal plans, recipes, grocery lists, habit guides and trackers, is provided for general educational purposes only. It is not medical advice.'] },
        { h: 'Talk to a professional first', p: ['Talk to your doctor or a registered dietitian before changing your diet, especially if you take medication or have a medical condition, are pregnant or nursing, or have food allergies.', 'Never stop, change or skip any medication because of anything you read here. Always follow the instructions of your healthcare provider.'] },
        { h: 'No diagnosis, no personal care', p: ['We do not diagnose conditions or provide personalized medical care. Our products are not a substitute for professional medical advice, and no doctor-patient or dietitian-client relationship is created by using this site or buying our products.'] },
        { h: 'No results are promised', p: ['Everyone is different, and we make no promises about any health outcome. Our products are meant to help you organize meals, shopping and daily habits.'] },
        { h: 'Emergencies', p: ['If you think you may have a medical emergency, call your doctor or 911 right away.'] },
        { h: 'Registered Dietitian review', p: ['Our materials are reviewed by a Registered Dietitian for general educational accuracy. That review does not make the materials personalized advice for any individual.'] },
      ],
    },
    terms: {
      title: 'Terms of Use & Sale',
      draft: true,
      sections: [
        { h: '1. About these terms', p: ['These terms apply to your use of this website and your purchase of our digital products. By using the site or buying a product you agree to them. If you do not agree, please do not use the site.'] },
        { h: '2. Educational purpose', p: ['Our products are for general educational use only and are not medical advice. Please read our Disclaimer page. You are responsible for your own health decisions.'] },
        { h: '3. Digital products and license', p: ['Our products are digital files delivered by download. When you buy, you get a personal, non-transferable license to use the product for yourself and your household. You may print it for your own use. You may not resell, share publicly, copy or redistribute it.'] },
        { h: '4. Payments', p: ['Payments are handled by our payment partner, which acts as the seller of record. Prices are shown in U.S. dollars. Taxes may apply and are handled at checkout.'] },
        { h: '5. Refunds', p: ['We offer a {guaranteeDays}-day money-back guarantee. To request a refund, email {supportEmail} within {guaranteeDays} days of your purchase and include the email you used at checkout. [[Confirm and align with your merchant of record’s refund terms.]]'] },
        { h: '6. No guarantees', p: ['We do not guarantee any particular result. Use of the products is at your own risk.'] },
        { h: '7. Intellectual property', p: ['All content on this site and in our products is owned by {legalName} or its licensors and is protected by copyright.'] },
        { h: '8. Limitation of liability', p: ['To the fullest extent permitted by law, we are not liable for indirect, incidental or consequential damages arising from your use of the site or products, and our total liability is limited to the amount you paid for the product. [[Lawyer to confirm wording and governing law/jurisdiction.]]'] },
        { h: '9. Changes', p: ['We may update these terms from time to time. The date at the top shows when they were last changed.'] },
        { h: '10. Contact', p: ['Questions? Email {supportEmail}.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      draft: true,
      sections: [
        { h: 'The short version', p: ['We keep data collection to a minimum. We do not ask for any health information on this website. At checkout, only your email address is needed to deliver your purchase.'] },
        { h: 'What we collect', p: ['Checkout: your email address and payment details are collected by our payment partner, not by us. We receive your email address and order details so we can deliver your product and support you.', 'Website usage: we use the Meta (Facebook) Pixel, if enabled, to measure visits and the effectiveness of our ads. The pixel uses cookies and may collect your IP address, browser information and the pages you view, including whether you clicked to buy.', 'Contact: if you email us, we keep your message and email address so we can reply.'] },
        { h: 'What we do not collect', p: ['We do not collect health information, medical conditions, diagnoses or medication details on this website.'] },
        { h: 'How we use it', p: ['To deliver and support your purchase, to measure and improve our site and ads, to send you important messages about your order, and to send emails you have opted into. You can unsubscribe at any time from any marketing email.'] },
        { h: 'Sharing', p: ['We share data only with service providers who help us run the business (payment processor, email delivery, analytics and advertising platforms such as Meta). We do not sell your personal information for money.'] },
        { h: 'Cookies and ads', p: ['You can control cookies in your browser settings and manage ad preferences in your Facebook account settings. Some browsers and extensions block tracking pixels.'] },
        { h: 'Your choices and rights', p: ['You can ask us to access or delete the personal information we hold about you by emailing {supportEmail}. Depending on where you live (for example California), you may have additional privacy rights, and we will honor valid requests. [[Lawyer to confirm state privacy law compliance.]]'] },
        { h: 'Children', p: ['This site is not intended for children under 13, and we do not knowingly collect their information.'] },
        { h: 'Changes and contact', p: ['We may update this policy and will change the date above when we do. Questions? Email {supportEmail}.'] },
      ],
    },
    contact: {
      title: 'Contact Us',
      intro: 'Questions about your order, the download or refunds? Email us and we’ll get back to you, usually within 1 to 2 business days.',
      emailLabel: 'Email',
      hint: 'Please include the email address you used at checkout. Please don’t send us medical details. For medical questions, talk to your doctor.',
    },
  },
};
