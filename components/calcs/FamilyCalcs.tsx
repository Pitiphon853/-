"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. Ovulation
export function OvulationCalculator({ lang }: { lang: Lang }) {
  const [lastDate, setLastDate] = useLocalState("ovu_date", "");
  const [cycle, setCycle] = useLocalState("ovu_cycle", "28");
  const [ovDate, setOvDate] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastDate) {
      const d = new Date(lastDate);
      // Typically, ovulation is cycle length - 14 days after the first day of last period
      const addDays = parseInt(cycle) - 14;
      d.setDate(d.getDate() + addDays);
      setOvDate(d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณวันไข่ตก" : "Ovulation Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "วันแรกของการมีประจำเดือนครั้งล่าสุด" : "First day of last period"}</label>
          <input type="date" value={lastDate} onChange={e=>setLastDate(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "รอบเดือนของคุณ (ปกติ 28 วัน)" : "Cycle length (usually 28)"}</label>
          <input type="number" value={cycle} onChange={e=>setCycle(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {ovDate && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "วันที่คาดว่าไข่จะตกคือ" : "Estimated ovulation date:"}</p>
          <div className="text-3xl font-black text-pink-600 dark:text-pink-400">{ovDate}</div>
          <p className="mt-2 text-sm text-gray-500">{lang==="TH"?"(มีเพศสัมพันธ์ในช่วง 2 วันก่อนและหลังวันนี้ จะมีโอกาสตั้งครรภ์สูง)":"(High chance of pregnancy around this date)"}</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "การตกไข่ (FAQ)" : "Ovulation FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ไข่ตกนับอย่างไร?" : "How is it calculated?"}
          a={lang === "TH" ? "โดยทั่วไปไข่จะตกก่อนวันประจำเดือนรอบถัดไปประมาณ 14 วัน ดังนั้นถ้ารอบเดือนคือ 28 วัน ไข่จะตกในวันที่ 14 นับจากวันแรกที่มีประจำเดือน" : "Ovulation typically occurs 14 days before the next period starts."}
        />
      </SEOFAQ>
    </div>
  );
}

// 2. Due Date
export function DueDateCalculator({ lang }: { lang: Lang }) {
  const [lastDate, setLastDate] = useLocalState("due_date", "");
  const [dueDate, setDueDate] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastDate) {
      const d = new Date(lastDate);
      d.setDate(d.getDate() + 280); // Naegele's rule: LMP + 280 days
      setDueDate(d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณกำหนดคลอด" : "Due Date Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "วันแรกของการมีประจำเดือนครั้งสุดท้าย (LMP)" : "First day of last period"}</label>
          <input type="date" value={lastDate} onChange={e=>setLastDate(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {dueDate && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "กำหนดคลอดโดยประมาณของคุณคือ" : "Estimated due date:"}</p>
          <div className="text-3xl font-black text-pink-600 dark:text-pink-400">{dueDate}</div>
          <ShareButtons title={`กำหนดคลอดตัวน้อยคือวันที่ ${dueDate} ตื่นเต้นจัง!`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "กำหนดคลอด (FAQ)" : "Due Date FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "สูตรคำนวณกำหนดคลอดคืออะไร?" : "What is the formula?"}
          a={lang === "TH" ? "ใช้กฎของ Naegele คือ การนำวันแรกของการมีประจำเดือนครั้งสุดท้าย บวกไปอีก 280 วัน (40 สัปดาห์) ซึ่งเป็นอายุครรภ์เฉลี่ย" : "It adds 280 days (40 weeks) to the first day of your last period."}
        />
      </SEOFAQ>
    </div>
  );
}

// 3. Child Height Predictor
export function ChildHeightCalculator({ lang }: { lang: Lang }) {
  const [dad, setDad] = useLocalState("ch_dad", "");
  const [mom, setMom] = useLocalState("ch_mom", "");
  const [gender, setGender] = useLocalState("ch_gen", "boy");
  const [res, setRes] = useState<{min:number, max:number, target:number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseFloat(mom);
    const d = parseFloat(dad);
    if(m>0 && d>0) {
      let target = 0;
      if (gender === "boy") {
        target = (d + m + 13) / 2;
      } else {
        target = (d + m - 13) / 2;
      }
      // Target Height range is usually ±8.5cm
      setRes({ target: Math.round(target), min: Math.round(target - 8.5), max: Math.round(target + 8.5) });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณส่วนสูงลูกในอนาคต" : "Child Height Predictor"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูงพ่อ (ซม.)" : "Dad's Height (cm)"}</label>
            <input type="number" value={dad} onChange={e=>setDad(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูงแม่ (ซม.)" : "Mom's Height (cm)"}</label>
            <input type="number" value={mom} onChange={e=>setMom(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เพศของลูก" : "Child's Gender"}</label>
          <select value={gender} onChange={e=>setGender(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="boy">{lang === "TH" ? "ลูกชาย" : "Boy"}</option>
            <option value="girl">{lang === "TH" ? "ลูกสาว" : "Girl"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ส่วนสูงที่คาดหวังเมื่อโตเต็มวัยคือ" : "Target height:"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{res.target} <span className="text-2xl">cm</span></div>
          <p className="mt-2 text-sm text-gray-500">{lang==="TH"?`อยู่ในช่วงความสูง: ${res.min} - ${res.max} ซม.`:`Range: ${res.min} - ${res.max} cm`}</p>
          <ShareButtons title={`ทายซิว่าลูกของฉันจะสูง ${res.target} เซนติเมตร!`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "ส่วนสูงลูก (FAQ)" : "Child Height FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "สูตรความสูงเป้าหมายคืออะไร?" : "What is the Target Height formula?"}
          a={lang === "TH" ? "เป็นสูตรทางการแพทย์ที่เรียกว่า Mid-parental height โดยคำนวณจากพันธุกรรมของพ่อแม่ บวกลบ 13 ซม. ตามเพศ แล้วหารสอง ความสูงจริงอาจขึ้นอยู่กับโภชนาการและการนอนหลับด้วย" : "Mid-parental height formula based on genetics."}
        />
      </SEOFAQ>
    </div>
  );
}
