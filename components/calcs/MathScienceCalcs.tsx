"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult } from "./shared";

// 1. Continuous Compounding Calculator
export function ContinuousCompoundingCalculator({ lang }: { lang: Lang }) {
  const [principal, setPrincipal] = useLocalState("cc_principal", "10000");
  const [rate, setRate] = useLocalState("cc_rate", "5");
  const [years, setYears] = useLocalState("cc_years", "10");
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const a = p * Math.exp((r / 100) * t);
      setResult({ total: a, interest: a - p });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="cc-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณดอกเบี้ยทบต้นต่อเนื่อง" : "Continuous Compounding Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เงินต้นเริ่มต้น (บาท)" : "Principal Amount (฿)"}</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "อัตราดอกเบี้ยต่อปี (%)" : "Annual Interest Rate (%)"}</label>
          <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะเวลา (ปี)" : "Time (Years)"}</label>
          <input type="number" step="0.1" value={years} onChange={e => setYears(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ" : "Calculate"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "เงินต้นรวมดอกเบี้ยสุทธิ" : "Total Accrued (A)"}</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">฿{result.total.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ดอกเบี้ยที่ได้รับทั้งหมด" : "Total Interest"}</p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400">฿{result.interest.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <ExportResult elementId="cc-calc" fileName="continuous-compounding" lang={lang} />
          </div>
        </motion.div>
      )}

      <CalculationSteps
        steps={lang === "TH" ? [
          "สูตรการคำนวณดอกเบี้ยทบต้นต่อเนื่อง: A = P * e^(rt)",
          `แทนค่า: P = ${parseFloat(principal).toLocaleString()} บาท, r = ${parseFloat(rate) / 100}, t = ${years} ปี`,
          `คำนวณเงินสะสมทั้งหมด: A = ${parseFloat(principal).toLocaleString()} * e^(${parseFloat(rate) / 100} * ${years})`,
          result ? `ผลลัพธ์: เงินต้นรวมดอกเบี้ย = ${result.total.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท` : ""
        ].filter(Boolean) : [
          "Formula: A = P * e^(rt)",
          `Values: P = ${principal}, r = ${parseFloat(rate) / 100}, t = ${years}`,
          `Calculation: A = ${principal} * e^(${parseFloat(rate) / 100} * ${years})`,
          result ? `Result: A = ${result.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""
        ].filter(Boolean)}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับดอกเบี้ยทบต้นต่อเนื่อง" : "Frequently Asked Questions"}>
        <FAQItem
          q="ดอกเบี้ยทบต้นต่อเนื่องคืออะไร?"
          a="ดอกเบี้ยทบต้นแบบต่อเนื่อง (Continuous Compounding) คือการคำนวณดอกเบี้ยทบต้นที่มีความถี่ในการทบดอกเบี้ยบ่อยที่สุดเท่าที่จะเป็นไปได้ หรือพูดอีกนัยหนึ่งคือการทบดอกเบี้ยตลอดทุกวินาที ทุกเสี้ยววินาทีแบบไม่สิ้นสุด ซึ่งต่างจากการทบต้นแบบรายปี รายเดือน หรือรายวันทั่วไป สูตรคณิตศาสตร์นี้ใช้ฐานของ e (ค่าคงที่ออยเลอร์ 2.71828) เพื่อหาขีดจำกัดสูงสุดในการเติบโตของเงินทุนหรือหนี้สิน"
        />
        <FAQItem
          q="สูตรการคำนวณคืออะไร?"
          a="สูตรมาตรฐานในการคำนวณคือ A = P * e^(rt) โดยที่ A คือมูลค่าเงินในอนาคตทั้งหมด (เงินต้นบวกดอกเบี้ย), P คือเงินต้นเริ่มต้น, r คืออัตราดอกเบี้ยรายปี (เขียนในรูปทศนิยม เช่น 5% = 0.05), t คือจำนวนปีที่ลงทุน และ e คือค่าคงที่ของออยเลอร์ (~2.71828) การคำนวณด้วยฟังก์ชัน exponential (e^x) ช่วยแก้โจทย์การเติบโตแบบก้าวกระโดดได้อย่างแม่นยำสูง"
        />
        <FAQItem
          q="ดอกเบี้ยทบต้นต่อเนื่องต่างจากการทบต้นรายวันอย่างไร?"
          a="ในทางทฤษฎี ดอกเบี้ยทบต้นต่อเนื่องจะให้ผลตอบแทนมากกว่าการทบต้นรายวัน แต่ในทางปฏิบัติความต่างของตัวเงินนั้นน้อยมาก เช่น หากฝากเงิน 100,000 บาท ด้วยดอกเบี้ย 5% เป็นเวลา 1 ปี การทบต้นแบบรายวันจะได้ดอกเบี้ยรวมประมาณ 5,126.75 บาท ส่วนการทบต้นแบบต่อเนื่องจะได้ดอกเบี้ยรวม 5,127.11 บาท ซึ่งต่างกันเพียงประมาณ 36 สตางค์เท่านั้น ทว่าสูตรต่อเนื่องมักถูกนำไปใช้ในงานจำลองทางการเงินและอนุพันธ์เพื่อความสะดวกในแคลคูลัส"
        />
        <FAQItem
          q="การคำนวณนี้มีประโยชน์ในการวางแผนการเงินอย่างไร?"
          a="ช่วยให้นักลงทุนสามารถประเมินขีดจำกัดสูงสุดของผลตอบแทนที่อาจจะได้รับจากการทบต้น และช่วยในแบบจำลองการเงินระดับสูง เช่น อัตราเงินเฟ้อสะสม การเติบโตของมูลค่าหุ้น หรือการวางแผนชำระหนี้สินที่ทบต้นอย่างรวดเร็ว ทำให้เข้าใจความสำคัญของพลังของดอกเบี้ยทบต้นและการออมเงินระยะยาวได้ชัดเจนยิ่งขึ้น"
        />
      </SEOFAQ>
    </div>
  );
}

// 2. Permutation & Combination Calculator
export function PermutationCombinationCalculator({ lang }: { lang: Lang }) {
  const [nVal, setNVal] = useLocalState("pc_n", "5");
  const [rVal, setRVal] = useLocalState("pc_r", "3");
  const [result, setResult] = useState<{ p: number; c: number } | null>(null);
  const [error, setError] = useState("");

  const getPermutations = (n: number, r: number): number => {
    let res = 1;
    for (let i = 0; i < r; i++) {
      res *= (n - i);
    }
    return res;
  };

  const getCombinations = (n: number, r: number): number => {
    if (r > n - r) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res *= (n - i + 1);
      res /= i;
    }
    return Math.round(res);
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const n = parseInt(nVal);
    const r = parseInt(rVal);
    if (isNaN(n) || isNaN(r)) return;
    if (n < 0 || r < 0) {
      setError(lang === "TH" ? "ค่า n และ r ต้องไม่เป็นลบ" : "n and r must be non-negative");
      return;
    }
    if (n < r) {
      setError(lang === "TH" ? "ค่า n ต้องมากกว่าหรือเท่ากับ r" : "n must be greater than or equal to r");
      return;
    }
    if (n > 100) {
      setError(lang === "TH" ? "ค่า n ต้องไม่เกิน 100 เพื่อหลีกเลี่ยงการคำนวณล้น" : "n must not exceed 100 to avoid overflow");
      return;
    }
    const p = getPermutations(n, r);
    const c = getCombinations(n, r);
    setResult({ p, c });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="pc-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณ Permutation & Combination" : "Permutation & Combination Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนของทั้งหมด (n)" : "Total Items (n)"}</label>
          <input type="number" min="0" max="100" value={nVal} onChange={e => setNVal(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนที่เลือก (r)" : "Selected Items (r)"}</label>
          <input type="number" min="0" max="100" value={rVal} onChange={e => setRVal(e.target.value)} required className={inputClass} />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ" : "Calculate"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "การเรียงสับเปลี่ยน nPr (คำนึงถึงลำดับ)" : "Permutation (nPr)"}</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{result.p.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "การจัดหมู่ nCr (ไม่คำนึงถึงลำดับ)" : "Combination (nCr)"}</p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400">{result.c.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <ExportResult elementId="pc-calc" fileName="permutation-combination" lang={lang} />
          </div>
        </motion.div>
      )}

      <CalculationSteps
        steps={lang === "TH" ? [
          `วิธีการคิดสำหรับ n = ${nVal}, r = ${rVal}:`,
          `1. การเรียงสับเปลี่ยน (Permutation - nPr): n! / (n - r)!`,
          `สูตร: ${nVal}P${rVal} = ${nVal}! / (${nVal} - ${rVal})!`,
          result ? `คำนวณ: ${result.p.toLocaleString()} วิธี` : "",
          `2. การจัดหมู่ (Combination - nCr): n! / (r! * (n - r)!)`,
          `สูตร: ${nVal}C${rVal} = ${nVal}! / (${rVal}! * (${nVal} - ${rVal})!)`,
          result ? `คำนวณ: ${result.c.toLocaleString()} วิธี` : ""
        ].filter(Boolean) : [
          `Calculation for n = ${nVal}, r = ${rVal}:`,
          `1. Permutation (nPr): n! / (n - r)!`,
          `Formula: ${nVal}P${rVal} = ${nVal}! / (${nVal} - ${rVal})!`,
          result ? `Result: ${result.p.toLocaleString()} ways` : "",
          `2. Combination (nCr): n! / (r! * (n - r)!)`,
          `Formula: ${nVal}C${rVal} = ${nVal}! / (${rVal}! * (${nVal} - ${rVal})!)`,
          result ? `Result: ${result.c.toLocaleString()} ways` : ""
        ].filter(Boolean)}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับ Permutation & Combination" : "Frequently Asked Questions"}>
        <FAQItem
          q="Permutation และ Combination ต่างกันอย่างไร?"
          a="ความแตกต่างที่สำคัญที่สุดคือ 'ลำดับ' (Order) ในการเลือกวัตถุ: Permutation (การเรียงสับเปลี่ยน) จะถือว่าลำดับมีความสำคัญมาก เช่น รหัสผ่าน 1-2-3 จะไม่เหมือนกับ 3-2-1 ในขณะที่ Combination (การจัดหมู่) จะเลือกโดยไม่สนใจลำดับ ขอเพียงมีสมาชิกครบกลุ่ม เช่น การหยิบไพ่หรือการเลือกตัวแทนนักเรียนหยิบเด็ก 3 คนจาก 10 คน จะสลับที่กันอย่างไรก็ถือเป็นกลุ่มเดียวกัน"
        />
        <FAQItem
          q="สูตร nPr และ nCr มีวิธีการคำนวณอย่างไร?"
          a="สูตรคำนวณมีดังนี้: nPr = n! / (n - r)! และ nCr = n! / [r! * (n - r)!] โดยที่เครื่องหมาย ! (factorial) หมายถึงผลคูณของตัวเลขถอยหลังไปจนถึง 1 เช่น 5! = 5 * 4 * 3 * 2 * 1 = 120 โดยสูตร nCr จะมีตัวหารเพิ่มขึ้นคือ r! เพื่อตัดจำนวนวิธีที่เกิดจากการเรียงสลับภายในกลุ่มเดียวกันออกไป"
        />
        <FAQItem
          q="มีกรณีการใช้งานใดบ้างในชีวิตจริง?"
          a="nPr (Permutation) มักใช้กับการสลับที่นั่ง การตั้งรหัสผ่าน รหัสตู้เซฟ การต่อคิว หรือการเรียงเลขรางวัล ส่วน nCr (Combination) มักนำไปใช้กับการจับฉลากเลือกผู้โชคดี การเลือกทีมงาน การทำเมนูอาหารเสริมจากการเลือกวัตถุดิบ หรือการหยิบลูกบอลจากกล่องในวิชาความน่าจะเป็นทั่วไป"
        />
        <FAQItem
          q="ทำไมตัวคำนวณจึงจำกัดค่า n ไว้ไม่เกิน 100?"
          a="เนื่องจากค่าแฟกทอเรียล (Factorial) มีการเติบโตของค่ารวดเร็วมาก เช่น 100! มีจำนวนหลักหลายสิบหลักจนเกินความสามารถในการแสดงผลของตัวเลข 64-bit floating point ในระบบคอมพิวเตอร์ทั่วไป (ซึ่งสามารถรับค่าได้สูงสุดประมาณ 1.79e308 หรือประมาณ 170!) ระบบคำนวณของเราจึงออกแบบขั้นตอนวิธีที่ตัดทอนเศษส่วนเพื่อคำนวณผลลัพธ์ขนาดใหญ่ได้เสถียรที่สุด"
        />
      </SEOFAQ>
    </div>
  );
}

// 3. Bayes' Theorem Calculator
export function BayesTheoremCalculator({ lang }: { lang: Lang }) {
  const [priorA, setPriorA] = useLocalState("bayes_prior", "1");
  const [likelihoodB_A, setLikelihoodB_A] = useLocalState("bayes_like_a", "90");
  const [likelihoodB_notA, setLikelihoodB_notA] = useLocalState("bayes_like_not_a", "9.9");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const pA = parseFloat(priorA) / 100;
    const pB_A = parseFloat(likelihoodB_A) / 100;
    const pB_notA = parseFloat(likelihoodB_notA) / 100;

    if (!isNaN(pA) && !isNaN(pB_A) && !isNaN(pB_notA)) {
      const pNotA = 1 - pA;
      const pB = (pB_A * pA) + (pB_notA * pNotA);
      const pA_B = pB > 0 ? (pB_A * pA) / pB : 0;
      setResult(pA_B * 100);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="bayes-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณความน่าจะเป็นของเบย์ (Bayes' Theorem)" : "Bayes' Theorem Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ความน่าจะเป็นเริ่มต้น P(A) (%)" : "Prior Probability P(A) (%)"}
          </label>
          <input type="number" step="0.001" min="0" max="100" value={priorA} onChange={e => setPriorA(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ความน่าจะเป็นที่จะเกิด B เมื่อเกิด A แล้ว P(B|A) (%)" : "Likelihood P(B|A) (%)"}
          </label>
          <input type="number" step="0.001" min="0" max="100" value={likelihoodB_A} onChange={e => setLikelihoodB_A(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ความน่าจะเป็นที่จะเกิด B เมื่อไม่เกิด A P(B|not A) (%) (False Positive)" : "False Positive Rate P(B|not A) (%)"}
          </label>
          <input type="number" step="0.001" min="0" max="100" value={likelihoodB_notA} onChange={e => setLikelihoodB_notA(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ" : "Calculate"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ความน่าจะเป็นภายหลัง P(A|B) หลังทราบผลตรวจ/เหตุการณ์ B" : "Posterior Probability P(A|B)"}</p>
          <p className="text-4xl font-black text-blue-600 dark:text-blue-400">{result.toFixed(4)}%</p>
          <div className="flex justify-center">
            <ExportResult elementId="bayes-calc" fileName="bayes-theorem" lang={lang} />
          </div>
        </motion.div>
      )}

      <CalculationSteps
        steps={lang === "TH" ? [
          "ทฤษฎีบทของเบย์: P(A|B) = [ P(B|A) * P(A) ] / P(B)",
          `โดยที่ P(B) = [ P(B|A) * P(A) ] + [ P(B|not A) * P(not A) ]`,
          `แทนค่าตัวเลข: P(A) = ${parseFloat(priorA) / 100}, P(not A) = ${(100 - parseFloat(priorA)) / 100}`,
          `P(B|A) = ${parseFloat(likelihoodB_A) / 100}, P(B|not A) = ${parseFloat(likelihoodB_notA) / 100}`,
          result !== null ? `ผลลัพธ์สุดท้าย: P(A|B) = ${(result / 100).toFixed(6)} (${result.toFixed(4)}%)` : ""
        ].filter(Boolean) : [
          "Bayes' Theorem: P(A|B) = [ P(B|A) * P(A) ] / P(B)",
          `Where P(B) = [ P(B|A) * P(A) ] + [ P(B|not A) * P(not A) ]`,
          `Values: P(A) = ${parseFloat(priorA) / 100}, P(not A) = ${(100 - parseFloat(priorA)) / 100}`,
          `P(B|A) = ${parseFloat(likelihoodB_A) / 100}, P(B|not A) = ${parseFloat(likelihoodB_notA) / 100}`,
          result !== null ? `Posterior P(A|B) = ${(result / 100).toFixed(6)} (${result.toFixed(4)}%)` : ""
        ].filter(Boolean)}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับทฤษฎีบทของเบย์" : "Frequently Asked Questions"}>
        <FAQItem
          q="ทฤษฎีบทของเบย์ (Bayes' Theorem) คืออะไร?"
          a="ทฤษฎีบทของเบย์ คือทฤษฎีทางสถิติที่ใช้ในการคำนวณและปรับเปลี่ยนค่าความน่าจะเป็นของเหตุการณ์ใดเหตุการณ์หนึ่ง เมื่อเราได้รับข้อมูลใหม่หรือหลักฐานใหม่ (Evidence) เข้ามาเพิ่ม เป็นหัวใจสำคัญของปัญญาประดิษฐ์ (Machine Learning), ระบบกรองอีเมลสแปม, และการวินิจฉัยทางการแพทย์สมัยใหม่"
        />
        <FAQItem
          q="ความแตกต่างระหว่าง P(A|B) และ P(B|A) คืออะไร?"
          a="P(A|B) คือความน่าจะเป็นที่จะเกิดเหตุการณ์ A เมื่อเหตุการณ์ B ได้เกิดขึ้นแล้ว (Posterior Probability) ส่วน P(B|A) คือความน่าจะเป็นที่จะพบข้อมูล B หากเหตุการณ์ A เกิดขึ้นจริง (Likelihood) สองตัวนี้มีความต่างกันอย่างสิ้นเชิง ตัวอย่างเช่น ความน่าจะเป็นที่คุณจะตรวจพบโรคเมื่อเป็นโรคจริง (ความแม่นยำตรวจจับ) จะไม่เท่ากับ ความน่าจะเป็นที่คุณจะเป็นโรคจริงเมื่อผลตรวจออกมาเป็นบวก"
        />
        <FAQItem
          q="ช่วยอธิบายการนำมาใช้กับการตรวจโรคทางการแพทย์?"
          a="สมมติว่ามีโรคที่หายากชนิดหนึ่ง มีโอกาสเกิดขึ้น 1% ในประชากร (Prior P(A) = 1%) หากเครื่องมือตรวจมีความแม่นยำ 90% (P(B|A) = 90%) และมีโอกาสเกิดผลลวงหรือตรวจผิดพลาด 9.9% (False positive P(B|not A) = 9.9%) หากคุณไปตรวจแล้วพบผลเป็นบวก ความน่าจะเป็นที่คุณจะเป็นโรคนั้นจริงๆ จะคำนวณได้เพียงประมาณ 8.33% เท่านั้น ไม่ใช่ 90% เนื่องจากต้องนำสัดส่วนของคนที่ไม่เป็นโรคแต่ตรวจเจอผลลวงมาร่วมคำนวณด้วย"
        />
        <FAQItem
          q="ทำไมต้องคำนึงถึงค่าความน่าจะเป็นก่อนหน้า (Prior Probability) เสมอ?"
          a="เพราะหากเหตุการณ์เริ่มต้นหรือโรคที่ค้นหาเป็นสิ่งที่เกิดขึ้นได้ยากมากๆ ค่าความผิดพลาดเพียงเล็กน้อยของชุดตรวจ (False Positive) ก็สามารถบดบังผลการวินิจฉัยจริงได้อย่างสมบูรณ์ การไม่คำนึงถึงจุดนี้จะนำไปสู่ความเข้าใจผิดทางสถิติที่เรียกว่า Base Rate Fallacy ซึ่งส่งผลกระทบโดยตรงต่อการตัดสินใจทางการแพทย์และธุรกิจ"
        />
      </SEOFAQ>
    </div>
  );
}

// 4. Standard Deviation Calculator
export function StandardDeviationCalculator({ lang }: { lang: Lang }) {
  const [dataInput, setDataInput] = useLocalState("sd_data", "10, 15, 23, 28, 30");
  const [result, setResult] = useState<{
    mean: number;
    sampleSD: number;
    popSD: number;
    sampleVar: number;
    popVar: number;
    count: number;
    sum: number;
    min: number;
    max: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const numbers = dataInput
      .split(/[,\s\n]+/)
      .map(x => parseFloat(x))
      .filter(x => !isNaN(x));

    if (numbers.length < 2) {
      setError(lang === "TH" ? "กรุณากรอกตัวเลขอย่างน้อย 2 ตัว" : "Please enter at least 2 numbers");
      return;
    }

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const sqDiffs = numbers.map(x => Math.pow(x - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

    const sampleVar = sumSqDiffs / (count - 1);
    const sampleSD = Math.sqrt(sampleVar);
    const popVar = sumSqDiffs / count;
    const popSD = Math.sqrt(popVar);

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    setResult({
      mean,
      sampleSD,
      popSD,
      sampleVar,
      popVar,
      count,
      sum,
      min,
      max
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="sd-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณ Standard Deviation (SD) และความแปรปรวน" : "Standard Deviation & Variance Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "กรอกชุดข้อมูลตัวเลข (คั่นด้วยจุลภาค เว้นวรรค หรือขึ้นบรรทัดใหม่)" : "Enter values (separated by commas, spaces, or newlines)"}
          </label>
          <textarea
            rows={4}
            value={dataInput}
            onChange={e => setDataInput(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            placeholder="e.g. 10, 15, 23, 28, 30"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณสถิติ" : "Calculate Statistics"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample SD)" : "Sample SD (s)"}</p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{result.sampleSD.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ส่วนเบี่ยงเบนมาตรฐานประชากร (Population SD)" : "Population SD (σ)"}</p>
                <p className="text-2xl font-black text-green-600 dark:text-green-400">{result.popSD.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ความแปรปรวนกลุ่มตัวอย่าง (Sample Variance)" : "Sample Variance (s²)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{result.sampleVar.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าเฉลี่ย (Mean)" : "Mean (x̄)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{result.mean.toFixed(4)}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 grid grid-cols-3 gap-2 text-center text-xs text-gray-500 dark:text-gray-400">
              <div>
                <p>{lang === "TH" ? "จำนวนข้อมูล (N)" : "Count (N)"}</p>
                <p className="font-bold text-gray-700 dark:text-gray-300">{result.count}</p>
              </div>
              <div>
                <p>{lang === "TH" ? "ค่าน้อยสุด" : "Min"}</p>
                <p className="font-bold text-gray-700 dark:text-gray-300">{result.min}</p>
              </div>
              <div>
                <p>{lang === "TH" ? "ค่ามากสุด" : "Max"}</p>
                <p className="font-bold text-gray-700 dark:text-gray-300">{result.max}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <ExportResult elementId="sd-calc" fileName="standard-deviation" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `จำนวนข้อมูลทั้งหมด (N) = ${result.count}`,
              `1. หาค่าเฉลี่ยเลขคณิต (Mean): x̄ = ผลรวม / N = ${result.sum} / ${result.count} = ${result.mean.toFixed(4)}`,
              `2. คำนวณหาผลรวมของผลต่างกำลังสอง: Σ(x - x̄)² = ${(result.sampleVar * (result.count - 1)).toFixed(4)}`,
              `3. หาค่าความแปรปรวนกลุ่มตัวอย่าง (s²): ผลรวมผลต่างกำลังสอง / (N - 1) = ${result.sampleVar.toFixed(4)}`,
              `4. หาค่าส่วนเบี่ยงเบนมาตรฐาน (s): √s² = ${result.sampleSD.toFixed(4)}`
            ] : [
              `Number of values (N) = ${result.count}`,
              `1. Calculate Mean (x̄): Sum / N = ${result.sum} / ${result.count} = ${result.mean.toFixed(4)}`,
              `2. Sum of Squared Differences: Σ(x - x̄)² = ${(result.sampleVar * (result.count - 1)).toFixed(4)}`,
              `3. Sample Variance (s²): Σ(x - x̄)² / (N - 1) = ${result.sampleVar.toFixed(4)}`,
              `4. Sample SD (s): √s² = ${result.sampleSD.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับส่วนเบี่ยงเบนมาตรฐาน (SD)" : "Frequently Asked Questions"}>
        <FAQItem
          q="ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation หรือ SD) บ่งชี้ถึงอะไร?"
          a="ส่วนเบี่ยงเบนมาตรฐาน คือค่าสถิติที่ใช้วัดการกระจายตัวของข้อมูล หากค่า SD ต่ำ แสดงว่าข้อมูลแต่ละตัวมีค่าใกล้เคียงกับค่าเฉลี่ยมาก (มีความเสถียรหรือเกาะกลุ่มกัน) แต่ถ้าค่า SD สูง แสดงว่าข้อมูลแต่ละตัวมีความแตกต่างกันอย่างมาก และกระจายห่างจากค่าเฉลี่ยค่อนข้างกว้าง"
        />
        <FAQItem
          q="ความต่างระหว่าง Sample SD และ Population SD คืออะไร?"
          a="ความเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample SD) ใช้เมื่อข้อมูลที่เรามีเป็นเพียงส่วนหนึ่งของกลุ่มประชากรทั้งหมด (หารด้วย N - 1 เพื่อลดความเอนเอียง) ส่วนความเบี่ยงเบนมาตรฐานประชากร (Population SD) ใช้เมื่อเรามีข้อมูลของประชากรทั้งหมดครบถ้วนแบบ 100% แล้ว (หารด้วย N) ค่าของ Sample SD จะสูงกว่าเล็กน้อยเสมอเพื่อป้องกันผลลัพธ์ที่ต่ำเกินจริงจากข้อมูลขนาดเล็ก"
        />
        <FAQItem
          q="ความแปรปรวน (Variance) แตกต่างจาก SD อย่างไร?"
          a="ความแปรปรวนคือค่าเฉลี่ยของกำลังสองของส่วนเบี่ยงเบนจากค่าเฉลี่ย (หรือพูดง่ายๆ คือค่า SD ยกกำลังสอง) เนื่องจากความแปรปรวนใช้หน่วยกำลังสอง ทำให้แปลความหมายร่วมกับข้อมูลเริ่มต้นได้ยาก จึงนิยมถอดสแควร์รูทออกมาเป็นค่า SD เพื่อให้เป็นหน่วยเดียวกับข้อมูลปกติ"
        />
        <FAQItem
          q="สูตร N - 1 ในทางสถิติเรียกว่าอะไร?"
          a="สูตรการหารด้วย N - 1 เรียกว่า Bessel's Correction ซึ่งใช้แก้ข้อจำกัดของกลุ่มตัวอย่างเนื่องจากเราไม่ทราบค่าเฉลี่ยของประชากรที่แท้จริง การหารด้วย N - 1 จะช่วยให้เราได้ผลประเมินส่วนเบี่ยงเบนมาตรฐานของประชากรที่ไม่มีอคติ (Unbiased Estimator) สูงสุดนั่นเอง"
        />
      </SEOFAQ>
    </div>
  );
}

// 5. Regression Line Calculator
export function RegressionLineCalculator({ lang }: { lang: Lang }) {
  const [xInput, setXInput] = useLocalState("reg_x", "1, 2, 3, 4, 5");
  const [yInput, setYInput] = useLocalState("reg_y", "2, 4, 5, 4, 5");
  const [result, setResult] = useState<{
    slope: number;
    intercept: number;
    r: number;
    r2: number;
    equation: string;
    points: { x: number; y: number; yPred: number }[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const xs = xInput.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));
    const ys = yInput.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));

    if (xs.length < 2 || ys.length < 2) {
      setError(lang === "TH" ? "กรุณากรอกตัวเลขอย่างน้อย 2 ตัวในทั้งสองช่อง" : "Please enter at least 2 numbers in both inputs");
      return;
    }
    if (xs.length !== ys.length) {
      setError(lang === "TH" ? `จำนวนตัวแปรต้น X (${xs.length}) และ Y (${ys.length}) ต้องมีจำนวนเท่ากัน` : `The number of X items (${xs.length}) and Y items (${ys.length}) must be equal`);
      return;
    }

    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((sum, x, idx) => sum + x * ys[idx], 0);
    const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = ys.reduce((sum, y) => sum + y * y, 0);

    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) {
      setError(lang === "TH" ? "ไม่สามารถคำนวณสมการได้เนื่องจากค่า X ซ้ำกันทั้งหมด" : "Cannot calculate slope due to constant X values");
      return;
    }

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    // R value
    const rDenom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r = rDenom !== 0 ? (n * sumXY - sumX * sumY) / rDenom : 0;
    const r2 = r * r;

    const points = xs.map((x, idx) => ({
      x,
      y: ys[idx],
      yPred: slope * x + intercept
    }));

    const equation = `y = ${slope.toFixed(4)}x + ${intercept >= 0 ? "+ " : "- "}${Math.abs(intercept).toFixed(4)}`;

    setResult({
      slope,
      intercept,
      r,
      r2,
      equation,
      points
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="reg-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณ Regression Line (การวิเคราะห์เส้นถดถอยเชิงเส้น)" : "Linear Regression Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ชุดตัวแปรต้น X (คั่นด้วยจุลภาคหรือเว้นวรรค)" : "X Values (separated by commas or spaces)"}</label>
          <input type="text" value={xInput} onChange={e => setXInput(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ชุดตัวแปรตาม Y (คั่นด้วยจุลภาคหรือเว้นวรรค)" : "Y Values (separated by commas or spaces)"}</label>
          <input type="text" value={yInput} onChange={e => setYInput(e.target.value)} required className={inputClass} />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณเส้นถดถอย" : "Calculate Regression"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{lang === "TH" ? "สมการเส้นถดถอยเชิงเส้น (Regression Equation)" : "Regression Equation"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 text-center my-3">{result.equation}</p>
            
            <div className="grid grid-cols-2 gap-4 text-center mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ความชัน (Slope - m)" : "Slope (m)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{result.slope.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "จุดตัดแกน Y (Intercept - c)" : "Y-Intercept (c)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{result.intercept.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "สัมประสิทธิ์สหสัมพันธ์ (R)" : "Correlation (R)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{result.r.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "สัมประสิทธิ์การตัดสินใจ (R²)" : "R-squared (R²)"}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">{result.r2.toFixed(4)}</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <ExportResult elementId="reg-calc" fileName="linear-regression" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สมการถดถอยเชิงเส้นอย่างง่าย: y = mx + c`,
              `1. ความชัน (m) = [ N*Σ(XY) - ΣX*ΣY ] / [ N*Σ(X²) - (ΣX)² ] = ${result.slope.toFixed(4)}`,
              `2. จุดตัดแกน Y (c) = [ ΣY - m*ΣX ] / N = ${result.intercept.toFixed(4)}`,
              `3. ค่า R² = ${result.r2.toFixed(4)} แสดงให้เห็นว่าตัวแปร X สามารถอธิบายตัวแปร Y ได้ประมาณ ${(result.r2 * 100).toFixed(2)}%`
            ] : [
              `Equation: y = mx + c`,
              `1. Slope (m) = [ N*Σ(XY) - ΣX*ΣY ] / [ N*Σ(X²) - (ΣX)² ] = ${result.slope.toFixed(4)}`,
              `2. Intercept (c) = [ ΣY - m*ΣX ] / N = ${result.intercept.toFixed(4)}`,
              `3. R-squared (R²) = ${result.r2.toFixed(4)} means X can explain ${(result.r2 * 100).toFixed(2)}% of the variance in Y.`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณ Regression Line" : "Frequently Asked Questions"}>
        <FAQItem
          q="Regression Line (เส้นถดถอยเชิงเส้น) คืออะไร?"
          a="เส้นถดถอยเชิงเส้นคือ เส้นตรงที่ดีที่สุด (Line of Best Fit) ที่ลากผ่านกลุ่มจุดข้อมูลบนแผนภาพการกระจัด เพื่อแสดงความสัมพันธ์เชิงแนวโน้มระหว่างตัวแปรสองตัว ได้แก่ ตัวแปรอิสระหรือตัวแปรต้น (X) และตัวแปรตาม (Y) ประโยชน์หลักคือใช้สำหรับการทำนายค่า Y เมื่อเราทราบค่าของ X ตัวใหม่"
        />
        <FAQItem
          q="สูตรการหาความชัน (m) และจุดตัดแกน Y (c) อธิบายอย่างไร?"
          a="ความชัน (m หรือ Slope) บอกทิศทางและความลาดเอียงของเส้นถดถอย บ่งบอกว่าหาก X เพิ่มขึ้น 1 หน่วย Y จะเปลี่ยนแปลงเท่าใด ส่วนจุดตัดแกน Y (c หรือ Intercept) คือค่าของ Y เมื่อ X มีค่าเท่ากับศูนย์ โดยสูตรใช้หลักการผลรวมกำลังสองน้อยที่สุด (Least Squares Method) เพื่อหาเส้นตรงที่สร้างค่าคลาดเคลื่อนรวมต่ำที่สุด"
        />
        <FAQItem
          q="ค่า R-squared (R²) บ่งชี้ถึงสิ่งใด?"
          a="R-squared (Coefficient of Determination) มีค่าอยู่ระหว่าง 0 ถึง 1 บอกว่า โมเดลเส้นตรงนั้นสามารถอธิบายความแปรปรวนของข้อมูลได้ดีแค่ไหน เช่น ค่า R² = 0.85 หมายความว่า ตัวแปรต้น X สามารถนำมาทำนายตัวแปรตาม Y ได้ดีเยี่ยม โดยอธิบายความแปรปรวนได้ถึง 85% อีก 15% ที่เหลือเกิดจากความคลาดเคลื่อนหรือตัวแปรภายนอกอื่นๆ"
        />
        <FAQItem
          q="ข้อจำกัดของการวิเคราะห์เชิงเส้นคืออะไร?"
          a="การวิเคราะห์เชิงเส้นจะสมมติว่าความสัมพันธ์เป็นเส้นตรงตรงไปตรงมาเสมอ หากข้อมูลจริงมีแนวโน้มโค้งคล้ายพาราโบลาหรือเอกซ์โพเนนเชียล การประมาณค่าด้วยเส้นถดถอยเชิงเส้นอย่างง่ายจะคลาดเคลื่อนสูงมาก และต้องระวังการทำนายข้อมูลที่อยู่นอกเหนือช่วงข้อมูลเริ่มต้น (Extrapolation) ด้วย"
        />
      </SEOFAQ>
    </div>
  );
}

// 6. Chi-Square Calculator
export function ChiSquareCalculator({ lang }: { lang: Lang }) {
  const [observedInput, setObservedInput] = useLocalState("chi_obs", "50, 30, 20");
  const [expectedInput, setExpectedInput] = useLocalState("chi_exp", "40, 40, 20");
  const [result, setResult] = useState<{
    chiSquare: number;
    df: number;
    points: { obs: number; exp: number; diffSqOverExp: number }[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const obs = observedInput.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));
    const exp = expectedInput.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));

    if (obs.length < 2 || exp.length < 2) {
      setError(lang === "TH" ? "กรุณากรอกข้อมูลอย่างน้อย 2 กลุ่มขึ้นไป" : "Please enter at least 2 categories");
      return;
    }
    if (obs.length !== exp.length) {
      setError(lang === "TH" ? "จำนวนกลุ่มข้อมูลสังเกตการณ์และที่คาดหวังต้องเท่ากัน" : "The number of observed and expected values must be equal");
      return;
    }

    let chiSquare = 0;
    const points = [];
    for (let i = 0; i < obs.length; i++) {
      if (exp[i] <= 0) {
        setError(lang === "TH" ? "ค่าคาดหวังต้องมากกว่า 0" : "Expected values must be greater than 0");
        return;
      }
      const diff = obs[i] - exp[i];
      const diffSqOverExp = (diff * diff) / exp[i];
      chiSquare += diffSqOverExp;
      points.push({ obs: obs[i], exp: exp[i], diffSqOverExp });
    }

    const df = obs.length - 1;

    setResult({
      chiSquare,
      df,
      points
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="chi-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณ Chi-Square (χ² Goodness of Fit)" : "Chi-Square Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ค่าที่สังเกตได้ (Observed) คั่นด้วยจุลภาค" : "Observed Values (separated by commas)"}
          </label>
          <input type="text" value={observedInput} onChange={e => setObservedInput(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ค่าที่คาดหวัง (Expected) คั่นด้วยจุลภาค" : "Expected Values (separated by commas)"}
          </label>
          <input type="text" value={expectedInput} onChange={e => setExpectedInput(e.target.value)} required className={inputClass} />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ Chi-Square" : "Calculate Chi-Square"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "สถิติ Chi-Square (χ²)" : "Chi-Square Statistic (χ²)"}</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{result.chiSquare.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "องศาอิสระ (df)" : "Degrees of Freedom (df)"}</p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">{result.df}</p>
              </div>
            </div>
            
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="p-2">Category</th>
                    <th className="p-2">Observed (O)</th>
                    <th className="p-2">Expected (E)</th>
                    <th className="p-2">(O - E)² / E</th>
                  </tr>
                </thead>
                <tbody>
                  {result.points.map((p, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-white/5">
                      <td className="p-2">#{idx + 1}</td>
                      <td className="p-2 font-bold text-gray-900 dark:text-white">{p.obs}</td>
                      <td className="p-2">{p.exp}</td>
                      <td className="p-2 text-blue-600 dark:text-blue-400 font-semibold">{p.diffSqOverExp.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="chi-calc" fileName="chi-square" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สูตรสถิติทดสอบ Chi-Square: χ² = Σ [ (O - E)² / E ]`,
              `จำนวนประเภทกลุ่มข้อมูล (k) = ${result.points.length}`,
              `องศาอิสระ (Degrees of Freedom: df) = k - 1 = ${result.df}`,
              `ผลการคำนวณผลรวมสะสมของแต่ละกลุ่ม = ${result.chiSquare.toFixed(4)}`
            ] : [
              `Formula: χ² = Σ [ (O - E)² / E ]`,
              `Number of categories (k) = ${result.points.length}`,
              `Degrees of Freedom (df) = k - 1 = ${result.df}`,
              `Total χ² statistic = ${result.chiSquare.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณ Chi-Square" : "Frequently Asked Questions"}>
        <FAQItem
          q="การทดสอบ Chi-Square (χ²) ใช้ทำอะไร?"
          a="การทดสอบ Chi-Square คือการทดสอบทางสถิติเพื่อตรวจสอบว่าข้อมูลที่สังเกตการณ์จริง (Observed values) มีความแตกต่างจากข้อมูลเชิงทฤษฎีหรือข้อมูลที่คาดหวังไว้ (Expected values) อย่างมีนัยสำคัญทางสถิติหรือไม่ โดยแบ่งเป็นสองประเภทหลัก คือ การทดสอบความสอดคล้อง (Goodness of Fit) และการทดสอบความเป็นอิสระต่อกัน (Independence Test)"
        />
        <FAQItem
          q="องศาอิสระ (Degrees of Freedom หรือ df) มีบทบาทอย่างไร?"
          a="df หรือ องศาแห่งความเสรี เป็นตัวกำหนดรูปทรงของโค้งการแจกแจงแบบ Chi-Square ที่แตกต่างกันไปตามจำนวนกลุ่มข้อมูล ในการทดสอบ Goodness of Fit คำนวณจาก df = จำนวนกลุ่มลบหนึ่ง (k - 1) ซึ่งจำเป็นต้องนำไปใช้คู่กับตารางสถิติ Chi-Square เพื่อตรวจสอบหาระดับนัยสำคัญหรือค่า p-value"
        />
        <FAQItem
          q="เกณฑ์การพิจารณาผลการตัดสินสถิตินี้ทำอย่างไร?"
          a="เราจะเปรียบเทียบค่า χ² ที่คำนวณได้กับค่าวิกฤต (Critical value) จากตารางสถิติตามองศาอิสระและระดับนัยสำคัญ (Alpha เช่น 0.05) หากค่า χ² ที่คำนวณได้มีค่ามากกว่าค่าวิกฤตอย่างชัดเจน แสดงว่าข้อมูลที่ได้มีความแตกต่างจากความคาดหวังจริงอย่างมีนัยสำคัญทางสถิติ (ปฏิเสธสมมติฐานหลัก H0)"
        />
        <FAQItem
          q="ข้อจำกัดที่ควรระวังในการทดสอบ Chi-Square มีอะไรบ้าง?"
          a="ข้อจำกัดที่สำคัญที่สุดคือ ค่าคาดหวัง (Expected Frequency) ในแต่ละประเภทข้อมูลห้ามมีค่าต่ำกว่า 5 ในสัดส่วนที่เกิน 20% ของจำนวนประเภททั้งหมด และในแต่ละกลุ่มห้ามมีค่าคาดหวังเป็นศูนย์อย่างเด็ดขาด เนื่องจากจะนำไปสู่ความผิดพลาดในการหารค่าสถิติสะสม"
        />
      </SEOFAQ>
    </div>
  );
}

// 7. T-Test Calculator
export function TTestCalculator({ lang }: { lang: Lang }) {
  const [g1Input, setG1Input] = useLocalState("tt_g1", "12, 15, 14, 16, 13");
  const [g2Input, setG2Input] = useLocalState("tt_g2", "16, 18, 17, 19, 15");
  const [result, setResult] = useState<{
    m1: number; m2: number;
    s1: number; s2: number;
    n1: number; n2: number;
    t: number; df: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const g1 = g1Input.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));
    const g2 = g2Input.split(/[,\s\n]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));

    if (g1.length < 2 || g2.length < 2) {
      setError(lang === "TH" ? "ทั้งสองกลุ่มต้องมีตัวเลขอย่างน้อย 2 ตัว" : "Both groups must have at least 2 values");
      return;
    }

    const n1 = g1.length;
    const n2 = g2.length;
    const m1 = g1.reduce((a, b) => a + b, 0) / n1;
    const m2 = g2.reduce((a, b) => a + b, 0) / n2;

    const var1 = g1.reduce((sum, val) => sum + Math.pow(val - m1, 2), 0) / (n1 - 1);
    const var2 = g2.reduce((sum, val) => sum + Math.pow(val - m2, 2), 0) / (n2 - 1);
    const s1 = Math.sqrt(var1);
    const s2 = Math.sqrt(var2);

    const se = Math.sqrt((var1 / n1) + (var2 / n2));
    if (se === 0) {
      setError(lang === "TH" ? "ความแปรปรวนข้อมูลมีค่าเป็นศูนย์ ไม่สามารถคำนวณได้" : "Standard error is zero, cannot calculate t-value");
      return;
    }

    const tVal = (m1 - m2) / se;

    // Welch-Satterthwaite df
    const term1 = var1 / n1;
    const term2 = var2 / n2;
    const dfNumerator = Math.pow(term1 + term2, 2);
    const dfDenominator = (Math.pow(term1, 2) / (n1 - 1)) + (Math.pow(term2, 2) / (n2 - 1));
    const dfVal = dfDenominator !== 0 ? dfNumerator / dfDenominator : (n1 + n2 - 2);

    setResult({
      m1, m2, s1, s2, n1, n2, t: tVal, df: dfVal
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="ttest-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณ T-Test (Independent Welch's t-test)" : "T-Test Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "กลุ่มที่ 1 (คั่นด้วยจุลภาคหรือเว้นวรรค)" : "Group 1 (separated by commas or spaces)"}
          </label>
          <input type="text" value={g1Input} onChange={e => setG1Input(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "กลุ่มที่ 2 (คั่นด้วยจุลภาคหรือเว้นวรรค)" : "Group 2 (separated by commas or spaces)"}
          </label>
          <input type="text" value={g2Input} onChange={e => setG2Input(e.target.value)} required className={inputClass} />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ T-Test" : "Calculate T-Test"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าสถิติ t (t-value)" : "t-value"}</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{result.t.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "องศาอิสระ (df)" : "Degrees of Freedom (df)"}</p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">{result.df.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-white/10 text-xs">
              <div>
                <p className="font-bold text-gray-800 dark:text-white mb-2">{lang === "TH" ? "กลุ่มที่ 1" : "Group 1"}</p>
                <p>{lang === "TH" ? "จำนวน (n):" : "Sample Size (n):"} <span className="font-semibold">{result.n1}</span></p>
                <p>{lang === "TH" ? "ค่าเฉลี่ย (Mean):" : "Mean:"} <span className="font-semibold">{result.m1.toFixed(4)}</span></p>
                <p>{lang === "TH" ? "SD:" : "SD:"} <span className="font-semibold">{result.s1.toFixed(4)}</span></p>
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-white mb-2">{lang === "TH" ? "กลุ่มที่ 2" : "Group 2"}</p>
                <p>{lang === "TH" ? "จำนวน (n):" : "Sample Size (n):"} <span className="font-semibold">{result.n2}</span></p>
                <p>{lang === "TH" ? "ค่าเฉลี่ย (Mean):" : "Mean:"} <span className="font-semibold">{result.m2.toFixed(4)}</span></p>
                <p>{lang === "TH" ? "SD:" : "SD:"} <span className="font-semibold">{result.s2.toFixed(4)}</span></p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="ttest-calc" fileName="t-test" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สูตรสถิติทดสอบ Welch's t-test: t = (x̄₁ - x̄₂) / √[ (s₁²/n₁) + (s₂²/n₂) ]`,
              `ส่วนเบี่ยงเบนมาตรฐาน (SD) กลุ่มที่ 1 = ${result.s1.toFixed(4)}, กลุ่มที่ 2 = ${result.s2.toFixed(4)}`,
              `ความคลาดเคลื่อนมาตรฐานร่วม (SE) = ${Math.sqrt((Math.pow(result.s1, 2) / result.n1) + (Math.pow(result.s2, 2) / result.n2)).toFixed(4)}`,
              `ค่าสถิติทดสอบ t ที่คำนวณได้ = ${result.t.toFixed(4)}`
            ] : [
              `Formula: t = (x̄₁ - x̄₂) / √[ (s₁²/n₁) + (s₂²/n₂) ]`,
              `SD1 = ${result.s1.toFixed(4)}, SD2 = ${result.s2.toFixed(4)}`,
              `Standard Error of Difference = ${Math.sqrt((Math.pow(result.s1, 2) / result.n1) + (Math.pow(result.s2, 2) / result.n2)).toFixed(4)}`,
              `t-value = ${result.t.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณ T-Test" : "Frequently Asked Questions"}>
        <FAQItem
          q="การทดสอบแบบ T-Test คืออะไร?"
          a="T-Test คือระเบียบวิธีสถิติตัวแปรเดียวที่ใช้เพื่อเปรียบเทียบค่าเฉลี่ยของข้อมูล 2 กลุ่ม ว่ามีความแตกต่างกันจริงหรือเป็นเพียงความบังเอิญทางสถิติ นิยมใช้ในการศึกษาทางวิทยาศาสตร์ การวิจัยตลาด เช่น การทดสอบเปรียบเทียบประสิทธิภาพของยาสองสูตร หรือความพึงพอใจของลูกค้าต่อแพลตฟอร์มเก่าและใหม่"
        />
        <FAQItem
          q="Welch's t-test ต่างจาก Student's t-test อย่างไร?"
          a="Student's t-test แบบปกติจะสมมติว่าความแปรปรวนของประชากรทั้งสองกลุ่มมีขนาดเท่ากัน (Equal variance) แต่ในชีวิตจริงส่วนใหญ่ความแปรปรวนมักไม่เท่ากัน Welch's t-test จึงถูกออกแบบมาเพื่อคำนวณเปรียบเทียบโดยไม่สนใจว่าความแปรปรวนจะเท่ากันหรือไม่ ทำให้มีความยืดหยุ่นและแม่นยำทางสถิติในระดับที่สูงกว่า"
        />
        <FAQItem
          q="การแปลผลจากค่า t-value และค่าวิกฤตทำอย่างไร?"
          a="หากค่าสัมบูรณ์ของ t-value ที่คำนวณได้มีค่ามากกว่าค่าวิกฤตของ t (t-critical) จากตารางสถิติตามระดับองศาอิสระและนัยสำคัญ (ปกติใช้ 0.05) แสดงว่าค่าเฉลี่ยของทั้งสองกลุ่มมีความแตกต่างกันจริงอย่างมีนัยสำคัญ"
        />
        <FAQItem
          q="ข้อกำหนดเบื้องต้นของการทำ T-Test มีอะไรบ้าง?"
          a="1. ข้อมูลในแต่ละกลุ่มควรมีการแจกแจงแบบปกติ (Normal distribution) หรือมีกลุ่มตัวอย่างขนาดใหญ่พอ (N > 30 ตามกฎทฤษฎีขีดจำกัดส่วนกลาง) 2. ข้อมูลต้องเป็นอิสระต่อกัน (Independent samples) 3. ระดับการวัดข้อมูลต้องอยู่ในระดับมาตราอันตรภาค (Interval) หรือมาตราอัตราส่วน (Ratio)"
        />
      </SEOFAQ>
    </div>
  );
}

// 8. Sample Size Calculator
export function SampleSizeCalculator({ lang }: { lang: Lang }) {
  const [popSize, setPopSize] = useLocalState("ss_pop", "10000");
  const [marginError, setMarginError] = useLocalState("ss_error", "5");
  const [confidence, setConfidence] = useLocalState("ss_conf", "95");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const N = parseFloat(popSize);
    const err = parseFloat(marginError) / 100;
    const conf = parseFloat(confidence);

    if (isNaN(err) || err <= 0 || err >= 1) return;

    let z = 1.96;
    if (conf === 90) z = 1.645;
    else if (conf === 99) z = 2.576;

    if (!isNaN(N) && N > 0) {
      // Yamane's formula: n = N / (1 + N * err^2)
      const yamane = N / (1 + N * err * err);
      setResult(Math.ceil(yamane));
    } else {
      // Cochran's formula: n = (Z^2 * p * (1-p)) / err^2, assuming p = 0.5
      const cochran = (z * z * 0.25) / (err * err);
      setResult(Math.ceil(cochran));
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="ss-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณขนาดกลุ่มตัวอย่าง (Sample Size Calculator)" : "Sample Size Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ขนาดประชากรทั้งหมด (N) (ปล่อยว่างหากไม่ทราบ)" : "Population Size (N) (Leave blank if unknown)"}
          </label>
          <input type="number" min="0" value={popSize} onChange={e => setPopSize(e.target.value)} className={inputClass} placeholder="เช่น 10000 หรือเว้นว่างไว้" />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ความคลาดเคลื่อนที่ยอมรับได้ (%)" : "Margin of Error (%)"}
          </label>
          <input type="number" step="0.1" min="0.1" max="50" value={marginError} onChange={e => setMarginError(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? "ระดับความเชื่อมั่น (%)" : "Confidence Level (%)"}
          </label>
          <select value={confidence} onChange={e => setConfidence(e.target.value)} className={inputClass}>
            <option value="90">90% (Z = 1.645)</option>
            <option value="95">95% (Z = 1.960)</option>
            <option value="99">99% (Z = 2.576)</option>
          </select>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณขนาดกลุ่มตัวอย่าง" : "Calculate Sample Size"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ขนาดกลุ่มตัวอย่างที่แนะนำขั้นต่ำ" : "Minimum Recommended Sample Size"}</p>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400 my-2">{result.toLocaleString()} {lang === "TH" ? "คน/ตัวอย่าง" : "Samples"}</p>
            <div className="flex justify-center">
              <ExportResult elementId="ss-calc" fileName="sample-size" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              popSize ? `ใช้สูตรทาโร่ ยามาเน่ (Taro Yamane): n = N / [ 1 + N * e² ]` : `ใช้สูตรคอแครน (Cochran's Formula): n = (Z² * p * (1-p)) / e²`,
              `แทนค่า: ระดับความเชื่อมั่น = ${confidence}% (Z = ${confidence === "90" ? "1.645" : confidence === "99" ? "2.576" : "1.96"}), ความคลาดเคลื่อน = ${marginError}%`,
              popSize ? `คำนวณ: n = ${parseFloat(popSize).toLocaleString()} / [ 1 + ${parseFloat(popSize).toLocaleString()} * (${parseFloat(marginError) / 100})² ]` : `คำนวณ: n = [ (${confidence === "90" ? "1.645" : confidence === "99" ? "2.576" : "1.96"})² * 0.25 ] / (${parseFloat(marginError) / 100})²`,
              `ขนาดตัวอย่างปัดขึ้นเป็นจำนวนเต็ม: ${result}`
            ] : [
              popSize ? `Using Taro Yamane Formula: n = N / [ 1 + N * e² ]` : `Using Cochran's Formula: n = (Z² * p * (1-p)) / e²`,
              `Values: Confidence = ${confidence}% (Z = ${confidence === "90" ? "1.645" : confidence === "99" ? "2.576" : "1.96"}), Error = ${marginError}%`,
              `Recommended Sample Size: ${result}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณขนาดกลุ่มตัวอย่าง" : "Frequently Asked Questions"}>
        <FAQItem
          q="ขนาดกลุ่มตัวอย่างสำคัญอย่างไรในการทำวิจัย?"
          a="การเลือกขนาดกลุ่มตัวอย่างที่เหมาะสมมีความสำคัญมาก เพราะหากสุ่มกลุ่มตัวอย่างน้อยเกินไป ผลสถิติที่ได้จะไม่สามารถเป็นตัวแทนของประชากรทั้งหมดและไม่มีความน่าเชื่อถือเพียงพอ แต่หากเลือกกลุ่มตัวอย่างมากเกินไป จะทำให้สูญเสียทรัพยากร งบประมาณ และเวลาโดยไม่จำเป็น การใช้สูตรสถิติจึงช่วยหาจุดสมดุลที่ดีที่สุด"
        />
        <FAQItem
          q="เมื่อไรควรใช้สูตร Taro Yamane หรือ Cochran?"
          a="สูตร Taro Yamane เหมาะสำหรับกรณีที่เรา 'ทราบจำนวนประชากรที่แน่นอน' (Finite Population) เช่น ต้องการวิจัยพนักงานในบริษัทที่มีทั้งหมด 5,000 คน ส่วนสูตร Cochran จะใช้ในกรณีที่ 'ไม่ทราบจำนวนประชากรที่แน่ชัด' หรือประชากรมีขนาดใหญ่มากจนเป็นอนันต์ (Infinite Population) เช่น ประชากรผู้ใช้อินเทอร์เน็ตในประเทศไทย"
        />
        <FAQItem
          q="ระดับความเชื่อมั่นและระดับความคลาดเคลื่อนส่งผลอย่างไรต่อขนาดกลุ่มตัวอย่าง?"
          a="หากคุณต้องการระดับความเชื่อมั่นที่สูงขึ้น (เช่น จาก 95% เป็น 99%) หรือต้องการให้มีความคลาดเคลื่อนต่ำลง (เช่น จาก 5% เหลือ 1%) ขนาดของกลุ่มตัวอย่างที่ต้องใช้จะเพิ่มขึ้นอย่างมาก เพราะต้องใช้การกระจายตัวของข้อมูลที่กว้างขึ้นเพื่อยืนยันความแม่นยำของสถิติ"
        />
        <FAQItem
          q="ค่า p = 0.5 ในสูตร Cochran มาจากไหน?"
          a="ค่า p คือสัดส่วนลักษณะของประชากรที่สนใจศึกษา ในกรณีที่ไม่ได้ระบุข้อมูลล่วงหน้า เราจะสมมติค่า p = 0.5 (หรือ 50%) เสมอ เนื่องจากเป็นสัดส่วนที่ทำให้ขนาดของกลุ่มตัวอย่างมีค่ามากที่สุด เพื่อความปลอดภัยทางสถิติว่่าขนาดตัวอย่างจะครอบคลุมทุกความแปรปรวนในประชากร"
        />
      </SEOFAQ>
    </div>
  );
}

// 9. Confidence Interval Calculator
export function ConfidenceIntervalCalculator({ lang }: { lang: Lang }) {
  const [meanVal, setMeanVal] = useLocalState("ci_mean", "50");
  const [sdVal, setSdVal] = useLocalState("ci_sd", "10");
  const [sizeVal, setSizeVal] = useLocalState("ci_size", "100");
  const [confidence, setConfidence] = useLocalState("ci_conf", "95");
  const [result, setResult] = useState<{ lower: number; upper: number; me: number; se: number } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const mean = parseFloat(meanVal);
    const sd = parseFloat(sdVal);
    const n = parseFloat(sizeVal);
    const conf = parseFloat(confidence);

    if (!isNaN(mean) && !isNaN(sd) && !isNaN(n) && n > 1) {
      const se = sd / Math.sqrt(n);
      let z = 1.96;
      if (conf === 90) z = 1.645;
      else if (conf === 99) z = 2.576;
      const me = z * se;
      setResult({
        lower: mean - me,
        upper: mean + me,
        me,
        se
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="ci-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณช่วงความเชื่อมั่น (Confidence Interval for Mean)" : "Confidence Interval Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ค่าเฉลี่ยของกลุ่มตัวอย่าง (x̄)" : "Sample Mean (x̄)"}</label>
          <input type="number" step="0.001" value={meanVal} onChange={e => setMeanVal(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ส่วนเบี่ยงเบนมาตรฐาน (SD - s)" : "Standard Deviation (s)"}</label>
          <input type="number" step="0.001" min="0.001" value={sdVal} onChange={e => setSdVal(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดกลุ่มตัวอย่าง (n)" : "Sample Size (n)"}</label>
          <input type="number" min="2" value={sizeVal} onChange={e => setSizeVal(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระดับความเชื่อมั่น (%)" : "Confidence Level (%)"}</label>
          <select value={confidence} onChange={e => setConfidence(e.target.value)} className={inputClass}>
            <option value="90">90% (Z = 1.645)</option>
            <option value="95">95% (Z = 1.960)</option>
            <option value="99">99% (Z = 2.576)</option>
          </select>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณช่วงความเชื่อมั่น" : "Calculate Confidence Interval"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ช่วงความเชื่อมั่นที่ได้ (Confidence Interval)" : "Confidence Interval"}</p>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 my-2">
              [{result.lower.toFixed(4)}, {result.upper.toFixed(4)}]
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-white/10 text-xs text-left">
              <div>
                <p className="text-gray-500">{lang === "TH" ? "ความคลาดเคลื่อนมาตรฐาน (SE)" : "Standard Error (SE)"}</p>
                <p className="font-bold text-gray-800 dark:text-white">{result.se.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-gray-500">{lang === "TH" ? "ขอบเขตความคลาดเคลื่อน (ME)" : "Margin of Error (ME)"}</p>
                <p className="font-bold text-gray-800 dark:text-white">±{result.me.toFixed(4)}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="ci-calc" fileName="confidence-interval" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สูตรหาช่วงความเชื่อมั่น: CI = x̄ ± Z * (s / √n)`,
              `1. คำนวณความคลาดเคลื่อนมาตรฐาน (SE) = s / √n = ${sdVal} / √${sizeVal} = ${result.se.toFixed(4)}`,
              `2. หาขอบเขตความคลาดเคลื่อน (ME) = Z * SE = ${confidence === "90" ? "1.645" : confidence === "99" ? "2.576" : "1.96"} * ${result.se.toFixed(4)} = ${result.me.toFixed(4)}`,
              `3. ช่วงความเชื่อมั่น = [ ${meanVal} - ${result.me.toFixed(4)}, ${meanVal} + ${result.me.toFixed(4)} ]`
            ] : [
              `Formula: CI = x̄ ± Z * (s / √n)`,
              `1. Standard Error (SE) = s / √n = ${result.se.toFixed(4)}`,
              `2. Margin of Error (ME) = Z * SE = ${result.me.toFixed(4)}`,
              `3. CI = [ ${meanVal} - ${result.me.toFixed(4)}, ${meanVal} + ${result.me.toFixed(4)} ]`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับช่วงความเชื่อมั่น (Confidence Interval)" : "Frequently Asked Questions"}>
        <FAQItem
          q="ช่วงความเชื่อมั่น (Confidence Interval หรือ CI) คืออะไร?"
          a="ช่วงความเชื่อมั่น คือช่วงตัวเลขที่คาดเดาจากข้อมูลกลุ่มตัวอย่างว่า มีความน่าจะเป็นสูงมากที่ค่าจริงของประชากร (เช่น ค่าเฉลี่ยประชากรที่แท้จริง μ) จะตกอยู่ภายในช่วงนี้ ตัวอย่างเช่น ช่วงความเชื่อมั่น 95% บ่งชี้ว่าหากทำการทดลองสุ่มกลุ่มตัวอย่างแบบนี้ 100 ครั้ง จะมี 95 ครั้งที่ช่วงตัวเลขที่ได้ครอบคลุมค่าเฉลี่ยจริงของประชากร"
        />
        <FAQItem
          q="การปรับปรุงระดับความเชื่อมั่นให้สูงขึ้น ส่งผลต่อช่วงความเชื่อมั่นอย่างไร?"
          a="เมื่อเพิ่มระดับความเชื่อมั่น (เช่น จาก 90% ไปเป็น 99%) ช่วงความเชื่อมั่นจะมีความ 'กว้าง' (Wide) มากยิ่งขึ้น เนื่องจากระบบสถิติต้องขยายความกว้างของช่วง เพื่อให้มั่นใจได้มากขึ้นว่าจะไม่พลาดครอบคลุมค่าประชากรจริง แต่จะส่งผลให้มีความแม่นยำจำเพาะเจาะจงลดลง"
        />
        <FAQItem
          q="ขนาดกลุ่มตัวอย่าง (n) มีความสัมพันธ์อย่างไรกับความกว้างของช่วง CI?"
          a="มีความสัมพันธ์ผกผันกันอย่างมีนัยสำคัญ เมื่อขนาดกลุ่มตัวอย่าง (n) เพิ่มขึ้น ความคลาดเคลื่อนมาตรฐาน (Standard Error) จะลดลงอย่างรวดเร็ว ส่งผลให้ขอบเขตความคลาดเคลื่อน (Margin of Error) เล็กลง ทำให้ช่วงความเชื่อมั่นมีความกระชับ (Narrow) และระบุค่าได้อย่างเจาะจงมากยิ่งขึ้น"
        />
        <FAQItem
          q="สูตรนี้ใช้ได้ในกรณีใดบ้าง?"
          a="สูตรสถิตินี้ใช้กับกรณีศึกษาประชากรที่มีการกระจายตัวแบบปกติ และกลุ่มตัวอย่างมีขนาดเหมาะสม (n >= 30) ในกรณีที่ประชากรมีการกระจายตัวไม่ปกติหรือขนาดตัวอย่างมีขนาดเล็กมากๆ ควรนำการทดสอบ t-distribution มาร่วมพิจารณาแทน Z-distribution เพื่อหลีกเลี่ยงความคลาดเคลื่อน"
        />
      </SEOFAQ>
    </div>
  );
}

// 10. Force Converter
export function ForceConverter({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("force_val", "100");
  const [fromUnit, setFromUnit] = useLocalState("force_from", "N");
  const [toUnit, setToUnit] = useLocalState("force_to", "lbf");
  const [result, setResult] = useState<number | null>(null);

  const units: Record<string, { factor: number; nameTH: string; nameEN: string }> = {
    N: { factor: 1, nameTH: "นิวตัน (N)", nameEN: "Newton (N)" },
    kN: { factor: 1000, nameTH: "กิโลนิวตัน (kN)", nameEN: "Kilonewton (kN)" },
    dyn: { factor: 1e-5, nameTH: "ไดน์ (dyn)", nameEN: "Dyne (dyn)" },
    kgf: { factor: 9.80665, nameTH: "กิโลกรัม-แรง (kgf)", nameEN: "Kilogram-force (kgf)" },
    lbf: { factor: 4.448221615, nameTH: "ปอนด์-แรง (lbf)", nameEN: "Pound-force (lbf)" },
  };

  const convert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valInN = val * units[fromUnit].factor;
      const converted = valInN / units[toUnit].factor;
      setResult(converted);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="force-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยแรง (Force Converter)" : "Force Converter"}
      </h3>
      <form onSubmit={convert} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณ/ค่าแรงที่ต้องการแปลง" : "Value to Convert"}</label>
          <input type="number" step="any" value={value} onChange={e => setValue(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ไปยังหน่วย" : "To Unit"}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "แปลงหน่วย" : "Convert"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Converted Value"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-left mb-2 text-gray-600 dark:text-gray-400">{lang === "TH" ? "ตารางเทียบสัดส่วนแรงเทียบเท่า 1 " + fromUnit : "Equivalents of 1 " + fromUnit}</p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                {Object.keys(units).map(k => {
                  const equiv = (1 * units[fromUnit].factor) / units[k].factor;
                  return (
                    <div key={k} className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <span className="font-semibold text-gray-900 dark:text-white">{equiv.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {k}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="force-calc" fileName="force-converter" lang={lang} />
            </div>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยแรง" : "Frequently Asked Questions"}>
        <FAQItem
          q="หน่วยของแรงในระบบ SI คืออะไร?"
          a="หน่วยวัดแรงในระบบหน่วยวัดระหว่างประเทศ (SI) คือ นิวตัน (Newton, สัญลักษณ์ N) ซึ่งตั้งชื่อเพื่อเป็นเกียรติแก่ เซอร์ ไอแซก นิวตัน โดยคำนิยามของ 1 นิวตัน คือ แรงที่ทำให้วัตถุมวล 1 กิโลกรัมเคลื่อนที่ด้วยความเร่ง 1 เมตรต่อวินาทีกำลังสอง (1 N = 1 kg·m/s²)"
        />
        <FAQItem
          q="หน่วยแรงกิโลกรัม-แรง (kgf) และนิวตัน มีความสัมพันธ์กันอย่างไร?"
          a="กิโลกรัม-แรง (Kilogram-force, kgf) คือขนาดแรงโน้มถ่วงที่กระทำต่อวัตถุมวล 1 กิโลกรัมบนพื้นโลก มีค่าเท่ากับมวลคูณด้วยความเร่งเนื่องจากแรงโน้มถ่วงโลกเฉลี่ย (~9.80665 m/s²) ดังนั้น 1 kgf จึงมีค่าประมาณเท่ากับ 9.80665 นิวตัน (N)"
        />
        <FAQItem
          q="หน่วยปอนด์-แรง (lbf) และไดน์ (dyn) ใช้ที่ไหน?"
          a="ปอนด์-แรง (Pound-force, lbf) เป็นหน่วยแรงตามระบบขนบธรรมเนียมอังกฤษและสหรัฐอเมริกา (Imperial units) มักพบในงานวิศวกรรมการบินและอุตสาหกรรมในทวีปอเมริกาเหนือ ส่วน ไดน์ (Dyne, dyn) เป็นหน่วยในระบบ CGS (เซนติเมตร-กรัม-วินาที) ซึ่งเป็นหน่วยแรงขนาดเล็กมาก มักใช้ในระดับนาโนเทคโนโลยีหรือฟิสิกส์อนุภาค (1 N = 100,000 dyn)"
        />
        <FAQItem
          q="การแปลงหน่วยจากนิวตันไปเป็นปอนด์-แรงใช้อัตราส่วนเท่าไร?"
          a="1 นิวตัน (N) มีค่าเท่ากับประมาณ 0.224809 ปอนด์-แรง (lbf) หรือในทางตรงกันข้าม 1 lbf จะมีค่าประมาณเท่ากับ 4.44822 นิวตัน การใช้เครื่องมือคำนวณอัตโนมัติจะช่วยให้นักเรียนและวิศวกรทำงานคำนวณได้อย่างถูกต้องแม่นยำสูงขึ้น ป้องกันการทำสูตรแปลงผิดพลาด"
        />
      </SEOFAQ>
    </div>
  );
}

// 11. Pressure Converter
export function PressureConverter({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("pres_val", "1");
  const [fromUnit, setFromUnit] = useLocalState("pres_from", "atm");
  const [toUnit, setToUnit] = useLocalState("pres_to", "Pa");
  const [result, setResult] = useState<number | null>(null);

  const units: Record<string, { factor: number; nameTH: string; nameEN: string }> = {
    Pa: { factor: 1, nameTH: "ปาสกาล (Pa)", nameEN: "Pascal (Pa)" },
    kPa: { factor: 1000, nameTH: "กิโลปาสกาล (kPa)", nameEN: "Kilopascal (kPa)" },
    bar: { factor: 100000, nameTH: "บาร์ (bar)", nameEN: "Bar (bar)" },
    atm: { factor: 101325, nameTH: "บรรยากาศ (atm)", nameEN: "Atmosphere (atm)" },
    psi: { factor: 6894.75729, nameTH: "ปอนด์ต่อตารางนิ้ว (psi)", nameEN: "Pound per Square Inch (psi)" },
    mmHg: { factor: 133.322387, nameTH: "มิลลิเมตรปรอท (mmHg / Torr)", nameEN: "Millimeters of Mercury (mmHg)" },
  };

  const convert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valInPa = val * units[fromUnit].factor;
      const converted = valInPa / units[toUnit].factor;
      setResult(converted);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="pressure-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยความดัน (Pressure Converter)" : "Pressure Converter"}
      </h3>
      <form onSubmit={convert} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณความดันที่ต้องการแปลง" : "Value to Convert"}</label>
          <input type="number" step="any" value={value} onChange={e => setValue(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ไปยังหน่วย" : "To Unit"}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "แปลงหน่วย" : "Convert"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Converted Value"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-left mb-2 text-gray-600 dark:text-gray-400">{lang === "TH" ? "ตารางเทียบสัดส่วนเทียบเท่า 1 " + fromUnit : "Equivalents of 1 " + fromUnit}</p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                {Object.keys(units).map(k => {
                  const equiv = (1 * units[fromUnit].factor) / units[k].factor;
                  return (
                    <div key={k} className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <span className="font-semibold text-gray-900 dark:text-white">{equiv.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {k}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="pressure-calc" fileName="pressure-converter" lang={lang} />
            </div>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยความดัน" : "Frequently Asked Questions"}>
        <FAQItem
          q="หน่วยความดันระบบสากล (SI Unit) คือหน่วยใด?"
          a="หน่วยความดันมาตรฐานในระบบ SI คือ ปาสกาล (Pascal, สัญลักษณ์ Pa) โดยตั้งตามชื่อของ แบลส ปาสกาล นักคณิตศาสตร์และนักฟิสิกส์ชาวฝรั่งเศส ปาสกาลมีค่าเท่ากับแรง 1 นิวตันกระทำบนพื้นที่ 1 ตารางเมตร (1 Pa = 1 N/m²) เนื่องจากเป็นหน่วยที่เล็กมาก ในทางปฏิบัติจึงมักใช้หน่วยกิโลปาสกาล (kPa) หรือเมกะปาสกาล (MPa) แทน"
        />
        <FAQItem
          q="1 บรรยากาศ (atm) มีค่าเทียบเท่ากับหน่วยอื่นๆ เท่าใด?"
          a="ความดัน 1 ชั้นบรรยากาศมาตรฐาน (Standard Atmosphere, atm) มีค่าเท่ากับ 101,325 ปาสกาล (Pa) หรือ 101.325 กิโลปาสกาล (kPa) หรือประมาณ 1.01325 บาร์ (bar) นอกจากนี้ยังมีค่าเทียบเท่ากับความสูงของคอลัมน์ปรอท 760 มิลลิเมตร (760 mmHg หรือ 760 Torr) และประมาณ 14.696 ปอนด์ต่อตารางนิ้ว (psi)"
        />
        <FAQItem
          q="หน่วย PSI และ mmHg นิยมใช้ในอุตสาหกรรมใดบ้าง?"
          a="หน่วย PSI (Pound per Square Inch) นิยมใช้แพร่หลายในสหรัฐอเมริกาและวงการวิศวกรรมยานยนต์ เช่น การวัดแรงดันลมยางรถยนต์ หรือแรงดันในถังแก๊ส ส่วนหน่วยมิลลิเมตรปรอท (mmHg) มักพบได้บ่อยในอุปกรณ์ทางการแพทย์ เช่น การวัดความดันโลหิตของมนุษย์ และทางวิทยาศาสตร์อุตุนิยมวิทยาในการรายงานค่าความกดอากาศต่ำหรือสูง"
        />
        <FAQItem
          q="บาร์ (bar) และปาสกาล (Pa) ต่างกันอย่างไร?"
          a="บาร์เป็นหน่วยความดันที่ไม่ได้เป็นหน่วย SI โดยตรง แต่นิยมใช้ในทางอุตุนิยมวิทยาและวิศวกรรมศาสตร์ เนื่องจากมีขนาดที่ใกล้เคียงกับความดันบรรยากาศโลกทั่วไป โดย 1 บาร์ มีค่าเท่ากับ 100,000 ปาสกาล (100 kPa) พอดี ทำให้ง่ายต่อการคำนวณสัดส่วนหยาบๆ ในระบบท่อน้ำและแรงดันแก๊สอุตสาหกรรม"
        />
      </SEOFAQ>
    </div>
  );
}

// 12. Energy Converter New
export function EnergyConverterNew({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("energy_val", "1");
  const [fromUnit, setFromUnit] = useLocalState("energy_from", "kWh");
  const [toUnit, setToUnit] = useLocalState("energy_to", "kcal");
  const [result, setResult] = useState<number | null>(null);

  const units: Record<string, { factor: number; nameTH: string; nameEN: string }> = {
    J: { factor: 1, nameTH: "จูล (J)", nameEN: "Joule (J)" },
    kJ: { factor: 1000, nameTH: "กิโลจูล (kJ)", nameEN: "Kilojoule (kJ)" },
    cal: { factor: 4.184, nameTH: "แคลอรี (cal)", nameEN: "Calorie (cal)" },
    kcal: { factor: 4184, nameTH: "กิโลแคลอรี (kcal)", nameEN: "Kilocalorie (kcal)" },
    Wh: { factor: 3600, nameTH: "วัตต์-ชั่วโมง (Wh)", nameEN: "Watt-hour (Wh)" },
    kWh: { factor: 3600000, nameTH: "กิโลวัตต์-ชั่วโมง / หน่วยไฟ (kWh)", nameEN: "Kilowatt-hour (kWh)" },
    BTU: { factor: 1055.05585, nameTH: "บีทียู (BTU)", nameEN: "British Thermal Unit (BTU)" },
  };

  const convert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valInJ = val * units[fromUnit].factor;
      const converted = valInJ / units[toUnit].factor;
      setResult(converted);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="energy-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยพลังงาน (Energy Converter)" : "Energy Converter"}
      </h3>
      <form onSubmit={convert} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณพลังงานที่ต้องการแปลง" : "Value to Convert"}</label>
          <input type="number" step="any" value={value} onChange={e => setValue(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ไปยังหน่วย" : "To Unit"}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "แปลงหน่วย" : "Convert"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Converted Value"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-left mb-2 text-gray-600 dark:text-gray-400">{lang === "TH" ? "ตารางเทียบสัดส่วนเทียบเท่า 1 " + fromUnit : "Equivalents of 1 " + fromUnit}</p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                {Object.keys(units).map(k => {
                  const equiv = (1 * units[fromUnit].factor) / units[k].factor;
                  return (
                    <div key={k} className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <span className="font-semibold text-gray-900 dark:text-white">{equiv.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {k}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="energy-calc" fileName="energy-converter" lang={lang} />
            </div>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยพลังงาน" : "Frequently Asked Questions"}>
        <FAQItem
          q="หน่วยจูล (Joule) มีนิยามอย่างไร?"
          a="จูล คือหน่วยอนุพันธ์ของพลังงานในระบบ SI มีค่าเท่ากับพลังงานที่ถ่ายเทเมื่อออกแรง 1 นิวตันกระทำให้วัตถุเคลื่อนที่ไปได้ระยะทาง 1 เมตรในแนวแรง (1 J = 1 N·m) หรืออีกความหมายคือ งานที่เกิดจากการขับเคลื่อนกระแสไฟฟ้า 1 แอมแปร์ผ่านความต้านทาน 1 โอห์มเป็นเวลา 1 วินาที"
        />
        <FAQItem
          q="กิโลวัตต์-ชั่วโมง (kWh) หรือยูนิตไฟฟ้า เกี่ยวข้องกับพลังงานอย่างไร?"
          a="กิโลวัตต์-ชั่วโมง หรือหน่วยไฟ (Unit) เป็นหน่วยวัดการใช้พลังงานไฟฟ้าตามบ้านเรือนและอุตสาหกรรม โดยมีค่าเท่ากับการใช้งานเครื่องใช้ไฟฟ้าขนาด 1,000 วัตต์ (1 กิโลวัตต์) ต่อเนื่องเป็นเวลา 1 ชั่วโมงเต็ม ในแง่พลังงานบริสุทธิ์ 1 kWh จะมีค่าเท่ากับ 3,600,000 จูล (3.6 MJ) พอดี"
        />
        <FAQItem
          q="ความแตกต่างระหว่างแคลอรี (cal) และกิโลแคลอรี (kcal) คืออะไร?"
          a="1 แคลอรี (cal) คือปริมาณพลังงานความร้อนที่ทำให้น้ำมวล 1 กรัม มีอุณหภูมิสูงขึ้น 1 องศาเซลเซียส ส่วน 1 กิโลแคลอรี (kcal หรือมักเรียกย่อๆ ว่า แคลอรีในฉลากโภชนาการอาหาร) จะมีค่าเท่ากับ 1,000 cal ซึ่งทำให้น้ำมวล 1 กิโลกรัมมีอุณหภูมิสูงขึ้น 1 องศาเซลเซียส โดย 1 kcal มีค่าเทียบเท่ากับประมาณ 4,184 จูล"
        />
        <FAQItem
          q="บีทียู (BTU) คือหน่วยอะไร และมักใช้ทำอะไรในชีวิตประจำวัน?"
          a="BTU ย่อมาจาก British Thermal Unit เป็นหน่วยวัดพลังงานความร้อนแบบดั้งเดิมของระบบอังกฤษ นิยามคือ ปริมาณความร้อนที่ทำให้น้ำหนัก 1 ปอนด์ มีอุณหภูมิสูงขึ้น 1 องศาฟาเรนไฮต์ ปัจจุบันนิยมใช้ระบุขีดความสามารถในการทำความเย็นของเครื่องปรับอากาศ (เช่น แอร์ขนาด 12,000 BTU/hr)"
        />
      </SEOFAQ>
    </div>
  );
}

// 13. Power Converter
export function PowerConverter({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("power_val", "1");
  const [fromUnit, setFromUnit] = useLocalState("power_from", "kW");
  const [toUnit, setToUnit] = useLocalState("power_to", "hp");
  const [result, setResult] = useState<number | null>(null);

  const units: Record<string, { factor: number; nameTH: string; nameEN: string }> = {
    W: { factor: 1, nameTH: "วัตต์ (W)", nameEN: "Watt (W)" },
    kW: { factor: 1000, nameTH: "กิโลวัตต์ (kW)", nameEN: "Kilowatt (kW)" },
    MW: { factor: 1000000, nameTH: "เมกะวัตต์ (MW)", nameEN: "Megawatt (MW)" },
    hp: { factor: 745.699872, nameTH: "กำลังม้า / แรงม้า (hp)", nameEN: "Horsepower (hp)" },
    BTUh: { factor: 0.293071, nameTH: "บีทียูต่อชั่วโมง (BTU/h)", nameEN: "BTU per hour (BTU/h)" },
  };

  const convert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valInW = val * units[fromUnit].factor;
      const converted = valInW / units[toUnit].factor;
      setResult(converted);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="power-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยกำลังไฟฟ้า/กำลังเครื่องยนต์ (Power Converter)" : "Power Converter"}
      </h3>
      <form onSubmit={convert} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณกำลังที่ต้องการแปลง" : "Value to Convert"}</label>
          <input type="number" step="any" value={value} onChange={e => setValue(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ไปยังหน่วย" : "To Unit"}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "แปลงหน่วย" : "Convert"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Converted Value"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-left mb-2 text-gray-600 dark:text-gray-400">{lang === "TH" ? "ตารางเทียบสัดส่วนเทียบเท่า 1 " + fromUnit : "Equivalents of 1 " + fromUnit}</p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                {Object.keys(units).map(k => {
                  const equiv = (1 * units[fromUnit].factor) / units[k].factor;
                  return (
                    <div key={k} className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <span className="font-semibold text-gray-900 dark:text-white">{equiv.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {k}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="power-calc" fileName="power-converter" lang={lang} />
            </div>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยกำลัง" : "Frequently Asked Questions"}>
        <FAQItem
          q="ความแตกต่างระหว่าง พลังงาน (Energy) และ กำลัง (Power) คืออะไร?"
          a="พลังงาน คือความสามารถในการทำงาน มีหน่วยเป็น จูล หรือกิโลวัตต์-ชั่วโมง ส่วน กำลัง คือ อัตราการทำงานหรือปริมาณพลังงานที่ใช้ไปต่อหนึ่งหน่วยเวลา มีหน่วยเป็น วัตต์ (1 วัตต์ = 1 จูลต่อวินาที) เปรียบเทียบง่ายๆ เหมือนกับความจุของถังน้ำ (พลังงาน) และความเร็วในการไหลของก๊อกน้ำ (กำลัง)"
        />
        <FAQItem
          q="กำลัง 1 แรงม้า (Horsepower) มีค่าเท่ากับกี่วัตต์?"
          a="หน่วยแรงม้าเชิงกลที่นิยมใช้ในอุตสาหกรรมยานยนต์ฝั่งตะวันตก (Mechanical Horsepower) มีค่าเท่ากับประมาณ 745.7 วัตต์ (หรือประมาณ 0.746 กิโลวัตต์) ในขณะที่แรงม้าเมตริก (Metric Horsepower) ซึ่งนิยมใช้ในประเทศแถบยุโรปบางแห่ง จะมีค่าเท่ากับประมาณ 735.5 วัตต์"
        />
        <FAQItem
          q="เครื่องใช้ไฟฟ้ากิโลวัตต์ (kW) แปลงเป็นวัตต์ (W) และเมกะวัตต์ (MW) อย่างไร?"
          a="เนื่องจากคำอุปสรรคระบบเมตริก (Prefix) กิโล (k) หมายถึง 1,000 ดังนั้น 1 kW = 1,000 W และ เมกะ (M) หมายถึง 1,000,000 ดังนั้น 1 MW = 1,000 kW = 1,000,000 W ซึ่งการใช้ตัวแปลงนี้จะคำนวณได้อย่างถูกต้องแม่นยำรวดเร็ว"
        />
        <FAQItem
          q="ค่าบีทียูต่อชั่วโมง (BTU/hr) สัมพันธ์กับวัตต์หรือแรงม้าอย่างไร?"
          a="เครื่องปรับอากาศตามบ้านมักบอกขนาดเป็น BTU แต่แท้จริงแล้วมักจะละตัวหารเวลาไว้ ซึ่งก็คือ BTU ต่อชั่วโมง (BTU/hr) ถือเป็นหน่วยของกำลัง โดย 1 BTU/h จะมีค่าเท่ากับประมาณ 0.293 วัตต์ และแอร์ขนาด 12,000 BTU/hr จะใช้กำลังความเย็นเทียบเท่ากับการทำงานของกำลังประมาณ 3,516 วัตต์"
        />
      </SEOFAQ>
    </div>
  );
}

// 14. Density Converter
export function DensityConverter({ lang }: { lang: Lang }) {
  const [value, setValue] = useLocalState("dens_val", "1");
  const [fromUnit, setFromUnit] = useLocalState("dens_from", "g_cm3");
  const [toUnit, setToUnit] = useLocalState("dens_to", "kg_m3");
  const [result, setResult] = useState<number | null>(null);

  const units: Record<string, { factor: number; nameTH: string; nameEN: string }> = {
    kg_m3: { factor: 1, nameTH: "กิโลกรัมต่อลูกบาศก์เมตร (kg/m³)", nameEN: "Kilogram per Cubic Meter (kg/m³)" },
    g_cm3: { factor: 1000, nameTH: "กรัมต่อลูกบาศก์เซนติเมตร (g/cm³)", nameEN: "Gram per Cubic Centimeter (g/cm³)" },
    lb_ft3: { factor: 16.018463, nameTH: "ปอนด์ต่อลูกบาศก์ฟุต (lb/ft³)", nameEN: "Pound per Cubic Foot (lb/ft³)" },
    lb_gal: { factor: 119.826427, nameTH: "ปอนด์ต่อแกลลอน (lb/gal US)", nameEN: "Pound per Gallon (lb/gal)" },
  };

  const convert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valInKgM3 = val * units[fromUnit].factor;
      const converted = valInKgM3 / units[toUnit].factor;
      setResult(converted);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="density-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยความหนาแน่น (Density Converter)" : "Density Converter"}
      </h3>
      <form onSubmit={convert} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณความหนาแน่นที่ต้องการแปลง" : "Value to Convert"}</label>
          <input type="number" step="any" value={value} onChange={e => setValue(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ไปยังหน่วย" : "To Unit"}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={inputClass}>
              {Object.keys(units).map(k => (
                <option key={k} value={k}>{lang === "TH" ? units[k].nameTH : units[k].nameEN}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "แปลงหน่วย" : "Convert"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Converted Value"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-left mb-2 text-gray-600 dark:text-gray-400">{lang === "TH" ? "ตารางเทียบสัดส่วนเทียบเท่า 1 " + fromUnit : "Equivalents of 1 " + fromUnit}</p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                {Object.keys(units).map(k => {
                  const equiv = (1 * units[fromUnit].factor) / units[k].factor;
                  return (
                    <div key={k} className="p-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <span className="font-semibold text-gray-900 dark:text-white">{equiv.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {k}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="density-calc" fileName="density-converter" lang={lang} />
            </div>
          </div>
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยความหนาแน่น" : "Frequently Asked Questions"}>
        <FAQItem
          q="ความหนาแน่น (Density) คืออะไรในทางฟิสิกส์?"
          a="ความหนาแน่น คือ อัตราส่วนระหว่างมวลของวัตถุต่อหนึ่งหน่วยปริมาตร แสดงปริมาณความหนาแน่นในการกระจายตัวของเนื้อสาร สูตรในการคำนวณคือ ρ = m/V (โรว์ = มวล หารด้วย ปริมาตร) ตัวอย่างเช่น น้ำบริสุทธิ์มีความหนาแน่นเท่ากับ 1 กรัมต่อลูกบาศก์เซนติเมตร หรือ 1,000 กิโลกรัมต่อลูกบาศก์เมตรที่อุณหภูมิห้อง"
        />
        <FAQItem
          q="ทำไมความหนาแน่นในหน่วย g/cm³ จึงสัมพันธ์กับน้ำบริสุทธิ์พอดี?"
          a="เนื่องจากในอดีตระบบเมตริกได้รับการออกแบบให้นิยามมวล 1 กรัม คือมวลของน้ำบริสุทธิ์ที่มีปริมาตร 1 ลูกบาศก์เซนติเมตรพอดี ดังนั้น น้ำจึงมีค่าความหนาแน่นสัมบูรณ์เท่ากับ 1 g/cm³ (หรือความถ่วงจำเพาะเท่ากับ 1) ซึ่งมักใช้เป็นเกณฑ์อ้างอิงเพื่อตรวจสอบว่าวัตถุใดจะลอยน้ำหรือจมน้ำ"
        />
        <FAQItem
          q="การแปลงหน่วยจาก g/cm³ ไปเป็น kg/m³ ทำอย่างไร?"
          a="เนื่องจาก 1 กิโลกรัมเท่ากับ 1,000 กรัม และ 1 ลูกบาศก์เมตรเท่ากับ 1,000,000 ลูกบาศก์เซนติเมตร การแปลงหน่วย g/cm³ ไปเป็น kg/m³ จึงทำได้ง่ายๆ โดยการคูณด้วย 1,000 (เช่น น้ำมีความหนาแน่น 1 g/cm³ จะเท่ากับ 1,000 kg/m³)"
        />
        <FAQItem
          q="หน่วยความหนาแน่นของอังกฤษ เช่น lb/ft³ มีประโยชน์อย่างไร?"
          a="หน่วยปอนด์ต่อลูกบาศก์ฟุต (lb/ft³) นิยมใช้มากในงานวิศวกรรมโยธา โครงสร้าง และการขนส่งสินค้าในประเทศแถบอเมริกาเหนือ เพื่อคำนวณน้ำหนักกดทับของวัสดุก่อสร้าง เช่น คอนกรีต ดิน หรือไม้บนโครงสร้างคานรับน้ำหนักของสิ่งก่อสร้าง"
        />
      </SEOFAQ>
    </div>
  );
}

// 15. Projectile Motion Calculator
export function ProjectileMotionCalculator({ lang }: { lang: Lang }) {
  const [velocity, setVelocity] = useLocalState("proj_v", "20");
  const [angle, setAngle] = useLocalState("proj_ang", "45");
  const [height, setHeight] = useLocalState("proj_h", "0");
  const [gravity, setGravity] = useLocalState("proj_g", "9.80665");
  const [result, setResult] = useState<{
    range: number;
    maxHeight: number;
    flightTime: number;
    peakTime: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const v0 = parseFloat(velocity);
    const thetaDeg = parseFloat(angle);
    const h0 = parseFloat(height);
    const g = parseFloat(gravity);

    if (!isNaN(v0) && !isNaN(thetaDeg) && !isNaN(h0) && !isNaN(g) && g > 0) {
      const thetaRad = (thetaDeg * Math.PI) / 180;
      const sin = Math.sin(thetaRad);
      const cos = Math.cos(thetaRad);

      const peakTime = (v0 * sin) / g;
      const maxHeight = h0 + (v0 * v0 * sin * sin) / (2 * g);

      // t = [ v0 * sin + sqrt((v0*sin)^2 + 2*g*h0) ] / g
      const term = Math.pow(v0 * sin, 2) + 2 * g * h0;
      const flightTime = term >= 0 ? (v0 * sin + Math.sqrt(term)) / g : 0;
      const range = v0 * cos * flightTime;

      setResult({
        range,
        maxHeight,
        flightTime,
        peakTime
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="projectile-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณการเคลื่อนที่แบบโพรเจกไทล์ (Projectile Motion)" : "Projectile Motion Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ความเร็วต้น (v₀) (m/s)" : "Initial Velocity (v₀) (m/s)"}</label>
          <input type="number" step="any" min="0" value={velocity} onChange={e => setVelocity(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "มุมยิง (θ) (องศา)" : "Launch Angle (θ) (degrees)"}</label>
          <input type="number" step="any" min="0" max="90" value={angle} onChange={e => setAngle(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ความสูงเริ่มต้นจากพื้น (h₀) (เมตร)" : "Initial Height (h₀) (m)"}</label>
          <input type="number" step="any" min="0" value={height} onChange={e => setHeight(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "แรงโน้มถ่วง (g) (m/s²)" : "Acceleration of Gravity (g) (m/s²)"}</label>
          <input type="number" step="any" min="0.1" value={gravity} onChange={e => setGravity(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณผลโพรเจกไทล์" : "Calculate"}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ระยะตกไกลสุด (Range)" : "Horizontal Range"}</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{result.range.toFixed(4)} m</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ความสูงสูงสุด (Max Height)" : "Maximum Height"}</p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">{result.maxHeight.toFixed(4)} m</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-white/10 text-xs text-left">
              <div>
                <p className="text-gray-500">{lang === "TH" ? "เวลาลอยในอากาศทั้งหมด" : "Total Flight Time"}</p>
                <p className="font-bold text-gray-800 dark:text-white">{result.flightTime.toFixed(4)} s</p>
              </div>
              <div>
                <p className="text-gray-500">{lang === "TH" ? "เวลาถึงจุดสูงสุด" : "Time to Peak"}</p>
                <p className="font-bold text-gray-800 dark:text-white">{result.peakTime.toFixed(4)} s</p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ExportResult elementId="projectile-calc" fileName="projectile-motion" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `องศาแปลเป็นเรเดียน: θ = (${angle} * π) / 180 = ${((parseFloat(angle) * Math.PI) / 180).toFixed(4)} rad`,
              `ความเร็วแนวแกน X (v_x) = v₀ * cos(θ) = ${(parseFloat(velocity) * Math.cos((parseFloat(angle) * Math.PI) / 180)).toFixed(4)} m/s`,
              `ความเร็วแนวแกน Y (v_y) = v₀ * sin(θ) = ${(parseFloat(velocity) * Math.sin((parseFloat(angle) * Math.PI) / 180)).toFixed(4)} m/s`,
              `ระยะเวลาลอยตัวในอากาศคำนวณจากสมการแนวแกนดิ่ง: t = ${result.flightTime.toFixed(4)} s`,
              `ระยะทางแนวราบสูงสุด (Range) = v_x * t = ${result.range.toFixed(4)} เมตร`
            ] : [
              `Angle in radians: θ = ${((parseFloat(angle) * Math.PI) / 180).toFixed(4)} rad`,
              `Vx = v₀ * cos(θ) = ${(parseFloat(velocity) * Math.cos((parseFloat(angle) * Math.PI) / 180)).toFixed(4)} m/s`,
              `Vy = v₀ * sin(θ) = ${(parseFloat(velocity) * Math.sin((parseFloat(angle) * Math.PI) / 180)).toFixed(4)} m/s`,
              `Total Time of Flight = ${result.flightTime.toFixed(4)} s`,
              `Max Range = Vx * t = ${result.range.toFixed(4)} m`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับโพรเจกไทล์ (Projectile Motion)" : "Frequently Asked Questions"}>
        <FAQItem
          q="การเคลื่อนที่แบบโพรเจกไทล์ (Projectile Motion) คืออะไร?"
          a="การเคลื่อนที่แบบโพรเจกไทล์ คือการเคลื่อนที่โค้งสองมิติ (วิถีโค้งพาราโบลา) ของวัตถุที่ถูกขว้างหรือยิงออกไปในอากาศภายใต้แรงกระทำเดียวที่มีอิทธิพลหลัก คือ แรงโน้มถ่วงของโลก (โดยไม่คิดแรงต้านทานของอากาศในสมการทั่วไป) มีการเคลื่อนที่แนวราบ (ความเร็วคงที่) และแนวดิ่ง (ความเร่งคงที่เท่ากับค่า g) ไปพร้อมๆ กัน"
        />
        <FAQItem
          q="มุมยิงระดับกี่องศาจึงจะได้ระยะทางแนวราบสูงสุด?"
          a="หากจุดเริ่มต้นและจุดตกอยู่บนระดับระนาบความสูงเดียวกัน (h₀ = 0) มุมยิงที่จะทำให้ได้ระยะตกไกลที่สุด (Maximum Range) คือ มุม 45 องศา เนื่องจากค่า sin(2θ) ในสูตรการหาระยะทางแนวราบจะมีค่าสูงสุดเท่ากับ 1 เมื่อ θ = 45 องศา"
        />
        <FAQItem
          q="ความสูงเริ่มต้น (h₀) ส่งผลต่อวิถีโพรเจกไทล์อย่างไร?"
          a="หากวัตถุถูกยิงจากจุดที่มีความสูง (เช่น ยิงจากหน้าผา h₀ > 0) เวลาที่วัตถุใช้ลอยอยู่ในอากาศก่อนตกถึงพื้นจะยาวนานขึ้น ส่งผลให้ระยะทางแนวราบไกลขึ้น และการยิงจากมุมต่ำกว่า 45 องศาเล็กน้อยอาจให้ผลลัพธ์ระยะทางที่ไกลกว่าการยิงที่มุม 45 องศาเป๊ะๆ"
        />
        <FAQItem
          q="สูตรการคำนวณที่สำคัญมีอะไรบ้าง?"
          a="สมการแกนราบ: x = v₀ · cos(θ) · t และสมการแกนดิ่ง: y = h₀ + v₀ · sin(θ) · t - (1/2)gt² และความเร็วแนวดิ่ง ณ จุดสูงสุดมีค่าเท่ากับ 0 เสมอ ทำให้สูตรหาจุดสูงสุดลดรูปเหลือเพียง H = h₀ + (v₀² · sin²θ) / (2g)"
        />
      </SEOFAQ>
    </div>
  );
}

// 16. Ohm's Law Calculator
export function OhmsLawCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("ohms_mode", "V"); // V, I, R, P
  const [val1, setVal1] = useLocalState("ohms_val1", "2"); // I or V
  const [val2, setVal2] = useLocalState("ohms_val2", "10"); // R or I
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2)) return;

    if (mode === "V") {
      setResult(v1 * v2);
    } else if (mode === "I") {
      if (v2 !== 0) setResult(v1 / v2);
    } else if (mode === "R") {
      if (v2 !== 0) setResult(v1 / v2);
    } else if (mode === "P") {
      setResult(v1 * v2);
    }
  };

  const getLabels = () => {
    if (mode === "V") {
      return {
        l1: lang === "TH" ? "กระแสไฟฟ้า (I) (แอมแปร์ - A)" : "Current (I) (A)",
        l2: lang === "TH" ? "ความต้านทาน (R) (โอห์ม - Ω)" : "Resistance (R) (Ω)",
        res: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)"
      };
    } else if (mode === "I") {
      return {
        l1: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)",
        l2: lang === "TH" ? "ความต้านทาน (R) (โอห์ม - Ω)" : "Resistance (R) (Ω)",
        res: lang === "TH" ? "กระแสไฟฟ้า (I) (แอมแปร์ - A)" : "Current (I) (A)"
      };
    } else if (mode === "R") {
      return {
        l1: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)",
        l2: lang === "TH" ? "กระแสไฟฟ้า (I) (แอมแปร์ - A)" : "Current (I) (A)",
        res: lang === "TH" ? "ความต้านทาน (R) (โอห์ม - Ω)" : "Resistance (R) (Ω)"
      };
    } else {
      return {
        l1: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)",
        l2: lang === "TH" ? "กระแสไฟฟ้า (I) (แอมแปร์ - A)" : "Current (I) (A)",
        res: lang === "TH" ? "กำลังไฟฟ้า (P) (วัตต์ - W)" : "Power (P) (W)"
      };
    }
  };

  const labels = getLabels();

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="ohms-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณกฎของโอห์ม (Ohm's Law Calculator)" : "Ohm's Law Calculator"}
      </h3>
      <div className="mb-4">
        <label className={labelClass}>{lang === "TH" ? "เลือกสิ่งที่ต้องการคำนวณ" : "Select Target Variable"}</label>
        <select value={mode} onChange={e => { setMode(e.target.value); setResult(null); }} className={inputClass}>
          <option value="V">{lang === "TH" ? "หาแรงดันไฟฟ้า (V = I * R)" : "Voltage (V = I * R)"}</option>
          <option value="I">{lang === "TH" ? "หากระแสไฟฟ้า (I = V / R)" : "Current (I = V / R)"}</option>
          <option value="R">{lang === "TH" ? "หาความต้านทาน (R = V / I)" : "Resistance (R = V / I)"}</option>
          <option value="P">{lang === "TH" ? "หากำลังไฟฟ้า (P = V * I)" : "Electric Power (P = V * I)"}</option>
        </select>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{labels.l1}</label>
          <input type="number" step="any" value={val1} onChange={e => setVal1(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.l2}</label>
          <input type="number" step="any" value={val2} onChange={e => setVal2(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ" : "Calculate"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ผลลัพธ์การคำนวณ" : "Calculated Result"}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {mode === "V" ? "V" : mode === "I" ? "A" : mode === "R" ? "Ω" : "W"}
            </p>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="ohms-calc" fileName="ohms-law" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              mode === "V" ? `สมการ: V = I * R` : mode === "I" ? `สมการ: I = V / R` : mode === "R" ? `สมการ: R = V / I` : `สมการ: P = V * I`,
              `แทนค่าตัวแปร 1 = ${val1}, ตัวแปร 2 = ${val2}`,
              `ผลคำนวณสุดท้าย = ${result.toFixed(4)}`
            ] : [
              mode === "V" ? `Equation: V = I * R` : mode === "I" ? `Equation: I = V / R` : mode === "R" ? `Equation: R = V / I` : `Equation: P = V * I`,
              `Input Values: ${val1}, ${val2}`,
              `Result = ${result.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับกฎของโอห์ม" : "Frequently Asked Questions"}>
        <FAQItem
          q="กฎของโอห์ม (Ohm's Law) คืออะไร?"
          a="กฎของโอห์ม คือหลักการพื้นฐานทางไฟฟ้าที่อธิบายความสัมพันธ์ระหว่างตัวแปรสามตัว ได้แก่ แรงดันไฟฟ้า (V), กระแสไฟฟ้า (I) และความต้านทานไฟฟ้า (R) ถูกค้นพบโดย จอร์จ ไซมอน โอห์ม กฎนี้ระบุว่า กระแสไฟฟ้าที่ไหลผ่านตัวนำจะเป็นสัดส่วนโดยตรงกับแรงดันไฟฟ้า และเป็นสัดส่วนผกผันกับความต้านทานไฟฟ้า"
        />
        <FAQItem
          q="สูตร V = I * R และ P = V * I ใช้งานอย่างไร?"
          a="สูตร V = I * R ใช้เมื่อต้องการหาแรงดันไฟฟ้า (V) โดยนำกระแส (I) คูณกับความต้านทาน (R) ส่วน P = V * I ใช้หาพลังงานหรือกำลังไฟฟ้า (P) ในหน่วยวัตต์ โดยการนำแรงดันคูณกับกระแส ซึ่งเป็นสองสูตรที่ช่างไฟฟ้าและวิศวกรนำไปประกอบการออกแบบวงจรไฟฟ้าทั่วไปในระบบไฟฟ้ากระแสตรงและกระแสสลับอย่างสม่ำเสมอ"
        />
        <FAQItem
          q="หน่วยวัดทางไฟฟ้าแต่ละตัวอธิบายได้อย่างไร?"
          a="1. โวลต์ (Volt, V) คือ หน่วยวัดความต่างศักย์ไฟฟ้าหรือแรงขับดันไฟฟ้า 2. แอมแปร์ (Ampere, A) คือ หน่วยวัดปริมาณกระแสไฟฟ้าที่ไหลผ่านในวงจรต่อวินาที 3. โอห์ม (Ohm, Ω) คือ หน่วยวัดระดับความต้านทานการไหลของกระแสไฟฟ้า 4. วัตต์ (Watt, W) คือ หน่วยวัดปริมาณกำลังไฟฟ้าที่อุปกรณ์ใช้ไปจริง"
        />
        <FAQItem
          q="ตัวอย่างการใช้งานกฎของโอห์มในชีวิตจริงคืออะไร?"
          a="เช่น การหาขนาดของตัวต้านทานที่เหมาะสมเพื่อนำมาต่ออนุกรมกับหลอดไฟ LED ป้องกันหลอดขาด โดยคำนวณจากแรงดันส่วนเกินหารด้วยกระแสที่หลอดต้องการ หรือการคำนวณหาปริมาณกระแสไฟฟ้าของเครื่องใช้ไฟฟ้า เช่น ไดร์เป่าผม 1,000 วัตต์ต่อกับไฟบ้าน 220 โวลต์ เพื่อเลือกขนาดเบรกเกอร์และสายไฟที่ทนทานได้อย่างเหมาะสมและปลอดภัย"
        />
      </SEOFAQ>
    </div>
  );
}

// 17. Capacitor Charge Calculator
export function CapacitorChargeCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("cap_mode", "Q"); // Q, C, V
  const [val1, setVal1] = useLocalState("cap_val1", "10"); // C in uF or Q in uC
  const [val2, setVal2] = useLocalState("cap_val2", "5"); // V in Volts or C in uF
  const [result, setResult] = useState<{ value: number; energy: number } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2)) return;

    if (mode === "Q") {
      const q = v1 * v2;
      const energy = 0.5 * (v1 * 1e-6) * (v2 * v2);
      setResult({ value: q, energy });
    } else if (mode === "C") {
      if (v2 !== 0) {
        const c = v1 / v2;
        const energy = 0.5 * (c * 1e-6) * (v2 * v2);
        setResult({ value: c, energy });
      }
    } else {
      if (v2 !== 0) {
        const v = v1 / v2;
        const energy = 0.5 * (v2 * 1e-6) * (v * v);
        setResult({ value: v, energy });
      }
    }
  };

  const getLabels = () => {
    if (mode === "Q") {
      return {
        l1: lang === "TH" ? "ความจุไฟฟ้า (C) (ไมโครฟารัด - µF)" : "Capacitance (C) (µF)",
        l2: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)",
        res: lang === "TH" ? "ประจุสะสม (Q) (ไมโครคูลอมบ์ - µC)" : "Charge (Q) (µC)"
      };
    } else if (mode === "C") {
      return {
        l1: lang === "TH" ? "ประจุสะสม (Q) (ไมโครคูลอมบ์ - µC)" : "Charge (Q) (µC)",
        l2: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)",
        res: lang === "TH" ? "ความจุไฟฟ้า (C) (ไมโครฟารัด - µF)" : "Capacitance (C) (µF)"
      };
    } else {
      return {
        l1: lang === "TH" ? "ประจุสะสม (Q) (ไมโครคูลอมบ์ - µC)" : "Charge (Q) (µC)",
        l2: lang === "TH" ? "ความจุไฟฟ้า (C) (ไมโครฟารัด - µF)" : "Capacitance (C) (µF)",
        res: lang === "TH" ? "แรงดันไฟฟ้า (V) (โวลต์ - V)" : "Voltage (V) (V)"
      };
    }
  };

  const labels = getLabels();

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="cap-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณประจุและความจุตัวเก็บประจุ (Capacitor Calculator)" : "Capacitor Calculator"}
      </h3>
      <div className="mb-4">
        <label className={labelClass}>{lang === "TH" ? "เลือกสิ่งที่ต้องการคำนวณ" : "Select Target Variable"}</label>
        <select value={mode} onChange={e => { setMode(e.target.value); setResult(null); }} className={inputClass}>
          <option value="Q">{lang === "TH" ? "หาประจุไฟฟ้าสะสม (Q = C * V)" : "Charge (Q = C * V)"}</option>
          <option value="C">{lang === "TH" ? "หาความจุไฟฟ้า (C = Q / V)" : "Capacitance (C = Q / V)"}</option>
          <option value="V">{lang === "TH" ? "หาแรงดันตกคร่อม (V = Q / C)" : "Voltage (V = Q / C)"}</option>
        </select>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{labels.l1}</label>
          <input type="number" step="any" value={val1} onChange={e => setVal1(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.l2}</label>
          <input type="number" step="any" value={val2} onChange={e => setVal2(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณประจุสะสม" : "Calculate"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{labels.res}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })} {mode === "Q" ? "µC" : mode === "C" ? "µF" : "V"}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "พลังงานสะสมในตัวเก็บประจุ (Energy - E)" : "Stored Energy (E)"}</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {result.energy.toLocaleString(undefined, { maximumFractionDigits: 8 })} J (Joules)
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="cap-calc" fileName="capacitor" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              mode === "Q" ? `ประจุ (Q) = C * V` : mode === "C" ? `ความจุ (C) = Q / V` : `แรงดัน (V) = Q / C`,
              `พลังงานสะสมคำนวณจากสูตร: E = 0.5 * C * V²`,
              `ค่าประจุคำนวณได้ = ${result.value.toFixed(4)}`,
              `ค่าพลังงานไฟฟ้าสะสม = ${result.energy.toFixed(6)} จูล`
            ] : [
              mode === "Q" ? `Charge (Q) = C * V` : mode === "C" ? `Capacitance (C) = Q / V` : `Voltage (V) = Q / C`,
              `Energy stored: E = 0.5 * C * V²`,
              `Result Value = ${result.value.toFixed(4)}`,
              `Stored Energy = ${result.energy.toFixed(6)} J`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณประจุและตัวเก็บประจุ" : "Frequently Asked Questions"}>
        <FAQItem
          q="ตัวเก็บประจุ (Capacitor) ทำหน้าที่อะไร?"
          a="ตัวเก็บประจุ คืออุปกรณ์อิเล็กทรอนิกส์พื้นฐานที่มีหน้าที่ในการเก็บสะสมพลังงานไฟฟ้าในรูปของสนามไฟฟ้า ซึ่งเกิดจากความแตกต่างประจุไฟฟ้าบนตัวนำสองแผ่นที่วางขนานกันและคั่นกลางด้วยสารไดอิเล็กทริก (ฉนวน) นิยมนำไปใช้กรองสัญญาณรบกวนในพาวเวอร์ซัพพลาย หรือช่วยจ่ายกระแสไฟฟ้าปริมาณมากอย่างรวดเร็วในการสตาร์ทมอเตอร์ไฟฟ้า"
        />
        <FAQItem
          q="ประจุสะสม (Q) และความจุ (C) สัมพันธ์กันอย่างไร?"
          a="สูตรหลักคือ Q = C * V โดยประจุสะสม Q (หน่วยคูลอมบ์) จะแปรผันตามขนาดความจุ C (หน่วยฟารัด) และระดับแรงดันไฟคร่อม V (หน่วยโวลต์) ยิ่งความจุสูงหรือเพิ่มแรงดันตกคร่อม ประจุไฟฟ้าที่เข้าไปอัดแน่นอยู่ในตัวเก็บประจุก็จะยิ่งมีปริมาณเพิ่มมากขึ้นตามไปด้วย"
        />
        <FAQItem
          q="หน่วยไมโครฟารัด (µF) มีค่าเท่าใดเทียบกับหน่วยฟารัด (F)?"
          a="เนื่องจาก 1 ฟารัด (Farad) เป็นหน่วยที่มีขนาดใหญ่มาก ในทางปฏิบัติอุปกรณ์ทั่วไปมักมีความจุระดับเศษเสี้ยวของฟารัด โดย 1 ไมโครฟารัด (µF) มีค่าเท่ากับ 10⁻⁶ ฟารัด (หรือเศษหนึ่งส่วนล้านฟารัด) และ 1 นาโนฟารัด (nF) มีค่าเท่ากับ 10⁻⁹ ฟารัด และ 1 พิโกฟารัด (pF) มีค่าเท่ากับ 10⁻¹² ฟารัด"
        />
        <FAQItem
          q="พลังงานสะสมในตัวเก็บประจุคำนวณอย่างไร?"
          a="พลังงานความร้อนหรือพลังงานสะสมในรูปสนามไฟฟ้าหาได้จากสูตร E = 0.5 * C * V² (หน่วยจูล) ซึ่งหมายความว่าพลังงานสะสมจะเติบโตเป็นอัตรากำลังสองเทียบกับความดันไฟฟ้าตกคร่อม การขยับแรงดันไฟฟ้าเพิ่มขึ้นจึงสามารถเพิ่มศักยภาพการกักเก็บพลังงานของอุปกรณ์ได้อย่างก้าวกระโดด"
        />
      </SEOFAQ>
    </div>
  );
}

// 18. Wave Calculator
export function WaveCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("wave_mode", "v"); // v, f, l
  const [val1, setVal1] = useLocalState("wave_val1", "340"); // frequency or velocity
  const [val2, setVal2] = useLocalState("wave_val2", "20"); // wavelength or frequency
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2)) return;

    if (mode === "v") {
      setResult(v1 * v2);
    } else if (mode === "f") {
      if (v2 !== 0) setResult(v1 / v2);
    } else {
      if (v2 !== 0) setResult(v1 / v2);
    }
  };

  const getLabels = () => {
    if (mode === "v") {
      return {
        l1: lang === "TH" ? "ความถี่ (f) (เฮิรตซ์ - Hz)" : "Frequency (f) (Hz)",
        l2: lang === "TH" ? "ความยาวคลื่น (λ) (เมตร - m)" : "Wavelength (λ) (m)",
        res: lang === "TH" ? "ความเร็วคลื่น (v) (เมตรต่อวินาที - m/s)" : "Wave Velocity (v) (m/s)"
      };
    } else if (mode === "f") {
      return {
        l1: lang === "TH" ? "ความเร็วคลื่น (v) (เมตรต่อวินาที - m/s)" : "Wave Velocity (v) (m/s)",
        l2: lang === "TH" ? "ความยาวคลื่น (λ) (เมตร - m)" : "Wavelength (λ) (m)",
        res: lang === "TH" ? "ความถี่ (f) (เฮิรตซ์ - Hz)" : "Frequency (f) (Hz)"
      };
    } else {
      return {
        l1: lang === "TH" ? "ความเร็วคลื่น (v) (เมตรต่อวินาที - m/s)" : "Wave Velocity (v) (m/s)",
        l2: lang === "TH" ? "ความถี่ (f) (เฮิรตซ์ - Hz)" : "Frequency (f) (Hz)",
        res: lang === "TH" ? "ความยาวคลื่น (λ) (เมตร - m)" : "Wavelength (λ) (m)"
      };
    }
  };

  const labels = getLabels();

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="wave-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณคุณสมบัติของคลื่น (Wave Calculator)" : "Wave Calculator"}
      </h3>
      <div className="mb-4">
        <label className={labelClass}>{lang === "TH" ? "เลือกสิ่งที่ต้องการคำนวณ" : "Select Target Variable"}</label>
        <select value={mode} onChange={e => { setMode(e.target.value); setResult(null); }} className={inputClass}>
          <option value="v">{lang === "TH" ? "หาความเร็วคลื่น (v = f * λ)" : "Wave Velocity (v = f * λ)"}</option>
          <option value="f">{lang === "TH" ? "หาความถี่คลื่น (f = v / λ)" : "Frequency (f = v / λ)"}</option>
          <option value="l">{lang === "TH" ? "หาความยาวคลื่น (λ = v / f)" : "Wavelength (λ = v / f)"}</option>
        </select>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{labels.l1}</label>
          <input type="number" step="any" value={val1} onChange={e => setVal1(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{labels.l2}</label>
          <input type="number" step="any" value={val2} onChange={e => setVal2(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ" : "Calculate"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{labels.res}</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {mode === "v" ? "m/s" : mode === "f" ? "Hz" : "m"}
            </p>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="wave-calc" fileName="wave-properties" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              mode === "v" ? `สูตรหาความเร็วคลื่น: v = f * λ` : mode === "f" ? `สูตรหาความถี่: f = v / λ` : `สูตรหาความยาวคลื่น: λ = v / f`,
              `แทนค่าตัวแปร: ${val1} และ ${val2}`,
              `ผลลัพธ์การคำนวณคลื่น = ${result.toFixed(4)}`
            ] : [
              mode === "v" ? `Wave Velocity: v = f * λ` : mode === "f" ? `Frequency: f = v / λ` : `Wavelength: λ = v / f`,
              `Values: ${val1}, ${val2}`,
              `Wave Result = ${result.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการคำนวณเรื่องคลื่น" : "Frequently Asked Questions"}>
        <FAQItem
          q="ความเร็วคลื่น ความยาวคลื่น และความถี่ คลื่นมีความหมายอย่างไร?"
          a="1. ความเร็วคลื่น (v) คือระยะทางที่แนวคลื่นเคลื่อนที่ไปได้ในหนึ่งหน่วยเวลา 2. ความยาวคลื่น (λ) คือระยะห่างระหว่างจุดที่เหมือนกันสองจุดบนคลื่นที่อยู่ถัดกัน เช่น ระยะจากสันคลื่นถึงสันคลื่น 3. ความถี่คลื่น (f) คือจำนวนรอบคลื่นที่เคลื่อนที่ผ่านจุดคงที่ในหนึ่งหน่วยเวลา (วินาที) วัดในหน่วยเฮิรตซ์ (Hz)"
        />
        <FAQItem
          q="สมการความเร็วคลื่น v = f * λ สามารถอธิบายทางกายภาพได้อย่างไร?"
          a="ความเร็วคลื่นเป็นตัวบอกว่าพลังงานส่งผ่านไปเร็วแค่ไหน โดยคิดจากความยาวของคลื่นหนึ่งลูก (λ) คูณกับจำนวนลูกคลื่นที่เคลื่อนผ่านในหนึ่งวินาที (f) ตัวอย่างเช่น หากคลื่นเสียงเดินทางในอากาศทั่วไปที่มีอัตราความเร็วคงที่ ~340 เมตรต่อวินาที การเพิ่มความถี่ f ให้สูงขึ้นจะส่งผลให้ความยาวคลื่น λ ลดลงตามสัดส่วนผกผันโดยอัตโนมัติ"
        />
        <FAQItem
          q="ความเร็วของคลื่นแสงและคลื่นเสียงต่างกันอย่างไร?"
          a="คลื่นแสงเป็นคลื่นแม่เหล็กไฟฟ้า สามารถเดินทางในสุญญากาศได้ด้วยความเร็วคงที่ ~3 * 10⁸ เมตรต่อวินาที ส่วนคลื่นเสียงเป็นคลื่นกลที่ต้องอาศัยตัวกลาง (เช่น อากาศ น้ำ หรือเหล็ก) ในการเดินทาง ความเร็วของเสียงในอากาศแห้งที่ 20 องศาเซลเซียสจะอยู่ที่ประมาณ 343 เมตรต่อวินาที ซึ่งช้ากว่าแสงอย่างมาก"
        />
        <FAQItem
          q="เครื่องมือคำนวณคลื่นนี้ประยุกต์ใช้ในวิทยุกระจายเสียงอย่างไร?"
          a="ในการกระจายสัญญาณวิทยุ (เช่น คลื่น FM หรือ Wi-Fi) สัญญาณคลื่นวิทยุทั้งหมดเดินทางด้วยความเร็วแสง (c) ตัวนำสถานีจึงต้องคำนวณหาความยาวของเสาอากาศให้มีความพอเหมาะกับค่าความยาวคลื่น (λ) โดยคำนวณจากสูตร λ = c / f เพื่อให้การรับส่งข้อมูลคลื่นเกิดการสั่นพ้องประสานงานได้มีประสิทธิภาพสูงสุด"
        />
      </SEOFAQ>
    </div>
  );
}

// 19. pH Buffer Calculator
export function PHBufferCalculator({ lang }: { lang: Lang }) {
  const [pKa, setPKa] = useLocalState("buf_pka", "4.76");
  const [baseConc, setBaseConc] = useLocalState("buf_base", "0.1");
  const [acidConc, setAcidConc] = useLocalState("buf_acid", "0.1");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const pk = parseFloat(pKa);
    const base = parseFloat(baseConc);
    const acid = parseFloat(acidConc);

    if (isNaN(pk) || isNaN(base) || isNaN(acid)) return;
    if (base <= 0 || acid <= 0) {
      setError(lang === "TH" ? "ความเข้มข้นสารต้องมากกว่า 0" : "Concentrations must be greater than 0");
      return;
    }

    const pH = pk + Math.log10(base / acid);
    setResult(pH);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="buffer-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณค่า pH ของสารละลายบัฟเฟอร์ (Henderson-Hasselbalch)" : "pH Buffer Calculator"}
      </h3>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>pKa ของกรดอ่อน (Acid pKa)</label>
          <input type="number" step="0.001" value={pKa} onChange={e => setPKa(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ความเข้มข้นของคู่เบส [A⁻] (mol/L)" : "Conjugate Base Concentration [A⁻] (M)"}</label>
          <input type="number" step="any" min="0" value={baseConc} onChange={e => setBaseConc(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ความเข้มข้นของกรดอ่อน [HA] (mol/L)" : "Weak Acid Concentration [HA] (M)"}</label>
          <input type="number" step="any" min="0" value={acidConc} onChange={e => setAcidConc(e.target.value)} required className={inputClass} />
        </div>
        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณ pH บัฟเฟอร์" : "Calculate"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่า pH ของสารละลายบัฟเฟอร์ที่ได้" : "Calculated Buffer pH"}</p>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toFixed(4)}
            </p>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="buffer-calc" fileName="ph-buffer" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สมการเฮนเดอร์สัน-ฮัสเซลบัลช์: pH = pKa + log₁₀( [A⁻] / [HA] )`,
              `แทนค่า: pKa = ${pKa}, [A⁻] = ${baseConc} M, [HA] = ${acidConc} M`,
              `คำนวณอัตราส่วน: log₁₀(${baseConc} / ${acidConc}) = ${Math.log10(parseFloat(baseConc) / parseFloat(acidConc)).toFixed(4)}`,
              `ค่า pH บัฟเฟอร์สุทธิ = ${result.toFixed(4)}`
            ] : [
              `Henderson-Hasselbalch Equation: pH = pKa + log₁₀( [A⁻] / [HA] )`,
              `Values: pKa = ${pKa}, [A⁻] = ${baseConc}, [HA] = ${acidConc}`,
              `Log term: log₁₀(${baseConc} / ${acidConc}) = ${Math.log10(parseFloat(baseConc) / parseFloat(acidConc)).toFixed(4)}`,
              `Calculated pH = ${result.toFixed(4)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับสารละลายบัฟเฟอร์" : "Frequently Asked Questions"}>
        <FAQItem
          q="สารละลายบัฟเฟอร์ (Buffer Solution) คืออะไร?"
          a="สารละลายบัฟเฟอร์ คือสารละลายเคมีที่มีคุณสมบัติพิเศษในการรักษาระดับค่า pH (ความเป็นกรด-ด่าง) ให้ค่อนข้างคงที่ แม้ว่าจะมีการเติมกรดแก่หรือเบสแก่จำนวนเล็กน้อยลงไปก็ตาม ประกอบขึ้นจาก กรดอ่อนกับเกลือของกรดอ่อนคู่เบสของมัน หรือ เบสอ่อนกับเกลือของเบสอ่อนคู่กรดของมัน ทำหน้าที่สำคัญในระบบชีวภาพของมนุษย์ เช่น ระบบบัฟเฟอร์ฟอสเฟตและคาร์บอเนตที่ควบคุม pH ของเลือดให้อยู่ในช่วง 7.35 - 7.45 เสมอ"
        />
        <FAQItem
          q="สมการ Henderson-Hasselbalch อธิบายเรื่องใด?"
          a="สมการ Henderson-Hasselbalch (pH = pKa + log([Base]/[Acid])) ใช้สำหรับคำนวณหาค่า pH ของสารละลายบัฟเฟอร์เมื่อรู้ความเข้มข้นของกรดและคู่เบสของมัน รวมทั้งหาค่าสัดส่วนสารเคมีที่เหมาะสมที่ต้องใช้ในการผสมเตรียมบัฟเฟอร์ในห้องปฏิบัติการเพื่อกำหนดค่า pH ให้เป๊ะตามเป้าหมายวิจัย"
        />
        <FAQItem
          q="เมื่อความเข้มข้นของคู่เบสเท่ากับกรดอ่อน ค่า pH จะมีค่าเท่าใด?"
          a="หากความเข้มข้นของคู่เบส [A⁻] เท่ากับกรดอ่อน [HA] พอดี อัตราส่วน [Base]/[Acid] จะมีค่าเท่ากับ 1 ส่งผลให้ค่า log₁₀(1) เท่ากับ 0 ดังนั้น ค่า pH ของบัฟเฟอร์จะเท่ากับค่า pKa ของกรดอ่อนโดยทันที (pH = pKa) ซึ่งเป็นจุดที่มีคุณสมบัติและขีดความสามารถการต้านทานการเปลี่ยนแปลง pH ได้สูงสุด (Maximum Buffer Capacity)"
        />
        <FAQItem
          q="ค่า pKa บ่งชี้ถึงสิ่งใดในทางเคมี?"
          a="ค่า pKa เป็นค่าคงที่ลอการิทึมที่ระบุความแรงของกรด ยิ่งค่า pKa ต่ำ กรดจะยิ่งแตกตัวได้ดีและมีความเป็นกรดสูงกว่า กรดที่มีความแรงปานกลางจะมี pKa ต่ำ ในขณะที่กรดที่อ่อนมากๆ จะมี pKa สูง การเลือกคู่กรด-เบสมาเตรียมบัฟเฟอร์ จึงควรเลือกสารที่มีค่า pKa ใกล้เคียงกับค่า pH ที่เราต้องการใช้งานมากที่สุด"
        />
      </SEOFAQ>
    </div>
  );
}

// 20. Equilibrium Constant Calculator
export function EquilibriumConstantCalculator({ lang }: { lang: Lang }) {
  const [cConc, setCConc] = useLocalState("eq_c", "0.2");
  const [dConc, setDConc] = useLocalState("eq_d", "0.2");
  const [aConc, setAConc] = useLocalState("eq_a", "0.1");
  const [bConc, setBConc] = useLocalState("eq_b", "0.1");
  const [cCoef, setCCoef] = useLocalState("eq_ccoef", "1");
  const [dCoef, setDCoef] = useLocalState("eq_dcoef", "1");
  const [aCoef, setACoef] = useLocalState("eq_acoef", "1");
  const [bCoef, setBCoef] = useLocalState("eq_bcoef", "1");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const a = parseFloat(aConc);
    const b = parseFloat(bConc);
    const c = parseFloat(cConc);
    const d = parseFloat(dConc);
    const ac = parseInt(aCoef);
    const bc = parseInt(bCoef);
    const cc = parseInt(cCoef);
    const dc = parseInt(dCoef);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(ac) || isNaN(bc) || isNaN(cc) || isNaN(dc)) return;
    if (a <= 0 || b <= 0 || c < 0 || d < 0) {
      setError(lang === "TH" ? "ความเข้มข้นสารตั้งต้นต้องมากกว่า 0" : "Reactant concentrations must be greater than 0");
      return;
    }

    const numerator = Math.pow(c, cc) * Math.pow(d, dc);
    const denominator = Math.pow(a, ac) * Math.pow(b, bc);
    if (denominator === 0) return;
    setResult(numerator / denominator);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm" id="equilibrium-calc">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณค่าคงที่สมดุลเคมี (Equilibrium Constant - Kc)" : "Equilibrium Constant Calculator"}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-6">
        {lang === "TH" ? "สำหรับปฏิกิริยาผันกลับได้: aA + bB ⇌ cC + dD" : "For reversible reaction: aA + bB ⇌ cC + dD"}
      </p>

      <form onSubmit={calculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2">{lang === "TH" ? "สารตั้งต้น (Reactants)" : "Reactants"}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">[A] (M) &amp; Coefficient (a)</label>
                <div className="flex gap-2">
                  <input type="number" step="any" value={aConc} onChange={e => setAConc(e.target.value)} required className={inputClass} />
                  <input type="number" min="1" value={aCoef} onChange={e => setACoef(e.target.value)} required className="w-16 px-2 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-center" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">[B] (M) &amp; Coefficient (b)</label>
                <div className="flex gap-2">
                  <input type="number" step="any" value={bConc} onChange={e => setBConc(e.target.value)} required className={inputClass} />
                  <input type="number" min="1" value={bCoef} onChange={e => setBCoef(e.target.value)} required className="w-16 px-2 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-center" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2">{lang === "TH" ? "สารผลิตภัณฑ์ (Products)" : "Products"}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">[C] (M) &amp; Coefficient (c)</label>
                <div className="flex gap-2">
                  <input type="number" step="any" value={cConc} onChange={e => setCConc(e.target.value)} required className={inputClass} />
                  <input type="number" min="1" value={cCoef} onChange={e => setCCoef(e.target.value)} required className="w-16 px-2 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-center" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">[D] (M) &amp; Coefficient (d)</label>
                <div className="flex gap-2">
                  <input type="number" step="any" value={dConc} onChange={e => setDConc(e.target.value)} required className={inputClass} />
                  <input type="number" min="1" value={dCoef} onChange={e => setDCoef(e.target.value)} required className="w-16 px-2 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
        <button type="submit" className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {lang === "TH" ? "คำนวณค่าคงที่สมดุล (Kc)" : "Calculate Kc"}
        </button>
      </form>

      {result !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-500/20 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{lang === "TH" ? "ค่าคงที่สมดุลเคมีที่คำนวณได้ (Kc)" : "Calculated Equilibrium Constant (Kc)"}</p>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400 my-2">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </p>
            <div className="flex justify-center mt-4">
              <ExportResult elementId="equilibrium-calc" fileName="equilibrium-constant" lang={lang} />
            </div>
          </div>

          <CalculationSteps
            steps={lang === "TH" ? [
              `สูตรสัดส่วนสถิติคงที่สมดุล: Kc = ( [C]^c * [D]^d ) / ( [A]^a * [B]^b )`,
              `เศษ (Products) = [${cConc}]^${cCoef} * [${dConc}]^${dCoef} = ${(Math.pow(parseFloat(cConc), parseInt(cCoef)) * Math.pow(parseFloat(dConc), parseInt(dCoef))).toFixed(6)}`,
              `ส่วน (Reactants) = [${aConc}]^${aCoef} * [${bConc}]^${bCoef} = ${(Math.pow(parseFloat(aConc), parseInt(aCoef)) * Math.pow(parseFloat(bConc), parseInt(bCoef))).toFixed(6)}`,
              `ค่าคงที่สมดุล Kc = ${result.toFixed(6)}`
            ] : [
              `Equilibrium Constant Formula: Kc = ( [C]^c * [D]^d ) / ( [A]^a * [B]^b )`,
              `Numerator (Products) = [${cConc}]^${cCoef} * [${dConc}]^${dCoef} = ${(Math.pow(parseFloat(cConc), parseInt(cCoef)) * Math.pow(parseFloat(dConc), parseInt(dCoef))).toFixed(6)}`,
              `Denominator (Reactants) = [${aConc}]^${aCoef} * [${bConc}]^${bCoef} = ${(Math.pow(parseFloat(aConc), parseInt(aCoef)) * Math.pow(parseFloat(bConc), parseInt(bCoef))).toFixed(6)}`,
              `Kc = ${result.toFixed(6)}`
            ]}
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับค่าคงที่สมดุลเคมี" : "Frequently Asked Questions"}>
        <FAQItem
          q="ค่าคงที่สมดุลเคมี (Equilibrium Constant - Kc) บอกอะไรเรา?"
          a="Kc เป็นค่าสัดส่วนความเข้มข้นของสารผลิตภัณฑ์ต่อสารตั้งต้น ณ จุดสมดุลเคมี (ที่อัตราการเกิดปฏิกิริยาไปข้างหน้าเท่ากับย้อนกลับ) หาก Kc มีค่าสูงมาก (> 1) แสดงว่า ณ สมดุลจะมีปริมาณสารผลิตภัณฑ์เกิดขึ้นสูงมาก ในทางกลับกัน หาก Kc ต่ำมาก (< 1) แสดงว่าสารตั้งต้นแทบจะไม่ทำปฏิกิริยาต่อและเหลือค้างจำนวนมาก"
        />
        <FAQItem
          q="สถานะของสารใดบ้างที่จะไม่นำมาร่วมคำนวณในสูตร Kc?"
          a="สารที่อยู่ในสถานะ ของแข็งบริสุทธิ์ (s) และ ของเหลวบริสุทธิ์ (l) จะไม่นำมาร่วมคิดในสมการ Kc เนื่องจากความหนาแน่นและความเข้มข้นเชิงลึกของสารเหล่านี้มีค่าคงที่เสมอในทางฟิสิกส์เคมี จะคิดเฉพาะสารที่มีสถานะ แก๊ส (g) และ สารละลายที่มีน้ำเป็นตัวทำละลาย (aq) เท่านั้น"
        />
        <FAQItem
          q="ปัจจัยภายนอกใดบ้างที่มีผลต่อการเปลี่ยนแปลงค่า Kc?"
          a="อุณหภูมิ (Temperature) เป็นปัจจัยเดียวเท่านั้นที่สามารถเปลี่ยนแปลงค่าคงที่สมดุล Kc ของปฏิกิริยาได้ ส่วนการเปลี่ยนแปลงความดัน ความเข้มข้นของสาร หรือการเติมสารเร่งปฏิกิริยา (Catalyst) จะส่งผลให้ปฏิกิริยาเสียสมดุลและปรับสมดุลใหม่ตามหลักการเลอชาเตอลิเย (Le Chatelier's Principle) แต่ค่าคงที่สมดุล Kc จะมีค่าเท่าเดิมไม่เปลี่ยนแปลง"
        />
        <FAQItem
          q="ค่าคงที่สมดุลมีหน่วยวัดอะไรในทางเคมี?"
          a="โดยทางสถิติมาตรฐาน ค่าคงที่สมดุลเป็นสัดส่วนของกิจกรรม (Activity Ratio) จึงเขียนแสดงเป็นตัวเลขไม่มีหน่วยวัดกำกับ อย่างไรก็ตามในหลายตำราเรียน อาจพบหน่วยวัดอนุพันธ์ที่คิดจากความเข้มข้น (เช่น M หรือ mol/L) ยกกำลังด้วยความต่างของผลรวมสัมประสิทธิ์ผลิตภัณฑ์ลบด้วยสารตั้งต้น (Δn)"
        />
      </SEOFAQ>
    </div>
  );
}

