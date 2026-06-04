"use client";

import React, { useState } from 'react';
import { Mail, Clock, RefreshCcw, Briefcase, PieChart, AlertCircle, Calendar } from 'lucide-react';

export default function EmailResponseTimeCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [emailsPerDay, setEmailsPerDay] = useState<number>(40);
  const [timePerEmailMins, setTimePerEmailMins] = useState<number>(3);
  const [checkFrequency, setCheckFrequency] = useState<number>(10);
  const [contextSwitchMins, setContextSwitchMins] = useState<number>(5);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8);

  const timeProcessingHours = (emailsPerDay * timePerEmailMins) / 60;
  const timeSwitchingHours = (checkFrequency * contextSwitchMins) / 60;
  const totalLostHours = timeProcessingHours + timeSwitchingHours;
  
  const percentOfDay = (totalLostHours / workHoursPerDay) * 100;
  
  // Assuming 240 working days a year
  const workingDaysPerYear = 240;
  const daysLostPerYear = (totalLostHours * workingDaysPerYear) / workHoursPerDay;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-6 text-white flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isTH ? "คำนวณผลกระทบเวลาตอบอีเมล (Email Productivity Cost)" : "Email Response Time Calculator"}
            </h2>
            <p className="text-teal-100 mt-1">
              {isTH ? "คำนวณเวลาที่เสียไปกับการเช็คอีเมล/แชท และผลกระทบต่อสมาธิในการทำงาน" : "Calculate time lost to emails/messages and context switching."}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-teal-600" />
              {isTH ? "พฤติกรรมการใช้อีเมล/แชท" : "Email Habits"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "จำนวนที่ได้รับต่อวัน" : "Emails Received/Day"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={emailsPerDay || ''}
                    onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="40"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เวลาที่ใช้อ่าน/ตอบ (นาที/ฉบับ)" : "Time per Email (Mins)"}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={timePerEmailMins || ''}
                    onChange={(e) => setTimePerEmailMins(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="3"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เช็คข้อความบ่อยแค่ไหน (ครั้ง/วัน)" : "Check Frequency (Times/Day)"}
                </label>
                <div className="relative">
                  <RefreshCcw className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={checkFrequency || ''}
                    onChange={(e) => setCheckFrequency(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เวลาดึงสมาธิกลับ (นาที/ครั้ง)" : "Refocus Time (Mins/Check)"}
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={contextSwitchMins || ''}
                    onChange={(e) => setContextSwitchMins(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {isTH ? "*Context Switching Cost" : "*Context Switching Cost"}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ชั่วโมงทำงานต่อวัน (ชั่วโมง)" : "Work Hours per Day"}
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={workHoursPerDay || ''}
                  onChange={(e) => setWorkHoursPerDay(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min="1"
                  max="24"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-teal-600" />
              {isTH ? "ผลกระทบต่อเวลาทำงาน" : "Time Impact"}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "เวลาอ่าน/ตอบรวม (ต่อวัน)" : "Direct Processing Time"}</p>
                <div className="text-2xl font-semibold text-gray-800">
                  {timeProcessingHours.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "ชั่วโมง" : "hrs"}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "เวลาเสียไปกับ Context Switching" : "Context Switching Loss"}</p>
                <div className="text-2xl font-semibold text-orange-500">
                  {timeSwitchingHours.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "ชั่วโมง" : "hrs"}
                </div>
              </div>

              <div className={`p-4 rounded-xl border shadow-sm ${percentOfDay > 50 ? 'bg-red-50 border-red-200' : 'bg-teal-50 border-teal-200'}`}>
                <p className={`text-sm font-medium ${percentOfDay > 50 ? 'text-red-800' : 'text-teal-800'}`}>
                  {isTH ? "สัดส่วนของเวลาทำงานทั้งหมด" : "% of Work Day"}
                </p>
                <div className={`text-3xl font-bold mt-1 ${percentOfDay > 50 ? 'text-red-600' : 'text-teal-600'}`}>
                  {Math.min(percentOfDay, 100).toLocaleString('th-TH', { maximumFractionDigits: 1 })}%
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl shadow-sm text-white flex items-start gap-3 mt-4">
                <Calendar className="w-6 h-6 text-teal-400 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">{isTH ? "คิดเป็นวันทำงานที่หายไป (ต่อปี)" : "Working Days Lost per Year"}</p>
                  <div className="text-2xl font-bold text-teal-400 mt-1">
                    {daysLostPerYear.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "วัน" : "days"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-teal max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            รู้หรือไม่? การเช็คอีเมลและข้อความแชท อาจทำลาย Productivity ของคุณไปกว่าครึ่ง
          </h2>
          <p>
            ในโลกการทำงานยุคดิจิทัล การสื่อสารผ่านอีเมล, Slack, LINE หรือ Microsoft Teams กลายเป็นเรื่องปกติ 
            แต่หลายคนอาจไม่ตระหนักว่า <strong>การตอบสนองอย่างรวดเร็ว (Instant Response)</strong> หรือการเปิดแจ้งเตือนไว้ตลอดเวลานั้น 
            ส่งผลกระทบต่อประสิทธิภาพการทำงาน (Productivity) มากกว่าที่เราคิด เครื่องมือคำนวณ <em>Email Response Time & Productivity Cost</em> 
            จะช่วยให้คุณเห็นภาพที่ชัดเจนขึ้นว่า เวลาของคุณหายไปไหน
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ต้นทุนแฝงที่เรียกว่า "Context Switching"
          </h3>
          <p>
            การตอบอีเมล 1 ฉบับ อาจใช้เวลาเพียง 2-3 นาที แต่สิ่งที่คุณสูญเสียไปจริงๆ ไม่ใช่แค่ 2-3 นาทีนั้น! 
            เมื่อสมาธิของคุณถูกขัดจังหวะจากงานหลัก (เช่น การเขียนโค้ด, การวางแผนกลยุทธ์, หรือการวิเคราะห์ข้อมูล) 
            สมองมนุษย์ต้องใช้เวลาในการปรับจูนและดึงสมาธิกลับมาสู่ระดับเดิม (Deep Work state) ซึ่งงานวิจัยหลายชิ้นระบุว่า 
            อาจใช้เวลาตั้งแต่ <strong>5 นาที ไปจนถึง 23 นาที</strong> ต่อการถูกขัดจังหวะหนึ่งครั้ง ปรากฏการณ์นี้เรียกว่า <strong>Context Switching Cost</strong>
          </p>
          <p>
            สมมติว่าคุณเช็คกล่องข้อความ 10 ครั้งต่อวัน และใช้เวลาดึงสมาธิกลับมาครั้งละ 5 นาที คุณจะสูญเสียเวลาทำงานไปฟรีๆ ถึง 50 นาทีต่อวัน 
            ยังไม่รวมเวลาที่ใช้อ่านและพิมพ์ตอบข้อความจริงๆ
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ผลกระทบต่อความเหนื่อยล้า (Burnout)
          </h3>
          <p>
            เมื่อเวลาทำงานถูกสับย่อยเป็นชิ้นเล็กชิ้นน้อย (Fragmentation of time) คุณจะรู้สึกว่า "วันนี้ยุ่งทั้งวัน แต่เหมือนไม่ได้งานชิ้นใหญ่เป็นชิ้นเป็นอันเลย" 
            สิ่งนี้นำไปสู่การต้องทำงานล่วงเวลา (Overtime) เพื่อสะสางงานหลักที่ต้องใช้สมาธิ ซึ่งท้ายที่สุดจะส่งผลให้เกิดความเครียดและภาวะหมดไฟในการทำงาน (Burnout)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            วิธีจัดการเพื่อทวงคืนเวลาและสมาธิ
          </h3>
          <ol>
            <li><strong>Time Blocking (จัดสรรเวลาเช็คข้อความ):</strong> แทนที่จะเปิดแจ้งเตือนให้เด้งตลอดเวลา ลองกำหนดเวลาเช็คอีเมล/แชทเป็นช่วงๆ เช่น 10:00 น., 14:00 น. และ 16:30 น. วิธีนี้จะช่วยลดจำนวนครั้งที่สมาธิถูกขัดจังหวะได้อย่างมหาศาล</li>
            <li><strong>ปิด Notifications ที่ไม่จำเป็น:</strong> ปิดเสียงเตือน หรือ ปิดแบนเนอร์แจ้งเตือน (Pop-up) ระหว่างที่กำลังทำงานสำคัญ</li>
            <li><strong>ใช้เทคนิค 2-Minute Rule:</strong> หากเปิดเจออีเมลแล้วพบว่าสามารถตอบกลับหรือจัดการให้เสร็จได้ภายใน 2 นาที ให้ทำทันที อย่าปล่อยทิ้งไว้ให้คาใจ</li>
            <li><strong>ตั้งสถานะให้ทีมทราบ:</strong> หากต้องใช้สมาธิสูง ลองตั้งสถานะในแอปพลิเคชันสื่อสารว่า "Do Not Disturb" หรือ "Focus Time" เพื่อบอกเพื่อนร่วมงานว่า คุณอาจตอบกลับช้ากว่าปกติในเวลานี้</li>
          </ol>

          <p className="mt-6 font-semibold">
            สรุป: การตอบสนองอย่างรวดเร็วเป็นเรื่องดี แต่ต้องแลกมาด้วยต้นทุนที่สูงมาก ลองนำตัวเลขที่ได้จากเครื่องมือคำนวณนี้ 
            ไปปรับแผนการทำงานของคุณดู การจัดการเวลาสื่อสารให้เป็นระบบ จะช่วยทวงคืนชั่วโมงทำงานต่อวันและลดความเครียดได้อย่างไม่น่าเชื่อ
          </p>
        </article>
      )}
    </div>
  );
}
