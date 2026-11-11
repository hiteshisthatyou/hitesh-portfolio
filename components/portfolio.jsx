 "use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const career = [
  {
    id: "01", years: "2019 — 2020", company: "PhonePe", domain: "PAYMENTS",
    role: "Customer Service Associate",
    summary: "Started on the front line, resolving complex UPI and payment issues and learning how trust is built one transaction at a time.",
    milestone: "Appointed to the specialised remittance process pilot.",
    tag: "CUSTOMER CONTEXT", mark: "P"
  },
  {
    id: "02", years: "2020 — 2023", company: "Amazon Pay", domain: "GLOBAL PAYMENTS",
    role: "Virtual Customer Service Associate → SME",
    summary: "Investigated payment failures, fraud patterns and high-value disputes across payment ecosystems, while helping teammates navigate complex cases.",
    milestone: "Progressed to Subject Matter Expert and earned top-performer recognition across 8 consecutive quarters.",
    tag: "SPECIALIST JUDGEMENT", mark: "a"
  },
  {
    id: "03", years: "2023 — 2026", company: "Wint Wealth", domain: "FIXED INCOME",
    role: "Product Operations Analyst",
    summary: "Owned operational execution across bond launches, pricing, inventory, repayments, record dates and Bond SIP allocations.",
    milestone: "Built controls and automations across workflows supporting a fast-scaling investment platform.",
    tag: "OPERATIONAL SYSTEMS", mark: "W"
  }
];

const projects = [
  {
    number: "01", type: "PROCESS AUTOMATION", tools: "GOOGLE APPS SCRIPT · EXCEL · API",
    title: "Inventory visibility, without the spreadsheet maze.",
    copy: "Introduced automated checks and threshold flags to surface low, excess and mismatched inventory. The workflow recommended adjustments while final inventory actions remained under manual control.",
    metric: "~60%", metricCopy: "reduction in manual effort across three operational workflows",
    visual: "inventory"
  },
  {
    number: "02", type: "PRODUCT OPERATIONS", tools: "FIXED INCOME",
    title: "Launches with the details in place.",
    copy: "Planned and executed 60–70+ bond launches monthly for 10 months, validating pricing, returns, dates, documentation and platform readiness.",
    metric: "70+", metricCopy: "live bond listings supported in daily operations",
    visual: "launch"
  },
  {
    number: "03", type: "INCIDENT MANAGEMENT", tools: "RCA · UAT · CONTROLS",
    title: "Find the signal. Contain the risk.",
    copy: "Investigated production issues, assessed scope, coordinated fixes with engineering and stakeholders, validated outcomes, and added checks to reduce repeat incidents.",
    metric: "RCA", metricCopy: "detect · contain · verify",
    visual: "quality"
  }
];

const skills = [
  "Product Operations", "Fixed Income", "SQL", "Excel", "Metabase", "Mixpanel",
  "Google Apps Script", "Postman", "UAT", "API Operations", "AML / KYC",
  "Fraud Analysis", "Root Cause Analysis", "Process Automation",
  "Stakeholder Management", "SOP Design"
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span>{children}</div>;
}

