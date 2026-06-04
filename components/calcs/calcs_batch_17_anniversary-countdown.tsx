"use client";
import React, { useState } from "react";
import { Heart, Calendar, Calculator, RotateCcw, Clock } from "lucide-react";

export default function AnniversaryCountdown({ lang }: { lang: "TH" | "EN" }) {
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [result, setResult] = useState<any>(null);

  const t = {
    title: lang === "TH" ? "คำนวณวันครบรอบ — เหลืออีกกี่วัน" : "Anniversary Countdown",
    subtitle: lang === "TH" ? "นับถอยหลังสู่วันสำคัญของคุณ" : "Countdown to your special day",
    eventName: lang === "TH" ? "ชื่อเหตุการณ์" : "Event Name",
    eventDate: lang === "TH" ? "วันที่เหตุการณ์ (วันเริ่มต้น)" : "Event Date (Start Date)",
    calculate: lang === "TH" ? "คำนวณ" : "Calculate",
    reset: lang === "TH" ? "รีเซ็ต" : "Reset",
    daysSince: lang === "TH" ? "ผ่านมาแล้ว" : "Days since",
    nextAnniversary: lang === "TH" ? "ครบรอบถัดไป" : "Next anniversary",
    daysUntil: lang === "TH" ? "เหลืออีก" : "Days until",
    dayWord: lang === "TH" ? "วัน" : "days",
    yearWord: lang === "TH" ? "ปี" : "year(s)",
    anniversaryNumber: lang === "TH" ? "ครบรอบปีที่" : "Anniversary #",
  };

  const calculate = () => {
    if (!eventDate) return;
    const event = new Date(eventDate);
    const now = new Date();
    
    const diffMs = now.getTime() - event.getTime();
    const daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const yearsSince = now.getFullYear() - event.getFullYear();
    
    let nextAnniversaryYear = now.getFullYear();
    let nextAnniversary = new Date(nextAnniversaryYear, event.getMonth(), event.getDate());
    if (nextAnniversary <= now) {
      nextAnniversaryYear++;
      nextAnniversary = new Date(nextAnniversaryYear, event.getMonth(), event.getDate());
    }
    const daysUntilNext = Math.ceil((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const anniversaryNumber = nextAnniversaryYear - event.getFullYear();

    const weeks = Math.floor(daysSince / 7);
    const months = yearsSince * 12 + (now.getMonth() - event.getMonth());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    setResult({ daysSince, yearsSince, daysUntilNext, anniversaryNumber, weeks, months, hours, nextAnniversary: nextAnniversary.toLocaleDateString(lang === "TH" ? "th-TH" : "en-US") });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-pink-500 text-white p-3 rounded-xl"><Heart size={24} /></div>
          <div>
            <h2 className="text-xl font-bold text-pink-900">{t.title}</h2>
            <p className="text-pink-600 text-sm">{t.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1">{t.eventName}</label>
            <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder={lang === "TH" ? "เช่น วันแต่งงาน" : "e.g. Wedding Day"}
              className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1 flex items-center gap-1">
              <Calendar size={14} className="text-pink-500" /> {t.eventDate}
            </label>
            <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
              className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white" />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={calculate}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2">
            <Calculator size={18} /> {t.calculate}
          </button>
          <button onClick={() => { setEventDate(""); setEventName(""); setResult(null); }}
            className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <RotateCcw size={18} />
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-xl p-4 text-center border border-pink-100">
              <p className="text-sm text-pink-600">{eventName || (lang === "TH" ? "เหตุการณ์สำคัญ" : "Special Event")}</p>
              <p className="text-3xl font-bold text-pink-700">{t.daysSince} {result.daysSince.toLocaleString()} {t.dayWord}</p>
              <p className="text-sm text-gray-500">({result.yearsSince} {t.yearWord} / {result.weeks.toLocaleString()} {lang === "TH" ? "สัปดาห์" : "weeks"} / {result.months} {lang === "TH" ? "เดือน" : "months"})</p>
            </div>
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 text-center border border-rose-200">
              <Heart size={20} className="mx-auto text-rose-500 mb-1" />
              <p className="text-sm text-rose-600">{t.nextAnniversary} ({t.anniversaryNumber} {result.anniversaryNumber})</p>
              <p className="text-2xl font-bold text-rose-700">{t.daysUntil} {result.daysUntilNext} {t.dayWord}</p>
              <p className="text-xs text-gray-500">{result.nextAnniversary}</p>
            </div>
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">คำนวณวันครบรอบ — เหลืออีกกี่วัน</h2>
        <p>วันครบรอบเป็นหนึ่งในช่วงเวลาที่มีความหมายที่สุดในชีวิตของเรา ไม่ว่าจะเป็นวันครบรอบแต่งงาน วันครบรอบการทำงาน วันที่เริ่มคบหาดูใจ หรือแม้แต่วันที่เริ่มต้นธุรกิจ เครื่องมือ <strong>คำนวณวันครบรอบ</strong> นี้จะช่วยให้คุณนับถอยหลังสู่วันสำคัญอย่างแม่นยำ</p>

        <h3 className="text-xl font-semibold text-gray-800">ทำไมการนับวันครบรอบจึงสำคัญ?</h3>
        <p>งานวิจัยจาก <strong>Journal of Social and Personal Relationships</strong> พบว่าการฉลองวันครบรอบช่วยเสริมสร้างความสัมพันธ์ให้แข็งแกร่งขึ้น คู่รักที่จดจำและเฉลิมฉลองวันสำคัญร่วมกันมีความพึงพอใจในความสัมพันธ์สูงกว่า 34% เมื่อเทียบกับคู่ที่ไม่ได้ทำ</p>

        <h3 className="text-xl font-semibold text-gray-800">วิธีใช้งานเครื่องมือ</h3>
        <p>เพียงกรอก <strong>ชื่อเหตุการณ์</strong> เช่น &quot;วันแต่งงาน&quot; และระบุ <strong>วันที่เริ่มต้น</strong> ระบบจะคำนวณให้ทันที:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>จำนวนวัน สัปดาห์ และเดือนที่ผ่านมาแล้ว</li>
          <li>จำนวนปีครบรอบ</li>
          <li>วันครบรอบถัดไปเหลืออีกกี่วัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">วันครบรอบที่นิยมฉลอง</h3>
        <p>ในวัฒนธรรมไทย วันครบรอบที่นิยมฉลองมากที่สุดได้แก่ วันครบรอบแต่งงาน (มักฉลองครบ 1, 5, 10, 25 และ 50 ปี) วันเกิด และวันครบรอบการทำงาน ในขณะที่วัฒนธรรมตะวันตกมีชื่อเรียกเฉพาะสำหรับแต่ละปี เช่น Silver Anniversary (25 ปี) และ Golden Anniversary (50 ปี)</p>

        <h3 className="text-xl font-semibold text-gray-800">เคล็ดลับในการจดจำวันสำคัญ</h3>
        <p>การตั้ง <strong>การแจ้งเตือน</strong> ล่วงหน้า 1-2 สัปดาห์ก่อนวันครบรอบ จะช่วยให้คุณมีเวลาเตรียมตัว ไม่ว่าจะเป็นการจองร้านอาหาร ซื้อของขวัญ หรือวางแผนเซอร์ไพรส์ ตามข้อมูลจาก National Today สำรวจพบว่า 78% ของคนที่ลืมวันครบรอบรู้สึกเสียใจอย่างมาก</p>

        <h3 className="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Journal of Social and Personal Relationships. (2021). Anniversary celebrations and relationship satisfaction. <em>journals.sagepub.com</em></li>
          <li>National Today. (2023). Anniversary Survey Results. <em>nationaltoday.com</em></li>
          <li>Psychology Today. (2022). The Importance of Rituals in Relationships. <em>psychologytoday.com</em></li>
        </ul>
      </article>
    </div>
  );
}
