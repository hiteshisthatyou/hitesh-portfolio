'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';

type Frequency = 1 | 2 | 4 | 12;
type Basis = '30/360' | 'ACT/365';

const dateValue = (value:string) => {
  const [y,m,d] = value.split('-').map(Number);
  return new Date(Date.UTC(y,m-1,d));
};
const daysBetween = (a:Date,b:Date) => Math.round((b.getTime()-a.getTime())/86400000);
const thirty360 = (a:Date,b:Date) => {
  const d1 = Math.min(a.getUTCDate(),30);
  const d2 = Math.min(b.getUTCDate(),30);
  return (b.getUTCFullYear()-a.getUTCFullYear())*360 + (b.getUTCMonth()-a.getUTCMonth())*30 + d2-d1;
};
const yearDays = (a:Date,b:Date,basis:Basis) => basis==='30/360' ? thirty360(a,b) : daysBetween(a,b)*360/365;
const addMonths = (date:Date,months:number) => {
  const d = new Date(date);
  const originalDay = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth()+months);
  const last = new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();
  d.setUTCDate(Math.min(originalDay,last));
  return d;
};
const formatINR = (value:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number.isFinite(value)?value:0);
const formatPct = (value:number) => Number.isFinite(value) ? `${(value*100).toFixed(3)}%` : 'Not available';

function bondSchedule(settlement:Date,maturity:Date,frequency:Frequency) {
  const months = 12/frequency;
  const dates:Date[] = [maturity];
  let cursor = maturity;
  for(let i=0;i<1200;i++) {
    cursor = addMonths(cursor,-months);
    if(cursor.getTime()<=settlement.getTime()) return {previous:cursor,next:dates[dates.length-1],future:dates.reverse()};
    dates.push(cursor);
  }
  throw new Error('Unable to build coupon schedule. Check the dates and frequency.');
}
function solveYield(cleanPrice:number,couponPerPeriod:number,redemption:number,settlement:Date,maturity:Date,frequency:Frequency,basis:Basis) {
  const {previous,next,future} = bondSchedule(settlement,maturity,frequency);
  const fullPeriod = yearDays(previous,next,basis);
  const elapsed = yearDays(previous,settlement,basis);
  const remainingFraction = Math.max(0,Math.min(1,1-elapsed/fullPeriod));
  const accrued = couponPerPeriod*(1-remainingFraction);
  const dirtyPrice = cleanPrice+accrued;
  const cashflows = future.map((date,index)=>({amount:couponPerPeriod+(index===future.length-1?redemption:0), exponent:index+remainingFraction}));
  const pv = (annualYield:number) => cashflows.reduce((sum,cf)=>sum+cf.amount/Math.pow(1+annualYield/frequency,cf.exponent),0);
  let low = -frequency+0.0000001, high = 10;
  if(pv(low)<dirtyPrice) return {yieldRate:NaN,accrued,dirtyPrice,previous,next,cashflows};
  for(let i=0;i<240;i++) {
    const mid=(low+high)/2;
    if(pv(mid)>dirtyPrice) low=mid; else high=mid;
  }
  return {yieldRate:(low+high)/2,accrued,dirtyPrice,previous,next,cashflows};
}

