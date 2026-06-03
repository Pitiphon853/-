import React, { useState } from 'react';
import { Clock, DollarSign, HelpCircle } from 'lucide-react';

export default function BreakEvenTime({ lang }: any) {
  const [investment, setInvestment] = useState<number | string>('');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number | string>('');
  const [monthlyCost, setMonthlyCost] = useState<number | string>('');

  const inv = Number(investment) || 0;
  const rev = Number(monthlyRevenue) || 0;
  const cost = Number(monthlyCost) || 0;

  const netCashFlow = rev - cost;
  let paybackMonths = 0;
  if (inv > 0 && netCashFlow > 0) {
    paybackMonths = inv / netCashFlow;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณระยะเวลาคืนทุน (Break-Even Time)</h1>
          <p className="text-gray-500">คำนวณระยะเวลาที่ธุรกิจจะได้รับเงินลงทุนเริ่มต้นกลับคืนมา</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เงินลงทุนเริ่มต้น (Initial Investment)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น 500000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รายได้เฉลี่ยต่อเดือน (Monthly Revenue)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น 100000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าใช้จ่ายเฉลี่ยต่อเดือน (Monthly Costs)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น 70000"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">ผลการคำนวณระยะเวลาคืนทุน</h2>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-blue-600">
              {paybackMonths > 0 ? paybackMonths.toFixed(1) : '-'}
            </span>
            <span className="text-gray-600 ml-2">เดือน</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">กระแสเงินสดสุทธิต่อเดือน:</span>
              <span className="font-semibold text-gray-800">{netCashFlow.toLocaleString()} บาท</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ระยะเวลาคืนทุนโดยประมาณ:</span>
              <span className="font-semibold text-gray-800">
                {paybackMonths > 0 ? `${Math.floor(paybackMonths / 12)} ปี ${(paybackMonths % 12).toFixed(1)} เดือน` : 'N/A'}
              </span>
            </div>
          </div>
          {netCashFlow <= 0 && inv > 0 && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-start">
              <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>กระแสเงินสดสุทธิติดลบหรือเท่ากับศูนย์ หมายความว่าคุณอาจจะไม่มีวันคืนทุน หรือต้องใช้เวลานานมากหากรายได้ไม่เพิ่มขึ้น</p>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ระยะเวลาคืนทุน (Payback Period) คืออะไร สำคัญอย่างไรในการทำธุรกิจ?</h2>
        
        <p>
          ในการเริ่มต้นธุรกิจหรือการลงทุนโครงการใหม่ หนึ่งในคำถามแรกๆ ที่ผู้ประกอบการและนักลงทุนทุกคนอยากทราบคือ <strong>"อีกนานแค่ไหนถึงจะคืนทุน?"</strong> 
          คำตอบของคำถามนี้คือสิ่งที่เราเรียกว่า <strong>ระยะเวลาคืนทุน (Payback Period หรือ Break-Even Time)</strong> ซึ่งเป็นตัวชี้วัดทางการเงินขั้นพื้นฐานที่มีความสำคัญอย่างยิ่ง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามของระยะเวลาคืนทุน (Payback Period)</h3>
        <p>
          ระยะเวลาคืนทุน (Payback Period) คือ ระยะเวลา (มักคำนวณเป็นเดือนหรือปี) ที่กระแสเงินสดรับสุทธิจากการลงทุน (Net Cash Flow) สะสมจนมีมูลค่าเท่ากับเงินลงทุนเริ่มต้น (Initial Investment)
          กล่าวง่ายๆ คือ ระยะเวลาที่คุณจะได้ "ทุน" กลับคืนมาครบทั้งหมด หลังจากผ่านจุดนี้ไป กระแสเงินสดสุทธิที่ได้รับคือกำไรของการลงทุนนั้นๆ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณระยะเวลาคืนทุน</h3>
        <p>
          สูตรการคำนวณระยะเวลาคืนทุนแบบง่าย (Simple Payback Period) ซึ่งเหมาะสำหรับกรณีที่กระแสเงินสดสุทธิในแต่ละช่วงเวลา (เช่น แต่ละเดือนหรือแต่ละปี) มีความสม่ำเสมอ สามารถคำนวณได้ดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          ระยะเวลาคืนทุน = เงินลงทุนเริ่มต้น / กระแสเงินสดสุทธิต่อเดือน
        </div>
        <p>
          ตัวอย่างเช่น หากคุณลงทุนเปิดร้านกาแฟด้วยเงินลงทุนเริ่มต้น 500,000 บาท และคาดว่าจะมีรายได้สุทธิ (หลังหักค่าใช้จ่ายทั้งหมดรวมถึงเงินเดือนตัวเอง) เดือนละ 20,000 บาท 
          ระยะเวลาคืนทุนจะเท่ากับ 500,000 / 20,000 = 25 เดือน หรือประมาณ 2 ปี 1 เดือน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อดีและข้อจำกัดของการวิเคราะห์ระยะเวลาคืนทุน</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ข้อดี:</strong> เข้าใจง่าย คำนวณง่าย ช่วยประเมินความเสี่ยงด้านสภาพคล่องได้ดี ยิ่งคืนทุนเร็วยิ่งมีความเสี่ยงต่ำ เพราะกระแสเงินสดจะกลับมาอยู่ในมือเราเร็วขึ้น</li>
          <li><strong>ข้อจำกัด:</strong> การคำนวณแบบง่ายนี้ (Simple Payback Period) ไม่ได้คำนึงถึง <em>มูลค่าของเงินตามเวลา (Time Value of Money)</em> เช่น เงิน 100 บาทในวันนี้ มีค่ามากกว่าเงิน 100 บาทในอีก 5 ปีข้างหน้า 
          นอกจากนี้ยังไม่ได้พิจารณากระแสเงินสดที่เกิดขึ้นหลังจากช่วงที่คืนทุนไปแล้ว โครงการที่คืนทุนเร็วอาจได้กำไรโดยรวมน้อยกว่าโครงการที่คืนทุนช้าแต่มีอายุยาวนานกว่า</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การปรับปรุง: Discounted Payback Period</h3>
        <p>
          เพื่อแก้ปัญหาเรื่องมูลค่าของเงินตามเวลา ในทางเศรษฐศาสตร์และการเงินขั้นสูงจะใช้สูตร <strong>Discounted Payback Period</strong> ซึ่งจะทำการคิดลด (Discount) กระแสเงินสดในอนาคตกลับมาเป็นมูลค่าปัจจุบัน (Present Value) 
          โดยใช้อัตราคิดลด (Discount Rate) ซึ่งอาจเป็นต้นทุนทางการเงิน (Cost of Capital) อัตราดอกเบี้ย หรืออัตราผลตอบแทนที่คาดหวัง การใช้ Discounted Payback Period จะทำให้ระยะเวลาคืนทุนยาวนานขึ้นกว่าการคำนวณแบบง่าย แต่สะท้อนความจริงได้แม่นยำกว่า
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป: ทำไมธุรกิจ SME ถึงต้องคำนวณระยะเวลาคืนทุน?</h3>
        <p>
          สำหรับธุรกิจขนาดกลางและขนาดย่อม (SME) สภาพคล่องคือหัวใจสำคัญ หากคุณนำเงินก้อนใหญ่ไปลงทุนในเครื่องจักรใหม่ หรือขยายสาขา การคำนวณ Payback Period จะช่วยให้คุณวางแผนสำรองเงินสดได้ถูกต้อง 
          หากระยะเวลาคืนทุนนานเกินไป เช่น มากกว่า 3-5 ปี คุณอาจต้องเผื่อสายป่าน (Working Capital) ให้ยาวขึ้น หรือทบทวนว่าการลงทุนนั้นคุ้มค่าจริงหรือไม่ ในสภาวะเศรษฐกิจที่มีความผันผวนสูง การเลือกโครงการที่คืนทุนเร็วมักจะเป็นทางเลือกที่ปลอดภัยกว่าเสมอ
        </p>
      </article>
    </div>
  );
}
