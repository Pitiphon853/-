"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass } from "./shared";

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
