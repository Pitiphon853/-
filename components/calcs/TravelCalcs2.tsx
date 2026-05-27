"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

// 1. Jet Lag Recovery Calculator
export function JetLagCalculator({ lang }: { lang: Lang }) {
  const [timezones, setTimezones] = useLocalState("jl_tz", "5");
  const [direction, setDirection] = useLocalState("jl_dir", "east");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const tzCrossed = parseFloat(timezones);
    if (!isNaN(tzCrossed) && tzCrossed >= 0) {
      // General rule: 1 day per time zone. Eastward travel often takes longer to adjust.
      let days = tzCrossed;
      if (direction === "east") {
        days = tzCrossed * 1.5; // Roughly 50% longer for eastward travel
      } else if (direction === "west") {
        days = tzCrossed * 1;
      }
      setResult(Math.ceil(days));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-cyan-600">{lang === "TH" ? "คำนวณเวลาฟื้นตัวจาก Jet Lag" : "Jet Lag Recovery Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนโซนเวลาที่ข้าม (Timezones Crossed)" : "Timezones Crossed"}</label>
          <input type="number" min="0" max="24" value={timezones} onChange={e=>setTimezones(e.target.value)} required className={`${inputClass} focus:ring-cyan-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ทิศทางการเดินทาง (Direction)" : "Travel Direction"}</label>
          <select value={direction} onChange={e=>setDirection(e.target.value)} className={`${inputClass} focus:ring-cyan-400`}>
             <option value="east">{lang === "TH" ? "บินไปทางตะวันออก (Eastward - เช่น ไทย ไป ญี่ปุ่น/อเมริกา)" : "Eastward"}</option>
             <option value="west">{lang === "TH" ? "บินไปทางตะวันตก (Westward - เช่น ไทย ไป ยุโรป)" : "Westward"}</option>
             <option value="none">{lang === "TH" ? "บินขึ้นเหนือ/ลงใต้ (โซนเวลาเดิม)" : "North/South (Same timezone)"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600">{lang==="TH"?"คำนวณเวลาฟื้นตัว":"Calculate Recovery Time"}</button>
      </form>

      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-cyan-50 rounded-xl text-center border border-cyan-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "ระยะเวลาฟื้นตัวโดยประมาณ:" : "Estimated Recovery Time:"}</p>
          <div className="text-4xl font-black text-cyan-600">{result === 0 ? (lang==="TH"?"ไม่ต้องใช้เวลาฟื้นตัว (No Jet Lag)":"No Jet Lag") : `${result} ${lang==="TH"?"วัน (Days)":"Days"}`}</div>
          <p className="text-sm text-gray-500 mt-2">{lang === "TH" ? "*การบินไปทางตะวันออกมักจะทำให้เกิดอาการ Jet Lag ที่รุนแรงกว่า" : "*Eastward travel typically causes more severe Jet Lag."}</p>
        </motion.div>
      )}

      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "องค์การอนามัยโลก (WHO) ระบุว่าโดยทั่วไปร่างกายจะต้องการเวลา 1 วันในการปรับตัวต่อ 1 โซนเวลาที่เปลี่ยนแปลง",
            "การเดินทางไปทางตะวันออก (Eastward) ร่างกายจะต้องปรับเวลานอนให้เร็วขึ้น ซึ่งทำได้ยากกว่าการเดินทางไปทางตะวันตก",
            "สมการเบื้องต้น: จำนวนโซนเวลา = จำนวนวันที่ต้องใช้พักฟื้น (บวกเวลาเพิ่มอีก 50% สำหรับตะวันออก)"
          ] : [
            "Rule of thumb from aviation health experts: 1 day of recovery per timezone crossed.",
            "Eastward travel requires advancing the body clock, which is harder than delaying it (Westward).",
            "Basic Formula: Timezones crossed = Days needed (Add 50% for Eastward)."
          ]}
        />
        <SEOFAQ title={lang==="TH"?"คำถามที่พบบ่อย (FAQ) — อาการ Jet Lag และการปรับตัว":"FAQ — Jet Lag & Recovery"}>
        <FAQItem 
          q={lang==="TH"?"Jet Lag (เจ็ตแล็ก) คืออะไร และทำไมถึงเกิดขึ้นเมื่อเดินทางข้ามทวีป?":"What is Jet Lag and why does it occur during cross-continent travel?"} 
          a={lang==="TH"?"อาการ Jet Lag หรืออาการเมาเวลาเที่ยวบิน เกิดขึ้นเมื่อความตื่นตัวของร่างกายและวงจรการนอนหลับ (Circadian Rhythm หรือ นาฬิกาชีวภาพ) ไม่สอดคล้องกับเวลาท้องถิ่นของจุดหมายปลายทาง นาฬิกาชีวภาพของมนุษย์ถูกควบคุมโดยแสงสว่าง ความมืด และระดับฮอร์โมนเมลาโทนิน (Melatonin) ในสมอง เมื่อเราเดินทางข้ามโซนเวลา (Time Zones) อย่างรวดเร็วผ่านทางเครื่องบิน ร่างกายของเราจะไม่สามารถปรับตัวให้เข้ากับรอบวันและคืนใหม่ได้ทันที ส่งผลให้เกิดอาการเหนื่อยล้า อ่อนเพลีย นอนไม่หลับในเวลากลางคืน ง่วงนอนในเวลากลางวัน มีปัญหาเกี่ยวกับระบบย่อยอาหาร เช่น ท้องอืดหรือท้องผูก ขาดสมาธิ และมีอารมณ์แปรปรวน องค์การอนามัยโลก (WHO) และผู้เชี่ยวชาญด้านเวชศาสตร์การบินระบุว่า อาการ Jet Lag จะเริ่มสังเกตเห็นได้ชัดเจนเมื่อมีการเดินทางข้ามโซนเวลาตั้งแต่ 3 โซนเวลาขึ้นไป (เช่น การบินจากประเทศไทยไปยังประเทศญี่ปุ่น ข้าม 2 โซนเวลา อาจจะมีอาการเพียงเล็กน้อย แต่หากบินจากไทยไปยุโรปที่ห่างกัน 6-7 ชั่วโมง อาการจะชัดเจนมาก) ความรุนแรงของอาการนี้จะขึ้นอยู่กับจำนวนโซนเวลาที่ข้าม อายุของผู้เดินทาง (ผู้สูงอายุมักปรับตัวได้ช้ากว่า) และทิศทางการเดินทาง":"Jet Lag occurs when your body's internal biological clock (Circadian Rhythm) is out of sync with the local time of your destination. The human body clock is regulated by light, darkness, and melatonin levels. When traveling rapidly across multiple time zones, the body cannot adjust immediately, leading to fatigue, insomnia at night, daytime sleepiness, digestive issues, and mood changes. The World Health Organization (WHO) states that Jet Lag becomes prominent when crossing 3 or more time zones. The severity depends on the number of zones crossed, age, and travel direction."} 
        />
        <FAQItem 
          q={lang==="TH"?"ทำไมการบินไปทางทิศตะวันออก (Eastward) ถึงทำให้ Jet Lag รุนแรงกว่าการบินไปทิศตะวันตก (Westward)?":"Why does traveling Eastward cause worse Jet Lag than traveling Westward?"} 
          a={lang==="TH"?"ตามหลักการทางสรีรวิทยาและเวชศาสตร์การบิน (Aviation Medicine) การเดินทางไปทางทิศตะวันออก (Eastward) เช่น บินจากไทยไปอเมริกา หรือจากยุโรปมาเอเชีย จะทำให้เกิดอาการ Jet Lag ที่รุนแรงและกินเวลานานกว่าการบินไปทางทิศตะวันตก สาเหตุหลักมาจาก 'วงจรนาฬิกาชีวภาพตามธรรมชาติของมนุษย์' ซึ่งมักจะยาวกว่า 24 ชั่วโมงเล็กน้อย (ประมาณ 24.2 ชั่วโมง) ทำให้ร่างกายของเรา 'ขยายเวลา' หรือนอนดึกขึ้น (Delay) ได้ง่ายกว่าการ 'หดเวลา' หรือบังคับให้นอนเร็วขึ้น (Advance) \n\nเมื่อบินไปทางตะวันตก (เช่น ไทยไปยุโรป) ร่างกายจะได้เวลาเพิ่มในวันนั้น ทำให้เรารู้สึกเหมือนแค่ต้องนอนดึกขึ้นกว่าปกติ ซึ่งสอดคล้องกับธรรมชาติของร่างกาย แต่เมื่อบินไปทางตะวันออก เวลาของวันนั้นจะสั้นลง ร่างกายถูกบังคับให้ต้องตื่นก่อนเวลาปกติ และต้องเข้านอนในขณะที่ร่างกายยังรู้สึกว่าเป็นช่วงหัวค่ำ งานวิจัยจากสมาคมเวชศาสตร์การนอนหลับแห่งสหรัฐอเมริกา (AASM) ระบุว่า ร่างกายมนุษย์ต้องการเวลาพักฟื้นโดยเฉลี่ย 1 วัน ต่อ 1 โซนเวลาที่เดินทางไปทิศตะวันตก แต่หากเดินทางไปทิศตะวันออก อาจต้องใช้เวลาถึง 1.5 วัน ต่อ 1 โซนเวลา หรือนานกว่านั้น ดังนั้น หากบินไปอเมริกาที่ห่างกัน 12 โซนเวลา อาจต้องใช้เวลาเป็นสัปดาห์กว่าร่างกายจะกลับมาสมบูรณ์ 100%":"According to aviation medicine and physiological principles, traveling eastward causes more severe Jet Lag than traveling westward. The human biological clock naturally runs slightly longer than 24 hours (about 24.2 hours). It is much easier for our bodies to 'delay' our internal clock (stay up later) than to 'advance' it (go to sleep earlier). Traveling westward adds hours to your day, making you feel like staying up late, which aligns with the body's natural tendency. Traveling eastward shortens your day, forcing you to sleep when your body feels wide awake and wake up when it feels like the middle of the night. The American Academy of Sleep Medicine (AASM) notes it takes about 1 day to adjust per time zone westward, but up to 1.5 days per time zone eastward."} 
        />
        <FAQItem 
          q={lang==="TH"?"มีวิธีการทางวิทยาศาสตร์ใดบ้างที่ช่วยป้องกันและรักษาอาการ Jet Lag ให้หายเร็วที่สุด?":"What are the scientifically proven ways to prevent and treat Jet Lag?"} 
          a={lang==="TH"?"การบรรเทาอาการ Jet Lag ให้ได้ผลดีที่สุดต้องใช้วิธีการผสมผสาน (Multidisciplinary Approach) ก่อน ระหว่าง และหลังการเดินทาง ดังนี้:\n\n1. การปรับเวลานอนล่วงหน้า (Pre-Adjustment): หากจะบินไปตะวันออก ให้เริ่มเข้านอนและตื่นเร็วขึ้นวันละ 1-2 ชั่วโมง เป็นเวลา 3 วันก่อนเดินทาง หากบินไปตะวันตก ให้นอนดึกขึ้นและตื่นสายขึ้น\n2. การควบคุมแสงสว่าง (Light Exposure): แสงแดดคือตัวควบคุมนาฬิกาชีวภาพที่สำคัญที่สุด หากคุณถึงที่หมายในเวลากลางวัน ให้ออกไปรับแสงแดดเพื่อหยุดการหลั่งเมลาโทนิน ช่วยให้ร่างกายตื่นตัว หากถึงเวลากลางคืน ให้หลีกเลี่ยงแสงสีฟ้าจากหน้าจอมือถือและพยายามอยู่ในที่มืด\n3. ฮอร์โมนเมลาโทนิน (Melatonin): ผู้เชี่ยวชาญจากคลินิก Mayo Clinic แนะนำว่า การทานอาหารเสริมเมลาโทนิน (ขนาด 0.5 - 5 มิลลิกรัม) ประมาณ 1-2 ชั่วโมงก่อนเวลาเข้านอนของปลายทาง สามารถช่วยหลอกร่างกายให้รู้สึกง่วงและปรับนาฬิกาชีวภาพได้รวดเร็วขึ้น แต่ควรปรึกษาแพทย์ก่อนใช้\n4. หลีกเลี่ยงคาเฟอีนและแอลกอฮอล์: เครื่องดื่มเหล่านี้ทำให้ร่างกายขาดน้ำ (Dehydration) และรบกวนสถาปัตยกรรมการนอนหลับ (Sleep Architecture) บนเครื่องบิน ควรดื่มน้ำเปล่าให้มากๆ แทน\n5. โภชนาการ: การกินอาหารมื้อหนักๆ ผิดเวลาจะทำให้ระบบย่อยอาหารทำงานรวน ควรทานอาหารอ่อนๆ และพยายามปรับเวลามื้ออาหารให้ตรงกับเวลาของประเทศปลายทางทันทีที่ขึ้นเครื่อง":"To effectively mitigate Jet Lag, a multidisciplinary approach is recommended before, during, and after the flight:\n1. Pre-Adjustment: For eastward travel, go to bed and wake up 1-2 hours earlier for a few days prior. For westward, sleep and wake later.\n2. Light Exposure: Sunlight is the strongest regulator of the circadian clock. Get bright sunlight if you arrive during the day to suppress melatonin. Avoid bright screens at night.\n3. Melatonin Supplements: Mayo Clinic experts suggest taking 0.5-5 mg of melatonin 1-2 hours before the destination's bedtime to help reset your internal clock (consult a doctor first).\n4. Avoid Caffeine & Alcohol: These cause dehydration and disrupt sleep architecture. Drink plenty of water instead.\n5. Nutrition Timing: Adjust your meal times to match the destination immediately upon boarding. Avoid heavy, rich foods that can disrupt digestion at odd hours."} 
        />
        <FAQItem 
          q={lang==="TH"?"Jet Lag มีผลกระทบต่อประสิทธิภาพการทำงานหรือนักกีฬาอาชีพมากน้อยเพียงใด?":"How does Jet Lag impact work performance or professional athletes?"} 
          a={lang==="TH"?"อาการ Jet Lag มีผลกระทบอย่างมีนัยสำคัญต่อสมรรถภาพทางกาย (Physical Performance) และกระบวนการคิดวิเคราะห์ (Cognitive Function) งานวิจัยที่ตีพิมพ์ในวารสารการแพทย์การกีฬา (Journal of Sports Sciences) พบว่า นักกีฬาที่เดินทางข้ามโซนเวลาหลายโซน จะมีการตอบสนอง (Reaction Time) ลดลง ความแข็งแรงของกล้ามเนื้อลดลง และมีความเสี่ยงต่อการบาดเจ็บสูงขึ้นในช่วง 2-3 วันแรกหลังจากเดินทางถึงที่หมาย นี่เป็นเหตุผลว่าทำไมทีมกีฬาระดับโลกจึงต้องเดินทางล่วงหน้าหลายวันก่อนการแข่งขันจริง เพื่อให้ร่างกายปรับตัวได้อย่างสมบูรณ์\n\nสำหรับนักธุรกิจหรือคนทำงาน การตัดสินใจทางการเงินหรือการเจรจาธุรกิจที่สำคัญไม่ควรเกิดขึ้นในวันแรกที่เพิ่งเดินทางข้าม 6-12 โซนเวลา เนื่องจากสมองส่วนหน้า (Prefrontal Cortex) ที่ควบคุมการคิดอย่างมีเหตุผลจะทำงานได้ไม่เต็มที่ ความจำระยะสั้นลดลง และความสามารถในการแก้ไขปัญหาซับซ้อนแย่ลงเทียบเท่ากับคนที่อดนอนมาทั้งคืน การให้เวลาตัวเองพักผ่อนและทำตามกฎ '1 โซนเวลา ต่อ 1 วัน' จึงเป็นมาตรฐานความปลอดภัยที่สายการบินพาณิชย์กำหนดให้กัปตันและลูกเรือปฏิบัติตาม เพื่อป้องกันความผิดพลาดที่อาจเกิดจากความเหนื่อยล้าสะสม":"Jet Lag significantly impacts both physical performance and cognitive function. Research in the Journal of Sports Sciences shows that athletes crossing multiple time zones experience decreased reaction times, reduced muscle strength, and a higher risk of injury during the first few days. This is why professional teams travel days in advance of major events to acclimatize.\nFor business professionals, crucial financial decisions or negotiations should not occur on the first day after crossing 6-12 time zones. The prefrontal cortex, responsible for logical reasoning, is compromised. Short-term memory and complex problem-solving abilities decline to levels similar to being sleep-deprived. Allowing recovery based on the '1 time zone per 1 day' rule is a safety standard adopted by commercial airlines for pilots to prevent fatigue-related human errors."} 
        />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Roaming Cost Calculator
export function RoamingCostCalculator({ lang }: { lang: Lang }) {
  const [days, setDays] = useLocalState("rc_days", "7");
  const [dataUsage, setDataUsage] = useLocalState("rc_data", "5"); // GB
  const [voiceMinutes, setVoiceMinutes] = useLocalState("rc_voice", "30"); // minutes
  
  // Package Types
  const [packageType, setPackageType] = useLocalState("rc_pkg", "daily");
  const [dailyRate, setDailyRate] = useLocalState("rc_drate", "299");
  const [payPerMb, setPayPerMb] = useLocalState("rc_pmb", "0.5"); // baht per MB
  const [payPerMin, setPayPerMin] = useLocalState("rc_pmin", "40"); // baht per minute

  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(days);
    const dataGB = parseFloat(dataUsage);
    const voice = parseFloat(voiceMinutes);
    const dRate = parseFloat(dailyRate);
    const ppb = parseFloat(payPerMb);
    const ppm = parseFloat(payPerMin);
    
    if (isNaN(d) || isNaN(dataGB) || isNaN(voice)) return;

    let total = 0;
    if (packageType === "daily") {
      // Daily flat rate usually covers data. Voice might still be extra.
      // Assuming flat rate is for DATA only, voice is pay-per-min.
      total = (d * dRate) + (voice * ppm);
    } else if (packageType === "payperuse") {
      const dataMB = dataGB * 1024;
      total = (dataMB * ppb) + (voice * ppm);
    } else if (packageType === "sim2fly") {
       // Typical travel SIM costs around 399-899 THB for 7-15 days.
       // Voice might be cheaper, say 10 THB/min.
       total = 899 + (voice * 10);
    }
    
    setResult(total);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-cyan-600">{lang === "TH" ? "คำนวณค่าโรมมิ่งมือถือ (Roaming Cost)" : "Data Roaming Cost Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนวันเดินทาง" : "Travel Days"}</label>
            <input type="number" min="1" value={days} onChange={e=>setDays(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภทแพ็กเกจ" : "Package Type"}</label>
            <select value={packageType} onChange={e=>setPackageType(e.target.value)} className={inputClass}>
               <option value="daily">{lang === "TH" ? "เหมาจ่ายรายวัน (Daily Unlimited Data)" : "Daily Flat Rate"}</option>
               <option value="sim2fly">{lang === "TH" ? "ซิมสำหรับท่องเที่ยว (Travel SIM)" : "Travel SIM"}</option>
               <option value="payperuse">{lang === "TH" ? "จ่ายตามจริง (Pay Per Use - ระวังแพง!)" : "Pay Per Use"}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ใช้อินเทอร์เน็ต (GB)" : "Data Usage (GB)"}</label>
            <input type="number" step="0.1" min="0" value={dataUsage} onChange={e=>setDataUsage(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "โทรออก/รับสาย (นาที)" : "Voice Calls (Minutes)"}</label>
            <input type="number" min="0" value={voiceMinutes} onChange={e=>setVoiceMinutes(e.target.value)} className={inputClass} />
          </div>
        </div>

        {packageType === "daily" && (
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าบริการรายวัน (บาท/วัน)" : "Daily Rate (THB/Day)"}</label>
            <input type="number" value={dailyRate} onChange={e=>setDailyRate(e.target.value)} className={inputClass} />
          </div>
        )}

        {packageType === "payperuse" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าเน็ต (บาท/MB)" : "Data Rate (THB/MB)"}</label>
              <input type="number" step="0.1" value={payPerMb} onChange={e=>setPayPerMb(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าโทร (บาท/นาที)" : "Voice Rate (THB/Min)"}</label>
              <input type="number" value={payPerMin} onChange={e=>setPayPerMin(e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        {packageType !== "payperuse" && (
           <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าโทรเฉลี่ยโรมมิ่ง (บาท/นาที)" : "Avg Voice Rate (THB/Min)"}</label>
            <input type="number" value={payPerMin} onChange={e=>setPayPerMin(e.target.value)} className={inputClass} />
          </div>
        )}

        <button type="submit" className="w-full py-4 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600">{lang==="TH"?"คำนวณค่าใช้จ่าย":"Calculate Cost"}</button>
      </form>

      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-cyan-50 rounded-xl text-center border border-cyan-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "ค่าใช้จ่ายทั้งหมดโดยประมาณ:" : "Estimated Total Cost:"}</p>
          <div className={`text-4xl font-black ${result > 3000 ? 'text-red-600' : 'text-cyan-600'}`}>
             ฿{result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          {result > 5000 && (
             <p className="text-red-500 font-bold mt-3 text-sm">{lang==="TH"?"⚠️ ค่าใช้จ่ายสูงมาก! แนะนำให้ซื้อแพ็กเกจเสริมหรือ Travel SIM":"⚠️ Extremely high! Recommend buying a Travel SIM or data package."}</p>
          )}
        </motion.div>
      )}

      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "การคิดเงินแบบรายวัน (Daily): จำนวนวัน × ราคาเหมาจ่ายรายวัน + ค่าโทรศัพท์ (ตามนาที)",
            "การคิดเงินแบบ Travel SIM: ราคาซิมการ์ดตายตัว (เช่น 399 บาท หรือ 899 บาท) + ค่าโทรศัพท์เพิ่มเติม (มักจะถูกกว่าโรมมิ่งปกติ)",
            "การคิดเงินแบบ Pay Per Use: อันตรายที่สุด! 1 GB = 1024 MB หาก MB ละ 0.5 บาท โหลดหนัง 1 GB อาจเสียเงินถึง 512 บาท!"
          ] : [
            "Daily Flat Rate: (Days × Daily Price) + (Voice calls per minute).",
            "Travel SIM: Fixed price (e.g., 899 THB for 15 days) + cheap voice calls.",
            "Pay Per Use: Highly dangerous! 1 GB = 1024 MB. At 0.5 THB/MB, 1 GB costs 512 THB!"
          ]}
        />
        <SEOFAQ title={lang==="TH"?"คำถามที่พบบ่อย (FAQ) — บริการข้ามแดนอัตโนมัติและค่าโรมมิ่ง":"FAQ — Data Roaming & Mobile Costs"}>
        <FAQItem 
          q={lang==="TH"?"Data Roaming (บริการข้อมูลข้ามแดนอัตโนมัติ) คืออะไร ทำไมถึงมีราคาแพงเมื่อไปต่างประเทศ?":"What is Data Roaming and why is it so expensive abroad?"} 
          a={lang==="TH"?"Data Roaming คือบริการที่ให้คุณสามารถใช้อินเทอร์เน็ตบนเครือข่ายมือถือของต่างประเทศได้ โดยใช้ซิมการ์ดเบอร์เดิมของคุณจากประเทศไทย สาเหตุที่การโรมมิ่งมีราคาแพง (โดยเฉพาะแบบ Pay-Per-Use หรือใช้เท่าไรจ่ายเท่านั้น) เป็นเพราะผู้ให้บริการเครือข่ายในประเทศไทย (เช่น AIS, TRUE, DTAC) ต้องไปทำข้อตกลงเช่าใช้สัญญาณกับผู้ให้บริการในต่างประเทศ (เช่น AT&T ในอเมริกา หรือ NTT Docomo ในญี่ปุ่น) การเรียกเก็บเงินระหว่างเครือข่ายข้ามประเทศมีต้นทุนและค่าธรรมเนียมเชื่อมต่อ (Interconnection Fees) ที่สูงมากตามข้อตกลงสากล \n\nในอดีต หากคุณลืมปิด Data Roaming โทรศัพท์จะทำการดาวน์โหลดข้อมูล 백กราวด์ (เช่น อัปเดตแอปฯ หรือรับอีเมล) โดยอัตโนมัติ ซึ่งอาจสร้างบิลเรียกเก็บเงินหลักหมื่นหรือหลักแสนบาทที่เรียกว่า 'Bill Shock' ได้ อย่างไรก็ตาม ปัจจุบันผู้ให้บริการมีมาตรการป้องกันโดยการจำกัดวงเงิน (Credit Limit) หรือแจ้งเตือนทันทีเมื่อค่าบริการสูงเกินปกติ ผู้เชี่ยวชาญด้านโทรคมนาคม (GSMA) แนะนำว่า ผู้เดินทางควรสมัครแพ็กเกจโรมมิ่งแบบเหมาจ่ายรายวัน (Flat Rate) หรือซื้อซิมสำหรับนักท่องเที่ยว (Travel SIM) เพื่อควบคุมค่าใช้จ่ายได้ 100%":"Data Roaming allows you to use mobile internet on a foreign network using your home SIM card. It is expensive (especially Pay-Per-Use) because your home network provider must sign agreements and pay interconnection fees to the foreign network provider. These international wholesale rates are traditionally very high. In the past, forgetting to turn off Data Roaming could result in a massive 'Bill Shock' of thousands of dollars just from background app updates. Today, carriers implement credit limits and alerts. The GSMA and telecom experts highly recommend subscribing to a fixed-price daily roaming package or buying a Travel SIM to strictly control costs."} 
        />
        <FAQItem 
          q={lang==="TH"?"Travel SIM หรือซิมท่องเที่ยว ต่างจาก Data Roaming แบบแพ็กเกจเหมาจ่ายรายวันอย่างไร? ควรเลือกแบบไหนดี?":"Travel SIM vs. Daily Roaming Package: What is the difference and which is better?"} 
          a={lang==="TH"?"ความแตกต่างหลักอยู่ที่ 'ความสะดวก' และ 'ราคา':\n\n1. ซิมท่องเที่ยว (Travel SIM / Local SIM): เป็นซิมการ์ดที่ซื้อใหม่แบบเติมเงิน (Prepaid) ข้อดีคือราคาถูกมาก (เช่น เอเชีย 8 วัน ประมาณ 399 บาท) ได้ปริมาณเน็ต (Data) ค่อนข้างเยอะ และคุมงบได้เด็ดขาดเพราะถ้าเน็ตหมดก็แค่เติมเงิน ข้อเสียคือต้องเปลี่ยนซิมการ์ด ทำให้ไม่สามารถรับสายหรือรับ SMS OTP จากเบอร์เดิมได้ (เว้นแต่เป็นสมาร์ทโฟน 2 ซิม)\n2. แพ็กเกจ Data Roaming เหมาจ่าย: คือการสมัครแพ็กเกจเสริมเข้ากับเบอร์เดิม ข้อดีคือไม่ต้องถอดซิม รับสายและรับ OTP แบงก์ได้ตามปกติ สะดวกสบายโดยเฉพาะนักธุรกิจ ข้อเสียคือราคาเฉลี่ยต่อวันแพงกว่า (ประมาณ 300-500 บาทต่อวัน) และหากมีคนโทรเข้าเบอร์เดิมขณะอยู่ต่างประเทศ คุณจะเสียค่ารับสาย (Roaming Receive Call Rate) ด้วย ซึ่งอาจสูงถึงนาทีละ 30-50 บาท\n\nปัจจุบัน เทคโนโลยี eSIM กำลังได้รับความนิยม เพราะสามารถโหลดแพ็กเกจของต่างประเทศมาฝังในเครื่องได้เลย โดยยังคงเปิดเบอร์หลักทิ้งไว้เพื่อรับ SMS ได้โดยไม่เสียค่าใช้จ่าย (การรับ SMS ทั่วโลกฟรีเสมอ)":"The main differences are cost and convenience:\n1. Travel SIM (or Local SIM): A new prepaid SIM card. Pros: Extremely cost-effective (e.g., ~$12 for 8 days in Asia) with large data allowances. Cons: You must swap out your SIM, meaning you cannot receive calls or SMS OTPs to your regular number unless you have a dual-SIM phone.\n2. Daily Roaming Package: Applied to your existing home number. Pros: No need to swap SIMs, you can receive business calls and bank OTPs. Cons: More expensive daily rates (~$10/day). Also, receiving phone calls while roaming incurs high inbound call charges (Receiving calls is not free abroad!).\neSIM technology is currently the best of both worlds, allowing you to download a cheap foreign data plan while keeping your home line active just to receive free SMS OTPs."} 
        />
        <FAQItem 
          q={lang==="TH"?"การเปิดโหมดเครื่องบิน (Airplane Mode) และใช้ Wi-Fi ป้องกันค่าใช้จ่ายโรมมิ่งได้ 100% หรือไม่?":"Does using Airplane Mode + Wi-Fi guarantee 100% protection against roaming charges?"} 
          a={lang==="TH"?"ได้ 100% ครับ ตามหลักมาตรฐานของสมาร์ทโฟน (iOS และ Android) เมื่อเปิดโหมดเครื่องบิน (Airplane Mode) ตัวเครื่องจะตัดสัญญาณคลื่นวิทยุเครือข่ายมือถือ (Cellular Radio) ทั้งหมดออก ทำให้โทรศัพท์ของคุณไม่สามารถเชื่อมต่อกับเสาสัญญาณในต่างประเทศได้เลย จึงไม่มีการคิดค่าบริการโรมมิ่งใดๆ เกิดขึ้นอย่างแน่นอน \n\nหลังจากเปิดโหมดเครื่องบินแล้ว คุณสามารถเปิดสัญญาณ Wi-Fi แบบแยกต่างหากเพื่อเชื่อมต่ออินเทอร์เน็ตของโรงแรมหรือสนามบินได้ตามปกติ นอกจากนี้ หากเครือข่ายของคุณรองรับเทคโนโลยี VoWiFi (Voice over Wi-Fi) คุณจะสามารถโทรออกและรับสายผ่านเครือข่าย Wi-Fi โดยคิดค่าบริการเสมือนคุณอยู่ในประเทศไทย (ไม่เสียค่าโรมมิ่ง) ซึ่งเป็นทางเลือกที่ประหยัดและฉลาดที่สุดสำหรับการติดต่อธุรกิจขณะเดินทาง":"Yes, 100% guaranteed. By design in iOS and Android, turning on Airplane Mode disables the cellular radio transmitter completely. Your phone physically cannot connect to any foreign cell towers, meaning zero roaming data or voice charges can occur.\nOnce in Airplane Mode, you can manually re-enable Wi-Fi to use hotel or airport networks. Additionally, if your carrier supports VoWiFi (Voice over Wi-Fi or Wi-Fi Calling), you can make and receive regular phone calls over the Wi-Fi connection, and they will be billed at standard domestic rates as if you never left your home country. This is the smartest way to manage communication costs abroad."} 
        />
        <FAQItem 
          q={lang==="TH"?"ทำไมรับสายโทรศัพท์ตอนอยู่ต่างประเทศถึงเสียเงิน? (การโทรข้ามแดน)":"Why do I have to pay to answer a phone call when I am abroad?"} 
          a={lang==="TH"?"นี่เป็นความเข้าใจผิดที่พบบ่อยที่สุดของผู้เดินทาง! ในประเทศไทย การรับสายฟรีเสมอ แต่ในระบบโรมมิ่งต่างประเทศ การรับสายจะถูกคิดค่าบริการในฝั่งผู้รับด้วย สาเหตุเพราะเมื่อมีคนโทรหาคุณจากประเทศไทย เครือข่ายต้นทางจะส่งสัญญาณไปที่เครือข่ายปลายทางในต่างประเทศเพื่อค้นหาว่าคุณอยู่ที่ไหน ค่าใช้จ่ายส่วนต่างในการเชื่อมต่อสัญญาณข้ามทวีป (International Routing) เครือข่ายต่างประเทศจะมาเรียกเก็บจากคุณ (ผู้รับสาย) แทนที่จะเก็บจากผู้โทร \n\nอัตราค่ารับสายโรมมิ่งอาจแตกต่างกันไปตั้งแต่ 15 บาท จนถึง 100 บาทต่อนาที ขึ้นอยู่กับโซนทวีป (โซนอเมริกาและยุโรปมักแพงกว่าเอเชีย) ดังนั้น หากคุณมีคนโทรมาและคุณกดรับสายเพื่อคุยเพียง 5 นาที คุณอาจต้องเสียเงินถึง 500 บาท ทางออกที่ดีที่สุดคือ ปล่อยให้สายตัดไป หรือใช้งานผ่านแอปพลิเคชันโทรฟรีผ่านอินเทอร์เน็ต เช่น LINE, WhatsApp หรือ FaceTime Audio แทน":"This is a very common trap! In many countries, receiving a call is free. But while roaming internationally, the receiver pays a heavy fee. When someone calls your home number, the call is routed internationally to the foreign network where you are currently located. The foreign network charges your home network an International Routing fee, which is then passed directly onto you (the receiver), not the caller.\nReceiving calls can cost anywhere from $0.50 to $3.00 per minute depending on the region. A quick 5-minute call could cost you $15. The best practice is to ignore incoming regular calls and use VoIP internet calls like WhatsApp, LINE, or FaceTime Audio over a Wi-Fi or Travel SIM data connection instead."} 
        />
        </SEOFAQ>
      </div>
    </div>
  );
}
