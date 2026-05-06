"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

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
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{lang === "TH" ? "เปอร์เซ็นต์ส่วนลด" : "Discount Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาสินค้า" : "Original Price"}</label>
            <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนลด (%)" : "Discount (%)"}</label>
            <input type="number" value={discount} onChange={e=>setDiscount(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
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
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-1">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">{result.monthly.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "ไฟแนนซ์รถยนต์ (FAQ)" : "Car Loan FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยรถยนต์คิดแบบไหน?" : "How is car loan interest calculated?"}
          a={lang === "TH" ? "ดอกเบี้ยรถยนต์ในไทยมักจะคิดแบบ คงที่ (Flat Rate) คือนำยอดจัดไฟแนนซ์ x ดอกเบี้ย x จำนวนปี แล้วบวกกลับเข้าไปในยอดจัด ก่อนหารด้วยจำนวนเดือน" : "Usually Flat Rate interest."}
        />
      </SEOFAQ>
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
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl text-center border border-green-200 dark:border-green-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ยอดผ่อนชำระต่อเดือน" : "Monthly Payment"}</p>
          <div className="text-5xl font-black text-green-600 dark:text-green-400">{result.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "สินเชื่อบ้าน (FAQ)" : "Mortgage FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยบ้านคิดแบบไหน?" : "How is mortgage interest calculated?"}
          a={lang === "TH" ? "สินเชื่อบ้านในไทยส่วนใหญ่คิดดอกเบี้ยแบบ ลดต้นลดดอก (Effective Rate) หมายความว่ายิ่งคุณโปะเงินต้นมาก ดอกเบี้ยในงวดถัดไปก็จะลดลงตาม" : "Effective Rate (Reducing Balance)."}
        />
      </SEOFAQ>
    </div>
  );
}

