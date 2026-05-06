"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { Gauge } from "../Gauge";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, ExportResult, RelatedCalcs } from "./shared";

// 1. BMI (Moved from old file)
export function BMICalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [weight, setWeight] = useLocalState("bmi_weight", "");
  const [height, setHeight] = useLocalState("bmi_height", "");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [advice, setAdvice] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      setBmiResult(parseFloat(bmi.toFixed(1)));
      if (bmi < 18.5) {
        setBmiStatus(lang === "TH" ? "น้ำหนักน้อย" : "Underweight");
        setAdvice(lang === "TH" ? "คุณควรรับประทานอาหารที่มีประโยชน์เพิ่มขึ้น เพื่อเพิ่มมวลกล้ามเนื้อและน้ำหนักตัวให้อยู่ในเกณฑ์มาตรฐาน" : "You should eat more nutritious foods to gain weight healthily.");
      } else if (bmi < 23) {
        setBmiStatus(lang === "TH" ? "ปกติ" : "Normal");
        setAdvice(lang === "TH" ? "ยอดเยี่ยม! น้ำหนักของคุณอยู่ในเกณฑ์มาตรฐาน รักษาสุขภาพและออกกำลังกายอย่างสม่ำเสมอต่อไป" : "Great job! Keep up the healthy lifestyle.");
      } else if (bmi < 25) {
        setBmiStatus(lang === "TH" ? "ท้วม" : "Overweight");
        setAdvice(lang === "TH" ? "BMI ของคุณเริ่มเกินเกณฑ์นิดหน่อย ลองปรับพฤติกรรมการกินและเพิ่มการออกกำลังกายดูนะ" : "Your BMI is slightly high. Consider adjusting your diet and exercising more.");
      } else {
        setBmiStatus(lang === "TH" ? "อ้วน" : "Obese");
        setAdvice(lang === "TH" ? "คุณอยู่ในเกณฑ์ที่เสี่ยงต่อปัญหาสุขภาพ ควรปรึกษาแพทย์หรือนักโภชนาการเพื่อลดน้ำหนักอย่างถูกวิธี" : "You are at higher risk for health issues. Consider consulting a doctor for weight loss advice.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณดัชนีมวลกาย (BMI)" : "BMI Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
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
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {bmiResult !== null && (
        <motion.div id="bmi-result-card" initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30 shadow-sm relative bg-white dark:bg-gray-900">
          <div className="text-6xl font-black text-gray-900 dark:text-white mb-2">{bmiResult}</div>
          <div className="text-xl text-pink-600 dark:text-pink-400 font-bold">{bmiStatus}</div>
          
          <Gauge 
            value={bmiResult} 
            min={15} max={35} 
            zones={[
              { color: '#3b82f6', label: lang==="TH"?'น้อย':'Low', min: 15, max: 18.5 },
              { color: '#22c55e', label: lang==="TH"?'ปกติ':'Normal', min: 18.5, max: 23 },
              { color: '#eab308', label: lang==="TH"?'ท้วม':'Overwt', min: 23, max: 25 },
              { color: '#ef4444', label: lang==="TH"?'อ้วน':'Obese', min: 25, max: 35 }
            ]} 
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 italic">"{advice}"</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <ShareButtons title={`ค่า BMI ของฉันคือ ${bmiResult} (${bmiStatus})`} />
            <ExportResult elementId="bmi-result-card" fileName={`BMI_${bmiResult}`} lang={lang} />
          </div>
        </motion.div>
      )}

      <RelatedCalcs 
        lang={lang} 
        setCalc={setCalc}
        links={[
          {id: "tdee", name: lang==="TH"?"คำนวณ TDEE (แคลอรี่ที่ใช้ต่อวัน)":"TDEE Calculator"},
          {id: "water-intake", name: lang==="TH"?"คำนวณปริมาณน้ำดื่ม":"Water Intake Calculator"}
        ]} 
      />

      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (FAQ)" : "FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "BMI เท่าไหร่ถึงจะอ้วน?" : "What BMI is considered obese?"}
          a={lang === "TH" ? "สำหรับคนเอเชีย หากค่า BMI เกิน 25 ขึ้นไป จะถือว่าอยู่ในเกณฑ์อ้วน และหากเกิน 30 จะอยู่ในเกณฑ์อ้วนมากและเสี่ยงต่อโรค" : "For Asians, a BMI of 25 or higher is considered obese."}
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไม BMI ถึงไม่แม่นยำกับบางคน?" : "Why is BMI not always accurate?"}
          a={lang === "TH" ? "BMI ไม่ได้แยกแยะระหว่างไขมันและกล้ามเนื้อ ผู้ที่ออกกำลังกายจนมีกล้ามเนื้อมาก อาจมีค่า BMI สูงแต่ไม่ได้แปลว่าอ้วน แนะนำให้ใช้ร่วมกับการวัดเปอร์เซ็นต์ไขมัน หรือ TDEE" : "BMI doesn't differentiate between fat and muscle. Bodybuilders might have a high BMI but low body fat."}
        />
      </SEOFAQ>
    </div>
  );
}

