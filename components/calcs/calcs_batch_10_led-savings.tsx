import React, { useState } from 'react';
import { Lightbulb, Calculator, Zap, DollarSign, Info } from 'lucide-react';

export default function LEDSavingsCalculator({ lang }: any) {
  const [bulbCount, setBulbCount] = useState<number>(10);
  const [oldWatt, setOldWatt] = useState<number>(60);
  const [newWatt, setNewWatt] = useState<number>(9);
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [electricityRate, setElectricityRate] = useState<number>(5.0);

  const energySavedPerDay = bulbCount * (oldWatt - newWatt) * hoursPerDay / 1000;
  const energySavedPerYear = energySavedPerDay * 365;
  const costSavedPerYear = energySavedPerYear * electricityRate;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full text-green-600">
          <Lightbulb size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'LED Savings Calculator' : 'โปรแกรมคำนวณพลังงานที่ประหยัดได้จากเปลี่ยน LED'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Number of Bulbs' : 'จำนวนหลอดไฟ (หลอด)'}
            </label>
            <input
              type="number"
              min="1"
              value={bulbCount}
              onChange={(e) => setBulbCount(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Old Bulb Wattage (W)' : 'กำลังไฟหลอดเดิม (วัตต์)'}
              </label>
              <input
                type="number"
                min="1"
                value={oldWatt}
                onChange={(e) => setOldWatt(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'New LED Wattage (W)' : 'กำลังไฟหลอด LED ใหม่ (วัตต์)'}
              </label>
              <input
                type="number"
                min="1"
                value={newWatt}
                onChange={(e) => setNewWatt(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Usage Hours per Day' : 'ชั่วโมงการใช้งานต่อวัน (ชั่วโมง)'}
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Electricity Rate (Baht/kWh)' : 'ค่าไฟฟ้าระบุต่อหน่วย (บาท/หน่วย)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={electricityRate}
              onChange={(e) => setElectricityRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Savings Results (Per Year)' : 'ผลลัพธ์การประหยัด (ต่อปี)'}
            </h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-300" />
                  <span>{lang === 'EN' ? 'Energy Saved' : 'ประหยัดพลังงานได้'}</span>
                </div>
                <div className="text-2xl font-bold text-right">
                  {energySavedPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-normal">kWh/yr</span>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-green-300" />
                  <span>{lang === 'EN' ? 'Money Saved' : 'ประหยัดเงินได้'}</span>
                </div>
                <div className="text-2xl font-bold text-right">
                  {costSavedPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-normal">{lang === 'EN' ? 'Baht' : 'บาท'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-green-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Replacing old incandescent or fluorescent bulbs with LED can significantly reduce both energy consumption and carbon footprint.'
                  : 'การเปลี่ยนหลอดไส้หรือฟลูออเรสเซนต์เดิมเป็นหลอด LED ช่วยลดการใช้พลังงานและลดการปล่อยคาร์บอนฟุตพริ้นท์ได้อย่างมาก'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-green max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ทำไมการเปลี่ยนมาใช้หลอดไฟ LED จึงสำคัญต่อกระเป๋าเงินและโลกของเรา?
        </h2>
        <p>
          ในยุคที่ค่าไฟฟ้ามีแนวโน้มปรับตัวสูงขึ้นอย่างต่อเนื่อง และปัญหาภาวะโลกร้อนกำลังเป็นที่น่ากังวล การมองหาวิธีประหยัดพลังงานในชีวิตประจำวันจึงเป็นสิ่งที่ทุกคนไม่ควรมองข้าม หนึ่งในวิธีที่ทำได้ง่ายและเห็นผลลัพธ์ได้อย่างชัดเจนที่สุดคือ <strong>การเปลี่ยนมาใช้หลอดไฟ LED</strong> (Light Emitting Diode) ซึ่งไม่เพียงแต่จะช่วยประหยัดเงินในกระเป๋าของคุณเท่านั้น แต่ยังเป็นมิตรต่อสิ่งแวดล้อมอีกด้วย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หลอดไฟ LED ประหยัดพลังงานได้อย่างไร?</h3>
        <p>
          หากเปรียบเทียบกับหลอดไส้ (Incandescent) แบบดั้งเดิม หลอดไฟ LED สามารถประหยัดพลังงานได้มากถึง 80-90% และประหยัดกว่าหลอดฟลูออเรสเซนต์ (Fluorescent) หรือหลอดตะเกียบประมาณ 40-50% สาเหตุหลักมาจากเทคโนโลยีของ LED ที่เปลี่ยนพลังงานไฟฟ้าเกือบทั้งหมดให้เป็นแสงสว่างโดยตรง ต่างจากหลอดไส้ที่สูญเสียพลังงานส่วนใหญ่ไปในรูปของความร้อน 
        </p>
        <p>
          การที่หลอดไฟ LED ปล่อยความร้อนออกมาน้อยมาก ยังช่วยลดภาระการทำงานของเครื่องปรับอากาศภายในห้อง ทำให้คุณประหยัดค่าไฟได้สองต่อ ทั้งจากตัวหลอดไฟเองและจากแอร์ที่ทำงานน้อยลง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">อายุการใช้งานที่ยาวนาน คุ้มค่าในระยะยาว</h3>
        <p>
          หลอดไฟ LED มีอายุการใช้งานยาวนานถึง 15,000 - 50,000 ชั่วโมง ขึ้นอยู่กับแบรนด์และคุณภาพ ซึ่งยาวนานกว่าหลอดไส้ถึง 20-25 เท่า และยาวนานกว่าหลอดฟลูออเรสเซนต์ 2-5 เท่า แม้ว่าราคาเริ่มต้นของหลอด LED อาจจะสูงกว่าหลอดประเภทอื่นเล็กน้อย แต่เมื่อคำนวณรวมกับค่าไฟฟ้าที่ประหยัดได้ตลอดอายุการใช้งานและการที่ไม่ต้องเปลี่ยนหลอดไฟบ่อยๆ ถือเป็นการลงทุนที่คุ้มค่าอย่างแน่นอน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำนวณจุดคุ้มทุนได้ง่ายๆ ด้วยโปรแกรมของเรา</h3>
        <p>
          หลายคนอาจสงสัยว่าการลงทุนเปลี่ยนหลอดไฟทั้งบ้านจะคุ้มค่าเมื่อไร ด้วย <strong>โปรแกรมคำนวณพลังงานที่ประหยัดได้จากเปลี่ยน LED</strong> ของเรา คุณสามารถระบุจำนวนหลอดไฟที่ต้องการเปลี่ยน กำลังไฟของหลอดเดิม กำลังไฟของหลอด LED ใหม่ ชั่วโมงการใช้งานโดยเฉลี่ยต่อวัน และอัตราค่าไฟฟ้าต่อหน่วย ระบบจะคำนวณออกมาเป็นตัวเลขที่ชัดเจนว่าคุณจะประหยัดพลังงานไฟฟ้าได้กี่หน่วย (kWh) ต่อปี และคิดเป็นจำนวนเงินที่ประหยัดได้กี่บาทต่อปี ทำให้คุณตัดสินใจได้ง่ายขึ้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ด้านสิ่งแวดล้อม (Environmental Benefits)</h3>
        <p>
          นอกจากประโยชน์ส่วนตัวในด้านการประหยัดค่าใช้จ่ายแล้ว การเปลี่ยนมาใช้ LED ยังส่งผลดีต่อโลกของเราในหลายมิติ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ลดการปล่อยก๊าซเรือนกระจก:</strong> การใช้พลังงานไฟฟ้าน้อยลง หมายถึงการลดการเผาไหม้เชื้อเพลิงฟอสซิลในโรงไฟฟ้า ซึ่งเป็นสาเหตุหลักของก๊าซคาร์บอนไดออกไซด์ (CO₂)</li>
          <li><strong>ไม่มีสารพิษอันตราย:</strong> หลอดฟลูออเรสเซนต์มักมีส่วนประกอบของสารปรอท ซึ่งเป็นอันตรายหากหลอดแตกและยากต่อการกำจัด ในขณะที่หลอด LED ไม่มีสารปรอทและสารพิษอื่นๆ ปลอดภัยต่อผู้ใช้และสิ่งแวดล้อม</li>
          <li><strong>ลดปริมาณขยะอิเล็กทรอนิกส์:</strong> ด้วยอายุการใช้งานที่ยาวนาน ทำให้ลดความถี่ในการทิ้งหลอดไฟเก่า ช่วยลดปริมาณขยะและภาระในการจัดการขยะมูลฝอย</li>
        </ul>
        
        <p>
          เริ่มต้นสร้างความเปลี่ยนแปลงง่ายๆ ที่บ้านหรือที่ทำงานของคุณตั้งแต่วันนี้ ลองนำใบแจ้งหนี้ค่าไฟฟ้ามาคำนวณและวางแผนการเปลี่ยนหลอดไฟทีละจุด คุณจะประหลาดใจกับผลลัพธ์ทั้งในด้านบิลค่าไฟที่ลดลงและการได้ร่วมเป็นส่วนหนึ่งในการอนุรักษ์สิ่งแวดล้อม
        </p>
      </div>
    </div>
  );
}
