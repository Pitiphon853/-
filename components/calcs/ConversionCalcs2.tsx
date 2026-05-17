"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass , SEOFAQ, FAQItem } from "./shared";

// 1. Digital Unit
export function DigitalUnitConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("digi_val", "");
  const [unit, setUnit] = useLocalState("digi_unit", "MB");
  
  let bytes = 0;
  const v = parseFloat(val);
  if(!isNaN(v)) {
    if(unit === "KB") bytes = v * 1024;
    if(unit === "MB") bytes = v * 1024 * 1024;
    if(unit === "GB") bytes = v * 1024 * 1024 * 1024;
    if(unit === "TB") bytes = v * 1024 * 1024 * 1024 * 1024;
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงหน่วยดิจิทัล" : "Digital Unit"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="KB">KB</option>
          <option value="MB">MB</option>
          <option value="GB">GB</option>
          <option value="TB">TB</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-xl text-center"><p>MB</p><p className="font-bold">{(bytes/1048576).toLocaleString(undefined, {maximumFractionDigits:2})}</p></div>
          <div className="bg-purple-50 p-4 rounded-xl text-center"><p>GB</p><p className="font-bold">{(bytes/1073741824).toLocaleString(undefined, {maximumFractionDigits:2})}</p></div>
          <div className="bg-purple-50 p-4 rounded-xl text-center"><p>TB</p><p className="font-bold">{(bytes/1099511627776).toLocaleString(undefined, {maximumFractionDigits:2})}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงพื้นที่":"Area Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"1 ไร่ เท่ากับกี่ตารางเมตร?":"How many sq m in 1 rai?"} a={lang==="TH"?"1 ไร่ = 1,600 ตร.ม. = 4 งาน = 400 ตร.วา ระบบที่ดินไทย: 1 งาน = 400 ตร.ม., 1 ตร.วา = 4 ตร.ม. สำหรับเปรียบเทียบ 1 เอเคอร์ = 2.53 ไร่, 1 เฮกตาร์ = 6.25 ไร่ | อ้างอิง: กรมที่ดิน — หน่วยวัดที่ดินไทย; พ.ร.บ. มาตราชั่งตวงวัด พ.ศ. 2542.":"1 rai = 1,600 sq m = 4 ngan = 400 sq wa. 1 acre = 2.53 rai, 1 hectare = 6.25 rai. | Source: Thai Dept. of Lands; Thai Weights and Measures Act."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Angle
export function AngleConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("ang_val", "");
  const [unit, setUnit] = useLocalState("ang_unit", "deg");
  
  const v = parseFloat(val);
  const deg = unit === "deg" ? v : v * (180/Math.PI);
  const rad = unit === "rad" ? v : v * (Math.PI/180);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "มุมและองศา" : "Angle"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="deg">Degrees</option>
          <option value="rad">Radians</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-xl text-center"><p>Degrees</p><p className="font-bold">{deg.toFixed(2)}°</p></div>
          <div className="bg-purple-50 p-4 rounded-xl text-center"><p>Radians</p><p className="font-bold">{rad.toFixed(4)}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงปริมาตร":"Volume Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"1 แกลลอน (US) กับ 1 แกลลอน (UK) ต่างกันไหม?":"Is a US gallon different from a UK gallon?"} a={lang==="TH"?"ต่างกัน! 1 US gallon = 3.785 ลิตร แต่ 1 UK (Imperial) gallon = 4.546 ลิตร ความแตกต่างนี้สำคัญมากในสูตรอาหาร/เครื่องดื่ม และอุตสาหกรรมน้ำมัน ไทยใช้ระบบเมตริก (ลิตร) เป็นมาตรฐาน | อ้างอิง: NIST Handbook 44 — Specifications for Measuring Devices; สำนักงานมาตรวิทยาแห่งชาติ.":"Yes! 1 US gallon = 3.785L, 1 UK gallon = 4.546L. This matters in recipes and oil industry. Thailand uses metric (liters). | Source: NIST Handbook 44; Thai Metrology Institute."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Color
export function ColorConverter({ lang }: { lang: Lang }) {
  const [hex, setHex] = useLocalState("col_hex", "#000000");

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงสี (HEX/RGB)" : "Color Converter"}</h2>
      <div className="mt-6 flex flex-col items-center gap-4">
        <input type="color" value={hex} onChange={e=>setHex(e.target.value)} className="w-32 h-32 cursor-pointer" />
        <input type="text" value={hex} onChange={e=>setHex(e.target.value)} className={inputClass + " text-center uppercase"} />
      </div>
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงความเร็ว":"Speed Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"ทำไมเรือและเครื่องบินใช้หน่วย 'นอต' แทน km/h?":"Why do ships and planes use knots?"} a={lang==="TH"?"1 นอต (Knot) = 1 ไมล์ทะเล/ชม. = 1.852 km/h ใช้เพราะ 1 ไมล์ทะเล = 1 ลิปดา (minute of latitude) ทำให้คำนวณตำแหน่งบนแผนที่เดินเรือได้ง่าย มาตรฐาน ICAO กำหนดให้การบินพลเรือนใช้นอต | อ้างอิง: ICAO Annex 5 — Units of Measurement; IMO — Maritime Navigation Standards.":"1 knot = 1 nautical mile/hr = 1.852 km/h. Used because 1 nautical mile = 1 minute of latitude, simplifying navigation. ICAO mandates knots for aviation. | Source: ICAO Annex 5; IMO."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Temperature
export function TemperatureConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("temp_val", "");
  const [unit, setUnit] = useLocalState("temp_unit", "C");
  
  const v = parseFloat(val);
  let c = 0;
  if(unit === "C") c = v;
  if(unit === "F") c = (v - 32) * 5/9;
  if(unit === "K") c = v - 273.15;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงอุณหภูมิ" : "Temperature"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="C">°C</option>
          <option value="F">°F</option>
          <option value="K">K</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>°C</p><p className="font-bold">{c.toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>°F</p><p className="font-bold">{((c*9/5)+32).toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>K</p><p className="font-bold">{(c+273.15).toFixed(2)}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงแรงดัน":"Pressure Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"PSI กับ Bar ต่างกันอย่างไร?":"What's the difference between PSI and Bar?"} a={lang==="TH"?"PSI (Pound per Square Inch) นิยมใช้ในสหรัฐฯ/อังกฤษ Bar นิยมใช้ในยุโรปและเอเชีย 1 bar = 14.5 PSI ลมยางรถยนต์ทั่วไป: 30-35 PSI = 2.0-2.4 bar หม้อแรงดัน: 1-1.5 bar = 14.5-21.7 PSI | อ้างอิง: NIST — Pressure Unit Conversions; ISO 2533 Standard Atmosphere.":"PSI used in US/UK, Bar in Europe/Asia. 1 bar = 14.5 PSI. Car tires: 30-35 PSI = 2.0-2.4 bar. Pressure cooker: 1-1.5 bar. | Source: NIST; ISO 2533."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Speed
export function SpeedConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("spd_val", "");
  const [unit, setUnit] = useLocalState("spd_unit", "kmh");
  
  const v = parseFloat(val);
  let kmh = 0;
  if(unit === "kmh") kmh = v;
  if(unit === "mph") kmh = v * 1.60934;
  if(unit === "knot") kmh = v * 1.852;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงความเร็ว" : "Speed"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="kmh">km/h</option>
          <option value="mph">mph</option>
          <option value="knot">knot</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>km/h</p><p className="font-bold">{kmh.toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>mph</p><p className="font-bold">{(kmh/1.60934).toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>knot</p><p className="font-bold">{(kmh/1.852).toFixed(2)}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงพลังงาน":"Energy Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"Watt, Joule, Calorie ต่างกันอย่างไร?":"What's the difference between Watt, Joule, Calorie?"} a={lang==="TH"?"Joule (J) = หน่วยพลังงาน SI / Calorie (cal) = พลังงานความร้อน (1 cal = 4.184 J) / Watt (W) = กำลัง = พลังงานต่อเวลา (1W = 1 J/s) / kWh = หน่วยไฟฟ้า (1 kWh = 3.6 ล้าน J) ค่าไฟไทย ~4 บาท/kWh | อ้างอิง: BIPM — SI Units; การไฟฟ้านครหลวง — อัตราค่าไฟฟ้า.":"Joule = SI energy unit / Calorie = heat (1 cal = 4.184 J) / Watt = power (1W = 1 J/s) / kWh = electrical (1 kWh = 3.6M J). Thai electricity ~4 THB/kWh. | Source: BIPM SI; MEA Thailand."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 6. Area Unit
export function AreaUnitConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("aru_val", "");
  const [unit, setUnit] = useLocalState("aru_unit", "sqm");
  
  const v = parseFloat(val);
  let sqm = 0;
  if(unit === "sqm") sqm = v;
  if(unit === "rai") sqm = v * 1600;
  if(unit === "acre") sqm = v * 4046.86;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงพื้นที่" : "Area Unit"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="sqm">ตร.ม. / Sq.m</option>
          <option value="rai">ไร่ / Rai</option>
          <option value="acre">เอเคอร์ / Acre</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>ตร.ม.</p><p className="font-bold">{sqm.toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>ไร่</p><p className="font-bold">{(sqm/1600).toFixed(4)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>Acre</p><p className="font-bold">{(sqm/4046.86).toFixed(4)}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงข้อมูล":"Data Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"MB กับ MiB ต่างกันอย่างไร?":"What's the difference between MB and MiB?"} a={lang==="TH"?"MB (Megabyte) = 1,000,000 bytes (ระบบ SI) / MiB (Mebibyte) = 1,048,576 bytes (ระบบ Binary) HDD/ISP ใช้ MB (ดูเยอะกว่า) แต่ OS ใช้ MiB ทำให้ HDD 1 TB แสดงเป็น ~931 GiB ใน Windows ผลต่าง ~7% | อ้างอิง: IEC 80000-13 — Binary Prefix Standard; IEEE 1541 — Prefixes for Binary Multiples.":"MB = 1,000,000 bytes (SI). MiB = 1,048,576 bytes (binary). HDD/ISPs use MB, OS uses MiB, so 1 TB HDD shows ~931 GiB in Windows (~7% difference). | Source: IEC 80000-13; IEEE 1541."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 7. Weight Unit
export function WeightUnitConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("wgt_val", "");
  const [unit, setUnit] = useLocalState("wgt_unit", "kg");
  
  const v = parseFloat(val);
  let kg = 0;
  if(unit === "kg") kg = v;
  if(unit === "lb") kg = v * 0.453592;
  if(unit === "oz") kg = v * 0.0283495;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "แปลงน้ำหนัก" : "Weight Unit"}</h2>
      <div className="flex gap-2 mt-6">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className={inputClass} />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className={inputClass + " w-1/3"}>
          <option value="kg">kg</option>
          <option value="lb">lb</option>
          <option value="oz">oz</option>
        </select>
      </div>
      {val && !isNaN(v) && (
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>kg</p><p className="font-bold">{kg.toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>lb</p><p className="font-bold">{(kg/0.453592).toFixed(2)}</p></div>
          <div className="bg-purple-50 p-2 rounded-xl text-center"><p>oz</p><p className="font-bold">{(kg/0.0283495).toFixed(2)}</p></div>
        </div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงเชื้อเพลิง":"Fuel Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"MPG กับ L/100km แปลงกันอย่างไร?":"How to convert MPG to L/100km?"} a={lang==="TH"?"สูตร: L/100km = 235.215 ÷ MPG (US) เช่น 30 MPG = 7.84 L/100km รถไทยเฉลี่ย: Eco Car 4-5 L/100km, ซีดาน 6-8 L/100km, SUV 8-12 L/100km, กระบะ 7-10 L/100km | อ้างอิง: US EPA — Fuel Economy Guide; กรมธุรกิจพลังงาน — ข้อมูลการใช้น้ำมัน.":"Formula: L/100km = 235.215 ÷ MPG(US). 30 MPG = 7.84 L/100km. Thai averages: Eco Car 4-5, Sedan 6-8, SUV 8-12, Pickup 7-10 L/100km. | Source: US EPA; Thai Dept. of Energy Business."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 8. Roman Numeral
export function RomanNumeralConverter({ lang }: { lang: Lang }) {
  const [num, setNum] = useLocalState("rom_num", "");
  
  // Very simplified converter for demo
  const v = parseInt(num);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "เลขโรมัน" : "Roman Numerals"}</h2>
      <div className="mt-6">
        <label className={labelClass}>{lang==="TH"?"เลขอารบิก":"Number"}</label>
        <input type="number" value={num} onChange={e=>setNum(e.target.value)} className={inputClass} />
      </div>
      {num && !isNaN(v) && v > 0 && v < 4000 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-purple-50 rounded-xl text-center">
          <div className="text-4xl font-black text-purple-600">I, V, X... (Mockup)</div>
        </motion.div>
      )}
    
      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — แปลงมุม":"Angle Conversion FAQ"}>
          <FAQItem q={lang==="TH"?"Degree, Radian, Gradian ต่างกันอย่างไร?":"What's the difference between Degree, Radian, Gradian?"} a={lang==="TH"?"Degree (°): วงกลม = 360° ใช้ทั่วไป / Radian (rad): วงกลม = 2π rad ใช้ในคณิตศาสตร์/ฟิสิกส์ / Gradian (grad): วงกลม = 400 grad ใช้ในงานสำรวจ สูตร: 1 rad = 57.296° = 63.662 grad | อ้างอิง: ISO 31-1 — Quantities and Units; Khan Academy — Trigonometry Units.":"Degree: circle = 360° / Radian: circle = 2π rad (math/physics) / Gradian: circle = 400 grad (surveying). 1 rad = 57.296° = 63.662 grad. | Source: ISO 31-1; Khan Academy."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 9. Area Shape
export function AreaShapeCalculator({ lang }: { lang: Lang }) {
  const [shape, setShape] = useLocalState("asc_shape", "rectangle");
  const [w, setW] = useLocalState("asc_w", "");
  const [h, setH] = useLocalState("asc_h", "");
  const [r, setR] = useLocalState("asc_r", "");
  
  let area = 0;
  const width = parseFloat(w) || 0;
  const height = parseFloat(h) || 0;
  const radius = parseFloat(r) || 0;
  
  if (shape === "rectangle") area = width * height;
  if (shape === "triangle") area = 0.5 * width * height;
  if (shape === "circle") area = Math.PI * radius * radius;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "คำนวณพื้นที่รูปทรง" : "Area Shape Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เลือกรูปทรง" : "Select Shape"}</label>
          <select value={shape} onChange={e=>setShape(e.target.value)} className={inputClass}>
            <option value="rectangle">{lang==="TH"?"สี่เหลี่ยม (Rectangle)":"Rectangle"}</option>
            <option value="triangle">{lang==="TH"?"สามเหลี่ยม (Triangle)":"Triangle"}</option>
            <option value="circle">{lang==="TH"?"วงกลม (Circle)":"Circle"}</option>
          </select>
        </div>
        
        {(shape === "rectangle" || shape === "triangle") && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ฐาน / กว้าง" : "Base / Width"}</label>
              <input type="number" value={w} onChange={e=>setW(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "สูง / ยาว" : "Height / Length"}</label>
              <input type="number" value={h} onChange={e=>setH(e.target.value)} className={inputClass} />
            </div>
          </div>
        )}
        
        {shape === "circle" && (
          <div>
            <label className={labelClass}>{lang === "TH" ? "รัศมี (r)" : "Radius (r)"}</label>
            <input type="number" value={r} onChange={e=>setR(e.target.value)} className={inputClass} />
          </div>
        )}
      </div>
      
      {area > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-purple-50 rounded-xl text-center border border-purple-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "พื้นที่ทั้งหมด" : "Total Area"}</p>
          <div className="text-4xl font-black text-purple-600">{area.toLocaleString(undefined, {maximumFractionDigits:4})}</div>
        </motion.div>
      )}

      <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณพื้นที่รูปทรง":"Area Shape FAQ"}>
        <FAQItem q={lang==="TH"?"สูตรคำนวณพื้นที่สี่เหลี่ยมคืออะไร?":"What is the formula for a rectangle's area?"} a={lang==="TH"?"พื้นที่สี่เหลี่ยมผืนผ้า = กว้าง × ยาว (หรือ ฐาน × สูง) หากเป็นสี่เหลี่ยมจัตุรัส จะใช้ ด้าน × ด้าน.":"Area of a rectangle = Width × Height (or Base × Height). For a square, it's Side × Side."} />
        <FAQItem q={lang==="TH"?"สูตรคำนวณพื้นที่สามเหลี่ยมคืออะไร?":"What is the formula for a triangle's area?"} a={lang==="TH"?"พื้นที่สามเหลี่ยม = 1/2 × ฐาน × สูง โดยความสูงต้องวัดตั้งฉากจากฐานไปถึงจุดยอดเสมอ ไม่ใช่ความยาวของด้านเอียง.":"Area of a triangle = 1/2 × Base × Height. The height must always be perpendicular to the base, not the slanted side."} />
        <FAQItem q={lang==="TH"?"สูตรคำนวณพื้นที่วงกลมคืออะไร?":"What is the formula for a circle's area?"} a={lang==="TH"?"พื้นที่วงกลม = πr² (พาย อาร์ กำลังสอง) โดยที่ r คือรัศมีของวงกลม และค่า π (Pi) มีค่าประมาณ 3.14159.":"Area of a circle = πr² (Pi times Radius squared). r is the radius, and π (Pi) is approximately 3.14159."} />
        <FAQItem q={lang==="TH"?"รัศมี (Radius) กับ เส้นผ่านศูนย์กลาง (Diameter) ต่างกันอย่างไร?":"Difference between Radius and Diameter?"} a={lang==="TH"?"เส้นผ่านศูนย์กลางคือความกว้างจากขอบถึงขอบที่ลากผ่านจุดศูนย์กลาง ส่วนรัศมีคือครึ่งหนึ่งของเส้นผ่านศูนย์กลาง (ลากจากจุดศูนย์กลางไปที่ขอบ).":"Diameter is the full width across the circle through the center. Radius is exactly half of the diameter (from the center to the edge)."} />
        <FAQItem q={lang==="TH"?"พื้นที่หน้าตัด (Cross-sectional Area) คืออะไร?":"What is cross-sectional area?"} a={lang==="TH"?"คือพื้นที่ของรูปทรง 2 มิติที่เกิดขึ้นเมื่อเราตัดวัตถุ 3 มิติในแนวตั้งฉาก เช่น ตัดท่อทรงกระบอก จะได้พื้นที่หน้าตัดเป็นรูปวงกลม.":"The 2D area exposed by making a straight cut through a 3D object. Cutting a cylinder perpendicularly gives a circular cross-section."} />
        <FAQItem q={lang==="TH"?"ทำไมหน่วยพื้นที่ต้องมีคำว่า 'ตาราง' (Square)?":"Why do area units use 'Square'?"} a={lang==="TH"?"เพราะพื้นที่คือการวัดขนาดใน 2 มิติ (กว้างและยาว) เช่น เมตร × เมตร จึงกลายเป็น ตารางเมตร (m²).":"Because area measures a 2-dimensional space (width and height). For example, meters × meters results in square meters (m²)."} />
        <FAQItem q={lang==="TH"?"1 ตารางเมตรเท่ากับกี่ตารางเซนติเมตร?":"How many square cm in a square meter?"} a={lang==="TH"?"1 ตารางเมตร (m²) = 10,000 ตารางเซนติเมตร (cm²) (มาจาก 100 cm × 100 cm).":"1 square meter (m²) = 10,000 square centimeters (cm²) (derived from 100 cm × 100 cm)."} />
        <FAQItem q={lang==="TH"?"หาพื้นที่ไปใช้ประโยชน์อะไรในชีวิตจริง?":"Real-life uses of finding area?"} a={lang==="TH"?"ใช้คำนวณจำนวนกระเบื้องปูพื้น ปริมาณสีที่ต้องใช้ทาผนัง คำนวณราคาที่ดิน หรือการออกแบบเฟอร์นิเจอร์ให้เข้ากับห้อง.":"Calculating floor tiles needed, amount of paint for walls, pricing land, or designing furniture to fit a room space."} />
        <FAQItem q={lang==="TH"?"ถ้าเป็นรูปทรงหลายเหลี่ยม (Polygon) ต้องคำนวณอย่างไร?":"How to calculate irregular polygons?"} a={lang==="TH"?"ให้ใช้วิธีแบ่งพื้นที่ออกเป็นรูปทรงพื้นฐานย่อยๆ เช่น แบ่งเป็นสี่เหลี่ยมและสามเหลี่ยมหลายๆ รูป คำนวณพื้นที่แต่ละส่วนแล้วนำมาบวกกัน.":"Break the complex shape down into simpler, basic shapes (like combining rectangles and triangles), calculate each area, and sum them up."} />
        <FAQItem q={lang==="TH"?"พาย (Pi, π) คืออะไร?":"What is Pi (π)?"} a={lang==="TH"?"Pi คืออัตราส่วนระหว่างความยาวเส้นรอบวงของวงกลมต่อความยาวเส้นผ่านศูนย์กลาง ซึ่งมีค่าคงที่เสมอสำหรับวงกลมทุกขนาด (ประมาณ 3.14159).":"Pi is the constant ratio of a circle's circumference to its diameter, approximately 3.14159, regardless of the circle's size."} />
      </SEOFAQ>
    </div>
  );
}

// 10. Volume Shape
export function VolumeShapeCalculator({ lang }: { lang: Lang }) {
  const [shape, setShape] = useLocalState("vsc_shape", "box");
  const [w, setW] = useLocalState("vsc_w", "");
  const [h, setH] = useLocalState("vsc_h", "");
  const [l, setL] = useLocalState("vsc_l", "");
  const [r, setR] = useLocalState("vsc_r", "");
  
  let vol = 0;
  const width = parseFloat(w) || 0;
  const height = parseFloat(h) || 0;
  const length = parseFloat(l) || 0;
  const radius = parseFloat(r) || 0;
  
  if (shape === "box") vol = width * length * height;
  if (shape === "cylinder") vol = Math.PI * radius * radius * height;
  if (shape === "sphere") vol = (4/3) * Math.PI * Math.pow(radius, 3);

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "คำนวณปริมาตรรูปทรง" : "Volume Shape Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "เลือกรูปทรง 3 มิติ" : "Select 3D Shape"}</label>
          <select value={shape} onChange={e=>setShape(e.target.value)} className={inputClass}>
            <option value="box">{lang==="TH"?"ทรงกล่องสี่เหลี่ยม (Box)":"Box (Rectangular Prism)"}</option>
            <option value="cylinder">{lang==="TH"?"ทรงกระบอก (Cylinder)":"Cylinder"}</option>
            <option value="sphere">{lang==="TH"?"ทรงกลม (Sphere)":"Sphere"}</option>
          </select>
        </div>
        
        {shape === "box" && (
          <div className="grid grid-cols-3 gap-2">
            <div><label className={labelClass}>{lang==="TH"?"กว้าง":"Width"}</label><input type="number" value={w} onChange={e=>setW(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>{lang==="TH"?"ยาว":"Length"}</label><input type="number" value={l} onChange={e=>setL(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>{lang==="TH"?"สูง":"Height"}</label><input type="number" value={h} onChange={e=>setH(e.target.value)} className={inputClass} /></div>
          </div>
        )}
        
        {shape === "cylinder" && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>{lang==="TH"?"รัศมีฐาน (r)":"Base Radius"}</label><input type="number" value={r} onChange={e=>setR(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>{lang==="TH"?"ความสูง (h)":"Height"}</label><input type="number" value={h} onChange={e=>setH(e.target.value)} className={inputClass} /></div>
          </div>
        )}

        {shape === "sphere" && (
          <div><label className={labelClass}>{lang==="TH"?"รัศมี (r)":"Radius"}</label><input type="number" value={r} onChange={e=>setR(e.target.value)} className={inputClass} /></div>
        )}
      </div>
      
      {vol > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-purple-50 rounded-xl text-center border border-purple-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "ปริมาตรรวม (หน่วยลูกบาศก์)" : "Total Volume (Cubic units)"}</p>
          <div className="text-4xl font-black text-purple-600 mb-2">{vol.toLocaleString(undefined, {maximumFractionDigits:4})}</div>
        </motion.div>
      )}

      <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณปริมาตร":"Volume Shape FAQ"}>
        <FAQItem q={lang==="TH"?"ปริมาตร (Volume) คืออะไร?":"What is Volume?"} a={lang==="TH"?"ปริมาตรคือปริมาณของพื้นที่ในระบบ 3 มิติ ที่วัตถุนั้นครอบครองอยู่ (ความจุ) มักมีหน่วยเป็นลูกบาศก์ (เช่น ลูกบาศก์เมตร, ลูกบาศก์เซนติเมตร) หรือลิตร.":"Volume is the measure of 3-dimensional space occupied by an object (capacity). Usually measured in cubic units (m³, cm³) or Liters."} />
        <FAQItem q={lang==="TH"?"สูตรหาปริมาตรกล่องสี่เหลี่ยม?":"Formula for a box (rectangular prism)?"} a={lang==="TH"?"ปริมาตรกล่อง = กว้าง × ยาว × สูง.":"Volume = Width × Length × Height."} />
        <FAQItem q={lang==="TH"?"สูตรหาปริมาตรรูปทรงกระบอก?":"Formula for a cylinder's volume?"} a={lang==="TH"?"ปริมาตรทรงกระบอก = พื้นที่ฐาน × สูง หรือ πr²h.":"Volume = Base Area × Height (or πr²h)."} />
        <FAQItem q={lang==="TH"?"สูตรหาปริมาตรรูปทรงกลม?":"Formula for a sphere's volume?"} a={lang==="TH"?"ปริมาตรทรงกลม = (4/3) × π × r³ (พาย อาร์ กำลังสาม).":"Volume = (4/3) × π × r³ (four-thirds Pi times Radius cubed)."} />
        <FAQItem q={lang==="TH"?"1 ลูกบาศก์เมตร เท่ากับกี่ลิตร?":"How many liters in a cubic meter?"} a={lang==="TH"?"1 ลูกบาศก์เมตร (m³) = 1,000 ลิตร.":"1 cubic meter (m³) = 1,000 Liters."} />
        <FAQItem q={lang==="TH"?"1 ลูกบาศก์เซนติเมตร (cc) เท่ากับกี่มิลลิลิตร (ml)?":"Are cubic cm (cc) and ml the same?"} a={lang==="TH"?"มีค่าเท่ากันเป๊ะ! 1 cc (Cubic Centimeter) = 1 ml (มิลลิลิตร).":"They are exactly the same! 1 cubic centimeter (cc) = 1 milliliter (ml)."} />
        <FAQItem q={lang==="TH"?"การคำนวณปริมาตรมีประโยชน์อย่างไรในชีวิตประจำวัน?":"Everyday uses of volume calculation?"} a={lang==="TH"?"ใช้คำนวณความจุน้ำในสระว่ายน้ำ คำนวณปริมาณดินที่ต้องใช้ถมที่ หรือคำนวณขนาดกล่องพัสดุสำหรับส่งของ.":"Calculating pool capacity, estimating soil needed for landscaping, or figuring out the size of shipping boxes."} />
        <FAQItem q={lang==="TH"?"การคำนวณปริมาตรไม้ (คิว) ทำอย่างไร?":"How to calculate wood volume?"} a={lang==="TH"?"ในวงการไม้ไทย นิยมใช้หน่วย 'ฟุต' หรือ 'เมตร' ปริมาตรไม้ 1 คิว (Cubic Meter) = กว้าง 1 ม. × ยาว 1 ม. × สูง 1 ม.":"In Thailand, wood is often measured in 'Cubic Meters' (Q). 1 Q = 1m × 1m × 1m."} />
        <FAQItem q={lang==="TH"?"ปริมาตรและความหนาแน่น (Density) เกี่ยวกันอย่างไร?":"How do volume and density relate?"} a={lang==="TH"?"มวล (น้ำหนัก) = ปริมาตร × ความหนาแน่น เช่น เหล็กมีปริมาตรเท่ากับโฟม แต่เหล็กหนักกว่าเพราะมีความหนาแน่นสูงกว่า.":"Mass = Volume × Density. A block of iron and a block of foam can have the same volume, but iron is heavier due to higher density."} />
        <FAQItem q={lang==="TH"?"ถ้าวัตถุมีรูปร่างไม่แน่นอน (Irregular shape) จะหาปริมาตรอย่างไร?":"How to find the volume of an irregular object?"} a={lang==="TH"?"ใช้วิธี 'การแทนที่น้ำ' (Water Displacement) นำวัตถุใส่ลงในถ้วยตวงที่มีน้ำ ปริมาตรน้ำที่เพิ่มขึ้นจะเท่ากับปริมาตรของวัตถุนั้น (หลักการของอาร์คิมีดีส).":"Use Water Displacement (Archimedes' principle). Submerge the object in water; the volume of displaced water equals the volume of the object."} />
      </SEOFAQ>
    </div>
  );
}

// 11. Working Days
export function WorkingDaysCalculator({ lang }: { lang: Lang }) {
  const [start, setStart] = useLocalState("wd_start", "");
  const [end, setEnd] = useLocalState("wd_end", "");
  
  let totalDays = 0;
  let workDays = 0;
  
  if (start && end) {
    const sDate = new Date(start);
    const eDate = new Date(end);
    if (!isNaN(sDate.getTime()) && !isNaN(eDate.getTime()) && eDate >= sDate) {
      const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
      totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
      
      let current = new Date(sDate);
      while (current <= eDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0=Sun, 6=Sat
          workDays++;
        }
        current.setDate(current.getDate() + 1);
      }
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-purple-600">{lang === "TH" ? "คำนวณวันทำงาน" : "Working Days Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "วันที่เริ่มต้น" : "Start Date"}</label>
            <input type="date" value={start} onChange={e=>setStart(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "วันที่สิ้นสุด" : "End Date"}</label>
            <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
      
      {totalDays > 0 && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-6 bg-purple-50 rounded-xl text-center border border-purple-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 mb-2">{lang === "TH" ? "จำนวนวันทั้งหมด" : "Total Calendar Days"}</p>
              <div className="text-3xl font-black text-gray-700">{totalDays}</div>
            </div>
            <div>
              <p className="text-purple-600 font-bold mb-2">{lang === "TH" ? "จำนวนวันทำงาน (จ.-ศ.)" : "Working Days (Mon-Fri)"}</p>
              <div className="text-4xl font-black text-purple-600">{workDays}</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">*{lang==="TH"?"คำนวณโดยไม่รวมวันหยุดเสาร์-อาทิตย์ (ยังไม่หักวันหยุดนักขัตฤกษ์)":"Excludes weekends. Public holidays are not accounted for."}</p>
        </motion.div>
      )}

      <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณวันทำงาน":"Working Days FAQ"}>
        <FAQItem q={lang==="TH"?"วันทำงาน (Working Days) นับอย่างไร?":"How are working days counted?"} a={lang==="TH"?"โดยทั่วไปจะนับเฉพาะวันจันทร์ถึงวันศุกร์ ตัดวันเสาร์และวันอาทิตย์ออก (ตามมาตรฐานสากลและบริษัทส่วนใหญ่).":"Typically, working days include only Monday through Friday, excluding weekends (Saturday and Sunday)."} />
        <FAQItem q={lang==="TH"?"โปรแกรมนี้หักวันหยุดนักขัตฤกษ์ให้ด้วยไหม?":"Does this subtract public holidays?"} a={lang==="TH"?"เครื่องมือนี้จะหักเฉพาะวันเสาร์-อาทิตย์เท่านั้น เนื่องจากวันหยุดนักขัตฤกษ์มีการเปลี่ยนแปลงทุกปีและขึ้นอยู่กับประกาศของแต่ละประเทศ/บริษัท คุณจึงต้องนำวันทำงานที่คำนวณได้ไปลบวันหยุดนักขัตฤกษ์เอง.":"No, it only subtracts weekends. Public holidays change yearly and vary by country/company, so you need to manually subtract them from the final result."} />
        <FAQItem q={lang==="TH"?"คำนวณแบบรวมวันแรกและวันสุดท้ายด้วยไหม (Inclusive)?":"Is the calculation inclusive of start/end dates?"} a={lang==="TH"?"ใช่ครับ โปรแกรมนี้คำนวณแบบ Inclusive คือนับทั้งวันที่เริ่มต้นและวันที่สิ้นสุดรวมเข้าไปด้วย.":"Yes, this calculator is inclusive, meaning it counts both the start date and the end date."} />
        <FAQItem q={lang==="TH"?"การคำนวณวันทำงานมีประโยชน์อย่างไร?":"Why calculate working days?"} a={lang==="TH"?"เพื่อใช้ประเมินระยะเวลาส่งมอบงาน (SLA) วางแผนโปรเจกต์ คำนวณวันลาพักร้อน หรือคิดค่าปรับความล่าช้าในสัญญาจ้าง.":"Useful for estimating delivery times (SLA), project planning, calculating vacation leave, or tracking late penalties in contracts."} />
        <FAQItem q={lang==="TH"?"กฎหมายแรงงานกำหนดเวลาทำงานอย่างไร?":"What are the legal working hours in Thailand?"} a={lang==="TH"?"กฎหมายแรงงานไทยกำหนดให้ทำงานไม่เกิน 8 ชม./วัน และไม่เกิน 48 ชม./สัปดาห์ หากทำงานล่วงเวลาต้องจ่ายค่า OT.":"Thai labor law states max 8 hours/day and 48 hours/week. Overtime must be compensated with OT pay."} />
        <FAQItem q={lang==="TH"?"วันหยุดประจำสัปดาห์ตามกฎหมาย?":"Legal weekly holidays?"} a={lang==="TH"?"นายจ้างต้องจัดให้มีวันหยุดประจำสัปดาห์อย่างน้อย 1 วันต่อสัปดาห์ (ส่วนใหญ่คือวันอาทิตย์) โดยระยะห่างของวันหยุดต้องไม่เกิน 6 วัน.":"Employers must provide at least 1 day off per week (usually Sunday). The interval between weekly holidays must not exceed 6 days."} />
        <FAQItem q={lang==="TH"?"ถ้าต้องนับรวมวันเสาร์ด้วย ต้องทำอย่างไร?":"What if my company works on Saturdays?"} a={lang==="TH"?"ปัจจุบันเครื่องมือนี้อิงตามมาตรฐานวันหยุด 2 วัน (ส.-อา.) หากบริษัทคุณทำวันเสาร์ คุณสามารถนำ 'จำนวนวันทั้งหมด' ไปหักออกเฉพาะจำนวนวันอาทิตย์ที่อยู่ในช่วงนั้นแทน.":"Currently, this tool uses the standard 5-day week. If you work Saturdays, you should manually subtract only the Sundays from the 'Total Calendar Days'."} />
        <FAQItem q={lang==="TH"?"1 ปีมีวันทำงานประมาณกี่วัน?":"How many working days in a year?"} a={lang==="TH"?"1 ปีมี 365 วัน ลบเสาร์-อาทิตย์ (104 วัน) และลบวันหยุดนักขัตฤกษ์ (ประมาณ 15 วัน) จะเหลือวันทำงานเฉลี่ยประมาณ 245-250 วันต่อปี.":"A year has 365 days minus 104 weekend days and ~15 public holidays, leaving approximately 245-250 working days per year."} />
        <FAQItem q={lang==="TH"?"SLA (Service Level Agreement) คืออะไร?":"What is SLA?"} a={lang==="TH"?"SLA คือข้อตกลงระดับการให้บริการ เช่น 'จะตอบกลับภายใน 3 วันทำการ' (3 Working Days) ซึ่งหมายความว่าหากส่งเรื่องวันศุกร์ บริษัทจะตอบกลับภายในวันพุธ (ไม่นับส.-อา.).":"Service Level Agreement. E.g., 'Will reply in 3 working days'. If submitted on Friday, they will reply by Wednesday (skipping the weekend)."} />
        <FAQItem q={lang==="TH"?"การลาพักร้อนตามกฎหมายได้กี่วัน?":"Legal annual leave days?"} a={lang==="TH"?"พนักงานที่ทำงานติดต่อกันครบ 1 ปี มีสิทธิลาหยุดพักผ่อนประจำปี (ลาพักร้อน) ไม่น้อยกว่า 6 วันทำงานต่อปี.":"Employees who have worked continuously for 1 year are entitled to at least 6 working days of annual leave per year."} />
      </SEOFAQ>
    </div>
  );
}
