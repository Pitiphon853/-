"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem } from "./shared";
import { BookOpen, Clock, BrainCircuit, Play, Pause, RotateCcw } from "lucide-react";

// ---------------------------------------------------------
// 23. IELTS ↔ TOEFL ↔ CEFR Converter
// ---------------------------------------------------------
export function EnglishTestConverter({ lang, setCalc }: { lang: Lang, setCalc: (id: string) => void }) {
  const [testType, setTestType] = useLocalState("eng-test", "ielts");
  const [scoreStr, setScoreStr] = useLocalState("eng-score", "6.5");

  const convert = () => {
    let score = Number(scoreStr) || 0;
    let ielts = 0, toefl = 0, cefr = "";

    if (testType === "ielts") {
      ielts = score;
      if (score >= 8.5) { toefl = 118; cefr = "C2"; }
      else if (score >= 8.0) { toefl = 110; cefr = "C1"; }
      else if (score >= 7.5) { toefl = 102; cefr = "C1"; }
      else if (score >= 7.0) { toefl = 94; cefr = "C1"; }
      else if (score >= 6.5) { toefl = 79; cefr = "B2"; }
      else if (score >= 6.0) { toefl = 60; cefr = "B2"; }
      else if (score >= 5.5) { toefl = 46; cefr = "B2"; }
      else if (score >= 5.0) { toefl = 35; cefr = "B1"; }
      else if (score >= 4.5) { toefl = 32; cefr = "B1"; }
      else { toefl = 0; cefr = "A2 or below"; }
    } else if (testType === "toefl") {
      toefl = score;
      if (score >= 118) { ielts = 8.5; cefr = "C2"; }
      else if (score >= 110) { ielts = 8.0; cefr = "C1"; }
      else if (score >= 102) { ielts = 7.5; cefr = "C1"; }
      else if (score >= 94) { ielts = 7.0; cefr = "C1"; }
      else if (score >= 79) { ielts = 6.5; cefr = "B2"; }
      else if (score >= 60) { ielts = 6.0; cefr = "B2"; }
      else if (score >= 46) { ielts = 5.5; cefr = "B2"; }
      else if (score >= 35) { ielts = 5.0; cefr = "B1"; }
      else if (score >= 32) { ielts = 4.5; cefr = "B1"; }
      else { ielts = 4.0; cefr = "A2 or below"; }
    }

    return { ielts, toefl, cefr };
  };

  const res = convert();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "เทียบเกณฑ์ภาษาอังกฤษ (IELTS ↔ TOEFL ↔ CEFR)" : "English Score Converter"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "แปลงคะแนนผลสอบวัดระดับภาษาอังกฤษเพื่อการศึกษาต่อหรือทำงาน" : "Convert English proficiency scores across systems."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "เลือกประเภทผลสอบ" : "Test Type"}</label>
            <select value={testType} onChange={e=>setTestType(e.target.value)} className={inputClass}>
              <option value="ielts">IELTS (Academic)</option>
              <option value="toefl">TOEFL iBT</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "คะแนนของคุณ (Score)" : "Your Score"}</label>
            <input type="number" step={testType==="ielts"?"0.5":"1"} value={scoreStr} onChange={e=>setScoreStr(e.target.value)} className={inputClass} placeholder={testType==="ielts"?"6.5":"90"} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 font-medium mb-1">IELTS Band</p>
          <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{res.ielts}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 font-medium mb-1">TOEFL iBT</p>
          <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{res.toefl}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl text-center border border-blue-200 dark:border-blue-700">
          <p className="text-blue-600 dark:text-blue-300 font-medium mb-1">CEFR Level</p>
          <p className="text-4xl font-black text-blue-700 dark:text-blue-400">{res.cefr}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 text-center">* {lang === "TH" ? "ผลการประเมินนี้อ้างอิงจากตารางแปลงคะแนนของ ETS (ผู้จัดสอบ TOEFL) เป็นค่าประมาณเบื้องต้นเท่านั้น" : "Based on ETS official score comparison tool. Estimates only."}</p>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (IELTS & CEFR)" : "English Tests FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "CEFR คืออะไร และทำไมมหาวิทยาลัยถึงใช้เป็นมาตรฐานหลัก?" : "What is CEFR?"} 
          a={lang === "TH" ? 
`CEFR ย่อมาจาก Common European Framework of Reference for Languages เป็น "มาตรฐานระดับโลก" ที่ใช้ในการอธิบายระดับความเชี่ยวชาญทางภาษาของผู้เรียน (ไม่จำกัดแค่ภาษาอังกฤษ) 

ถูกออกแบบโดยสภายุโรป (Council of Europe) แบ่งความสามารถทางภาษาออกเป็น 6 ระดับ:
- **A1 และ A2 (Basic User):** ผู้ใช้ระดับเริ่มต้น เข้าใจประโยคง่ายๆ แนะนำตัวได้
- **B1 และ B2 (Independent User):** ผู้ใช้ระดับอิสระ สื่อสารคล่องแคล่ว เอาตัวรอดในต่างประเทศได้ (ระดับ B2 เป็นเกณฑ์ขั้นต่ำที่มหาวิทยาลัยในอังกฤษและออสเตรเลียส่วนใหญ่ต้องการ)
- **C1 และ C2 (Proficient User):** ผู้ใช้ระดับเชี่ยวชาญเทียบเท่าเจ้าของภาษา เข้าใจวรรณกรรมและภาษาเชิงวิชาการที่ซับซ้อน (ระดับที่มหาวิทยาลัย Top 10 ของโลกต้องการ)

มหาวิทยาลัยและบริษัทข้ามชาติใช้ CEFR เป็น "แกนกลาง" ในการเทียบผลสอบ เพราะปัจจุบันมีข้อสอบหลายตัวมาก (IELTS, TOEFL, PTE, TOEIC) การบอกว่าได้ระดับ B2 จึงเป็นภาษาสากลที่เข้าใจตรงกันทั่วโลกมากกว่าการบอกคะแนนดิบครับ` 
          : "CEFR is a global standard for describing language ability on a 6-point scale, from A1 to C2."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ความแตกต่างระหว่าง IELTS และ TOEFL iBT อันไหนเหมาะกับใคร?" : "IELTS vs TOEFL: Which should I take?"} 
          a={lang === "TH" ? 
`แม้ทั้งคู่จะเป็นข้อสอบวัดระดับภาษาอังกฤษเพื่อการศึกษา (Academic) เหมือนกัน แต่มีรูปแบบและการยอมรับที่ต่างกัน:

**IELTS (International English Language Testing System):**
- **สำเนียงและคำศัพท์:** เป็นแบบ British English (อังกฤษแท้) 
- **รูปแบบการสอบ:** สามารถเลือกสอบแบบเขียนลงกระดาษ (Paper-based) ได้ และพาร์ท Speaking จะเป็นการเข้าไปนั่งคุยกับ "มนุษย์ (Examiner)" แบบตัวต่อตัว 15 นาที
- **เหมาะกับใคร?** คนที่อยากไปเรียนต่อในสหราชอาณาจักร (UK), ออสเตรเลีย, นิวซีแลนด์ หรือคนที่ไม่ถนัดพูดใส่ไมโครโฟนคอมพิวเตอร์และชอบการคุยโต้ตอบกับคนจริงๆ มากกว่า

**TOEFL iBT (Test of English as a Foreign Language - Internet-based Test):**
- **สำเนียงและคำศัพท์:** เป็นแบบ American English 
- **รูปแบบการสอบ:** ทำในคอมพิวเตอร์ 100% พาร์ท Speaking จะเป็นการ "พูดใส่ไมโครโฟน" แล้วอัดเสียงส่งไปให้กรรมการตรวจ (ไม่มีคนมานั่งฟังต่อหน้า)
- **เหมาะกับใคร?** คนที่อยากไปเรียนต่อในสหรัฐอเมริกา และคนที่ขี้อายหรือประหม่าเวลาต้องพูดภาษาอังกฤษต่อหน้าคนต่างชาติ การพูดใส่คอมพิวเตอร์จะช่วยลดความกดดันได้ดีกว่า` 
          : "IELTS is British/Australian focused with in-person speaking. TOEFL is American focused and 100% computer-based."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 24. Pomodoro Timer
// ---------------------------------------------------------
export function PomodoroTimer({ lang }: { lang: Lang }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Try to play sound (might be blocked by browser policy without interaction, but works mostly)
      try {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
        audio.play().catch(()=>{});
      } catch (e) {}

      // Auto switch logic
      if (mode === "work") {
        const newSessions = sessionsCompleted + 1;
        setSessionsCompleted(newSessions);
        if (newSessions % 4 === 0) {
          switchMode("longBreak");
        } else {
          switchMode("shortBreak");
        }
      } else {
        switchMode("work");
      }
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, mode, sessionsCompleted]);

  const switchMode = (m: "work" | "shortBreak" | "longBreak") => {
    setMode(m);
    setIsActive(false);
    if (m === "work") setTimeLeft(25 * 60);
    else if (m === "shortBreak") setTimeLeft(5 * 60);
    else if (m === "longBreak") setTimeLeft(15 * 60);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") setTimeLeft(25 * 60);
    else if (mode === "shortBreak") setTimeLeft(5 * 60);
    else if (mode === "longBreak") setTimeLeft(15 * 60);
  };

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  
  let bgClass = "bg-red-500";
  let textClass = "text-red-500";
  let modeName = lang==="TH"?"โฟกัสทำงาน":"Focus";
  if (mode === "shortBreak") {
    bgClass = "bg-green-500";
    textClass = "text-green-500";
    modeName = lang==="TH"?"พักสายตา":"Short Break";
  } else if (mode === "longBreak") {
    bgClass = "bg-blue-500";
    textClass = "text-blue-500";
    modeName = lang==="TH"?"พักสมองยาว":"Long Break";
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "นาฬิกาจับเวลา Pomodoro" : "Pomodoro Timer"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "เทคนิคบริหารเวลาเพื่อเพิ่มสมาธิในการอ่านหนังสือหรือทำงาน" : "Time management technique to improve focus and productivity."}</p>
      </div>

      <div className={`p-8 rounded-[3rem] shadow-lg transition-colors duration-500 ${bgClass} text-white`}>
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={()=>switchMode("work")} className={`px-4 py-2 rounded-full font-medium transition-all ${mode==="work"?"bg-white/30 backdrop-blur-md":"hover:bg-white/10"}`}>{lang==="TH"?"ทำงาน (25m)":"Work (25m)"}</button>
          <button onClick={()=>switchMode("shortBreak")} className={`px-4 py-2 rounded-full font-medium transition-all ${mode==="shortBreak"?"bg-white/30 backdrop-blur-md":"hover:bg-white/10"}`}>{lang==="TH"?"พักสั้น (5m)":"Break (5m)"}</button>
          <button onClick={()=>switchMode("longBreak")} className={`px-4 py-2 rounded-full font-medium transition-all ${mode==="longBreak"?"bg-white/30 backdrop-blur-md":"hover:bg-white/10"}`}>{lang==="TH"?"พักยาว (15m)":"Long (15m)"}</button>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl md:text-[8rem] font-black tracking-tighter tabular-nums drop-shadow-md">
            {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
          </div>
          <p className="text-xl mt-2 opacity-90 font-medium">{modeName}</p>
        </div>

        <div className="flex justify-center items-center gap-6">
          <button onClick={toggleTimer} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform text-gray-900">
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-2" />}
          </button>
          <button onClick={resetTimer} className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
        
        <div className="text-center mt-8 opacity-80 text-sm font-medium tracking-wide">
          {lang==="TH"?"รอบที่ทำสำเร็จ (Sessions):":"Sessions completed:"} {sessionsCompleted}
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (เทคนิค Pomodoro)" : "Pomodoro FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "เทคนิค Pomodoro คืออะไร และทำไมถึงได้ผลในการทำงาน?" : "What is the Pomodoro technique?"} 
          a={lang === "TH" ? 
`เทคนิค Pomodoro (โพโมโดโร่) เป็นหนึ่งในวิธีบริหารเวลาที่โด่งดังที่สุดในโลก คิดค้นโดย Francesco Cirillo ในช่วงปี 1980 (คำว่า Pomodoro แปลว่ามะเขือเทศในภาษาอิตาลี เนื่องจากเขาใช้นาฬิกาจับเวลาทำอาหารรูปมะเขือเทศ)

**หลักการทำงานที่ทำให้มันได้ผล:**
มนุษย์ไม่ได้ถูกออกแบบมาให้มีสมาธิจดจ่อ (Focus) กับสิ่งใดสิ่งหนึ่งได้นานเกิน 45-60 นาที สมองจะเกิดอาการล้า ประสิทธิภาพตก และถูกรบกวนได้ง่าย (เช่น เผลอหยิบมือถือมาไถโซเชียล)

เทคนิคนี้จึง "หั่น" เวลาทำงานออกเป็นชิ้นเล็กๆ ชิ้นละ 25 นาที (เรียกว่า 1 Pomodoro) ซึ่งเป็นระยะเวลาที่สั้นพอที่จะไม่ทำให้สมองรู้สึกต่อต้านหรือขี้เกียจ และยาวพอที่จะทำงานสำคัญให้คืบหน้าได้ เมื่อครบ 25 นาที กฎเหล็กคือ **"ต้องหยุดพักทันที 5 นาที"** เพื่อให้สมองได้ล้างความเครียด (Refresh) ก่อนจะเริ่มรอบใหม่

เมื่อสมองรู้ว่ามีเวลาจำกัดแค่ 25 นาที มันจะสร้างความรู้สึกเร่งด่วนหลอกๆ (Sense of urgency) ช่วยกำจัดนิสัยผัดวันประกันพรุ่ง และผลักดันให้คุณเข้าสู่สภาวะ "Deep Work" ได้อย่างง่ายดาย

อ้างอิง:
- Cirillo, F. (2006). The Pomodoro Technique (The Pomodoro).` 
          : "It's a time management method breaking work into 25-minute intervals separated by short breaks to maintain focus and prevent mental fatigue."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ในช่วงเวลาพักสั้น 5 นาที (Short Break) ฉันควรทำอะไร?" : "What should I do during the 5-minute break?"} 
          a={lang === "TH" ? 
`ช่วงเวลาพัก 5 นาที เป็นหัวใจสำคัญที่จะตัดสินว่าคุณจะสามารถทำ Pomodoro รอบต่อไปได้หรือไม่ ข้อผิดพลาดที่คนส่วนใหญ่ทำคือ "การหยุดทำงานแต่ยังคงจ้องหน้าจอ" (เช่น สลับแท็บไปดู YouTube หรือเช็กข้อความในโทรศัพท์)

**สิ่งที่ควรทำในช่วงพัก 5 นาที เพื่อให้สมองฟื้นตัว 100%:**
1. ลุกขึ้นยืนและเดินออกจากโต๊ะทำงาน: เพื่อให้เลือดไหลเวียนกลับไปที่สมองและกล้ามเนื้อขา
2. ดื่มน้ำหรือชงกาแฟ: การเติมน้ำ (Hydration) ช่วยให้สมองปลอดโปร่ง
3. ยืดเส้นยืดสาย (Stretching) หรือพักสายตาด้วยกฎ 20-20-20: มองออกไปนอกหน้าต่างที่ระยะ 20 ฟุต เพื่อคลายกล้ามเนื้อตาที่เกร็งจากการจ้องหน้าจอ
4. สูดหายใจลึกๆ หลับตา

**หลังจากทำครบ 4 รอบ (ประมาณ 2 ชั่วโมง)** 
ระบบของเราจะพาคุณเข้าสู่การพักยาว (Long Break) 15-30 นาที ช่วงเวลานี้คุณสามารถทานอาหารว่าง เช็กโซเชียลมีเดีย หรือทำกิจกรรมที่ผ่อนคลายจิตใจได้เต็มที่ ก่อนที่จะเริ่ม Cycle ใหญ่อีกครั้งครับ` 
          : "Step away from the screen. Stretch, drink water, and rest your eyes to fully recharge your brain."} 
        />
      </SEOFAQ>
    </div>
  );
}