export default function BondCalculator() {
  const [face,setFace]=useState('1000');
  const [units,setUnits]=useState('100');
  const [coupon,setCoupon]=useState('9.5');
  const [price,setPrice]=useState('98.5');
  const [redemption,setRedemption]=useState('100');
  const [frequency,setFrequency]=useState<Frequency>(2);
  const [basis,setBasis]=useState<Basis>('30/360');
  const [settlement,setSettlement]=useState('2026-11-24');
  const [maturity,setMaturity]=useState('2031-11-24');

  const result=useMemo(()=>{
    const f=Number(face),u=Number(units),c=Number(coupon),p=Number(price),r=Number(redemption);
    if(![f,u,c,p,r].every(Number.isFinite)||f<=0||u<=0||c<0||p<=0||r<=0||!settlement||!maturity) return {error:'Enter valid positive amounts, rates and dates.'} as const;
    const s=dateValue(settlement),m=dateValue(maturity);
    if(m<=s) return {error:'Maturity date must be after the settlement date.'} as const;
    try {
      const solved=solveYield(p,c/frequency,r,s,m,frequency,basis);
      const accruedPer100=solved.accrued;
      const faceTotal=f*u;
      const cleanValue=faceTotal*p/100;
      const accruedTotal=faceTotal*accruedPer100/100;
      const annualCoupon=faceTotal*c/100;
      const couponPerPayment=annualCoupon/frequency;
      return {
        ...solved,
        faceTotal,
        cleanValue,
        accruedTotal,
        investment:cleanValue+accruedTotal,
        annualCoupon,
        couponPerPayment,
        totalCoupons:solved.cashflows.length,
        error: Number.isFinite(solved.yieldRate)?'':'Unable to solve a yield for these inputs. Check the price and cash flows.'
      } as const;
    } catch(e) {
      return {error:e instanceof Error?e.message:'Unable to calculate this bond.'} as const;
    }
  },[face,units,coupon,price,redemption,frequency,basis,settlement,maturity]);

  const input=(label:string,value:string,set:(v:string)=>void,step='any')=><label className="bond-field"><span>{label}</span><input type="number" min="0" step={step} value={value} onChange={e=>set(e.target.value)} /></label>;

  return <main className="bond-page">
    <header className="bond-topbar"><Link href="/" className="bond-wordmark">HITESH<span>.</span></Link><nav><Link href="/#work">Portfolio</Link><Link href="/utility-lab">Utility Lab</Link><Link href="/#contact">Contact</Link></nav></header>
    <div className="bond-wrap">
      <div className="bond-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/utility-lab">Utility Lab</Link><span>/</span><span>Bond calculator</span></div>
      <section className="bond-intro">
        <p className="bond-eyebrow">UTILITY LAB / FIXED INCOME 01</p>
        <h1>Understand the return.<br/><em>Beyond the coupon.</em></h1>
        <p>Estimate bond yield to maturity, accrued interest and purchase cash outlay using your own assumptions.</p>
      </section>
      <section className="bond-layout">
        <div className="bond-input-panel">
          <div className="bond-panel-heading"><div><span>01 / INPUTS</span><h2>Bond details</h2></div><span className="bond-live">LIVE MODEL</span></div>
          <div className="bond-fields">
            {input('Face value per bond (₹)',face,setFace,'0.01')}
            {input('Number of bonds',units,setUnits,'1')}
            {input('Annual coupon rate (%)',coupon,setCoupon,'0.01')}
            {input('Clean market price (per ₹100 face value)',price,setPrice,'0.01')}
            {input('Redemption value (per ₹100 face value)',redemption,setRedemption,'0.01')}
            <label className="bond-field"><span>Coupon frequency</span><select value={frequency} onChange={e=>setFrequency(Number(e.target.value) as Frequency)}><option value={1}>Annual</option><option value={2}>Semi-annual</option><option value={4}>Quarterly</option><option value={12}>Monthly</option></select></label>
            <label className="bond-field"><span>Day-count convention</span><select value={basis} onChange={e=>setBasis(e.target.value as Basis)}><option value="30/360">30/360</option><option value="ACT/365">Actual/365</option></select></label>
            <label className="bond-field"><span>Settlement date</span><input type="date" value={settlement} onChange={e=>setSettlement(e.target.value)}/></label>
            <label className="bond-field"><span>Maturity date</span><input type="date" value={maturity} onChange={e=>setMaturity(e.target.value)}/></label>
          </div>
          <p className="bond-input-note">Prices and redemption are quoted per ₹100 of face value. Enter the terms from the bond's information memorandum or cash-flow schedule.</p>
        </div>
        <div className="bond-result-panel">
          <p className="bond-eyebrow">02 / ESTIMATED OUTPUT</p>
          {'error' in result && result.error ? <div className="bond-error" role="alert">{result.error}</div> : <>
            <div className="bond-yield-label">Estimated yield to maturity</div>
            <div className="bond-yield">{formatPct(result.yieldRate)}</div>
            <p className="bond-result-sub">Annual nominal yield, compounded at the selected coupon frequency.</p>
            <div className="bond-result-grid">
              <div><span>Purchase cash outlay</span><strong>{formatINR(result.investment)}</strong></div>
              <div><span>Clean price value</span><strong>{formatINR(result.cleanValue)}</strong></div>
              <div><span>Accrued interest</span><strong>{formatINR(result.accruedTotal)}</strong></div>
              <div><span>Annual coupon income</span><strong>{formatINR(result.annualCoupon)}</strong></div>
              <div><span>Coupon per payment</span><strong>{formatINR(result.couponPerPayment)}</strong></div>
              <div><span>Remaining coupon payments</span><strong>{result.totalCoupons}</strong></div>
            </div>
            <div className="bond-cashflow">
              <span>Next coupon date</span><strong>{result.next.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'})}</strong>
              <span>Previous coupon date</span><strong>{result.previous.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'})}</strong>
            </div>
          </>}
          <p className="bond-disclaimer">Illustrative estimate only. Excludes taxes, brokerage, settlement charges, reinvestment assumptions and issuer default risk. Actual bond cash flows, payment dates, holiday adjustments and day-count rules may differ. Verify against the security's official terms before investing.</p>
        </div>
      </section>
      <section className="bond-explainer">
        <div><span className="bond-eyebrow">03 / HOW TO READ IT</span><h2>Coupon is not the same as return.</h2></div>
        <div><p><strong>Coupon rate</strong> is the annual interest promised on face value. <strong>Current yield</strong> compares annual coupon with market price. <strong>Yield to maturity</strong> estimates the annualised return implied by the price and remaining contractual cash flows if held to maturity.</p><p>When a bond trades below face value, YTM can be higher than its coupon yield. When it trades above face value, YTM can be lower. The calculation is sensitive to the actual schedule and conventions in the security documents.</p></div>
      </section>
      <section className="bond-sources">
        <p className="bond-eyebrow">REFERENCE NOTES</p>
        <p>For Indian Government Securities, RBI describes semi-annual coupon payments and a 30/360 day-count convention. Corporate debt instruments can have different contractual terms, so use the convention specified for the instrument being analysed.</p>
        <a href="https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=711" target="_blank" rel="noreferrer">RBI: Government Securities FAQ ↗</a>
      </section>
      <footer className="bond-footer"><span>HITESH VISHWAKARMA · UTILITY LAB</span><Link href="/#contact">Discuss a product or fintech problem ↗</Link></footer>
    </div>
  </main>;
}
