"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps } from "./shared";

// 1. Soil pH & Lime Calculator
export function SoilPhCalculator({ lang }: { lang: Lang }) {
  const [currentPh, setCurrentPh] = useLocalState("ag_cph", "5.0");
  const [targetPh, setTargetPh] = useLocalState("ag_tph", "6.5");
  const [areaRai, setAreaRai] = useLocalState("ag_arai", "1");
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cPh = parseFloat(currentPh);
    const tPh = parseFloat(targetPh);
    const area = parseFloat(areaRai);
    
    if (isNaN(cPh) || isNaN(tPh) || isNaN(area)) return;

    const diff = tPh - cPh;
    if (diff > 0) {
      // Rough estimate: ~100 kg of agricultural lime per rai per 0.5 pH unit increase
      const limePerRai = (diff / 0.5) * 100;
      setResult(limePerRai * area);
    } else {
      setResult(0); // No lime needed
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณปูนปรับสภาพดิน (Soil pH & Lime)" : "Soil pH & Lime Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className={labelClass}>{lang === "TH" ? "pH ดินปัจจุบัน" : "Current Soil pH"}</label>
             <input type="number" step="0.1" value={currentPh} onChange={e=>setCurrentPh(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
          <div>
             <label className={labelClass}>{lang === "TH" ? "pH เป้าหมาย" : "Target pH"}</label>
             <input type="number" step="0.1" value={targetPh} onChange={e=>setTargetPh(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "พื้นที่ (ไร่)" : "Area (Rai)"}</label>
          <input type="number" step="0.1" value={areaRai} onChange={e=>setAreaRai(e.target.value)} required className={`${inputClass} focus:ring-green-400`} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณปูนขาว/โดโลไมท์":"Calculate Lime Required"}</button>
      </form>

      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 rounded-xl text-center border border-green-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "ปริมาณปูนที่ต้องใช้โดยประมาณ:" : "Estimated Lime Required:"}</p>
          <div className="text-4xl font-black text-green-600">
             {result === 0 ? (lang==="TH"?"ไม่ต้องปรับปรุงดิน":"No lime needed") : `${result.toLocaleString(undefined, {maximumFractionDigits: 0})} ${lang==="TH"?"กิโลกรัม (kg)":"kg"}`}
          </div>
          <p className="text-sm text-gray-500 mt-2">{lang === "TH" ? "*เป็นค่าประมาณการจากดินร่วนทั่วไป ดินเหนียวอาจต้องใช้เพิ่ม 20-30%" : "*Estimate for loamy soil. Clay soil may need 20-30% more."}</p>
        </motion.div>
      )}

      <div className="mt-8">
        <CalculationSteps 
          steps={lang === "TH" ? [
            "สูตรประมาณการเบื้องต้น: การเพิ่มค่า pH 0.5 หน่วย ในพื้นที่ 1 ไร่ จะใช้ปูนขาวหรือปูนโดโลไมท์ประมาณ 100 กิโลกรัม (สำหรับดินร่วน)",
            "หากเป็นดินทราย อาจใช้ปริมาณลดลง 30% เนื่องจากความจุน้ำและการเปลี่ยนแปลงทางเคมีเร็วกว่า",
            "หากเป็นดินเหนียวจัด อาจต้องใช้ปูนเพิ่มขึ้น 20-30% เพราะดินเหนียวมีความสามารถในการต้านทานการเปลี่ยนแปลง pH (Buffering Capacity) สูง"
          ] : [
            "Rule of thumb: Raising pH by 0.5 in 1 Rai (0.16 Hectare) requires approx. 100 kg of ag lime for loamy soil.",
            "Sandy soils require about 30% less lime.",
            "Heavy clay soils require 20-30% more due to higher buffering capacity."
          ]}
        />
        <SEOFAQ title={lang==="TH"?"FAQ — ความเป็นกรด-ด่างของดิน (Soil pH) และการปรับปรุงดิน":"FAQ — Soil pH & Liming"}>
        <FAQItem 
          q={lang==="TH"?"ทำไมค่า pH ของดินถึงมีความสำคัญต่อการเจริญเติบโตของพืช?":"Why is soil pH important for plant growth?"} 
          a={lang==="TH"?"ค่า pH หรือระดับความเป็นกรด-ด่างของดิน เป็นปัจจัยหลักที่ควบคุมการละลายน้ำและ 'ความเป็นประโยชน์' ของธาตุอาหารพืช (Nutrient Availability) ในดิน อ้างอิงจากหลักการปฐพีวิทยา (Soil Science) ขององค์การอาหารและเกษตรแห่งสหประชาชาติ (FAO) ระบุว่า ธาตุอาหารหลักอย่างไนโตรเจน (N) ฟอสฟอรัส (P) และโพแทสเซียม (K) จะละลายน้ำและถูกรากพืชดูดซึมได้ดีที่สุดเมื่อดินมีค่า pH อยู่ระหว่าง 6.0 - 7.0 (เป็นกรดอ่อนๆ ถึงเป็นกลาง) \n\nหากดินมีสภาพเป็นกรดจัด (pH ต่ำกว่า 5.5) เช่น ดินเปรี้ยว ธาตุอาหารอย่างฟอสฟอรัสจะถูกตรึงไว้กับธาตุเหล็กและอะลูมิเนียม ทำให้พืชนำไปใช้ไม่ได้ เกิดอาการรากแคระแกร็น นอกจากนี้ สภาพกรดจัดยังทำให้ธาตุอะลูมิเนียม (Al) และแมงกานีส (Mn) ละลายออกมามากเกินไปจนกลายเป็นพิษต่อรากพืช ในทางกลับกัน หากดินเป็นด่างจัด (pH สูงกว่า 7.5) พืชจะขาดธาตุอาหารรอง เช่น เหล็ก สังกะสี และแมงกานีส ทำให้ใบเหลือง ดังนั้น การปรับค่า pH ให้เหมาะสมจึงเปรียบเสมือนการปลดล็อกกุญแจให้พืชสามารถกินอาหารที่อยู่ในดินหรือจากปุ๋ยที่เราใส่ลงไปได้อย่างเต็มประสิทธิภาพ":"Soil pH controls the solubility and availability of essential plant nutrients. According to the Food and Agriculture Organization (FAO), macronutrients like Nitrogen (N), Phosphorus (P), and Potassium (K) are most available to plant roots when soil pH is between 6.0 and 7.0. In highly acidic soils (pH < 5.5), phosphorus becomes locked up by iron and aluminum, making it unavailable to plants. Furthermore, toxic levels of aluminum and manganese become soluble, stunting root growth. Conversely, in highly alkaline soils (pH > 7.5), micronutrients like iron and zinc become unavailable, causing chlorosis (yellowing of leaves). Correcting soil pH is like unlocking the soil's pantry, ensuring plants can efficiently absorb fertilizers."} 
        />
        <FAQItem 
          q={lang==="TH"?"ดินเปรี้ยว (Acid Soil) เกิดจากอะไร และเราสามารถแก้ไขได้อย่างไร?":"What causes acidic soils and how can we fix them?"} 
          a={lang==="TH"?"ดินเปรี้ยว หรือดินเป็นกรด เกิดจาก 4 สาเหตุหลักในทางวิทยาศาสตร์ ได้แก่ 1) วัตถุต้นกำเนิดดินในพื้นที่นั้นมีสภาพเป็นกรด 2) การชะล้าง (Leaching) ของฝนที่ตกหนักพัดพาธาตุอาหารที่เป็นด่าง (แคลเซียม แมกนีเซียม) ออกไปจากผิวดิน (พบบ่อยในเขตร้อนชื้น) 3) การใช้ปุ๋ยเคมีกลุ่มไนโตรเจน เช่น ปุ๋ยยูเรีย หรือ แอมโมเนียมซัลเฟต ต่อเนื่องเป็นเวลานาน ซึ่งเมื่อแบคทีเรียย่อยสลายปุ๋ยจะปล่อยไฮโดรเจนไอออน (H+) ที่ทำให้ดินเป็นกรด 4) การสลายตัวของอินทรียวัตถุตามธรรมชาติ\n\nกรมพัฒนาที่ดิน กระทรวงเกษตรและสหกรณ์ แนะนำวิธีการแก้ไขดินเปรี้ยวที่ดีที่สุดและประหยัดที่สุดคือ 'การใส่ปูนทางการเกษตร' (Agricultural Liming) เช่น ปูนมาร์ล (Marl) ปูนขาว (Quick lime) หรือ ปูนโดโลไมท์ (Dolomite) ปูนเหล่านี้มีส่วนประกอบของแคลเซียมคาร์บอเนต ซึ่งจะเข้าไปทำปฏิกิริยาสะเทินกับกรด (H+) ในดิน ทำให้โครงสร้างดินดีขึ้น ร่วนซุย และลดความเป็นพิษของอะลูมิเนียม โดยควรหว่านปูนล่วงหน้า 15-30 วัน ก่อนการปลูกพืชและไถกลบให้เข้ากับดิน":"Soil acidity is naturally and artificially caused by 4 main factors: 1) Acidic parent materials of the soil. 2) Heavy rainfall leaching away basic cations like calcium and magnesium (common in tropical regions). 3) Long-term use of ammonium-based nitrogen fertilizers (like urea), which release hydrogen ions (H+) during nitrification. 4) Natural breakdown of organic matter.\nThe most cost-effective and scientifically proven method to correct acidic soils is applying Agricultural Lime (calcium carbonate, quicklime, or dolomite). Liming neutralizes hydrogen ions, precipitates toxic aluminum, adds calcium (and magnesium if using dolomite), and improves soil structure. It should be broadcast and tilled into the topsoil 15-30 days before planting."} 
        />
        <FAQItem 
          q={lang==="TH"?"ปูนขาว ปูนมาร์ล และปูนโดโลไมท์ ต่างกันอย่างไร ควรเลือกใช้อะไรดี?":"What is the difference between Quicklime, Marl, and Dolomite? Which one to use?"} 
          a={lang==="TH"?"วัสดุปรับปรุงดินแต่ละชนิดมีคุณสมบัติทางเคมีที่แตกต่างกัน:\n\n1. ปูนขาว (Quick Lime / CaO) หรือปูนเผา: ออกฤทธิ์ปรับสภาพดินได้ 'เร็วที่สุดและแรงที่สุด' เหมาะสำหรับดินที่เป็นกรดจัดมากๆ หรือต้องการฆ่าเชื้อโรคในดิน (เช่น ปรับสภาพบ่อกุ้ง/ปลา) ข้อควรระวังคือมีความร้อนและกัดกร่อนสูง ห้ามใส่พร้อมปุ๋ยเคมีเพราะจะทำให้ธาตุไนโตรเจนระเหยหายไป\n2. ปูนมาร์ล (Marl / CaCO3): เป็นหินปูนบดละเอียด ออกฤทธิ์ช้ากว่าปูนขาวแต่มีความปลอดภัยต่อพืชและจุลินทรีย์ในดินสูงกว่ามาก ราคาถูก เหมาะสำหรับใช้ปรับพื้นที่นาข้าวหรือสวนเกษตรขนาดใหญ่\n3. ปูนโดโลไมท์ (Dolomite / CaMg(CO3)2): เป็นวัสดุที่ได้รับความนิยมสูงสุดในปัจจุบัน เพราะนอกจากจะช่วยลดความเป็นกรดแล้ว ยังให้ธาตุอาหารรองที่สำคัญคือ แคลเซียม (Ca) และ แมกนีเซียม (Mg) ซึ่งเป็นองค์ประกอบหลักของคลอโรฟิลล์ (ทำให้ใบเขียว) เหมาะสำหรับดินที่ปลูกพืชต่อเนื่องมานานและดินที่ขาดธาตุอาหาร\nดังนั้น หากต้องการแก้กรดพร้อมเติมธาตุอาหาร 'โดโลไมท์' คือตัวเลือกที่ดีที่สุด แต่หากต้องการแก้ดินกรดจัดอย่างรวดเร็ว 'ปูนขาว' จะเหมาะสมกว่า":"1. Quicklime (CaO): Acts very fast and strongly. Ideal for highly acidic soils or disinfecting soil/aquaculture ponds. It produces heat and is caustic. Never apply it simultaneously with nitrogen fertilizers as it causes volatilization.\n2. Marl (CaCO3): Naturally occurring crushed limestone. Acts slower but is highly safe for plants and soil microbes. Very cost-effective for large scale farming.\n3. Dolomite (CaMg(CO3)2): The most popular choice today. Besides neutralizing acidity, it adds essential secondary nutrients: Calcium and Magnesium (the central atom of chlorophyll, making leaves green). Ideal for nutrient-depleted soils.\nConclusion: For acidity + nutrients, use Dolomite. For rapid pH neutralization, use Quicklime."} 
        />
        <FAQItem 
          q={lang==="TH"?"ข้อควรระวังในการใส่ปูนปรับสภาพดินมีอะไรบ้าง สามารถใส่พร้อมปุ๋ยเคมีได้หรือไม่?":"What are the precautions when applying lime? Can it be mixed with fertilizers?"} 
          a={lang==="TH"?"ข้อห้ามที่สำคัญที่สุดในทางเคมีเกษตรคือ **ห้ามใส่ปูนปรับสภาพดิน (โดยเฉพาะปูนขาว) พร้อมกับปุ๋ยเคมีกลุ่มไนโตรเจน** (เช่น ยูเรีย หรือ 15-15-15) โดยเด็ดขาด \n\nเหตุผลทางวิทยาศาสตร์: เมื่อปูน (ซึ่งมีฤทธิ์เป็นด่าง) สัมผัสกับปุ๋ยแอมโมเนียมหรือยูเรีย จะเกิดปฏิกิริยาเคมีที่เปลี่ยนไนโตรเจนในปุ๋ยให้กลายเป็น 'ก๊าซแอมโมเนีย' (Ammonia Volatilization) และระเหยสูญหายไปในอากาศ ทำให้พืชไม่ได้รับธาตุอาหารที่อุตส่าห์ซื้อปุ๋ยมาใส่ นอกจากนี้ การใส่ปูนพร้อมปุ๋ยฟอสเฟต จะทำให้ฟอสฟอรัสถูกตรึงกลายเป็นแคลเซียมฟอสเฟตที่ละลายน้ำยาก พืชนำไปใช้ไม่ได้\n\nคำแนะนำที่ถูกต้อง: ควรหว่านปูนและไถกลบทิ้งไว้อย่างน้อย 15-30 วัน ให้ปูนทำปฏิกิริยาและละลายไปกับความชื้นในดินก่อน จากนั้นจึงค่อยเริ่มกระบวนการใส่ปุ๋ยเคมีบำรุงต้นไม้ ซึ่งเมื่อถึงเวลานั้น ดินที่มีค่า pH เหมาะสมจะช่วยให้ปุ๋ยละลายน้ำได้อย่างมีประสิทธิภาพสูงสุด":"The golden rule in agricultural chemistry is: **Never mix liming materials (especially quicklime) directly with nitrogen-based fertilizers.** \nScientific reason: When lime (alkaline) reacts with ammonium or urea fertilizers, a chemical reaction causes 'Ammonia Volatilization'. The valuable nitrogen turns into ammonia gas and is lost to the atmosphere, rendering your expensive fertilizer useless. Furthermore, mixing lime with phosphate fertilizers causes phosphorus to precipitate into insoluble calcium phosphate.\nProper method: Apply and incorporate lime into the soil at least 15-30 days before planting and fertilizing. This gives the lime time to react with soil moisture and alter the pH. Once the pH is balanced, applied fertilizers will be absorbed by plants at maximum efficiency."} 
        />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 2. Livestock Profit Calculator
export function LivestockProfitCalculator({ lang }: { lang: Lang }) {
  const [headCount, setHeadCount] = useLocalState("ls_hc", "100");
  const [sellPrice, setSellPrice] = useLocalState("ls_sp", "5000");
  const [feedCost, setFeedCost] = useLocalState("ls_fc", "2500");
  const [medCost, setMedCost] = useLocalState("ls_mc", "200");
  const [miscCost, setMiscCost] = useLocalState("ls_misc", "5000");
  
  const h = parseFloat(headCount);
  const s = parseFloat(sellPrice);
  const f = parseFloat(feedCost);
  const m = parseFloat(medCost);
  const misc = parseFloat(miscCost);
  
  const totalIncome = h * s;
  const totalCost = (h * f) + (h * m) + misc;
  const profit = totalIncome - totalCost;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณต้นทุน/กำไร ปศุสัตว์" : "Livestock Profit Calculator"}</h2>
      <form className="space-y-4 mt-6">
        <div><label className={labelClass}>{lang === "TH" ? "จำนวนสัตว์ (ตัว)" : "Number of Animals"}</label><input type="number" value={headCount} onChange={e=>setHeadCount(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>{lang === "TH" ? "ราคาขายเฉลี่ย (ต่อตัว)" : "Avg Sell Price (per animal)"}</label><input type="number" value={sellPrice} onChange={e=>setSellPrice(e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ค่าอาหาร (ต่อตัว)" : "Feed Cost (per animal)"}</label><input type="number" value={feedCost} onChange={e=>setFeedCost(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ค่ายา/วัคซีน (ต่อตัว)" : "Meds Cost (per animal)"}</label><input type="number" value={medCost} onChange={e=>setMedCost(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "ค่าใช้จ่ายแฝง/เบ็ดเตล็ด (รวมทั้งหมด)" : "Misc / Overhead Cost (Total)"}</label><input type="number" value={miscCost} onChange={e=>setMiscCost(e.target.value)} className={inputClass} /></div>
      </form>
      {!isNaN(profit) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-8 p-6 rounded-xl text-center border ${profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="grid grid-cols-2 gap-4 mb-4">
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"รายรับรวม":"Total Income"}</p>
                <p className="font-bold">฿{totalIncome.toLocaleString()}</p>
             </div>
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"ต้นทุนรวม":"Total Cost"}</p>
                <p className="font-bold text-red-600">฿{totalCost.toLocaleString()}</p>
             </div>
          </div>
          <p className="text-gray-500 mb-2">{lang === "TH" ? "กำไรสุทธิ (Net Profit):" : "Net Profit:"}</p>
          <div className={`text-4xl font-black ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
             ฿{profit.toLocaleString()}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — การคำนวณต้นทุนและกำไรในอุตสาหกรรมปศุสัตว์":"Livestock Economics FAQ"}>
        <FAQItem q={lang==="TH"?"โครงสร้างต้นทุนหลักของการเลี้ยงสัตว์คืออะไร?":"What is the main cost structure in livestock farming?"} a={lang==="TH"?"ตามหลักเศรษฐศาสตร์เกษตร (Agricultural Economics) โครงสร้างต้นทุนที่ใหญ่ที่สุดในฟาร์มปศุสัตว์ (หมู ไก่ วัว) คือ 'ค่าอาหารสัตว์' ซึ่งมักจะคิดเป็น 60-70% ของต้นทุนทั้งหมด รองลงมาคือค่าพันธุ์สัตว์ (15%) ค่ายาและวัคซีน (5%) และค่าแรงงานรวมถึงค่าสาธารณูปโภค การบริหารจัดการ FCR (Feed Conversion Ratio - อัตราแลกเนื้อ) ให้ต่ำที่สุด จึงเป็นหัวใจสำคัญของการทำกำไร.":"According to Agricultural Economics, the largest expense in livestock farming (pigs, poultry, cattle) is 'Feed Cost', which typically accounts for 60-70% of total operational costs. This is followed by animal genetics/stock (15%), veterinary/meds (5%), and labor/utilities. Managing and minimizing the FCR (Feed Conversion Ratio) is the key to maximizing profit margins."} />
        <FAQItem q={lang==="TH"?"FCR (Feed Conversion Ratio) คืออะไร และสำคัญอย่างไร?":"What is FCR and why is it important?"} a={lang==="TH"?"FCR หรืออัตราแลกเนื้อ คือตัวเลขที่บอกว่า 'ต้องใช้อาหารกี่กิโลกรัม เพื่อให้สัตว์น้ำหนักเพิ่มขึ้น 1 กิโลกรัม' ตัวอย่างเช่น ไก่เนื้อมี FCR ประมาณ 1.5-1.6 (กินอาหาร 1.5 กก. ได้เนื้อ 1 กก.) ส่วนสุกรมี FCR ประมาณ 2.4-2.6 ยิ่งค่า FCR ต่ำ แปลว่าสัตว์ดึงสารอาหารไปใช้ได้ดีเยี่ยม ฟาร์มจึงมีกำไรสูง หาก FCR สูงแปลว่าสัตว์กินจุแต่ไม่โต อาจเกิดจากอาหารไม่มีคุณภาพ อากาศร้อน หรือสัตว์ป่วย.":"FCR (Feed Conversion Ratio) measures the efficiency with which an animal converts animal feed into the desired output (meat). For example, broiler chickens have an FCR of ~1.5 (1.5 kg of feed to produce 1 kg of meat). Pigs have an FCR of ~2.4. A lower FCR means high efficiency and higher profitability. High FCR indicates waste, poor feed quality, heat stress, or illness."} />
        <FAQItem q={lang==="TH"?"ความเสี่ยงทางการเงินที่พบบ่อยในฟาร์มปศุสัตว์มีอะไรบ้าง?":"What are the common financial risks in livestock farming?"} a={lang==="TH"?"ความเสี่ยงหลักได้แก่ 1) ความผันผวนของราคาวัตถุดิบอาหารสัตว์ (เช่น ข้าวโพด กากถั่วเหลือง) ที่อิงตามราคาตลาดโลก 2) โรคระบาด (เช่น ASF ในสุกร หรือ ไข้หวัดนก) ซึ่งอาจทำให้สูญเสียฝูงสัตว์ทั้งหมด 100% 3) สภาพอากาศแปรปรวน ภาวะฮีทสโตรกที่ทำให้สัตว์โตช้า 4) ราคาเนื้อสัตว์หน้าฟาร์มตกต่ำตามกลไกตลาด (Oversupply) การป้องกันคือต้องทำระบบ Biosecurity ที่เข้มงวดและอาจมีการทำประกันภัยการเกษตร.":"Major risks include: 1) Volatility in global feed ingredient prices (corn, soybean meal). 2) Disease outbreaks (e.g., African Swine Fever, Avian Influenza) causing up to 100% mortality. 3) Heat stress affecting growth rates. 4) Price fluctuations at farm-gate due to oversupply. Mitigation requires strict Biosecurity protocols and considering agricultural insurance."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 3. Spray Volume Calculator
export function SprayVolumeCalculator({ lang }: { lang: Lang }) {
  const [rate, setRate] = useLocalState("sv_r", "20"); // cc per 20L
  const [baseWater, setBaseWater] = useLocalState("sv_bw", "20"); // typically 20L
  const [tankSize, setTankSize] = useLocalState("sv_ts", "200"); // actual tank size
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const r = parseFloat(rate);
    const bw = parseFloat(baseWater);
    const ts = parseFloat(tankSize);
    
    if (isNaN(r) || isNaN(bw) || isNaN(ts) || bw === 0) return;

    // e.g. 20cc per 20L -> how much for 200L tank? => (200 / 20) * 20 = 200cc
    setResult((ts / bw) * r);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณปริมาณน้ำยา/ปุ๋ยฉีดพ่น" : "Spray Volume Calculator"}</h2>
      <form onSubmit={calculate} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อัตราการใช้ (cc หรือ กรัม)" : "Dose Rate (cc or g)"}</label>
            <input type="number" step="0.1" value={rate} onChange={e=>setRate(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ต่อน้ำ (ลิตร) - ตามฉลาก" : "Per Water (Liters) - Label"}</label>
            <input type="number" step="0.1" value={baseWater} onChange={e=>setBaseWater(e.target.value)} required className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ขนาดถังฉีดพ่นจริง (ลิตร)" : "Actual Tank Size (Liters)"}</label>
          <input type="number" step="0.1" value={tankSize} onChange={e=>setTankSize(e.target.value)} required className={inputClass} />
        </div>
        <button type="submit" className="w-full py-4 bg-green-500 font-bold text-white rounded hover:bg-green-600">{lang==="TH"?"คำนวณปริมาณยาที่ต้องใช้":"Calculate Required Dose"}</button>
      </form>

      {result !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 rounded-xl text-center border border-green-200">
          <p className="text-gray-500 mb-2">{lang === "TH" ? "ปริมาณน้ำยา/ปุ๋ยที่ต้องผสมลงถัง:" : "Required Chemical / Fertilizer in Tank:"}</p>
          <div className="text-4xl font-black text-green-600">
             {result.toLocaleString(undefined, {maximumFractionDigits: 1})} {lang==="TH"?"ซีซี/กรัม":"cc/g"}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — การผสมสารเคมีเกษตรและการฉีดพ่น":"Agricultural Spraying FAQ"}>
        <FAQItem q={lang==="TH"?"วิธีการผสมสารเคมีหลายชนิดรวมกัน (Tank Mixing) ที่ถูกต้องคืออะไร?":"What is the correct order for mixing multiple agricultural chemicals (Tank Mixing)?"} a={lang==="TH"?"การผสมสารเคมีเกษตรหลายชนิดในถังเดียว ต้องปฏิบัติตามกฎการละลายที่เรียกว่า W-A-L-E-S (หรือ W-A-L-T-E-R) เพื่อป้องกันการตกตะกอน (Incompatibility): \n1. W (Wettable Powders) สารชนิดผงที่ละลายน้ำได้\n2. A (Agitate) คนให้เข้ากัน\n3. L (Liquids / Flowables) สารชนิดน้ำแขวนลอย\n4. E (Emulsifiable Concentrates - EC) สารชนิดน้ำมัน\n5. S (Surfactants) สารจับใบ หรือสารเสริมประสิทธิภาพ ให้ใส่เป็นลำดับสุดท้ายเสมอ \nหากผสมผิดลำดับ สารเคมีอาจจับตัวเป็นก้อนเหมือนวุ้น อุดตันหัวฉีด และทำให้ประสิทธิภาพการกำจัดศัตรูพืชลดลงอย่างสิ้นเชิง.":"Mixing multiple chemicals requires following the W-A-L-E-S sequence to avoid physical incompatibility (precipitation/clumping): \n1. W - Wettable Powders (WP/WG)\n2. A - Agitate fully\n3. L - Liquids and Flowables (SC)\n4. E - Emulsifiable Concentrates (EC/oil-based)\n5. S - Surfactants/Adjuvants go in last.\nMixing out of order can cause chemical reactions creating sludge that clogs nozzles and renders the active ingredients useless."} />
        <FAQItem q={lang==="TH"?"ทำไมถึงต้องใส่ 'สารจับใบ' (Surfactant) ในการฉีดพ่นพืช?":"Why is a 'Surfactant' or wetter-sticker necessary for spraying?"} a={lang==="TH"?"ใบพืชส่วนใหญ่มีโครงสร้างชั้นเคลือบที่เรียกว่า 'คิวทิเคิล' (Cuticle) ซึ่งมีลักษณะเป็นแว็กซ์ (ขี้ผึ้ง) ป้องกันการสูญเสียน้ำ เมื่อฉีดพ่นน้ำยาที่มีน้ำเป็นส่วนประกอบหลัก หยดน้ำจะกลิ้งตกลงจากใบ (เนื่องจากแรงตึงผิวของน้ำ) สารจับใบ (Surfactant) จะเข้าไป 'ลดแรงตึงผิว' ของน้ำ ทำให้ละอองน้ำยาแผ่กระจายแนบสนิทไปกับผิวใบพืช ทนทานต่อการชะล้างของฝน และช่วยให้สารเคมีซึมผ่านเข้าสู่ปากใบพืชได้ลึกและรวดเร็วขึ้น เพิ่มประสิทธิภาพปุ๋ยและยาได้กว่า 30-50%.":"Most plant leaves have a waxy outer layer called the 'Cuticle'. Because water has high surface tension, spray droplets tend to bead up and roll off the leaves. A Surfactant (surface-active agent) reduces the surface tension of the water, allowing the droplets to spread flat across the leaf surface. This maximizes contact area, provides rain-fastness, and increases the penetration of chemicals into the plant, boosting efficacy by 30-50%."} />
        <FAQItem q={lang==="TH"?"เวลาใดเหมาะสมที่สุดในการฉีดพ่นปุ๋ยทางใบและสารเคมีเกษตร?":"What is the best time of day to spray foliar fertilizers and chemicals?"} a={lang==="TH"?"เวลาที่ดีที่สุดในการฉีดพ่นคือ 'ช่วงเช้าตรู่' (06:00 - 09:00 น.) หรือ 'ช่วงเย็น' (16:00 - 18:00 น.) \nทางพฤกษศาสตร์ ในช่วงเช้าที่แสงแดดอ่อนๆ และมีความชื้นสัมพัทธ์สูง ปากใบพืช (Stomata) จะเปิดรับน้ำและธาตุอาหารได้ดีที่สุด หากฉีดพ่นช่วงเที่ยงที่แดดจัด อุณหภูมิสูง น้ำยาจะระเหยเร็วเกินไปก่อนที่พืชจะดูดซึมหมด ปากใบจะปิดเพื่อลดการคายน้ำ และที่อันตรายที่สุดคือ หยดน้ำยาบนใบจะทำหน้าที่เสมือนเลนส์รวมแสงแดด ก่อให้เกิดอาการ 'ใบไหม้' (Phytotoxicity) ได้.":"The optimal time to spray is 'Early Morning' (6-9 AM) or 'Late Afternoon' (4-6 PM). \nBotanically, during early mornings with mild sunlight and high humidity, plant stomata are fully open, maximizing nutrient absorption. Spraying during hot midday sun causes rapid evaporation before absorption can occur, and stomata close to prevent water loss. Most dangerously, spray droplets act as magnifying glasses under intense sun, burning the leaves (Phytotoxicity)."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 4. Fishery Income Calculator
export function FisheryIncomeCalculator({ lang }: { lang: Lang }) {
  const [fryCount, setFryCount] = useLocalState("fi_fc", "10000"); // จำนวนลูกพันธุ์
  const [survivalRate, setSurvivalRate] = useLocalState("fi_sr", "80"); // %
  const [harvestWeight, setHarvestWeight] = useLocalState("fi_hw", "500"); // กรัมต่อตัว
  const [pricePerKg, setPricePerKg] = useLocalState("fi_p", "60");
  const [totalCost, setTotalCost] = useLocalState("fi_cost", "20000");

  const fCount = parseFloat(fryCount);
  const sRate = parseFloat(survivalRate) / 100;
  const hWeightKg = parseFloat(harvestWeight) / 1000;
  const p = parseFloat(pricePerKg);
  const cost = parseFloat(totalCost);

  const survived = fCount * sRate;
  const totalKg = survived * hWeightKg;
  const income = totalKg * p;
  const profit = income - cost;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณรายได้ประมง/เพาะเลี้ยงสัตว์น้ำ" : "Fishery Income Calculator"}</h2>
      <form className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ปล่อยลูกพันธุ์ (ตัว)" : "Fry Released (Count)"}</label><input type="number" value={fryCount} onChange={e=>setFryCount(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "อัตรารอด (%)" : "Survival Rate (%)"}</label><input type="number" step="0.1" value={survivalRate} onChange={e=>setSurvivalRate(e.target.value)} className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "น้ำหนักเฉลี่ยตอนจับ (กรัม/ตัว)" : "Harvest Wgt (grams/head)"}</label><input type="number" value={harvestWeight} onChange={e=>setHarvestWeight(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย (บาท/kg)" : "Sell Price (THB/kg)"}</label><input type="number" value={pricePerKg} onChange={e=>setPricePerKg(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "ต้นทุนรวมตลอดรุ่น (อาหาร+ยา+ไฟ)" : "Total Crop Cost (Feed+Electricity)"}</label><input type="number" value={totalCost} onChange={e=>setTotalCost(e.target.value)} className={inputClass} /></div>
      </form>

      {!isNaN(profit) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-8 p-6 rounded-xl text-center border ${profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="grid grid-cols-2 gap-4 mb-4">
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"ผลผลิตรวม (kg)":"Total Yield (kg)"}</p>
                <p className="font-bold">{totalKg.toLocaleString()} kg</p>
             </div>
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"รายได้รวม":"Total Income"}</p>
                <p className="font-bold text-blue-600">฿{income.toLocaleString()}</p>
             </div>
          </div>
          <p className="text-gray-500 mb-2">{lang === "TH" ? "กำไรสุทธิ (Net Profit):" : "Net Profit:"}</p>
          <div className={`text-4xl font-black ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
             ฿{profit.toLocaleString()}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — เศรษฐศาสตร์การเพาะเลี้ยงสัตว์น้ำ (Aquaculture)":"Aquaculture Economics FAQ"}>
        <FAQItem q={lang==="TH"?"ปัจจัยใดที่ส่งผลต่ออัตรารอด (Survival Rate) ของสัตว์น้ำมากที่สุด?":"What factors affect aquaculture survival rates the most?"} a={lang==="TH"?"จากคู่มือกรมประมง ปัจจัยหลักคือ 'คุณภาพน้ำ' ได้แก่ ค่าออกซิเจนละลายน้ำ (DO) ต้องไม่ต่ำกว่า 4-5 mg/L, ค่าแอมโมเนียและไนไตรท์ที่เกิดจากของเสียและอาหารเหลือต้องอยู่ใกล้ 0, ค่า pH ควรนิ่งที่ระดับ 7.5-8.5 และอุณหภูมิน้ำ หากพารามิเตอร์เหล่านี้แกว่งจะทำให้สัตว์น้ำเครียด ภูมิคุ้มกันตก และติดเชื้อแบคทีเรียหรือไวรัสได้ง่าย เป็นสาเหตุหลักของการตายหมู่.":"According to fishery standards, 'Water Quality' is paramount. Dissolved Oxygen (DO) must remain above 4-5 mg/L. Toxic ammonia and nitrite (from waste and uneaten feed) must be near zero. pH should be stable at 7.5-8.5. Fluctuations cause severe stress, lowering the immune system, leading to bacterial/viral outbreaks which cause mass mortality."} />
        <FAQItem q={lang==="TH"?"FCR ในการเลี้ยงปลาและกุ้งมีความสำคัญอย่างไร?":"Why is FCR critical in fish and shrimp farming?"} a={lang==="TH"?"ต้นทุนกว่า 50-70% ของการเพาะเลี้ยงสัตว์น้ำคือ 'ค่าอาหารสำเร็จรูป' การบริหาร FCR (อัตราแลกเนื้อ) ให้ต่ำจึงสำคัญมาก เช่น กุ้งขาวแวนนาไมมักมี FCR ประมาณ 1.2 - 1.5 หากคนเลี้ยงให้อาหารมากเกินไปจนกุ้งกินไม่หมด อาหารจะเน่าเสียก้นบ่อ ทำให้ก๊าซไข่เน่าพุ่ง กุ้งป่วย และ FCR พุ่งสูง ทำให้ต้นทุนบานปลายและขาดทุนในที่สุด การจัดการระบบให้อาหารอัตโนมัติ (Auto Feeder) จึงเป็นที่นิยม.":"Feed constitutes 50-70% of aquaculture operational costs. Managing FCR (Feed Conversion Ratio) is critical. Pacific white shrimp target an FCR of 1.2 - 1.5. Overfeeding not only wastes expensive pellets but pollutes the pond bottom, generating toxic hydrogen sulfide, causing disease, and skyrocketing the FCR. This guarantees financial loss. Auto-feeders are highly recommended to optimize this."} />
        <FAQItem q={lang==="TH"?"ความเสี่ยงเรื่องราคาจับปลาปากบ่อ (Farm-gate price) คืออะไร?":"What is the risk of farm-gate price volatility?"} a={lang==="TH"?"ราคาสัตว์น้ำมีความผันผวนตามฤดูกาลและปริมาณผลผลิตมวลรวมในตลาด (Demand/Supply) บ่อยครั้งที่เมื่อถึงเวลาจับขาย ราคาตลาดเกิดตกต่ำพอดี ผู้เลี้ยงสัตว์น้ำมักมีข้อจำกัดเรื่อง 'ไม่สามารถยืดเวลาเลี้ยงได้' เพราะถ้ายืดเวลา สัตว์น้ำก็ยังต้องกินอาหารทุกวัน (ต้นทุนเพิ่ม) และบ่ออาจหนาแน่นเกินไปจนเกิดโรคตาย การทำเกษตรพันธสัญญา (Contract Farming) หรือการแปรรูปจึงเป็นทางออกในการลดความเสี่ยงนี้.":"Aquatic commodity prices fluctuate wildly based on supply and demand. Farmers face a unique risk: when prices are low at harvest time, they cannot easily 'hold' their stock. Keeping fish/shrimp longer means daily feeding costs continue to rise, and carrying capacity issues trigger mass die-offs. Contract Farming or downstream processing are common strategies to hedge this market risk."} />
        </SEOFAQ>
      </div>
    </div>
  );
}

// 5. Yield Gap Calculator
export function YieldGapCalculator({ lang }: { lang: Lang }) {
  const [maxYield, setMaxYield] = useLocalState("yg_max", "1200"); // kg per rai
  const [actualYield, setActualYield] = useLocalState("yg_act", "800"); 
  const [price, setPrice] = useLocalState("yg_p", "10"); // THB per kg
  
  const mY = parseFloat(maxYield);
  const aY = parseFloat(actualYield);
  const p = parseFloat(price);

  const gap = mY - aY;
  const gapPercent = (gap / mY) * 100;
  const lostIncome = gap * p;

  return (
    <div>
      <h2 className="text-3xl font-black mb-2 text-green-600">{lang === "TH" ? "คำนวณส่วนสูญเสียโอกาสผลผลิต (Yield Gap)" : "Yield Gap Calculator"}</h2>
      <form className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>{lang === "TH" ? "ผลผลิตสูงสุดที่เป็นไปได้ (kg/ไร่)" : "Max Potential Yield (kg/Rai)"}</label><input type="number" value={maxYield} onChange={e=>setMaxYield(e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>{lang === "TH" ? "ผลผลิตที่ได้จริง (kg/ไร่)" : "Actual Yield (kg/Rai)"}</label><input type="number" value={actualYield} onChange={e=>setActualYield(e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>{lang === "TH" ? "ราคาขาย (บาท/kg)" : "Sell Price (THB/kg)"}</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} className={inputClass} /></div>
      </form>

      {(!isNaN(gap) && mY > 0) && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-6 bg-green-50 rounded-xl text-center border border-green-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"ช่องว่างผลผลิต (Yield Gap)":"Yield Gap (kg)"}</p>
                <p className="font-bold text-red-500">{gap.toLocaleString()} kg</p>
             </div>
             <div>
                <p className="text-gray-500 text-sm">{lang==="TH"?"คิดเป็น % ที่หายไป":"% Lost Potential"}</p>
                <p className="font-bold text-red-500">{gapPercent.toFixed(1)}%</p>
             </div>
          </div>
          <p className="text-gray-500 mb-2">{lang === "TH" ? "รายได้ที่สูญเสียไป (Lost Income Potential):" : "Lost Income Potential:"}</p>
          <div className="text-4xl font-black text-red-600">
             ฿{lostIncome.toLocaleString()}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <SEOFAQ title={lang==="TH"?"FAQ — ช่องว่างผลผลิตทางเกษตรกรรม (Yield Gap)":"Yield Gap FAQ"}>
        <FAQItem q={lang==="TH"?"Yield Gap หรือ ช่องว่างผลผลิต คืออะไร?":"What is a Yield Gap in agriculture?"} a={lang==="TH"?"Yield Gap คือความแตกต่างระหว่าง 'ผลผลิตสูงสุดที่เป็นไปได้ในทางทฤษฎี (Potential Yield)' เมื่อใช้สายพันธุ์ที่ดีที่สุดและสภาพแวดล้อมสมบูรณ์แบบ เปรียบเทียบกับ 'ผลผลิตที่เกษตรกรทำได้จริง (Actual Yield)' ในพื้นที่นั้นๆ องค์การอาหารและเกษตรแห่งสหประชาชาติ (FAO) ใช้ตัวเลขนี้ในการชี้วัดประสิทธิภาพการทำเกษตร หาก Yield Gap กว้าง แปลว่าเกษตรกรยังขาดเทคโนโลยี ขาดน้ำ หรือจัดการดินและศัตรูพืชได้ไม่ดีพอ.":"The Yield Gap is the difference between the 'Potential Yield' (the theoretical maximum yield achievable under perfect environmental conditions and optimal crop genetics) and the 'Actual Yield' harvested by farmers. The FAO uses this metric to assess agricultural efficiency. A wide gap indicates inefficiencies such as poor soil management, lack of irrigation, sub-optimal pest control, or lack of access to technology."} />
        <FAQItem q={lang==="TH"?"อะไรคือสาเหตุหลักที่ทำให้เกิด Yield Gap ในประเทศไทย?":"What are the main causes of Yield Gap in Thailand?"} a={lang==="TH"?"สาเหตุหลักประกอบด้วย: 1) ข้อจำกัดด้านน้ำ (ฝนทิ้งช่วง หรือไม่มีระบบชลประทานเข้าถึง) 2) การเสื่อมโทรมของดิน (ดินขาดอินทรียวัตถุ, ดินเป็นกรด) 3) การระบาดของแมลงศัตรูพืชและโรคพืช 4) การเลือกใช้เมล็ดพันธุ์ที่ไม่ทนทานต่อสภาพอากาศท้องถิ่น 5) การใส่ปุ๋ยไม่ตรงตามความต้องการของดิน (ไม่ตรวจดินก่อนปลูก) การปิดช่องว่างเหล่านี้คือหัวใจของการทำ 'เกษตรแม่นยำ' (Precision Agriculture).":"Main causes include: 1) Water constraints (droughts, lack of irrigation infrastructure). 2) Soil degradation (low organic matter, acidity). 3) Pest and disease outbreaks. 4) Using sub-optimal seed varieties not adapted to the local microclimate. 5) Blanket fertilizer application without prior soil testing. Closing this gap is the primary goal of 'Precision Agriculture'."} />
        <FAQItem q={lang==="TH"?"การลด Yield Gap มีประโยชน์ต่อเศรษฐกิจอย่างไร?":"How does closing the Yield Gap benefit the economy?"} a={lang==="TH"?"การลด Yield Gap เป็นการเพิ่มปริมาณผลผลิตในพื้นที่เท่าเดิม (ไม่ต้องถางป่าเพิ่ม) ทำให้ต้นทุนต่อหน่วย (Cost per kg) ของเกษตรกรลดลง กำไรสุทธิเพิ่มขึ้น ช่วยแก้ปัญหาความยากจนในภาคเกษตร นอกจากนี้ ในระดับมหภาค ยังช่วยเพิ่มความมั่นคงทางอาหาร (Food Security) ของโลกที่ประชากรกำลังเติบโตขึ้นอย่างรวดเร็ว.":"Closing the Yield Gap produces more food on the same amount of land (preventing deforestation). This lowers the marginal cost per kilogram for farmers, directly boosting net profits and alleviating rural poverty. On a macro level, closing the global yield gap is essential to ensuring global Food Security for a rapidly growing population without expanding agricultural frontiers."} />
        </SEOFAQ>
      </div>
    </div>
  );
}
