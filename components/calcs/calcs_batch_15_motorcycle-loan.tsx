import React, { useState } from 'react';
import { Bike, DollarSign, Calendar, Percent } from 'lucide-react';

export default function MotorcycleLoanCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const [price, setPrice] = useState(65000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(1.5);
  const [rateType, setRateType] = useState('monthly'); // 'monthly' or 'yearly'
  const [termMonths, setTermMonths] = useState(36);

  // Calculations (Flat Rate)
  const principal = price - downPayment;
  
  // Calculate total interest
  let totalInterest = 0;
  if (rateType === 'monthly') {
    // e.g. 1.5% per month
    totalInterest = principal * (interestRate / 100) * termMonths;
  } else {
    // e.g. 6% per year
    const termYears = termMonths / 12;
    totalInterest = principal * (interestRate / 100) * termYears;
  }

  const totalLoanCost = principal + totalInterest;
  const monthlyPayment = totalLoanCost / termMonths;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Bike className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'TH' ? 'คำนวณค่างวดรถมอเตอร์ไซค์' : 'Motorcycle Loan Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'TH' ? 'ราคารถ (บาท)' : 'Motorcycle Price (THB)'}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'TH' ? 'เงินดาวน์ (บาท)' : 'Down Payment (THB)'}
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'อัตราดอกเบี้ย (%)' : 'Interest Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'รูปแบบดอกเบี้ย' : 'Rate Type'}
              </label>
              <select
                value={rateType}
                onChange={(e) => setRateType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                <option value="monthly">{lang === 'TH' ? 'ต่อเดือน (บ่อยสุด)' : 'Per Month (Common)'}</option>
                <option value="yearly">{lang === 'TH' ? 'ต่อปี (บิ๊กไบค์)' : 'Per Year (Big Bike)'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'TH' ? 'ระยะเวลาผ่อน (เดือน)' : 'Loan Term (Months)'}
            </label>
            <select
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
            >
              <option value={12}>12 {lang === 'TH' ? 'เดือน' : 'Months'} (1 {lang === 'TH' ? 'ปี' : 'Year'})</option>
              <option value={18}>18 {lang === 'TH' ? 'เดือน' : 'Months'} (1.5 {lang === 'TH' ? 'ปี' : 'Years'})</option>
              <option value={24}>24 {lang === 'TH' ? 'เดือน' : 'Months'} (2 {lang === 'TH' ? 'ปี' : 'Years'})</option>
              <option value={36}>36 {lang === 'TH' ? 'เดือน' : 'Months'} (3 {lang === 'TH' ? 'ปี' : 'Years'})</option>
              <option value={48}>48 {lang === 'TH' ? 'เดือน' : 'Months'} (4 {lang === 'TH' ? 'ปี' : 'Years'})</option>
              <option value={60}>60 {lang === 'TH' ? 'เดือน' : 'Months'} (5 {lang === 'TH' ? 'ปี' : 'Years'})</option>
            </select>
          </div>
        </div>

        <div>
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200 h-full flex flex-col">
            <h3 className="text-xl font-bold text-teal-900 mb-6 text-center">
              {lang === 'TH' ? 'ยอดที่ต้องชำระ' : 'Payment Summary'}
            </h3>
            
            <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-teal-100 mb-6 flex-grow flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-500 mb-2">{lang === 'TH' ? 'ค่างวดรายเดือน' : 'Monthly Payment'}</p>
              <p className="text-5xl font-extrabold text-teal-600">
                ฿{Math.ceil(monthlyPayment).toLocaleString()}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{lang === 'TH' ? 'ยอดจัดไฟแนนซ์ (เงินต้น)' : 'Principal Amount'}</span>
                <span className="font-semibold text-gray-800">฿{principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{lang === 'TH' ? 'ดอกเบี้ยรวมทั้งหมด' : 'Total Interest'}</span>
                <span className="font-semibold text-rose-500">฿{totalInterest.toLocaleString()}</span>
              </div>
              <div className="border-t border-teal-200 pt-3 flex justify-between items-center">
                <span className="font-medium text-gray-700">{lang === 'TH' ? 'ยอดหนี้รวม' : 'Total Loan Amount'}</span>
                <span className="font-bold text-gray-900">฿{totalLoanCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ระวังดอกเบี้ยรถมอเตอร์ไซค์! ทำไมผ่อนจบแล้วถึงจ่ายแพงเกือบเท่าตัว?
        </h2>
        <p>
          สำหรับคนไทย รถจักรยานยนต์หรือมอเตอร์ไซค์เป็นยานพาหนะคู่ใจที่ขาดไม่ได้ แต่หลายคนที่เดินเข้าโชว์รูมแล้วตัดสินใจ "ดาวน์ 0 บาท" หรือ "ผ่อนนานสุด" 
          มักจะไม่รู้ว่ารูปแบบการคิดดอกเบี้ยของรถมอเตอร์ไซค์ขนาดเล็ก (110-150cc) นั้น แตกต่างจากรถยนต์หรือบ้านอย่างสิ้นเชิง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ดอกเบี้ย "ต่อเดือน" vs "ต่อปี"</h3>
        <p>
          รถยนต์และบิ๊กไบค์ มักจะคิดดอกเบี้ยเป็น <strong>"เปอร์เซ็นต์ต่อปี" (เช่น 5% ต่อปี)</strong> 
          แต่สำหรับรถมอเตอร์ไซค์ขนาดเล็ก ไฟแนนซ์จะคิดดอกเบี้ยเป็น <strong>"เปอร์เซ็นต์ต่อเดือน" (เช่น 1.5% - 1.99% ต่อเดือน)</strong>
        </p>
        <p>
          หากดูเผินๆ 1.5% เหมือนจะน้อย แต่ถ้านำมาคูณ 12 เดือน มันคือ <strong>18% ต่อปี!</strong> 
          ซึ่งสูงพอๆ กับดอกเบี้ยบัตรเครดิตเลยทีเดียว
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">จำลองสถานการณ์จริง (Case Study)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ราคารถ:</strong> 60,000 บาท</li>
          <li><strong>ดาวน์ 0 บาท:</strong> ยอดจัดไฟแนนซ์ 60,000 บาท</li>
          <li><strong>ดอกเบี้ย:</strong> 1.5% ต่อเดือน</li>
          <li><strong>ระยะเวลา:</strong> 36 เดือน (3 ปี)</li>
        </ul>
        <p>
          <strong>วิธีคิดดอกเบี้ย:</strong> 60,000 x 1.5% = เดือนละ 900 บาท <br/>
          ดอกเบี้ย 36 เดือน = 900 x 36 = <strong>32,400 บาท</strong> <br/>
          สรุป ผ่อนจบ 3 ปี คุณต้องจ่ายเงินรวม 60,000 + 32,400 = <strong>92,400 บาท! (ดอกเบี้ยเกินครึ่งของราคารถ)</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เคล็ดลับการผ่อนมอเตอร์ไซค์ให้คุ้มค่า</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ดาวน์ให้เยอะที่สุด:</strong> เงินดาวน์จะไปตัดยอดจัดไฟแนนซ์โดยตรง ยิ่งยอดจัดเหลือน้อย ดอกเบี้ยก็ยิ่งถูกลงทวีคูณ</li>
          <li><strong>ผ่อนให้สั้นที่สุด:</strong> เลือกระยะเวลา 12-18 เดือน แทนที่จะเป็น 36 เดือน แม้ค่างวดต่อเดือนจะสูงขึ้น แต่ประหยัดดอกเบี้ยได้หลักหมื่นบาท</li>
          <li><strong>เทียบไฟแนนซ์หลายๆ เจ้า:</strong> ร้านขายรถบางร้านมีไฟแนนซ์ให้เลือกมากกว่า 1 เจ้า ลองเปรียบเทียบอัตราดอกเบี้ย บางแห่งอาจให้โปรโมชั่น 0.99% ต่อเดือนสำหรับลูกค้าประวัติดี</li>
        </ul>
      </article>
    </div>
  );
}
