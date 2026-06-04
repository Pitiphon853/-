'use client'

import React, { useState } from 'react'
import { Map } from 'lucide-react'

export default function SqwaToNgan({ lang }: { lang: string }) {
  const [value, setValue] = useState<string>('')
  
  const numericValue = parseFloat(value)
  const isValid = !isNaN(numericValue) && numericValue >= 0
  const result = isValid ? numericValue / 100 : 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white flex items-center justify-center gap-3">
        <Map className="w-8 h-8 text-blue-500" />
        {lang === 'EN' ? 'Sq.Wa to Ngan Calculator' : 'โปรแกรมแปลงตารางวาเป็นงาน'}
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
              placeholder={lang === 'EN' ? 'e.g., 200' : 'เช่น 200'}
            />
            <span className="absolute right-4 top-3.5 text-slate-400">Sq.Wa</span>
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
        <h2>โปรแกรมแปลงพื้นที่จากตารางวาเป็นงาน สุดยอดเครื่องมือวัดที่ดิน</h2>
        <p>ในการคำนวณและวัดขนาดที่ดินของประเทศไทยนั้น เรามีหน่วยวัดมาตรฐานที่ใช้กันมาอย่างยาวนานและยังคงใช้กันอย่างแพร่หลายในปัจจุบัน นั่นคือ ไร่ งาน และตารางวา สำหรับการแปลงพื้นที่จาก &quot;ตารางวา&quot; เป็น &quot;งาน&quot; ถือเป็นหนึ่งในการแปลงหน่วยที่พบเห็นได้บ่อยมาก โดยเฉพาะอย่างยิ่งเวลาที่เราดูรายละเอียดในโฉนดที่ดิน หรือเวลาที่เราต้องการแบ่งสรรปันส่วนที่ดินสำหรับการปลูกบ้านหรือทำเกษตรกรรมขนาดย่อม โปรแกรมแปลงตารางวาเป็นงาน จึงถูกพัฒนาขึ้นเพื่อช่วยให้คุณสามารถคำนวณสัดส่วนพื้นที่ได้อย่างรวดเร็วและแม่นยำ ลดโอกาสในการคำนวณผิดพลาดที่อาจส่งผลกระทบต่อการซื้อขาย</p>

        <h3>1 งาน มีกี่ตารางวา? ไขข้อสงสัยเรื่องหน่วยพื้นที่</h3>
        <p>ก่อนที่จะทำการคำนวณแปลงหน่วยพื้นที่ เราจำเป็นต้องเข้าใจสัดส่วนที่ถูกต้องของหน่วยวัดที่ดินในระบบไทยเสียก่อน ความสัมพันธ์ระหว่างหน่วย &quot;งาน&quot; และ &quot;ตารางวา&quot; เป็นอะไรที่เข้าใจได้ง่ายมาก โดยมีมาตรฐานดังนี้:</p>
        <ul>
          <li><strong>1 งาน</strong> เท่ากับ <strong>100 ตารางวา</strong></li>
          <li>นอกจากนี้ <strong>4 งาน</strong> จะเท่ากับ <strong>1 ไร่</strong> (หรือ 400 ตารางวา)</li>
        </ul>
        <p>ดังนั้น เมื่อพูดถึงหน่วย &quot;งาน&quot; เรากำลังพูดถึงพื้นที่ที่มีขนาดเป็น 1 ใน 4 ของไร่ หากเทียบกับระบบสากลหรือระบบเมตริกแล้ว 1 ตารางวาจะเท่ากับ 4 ตารางเมตร ส่งผลให้ 1 งาน (100 ตารางวา) มีขนาดเทียบเท่ากับ 400 ตารางเมตรนั่นเอง การทราบข้อมูลเหล่านี้จะทำให้คุณกะระยะและประเมินขนาดพื้นที่ได้อย่างแม่นยำยิ่งขึ้น</p>

        <h3>สูตรการแปลงตารางวาเป็นงาน และวิธีคำนวณที่ถูกต้อง</h3>
        <p>การแปลงหน่วยจากตารางวาเป็นงานนั้นสามารถทำได้ง่ายๆ ด้วยการหาร คุณสามารถใช้สูตรคณิตศาสตร์พื้นฐานในการหาผลลัพธ์ได้ทันทีโดยไม่ต้องพึ่งพาสมการที่ซับซ้อนใดๆ เหมาะสำหรับทั้งคนที่คำนวณด้วยตัวเองหรือใช้เครื่องคิดเลขช่วย</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 text-center">
          <strong>สูตรการคำนวณ: จำนวนงาน = จำนวนตารางวา ÷ 100</strong>
        </div>
        <p><strong>ตัวอย่างการคำนวณในชีวิตจริง:</strong></p>
        <ul>
          <li>กรณีที่คุณต้องการปลูกบ้านบนที่ดินขนาด 200 ตารางวา เมื่อนำมาเข้าสูตรหารด้วย 100 (200 ÷ 100) จะได้ผลลัพธ์เท่ากับ 2 งาน</li>
          <li>หากคุณมีที่ดินขนาด 150 ตารางวา เมื่อคำนวณแล้ว (150 ÷ 100) จะเท่ากับ 1.5 งาน (หรือ 1 งาน 50 ตารางวา)</li>
          <li>ที่ดินขนาด 300 ตารางวา จะเท่ากับ 3 งานพอดี (300 ÷ 100 = 3)</li>
        </ul>

        <h3>ประโยชน์ของการแปลงตารางวาเป็นงานในชีวิตประจำวัน</h3>
        <p>การรู้และเข้าใจวิธีการแปลงหน่วยตารางวาเป็นงาน มีประโยชน์อย่างมากในหลายๆ สถานการณ์ ไม่ว่าจะเป็นการแบ่งมรดกที่ดินให้ลูกหลาน การคำนวณพื้นที่เพื่อปลูกพืชผักสวนครัว หรือแม้กระทั่งการตีเส้นแบ่งเขตที่ดินเพื่อสร้างกำแพงล้อมรอบ นอกจากนี้ในเอกสารโฉนดที่ดินของไทย จะมีการระบุพื้นที่ในรูปแบบ ไร่-งาน-ตารางวา เสมอ การที่เราสามารถแปลงหน่วยเหล่านี้กลับไปกลับมาได้ จะช่วยให้การอ่านโฉนดที่ดินและการตรวจสอบความถูกต้องของพื้นที่เป็นเรื่องง่าย ไม่โดนหลอกเวลาทำการซื้อขายที่ดินอย่างแน่นอน</p>

        <h3>โปรแกรมช่วยคำนวณ ทางเลือกใหม่ที่สะดวกและรวดเร็ว</h3>
        <p>แม้ว่าการหารด้วย 100 จะดูเหมือนเป็นเรื่องง่าย แต่ในความเป็นจริง เมื่อเราต้องเจอกับตัวเลขที่มีเศษเยอะๆ หรือจุดทศนิยม การคิดในใจอาจทำให้เกิดความผิดพลาดได้ โปรแกรมแปลงพื้นที่ตารางวาเป็นงาน ถูกสร้างมาเพื่อขจัดปัญหานี้ เพียงแค่กรอกจำนวนตารางวาลงไปในช่องรับค่า ผลลัพธ์จะแสดงขึ้นมาแบบเรียลไทม์ในทันที ทั้งแม่นยำ สะดวกสบาย และสามารถใช้งานได้ผ่านสมาร์ทโฟนหรือคอมพิวเตอร์ของคุณทุกที่ทุกเวลา ไม่ว่าคุณจะเป็นนายหน้าค้าที่ดิน หรือผู้กำลังสนใจจะซื้อบ้าน เครื่องมือนี้คือตัวช่วยที่คุณต้องมีติดตัวไว้!</p>
      </article>
    </div>
  )
}
