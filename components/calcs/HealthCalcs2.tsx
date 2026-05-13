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
      
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — แคลอรี่จากออกกำลังกาย" : "Exercise Calories FAQ"}>
        <FAQItem
          q={lang === "TH" ? "ค่า MET คืออะไร และใช้คำนวณยังไง?" : "What is MET and how is it used?"}
          a={lang === "TH" ? "MET (Metabolic Equivalent of Task) คือหน่วยวัดความเข้มข้นของกิจกรรมทางกาย โดย 1 MET = พลังงานที่ใช้ขณะนั่งพัก (≈3.5 mL O₂/kg/min) สูตรคือ kcal = MET × น้ำหนัก(kg) × เวลา(ชม.) เช่น วิ่ง MET=9.8 น้ำหนัก 70 kg 30 นาที = 9.8×70×0.5 = 343 kcal | แหล่งอ้างอิง: Ainsworth BE, et al. (2011). Compendium of Physical Activities. Medicine & Science in Sports & Exercise." : "MET (Metabolic Equivalent of Task) measures exercise intensity relative to rest. Formula: kcal = MET × weight(kg) × time(hrs). Example: Running (MET=9.8) for 30 min at 70kg = 9.8×70×0.5 = 343 kcal. Source: Ainsworth et al. (2011) Compendium of Physical Activities."}
        />
        <FAQItem
          q={lang === "TH" ? "กิจกรรมไหนเผาผลาญแคลอรี่ได้มากที่สุด?" : "Which activity burns the most calories?"}
          a={lang === "TH" ? "กิจกรรมที่เผาผลาญมากที่สุดคือ กระโดดเชือก (MET≈10-12), วิ่งเร็ว (MET≈11-16), และว่ายน้ำแบบเร็ว (MET≈10) สำหรับคนน้ำหนัก 70 kg วิ่งเร็ว 1 ชม. อาจเผาผลาญได้ถึง 700-900 kcal | แหล่งอ้างอิง: Harvard Health Publishing (2021). Calories burned in 30 minutes for people of three different weights." : "High-intensity activities burn the most: jump rope (MET≈10-12), fast running (MET≈11-16), swimming fast (MET≈10). A 70kg person running fast for 1 hour can burn 700-900 kcal. Source: Harvard Health Publishing (2021)."}
        />
        <FAQItem
          q={lang === "TH" ? "ออกกำลังกาย 30 นาที เผาผลาญพอไหม?" : "Is 30 minutes of exercise enough?"}
          a={lang === "TH" ? "WHO แนะนำให้ออกกำลังกายระดับปานกลาง (เช่น เดินเร็ว) อย่างน้อย 150 นาที/สัปดาห์ หรือออกกำลังหนัก 75 นาที/สัปดาห์ การออก 30 นาทีต่อวัน 5 วันต่อสัปดาห์ถือว่าเพียงพอ | แหล่งอ้างอิง: WHO (2020). Physical Activity Guidelines." : "WHO recommends at least 150 min/week of moderate activity or 75 min/week of vigorous activity. 30 minutes/day, 5 days a week meets this guideline. Source: WHO (2020) Physical Activity Guidelines."}
        />
        <FAQItem
          q={lang === "TH" ? "ทำไมแอปนับก้าวกับเครื่องคำนวณนี้ได้ค่าต่างกัน?" : "Why does my fitness tracker show different results?"}
          a={lang === "TH" ? "แอปและอุปกรณ์สวมใส่ใช้เซ็นเซอร์ตรวจจับการเคลื่อนไหวจริง ซึ่งแม่นยำกว่าการคำนวณจาก MET ล้วนๆ เครื่องคำนวณนี้ใช้ค่าเฉลี่ยจากสูตร MET มาตรฐาน ซึ่งอาจมีความคลาดเคลื่อนได้ ±15-20% ขึ้นกับสรีระแต่ละคน" : "Fitness trackers use real-time sensors which are more accurate than pure MET formulas. This calculator uses standard MET averages with ±15-20% variation possible depending on individual physiology."}
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
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — โปรตีนต่อวัน" : "Daily Protein FAQ"}>
        <FAQItem
          q={lang === "TH" ? "ควรกินโปรตีนเท่าไหร่ต่อวัน?" : "How much protein should I eat per day?"}
          a={lang === "TH" ? "สำหรับคนทั่วไปที่ไม่ออกกำลังกาย WHO แนะนำ 0.8 g/kg/วัน สำหรับคนออกกำลังกาย 1.2-1.6 g/kg/วัน และสำหรับนักเพาะกาย/นักกีฬา 1.6-2.2 g/kg/วัน เช่น น้ำหนัก 70 kg ออกกำลังกายปานกลาง = 84-112 g/วัน | แหล่งอ้างอิง: Morton RW, et al. (2018). A systematic review, meta-analysis and meta-regression of protein supplementation. British Journal of Sports Medicine." : "For sedentary adults: 0.8 g/kg/day (WHO). For active people: 1.2-1.6 g/kg/day. For athletes: 1.6-2.2 g/kg/day. Example: 70kg, moderately active = 84-112g/day. Source: Morton et al. (2018) British Journal of Sports Medicine."}
        />
        <FAQItem
          q={lang === "TH" ? "กินโปรตีนมากเกินไปเป็นอันตรายไหม?" : "Is too much protein harmful?"}
          a={lang === "TH" ? "สำหรับคนที่ไตปกติ การบริโภคโปรตีนสูง 2-3 g/kg/วัน ไม่พบหลักฐานชัดเจนว่าเป็นอันตราย แต่ต้องดื่มน้ำเพิ่มขึ้น อย่างไรก็ตาม ผู้ที่มีโรคไตควรปรึกษาแพทย์ก่อนเสมอ | แหล่งอ้างอิง: Antonio J, et al. (2016). A High Protein Diet Has No Harmful Effects. Journal of Nutrition and Metabolism." : "For people with healthy kidneys, 2-3g/kg/day shows no harmful effects, though increased hydration is needed. Those with kidney disease should consult a doctor first. Source: Antonio et al. (2016) Journal of Nutrition and Metabolism."}
        />
        <FAQItem
          q={lang === "TH" ? "อาหารที่มีโปรตีนสูงมีอะไรบ้าง?" : "What foods are high in protein?"}
          a={lang === "TH" ? "แหล่งโปรตีนชั้นดี: อกไก่ (31g/100g), ปลาทูน่า (30g/100g), ไข่ขาว (11g/100g), เต้าหู้แข็ง (17g/100g), ถั่วดำ (9g/100g), กรีกโยเกิร์ต (10g/100g) สำหรับมังสวิรัติ ควรรวมแหล่งโปรตีนหลายชนิดเพื่อให้ครบกรดอะมิโนจำเป็น | แหล่งอ้างอิง: USDA FoodData Central Database." : "High-protein foods: Chicken breast (31g/100g), Tuna (30g/100g), Egg whites (11g/100g), Firm tofu (17g/100g), Greek yogurt (10g/100g). Vegetarians should combine sources for complete amino acids. Source: USDA FoodData Central."}
        />
      </SEOFAQ>
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
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — Body Fat %" : "Body Fat % FAQ"}>
        <FAQItem
          q={lang === "TH" ? "เปอร์เซ็นต์ไขมันในร่างกายที่ดีคือเท่าไหร่?" : "What is a healthy body fat percentage?"}
          a={lang === "TH" ? "สำหรับผู้ชาย: นักกีฬา 6-13%, ฟิต 14-17%, ปกติ 18-24%, อ้วน >25% | สำหรับผู้หญิง: นักกีฬา 16-20%, ฟิต 21-24%, ปกติ 25-31%, อ้วน >32% ผู้หญิงมีค่าสูงกว่าผู้ชายตามธรรมชาติเนื่องจากไขมันที่จำเป็นสำหรับระบบฮอร์โมน | แหล่งอ้างอิง: American Council on Exercise (ACE) Body Fat Classification." : "Men: Athlete 6-13%, Fitness 14-17%, Average 18-24%, Obese >25%. Women: Athlete 16-20%, Fitness 21-24%, Average 25-31%, Obese >32%. Women naturally have higher body fat for hormonal function. Source: American Council on Exercise (ACE)."}
        />
        <FAQItem
          q={lang === "TH" ? "US Navy Method วัดไขมันแม่นยำแค่ไหน?" : "How accurate is the US Navy Method?"}
          a={lang === "TH" ? "US Navy Method มีความแม่นยำ ±3-4% เมื่อเทียบกับ DEXA Scan ซึ่งถือเป็น Gold Standard วิธีนี้ใช้การวัดเส้นรอบวงร่างกายแทนการวัดไขมันโดยตรง จึงสะดวกและไม่ต้องใช้อุปกรณ์พิเศษ | แหล่งอ้างอิง: Hodgdon JA, Beckett MB. (1984). Prediction of percent body fat for US Navy men. Naval Health Research Center." : "The US Navy Method has ±3-4% accuracy compared to DEXA scan (the gold standard). It uses circumference measurements as a proxy for body fat, making it convenient without special equipment. Source: Hodgdon & Beckett (1984), Naval Health Research Center."}
        />
        <FAQItem
          q={lang === "TH" ? "ไขมันในร่างกายต่างจาก BMI อย่างไร?" : "How is body fat different from BMI?"}
          a={lang === "TH" ? "BMI คำนวณจากน้ำหนักและส่วนสูงเท่านั้น จึงไม่แยกแยะกล้ามเนื้อและไขมัน คนที่มีกล้ามเนื้อมากอาจมี BMI สูงแต่ % ไขมันต่ำ (เช่น นักยกน้ำหนัก) ในทางกลับกัน คนที่ BMI ปกติอาจมี % ไขมันสูงได้ (Skinny Fat) การวัด % ไขมันจึงแม่นยำกว่าในการประเมินสุขภาพ | แหล่งอ้างอิง: Romero-Corral A, et al. (2008). Accuracy of BMI to diagnose obesity. International Journal of Obesity." : "BMI only uses height and weight, not distinguishing muscle from fat. A muscular athlete may have high BMI but low body fat (Skinny Fat phenomenon). Body fat % is more accurate for health assessment. Source: Romero-Corral et al. (2008) International Journal of Obesity."}
        />
      </SEOFAQ>
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
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — อัตราส่วนเอวต่อสะโพก" : "WHR FAQ"}>
        <FAQItem
          q={lang === "TH" ? "ค่า WHR ที่ดีคือเท่าไหร่?" : "What is a healthy WHR?"}
          a={lang === "TH" ? "WHO กำหนดค่าเสี่ยงสูงคือ WHR > 0.90 สำหรับชาย และ > 0.85 สำหรับหญิง ค่าที่ดีคือต่ำกว่า 0.80 สำหรับหญิง และต่ำกว่า 0.90 สำหรับชาย การมีไขมันสะสมที่หน้าท้องเพิ่มความเสี่ยงต่อโรคหัวใจและเบาหวานชนิดที่ 2 | แหล่งอ้างอิง: WHO (2008). Waist Circumference and Waist-Hip Ratio: Report of a WHO Expert Consultation." : "WHO defines high risk as WHR >0.90 for men and >0.85 for women. Abdominal fat accumulation increases risk of heart disease and type 2 diabetes. Source: WHO (2008) Expert Consultation Report."}
        />
        <FAQItem
          q={lang === "TH" ? "WHR ต่างจากรอบเอวอย่างเดียวอย่างไร?" : "How is WHR different from waist circumference alone?"}
          a={lang === "TH" ? "การวัดรอบเอวเพียงอย่างเดียว (เกณฑ์เสี่ยง: ชาย > 90cm, หญิง > 80cm สำหรับเอเชีย) บอกปริมาณไขมันท้องสัมบูรณ์ ส่วน WHR บอกสัดส่วนการกระจายไขมันในร่างกาย การใช้ทั้ง 2 ค่าร่วมกันให้ภาพรวมที่สมบูรณ์กว่า | แหล่งอ้างอิง: International Diabetes Federation (2006). The IDF consensus worldwide definition of the metabolic syndrome." : "Waist circumference alone measures absolute abdominal fat (risk: men >90cm, women >80cm for Asians), while WHR shows fat distribution ratio. Using both together gives a more complete health picture. Source: IDF (2006) Metabolic Syndrome Consensus."}
        />
      </SEOFAQ>
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
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — โซนอัตราหัวใจ" : "Heart Rate Zones FAQ"}>
        <FAQItem
          q={lang === "TH" ? "โซนไหนที่ดีที่สุดสำหรับเผาผลาญไขมัน?" : "Which zone is best for fat burning?"}
          a={lang === "TH" ? "Zone 2 (60-70% Max HR) ถือว่าเป็นโซนเผาผลาญไขมันที่ดีที่สุด ร่างกายใช้ไขมันเป็นแหล่งพลังงานหลักมากที่สุด (60-65%) ในโซนนี้ สามารถออกได้นานโดยไม่เหนื่อย เหมาะสำหรับเดินเร็ว/จักรยาน | แหล่งอ้างอิง: Karvonen M, Kentala E, Mustala O. (1957). The effects of training on heart rate. Annales Medicinae Experimentalis." : "Zone 2 (60-70% Max HR) is optimal for fat burning — the body uses fat as the primary fuel source (60-65%) in this zone. You can sustain it for long periods without exhaustion. Great for walking/cycling. Source: Karvonen et al. (1957)."}
        />
        <FAQItem
          q={lang === "TH" ? "สูตร 220 – อายุ แม่นยำแค่ไหน?" : "How accurate is the 220-age formula?"}
          a={lang === "TH" ? "สูตร 220 – อายุ เป็นการประมาณค่าโดยกว้าง มีความคลาดเคลื่อน ±10-12 bpm เนื่องจากความแตกต่างระหว่างบุคคล สูตรที่แม่นยำกว่าคือ Tanaka (2001): MaxHR = 208 – (0.7 × อายุ) แต่สำหรับการออกกำลังกายทั่วไป 220 – อายุ ยังเป็นที่นิยมใช้มากที่สุด | แหล่งอ้างอิง: Tanaka H, Monahan KD, Seals DR. (2001). Age-predicted maximal heart rate revisited. JACC." : "The 220-age formula is a rough estimate with ±10-12 bpm variation between individuals. The more accurate Tanaka formula (2001): MaxHR = 208 – (0.7 × age). However, 220-age remains the most widely used. Source: Tanaka et al. (2001) JACC."}
        />
      </SEOFAQ>
    </div>
  );
}
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
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — Macro Split" : "Macro FAQ"}>
        <FAQItem
          q={lang === "TH" ? "Macro คืออะไร สำคัญแค่ไหน?" : "What are macros and why do they matter?"}
          a={lang === "TH" ? "Macronutrients คือสารอาหาร  3 หลัก: คาร์บ (4 kcal/g) = พลังงานหลักของร่างกายและสมอง, โปรตีน (4 kcal/g) = สร้างและซ่อมแซมกล้ามเนื้อ, ไขมัน (9 kcal/g) = สร้างเซลล์และผลิตฮอร์โมน การเข้าใจสัดส่วนช่วยให้ร่างกายเริ่มดีและตรงตามเป้าหมาย | แหล่งอ้างอิง: USDA Dietary Reference Intakes (DRI) 2020." : "Macronutrients are 3 main nutrients: Carbs (4 kcal/g) = primary fuel, Protein (4 kcal/g) = muscle building, Fat (9 kcal/g) = hormones & cell structure. Understanding ratios helps achieve body composition goals more effectively. Source: USDA DRI 2020."}
        />
        <FAQItem
          q={lang === "TH" ? "สัดส่วนที่ดีที่สุดสำหรับลดน้ำหนักคืออะไร?" : "What macro split is best for fat loss?"}
          a={lang === "TH" ? "สำหรับลดไขมัน: โปรตีนสูง (30-40%) ช่วยรักษากล้ามเนื้อขณะลดแคลอรี่ คาร์บต่ำ (25-35%) ช่วยลดการสร้างน้ำตาล และไขมันปานกลาง (30%) ช่วยควบคุมความอิ่ม | แหล่งอ้างอิง: Helms ER, et al. (2014). Evidence-based recommendations for natural bodybuilding. Journal of the International Society of Sports Nutrition." : "For fat loss: High protein (30-40%) preserves muscle during caloric deficit, low carb (25-35%) reduces insulin spikes, moderate fat (30%) promotes satiety. Source: Helms et al. (2014) Journal of the International Society of Sports Nutrition."}
        />
      </SEOFAQ>
    </div>
  );
}

