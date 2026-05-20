"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { Timer, Dumbbell, Ship, Apple, TrendingUp } from "lucide-react";

// ---------------------------------------------------------
// 4. Race Predictor
// ---------------------------------------------------------
export function RacePredictor({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [distKm, setDistKm] = useLocalState("race-dist", "5");
  const [min, setMin] = useLocalState("race-min", "25");
  const [sec, setSec] = useLocalState("race-sec", "0");

  const predict = () => {
    const d = Number(distKm) || 0;
    const m = Number(min) || 0;
    const s = Number(sec) || 0;
    if (d <= 0 || (m === 0 && s === 0)) return [];

    const totalSeconds = (m * 60) + s;
    // Riegel's Formula: T2 = T1 x (D2/D1)^1.06
    const targets = [
      { name: "5K", km: 5 },
      { name: "10K", km: 10 },
      { name: "Half Marathon", km: 21.0975 },
      { name: "Marathon", km: 42.195 },
    ];

    return targets.map(t => {
      const predSec = totalSeconds * Math.pow((t.km / d), 1.06);
      const pm = Math.floor(predSec / 60);
      const ps = Math.floor(predSec % 60);
      return { ...t, time: `${Math.floor(pm/60)}:${(pm%60).toString().padStart(2,'0')}:${ps.toString().padStart(2,'0')}` };
    });
  };

  const results = predict();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ทำนายเวลาวิ่งแข่ง (Race Predictor)" : "Race Predictor"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ทำนายสถิติการวิ่งมาราธอน ฮาล์ฟ และระยะอื่นๆ จากสถิติล่าสุดของคุณ" : "Predict race times based on recent performance."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">{lang === "TH" ? "สถิติล่าสุดของคุณ (Recent Performance)" : "Recent Performance"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะทาง (กม.)" : "Distance (km)"}</label>
            <input type="number" value={distKm} onChange={e=>setDistKm(e.target.value)} className={inputClass} placeholder="5" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (นาที)" : "Minutes"}</label>
            <input type="number" value={min} onChange={e=>setMin(e.target.value)} className={inputClass} placeholder="25" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เวลา (วินาที)" : "Seconds"}</label>
            <input type="number" value={sec} onChange={e=>setSec(e.target.value)} className={inputClass} placeholder="0" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((r, i) => (
          <div key={i} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center border border-blue-100 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">{r.name}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{r.time}</p>
          </div>
        ))}
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Race Predictor)" : "Race Predictor FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Race Predictor ทำงานอย่างไร เชื่อถือได้แค่ไหน?" : "How does the Race Predictor work?"} 
          a={lang === "TH" ? 
`เครื่องมือคำนวณการทำนายเวลาวิ่ง (Race Predictor) ของเราใช้ **สูตรของ Peter Riegel (Riegel's Formula)** ซึ่งเป็นสมการคณิตศาสตร์ที่ได้รับการยอมรับและใช้กันอย่างแพร่หลายที่สุดในวงการนักวิ่งทั่วโลกมาตั้งแต่ปี 1977 สมการนี้ถูกตีพิมพ์ในนิตยสาร Runner's World และถูกนำไปใช้ในแอปพลิเคชันวิ่งระดับโลกมากมาย

**สูตรการคำนวณคือ: T2 = T1 x (D2 / D1)^1.06**
- T1 = เวลาจากสถิติที่คุณทำได้ (เช่น เวลาที่ใช้วิ่ง 5K)
- D1 = ระยะทางที่คุณทำสถิติได้ (เช่น 5 กิโลเมตร)
- D2 = ระยะทางที่คุณต้องการทำนาย (เช่น 21.1 กิโลเมตร สำหรับฮาล์ฟมาราธอน)
- T2 = เวลาที่ระบบทำนายว่าจะทำได้

**ความแม่นยำและความน่าเชื่อถือ:**
สูตรของ Riegel จะมีความแม่นยำสูงมากเมื่อระยะทางที่คุณนำมาอ้างอิง (D1) และระยะทางที่ต้องการทำนาย (D2) ไม่ห่างกันเกินไป เช่น การใช้สถิติ 10K เพื่อทำนาย Half Marathon (21.1K) จะแม่นยำกว่าการใช้สถิติ 5K ไปทำนาย Full Marathon (42.195K) ทั้งนี้ ตัวเลขที่ได้เป็นการสันนิษฐานว่าคุณได้ทำการ "ฝึกซ้อมมาอย่างเพียงพอ (Well-trained)" สำหรับระยะทางเป้าหมายนั้นๆ แล้ว หมายความว่าร่างกายของคุณมีความทนทาน (Endurance) มากพอที่จะรองรับระยะทางที่ไกลขึ้น ไม่ได้หมายความว่าคนที่ไม่เคยซ้อมวิ่งยาวเลยจะทำเวลาได้ตามที่คำนวณเป๊ะๆ เสมอไป

อ้างอิง:
- Riegel, P. S. (1977). Time predicting. Runner's World Magazine.
- Riegel, P. S. (1981). Athletic Records and Human Endurance. American Scientist.` 
          : "Uses Riegel's Formula..."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมเวลาที่ทำนายมาราธอนถึงออกมาแย่กว่าหรือดีกว่าที่วิ่งจริง?" : "Why is the marathon prediction inaccurate for me?"} 
          a={lang === "TH" ? 
`มีหลายปัจจัยที่ทำให้เวลาการวิ่งมาราธอนจริงของคุณเบี่ยงเบนไปจากตัวเลขทำนาย (Race Predictor):

1. **ระดับความทนทาน (Aerobic Base):** สูตรของ Riegel สมมติว่าความฟิตและความทนทานของคุณสำหรับระยะมาราธอนนั้น สมบูรณ์เท่ากับระยะ 5K หรือ 10K ที่คุณกรอกลงไป แต่ในความเป็นจริง นักวิ่งหน้าใหม่มักขาดระยะสะสม (Mileage) ที่เพียงพอ เมื่อวิ่งพ้นกิโลเมตรที่ 30 ร่างกายจะเกิดสภาวะ "ชนกำแพง (Hitting the wall)" ทำให้เวลาช้าลงกว่าที่ทำนายไว้มาก
2. **ประเภทเส้นทางและสภาพอากาศ:** สถิติที่คุณกรอกอาจมาจากการวิ่งในสวนสาธารณะที่ร่มรื่นและทางเรียบ แต่สนามมาราธอนจริงอาจมีเนินเขา อากาศร้อนจัด หรือมีความชื้นสูง ซึ่งปัจจัยเหล่านี้ทำให้ประสิทธิภาพตกลง
3. **โภชนาการระหว่างวิ่ง:** การเติมคาร์โบไฮเดรตและเกลือแร่ระหว่างวิ่ง 42 กิโลเมตรเป็นศาสตร์ที่ต้องฝึกฝน หากเติมไม่พอ พลังงานจะหมดก่อน
4. **Genetic Makeup:** ร่างกายของบางคนเกิดมาพร้อมเส้นใยกล้ามเนื้อแบบ Slow-twitch (ทนทานสูง) มากกว่า Fast-twitch (ความเร็วสูง) คนเหล่านี้อาจจะทำเวลามาราธอนได้ "ดีกว่า" ที่คำนวณจากสถิติ 5K เสียด้วยซ้ำ

หากต้องการให้คำทำนายแม่นยำที่สุด แนะนำให้กรอกสถิติจากระยะที่ใกล้เคียงที่สุด เช่น ใช้สถิติ 21K หรือ 30K ล่าสุดของคุณมาทำนายระยะมาราธอนครับ` 
          : "Aerobic base and external factors affect the actual marathon time."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 5. Squat/Deadlift Pyramid
// ---------------------------------------------------------
export function LiftingPyramid({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [onerm, setOnerm] = useLocalState("lift-1rm", "100");

  const calcPyramid = () => {
    const rm = Number(onerm) || 0;
    return [
      { set: lang==="TH"?"วอร์มอัพ 1":"Warm-up 1", percent: "50%", weight: Math.round(rm * 0.50), reps: "10-12" },
      { set: lang==="TH"?"วอร์มอัพ 2":"Warm-up 2", percent: "60%", weight: Math.round(rm * 0.60), reps: "6-8" },
      { set: lang==="TH"?"วอร์มอัพ 3":"Warm-up 3", percent: "70%", weight: Math.round(rm * 0.70), reps: "3-5" },
      { set: lang==="TH"?"เซ็ตจริง 1":"Working Set 1", percent: "80%", weight: Math.round(rm * 0.80), reps: "5-6" },
      { set: lang==="TH"?"เซ็ตจริง 2":"Working Set 2", percent: "85%", weight: Math.round(rm * 0.85), reps: "3-4" },
      { set: lang==="TH"?"เซ็ตพีค (หนักสุด)":"Peak Set", percent: "90-95%", weight: `${Math.round(rm * 0.90)}-${Math.round(rm * 0.95)}`, reps: "1-2" },
      { set: lang==="TH"?"คูลดาวน์ (Drop)":"Drop Set", percent: "75%", weight: Math.round(rm * 0.75), reps: "8-10" },
    ];
  };

  const steps = calcPyramid();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 mb-4">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ตารางซ้อม Pyramid (Squat/Deadlift)" : "Lifting Pyramid"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "สร้างตารางไต่ระดับน้ำหนักสำหรับท่า Compound Movements" : "Generate a pyramid training protocol for compound lifts."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <label className={labelClass}>{lang === "TH" ? "น้ำหนักสูงสุดที่ยกได้ 1 ครั้ง (1RM - kg)" : "1 Rep Max (kg or lbs)"}</label>
        <input type="number" value={onerm} onChange={e=>setOnerm(e.target.value)} className={inputClass} placeholder="100" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 text-sm">
            <tr>
              <th className="p-4 font-medium">{lang === "TH" ? "เซ็ต" : "Set"}</th>
              <th className="p-4 font-medium">% 1RM</th>
              <th className="p-4 font-medium">{lang === "TH" ? "จำนวนครั้ง" : "Reps"}</th>
              <th className="p-4 font-medium text-right">{lang === "TH" ? "น้ำหนักเป้าหมาย" : "Target Weight"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {steps.map((s, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{s.set}</td>
                <td className="p-4 text-slate-500 text-sm">{s.percent}</td>
                <td className="p-4 text-slate-500 font-bold">{s.reps}</td>
                <td className="p-4 text-right font-bold text-lg text-slate-700 dark:text-slate-300">{s.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Pyramid Training)" : "Pyramid Training FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "การฝึกแบบ Pyramid Training คืออะไร และมีข้อดีอย่างไรสำหรับการยกน้ำหนัก?" : "What is Pyramid Training?"} 
          a={lang === "TH" ? 
`การฝึกแบบพีระมิด (Pyramid Training) คือรูปแบบการจัดตารางเซ็ตการยกน้ำหนักแบบไต่ระดับ โดยเริ่มจากน้ำหนักที่เบาและจำนวนครั้ง (Reps) ที่มากในเซ็ตแรกๆ (ช่วงฐานของพีระมิด) แล้วค่อยๆ เพิ่มน้ำหนักให้หนักขึ้นพร้อมกับลดจำนวนครั้งลงเรื่อยๆ ในเซ็ตถัดๆ ไป จนถึงยอดพีระมิด (น้ำหนักหนักที่สุด จำนวนครั้งน้อยที่สุด) จากนั้นอาจมีการลดน้ำหนักกลับลงมา (Reverse Pyramid / Drop Set) 

**ข้อดีของการฝึกแบบพีระมิด:**
1. **การวอร์มอัพที่สมบูรณ์แบบ:** การเริ่มด้วยน้ำหนักเบาๆ ในท่าที่จะต้องยกหนัก (เช่น Squat, Deadlift, Bench Press) ช่วยวอร์มอัพกล้ามเนื้อเฉพาะจุด (Specific Warm-up) กระตุ้นระบบประสาท (CNS) และหล่อลื่นข้อต่อให้พร้อมทำงาน ป้องกันการบาดเจ็บจากการตกใจของกล้ามเนื้อเมื่อเจอน้ำหนักมากๆ
2. **สร้างความแข็งแรงและกล้ามเนื้อพร้อมกัน:** ช่วงเซ็ตที่ยก 8-12 ครั้ง จะช่วยกระตุ้นเส้นใยกล้ามเนื้อแบบ Hypertrophy (สร้างขนาดกล้ามเนื้อ) ส่วนช่วงยอดพีระมิดที่ยก 1-3 ครั้งด้วยน้ำหนัก 90-95% 1RM จะไปกระตุ้น Strength (ความแข็งแรงสูงสุด)
3. **ลดความเสี่ยงการโอเวอร์เทรน:** การไม่ยกน้ำหนักสูงสุด (Max) ในทุกๆ เซ็ต แต่สงวนแรงไว้จัดหนักแค่เซ็ตยอดพีระมิด จะช่วยรักษาสภาพของระบบประสาทส่วนกลางไม่ให้ล้าเกินไป (CNS Fatigue)

อ้างอิง:
- Baechle, T. R., & Earle, R. W. (2008). Essentials of Strength Training and Conditioning (3rd ed.). National Strength and Conditioning Association.` 
          : "Pyramid training starts light and goes heavy to build strength and warm up properly."} 
        />
        <FAQItem 
          q={lang === "TH" ? "1RM คืออะไร และฉันจะหาค่า 1RM ของท่า Squat/Deadlift อย่างปลอดภัยได้อย่างไร?" : "What is 1RM and how to find it safely?"} 
          a={lang === "TH" ? 
`1RM (One Repetition Maximum) คือ ค่าน้ำหนักที่หนักที่สุดที่คุณสามารถยกได้ในท่าใดท่าหนึ่งด้วยท่าทางที่ถูกต้องสมบูรณ์ (Proper Form) "เพียงแค่ 1 ครั้งเท่านั้น" ไม่สามารถยกครั้งที่ 2 ได้ 

ค่า 1RM ถือเป็นมาตรฐานทองคำในการวางแผนโปรแกรมการฝึกความแข็งแรง (Strength Training) เพราะโค้ชและตารางซ้อมส่วนใหญ่ (รวมถึงเครื่องมือนี้) จะกำหนดน้ำหนักเป้าหมายเป็นเปอร์เซ็นต์ของค่า 1RM ของคุณ

**วิธีหาค่า 1RM อย่างปลอดภัย (โดยไม่ต้องเสี่ยงยกหนักสุดตัวจริงๆ):**
การไปทดสอบยกแบบ 1RM จริงๆ (True 1RM Test) นั้นมีความเสี่ยงสูงที่จะเกิดการบาดเจ็บโดยเฉพาะสำหรับมือใหม่ ดังนั้นวงการกีฬาจึงนิยมใช้ **"สูตรคำนวณจาก Sub-maximal Loads"** แทน เช่น สูตรของ Epley (1985) หรือ Brzycki (1993)

**วิธีการทำ:**
1. เลือกน้ำหนักที่ค่อนข้างหนัก แต่คุณมั่นใจว่าสามารถยกท่าที่ถูกต้องได้ประมาณ 4-6 ครั้ง (อย่าเลือกน้ำหนักที่ยกได้เกิน 10 ครั้ง เพราะความแม่นยำจะลดลง)
2. วอร์มอัพให้พร้อม แล้วลองยกน้ำหนักนั้นจนหมดแรง (ถึงจุด Failure หรือเกือบ Failure โดยที่ฟอร์มยังเป๊ะอยู่) สมมติว่ายกน้ำหนัก 80 กก. ได้ 5 ครั้ง
3. นำตัวเลขเข้าสูตรคำนวณ (เช่น เครื่องคำนวณ 1RM ในเว็บไซต์ของเรา หรือใช้สูตร Epley: 1RM = Weight x (1 + (Reps / 30)))
ตัวอย่าง: 80 x (1 + (5/30)) = 80 x 1.166 = 93.3 กก. 
คุณก็จะได้ค่า 1RM โดยประมาณที่ 93 กก. เพื่อนำมากรอกในเครื่องมือสร้างตาราง Pyramid นี้ได้อย่างปลอดภัยครับ` 
          : "1RM is your max weight for 1 rep. Calculate it safely using 4-6 rep max."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 6. Rowing Split Time
// ---------------------------------------------------------
export function RowingSplit({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [splitMin, setSplitMin] = useLocalState("row-smin", "2");
  const [splitSec, setSplitSec] = useLocalState("row-ssec", "0");
  const [dist, setDist] = useLocalState("row-dist", "2000");

  const calc = () => {
    const m = Number(splitMin) || 0;
    const s = Number(splitSec) || 0;
    const d = Number(dist) || 0;
    if (d <= 0 || (m===0 && s===0)) return { totalTime: "00:00", watts: 0 };

    // Split is usually time per 500m on an ergometer (Concept2)
    const splitSeconds = (m * 60) + s; 
    const totalSeconds = (splitSeconds / 500) * d;

    const tm = Math.floor(totalSeconds / 60);
    const ts = Math.floor(totalSeconds % 60);

    // Concept2 Watt Formula: Watts = 2.80 / (pace in seconds per meter)^3
    // pace in sec/meter = splitSeconds / 500
    const pacePerMeter = splitSeconds / 500;
    const watts = 2.80 / Math.pow(pacePerMeter, 3);

    return {
      totalTime: `${tm}:${ts.toString().padStart(2, '0')}`,
      watts: Math.round(watts)
    };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-4">
          <Ship className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณ Rowing Split Time (กรรเชียงบก)" : "Rowing Split Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณเวลาที่ใช้ทั้งหมดและค่าพลังงานวัตต์บนเครื่องกรรเชียงบก (Concept2/Erg)" : "Calculate total time and Concept2 Watts based on your /500m split."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">{lang === "TH" ? "สถิติ Split Time (เวลาต่อ 500m)" : "Split Time (/500m)"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "นาที" : "Minutes"}</label>
            <input type="number" value={splitMin} onChange={e=>setSplitMin(e.target.value)} className={inputClass} placeholder="2" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "วินาที" : "Seconds"}</label>
            <input type="number" value={splitSec} onChange={e=>setSplitSec(e.target.value)} className={inputClass} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะทางเป้าหมาย (เมตร)" : "Target Distance (m)"}</label>
            <input type="number" value={dist} onChange={e=>setDist(e.target.value)} className={inputClass} placeholder="2000" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-3xl text-center border border-teal-100 dark:border-teal-800">
          <p className="text-teal-800 dark:text-teal-200 font-medium mb-2">{lang === "TH" ? "เวลาที่ต้องใช้ทั้งหมด" : "Estimated Total Time"}</p>
          <p className="text-5xl font-black text-teal-600 dark:text-teal-400">{res.totalTime}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 font-medium mb-2">{lang === "TH" ? "กำลังวัตต์เฉลี่ย (Watts)" : "Average Power (Watts)"}</p>
          <p className="text-5xl font-black text-slate-700 dark:text-white">{res.watts} <span className="text-xl font-normal">W</span></p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Rowing / Erg)" : "Rowing FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Rowing Split Time (/500m) คืออะไร ทำไมเครื่องกรรเชียงบกถึงใช้หน่วยนี้?" : "What is a 500m split time?"} 
          a={lang === "TH" ? 
`เครื่องกรรเชียงบก (Rowing Machine หรือ Ergometer) โดยเฉพาะแบรนด์มาตรฐานโลกอย่าง Concept2 จะใช้หน่วยแสดงผลหลักในการบอกความเร็วคือ "Split Time" หรือ "เวลาที่ใช้ต่อระยะทาง 500 เมตร" (เขียนย่อว่า /500m) 

ตัวอย่างเช่น หากหน้าจอแสดงผล 2:00 /500m หมายความว่า หากคุณพายด้วยแรงระดับนี้อย่างต่อเนื่อง คุณจะพายผ่านระยะทาง 500 เมตรได้ในเวลา 2 นาทีพอดี เหตุผลที่กีฬากรรเชียง (Rowing) ใช้หน่วย 500 เมตรเป็นมาตรฐาน เพราะในการแข่งขันเรือพายจริงบนแม่น้ำหรือทะเลสาบ ระยะทางแข่งขันสากลคือ 2,000 เมตร (โอลิมปิก) และมักจะมีการบอกความเร็วและวางแผนกลยุทธ์โดยแบ่งการแข่งขันออกเป็น 4 ช่วง (ช่วงละ 500 เมตร) ดังนั้นการใช้หน่วย 500 เมตรจึงกลายเป็นภาษาสากลสำหรับนักพายเรือและนักกีฬา CrossFit ทั่วโลก 

ต่างจากการวิ่งที่ใช้ นาที/กิโลเมตร การใช้ 500m จะละเอียดอ่อนและสังเกตการเปลี่ยนแปลงความเร็วได้รวดเร็วกว่าบนเครื่องดึงกรรเชียงครับ` 
          : "It's the time it takes to row 500 meters, the standard unit in rowing."} 
        />
        <FAQItem 
          q={lang === "TH" ? "การคำนวณหาค่าวัตต์ (Watts) บนเครื่อง Concept2 ทำงานอย่างไร และมีประโยชน์อย่างไร?" : "How are watts calculated on an ergometer?"} 
          a={lang === "TH" ? 
`นอกจากการดูความเร็วเป็นเวลาต่อ 500 เมตรแล้ว เครื่องกรรเชียงบกยังสามารถแสดงพลังงานที่คุณใช้ดึงจริงๆ ออกมาเป็นหน่วย "วัตต์ (Watts)" ได้ด้วย ซึ่งมีประโยชน์อย่างมากในการวัดแรงดิบ (Raw Power) โดยไม่ต้องสนใจอัตราการดึง (Stroke Rate)

**สูตรทางคณิตศาสตร์ที่แบรนด์ Concept2 ใช้คำนวณคือ:**
Watts = 2.80 / (ความเร็วในหน่วยวินาทีต่อเมตร)³

จะเห็นได้ว่าความสัมพันธ์ระหว่าง "เวลา" และ "แรงวัตต์" ไม่ได้เป็นเส้นตรง (Non-linear) แต่เป็นสมการกำลังสาม หมายความว่า การจะทำเวลาลดลงจาก 2:30 เป็น 2:20 คุณอาจจะเพิ่มแรงเพียงเล็กน้อย แต่ถ้าคุณต้องการพายให้เร็วขึ้นจาก 1:40 เป็น 1:30 (ลด 10 วินาทีเท่ากัน) คุณจะต้องใช้แรงและกำลังวัตต์เพิ่มขึ้นอย่างมหาศาลทวีคูณ (เนื่องจากแรงต้านของอากาศและน้ำเพิ่มขึ้นเป็นทวีคูณตามความเร็ว) 

เครื่องมือคำนวณของเราใช้สูตรสากลนี้เพื่อช่วยให้นักกีฬาตระหนักว่า หากพวกเขาตั้งเป้าหมายทำเวลา 2000m ในเวลาที่กำหนด พวกเขาจะต้องดึงให้ได้เฉลี่ยกี่วัตต์อย่างต่อเนื่อง ซึ่งค่าวัตต์นี้สามารถนำไปใช้อ้างอิงและเทียบกับการออกแรงในการปั่นจักรยาน (Cycling FTP) ได้ด้วยครับ

อ้างอิง:
- Concept2 Indoor Rower Documentation & Physics of Rowing.` 
          : "Watts measure power output directly, calculated by 2.80 / (sec/meter)^3."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 7. Carb for endurance
// ---------------------------------------------------------
export function CarbEnduranceCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [duration, setDuration] = useLocalState("carb-hrs", "2.5");
  const [weight, setWeight] = useLocalState("carb-weight", "65");

  const calc = () => {
    const h = Number(duration) || 0;
    const w = Number(weight) || 0;
    
    // Guidelines based on duration
    let carbPerHour = 0;
    let strategy = "";
    
    if (h < 1) {
      carbPerHour = 0;
      strategy = lang==="TH"?"ไม่ต้องเติม (แค่อมน้ำหวานหรือบ้วนปาก)":"Not needed (Mouth rinse only)";
    } else if (h <= 2.5) {
      carbPerHour = 30; // 30-60g
      strategy = lang==="TH"?"30-60 กรัม/ชั่วโมง (เจล 1-2 ซอง)":"30-60g per hour (1-2 Gels)";
    } else {
      carbPerHour = 60; // 60-90g
      strategy = lang==="TH"?"60-90 กรัม/ชั่วโมง (เจล 2-3 ซอง หรือเครื่องดื่มพลังงาน)":"60-90g per hour (2-3 Gels or drink)";
    }

    // Carb loading before race (usually 8-10g/kg per day for 2-3 days prior)
    const loadingPerDay = 9 * w; 

    return { carbPerHour, strategy, loadingPerDay, totalNeeded: carbPerHour * h };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
          <Apple className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณคาร์โบไฮเดรตสำหรับกีฬาความทนทาน" : "Endurance Carb Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "วางแผนโภชนาการ (Fueling) ระหว่างแข่งขันมาราธอน ไตรกีฬา หรือปั่นจักรยาน" : "Plan your race nutrition and carb loading strategy."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนักตัว (กก.)" : "Body Weight (kg)"}</label>
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className={inputClass} placeholder="65" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลาแข่งขัน (ชั่วโมง)" : "Race Duration (Hours)"}</label>
            <input type="number" value={duration} step="0.5" onChange={e=>setDuration(e.target.value)} className={inputClass} placeholder="2.5" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-8 rounded-3xl border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">{lang === "TH" ? "แผนโภชนาการของคุณ (Fueling Strategy)" : "Your Fueling Strategy"}</h3>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center shrink-0 font-bold text-yellow-700 dark:text-yellow-200">1</div>
            <div>
              <h4 className="font-bold text-lg">{lang === "TH" ? "การเติมพลังงานระหว่างแข่ง (During Race)" : "During the Race"}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-1">{res.strategy}</p>
              <p className="font-semibold text-orange-600">{lang === "TH" ? `ต้องพกคาร์บรวมทั้งหมดประมาณ ${res.totalNeeded} กรัม` : `Total required: ~${res.totalNeeded}g`}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center shrink-0 font-bold text-yellow-700 dark:text-yellow-200">2</div>
            <div>
              <h4 className="font-bold text-lg">{lang === "TH" ? "การโหลดคาร์บก่อนแข่ง (Carb Loading)" : "Carb Loading (Pre-race)"}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-1">{lang === "TH" ? "สำหรับระยะเวลาแข่ง 2 ชั่วโมงขึ้นไป ควรโหลดคาร์บ 2-3 วันก่อนแข่ง" : "For 2+ hours events, load carbs 2-3 days prior."}</p>
              <p className="font-semibold text-orange-600">{lang === "TH" ? `เป้าหมาย: ${res.loadingPerDay} กรัม/วัน` : `Target: ${res.loadingPerDay}g/day`}</p>
            </div>
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Carb Loading & Fueling)" : "Endurance Nutrition FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมนักกีฬามาราธอนและไตรกีฬาถึงต้องทานเจลพลังงาน (Carbohydrate) ระหว่างแข่งขัน?" : "Why do endurance athletes need to consume carbs during a race?"} 
          a={lang === "TH" ? 
`ร่างกายมนุษย์มีแหล่งพลังงานหลัก 2 แหล่งคือ คาร์โบไฮเดรต (เก็บในรูปไกลโคเจนในตับและกล้ามเนื้อ) และไขมัน (เก็บตามส่วนต่างๆ ของร่างกาย) 

ไขมันมีอยู่มหาศาลและแทบไม่มีวันหมด แต่ร่างกายสามารถเผาผลาญไขมันมาใช้เป็นพลังงานได้ "ช้ามาก" ไม่ทันต่อการวิ่งหรือปั่นจักรยานด้วยความเร็วสูง ร่างกายจึงต้องพึ่งพาไกลโคเจนเป็นพลังงานหลัก แต่ปัญหาคือถังเก็บไกลโคเจนในร่างกายคนเรามีจำกัด (เก็บได้ประมาณ 400-500 กรัม หรือราว 2,000 กิโลแคลอรี) ซึ่งเพียงพอสำหรับการวิ่งต่อเนื่องประมาณ 1.5 - 2 ชั่วโมงเท่านั้น

เมื่อไกลโคเจนหมดลง ร่างกายจะถูกบังคับให้ลดความเร็วลงอย่างฉับพลันเพื่อใช้เฉพาะไขมัน สภาวะนี้เรียกว่า "Hitting the Wall" หรืออาการชนกำแพง ขาจะหนัก หน้ามืด และหมดแรง ดังนั้นเพื่อป้องกันเหตุการณ์นี้ นักกีฬาความทนทาน (Endurance Athletes) จึงต้องบริโภคคาร์โบไฮเดรตที่ดูดซึมเร็ว (เช่น เจลพลังงาน, กล้วย, เครื่องดื่มเกลือแร่) เข้าไประหว่างการแข่งขันตั้งแต่ชั่วโมงแรก เพื่อเติมเชื้อเพลิงให้วิ่งด้วยความเร็วสูงได้จนจบการแข่งขัน

อ้างอิง:
- Jeukendrup, A. E. (2014). A step towards personalized sports nutrition: carbohydrate intake during exercise. Sports Medicine.` 
          : "Carbs provide fast energy. Glycogen stores deplete in 1.5-2 hours."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ควรทานคาร์โบไฮเดรตปริมาณเท่าไหร่ในระหว่างการแข่งขัน?" : "How many carbs should I eat during exercise?"} 
          a={lang === "TH" ? 
`ปริมาณคาร์โบไฮเดรตที่ร่างกายต้องการระหว่างการแข่งขัน ไม่ได้ขึ้นอยู่กับน้ำหนักตัว แต่ขึ้นอยู่กับ "ระยะเวลา (Duration)" ของการแข่งขันและขีดจำกัดการดูดซึมของลำไส้ สถาบันวิทยาศาสตร์การกีฬา (ACSM และ Jeukendrup) แนะนำมาตรฐานดังนี้:

1. **ออกกำลังกายน้อยกว่า 45 นาที:** ไม่จำเป็นต้องทานคาร์โบไฮเดรต
2. **ออกกำลังกาย 45 - 75 นาที:** ทานเล็กน้อย หรือแค่บ้วนปากด้วยน้ำหวาน (Carb Mouth Rinse) ก็สามารถหลอกสมองให้มีแรงเพิ่มขึ้นได้แล้ว
3. **ออกกำลังกาย 1 - 2.5 ชั่วโมง:** แนะนำให้ทานคาร์บ 30 - 60 กรัมต่อชั่วโมง (เทียบเท่ากับเจลพลังงาน 1-2 ซอง หรือกล้วย 1-2 ผลต่อชั่วโมง)
4. **ออกกำลังกายมากกว่า 2.5 ชั่วโมง (เช่น มาราธอน, ไตรกีฬา, อัลตร้า):** แนะนำให้ทานสูงถึง 60 - 90 กรัมต่อชั่วโมง (ต้องเป็นคาร์บที่ผสมกันระหว่าง Glucose และ Fructose เพื่อให้ลำไส้ดูดซึมได้ทัน)

**ข้อควรระวัง:** ลำไส้ต้องได้รับการฝึกฝน (Train your gut) หากคุณไม่เคยทานเจลเลยตอนซ้อม แล้วมาอัดเจล 60 กรัมต่อชั่วโมงในวันแข่งจริง คุณอาจมีอาการจุกเสียด ท้องอืด หรือท้องเสียได้ ควรทดลองสูตรโภชนาการนี้ในวันซ้อมยาวเสมอ` 
          : "Depends on duration: 30-60g/hr for 1-2.5 hours, up to 90g/hr for longer."} 
        />
        <FAQItem 
          q={lang === "TH" ? "การโหลดคาร์บก่อนแข่ง (Carb Loading) คืออะไร ต้องกินข้าวมหาศาลเลยหรือไม่?" : "What is Carb Loading?"} 
          a={lang === "TH" ? 
`การโหลดคาร์บ (Carbohydrate Loading) คือกลยุทธ์ทางโภชนาการที่นักกีฬาใช้เพื่อ "เติมถังเก็บไกลโคเจนให้เต็มแม็กซ์" ก่อนการแข่งขันระยะไกล โดยเริ่มทำ 2-3 วันก่อนวันแข่ง

หลักการคือคุณต้องบริโภคคาร์โบไฮเดรตประมาณ 8 - 10 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม ต่อวัน (เช่น หนัก 65 กก. ต้องกินคาร์บ 520 - 650 กรัมต่อวัน ซึ่งเทียบเท่ากับข้าวสวยเกือบ 10-12 ถ้วย!) 

หลายคนเข้าใจผิดว่าการโหลดคาร์บคือการกินบุฟเฟต์ กินพิซซ่า เบเกอรี่ หรือของทอดหนักๆ คืนก่อนวันแข่ง ซึ่งนั่นจะทำให้ได้ไขมันและไฟเบอร์มากเกินไป ส่งผลให้ท้องอืดในเช้าวันแข่ง การโหลดคาร์บที่ถูกต้องควรเน้นคาร์โบไฮเดรตที่ย่อยง่าย ไขมันต่ำ และไฟเบอร์ต่ำ (Low Fiber, Low Fat) เช่น ข้าวขาว พาสต้า มันสำปะหลัง หรือใช้วิธีดื่มน้ำหวาน/น้ำผลไม้เสริมเพื่อไม่ให้อิ่มจุกจนเกินไป การโหลดคาร์บอาจทำให้น้ำหนักตัวเพิ่มขึ้น 1-2 กิโลกรัม เพราะไกลโคเจน 1 กรัมจะดึงน้ำเข้ามาเก็บไว้ด้วย 3 กรัม ซึ่งเป็นเรื่องปกติและมีประโยชน์ในการช่วยเก็บน้ำไว้ใช้ตอนแข่งครับ` 
          : "Carb loading maximizes glycogen stores before long races. Aim for 8-10g/kg per day."} 
        />
      </SEOFAQ>
    </div>
  );
}
