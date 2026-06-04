'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqwaToRai({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue / 400 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.Wa to Rai Calculator' : 'โปรแกรมแปลงตารางวาเป็นไร่'}
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
              placeholder={lang === 'EN' ? 'e.g., 400' : 'เช่น 400'}
            />
            <span className="absolute right-4 top-3.5 text-slate-400">Sq.Wa</span>
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
        <h2>โปรแกรมแปลงพื้นที่จากตารางวาเป็นไร่ เครื่องมือสำคัญสำหรับคนไทย</h2>
        <p>การวัดขนาดที่ดินในประเทศไทยมีหน่วยที่ใช้กันอย่างแพร่หลาย ได้แก่ ไร่ งาน และตารางวา ซึ่งหน่วยเหล่านี้มีความเกี่ยวข้องกันอย่างใกล้ชิดและเป็นที่คุ้นเคยในชีวิตประจำวันของเรา อย่างไรก็ตาม ในหลายๆ สถานการณ์ เรามักจะมีความจำเป็นที่ต้องทำการแปลงหน่วยพื้นที่กลับไปกลับมาเพื่อให้เข้าใจง่ายขึ้น หรือเพื่อให้สอดคล้องกับเอกสารทางราชการ โดยเฉพาะอย่างยิ่งการแปลงจาก &quot;ตารางวา&quot; เป็น &quot;ไร่&quot; ซึ่งเป็นหน่วยที่ใหญ่กว่าและทำให้มองเห็นภาพรวมของขนาดที่ดินได้ชัดเจนมากยิ่งขึ้น หากคุณกำลังมองหาเครื่องมือที่ช่วยอำนวยความสะดวกในเรื่องนี้ โปรแกรมแปลงตารางวาเป็นไร่คือคำตอบที่ดีที่สุดสำหรับคุณ</p>

        <h3>1 ไร่ มีกี่ตารางวา? ความรู้พื้นฐานที่ต้องจำให้แม่นยำ</h3>
        <p>ก่อนที่เราจะไปเจาะลึกถึงวิธีการคำนวณ เราควรมาทำความเข้าใจเกี่ยวกับความสัมพันธ์ของหน่วยวัดพื้นที่ไทยเสียก่อน โดยปกติแล้วการแบ่งขนาดที่ดินในไทยจะมีอัตราส่วนที่แน่นอนดังต่อไปนี้:</p>
        <ul>
          <li><strong>1 ไร่</strong> เท่ากับ <strong>4 งาน</strong></li>
          <li><strong>1 งาน</strong> เท่ากับ <strong>100 ตารางวา</strong></li>
          <li>ดังนั้น <strong>1 ไร่</strong> จึงมีค่าเท่ากับ <strong>400 ตารางวา</strong> (4 งาน x 100 ตารางวา)</li>
        </ul>
        <p>หากเราต้องการเทียบเป็นระบบเมตริกเพื่อความเป็นสากล การคำนวณจะเป็นดังนี้: 1 ตารางวา เท่ากับ 4 ตารางเมตร ทำให้ 1 ไร่ (ซึ่งมี 400 ตารางวา) จะเท่ากับ 1,600 ตารางเมตรนั่นเอง การจำตัวเลขเหล่านี้ไว้จะช่วยให้คุณสามารถคำนวณขนาดที่ดินเบื้องต้นได้อย่างรวดเร็วและแม่นยำ ไม่ว่าคุณจะกำลังซื้อขายที่ดิน แบ่งแยกโฉนด หรือแม้กระทั่งการออกแบบวางแผนสร้างบ้านพักอาศัยและโครงการต่างๆ</p>

        <h3>สูตรการแปลงตารางวาเป็นไร่ ทำได้อย่างไร?</h3>
        <p>วิธีการแปลงหน่วยตารางวาเป็นไร่นั้นง่ายนิดเดียว โดยใช้หลักการทางคณิตศาสตร์พื้นฐาน เพียงแค่คุณนำจำนวนตารางวาที่ต้องการแปลง ไปหารด้วย 400 เพียงเท่านี้คุณก็จะได้ผลลัพธ์ที่เป็นหน่วยไร่ออกมาทันที ตัวเลขที่ได้จะช่วยให้คุณทราบสัดส่วนที่ชัดเจนมากยิ่งขึ้น</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนไร่ = จำนวนตารางวา ÷ 400</strong>
        </div>
        <p><strong>ตัวอย่างการคำนวณเพื่อให้เห็นภาพชัดเจน:</strong></p>
        <ul>
          <li>หากคุณมีที่ดินขนาด 800 ตารางวา เมื่อนำมาหารด้วย 400 (800 ÷ 400) จะเท่ากับ 2 ไร่พอดี</li>
          <li>หากคุณมีที่ดินขนาด 1,000 ตารางวา เมื่อนำมาหารด้วย 400 (1,000 ÷ 400) จะเท่ากับ 2.5 ไร่ (หรือเทียบเท่า 2 ไร่ 2 งาน)</li>
          <li>หากคุณมีที่ดินขนาด 200 ตารางวา เมื่อนำมาหาร 400 (200 ÷ 400) จะเท่ากับ 0.5 ไร่ (หรือ 2 งาน หรือที่เรียกกันติดปากว่าครึ่งไร่)</li>
        </ul>

        <h3>ความสำคัญของการแปลงพื้นที่ในวงการอสังหาริมทรัพย์</h3>
        <p>การแปลงหน่วยพื้นที่ที่ดินมีความสำคัญอย่างมาก โดยเฉพาะในวงการอสังหาริมทรัพย์ การซื้อขายที่ดิน การประเมินราคา และการขอสินเชื่อจากสถาบันการเงิน การทราบขนาดที่ดินที่แม่นยำในหน่วยไร่จะช่วยให้ผู้ซื้อและผู้ขายสามารถตกลงราคากันได้อย่างถูกต้องและยุติธรรม นอกจากนี้ ในกระบวนการทำงานของหน่วยงานราชการ เช่น กรมที่ดิน การรังวัดและระวางที่ดินมักจะใช้หน่วยไร่ งาน ตารางวา ควบคู่กันไปในเอกสารสิทธิ์ เช่น โฉนดที่ดิน (น.ส.4) ดังนั้นการมีโปรแกรมแปลงหน่วยที่ใช้งานง่ายและเที่ยงตรงจึงช่วยลดความผิดพลาดและเพิ่มความรวดเร็วในการดำเนินงานได้อย่างมีประสิทธิภาพ</p>

        <h3>สรุปข้อดีของโปรแกรมแปลงตารางวาเป็นไร่ออนไลน์</h3>
        <p>การคำนวณพื้นที่ด้วยตนเองอาจเกิดความสับสนหรือผิดพลาดได้ง่าย โดยเฉพาะเมื่อตัวเลขไม่ลงตัว มีทศนิยม หรือเป็นพื้นที่ที่มีขนาดใหญ่มากๆ โปรแกรมแปลงตารางวาเป็นไร่นี้ได้รับการออกแบบมาเพื่อช่วยแก้ไขปัญหาดังกล่าว เพียงแค่คุณกรอกตัวเลขในหน่วยตารางวาลงไปในช่องที่กำหนด ระบบจะทำการคำนวณและแสดงผลลัพธ์ในหน่วยไร่ให้คุณในเสี้ยววินาที ไม่ว่าคุณจะเป็นนักพัฒนาอสังหาริมทรัพย์ นายหน้าค้าที่ดิน สถาปนิก หรือบุคคลทั่วไปที่สนใจศึกษาเรื่องที่ดิน เครื่องมือนี้จะช่วยให้ชีวิตของคุณง่ายขึ้น ลดขั้นตอนที่ซับซ้อน และเพิ่มความมั่นใจในการจัดการกับตัวเลขที่ดินได้อย่างแน่นอน</p>
      </article>
    </div>
  )
}
