'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqwaToSqm({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue * 4 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.Wa to Sq.m Calculator' : 'โปรแกรมแปลงตารางวาเป็นตารางเมตร'}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {lang === 'EN' ? 'Enter Area in Sq.Wa (ตารางวา)' : 'ระบุพื้นที่ (ตารางวา)'}
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
              placeholder={lang === 'EN' ? 'e.g., 50' : 'เช่น 50'}
            />
            <span className="absolute right-4 top-3.5 text-slate-400">Sq.Wa</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col justify-center relative overflow-hidden">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 z-10">
            {lang === 'EN' ? 'Result in Sq.m (ตารางเมตร)' : 'ผลลัพธ์ (ตารางเมตร)'}
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 break-words z-10">
            {isValid ? result.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'} 
            <span className="text-2xl ml-2 font-normal text-blue-500 dark:text-blue-500/70">ตร.ม.</span>
          </div>
          <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/10 z-0" />
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none space-y-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2>โปรแกรมแปลงพื้นที่จากตารางวาเป็นตารางเมตร แม่นยำและรวดเร็ว</h2>
        <p>ในการประเมินราคาที่ดิน การก่อสร้างบ้าน หรือแม้กระทั่งการออกแบบตกแต่งภายใน การคำนวณพื้นที่ถือเป็นหัวใจสำคัญที่ไม่อาจมองข้ามได้ ในประเทศไทยเรามักจะคุ้นเคยกับหน่วย &quot;ตารางวา&quot; ที่ใช้ในการระบุขนาดของที่ดินในโฉนด แต่ในเชิงวิศวกรรม สถาปัตยกรรม และมาตรฐานสากล หน่วย &quot;ตารางเมตร&quot; เป็นหน่วยหลักที่ใช้ในการกำหนดพื้นที่ใช้สอย การแปลงหน่วยจากตารางวาเป็นตารางเมตรจึงเป็นสิ่งที่จำเป็นอย่างหลีกเลี่ยงไม่ได้ เครื่องมือคำนวณออนไลน์ของเราถูกพัฒนาขึ้นมาเพื่อตอบสนองความต้องการนี้โดยเฉพาะ</p>

        <h3>1 ตารางวา มีกี่ตารางเมตร? เข้าใจหน่วยวัดไทยและสากล</h3>
        <p>เพื่อให้การแปลงหน่วยเป็นไปอย่างถูกต้อง เรามาทำความรู้จักความสัมพันธ์พื้นฐานของหน่วยวัดทั้งสองระบบกันก่อน:</p>
        <ul>
          <li><strong>1 วา</strong> เท่ากับ <strong>2 เมตร</strong> (ในแง่ของความยาว)</li>
          <li>เมื่อคำนวณพื้นที่ <strong>1 ตารางวา</strong> (กว้าง 1 วา x ยาว 1 วา) จะเท่ากับพื้นที่กว้าง 2 เมตร x ยาว 2 เมตร</li>
          <li>ดังนั้น <strong>1 ตารางวา</strong> จึงมีค่าเท่ากับ <strong>4 ตารางเมตร</strong> พอดี</li>
        </ul>
        <p>นี่คือหลักการที่ง่ายที่สุดและเป็นพื้นฐานสำคัญที่ทุกคนควรทราบไว้ ไม่ว่าคุณจะเป็นผู้รับเหมา สถาปนิก หรือเจ้าของบ้าน การจำเลข 4 ไว้ในใจจะช่วยให้คุณสามารถคำนวณพื้นที่คร่าวๆ ได้อย่างรวดเร็วเมื่อต้องตัดสินใจซื้อที่ดินหรือประเมินราคาวัสดุก่อสร้าง</p>

        <h3>สูตรการคำนวณตารางวาเป็นตารางเมตรแบบง่ายๆ</h3>
        <p>การคำนวณนั้นไม่มีอะไรซับซ้อนเลย เพียงแค่คุณใช้สูตรการคูณพื้นฐานทางคณิตศาสตร์ ก็จะได้ผลลัพธ์เป็นตารางเมตรออกมาทันที</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนตารางเมตร = จำนวนตารางวา × 4</strong>
        </div>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>หากคุณซื้อที่ดินมาในขนาด 50 ตารางวา เมื่อนำมาคูณด้วย 4 (50 × 4) จะได้พื้นที่เท่ากับ 200 ตารางเมตร</li>
          <li>หากคุณมีที่ดินขนาด 100 ตารางวา เมื่อนำมาคูณ 4 (100 × 4) จะได้พื้นที่เท่ากับ 400 ตารางเมตร</li>
          <li>หากแปลงที่ดินขนาด 15.5 ตารางวา เมื่อคูณด้วย 4 (15.5 × 4) จะเท่ากับ 62 ตารางเมตร</li>
        </ul>

        <h3>ทำไมต้องแปลงตารางวาเป็นตารางเมตรในการสร้างบ้าน?</h3>
        <p>เวลาที่เราว่าจ้างบริษัทรับสร้างบ้าน ผู้รับเหมามักจะประเมินราคาค่าก่อสร้างเป็น &quot;บาทต่อตารางเมตร&quot; ดังนั้นแม้ที่ดินของคุณจะระบุในโฉนดเป็นตารางวา คุณก็ต้องแปลงกลับมาเป็นตารางเมตรเสียก่อนเพื่อให้สามารถพูดคุยเรื่องราคาค่าก่อสร้าง ค่าปูกระเบื้อง ค่าทาสี และค่าวัสดุอื่นๆ ได้อย่างเข้าใจตรงกัน นอกจากนี้กฎหมายควบคุมอาคารหลายฉบับยังระบุระยะร่นหรือพื้นที่ว่างเป็นตารางเมตร การแปลงหน่วยให้ถูกต้องจึงมีผลต่อการยื่นขออนุญาตก่อสร้างอีกด้วย</p>

        <h3>สรุปการใช้โปรแกรมแปลงหน่วย</h3>
        <p>เครื่องมือแปลงพื้นที่จากตารางวาเป็นตารางเมตรนี้ ใช้งานง่าย ไม่ซับซ้อน และให้ผลลัพธ์ที่รวดเร็ว เพียงแค่คุณป้อนตัวเลขพื้นที่ที่เป็นตารางวา ระบบจะทำการประมวลผลและแสดงผลเป็นตารางเมตรให้คุณโดยอัตโนมัติ ช่วยให้คุณประหยัดเวลา ลดความเสี่ยงในการคำนวณผิดพลาด และทำให้การวางแผนโครงการอสังหาริมทรัพย์ของคุณดำเนินไปได้อย่างราบรื่น ไร้อุปสรรคทางด้านตัวเลขกวนใจ</p>
      </article>
    </div>
  )
}
