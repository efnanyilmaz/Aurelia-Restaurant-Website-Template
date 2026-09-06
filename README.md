# 🍽️ Aurelia — Restaurant Website + Cart

**🔗 [Live Demo](https://aurelia-restaurant-website-nine.vercel.app)**

**Framework-free (Vanilla HTML/CSS/JS)** website starter kit for restaurants and small businesses.

**No backend, no database, no third-party services, no build step.** Every page is static HTML/CSS/JS — open any file directly in a browser and it works immediately. Content (menu items, gallery photos) lives directly in the page files. Every guest-facing action — ordering, reservations, general enquiries — is handled through **WhatsApp**, so there's nothing to sign up for and nothing to configure before the site is fully functional.

Ships with 17 real, professional-quality interior and food photos already in place (`assets/img/`) — the site looks complete out of the box. Swap them for your own photos whenever you're ready (the setup wizard's visual editor makes this a one-click job per photo — see Quick Start below).

---

## 📦 What's Included

- **9 pages:** Home, About, Menu, Gallery, Reservation, Contact, FAQ, Privacy Policy, and a custom 404 page
- **No-code setup wizard with a live visual editor** (`setup-wizard.html`) — rebrand the site, pick a color palette and font pairing, rewrite the menu, then click directly on the real page preview to edit text in place or swap in your own photos, Wix/Squarespace-style. No text editor required. See Quick Start below.
- **Editable announcement bar** — a slim, dismissible bar above the header on every page (e.g. "Tonight: Live Jazz from 8 PM"). Edit the message directly in the HTML of each page, or delete the block to turn it off; guests who dismiss it won't see it again for that browser session.
- **No framework required** — no build tools, no npm, no webpack. Plain HTML/CSS/JS that can be uploaded directly to any static host (Hostinger, Netlify, Vercel, GitHub Pages, cPanel).
- **Static menu & gallery** — dishes and photos are plain arrays/HTML blocks directly in `menu.html` and `gallery.html`. Edit them like a normal web page; there's no database to keep in sync.
- **Bilingual out of the box (Turkish / English)** — a TR/EN switcher in the navbar (and mobile menu) swaps every page instantly via a single `data-i18n` dictionary in `assets/js/app.js`, including menu categories, dish descriptions, and all dynamic form/cart/toast text. Turkish is the default language; add a third language by duplicating the dictionary object.
- **Everything routes through WhatsApp:**
  - **Shopping cart** — guests add dishes from the Menu page, adjust quantities, and check out by sending a pre-filled order message straight to your WhatsApp (cart persists in the browser via `localStorage`)
  - **Table reservations** (`reservation.html`) — the form builds a pre-filled WhatsApp message with the date, time, party size, and notes
  - **Contact form** — general enquiries open a pre-filled WhatsApp message the same way
  - **Floating WhatsApp button** on every page for direct chat
