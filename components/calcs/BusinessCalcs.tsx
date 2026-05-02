"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, FAQ, FAQItem, ExportResult } from "./shared";

// 1. VAT
export function VatCalculator({ lang }: { lang: Lang }) {
  const [amount, setAmount] = useLocalState("vat_amt", "");
  const [vatRate, setVatRate] = useLocalState("vat_rate", "7");
  const [vatType, setVatType] = useLocalState("vat_type", "include");
  const [res, setRes] = useState<{net:number, vat:number, total:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(amount);
    const r = parseFloat(vatRate);
    if(a > 0 && r >= 0) {
      if(vatType === "include") {
        const net = a / (1 + r / 100);
        const vat = a - net;
        setRes({ net, vat, total: a });
      } else {
        const vat = a * (r / 100);
        setRes({ net: a, vat, total: a + vat });
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "คำนวณ VAT" : "VAT Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนเงิน" : "Amount"}</label>
            <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตรา VAT (%)" : "VAT Rate (%)"}</label>
            <input type="number" step="0.1" value={vatRate} onChange={e=>setVatRate(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="radio" value="include" checked={vatType==="include"} onChange={()=>setVatType("include")} className="w-4 h-4 text-green-500" />
            {lang === "TH" ? "ถอด VAT (ยอดนี้รวม VAT แล้ว)" : "Exclude VAT (Already included)"}
          </label>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="radio" value="exclude" checked={vatType==="exclude"} onChange={()=>setVatType("exclude")} className="w-4 h-4 text-green-500" />
            {lang === "TH" ? "เพิ่ม VAT (ยอดนี้ยังไม่รวม VAT)" : "Add VAT (Not included)"}
          </label>
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ยอดก่อน VAT":"Net Amount"}</p>
            <div className="text-lg font-bold text-gray-800 dark:text-white">{res.net.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">VAT {vatRate}%</p>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{res.vat.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-200 dark:border-green-500/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ยอดรวมสุทธิ":"Total"}</p>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{res.total.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <FAQ title={lang === "TH" ? "ภาษีมูลค่าเพิ่ม (FAQ)" : "VAT FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ถอด VAT คิดยังไง?" : "How to exclude VAT?"}
          a={lang === "TH" ? "ใช้สูตร: ยอดรวม ÷ (1 + อัตราVAT/100) จะได้ยอดก่อน VAT แล้วนำยอดรวมมาลบยอดก่อน VAT ก็จะได้เป็นค่า VAT ครับ" : "Total / (1 + Rate/100) = Net amount."}
        />
      </FAQ>
    </div>
  );
}

// 2. Margin
export function MarginCalculator({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("mar_cost", "");
  const [margin, setMargin] = useLocalState("mar_per", "30");
  const [res, setRes] = useState<{sellPrice:number, profit:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const c = parseFloat(cost);
    const m = parseFloat(margin);
    if(c > 0 && m < 100) {
      // Sell Price = Cost / (1 - Margin%)
      const sellPrice = c / (1 - (m / 100));
      setRes({ sellPrice, profit: sellPrice - c });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-500">{lang === "TH" ? "คำนวณราคาขาย (Margin)" : "Margin Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ต้นทุนสินค้า" : "Cost"}</label>
          <input type="number" value={cost} onChange={e=>setCost(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "กำไรที่ต้องการ (% Margin)" : "Target Margin (%)"}</label>
          <input type="number" value={margin} onChange={e=>setMargin(e.target.value)} required className={`${inputClass} focus:ring-green-500`} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600 shadow-md">{lang === "TH" ? "คำนวณราคาขาย" : "Calculate Sell Price"}</button>
      </form>
      {res && (
        <motion.div id="margin-result-card" initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl">
          <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-xl text-center border border-gray-200 dark:border-white/10">
            <p className="text-sm text-gray-500 dark:text-gray-400">{lang==="TH"?"คุณจะได้กำไร":"Your Profit"}</p>
            <div className="text-3xl font-black text-gray-800 dark:text-white">{res.profit.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center border border-green-200 dark:border-green-500/30">
            <p className="text-sm text-gray-500 dark:text-gray-400">{lang==="TH"?"คุณควรตั้งราคาขาย":"Suggested Price"}</p>
            <div className="text-3xl font-black text-green-600 dark:text-green-400">{res.sellPrice.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
          <div className="col-span-2 flex justify-center mt-2">
            <ExportResult elementId="margin-result-card" fileName="Margin_Result" lang={lang} />
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <FAQ title={lang === "TH" ? "Margin vs Markup (FAQ)" : "Margin FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "Margin ต่างจาก Markup อย่างไร?" : "Margin vs Markup?"}
          a={lang === "TH" ? "Margin คือสัดส่วนกำไรเทียบกับราคาขาย ส่วน Markup คือกำไรเทียบกับต้นทุน การตั้งราคาในธุรกิจค้าปลีกนิยมใช้ Margin มากกว่า เพื่อไม่ให้ขาดทุนเวลาจัดโปรโมชั่นลดราคา" : "Margin is profit based on sell price, Markup is based on cost."}
        />
      </FAQ>
    </div>
  );
}

