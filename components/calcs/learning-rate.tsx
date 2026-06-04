"use client";

import React, { useState } from "react";
import { Rocket, Target, Zap, Activity } from "lucide-react";

export default function LearningRate({ lang }: { lang: "EN" | "TH" }) {
  const [background, setBackground] = useState<number>(5);
  const [interest, setInterest] = useState<number>(7);
  const [teaching, setTeaching] = useState<number>(6);
  const [practice, setPractice] = useState<number>(4);
  const [feedback, setFeedback] = useState<string>("daily");

  const t = {
    title: lang === "TH" ? "เครื่องคำนวณอัตราความเร็วการเรียนรู้" : "Learning Rate Velocity Calculator",
    subtitle: lang === "TH" 
      ? "ประเมินศักยภาพและความเร็วในการซึมซับทักษะใหม่ของคุณ"
      : "Estimate your potential velocity in acquiring a new skill",
    
    bgLabel: lang === "TH" ? "พื้นฐานความรู้เดิมที่เกี่ยวข้อง (1-10)" : "Related Background Knowledge (1-10)",
    intLabel: lang === "TH" ? "ระดับความสนใจและแรงจูงใจ (1-10)" : "Interest & Motivation Level (1-10)",
    teachLabel: lang === "TH" ? "คุณภาพของสื่อ/ครูผู้สอน (1-10)" : "Quality of Material/Instructor (1-10)",
    pracLabel: lang === "TH" ? "เวลาฝึกฝนลงมือทำจริง (ชั่วโมง/สัปดาห์)" : "Active Practice (Hours/Week)",
    feedLabel: lang === "TH" ? "ความถี่ของการได้รับ Feedback/ประเมินผล" : "Frequency of Feedback/Correction",

    fbImmediate: lang === "TH" ? "ทันที (มีโค้ช/ระบบตรวจจับ)" : "Immediate (Coach / AI Tool)",
    fbDaily: lang === "TH" ? "ทุกวัน (ประเมินด้วยตัวเอง/ตรวจงานรายวัน)" : "Daily",
    fbWeekly: lang === "TH" ? "รายสัปดาห์" : "Weekly",
    fbRarely: lang === "TH" ? "แทบไม่มี / นานๆ ครั้ง" : "Rarely / Self-study without tests",

    resultLabel: lang === "TH" ? "ดัชนีความเร็วการเรียนรู้ (Learning Velocity)" : "Learning Velocity Index",
    statusHigh: lang === "TH" ? "ความเร็วสูงมาก (Hyper-Learner) คุณซึมซับทักษะนี้ได้ไวกว่าคนทั่วไปหลายเท่า" : "Hyper-Learner: Acquiring skill at a massive pace.",
    statusGood: lang === "TH" ? "ความเร็วดีเยี่ยม มีความสม่ำเสมอและอยู่ในเส้นทางที่ถูกต้อง" : "Good Velocity: Steady and effective progress.",
    statusAvg: lang === "TH" ? "ความเร็วระดับปานกลาง อาจต้องเพิ่มเวลาซ้อมหรือหา Feedback" : "Average: Consider increasing practice or getting better feedback.",
    statusLow: lang === "TH" ? "ความเร็วต่ำ อาจเกิดความท้อแท้ได้ง่าย ควรปรับเปลี่ยนวิธีเรียน" : "Low Velocity: Risk of dropping out. Adjust your learning methods.",
  };

  const calculateVelocity = () => {
    const base = (background + interest + teaching) / 3; // 1-10

    let practiceMult = 0.5;
    if (practice > 10) practiceMult = 2.0;
    else if (practice >= 6) practiceMult = 1.5;
    else if (practice >= 3) practiceMult = 1.0;

    let feedbackMult = 0.6;
    if (feedback === "immediate") feedbackMult = 1.5;
    if (feedback === "daily") feedbackMult = 1.2;
    if (feedback === "weekly") feedbackMult = 0.9;

    const rawScore = base * practiceMult * feedbackMult;
    
    // Max possible is 10 * 2.0 * 1.5 = 30
    let index = (rawScore / 30) * 100;
    if (index > 100) index = 100;
    if (index < 1) index = 1;

    return Math.round(index);
  };

  const score = calculateVelocity();

  let statusText = "";
  let statusColor = "";
  if (score >= 80) {
    statusText = t.statusHigh;
    statusColor = "text-emerald-600 dark:text-emerald-400";
  } else if (score >= 50) {
    statusText = t.statusGood;
    statusColor = "text-blue-600 dark:text-blue-400";
  } else if (score >= 30) {
    statusText = t.statusAvg;
    statusColor = "text-amber-600 dark:text-amber-400";
  } else {
    statusText = t.statusLow;
    statusColor = "text-rose-600 dark:text-rose-400";
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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
              {t.bgLabel}: {background}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={background}
              onChange={(e) => setBackground(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.intLabel}: {interest}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.teachLabel}: {teaching}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={teaching}
              onChange={(e) => setTeaching(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.pracLabel}: {practice}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={practice}
              onChange={(e) => setPractice(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.feedLabel}
            </label>
            <select
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="immediate">{t.fbImmediate}</option>
              <option value="daily">{t.fbDaily}</option>
              <option value="weekly">{t.fbWeekly}</option>
              <option value="rarely">{t.fbRarely}</option>
            </select>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full border-2 border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 dark:opacity-5">
              <Activity className="w-48 h-48" />
            </div>

            <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-2 z-10">
              {t.resultLabel}
            </h3>
            
            <div className="my-6 z-10 flex flex-col items-center">
              <span className="text-7xl font-extrabold text-slate-800 dark:text-white tracking-tighter">
                {score}
              </span>
              <span className="text-slate-400 font-medium tracking-widest uppercase text-sm mt-1">
                Out of 100
              </span>
            </div>

            <div className={`p-4 rounded-xl z-10 w-full ${statusColor.replace('text-', 'bg-').replace('600', '50').replace('400', '900/20')}`}>
              <p className={`font-semibold ${statusColor}`}>
                {statusText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          ความเร็วในการเรียนรู้ (Learning Rate Velocity) คืออะไร?
        </h3>
        <p>
          Learning Rate Velocity หรือ ความเร็วในการเรียนรู้ เป็นแนวคิดที่ใช้ประเมินว่ามนุษย์เราสามารถรับข้อมูลใหม่ ทำความเข้าใจ และเปลี่ยนข้อมูลนั้นให้กลายเป็น <strong>"ทักษะที่นำไปใช้งานได้จริง"</strong> ได้รวดเร็วและมีประสิทธิภาพมากน้อยเพียงใด ในยุคที่โลกหมุนเร็ว ผู้ที่สามารถเรียนรู้สิ่งใหม่ได้เร็วกว่า (Fast Learner) มักจะมีความได้เปรียบในการแข่งขันอย่างมหาศาล
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">องค์ประกอบของความเร็วในการเรียนรู้</h4>
        <p>การเรียนรู้สิ่งใหม่ให้ได้ผลดีและรวดเร็ว ไม่ได้ขึ้นอยู่กับ IQ เพียงอย่างเดียว แต่มีปัจจัยหลักๆ ดังนี้:</p>
        <ul>
          <li><strong>พื้นฐานความรู้เดิม (Background Knowledge):</strong> การเรียนรู้คือการเชื่อมโยงข้อมูลใหม่เข้ากับข้อมูลเก่าที่มีอยู่ในสมอง ยิ่งคุณมีพื้นฐานที่เกี่ยวข้องมากเท่าไหร่ การต่อยอดก็จะยิ่งเร็วขึ้นเป็นทวีคูณ</li>
          <li><strong>แรงจูงใจ (Interest & Motivation):</strong> สารเคมีในสมองอย่างโดพามีน (Dopamine) จะหลั่งออกมาเมื่อเรามีความสนใจ ซึ่งช่วยเพิ่มสมาธิและความสามารถในการจดจำข้อมูล</li>
          <li><strong>คุณภาพของการสอน (Teaching Quality):</strong> โครงสร้างเนื้อหาที่ดี สื่อที่เข้าใจง่าย และผู้สอนที่มีประสบการณ์ จะช่วยย่นระยะเวลาการลองผิดลองถูกของคุณได้มาก</li>
          <li><strong>การลงมือทำจริง (Active Practice):</strong> การอ่านหรือฟังเพียงอย่างเดียวสร้างได้แค่ "ความจำ" แต่การนำไปลงมือทำ (Active Recall & Deliberate Practice) จะสร้าง "เครือข่ายประสาท" ทำให้เกิดเป็นทักษะที่แท้จริง</li>
          <li><strong>การได้รับข้อเสนอแนะ (Feedback Loop):</strong> นี่คือปัจจัยที่สำคัญที่สุด! การรู้ตัวว่าทำผิดพลาดและแก้ไขได้ทันที (Immediate Feedback) เช่น การมีโค้ชชี้แนะ จะเร่งความเร็วในการพัฒนาได้ดีกว่าการฝึกฝนเองแบบไร้ทิศทางหลายสิบเท่า</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-2">เทคนิคการเพิ่ม Learning Velocity ให้ตัวเอง</h4>
        <ol>
          <li><strong>ใช้หลักการ 80/20 (Pareto Principle):</strong> ค้นหาให้เจอว่า 20% ของเนื้อหาหรือทักษะย่อยใดที่สำคัญที่สุด ที่จะให้ผลลัพธ์ถึง 80% แล้วทุ่มเทเวลาฝึกฝนในจุดนั้นก่อน</li>
          <li><strong>ทำลายวงจรภาพลวงตาแห่งความรู้ (Illusion of Competence):</strong> อย่าคิดว่าอ่านจบแล้วคือเข้าใจ ให้ทดสอบตัวเอง (Self-Testing) หรือลองอธิบายให้คนอื่นฟัง (Feynman Technique) เพื่อเช็คว่าเราเข้าใจมันจริงๆ</li>
          <li><strong>ลดขนาด Feedback Loop:</strong> อย่ารอให้ถึงวันสอบหรือรอให้โปรเจกต์จบถึงจะประเมินผล พยายามหาคนรีวิวงาน ขอคำแนะนำ หรือใช้ AI ช่วยตรวจทานข้อผิดพลาดเป็นระยะๆ ระหว่างทาง</li>
          <li><strong>รักษาสุขภาพการนอน:</strong> สมองจะทำการรวบรวมข้อมูลที่เรียนรู้มาในตอนกลางวัน ไปจัดระเบียบและสร้างความจำระยะยาวในขณะที่เรานอนหลับลึก (Deep Sleep) การนอนน้อยจึงทำให้ Learning Rate ตกฮวบ</li>
        </ol>

        <p className="mt-4">
          ท้ายที่สุด ความเร็วในการเรียนรู้สามารถฝึกฝนและพัฒนาได้ (Growth Mindset) ลองปรับเปลี่ยนวิธีการเรียนและสภาพแวดล้อมให้เหมาะสมกับตัวคุณเอง เพื่อยกระดับศักยภาพในการเป็นคนที่เรียนรู้อะไรใหม่ๆ ได้อย่างรวดเร็วตลอดชีวิต
        </p>
      </div>
    </div>
  );
}
