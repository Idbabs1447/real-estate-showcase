# Azure Estates — Lagos property agency demo website

A polished, fully responsive marketing site for a **fictional** boutique Lagos real
estate agency. Built with React 19, Vite, TypeScript and Tailwind CSS v4. No
routing, animation or UI libraries — everything is hand-rolled so it stays easy to
read and easy to hand over.

---

## ⚠️ Demo disclosure

- **Azure Estates does not exist.** It is an invented agency used to demonstrate
  design and front-end craft.
- **Every listing, price, address, reference number, service charge, availability
  status and statistic is fictional sample data.**
- **No testimonials, ratings or attributed client quotes appear anywhere** on the
  site. Inventing social proof would be misleading, so those sections were left
  out by design.
- **No backend is connected.** Forms validate and confirm in the UI, but nothing
  is sent, stored or delivered. Every form states this, as does the confirmation
  screen.
- **All photography is legitimately licensed Pexels stock imagery**, served from
  the Pexels CDN. It does not depict any listed property, staff member or office.
  Photographer credits are in the footer and on the `/legal` page.

---

## What's included

| Route | Page |
| --- | --- |
| `#/` | Homepage — hero with live quick-search, featured listings, about, services, process, districts, inspection form, FAQ |
| `#/properties` | Listings with a working filter interface (search, intent, type, district, bedrooms, budget, sort) |
| `#/property/:id` | Property detail — gallery + lightbox, key facts, description, features, tenure panel, advisor card, inspection form, comparable listings |
| `#/about` | About the practice, values, coverage, team |
| `#/services` | Six services with pricing, fee transparency, process, FAQ |
| `#/contact` | Contact cards, enquiry form, office hours, shortcuts, FAQ |
| `#/legal` | Full demo disclosure |

Navigation is hash-based (`src/lib/router.tsx`) so the built single file works
from any static host, including `file://`.

Deep links support query params, e.g. `#/properties?intent=rent&district=Ikate`,
and in-page anchors, e.g. `#/services#letting`.

---

## Re-branding for a real client

Everything a client would want to change lives in **four files**:

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Brand name, wordmark, tagline, contact details, WhatsApp number, socials, navigation, hero copy, stats, about copy, values, services + pricing, FAQs, process steps, districts, footer |
| `src/data/properties.ts` | The property list, property types, and the advisor/team profiles |
| `src/data/images.ts` | Image URL helpers + the named image map + photographer credit |
| `src/index.css` | Colour tokens (navy / gold / cream), fonts, shadows, animations |

**Contact details and WhatsApp number** are read from `site.contact` everywhere,
so changing one string updates the navbar, hero, FAB, footer, contact page,
property pages and every pre-filled WhatsApp message.

**Swapping in real photography** — replace the `px(id, w, h)` helper in
`src/data/images.ts` with local imports (e.g. `import hero from "../assets/hero.jpg"`),
then update the `IMAGES` map and each property's `images` array. Update
`PHOTO_CREDIT` accordingly.

**Typography** — fonts are loaded in `index.html`; change the Google Fonts link
and the `--font-display` / `--font-sans` tokens in `src/index.css`.

**Palette** — edit the `--color-navy-*`, `--color-gold-*` and `--color-cream-*`
scales in `src/index.css`. The utilities (`bg-navy-900`, `text-gold-500`, …) are
generated from those tokens.

### Connecting a backend

`src/components/InquiryForm.tsx` is the only place submissions are handled. The
`onSubmit` handler currently validates and flips to a confirmation state. Replace
the marked block with a `fetch()` to your endpoint (Formspree, a CRM webhook, a
Laravel route, etc.) and update the demo notice copy at the top of the form.

---

## Project structure

```
src/
├── App.tsx                  # shell: router, header offset, footer, WhatsApp FAB
├── index.css                # design tokens + base styles + keyframes
├── data/
│   ├── site.ts              # ← brand / copy config
│   ├── properties.ts        # ← listings + team
│   └── images.ts            # ← photography
├── lib/
│   ├── router.tsx           # tiny hash router, <Link>, useIsActive
│   └── format.ts            # naira formatting, dates, wa.me / tel: builders
├── components/
│   ├── ui.tsx               # Container, Section, Button, SectionHeading, Reveal, …
│   ├── Icons.tsx            # inline SVG icon set (no icon dependency)
│   ├── Navbar.tsx           # fixed header, utility strip, mobile drawer
│   ├── Footer.tsx
│   ├── PageHero.tsx         # interior page header band
│   ├── CtaBand.tsx          # reusable closing CTA with WhatsApp
│   ├── PropertyCard.tsx     # card + shared price / spec rows
│   ├── Filters.tsx          # filter state hook + panel + active chips
│   ├── InquiryForm.tsx      # validated demo form with explicit demo notice
│   ├── Faq.tsx              # accessible accordion
│   └── WhatsAppFab.tsx      # floating WhatsApp action
└── pages/
    ├── Home.tsx
    ├── Listings.tsx
    ├── PropertyDetail.tsx
    ├── About.tsx
    ├── Services.tsx
    ├── Contact.tsx
    └── Legal.tsx
```

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/index.html (single file)
npm run preview  # preview the production build
```

## Accessibility & responsiveness notes

- Mobile-first; layouts break at `sm` (640), `lg` (1024); fluid type from
  2.8rem → 4.9rem on the hero.
- Fixed header height is published as a `--header-h` custom property via
  `ResizeObserver`, so content always clears it and heroes can run edge to edge.
- `prefers-reduced-motion` disables all transitions and animations.
- Visible focus rings, `aria-*` on accordion buttons, segmented controls,
  icon-only buttons and pressed states.
- Gallery lightbox supports arrow keys and Escape; body scroll is locked while
  open.
