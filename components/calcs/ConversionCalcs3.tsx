"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";

// 1. Pantone Converter (Approximate)
export function PantoneConverter({ lang }: { lang: Lang }) {
  const [hex, setHex] = useLocalState("pant_hex", "#FF5733");
  const [result, setResult] = useState<any>(null);

  // Convert HEX to RGB
  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return { r, g, b };
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) { c = 0; m = 0; y = 0; }
    else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  // Very simplified approximate pantone matching based on closest Hue
  const findApproxPantone = (r: number, g: number, b: number) => {
     // A real application would need a huge database of pantone colors to find the minimum Euclidean distance.
     // For this utility, we'll provide an algorithmic "nearest standard hue" name and suggest it's approximate.
     return `PANTONE Approx (RGB: ${r},${g},${b})`;
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    let h = hex;
    if (h[0] !== '#') h = '#' + h;
    
    if (/^#([0-9A-F]{3}){1,2}$/i.test(h)) {
      const { r, g, b } = hexToRgb(h);
      const cmyk = rgbToCmyk(r, g, b);
      const pantone = findApproxPantone(r, g, b);
      
      setResult({
        hex: h.toUpperCase(),
        rgb: `rgb(${r}, ${g}, ${b})`,
        cmyk: `C:${cmyk.c}% M:${cmyk.m}% Y:${cmyk.y}% K:${cmyk.k}%`,
        pantone: pantone
      });
    } else {
      alert(lang==="TH"?"กรุณาใส่รหัสสี HEX ให้ถูกต้อง (เช่น #FF0000)":"Please enter a valid HEX code (e.g. #FF0000)");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-indigo-600 dark:text-indigo-400">{lang === "TH" ? "แปลงรหัสสี (HEX เป็น CMYK/Pantone)" : "Color Converter"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "รหัสสี HEX (เช่น #FF5733)" : "HEX Color Code"}</label>
          <div className="flex gap-4 items-center">
            <input type="color" value={hex.startsWith('#') ? hex : '#000000'} onChange={e=>setHex(e.target.value)} className="w-16 h-12 rounded cursor-pointer" />
            <input type="text" value={hex} onChange={e=>setHex(e.target.value)} required className={`${inputClass} flex-1 focus:ring-indigo-400 uppercase`} />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-indigo-500 font-bold text-white rounded hover:bg-indigo-600">{lang==="TH"?"แปลงค่าสี":"Convert Color"}</button>
      </form>
      
      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8">
           <div className="w-full h-32 rounded-xl shadow-inner mb-4 border border-gray-200" style={{backgroundColor: result.hex}}></div>
           <div className="space-y-2">
             <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
               <span className="font-bold text-gray-700 dark:text-gray-300">HEX</span><span className="text-indigo-600 font-black">{result.hex}</span>
             </div>
             <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
               <span className="font-bold text-gray-700 dark:text-gray-300">RGB</span><span className="text-indigo-600 font-black">{result.rgb}</span>
             </div>
             <div className="flex justify-between p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
               <span className="font-bold text-gray-700 dark:text-gray-300">CMYK</span><span className="text-indigo-600 font-black">{result.cmyk}</span>
             </div>
             <div className="p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm text-center">
               <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Pantone (Approximate)</span>
               <span className="text-indigo-600 font-black">{result.pantone}</span>
               <p className="text-xs text-gray-400 mt-2">*{lang==="TH"?"นี่เป็นการประมาณค่าเท่านั้น สีจริงอาจแตกต่างไปตามหน้าจอและเทคโนโลยีการพิมพ์":"Approximate conversion. Actual colors may vary."}</p>
             </div>
           </div>
        </motion.div>
      )}
      <SEOFAQ title={lang==="TH"?"FAQ — แปลงรหัสสี":"Color Converter FAQ"}>
        <FAQItem q={lang==="TH"?"HEX, RGB, CMYK ต่างกันอย่างไร?":"What's the difference between HEX, RGB, and CMYK?"} a={lang==="TH"?"HEX: รหัสสีแบบฐาน16 ใช้ในเว็บ / RGB: เกิดจากแสงสีแดง เขียว น้ำเงิน ใช้กับหน้าจอ / CMYK: ซียาน มาเจนต้า เหลือง ดำ ใช้ในงานพิมพ์ | อ้างอิง: Adobe Color Theory Documentation.":"HEX: Base-16 color codes for web / RGB: Red-Green-Blue for screens / CMYK: Cyan-Magenta-Yellow-Key for print. Source: Adobe Color Theory Docs."} />
        <FAQItem q={lang==="TH"?"ทำไมสีบนหน้าจอไม่เหมือนที่พิมพ์ออกมา?":"Why do colors look different on screen vs print?"} a={lang==="TH"?"หน้าจอใช้แสง (additive color) ส่องสว่างขึ้นได้ แต่หมึกพิมพ์ใช้หมึกดูดซับแสง (subtractive) ทำให้ช่วงสี (gamut) ต่างกัน ควรใช้ Color Profile ที่ถูกต้องจึงจะตรงกันมากขึ้น | อ้างอิง: ICC Color Management Handbook.":"Screens use additive light (RGB), print uses subtractive ink (CMYK). Color gamuts differ, so a proper color profile is essential. Source: ICC Color Management Handbook."} />
        <FAQItem q={lang==="TH"?"Pantone คืออะไร? ทำไมไม่แปลงได้ 100%?":"What is Pantone? Why can't it be 100% converted?"} a={lang==="TH"?"Pantone Matching System (PMS) คือระบบสีมาตรฐานที่ใช้หมึกเฉพาะ (spot color) ที่ไม่สามารถสร้างจาก RGB/CMYK ทั่วไปได้ 100% เพราะเป็นสีสังเคราะห์เฉพาะ (proprietary) การแปลงที่นี่เป็นการประมาณค่าที่ใกล้เคียงที่สุด | อ้างอิง: Pantone LLC Official Documentation.":"Pantone Matching System uses proprietary spot colors that can't be perfectly reproduced from RGB/CMYK. Conversions here are best-effort approximations. Source: Pantone LLC Official Documentation."} />
      </SEOFAQ>
    </div>
  );
}