// 2. Sleep Cycle
export function SleepCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [wakeTime, setWakeTime] = useLocalState("sleep_wake", "07:00");
  const [bedTimes, setBedTimes] = useState<string[]>([]);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const [h, m] = wakeTime.split(":").map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(h, m, 0, 0);
    const times = [];
    for (let i = 4; i <= 6; i++) {
      const ms = (i * 90 + 14) * 60000;
      const bedTime = new Date(wakeDate.getTime() - ms);
      times.push(bedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    setBedTimes(times.reverse());
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "วงจรการนอนหลับ" : "Sleep Cycle Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เวลาที่คุณต้องการตื่น" : "Wake Up Time"}</label>
          <input type="time" value={wakeTime} onChange={e=>setWakeTime(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณเวลานอน" : "Find Bedtime"}</button>
      </form>
      {bedTimes.length > 0 && (
        <motion.div id="sleep-result-card" initial={{opacity:0}} animate={{opacity:1}} className="mt-8 text-center bg-white dark:bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{lang === "TH" ? "ควรเข้านอนเวลา (รวมเวลาเคลิ้มหลับ 14 นาทีแล้ว)" : "Suggested bedtimes:"}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {bedTimes.map((t, i) => (
              <div key={i} className="p-4 bg-pink-100 dark:bg-pink-900/40 rounded-lg border border-pink-200 dark:border-pink-500/30 font-bold text-pink-700 dark:text-pink-300 shadow-sm">{t}</div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <ExportResult elementId="sleep-result-card" fileName="Sleep_Result" lang={lang} />
          </div>
        </motion.div>
      )}
      
      <RelatedCalcs 
        lang={lang} 
        setCalc={setCalc}
        links={[
          {id: "bmi", name: lang==="TH"?"คำนวณ BMI":"BMI Calculator"},
          {id: "food-random", name: lang==="TH"?"สุ่มเมนูอาหารตามแคลอรี่":"Food Randomizer"}
        ]} 
      />
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "การนอนหลับที่ดี (FAQ)" : "Sleep FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมต้องตื่นตามวงจรการนอน?" : "Why wake up at the end of a cycle?"}
          a={lang === "TH" ? "วงจรการนอนหลับของมนุษย์ใช้เวลาประมาณ 90 นาทีต่อรอบ การตื่นตอนจบวงจรจะทำให้รู้สึกสดชื่น ไม่งัวเงีย ดีกว่าการตื่นกลางวงจรแม้จะนอนนานกว่าก็ตาม" : "A sleep cycle is about 90 mins. Waking up at the end of a cycle leaves you feeling refreshed."}
        />
      </SEOFAQ>
    </div>
  );
}

