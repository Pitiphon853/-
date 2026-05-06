"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. House Paint
export function HousePaintCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("paint_area", "");
  // Average coverage is 9-10 sq m per liter per coat
  const [coats, setCoats] = useLocalState("paint_coats", "2");
  
  const liters = (parseFloat(area) / 9) * parseFloat(coats);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "คำนวณสีทาบ้าน" : "House Paint"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ผนัง (ตร.ม.)" : "Wall Area (sq m)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนรอบที่ทา" : "Number of Coats"}</label><input type="number" value={coats} onChange={e=>setCoats(e.target.value)} className={inputClass} /></div>
      </div>
      {area && coats && !isNaN(liters) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ปริมาณสีที่ต้องใช้ (โดยประมาณ)" : "Estimated Paint Needed"}</p>
          <div className="text-4xl font-black text-amber-600">{Math.ceil(liters)} {lang === "TH" ? "ลิตร" : "Liters"}</div>
          <p className="text-sm text-gray-500 mt-2">{lang === "TH" ? "(ประมาณ" : "(approx"} {(liters / 3.785).toFixed(1)} {lang === "TH" ? "แกลลอน)" : "Gallons)"}</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 2. Cement
export function CementCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("cement_area", "");
  const [thickness, setThickness] = useLocalState("cement_thick", "0.1"); // meters
  
  // 1 cubic meter of concrete needs approx 320kg cement (general mix)
  const volume = parseFloat(area) * parseFloat(thickness);
  const bags = Math.ceil((volume * 320) / 50); // 50kg bags

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "คำนวณปูนซีเมนต์" : "Cement Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ (ตร.ม.)" : "Area (sq m)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความหนา (เมตร)" : "Thickness (m)"}</label><input type="number" step="0.01" value={thickness} onChange={e=>setThickness(e.target.value)} className={inputClass} /></div>
      </div>
      {area && thickness && !isNaN(volume) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "จำนวนปูน (ถุง 50กก.)" : "Cement Bags (50kg)"}</p>
          <div className="text-4xl font-black text-amber-600">{bags} {lang === "TH" ? "ถุง" : "Bags"}</div>
          <p className="text-sm text-gray-500 mt-2">Volume: {volume.toFixed(2)} m³</p>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 3. Wallpaper
