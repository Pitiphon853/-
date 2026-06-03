import React, { useState } from 'react';
import { TrendingDown, Car } from 'lucide-react';

export default function CarDepreciationCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [firstYearDrop, setFirstYearDrop] = useState(20);
  const [yearlyDrop, setYearlyDrop] = useState(15);
  const [yearsToCalc, setYearsToCalc] = useState(10);

  const calculateDepreciation = () => {
    let currentVal = purchasePrice;
    const table = [];
    
    // Year 0
    table.push({ year: 0, value: currentVal, loss: 0 });
    
    for (let i = 1; i <= yearsToCalc; i++) {
      const dropRate = i === 1 ? firstYearDrop : yearlyDrop;
      const loss = currentVal * (dropRate / 100);
      currentVal = currentVal - loss;
      
      table.push({
        year: i,
        value: currentVal,
        loss: loss,
        totalLoss: purchasePrice - currentVal
      });
    }
    
    return table;
  };

  const schedule = calculateDepreciation();
  const finalValue = schedule[schedule.length - 1].value;
  const totalDepreciated = purchasePrice - finalValue;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <TrendingDown className="w-8 h-8 text-rose-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'เครื่องคำนวณค่าเสื่อมราคารถยนต์' : 'Car Depreciation Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'TH' ? 'ราคารถใหม่ (บาท)' : 'Purchase Price (THB)'}
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'อัตราตกปีแรก (%)' : '1st Year Drop (%)'}
              </label>
              <input
                type="number"
                value={firstYearDrop}
                onChange={(e) => setFirstYearDrop(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'อัตราตกปีถัดไป (%)' : 'Subsequent Drop (%)'}
              </label>
              <input
                type="number"
                value={yearlyDrop}
                onChange={(e) => setYearlyDrop(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'TH' ? 'คำนวณล่วงหน้ากี่ปี' : 'Years to Calculate'}
            </label>
            <input
              type="number"
              value={yearsToCalc}
              max="20"
              onChange={(e) => setYearsToCalc(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-rose-800 mb-4">
            {lang === 'TH' ? `มูลค่าคงเหลือเมื่อผ่านไป ${yearsToCalc} ปี` : `Value after ${yearsToCalc} years`}
          </h3>
          <p className="text-4xl font-bold text-rose-600 mb-2">
            ฿{finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <div className="mt-4 pt-4 border-t border-rose-200">
            <p className="text-sm text-rose-700 mb-1">
              {lang === 'TH' ? 'มูลค่าที่หายไปทั้งหมด (ขาดทุน)' : 'Total Depreciated Value'}
            </p>
            <p className="text-xl font-bold text-gray-800">
              ฿{totalDepreciated.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="p-3 font-semibold text-gray-700">{lang === 'TH' ? 'ปีที่' : 'Year'}</th>
              <th className="p-3 font-semibold text-gray-700">{lang === 'TH' ? 'มูลค่ารถคงเหลือ' : 'Remaining Value'}</th>
              <th className="p-3 font-semibold text-gray-700">{lang === 'TH' ? 'มูลค่าที่ลดลงปีนี้' : 'Value Lost This Year'}</th>
              <th className="p-3 font-semibold text-gray-700">{lang === 'TH' ? 'ลดลงสะสม' : 'Total Loss'}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.year} className={`border-b border-gray-100 ${row.year === 0 ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'}`}>
                <td className="p-3">{row.year}</td>
                <td className="p-3 text-blue-600 font-medium">฿{row.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td className="p-3 text-rose-500">{row.year === 0 ? '-' : `฿${row.loss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</td>
                <td className="p-3 text-gray-600">{row.year === 0 ? '-' : `฿${row.totalLoss?.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ค่าเสื่อมราคารถยนต์ (Car Depreciation) คืออะไร?
        </h2>
        <p>
          <strong>ค่าเสื่อมราคารถยนต์</strong> คือการลดลงของมูลค่ารถยนต์เมื่อเวลาผ่านไป นับตั้งแต่วินาทีแรกที่คุณขับรถออกจากโชว์รูม 
          มูลค่าของรถป้ายแดงก็จะลดลงทันทีประมาณ 10-20% ซึ่งค่าเสื่อมราคานี้ถือเป็น "ต้นทุนแฝง" (Hidden Cost) 
          ที่ใหญ่ที่สุดในการเป็นเจ้าของรถยนต์ แต่คนส่วนใหญ่มักไม่ค่อยนึกถึงจนกว่าจะถึงเวลาที่ต้องการขายรถเพื่อเปลี่ยนคันใหม่
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมราคารถถึงตก?</h3>
        <p>มีหลายปัจจัยที่ทำให้มูลค่าของรถลดลง ได้แก่:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>อายุการใช้งานและระยะทาง (Mileage):</strong> ยิ่งรถเก่าและเลขไมล์เยอะ ชิ้นส่วนต่างๆ ก็ยิ่งสึกหรอ ทำให้ราคาขายต่อตก</li>
          <li><strong>ความนิยมของแบรนด์ (Brand Popularity):</strong> ในประเทศไทย รถตลาดอย่างแบรนด์ญี่ปุ่นยอดนิยม มักจะราคาแข็งและขายต่อง่ายกว่าแบรนด์ยุโรปหรือแบรนด์น้องใหม่</li>
          <li><strong>การเปิดตัวรุ่นใหม่ (New Models):</strong> เมื่อค่ายรถออกโฉมใหม่ (Minor/Major Change) โฉมเก่าจะตกรุ่นและราคาตกลงทันที</li>
          <li><strong>สภาพรถและประวัติการซ่อม:</strong> รถที่ไม่เคยชนหนัก และมีประวัติเข้าศูนย์เช็คระยะสม่ำเสมอ จะรักษามูลค่าได้ดีกว่า</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">หลักการคำนวณค่าเสื่อมแบบง่าย</h3>
        <p>
          โดยทั่วไป <strong>ปีแรก</strong> มูลค่ารถมักจะลดลงมากที่สุด เฉลี่ยประมาณ 15-25% จากราคารถใหม่ 
          จากนั้น <strong>ปีที่ 2-5</strong> จะลดลงเฉลี่ยประมาณ 10-15% ต่อปีแบบทบต้น (ลดจากมูลค่าของปีที่แล้ว ไม่ใช่จากราคาเริ่มต้น) 
          เมื่อผ่านไป 5 ปี รถยนต์ส่วนใหญ่จะมีมูลค่าเหลือเพียงประมาณ 40-50% ของราคาเดิม
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีลดผลกระทบจากค่าเสื่อมราคา</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ซื้อรถมือสองสภาพดี:</strong> ผู้ที่ซื้อรถมือสองปีที่ 2 หรือ 3 จะได้ประโยชน์สูงสุด เพราะผู้ซื้อรถมือแรกรับภาระค่าเสื่อมราคาที่หนักที่สุดในปีแรกไปแล้ว</li>
          <li><strong>เลือกรถสียอดนิยม:</strong> รถสีขาว ดำ และเทา/เงิน มักจะขายต่อง่ายและได้ราคาดีกว่าสีแปลกๆ</li>
          <li><strong>ดูแลรักษารถให้ดี:</strong> เก็บสมุดคู่มือการเช็คระยะและใบเสร็จการซ่อมบำรุงไว้ เพื่อเป็นหลักฐานให้ผู้ซื้อหรือเต็นท์รถเห็นว่ารถได้รับการดูแลมาอย่างดี</li>
          <li><strong>ใช้รถให้นานขึ้น:</strong> หากคุณไม่ได้เปลี่ยนรถบ่อยๆ ค่าเสื่อมราคาในแต่ละปีเมื่อเฉลี่ยออกมาแล้วจะดูน้อยลง การขับรถคันเดิม 7-10 ปี จะช่วยประหยัดเงินได้มากที่สุด</li>
        </ul>
      </article>
    </div>
  );
}
