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
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณกำหนดคลอดบุตร":"Pregnancy Due Date FAQ"}>
          <FAQItem isStep q={lang==="TH"?"ข้อสงวนสิทธิ์ทางการแพทย์ (Medical Disclaimer)":"Medical Disclaimer"} a={lang==="TH"?"ข้อมูลและการคำนวณในเว็บไซต์นี้เป็นเพียงการประมาณการเบื้องต้นเท่านั้น ไม่สามารถใช้แทนคำแนะนำ การวินิจฉัย หรือการรักษาทางการแพทย์จากแพทย์ผู้เชี่ยวชาญได้ โปรดฝากครรภ์และปรึกษาสูตินรีแพทย์เพื่อผลที่แม่นยำที่สุด":"The information and calculations provided are for educational and estimation purposes only. They cannot replace professional medical advice, diagnosis, or treatment. Please consult your obstetrician for accurate information."} />
          <FAQItem q={lang==="TH"?"กำหนดคลอดคำนวณจากอะไร?":"How is the due date calculated?"} a={lang==="TH"?"กำหนดคลอดโดยทั่วไปจะคำนวณจาก 'วันแรกของประจำเดือนครั้งสุดท้าย' (LMP - Last Menstrual Period) โดยบวกไปอีก 280 วัน (หรือ 40 สัปดาห์) ซึ่งเป็นมาตรฐานที่สูตินรีแพทย์ทั่วโลกใช้เบื้องต้น เรียกว่า Naegele's rule":"The due date is typically calculated from the 'First day of your Last Menstrual Period' (LMP) by adding 280 days (or 40 weeks). This is the standard method used by obstetricians worldwide, known as Naegele's rule."} />
          <FAQItem q={lang==="TH"?"สูตร Naegele's rule คืออะไร?":"What is Naegele's rule?"} a={lang==="TH"?"สูตร Naegele's rule คือ: วันแรกของประจำเดือนครั้งสุดท้าย + 7 วัน - 3 เดือน + 1 ปี ตัวอย่างเช่น หากประจำเดือนวันแรกคือ 1 มกราคม 2024 กำหนดคลอดจะเป็น 8 ตุลาคม 2024":"Naegele's rule formula is: First day of LMP + 7 days - 3 months + 1 year. For example, if your LMP was January 1, 2024, your estimated due date would be October 8, 2024."} />
          <FAQItem q={lang==="TH"?"ความแม่นยำของการคำนวณกำหนดคลอดมีแค่ไหน?":"How accurate is the due date calculation?"} a={lang==="TH"?"การคำนวณเป็นเพียง 'การประมาณการ' เท่านั้น ในความเป็นจริง มีทารกเพียงประมาณ 4-5% เท่านั้นที่คลอดตรงตามกำหนดเป๊ะๆ ส่วนใหญ่จะคลอดในช่วงสัปดาห์ที่ 37-42 ซึ่งถือเป็นระยะครบกำหนดคลอดที่ปลอดภัย":"The calculation is only an 'estimate'. In reality, only about 4-5% of babies are born exactly on their due date. Most babies arrive between weeks 37 and 42, which is considered a safe full-term pregnancy."} />
          <FAQItem q={lang==="TH"?"ถ้าจำวันแรกของประจำเดือนครั้งสุดท้ายไม่ได้ ทำอย่างไร?":"What if I don't remember my LMP?"} a={lang==="TH"?"หากจำประจำเดือนไม่ได้ แพทย์จะใช้วิธีการอัลตราซาวนด์ (Ultrasound) ในช่วงไตรมาสแรก (อายุครรภ์ 8-12 สัปดาห์) เพื่อวัดขนาดของทารก (Crown-Rump Length) ซึ่งเป็นวิธีที่แม่นยำที่สุดในการกำหนดอายุครรภ์และวันคลอด":"If you don't remember your LMP, your doctor will perform a first-trimester ultrasound (between 8-12 weeks) to measure the baby's length (Crown-Rump Length). This is the most accurate method to determine gestational age."} />
          <FAQItem q={lang==="TH"?"ประจำเดือนมาไม่ปกติ จะคำนวณได้ไหม?":"Can I calculate if my periods are irregular?"} a={lang==="TH"?"สูตรมาตรฐาน 280 วัน ใช้ได้ดีกับคนที่มีรอบเดือน 28 วันสม่ำเสมอ หากรอบเดือนยาวหรือสั้นกว่านี้ หรือมาไม่ปกติ การคำนวณด้วยสูตรนี้จะคลาดเคลื่อนได้มาก ควรใช้การอัลตราซาวนด์เพื่อความแม่นยำ":"The standard 280-day formula works best for those with regular 28-day cycles. If your cycles are longer, shorter, or irregular, the calculation will be less accurate. Ultrasound dating is recommended in this case."} />
          <FAQItem q={lang==="TH"?"ทำไมอายุครรภ์ถึงนับตั้งแต่ก่อนปฏิสนธิ?":"Why is gestational age counted before conception?"} a={lang==="TH"?"เพราะวันที่มีการปฏิสนธิจริงๆ นั้นระบุได้ยากมาก แพทย์จึงตกลงใช้วันแรกของประจำเดือนครั้งสุดท้าย (ซึ่งจำง่ายกว่า) เป็นจุดเริ่มต้นในการนับอายุครรภ์ ดังนั้น 2 สัปดาห์แรกของการตั้งครรภ์ คุณอาจยังไม่ได้ท้องจริง":"Because the exact date of conception is hard to pinpoint, medical professionals universally use the first day of the LMP (which is easier to remember) as the starting point. Thus, during the first 2 weeks of 'pregnancy', you aren't actually pregnant yet."} />
          <FAQItem q={lang==="TH"?"ถ้าเด็กคลอดก่อนสัปดาห์ที่ 37 เรียกว่าอะไร?":"What if a baby is born before week 37?"} a={lang==="TH"?"ทารกที่คลอดก่อนอายุครรภ์ 37 สัปดาห์ จะเรียกว่า 'ทารกคลอดก่อนกำหนด' (Preterm birth) ซึ่งอาจต้องได้รับการดูแลพิเศษในตู้อบและเฝ้าระวังพัฒนาการอย่างใกล้ชิดจากกุมารแพทย์":"A baby born before 37 weeks of gestation is considered 'premature' or a 'preterm birth'. They may require special care in an incubator and close monitoring by a pediatrician."} />
          <FAQItem q={lang==="TH"?"การฝากครรภ์ (Antenatal care) สำคัญอย่างไร?":"Why is antenatal care important?"} a={lang==="TH"?"การฝากครรภ์ช่วยให้แพทย์ติดตามพัฒนาการของทารก ตรวจคัดกรองความผิดปกติ คัดกรองดาวน์ซินโดรม ตรวจเบาหวานขณะตั้งครรภ์ และฉีดวัคซีนที่จำเป็น ซึ่งส่งผลโดยตรงต่อความปลอดภัยของแม่และเด็ก":"Antenatal care allows doctors to track fetal development, screen for abnormalities (like Down syndrome), check for gestational diabetes, and administer necessary vaccines, ensuring the safety of both mother and child."} />
          <FAQItem q={lang==="TH"?"คุณแม่ตั้งครรภ์ควรเตรียมตัวอย่างไรเมื่อใกล้กำหนดคลอด?":"How to prepare when approaching the due date?"} a={lang==="TH"?"ควรเตรียมกระเป๋าคลอด (เอกสารสำคัญ, เสื้อผ้าเด็ก, ผ้าอ้อม, ของใช้ส่วนตัว) ตั้งแต่สัปดาห์ที่ 36 ศึกษาเส้นทางไปโรงพยาบาล และคอยสังเกตอาการเจ็บครรภ์เตือน หรืออาการน้ำเดิน หากมีอาการผิดปกติควรรีบพบแพทย์ทันที":"Pack a hospital bag (important documents, baby clothes, diapers, personal items) by week 36. Know the route to the hospital, and watch for signs of labor or water breaking. If any abnormal symptoms occur, see a doctor immediately."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณวันตกไข่":"Ovulation Calculation FAQ"}>
          <FAQItem isStep q={lang==="TH"?"ข้อสงวนสิทธิ์ทางการแพทย์ (Medical Disclaimer)":"Medical Disclaimer"} a={lang==="TH"?"ข้อมูลที่ได้จากการคำนวณวันตกไข่นี้เป็นการประมาณการตามหลักคณิตศาสตร์จากรอบเดือนปกติ ไม่สามารถใช้เป็นวิธีคุมกำเนิดที่เชื่อถือได้ 100% หรือใช้แทนการวินิจฉัยภาวะมีบุตรยากจากแพทย์ โปรดปรึกษาแพทย์เฉพาะทางเพื่อการวางแผนครอบครัวที่ถูกต้อง":"This ovulation calculation is a mathematical estimate based on regular menstrual cycles. It should NOT be used as a reliable method of contraception or to diagnose infertility. Please consult a specialist for proper family planning."} />
          <FAQItem q={lang==="TH"?"วันตกไข่ (Ovulation) คืออะไร?":"What is Ovulation?"} a={lang==="TH"?"วันตกไข่คือกระบวนการที่รังไข่ปล่อยไข่ที่สุกเต็มที่ออกมาสู่ท่อนำไข่ เพื่อรอการปฏิสนธิกับอสุจิ ถือเป็นช่วงเวลาที่ผู้หญิงมีโอกาสตั้งครรภ์ได้สูงที่สุดในรอบเดือน ไข่ที่ตกลงมาจะมีชีวิตอยู่ได้ประมาณ 12-24 ชั่วโมงเท่านั้น":"Ovulation is the process where a mature egg is released from the ovary into the fallopian tube, waiting to be fertilized by sperm. It is the most fertile time in a woman's cycle. The released egg lives for only about 12-24 hours."} />
          <FAQItem q={lang==="TH"?"การตกไข่เกิดขึ้นเมื่อไหร่?":"When does ovulation occur?"} a={lang==="TH"?"ในผู้หญิงที่มีรอบเดือนปกติ 28 วัน การตกไข่มักจะเกิดขึ้นประมาณวันที่ 14 ของรอบเดือน (นับจากวันแรกที่มีประจำเดือน) สูตรทั่วไปคือ วันตกไข่ = ความยาวรอบเดือนลบด้วย 14 วัน (เช่น รอบเดือน 30 วัน ไข่จะตกวันที่ 16)":"In a standard 28-day cycle, ovulation usually occurs around day 14 (counting from the first day of the period). The general formula is: Ovulation Day = Cycle Length minus 14 days (e.g., in a 30-day cycle, ovulation is on day 16)."} />
          <FAQItem q={lang==="TH"?"ช่วงไข่สุก (Fertile Window) คืออะไร?":"What is the Fertile Window?"} a={lang==="TH"?"ช่วงไข่สุกคือช่วงเวลา 6 วันที่มีโอกาสตั้งครรภ์สูงสุด ประกอบด้วยวันตกไข่ 1 วัน และ 5 วันก่อนหน้าวันตกไข่ สาเหตุที่รวม 5 วันก่อนหน้าด้วย เพราะอสุจิสามารถมีชีวิตรอดอยู่ในมดลูกได้นานถึง 3-5 วันเพื่อรอไข่ตก":"The fertile window is a 6-day period with the highest chance of conception. It includes the day of ovulation and the 5 days before it. This is because sperm can survive in the reproductive tract for up to 3-5 days waiting for an egg."} />
          <FAQItem q={lang==="TH"?"สัญญาณหรืออาการของการตกไข่มีอะไรบ้าง?":"What are the signs of ovulation?"} a={lang==="TH"?"อาการที่พบบ่อยได้แก่: มีมูกช่องคลอดลักษณะใสและยืดหยุ่นคล้ายไข่ขาวดิบ, อุณหภูมิร่างกายขณะพัก (BBT) สูงขึ้นเล็กน้อย, ปวดหน่วงๆ บริเวณท้องน้อยข้างใดข้างหนึ่ง (Mittelschmerz), คัดตึงเต้านม และความต้องการทางเพศเพิ่มขึ้น":"Common signs include: clear, stretchy cervical mucus (like raw egg white), a slight increase in Basal Body Temperature (BBT), mild pelvic pain on one side (Mittelschmerz), breast tenderness, and increased libido."} />
          <FAQItem q={lang==="TH"?"สามารถใช้แอปพลิเคชันคำนวณวันตกไข่เพื่อคุมกำเนิดได้ไหม?":"Can I use ovulation apps for contraception?"} a={lang==="TH"?"ไม่แนะนำอย่างยิ่ง! การคุมกำเนิดโดยใช้วิธีนับวัน (Rhythm Method) ผ่านแอปพลิเคชันมีความเสี่ยงในการตั้งครรภ์สูงมาก เนื่องจากความเครียด การพักผ่อน หรือความเจ็บป่วย สามารถทำให้ไข่ตกช้าหรือเร็วกว่ากำหนดได้ตลอดเวลา":"Highly discouraged! Using the rhythm method via apps for contraception carries a high risk of pregnancy. Stress, lack of sleep, or illness can easily cause ovulation to happen earlier or later than predicted."} />
          <FAQItem q={lang==="TH"?"ชุดตรวจการตกไข่ (OPK) ทำงานอย่างไร?":"How do Ovulation Predictor Kits (OPK) work?"} a={lang==="TH"?"ชุดตรวจการตกไข่จะตรวจวัดระดับฮอร์โมน LH (Luteinizing Hormone) ในปัสสาวะ ซึ่งฮอร์โมนนี้จะพุ่งสูงขึ้น (LH Surge) ประมาณ 24-36 ชั่วโมงก่อนที่ไข่จะตก การมีเพศสัมพันธ์ในช่วงที่ตรวจพบ LH Surge จะเพิ่มโอกาสตั้งครรภ์ได้มาก":"OPKs measure the levels of Luteinizing Hormone (LH) in your urine. An LH surge occurs about 24-36 hours before ovulation. Having intercourse during this surge greatly increases the chances of conception."} />
          <FAQItem q={lang==="TH"?"ประจำเดือนมาไม่ปกติ จะหาวันตกไข่อย่างไร?":"How to find ovulation with irregular periods?"} a={lang==="TH"?"สำหรับผู้ที่มีประจำเดือนไม่ปกติ การคำนวณตามสูตรจะคลาดเคลื่อน แนะนำให้ใช้วิธีอื่นร่วมด้วย เช่น การใช้ชุดตรวจไข่ตก (OPK), การวัดอุณหภูมิร่างกาย (BBT), การสังเกตมูกช่องคลอด หรือปรึกษาแพทย์เพื่ออัลตราซาวนด์ติดตามฟองไข่":"For irregular periods, formulas are inaccurate. It's recommended to use other methods like Ovulation Predictor Kits (OPK), charting Basal Body Temperature (BBT), observing cervical mucus, or consulting a doctor for follicular ultrasound tracking."} />
          <FAQItem q={lang==="TH"?"ปัจจัยใดบ้างที่ทำให้การตกไข่ผิดปกติ?":"What factors cause irregular ovulation?"} a={lang==="TH"?"ปัจจัยหลัก ได้แก่ ภาวะถุงน้ำรังไข่หลายใบ (PCOS), ความเครียดสะสม, น้ำหนักตัวที่มากหรือน้อยเกินไป, การออกกำลังกายหักโหม, ความผิดปกติของต่อมไทรอยด์ และอายุที่เพิ่มมากขึ้น (เข้าสู่วัยทอง)":"Main factors include Polycystic Ovary Syndrome (PCOS), chronic stress, being significantly over/underweight, extreme exercise, thyroid disorders, and advancing age (approaching menopause)."} />
          <FAQItem q={lang==="TH"?"มีเพศสัมพันธ์วันไหนถึงจะมีโอกาสได้ลูกชาย/ลูกสาว?":"Does timing intercourse affect baby gender?"} a={lang==="TH"?"ทฤษฎีของ Shettles เชื่อว่า อสุจิเพศชาย (Y) ว่ายเร็วกว่าแต่อายุสั้น ควรมียามไข่ตกพอดี ส่วนอสุจิเพศหญิง (X) ว่ายช้าแต่อายุยืน ควรมียามก่อนไข่ตก 2-3 วัน อย่างไรก็ตาม ในทางการแพทย์ปัจจุบันพบว่าทฤษฎีนี้ไม่มีหลักฐานยืนยันชัดเจน 100% โอกาสยังคงเป็น 50/50":"The Shettles method suggests Y-sperm (boy) are faster but short-lived (have sex ON ovulation day), while X-sperm (girl) are slower but resilient (have sex 2-3 days BEFORE). However, modern science finds no conclusive evidence; the odds remain roughly 50/50."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — การถ่ายทอดกรุ๊ปเลือด":"Blood Type Inheritance FAQ"}>
          <FAQItem isStep q={lang==="TH"?"ข้อสงวนสิทธิ์ทางการแพทย์ (Medical Disclaimer)":"Medical Disclaimer"} a={lang==="TH"?"ตารางทำนายกรุ๊ปเลือดนี้ใช้กฎพันธุศาสตร์ของเมนเดลเบื้องต้น (ABO System) ในบางกรณีที่พบได้ยากมาก (เช่น Bombay Phenotype หรือการกลายพันธุ์) กรุ๊ปเลือดลูกอาจไม่ตรงตามตารางนี้ หากต้องการความชัดเจนทางการแพทย์ หรือการพิสูจน์ความเป็นบิดามารดา โปรดใช้การตรวจ DNA เท่านั้น":"This predictor uses basic Mendelian genetics (ABO System). In very rare cases (like Bombay Phenotype or mutations), a child's blood type might not match this table. For medical certainty or paternity testing, please rely ONLY on clinical DNA tests."} />
          <FAQItem q={lang==="TH"?"กรุ๊ปเลือดถ่ายทอดทางพันธุกรรมได้อย่างไร?":"How are blood types inherited?"} a={lang==="TH"?"กรุ๊ปเลือดถูกกำหนดโดยยีนที่ได้รับจากพ่อ 1 แอลลีล และจากแม่ 1 แอลลีล ยีนที่ควบคุมกรุ๊ปเลือดมี 3 แบบคือ A, B (เป็นยีนเด่น) และ O (เป็นยีนด้อย) การจับคู่ของยีนเหล่านี้จะกำหนดกรุ๊ปเลือดของลูก เช่น พ่อ AO (เลือดกรุ๊ป A) แม่ BO (เลือดกรุ๊ป B) ลูกอาจได้ OO (กรุ๊ป O) ได้":"Blood types are determined by alleles inherited from both parents. There are 3 main alleles: A, B (dominant), and O (recessive). Their combination determines the blood type. E.g., if dad is AO (Type A) and mom is BO (Type B), they can have a child with OO (Type O)."} />
          <FAQItem q={lang==="TH"?"พ่อแม่เลือดกรุ๊ป A ทั้งคู่ ลูกจะเป็นกรุ๊ป O ได้ไหม?":"Parents are both Type A. Can child be Type O?"} a={lang==="TH"?"ได้ครับ! หากพ่อและแม่มียีนแฝงเป็นแบบ AO ทั้งคู่ ลูกมีโอกาสได้รับยีน O จากพ่อและยีน O จากแม่ กลายเป็น OO ซึ่งก็คือเลือดกรุ๊ป O โดยมีโอกาสเกิดขึ้น 25%":"Yes! If both parents carry a recessive O gene (AO phenotype), there is a 25% chance the child inherits the O gene from both, resulting in an OO genotype, which is Blood Type O."} />
          <FAQItem q={lang==="TH"?"พ่อแม่เลือดกรุ๊ป O ทั้งคู่ ลูกจะเป็นกรุ๊ปอื่นได้ไหม?":"Parents are both Type O. Can child be A or B?"} a={lang==="TH"?"ตามหลักพันธุศาสตร์ปกติ พ่อแม่กรุ๊ป O (OO) ทั้งคู่ จะสามารถให้กำเนิดลูกได้เฉพาะกรุ๊ป O เท่านั้น เนื่องจากไม่มียีนเด่น A หรือ B ให้ถ่ายทอดไปสู่ลูก หากตรวจพบกรุ๊ปอื่น ควรปรึกษาแพทย์เพื่อตรวจซ้ำหรือตรวจ DNA อย่างละเอียด":"According to standard genetics, two Type O parents (OO) can ONLY have a Type O child because they lack A or B dominant genes to pass on. If another type appears, consult a doctor for a retest or comprehensive DNA testing."} />
          <FAQItem q={lang==="TH"?"กรุ๊ปเลือด Rh Positive / Negative คืออะไร?":"What is Rh Positive / Negative?"} a={lang==="TH"?"Rh (Rhesus factor) คือโปรตีนบนผิวเม็ดเลือดแดง หากมีจะเรียกว่า Rh+ (คนส่วนใหญ่) หากไม่มีจะเรียกว่า Rh- (พบได้น้อย) การสืบทอด Rh ก็เป็นไปตามหลักพันธุศาสตร์ พ่อแม่ Rh+ ทั้งคู่อาจมีลูก Rh- ได้ หากมียีนด้อยแฝงทั้งคู่":"Rh (Rhesus) factor is a protein on red blood cells. Having it means Rh+ (most common); lacking it means Rh- (rare). It's also inherited. Two Rh+ parents can have an Rh- child if both carry the recessive Rh- gene."} />
          <FAQItem q={lang==="TH"?"ภาวะหมู่เลือด Rh เข้ากันไม่ได้ (Rh Incompatibility) อันตรายไหม?":"Is Rh incompatibility dangerous in pregnancy?"} a={lang==="TH"?"จะอันตรายหาก 'แม่เป็น Rh-' และ 'ลูกในครรภ์เป็น Rh+' ภูมิคุ้มกันของแม่อาจสร้างแอนติบอดีไปทำลายเม็ดเลือดแดงของลูกในครรภ์ (โดยเฉพาะในท้องที่ 2) แพทย์จะป้องกันโดยการฉีดยา RhIg ให้คุณแม่ในระหว่างตั้งครรภ์และหลังคลอด":"It's dangerous if the 'Mother is Rh-' and the 'Baby is Rh+'. The mother's immune system might produce antibodies that attack the baby's red blood cells (especially in subsequent pregnancies). Doctors prevent this by giving the mother RhIg injections."} />
          <FAQItem q={lang==="TH"?"กรุ๊ปเลือดสากลที่ให้และรับได้ทุกคนคืออะไร?":"What are the universal donor and recipient types?"} a={lang==="TH"?"กรุ๊ป O Negative (O-) ถือเป็น 'ผู้ให้สากล' (Universal Donor) สามารถให้เลือดแก่ทุกคนได้ ส่วนกรุ๊ป AB Positive (AB+) ถือเป็น 'ผู้รับสากล' (Universal Recipient) สามารถรับเลือดได้จากทุกกรุ๊ป":"Type O Negative (O-) is the 'Universal Donor', able to give blood to anyone. Type AB Positive (AB+) is the 'Universal Recipient', able to receive blood from any type."} />
          <FAQItem q={lang==="TH"?"กรุ๊ปเลือดสามารถเปลี่ยนได้ไหมในระหว่างช่วงชีวิต?":"Can blood type change during one's lifetime?"} a={lang==="TH"?"โดยปกติกรุ๊ปเลือดจะไม่เปลี่ยนแปลงไปตลอดชีวิต แต่ในกรณีหายาก เช่น การปลูกถ่ายไขกระดูกจากผู้บริจาคที่มีกรุ๊ปเลือดต่างกัน กรุ๊ปเลือดของผู้รับจะค่อยๆ เปลี่ยนไปเป็นกรุ๊ปเลือดของผู้บริจาค":"Usually, blood type remains constant throughout life. However, in rare circumstances like a bone marrow transplant from a donor with a different blood type, the recipient's blood type will eventually change to match the donor's."} />
          <FAQItem q={lang==="TH"?"กรุ๊ปเลือดทายใจ นิสัยตามกรุ๊ปเลือด เชื่อถือได้ไหม?":"Is blood type personality theory reliable?"} a={lang==="TH"?"การทายนิสัยตามกรุ๊ปเลือด (Blood type personality theory) เป็นเพียงความเชื่อทางวัฒนธรรมป๊อปที่ได้รับความนิยมในเอเชียตะวันออก (เช่น ญี่ปุ่น เกาหลี) ในทางวิทยาศาสตร์และจิตวิทยาปัจจุบัน ไม่มีหลักฐานสนับสนุนว่ากรุ๊ปเลือดสัมพันธ์กับบุคลิกภาพ":"Blood type personality theory is a pop-culture belief, highly popular in East Asia (e.g., Japan, Korea). In modern science and psychology, there is zero empirical evidence linking blood type to personality traits."} />
          <FAQItem q={lang==="TH"?"ถ้าผลเลือดลูกออกมาขัดแย้งกับพ่อแม่ แปลว่าไม่ใช่ลูกแท้ๆ ใช่ไหม?":"Does conflicting blood type mean not biological?"} a={lang==="TH"?"ไม่เสมอไปครับ แม้จะพบได้ยากมาก แต่มีปรากฏการณ์ที่เรียกว่า 'Bombay Phenotype' หรือการกลายพันธุ์ของยีน (Mutation) ที่ทำให้กรุ๊ปเลือดขัดแย้งกับทฤษฎี ABO ปกติ การสรุปความเป็นพ่อแม่ลูกในทางกฎหมายจึงต้องใช้ 'การตรวจ DNA' เท่านั้น":"Not necessarily. Though extremely rare, phenomena like the 'Bombay Phenotype' or genetic mutations can cause blood types to contradict standard ABO rules. For legal paternity/maternity, ONLY a 'DNA Test' is conclusive."} />
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
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณราศีเกิด":"Zodiac Sign FAQ"}>
          <FAQItem q={lang==="TH"?"ราศีเกิดคืออะไร?":"What is a Zodiac Sign?"} a={lang==="TH"?"ราศีเกิด (Zodiac Sign) คือกลุ่มดาวบนท้องฟ้าที่ดวงอาทิตย์ปรากฏพาดผ่านในช่วงเวลาที่คุณเกิด การแบ่งราศีมีหลายระบบ แต่ที่นิยมที่สุดคือระบบโหราศาสตร์ตะวันตก (Western Astrology) และโหราศาสตร์ไทย (Vedic/Thai Astrology)":"A Zodiac Sign refers to the constellation the sun appears to pass through at the time of your birth. The most popular systems are Western Astrology and Vedic/Thai Astrology."} />
          <FAQItem q={lang==="TH"?"ทำไมราศีแบบไทยกับแบบสากลถึงไม่เหมือนกัน?":"Why are Thai and Western zodiacs different?"} a={lang==="TH"?"ระบบสากล (Tropical Zodiac) อ้างอิงจากฤดูกาลและจุดวิษุวัต (การเริ่มต้นฤดูใบไม้ผลิ) ในขณะที่ระบบไทย (Sidereal Zodiac) อ้างอิงจากตำแหน่งของกลุ่มดาวบนท้องฟ้าจริง ซึ่งแกนโลกมีการส่ายตัวไปเรื่อยๆ ทำให้ปัจจุบันวันที่เริ่มต้นราศีของสองระบบนี้ห่างกันประมาณเกือบ 1 เดือน":"Western (Tropical) relies on seasons and the vernal equinox. Thai (Sidereal) relies on the actual position of constellations in the sky. Due to the precession of the equinoxes, the start dates now differ by almost a month."} />
          <FAQItem q={lang==="TH"?"ระบบนี้คำนวณตามโหราศาสตร์แบบไหน?":"Which astrology system does this calculator use?"} a={lang==="TH"?"เครื่องมือนี้ใช้ 'ระบบสากล' (Tropical Zodiac) ซึ่งเป็นระบบที่นิยมใช้ทั่วโลก (เช่น ตามหนังสือนิตยสารทั่วไป) โดยจะตัดราศีประมาณวันที่ 20-22 ของแต่ละเดือน ตัวอย่างเช่น ราศีเมษจะเริ่มวันที่ 21 มีนาคม":"This calculator uses the 'Western (Tropical) Zodiac', which is the internationally recognized system (found in most magazines). It generally transitions signs around the 20th-22nd of each month."} />
          <FAQItem q={lang==="TH"?"เกิดวันคาบเกี่ยวราศี (Cusp) ควรดูราศีไหน?":"What if I was born on a Cusp?"} a={lang==="TH"?"ผู้ที่เกิดในช่วงรอยต่อ 2 ราศี (ประมาณวันที่ 19-23) จะเรียกว่าเกิดในช่วง Cusp ในทางโหราศาสตร์ถือว่าคุณอาจได้รับอิทธิพลหรือลักษณะนิสัยของทั้ง 2 ราศีผสมผสานกัน หากต้องการความแม่นยำสูงสุดต้องใช้เวลาเกิด (ชั่วโมง/นาที) มาคำนวณลัคนาด้วย":"People born during the transition of two signs (around the 19th-23rd) are born on a 'Cusp'. Astrologically, you may exhibit traits from both signs. For absolute accuracy, you need your exact birth time to calculate your Ascendant."} />
          <FAQItem q={lang==="TH"?"ลัคนา (Ascendant) ต่างจากราศีเกิดอย่างไร?":"How is an Ascendant different from a Sun Sign?"} a={lang==="TH"?"ราศีเกิด (Sun Sign) สะท้อนถึงตัวตนหลัก ภายในจิตใจ ส่วน 'ลัคนา' คือราศีที่กำลังขึ้นที่ขอบฟ้าทิศตะวันออก ณ เวลาที่คุณเกิด สะท้อนถึงบุคลิกภาพภายนอก มุมมองต่อโลก และความประทับใจแรกที่คนอื่นมองเห็นคุณ":"Your Sun Sign reflects your core self. Your 'Ascendant' (Rising Sign) is the zodiac sign rising on the eastern horizon at the exact time of your birth. It represents your outer personality and first impressions."} />
          <FAQItem q={lang==="TH"?"ธาตุประจำราศีคืออะไร?":"What are Zodiac Elements?"} a={lang==="TH"?"ราศีทั้ง 12 แบ่งออกเป็น 4 ธาตุ ได้แก่ ธาตุไฟ (เมษ สิงห์ ธนู), ธาตุดิน (พฤษภ กันย์ มังกร), ธาตุลม (เมถุน ตุลย์ กุมภ์) และ ธาตุน้ำ (กรกฎ พิจิก มีน) ธาตุเหล่านี้ช่วยอธิบายพื้นฐานนิสัยคร่าวๆ ได้":"The 12 signs are grouped into 4 elements: Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), Air (Gemini, Libra, Aquarius), and Water (Cancer, Scorpio, Pisces). They help explain foundational personality traits."} />
          <FAQItem q={lang==="TH"?"ราศีใดที่เข้ากันได้ดีที่สุด?":"Which Zodiac signs are the most compatible?"} a={lang==="TH"?"โดยทั่วไป ราศีในกลุ่มธาตุเดียวกันมักเข้ากันได้ดีที่สุด (ไฟกับไฟ, น้ำกับน้ำ) รวมถึงธาตุที่เกื้อหนุนกัน เช่น ดินกับน้ำ (ความมั่นคง+อารมณ์) และไฟกับลม (พลังงาน+ความคิด)":"Generally, signs of the same element are highly compatible (Fire with Fire). Complementary elements also match well, such as Earth and Water (stability + emotion), or Fire and Air (energy + intellect)."} />
          <FAQItem q={lang==="TH"?"ราศีส่งผลต่อดวงชะตาจริงๆ หรือ?":"Do zodiac signs really affect destiny?"} a={lang==="TH"?"ในทางวิทยาศาสตร์ ไม่มีข้อพิสูจน์ว่าตำแหน่งดวงดาวส่งผลต่อชะตาชีวิต (ปรากฏการณ์ Forer Effect) แต่โหราศาสตร์ถือเป็นศาสตร์แห่งสถิติและความเชื่อที่อยู่คู่มนุษย์มาหลายพันปี จึงขึ้นอยู่กับวิจารณญาณส่วนบุคคล":"Scientifically, there is no proof that star positions affect human lives (often explained by the Forer Effect). However, astrology is a belief system and statistical art practiced for millennia. It depends on personal belief."} />
          <FAQItem q={lang==="TH"?"ดาวประจำตัวคืออะไร?":"What is a Ruling Planet?"} a={lang==="TH"?"แต่ละราศีจะมีดาวเคราะห์ที่เป็นเจ้าเรือนคอยปกปักรักษา เช่น ราศีเมษมีดาวอังคาร (พลังงาน/การต่อสู้), ราศีพฤษภมีดาวศุกร์ (ความรัก/ศิลปะ) ซึ่งดาวเหล่านี้จะเป็นตัวกำหนดลักษณะนิสัยเด่นๆ ของราศีนั้นๆ":"Each sign is governed by a ruling planet. For instance, Aries is ruled by Mars (energy/action), and Taurus by Venus (love/beauty). These planets influence the dominant traits of their respective signs."} />
          <FAQItem q={lang==="TH"?"ราศีที่ 13 (Ophiuchus) คืออะไร?":"What is the 13th Zodiac Sign (Ophiuchus)?"} a={lang==="TH"?"องค์การนาซาเคยอธิบายว่า หากยึดตามกลุ่มดาวบนท้องฟ้าจริงๆ จะมีกลุ่มดาว 'คนแบกงู' (Ophiuchus) แทรกอยู่ระหว่างพิจิกและธนู แต่โหราศาสตร์ตะวันตกยังคงยึดระบบ 12 ราศีที่แบ่งตามฤดูกาลเหมือนเดิม จึงไม่ต้องเปลี่ยนราศีตาม":"NASA pointed out that astronomically, the sun passes through a 13th constellation, Ophiuchus (Nov 29 - Dec 17). However, Western Astrology relies on a 12-slice seasonal system, so your zodiac sign remains unchanged."} />
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
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภทสัตว์เลี้ยง" : "Pet Type"}</label>
          <select value={pet} onChange={e=>setPet(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="dog">{lang === "TH" ? "สุนัข" : "Dog"}</option>
            <option value="cat">{lang === "TH" ? "แมว" : "Cat"}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "อายุสัตว์เลี้ยง (ปี)" : "Pet Age (Years)"}</label>
          <input type="number" step="0.1" value={years} onChange={e=>setYears(e.target.value)} className={`${inputClass} focus:ring-pink-400`} />
        </div>
      </form>
      {hum > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-pink-50 rounded-xl text-center border border-pink-200">
          <p className="text-gray-600 mb-2">{lang === "TH" ? "อายุเทียบเท่ามนุษย์ประมาณ" : "Equivalent Human Age"}</p>
          <div className="text-5xl font-black text-pink-600">{hum} {lang === "TH" ? "ปี" : "Years"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — อายุสัตว์เลี้ยง":"Pet Age FAQ"}>
          <FAQItem q={lang==="TH"?"1 ปีของสุนัขเท่ากับ 7 ปีของคน จริงหรือไม่?":"Is 1 dog year equal to 7 human years?"} a={lang==="TH"?"ไม่จริงทั้งหมดครับ ทฤษฎี 'คูณ 7' เป็นเพียงการประมาณการที่ล้าสมัย ความเป็นจริงสุนัขเจริญเติบโตเร็วกว่ามากในช่วง 2 ปีแรก (สุนัขอายุ 1 ปี เทียบเท่าคนอายุ 15 ปี) หลังจากนั้นอายุจะเพิ่มขึ้นช้าลง":"Not entirely true. The 'multiply by 7' rule is an outdated myth. Dogs mature very rapidly in their first 2 years (a 1-year-old dog equals a 15-year-old human). After that, the aging process slows down."} />
          <FAQItem q={lang==="TH"?"สูตรการคำนวณอายุสุนัขในปัจจุบันคืออะไร?":"What is the modern dog age formula?"} a={lang==="TH"?"สัตวแพทย์มักใช้สูตรนี้: ปีแรก = 15 ปีคน, ปีที่สองบวกเพิ่ม 9 ปีคน (รวมเป็น 24 ปีคน) จากนั้นปีต่อๆ ไปบวกเพิ่มปีละ 4-5 ปีคน ขึ้นอยู่กับขนาดของสุนัข (พันธุ์ใหญ่จะแก่เร็วกว่า)":"Veterinarians often use this formula: 1st year = 15 human years. 2nd year adds 9 years (total 24). Subsequent years add 4-5 human years each, depending on the dog's size (large breeds age faster)."} />
          <FAQItem q={lang==="TH"?"ทำไมสุนัขพันธุ์ใหญ่ถึงอายุสั้นกว่าพันธุ์เล็ก?":"Why do large dog breeds have shorter lifespans?"} a={lang==="TH"?"จากการวิจัยพบว่า สุนัขพันธุ์ใหญ่มีการเจริญเติบโตของเซลล์ที่รวดเร็วมาก ทำให้เซลล์เสื่อมสภาพเร็วขึ้น และมีโอกาสเกิดโรคจากความชรา (เช่น มะเร็ง, ข้อเสื่อม) ได้เร็วกว่าสุนัขพันธุ์เล็กพันธุ์จิ๋ว":"Research suggests that large breed dogs experience accelerated cell growth, leading to faster cellular degeneration. This makes them susceptible to age-related diseases (like cancer or joint issues) much earlier than small breeds."} />
          <FAQItem q={lang==="TH"?"การคำนวณอายุแมวต่างจากสุนัขอย่างไร?":"How is cat age calculated differently?"} a={lang==="TH"?"แมวมีการเจริญเติบโตในช่วงแรกคล้ายสุนัข คือ 1 ปีแมว = 15 ปีคน, 2 ปีแมว = 24 ปีคน แต่หลังจากนั้น อายุแมวจะเพิ่มขึ้นค่อนข้างคงที่ คือบวกเพิ่มประมาณ 4 ปีคน ต่อ 1 ปีแมวเสมอ ไม่ขึ้นอยู่กับสายพันธุ์เท่าสุนัข":"Cats mature similarly early on: 1st year = 15 human years, 2nd year = 24 human years. However, after that, cat aging is much more linear, adding about 4 human years per calendar year, regardless of breed."} />
          <FAQItem q={lang==="TH"?"สัตว์เลี้ยงจะเข้าสู่วัยชรา (Senior) เมื่ออายุเท่าไหร่?":"When is a pet considered a 'Senior'?"} a={lang==="TH"?"สำหรับสุนัขพันธุ์ใหญ่ มักถือเป็นสุนัขสูงวัยเมื่ออายุ 5-6 ปี ส่วนสุนัขพันธุ์เล็กและแมว จะถือเป็นสัตว์สูงวัยเมื่ออายุประมาณ 7-8 ปี ควรเริ่มเปลี่ยนอาหารสำหรับสัตว์สูงวัยและตรวจสุขภาพถี่ขึ้น":"Large dog breeds are considered seniors around 5-6 years old. Small dogs and cats reach senior status around 7-8 years old. This is the time to switch to senior diets and schedule more frequent vet checkups."} />
          <FAQItem q={lang==="TH"?"อายุขัยเฉลี่ยของสุนัขและแมวคือเท่าไหร่?":"What is the average lifespan of dogs and cats?"} a={lang==="TH"?"สุนัขมีอายุขัยเฉลี่ย 10-13 ปี (พันธุ์เล็กอาจอยู่ได้ถึง 15-18 ปี) ส่วนแมวที่เลี้ยงระบบปิดในบ้าน มีอายุขัยเฉลี่ยอยู่ที่ 12-15 ปี (บางตัวสามารถอยู่ได้ถึง 20 ปีหากดูแลดีมาก)":"The average lifespan of a dog is 10-13 years (small breeds can live 15-18 years). Indoor cats live an average of 12-15 years (some well-cared-for cats can reach 20 years of age)."} />
          <FAQItem q={lang==="TH"?"สูตรคณิตศาสตร์ใหม่ของ DNA (Epigenetic clock) คืออะไร?":"What is the Epigenetic clock formula?"} a={lang==="TH"?"มหาวิทยาลัยซานดิเอโกค้นพบสูตรคำนวณแบบใหม่จากการเทียบ DNA คือ Human Age = 16 * ln(Dog Age) + 31 สูตรนี้แม่นยำมากสำหรับช่วงสุนัขอายุ 1-12 ปี โดยใช้ค่าลอการิทึมธรรมชาติ (ln)":"UC San Diego discovered a DNA-based formula: Human Age = 16 * ln(Dog Age) + 31. Using the natural logarithm (ln), this epigenetic clock is highly accurate for dogs aged 1 to 12 years."} />
          <FAQItem q={lang==="TH"?"วิธีสังเกตความชราของสัตว์เลี้ยงมีอะไรบ้าง?":"What are the signs of aging in pets?"} a={lang==="TH"?"สิ่งที่สังเกตได้ชัดคือ: มีขนสีเทาหรือขาวรอบจมูก/ใบหน้า, การเคลื่อนไหวช้าลง, นอนหลับมากขึ้น, ตาขุ่นมัว (ต้อกระจก) และอาจเริ่มมีปัญหาการควบคุมการขับถ่าย":"Visible signs include: graying hair around the muzzle/face, slower movements, increased sleeping hours, cloudy eyes (cataracts), and sometimes urinary incontinence or accidents."} />
          <FAQItem q={lang==="TH"?"ควรพาสัตว์เลี้ยงสูงวัยไปตรวจสุขภาพบ่อยแค่ไหน?":"How often should senior pets visit the vet?"} a={lang==="TH"?"สัตวแพทย์แนะนำให้พาสัตว์เลี้ยงที่อายุเกิน 7 ปี เข้าตรวจสุขภาพอย่างน้อยทุกๆ 6 เดือน เพื่อตรวจเลือด ค่าตับ ค่าไต เนื่องจากโรคในสัตว์เลี้ยงสูงวัยมักจะลุกลามเร็วกว่ามนุษย์มาก":"Veterinarians strongly recommend that pets over 7 years old get a comprehensive checkup at least every 6 months (bloodwork, liver/kidney panels), as diseases progress much faster in senior pets."} />
          <FAQItem q={lang==="TH"?"การทำหมันช่วยยืดอายุสัตว์เลี้ยงได้ไหม?":"Does spaying/neutering prolong a pet's life?"} a={lang==="TH"?"ได้ครับ การวิจัยพบว่าสัตว์เลี้ยงที่ทำหมันมีอายุยืนกว่า 10-20% เนื่องจากลดความเสี่ยงการเกิดมะเร็งอวัยวะสืบพันธุ์ (มะเร็งเต้านม, มดลูกอักเสบ, มะเร็งอัณฑะ) และลดพฤติกรรมก้าวร้าวหรือหนีออกจากบ้าน":"Yes! Studies show spayed/neutered pets live 10-20% longer. It eliminates or reduces the risks of reproductive cancers (mammary tumors, pyometra, testicular cancer) and decreases roaming or aggressive behaviors."} />
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
      <SEOFAQ title={lang==="TH"?"FAQ — พัฒนาการเด็กตามวัย":"Child Development Milestones FAQ"}>
          <FAQItem isStep q={lang==="TH"?"ข้อสงวนสิทธิ์ทางการแพทย์ (Medical Disclaimer)":"Medical Disclaimer"} a={lang==="TH"?"ข้อมูลพัฒนาการเด็กนี้อ้างอิงจากหลักเกณฑ์มาตรฐานทั่วไป แต่ละคนอาจมีพัฒนาการช้าหรือเร็วแตกต่างกัน ไม่สามารถใช้เป็นเครื่องมือวินิจฉัยโรคได้ หากท่านสงสัยว่าบุตรหลานมีพัฒนาการล่าช้า โปรดปรึกษากุมารแพทย์เพื่อรับการประเมินอย่างละเอียด":"This developmental milestones guide is based on general standards. Every child develops at their own pace. This is NOT a diagnostic tool. If you suspect any developmental delays, please consult a pediatrician for a comprehensive assessment."} />
          <FAQItem q={lang==="TH"?"พัฒนาการเด็ก (Child Milestones) คืออะไร?":"What are Child Milestones?"} a={lang==="TH"?"พัฒนาการเด็กคือสิ่งที่เด็กส่วนใหญ่สามารถทำได้เมื่อถึงช่วงอายุหนึ่งๆ เช่น การยิ้ม การพลิกคว่ำ การเดิน หรือการพูด ซึ่งจะถูกแบ่งออกเป็น 4 ด้านหลัก ได้แก่ ด้านร่างกาย, ด้านสติปัญญา, ด้านภาษา และด้านสังคม/อารมณ์":"Child milestones are skills most children can do by a certain age, such as smiling, rolling over, walking, or talking. They are divided into 4 main domains: Physical, Cognitive, Language, and Social/Emotional."} />
          <FAQItem q={lang==="TH"?"เด็กทารกแรกเกิดถึง 3 เดือน ควรทำอะไรได้บ้าง?":"What should a 0-3 month old be able to do?"} a={lang==="TH"?"เด็กวัย 3 เดือนควรเริ่มยิ้มตอบสนอง (Social smile), สามารถชันคอได้เมื่อนอนคว่ำ, สายตามองตามสิ่งของที่เคลื่อนที่ได้ และเริ่มส่งเสียงอ้อแอ้ หากคอยังพับอยู่ถือเป็นสัญญาณอันตรายที่ต้องพบแพทย์":"By 3 months, a baby should show a social smile, hold their head up while on their tummy, track moving objects with their eyes, and start cooing. Head lag at this stage is a red flag."} />
          <FAQItem q={lang==="TH"?"เด็กควรเริ่มคลานเมื่ออายุเท่าไหร่?":"When should a baby start crawling?"} a={lang==="TH"?"เด็กส่วนใหญ่จะเริ่มคลานในช่วงอายุ 6 ถึง 10 เดือน อย่างไรก็ตาม เด็กบางคนอาจข้ามขั้นการคลานไปสู่การเกาะยืนและเดินเลย ซึ่งหากการเคลื่อนไหวส่วนอื่นปกติ ก็ถือว่าไม่ผิดปกติแต่อย่างใด":"Most babies begin crawling between 6 and 10 months. However, some babies completely skip the crawling phase and go straight to pulling up and walking. If other motor skills are normal, this isn't usually a concern."} />
          <FAQItem q={lang==="TH"?"เด็กควรเริ่มเดินได้เมื่อไหร่?":"When should a child start walking?"} a={lang==="TH"?"ช่วงอายุที่เริ่มเดินได้คือ 9 ถึง 15 เดือน เด็กส่วนใหญ่จะตั้งไข่และเดินก้าวแรกได้ในช่วงขวบปีแรก หากอายุ 18 เดือน (1 ขวบครึ่ง) แล้วยังเดินเองไม่ได้ ควรพากลับไปปรึกษากุมารแพทย์ทันที":"The window for walking is typically 9 to 15 months. Most children take their first steps around their first birthday. If a child is not walking independently by 18 months, consult a pediatrician immediately."} />
          <FAQItem q={lang==="TH"?"พัฒนาการด้านภาษา: ลูกควรเริ่มพูดคำแรกเมื่อไหร่?":"When should my baby say their first word?"} a={lang==="TH"?"คำแรกที่มีความหมาย (เช่น หม่ำ ปา มา) มักจะเกิดขึ้นช่วงอายุ 10 ถึง 14 เดือน เมื่อครบ 1 ขวบครึ่ง (18 เดือน) ควรจะพูดได้อย่างน้อย 10-20 คำ และเมื่อ 2 ขวบ ควรเริ่มต่อคำ 2 คำเข้าด้วยกันได้ (เช่น ไปเที่ยว)":"The first meaningful words (like mama, dada) usually emerge between 10 and 14 months. By 18 months, they should know 10-20 words. By 2 years, they should start putting 2 words together (e.g., 'go out')."} />
          <FAQItem q={lang==="TH"?"สัญญาณเตือน (Red Flags) ของพัฒนาการล่าช้ามีอะไรบ้าง?":"What are the 'Red Flags' for developmental delay?"} a={lang==="TH"?"สัญญาณเตือนได้แก่: ไม่ยิ้มตอบเมื่อ 3 เดือน, ไม่สบตา, ไม่หันตามเสียง, ไม่ชี้บอกความต้องการเมื่ออายุ 1 ขวบ, ไม่พูดคำแรกเมื่อ 18 เดือน, ไม่สามารถทรงตัวเดินได้เมื่อ 1 ขวบครึ่ง หรือทักษะที่เคยทำได้หายไป":"Red flags include: no social smile by 3 months, no eye contact, not reacting to sounds, not pointing by 12 months, no words by 18 months, unable to walk by 18 months, or losing previously acquired skills."} />
          <FAQItem q={lang==="TH"?"หน้าจอ (Screen time) ส่งผลต่อพัฒนาการลูกอย่างไร?":"How does screen time affect child development?"} a={lang==="TH"?"กุมารแพทย์สมาคม (AAP) แนะนำว่า เด็กอายุต่ำกว่า 2 ขวบ 'ไม่ควร' ดูหน้าจอใดๆ เลย (ยกเว้นวิดีโอคอลกับญาติ) เพราะจะทำให้พัฒนาการด้านภาษาล่าช้า ขาดปฏิสัมพันธ์ทางสังคม และส่งผลต่อสมาธิอย่างรุนแรงในระยะยาว":"The AAP recommends ZERO screen time for children under 2 years old (except video chatting with family). Excessive screen time causes severe language delays, lack of social skills, and long-term attention deficits."} />
          <FAQItem q={lang==="TH"?"การอ่านหนังสือให้ลูกฟังสำคัญอย่างไร?":"Why is reading to children important?"} a={lang==="TH"?"การอ่านนิทานให้ลูกฟังตั้งแต่แรกเกิด ช่วยกระตุ้นพัฒนาการด้านสมอง ภาษา และความผูกพัน (Bonding) เด็กที่พ่อแม่อ่านหนังสือให้ฟังเป็นประจำจะมีคลังคำศัพท์มากกว่า และมีความพร้อมในการเรียนรู้สูงกว่าเด็กทั่วไปมาก":"Reading to your baby from birth drastically boosts brain and language development, as well as parent-child bonding. Children read to regularly have a significantly larger vocabulary and are much more prepared for schooling."} />
          <FAQItem q={lang==="TH"?"หากสงสัยว่าลูกเป็นออทิสติก (Autism) ควรสังเกตจากอะไร?":"How to spot signs of Autism Spectrum Disorder?"} a={lang==="TH"?"อาการเบื้องต้นที่อาจเข้าข่ายได้แก่: ไม่ค่อยสบตาผู้พูด, เรียกชื่อแล้วไม่ค่อยหัน, ไม่ชี้นิ้วบอกความต้องการ, เล่นของเล่นซ้ำๆ แบบผิดปกติ (เช่น เอาแต่หมุนล้อรถ), และแสดงอาการต่อต้านการเปลี่ยนแปลงกิจวัตรประจำวันรุนแรง":"Early signs include: avoiding eye contact, not responding to their name, not pointing to show interest, repetitive unusual play (e.g., obsessively spinning toy wheels), and severe resistance to changes in routine."} />
          <FAQItem q={lang==="TH"?"ถ้าลูกพัฒนาการช้าควรทำอย่างไร?":"What if my child is behind on milestones?"} a={lang==="TH"?"พัฒนาการเด็กแต่ละคนไม่เท่ากัน ช้า 1-2 เดือนอาจเป็นเรื่องปกติ หากช้ากว่า 2 เดือนในหลายด้าน ควรปรึกษาแพทย์เด็ก เครื่องมือนี้ใช้เป็นเพียงแนวทางเบื้องต้นเท่านั้น":"Every child develops at their own pace. Being 1-2 months behind is often normal. If more than 2 months behind in multiple areas, consult a pediatrician. This is a reference guide only."} />
        </SEOFAQ>
    </div>
  );
}
