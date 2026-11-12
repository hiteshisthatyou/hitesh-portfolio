# HITESH 2.2 implementation plan

## Delivered in this package
- Preserves existing profile content, CV, case studies, contact details, recruiter pathways, Product Lab, Decision Studio, analytics simulator, Instagram photo journal, language selector and motion control.
- Custom CSS 3D hero object and orbital visual identity.
- Pointer-responsive hero parallax: the 3D object, orbit rings and portrait respond subtly to pointer position and reset when the pointer leaves.
- Scroll-led "A Way of Thinking" story: Observe → Connect → Improve, with sticky editorial heading on desktop and stacked layout on mobile.
- Reduced-motion and motion-off handling for the new visual effects.
- No new runtime dependencies.

## Next phases
1. Verify the Vercel production build and browser runtime.
2. Add a polished 3D scene with Three.js only if performance profiling supports it.
3. Turn Product Lab challenges into deeper guided simulations with synthetic data clearly labelled.
4. Complete full Hindi and Kannada translation across every page element and data field.
5. Instrument consent-based analytics and validate accessibility/performance.

## Validation
ZIP integrity checked. A complete Next.js production build has not been run in this environment.

## Product Lab interaction fix (HITESH 2.3)
- Each of the seven challenge selections now loads its own five-stage framework.
- The supporting explanation and measurement takeaway also change with the selected challenge.
- Framework cards use the selected challenge as their React key so the content refreshes reliably.
- The exercises remain hypothetical and clearly labelled as such.

## Decision Studio score readability fix
- Separated the calculated score and its `/ 100` scale into distinct inline elements.
- Added baseline alignment, a clear horizontal gap, tabular numerals and responsive sizing.
- Prevents the score and denominator from colliding on desktop and mobile.

## Photography gallery reliability fix
- Replaced Instagram's third-party embedded post widgets with locally hosted, optimised WebP previews supplied by the user.
- Each photograph links to its corresponding original Instagram post.
- Removed the dependency on Instagram's embed.js script, avoiding blank embed frames on mobile Safari and browsers with embed restrictions.
- Added responsive gallery layout, hover/focus treatment, accessible alt text and reduced-motion support.

## HITESH 2.6: visual identity and career storytelling
- Replaced the generic HV text mark with a responsive HITESH signature monogram/wordmark.
- Made the top navigation persist as a fixed, blurred header during scroll and reserved layout space to prevent content overlap.
- Reworked the career journey into a vertical editorial timeline with connected markers, hover emphasis, staggered reveal timing and responsive mobile stacking.
- Preserved the existing career content, metrics, expandable details, photography gallery, CV and interactive tools.
- Retained the Motion on/off and reduced-motion accessibility behaviours.
