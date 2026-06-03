import React, { useState } from 'react';
import { Clock, Calculator, AlertCircle, Info, Calendar } from 'lucide-react';

export default function EmployeeOtCalculation({ lang }: any) {
  const [inputs, setInputs] = useState({
    employeeType: 'monthly', // monthly, daily
    baseSalary: 15000,
    workingDaysPerMonth: 30, // For monthly, divider is usually 30
    workingHoursPerDay: 8,
    otNormalDaysHours: 10,     // 1.5x
    workHolidayDays: 0,        // Days worked on holiday (1x or 2x)
    workHolidayHours: 0,       // Hours worked on holiday (normal shift time)
    otHolidayHours: 5,         // 3x
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));
  };

  // Calculate Hourly Rate
  let dailyRate = 0;
  let hourlyRate = 0;

  if (inputs.employeeType === 'monthly') {
    dailyRate = inputs.baseSalary / inputs.workingDaysPerMonth;
    hourlyRate = dailyRate / inputs.workingHoursPerDay;
  } else {
    // Daily worker, baseSalary is daily wage
    dailyRate = inputs.baseSalary;
    hourlyRate = dailyRate / inputs.workingHoursPerDay;
  }

  // 1. OT in normal working days (1.5x of hourly rate)
  const otNormalRate = hourlyRate * 1.5;
  const otNormalAmount = otNormalRate * inputs.otNormalDaysHours;

  // 2. Working on holidays (normal shift hours)
  // Monthly gets 1x extra (since base salary already covers the holiday)
  // Daily gets 2x total (since they don't get paid if they don't work, but actually by law they should get paid for traditional holidays, but let's assume standard "work on holiday" pay which is +1x for monthly, +1x or +2x for daily depending on if it's weekly day off or traditional holiday. For simplicity: Daily worker gets 2x hourly rate for work on holiday, Monthly gets 1x hourly rate (because 1x is in salary).)
  let workHolidayRate = 0;
  if (inputs.employeeType === 'monthly') {
    workHolidayRate = hourlyRate * 1; // Additional 1x
  } else {
    workHolidayRate = hourlyRate * 2; // Assuming weekly day off where they wouldn't get paid
  }
  const workHolidayAmount = workHolidayRate * inputs.workHolidayHours;

  // 3. OT on holidays (3x of hourly rate)
  const otHolidayRate = hourlyRate * 3;
  const otHolidayAmount = otHolidayRate * inputs.otHolidayHours;

  const totalOtAmount = otNormalAmount + workHolidayAmount + otHolidayAmount;
  const totalIncome = inputs.employeeType === 'monthly' ? inputs.baseSalary + totalOtAmount : (inputs.baseSalary * inputs.workingDaysPerMonth) + totalOtAmount;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">เครื่องมือคำนวณค่าล่วงเวลา (OT)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> ข้อมูลพนักงานและฐานเงินเดือน
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ประเภทพนักงาน</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="employeeType" value="monthly" checked={inputs.employeeType === 'monthly'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                    <span>รายเดือน (Monthly)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="employeeType" value="daily" checked={inputs.employeeType === 'daily'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                    <span>รายวัน (Daily)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {inputs.employeeType === 'monthly' ? 'เงินเดือน (บาท)' : 'ค่าจ้างรายวัน (บาท/วัน)'}
                  </label>
                  <input type="number" name="baseSalary" value={inputs.baseSalary} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                {inputs.employeeType === 'monthly' ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">จำนวนวันหารต่อเดือน</label>
                    <input type="number" name="workingDaysPerMonth" value={inputs.workingDaysPerMonth} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ทำงานกี่วัน/เดือน</label>
                    <input type="number" name="workingDaysPerMonth" value={inputs.workingDaysPerMonth} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ชั่วโมงทำงานต่อวัน</label>
                  <input type="number" name="workingHoursPerDay" value={inputs.workingHoursPerDay} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-500" /> ชั่วโมงการทำงานล่วงเวลา (ในเดือน)
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-slate-700">1. ล่วงเวลาวันทำงานปกติ (1.5 เท่า)</label>
                    <p className="text-xs text-slate-500">หลังเลิกงานในวันธรรมดา</p>
                  </div>
                  <div className="w-1/3 flex items-center gap-2">
                    <input type="number" name="otNormalDaysHours" value={inputs.otNormalDaysHours} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <span className="text-sm">ชม.</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-slate-700">2. ทำงานในวันหยุด (กะปกติ)</label>
                    <p className="text-xs text-slate-500">ทำในวันหยุด แต่ไม่เกินเวลาเลิกงานปกติ</p>
                  </div>
                  <div className="w-1/3 flex items-center gap-2">
                    <input type="number" name="workHolidayHours" value={inputs.workHolidayHours} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <span className="text-sm">ชม.</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-slate-700">3. ล่วงเวลาในวันหยุด (3 เท่า)</label>
                    <p className="text-xs text-slate-500">หลังเลิกงานในวันหยุดพักผ่อน/นักขัตฤกษ์</p>
                  </div>
                  <div className="w-1/3 flex items-center gap-2">
                    <input type="number" name="otHolidayHours" value={inputs.otHolidayHours} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <span className="text-sm">ชม.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-100 p-4 rounded-xl flex justify-around">
              <div className="text-center">
                <div className="text-sm text-slate-500">ฐานค่าจ้างรายวัน</div>
                <div className="text-lg font-bold text-slate-800">{formatNumber(dailyRate)} ฿</div>
              </div>
              <div className="w-px bg-slate-300"></div>
              <div className="text-center">
                <div className="text-sm text-slate-500">ฐานค่าจ้างรายชั่วโมง</div>
                <div className="text-lg font-bold text-slate-800">{formatNumber(hourlyRate)} ฿</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">สรุปค่าล่วงเวลา (OT)</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">1. OT วันธรรมดา (x1.5)</span>
                  <span className="font-medium">{formatNumber(otNormalAmount)} ฿</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">
                    2. ทำงานในวันหยุด {inputs.employeeType === 'monthly' ? '(ได้เพิ่ม 1 เท่า)' : '(ได้ 2 เท่า)'}
                  </span>
                  <span className="font-medium">{formatNumber(workHolidayAmount)} ฿</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">3. OT วันหยุด (x3.0)</span>
                  <span className="font-medium">{formatNumber(otHolidayAmount)} ฿</span>
                </div>
                
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">รวมเงิน OT ทั้งหมด</span>
                    <span className="text-xl font-bold text-blue-700">{formatNumber(totalOtAmount)} ฿</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-900">รายรับรวมเบื้องต้น (Gross Pay)</span>
                <span className="text-2xl font-bold text-emerald-700">{formatNumber(totalIncome)} ฿</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 text-right">*ฐานค่าจ้าง {formatNumber(inputs.employeeType === 'monthly' ? inputs.baseSalary : inputs.baseSalary * inputs.workingDaysPerMonth)} + OT {formatNumber(totalOtAmount)}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800 flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>การคำนวณฐานรายชั่วโมงของพนักงานรายเดือน กฎหมายแรงงานกำหนดให้นำเงินเดือนหารด้วย 30 วันเสมอ (แม้เดือนนั้นจะมี 28 หรือ 31 วัน) และหารด้วยชั่วโมงทำงานปกติ (เช่น 8 ชั่วโมง)</p>
            </div>

          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">คู่มือการคิดค่าล่วงเวลา (OT) ตามกฎหมายแรงงานไทย</h2>
        
        <p>การทำงานล่วงเวลา (Overtime - OT) คือการทำงานนอกเหนือจากเวลาทำงานปกติที่นายจ้างและลูกจ้างตกลงกันไว้ ซึ่งพระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541 ได้กำหนดอัตราการจ่ายค่าตอบแทนที่เป็นธรรมเพื่อคุ้มครองลูกจ้าง โดยแบ่งออกเป็น 3 อัตราหลักๆ ดังนี้</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1. อัตรา 1.5 เท่า: ทำงานล่วงเวลาในวันทำงานปกติ</h3>
        <p>หากพนักงานต้องอยู่ทำงานต่อหลังจากเวลาเลิกงานในวันจันทร์-ศุกร์ (หรือวันทำงานปกติ) นายจ้างต้องจ่ายค่าล่วงเวลาในอัตรา <strong>ไม่น้อยกว่า 1.5 เท่า</strong> ของอัตราค่าจ้างต่อชั่วโมง</p>
        <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 font-mono">
          สูตร: (ค่าจ้างต่อวัน ÷ ชั่วโมงทำงานต่อวัน) × 1.5 × จำนวนชั่วโมง OT
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2. อัตรา 1 เท่า / 2 เท่า: ทำงานในวันหยุด (แต่ไม่เกินเวลาปกติ)</h3>
        <p>เมื่อให้พนักงานมาทำงานในวันหยุดประจำสัปดาห์ หรือวันหยุดนักขัตฤกษ์ ในช่วงเวลาทำงานปกติ (เช่น 08:00 - 17:00) อัตราการจ่ายจะต่างกันตามประเภทพนักงาน:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>พนักงานรายเดือน:</strong> ได้รับเพิ่มอีก <strong>1 เท่า</strong> ของค่าจ้างต่อชั่วโมง (เพราะในเงินเดือนปกติรวมค่าจ้างสำหรับวันหยุดไว้แล้ว 1 เท่า)</li>
          <li><strong>พนักงานรายวัน:</strong> ได้รับ <strong>2 เท่า</strong> ของค่าจ้างต่อชั่วโมง (เพราะปกติวันหยุดพวกเขาไม่ได้รับค่าจ้าง)</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">3. อัตรา 3 เท่า: ทำงานล่วงเวลาในวันหยุด</h3>
        <p>หากพนักงานมาทำงานในวันหยุด และต้องอยู่ทำ OT ลากยาวเกินกว่าเวลาทำงานปกติ (เช่น หลัง 17:00 น. ของวันอาทิตย์) ในช่วงเวลาล่วงเวลาดังกล่าว ทั้งพนักงานรายเดือนและรายวันจะต้องได้รับค่าล่วงเวลา <strong>ไม่น้อยกว่า 3 เท่า</strong> ของอัตราค่าจ้างต่อชั่วโมง</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อควรระวังสำหรับนายจ้างและฝ่าย HR</h3>
        
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> กฎหมายห้ามทำ OT เกิน 36 ชั่วโมง/สัปดาห์
            </h4>
            <p className="text-sm mt-1 text-amber-800">
              กฎหมายคุ้มครองแรงงานกำหนดไว้ชัดเจนว่า ชั่วโมงการทำงานล่วงเวลา (OT วันปกติ + งานวันหยุด + OT วันหยุด) เมื่อรวมกันแล้ว <strong>ต้องไม่เกิน 36 ชั่วโมงต่อสัปดาห์</strong> เพื่อป้องกันการใช้งานพนักงานหนักเกินไปจนส่งผลเสียต่อสุขภาพและความปลอดภัย
            </p>
          </div>
          
          <p>นอกจากนี้ การให้ลูกจ้างทำงานล่วงเวลาหรือทำงานในวันหยุด <strong>ต้องได้รับความยินยอมจากลูกจ้างเป็นคราวๆ ไป</strong> ยกเว้นในกรณีที่งานมีลักษณะต้องทำติดต่อกันไปถ้าหยุดจะเสียหายแก่งาน หรือเป็นงานฉุกเฉิน นายจ้างจึงจะสามารถสั่งให้ทำได้โดยไม่ต้องขอความยินยอม</p>
        </div>
      </article>
    </div>
  );
}
