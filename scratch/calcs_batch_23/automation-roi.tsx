
"use client";
import { useState } from "react";
import { Calculator, Bot, Clock, DollarSign, TrendingUp } from "lucide-react";

export default function AutomationROI({ lang }: any) {
  const [devCost, setDevCost] = useState<number>(500000);
  const [monthlyCost, setMonthlyCost] = useState<number>(5000);
  const [hoursSaved, setHoursSaved] = useState<number>(80);
  const [hourlyCost, setHourlyCost] = useState<number>(500);
  const [employees, setEmployees] = useState<number>(5);

  const monthlySaving = hoursSaved * hourlyCost * employees;
  const netMonthlySaving = monthlySaving - monthlyCost;
  const paybackMonths = netMonthlySaving > 0 ? devCost / netMonthlySaving : Infinity;
  const yearSaving = netMonthlySaving * 12;
  const yearROI = devCost > 0 ? ((yearSaving - devCost) / devCost) * 100 : 0;
  const fiveYearSaving = netMonthlySaving * 60 - devCost;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Automation ROI Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าพัฒนา Bot / ระบบอัตโนมัติ (บาท)</label>
            <input type="number" value={devCost} onChange={e => setDevCost(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่าใช้จ่ายรายเดือน (Server / API) (บาท)</label>
            <input type="number" value={monthlyCost} onChange={e => setMonthlyCost(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชม. ที่ประหยัดได้/คน/เดือน</label>
              <input type="number" value={hoursSaved} onChange={e => setHoursSaved(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ค่าแรง/ชม. (บาท)</label>
              <input type="number" value={hourlyCost} onChange={e => setHourlyCost(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนพนักงาน</label>
              <input type="number" value={employees} onChange={e => setEmployees(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">ระยะคืนทุน</span>
            </div>
            <p className="text-2xl font-bold text-green-800">
              {paybackMonths === Infinity ? "ไม่คืนทุน" : `${paybackMonths.toFixed(1)} เดือน`}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">ประหยัดสุทธิ/เดือน</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{netMonthlySaving.toLocaleString()} บาท</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">ROI ปีแรก</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{yearROI.toFixed(1)}%</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">กำไรสุทธิ 5 ปี</span>
            </div>
            <p className="text-2xl font-bold text-amber-800">{fiveYearSaving.toLocaleString()} บาท</p>
          </div>
        </div>
      </div>

      <article className="prose max-w-none mb-8">
        <h2>Automation ROI Calculator — คำนวณความคุ้มค่าในการลงทุนทำ Bot</h2>
        <p>
          ในยุคดิจิทัลที่เทคโนโลยีก้าวหน้าอย่างรวดเร็ว การทำ Automation หรือระบบอัตโนมัติกลายเป็นทางเลือกสำคัญที่ช่วยให้ธุรกิจลดต้นทุน เพิ่มประสิทธิภาพ และสร้างความได้เปรียบในการแข่งขัน แต่ก่อนตัดสินใจลงทุน ทุกองค์กรต้องตอบคำถามสำคัญให้ได้ก่อน นั่นคือ "ลงทุนทำ Bot แล้วจะคืนทุนกี่เดือน?" เครื่องมือ Automation ROI Calculator ของเราช่วยให้คุณคำนวณได้อย่างแม่นยำ
        </p>
        <h3>ROI ของ Automation คืออะไร?</h3>
        <p>
          ROI (Return on Investment) ของ Automation คือตัวชี้วัดที่บอกว่าการลงทุนในระบบอัตโนมัติให้ผลตอบแทนคุ้มค่าหรือไม่ โดยคำนวณจากค่าพัฒนาเริ่มต้น ค่าบำรุงรักษารายเดือน เปรียบเทียบกับเวลาและค่าแรงที่ประหยัดได้ หากระบบช่วยลดงานซ้ำซ้อนให้พนักงาน 5 คน ประหยัดได้คนละ 80 ชั่วโมงต่อเดือน ในอัตราค่าแรง 500 บาทต่อชั่วโมง มูลค่าที่ประหยัดจะสูงมาก
        </p>
        <h3>ปัจจัยสำคัญในการคำนวณ</h3>
        <p>
          ค่าพัฒนาเริ่มต้น (Development Cost) เป็นต้นทุนครั้งเดียวในการสร้าง Bot ไม่ว่าจะเป็นค่าจ้างโปรแกรมเมอร์ ค่าซอฟต์แวร์ หรือค่า Licensing ส่วนค่าใช้จ่ายรายเดือน ได้แก่ ค่า Server ค่า API Call และค่า Maintenance ต่าง ๆ สิ่งที่ต้องพิจารณาเพิ่มเติมคือจำนวนพนักงานที่ได้รับประโยชน์ จำนวนชั่วโมงที่ประหยัดได้จริง และอัตราค่าแรงเฉลี่ยของพนักงานเหล่านั้น
        </p>
        <h3>วิธีใช้เครื่องคำนวณ</h3>
        <p>
          เพียงกรอกข้อมูล 5 ช่อง ได้แก่ ค่าพัฒนา Bot ค่าใช้จ่ายรายเดือน จำนวนชั่วโมงที่ประหยัดต่อคนต่อเดือน อัตราค่าแรงต่อชั่วโมง และจำนวนพนักงาน ระบบจะคำนวณระยะเวลาคืนทุน เงินที่ประหยัดได้สุทธิต่อเดือน ROI ปีแรก และกำไรสุทธิใน 5 ปี ข้อมูลเหล่านี้ช่วยให้คุณนำเสนอเชิงตัวเลขแก่ผู้บริหารเพื่อขออนุมัติงบประมาณได้อย่างมั่นใจ
        </p>
        <h3>ตัวอย่าง Use Case</h3>
        <p>
          บริษัทแห่งหนึ่งลงทุนสร้าง Chatbot ราคา 500,000 บาท มีค่า Server รายเดือน 5,000 บาท ช่วยลดงาน Customer Service ของพนักงาน 5 คน คนละ 80 ชั่วโมงต่อเดือน ในอัตรา 500 บาท/ชม. ก็สามารถประหยัดได้สุทธิ 195,000 บาทต่อเดือน คืนทุนภายใน 2.6 เดือน และสร้างกำไรสุทธิกว่า 11 ล้านบาทใน 5 ปี ซึ่งถือว่าคุ้มค่าอย่างมาก
        </p>
        <h3>สรุป</h3>
        <p>
          การลงทุนใน Automation ไม่ใช่แค่เรื่องเทคโนโลยี แต่เป็นการตัดสินใจทางธุรกิจ ใช้เครื่องคำนวณ Automation ROI เพื่อวิเคราะห์ตัวเลขอย่างเป็นระบบ แล้วคุณจะมั่นใจได้ว่าทุกบาทที่ลงทุนจะสร้างผลตอบแทนที่คุ้มค่าในระยะยาว
        </p>
      </article>
    </div>
  );
}