// 5. Compound Interest
export function CompoundInterest({ lang }: { lang: Lang }) {
  const [principal, setPrincipal] = useLocalState("ci_principal", "10000");
  const [monthlyAddition, setMonthlyAddition] = useLocalState("ci_monthly", "1000");
  const [years, setYears] = useLocalState("ci_years", "10");
  const [rate, setRate] = useLocalState("ci_rate", "5");
  const [frequency, setFrequency] = useLocalState("ci_freq", "12"); // 12 for monthly
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal) || 0;
    const pmt = parseFloat(monthlyAddition) || 0;
    const y = parseInt(years) || 10;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseInt(frequency) || 12;

    let currentBalance = p;
    let totalContribution = p;
    const yearlyData = [];

    for (let year = 1; year <= y; year++) {
      for (let period = 1; period <= n; period++) {
        currentBalance *= (1 + r / n);
        if (n === 12) {
          currentBalance += pmt;
          totalContribution += pmt;
        } else if (n === 1 && period === 1) {
          currentBalance += (pmt * 12);
          totalContribution += (pmt * 12);
        }
      }
      yearlyData.push({
        year: year,
        balance: Math.round(currentBalance),
        invested: totalContribution
      });
    }

    setData(yearlyData);
    setTotal(Math.round(currentBalance));
    setTotalInvested(totalContribution);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "ดอกเบี้ยทบต้น" : "Compound Interest"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินต้น" : "Initial Principal"}</label>
            <input type="number" value={principal} onChange={e=>setPrincipal(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินสมทบต่อเดือน" : "Monthly Contribution"}</label>
            <input type="number" value={monthlyAddition} onChange={e=>setMonthlyAddition(e.target.value)} className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Years to Grow"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ผลตอบแทนคาดหวังต่อปี (%)" : "Interest Rate (%)"}</label>
            <input type="number" step="0.1" value={rate} onChange={e=>setRate(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณการเติบโต" : "Calculate Growth"}</button>
      </form>

      {total > 0 && data.length > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-500/30 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-1">{lang === "TH" ? "เงินรวมทั้งหมด" : "Total Balance"}</p>
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{total.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-1">{lang === "TH" ? "กำไรจากดอกเบี้ย" : "Total Interest"}</p>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{(total - totalInvested).toLocaleString()}</div>
            </div>
          </div>

          <div className="h-64 w-full bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" fontSize={12} tickMargin={10} />
                <YAxis width={60} tickFormatter={(value) => value > 1000000 ? (value/1000000).toFixed(1)+'M' : value > 1000 ? (value/1000).toFixed(0)+'k' : value} fontSize={12} />
                <RechartsTooltip formatter={(value) => typeof value === "number" ? value.toLocaleString() : String(value)} />
                <Line type="monotone" dataKey="balance" name={lang==="TH"?"ยอดรวม":"Balance"} stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="invested" name={lang==="TH"?"เงินต้น":"Principal"} stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "ดอกเบี้ยทบต้น (FAQ)" : "Compound Interest FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดอกเบี้ยทบต้นคืออะไร?" : "What is compound interest?"}
          a={lang === "TH" ? "ดอกเบี้ยทบต้น (Compound Interest) คือ การที่เราได้ดอกเบี้ยจากเงินต้น และในปีถัดไป ดอกเบี้ยนั้นจะถูกนำไปรวมกับเงินต้นเพื่อนำมาคำนวณเป็นดอกเบี้ยของปีต่อไป ทำให้เงินเติบโตแบบก้าวกระโดด (Exponential) หรือที่อัลเบิร์ต ไอน์สไตน์ เรียกว่าเป็น สิ่งมหัศจรรย์อันดับ 8 ของโลก" : "Interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods."}
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีคิดดอกเบี้ยทบต้นด้วยตัวเอง ทำอย่างไร?" : "How to calculate manually?"}
          a={lang === "TH" ? "สูตรคือ A = P(1 + r/n)^(nt) โดยที่ A = เงินรวม, P = เงินต้น, r = ดอกเบี้ยต่อปี, n = จำนวนครั้งที่ทบต้นใน 1 ปี, t = จำนวนปี" : "Formula: A = P(1 + r/n)^(nt)"}
        />
      </SEOFAQ>
    </div>
  );
}

// 6. Bill Splitter
export function BillSplitter({ lang }: { lang: Lang }) {
  const [subtotal, setSubtotal] = useLocalState("bill_subtotal", "");
  const [serviceCharge, setServiceCharge] = useLocalState("bill_service", "10");
  const [hasVat, setHasVat] = useLocalState("bill_has_vat", true);
  const [people, setPeople] = useLocalState("bill_people", "2");
  
  // Custom items for specific people
  const [specials, setSpecials] = useState<{name: string, price: string}[]>([]);
  const [result, setResult] = useState<any>(null);

  const addSpecial = () => setSpecials([...specials, {name: `เพื่อน ${specials.length + 1}`, price: ""}]);
  const updateSpecial = (index: number, field: "name"|"price", val: string) => {
    const newSpecials = [...specials];
    newSpecials[index][field] = val;
    setSpecials(newSpecials);
  };
  const removeSpecial = (index: number) => {
    setSpecials(specials.filter((_, i) => i !== index));
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const st = parseFloat(subtotal) || 0;
    const sc = parseFloat(serviceCharge) || 0;
    const pc = parseInt(people) || 1;

    // Calculate total multiplier (Service Charge + VAT)
    let totalMultiplier = 1;
    let serviceAmt = st * (sc / 100);
    let vatAmt = 0;
    if (hasVat) {
      vatAmt = (st + serviceAmt) * 0.07;
    }
    const finalTotal = st + serviceAmt + vatAmt;

    // Ratio to apply to special items (to add their fair share of SC and VAT)
    const ratio = finalTotal / st;

    let specialTotalAdjusted = 0;
    const processedSpecials = specials.map(s => {
      const p = parseFloat(s.price) || 0;
      const adjusted = p * ratio;
      specialTotalAdjusted += adjusted;
      return { name: s.name || "Special", pay: adjusted };
    });

    const remainingTotal = finalTotal - specialTotalAdjusted;
    const remainingPeople = pc - specials.length;
    let normalPay = 0;
    if (remainingPeople > 0 && remainingTotal > 0) {
      normalPay = remainingTotal / remainingPeople;
    }

    setResult({
      finalTotal,
      normalPay,
      remainingPeople,
      processedSpecials
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "หารค่าอาหาร" : "Bill Splitter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาอาหารรวม (Subtotal)" : "Subtotal"}</label>
          <input type="number" value={subtotal} onChange={e=>setSubtotal(e.target.value)} required className={`${inputClass} focus:ring-green-500`} placeholder={lang==="TH"?"ก่อนบวก SC/VAT":"Before SC/VAT"} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "Service Charge (%)" : "Service Charge (%)"}</label>
            <select value={serviceCharge} onChange={e=>setServiceCharge(e.target.value)} className={inputClass}>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
            </select>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={hasVat} onChange={e=>setHasVat(e.target.checked)} className="w-5 h-5 text-green-500 rounded border-gray-300 focus:ring-green-500" />
              {lang === "TH" ? "+ VAT 7%" : "+ VAT 7%"}
            </label>
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนคนทั้งหมด" : "Total People"}</label>
          <input type="number" min="1" value={people} onChange={e=>setPeople(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
        </div>

        {/* Special Menu Items */}
        <div className="pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              {lang === "TH" ? "มีคนสั่งแยก / จ่ายไม่เท่าเพื่อน?" : "Someone paying separately?"}
            </label>
            <button type="button" onClick={addSpecial} className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">+ {lang==="TH"?"เพิ่ม":"Add"}</button>
          </div>
          
          <div className="space-y-3">
            {specials.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={s.name} onChange={e=>updateSpecial(idx, "name", e.target.value)} placeholder={lang==="TH"?"ชื่อ":"Name"} className={`${inputClass} flex-1 py-2 text-sm`} />
                <input type="number" value={s.price} onChange={e=>updateSpecial(idx, "price", e.target.value)} placeholder={lang==="TH"?"ราคาเมนู":"Price"} className={`${inputClass} w-24 py-2 text-sm`} />
                <button type="button" onClick={()=>removeSpecial(idx)} className="text-red-500 p-2 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded">X</button>
              </div>
            ))}
          </div>
          {specials.length > 0 && <p className="text-xs text-gray-500 mt-2">*ระบบจะนำราคาแยกนี้ไปรวมคำนวณ SC และ VAT ให้อัตโนมัติ (และจะลบจำนวนคนเหล่านี้ออกจากกองกลาง)</p>}
        </div>

        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded-xl hover:bg-green-600 transition-colors shadow-md mt-4">{lang === "TH" ? "คำนวณยอดหาร" : "Split the Bill"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-500/30 text-center shadow-neo">
            <p className="text-gray-600 dark:text-gray-400 font-bold mb-2">{lang === "TH" ? "ยอดรวมสุทธิ (Net Total)" : "Net Total"}</p>
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">฿ {result.finalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            
            <div className="space-y-3 mt-4 text-left">
              {result.remainingPeople > 0 && (
                <div className="flex justify-between items-center p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <span className="font-bold text-gray-700 dark:text-gray-300">{lang==="TH"?"คนทั่วไปจ่าย (กองกลาง)":"Standard split"} <span className="text-xs text-gray-400">x{result.remainingPeople}</span></span>
                  <span className="text-xl font-black text-green-600 dark:text-green-400">฿ {Math.ceil(result.normalPay).toLocaleString()}</span>
                </div>
              )}
              
              {result.processedSpecials.map((s: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <span className="font-bold text-gray-700 dark:text-gray-300">{s.name} <span className="text-xs font-normal text-purple-500 ml-2">*(รวม SC/VAT)*</span></span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400">฿ {Math.ceil(s.pay).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">*ปัดเศษขึ้นเพื่อป้องกันยอดเงินขาด</p>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "หารค่าอาหาร (FAQ)" : "Bill Splitter FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "Service Charge คิดจากยอดไหน?" : "How is Service Charge calculated?"}
          a={lang === "TH" ? "ส่วนใหญ่ Service Charge 10% จะคิดจากราคาอาหารดิบ (Subtotal) ก่อนนำยอดรวมทั้งหมดไปคิด VAT 7% อีกครั้ง หรือที่เรียกกันว่า ++ (Net = (Price + 10%) + 7%)" : "Service charge is typically applied to the subtotal, and then VAT is applied to the combined amount (Subtotal + SC)."}
        />
        <FAQItem 
          q={lang === "TH" ? "ถ้ามีเพื่อนสั่งเบียร์หรือเมนูแพงๆ จะหารยังไงให้แฟร์?" : "How to fairly split when someone orders expensive items?"}
          a={lang === "TH" ? "คุณสามารถใช้ฟังก์ชัน 'คนสั่งแยก' ด้านบน โดยใส่ราคาเมนูนั้นๆ ระบบของเราจะนำยอดนั้นไปบวก SC และ VAT ตามสัดส่วนอย่างยุติธรรม และหักเพื่อนคนนั้นออกจากกองกลางอัตโนมัติ" : "Use our 'Someone paying separately' feature. The system will correctly apply the proportional SC and VAT to their specific items."}
        />
      </SEOFAQ>
    </div>
  );
}

// 7. Currency Converter
export function CurrencyConverter({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("cur_amount", "1000");
  const [fromCur, setFromCur] = useLocalState("cur_from", "USD");
  const [toCur, setToCur] = useLocalState("cur_to", "THB");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");

  const currencies = ["THB", "USD", "JPY", "KRW", "EUR", "CNY", "GBP", "SGD"];

  useEffect(() => {
    // Fetch live rates
    fetch("https://open.er-api.com/v6/latest/THB")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          // data.rates is relative to THB. So THB = 1. USD = ~0.028
          setRates(data.rates);
          setLastUpdate(data.time_last_update_utc);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch rates", err);
        // Fallback mock rates
        setRates({
          THB: 1, USD: 0.028, JPY: 4.15, KRW: 38.5, EUR: 0.026, CNY: 0.20, GBP: 0.022, SGD: 0.038
        });
        setLoading(false);
      });
  }, []);

  const swap = () => {
    const temp = fromCur;
    setFromCur(toCur);
    setToCur(temp);
  };

  let result = 0;
  let rateInfo = 0;
  if (!loading && rates[fromCur] && rates[toCur]) {
    // Math: amount / rateFrom * rateTo 
    // Wait, if THB base: 1 THB = 0.028 USD
    // If convert 10 USD to THB: 10 / 0.028 = 357 THB
    const amt = parseFloat(amount) || 0;
    const inTHB = amt / rates[fromCur];
    result = inTHB * rates[toCur];
    rateInfo = (1 / rates[fromCur]) * rates[toCur];
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "แปลงสกุลเงิน" : "Currency Converter"}</h2>
      <p className="text-sm text-gray-500 mb-6">{lang === "TH" ? "อัพเดตรายวันด้วย API จริง" : "Live daily exchange rates"}</p>
      
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <label className={labelClass}>{lang === "TH" ? "จำนวนเงิน" : "Amount"}</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className={`${inputClass} text-2xl font-bold text-center h-16 focus:ring-green-500`} />
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1">
            <label className={labelClass}>{lang === "TH" ? "จากสกุลเงิน" : "From"}</label>
            <select value={fromCur} onChange={e=>setFromCur(e.target.value)} className={inputClass}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <button onClick={swap} className="mt-6 p-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full transition-transform hover:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
          </button>

          <div className="flex-1">
            <label className={labelClass}>{lang === "TH" ? "เป็นสกุลเงิน" : "To"}</label>
            <select value={toCur} onChange={e=>setToCur(e.target.value)} className={inputClass}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-500/30 p-8 rounded-2xl text-center shadow-neo">
          {loading ? (
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="h-10 bg-green-200 dark:bg-green-700 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-bold mb-2">{amount || 0} {fromCur} =</p>
              <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
                {result.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} <span className="text-2xl">{toCur}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">1 {fromCur} = {rateInfo.toFixed(4)} {toCur}</p>
            </>
          )}
        </div>
      </motion.div>

      <SEOFAQ title={lang === "TH" ? "เครื่องแปลงสกุลเงิน (FAQ)" : "Currency Converter FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "อัตราแลกเปลี่ยนเชื่อถือได้ไหม?" : "Is the exchange rate reliable?"}
          a={lang === "TH" ? "ข้อมูลของเราดึงมาจาก Exchange Rate API แบบวันต่อวัน ซึ่งอ้างอิงจากอัตราแลกเปลี่ยนกลาง เหมาะสำหรับการประเมินและอ้างอิงเบื้องต้น (ธนาคารอาจจะมีค่าธรรมเนียมซื้อขายเพิ่มเติม)" : "We use daily exchange rates from a public API. It's accurate for mid-market estimations."}
        />
      </SEOFAQ>
    </div>
  );
}
