"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, CalendarDays, CheckSquare, Square, Calculator, CalendarCheck } from "lucide-react";

export default function WorkingDaysCalculator({ lang }: { lang?: string }) {
  const isEn = lang === "en";

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const [workDays, setWorkDays] = useState<boolean[]>([
    false, true, true, true, true, true, false
  ]);

  const [result, setResult] = useState<{ totalDays: number; workingDays: number; offDays: number } | null>(null);

  const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const WEEKDAYS_TH = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
  const weekdays = isEn ? WEEKDAYS_EN : WEEKDAYS_TH;

  useEffect(() => {
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000;
    const localStart = new Date(today.getTime() - tzOffset);
    localStart.setDate(1); // First day of current month
    setStartDate(localStart.toISOString().split("T")[0]);

    const localEnd = new Date(localStart);
    localEnd.setMonth(localEnd.getMonth() + 1);
    localEnd.setDate(0); // Last day of current month
    setEndDate(localEnd.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
    if (start > end) {
      setResult({ totalDays: 0, workingDays: 0, offDays: 0 });
      return;
    }

    let total = 0;
    let work = 0;
    let current = new Date(start);

    while (current <= end) {
      total++;
      const dayOfWeek = current.getDay();
      if (workDays[dayOfWeek]) {
        work++;
      }
      current.setDate(current.getDate() + 1);
    }

    setResult({
      totalDays: total,
      workingDays: work,
      offDays: total - work
    });

  }, [startDate, endDate, workDays]);

  const toggleWorkDay = (index: number) => {
    const newWorkDays = [...workDays];
    newWorkDays[index] = !newWorkDays[index];
    setWorkDays(newWorkDays);
  };

  const setPreset = (preset: "thisMonth" | "nextMonth" | "thisYear") => {
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000;
    
    if (preset === "thisMonth") {
      const start = new Date(today.getTime() - tzOffset);
      start.setDate(1);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    } else if (preset === "nextMonth") {
      const start = new Date(today.getTime() - tzOffset);
      start.setMonth(start.getMonth() + 1);
      start.setDate(1);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    } else if (preset === "thisYear") {
      const start = new Date(today.getTime() - tzOffset);
      start.setMonth(0);
      start.setDate(1);
      const end = new Date(start);
      end.setFullYear(end.getFullYear() + 1);
      end.setMonth(0);
      end.setDate(0);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          {isEn ? "Working Days Calculator" : "คำนวณวันทำงาน"}
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setPreset("thisMonth")} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
            {isEn ? "This Month" : "เดือนนี้"}
          </button>
          <button onClick={() => setPreset("nextMonth")} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
            {isEn ? "Next Month" : "เดือนหน้า"}
          </button>
          <button onClick={() => setPreset("thisYear")} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
            {isEn ? "This Year" : "ปีนี้"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "Start Date" : "วันที่เริ่มต้น"}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isEn ? "End Date" : "วันที่สิ้นสุด"}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            {isEn ? "Select Working Days" : "เลือกวันทำงานตามปกติ"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {weekdays.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleWorkDay(index)}
                className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                  workDays[index] 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {workDays[index] ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
                <span className="text-sm font-medium">{day}</span>
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CalendarCheck className="w-32 h-32" />
            </div>
            
            <h3 className="text-lg font-medium text-indigo-100 mb-6 relative z-10">
              {isEn ? "Calculation Results" : "ผลการคำนวณ"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-indigo-200 text-sm mb-1">{isEn ? "Total Working Days" : "จำนวนวันทำงาน"}</div>
                <div className="text-4xl font-bold">{result.workingDays} <span className="text-xl font-normal text-indigo-200">{isEn ? "days" : "วัน"}</span></div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-indigo-200 text-sm mb-1">{isEn ? "Total Off Days" : "จำนวนวันหยุด"}</div>
                <div className="text-4xl font-bold">{result.offDays} <span className="text-xl font-normal text-indigo-200">{isEn ? "days" : "วัน"}</span></div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-indigo-200 text-sm mb-1">{isEn ? "Total Days in Period" : "รวมจำนวนวันทั้งหมด"}</div>
                <div className="text-4xl font-bold">{result.totalDays} <span className="text-xl font-normal text-indigo-200">{isEn ? "days" : "วัน"}</span></div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-indigo-200 relative z-10">
              {isEn ? 
                "* Public holidays are not automatically deducted. Please subtract your company's official public holidays manually." : 
                "* ระบบนี้ยังไม่ได้หักลบวันหยุดนักขัตฤกษ์ กรุณานำจำนวนวันทำงานไปหักลบกับวันหยุดตามประเพณีของบริษัทท่านเพิ่มเติม"}
            </div>
          </div>
        )}
      </div>

      <article className="prose prose-slate max-w-none p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h2>{isEn ? "Why Calculate Working Days?" : "ทำไมถึงต้องคำนวณจำนวนวันทำงานในแต่ละเดือน?"}</h2>
        <p>
          {isEn ? 
            "For HR professionals, project managers, and employees, knowing the exact number of working days in a given period is crucial. It affects payroll processing, project deadlines, and performance evaluations. A working days calculator simplifies this process by accurately counting the days you are expected to work, minus the weekends." : 
            "สำหรับฝ่ายทรัพยากรบุคคล (HR) ผู้จัดการโครงการ หรือแม้แต่พนักงานทั่วไป การทราบจำนวนวันทำงานที่แน่นอนในแต่ละเดือนถือเป็นเรื่องที่มีความสำคัญอย่างยิ่ง เพราะมันส่งผลโดยตรงต่อการคิดเงินเดือน (โดยเฉพาะพนักงานรายวัน) การกำหนดกรอบเวลาในการส่งมอบงาน (Project Deadline) และการประเมินผลการปฏิบัติงาน เครื่องมือคำนวณวันทำงานจะช่วยลดความยุ่งยากในการนับวันจากปฏิทินด้วยตัวเอง ทำให้ได้ตัวเลขที่แม่นยำและรวดเร็ว"}
        </p>
        <h3>{isEn ? "Key Uses of Working Day Calculations" : "ประโยชน์หลักของการคำนวณวันทำงาน"}</h3>
        <ul>
          <li>
            <strong>{isEn ? "Payroll & Salary Calculations" : "การคำนวณเงินเดือนและค่าจ้าง"}</strong>: 
            {isEn ? " Especially for daily wage earners or freelance contractors who bill based on days worked. Knowing the exact working days ensures precise payments." : " โดยเฉพาะอย่างยิ่งสำหรับพนักงานรายวัน ฟรีแลนซ์ หรือผู้รับเหมาที่คิดค่าบริการเป็นรายวัน การรู้จำนวนวันทำงานที่ถูกต้องจะช่วยให้การจ่ายเงินมีความแม่นยำและเป็นธรรม"}
          </li>
          <li>
            <strong>{isEn ? "Project Planning" : "การวางแผนโครงการ"}</strong>: 
            {isEn ? " When estimating how long a task will take, estimating in 'working days' instead of 'calendar days' provides a more realistic timeline that accounts for weekends." : " เมื่อต้องประเมินระยะเวลาในการทำโปรเจกต์ การใช้ 'วันทำงาน' แทน 'วันตามปฏิทิน' จะช่วยให้ได้ไทม์ไลน์ที่สมจริงมากขึ้น เพราะได้หักวันหยุดสุดสัปดาห์ออกไปแล้ว"}
          </li>
          <li>
            <strong>{isEn ? "Leave Management" : "การจัดการวันลาพักร้อน"}</strong>: 
            {isEn ? " Calculating how many days of leave an employee took effectively relies on knowing standard working patterns." : " การจัดการและติดตามสิทธิ์วันลาพักร้อนของพนักงานจะทำได้ง่ายขึ้น เมื่อเรามีฐานข้อมูลจำนวนวันทำงานที่เป็นมาตรฐานขององค์กร"}
          </li>
          <li>
            <strong>{isEn ? "Probation Periods" : "การนับช่วงทดลองงาน"}</strong>: 
            {isEn ? " Many companies track probation periods (e.g., 90 days or 119 days) based on calendar days, but knowing the working days helps set appropriate performance goals within that period." : " หลายบริษัทมีการกำหนดช่วงเวลาทดลองงาน (เช่น 90 หรือ 119 วัน) การทราบสัดส่วนวันทำงานและวันหยุดในช่วงเวลานั้นๆ จะช่วยให้ผู้ประเมินสามารถตั้งเป้าหมายการทำงานได้เหมาะสมยิ่งขึ้น"}
          </li>
        </ul>
        <h3>{isEn ? "How to Use This Tool" : "วิธีใช้งานเครื่องมือคำนวณวันทำงาน"}</h3>
        <p>
          {isEn ? 
            "Simply select your Start Date and End Date. Then, configure your typical working week by checking the boxes for the days you usually work (e.g., Monday to Friday). The calculator will instantly tell you how many working days, weekend days, and total days fall within that date range. Note that public holidays are not automatically deducted, so you may need to subtract those manually depending on your local calendar." : 
            "เพียงแค่คุณเลือก 'วันที่เริ่มต้น' และ 'วันที่สิ้นสุด' ที่ต้องการคำนวณ จากนั้นเลือกรูปแบบวันทำงานตามปกติของคุณ (เช่น ทำงานวันจันทร์ถึงวันศุกร์ หยุดเสาร์อาทิตย์ หรือ ทำงานวันจันทร์ถึงวันเสาร์ หยุดเฉพาะวันอาทิตย์) ระบบจะทำการคำนวณและแสดงผลทันทีว่า ในช่วงเวลาดังกล่าว มีจำนวนวันทำงานกี่วัน มีวันหยุดสุดสัปดาห์กี่วัน และรวมเป็นเวลากี่วัน ข้อควรระวังคือ ระบบนี้ยังไม่ได้ทำการหักลบวันหยุดนักขัตฤกษ์ ดังนั้นหากในเดือนนั้นมีวันหยุดตามประเพณีของบริษัท คุณจำเป็นต้องนำตัวเลขที่ได้ไปหักลบเพิ่มเติมด้วยตนเอง"}
        </p>
        <p>
          {isEn ?
            "By understanding your exact working days, you can better manage your time, optimize productivity, and achieve a healthier work-life balance." :
            "การเข้าใจสัดส่วนวันทำงานและวันหยุดอย่างชัดเจน จะช่วยให้คุณสามารถบริหารจัดการเวลาได้ดียิ่งขึ้น เพิ่มประสิทธิภาพในการทำงาน และสร้างสมดุลระหว่างการทำงานและการใช้ชีวิตส่วนตัว (Work-Life Balance) ได้อย่างเหมาะสม"}
        </p>
      </article>
    </div>
  );
}
