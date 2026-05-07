"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, ExportResult, RelatedCalcs } from "./shared";
import { Gauge } from "../Gauge";

// 1. แคลอรี่จากออกกำลังกาย (Exercise Calories via MET)
export function ExerciseCaloriesCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [weight, setWeight] = useLocalState("exc_w", "70");
  const [duration, setDuration] = useLocalState("exc_t", "30");
  const [activity, setActivity] = useLocalState("exc_act", "7.0"); // Default Jogging
  const [result, setResult] = useState<number | null>(null);

  const activities = [
    { value: "3.5", th: "เดินเร็ว (Brisk Walking)", en: "Brisk Walking" },
    { value: "7.0", th: "วิ่งเหยาะๆ (Jogging)", en: "Jogging" },
    { value: "9.8", th: "วิ่งเร็ว (Running)", en: "Running" },
    { value: "8.0", th: "ปั่นจักรยาน (Cycling)", en: "Cycling" },
    { value: "6.0", th: "ว่ายน้ำ (Swimming)", en: "Swimming" },
    { value: "3.0", th: "โยคะ/ยืดเหยียด (Yoga)", en: "Yoga" },
    { value: "8.0", th: "ยกน้ำหนัก (Weightlifting - Heavy)", en: "Weightlifting" },
    { value: "5.0", th: "เต้นแอโรบิก (Aerobics)", en: "Aerobics" },
    { value: "10.0", th: "กระโดดเชือก (Jump Rope)", en: "Jump Rope" },
    { value: "7.0", th: "ฟุตบอล (Football/Soccer)", en: "Football" },
    { value: "8.0", th: "บาสเกตบอล (Basketball)", en: "Basketball" },
    { value: "6.0", th: "เดินป่า (Hiking)", en: "Hiking" }
  ];

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const t = parseFloat(duration);
    const met = parseFloat(activity);
    if (w > 0 && t > 0) {
      // Calories = MET × Weight (kg) × Time (hours)
      const calories = met * w * (t / 60);
      setResult(Math.round(calories));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณแคลอรี่จากออกกำลังกาย" : "Exercise Calories Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภทกิจกรรม" : "Activity Type"}</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            {activities.map(a => <option key={a.th} value={a.value}>{lang === "TH" ? a.th : a.en}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนักตัว (กก.)" : "Weight (kg)"}</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (นาที)" : "Duration (mins)"}</label>
            <input type="number" value={duration} onChange={e => setDuration(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      
      {result !== null && (
        <motion.div id="exc-result" initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "คุณเผาผลาญพลังงานไปทั้งหมด" : "Total Calories Burned"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{result} <span className="text-2xl">kcal</span></div>
          <div className="mt-6 flex justify-center">
            <ShareButtons title={`ฉันเผาผลาญไป ${result} kcal เย้!`} />
          </div>
        </motion.div>
      )}
      
      <AdPlaceholder type="in-article" />
      <RelatedCalcs lang={lang} setCalc={setCalc} links={[ {id:"tdee", name: lang==="TH"?"คำนวณ TDEE":"TDEE Calculator"}, {id:"food-random", name: lang==="TH"?"สุ่มอาหารแคลอรี่ต่ำ":"Low Cal Meal"} ]} />
      
      <SEOFAQ title={lang === "TH" ? "การเผาผลาญแคลอรี่ (FAQ)" : "Calories Burned FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ค่า MET คืออะไร?" : "What is MET?"}
          a={lang === "TH" ? "MET (Metabolic Equivalent of Task) คือหน่วยวัดอัตราการใช้พลังงานของร่างกายขณะทำกิจกรรมต่างๆ โดยอ้างอิงกับน้ำหนักตัวและเวลา" : "MET stands for Metabolic Equivalent of Task, a physiological measure expressing the energy cost of physical activities."}
        />
      </SEOFAQ>
    </div>
  );
}

