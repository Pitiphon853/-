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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
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
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การเงิน)" : "Finance FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลการคำนวณนี้เป็นการประมาณการตามทฤษฎีเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุนหรือคำแนะนำทางกฎหมาย กรุณาปรึกษาที่ปรึกษาทางการเงินหรือนักบัญชีสำหรับการตัดสินใจขั้นสุดท้าย" : "This calculation is a theoretical estimate and does not constitute financial or legal advice. Please consult a financial advisor or accountant for your final decisions."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}
