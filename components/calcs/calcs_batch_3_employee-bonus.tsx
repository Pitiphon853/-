import React, { useState } from 'react';
import { Gift, Calculator, DollarSign, Percent } from 'lucide-react';

const EmployeeBonusCalculator = ({ lang }: any) => {
  const [baseSalary, setBaseSalary] = useState<number>(35000);
  const [companyMultiplier, setCompanyMultiplier] = useState<number>(1.2);
  const [performanceMultiplier, setPerformanceMultiplier] = useState<number>(1.5);
  const [targetBonusMonths, setTargetBonusMonths] = useState<number>(1);

  const standardBonus = baseSalary * targetBonusMonths;
  const actualBonus = standardBonus * companyMultiplier * performanceMultiplier;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Gift className="w-8 h-8 text-amber-500" />
        <h2 className="text-2xl font-bold text-gray-800">Employee Bonus Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Monthly Salary (เงินเดือนพื้นฐาน)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Bonus (เป้าหมายโบนัส / เดือน)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={targetBonusMonths}
                onChange={(e) => setTargetBonusMonths(Number(e.target.value))}
                step="0.5"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-gray-600">เดือน (Months)</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">เช่น ปกติบริษัทให้โบนัสมาตรฐาน 1 เดือน</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                <span>Company Performance Multiplier</span>
                <span className="font-bold text-amber-600">{companyMultiplier}x</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={companyMultiplier}
                onChange={(e) => setCompanyMultiplier(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="text-xs text-gray-500 mt-1">ตัวคูณผลประกอบการบริษัท (1.0 = ตามเป้า, &gt;1 = ทะลุเป้า, &lt;1 = ต่ำกว่าเป้า)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                <span>Individual KPI Multiplier</span>
                <span className="font-bold text-amber-600">{performanceMultiplier}x</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={performanceMultiplier}
                onChange={(e) => setPerformanceMultiplier(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="text-xs text-gray-500 mt-1">ตัวคูณผลงานส่วนบุคคล (KPI / การประเมินเกรด)</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl flex flex-col justify-center items-center text-center border border-amber-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Calculator className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Final Bonus Amount</h3>
          <div className="text-5xl font-bold text-amber-600 mb-4">
            ฿{actualBonus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          
          <div className="w-full bg-white p-4 rounded-lg shadow-sm text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Standard Bonus:</span>
              <span>฿{standardBonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-b pb-2">
              <span>Total Multiplier:</span>
              <span>{(companyMultiplier * performanceMultiplier).toFixed(2)}x</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 pt-1">
              <span>Equivalent to:</span>
              <span className="text-amber-600">{(actualBonus / baseSalary).toFixed(1)} Months</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-amber max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">การคำนวณโบนัสพนักงานแบบอิงผลงาน (Performance-based Bonus)</h2>
        <p>
          โบนัส (Bonus) ไม่ใช่เพียงแค่เงินที่บริษัทจ่ายให้เปล่าตอนสิ้นปี แต่เป็นเครื่องมือทางจิตวิทยาที่ทรงพลังในการสร้างแรงจูงใจ (Motivation) และรักษาพนักงานคนเก่ง (Talent Retention) ในอดีต หลายบริษัทอาจจ่ายโบนัสแบบ <strong>Fix Bonus</strong> (เช่น จ่าย 1 เดือนเท่ากันทุกคน) ซึ่งง่ายต่อการคำนวณ แต่ในยุคปัจจุบัน องค์กรสมัยใหม่นิยมใช้ระบบ <strong>Performance-based Bonus (หรือ Variable Bonus)</strong> เพื่อให้ผลตอบแทนสอดคล้องกับผลงานจริง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">โครงสร้างการคำนวณโบนัสมาตรฐาน</h3>
        <p>การคำนวณโบนัสแบบยุติธรรมมักจะประกอบด้วยตัวแปร (Multipliers) อย่างน้อย 2 ส่วน ได้แก่:</p>
        <ol>
          <li><strong>Company Performance Multiplier (ตัวคูณผลประกอบการบริษัท):</strong> อิงจากกำไรหรือยอดขายของบริษัทในปีนั้น หากบริษัททำกำไรทะลุเป้า ตัวคูณอาจจะเป็น 1.2 หรือ 1.5 แต่หากบริษัทขาดทุน หรือได้ไม่ตามเป้า ตัวคูณอาจจะลดลงเหลือ 0.8 หรือ 0 (งดจ่ายโบนัส)</li>
          <li><strong>Individual KPI Multiplier (ตัวคูณผลงานส่วนบุคคล):</strong> มาจากการประเมินผลงาน (Performance Review) ของพนักงานแต่ละคน เช่น ได้เกรด A ตัวคูณ 1.5, เกรด B ตัวคูณ 1.0, เกรด C ตัวคูณ 0.5 เป็นต้น ช่วยแยกแยะให้รางวัลคนขยันและมีผลงานโดดเด่น (High Performers)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สมการการคำนวณโบนัส</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4 text-center">
          <p className="font-mono font-semibold text-amber-700 text-sm md:text-base mb-2">
            Standard Bonus = Base Salary × Target Bonus Months
          </p>
          <p className="font-mono font-semibold text-amber-800 text-sm md:text-base">
            Final Bonus = Standard Bonus × Company Multiplier × Individual Multiplier
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมระบบนี้ถึงดีกว่าการจ่ายเท่ากัน?</h3>
        <p>
          การใช้ระบบตัวคูณ (Multiplier System) ช่วยแก้ปัญหา "คนทำมากได้เท่ากับคนทำน้อย" ซึ่งมักบั่นทอนกำลังใจพนักงานเกรด A นอกจากนี้ การผูกโบนัสเข้ากับ Company Performance ยังเป็นการบริหารความเสี่ยง (Risk Management) ให้กับบริษัทในตัว เพราะบริษัทจะจ่ายโบนัสก้อนใหญ่ก็ต่อเมื่อมีกระแสเงินสดและกำไรมากพอที่จะนำมาจ่ายเท่านั้น เป็นการสร้างวัฒนธรรมองค์กรที่ทุกคนร่วมหัวจมท้ายไปกับความสำเร็จของบริษัท (Ownership Mindset)
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: หลักการบริหารทรัพยากรบุคคลด้านค่าตอบแทน (Compensation and Benefits Management) 
        </p>
      </div>
    </div>
  );
};

export default EmployeeBonusCalculator;
