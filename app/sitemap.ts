import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
 const routes=['','/about','/experience','/selected-work','/product-lab','/decision-studio','/visual-journal','/contact'];
 return routes.map(route=>({url:`https://hiteshv.in${route}`,lastModified:new Date('2026-11-24'),changeFrequency:route===''?'weekly':'monthly',priority:route===''?1:0.8}));
}
