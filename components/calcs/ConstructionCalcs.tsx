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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สีทาบ้าน":"House Paint FAQ"}>
          <FAQItem q={lang==="TH"?"สีทาบ้าน 1 ลิตรทาได้กี่ตารางเมตร?":"How many sq m does 1 liter of paint cover?"} a={lang==="TH"?"โดยเฉลี่ยสีทาบ้าน 1 ลิตรทาได้ 9-12 ตร.ม. ต่อรอบ ขึ้นอยู่กับยี่ห้อ ชนิดสี และสภาพผนัง ผนังใหม่ดูดสีมากกว่าผนังเก่า ควรทาอย่างน้อย 2 รอบ รอแห้ง 2-4 ชม. ระหว่างรอบ | อ้างอิง: TOA Paint — คู่มือการใช้สี; Nippon Paint — Paint Coverage Guide.":"Average 9-12 sq m per liter per coat. Depends on brand, type, and wall condition. New walls absorb more. Apply at least 2 coats, 2-4 hrs drying between coats. | Source: TOA Paint; Nippon Paint Coverage Guide."} />
          <FAQItem q={lang==="TH"?"สีน้ำกับสีน้ำมันต่างกันอย่างไร?":"What's the difference between latex and oil-based paint?"} a={lang==="TH"?"สีน้ำ (Latex/Acrylic): แห้งเร็ว กลิ่นน้อย ทำความสะอาดง่าย เหมาะกับภายใน / สีน้ำมัน (Oil-based): ทนทานกว่า กันน้ำดี เหมาะกับภายนอกและพื้นที่ชื้น แต่มีสาร VOC สูงกว่า | อ้างอิง: EPA — Volatile Organic Compounds in Paints; มอก. 2321 มาตรฐานสีทาอาคาร.":"Latex: Quick dry, low odor, easy cleanup, best for interior. Oil-based: More durable, water-resistant, for exterior/wet areas but higher VOC. | Source: EPA VOC Standards; Thai Industrial Standards."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ปูนซีเมนต์":"Cement FAQ"}>
          <FAQItem q={lang==="TH"?"ปูนซีเมนต์ 1 ลูกบาศก์เมตรต้องใช้ปูนกี่ถุง?":"How many cement bags per cubic meter?"} a={lang==="TH"?"คอนกรีตผสมมาตรฐาน (1:2:4) ใช้ปูน 320 กก./ลบ.ม. = 6.4 ถุง (50กก.) ส่วนคอนกรีตเสริมเหล็กใช้ 350-400 กก./ลบ.ม. อัตราส่วนขึ้นอยู่กับกำลังรับแรงอัดที่ต้องการ | อ้างอิง: มอก. 15 ปูนซีเมนต์ปอร์ตแลนด์; ACI 211.1 — Standard Practice for Selecting Proportions.":"Standard mix (1:2:4) uses 320 kg/m³ = 6.4 bags (50kg). Reinforced concrete uses 350-400 kg/m³. Ratio depends on required compressive strength. | Source: Thai Industrial Std.; ACI 211.1."} />
          <FAQItem q={lang==="TH"?"ปูนถุงเหลือเก็บได้นานแค่ไหน?":"How long can cement bags be stored?"} a={lang==="TH"?"ปูนซีเมนต์ควรใช้ภายใน 3 เดือนหลังผลิต เก็บในที่แห้ง ไม่สัมผัสพื้นหรือผนัง วางบนแท่นรอง กำลังรับแรงจะลดลง 20-40% หลัง 3 เดือน | อ้างอิง: Portland Cement Association — Cement Storage Best Practices.":"Use within 3 months of manufacturing. Store dry, off ground. Strength decreases 20-40% after 3 months. | Source: Portland Cement Association."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — วอลเปเปอร์":"Wallpaper FAQ"}>
          <FAQItem q={lang==="TH"?"วอลเปเปอร์ 1 ม้วนติดได้กี่ตารางเมตร?":"How much area does 1 wallpaper roll cover?"} a={lang==="TH"?"ม้วนมาตรฐานกว้าง 53 ซม. ยาว 10 ม. = 5.3 ตร.ม. แต่เผื่อตัดลายและ waste ใช้จริงได้ประมาณ 4-4.5 ตร.ม. วอลเปเปอร์ลายใหญ่เสียเศษมากกว่าลายเล็ก | อ้างอิง: Wallpaper Manufacturers Association — Standard Roll Sizes.":"Standard roll: 53cm × 10m = 5.3 sq m. After pattern matching and waste, actual coverage is ~4-4.5 sq m. Large patterns waste more. | Source: Wallpaper Manufacturers Association."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — พื้นที่หลังคา":"Roof Area FAQ"}>
          <FAQItem q={lang==="TH"?"ความชันหลังคาเท่าไรเหมาะกับไทย?":"What roof pitch is suitable for Thailand?"} a={lang==="TH"?"สำหรับประเทศไทยที่ฝนตกหนัก แนะนำความชัน 25-35 องศา หลังคากระเบื้องลอนคู่ ≥15° หลังคาเมทัลชีท ≥7° หลังคาจั่วสูงระบายความร้อนดีกว่า | อ้างอิง: วสท. (วิศวกรรมสถานแห่งประเทศไทย) — มาตรฐานการออกแบบหลังคา; Building Code of Thailand.":"For Thailand's heavy rain: 25-35° recommended. Clay tiles ≥15°, Metal sheets ≥7°. Steeper roofs provide better ventilation. | Source: Engineering Institute of Thailand; Thai Building Code."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ถังเก็บน้ำ":"Water Tank FAQ"}>
          <FAQItem q={lang==="TH"?"คนไทยใช้น้ำเฉลี่ยวันละกี่ลิตร?":"How much water does an average Thai use daily?"} a={lang==="TH"?"กรมทรัพยากรน้ำ ระบุว่าคนไทยใช้น้ำเฉลี่ย 200 ลิตร/คน/วัน แบ่งเป็น อาบน้ำ 60L, ชักโครก 40L, ซักผ้า 35L, ล้างจาน 25L, อื่นๆ 40L ควรเก็บสำรองอย่างน้อย 3 วัน | อ้างอิง: กรมทรัพยากรน้ำ กระทรวงทรัพยากรธรรมชาติฯ; การประปานครหลวง (กปน.).":"Thai Dept. of Water Resources: average 200L/person/day — bathing 60L, toilet 40L, laundry 35L, dishes 25L, other 40L. Store at least 3 days' supply. | Source: Thai Water Resources Dept.; MWA."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สระว่ายน้ำ":"Pool Volume FAQ"}>
          <FAQItem q={lang==="TH"?"สระว่ายน้ำบ้านขนาดมาตรฐานเท่าไร?":"What's a standard home pool size?"} a={lang==="TH"?"สระขนาดเล็ก: 3×6 ม. ลึก 1.2 ม. (~21,600 ลิตร) / กลาง: 4×8 ม. ลึก 1.5 ม. (~48,000 ลิตร) / ใหญ่: 5×12 ม. ลึก 1.8 ม. (~108,000 ลิตร) ค่าดูแลรายเดือนประมาณ 2,000-5,000 บาท (คลอรีน+ไฟฟ้าปั๊ม) | อ้างอิง: Pool & Hot Tub Alliance — Residential Pool Standards; ASTM F1346 Pool Safety.":"Small: 3×6m, 1.2m deep (~21,600L) / Medium: 4×8m, 1.5m (~48,000L) / Large: 5×12m, 1.8m (~108,000L). Monthly maintenance ~2,000-5,000 THB. | Source: Pool & Hot Tub Alliance; ASTM F1346."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ฉนวนกันร้อน":"Insulation FAQ"}>
          <FAQItem q={lang==="TH"?"ค่า R-Value คืออะไร? ยิ่งสูงยิ่งดีไหม?":"What is R-Value? Is higher always better?"} a={lang==="TH"?"R-Value คือค่าความต้านทานความร้อน ยิ่งสูงยิ่งกันความร้อนได้ดี สำหรับเมืองไทย (เขตร้อน) หลังคาควรมี R-Value ≥ 3.5 ผนังควร ≥ 2.0 วัสดุที่นิยม: โฟม PU (R-6/นิ้ว), ใยแก้ว (R-3.5/นิ้ว), EPS (R-4/นิ้ว) | อ้างอิง: กรมพัฒนาพลังงานทดแทนฯ — เกณฑ์ BEC; ASHRAE 90.1 Energy Standard.":"R-Value = thermal resistance. Higher = better insulation. For Thailand (tropical): Roof ≥ R-3.5, Walls ≥ R-2.0. Common materials: PU foam R-6/inch, Fiberglass R-3.5/inch, EPS R-4/inch. | Source: Thai DEDE — BEC Code; ASHRAE 90.1."} />
        </SEOFAQ>
      </div>
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
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — รีโนเวทบ้าน":"Renovation FAQ"}>
          <FAQItem q={lang==="TH"?"ค่ารีโนเวทบ้านราคาเท่าไรต่อตารางเมตร?":"How much does renovation cost per sq m?"} a={lang==="TH"?"ราคาเฉลี่ยในไทย (2024): ระดับประหยัด 5,000-8,000 บาท/ตร.ม. (ทาสี เปลี่ยนพื้น) / ปานกลาง 10,000-15,000 บาท/ตร.ม. (รื้อผนัง ระบบไฟฟ้า) / พรีเมียม 20,000-40,000 บาท/ตร.ม. (ออกแบบใหม่ วัสดุนำเข้า) | อ้างอิง: สมาคมธุรกิจรับสร้างบ้าน — ดัชนีราคาก่อสร้าง (2024); ธนาคารอาคารสงเคราะห์ — สินเชื่อปรับปรุงบ้าน.":"Thai average (2024): Economy 5,000-8,000 THB/sqm (repaint, flooring) / Standard 10,000-15,000 THB/sqm (walls, electrical) / Premium 20,000-40,000 THB/sqm (redesign, imported materials). | Source: Thai Home Builders Association (2024); GH Bank."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
