"use client";

import React, { useState } from "react";
import { Hourglass, TrendingDown, BookOpen, AlertCircle } from "lucide-react";

export default function SkillHalfLife({ lang }: { lang: "EN" | "TH" }) {
  const [industry, setIndustry] = useState<string>("tech");
  const [learningHours, setLearningHours] = useState<number>(2);
  const [skillScope, setSkillScope] = useState<string>("specific");

  const t = {
    title: lang === "TH" ? "เครื่องคำนวณอายุทักษะ (Skill Half-Life)" : "Skill Half-Life Calculator",
    industryLabel: lang === "TH" ? "อุตสาหกรรม/สายอาชีพของคุณ" : "Your Industry / Profession",
    learningLabel: lang === "TH" ? "เวลาที่ใช้เรียนรู้ทักษะใหม่ (ชั่วโมง/สัปดาห์)" : "Time spent learning new skills (hrs/week)",
    scopeLabel: lang === "TH" ? "ลักษณะความรู้ที่คุณมีเป็นหลัก" : "Primary Scope of Your Knowledge",
    
    indFast: lang === "TH" ? "เทคโนโลยีเกิดใหม่ (AI, Digital Marketing) - เติบโตเร็วมาก" : "Emerging Tech (AI, Digital Mkt) - Very Fast",
    indSoftware: lang === "TH" ? "ไอที และซอฟต์แวร์ทั่วไป" : "IT & Software Engineering",
    indEng: lang === "TH" ? "วิศวกรรมหลัก / การเงิน" : "Traditional Engineering / Finance",
    indMed: lang === "TH" ? "การแพทย์ / วิทยาศาสตร์บริสุทธิ์" : "Medical / Pure Sciences",
    indTrad: lang === "TH" ? "ศิลปะ / กฎหมาย / งานช่างฝีมือ" : "Arts / Law / Trades",

    scopeSpecific: lang === "TH" ? "ทักษะเฉพาะเจาะจง (เครื่องมือ/โปรแกรมเฉพาะ)" : "Highly Specific (Tools, Frameworks)",
    scopeBalanced: lang === "TH" ? "ผสมผสาน (ทฤษฎี + ปฏิบัติ)" : "Balanced (Theory + Practice)",
    scopeBroad: lang === "TH" ? "หลักการกว้างๆ (Soft Skills, พื้นฐานทฤษฎี)" : "Broad Principles (Soft Skills, Fundamentals)",

    resultLabel: lang === "TH" ? "ครึ่งชีวิตของทักษะ (Skill Half-Life)" : "Your Skill Half-Life",
    years: lang === "TH" ? "ปี" : "Years",
    resultDesc: lang === "TH" 
      ? "ความหมาย: อีกกี่ปีข้างหน้า ความรู้ที่คุณมีในวันนี้ 50% จะล้าสมัย และคุณต้องอัปสกิลทดแทน"
      : "Meaning: How many years until 50% of your current knowledge is obsolete and needs replacing.",
  };

  const calculateHalfLife = () => {
    let base = 5;
    
    switch (industry) {
      case "fast": base = 2.5; break;
      case "tech": base = 3.5; break;
      case "eng": base = 5; break;
      case "med": base = 7; break;
      case "trad": base = 10; break;
    }

    // learning bonus: max +5 years for continuous learning (10 hrs/week)
    const learningBonus = (learningHours / 2) * 0.5;
    let currentHalfLife = base + learningBonus;

    switch (skillScope) {
      case "specific": currentHalfLife = currentHalfLife * 0.8; break;
      case "balanced": currentHalfLife = currentHalfLife * 1.0; break;
      case "broad": currentHalfLife = currentHalfLife * 1.2; break;
    }

    return Math.max(1, currentHalfLife).toFixed(1);
  };

  const halfLifeResult = calculateHalfLife();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <Hourglass className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.resultDesc}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.industryLabel}
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="fast">{t.indFast}</option>
              <option value="tech">{t.indSoftware}</option>
              <option value="eng">{t.indEng}</option>
              <option value="med">{t.indMed}</option>
              <option value="trad">{t.indTrad}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.scopeLabel}
            </label>
            <select
              value={skillScope}
              onChange={(e) => setSkillScope(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="specific">{t.scopeSpecific}</option>
              <option value="balanced">{t.scopeBalanced}</option>
              <option value="broad">{t.scopeBroad}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.learningLabel}: {learningHours}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={learningHours}
              onChange={(e) => setLearningHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>20</span>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full border border-purple-100 dark:border-purple-800/30">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              {t.resultLabel}
            </h3>
            
            <div className="flex items-end justify-center space-x-2 mb-4">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {halfLifeResult}
              </span>
              <span className="text-2xl font-medium text-slate-600 dark:text-slate-300 pb-2">
                {t.years}
              </span>
            </div>

            <div className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg mt-4">
              <TrendingDown className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-left leading-relaxed">
                {lang === "TH" 
                  ? `หมายความว่าในอีก ${halfLifeResult} ปีข้างหน้า ความรู้และทักษะที่คุณมีอยู่ในปัจจุบัน 50% จะไม่สามารถนำมาใช้ประโยชน์ในการทำงานได้อย่างเต็มที่อีกต่อไป คุณจำเป็นต้องเรียนรู้สิ่งใหม่ๆ เพื่อมาทดแทน`
                  : `This means in ${halfLifeResult} years, 50% of your current skills will be obsolete. You must actively upskill to remain competitive in the market.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          ครึ่งชีวิตของทักษะ (Skill Half-Life) คืออะไร?
        </h3>
        <p>
          ในยุคที่เทคโนโลยีพัฒนาอย่างก้าวกระโดด <strong>Skill Half-Life</strong> หรือ "ครึ่งชีวิตของทักษะ" เป็นแนวคิดที่ยืมมาจากวิชาฟิสิกส์ (Half-life ของสารกัมมันตรังสี) เพื่อนำมาใช้อธิบายวงจรชีวิตของความรู้และทักษะในสายอาชีพ ว่าใช้เวลาเท่าใดที่ความรู้ที่เรามีอยู่ 50% จะล้าสมัยหรือไม่สามารถนำมาใช้สร้างมูลค่าทางเศรษฐกิจได้อีกต่อไป
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">ทำไมทักษะถึงมีวันหมดอายุ?</h4>
        <p>
          เดิมทีในยุคอุตสาหกรรม ทักษะที่ได้เรียนรู้จากมหาวิทยาลัยอาจใช้เลี้ยงชีพได้นาน 20-30 ปี แต่ในปัจจุบัน อัตราการเกิดเทคโนโลยีใหม่ เครื่องมือใหม่ และกระบวนการทำงานแบบใหม่ ทำให้ความรู้เก่าๆ ถูกทดแทนด้วยวิธีที่มีประสิทธิภาพกว่าเสมอ
        </p>
        <ul>
          <li><strong>สายงานเทคโนโลยี (Technology & IT):</strong> เป็นกลุ่มที่มีครึ่งชีวิตสั้นที่สุด โดยเฉลี่ยเพียง 2.5 ถึง 3.5 ปี เครื่องมืออย่าง AI, Framework สำหรับเขียนโปรแกรม หรืออัลกอริทึมต่างๆ เปลี่ยนแปลงอย่างรวดเร็ว</li>
          <li><strong>ทักษะเฉพาะเจาะจง (Hard/Technical Skills):</strong> โปรแกรมซอฟต์แวร์เฉพาะทาง หรือเทคนิคการใช้เครื่องมือ มักล้าสมัยเร็วกว่าทักษะที่เป็นนามธรรม</li>
          <li><strong>ทักษะพื้นฐานและมนุษยสัมพันธ์ (Soft Skills):</strong> เช่น ความเป็นผู้นำ, การคิดวิเคราะห์, การสื่อสาร มีอายุยืนยาวและแทบจะไม่ล้าสมัยเลย (Long Half-Life)</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-2">จะรับมือกับความรู้ที่ล้าสมัยได้อย่างไร?</h4>
        <p>
          เพื่อไม่ให้ตัวเราเองกลายเป็นคนที่ตลาดแรงงานไม่ต้องการ การปรับตัวคือสิ่งสำคัญที่สุด:
        </p>
        <ol>
          <li><strong>Lifelong Learning:</strong> การเรียนรู้ตลอดชีวิตไม่ใช่แค่คำเท่ๆ อีกต่อไป แต่เป็นความจำเป็น คุณควรจัดสรรเวลาอย่างน้อยสัปดาห์ละ 2-5 ชั่วโมง เพื่ออัปเดตเทรนด์ อ่านบทความ หรือทดลองใช้เครื่องมือใหม่ๆ ในสายอาชีพ</li>
          <li><strong>มุ่งเน้นที่หลักการ มากกว่าเครื่องมือ:</strong> การเข้าใจ "กระบวนการคิด" หรือ "หลักการพื้นฐาน" จะช่วยให้คุณประยุกต์ใช้กับเครื่องมือใหม่ๆ ได้ง่ายขึ้น ตัวอย่างเช่น เข้าใจหลักการ Design Thinking ดีกว่าการจำเมนูในโปรแกรมออกแบบเพียงอย่างเดียว</li>
          <li><strong>ลงทุนใน Soft Skills:</strong> ทักษะการสื่อสาร การแก้ปัญหาเชิงซ้อน ความเห็นอกเห็นใจ (Empathy) เป็นทักษะที่ AI และระบบอัตโนมัติไม่สามารถทดแทนได้ง่ายๆ และมีครึ่งชีวิตที่ยาวนานมาก</li>
          <li><strong>Unlearn and Relearn:</strong> กล้าที่จะทิ้งความเชื่อหรือวิธีการเก่าๆ ที่เคยได้ผล (Unlearn) เพื่อเปิดรับและเรียนรู้วิธีการใหม่ๆ (Relearn) ที่เหมาะสมกับบริบทปัจจุบันมากกว่า</li>
        </ol>

        <p className="mt-4">
          การคำนวณ Skill Half-Life เป็นเครื่องมือเตือนสติว่าเราไม่อาจหยุดนิ่งได้ การลงทุนในการพัฒนาตนเองอย่างต่อเนื่องคือเกราะป้องกันความเสี่ยงที่ดีที่สุดในยุค Disruption ไม่ว่าครึ่งชีวิตทักษะของคุณจะสั้นแค่ไหน หากคุณมีความเร็วในการเรียนรู้ (Learning Agility) ที่มากกว่า คุณก็จะก้าวนำหน้าคู่แข่งและเติบโตในสายอาชีพได้อย่างมั่นคง
        </p>
      </div>
    </div>
  );
}
