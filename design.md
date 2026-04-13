# Delta Institutions — Sales Landing v2: Design Overview

## Project Summary

A high-performance trading education sales landing page built with Next.js 16, React 19, and Tailwind CSS v4. The design is dark, premium, and animation-heavy — targeting aspiring traders with trust signals, social proof, and a clear conversion funnel.

---

## File Structure

```
/src/
├── app/
│   ├── layout.tsx              # Root layout, font config
│   ├── page.tsx                # Main page (client component, composes all sections)
│   ├── globals.css             # Design tokens, custom CSS classes, keyframes
│   └── favicon.ico
└── components/
    ├── layout/
    │   └── nav.tsx             # Sticky navigation bar
    └── page-sections/
        ├── hero.tsx            # Hero section with video + CTA
        ├── featureScetion.tsx  # 3-card features grid with GSAP
        ├── aboutus.tsx         # About Us section with profile card
        ├── pricing.tsx         # Pricing tiers with toggle
        └── testimonials.tsx    # Swiper testimonials carousel

/public/
├── logo.webp                   # Brand logo
├── aboutus.png                 # Hero video placeholder image
├── g2.webp                     # Team/testimonial image
├── g4.webp                     # About section profile image
└── video/
    └── hero.mp4                # Background/pricing section video
```

---

## Design System

### Color Palette

| Token        | Value                        | Usage                              |
|--------------|------------------------------|------------------------------------|
| Background   | `#010406`                    | Page background (deep navy-black)  |
| Foreground   | `#ffffff` / `#ededed`        | Primary text                       |
| Primary      | `#3b82f6` (blue-500)         | Accents, CTAs, glows               |
| Card BG      | `#050a15`                    | Section/card backgrounds           |
| Border       | `border-blue-500/15`         | Subtle card borders                |
| Glow         | `rgba(59,130,246,0.08–0.15)` | Radial gradient overlays           |

### Typography

| Role           | Font       | Notes                              |
|----------------|------------|------------------------------------|
| Primary (body) | DM Sans    | Weights 100–900, variable font     |
| Display        | Poppins    | Headlines in some sections         |
| Code/Mono      | Geist Mono | Utility only                       |

Headings use blue gradient text: `bg-gradient-to-b from-blue-100 to-blue-200 bg-clip-text text-transparent`.

### Spacing & Layout

- Full-viewport sections (`min-h-screen`)
- Max content width with horizontal padding (`px-4` to `px-8`)
- Mobile-first responsive grids (1 → 2 → 3 columns)

---

## Custom CSS Classes

| Class                 | Effect                                                     |
|-----------------------|------------------------------------------------------------|
| `.grid-pattern`       | Radial gradient grid lines, 40×40px cells                  |
| `.corner-glows`       | Blue radial glows at all four viewport corners             |
| `.inner-shadow-glow`  | Inset box-shadow blue glow on elements                     |
| `.card-glare`         | Top-left diagonal gradient glare on cards                  |
| `.card-grid-pattern`  | 30×30px animated grid overlay on cards                     |
| `.animate-grid-move`  | 4s linear grid shift animation (30px x/y)                  |
| `.card-rim-light`     | Inset rim shadow for depth effect                          |
| `.bottom-glare`       | Elliptical blue gradient glow at card bottom               |
| `.card-glow-bottom`   | Gradient fade at card lower edge                           |
| `.feature-card-border`| White gradient border on feature cards                     |
| `.animate-spin-slow`  | 8s infinite rotation                                       |
| `.no-scrollbar`       | Hides scrollbar (cross-browser)                            |

### CSS Keyframes

```css
@keyframes grid-move   { 0% → 100%: translateX/Y(0 → 30px), 4s linear infinite }
@keyframes spin-slow   { 0% → 360°, 8s linear infinite }
```

---

## Design Principles

1. **Dark-first:** Near-black base (`#010406`) with white text and blue accents
2. **Glassmorphism:** `backdrop-blur-md/2xl` on cards, buttons, badges
3. **Gradient text:** Blue gradient on all primary headings
4. **Ambient glow:** Radial blue gradients at corners and behind key elements
5. **Scroll-driven reveals:** GSAP ScrollTrigger on every major section
6. **Interactive depth:** 3D perspective tilt on feature cards (mouse tracking)
7. **Particle ambiance:** Floating blue circle particles in the background
8. **Grid texture:** Subtle animated grid overlays on cards and sections

---

## Section-by-Section Breakdown

### 1. Navigation (`nav.tsx`)

- Position: `absolute top-3 z-50`, full width
- Logo: `logo.webp`
- Links: Home, About, Courses, Contact
- Buttons: Login (outline glass), Register (filled blue)
- Effect: `backdrop-blur-md` frosted glass on buttons

---

### 2. Hero Section (`hero.tsx`)

**Layout:** Full-screen (`min-h-screen`), centered content

