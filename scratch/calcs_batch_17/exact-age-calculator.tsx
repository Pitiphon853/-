"use client";
import React, { useState } from "react";
import { Calendar, Clock, Timer, RotateCcw, Calculator } from "lucide-react";

export default function ExactAgeCalculator({ lang }: { lang: "TH" | "EN" }) {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const t = {
    title: lang === "TH" ? "คำนวณอายุเป็นวัน/ชั่วโมง/นาที/วินาที" : "Exact Age Calculator",
    subtitle: lang === "TH" ? "ระบุวันเกิดเพื่อดูอายุอย่างละเอียด" : "Enter your birthdate for detailed age",
    birthDate: lang === "TH" ? "วันเกิด" : "Birth Date",
    calculate: lang === "TH" ? "คำนวณ" : "Calculate",
    reset: lang === "TH" ? "รีเซ็ต" : "Reset",
    years: lang === "TH" ? "ปี" : "Years",
    months: lang === "TH" ? "เดือน" : "Months",
    days: lang === "TH" ? "วัน" : "Days",
    totalDays: lang === "TH" ? "จำนวนวันทั้งหมด" : "Total Days",
    totalHours: lang === "TH" ? "จำนวนชั่วโมงทั้งหมด" : "Total Hours",
    totalMinutes: lang === "TH" ? "จำนวนนาทีทั้งหมด" : "Total Minutes",
    totalSeconds: lang === "TH" ? "จำนวนวินาทีทั้งหมด" : "Total Seconds",
    nextBirthday: lang === "TH" ? "วันเกิดถัดไปอีก" : "Next birthday in",
    dayWord: lang === "TH" ? "วัน" : "days",
  };

  const calculate = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth > now) return;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    // Next birthday
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) {
      nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, totalHours, totalMinutes, totalSeconds, daysToNextBirthday });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500 text-white p-3 rounded-xl"><Calendar size={24} /></div>
          <div>
            <h2 className="text-xl font-bold text-indigo-900">{t.title}</h2>
            <p className="text-indigo-600 text-sm">{t.subtitle}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-indigo-900 mb-1 flex items-center gap-1">
            <Calendar size={14} className="text-indigo-500" /> {t.birthDate}
          </label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
            className="w-full border border-indigo-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white" />
        </div>

        <div className="flex gap-3">
          <button onClick={calculate}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            <Calculator size={18} /> {t.calculate}
          </button>
          <button onClick={() => { setBirthDate(""); setResult(null); }}
            className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <RotateCcw size={18} />
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-xl p-4 text-center border border-indigo-100">
              <p className="text-4xl font-bold text-indigo-700">{result.years} <span className="text-lg">{t.years}</span> {result.months} <span className="text-lg">{t.months}</span> {result.days} <span className="text-lg">{t.days}</span></p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3 text-center border border-purple-100">
                <Clock size={18} className="mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-gray-500">{t.totalDays}</p>
                <p className="text-lg font-bold text-purple-700">{result.totalDays.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-purple-100">
                <Clock size={18} className="mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-gray-500">{t.totalHours}</p>
                <p className="text-lg font-bold text-purple-700">{result.totalHours.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-purple-100">
                <Timer size={18} className="mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-gray-500">{t.totalMinutes}</p>
                <p className="text-lg font-bold text-purple-700">{result.totalMinutes.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-purple-100">
                <Timer size={18} className="mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-gray-500">{t.totalSeconds}</p>
                <p className="text-lg font-bold text-purple-700">{result.totalSeconds.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 text-center border border-pink-100">
              <p className="text-sm text-pink-600">{t.nextBirthday}</p>
              <p className="text-2xl font-bold text-pink-700">{result.daysToNextBirthday} {t.dayWord}</p>
            </div>
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">คำนวณอายุอย่างละเอียด — รู้อายุตัวเองเป็นวินาที</h2>
        <p>เคยสงสัยไหมว่าตั้งแต่เกิดมาจนถึงวันนี้ คุณมีชีวิตอยู่มาแล้วกี่วัน กี่ชั่วโมง หรือแม้แต่กี่วินาที? เครื่องมือ <strong>คำนวณอายุเป็นวัน/ชั่วโมง/นาที/วินาที</strong> นี้จะช่วยให้คุณเห็นตัวเลขอายุในมุมมองที่แตกต่าง ซึ่งนอกจากจะเป็นข้อมูลที่น่าทึ่งแล้ว ยังสามารถนำไปใช้ประโยชน์ได้ในหลายด้าน</p>

        <h3 className="text-xl font-semibold text-gray-800">ทำไมต้องรู้อายุอย่างละเอียด?</h3>
        <p>การรู้อายุในหน่วยที่เล็กลง เช่น จำนวนวันหรือชั่วโมง ช่วยให้เราตระหนักถึงคุณค่าของเวลาที่ผ่านไป นักจิตวิทยาจาก Harvard Business School พบว่าคนที่ตระหนักรู้ถึงระยะเวลาชีวิตมีแนวโน้มที่จะจัดการเวลาได้ดีขึ้น และมีความสุขกับชีวิตมากกว่า ข้อมูลนี้ยังเป็นประโยชน์สำหรับ:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>การกรอกเอกสารทางกฎหมายที่ต้องระบุอายุเป็นวัน</li>
          <li>การคำนวณอายุทารกในหน่วยสัปดาห์/วันสำหรับแพทย์เด็ก</li>
          <li>การวางแผนชีวิตและตั้งเป้าหมายระยะยาว</li>
          <li>การฉลองวันครบรอบ เช่น ครบ 10,000 วัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">วิธีการคำนวณ</h3>
        <p>เครื่องมือนี้คำนวณโดยนำ <strong>วันเกิด</strong> ของคุณมาหาผลต่างกับวันที่ปัจจุบัน (Date Difference) ซึ่งจะได้ค่าเป็น milliseconds ก่อน แล้วจึงแปลงเป็นหน่วยต่าง ๆ:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>จำนวนวัน</strong> = ผลต่าง (ms) ÷ 86,400,000</li>
          <li><strong>จำนวนชั่วโมง</strong> = ผลต่าง (ms) ÷ 3,600,000</li>
          <li><strong>จำนวนนาที</strong> = ผลต่าง (ms) ÷ 60,000</li>
          <li><strong>จำนวนวินาที</strong> = ผลต่าง (ms) ÷ 1,000</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">ข้อมูลน่าสนใจเกี่ยวกับอายุ</h3>
        <p>ตามข้อมูลจาก World Health Organization (WHO) อายุขัยเฉลี่ยของคนไทยอยู่ที่ประมาณ 77 ปี ซึ่งเท่ากับ 28,105 วัน หรือ 674,520 ชั่วโมง หรือ 40,471,200 นาที หรือ 2,428,272,000 วินาที ดังนั้นทุก ๆ วินาทีจึงมีค่ายิ่งนัก</p>
        <p>นอกจากนี้ การรู้ว่า <strong>วันเกิดถัดไป</strong> อีกกี่วัน ยังช่วยให้คุณวางแผนจัดงานฉลองล่วงหน้าได้ รวมถึงเตรียมตัวสำหรับเหตุการณ์พิเศษต่าง ๆ ในชีวิต</p>

        <h3 className="text-xl font-semibold text-gray-800">การประยุกต์ใช้ในชีวิตจริง</h3>
        <p>ในวงการแพทย์ การนับอายุเป็นวันมีความสำคัญอย่างยิ่งสำหรับ <strong>ทารกแรกเกิดและเด็กเล็ก</strong> เพราะพัฒนาการในแต่ละวันมีความหมาย นอกจากนี้ในด้านกฎหมาย การนับอายุเป็นวันยังเกี่ยวข้องกับ อายุความ ระยะเวลาทดลองงาน และสิทธิประโยชน์ต่าง ๆ ตามกฎหมายแรงงานอีกด้วย</p>

        <h3 className="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>World Health Organization. (2023). World Health Statistics. <em>who.int</em></li>
          <li>Harvard Business Review. (2022). The Psychology of Time Perception. <em>hbr.org</em></li>
          <li>สำนักงานสถิติแห่งชาติ. (2566). สถิติประชากรไทย. <em>nso.go.th</em></li>
        </ul>
      </article>
    </div>
  );
}
