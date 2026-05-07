"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass } from "./shared";

// 1. Grade Converter
export function GradeConverter({ lang }: { lang: Lang }) {
  const [grade, setGrade] = useLocalState("grd_val", "A");
  const [system, setSystem] = useLocalState("grd_sys", "us");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const g = grade.toUpperCase().trim();
    let th = "", us = "", percent = "", uk = "";

    if (g === "A" || g === "4" || g === "4.0") { th = "4.0"; us = "A"; percent = "80-100%"; uk = "First-Class (1st)"; }
    else if (g === "B+" || g === "3.5") { th = "3.5"; us = "B+"; percent = "75-79%"; uk = "Upper Second (2:1)"; }
    else if (g === "B" || g === "3" || g === "3.0") { th = "3.0"; us = "B"; percent = "70-74%"; uk = "Lower Second (2:2)"; }
    else if (g === "C+" || g === "2.5") { th = "2.5"; us = "C+"; percent = "65-69%"; uk = "Third-Class (3rd)"; }
    else if (g === "C" || g === "2" || g === "2.0") { th = "2.0"; us = "C"; percent = "60-64%"; uk = "Pass"; }
    else if (g === "D+" || g === "1.5") { th = "1.5"; us = "D+"; percent = "55-59%"; uk = "Fail / Marginal"; }
    else if (g === "D" || g === "1" || g === "1.0") { th = "1.0"; us = "D"; percent = "50-54%"; uk = "Fail"; }
    else if (g === "F" || g === "0" || g === "0.0") { th = "0.0"; us = "F"; percent = "0-49%"; uk = "Fail"; }
    else { alert("Invalid grade"); return; }

    setResult({ th, us, percent, uk });
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "แปลงเกรดต่างประเทศ" : "Grade Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="flex gap-2">
           <input type="text" placeholder={lang==="TH"?"ใส่เกรด (เช่น A, B+, 4.0)":"Enter grade (A, B+, 4.0)"} value={grade} onChange={e=>setGrade(e.target.value)} required className={`${inputClass} focus:ring-blue-400 flex-1 uppercase`} />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600">{lang==="TH"?"แปลงเกรด":"Convert Grade"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-2">
           <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <span className="font-bold">Thai (4.0 Scale)</span><span className="text-blue-600 font-black">{result.th}</span>
           </div>
           <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <span className="font-bold">US Letter Grade</span><span className="text-blue-600 font-black">{result.us}</span>
           </div>
           <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <span className="font-bold">Percentage</span><span className="text-blue-600 font-black">{result.percent}</span>
           </div>
           <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
             <span className="font-bold">UK Honours</span><span className="text-blue-600 font-black">{result.uk}</span>
           </div>
        </motion.div>
      )}
    </div>
  );
}

// 2. Target GPA
export function TargetGPACalculator({ lang }: { lang: Lang }) {
  const [currentGPA, setCurrentGPA] = useLocalState("tg_cgpa", "3.00");
  const [currentCredits, setCurrentCredits] = useLocalState("tg_ccrd", "90");
  const [targetGPA, setTargetGPA] = useLocalState("tg_tgpa", "3.25");
  const [newCredits, setNewCredits] = useLocalState("tg_ncrd", "15");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cg = parseFloat(currentGPA);
    const cc = parseFloat(currentCredits);
    const tg = parseFloat(targetGPA);
    const nc = parseFloat(newCredits);

    if (cc > 0 && nc > 0) {
      const currentPoints = cg * cc;
      const targetPoints = tg * (cc + nc);
      const neededPoints = targetPoints - currentPoints;
      const neededGPA = neededPoints / nc;

      setResult({
        needed: neededGPA.toFixed(2),
        possible: neededGPA <= 4.0 && neededGPA >= 0
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "เป้าหมาย GPA" : "Target GPA"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang==="TH"?"GPA สะสมปัจจุบัน":"Current GPA"}</label><input type="number" step="0.01" value={currentGPA} onChange={e=>setCurrentGPA(e.target.value)} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang==="TH"?"หน่วยกิตสะสมรวม":"Current Credits"}</label><input type="number" step="0.5" value={currentCredits} onChange={e=>setCurrentCredits(e.target.value)} required className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang==="TH"?"GPA ที่ต้องการ":"Target GPA"}</label><input type="number" step="0.01" value={targetGPA} onChange={e=>setTargetGPA(e.target.value)} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang==="TH"?"หน่วยกิตเทอมนี้":"New Credits"}</label><input type="number" step="0.5" value={newCredits} onChange={e=>setNewCredits(e.target.value)} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600">{lang==="TH"?"คำนวณเกรดที่ต้องได้":"Calculate Required GPA"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-8 p-6 rounded-xl text-center border ${result.possible ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
           <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"เทอมนี้ต้องทำเกรดให้ได้เฉลี่ย":"You need to average"}</div>
           <div className={`text-5xl font-black ${result.possible ? 'text-blue-600' : 'text-red-600'}`}>{result.needed}</div>
           {!result.possible && <div className="text-sm text-red-500 mt-2 font-bold">{lang==="TH"?"เป็นไปไม่ได้ (เกิน 4.00)":"Impossible (over 4.0)"}</div>}
        </motion.div>
      )}
    </div>
  );
}

