import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function NganToSqm({ lang }: any) {
  const [ngan, setNgan] = useState<number | ''>('');
  
  const sqm = ngan !== '' ? ngan * 400 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Ngan to Square Meters Converter' : 'เครื่องมือแปลงงานเป็นตารางเมตร'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Ngan (งาน)' : 'จำนวนงาน'}
            </label>
            <input
              type="number"
              value={ngan}
              onChange={(e) => setNgan(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder={lang === 'EN' ? 'Enter Ngan...' : 'ระบุจำนวนงาน...'}
              min="0"
            />
          </div>

          <div className="flex justify-center">
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex md:hidden items-center justify-center w-12 h-12 bg-gray-50 rounded-full mt-4">
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Square Meters (ตารางเมตร)' : 'จำนวนตารางเมตร'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {sqm !== '' ? sqm.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก งาน เป็น ตารางเมตร (Ngan to Square Meters)</h2>
        <p>หน่วย "งาน" มักถูกใช้เรียกพื้นที่ที่มีขนาดไม่ใหญ่มากนัก เช่น พื้นที่ปลูกบ้าน หรือสวนขนาดย่อม แต่เมื่อเราต้องการดำเนินการก่อสร้าง หรือจ้างบริษัทสถาปนิกให้ออกแบบอาคาร หรือโกดังขนาดเล็ก ข้อมูลพื้นที่มักจะถูกแปลงเป็น "ตารางเมตร" ซึ่งเป็นหน่วยสากลเพื่อการออกแบบและการยื่นขออนุญาตก่อสร้างตามกฎหมาย</p>
        
        <h3>1 งาน เท่ากับกี่ตารางเมตร?</h3>
        <p>หลักการแปลงหน่วยนั้นมาจากพื้นฐานที่ว่า 1 ตารางวา เท่ากับ 4 ตารางเมตร และ 1 งาน เท่ากับ 100 ตารางวา ดังนั้นเมื่อนำ 100 มาคูณด้วย 4 จะพบว่า <strong>1 งาน มีพื้นที่เท่ากับ 400 ตารางเมตร</strong></p>
        <p>ขนาดพื้นที่ 400 ตารางเมตรนี้ เป็นขนาดที่กำลังดีสำหรับการสร้างบ้านเดี่ยวหลังใหญ่ที่มีสวนรอบบ้าน หรือการสร้างโกดังเก็บสินค้าขนาดเล็ก การทำความเข้าใจหน่วยนี้จึงมีประโยชน์ต่อผู้รับเหมาและเจ้าของโครงการอย่างมาก</p>
        
        <h3>ความสำคัญของการแปลง "งาน" เป็น "ตารางเมตร"</h3>
        <p>1. <strong>การประเมินราคาค่าก่อสร้าง:</strong> ผู้รับเหมามักจะประเมินราคาค่าก่อสร้างบ้านหรืออาคารเป็น "ราคาต่อตารางเมตร" หากคุณมีที่ดินขนาด 2 งาน (800 ตารางเมตร) และกฎหมายกำหนดให้สร้างอาคารได้ไม่เกินร้อยละ 70 ของพื้นที่ดิน คุณจะรู้ทันทีว่าคุณสร้างอาคารได้เต็มที่ประมาณ 560 ตารางเมตร และสามารถนำไปคูณกับราคาประเมินค่าก่อสร้างได้</p>
        <p>2. <strong>การคุยสเปกกับผู้รับเหมาหรือช่างเทคนิค:</strong> ไม่ว่าจะเป็นการเทปูนพื้น การปูหญ้า การถมดิน หรือการทำหลังคา การวัดพื้นที่ในหน้างานจริงจะใช้สายวัดที่เป็นระบบเมตริก ซึ่งวัดออกมาเป็นเมตรและตารางเมตร การแปลงหน่วยให้ตรงกันแต่แรกจะช่วยป้องกันการสื่อสารที่คลาดเคลื่อน</p>
        
        <h3>วิธีการแปลงหน่วย</h3>
        <p><strong>สูตร:</strong> จำนวนงาน &times; 400 = จำนวนตารางเมตร</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>ที่ดิน 1 งาน = 1 &times; 400 = 400 ตารางเมตร</li>
          <li>ที่ดิน 1.5 งาน = 1.5 &times; 400 = 600 ตารางเมตร</li>
          <li>ที่ดิน 2 งาน = 2 &times; 400 = 800 ตารางเมตร</li>
        </ul>
        
        <h3>ประหยัดเวลาด้วยโปรแกรมคำนวณ</h3>
        <p>ในยุคดิจิทัล คุณไม่จำเป็นต้องมานั่งทดเลขคูณ 400 ด้วยตัวเอง เครื่องมือออนไลน์แปลง "งานเป็นตารางเมตร" บนหน้าเว็บนี้ สามารถตอบสนองการคำนวณของคุณได้ทันที เหมาะสำหรับวิศวกร ช่างก่อสร้าง สถาปนิก หรือบุคคลทั่วไปที่ต้องการประเมินพื้นที่ดินของตนเองก่อนการตัดสินใจทำโครงการก่อสร้างใดๆ ช่วยให้ได้ตัวเลขที่ถูกต้อง แม่นยำ และพร้อมใช้งานทันที</p>
      </article>
    </div>
  );
}
