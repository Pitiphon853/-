"use client";

import React, { useState } from 'react';
import { Calculator, Users, Clock, DollarSign, Briefcase, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

export default function MeetingRoiCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [attendees, setAttendees] = useState<number>(5);
  const [avgSalary, setAvgSalary] = useState<number>(35000);
  const [durationMins, setDurationMins] = useState<number>(60);
  const [prepMins, setPrepMins] = useState<number>(15);
  const [expectedValue, setExpectedValue] = useState<number>(10000);

  // Calculations
  const workingHoursPerMonth = 160;
  const hourlyRate = avgSalary / workingHoursPerMonth;
  const totalTimePerPersonHours = (durationMins + prepMins) / 60;
  const totalCost = attendees * totalTimePerPersonHours * hourlyRate;
  
  const netValue = expectedValue - totalCost;
  const roi = totalCost > 0 ? (netValue / totalCost) * 100 : 0;

  const isProfitable = roi > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isTH ? "เครื่องมือคำนวณต้นทุนการประชุม (Meeting ROI)" : "Meeting ROI Calculator"}
            </h2>
            <p className="text-blue-100 mt-1">
              {isTH ? "คำนวณค่าใช้จ่ายที่แท้จริงของการจัดประชุมและความคุ้มค่า" : "Calculate the true cost of meetings and their Return on Investment."}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              {isTH ? "ข้อมูลการประชุม" : "Meeting Details"}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "จำนวนผู้เข้าร่วม (คน)" : "Number of Attendees"}
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={attendees || ''}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="5"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "เงินเดือนเฉลี่ย/คน (บาท/เดือน)" : "Average Monthly Salary/Person"}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={avgSalary || ''}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="35000"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เวลาประชุม (นาที)" : "Duration (Mins)"}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={durationMins || ''}
                    onChange={(e) => setDurationMins(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เวลาเตรียมตัว (นาที/คน)" : "Prep Time (Mins/Person)"}
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={prepMins || ''}
                    onChange={(e) => setPrepMins(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "มูลค่า/ผลลัพธ์ที่คาดหวัง (บาท)" : "Expected Value Generated"}
              </label>
              <p className="text-xs text-gray-500 mb-2">
                {isTH ? "*ประเมินมูลค่าของงานหรือการตัดสินใจที่จะได้จากการประชุมนี้" : "*Estimate the monetary value of decisions or outcomes from this meeting"}
              </p>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={expectedValue || ''}
                  onChange={(e) => setExpectedValue(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              {isTH ? "ผลลัพธ์การคำนวณ" : "Results"}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "ต้นทุนการประชุม (Meeting Cost)" : "Meeting Cost"}</p>
                <div className="text-3xl font-bold text-red-600">
                  ฿{totalCost.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {isTH ? `เฉลี่ย ฿${(totalCost / (attendees || 1)).toLocaleString('th-TH', { maximumFractionDigits: 2 })} / คน` : `Avg ฿${(totalCost / (attendees || 1)).toLocaleString('th-TH', { maximumFractionDigits: 2 })} / person`}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "มูลค่าสุทธิ (Net Value)" : "Net Value"}</p>
                <div className={`text-2xl font-bold ${netValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netValue >= 0 ? '+' : ''}฿{netValue.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className={`p-5 rounded-xl border shadow-sm flex items-start gap-4 ${isProfitable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className={`p-2 rounded-full ${isProfitable ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isProfitable ? <TrendingUp className="w-6 h-6 text-green-600" /> : <AlertTriangle className="w-6 h-6 text-red-600" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isProfitable ? 'text-green-800' : 'text-red-800'}`}>
                    {isTH ? "ความคุ้มค่า (ROI)" : "Return on Investment (ROI)"}
                  </p>
                  <div className={`text-3xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                    {roi.toLocaleString('th-TH', { maximumFractionDigits: 1 })}%
                  </div>
                  <p className={`text-xs mt-1 ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                    {isTH 
                      ? (isProfitable ? "การประชุมนี้สร้างมูลค่าได้คุ้มกับเวลาที่เสียไป" : "การประชุมนี้อาจทำให้เสียเวลาและต้นทุนมากกว่าผลลัพธ์ที่ได้")
                      : (isProfitable ? "This meeting is worth the time and cost." : "This meeting costs more than the value it generates.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-indigo max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ทำไมการคำนวณต้นทุนการประชุม (Meeting ROI) ถึงสำคัญกับธุรกิจ?
          </h2>
          <p>
            ในยุคที่การทำงานมีความรวดเร็วและท้าทายมากขึ้น <strong>การประชุม (Meeting)</strong> กลายเป็นเครื่องมือสำคัญในการสื่อสารและตัดสินใจ แต่คุณรู้หรือไม่ว่าการประชุมแต่ละครั้งมี "ต้นทุนที่ซ่อนอยู่" ซึ่งมักถูกมองข้ามไป 
            เครื่องมือคำนวณต้นทุนการประชุม (Meeting ROI Calculator) จะช่วยให้คุณประเมินได้ว่า การเรียกคน 5 คน หรือ 10 คนมานั่งคุยกันในห้องประชุมเป็นเวลาหนึ่งชั่วโมงนั้น คุ้มค่ากับเงินเดือนที่บริษัทต้องจ่ายไปหรือไม่
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ต้นทุนที่แท้จริงของการประชุมคืออะไร?
          </h3>
          <p>
            ต้นทุนของการประชุมไม่ได้มีแค่ค่าไฟ ค่าแอร์ หรือค่ากาแฟ แต่ประกอบไปด้วย <strong>ต้นทุนค่าเสียโอกาส (Opportunity Cost)</strong> และ <strong>มูลค่าเวลาของพนักงาน</strong> 
            หากเรานำเงินเดือนของพนักงานทุกคนที่เข้าประชุมมาหารเฉลี่ยเป็นรายชั่วโมง แล้วคูณด้วยระยะเวลาที่ใช้ในการประชุม รวมกับเวลาที่พวกเขาใช้เตรียมข้อมูล 
            ตัวเลขที่ออกมาคือ "ต้นทุนขั้นต่ำ" ที่บริษัทต้องจ่ายเพื่อให้เกิดการประชุมนั้นขึ้นมา
          </p>
          <p>
            ตัวอย่างเช่น หากคุณมีพนักงาน 5 คน เงินเดือนเฉลี่ย 35,000 บาทต่อเดือน ประชุมกัน 1 ชั่วโมงพร้อมใช้เวลาเตรียมตัวอีก 15 นาที ต้นทุนการประชุมครั้งนี้อาจสูงหลักพันบาท! 
            และหากการประชุมนั้นไม่มีวาระที่ชัดเจน ไม่ได้ข้อสรุป หรือกลายเป็นการถกเถียงที่ยืดเยื้อ นั่นเท่ากับว่าบริษัทสูญเสียเงินก้อนนั้นไปโดยเปล่าประโยชน์ (Negative ROI)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            วิธีการประเมินความคุ้มค่า (ROI) ของการประชุม
          </h3>
          <p>
            การประเมิน ROI ของการประชุม สามารถคิดง่ายๆ ได้จากการเปรียบเทียบ "ต้นทุนของเวลา" กับ "มูลค่าที่คาดว่าจะได้" 
            เช่น การประชุมเพื่อปิดยอดขาย การประชุมเพื่อแก้ปัญหาที่ทำให้กระบวนการทำงานสะดุด หรือการประชุมตัดสินใจลงทุน 
            หากผลลัพธ์ที่ได้ (Expected Value) มีมูลค่าสูงกว่าต้นทุนเวลาของทุกคนรวมกัน (Total Cost) แสดงว่าการประชุมนั้นสร้างกำไรหรือมีค่า ROI เป็นบวก
          </p>
          <ul>
            <li><strong>ROI เป็นบวก:</strong> การประชุมคุ้มค่า ได้ข้อสรุป สร้างประโยชน์ต่อธุรกิจ</li>
            <li><strong>ROI เป็นลบ:</strong> การประชุมอาจไม่จำเป็น ควรเปลี่ยนเป็นการแจ้งผ่านอีเมล, แชท หรือใช้การสรุปสั้นๆ แทน</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            เคล็ดลับในการลดต้นทุนและเพิ่มประสิทธิภาพการประชุม
          </h3>
          <ol>
            <li><strong>กำหนดวาระ (Agenda) ให้ชัดเจน:</strong> ก่อนส่งคำเชิญประชุม ควรมีหัวข้อชัดเจนว่าต้องการคุยเรื่องอะไร และเป้าหมายคืออะไร</li>
            <li><strong>เชิญเฉพาะคนที่เกี่ยวข้องเท่านั้น:</strong> ยิ่งคนน้อย ยิ่งตัดสินใจได้เร็วและลดต้นทุนได้มาก หากใครแค่ต้องรับทราบ ให้ใช้วิธีส่งสรุปการประชุม (Meeting Minutes) ไปให้อ่านทีหลัง</li>
            <li><strong>กำหนดเวลาให้สั้นและกระชับ:</strong> ลองลดเวลาประชุมจาก 60 นาที เหลือ 45 นาที หรือ 30 นาที การจำกัดเวลาจะบังคับให้ทุกคนเข้าประเด็นได้เร็วขึ้น</li>
            <li><strong>มีตัวเลือกสำหรับการปฏิเสธ:</strong> ให้อำนาจพนักงานในการปฏิเสธการเข้าประชุม หากพวกเขาเห็นว่าไม่ได้มีส่วนเกี่ยวข้องโดยตรงเพื่อนำเวลาไปโฟกัสกับงานหลัก (Deep Work)</li>
          </ol>

          <p className="mt-6 font-semibold">
            สรุป: การใช้เครื่องมือ Meeting ROI Calculator เป็นประจำ จะช่วยสร้างวัฒนธรรมองค์กรที่เคารพเวลาของกันและกัน ลดการประชุมที่ไร้สาระ และเพิ่มประสิทธิภาพในการทำงานของทีมได้อย่างมหาศาล ลองนำไปใช้คำนวณกับการประชุมครั้งถัดไปของคุณดูสิ แล้วคุณจะตกใจกับต้นทุนแฝงที่ซ่อนอยู่!
          </p>
        </article>
      )}
    </div>
  );
}