export function WallpaperCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useLocalState("wall_w", "");
  const [height, setHeight] = useLocalState("wall_h", "");
  
  // Standard roll is usually 0.53m x 10m = 5.3 sq m. Real coverage is about 4.5
  const area = parseFloat(width) * parseFloat(height);
  const rolls = Math.ceil(area / 4.5);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "คำนวณวอลเปเปอร์" : "Wallpaper"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "ความกว้างผนังรวม (ม.)" : "Total Width (m)"}</label><input type="number" value={width} onChange={e=>setWidth(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ความสูงผนัง (ม.)" : "Height (m)"}</label><input type="number" value={height} onChange={e=>setHeight(e.target.value)} className={inputClass} /></div>
      </div>
      {width && height && !isNaN(rolls) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "จำนวนม้วนที่ต้องใช้" : "Rolls Needed"}</p>
          <div className="text-4xl font-black text-amber-600">{rolls} {lang === "TH" ? "ม้วน" : "Rolls"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 4. Roof Area
export function RoofAreaCalculator({ lang }: { lang: Lang }) {
  const [baseArea, setBaseArea] = useLocalState("roof_base", "");
  const [pitch, setPitch] = useLocalState("roof_pitch", "30"); // degrees
  
  // Roof Area = Base Area / cos(pitch)
  const area = parseFloat(baseArea) / Math.cos(parseFloat(pitch) * Math.PI / 180);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "คำนวณพื้นที่หลังคา" : "Roof Area"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่พื้นดินอาคาร (ตร.ม.)" : "Base Area (sq m)"}</label><input type="number" value={baseArea} onChange={e=>setBaseArea(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "องศาความชันหลังคา (°)" : "Pitch Angle (°)"}</label><input type="number" value={pitch} onChange={e=>setPitch(e.target.value)} className={inputClass} /></div>
      </div>
      {baseArea && pitch && !isNaN(area) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "พื้นที่หลังคาโดยประมาณ" : "Estimated Roof Area"}</p>
          <div className="text-4xl font-black text-amber-600">{area.toFixed(2)} {lang === "TH" ? "ตร.ม." : "sq m"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 5. Water Tank
export function WaterTankCalculator({ lang }: { lang: Lang }) {
  const [people, setPeople] = useLocalState("tank_people", "");
  const [days, setDays] = useLocalState("tank_days", "3"); 
  
  // Average use 200 liters per person per day
  const liters = parseFloat(people) * 200 * parseFloat(days);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณถังเก็บน้ำ" : "Water Tank"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนคนในบ้าน" : "People in House"}</label><input type="number" value={people} onChange={e=>setPeople(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "สำรองน้ำกี่วัน" : "Reserve Days"}</label><input type="number" value={days} onChange={e=>setDays(e.target.value)} className={inputClass} /></div>
      </div>
      {people && days && !isNaN(liters) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ขนาดถังน้ำที่แนะนำ" : "Recommended Tank Size"}</p>
          <div className="text-4xl font-black text-blue-600">{liters.toLocaleString()} {lang === "TH" ? "ลิตร" : "Liters"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 6. Pool Volume
export function PoolVolumeCalculator({ lang }: { lang: Lang }) {
  const [length, setLength] = useLocalState("pool_l", "");
  const [width, setWidth] = useLocalState("pool_w", "");
  const [depth, setDepth] = useLocalState("pool_d", "");
  
  const volume = parseFloat(length) * parseFloat(width) * parseFloat(depth);
  const liters = volume * 1000;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600">{lang === "TH" ? "คำนวณสระว่ายน้ำ" : "Pool Volume"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ยาว (ม.)" : "Length (m)"}</label><input type="number" value={length} onChange={e=>setLength(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "กว้าง (ม.)" : "Width (m)"}</label><input type="number" value={width} onChange={e=>setWidth(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "ความลึกเฉลี่ย (ม.)" : "Avg Depth (m)"}</label><input type="number" value={depth} onChange={e=>setDepth(e.target.value)} className={inputClass} /></div>
      </div>
      {length && width && depth && !isNaN(liters) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ปริมาตรน้ำ" : "Water Volume"}</p>
          <div className="text-4xl font-black text-blue-600">{liters.toLocaleString()} {lang === "TH" ? "ลิตร" : "Liters"}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 7. Insulation
export function InsulationCalculator({ lang }: { lang: Lang }) {
  const [tempOut, setTempOut] = useLocalState("ins_out", "");
  const [tempIn, setTempIn] = useLocalState("ins_in", "25");
  
  const rValue = (parseFloat(tempOut) - parseFloat(tempIn)) / 2; // simplified mock metric

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "คำนวณฉนวนกันความร้อน" : "Insulation R-Value"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "อุณหภูมิภายนอกสูงสุด (°C)" : "Max Outside Temp (°C)"}</label><input type="number" value={tempOut} onChange={e=>setTempOut(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "อุณหภูมิภายในที่ต้องการ (°C)" : "Desired Inside Temp (°C)"}</label><input type="number" value={tempIn} onChange={e=>setTempIn(e.target.value)} className={inputClass} /></div>
      </div>
      {tempOut && tempIn && !isNaN(rValue) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "ค่า R-Value ที่แนะนำ (โดยประมาณ)" : "Recommended R-Value"}</p>
          <div className="text-4xl font-black text-amber-600">R-{Math.max(1, Math.round(rValue))}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 8. Renovation Cost
export function RenovationCostCalculator({ lang }: { lang: Lang }) {
  const [area, setArea] = useLocalState("reno_area", "");
  const [grade, setGrade] = useLocalState("reno_grade", "medium");
  
  let psqm = 10000;
  if(grade === "low") psqm = 5000;
  if(grade === "high") psqm = 20000;

  const cost = parseFloat(area) * psqm;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-amber-600">{lang === "TH" ? "ค่าใช้จ่ายรีโนเวท" : "Renovation Cost"}</h2>
      <div className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "พื้นที่ (ตร.ม.)" : "Area (sq m)"}</label><input type="number" value={area} onChange={e=>setArea(e.target.value)} className={inputClass} /></div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เกรดวัสดุ" : "Material Grade"}</label>
          <select value={grade} onChange={e=>setGrade(e.target.value)} className={inputClass}>
            <option value="low">{lang === "TH" ? "ประหยัด" : "Economy"}</option>
            <option value="medium">{lang === "TH" ? "ปานกลาง" : "Standard"}</option>
            <option value="high">{lang === "TH" ? "พรีเมียม" : "Premium"}</option>
          </select>
        </div>
      </div>
      {area && !isNaN(cost) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-amber-50 rounded-xl text-center">
          <p className="text-gray-600">{lang === "TH" ? "งบประมาณประเมิน" : "Estimated Budget"}</p>
          <div className="text-4xl font-black text-amber-600">฿{cost.toLocaleString()}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}