// 2. โปรตีนต่อวัน (Protein per day)
export function ProteinCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [weight, setWeight] = useLocalState("prot_w", "70");
  const [goal, setGoal] = useLocalState("prot_goal", "maintain");
  const [activity, setActivity] = useLocalState("prot_act", "sedentary");
  const [result, setResult] = useState<{min:number, max:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (w > 0) {
      let multiplierMin = 0.8;
      let multiplierMax = 1.0;
      
      if (activity === "sedentary") { multiplierMin = 0.8; multiplierMax = 1.0; }
      else if (activity === "active") { multiplierMin = 1.2; multiplierMax = 1.6; }
      else if (activity === "athlete") { multiplierMin = 1.6; multiplierMax = 2.2; }
      
      if (goal === "loss") { multiplierMin += 0.2; multiplierMax += 0.4; }
      else if (goal === "gain") { multiplierMin += 0.2; multiplierMax += 0.2; }
      
      setResult({ min: Math.round(w * multiplierMin), max: Math.round(w * multiplierMax) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "โปรตีนที่ควรได้รับต่อวัน" : "Daily Protein Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนักตัว (กก.)" : "Weight (kg)"}</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เป้าหมาย" : "Goal"}</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
              <option value="loss">{lang === "TH" ? "ลดน้ำหนัก" : "Weight Loss"}</option>
              <option value="maintain">{lang === "TH" ? "รักษาน้ำหนัก" : "Maintain Weight"}</option>
              <option value="gain">{lang === "TH" ? "เพิ่มกล้ามเนื้อ" : "Gain Muscle"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "การออกกำลังกาย" : "Activity Level"}</label>
            <select value={activity} onChange={e => setActivity(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
              <option value="sedentary">{lang === "TH" ? "ไม่ออกกำลังกาย" : "Sedentary"}</option>
              <option value="active">{lang === "TH" ? "ออกกำลังกาย 3-4 วัน/สัปดาห์" : "Active"}</option>
              <option value="athlete">{lang === "TH" ? "นักกีฬา/เวทเทรนนิ่งหนัก" : "Athlete"}</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      
      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "คุณควรได้รับโปรตีนวันละ" : "You need about"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{result.min} - {result.max} <span className="text-2xl">กรัม (g)</span></div>
          
          <div className="mt-6 text-sm text-left p-4 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
            <p className="font-bold mb-2">{lang === "TH" ? "เทียบเท่ากับอาหารประมาณ:" : "Equivalent to approximately:"}</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
              <li>{lang === "TH" ? `อกไก่ ${Math.round(result.min / 25)} - ${Math.round(result.max / 25)} ชิ้น (100g = 25g)` : `Chicken Breast ${Math.round(result.min / 25)} - ${Math.round(result.max / 25)} servings (100g)`}</li>
              <li>{lang === "TH" ? `ไข่ไก่ ${Math.round(result.min / 6)} - ${Math.round(result.max / 6)} ฟอง (1 ฟอง = 6g)` : `Eggs ${Math.round(result.min / 6)} - ${Math.round(result.max / 6)} large eggs`}</li>
            </ul>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 3. ไขมันในร่างกาย (Body Fat % Navy Method)
export function BodyFatCalculator({ lang }: { lang: Lang }) {
  const [gender, setGender] = useLocalState("bf_gen", "M");
  const [height, setHeight] = useLocalState("bf_h", "170");
  const [waist, setWaist] = useLocalState("bf_w", "80");
  const [neck, setNeck] = useLocalState("bf_n", "38");
  const [hip, setHip] = useLocalState("bf_hip", "90");
  const [result, setResult] = useState<{bf:number, status:string} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const hi = parseFloat(hip);
    
    if (h > 0 && w > 0 && n > 0) {
      let bf = 0;
      if (gender === "M") {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        if (hi > 0) {
          bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
        } else {
           alert(lang === "TH" ? "กรุณาใส่รอบสะโพก" : "Please enter hip circumference"); return;
        }
      }
      
      let status = "";
      if (gender === "M") {
        if (bf < 6) status = lang==="TH"?"ต่ำมาก (Essential Fat)":"Essential Fat";
        else if (bf <= 13) status = lang==="TH"?"นักกีฬา (Athlete)":"Athlete";
        else if (bf <= 17) status = lang==="TH"?"ฟิต (Fitness)":"Fitness";
        else if (bf <= 24) status = lang==="TH"?"ปกติ (Average)":"Average";
        else status = lang==="TH"?"อ้วน (Obese)":"Obese";
      } else {
        if (bf < 14) status = lang==="TH"?"ต่ำมาก (Essential Fat)":"Essential Fat";
        else if (bf <= 20) status = lang==="TH"?"นักกีฬา (Athlete)":"Athlete";
        else if (bf <= 24) status = lang==="TH"?"ฟิต (Fitness)":"Fitness";
        else if (bf <= 31) status = lang==="TH"?"ปกติ (Average)":"Average";
        else status = lang==="TH"?"อ้วน (Obese)":"Obese";
      }
      
      setResult({ bf: Math.max(0, parseFloat(bf.toFixed(1))), status });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณ Body Fat %" : "Body Fat % Calculator"}</h2>
      <p className="text-gray-500 mb-6 text-sm">{lang==="TH"?"คำนวณโดยใช้ US Navy Method":"Using the US Navy Method"}</p>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="M">{lang === "TH" ? "ชาย" : "Male"}</option>
            <option value="F">{lang === "TH" ? "หญิง" : "Female"}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูง (cm)" : "Height (cm)"}</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "รอบคอ (cm)" : "Neck (cm)"}</label>
            <input type="number" value={neck} onChange={e => setNeck(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "รอบเอว (cm)" : "Waist (cm)"}</label>
            <input type="number" value={waist} onChange={e => setWaist(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          {gender === "F" && (
            <div>
              <label className={labelClass}>{lang === "TH" ? "รอบสะโพก (cm)" : "Hip (cm)"}</label>
              <input type="number" value={hip} onChange={e => setHip(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
            </div>
          )}
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ % ไขมัน" : "Calculate Body Fat %"}</button>
      </form>
      
      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "เปอร์เซ็นต์ไขมันในร่างกายของคุณคือ" : "Your Body Fat %"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{result.bf}%</div>
          <div className="mt-2 text-xl font-bold text-gray-700 dark:text-gray-200">{result.status}</div>
        </motion.div>
      )}
    </div>
  );
}

// 4. อัตราส่วนเอว/สะโพก (WHR)
export function WHRCalculator({ lang }: { lang: Lang }) {
  const [gender, setGender] = useLocalState("whr_gen", "M");
  const [waist, setWaist] = useLocalState("whr_w", "80");
  const [hip, setHip] = useLocalState("whr_h", "100");
  const [result, setResult] = useState<{whr:number, risk:string} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    if (w > 0 && h > 0) {
      const whr = w / h;
      let risk = "";
      if (gender === "M") {
        if (whr < 0.9) risk = lang==="TH"?"เสี่ยงต่ำ":"Low Risk";
        else if (whr <= 0.99) risk = lang==="TH"?"เสี่ยงปานกลาง":"Moderate Risk";
        else risk = lang==="TH"?"เสี่ยงสูง":"High Risk";
      } else {
        if (whr < 0.8) risk = lang==="TH"?"เสี่ยงต่ำ":"Low Risk";
        else if (whr <= 0.84) risk = lang==="TH"?"เสี่ยงปานกลาง":"Moderate Risk";
        else risk = lang==="TH"?"เสี่ยงสูง":"High Risk";
      }
      setResult({ whr: parseFloat(whr.toFixed(2)), risk });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "อัตราส่วนเอวต่อสะโพก (WHR)" : "Waist-Hip Ratio (WHR)"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="M">{lang === "TH" ? "ชาย" : "Male"}</option>
            <option value="F">{lang === "TH" ? "หญิง" : "Female"}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "รอบเอว (cm)" : "Waist (cm)"}</label>
            <input type="number" value={waist} onChange={e => setWaist(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "รอบสะโพก (cm)" : "Hip (cm)"}</label>
            <input type="number" value={hip} onChange={e => setHip(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ WHR" : "Calculate WHR"}</button>
      </form>
      
      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "อัตราส่วน WHR ของคุณ" : "Your WHR"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{result.whr}</div>
          <div className="mt-2 text-xl font-bold text-gray-700 dark:text-gray-200">{lang==="TH"?"ระดับความเสี่ยงโรคอ้วนลงพุง:":"Health Risk:"} <span className={result.risk.includes('สูง') || result.risk.includes('High') ? 'text-red-500' : 'text-green-500'}>{result.risk}</span></div>
        </motion.div>
      )}
    </div>
  );
}

// 5. โซนอัตราการเต้นหัวใจ (Heart Rate Zones)
export function HeartRateZoneCalculator({ lang }: { lang: Lang }) {
  const [age, setAge] = useLocalState("hr_age", "30");
  const [rhr, setRhr] = useLocalState("hr_rhr", "60");
  const [result, setResult] = useState<{max:number, zones:any[]} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    const r = parseInt(rhr);
    if (a > 0 && r > 0) {
      const maxHr = 220 - a;
      const hrr = maxHr - r; // Heart Rate Reserve (Karvonen method)
      
      const calcZone = (minP:number, maxP:number) => {
        return `${Math.round(r + (hrr * minP))} - ${Math.round(r + (hrr * maxP))}`;
      };

      setResult({
        max: maxHr,
        zones: [
          { name: "Zone 1 (50-60%)", desc: lang==="TH"?"วอร์มอัพ สุขภาพดี":"Warm up, Health", bpm: calcZone(0.5, 0.6) },
          { name: "Zone 2 (60-70%)", desc: lang==="TH"?"เผาผลาญไขมัน":"Fat Burning", bpm: calcZone(0.6, 0.7) },
          { name: "Zone 3 (70-80%)", desc: lang==="TH"?"แอโรบิก เพิ่มความอึด":"Aerobic, Endurance", bpm: calcZone(0.7, 0.8) },
          { name: "Zone 4 (80-90%)", desc: lang==="TH"?"แอนแอโรบิก เพิ่มประสิทธิภาพ":"Anaerobic, Performance", bpm: calcZone(0.8, 0.9) },
          { name: "Zone 5 (90-100%)", desc: lang==="TH"?"สูงสุด ระเบิดพลัง":"Maximum, Sprint", bpm: calcZone(0.9, 1.0) }
        ]
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "โซนอัตราการเต้นของหัวใจ" : "Heart Rate Zones"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุ (ปี)" : "Age"}</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ชีพจรขณะพัก (bpm)" : "Resting HR (bpm)"}</label>
            <input type="number" value={rhr} onChange={e => setRhr(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณโซนหัวใจ" : "Calculate Zones"}</button>
      </form>
      
      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
          <div className="text-center mb-6">
             <div className="text-lg text-gray-500">{lang==="TH"?"อัตราการเต้นของหัวใจสูงสุด (Max HR)":"Maximum Heart Rate"}</div>
             <div className="text-4xl font-black text-pink-600">{result.max} <span className="text-xl">bpm</span></div>
          </div>
          <div className="grid grid-cols-1 gap-3">
             {result.zones.map((z, i) => (
                <div key={i} className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center shadow-sm">
                   <div>
                      <div className="font-bold text-pink-600 dark:text-pink-400">{z.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{z.desc}</div>
                   </div>
                   <div className="text-xl font-bold text-gray-900 dark:text-white">{z.bpm} <span className="text-sm font-normal">bpm</span></div>
                </div>
             ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 6. สัดส่วน Macro (Macro split)
export function MacroCalculator({ lang }: { lang: Lang }) {
  const [tdee, setTdee] = useLocalState("mac_tdee", "2000");
  const [goal, setGoal] = useLocalState("mac_goal", "maintenance");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const c = parseInt(tdee);
    if (c > 0) {
      let carbP = 0, fatP = 0, protP = 0;
      if (goal === "loss") { carbP = 0.3; protP = 0.4; fatP = 0.3; } // Higher protein for satiety
      else if (goal === "bulk") { carbP = 0.5; protP = 0.3; fatP = 0.2; } // Higher carb for energy
      else { carbP = 0.4; protP = 0.3; fatP = 0.3; } // Balanced

      setResult({
        carb: Math.round((c * carbP) / 4),
        prot: Math.round((c * protP) / 4),
        fat: Math.round((c * fatP) / 9),
        carbP: carbP * 100, protP: protP * 100, fatP: fatP * 100
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณสัดส่วน Macro" : "Macro Split Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "พลังงาน TDEE (kcal/วัน)" : "TDEE Calories/day"}</label>
          <input type="number" value={tdee} onChange={e => setTdee(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เป้าหมาย" : "Goal"}</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="loss">{lang === "TH" ? "ลดไขมัน (Low Carb, High Protein)" : "Weight Loss"}</option>
            <option value="maintenance">{lang === "TH" ? "รักษาน้ำหนัก (Balanced)" : "Maintenance"}</option>
            <option value="bulk">{lang === "TH" ? "เพิ่มกล้ามเนื้อ (High Carb)" : "Muscle Building / Bulk"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ Macro" : "Calculate Macros"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-3 gap-4">
           <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-center border border-blue-200">
             <div className="text-sm text-blue-600 dark:text-blue-400 font-bold">{lang==="TH"?"คาร์บ":"Carbs"} ({result.carbP}%)</div>
             <div className="text-2xl font-black text-gray-900 dark:text-white">{result.carb}g</div>
           </div>
           <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl text-center border border-red-200">
             <div className="text-sm text-red-600 dark:text-red-400 font-bold">{lang==="TH"?"โปรตีน":"Protein"} ({result.protP}%)</div>
             <div className="text-2xl font-black text-gray-900 dark:text-white">{result.prot}g</div>
           </div>
           <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl text-center border border-yellow-200">
             <div className="text-sm text-yellow-600 dark:text-yellow-400 font-bold">{lang==="TH"?"ไขมัน":"Fat"} ({result.fatP}%)</div>
             <div className="text-2xl font-black text-gray-900 dark:text-white">{result.fat}g</div>
           </div>
        </motion.div>
      )}
    </div>
  );
}

// 7. แปลงน้ำตาลในเลือด (Blood Sugar Converter)
export function BloodSugarConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useState("100");
  const [unit, setUnit] = useState("mg");
  const [res, setRes] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const v = parseFloat(val);
    if (v > 0) {
      if (unit === "mg") setRes((v / 18).toFixed(1) + " mmol/L");
      else setRes((v * 18).toFixed(0) + " mg/dL");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "แปลงค่าน้ำตาลในเลือด" : "Blood Sugar Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
         <div className="flex gap-2">
            <input type="number" value={val} step="0.1" onChange={e=>setVal(e.target.value)} required className={`${inputClass} focus:ring-pink-400 flex-1`} />
            <select value={unit} onChange={e=>setUnit(e.target.value)} className={`${inputClass} w-32 focus:ring-pink-400`}>
               <option value="mg">mg/dL</option>
               <option value="mmol">mmol/L</option>
            </select>
         </div>
         <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"แปลงค่า":"Convert"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200">
          <div className="text-4xl font-black text-pink-600 dark:text-pink-400">{res}</div>
          <p className="mt-4 text-sm text-gray-500">{lang==="TH"?"ปกติ (งดอาหาร): 70-99 mg/dL (3.9-5.5 mmol/L)":"Normal (Fasting): 70-99 mg/dL (3.9-5.5 mmol/L)"}</p>
        </motion.div>
      )}
    </div>
  );
}

// 8. น้ำหนักในอุดมคติ (Ideal Body Weight)
export function IBWCalculator({ lang }: { lang: Lang }) {
  const [gender, setGender] = useLocalState("ibw_gen", "M");
  const [height, setHeight] = useLocalState("ibw_h", "170");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const hInches = parseFloat(height) / 2.54;
    const over5ft = Math.max(0, hInches - 60);

    let devine = 0, robinson = 0, miller = 0, hamwi = 0;
    
    if (gender === "M") {
      devine = 50 + (2.3 * over5ft);
      robinson = 52 + (1.9 * over5ft);
      miller = 56.2 + (1.41 * over5ft);
      hamwi = 48 + (2.7 * over5ft);
    } else {
      devine = 45.5 + (2.3 * over5ft);
      robinson = 49 + (1.7 * over5ft);
      miller = 53.1 + (1.36 * over5ft);
      hamwi = 45.5 + (2.2 * over5ft);
    }

    setResult({ devine: devine.toFixed(1), robinson: robinson.toFixed(1), miller: miller.toFixed(1), hamwi: hamwi.toFixed(1) });
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "น้ำหนักในอุดมคติ (IBW)" : "Ideal Body Weight"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
              <option value="M">{lang==="TH"?"ชาย":"Male"}</option>
              <option value="F">{lang==="TH"?"หญิง":"Female"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูง (cm)" : "Height (cm)"}</label>
            <input type="number" value={height} onChange={e=>setHeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"คำนวณน้ำหนักอุดมคติ":"Calculate IBW"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-3">
           {[
             { name: "Devine Formula", val: result.devine },
             { name: "Robinson Formula", val: result.robinson },
             { name: "Miller Formula", val: result.miller },
             { name: "Hamwi Formula", val: result.hamwi }
           ].map(r => (
             <div key={r.name} className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
                <span className="font-bold text-gray-700 dark:text-gray-300">{r.name}</span>
                <span className="text-pink-600 font-black text-xl">{r.val} kg</span>
             </div>
           ))}
        </motion.div>
      )}
    </div>
  );
}

// 9. คำนวณก้าวเดิน/วิ่ง (Steps to Distance)
export function StepsCalculator({ lang }: { lang: Lang }) {
  const [steps, setSteps] = useState("10000");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [result, setResult] = useState<{dist:number, cal:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const s = parseInt(steps);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    // Average stride length = height * 0.414 (for females 0.413, roughly 0.414)
    const strideM = (h * 0.414) / 100;
    const distanceKm = (s * strideM) / 1000;
    
    // Roughly 0.04 - 0.05 kcal per step per kg
    const calories = s * 0.04 * (w / 70); 

    setResult({ dist: parseFloat(distanceKm.toFixed(2)), cal: Math.round(calories) });
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณก้าวเดิน (ระยะ/แคลอรี่)" : "Steps Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนก้าว" : "Number of Steps"}</label>
          <input type="number" value={steps} onChange={e=>setSteps(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูง (cm)" : "Height (cm)"}</label>
            <input type="number" value={height} onChange={e=>setHeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนัก (kg)" : "Weight (kg)"}</label>
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"คำนวณ":"Calculate"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 grid grid-cols-2 gap-4">
           <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"ระยะทาง":"Distance"}</div>
             <div className="text-3xl font-black text-pink-600">{result.dist} <span className="text-lg font-normal">km</span></div>
           </div>
           <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"เผาผลาญ":"Calories Burned"}</div>
             <div className="text-3xl font-black text-pink-600">{result.cal} <span className="text-lg font-normal">kcal</span></div>
           </div>
        </motion.div>
      )}
    </div>
  );
}

// 10. 1RM (One Rep Max)
export function OneRepMaxCalculator({ lang }: { lang: Lang }) {
  const [weight, setWeight] = useState("50");
  const [reps, setReps] = useState("5");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (w > 0 && r > 0) {
      const brzycki = w * (36 / (37 - r));
      const epley = w * (1 + 0.0333 * r);
      const lombardi = w * Math.pow(r, 0.10);
      setResult({ b: brzycki.toFixed(1), e: epley.toFixed(1), l: lombardi.toFixed(1) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณ 1RM (One Rep Max)" : "1RM Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนักที่ยกได้ (kg)" : "Weight Lifted (kg)"}</label>
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนครั้ง (Reps)" : "Reps Performed"}</label>
            <input type="number" value={reps} onChange={e=>setReps(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"คำนวณ 1RM":"Calculate 1RM"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"ประมาณการ 1RM (Brzycki)":"Estimated 1RM (Brzycki)"}</div>
             <div className="text-5xl font-black text-pink-600">{result.b} <span className="text-xl font-normal">kg</span></div>
           </div>
           <div className="text-sm text-gray-500 text-center">Epley: {result.e} kg | Lombardi: {result.l} kg</div>
        </motion.div>
      )}
    </div>
  );
}

// 11. คำนวณเวลาวิ่ง/pace (Pace)
export function PaceCalculator({ lang }: { lang: Lang }) {
  const [distKm, setDistKm] = useState("5");
  const [min, setMin] = useState("30");
  const [sec, setSec] = useState("0");
  const [result, setResult] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(distKm);
    const m = parseInt(min) || 0;
    const s = parseInt(sec) || 0;
    
    if (d > 0) {
      const totalSecs = (m * 60) + s;
      const secsPerKm = totalSecs / d;
      const paceMin = Math.floor(secsPerKm / 60);
      const paceSec = Math.round(secsPerKm % 60).toString().padStart(2, '0');
      setResult(`${paceMin}:${paceSec}`);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณ Pace วิ่ง" : "Running Pace Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะทาง (km)" : "Distance (km)"}</label>
          <input type="number" step="0.1" value={distKm} onChange={e=>setDistKm(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (นาที)" : "Time (minutes)"}</label>
            <input type="number" value={min} onChange={e=>setMin(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (วินาที)" : "Time (seconds)"}</label>
            <input type="number" value={sec} onChange={e=>setSec(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"คำนวณ Pace":"Calculate Pace"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "Pace เฉลี่ยของคุณคือ" : "Your Average Pace"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{result} <span className="text-xl">/km</span></div>
        </motion.div>
      )}
    </div>
  );
}