- **SEO basics in place** — Schema.org JSON-LD for the restaurant *and* the full menu (so dishes can appear in rich search results), Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`
- **Print-friendly menu** — visitors can print a clean, chrome-free version of the menu straight from their browser
- **Lightweight privacy notice** — a one-time banner explaining the site's local-storage use, with a link to the Privacy Policy
- **Custom 404 page** that matches the site's design instead of a bare browser error
- **Responsive design** — mobile, tablet, and desktop, with `prefers-reduced-motion` support, and a subtle page-load reveal animation

---

## 🚀 Quick Start

### 0) No-code setup (recommended)

Open **`setup-wizard.html`** in any browser, right from inside this folder (just double-click it — no install, no server). Keep it in this folder — it loads your actual site files to build its previews. It has four tabs:

- **Restaurant Info** — name, WhatsApp number, contact details, Instagram handle, hours
- **Brand** — pick one of 6 color palettes and one of 6 font pairings; recolors and refonts every page at once
- **Menu** — edit, add, or remove dishes by category
- **Edit Text & Photos** — a live preview of your actual site. Click any text to edit it right there, click any photo to upload a replacement. Switch between pages (Home, About, Menu, Gallery, Contact, Reservation, FAQ) using the tabs above the preview.

Click **Generate My Website Files** and it downloads a ZIP with everything already filled in. Unzip it into this folder (overwrite when asked) and you're done — no further setup needed.

Legal text on the Privacy Policy page isn't included — edit `privacy-policy.html` directly for that. Everything else happens entirely in your browser — nothing you type or upload is ever sent anywhere.

Prefer to edit by hand instead? Skip to step 1.

### 1) Run Locally

No setup needed — just open `index.html` in your browser.

```bash
# optional, only needed if you add video
python -m http.server 8000
# or
npx serve .
```

### 2) Set Your WhatsApp Number

Open **`assets/js/site-config.js`** — this is the only file you need to edit. Change the `whatsapp` value to your restaurant's number, and every WhatsApp link on the site (cart checkout, contact form, reservation form, all floating buttons) updates automatically. No need to hunt through individual pages.

```js
window.SITE_CONFIG = {
  whatsapp: "15551234567"
};
```

Use the international format with no `+`, spaces, or leading zeros (e.g. a US number `+1 555 123 4567` becomes `15551234567`).

### 3) Deploy

Upload the `assets/`, `*.html`, `sitemap.xml`, and `robots.txt` files directly to your host (cPanel, Netlify, Vercel, GitHub Pages). No build step required.

---

## 🎨 Customization

- **Colors & typography:** Easiest way is the setup wizard's **Brand** tab (6 palettes, 6 font pairings, one click each). To customize by hand instead, all colors, fonts, and spacing live as CSS custom properties at the top of `assets/css/style.css`, under `:root`. Change one value and it cascades across the whole site.
- **Brand name / copy:** Every element with a `data-i18n` attribute pulls its text from a single dictionary in `assets/js/app.js`.
- **Announcement bar:** Edit the `<p>` text inside the `.announce-bar` block near the top of each page's `<body>`. To remove it site-wide, delete that block from every page (or just leave it — guests who dismiss it won't see it again that session).
- **Images & video:** Swap the placeholder images in `assets/img/` for your own photos (keep the same filenames and no code changes are needed). To add video, follow the instructions in `assets/video/README.txt`.
- **Menu items:** Open `menu.html` and edit the `MENU_ITEMS` array directly (near the bottom of the file, in the `<script>` tag). Each item needs `cat` (category key — see `CAT_LABELS`/`CAT_LABELS_TR` just above it), `name`, `price`, and `desc` (plus an optional `descTr`/`nameTr` for a Turkish-specific translation). Mark vegetarian dishes by appending ` (V)` to the description.
- **Gallery photos:** Open `gallery.html` and edit the `<img>` tags inside the `#galleryGrid` block directly — update the `src`, `data-cat` (`mekan`/`kahve`/`atmosfer` — Venue/Food/Atmosphere), and `alt` text, or copy/paste a block to add more photos.
- **Privacy Policy:** `privacy-policy.html` ships as a general-purpose template. Update it with your business's real details and adapt it to the data protection laws that apply to you (GDPR, CCPA, or your local equivalent) before going live — consider having it reviewed by a legal professional.

---

## 🗂 Folder Structure

```
├── setup-wizard.html      # No-code setup tool — open this first
├── index.html          # Home page
├── about.html           # About page
├── menu.html             # Menu — edit MENU_ITEMS directly in this file
├── gallery.html          # Gallery — edit the image blocks directly in this file
├── reservation.html      # Table reservation form (opens WhatsApp)
├── contact.html          # Contact form (opens WhatsApp)
├── faq.html               # Frequently asked questions
├── 404.html               # Custom not-found page
├── privacy-policy.html
├── sitemap.xml / robots.txt
└── assets/
    ├── css/style.css
    ├── js/site-config.js (edit your WhatsApp number here), app.js, cart.js
    ├── img/               # Placeholder images (replace with your own)
    └── video/              # Empty — see README.txt
```

---

## ⚠️ Requirements & Notes

- Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions)
- No account, database, or paid service required to run the site as-is
- Guests need WhatsApp installed (or WhatsApp Web) to complete an order, reservation, or contact message — this is worth mentioning near your contact info if you expect guests who might not use WhatsApp

## 📄 License

This product is licensed under the terms in the included `LICENSE.txt`. In short: use it in as many of your own or client projects as your license allows; you may not resell or redistribute the source code itself as a competing template.
