# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fuel East is a one-page scroll website for an energy consulting company. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS, it features smooth scrolling navigation between sections on a single page.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000 or 3001 if 3000 is occupied)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### One-Page Scroll Design

This is a **single-page application** where all content is on one page (`/app/page.tsx`) with smooth scrolling navigation:

- **Sections**: `#home`, `#about`, `#services`, `#contact`
- **Navigation**: Uses anchor links with smooth scroll behavior (64px offset for sticky navbar)
- **No Multi-Page Routing**: All separate page directories (`/about`, `/services`, `/contact`) have been removed

### Smooth Scrolling Implementation

Both `Navbar.tsx` and `Footer.tsx` use a shared smooth scroll pattern:

```typescript
const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};
```

The 64px offset accounts for the sticky navbar height.

### App Router Structure

```
app/
├── page.tsx              # Single-page home (client component with all sections)
├── layout.tsx            # Root layout with Navbar/Footer
├── globals.css           # Global styles and Tailwind directives
└── api/
    └── contact/
        └── route.ts      # POST endpoint for contact form
```

### Component Architecture

```
components/
├── Navbar.tsx           # Sticky nav with logo and smooth scroll links
└── Footer.tsx           # Footer with smooth scroll links
```

**Key Points:**
- Both `Navbar` and `Footer` are client components (`"use client"`)
- `page.tsx` is also a client component (handles form state)
- `layout.tsx` is a server component (wraps everything)

### Logo Integration

- Logo files stored in `/public/` directory
- Navbar uses Next.js `Image` component: `<Image src="/fuel-east-logo.svg" ... />`
- Both SVG and JPEG formats available: `fuel-east-logo.svg`, `fuel-east-logo.jpeg`
- Company logos for "Trusted by" section: `company-1.svg` through `company-6.svg` (draft logos)

### Styling System

**Tailwind Configuration** (`tailwind.config.ts`):
- Custom primary color palette (orange theme): `primary-50` through `primary-900`
- Main brand color: `primary-600` (#ED741F)
- Content paths include: `./pages/**/*`, `./components/**/*`, `./app/**/*`

**Global Styles** (`app/globals.css`):
- Smooth scroll enabled on `html` element
- Custom `fadeIn` animation for hero section
- Custom `scroll` animation (10s duration) for horizontal scrolling logo carousel
- Scrollbar hiding utilities via `scrollbar-hide` class
- Tailwind base, components, and utilities imported

### Contact Form Flow

1. Form state managed in `page.tsx` (client component)
2. Submission POSTs to `/api/contact` with JSON payload
3. API route (`app/api/contact/route.ts`) validates and logs to console
4. Currently no email integration (placeholder for SendGrid/Mailgun/Resend)

**API Contract:**
```typescript
// Request
POST /api/contact
{ name: string, email: string, message: string }

// Response (success)
{ success: true, message: string }

// Response (error)
{ error: string }
```

### Content Sections

The single page contains these sections in order:

1. **Hero** (`#home`): Gradient background, main headline, CTA buttons
2. **Trusted by**: Animated horizontal scrolling logo carousel with fade-out edges (no ID)
   - Features 6 company logos that scroll infinitely
   - Gradient fade effects on left and right edges (128px wide)
   - Logo containers: `w-24 md:w-28` with `h-10 md:h-12` logo size
   - 10-second animation duration for smooth continuous scroll
3. **Why Choose Us**: Three feature cards (no ID)
4. **About** (`#about`): Mission, core values, leadership team (3 members)
5. **Services** (`#services`): Four consulting services with alternating layouts
6. **Contact** (`#contact`): Contact info + working form

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to project root
- App Router plugin included
- All `.ts` and `.tsx` files in project scope

## Deployment

Optimized for Vercel deployment:
- Zero-config deployment (Vercel auto-detects Next.js)
- Static generation for main page
- API routes run as serverless functions
- See `DEPLOYMENT.md` for detailed instructions

## Future Integration Points

- Email service integration needed in `/api/contact/route.ts` (currently console.log only)
- Analytics can be added via environment variables (see `.env.example`)
- No database required (static site with API endpoint)
