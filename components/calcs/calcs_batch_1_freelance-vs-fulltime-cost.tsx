import React, { useState } from 'react';
import { UserCheck, Calculator } from 'lucide-react';

export default function FreelanceVsFulltimeCost({ lang }: any) {
  const [monthlySalary, setMonthlySalary] = useState<number | string>('');
  const [benefitsPercent, setBenefitsPercent] = useState<number | string>('15');
  const [officeCost, setOfficeCost] = useState<number | string>('');
  
  const [hourlyRate, setHourlyRate] = useState<number | string>('');
  const [hoursPerMonth, setHoursPerMonth] = useState<number | string>('');

  const salary = Number(monthlySalary) || 0;
  const benefits = Number(benefitsPercent) || 0;
  const office = Number(officeCost) || 0;

  const rate = Number(hourlyRate) || 0;
  const hours = Number(hoursPerMonth) || 0;

  const fulltimeCost = salary + (salary * (benefits / 100)) + office;
  const freelanceCost = rate * hours;
  
  const diff = Math.abs(fulltimeCost - freelanceCost);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-pink-100 rounded-full">
          <UserCheck className="w-8 h-8 text-pink-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เปรียบเทียบต้นทุนจ้างฟรีแลนซ์กับพนักงานประจำ</h1>
          <p className="text-gray-500">คำนวณต้นทุนแฝงทั้งหมดเพื่อช่วยตัดสินใจในการจ้างงาน</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <h2 className="text-lg font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">พนักงานประจำ (Full-Time)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เงินเดือนพื้นฐาน (Monthly Salary)</label>
              <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="เช่น 30000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สวัสดิการและภาษี (% ของเงินเดือน)</label>
              <p className="text-xs text-gray-500 mb-1">ประกันสังคม โบนัส วันหยุดพักร้อน (เฉลี่ย 15-20%)</p>
              <input type="number" value={benefitsPercent} onChange={(e) => setBenefitsPercent(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="15" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ต้นทุนแฝงอื่นๆ (อุปกรณ์, พื้นที่ออฟฟิศ)</label>
              <input type="number" value={officeCost} onChange={(e) => setOfficeCost(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="เช่น 2000" />
            </div>
          </div>
          <div className="mt-6 p-3 bg-blue-100 rounded text-center">
            <span className="block text-sm text-blue-800 mb-1">ต้นทุนรวมพนักงานประจำ</span>
            <span className="text-2xl font-bold text-blue-900">{fulltimeCost.toLocaleString()} บาท/เดือน</span>
          </div>
        </div>

        <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
          <h2 className="text-lg font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">ฟรีแลนซ์ (Freelancer / Contractor)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าจ้างต่อชั่วโมง (Hourly Rate)</label>
              <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500" placeholder="เช่น 350" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนชั่วโมงที่คาดว่าจะใช้งาน (ต่อเดือน)</label>
              <p className="text-xs text-gray-500 mb-1">ทำงานเต็มเวลาปกติ = 160 ชม./เดือน</p>
              <input type="number" value={hoursPerMonth} onChange={(e) => setHoursPerMonth(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500" placeholder="เช่น 80" />
            </div>
          </div>
          <div className="mt-auto pt-6">
            <div className="p-3 bg-purple-100 rounded text-center mt-[72px]">
              <span className="block text-sm text-purple-800 mb-1">ต้นทุนรวมจ้างฟรีแลนซ์</span>
              <span className="text-2xl font-bold text-purple-900">{freelanceCost.toLocaleString()} บาท/เดือน</span>
            </div>
          </div>
        </div>
      </div>

      {(fulltimeCost > 0 && freelanceCost > 0) && (
        <div className="bg-gray-800 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">บทสรุปการเปรียบเทียบ</h3>
          <p className="text-lg">
            การจ้าง <span className={fulltimeCost < freelanceCost ? 'text-blue-400 font-bold' : 'text-purple-400 font-bold'}>
              {fulltimeCost < freelanceCost ? 'พนักงานประจำ' : 'ฟรีแลนซ์'}
            </span> ประหยัดกว่าประมาณ 
            <span className="font-bold text-green-400 mx-2">{diff.toLocaleString()}</span> บาท/เดือน
          </p>
        </div>
      )}

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-pink max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">เปรียบเทียบต้นทุนจ้างฟรีแลนซ์กับพนักงานประจำ (Freelance vs Full-time Cost) เลือกแบบไหนดี?</h2>
        
        <p>
          เมื่อธุรกิจเติบโตถึงจุดที่ต้องรับคนเพิ่ม คำถามโลกแตกของผู้ประกอบการคือ <strong>"รับพนักงานประจำ หรือ จ้างฟรีแลนซ์ดี?"</strong> 
          หลายคนมองแค่ตัวเลขหน้าฉลาก เช่น ฟรีแลนซ์คิดชั่วโมงละ 500 บาท ดูแพงกว่าพนักงานประจำที่ได้เงินเดือน 30,000 บาท (ตกชั่วโมงละ 187 บาท) 
          แต่ในความเป็นจริง การจ้างพนักงานประจำมี <strong>"ต้นทุนแฝง (Hidden Costs)"</strong> ที่คุณอาจลืมคำนวณ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ต้นทุนที่แท้จริงของพนักงานประจำ</h3>
        <p>
          เงินเดือนพื้นฐาน (Base Salary) เป็นเพียงส่วนหนึ่งของรายจ่าย เมื่อคุณรับพนักงานประจำ คุณต้องแบกรับภาระที่กฎหมายกำหนดและสวัสดิการต่างๆ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>สวัสดิการบังคับและภาษี:</strong> ประกันสังคม 5%, กองทุนเงินทดแทน</li>
          <li><strong>สวัสดิการจูงใจ:</strong> โบนัสประจำปี, ประกันสุขภาพกลุ่ม, กองทุนสำรองเลี้ยงชีพ</li>
          <li><strong>เวลาที่ไม่เกิดประสิทธิผล (Non-productive Time):</strong> วันหยุดนักขัตฤกษ์ 13+ วัน, วันลาพักร้อน, ลาป่วย, ลากิจ (โดยเฉลี่ยพนักงานทำงานจริงเพียงประมาณ 75-80% ของเวลาที่จ่ายเงิน)</li>
          <li><strong>ต้นทุนพื้นที่และอุปกรณ์:</strong> ค่าเช่าออฟฟิศเฉลี่ยต่อหัว, คอมพิวเตอร์, ค่าไฟ, ซอฟต์แวร์ลิขสิทธิ์</li>
        </ul>
        <p>
          โดยหลักการประเมิน (Rule of Thumb) ต้นทุนที่แท้จริงของพนักงานประจำมักจะสูงกว่าเงินเดือนฐานประมาณ <strong>1.2 ถึง 1.4 เท่า</strong> (หรือบวกเพิ่ม 20% - 40%)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ต้นทุนที่แท้จริงของฟรีแลนซ์ (Outsource)</h3>
        <p>
          ในทางกลับกัน ฟรีแลนซ์อาจจะเรียกค่าจ้างต่อชั่วโมงสูงกว่าถึง 2-3 เท่า แต่...
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>คุณจ่ายเฉพาะ <strong>เวลาที่ทำงานให้คุณจริงๆ</strong> (Pay for Output/Time) ไม่ต้องจ่ายค่าวันหยุดพักร้อน</li>
          <li>ไม่ต้องจ่ายประกันสังคม หรือสวัสดิการใดๆ</li>
          <li>ไม่ต้องจัดเตรียมพื้นที่ออฟฟิศ หรือซื้อคอมพิวเตอร์ให้</li>
          <li>สามารถหยุดจ้างได้ทันทีเมื่องานจบ (Flexibility) ไม่มีความเสี่ยงเรื่องค่าชดเชยเลิกจ้าง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อแนะนำในการตัดสินใจ</h3>
        <p>
          การเลือกจ้างงานไม่ได้ขึ้นอยู่กับตัวเลขทางการเงินเพียงอย่างเดียว แต่ต้องดู <strong>"ลักษณะของงาน"</strong> ด้วย:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>จ้างฟรีแลนซ์เมื่อ:</strong> งานเป็นแบบโปรเจกต์ระยะสั้น (เช่น ทำเว็บไซต์) งานที่ต้องการความเชี่ยวชาญเฉพาะด้านชั่วคราว (Niche Skills) หรืองานที่มีปริมาณไม่สม่ำเสมอ (Fluctuating Workload)</li>
          <li><strong>จ้างพนักงานประจำเมื่อ:</strong> งานนั้นเป็น <strong>"ธุรกิจหลัก (Core Business)"</strong> ของบริษัท งานที่ต้องทำต่อเนื่องทุกวัน งานที่ต้องการความลับทางธุรกิจสูง หรือต้องการสร้างวัฒนธรรมองค์กรในระยะยาว</li>
        </ol>
        <p>
          สรุปคือ หากงานมีปริมาณน้อยกว่า 20-30 ชั่วโมงต่อสัปดาห์ การจ้างฟรีแลนซ์แม้เรทจะแพง แต่มักจะคุ้มค่ากว่าในภาพรวม แต่เมื่องานโหลดเต็ม 40 ชั่วโมงต่อสัปดาห์ การนำงานเข้ามาทำเองแบบ In-house ย่อมประหยัดกว่าแน่นอน
        </p>
      </article>
    </div>
  );
}