export default function Portfolio() {
  const progressRef = useRef(null);
  const heroArtRef = useRef(null);
  const journeyRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 }
      });
      gsap.to(".neon-portrait img", {
        y: 55, scale: 1.06, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.utils.toArray(".journey-panel").forEach((panel, i) => {
        gsap.fromTo(panel.querySelector(".journey-content"),
          { y: 65, opacity: 0.25 },
          { y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: panel, start: "top 78%", end: "top 28%", scrub: 0.7 } }
        );
      });
    });
    const move = (e) => {
      if (!heroArtRef.current || window.matchMedia("(pointer: coarse)").matches) return;
      const x = (e.clientX / window.innerWidth - .5) * 16;
      const y = (e.clientY / window.innerHeight - .5) * 16;
      gsap.to(heroArtRef.current, { x, y, duration: .8, ease: "power2.out" });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { ctx.revert(); window.removeEventListener("pointermove", move); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <header className="site-header neon-header">
        <a className="brand" href="#top" onClick={closeMenu}>HV<span>.</span></a>
        <nav className={menuOpen ? "nav-open" : ""}>
          <a className="active" href="#top" onClick={closeMenu}>Story</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#approach" onClick={closeMenu}>Skills</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
        </nav>
        <a className="header-cta" href="mailto:hiteshvishwakarma9@gmail.com">Let’s Talk <span>↗</span></a>
        <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? "×" : "☰"}</button>
      </header>

      <main id="top">
        <section className="hero neon-hero">
          <div className="hero-backdrop-glow" />
          <div className="neon-hero-copy">
            <div className="hero-kicker"><span className="status-dot" /> THE PROFILE</div>
            <p className="chapter-count">CHAPTER <b>00</b> / 07</p>
            <h1 className="neon-title">From<br/>customer<br/>signals to<br/><em>systems.</em></h1>
            <p className="neon-intro">I turn complex financial workflows<br/>into reliable, scalable operations.</p>
            <p className="neon-tags">PRODUCT OPERATIONS&nbsp; · &nbsp;FINTECH&nbsp; · &nbsp;SYSTEMS THINKING</p>
            <div className="neon-actions">
              <a className="neon-primary" href="#journey"><span>▶</span> Start the Story</a>
              <a className="neon-secondary" href="#work"><span>▣</span> Watch in 60s</a>
            </div>
          </div>

          <div className="hero-art neon-portrait" ref={heroArtRef}>
            <img src="/hitesh-hero-art.jpg" alt="Cinematic portrait artwork of Hitesh in a fintech workspace" />
            <div className="portrait-vignette" />
          </div>

          <div className="scroll-cue"><span className="mouse-icon">⌁</span><span>Scroll to explore<br/>the full story</span></div>
          <div className="hero-signature"><i/> HITESH&nbsp; / &nbsp;PRODUCT OPERATIONS</div>
        </section>

        <section className="manifesto section-shell">
          <SectionLabel number="01">THE THROUGHLINE</SectionLabel>
          <div className="manifesto-copy">
            <Reveal><p className="big-statement">I didn’t just change roles.<br/><span>I kept expanding what I could own.</span></p></Reveal>
            <Reveal delay={.12}><p className="body-copy">My path began close to the customer, moved through specialist payments operations, and grew into ownership of critical fintech workflows. Along the way: sharper judgement, better controls, and a habit of finding the friction before it becomes a fire.</p></Reveal>
          </div>
          <div className="manifesto-stats">
            <Reveal><div className="stat"><strong>6<span>+</span></strong><small>YEARS IN OPERATIONS</small></div></Reveal>
            <Reveal delay={.08}><div className="stat"><strong>60<span>%</span></strong><small>LESS MANUAL EFFORT*</small></div></Reveal>
            <Reveal delay={.16}><div className="stat"><strong>70<span>+</span></strong><small>LIVE BOND LISTINGS MANAGED</small></div></Reveal>
            <p className="stat-note">*Across inventory, repayment and record-date workflows through automation.</p>
          </div>
        </section>

        <section id="journey" className="journey-section" ref={journeyRef}>
          <div className="section-shell">
            <SectionLabel number="02">THE CAREER JOURNEY</SectionLabel>
            <div className="journey-heading"><Reveal><h2>Three chapters.<br/><em>One direction.</em></h2></Reveal><Reveal delay={.12}><p>Each step brought me closer to the systems behind the customer experience.</p></Reveal></div>
          </div>
          <div className="journey-track">
            {career.map((item, i) => (
              <article className={`journey-panel journey-${item.id}`} key={item.id}>
                <div className="journey-content">
                  <div className="journey-number">{item.id} / {item.years}</div>
                  <div className="journey-main">
                    <div className={`company-mark mark-${item.id}`}>{item.mark}<span>.</span></div>
                    <div>
                      <p className="eyebrow">{item.company.toUpperCase()} · {item.domain}</p>
                      <h3>{item.role}</h3>
                      <p className="journey-desc">{item.summary}</p>
                      <div className="milestone"><span>GROWTH MILESTONE</span><strong>{item.milestone}</strong></div>
                    </div>
                  </div>
                  <div className="journey-side"><span>CAREER CHAPTER</span><b>{item.tag}</b><strong>{item.id}</strong></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section section-shell">
          <SectionLabel number="03">SELECTED WORK</SectionLabel>
          <div className="work-heading"><Reveal><h2>Less firefighting.<br/><em>More foresight.</em></h2></Reveal><Reveal delay={.1}><p>A few examples of how I approach operational complexity: make the process visible, build the guardrails, then make it repeatable.</p></Reveal></div>
          <div className="work-grid">
            {projects.map((project, i) => (
              <Reveal className={`work-card ${i === 0 ? "work-large" : ""}`} key={project.number} delay={i * .08}>
                <div className={`work-visual ${project.visual}-visual`}>
                  <div className="visual-top"><span>OPS / {project.number}</span><span>{project.type}</span></div>
                  {project.visual === "inventory" && <div className="inventory-screen"><div className="screen-head">LIVE INVENTORY <span>● MONITORING</span></div><div className="bars">{[45,72,56,90,66,82,49,76].map((h,j)=><i key={j} style={{"--h":`${h}%`}} />)}</div><div className="screen-foot"><span>LOW STOCK FLAGS</span><b>REAL-TIME CHECKS</b></div></div>}
                  {project.visual === "launch" && <><div className="launch-number">70<span>+</span></div><div className="launch-caption">LIVE BOND LISTINGS<br/>DAILY OPERATIONS</div><div className="launch-lines" /></>}
                  {project.visual === "quality" && <><div className="quality-ring"><span>RCA</span></div><div className="quality-tags"><b>DETECT</b><b>CONTAIN</b><b>VERIFY</b></div></>}
                </div>
                <div className="work-content"><div className="work-meta"><span>{project.number} / {project.type}</span><span>{project.tools}</span></div><h3>{project.title}</h3><p>{project.copy}</p>{project.metric && <div className="work-result"><strong>{project.metric}</strong><span>{project.metricCopy}</span></div>}</div>
              </Reveal>
            ))}
          </div>
          <div className="platform-note"><span className="note-mark">↗</span><p>During my time at Wint Wealth, I supported operational workflows as the platform’s monthly transaction volume scaled from approximately <strong>₹50 Cr to ₹800+ Cr</strong>. This is platform growth, not an individual-attribution claim.</p></div>
        </section>

        <section id="approach" className="approach-section">
          <div className="section-shell">
            <SectionLabel number="04">HOW I WORK</SectionLabel>
            <Reveal><div className="approach-heading"><h2>Clarity is an<br/><em>operational advantage.</em></h2></div></Reveal>
            <div className="approach-grid">
              <Reveal><div className="approach-intro"><p>I work at the intersection of people, product, data and process. I like understanding the full chain, spotting where it can break, and making the next run smoother.</p><a className="text-link" href="mailto:hiteshvishwakarma9@gmail.com">Start a conversation ↗</a></div></Reveal>
              <div className="principles">
                {[
                  ["01","Understand the workflow","Map the handoffs, dependencies and failure points before changing the process."],
                  ["02","Use data as a flashlight","SQL, Excel, Metabase and Mixpanel to validate details and make operational patterns visible."],
                  ["03","Build the guardrails","SOPs, maker-checker controls, alerts, UAT and clear escalation paths."],
                  ["04","Close the loop","Coordinate across teams, verify the fix in production and keep the learning in the process."]
                ].map(([n,t,d],i)=><Reveal key={n} delay={i*.06}><div className="principle"><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><b>↗</b></div></Reveal>)}
              </div>
            </div>
            <Reveal><div className="skills-wrap"><div className="skills-title"><span>TOOLKIT</span><span>THE WORKBENCH</span></div><div className="skill-cloud">{skills.map(s=><span key={s}>{s}</span>)}</div></div></Reveal>
          </div>
        </section>

        <section id="contact" className="closing-section section-shell">
          <div className="closing-orb" aria-hidden="true" />
          <SectionLabel number="05">THE NEXT CHAPTER</SectionLabel>
          <Reveal><div className="closing-copy"><p className="eyebrow">OPEN TO THE RIGHT OPPORTUNITY</p><h2>Let’s make<br/>complex things<br/><em>work beautifully.</em></h2><p>Interested in Product Operations, Fintech Operations and roles where thoughtful execution makes a measurable difference.</p><a className="contact-link" href="mailto:hiteshvishwakarma9@gmail.com">hiteshvishwakarma9@gmail.com <span>↗</span></a></div></Reveal>
          <div className="closing-bottom"><span>HITESH VISHWAKARMA © 2026</span><div><a href="https://www.linkedin.com/in/hiteshvish/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:hiteshvishwakarma9@gmail.com">EMAIL ↗</a></div><a href="#top">BACK TO TOP ↑</a></div>
        </section>
      </main>
    </>
  );
}
