"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { ShareButtons } from "../ShareButtons";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

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
      <SEOFAQ title={lang === "TH" ? "การเลือกซื้อแอร์ (FAQ)" : "AC FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมห้องโดนแดดต้องเพิ่ม BTU?" : "Why add BTU for sunny rooms?"}
          a={lang === "TH" ? "ห้องที่โดนแดดโดยตรงจะสะสมความร้อนมากกว่าปกติ หากใช้แอร์ BTU ต่ำ คอมเพรสเซอร์จะทำงานหนักตลอดเวลา ทำให้กินไฟและแอร์เสียเร็ว" : "Sunny rooms retain heat, requiring a larger AC to cool down efficiently."}
        />
      </SEOFAQ>
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

// 4. Base N — Full Feature
export function BaseNCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("basen_v", "255");
  const [fromBase, setFromBase] = useLocalState("basen_from", "10");
  const [customToBase, setCustomToBase] = useLocalState("basen_custom_to", "2");

  // Common bases to always show
  const commonBases = [
    { base: 2,  label: lang === "TH" ? "ฐาน 2 (Binary)" : "Base 2 (Binary)",         bg: "bg-blue-50 dark:bg-blue-900/20",     border: "border-blue-200 dark:border-blue-500/30",     text: "text-blue-600 dark:text-blue-400" },
    { base: 4,  label: lang === "TH" ? "ฐาน 4 (Quaternary)" : "Base 4 (Quaternary)", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-500/30", text: "text-purple-600 dark:text-purple-400" },
    { base: 8,  label: lang === "TH" ? "ฐาน 8 (Octal)" : "Base 8 (Octal)",           bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-500/30", text: "text-orange-600 dark:text-orange-400" },
    { base: 10, label: lang === "TH" ? "ฐาน 10 (Decimal)" : "Base 10 (Decimal)",     bg: "bg-green-50 dark:bg-green-900/20",   border: "border-green-200 dark:border-green-500/30",   text: "text-green-600 dark:text-green-400" },
    { base: 16, label: lang === "TH" ? "ฐาน 16 (Hexadecimal)" : "Base 16 (Hex)",     bg: "bg-rose-50 dark:bg-rose-900/20",     border: "border-rose-200 dark:border-rose-500/30",     text: "text-rose-600 dark:text-rose-400" },
  ];

  const isValidForBase = (input: string, base: number): boolean => {
    if (!input) return false;
    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    return input.toUpperCase().split("").every(c => validChars.includes(c));
  };

  const fb = parseInt(fromBase) || 10;
  const isValid = Boolean(val && isValidForBase(val, fb));
  const decimalValue = isValid ? parseInt(val.toUpperCase(), fb) : NaN;

  // Step-by-step: any base → decimal (positional notation)
  const getToDecimalSteps = () => {
    if (!isValid || isNaN(decimalValue) || fb === 10) return [];
    const digits = val.toUpperCase().split("").reverse();
    const rows = digits.map((d, i) => {
      const dVal = parseInt(d, fb);
      const power = Math.pow(fb, i);
      return { d, dVal, power, product: dVal * power };
    }).reverse();
    return rows;
  };

  // Step-by-step: decimal → any base (short division)
  const getDivisionSteps = (decimal: number, base: number) => {
    if (decimal === 0) return [{ dividend: 0, quotient: 0, remainder: "0" }];
    const steps: { dividend: number; quotient: number; remainder: string }[] = [];
    let n = decimal;
    while (n > 0) {
      const r = n % base;
      steps.push({ dividend: n, quotient: Math.floor(n / base), remainder: r.toString(base).toUpperCase() });
      n = Math.floor(n / base);
    }
    return steps;
  };

  const toDecimalRows = getToDecimalSteps();
  const customTo = Math.min(36, Math.max(2, parseInt(customToBase) || 2));
  const customResult = !isNaN(decimalValue) ? decimalValue.toString(customTo).toUpperCase() : "";
  const divSteps = !isNaN(decimalValue) && customTo !== 10 ? getDivisionSteps(decimalValue, customTo) : [];

  const quickBases = [2, 4, 8, 10, 16, 32, 36];

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">
        {lang === "TH" ? "แปลงเลขฐาน (ครบทุกฐาน)" : "Number Base Converter"}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {lang === "TH" ? "รองรับฐาน 2–36 พร้อมแสดงวิธีคำนวณทีละขั้น" : "Supports Base 2–36 with full step-by-step explanation"}
      </p>

      {/* ── Input Block ── */}
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <label className={labelClass}>{lang === "TH" ? "ค่าที่ต้องการแปลง" : "Input Value"}</label>
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value.toUpperCase())}
          className={`${inputClass} font-mono text-xl text-center font-bold tracking-widest mb-4 ${
            val && !isValid ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-400"
          }`}
          placeholder="255 / FF / 11111111"
        />

        <label className={labelClass}>{lang === "TH" ? "จากฐาน (From Base)" : "From Base"}</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickBases.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setFromBase(String(b))}
              className={`px-3 py-1.5 rounded-lg font-bold text-sm border-2 transition-all ${
                fb === b ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-blue-400"
              }`}
            >
              {lang === "TH" ? `ฐาน ${b}` : `Base ${b}`}
            </button>
          ))}
        </div>
        <input
          type="number" min="2" max="36"
          value={fromBase}
          onChange={e => setFromBase(e.target.value)}
          className={`${inputClass} focus:ring-blue-400 w-28`}
          placeholder="2–36"
        />

        {val && !isValid && (
          <p className="mt-2 text-sm text-red-500 font-bold">
            ⚠️ {lang === "TH" ? `ตัวเลข "${val}" ไม่ถูกต้องสำหรับฐาน ${fb}` : `"${val}" contains invalid digit(s) for Base ${fb}`}
          </p>
        )}
      </div>

      {/* ── Results ── */}
      {isValid && !isNaN(decimalValue) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* All common bases */}
          <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">
            🔢 {lang === "TH" ? "ผลลัพธ์ทุกฐานพร้อมกัน" : "Results in All Common Bases"}
          </h3>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {commonBases.map(({ base, label, bg, border, text }) => {
              const result = decimalValue.toString(base).toUpperCase();
              const isSource = base === fb;
              return (
                <div
                  key={base}
                  className={`${bg} ${border} border-2 p-4 rounded-xl flex items-center justify-between gap-4 ${isSource ? "ring-2 ring-offset-2 ring-blue-400 dark:ring-blue-500" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                      {label}{isSource && <span className="ml-2 bg-blue-500 text-white px-2 py-0.5 rounded text-xs">INPUT</span>}
                    </p>
                    <p className={`text-xl font-black font-mono tracking-widest break-all ${text}`}>{result}</p>
                  </div>
                  <button
                    onClick={() => { setVal(result); setFromBase(String(base)); }}
                    className="text-xs font-bold bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors flex-shrink-0"
                  >
                    {lang === "TH" ? "ใช้ค่านี้" : "Use"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Step-by-step: Input → Decimal */}
          {toDecimalRows.length > 0 && (
            <CalculationSteps
              title={lang === "TH" ? `📐 วิธีแปลงฐาน ${fb} → ฐาน 10 ทีละขั้น` : `📐 How to Convert Base ${fb} → Base 10`}
              steps={
                <div>
                  <p className="mb-3 font-bold">
                    {lang === "TH"
                      ? `${val} (ฐาน ${fb}) = กระจายค่าประจำหลัก:`
                      : `${val} (Base ${fb}) = Expand positional values:`}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-mono mb-3">
                      <thead>
                        <tr className="text-blue-800 dark:text-blue-300 text-xs font-bold border-b border-blue-300 dark:border-blue-700">
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "หลัก" : "Digit"}</th>
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "ตำแหน่ง" : "Position"}</th>
                          <th className="text-left py-1 pr-3">{lang === "TH" ? "ค่าประจำหลัก" : "Positional Value"}</th>
                          <th className="text-left py-1">{lang === "TH" ? "ผลคูณ" : "Product"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {toDecimalRows.map((row, i) => (
                          <tr key={i} className="border-b border-blue-100 dark:border-blue-800/30 text-blue-900 dark:text-blue-100">
                            <td className="py-1 pr-3 font-black">{row.d}</td>
                            <td className="py-1 pr-3">{fb}^{toDecimalRows.length - 1 - i}</td>
                            <td className="py-1 pr-3">{row.d} × {row.power}</td>
                            <td className="py-1 font-bold">{row.product}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="font-black text-green-700 dark:text-green-300 text-base border-t border-blue-300 dark:border-blue-700 pt-2">
                      {lang === "TH" ? "รวมทั้งหมด" : "Total"} = {toDecimalRows.map(r => r.product).join(" + ")} = <span className="text-xl">{decimalValue}</span>
                    </p>
                  </div>
                </div>
              }
            />
          )}

          {/* ── Custom base converter ── */}
          <div className="mt-6 bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
            <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4">
              🎯 {lang === "TH" ? "แปลงเป็นฐานที่กำหนดเอง (ฐาน 2–36)" : "Convert to Any Custom Base (2–36)"}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickBases.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setCustomToBase(String(b))}
                  className={`px-3 py-1.5 rounded-lg font-bold text-sm border-2 transition-all ${
                    customTo === b ? "bg-purple-500 text-white border-purple-500" : "border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-purple-400"
                  }`}
                >
                  {lang === "TH" ? `ฐาน ${b}` : `Base ${b}`}
                </button>
              ))}
            </div>
            <div className="flex gap-3 items-center mb-4">
              <input
                type="number" min="2" max="36"
                value={customToBase}
                onChange={e => setCustomToBase(e.target.value)}
                className={`${inputClass} focus:ring-purple-400 w-28`}
                placeholder="2–36"
              />
              <span className="text-gray-400 font-bold text-2xl">→</span>
              <div className="flex-1 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl text-center">
                <p className="text-3xl font-black font-mono text-purple-600 dark:text-purple-400 tracking-widest break-all">{customResult || "—"}</p>
                <p className="text-xs text-gray-500 mt-1">{lang === "TH" ? `ฐาน ${customTo}` : `Base ${customTo}`}</p>
              </div>
            </div>

            {/* Division table */}
            {divSteps.length > 0 && (
              <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-500/20">
                <p className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm">
                  📐 {lang === "TH" ? `วิธีแปลงฐาน 10 → ฐาน ${customTo} (วิธีหารสั้น)` : `Base 10 → Base ${customTo} (Short Division Method)`}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="text-purple-700 dark:text-purple-300 text-xs font-bold border-b border-purple-200 dark:border-purple-700">
                        <th className="text-left pb-2 pr-4">{lang === "TH" ? "ตัวตั้ง" : "Dividend"}</th>
                        <th className="text-left pb-2 pr-4">÷ {customTo}</th>
                        <th className="text-left pb-2 pr-4">{lang === "TH" ? "ผลหาร" : "Quotient"}</th>
                        <th className="text-left pb-2">{lang === "TH" ? "เศษ" : "Remainder"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {divSteps.map((s, i) => (
                        <tr key={i} className={`border-b border-purple-100 dark:border-purple-800/30 ${i === divSteps.length - 1 ? "text-green-700 dark:text-green-300 font-black" : "text-purple-900 dark:text-purple-200"}`}>
                          <td className="py-1 pr-4">{s.dividend}</td>
                          <td className="py-1 pr-4">÷ {customTo}</td>
                          <td className="py-1 pr-4">{s.quotient}</td>
                          <td className="py-1 font-black">{s.remainder}{i === divSteps.length - 1 ? " ← MSB" : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 pt-2 border-t border-purple-300 dark:border-purple-700">
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      {lang === "TH" ? "อ่านเศษจากล่างขึ้นบน →" : "Read remainders bottom-to-top →"}
                      <span className="ml-2 text-xl font-black tracking-widest">{customResult}</span>
                      <span className="ml-2 text-xs text-gray-500">(Base {customTo})</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {customTo === 10 && customResult && (
              <p className="text-sm text-gray-500 mt-3 italic">
                {lang === "TH" ? "*ฐาน 10 คือ Decimal อยู่แล้ว ไม่ต้องแปลง" : "*Base 10 is decimal — no conversion needed."}
              </p>
            )}
          </div>

          <AdPlaceholder type="in-article" />

          <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (แปลงเลขฐาน)" : "Number Base Converter FAQ"}>
            <FAQItem
              q={lang === "TH" ? "เลขฐาน 2 (Binary) คืออะไร ทำไมคอมพิวเตอร์ใช้?" : "What is binary (Base 2) and why computers use it?"}
              a={lang === "TH"
                ? "คอมพิวเตอร์ทำงานด้วยวงจรไฟฟ้าที่มีแค่ 2 สถานะ: เปิด (1) และ ปิด (0) จึงใช้เลขฐาน 2 เก็บและประมวลผลข้อมูลทุกอย่าง ไม่ว่าตัวเลข ข้อความ หรือรูปภาพ"
                : "Computers use electrical circuits with only 2 states — ON (1) and OFF (0). Every piece of data is stored as combinations of these bits."}
            />
            <FAQItem
              q={lang === "TH" ? "เลขฐาน 16 (Hex) ใช้ที่ไหนบ้าง?" : "Where is Hexadecimal (Base 16) used?"}
              a={lang === "TH"
                ? "ใช้กันมากในการเขียนโปรแกรม เช่น สีใน CSS (#FF5733), ที่อยู่หน่วยความจำ (Memory Address), ค่า Hash และ MAC Address"
                : "Widely used in programming: CSS colors (#FF5733), memory addresses, hash values, and MAC addresses."}
            />
            <FAQItem
              q={lang === "TH" ? "วิธีแปลงเลขฐาน 2 → ฐาน 10 ด้วยมือ?" : "How to convert binary to decimal manually?"}
              a={lang === "TH"
                ? "กระจายแต่ละหลักคูณด้วย 2 ยกกำลังตำแหน่ง แล้วบวกทุกค่า\nเช่น: 1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8+0+2+1 = 11"
                : "Multiply each digit by 2^position and sum all values.\nEx: 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11"}
            />
            <FAQItem
              q={lang === "TH" ? "วิธีแปลงฐาน 10 → ฐานอื่น ทำยังไง?" : "How to convert decimal to another base?"}
              a={lang === "TH"
                ? "ใช้วิธีหารสั้น: นำเลขมาหารด้วยฐานที่ต้องการ จดเศษ แล้วนำผลหารมาหารซ้ำจนเหลือ 0 จากนั้นอ่านเศษจากล่างขึ้นบน ก็จะได้ผลลัพธ์"
                : "Use the short division method: divide by the target base, note the remainder, repeat with the quotient until 0, then read remainders bottom-to-top."}
            />
          </SEOFAQ>
        </motion.div>
      )}
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

// 8. Fuel Cost
export function FuelCostCalculator({ lang }: { lang: Lang }) {
  const [distance, setDistance] = useLocalState("fuel_dist", "");
  const [efficiency, setEfficiency] = useLocalState("fuel_eff", "15");
  const [price, setPrice] = useLocalState("fuel_price", "35.50");
  const [result, setResult] = useState<{liters: number, cost: number} | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(distance);
    const eff = parseFloat(efficiency);
    const p = parseFloat(price);

    if (d > 0 && eff > 0 && p > 0) {
      const liters = d / eff;
      const cost = liters * p;
      setResult({ liters, cost });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-blue-600 dark:text-blue-400">{lang === "TH" ? "คำนวณค่าน้ำมันรถยนต์" : "Fuel Cost Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระยะทาง (กม.)" : "Distance (km)"}</label>
          <input type="number" step="0.1" value={distance} onChange={e=>setDistance(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} placeholder={lang==="TH"?"เช่น 250":"e.g. 250"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราสิ้นเปลือง (กม./ลิตร)" : "Fuel Efficiency (km/L)"}</label>
            <input type="number" step="0.1" value={efficiency} onChange={e=>setEfficiency(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาน้ำมัน (บาท/ลิตร)" : "Fuel Price per Liter"}</label>
            <input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required className={`${inputClass} focus:ring-blue-400`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 font-bold text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md">{lang === "TH" ? "คำนวณค่าน้ำมัน" : "Calculate"}</button>
      </form>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-500/30 p-6 rounded-2xl text-center shadow-neo mb-6">
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 uppercase tracking-wide">
              {lang === "TH" ? "ค่าน้ำมันรวมทั้งหมด" : "Total Fuel Cost"}
            </p>
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-4">
              ฿ {Math.ceil(result.cost).toLocaleString()}
            </div>
            <div className="w-full h-px bg-blue-200 dark:bg-blue-500/30 my-4"></div>
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300 font-bold">
              <span>{lang === "TH" ? "ใช้น้ำมันไปประมาณ:" : "Estimated Fuel Used:"}</span>
              <span className="text-xl text-blue-600 dark:text-blue-400">{result.liters.toFixed(1)} {lang === "TH" ? "ลิตร" : "Liters"}</span>
            </div>
          </div>

          <CalculationSteps 
            title={lang === "TH" ? "สูตรคำนวณ" : "How it works"}
            steps={
              <ul className="list-disc list-inside">
                <li>{lang === "TH" ? `จำนวนลิตร: ${distance} กม. ÷ ${efficiency} กม./ลิตร = ${result.liters.toFixed(2)} ลิตร` : `Liters: ${distance} km ÷ ${efficiency} km/l = ${result.liters.toFixed(2)} L`}</li>
                <li>{lang === "TH" ? `ค่าน้ำมัน: ${result.liters.toFixed(2)} ลิตร × ${price} บาท = ฿ ${result.cost.toFixed(2)}` : `Total: ${result.liters.toFixed(2)} L × ${price} = ฿ ${result.cost.toFixed(2)}`}</li>
              </ul>
            }
          />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำนวณค่าน้ำมัน (FAQ)" : "Fuel Cost FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ดูอัตราสิ้นเปลืองน้ำมันของรถได้ที่ไหน?" : "Where to find fuel efficiency?"}
          a={lang === "TH" ? "รถยนต์ส่วนใหญ่สามารถดูได้ที่หน้าปัดดิจิตอล (เขียนว่า AVG. km/L) หรือถ้าไม่ทราบ รถเก๋งปกติจะอยู่ที่ประมาณ 12-15 กม./ลิตร ส่วนอีโคคาร์จะอยู่ที่ 18-22 กม./ลิตร" : "Check your car's dashboard (AVG km/L). Generally, sedans are 12-15 km/L, eco-cars 18-22 km/L."}
        />
        <FAQItem 
          q={lang === "TH" ? "คำนวณค่าน้ำมันรถยนต์ เดินทางต่างจังหวัดต้องเผื่อไหม?" : "Should I add margin for long trips?"}
          a={lang === "TH" ? "ควรเผื่อค่าน้ำมันไว้ประมาณ 10-15% จากที่คำนวณได้ เผื่อกรณีรถติด หลงทาง หรือแวะจอดพักปั๊ม" : "It's recommended to add 10-15% margin for traffic, stops, or detours."}
        />
      </SEOFAQ>
    </div>
  );
}
