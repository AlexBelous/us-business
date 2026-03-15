# DM TRADE SOLUTIONS LLC — US Business Project

## Company Details
- **Legal Name:** DM TRADE SOLUTIONS LLC
- **Type:** Single-Member LLC
- **State:** Delaware
- **Address:** 8 The Green, Ste D, Dover, DE 19901
- **EIN:** 41-3226623
- **Phone:** +1 (347) 932-7484
- **Email:** info@dmtrade.solutions
- **Domain:** dmtrade.solutions
- **Bank:** Bank of America (Business Adv Fundamentals)
- **Payment Method:** Zelle
- **Active Since:** February 15, 2026

## Services Offered
1. **Equipment Sales** — new & pre-owned analytical instruments
2. **Repair & Maintenance** — on-site and bench/depot repair
3. **Preventive Maintenance (PM)** — scheduled contracts, single visits to annual programs
4. **Calibration & Commissioning** — IQ/OQ/PQ qualification, calibration, operator training
5. **Refurbished Instruments** — professionally reconditioned to OEM specs
6. **Spare Parts & Consumables** — OEM and compatible, global sourcing
7. **Consignment & Trade-In** — sell/trade surplus lab instruments
8. **Remote Technical Support** — diagnostics, troubleshooting, software support
9. **Lab Relocation** — deinstallation, packing, transport, reinstallation

## Equipment Coverage
- HPLC / UHPLC
- Gas Chromatography (GC)
- LC/MS & GC/MS (mass spectrometry)
- UV/Vis Spectrophotometers
- FTIR Spectrometers
- Autosamplers & Headspace Analyzers
- Dissolution & Wet Chemistry
- Data Systems & Software (Chemstation, OpenLab, Empower, Chromeleon)

## Brands Serviced
Agilent, Waters, Shimadzu, Thermo Fisher, PerkinElmer, Bruker, Dionex

## Brand Identity

### Logo
- **Concept:** Navy hexagon with two-peak HPLC chromatogram (upper half) + "DM" letters (lower half). "TRADE SOLUTIONS" text below hexagon.
- **Colors:**
  - Navy: #0B2545
  - Accent Blue: #3E92CC
  - Light: #D6E4F0
  - Pale BG: #F0F5FA
- **Variants:** Vertical (stacked), Horizontal (inline), Icon-only, Dark background
- **Files:** `assets/logo.png` (400x460, transparent), `assets/logo_small.png` (160x184, for docx)
- **SVG inline:** Used in website nav and hero section. The SVG viewBox is `0 0 140 162`. Chromatogram baseline at y=77, DM text at y=105.

### Typography
- **Website:** DM Sans (body), Georgia (logo text, stat numbers)
- **Invoice:** Calibri

## Project Structure
```
us-business/
├── CLAUDE.md                          ← this file
├── assets/
│   ├── logo.png                       ← full-size logo (transparent bg)
│   └── logo_small.png                 ← small logo for invoice
├── website/
│   ├── index.html                     ← main site (dmtrade.solutions)
│   └── terms.html                     ← Terms of Sale page
├── templates/
│   ├── invoice_template.docx          ← Word invoice with logo
│   ├── create_invoice_v3.js           ← Node.js script to regenerate invoice
│   └── create_logo.py                 ← Python/Pillow script to regenerate logo PNG
├── sales_log/
│   ├── sales_log_2026.xlsx            ← Excel sales tracker
│   └── create_sales_log.py            ← Python script to regenerate sales log
└── docs/
    └── (reference materials)
```

## Completed Tasks
- [x] Invoice template (docx with logo, line items, payment info, delivery method)
- [x] Sales Log (xlsx with formulas, dropdowns, summary sheet)
- [x] Website index.html (hero, 9 service cards, equipment grid, brands, bench repair callout, about, contact form, footer with newsletter)
- [x] Website terms.html (13 sections including consignment, lab relocation)
- [x] Logo PNG (Pillow-generated, two-peak chromatogram + DM in hexagon)
- [x] Logo SVG inline in website (nav + hero, both light & dark variants)

## Pending / Future Tasks
- [ ] Deploy website to dmtrade.solutions hosting
- [ ] Replace stock Unsplash photos with own product/lab photos (especially Refurbished & Spare Parts cards)
- [ ] Set up email info@dmtrade.solutions
- [ ] Create actual invoices from Zelle transaction history
- [ ] Fill sales log with real transaction data
- [ ] Add Privacy Policy page
- [ ] Consider adding a blog/news section
- [ ] SEO optimization (meta descriptions, Open Graph tags)
- [ ] Google Business Profile setup

## Technical Notes

### Invoice Generation (Node.js)
```bash
cd templates && node create_invoice_v3.js
# Requires: npm install -g docx
# Reads logo_small.png from same directory
# Outputs: invoice_template.docx
```

### Logo Generation (Python)
```bash
cd templates && python create_logo.py
# Requires: Pillow (pip install Pillow)
# Outputs: logo.png (400x460) + logo_small.png (160x184)
# Key params: base_y = cy_hex + 5 (chromatogram baseline position)
```

### Sales Log Generation (Python)
```bash
cd sales_log && python create_sales_log.py
# Requires: openpyxl (pip install openpyxl)
# Outputs: sales_log_2026.xlsx
```

### Website
- Static HTML, no build step needed
- Images from Unsplash CDN (free commercial license)
- Fonts from Google Fonts CDN
- Contact form uses mailto: fallback (no backend)
- Terms of Sale on separate terms.html page
- Logo is inline SVG (not image file) for crisp rendering
