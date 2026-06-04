"use client";
import { useState } from "react";
import { Moon, Calculator, CalendarDays, Info } from "lucide-react";

const LUNAR_CYCLE = 29.53058770576;
const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime();

function getLunarAge(date: Date): number {
  const diff = date.getTime() - KNOWN_NEW_MOON;
  const days = diff / (1000 * 60 * 60 * 24);
  return ((days % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
}

function getLunarPhaseName(age: number): { name: string; thaiName: string; emoji: string; desc: string } {
  if (age < 1.85) return { name: "New Moon", thaiName: "วันเดือนดับ (แรม 15 ค่ำ)", emoji: "🌑", desc: "ดวงจันทร์อยู่ระหว่างโลกกับดวงอาทิตย์" };
  if (age < 7.38) return { name: "Waxing Crescent", thaiName: "ข้างขึ้น (จันทร์เสี้ยว)", emoji: "🌒", desc: "ดวงจันทร์เริ่มสว่างขึ้นทางด้านขวา" };
  if (age < 9.23) return { name: "First Quarter", thaiName: "ข้างขึ้น 8 ค่ำ", emoji: "🌓", desc: "ดวงจันทร์สว่างครึ่งซีก" };
  if (age < 13.77) return { name: "Waxing Gibbous", thaiName: "ข้างขึ้น (ค่อนดวง)", emoji: "🌔", desc: "ดวงจันทร์สว่างเกือบเต็มดวง" };
  if (age < 16.61) return { name: "Full Moon", thaiName: "วันเพ็ญ (ขึ้น 15 ค่ำ)", emoji: "🌕", desc: "ดวงจันทร์เต็มดวง สว่างที่สุด" };
  if (age < 21.15) return { name: "Waning Gibbous", thaiName: "ข้างแรม (ค่อนดวง)", emoji: "🌖", desc: "ดวงจันทร์เริ่มมืดลงจากด้านขวา" };
  if (age < 23.0) return { name: "Last Quarter", thaiName: "แรม 8 ค่ำ", emoji: "🌗", desc: "ดวงจันทร์มืดครึ่งซีก" };
  if (age < 27.68) return { name: "Waning Crescent", thaiName: "ข้างแรม (จันทร์เสี้ยว)", emoji: "🌘", desc: "ดวงจันทร์เหลือแสงเพียงเล็กน้อย" };
  return { name: "New Moon", thaiName: "วันเดือนดับ (แรม 15 ค่ำ)", emoji: "🌑", desc: "ดวงจันทร์อยู่ระหว่างโลกกับดวงอาทิตย์" };
}

function getThaiLunarDay(age: number): string {
  const day = Math.floor(age) + 1;
  if (day <= 15) return `ขึ้น ${day} ค่ำ`;
  return `แรม ${day - 15} ค่ำ`;
}

function getIllumination(age: number): number {
  return Math.round((1 - Math.cos((age / LUNAR_CYCLE) * 2 * Math.PI)) / 2 * 100);
}

function getUpcomingPhases(fromDate: Date) {
  const phases: { date: Date; name: string; emoji: string }[] = [];
  const startAge = getLunarAge(fromDate);

  const targets = [
    { age: 0, name: "เดือนดับ", emoji: "🌑" },
    { age: LUNAR_CYCLE / 4, name: "ขึ้น 8 ค่ำ", emoji: "🌓" },
    { age: LUNAR_CYCLE / 2, name: "วันเพ็ญ", emoji: "🌕" },
    { age: (3 * LUNAR_CYCLE) / 4, name: "แรม 8 ค่ำ", emoji: "🌗" },
  ];

  for (const t of targets) {
    let daysUntil = t.age - startAge;
    if (daysUntil < 0) daysUntil += LUNAR_CYCLE;
    const d = new Date(fromDate.getTime() + daysUntil * 86400000);
    phases.push({ date: d, name: t.name, emoji: t.emoji });
  }

  phases.sort((a, b) => a.date.getTime() - b.date.getTime());
  return phases;
}

export default function ThaiLunarPhase({ lang }: any) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{
    age: number;
    phase: ReturnType<typeof getLunarPhaseName>;
    thaiDay: string;
    illumination: number;
    upcoming: ReturnType<typeof getUpcomingPhases>;
  } | null>(null);

  const calculate = () => {
    const date = new Date(selectedDate + "T12:00:00");
    const age = getLunarAge(date);
    const phase = getLunarPhaseName(age);
    const thaiDay = getThaiLunarDay(age);
    const illumination = getIllumination(age);
    const upcoming = getUpcomingPhases(date);
    setResult({ age, phase, thaiDay, illumination, upcoming });
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div className="flex items-center gap-3 text-indigo-600">
          <Moon className="w-7 h-7" />
          <h2 className="text-xl font-bold">ข้างขึ้นข้างแรมไทย</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">เลือกวันที่</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Calculator className="w-4 h-4" /> ดูข้างขึ้นข้างแรม
        </button>
      </div>

      {result && (
        <>
          <div className="bg-gradient-to-br from-indigo-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white text-center space-y-5">
            <div className="text-8xl">{result.phase.emoji}</div>
            <div>
              <div className="text-2xl font-bold">{result.phase.thaiName}</div>
              <div className="text-sm opacity-70 mt-1">{result.phase.name}</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs opacity-70">วันจันทรคติ</div>
                <div className="text-lg font-bold mt-1">{result.thaiDay}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs opacity-70">ความสว่าง</div>
                <div className="text-lg font-bold mt-1">{result.illumination}%</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs opacity-70">อายุดวงจันทร์</div>
                <div className="text-lg font-bold mt-1">{result.age.toFixed(1)} วัน</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-sm">
              <Info className="w-4 h-4 inline mr-1" />
              {result.phase.desc}
            </div>

            {/* Illumination bar */}
            <div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-yellow-300 h-3 rounded-full transition-all"
                  style={{ width: `${result.illumination}%` }}
                />
              </div>
              <div className="text-xs opacity-60 mt-1">ความสว่างพื้นผิว {result.illumination}%</div>
            </div>
          </div>

          {/* Upcoming phases */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-indigo-500" />
              เฟสดวงจันทร์ที่จะมาถึง
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {result.upcoming.map((p, i) => (
                <div key={i} className="bg-indigo-50 rounded-xl p-3 text-center">
                  <div className="text-3xl">{p.emoji}</div>
                  <div className="text-sm font-medium mt-1">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(p.date)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* SEO Article */}
      <article className="prose max-w-none bg-white rounded-2xl shadow p-6">
        <h2>ข้างขึ้นข้างแรมไทย – ดูเฟสดวงจันทร์ออนไลน์</h2>
        <p>
          ข้างขึ้นข้างแรมเป็นระบบปฏิทินจันทรคติที่ใช้กันมาแต่โบราณในสังคมไทย
          มีความสำคัญทั้งในด้านศาสนา วัฒนธรรม และการเกษตร
          เครื่องมือของเราช่วยให้คุณตรวจสอบเฟสดวงจันทร์ได้ง่าย ๆ เพียงเลือกวันที่ที่ต้องการ
        </p>
        <h3>ระบบข้างขึ้นข้างแรมคืออะไร?</h3>
        <p>
          ข้างขึ้นคือช่วงที่ดวงจันทร์สว่างขึ้นเรื่อย ๆ ตั้งแต่วันแรม 15 ค่ำ (เดือนดับ)
          ไปจนถึงวันขึ้น 15 ค่ำ (วันเพ็ญ หรือดวงจันทร์เต็มดวง)
          ส่วนข้างแรมคือช่วงที่ดวงจันทร์มืดลงเรื่อย ๆ จากวันเพ็ญไปจนถึงวันเดือนดับ
          รอบของดวงจันทร์หนึ่งรอบใช้เวลาประมาณ 29.5 วัน
        </p>
        <h3>ความสำคัญในวัฒนธรรมไทย</h3>
        <ul>
          <li>วันพระ – ตรงกับขึ้น 8 ค่ำ ขึ้น 15 ค่ำ แรม 8 ค่ำ และแรม 15 ค่ำ</li>
          <li>วันมาฆบูชา – ขึ้น 15 ค่ำ เดือน 3</li>
          <li>วันวิสาขบูชา – ขึ้น 15 ค่ำ เดือน 6</li>
          <li>วันอาสาฬหบูชา – ขึ้น 15 ค่ำ เดือน 8</li>
          <li>วันลอยกระทง – ขึ้น 15 ค่ำ เดือน 12</li>
          <li>การเกษตร – เชื่อว่าดวงจันทร์มีผลต่อการเจริญเติบโตของพืช</li>
        </ul>
        <h3>วิธีการคำนวณ</h3>
        <p>
          เครื่องมือนี้ใช้การคำนวณอายุดวงจันทร์จากวันที่เดือนดับที่ทราบ
          แล้วหาส่วนเหลือเทียบกับรอบจันทรคติ 29.53 วัน เพื่อระบุเฟสปัจจุบันของดวงจันทร์
          พร้อมแสดงความสว่างของพื้นผิว วันจันทรคติ และเฟสที่กำลังจะมาถึง
          ช่วยให้คุณวางแผนกิจกรรมที่เกี่ยวข้องกับดวงจันทร์ได้อย่างสะดวก ใช้งานฟรีไม่มีค่าใช้จ่าย
        </p>
      </article>
    </div>
  );
}