// 7. แปลงค่าน้ำตาลในเลือด (Blood Sugar Converter)
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
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย — น้ำตาลในเลือด" : "Blood Sugar FAQ"}>
        <FAQItem
          q={lang === "TH" ? "ค่าน้ำตาลในเลือดปกติคือเท่าไหร่?" : "What are normal blood sugar levels?"}
          a={lang === "TH" ? "ค่าปกติ (งดอาหาร ≥ 8 ชม.): 70-99 mg/dL (3.9-5.5 mmol/L) | เสี่ยงเป็นเบาหวาน: 100-125 mg/dL (5.6-6.9 mmol/L) | เบาหวาน: ≥ 126 mg/dL (7.0 mmol/L) หลังอาหาร  2 ชม. ค่าปกติคือ < 140 mg/dL (7.8 mmol/L) สำหรับคนที่ไม่เป็นเบาหวาน | แหล่งอ้างอิง: American Diabetes Association (ADA) Standards of Medical Care in Diabetes 2024." : "Normal (fasting ≥8 hrs): 70-99 mg/dL (3.9-5.5 mmol/L). Pre-diabetes: 100-125 mg/dL. Diabetes: ≥126 mg/dL. 2-hour post-meal normal: <140 mg/dL. Source: American Diabetes Association Standards 2024."}
        />
        <FAQItem
          q={lang === "TH" ? "mg/dL กับ mmol/L ต่างกันอย่างไร?" : "What is the difference between mg/dL and mmol/L?"}
          a={lang === "TH" ? "mg/dL (milligrams per deciliter) สุดนิยมใช้ในสหรัฐอเมริกา, ไทย และอีกหลายประเทศ ส่วน mmol/L (millimoles per liter) นิยมใช้ในยุโรป, ออสเตรเลีย, แคนาดา สูตรแปลง: mg/dL ÷ 18 = mmol/L | แหล่งอ้างอิง: WHO (2006). Definition and Diagnosis of Diabetes Mellitus." : "mg/dL is used in USA, Thailand, and several countries. mmol/L is used in Europe, Australia, Canada. Conversion: mg/dL ÷ 18 = mmol/L. Source: WHO (2006) Definition and Diagnosis of Diabetes Mellitus."}
        />
      </SEOFAQ>
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
      <SEOFAQ title={lang==="TH"?"FAQ — น้ำหนักอุดมคติ":"IBW FAQ"}>
        <FAQItem q={lang==="TH"?"IBW คืออะไร ต่างจาก BMI อย่างไร?":"What is IBW vs BMI?"} a={lang==="TH"?"IBW (Ideal Body Weight) คือน้ำหนักเป้าหมายที่คำนวณจากส่วนสูงและเพศ ใช้ในวงการแพทย์เพื่อคำนวณขนาดยา ส่วน BMI ใช้ประเมินความเสี่ยงสุขภาพ IBW ไม่ได้หมายความว่าทุกคนต้องมีน้ำหนักเท่านี้ | อ้างอิง: Devine BJ. (1974). Gentamicin therapy. Drug Intelligence & Clinical Pharmacy.":"IBW is the target weight calculated from height/sex, used clinically for drug dosing. BMI assesses health risk. IBW is not a strict target for everyone. Source: Devine BJ. (1974)."} />
        <FAQItem q={lang==="TH"?"สูตรไหนแม่นที่สุด?":"Which IBW formula is most accurate?"} a={lang==="TH"?"ไม่มีสูตรใดที่แม่นยำที่สุดสำหรับทุกคน Devine (1974) นิยมใช้ในการแพทย์ทั่วไป Robinson (1983) แม่นยำสำหรับคนเอเชียมากกว่า ค่าเฉลี่ยจากทุกสูตรให้ภาพรวมที่ดีที่สุด | อ้างอิง: Robinson JD, et al. (1983). Determination of ideal body weight. American Journal of Hospital Pharmacy.":"No formula is universally best. Devine (1974) is most used clinically; Robinson (1983) may be more accurate for Asians. Using the average of all formulas gives the best estimate. Source: Robinson et al. (1983)."} />
      </SEOFAQ>
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
      <SEOFAQ title={lang==="TH"?"FAQ — ก้าวเดิน":"Steps FAQ"}>
        <FAQItem q={lang==="TH"?"10,000 ก้าวต่อวันจริงไหมว่าดีต่อสุขภาพ?":"Is 10,000 steps/day really the target?"} a={lang==="TH"?"ตัวเลข 10,000 ก้าวมาจากแคมเปญการตลาดของญี่ปุ่นในปี 1960 ไม่ใช่งานวิจัย งานวิจัยปัจจุบันพบว่า 7,000-8,000 ก้าวต่อวันก็ลดความเสี่ยงการเสียชีวิตได้อย่างมีนัยสำคัญ | อ้างอิง: Paluch AE, et al. (2021). Steps per Day and All-Cause Mortality in Adults. JAMA Network Open.":"10,000 steps originated from a 1960s Japanese marketing campaign, not research. Studies show 7,000-8,000 steps/day significantly reduces mortality risk. Source: Paluch et al. (2021) JAMA Network Open."} />
      </SEOFAQ>
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
      <SEOFAQ title={lang==="TH"?"FAQ — 1RM":"1RM FAQ"}>
        <FAQItem q={lang==="TH"?"1RM คืออะไร ใช้ทำอะไร?":"What is 1RM used for?"} a={lang==="TH"?"1RM (One Repetition Maximum) คือน้ำหนักสูงสุดที่คุณยกได้ 1 ครั้ง ใช้กำหนดโปรแกรมเทรนนิ่ง เช่น ยกที่ 70% 1RM = Hypertrophy, 85%+ = Strength training | อ้างอิง: Baechle TR, Earle RW. (2008). Essentials of Strength Training and Conditioning. NSCA.":"1RM (One Repetition Maximum) is the max weight lifted once. Used to program training: 70% 1RM = Hypertrophy, 85%+ = Strength. Source: Baechle & Earle (2008) NSCA."} />
        <FAQItem q={lang==="TH"?"ทดสอบ 1RM โดยตรงปลอดภัยไหม?":"Is testing 1RM directly safe?"} a={lang==="TH"?"การทดสอบ 1RM โดยตรงมีความเสี่ยงบาดเจ็บ โดยเฉพาะสำหรับผู้เริ่มต้น การใช้สูตรประมาณการเช่น Brzycki หรือ Epley จากน้ำหนักที่ยกได้ 3-10 ครั้ง ปลอดภัยกว่ามาก | อ้างอิง: Brzycki M. (1993). Strength testing: Predicting a one-rep max. JOPERD.":"Direct 1RM testing risks injury, especially for beginners. Using estimation formulas like Brzycki or Epley from 3-10 rep sets is much safer. Source: Brzycki (1993) JOPERD."} />
      </SEOFAQ>
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
      <SEOFAQ title={lang==="TH"?"FAQ — Pace วิ่ง":"Running Pace FAQ"}>
        <FAQItem q={lang==="TH"?"Pace วิ่งที่ดีสำหรับคนทั่วไปคือเท่าไหร่?":"What is a good running pace?"} a={lang==="TH"?"สำหรับผู้เริ่มต้น pace 8-10 นาที/กม. ถือว่าดี สำหรับนักวิ่งระดับกลาง 5-7 นาที/กม. และนักวิ่งแข่งขัน 3:30-5:00 นาที/กม. มาราธอน Sub-4 ชม. ต้องการ pace ประมาณ 5:41/กม. | อ้างอิง: Daniels J. (2014). Daniels' Running Formula. Human Kinetics.":"For beginners: 8-10 min/km is good. Intermediate: 5-7 min/km. Competitive: 3:30-5:00 min/km. Sub-4 hour marathon requires ~5:41/km pace. Source: Daniels (2014) Running Formula."} />
        <FAQItem q={lang==="TH"?"Pace กับ Speed ต่างกันอย่างไร?":"Pace vs Speed: what's the difference?"} a={lang==="TH"?"Pace = เวลาต่อระยะทาง (นาที/กม.) ใช้ในการวิ่ง Speed = ระยะทางต่อเวลา (กม./ชม.) ใช้ทั่วไปกว่า แปลงสูตร: Speed (km/h) = 60 ÷ Pace (min/km) เช่น Pace 6:00/กม. = 10 กม./ชม. | อ้างอิง: Noakes T. (2002). Lore of Running. Human Kinetics.":"Pace = time per distance (min/km) used in running. Speed = distance per time (km/h). Formula: Speed (km/h) = 60 ÷ Pace (min/km). E.g. 6:00/km = 10 km/h. Source: Noakes (2002) Lore of Running."} />
      </SEOFAQ>
    </div>
  );
}
