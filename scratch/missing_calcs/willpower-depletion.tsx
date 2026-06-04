"use client";

import React, { useState } from "react";
import { BatteryWarning, AlertCircle, RefreshCw, Zap } from "lucide-react";

export default function WillpowerDepletion({ lang }: { lang: "EN" | "TH" }) {
  const [sleep, setSleep] = useState<number>(8);
  const [focusHours, setFocusHours] = useState<number>(2);
  const [decisions, setDecisions] = useState<number>(5);
  const [stress, setStress] = useState<number>(5);
  const [diet, setDiet] = useState<number>(5);

  const t = {
    title: lang === "TH" ? "เครื่องคำนวณระดับความเหนื่อยล้าทางใจ" : "Willpower Depletion Score",
    sleepTitle: lang === "TH" ? "คุณภาพการนอนหลับเมื่อคืน (1 แย่สุด - 10 ดีสุด)" : "Sleep Quality (1 Poor - 10 Excellent)",
    focusTitle: lang === "TH" ? "ชั่วโมงที่ใช้สมาธิจดจ่อ (ชั่วโมง)" : "Hours of Deep Focus",
    decisionsTitle: lang === "TH" ? "จำนวนการตัดสินใจที่สำคัญในวันนี้" : "Number of Major Decisions Today",
    stressTitle: lang === "TH" ? "ระดับความเครียด (1 ต่ำสุด - 10 สูงสุด)" : "Stress Level (1 Low - 10 High)",
    dietTitle: lang === "TH" ? "คุณภาพอาหารและน้ำดื่ม (1 แย่ - 10 ดี)" : "Nutrition & Hydration (1 Poor - 10 Excellent)",
    calculate: lang === "TH" ? "คำนวณความเหนื่อยล้าทางใจ" : "Calculate Depletion",
    resultTitle: lang === "TH" ? "ระดับพลังใจคงเหลือ" : "Remaining Willpower Score",
    statusHigh: lang === "TH" ? "พลังใจเต็มเปี่ยม พร้อมรับมือทุกสถานการณ์" : "High Willpower, ready for challenges",
    statusMedium: lang === "TH" ? "เริ่มเหนื่อยล้า ควรพักผ่อนสมองบ้าง" : "Moderately depleted, consider taking a break",
    statusLow: lang === "TH" ? "พลังใจหมดเกลี้ยง (Ego Depletion) หลีกเลี่ยงการตัดสินใจสำคัญ" : "Severely depleted (Ego Depletion), avoid major decisions",
    disclaimer: lang === "TH" 
      ? "ผลลัพธ์นี้เป็นการประเมินเบื้องต้นเพื่อเตือนให้คุณตระหนักถึงการพักผ่อน" 
      : "This is a basic estimation to remind you to take mental breaks."
  };

  const calculateScore = () => {
    let baseScore = sleep * 10;
    
    let focusPenalty = focusHours * 6;
    let decisionPenalty = decisions * 3;
    let stressPenalty = stress * 4;
    let dietBonus = (diet - 5) * 3;

    let finalScore = baseScore - focusPenalty - decisionPenalty - stressPenalty + dietBonus;
    
    if (finalScore > 100) finalScore = 100;
    if (finalScore < 0) finalScore = 0;

    return Math.round(finalScore);
  };

  const score = calculateScore();

  let statusText = "";
  let statusColor = "";
  
  if (score >= 60) {
    statusText = t.statusHigh;
    statusColor = "text-green-600 dark:text-green-400";
  } else if (score >= 30) {
    statusText = t.statusMedium;
    statusColor = "text-yellow-600 dark:text-yellow-400";
  } else {
    statusText = t.statusLow;
    statusColor = "text-red-600 dark:text-red-400";
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
          <BatteryWarning className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.disclaimer}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.sleepTitle}: {sleep}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.focusTitle}: {focusHours}
            </label>
            <input
              type="range"
              min="0"
              max="16"
              step="0.5"
              value={focusHours}
              onChange={(e) => setFocusHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.decisionsTitle}: {decisions}
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={decisions}
              onChange={(e) => setDecisions(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.stressTitle}: {stress}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.dietTitle}: {diet}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={diet}
              onChange={(e) => setDiet(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {t.resultTitle}
            </h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className={`${
                    score >= 60 ? "text-green-500" : score >= 30 ? "text-yellow-500" : "text-red-500"
                  } stroke-current transition-all duration-1000 ease-in-out`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-slate-800 dark:text-white">
                  {score}%
                </span>
              </div>
            </div>

            <p className={`text-lg font-medium ${statusColor}`}>
              {statusText}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          ความเหนื่อยล้าทางใจ (Willpower Depletion) คืออะไร?
        </h3>
        <p>
          Willpower Depletion หรือมักถูกเรียกว่า Ego Depletion เป็นแนวคิดทางจิตวิทยาที่อธิบายถึงภาวะที่พลังงานทางจิตใจหรือความสามารถในการควบคุมตนเอง (Self-control) ลดลง หลังจากที่มีการใช้ความคิด การจดจ่อ หรือการตัดสินใจอย่างต่อเนื่องเป็นเวลานาน แนวคิดนี้เปรียบเสมือนว่าความตั้งใจและพลังใจของเราเป็นเหมือนกล้ามเนื้อ ซึ่งเมื่อถูกใช้งานหนักก็จะเกิดอาการเหนื่อยล้า และต้องการการพักผ่อนเพื่อฟื้นฟูให้กลับมาทำงานได้อย่างมีประสิทธิภาพอีกครั้ง
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">ปัจจัยที่ทำให้เกิดการสูญเสียพลังใจ</h4>
        <ul>
          <li><strong>Decision Fatigue (ความเหนื่อยล้าจากการตัดสินใจ):</strong> การต้องตัดสินใจหลายๆ เรื่องในหนึ่งวัน ไม่ว่าจะเป็นเรื่องเล็กน้อยเช่น จะกินอะไรดี ไปจนถึงเรื่องสำคัญในที่ทำงาน ยิ่งเราตัดสินใจมากเท่าไหร่ พลังใจยิ่งลดลงมากเท่านั้น</li>
          <li><strong>Deep Focus (การใช้สมาธิจดจ่อ):</strong> การทำงานที่ต้องใช้ความคิดวิเคราะห์ หรือสมาธิระดับสูงต่อเนื่องเป็นเวลานาน จะเผาผลาญพลังงานสมองอย่างรวดเร็ว</li>
          <li><strong>Stress and Emotional Regulation (ความเครียดและการควบคุมอารมณ์):</strong> การต้องฝืนยิ้ม ควบคุมความโกรธ หรือเผชิญกับสถานการณ์ที่ตึงเครียด ส่งผลให้ความสามารถในการควบคุมตนเองในเรื่องอื่นๆ ลดลง</li>
          <li><strong>Sleep and Nutrition (การนอนและโภชนาการ):</strong> การพักผ่อนไม่เพียงพอ หรือการขาดสารอาหาร (โดยเฉพาะระดับน้ำตาลในเลือดที่ลดลง) เป็นปัจจัยสำคัญที่ทำให้พลังใจลดลงอย่างรวดเร็วตั้งแต่วันเพิ่งเริ่ม</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-2">ผลกระทบของ Ego Depletion</h4>
        <p>
          เมื่อคุณอยู่ในภาวะที่พลังใจลดลงต่ำสุด (Low Willpower) คุณมักจะมีพฤติกรรมที่เปลี่ยนไป เช่น:
        </p>
        <ul>
          <li>ยอมแพ้หรือล้มเลิกความตั้งใจได้ง่ายขึ้นเมื่อเจออุปสรรค</li>
          <li>มีแนวโน้มที่จะเลือกสิ่งที่ให้ความสุขระยะสั้น (Instant Gratification) เช่น การกินขนมหวาน การเล่นโซเชียลมีเดีย แทนที่จะทำสิ่งที่ควรทำ</li>
          <li>หลีกเลี่ยงการตัดสินใจ หรือตัดสินใจแบบลวกๆ โดยไม่คิดให้รอบคอบ</li>
          <li>ควบคุมอารมณ์ได้ยากขึ้น อาจหงุดหงิดง่ายกว่าปกติ</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-2">วิธีฟื้นฟูและบริหารจัดการพลังใจ</h4>
        <p>
          เพื่อป้องกันและรับมือกับภาวะ Willpower Depletion เราสามารถนำเทคนิคต่างๆ มาปรับใช้ได้ดังนี้:
        </p>
        <ol>
          <li><strong>ลดการตัดสินใจที่ไม่จำเป็น:</strong> สร้างกิจวัตรประจำวัน (Routine) สำหรับเรื่องเล็กๆ น้อยๆ เช่น การจัดเตรียมชุดทำงานไว้ล่วงหน้า หรือมีเมนูอาหารประจำ เพื่อสงวนพลังใจไว้ใช้กับเรื่องที่สำคัญกว่า</li>
          <li><strong>จัดลำดับความสำคัญ (Eat the Frog):</strong> ทำงานที่สำคัญที่สุดและยากที่สุดในช่วงเช้าหรือช่วงที่พลังใจยังเต็มเปี่ยมอยู่ อย่าปล่อยงานยากไว้ทำตอนท้ายของวัน</li>
          <li><strong>เทคนิค Pomodoro:</strong> สลับการทำงานกับการพักผ่อนเป็นระยะ เพื่อป้องกันความเหนื่อยล้าสะสม เช่น ทำงาน 25 นาที พัก 5 นาที</li>
          <li><strong>ดูแลสุขภาพพื้นฐาน:</strong> นอนหลับให้เพียงพอ 7-8 ชั่วโมงต่อวัน และรับประทานอาหารที่มีประโยชน์เพื่อให้ระดับน้ำตาลในเลือดคงที่ ซึ่งเป็นเชื้อเพลิงหลักของสมอง</li>
          <li><strong>ฝึกฝนสติ (Mindfulness):</strong> การทำสมาธิหรือการรับรู้ความรู้สึกของตัวเอง สามารถช่วยเพิ่มความจุของพลังใจและการควบคุมตนเองในระยะยาวได้</li>
        </ol>

        <p className="mt-4">
          การเข้าใจกลไกของ Willpower Depletion จะช่วยให้เราสามารถวางแผนการใช้ชีวิตประจำวันได้อย่างมีกลยุทธ์มากขึ้น ไม่ฝืนตัวเองจนเกินพอดี และรู้จักให้รางวัลตนเองด้วยการพักผ่อนอย่างเหมาะสม เพื่อให้สามารถกลับมาทำงานและตัดสินใจเรื่องต่างๆ ได้อย่างมีประสิทธิภาพในทุกๆ วัน
        </p>
      </div>
    </div>
  );
}
