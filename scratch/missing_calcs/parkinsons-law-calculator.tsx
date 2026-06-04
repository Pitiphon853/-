import React, { useState } from 'react';
import { Hourglass, Clock, Zap, AlertOctagon, Timer, BarChart } from 'lucide-react';

export default function ParkinsonsLawCalculator({ lang }: any) {
  const isTH = lang === 'th';
  
  const [actualTime, setActualTime] = useState<number>(2);
  const [allocatedTime, setAllocatedTime] = useState<number>(8);

  const calculateLaw = () => {
    const safeActual = Math.max(0.1, actualTime);
    const safeAllocated = Math.max(0.1, allocatedTime);
    
    // If actual > allocated, they are working faster than given time, no parkinson's law.
    // If allocated > actual, parkinson's law applies.
    const expandedTime = Math.max(0, safeAllocated - safeActual);
    const efficiency = Math.min(100, Math.round((safeActual / safeAllocated) * 100));
    const inflation = safeAllocated > safeActual ? Math.round(((safeAllocated - safeActual) / safeActual) * 100) : 0;
    
    return {
      expandedTime,
      efficiency,
      inflation,
      hasParkinson: safeAllocated > safeActual
    };
  };

  const result = calculateLaw();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Hourglass size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'วิเคราะห์กฎของพาร์กินสัน (Parkinson\'s Law)' : 'Parkinson\'s Law Calculator'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                {isTH ? 'เวลาที่ต้องใช้จริงเมื่อโฟกัสเต็มที่' : 'Actual Time Needed (Full Focus)'}
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {isTH ? 'หากไม่มีสิ่งรบกวนเลย งานนี้จะเสร็จในกี่ชั่วโมง?' : 'If fully focused, how long does this task take?'}
              </p>
              <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={actualTime}
                  onChange={(e) => setActualTime(Number(e.target.value))}
                  className="w-full px-4 py-2 outline-none font-medium"
                />
                <span className="px-4 text-gray-500 bg-gray-50 border-l border-gray-300">
                  {isTH ? 'ชั่วโมง' : 'hours'}
                </span>
              </div>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl border border-teal-100">
              <label className="block text-sm font-semibold text-teal-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {isTH ? 'เวลาที่ได้รับมอบหมาย (Deadline)' : 'Time Allocated (Deadline)'}
              </label>
              <p className="text-xs text-teal-700 mb-3">
                {isTH ? 'คุณมีเวลาทั้งหมดเท่าไหร่ในการทำงานนี้?' : 'How much time are you given for this task?'}
              </p>
              <div className="flex items-center bg-white border border-teal-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={allocatedTime}
                  onChange={(e) => setAllocatedTime(Number(e.target.value))}
                  className="w-full px-4 py-2 outline-none font-medium"
                />
                <span className="px-4 text-gray-500 bg-gray-50 border-l border-teal-200">
                  {isTH ? 'ชั่วโมง' : 'hours'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-teal-900 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Timer size={150} />
            </div>
            
            <h3 className="text-xl font-medium mb-6 opacity-90 relative z-10 flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              {isTH ? 'ผลวิเคราะห์ประสิทธิภาพ' : 'Efficiency Analysis'}
            </h3>
            
            <div className="space-y-6 relative z-10">
              {result.hasParkinson ? (
                <>
                  <div>
                    <p className="text-teal-200 text-sm mb-1">{isTH ? 'เวลาที่สูญเสียไปโดยเปล่าประโยชน์' : 'Wasted / Expanded Time'}</p>
                    <div className="text-4xl font-bold text-red-400">
                      {result.expandedTime.toFixed(1)} {isTH ? 'ชั่วโมง' : 'hrs'}
                    </div>
                  </div>
                  
                  <div className="border-t border-teal-700/50 pt-4">
                    <p className="text-teal-200 text-sm mb-2">{isTH ? 'งานของคุณขยายตัวเพิ่มขึ้นถึง' : 'Your task inflated by'}</p>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-yellow-300">{result.inflation}%</span>
                      <span className="ml-2 text-teal-100 pb-1">{isTH ? 'จากเวลาจริงที่ควรใช้' : 'from its actual requirement'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 mt-4 backdrop-blur-sm border border-white/20 flex items-start">
                    <AlertOctagon className="w-5 h-5 mr-3 text-red-300 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-teal-50">
                      {isTH 
                        ? 'ระวัง! คุณตกหลุมพรางกฎพาร์กินสัน งานของคุณจะขยายตัวออกไปจนเต็มเวลาที่คุณมี แม้ว่าเนื้องานจะไม่ได้เยอะขนาดนั้นก็ตาม' 
                        : 'Warning! Parkinson\'s Law is at work. Your task expands to fill the time available, wasting precious time.'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Zap className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-md" />
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {isTH ? 'ประสิทธิภาพสูงสุด!' : 'Peak Efficiency!'}
                  </h4>
                  <p className="text-teal-100">
                    {isTH 
                      ? 'คุณไม่ได้ตั้งเดดไลน์หลวมเกินไป นี่คือการบริหารเวลาที่ดีเยี่ยม' 
                      : 'You are not giving the task unnecessary time. Great time management!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-teal max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">กฎของพาร์กินสัน (Parkinson's Law) ทำไมให้เวลาเยอะ งานยิ่งเสร็จช้า?</h2>
          <p>
            คุณเคยสังเกตไหมว่า หากคุณมีเวลา 1 สัปดาห์ในการทำรายงาน คุณจะใช้เวลาทั้งสัปดาห์นั้นเพื่อทำให้มันเสร็จ แต่ถ้าเจ้านายบอกว่าต้องการรายงานชิ้นเดียวกันนี้ภายในพรุ่งนี้เช้า คุณกลับสามารถปั่นมันจนเสร็จได้ทันเวลา?
          </p>
          <p>
            ปรากฏการณ์นี้ไม่ใช่เรื่องบังเอิญ แต่ถูกอธิบายไว้ด้วย <strong>"กฎของพาร์กินสัน" (Parkinson's Law)</strong> ซึ่งถูกคิดค้นโดย Cyril Northcote Parkinson นักประวัติศาสตร์ชาวอังกฤษในปี 1955 เขาได้กล่าวประโยคทองไว้ว่า:
          </p>
          <blockquote className="border-l-4 border-teal-500 pl-4 py-2 italic font-medium bg-teal-50 text-teal-900 rounded-r-lg">
            "Work expands so as to fill the time available for its completion."<br/>
            (งานจะขยายตัวออกไปจนเต็มเวลาที่ได้รับมอบหมายเสมอ)
          </blockquote>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ทำไมถึงเป็นเช่นนั้น? หลุมพรางของเวลาที่มากเกินไป</h3>
          <p>
            เมื่อเรามีเวลาในการทำงานมากเกินกว่าที่ตัวงานต้องการจริงๆ สมองของเราจะเริ่มสร้างกลไกที่ทำให้งานนั้นดูยากและซับซ้อนขึ้นโดยอัตโนมัติ ซึ่งมักจะมาในรูปแบบของ:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>การผัดวันประกันพรุ่ง (Procrastination):</strong> "ยังมีเวลาอีกตั้งเยอะ ค่อยทำทีหลังก็ได้" สุดท้ายคุณก็ไปเร่งทำในคืนหมาหอนก่อนเดดไลน์</li>
            <li><strong>ความสมบูรณ์แบบที่เกินพอดี (Over-Perfectionism):</strong> เมื่อเวลาเหลือเยอะ คุณจะเริ่มจับผิดรายละเอียดเล็กๆ น้อยๆ ที่ไม่ได้สร้าง Impact ให้กับงาน (Overthinking) ปรับสีฟอนต์ จัดหน้ากระดาษวนไปมาจนหมดเวลา</li>
            <li><strong>ความซับซ้อนจำแลง (Artificial Complexity):</strong> คุณจะเริ่มรู้สึกว่างานนี้ยากกว่าความเป็นจริง และใช้เวลาไปกับการประชุมหรือค้นหาข้อมูลที่ไม่จำเป็น</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">วิธีเอาชนะกฎของพาร์กินสันและทวงคืนเวลาชีวิต</h3>
          <p>
            หากคุณรู้ตัวว่ากำลังสูญเสียเวลาไปกับการที่ "งานขยายตัว" คุณสามารถใช้เทคนิคเหล่านี้เพื่อ Hack สมองและเพิ่ม Productivity ให้ตัวเอง:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>สร้างเดดไลน์เทียม (Artificial Deadlines):</strong> แม้เจ้านายจะให้เวลา 1 สัปดาห์ แต่ให้คุณหลอกสมองตัวเอง (และทำให้ได้จริง) ว่าต้องส่งภายใน 2 วัน วิธีนี้บีบให้คุณโฟกัสแค่สิ่งที่สำคัญที่สุด (80/20 Rule)</li>
            <li><strong>เทคนิค Timeboxing:</strong> กำหนดเวลาตายตัวในการทำงานแต่ละชิ้น เช่น "ฉันจะเขียนอีเมลนี้ให้เสร็จภายใน 15 นาที" พอหมดเวลาปุ๊บ ต้องหยุดและส่งทันที ห้ามทำต่อ</li>
            <li><strong>ซอยงานใหญ่ให้เป็นงานเล็ก:</strong> แบ่งโปรเจกต์ที่มีเดดไลน์ยาวๆ ออกเป็นงานย่อยๆ และตั้งเดดไลน์สั้นๆ ให้กับแต่ละงานย่อย เพื่อไม่ให้เกิดช่องว่างของเวลา</li>
            <li><strong>ใช้เทคนิค Pomodoro:</strong> ทำงานแบบโฟกัสจัดเต็ม 25 นาที สลับพัก 5 นาที วิธีนี้จะสร้างความรู้สึกเร่งด่วน (Urgency) ในทุกๆ 25 นาที ทำให้งานไม่สามารถขยายตัวได้</li>
          </ol>
          
          <p>
            จำไว้ว่า <strong>"เวลา"</strong> ไม่เหมือนกับเงิน ยิ่งคุณให้เวลากับงานมากเท่าไหร่ มันไม่ได้แปลว่างานจะออกมาดีขึ้นเสมอไป ลองบีบเวลาให้สั้นลง แล้วคุณจะตกใจกับประสิทธิภาพของตัวเองที่คุณไม่เคยรู้มาก่อน!
          </p>
        </article>
      )}
    </div>
  );
}
