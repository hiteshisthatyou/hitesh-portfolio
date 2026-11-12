# HITESH 2.1 implementation plan

## Delivered in this package
- Preserved the existing portfolio sections, profile content, case studies, CV, contact links, analytics consent UI, language selector and motion toggle.
- Added a lightweight CSS 3D hero object with six faces, orbiting nodes and slow rotation. It uses CSS only, so no new runtime dependency or external 3D service is required.
- Kept the existing portrait and placed the scene as a decorative visual in the portrait column.
- Respects `prefers-reduced-motion` and the site's Motion on/off control.
- Retained the Product Lab, Decision Studio, recruiter pathways and Instagram Visual Journal from HITESH 2.0.

## Next phases
1. Validate the production build on Vercel and fix any build/runtime issues.
2. Add pointer-responsive parallax to the 3D object, with a reduced-motion fallback.
3. Add a cinematic scroll transition between the hero and story sections.
4. Expand the Product Lab into guided, interactive case-study simulations with clearly labelled synthetic data.
5. Complete full Hindi and Kannada translation of every content field and interactive label.
6. Instrument consent-based analytics for CV downloads, contact clicks, case-study interactions and Product Lab use.
7. Run responsive, accessibility, performance and SEO checks.

## Validation
The ZIP archive is integrity-checked. A full `next build` has not been run in this environment; verify through the project's Vercel deployment.
