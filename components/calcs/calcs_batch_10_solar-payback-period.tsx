import React, { useState } from 'react';
import { Sun, Calculator, DollarSign, Calendar, Zap, Info } from 'lucide-react';

export default function SolarPaybackPeriodCalculator({ lang }: any) {
  const [systemCost, setSystemCost] = useState<number>(150000);
  const [capacity, setCapacity] = useState<number>(5); // kW
  const [sunHours, setSunHours] = useState<number>(4.5); // hours/day
  const [electricityRate, setElectricityRate] = useState<number>(5.0); // Baht/kWh

  // Basic calculation
  // Energy per day = capacity (kW) * sun hours
  const energyPerDay = capacity * sunHours;
  // Energy per year = energy per day * 365
  const energyPerYear = energyPerDay * 365;
  // Savings per year = energy per year * electricity rate
  const annualSavings = energyPerYear * electricityRate;
  // Payback period = system cost / annual savings
  const paybackPeriod = annualSavings > 0 ? systemCost / annualSavings : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-full text-orange-600">
          <Sun size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Solar Payback Period Calculator' : 'โปรแกรมคำนวณระยะเวลาคืนทุนแผงโซลาร์'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Total Installation Cost (Baht)' : 'ค่าใช้จ่ายการติดตั้งระบบทั้งหมด (บาท)'}
            </label>
            <input
              type="number"
              min="0"
              value={systemCost}
              onChange={(e) => setSystemCost(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'System Capacity (kW)' : 'ขนาดกำลังผลิตของระบบโซลาร์ (กิโลวัตต์ - kW)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Average Peak Sun Hours / Day' : 'ชั่วโมงแสงแดดเฉลี่ยต่อวัน (ชั่วโมง/วัน)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              max="12"
              value={sunHours}
              onChange={(e) => setSunHours(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'EN' ? 'Typically 4 to 5 hours in Thailand.' : 'สำหรับประเทศไทยโดยเฉลี่ยอยู่ที่ประมาณ 4 - 5 ชั่วโมงต่อวัน'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Electricity Rate (Baht/kWh)' : 'อัตราค่าไฟฟ้า (บาท/หน่วย)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={electricityRate}
              onChange={(e) => setElectricityRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Estimation Results' : 'ผลการประเมินเบื้องต้น'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-200" />
                  <span>{lang === 'EN' ? 'Annual Energy Gen.' : 'พลังงานที่ผลิตได้ต่อปี'}</span>
                </div>
                <div className="text-xl font-bold text-right">
                  {energyPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">kWh</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-green-200" />
                  <span>{lang === 'EN' ? 'Annual Savings' : 'ประหยัดค่าไฟได้ต่อปี'}</span>
                </div>
                <div className="text-xl font-bold text-right">
                  {annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">{lang === 'EN' ? 'Baht' : 'บาท'}</span>
                </div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg flex items-center justify-between border border-orange-300/50">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-blue-100" />
                  <span className="font-semibold">{lang === 'EN' ? 'Payback Period' : 'ระยะเวลาคืนทุน (โดยประมาณ)'}</span>
                </div>
                <div className="text-3xl font-extrabold text-right">
                  {paybackPeriod > 0 ? paybackPeriod.toFixed(1) : '-'} <span className="text-base font-normal">{lang === 'EN' ? 'Years' : 'ปี'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-orange-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'This is a basic estimation assuming constant usage matching generation and no degradation. Real payback may vary based on self-consumption ratio and maintenance.'
                  : 'การคำนวณนี้เป็นการประเมินเบื้องต้น โดยสมมติว่าใช้ไฟหมดพอดีกับที่ผลิตได้และไม่มีการเสื่อมสภาพ ระยะเวลาคืนทุนจริงอาจแตกต่างกันไปตามพฤติกรรมการใช้ไฟและค่าบำรุงรักษา'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-orange max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ทำไมการติดตั้งระบบโซลาร์เซลล์ (Solar Rooftop) ถึงได้รับความนิยม?
        </h2>
        <p>
          ในปัจจุบันที่สภาพอากาศร้อนขึ้นและอัตราค่าไฟฟ้ายิ่งทวีความสูงขึ้นเรื่อยๆ การติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคา หรือ <strong>Solar Rooftop</strong> ได้กลายมาเป็นหนึ่งในทางเลือกที่น่าสนใจที่สุดสำหรับภาคครัวเรือนและธุรกิจ ไม่เพียงแต่ช่วยลดบิลค่าไฟฟ้าในแต่ละเดือนได้อย่างเป็นกอบเป็นกำ แต่ยังถือเป็นการลงทุนระยะยาวที่ให้ผลตอบแทนคุ้มค่า และช่วยลดการปล่อยก๊าซเรือนกระจกซึ่งเป็นสาเหตุหลักของภาวะโลกร้อนอีกด้วย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยหลักในการคำนวณระยะเวลาคืนทุน (Payback Period)</h3>
        <p>
          ก่อนที่จะตัดสินใจลงทุนติดตั้งระบบโซลาร์เซลล์ คำถามยอดฮิตคือ "กี่ปีถึงจะคืนทุน?" การหาระยะเวลาจุดคุ้มทุนนั้นขึ้นอยู่กับตัวแปรหลักๆ ดังต่อไปนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ต้นทุนการติดตั้งทั้งหมด (System Cost):</strong> รวมถึงราคาแผงโซลาร์ อินเวอร์เตอร์ (Inverter) อุปกรณ์ยึดจับ สายไฟ และค่าแรงช่าง ยิ่งคุณได้ราคาต่อกิโลวัตต์ที่คุ้มค่า ระยะเวลาคืนทุนก็จะยิ่งสั้นลง</li>
          <li><strong>กำลังการผลิต (System Capacity):</strong> ขนาดของระบบ (หน่วยเป็นกิโลวัตต์ หรือ kW) ยิ่งขนาดใหญ่ ต้นทุนรวมสูงขึ้น แต่ปริมาณไฟฟ้าที่ผลิตได้ก็มากขึ้นตามไปด้วย ซึ่งการเลือกขนาดควรสอดคล้องกับพฤติกรรมการใช้ไฟฟ้าในตอนกลางวันของคุณ</li>
          <li><strong>ปริมาณแสงแดดเฉลี่ย (Peak Sun Hours):</strong> ประเทศไทยมีความได้เปรียบสูงมากในเรื่องนี้ โดยเฉลี่ยแล้วเรามีชั่วโมงที่มีแดดเข้มข้น (Peak Sun Hours) ประมาณ 4-5 ชั่วโมงต่อวัน ทำให้ผลิตไฟฟ้าได้เต็มเม็ดเต็มหน่วย</li>
          <li><strong>อัตราค่าไฟฟ้า (Electricity Rate):</strong> หากอัตราค่าไฟฟ้าต่อหน่วยสูงขึ้น มูลค่าของไฟฟ้าที่คุณประหยัดได้ก็จะสูงขึ้นตาม ทำให้ระยะเวลาคืนทุนสั้นลง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคิดคำนวณแบบง่ายๆ</h3>
        <p>
          หลักการคำนวณเบื้องต้นสามารถทำได้โดยเริ่มจากการคำนวณ <strong>ปริมาณไฟฟ้าที่ผลิตได้ต่อปี</strong> (กิโลวัตต์-ชั่วโมง หรือ หน่วย) = ขนาดระบบ (kW) x จำนวนชั่วโมงแดดเฉลี่ยต่อวัน x 365 วัน
        </p>
        <p>
          จากนั้น นำไปคำนวณหา <strong>ค่าไฟที่ประหยัดได้ต่อปี</strong> = ปริมาณไฟฟ้าที่ผลิตได้ต่อปี x อัตราค่าไฟฟ้าต่อหน่วย 
        </p>
        <p>
          เมื่อได้ค่าประหยัดรายปีแล้ว ก็นำ <strong>ต้นทุนการติดตั้งระบบ</strong> มาหารด้วย <strong>ค่าไฟที่ประหยัดได้ต่อปี</strong> ผลลัพธ์ที่ได้คือจำนวนปีที่คุณจะถึง <strong>จุดคุ้มทุน (Payback Period)</strong> นั่นเอง 
        </p>
        <p>
          <em>ยกตัวอย่าง:</em> หากติดตั้งระบบ 5 kW ราคา 150,000 บาท ผลิตไฟได้เฉลี่ยวันละ 22.5 หน่วย (สมมติแดด 4.5 ชม.) ปีหนึ่งผลิตได้ประมาณ 8,212 หน่วย หากค่าไฟหน่วยละ 5 บาท จะประหยัดได้ปีละประมาณ 41,060 บาท ระยะเวลาคืนทุนจะอยู่ที่ 150,000 / 41,060 = <strong>ประมาณ 3.65 ปี</strong> เท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สิ่งที่ต้องพิจารณาเพิ่มเติม</h3>
        <p>
          เพื่อให้การคำนวณแม่นยำยิ่งขึ้น ควรคำนึงถึง <strong>พฤติกรรมการใช้ไฟ (Load Profile)</strong> หากคุณไม่ได้อยู่บ้านในตอนกลางวันและไม่มีแบตเตอรี่กักเก็บ การผลิตไฟได้มากอาจเกิดการ "ไหลย้อน" กลับสู่ระบบการไฟฟ้า (หากไม่ได้เข้าร่วมโครงการขายไฟคืน) ซึ่งอาจทำให้สูญเสียความคุ้มค่าไปบางส่วน นอกจากนี้ ควรเผื่ออัตราการเสื่อมสภาพของแผงโซลาร์ (ประมาณ 0.5% - 0.8% ต่อปี) และค่าใช้จ่ายในการล้างแผงและบำรุงรักษาระบบ (Maintenance Cost) เข้าไปพิจารณาด้วย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">พลังงานสะอาดเพื่อความยั่งยืน</h3>
        <p>
          การเปลี่ยนมาใช้พลังงานแสงอาทิตย์ นอกจากจะช่วยให้คุณประหยัดเงินในกระเป๋าแล้ว ยังเป็นการมีส่วนร่วมอย่างแข็งขันในการใช้ <strong>พลังงานหมุนเวียน (Renewable Energy)</strong> ลดการพึ่งพาพลังงานฟอสซิลที่ก่อมลพิษ โปรแกรมคำนวณระยะเวลาคืนทุนของเราจึงเป็นเครื่องมือเบื้องต้นที่ดีเยี่ยมที่จะช่วยให้คุณวางแผนการเงินและการลงทุนเพื่อสิ่งแวดล้อมได้อย่างมั่นใจ
        </p>
      </div>
    </div>
  );
}
