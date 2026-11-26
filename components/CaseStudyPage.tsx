import Link from 'next/link';
import {notFound} from 'next/navigation';
import profile from '@/content/profile.json';

type Project=typeof profile.projects[number];
const projects=profile.projects as Project[];
const mail='mailto:'+profile.email+'?subject='+encodeURIComponent('Discussing your portfolio work');

const workflows:Record<string,{title:string;steps:{label:string;detail:string}[];note:string}>={
kyc:{title:'Verification improvement loop',steps:[{label:'Verification attempt',detail:'Customer submits KYC details'},{label:'Outcome review',detail:'Review pass, failure and repeat-check patterns'},{label:'Workflow validation',detail:'Test process changes and verification outcomes'},{label:'Gap closure',detail:'Monitor exceptions and close process gaps'}],note:'A process view of the documented contribution. No specific vendor integration or automated decision engine is implied.'},
repayments:{title:'Repayment monitoring flow',steps:[{label:'Metabase data',detail:'Repayment and financial-event source data'},{label:'Google Sheets',detail:'Structure and aggregate records by ISIN'},{label:'Apps Script',detail:'Calculate principal, interest, TDS and net payout'},{label:'Validation',detail:'Reconcile totals and flag exceptions'},{label:'Slack alerts',detail:'Surface scheduled updates and items needing review'}],note:'Exceptions remain subject to manual correction and review.'},
inventory:{title:'Inventory control loop',steps:[{label:'Source exports',detail:'Sheets, Excel and internal data'},{label:'Automated checks',detail:'Calculate thresholds and compare inventory'},{label:'Exception flags',detail:'Identify low, excess and mismatched stock'},{label:'Human review',detail:'Review and approve recommended adjustments'},{label:'Updated view',detail:'Refresh tracking and scheduled reports'}],note:'The workflow recommends adjustments. Final inventory decisions remain human-approved.'},
launches:{title:'Bond launch readiness flow',steps:[{label:'Product inputs',detail:'Pricing, yield, dates and documentation'},{label:'Operational checks',detail:'Validate inventory, approvals and readiness'},{label:'UAT',detail:'Check platform behaviour and record defects'},{label:'Cross-team closure',detail:'Coordinate Product, Engineering, Finance and Compliance'},{label:'Launch & monitor',detail:'Support release and post-launch issue resolution'}],note:'This represents the operational coordination sequence, not a claim of sole ownership of the launch.'},
pricing:{title:'Pricing change control',steps:[{label:'Change request',detail:'Capture proposed value and effective date'},{label:'Approval tracking',detail:'Coordinate relevant stakeholder approvals'},{label:'Sheet update',detail:'Maintain pricing and referral records'},{label:'Implementation check',detail:'Validate applied values and dates'},{label:'Impact review',detail:'Check customer and transaction impact'}],note:'Positioned as pricing governance and execution, not independent ownership of pricing strategy.'},
risk:{title:'Transaction investigation flow',steps:[{label:'Monitoring signal',detail:'Review suspicious pattern, failure or dispute'},{label:'Evidence review',detail:'Check transaction details and available case evidence'},{label:'Risk checks',detail:'Review AML/KYC and relevant exceptions'},{label:'Escalation',detail:'Route cases for specialist or cross-team action'},{label:'Case outcome',detail:'Record findings and operational follow-up'}],note:'A high-level investigation sequence based on the described responsibilities. It does not disclose internal detection rules.'},
sixsigma:{title:'DMAIC improvement cycle',steps:[{label:'Define',detail:'Frame the payment-response bottleneck'},{label:'Measure',detail:'Review workflow and performance data'},{label:'Analyse',detail:'Identify root causes and handoff friction'},{label:'Improve',detail:'Standardise workflow and escalation paths'},{label:'Control',detail:'Monitor performance and sustain changes'}],note:'The 30% response and resolution improvement is attributed to the wider process effort, not an individual-only result.'},
incidents:{title:'Incident response loop',steps:[{label:'Detect & assess',detail:'Identify issue and estimate customer or operational impact'},{label:'Escalate',detail:'Coordinate with Engineering and relevant teams'},{label:'Fix tracking',detail:'Follow corrective action through resolution'},{label:'Retest',detail:'Validate the fix and affected outcomes'},{label:'Prevent recurrence',detail:'Document root cause and preventive controls'}],note:'This describes the documented operational response role without exposing internal incident procedures.'}
};

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
   <section className="case-flow"><div className="case-flow-head"><span className="case-eyebrow">04 / PROCESS MAP</span><h2>{workflows[slug]?.title}</h2><p>How the work moved through the system.</p></div><div className="case-flow-track">{(workflows[slug]?.steps||[]).map((step,i)=><div className="case-flow-step" key={step.label}><span className="case-flow-index">0{i+1}</span><strong>{step.label}</strong><small>{step.detail}</small></div>)}</div><p className="case-flow-note">{workflows[slug]?.note}</p></section>
   <section className="case-tools"><div><span className="case-eyebrow">04 / SYSTEMS & METHODS</span><h2>Tools in the workflow.</h2></div><div className="case-tool-list">{project.tools.map(tool=><span key={tool}>{tool}</span>)}</div></section>
   <section className="case-outcomes"><div className="case-outcomes-head"><span className="case-eyebrow">05 / OUTCOMES</span><h2>What changed.</h2><p>Outcomes recorded for this work. Attribution and measurement boundaries are kept explicit.</p></div><div className="case-outcome-list">{project.outcome.map((outcome,i)=><div className="case-outcome" key={outcome}><span>0{i+1}</span><strong>{outcome}</strong></div>)}</div></section>
   {project.caveat&&<section className="case-scope"><span className="case-eyebrow">SCOPE & ATTRIBUTION</span><p>{project.caveat}</p></section>}
   <section className="case-next"><div><span className="case-eyebrow">CONTINUE EXPLORING</span><h2>More work. More context.</h2></div><div className="case-next-links"><Link href={'/case-studies/'+previous.id}>← {previous.title}</Link><Link href={'/case-studies/'+next.id}>{next.title} →</Link></div></section>
   <footer className="case-footer"><Link href="/#work">← Back to selected work</Link><a href={mail}>Discuss similar work ↗</a><span>HITESH VISHWAKARMA · {new Date().getFullYear()}</span></footer>
  </div>
 </main>;
}
