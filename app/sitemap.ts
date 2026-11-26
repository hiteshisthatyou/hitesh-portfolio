import type { MetadataRoute } from 'next';
import profile from '@/content/profile.json';
export default function sitemap(): MetadataRoute.Sitemap {
 const routes=['','/about','/experience','/selected-work','/product-lab','/decision-studio','/visual-journal','/contact','/ideas',...profile.projects.map(project=>'/case-studies/'+project.id)];
 return routes.map(route=>({url:`https://hiteshv.in${route}`,lastModified:new Date('2026-11-26'),changeFrequency:route===''?'weekly':'monthly',priority:route===''?1:route.startsWith('/case-studies/')?0.75:0.8}));
}
