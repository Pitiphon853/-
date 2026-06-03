import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, UserPlus } from 'lucide-react';

const HeadcountToSalesCalculator = ({ lang }: any) => {
  const [currentSales, setCurrentSales] = useState<number>(10000000);
  const [currentHeadcount, setCurrentHeadcount] = useState<number>(5);
  const [targetSales, setTargetSales] = useState<number>(25000000);
  
  // Calculate current productivity
  const revenuePerEmployee = currentHeadcount > 0 ? currentSales / currentHeadcount : 0;
  
  // Predict required headcount
  const requiredHeadcount = revenuePerEmployee > 0 ? targetSales / revenuePerEmployee : 0;
  const additionalHires = Math.ceil(requiredHeadcount) - currentHeadcount;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-8 h-8 text-violet-600" />
        <h2 className="text-2xl font-bold text-gray-800">Optimal Headcount to Sales Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Current Performance (ผลงานปัจจุบัน)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Sales Revenue (ยอดขายปัจจุบัน)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={currentSales}
                    onChange={(e) => setCurrentSales(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Sales Team Size (จำนวนพนักงานขาย)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={currentHeadcount}
                    onChange={(e) => setCurrentHeadcount(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
            <h3 className="text-sm font-semibold text-violet-800 mb-4">Target Goal (เป้าหมายอนาคต)</h3>
            
            <div>
              <label className="block text-sm text-violet-700 mb-1">Target Sales Revenue (เป้ายอดขายที่ต้องการ)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingUp className="w-4 h-4 text-violet-500" />
                </div>
                <input
                  type="number"
                  value={targetSales}
                  onChange={(e) => setTargetSales(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 border border-violet-300 rounded-md focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <h4 className="text-sm text-gray-500 font-medium mb-1">Current Revenue per Employee</h4>
            <div className="text-2xl font-bold text-gray-800">
              ฿{revenuePerEmployee.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-500">/ person</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">ยอดขายเฉลี่ยต่อพนักงาน 1 คน</p>
          </div>

          <div className="bg-violet-600 p-6 rounded-xl text-white text-center flex-1 flex flex-col justify-center relative overflow-hidden">
            <UserPlus className="absolute -right-4 -bottom-4 w-32 h-32 text-violet-500 opacity-30" />
            
            <h3 className="text-lg font-medium text-violet-100 mb-2 relative z-10">Optimal Headcount Needed</h3>
            <div className="text-5xl font-bold mb-1 relative z-10">
              {Math.ceil(requiredHeadcount)} <span className="text-xl font-normal opacity-80">people</span>
            </div>
            <p className="text-violet-200 text-sm mb-6 relative z-10">จำนวนพนักงานที่ต้องมีเพื่อทำเป้า</p>
            
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm relative z-10">
              <span className="block text-sm text-violet-100">You need to hire</span>
              <span className="block text-2xl font-bold">{additionalHires > 0 ? additionalHires : 0} more</span>
              <span className="block text-xs text-violet-200 mt-1">จำนวนที่ต้องจ้างเพิ่ม</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-violet max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">การคำนวณหาจำนวนพนักงานขายที่เหมาะสม (Optimal Headcount to Sales)</h2>
        <p>
          หนึ่งในคำถามคลาสสิกของผู้บริหารเมื่อตั้งเป้ายอดขาย (Sales Target) ประจำปีใหม่คือ <strong>"เราต้องจ้างเซลส์เพิ่มกี่คนเพื่อทำยอดให้ได้ตามเป้า?"</strong> การจ้างพนักงานน้อยเกินไปอาจทำให้พลาดโอกาสในการขายและพนักงานเก่าทำงานหนักเกินไป (Burnout) แต่หากจ้างพนักงานมากเกินไป (Overhiring) ก็จะนำมาซึ่งต้นทุนคงที่ (Fixed Costs) มหาศาลและกำไรของบริษัทที่ลดลง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">แนวคิด Revenue per Employee (ยอดขายต่อพนักงาน)</h3>
        <p>
          หลักการคำนวณพื้นฐานที่สุดคือการหา <strong>Revenue per Employee</strong> หรือผลิตภาพ (Productivity) ปัจจุบันของทีมเซลส์ ว่าพนักงาน 1 คน สามารถสร้างยอดขายเฉลี่ยได้เท่าไหร่
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
          <p className="font-mono text-center font-semibold text-violet-700 text-sm md:text-base">
            Revenue per Employee = Current Sales / Current Headcount
          </p>
        </div>
        <p>
          เมื่อได้ค่าเฉลี่ยนี้แล้ว เราสามารถนำเป้ายอดขายในอนาคต (Target Sales) มาหารด้วย Revenue per Employee เพื่อหาจำนวนพนักงานโดยรวมที่ต้องการ (Optimal Headcount)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยที่ต้องระวังในการพยากรณ์ (Forecasting Pitfalls)</h3>
        <p>
          แม้สมการคณิตศาสตร์จะดูง่าย แต่ในโลกความเป็นจริงมีตัวแปรอื่นๆ ที่ผู้จัดการฝ่ายขาย (Sales Manager) และ HR ต้องนำมาพิจารณาร่วมด้วย:
        </p>
        <ul>
          <li><strong>Ramp-up Time (ระยะเวลาปรับตัว):</strong> พนักงานใหม่ไม่สามารถทำยอดขายได้ 100% ตั้งแต่เดือนแรก ปกติเซลส์ใหม่อาจใช้เวลา 3-6 เดือนในการเรียนรู้โปรดักต์และสร้างฐานลูกค้ากว่าจะทำยอดขายได้เต็มที่ (Full Quota)</li>
          <li><strong>Diminishing Returns (ผลตอบแทนลดน้อยถอยลง):</strong> การเพิ่มคนไม่ได้แปลว่ายอดขายจะเพิ่มเป็นเส้นตรงเสมอไป หากขนาดตลาด (Market Size) มีจำกัด การเพิ่มเซลส์อาจหมายถึงการแย่งลูกค้ากันเอง</li>
          <li><strong>Support Staff (ทีมสนับสนุน):</strong> การเพิ่มเซลส์หน้าบ้าน 10 คน อาจต้องจ้างแอดมินหรือทีม Customer Support หลังบ้านเพิ่มอีก 2 คน ซึ่งเป็นต้นทุนที่ต้องนำมาคำนวณด้วย</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กลยุทธ์การขยายทีม (Scaling Strategy)</h3>
        <p>
          ก่อนที่จะรีบเปิดรับสมัครงานองค์กรควรตั้งคำถามว่า "เราสามารถเพิ่ม Revenue per Employee ของทีมปัจจุบันได้หรือไม่?" ผ่านการใช้เทคโนโลยี (เช่น CRM software) การอบรมทักษะการขาย (Sales Training) หรือการปรับปรุงสคริปต์การขาย หากเพิ่มประสิทธิภาพคนเดิมจนสุดทางแล้ว จึงค่อยพิจารณาจ้างพนักงานใหม่ (Headcount Expansion)
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: ทฤษฎีการบริหารทีมขาย (Sales Force Sizing and Allocation) และการวางแผนกำลังคน (Workforce Planning)
        </p>
      </div>
    </div>
  );
};

export default HeadcountToSalesCalculator;
