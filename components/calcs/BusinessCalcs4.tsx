"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { Briefcase, TrendingDown, Users, PackageMinus, Ship, Clock } from "lucide-react";

// ---------------------------------------------------------
// 17. EOQ (Economic Order Quantity)
// ---------------------------------------------------------
export function EOQCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [demand, setDemand] = useLocalState("eoq-d", "10000");
  const [orderCost, setOrderCost] = useLocalState("eoq-s", "500");
  const [holdingCost, setHoldingCost] = useLocalState("eoq-h", "10");

  const calc = () => {
    const D = Number(demand) || 0;
    const S = Number(orderCost) || 0;
    const H = Number(holdingCost) || 0;
    
    if (D <= 0 || S <= 0 || H <= 0) return { eoq: 0, orders: 0 };

    // EOQ Formula: sqrt((2 * D * S) / H)
    const eoq = Math.sqrt((2 * D * S) / H);
    const ordersPerYear = D / eoq;

    return { eoq: Math.round(eoq), orders: Math.round(ordersPerYear) };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <Briefcase className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณจุดสั่งซื้อที่ประหยัดที่สุด (EOQ)" : "Economic Order Quantity (EOQ)"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณปริมาณการสั่งซื้อสินค้าที่ทำให้ต้นทุนรวมต่ำที่สุด" : "Calculate the ideal order quantity to minimize total inventory costs."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ความต้องการสินค้าต่อปี (ชิ้น)" : "Annual Demand (units)"}</label>
            <input type="number" value={demand} onChange={e=>setDemand(e.target.value)} className={inputClass} placeholder="10000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ต้นทุนการสั่งซื้อแต่ละครั้ง (บาท)" : "Cost per Order (S)"}</label>
            <input type="number" value={orderCost} onChange={e=>setOrderCost(e.target.value)} className={inputClass} placeholder="500" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ต้นทุนการจัดเก็บ (บาท/ชิ้น/ปี)" : "Holding Cost per unit/year (H)"}</label>
            <input type="number" value={holdingCost} onChange={e=>setHoldingCost(e.target.value)} className={inputClass} placeholder="10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl text-center border border-blue-100 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">{lang === "TH" ? "ปริมาณสั่งซื้อที่คุ้มค่าที่สุด (EOQ)" : "Optimal Order Quantity (EOQ)"}</p>
          <div className="text-5xl font-black text-blue-600 dark:text-blue-400">
            {res.eoq.toLocaleString()} <span className="text-2xl font-normal">{lang === "TH" ? "ชิ้น/ครั้ง" : "Units"}</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 font-medium mb-2">{lang === "TH" ? "ความถี่ในการสั่งซื้อ" : "Order Frequency"}</p>
          <div className="text-5xl font-black text-slate-700 dark:text-white">
            {res.orders} <span className="text-2xl font-normal">{lang === "TH" ? "ครั้ง/ปี" : "Times/Year"}</span>
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (EOQ)" : "EOQ FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "EOQ (Economic Order Quantity) คืออะไร ทำไมธุรกิจต้องใช้?" : "What is EOQ and why is it important for business?"} 
          a={lang === "TH" ? 
`EOQ (Economic Order Quantity) หรือ "ปริมาณการสั่งซื้อที่ประหยัดที่สุด" เป็นโมเดลทางคณิตศาสตร์ที่ใช้ในคลังสินค้าและการจัดการซัพพลายเชน เพื่อหา "จุดสมดุล" ระหว่างต้นทุน 2 ชนิด ได้แก่:

1. **ต้นทุนการสั่งซื้อ (Ordering Costs):** เช่น ค่าทำเอกสาร ค่าขนส่ง ค่าตรวจรับของ ยิ่งคุณสั่งซื้อบ่อย (ครั้งละน้อยๆ) ต้นทุนส่วนนี้ก็จะยิ่งสูงขึ้น
2. **ต้นทุนการจัดเก็บ (Holding / Carrying Costs):** เช่น ค่าเช่าโกดัง ค่าเสื่อมสภาพ ค่าไฟ ค่าประกันภัยสินค้า ยิ่งคุณสั่งของมาสต็อกครั้งละมากๆ (เพื่อให้ได้ของถูกหรือลดค่าขนส่ง) ต้นทุนส่วนนี้ก็จะพุ่งสูงขึ้น

EOQ จะเข้ามาช่วยคำนวณหาตัวเลขที่ทำให้กราฟของต้นทุน 2 ตัวนี้ตัดกันในจุดที่ "ต่ำที่สุด" ทำให้ธุรกิจของคุณมีสินค้าพร้อมขายโดยที่เงินไม่ไปจมอยู่ในโกดังมากเกินไป และไม่ต้องเสียค่าขนส่งบ่อยเกินไป ถือเป็นพื้นฐานสำคัญสำหรับธุรกิจค้าปลีก โรงงานอุตสาหกรรม และร้านค้า E-commerce

อ้างอิง:
- Harris, F. W. (1913). How many parts to make at once. Factory, The Magazine of Management.` 
          : "EOQ finds the sweet spot that minimizes both ordering and holding costs."} 
        />
        <FAQItem 
          q={lang === "TH" ? "โมเดล EOQ มีข้อจำกัด หรือสมมติฐานอะไรบ้างที่ต้องระวัง?" : "What are the limitations of the EOQ model?"} 
          a={lang === "TH" ? 
`แม้สูตร EOQ จะดูสมบูรณ์แบบ แต่ในโลกธุรกิจจริง โมเดลนี้ถูกสร้างขึ้นบนสมมติฐาน (Assumptions) บางอย่างที่อาจไม่ได้เกิดขึ้นจริงเสมอไป เช่น:

1. **ความต้องการสินค้าคงที่ (Constant Demand):** สูตร EOQ สมมติว่าลูกค้าจะซื้อสินค้าเท่าๆ กันทุกวันตลอดทั้งปี แต่ในความเป็นจริง สินค้าหลายชนิดมีฤดูกาล (Seasonality) เช่น เสื้อกันหนาว หรือร่ม
2. **ไม่มีส่วนลดเมื่อซื้อจำนวนมาก (No Quantity Discounts):** สูตรไม่ได้นำเรื่อง "การลดราคาเมื่อซื้อยกล็อตใหญ่" มาคำนวณ ซึ่งบางครั้งการยอมสต็อกของเพิ่มขึ้นเพื่อให้ได้ส่วนลดจากซัพพลายเออร์ อาจจะคุ้มค่ากว่าการสั่งแบบ EOQ
3. **ระยะเวลารอคอยคงที่ (Constant Lead Time):** สูตรเชื่อว่าสั่งของปุ๊บ จะได้ของในเวลาที่กำหนดเป๊ะๆ โดยไม่เผื่อความล่าช้าจากการขนส่ง (Supply chain disruptions)

ดังนั้น ผู้จัดการคลังสินค้าจึงมักใช้ EOQ เป็น "ตัวเลขตั้งต้น (Baseline)" จากนั้นจะนำตัวแปรอื่นๆ เช่น ส่วนลด หรือค่าความเผื่อขาดแคลน (Safety Stock) มาปรับใช้จริงร่วมด้วยครับ` 
          : "EOQ assumes constant demand, instant delivery, and no bulk discounts."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 18. Churn Rate & 19. Retention Rate (Combined)
// ---------------------------------------------------------
export function ChurnRetentionCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [start, setStart] = useLocalState("cr-start", "1000");
  const [newCust, setNewCust] = useLocalState("cr-new", "200");
  const [end, setEnd] = useLocalState("cr-end", "1100");

  const calc = () => {
    const s = Number(start) || 0;
    const n = Number(newCust) || 0;
    const e = Number(end) || 0;

    if (s <= 0) return { churn: 0, retention: 0, lost: 0 };

    // Customers lost = (Start + New) - End
    const lost = (s + n) - e;
    
    // Standard Churn Rate = (Lost / Start) * 100
    // (Some formulas use average customers, but this is the simplest SaaS standard)
    const churn = (lost / s) * 100;
    
    // Standard Retention Rate = ((End - New) / Start) * 100
    const retention = ((e - n) / s) * 100;

    return { churn: churn.toFixed(1), retention: retention.toFixed(1), lost };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          <TrendingDown className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณอัตรายกเลิกบริการ (Churn) & การรักษาลูกค้า (Retention)" : "Churn & Retention Rate"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ตัวชี้วัดความอยู่รอดของธุรกิจแบบสมัครสมาชิก (Subscription) และ SaaS" : "Key metrics for Subscription and SaaS businesses."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ลูกค้าตอนต้นเดือน/ปี (Start)" : "Customers at Start"}</label>
            <input type="number" value={start} onChange={e=>setStart(e.target.value)} className={inputClass} placeholder="1000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ลูกค้าใหม่ที่หาได้ (New)" : "New Customers Acquired"}</label>
            <input type="number" value={newCust} onChange={e=>setNewCust(e.target.value)} className={inputClass} placeholder="200" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ลูกค้าตอนสิ้นเดือน/ปี (End)" : "Customers at End"}</label>
            <input type="number" value={end} onChange={e=>setEnd(e.target.value)} className={inputClass} placeholder="1100" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl text-center border border-red-100 dark:border-red-800 relative overflow-hidden">
          <p className="text-red-800 dark:text-red-200 font-medium mb-2">{lang === "TH" ? "อัตรายกเลิกบริการ (Churn Rate)" : "Churn Rate"}</p>
          <div className="text-6xl font-black text-red-600 dark:text-red-400 mb-2">
            {res.churn}%
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            {lang === "TH" ? `ลูกค้าที่หายไป: ${res.lost} คน` : `Lost Customers: ${res.lost}`}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl text-center border border-green-100 dark:border-green-800 relative overflow-hidden">
          <p className="text-green-800 dark:text-green-200 font-medium mb-2">{lang === "TH" ? "อัตราการรักษาลูกค้า (Retention Rate)" : "Retention Rate"}</p>
          <div className="text-6xl font-black text-green-600 dark:text-green-400 mb-2">
            {res.retention}%
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            {lang === "TH" ? "ยิ่งสูงยิ่งดี (ทะลุ 90% คือธุรกิจที่แข็งแกร่ง)" : "Higher is better. >90% is excellent."}
          </p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Churn & Retention)" : "Churn & Retention FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Churn Rate คืออะไร และทำไมถึงเป็น 'นักฆ่าเงียบ' ของธุรกิจ?" : "What is Churn Rate and why is it the silent killer of businesses?"} 
          a={lang === "TH" ? 
`Churn Rate (อัตราการยกเลิกบริการ) คือ เปอร์เซ็นต์ของลูกค้าที่ "ยกเลิก" หรือหยุดซื้อสินค้า/บริการของคุณในช่วงเวลาหนึ่ง เป็นตัวชี้วัดที่สำคัญที่สุดสำหรับธุรกิจรูปแบบสมาชิก (Subscription) เช่น Netflix, ฟิตเนส, แอปพลิเคชัน หรือแม้กระทั่งร้านกาแฟที่มีระบบสมาชิก

**ทำไมมันถึงเป็นนักฆ่าเงียบ?**
ลองจินตนาการว่าคุณมีลูกค้า 1,000 คน และทีมเซลส์ของคุณหาลูกค้าใหม่ได้เดือนละ 100 คน (เติบโต 10%) ฟังดูดีมากใช่ไหม? แต่ถ้าคุณมี Churn Rate สูงถึง 15% หมายความว่าในเดือนนั้นคุณเสียลูกค้าเก่าไปถึง 150 คน สรุปว่าแม้เซลส์จะทำงานหนักแค่ไหน ธุรกิจของคุณก็ยังคง "หดตัวลง" ติดลบ 50 คนในเดือนนั้น (นี่คืออาการของธุรกิจแบบ Leaky Bucket หรือถังน้ำรั่ว)

ในวงการธุรกิจ ต้นทุนในการหาลูกค้าใหม่ (Customer Acquisition Cost - CAC) แพงกว่าการรักษาลูกค้าเก่า (Retention) ถึง 5-25 เท่า การลด Churn Rate ลงเพียงแค่ 5% สามารถเพิ่มผลกำไรให้บริษัทได้ถึง 25% - 95% เลยทีเดียว

อ้างอิง:
- Reichheld, F. F., & Sasser, W. E. (1990). Zero defections: Quality comes to services. Harvard Business Review.` 
          : "Churn rate is the percentage of customers who stop using your service. High churn destroys growth like a leaky bucket."} 
        />
        <FAQItem 
          q={lang === "TH" ? "Retention Rate คืออะไร และระดับที่ถือว่า 'ดี' ควรอยู่ที่เท่าไหร่?" : "What is a 'good' Retention Rate?"} 
          a={lang === "TH" ? 
`Retention Rate (อัตราการรักษาลูกค้า) คือ เปอร์เซ็นต์ตรงข้ามกับ Churn Rate มันบอกว่าในรอบเดือนหรือรอบปีนั้น คุณสามารถ "รั้ง" ลูกค้าเก่าให้อยู่กับคุณต่อไปได้กี่เปอร์เซ็นต์ (ไม่นับรวมลูกค้าใหม่ที่เพิ่งเข้ามา)

อัตราที่ดี (Good Retention Rate) ขึ้นอยู่กับอุตสาหกรรม (Industry Benchmark) อย่างมาก:
- **E-commerce:** Retention Rate มักจะต่ำ (ประมาณ 20-30%) เพราะผู้บริโภคเปลี่ยนใจง่าย
- **SaaS (Software as a Service) องค์กร (B2B):** เช่น ระบบบัญชี ระบบจัดการ HR ควรรักษาได้ที่ **90% ขึ้นไป** เพราะการเปลี่ยนระบบสำหรับองค์กรเป็นเรื่องยาก (High Switching Cost)
- **แอปพลิเคชันมือถือ (B2C):** โหดร้ายที่สุด ผู้ใช้กว่า 70-80% ลบแอปทิ้งภายในสัปดาห์แรก การมี Retention 30 วันที่ 20% ก็ถือว่าหรูแล้ว

**วิธีเพิ่ม Retention Rate:** ธุรกิจยุคใหม่มักใช้ระบบ Onboarding ที่ดี, การมี Customer Success Manager คอยช่วยเหลือ, และระบบสะสมแต้ม (Loyalty Program) เพื่อดึงดูดให้ลูกค้าอยู่กับแบรนด์นานที่สุดครับ` 
          : "Retention rate is the percentage of customers you keep. A good rate depends on industry: B2B SaaS should be >90%, while B2C Apps might be 20%."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 20. Shrinkage Calculator
// ---------------------------------------------------------
export function ShrinkageCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [recordedInventory, setRecordedInventory] = useLocalState("sh-rec", "500000");
  const [actualInventory, setActualInventory] = useLocalState("sh-act", "485000");

  const calc = () => {
    const rec = Number(recordedInventory) || 0;
    const act = Number(actualInventory) || 0;
    if (rec <= 0) return { loss: 0, percent: 0 };

    const loss = rec - act;
    const percent = (loss / rec) * 100;
    return { loss, percent: percent.toFixed(2) };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
          <PackageMinus className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณการสูญเสียสต็อก (Inventory Shrinkage)" : "Inventory Shrinkage"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณความสูญเสียจากของหาย ของเสีย หรือถูกขโมยในร้านค้าปลีก" : "Calculate lost inventory due to theft, damage, or errors."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "มูลค่าสต็อกในระบบ (Recorded Value)" : "Recorded Inventory Value"}</label>
            <input type="number" value={recordedInventory} onChange={e=>setRecordedInventory(e.target.value)} className={inputClass} placeholder="500000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "มูลค่าสต็อกนับจริง (Actual Value)" : "Actual Counted Value"}</label>
            <input type="number" value={actualInventory} onChange={e=>setActualInventory(e.target.value)} className={inputClass} placeholder="485000" />
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-3xl text-center border border-purple-100 dark:border-purple-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-purple-800 dark:text-purple-200 font-medium mb-1">{lang === "TH" ? "อัตราของหาย (Shrinkage Rate)" : "Shrinkage Rate"}</p>
            <p className="text-6xl font-black text-purple-600 dark:text-purple-400">{res.percent}%</p>
          </div>
          <div className="md:border-l border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 font-medium mb-1">{lang === "TH" ? "มูลค่าที่สูญเสียไป (Loss)" : "Lost Value"}</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">฿{res.loss.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Shrinkage)" : "Shrinkage FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Inventory Shrinkage คืออะไร ทำไมผู้จัดการร้านต้องใส่ใจ?" : "What is Inventory Shrinkage?"} 
          a={lang === "TH" ? 
`Inventory Shrinkage หรือการสูญเสียสต็อกสินค้า คือความแตกต่างระหว่าง "สินค้าที่ระบบคอมพิวเตอร์บันทึกไว้ว่ามีอยู่" กับ "จำนวนสินค้าที่มีอยู่จริงเมื่อตรวจนับคลัง" 

ตัวอย่างเช่น ในระบบ POS (Point of Sale) บันทึกไว้ว่าในร้านควรมีแชมพู 100 ขวด แต่เมื่อพนักงานไปนับบนเชลฟ์และในโกดังกลับพบว่ามีเพียง 95 ขวด แชมพู 5 ขวดที่หายไปนี้เรียกว่า Shrinkage 

สำหรับธุรกิจค้าปลีก (Retail) หรือซูเปอร์มาร์เก็ตที่มีกำไรต่อชิ้น (Margin) ค่อนข้างบาง การเกิด Shrinkage แม้เพียง 1-2% สามารถกลืนกินผลกำไรสุทธิ (Net Profit) ของร้านไปได้อย่างมหาศาล ผู้จัดการร้านจึงต้องทำการนับสต็อกเป็นระยะ (Cycle Counting) เพื่อตรวจจับและหาสาเหตุให้เร็วที่สุด` 
          : "Shrinkage is the difference between recorded inventory and actual physical count. It directly eats into profits."} 
        />
        <FAQItem 
          q={lang === "TH" ? "สาเหตุหลักที่ทำให้สต็อกสินค้าหาย (Shrinkage) มาจากอะไรบ้าง?" : "What causes inventory shrinkage?"} 
          a={lang === "TH" ? 
`สมาคมผู้ค้าปลีกแห่งชาติสหรัฐอเมริกา (NRF) ได้ทำการศึกษาสาเหตุของการเกิด Shrinkage ทั่วโลก และพบว่าความสูญเสียส่วนใหญ่ไม่ได้เกิดจากลูกค้าอย่างที่หลายคนเข้าใจ แต่เกิดจากปัจจัยดังต่อไปนี้:

1. **การขโมยจากพนักงาน (Employee Theft) - ~33%:** พนักงานในร้านแอบนำสินค้ากลับบ้าน หรือทุจริตที่เครื่องเก็บเงิน (เช่น ทำรายการVoid แล้วรับเงินสดเข้ากระเป๋า)
2. **การขโมยจากลูกค้า (Shoplifting) - ~38%:** ลูกค้าแอบหยิบสินค้าใส่กระเป๋า หรือเปลี่ยนป้ายราคาสินค้า
3. **ข้อผิดพลาดทางเอกสาร (Administrative Errors) - ~20%:** ความผิดพลาดของมนุษย์ล้วนๆ เช่น คีย์รับของเข้าสต็อกผิดจำนวน พิมพ์รหัสบาร์โค้ดผิด หรือลืมตัดสต็อกเมื่อของชำรุด
4. **ความเสียหายและการหมดอายุ (Damage & Spoilage) - ~7%:** สินค้าตกแตก น้ำรั่วใส่ หรืออาหารหมดอายุ (โดยเฉพาะในธุรกิจซูเปอร์มาร์เก็ต)
5. **การทุจริตจากซัพพลายเออร์ (Vendor Fraud) - ~2%:** ซัพพลายเออร์ส่งของมาไม่ครบตามจำนวนใบเสร็จ

วิธีแก้ปัญหาที่มีประสิทธิภาพที่สุดคือ การติดกล้องวงจรปิด, การจำกัดสิทธิ์การเข้าถึงโกดัง, และที่สำคัญที่สุดคือการใช้ระบบบาร์โค้ดหรือ RFID เพื่อลด Human Error ในการคีย์ข้อมูลครับ` 
          : "Main causes are shoplifting, employee theft, administrative/paperwork errors, and damaged goods."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 21. Import Markup Calculator
// ---------------------------------------------------------
export function ImportMarkupCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [productCost, setProductCost] = useLocalState("im-prod", "500");
  const [shippingCost, setShippingCost] = useLocalState("im-ship", "100");
  const [dutyPercent, setDutyPercent] = useLocalState("im-duty", "20");
  const [markupPercent, setMarkupPercent] = useLocalState("im-mark", "50");

  const calc = () => {
    const pc = Number(productCost) || 0;
    const sc = Number(shippingCost) || 0;
    const d = Number(dutyPercent) || 0;
    const m = Number(markupPercent) || 0;

    // Landed Cost (CIF = Cost + Insurance + Freight... simplified here)
    const cif = pc + sc;
    const dutyAmount = cif * (d / 100);
    const vatAmount = (cif + dutyAmount) * 0.07; // Thai VAT 7%
    const landedCost = cif + dutyAmount + vatAmount;

    // Selling Price based on Markup
    // Markup = (Price - Cost) / Cost
    // Price = Cost * (1 + Markup)
    // Note: Some use Margin, but tool says Markup.
    const sellingPrice = landedCost * (1 + (m / 100));
    const profit = sellingPrice - landedCost;
    const margin = (profit / sellingPrice) * 100;

    return { 
      landedCost: landedCost.toFixed(2), 
      dutyAmount: dutyAmount.toFixed(2), 
      vatAmount: vatAmount.toFixed(2),
      sellingPrice: Math.round(sellingPrice),
      profit: profit.toFixed(2),
      margin: margin.toFixed(1)
    };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 mb-4">
          <Ship className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณราคาสินค้านำเข้า (Landed Cost & Markup)" : "Import Landed Cost & Markup"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณต้นทุนแฝงทั้งหมด (ค่าส่ง+ภาษีนำเข้า+VAT 7%) และตั้งราคาขาย" : "Calculate total landed cost including duties/VAT and set selling price."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาสินค้า (บาท)" : "Product Cost"}</label>
            <input type="number" value={productCost} onChange={e=>setProductCost(e.target.value)} className={inputClass} placeholder="500" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าขนส่ง (บาท)" : "Shipping Cost"}</label>
            <input type="number" value={shippingCost} onChange={e=>setShippingCost(e.target.value)} className={inputClass} placeholder="100" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "พิกัดอากรศุลกากร (%)" : "Import Duty (%)"}</label>
            <input type="number" value={dutyPercent} onChange={e=>setDutyPercent(e.target.value)} className={inputClass} placeholder="20" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "Markup กำไรที่ต้องการ (%)" : "Target Markup (%)"}</label>
            <input type="number" value={markupPercent} onChange={e=>setMarkupPercent(e.target.value)} className={inputClass} placeholder="50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-6">{lang === "TH" ? "ต้นทุนนำเข้าสุทธิ (Landed Cost)" : "Landed Cost Breakdown"}</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-gray-500">CIF (สินค้า+ขนส่ง)</span>
              <span className="font-medium">฿{Number(productCost)+Number(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-gray-500">{lang === "TH" ? "อากรนำเข้า (Duty)" : "Duty Amount"}</span>
              <span className="font-medium text-red-500">+ ฿{res.dutyAmount}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-gray-500">VAT 7%</span>
              <span className="font-medium text-red-500">+ ฿{res.vatAmount}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-lg">{lang === "TH" ? "ต้นทุนสุทธิ/ชิ้น" : "Total Landed Cost"}</span>
              <span className="font-black text-xl text-cyan-600">฿{res.landedCost}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-3xl text-white shadow-lg flex flex-col justify-center">
          <p className="text-cyan-100 font-medium mb-2">{lang === "TH" ? "ราคาขายที่แนะนำ (เพื่อได้กำไรตามเป้า)" : "Recommended Selling Price"}</p>
          <div className="text-5xl font-black mb-4">฿{res.sellingPrice.toLocaleString()}</div>
          <div className="flex gap-4">
            <div className="bg-white/20 p-3 rounded-xl flex-1 text-center">
              <div className="text-xs text-cyan-100 mb-1">{lang === "TH" ? "กำไร (บาท)" : "Profit"}</div>
              <div className="font-bold">฿{res.profit}</div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl flex-1 text-center">
              <div className="text-xs text-cyan-100 mb-1">{lang === "TH" ? "Margin (%)" : "Gross Margin"}</div>
              <div className="font-bold">{res.margin}%</div>
            </div>
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (นำเข้าและตั้งราคา)" : "Import Pricing FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Landed Cost (ต้นทุนแฝงนำเข้า) คืออะไร และทำไมพ่อค้าแม่ค้าออนไลน์มักคำนวณพลาด?" : "What is Landed Cost?"} 
          a={lang === "TH" ? 
`Landed Cost หรือต้นทุนนำเข้าสุทธิ คือ "ต้นทุนทั้งหมด" ที่เกิดขึ้นตั้งแต่สินค้าออกจากโรงงานที่ต่างประเทศ จนกระทั่งสินค้าส่งมาถึงโกดังของคุณพร้อมขาย

พ่อค้าแม่ค้าออนไลน์มือใหม่ (เช่น นำเข้าของจากจีนผ่านเว็บ Taobao) มักจะคำนวณต้นทุนผิดพลาด โดยนำแค่ "ราคาสินค้า + ค่าขนส่ง" มาตั้งราคาขาย ซึ่งเป็นข้อผิดพลาดที่ร้ายแรงมาก เพราะในความเป็นจริง เมื่อสินค้ามาถึงศุลกากรไทย จะต้องถูกบวกค่าใช้จ่ายเพิ่มตามลำดับดังนี้:

1. **อากรศุลกากร (Import Duty):** คิดเปอร์เซ็นต์จากราคา CIF (ราคาของ + ค่าขนส่ง) โดยสินค้าแต่ละประเภท (พิกัดศุลกากร หรือ HS Code) จะเสียภาษีไม่เท่ากัน (เช่น อะไหล่คอมพิวเตอร์ 0%, เสื้อผ้า 30%, เครื่องสำอาง 30%)
2. **ภาษีมูลค่าเพิ่ม (VAT 7%):** กรมศุลกากรจะนำ "ราคา CIF + ค่าอากรศุลกากร" มาคิด VAT 7% ซ้อนเข้าไปอีกทีหนึ่ง!

หากคุณไม่นำตัวเลขเหล่านี้มาคำนวณเป็น Landed Cost ก่อนตั้งราคาขาย คุณอาจจะขายของขาดทุนตั้งแต่ชิ้นแรกโดยไม่รู้ตัวครับ` 
          : "Landed cost includes the product price, shipping, customs duties, and taxes (VAT). Newbies often forget duties and VAT, leading to losses."} 
        />
        <FAQItem 
          q={lang === "TH" ? "Markup กับ Margin ต่างกันอย่างไรเวลาตั้งราคาขาย?" : "Markup vs Margin: What's the difference?"} 
          a={lang === "TH" ? 
`Markup และ Margin เป็นสองคำศัพท์ทางธุรกิจที่คนมักใช้สลับกัน แต่จริงๆ แล้วมีความหมายและสูตรคำนวณทางคณิตศาสตร์ที่ต่างกันอย่างสิ้นเชิง:

1. **Markup (การบวกเพิ่มจากต้นทุน):** คือเปอร์เซ็นต์ที่คุณบวกเพิ่มเข้าไปจาก "ต้นทุน (Cost)"
- สูตร: Markup % = (กำไร / ต้นทุน) x 100
- ตัวอย่าง: ของต้นทุน 100 บาท คุณบวกกำไร 50 บาท (ขาย 150 บาท) แบบนี้คือ Markup 50%

2. **Margin (อัตรากำไรขั้นต้น):** คือเปอร์เซ็นต์ของกำไรเมื่อเทียบกับ "ราคาขายสุทธิ (Selling Price)"
- สูตร: Margin % = (กำไร / ราคาขาย) x 100
- ตัวอย่าง: ของต้นทุน 100 บาท ขาย 150 บาท (กำไร 50 บาท) คุณจะได้ Margin = (50 / 150) x 100 = 33.3%

**ข้อควรระวัง:** เวลาตั้งเป้าหมายกำไร ต้องเคลียร์กับพาร์ทเนอร์ให้ชัดเจนว่ากำลังพูดถึงตัวไหน หากคุณบอกเซลส์ว่า "ขอ Margin 50%" แปลว่าคุณต้องขายสินค้าต้นทุน 100 บาทในราคา "200 บาท" (กำไร 100 หาร 200 = 50%) แต่ถ้าคุณบอกว่า "ขอ Markup 50%" คุณจะตั้งราคาขายแค่ "150 บาท" เท่านั้น! 

เครื่องมือนี้ออกแบบมาโดยให้คุณกรอก **Markup** เพื่อดันราคาขายขึ้น และจะแสดง **Margin** จริงที่คุณได้รับให้เห็นเพื่อกันความสับสนครับ` 
          : "Markup is a percentage of cost. Margin is a percentage of selling price. A 50% markup on a $100 item makes the price $150. That yields a 33% margin."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 22. Freelance Hourly Rate
// ---------------------------------------------------------
export function FreelanceRate({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [targetSalary, setTargetSalary] = useLocalState("fr-salary", "50000");
  const [businessExp, setBusinessExp] = useLocalState("fr-exp", "10000"); // software, internet, tax etc/month
  const [billableHours, setBillableHours] = useLocalState("fr-hours", "5"); // per day
  const [workDays, setWorkDays] = useLocalState("fr-days", "20"); // per month

  const calc = () => {
    const s = Number(targetSalary) || 0;
    const e = Number(businessExp) || 0;
    const h = Number(billableHours) || 0;
    const d = Number(workDays) || 0;

    if (h <= 0 || d <= 0) return { hourly: 0, minProject: 0 };

    const totalNeedPerMonth = s + e;
    // Add 20% for tax/buffer/sick days (Freelance standard)
    const grossNeed = totalNeedPerMonth * 1.2; 
    
    const totalHours = h * d;
    const hourly = grossNeed / totalHours;

    return { hourly: Math.round(hourly), minProject: Math.round(hourly * h) }; // min project = 1 day of work
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณเรทค่าตัวฟรีแลนซ์รายชั่วโมง" : "Freelance Hourly Rate"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "หาค่าตัวที่แท้จริงของคุณ เพื่อไม่ให้ทำงานหนักฟรีและครอบคลุมต้นทุนชีวิต" : "Calculate your true hourly rate to cover life, business expenses, and taxes."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เงินเดือนสุทธิที่อยากได้ (บาท/เดือน)" : "Target Take-home Salary"}</label>
            <input type="number" value={targetSalary} onChange={e=>setTargetSalary(e.target.value)} className={inputClass} placeholder="50000" />
            <p className="text-xs text-gray-400 mt-1">{lang === "TH" ? "เงินที่คุณใช้กินใช้ส่วนตัว" : "Money for your personal life"}</p>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ต้นทุนธุรกิจ (บาท/เดือน)" : "Business Expenses/Month"}</label>
            <input type="number" value={businessExp} onChange={e=>setBusinessExp(e.target.value)} className={inputClass} placeholder="10000" />
            <p className="text-xs text-gray-400 mt-1">{lang === "TH" ? "ค่าไฟ, เน็ต, ซอฟต์แวร์, โคเวิร์คกิ้งสเปซ" : "Internet, Software, Tools, Co-working"}</p>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ชั่วโมงที่ทำเงินได้จริง (ต่อวัน)" : "Billable Hours per Day"}</label>
            <input type="number" value={billableHours} onChange={e=>setBillableHours(e.target.value)} className={inputClass} placeholder="5" max="12" />
            <p className="text-xs text-gray-400 mt-1">{lang === "TH" ? "ไม่รวมเวลาตอบแชท หาเรฟ หาลูกค้า (ปกติ 4-6 ชม.)" : "Exclude admin/email time. Usually 4-6."}</p>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "จำนวนวันทำงาน (ต่อเดือน)" : "Working Days per Month"}</label>
            <input type="number" value={workDays} onChange={e=>setWorkDays(e.target.value)} className={inputClass} placeholder="20" max="31" />
            <p className="text-xs text-gray-400 mt-1">{lang === "TH" ? "หักวันหยุดเสาร์อาทิตย์ออก (ปกติ 20-22 วัน)" : "Exclude weekends (usually 20 days)"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl text-center border border-emerald-100 dark:border-emerald-800">
          <p className="text-emerald-800 dark:text-emerald-200 font-medium mb-2">{lang === "TH" ? "เรทค่าตัวของคุณ (Hourly Rate)" : "Your Hourly Rate"}</p>
          <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
            ฿{res.hourly.toLocaleString()} <span className="text-xl font-normal">/ {lang === "TH" ? "ชม." : "hr"}</span>
          </div>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            * {lang === "TH" ? "บวกเผื่อภาษีและวันป่วย/ลาพักร้อนให้แล้ว 20%" : "Includes 20% buffer for taxes & sick days."}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl text-center border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
          <p className="text-slate-500 font-medium mb-2">{lang === "TH" ? "ขั้นต่ำในการรับ 1 โปรเจกต์ (1 วันเต็ม)" : "Minimum Project Fee (1 full day)"}</p>
          <div className="text-4xl font-black text-slate-700 dark:text-white">
            ฿{res.minProject.toLocaleString()}
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ฟรีแลนซ์และการตั้งราคา)" : "Freelance Rate FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "Billable Hours คืออะไร ทำไมฟรีแลนซ์ถึงทำงานได้ไม่ครบ 8 ชั่วโมงต่อวัน?" : "What are Billable Hours?"} 
          a={lang === "TH" ? 
`Billable Hours คือ "เวลาที่ใช้ลงมือทำงานให้ลูกค้าจริงและสามารถคิดเงินได้" 

ความผิดพลาดคลาสสิกของคนย้ายจากการเป็นพนักงานประจำมาทำฟรีแลนซ์ คือการเอาเงินเดือนที่อยากได้ มาหารด้วยเวลาทำงาน 8 ชั่วโมง/วัน แล้วคิดเป็นเรทค่าตัว ซึ่งนั่นจะทำให้คุณขาดทุนยับเยิน! 

ในความเป็นจริงของชีวิตฟรีแลนซ์ ภายใน 8 ชั่วโมงที่คุณนั่งอยู่หน้าคอมพิวเตอร์ คุณจะสามารถทำงานปั่นเนื้องานจริงๆ (Billable time) ได้เพียง 4-5 ชั่วโมงเท่านั้น เวลาที่เหลืออีก 3-4 ชั่วโมง (Unbillable time) จะถูกกลืนหายไปกับ:
1. การตอบแชทและอีเมลลูกค้า
2. การทำใบเสนอราคา ใบแจ้งหนี้ และการคุยบรีฟงาน
3. การอัปเดตพอร์ตโฟลิโอ โปรโมทตัวเอง และหางานใหม่
4. การหา Reference หรือเรียนรู้ทักษะใหม่ๆ

ดังนั้น เครื่องมือของเราจึงให้คุณใส่จำนวนชั่วโมงทำงานจริงที่ 4-6 ชั่วโมงต่อวัน เพื่อหารเฉลี่ยให้ครอบคลุมเวลาที่คุณทำ Admin กิจการของตัวเองด้วยครับ` 
          : "Billable hours are the actual hours you can charge clients for. Admin work, emails, and marketing are unbillable."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมเรทฟรีแลนซ์ถึงดูแพงกว่าพนักงานประจำมาก?" : "Why is the freelance rate higher than an employee salary?"} 
          a={lang === "TH" ? 
`ถ้าบริษัทจ้างพนักงานกราฟิกประจำเดือนละ 30,000 บาท (ตกวันละ 1,000 บาท) ทำไมเวลาจ้างฟรีแลนซ์ กราฟิกฟรีแลนซ์ถึงคิดค่าตัววันละ 3,000 - 5,000 บาท? สาเหตุที่เรทของฟรีแลนซ์ต้องสูงกว่าพนักงานประจำ 2-3 เท่า เพราะฟรีแลนซ์ต้องแบกรับ "ต้นทุนแฝง" ทั้งหมดที่บริษัทเคยจ่ายให้พนักงานประจำ ได้แก่:

1. **สวัสดิการ:** ไม่มีประกันสังคม (ฟรีแลนซ์ต้องจ่ายเอง ม.39 หรือซื้อประกันสุขภาพ), ไม่มีกองทุนสำรองเลี้ยงชีพ
2. **วันหยุดที่ไม่ได้รับเงิน (Unpaid Time Off):** พนักงานประจำลาป่วย ลาพักร้อน หรือหยุดนักขัตฤกษ์ก็ได้เงินเดือน แต่ฟรีแลนซ์ถ้าป่วยคือรายได้เป็น "ศูนย์" ทันที เรทค่าตัวจึงต้องบวกเผื่อวันที่ไม่ได้ทำงานเอาไว้ (ในเครื่องมือนี้บวก Buffer เผื่อให้ 20%)
3. **อุปกรณ์และเครื่องมือ (Overhead):** ค่าเสื่อมราคาคอมพิวเตอร์ ค่าไฟบ้าน ค่าสมัครสมาชิกโปรแกรม (Adobe, Microsoft 365, Canva) ฟรีแลนซ์จ่ายเอง 100%
4. **ความเสี่ยงในการว่างงาน:** ฟรีแลนซ์ไม่ได้มีงานต่อเนื่องทุกวัน บางเดือนอาจไม่มีงานเลย ค่าตัวจึงต้องชดเชยความเสี่ยงในจุดนี้

การเป็นผู้ว่าจ้างที่เข้าใจโครงสร้างต้นทุนนี้ จะทำให้ได้ฟรีแลนซ์ที่ทำงานอย่างมีคุณภาพ ไม่ทิ้งงาน และมีวินัยส่งงานตรงเวลาครับ` 
          : "Freelancers must cover their own taxes, health insurance, software licenses, unpaid sick days, and the risk of un-hired days."} 
        />
      </SEOFAQ>
    </div>
  );
}
