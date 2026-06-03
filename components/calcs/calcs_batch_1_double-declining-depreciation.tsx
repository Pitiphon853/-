import React, { useState } from 'react';
import { TrendingDown, HelpCircle } from 'lucide-react';

export default function DoubleDecliningDepreciation({ lang }: any) {
  const [cost, setCost] = useState<number | string>('');
  const [salvage, setSalvage] = useState<number | string>('');
  const [life, setLife] = useState<number | string>('');

  const initialCost = Number(cost) || 0;
  const salvageValue = Number(salvage) || 0;
  const usefulLife = Number(life) || 0;

  const calculateDepreciation = () => {
    if (initialCost <= 0 || usefulLife <= 0) return [];
    
    const rate = (1 / usefulLife) * 2;
    let currentBookValue = initialCost;
    const schedule = [];

    for (let year = 1; year <= usefulLife; year++) {
      let depreciationExpense = currentBookValue * rate;
      
      if (currentBookValue - depreciationExpense < salvageValue) {
        depreciationExpense = currentBookValue - salvageValue;
      }
      
      if (year === usefulLife && currentBookValue - depreciationExpense > salvageValue) {
        depreciationExpense = currentBookValue - salvageValue;
      }

      if (depreciationExpense < 0) depreciationExpense = 0;

      const newBookValue = currentBookValue - depreciationExpense;
      
      schedule.push({
        year,
        startValue: currentBookValue,
        depreciation: depreciationExpense,
        endValue: newBookValue,
      });

      currentBookValue = newBookValue;
      
      if (currentBookValue <= salvageValue && year < usefulLife) {
          for(let remaining = year + 1; remaining <= usefulLife; remaining++){
              schedule.push({
                  year: remaining,
                  startValue: salvageValue,
                  depreciation: 0,
                  endValue: salvageValue
              });
          }
          break;
      }
    }
    return schedule;
  };

  const schedule = calculateDepreciation();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-indigo-100 rounded-full">
          <TrendingDown className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณค่าเสื่อมราคาแบบยอดลดลงทวีคูณ (Double Declining Balance)</h1>
          <p className="text-gray-500">คำนวณค่าเสื่อมราคาสินทรัพย์ที่ลดลงอย่างรวดเร็วในช่วงปีแรกๆ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ราคาทุน (Initial Cost)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="เช่น 1000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ราคาซาก (Salvage Value)</label>
          <input
            type="number"
            value={salvage}
            onChange={(e) => setSalvage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="เช่น 100000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">อายุการใช้งาน (ปี)</label>
          <input
            type="number"
            value={life}
            onChange={(e) => setLife(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="เช่น 5"
          />
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">ตารางค่าเสื่อมราคา</h2>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ปีที่</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">มูลค่าต้นปี</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ค่าเสื่อมราคา</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">มูลค่าปลายปี</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((row) => (
                <tr key={row.year} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{row.startValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">-{row.depreciation.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{row.endValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-indigo max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การคิดค่าเสื่อมราคาแบบยอดลดลงทวีคูณ (Double Declining Balance Depreciation) คืออะไร?</h2>
        
        <p>
          การคิดค่าเสื่อมราคา (Depreciation) คือการกระจายต้นทุนของสินทรัพย์ถาวรตลอดอายุการใช้งาน วิธีที่ได้รับความนิยมที่สุดคือแบบเส้นตรง (Straight-Line) ที่จะหักค่าเสื่อมด้วยจำนวนที่เท่ากันทุกปี 
          แต่ในความเป็นจริง สินทรัพย์บางประเภทมีประสิทธิภาพลดลงอย่างรวดเร็วในช่วงปีแรกๆ เช่น รถยนต์ หรือ คอมพิวเตอร์ จึงเป็นที่มาของการคิดค่าเสื่อมราคาแบบ <strong>ยอดลดลงทวีคูณ (Double Declining Balance หรือ DDB)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หลักการทำงานของ Double Declining Balance</h3>
        <p>
          วิธีแบบยอดลดลงทวีคูณ เป็นหนึ่งในวิธีการคิดค่าเสื่อมราคาแบบเร่งรัด (Accelerated Depreciation) โดยมีอัตราการหักค่าเสื่อมราคาเป็น <strong>"สองเท่า"</strong> ของอัตราค่าเสื่อมราคาแบบเส้นตรง 
          และจะนำอัตรานี้ไปคูณกับ "มูลค่าทางบัญชีที่เหลืออยู่ต้นปี (Book Value)" ซึ่งมูลค่านี้จะลดลงเรื่อยๆ ทุกปี ทำให้ค่าเสื่อมราคาในปีแรกๆ สูงมาก และค่อยๆ ลดลงในปีหลังๆ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ</h3>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono">
          <p>1. หาอัตราแบบเส้นตรง (Straight-Line Rate) = 100% / อายุการใช้งาน</p>
          <p>2. หาอัตราทวีคูณ (Double Declining Rate) = อัตราแบบเส้นตรง × 2</p>
          <p>3. ค่าเสื่อมราคาของปีนั้นๆ = มูลค่าทางบัญชีต้นปี × อัตราทวีคูณ</p>
        </div>
        <p>
          <strong>หมายเหตุสำคัญ:</strong> ไม่ว่าผลการคำนวณจะออกมาเท่าไร การหักค่าเสื่อมราคาสะสมจะต้องไม่ทำให้มูลค่าทางบัญชีสุทธิลดลงต่ำกว่า <strong>"ราคาซาก (Salvage Value)"</strong> ที่ประเมินไว้ 
          ดังนั้นในปีท้ายๆ ค่าเสื่อมราคาอาจจะต้องถูกปรับลดลงให้มูลค่าเหลือเท่ากับราคาซากพอดี
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
        <p>
          สมมติบริษัทซื้อเครื่องเซิร์ฟเวอร์มาราคา 1,000,000 บาท คาดว่าจะมีอายุการใช้งาน 5 ปี และมีราคาซาก 100,000 บาท
          <br/>- อัตราเส้นตรง = 100% / 5 = 20%
          <br/>- อัตรา DDB = 20% × 2 = 40%
        </p>
        <p>
          <strong>ปีที่ 1:</strong> ค่าเสื่อม = 1,000,000 × 40% = 400,000 บาท (มูลค่าเหลือ 600,000 บาท)<br/>
          <strong>ปีที่ 2:</strong> ค่าเสื่อม = 600,000 × 40% = 240,000 บาท (มูลค่าเหลือ 360,000 บาท)<br/>
          <strong>ปีที่ 3:</strong> ค่าเสื่อม = 360,000 × 40% = 144,000 บาท (มูลค่าเหลือ 216,000 บาท)<br/>
          <strong>ปีที่ 4:</strong> หากหัก 40% จาก 216,000 จะได้ 86,400 มูลค่าจะเหลือ 129,600 บาท<br/>
          <strong>ปีที่ 5:</strong> เพื่อไม่ให้ต่ำกว่าราคาซาก (100,000) ค่าเสื่อมปีสุดท้ายจะเป็นแค่ 29,600 บาท (129,600 - 100,000) เท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อดีและข้อเสียของการใช้วิธี DDB</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ข้อดีด้านภาษีและกระแสเงินสด:</strong> เนื่องจากหักค่าใช้จ่าย (ค่าเสื่อม) ได้จำนวนมากในช่วงแรกๆ ทำให้กำไรสุทธิทางบัญชีลดลง ส่งผลให้จ่ายภาษีเงินได้นิติบุคคลลดลงในช่วงต้น ประหยัดเงินสดไว้หมุนเวียนในธุรกิจได้มากขึ้น</li>
          <li><strong>สะท้อนความเป็นจริง:</strong> เหมาะสำหรับเทคโนโลยี สินค้าไอที และยานพาหนะที่ตกรุ่นเร็ว มีมูลค่าตกเร็วในปีแรกๆ ตลอดจนมีค่าซ่อมบำรุงสูงขึ้นในปีท้ายๆ ซึ่งค่าเสื่อมที่ลดลงจะมาช่วยถัวเฉลี่ยกับค่าซ่อมบำรุงที่เพิ่มขึ้น ทำให้รายจ่ายรวมของสินทรัพย์ต่อปีค่อนข้างคงที่</li>
          <li><strong>ข้อเสีย:</strong> กระทบต่อกำไรสุทธิอย่างรุนแรงในช่วงต้นของการลงทุน อาจทำให้ผลประกอบการดูไม่ดีในสายตานักลงทุน (หากไม่มีความเข้าใจที่มาของตัวเลข) และการบันทึกบัญชีมีความซับซ้อนกว่าแบบเส้นตรง</li>
        </ul>
        <p>
          การเลือกใช้วิธีการคิดค่าเสื่อมราคาควรปรึกษานักบัญชีเพื่อพิจารณาความเหมาะสมกับประเภทของสินทรัพย์ นโยบายบริษัท และให้ถูกต้องตามมาตรฐานการบัญชีและข้อบังคับของกรมสรรพากร
        </p>
      </article>
    </div>
  );
}
