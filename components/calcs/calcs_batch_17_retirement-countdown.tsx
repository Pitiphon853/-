"use client";
import { useState } from "react";
import { Briefcase, Calculator, CalendarDays, TrendingUp } from "lucide-react";

export default function RetirementCountdown({ lang }: any) {
  const [birthDate, setBirthDate] = useState("");
  const [retireAge, setRetireAge] = useState(60);
  const [result, setResult] = useState<{
    retireDate: Date;
    daysLeft: number;
    monthsLeft: number;
    yearsLeft: number;
    currentAge: number;
    percentDone: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    const bd = new Date(birthDate);
    const now = new Date();

    const retireDate = new Date(bd);
    retireDate.setFullYear(retireDate.getFullYear() + retireAge);

    const diffMs = retireDate.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const monthsLeft = Math.max(0, Math.floor(daysLeft / 30.44));
    const yearsLeft = Math.max(0, Math.floor(daysLeft / 365.25));

    const ageMs = now.getTime() - bd.getTime();
    const currentAge = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));

    // percent of career done (assume started at 22)
    const careerStart = 22;
    const totalCareerYears = retireAge - careerStart;
    const workedYears = Math.max(0, currentAge - careerStart);
    const percentDone = totalCareerYears > 0 ? Math.min(100, (workedYears / totalCareerYears) * 100) : 0;

    setResult({ retireDate, daysLeft, monthsLeft, yearsLeft, currentAge, percentDone });
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div className="flex items-center gap-3 text-emerald-600">
          <Briefcase className="w-7 h-7" />
          <h2 className="text-xl font-bold">คำนวณวันเกษียณ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อายุเกษียณ (ปี)</label>
            <select
              value={retireAge}
              onChange={(e) => setRetireAge(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              {[50, 55, 58, 60, 63, 65, 70].map((a) => (
                <option key={a} value={a}>
                  {a} ปี
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          disabled={!birthDate}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-40 transition"
        >
          <Calculator className="w-4 h-4" /> คำนวณ
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h3 className="font-bold text-lg text-gray-800">ผลการคำนวณ</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "อายุปัจจุบัน", value: `${result.currentAge} ปี`, icon: <CalendarDays className="w-5 h-5" /> },
              { label: "เหลืออีก (ปี)", value: `${result.yearsLeft} ปี`, icon: <TrendingUp className="w-5 h-5" /> },
              { label: "เหลืออีก (เดือน)", value: `${result.monthsLeft}`, icon: <CalendarDays className="w-5 h-5" /> },
              { label: "เหลืออีก (วัน)", value: result.daysLeft.toLocaleString(), icon: <CalendarDays className="w-5 h-5" /> },
            ].map((item) => (
              <div key={item.label} className="bg-emerald-50 rounded-xl p-4 text-center">
                <div className="text-emerald-600 flex justify-center mb-1">{item.icon}</div>
                <div className="text-2xl font-bold text-emerald-700">{item.value}</div>
                <div className="text-xs text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>ความคืบหน้าอาชีพ (เริ่มอายุ 22)</span>
              <span>{result.percentDone.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, result.percentDone)}%` }}
              />
            </div>
          </div>

          <div className="text-center text-gray-600">
            <span className="text-sm">วันเกษียณของคุณ: </span>
            <span className="font-semibold text-emerald-700">{formatDate(result.retireDate)}</span>
          </div>

          {result.daysLeft === 0 && (
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <p className="text-lg font-bold text-yellow-700">🎉 ยินดีด้วย! คุณเกษียณแล้ว!</p>
            </div>
          )}
        </div>
      )}

      {/* SEO Article */}
      <article className="prose max-w-none bg-white rounded-2xl shadow p-6">
        <h2>คำนวณวันเกษียณ – วางแผนอนาคตการเงินของคุณ</h2>
        <p>
          การวางแผนเกษียณอายุเป็นสิ่งที่ทุกคนควรให้ความสำคัญตั้งแต่เนิ่น ๆ
          เครื่องมือคำนวณวันเกษียณออนไลน์ของเราช่วยให้คุณทราบว่าเหลือเวลาอีกกี่วัน กี่เดือน กี่ปี
          ก่อนถึงวันเกษียณอายุ โดยคุณสามารถเลือกอายุเกษียณได้ตามต้องการ
          ไม่ว่าจะเป็น 55 ปี 60 ปี หรือ 65 ปี
        </p>
        <h3>ทำไมต้องวางแผนเกษียณ?</h3>
        <p>
          ในประเทศไทย อายุเกษียณของข้าราชการคือ 60 ปี
          ขณะที่ภาคเอกชนอาจมีอายุเกษียณแตกต่างกันไปตามนโยบายองค์กร
          การรู้ว่าเหลือเวลาอีกเท่าไหร่ก่อนเกษียณจะช่วยให้คุณวางแผนทางการเงินได้ดียิ่งขึ้น
          ทั้งการออม การลงทุน และการเตรียมพร้อมสำหรับชีวิตหลังเกษียณ
        </p>
        <h3>วิธีใช้เครื่องมือคำนวณวันเกษียณ</h3>
        <p>
          เพียงกรอกวันเกิดของคุณและเลือกอายุเกษียณที่ต้องการ ระบบจะคำนวณให้ทันที
          โดยแสดงผลเป็นอายุปัจจุบัน จำนวนวัน เดือน และปีที่เหลือ
          พร้อมแสดงกราฟความคืบหน้าของอาชีพการงาน
          ช่วยให้คุณเห็นภาพรวมของชีวิตการทำงานได้ชัดเจนยิ่งขึ้น
        </p>
        <h3>เคล็ดลับการวางแผนเกษียณ</h3>
        <ul>
          <li>เริ่มออมเงินเพื่อเกษียณตั้งแต่อายุน้อย ยิ่งเริ่มเร็วยิ่งดี</li>
          <li>ลงทุนในกองทุนสำรองเลี้ยงชีพ (PVD) หรือกองทุน RMF เพื่อสิทธิประโยชน์ทางภาษี</li>
          <li>วางแผนค่าใช้จ่ายหลังเกษียณ รวมถึงค่ารักษาพยาบาลและค่าครองชีพ</li>
          <li>ตรวจสอบสิทธิประกันสังคมและเงินบำนาญที่จะได้รับ</li>
          <li>พิจารณาการทำประกันชีวิตหรือประกันสุขภาพเพิ่มเติม</li>
        </ul>
        <p>
          เครื่องมือคำนวณวันเกษียณนี้ใช้งานได้ฟรี ช่วยให้คุณตระหนักถึงเวลาที่เหลืออยู่
          และเป็นจุดเริ่มต้นที่ดีในการวางแผนชีวิตหลังเกษียณอย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}
