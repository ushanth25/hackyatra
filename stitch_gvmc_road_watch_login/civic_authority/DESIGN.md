---
name: Civic Authority
colors:
  surface: '#f6f9ff'
  surface-dim: '#d6dae0'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4fa'
  surface-container: '#eaeef4'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#dfe3e9'
  on-surface: '#171c20'
  on-surface-variant: '#43474e'
  inverse-surface: '#2c3136'
  inverse-on-surface: '#edf1f7'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f86'
  primary: '#032448'
  on-primary: '#ffffff'
  primary-container: '#1f3a5f'
  on-primary-container: '#8ba4cf'
  inverse-primary: '#aec8f4'
  secondary: '#934b00'
  on-secondary: '#ffffff'
  secondary-container: '#fc943b'
  on-secondary-container: '#683300'
  tertiary: '#222425'
  on-tertiary: '#ffffff'
  tertiary-container: '#373a3b'
  on-tertiary-container: '#a2a4a5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#aec8f4'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#2d476d'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#ffb782'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#703800'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f6f9ff'
  on-background: '#171c20'
  surface-variant: '#dfe3e9'
typography:
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  margin-mobile: 16px
  margin-desktop: 32px
  gutter: 16px
  input-padding: 12px 16px
---

## Brand & Style

The design system is engineered for public trust, utility, and institutional authority. It targets a broad citizenry, necessitating a high degree of accessibility, clarity, and seriousness. The aesthetic is strictly **Flat Design**, eschewing all gradients, shadows, and decorative illustrations in favor of a clean, structured, and legible interface.

The emotional response should be one of reliability and officialdom. By using a disciplined layout and a restricted color palette, the UI communicates that it is a functional tool of the government, focused entirely on service and data integrity rather than entertainment or marketing.

## Colors

This color palette is anchored in tradition and visibility.
- **Primary (#1F3A5F):** A deep, authoritative blue used for headers, navigation backgrounds, and primary headings to establish institutional presence.
- **Accent (#E8842C):** A high-visibility saffron used exclusively for high-priority calls to action (CTAs) and critical status indicators.
- **Background (#FFFFFF):** Pure white is the mandatory canvas for all content areas to ensure maximum text contrast and a clean "paper-like" feel.
- **Neutral (#D1D5DB / #F8F9FA):** Light grays are used for structural borders and subtle background differentiation for sections.

## Typography

The typography utilizes **Noto Sans** across all levels to ensure global legibility and an institutional tone. 
- **Headlines:** Use Bold (700) or SemiBold (600) weights in the primary blue to establish hierarchy.
- **Body:** Standard reading text should use the Regular (400) weight for optimal clarity. 
- **Labels:** Small labels and captions use Medium (500) or SemiBold (600) weights to remain legible even at reduced scales. 
- **Responsive Scaling:** Large headlines must scale down on mobile devices to prevent excessive line breaks, ensuring the interface remains usable on smaller handheld screens.

## Layout & Spacing

This design system follows a **Fluid Grid** model with a mobile-first philosophy. 
- **Grid:** A 12-column grid is used for desktop layouts, collapsing to a single column for mobile. 
- **Margins:** 16px on mobile devices, increasing to 32px or more on desktop to maintain white space.
- **Spacing Rhythm:** Based on a 4px baseline. Components should utilize generous padding (minimum 12px for inputs) to ensure touch-targets are accessible and the layout feels uncrowded.
- **Alignment:** All content is left-aligned to mimic official documentation and improve scanning speed for information-dense pages.

## Elevation & Depth

The design system utilizes **Low-contrast outlines** and tonal layering rather than shadows. 
- **Flat Surface:** There is no Z-axis depth created by shadows. 
- **Borders:** Depth is conveyed through 1px solid borders in Neutral (#D1D5DB).
- **Separation:** Use light gray background fills (#F8F9FA) to distinguish between different sections or containers on a page.
- **Focus:** Active states for interactive elements use a thicker 2px border or a color shift rather than an elevation change.

## Shapes

The shape language is conservative and **Soft**. 
- **Standard Radius:** 0.25rem (4px) is the default for buttons, input fields, and containers. This provides a subtle hint of modern UI without appearing overly "friendly" or casual.
- **Large Radius:** 0.5rem (8px) may be used for large modal containers or cards.
- **Sharp Corners:** Strictly prohibited except for the main browser-edge navigation bars.

## Components

### Buttons
- **Primary Action:** Solid Saffron (#E8842C) background with white text. No shadows. SemiBold weight.
- **Secondary Action:** Transparent background with 1px Deep Blue (#1F3A5F) border and text.
- **States:** Hover states should be a slightly darker shade of the base color; "Active" or "Pressed" states use a 2px inset border.

### Input Fields
- **Style:** 1px solid Neutral (#D1D5DB) border. 
- **Padding:** 12px vertical, 16px horizontal.
- **Focus State:** 2px solid Deep Blue (#1F3A5F) border.
- **Labels:** Always positioned above the field in Label-MD style.

### Cards & Lists
- **Cards:** White background with a 1px Neutral border. No shadow.
- **Lists:** Clean rows separated by 1px horizontal dividers. 16px vertical padding per row.

### Feedback Indicators
- **Success:** Deep green (#2D6A4F) text/border.
- **Error:** Strong red (#C92A2A) text/border.
- **Warning:** Saffron (#E8842C) text/border.

### Navigation
- **Header:** Solid Deep Blue (#1F3A5F) background. All text and iconography must be white. 
- **Footer:** Light Gray (#F8F9FA) background with Deep Blue text, containing legal links and organizational identity.