// 3. Percentile Calculator
export function PercentileCalculator({ lang }: { lang: Lang }) {
  const [score, setScore] = useLocalState("pct_sc", "85");
  const [mean, setMean] = useLocalState("pct_mean", "70");
  const [sd, setSd] = useLocalState("pct_sd", "10");
  const [result, setResult] = useState<any>(null);

  // Approx standard normal CDF
  const normCDF = (z: number) => {
    return 1 / (1 + Math.exp(-1.702 * z));
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(score);
    const m = parseFloat(mean);
    const s = parseFloat(sd);
    if (s > 0) {
      const z = (x - m) / s;
      const p = normCDF(z) * 100;
      setResult({ z: z.toFixed(2), p: p.toFixed(2) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณ Percentile & Z-Score" : "Percentile & Z-Score"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "คะแนนของคุณ" : "Your Score"}</label>
          <input type="number" step="0.1" value={score} onChange={e=>setScore(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "คะแนนเฉลี่ย (Mean)" : "Mean"}</label><input type="number" step="0.1" value={mean} onChange={e=>setMean(e.target.value)} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ส่วนเบี่ยงเบนมาตรฐาน (SD)" : "SD"}</label><input type="number" step="0.1" value={sd} onChange={e=>setSd(e.target.value)} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4">
           <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-center border border-blue-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"เปอร์เซ็นไทล์ที่":"Percentile"}</div>
             <div className="text-3xl font-black text-blue-600">{result.p}%</div>
           </div>
           <div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-xl text-center border border-purple-200">
             <div className="text-sm text-gray-500 mb-1">Z-Score</div>
             <div className="text-3xl font-black text-purple-600">{result.z}</div>
           </div>
        </motion.div>
      )}
    </div>
  );
}

// 4. Reading Time
export function ReadingTimeCalculator({ lang }: { lang: Lang }) {
  const [pages, setPages] = useLocalState("rd_pages", "300");
  const [speed, setSpeed] = useLocalState("rd_spd", "30"); // pages per hour
  const [hoursPerDay, setHoursPerDay] = useLocalState("rd_hrd", "2");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pages);
    const s = parseInt(speed);
    const h = parseInt(hoursPerDay);
    if (p > 0 && s > 0 && h > 0) {
      const totalHours = p / s;
      const days = totalHours / h;
      setResult({ totalHours: totalHours.toFixed(1), days: Math.ceil(days) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณเวลาอ่านหนังสือ" : "Reading Time"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนหน้าที่ต้องอ่าน" : "Total Pages"}</label>
          <input type="number" value={pages} onChange={e=>setPages(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ความเร็ว (หน้า/ชม.)" : "Speed (pages/hr)"}</label><input type="number" value={speed} onChange={e=>setSpeed(e.target.value)} required className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ชั่วโมงที่อ่าน/วัน" : "Hours per day"}</label><input type="number" value={hoursPerDay} onChange={e=>setHoursPerDay(e.target.value)} required className={inputClass} /></div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600">{lang==="TH"?"คำนวณเวลา":"Calculate Time"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-center border border-blue-200">
           <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"คุณจะอ่านจบใน":"You will finish in"}</div>
           <div className="text-4xl font-black text-blue-600">{result.days} {lang==="TH"?"วัน":"Days"}</div>
           <div className="text-sm text-gray-500 mt-2">({lang==="TH"?"ใช้เวลารวม":"Total time:"} {result.totalHours} {lang==="TH"?"ชม.":"hrs"})</div>
        </motion.div>
      )}
    </div>
  );
}
