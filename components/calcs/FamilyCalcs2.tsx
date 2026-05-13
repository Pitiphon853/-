"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";
import { AdPlaceholder } from "../AdPlaceholder";

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
        <SEOFAQ title={lang==="TH"?"FAQ — ค่าคลอดบุตร":"Childbirth Cost FAQ"}>
          <FAQItem q={lang==="TH"?"ค่าคลอดบุตรในไทยเท่าไร?":"How much does childbirth cost in Thailand?"} a={lang==="TH"?"โรงพยาบาลรัฐ: คลอดธรรมชาติ 5,000-15,000 บาท, ผ่าคลอด 10,000-30,000 บาท / โรงพยาบาลเอกชน: คลอดธรรมชาติ 50,000-100,000 บาท, ผ่าคลอด 80,000-200,000 บาท สิทธิประกันสังคมเบิกค่าคลอดได้ 15,000 บาท | อ้างอิง: สำนักงานประกันสังคม — สิทธิกรณีคลอดบุตร; กรมบัญชีกลาง — สิทธิข้าราชการ.":"Public hospital: Natural 5-15K THB, C-section 10-30K. Private: Natural 50-100K, C-section 80-200K. Social Security covers 15K THB. | Source: Thai Social Security Office; Comptroller General's Dept."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — ค่าเลี้ยงดูบุตร":"Child Cost FAQ"}>
          <FAQItem q={lang==="TH"?"เลี้ยงลูก 1 คนในไทยใช้เงินเท่าไร?":"How much does it cost to raise a child in Thailand?"} a={lang==="TH"?"จาก TDRI ประมาณ 1.5-3 ล้านบาท/คน (0-18 ปี) แบ่ง: ค่าอาหาร/เสื้อผ้า 30%, ค่าเรียน 40%, ค่ารักษาพยาบาล 10%, อื่นๆ 20% โรงเรียนนานาชาติค่าเทอม 200,000-600,000 บาท/ปี | อ้างอิง: TDRI — ต้นทุนการเลี้ยงดูบุตร; สำนักงานสถิติแห่งชาติ — ค่าใช้จ่ายครัวเรือน.":"TDRI estimates 1.5-3M THB/child (0-18 yrs): Food/clothes 30%, Education 40%, Medical 10%, Other 20%. International schools cost 200-600K THB/yr tuition. | Source: TDRI; Thai National Statistics Office."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — เงินออมลูก":"Child Savings FAQ"}>
          <FAQItem q={lang==="TH"?"ออมเงินให้ลูกเดือนละเท่าไรถึงพอ?":"How much should I save monthly for my child?"} a={lang==="TH"?"สำหรับค่าเรียนมหาวิทยาลัย (ปัจจุบันเฉลี่ย 400,000-800,000 บาท/4ปี คิดเงินเฟ้อ 3%): เริ่มออมตั้งแต่เกิด เดือนละ 3,000-5,000 บาท ลงทุนในกองทุนรวมผลตอบแทน 5-7%/ปี น่าจะเพียงพอ ควรเปิดบัญชีเพื่อการศึกษา (Education Fund) | อ้างอิง: ก.ล.ต. — กองทุนรวมเพื่อการศึกษา; ตลาดหลักทรัพย์แห่งประเทศไทย — การออมเพื่อลูก.":"For university (avg 400-800K THB/4yrs, 3% inflation): Start at birth, save 3-5K THB/month in mutual funds at 5-7%/yr return. Open an education fund account. | Source: Thai SEC; Stock Exchange of Thailand."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — วันลาคลอด":"Maternity Leave FAQ"}>
          <FAQItem q={lang==="TH"?"สิทธิลาคลอดในไทยมีกี่วัน?":"How many maternity leave days in Thailand?"} a={lang==="TH"?"พ.ร.บ.คุ้มครองแรงงาน กำหนดให้ลาคลอดได้ 98 วัน (รวมวันฝากครรภ์) นายจ้างจ่าย 45 วัน ประกันสังคมจ่ายเพิ่ม 45 วัน (50% ของค่าจ้าง สูงสุด 15,000 บาท) ข้าราชการลาคลอดได้ 90 วัน | อ้างอิง: พ.ร.บ.คุ้มครองแรงงาน มาตรา 41; สำนักงานประกันสังคม — สิทธิกรณีคลอดบุตร.":"Thai Labour Protection Act: 98 days maternity leave (including prenatal). Employer pays 45 days, Social Security adds 45 days (50% of wage, max 15K). Gov't officers get 90 days. | Source: Labour Protection Act §41; Social Security Office."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — เบี้ยเลี้ยงดูบุตร":"Child Support FAQ"}>
          <FAQItem q={lang==="TH"?"ค่าเลี้ยงดูบุตรตามกฎหมายคำนวณอย่างไร?":"How is child support calculated by law?"} a={lang==="TH"?"ศาลพิจารณาจาก: 1) รายได้ของทั้งพ่อและแม่ 2) ค่าใช้จ่ายจริงของเด็ก 3) ระดับฐานะที่เด็กเคยมี 4) ค่าเล่าเรียน ค่ารักษาพยาบาล โดยทั่วไปศาลกำหนด 20-33% ของรายได้ผู้จ่าย จนเด็กอายุ 20 ปี | อ้างอิง: ประมวลกฎหมายแพ่งฯ มาตรา 1564; คำพิพากษาศาลฎีกา — แนวทางกำหนดค่าอุปการะเลี้ยงดู.":"Court considers: 1) Both parents' income 2) Child's actual expenses 3) Child's living standard 4) Education/medical costs. Typically 20-33% of payer's income until child turns 20. | Source: Thai Civil Code §1564; Supreme Court precedents."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. น้ำหนักทารกในครรภ์ (Fetal Weight WHO)
export function FetalWeightCalculator({ lang }: { lang: Lang }) {
  const [week, setWeek] = useLocalState("fetal_w", "20");
  const [result, setResult] = useState<{weight:number, length:number, dev:string} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(week);
    if (w >= 8 && w <= 40) {
      // Rough approximation based on WHO
      let weight = 0; let length = 0; let dev = "";
      if (w <= 12) { weight = w * 1.5; length = w * 0.5; dev = lang==="TH"?"อวัยวะสำคัญเริ่มสร้างตัว":"Major organs forming"; }
      else if (w <= 20) { weight = w * 15; length = w * 1.2; dev = lang==="TH"?"เริ่มดิ้น ลูกได้ยินเสียง":"Starts moving, can hear"; }
      else if (w <= 28) { weight = w * 35; length = w * 1.3; dev = lang==="TH"?"ลืมตาได้ ปอดพัฒนา":"Can open eyes, lungs developing"; }
      else if (w <= 36) { weight = w * 70; length = w * 1.35; dev = lang==="TH"?"สมองพัฒนาอย่างรวดเร็ว":"Rapid brain development"; }
      else { weight = w * 85; length = w * 1.35; dev = lang==="TH"?"พร้อมคลอด ลำตัวอวบอิ่ม":"Ready for birth"; }
      
      setResult({ weight: Math.round(weight), length: parseFloat(length.toFixed(1)), dev });
    } else {
      alert(lang==="TH"?"กรุณาใส่อายุครรภ์ระหว่าง 8 - 40 สัปดาห์":"Please enter weeks between 8 - 40");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "พัฒนาการทารกในครรภ์" : "Fetal Development"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "อายุครรภ์ (สัปดาห์ 8-40)" : "Gestational Age (Weeks 8-40)"}</label>
          <input type="number" min="8" max="40" value={week} onChange={e=>setWeek(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"ดูพัฒนาการ":"Check Development"}</button>
      </form>
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 rounded-xl text-center border border-pink-200">
           <div className="grid grid-cols-2 gap-4 mb-4">
             <div>
               <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"น้ำหนักประมาณ":"Estimated Weight"}</div>
               <div className="text-3xl font-black text-pink-600">{result.weight}g</div>
             </div>
             <div>
               <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"ความยาวประมาณ":"Estimated Length"}</div>
               <div className="text-3xl font-black text-pink-600">{result.length}cm</div>
             </div>
           </div>
           <div className="p-4 bg-white rounded-lg border border-pink-100 text-pink-700 font-bold">{result.dev}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — พัฒนาการทารก":"Fetal Development FAQ"}>
        <FAQItem q={lang==="TH"?"ทารกเริ่มดิ้นเมื่อไหร่?":"When does baby start moving?"} a={lang==="TH"?"ทารกเริ่มดิ้นดั้งเดิมประมาณสัปดาห์ที่ 16-20 (ครั้งแรกอาจรู้สึกเหมือนผีเสื้อบิน) สัปดาห์ที่ 28+ ควรนับการดิ้นได้อย่างน้อย 10 ครั้งใน 2 ชั่วโมง หากน้อยกว่านี้เป็นเวลานานติดต่ออพ. | อ้างอิง: WHO (2016). WHO recommendations on antenatal care.":"Fetal movement typically starts weeks 16-20 (first-timers may feel it like flutters). After week 28, count at least 10 movements in 2 hours. Less than that, contact your doctor. Source: WHO (2016) Antenatal Care Guidelines."} />
        <FAQItem q={lang==="TH"?"น้ำหนักทารกที่น้อยเกินไปหรือมากเกินไปอันตรายไหม?":"Is fetal weight too high/low dangerous?"} a={lang==="TH"?"ทารกน้ำหนักน้อยเกินไป (< เปอร์เซ็นไทล์ที่ 10) = SGA อาจสัมพันธ์กับรกสุติประกำหรือรกแตกเรียว ส่วนน้ำหนักมากเกินไป (> เปอร์เซ็นไทล์ที่ 90) = LGA อาจต้องผ่าตัดคลอด ควรตรวจอัลตราซาวน์ด์สม่ำเสมอ | อ้างอิง: ACOG (2021). Fetal Growth Restriction. Practice Bulletin.":"Too small (<10th percentile) = SGA, may indicate growth restriction or preterm risk. Too large (>90th percentile) = LGA, may need C-section. Regular ultrasound monitoring is essential. Source: ACOG (2021) Practice Bulletin."} />
      </SEOFAQ>
    </div>
  );
}

// 7. ค่าใช้จ่ายเลี้ยงลูกต่อปี (Child Raising Cost)
export function ChildCostCalculator({ lang }: { lang: Lang }) {
  const [age, setAge] = useLocalState("cost_age", "0");
  const [level, setLevel] = useLocalState("cost_level", "medium");
  const [result, setResult] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    if (a >= 0 && a <= 18) {
      let base = 0;
      if (a <= 3) base = 120000;
      else if (a <= 12) base = 150000;
      else base = 200000;

      let multiplier = 1;
      if (level === "low") multiplier = 0.6;
      else if (level === "high") multiplier = 2.5;

      const total = base * multiplier;
      setResult({
        total: total.toLocaleString(),
        edu: (total * 0.4).toLocaleString(),
        food: (total * 0.3).toLocaleString(),
        health: (total * 0.2).toLocaleString(),
        other: (total * 0.1).toLocaleString()
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "ประมาณค่าใช้จ่ายเลี้ยงลูก/ปี" : "Yearly Child Raising Cost"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุลูก (ปี)" : "Child's Age"}</label>
            <input type="number" min="0" max="18" value={age} onChange={e=>setAge(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระดับค่าใช้จ่าย" : "Expense Level"}</label>
            <select value={level} onChange={e=>setLevel(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
              <option value="low">{lang==="TH"?"ประหยัด (รพ.รัฐ/รร.รัฐ)":"Economical"}</option>
              <option value="medium">{lang==="TH"?"ปานกลาง (เอกชนทั่วไป)":"Moderate"}</option>
              <option value="high">{lang==="TH"?"สูง (อินเตอร์/พรีเมียม)":"High/Premium"}</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"ประเมินค่าใช้จ่าย":"Estimate Costs"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 space-y-4">
           <div className="p-6 bg-pink-50 rounded-xl text-center border border-pink-200">
             <div className="text-sm text-gray-500 mb-1">{lang==="TH"?"ประมาณการค่าใช้จ่ายรวม/ปี":"Total Estimated Cost/Year"}</div>
             <div className="text-4xl font-black text-pink-600">฿{result.total}</div>
           </div>
           <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
             <div className="p-3 bg-white border rounded">📚 {lang==="TH"?"การศึกษา: ":"Edu: "}฿{result.edu}</div>
             <div className="p-3 bg-white border rounded">🍼 {lang==="TH"?"อาหาร: ":"Food: "}฿{result.food}</div>
             <div className="p-3 bg-white border rounded">🏥 {lang==="TH"?"สุขภาพ: ":"Health: "}฿{result.health}</div>
             <div className="p-3 bg-white border rounded">🧸 {lang==="TH"?"อื่นๆ: ":"Others: "}฿{result.other}</div>
           </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — ค่าใช้จ่ายเลี้ยงลูก":"Child Cost FAQ"}>
        <FAQItem q={lang==="TH"?"ค่าใช้จ่ายเลี้ยงลูกในไทยตลอดชีวิตสูงแค่ไหน?":"How much does raising a child cost in Thailand?"} a={lang==="TH"?"จากการศึกษาของมูลนิธิแนวหน้าคอนซูเมอร์ (2023) ค่าใช้จ่ายตั้งแต่เกิดจนอายุ 18 ปี อยู่ระหว่าง 2-10 ล้านบาท ค่าใช้จ่ายสูงสุดคือการศึกษา (40%) รองลงมาคืออาหาร (30%) | อ้างอิง: มูลนิธิแนวหน้าคอนซูเมอร์ไทย (2023).":"Per Thai Consumer Foundation (2023), raising a child birth to 18 costs 2-10 million baht depending on education level. Education accounts for 40%, food 30% of costs. Source: Thai Consumer Foundation (2023)."} />
      </SEOFAQ>
    </div>
  );
}

// 8. ดัชนีพัฒนาการเด็ก (Child Milestones)
export function ChildMilestoneCalculator({ lang }: { lang: Lang }) {
  const [month, setMonth] = useLocalState("mile_m", "6");
  const [result, setResult] = useState<string[] | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const m = parseInt(month);
    let ms: string[] = [];
    if (m <= 2) ms = lang==="TH"?["ยิ้มตอบรับ", "มองตามสิ่งของ", "ชันคอได้สั้นๆ"]:["Smiles back", "Tracks objects", "Holds head up briefly"];
    else if (m <= 6) ms = lang==="TH"?["พลิกคว่ำพลิกหงาย", "คว้าของเข้าปาก", "หัวเราะเสียงดัง", "จำหน้าแม่ได้"]:["Rolls over", "Reaches for toys", "Laughs", "Recognizes faces"];
    else if (m <= 9) ms = lang==="TH"?["นั่งได้เอง", "คลาน", "หยิบของชิ้นเล็ก", "กลัวคนแปลกหน้า"]:["Sits without support", "Crawls", "Pincer grasp", "Stranger anxiety"];
    else if (m <= 12) ms = lang==="TH"?["เกาะยืน/เดิน", "พูดคำพยางค์เดียว (ปา, มา)", "โบกมือบ๊ายบาย"]:["Pulls to stand/walks", "Says basic words", "Waves bye-bye"];
    else if (m <= 18) ms = lang==="TH"?["เดินได้คล่อง", "พูดเป็นคำๆ", "ชี้ส่วนต่างๆ ของร่างกาย"]:["Walks well", "Says several words", "Points to body parts"];
    else if (m <= 24) ms = lang==="TH"?["วิ่งได้", "พูดติดกัน 2 คำ", "เตะลูกบอล"]:["Runs", "2-word phrases", "Kicks a ball"];
    else ms = lang==="TH"?["ถามคำถาม", "แต่งตัวได้บ้าง", "เล่นกับเพื่อน"]:["Asks questions", "Dresses slightly", "Plays with peers"];
    
    setResult(ms);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600">{lang === "TH" ? "ตรวจสอบพัฒนาการเด็ก" : "Child Milestones"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "อายุ (เดือน)" : "Age (Months)"}</label>
          <input type="number" min="1" max="60" value={month} onChange={e=>setMonth(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600">{lang==="TH"?"ดูพัฒนาการที่ควรมี":"Check Milestones"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
           <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">{lang==="TH"?"ลูกของคุณควรทำสิ่งเหล่านี้ได้:":"Your child should be able to:"}</h3>
           <ul className="space-y-3">
             {result.map((m, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-900/10 rounded-lg text-pink-700 dark:text-pink-300 font-medium">
                  <span className="text-2xl">⭐</span> {m}
                </li>
             ))}
           </ul>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang==="TH"?"FAQ — พัฒนาการเด็ก":"Child Milestones FAQ"}>
        <FAQItem q={lang==="TH"?"ถ้าลูกพัฒนาการช้าควรทำอย่างไร?":"What if my child is behind on milestones?"} a={lang==="TH"?"พัฒนาการเด็กแต่ละคนไม่เท่ากัน ช้า 1-2 เดือนอาจเป็นเรื่องปกติ หากช้ากว่า 2 เดือนในหลายด้าน ควรปรึกษาแพทย์เด็ก เครื่องมือนี้ใช้เป็นเพียงแนวทางเบื้องต้นเท่านั้น | อ้างอิง: CDC (2023). Developmental Milestones.":"Every child develops at their own pace. Being 1-2 months behind is often normal. If more than 2 months behind in multiple areas, consult a pediatrician. This is a reference guide only. Source: CDC (2023) Developmental Milestones."} />
      </SEOFAQ>
    </div>
  );
}
