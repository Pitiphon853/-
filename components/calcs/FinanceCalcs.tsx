"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, FAQ, FAQItem } from "./shared";

// 2. Discount
export function DiscountCalculator({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("disc_price", "");
  const [discount, setDiscount] = useLocalState("disc_amount", "");
  const [result, setResult] = useState<{saved: number, finalPrice: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (p > 0 && d >= 0) {
      const saved = p * (d / 100);
      setResult({ saved, finalPrice: p - saved });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-yellow-600 dark:text-yellow-400">{lang === "TH" ? "เปอร์เซ็นต์ส่วนลด" : "Discount Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาสินค้า" : "Original Price"}</label>
            <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-yellow-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนลด (%)" : "Discount (%)"}</label>
            <input type="number" value={discount} onChange={e=>setDiscount(e.target.value)} required className={`${inputClass} focus:ring-yellow-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-yellow-400 font-bold text-black rounded hover:bg-yellow-500 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-6 bg-red-100 dark:bg-red-500/20 rounded-xl text-center border border-red-200 dark:border-red-500/30">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "ประหยัดไป" : "You Save"}</p>
            <div className="text-3xl font-black text-red-600 dark:text-red-400">-{result.saved.toLocaleString()}</div>
          </div>
          <div className="p-6 bg-green-100 dark:bg-green-500/20 rounded-xl text-center border border-green-200 dark:border-green-500/30">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "จ่ายจริง" : "Final Price"}</p>
            <div className="text-3xl font-black text-green-600 dark:text-green-400">{result.finalPrice.toLocaleString()}</div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 3. Car Loan
export function CarLoanCalculator({ lang }: { lang: Lang }) {
  const [price, setPrice] = useLocalState("car_price", "");
  const [down, setDown] = useLocalState("car_down", "");
  const [interest, setInterest] = useLocalState("car_int", "");
  const [years, setYears] = useLocalState("car_years", "5");
  const [result, setResult] = useState<{monthly: number, totalInt: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(down || "0");
    const i = parseFloat(interest);
    const y = parseInt(years);
    if (p > 0) {
      const finance = p - d;
      const totalInt = finance * (i / 100) * y;
      const monthly = (finance + totalInt) / (y * 12);
      setResult({ monthly: Math.ceil(monthly), totalInt: Math.ceil(totalInt) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "ผ่อนรถยนต์" : "Car Loan Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคารถ" : "Car Price"}</label>
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินดาวน์" : "Down Payment"}</label>
            <input type="number" value={down} onChange={e=>setDown(e.target.value)} className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={interest} onChange={e=>setInterest(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะเวลาผ่อน (ปี)" : "Years"}</label>
          <select value={years} onChange={e=>setYears(e.target.value)} className={`${inputClass} focus:ring-green-500`}>
            {[3,4,5,6,7,8].map(y => <option key={y} value={y}>{y} {lang === "TH" ? "ปี" : "Years"}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">{result.monthly.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <FAQ title={lang === "TH" ? "ไฟแนนซ์รถยนต์ (FAQ)" : "Car Loan FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยรถยนต์คิดแบบไหน?" : "How is car loan interest calculated?"}
          a={lang === "TH" ? "ดอกเบี้ยรถยนต์ในไทยมักจะคิดแบบ คงที่ (Flat Rate) คือนำยอดจัดไฟแนนซ์ x ดอกเบี้ย x จำนวนปี แล้วบวกกลับเข้าไปในยอดจัด ก่อนหารด้วยจำนวนเดือน" : "Usually Flat Rate interest."}
        />
      </FAQ>
    </div>
  );
}

// 4. Mortgage
export function MortgageCalculator({ lang }: { lang: Lang }) {
  const [loan, setLoan] = useLocalState("mort_loan", "");
  const [interest, setInterest] = useLocalState("mort_int", "");
  const [years, setYears] = useLocalState("mort_y", "30");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const P = parseFloat(loan);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (P > 0 && r > 0 && n > 0) {
      const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setResult(Math.ceil(m));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "คำนวณเงินกู้/บ้าน" : "Mortgage Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ยอดเงินกู้" : "Loan Amount"}</label>
          <input type="number" value={loan} onChange={e=>setLoan(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ดอกเบี้ยต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={interest} onChange={e=>setInterest(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Years"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400">{result.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <FAQ title={lang === "TH" ? "สินเชื่อบ้าน (FAQ)" : "Mortgage FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยบ้านคิดแบบไหน?" : "How is mortgage interest calculated?"}
          a={lang === "TH" ? "สินเชื่อบ้านในไทยส่วนใหญ่คิดดอกเบี้ยแบบ ลดต้นลดดอก (Effective Rate) หมายความว่ายิ่งคุณโปะเงินต้นมาก ดอกเบี้ยในงวดถัดไปก็จะลดลงตาม" : "Effective Rate (Reducing Balance)."}
        />
      </FAQ>
    </div>
  );
}
