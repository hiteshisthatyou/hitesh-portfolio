'use client';
import {useMemo,useState} from 'react';
const initial={volume:500,minutes:8,people:5,hours:8,days:22,reduction:40,cost:350,setup:150000,rework:8};
const number=(v:number)=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:1}).format(v);
const money=(v:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v);
export default function OperationsEfficiencyCalculator(){
 const [v,setV]=useState(initial);
 const update=(key:keyof typeof initial,value:string)=>setV(s=>({...s,[key]:Math.max(0,Number(value)||0)}));
 const m=useMemo(()=>{
  const monthlyMinutes=v.volume*v.minutes*v.days;
  const hours=monthlyMinutes/60;
  const available=v.people*v.hours*v.days;
  const capacity=available*60/Math.max(1,v.minutes);
  const saved=hours*v.reduction/100;
  const remaining=hours-saved;
  const costSaved=saved*v.cost;
  const fte=saved/Math.max(1,v.hours*v.days);
  const netAfterRework=saved*(1-v.rework/100);
  const payback=costSaved? v.setup/costSaved:0;
  return {hours,available,capacity,util:available?100*hours/available:0,saved,remaining,costSaved,fte,netAfterRework,payback};
 },[v]);
 const field=(label:string,key:keyof typeof initial,hint:string,suffix='')=><label className="calc-field"><span>{label}</span><div className="calc-input-wrap"><input type="number" min="0" value={v[key]} onChange={e=>update(key,e.target.value)}/>{suffix&&<i>{suffix}</i>}</div><small>{hint}</small></label>;
 return <div className="calc-shell">
  <section className="calc-panel"><div className="calc-panel-head"><span className="calc-kicker">01 / CURRENT PROCESS</span><p>Describe the manual workload for a typical month.</p></div>
   <div className="calc-fields">{field('Cases processed per day','volume','Average daily volume')}{field('Manual minutes per case','minutes','Hands-on time per case','min')}{field('People on the process','people','Team members involved')}{field('Working hours per person / day','hours','Net productive hours','hrs')}{field('Working days per month','days','Exclude holidays and weekly offs','days')}</div>
   <div className="calc-panel-head calc-subhead"><span className="calc-kicker">02 / IMPROVEMENT ASSUMPTIONS</span><p>Model the impact of a redesigned or automated workflow.</p></div>
   <div className="calc-fields">{field('Manual effort reduction','reduction','Share of current manual time removed','%')}{field('Loaded cost per person-hour','cost','Salary + benefits + overhead','₹/hr')}{field('One-time implementation cost','setup','Build, integration and rollout','₹')}{field('Rework / exception share','rework','Share of saved time reserved for exceptions','%')}</div>
  </section>
  <section className="calc-results"><div className="calc-result-top"><span className="calc-kicker">LIVE OUTPUT / OPERATING MODEL</span><span className="calc-live">UPDATING LIVE</span></div>
   <div className="calc-hero-saving"><small>Estimated monthly labour value released</small><strong>{money(m.costSaved)}</strong><span>Equivalent to {number(m.fte)} FTE-months of capacity</span></div>
   <div className="calc-kpi-grid"><article><small>Current manual workload</small><strong>{number(m.hours)}h</strong><span>Hours / month</span></article><article><small>Capacity available</small><strong>{number(m.available)}h</strong><span>Team hours / month</span></article><article><small>Current utilisation</small><strong>{number(m.util)}%</strong><span>Workload ÷ available hours</span></article><article><small>Daily process capacity</small><strong>{number(m.capacity/Math.max(1,v.days))}</strong><span>Cases / day at current cycle time</span></article></div>
   <div className="calc-chart-block"><div className="calc-chart-title"><h3>Time released by workflow change</h3><span>Monthly hours</span></div><div className="ops-time-bar"><i style={{width:`${Math.min(100,v.reduction)}%`}}/></div><div className="ops-time-legend"><span><i/> {number(m.saved)}h released</span><span><i/> {number(m.remaining)}h remaining</span></div><div className="ops-time-values"><div><small>Before</small><b>{number(m.hours)}h</b></div><div><small>After</small><b>{number(m.remaining)}h</b></div><div><small>After exception reserve</small><b>{number(m.hours-m.netAfterRework)}h saved</b></div></div></div>
   <div className="calc-bottom-grid"><div className="calc-mini"><span className="calc-kicker">CAPACITY IMPACT</span><h3>What the team gets back</h3><strong>{number(m.netAfterRework)}h</strong><p>Net hours after reserving {number(v.rework)}% of the released time for exceptions and rework.</p></div><div className="calc-mini calc-growth"><span className="calc-kicker">SIMPLE PAYBACK</span><h3>Implementation recovery</h3><strong>{m.payback?number(m.payback):'—'} <small>months</small></strong><p>One-time cost ÷ estimated monthly labour value. Excludes ongoing software and maintenance costs.</p></div></div>
   <p className="calc-note">Model assumptions: daily volume × manual minutes × working days estimates current workload. Savings are based on the reduction assumption. Labour value is capacity value, not guaranteed cash savings. Validate demand, staffing, quality, exception handling and adoption before using this as a business case.</p>
  </section>
 </div>
}