// 3. TDEE
export function TDEECalculator({ lang }: { lang: Lang }) {
  const [gender, setGender] = useLocalState("tdee_gen", "M");
  const [age, setAge] = useLocalState("tdee_age", "25");
  const [weight, setWeight] = useLocalState("tdee_w", "70");
  const [height, setHeight] = useLocalState("tdee_h", "170");
  const [activity, setActivity] = useLocalState("tdee_act", "1.2");
  const [tdee, setTdee] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    if(w>0 && h>0 && a>0) {
      let bmr = 0;
      if(gender === "M") bmr = 66.5 + (13.75 * w) + (5.003 * h) - (6.75 * a);
      else bmr = 655.1 + (9.563 * w) + (1.850 * h) - (4.676 * a);
      setTdee(Math.round(bmr * parseFloat(activity)));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณ TDEE" : "TDEE Calculator"}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{lang==="TH"?"พลังงานที่คุณใช้ในแต่ละวัน แม่นยำกว่าการดูแค่ BMI":"Total Daily Energy Expenditure"}</p>
      
      <form onSubmit={calculate} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang==="TH"?"เพศ":"Gender"}</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
              <option value="M">{lang==="TH"?"ชาย":"Male"}</option>
              <option value="F">{lang==="TH"?"หญิง":"Female"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang==="TH"?"อายุ (ปี)":"Age"}</label>
            <input type="number" value={age} onChange={e=>setAge(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang==="TH"?"น้ำหนัก (กก.)":"Weight (kg)"}</label>
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang==="TH"?"ส่วนสูง (ซม.)":"Height (cm)"}</label>
            <input type="number" value={height} onChange={e=>setHeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang==="TH"?"ระดับกิจกรรมการออกกำลังกาย":"Activity Level"}</label>
          <select value={activity} onChange={e=>setActivity(e.target.value)} className={`${inputClass} focus:ring-pink-400`}>
            <option value="1.2">{lang==="TH"?"ไม่ออกกำลังกาย หรือทำงานนั่งโต๊ะ":"Sedentary"}</option>
            <option value="1.375">{lang==="TH"?"ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์":"Lightly active"}</option>
            <option value="1.55">{lang==="TH"?"ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์":"Moderately active"}</option>
            <option value="1.725">{lang==="TH"?"ออกกำลังกายหนัก 6-7 วัน/สัปดาห์":"Very active"}</option>
            <option value="1.9">{lang==="TH"?"ออกกำลังกายหนักมาก หรือทำงานที่ใช้แรง":"Super active"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>

      {tdee !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "พลังงานที่คุณใช้ต่อวันคือ" : "Your TDEE is"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{tdee.toLocaleString()} <span className="text-xl">kcal</span></div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left">
             <div className="p-4 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
               <span className="font-bold text-red-500">{lang==="TH"?"ลดน้ำหนัก":"Weight Loss"}</span>: <br/>{lang==="TH"?`ทานวันละ ${tdee - 500} kcal`:`Eat ${tdee - 500} kcal/day`}
             </div>
             <div className="p-4 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
               <span className="font-bold text-green-500">{lang==="TH"?"เพิ่มกล้ามเนื้อ":"Weight Gain"}</span>: <br/>{lang==="TH"?`ทานวันละ ${tdee + 500} kcal`:`Eat ${tdee + 500} kcal/day`}
             </div>
          </div>
          <ShareButtons title={`พลังงานที่ฉันต้องการต่อวันคือ ${tdee} แคลอรี่!`} />
        </motion.div>
      )}

      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "TDEE และ BMR (FAQ)" : "TDEE FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "TDEE คืออะไร ต่างจาก BMR อย่างไร?" : "What is the difference between TDEE and BMR?"}
          a={lang === "TH" ? "BMR คือพลังงานพื้นฐานที่ร่างกายใช้ตอนพักผ่อน (หายใจ, เต้นของหัวใจ) ส่วน TDEE คือพลังงานทั้งหมดรวมกับการเดิน วิ่ง และทำกิจกรรม หากต้องการลดน้ำหนักต้องกินให้น้อยกว่า TDEE แต่ไม่น้อยกว่า BMR" : "BMR is resting calories. TDEE includes all daily activities."}
        />
      </SEOFAQ>
    </div>
  );
}

