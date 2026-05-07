"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

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
          <input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
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
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
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
            <input type="number" value={salary} onChange={e=>setSalary(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินพิเศษ/เบี้ยเลี้ยง" : "Allowances"}</label>
            <input type="number" value={allowance} onChange={e=>setAllowance(e.target.value)} className={`${inputClass} focus:ring-green-400`} />
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
          <input type="number" value={income} onChange={e=>setIncome(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
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
    </div>
  );
}
