"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Savings Goal
export function SavingsGoalCalculator({ lang }: { lang: Lang }) {
  const [goal, setGoal] = useLocalState("sav_goal", "");
  const [monthly, setMonthly] = useLocalState("sav_mon", "");

  const months = parseFloat(goal) / parseFloat(monthly);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "เป้าหมายการออม" : "Savings Goal"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนเงินเป้าหมาย" : "Goal Amount"}</label><input type="number" value={goal} onChange={e=>setGoal(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เงินออมต่อเดือน" : "Monthly Savings"}</label><input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} className={inputClass} /></div>
      </div>
      {goal && monthly && !isNaN(months) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "เวลาที่ใช้ (เดือน)" : "Months Needed"}</p>
          <div className="text-4xl font-black text-green-600">{Math.ceil(months)} {lang==="TH"?"เดือน":"Months"}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ภาษีเงินได้":"Income Tax FAQ"}>
          <FAQItem q={lang==="TH"?"อัตราภาษีเงินได้บุคคลธรรมดาไทยปี 2024 เท่าไร?":"What are Thailand's personal income tax rates in 2024?"} a={lang==="TH"?"ภาษีแบบขั้นบันได: 0-150,000 = ยกเว้น | 150,001-300,000 = 5% | 300,001-500,000 = 10% | 500,001-750,000 = 15% | 750,001-1,000,000 = 20% | 1,000,001-2,000,000 = 25% | 2,000,001-5,000,000 = 30% | 5,000,001+ = 35% หักค่าใช้จ่าย 50% ไม่เกิน 100,000 บาท | อ้างอิง: กรมสรรพากร — อัตราภาษีเงินได้บุคคลธรรมดา (2024).":"Progressive rates: 0-150K exempt, 150-300K 5%, 300-500K 10%, 500-750K 15%, 750K-1M 20%, 1-2M 25%, 2-5M 30%, 5M+ 35%. 50% expense deduction up to 100K. | Source: Thai Revenue Dept. (2024)."} />
          <FAQItem q={lang==="TH"?"ลดหย่อนภาษีได้อะไรบ้าง?":"What tax deductions are available?"} a={lang==="TH"?"ค่าลดหย่อนหลัก: ส่วนตัว 60,000 | คู่สมรส 60,000 | บุตร 30,000/คน | ประกันสังคม สูงสุด 9,000 | ประกันชีวิต สูงสุด 100,000 | กองทุน SSF/RMF สูงสุด 30% ของรายได้ | ดอกเบี้ยบ้าน สูงสุด 100,000 | เงินบริจาค 2 เท่า (ไม่เกิน 10%) | อ้างอิง: กรมสรรพากร — รายการลดหย่อนภาษี ปีภาษี 2024.":"Main deductions: Personal 60K, Spouse 60K, Child 30K each, Social Security max 9K, Life insurance max 100K, SSF/RMF max 30% income, Home loan interest max 100K, Donations 2x (max 10%). | Source: Thai Revenue Dept. (2024)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Inflation
export function InflationCalculator({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("inf_amt", "");
  const [rate, setRate] = useLocalState("inf_rate", "3");
  const [years, setYears] = useLocalState("inf_yrs", "10");

  // Future Cost = Amount * (1 + Rate/100)^Years
  const future = parseFloat(amount) * Math.pow(1 + parseFloat(rate)/100, parseFloat(years));

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณเงินเฟ้อ" : "Inflation Impact"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "มูลค่าปัจจุบัน" : "Current Amount"}</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "อัตราเงินเฟ้อ (%)" : "Inflation Rate (%)"}</label><input type="number" value={rate} onChange={e=>setRate(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "จำนวนปี" : "Years"}</label><input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {amount && rate && years && !isNaN(future) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "มูลค่าในอนาคต (ที่ต้องจ่าย)" : "Future Cost"}</p>
          <div className="text-4xl font-black text-green-600">{future.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ดอกเบี้ยทบต้น":"Compound Interest FAQ"}>
          <FAQItem q={lang==="TH"?"ดอกเบี้ยทบต้นทำงานอย่างไร?":"How does compound interest work?"} a={lang==="TH"?"ดอกเบี้ยทบต้นคือดอกเบี้ยที่คิดจากเงินต้น+ดอกเบี้ยสะสม สูตร: A = P(1+r/n)^(nt) เช่น ฝาก 100,000 บาท ดอกเบี้ย 5%/ปี ทบต้นรายเดือน 10 ปี = 164,701 บาท (ดอกเบี้ยเดี่ยวได้แค่ 150,000) Albert Einstein เรียกว่า 'สิ่งมหัศจรรย์อันดับ 8 ของโลก' | อ้างอิง: Investopedia — Compound Interest; SEC — Compound Interest Calculator.":"Interest on principal + accumulated interest. Formula: A = P(1+r/n)^(nt). E.g., 100K at 5%/yr compounded monthly for 10 yrs = 164,701 (simple interest = only 150K). | Source: Investopedia; SEC."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Salary to Hourly
export function SalaryToHourlyCalculator({ lang }: { lang: Lang }) {
  const [salary, setSalary] = useLocalState("sal_amt", "");
  const [hours, setHours] = useLocalState("sal_hrs", "40"); // weekly
  
  const hourly = parseFloat(salary) / (parseFloat(hours) * 52); // Assuming annual salary

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "แปลงเงินเดือนเป็นรายชั่วโมง" : "Salary to Hourly"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "เงินเดือน (รายปี)" : "Annual Salary"}</label><input type="number" value={salary} onChange={e=>setSalary(e.target.value)} className={inputClass} placeholder={lang==="TH"?"ถ้าเป็นรายเดือนให้คูณ 12 ก่อน":"Yearly total"} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ชั่วโมงทำงาน (ต่อสัปดาห์)" : "Hours per Week"}</label><input type="number" value={hours} onChange={e=>setHours(e.target.value)} className={inputClass} /></div>
      </div>
      {salary && hours && !isNaN(hourly) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "รายได้ต่อชั่วโมง" : "Hourly Rate"}</p>
          <div className="text-4xl font-black text-green-600">{hourly.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงสกุลเงิน":"Currency FAQ"}>
          <FAQItem q={lang==="TH"?"แลกเงินที่ไหนได้เรทดีที่สุด?":"Where to get the best exchange rate?"} a={lang==="TH"?"เรทดีที่สุด: 1) ร้านแลกเงินเอกชน (SuperRich, Vasu) เรทดีกว่าธนาคาร 2-5% 2) ธนาคาร (สาขาสนามบินเรทแย่ที่สุด) 3) บัตร Debit ถอน ATM ต่างประเทศ (ดูค่า FX Fee) หลีกเลี่ยงการแลกที่สนามบินและโรงแรม | อ้างอิง: ธนาคารแห่งประเทศไทย — อัตราแลกเปลี่ยนอ้างอิง; XE.com.":"Best rates: 1) Licensed money changers (SuperRich, Vasu) 2-5% better than banks 2) Banks (airport branches worst) 3) Debit cards abroad (check FX fees). Avoid airport/hotel exchanges. | Source: Bank of Thailand; XE.com."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Net Worth
export function NetWorthCalculator({ lang }: { lang: Lang }) {
  const [assets, setAssets] = useLocalState("nw_assets", "");
  const [liab, setLiab] = useLocalState("nw_liab", "");
  
  const nw = parseFloat(assets) - parseFloat(liab);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ความมั่งคั่งสุทธิ" : "Net Worth"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ทรัพย์สินรวม (Assets)" : "Total Assets"}</label><input type="number" value={assets} onChange={e=>setAssets(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "หนี้สินรวม (Liabilities)" : "Total Liabilities"}</label><input type="number" value={liab} onChange={e=>setLiab(e.target.value)} className={inputClass} /></div>
      </div>
      {assets && liab && !isNaN(nw) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ความมั่งคั่งสุทธิ" : "Net Worth"}</p>
          <div className={`text-4xl font-black ${nw >= 0 ? "text-green-600" : "text-red-500"}`}>{nw.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — เงินเฟ้อ":"Inflation FAQ"}>
          <FAQItem q={lang==="TH"?"เงินเฟ้อส่งผลต่อเงินออมอย่างไร?":"How does inflation affect savings?"} a={lang==="TH"?"เงินเฟ้อทำให้อำนาจซื้อลดลง เช่น เงินเฟ้อ 3%/ปี เงิน 1,000,000 บาทวันนี้จะมีอำนาจซื้อเท่ากับ 744,094 บาทใน 10 ปี และ 553,676 บาทใน 20 ปี ดังนั้นดอกเบี้ยออมทรัพย์ 0.5%/ปี จริงๆ แล้วขาดทุน 2.5%/ปี | อ้างอิง: ธนาคารแห่งประเทศไทย — เป้าหมายเงินเฟ้อ; สำนักงานสถิติแห่งชาติ — ดัชนีราคาผู้บริโภค (CPI).":"Inflation reduces purchasing power. At 3%/yr, 1M THB today = 744K in 10 yrs, 554K in 20 yrs. So 0.5% savings interest actually loses 2.5%/yr in real terms. | Source: Bank of Thailand; Thai National Statistical Office — CPI."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Debt Payoff
export function DebtPayoffCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-green-600">Debt Payoff Calculator (WIP)</h2></div>;
}

// 6. Retirement
export function RetirementCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-green-600">Retirement Calculator (WIP)</h2></div>;
}

// 7. Stock Profit
export function StockProfitCalculator({ lang }: { lang: Lang }) {
  const [buyPrice, setBuy] = useLocalState("stk_buy", "");
  const [sellPrice, setSell] = useLocalState("stk_sell", "");
  const [shares, setShares] = useLocalState("stk_shr", "");
  
  const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * parseFloat(shares);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "กำไรหุ้น" : "Stock Profit"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ราคาซื้อ" : "Buy Price"}</label><input type="number" value={buyPrice} onChange={e=>setBuy(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย" : "Sell Price"}</label><input type="number" value={sellPrice} onChange={e=>setSell(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนหุ้น" : "Shares"}</label><input type="number" value={shares} onChange={e=>setShares(e.target.value)} className={inputClass} /></div>
      </div>
      {buyPrice && sellPrice && shares && !isNaN(profit) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "กำไร/ขาดทุน (ยังไม่หักค่าธรรมเนียม)" : "Profit/Loss (Excl. fees)"}</p>
          <div className={`text-4xl font-black ${profit >= 0 ? "text-green-600" : "text-red-500"}`}>{profit.toLocaleString()}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ภาษีมูลค่าเพิ่ม":"VAT FAQ"}>
          <FAQItem q={lang==="TH"?"VAT 7% ในไทยคิดอย่างไร?":"How is Thailand's 7% VAT calculated?"} a={lang==="TH"?"VAT ไทย 7% (ลดจาก 10% ตามพระราชกฤษฎีกา) คิดจากราคาสินค้า/บริการ สูตร: ราคารวม VAT = ราคา × 1.07 หรือ VAT = ราคารวม × 7/107 ธุรกิจที่มีรายได้เกิน 1.8 ล้าน/ปี ต้องจดทะเบียน VAT | อ้างอิง: กรมสรรพากร — ภาษีมูลค่าเพิ่ม; ประมวลรัษฎากร มาตรา 77-95.":"Thai VAT is 7% (reduced from 10%). Formula: Price with VAT = Price × 1.07. VAT amount = Total × 7/107. Businesses with >1.8M THB/yr revenue must register. | Source: Thai Revenue Dept.; Revenue Code §77-95."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 8. ROI
export function ROICalculator({ lang }: { lang: Lang }) {
  const [invested, setInv] = useLocalState("roi_inv", "");
  const [returned, setRet] = useLocalState("roi_ret", "");
  
  const roi = ((parseFloat(returned) - parseFloat(invested)) / parseFloat(invested)) * 100;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "ผลตอบแทน ROI" : "ROI"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "เงินลงทุน" : "Amount Invested"}</label><input type="number" value={invested} onChange={e=>setInv(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "เงินที่ได้รับกลับมา" : "Amount Returned"}</label><input type="number" value={returned} onChange={e=>setRet(e.target.value)} className={inputClass} /></div>
      </div>
      {invested && returned && !isNaN(roi) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ROI (%)" : "Return on Investment (%)"}</p>
          <div className={`text-4xl font-black ${roi >= 0 ? "text-green-600" : "text-red-500"}`}>{roi.toFixed(2)}%</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สินเชื่อบ้าน":"Mortgage FAQ"}>
          <FAQItem q={lang==="TH"?"ดอกเบี้ยบ้านไทยปี 2024 เท่าไร?":"What are Thai mortgage rates in 2024?"} a={lang==="TH"?"ดอกเบี้ยบ้าน 2024: MRR ธนาคารใหญ่ 6.65-7.15% ปีแรกโปรโมชั่น 2.5-3.5% (คงที่ 1-3 ปี) สินเชื่อบ้านผ่อนได้สูงสุด 30-35 ปี วงเงินอนุมัติ 80-95% ของราคาประเมิน ค่างวดไม่ควรเกิน 40% ของรายได้ | อ้างอิง: ธนาคารแห่งประเทศไทย — อัตรา MRR; สมาคมธนาคารไทย — สินเชื่อที่อยู่อาศัย.":"2024 rates: MRR 6.65-7.15%, promotional first-year 2.5-3.5% (fixed 1-3 yrs). Max term 30-35 yrs, LTV 80-95%. Monthly payment should not exceed 40% of income. | Source: BOT — MRR rates; Thai Bankers Association."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