// 4. Water Intake
export function WaterCalculator({ lang }: { lang: Lang }) {
  const [weight, setWeight] = useLocalState("water_w", "");
  const [water, setWater] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if(parseFloat(weight) > 0) setWater(parseFloat(weight) * 33);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "คำนวณปริมาณน้ำดื่ม" : "Water Intake"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนักตัว (กก.)" : "Weight (kg)"}</label>
          <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {water !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "คุณควรดื่มน้ำวันละ" : "You should drink"}</p>
          <div className="text-5xl font-black text-pink-600 dark:text-pink-400">{(water / 1000).toFixed(1)} <span className="text-2xl">ลิตร (L)</span></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">({lang==="TH"?`ประมาณ ${Math.ceil(water / 250)} แก้ว`:`Around ${Math.ceil(water / 250)} glasses`})</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "การดื่มน้ำ (FAQ)" : "Water FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมสูตรนี้ถึงใช้คูณด้วย 33?" : "Why multiply by 33?"}
          a={lang === "TH" ? "สูตรมาตรฐานทางการแพทย์แนะนำให้ร่างกายได้รับน้ำประมาณ 30-33 มิลลิลิตรต่อน้ำหนักตัว 1 กิโลกรัม เพื่อรักษาสมดุลของระบบขับถ่ายและผิวพรรณ" : "Medical standard suggests 30-33ml per kg of body weight."}
        />
      </SEOFAQ>
    </div>
  );
}

// 5. Food Randomizer
export function FoodRandomizer({ lang }: { lang: Lang }) {
  const [calLimit, setCalLimit] = useLocalState("food_limit", "500");
  const [result, setResult] = useState<{name:string, cal:number} | null>(null);

  const foods = [
    { name: "ข้าวผัดกระเพราไก่ไข่ดาว", cal: 600 },
    { name: "ข้าวมันไก่", cal: 596 },
    { name: "ผัดไทยกุ้งสด", cal: 577 },
    { name: "ส้มตำไทย", cal: 55 },
    { name: "ไก่ย่าง (1 ไม้)", cal: 165 },
    { name: "ก๋วยเตี๋ยวเส้นเล็กน้ำใส", cal: 250 },
    { name: "เกาเหลาหมูตุ๋น", cal: 220 },
    { name: "ยำวุ้นเส้น", cal: 120 },
    { name: "ข้าวไข่เจียว", cal: 450 },
    { name: "สลัดผักอกไก่", cal: 150 },
    { name: "ข้าวหมูแดง", cal: 540 },
    { name: "ต้มยำกุ้งน้ำใส", cal: 65 }
  ];

  const randomize = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseInt(calLimit);
    const validFoods = foods.filter(f => f.cal <= limit);
    if(validFoods.length > 0) {
      const randomItem = validFoods[Math.floor(Math.random() * validFoods.length)];
      setResult(randomItem);
    } else {
      setResult({ name: lang==="TH"?"ไม่มีเมนูที่แคลต่ำขนาดนี้! แนะนำให้ทานผลไม้":"No meals found. Eat fruits!", cal: 0 });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-pink-600 dark:text-pink-400">{lang === "TH" ? "สุ่มเมนูอาหาร (ตามแคล)" : "Food Randomizer"}</h2>
      <form onSubmit={randomize} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "แคลอรี่ที่ทานได้ต่อมื้อ (kcal)" : "Calorie Limit per Meal"}</label>
          <input type="number" value={calLimit} onChange={e=>setCalLimit(e.target.value)} required className={`${inputClass} focus:ring-pink-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-pink-500 font-bold text-white rounded hover:bg-pink-600 shadow-md">{lang === "TH" ? "สุ่มเมนูเลย!" : "Randomize Meal"}</button>
      </form>
      {result && (
        <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="mt-8 p-6 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center border border-pink-200 dark:border-pink-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "เมนูที่คุณคู่ควรวันนี้:" : "Your meal is:"}</p>
          <div className="text-3xl font-black text-pink-600 dark:text-pink-400 mb-2">{result.name}</div>
          {result.cal > 0 && <div className="text-gray-500 dark:text-gray-400">{result.cal} kcal</div>}
        </motion.div>
      )}
      <SEOFAQ title={lang === "TH" ? "แคลอรี่อาหาร (FAQ)" : "Food FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ข้อมูลแคลอรี่มาจากไหน?" : "Where is the calorie data from?"}
          a={lang === "TH" ? "เป็นค่าเฉลี่ยโดยประมาณจากตารางแคลอรี่อาหารไทยกรมอนามัย แคลอรี่จริงอาจขึ้นอยู่กับปริมาณน้ำมันและเครื่องปรุงที่ร้านใช้" : "Estimated from standard Thai food calorie tables."}
        />
      </SEOFAQ>
    </div>
  );
}
