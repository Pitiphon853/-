"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, FAQ, FAQItem } from "./shared";

// 1. BTU
export function BTUCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useLocalState("btu_w", "");
  const [length, setLength] = useLocalState("btu_l", "");
  const [roomType, setRoomType] = useLocalState("btu_type", "normal");
  const [btu, setBtu] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (w > 0 && l > 0) {
      setBtu(Math.ceil((w * l) * (roomType === "sun" ? 900 : 800)));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณ BTU แอร์" : "AC BTU Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "กว้าง (ม.)" : "Width (m)"}</label>
            <input type="number" value={width} onChange={e=>setWidth(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ยาว (ม.)" : "Length (m)"}</label>
            <input type="number" value={length} onChange={e=>setLength(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "สภาพห้อง" : "Room Condition"}</label>
          <select value={roomType} onChange={e=>setRoomType(e.target.value)} className={`${inputClass} focus:ring-blue-400`}>
            <option value="normal">{lang === "TH" ? "ห้องปกติ (ไม่ค่อยโดนแดด)" : "Normal Room"}</option>
            <option value="sun">{lang === "TH" ? "ห้องโดนแดด" : "Sunny Room"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {btu && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ขนาดแอร์ที่แนะนำ" : "Recommended BTU"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-300">{btu.toLocaleString()} BTU</div>
          <ShareButtons title={`ขนาดแอร์ที่เหมาะกับห้องของฉันคือ ${btu.toLocaleString()} BTU`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
      <FAQ title={lang === "TH" ? "การเลือกซื้อแอร์ (FAQ)" : "AC FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมห้องโดนแดดต้องเพิ่ม BTU?" : "Why add BTU for sunny rooms?"}
          a={lang === "TH" ? "ห้องที่โดนแดดโดยตรงจะสะสมความร้อนมากกว่าปกติ หากใช้แอร์ BTU ต่ำ คอมเพรสเซอร์จะทำงานหนักตลอดเวลา ทำให้กินไฟและแอร์เสียเร็ว" : "Sunny rooms retain heat, requiring a larger AC to cool down efficiently."}
        />
      </FAQ>
    </div>
  );
}

// 2. Electric Bill
export function ElectricCalculator({ lang }: { lang: Lang }) {
  const [units, setUnits] = useLocalState("elec_u", "");
  const [price, setPrice] = useLocalState("elec_p", "4.18");
  const [bill, setBill] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseFloat(units);
    const p = parseFloat(price);
    if (u > 0 && p > 0) setBill(u * p);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าไฟฟ้า" : "Electricity Bill"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณที่ใช้ (หน่วย/kWh)" : "Units Used (kWh)"}</label>
          <input type="number" value={units} onChange={e=>setUnits(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาต่อหน่วย (บาท)" : "Price per Unit (฿)"}</label>
          <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {bill !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ค่าไฟประเมินของคุณ" : "Estimated Bill"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{bill.toLocaleString(undefined, {maximumFractionDigits:2})} ฿</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 3. Water Bill
export function WaterCalculator({ lang }: { lang: Lang }) {
  const [units, setUnits] = useLocalState("water_u", "");
  const [price, setPrice] = useLocalState("water_p", "10.5");
  const [bill, setBill] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseFloat(units);
    const p = parseFloat(price);
    if (u > 0 && p > 0) setBill(u * p);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าน้ำประปา" : "Water Bill"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณน้ำที่ใช้ (คิว)" : "Units Used (Cubic Meters)"}</label>
          <input type="number" value={units} onChange={e=>setUnits(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาต่อคิว (บาท)" : "Price per Unit (฿)"}</label>
          <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {bill !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ค่าน้ำประเมินของคุณ" : "Estimated Bill"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{bill.toLocaleString(undefined, {maximumFractionDigits:2})} ฿</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 4. Base N
export function BaseNCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("basen_v", "");
  const [fromBase, setFromBase] = useLocalState("basen_from", "10");
  const [toBase, setToBase] = useLocalState("basen_to", "2");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const num = parseInt(val, parseInt(fromBase));
      if (!isNaN(num)) setRes(num.toString(parseInt(toBase)).toUpperCase());
      else setRes("Invalid Input");
    } catch {
      setRes("Error");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "แปลงเลขฐาน" : "Base N Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ค่าที่ต้องการแปลง" : "Value"}</label>
          <input type="text" value={val} onChange={e=>setVal(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "จากฐาน" : "From Base"}</label>
            <input type="number" min="2" max="36" value={fromBase} onChange={e=>setFromBase(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เป็นฐาน" : "To Base"}</label>
            <input type="number" min="2" max="36" value={toBase} onChange={e=>setToBase(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "แปลงค่า" : "Convert"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30 break-all">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "ผลลัพธ์" : "Result"}</p>
          <div className="text-4xl font-black text-blue-600 dark:text-blue-300">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 5. Ohm's Law
export function OhmCalculator({ lang }: { lang: Lang }) {
  const [v, setV] = useLocalState("ohm_v", "");
  const [i, setI] = useLocalState("ohm_i", "");
  const [r, setR] = useLocalState("ohm_r", "");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const V = parseFloat(v);
    const I = parseFloat(i);
    const R = parseFloat(r);
    
    if (!isNaN(I) && !isNaN(R)) setRes(`V = ${(I * R).toFixed(2)} Volts`);
    else if (!isNaN(V) && !isNaN(R)) setRes(`I = ${(V / R).toFixed(2)} Amps`);
    else if (!isNaN(V) && !isNaN(I)) setRes(`R = ${(V / I).toFixed(2)} Ohms`);
    else setRes("Please enter 2 values");
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-500">{lang === "TH" ? "กฎของโอห์ม" : "Ohm's Law"}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{lang === "TH" ? "กรอก 2 ค่าเพื่อหาค่าที่เหลือ" : "Enter 2 values to find the 3rd"}</p>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <input type="number" step="any" placeholder="Voltage (V)" value={v} onChange={e=>setV(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <input type="number" step="any" placeholder="Current (I)" value={i} onChange={e=>setI(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <input type="number" step="any" placeholder="Resistance (R)" value={r} onChange={e=>setR(e.target.value)} className={`${inputClass} focus:ring-blue-500`} />
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 6. Resistor
export function ResistorCalculator({ lang }: { lang: Lang }) {
  const [bandType, setBandType] = useLocalState("res_type", "4");
  const [b1, setB1] = useLocalState("res_b1", "1");
  const [b2, setB2] = useLocalState("res_b2", "0");
  const [b3, setB3] = useLocalState("res_b3", "0");
  const [mul, setMul] = useLocalState("res_mul", "1");
  const [tol, setTol] = useLocalState("res_tol", "5");
  const [res, setRes] = useState("");

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    let valStr = "";
    if (bandType === "4") valStr = `${b1}${b2}`;
    else valStr = `${b1}${b2}${b3}`;
    
    const val = parseInt(valStr) * parseFloat(mul);
    let displayVal = `${val} Ω`;
    if (val >= 1000000) displayVal = `${val/1000000} MΩ`;
    else if (val >= 1000) displayVal = `${val/1000} kΩ`;

    setRes(`${displayVal} ±${tol}%`);
  };

  const colors = [
    { name: "Black", val: "0", mul: "1" },
    { name: "Brown", val: "1", mul: "10" },
    { name: "Red", val: "2", mul: "100" },
    { name: "Orange", val: "3", mul: "1000" },
    { name: "Yellow", val: "4", mul: "10000" },
    { name: "Green", val: "5", mul: "100000" },
    { name: "Blue", val: "6", mul: "1000000" },
    { name: "Violet", val: "7", mul: "10000000" },
    { name: "Gray", val: "8", mul: "100000000" },
    { name: "White", val: "9", mul: "1000000000" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "อ่านค่าตัวต้านทาน" : "Resistor Color Code"}</h2>
      
      <div className="flex gap-4 mt-6 mb-4">
        <button onClick={() => setBandType("4")} className={`px-4 py-2 rounded-full font-bold text-sm ${bandType === "4" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>4-Band</button>
        <button onClick={() => setBandType("5")} className={`px-4 py-2 rounded-full font-bold text-sm ${bandType === "5" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>5-Band</button>
      </div>

      <form onSubmit={calculate} className="space-y-4">
        <select value={b1} onChange={e=>setB1(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.val}>Band 1: {c.name}</option>)}
        </select>
        <select value={b2} onChange={e=>setB2(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.val}>Band 2: {c.name}</option>)}
        </select>
        {bandType === "5" && (
          <select value={b3} onChange={e=>setB3(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
            {colors.map(c => <option key={c.name} value={c.val}>Band 3: {c.name}</option>)}
          </select>
        )}
        <select value={mul} onChange={e=>setMul(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          {colors.map(c => <option key={c.name} value={c.mul}>Multiplier: {c.name}</option>)}
          <option value="0.1">Multiplier: Gold (0.1)</option>
          <option value="0.01">Multiplier: Silver (0.01)</option>
        </select>
        <select value={tol} onChange={e=>setTol(e.target.value)} className={`${inputClass} focus:ring-blue-500`}>
          <option value="1">Tolerance: Brown (±1%)</option>
          <option value="2">Tolerance: Red (±2%)</option>
          <option value="0.5">Tolerance: Green (±0.5%)</option>
          <option value="0.25">Tolerance: Blue (±0.25%)</option>
          <option value="5">Tolerance: Gold (±5%)</option>
          <option value="10">Tolerance: Silver (±10%)</option>
        </select>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "อ่านค่า" : "Read Value"}</button>
      </form>
      {res && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{res}</div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}

// 7. GPA
export function GPACalculator({ lang }: { lang: Lang }) {
  const [subjects, setSubjects] = useLocalState("gpa_subs", [{ name: "", credit: "", grade: "4" }]);
  const [gpa, setGpa] = useState<number | null>(null);

  const calculate = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    subjects.forEach(s => {
      const c = parseFloat(s.credit);
      const g = parseFloat(s.grade);
      if (!isNaN(c) && !isNaN(g)) {
        totalCredits += c;
        totalPoints += c * g;
      }
    });
    if (totalCredits > 0) setGpa(totalPoints / totalCredits);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "จำลองเกรดเบื้องต้น (GPA)" : "GPA Simulator"}</h2>
      <div className="space-y-4 mt-6">
        {subjects.map((sub, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input type="text" placeholder={lang==="TH"?"ชื่อวิชา (ไม่บังคับ)":"Subject Name"} value={sub.name} onChange={e => {
              const newSubs = [...subjects]; newSubs[i].name = e.target.value; setSubjects(newSubs);
            }} className={`sm:w-1/3 ${inputClass} focus:ring-blue-400`} />
            <div className="flex gap-2 sm:w-2/3">
              <input type="number" placeholder={lang==="TH"?"หน่วยกิต":"Credits"} value={sub.credit} onChange={e => {
                const newSubs = [...subjects]; newSubs[i].credit = e.target.value; setSubjects(newSubs);
              }} className={`w-1/2 ${inputClass} focus:ring-blue-400`} />
              <select value={sub.grade} onChange={e => {
                const newSubs = [...subjects]; newSubs[i].grade = e.target.value; setSubjects(newSubs);
              }} className={`w-1/2 ${inputClass} focus:ring-blue-400`}>
                <option value="4">A (4.0)</option>
                <option value="3.5">B+ (3.5)</option>
                <option value="3">B (3.0)</option>
                <option value="2.5">C+ (2.5)</option>
                <option value="2">C (2.0)</option>
                <option value="1.5">D+ (1.5)</option>
                <option value="1">D (1.0)</option>
                <option value="0">F (0.0)</option>
              </select>
              <button onClick={() => {
                const newSubs = subjects.filter((_, idx) => idx !== i);
                setSubjects(newSubs.length > 0 ? newSubs : [{ name: "", credit: "", grade: "4" }]);
              }} className="px-3 bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 rounded font-bold">X</button>
            </div>
          </div>
        ))}
        <button onClick={() => setSubjects([...subjects, { name: "", credit: "", grade: "4" }])} className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">+ {lang === "TH" ? "เพิ่มวิชา" : "Add Subject"}</button>
        <button onClick={calculate} className="w-full py-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 shadow-md">{lang === "TH" ? "คำนวณ" : "Calculate"}</button>
      </div>
      {gpa !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-500/30">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{lang === "TH" ? "เกรดเฉลี่ยของคุณคือ" : "Your GPA"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-300">{gpa.toFixed(2)}</div>
          <ShareButtons title={`เทอมนี้ได้เกรด ${gpa.toFixed(2)} แหละทุกคน!`} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />
    </div>
  );
}
