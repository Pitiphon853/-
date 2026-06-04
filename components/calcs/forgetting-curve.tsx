"use client";

import React, { useState } from "react";
import { Brain, History, RefreshCcw, AlertTriangle } from "lucide-react";

export default function ForgettingCurve({ lang }: { lang: "EN" | "TH" }) {
  const [quality, setQuality] = useState<number>(7);
  const [days, setDays] = useState<number>(3);
  const [reviews, setReviews] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("medium");

  const t = {
    title: lang === "TH" ? "เครื่องคำนวณกราฟการลืม (Forgetting Curve)" : "Memory Retention Calculator",
    subtitle: lang === "TH" ? "ประเมินเปอร์เซ็นต์ความจำที่หลงเหลืออยู่เมื่อเวลาผ่านไป" : "Estimate how much information you still retain over time.",
    
    qualLabel: lang === "TH" ? "คุณภาพของการเรียนรู้ครั้งแรก (1-10)" : "Initial Learning Quality (1-10)",
    daysLabel: lang === "TH" ? "จำนวนวันที่ผ่านไปตั้งแต่เรียน (วัน)" : "Days since learning",
    reviewLabel: lang === "TH" ? "จำนวนครั้งที่กลับมาทบทวน (0-5 ครั้ง)" : "Number of Review Sessions (0-5)",
    diffLabel: lang === "TH" ? "ความยากของเนื้อหา" : "Material Difficulty",

    diffEasy: lang === "TH" ? "ง่าย / คุ้นเคยอยู่แล้ว" : "Easy / Familiar",
    diffMed: lang === "TH" ? "ปานกลาง / มีความซับซ้อนบ้าง" : "Medium / Some complexity",
    diffHard: lang === "TH" ? "ยากมาก / ศัพท์เทคนิคเยอะ" : "Hard / Highly technical",

    resultLabel: lang === "TH" ? "ความจำที่หลงเหลืออยู่ (Retention)" : "Current Memory Retention",
    nextReview: lang === "TH" ? "คำแนะนำการทบทวน" : "Review Recommendation",
  };

  const calculateRetention = () => {
    // Ebbinghaus formula approximation: R = e^(-t / S)
    // t = time in days
    // S = strength of memory
    
    let diffFactor = 1.0;
    if (difficulty === "easy") diffFactor = 0.5;
    if (difficulty === "medium") diffFactor = 1.0;
    if (difficulty === "hard") diffFactor = 1.8;

    // Base strength from quality
    let S = quality / diffFactor;
    
    // Each review (Spaced Repetition) drastically increases S
    if (reviews > 0) {
      S = S * Math.pow(2.2, reviews);
    }

    if (days === 0) return 100;

    const retention = Math.exp(-days / S) * 100;
    
    return Math.max(0, Math.min(100, retention));
  };

  const retention = calculateRetention();

  let advice = "";
  if (retention > 90) {
    advice = lang === "TH" 
      ? "ความจำยังอยู่ในระดับดีเยี่ยม ไม่จำเป็นต้องทบทวนตอนนี้"
      : "Excellent retention. No immediate review needed.";
  } else if (retention > 70) {
    advice = lang === "TH"
      ? "เริ่มลืมบ้างแล้ว เป็นเวลาที่ดีในการกลับมาทบทวนสั้นๆ"
      : "Memory is starting to fade. Good time for a quick review.";
  } else if (retention > 40) {
    advice = lang === "TH"
      ? "ลืมเนื้อหาไปเกินครึ่งแล้ว รีบทบทวนด่วนก่อนที่จะลืมหมด"
      : "More than half is forgotten. Review soon!";
  } else {
    advice = lang === "TH"
      ? "น่าจะลืมเกือบหมดแล้ว อาจต้องใช้เวลาเรียนรู้ใหม่ (Relearn) เกือบเท่าครั้งแรก"
      : "Memory lost. You might need to relearn the material.";
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
          <Brain className="w-8 h-8 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.qualLabel}: {quality}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.diffLabel}
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="easy">{t.diffEasy}</option>
              <option value="medium">{t.diffMed}</option>
              <option value="hard">{t.diffHard}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.daysLabel}: {days}
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.reviewLabel}: {reviews}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              value={reviews}
              onChange={(e) => setReviews(Number(e.target.value))}
              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-teal-600"
            />
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full border-2 border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10 dark:opacity-5">
              <History className="w-32 h-32" />
            </div>

            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-4 z-10">
              {t.resultLabel}
            </h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-slate-100 dark:text-slate-700 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className={`${
                    retention >= 80 ? "text-teal-500" : retention >= 50 ? "text-amber-500" : "text-rose-500"
                  } stroke-current transition-all duration-1000 ease-out`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${(retention / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-slate-800 dark:text-white">
                  {retention.toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl z-10 w-full flex items-start space-x-3">
              <RefreshCcw className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 dark:text-slate-300 text-left">
                <strong>{t.nextReview}:</strong> <br/> {advice}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          กราฟการลืม (Forgetting Curve) คืออะไร?
        </h3>
        <p>
          <strong>Forgetting Curve</strong> หรือเส้นโค้งแห่งการลืม ถูกค้นพบโดยนักจิตวิทยาชาวเยอรมัน Hermann Ebbinghaus ในช่วงปลายศตวรรษที่ 19 งานวิจัยของเขาแสดงให้เห็นว่า มนุษย์เราจะสูญเสียความทรงจำเกี่ยวกับข้อมูลใหม่ๆ ที่เพิ่งเรียนรู้ไปอย่างรวดเร็วมากในระยะเวลาสั้นๆ หากไม่มีการกลับมาทบทวน 
        </p>
        <p>
          ตามสถิติแล้ว ภายในเวลาเพียง 20 นาทีแรก เราอาจลืมข้อมูลไปแล้วถึง 40% และเมื่อผ่านไป 1 สัปดาห์ เราอาจจำข้อมูลนั้นได้เพียง 10-20% เท่านั้น นี่คือเหตุผลว่าทำไมการอ่านหนังสือโต้รุ่งคืนก่อนสอบ (Cramming) ถึงมักจะทำให้เราสอบเสร็จแล้วก็ลืมทุกอย่างไปในพริบตา
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">ปัจจัยที่มีผลต่ออัตราการลืม</h4>
        <ul>
          <li><strong>ความยากของเนื้อหา (Difficulty):</strong> ข้อมูลที่ไม่มีความหมาย เช่น ตัวเลขสุ่ม หรือคำศัพท์ภาษาใหม่ มักจะถูกลืมเร็วกว่าข้อมูลที่สามารถอ้างอิงกับประสบการณ์เดิมได้</li>
          <li><strong>ความเข้าใจในครั้งแรก (Initial Quality):</strong> หากตอนที่เรียนรู้ครั้งแรกคุณเข้าใจอย่างถ่องแท้ (Deep Learning) อัตราการลืมจะช้ากว่าการท่องจำแบบนกแก้วนกขุนทอง</li>
          <li><strong>ปัจจัยด้านสุขภาพ:</strong> ความเครียดสะสม และการนอนหลับที่ไม่เพียงพอ ส่งผลเสียโดยตรงต่อฮิปโปแคมปัส (Hippocampus) ซึ่งเป็นส่วนของสมองที่ทำหน้าที่เปลี่ยนความจำระยะสั้นให้เป็นความจำระยะยาว</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-2">เทคนิคเอาชนะกราฟการลืม (Spaced Repetition)</h4>
        <p>
          เราสามารถชะลอการหลงลืมและเปลี่ยนข้อมูลให้กลายเป็นความจำถาวรได้ด้วยเทคนิคที่เรียกว่า <strong>Spaced Repetition (การเว้นระยะทบทวน)</strong>
        </p>
        <ol>
          <li><strong>ทบทวนครั้งที่ 1 (ภายใน 24 ชม.):</strong> การกลับมาอ่านหรือทำสรุปสั้นๆ ภายในวันแรก จะช่วยดึงกราฟความจำกลับไปที่ 100% ได้เร็วที่สุดและง่ายที่สุด</li>
          <li><strong>ทบทวนครั้งที่ 2 (ภายใน 3 วัน):</strong> เมื่อกราฟเริ่มตกลงมา ให้ทบทวนอีกครั้ง ในรอบนี้สมองจะเริ่มบันทึกข้อมูลได้ทนทานขึ้น กราฟจะตกลงช้ากว่าเดิม</li>
          <li><strong>ทบทวนครั้งต่อๆ ไป (1 สัปดาห์, 2 สัปดาห์, 1 เดือน):</strong> เว้นระยะห่างของการทบทวนให้นานขึ้นเรื่อยๆ การทำเช่นนี้เป็นการส่งสัญญาณบอกสมองว่า "ข้อมูลนี้สำคัญนะ อย่าเพิ่งลบมันทิ้ง"</li>
        </ol>

        <p className="mt-4">
          การเรียนรู้ที่ดีไม่ใช่การพยายามจำทุกอย่างให้ได้ในครั้งเดียว แต่เป็นการรู้จังหวะเวลาที่เหมาะสมในการดึงข้อมูลนั้นกลับมาทบทวน คุณสามารถใช้แอปพลิเคชันอย่าง Anki, Quizlet หรือแม้แต่การจดบันทึกลงปฏิทิน เพื่อช่วยเตือนให้ทบทวนความรู้ตามระยะเวลาที่เหมาะสม และเอาชนะกฎแห่งการลืมตามธรรมชาติได้อย่างมีประสิทธิภาพ
        </p>
      </div>
    </div>
  );
}
