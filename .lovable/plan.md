# High-Conversion Donation Experience

A Scandinavian-clean, mobile-first donation site inspired by geeffektivt.se — designed so a visitor can feel impact in 5 seconds and donate in under 60. No new assets needed; we'll reuse the existing logo and imagery and let interaction do the heavy lifting.

## Site Structure (separate routes for SEO + shareability)

```
/                  Home — hero, live impact, donation widget, stories, trust
/impact            Deep-dive: where money goes, calculator, charts
/charities         Evidence-based charity selection + evaluator logos
/stories           Beneficiary micro-journeys (before → intervention → after)
/about             Mission, team, transparency
/faq               Why this charity? How do we know it works?
/thank-you         Post-donate moment: personalized impact + share card
```

Each route gets its own `head()` metadata for social sharing.

## 1. Hero — The 5-Second Wow

- Existing hero image as darkened background with subtle Ken Burns zoom
- Headline: **"You can save a life today. For less than a dinner."**
- Subheadline with concrete impact (e.g. "€25 buys 2 mosquito nets — protects 4 people")
- **Live animated counter**: lives protected, donors this month, nets funded (count-up on scroll)
- **3-button instant-choice donation row** with live impact labels:
  - €10 → "Protect 2 people"
  - €50 → "Shield a family"
  - €100 → "Save a life" *(highlighted / anchored)*
- Secondary CTA: "See how your money helps" → smooth-scrolls to impact section

## 2. Sticky Impact Mini-Bar (follows the user)

A slim bar that appears after scrolling past the hero:
- Current selected amount + live impact translation
- Slider to adjust amount → impact text updates in real time
- "Continue" button → opens donation drawer

## 3. Donation Flow (frictionless, 2 steps max)

**Step 1 — Choose:**
- Preset tiers (€10 / €25 / €50 / €100 / custom)
- Monthly vs one-time toggle (monthly default, with "12× more impact over a year" nudge)
- Live impact preview updating as amount changes
- Identity CTA: **"Protect a family →"** (not "Donate")

**Step 2 — Pay:**
- Apple Pay / Google Pay style buttons up top
- Card fallback with minimal fields (email + card only)
- "Moment of commitment" interstitial: 1.5s animated impact reveal before final confirm — *"You're about to protect 4 people"*

**Post-donate (`/thank-you`):**
- Personalized impact summary
- Shareable card: "I just helped protect 4 people 🌍"
- Gamified milestone: "Level unlocked: Life-Saver"
- Repeat-donate quick button

## 4. Living Impact Sections

- **Interactive calculator** (`/impact`): drag a slider, watch lives/nets/treatments update with animated number transitions and a small illustration scaling up
- **Where your money goes**: animated horizontal bars (90% programs / 10% ops) that fill on scroll
- **Cost-effectiveness chart**: simple bar chart comparing intervention costs
- **"What if no one donated?" toggle**: contrast simulation showing the same scene with vs without intervention

## 5. Storytelling — Micro-Journeys

Each story is a 3-card horizontal scroll using existing imagery:
1. **Before** (image + 1 line of context)
2. **Intervention** (what was done)
3. **After** (measurable outcome)

Subtle scale + fade as each card enters viewport.

## 6. Social Proof — Motion-Based

- Live-feed ticker: *"+1 donation • Maria from Stockholm just helped 3 people"* (placeholder rotating data)
- Donor count + monthly goal progress bar (urgency)
- Testimonial cards with hover lift

## 7. Trust Layer

- Row of evaluator logos (GiveWell, etc. — placeholder slots reusing brand)
- Plain-language explanation of evidence-based selection
- Link to transparency report
- FAQ accordion

## 8. Micro-Interactions Throughout

- Images: hover → gentle zoom + impact text overlay fades in
- Numbers: count-up animation on scroll into view
- Buttons: subtle scale + shadow on hover, satisfying click feedback
- Progress bars: animate fill on enter
- Smooth scroll, reduced-motion respected

## Design System

- **Palette**: warm white base, soft neutral grays, deep ink text, single strong accent (warm coral/amber) reserved for CTAs only
- **Typography**: clean modern sans (Inter for body, larger display weight for headlines)
- **Components**: reuse shadcn/ui — Card, Button, Slider, Progress, Tabs, Accordion, Dialog (for donate drawer), Sheet (mobile)
- **Tone**: hopeful, intelligent, responsibility-driven — never guilt

## Technical Notes

- TanStack Start routes per page; each with own `head()` meta + og:image from existing hero
- Donation flow is a Dialog/Sheet component, accessible from anywhere via the sticky bar
- All counters/feeds use placeholder data with realistic-feeling values
- No backend/payment processor wired yet — checkout is UI-only with a mocked success → `/thank-you` (real Stripe/Apple Pay can be added later)
- Framer-motion-style animations via Tailwind `animate-*` utilities + tw-animate-css already installed
- Fully responsive, mobile-first; sticky bar collapses to a single CTA on small screens

## Out of Scope (for now)

- Real payment processing (Stripe/Apple Pay integration)
- Auth / donor accounts / recurring billing management
- CMS for stories — content is hard-coded with placeholder copy you can edit
