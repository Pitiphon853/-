"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

// 1. Fermentation Time
export function FermentationTimeCalculator({ lang }: { lang: Lang }) {
  const [temp, setTemp] = useLocalState("ferm_temp", "");
  const [baseTime, setBaseTime] = useLocalState("ferm_time", "");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseFloat(temp);
    const bt = parseFloat(baseTime);
    if (!isNaN(t) && !isNaN(bt)) {
      // Rough estimation: Q10 temperature coefficient (rate doubles for every 10C)
      // Assuming base time is at 25C
      const diff = 25 - t;
      const factor = Math.pow(2, diff / 10);
      setRes((bt * factor).toFixed(1));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณระยะเวลาหมักดอง" : "Fermentation Time"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "อุณหภูมิปัจจุบัน (°C)" : "Current Temp (°C)"}</label>
          <input type="number" step="0.1" value={temp} onChange={e=>setTemp(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เวลาหมักมาตรฐานที่ 25°C (วัน)" : "Standard Time at 25°C (Days)"}</label>
          <input type="number" step="0.1" value={baseTime} onChange={e=>setBaseTime(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang === "TH" ? "คำนวณเวลา" : "Calculate"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "เวลาหมักที่เหมาะสม" : "Estimated Time"}</p>
          <div className="text-4xl font-black text-green-600">{res} {lang === "TH" ? "วัน" : "Days"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <SEOFAQ title={lang === "TH" ? "การหมักดอง (FAQ)" : "Fermentation FAQ"}>
        <FAQItem q={lang === "TH" ? "อุณหภูมิมีผลอย่างไร?" : "How does temp affect it?"} a={lang === "TH" ? "อุณหภูมิสูงขึ้น เชื้อจะทำงานเร็วขึ้น ทำให้ใช้เวลาน้อยลง" : "Higher temp speeds up the process."} />
      </SEOFAQ>
    </div>
  );
}

// 2. Food Energy (Joule <-> kcal)
export function FoodEnergyCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("food_energy", "");
  const [unit, setUnit] = useLocalState("food_unit", "kcal");

  const kcal = unit === "kcal" ? parseFloat(val) : parseFloat(val) / 4.184;
  const joule = unit === "joule" ? parseFloat(val) : parseFloat(val) * 4.184;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณพลังงานอาหาร" : "Food Energy"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "พลังงาน" : "Energy"}</label>
          <div className="flex gap-2">
            <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
            <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
              <option value="kcal">kcal</option>
              <option value="joule">kJ</option>
            </select>
          </div>
        </div>
      </div>
      {val && !isNaN(parseFloat(val)) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div><p className="text-gray-500">Kilocaloies</p><p className="text-2xl font-black">{kcal.toFixed(2)} kcal</p></div>
            <div><p className="text-gray-500">Kilojoules</p><p className="text-2xl font-black">{joule.toFixed(2)} kJ</p></div>
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — พลังงานอาหาร":"Food Energy FAQ"}>
          <FAQItem q={lang==="TH"?"kcal กับ kJ ต่างกันอย่างไร? ใช้แบบไหนดี?":"What's the difference between kcal and kJ?"} a={lang==="TH"?"kcal (Kilocalorie) นิยมใช้ในไทย สหรัฐอเมริกา และหลายประเทศ ส่วน kJ (Kilojoule) นิยมใช้ในออสเตรเลีย ยุโรป และเป็นหน่วย SI อย่างเป็นทางการ สูตรแปลง: 1 kcal = 4.184 kJ ฉลากอาหารไทย (อย.) ต้องแสดงทั้ง 2 หน่วย | อ้างอิง: USDA National Nutrient Database; สำนักงานคณะกรรมการอาหารและยา (อย.) — ข้อกำหนดฉลากโภชนาการ.":"kcal is used in Thailand/USA, kJ (SI unit) in Australia/EU. 1 kcal = 4.184 kJ. Thai food labels (FDA) must show both. | Source: USDA; Thai FDA Labeling Requirements."} />
          <FAQItem q={lang==="TH"?"คนเราต้องการพลังงานวันละกี่ kcal?":"How many kcal does a person need daily?"} a={lang==="TH"?"ผู้ชายเฉลี่ย 2,000-2,500 kcal/วัน ผู้หญิงเฉลี่ย 1,600-2,000 kcal/วัน ขึ้นอยู่กับอายุ น้ำหนัก ส่วนสูง และระดับกิจกรรม สำหรับคนไทย กรมอนามัยแนะนำ 2,000 kcal/วัน เป็นฐาน | อ้างอิง: กรมอนามัย กระทรวงสาธารณสุข — ปริมาณสารอาหารอ้างอิงที่ควรได้รับประจำวัน (DRI).":"Men: 2,000-2,500 kcal/day, Women: 1,600-2,000 kcal/day depending on age, weight, height, activity. Thai Dept. of Health recommends 2,000 kcal/day baseline. | Source: Thai Dept. of Health — DRI."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Fertilizer
export function FertilizerCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("fert_area", "");
  const [rate, setRate] = useLocalState("fert_rate", "");
  
  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณปุ๋ยต่อไร่" : "Fertilizer per Rai"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ (ไร่)" : "Area (Rai)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "อัตราการใช้ (กก./ไร่)" : "Rate (kg/Rai)"}</label><input type="number" value={rate} onChange={e=>setRate(e.target.value)} className={inputClass} /></div>
      </div>
      {area && rate && !isNaN(parseFloat(area)*parseFloat(rate)) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ปริมาณปุ๋ยที่ต้องใช้" : "Total Fertilizer Needed"}</p>
          <div className="text-4xl font-black text-green-600">{(parseFloat(area) * parseFloat(rate)).toFixed(2)} {lang === "TH" ? "กก." : "kg"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ปุ๋ย":"Fertilizer FAQ"}>
          <FAQItem q={lang==="TH"?"ตัวเลข N-P-K บนถุงปุ๋ยหมายความว่าอย่างไร?":"What do N-P-K numbers on fertilizer bags mean?"} a={lang==="TH"?"N = ไนโตรเจน (ช่วยใบเขียว), P = ฟอสฟอรัส (ช่วยราก/ดอก/ผล), K = โพแทสเซียม (ช่วยลำต้นแข็งแรง/ทนโรค) เช่น ปุ๋ย 16-16-16 มีธาตุอาหารละ 16% รวม 48% ส่วนที่เหลือ 52% เป็นสารเติมแต่ง | อ้างอิง: กรมวิชาการเกษตร — คู่มือการใช้ปุ๋ยเคมี; FAO — Fertilizer Use Guidelines.":"N = Nitrogen (leaf growth), P = Phosphorus (roots/flowers/fruit), K = Potassium (stem strength/disease resistance). 16-16-16 = 16% each nutrient, 52% filler. | Source: Thai Dept. of Agriculture; FAO Fertilizer Guidelines."} />
          <FAQItem q={lang==="TH"?"ควรใส่ปุ๋ยกี่ครั้งต่อปี?":"How often should I fertilize?"} a={lang==="TH"?"ขึ้นอยู่กับชนิดพืช: ข้าว 2-3 ครั้ง/ฤดู, ผักสวนครัว ทุก 2-4 สัปดาห์, ไม้ผล 2-4 ครั้ง/ปี ควรวิเคราะห์ดินก่อนใส่ปุ๋ยเพื่อไม่ให้เปลืองและไม่ทำลายดิน | อ้างอิง: สำนักวิจัยและพัฒนาการเกษตร — คำแนะนำการใช้ปุ๋ยตามค่าวิเคราะห์ดิน.":"Depends on crop: Rice 2-3 times/season, Vegetables every 2-4 weeks, Fruit trees 2-4 times/year. Soil testing before fertilizing is recommended. | Source: Thai Agricultural Research Development."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Irrigation Water
export function IrrigationCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("irr_area", "");
  const [mm, setMm] = useLocalState("irr_mm", "");
  // 1 rai = 1600 sq m. 1 mm over 1 sq m = 1 liter.
  const liters = parseFloat(area) * 1600 * parseFloat(mm);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณน้ำชลประทาน" : "Irrigation Water"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ (ไร่)" : "Area (Rai)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความต้องการน้ำ (มม.)" : "Water Need (mm)"}</label><input type="number" value={mm} onChange={e=>setMm(e.target.value)} className={inputClass} /></div>
      </div>
      {area && mm && !isNaN(liters) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ปริมาณน้ำที่ต้องใช้" : "Total Water Needed"}</p>
          <div className="text-4xl font-black text-blue-600">{liters.toLocaleString()} {lang === "TH" ? "ลิตร" : "Liters"}</div>
          <p className="text-sm text-gray-500 mt-2">{(liters / 1000).toLocaleString()} {lang === "TH" ? "ลูกบาศก์เมตร (คิว)" : "Cubic Meters"}</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ชลประทาน":"Irrigation FAQ"}>
          <FAQItem q={lang==="TH"?"1 ไร่ ต้องใช้น้ำกี่ลิตรต่อวัน?":"How much water does 1 rai need per day?"} a={lang==="TH"?"ขึ้นอยู่กับชนิดพืชและฤดูกาล: ข้าวนาปี 8-10 มม./วัน (12,800-16,000 ลิตร/ไร่/วัน), ผักทั่วไป 3-5 มม./วัน, ไม้ผล 5-8 มม./วัน ฤดูร้อนอาจต้องเพิ่ม 20-30% สูตร: 1 มม. น้ำ × 1,600 ตร.ม./ไร่ = 1,600 ลิตร | อ้างอิง: กรมชลประทาน — ความต้องการน้ำของพืช (Crop Water Requirement); FAO Irrigation and Drainage Paper No. 56.":"Depends on crop/season: Rice 8-10 mm/day (12,800-16,000 L/rai/day), Vegetables 3-5 mm/day, Fruit trees 5-8 mm/day. Summer +20-30%. Formula: 1mm × 1,600 m²/rai = 1,600L. | Source: Thai Royal Irrigation Dept.; FAO Paper No. 56."} />
          <FAQItem q={lang==="TH"?"ระบบน้ำหยดประหยัดน้ำได้มากแค่ไหน?":"How much water does drip irrigation save?"} a={lang==="TH"?"ระบบน้ำหยด (Drip Irrigation) ประหยัดน้ำ 30-60% เทียบกับการปล่อยน้ำท่วมแปลง เพราะส่งน้ำตรงจุดรากพืช ลดการระเหย ข้อมูลจากอิสราเอลแสดงว่าผลผลิตเพิ่ม 20-90% เมื่อใช้ระบบน้ำหยด | อ้างอิง: ICRISAT — Drip Irrigation Technology; Netafim (Israel) — Agricultural Research Data.":"Drip irrigation saves 30-60% water vs. flood irrigation by targeting root zones. Israeli data shows 20-90% yield increase with drip systems. | Source: ICRISAT; Netafim Research Data."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Crop Yield
export function YieldCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("yield_area", "");
  const [yieldPerRai, setYieldPerRai] = useLocalState("yield_rate", "");
  const [price, setPrice] = useLocalState("yield_price", "");

  const totalYield = parseFloat(area) * parseFloat(yieldPerRai);
  const income = totalYield * parseFloat(price);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณผลผลิตต่อไร่" : "Crop Yield"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ (ไร่)" : "Area (Rai)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ผลผลิตเฉลี่ย (กก./ไร่)" : "Yield (kg/Rai)"}</label><input type="number" value={yieldPerRai} onChange={e=>setYieldPerRai(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย (บาท/กก.)" : "Price (฿/kg)"}</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} className={inputClass} /></div>
      </div>
      {area && yieldPerRai && price && !isNaN(income) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "รายได้คาดการณ์" : "Expected Income"}</p>
          <div className="text-4xl font-black text-green-600">฿{income.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-2">{lang === "TH" ? "ผลผลิตรวม:" : "Total Yield:"} {totalYield.toLocaleString()} kg</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ผลผลิตพืช":"Crop Yield FAQ"}>
          <FAQItem q={lang==="TH"?"ผลผลิตข้าวเฉลี่ยของไทยอยู่ที่เท่าไร?":"What is Thailand's average rice yield?"} a={lang==="TH"?"ข้าวนาปีไทยเฉลี่ย 450-500 กก./ไร่ ข้าวนาปรังเฉลี่ย 700-800 กก./ไร่ เปรียบเทียบกับจีน 680 กก./ไร่ (นาปี) และเวียดนาม 600 กก./ไร่ ผลผลิตขึ้นอยู่กับพันธุ์ ปุ๋ย น้ำ และการจัดการศัตรูพืช | อ้างอิง: สำนักงานเศรษฐกิจการเกษตร (สศก.) — สถิติการเกษตรของประเทศไทย (2023); FAO FAOSTAT Rice Production.":"Thai wet-season rice averages 450-500 kg/rai, dry-season 700-800 kg/rai. Compare: China 680 kg/rai, Vietnam 600 kg/rai. Yield depends on variety, fertilizer, water, pest management. | Source: Thai Office of Agricultural Economics (2023); FAO FAOSTAT."} />
          <FAQItem q={lang==="TH"?"วิธีเพิ่มผลผลิตต่อไร่?":"How to increase yield per rai?"} a={lang==="TH"?"1) ใช้พันธุ์ที่เหมาะสมกับพื้นที่ 2) วิเคราะห์ดินและใส่ปุ๋ยตามความต้องการ 3) จัดการน้ำอย่างมีประสิทธิภาพ (AWD method) 4) ป้องกันศัตรูพืชแบบ IPM 5) ปลูกในช่วงเวลาที่เหมาะสม งานวิจัยจาก IRRI แสดงว่าเทคนิค SRI (System of Rice Intensification) เพิ่มผลผลิตได้ 20-50% | อ้างอิง: IRRI — System of Rice Intensification (SRI); กรมวิชาการเกษตร — เทคโนโลยีการเพิ่มผลผลิต.":"1) Use suitable varieties 2) Soil-test-based fertilizing 3) Efficient water management (AWD) 4) IPM pest control 5) Optimal planting timing. IRRI research shows SRI techniques increase yield 20-50%. | Source: IRRI — SRI; Thai Dept. of Agriculture."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
