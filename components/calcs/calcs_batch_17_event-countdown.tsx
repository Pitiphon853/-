"use client";
import { useState, useEffect, useCallback } from "react";
import { CalendarClock, Play, RotateCcw, PartyPopper, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, totalMs: diff };
}

const presetEvents = [
  { label: "วันปีใหม่", month: 1, day: 1 },
  { label: "วันสงกรานต์", month: 4, day: 13 },
  { label: "วันแม่แห่งชาติ", month: 8, day: 12 },
  { label: "วันพ่อแห่งชาติ", month: 12, day: 5 },
  { label: "คริสต์มาส", month: 12, day: 25 },
  { label: "วันลอยกระทง", month: 11, day: 15 },
];

export default function EventCountdown({ lang }: any) {
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [reached, setReached] = useState(false);

  const startCountdown = useCallback(() => {
    if (!targetDate) return;
    setIsRunning(true);
    setReached(false);
  }, [targetDate]);

  const resetCountdown = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setReached(false);
    setEventName("");
    setTargetDate("");
    setTargetTime("00:00");
  };

  useEffect(() => {
    if (!isRunning || !targetDate) return;
    const target = new Date(`${targetDate}T${targetTime}:00`);
    const tick = () => {
      const tl = getTimeLeft(target);
      setTimeLeft(tl);
      if (tl.totalMs <= 0) {
        setReached(true);
        setIsRunning(false);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isRunning, targetDate, targetTime]);

  const selectPreset = (p: (typeof presetEvents)[0]) => {
    const now = new Date();
    let year = now.getFullYear();
    const d = new Date(year, p.month - 1, p.day);
    if (d.getTime() <= now.getTime()) year++;
    const mm = String(p.month).padStart(2, "0");
    const dd = String(p.day).padStart(2, "0");
    setTargetDate(`${year}-${mm}-${dd}`);
    setEventName(p.label);
    setTargetTime("00:00");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div className="flex items-center gap-3 text-purple-600">
          <CalendarClock className="w-7 h-7" />
          <h2 className="text-xl font-bold">นับถอยหลัง Countdown วันสำคัญ</h2>
        </div>

        {/* Preset buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">เลือกวันสำคัญ</label>
          <div className="flex flex-wrap gap-2">
            {presetEvents.map((p) => (
              <button
                key={p.label}
                onClick={() => selectPreset(p)}
                className="px-3 py-1.5 text-sm rounded-full border border-purple-300 text-purple-700 hover:bg-purple-50 transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อกิจกรรม</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="เช่น งานแต่งงาน"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เป้าหมาย</label>
            <input
              type="date"
              value={targetDate}
              min={today}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เวลาเป้าหมาย</label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={startCountdown}
            disabled={!targetDate || isRunning}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-40 transition"
          >
            <Play className="w-4 h-4" /> เริ่มนับถอยหลัง
          </button>
          <button
            onClick={resetCountdown}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <RotateCcw className="w-4 h-4" /> รีเซ็ต
          </button>
        </div>
      </div>

      {/* Countdown display */}
      {timeLeft && (
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white text-center space-y-4">
          {reached ? (
            <div className="space-y-3">
              <PartyPopper className="w-16 h-16 mx-auto animate-bounce" />
              <p className="text-2xl font-bold">🎉 ถึงเวลาแล้ว!</p>
              {eventName && <p className="text-lg opacity-90">{eventName}</p>}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 opacity-80">
                <Clock className="w-5 h-5" />
                <span className="text-sm">{eventName || "นับถอยหลัง"}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { val: timeLeft.days, label: "วัน" },
                  { val: timeLeft.hours, label: "ชั่วโมง" },
                  { val: timeLeft.minutes, label: "นาที" },
                  { val: timeLeft.seconds, label: "วินาที" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/15 rounded-xl py-4 px-2">
                    <div className="text-4xl sm:text-5xl font-mono font-bold">
                      {String(item.val).padStart(2, "0")}
                    </div>
                    <div className="text-xs mt-1 opacity-80">{item.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* SEO Article */}
      <article className="prose max-w-none bg-white rounded-2xl shadow p-6">
        <h2>นับถอยหลัง Countdown วันสำคัญ – เครื่องมือออนไลน์ฟรี</h2>
        <p>
          การนับถอยหลังไปยังวันสำคัญเป็นกิจกรรมที่ทำให้เกิดความตื่นเต้นและช่วยให้เราเตรียมตัวได้ดียิ่งขึ้น
          ไม่ว่าจะเป็นวันเกิด วันแต่งงาน วันสงกรานต์ วันปีใหม่ หรือวันหยุดพิเศษอื่น ๆ
          เครื่องมือนับถอยหลังออนไลน์ของเราช่วยให้คุณสามารถสร้าง Countdown ได้ง่ายเพียงไม่กี่คลิก
        </p>
        <h3>วิธีใช้เครื่องมือนับถอยหลัง</h3>
        <p>
          คุณสามารถเลือกจากวันสำคัญที่เราเตรียมไว้ให้ เช่น วันปีใหม่ วันสงกรานต์ วันแม่แห่งชาติ
          วันพ่อแห่งชาติ คริสต์มาส หรือวันลอยกระทง หรือจะกำหนดวันที่เป้าหมายเอง
          พร้อมตั้งชื่อกิจกรรมและเวลาที่ต้องการนับถอยหลังได้อย่างอิสระ เมื่อกดปุ่มเริ่มนับถอยหลัง
          ระบบจะแสดงเวลาที่เหลือเป็นวัน ชั่วโมง นาที และวินาที แบบเรียลไทม์
        </p>
        <h3>ทำไมต้องใช้ Countdown Timer?</h3>
        <p>
          การนับถอยหลังช่วยสร้างแรงจูงใจและความรู้สึกตื่นเต้นก่อนถึงวันสำคัญ
          นอกจากนี้ยังช่วยในการวางแผนและบริหารเวลาได้อย่างมีประสิทธิภาพ
          เหมาะสำหรับการนับถอยหลังงานอีเวนต์ขององค์กร การเปิดตัวผลิตภัณฑ์
          หรือแม้แต่การนับถอยหลังก่อนวันหยุดพักร้อน
        </p>
        <h3>ฟีเจอร์เด่น</h3>
        <ul>
          <li>รองรับวันสำคัญที่ตั้งไว้ล่วงหน้า เช่น ปีใหม่ สงกรานต์ วันแม่ วันพ่อ</li>
          <li>กำหนดวันที่และเวลาเป้าหมายได้เอง</li>
          <li>แสดงผลแบบเรียลไทม์ อัปเดตทุกวินาที</li>
          <li>รองรับการตั้งชื่อกิจกรรมเพื่อความสะดวกในการจดจำ</li>
          <li>แสดงแอนิเมชันเมื่อถึงเวลาเป้าหมาย</li>
        </ul>
        <h3>ประโยชน์ของการนับถอยหลัง</h3>
        <p>
          การมี Countdown Timer ช่วยให้เราตระหนักถึงเวลาที่เหลืออยู่ก่อนถึงเหตุการณ์สำคัญ
          ทำให้สามารถจัดลำดับความสำคัญของงานได้ดีขึ้น ไม่ว่าจะเป็นการเตรียมของขวัญ
          การจองตั๋วเดินทาง หรือการวางแผนงานเลี้ยง ล้วนต้องการเวลาในการเตรียมตัว
          เครื่องมือนับถอยหลังของเราจึงเป็นตัวช่วยที่ดีในการบริหารจัดการเวลาก่อนวันสำคัญ
          ใช้งานได้ฟรีไม่มีค่าใช้จ่ายและไม่ต้องสมัครสมาชิก
        </p>
      </article>
    </div>
  );
}
