# Job photography — Dakota Valley Junk Removal

The website now uses authentic job photographs supplied by the business. The homepage shows six selected photos, city pages show three, and service pages use a relevant photo where the collection contains one. The photographs are reused across service-area pages; their placement does not establish the city where a photograph was taken.

The previous illustrated before/after sliders are no longer shown on the homepage. None of the current uploads have been confirmed as a matched before/after pair.

## Useful photos to add next

1. Clear views of furniture, mattresses and appliances safely staged at the curb, driveway or accessible garage.
2. The crew loading approved staged items, with permission from anyone pictured.
3. The branded truck or trailer at a job, with the main subject clearly visible.
4. Matched before/after views of the same staged pickup area, taken from the same position and confirmed as the same job.
5. Approved outdoor specialty work, such as a hot-tub or shed project, with its separately quoted scope described accurately.

Choose photos that show the business's current service scope. Avoid customer documents, personal details and identifiable addresses in published images. Do not restore old screenshots of booking or customer-management systems.

## Add a photograph

1. Add the owner-approved photo to `public/photos/` with a descriptive filename. Keep the source image available and use its actual width and height in the registry.
2. Add its `src`, `width`, `height` and factual `desc` to `src/data/photos.js`. Keep homepage selections and service matches consistent with what is visible.
3. Describe the objects, setting and action in the photo. Do not append a city, capture date, service claim or before/after label unless that detail has been verified.
4. Run `npm run build && npm test`. The image sitemap regenerates and checks that its photos and captions match the displayed pages.

For Google Business Profile, use these same authentic source photos with accurate context. Publishing a photo on this website does not also upload it to the Business Profile.
