'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqmToSqwa({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue / 4 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.m to Sq.Wa Calculator' : 'โปรแกรมแปลงตารางเมตรเป็นตารางวา'}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {lang === 'EN' ? 'Enter Area in Sq.m (ตารางเมตร)' : 'ระบุพื้นที่ (ตารางเมตร)'}
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
              placeholder={lang === 'EN' ? 'e.g., 400' : 'เช่น 400'}
            />
            <span className="absolute right-4 top-3.5 text-slate-400">Sq.m</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col justify-center relative overflow-hidden">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 z-10">
            {lang === 'EN' ? 'Result in Sq.Wa (ตารางวา)' : 'ผลลัพธ์ (ตารางวา)'}
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 break-words z-10">
            {isValid ? result.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'} 
            <span className="text-2xl ml-2 font-normal text-blue-500 dark:text-blue-500/70">ตร.ว.</span>
          </div>
          <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/10 z-0" />
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none space-y-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2>โปรแกรมแปลงตารางเมตรเป็นตารางวา เครื่องมือคู่ใจคนสร้างบ้าน</h2>
        <p>การเข้าใจหน่วยวัดพื้นที่เป็นสิ่งสำคัญอย่างยิ่งในแวดวงอสังหาริมทรัพย์และก่อสร้างของไทย เนื่องจากเราใช้ทั้งหน่วยไทยและหน่วยสากลปะปนกันอยู่เสมอ โดยปกติแล้ว การแจ้งขนาดของสิ่งปลูกสร้าง เช่น พื้นที่ใช้สอยภายในบ้าน พื้นที่คอนโดมิเนียม มักจะใช้หน่วยเป็น &quot;ตารางเมตร&quot; ตามมาตรฐานสากล แต่เมื่อถึงเวลาที่เราต้องดูเอกสารสิทธิ์โฉนดที่ดิน เรากลับพบว่าหน่วยที่ระบุไว้จะเป็น ไร่ งาน และ &quot;ตารางวา&quot; สิ่งนี้ทำให้หลายคนเกิดความสับสนและต้องการแปลงหน่วยกลับไปกลับมาอยู่ตลอดเวลา โปรแกรมแปลงตารางเมตรเป็นตารางวา จึงเข้ามาตอบโจทย์และเป็นตัวช่วยที่ขาดไม่ได้</p>

        <h3>1 ตารางวา มีกี่ตารางเมตร? หลักการพื้นฐานที่คุณต้องรู้</h3>
        <p>ความสับสนในการแปลงหน่วยจะหมดไป หากคุณจำสัดส่วนพื้นฐานนี้ได้: <strong>1 ตารางวา เท่ากับ 4 ตารางเมตร</strong> และในทางกลับกัน <strong>4 ตารางเมตร ก็เท่ากับ 1 ตารางวา</strong> นั่นเอง ตัวเลขนี้มีที่มาจากการเทียบสัดส่วนความยาว โดย 1 วา เท่ากับ 2 เมตร เมื่อคำนวณเป็นพื้นที่ตารางสี่เหลี่ยม (กว้างคูณยาว) จึงกลายเป็น 2 เมตร x 2 เมตร = 4 ตารางเมตร การทำความเข้าใจความสัมพันธ์นี้คือหัวใจสำคัญในการคำนวณพื้นที่ทุกประเภทในประเทศไทย</p>

        <h3>วิธีการและสูตรแปลงตารางเมตรกลับเป็นตารางวา</h3>
        <p>เมื่อเราทราบแล้วว่า 4 ตารางเมตร เท่ากับ 1 ตารางวา ดังนั้นหากเรามีตัวเลขพื้นที่ในหน่วยตารางเมตร และต้องการทราบว่าเป็นกี่ตารางวา สิ่งที่เราต้องทำก็เพียงแค่หารด้วยตัวเลข 4 เท่านั้น</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนตารางวา = จำนวนตารางเมตร ÷ 4</strong>
        </div>
        <p><strong>ลองดูตัวอย่างการคำนวณในสถานการณ์จริง:</strong></p>
        <ul>
          <li>สมมติว่าคุณต้องการซื้อคอนโดมิเนียมขนาด 40 ตารางเมตร หากคุณอยากรู้ว่าเทียบเท่ากับที่ดินกี่ตารางวา ให้นำ 40 มาหาร 4 (40 ÷ 4) จะได้ผลลัพธ์เท่ากับ 10 ตารางวา</li>
          <li>หากคุณมีพื้นที่ใช้สอยภายในบ้าน 200 ตารางเมตร เมื่อหารด้วย 4 (200 ÷ 4) จะมีขนาดเทียบเท่ากับ 50 ตารางวา</li>
          <li>พื้นที่ลานจอดรถหน้าบ้าน 60 ตารางเมตร เมื่อแปลงแล้ว (60 ÷ 4) จะเท่ากับ 15 ตารางวา</li>
        </ul>

        <h3>ประโยชน์ของการแปลงตารางเมตรเป็นตารางวา</h3>
        <p>การใช้โปรแกรมแปลงหน่วยนี้ มีประโยชน์อย่างยิ่งในการช่วยให้คุณสามารถเปรียบเทียบขนาดของสิ่งปลูกสร้างกับขนาดของที่ดินได้อย่างเห็นภาพ เช่น หากคุณมีแบบบ้านที่ต้องการสร้างระบุพื้นที่ใช้สอย 120 ตารางเมตร เมื่อคุณแปลงเป็นตารางวาจะได้ 30 ตารางวา ทำให้คุณทราบได้ทันทีว่า หากที่ดินของคุณมีขนาด 50 ตารางวา ตัวบ้านจะกินพื้นที่ไป 30 ตารางวา และคุณจะเหลือพื้นที่รอบบ้านอีก 20 ตารางวา สำหรับการจัดสวน หรือทำทางเดิน สิ่งนี้ช่วยให้สถาปนิกและเจ้าของบ้านสื่อสารและออกแบบฟังก์ชันการใช้งานต่างๆ ได้อย่างเหมาะสมลงตัว</p>

        <h3>บทสรุปของเครื่องมือคำนวณออนไลน์</h3>
        <p>โปรแกรมคำนวณแปลงตารางเมตรเป็นตารางวาของเรานี้ ช่วยให้คุณทำงานได้รวดเร็วและแม่นยำมากยิ่งขึ้น ลดปัญหาการกดเครื่องคิดเลขผิดพลาด ไม่ว่าคุณจะเป็นคนทำงานด้านสายงานก่อสร้าง นายหน้าอสังหาฯ หรือคนที่กำลังวางแผนจะซื้อบ้านใหม่ เครื่องมือนี้คือคำตอบที่จะทำให้ทุกเรื่องของการวัดพื้นที่กลายเป็นเรื่องง่าย สะดวก รวดเร็ว และไม่ต้องเสียค่าใช้จ่ายใดๆ ทั้งสิ้น เริ่มต้นใช้งานวันนี้ เพื่อให้แผนการสร้างบ้านของคุณสมบูรณ์แบบมากที่สุด!</p>
      </article>
    </div>
  )
}
