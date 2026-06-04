'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqmToNgan({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue / 400 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.m to Ngan Calculator' : 'โปรแกรมแปลงตารางเมตรเป็นงาน'}
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
            {lang === 'EN' ? 'Result in Ngan (งาน)' : 'ผลลัพธ์ (งาน)'}
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 break-words z-10">
            {isValid ? result.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'} 
            <span className="text-2xl ml-2 font-normal text-blue-500 dark:text-blue-500/70">งาน</span>
          </div>
          <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/10 z-0" />
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none space-y-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2>โปรแกรมแปลงพื้นที่จากตารางเมตรเป็นงาน ง่ายและแม่นยำ</h2>
        <p>การวัดขนาดพื้นที่และที่ดินในประเทศไทยมีความเป็นเอกลักษณ์เฉพาะตัว โดยมีการใช้งานร่วมกันระหว่างหน่วยวัดแบบไทยดั้งเดิมอย่าง ไร่ งาน ตารางวา และหน่วยวัดมาตรฐานสากลอย่างตารางเมตร ทำให้ในหลายๆ ครั้งที่เราต้องดูแบบแปลนบ้าน แผนผังโครงการ หรือโฉนดที่ดิน เราอาจจะต้องเจอกับความยุ่งยากในการแปลงหน่วยไปมา การแปลงจาก "ตารางเมตร" เป็น "งาน" ก็เป็นอีกหนึ่งการคำนวณที่พบได้บ่อย หากคุณต้องการความรวดเร็วและไม่อยากปวดหัวกับการคิดเลขด้วยตนเอง โปรแกรมแปลงตารางเมตรเป็นงานของเราคือทางออกที่ยอดเยี่ยมที่สุดสำหรับคุณ</p>

        <h3>1 งาน มีกี่ตารางเมตร? เข้าใจหลักการแปลงหน่วย</h3>
        <p>เพื่อให้การแปลงหน่วยเป็นไปอย่างเข้าใจง่ายและมีระบบ เรามาดูความสัมพันธ์ระหว่างหน่วย "งาน" และ "ตารางเมตร" กันทีละขั้นตอน:</p>
        <ul>
          <li>ตามมาตรฐานการวัดที่ดินของไทย <strong>1 งาน</strong> จะเท่ากับ <strong>100 ตารางวา</strong></li>
          <li>เมื่อแปลงเป็นระบบเมตริก <strong>1 ตารางวา</strong> จะมีค่าเท่ากับ <strong>4 ตารางเมตร</strong></li>
          <li>ดังนั้น เมื่อนำ 100 ตารางวา มาคูณกับ 4 ตารางเมตร จะได้ผลลัพธ์ว่า <strong>1 งาน มีขนาดเท่ากับ 400 ตารางเมตร</strong> อย่างพอดิบพอดี</li>
        </ul>
        <p>ตัวเลข 400 นี้คือคีย์เวิร์ดสำคัญที่จะช่วยให้คุณสามารถคำนวณหาจำนวน "งาน" จากพื้นที่ที่เป็น "ตารางเมตร" ได้อย่างรวดเร็ว ไม่ว่าพื้นที่นั้นจะมีขนาดเล็กหรือใหญ่เพียงใด</p>

        <h3>สูตรคำนวณและวิธีการหาผลลัพธ์ตารางเมตรเป็นงาน</h3>
        <p>วิธีคำนวณเพื่อแปลงตารางเมตรให้กลับมาเป็นหน่วยงานนั้นไม่ซับซ้อนเลย เพียงแค่คุณใช้สูตรหารด้วยตัวเลขมาตรฐาน นั่นคือ 400 คุณก็จะได้ผลลัพธ์เป็นจำนวนงานออกมาทันที</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนงาน = จำนวนตารางเมตร ÷ 400</strong>
        </div>
        <p><strong>ตัวอย่างประกอบความเข้าใจ:</strong></p>
        <ul>
          <li>กรณีที่คุณมีที่ดินซึ่งถูกวัดด้วยระบบสากลว่ามีขนาด 800 ตารางเมตร เมื่อคุณนำมาหารด้วย 400 (800 ÷ 400) จะได้ผลลัพธ์เท่ากับ 2 งาน</li>
          <li>หากคุณมีพื้นที่สวนขนาด 1,200 ตารางเมตร เมื่อหารด้วย 400 (1,200 ÷ 400) จะเท่ากับที่ดินขนาด 3 งาน</li>
          <li>หากพื้นที่นั้นมีขนาด 200 ตารางเมตร เมื่อหารด้วย 400 (200 ÷ 400) จะได้ 0.5 งาน (ซึ่งก็คือ 50 ตารางวา หรือครึ่งงานนั่นเอง)</li>
        </ul>

        <h3>ใครบ้างที่ควรใช้โปรแกรมนี้?</h3>
        <p>เครื่องมือนี้เหมาะสำหรับทุกคนที่เกี่ยวข้องกับอสังหาริมทรัพย์และการก่อสร้าง ไม่ว่าจะเป็นนายหน้าขายที่ดินที่ต้องลงประกาศขายโดยระบุหน่วยให้ครบถ้วน สถาปนิกที่ต้องนำแบบแปลนตารางเมตรมาเทียบกับขนาดที่ดินจริงเพื่อจัดสรรพื้นที่ให้เหมาะสม รวมถึงบุคคลทั่วไปที่กำลังมองหาที่ดินสำหรับสร้างบ้านพักอาศัย การใช้งานโปรแกรมแปลงตารางเมตรเป็นงานจะช่วยให้คุณประหยัดเวลา ไม่ต้องกดเครื่องคิดเลขซ้ำๆ และป้องกันความผิดพลาดที่อาจเกิดขึ้นจากการคำนวณด้วยตนเอง</p>

        <h3>บทสรุป</h3>
        <p>โปรแกรมคำนวณของเราถูกออกแบบมาให้มีหน้าตาที่ใช้งานง่าย (User-friendly) รองรับการแสดงผลทุกแพลตฟอร์มทั้งในคอมพิวเตอร์และมือถือ การใช้งานเพียงแค่กรอกตัวเลข คุณก็จะได้รับผลลัพธ์ที่รวดเร็วและถูกต้อง 100% ทำให้ทุกเรื่องราวเกี่ยวกับที่ดินและการคำนวณพื้นที่กลายเป็นเรื่องง่ายสำหรับคุณ ทดลองใช้งานเครื่องมือของเราได้ฟรีทันที!</p>
      </article>
    </div>
  )
}
