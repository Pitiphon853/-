"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass } from "./shared";

// 1. Randomizer
export function RandomizerCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("rand_mode", "number");
  const [min, setMin] = useLocalState("rand_min", "1");
  const [max, setMax] = useLocalState("rand_max", "100");
  const [names, setNames] = useLocalState("rand_names", "");
  const [res, setRes] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if(mode === "number") {
      const mn = parseInt(min);
      const mx = parseInt(max);
      if(mx >= mn) {
        setRes(Math.floor(Math.random() * (mx - mn + 1) + mn).toString());
      }
    } else {
      const list = names.split("\n").filter(n => n.trim() !== "");
      if(list.length > 0) {
        setRes(list[Math.floor(Math.random() * list.length)]);
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "สุ่มเลข/สุ่มชื่อ" : "Randomizer"}</h2>
      
      <div className="flex gap-4 mt-6 mb-4">
        <button onClick={() => setMode("number")} className={`px-4 py-2 rounded-full font-bold text-sm ${mode === "number" ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>{lang==="TH"?"สุ่มตัวเลข":"Numbers"}</button>
        <button onClick={() => setMode("name")} className={`px-4 py-2 rounded-full font-bold text-sm ${mode === "name" ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>{lang==="TH"?"สุ่มชื่อ":"Names"}</button>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        {mode === "number" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าน้อยสุด" : "Min"}</label>
              <input type="number" value={min} onChange={e=>setMin(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่ามากสุด" : "Max"}</label>
              <input type="number" value={max} onChange={e=>setMax(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
            </div>
          </div>
        ) : (
          <div>
            <label className={labelClass}>{lang === "TH" ? "รายชื่อ (กด Enter เพื่อขึ้นบรรทัดใหม่)" : "List of Names (One per line)"}</label>
            <textarea rows={5} value={names} onChange={e=>setNames(e.target.value)} required className={`${inputClass} focus:ring-purple-500 resize-none`} placeholder={lang==="TH"?"นาย เอ\nนาย บี\nนาย ซี":"Alice\nBob\nCharlie"} />
          </div>
        )}
        <button type="submit" className="w-full py-4 bg-purple-500 font-bold text-white rounded hover:bg-purple-600 shadow-md">{lang === "TH" ? "สุ่มเลย!" : "Randomize!"}</button>
      </form>
      {res !== null && (
        <motion.div initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center border border-purple-200 dark:border-purple-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ผู้โชคดีคือ..." : "The winner is..."}</p>
          <div className="text-5xl font-black text-purple-600 dark:text-purple-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 2. Word Counter
export function WordCounter({ lang }: { lang: Lang }) {
  const [text, setText] = useLocalState("word_txt", "");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const noSpaceChars = text.replace(/\s/g, '').length;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "นับจำนวนคำ/ตัวอักษร" : "Word/Char Counter"}</h2>
      <div className="space-y-4 mt-6">
        <textarea rows={8} value={text} onChange={e=>setText(e.target.value)} className={`${inputClass} focus:ring-purple-500 resize-none`} placeholder={lang==="TH"?"พิมพ์หรือวางข้อความที่นี่...":"Type or paste text here..."} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"คำ (Words)":"Words"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{words}</div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ตัวอักษร":"Characters"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{chars}</div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">{lang==="TH"?"ไม่รวมช่องว่าง":"No Spaces"}</p>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{noSpaceChars}</div>
        </div>
      </div>
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 3. Age Calculator
export function AgeCalculator({ lang }: { lang: Lang }) {
  const [dob, setDob] = useLocalState("age_dob", "");
  const [res, setRes] = useState<{y:number, m:number, d:number, totalDays:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) {
      const birth = new Date(dob);
      const now = new Date();
      
      let y = now.getFullYear() - birth.getFullYear();
      let m = now.getMonth() - birth.getMonth();
      let d = now.getDate() - birth.getDate();

      if (d < 0) {
        m--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += lastMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      setRes({ y, m, d, totalDays });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600 dark:text-purple-400">{lang === "TH" ? "คำนวณอายุแบบละเอียด" : "Age Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "วันเกิดของคุณ" : "Date of Birth"}</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} required className={`${inputClass} focus:ring-purple-500`} />
        </div>
        <button type="submit" className="w-full py-4 bg-purple-500 font-bold text-white rounded hover:bg-purple-600 shadow-md">{lang === "TH" ? "คำนวณอายุ" : "Calculate Age"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
          <div className="p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center border border-purple-200 dark:border-purple-500/30">
            <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "อายุของคุณคือ" : "Your exact age is"}</p>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
              {res.y} {lang==="TH"?"ปี":"Years"} {res.m} {lang==="TH"?"เดือน":"Months"} {res.d} {lang==="TH"?"วัน":"Days"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl text-center">
              <p className="text-sm text-gray-500">{lang==="TH"?"ใช้ชีวิตมาแล้วทั้งหมด":"Total Days Lived"}</p>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{res.totalDays.toLocaleString()} {lang==="TH"?"วัน":"days"}</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl text-center">
              <p className="text-sm text-gray-500">{lang==="TH"?"หรือประมาณ":"Or approx"}</p>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{(res.totalDays * 24).toLocaleString()} {lang==="TH"?"ชั่วโมง":"hours"}</div>
            </div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}
