"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { AdPlaceholder } from "../AdPlaceholder";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

// 1. Quadratic Equation Calculator
export function QuadraticCalculator({ lang }: { lang: Lang }) {
  const [a, setA] = useLocalState("sci_quad_a", "");
  const [b, setB] = useLocalState("sci_quad_b", "");
  const [c, setC] = useLocalState("sci_quad_c", "");

  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);

  let result = null;
  let steps: string[] = [];

  if (!isNaN(aNum) && !isNaN(bNum) && !isNaN(cNum) && aNum !== 0) {
    const discriminant = (bNum * bNum) - (4 * aNum * cNum);
    steps.push(`1. คำนวณค่า Discriminant (Δ) จากสูตร b² - 4ac`);
    steps.push(`   Δ = (${bNum})² - 4(${aNum})(${cNum}) = ${discriminant}`);

    if (discriminant > 0) {
      const root1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const root2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
      result = { type: 'two', x1: root1, x2: root2 };
      steps.push(`2. เนื่องจาก Δ > 0 สมการจะมี 2 คำตอบที่เป็นจำนวนจริง`);
      steps.push(`   x = (-b ± √Δ) / 2a`);
      steps.push(`   x₁ = (-${bNum} + √${discriminant}) / (2 × ${aNum}) = ${root1.toFixed(4)}`);
      steps.push(`   x₂ = (-${bNum} - √${discriminant}) / (2 × ${aNum}) = ${root2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const root = -bNum / (2 * aNum);
      result = { type: 'one', x: root };
      steps.push(`2. เนื่องจาก Δ = 0 สมการจะมี 1 คำตอบ (รากซ้ำ)`);
      steps.push(`   x = -b / 2a`);
      steps.push(`   x = -${bNum} / (2 × ${aNum}) = ${root.toFixed(4)}`);
    } else {
      const realPart = -bNum / (2 * aNum);
      const imagPart = Math.sqrt(Math.abs(discriminant)) / (2 * aNum);
      result = { type: 'complex', real: realPart, imag: Math.abs(imagPart) };
      steps.push(`2. เนื่องจาก Δ < 0 สมการจะไม่มีคำตอบเป็นจำนวนจริง (เป็นจำนวนเชิงซ้อน)`);
      steps.push(`   x = (-b ± i√|Δ|) / 2a`);
      steps.push(`   x = ${realPart.toFixed(4)} ± ${Math.abs(imagPart).toFixed(4)}i`);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-indigo-600">{lang === "TH" ? "คำนวณสมการกำลังสอง" : "Quadratic Equation"}</h2>
      <p className="text-gray-500 mb-6 text-sm">ax² + bx + c = 0</p>
      
      <div className="grid grid-cols-3 gap-4">
        <div><label className={labelClass}>a</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>b</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>c</label><input type="number" value={c} onChange={e=>setC(e.target.value)} className={inputClass} /></div>
      </div>

      {result && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6">
          <div className="p-6 bg-indigo-50 rounded-xl text-center mb-6">
            <p className="text-gray-600 mb-2">{lang === "TH" ? "ผลลัพธ์ (x)" : "Results (x)"}</p>
            {result.type === 'two' && (
              <div className="text-3xl font-black text-indigo-600 space-y-2">
                <div>x₁ = {result.x1?.toLocaleString(undefined, {maximumFractionDigits: 6})}</div>
                <div>x₂ = {result.x2?.toLocaleString(undefined, {maximumFractionDigits: 6})}</div>
              </div>
            )}
            {result.type === 'one' && (
              <div className="text-3xl font-black text-indigo-600">
                x = {result.x?.toLocaleString(undefined, {maximumFractionDigits: 6})}
              </div>
            )}
            {result.type === 'complex' && (
              <div className="text-3xl font-black text-indigo-600 space-y-2">
                <div>x₁ = {result.real?.toLocaleString(undefined, {maximumFractionDigits: 6})} + {result.imag?.toLocaleString(undefined, {maximumFractionDigits: 6})}i</div>
                <div>x₂ = {result.real?.toLocaleString(undefined, {maximumFractionDigits: 6})} - {result.imag?.toLocaleString(undefined, {maximumFractionDigits: 6})}i</div>
              </div>
            )}
          </div>
          <CalculationSteps steps={steps} />
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — สมการกำลังสอง":"Quadratic Equation FAQ"}>
          <FAQItem q={lang==="TH"?"สมการกำลังสอง (Quadratic Equation) คืออะไร และมีรูปทั่วไปอย่างไร?":"What is a quadratic equation?"} a={lang==="TH"?"สมการกำลังสอง หรือ Quadratic Equation ในทางคณิตศาสตร์คือสมการพหุนามตัวแปรเดียวที่มีดีกรีเท่ากับ 2 (เลขชี้กำลังสูงสุดคือ 2) รูปแบบทั่วไปมาตรฐานที่ใช้ทั่วโลกคือ ax² + bx + c = 0 โดยที่ x แทนตัวแปรหรือค่าที่เราต้องการค้นหา (Unknown) ส่วน a, b, และ c เป็นค่าคงตัว (สัมประสิทธิ์) ที่ระบุไว้ โดยมีเงื่อนไขสำคัญเพียงข้อเดียวคือ a ต้องไม่เท่ากับ 0 (เพราะถ้า a=0 มันจะกลายเป็นสมการเชิงเส้น bx + c = 0 ทันที) เมื่อนำสมการนี้ไปวาดกราฟบนระนาบพิกัดฉาก (Cartesian Coordinate System) จะได้กราฟรูปโค้งที่เรียกว่า 'พาราโบลา' (Parabola) ซึ่งอาจจะคว่ำหรือหงายขึ้นอยู่กับเครื่องหมายของค่า a อ้างอิง: ตำราคณิตศาสตร์พื้นฐาน ม.ต้น (สสวท.); สมาคมคณิตศาสตร์แห่งอเมริกา (MAA).":""} />
          <FAQItem q={lang==="TH"?"สูตรคำนวณ (-b ± √(b² - 4ac)) / 2a มีหลักการทำงานอย่างไร?":"How does the quadratic formula work?"} a={lang==="TH"?"สูตรกำลังสอง (Quadratic Formula) ที่เราท่องจำกันว่า x = (-b ± √(b² - 4ac)) / 2a เป็นเครื่องมือสากลที่สามารถใช้แก้สมการกำลังสองได้ทุกรูปแบบ โดยไม่ต้องมานั่งแยกตัวประกอบ (Factoring) ให้ยุ่งยาก สูตรนี้มีต้นกำเนิดมาจากการใช้วิธี 'การทำเป็นกำลังสองสมบูรณ์' (Completing the Square) กับสมการรูปทั่วไป ax² + bx + c = 0 เครื่องหมาย ± (บวกหรือลบ) หน้าเครื่องหมายรูท (Square Root) เป็นตัวบ่งชี้ว่าสมการประเภทนี้มักจะมี 2 คำตอบที่เป็นไปได้ เพราะแกนสมมาตรของพาราโบลาจะแบ่งกราฟออกเป็นสองฝั่งที่ตัดแกน x สองจุดพอดี อ้างอิง: ประวัติศาสตร์คณิตศาสตร์ของ Al-Khwarizmi นักคณิตศาสตร์ชาวเปอร์เซียผู้ให้กำเนิดวิชาพีชคณิต; วารสารคณิตศาสตร์ประยุกต์.":""} />
          <FAQItem q={lang==="TH"?"Discriminant (b² - 4ac) คืออะไร และมันบอกอะไรเราได้บ้าง?":"What is the discriminant and what does it tell us?"} a={lang==="TH"?"ค่า Discriminant (มักใช้สัญลักษณ์ Δ หรือ ตัวดีลต้า) คือนิพจน์ที่อยู่ใต้เครื่องหมายรากที่สอง (Square Root) ในสูตรกำลังสอง นั่นคือ Δ = b² - 4ac ค่านี้มีความสำคัญอย่างยิ่งยวดเพราะมันเป็น 'ตัวจำแนก' ชนิดของคำตอบที่เราจะได้ โดยไม่ต้องคำนวณจนจบสูตร กฎคือ: 1) ถ้า Δ > 0 (เป็นค่าบวก) แปลว่าถอดรูทได้ค่าจริง 2 ค่า สมการจะมี 2 คำตอบที่เป็นจำนวนจริง (กราฟตัดแกน X สองจุด) 2) ถ้า Δ = 0 ถอดรูทได้ 0 สมการจะมีคำตอบเดียวหรือที่เรียกว่า 'รากซ้ำ' (กราฟสัมผัสแกน X จุดเดียวพอดี) 3) ถ้า Δ < 0 (เป็นค่าลบ) ในระบบจำนวนจริงจะไม่สามารถถอดรูทค่าลบได้ แปลว่าสมการไม่มีคำตอบเป็นจำนวนจริง แต่จะได้คำตอบเป็น 'จำนวนเชิงซ้อน' (Complex Numbers) ที่ติดค่า i (กราฟลอยอยู่เหนือหรือใต้แกน X โดยไม่ตัดเลย) อ้างอิง: ทฤษฎีบทมูลฐานของพีชคณิต (Fundamental Theorem of Algebra); สถาบันวิจัยคณิตศาสตร์ทฤษฎี.":""} />
          <FAQItem q={lang==="TH"?"สมการกำลังสองมีการนำไปใช้งานในชีวิตจริงและวิทยาศาสตร์อย่างไร?":"Real world applications of quadratic equations?"} a={lang==="TH"?"แม้จะเป็นคณิตศาสตร์ในห้องเรียน แต่สมการกำลังสองประยุกต์ใช้ในชีวิตจริงและวงการวิทยาศาสตร์วิศวกรรมอย่างกว้างขวาง ตัวอย่างที่ชัดเจนที่สุดในวิชาฟิสิกส์คือ 'การเคลื่อนที่แบบโปรเจกไทล์' (Projectile Motion) เช่น การคำนวณวิถีโค้งของลูกบาสเกตบอลที่ถูกชู้ต การยิงจรวด หรือวิถีปืนใหญ่ ซึ่งสมการความสูง (h) เมื่อเทียบกับเวลา (t) จะอยู่ในรูป h(t) = -1/2(g)t² + vt + h₀ (ซึ่งเป็นฟังก์ชันกำลังสอง) ทำให้สามารถคำนวณจุดสูงสุดหรือเวลาตกถึงพื้นได้อย่างแม่นยำ ในวิศวกรรมโยธา ใช้คำนวณส่วนโค้งของสะพานแขวน ส่วนในเศรษฐศาสตร์ ธุรกิจใช้ฟังก์ชันพาราโบลาเพื่อหาจุดกำไรสูงสุด (Maximum Profit) หรือจุดต้นทุนต่ำสุด (Minimum Cost) ผ่านการหาจุดยอด (Vertex) ของสมการ อ้างอิง: ฟิสิกส์ มหาวิทยาลัย (University Physics by Young and Freedman); คณะวิศวกรรมศาสตร์ ภาควิชากลศาสตร์ประยุกต์.":""} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. pH / pOH Calculator
export function PHCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<"H" | "OH">("H");
  const [concentration, setConcentration] = useLocalState("sci_ph_conc", "");
  
  const concVal = parseFloat(concentration);
  let pH = 0;
  let pOH = 0;
  let isCalculable = false;

  if (concVal > 0 && !isNaN(concVal)) {
    isCalculable = true;
    if (mode === "H") {
      pH = -Math.log10(concVal);
      pOH = 14 - pH;
    } else {
      pOH = -Math.log10(concVal);
      pH = 14 - pOH;
    }
  }

  let nature = "";
  if (isCalculable) {
    if (pH < 7) nature = lang === "TH" ? "กรด (Acidic)" : "Acidic";
    else if (pH > 7) nature = lang === "TH" ? "ด่าง (Basic/Alkaline)" : "Basic/Alkaline";
    else nature = lang === "TH" ? "กลาง (Neutral)" : "Neutral";
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-indigo-600">{lang === "TH" ? "คำนวณค่า pH / pOH" : "pH & pOH Calculator"}</h2>
      <div className="space-y-4 mt-6">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="radio" checked={mode === "H"} onChange={() => setMode("H")} className="text-indigo-600" />
            [H⁺] Concentration
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="radio" checked={mode === "OH"} onChange={() => setMode("OH")} className="text-indigo-600" />
            [OH⁻] Concentration
          </label>
        </div>
        <div>
          <label className={labelClass}>
            {lang === "TH" ? `ความเข้มข้นของ ${mode === "H" ? "[H⁺] ไอออนไฮโดรเจน" : "[OH⁻] ไอออนไฮดรอกไซด์"} (Molar หรือ mol/L)` : `Concentration of ${mode === "H" ? "[H⁺]" : "[OH⁻]"} (mol/L)`}
          </label>
          <input 
            type="number" 
            placeholder="e.g. 0.001 or 1e-3"
            value={concentration} 
            onChange={e=>setConcentration(e.target.value)} 
            className={inputClass} 
          />
        </div>
      </div>

      {isCalculable && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-xl text-center ${pH < 7 ? 'bg-red-50 text-red-600' : pH > 7 ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
              <p className="text-gray-600 mb-2 font-bold opacity-80">pH</p>
              <div className="text-4xl font-black">{pH.toFixed(2)}</div>
            </div>
            <div className={`p-6 rounded-xl text-center ${pOH < 7 ? 'bg-blue-50 text-blue-600' : pOH > 7 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              <p className="text-gray-600 mb-2 font-bold opacity-80">pOH</p>
              <div className="text-4xl font-black">{pOH.toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-xl text-center text-lg font-bold text-indigo-800 dark:text-indigo-300">
            {lang === "TH" ? "สถานะสารละลาย: " : "Nature: "} {nature}
          </div>
        </motion.div>
      )}
      <AdPlaceholder type="in-article" />

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — กรด เบส และค่า pH":"pH & pOH FAQ"}>
          <FAQItem q={lang==="TH"?"ระดับค่า pH คืออะไร และมันใช้วัดอะไรในทางเคมี?":"What is the pH scale and what does it measure chemically?"} a={lang==="TH"?"มาตรวัด pH (Potential of Hydrogen) คือสเกลเชิงตัวเลขที่ใช้ในการระบุระดับความเป็นกรด (Acidity) หรือความเป็นด่าง/เบส (Alkalinity) ของสารละลายที่เป็นน้ำ (Aqueous solution) ในทางเคมี ค่า pH วัดค่าแอคทิวิตี้ (Activity) ของไอออนไฮโดรเจน (H⁺) หรือไอออนไฮโดรเนียม (H₃O⁺) สเกล pH โดยทั่วไปจะอยู่ระหว่าง 0 ถึง 14 ที่อุณหภูมิห้องมาตรฐาน (25°C) สารละลายที่มี pH = 7 ถือว่าเป็นกลาง (Neutral) เช่น น้ำบริสุทธิ์ (Pure water) ซึ่งมีจำนวน H⁺ และ OH⁻ สมดุลกัน สารที่มี pH ต่ำกว่า 7 ถือเป็นกรด (ยิ่งค่าน้อย ยิ่งเป็นกรดแรง เช่น น้ำย่อยในกระเพาะอาหารมี pH ประมาณ 1.5-2.0) ส่วนสารที่มี pH สูงกว่า 7 ถือเป็นด่าง (ยิ่งค่ามาก ยิ่งเป็นด่างแรง เช่น น้ำยาฟอกขาวมี pH ประมาณ 12-13) อ้างอิง: องค์กรสหภาพเคมีบริสุทธิ์และเคมีประยุกต์ระหว่างประเทศ (IUPAC); คู่มือเคมีเชิงฟิสิกส์.":""} />
          <FAQItem q={lang==="TH"?"สมการการคำนวณ pH และ pOH ด้วยลอการิทึมทำงานอย่างไร?":"How to calculate pH and pOH logarithmically?"} a={lang==="TH"?"การคำนวณ pH และ pOH อาศัยสมการทางคณิตศาสตร์แบบลอการิทึมฐานสิบ (Logarithm Base 10) เนื่องจากความเข้มข้นของไอออนในสารละลายมักจะมีค่าน้อยมากจนยากต่อการเขียน (เช่น 0.0000001 M) นักเคมีชาวเดนมาร์ก S.P.L. Sørensen จึงคิดค้นสูตร pH = -log₁₀[H⁺] และ pOH = -log₁₀[OH⁻] ขึ้นมา เครื่องหมายลบด้านหน้าบ่งชี้ว่า ยิ่งความเข้มข้นของไฮโดรเจนไอออนสูงขึ้น ค่า pH จะยิ่งต่ำลง (แปรผกผันกัน) เนื่องจากเป็นสเกลลอการิทึม การเปลี่ยนแปลงค่า pH 1 หน่วย หมายถึงความเข้มข้นที่เปลี่ยนแปลงไปถึง 10 เท่า ตัวอย่างเช่น กรดที่มี pH 3 จะมีความเป็นกรดรุนแรงกว่ากรดที่มี pH 4 ถึง 10 เท่า และรุนแรงกว่า pH 5 ถึง 100 เท่า นอกจากนี้ ทฤษฎีค่าคงที่การแตกตัวของน้ำ (Kw) พิสูจน์ว่าที่อุณหภูมิ 25°C ผลรวมของ pH + pOH จะต้องเท่ากับ 14 เสมอ อ้างอิง: S.P.L. Sørensen (1909) Carlsberg Laboratory; ตำราเคมีวิเคราะห์ (Analytical Chemistry).":""} />
          <FAQItem q={lang==="TH"?"กรดแก่ (Strong Acids) แตกต่างจากกรดอ่อน (Weak Acids) อย่างไรในการคำนวณ?":"Difference between strong and weak acids in calculation?"} a={lang==="TH"?"ความแตกต่างหลักอยู่ที่ 'การแตกตัว' (Dissociation) ในน้ำ กรดแก่ (Strong Acids) เช่น กรดไฮโดรคลอริก (HCl), กรดซัลฟิวริก (H₂SO₄), หรือกรดไนตริก (HNO₃) จะแตกตัวในน้ำอย่างสมบูรณ์แบบ 100% นั่นหมายความว่าหากเรามี HCl เข้มข้น 0.1 M เราจะได้ [H⁺] เข้มข้น 0.1 M เท่ากัน ทำให้สามารถเอา 0.1 ไปใส่ในสูตร -log(0.1) ได้ค่า pH = 1 ทันที ในทางตรงกันข้าม กรดอ่อน (Weak Acids) เช่น กรดน้ำส้ม (CH₃COOH) จะแตกตัวเพียงบางส่วน (มักน้อยกว่า 5%) เมื่อละลายน้ำ จะเกิดภาวะสมดุลเคมี (Chemical Equilibrium) การคำนวณ pH ของกรดอ่อนจึงไม่สามารถใช้ความเข้มข้นตั้งต้นมาแทนค่าได้ตรงๆ แต่ต้องใช้ 'ค่าคงที่การแตกตัวของกรด' (Ka) และการแก้สมการสมดุลเคมี (ICE Table) มาช่วยในการหา [H⁺] ที่แท้จริงเสียก่อน อ้างอิง: หลักการของเลอชาเตอลิเยร์ (Le Chatelier's Principle); เคมีระดับมหาวิทยาลัย (General Chemistry).":""} />
          <FAQItem q={lang==="TH"?"ทำไมค่า pH ถึงมีความสำคัญอย่างยิ่งในร่างกายมนุษย์ สิ่งแวดล้อม และอุตสาหกรรม?":"Why is pH important in human body, nature, and industry?"} a={lang==="TH"?"ค่า pH ถือเป็นปัจจัยควบคุมระดับไมโครที่มีผลระดับมหภาค 1) ในร่างกายมนุษย์: เลือดมนุษย์ต้องรักษาระดับ pH ไว้ที่ 7.35 - 7.45 อย่างเข้มงวดผ่านระบบบัฟเฟอร์ (Buffer Systems) หากค่า pH หลุดจากช่วงนี้ เอนไซม์และโปรตีนในร่างกายจะเสียสภาพ (Denature) ทำให้ระบบภายในล้มเหลวและอาจเสียชีวิตได้ 2) ในสิ่งแวดล้อม: ดินและน้ำมี pH ที่เหมาะสมต่อการเจริญเติบโตของพืชและสัตว์น้ำ ปรากฏการณ์ 'ฝนกรด' (Acid Rain) ที่มี pH ต่ำกว่า 5.0 สามารถทำลายป่าไม้และกัดกร่อนโครงสร้างหินปูนปะการังในมหาสมุทร (Ocean Acidification) ซึ่งส่งผลกระทบต่อห่วงโซ่อาหารโลก 3) ในอุตสาหกรรม: การควบคุม pH จำเป็นอย่างยิ่งในการผลิตอาหาร เครื่องสำอาง ยา และการบำบัดน้ำเสีย เพื่อให้มั่นใจในคุณภาพ ความปลอดภัย และการยับยั้งการเจริญเติบโตของแบคทีเรียก่อโรค อ้างอิง: สรีรวิทยาการแพทย์ (Medical Physiology); องค์การอนามัยโลก (WHO) Water Quality Guidelines.":""} />
        </SEOFAQ>
      </div>
    </div>
  );
}
