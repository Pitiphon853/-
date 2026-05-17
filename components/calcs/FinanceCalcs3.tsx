"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, NumericInput } from "./shared";

// 1. DCA Calculator
export function DCACalculator({ lang }: { lang: Lang }) {
  const [monthly, setMonthly] = useLocalState("dca_m", "5000");
  const [years, setYears] = useLocalState("dca_y", "10");
  const [rate, setRate] = useLocalState("dca_r", "8");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(monthly);
    const y = parseInt(years);
    const r = parseFloat(rate) / 100 / 12;
    const n = y * 12;
    
    if (p > 0 && y > 0) {
      const invested = p * n;
      const futureValue = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      setResult({
        invested: invested,
        futureValue: futureValue,
        profit: futureValue - invested
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "คำนวณ DCA (Dollar Cost Averaging)" : "DCA Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เงินลงทุนต่อเดือน (บาท)" : "Monthly Investment"}</label>
          <NumericInput value={monthly} onChange={setMonthly} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Duration (Years)"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ผลตอบแทนคาดหวัง (% ต่อปี)" : "Expected Return (%)"}</label>
            <input type="number" step="0.1" value={rate} onChange={e=>setRate(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณผลตอบแทน":"Calculate Returns"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"มูลค่าพอร์ตในอนาคต":"Future Portfolio Value"}</div>
             <div className="text-4xl font-black text-green-600">฿{Math.round(result.futureValue).toLocaleString()}</div>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white dark:bg-white/5 border rounded text-center">
               <div className="text-sm text-gray-500">{lang==="TH"?"เงินต้นรวม":"Total Invested"}</div>
               <div className="text-xl font-bold">฿{Math.round(result.invested).toLocaleString()}</div>
             </div>
             <div className="p-4 bg-white dark:bg-white/5 border rounded text-center">
               <div className="text-sm text-gray-500">{lang==="TH"?"กำไรคาดหวัง":"Expected Profit"}</div>
               <div className="text-xl font-bold text-green-500">+฿{Math.round(result.profit).toLocaleString()}</div>
             </div>
           </div>
           <p className="text-xs text-gray-400 text-center mt-2">*{lang==="TH"?"การลงทุนมีความเสี่ยง ผลลัพธ์นี้เป็นเพียงการจำลองทางคณิตศาสตร์เท่านั้น ไม่ใช่คำแนะนำการลงทุน":"Investments carry risk. This is a mathematical simulation, not financial advice."}</p>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — DCA (Dollar Cost Averaging)":"DCA FAQ"}>
        <FAQItem q={lang==="TH"?"DCA คืออะไร? ดีกว่าลงทุนก้อนเดียวไหม?":"What is DCA? Is it better than lump sum?"} a={lang==="TH"?"DCA คือการลงทุนสม่ำเสมอทุกเดือนด้วยจำนวนเงินเท่ากัน ช่วยลดความเสี่ยงจากการเข้าตลาดผิดจังหวะ งานวิจัยพบว่า Lump Sum ให้ผลตอบแทนดีกว่า 2 ใน 3 ของเวลา แต่ DCA ลดความเสี่ยงด้านจิตวิทยาและความผันผวน | อ้างอิง: Vanguard (2012) Dollar-Cost Averaging vs Lump Sum Investing.":"DCA is investing a fixed amount regularly. Research shows Lump Sum outperforms 2/3 of the time, but DCA reduces psychological risk and volatility. Source: Vanguard (2012) DCA vs Lump Sum Study."} />
        <FAQItem q={lang==="TH"?"ผลตอบแทน 8% ต่อปี สมเหตุสมผลไหม?":"Is 8% annual return realistic?"} a={lang==="TH"?"S&P 500 ให้ผลตอบแทนเฉลี่ย 10% ต่อปี (ก่อนหักเงินเฟ้อ) หรือ 7% หลังหักเงินเฟ้อ ในไทย SET Index เฉลี่ย 7-9% ต่อปี | อ้างอิง: Damodaran (NYU Stern) Historical Returns Database.":"S&P 500 averages ~10% annually (before inflation) or ~7% real. Thai SET averages 7-9%. Source: Damodaran (NYU Stern) Historical Returns."} />
        <FAQItem q={lang==="TH"?"ควร DCA เท่าไหร่ต่อเดือน?":"How much should I DCA monthly?"} a={lang==="TH"?"กฎทั่วไปคือ 10-20% ของรายได้ต่อเดือน ตามกฎ 50/30/20 ควรจัดสรร 20% เพื่อออมและลงทุน เริ่มต้นน้อยๆ ดีกว่าไม่เริ่มเลย | อ้างอิง: Elizabeth Warren (2005). All Your Worth: The Ultimate Lifetime Money Plan.":"General rule: 10-20% of monthly income. The 50/30/20 rule suggests 20% for savings/investment. Starting small is better than not starting. Source: Warren (2005) All Your Worth."} />
      </SEOFAQ>
    </div>
  );
}

// 2. Stock Trading Fees
export function StockFeeCalculator({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("stk_amt", "100000");
  const [feePercent, setFeePercent] = useLocalState("stk_fee", "0.157"); // Default internet broker rate TH
  const [type, setType] = useLocalState("stk_type", "buy");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    const fee = parseFloat(feePercent) / 100;
    
    if (amt > 0) {
      const commission = amt * fee;
      const vat = commission * 0.07;
      const totalFee = commission + vat;
      
      setResult({
        commission: commission,
        vat: vat,
        totalFee: totalFee,
        net: type === "buy" ? amt + totalFee : amt - totalFee
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "คำนวณค่าธรรมเนียมซื้อขายหุ้น" : "Stock Trading Fees"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "มูลค่าการซื้อขาย (บาท)" : "Trading Value"}</label>
          <NumericInput value={amount} onChange={setAmount} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าคอมมิชชั่น (%)" : "Commission (%)"}</label>
            <input type="number" step="0.001" value={feePercent} onChange={e=>setFeePercent(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภท" : "Type"}</label>
            <select value={type} onChange={e=>setType(e.target.value)} className={`${inputClass} focus:ring-green-400`}>
              <option value="buy">{lang==="TH"?"ซื้อ (Buy)":"Buy"}</option>
              <option value="sell">{lang==="TH"?"ขาย (Sell)":"Sell"}</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200">
           <div className="space-y-2 text-gray-700 dark:text-gray-300">
             <div className="flex justify-between"><span>{lang==="TH"?"ค่าคอมมิชชั่น":"Commission"}:</span> <span>฿{result.commission.toFixed(2)}</span></div>
             <div className="flex justify-between"><span>VAT (7%):</span> <span>฿{result.vat.toFixed(2)}</span></div>
             <div className="flex justify-between font-bold text-red-500 border-t pt-2"><span>{lang==="TH"?"ค่าธรรมเนียมรวม":"Total Fees"}:</span> <span>฿{result.totalFee.toFixed(2)}</span></div>
           </div>
           <div className="mt-6 text-center">
             <div className="text-sm text-gray-500 mb-1">{type === "buy" ? (lang==="TH"?"ยอดเงินที่ต้องจ่ายรวม":"Total Amount to Pay") : (lang==="TH"?"ยอดเงินที่จะได้รับสุทธิ":"Net Amount Received")}</div>
             <div className="text-3xl font-black text-green-600">฿{result.net.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — ค่าธรรมเนียมซื้อขายหุ้น":"Stock Trading Fees FAQ"}>
        <FAQItem q={lang==="TH"?"ค่าคอมมิชชั่นซื้อขายหุ้นไทยอยู่ที่เท่าไร?":"What are typical Thai stock trading commissions?"} a={lang==="TH"?"อัตราเฉลี่ยอยู่ที่ 0.15-0.25% ของมูลค่าซื้อขาย (Internet Trading) ยังต้องเสีย VAT 7% ของค่าคอมมิชชั่นอีก โบรกเกอร์ออนไลน์ราคาถูกสุดเริ่ม 0.10% | อ้างอิง: SET (ตลาดหลักทรัพย์แห่งประเทศไทย) Commission Rates.":"Average is 0.15-0.25% of trade value (Internet Trading) plus 7% VAT on commission. Discount brokers start at 0.10%. Source: SET (Stock Exchange of Thailand) Commission Rates."} />
        <FAQItem q={lang==="TH"?"ซื้อหุ้นขั้นต่ำกี่บาท?":"What's the minimum to start trading Thai stocks?"} a={lang==="TH"?"ขั้นต่ำคือ 100 หุ้น (1 board lot) ราคาต่ำสุดอยู่ที่ประมาณ 0.01 บาท/หุ้น แต่ในทางปฏิบัติควรมีเงิน 5,000-10,000 บาทขึ้นไป เพื่อให้ค่าธรรมเนียมไม่กินกำไร | อ้างอิง: SET Investor Education.":"Minimum is 100 shares (1 board lot). Practically, start with 5,000-10,000 THB+ so fees don't eat profits. Source: SET Investor Education."} />
      </SEOFAQ>
    </div>
  );
}

// 3. Net Salary (TH)
export function NetSalaryCalculator({ lang }: { lang: Lang }) {
  const [salary, setSalary] = useLocalState("sal_base", "30000");
  const [allowance, setAllowance] = useLocalState("sal_allow", "0");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const s = parseFloat(salary);
    const a = parseFloat(allowance) || 0;
    if (s > 0) {
      const gross = s + a;
      const sso = Math.min(s * 0.05, 750); // Social Security max 750 THB
      // Rough tax estimation (simple)
      const yearly = gross * 12;
      let tax = 0;
      if (yearly > 150000) {
        tax = (yearly - 150000) * 0.05 / 12; // Very simplified
      }
      
      const net = gross - sso - tax;
      setResult({ gross, sso, tax, net });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "คำนวณเงินเดือนสุทธิ" : "Net Salary Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินเดือนฐาน" : "Base Salary"}</label>
            <NumericInput value={salary} onChange={setSalary} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินพิเศษ/เบี้ยเลี้ยง" : "Allowances"}</label>
            <NumericInput value={allowance} onChange={setAllowance} className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"เงินเดือนสุทธิที่จะได้รับ":"Net Salary (Take-home)"}</div>
             <div className="text-4xl font-black text-green-600">฿{Math.round(result.net).toLocaleString()}</div>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="p-3 bg-white border rounded text-red-500">- ประกันสังคม: ฿{result.sso.toLocaleString()}</div>
             <div className="p-3 bg-white border rounded text-red-500">- ภาษี (ประมาณ): ฿{Math.round(result.tax).toLocaleString()}</div>
           </div>
           <p className="text-xs text-gray-500">*{lang==="TH"?"เป็นการประมาณการเบื้องต้น ภาษีจริงอาจต่างออกไปตามค่าลดหย่อน":"Estimation only. Actual tax depends on your deductions."}</p>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — เงินเดือนสุทธิ":"Net Salary FAQ"}>
        <FAQItem q={lang==="TH"?"ประกันสังคมหักเท่าไร?":"How much is Social Security deduction?"} a={lang==="TH"?"ผู้ประกันตนมาตรา 33 (ลูกจ้าง) หักเงินสมทบ 5% ของเงินเดือน แต่ไม่เกิน 750 บาท/เดือน (ฐานเงินเดือนสูงสุดที่ 15,000 บาท) นายจ้างสมทบเท่ากัน | อ้างอิง: สำนักงานประกันสังคม (SSO).":"Section 33 insured (employees) pay 5% of salary, capped at 750 THB/month (based on max salary of 15,000 THB). Employer matches equally. Source: SSO Thailand."} />
        <FAQItem q={lang==="TH"?"ภาษีเงินได้บุคคลธรรมดาคำนวณอย่างไร?":"How is Thai personal income tax calculated?"} a={lang==="TH"?"ภาษีไทยเป็นอัตราก้าวหน้า: 0-150K = 0% / 150K-300K = 5% / 300K-500K = 10% / 500K-750K = 15% / 750K-1M = 20% / 1M-2M = 25% / 2M-5M = 30% / 5M+ = 35% ก่อนคำนวณต้องหักค่าลดหย่อนก่อน | อ้างอิง: กรมสรรพากร (Revenue Department).":"Thai tax uses progressive rates: 0-150K = 0% / 150K-300K = 5% / 300K-500K = 10% / etc. up to 35%. Deductions are applied before calculation. Source: Thai Revenue Department."} />
        <FAQItem q={lang==="TH"?"ค่าลดหย่อนอะไรบ้างที่ใช้ได้?":"What tax deductions are available?"} a={lang==="TH"?"ค่าลดหย่อนหลัก: ส่วนตัว 60,000 บาท, คู่สมรส 60,000, ลูก 30,000-60,000/คน, พ่อแม่ 30,000/คน, ประกันสังคม (ตามจริง), ประกันชีวิต สูงสุด 100,000, LTF/SSF/RMF ตามเงื่อนไข | อ้างอิง: กรมสรรพากร (2024).":"Key deductions: Personal 60,000 THB, Spouse 60,000, Child 30,000-60,000, Parents 30,000 each, SSF/RMF per conditions. Source: Revenue Department (2024)."} />
      </SEOFAQ>
    </div>
  );
}

// 4. Expense Tracker 50/30/20
export function ExpenseTrackerCalculator({ lang }: { lang: Lang }) {
  const [income, setIncome] = useLocalState("exp_inc", "30000");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = parseFloat(income);
    if (inc > 0) {
      setResult({
        needs: inc * 0.50,
        wants: inc * 0.30,
        savings: inc * 0.20
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "จัดสรรเงิน 50/30/20" : "50/30/20 Budgeting"}</h2>
      <p className="text-sm text-gray-500 mb-6">{lang==="TH"?"วางแผนการเงินตามกฎ 50/30/20":"Plan your budget using the 50/30/20 rule"}</p>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "รายรับรายเดือนสุทธิ" : "Monthly Net Income"}</label>
          <NumericInput value={income} onChange={setIncome} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"แบ่งสัดส่วน":"Calculate Budget"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
             <div className="font-bold text-blue-700">50% Needs ({lang==="TH"?"สิ่งที่จำเป็น":"Essentials"})</div>
             <div className="text-2xl font-black text-blue-800 mt-1">฿{result.needs.toLocaleString()}</div>
             <div className="text-sm text-blue-600 mt-1">{lang==="TH"?"ค่าบ้าน, ค่ารถ, หนี้, อาหารหลัก, น้ำไฟ":"Rent, Utilities, Groceries, Debt"}</div>
           </div>
           <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
             <div className="font-bold text-pink-700">30% Wants ({lang==="TH"?"สิ่งที่ต้องการ":"Personal"})</div>
             <div className="text-2xl font-black text-pink-800 mt-1">฿{result.wants.toLocaleString()}</div>
             <div className="text-sm text-pink-600 mt-1">{lang==="TH"?"ช้อปปิ้ง, ดูหนัง, กินเลี้ยง, ท่องเที่ยว":"Shopping, Dining out, Entertainment"}</div>
           </div>
           <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
             <div className="font-bold text-green-700">20% Savings ({lang==="TH"?"เงินออม/ลงทุน":"Savings/Invest"})</div>
             <div className="text-2xl font-black text-green-800 mt-1">฿{result.savings.toLocaleString()}</div>
             <div className="text-sm text-green-600 mt-1">{lang==="TH"?"กองทุน, หุ้น, เงินสำรองฉุกเฉิน":"Emergency fund, Stocks, Retirement"}</div>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — กฎ 50/30/20":"50/30/20 Budget FAQ"}>
        <FAQItem q={lang==="TH"?"กฎ 50/30/20 คืออะไร? ใครคิดค้น?":"What is the 50/30/20 rule?"} a={lang==="TH"?"กฎ 50/30/20 ถูกคิดค้นโดย Elizabeth Warren และ Amelia Warren Tyagi ในหนังสือ 'All Your Worth' (2005) แบ่ง 50% สำหรับสิ่งจำเป็น 30% สิ่งที่ต้องการ 20% ออม/ลงทุน | อ้างอิง: Warren & Tyagi (2005). All Your Worth.":"Created by Elizabeth Warren and Amelia Warren Tyagi in 'All Your Worth' (2005). Split: 50% Needs, 30% Wants, 20% Savings. Source: Warren & Tyagi (2005)."} />
        <FAQItem q={lang==="TH"?"เงินเดือน 30,000 บาท จัดสรรยังไง?":"How to budget 30,000 THB salary?"} a={lang==="TH"?"ตามกฎ 50/30/20: 15,000 บาท (ค่าบ้าน ค่ากิน ค่าเดินทาง) + 9,000 บาท (ช้อปปิ้ง ดูหนัง สังสรรค์) + 6,000 บาท (ออม ลงทุน) ถ้าค่าครองชีพสูง อาจปรับเป็น 60/20/20 | อ้างอิง: SCB EIC Economic Report (2023).":"Under 50/30/20: 15,000 (rent, food, transport) + 9,000 (entertainment) + 6,000 (savings). Adjust to 60/20/20 in high-cost areas. Source: SCB EIC (2023)."} />
      </SEOFAQ>
    </div>
  );
}
