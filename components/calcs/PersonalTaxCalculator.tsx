"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, ExportResult, RelatedCalcs } from "./shared";
import { ShareButtons } from "../ShareButtons";

const brackets = [
  { min: 0, max: 150000, rate: 0, label: "0 - 150,000" },
  { min: 150000, max: 300000, rate: 5, label: "150,001 - 300,000" },
  { min: 300000, max: 500000, rate: 10, label: "300,001 - 500,000" },
  { min: 500000, max: 750000, rate: 15, label: "500,001 - 750,000" },
  { min: 750000, max: 1000000, rate: 20, label: "750,001 - 1,000,000" },
  { min: 1000000, max: 2000000, rate: 25, label: "1,000,001 - 2,000,000" },
  { min: 2000000, max: 5000000, rate: 30, label: "2,000,001 - 5,000,000" },
  { min: 5000000, max: Infinity, rate: 35, label: "5,000,001 ขึ้นไป" },
];

function calcTax(netIncome: number) {
  let tax = 0;
  const breakdown: { bracket: string; rate: number; taxable: number; tax: number }[] = [];
  for (const b of brackets) {
    if (netIncome <= b.min) break;
    const taxable = Math.min(netIncome, b.max) - b.min;
    const t = taxable * (b.rate / 100);
    tax += t;
    if (taxable > 0) breakdown.push({ bracket: b.label, rate: b.rate, taxable, tax: t });
  }
  return { tax, breakdown };
}

