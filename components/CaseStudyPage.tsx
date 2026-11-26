import Link from 'next/link';
import {notFound} from 'next/navigation';
import profile from '@/content/profile.json';

type Project=typeof profile.projects[number];
const projects=profile.projects as Project[];
const mail='mailto:'+profile.email+'?subject='+encodeURIComponent('Discussing your portfolio work');

export function generateStaticParams(){return projects.map(project=>({slug:project.id}));}
export function generateMetadata({params}:{params:Promise<{slug:string}>}){
 return params.then(({slug})=>{const project=projects.find(item=>item.id===slug);return project?{title:project.title+' | Case Study | Hitesh Vishwakarma',description:project.problem,openGraph:{title:project.title+' | Hitesh Vishwakarma',description:project.problem}}:{title:'Case study not found'};});
}
export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(item=>item.id===slug);
 if(!project) notFound();
 const index=projects.findIndex(item=>item.id===slug);
 const previous=projects[(index-1+projects.length)%projects.length];
 const next=projects[(index+1)%projects.length];
 return <main className="case-page">
  <header className="case-topbar"><Link href="/" className="case-wordmark">HITESH<span>.</span></Link><nav><Link href="/#work">Selected work</Link><Link href="/#journey">Experience</Link><Link href="/#contact">Contact</Link></nav></header>
  <div className="case-wrap">
   <div className="case-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#work">Selected work</Link><span>/</span><span>{project.title}</span></div>
   <section className="case-hero"><div className="case-hero-meta"><span>CASE FILE / {String(index+1).padStart(2,'0')}</span><span>{project.category}</span></div><p className="case-eyebrow">PRODUCT · OPERATIONS · EXECUTION</p><h1>{project.title}</h1><p className="case-deck">{project.problem}</p><div className="case-hero-foot"><span>HITESH VISHWAKARMA / SELECTED WORK</span><span>FIELD NOTES · {String(index+1).padStart(2,'0')}</span></div></section>
   <section className="case-section case-problem"><div className="case-section-label"><span>01</span><small>THE CHALLENGE</small></div><div><h2>Where the friction started.</h2><p>{project.problem}</p></div></section>
   <section className="case-section"><div className="case-section-label"><span>02</span><small>MY CONTRIBUTION</small></div><div><h2>The part I owned.</h2><p>{project.role}</p><div className="case-pullquote">The focus was to make the workflow clearer, more controlled and easier to operate.</div></div></section>
   <section className="case-section case-execution"><div className="case-section-label"><span>03</span><small>EXECUTION</small></div><div><h2>How the work moved forward.</h2><p>{project.approach}</p></div></section>
   <section className="case-tools"><div><span className="case-eyebrow">04 / SYSTEMS & METHODS</span><h2>Tools in the workflow.</h2></div><div className="case-tool-list">{project.tools.map(tool=><span key={tool}>{tool}</span>)}</div></section>
   <section className="case-outcomes"><div className="case-outcomes-head"><span className="case-eyebrow">05 / OUTCOMES</span><h2>What changed.</h2><p>Outcomes recorded for this work. Attribution and measurement boundaries are kept explicit.</p></div><div className="case-outcome-list">{project.outcome.map((outcome,i)=><div className="case-outcome" key={outcome}><span>0{i+1}</span><strong>{outcome}</strong></div>)}</div></section>
   {project.caveat&&<section className="case-scope"><span className="case-eyebrow">SCOPE & ATTRIBUTION</span><p>{project.caveat}</p></section>}
   <section className="case-next"><div><span className="case-eyebrow">CONTINUE EXPLORING</span><h2>More work. More context.</h2></div><div className="case-next-links"><Link href={'/case-studies/'+previous.id}>← {previous.title}</Link><Link href={'/case-studies/'+next.id}>{next.title} →</Link></div></section>
   <footer className="case-footer"><Link href="/#work">← Back to selected work</Link><a href={mail}>Discuss similar work ↗</a><span>HITESH VISHWAKARMA · {new Date().getFullYear()}</span></footer>
  </div>
 </main>;
}
