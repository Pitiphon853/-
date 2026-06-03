import React, { useState } from 'react';
import { Code, Clock, DollarSign, Activity } from 'lucide-react';

export default function TechnicalDebtCostCalculator({ lang }: any) {
  const [devCount, setDevCount] = useState<number>(5);
  const [devRate, setDevRate] = useState<number>(50);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [debtPercentage, setDebtPercentage] = useState<number>(25);

  const weeklyCostPerDev = hoursPerWeek * devRate;
  const totalWeeklyPayroll = weeklyCostPerDev * devCount;
  
  const weeklyDebtCost = totalWeeklyPayroll * (debtPercentage / 100);
  const monthlyDebtCost = weeklyDebtCost * 4.33;
  const yearlyDebtCost = weeklyDebtCost * 52;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณมูลค่าหนี้ทางเทคนิค (Technical Debt)' : 'Technical Debt Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'วิเคราะห์จำนวนเงินที่สูญเสียไปกับการตามแก้บั๊กและดูแลโค้ดเก่า แทนที่จะสร้างฟีเจอร์ใหม่' : 'Analyze the money lost in dealing with bad code and bug fixing instead of building new features.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {lang === 'TH' ? 'ข้อมูลทีมวิศวกรซอฟต์แวร์' : 'Engineering Team Data'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'จำนวนนักพัฒนา (คน)' : 'Number of Developers'}
              </label>
              <input
                type="number"
                value={devCount}
                onChange={(e) => setDevCount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'ค่าจ้างเฉลี่ยของนักพัฒนาต่อชั่วโมง ($)' : 'Average Dev Rate / Hour ($)'}
              </label>
              <input
                type="number"
                value={devRate}
                onChange={(e) => setDevRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'เวลาทำงานต่อสัปดาห์ (ชั่วโมง)' : 'Working Hours / Week'}
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'TH' ? 'สัดส่วนเวลาที่ใช้แก้บั๊กและจัดการโค้ดเก่า (%)' : '% of Time Spent on Bugs & Maintenance'}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={debtPercentage}
                  onChange={(e) => setDebtPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-red-500"
                />
                <span className="font-bold text-red-600 dark:text-red-400 min-w-[3rem] text-right">
                  {debtPercentage}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {lang === 'TH' ? '* ค่าเฉลี่ยของอุตสาหกรรมมักอยู่ที่ 20% - 30%' : '* Industry average is around 20% - 30%'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-gray-800 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-300 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            {lang === 'TH' ? 'ความสูญเสียจาก Technical Debt' : 'Cost of Technical Debt'}
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {lang === 'TH' ? 'สูญเสียรายสัปดาห์' : 'Weekly Loss'}
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${weeklyDebtCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {lang === 'TH' ? 'สูญเสียรายเดือน' : 'Monthly Loss'}
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${monthlyDebtCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg border-l-4 border-red-500 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-8 h-8 text-red-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'TH' ? 'มูลค่าความสูญเสียรายปี' : 'Yearly Financial Drain'}
                </span>
              </div>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400 ml-11">
                ${yearlyDebtCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>Technical Debt (หนี้ทางเทคนิค) คืออะไร?</h2>
        <p>Technical Debt หรือ "หนี้ทางเทคนิค" เป็นคำเปรียบเปรยในวงการพัฒนาซอฟต์แวร์ ที่หมายถึงต้นทุนแอบแฝงที่เกิดขึ้นเมื่อทีมพัฒนาเลือกวิธีที่ "ง่ายและเร็ว" ในการเขียนโค้ดเพื่อรีบปล่อยฟีเจอร์ออกสู่ตลาด (Ship fast) แทนที่จะใช้วิธีที่ "ถูกต้องและยั่งยืน" สิ่งนี้เปรียบเสมือนการกู้เงินมาลงทุน คุณจะได้ผลลัพธ์ที่รวดเร็วในวันนี้ แต่ในอนาคตคุณจะต้องจ่าย "ดอกเบี้ย" ซึ่งก็คือเวลาและความเหนื่อยยากในการกลับมาแก้ไขโค้ดที่เขียนไว้แย่ๆ นั้นเอง</p>

        <h3>ดอกเบี้ยของหนี้ทางเทคนิคถูกจ่ายในรูปแบบใด?</h3>
        <p>หนี้ทางการเงินจ่ายดอกเบี้ยเป็นเงิน แต่หนี้ทางเทคนิคจ่ายดอกเบี้ยเป็น <strong>"เวลาที่สูญเสียไป"</strong> ของนักพัฒนา (Developer Time) ซึ่งสุดท้ายก็จะถูกแปลงกลับมาเป็นเงินเดือนก้อนโตที่บริษัทต้องแบกรับอยู่ดี อาการของหนี้ทางเทคนิค ได้แก่:</p>
        <ul>
          <li><strong>Bugs & Incidents:</strong> ระบบพังบ่อย มีบั๊กหลุดไปถึงมือผู้ใช้งาน ทำให้ทีมต้องทิ้งงานใหม่เพื่อมาคอยดับไฟ (Firefighting) ซ่อมระบบเก่า</li>
          <li><strong>Velocity Drop (ทำงานช้าลง):</strong> การเพิ่มฟีเจอร์ใหม่ลงในระบบที่โค้ดพันกันยุ่งเหยิง (Spaghetti code) เป็นเรื่องยากและเสี่ยงต่อการพังระบบเดิม งานที่ควรจะเสร็จใน 2 วันอาจกลายเป็น 2 สัปดาห์</li>
          <li><strong>Developer Burnout:</strong> วิศวกรเก่งๆ มักจะหมดกำลังใจ (Demotivated) เมื่อต้องคอยจัดการกับโค้ดขยะซ้ำแล้วซ้ำเล่า ทำให้เกิดปัญหาการลาออก (Turnover rate) ที่เพิ่มสูงขึ้น</li>
        </ul>

        <h3>ควรจัดการกับ Technical Debt อย่างไร?</h3>
        <p>การมีหนี้ไม่ใช่เรื่องผิดเสมอไป สตาร์ทอัพที่ต้องการปล่อย MVP (Minimum Viable Product) อาจต้องยอมสร้างหนี้ทางเทคนิคเพื่อชิงพื้นที่ตลาด (Time to market) แต่เมื่อธุรกิจเริ่มคงที่แล้ว คุณต้องมีแผนการผ่อนชำระหนี้ (Refactoring) อย่างจริงจัง:</p>
        <ol>
          <li><strong>แบ่งเวลา 20% สำหรับ Refactor:</strong> กฎทั่วไปคือในแต่ละรอบการทำงาน (Sprint) ควรเจียดเวลาประมาณ 20% ไว้สำหรับการทำโค้ดให้สะอาดขึ้น (Code Refactoring) หรือการเขียนเทสต์ (Unit Testing)</li>
          <li><strong>ใช้เครื่องมือวัดผล (Code Quality Tools):</strong> นำเครื่องมืออย่าง SonarQube, ESLint หรือ Code Climate เข้ามาตรวจสอบคุณภาพโค้ดและแจ้งเตือนกลิ่นแปลกๆ ในโค้ด (Code Smells) โดยอัตโนมัติ</li>
          <li><strong>หยุดการโทษกัน (Blame-free culture):</strong> อย่าต่อว่าคนที่ทิ้งหนี้ทางเทคนิคไว้ในอดีต (บางครั้งคนคนนั้นอาจเป็นตัวคุณเองเมื่อ 6 เดือนที่แล้ว) บริบทในอดีตกับปัจจุบันไม่เหมือนกัน ให้โฟกัสที่การปรับปรุงและก้าวไปข้างหน้า</li>
        </ol>

        <h3>บทสรุปสำหรับผู้บริหาร</h3>
        <p>ผู้บริหารระดับสูงที่ไม่ใช่สายเทค (Non-technical founders) มักจะไม่เห็นความสำคัญของการลดหนี้ทางเทคนิค เพราะผลลัพธ์ของมันคือสิ่งที่ผู้ใช้ "มองไม่เห็น" ในหน้าจอแอปพลิเคชัน แต่เครื่องมือคำนวณด้านบนนี้จะช่วยแปลงปัญหานามธรรมให้กลายเป็น "ตัวเลขทางการเงิน" ที่ชัดเจน เพื่อให้เห็นว่าการยอมชะลอการปล่อยฟีเจอร์ใหม่สักเล็กน้อยเพื่อเคลียร์หนี้เก่า จะช่วยประหยัดเงินได้หลักล้านและรักษาสุขภาพจิตของทีมงานได้ในระยะยาว</p>
      </div>
    </div>
  );
}
