import React, { useState } from 'react';
import { Droplet, Calculator, Smartphone, Monitor, Tv, Laptop, Info } from 'lucide-react';

export default function EWasteWaterFootprint({ lang }: any) {
  const [smartphones, setSmartphones] = useState<number>(1);
  const [laptops, setLaptops] = useState<number>(0);
  const [desktops, setDesktops] = useState<number>(0);
  const [tvs, setTvs] = useState<number>(0);

  // Approximate water footprint in liters per item
  const WATER_PER_SMARTPHONE = 13000;
  const WATER_PER_LAPTOP = 190000;
  const WATER_PER_DESKTOP = 280000;
  const WATER_PER_TV = 150000;

  const totalWater = 
    (smartphones * WATER_PER_SMARTPHONE) + 
    (laptops * WATER_PER_LAPTOP) + 
    (desktops * WATER_PER_DESKTOP) + 
    (tvs * WATER_PER_TV);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
          <Droplet size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'E-waste Water Footprint Calculator' : 'โปรแกรมคำนวณรอยเท้าน้ำในขยะอิเล็กทรอนิกส์'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-600 mb-4">
            {lang === 'EN' 
              ? 'Enter the number of electronic devices you own or plan to discard to see the hidden water used to make them.' 
              : 'ระบุจำนวนอุปกรณ์อิเล็กทรอนิกส์ที่คุณมีหรือเตรียมทิ้ง เพื่อดูปริมาณน้ำที่ซ่อนอยู่ในกระบวนการผลิต'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Smartphones / Tablets' : 'สมาร์ทโฟน / แท็บเล็ต'}
              </label>
            </div>
            <input
              type="number"
              min="0"
              value={smartphones}
              onChange={(e) => setSmartphones(Number(e.target.value))}
              className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Laptops' : 'แล็ปท็อป (โน้ตบุ๊ก)'}
              </label>
            </div>
            <input
              type="number"
              min="0"
              value={laptops}
              onChange={(e) => setLaptops(Number(e.target.value))}
              className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Desktop PCs' : 'คอมพิวเตอร์ตั้งโต๊ะ'}
              </label>
            </div>
            <input
              type="number"
              min="0"
              value={desktops}
              onChange={(e) => setDesktops(Number(e.target.value))}
              className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tv className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Televisions' : 'โทรทัศน์ (ทีวี)'}
              </label>
            </div>
            <input
              type="number"
              min="0"
              value={tvs}
              onChange={(e) => setTvs(Number(e.target.value))}
              className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-right"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Water Footprint Result' : 'ผลลัพธ์รอยเท้าน้ำที่ซ่อนอยู่'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/20 p-6 rounded-lg flex flex-col justify-center items-center border border-cyan-300/50">
                <Droplet size={48} className="text-blue-200 mb-3" />
                <span className="font-semibold mb-1 text-center">
                  {lang === 'EN' ? 'Total Hidden Water Used' : 'ปริมาณน้ำรวมที่ใช้ในการผลิต'}
                </span>
                <div className="text-4xl font-extrabold text-center mt-2">
                  {totalWater.toLocaleString()} <span className="text-lg font-normal">{lang === 'EN' ? 'Liters' : 'ลิตร'}</span>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-lg text-center text-sm">
                {lang === 'EN' ? 'That is equivalent to roughly' : 'เทียบเท่ากับการอาบน้ำประมาณ'} <br/>
                <strong className="text-xl">{(totalWater / 50).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> {lang === 'EN' ? 'showers (50L each)!' : 'ครั้ง (ครั้งละ 50 ลิตร)!'}
              </div>
            </div>
            
            <div className="mt-4 text-xs text-cyan-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Values are approximate. Manufacturing microchips and extracting rare earth metals requires vast amounts of water.'
                  : 'ตัวเลขนี้เป็นการประมาณการ การผลิตไมโครชิปและการสกัดแร่ธาตุหายากต้องใช้น้ำสะอาดจำนวนมหาศาล'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-cyan max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          "น้ำที่มองไม่เห็น" ในสมาร์ทโฟนและคอมพิวเตอร์ของคุณ (Water Footprint in E-waste)
        </h2>
        <p>
          เมื่อพูดถึงปัญหา "ขยะอิเล็กทรอนิกส์" (E-waste) คนส่วนใหญ่มักจะนึกถึงสารพิษอย่างตะกั่ว ปรอท หรือแคดเมียมที่รั่วไหลลงสู่ดินและน้ำเมื่อถูกทิ้งอย่างไม่ถูกวิธี หรือนึกถึงปริมาณขยะพลาสติกและโลหะมหาศาลที่ยากต่อการย่อยสลาย แต่มีสิ่งหนึ่งที่ซ่อนเร้นอยู่ในอุปกรณ์อิเล็กทรอนิกส์ทุกชิ้นตั้งแต่กระบวนการผลิต ซึ่งคนมักมองข้าม นั่นคือ <strong>รอยเท้าน้ำ หรือ Water Footprint</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">รอยเท้าน้ำ (Water Footprint) คืออะไร?</h3>
        <p>
          รอยเท้าน้ำ คือ ปริมาณน้ำจืดทั้งหมดที่ใช้ในกระบวนการผลิตสินค้าหรือบริการหนึ่งๆ ตั้งแต่ต้นน้ำจนถึงปลายน้ำ สำหรับอุตสาหกรรมอิเล็กทรอนิกส์ กระบวนการผลิตชิ้นส่วนประกอบต่างๆ จำเป็นต้องใช้น้ำในปริมาณมหาศาลอย่างไม่น่าเชื่อ โดยเฉพาะ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การทำเหมืองแร่ (Mining):</strong> การสกัดแร่ธาตุและโลหะหายาก (Rare Earth Elements) ที่จำเป็นสำหรับแบตเตอรี่และแผงวงจร ต้องใช้น้ำจำนวนมากในการชะล้างและแยกแร่</li>
          <li><strong>การผลิตเซมิคอนดักเตอร์ (Semiconductors & Microchips):</strong> การสร้างไมโครชิปหรือแผงวงจรขนาดเล็กระดับนาโนเมตร จำเป็นต้องใช้น้ำบริสุทธิ์พิเศษ (Ultra-pure water) ในการล้างซิลิคอนเวเฟอร์ (Silicon Wafers) ซ้ำแล้วซ้ำเล่า เพื่อให้ปราศจากฝุ่นและสิ่งเจือปนใดๆ แม้แต่ฝุ่นเพียงเม็ดเดียวก็อาจทำให้ไมโครชิปใช้งานไม่ได้</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวเลขที่น่าตกใจของปริมาณน้ำซ่อนเร้น</h3>
        <p>
          คุณอาจไม่เชื่อว่า สมาร์ทโฟนเพียง 1 เครื่องที่อยู่ในมือคุณนั้น ใช้น้ำในกระบวนการผลิตเฉลี่ยถึง <strong>13,000 ลิตร</strong> (หรือประมาณ 13 ลูกบาศก์เมตร) ซึ่งเทียบเท่ากับการใช้น้ำอาบของคุณเป็นเวลาหลายเดือน! ยิ่งอุปกรณ์มีขนาดใหญ่และมีความซับซ้อนมากเท่าไหร่ ปริมาณน้ำที่ใช้ก็ยิ่งเพิ่มสูงขึ้นทวีคูณ เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>แล็ปท็อป (Laptop):</strong> ใช้น้ำประมาณ 190,000 ลิตรต่อเครื่อง</li>
          <li><strong>คอมพิวเตอร์ตั้งโต๊ะ (Desktop PC):</strong> ใช้น้ำประมาณ 280,000 ลิตรต่อเครื่อง</li>
          <li><strong>โทรทัศน์ (TV):</strong> ใช้น้ำประมาณ 150,000 ลิตรต่อเครื่อง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมการยืดอายุการใช้งานถึงเป็นทางออกที่ดีที่สุด?</h3>
        <p>
          ในยุคที่เทคโนโลยีเปลี่ยนผ่านอย่างรวดเร็ว โทรศัพท์มือถือรุ่นใหม่ออกมาทุกปี การเปลี่ยนอุปกรณ์ใหม่บ่อยๆ ไม่ได้แปลว่าคุณแค่เสียเงินซื้อของใหม่ แต่หมายถึงคุณกำลังสร้างความต้องการ (Demand) ให้โรงงานอุตสาหกรรมต้องสูบน้ำสะอาดอีกหลายหมื่นหลายแสนลิตรมาเพื่อผลิตอุปกรณ์ชิ้นใหม่ให้คุณ ท่ามกลางสถานการณ์ที่หลายพื้นที่ทั่วโลกกำลังเผชิญกับภาวะขาดแคลนน้ำจืด
        </p>
        <p>
          <strong>โปรแกรมคำนวณรอยเท้าน้ำในขยะอิเล็กทรอนิกส์</strong> ของเรา สร้างขึ้นเพื่อเป็นเครื่องมือสะกิดเตือนใจ ให้เห็นภาพรวมของทรัพยากรน้ำที่สูญเสียไป หากเราเข้าใจถึงมูลค่าทรัพยากรที่แท้จริงที่ซ่อนอยู่ เราอาจจะดูแลรักษาและใช้งานอุปกรณ์เครื่องเดิมให้นานที่สุด ซ่อมแซมเมื่อชำรุดแทนที่จะทิ้งทันที หรือเลือกซื้ออุปกรณ์มือสอง 
        </p>
        <p>
          นอกจากนี้ เมื่อถึงเวลาต้องทิ้งจริงๆ ควรส่งเข้าสู่กระบวนการ <strong>รีไซเคิลอย่างถูกต้อง</strong> (E-waste Recycling) เพื่อนำแร่ธาตุเหล่านั้นกลับมาหมุนเวียนใช้ใหม่ ช่วยลดความจำเป็นในการเปิดเหมืองแร่และลดการใช้น้ำในกระบวนการผลิตใหม่ได้อย่างยั่งยืน
        </p>
      </div>
    </div>
  );
}
