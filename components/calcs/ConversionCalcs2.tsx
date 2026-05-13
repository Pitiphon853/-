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
  return <div><h2 className="text-3xl font-black mb-2 text-purple-600">Area Shape Calculator (WIP)</h2></div>;
}

// 10. Volume Shape
export function VolumeShapeCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-purple-600">Volume Shape Calculator (WIP)</h2></div>;
}

// 11. Working Days
export function WorkingDaysCalculator({ lang }: { lang: Lang }) {
  return <div><h2 className="text-3xl font-black mb-2 text-purple-600">Working Days Calculator (WIP)</h2></div>;
}
