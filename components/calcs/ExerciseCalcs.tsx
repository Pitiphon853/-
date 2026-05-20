"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, RelatedCalcs } from "./shared";
import { Activity, Droplets, Bike, Timer, Dumbbell, Ship, Apple } from "lucide-react";

// ---------------------------------------------------------
// 1. VO2 Max Calculator
// ---------------------------------------------------------
export function VO2MaxCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [age, setAge] = useLocalState("vo2-age", "30");
  const [gender, setGender] = useLocalState("vo2-gender", "male");
  const [restingHR, setRestingHR] = useLocalState("vo2-rhr", "60");
  const [maxHR, setMaxHR] = useLocalState("vo2-mhr", "190");

  const calcVO2 = () => {
    const rhr = Number(restingHR);
    const mhr = Number(maxHR);
    if (!rhr || !mhr) return 0;
    // Uth-Sørensen-Overgaard-Pedersen estimation: VO2max = 15.3 x (MHR / RHR)
    return 15.3 * (mhr / rhr);
  };

  const vo2 = calcVO2();
  
  const getRating = (v: number) => {
    if (v === 0) return "-";
    if (gender === "male") {
      if (v > 55) return lang==="TH"?"ยอดเยี่ยม (Excellent)":"Excellent";
      if (v > 45) return lang==="TH"?"ดี (Good)":"Good";
      if (v > 35) return lang==="TH"?"ปานกลาง (Average)":"Average";
      return lang==="TH"?"ควรปรับปรุง (Poor)":"Poor";
    } else {
      if (v > 50) return lang==="TH"?"ยอดเยี่ยม (Excellent)":"Excellent";
      if (v > 40) return lang==="TH"?"ดี (Good)":"Good";
      if (v > 30) return lang==="TH"?"ปานกลาง (Average)":"Average";
      return lang==="TH"?"ควรปรับปรุง (Poor)":"Poor";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณ VO2 Max" : "VO2 Max Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ประเมินความฟิตของหัวใจและปอดด้วยอัตราการเต้นของหัวใจ" : "Estimate cardiovascular fitness using heart rate."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุ (ปี)" : "Age (years)"}</label>
            <input type="number" value={age} onChange={e=>setAge(e.target.value)} className={inputClass} placeholder="30" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className={inputClass}>
              <option value="male">{lang === "TH" ? "ชาย" : "Male"}</option>
              <option value="female">{lang === "TH" ? "หญิง" : "Female"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราการเต้นหัวใจขณะพัก (Resting HR)" : "Resting HR (bpm)"}</label>
            <input type="number" value={restingHR} onChange={e=>setRestingHR(e.target.value)} className={inputClass} placeholder="60" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราการเต้นหัวใจสูงสุด (Max HR)" : "Max HR (bpm)"}</label>
            <input type="number" value={maxHR} onChange={e=>setMaxHR(e.target.value)} className={inputClass} placeholder="190" />
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl text-center border border-red-100 dark:border-red-800">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">{lang === "TH" ? "ค่า VO2 Max ของคุณโดยประมาณ" : "Estimated VO2 Max"}</h3>
        <div className="text-6xl font-black text-red-600 dark:text-red-400 mb-4">
          {vo2.toFixed(1)} <span className="text-2xl font-normal">ml/kg/min</span>
        </div>
        <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
          {lang === "TH" ? "ระดับความฟิต:" : "Fitness Level:"} <span className="text-red-600">{getRating(vo2)}</span>
        </p>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (VO2 Max)" : "VO2 Max FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "VO2 Max คืออะไร ทำไมถึงสำคัญต่อสุขภาพและการออกกำลังกาย?" : "What is VO2 Max?"} 
          a={lang === "TH" ? 
`VO2 Max (Maximum Volume of Oxygen) คือ ค่าที่บ่งบอกถึงปริมาณออกซิเจนสูงสุดที่ร่างกายสามารถนำไปใช้ได้ในระยะเวลา 1 นาที ต่อน้ำหนักตัว 1 กิโลกรัม ในขณะที่เรากำลังออกกำลังกายอย่างหนักที่สุด ค่านี้ถือเป็นตัวชี้วัดที่ได้รับการยอมรับทางการแพทย์และวิทยาศาสตร์การกีฬาว่าเป็น "มาตรฐานทองคำ (Gold Standard)" ในการประเมินความฟิตของระบบหัวใจและหลอดเลือด (Cardiovascular Fitness) 

เมื่อคุณมีค่า VO2 Max ที่สูง หมายความว่าหัวใจ ปอด และระบบไหลเวียนโลหิตของคุณสามารถสูบฉีดออกซิเจนไปยังกล้ามเนื้อที่กำลังทำงานได้อย่างมีประสิทธิภาพ กล้ามเนื้อก็สามารถใช้ออกซิเจนเหล่านั้นในการสร้างพลังงาน (ATP) ได้มากขึ้น ทำให้คุณสามารถวิ่ง ปั่นจักรยาน หรือทำกิจกรรมที่ต้องใช้ความทนทานได้นานขึ้นและเหนื่อยช้าลง 

นอกจากนี้ งานวิจัยทางการแพทย์หลายฉบับยังระบุว่า ผู้ที่มีค่า VO2 Max ในเกณฑ์ที่ดีถึงยอดเยี่ยม จะมีอัตราความเสี่ยงในการเกิดโรคหัวใจ โรคหลอดเลือดสมอง และโรคเบาหวานชนิดที่ 2 ต่ำกว่าผู้ที่มีค่าต่ำอย่างมีนัยสำคัญ ค่าเฉลี่ยของคนทั่วไปจะอยู่ที่ประมาณ 30-40 ml/kg/min ในขณะที่นักกีฬาระดับโลกอาจมีค่าสูงถึง 70-90 ml/kg/min ดังนั้นการฝึกฝนเพื่อเพิ่ม VO2 Max จึงไม่ได้มีประโยชน์แค่ในเรื่องกีฬา แต่ยังเป็นเครื่องรับประกันสุขภาพในระยะยาวของคุณด้วย

อ้างอิง:
- Uth, N., Sørensen, H., Overgaard, K., & Pedersen, P. K. (2004). Estimation of VO2max from the ratio between HRmax and HRrest. European Journal of Applied Physiology.
- American College of Sports Medicine (ACSM).` 
          : "VO2 Max measures cardiovascular fitness..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "เราสามารถเพิ่มค่า VO2 Max ได้อย่างไรบ้าง มีวิธีฝึกที่แนะนำหรือไม่?" : "How to improve VO2 Max?"} 
          a={lang === "TH" ? 
`การเพิ่มค่า VO2 Max สามารถทำได้ผ่านการออกกำลังกายที่เน้นการกระตุ้นระบบหัวใจและปอด โดยวิธีที่มีประสิทธิภาพสูงสุดและได้รับการรับรองจากวิทยาศาสตร์การกีฬาคือ การฝึกแบบ HIIT (High-Intensity Interval Training) และการวิ่งแบบ Tempo หรือ Threshold

**วิธีการฝึกเพื่อเพิ่ม VO2 Max:**
1. **HIIT (Interval Training):** คือการออกกำลังกายสลับความหนัก โดยให้หัวใจเต้นในระดับ 90-100% ของ Max HR เป็นเวลาสั้นๆ (เช่น 1-3 นาที) สลับกับการพักหรือทำกิจกรรมเบาๆ (เช่น เดิน) ในเวลาที่เท่าๆ กัน ทำซ้ำ 4-6 รอบ การฝึกแบบนี้จะบังคับให้ร่างกายต้องดึงออกซิเจนมาใช้ในระดับสูงสุด ทำให้ร่างกายเกิดการปรับตัว (Adaptation) และขยายความจุของปอดและหัวใจ
2. **Tempo Run (การวิ่งรักษาความเร็ว):** คือการวิ่งในความเร็วที่คุณรู้สึกว่า "เหนื่อยแต่ทนได้" (ประมาณ 80-85% ของ Max HR) เป็นเวลาต่อเนื่อง 20-40 นาที โดยไม่หยุดพัก การฝึกแบบนี้จะช่วยเพิ่มระดับ Lactate Threshold ซึ่งมีความสัมพันธ์โดยตรงกับ VO2 Max ทำให้คุณสามารถคงความเร็วสูงได้นานขึ้น
3. **Zone 2 Training (การฝึกความทนทานพื้นฐาน):** แม้การฝึก Zone 2 (60-70% ของ Max HR) จะไม่ได้กระตุ้น VO2 Max โดยตรงเหมือน HIIT แต่มันช่วยสร้าง "ฐาน" ที่แข็งแกร่ง ทำให้ไมโตคอนเดรีย (โรงงานสร้างพลังงานในเซลล์) เพิ่มจำนวนขึ้น ซึ่งจำเป็นอย่างยิ่งในการรองรับการฝึกหนักในวันอื่นๆ

**ข้อควรระวัง:** การฝึก VO2 Max เป็นการฝึกที่หนักและสร้างภาระให้ร่างกายสูงมาก ไม่ควรทำเกิน 1-2 ครั้งต่อสัปดาห์ และควรมีวันพักฟื้นที่เพียงพอเพื่อให้ร่างกายได้ซ่อมแซมและพัฒนาตัวเอง

อ้างอิง:
- Midgley, A. W., McNaughton, L. R., & Wilkinson, M. (2006). Is there an optimal training intensity for enhancing the maximal oxygen uptake of distance runners? Sports Medicine.` 
          : "HIIT and endurance training..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "อัตราการเต้นของหัวใจขณะพัก (Resting HR) สัมพันธ์กับ VO2 Max อย่างไร?" : "How does Resting HR relate to VO2 Max?"} 
          a={lang === "TH" ? 
`อัตราการเต้นของหัวใจขณะพัก (Resting Heart Rate - RHR) มีความสัมพันธ์ผกผันกับความฟิตของร่างกายและค่า VO2 Max อย่างชัดเจน กล่าวคือ ยิ่งคุณฟิตมากเท่าไหร่ หัวใจของคุณก็จะยิ่งมีประสิทธิภาพมากขึ้นในการสูบฉีดเลือดต่อการเต้นหนึ่งครั้ง (Stroke Volume) ทำให้หัวใจไม่ต้องเต้นเร็วก็สามารถส่งเลือดไปหล่อเลี้ยงทั่วร่างกายได้เพียงพอในขณะพัก

ในสูตรของ Uth-Sørensen-Overgaard-Pedersen ที่เราใช้ในเครื่องมือคำนวณนี้ (VO2max = 15.3 x (Max HR / Resting HR)) จะเห็นได้ชัดเจนว่า ค่า Resting HR เป็นตัวหาร ยิ่งค่า RHR ของคุณต่ำลง (เช่น จาก 70 bpm ลดลงเหลือ 50 bpm) จะทำให้สัดส่วนระหว่างอัตราเต้นหัวใจสูงสุดและขณะพักกว้างขึ้น ซึ่งเป็นตัวชี้วัดสำคัญของความจุและขีดจำกัดสูงสุดของระบบไหลเวียนโลหิต

คนทั่วไปที่ไม่ได้ออกกำลังกายอาจมี RHR อยู่ที่ 70-80 ครั้งต่อนาที แต่สำหรับนักกีฬาความทนทาน (Endurance Athletes) เช่น นักวิ่งมาราธอน หรือนักปั่นจักรยาน อาจมี RHR ต่ำถึง 40-50 ครั้งต่อนาที การวัด RHR ที่แม่นยำที่สุดควรวัดในตอนเช้าทันทีที่ตื่นนอนก่อนลุกจากเตียง หากคุณพบว่า RHR ของคุณค่อยๆ ลดลงในช่วงหลายเดือนที่ผ่านมา นั่นเป็นสัญญาณที่ดีเยี่ยมว่าร่างกายของคุณฟิตขึ้นและ VO2 Max ของคุณกำลังเพิ่มสูงขึ้นครับ

อ้างอิง:
- Uth, N. et al. (2004). European Journal of Applied Physiology.` 
          : "Lower RHR means better fitness..."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 2. Swim Pace Calculator
// ---------------------------------------------------------
export function SwimPaceCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [distance, setDistance] = useLocalState("swim-dist", "1500");
  const [min, setMin] = useLocalState("swim-min", "30");
  const [sec, setSec] = useLocalState("swim-sec", "0");

  const calcPace = () => {
    const d = Number(distance);
    const m = Number(min) || 0;
    const s = Number(sec) || 0;
    if (d <= 0 || (m === 0 && s === 0)) return { pace100m: "0:00", pace50m: "0:00", speed: 0 };

    const totalSeconds = (m * 60) + s;
    const secPerMeter = totalSeconds / d;
    
    // Pace per 100m
    const pace100 = secPerMeter * 100;
    const p100M = Math.floor(pace100 / 60);
    const p100S = Math.floor(pace100 % 60);

    // Pace per 50m
    const pace50 = secPerMeter * 50;
    const p50M = Math.floor(pace50 / 60);
    const p50S = Math.floor(pace50 % 60);

    // Speed km/h
    const speedKmh = (d / 1000) / (totalSeconds / 3600);

    return {
      pace100m: `${p100M}:${p100S.toString().padStart(2, '0')}`,
      pace50m: `${p50M}:${p50S.toString().padStart(2, '0')}`,
      speed: speedKmh.toFixed(2)
    };
  };

  const res = calcPace();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 mb-4">
          <Droplets className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณ Swim Pace (เพซว่ายน้ำ)" : "Swim Pace Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณเวลาที่ใช้ต่อ 100 เมตรสำหรับนักว่ายน้ำและไตรกีฬา" : "Calculate your swimming pace per 100m."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะทาง (เมตร)" : "Distance (meters)"}</label>
            <input type="number" value={distance} onChange={e=>setDistance(e.target.value)} className={inputClass} placeholder="1500" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (นาที)" : "Time (Minutes)"}</label>
            <input type="number" value={min} onChange={e=>setMin(e.target.value)} className={inputClass} placeholder="30" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (วินาที)" : "Time (Seconds)"}</label>
            <input type="number" value={sec} onChange={e=>setSec(e.target.value)} className={inputClass} placeholder="0" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl text-center border border-cyan-100 dark:border-cyan-800">
          <p className="text-cyan-800 dark:text-cyan-200 text-sm mb-1">{lang === "TH" ? "Pace ต่อ 100 เมตร" : "Pace per 100m"}</p>
          <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{res.pace100m}</p>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl text-center border border-cyan-100 dark:border-cyan-800">
          <p className="text-cyan-800 dark:text-cyan-200 text-sm mb-1">{lang === "TH" ? "Pace ต่อ 50 เมตร" : "Pace per 50m"}</p>
          <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{res.pace50m}</p>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl text-center border border-cyan-100 dark:border-cyan-800">
          <p className="text-cyan-800 dark:text-cyan-200 text-sm mb-1">{lang === "TH" ? "ความเร็ว (กม./ชม.)" : "Speed (km/h)"}</p>
          <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{res.speed}</p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Swim Pace)" : "Swim Pace FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Swim Pace คืออะไร และทำไมถึงสำคัญสำหรับนักว่ายน้ำและไตรกีฬา?" : "What is Swim Pace?"} 
          a={lang === "TH" ? 
`Swim Pace หรือ เพซว่ายน้ำ คือหน่วยวัดความเร็วในการว่ายน้ำ โดยทั่วไปในระดับสากลและกีฬาไตรกีฬา (Triathlon) จะใช้หน่วยวัดเป็น "เวลาที่ใช้ในการว่ายครบ 100 เมตร (นาที:วินาที / 100m)" 

ความสำคัญของ Swim Pace ไม่ต่างจากความสำคัญของ Pace ในการวิ่ง เพราะมันเป็นตัวชี้วัดประสิทธิภาพ (Efficiency) และเป็นเกณฑ์ในการวางแผนการฝึกซ้อมและการแข่งขัน หากคุณไม่ทราบ Pace ของตนเอง คุณอาจจะว่ายเร็วเกินไปในช่วงต้นของการแข่งขัน ทำให้ร่างกายสะสมกรดแลคติก (Lactic Acid) เร็วเกินไปจนหมดแรงในช่วงท้าย หรือว่ายช้าเกินไปจนทำเวลาไม่ได้ตามเป้าหมาย

สำหรับนักไตรกีฬา การรู้ Swim Pace จะช่วยในการวางแผนว่าต้องใช้เวลาในน้ำเท่าไหร่ เพื่อเผื่อแรงไว้สำหรับการปั่นจักรยานและการวิ่งต่อไป นอกจากนี้ การติดตาม Swim Pace อย่างต่อเนื่องในแต่ละเดือน จะช่วยบอกได้ว่าตารางการฝึกซ้อมของคุณได้ผลหรือไม่ เทคนิคการจับน้ำ (Catch) และการดึงน้ำ (Pull) ของคุณดีขึ้นหรือเปล่า เพราะในน้ำ ทักษะและท่าทาง (Technique) มีผลต่อความเร็วมากกว่าความแข็งแรงของกล้ามเนื้อเพียงอย่างเดียว

อ้างอิง:
- FINA (Fédération Internationale de Natation) Standards.
- USA Triathlon Training Guidelines.` 
          : "Swim pace is time per 100m..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "สถิติ Swim Pace ที่ดีควรอยู่ที่เท่าไหร่ แบ่งตามระดับความสามารถอย่างไร?" : "What is a good Swim Pace?"} 
          a={lang === "TH" ? 
`สถิติ Swim Pace จะแตกต่างกันอย่างมากตามความคุ้นเคยกับน้ำ เทคนิค และระดับความฟิต แต่โดยทั่วไปสำหรับระยะทางต่อเนื่อง (เช่น 1,000 - 1,500 เมตร) สามารถแบ่งเกณฑ์คร่าวๆ สำหรับนักว่ายน้ำสระและนักไตรกีฬามือสมัครเล่นได้ดังนี้:

1. **ระดับผู้เริ่มต้น (Beginner):** 2:15 - 2:45 นาที/100m (มักจะมีปัญหาเรื่องการหายใจและท่าทางที่ยังต้านน้ำ)
2. **ระดับปานกลาง (Intermediate):** 1:45 - 2:15 นาที/100m (สามารถว่ายได้ต่อเนื่อง ท่าทางเริ่มไหลลื่น แต่ยังไม่สามารถรักษาความเร็วได้นาน)
3. **ระดับสูง (Advanced / Age-grouper ไตรกีฬา):** 1:25 - 1:45 นาที/100m (มีเทคนิคการดึงน้ำที่ดี การจัดระเบียบร่างกายในน้ำดีเยี่ยม)
4. **ระดับโปร / นักกีฬาแข่งขัน (Elite):** ต่ำกว่า 1:20 นาที/100m (ระดับนักกีฬาโอลิมปิกบางคนว่ายระยะไกลด้วยเพซต่ำกว่า 1:00 นาที/100m)

หากคุณเพิ่งเริ่มว่ายน้ำ อย่าเพิ่งท้อกับเวลาของตนเอง สิ่งสำคัญคือการโฟกัสไปที่เทคนิค (Technique) เช่น การรักษาระนาบลำตัวให้ขนานกับผิวน้ำเพื่อลดแรงต้าน (Drag) การเตะขาให้แคบและมีประสิทธิภาพ และการหายใจให้ถูกจังหวะ เมื่อเทคนิคดีขึ้น Pace ของคุณจะลดลงอย่างเห็นได้ชัดโดยแทบไม่ต้องออกแรงเพิ่มขึ้นเลย

อ้างอิง:
- Swim Smooth: The Complete Coaching System for Swimmers and Triathletes.` 
          : "Depends on level, usually 1:30 - 2:30 per 100m."} 
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีคำนวณ Swim Pace มีสูตรอย่างไร และเครื่องมือนี้ช่วยอะไรได้บ้าง?" : "How is it calculated?"} 
          a={lang === "TH" ? 
`การคำนวณ Swim Pace มีสูตรทางคณิตศาสตร์ที่เรียบง่าย แต่การคิดด้วยมือหรือเครื่องคิดเลขปกติอาจจะยุ่งยากเนื่องจากเวลาถูกนับเป็นฐาน 60 (นาทีและวินาที) 

**สูตรการคำนวณ:**
1. แปลงเวลาทั้งหมดที่ใช้ให้เป็น "วินาที" (เช่น 30 นาที 15 วินาที = (30 x 60) + 15 = 1,815 วินาที)
2. หาเวลาที่ใช้ต่อ 1 เมตร โดยนำ วินาทีรวม ÷ ระยะทางรวม (เช่น 1,815 ÷ 1,500 = 1.21 วินาที/เมตร)
3. คูณด้วย 100 เพื่อหาเวลาต่อ 100 เมตร (1.21 x 100 = 121 วินาที)
4. แปลงกลับเป็น นาที:วินาที (121 ÷ 60 = 2 นาที เหลือเศษ 1 วินาที = Pace 2:01 / 100m)

เครื่องมือของเราช่วยให้คุณไม่ต้องปวดหัวกับการแปลงฐานตัวเลขเหล่านี้ เพียงแค่กรอกระยะทางที่ว่ายได้ (เช่น ความยาวสระมาตรฐาน 50 เมตร ว่าย 30 รอบ = 1500 เมตร) และระยะเวลาที่ใช้ ระบบจะคำนวณ Pace ต่อ 100 เมตร, Pace ต่อ 50 เมตร (สำหรับการฝึกซ้อมสระสั้น) และแปลงเป็นความเร็วกิโลเมตรต่อชั่วโมงให้ทันที สะดวกต่อการนำไปเขียนลงตารางซ้อม หรือคำนวณเวลา cut-off ในงานแข่งขันไตรกีฬาครับ` 
          : "Formula converts total seconds to distance..."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 3. Cycling Power Zones Calculator
// ---------------------------------------------------------
export function CyclingPowerZones({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [ftp, setFtp] = useLocalState("cycle-ftp", "200");

  const calcZones = () => {
    const f = Number(ftp) || 0;
    return [
      { z: "Zone 1", name: lang==="TH"?"Active Recovery":"Active Recovery", desc: lang==="TH"?"ปั่นเบา ฟื้นฟูร่างกาย":"Easy spinning", range: `< ${Math.round(f * 0.55)}W`, percent: "< 55%" },
      { z: "Zone 2", name: lang==="TH"?"Endurance":"Endurance", desc: lang==="TH"?"ปั่นทนทาน สร้างพื้นฐาน":"All-day pace", range: `${Math.round(f * 0.56)} - ${Math.round(f * 0.75)}W`, percent: "56-75%" },
      { z: "Zone 3", name: lang==="TH"?"Tempo":"Tempo", desc: lang==="TH"?"จังหวะเร็ว คงที่":"Brisk pace", range: `${Math.round(f * 0.76)} - ${Math.round(f * 0.90)}W`, percent: "76-90%" },
      { z: "Zone 4", name: lang==="TH"?"Lactate Threshold":"Threshold", desc: lang==="TH"?"ปั่นหนักระดับ FTP":"FTP level", range: `${Math.round(f * 0.91)} - ${Math.round(f * 1.05)}W`, percent: "91-105%" },
      { z: "Zone 5", name: lang==="TH"?"VO2 Max":"VO2 Max", desc: lang==="TH"?"หนักมาก ระยะสั้น":"High intensity", range: `${Math.round(f * 1.06)} - ${Math.round(f * 1.20)}W`, percent: "106-120%" },
      { z: "Zone 6", name: lang==="TH"?"Anaerobic Capacity":"Anaerobic", desc: lang==="TH"?"สปรินต์ช่วงสั้น":"Short sprints", range: `${Math.round(f * 1.21)} - ${Math.round(f * 1.50)}W`, percent: "121-150%" },
      { z: "Zone 7", name: lang==="TH"?"Neuromuscular Power":"Neuromuscular", desc: lang==="TH"?"ระเบิดพลังสูงสุด":"Max effort", range: `> ${Math.round(f * 1.50)}W`, percent: "> 150%" },
    ];
  };

  const zones = calcZones();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
          <Bike className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณโซนปั่นจักรยาน (Cycling Power Zones)" : "Cycling Power Zones"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "หาช่วงวัตต์ในการฝึกซ้อมทั้ง 7 โซนจากค่า FTP ของคุณ (Coggan Power Zones)" : "Calculate your 7 power zones based on your FTP."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <label className={labelClass}>{lang === "TH" ? "ค่า FTP ของคุณ (วัตต์)" : "Your FTP (Watts)"}</label>
        <div className="relative">
          <input type="number" value={ftp} onChange={e=>setFtp(e.target.value)} className={`${inputClass} text-xl font-bold text-center pl-10 pr-10`} placeholder="200" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">W</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-medium">{lang === "TH" ? "โซน" : "Zone"}</th>
                <th className="p-4 font-medium">{lang === "TH" ? "ชื่อโซน" : "Name"}</th>
                <th className="p-4 font-medium">% FTP</th>
                <th className="p-4 font-medium text-right">{lang === "TH" ? "เป้าหมาย (วัตต์)" : "Target (W)"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {zones.map((z, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="p-4 font-bold text-orange-500">{z.z}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{z.name}</div>
                    <div className="text-xs text-gray-500">{z.desc}</div>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{z.percent}</td>
                  <td className="p-4 text-right font-bold text-lg text-gray-900 dark:text-white">{z.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Power Zones)" : "Power Zones FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "FTP คืออะไร ทำไมการปั่นจักรยานถึงต้องอิงจากค่านี้?" : "What is FTP?"} 
          a={lang === "TH" ? 
`FTP หรือ Functional Threshold Power คือ พลังงานสูงสุด (หน่วยเป็นวัตต์ - Watts) ที่คุณสามารถรักษาไว้ได้อย่างต่อเนื่องเป็นเวลา 1 ชั่วโมงเต็มโดยที่ไม่หมดแรงไปเสียก่อน (Lactate steady state) ค่านี้ถูกคิดค้นและพัฒนาโดย Dr. Andrew Coggan และถือเป็นเกณฑ์มาตรฐานระดับโลกในการวัดความสามารถและแบ่งโซนการฝึกซ้อมของนักปั่นจักรยาน

ในการฝึกซ้อมจักรยานสมัยใหม่ การใช้แค่เครื่องวัดอัตราการเต้นของหัวใจ (Heart Rate Monitor) เพียงอย่างเดียวอาจไม่เพียงพอ เพราะอัตราหัวใจจะมีการดีเลย์ (Lag) ปรับตัวช้ากว่าการออกแรงจริง และสามารถถูกรบกวนได้ง่ายจากปัจจัยภายนอก เช่น อากาศร้อน ความเครียด หรือการดื่มกาแฟ ในขณะที่ "วัตต์ (Power)" คือแรงบิดที่กดลงบนลูกบันไดจริงๆ มันตอบสนองทันทีและไม่โกหก การรู้ค่า FTP จึงช่วยให้สามารถกำหนดโซนการฝึกทั้ง 7 โซนได้อย่างแม่นยำ 100% เพื่อให้ร่างกายพัฒนาได้ตรงจุด ไม่ว่าจะเพื่อเผาผลาญไขมัน สร้างความอึด หรือเพิ่มพลังสปรินต์

อ้างอิง:
- Coggan, A. R. (2003). Training and racing with a power meter.
- Allen, H., & Coggan, A. (2010). Training and Racing with a Power Meter (2nd ed.).` 
          : "Functional Threshold Power..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "หลักการฝึกทั้ง 7 โซนของ Coggan (Coggan Power Zones) มีรายละเอียดและประโยชน์อย่างไร?" : "What are the 7 Coggan Power Zones?"} 
          a={lang === "TH" ? 
`ระบบ Power Zones ของ Dr. Andrew Coggan แบ่งการออกแรงออกเป็น 7 ระดับ โดยคำนวณเป็นเปอร์เซ็นต์จากค่า FTP ของคุณ ดังนี้:

1. **Zone 1: Active Recovery (< 55% FTP)** - โซนฟื้นฟูร่างกาย ปั่นเบาๆ แทบไม่ต้องออกแรง ใช้สำหรับวันที่ต้องการพัก หรือคูลดาวน์ ช่วยให้เลือดหมุนเวียนเอาของเสียออกจากกล้ามเนื้อ
2. **Zone 2: Endurance (56-75% FTP)** - โซนสร้างพื้นฐาน เป็นโซนที่ควรใช้เวลาฝึกซ้อมมากที่สุด (ประมาณ 70-80% ของเวลาฝึกทั้งหมด) ช่วยสอนให้ร่างกายดึงไขมันมาใช้เป็นพลังงาน สร้างไมโตคอนเดรีย และเพิ่มความอดทน สามารถปั่นต่อเนื่องได้หลายชั่วโมง
3. **Zone 3: Tempo (76-90% FTP)** - โซนความเร็วปานกลาง รู้สึกเหนื่อยแต่ยังพอรักษาจังหวะได้ต่อเนื่อง 1-2 ชั่วโมง ช่วยสร้างความแข็งแกร่งของกล้ามเนื้อ
4. **Zone 4: Lactate Threshold (91-105% FTP)** - โซนจุดชนวนความเหนื่อยล้า (ปั่นใกล้เคียงค่า FTP) หายใจหอบลึก พูดได้เป็นคำๆ ใช้ฝึกเป็นเซ็ต เช่น 2x20 นาที เพื่อยกระดับค่า FTP ให้สูงขึ้น
5. **Zone 5: VO2 Max (106-120% FTP)** - โซนหนักมาก อยู่เหนือจุด FTP ใช้ฝึกเป็นช่วงสั้นๆ (3-8 นาที) เพื่อเพิ่มปริมาณการใช้ออกซิเจนสูงสุด
6. **Zone 6: Anaerobic Capacity (121-150% FTP)** - โซนระเบิดพลังระยะสั้น (30 วินาที - 3 นาที) ใช้พลังงานแบบไม่ใช้ออกซิเจน ใช้หนีกลุ่มหรือขึ้นเนินชัน
7. **Zone 7: Neuromuscular Power (> 150% FTP)** - โซนสปรินต์สูงสุด (Max effort) ออกแรงสุดตัวในเวลาไม่เกิน 15 วินาที ใช้สำหรับการสปรินต์หน้าเส้นชัย

การฝึกซ้อมที่ดีควรมีการผสมผสานโซนต่างๆ ลงในตารางซ้อมรายสัปดาห์ (Periodization) เพื่อการพัฒนาที่สมดุลและป้องกันอาการบาดเจ็บหรือภาวะ Overtraining` 
          : "Seven zones range from recovery to max sprint..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ฉันจะหาค่า FTP ของตัวเองได้อย่างไร?" : "How do I find my FTP?"} 
          a={lang === "TH" ? 
`การหาค่า FTP ไม่จำเป็นต้องไปปั่นรวดเดียว 1 ชั่วโมงเต็ม (ซึ่งทรมานเกินไปสำหรับคนส่วนใหญ่) วิธีที่นักวิทยาศาสตร์การกีฬาและแอปพลิเคชันอย่าง Zwift, Garmin, หรือ TrainerRoad นิยมใช้คือ "FTP Test แบบ 20 นาที" 

**ขั้นตอนการทำ 20-Minute FTP Test:**
1. **วอร์มอัพ (Warm-up):** ปั่นเบาๆ 10-15 นาทีใน Zone 1-2
2. **กระตุ้นหัวใจ (Clearout):** สปรินต์หนักๆ 1 นาที แล้วพัก 1 นาที ทำซ้ำ 3 รอบ เพื่อเตรียมความพร้อมของกล้ามเนื้อและระบบหายใจ
3. **ปั่นพัก (Rest):** ปั่นเบาๆ 5 นาที
4. **ทดสอบจริง (The 20-min Test):** ปั่นด้วยความหนักที่สุดที่คุณจะสามารถรักษาความเร็วได้คงที่ตลอด 20 นาที (พยายามกระจายแรงให้สม่ำเสมอ อย่าอัดเต็มที่ใน 5 นาทีแรกจนหมดแรง)
5. **คูลดาวน์ (Cool-down):** ปั่นเบาๆ 10-15 นาที

**การคำนวณผล:** นำค่าวัตต์เฉลี่ย (Average Power) ที่ทำได้ตลอดช่วง 20 นาที มาคูณด้วย 0.95 คุณจะได้ค่า FTP ของคุณ (ตัวอย่าง: ปั่น 20 นาที ได้ค่าเฉลี่ย 210 วัตต์ -> 210 x 0.95 = FTP 199.5 วัตต์) แนะนำให้ทำการทดสอบนี้ซ้ำทุกๆ 4-6 สัปดาห์เพื่อปรับปรุงโซนการฝึกซ้อมของคุณให้ทันกับความฟิตที่เพิ่มขึ้น` 
          : "Take a 20-minute test and multiply average watts by 0.95"} 
        />
      </SEOFAQ>
    </div>
  );
}