// ---------------------------------------------------------
// 25. Flash Card Timer
// ---------------------------------------------------------
export function FlashCardTimer({ lang }: { lang: Lang }) {
  const [secPerCard, setSecPerCard] = useLocalState("fc-sec", "5");
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        // Time's up for this card
        setCardCount(c => c + 1);
        setTimeLeft(Number(secPerCard) || 5);
        try {
          const audio = new Audio("https://actions.google.com/sounds/v1/ui/pop_up_notification.ogg");
          audio.play().catch(()=>{});
        } catch (e) {}
      }
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, secPerCard]);

  const toggle = () => {
    if (!isActive && timeLeft === 0) {
      setTimeLeft(Number(secPerCard) || 5);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTimeLeft(Number(secPerCard) || 5);
    setCardCount(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mb-4">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{lang === "TH" ? "จับเวลาท่องจำ Flash Card (Active Recall)" : "Flash Card Timer"}</h2>
        <p className="text-gray-500">{lang === "TH" ? "จับเวลาสั้นๆ ต่อ 1 การ์ด เพื่อบีบให้สมองดึงข้อมูลออกมาให้เร็วที่สุด" : "Short interval timer to force rapid active recall."}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-sm mx-auto flex items-center gap-4">
        <label className={`${labelClass} mb-0 flex-1`}>{lang === "TH" ? "เวลาต่อการ์ด 1 ใบ (วินาที):" : "Seconds per card:"}</label>
        <input 
          type="number" 
          value={secPerCard} 
          onChange={e=>{
            setSecPerCard(e.target.value);
            if (!isActive) setTimeLeft(Number(e.target.value));
          }} 
          className={`${inputClass} w-24 text-center font-bold`} 
          placeholder="5" 
        />
      </div>

      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 rounded-[3rem] shadow-xl text-white text-center">
        <p className="text-violet-200 font-medium tracking-widest uppercase text-sm mb-4">{lang === "TH" ? "นับถอยหลัง" : "Countdown"}</p>
        <div className="text-[8rem] leading-none font-black tracking-tighter tabular-nums drop-shadow-md mb-8">
          {timeLeft}
        </div>
        
        <div className="flex justify-center items-center gap-6 mb-8">
          <button onClick={toggle} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform text-violet-700">
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-2" />}
          </button>
          <button onClick={reset} className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl inline-block backdrop-blur-sm border border-white/10">
          <p className="text-sm text-violet-200">{lang === "TH" ? "ผ่านไปแล้ว (Cards)" : "Cards completed"}</p>
          <p className="text-3xl font-bold">{cardCount}</p>
        </div>
      </div>

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (การจำด้วย Flash Card)" : "Active Recall FAQs"}>
        <FAQItem 
          q={lang === "TH" ? "หลักการ Active Recall คืออะไร ทำไมการอ่านหนังสือซ้ำๆ ถึงจำไม่ได้?" : "What is Active Recall?"} 
          a={lang === "TH" ? 
`นักเรียนและนักศึกษาส่วนใหญ่มักใช้วิธีเรียนแบบ "Passive (ตั้งรับ)" เช่น การอ่านหนังสือซ้ำไปซ้ำมา การขีดไฮไลท์ หรือการฟังอาจารย์บรรยาย ซึ่งวิธีเหล่านี้ทำให้รู้สึก "คุ้นเคย" กับเนื้อหา แต่ไม่ได้แปลว่าสมองนำข้อมูลเข้าไปเก็บในความจำระยะยาว (Long-term Memory)

**Active Recall (การดึงข้อมูลกลับอย่างกระตือรือร้น):**
เป็นเทคนิคที่ได้รับการพิสูจน์ทางวิทยาศาสตร์การเรียนรู้ (Cognitive Science) ว่ามีประสิทธิภาพสูงที่สุดในการจำ หลักการคือ การ "บังคับ" ให้สมองต้องขุดคุ้ยและดึงข้อมูลออกมาตอบคำถามโดยไม่ดูหนังสือ

เครื่องมือ "Flash Card (บัตรคำศัพท์/บัตรคำถาม)" คืออาวุธหลักของ Active Recall เมื่อคุณมองเห็นคำถามบนการ์ด สมองจะเกิดกระบวนการค้นหาข้อมูล (Retrieval practice) ซึ่งกระบวนการที่ "ยากและต้องใช้ความพยายาม" นี้เอง ที่เป็นตัวเสริมสร้างจุดเชื่อมต่อของเซลล์ประสาท (Synapses) ทำให้ความจำฝังแน่น ยิ่งคุณดึงข้อมูลออกมาได้เร็วและบ่อยเท่าไหร่ คุณก็จะยิ่งลืมเนื้อหานั้นได้ยากขึ้นเท่านั้น

อ้างอิง:
- Roediger III, H. L., & Karpicke, J. D. (2006). Test-enhanced learning.` 
          : "Active Recall forces the brain to retrieve information rather than passively reading it. It strengthens neural connections for long-term memory."} 
        />
        <FAQItem 
          q={lang === "TH" ? "ทำไมถึงต้องมีการจับเวลาสั้นๆ (Timer) 3-5 วินาทีในการท่อง Flash Card?" : "Why use a rapid timer for Flash Cards?"} 
          a={lang === "TH" ? 
`การใช้ Flash Card ทั่วไปก็ถือว่าดีแล้ว แต่ถ้าคุณต้องการยกระดับไปสู่ความจำระดับ "อัตโนมัติ (Automaticity)" การใช้ Timer หรือตัวจับเวลาแบบนับถอยหลังเร็วๆ จะช่วยคุณได้มหาศาล

**ประโยชน์ของการจับเวลา (Speed Drills):**
1. **ป้องกันการลังเล:** หากไม่มีเวลาบีบบังคับ สมองมักจะคิดไปเรื่อยเปื่อย หรือพยายามใบ้คำตอบให้ตัวเอง การมีเวลานับถอยหลังแค่ 3-5 วินาที จะบีบให้สมองต้องทำงานด้วยความเร็วสูงสุด (Speed of Retrieval) ซึ่งจำเป็นมากในห้องสอบจริง
2. **สร้างความจำระดับสัญชาตญาณ:** เมื่อคุณสามารถตอบคำถามหรือแปลศัพท์ได้ภายใน 3 วินาที แปลว่าความรู้นั้นถูกย้ายจากความจำระยะสั้น ไปสู่ระบบจิตใต้สำนึกแล้ว (เหมือนการที่คุณตอบได้ทันทีว่า 2x2 เท่ากับ 4 โดยไม่ต้องคิด)
3. **ลดความน่าเบื่อ:** เสียงติ๊กต็อกและเสียงเตือนเมื่อหมดเวลา (Pop-up sound) จะช่วยสร้างเกมมิฟิเคชัน (Gamification) ทำให้การท่องจำศัพท์หรือสูตรฟิสิกส์ 100 ใบ เป็นเรื่องที่ตื่นเต้นและท้าทาย

**วิธีใช้งานเครื่องมือนี้:** พลิกการ์ด (หรือดูศัพท์ในแอป) หากได้ยินเสียงเตือนหมดเวลาแล้วคุณยังนึกคำตอบไม่ออก ให้ถือว่าการ์ดใบนั้น "ผิด" แล้วหยิบการ์ดใบใหม่ทันที จากนั้นค่อยนำการ์ดที่ผิดกลับมาท่องซ้ำในรอบถัดไป` 
          : "A rapid timer prevents hesitation, forces the brain to retrieve data at maximum speed, and builds automaticity (instant recall)."} 
        />
      </SEOFAQ>
    </div>
  );
}
