"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult } from "./shared";
import { AdPlaceholder } from "../AdPlaceholder";

// Helper for metal hardness interpolation
const hrc_pts = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const hv_pts  = [230, 260, 290, 340, 390, 450, 510, 600, 700, 840, 1000];
const hb_pts  = [226, 253, 286, 327, 371, 421, 481, 560, 654, 739, 850];
const mpa_pts = [760, 850, 950, 1100, 1200, 1400, 1620, 1900, 2200, 2600, 3000];

const interpolate = (x: number, xs: number[], ys: number[]) => {
  if (x <= xs[0]) return ys[0];
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1];
  for (let i = 0; i < xs.length - 1; i++) {
    if (x >= xs[i] && x <= xs[i + 1]) {
      const t = (x - xs[i]) / (xs[i + 1] - xs[i]);
      return ys[i] + t * (ys[i + 1] - ys[i]);
    }
  }
  return ys[0];
};

// 1. Thai Cooking Units Calculator
export function ThaiCookingUnitsCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("cooking_val", "1");
  const [fromUnit, setFromUnit] = useLocalState("cooking_from", "cup");
  const [toUnit, setToUnit] = useLocalState("cooking_to", "ml");

  const units: Record<string, { factor: number; th: string; en: string }> = {
    pinch: { factor: 1, th: "หยิบมือ (Pinch)", en: "Pinch" },
    tsp: { factor: 5, th: "ช้อนชา (tsp)", en: "Teaspoon (tsp)" },
    soup: { factor: 10, th: "ช้อนแกง (soup spoon)", en: "Thai Soup Spoon" },
    tbsp: { factor: 15, th: "ช้อนโต๊ะ (tbsp)", en: "Tablespoon (tbsp)" },
    cup: { factor: 240, th: "ถ้วยตวง (cup)", en: "Cup" },
    thanan: { factor: 1000, th: "ทะนาน (thanan)", en: "Thanan" },
    kaom: { factor: 20000, th: "กะออม", en: "Ka-om" },
    sat: { factor: 20000, th: "สัด (sat)", en: "Sat" },
    ml: { factor: 1, th: "มิลลิลิตร (ml)", en: "Milliliters (ml)" },
    g: { factor: 1, th: "กรัม (g - น้ำ)", en: "Grams (g - water density)" }
  };

  const v = parseFloat(val) || 0;
  const result = (v * units[fromUnit].factor) / units[toUnit].factor;

  return (
    <div id="thai-cooking-units-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยอาหารไทยและครัว" : "Thai Cooking Units Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "คำนวณแปลงหน่วยเครื่องปรุง หยิบมือ ช้อนแกง ทะนาน ถ้วยตวง มิลลิลิตร และกรัม" : "Convert between traditional Thai cooking units and modern metric equivalents."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวน" : "Value"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className={inputClass}>
            {Object.entries(units).map(([key, u]) => (
              <option key={key} value={key}>{lang === "TH" ? u.th : u.en}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "เป็นหน่วย" : "To Unit"}</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className={inputClass}>
            {Object.entries(units).map(([key, u]) => (
              <option key={key} value={key}>{lang === "TH" ? u.th : u.en}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 text-center mb-6">
        <p className="text-gray-500 text-sm">{lang === "TH" ? "ผลลัพธ์การคำนวณ" : "Result"}</p>
        <p className="text-4xl font-black text-deep-teal dark:text-soft-mint mt-2">
          {result.toLocaleString(undefined, { maximumFractionDigits: 4 })} {lang === "TH" ? units[toUnit].th : units[toUnit].en}
        </p>
      </motion.div>

      <ExportResult elementId="thai-cooking-units-calc" fileName="thai-cooking-units" lang={lang} />
      <AdPlaceholder type="in-article" />

      <CalculationSteps
        title={lang === "TH" ? "เกณฑ์มาตราตวงอาหารไทยและสากล" : "Cooking Units Conversion Reference"}
        steps={lang === "TH" ? [
          "1 หยิบมือ มีปริมาตรเทียบเท่า 1 มิลลิลิตร (ml)",
          "1 ช้อนชา (tsp) = 5 มิลลิลิตร (ml)",
          "1 ช้อนแกง (ช้อนสั้นไทย) = 10 มิลลิลิตร (ml)",
          "1 ช้อนโต๊ะ (tbsp) = 15 มิลลิลิตร (ml)",
          "1 ถ้วยตวง (cup) = 240 มิลลิลิตร (ml)",
          "1 ทะนาน (thanan) = 1,000 มิลลิลิตร หรือ 1 ลิตร",
          "1 สัด หรือ 1 กะออม = 20 ลิตร (20,000 ml)"
        ] : [
          "1 Pinch = 1 Milliliter (ml)",
          "1 Teaspoon (tsp) = 5 ml",
          "1 Thai Soup Spoon = 10 ml",
          "1 Tablespoon (tbsp) = 15 ml",
          "1 Cup = 240 ml",
          "1 Thanan = 1,000 ml (1 Liter)",
          "1 Sat / Ka-om = 20 Liters (20,000 ml)"
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับหน่วยตวงอาหารและเครื่องปรุง" : "Cooking Unit FAQs"}>
        <FAQItem
          q="หน่วยช้อนชา ช้อนโต๊ะ และถ้วยตวง ในการทำอาหารมีมาตรฐานเท่าใด?"
          a="ในสูตรอาหารสากล ช้อนชา (tsp) มีปริมาตรเท่ากับ 5 มิลลิลิตร ช้อนโต๊ะ (tbsp) มีปริมาตรเท่ากับ 15 มิลลิลิตร (เท่ากับ 3 ช้อนชา) และถ้วยตวง (cup) มีปริมาตรเท่ากับ 240 มิลลิลิตร (ในบางประเทศ เช่น ออสเตรเลีย อาจใช้ 250 มิลลิลิตร แต่มาตรฐานสากลทั่วไปยึดที่ 240 มิลลิลิตร) การแปลงหน่วยที่ถูกต้องและแม่นยำช่วยให้รสชาติและสัดส่วนของอาหารคงที่และไม่คลาดเคลื่อน"
        />
        <FAQItem
          q="หน่วยวัดอาหารไทยโบราณ เช่น ทะนาน สัด และกะออม มีความเป็นมาอย่างไร?"
          a="ในสมัยโบราณ ประเทศไทยยังไม่มีระบบเมตริก จึงใช้เครื่องตวงธรรมชาติ โดย 'ทะนาน' ทำจากกะลามะพร้าวขูด มีปริมาตรประมาณ 1 ลิตร 'กะออม' และ 'สัด' เป็นภาชนะสานขนาดใหญ่ โดย 1 สัด หรือ 1 กะออม จะมีปริมาตรเท่ากับ 20 ทะนาน หรือประมาณ 20 ลิตร การตวงเหล่านี้มักใช้ในระบบการค้าขายพืชผลเกษตรและข้าวสารในอดีต"
        />
        <FAQItem
          q="1 ช้อนแกง เท่ากับกี่ช้อนโต๊ะ และกี่มิลลิลิตร?"
          a="ช้อนแกง หรือช้อนสั้นตักอาหารแบบไทย มีปริมาตรเฉลี่ยประมาณ 10 มิลลิลิตร ซึ่งมีขนาดเล็กกว่าช้อนโต๊ะมาตรฐานสากล (15 มิลลิลิตร) เล็กน้อย ดังนั้น 1 ช้อนโต๊ะ จึงเทียบเท่ากับประมาณ 1.5 ช้อนแกง หรือพูดในทางกลับกันคือ ช้อนแกง 1 ช้อน จะได้ปริมาณประมาณ 2 ใน 3 ของช้อนโต๊ะมาตรฐานทั่วไป"
        />
        <FAQItem
          q="การแปลงหน่วยจากกรัมเป็นมิลลิลิตรในการทำขนมมีความแม่นยำแค่ไหน?"
          a="การแปลงกรัม (น้ำหนัก) เป็นมิลลิลิตร (ปริมาตร) ในเครื่องมือนี้ อ้างอิงตามความหนาแน่นของน้ำบริสุทธิ์ (1 กรัม = 1 มิลลิลิตร) ซึ่งใช้ได้ดีกับของเหลว เช่น น้ำเปล่า นม หรือกะทิ อย่างไรก็ตาม หากเป็นวัตถุดิบที่มีความหนาแน่นต่างไป เช่น แป้ง น้ำตาล หรือน้ำมัน น้ำหนักกรัมและปริมาตรมิลลิลิตรจะไม่เท่ากัน 100% จึงควรใช้เครื่องชั่งน้ำหนักสำหรับการตวงของแห้ง"
        />
        <FAQItem
          q="หยิบมือ (Pinch) มีปริมาตรเท่าใดในทางปฏิบัติ?"
          a="In practical cooking, 'หยิบมือ' means the amount of dry ingredients picked up between index finger and thumb, which is standardly quantified as 1/16 to 1/8 teaspoon, or about 0.5 to 1 milliliter. It is typically used for pinches of salt, pepper, or other spices to slightly adjust flavor."
        />
      </SEOFAQ>
    </div>
  );
}

// 2. Thai Land Units Calculator
export function ThaiLandUnitsCalculator({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<"toSqm" | "fromSqm">("toSqm");
  const [rai, setRai] = useState("1");
  const [ngan, setNgan] = useState("0");
  const [wah, setWah] = useState("0");
  const [sqm, setSqm] = useState("1600");

  let computedSqm = 0;
  let computedRai = 0;
  let computedNgan = 0;
  let computedWah = 0;
  let computedAcre = 0;

  if (mode === "toSqm") {
    const r = parseFloat(rai) || 0;
    const n = parseFloat(ngan) || 0;
    const w = parseFloat(wah) || 0;
    computedSqm = r * 1600 + n * 400 + w * 4;
    computedRai = r;
    computedNgan = n;
    computedWah = w;
    computedAcre = computedSqm / 4046.8564224;
  } else {
    const s = parseFloat(sqm) || 0;
    computedSqm = s;
    let totalWah = s / 4;
    computedRai = Math.floor(totalWah / 400);
    totalWah %= 400;
    computedNgan = Math.floor(totalWah / 100);
    computedWah = totalWah % 100;
    computedAcre = s / 4046.8564224;
  }

  return (
    <div id="thai-land-units-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยที่ดินไทย (ไร่-งาน-ตารางวา)" : "Thai Land Units Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "เครื่องมือแปลงขนาดที่ดินไทยเป็นตารางเมตร ตารางวา เอเคอร์ สะดวกสำหรับผู้ซื้อขายอสังหาริมทรัพย์" : "Convert between Rai, Ngan, Tarang Wah and Square Meters or Acres."}
      </p>

      <div className="flex bg-black/5 dark:bg-white/10 rounded-xl p-1 mb-6 max-w-sm">
        <button onClick={() => setMode("toSqm")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "toSqm" ? "bg-deep-teal text-white shadow-sm" : "text-gray-500"}`}>
          {lang === "TH" ? "แปลง ไร่-งาน-วา → ตารางเมตร" : "Rai-Ngan-Wah → Sqm"}
        </button>
        <button onClick={() => setMode("fromSqm")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "fromSqm" ? "bg-deep-teal text-white shadow-sm" : "text-gray-500"}`}>
          {lang === "TH" ? "แปลง ตารางเมตร → ไร่-งาน-วา" : "Sqm → Rai-Ngan-Wah"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {mode === "toSqm" ? (
          <>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ไร่" : "Rai"}</label>
              <input type="number" value={rai} onChange={(e) => setRai(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "งาน" : "Ngan"}</label>
              <input type="number" value={ngan} onChange={(e) => setNgan(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ตารางวา" : "Tarang Wah"}</label>
              <input type="number" value={wah} onChange={(e) => setWah(e.target.value)} className={inputClass} />
            </div>
          </>
        ) : (
          <div className="md:col-span-3">
            <label className={labelClass}>{lang === "TH" ? "ตารางเมตร (ตร.ม.)" : "Square Meters (sqm)"}</label>
            <input type="number" value={sqm} onChange={(e) => setSqm(e.target.value)} className={inputClass} />
          </div>
        )}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "สรุปผลการแปลงพื้นที่" : "Conversion Summary"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "พื้นที่ทั้งหมด" : "Total Sqm"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{computedSqm.toLocaleString()} ตร.ม.</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "หน่วยไทยรวม" : "Rai-Ngan-Wah"}</p>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-1">{computedRai} ไร่ {computedNgan} งาน {computedWah} วา</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "คิดเป็นตารางวา" : "Total Wah"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{(computedSqm / 4).toLocaleString()} ตร.ว.</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "คิดเป็นเอเคอร์" : "Acres"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{computedAcre.toLocaleString(undefined, { maximumFractionDigits: 4 })} ac</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="thai-land-units-calc" fileName="thai-land-units" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "ความรู้เรื่องการคำนวณและแปลงหน่วยที่ดินไทย" : "Thai Land Units FAQ"}>
        <FAQItem
          q="หน่วยวัดที่ดินของไทย ไร่ งาน ตารางวา มีมาตราส่วนเปรียบเทียบกับหน่วยเมตริกอย่างไร?"
          a="มาตราส่วนที่ดินไทยถูกกำหนดตามพระราชบัญญัติมาตราชั่งตวงวัด โดยเปรียบเทียบกับระบบเมตริกอย่างเป็นทางการดังนี้: 1 ตารางวา เท่ากับ 4 ตารางเมตร, 1 งาน เท่ากับ 100 ตารางวา (หรือ 400 ตารางเมตร), และ 1 ไร่ เท่ากับ 4 งาน (หรือ 400 ตารางวา หรือ 1,600 ตารางเมตร) ส่วน 1 เอเคอร์ (หน่วยอังกฤษ) จะมีขนาดประมาณ 2.529 ไร่"
        />
        <FAQItem
          q="วิธีอ่านรายละเอียดขนาดที่ดินในโฉนดที่ดิน (น.ส. 4) ต้องดูอย่างไร?"
          a="ในโฉนดที่ดินของไทย ขนาดเนื้อที่จะถูกระบุในแถว 'เนื้อที่' เป็นตัวเลขสามหลักเรียงตามลำดับคือ ไร่ - งาน - ตารางวา เช่น 'เนื้อที่ 2 ไร่ 3 งาน 50 ตารางวา' ในทางปฏิบัติจะหมายถึงเนื้อที่รวมทั้งหมด (2 x 1,600) + (3 x 400) + (50 x 4) = 4,600 ตารางเมตร ซึ่งการรู้ขนาดพื้นที่ในระบบตารางเมตรจะช่วยในการคำนวณราคาขายต่อตารางเมตรได้ง่ายขึ้น"
        />
        <FAQItem
          q="ตารางวา กับ ตารางเมตร ต่างกันอย่างไร และใช้วัดอะไรบ้าง?"
          a="ตารางวา (ตร.ว.) เป็นหน่วยวัดพื้นที่แบบไทยที่นิยมใช้ระบุขนาดของที่ดินผืนเล็ก เช่น บ้านเดี่ยว ทาวน์โฮม หรือที่ดินจัดสรร ส่วน ตารางเมตร (ตร.ม.) เป็นหน่วยสากลที่นิยมใช้ระบุพื้นที่ใช้สอยภายในอาคาร คอนโดมิเนียม หรือสิ่งปลูกสร้าง โดยมีสูตรการแปลงง่ายๆ คือ พื้นที่ตารางเมตร หารด้วย 4 จะได้เป็นพื้นที่ตารางวา"
        />
        <FAQItem
          q="ในการซื้อขายที่ดิน ทำไมราคาที่ดินเขตเมืองถึงนิยมคิดเป็นราคาต่อตารางวา?"
          a="ที่ดินในเขตเมืองหรือกรุงเทพมหานครมีมูลค่าสูงมากและมักมีขนาดผืนดินไม่ใหญ่นัก การประเมินราคาจึงนิยมใช้หน่วย 'ตารางวา' เพื่อความละเอียดและสะท้อนมูลค่าที่แท้จริง เช่น ราคาตารางวาละ 100,000 บาท ซึ่งหากแปลงเป็นราคาต่อไร่จะสูงถึง 40 ล้านบาท การคิดเป็นตารางวาทำให้การเจรจาซื้อขายส่วนเสี้ยวของที่ดินทำได้สะดวกกว่า"
        />
        <FAQItem
          q="หน่วย เฮกตาร์ (Hectare) และ เอเคอร์ (Acre) แตกต่างจากหน่วย ไร่ ของไทยอย่างไร?"
          a="ทั้งเฮกตาร์และเอเคอร์เป็นหน่วยวัดพื้นที่ขนาดใหญ่ โดยเฮกตาร์เป็นหน่วยในระบบเมตริก (1 เฮกตาร์ = 10,000 ตารางเมตร หรือเท่ากับ 6.25 ไร่) นิยมใช้ในแถบยุโรปและเอกสารสากล ส่วนเอเคอร์เป็นหน่วยระบบอังกฤษ (1 เอเคอร์ = 4,046.86 ตารางเมตร หรือประมาณ 2.529 ไร่) นิยมใช้ในสหรัฐอเมริกาและสหราชอาณาจักร"
        />
      </SEOFAQ>
    </div>
  );
}

// 3. Agri Area Converter
export function AgriAreaConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("agri_area_val", "1");
  const [unit, setUnit] = useLocalState("agri_area_unit", "hectare");

  const factors: Record<string, { toSqm: number; th: string; en: string }> = {
    rai: { toSqm: 1600, th: "ไร่ (Rai)", en: "Rai" },
    hectare: { toSqm: 10000, th: "เฮกตาร์ (Hectare)", en: "Hectare" },
    acre: { toSqm: 4046.8564, th: "เอเคอร์ (Acre)", en: "Acre" },
    sqm: { toSqm: 1, th: "ตารางเมตร (Sqm)", en: "Square Meters" }
  };

  const v = parseFloat(val) || 0;
  const sqmBase = v * factors[unit].toSqm;

  return (
    <div id="agri-area-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยเนื้อที่เกษตร (เฮกตาร์-เอเคอร์-ไร่)" : "Agricultural Area Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "เปรียบเทียบสัดส่วนพื้นที่แปลงเกษตรกรรมระหว่างหน่วยไร่ เฮกตาร์ เอเคอร์ และตารางเมตร" : "Convert and compare agricultural land units across different regional standards."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดพื้นที่" : "Area Value"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "หน่วยเริ่มต้น" : "Source Unit"}</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
            {Object.entries(factors).map(([key, f]) => (
              <option key={key} value={key}>{lang === "TH" ? f.th : f.en}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ตารางเทียบเท่าทุกหน่วย" : "Equivalent Areas"}</h4>
        <div className="space-y-3">
          {Object.entries(factors).map(([key, f]) => {
            const converted = sqmBase / f.toSqm;
            return (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5 last:border-0">
                <span className="text-gray-600 dark:text-gray-400 font-medium">{lang === "TH" ? f.th : f.en}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <ExportResult elementId="agri-area-converter-calc" fileName="agri-area-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำแนะนำการวัดและคำนวณพื้นที่เกษตรระดับสากล" : "Agri Area FAQ"}>
        <FAQItem
          q="ทำไมภาคการเกษตรไทยถึงเริ่มเปลี่ยนมาใช้หน่วยเฮกตาร์และเอเคอร์ในการคำนวณ?"
          a="เนื่องจากรายงานวิจัย เครื่องจักรกลการเกษตร และคู่มือการใช้ปุ๋ยหรือสารเคมีในระดับสากลมักระบุสัดส่วนเป็นปริมาณต่อเฮกตาร์ (Per Hectare) หรือต่อเอเคอร์ (Per Acre) การที่เกษตรกรหรือนักวิชาการเกษตรไทยเข้าใจวิธีการแปลงหน่วยเป็น ไร่ งาน หรือตารางเมตร จะช่วยให้การผสมสารเคมี การคำนวณผลผลิตต่อพื้นที่ และการวิจัยวิเคราะห์สถิติมีความแม่นยำและเปรียบเทียบกับต่างประเทศได้โดยไม่ผิดพลาด"
        />
        <FAQItem
          q="1 เฮกตาร์ (Hectare) เท่ากับกี่ไร่ และกี่ตารางเมตร?"
          a="1 เฮกตาร์ (ย่อว่า ha) มีขนาดเท่ากับพื้นที่สี่เหลี่ยมจัตุรัสขนาด 100 เมตรคูณ 100 เมตร ซึ่งคิดเป็นพื้นที่ 10,000 ตารางเมตร เมื่อเปรียบเทียบกับหน่วยที่ดินไทย (1 ไร่ = 1,600 ตารางเมตร) จะพบว่า 1 เฮกตาร์ มีขนาดเท่ากับ 6.25 ไร่พอดี หรือคิดเป็น 6 ไร่ กับอีก 1 งาน"
        />
        <FAQItem
          q="1 เอเคอร์ (Acre) เท่ากับกี่ไร่ และกี่ตารางเมตร?"
          a="1 เอเคอร์ (ย่อว่า ac) มีขนาดพื้นที่ประมาณ 4,046.86 ตารางเมตร เมื่อนำมาแปลงเป็นหน่วยไทยจะเทียบได้กับประมาณ 2.529 ไร่ หรือคิดเป็น 2 ไร่ 2 งาน กับอีก 11.6 ตารางวา นิยมใช้มากในประเทศสหรัฐอเมริกา แคนาดา และออสเตรเลีย สำหรับฟาร์มเกษตรและทุ่งปศุสัตว์ขนาดใหญ่"
        />
        <FAQItem
          q="วิธีคำนวณปริมาณปุ๋ยเคมีจากสูตรแนะนำต่างประเทศ (เช่น กก./เฮกตาร์) ให้เป็นหน่วยไทย (กก./ไร่) ทำอย่างไร?"
          a="การแปลงคำแนะนำการใส่ปุ๋ยจากระบบสากลเป็นระบบไทย ให้ใช้ตัวเลข 6.25 เป็นตัวหาร ตัวอย่างเช่น หากคู่มือการเกษตรต่างประเทศแนะนำให้ใส่ปุ๋ยในอัตรา 100 กิโลกรัมต่อเฮกตาร์ จะเทียบเท่ากับอัตราการใส่ปุ๋ยในไทยคือ 100 หารด้วย 6.25 ซึ่งเท่ากับ 16 กิโลกรัมต่อไร่นั่นเอง"
        />
        <FAQItem
          q="ขนาดพื้นที่เกษตรที่เหมาะสมในการเริ่มทำเกษตรผสมผสานตามหลักปรัชญาเศรษฐกิจพอเพียงคือเท่าใด?"
          a="ตามแนวทางเกษตรทฤษฎีใหม่ มักแนะนำให้เริ่มต้นที่พื้นที่ประมาณ 15 ไร่ ซึ่งแบ่งสัดส่วนเป็น 30:30:30:10 คือ แหล่งน้ำ 30% (ประมาณ 3 ไร่), ทำนาข้าว 30% (ประมาณ 3 ไร่), ปลูกพืชสวนพืชไร่ 30% (ประมาณ 3 ไร่) และที่อยู่อาศัยกับทางเดินเลี้ยงสัตว์ 10% (ประมาณ 1.5 ไร่) อย่างไรก็ตาม หากมีพื้นที่ขนาดเล็กกว่า เช่น 1-2 ไร่ ก็สามารถจัดสัดส่วนย่อส่วนลงมาได้เช่นกัน"
        />
      </SEOFAQ>
    </div>
  );
}

// 4. Thai Gold Units Calculator
export function ThaiGoldUnitsCalculator({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("gold_val", "1");
  const [type, setType] = useLocalState("gold_type", "bullion");
  const [unit, setUnit] = useLocalState("gold_unit", "baht");

  const gPerBaht = type === "bullion" ? 15.244 : 15.16;

  const getWeightInGrams = () => {
    const v = parseFloat(val) || 0;
    if (unit === "baht") return v * gPerBaht;
    if (unit === "salung") return v * (gPerBaht / 4);
    if (unit === "gram") return v;
    if (unit === "oz") return v * 31.1034768; // Troy Ounce
    return 0;
  };

  const grams = getWeightInGrams();
  const baht = grams / gPerBaht;
  const salung = baht * 4;
  const oz = grams / 31.1034768;

  return (
    <div id="thai-gold-units-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยทองคำไทย (บาท-สลึง-กรัม)" : "Thai Gold Units Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "คำนวณแปลงน้ำหนักทองคำ 96.5% ทั้งทองแท่งและทองรูปพรรณ เป็นกรัม และออนซ์ทรอย" : "Convert between Baht, Salung, Grams, and Troy Ounces for Thai gold purity (96.5%)."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภททองคำ" : "Gold Type"}</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="bullion">{lang === "TH" ? "ทองคำแท่ง 96.5%" : "Gold Bullion 96.5%"}</option>
            <option value="jewelry">{lang === "TH" ? "ทองรูปพรรณ 96.5%" : "Gold Jewelry 96.5%"}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนัก" : "Weight"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "หน่วยเริ่มต้น" : "Source Unit"}</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
            <option value="baht">{lang === "TH" ? "บาททองคำ" : "Baht"}</option>
            <option value="salung">{lang === "TH" ? "สลึง" : "Salung"}</option>
            <option value="gram">{lang === "TH" ? "กรัม" : "Grams"}</option>
            <option value="oz">{lang === "TH" ? "ออนซ์ทรอย (troy oz)" : "Troy Ounces"}</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "สรุปการแปลงน้ำหนักทองคำ" : "Gold Weight Equivalents"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "กรัม (Grams)" : "Grams"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{grams.toLocaleString(undefined, { maximumFractionDigits: 4 })} กรัม</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "บาท (Baht)" : "Baht"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{baht.toLocaleString(undefined, { maximumFractionDigits: 4 })} บาท</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "สลึง (Salung)" : "Salung"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{salung.toLocaleString(undefined, { maximumFractionDigits: 4 })} สลึง</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ออนซ์ทรอย (oz t)" : "Troy Ounces"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{oz.toLocaleString(undefined, { maximumFractionDigits: 4 })} oz t</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="thai-gold-units-calc" fileName="thai-gold-units" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการตวงและวัดทองคำไทย" : "Thai Gold FAQ"}>
        <FAQItem
          q="ทำไมน้ำหนักทองคำ 1 บาทของทองแท่งและทองรูปพรรณถึงไม่เท่ากัน?"
          a="สมาคมค้าทองคำแห่งประเทศไทยได้กำหนดมาตรฐานน้ำหนักทองคำ 96.5% ไว้ต่างกันตามประเภท เพื่อชดเชยการสูญเสียเนื้อทองในกระบวนการผลิตและขึ้นรูปเครื่องประดับ: โดยทองคำแท่ง 1 บาท จะต้องมีน้ำหนักเต็มเท่ากับ 15.244 กรัม ขณะที่ทองรูปพรรณ (เช่น สร้อยคอ แหวน กำไล) 1 บาท จะต้องมีน้ำหนักไม่ต่ำกว่า 15.16 กรัม ซึ่งได้รับการยอมรับอย่างเป็นทางการตามกฎหมายค้าทองคำของไทย"
        />
        <FAQItem
          q="สัดส่วนหน่วยทองคำไทย 'บาท' และ 'สลึง' มีความสัมพันธ์กันอย่างไร?"
          a="ทองคำไทยมีหน่วยย่อยที่นิยมเรียกกันว่า 'สลึง' โดย 1 บาททองคำ จะแบ่งออกเป็น 4 สลึงพอดี ดังนั้น ทองคำน้ำหนัก 1 สลึง จะเท่ากับ 0.25 บาททองคำ, 2 สลึง เท่ากับ 0.5 บาททองคำ (หรือครึ่งบาท), และ 3 สลึง เท่ากับ 0.75 บาททองคำ หากคิดเป็นน้ำหนักกรัม ทองรูปพรรณ 1 สลึง จะมีน้ำหนักประมาณ 3.79 กรัม และทองแท่ง 1 สลึง จะมีน้ำหนักประมาณ 3.811 กรัม"
        />
        <FAQItem
          q="ทองคำ 96.5% กับ ทองคำ 99.99% แตกต่างกันอย่างไรในแง่น้ำหนักและมาตรฐาน?"
          a="ทองคำ 96.5% เป็นมาตรฐานหลักที่ซื้อขายกันเฉพาะในประเทศไทย ซึ่งได้รับความนิยมสูงเนื่องจากเนื้อทองมีความแข็งแรงพอที่จะทำเป็นเครื่องประดับได้ดี ส่วนทองคำ 99.99% (หรือทอง 24K) เป็นมาตรฐานสากลระดับโลก (Fine Gold) มีความบริสุทธิ์สูงมากจนเนื้อทองนิ่มเกินกว่าจะทำเครื่องประดับ จึงมักซื้อขายในรูปของทองแท่งเพื่อการลงทุน โดยอิงน้ำหนักกับหน่วย 'ออนซ์ทรอย' (Troy Ounce)"
        />
        <FAQItem
          q="1 ออนซ์ทรอย (Troy Ounce) เท่ากับกี่กรัม และกี่บาททองคำไทย?"
          a="ออนซ์ทรอย (สัญลักษณ์: oz t) เป็นหน่วยวัดน้ำหนักโลหะมีค่าที่เป็นสากล โดย 1 ออนซ์ทรอย มีค่าเท่ากับ 31.1035 กรัม เมื่อเทียบกับน้ำหนักทองคำแท่งของไทย (1 บาท = 15.244 กรัม) จะพบว่า 1 ออนซ์ทรอย จะมีน้ำหนักเท่ากับประมาณ 2.04 บาททองคำไทย การแปลงหน่วยนี้จำเป็นมากสำหรับผู้ที่ลงทุนหรือเทรดทองคำในตลาดโลก (Gold Spot)"
        />
        <FAQItem
          q="ค่ากำเหน็จ คืออะไร และมีผลอย่างไรต่อราคาทองรูปพรรณเมื่อซื้อและขายคืน?"
          a="ค่ากำเหน็จ คือ ค่าแรงในการออกแบบและแปรรูปทองคำให้เป็นเครื่องประดับ ซึ่งร้านทองจะคิดเพิ่มจากราคาทองคำแท่งมาตรฐานในวันที่ซื้อ (ประมาณ 500-2,000 บาทต่อบาททองคำ ขึ้นอยู่กับความยากง่ายของลาย) และเมื่อเรานำทองรูปพรรณไปขายคืน ร้านทองจะหักค่าเสื่อมและไม่คืนค่ากำเหน็จนี้ ทำให้ราคารับซื้อคืนทองรูปพรรณต่ำกว่าทองคำแท่งเสมอตามเกณฑ์ควบคุม"
        />
      </SEOFAQ>
    </div>
  );
}

// 5. Rice Weight Converter
export function RiceWeightConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("rice_val", "1");
  const [type, setType] = useLocalState("rice_type", "milled");
  const [unit, setUnit] = useLocalState("rice_unit", "tang");

  const kgPerTang = type === "milled" ? 15 : 10;
  const kgPerKwian = type === "milled" ? 1500 : 1000;

  const getWeightInKg = () => {
    const v = parseFloat(val) || 0;
    if (unit === "tang") return v * kgPerTang;
    if (unit === "sack") return v * 100;
    if (unit === "kwian") return v * kgPerKwian;
    if (unit === "ban") return v * (kgPerKwian / 2);
    if (unit === "tasat") return v * (kgPerTang / 2);
    if (unit === "kg") return v;
    if (unit === "ton") return v * 1000;
    return 0;
  };

  const kg = getWeightInKg();
  const tang = kg / kgPerTang;
  const kwian = kg / kgPerKwian;
  const sack = kg / 100;
  const ton = kg / 1000;

  return (
    <div id="rice-weight-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยน้ำหนักข้าวสารและข้าวเปลือก" : "Rice Weight Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "เครื่องตวงและชั่งน้ำหนักข้าวเปลือก/ข้าวสาร แปลงถัง เกวียน บั้น กระสอบ และกิโลกรัม" : "Convert between traditional Thai rice units and modern kilograms or tons."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภทข้าว" : "Rice Type"}</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="milled">{lang === "TH" ? "ข้าวสาร (Milled Rice)" : "Milled Rice"}</option>
            <option value="paddy">{lang === "TH" ? "ข้าวเปลือก (Paddy Rice)" : "Paddy Rice"}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณ" : "Value"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>{lang === "TH" ? "หน่วยเริ่มต้น" : "Source Unit"}</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
            <option value="tang">{lang === "TH" ? "ถัง (Tang)" : "Tang"}</option>
            <option value="sack">{lang === "TH" ? "กระสอบ (Sack - 100 กิโลกรัม)" : "Sack (100 kg)"}</option>
            <option value="kwian">{lang === "TH" ? "เกวียน (Kwian)" : "Kwian"}</option>
            <option value="ban">{lang === "TH" ? "บั้น (50 ถัง)" : "Ban (50 Tang)"}</option>
            <option value="tasat">{lang === "TH" ? "ตะสัด (ครึ่งถัง)" : "Ta-sat (0.5 Tang)"}</option>
            <option value="kg">{lang === "TH" ? "กิโลกรัม (kg)" : "Kilograms (kg)"}</option>
            <option value="ton">{lang === "TH" ? "เมตริกตัน (Tons)" : "Tons"}</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "สรุปผลน้ำหนักข้าว" : "Equivalent Rice Weights"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "กิโลกรัม" : "Kilograms"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{kg.toLocaleString()} kg</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ถัง" : "Tang"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{tang.toLocaleString(undefined, { maximumFractionDigits: 2 })} ถัง</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "เกวียน" : "Kwian"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{kwian.toLocaleString(undefined, { maximumFractionDigits: 3 })} เกวียน</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "กระสอบ" : "Sacks"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{sack.toLocaleString(undefined, { maximumFractionDigits: 2 })} กระสอบ</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 col-span-2 md:col-span-1">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "เมตริกตัน" : "Metric Tons"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{ton.toLocaleString(undefined, { maximumFractionDigits: 3 })} ตัน</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="rice-weight-converter-calc" fileName="rice-weight-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "เกร็ดความรู้การคำนวณและชั่งตวงข้าวของไทย" : "Rice Weight FAQ"}>
        <FAQItem
          q="ทำไมตวงข้าวเปลือกและข้าวสารในหน่วย 'ถัง' เดียวกันแต่ได้น้ำหนักกิโลกรัมไม่เท่ากัน?"
          a="เนื่องจากข้าวเปลือก (Paddy) มีเปลือกแกลบหุ้มอยู่และมีช่องว่างระหว่างเมล็ดมากกว่า ทำให้ความหนาแน่นต่ำกว่าข้าวสาร (Milled Rice) ที่ผ่านการขัดสีเอาเปลือกออกแล้ว ในเชิงการค้าไทยจึงกำหนดมาตรฐานน้ำหนักไว้ต่างกันคือ: ข้าวเปลือก 1 ถัง (ความจุ 20 ลิตร) จะมีน้ำหนักเท่ากับ 10 กิโลกรัม ส่วนข้าวสาร 1 ถัง (ความจุ 20 ลิตร) จะมีน้ำหนักเท่ากับ 15 กิโลกรัม"
        />
        <FAQItem
          q="1 เกวียนข้าว มีน้ำหนักเท่ากับกี่กิโลกรัม และกี่ถัง?"
          a="ตามมาตราชั่งตวงวัดไทย 1 เกวียน เท่ากับ 100 ถัง ดังนั้น น้ำหนักของข้าว 1 เกวียน จึงขึ้นอยู่กับประเภทของข้าว: หากเป็น 'ข้าวเปลือก 1 เกวียน' จะมีน้ำหนักเท่ากับ 1,000 กิโลกรัมพอดี (คิดเป็น 1 เมตริกตัน) ส่วน 'ข้าวสาร 1 เกวียน' จะมีน้ำหนักเท่ากับ 1,500 กิโลกรัม (หรือ 1.5 ตัน) ซึ่งมีประโยชน์อย่างมากสำหรับโรงสีในการประเมินสัดส่วนผลผลิต"
        />
        <FAQItem
          q="หน่วยวัด 'บั้น' และ 'ตะสัด' มีค่าเท่าใดในปัจจุบัน?"
          a="เป็นหน่วยวัดดั้งเดิมของไทยที่ใช้ตวงข้าวสารและพืชไร่ โดย '1 บั้น' มีค่าเท่ากับครึ่งเกวียน หรือเท่ากับ 50 ถัง (เทียบเป็นข้าวสารหนัก 750 กิโลกรัม หรือข้าวเปลือกหนัก 500 กิโลกรัม) ส่วน 'ตะสัด' หรือสัดขนาดเล็ก เป็นหน่วยโบราณที่ใช้ตวงปริมาณย่อย โดยทั่วไป 1 ตะสัด จะมีขนาดประมาณครึ่งถัง หรือเท่ากับ 10 ลิตร (เทียบเป็นข้าวสารหนัก 7.5 กิโลกรัม)"
        />
        <FAQItem
          q="1 กระสอบข้าวสาร มีมาตรฐานน้ำหนักกี่กิโลกรัม?"
          a="ในการค้าส่งและส่งออกข้าวสารของประเทศไทย น้ำหนักมาตรฐานของข้าวสาร 1 กระสอบใหญ่ (Sack) จะถูกกำหนดไว้ที่ 100 กิโลกรัมพอดี (หรือเทียบเท่ากับประมาณ 6.67 ถัง) อย่างไรก็ตาม ในตลาดค้าปลีกปัจจุบันนิยมบรรจุใส่ถุงขนาดเล็กน้ำหนัก 5 กิโลกรัมเพื่อความสะดวกในการซื้อบริโภคในครัวเรือน ซึ่งข้าวสาร 1 กระสอบใหญ่จะแบ่งได้เป็น 20 ถุงเล็กพอดี"
        />
        <FAQItem
          q="อัตราการสีข้าวเปลือกเป็นข้าวสาร (Milling Recovery Rate) โดยเฉลี่ยอยู่ที่เท่าใด?"
          a="โดยเฉลี่ยแล้ว ข้าวเปลือก 1 เกวียน (1,000 กิโลกรัม) เมื่อผ่านกระบวนการกะเทาะเปลือกและขัดสีในโรงสีข้าวที่ได้มาตรฐาน จะได้เป็นข้าวสารประมาณ 600 ถึง 660 กิโลกรัม (คิดเป็นร้อยละ 60-66) ส่วนที่เหลืออีกร้อยละ 34-40 จะกลายเป็นผลพลอยได้อื่นๆ เช่น แกลบ รำข้าว และปลายข้าว ซึ่งมีมูลค่าในทางอุตสาหกรรมอาหารสัตว์และพลังงานทางเลือก"
        />
      </SEOFAQ>
    </div>
  );
}

// 6. Palm Oil Converter
export function PalmOilConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("palm_val", "1000");
  const [mode, setMode] = useLocalState("palm_mode", "volToWt");
  const [temp, setTemp] = useLocalState("palm_temp", "25");
  const [pricePerKg, setPricePerKg] = useLocalState("palm_price_kg", "35");

  const t = parseFloat(temp) || 25;
  const density = 0.924 - 0.0007 * t;

  const v = parseFloat(val) || 0;
  let weightKg = 0;
  let volumeL = 0;

  if (mode === "volToWt") {
    volumeL = v;
    weightKg = v * density;
  } else {
    weightKg = v;
    volumeL = v / density;
  }

  const pKg = parseFloat(pricePerKg) || 0;
  const equivalentPricePerL = pKg * density;

  return (
    <div id="palm-oil-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงน้ำหนักและปริมาตรน้ำมันปาล์ม" : "Palm Oil Weight/Volume Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "คำนวณแปลงลิตรเป็นกิโลกรัมของน้ำมันปาล์มโดยอิงความหนาแน่นตามอุณหภูมิ พร้อมเทียบราคารับซื้อ" : "Convert palm oil between Liters and Kilograms adjusting for temperature-density effects."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "โหมดการแปลง" : "Conversion Mode"}</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className={inputClass}>
            <option value="volToWt">{lang === "TH" ? "ปริมาตร (ลิตร) → น้ำหนัก (กก.)" : "Liters → Kilograms"}</option>
            <option value="wtToVol">{lang === "TH" ? "น้ำหนัก (กก.) → ปริมาตร (ลิตร)" : "Kilograms → Liters"}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณน้ำมัน" : "Quantity"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "อุณหภูมิปัจจุบัน (°C)" : "Temperature (°C)"}</label>
          <input type="number" min="15" max="80" value={temp} onChange={(e) => setTemp(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาท้องตลาด (บาท/กก.)" : "Price (฿/kg)"}</label>
          <input type="number" value={pricePerKg} onChange={(e) => setPricePerKg(e.target.value)} className={inputClass} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ผลการคำนวณราคาน้ำมันและน้ำหนัก" : "Palm Oil Calculation Results"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ความหนาแน่น" : "Density"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{density.toFixed(4)} kg/L</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "น้ำหนักสุทธิ" : "Total Weight"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{weightKg.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ปริมาตรสุทธิ" : "Total Volume"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{volumeL.toLocaleString(undefined, { maximumFractionDigits: 2 })} L</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ราคาเทียบเท่าต่อลิตร" : "Price per Liter"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">฿{equivalentPricePerL.toFixed(2)} / L</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="palm-oil-converter-calc" fileName="palm-oil-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการแปลงหน่วยน้ำมันปาล์ม" : "Palm Oil FAQ"}>
        <FAQItem
          q="ทำไมอุณหภูมิถึงมีผลต่อความหนาแน่นและน้ำหนักของน้ำมันปาล์ม?"
          a="น้ำมันปาล์มเป็นของเหลวที่จะขยายตัวเมื่ออุณหภูมิสูงขึ้นและหดตัวเมื่อเย็นลง ส่งผลให้ 'ความหนาแน่น' (Density) เปลี่ยนแปลงตามอุณหภูมิ ตัวอย่างเช่น ที่อุณหภูมิ 25°C น้ำมันปาล์มมีความหนาแน่นประมาณ 0.906 กิโลกรัมต่อลิตร แต่เมื่ออุณหภูมิสูงขึ้นถึง 50°C ความหนาแน่นจะลดลงเหลือประมาณ 0.889 กิโลกรัมต่อลิตร ทำให้การซื้อขายน้ำมันปาล์มปริมาตรเท่ากันจะมีน้ำหนักต่างกันตามอุณหภูมิสภาพแวดล้อม"
        />
        <FAQItem
          q="อุตสาหกรรมน้ำมันปาล์มซื้อขายกันด้วยน้ำหนัก (กิโลกรัม/ตัน) หรือปริมาตร (ลิตร)?"
          a="ในระดับการค้าระหว่างประเทศ โรงงานสกัดน้ำมัน และพ่อค้าส่ง จะซื้อขายน้ำมันปาล์มดิบ (CPO) โดยใช้หน่วย 'น้ำหนัก' (กิโลกรัม หรือ เมตริกตัน) เป็นหลัก เนื่องจากมีความเที่ยงตรงและไม่ผันผวนตามอุณหภูมิสภาพแวดล้อม ส่วนการค้าปลีกในขวดเพื่อการบริโภคจะระบุปริมาตรเป็น 'ลิตร' หรือ 'มิลลิลิตร' ควบคู่กับน้ำหนักสุทธิกรัมเพื่อความคุ้มครองผู้บริโภค"
        />
        <FAQItem
          q="วิธีแปลงราคาน้ำมันปาล์มจาก บาทต่อกิโลกรัม เป็น บาทต่อลิตร ทำอย่างไร?"
          a="สูตรการแปลงราคาคือ: ราคาต่อลิตร = ราคาต่อกิโลกรัม คูณด้วย ความหนาแน่นของน้ำมันปาล์ม ณ อุณหภูมินั้น ตัวอย่างเช่น ถ้าน้ำมันปาล์มดิบราคา 35 บาทต่อกิโลกรัม และความหนาแน่นเท่ากับ 0.90 กิโลกรัมต่อลิตร ราคาต่อลิตรจะเท่ากับ 35 x 0.90 = 31.50 บาทต่อลิตร การคำนวณนี้ช่วยให้โรงงานเปรียบเทียบต้นทุนการบรรจุขวดได้ง่ายขึ้น"
        />
        <FAQItem
          q="จุดเยือกแข็งหรือการเกิดไขของน้ำมันปาล์มส่งผลต่อความหนาแน่นอย่างไร?"
          a="น้ำมันปาล์มมีสัดส่วนของกรดไขมันอิ่มตัวสูง จึงเริ่มจับตัวเป็นไขขุ่นที่อุณหภูมิต่ำกว่า 20-22°C เมื่อเปลี่ยนสถานะจากของเหลวเป็นกึ่งของแข็ง ปริมาตรจะหดตัวลงเล็กน้อยและความหนาแน่นจะสูงขึ้น การวัดปริมาตรน้ำมันปาล์มผ่านมิเตอร์วัดการไหล (Flow Meter) ในช่วงที่เป็นไขอาจเกิดความคลาดเคลื่อนสูง จึงต้องควบคุมอุณหภูมิน้ำมันให้อยู่ในเกณฑ์อุ่น (ประมาณ 40-50°C) เสมอขณะขนถ่าย"
        />
        <FAQItem
          q="ความหนาแน่นเฉลี่ยของน้ำมันปาล์มบรรจุขวดปรุงอาหารทั่วไปอยู่ที่เท่าไร?"
          a="น้ำมันปาล์มโอเลอินผ่านกรรมวิธีที่วางจำหน่ายในซูเปอร์มาร์เก็ตทั่วไป จะมีความหนาแน่นเฉลี่ยที่อุณหภูมิห้อง (ประมาณ 25-30°C) อยู่ที่ 0.90 ถึง 0.91 กิโลกรัมต่อลิตร ดังนั้น น้ำมันปาล์มบรรจุขวดขนาด 1 ลิตร (1,000 มิลลิลิตร) จะมีน้ำหนักเนื้อน้ำมันจริงๆ อยู่ที่ประมาณ 900 ถึง 910 กรัม (ไม่รวมน้ำหนักของขวดพลาสติก)"
        />
      </SEOFAQ>
    </div>
  );
}

// 7. Drug Dosage Converter
export function DrugDosageConverter({ lang }: { lang: Lang }) {
  const [doseVal, setDoseVal] = useLocalState("drug_dose_val", "100");
  const [fromDose, setFromDose] = useLocalState("drug_from", "mg");
  const [toDose, setToDose] = useLocalState("drug_to", "mcg");

  const [weight, setWeight] = useLocalState("drug_weight", "");
  const [rate, setRate] = useLocalState("drug_rate", "");
  const [concVal, setConcVal] = useLocalState("drug_conc_val", "120");
  const [concVol, setConcVol] = useLocalState("drug_conc_vol", "5");

  const doseFactors: Record<string, number> = {
    mcg: 1,
    mg: 1000,
    g: 1000000
  };

  const dV = parseFloat(doseVal) || 0;
  const doseResult = (dV * doseFactors[fromDose]) / doseFactors[toDose];

  const w = parseFloat(weight) || 0;
  const r = parseFloat(rate) || 0;
  const calculatedDoseMg = w * r;

  const cVal = parseFloat(concVal) || 0;
  const cVol = parseFloat(concVol) || 0;
  const volumeToGive = cVal > 0 ? (calculatedDoseMg / cVal) * cVol : 0;

  return (
    <div id="drug-dosage-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยยากุมารเวชและคลินิก (mg - mcg)" : "Clinical Drug Dosage Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงหน่วยมิลลิกรัม ไมโครกรัม และคำนวณปริมาตรยาน้ำที่ต้องจ่ายตามน้ำหนักตัวผู้ป่วย" : "Convert between mg and mcg, and calculate liquid dosage volume based on patient body weight."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "1. แปลงหน่วยน้ำหนักยา" : "1. Convert Drug Weight Unit"}</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ขนาดยา" : "Dose Value"}</label>
              <input type="number" value={doseVal} onChange={(e) => setDoseVal(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>{lang === "TH" ? "จากหน่วย" : "From Unit"}</label>
                <select value={fromDose} onChange={(e) => setFromDose(e.target.value)} className={inputClass}>
                  <option value="mcg">mcg (µg)</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "เป็นหน่วย" : "To Unit"}</label>
                <select value={toDose} onChange={(e) => setToDose(e.target.value)} className={inputClass}>
                  <option value="mcg">mcg (µg)</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-xl text-center">
              <span className="text-xs text-gray-500 block">{lang === "TH" ? "น้ำหนักยาที่แปลงแล้ว" : "Converted Weight"}</span>
              <span className="text-xl font-bold text-deep-teal dark:text-soft-mint">
                {doseResult.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toDose}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "2. คำนวณปริมาตรยาน้ำตามน้ำหนักตัว" : "2. Liquid Dosing by Weight"}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>{lang === "TH" ? "น้ำหนักตัว (kg)" : "Weight (kg)"}</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="เช่น 12" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "ขนาดยาที่สั่ง (mg/kg)" : "Dose Rate (mg/kg)"}</label>
                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="เช่น 10" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>{lang === "TH" ? "ตัวยาที่มี (mg)" : "Conc Amount (mg)"}</label>
                <input type="number" value={concVal} onChange={(e) => setConcVal(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "ในปริมาตร (ml)" : "Conc Volume (ml)"}</label>
                <input type="number" value={concVol} onChange={(e) => setConcVol(e.target.value)} className={inputClass} />
              </div>
            </div>
            {w > 0 && r > 0 && (
              <div className="p-4 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-xl text-center">
                <span className="text-xs text-gray-500 block">{lang === "TH" ? "ขนาดยาที่ต้องได้รับ: " + calculatedDoseMg.toFixed(2) + " mg" : "Total Dose: " + calculatedDoseMg.toFixed(2) + " mg"}</span>
                <span className="text-xs text-gray-500 block mt-1">{lang === "TH" ? "ปริมาตรยาน้ำที่ต้องป้อน" : "Volume to Administer"}</span>
                <span className="text-xl font-bold text-deep-teal dark:text-soft-mint">
                  {volumeToGive.toFixed(2)} ml
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ExportResult elementId="drug-dosage-converter-calc" fileName="drug-dosage-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "ความปลอดภัยและวิธีการตวงคำนวณขนาดยา" : "Drug Dosage FAQ"}>
        <FAQItem
          q="หน่วย มิลลิกรัม (mg) และ ไมโครกรัม (mcg หรือ µg) แตกต่างกันอย่างไร และทำไมต้องระวังเป็นพิเศษ?"
          a="หน่วยมิลลิกรัม (mg) และไมโครกรัม (mcg หรือ microgram) มีความแตกต่างกันถึง 1,000 เท่า โดย 1 มิลลิกรัม เท่ากับ 1,000 ไมโครกรัม การสับสนระหว่างสองหน่วยนี้อาจส่งผลให้ผู้ป่วยได้รับยาเกินขนาด (Overdose) หรือต่ำกว่าขนาดที่ควรได้รับอย่างรุนแรง ซึ่งในใบสั่งยามักใช้สัญลักษณ์ µg หรือ mcg เพื่อหลีกเลี่ยงการสับสนตัวพิมพ์เล็ก-ใหญ่"
        />
        <FAQItem
          q="วิธีคำนวณปริมาตรน้ำยาที่ต้องดูดจากขวดยา (ml) จากขนาดยาที่แพทย์สั่งทำอย่างไร?"
          a="ใช้สูตรพื้นฐานทางคลินิกคือ: ปริมาตรยาที่จะใช้ (ml) = [ขนาดยาที่ต้องการ (mg)] หารด้วย [ความเข้มข้นของยาที่มี (mg/ml)] ตัวอย่างเช่น แพทย์สั่งยาพาราเซตามอล 120 มก. และยาขวดมีความเข้มข้น 120 มก. ต่อ 5 มล. (ซึ่งเท่ากับ 24 มก./มล.) ปริมาตรที่จะป้อนผู้ป่วยคือ 120 หารด้วย 24 = 5 มิลลิลิตรพอดี"
        />
        <FAQItem
          q="การคำนวณขนาดยาตามน้ำหนักตัวผู้ป่วย (Weight-based Dosing) มีหลักการอย่างไร?"
          a="ยาหลายชนิดโดยเฉพาะยาสำหรับเด็กและยารักษาโรคเฉพาะทาง จะคำนวณขนาดยาตามน้ำหนักตัวผู้ป่วยเป็นกิโลกรัม เช่น อัตรา 15 มก./กก. หากเด็กหนัก 10 กิโลกรัม ขนาดยาที่ต้องการต่อครั้งคือ 10 x 15 = 150 มิลลิกรัม จากนั้นจึงนำไปคำนวณหาปริมาตรน้ำยารูปแบบยาน้ำเพื่อป้อนเด็กตามความเข้มข้นต่อไป"
        />
        <FAQItem
          q="ทำไมยาบางชนิดถึงระบุหน่วยเป็น 'ยูนิตสากล' (IU) และแปลงเป็นมิลลิกรัมได้หรือไม่?"
          a="หน่วยยูนิตสากล (International Unit หรือ IU) เป็นหน่วยวัดฤทธิ์ทางชีวภาพของสาร เช่น วิตามินอี วิตามินดี ฮอร์โมนอินซูลิน หรือยาปฏิชีวนะบางชนิด ซึ่งไม่สามารถเปรียบเทียบเป็นน้ำหนักกรัมคงที่ได้โดยตรง เนื่องจากยาแต่ละยี่ห้อหรือสารแต่ละประเภทมีฤทธิ์ต่อกรัมต่างกัน การแปลงหน่วย IU เป็นน้ำหนักจึงขึ้นอยู่กับสารเฉพาะตัวนั้นๆ เช่น วิตามินดี 1 IU เท่ากับ 0.025 ไมโครกรัม"
        />
        <FAQItem
          q="ช้อนชาและช้อนโต๊ะในบ้านสามารถนำมาใช้ป้อนยาเด็กได้อย่างปลอดภัยหรือไม่?"
          a="ไม่แนะนำอย่างยิ่ง เนื่องจากช้อนชาหรือช้อนทั่วไปในบ้านไม่ได้มาตรฐานและมีปริมาตรที่ผันผวนสูงมาก (ตั้งแต่ 2 ถึง 8 มล.) การป้อนยาทุกชนิดโดยเฉพาะยาน้ำสำหรับเด็กควรใช้อุปกรณ์ตวงยาเฉพาะทาง เช่น กระบอกฉีดยา (Syringe) ถ้วยตวงยา หรือช้อนตวงยามาตรฐานที่มีขีดบอกปริมาตรชัดเจนระดับมิลลิลิตรเพื่อความปลอดภัยสูงสุด"
        />
      </SEOFAQ>
    </div>
  );
}

// 8. Work Time Converter
export function WorkTimeConverter({ lang }: { lang: Lang }) {
  const [mode, setMode] = useLocalState("work_mode", "toDec");
  const [hrs, setHrs] = useLocalState("work_hrs", "7");
  const [mins, setMins] = useLocalState("work_mins", "45");
  const [decHrs, setDecHrs] = useLocalState("work_dec", "7.75");
  const [rate, setRate] = useLocalState("work_rate", "150");
  const [otMult, setOtMult] = useLocalState("work_ot_mult", "1.5");

  const r = parseFloat(rate) || 0;
  const otM = parseFloat(otMult) || 1.5;

  let computedDec = 0;
  let computedHrs = 0;
  let computedMins = 0;

  if (mode === "toDec") {
    const h = parseInt(hrs) || 0;
    const m = parseInt(mins) || 0;
    computedDec = h + m / 60;
    computedHrs = h;
    computedMins = m;
  } else {
    const d = parseFloat(decHrs) || 0;
    computedDec = d;
    computedHrs = Math.floor(d);
    computedMins = Math.round((d - computedHrs) * 60);
  }

  const normalPay = computedDec * r;
  const otPay = computedDec * r * otM;

  return (
    <div id="work-time-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงเวลาทำงานและคำนวณค่าแรง" : "Work Time & Wage Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงนาทีทำงานเป็นทศนิยมเพื่อคิดเงินเดือน สะดวกรวดเร็วสำหรับฝ่ายบุคคล (HR) และฟรีแลนซ์" : "Convert work hours and minutes to decimal formats, and compute earnings with overtime rules."}
      </p>

      <div className="flex bg-black/5 dark:bg-white/10 rounded-xl p-1 mb-6 max-w-sm">
        <button onClick={() => setMode("toDec")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "toDec" ? "bg-deep-teal text-white shadow-sm" : "text-gray-500"}`}>
          {lang === "TH" ? "ชั่วโมง:นาที → ทศนิยม" : "HH:MM → Decimals"}
        </button>
        <button onClick={() => setMode("fromDec")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "fromDec" ? "bg-deep-teal text-white shadow-sm" : "text-gray-500"}`}>
          {lang === "TH" ? "ทศนิยม → ชั่วโมง:นาที" : "Decimals → HH:MM"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {mode === "toDec" ? (
          <>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ชั่วโมง" : "Hours"}</label>
              <input type="number" value={hrs} onChange={(e) => setHrs(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "นาที" : "Minutes"}</label>
              <input type="number" value={mins} onChange={(e) => setMins(e.target.value)} className={inputClass} />
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <label className={labelClass}>{lang === "TH" ? "เวลาทำงานแบบทศนิยม" : "Decimal Hours"}</label>
            <input type="number" step="0.01" value={decHrs} onChange={(e) => setDecHrs(e.target.value)} className={inputClass} />
          </div>
        )}
        <div>
          <label className={labelClass}>{lang === "TH" ? "อัตราค่าจ้าง (บาท/ชม.)" : "Hourly Rate (฿/hr)"}</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ตัวคูณ OT" : "OT Multiplier"}</label>
          <select value={otMult} onChange={(e) => setOtMult(e.target.value)} className={inputClass}>
            <option value="1">1.0 เท่า</option>
            <option value="1.5">1.5 เท่า (ปกติ)</option>
            <option value="2">2.0 เท่า</option>
            <option value="3">3.0 เท่า</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ผลการแปลงและค่าแรงที่คำนวณ" : "Calculated Wages & Hours"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ชั่วโมงทศนิยม" : "Decimal Hours"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{computedDec.toFixed(3)} ชม.</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ชั่วโมงและนาที" : "Hours & Minutes"}</p>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-1">{computedHrs} ชม. {computedMins} นาที</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ค่าจ้างปกติ" : "Standard Pay"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">฿{normalPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ค่าจ้างล่วงเวลา (OT)" : "Overtime Pay"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">฿{otPay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="work-time-converter-calc" fileName="work-time-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "เกร็ดความรู้การบันทึกและแปลงเวลาทำงาน" : "Work Time FAQ"}>
        <FAQItem
          q="วิธีการแปลงเศษนาทีการทำงานให้เป็นเลขทศนิยม (Decimal Hours) มีสูตรคำนวณอย่างไร?"
          a="สูตรการแปลงคือการนำจำนวน 'นาที' หารด้วย 60 แล้วนำไปทศนิยมต่อท้ายจำนวนชั่วโมง ตัวอย่างเช่น ทำงาน 8 ชั่วโมง 15 นาที จะเท่ากับ 8 + (15 / 60) = 8.25 ชั่วโมง หรือหากทำงาน 7 ชั่วโมง 45 นาที จะเท่ากับ 7 + (45 / 60) = 7.75 ชั่วโมง การแปลงนี้มีความสำคัญมากในระบบลงเวลาการทำงาน (Time Attendance) เพื่อใช้คำนวณเงินเดือนด้วยระบบคอมพิวเตอร์"
        />
        <FAQItem
          q="ทำไมฝ่ายบุคคล (HR) ถึงต้องแปลงเวลาทำงานเป็นทศนิยมก่อนคำนวณค่าแรง?"
          a="เนื่องจากโปรแกรมคอมพิวเตอร์ เช่น Excel หรือระบบซอฟต์แวร์คำนวณเงินเดือน ไม่สามารถนำตัวเลขชั่วโมงและนาที (เช่น 8:30) ไปคูณกับอัตราค่าจ้างตรงๆ ได้โดยไม่สูญเสียรูปแบบเวลาดั้งเดิม การแปลงเวลาเป็นระบบทศนิยม (เช่น 8.5 ชั่วโมง) ทำให้สามารถนำไปคูณกับค่าจ้างต่อชั่วโมงได้อย่างถูกต้องตรงตัว เช่น 8.5 ชั่วโมง x 100 บาท = 850 บาท"
        />
        <FAQItem
          q="ตารางเทียบเวลาการทำงานยอดนิยมระหว่างนาทีและทศนิยมมีอะไรบ้าง?"
          a="ตารางการเทียบเวลาพื้นฐานที่ใช้บ่อยคือ: 15 นาที = 0.25 ชั่วโมง, 30 นาที = 0.50 ชั่วโมง (ครึ่งชั่วโมง), 45 นาที = 0.75 ชั่วโมง, และ 60 นาที = 1.00 ชั่วโมง หากเป็นจำนวนนาทีอื่นๆ เช่น 10 นาที จะเท่ากับประมาณ 0.17 ชั่วโมง และ 50 นาที จะเท่ากับประมาณ 0.83 ชั่วโมง"
        />
        <FAQItem
          q="การคำนวณค่าล่วงเวลา (OT) ตามกฎหมายแรงงานไทยมีตัวคูณอัตราพิเศษอย่างไรบ้าง?"
          a="กฎหมายคุ้มครองแรงงานไทยกำหนดอัตราค่าล่วงเวลาไว้ดังนี้: 1) OT วันทำงานปกติ คิดเป็น 1.5 เท่าของค่าจ้างรายชั่วโมง 2) การทำงานในวันหยุดปกติ คิดเป็น 1 เท่าสำหรับผู้มีสิทธิ์ได้รับค่าจ้างในวันหยุด หรือ 2 เท่าสำหรับผู้ไม่มีสิทธิ์ได้รับค่าจ้างในวันหยุด 3) OT ในวันหยุด คิดเป็น 3 เท่าของอัตราค่าจ้างรายชั่วโมงตามกฎหมาย"
        />
        <FAQItem
          q="วิธีคำนวณค่าแรงรายวันเฉลี่ยเป็นอัตราต่อชั่วโมงสำหรับพนักงานเงินเดือนทำอย่างไร?"
          a="สำหรับพนักงานเงินเดือน สูตรคิดค่าจ้างต่อชั่วโมงคือ: [เงินเดือน] หารด้วย [30 วัน] หารด้วย [ชั่วโมงทำงานปกติในหนึ่งวัน (ปกติคือ 8 ชั่วโมง)] ตัวอย่างเช่น เงินเดือน 15,000 บาท ค่าแรงรายวันคือ 15,000 / 30 = 500 บาท และคิดเป็นรายชั่วโมงคือ 500 / 8 = 62.50 บาทต่อชั่วโมง ซึ่งอัตรานี้จะใช้เป็นฐานในการคิดค่าล่วงเวลา (OT)"
        />
      </SEOFAQ>
    </div>
  );
}

// 9. Fabric Length Converter
export function FabricLengthConverter({ lang }: { lang: Lang }) {
  const [lengthVal, setLengthVal] = useLocalState("fabric_val", "1");
  const [unit, setUnit] = useLocalState("fabric_unit", "yard");
  const [price, setPrice] = useLocalState("fabric_price", "100");
  const [widthInches, setWidthInches] = useLocalState("fabric_width", "60");

  const lengthFactors: Record<string, number> = {
    yard: 0.9144,
    meter: 1,
    inch: 0.0254,
    cm: 0.01
  };

  const len = parseFloat(lengthVal) || 0;
  const meters = len * lengthFactors[unit];
  const yards = meters / 0.9144;
  const inches = meters / 0.0254;
  const cm = meters * 100;

  const pr = parseFloat(price) || 0;
  const totalCost = len * pr;

  const wIn = parseFloat(widthInches) || 0;
  const widthMeters = wIn * 0.0254;
  const areaSqm = meters * widthMeters;

  return (
    <div id="fabric-length-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยผ้าและคำนวณความยาว (หลา-เมตร)" : "Fabric Length & Width Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "เครื่องแปลงหน่วยความยาวผ้า หลา เมตร นิ้ว เซนติเมตร พร้อมคำนวณราคาและพื้นที่ผ้าจริง" : "Convert fabric lengths between Yards, Meters, Inches, and Centimeters, and estimate total cost."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ความยาวผ้า" : "Length"}</label>
          <input type="number" value={lengthVal} onChange={(e) => setLengthVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "หน่วยความยาว" : "Length Unit"}</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
            <option value="yard">{lang === "TH" ? "หลา (Yard)" : "Yards"}</option>
            <option value="meter">{lang === "TH" ? "เมตร (Meter)" : "Meters"}</option>
            <option value="inch">{lang === "TH" ? "นิ้ว (Inch)" : "Inches"}</option>
            <option value="cm">{lang === "TH" ? "เซนติเมตร (cm)" : "Centimeters"}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ราคาต่อหน่วย (บาท)" : "Price per Unit (฿)"}</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "หน้ากว้างผ้า (นิ้ว)" : "Fabric Width (inches)"}</label>
          <input type="number" value={widthInches} onChange={(e) => setWidthInches(e.target.value)} className={inputClass} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "รายละเอียดผ้าและค่าใช้จ่าย" : "Fabric Specifications"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "หลา (Yards)" : "Yards"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{yards.toFixed(3)} Yd</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "เมตร (Meters)" : "Meters"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{meters.toFixed(3)} M</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "พื้นที่ผ้าจริง" : "Fabric Area"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{areaSqm.toFixed(3)} ตร.ม.</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "นิ้ว / เซนติเมตร" : "Inches / cm"}</p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">{inches.toFixed(1)} นิ้ว / {cm.toFixed(1)} ซม.</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 col-span-2 md:col-span-1">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ราคารวมทั้งหมด" : "Total Price"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">฿{totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="fabric-length-converter-calc" fileName="fabric-length-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คู่มือความรู้เกี่ยวกับการซื้อผ้าและคำนวณหลาผ้า" : "Fabric Measurement FAQ"}>
        <FAQItem
          q="1 หลา เท่ากับกี่เมตร และกี่เซนติเมตร?"
          a="1 หลา (Yard) มีความยาวเท่ากับ 36 นิ้ว หรือเท่ากับ 0.9144 เมตร (91.44 เซนติเมตร) ซึ่งเป็นหน่วยความยาวแบบอังกฤษที่ร้านขายผ้าในไทยนิยมใช้อย่างยาวนาน สำหรับสูตรแปลงกลับแบบรวดเร็วคือ 1 เมตร จะมีค่าเท่ากับประมาณ 1.09 หลา (หรือจำง่ายๆ ว่า เมตรยาวกว่าหลาประมาณ 9% หรือเกือบ 10 เซนติเมตร)"
        />
        <FAQItem
          q="ทำไมร้านขายผ้าในประเทศไทยถึงนิยมคิดราคาเป็น 'หลา' มากกว่า 'เมตร'?"
          a="เป็นความนิยมทางประวัติศาสตร์และวัฒนธรรมการค้าดั้งเดิมที่รับมาจากประเทศอังกฤษในอดีต ช่างตัดเสื้อและร้านผ้าคุ้นเคยกับการวัดความยาวด้วยไม้หลา (Yardstick) แม้ว่าปัจจุบันประเทศไทยจะใช้ระบบเมตริกเป็นมาตรฐานหลัก แต่ร้านผ้าพาหุรัดและร้านตัดสูททั่วไปก็ยังคงใช้หน่วย 'หลา' ในการเสนอราคาขายและการตัดเย็บเป็นส่วนใหญ่"
        />
        <FAQItem
          q="หน้ากว้างของผ้า (Fabric Width) ที่ระบุว่า 45 นิ้ว หรือ 60 นิ้ว ส่งผลต่อพื้นที่ใช้งานอย่างไร?"
          a="หน้ากว้างของผ้าคือระยะจากขอบผ้าฝั่งหนึ่งไปอีกฝั่งหนึ่ง โดยปกติผ้าจะขายตามความยาว (หลา) แต่หน้ากว้างอาจมีขนาดต่างกัน เช่น ผ้าหน้ากว้าง 45 นิ้ว (1.14 เมตร) และผ้าหน้ากว้าง 60 นิ้ว (1.52 เมตร) ผ้าที่มีหน้ากว้าง 60 นิ้วจะให้เนื้อผ้าสำหรับตัดเย็บมากกว่าผ้าหน้า 45 นิ้วในความยาว 1 หลาเท่ากันประมาณ 33% ดังนั้น ช่างจึงต้องพิจารณาหน้ากว้างควบคู่กับความยาวเสมอ"
        />
        <FAQItem
          q="วิธีการคำนวณหาพื้นที่ของผ้าเป็นตารางเมตร (Square Meters) เพื่อประเมินการใช้งานทำอย่างไร?"
          a="สูตรการคำนวณคือ: พื้นที่ (ตร.ม.) = ความยาว (เมตร) x หน้ากว้าง (เมตร) หากยาวเป็นหลาและหน้ากว้างเป็นนิ้ว ให้ทำการแปลงก่อน: ความยาวหลา x 0.9144 จะได้ความยาวเป็นเมตร และหน้ากว้างนิ้ว x 0.0254 จะได้ความกว้างเป็นเมตร จากนั้นนำตัวเลขทั้งสองมาคูณกัน จะได้พื้นที่ผ้าจริงที่ใช้ในการตัดเย็บ"
        />
        <FAQItem
          q="ในการตัดเสื้อเชิ้ตแขนยาวและกางเกงขายาวของผู้ใหญ่ทั่วไป ต้องใช้ผ้ากี่หลา?"
          a="ขึ้นอยู่กับขนาดตัวและหน้ากว้างของผ้า: โดยปกติสำหรับคนขนาดตัวมาตรฐาน (ไซส์ M-L) 1) เสื้อเชิ้ตแขนยาว ถ้าใช้ผ้าหน้ากว้าง 45 นิ้ว ต้องใช้ประมาณ 2-2.5 หลา แต่ถ้าผ้าหน้ากว้าง 60 นิ้ว จะใช้ประมาณ 1.5-1.75 หลา 2) กางเกงขายาวทรงตรง ถ้าใช้ผ้าหน้ากว้าง 60 นิ้ว จะใช้ประมาณ 1.25-1.5 หลา ควรปรึกษาช่างตัดเย็บเพื่อประเมินความต้องการผ้าก่อนซื้อจริง"
        />
      </SEOFAQ>
    </div>
  );
}

// 10. Yarn Count Converter
export function YarnCountConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("yarn_val", "150");
  const [sys, setSys] = useLocalState("yarn_sys", "denier");

  const v = parseFloat(val) || 0;
  let tex = 0;

  if (v > 0) {
    if (sys === "denier") tex = v / 9;
    else if (sys === "tex") tex = v;
    else if (sys === "dtex") tex = v / 10;
    else if (sys === "ne") tex = 590.54 / v;
    else if (sys === "nm") tex = 1000 / v;
  }

  const denier = tex * 9;
  const dtex = tex * 10;
  const ne = tex > 0 ? 590.54 / tex : 0;
  const nm = tex > 0 ? 1000 / tex : 0;

  return (
    <div id="yarn-count-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยความละเอียดเส้นด้าย (Yarn Count)" : "Yarn Count Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "โปรแกรมแปลงเบอร์เส้นด้ายสากลระบบ Denier, Tex, dtex, Ne, Nm อำนวยความสะดวกสำหรับโรงงานสิ่งทอ" : "Convert between direct (Denier, Tex, dtex) and indirect (Ne, Nm) yarn numbering systems."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาด/เบอร์เส้นด้าย" : "Yarn Count Value"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ระบบหน่วย" : "Yarn System"}</label>
          <select value={sys} onChange={(e) => setSys(e.target.value)} className={inputClass}>
            <option value="denier">Denier (D)</option>
            <option value="tex">Tex</option>
            <option value="dtex">Decitex (dtex)</option>
            <option value="ne">Ne (English Cotton Count)</option>
            <option value="nm">Nm (Metric Count)</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ตารางเปรียบเทียบทุกระบบ" : "Converted Yarn Specifications"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Denier (D)</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{denier.toFixed(2)} D</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Tex</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{tex.toFixed(2)} Tex</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Decitex (dtex)</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{dtex.toFixed(2)} dtex</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Ne (Cotton)</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{ne > 0 ? ne.toFixed(2) : "0.00"} Ne</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Nm (Metric)</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{nm > 0 ? nm.toFixed(2) : "0.00"} Nm</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="yarn-count-converter-calc" fileName="yarn-count-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "ความรู้เรื่องเบอร์เส้นด้ายและอุตสาหกรรมสิ่งทอ" : "Yarn Count FAQ"}>
        <FAQItem
          q="ระบบการวัดขนาดเส้นด้ายแบบทางตรง (Direct System) และทางอ้อม (Indirect System) แตกต่างกันอย่างไร?"
          a="ระบบทางตรง (เช่น Denier, Tex, dtex) วัดน้ำหนักต่อความยาวคงที่ ยิ่งตัวเลขสูงแปลว่าเส้นด้ายยิ่งหนาหรือใหญ่ขึ้น ระบบนี้นิยมใช้กับเส้นใยสังเคราะห์ เช่น ไนลอน โพลีเอสเตอร์ ส่วนระบบทางอ้อม (เช่น Ne, Nm) วัดความยาวต่อน้ำหนักคงที่ ยิ่งตัวเลขสูงแปลว่าเส้นด้ายยิ่งเล็กและละเอียดขึ้น นิยมใช้กับเส้นใยธรรมชาติ เช่น ฝ้าย (Cotton) และขนสัตว์"
        />
        <FAQItem
          q="หน่วย ดีเนียร์ (Denier) คืออะไร และนิยมใช้กับผลิตภัณฑ์ประเภทใดบ้าง?"
          a="ดีเนียร์ (สัญลักษณ์: D) คือน้ำหนักของเส้นด้ายเป็นกรัมต่อความยาว 9,000 เมตร ตัวอย่างเช่น เส้นด้ายหนา 75D หมายความว่าด้ายยาว 9,000 เมตรหนัก 75 กรัม หน่วยนี้ได้รับการยอมรับอย่างสูงในอุตสาหกรรมถุงน่อง เสื้อผ้ากีฬา ร่ม กระเป๋าเป้ และผ้าใบกันน้ำ โดยถุงน่องที่บางมากๆ จะมีตัวเลขดีเนียร์ต่ำ (เช่น 10D-20D) ขณะที่เป้สะพายหลังที่หนาทนทานจะใช้ผ้าขนาด 600D-1000D"
        />
        <FAQItem
          q="หน่วย เท็กซ์ (Tex) และดีเท็กซ์ (dtex) มีความสัมพันธ์กับดีเนียร์อย่างไร?"
          a="เท็กซ์ (Tex) คือน้ำหนักเป็นกรัมต่อความยาว 1,000 เมตร และดีเท็กซ์ (dtex) คือน้ำหนักต่อความยาว 10,000 เมตร ความสัมพันธ์เชิงสูตรคือ: 1 เท็กซ์ = 9 ดีเนียร์ (Tex = Denier / 9) และ 1 ดีเท็กซ์ = 0.9 ดีเนียร์ (dtex = Denier / 10 * 9) หน่วย Tex เป็นหน่วยสากล ISO ที่ใช้ในการวัดขนาดด้ายเย็บผ้าทุกประเภทในปัจจุบัน"
        />
        <FAQItem
          q="หน่วยเบอร์ฝ้าย Ne (English Cotton Count) หมายถึงอะไร และแปลงเป็นน้ำหนักได้อย่างไร?"
          a="Ne เป็นหน่วยวัดทางอ้อมที่ระบุว่า มีด้ายยาว 840 หลา กี่ม้วน (Hanks) ในน้ำหนัก 1 ปอนด์ เช่น ด้ายเบอร์ 20 (Ne 20) หมายความว่าด้ายยาว 840 x 20 หลา หนัก 1 ปอนด์ ด้าย Ne 32 หรือ Ne 40 จะมีความบางและละเอียดกว่า Ne 20 อัตราแปลงเป็นระบบ Tex คือ Tex = 590.54 / Ne"
        />
        <FAQItem
          q="ทำไมด้ายเย็บผ้าคุณภาพดีถึงต้องระบุตัวเลขเบอร์เส้นด้ายแบบซ้อน เช่น Ne 40/2 หรือ 50/3?"
          a="ตัวเลขซ้อนนี้บอกทั้งความหนาของเส้นด้ายย่อยและจำนวนเส้นที่นำมาตีเกลียวรวมกัน (Ply) เช่น 'Ne 40/2' หมายถึง การใช้ด้ายเดี่ยวเบอร์ Ne 40 จำนวน 2 เส้นมาปั่นเกลียวรวมกันเป็นเส้นเดียว ซึ่งจะมีความแข็งแรงทนทานกว่าด้ายเดี่ยวและทนต่อแรงตึงของจักรเย็บผ้าอุตสาหกรรมความเร็วสูงได้ดีกว่า"
        />
      </SEOFAQ>
    </div>
  );
}

// 11. Fuel Volume Converter
export function FuelVolumeConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("fuel_val", "1");
  const [unit, setUnit] = useLocalState("fuel_unit", "liter");
  const [fcVal, setFcVal] = useLocalState("fuel_fc_val", "8.0");

  const factors: Record<string, number> = {
    liter: 1,
    us_gal: 3.785411784,
    uk_gal: 4.54609,
    barrel: 158.9872949,
    cum: 1000
  };

  const v = parseFloat(val) || 0;
  const baseLiters = v * factors[unit];

  const liters = baseLiters;
  const us_gal = baseLiters / factors.us_gal;
  const uk_gal = baseLiters / factors.uk_gal;
  const barrel = baseLiters / factors.barrel;
  const cum = baseLiters / factors.cum;

  const fc = parseFloat(fcVal) || 0;
  const kmL = fc > 0 ? 100 / fc : 0;
  const mpgUS = fc > 0 ? 235.214583 / fc : 0;
  const mpgUK = fc > 0 ? 282.480936 / fc : 0;

  return (
    <div id="fuel-volume-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยน้ำมันเชื้อเพลิงและอัตราสิ้นเปลือง" : "Fuel Volume & Consumption Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงหน่วยน้ำมัน ลิตร แกลลอน บาร์เรล และคำนวณอัตราสิ้นเปลืองเชื้อเพลิง km/L ↔ L/100km" : "Convert fuel volumes between Liters, Gallons, and Barrels, and convert fuel efficiency units."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "1. แปลงปริมาตรน้ำมันเชื้อเพลิง" : "1. Fuel Volume Conversion"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาตร" : "Volume"}</label>
              <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "หน่วยเริ่มต้น" : "Source Unit"}</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
                <option value="liter">{lang === "TH" ? "ลิตร (Liter)" : "Liters"}</option>
                <option value="us_gal">{lang === "TH" ? "แกลลอนสหรัฐ (US Gal)" : "US Gallons"}</option>
                <option value="uk_gal">{lang === "TH" ? "แกลลอนอังกฤษ (UK Gal)" : "UK Gallons"}</option>
                <option value="barrel">{lang === "TH" ? "บาร์เรลน้ำมันดิบ (bbl)" : "Oil Barrels"}</option>
                <option value="cum">{lang === "TH" ? "ลูกบาศก์เมตร (m³)" : "Cubic Meters"}</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "ลิตร" : "Liters"}</span>
              <span className="font-bold">{liters.toLocaleString(undefined, { maximumFractionDigits: 4 })} L</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "แกลลอน US" : "US Gallons"}</span>
              <span className="font-bold">{us_gal.toLocaleString(undefined, { maximumFractionDigits: 4 })} gal</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "แกลลอน UK" : "UK Gallons"}</span>
              <span className="font-bold">{uk_gal.toLocaleString(undefined, { maximumFractionDigits: 4 })} gal</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "บาร์เรลน้ำมันดิบ" : "Oil Barrels"}</span>
              <span className="font-bold">{barrel.toLocaleString(undefined, { maximumFractionDigits: 4 })} bbl</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "2. แปลงอัตราประหยัดน้ำมัน" : "2. Fuel Economy Converter"}</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "อัตราสิ้นเปลือง (ลิตรต่อ 100 กม.)" : "Fuel Consumption (L/100km)"}</label>
              <input type="number" step="0.1" value={fcVal} onChange={(e) => setFcVal(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
                <span>{lang === "TH" ? "กิโลเมตรต่อลิตร" : "Kilometers per Liter"}</span>
                <span className="font-bold text-deep-teal dark:text-soft-mint">{kmL.toFixed(2)} km/L</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
                <span>{lang === "TH" ? "ไมล์ต่อแกลลอน (US MPG)" : "US Miles per Gallon"}</span>
                <span className="font-bold text-deep-teal dark:text-soft-mint">{mpgUS.toFixed(2)} MPG</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
                <span>{lang === "TH" ? "ไมล์ต่อแกลลอน (UK MPG)" : "UK Miles per Gallon"}</span>
                <span className="font-bold text-deep-teal dark:text-soft-mint">{mpgUK.toFixed(2)} MPG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportResult elementId="fuel-volume-converter-calc" fileName="fuel-volume-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "ข้อมูลน่ารู้เกี่ยวกับปริมาตรน้ำมันเชื้อเพลิงและอัตราประหยัด" : "Fuel & Economy FAQ"}>
        <FAQItem
          q="แกลลอนของสหรัฐอเมริกา (US Gallon) และแกลลอนของอังกฤษ (UK Gallon) ต่างกันอย่างไร?"
          a="แม้จะมีชื่อว่าแกลลอนเหมือนกัน แต่ปริมาตรจริงแตกต่างกันเนื่องจากประวัติศาสตร์มาตราชั่งตวงวัดที่แยกจากกัน: 1 แกลลอนสหรัฐฯ (US Gallon) มีค่าเท่ากับประมาณ 3.785 ลิตร นิยมใช้ในทวีปอเมริกาเหนือ ส่วน 1 แกลลอนอังกฤษ (Imperial/UK Gallon) มีค่าเท่ากับประมาณ 4.546 ลิตร นิยมใช้ในอดีตกลุ่มเครือจักรภพ อังกฤษ และบางระบบอุตสาหกรรมในไทย"
        />
        <FAQItem
          q="1 บาร์เรลน้ำมัน (Oil Barrel) มีปริมาตรเท่ากับกี่ลิตร และกี่แกลลอน?"
          a="บาร์เรล (สัญลักษณ์: bbl) เป็นหน่วยวัดปริมาตรมาตรฐานในการซื้อขายน้ำมันดิบระดับโลก โดยกำหนดให้ 1 บาร์เรลน้ำมันดิบ มีปริมาตรเท่ากับ 42 แกลลอนสหรัฐฯ พอดี หรือเทียบเท่ากับประมาณ 158.987 ลิตร การกำหนดหน่วยนี้เกิดขึ้นในยุคตื่นทองดำช่วงคริสต์ศตวรรษที่ 19 ในสหรัฐอเมริกาเพื่อใช้ถังไม้มาตรฐานในการขนส่งน้ำมัน"
        />
        <FAQItem
          q="วิธีแปลงค่าประหยัดน้ำมันจาก กม.ต่อลิตร (km/L) เป็น ลิตรต่อ 100 กม. (L/100km) ทำอย่างไร?"
          a="เป็นสองมุมมองในการรายงานอัตราสิ้นเปลือง: กม.ต่อลิตร ยิ่งมากยิ่งประหยัด ส่วน ลิตรต่อ 100 กม. ยิ่งน้อยยิ่งประหยัด สูตรการแปลงคือ: L/100km = 100 / (km/L) ตัวอย่างเช่น รถยนต์วิ่งได้ 20 กม./ลิตร จะสิ้นเปลืองน้ำมันเท่ากับ 100 / 20 = 5 ลิตรต่อ 100 กิโลเมตร"
        />
        <FAQItem
          q="หน่วย MPG (Miles per Gallon) ที่ใช้ในรีวิวรถต่างประเทศแปลงเป็นระบบไทยอย่างไร?"
          a="MPG บอกระยะทางเป็นไมล์ต่อแกลลอนน้ำมัน มีสองระบบตามชนิดแกลลอน: 1) MPG (US) แปลงเป็นกิโลเมตรต่อลิตร (km/L) โดยการคูณด้วย 0.4251 2) MPG (UK) แปลงเป็นกิโลเมตรต่อลิตร (km/L) โดยการคูณด้วย 0.3540 ตัวอย่างเช่น รถยนต์สหรัฐฯ มีอัตราประหยัด 30 MPG (US) จะเท่ากับ 30 x 0.4251 = 12.75 กม./ลิตร"
        />
        <FAQItem
          q="ความจุถังน้ำมันของรถยนต์นั่งส่วนบุคคลทั่วไปมีขนาดกี่ลิตรและคิดเป็นกี่แกลลอน?"
          a="รถยนต์นั่งขนาดเล็ก (Eco Car/Sedan) ทั่วไปมักมีถังน้ำมันความจุประมาณ 35 ถึง 45 ลิตร (หรือประมาณ 9.2 ถึง 11.9 แกลลอน US) ส่วนรถยนต์อเนกประสงค์ขนาดใหญ่ รถกระบะ หรือ SUV จะมีขนาดถังน้ำมันใหญ่ขึ้นอยู่ที่ประมาณ 70 ถึง 80 ลิตร (หรือประมาณ 18.5 ถึง 21.1 แกลลอน US) เพื่อความสะดวกในการเดินทางไกล"
        />
      </SEOFAQ>
    </div>
  );
}

// 12. Paper Specs Converter
export function PaperSpecsConverter({ lang }: { lang: Lang }) {
  const [size, setSize] = useLocalState("paper_size", "a4");
  const [customW, setCustomW] = useLocalState("paper_custom_w", "210");
  const [customH, setCustomH] = useLocalState("paper_custom_h", "297");
  const [gsm, setGsm] = useLocalState("paper_gsm", "80");
  const [qty, setQty] = useLocalState("paper_qty", "500");

  const sizes: Record<string, { w: number; h: number; name: string }> = {
    a0: { w: 841, h: 1189, name: "A0" },
    a1: { w: 594, h: 841, name: "A1" },
    a2: { w: 420, h: 594, name: "A2" },
    a3: { w: 297, h: 420, name: "A3" },
    a4: { w: 210, h: 297, name: "A4" },
    a5: { w: 148, h: 210, name: "A5" },
    b4: { w: 250, h: 353, name: "B4" },
    b5: { w: 176, h: 250, name: "B5" },
    letter: { w: 215.9, h: 279.4, name: "Letter (US)" },
    legal: { w: 215.9, h: 355.6, name: "Legal (US)" },
    custom: { w: 0, h: 0, name: "Custom (กำหนดเอง)" }
  };

  const isCustom = size === "custom";
  const w = isCustom ? parseFloat(customW) || 0 : sizes[size].w;
  const h = isCustom ? parseFloat(customH) || 0 : sizes[size].h;

  const areaSqm = (w / 1000) * (h / 1000);
  const g = parseFloat(gsm) || 0;
  const q = parseFloat(qty) || 0;
  const sheetWeightG = areaSqm * g;
  const totalWeightKg = (sheetWeightG * q) / 1000;

  return (
    <div id="paper-specs-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงขนาดกระดาษและคำนวณน้ำหนัก (GSM → kg)" : "Paper Size & Weight Calculator"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงขนาดกระดาษซีรีส์ A, B และคำนวณน้ำหนักกระดาษรวมต่อรีมเพื่อจัดส่งหรือพิมพ์งาน" : "Convert standard paper sizes and calculate batch weight based on GSM and sheet count."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดกระดาษ" : "Paper Size"}</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={inputClass}>
            {Object.entries(sizes).map(([key, s]) => (
              <option key={key} value={key}>{s.name}</option>
            ))}
          </select>
        </div>
        {isCustom && (
          <>
            <div>
              <label className={labelClass}>{lang === "TH" ? "กว้าง (มม.)" : "Width (mm)"}</label>
              <input type="number" value={customW} onChange={(e) => setCustomW(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "สูง (มม.)" : "Height (mm)"}</label>
              <input type="number" value={customH} onChange={(e) => setCustomH(e.target.value)} className={inputClass} />
            </div>
          </>
        )}
        <div className={isCustom ? "" : "md:col-span-2"}>
          <label className={labelClass}>{lang === "TH" ? "น้ำหนักกระดาษ (GSM)" : "Paper Weight (GSM)"}</label>
          <input type="number" value={gsm} onChange={(e) => setGsm(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนแผ่น" : "Quantity (Sheets)"}</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className={inputClass} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ข้อมูลและน้ำหนักกระดาษ" : "Paper Specifications"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ขนาดเป็นมิลลิเมตร" : "Size in mm"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{w.toFixed(1)} x {h.toFixed(1)} mm</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ขนาดเป็นนิ้ว" : "Size in inches"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{(w / 25.4).toFixed(2)} x {(h / 25.4).toFixed(2)} in</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "น้ำหนักต่อแผ่น" : "Single Sheet Weight"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{sheetWeightG.toFixed(2)} g</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "น้ำหนักรวมทั้งหมด" : "Total Batch Weight"}</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{totalWeightKg.toFixed(3)} kg</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="paper-specs-converter-calc" fileName="paper-specs-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "เกร็ดความรู้ขนาดกระดาษและน้ำหนักมาตรฐานสิ่งพิมพ์" : "Paper Specifications FAQ"}>
        <FAQItem
          q="มาตรฐานขนาดกระดาษซีรีส์ A (เช่น A4, A3) มีหลักเกณฑ์การออกแบบอย่างไร?"
          a="มาตรฐานกระดาษซีรีส์ A (ISO 216) ถูกออกแบบให้มีอัตราส่วนความกว้างต่อความยาวคงที่เสมอคือ 1 ต่อ รูทสอง (ประมาณ 1.4142) ข้อดีคือเมื่อพับครึ่งตามความยาว จะได้ขนาดถัดไปที่มีอัตราส่วนเดิมพอดี โดยเริ่มต้นจากกระดาษ A0 ซึ่งมีพื้นที่ตรง 1 ตารางเมตร เมื่อพับครึ่งจะได้ A1, พับครึ่งอีกได้ A2, A3, และ A4 ตามลำดับ การรักษาอัตราส่วนนี้ทำให้การย่อหรือขยายรูปภาพไม่เกิดการบิดเบี้ยว"
        />
        <FAQItem
          q="ความแตกต่างระหว่างขนาดกระดาษ A4 ของระบบสากล และขนาดกระดาษ Letter ของอเมริกาคืออะไร?"
          a="กระดาษ A4 เป็นมาตรฐานโลก มีขนาดกว้าง 210 มิลลิเมตร ยาว 297 มิลลิเมตร (8.27 x 11.69 นิ้ว) ขณะที่กระดาษ Letter (จดหมาย) เป็นมาตรฐานดั้งเดิมในอเมริกาเหนือ มีขนาดกว้าง 8.5 นิ้ว (215.9 มิลลิเมตร) ยาว 11 นิ้ว (279.4 มิลลิเมตร) ซึ่งสั้นกว่าแต่กว้างกว่า A4 เล็กน้อย การตั้งค่าเครื่องพิมพ์ผิดขนาดอาจทำให้หน้าเอกสารโดนตัดขอบได้"
        />
        <FAQItem
          q="หน่วยแกรม (GSM) บนห่อกระดาษหมายถึงอะไร และบอกความหนาได้อย่างไร?"
          a="GSM ย่อมาจาก Grams per Square Meter หมายถึง น้ำหนักของกระดาษเป็นกรัมต่อพื้นที่ 1 ตารางเมตร เช่น กระดาษ 80 GSM หมายความว่าถ้าตัดกระดาษแผ่นใหญ่ขนาด 1 ตารางเมตรมาหนึ่งแผ่น แผ่นนั้นจะหนัก 80 กรัม กระดาษที่มี GSM สูงขึ้นจะมีความหนา แข็ง และทึบแสงมากขึ้น โดยทั่วไปงานพิมพ์เอกสารใช้ 70-80 GSM ส่วนหน้าปกหรือการ์ดอวยพรใช้ 120-250 GSM ขึ้นไป"
        />
        <FAQItem
          q="วิธีการคำนวณน้ำหนักรวมของกระดาษ 1 รีม (500 แผ่น) สำหรับการขนส่งทำอย่างไร?"
          a="สูตรการคำนวณน้ำหนักคือ: น้ำหนักรวม (กรัม) = กว้าง (เมตร) x ยาว (เมตร) x GSM x จำนวนแผ่น ตัวอย่างเช่น กระดาษ A4 (0.21 x 0.297 เมตร) ความหนา 80 GSM จำนวน 1 รีม (500 แผ่น) จะมีน้ำหนักเท่ากับ 0.21 x 0.297 x 80 x 500 = 2,494.8 กรัม หรือประมาณ 2.5 กิโลกรัม (ไม่รวมบรรจุภัณฑ์)"
        />
        <FAQItem
          q="กระดาษซีรีส์ B (เช่น B4, B5) มีความต่างและนิยมใช้งานในด้านใดบ้าง?"
          a="กระดาษซีรีส์ B เป็นขนาดกึ่งกลางระหว่างซีรีส์ A โดยหาจากค่าเฉลี่ยทางเรขาคณิต เช่น B1 อยู่ระหว่าง A0 และ A1 มีขนาดใหญ่กว่าซีรีส์ A เสมอ นิยมใช้มากในอุตสาหกรรมการพิมพ์หนังสือ โปสเตอร์ และพาสปอร์ต เนื่องจากขนาดของเพลทพิมพ์และเครื่องตัดกระดาษถูกออกแบบมาให้พอดีกับกระดาษตระกูล B เพื่อตัดขอบทิ้งให้เป็นเล่มซีรีส์ A ได้โดยไม่เสียเศษกระดาษ"
        />
      </SEOFAQ>
    </div>
  );
}

// 13. Wine Volume Converter
export function WineVolumeConverter({ lang }: { lang: Lang }) {
  const [size, setSize] = useLocalState("wine_size", "standard");
  const [qty, setQty] = useLocalState("wine_qty", "1");
  const [abv, setAbv] = useLocalState("wine_abv", "13.5");
  const [glassSize, setGlassSize] = useLocalState("wine_glass_size", "150");

  const sizes: Record<string, { val: number; name: string }> = {
    split: { val: 187.5, name: "Split / Piccolo (187.5 ml)" },
    half: { val: 375, name: "Half / Demi (375 ml)" },
    standard: { val: 750, name: "Standard (750 ml)" },
    magnum: { val: 1500, name: "Magnum (1.5 L)" },
    double_magnum: { val: 3000, name: "Double Magnum (3 L)" },
    jeroboam: { val: 4500, name: "Jeroboam (4.5 L)" },
    methuselah: { val: 6000, name: "Methuselah (6 L)" },
    salmanazar: { val: 9000, name: "Salmanazar (9 L)" },
    balthazar: { val: 12000, name: "Balthazar (12 L)" },
    nebuchadnezzar: { val: 15000, name: "Nebuchadnezzar (15 L)" }
  };

  const q = parseFloat(qty) || 0;
  const singleVol = sizes[size].val;
  const totalVolMl = singleVol * q;
  const totalVolL = totalVolMl / 1000;
  const totalOz = totalVolMl / 29.5735;

  const gSize = parseFloat(glassSize) || 150;
  const glasses = gSize > 0 ? totalVolMl / gSize : 0;

  const aPct = parseFloat(abv) || 0;
  const pureAlcoholMl = totalVolMl * (aPct / 100);
  const pureAlcoholG = pureAlcoholMl * 0.789;
  const units = (totalVolMl * aPct) / 1000;

  return (
    <div id="wine-volume-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "คำนวณปริมาตรขวดไวน์และปริมาณแอลกอฮอล์" : "Wine Bottle Volume & Alcohol Unit Calculator"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงขนาดขวดไวน์ต่างๆ (Piccolo ถึง Nebuchadnezzar) คิดจำนวนแก้ว และคำนวณยูนิตแอลกอฮอล์" : "Convert various wine bottle sizes, estimate standard pours, and calculate pure alcohol units."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดขวดไวน์" : "Bottle Size"}</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={inputClass}>
            {Object.entries(sizes).map(([key, s]) => (
              <option key={key} value={key}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนขวด" : "Quantity"}</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ปริมาณแอลกอฮอล์ (ABV %)" : "Alcohol (ABV %)"}</label>
          <input type="number" step="0.1" value={abv} onChange={(e) => setAbv(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดแก้วริน (มิลลิลิตร)" : "Glass Size (ml)"}</label>
          <input type="number" value={glassSize} onChange={(e) => setGlassSize(e.target.value)} className={inputClass} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ข้อมูลปริมาตรและแอลกอฮอล์รวม" : "Wine Analysis Summary"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ปริมาตรรวม" : "Total Volume"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{totalVolMl.toLocaleString()} ml</p>
            <p className="text-xs text-gray-400">({totalVolL.toFixed(2)} L)</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "จำนวนแก้วที่รินได้" : "Estimated Pours"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{glasses.toFixed(1)} แก้ว</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "น้ำหนักแอลกอฮอล์สุทธิ" : "Pure Alcohol (g)"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{pureAlcoholG.toFixed(1)} กรัม</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ยูนิตแอลกอฮอล์" : "Alcohol Units"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{units.toFixed(2)} Units</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 col-span-2 md:col-span-1">
            <p className="text-gray-500 text-xs">{lang === "TH" ? "ออนซ์ของเหลว" : "Fluid Ounces"}</p>
            <p className="text-lg font-black text-deep-teal dark:text-soft-mint mt-1">{totalOz.toFixed(1)} fl oz</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="wine-volume-converter-calc" fileName="wine-volume-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "เรื่องน่ารู้เกี่ยวกับปริมาตรขวดไวน์และการรินเสิร์ฟ" : "Wine Bottle & Units FAQ"}>
        <FAQItem
          q="ทำไมขวดไวน์มาตรฐานถึงต้องมีขนาด 750 มิลลิลิตร แทนที่จะเป็น 1 ลิตร?"
          a="มีหลายทฤษฎีในอดีต: หนึ่งในนั้นคือความจุของปอดคนเป่าแก้วขวดแก้วในอดีตสามารถเป่าขวดได้ขนาดเฉลี่ย 700-800 มล. ต่อหนึ่งลมหายใจ และต่อมาในคริสต์ศตวรรษที่ 19 อังกฤษนำเข้าไวน์จากฝรั่งเศสโดยใช้ถังโอ๊คขนาด 225 ลิตร (Barrique) ซึ่งการแบ่งใส่ขวดขนาด 750 มล. จะได้จำนวน 300 ขวดพอดี สะดวกต่อการขนส่งและการนับคะแนนของพ่อค้าฝรั่งเศสและอังกฤษ"
        />
        <FAQItem
          q="ขวดไวน์ขนาดใหญ่ เช่น แม็กนัม (Magnum) และเจโรโบม (Jeroboam) มีขนาดเท่ากับกี่ขวดปกติ?"
          a="ขวดแม็กนัม (Magnum) มีขนาดเท่ากับ 1.5 ลิตร (เทียบเท่ากับ 2 ขวดมาตรฐาน) นิยมใช้ในงานเลี้ยงและเหมาะสำหรับการบ่มไวน์ระยะยาว ส่วนขวดเจโรโบม (Jeroboam) สำหรับไวน์แดงทั่วไปจะมีขนาด 5 ลิตร (ประมาณ 6.7 ขวดมาตรฐาน) แต่ถ้าเป็นแชมเปญหรือสปาร์กลิ้งไวน์ เจโรโบมจะถูกกำหนดขนาดที่ 3 ลิตร (4 ขวดมาตรฐาน)"
        />
        <FAQItem
          q="ไวน์ 1 ขวดมาตรฐาน 750 มิลลิลิตร สามารถรินได้กี่แก้วมาตรฐาน?"
          a="แก้วไวน์มาตรฐาน (Standard Pour) ในร้านอาหารและผับทั่วไปจะรินอยู่ที่ประมาณ 150 มิลลิลิตรต่อแก้ว ดังนั้น ไวน์ 1 ขวดมาตรฐาน (750 มล.) จะรินได้ประมาณ 5 แก้วพอดี หากเป็นงานปาร์ตี้ชิมไวน์ (Wine Tasting) ที่ต้องการปริมาณน้อยกว่าเพื่อลิ้มลองรสชาติ มักจะรินแก้วละ 75 มิลลิลิตร ซึ่งจะรินได้ถึง 10 แก้วต่อขวด"
        />
        <FAQItem
          q="ยูนิตแอลกอฮอล์ (Alcohol Units) ในไวน์ 1 ขวดคำนวณอย่างไร?"
          a="ยูนิตแอลกอฮอล์คำนวณจากสูตร: ปริมาตร (มล.) x ABV (%) / 1,000 เช่น ไวน์ 750 มล. ที่มีแอลกอฮอล์ 13.5% จะมีหน่วยแอลกอฮอล์เท่ากับ 750 x 13.5 / 1,000 = 10.125 ยูนิต ซึ่งมีประโยชน์มากในการช่วยควบคุมการดื่มแอลกอฮอล์ให้อยู่ในเกณฑ์ที่ปลอดภัยต่อสุขภาพ"
        />
        <FAQItem
          q="ชื่อขวดไวน์ขนาดใหญ่พิเศษ เช่น เมธูเซลาห์ และเนบูคัดเนสซาร์ มีที่มาจากไหน?"
          a="วงการไวน์ฝรั่งเศสโบราณได้นำชื่อกษัตริย์และบุคคลสำคัญในคัมภีร์ไบเบิลมาตั้งเป็นชื่อขวดขนาดใหญ่ เช่น 'เมธูเซลาห์' (Methuselah - ขนาด 6 ลิตร หรือ 8 ขวด) ตามชื่อชายที่มีอายุยืนที่สุดในตำนานไบเบิล และ 'เนบูคัดเนสซาร์' (Nebuchadnezzar - ขนาด 15 ลิตร หรือ 20 ขวด) ตามชื่อกษัตริย์ผู้ยิ่งใหญ่แห่งบาบิโลน"
        />
      </SEOFAQ>
    </div>
  );
}

// 14. Beverage Unit Converter
export function BeverageUnitConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("bev_val", "12");
  const [unit, setUnit] = useLocalState("bev_unit", "us_oz");

  const [partA, setPartA] = useLocalState("bev_part_a", "1");
  const [partB, setPartB] = useLocalState("bev_part_b", "2");

  const ozFactors: Record<string, number> = {
    us_oz: 29.5735,
    uk_oz: 28.4131,
    ml: 1,
    cl: 10,
    cup: 240,
    pint_us: 473.176,
    pint_uk: 568.261
  };

  const v = parseFloat(val) || 0;
  const baseMl = v * ozFactors[unit];

  const us_oz = baseMl / ozFactors.us_oz;
  const uk_oz = baseMl / ozFactors.uk_oz;
  const ml = baseMl;
  const cl = baseMl / 10;
  const cup = baseMl / 240;

  const pA = parseFloat(partA) || 0;
  const pB = parseFloat(partB) || 0;
  const totalParts = pA + pB;
  const volA = totalParts > 0 ? (pA / totalParts) * baseMl : 0;
  const volB = totalParts > 0 ? (pB / totalParts) * baseMl : 0;

  return (
    <div id="beverage-unit-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยเครื่องดื่มและอัตราส่วนผสม (ออนซ์-มิลลิลิตร)" : "Beverage Volume & Recipe Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "แปลงหน่วยออนซ์ของเหลว (fl oz) สหรัฐฯ/อังกฤษ เป็นมิลลิลิตร ถ้วย และสัดส่วนผสมค็อกเทล/กาแฟ" : "Convert beverage sizes between US/UK Fluid Ounces, ml, cl, and calculate custom recipe parts."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "1. แปลงปริมาตรเครื่องดื่ม" : "1. Volume Conversion"}</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ปริมาตร" : "Volume"}</label>
              <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "หน่วยเริ่มต้น" : "Source Unit"}</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
                <option value="us_oz">US fl oz (ออนซ์ของเหลวสหรัฐ)</option>
                <option value="uk_oz">UK fl oz (ออนซ์ของเหลวอังกฤษ)</option>
                <option value="ml">มิลลิลิตร (ml)</option>
                <option value="cl">เซนติลิตร (cl)</option>
                <option value="cup">ถ้วยตวง (cup)</option>
                <option value="pint_us">US Pint</option>
                <option value="pint_uk">UK Pint</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "มิลลิลิตร (ml)" : "Milliliters (ml)"}</span>
              <span className="font-bold">{ml.toFixed(1)} ml</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "ออนซ์ของเหลวสหรัฐ (US fl oz)" : "US fl oz"}</span>
              <span className="font-bold">{us_oz.toFixed(2)} fl oz</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "ออนซ์ของเหลวอังกฤษ (UK fl oz)" : "UK fl oz"}</span>
              <span className="font-bold">{uk_oz.toFixed(2)} fl oz</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-white/5">
              <span>{lang === "TH" ? "ถ้วยตวง (Cups)" : "Cups"}</span>
              <span className="font-bold">{cup.toFixed(2)} cups</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{lang === "TH" ? "2. คำนวณสัดส่วนผสมตามปริมาตรรวม" : "2. Recipe Parts Allocator"}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>{lang === "TH" ? "สัดส่วน A" : "Part A Ratio"}</label>
                <input type="number" value={partA} onChange={(e) => setPartA(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "สัดส่วน B" : "Part B Ratio"}</label>
                <input type="number" value={partB} onChange={(e) => setPartB(e.target.value)} className={inputClass} />
              </div>
            </div>
            {totalParts > 0 && (
              <div className="p-4 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{lang === "TH" ? "ปริมาณ ส่วนผสม A" : "Volume A"}</span>
                  <span className="font-bold text-deep-teal dark:text-soft-mint">{volA.toFixed(1)} ml ({ (volA / ozFactors[unit]).toFixed(1) } {unit})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{lang === "TH" ? "ปริมาณ ส่วนผสม B" : "Volume B"}</span>
                  <span className="font-bold text-deep-teal dark:text-soft-mint">{volB.toFixed(1)} ml ({ (volB / ozFactors[unit]).toFixed(1) } {unit})</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ExportResult elementId="beverage-unit-converter-calc" fileName="beverage-unit-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "เกร็ดความรู้เรื่องออนซ์ของเหลวและมาตรวัดเครื่องดื่ม" : "Beverage Units FAQ"}>
        <FAQItem
          q="ออนซ์ของเหลวสหรัฐฯ (US fl oz) และออนซ์ของเหลวอังกฤษ (UK fl oz) ต่างกันอย่างไร?"
          a="เป็นหน่วยวัดปริมาตรของเหลวที่ต่างกันเล็กน้อยตามระบบดั้งเดิม: 1 ออนซ์ของเหลวสหรัฐฯ (US fl oz) เท่ากับประมาณ 29.57 มิลลิลิตร ส่วน 1 ออนซ์ของเหลวอังกฤษ (Imperial/UK fl oz) เท่ากับประมาณ 28.41 มิลลิลิตร แม้ความต่างจะน้อยเพียง 1.16 มิลลิลิตรต่อออนซ์ แต่หากชงกาแฟหรือค็อกเทลแก้วใหญ่ ความคลาดเคลื่อนสะสมนี้อาจส่งผลต่อความสมดุลของสูตรเครื่องดื่มได้"
        />
        <FAQItem
          q="แก้วกาแฟขนาด 12 ออนซ์ และ 16 ออนซ์ ในร้านกาแฟมีปริมาตรกี่มิลลิลิตร?"
          a="ร้านกาแฟส่วนใหญ่ในไทยและแบรนด์ดังระดับโลก อ้างอิงขนาดแก้วตามหน่วยออนซ์สหรัฐฯ: แก้วขนาด 8 ออนซ์ (Short) มีปริมาตรประมาณ 236 มิลลิลิตร, แก้วขนาด 12 ออนซ์ (Tall) มีปริมาตรประมาณ 355 มิลลิลิตร, แก้วขนาด 16 ออนซ์ (Grande) มีปริมาตรประมาณ 473 มิลลิลิตร, และแก้วขนาด 20 ออนซ์ (Venti) มีปริมาตรประมาณ 591 มิลลิลิตร"
        />
        <FAQItem
          q="ช็อตเอสเปรสโซมาตรฐาน (Double Shot) มีปริมาตรเท่าใดในหน่วยออนซ์และมิลลิลิตร?"
          a="ในวงการบาริสต้าสากล ดับเบิ้ลช็อตเอสเปรสโซ (Double Shot) ที่สกัดออกมาจะมีปริมาตรรวมของเหลว (Yield) อยู่ที่ประมาณ 36 ถึง 40 กรัม หรือคิดเป็นปริมาตรประมาณ 1.2 ถึง 1.5 ออนซ์ของเหลว (ประมาณ 35 ถึง 45 มิลลิลิตร) ขึ้นอยู่กับความหนาและฟองครีมมา (Crema) ของกาแฟตัวนั้นๆ"
        />
        <FAQItem
          q="ถ้วยตวงเบเกอรี่ (Cup) และถ้วยตวงกาแฟมีปริมาตรเท่ากันหรือไม่?"
          a="ไม่เท่ากันและมักสับสนได้ง่าย: ถ้วยตวงเบเกอรี่ระบบเมตริกมีขนาด 240 มิลลิลิตร (ระบบสหรัฐฯ 236.6 มล.) ส่วน 'ถ้วยตวง' ในหม้อต้มกาแฟดริปหรือเครื่องชงกาแฟฟิลเตอร์มักจะมีสัญลักษณ์ 1 Cup เท่ากับ 120 ถึง 150 มิลลิลิตรเท่านั้น เพราะกาแฟร้อนหนึ่งแก้วตวงรินจะเสิร์ฟปริมาณน้อยกว่าแก้วเครื่องดื่มเย็นทั่วไป"
        />
        <FAQItem
          q="หน่วยเซนติลิตร (cl) ที่ระบุบนขวดเครื่องดื่มแอลกอฮอล์ในยุโรปแปลเป็นมิลลิลิตรอย่างไร?"
          a="เซนติลิตร (Centiliter ย่อว่า cl) เป็นหน่วยที่ใช้บ่อยในทวีปยุโรป โดยคำอุปสรรค Centi แปลว่า 1 ใน 100 ดังนั้น 1 เซนติลิตร จึงเท่ากับ 10 มิลลิลิตร ตัวอย่างเช่น เบียร์หรือไวน์ขวดเล็กที่ระบุปริมาตร 33 cl จะเทียบเท่ากับ 330 มิลลิลิตร หรือขวดสุราแอลกอฮอล์ขนาด 70 cl จะเทียบเท่ากับ 700 มิลลิลิตร"
        />
      </SEOFAQ>
    </div>
  );
}

// 15. Hardness Scale Converter
export function HardnessScaleConverter({ lang }: { lang: Lang }) {
  const [val, setVal] = useLocalState("hard_val", "45");
  const [scale, setScale] = useLocalState("hard_scale", "hrc");

  const v = parseFloat(val) || 0;
  let hrc = 20;

  if (scale === "hrc") {
    hrc = v;
  } else if (scale === "hv") {
    hrc = interpolate(v, hv_pts, hrc_pts);
  } else if (scale === "hb") {
    hrc = interpolate(v, hb_pts, hrc_pts);
  } else if (scale === "mpa") {
    hrc = interpolate(v, mpa_pts, hrc_pts);
  }

  const compHRC = Math.max(20, Math.min(70, hrc));
  const hv = interpolate(compHRC, hrc_pts, hv_pts);
  const hb = interpolate(compHRC, hrc_pts, hb_pts);
  const mpa = interpolate(compHRC, hrc_pts, mpa_pts);

  return (
    <div id="hardness-scale-converter-calc">
      <h2 className="text-3xl font-black mb-2 text-deep-teal dark:text-soft-mint">
        {lang === "TH" ? "แปลงหน่วยความแข็งโลหะ (Rockwell-Brinell-Vickers)" : "Metal Hardness Scale Converter"}
      </h2>
      <p className="text-gray-500 mb-6">
        {lang === "TH" ? "เปรียบเทียบค่าความแข็งโลหะชุบแข็งและแรงดึงชิ้นงาน HRC, HB, HV และ MPa (อ้างอิงมาตรฐาน ASTM)" : "Convert between Rockwell C, Brinell, Vickers, and Tensile Strength (MPa)."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "ค่าความแข็ง" : "Hardness Value"}</label>
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "สเกลความแข็ง" : "Hardness Scale"}</label>
          <select value={scale} onChange={(e) => setScale(e.target.value)} className={inputClass}>
            <option value="hrc">Rockwell C (HRC)</option>
            <option value="hv">Vickers (HV)</option>
            <option value="hb">Brinell (HB)</option>
            <option value="mpa">Tensile Strength (MPa)</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-deep-teal/5 dark:bg-soft-mint/5 rounded-2xl border border-deep-teal/10 mb-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">{lang === "TH" ? "ผลการเปรียบเทียบสเกลความแข็ง (ประมาณ)" : "Hardness Equivalents (Approximate)"}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Rockwell (HRC)</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{compHRC.toFixed(1)} HRC</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Vickers (HV)</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{hv.toFixed(0)} HV</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Brinell (HB)</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{hb.toFixed(0)} HB</p>
          </div>
          <div className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-xs">Tensile (MPa)</p>
            <p className="text-xl font-black text-deep-teal dark:text-soft-mint mt-1">{mpa.toFixed(0)} MPa</p>
          </div>
        </div>
      </motion.div>

      <ExportResult elementId="hardness-scale-converter-calc" fileName="hardness-scale-converter" lang={lang} />
      <AdPlaceholder type="in-article" />

      <SEOFAQ title={lang === "TH" ? "คำแนะนำการวัดและแปลงค่าความแข็งของโลหะ" : "Metal Hardness FAQ"}>
        <FAQItem
          q="หน่วยความแข็งโลหะ ร็อกเวลล์ (Rockwell - HRC/HRB), บรีเนล (Brinell - HB), และวิกเกอร์ส (Vickers - HV) แตกต่างกันอย่างไร?"
          a="เป็นวิธีการกดทดสอบความแข็งที่มีหัวกดและแรงต่างกัน: ร็อกเวลล์ (Rockwell C หรือ HRC) ใช้หัวกดเพชรทรงกรวย นิยมใช้กับโลหะชุบแข็งกลึงเจียระไนแล้ว ส่วนบรีเนล (Brinell หรือ HB) ใช้หัวกดลูกบอลคาร์ไบด์ทรงกลม นิยมวัดชิ้นงานดิบ เหล็กหล่อ หรือชิ้นงานขนาดใหญ่ และวิกเกอร์ส (Vickers หรือ HV) ใช้หัวกดเพชรปิรามิดฐานสี่เหลี่ยมจัตุรัส เหมาะสำหรับการทดสอบวิจัยชิ้นงานขนาดเล็กและการทดสอบจุลภาค (Microhardness)"
        />
        <FAQItem
          q="ทำไมค่าความแข็งแบบ HRC ถึงเป็นหน่วยที่ช่างทำมีดและวิศวกรเหล็กชุบแข็งพูดถึงบ่อยที่สุด?"
          a="เนื่องจากสเกล Rockwell C (HRC) ครอบคลุมช่วงความแข็งของเหล็กกล้าและโลหะผสมที่ชุบแข็งสูง (ประมาณ 20 ถึง 70 HRC) ได้เป็นอย่างดี ตัวอย่างเช่น มีดทำครัวทั่วไปความแข็งอยู่ที่ 55-58 HRC, มีดพกแบรนด์ชั้นนำ 59-62 HRC, และเครื่องมือตัดอุตสาหกรรมชุบแข็ง (HSS) จะสูงกว่า 64 HRC ยิ่งค่า HRC สูง ความคงความคมจะนานขึ้น แต่ความเปราะจะเพิ่มขึ้นด้วย"
        />
        <FAQItem
          q="ความสัมพันธ์ระหว่างความแข็งโลหะ (Hardness) และความต้านทานแรงดึง (Tensile Strength - MPa) เป็นอย่างไร?"
          a="ในทางวิศวกรรม ความแข็งและความต้านทานแรงดึงมีความสัมพันธ์ในเชิงแปรผันตามกันอย่างชัดเจน ยิ่งเหล็กมีความแข็งสูงขึ้น โครงสร้างโมเลกุลจะทนทานต่อการดึงขาดได้ดีขึ้นด้วย ตัวอย่างเช่น เหล็กที่มีความแข็ง 30 HRC (ประมาณ 286 HB) จะมีความต้านทานแรงดึงประมาณ 950 MPa ในขณะที่เหล็กชุบแข็ง 50 HRC จะมีความต้านทานแรงดึงสูงขึ้นเป็นประมาณ 1,620 MPa"
        />
        <FAQItem
          q="ข้อจำกัดในการใช้ตารางเปรียบเทียบค่าความแข็ง (Hardness Conversion) คืออะไร?"
          a="ตารางหรือสูตรคำนวณเปรียบเทียบเป็นการประมาณการเชิงคณิตศาสตร์ (อ้างอิงตามมาตรฐาน ASTM E140) ในทางปฏิบัติ ค่าความแข็งที่แปลงได้อาจมีความคลาดเคลื่อนขึ้นอยู่กับส่วนผสมทางเคมีของโลหะ โครงสร้างเกรน (Microstructure) และวิธีการเตรียมผิวชิ้นงาน ดังนั้น จึงควรระบุการเปรียบเทียบนี้เป็นเพียง 'ค่าเปรียบเทียบโดยประมาณ' และใช้ผลจากการเครื่องทดสอบจริงในงานวิจัยที่สำคัญ"
        />
        <FAQItem
          q="ทำไมวิกเกอร์ส (HV) และบรีเนล (HB) ถึงมีค่าใกล้เคียงกันในช่วงความแข็งต่ำ?"
          a="ในช่วงความแข็งน้อยกว่า 300 HB/HV หัวกดลูกบอลของบรีเนลและหัวกดปิรามิดของวิกเกอร์สจะสร้างรอยบุ๋มที่มีลักษณะการกระจายแรงที่คล้ายกัน ค่าตัวเลขที่คำนวณจากสูตรจึงมีสัดส่วนเกือบเท่ากัน แต่ในช่วงความแข็งสูง (เกิน 500 HB/HV) ลูกบอลเหล็กของบรีเนลจะเริ่มเกิดการเสียรูปและยุบตัว ทำให้ค่าบรีเนลคลาดเคลื่อน วิศวกรจึงต้องเปลี่ยนไปใช้สเกลวิกเกอร์ส (HV) หรือร็อกเวลล์ (HRC) ที่หัวกดเป็นเพชรแทน"
        />
      </SEOFAQ>
    </div>
  );
}
