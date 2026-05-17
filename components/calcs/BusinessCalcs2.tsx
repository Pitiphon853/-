"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem, NumericInput } from "./shared";

// 1. Break Even
export function BreakEvenCalculator({ lang }: { lang: Lang }) {
  const [fixed, setFixed] = useLocalState("be_fixed", "");
  const [variable, setVar] = useLocalState("be_var", "");
  const [price, setPrice] = useLocalState("be_price", "");
  
  const be = parseFloat(fixed) / (parseFloat(price) - parseFloat(variable));

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "จุดคุ้มทุน (Break-even)" : "Break-Even"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนคงที่รวม" : "Total Fixed Costs"}</label><NumericInput value={fixed} onChange={setFixed} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนผันแปรต่อชิ้น" : "Variable Cost/Unit"}</label><NumericInput value={variable} onChange={setVar} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขายต่อชิ้น" : "Sale Price/Unit"}</label><NumericInput value={price} onChange={setPrice} className={inputClass} /></div>
        </div>
      </div>
      {fixed && variable && price && !isNaN(be) && be > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้องขายให้ได้กี่ชิ้นถึงจะคุ้มทุน?" : "Units to Break-Even"}</p>
          <div className="text-4xl font-black text-green-600">{Math.ceil(be).toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — จุดคุ้มทุน":"Break-Even FAQ"}>
          <FAQItem q={lang==="TH"?"จุดคุ้มทุน (Break-Even Point) คืออะไร?":"What is Break-Even Point?"} a={lang==="TH"?"จุดที่รายได้เท่ากับต้นทุนรวม (คงที่+ผันแปร) สูตร: BEP = ต้นทุนคงที่ ÷ (ราคาขาย - ต้นทุนผันแปรต่อหน่วย) เช่น ต้นทุนคงที่ 100,000 บาท ขายชิ้นละ 500 ต้นทุนผันแปร 300 จะคุ้มทุนที่ 500 ชิ้น | อ้างอิง: Garrison RH. (2021). Managerial Accounting. McGraw-Hill.":"The point where revenue equals total costs. Formula: BEP = Fixed Costs ÷ (Price - Variable Cost per unit). | Source: Garrison (2021) Managerial Accounting, McGraw-Hill."} />
          <FAQItem q={lang==="TH"?"ธุรกิจใหม่ควรคุ้มทุนภายในกี่ปี?":"How long should a new business take to break even?"} a={lang==="TH"?"ขึ้นอยู่กับประเภทธุรกิจ: ร้านอาหาร 6-18 เดือน, ร้านค้าปลีก 1-2 ปี, Startup เทคโนโลยี 2-5 ปี, อสังหาริมทรัพย์ 5-10 ปี | อ้างอิง: SBA (Small Business Administration) — Business Planning Guide.":"Depends on type: Restaurant 6-18 months, Retail 1-2 years, Tech startup 2-5 years, Real estate 5-10 years. | Source: SBA Business Planning Guide."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Markup
export function MarkupCalculator({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("mu_cost", "");
  const [markup, setMarkup] = useLocalState("mu_pct", "");
  
  const price = parseFloat(cost) * (1 + parseFloat(markup)/100);
  const margin = ((price - parseFloat(cost)) / price) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ตั้งราคาจาก Markup" : "Markup Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุน" : "Cost"}</label><NumericInput value={cost} onChange={setCost} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "Markup (%)" : "Markup (%)"}</label><input type="number" value={markup} onChange={e=>setMarkup(e.target.value)} className={inputClass} /></div>
      </div>
      {cost && markup && !isNaN(price) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center space-y-4">
          <div>
            <p>{lang === "TH" ? "ราคาขายที่แนะนำ" : "Suggested Selling Price"}</p>
            <div className="text-4xl font-black text-green-600">{price.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
          </div>
          <div>
             <p className="text-sm text-gray-500">{lang==="TH"?"คิดเป็น Gross Margin":"Equals Gross Margin"}</p>
             <div className="text-xl font-bold text-gray-700">{margin.toFixed(2)}%</div>
          </div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — คำนวณเงินเดือน":"Payroll FAQ"}>
          <FAQItem q={lang==="TH"?"ค่าแรงขั้นต่ำไทยปี 2024 เท่าไร?":"What is Thailand's minimum wage in 2024?"} a={lang==="TH"?"ค่าแรงขั้นต่ำปี 2024 อยู่ที่ 330-370 บาท/วัน แตกต่างตามจังหวัด กรุงเทพฯ 363 บาท ภูเก็ต 370 บาท (สูงสุด) นายจ้างต้องจ่ายประกันสังคม 5% (สูงสุด 750 บาท/เดือน) | อ้างอิง: กระทรวงแรงงาน — ประกาศค่าแรงขั้นต่ำ; สำนักงานประกันสังคม.":"2024 minimum wage: 330-370 THB/day by province. Bangkok 363 THB, Phuket 370 THB (highest). Employer pays 5% social security (max 750 THB/month). | Source: Thai Ministry of Labour; Social Security Office."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Depreciation
export function DepreciationCalculator({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("dep_cost", "");
  const [salvage, setSalvage] = useLocalState("dep_salv", "");
  const [years, setYears] = useLocalState("dep_yrs", "");
  
  const dep = (parseFloat(cost) - parseFloat(salvage)) / parseFloat(years);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ค่าเสื่อมราคา (แบบเส้นตรง)" : "Depreciation"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ราคาทุนทรัพย์สิน" : "Asset Cost"}</label><NumericInput value={cost} onChange={setCost} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคาซาก" : "Salvage Value"}</label><NumericInput value={salvage} onChange={setSalvage} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "อายุการใช้งาน (ปี)" : "Useful Life (Years)"}</label><input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {cost && salvage && years && !isNaN(dep) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ค่าเสื่อมราคาต่อปี" : "Annual Depreciation"}</p>
          <div className="text-4xl font-black text-green-600">{dep.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ส่วนลด":"Discount FAQ"}>
          <FAQItem q={lang==="TH"?"ส่วนลด 50%+20% เท่ากับ 70% ไหม?":"Does 50% + 20% off equal 70% off?"} a={lang==="TH"?"ไม่ใช่! ลด 50% ก่อน แล้วลดอีก 20% จากราคาที่เหลือ เช่น สินค้า 1,000 บาท ลด 50% = 500 แล้วลด 20% = 400 บาท (ลดจริง 60% ไม่ใช่ 70%) สูตร: ราคาสุดท้าย = ราคา × (1-d1) × (1-d2) | อ้างอิง: Kotler P. (2020). Marketing Management. Pearson.":"No! 50% then 20% off the remainder: 1,000 → 500 → 400 (actual 60% off, not 70%). Formula: Final = Price × (1-d1) × (1-d2). | Source: Kotler (2020) Marketing Management, Pearson."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Payroll
export function PayrollCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-green-600">Payroll Calculator (WIP)</h2></div>;
}

// 5. COGS
export function COGSCalculator({ lang }: { lang: Lang }) {
  const [invBeg, setBeg] = useLocalState("cogs_beg", "");
  const [purchases, setPur] = useLocalState("cogs_pur", "");
  const [invEnd, setEnd] = useLocalState("cogs_end", "");
  
  const cogs = parseFloat(invBeg) + parseFloat(purchases) - parseFloat(invEnd);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ต้นทุนขาย (COGS)" : "COGS"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงเหลือต้นงวด" : "Beginning Inventory"}</label><NumericInput value={invBeg} onChange={setBeg} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "การซื้อสุทธิ" : "Purchases"}</label><NumericInput value={purchases} onChange={setPur} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงเหลือปลายงวด" : "Ending Inventory"}</label><NumericInput value={invEnd} onChange={setEnd} className={inputClass} /></div>
      </div>
      {invBeg && purchases && invEnd && !isNaN(cogs) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้นทุนขาย" : "Cost of Goods Sold"}</p>
          <div className="text-4xl font-black text-green-600">{cogs.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สินค้าคงคลัง":"Inventory FAQ"}>
          <FAQItem q={lang==="TH"?"Inventory Turnover ที่ดีคือเท่าไร?":"What is a good inventory turnover ratio?"} a={lang==="TH"?"ขึ้นอยู่กับอุตสาหกรรม: ซูเปอร์มาร์เก็ต 12-20 รอบ/ปี, เสื้อผ้า 4-6 รอบ, อิเล็กทรอนิกส์ 6-8 รอบ, รถยนต์ 2-4 รอบ ยิ่งสูงยิ่งดี แต่ต่ำเกินไปอาจขาดสต็อก | อ้างอิง: Wild JJ. (2022). Financial Accounting. McGraw-Hill; Investopedia — Inventory Turnover Ratio.":"Varies by industry: Grocery 12-20x/year, Apparel 4-6x, Electronics 6-8x, Auto 2-4x. Higher is better but too high risks stockouts. | Source: Wild (2022) McGraw-Hill; Investopedia."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. LTV
export function LTVCalculator({ lang }: { lang: Lang }) {
  const [arpu, setArpu] = useLocalState("ltv_arpu", "");
  const [churn, setChurn] = useLocalState("ltv_churn", "");
  
  const ltv = parseFloat(arpu) / (parseFloat(churn)/100);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "มูลค่าลูกค้าตลอดชีพ (LTV)" : "LTV"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "รายได้เฉลี่ยต่อลูกค้า (ARPU)" : "Avg Revenue Per User"}</label><NumericInput value={arpu} onChange={setArpu} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "อัตราการยกเลิก Churn Rate (%)" : "Churn Rate (%)"}</label><input type="number" value={churn} onChange={e=>setChurn(e.target.value)} className={inputClass} /></div>
      </div>
      {arpu && churn && !isNaN(ltv) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "LTV โดยประมาณ" : "Estimated LTV"}</p>
          <div className="text-4xl font-black text-green-600">{ltv.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — คำนวณทิป":"Tip Calculator FAQ"}>
          <FAQItem q={lang==="TH"?"ในไทยต้องให้ทิปเท่าไร?":"How much to tip in Thailand?"} a={lang==="TH"?"ไทยไม่บังคับทิป แต่มีธรรมเนียม: ร้านอาหารหรู 5-10% (บางร้านรวม Service Charge 10% แล้ว), แท็กซี่ ปัดขึ้นให้เลขกลม, พนักงานโรงแรม 20-50 บาท/ครั้ง, สปา 10-15% | อ้างอิง: TAT (การท่องเที่ยวแห่งประเทศไทย) — Thailand Travel Tips; Lonely Planet Thailand Guide.":"Thailand has no mandatory tipping. Customs: Upscale restaurant 5-10% (some include 10% service charge), Taxi round up, Hotel staff 20-50 THB, Spa 10-15%. | Source: TAT; Lonely Planet Thailand."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. CAC
export function CACCalculator({ lang }: { lang: Lang }) {
  const [spend, setSpend] = useLocalState("cac_spend", "");
  const [cust, setCust] = useLocalState("cac_cust", "");
  
  const cac = parseFloat(spend) / parseFloat(cust);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ต้นทุนได้ลูกค้าใหม่ (CAC)" : "CAC"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "งบการตลาด/ขายทั้งหมด" : "Total Marketing/Sales Spend"}</label><NumericInput value={spend} onChange={setSpend} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ลูกค้าใหม่ที่ได้" : "New Customers Acquired"}</label><input type="number" value={cust} onChange={e=>setCust(e.target.value)} className={inputClass} /></div>
      </div>
      {spend && cust && !isNaN(cac) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ต้นทุนต่อลูกค้า 1 คน" : "Cost Per Customer"}</p>
          <div className="text-4xl font-black text-green-600">{cac.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — LTV":"Customer LTV FAQ"}>
          <FAQItem q={lang==="TH"?"LTV/CAC Ratio ที่ดีคือเท่าไร?":"What is a good LTV/CAC ratio?"} a={lang==="TH"?"อัตราส่วน LTV:CAC ที่ดีคือ 3:1 ขึ้นไป หมายความว่ามูลค่าตลอดชีพลูกค้าควรมากกว่าต้นทุนการหาลูกค้า 3 เท่า ต่ำกว่า 1:1 = ขาดทุน, 1-3:1 = ควรปรับปรุง, 5:1+ = อาจลงทุนน้อยเกินไป | อ้างอิง: Harvard Business Review — The Value of Keeping the Right Customers (2014); Y Combinator — Startup School.":"Good LTV:CAC is 3:1+. Below 1:1 = losing money, 1-3:1 = needs improvement, 5:1+ = may be underinvesting. | Source: Harvard Business Review (2014); Y Combinator Startup School."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 8. Conversion Rate
export function ConversionRateCalculator({ lang }: { lang: Lang }) {
  const [visits, setVisits] = useLocalState("cr_vis", "");
  const [conv, setConv] = useLocalState("cr_conv", "");
  
  const cr = (parseFloat(conv) / parseFloat(visits)) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "Conversion Rate" : "Conversion Rate"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนผู้เข้าชม" : "Visitors"}</label><input type="number" value={visits} onChange={e=>setVisits(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนการซื้อ/เป้าหมาย" : "Conversions"}</label><input type="number" value={conv} onChange={e=>setConv(e.target.value)} className={inputClass} /></div>
      </div>
      {visits && conv && !isNaN(cr) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "Conversion Rate" : "Conversion Rate"}</p>
          <div className="text-4xl font-black text-green-600">{cr.toFixed(2)}%</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ROI":"ROI FAQ"}>
          <FAQItem q={lang==="TH"?"ROI ที่ดีคือกี่เปอร์เซ็นต์?":"What is a good ROI percentage?"} a={lang==="TH"?"ขึ้นอยู่กับประเภทการลงทุน: หุ้น S&P 500 เฉลี่ย 10%/ปี, อสังหาฯ 8-12%/ปี, ธุรกิจ SME คาดหวัง 15-25%/ปี, Startup VC คาดหวัง 10x+ ใน 5-7 ปี สำหรับ Digital Marketing ROI ≥ 400% ถือว่าดี | อ้างอิง: Damodaran A. — Historical Returns on Stocks, NYU Stern; Google Ads — Average ROI Benchmarks.":"Depends on investment: S&P 500 avg 10%/yr, Real estate 8-12%/yr, SME 15-25%/yr, VC expects 10x+ in 5-7 yrs. Digital marketing ROI ≥ 400% is good. | Source: Damodaran, NYU Stern; Google Ads Benchmarks."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 9. Inventory Turnover
export function InventoryTurnoverCalculator({ lang }: { lang: Lang }) {
  const [cogs, setCogs] = useLocalState("inv_cogs", "");
  const [avgInv, setAvg] = useLocalState("inv_avg", "");
  
  const turn = parseFloat(cogs) / parseFloat(avgInv);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "อัตราหมุนเวียนสินค้า" : "Inventory Turnover"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนขาย (COGS)" : "Cost of Goods Sold"}</label><NumericInput value={cogs} onChange={setCogs} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "สินค้าคงคลังเฉลี่ย" : "Average Inventory"}</label><NumericInput value={avgInv} onChange={setAvg} className={inputClass} /></div>
      </div>
      {cogs && avgInv && !isNaN(turn) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "อัตราการหมุนเวียน (รอบ)" : "Turnover Ratio"}</p>
          <div className="text-4xl font-black text-green-600">{turn.toFixed(2)}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — อัตราเติบโต":"Growth Rate FAQ"}>
          <FAQItem q={lang==="TH"?"CAGR คืออะไร? ต่างจาก Growth Rate ธรรมดาอย่างไร?":"What is CAGR vs simple growth rate?"} a={lang==="TH"?"CAGR (Compound Annual Growth Rate) คืออัตราเติบโตเฉลี่ยต่อปีแบบทบต้น ให้ภาพที่แม่นยำกว่า Simple Growth Rate เช่น ยอดขาย 100→200 ใน 3 ปี: Simple = 33%/ปี แต่ CAGR = 26%/ปี (เพราะคิดทบต้น) | อ้างอิง: CFA Institute — CAGR Definition; Investopedia — Compound Annual Growth Rate.":"CAGR = annualized compounded growth rate, more accurate than simple rate. E.g., 100→200 in 3 years: Simple = 33%/yr, CAGR = 26%/yr (compounded). | Source: CFA Institute; Investopedia."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
