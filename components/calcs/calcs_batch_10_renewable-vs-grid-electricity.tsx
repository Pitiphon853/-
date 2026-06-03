import React, { useState } from 'react';
import { Zap, Calculator, BatteryCharging, Power, ArrowRight, Info } from 'lucide-react';

export default function RenewableVsGridElectricity({ lang }: any) {
  const [monthlyUsage, setMonthlyUsage] = useState<number>(1000); // kWh
  const [gridRate, setGridRate] = useState<number>(5.0); // Baht/kWh
  const [renewableRate, setRenewableRate] = useState<number>(2.5); // Baht/kWh Levelized cost
  const [renewablePercent, setRenewablePercent] = useState<number>(40); // %

  const gridOnlyCost = monthlyUsage * gridRate;
  
  const renewableUsage = monthlyUsage * (renewablePercent / 100);
  const gridUsage = monthlyUsage - renewableUsage;
  
  const mixedCost = (renewableUsage * renewableRate) + (gridUsage * gridRate);
  const savings = gridOnlyCost - mixedCost;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <Zap size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === 'EN' ? 'Renewable vs Grid Electricity Calculator' : 'โปรแกรมเปรียบเทียบค่าไฟพลังงานทดแทน vs ไฟฟ้าปกติ'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Monthly Electricity Consumption (kWh)' : 'ปริมาณการใช้ไฟฟ้ารายเดือน (หน่วย/kWh)'}
            </label>
            <input
              type="number"
              min="1"
              value={monthlyUsage}
              onChange={(e) => setMonthlyUsage(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Grid Electricity Rate (Baht/kWh)' : 'อัตราค่าไฟฟ้าจากการไฟฟ้า (บาท/หน่วย)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={gridRate}
              onChange={(e) => setGridRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? 'Renewable Energy Cost (Baht/kWh)' : 'ต้นทุนเฉลี่ยของพลังงานทดแทน (บาท/หน่วย)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={renewableRate}
              onChange={(e) => setRenewableRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'EN' ? 'E.g. Levelized cost of energy for your solar setup.' : 'เช่น ต้นทุนเฉลี่ยต่อหน่วยจากระบบโซลาร์เซลล์ของคุณ'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'EN' ? `Renewable Usage Percentage: ${renewablePercent}%` : `สัดส่วนการใช้พลังงานทดแทน: ${renewablePercent}%`}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={renewablePercent}
              onChange={(e) => setRenewablePercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0% (Grid only)</span>
              <span>100% (Renewable only)</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator size={24} />
              {lang === 'EN' ? 'Monthly Cost Comparison' : 'เปรียบเทียบค่าใช้จ่ายรายเดือน'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between opacity-80">
                <div className="flex items-center gap-2">
                  <Power size={20} className="text-red-200" />
                  <span>{lang === 'EN' ? '100% Grid Cost' : 'ค่าไฟ 100% จากการไฟฟ้า'}</span>
                </div>
                <div className="text-lg font-semibold text-right line-through decoration-red-400 decoration-2">
                  {gridOnlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">฿</span>
                </div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg flex items-center justify-between border border-blue-300/50">
                <div className="flex items-center gap-2">
                  <BatteryCharging size={20} className="text-green-200" />
                  <span className="font-semibold">{lang === 'EN' ? 'Mixed Energy Cost' : 'ค่าไฟรวม (ไฟฟ้า + พลังงานทดแทน)'}</span>
                </div>
                <div className="text-2xl font-bold text-right">
                  {mixedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal">฿</span>
                </div>
              </div>

              <div className="bg-green-500/20 p-4 rounded-lg flex items-center justify-between border border-green-400/50 mt-2">
                <div className="flex items-center gap-2">
                  <ArrowRight size={20} className="text-green-300" />
                  <span className="font-semibold text-green-100">{lang === 'EN' ? 'Monthly Savings' : 'ประหยัดได้ต่อเดือน'}</span>
                </div>
                <div className="text-2xl font-extrabold text-green-100 text-right">
                  {savings > 0 ? savings.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'} <span className="text-base font-normal">฿</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-blue-100 flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                {lang === 'EN'
                  ? 'Calculations are estimates. Real savings depend on exact consumption times and precise generation from your renewable system.'
                  : 'การคำนวณเป็นการประเมินเบื้องต้น การประหยัดจริงขึ้นอยู่กับช่วงเวลาที่ใช้ไฟฟ้าและการผลิตพลังงานจริงของระบบทดแทนของคุณ'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-blue max-w-none text-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ทำไมการผสมผสานพลังงานทดแทนถึงคุ้มค่ากว่าในระยะยาว?
        </h2>
        <p>
          ในยุคที่ต้นทุนการผลิตไฟฟ้าจากเชื้อเพลิงฟอสซิลมีความผันผวนสูงและมีแนวโน้มปรับตัวสูงขึ้น ผู้บริโภคและภาคธุรกิจต่างพากันมองหาทางเลือกเพื่อลดภาระค่าใช้จ่าย <strong>พลังงานทดแทน (Renewable Energy)</strong> เช่น พลังงานแสงอาทิตย์ (Solar Energy) หรือพลังงานลม (Wind Energy) ได้กลายมาเป็นคำตอบสำคัญ ไม่เพียงแต่ช่วยลดค่าไฟรายเดือน แต่ยังเป็นการผลักดันสังคมสู่ความยั่งยืนด้านสิ่งแวดล้อมอีกด้วย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">รู้จักกับ "ต้นทุนการผลิตไฟฟ้าเฉลี่ยตลอดอายุโครงการ" (LCOE)</h3>
        <p>
          เวลาที่เราพูดถึง "ต้นทุนของพลังงานทดแทน" เราไม่ได้หมายถึงค่าไฟรายเดือนแบบที่จ่ายให้การไฟฟ้า แต่เรามักใช้แนวคิด <strong>Levelized Cost of Energy (LCOE)</strong> หรือ ต้นทุนเฉลี่ยตลอดอายุการใช้งานของระบบ ซึ่งคำนวณโดยนำต้นทุนการลงทุนเริ่มต้น ค่าบำรุงรักษาตลอดอายุขัย (เช่น 20-25 ปีสำหรับแผงโซลาร์) มาหารด้วยปริมาณไฟฟ้าทั้งหมดที่ระบบคาดว่าจะผลิตได้ 
        </p>
        <p>
          ผลลัพธ์ที่ได้มักจะออกมาในรูปของ "บาท/หน่วย (Baht/kWh)" ซึ่งในปัจจุบัน เทคโนโลยีโซลาร์เซลล์มีราคาถูกลงมาก ทำให้ค่า LCOE ของพลังงานแสงอาทิตย์บนหลังคามักจะถูกกว่าอัตราค่าไฟฟ้าที่ซื้อจากสายส่งของการไฟฟ้าอย่างมีนัยสำคัญ (เช่น ต้นทุนโซลาร์อาจตกอยู่ที่ 2 - 2.5 บาท/หน่วย ในขณะที่ค่าไฟปกติอาจอยู่ที่ 4 - 5 บาท/หน่วย หรือสูงกว่านั้น)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การใช้พลังงานแบบผสมผสาน (Hybrid Energy Mix)</h3>
        <p>
          ในทางปฏิบัติ แทบจะเป็นไปไม่ได้เลยที่บ้านหรืออาคารธุรกิจทั่วไปจะใช้พลังงานทดแทน 100% ตลอด 24 ชั่วโมงโดยไม่มีแบตเตอรี่กักเก็บขนาดใหญ่ (ซึ่งปัจจุบันยังมีราคาสูง) ดังนั้น รูปแบบที่คุ้มค่าที่สุดในปัจจุบันคือ <strong>การใช้พลังงานแบบผสมผสาน</strong> คือการใช้ไฟฟ้าที่ผลิตได้จากโซลาร์เซลล์ในเวลากลางวัน และดึงไฟฟ้าจากระบบสายส่งปกติ (Grid) มาใช้ในเวลากลางคืนหรือเมื่อแดดร่ม
        </p>
        <p>
          โปรแกรม <strong>เปรียบเทียบค่าไฟพลังงานทดแทน vs ไฟฟ้าปกติ</strong> ของเรา ช่วยให้คุณมองเห็นภาพรวมของค่าใช้จ่ายที่เปลี่ยนไป เมื่อคุณแทนที่การใช้ไฟฟ้าบางส่วน (เช่น 30%, 40% หรือ 50%) ด้วยพลังงานทดแทนที่มีต้นทุนต่อหน่วยถูกกว่า คุณจะเห็นได้อย่างชัดเจนว่าเงินที่คุณต้องจ่ายต่อเดือนลดลงไปเท่าไร
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ที่มากกว่าแค่เรื่องเงิน</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ลดความเสี่ยงจากความผันผวนของค่าไฟ:</strong> เมื่อคุณผลิตไฟฟ้าใช้เองได้ส่วนหนึ่ง คุณจะได้รับผลกระทบน้อยลงเมื่อมีการปรับขึ้นค่า FT หรือค่าไฟฟ้าฐาน</li>
          <li><strong>ยกระดับภาพลักษณ์องค์กร:</strong> สำหรับภาคธุรกิจ การหันมาใช้พลังงานสะอาดช่วยสร้างภาพลักษณ์ที่ดีในด้าน ESG (Environmental, Social, and Governance) และเป็นข้อได้เปรียบในการแข่งขันยุคใหม่</li>
          <li><strong>ช่วยชาติ ช่วยโลก:</strong> การลดดึงไฟฟ้าจากสายส่งในช่วยเวลากลางวัน (Peak Demand) ช่วยลดภาระการผลิตไฟฟ้าของประเทศ และลดการเผาไหม้เชื้อเพลิงที่สร้างก๊าซเรือนกระจกโดยตรง</li>
        </ul>

        <p>
          การเปลี่ยนผ่านด้านพลังงาน (Energy Transition) ไม่ใช่เรื่องไกลตัวอีกต่อไป การคำนวณและเปรียบเทียบค่าใช้จ่ายอย่างรอบคอบจะช่วยให้คุณตัดสินใจลงทุนในระบบพลังงานทดแทนได้อย่างมั่นใจและชาญฉลาดมากยิ่งขึ้น
        </p>
      </div>
    </div>
  );
}
