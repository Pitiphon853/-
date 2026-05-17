"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

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
        <CalculationSteps 
          steps={lang === "TH" ? [
            "R-Value = ค่าความต้านทานความร้อน (Thermal Resistance)",
            "สูตรแบบประเมินเบื้องต้น: R-Value ที่ต้องการ = (อุณหภูมิภายนอกสูงสุด - อุณหภูมิภายในที่ต้องการ) / 2",
            "หมายเหตุ: ในความเป็นจริงต้องพิจารณาความหนาและชนิดของวัสดุร่วมด้วย (เช่น PU, EPS)"
          ] : [
            "R-Value = Thermal Resistance",
            "Simplified formula: Required R-Value = (Max Outside Temp - Desired Inside Temp) / 2",
            "Note: Actual needs depend on material thickness and type (e.g., PU, EPS)."
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — ฉนวนกันร้อน":"Insulation FAQ"}>
          <FAQItem q={lang==="TH"?"ค่า R-Value คืออะไร? ยิ่งสูงยิ่งดีไหม?":"What is R-Value? Is higher always better?"} a={lang==="TH"?"R-Value (Resistance Value) คือค่าความต้านทานความร้อน ยิ่งสูงแปลว่ายิ่งกันความร้อนได้ดี สำหรับเมืองไทย (เขตร้อน) หลังคาควรมี R-Value ไม่น้อยกว่า 3.5 และผนังควรไม่น้อยกว่า 2.0 (อ้างอิง: กรมพัฒนาพลังงานทดแทนฯ)":"R-Value measures thermal resistance. Higher means better insulation. In tropical Thailand, roofs should have R-Value ≥ 3.5 and walls ≥ 2.0 (Source: Dept. of Alternative Energy Development and Efficiency)."} />
          <FAQItem q={lang==="TH"?"ค่า K-Value แตกต่างกับ R-Value อย่างไร?":"Difference between K-Value and R-Value?"} a={lang==="TH"?"K-Value (Thermal Conductivity) คือค่านำความร้อน 'ยิ่งต่ำยิ่งดี' ส่วน R-Value คือค่าต้านความร้อน 'ยิ่งสูงยิ่งดี' หากต้องการหา R-Value จาก K-Value ใช้สูตร R = ความหนา (เมตร) ÷ K-Value":"K-Value (Thermal Conductivity) measures heat transfer ('lower is better'). R-Value measures resistance ('higher is better'). Formula: R-Value = Thickness (m) ÷ K-Value."} />
          <FAQItem q={lang==="TH"?"ฉนวน PU, PE, EPS ต่างกันอย่างไร?":"PU, PE vs EPS insulation?"} a={lang==="TH"?"PU Foam กันร้อนดีสุด (R-Value สูงสุดต่อความหนา) และกันเสียงได้ดี / PE Foam ราคาถูก นิยมแปะติดหลังคาเมทัลชีท แต่กันร้อนสู้ PU ไม่ได้ / EPS (โฟมขาว) น้ำหนักเบา ราคาประหยัด นิยมใส่ในผนังเบา":"PU Foam offers the best insulation and soundproofing. PE Foam is cheap and common for metal sheets but less effective. EPS (white foam) is lightweight, budget-friendly, and often used in drywall."} />
          <FAQItem q={lang==="TH"?"ใยแก้ว (Fiberglass) อันตรายไหม?":"Is Fiberglass insulation dangerous?"} a={lang==="TH"?"ฉนวนใยแก้วสมัยใหม่ปลอดภัยและไม่ก่อมะเร็ง (อ้างอิงจาก IARC) แต่อาจทำให้ระคายเคืองผิวหนังและทางเดินหายใจตอนติดตั้ง จึงหุ้มด้วยฟอยล์มิดชิด มีข้อดีคือกันร้อนและซับเสียงได้ดีมาก และไม่ติดไฟ":"Modern fiberglass is safe and non-carcinogenic (per IARC), though it can irritate skin/lungs during installation, so it's fully enclosed in foil. It provides excellent thermal and acoustic insulation and is fire-resistant."} />
          <FAQItem q={lang==="TH"?"บ้านที่สร้างเสร็จแล้ว จะติดฉนวนเพิ่มได้ไหม?":"Can I add insulation to an existing house?"} a={lang==="TH"?"ได้ครับ! วิธีที่คุ้มค่าที่สุดคือ 'การปูฉนวนใยแก้วบนฝ้าเพดาน' (Stay Cool) หนา 3-6 นิ้ว ช่วยลดอุณหภูมิในบ้านได้ทันที 2-3 องศา และสามารถมุดขึ้นไปปูเองได้ง่ายๆ ไม่ต้องรื้อฝ้า":"Yes! The most cost-effective method is laying fiberglass rolls (like 'Stay Cool', 3-6 inches thick) directly on top of the ceiling panels. It instantly drops room temps by 2-3°C and doesn't require tearing down the ceiling."} />
          <FAQItem q={lang==="TH"?"หลังคา หรือ ผนัง รับความร้อนมากกว่ากัน?":"Do roofs or walls absorb more heat?"} a={lang==="TH"?"หลังคารับความร้อนโดยตรงจากดวงอาทิตย์กว่า 70% ของความร้อนทั้งหมดที่เข้าบ้าน ดังนั้นการลงทุนติดฉนวนที่หลังคาหรือฝ้าเพดานจะเห็นผลลัพธ์ (ความเย็นและค่าไฟที่ลดลง) ชัดเจนที่สุด":"The roof absorbs over 70% of the total solar heat entering a house. Therefore, investing in roof or ceiling insulation yields the most noticeable results in comfort and electricity savings."} />
          <FAQItem q={lang==="TH"?"สีกันความร้อน ช่วยได้จริงไหม?":"Does heat-reflective paint actually work?"} a={lang==="TH"?"สีสะท้อนความร้อน (Ceramic Coating) ช่วยสะท้อนรังสี UV และลดอุณหภูมิที่พื้นผิวผนังได้จริง แต่ประสิทธิภาพการ 'กันความร้อนทะลุผ่าน' จะสู้การติดฉนวนแบบแผ่นหนาๆ ไม่ได้ ควรใช้ควบคู่กัน":"Heat-reflective paint (Ceramic Coating) effectively bounces UV rays and cools the wall's surface. However, it cannot prevent heat transfer as effectively as thick insulation materials. Best used together."} />
          <FAQItem q={lang==="TH"?"ต้องหนาแค่ไหน ถึงจะกันร้อนได้ดี?":"How thick should insulation be?"} a={lang==="TH"?"สำหรับใยแก้วปูฝ้าเพดาน แนะนำความหนา 6 นิ้ว (150 มม.) เพื่อประสิทธิภาพสูงสุด หากเป็น PU โฟมพ่นใต้หลังคา ความหนา 1-2 นิ้วก็เพียงพอแล้วเพราะกันความร้อนได้ดีมาก":"For ceiling fiberglass rolls, a 6-inch (150mm) thickness is recommended for maximum efficiency. For spray PU foam under the roof, 1-2 inches is usually sufficient due to its high density."} />
          <FAQItem q={lang==="TH"?"ฉนวนกันความร้อนมีอายุการใช้งานกี่ปี?":"What is the lifespan of insulation?"} a={lang==="TH"?"ฉนวนใยแก้วและโฟมคุณภาพสูงมีอายุการใช้งาน 10 ปีขึ้นไป หากไม่โดนน้ำรั่วซึมใส่ หรือถูกหนู/แมลงกัดแทะ ส่วน PE โฟมที่ติดมากับเมทัลชีท มักจะกรอบและลอกล่อนใน 3-5 ปี":"High-quality fiberglass and PU foam last 10+ years if they aren't damaged by roof leaks or rodents. Cheap PE foam attached to metal sheets often turns brittle and peels off within 3-5 years."} />
          <FAQItem q={lang==="TH"?"ติดฉนวนแล้วประหยัดค่าแอร์ได้เท่าไร?":"How much does insulation save on AC bills?"} a={lang==="TH"?"การติดตั้งฉนวนที่มี R-Value เหมาะสม สามารถลดการใช้พลังงานของเครื่องปรับอากาศได้ 20-30% ต่อเดือน (ขึ้นอยู่กับพฤติกรรมการเปิดแอร์) ทำให้คุ้มค่าการลงทุนภายใน 1-2 ปีแรก":"Installing insulation with a proper R-Value can reduce air conditioning energy usage by 20-30% monthly. This usually results in a return on investment within the first 1-2 years."} />
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
        <CalculationSteps 
          steps={lang === "TH" ? [
            "ประเมินราคากลางต่อตารางเมตร: ประหยัด (5,000 ฿), ปานกลาง (10,000 ฿), พรีเมียม (20,000 ฿)",
            "งบประมาณประเมิน = พื้นที่ (ตร.ม.) × ราคากลางตามเกรดวัสดุ",
            "หมายเหตุ: ราคาประเมินนี้ไม่รวมค่าออกแบบ (Interior Design) และเฟอร์นิเจอร์ลอยตัว"
          ] : [
            "Base rate per sq m: Economy (5,000 ฿), Standard (10,000 ฿), Premium (20,000 ฿)",
            "Estimated Budget = Area (sq m) × Base rate for selected grade",
            "Note: Excludes interior design fees and loose furniture"
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — รีโนเวทบ้าน":"Renovation FAQ"}>
          <FAQItem q={lang==="TH"?"ค่ารีโนเวทบ้านราคาเท่าไรต่อตารางเมตร?":"How much does renovation cost per sq m?"} a={lang==="TH"?"ราคาเฉลี่ยในไทย: ระดับประหยัด 5,000-8,000 บาท/ตร.ม. (ทาสี เปลี่ยนพื้น) / ปานกลาง 10,000-15,000 บาท/ตร.ม. (รื้อผนัง เดินระบบไฟฟ้าใหม่) / พรีเมียม 20,000-40,000 บาท/ตร.ม. (ออกแบบใหม่ วัสดุนำเข้า)":"Thai average: Economy 5,000-8,000 THB/sqm (repaint, flooring) / Standard 10,000-15,000 THB/sqm (walls, electrical) / Premium 20,000-40,000 THB/sqm (redesign, imported materials)."} />
          <FAQItem q={lang==="TH"?"ควรเผื่องบบานปลายเท่าไร?":"How much contingency budget should I prepare?"} a={lang==="TH"?"ในการรีโนเวทบ้านเก่า มักจะเจอปัญหาที่มองไม่เห็นตอนแรก (เช่น ปลวกกินโครงสร้าง ท่อประปาแตก รอยร้าว) ควรเผื่องบสำรอง (Contingency Budget) ไว้อย่างน้อย 15-20% ของงบประมาณรวม":"When renovating old homes, hidden issues always arise (e.g., termite damage, rusted pipes). You should always prepare a contingency budget of at least 15-20% of the total estimate."} />
          <FAQItem q={lang==="TH"?"รีโนเวท กับ ทุบสร้างใหม่ แบบไหนคุ้มกว่า?":"Renovate vs. Knock down and rebuild?"} a={lang==="TH"?"หากโครงสร้างหลัก (เสา คาน รากฐาน) ยังแข็งแรง การรีโนเวทจะประหยัดกว่าสร้างใหม่ 30-40% แต่ถ้าระบบโครงสร้างพังทรุด หรือต้องการเปลี่ยน Layout บ้านใหม่ทั้งหมด การทุบสร้างใหม่อาจคุ้มค่าและปลอดภัยกว่าในระยะยาว":"If the structural integrity (pillars, foundation) is sound, renovating is 30-40% cheaper. But if the structure is sinking or you want a completely new layout, rebuilding is safer and more cost-effective long-term."} />
          <FAQItem q={lang==="TH"?"รีโนเวทบ้าน ต้องขออนุญาตเขตไหม?":"Do I need a permit to renovate?"} a={lang==="TH"?"ตาม พ.ร.บ.ควบคุมอาคาร หากเป็นการต่อเติมเกิน 5 ตร.ม., เปลี่ยนแปลงโครงสร้างหลัก, หรือเปลี่ยนวัสดุที่น้ำหนักเพิ่มขึ้นเกิน 10% 'ต้องขออนุญาต' แต่ถ้าแค่ทาสี เปลี่ยนกระเบื้อง ไม่ต้องขอ":"By the Thai Building Control Act, if you extend >5 sq.m., alter main structures, or increase weight loads by >10%, a permit is required. Simple repainting or retiling does not require a permit."} />
          <FAQItem q={lang==="TH"?"ขั้นตอนแรกสุดก่อนรีโนเวทคืออะไร?":"What is the very first step before renovating?"} a={lang==="TH"?"ให้วิศวกรเข้า 'ตรวจสอบโครงสร้าง (Structural Inspection)' ก่อนเสมอ เพื่อเช็กการทรุดตัว รอยร้าวอันตราย และสภาพเสา/คาน เพื่อประเมินว่าโครงสร้างเดิมรับน้ำหนักของการต่อเติมได้หรือไม่":"Always hire an engineer for a 'Structural Inspection' first. Check for foundation sinking, hazardous cracks, and pillar conditions to ensure the old structure can support the renovation load."} />
          <FAQItem q={lang==="TH"?"ครัวปูน กับ ครัวบิ้วอิน แบบไหนทนกว่า?":"Concrete vs Built-in kitchen, which is more durable?"} a={lang==="TH"?"ครัวปูน (ก่ออิฐฉาบปูน) ทนทานต่อน้ำ ความชื้น และปลวกได้ 100% เหมาะกับครัวไทยที่ทำอาหารหนัก ส่วนครัวบิ้วอิน (ไม้/MDF) สวยงาม ประหยัดพื้นที่ แต่กลัวน้ำและปลวก เหมาะกับครัวฝรั่ง":"Concrete/cement kitchens are 100% water and termite resistant, perfect for heavy Thai cooking. Built-in (MDF/wood) kitchens are beautiful and space-saving but vulnerable to moisture/termites."} />
          <FAQItem q={lang==="TH"?"เปลี่ยนสายไฟทั้งบ้าน ราคาประมาณเท่าไร?":"How much does rewiring a whole house cost?"} a={lang==="TH"?"การเดินระบบไฟฟ้าใหม่ทั้งบ้าน (บ้าน 2 ชั้น) แบบร้อยท่อฝังผนัง งบประมาณจะตกอยู่ที่ 50,000 - 150,000 บาท ขึ้นอยู่กับจำนวนจุดสวิตช์ ปลั๊ก และประเภทของตู้คอนซูมเมอร์":"Complete house rewiring (2-story home) with concealed conduits typically costs 50,000 - 150,000 THB, depending on the number of outlets, switches, and the consumer unit type."} />
          <FAQItem q={lang==="TH"?"กระเบื้อง SPC ดีกว่าลามิเนตไหม?":"Is SPC flooring better than Laminate?"} a={lang==="TH"?"กระเบื้องยาง SPC (Stone Plastic Composite) กันน้ำและกันปลวกได้ 100% ไม่บวมน้ำเหมือนพื้นลามิเนต ถือเป็นวัสดุปูพื้นที่คุ้มค่าและเป็นที่นิยมที่สุดในการรีโนเวทปัจจุบัน":"SPC (Stone Plastic Composite) flooring is 100% waterproof and termite-proof. It doesn't swell like laminate when wet, making it the most popular and cost-effective flooring choice today."} />
          <FAQItem q={lang==="TH"?"งานต่อเติมหลังบ้านทรุด แก้ไขอย่างไร?":"How to fix sinking backyard extensions?"} a={lang==="TH"?"การต่อเติมหลังบ้านในกรุงเทพฯ มักจะทรุดเพราะใช้ 'เสาเข็มสั้น' กฎทองคือ: โครงสร้างส่วนต่อเติม 'ห้ามยึดติด' กับตัวบ้านเดิมเด็ดขาด ต้องทำโครงสร้างแยก (Joint) เพื่อให้ทรุดตัวอิสระ ไม่ดึงบ้านหลักร้าว":"Backyard extensions in Bangkok sink because of 'micro-piles'. The golden rule: The extension structure MUST NOT be rigidly attached to the main house. Create an isolation joint so it sinks independently."} />
          <FAQItem q={lang==="TH"?"จ้างผู้รับเหมาอย่างไรไม่ให้โดนทิ้งงาน?":"How to avoid contractors abandoning the job?"} a={lang==="TH"?"1) ทำสัญญาเป็นลายลักษณ์อักษร 2) แบ่งงวดจ่ายเงินย่อยๆ ตามเนื้องานที่เสร็จจริง (อย่าจ่ายก้อนใหญ่ล่วงหน้า) 3) เช็กประวัติและผลงานเก่า 4) มี BOQ (Bill of Quantities) ระบุวัสดุชัดเจน":"1) Sign a strict contract. 2) Break payments into small milestones based on completed work (never pay huge advances). 3) Check past portfolios. 4) Require a detailed BOQ (Bill of Quantities)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
