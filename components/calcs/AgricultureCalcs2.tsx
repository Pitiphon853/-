"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, NumericInput, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { TreePine, CalendarClock, Droplets, Leaf } from "lucide-react";

// =========================================================================
// Durian Calculator (คำนวณทุเรียน)
// =========================================================================
export function DurianCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [tab, setTab] = useState<"harvest" | "plant">("harvest");
  
  // Harvest state
  const [flowerDate, setFlowerDate] = useLocalState("calc_durian_flower", "");
  const [variety, setVariety] = useLocalState("calc_durian_variety", "monthong");
  
  // Planting state
  const [areaRai, setAreaRai] = useLocalState("calc_durian_rai", "1");
  const [spacing, setSpacing] = useLocalState("calc_durian_spacing", "8x8");

  // Harvest calculation
  let harvestDateStr = "";
  let harvestDays = 0;
  if (flowerDate) {
    if (variety === "monthong") harvestDays = 115; // 110-120
    if (variety === "chanee") harvestDays = 105; // 100-110
    if (variety === "kanyao") harvestDays = 125; // 120-130
    if (variety === "puangmanee") harvestDays = 100; // 90-100
    if (variety === "kradum") harvestDays = 90; // 85-95

    const dateObj = new Date(flowerDate);
    if (!isNaN(dateObj.getTime())) {
      dateObj.setDate(dateObj.getDate() + harvestDays);
      harvestDateStr = dateObj.toLocaleDateString(lang === "TH" ? "th-TH" : "en-US", {
        year: "numeric", month: "long", day: "numeric"
      });
    }
  }

  // Planting calculation
  let treeCount = 0;
  let waterNeed = 0; // liters per day roughly for mature tree
  const raiToSqM = 1600;
  if (areaRai && parseFloat(areaRai) > 0) {
    const totalSqM = parseFloat(areaRai) * raiToSqM;
    let spacePerTree = 64; // 8x8
    if (spacing === "10x10") spacePerTree = 100;
    if (spacing === "9x9") spacePerTree = 81;
    if (spacing === "8x10") spacePerTree = 80;
    
    // typically about 80% of land is usable
    const usableSqM = totalSqM * 0.85; 
    treeCount = Math.floor(usableSqM / spacePerTree);
    waterNeed = treeCount * 150; // mature tree needs ~150L/day
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-white/5 rounded-xl overflow-x-auto">
        <button 
          onClick={() => setTab("harvest")}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${tab === "harvest" ? "bg-white dark:bg-white/10 text-green-600 shadow-sm" : "text-gray-500 hover:text-green-600"}`}
        >
          {lang === "TH" ? "คำนวณวันตัดทุเรียน (Harvest)" : "Harvest Calculator"}
        </button>
        <button 
          onClick={() => setTab("plant")}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${tab === "plant" ? "bg-white dark:bg-white/10 text-green-600 shadow-sm" : "text-gray-500 hover:text-green-600"}`}
        >
          {lang === "TH" ? "คำนวณการปลูกและปุ๋ย (Planting)" : "Planting & Fertilizer"}
        </button>
      </div>

      <div id="durian-result">
        {tab === "harvest" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{lang === "TH" ? "วันที่ดอกบาน (ระยะหางแย้ไหม้)" : "Date of Fruit Set (Flower Bloom)"}</label>
                <input type="date" value={flowerDate} onChange={(e) => setFlowerDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "สายพันธุ์ทุเรียน" : "Durian Variety"}</label>
                <select value={variety} onChange={(e) => setVariety(e.target.value)} className={inputClass}>
                  <option value="monthong">{lang === "TH" ? "หมอนทอง (110-120 วัน)" : "Monthong (110-120 days)"}</option>
                  <option value="chanee">{lang === "TH" ? "ชะนี (100-110 วัน)" : "Chanee (100-110 days)"}</option>
                  <option value="kanyao">{lang === "TH" ? "ก้านยาว (120-130 วัน)" : "Kanyao (120-130 days)"}</option>
                  <option value="puangmanee">{lang === "TH" ? "พวงมณี (90-100 วัน)" : "Puangmanee (90-100 days)"}</option>
                  <option value="kradum">{lang === "TH" ? "กระดุม (85-95 วัน)" : "Kradum (85-95 days)"}</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <CalendarClock className="w-12 h-12 text-green-500 mb-4" />
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{lang === "TH" ? "กำหนดวันตัดที่เหมาะสม (โดยประมาณ)" : "Estimated Harvest Date"}</div>
              {harvestDateStr ? (
                <>
                  <div className="text-3xl font-black mb-2 text-green-600 dark:text-green-400">{harvestDateStr}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {lang === "TH" ? `ใช้เวลาสุกประมาณ ${harvestDays} วัน` : `Requires approx. ${harvestDays} days to ripen`}
                  </div>
                </>
              ) : (
                <div className="text-gray-400">-</div>
              )}
            </div>
          </div>
        )}

        {tab === "plant" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{lang === "TH" ? "พื้นที่ปลูก (ไร่)" : "Land Area (Rai)"}</label>
                <NumericInput value={areaRai} onChange={setAreaRai} placeholder="เช่น 5" min="0" />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "ระยะปลูก (เมตร)" : "Tree Spacing (Meters)"}</label>
                <select value={spacing} onChange={(e) => setSpacing(e.target.value)} className={inputClass}>
                  <option value="8x8">8 x 8 {lang === "TH" ? "เมตร (ยอดนิยม)" : "meters (Popular)"}</option>
                  <option value="9x9">9 x 9 {lang === "TH" ? "เมตร" : "meters"}</option>
                  <option value="8x10">8 x 10 {lang === "TH" ? "เมตร" : "meters"}</option>
                  <option value="10x10">10 x 10 {lang === "TH" ? "เมตร (ทรงพุ่มใหญ่)" : "meters (Wide canopy)"}</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <TreePine className="w-12 h-12 text-green-500 mb-4" />
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{lang === "TH" ? "จำนวนต้นที่ปลูกได้โดยประมาณ" : "Estimated Number of Trees"}</div>
              {treeCount > 0 ? (
                <>
                  <div className="text-4xl font-black mb-2 text-green-600 dark:text-green-400">{treeCount}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{lang === "TH" ? "ต้น" : "Trees"}</div>
                  
                  <div className="w-full text-left bg-gray-100 dark:bg-white/10 p-4 rounded-xl mt-2 text-sm">
                    <p className="font-bold flex items-center gap-2 mb-2"><Droplets className="w-4 h-4 text-blue-500"/> {lang === "TH" ? "ความต้องการน้ำ (เมื่อโตเต็มที่):" : "Water needs (Mature):"}</p>
                    <p>{lang === "TH" ? `ประมาณ ${waterNeed.toLocaleString()} ลิตร/วัน/ทั้งสวน` : `Approx. ${waterNeed.toLocaleString()} Liters/day/orchard`}</p>
                  </div>
                </>
              ) : (
                <div className="text-gray-400">-</div>
              )}
            </div>
          </div>
        )}
      </div>

      <ExportResult elementId="durian-result" fileName="durian-calc" lang={lang} />

      <CalculationSteps
        title={lang === "TH" ? "หลักการคำนวณ" : "Calculation Methods"}
        steps={lang === "TH" ? [
          "วันตัดทุเรียน: เริ่มนับจากระยะ 'หางแย้ไหม้' (ดอกบานเต็มที่และกลีบร่วงหมด) ไปจนถึงอายุเก็บเกี่ยวของแต่ละสายพันธุ์",
          "หมอนทอง: 110-120 วัน, ชะนี: 100-110 วัน, ก้านยาว: 120-130 วัน",
          "จำนวนต้นต่อไร่: (1,600 ตารางเมตร x 0.85 (หักพื้นที่ร่องน้ำและทางเดิน)) ÷ (ระยะปลูก กว้าง x ยาว)",
          "ความต้องการน้ำอ้างอิง: ทุเรียนที่ให้ผลผลิตแล้วต้องการน้ำประมาณ 150 ลิตร/ต้น/วัน ในช่วงหน้าแล้ง"
        ] : [
          "Harvest Date: Counted from the day of fruit set (when petals fall off) plus the variety's ripening period.",
          "Monthong: 110-120 days, Chanee: 100-110 days, Kanyao: 120-130 days.",
          "Tree Count: (1,600 sq.m * 0.85 usable area) / (Spacing Width x Length).",
          "Water Needs: A mature bearing durian tree needs approx. 150 Liters of water per day during the dry season."
        ]}
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การทำสวนทุเรียน)" : "Durian Farming FAQs"}>
        <FAQItem
          q={lang === "TH" ? "การนับอายุทุเรียนเพื่อตัด เริ่มนับจากตอนไหน?" : "When do you start counting the days for durian harvest?"}
          a={lang === "TH"
            ? "การนับอายุทุเรียนที่แม่นยำที่สุดเพื่อให้ได้เปอร์เซ็นต์แป้งตามมาตรฐานส่งออก จะเริ่มนับจาก 'ระยะหางแย้ไหม้' ซึ่งก็คือช่วงที่ดอกทุเรียนบานเต็มที่และกลีบดอกร่วงหล่นลงมาจนหมด เหลือเพียงเกสรตัวเมียที่มีลักษณะคล้ายหางแย้และเริ่มมีสีน้ำตาลไหม้ (Fruit Set) เกษตรกรควรจดบันทึกวันที่หางแย้ไหม้ของแต่ละรุ่นแต่ละต้นไว้ เพื่อให้สามารถประเมินวันตัดได้อย่างแม่นยำที่สุด ทุเรียนที่ตัดก่อนกำหนด (ทุเรียนอ่อน) จะมีเปอร์เซ็นต์แป้งต่ำ เนื้อไม่สีเหลืองทอง และรสชาติไม่อร่อย"
            : "To accurately determine the harvest date and ensure standard starch percentage for export, counting starts from the 'Fruit Set' stage (locally known as the 'burnt rat tail' stage). This is when the durian flower has fully bloomed, all petals have fallen off, and the pistil turns brown. Farmers must record this date for each batch. Harvesting prematurely results in unripe durian with low starch, poor color, and bland taste."}
        />
        <FAQItem
          q={lang === "TH" ? "ควรเลือกปลูกทุเรียนระยะเท่าไหร่ดี 8x8 หรือ 10x10?" : "Which planting distance is better: 8x8m or 10x10m?"}
          a={lang === "TH"
            ? "การเลือกระยะปลูกขึ้นอยู่กับการจัดการและขนาดพื้นที่ 1) ระยะ 8x8 เมตร (ปลูกได้ประมาณ 20 ต้น/ไร่) เป็นระยะยอดนิยมในปัจจุบัน เหมาะสำหรับการตัดแต่งกิ่งแบบควบคุมทรงพุ่ม (ไม่ให้ต้นสูงเกินไป) ทำให้ฉีดยา โยงกิ่ง และเก็บเกี่ยวได้ง่าย 2) ระยะ 10x10 หรือ 12x12 เมตร (ปลูกได้ประมาณ 10-12 ต้น/ไร่) เหมาะสำหรับสายพันธุ์ที่ทรงพุ่มแผ่กว้าง เช่น ก้านยาว หรือผู้ที่ต้องการปล่อยต้นทุเรียนให้ใหญ่ตามธรรมชาติ ระยะห่างที่กว้างจะช่วยให้อากาศถ่ายเทได้ดี ลดปัญหาเชื้อราไฟทอปธอรา (Phytophthora) และกิ่งไม่ชนกันเมื่อต้นอายุเกิน 15 ปี"
            : "Choosing the right distance depends on orchard management: 1) 8x8 meters (approx. 20 trees/rai) is currently popular for intensive management. It requires regular pruning to control canopy size, making pesticide spraying, branch tying, and harvesting easier. 2) 10x10 meters (approx. 12 trees/rai) is better for wide-canopy varieties like Kanyao or if you allow natural growth. Wider spacing improves airflow, reducing fungal diseases (Phytophthora) and preventing branches from overlapping when trees are older than 15 years."}
        />
        <FAQItem
          q={lang === "TH" ? "โปรแกรมการใส่ปุ๋ยทุเรียนตามช่วงอายุควรทำอย่างไร?" : "What is the recommended fertilizer schedule for durian trees?"}
          a={lang === "TH"
            ? "การจัดการปุ๋ยทุเรียนแบ่งตามช่วงอายุ: 1) ทุเรียนเล็ก (1-3 ปี) เน้นการสร้างใบและทรงพุ่ม ควรใช้ปุ๋ยเคมีสูตรตัวหน้าสูง (เช่น 25-7-7 หรือ 15-0-0) สลับกับปุ๋ยคอกหรือปุ๋ยอินทรีย์ ใส่ทีละน้อยแต่บ่อยครั้ง (ทุก 1-2 เดือน) 2) ทุเรียนเตรียมเอาผล (4 ปีขึ้นไป) ช่วงสะสมอาหารก่อนออกดอก (ปลายฤดูฝน) ให้ใช้สูตรตัวกลางและหลังสูง (เช่น 8-24-24) เพื่อกระตุ้นการสร้างตาดอก 3) ช่วงติดผลและขยายผล (หางแย้-60 วัน) ให้ปุ๋ยสูตรเสมอ (เช่น 16-16-16) เพื่อสร้างเนื้อ 4) ช่วงก่อนเก็บเกี่ยว 30-45 วัน ให้ปุ๋ยสูตรตัวหลังสูง (เช่น 0-0-50 หรือ 15-5-20) เพื่อเพิ่มความหวาน สีเนื้อ และคุณภาพแป้ง ทั้งนี้ควรตรวจสอบค่า pH ดินให้อยู่ที่ 5.5-6.5 เสมอ"
            : "Fertilizer programs depend on age and stage: 1) Young trees (1-3 yrs): Focus on canopy growth using high Nitrogen (e.g., 25-7-7) alternated with organic compost. Apply small amounts frequently. 2) Pre-flowering (mature trees): Late rainy season, use high Phosphorus and Potassium (e.g., 8-24-24) to promote flower buds. 3) Fruit expansion (Fruit set to 60 days): Use a balanced formula (e.g., 16-16-16). 4) Pre-harvest (30-45 days before cutting): Use high Potassium (e.g., 0-0-50) to increase sweetness, starch content, and flesh color. Always maintain soil pH between 5.5 and 6.5."}
        />
      </SEOFAQ>
      
      <RelatedCalcs links={[{id: "fertilizer", name: "Fertilizer Calc"}, {id: "irrigation", name: "Irrigation Calc"}]} lang={lang} setCalc={setCalc} />
    </div>
  );
}
