import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function NganToSqwa({ lang }: any) {
  const [ngan, setNgan] = useState<number | ''>('');
  
  const sqwa = ngan !== '' ? ngan * 100 : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {lang === 'EN' ? 'Ngan to Square Wa Converter' : 'เครื่องมือแปลงงานเป็นตารางวา'}
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
              {lang === 'EN' ? 'Square Wa (ตารางวา)' : 'จำนวนตารางวา'}
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-900 min-h-[50px] flex items-center">
              {sqwa !== '' ? sqwa.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2>การแปลงหน่วยพื้นที่จาก งาน เป็น ตารางวา (Ngan to Square Wa)</h2>
        <p>หน่วย "ตารางวา" เป็นหน่วยที่เล็กที่สุดในมาตราวัดพื้นที่ของไทย แต่มีความสำคัญมากที่สุดเมื่อพูดถึงการประเมินมูลค่าที่ดิน ในขณะที่ "งาน" เป็นหน่วยขนาดกลางที่มักใช้เรียกพื้นที่ระดับปลูกบ้านหรือทำสวนขนาดเล็ก การแปลงหน่วยจาก "งาน" เป็น "ตารางวา" จึงเป็นสิ่งจำเป็นสำหรับการซื้อขายที่ดินในระดับครัวเรือน</p>
        
        <h3>1 งาน เท่ากับกี่ตารางวา?</h3>
        <p>ตามมาตราไทย <strong>1 งาน จะเท่ากับ 100 ตารางวา</strong> อย่างแน่นอนและเป็นมาตรฐานเดียวกันทั่วประเทศ ซึ่งหน่วย 100 ตารางวาเป็นขนาดพื้นที่ยอดนิยมสำหรับการสร้างบ้านเดี่ยวหรือจัดสรรที่ดินขายในโครงการหมู่บ้าน</p>
        
        <h3>ทำไมต้องแปลงงานเป็นตารางวา?</h3>
        <p>1. <strong>เพื่อความง่ายในการคำนวณราคาที่ดิน:</strong> เวลาประกาศขายที่ดิน ผู้ขายอาจจะบอกว่า "ขายที่ดิน 2 งาน ราคา 2 ล้านบาท" หากเราเป็นผู้ซื้อและต้องการเปรียบเทียบราคาที่ดินในละแวกนั้น เราจำเป็นต้องแปลง 2 งานเป็นตารางวาก่อน (2 &times; 100 = 200 ตารางวา) จากนั้นจึงนำ 2 ล้านบาทมาหารด้วย 200 ตารางวา จะได้ราคาตารางวาละ 10,000 บาท ซึ่งช่วยให้เปรียบเทียบกับราคาตลาดได้ง่ายขึ้น</p>
        <p>2. <strong>การคำนวณพื้นที่ใช้สอยและการจัดสวน:</strong> ในการปลูกบ้าน พื้นที่ตารางวาจะถูกแปลงเป็นตารางเมตรเพื่อออกแบบตัวบ้าน แต่การทราบจำนวนตารางวาที่แน่ชัดจะช่วยในการจัดแบ่งพื้นที่หน้าบ้านและหลังบ้านคร่าวๆ ได้ง่ายกว่า</p>
        
        <h3>วิธีการแปลงหน่วยด้วยตัวเอง</h3>
        <p>การแปลงหน่วยนี้ทำได้ง่ายมาก เพียงแค่ใช้การคูณด้วย 100</p>
        <p><strong>สูตร:</strong> จำนวนงาน &times; 100 = จำนวนตารางวา</p>
        <p><strong>ตัวอย่างการคำนวณ:</strong></p>
        <ul>
          <li>ที่ดิน 1 งาน = 1 &times; 100 = 100 ตารางวา</li>
          <li>ที่ดิน 2.5 งาน = 2.5 &times; 100 = 250 ตารางวา</li>
          <li>ที่ดิน 3 งาน = 3 &times; 100 = 300 ตารางวา</li>
        </ul>
        
        <h3>ตัวช่วยการแปลงหน่วยพื้นที่ออนไลน์</h3>
        <p>แม้ว่าการคูณด้วย 100 จะดูไม่ยาก แต่บางครั้งโฉนดที่ดินอาจระบุตัวเลขที่เป็นจุดทศนิยมย่อยๆ การใช้เครื่องมือออนไลน์จะช่วยลดโอกาสเกิดข้อผิดพลาดได้ 100% โปรแกรมแปลง "งานเป็นตารางวา" ของเรา ใช้งานฟรี เพียงระบุตัวเลขจำนวนงาน เครื่องจะแสดงผลเป็นตารางวาทันทีโดยไม่มีความหน่วง สะดวกต่อการนำตัวเลขไปคำนวณต้นทุนหรือการประเมินราคาต่อ</p>
      </article>
    </div>
  );
}
