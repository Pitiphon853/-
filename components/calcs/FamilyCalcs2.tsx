"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Pregnancy Due Date
export function PregnancyDueCalculator({ lang }: { lang: Lang }) {
  const [lmp, setLmp] = useLocalState("preg_lmp", "");
  
  // LMP + 280 days
  let due = "";
  if(lmp) {
    const d = new Date(lmp);
    d.setDate(d.getDate() + 280);
    due = d.toLocaleDateString(lang === "TH" ? "th-TH" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "กำหนดคลอด" : "Pregnancy Due Date"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "วันแรกของประจำเดือนครั้งสุดท้าย" : "First Day of Last Period"}</label><input type="date" value={lmp} onChange={e=>setLmp(e.target.value)} className={inputClass} /></div>
      </div>
      {due && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center">
          <p>{lang === "TH" ? "กำหนดคลอดโดยประมาณ" : "Estimated Due Date"}</p>
          <div className="text-3xl font-black text-pink-600 mt-2">{due}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ครอบครัว)" : "Family FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ" : "This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Ovulation
export function OvulationCalculator({ lang }: { lang: Lang }) {
  const [lmp, setLmp] = useLocalState("ovu_lmp", "");
  const [cycle, setCycle] = useLocalState("ovu_cycle", "28");
  
  // Ovulation = LMP + (cycle - 14) days
  let ovu = "";
  if(lmp && cycle) {
    const d = new Date(lmp);
    d.setDate(d.getDate() + (parseInt(cycle) - 14));
    ovu = d.toLocaleDateString(lang === "TH" ? "th-TH" : "en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "คำนวณวันตกไข่" : "Ovulation"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "วันแรกของประจำเดือนครั้งล่าสุด" : "First Day of Last Period"}</label><input type="date" value={lmp} onChange={e=>setLmp(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "รอบเดือนเฉลี่ย (วัน)" : "Cycle Length (Days)"}</label><input type="number" value={cycle} onChange={e=>setCycle(e.target.value)} className={inputClass} /></div>
      </div>
      {ovu && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center">
          <p>{lang === "TH" ? "วันตกไข่ (มีโอกาสตั้งครรภ์สูงสุด)" : "Estimated Ovulation Date"}</p>
          <div className="text-3xl font-black text-pink-600 mt-2">{ovu}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ครอบครัว)" : "Family FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ" : "This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Blood Type
export function BloodTypePredictor({ lang }: { lang: Lang }) {
  const [m, setM] = useLocalState("bld_m", "A");
  const [f, setF] = useLocalState("bld_f", "B");

  const combos: Record<string, string> = {
    "A-A": "A, O",
    "A-B": "A, B, AB, O",
    "A-AB": "A, B, AB",
    "A-O": "A, O",
    "B-A": "A, B, AB, O",
    "B-B": "B, O",
    "B-AB": "A, B, AB",
    "B-O": "B, O",
    "AB-A": "A, B, AB",
    "AB-B": "A, B, AB",
    "AB-AB": "A, B, AB",
    "AB-O": "A, B",
    "O-A": "A, O",
    "O-B": "B, O",
    "O-AB": "A, B",
    "O-O": "O"
  };

  const key = `${m}-${f}`;
  const res = combos[key];

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "ทำนายกรุ๊ปเลือดลูก" : "Blood Type Predictor"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "แม่" : "Mother"}</label>
            <select value={m} onChange={e=>setM(e.target.value)} className={inputClass}>
              <option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "พ่อ" : "Father"}</label>
            <select value={f} onChange={e=>setF(e.target.value)} className={inputClass}>
              <option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option>
            </select>
          </div>
        </div>
      </div>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center">
          <p>{lang === "TH" ? "กรุ๊ปเลือดที่เป็นไปได้ของลูก" : "Possible Blood Types for Child"}</p>
          <div className="text-4xl font-black text-pink-600 mt-2">{res}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ครอบครัว)" : "Family FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ" : "This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Zodiac
export function ZodiacCalculator({ lang }: { lang: Lang }) {
  const [dob, setDob] = useLocalState("zod_dob", "");
  
  let zod = "";
  if(dob) {
    const d = new Date(dob);
    const day = d.getDate();
    const month = d.getMonth() + 1; // 1-12
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zod = lang==="TH"?"ราศีเมษ (Aries)":"Aries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zod = lang==="TH"?"ราศีพฤษภ (Taurus)":"Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zod = lang==="TH"?"ราศีเมถุน (Gemini)":"Gemini";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zod = lang==="TH"?"ราศีกรกฎ (Cancer)":"Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zod = lang==="TH"?"ราศีสิงห์ (Leo)":"Leo";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zod = lang==="TH"?"ราศีกันย์ (Virgo)":"Virgo";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zod = lang==="TH"?"ราศีตุลย์ (Libra)":"Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zod = lang==="TH"?"ราศีพิจิก (Scorpio)":"Scorpio";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zod = lang==="TH"?"ราศีธนู (Sagittarius)":"Sagittarius";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zod = lang==="TH"?"ราศีมังกร (Capricorn)":"Capricorn";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zod = lang==="TH"?"ราศีกุมภ์ (Aquarius)":"Aquarius";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zod = lang==="TH"?"ราศีมีน (Pisces)":"Pisces";
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "คำนวณราศีเกิด" : "Zodiac Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "วันเกิด" : "Date of Birth"}</label><input type="date" value={dob} onChange={e=>setDob(e.target.value)} className={inputClass} /></div>
      </div>
      {zod && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center">
          <p>{lang === "TH" ? "ราศีของคุณคือ" : "Your Zodiac Sign is"}</p>
          <div className="text-4xl font-black text-pink-600 mt-2">{zod}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ครอบครัว)" : "Family FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ" : "This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Pet Age
export function PetAgeCalculator({ lang }: { lang: Lang }) {
  const [pet, setPet] = useLocalState("pet_type", "dog");
  const [years, setYears] = useLocalState("pet_yrs", "");
  
  const y = parseFloat(years);
  let hum = 0;
  if(!isNaN(y) && y > 0) {
    if(pet === "dog") {
      hum = y <= 1 ? 15 : (y <= 2 ? 24 : 24 + ((y-2)*5)); // simplified
    } else {
      hum = y <= 1 ? 15 : (y <= 2 ? 24 : 24 + ((y-2)*4));
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "อายุสัตว์เลี้ยงเทียบคน" : "Pet to Human Age"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภท" : "Pet Type"}</label>
            <select value={pet} onChange={e=>setPet(e.target.value)} className={inputClass}>
              <option value="dog">{lang==="TH"?"สุนัข":"Dog"}</option><option value="cat">{lang==="TH"?"แมว":"Cat"}</option>
            </select>
          </div>
          <div><label className={labelClass}>{lang === "TH" ? "อายุ (ปี)" : "Age (Years)"}</label><input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} /></div>
        </div>
      </div>
      {hum > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center">
          <p>{lang === "TH" ? "อายุเทียบเท่ามนุษย์ประมาณ" : "Human Age Equivalent"}</p>
          <div className="text-4xl font-black text-pink-600 mt-2">{hum} {lang==="TH"?"ปี":"Years"}</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ครอบครัว)" : "Family FAQ"}>
          <FAQItem 
            q={lang === "TH" ? "ผลการคำนวณนี้มีความแม่นยำแค่ไหน? ควรนำไปใช้อ้างอิงหรือไม่?" : "How accurate is this result? Should it be used as a reference?"} 
            a={lang === "TH" ? "ผลลัพธ์นี้ใช้เพื่อการประเมินเบื้องต้นและเพื่อการศึกษาเท่านั้น ไม่สามารถใช้แทนคำแนะนำทางการแพทย์ได้ กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยที่แม่นยำ" : "This result is for estimation and educational purposes only. It does not replace professional medical advice. Please consult a doctor for an accurate diagnosis."} 
          />
        </SEOFAQ>
      </div>
    </div>
  );
}
