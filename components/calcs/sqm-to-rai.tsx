'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqmToRai({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue / 1600 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.m to Rai Calculator' : 'โปรแกรมแปลงตารางเมตรเป็นไร่'}
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
              placeholder={lang === 'EN' ? 'e.g., 1600' : 'เช่น 1600'}
            />
            <span className="absolute right-4 top-3.5 text-slate-400">Sq.m</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col justify-center relative overflow-hidden">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 z-10">
            {lang === 'EN' ? 'Result in Rai (ไร่)' : 'ผลลัพธ์ (ไร่)'}
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 break-words z-10">
            {isValid ? result.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'} 
            <span className="text-2xl ml-2 font-normal text-blue-500 dark:text-blue-500/70">ไร่</span>
          </div>
          <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/10 z-0" />
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none space-y-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2>โปรแกรมแปลงพื้นที่จากตารางเมตรเป็นไร่ ผู้ช่วยสำคัญคนรักที่ดิน</h2>
        <p>หากคุณกำลังวางแผนซื้อที่ดินผืนใหญ่สำหรับการทำเกษตรกรรม สร้างโรงงานอุตสาหกรรม หรือพัฒนาเป็นโครงการหมู่บ้านจัดสรร แน่นอนว่าการรับรู้ขนาดพื้นที่ในหน่วย "ตารางเมตร" เพียงอย่างเดียวอาจทำให้จินตนาการภาพความกว้างใหญ่ของพื้นที่ได้ยาก เนื่องจากหน่วยตารางเมตรมักจะใช้กับสิ่งปลูกสร้างหรือพื้นที่ขนาดเล็ก ในประเทศไทย การสื่อสารเรื่องขนาดที่ดินผืนใหญ่มักจะใช้หน่วย "ไร่" เป็นมาตรฐานหลัก ดังนั้น การแปลงหน่วยจากตารางเมตรเป็นไร่จึงมีความสำคัญอย่างมาก เพื่อให้คุณเข้าใจภาพรวมของที่ดินผืนนั้นได้อย่างชัดเจน</p>

        <h3>1 ไร่ มีกี่ตารางเมตร? เข้าใจมาตรฐานการวัดพื้นที่</h3>
        <p>เพื่อให้เห็นภาพที่ชัดเจนที่สุด เราต้องมาเรียนรู้ความสัมพันธ์ของหน่วยพื้นที่ที่คนไทยนิยมใช้ กับระบบเมตริกซึ่งเป็นมาตรฐานสากล:</p>
        <ul>
          <li>ในระบบของไทย: <strong>1 ไร่</strong> เท่ากับ <strong>400 ตารางวา</strong></li>
          <li>เมื่อเทียบกับระบบสากล: <strong>1 ตารางวา</strong> เท่ากับ <strong>4 ตารางเมตร</strong></li>
          <li>เมื่อนำมาคูณกัน (400 x 4) จะพบว่า <strong>1 ไร่ มีขนาดเท่ากับ 1,600 ตารางเมตร</strong> นั่นเอง</li>
        </ul>
        <p>การจำตัวเลข 1,600 นี้จะช่วยให้คุณสามารถคำนวณและประเมินขนาดพื้นที่ที่ดินเมื่อเทียบกับสิ่งปลูกสร้างขนาดใหญ่ได้อย่างรวดเร็ว เช่น สนามฟุตบอล หรือโกดังเก็บสินค้า ทำให้คุณตัดสินใจวางแผนพัฒนาที่ดินได้อย่างมีประสิทธิภาพมากขึ้น</p>

        <h3>วิธีคิดและสูตรการแปลงตารางเมตรเป็นไร่</h3>
        <p>หลักการคำนวณเพื่อแปลงหน่วยตารางเมตรกลับมาเป็นหน่วยไร่นั้น ทำได้โดยการนำพื้นที่ในหน่วยตารางเมตรมาหารด้วย 1,600 ซึ่งจะทำให้คุณได้ตัวเลขที่เป็นจำนวนไร่ออกมาทันที</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนไร่ = จำนวนตารางเมตร ÷ 1,600</strong>
        </div>
        <p><strong>ตัวอย่างการคำนวณเพื่อความเข้าใจ:</strong></p>
        <ul>
          <li>หากคุณมีพื้นที่โรงงานขนาด 4,800 ตารางเมตร เมื่อหารด้วย 1,600 (4,800 ÷ 1,600) จะเท่ากับที่ดิน 3 ไร่</li>
          <li>หากมีพื้นที่ขนาด 8,000 ตารางเมตร นำมาหารด้วย 1,600 (8,000 ÷ 1,600) จะเท่ากับ 5 ไร่</li>
          <li>กรณีมีพื้นที่ขนาด 800 ตารางเมตร หารด้วย 1,600 (800 ÷ 1,600) จะเท่ากับ 0.5 ไร่ (หรือ 2 งาน หรือครึ่งไร่)</li>
        </ul>

        <h3>ข้อดีของการใช้เครื่องมือออนไลน์แปลงตารางเมตรเป็นไร่</h3>
        <p>แม้ว่าการหารด้วย 1,600 จะสามารถทำได้ด้วยเครื่องคิดเลขทั่วไป แต่เมื่อเราต้องเจอกับตัวเลขที่ไม่ลงตัว หรือจุดทศนิยมที่ซับซ้อน อาจทำให้เกิดการคำนวณที่ผิดพลาดและสร้างความสับสนได้ง่าย โปรแกรมแปลงตารางเมตรเป็นไร่ออนไลน์ของเราถูกออกแบบมาเพื่อลดข้อผิดพลาดเหล่านั้น เพียงแค่คุณพิมพ์ตัวเลขขนาดพื้นที่ลงไป ระบบจะทำการคำนวณให้คุณโดยอัตโนมัติ พร้อมแสดงผลลัพธ์ที่แม่นยำในทันที ไม่ว่าคุณจะใช้งานผ่านโทรศัพท์มือถือ หรือคอมพิวเตอร์ ก็สามารถใช้งานได้ฟรีตลอด 24 ชั่วโมง เป็นตัวช่วยที่ยอดเยี่ยมสำหรับนักลงทุน นายหน้า และผู้ที่กำลังมองหาที่ดินในฝัน</p>

        <h3>ความสำคัญของการเปรียบเทียบตารางเมตรกับไร่</h3>
        <p>การเข้าใจทั้งสองหน่วยช่วยให้คุณสามารถบริหารจัดการพื้นที่ได้อย่างเหมาะสม ตัวอย่างเช่น คุณอาจทราบว่าพื้นที่สำหรับปลูกบ้านใช้ 200 ตารางเมตร แต่คุณมีที่ดินทั้งหมด 2 ไร่ (3,200 ตารางเมตร) คุณจะสามารถคำนวณได้ทันทีว่าคุณยังเหลือพื้นที่อีกถึง 3,000 ตารางเมตร สำหรับการจัดสวน ทำสระว่ายน้ำ หรือสร้างสิ่งปลูกสร้างอื่นๆ เพิ่มเติม การเชื่อมโยงความเข้าใจของหน่วยทั้งสองระบบจะทำให้การออกแบบและวางผังที่ดินของคุณสมบูรณ์แบบมากยิ่งขึ้น</p>
      </article>
    </div>
  )
}
