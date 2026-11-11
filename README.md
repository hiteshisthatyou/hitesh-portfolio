# Hitesh Vishwakarma | Product, Business & Technology

A Next.js portfolio starter with a Swiss editorial visual system, responsive layouts, interactive case studies, product challenge lab, sample analytics simulator, multilingual navigation, recruiter overview and privacy-first analytics consent placeholder.

## Run locally

1. Install Node.js 20 or later.
2. Extract this project folder.
3. Open a terminal in the project folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open `http://localhost:3000`.
7. Before deployment, run `npm run build`.

## Deploy to GitHub and Vercel

1. Create or open your GitHub repository.
2. Upload the contents of this folder, not the ZIP file itself.
3. Commit the files to the main branch.
4. Import the repository into Vercel, or connect it to your existing Vercel project.
5. Vercel detects Next.js automatically. Use the default build command `npm run build` and output settings.
6. Add `hiteshv.in` and `www.hiteshv.in` in Vercel Domains. Follow the exact DNS records Vercel displays.

## Update content without editing components

Most professional content is in `content/profile.json`.

- Career: edit the `career` array.
- Case studies: edit the `projects` array.
- Metrics: edit the `metrics` array. Keep attribution and scope accurate.
- Skills: edit the `skills` object.
- Education and certifications: edit the matching keys.
- Contact and role preferences: edit the profile fields.

Keep valid JSON syntax: use double quotes, commas between items, and no trailing commas.

## Replace your portrait

Replace `public/images/portrait-placeholder.jpg` with your new professional portrait, keeping the same filename. The current image is a temporary placeholder and must be replaced before public launch.

## Add Visual Journal photographs

Place your own optimised JPG/WebP images in `public/images/`. The current gallery blocks are placeholders. Connect your selected image paths in `components/Portfolio.tsx` when adding the final gallery images. Recommended: 1600–2200px wide, compressed WebP, descriptive filenames and meaningful alt text.

## Add the 30-second introduction video

Create `public/video/intro.mp4`, then replace the video placeholder in `components/Portfolio.tsx` with a native `<video controls playsInline preload="none">` element. Add captions using a WebVTT file and a `<track kind="captions">` element. Do not autoplay.

## Languages

Language selection UI and translated core navigation/story copy are included in `components/Portfolio.tsx`. Extend the `copy` dictionaries there to translate every case study, dashboard label, skills group and supporting paragraph before advertising full multilingual coverage. English remains the default.

## Analytics and privacy

The package includes a consent UI state placeholder, not a live GA4 or Vercel Analytics integration. Before enabling analytics, configure GA4 and Vercel Analytics with consent gating, document the data collected in a privacy notice, and ensure analytics scripts do not load before consent where consent is required. Store your GA4 Measurement ID as `NEXT_PUBLIC_GA_ID` in Vercel Environment Variables. Never commit secrets.

## Accuracy and content notes

- Metrics are presented with scope notes. The ~60% manual-effort reduction was collective across three workflows, not inventory alone.
- Platform transaction volume growth from approx. ₹50 Cr to ₹800+ Cr monthly is platform context, not personal attribution.
- KYC improvement is described as workflow improvement supported by Hitesh, not sole authorship of the automation.
- Product challenge exercises are hypothetical and clearly labelled.
- Analytics funnel data is synthetic and illustrative.
- No testimonials are included.
- Education and certifications are shown without unverified issuers, years or certificate links.
- The portrait, Visual Journal photos and introductory video are placeholders awaiting Hitesh's own assets.

## Accessibility and motion

The site includes semantic landmarks, labelled controls, keyboard-operable native buttons, visible focus inherited from browser defaults, a motion toggle, and `prefers-reduced-motion` support. Review with keyboard and screen reader before launch. Target WCAG 2.2 AA; automated checks alone do not establish compliance.

## Before public launch checklist

- [ ] Replace portrait placeholder with new professional portrait.
- [ ] Add curated landscape/travel photographs.
- [ ] Record and add the 30-second intro video with captions.
- [ ] Verify all role dates, metrics, contact details and certifications.
- [ ] Complete Hindi and Kannada translations for all content.
- [ ] Configure consent-gated analytics and privacy notice if required.
- [ ] Test all links, mobile layouts, keyboard navigation and screen readers.
- [ ] Run `npm run build` and resolve any errors.
- [ ] Check Vercel domain and DNS status.


## Update notes (November 2026)
- The intro-film placeholder has been removed until the final recording is supplied.
- The Visual Journal section and navigation link have been hidden until personal photographs are supplied.
- Kannada translations have been expanded across the main page labels and explanatory copy. Product/company names, technical terms, and some source profile fields remain in their original form where preserving exact terminology is useful. Review the Kannada version before publishing.
