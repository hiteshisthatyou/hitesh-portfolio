'use client';
import {useMemo,useState} from 'react';

const initial={visitors:10000,signups:2400,activated:1560,retained:1092,previous:2100,current:2400,retentionBase:1000,day1:720,day7:510,day30:360};
const number=(v:number)=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:1}).format(v);
const pct=(v:number)=>`${v.toFixed(1)}%`;
export default function ProductMetricsCalculator(){
 const [v,setV]=useState(initial);
 const update=(key:keyof typeof initial,value:string)=>setV(s=>({...s,[key]:Math.max(0,Number(value)||0)}));
 const m=useMemo(()=>{
  const conversion=v.visitors?100*v.signups/v.visitors:0;
  const activation=v.signups?100*v.activated/v.signups:0;
  const end=v.visitors?100*v.retained/v.visitors:0;
  const drop=v.visitors?100*(v.visitors-v.retained)/v.visitors:0;
  const growth=v.previous?100*(v.current-v.previous)/v.previous:0;
  const retention=[v.retentionBase?100*v.day1/v.retentionBase:0,v.retentionBase?100*v.day7/v.retentionBase:0,v.retentionBase?100*v.day30/v.retentionBase:0];
  return {conversion,activation,end,drop,growth,retention,steps:[['Visitors',v.visitors],['Sign-ups',v.signups],['Activated',v.activated],['Retained',v.retained]] as [string,number][]};
 },[v]);
 const field=(label:string,key:keyof typeof initial,hint:string)=> <label className="calc-field"><span>{label}</span><input type="number" min="0" value={v[key]} onChange={e=>update(key,e.target.value)}/><small>{hint}</small></label>;
 return <div className="calc-shell">
  <section className="calc-panel"><div className="calc-panel-head"><span className="calc-kicker">01 / FUNNEL INPUTS</span><p>Enter counts for the same period and user cohort.</p></div>
   <div className="calc-fields">{field('Visitors / sessions','visitors','Top of funnel')}{field('Sign-ups / leads','signups','Reached the first conversion')}{field('Activated users','activated','Completed your activation event')}{field('Retained users','retained','Reached your chosen retention milestone')}</div>
   <div className="calc-panel-head calc-subhead"><span className="calc-kicker">02 / RETENTION COHORT</span><p>Users who started in the same cohort.</p></div>
   <div className="calc-fields">{field('Cohort size','retentionBase','Starting users')}{field('Day 1 active','day1','Returned on day 1')}{field('Day 7 active','day7','Returned on day 7')}{field('Day 30 active','day30','Returned on day 30')}</div>
   <div className="calc-panel-head calc-subhead"><span className="calc-kicker">03 / GROWTH</span><p>Compare the same metric across two equal periods.</p></div>
   <div className="calc-fields">{field('Previous period','previous','Baseline value')}{field('Current period','current','Latest value')}</div>
  </section>
  <section className="calc-results"><div className="calc-result-top"><span className="calc-kicker">LIVE OUTPUT / PRODUCT HEALTH</span><span className="calc-live">UPDATING LIVE</span></div>
   <div className="calc-kpi-grid"><article><small>Visitor → sign-up</small><strong>{pct(m.conversion)}</strong><span>Conversion rate</span></article><article><small>Sign-up → activated</small><strong>{pct(m.activation)}</strong><span>Activation rate</span></article><article><small>Visitor → retained</small><strong>{pct(m.end)}</strong><span>End-to-end yield</span></article><article><small>Visitor loss</small><strong>{pct(m.drop)}</strong><span>Overall funnel drop-off</span></article></div>
   <div className="calc-chart-block"><div className="calc-chart-title"><h3>Funnel performance</h3><span>Count and step conversion</span></div>
    {m.steps.map(([label,count],i)=>{const max=Math.max(v.visitors,1);const prior=i?m.steps[i-1][1]:0;const rate=i&&prior?100*count/prior:100;return <div className="calc-bar-row" key={label}><div><span>{label}</span><b>{number(count)}</b></div><div className="calc-bar-track"><i style={{width:`${Math.min(100,100*count/max)}%`}}/></div><small>{i?pct(rate)+' from previous step':'100% of visitors'}</small></div>})}
   </div>
   <div className="calc-bottom-grid"><div className="calc-mini"><span className="calc-kicker">RETENTION CURVE</span><h3>Same cohort, over time</h3>{m.retention.map((r,i)=><div className="retention-line" key={i}><span>D{i===0?'1':i===1?'7':'30'}</span><div><i style={{width:`${Math.min(100,r)}%`}}/></div><b>{pct(r)}</b></div>)}</div>
    <div className="calc-mini calc-growth"><span className="calc-kicker">PERIOD-ON-PERIOD</span><h3>Growth rate</h3><strong className={m.growth>=0?'positive':'negative'}>{m.growth>0?'+':''}{pct(m.growth)}</strong><p>{number(v.previous)} → {number(v.current)}. Positive means the current period is higher.</p></div></div>
   <p className="calc-note">Definitions: conversion = sign-ups ÷ visitors; activation = activated ÷ sign-ups; retention = active users on day N ÷ starting cohort; growth = (current − previous) ÷ previous. Use consistent periods, event definitions and cohort rules. These are descriptive metrics, not causal explanations.</p>
  </section>
 </div>
}
