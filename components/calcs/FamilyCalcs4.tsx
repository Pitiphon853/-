"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { Heart, Baby, Dog, Calendar, Home } from "lucide-react";

// ---------------------------------------------------------
// 12. Wedding Budget Calculator
// ---------------------------------------------------------
export function WeddingBudget({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [totalBudget, setTotalBudget] = useLocalState("wedding-budget", "500000");
  
  const calc = () => {
    const total = Number(totalBudget) || 0;
    // Standard industry breakdown (approx)
    return [
      { name: lang==="TH"?"สถานที่จัดงาน & อาหาร":"Venue & Catering", percent: 50, amount: total * 0.50 },
      { name: lang==="TH"?"ถ่ายภาพ & วิดีโอ":"Photography & Video", percent: 12, amount: total * 0.12 },
      { name: lang==="TH"?"ชุดแต่งงาน & แต่งหน้า":"Attire & Beauty", percent: 10, amount: total * 0.10 },
      { name: lang==="TH"?"ตกแต่ง & ดอกไม้":"Decor & Flowers", percent: 10, amount: total * 0.10 },
      { name: lang==="TH"?"แหวนแต่งงาน":"Wedding Rings", percent: 8, amount: total * 0.08 },
      { name: lang==="TH"?"การ์ดเชิญ & ของชำร่วย":"Invites & Favors", percent: 5, amount: total * 0.05 },
      { name: lang==="TH"?"ค่าเผื่อเหลือเผื่อขาด":"Contingency Fund", percent: 5, amount: total * 0.05 },
    ];
  };

  const breakdown = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "จัดงบงานแต่งงาน" : "Wedding Budget"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "กระจายงบประมาณงานแต่งตามมาตรฐานนักจัดงาน (Wedding Planner)" : "Allocate your wedding budget based on industry standards."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <label className={labelClass}>{lang === "TH" ? "งบประมาณรวม (บาท)" : "Total Budget"}</label>
        <input type="number" value={totalBudget} onChange={e=>setTotalBudget(e.target.value)} className={`${inputClass} text-xl font-bold`} placeholder="500000" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-pink-50 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 text-sm">
            <tr>
              <th className="p-4 font-bold">{lang === "TH" ? "หมวดหมู่ค่าใช้จ่าย" : "Category"}</th>
              <th className="p-4 font-bold text-center">สัดส่วน (%)</th>
              <th className="p-4 font-bold text-right">{lang === "TH" ? "งบที่ควรเตรียม (บาท)" : "Amount"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {breakdown.map((b, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="p-4 font-medium">{b.name}</td>
                <td className="p-4 text-center text-gray-500">{b.percent}%</td>
                <td className="p-4 text-right font-bold text-lg text-gray-900 dark:text-white">
                  ฿{b.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (งบงานแต่งงาน)" : "Wedding Budget FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "สัดส่วนงบประมาณงานแต่งงาน 50% สำหรับสถานที่และอาหาร เหมาะสมหรือไม่?" : "Why is 50% allocated to venue and catering?"} 
          a={lang === "TH" ? 
`ตามหลักการของ Wedding Planner อาชีพ ทั้งในประเทศไทยและระดับสากล (เช่น The Knot หรือ Brides.com) ค่าใช้จ่ายที่เกี่ยวข้องกับ "สถานที่จัดงานและอาหาร (Venue & Catering)" จะเป็นรายจ่ายก้อนใหญ่ที่สุดเสมอ โดยเฉลี่ยจะอยู่ที่ 40-50% ของงบประมาณทั้งหมด 

เหตุผลที่เป็นเช่นนั้นเพราะแขกที่มาร่วมงานจะใช้เวลาส่วนใหญ่ไปกับการรับประทานอาหารและซึมซับบรรยากาศของสถานที่ หากคุณมีงบ 500,000 บาท การแบ่งไว้ 250,000 บาท สำหรับค่าเช่าสถานที่ ค่าอาหาร (โต๊ะจีน/บุฟเฟต์) เครื่องดื่ม และค่าบริการของโรงแรม ถือเป็นตัวเลขที่สมเหตุสมผลที่สุด การพยายามบีบงบส่วนนี้ลงมากเกินไป อาจส่งผลให้อาหารไม่เพียงพอ หรือสถานที่คับแคบจนแขกไม่ได้รับความสะดวกสบาย ซึ่งเป็นสิ่งที่แขกจะจดจำมากที่สุด

อย่างไรก็ตาม หากคุณเลือกจัดงานในสถานที่ฟรี (เช่น บ้านตนเอง) สัดส่วนนี้จะลดลงอย่างมาก ทำให้คุณสามารถนำงบประมาณไปทุ่มเทให้กับส่วนอื่น เช่น การตกแต่ง (Decor) หรืองบการถ่ายภาพ (Photography) ได้มากขึ้น

อ้างอิง:
- The Knot. (2023). The Ultimate Wedding Budget Breakdown.` 
          : "Venue and catering naturally consume 40-50% of the budget because they directly affect the guest experience, including food, drinks, and space."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมถึงต้องมี 'ค่าเผื่อเหลือเผื่อขาด (Contingency Fund)' ถึง 5%?" : "What is a contingency fund and why do I need it?"} 
          a={lang === "TH" ? 
`ไม่ว่าคุณจะวางแผนงานแต่งงานมาอย่างรัดกุมแค่ไหน "ค่าใช้จ่ายแอบแฝง (Hidden Costs)" หรือค่าใช้จ่ายที่คาดไม่ถึงจะเกิดขึ้นเสมอ!

ค่าเผื่อเหลือเผื่อขาด (Contingency Fund) จำนวน 5-10% ของงบรวม เป็น "เบาะรองรับ" ทางการเงินที่สำคัญมาก ตัวอย่างของค่าใช้จ่ายแอบแฝงที่มักจะงอกขึ้นมาในนาทีสุดท้าย ได้แก่:
1. **แขกที่มาเกินจำนวน (Over-guest):** หรือการต้องเปิดโต๊ะจีนสำรอง
2. **ค่าล่วงเวลา (Overtime Fees):** หากงานเลี้ยงเลิกดึกกว่ากำหนด ทั้งโรงแรม ช่างภาพ และวงดนตรีมักจะคิดค่า OT หลักหมื่นบาท
3. **ค่าขนส่งและการติดตั้ง (Delivery/Setup Fees):** ของร้านดอกไม้ หรือร้านเช่าอุปกรณ์ต่างๆ
4. **ค่าธรรมเนียมการนำเข้า (Corkage Fee):** หากคุณนำเหล้า ไวน์ หรืองานตกแต่งซุ้มดอกไม้ (Backdrop) เข้ามาเอง โรงแรมมักจะชาร์จค่าธรรมเนียมนำเข้า
5. **อาหารมื้อซ้อมหรือมื้อเช้าสำหรับทีมงาน:** ช่างแต่งหน้า ช่างภาพ ออร์แกไนเซอร์ ล้วนต้องทานอาหารในวันงาน

หากไม่ได้ใช้เงินก้อนนี้ คุณก็สามารถเก็บไว้เป็นเงินขวัญถุงสำหรับสร้างครอบครัว หรือสมทบทุนทริปฮันนีมูน (Honeymoon) ได้อย่างสบายใจ` 
          : "Hidden costs like overtime fees, extra guests, and vendor meals always occur. A 5-10% buffer saves you from stress."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 13. Newborn Cost
// ---------------------------------------------------------
export function NewbornCost({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [hospitalTier, setHospitalTier] = useLocalState("nb-hosp", "mid");
  const [feeding, setFeeding] = useLocalState("nb-feed", "mixed");

  const calc = () => {
    let delivery = 0;
    if (hospitalTier === "gov") delivery = 15000;
    else if (hospitalTier === "mid") delivery = 50000;
    else delivery = 100000;

    let gear = 25000; // stroller, crib, car seat
    let dailyCare = 1500; // diapers, wipes per month -> 18000/yr

    let milk = 0;
    if (feeding === "formula") milk = 2500 * 12; // 30,000
    else if (feeding === "mixed") milk = 1000 * 12; // 12,000
    else milk = 2000; // nursing gear

    return {
      delivery,
      gear,
      monthlyCare: dailyCare,
      yearlyMilk: milk,
      totalYear1: delivery + gear + (dailyCare * 12) + milk
    };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
          <Baby className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ค่าใช้จ่ายทารกแรกเกิด (ปีแรก)" : "Newborn Cost (First Year)"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ประเมินค่าใช้จ่ายในการคลอดบุตรและการเลี้ยงดูในปีแรก" : "Estimate the financial cost of having a baby in the first year."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "โรงพยาบาลสำหรับคลอด" : "Hospital Tier"}</label>
            <select value={hospitalTier} onChange={e=>setHospitalTier(e.target.value)} className={inputClass}>
              <option value="gov">{lang === "TH" ? "โรงพยาบาลรัฐบาล (~15,000 ฿)" : "Government (~15k THB)"}</option>
              <option value="mid">{lang === "TH" ? "โรงพยาบาลเอกชนทั่วไป (~50,000 ฿)" : "Private Normal (~50k THB)"}</option>
              <option value="high">{lang === "TH" ? "โรงพยาบาลเอกชนพรีเมียม (~100,000 ฿)" : "Private Premium (~100k THB)"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "รูปแบบการให้นม" : "Feeding Plan"}</label>
            <select value={feeding} onChange={e=>setFeeding(e.target.value)} className={inputClass}>
              <option value="breast">{lang === "TH" ? "นมแม่ล้วน (ประหยัดค่าผง)" : "Breast Milk Only"}</option>
              <option value="mixed">{lang === "TH" ? "ผสมนมผงบ้าง" : "Mixed Feeding"}</option>
              <option value="formula">{lang === "TH" ? "นมผง 100%" : "Formula Only"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
          <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-6 text-lg">{lang === "TH" ? "แจกแจงค่าใช้จ่าย" : "Cost Breakdown"}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-indigo-200/50">
              <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "แพ็กเกจคลอด (โดยประมาณ)" : "Delivery Package"}</span>
              <span className="font-bold">฿{res.delivery.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-indigo-200/50">
              <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "อุปกรณ์แรกเริ่ม (คาร์ซีท, รถเข็น ฯลฯ)" : "Initial Gear"}</span>
              <span className="font-bold">฿{res.gear.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-indigo-200/50">
              <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ค่าแพมเพิส/ของใช้ (ตลอดปี)" : "Diapers/Care (1 yr)"}</span>
              <span className="font-bold">฿{(res.monthlyCare * 12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-indigo-200/50">
              <span className="text-gray-600 dark:text-gray-400">{lang === "TH" ? "ค่านม (ตลอดปี)" : "Milk/Formula (1 yr)"}</span>
              <span className="font-bold">฿{res.yearlyMilk.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white flex flex-col justify-center items-center text-center shadow-lg">
          <p className="text-indigo-100 font-medium mb-4 text-lg">{lang === "TH" ? "งบที่ควรเตรียมสำหรับ 1 ปีแรก" : "Total 1st Year Estimated Cost"}</p>
          <div className="text-5xl md:text-6xl font-black tracking-tight mb-2">
            ฿{res.totalYear1.toLocaleString()}
          </div>
          <p className="text-sm text-indigo-200 mt-4 max-w-sm">
            * {lang === "TH" ? "ตัวเลขนี้ยังไม่รวมค่าวัคซีนทางเลือก ค่ารักษาพยาบาลยามป่วยไข้ และค่าจ้างพี่เลี้ยงเด็ก" : "Excludes optional vaccines, unexpected medical bills, and nanny services."}
          </p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ค่าใช้จ่ายลูกปีแรก)" : "Newborn Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ค่าใช้จ่ายแอบแฝงในการเลี้ยงลูกขวบปีแรกที่พ่อแม่มือใหม่มักคาดไม่ถึงมีอะไรบ้าง?" : "What are the hidden costs of raising a newborn?"} 
          a={lang === "TH" ? 
`การคำนวณค่าใช้จ่ายสำหรับทารกแรกเกิด มักจะถูกโฟกัสไปที่ค่าคลอดบุตรและแพมเพิสเป็นหลัก แต่ในความเป็นจริง มี "ค่าใช้จ่ายแอบแฝง (Hidden Costs)" จำนวนมากที่พ่อแม่มือใหม่มักจะมองข้ามและไม่ได้กันงบประมาณเผื่อไว้ ได้แก่:

1. **ค่าวัคซีนทางเลือก (Optional Vaccines):** รัฐบาลมีวัคซีนพื้นฐานให้ฟรี แต่แพทย์มักแนะนำวัคซีนเสริม เช่น โรต้าไวรัส, ไอพีดี (IPD), หรือไข้หวัดใหญ่ ซึ่งรวมๆ แล้วอาจตกหลักหมื่นบาทในปีแรก
2. **ค่าปั๊มนมและอุปกรณ์การให้นม:** แม้ "นมแม่" จะฟรี แต่การลงทุนซื้อเครื่องปั๊มนมเกรดโรงพยาบาล, ถุงเก็บน้ำนม, แผ่นซับน้ำนม, และครีมทาหัวนม อาจใช้เงินตั้งแต่ 5,000 - 15,000 บาท
3. **เสื้อผ้าที่ต้องเปลี่ยนไซส์อย่างรวดเร็ว:** เด็กทารกใน 6 เดือนแรกโตเร็วมาก เสื้อผ้าไซส์ Newborn มักจะใส่ได้แค่ 3-4 สัปดาห์ การซื้อเสื้อผ้าจำนวนมากเกินไปจึงเป็นการสิ้นเปลือง
4. **ค่าน้ำและค่าไฟที่พุ่งสูงขึ้น:** การเปิดแอร์เกือบตลอด 24 ชั่วโมงเพื่อให้ทารกนอนหลับสบาย และการซักผ้า/ล้างขวดนมที่ถี่ขึ้น จะทำให้บิลค่าไฟพุ่งขึ้นอย่างมีนัยสำคัญ
5. **ค่าสูญเสียรายได้ (Opportunity Cost):** หากคุณแม่หรือคุณพ่อต้องลางานแบบไม่ได้รับเงินเดือน (Unpaid Leave) หรือต้องออกจากงานมาเป็นแม่บ้านเต็มตัว นี่คือรายจ่ายแฝงที่แพงที่สุดที่ต้องนำมาคำนวณในงบการเงินครอบครัวด้วย` 
          : "Hidden costs include optional vaccines, breast-pumping gear, rapid clothing outgrowths, high electricity bills, and lost income."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ลงทุนกับ 'คาร์ซีท (Car Seat)' และอุปกรณ์ชิ้นใหญ่ มือหนึ่งหรือมือสองดีกว่ากัน?" : "Should I buy newborn gear new or second-hand?"} 
          a={lang === "TH" ? 
`คำถามยอดฮิตสำหรับคนเป็นพ่อแม่คือ จะซื้อของมือหนึ่งไปเลย หรือประหยัดงบด้วยของมือสอง? กฎเหล็กที่กุมารแพทย์และผู้เชี่ยวชาญด้านความปลอดภัยแนะนำมีดังนี้:

**ของที่ "ต้องซื้อมือหนึ่ง" เท่านั้น (ห้ามซื้อมือสองเด็ดขาด):**
1. **คาร์ซีท (Car Seat):** คาร์ซีทมือสองมีความเสี่ยงสูงมาก เพราะคุณไม่มีทางรู้เลยว่ามันเคยผ่านอุบัติเหตุมาก่อนหรือไม่ แม้พลาสติกภายนอกจะดูปกติ แต่โครงสร้างซับแรงกระแทกภายในอาจเสื่อมสภาพไปแล้ว นอกจากนี้คาร์ซีทมี "วันหมดอายุ" (มักจะ 6-8 ปี) พลาสติกจะกรอบและเปราะเมื่อหมดอายุ
2. **ขวดนม จุกนม และยางกัด:** อุปกรณ์ที่ต้องเข้าปากเด็กโดยตรงควรเป็นของใหม่ทั้งหมดเพื่อสุขอนามัยที่ดีที่สุด พลาสติกขวดนมเก่าอาจมีรอยขีดข่วนซึ่งเป็นแหล่งสะสมของแบคทีเรีย และหากเป็นรุ่นเก่าอาจมีสาร BPA ที่เป็นอันตราย

**ของที่ "ซื้อมือสองได้" เพื่อประหยัดเงิน:**
1. **รถเข็นเด็ก (Stroller):** หากล้อและระบบเบรกยังทำงานได้ดี การซื้อรถเข็นมือสองสภาพดีจะช่วยประหยัดเงินได้หลักหมื่นบาท ผ้าคลุมสามารถถอดซักฆ่าเชื้อได้
2. **เสื้อผ้าเด็กแรกเกิด:** เนื่องจากเด็กโตเร็วมาก เสื้อผ้ารุ่นเด็กเล็กมือสองมักจะมีสภาพเหมือนใหม่ (บางชุดใส่แค่ 2-3 ครั้ง) การรับมรดกต่อจากญาติหรือซื้อมือสองจึงคุ้มค่าอย่างยิ่ง
3. **คอกกั้นเด็กและของเล่นเสริมพัฒนาการ:** วัสดุที่เป็นพลาสติกแข็ง สามารถนำมาเช็ดล้างทำความสะอาดด้วยแอลกอฮอล์ได้อย่างปลอดภัย` 
          : "Never buy a second-hand Car Seat due to invisible crash damage. Buy second-hand clothes and strollers."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 14. Pet Cost
// ---------------------------------------------------------
export function PetCost({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [petType, setPetType] = useLocalState("pet-type", "dog-small");

  const calc = () => {
    let food = 0, medical = 0, misc = 0;
    
    switch (petType) {
      case "dog-small":
        food = 1000 * 12; medical = 5000; misc = 4000; break;
      case "dog-large":
        food = 3000 * 12; medical = 8000; misc = 5000; break;
      case "cat":
        food = 1200 * 12; medical = 4000; misc = 5000; break; // cat litter included in misc
    }

    const total = food + medical + misc;
    return { food, medical, misc, total };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
          <Dog className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ค่าใช้จ่ายสัตว์เลี้ยง/ปี" : "Pet Cost per Year"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ประเมินค่าอาหาร วัคซีน และของใช้จิปาถะสำหรับน้องหมาน้องแมว" : "Estimate yearly costs for dog and cat owners."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <label className={labelClass}>{lang === "TH" ? "ประเภทสัตว์เลี้ยง" : "Pet Type"}</label>
        <select value={petType} onChange={e=>setPetType(e.target.value)} className={inputClass}>
          <option value="dog-small">{lang === "TH" ? "สุนัขพันธุ์เล็ก (เช่น ปอม, ชิสุ)" : "Small Dog"}</option>
          <option value="dog-large">{lang === "TH" ? "สุนัขพันธุ์ใหญ่ (เช่น โกลเด้น, ไซบีเรียน)" : "Large Dog"}</option>
          <option value="cat">{lang === "TH" ? "แมว (รวมทรายแมว)" : "Cat"}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl text-center border border-orange-100 dark:border-orange-800 md:col-span-1">
          <p className="text-orange-800 dark:text-orange-200 text-sm mb-1">{lang === "TH" ? "ค่าอาหาร/ขนม" : "Food/Treats"}</p>
          <p className="text-2xl font-bold text-orange-600">฿{res.food.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl text-center border border-orange-100 dark:border-orange-800 md:col-span-1">
          <p className="text-orange-800 dark:text-orange-200 text-sm mb-1">{lang === "TH" ? "วัคซีน/หาหมอ" : "Medical/Vet"}</p>
          <p className="text-2xl font-bold text-orange-600">฿{res.medical.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl text-center border border-orange-100 dark:border-orange-800 md:col-span-1">
          <p className="text-orange-800 dark:text-orange-200 text-sm mb-1">{lang === "TH" ? "ของเล่น/อาบน้ำ" : "Misc/Grooming"}</p>
          <p className="text-2xl font-bold text-orange-600">฿{res.misc.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-2xl text-center md:col-span-1 flex flex-col justify-center text-white shadow-md">
          <p className="text-orange-100 text-sm mb-1">{lang === "TH" ? "รวมทั้งหมด/ปี" : "Total per Year"}</p>
          <p className="text-3xl font-black">฿{res.total.toLocaleString()}</p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เลี้ยงสัตว์)" : "Pet Cost FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "การรับสัตว์เลี้ยงมาเลี้ยง มีค่าใช้จ่ายแอบแฝงอะไรบ้างที่คนมักลืมคิด?" : "What are the hidden costs of owning a pet?"} 
          a={lang === "TH" ? 
`หลายคนเวลาจะเลี้ยงสัตว์ มักจะมองแค่ราคา "ค่าตัว" หรือ "ค่าอาหารรายเดือน" แต่ในความเป็นจริง การเลี้ยงสัตว์ 1 ตัวมีค่าใช้จ่ายแฝง (Hidden Costs) ที่ตามมาอีกมากมายตลอดอายุขัย 10-15 ปีของพวกมัน ได้แก่:

1. **ค่าป้องกันเห็บ หมัด และพยาธิหนอนหัวใจ:** นี่คือค่าใช้จ่ายรายเดือนที่เลี่ยงไม่ได้ ยาหยอด ยาฉีด หรือยากิน (เช่น NexGard, Bravecto) มีราคาตั้งแต่ 200 - 800 บาทต่อเดือน (ตกปีละหลายพันบาท) หากละเลย สุนัขอาจเป็นโรคพยาธิเม็ดเลือดซึ่งค่ารักษาพยาบาลหลักหมื่นบาท!
2. **ค่าทำหมัน:** เป็นรายจ่ายก้อนใหญ่ในปีแรก (1,500 - 5,000 บาทขึ้นอยู่กับโรงพยาบาลและน้ำหนักตัว)
3. **ค่าอาบน้ำ-ตัดขน (Grooming):** โดยเฉพาะสุนัขพันธุ์ขนยาว (เช่น พุดเดิ้ล, ชิสุ, ปอม) ต้องตัดขนทุก 1-2 เดือน ครั้งละ 400 - 1,000 บาท
4. **ค่าฝากเลี้ยง (Pet Hotel):** เมื่อคุณต้องไปต่างจังหวัดหรือต่างประเทศ ค่ารับฝากเลี้ยงจะอยู่ที่ 300 - 800 บาท/คืน
5. **ความเสียหายของเฟอร์นิเจอร์:** โซฟาขาด สายไฟพัง รอยขีดข่วนบนพื้นไม้ หรือการกัดรองเท้าคู่โปรด นี่คือ "ต้นทุน" ที่คนเลี้ยงสัตว์ต้องทำใจยอมรับ

การประเมินค่าใช้จ่ายเหล่านี้ล่วงหน้า จะช่วยลดปัญหาการทอดทิ้งสัตว์เลี้ยง (Pet Abandonment) อันเนื่องมาจากปัญหาทางการเงินของเจ้าของได้เป็นอย่างดี` 
          : "Flea meds, grooming, pet hotels, neutering, and destroyed furniture are significant hidden costs."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ควรซื้อ 'ประกันภัยสัตว์เลี้ยง' หรือไม่ คุ้มค่าแค่ไหน?" : "Is Pet Insurance worth it?"} 
          a={lang === "TH" ? 
`ค่ารักษาพยาบาลของสัตว์เลี้ยงในคลินิกหรือโรงพยาบาลเอกชนนั้น "แพงพอๆ กับหรือแพงกว่าคน" เพราะไม่มีสิทธิ์ 30 บาทหรือประกันสังคมรองรับ การผ่าตัดกระดูกหัก หรือรักษาโรคไต อาจมีบิลทะลุหลักแสนบาทได้อย่างรวดเร็ว

**ข้อดีของประกันสัตว์เลี้ยง:**
- ช่วยจ่ายบิลค่ารักษาพยาบาลฉุกเฉิน อุบัติเหตุ หรือโรคเจ็บป่วยหนัก (ตามวงเงินที่ซื้อ)
- ประกันบางแผนคุ้มครองถึง "ความเสียหายต่อบุคคลภายนอก" เช่น กรณีสุนัขของคุณไปกัดคนอื่น หรือไปวิ่งตัดหน้ารถ ทำให้ทรัพย์สินเสียหาย ประกันจะช่วยจ่ายค่าสินไหมทดแทนให้

**ข้อควรระวัง (ทำไมถึงอาจจะไม่คุ้ม):**
- ประกันส่วนใหญ่ **ไม่ครอบคลุม** ค่าวัคซีนประจำปี การทำหมัน อาหารเสริม และโรคที่เกิดจาก "พันธุกรรม" หรือโรคที่เป็นมาก่อนทำประกัน (Pre-existing conditions)
- เบี้ยประกันจะแพงขึ้นตามอายุของสัตว์เลี้ยง และเมื่อแก่ถึงเกณฑ์ (มักจะ 7-9 ปี) บริษัทอาจไม่รับต่ออายุประกัน

**คำแนะนำ:** หากคุณเลี้ยงสัตว์สายพันธุ์ที่มีความเสี่ยงโรคสูง หรือซนชอบหนีเที่ยว การทำประกันไว้ช่วยกระจายความเสี่ยงได้ดีมาก แต่หากสัตว์เลี้ยงของคุณแข็งแรงและเลี้ยงระบบปิด (อยู่แต่ในบ้าน) การ "ออมเงินแยกบัญชีเดือนละ 1,000 บาท" ไว้เป็นกองทุนสุขภาพสัตว์เลี้ยง (Pet Emergency Fund) อาจเป็นทางเลือกที่คุ้มค่าและยืดหยุ่นกว่าในระยะยาว` 
          : "It's worth it for emergencies and liability, but it rarely covers routine care or genetic diseases."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 15. Food/Milk Expiration
// ---------------------------------------------------------
export function FoodExpiration({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [foodType, setFoodType] = useLocalState("exp-food", "milk-open");

  const getShelfLife = () => {
    switch(foodType) {
      case "milk-open": return { days: 5, note: lang==="TH"?"นมพาสเจอร์ไรส์เปิดขวดแล้ว แช่ตู้เย็น (ห้ามไว้ฝาประตู)":"Pasteurized milk (open) in fridge (not door)" };
      case "egg-fridge": return { days: 30, note: lang==="TH"?"ไข่ไก่สด แช่ในตู้เย็น":"Raw eggs in fridge" };
      case "chicken-raw": return { days: 2, note: lang==="TH"?"เนื้อไก่สด แช่ตู้เย็นช่องธรรมดา":"Raw chicken in fridge" };
      case "meat-raw": return { days: 4, note: lang==="TH"?"เนื้อหมู/วัวสด แช่ตู้เย็นช่องธรรมดา":"Raw red meat in fridge" };
      case "leftover": return { days: 4, note: lang==="TH"?"อาหารปรุงสุก/ของเหลือ แช่ตู้เย็น":"Cooked leftovers in fridge" };
      case "freezer-meat": return { days: 120, note: lang==="TH"?"เนื้อสัตว์แช่ช่องฟรีซ (อุณหภูมิ -18C)":"Raw meat in freezer (-18C)" };
      default: return { days: 0, note: "" };
    }
  };

  const life = getShelfLife();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "วันหมดอายุอาหาร/นม" : "Food Expiration Guideline"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ระยะเวลาการเก็บรักษาอาหารและวัตถุดิบในตู้เย็นอย่างปลอดภัย (Food Safety)" : "Safe storage times for food in the refrigerator/freezer."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <label className={labelClass}>{lang === "TH" ? "ประเภทอาหาร" : "Food Type"}</label>
        <select value={foodType} onChange={e=>setFoodType(e.target.value)} className={inputClass}>
          <option value="milk-open">{lang === "TH" ? "นมสดพาสเจอร์ไรส์ (เปิดแล้ว)" : "Opened Milk"}</option>
          <option value="egg-fridge">{lang === "TH" ? "ไข่ไก่สด" : "Raw Eggs"}</option>
          <option value="chicken-raw">{lang === "TH" ? "เนื้อไก่สด" : "Raw Chicken"}</option>
          <option value="meat-raw">{lang === "TH" ? "เนื้อหมู/วัวสด" : "Raw Red Meat"}</option>
          <option value="leftover">{lang === "TH" ? "อาหารปรุงสุก/ของเหลือ" : "Cooked Leftovers"}</option>
          <option value="freezer-meat">{lang === "TH" ? "แช่ฟรีซ: เนื้อสัตว์" : "Freezer: Raw Meat"}</option>
        </select>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl text-center border border-emerald-100 dark:border-emerald-800">
        <p className="text-emerald-800 dark:text-emerald-200 font-medium mb-2">{lang === "TH" ? "ระยะเวลาที่เก็บได้ปลอดภัยที่สุด (ประมาณ)" : "Safe Storage Time (Approx.)"}</p>
        <div className="text-6xl font-black text-emerald-600 dark:text-emerald-400 mb-4">
          {life.days} <span className="text-2xl font-normal">{lang === "TH" ? "วัน" : "Days"}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-black/20 p-3 rounded-xl inline-block">
          💡 {life.note}
        </p>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ความปลอดภัยด้านอาหาร)" : "Food Safety FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "EXP (Expiry Date) ต่างจาก BBE (Best Before) อย่างไร?" : "EXP vs Best Before?"} 
          a={lang === "TH" ? 
`การอ่านฉลากวันหมดอายุบนบรรจุภัณฑ์เป็นเรื่องที่หลายคนยังสับสน ความแตกต่างที่สำคัญตามหลัก อย. (FDA) มีดังนี้:

1. **EXP หรือ EXD (Expiry Date / Use By): "วันหมดอายุ"** 
คำนี้มักใช้กับอาหารที่เน่าเสียได้ง่าย (Perishable Foods) เช่น นมพาสเจอร์ไรส์ เนื้อสัตว์สด อาหารทะเล หากเลยวันที่ระบุไปแล้ว **"ห้ามรับประทานเด็ดขาด"** เพราะแบคทีเรียอาจเจริญเติบโตจนถึงระดับที่เป็นอันตรายต่อร่างกาย ทำให้เกิดอาหารเป็นพิษรุนแรง แม้สีและกลิ่นจะดูปกติก็ตาม

2. **BBE หรือ BBF (Best Before): "ควรบริโภคก่อน"**
คำนี้มักใช้กับอาหารแห้ง อาหารกระป๋อง ขนมปัง หรือบิสกิต หมายความว่า หากบริโภคก่อนวันที่ระบุ อาหารจะมีความสดใหม่ กรอบ อร่อย และมีคุณค่าทางโภชนาการครบถ้วนที่สุด 100% แต่ถ้าหากเลยวันที่ระบุไปแล้ว **"ยังสามารถทานได้อย่างปลอดภัย"** (ไม่ทำให้ป่วย) เพียงแต่คุณภาพ สี กลิ่น รสชาติ หรือวิตามินอาจจะลดลงไปบ้างเท่านั้น (เว้นแต่จะสังเกตเห็นราขึ้น หรือกระป๋องบวม ซึ่งต้องทิ้งทันที)

อ้างอิง:
- U.S. Food and Drug Administration (FDA). Food Product Dating.` 
          : "EXP means unsafe after date. Best Before means quality drops, but still safe to eat."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมถึงห้ามเก็บนมและไข่ไว้ที่ฝาประตูตู้เย็น?" : "Why shouldn't I store milk and eggs in the fridge door?"} 
          a={lang === "TH" ? 
`ตู้เย็นไม่ได้มีความเย็นเท่ากันทุกจุด! บริเวณที่ **"มีความผันผวนของอุณหภูมิมากที่สุด (อุ่นที่สุด)"** คือส่วนของ "ฝาประตูตู้เย็น (Fridge Door)" 

ทุกครั้งที่คุณเปิดและปิดตู้เย็น ลมร้อนจากภายนอกจะพัดเข้าไปกระทบของที่อยู่ตรงฝาประตูก่อนเสมอ ทำให้อุณหภูมิบริเวณนั้นแกว่งไปมา (อาจสูงถึง 7-10 องศาเซลเซียส ในขณะที่ตู้เย็นควรมีอุณหภูมิคงที่ต่ำกว่า 4 องศาเซลเซียส)

**สิ่งที่ไม่ควรเก็บที่ฝาประตู:**
- **นมสดพาสเจอร์ไรส์:** แบคทีเรียแลคโตบาซิลลัสจะโตไว ทำให้นมบูดเร็ว ควรเก็บไว้ที่ชั้นวางด้านในสุด (หลังตู้) ที่มีความเย็นจัดและคงที่
- **ไข่ไก่:** การเปลี่ยนแปลงอุณหภูมิบ่อยๆ จะทำให้เปลือกไข่เกิดความชื้นและเสียไว ควรเก็บไข่ไว้ในกล่องกระดาษของมันตามเดิม และวางไว้บนชั้นวางด้านในตู้เย็น

**สิ่งที่เก็บที่ฝาประตูได้:**
- เครื่องปรุงรส (ซอส ซีอิ๊ว น้ำปลา) น้ำอัดลม น้ำเปล่า และอาหารที่มีสารกันบูดตามธรรมชาติ (เช่น แยมที่มีน้ำตาลสูง) เนื่องจากอาหารเหล่านี้ทนทานต่ออุณหภูมิที่ผันผวนได้ดี

อ้างอิง:
- USDA Food Safety and Inspection Service.` 
          : "The fridge door has fluctuating temperatures. Milk and eggs should be kept deep inside the fridge to stay cold."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 16. Rent vs Buy Home
// ---------------------------------------------------------
export function RentVsBuyCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [housePrice, setHousePrice] = useLocalState("rvb-house", "3000000");
  const [rentPrice, setRentPrice] = useLocalState("rvb-rent", "15000");
  const [years, setYears] = useLocalState("rvb-years", "10");

  const calc = () => {
    const hp = Number(housePrice) || 0;
    const rp = Number(rentPrice) || 0;
    const y = Number(years) || 1;

    // Simplified Rent Calculation (assuming 3% rent increase per year)
    let totalRent = 0;
    let currentRent = rp;
    for (let i = 0; i < y; i++) {
      totalRent += (currentRent * 12);
      currentRent *= 1.03; // 3% inflation
    }

    // Simplified Buy Calculation
    // Downpayment (10%), Loan (90%) at ~5% interest over 30 years
    const downpayment = hp * 0.10;
    const loan = hp * 0.90;
    const annualInterestRate = 0.05;
    const monthlyInterestRate = annualInterestRate / 12;
    const totalPayments = 360; // 30 years
    const monthlyMortgage = loan * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    // Total spent on buying after Y years (Down + Mortgage payments)
    const mortgageSpent = monthlyMortgage * 12 * y;
    // Plus rough maintenance + taxes (1% of house value per year)
    const maintenance = hp * 0.01 * y;

    const totalBuySpent = downpayment + mortgageSpent + maintenance;

    // Estimate Home Equity after Y years
    // House appreciates at 2% per year
    const futureHouseValue = hp * Math.pow(1.02, y);
    // Remaining loan balance calculation (rough estimate for simplicity)
    const remainingLoan = loan * (Math.pow(1 + monthlyInterestRate, totalPayments) - Math.pow(1 + monthlyInterestRate, y * 12)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    const equityGained = futureHouseValue - remainingLoan;
    
    // Net cost of buying = Total Spent - Equity Gained
    const netBuyCost = totalBuySpent - equityGained;

    return { 
      totalRent: Math.round(totalRent), 
      netBuyCost: Math.round(netBuyCost),
      monthlyMortgage: Math.round(monthlyMortgage),
      equity: Math.round(equityGained)
    };
  };

  const res = calc();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 mb-4">
          <Home className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "เปรียบเทียบ เช่า vs ซื้อบ้าน" : "Rent vs Buy Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณตัวเลขความคุ้มค่าทางการเงิน (ไม่รวมปัจจัยด้านความรู้สึก)" : "Calculate the financial numbers of renting vs buying."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ราคาบ้านที่อยากซื้อ (บาท)" : "House Price to Buy"}</label>
            <input type="number" value={housePrice} onChange={e=>setHousePrice(e.target.value)} className={inputClass} placeholder="3000000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ค่าเช่าปัจจุบัน (บาท/เดือน)" : "Current Monthly Rent"}</label>
            <input type="number" value={rentPrice} onChange={e=>setRentPrice(e.target.value)} className={inputClass} placeholder="15000" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ระยะเวลาพำนัก (ปี)" : "Time Horizon (Years)"}</label>
            <input type="number" value={years} onChange={e=>setYears(e.target.value)} className={inputClass} placeholder="10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Renting Result */}
        <div className="bg-stone-50 dark:bg-stone-900/20 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-4 py-1 rounded-bl-2xl text-sm font-bold">
            {lang === "TH" ? "กรณีเช่าบ้าน" : "Renting"}
          </div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-6">{lang === "TH" ? `ต้นทุนสุทธิใน ${years} ปี` : `Net Cost over ${years} yrs`}</h3>
          <p className="text-4xl font-black text-red-500 mb-2">- ฿{res.totalRent.toLocaleString()}</p>
          <p className="text-sm text-stone-500">{lang === "TH" ? "จ่ายทิ้งทั้งหมด (สมมติค่าเช่าขึ้น 3%/ปี)" : "Sunk cost (assumes 3% rent hike/yr)"}</p>
        </div>

        {/* Buying Result */}
        <div className="bg-stone-50 dark:bg-stone-900/20 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-4 py-1 rounded-bl-2xl text-sm font-bold">
            {lang === "TH" ? "กรณีซื้อบ้าน" : "Buying"}
          </div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-6">{lang === "TH" ? `ต้นทุนสุทธิใน ${years} ปี` : `Net Cost over ${years} yrs`}</h3>
          <p className="text-4xl font-black text-red-500 mb-2">- ฿{res.netBuyCost.toLocaleString()}</p>
          <p className="text-sm text-stone-500 mb-4">{lang === "TH" ? "เงินสดที่จ่ายไป หักลบ มูลค่าบ้านที่ขายได้" : "(Total spent) minus (Home Equity gained)"}</p>
          
          <div className="bg-white dark:bg-black/20 p-4 rounded-xl text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">{lang === "TH" ? "ผ่อนต่อเดือน (กู้ 30ปี 5%)" : "Est. Monthly Mortgage"}</span>
              <span className="font-bold">฿{res.monthlyMortgage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>{lang === "TH" ? "สินทรัพย์ที่ได้ (Home Equity)" : "Home Equity Gained"}</span>
              <span className="font-bold">+ ฿{res.equity.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เช่าหรือซื้อบ้านดี?)" : "Rent vs Buy FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "การเช่าบ้านคือการเอาเงินไปโยนทิ้งน้ำ จริงหรือไม่?" : "Is renting a waste of money?"} 
          a={lang === "TH" ? 
`ประโยคคลาสสิกที่ว่า "เช่าเขาทำไม เอาค่าเช่าไปผ่อนบ้านดีกว่า อย่างน้อยบ้านก็เป็นของเรา" **ไม่ได้เป็นความจริงในเชิงคณิตศาสตร์การเงินเสมอไป!**

ในความเป็นจริง การซื้อบ้านมี "ค่าใช้จ่ายที่โยนทิ้งน้ำ (Sunk Costs)" มหาศาลเช่นเดียวกัน ได้แก่:
1. **ดอกเบี้ยธนาคาร:** ในช่วง 10 ปีแรกของการผ่อนบ้านแบบลดต้นลดดอก เงินผ่อนต่อเดือนของคุณกว่า 70-80% จะกลายเป็น "ดอกเบี้ย" ที่จ่ายให้ธนาคาร มีเพียงนิดเดียวที่ไปตัดเงินต้น (ดอกเบี้ย = เงินโยนทิ้งน้ำ)
2. **ค่าส่วนกลางและภาษีที่ดิน:** จ่ายทุกปีและไม่ได้คืน
3. **ค่าบำรุงรักษาและซ่อมแซม:** หลังคารั่ว แอร์เสีย ท่อแตก (เฉลี่ย 1-2% ของราคาบ้านต่อปี)
4. **ค่าประกันอัคคีภัย / ประกันชีวิต (MRTA)**

ดังนั้น การเช่าบ้านไม่ได้แปลว่าโง่เสมอไป เพราะ "ค่าเช่า" คือเพดานค่าใช้จ่ายสูงสุด (Maximum) ที่คุณจะต้องจ่ายในแต่ละเดือน แต่ "ค่าผ่อนบ้าน" คือค่าใช้จ่ายขั้นต่ำสุด (Minimum) ที่คุณจะต้องเจอ หากนำเงินก้อนที่ต้องจ่ายค่าดาวน์และค่าตกแต่งบ้าน ไปลงทุนในดัชนีหุ้น (Index Funds) แทน ในหลายๆ ซีนาริโอ "ผู้เช่า" สามารถมีความมั่งคั่ง (Net Worth) สูงกว่า "ผู้ซื้อบ้าน" เมื่อเวลาผ่านไป 20 ปี

อ้างอิง:
- Ramit Sethi, "I Will Teach You to Be Rich" - The Rent vs Buy Rule.` 
          : "Buying also has sunk costs (interest, taxes, maintenance). Renting isn't always throwing money away."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ควรเลือก 'ซื้อบ้าน' ในกรณีไหนถึงจะคุ้มค่าที่สุด?" : "When does buying a home make financial sense?"} 
          a={lang === "TH" ? 
`การซื้อบ้านจะเป็นการตัดสินใจทางการเงินที่ดีที่สุด เมื่อคุณผ่านเกณฑ์ต่อไปนี้:

1. **ตั้งใจจะอยู่อาศัยเกิน 7 - 10 ปีขึ้นไป (The 7-Year Rule):** 
การซื้อและขายบ้านมีค่าธรรมเนียมสูงมาก (ค่าโอน ค่าจดจำนอง ภาษีธุรกิจเฉพาะ ค่านายหน้า รวมๆ ประมาณ 5-7% ของราคาบ้าน) หากคุณซื้อแล้วต้องย้ายงานหรือขายภายใน 3-5 ปี คุณแทบจะขาดทุนยับเยิน เพราะมูลค่าบ้านยังขึ้นไม่ทันกลบค่าธรรมเนียมเหล่านี้
2. **หน้าที่การงานและการใช้ชีวิตนิ่งแล้ว:** ไม่คิดจะย้ายจังหวัดหรือย้ายประเทศ
3. **ผ่อนไหวโดยไม่ตึงเครียด:** เงินผ่อนบ้าน (บวกค่าส่วนกลาง) ไม่ควรเกิน 30% ของรายได้สุทธิของครอบครัว เพื่อให้มีเงินเหลือสำหรับเก็บออมและใช้ชีวิต
4. **เป็นการซื้อเพื่อความสุขทางใจ (Emotional ROI):** อยากเจาะผนัง เลี้ยงหมาตัวใหญ่ แต่งบ้านตามใจชอบ สิ่งเหล่านี้ประเมินเป็นตัวเลขทางการเงินไม่ได้ หากความสุขในบ้านคือเป้าหมายสูงสุดของคุณ การซื้อก็คือคำตอบที่ถูกต้องที่สุดครับ` 
          : "Buy if you plan to stay for 7+ years, have stable employment, and want emotional security/freedom to modify the home."} 
        />
      </SEOFAQ>
    </div>
  );
}
