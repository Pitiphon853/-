"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { 
  useLocalState, 
  inputClass, 
  labelClass, 
  NumericInput, 
  SEOFAQ, 
  FAQItem, 
  CalculationSteps, 
  ExportResult 
} from "./shared";
import { 
  Shirt, 
  Coins, 
  Sparkles, 
  Scissors, 
  Heart, 
  Play, 
  Coffee, 
  Flame, 
  AlertCircle,
  Eye,
  Tv
} from "lucide-react";

// ============================================================================
// 1. Cost Per Wear (ID: cost-per-wear)
// ============================================================================
export function CostPerWear({ lang, setCalc }: { lang: Lang; setCalc?: (id: string) => void }) {
  const [price, setPrice] = useLocalState("cpw-price", "3000");
  const [maintenance, setMaintenance] = useLocalState("cpw-maint", "200");
  const [wears, setWears] = useLocalState("cpw-wears", "50");

  const priceNum = Number(price) || 0;
  const maintNum = Number(maintenance) || 0;
  const wearsNum = Math.max(1, Number(wears) || 1);

  const costPerWear = (priceNum + maintNum) / wearsNum;

  // Evaluation logic
  let ratingTextTH = "";
  let ratingTextEN = "";
  let ratingColor = "";

  if (costPerWear <= 50) {
    ratingTextTH = "คุ้มค่าระดับตำนาน (Super Value) - ใส่บ่อยจนคุ้มค่าตัวแล้ว!";
    ratingTextEN = "Legendary Value - Highly cost-effective per wear!";
    ratingColor = "text-green-600 dark:text-green-400";
  } else if (costPerWear <= 200) {
    ratingTextTH = "คุ้มค่าปานกลาง (Good Buy) - ราคาเฉลี่ยต่อครั้งสมเหตุสมผล";
    ratingTextEN = "Good Value - Reasonable cost per wear.";
    ratingColor = "text-blue-600 dark:text-blue-400";
  } else if (costPerWear <= 500) {
    ratingTextTH = "ยังไม่ค่อยคุ้ม (Expensive Wear) - ควรหาโอกาสสวมใส่อีกบ่อยๆ";
    ratingTextEN = "Pricey - Recommend wearing it more often.";
    ratingColor = "text-yellow-600 dark:text-yellow-400";
  } else {
    ratingTextTH = "ยังไม่คุ้มค่าอย่างยิ่ง (Luxury Statement) - ใส่เฉลี่ยราคาแพงมากต่อครั้ง";
    ratingTextEN = "Luxury/Inefficient - Extremely high cost per wear.";
    ratingColor = "text-red-600 dark:text-red-400";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-4">
          <Shirt className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณ Cost per Wear (ต้นทุนต่อการใส่)" : "Cost per Wear Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "วัดความคุ้มค่าของเสื้อผ้าและของใช้แฟชั่น เพื่อการตัดสินใจซื้อที่ชาญฉลาดและรักษ์โลก" 
            : "Evaluate the cost efficiency of clothing and fashion items."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "กรอกข้อมูลสินค้า" : "Item Information"}</h3>
          
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาสินค้า (บาท)" : "Item Price (THB)"}</label>
            <NumericInput value={price} onChange={setPrice} placeholder="3,000" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าซ่อม/บำรุงรักษา/สปา/ซักแห้งสะสม (บาท)" : "Maintenance Cost (THB)"}</label>
            <NumericInput value={maintenance} onChange={setMaintenance} placeholder="200" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนครั้งที่ใส่ (ครั้ง)" : "Times Worn"}</label>
            <NumericInput value={wears} onChange={setWears} placeholder="50" />
          </div>
        </div>

        <div id="cpw-result-card" className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 p-6 rounded-3xl border border-pink-100 dark:border-pink-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "ผลการประเมินความคุ้มค่า" : "Cost per Wear Result"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ต้นทุนต่อการสวมใส่ 1 ครั้ง" : "Cost per Wear"}</p>
                <p className="text-5xl font-black text-pink-600 dark:text-pink-400 mt-1">
                  {costPerWear.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-lg font-bold ml-2">฿ / ครั้ง</span>
                </p>
              </div>

              <div className="pt-4 border-t border-pink-100 dark:border-pink-900/30">
                <p className="text-sm text-gray-500 mb-1">{lang === "TH" ? "ระดับความคุ้มค่า:" : "Value Rating:"}</p>
                <p className={`text-base font-bold ${ratingColor}`}>
                  {lang === "TH" ? ratingTextTH : ratingTextEN}
                </p>
              </div>

              <div className="text-xs text-gray-400 space-y-1">
                <p>{lang === "TH" ? `* ราคารวมสุทธิ: ${(priceNum + maintNum).toLocaleString()} บาท` : `* Total Cost: ${(priceNum + maintNum).toLocaleString()} THB`}</p>
                <p>{lang === "TH" ? `* จำนวนการใช้งาน: ${wearsNum.toLocaleString()} ครั้ง` : `* Total Wears: ${wearsNum.toLocaleString()} times`}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="cpw-result-card" fileName="cost-per-wear" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "สูตรการคำนวณ" : "Calculation Method"}
        steps={
          lang === "TH" 
            ? [
                "สูตร: Cost per Wear = (ราคาสินค้า + ค่าบำรุงรักษา) / จำนวนครั้งที่ใช้งาน",
                "ตัวอย่าง: ซื้อรองเท้า 3,000 บาท บำรุงรักษา 200 บาท ใส่ไป 50 ครั้ง จะได้ (3,000 + 200) / 50 = 64 บาทต่อครั้ง",
                "แนวคิดหลักคือ ยิ่งคุณสวมใส่สิ่งของชิ้นนั้นบ่อยขึ้นเท่าไร ต้นทุนเฉลี่ยต่อการใช้งานก็จะยิ่งต่ำลงและสร้างความคุ้มค่าสูงสุด"
              ]
            : [
                "Formula: Cost per Wear = (Item Price + Maintenance Costs) / Times Worn",
                "Example: A 3,000 THB item with 200 THB maintenance worn 50 times = (3,000 + 200) / 50 = 64 THB per wear.",
                "The core principle is: the more you wear an item, the lower its average cost per wear becomes, maximizing its value."
              ]
        }
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับ Cost per Wear" : "Cost per Wear FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Cost per Wear คืออะไร และทำไมสายแฟชั่นยุคใหม่ถึงให้ความสำคัญ?" : "What is Cost per Wear (CPW)?"}
          a={lang === "TH" ? 
            "Cost per Wear (CPW) คือ แนวคิดในการคำนวณความคุ้มค่าที่แท้จริงของเสื้อผ้า รองเท้า กระเป๋า หรือแม้แต่อุปกรณ์แฟชั่นอื่นๆ โดยนำเอาราคาซื้อทั้งหมดรวมกับค่าซ่อมแซมทำความสะอาดที่เกิดขึ้นสะสม แล้วหารด้วยจำนวนครั้งที่มีการสวมใส่จริง วิธีคิดแบบนี้ช่วยเปลี่ยนทัศนคติของผู้บริโภคยุคใหม่ให้หันมาตระหนักถึงความคุ้มค่าทางการเงินและการส่งเสริมสิ่งแวดล้อมอย่างยั่งยืน แทนที่จะไปเน้นซื้อเสื้อผ้าฟาสต์แฟชั่นราคาถูกแต่มีคุณภาพต่ำและสวมใส่เพียงไม่กี่ครั้งแล้วกลายเป็นขยะ การเลือกซื้อเสื้อผ้าคุณภาพสูงที่มีราคาสูงขึ้นเล็กน้อยแต่ใช้งานได้ยาวนานหลายสิบหรือร้อยครั้ง จะช่วยลดภาระค่าใช้จ่ายระยะยาวและส่งเสริมอุตสาหกรรมสิ่งทอที่เป็นมิตรต่อสิ่งแวดล้อมได้ดีกว่า"
            : "Cost per Wear (CPW) is a financial and sustainability concept that calculates the true value of fashion items by dividing the total purchase price plus maintenance costs by the number of times worn."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีการคำนวณและตัวอย่างการประเมินความคุ้มค่าแบบเจาะลึกทำอย่างไร?" : "How to calculate CPW and deep-dive examples?"}
          a={lang === "TH" ? 
            "สูตรคณิตศาสตร์พื้นฐานคือ CPW = (ราคาสินค้า + ค่าบำรุงรักษา) / จำนวนครั้งที่ใส่ ตัวอย่างเปรียบเทียบที่เห็นภาพชัดเจนที่สุดคือ: สถานการณ์ A คุณซื้อเสื้อแจ็กเก็ตยีนส์คุณภาพดีราคา 4,500 บาท มาใส่ทำงานและไปเที่ยวเฉลี่ยสัปดาห์ละ 2 ครั้ง เป็นเวลา 2 ปี (รวมสวมใส่ประมาณ 200 ครั้ง) ผลลัพธ์ CPW จะอยู่ที่เพียง 22.50 บาทต่อครั้ง สถานการณ์ B คุณซื้อเสื้อแจ็กเก็ตแฟชั่นตามกระแสราคา 990 บาท แต่อัดกาวและซับในไม่ดี ซักเครื่องได้ 3 ครั้งก็หดและเสียทรงจนต้องทิ้ง (รวมสวมใส่ 3 ครั้ง) ผลลัพธ์ CPW จะสูงถึง 330.00 บาทต่อครั้ง จะเห็นได้ว่าถึงแม้เสื้อแจ็กเก็ตตัวแรกจะมีราคาแพงกว่าตัวที่สองถึง 4.5 เท่าในวันซื้อ แต่ในความเป็นจริงมันคุ้มค่ากว่าตัวที่สองถึง 14.6 เท่าในแง่ของความทนทานและการสวมใส่"
            : "Simply add the cost and upkeep, then divide by wears. A 4,500 THB jacket worn 200 times costs 22.50 THB per wear, whereas a 990 THB fast-fashion item ruined after 3 washes costs 330 THB per wear."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "สินค้าแฟชั่นประเภทใดบ้างที่คุ้มค่าแก่การลงทุนด้วยสัดส่วนงบประมาณที่สูง?" : "Which items are worth investing in?"}
          a={lang === "TH" ? 
            "ประเภทของสินค้าที่คุ้มค่าแก่การซื้อสินค้าเกรดพรีเมียมราคาสูงมักจะเป็นชิ้นฐานราก (Core Wardrobe Basics) ที่หยิบมาสวมใส่ซ้ำๆ ได้เป็นปีๆ เช่น 1. รองเท้าหนังคุณภาพดีหรือรองเท้าผ้าใบสายคลาสสิกที่สามารถเปลี่ยนพื้นหรือซ่อมแซมได้ 2. เสื้อเบลเซอร์หรือสูทสั่งตัดที่มีรูปทรงเข้ากับสรีระได้พอดี 3. กางเกงยีนส์เดนิมเนื้อดี 4. กระเป๋าทำงานดีไซน์เรียบหรูทำจากหนังแท้ที่มีความคงทน สิ่งของเหล่านี้จะมีอายุการใช้งานยาวนานและมิกซ์แอนด์แมทช์ได้หลากหลาย ส่งผลให้ค่า Cost per Wear ลดลงอย่างรวดเร็ว ส่วนกลุ่มเสื้อผ้าที่มีลวดลายตามกระแสจัดจ้าน เสื้อผ้าที่ใช้เฉพาะในโอกาสพิเศษ เช่น ชุดแต่งงาน หรือเสื้อผ้าที่ทนต่อการซักรีดต่ำ ควรพิจารณาใช้งบประหยัดหรือใช้บริการเช่าชุดแทน"
            : "Invest in high-quality capsule wardrobe items like leather shoes, tailoring, denim, and functional work bags. Avoid spending heavily on micro-trend clothes or one-time occasion wear."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "แนวคิด CPW ช่วยให้เราพัฒนาไปสู่ตู้เสื้อผ้าแบบยั่งยืน (Slow Fashion) ได้อย่างไร?" : "How does CPW support sustainable fashion?"}
          a={lang === "TH" ? 
            "แนวคิด Cost per Wear เป็นสะพานเชื่อมที่เปลี่ยนเราไปสู่กระบวนการบริโภคที่ยั่งยืน (Slow Fashion) เมื่อเราเริ่มนำตัวเลข CPW มาจับกับตู้เสื้อผ้า เราจะเริ่มเปลี่ยนพฤติกรรมจากการช้อปปิ้งเพื่อความสะใจระยะสั้น ไปสู่การไตร่ตรองถึงความทนทานและการใช้ประโยชน์ในระยะยาว ช่วยลดการผลิตขยะสิ่งทอและลดมลพิษจากโรงงานฟาสต์แฟชั่นที่ใช้น้ำและสารเคมีปริมาณมหาศาล ยิ่งไปกว่านั้น มันทำให้เราเห็นความจำเป็นในการดูแลรักษาสิ่งของอย่างทะนุถนอม เช่น การซักถนอมใยผ้า การส่งไปซ่อมแซม แทนที่จะทิ้งขว้างทันทีที่ด้ายขาดหรือซิปพัง ซึ่งเป็นจุดเริ่มต้นของสังคมคาร์บอนต่ำที่เริ่มได้จากตู้เสื้อผ้าของตัวเราเอง"
            : "CPW encourages mindful consumerism. By measuring durability and long-term utility, it shifts shopping behavior away from disposable fast fashion towards high-quality, long-lasting alternatives."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 2. Wardrobe Budget (ID: wardrobe-budget)
// ============================================================================
export function WardrobeBudget({ lang }: { lang: Lang }) {
  const [monthlyIncome, setMonthlyIncome] = useLocalState("wb-income", "30000");
  const [percent, setPercent] = useLocalState("wb-percent", "5");

  const income = Number(monthlyIncome) || 0;
  const pct = Number(percent) || 0;

  const annualBudget = income * 12 * (pct / 100);
  const monthlyBudget = income * (pct / 100);

  // Suggested allocation: 50% Basics, 30% Statement, 20% Accessories & Shoes
  const basics = monthlyBudget * 0.5;
  const statement = monthlyBudget * 0.3;
  const accessories = monthlyBudget * 0.2;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
          <Coins className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณงบประมาณเสื้อผ้าต่อปี" : "Annual Wardrobe Budget Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "วางแผนจัดสรรรายได้เพื่อซื้อเสื้อผ้า เครื่องประดับอย่างสมเหตุสมผล ไม่เป็นภาระทางการเงิน" 
            : "Plan and allocate clothing budget wisely without hurting your monthly savings."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "ข้อมูลรายได้และสัดส่วน" : "Income Details"}</h3>
          
          <div>
            <label className={labelClass}>{lang === "TH" ? "รายได้เฉลี่ยต่อเดือน (บาท)" : "Monthly Income (THB)"}</label>
            <NumericInput value={monthlyIncome} onChange={setMonthlyIncome} placeholder="30,000" />
          </div>

          <div>
            <label className={labelClass}>
              {lang === "TH" ? `สัดส่วนงบเสื้อผ้า (${pct}%)` : `Clothing Budget % (${pct}%)`}
            </label>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={percent} 
              onChange={e => setPercent(e.target.value)} 
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-green-400"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1% (รัดเข็มขัด)</span>
              <span>5% (แนะนำ)</span>
              <span>15% (ช้อปจุใจ)</span>
            </div>
          </div>
        </div>

        <div id="wb-result-card" className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-3xl border border-green-100 dark:border-green-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "ผลการคำนวณงบประมาณ" : "Budget Breakdown Results"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "งบซื้อเสื้อผ้าต่อปี" : "Annual Clothing Budget"}</p>
                <p className="text-4xl font-black text-green-600 dark:text-green-400 mt-1">
                  {annualBudget.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-base font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "เฉลี่ยงบซื้อเสื้อผ้าต่อเดือน" : "Monthly Clothing Budget"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {monthlyBudget.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / เดือน</span>
                </p>
              </div>

              <div className="pt-4 border-t border-green-100 dark:border-green-900/30 space-y-2">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{lang === "TH" ? "การกระจายงบประมาณที่แนะนำรายเดือน:" : "Recommended Monthly Distribution:"}</p>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{lang === "TH" ? "50% เสื้อผ้าพื้นฐาน (Basics):" : "50% Wardrobe Basics:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{basics.toLocaleString()} ฿</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{lang === "TH" ? "30% แฟชั่น/ออกงาน (Statement):" : "30% Statement & Trends:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{statement.toLocaleString()} ฿</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{lang === "TH" ? "20% เครื่องประดับ/รองเท้า (Accessories):" : "20% Accessories & Shoes:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{accessories.toLocaleString()} ฿</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="wb-result-card" fileName="wardrobe-budget" lang={lang} />
          </div>
        </div>
      </div>

      <CalculationSteps 
        title={lang === "TH" ? "แนวทางปฏิบัติการใช้งบเสื้อผ้า" : "Budget Guideline Tips"}
        steps={
          lang === "TH"
            ? [
                "งบประมาณรายปีคำนวณโดย: รายได้ต่อเดือน × 12 × (เปอร์เซ็นต์ที่กำหนด / 100)",
                "งบรายเดือนแนะนำสำหรับเสื้อผ้าไม่ควรเกิน 3% ถึง 5% ของรายได้ เพื่อความปลอดภัยทางการเงิน",
                "สัดส่วน 50/30/20 ช่วยในการป้องกันพฤติกรรมการซื้อสะเปะสะปะตามอารมณ์"
              ]
            : [
                "Annual budget is calculated as: Monthly Income × 12 × (Percentage / 100).",
                "Personal finance guidelines recommend keeping clothing expenses below 3-5% of net income.",
                "The 50/30/20 rule helps create a highly functional wardrobe without overspending."
              ]
        }
      />

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับงบประมาณเสื้อผ้า" : "Wardrobe Budget FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "สัดส่วนงบประมาณเสื้อผ้าที่เหมาะสมและปลอดภัยที่สุดทางการเงินควรเป็นอย่างไร?" : "What is a safe clothing budget percentage?"}
          a={lang === "TH" ? 
            "นักวางแผนและที่ปรึกษาทางการเงินส่วนบุคคลมักจะแนะนำเป็นกฎพื้นฐานว่า งบประมาณทั้งหมดสำหรับเสื้อผ้า เครื่องแต่งกาย และรองเท้า ไม่ควรเกิน 3% ถึง 5% ของรายได้สุทธิหลังหักภาษีในแต่ละเดือน ตัวอย่างเช่น หากคุณเป็นมนุษย์เงินเดือนที่มีรายได้สุทธิ 30,000 บาทต่อเดือน งบประมาณสำหรับเสื้อผ้าแฟชั่นที่สมเหตุสมผลและไม่ส่งผลเสียต่อการออมเงินในระยะยาวควรอยู่ที่ประมาณ 900 บาท ถึง 1,500 บาทต่อเดือน การกำหนดกรอบงบประมาณนี้อย่างสม่ำเสมอจะช่วยให้คุณแต่งตัวเข้าสังคมได้อย่างมั่นใจและมีบุคลิกภาพที่ดี โดยไม่สร้างหนี้บัตรเครดิตสะสม หรือกระทบต่อรายจ่ายที่จำเป็น เช่น ค่าอาหาร ค่าที่อยู่อาศัย หรือเงินลงทุนเพื่อการเกษียณ"
            : "Financially safe guidelines suggest spending 3% to 5% of your net monthly take-home pay on clothes and accessories. This keeps you styling without building credit card debt."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "สูตรจัดสรรงบประมาณเสื้อผ้าแบบ 50-30-20 มีความหมายและหลักการนำไปใช้อย่างไร?" : "How does the 50-30-20 wardrobe rule work?"}
          a={lang === "TH" ? 
            "สูตรจัดสรร 50-30-20 ในหมวดเสื้อผ้าเป็นแนวทางจัดระเบียบตู้เสื้อผ้าให้คุ้มค่าสูงสุด: 1. แบ่งงบ 50% สำหรับ Basics (เสื้อผ้าหลัก) เป็นสิ่งของที่มีโทนสีเรียบๆ เช่น ขาว ดำ เทา ครีม กางเกงยีนส์ทรงคลาสสิก หรือเสื้อยืดคัตติ้งดีๆ ที่สามารถใส่ได้บ่อยและเข้ากับสไตล์หลากหลาย 2. แบ่งงบ 30% สำหรับ Statement Items (เสื้อผ้าเด่นตามกระแส) เช่น เสื้อผ้าลวดลายแฟชั่น สีสันสดใส หรือเสื้อผ้าสำหรับใส่ร่วมงานเลี้ยงสังสรรค์ในโอกาสพิเศษ 3. แบ่งงบ 20% สำหรับ Accessories (เครื่องเคียง) เช่น กระเป๋าถือ รองเท้า เข็มขัด หรือแว่นตา เพื่อเข้ามาเสริมและเปลี่ยนภาพลักษณ์โดยรวมให้ดูน่าสนใจขึ้น การแบ่งเช่นนี้ช่วยลดปัญหาการเสียเงินก้อนโตกับเสื้อผ้าสีฉูดฉาดที่ใส่ได้เพียงครั้งเดียว"
            : "50% goes to classic, versatile basics; 30% for eye-catching statement pieces and trends; and 20% for vital accessories like shoes and belts that elevate your outfit."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เราจะประหยัดงบเสื้อผ้าลงได้อย่างไรโดยไม่ทำให้ดูเชยหรือส่งผลกระทบต่อภาพลักษณ์?" : "How to save on clothes without losing style?"}
          a={lang === "TH" ? 
            "การประหยัดงบสามารถทำได้ง่ายๆ โดยการทำบัญชีสำรวจตู้เสื้อผ้า (Wardrobe Audit) ทุกๆ 6 เดือน เพื่อคัดสิ่งที่คุณมีอยู่แล้วแต่หลงลืมออกมาใช้งาน หลีกเลี่ยงการช้อปปิ้งออนไลน์โดยไม่มีวัตถุประสงค์เจาะจง หรือลองประยุกต์ใช้แนวคิด Capsule Wardrobe (คัดสรรเสื้อผ้าให้มีจำนวนน้อยชิ้นแต่เข้ากันได้ทั้งหมด) การหันมาอุดหนุนเสื้อผ้ามือสองที่มีสภาพใหม่เอี่ยม (Second-hand shopping) และการนำเสื้อผ้าตัวโปรดที่มีอยู่ไปแก้ทรงหรือตกแต่งกระดุมใหม่ (Alteration) ก็สามารถช่วยเนรมิตชุดใหม่ในราคาสบายกระเป๋า ที่สำคัญที่สุดคือการใช้กฎ 'รอ 30 วัน' ก่อนตัดสินใจกดจ่ายเงินสำหรับชิ้นที่มีราคาสูง เพื่อวิเคราะห์ให้แน่ใจว่าเกิดจากกิเลสชั่วคราวหรือจำเป็นต้องใช้งานจริง"
            : "Do a wardrobe audit every six months, practice capsule styling, buy quality second-hand apparel, and employ the '30-day rule' before making major luxury clothing purchases."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "หากมีรายได้ไม่สม่ำเสมอ เช่น ทำงานฟรีแลนซ์ ควรคำนวณงบประมาณเสื้อผ้าอย่างไร?" : "How should freelancers budget for clothes?"}
          a={lang === "TH" ? 
            "สำหรับผู้ที่มีรายได้ไม่แน่นอนในแต่ละเดือน (เช่น อาชีพอิสระ ฟรีแลนซ์ หรือค้าขาย) แนะนำให้ใช้ตัวเลขรายได้ต่ำสุดที่คุณเฉลี่ยได้รับต่อเดือน (Minimum Baseline Income) เป็นฐานในการคำนวณงบเสื้อผ้า แทนที่จะใช้รายได้ในเดือนที่พุ่งสูง หรืออีกทางเลือกคือการตั้งเป็น 'งบก้อนรายปี' (Annual Lump Sum) เมื่อได้รับงานโปรเจกต์ใหญ่และหักส่วนเงินออมและภาษีออกเรียบร้อยแล้ว แล้วค่อยโอนสัดส่วนงบซื้อเสื้อผ้าเข้าบัญชีย่อยเพื่อไม่ให้รายจ่ายนี้รั่วไหลไปรวมกับค่าใช้จ่ายจำเป็นในการครองชีพประจำวัน"
            : "Freelancers should use their average minimum baseline monthly income to set their budget, or allocate a annual lump sum from major projects after saving and taxes."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 3. Skincare Routine Cost (ID: skincare-routine-cost)
// ============================================================================
interface SkincareItem {
  id: string;
  nameTH: string;
  nameEN: string;
  price: string;
  months: string;
}

export function SkincareRoutineCost({ lang }: { lang: Lang }) {
  const [items, setItems] = useState<SkincareItem[]>([
    { id: "1", nameTH: "โฟมล้างหน้า / คลีนเซอร์", nameEN: "Cleanser", price: "350", months: "2" },
    { id: "2", nameTH: "โทนเนอร์", nameEN: "Toner", price: "500", months: "3" },
    { id: "3", nameTH: "เซรั่มบำรุงผิว", nameEN: "Serum", price: "1500", months: "3" },
    { id: "4", nameTH: "มอยเจอร์ไรเซอร์", nameEN: "Moisturizer", price: "800", months: "2" },
    { id: "5", nameTH: "ครีมกันแดด", nameEN: "Sunscreen", price: "600", months: "2" },
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemMonths, setNewItemMonths] = useState("");

  const handleUpdateItem = (id: string, field: "price" | "months" | "nameTH", val: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    }));
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    if (!newItemName || !newItemPrice || !newItemMonths) return;
    const newObj: SkincareItem = {
      id: Date.now().toString(),
      nameTH: newItemName,
      nameEN: newItemName,
      price: newItemPrice,
      months: newItemMonths
    };
    setItems([...items, newObj]);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemMonths("");
  };

  let monthlyTotal = 0;
  items.forEach(item => {
    const p = Number(item.price) || 0;
    const m = Math.max(1, Number(item.months) || 1);
    monthlyTotal += p / m;
  });

  const annualTotal = monthlyTotal * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 dark:text-pink-400 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าใช้จ่ายครีมบำรุงผิว (Skincare Cost)" : "Skincare Routine Cost Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "เช็กต้นทุนจริงของสกินแคร์และเครื่องสำอางแต่ละชิ้น เฉลี่ยเป็นยอดรายเดือนและรายปี" 
            : "Estimate your average monthly and yearly skincare product costs."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "ขั้นตอนสกินแคร์ในรูทีนของคุณ" : "Your Skincare Routine"}</h3>
            
            <div className="space-y-4">
              {items.map(item => {
                const itemPrice = Number(item.price) || 0;
                const itemMonths = Math.max(1, Number(item.months) || 1);
                const monthlyCost = itemPrice / itemMonths;

                return (
                  <div key={item.id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex-1 min-w-[150px]">
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                        {lang === "TH" ? item.nameTH : item.nameEN}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lang === "TH" 
                          ? `เฉลี่ยเดือนละ ${monthlyCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} บาท`
                          : `${monthlyCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} THB / month`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <label className="block text-[10px] text-gray-400 font-bold mb-1 uppercase">{lang === "TH" ? "ราคา (฿)" : "Price (฿)"}</label>
                        <input 
                          type="number" 
                          value={item.price} 
                          onChange={e => handleUpdateItem(item.id, "price", e.target.value)} 
                          className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs"
                          placeholder="ราคา"
                        />
                      </div>

                      <div className="w-20">
                        <label className="block text-[10px] text-gray-400 font-bold mb-1 uppercase">{lang === "TH" ? "ใช้ได้ (เดือน)" : "Months"}</label>
                        <input 
                          type="number" 
                          value={item.months} 
                          onChange={e => handleUpdateItem(item.id, "months", e.target.value)} 
                          className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-center"
                          placeholder="เดือน"
                        />
                      </div>

                      <button 
                        onClick={() => handleRemove(item.id)} 
                        className="mt-5 text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                      >
                        {lang === "TH" ? "ลบ" : "Remove"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Item */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input 
                type="text" 
                placeholder={lang === "TH" ? "เพิ่มสกินแคร์ชิ้นใหม่..." : "Add new item..."} 
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs"
              />
              <input 
                type="number" 
                placeholder={lang === "TH" ? "ราคา (บาท)" : "Price (THB)"} 
                value={newItemPrice}
                onChange={e => setNewItemPrice(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs"
              />
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder={lang === "TH" ? "จำนวนเดือน" : "Duration"} 
                  value={newItemMonths}
                  onChange={e => setNewItemMonths(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-center"
                />
                <button 
                  onClick={handleAdd}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg text-xs font-bold hover:bg-pink-700 transition-colors shrink-0"
                >
                  {lang === "TH" ? "เพิ่ม" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="skincare-result-card" className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-6 rounded-3xl border border-pink-100 dark:border-pink-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "สรุปค่าใช้จ่ายสกินแคร์" : "Skincare Cost Summary"}
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายเฉลี่ยต่อเดือน" : "Average Monthly Cost"}</p>
                <p className="text-4xl font-black text-pink-600 dark:text-pink-400 mt-1">
                  {monthlyTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / เดือน</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายเฉลี่ยต่อปี" : "Average Annual Cost"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {annualTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-pink-100 dark:border-pink-950/40 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p className="font-bold text-pink-700 dark:text-pink-300 mb-1">
                  {lang === "TH" ? "รู้หรือไม่?" : "Did you know?"}
                </p>
                <p>
                  {lang === "TH" 
                    ? "ครีมบำรุงผิวที่คุ้มค่าไม่ได้ขึ้นกับราคา แต่ขึ้นกับความเข้ากันได้ดีกับสภาพผิวและสมานผลดีต่อผิวหน้า" 
                    : "The most expensive product isn't necessarily the best. Active ingredients and skin compatibility matter most."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="skincare-result-card" fileName="skincare-routine-cost" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการเงินด้านสกินแคร์" : "Skincare Routine Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมการบวกรวมและประเมินค่าสกินแคร์รายเดือนจึงสำคัญต่อสุขภาพการเงิน?" : "Why is it important to calculate skincare costs?"}
          a={lang === "TH" ? 
            "สกินแคร์และเครื่องสำอางเป็นสิ่งที่ซื้อกระจัดกระจายต่างวาระ บางขวดมีขนาดใหญ่ใช้ได้นานถึง 6 เดือน ในขณะที่บางหลอดใช้อาทิตย์ละครั้งทำให้เราคำนวณยอดเงินรวมรายเดือนที่หมดไปได้ยาก อาการเงินสะดุดในหมวดหมู่นี้มักเกิดจากการซื้อแบบสะเปะสะปะจากการดูรีวิวป้ายยา การเฉลี่ยราคาและอายุการใช้งานออกมาเป็นค่าใช้จ่ายต่อเดือน จะช่วยสร้างความโปร่งใสในข้อมูลทางการเงิน (Financial Transparency) ทำให้เราเริ่มตั้งสติเปรียบเทียบได้ว่าผลลัพธ์ของผิวพรรณที่ได้จากครีมขวดหลักพันนั้นสร้างผลต่างได้ชัดเจนจริง หรือแค่เกิดจากกิเลสการอยากมีสกินแคร์ขวดสวยๆ วางประดับบนโต๊ะเครื่องแป้ง"
            : "Skincare items are bought at varying times and durations, making it a major category for hidden overspending. Calculating monthly averages reveals true beauty budget consumption."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "สกินแคร์สามกลุ่มหลักตามหลักการแพทย์ผิวหนังที่คุ้มค่าแก่การลงทุนคืออะไร?" : "What are the core skincare items to invest in?"}
          a={lang === "TH" ? 
            "หากคุณจำเป็นต้องตัดลดค่าใช้จ่ายลง แพทย์ผิวหนังแนะนำให้คุณเน้นสกินแคร์หลักสามตัวเพื่อผิวสุขภาพดี (Holy Trinity of Skincare) ได้แก่: 1. คลีนเซอร์หรือผลิตภัณฑ์ล้างหน้า (Cleanser) ที่ช่วยชะล้างสิ่งสกปรกและไขมันส่วนเกินโดยไม่ทำให้ผิวแห้งตึง 2. มอยเจอร์ไรเซอร์ (Moisturizer) เพื่อทำหน้าที่รักษาความชุ่มชื้นและเสริมเกราะป้องกันตามธรรมชาติของผิวให้แข็งแรง 3. ครีมกันแดด (Sunscreen) เพื่อปกป้องผิวจากแสงแดด รังสี UV ที่เป็นตัวการหลักทำให้ผิวหนังเหี่ยวย่น จุดด่างดำ และป้องกันมะเร็งผิวหนัง สามสิ่งนี้จำเป็นต้องทาทุกวัน คุณจึงควรเลือกผลิตภัณฑ์ที่มีความอ่อนโยน ปลอดภัย และราคาเหมาะสมกับปริมาณเพื่อไม่ให้กระเป๋าฉีกในระยะยาว"
            : "Focus your budget on cleanser, moisturizer, and sunscreen. These three represent the core dermatological necessities for skin health."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เคล็ดลับระดับโปรในการเซฟเงินค่าผลิตภัณฑ์บำรุงผิวโดยที่ใบหน้ายังคงสดใสกระจ่างใส?" : "Tips to save money without ruining your skin?"}
          a={lang === "TH" ? 
            "1. เลือกแบรนด์เวชสำอางที่ใช้สารสกัดออกฤทธิ์ทางวิทยาศาสตร์ตรงจุด (Active Ingredients) เช่น Hyaluronic acid, Retinol หรือ Ceramide โดยไม่ผสมส่วนผสมน้ำหอมหรือหีบห่อที่หรูหราจนราคาสูงเกินจริง 2. ใช้อัตราปริมาณสารสกินแคร์ที่ถูกต้อง เช่น เซรั่ม 2-3 หยด หรือครีมกันแดด 2 ข้อนิ้ว การใช้ประโคมมากเกินไปไม่ได้มีคุณสมบัติให้ผิวดูดซับได้มากกว่าเดิม แต่เป็นการสลายเงินไปอย่างไร้ค่า 3. ซื้อสินค้าขนาดรีฟิลหรือซื้อตุนในช่วงเทศกาลส่งเสริมการขายประจำปี 4. จัดการสกินแคร์รูทีนให้สั้นลง (Skinimalism) การทาครีมซ้อนกันหลายเลเยอร์นอกจากสิ้นเปลืองเงินแล้วยังอาจก่อให้เกิดอาการอุดตันและแพ้ระคายเคืองต่อผิวได้ง่าย"
            : "Practice 'Skinimalism' by reducing layers, focus on drugstore science-based brands with raw active ingredients, and use the correct small portions rather than overapplying."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ครีมระดับเคาน์เตอร์แบรนด์ราคาแพง ให้ผลลัพธ์ต่างจากครีมราคาประหยัดอย่างมีนัยสำคัญจริงหรือไม่?" : "Do premium counter brands beat budget skincare?"}
          a={lang === "TH" ? 
            "ในแง่วิทยาศาสตร์เครื่องสำอาง ผลิตภัณฑ์ราคาประหยัดในร้านขายยาเวชสำอางและเคาน์เตอร์แบรนด์ระดับหรูมีโครงสร้างสารให้ความชุ่มชื้นและส่วนผสมหลัก (เช่น Glycerin, Niacinamide, Retinol) ที่คล้ายคลึงกันอย่างมาก ครีมราคาสูงมักจะได้เปรียบในเรื่องของเนื้อสัมผัส (Texture) กลิ่นหอมจากน้ำหอมสังเคราะห์ สารสกัดจากธรรมชาติที่หาได้ยากทางโฆษณา และการจัดจำหน่ายในห้างสรรพสินค้าชั้นนำ หากเป้าหมายของคุณคือความคุ้มค่าทางการเงิน ครีมบำรุงผิวเกรดธรรมดาที่ผ่านการทดสอบเรื่องการแพ้และระคายเคือง (Dermatologically Tested) ก็สามารถให้การบำรุงขั้นพื้นฐานที่ช่วยคืนความเยาว์วัยให้ผิวหนังของคุณได้อย่างมีประสิทธิภาพเพียงพอแล้ว"
            : "No. Budget dermatologist-tested products often contain the exact same active molecular formulas (retinol, niacinamide) as luxury creams without the expensive packaging and marketing markups."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 4. Haircut Annual Expense (ID: haircut-annual-expense)
// ============================================================================
export function HaircutAnnualExpense({ lang }: { lang: Lang }) {
  const [cost, setCost] = useLocalState("hc-cost", "500");
  const [otherCost, setOtherCost] = useLocalState("hc-other", "50");
  const [frequency, setFrequency] = useLocalState("hc-freq", "4"); // in weeks

  const costNum = Number(cost) || 0;
  const travelNum = Number(otherCost) || 0;
  const freqWeeks = Math.max(1, Number(frequency) || 1);

  const visitsPerYear = 52 / freqWeeks;
  const totalPerVisit = costNum + travelNum;
  const annualCost = totalPerVisit * visitsPerYear;
  const tenYearCost = annualCost * 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <Scissors className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าตัดผมและตกแต่งผมต่อปี" : "Annual Haircut Expense Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "ประเมินค่าใช้จ่ายในการเข้าร้านตัดผม บาร์เบอร์ หรือซาลอน ตลอดทั้งปีและแผนระยะยาว" 
            : "Calculate yearly salon/barber expenses and project long-term costs."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "รายละเอียดการเข้าร้าน" : "Visit Details"}</h3>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าตัดผมต่อครั้ง (บาท)" : "Haircut Cost per Visit (THB)"}</label>
            <NumericInput value={cost} onChange={setCost} placeholder="500" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าเดินทาง/ค่าทิป/บริการเพิ่มเติมต่อครั้ง (บาท)" : "Additional/Travel Costs (THB)"}</label>
            <NumericInput value={otherCost} onChange={setOtherCost} placeholder="50" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ความถี่ในการเข้าร้าน" : "Frequency of Visits"}</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)} className={inputClass}>
              <option value="1">{lang === "TH" ? "ทุกสัปดาห์" : "Every Week"}</option>
              <option value="2">{lang === "TH" ? "ทุก 2 สัปดาห์" : "Every 2 Weeks"}</option>
              <option value="3">{lang === "TH" ? "ทุก 3 สัปดาห์" : "Every 3 Weeks"}</option>
              <option value="4">{lang === "TH" ? "ทุก 4 สัปดาห์ (1 เดือน)" : "Every 4 Weeks (1 Month)"}</option>
              <option value="6">{lang === "TH" ? "ทุก 6 สัปดาห์ (1.5 เดือน)" : "Every 6 Weeks (1.5 Months)"}</option>
              <option value="8">{lang === "TH" ? "ทุก 8 สัปดาห์ (2 เดือน)" : "Every 8 Weeks (2 Months)"}</option>
              <option value="12">{lang === "TH" ? "ทุก 12 สัปดาห์ (3 เดือน)" : "Every 12 Weeks (3 Months)"}</option>
              <option value="26">{lang === "TH" ? "ทุก 6 เดือน" : "Every 6 Months"}</option>
            </select>
          </div>
        </div>

        <div id="haircut-result-card" className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "สรุปค่าใช้จ่ายตัดผม" : "Haircut Cost Breakdown"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "จำนวนครั้งที่ตัดเฉลี่่ยต่อปี" : "Estimated Visits per Year"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {visitsPerYear.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                  <span className="text-sm font-bold ml-1">{lang === "TH" ? "ครั้ง / ปี" : "times / year"}</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายต่อปี" : "Annual Expense"}</p>
                <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mt-1">
                  {annualCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-blue-100 dark:border-blue-900/30">
                <p className="text-sm text-gray-500">{lang === "TH" ? "คาดการณ์งบสะสมระยะยาว (10 ปี)" : "10-Year Projected Cost"}</p>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-1">
                  {tenYearCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="haircut-result-card" fileName="haircut-annual-expense" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับค่าตัดผม" : "Haircut Annual Expense FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "เพราะเหตุใดความถี่และร้านตัดผมจึงเป็นสิ่งสำคัญในการวางแผนค่าใช้จ่าย?" : "Why should you track haircut costs?"}
          a={lang === "TH" ? 
            "การตัดผมอาจมองดูเป็นค่าใช้จ่ายจิ๊บจ๊อย แต่หากต้องการดูแลภาพลักษณ์ภายนอกให้ดูเนี้ยบตลอดเวลา เช่น ทรงผมชายแนวขูดจอน สไลด์ขาวไล่ระดับ (Skin Fade) ที่ต้องทำทุก 2 สัปดาห์ หรือการทำสีและปิดผมขาวสำหรับสตรีที่จะต้องทำทุกๆ เดือน ค่าใช้จ่ายนี้จะกลายเป็นรายจ่ายผูกพันระยะยาว (Recurring Cost) ที่เกิดขึ้นไม่เว้นแต่ละเดือน การเห็นภาพรวมยอดงบสะสม 10 ปี จะช่วยให้เราฉุกคิดถึงทางเลือกประหยัด หรือจัดกลุ่มเงินส่วนนี้เป็นหนึ่งในงบประมาณการดูแลตัวเองอย่างเป็นทางการได้ชัดเจน"
            : "Monthly or bi-weekly grooming builds up over time as a recurring cost. Seeing a 10-year projection helps in lifestyle auditing and budgeting."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ความถี่ที่เหมาะสมที่สุดในการตัดแต่งทรงผมแต่ละสไตล์เป็นกี่สัปดาห์?" : "What is the recommended haircut frequency?"}
          a={lang === "TH" ? 
            "ปกติเส้นผมมนุษย์จะมีอัตราการเจริญเติบโตเฉลี่ยที่ประมาณ 1.25 เซนติเมตรต่อเดือน: 1. ผมสั้นชายหรือสไตล์ขัดเฟด (Fade cut) ควรมาเล็มผมทุกๆ 2-3 สัปดาห์ เพื่อความเนียนสมบูรณ์ของโครงทรงผม 2. ผมชายทรงปกติสั้นปานกลาง (Regular Short cut) แนะนำทุกๆ 4-6 สัปดาห์ 3. สำหรับสตรีที่ไว้ผมสั้นหรือผมบ็อบ แนะนำทุกๆ 6-8 สัปดาห์ เพื่อประคับประคองวอลลุ่มให้ดี 4. ผมสตรีทรงยาวปานกลางถึงยาวมาก สามารถไปตัดแต่งปลายผมเสีย (Split ends) ออกได้ทุกๆ 8-12 สัปดาห์"
            : "Hair grows about 1.25 cm monthly. Short fades require touch-ups every 2-3 weeks; standard short styles need 4-6 weeks; longer female layered locks can wait 8-12 weeks."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ทำอย่างไรให้ลดค่าใช้จ่ายการดูแลผมลงได้สูงสุดโดยใบหน้าและศีรษะยังคงดูดีมีระดับ?" : "How to reduce hair maintenance expenses?"}
          a={lang === "TH" ? 
            "1. เลือกสไตล์ทรงผมที่ยาวแล้วก็ยังดูสวยงามเป็นธรรมชาติ (Low-maintenance hairstyles) เช่น ผมดัดลอนคลาย ผมบ็อบไล่สไลด์ ที่ไม่ต้องอาศัยการตัดทรงบ่อย 2. มองหาช่างตัดผมฝีมือดีตามร้านสตรีทซาลอนที่มีอัตราค่าบริการเป็นมิตร แทนการเข้าร้านตามห้างพรีเมียมหรูทุกครั้ง 3. หากมีทักษะ แนะนำให้ใช้ปัตตาเลี่ยนมาฝึกแต่งขอบและเล็มผมหน้าม้าด้วยตัวเองที่บ้าน 4. เคลียร์เป้าหมายการจัดระดับความต้องการตัดแต่งให้แก่ช่างผู้ให้บริการตั้งแต่ต้นเพื่อความเข้าใจและยืดการเข้าร้านออกไปได้สูงสุด"
            : "Opt for a low-maintenance style that grows out gracefully. Mix in local street salons with premium barber visits, and trim bangs or sideburns at home."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "หากเราปรับงบประมาณตัดผมลง จะช่วยเพิ่มเงินเก็บและการลงทุนได้อย่างไร?" : "How much difference does optimizing hair expenses make?"}
          a={lang === "TH" ? 
            "หากคุณปรับเปลี่ยนความบ่อยจากการสระไดร์หรือตัดตกแต่งที่ร้านราคา 700 บาท ทุกเดือน เป็นการสลับตัดร้านทั่วไปราคา 300 บาท คุณจะเซฟเงินได้ทันที 400 บาทต่อเดือน (4,800 บาทต่อปี) หากนำส่วนต่างประหยัดนี้ไปผูกกองทุนดัชนีเป็นเวลา 20 ปี ภายใต้คาดการณ์อัตราผลตอบแทนทบต้น 8% ต่อปี เงินก้อนเล็กนี้จะงอกเงยเป็นเงินฝากออมสะสมสูงถึงกว่า 230,000 บาท ซึ่งสามารถเปลี่ยนมาเป็นกองทุนสำรองยามเกษียณอายุการทำงานได้อย่างมีน้ำมีเนื้อ"
            : "Saving 400 THB monthly on haircuts and putting it into an index fund returning 8% compounded for 20 years turns into over 230,000 THB."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 5. Nail Care Expense (ID: nail-care-expense)
// ============================================================================
export function NailCareExpense({ lang }: { lang: Lang }) {
  const [gelCost, setGelCost] = useLocalState("nc-gel", "400");
  const [removalCost, setRemovalCost] = useLocalState("nc-rem", "100");
  const [frequencyWeeks, setFrequencyWeeks] = useLocalState("nc-freq", "3");

  const gelNum = Number(gelCost) || 0;
  const remNum = Number(removalCost) || 0;
  const weeks = Math.max(1, Number(frequencyWeeks) || 1);

  const visitsPerYear = 52 / weeks;
  const totalPerVisit = gelNum + remNum;
  const annualCost = totalPerVisit * visitsPerYear;
  const fiveYearCost = annualCost * 5;
  const tenYearCost = annualCost * 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 dark:text-pink-400 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าทำเล็บและบำรุงเล็บต่อปี" : "Annual Nail Care Expense Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "เช็กงบประมาณการทาสีเจล ต่อเล็บ บำรุงเล็บมือ-เล็บเท้า สะสมรายปีและระยะยาว" 
            : "Estimate yearly gel manicure, nail extension, and care costs."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "ข้อมูลค่าบริการต่อครั้ง" : "Manicure Details"}</h3>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าทาสีเจล/ต่อเล็บ (บาท)" : "Gel/Extension Cost (THB)"}</label>
            <NumericInput value={gelCost} onChange={setGelCost} placeholder="400" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าล้างสีเจล/แต่งทรง/บำรุงเพิ่มเติม (บาท)" : "Removal & Prep Cost (THB)"}</label>
            <NumericInput value={removalCost} onChange={setRemovalCost} placeholder="100" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ความถี่ในการทำเล็บใหม่" : "Frequency of Visits"}</label>
            <select value={frequencyWeeks} onChange={e => setFrequencyWeeks(e.target.value)} className={inputClass}>
              <option value="2">{lang === "TH" ? "ทุก 2 สัปดาห์" : "Every 2 Weeks"}</option>
              <option value="3">{lang === "TH" ? "ทุก 3 สัปดาห์" : "Every 3 Weeks"}</option>
              <option value="4">{lang === "TH" ? "ทุก 4 สัปดาห์ (1 เดือน)" : "Every 4 Weeks (1 Month)"}</option>
              <option value="6">{lang === "TH" ? "ทุก 6 สัปดาห์" : "Every 6 Weeks"}</option>
              <option value="8">{lang === "TH" ? "ทุก 8 สัปดาห์ (2 เดือน)" : "Every 8 Weeks (2 Months)"}</option>
            </select>
          </div>
        </div>

        <div id="nail-result-card" className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-6 rounded-3xl border border-pink-100 dark:border-pink-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "ประมาณการงบค่าทำเล็บ" : "Projected Nail Care Budget"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "จำนวนครั้งที่ทำต่อปี" : "Estimated Visits per Year"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {visitsPerYear.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                  <span className="text-sm font-bold ml-1">{lang === "TH" ? "ครั้ง / ปี" : "times / year"}</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายรวมต่อปี" : "Total Annual Cost"}</p>
                <p className="text-4xl font-black text-pink-600 dark:text-pink-400 mt-1">
                  {annualCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-pink-100 dark:border-pink-900/30 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">{lang === "TH" ? "สะสม 5 ปี" : "5-Year Cost"}</p>
                  <p className="text-base font-bold text-gray-700 dark:text-gray-300">{fiveYearCost.toLocaleString()} ฿</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{lang === "TH" ? "สะสม 10 ปี" : "10-Year Cost"}</p>
                  <p className="text-base font-bold text-gray-700 dark:text-gray-300">{tenYearCost.toLocaleString()} ฿</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="nail-result-card" fileName="nail-care-expense" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการทำเล็บและบำรุงเล็บ" : "Nail Care Expense FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "การทำเล็บเจลเป็นประจำทุก 2-3 สัปดาห์ ส่งผลต่อการวางแผนการเงินอย่างไร?" : "How does a regular nail schedule impact budgeting?"}
          a={lang === "TH" ? 
            "การทาสีเล็บเจลหรือการต่อเล็บเป็นหนึ่งในแฟชั่นไลฟ์สไตล์ที่ให้ความสุขและเพิ่มความมั่นใจได้อย่างรวดเร็ว แต่เนื่องจากสีเจลมีอายุการเกาะแน่นที่พอดีหากทิ้งไว้นานกว่า 3-4 สัปดาห์ อาจเสี่ยงเกิดเชื้อราจากการซึมของน้ำเข้าใต้รอยแยก ทำให้เกิดค่าใช้จ่ายประจำที่หลีกเลี่ยงไม่ได้ (Recurring Expense) การที่ต้องเข้าร้านทำเล็บทั้งการล้าง ตะไบ ทาสีใหม่ หรือตกแต่งเล่ม ลวดลายเป็นประจำสามารถละลายเงินในกระเป๋าของคุณได้สูงถึงปีละหลายพันจนถึงหลายหมื่นบาท การคำนวณและประเมินงบประมาณของเล็บจึงช่วยเตือนสติในการกระจายงบในโหมดความสวยงามไม่ให้เบียดเสียดงบออมทรัพย์"
            : "Manicures demand continuous professional removal and touch-ups every 3 weeks to avoid nail fungus. This transforms nail care into a highly recurring lifestyle cost."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "มีเคล็ดลับและทางเลือกอะไรบ้างในการทำเล็บสวยในราคาที่เบาตัว?" : "What are budget-friendly nail care alternatives?"}
          a={lang === "TH" ? 
            "1. หันมาลองชุดทำเล็บเจลด้วยตัวเองที่บ้าน (DIY Gel Kits) ปัจจุบันเครื่องอบแสงยูวีขนาดเล็กและสีเจลขวดมีจำหน่ายในราคาหลักร้อยบาท ซึ่งการทำด้วยตัวเองเพียงไม่กี่ครั้งก็ถึงจุดคุ้มทุนค่าอุปกรณ์แล้ว 2. ใช้สติ๊กเกอร์ติดเล็บเจลอบแสง (Semi-cured Gel Nail Strips) หรือกาวติดเล็บปลอมสำเร็จรูป (Press-on Nails) ซึ่งถอดและติดง่าย ไม่พึ่งพาน้ำยาถอดรุนแรง 3. สลับมาทาสีเล็บแบบคลาสสิกธรรมดาบ้าง เพื่อปล่อยหน้าเล็บได้พักฟื้นฟูตามธรรมชาติโดยไม่ต้องใช้กระบวนการเจียร์เนื้อหน้าเล็บ"
            : "Invest in a DIY UV-lamp manicure kit, switch to high-quality press-on gel strips, or alternate to standard nail polishes to let natural nails breathe."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "การทำเล็บเจลบ่อยๆ มีราคาและมลภาวะซ่อนเร้นต่อสุขภาพนิ้วมือและหน้าเล็บอย่างไร?" : "Are there health-related hidden costs to gel manicures?"}
          a={lang === "TH" ? 
            "การตะไบและใช้กระดาษทรายเกลี่ยหน้าเล็บเจลบ่อยครั้งทำให้เล็บจริงบางลง เปราะแตกหักง่าย และอาจมีค่าใช้จ่ายรักษาพยาบาลตามมาหากได้รับเชื้อราหรือติดเชื้อแบคทีเรีย ยิ่งไปกว่านั้น การรับรังสี UV จากเครื่องอบเล็บบ่อยๆ อาจทำให้ผิวนิ้วมือเหี่ยวย่นคล้ำหรือกระตุ้นความเสี่ยงมะเร็งผิวหนัง ดังนั้นการใช้ครีมกันแดดทามือก่อนเข้ารับบริการ และการเว้นระยะพักหน้าเล็บ 1-2 เดือนหลังจากทำสีเจลติดต่อกัน 3-4 ครั้ง ถือเป็นเรื่องที่จำเป็นมากต่อสุขอนามัย"
            : "Frequent filing thins natural nails, risking structural breakage. The UV dryers can dry out skin and raise skin cancer risks without protection (use hand sunscreen)."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เราควรจัดหมวดหมู่การทำเล็บไว้ในงบประมาณการเงินส่วนตัวอย่างไร?" : "Where does nail care sit in personal finance?"}
          a={lang === "TH" ? 
            "ตามกฎการเงินส่วนตัว 50/30/20 ค่าใช้จ่ายการทำเล็บและการตกแต่งความงามจัดอยู่ในส่วน 30% ของ 'เงินเพื่อสิ่งที่คุณต้องการ (Wants)' ไม่ควรจัดเข้าหมวดหมู่เงินจำเป็น (Needs) สัญชาตญาณความสวยความงามเป็นรางวัลชีวิตที่ช่วยยกระดับอารมณ์ แต่หากเดือนใดเกิดเหตุวิกฤตทางการเงิน ควรเป็นส่วนแรกๆ ที่สามารถหั่นงบออกหรือขยับความถี่จากทำทุก 2 สัปดาห์ เป็น 5-6 สัปดาห์ต่อครั้งได้ทันทีเพื่อความปลอดภัยของเงินสดในธนาคาร"
            : "It strictly falls under the 30% discretionary 'Wants' category. In times of tight budgets, push beauty frequency back or utilize home-care alternatives."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 6. Hair Treatment Expense (ID: hair-treatment-expense)
// ============================================================================
export function HairTreatmentExpense({ lang }: { lang: Lang }) {
  const [chemicalCost, setChemicalCost] = useLocalState("ht-chem", "3500");
  const [chemicalFreq, setChemicalFreq] = useLocalState("ht-cfreq", "2"); // times per year
  const [spaCost, setSpaCost] = useLocalState("ht-spa", "1500");
  const [spaFreq, setSpaFreq] = useLocalState("ht-sfreq", "4"); // times per year
  const [productCost, setProductCost] = useLocalState("ht-prod", "500"); // monthly

  const chem = Number(chemicalCost) || 0;
  const cf = Number(chemicalFreq) || 0;
  const spa = Number(spaCost) || 0;
  const sf = Number(spaFreq) || 0;
  const prod = Number(productCost) || 0;

  const annualChem = chem * cf;
  const annualSpa = spa * sf;
  const annualProd = prod * 12;
  const totalAnnual = annualChem + annualSpa + annualProd;
  const monthlyAverage = totalAnnual / 12;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
          <Scissors className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าทำสี ทำเคมี และทรีทเม้นท์ผมต่อปี" : "Annual Hair Treatment Expense Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "รวมงบทำสี ดัด ยืด ย้อมปิดผมขาว ทรีทเม้นท์พรีเมียม และผลิตภัณฑ์บำรุงผมรายปี" 
            : "Aggregate annual hair salon chemistry, premium spa, and product costs."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "รายจ่ายเคมีและทรีทเม้นท์" : "Treatment Expenses"}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าทำเคมี/ครั้ง (฿)" : "Chem Cost/Visit"}</label>
              <NumericInput value={chemicalCost} onChange={setChemicalCost} placeholder="3,500" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนครั้ง/ปี" : "Visits/Year"}</label>
              <NumericInput value={chemicalFreq} onChange={setChemicalFreq} placeholder="2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าสปาผม/ครั้ง (฿)" : "Spa Cost/Visit"}</label>
              <NumericInput value={spaCost} onChange={setSpaCost} placeholder="1,500" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "จำนวนครั้ง/ปี" : "Visits/Year"}</label>
              <NumericInput value={spaFreq} onChange={setSpaFreq} placeholder="4" />
            </div>
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าผลิตภัณฑ์ดูแลผมเฉลี่ยต่อเดือน (บาท)" : "Haircare Products Cost / Month (THB)"}</label>
            <NumericInput value={productCost} onChange={setProductCost} placeholder="500" />
          </div>
        </div>

        <div id="hair-treatment-result" className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "ผลการรวมงบประมาณบำรุงผม" : "Total Hair Maintenance Budget"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "รวมค่าใช้จ่ายเฉลี่ยต่อเดือน" : "Average Monthly Cost"}</p>
                <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                  {monthlyAverage.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / เดือน</span>
                </p>
              </div>

              <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/30 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang === "TH" ? "งบทำสี/ดัด/ยืด ต่อปี:" : "Chemistry Treatments / Year:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{annualChem.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang === "TH" ? "งบสปา/ทรีทเม้นท์ ต่อปี:" : "Premium Spa Care / Year:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{annualSpa.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang === "TH" ? "งบแชมพู/เซรั่มดูแลผม ต่อปี:" : "Home Products / Year:"}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{annualProd.toLocaleString()} ฿</span>
                </div>
              </div>

              <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/30">
                <p className="text-sm text-gray-500">{lang === "TH" ? "รวมค่าใช้จ่ายทำผมทั้งหมดต่อปี" : "Total Annual Expense"}</p>
                <p className="text-4xl font-black text-indigo-700 dark:text-indigo-300 mt-1">
                  {totalAnnual.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / ปี</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="hair-treatment-result" fileName="hair-treatment-expense" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับค่าทำเคมีและทำผม" : "Hair Treatment Expense FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "เหตุใดค่าใช้จ่ายการซ่อมแซมเส้นผมแห้งเสียจึงเป็น 'ราคาซ่อนเร้น' ของการฟอกสีผม?" : "What are the hidden costs of bleaching and coloring?"}
          a={lang === "TH" ? 
            "หลายคนเตรียมเงินไปร้านซาลอนเฉพาะค่าฟอกสีผมและทำสีประมาณ 3,000-5,000 บาท แต่อาจหลงลืมคิดถึง 'ราคาซ่อนเร้นเพื่อการซ่อมบำรุง' (Damage Control Costs) เส้นผมที่สูญเสียโครงสร้างตามธรรมชาติจากการทำเคมีจะแห้งเสีย ชี้ฟู และช็อตจนหักง่าย ส่งผลให้ต้องซื้อครีมคอนดิชันเนอร์เข้มข้น แฮร์ออยล์ เซรั่มเคราตินแบรนด์ซาลอนราคาหลักร้อยหลักพันเพิ่มเติม และต้องการการทำทรีทเม้นท์อบไอน้ำล้ำลึกที่ร้านถัดมาอีกหลายครั้ง การยืดระยะการทำเคมีและเน้นปกป้องจึงเป็นวิธีเซฟเงินที่ชาญฉลาดที่สุด"
            : "Coloring and bleaching cause chemical structural damage. The hidden cost is the post-care premium hair masks, hair oils, keratin serums, and recurring damage repair spa visits."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เราสามารถทำทรีทเม้นท์ผมให้มีประสิทธิภาพดีราคาประหยัดเองที่บ้านได้อย่างไร?" : "How to do DIY premium hair care at home?"}
          a={lang === "TH" ? 
            "ไม่จำเป็นต้องเข้าร้านซาลอนพรีเมียมราคาครั้งละ 2,000 บาท เสมอไป คุณสามารถซื้อผลิตภัณฑ์หมักผมสูตรทรีทเม้นท์เข้มข้นสัญชาติยุโรปหรือญี่ปุ่นคุณภาพดีมาใช้งานเองที่บ้าน ร่วมกับการซื้อ 'หมวกอบไอน้ำไฟฟ้าส่วนตัว' ราคาไม่กี่ร้อยบาทมาอบผมสัปดาห์ละ 1-2 ครั้ง ครั้งละ 15-20 นาที ความร้อนจะช่วยเปิดเกล็ดเส้นผมทำให้เนื้อครีมซึมเข้าฟื้นบำรุงลึกถึงแกนกลาง ได้ผลลัพธ์ใกล้เคียงกับการทำทรีทเม้นท์ฟื้นฟูที่ร้านซาลอนแต่มีต้นทุนเฉลี่ยต่ำลงมากกว่า 10 เท่า"
            : "Get salon-grade results by investing in a premium deep-conditioner mask and a reusable electric thermal cap at home. Steam for 15 minutes weekly for massive budget savings."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีการปกป้องถนอมสีผมหลังย้อมเพื่อให้สีติดทนยาวนานโดยไม่ต้องย้อมใหม่บ่อย?" : "How to make hair color last longer to save money?"}
          a={lang === "TH" ? 
            "1. หลีกเลี่ยงการสระผมบ่อยเกินจำเป็น (แนะนำสระวันเว้นวันหรือสัปดาห์ละ 2-3 ครั้ง) และใช้ดรายแชมพูเสริม 2. เลือกใช้ผลิตภัณฑ์แชมพูชนิดปราศจากสารซัลเฟต (Sulfate-Free Shampoo) เสมอเพื่อป้องกันสารเคมีไปชะล้างเม็ดสีผม 3. สระผมด้วยน้ำเย็นหรือน้ำธรรมดา ห้ามใช้น้ำอุ่นจัดเพราะจะทำให้เกล็ดผมเปิดจนสีไหลออก 4. ทาสเปรย์หรือครีมปกป้องความร้อนทุกครั้งก่อนไดร์ผมหรือม้วนลอน เพื่อรักษาสีผมให้สดใสยาวนาน"
            : "Wash color-treated hair with sulfate-free formulas in cold water only, wash less frequently, and always apply thermal protectant spray before using flat irons."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ควรเลือกทำเคมีผมกี่ครั้งต่อปีเพื่อให้สมดุลกับเงินในบัญชีและสุขภาพเส้นผม?" : "How many times a year should you perform chemical treatments?"}
          a={lang === "TH" ? 
            "ผู้เชี่ยวชาญช่างผมและที่ปรึกษาการเงินแนะนำให้ทำเคมีชุดใหญ่ (เช่น ดัด ยืดถาวร ฟอกสว่าง) ไม่ควรเกิน 1-2 ครั้งต่อปี (ทุกๆ 6-12 เดือน) เพื่อรักษาความแข็งแรงของรากผมและโครงใยผมไม่ให้เสียหายเกินเยียวยา สำหรับการปิดผมขาวหรือย้อมสีโคนผมที่งอกใหม่ (Root touch-up) สามารถทำได้ทุกๆ 6-8 สัปดาห์ การจำกัดความถี่นี้จะช่วยรักษาบุคลิกภาพที่ดีของรูปทรงและสีผมได้อย่างพอเหมาะโดยไม่ต้องควักเงินก้อนโตทุกๆ เดือน"
            : "Limit major chemical operations (bleaching, perming, rebonding) to 1-2 times annually to protect hair health. Touch up roots every 6-8 weeks instead of re-bleaching the entire head."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 7. Gym & Supplement Cost (ID: gym-supplement-cost)
// ============================================================================
export function GymSupplementCost({ lang }: { lang: Lang }) {
  const [gymFee, setGymFee] = useLocalState("gs-gym", "1500");
  const [trainerFee, setTrainerFee] = useLocalState("gs-pt", "3000");
  const [wheyPrice, setWheyPrice] = useLocalState("gs-whey", "1800");
  const [wheyTubs, setWheyTubs] = useLocalState("gs-tubs", "1");
  const [suppsCost, setSuppsCost] = useLocalState("gs-supps", "600");
  const [weeklyVisits, setWeeklyVisits] = useLocalState("gs-visits", "3");

  const gym = Number(gymFee) || 0;
  const pt = Number(trainerFee) || 0;
  const whey = Number(wheyPrice) || 0;
  const tubs = Number(wheyTubs) || 0;
  const supps = Number(suppsCost) || 0;
  const visits = Math.max(1, Number(weeklyVisits) || 1);

  const monthlyTotal = gym + pt + (whey * tubs) + supps;
  const annualTotal = monthlyTotal * 12;
  const costPerVisit = (gym + pt) / (visits * 4.33);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
          <Flame className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าฟิตเนสและเวย์โปรตีน" : "Gym & Supplement Cost Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "รวมงบสมาชิกยิม ส่วนตัวเทรนเนอร์ เวย์โปรตีน และอาหารเสริมสร้างกล้ามเนื้อรายเดือน-รายปี" 
            : "Estimate fitness fees, personal training, whey protein, and health supplements."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "ข้อมูลค่าใช้จ่ายฟิตเนส" : "Fitness Expenses"}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าฟิตเนส/เดือน (฿)" : "Gym Fee / Month"}</label>
              <NumericInput value={gymFee} onChange={setGymFee} placeholder="1,500" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ค่าเทรนเนอร์/เดือน (฿)" : "Trainer Fee / Month"}</label>
              <NumericInput value={trainerFee} onChange={setTrainerFee} placeholder="3,000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "ราคาเวย์/กระปุก (฿)" : "Whey Price/Tub"}</label>
              <NumericInput value={wheyPrice} onChange={setWheyPrice} placeholder="1,800" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เวย์ที่กินต่อเดือน (กระปุก)" : "Tubs / Month"}</label>
              <NumericInput value={wheyTubs} onChange={setWheyTubs} placeholder="1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{lang === "TH" ? "อาหารเสริมอื่น/เดือน (฿)" : "Other Supps/Month"}</label>
              <NumericInput value={suppsCost} onChange={setSuppsCost} placeholder="600" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "ความถี่ไปยิม (วัน/สัปดาห์)" : "Gym Visits/Week"}</label>
              <NumericInput value={weeklyVisits} onChange={setWeeklyVisits} placeholder="3" />
            </div>
          </div>
        </div>

        <div id="gym-result-card" className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "สรุปค่าใช้จ่ายฟิตเนสและเวย์" : "Fitness Spending Overview"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดจ่ายรวมต่อเดือน" : "Total Monthly Budget"}</p>
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400 mt-1">
                  {monthlyTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / เดือน</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดจ่ายรวมต่อปี" : "Total Annual Budget"}</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {annualTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-orange-100 dark:border-orange-900/30">
                <p className="text-sm text-gray-500">
                  {lang === "TH" ? "ต้นทุนค่าสมาชิกยิม + เทรนเนอร์ต่อการไป 1 ครั้ง" : "Cost per Gym Visit (Membership + Trainer)"}
                </p>
                <p className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">
                  {costPerVisit.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / ครั้ง</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="gym-result-card" fileName="gym-supplement-cost" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับการเงินด้านฟิตเนส" : "Gym & Supplement Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ค่าสมาชิกฟิตเนสรายเดือน ถือว่าคุ้มค่าเงินจริงไหมเมื่อคำนวณราคาเฉลี่ยต่อครั้ง?" : "Is a gym membership worth it when looking at cost-per-visit?"}
          a={lang === "TH" ? 
            "การประเมินความคุ้มค่าของยิมอยู่ที่ 'อัตราการเข้าใช้งานจริง' (Gym Attendance Rate) หากคุณสมัครฟิตเนสราคา 1,500 บาทต่อเดือน แต่สามารถลากตัวเองไปออกกำลังกายสม่ำเสมอสัปดาห์ละ 3 วัน (ประมาณ 12-13 วันต่อเดือน) ต้นทุนเฉลี่ยต่อครั้งจะอยู่ที่เพียง 115-125 บาท ซึ่งถูกกว่าการจ่ายค่าเข้าเป็นรายวันมาก แต่หากคุณเกิดความเฉื่อยชาไปเพียงเดือนละ 1-2 ครั้ง ต้นทุนต่อการเข้าจะพุ่งไปถึงครั้งละ 750-1,500 บาท ซึ่งสิ้นเปลืองเป็นอย่างยิ่ง ดังนั้น แนะนำให้ประเมินความพร้อมและใช้เครื่องมือนี้ช่วยกดดันตัวเองให้ไปยิมบ่อยขึ้นเพื่อดันราคากระจายต่อครั้งให้คุ้มที่สุด"
            : "It depends entirely on your attendance. A 1,500 THB gym fee used 12 times a month is 125 THB per visit. Used only twice, it spikes to 750 THB per visit. Track your statistics to stay accountable."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ทางเลือกการออกกำลังกายให้ฟิตและกล้ามใหญ่ได้แบบประหยัดงบสำหรับนักศึกษาหรือผู้เริ่มทำงาน?" : "How to get fit on a budget?"}
          a={lang === "TH" ? 
            "คุณไม่จำเป็นต้องจ่ายเงินก้อนแพงเพื่อฟิตหุ่น สามารถใช้แนวทางประหยัดและได้ผลดีดังนี้: 1. การออกกำลังกายแรงต้านโดยใช้น้ำหนักตัว (Bodyweight Training & Calisthenics) เช่น การวิดพื้น การพูลอัพดึงข้อที่สวนสาธารณะ และสควอช 2. การวิ่งเพื่อฝึกความทนทานระบบหัวใจ (Cardio) ในสนามหรือสวนสาธารณะฟรี ลงทุนเพียงรองเท้าวิ่งซัพพอร์ตดีๆ 1 คู่ 3. จัดซื้อยางยืดแรงต้าน (Resistance Bands) หรือดัมเบลแบบปรับขนาดน้ำหนักได้คู่เดียวมาประยุกต์ยกสร้างกล้ามเนื้อที่บ้าน ซึ่งประหยัดงบกว่าค่าสมัครรายเดือนยิมเป็นสิบเท่า"
            : "Switch to outdoor running, bodyweight calisthenics, and invest in a single pair of adjustable dumbbells or resistance bands for effective home workouts."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "วิธีประหยัดค่าเวย์โปรตีนและอาหารเสริมโดยที่ยังได้รับปริมาณโปรตีนครบถ้วน?" : "How to buy whey protein and supplements cost-effectively?"}
          a={lang === "TH" ? 
            "1. คำนวณราคาโปรตีนต่อกรัม (Price per Gram of Protein): อย่าดูเพียงราคาขายรวมของเวย์กระปุก ให้ดูปริมาณโปรตีนต่อ 1 สกู๊ปคูณจำนวนหน่วยบริการทั้งหมดในหนึ่งภาชนะบรรจุ เพื่อเปรียบเทียบว่ายี่ห้อไหนถูกที่สุดต่อหน่วยโปรตีน 2. เลือกเวย์ชนิด Whey Protein Concentrate แทน Whey Protein Isolate หากไม่มีสภาวะร่างกายย่อยน้ำตาลแลคโตสไม่ได้ เนื่องจากมีส่วนต่างราคาที่ต่ำกว่าค่อนข้างมาก 3. เลือกทานอาหารธรรมชาติเป็นโปรตีนหลัก เช่น อกไก่ดิบ ไข่ต้ม เต้าหู้ หรือปลากระป๋อง ซึ่งได้โปรตีนเข้มข้นในต้นทุนที่ถูกกว่าผงอาหารเสริมกึ่งสำเร็จรูป"
            : "Compare the cost per gram of actual protein between brands, purchase Whey Concentrate instead of Isolate to save on processing markups, and eat whole foods like eggs and chicken breasts."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เพราะเหตุใดการเสียเงินดูแลสุขภาพฟิตเนสล่วงหน้าจึงเป็นการออมทรัพย์ระยะยาวที่ดีที่สุด?" : "Why is fitness investment a form of long-term savings?"}
          a={lang === "TH" ? 
            "การลงทุนค่าอาหารและฟิตเนสเพื่อบำรุงสุขภาพร่างกายเป็นเกราะป้องกันการสูญเสียทางการเงินในอนาคต (Preventive Health Investment) โรคร้ายแรงกลุ่ม NCDs เช่น โรคอ้วน ความดันสูง เบาหวาน และหลอดเลือดอุดตัน มีค่าใช้จ่ายเพื่อรักษาพยาบาล ค่ายา ค่าเดินทางไปพบแพทย์ และค่าสูญเสียโอกาสในการสร้างรายได้การทำงานรวมกันหลายหมื่นถึงหลายล้านบาทในช่วงวัยชรา การออกกำลังสร้างสรีระให้แข็งแรงในวันนี้จึงเป็นหนึ่งในการลดรายจ่ายก้อนโตในอนาคตที่คุ้มทุนสูงสุด"
            : "Preventative exercise shields you from future medical bills associated with obesity, high blood pressure, and chronic diseases which accumulate to millions in late adulthood."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 8. Streaming Subscriptions Cost (ID: streaming-subscriptions-cost)
// ============================================================================
interface StreamingApp {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}

export function StreamingSubscriptionsCost({ lang }: { lang: Lang }) {
  const [apps, setApps] = useState<StreamingApp[]>([
    { id: "netflix", name: "Netflix", price: 419, checked: true },
    { id: "disney", name: "Disney+ Hotstar", price: 289, checked: false },
    { id: "youtube", name: "YouTube Premium", price: 179, checked: true },
    { id: "spotify", name: "Spotify", price: 139, checked: false },
    { id: "apple", name: "Apple One", price: 369, checked: false },
    { id: "prime", name: "Prime Video", price: 149, checked: false },
    { id: "viu", name: "VIU", price: 119, checked: false },
  ]);

  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const handleToggle = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, checked: !app.checked } : app));
  };

  const handlePriceChange = (id: string, priceStr: string) => {
    const val = Number(priceStr) || 0;
    setApps(apps.map(app => app.id === id ? { ...app, price: val } : app));
  };

  const handleAdd = () => {
    if (!customName || !customPrice) return;
    const newApp: StreamingApp = {
      id: Date.now().toString(),
      name: customName,
      price: Number(customPrice) || 0,
      checked: true
    };
    setApps([...apps, newApp]);
    setCustomName("");
    setCustomPrice("");
  };

  const handleRemove = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const monthlyTotal = apps.reduce((acc, app) => acc + (app.checked ? app.price : 0), 0);
  const annualTotal = monthlyTotal * 12;

  // Opportunity cost calculation (FV of monthly investments at 5% for 10 years)
  // FV = P * (((1 + r/12)^(n*12) - 1) / (r/12)) * (1 + r/12)
  const r = 0.05;
  const n = 10;
  const numMonths = n * 12;
  const monthlyRate = r / 12;
  const futureValue = monthlyTotal > 0 
    ? monthlyTotal * ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate) * (1 + monthlyRate)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mb-4">
          <Tv className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าสมาชิกรายเดือน Streaming" : "Streaming Subscriptions Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "รวบรวมค่าสมาชิกความบันเทิงรายเดือน วิเคราะห์รูรั่วการเงินและผลตอบแทนที่เสียโอกาส" 
            : "Audit your monthly streaming services and track potential investment opportunity costs."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "เลือกบริการที่คุณสมัครอยู่" : "Select Active Services"}</h3>

          <div className="space-y-3">
            {apps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={app.checked} 
                    onChange={() => handleToggle(app.id)}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{app.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={app.price} 
                    onChange={e => handlePriceChange(app.id, e.target.value)}
                    className="w-20 px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-right"
                  />
                  <span className="text-xs text-gray-400">฿</span>
                  {app.id !== "netflix" && app.id !== "disney" && app.id !== "youtube" && app.id !== "spotify" && app.id !== "apple" && app.id !== "prime" && app.id !== "viu" && (
                    <button onClick={() => handleRemove(app.id)} className="text-red-500 text-xs px-1 hover:text-red-700 font-bold">×</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
            <p className="text-xs font-bold text-gray-400">{lang === "TH" ? "เพิ่มบริการอื่นนอกเหนือจากนี้" : "Add Custom Service"}</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={lang === "TH" ? "ชื่อบริการ" : "App Name"} 
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs"
              />
              <input 
                type="number" 
                placeholder={lang === "TH" ? "ราคา" : "Price"} 
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value)}
                className="w-24 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs text-right"
              />
              <button 
                onClick={handleAdd}
                className="px-3 py-1.5 bg-violet-600 text-white rounded text-xs font-bold hover:bg-violet-700"
              >
                {lang === "TH" ? "เพิ่ม" : "Add"}
              </button>
            </div>
          </div>
        </div>

        <div id="streaming-result-card" className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 p-6 rounded-3xl border border-violet-100 dark:border-violet-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "วิเคราะห์ค่าบริการรายเดือน" : "Monthly Subscriptions Summary"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดชำระรายเดือนรวม" : "Total Monthly Expense"}</p>
                <p className="text-4xl font-black text-violet-600 dark:text-violet-400 mt-1">
                  {monthlyTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / เดือน</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดชำระรายปีรวม" : "Total Yearly Expense"}</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {annualTotal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-violet-100 dark:border-violet-900/30">
                <p className="text-xs text-gray-500 mb-1">
                  {lang === "TH" 
                    ? "มูลค่าเงินนี้หากนำไปสะสมลงทุน 10 ปี (ผลตอบแทน 5% ต่อปี):" 
                    : "Future Value of this money if invested at 5% return for 10 years:"}
                </p>
                <p className="text-xl font-black text-violet-800 dark:text-violet-400">
                  {futureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {lang === "TH" 
                    ? "* คำนวณแบบสะสมลงทุนรายเดือนต่อเนื่อง (DCA) และสมทบดอกเบี้ยทบต้น" 
                    : "* Based on regular monthly compounding investments."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="streaming-result-card" fileName="streaming-subscriptions-cost" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับสตรีมมิ่งและการประหยัด" : "Streaming Subscriptions Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Subscription Fatigue คืออะไร และเพราะเหตุใดมันถึงส่งผลร้ายแรงต่อเงินสดในมือ?" : "What is Subscription Fatigue?"}
          a={lang === "TH" ? 
            "Subscription Fatigue หรือ 'อาการอ่อนเพลียจากการรับบริการรายเดือน' เกิดขึ้นจากการที่เราชื่นชอบความสะดวกสบายของแอปพลิเคชันหรือแพลตฟอร์มต่างๆ ที่โฆษณาค่าบริการราคาประหยัด เช่น วันละไม่ถึง 5 บาท หรือเดือนละ 149 บาท วิธีหักชำระเงินอัตโนมัติ (Autopay) ผ่านการผูกกับบัตรเครดิตทำให้อารมณ์ความระมัดระวังในการใช้เงินของตัวเราลดลง (Pain of Paying decreases) เมื่อเวลาผ่านไปคุณอาจมีสมาชิกสะสมถึง 5-10 ตัวโดยลืมเข้าไปใช้งาน ยอดรวมรายเดือนอาจพุ่งขึ้นแตะระดับ 1,500-2,000 บาท ซึ่งเทียบเป็นเงินก้อนใหญ่ที่เราจ่ายทิ้งเปล่าโดยไม่ได้ประโยชน์"
            : "Subscription fatigue occurs when tiny monthly automatic payments accumulate. Because the payments are automated, users experience less financial pain, leading to paying for multiple unused services."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "กลยุทธ์การจัดระเบียบรูรั่วการเงินของสตรีมมิ่งเพื่อการลดค่าใช้จ่ายที่ดีที่สุด?" : "What is the best strategy to optimize streaming costs?"}
          a={lang === "TH" ? 
            "หนึ่งในวิธีการที่ดีที่สุดคือ 'การสมัครสลับช่วงเวลา' (Subscription Hopping) โดยการไม่เปิดแพลตฟอร์มความบันเทิงทุกตัวพร้อมกัน หากคุณอยากชมซีรีส์ยอดฮิตในแอปพลิเคชัน A แนะนำให้กดเปิดรับสมาชิกและชำระเงินเพื่อดูจนจบภายใน 1-2 เดือน จากนั้นทำเรื่องกดยกเลิกทันที (Cancel subscription) แล้วจึงย้ายไปสมัครแอป B เพื่อรับชมคอนเทนต์ถัดไป วิธีนี้จะช่วยยึดยอดจ่ายในแต่ละเดือนให้ไม่เกิน 1-2 แพลตฟอร์มพร้อมกัน (ประหยัดได้ถึง 50-70% จากปกติ) และการใช้ฟังก์ชันแชร์แพลนแบบครอบครัว (Family Plans) ที่ถูกต้องตามกฎเกณฑ์"
            : "Utilize 'subscription hopping' by rotating between apps. Subscribe to one service, watch its popular shows, cancel, and move to another service next month."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "การนำค่าสมาชิกความบันเทิงรายเดือนไปตั้งออมส่งผลต่อความมั่งคั่งในบั้นปลายอย่างไร?" : "How does shifting streaming fees to investments affect long-term wealth?"}
          a={lang === "TH" ? 
            "หากคุณยกเลิกบริการที่ซ้ำซ้อนและเซฟเงินกลับคืนมาได้ 1,000 บาทต่อเดือน (12,000 บาทต่อปี) แล้วนำเงินออมก้อนนี้ย้ายเข้าสู่แผนออมหุ้นสะสมอัตโนมัติรายเดือน (DCA) ในกองทุนรวมดัชนีหุ้นไทยหรือสหรัฐฯ ที่ให้ผลตอบแทนเฉลี่ยประมาณ 8% ต่อปีแบบทบต้น เมื่อเวลาผ่านไป 20 ปี เงินก้อนเล็กนี้จะขยายใหญ่เป็นมูลค่าเกือบ 590,000 บาท ซึ่งสามารถใช้เป็นรากฐานทางการเงินและมีความหมายมากกว่าค่าดูสตรีมมิ่งที่กดเล่นทิ้งไว้โดยไม่มีเวลาเปิดดูอย่างแท้จริง"
            : "Saving 1,000 THB a month instead of spending it on unused streaming, and investing it in a index fund yielding 8% for 20 years, creates a nest egg of nearly 590,000 THB."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เกณฑ์มาตรฐานใดที่จะเป็นตัวบ่งชี้ว่าเราควรยกเลิกบริการใดบริการหนึ่งทันที?" : "What criteria indicates it is time to cancel a subscription?"}
          a={lang === "TH" ? 
            "ให้ใช้กฎ 'ระยะเวลาใช้งาน 30 วัน' คือหากในรอบ 30 วันที่ผ่านมา คุณมีพฤติกรรมเปิดใช้บริการแพลตฟอร์มนั้นไม่ถึง 3 ครั้ง หรือใช้เวลาดูเฉลี่ยสัปดาห์ละไม่ถึง 1 ชั่วโมง นั่นคือหลักฐานที่ยืนยันว่าคุณไม่มีเวลาว่างเพียงพอสำหรับแอปพลิเคชันนั้นแล้ว การกดยกเลิกในวันนี้จะช่วยประหยัดเงินในกระเป๋าของคุณทันที และหากอนาคตคุณมีความต้องการกลับมาดูรายการเด็ด ก็สามารถขอกดเข้าระบบเพื่อชำระเงินใหม่ได้ทุกเมื่อที่ต้องการ"
            : "Use the '30-day usage rule': if you logged into the application less than 3 times or watched less than one hour total in the past month, cancel it immediately."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 9. Coffee Shop Annual Cost (ID: coffee-shop-annual-cost)
// ============================================================================
export function CoffeeShopAnnualCost({ lang }: { lang: Lang }) {
  const [cupPrice, setCupPrice] = useLocalState("cs-price", "120");
  const [cupsPerWeek, setCupsPerWeek] = useLocalState("cs-cups", "5");
  const [bakeryPrice, setBakeryPrice] = useLocalState("cs-bakery", "50");
  const [homeBrewPrice, setHomeBrewPrice] = useLocalState("cs-home", "20");

  const cup = Number(cupPrice) || 0;
  const cw = Number(cupsPerWeek) || 0;
  const bak = Number(bakeryPrice) || 0;
  const hb = Number(homeBrewPrice) || 0;

  const totalPerVisit = cup + bak;
  const monthlyCost = totalPerVisit * (cw * 4.33);
  const annualCost = totalPerVisit * (cw * 52);

  const homeBrewAnnualCost = hb * (cw * 52);
  const annualSavings = Math.max(0, annualCost - homeBrewAnnualCost);

  // Future Value of savings over 15 years at 6% interest rate
  const P = annualSavings / 12;
  const r = 0.06;
  const n = 15;
  const numMonths = n * 12;
  const monthlyRate = r / 12;
  const futureValue = P > 0 
    ? P * ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate) * (1 + monthlyRate)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
          <Coffee className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่ากาแฟและของว่างนอกบ้านต่อปี" : "Annual Coffee Shop Expense Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "วิเคราะห์ค่ากาแฟนอกบ้าน เบเกอรี่สะสม และคำนวณเงินออมที่จะได้จากการชงดื่มเอง" 
            : "Evaluate your café expenses, home-brewing savings, and future value growth."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "กรอกข้อมูลพฤติกรรมการดื่ม" : "Your Coffee Habits"}</h3>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคากาแฟต่อแก้ว (บาท)" : "Coffee Cost per Cup (THB)"}</label>
            <NumericInput value={cupPrice} onChange={setCupPrice} placeholder="120" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนแก้วที่ดื่มต่อสัปดาห์ (แก้ว)" : "Cups per Week"}</label>
            <NumericInput value={cupsPerWeek} onChange={setCupsPerWeek} placeholder="5" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าขนม/เค้กเสริมเฉลี่ยต่อครั้ง (บาท)" : "Snacks & Bakery per Visit (THB)"}</label>
            <NumericInput value={bakeryPrice} onChange={setBakeryPrice} placeholder="50" />
          </div>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ต้นทุนหากชงดื่มเองต่อแก้ว (บาท)" : "Home Brew Cost per Cup (THB)"}</label>
            <NumericInput value={homeBrewPrice} onChange={setHomeBrewPrice} placeholder="20" />
          </div>
        </div>

        <div id="coffee-result-card" className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "สรุปงบกาแฟและเงินออม" : "Coffee Spending & Savings Summary"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายเฉลี่ยต่อเดือน" : "Average Monthly Cost"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {monthlyCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ค่าใช้จ่ายเฉลี่ยต่อปี" : "Average Annual Cost"}</p>
                <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {annualCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 dark:border-amber-900/30 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang === "TH" ? "หากเปลี่ยนมาชงดื่มเองจะเซฟเงินได้:" : "Potential Savings if Brewed at Home:"}</span>
                  <span className="font-bold text-green-600 dark:text-green-400">+{annualSavings.toLocaleString()} ฿ / ปี</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang === "TH" ? "หากนำเงินประหยัดนี้ไปลงทุน 15 ปี (ผลตอบแทน 6%):" : "Invested Savings Value in 15 Years (6% Return):"}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{futureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ExportResult elementId="coffee-result-card" fileName="coffee-shop-annual-cost" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับค่ากาแฟนอกบ้าน" : "Coffee Shop Annual Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Latte Factor คืออะไร และส่งผลกระทบต่อแผนการเงินระยะยาวของเราอย่างไร?" : "What is the Latte Factor?"}
          a={lang === "TH" ? 
            "The Latte Factor หรือ 'ปัจจัยค่ากาแฟลาเต้' เป็นแนวคิดทางการเงินส่วนบุคคลที่นำเสนอโดย David Bach ซึ่งอธิบายถึงรายจ่ายในชีวิตประจำวันเล็กๆ น้อยๆ ที่ดูเหมือนไม่มีนัยสำคัญ เช่น กาแฟพรีเมียมนอกบ้าน น้ำปั่นหวานๆ ค่าขนมขบเคี้ยว หรือค่าบริการปลีกย่อย ที่เราชำระออกไปโดยไม่มีเป้าหมาย แต่เมื่อสะสมรวมกันเป็นสิบๆ ปีกลับเป็นยอดเงินหลักแสนหลักล้านบาทที่สามารถนำไปสร้างอิสรภาพทางการเงินหรือชำระหนี้สินก้อนโตได้ การคำนวณและลดการจ่ายที่ไม่จำเป็นนี้ลงจึงช่วยเปิดทางให้ยอดเงินลงทุนเติบโตแบบก้าวกระโดด"
            : "The Latte Factor represents small daily expenditures (like premium coffees or sweet drinks) that seem negligible but compound into substantial financial sums over several decades."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เคล็ดลับและอุปกรณ์ในการชงกาแฟดื่มเองที่บ้านและที่ทำงานให้มีรสชาติดีและประหยัดงบ?" : "How to brew delicious and cost-friendly coffee at home?"}
          a={lang === "TH" ? 
            "การสร้างกาแฟอร่อยและประหยัดไม่จำเป็นต้องครอบครองเครื่องสกัดแรงดันขนาดใหญ่ราคาแพง คุณสามารถใช้เครื่องมือกาแฟเหล่านี้: 1. ชุดดริปกาแฟ (Drip / Pour-over) ด้วยกระดาษกรองและเหยือก 2. หม้อต้มกาแฟมอคค่าพ็อท (Moka Pot) ที่ให้ความรู้สึกเข้มข้นคล้ายเอสเพรสโซ 3. เครื่องชงแบบกดฝรั่งเศส (French Press) ซึ่งทำได้สะดวก รวดเร็ว และเมื่อซื้อเมล็ดกาแฟไทยคุณภาพดีมาบดชงเอง ต้นทุนเมล็ดกาแฟจะตกอยู่ที่แก้วละเพียง 15-20 บาท ซึ่งช่วยลดค่าใช้จ่ายสะสมไปได้ถึง 80%"
            : "Use simple brewers like a Moka Pot, French Press, or Pour-over kit combined with fresh locally-roasted coffee beans to drop your per-cup cost to just 15-20 THB."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "ราคากาแฟสดแก้วละ 120-150 บาท ประกอบไปด้วยต้นทุนอะไรแฝงอยู่บ้าง?" : "What are you actually paying for in a 120-150 THB coffee?"}
          a={lang === "TH" ? 
            "ในโครงสร้างราคาตลาดของกาแฟแก้วละ 120-150 บาทนั้น ต้นทุนเนื้อสารวัตถุดิบ (เมล็ดกาแฟแท้ ครีม นมสด แก้วและฝา) มีน้ำหนักคิดเป็นสัดส่วนเพียง 15-25% ของราคาขายรวม (ประมาณ 20-30 บาท) เท่านั้น ส่วนที่เหลืออีก 75-85% คือค่าบริการแฝงที่คุณกำลังจ่ายให้แก่ธุรกิจ เช่น ค่าเช่าพื้นที่ทำเลทองตกแต่งสวยงาม ค่าเครื่องปรับอากาศ ค่าบริการ Wi-Fi โคมไฟ ค่าพนักงานชงกาแฟบาริสต้า และงบประมาณการตลาด ดังนั้น การซื้อกลับไปทานเองที่บ้านจึงเป็นวิธีการตัดลดต้นทุนที่ไม่จำเป็นนี้ออกได้โดยตรง"
            : "Only 15-25% of a premium cup covers the raw materials (coffee beans, cup, milk). The remaining 75-85% is overhead for rental space, interior styling, Wi-Fi, air conditioning, and barista wages."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "การลดละกาแฟนอกบ้านแปลว่าเรากำลังลดทอนความสุขในชีวิตและสังคมลงหรือไม่?" : "Does skipping café visits ruin your lifestyle and happiness?"}
          a={lang === "TH" ? 
            "ไม่จำเป็นเลย การตัดรายจ่ายอย่างสุดโต่งอาจสร้างความเครียดทางการเงินและลดความสุข การใช้วิธีเดินทางสายกลาง เช่น จำกัดวันเข้าร้านคาเฟ่ระดับหรูเฉพาะวันหยุดเสาร์-อาทิตย์เพื่อสุนทรียภาพกับเพื่อนฝูงหรือครอบครัว ส่วนวันทำงานปกติเลือกชงกาแฟดริปจากบ้านใส่กระติกเก็บความเย็นพกพาไปดื่มที่ทำงาน จะช่วยรักษาสภาพอารมณ์และบุคลิกภาพการเงินของคุณให้สมดุลและอยู่รอดในแผนออมระยะยาวอย่างสบาย"
            : "No. Balancing lifestyle choices by going to high-end cafes as a weekend treat while brewing at home during workdays is a sustainable compromise."
          }
        />
      </SEOFAQ>
    </div>
  );
}

// ============================================================================
// 10. Smoking & Vaping Cost (ID: smoking-vaping-cost)
// ============================================================================
export function SmokingVapingCost({ lang }: { lang: Lang }) {
  const [productType, setProductType] = useLocalState("sv-type", "smoke"); // smoke or vape
  
  // Traditional smoke
  const [packPrice, setPackPrice] = useLocalState("sv-pack-price", "70");
  const [packsPerWeek, setPacksPerWeek] = useLocalState("sv-packs-week", "3");

  // Vaping
  const [devicePrice, setDevicePrice] = useLocalState("sv-device-price", "1200"); // annual
  const [podPrice, setPodPrice] = useLocalState("sv-pod-price", "120");
  const [podsPerWeek, setPodsPerWeek] = useLocalState("sv-pods-week", "2");

  const pack = Number(packPrice) || 0;
  const pw = Number(packsPerWeek) || 0;

  const device = Number(devicePrice) || 0;
  const pod = Number(podPrice) || 0;
  const pow = Number(podsPerWeek) || 0;

  let weeklyCost = 0;
  if (productType === "smoke") {
    weeklyCost = pack * pw;
  } else {
    weeklyCost = (device / 52) + (pod * pow);
  }

  const monthlyCost = weeklyCost * 4.33;
  const annualCost = weeklyCost * 52;
  const tenYearCost = annualCost * 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          <Flame className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {lang === "TH" ? "คำนวณค่าบุหรี่และบุหรี่ไฟฟ้าต่อปี" : "Annual Smoking & Vaping Cost Calculator"}
        </h2>
        <p className="text-gray-500">
          {lang === "TH" 
            ? "คำนวณเงินสดที่สูญเสียไปกับการสูบบุหรี่หรือพอตไฟฟ้า สะสมในระยะสั้นและระยะยาว" 
            : "Estimate your costs related to traditional smoking or electronic vaping."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">{lang === "TH" ? "ประเภทผลิตภัณฑ์และพฤติกรรม" : "Smoking / Vaping Habits"}</h3>

          <div>
            <label className={labelClass}>{lang === "TH" ? "ประเภทสารเสพติด" : "Product Type"}</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setProductType("smoke")}
                className={`py-2 px-4 rounded-xl font-bold text-sm border-2 transition-all ${
                  productType === "smoke" 
                    ? "border-red-500 bg-red-500/10 text-red-500" 
                    : "border-gray-200 dark:border-white/10 text-gray-500"
                }`}
              >
                {lang === "TH" ? "บุหรี่มวน" : "Cigarettes"}
              </button>
              <button 
                onClick={() => setProductType("vape")}
                className={`py-2 px-4 rounded-xl font-bold text-sm border-2 transition-all ${
                  productType === "vape" 
                    ? "border-red-500 bg-red-500/10 text-red-500" 
                    : "border-gray-200 dark:border-white/10 text-gray-500"
                }`}
              >
                {lang === "TH" ? "บุหรี่ไฟฟ้า (พอต)" : "Vaping / Pod"}
              </button>
            </div>
          </div>

          {productType === "smoke" ? (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>{lang === "TH" ? "ราคาต่อซอง (บาท)" : "Price per Pack (THB)"}</label>
                <NumericInput value={packPrice} onChange={setPackPrice} placeholder="70" />
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "จำนวนซองที่สูบต่อสัปดาห์ (ซอง)" : "Packs per Week"}</label>
                <NumericInput value={packsPerWeek} onChange={setPacksPerWeek} placeholder="3" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{lang === "TH" ? "ค่าเครื่องพอตต่อปี (฿)" : "Annual Device Cost"}</label>
                  <NumericInput value={devicePrice} onChange={setDevicePrice} placeholder="1,200" />
                </div>
                <div>
                  <label className={labelClass}>{lang === "TH" ? "ราคาหัวพอต/น้ำยา (฿)" : "Pod/Liquid Price"}</label>
                  <NumericInput value={podPrice} onChange={setPodPrice} placeholder="120" />
                </div>
              </div>
              <div>
                <label className={labelClass}>{lang === "TH" ? "จำนวนหัวพอต/ขวดน้ำยาต่อสัปดาห์" : "Pods/Bottles per Week"}</label>
                <NumericInput value={podsPerWeek} onChange={setPodsPerWeek} placeholder="2" />
              </div>
            </div>
          )}
        </div>

        <div id="smoking-result-card" className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
              {lang === "TH" ? "ประมาณการเงินสูญเสีย" : "Projected Smoking Cost"}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "เฉลี่ยต่อเดือน" : "Average Monthly Cost"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {monthlyCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดเงินจมสะสมต่อปี" : "Total Annual Loss"}</p>
                <p className="text-4xl font-black text-red-600 dark:text-red-400 mt-1">
                  {annualCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-lg font-bold ml-1">฿ / ปี</span>
                </p>
              </div>

              <div className="pt-4 border-t border-red-100 dark:border-red-900/30">
                <p className="text-sm text-gray-500">{lang === "TH" ? "ยอดสูญเสียใน 10 ปี" : "Projected 10-Year Loss"}</p>
                <p className="text-2xl font-black text-red-800 dark:text-red-400 mt-1">
                  {tenYearCost.toLocaleString("en-US", { maximumFractionDigits: 0 })} ฿
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {lang === "TH" 
                    ? "* นี่เป็นเพียงต้นทุนของบุหรี่เท่านั้น ไม่ได้คิดค่ารักษาโรคทางเดินหายใจ" 
                    : "* Extrapolated value excluding inflation and subsequent healthcare bills."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <ExportResult elementId="smoking-result-card" fileName="smoking-vaping-cost" lang={lang} />
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อยเกี่ยวกับค่าบุหรี่และสุขภาพการเงิน" : "Smoking & Vaping Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "การสูบบุหรี่และบุหรี่ไฟฟ้ามีผลกระทบทำลายความมั่งคั่งระยะยาวอย่างไร?" : "How does smoking/vaping destroy long-term wealth?"}
          a={lang === "TH" ? 
            "การใช้เงินซื้อสิ่งเสพติดกลุ่มนิโคตินเป็นรายจ่ายที่ไม่เพียงทำลายสุขภาพกาย แต่เป็นเครื่องกัดกร่อนสภาพการเงินที่แยบยลที่สุด (Silent Wealth Erosion) นอกเหนือจากการจ่ายค่าบุหรี่ตรงๆ ทุกวันแล้ว ผู้สูบยังมีภาระรายจ่ายแฝง เช่น ค่าเบี้ยประกันสุขภาพและประกันชีวิตที่สูงกว่าผู้ไม่สูบ 1.5-2 เท่าเนื่องจากความเสี่ยงสูง ค่าทำความสะอาดกลิ่นเสื้อผ้าบ้าน และที่น่าสะพรึงกลัวที่สุดคือ ค่าใช้จ่ายในการดูแลรักษาโรคเรื้อรัง (เช่น โรคมะเร็ง โรคปอดอุดกั้น โรคหลอดเลือดหัวใจ) ซึ่งอาจทำลายเงินออมที่หามาทั้งชีวิตจนหมดสิ้น"
            : "Beyond direct daily purchases, smoking inflicts huge hidden wealth erosion through 1.5-2x higher health insurance premiums, smell remediation costs, and catastrophic medical bills from chronic illness later in life."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "หลังจากการประกาศเลิกบุหรี่ ร่างกายและอวัยวะจะฟื้นฟูตามกำหนดเวลาอย่างไร?" : "What is the physical timeline of health recovery after quitting?"}
          a={lang === "TH" ? 
            "1. ภายใน 20 นาที: ระดับความดันโลหิตและชีพจรหัวใจกลับคืนสู่สภาวะปกติ 2. ภายใน 12 ชั่วโมง: ปริมาณก๊าซคาร์บอนมอนอกไซด์ในกระแสเลือดลดลงเป็นปกติ ปลายประสาทตื่นตัว 3. ภายใน 2 สัปดาห์ - 3 เดือน: ระบบไหลเวียนโลหิตไหลลื่นขึ้น ปอดทำงานได้ดีขึ้นถึง 30% 4. ภายใน 1 ปี: ความเสี่ยงการเกิดโรคหัวใจขาดเลือดลดเหลือเพียงครึ่งเดียวของผู้ที่ยังสูบอยู่ 5. ภายใน 10-15 ปี: ความเสี่ยงเป็นมะเร็งปอดและเส้นเลือดสมองแตกตีบตันจะลดลงเท่าคนสุขภาพดีที่ไม่เคยสูบเลย"
            : "Within 20 mins, heart rate and blood pressure drop to normal; in 12 hours, blood oxygen stabilizes; in 1 year, coronary heart disease risk drops by 50%; in 10 years, lung cancer risks reduce by half."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "บุหรี่ไฟฟ้า (Vape/Pod) ช่วยประหยัดเงินได้ดีกว่าบุหรี่มวนจริงหรือเป็นเพียงคำโฆษณาชวนเชื่อ?" : "Are e-cigarettes/vapes actually cheaper than traditional cigarettes?"}
          a={lang === "TH" ? 
            "บุหรี่ไฟฟ้าอาจให้ความรู้สึกว่าราคาเฉลี่ยต่อสัปดาห์เบากว่าในการเริ่มทดลองใช้งานระยะแรก แต่อัตราการสูบบุหรี่ไฟฟ้ามักจะสูงกว่าบุหรี่มวนเนื่องจากไม่มีกำหนดหมดมวนที่ขัดจังหวะ และสามารถแอบสูบในร่มหรือในบ้านได้ง่าย ส่งผลให้ร่างกายดูดซึมนิโคตินสูงขึ้นจนติดลึกขึ้นและต้องซื้อหัวพอตหรือน้ำยาเติมถี่ขึ้นเรื่อยๆ ประกอบกับค่าตัวเครื่องที่เกิดความร้อนขัดข้อง แบตเตอรี่พังง่ายต้องคอยจัดซื้อทดแทน ท้ายที่สุดงบค่าใช้จ่ายของบุหรี่ไฟฟ้าจึงแทบไม่ต่างหรือบางรายบานปลายสูงกว่าเดิมด้วยซ้ำ"
            : "No. Vapes make it easier to puff frequently in indoor environments, leading to higher nicotine consumption. Combined with fragile device parts and coil replacements, costs often meet or exceed traditional smoking."
          }
        />
        <FAQItem 
          q={lang === "TH" ? "เงินสดที่หยุดสูบแล้วนำไปสมทบลงทุนออมหุ้น จะเปลี่ยนเป็นเม็ดเงินได้ขนาดไหน?" : "How much can you save and invest by quitting smoking?"}
          a={lang === "TH" ? 
            "สมมติคุณสูบบุหรี่สัปดาห์ละ 3 ซอง ซองละ 150 บาท (ประมาณเดือนละ 1,950 บาท หรือ 23,400 บาทต่อปี) หากนำเงินนี้ไปจัดโปรแกรมตัดสะสมลงทุนแบบรายเดือนสม่ำเสมอ (DCA) ในกองทุนหุ้นผลตอบแทนเฉลี่ย 8% ต่อปี เมื่อสะสมผ่านไป 10 ปี คุณจะเก็บเกี่ยวเงินสะสมรวมได้ถึง 360,000 บาท และหากอดทนทำต่อไปถึง 25 ปี เงินก้อนนี้จะทวีคูณเป็นเงินเก็บเพื่อรองรับชีวิตวัยเกษียณสูงถึง 1.8 ล้านบาท ซึ่งคุ้มค่าและสร้างสุขอย่างถาวร"
            : "Quitting a 3-pack-a-week habit (approx. 1,950 THB monthly) and putting it into an 8% compounding index fund creates over 360,000 THB in 10 years and roughly 1.8 million THB in 25 years."
          }
        />
      </SEOFAQ>
    </div>
  );
}
