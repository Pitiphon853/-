import React, { useState } from 'react';
import { Percent, Calculator } from 'lucide-react';

export default function RentalYieldCalculator({ lang }: any) {
  const isTH = lang === 'TH';
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [monthlyRent, setMonthlyRent] = useState<number>(25000);
  const [annualMaintenance, setAnnualMaintenance] = useState<number>(20000);
  const [propertyTax, setPropertyTax] = useState<number>(1000);
  const [insurance, setInsurance] = useState<number>(3000);
  const [otherExpenses, setOtherExpenses] = useState<number>(25000);

  const annualRent = monthlyRent * 12;
  const totalAnnualExpenses = annualMaintenance + propertyTax + insurance + otherExpenses;
  
  const grossYield = (annualRent / propertyValue) * 100;
  const netYield = ((annualRent - totalAnnualExpenses) / propertyValue) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Percent className="w-8 h-8 text-purple-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณอัตราผลตอบแทนจากการปล่อยเช่า (Rental Yield)' : 'Rental Yield Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'มูลค่าอสังหาริมทรัพย์ (บาท)' : 'Property Value (THB)'}</label>
            <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าเช่ารายเดือน (บาท)' : 'Monthly Rent (THB)'}</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
          
          <h3 className="font-semibold text-gray-800 mt-6 pt-4 border-t">{isTH ? 'ค่าใช้จ่ายรายปี' : 'Annual Expenses'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าบำรุงรักษา/ส่วนกลาง' : 'Maintenance/Common'}</label>
              <input type="number" value={annualMaintenance} onChange={(e) => setAnnualMaintenance(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ภาษีที่ดินฯ' : 'Property Tax'}</label>
              <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ประกันภัย' : 'Insurance'}</label>
              <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'อื่นๆ (เช่น ค่านายหน้า)' : 'Others (Agency fee)'}</label>
              <input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex flex-col">
          <h2 className="text-xl font-semibold text-purple-900 mb-6">{isTH ? 'ผลลัพธ์อัตราผลตอบแทน' : 'Yield Results'}</h2>
          
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <span className="block text-sm text-gray-600 mb-1">{isTH ? 'Gross Rental Yield (ก่อนหักค่าใช้จ่าย)' : 'Gross Rental Yield'}</span>
            <span className="text-3xl font-bold text-gray-800">{grossYield.toFixed(2)}%</span>
            <p className="text-xs text-gray-500 mt-1">{isTH ? 'รายได้รวมทั้งปีเทียบกับราคาบ้าน' : 'Annual rent vs property value'}</p>
          </div>

          <div className="bg-purple-600 p-4 rounded-lg shadow-sm text-white flex-1 flex flex-col justify-center">
            <span className="block text-sm text-purple-100 mb-1">{isTH ? 'Net Rental Yield (ผลตอบแทนสุทธิ)' : 'Net Rental Yield'}</span>
            <span className="text-5xl font-extrabold">{netYield.toFixed(2)}%</span>
            <p className="text-sm text-purple-200 mt-2">{isTH ? 'หักลบค่าใช้จ่ายรายปีทั้งหมดแล้ว' : 'After deducting all annual expenses'}</p>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-purple max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'Rental Yield คืออะไร? วิธีคำนวณผลตอบแทนให้รู้ชัดก่อนลงทุนอสังหาฯ' : 'Understanding Rental Yield in Property Investment'}
        </h2>
        {isTH ? (
          <>
            <p>Rental Yield หรือ อัตราผลตอบแทนจากการปล่อยเช่า เป็นตัวเลขสำคัญที่นักลงทุนอสังหาริมทรัพย์ใช้เป็นเกณฑ์ชี้วัดว่า อสังหาฯ ชิ้นนั้นมีความคุ้มค่าที่จะซื้อเพื่อลงทุนหรือไม่ ยิ่งตัวเลขเปอร์เซ็นต์นี้สูง ก็แปลว่าคุณจะได้รับผลกำไรต่อปีมากเมื่อเทียบกับเงินก้อนที่จ่ายไป</p>
            <h3>Gross Rental Yield (ผลตอบแทนรวม)</h3>
            <p>Gross Yield คือการนำรายได้จากค่าเช่าทั้งปี มาหารด้วยราคาอสังหาริมทรัพย์ แล้วคูณด้วย 100 เป็นการคิดแบบรวบรัดเพื่อให้เห็นภาพรวมเบื้องต้นอย่างรวดเร็ว แต่วิธีนี้อาจหลอกตาได้ เพราะยังไม่ได้หักต้นทุนค่าใช้จ่ายแฝงที่คุณต้องแบกรับ</p>
            <h3>Net Rental Yield (ผลตอบแทนสุทธิ)</h3>
            <p>Net Yield คือผลตอบแทนที่แท้จริง เพราะนำรายได้ค่าเช่ารายปี มาหักลบกับ "รายจ่ายรายปี" เสียก่อน รายจ่ายเหล่านี้ได้แก่ ค่าบำรุงรักษาส่วนกลาง, ค่าเบี้ยประกันอัคคีภัย, ภาษีที่ดินและสิ่งปลูกสร้าง, ค่านายหน้าหรือเอเจนซี่จัดหาคนเช่า รวมถึงเผื่อช่วงเวลาที่ห้องว่างไม่มีคนเช่า (Vacancy Rate) เมื่อนำรายได้สุทธิมาหารกับราคาประเมิน จะได้ตัวเลขที่สะท้อนความเป็นจริงมากที่สุด</p>
            <h3>ตัวเลขที่เหมาะสมควรเป็นเท่าไหร่?</h3>
            <p>สำหรับประเทศไทย โดยทั่วไปอัตราผลตอบแทน (Net Yield) ที่นักลงทุนคาดหวังมักจะอยู่ที่ประมาณ 4% ถึง 6% ขึ้นไป หากอสังหาฯ นั้นมีตัวเลขต่ำกว่าดอกเบี้ยเงินกู้ (ในกรณีที่คุณกู้สินเชื่อมาซื้อ) คุณอาจจะตกอยู่ในภาวะขาดทุนกระแสเงินสดรายเดือนได้ ดังนั้น ก่อนตัดสินใจโอนกรรมสิทธิ์หรือมัดจำ ควรนำตัวเลขมาคำนวณในเครื่องคำนวณ Rental Yield ของเราเสมอ เพื่อให้มั่นใจว่าการลงทุนของคุณจะออกดอกออกผลอย่างงดงาม</p>
          </>
        ) : (
          <p>Rental Yield is a crucial metric for property investors. It measures the return on investment generated by rental income relative to the property's purchase price. Gross Yield offers a quick look, but Net Yield—which deducts expenses like maintenance, taxes, and insurance—provides the true picture of profitability. A healthy Net Yield typically ranges from 4% to 6% or higher. Use this calculator to evaluate potential investments and ensure they meet your financial goals.</p>
        )}
      </article>
    </div>
  );
}