export function PersonalTaxCalculator({ lang, setCalc }: { lang: Lang; setCalc: (id: string) => void }) {
  const [income, setIncome] = useLocalState("tax_income", "");
  const [socialSec, setSocialSec] = useLocalState("tax_socialSec", "9000");
  const [lifeIns, setLifeIns] = useLocalState("tax_lifeIns", "0");
  const [rmfSsf, setRmfSsf] = useLocalState("tax_rmfSsf", "0");
  const [personalDed] = useState("60000");
  const [expenseRate] = useState("100000");

  const [result, setResult] = useState<null | {
    netIncome: number;
    tax: number;
    effectiveRate: number;
    breakdown: { bracket: string; rate: number; taxable: number; tax: number }[];
  }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = parseFloat(income) || 0;
    const expense = Math.min(inc * 0.5, parseFloat(expenseRate));
    const deductions =
      parseFloat(personalDed) +
      (parseFloat(socialSec) || 0) +
      (parseFloat(lifeIns) || 0) +
      (parseFloat(rmfSsf) || 0);
    const netIncome = Math.max(0, inc - expense - deductions);
    const { tax, breakdown } = calcTax(netIncome);
    const effectiveRate = inc > 0 ? (tax / inc) * 100 : 0;
    setResult({ netIncome, tax, effectiveRate, breakdown });
  };

  const fmt = (n: number) =>
    n.toLocaleString(lang === "TH" ? "th-TH" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
      {/* Header */}
      <h2 className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">
        {lang === "TH" ? "คำนวณภาษีเงินได้บุคคลธรรมดา" : "Personal Income Tax"}
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        {lang === "TH"
          ? "คำนวณภาษีปีภาษี 2569 ตามเกณฑ์ขั้นบันไดของกรมสรรพากรสำหรับพนักงานและฟรีแลนซ์"
          : "Calculate tax for year 2026 based on Revenue Department rules."}
      </p>

      {/* Input Form */}
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "รายได้สะสมต่อปี (บาท) *" : "Annual Income (THB) *"}
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            placeholder={lang === "TH" ? "เช่น 600000" : "e.g. 600000"}
            className={`${inputClass} focus:ring-green-400`}
          />
          <p className="text-xs text-gray-500 mt-1">
            {lang === "TH" ? "เงินเดือน × 12 เดือน หรือรายได้ทั้งหมดในปีนี้" : "Salary × 12 or total annual revenue"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              {lang === "TH" ? "ค่าลดหย่อนส่วนตัว" : "Personal Deduction"}
            </label>
            <input
              type="number"
              value={personalDed}
              disabled
              className={`${inputClass} opacity-60 bg-gray-100 dark:bg-white/10`}
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === "TH" ? "ลดหย่อนพื้นฐาน 60,000 บาท" : "Standard 60,000 THB"}
            </p>
          </div>
          <div>
            <label className={labelClass}>
              {lang === "TH" ? "ประกันสังคม (สูงสุด 9,000)" : "Social Security (Max 9,000)"}
            </label>
            <input
              type="number"
              value={socialSec}
              onChange={(e) => setSocialSec(e.target.value)}
              max="9000"
              className={`${inputClass} focus:ring-green-400`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              {lang === "TH" ? "เบี้ยประกันชีวิต (สูงสุด 100,000)" : "Life Insurance (Max 100,000)"}
            </label>
            <input
              type="number"
              value={lifeIns}
              onChange={(e) => setLifeIns(e.target.value)}
              max="100000"
              className={`${inputClass} focus:ring-green-400`}
            />
          </div>
          <div>
            <label className={labelClass}>
              {lang === "TH" ? "ลดหย่อน SSF / RMF / ประกันบำนาญ" : "SSF / RMF / Pension Ins."}
            </label>
            <input
              type="number"
              value={rmfSsf}
              onChange={(e) => setRmfSsf(e.target.value)}
              max="500000"
              className={`${inputClass} focus:ring-green-400`}
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === "TH" ? "รวมสิทธิ์สูงสุดไม่เกิน 500,000 บาท" : "Total max 500,000 THB"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-green-500 hover:bg-green-600 font-bold text-white rounded transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          {lang === "TH" ? "คำนวณภาษี" : "Calculate Tax"}
        </button>
      </form>

      {/* Result Display */}
      {result !== null && (
        <motion.div
          id="tax-result-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-500/30 shadow-sm relative bg-white dark:bg-gray-900"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === "TH" ? "ผลการคำนวณภาษี" : "Calculation Results"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-green-100 dark:border-green-800/30">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {lang === "TH" ? "รายได้สุทธิ" : "Net Income"}
              </p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400">
                ฿{fmt(result.netIncome)}
              </p>
            </div>
            <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-red-100 dark:border-red-800/30">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {lang === "TH" ? "ภาษีที่ต้องจ่าย" : "Tax Payable"}
              </p>
              <p className="text-2xl font-black text-red-500">
                {result.tax === 0
                  ? lang === "TH"
                    ? "ไม่ต้องเสียภาษี"
                    : "No Tax Due"
                  : `฿${fmt(result.tax)}`}
              </p>
            </div>
            <div className="bg-white dark:bg-black/30 rounded-xl p-4 text-center border border-amber-100 dark:border-amber-800/30">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {lang === "TH" ? "อัตราภาษีเฉลี่ย" : "Effective Tax Rate"}
              </p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {result.effectiveRate.toFixed(2)}%
              </p>
            </div>
          </div>

          {result.breakdown.length > 0 && (
            <div className="mt-6 text-left">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {lang === "TH" ? "รายละเอียดอัตราภาษีขั้นบันได" : "Detailed Tax Breakdown"}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-200 dark:border-green-800/30 text-gray-700 dark:text-gray-300">
                      <th className="text-left py-2 px-3 font-bold">
                        {lang === "TH" ? "ขั้นรายได้ (บาท)" : "Income Bracket (THB)"}
                      </th>
                      <th className="text-right py-2 px-3 font-bold">
                        {lang === "TH" ? "อัตรา" : "Rate"}
                      </th>
                      <th className="text-right py-2 px-3 font-bold">
                        {lang === "TH" ? "รายได้ในขั้น" : "Taxable in Bracket"}
                      </th>
                      <th className="text-right py-2 px-3 font-bold">
                        {lang === "TH" ? "ภาษี" : "Tax"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    {result.breakdown.map((b, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                        <td className="py-2 px-3">{b.bracket}</td>
                        <td className="py-2 px-3 text-right">{b.rate}%</td>
                        <td className="py-2 px-3 text-right">฿{fmt(b.taxable)}</td>
                        <td className="py-2 px-3 text-right font-bold text-red-500">฿{fmt(b.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <ShareButtons title={lang === "TH" ? `ฉันใช้เครื่องมือคำนวณภาษี 2569 ยอดเสียภาษี: ${result.tax === 0 ? "ไม่ต้องเสีย" : "฿" + fmt(result.tax)}` : `My personal tax calculated: ฿${fmt(result.tax)}`} />
            <ExportResult elementId="tax-result-card" fileName={`PersonalTax_${result.tax}`} lang={lang} />
          </div>
        </motion.div>
      )}

      {/* Tax Brackets Info Table */}
      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-6 mt-8 text-left">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          {lang === "TH" ? "ตารางอัตราภาษีเงินได้บุคคลธรรมดา ปี 2569" : "Personal Tax Brackets 2026"}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {lang === "TH"
            ? "คำนวณแบบขั้นบันไดจากเงินได้สุทธิหลังหักค่าใช้จ่ายและค่าลดหย่อน"
            : "Based on net income after standard deductions and exemptions."}
        </p>
        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300">
                <th className="py-2.5 px-4 rounded-l-lg font-bold">{lang === "TH" ? "ช่วงเงินได้สุทธิ (บาท)" : "Net Income (THB)"}</th>
                <th className="py-2.5 px-4 font-bold text-right">{lang === "TH" ? "อัตราภาษี" : "Tax Rate"}</th>
                <th className="py-2.5 px-4 rounded-r-lg font-bold text-right">{lang === "TH" ? "ภาษีสะสมสูงสุด" : "Max Cumulative Tax"}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              {[
                ["0 - 150,000", "0% (ยกเว้น)", "0"],
                ["150,001 - 300,000", "5%", "7,500"],
                ["300,001 - 500,000", "10%", "27,500"],
                ["500,001 - 750,000", "15%", "65,000"],
                ["750,001 - 1,000,000", "20%", "115,000"],
                ["1,000,001 - 2,000,000", "25%", "365,000"],
                ["2,000,001 - 5,000,000", "30%", "1,265,000"],
                ["5,000,001 ขึ้นไป", "35%", "-"],
              ].map(([bracket, rate, max], i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-100/50 dark:hover:bg-white/5">
                  <td className="py-2 px-4">{bracket}</td>
                  <td className="py-2 px-4 text-right font-bold">{rate}</td>
                  <td className="py-2 px-4 text-right text-gray-500">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RelatedCalcs
        lang={lang}
        setCalc={setCalc}
        links={[
          { id: "net-salary", name: lang === "TH" ? "คำนวณเงินเดือนสุทธิ" : "Net Salary Calculator" },
          { id: "savings-goal", name: lang === "TH" ? "คำนวณเป้าหมายการออม" : "Savings Goal Calculator" },
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (FAQ) - ภาษีเงินได้" : "FAQ - Personal Tax"}>
        <FAQItem
          q={
            lang === "TH"
              ? "เงินเดือนเท่าไหร่ถึงต้องเริ่มเสียภาษี?"
              : "At what salary do I start paying tax in Thailand?"
          }
          a={
            lang === "TH"
              ? "หากมีรายได้จากเงินเดือนอย่างเดียว หลังหักค่าใช้จ่าย 50% (ไม่เกิน 100,000 บาท) และค่าลดหย่อนส่วนตัว 60,000 บาทแล้ว เมื่อรายได้เฉลี่ยไม่เกิน 26,583 บาทต่อเดือน (หรือ 319,000 บาทต่อปี) จะไม่มีภาระภาษีที่ต้องชำระ แต่อาจต้องยื่นแบบตามเกณฑ์"
              : "If salary is your only income, with standard deductions, you generally start paying tax when your monthly salary exceeds 26,583 THB (or 319,000 THB annually)."
          }
        />
        <FAQItem
          q={
            lang === "TH"
              ? "RMF และ SSF ลดหย่อนภาษีได้สูงสุดเท่าไหร่?"
              : "What is the deduction limit for RMF and SSF?"
          }
          a={
            lang === "TH"
              ? "SSF สามารถใช้สิทธิ์ลดหย่อนได้สูงสุด 30% ของเงินได้ที่ต้องเสียภาษี แต่ไม่เกิน 200,000 บาท ส่วน RMF ลดหย่อนได้สูงสุด 30% ของเงินได้ แต่ไม่เกิน 500,000 บาท โดยเมื่อรวมกลุ่มกองทุนเกษียณทั้งหมดแล้ว สิทธิ์รวมต้องไม่เกิน 500,000 บาทต่อปี"
              : "SSF can deduct up to 30% of income, capped at 200,000 THB. RMF can deduct up to 30% of income, capped at 500,000 THB. The total combined retirement funds cap is 500,000 THB."
          }
        />
      </SEOFAQ>
    </div>
  );
}