**Key elements:**
- 3 radial gradient background blobs (blue, positioned top-left, center-right, bottom-left)
- Badge: "Guinness Record Holder" — frosted glass pill with logo
- Headline: `"From Beginner To Profitable Trader"` — large, bold, gradient text
- Trending icon in blue/white rotated box (`rotate-[-10deg]`)
- Subtitle: `"Gain confidence with real time trading sessions"`
- 2 CTA buttons with flanking decorative lines
- Floating info badge: "Delta International Institute"
- Video container: `aboutus.png` thumbnail with centered play button overlay
- **Particle layer:** tsParticles — 80 blue circle particles, opacity 0.1–0.5, speed 1–3

---

### 3. Features Section (`featureScetion.tsx`)

**Layout:** 3-column card grid (stacks on mobile)

**Cards:**

| # | Title                      | Visual                                        |
|---|----------------------------|-----------------------------------------------|
| 1 | Analyze Market Trends      | Circular gauge, 96% metric, animated border   |
| 2 | Promoting Your Strategy    | 4-node network visualization, connecting dots |
| 3 | Use Content to Grow        | Progress bars (Strategy 84%, Risk 40%)        |

**Card styling:**
- `border-blue-400/15`, `backdrop-blur`, `bg-[#050a15]/60`
- Bottom glare: elliptical radial gradient
- `feature-card-border`, `card-glare`, `bottom-glare` classes

**Animations:**
- **GSAP ScrollTrigger:** triggers at `80%` from top
- Staggered entrance: logo → heading → cards (0.1s, 0.4s, 0.2s stagger)
- **Hover tilt:** `rotateX` / `rotateY` from mouse position, `perspective: 1000px`

---

### 4. About Us Section (`aboutus.tsx`)

**Layout:** Single centered card

**Content:**
- Section badge: "About Us"
- Profile image: `g4.webp` (280px width)
- Bio text about Delta International Institute
- 2 action buttons: View Profile, Schedule (with icons)
- Background glow: `blue/5` with `blur-[120px]`

**Animations:**
- GSAP timeline with ScrollTrigger
- Sequential entrance: badge → heading → footer
- Motion (Framer Motion) used for layout transitions

---

### 5. Pricing Section (`pricing.tsx`)

**Layout:** 2-column card row

**Toggle:**
- "Traders" vs "Teams" toggle switch
- Active state: blue gradient background + glow shadow
- Motion `layoutId` for smooth sliding indicator

**Left card — Pricing:**
- Price: `$297/mo` (Traders) or `$997/mo` (Teams)
- 4 feature bullet points with checkmark icons
- CTA: "Join Delta Now" button
- Background: `card-grid-pattern animate-grid-move`

**Right card — Social proof video:**
- Video: `hero.mp4` (autoplay, muted, loop)
- Testimonial quote overlay
- Author: KT Hustles — Independent Trader
- Avatar with blue glow ring

**Card styling:**
- `border border-blue-500/15`, `backdrop-blur-2xl`
- `card-rim-light`, `card-glare` effects

---

### 6. Testimonials Section (`testimonials.tsx`)

**Layout:** Full-width Swiper carousel

**Config:**
- Autoplay: 3000ms
- Slide width: 350px (mobile) → 450px (desktop)
- Side fade: black → transparent gradient masks
- Loop mode enabled

**Card structure:**
- Video thumbnail (placeholder images)
- Large quote text with decorative `"` icon
- Author: avatar + name + role
- Border: `border-white/10`, BG: `bg-[#050a15]/60`

**Featured testimonials:**
1. Jacob Levinrad — Founder, Business Accelerator
2. Luke Lintz — CEO, HighKey Agency
3. Cooper Matusiak — Founder, Sales Guys
4. Sarah Jenkins — Independent Investor

---

## Animation Architecture

| Technique              | Library         | Where Used                              |
|------------------------|-----------------|-----------------------------------------|
| Scroll-triggered reveals | GSAP ScrollTrigger | Features, About, Pricing, Testimonials |
| Staggered entrances    | GSAP timeline   | All major sections                      |
| Layout toggle          | Motion (Framer) | Pricing toggle indicator                |
| Background particles   | tsParticles     | Hero section                            |
| CSS keyframe loops     | Native CSS      | Grid movement, spin-slow                |
| Hover 3D tilt          | GSAP + JS       | Feature cards                           |
| Auto carousel          | Swiper          | Testimonials                            |

---

## Dependencies

```json
{
  "next": "16.2.3",
  "react": "19.2.4",
  "gsap": "^3.14.2",
  "@gsap/react": "^2.1.2",
  "motion": "^12.38.0",
  "@tsparticles/react": "^3.0.0",
  "@tsparticles/slim": "^3.9.1",
  "swiper": "^12.1.3",
  "lucide-react": "^1.8.0",
  "react-icons": "^5.6.0",
  "tailwindcss": "^4"
}
```

---

## Conversion Flow

```
Hero (awareness + hook)
  ↓
Features (credibility via product capabilities)
  ↓
About Us (trust via founder story)
  ↓
Pricing (decision point with toggle)
  ↓
Testimonials (social proof, close)
```

Each section uses scroll-triggered animation to guide the user's attention progressively downward, reducing drop-off and reinforcing the CTA at every stage.
