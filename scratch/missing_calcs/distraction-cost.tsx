"use client";

import React, { useState } from 'react';
import { AlertCircle, Clock, Smartphone, BellOff, Briefcase, Activity, AlertTriangle } from 'lucide-react';

export default function DistractionCostCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [interruptions, setInterruptions] = useState<number>(8);
  const [distractionTimeMins, setDistractionTimeMins] = useState<number>(5);
  const [refocusTimeMins, setRefocusTimeMins] = useState<number>(15);
  const [workHours, setWorkHours] = useState<number>(8);

  const directDistractionTimeHours = (interruptions * distractionTimeMins) / 60;
  const refocusPenaltyHours = (interruptions * refocusTimeMins) / 60;
  
  const totalLostHours = directDistractionTimeHours + refocusPenaltyHours;
  const productiveHours = Math.max(0, workHours - totalLostHours);
  
  const lostPercent = workHours > 0 ? (totalLostHours / workHours) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-rose-700 p-6 text-white flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isTH ? "เครื่องมือคำนวณ: ถูกขัดจังหวะเสียเวลาเท่าไหร่" : "Cost of Distraction Calculator"}
            </h2>
            <p className="text-pink-100 mt-1">
              {isTH ? "ประเมินเวลาที่สูญเสียไปจากสิ่งเร้าและการดึงสมาธิกลับมาทำงาน (Context Switching Penalty)" : "Evaluate time lost to interruptions and the context switching penalty."}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-600" />
              {isTH ? "ข้อมูลการถูกรบกวน" : "Interruption Details"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "ถูกขัดจังหวะ (ครั้ง/วัน)" : "Interruptions/Day"}
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={interruptions || ''}
                    onChange={(e) => setInterruptions(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                    placeholder="8"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? "เวลาทำงาน (ชั่วโมง/วัน)" : "Work Hours/Day"}
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={workHours || ''}
                    onChange={(e) => setWorkHours(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                    placeholder="8"
                    min="1"
                    max="24"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {isTH ? "ระยะเวลาต่อครั้ง (นาที)" : "Duration per Incident (Mins)"}
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isTH ? "เวลาที่เสียไปกับสิ่งรบกวน" : "Time spent on Distraction"}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? "*เช่น ไถฟีดโซเชียล, ตอบแชทเพื่อน, คุยเรื่องสัพเพเหระกับเพื่อนร่วมงาน" : "*e.g., Scrolling social media, replying to non-work texts."}
                  </p>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={distractionTimeMins || ''}
                      onChange={(e) => setDistractionTimeMins(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isTH ? "เวลาดึงสมาธิกลับมาสู่ระดับเดิม (Refocus Time)" : "Time to Refocus (Penalty)"}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? "*ค่าเฉลี่ยตามงานวิจัยอยู่ที่ประมาณ 15-23 นาที เพื่อกลับสู่จุดเดิมก่อนโดนขัดจังหวะ" : "*Research shows it takes 15-23 minutes to return to the original task state."}
                  </p>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={refocusTimeMins || ''}
                      onChange={(e) => setRefocusTimeMins(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-pink-600" />
              {isTH ? "เวลาที่สูญเสียไป" : "Time Lost"}
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "เสียไปกับสิ่งรบกวนโดยตรง" : "Direct Distraction Time"}</p>
                <div className="text-xl font-semibold text-gray-700">
                  {directDistractionTimeHours.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "ชั่วโมง/วัน" : "hrs/day"}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{isTH ? "เสียไปกับการตั้งสมาธิใหม่ (Penalty)" : "Refocus Penalty Time"}</p>
                <div className="text-xl font-semibold text-pink-600">
                  {refocusPenaltyHours.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "ชั่วโมง/วัน" : "hrs/day"}
                </div>
              </div>

              <div className={`p-4 rounded-xl border shadow-sm ${lostPercent > 30 ? 'bg-rose-50 border-rose-200' : 'bg-gray-100 border-gray-200'}`}>
                <p className={`text-sm font-medium ${lostPercent > 30 ? 'text-rose-800' : 'text-gray-800'}`}>
                  {isTH ? "รวมเวลาที่หายไปทั้งหมด" : "Total Time Lost"}
                </p>
                <div className={`text-3xl font-bold mt-1 ${lostPercent > 30 ? 'text-rose-600' : 'text-gray-700'}`}>
                  {totalLostHours.toLocaleString('th-TH', { maximumFractionDigits: 1 })} {isTH ? "ชั่วโมง" : "hrs"}
                </div>
                <p className={`text-xs mt-1 font-semibold ${lostPercent > 30 ? 'text-rose-600' : 'text-gray-500'}`}>
                  {isTH ? "คิดเป็น" : "That's"} {lostPercent.toLocaleString('th-TH', { maximumFractionDigits: 1 })}% {isTH ? "ของเวลาทำงานทั้งหมด" : "of your workday"}
                </p>
              </div>

              {productiveHours < 4 && workHours >= 8 && (
                <div className="bg-rose-100 p-3 rounded-lg text-xs text-rose-800 flex gap-2">
                  <BellOff className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{isTH ? "คำเตือน: คุณเหลือเวลาทำงานจริงน้อยมาก อาจนำไปสู่ภาวะ Burnout ได้" : "Warning: You have very little productive time left. This may lead to burnout."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-pink max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            รู้หรือไม่? แค่ถูกขัดจังหวะ 5 นาที อาจทำให้คุณเสียเวลาทำงานไปถึงครึ่งชั่วโมง!
          </h2>
          <p>
            เคยสงสัยไหมว่า ทั้งที่นั่งอยู่หน้าคอมพิวเตอร์ครบ 8 ชั่วโมง แต่ทำไมถึงรู้สึกว่าไม่ได้งานอะไรเป็นชิ้นเป็นอันเลย? 
            ตัวการสำคัญที่ขโมยเวลาอันมีค่าของคุณไปอย่างแนบเนียนก็คือ <strong>"การถูกขัดจังหวะ (Distraction)"</strong> 
            และค่าปรับที่สมองต้องจ่ายเพื่อดึงสมาธิกลับมา หรือที่เรียกว่า <strong>Context Switching Penalty</strong> นั่นเอง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Context Switching Penalty คืออะไร?
          </h3>
          <p>
            สมองมนุษย์ไม่ได้ถูกออกแบบมาให้ทำงานหลายอย่างพร้อมกันได้ดี (Multitasking is a myth) 
            เมื่อเรากำลังจดจ่ออยู่กับงานที่ต้องใช้ความคิดซับซ้อน เช่น การเขียนโค้ด การทำบัญชี หรือการวิเคราะห์ข้อมูล 
            สมองจะโหลดข้อมูลที่จำเป็นทั้งหมดขึ้นมาไว้ในหน่วยความจำระยะสั้น (Working Memory) 
          </p>
          <p>
            เมื่อมีเพื่อนร่วมงานเดินมาถามคำถาม หรือมีข้อความแชทเด้งเตือน สมองจะต้องทิ้งข้อมูลชุดเดิม แล้วโหลดข้อมูลใหม่มารับมือกับคำถามนั้น 
            และเมื่อคุณจะกลับไปทำงานชิ้นเดิม สมองก็ต้องใช้เวลาและพลังงานในการ "รื้อฟื้น" ว่าก่อนหน้านี้ทำถึงไหนแล้ว 
            งานวิจัยจากมหาวิทยาลัยแคลิฟอร์เนีย เออร์ไวน์ (UC Irvine) พบว่า <em>พนักงานออฟฟิศโดยเฉลี่ยต้องใช้เวลาถึง 23 นาที 15 วินาที ในการดึงสมาธิกลับสู่ระดับเดิมหลังถูกขัดจังหวะ</em>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ตัวอย่างราคาที่ต้องจ่าย
          </h3>
          <p>
            สมมติว่าคุณถูกขัดจังหวะจากการเตือนแอปพลิเคชัน 8 ครั้งต่อวัน (ซึ่งเป็นเรื่องปกติมาก) 
            ใช้เวลาตอบแชทหรือไถฟีดแค่ครั้งละ 5 นาที ฟังดูเหมือนแค่ 40 นาที แต่ในความเป็นจริง คุณต้องบวกเวลาที่สูญเสียไปกับการตั้งสมาธิใหม่ (สมมติ 15 นาที/ครั้ง) เข้าไปด้วย
            ซึ่งจะเท่ากับ 8 ครั้ง × 15 นาที = 120 นาที (2 ชั่วโมง) 
            <strong>รวมแล้วคุณเสียเวลาไปถึง 2 ชั่วโมง 40 นาที หรือประมาณ 30-40% ของเวลาทำงานทั้งวัน!</strong>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            เทคนิคการกู้คืนเวลาและลดการถูกขัดจังหวะ
          </h3>
          <ol>
            <li><strong>ปิด Notification:</strong> สิ่งเร้าที่ควบคุมง่ายที่สุดคือโทรศัพท์และคอมพิวเตอร์ของคุณเอง ปิดเสียง ปิดการสั่น และปิดหน้าต่าง Pop-up ที่ไม่จำเป็นระหว่างเวลาทำงาน</li>
            <li><strong>ใช้เทคนิค Pomodoro:</strong> ทำงานแบบโฟกัส 25 นาที สลับกับพัก 5 นาที ระหว่างช่วงทำงาน 25 นาที ให้ตั้งใจว่าจะไม่สนใจสิ่งเร้าใดๆ ทั้งสิ้น</li>
            <li><strong>สื่อสารกับเพื่อนร่วมงาน:</strong> หากจำเป็นต้องใช้สมาธิขั้นสุด ให้สวมหูฟัง เปิดโหมด Do Not Disturb ในแอปแชท หรือแปะป้ายเล็กๆ ไว้ที่โต๊ะว่า "ขอเวลาโฟกัส 1 ชั่วโมง" เพื่อส่งสัญญาณให้คนรอบข้างรับรู้</li>
            <li><strong>จดไอเดียแทรกซ้อนไว้ก่อน:</strong> หากระหว่างทำงานมีไอเดียหรือสิ่งต้องทำแวบเข้ามาในหัว (Internal Distraction) อย่าเพิ่งกระโดดไปทำ ให้จดลงในกระดาษโพสต์อิทข้างๆ ก่อน แล้วกลับมาโฟกัสกับงานตรงหน้าต่อ</li>
          </ol>

          <p className="mt-6 font-semibold">
            สรุป: การขัดจังหวะแม้เพียงเล็กน้อย ก็สร้างความเสียหายต่อ Productivity ได้มหาศาลเมื่อรวมกัน 
            ลองปรับเปลี่ยนพฤติกรรมเพียงนิดเดียว คุณอาจได้ชั่วโมงทำงานกลับคืนมาวันละ 1-2 ชั่วโมง โดยไม่ต้องเหนื่อยทำงานล่วงเวลาอีกต่อไป!
          </p>
        </article>
      )}
    </div>
  );
}
