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
    </div>
  );
}
