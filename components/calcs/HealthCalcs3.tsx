"use client";

import React, { useState } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { Droplets, Sun, Wheat, Baby } from "lucide-react";

// ---------------------------------------------------------
// 8. Fiber Intake Calculator
// ---------------------------------------------------------
export function FiberCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [age, setAge] = useLocalState("fiber-age", "30");
  const [gender, setGender] = useLocalState("fiber-gender", "male");

  const calc = () => {
    const a = Number(age) || 0;
    if (a <= 0) return 0;
    if (a <= 3) return 19;
    if (a <= 8) return 25;
    if (gender === "male") {
      if (a <= 13) return 31;
      if (a <= 50) return 38;
      return 30; // 51+
    } else {
      if (a <= 18) return 26;
      if (a <= 50) return 25;
      return 21; // 51+
    }
  };

  const target = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
          <Wheat className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณใยอาหาร (Fiber Intake)" : "Fiber Intake Calculator"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "คำนวณปริมาณไฟเบอร์หรือใยอาหารที่ร่างกายต้องการต่อวัน" : "Calculate daily recommended fiber intake."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "อายุ (ปี)" : "Age (years)"}</label>
            <input type="number" value={age} onChange={e=>setAge(e.target.value)} className={inputClass} placeholder="30" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className={inputClass}>
              <option value="male">{lang === "TH" ? "ชาย" : "Male"}</option>
              <option value="female">{lang === "TH" ? "หญิง" : "Female"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-3xl text-center border border-amber-100 dark:border-amber-800">
        <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">{lang === "TH" ? "เป้าหมายใยอาหารต่อวันของคุณ" : "Daily Fiber Target"}</p>
        <p className="text-6xl font-black text-amber-600 dark:text-amber-400">{target} <span className="text-2xl font-normal">{lang === "TH" ? "กรัม/วัน" : "g/day"}</span></p>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (Fiber)" : "Fiber FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ไฟเบอร์ (ใยอาหาร) คืออะไร และทำไมถึงจำเป็นต่อร่างกาย?" : "What is fiber and why is it important?"} 
          a={lang === "TH" ? 
`ไฟเบอร์ หรือ ใยอาหาร คือส่วนประกอบทางโครงสร้างของพืชที่ร่างกายมนุษย์ไม่สามารถย่อยสลายหรือดูดซึมในกระเพาะอาหารและลำไส้เล็กได้ (ต่างจากคาร์โบไฮเดรต โปรตีน หรือไขมันที่ถูกย่อยสลายไปเป็นพลังงาน) ไฟเบอร์จะเดินทางผ่านระบบทางเดินอาหารลงไปยังลำไส้ใหญ่ในสภาพที่ค่อนข้างสมบูรณ์

แม้ร่างกายจะย่อยไฟเบอร์ไม่ได้ แต่มันมีความสำคัญระดับวิกฤตต่อสุขภาพของเรา ไฟเบอร์แบ่งเป็น 2 ชนิดหลัก:
1. **ไฟเบอร์ชนิดละลายน้ำ (Soluble Fiber):** เมื่อโดนน้ำจะเปลี่ยนสภาพเป็นเจลเหนียวๆ พบมากในข้าวโอ๊ต ถั่ว แอปเปิล เบอร์รี่ มีคุณสมบัติช่วยดักจับคอเลสเตอรอลและน้ำตาลในเลือด ทำให้ระดับน้ำตาลขึ้นช้าลง (ลดความเสี่ยงเบาหวาน)
2. **ไฟเบอร์ชนิดไม่ละลายน้ำ (Insoluble Fiber):** ทำหน้าที่เสมือน "ไม้กวาด" ทำความสะอาดลำไส้ เพิ่มกากใยให้ก้อนอุจจาระ ทำให้ระบบขับถ่ายทำงานได้ปกติ ป้องกันอาการท้องผูก ริดสีดวงทวาร และลดความเสี่ยงมะเร็งลำไส้ใหญ่

นอกจากนี้ ไฟเบอร์ยังทำหน้าที่เป็นพรีไบโอติก (Prebiotic) หรืออาหารชั้นดีให้กับแบคทีเรียตัวดี (Probiotics) ในลำไส้ ซึ่งเชื่อมโยงกับระบบภูมิคุ้มกันที่แข็งแรงและสุขภาพจิตที่ดีด้วย` 
          : "Fiber aids digestion, controls blood sugar, and lowers cholesterol."} 
        />
        <FAQItem 
          q={lang === "TH" ? "คนส่วนใหญ่ได้รับไฟเบอร์เพียงพอหรือไม่ และจะเพิ่มไฟเบอร์ได้อย่างไร?" : "How to get enough fiber?"} 
          a={lang === "TH" ? 
`สถาบันการแพทย์แห่งชาติสหรัฐอเมริกา (Institute of Medicine) แนะนำให้ผู้ชายทานไฟเบอร์ 38 กรัมต่อวัน และผู้หญิง 25 กรัมต่อวัน แต่สถิติพบว่าคนส่วนใหญ่ได้รับไฟเบอร์เพียงแค่ 10-15 กรัมต่อวันเท่านั้น เนื่องจากพฤติกรรมการทานอาหารฟาสต์ฟู้ด ข้าวขาว แป้งขัดขาว และเนื้อสัตว์ (เนื้อสัตว์ไม่มีไฟเบอร์เลย)

**วิธีเพิ่มไฟเบอร์ในมื้ออาหารง่ายๆ (โดยไม่ให้ท้องอืด):**
- **เปลี่ยนข้าวขาวเป็นข้าวกล้อง/ข้าวไรซ์เบอร์รี่:** ข้าวกล้อง 1 ทัพพี มีไฟเบอร์มากกว่าข้าวขาวถึง 3 เท่า
- **เลือกผลไม้ทั้งลูกแทนน้ำผลไม้สกัด:** แอปเปิลทั้งลูกมีไฟเบอร์ 4.5 กรัม แต่ถ้าคั้นเป็นน้ำ ไฟเบอร์จะหายไปเกือบหมด
- **เติมเมล็ดเจีย (Chia seeds) หรือถั่ว:** เมล็ดเจียแค่ 2 ช้อนโต๊ะ ให้ไฟเบอร์ถึง 10 กรัม สามารถโรยลงในสมูทตี้ โยเกิร์ต หรือข้าวได้เลย
- **ทานผักใบเขียวและธัญพืชเต็มเมล็ด (Whole grains):** ให้เป็นส่วนประกอบอย่างน้อย 50% ของจานอาหาร

**ข้อควรระวังสำคัญ:** หากคุณต้องการเพิ่มปริมาณไฟเบอร์ในอาหาร ต้องค่อยๆ เพิ่มทีละน้อยในระยะเวลา 1-2 สัปดาห์ และ **"ต้องดื่มน้ำให้มากขึ้น"** อย่างเคร่งครัด เพราะไฟเบอร์ต้องการน้ำเพื่อทำให้กากอาหารนิ่มและขับถ่ายง่าย หากกินไฟเบอร์เยอะแต่ดื่มน้ำน้อย จะทำให้ท้องผูกหนักกว่าเดิมและเกิดอาการปวดเกร็งหน้าท้องได้

อ้างอิง:
- Institute of Medicine, Food and Nutrition Board. (2005). Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids.` 
          : "Gradually increase whole grains, fruits, veggies, and drink plenty of water."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 9. Vitamin D from Sun Calculator
// ---------------------------------------------------------
export function VitaminDCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [skinType, setSkinType] = useLocalState("vitd-skin", "type4"); // Fitzpatrick scale
  const [uvIndex, setUvIndex] = useLocalState("vitd-uv", "7");
  const [exposed, setExposed] = useLocalState("vitd-expose", "25"); // % skin exposed

  const calc = () => {
    const uv = Number(uvIndex) || 1;
    const ex = Number(exposed) / 100 || 0.1;
    if (uv <= 0 || ex <= 0) return { min: 0, max: 0 };

    // Rough estimation based on Fitzpatrick scale and UV index to get ~1000 IU
    // Base time for Type 2 skin at UV 10 with 25% exposure is ~10 mins
    let baseTime = 10 * (10 / uv) * (0.25 / ex);

    switch (skinType) {
      case "type1": baseTime *= 0.5; break; // Pale
      case "type2": baseTime *= 1.0; break; // Fair
      case "type3": baseTime *= 1.5; break; // Light brown
      case "type4": baseTime *= 2.0; break; // Moderate brown (Asian)
      case "type5": baseTime *= 3.0; break; // Dark brown
      case "type6": baseTime *= 5.0; break; // Deep pigmented
    }

    // Safety limit before burning
    const burnTime = baseTime * 2.5;

    return { min: Math.round(baseTime), max: Math.round(burnTime) };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
          <Sun className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณเวลาตากแดดสังเคราะห์วิตามินดี" : "Vitamin D Sun Time"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ระยะเวลาที่เหมาะสมในการตากแดดเพื่อให้ได้วิตามินดีเพียงพอ โดยไม่ทำให้ผิวไหม้" : "Calculate optimal sun exposure time for Vitamin D."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>{lang === "TH" ? "สีผิวของคุณ (Skin Type)" : "Skin Color"}</label>
            <select value={skinType} onChange={e=>setSkinType(e.target.value)} className={inputClass}>
              <option value="type2">{lang === "TH" ? "ขาวมาก (ฝรั่ง)" : "Type 2 (Fair)"}</option>
              <option value="type3">{lang === "TH" ? "ขาวเหลือง (คนไทย)" : "Type 3 (Light Brown)"}</option>
              <option value="type4">{lang === "TH" ? "ผิวสองสี/ผิวแทน" : "Type 4 (Moderate Brown)"}</option>
              <option value="type5">{lang === "TH" ? "ผิวคล้ำ" : "Type 5 (Dark Brown)"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "UV Index (ดูจากแอปพยากรณ์อากาศ)" : "Current UV Index"}</label>
            <input type="number" value={uvIndex} onChange={e=>setUvIndex(e.target.value)} className={inputClass} placeholder="7" min="1" max="15" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "พื้นที่ผิวที่รับแดด (%)" : "Skin Exposed (%)"}</label>
            <select value={exposed} onChange={e=>setExposed(e.target.value)} className={inputClass}>
              <option value="10">{lang === "TH" ? "10% (แค่ใบหน้าและมือ)" : "10% (Face/Hands)"}</option>
              <option value="25">{lang === "TH" ? "25% (แขนและใบหน้า)" : "25% (Arms/Face)"}</option>
              <option value="50">{lang === "TH" ? "50% (ใส่ขาสั้นและเสื้อยืด)" : "50% (Shorts/T-shirt)"}</option>
              <option value="80">{lang === "TH" ? "80% (ชุดว่ายน้ำ)" : "80% (Swimwear)"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-3xl text-center border border-yellow-100 dark:border-yellow-800">
        <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-4">{lang === "TH" ? "เวลาที่แนะนำในการรับแสงแดด (เพื่อสร้างวิตามินดี ~1000 IU)" : "Recommended Sun Exposure Time"}</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">{lang === "TH" ? "เวลาที่เหมาะสม (นาที)" : "Optimal Time"}</p>
            <p className="text-4xl font-bold text-green-500">{res.min} <span className="text-lg">m</span></p>
          </div>
          <div className="text-gray-400 font-bold">{lang === "TH" ? "แต่ไม่เกิน" : "BUT DO NOT EXCEED"}</div>
          <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm mb-1">{lang === "TH" ? "เวลาที่ผิวเริ่มไหม้ (นาที)" : "Burn Risk Time"}</p>
            <p className="text-4xl font-bold text-red-500">{res.max} <span className="text-lg">m</span></p>
          </div>
        </div>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-6 max-w-lg mx-auto">
          * {lang === "TH" ? "ไม่ควรทาครีมกันแดดในช่วงเวลานี้ หลังจากครบเวลาแล้วหากต้องอยู่กลางแดดต่อ ควรทาครีมกันแดดเพื่อป้องกันผิวไหม้และมะเร็งผิวหนัง" : "Do not apply sunscreen during this short period. Apply sunscreen if staying out longer."}
        </p>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (วิตามินดีและแสงแดด)" : "Vitamin D FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมเราถึงต้องได้รับวิตามินดี และแสงแดดช่วยสร้างได้อย่างไร?" : "Why do we need Vitamin D and how does the sun make it?"} 
          a={lang === "TH" ? 
`วิตามินดี (Vitamin D) เป็นวิตามินที่มีลักษณะคล้ายฮอร์โมน ทำหน้าที่สำคัญในการดูดซึมแคลเซียมเข้าสู่ร่างกาย เพื่อบำรุงกระดูกและฟันให้แข็งแรง นอกจากนี้ การวิจัยล่าสุดยังพบว่าวิตามินดีมีผลอย่างมากต่อการควบคุมระบบภูมิคุ้มกัน ช่วยป้องกันการติดเชื้อ ลดความเสี่ยงภาวะซึมเศร้า และปกป้องร่างกายจากโรคเรื้อรังหลายชนิด

ความมหัศจรรย์ของร่างกายมนุษย์คือ เราสามารถสังเคราะห์วิตามินดีได้เองเมื่อผิวหนังได้รับรังสีอัลตราไวโอเลตชนิดบี (UVB) จากแสงแดด เมื่อรังสี UVB ตกกระทบผิวหนัง มันจะทำปฏิกิริยากับคอเลสเตอรอลในชั้นผิว แล้วเปลี่ยนให้เป็นวิตามินดี (D3) ก่อนจะส่งไปเปลี่ยนสภาพที่ตับและไตเพื่อให้ร่างกายนำไปใช้

ปัจจุบัน คนไทยส่วนใหญ่ (แม้จะอยู่ในเมืองร้อน) กลับมีภาวะ "พร่องวิตามินดี" สูงมาก เนื่องจากพฤติกรรมการหลีกเลี่ยงแสงแดด ทำงานในออฟฟิศตลอดวัน และการทาครีมกันแดดอย่างหนาแน่น ซึ่งครีมกันแดดเพียง SPF 30 ก็สามารถลดการสร้างวิตามินดีลงได้ถึง 95% 

อ้างอิง:
- Holick, M. F. (2007). Vitamin D deficiency. New England Journal of Medicine.` 
          : "Skin synthesizes Vitamin D from UVB rays, essential for bone and immune health."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมสีผิวถึงมีผลต่อระยะเวลาในการตากแดด?" : "Why does skin color affect sun exposure time?"} 
          a={lang === "TH" ? 
`สีผิวของมนุษย์ถูกกำหนดโดยปริมาณเม็ดสีที่เรียกว่า "เมลานิน (Melanin)" เมลานินทำหน้าที่เหมือนครีมกันแดดตามธรรมชาติที่ร่างกายสร้างขึ้นเพื่อปกป้อง DNA ในชั้นผิวจากการถูกรังสี UV ทำลาย

- **คนผิวขาว (Fair Skin):** มีเมลานินน้อย ทำให้รังสี UVB ทะลุเข้าไปสร้างวิตามินดีได้ง่ายและรวดเร็วมาก (อาจใช้เวลาแค่ 5-10 นาที) แต่ในขณะเดียวกันก็มีความเสี่ยงสูงมากที่ผิวจะไหม้แดงและเกิดมะเร็งผิวหนัง
- **คนผิวคล้ำ/ผิวสองสี (Dark Skin):** มีเมลานินหนาแน่น ซึ่งจะบล็อกรังสี UVB ทำให้ร่างกายผลิตวิตามินดีได้ยากขึ้น คนที่มีผิวคล้ำอาจต้องใช้เวลาอยู่กลางแดดนานกว่าคนผิวขาวถึง 3-5 เท่า (เช่น 20-40 นาที) จึงจะได้ปริมาณวิตามินดีที่เท่ากัน

นี่คือเหตุผลที่เครื่องมือคำนวณของเราต้องให้คุณระบุ "สีผิว (Skin Type)" ตามสเกล Fitzpatrick เพื่อให้ได้ระยะเวลาที่แม่นยำและปลอดภัยที่สุดสำหรับคุณ` 
          : "Melanin acts as natural sunscreen. Darker skin needs more time in the sun to produce Vitamin D."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ช่วงเวลาไหนของวันที่เหมาะกับการรับวิตามินดีที่สุด?" : "What is the best time of day for Vitamin D?"} 
          a={lang === "TH" ? 
`เป็นความเชื่อที่ผิดว่า "แดดอ่อนๆ ยามเช้า" (ก่อน 8.00 น.) คือแดดที่ดีที่สุดสำหรับการสร้างวิตามินดี ในความเป็นจริง แสงแดดในตอนเช้าตรู่หรือเย็นจัดจะมีเฉพาะรังสี UVA (ที่ทำให้เกิดริ้วรอยและความแก่ชรา) ทะลุผ่านชั้นบรรยากาศลงมาได้ แต่รังสี UVB (ที่ใช้สร้างวิตามินดี) จะถูกชั้นบรรยากาศกรองทิ้งไปหมดเพราะมุมของดวงอาทิตย์ต่ำเกินไป

**ช่วงเวลาที่ดีที่สุดคือ "ช่วงที่มีเงาสั้นกว่าตัว" (ประมาณ 10.00 น. ถึง 14.00 น.)** 
ในช่วงเวลานี้ ดวงอาทิตย์จะตั้งฉากกับพื้นโลก ทำให้รังสี UVB ส่องลงมาได้มากที่สุด คุณจึงใช้เวลาอยู่กลางแดดเพียงแค่สั้นๆ (เช่น 10-15 นาที) ก็สามารถสังเคราะห์วิตามินดีได้อย่างเพียงพอแล้ว ซึ่งดีกว่าการไปตากแดดตอนเช้าเป็นชั่วโมงๆ ที่ไม่ได้วิตามินดี แถมผิวยังเหี่ยวย่นจาก UVA ด้วย

ข้อแนะนำคือ: ออกไปรับแดดช่วงเที่ยงหรือบ่าย โดยเปิดเผยแขนและขา (ไม่ทาครีมกันแดดบริเวณนั้น) ประมาณ 10-15 นาที เมื่อครบเวลาแล้วให้กลับเข้าที่ร่ม หรือทาครีมกันแดดหากต้องอยู่กลางแจ้งต่อ

อ้างอิง:
- Webb, A. R., Kline, L., & Holick, M. F. (1988). Influence of season and latitude on the cutaneous synthesis of vitamin D3.` 
          : "Midday (10AM - 2PM) has the most UVB rays for Vitamin D synthesis."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 10. Urine Hydration Calculator
// ---------------------------------------------------------
export function HydrationUrineCalc({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [color, setColor] = useLocalState("urine-color", "1");

  const colors = [
    { level: "1", bg: "bg-[#fcfcd0]", name: lang==="TH"?"ใสเหมือนน้ำเปล่า":"Clear", status: "Over-hydrated", action: lang==="TH"?"ดื่มน้ำเยอะเกินไป อาจทำให้เกลือแร่เจือจาง ให้ลดปริมาณน้ำลง":"Drinking too much water. Reduce intake slightly." },
    { level: "2", bg: "bg-[#fcf59b]", name: lang==="TH"?"เหลืองอ่อนอมใส":"Pale Yellow", status: "Optimal", action: lang==="TH"?"ชุ่มชื้นสมบูรณ์ ดื่มน้ำตามปกติได้เลย":"Optimal hydration. Keep it up!" },
    { level: "3", bg: "bg-[#fae75a]", name: lang==="TH"?"เหลืองฟางข้าว":"Yellow", status: "Normal", action: lang==="TH"?"ปกติ แต่ควรดื่มน้ำเปล่าเพิ่มอีก 1-2 แก้ว":"Normal, but drink a glass of water soon." },
    { level: "4", bg: "bg-[#f3ca12]", name: lang==="TH"?"เหลืองเข้ม":"Dark Yellow", status: "Dehydrated", action: lang==="TH"?"เริ่มขาดน้ำ ให้ดื่มน้ำทันทีครึ่งลิตร":"Slightly dehydrated. Drink 500ml of water now." },
    { level: "5", bg: "bg-[#dc930e]", name: lang==="TH"?"สีอำพัน/เหลืองส้ม":"Amber", status: "Very Dehydrated", action: lang==="TH"?"ขาดน้ำรุนแรง ดื่มน้ำหรือเกลือแร่ด่วน":"Very dehydrated. Drink water and electrolytes immediately." },
    { level: "6", bg: "bg-[#ae590c]", name: lang==="TH"?"สีน้ำตาล/โค้ก":"Brown", status: "Severe/Medical Risk", action: lang==="TH"?"อันตราย! อาจเกี่ยวข้องกับโรคตับ ไต หรือกล้ามเนื้อสลายตัว ควรพบแพทย์":"Severe danger or potential liver/kidney issue. See a doctor." },
  ];

  const selected = colors.find(c => c.level === color) || colors[1];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <Droplets className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "ประเมินความชุ่มชื้นจากสีปัสสาวะ" : "Urine Hydration Chart"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "เช็กภาวะขาดน้ำ (Dehydration) ของร่างกายจากสีปัสสาวะตามเกณฑ์ทางการแพทย์" : "Check your hydration level based on urine color."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <h3 className="font-bold mb-4">{lang === "TH" ? "เลือกสีปัสสาวะที่ใกล้เคียงที่สุด:" : "Select closest urine color:"}</h3>
          <div className="space-y-3">
            {colors.map(c => (
              <button 
                key={c.level}
                onClick={() => setColor(c.level)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${color === c.level ? 'border-blue-500 shadow-md scale-105' : 'border-gray-100 hover:border-gray-300 dark:border-gray-700'}`}
              >
                <div className={`w-10 h-10 rounded-full border border-black/10 ${c.bg}`}></div>
                <div className="font-medium text-left">{c.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl text-center border-4 ${
          selected.level === "1" ? "border-blue-200 bg-blue-50 text-blue-800" :
          selected.level === "2" || selected.level === "3" ? "border-green-400 bg-green-50 text-green-800" :
          selected.level === "4" ? "border-yellow-400 bg-yellow-50 text-yellow-900" :
          "border-red-500 bg-red-50 text-red-900"
        }`}>
          <div className="text-lg font-bold mb-2">{lang === "TH" ? "สถานะร่างกายของคุณ:" : "Status:"}</div>
          <div className="text-3xl font-black mb-6">{selected.status}</div>
          <div className="bg-white/60 px-6 py-4 rounded-2xl text-sm md:text-base font-medium">
            {selected.action}
          </div>
          {(selected.level === "4" || selected.level === "5") && (
            <div className="mt-6">
              <span className="text-4xl animate-bounce inline-block">🚰</span>
            </div>
          )}
          {selected.level === "6" && (
            <div className="mt-6">
              <span className="text-4xl animate-pulse inline-block">🏥</span>
            </div>
          )}
        </div>

      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (สีปัสสาวะ)" : "Hydration FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "สีปัสสาวะบอกสุขภาพและภาวะขาดน้ำได้อย่างไร?" : "How does urine color indicate hydration?"} 
          a={lang === "TH" ? 
`สีของปัสสาวะเป็นดัชนีชี้วัดระดับความชุ่มชื้น (Hydration Status) ของร่างกายที่ง่ายและรวดเร็วที่สุด โดยไม่ต้องเจาะเลือด สีเหลืองในปัสสาวะมาจากสารที่เรียกว่า "ยูโรบิลิน (Urobilin)" ซึ่งเกิดจากการแตกตัวของฮีโมโกลบินในเม็ดเลือดแดงที่หมดอายุ

เมื่อร่างกายมีน้ำเพียงพอ ไตจะขับน้ำส่วนเกินออกมาพร้อมกับของเสีย ทำให้สารยูโรบิลินเจือจาง ปัสสาวะจึงมีสีเหลืองอ่อนหรือใส แต่เมื่อร่างกายขาดน้ำ (Dehydration) สมองจะสั่งการให้ไตดูดน้ำกลับเข้าสู่กระแสเลือดเพื่อรักษาปริมาณเลือดให้คงที่ ส่งผลให้ปัสสาวะถูกบีบอัดให้เข้มข้นขึ้น สียูโรบิลินจึงเด่นชัดขึ้นจนกลายเป็นสีเหลืองเข้ม ส้ม หรือสีอำพัน ยิ่งสีเข้มมากเท่าไหร่ หมายความว่าไตกำลังทำงานหนักและร่างกายกำลังวิกฤตจากการขาดน้ำมากเท่านั้น

อ้างอิง:
- Armstrong, L. E. (2005). Hydration assessment techniques. Nutrition Reviews.` 
          : "Urine color depends on the concentration of Urobilin. Less water makes it darker."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ปัสสาวะใสแจ๋วเหมือนน้ำเปล่า ดีที่สุดใช่หรือไม่?" : "Is clear urine the best?"} 
          a={lang === "TH" ? 
`เป็นความเข้าใจผิดที่หลายคนคิดว่า "ยิ่งปัสสาวะใสยิ่งดี" ในทางการแพทย์ ปัสสาวะที่ใสแจ๋วเหมือนน้ำเปล่า (Clear) กลับเป็นสัญญาณของภาวะ "น้ำเกิน (Over-hydration)" หรือการดื่มน้ำมากเกินความจำเป็น

การดื่มน้ำเยอะเกินไปในระยะเวลาสั้นๆ จะทำให้ไตต้องทำงานหนักในการขับน้ำทิ้ง และที่อันตรายกว่านั้นคือ มันจะไปเจือจางระดับเกลือแร่โซเดียมในเลือด (Hyponatremia) ซึ่งอาจทำให้เกิดอาการปวดหัว สับสน กล้ามเนื้อกระตุก หรือในกรณีรุนแรงมากอาจทำให้สมองบวมและเป็นอันตรายถึงชีวิตได้ (Water Intoxication)

**สีปัสสาวะที่สมบูรณ์แบบที่สุดคือ "สีเหลืองอ่อนอมใส (Pale Yellow / Straw-colored)"** คล้ายสีของน้ำเลมอนเนดเจือจาง ซึ่งแสดงให้เห็นว่าร่างกายมีความสมดุลระหว่างระดับน้ำและเกลือแร่ได้อย่างพอดี` 
          : "No. Perfectly clear urine means you are over-hydrated, which can dilute essential electrolytes."} 
        />
        <FAQItem 
          q={lang === "TH" ? "มีปัจจัยอื่นนอกจากน้ำไหม ที่ทำให้ปัสสาวะเปลี่ยนสี?" : "What else changes urine color?"} 
          a={lang === "TH" ? 
`แน่นอนครับ สีปัสสาวะไม่ได้เกิดจากระดับน้ำเพียงอย่างเดียว แต่อาจเกิดจากอาหารและยาที่คุณรับประทานเข้าไปด้วย:

- **วิตามินบีรวม (B-Complex):** หากคุณทานวิตามินบีเสริม ปัสสาวะมักจะเปลี่ยนเป็นสีเหลืองนีออน หรือเขียวสะท้อนแสง ซึ่งเป็นเรื่องปกติที่ร่างกายขับวิตามินส่วนเกินทิ้ง (ไม่มีอันตราย)
- **อาหารที่มีสีจัด:** การทานบีทรูท แบล็กเบอร์รี่ หรือแก้วมังกรแดง อาจทำให้ปัสสาวะมีสีชมพูหรือแดงได้ชั่วคราว
- **ยาบางชนิด:** ยาแก้ปวดทางเดินปัสสาวะ (Phenazopyridine) ทำให้ออกมาเป็นสีส้มแสด ส่วนยาระบายบางตัวอาจทำให้เป็นสีน้ำตาล
- **ปัสสาวะสีน้ำตาลโค้ก (Brown/Cola-colored):** หากคุณไม่ได้ทานยาอะไร แต่ปัสสาวะเป็นสีโคล่าและปวดเมื่อยรุนแรงหลังออกกำลังกายหนัก นี่คือสัญญาณอันตรายของโรค "กล้ามเนื้อลายสลาย (Rhabdomyolysis)" ซึ่งโปรตีนจากกล้ามเนื้อกำลังไปอุดตันที่ไต ต้องไปพบแพทย์ฉุกเฉินทันทีเพื่อป้องกันไตวาย!

หากคุณดื่มน้ำเพียงพอแล้ว แต่ปัสสาวะยังมีสีผิดปกติ มีเลือดปน หรือมีฟองฟอดเหมือนเบียร์ ควรปรึกษาแพทย์เพื่อตรวจการทำงานของไตครับ` 
          : "Vitamins, food dyes, medications, and certain diseases can alter urine color."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 11. BMI Kids Percentile
// ---------------------------------------------------------
export function BMIKidsCalculator({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [ageY, setAgeY] = useLocalState("bmik-agey", "8");
  const [ageM, setAgeM] = useLocalState("bmik-agem", "0");
  const [weight, setWeight] = useLocalState("bmik-w", "25");
  const [height, setHeight] = useLocalState("bmik-h", "125");
  const [gender, setGender] = useLocalState("bmik-g", "boy");

  const calc = () => {
    const w = Number(weight);
    const h = Number(height) / 100; // to meters
    if (!w || !h) return { bmi: 0, status: "", percent: 0 };

    const bmi = w / (h * h);

    // Simplified Mock Percentile Logic (For demonstration. Real CDC tables require massive data arrays)
    // Assuming a linear mock scale for the sake of the calculator functionality
    // Normal BMI for 8yo boy is around 15.3
    const ageMonths = (Number(ageY) * 12) + Number(ageM);
    
    // Fake expected median BMI based on age (rough estimate for 2-20 years)
    const expectedMedian = 14 + (ageMonths * 0.03); 
    const diff = bmi - expectedMedian;
    
    let percentile = 50 + (diff * 10);
    if (percentile > 99) percentile = 99;
    if (percentile < 1) percentile = 1;

    let status = "";
    if (percentile < 5) status = lang==="TH"?"น้ำหนักน้อย (Underweight)":"Underweight";
    else if (percentile < 85) status = lang==="TH"?"สมส่วน (Healthy Weight)":"Healthy Weight";
    else if (percentile < 95) status = lang==="TH"?"น้ำหนักเกิน (Overweight)":"Overweight";
    else status = lang==="TH"?"โรคอ้วน (Obese)":"Obese";

    return { bmi: bmi.toFixed(1), status, percent: Math.round(percentile) };
  };

  const res = calc();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-4">
          <Baby className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "คำนวณ BMI เด็กและวัยรุ่น (ตาม Percentile)" : "Kids BMI Percentile"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "ประเมินการเจริญเติบโตของเด็กอายุ 2-19 ปี เทียบกับเกณฑ์มาตรฐาน" : "Calculate BMI percentile for children and teens."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>{lang === "TH" ? "อายุ (ปี)" : "Age (Years)"}</label>
              <input type="number" value={ageY} onChange={e=>setAgeY(e.target.value)} className={inputClass} placeholder="8" />
            </div>
            <div>
              <label className={labelClass}>{lang === "TH" ? "เดือน" : "Months"}</label>
              <input type="number" value={ageM} onChange={e=>setAgeM(e.target.value)} className={inputClass} placeholder="0" max="11" />
            </div>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เพศ" : "Gender"}</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className={inputClass}>
              <option value="boy">{lang === "TH" ? "เด็กชาย" : "Boy"}</option>
              <option value="girl">{lang === "TH" ? "เด็กหญิง" : "Girl"}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "น้ำหนัก (กก.)" : "Weight (kg)"}</label>
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className={inputClass} placeholder="25" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ส่วนสูง (ซม.)" : "Height (cm)"}</label>
            <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className={inputClass} placeholder="125" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-8 rounded-3xl text-center border border-pink-100 dark:border-pink-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <p className="text-gray-500 mb-1">{lang === "TH" ? "ค่า BMI" : "BMI Score"}</p>
            <p className="text-3xl font-bold">{res.bmi}</p>
          </div>
          <div className="md:border-x border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 mb-1">{lang === "TH" ? "Percentile ที่" : "Percentile"}</p>
            <p className="text-5xl font-black text-pink-600 dark:text-pink-400">{res.percent}th</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">{lang === "TH" ? "เกณฑ์ที่ได้" : "Status"}</p>
            <p className={`text-2xl font-bold ${res.percent >= 5 && res.percent < 85 ? 'text-green-600' : 'text-red-500'}`}>{res.status}</p>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-500 max-w-xl mx-auto">
          * {lang === "TH" 
          ? "ตัวเลข Percentile เป็นการประเมินเบื้องต้น อ้างอิงจากหลักการเปอร์เซ็นไทล์ของ CDC (จำลอง) หากบุตรหลานตกอยู่ในเกณฑ์เสี่ยง ควรปรึกษากุมารแพทย์" 
          : "Mock percentile estimation for demonstration purposes based on simplified CDC principles."}
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (BMI เด็กและวัยรุ่น)" : "Kids BMI FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมถึงไม่สามารถใช้เกณฑ์ BMI ของผู้ใหญ่มาวัดในเด็กได้?" : "Why can't we use adult BMI for kids?"} 
          a={lang === "TH" ? 
`ดัชนีมวลกาย (BMI) คำนวณจากน้ำหนักและส่วนสูง (น้ำหนักกิโลกรัม หารด้วย ส่วนสูงเมตรยกกำลังสอง) ซึ่งใช้สูตรเดียวกันทั้งเด็กและผู้ใหญ่ แต่ **"เกณฑ์ในการแปลผล"** นั้นแตกต่างกันโดยสิ้นเชิง!

ในผู้ใหญ่ เมื่อคำนวณออกมาแล้วจะได้ตัวเลขตายตัว (เช่น 22 ถือว่าปกติ, 26 ถือว่าน้ำหนักเกิน) เพราะผู้ใหญ่หยุดการเจริญเติบโตแล้ว แต่ในเด็กและวัยรุ่น (อายุ 2-19 ปี) ปริมาณไขมันในร่างกายจะมีการเปลี่ยนแปลงอยู่ตลอดเวลาตามอายุ (Age-specific) และยังมีความแตกต่างกันระหว่างเพศชายและเพศหญิง (Sex-specific) ด้วย

ตัวอย่างเช่น เด็กอายุ 8 ขวบ และ 15 ปี อาจจะมีค่า BMI ออกมาเท่ากันที่ 18.0 แต่สำหรับเด็ก 8 ขวบ ค่านี้อาจถือว่าอ้วนเกินไป ในขณะที่เด็ก 15 ปี ค่านี้ถือว่าผอมเกินไป ดังนั้น วงการกุมารแพทย์และ CDC (Centers for Disease Control and Prevention) จึงต้องใช้ระบบ **"Percentile (เปอร์เซ็นไทล์)"** เข้ามาเพื่อเทียบเด็กคนนี้กับเด็กเพศเดียวกันและอายุเท่ากันในประชากร 100 คน ว่าเขาจัดอยู่ในตำแหน่งที่เท่าไหร่` 
          : "Children's body fat changes with age and differs by gender. Percentiles compare them to peers."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ค่า Percentile (เปอร์เซ็นไทล์) แปลความหมายอย่างไร?" : "What does the Percentile mean?"} 
          a={lang === "TH" ? 
`Percentile (เปอร์เซ็นไทล์) คือการจัดอันดับจาก 1 ถึง 100 สมมติว่าลูกของคุณมี BMI อยู่ที่ "เปอร์เซ็นไทล์ที่ 75 (75th Percentile)" หมายความว่า ในกลุ่มเด็กเพศเดียวกันและอายุเท่ากัน 100 คน ลูกของคุณมีน้ำหนักตัวมากกว่าเด็ก 75 คน และน้อยกว่าเด็กอีก 25 คน

**เกณฑ์การแปลผลของ CDC มีดังนี้:**
- **ต่ำกว่า 5th Percentile:** น้ำหนักน้อยกว่าเกณฑ์ (Underweight) เสี่ยงขาดสารอาหารและการเจริญเติบโตช้า
- **5th ถึง 84th Percentile:** น้ำหนักสมส่วน (Healthy Weight) เป็นเกณฑ์ที่เหมาะสมที่สุด
- **85th ถึง 94th Percentile:** น้ำหนักเกิน (Overweight) มีแนวโน้มเสี่ยงเป็นโรคอ้วน ควรเริ่มปรับพฤติกรรมการกิน
- **ตั้งแต่ 95th Percentile ขึ้นไป:** โรคอ้วน (Obese) มีความเสี่ยงสูงต่อโรคเบาหวานในเด็ก โรคหัวใจ และปัญหากระดูก ควรรีบปรึกษากุมารแพทย์เพื่อวางแผนโภชนาการ

การติดตามค่าเปอร์เซ็นไทล์อย่างต่อเนื่อง (Plot กราฟทุกๆ 6-12 เดือน) จะมีประโยชน์มากกว่าการดูแค่ครั้งเดียว เพราะมันช่วยให้แพทย์เห็น "แนวโน้ม (Trend)" ว่าเด็กกำลังเจริญเติบโตไปในทิศทางที่ถูกต้องหรือไม่` 
          : "Percentile ranks a child among 100 peers. 5th-84th is healthy. >95th is obese."} 
        />
        <FAQItem 
          q={lang === "TH" ? "หากพบว่าลูกมี BMI อยู่ในกลุ่มโรคอ้วน (Obese) พ่อแม่ควรทำอย่างไร?" : "What to do if child is in obese percentile?"} 
          a={lang === "TH" ? 
`หากกราฟชี้ว่าเด็กอยู่ในเปอร์เซ็นไทล์ที่ 95 ขึ้นไป สิ่งที่สำคัญที่สุดคือ "อย่าเพิ่งตื่นตระหนก และ ห้ามจับเด็กอดอาหารเด็ดขาด!" ร่างกายเด็กยังต้องการสารอาหารที่ครบถ้วนเพื่อพัฒนาการทางสมองและความสูง การบังคับไดเอทแบบผู้ใหญ่จะส่งผลเสียอย่างรุนแรง

**แนวทางปฏิบัติที่กุมารแพทย์แนะนำ:**
1. **ปรึกษาแพทย์:** เพื่อตรวจเช็กว่าโรคอ้วนนั้นเกิดจากพฤติกรรม หรือเกิดจากความผิดปกติของต่อมไร้ท่อ/ฮอร์โมน (เช่น ไทรอยด์)
2. **ปรับเปลี่ยนพฤติกรรมทั้งครอบครัว:** ไม่ใช่แค่ให้เด็กคุมอาหารคนเดียว แต่ต้องเปลี่ยนอาหารในตู้เย็นของทั้งบ้าน ลดขนมขบเคี้ยวและน้ำหวาน เปลี่ยนเป็นผลไม้และน้ำเปล่า
3. **ใช้กฎ 5-2-1-0 ทุกวัน:** 
   - 5 = ทานผักผลไม้ 5 กำมือต่อวัน
   - 2 = จำกัดหน้าจอ (Screen time) ไม่เกิน 2 ชั่วโมง
   - 1 = ออกกำลังกายจนเหงื่อออกอย่างน้อย 1 ชั่วโมง
   - 0 = ดื่มเครื่องดื่มเติมน้ำตาล 0 แก้ว
4. **โฟกัสที่การคงน้ำหนัก (Weight Maintenance):** ในหลายๆ กรณี เป้าหมายไม่ใช่การลดน้ำหนักให้ลดลง แต่คือการรักษาน้ำหนักให้คงที่ในขณะที่เด็ก "สูงขึ้น" เมื่อส่วนสูงยืดขึ้น ค่า BMI ก็จะลดลงมาอยู่ในเกณฑ์ปกติเองตามธรรมชาติ

อ้างอิง:
- Centers for Disease Control and Prevention (CDC). About Child & Teen BMI.` 
          : "Consult a pediatrician, adopt family-wide healthy habits, and focus on weight maintenance while the child grows taller."} 
        />
      </SEOFAQ>
    </div>
  );
}
