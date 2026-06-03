import React, { useState } from 'react';
import { Briefcase, Calculator, AlertTriangle, CheckCircle2, Calendar } from 'lucide-react';

export default function SeverancePayCalculation({ lang }: any) {
  const [inputs, setInputs] = useState({
    startDate: '2015-01-01',
    endDate: new Date().toISOString().split('T')[0],
    salary: 30000,
    noticeGiven: false, // ได้บอกกล่าวล่วงหน้าหรือไม่
    isFault: false,     // เลิกจ้างด้วยความผิดหรือไม่
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setInputs(prev => ({ ...prev, [e.target.name]: value }));
  };

  // Calculate Tenure
  const start = new Date(inputs.startDate);
  const end = new Date(inputs.endDate);
  
  // Calculate difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Daily Wage based on latest salary (Standard calculation is Salary / 30)
  const dailyWage = inputs.salary / 30;

  // Determine Severance Pay Days based on Thai Labor Law
  let severanceDays = 0;
  if (diffDays < 120) {
    severanceDays = 0;
  } else if (diffDays >= 120 && years < 1) {
    severanceDays = 30;
  } else if (years >= 1 && years < 3) {
    severanceDays = 90;
  } else if (years >= 3 && years < 6) {
    severanceDays = 180;
  } else if (years >= 6 && years < 10) {
    severanceDays = 240;
  } else if (years >= 10 && years < 20) {
    severanceDays = 300;
  } else if (years >= 20) {
    severanceDays = 400;
  }

  // If dismissed with fault, severance is 0
  if (inputs.isFault) {
    severanceDays = 0;
  }

  const severanceAmount = severanceDays * dailyWage;

  // Pay in lieu of notice (ค่าตกใจ) - Usually 1 payment period, simplified to 30 days
  let noticePayDays = 0;
  if (!inputs.noticeGiven && !inputs.isFault) {
    noticePayDays = 30; // standard assumption for 1 pay period
  }
  const noticePayAmount = noticePayDays * dailyWage;

  const totalAmount = severanceAmount + noticePayAmount;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-800">คำนวณเงินชดเชยเลิกจ้าง (Severance Pay)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> อายุงานและฐานเงินเดือน
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">วันที่เริ่มงาน</label>
                  <input type="date" name="startDate" value={inputs.startDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">วันสุดท้ายของการทำงาน</label>
                  <input type="date" name="endDate" value={inputs.endDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">เงินเดือนเดือนสุดท้าย (บาท)</label>
                  <input type="number" name="salary" value={inputs.salary} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  <p className="text-xs text-slate-500 mt-1">ใช้คำนวณฐานค่าจ้างรายวัน ({formatNumber(dailyWage)} บาท/วัน)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">เงื่อนไขการเลิกจ้าง</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" name="noticeGiven" checked={inputs.noticeGiven} onChange={handleChange} className="mt-1 w-4 h-4 text-indigo-600 rounded" />
                  <div>
                    <div className="font-medium">นายจ้างได้บอกกล่าวล่วงหน้าแล้ว (อย่างน้อย 1 งวดการจ่ายเงิน)</div>
                    <div className="text-sm text-slate-500">หากไม่ได้บอกกล่าวล่วงหน้า ลูกจ้างมีสิทธิได้ "ค่าตกใจ" (เงินแทนการบอกกล่าวล่วงหน้า)</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50 border-red-100">
                  <input type="checkbox" name="isFault" checked={inputs.isFault} onChange={handleChange} className="mt-1 w-4 h-4 text-red-600 rounded" />
                  <div>
                    <div className="font-medium text-red-700">เลิกจ้างเนื่องจากลูกจ้างทำผิดร้ายแรง / ทุจริต / ละทิ้งหน้าที่</div>
                    <div className="text-sm text-red-600/80">ตาม ม.119 หากเข้าข่ายนี้ นายจ้างไม่ต้องจ่ายเงินชดเชยใดๆ</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500 mb-1">อายุงานทั้งหมด</div>
                <div className="text-xl font-bold text-slate-800">
                  {years > 0 && `${years} ปี `}{months > 0 && `${months} เดือน `}{days} วัน
                </div>
                <div className="text-xs text-slate-500 mt-1">(รวม {diffDays} วัน)</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">สิทธิได้รับเงินชดเชย</div>
                <div className="text-xl font-bold text-indigo-700">{severanceDays} วัน</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">สรุปเงินที่ต้องได้รับ</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">เงินชดเชยเลิกจ้าง ({severanceDays} วัน)</span>
                  <span className="font-medium">{formatNumber(severanceAmount)} ฿</span>
                </div>
                
                {!inputs.noticeGiven && !inputs.isFault && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 flex items-center gap-1">
                      เงินแทนการบอกกล่าวล่วงหน้า (ค่าตกใจ)
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">ประมาณ 30 วัน</span>
                    </span>
                    <span className="font-medium">{formatNumber(noticePayAmount)} ฿</span>
                  </div>
                )}
                
                {inputs.isFault && (
                  <div className="p-2 bg-red-50 text-red-700 text-sm rounded border border-red-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>ไม่มีสิทธิได้รับเงินชดเชยเนื่องจากเป็นการเลิกจ้างด้วยความผิดของลูกจ้างตามมาตรา 119</span>
                  </div>
                )}
                
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">รวมจำนวนเงินที่ควรได้รับสุทธิ</span>
                    <span className="text-2xl font-bold text-indigo-700">{formatNumber(totalAmount)} ฿</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 flex items-start gap-1">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500" />
              การคำนวณนี้เป็นการประเมินเบื้องต้นตามพระราชบัญญัติคุ้มครองแรงงาน ค่าตกใจอาจมากกว่า 30 วันได้ขึ้นอยู่กับรอบการตัดจ่ายเงินเดือน
            </p>
          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">กฎหมายแรงงานไทย: อัตราเงินชดเชยเลิกจ้าง (Severance Pay)</h2>
        
        <p>การเลิกจ้าง (Dismissal) เป็นสิ่งที่ไม่มีใครอยากให้เกิด แต่เมื่อหลีกเลี่ยงไม่ได้ กฎหมายคุ้มครองแรงงาน พ.ศ. 2541 ของไทยได้กำหนดสิทธิประโยชน์เพื่อบรรเทาความเดือดร้อนให้แก่ลูกจ้างที่สูญเสียรายได้กะทันหัน โดยนายจ้างมีหน้าที่ต้องจ่าย <strong>เงินชดเชยเลิกจ้าง (Severance Pay)</strong> ตามอายุงาน</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">อัตราเงินชดเชยตามกฎหมายล่าสุด</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-200 mb-4">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-2">อายุงานของลูกจ้าง</th>
                <th className="border p-2">อัตราเงินชดเชย (คิดจากค่าจ้างอัตราสุดท้าย)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">ไม่ถึง 120 วัน (ทดลองงาน)</td>
                <td className="border p-2 font-medium text-slate-500">ไม่ได้เงินชดเชย</td>
              </tr>
              <tr>
                <td className="border p-2">120 วัน แต่ไม่ครบ 1 ปี</td>
                <td className="border p-2 font-bold text-indigo-600">30 วัน (1 เดือน)</td>
              </tr>
              <tr>
                <td className="border p-2">1 ปี แต่ไม่ครบ 3 ปี</td>
                <td className="border p-2 font-bold text-indigo-600">90 วัน (3 เดือน)</td>
              </tr>
              <tr>
                <td className="border p-2">3 ปี แต่ไม่ครบ 6 ปี</td>
                <td className="border p-2 font-bold text-indigo-600">180 วัน (6 เดือน)</td>
              </tr>
              <tr>
                <td className="border p-2">6 ปี แต่ไม่ครบ 10 ปี</td>
                <td className="border p-2 font-bold text-indigo-600">240 วัน (8 เดือน)</td>
              </tr>
              <tr>
                <td className="border p-2">10 ปี แต่ไม่ครบ 20 ปี</td>
                <td className="border p-2 font-bold text-indigo-600">300 วัน (10 เดือน)</td>
              </tr>
              <tr>
                <td className="border p-2">20 ปี ขึ้นไป (อัปเดต พ.ร.บ. ฉบับที่ 7 พ.ศ. 2562)</td>
                <td className="border p-2 font-bold text-indigo-600">400 วัน (ประมาณ 13.3 เดือน)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">"ค่าตกใจ" คืออะไร?</h3>
        <p>นอกเหนือจากเงินชดเชยเลิกจ้างแล้ว ตามมาตรา 17 หากนายจ้างจะเลิกจ้างลูกจ้าง จะต้องบอกกล่าวล่วงหน้าอย่างน้อย 1 งวดการจ่ายเงิน (เช่น จ่ายเงินทุกสิ้นเดือน ต้องบอกสิ้นเดือนนี้เพื่อให้มีผลสิ้นเดือนหน้า) หากนายจ้างต้องการให้ลูกจ้าง <strong>"ออกทันที"</strong> โดยไม่ได้บอกล่วงหน้า นายจ้างต้องจ่าย <strong>"เงินแทนการบอกกล่าวล่วงหน้า"</strong> หรือที่เรียกกันติดปากว่า <strong>"ค่าตกใจ"</strong> เท่ากับค่าจ้าง 1 งวดนั้นด้วย</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">กรณีที่นายจ้าง "ไม่ต้อง" จ่ายเงินชดเชย (มาตรา 119)</h3>
        <p>ลูกจ้างจะหมดสิทธิรับเงินชดเชยทันที หากถูกเลิกจ้างด้วยสาเหตุความผิดร้ายแรงต่อไปนี้:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>ทุจริตต่อหน้าที่ หรือกระทำความผิดอาญาโดยเจตนาแก่นายจ้าง</li>
          <li>จงใจทำให้นายจ้างได้รับความเสียหาย</li>
          <li>ประมาทเลินเล่อเป็นเหตุให้นายจ้างได้รับความเสียหายอย่างร้ายแรง</li>
          <li>ฝ่าฝืนข้อบังคับเกี่ยวกับการทำงานที่ชอบด้วยกฎหมายและเป็นธรรม ซึ่งนายจ้างได้ตักเตือนเป็นหนังสือแล้ว (เว้นแต่กรณีร้ายแรงไม่ต้องเตือน)</li>
          <li>ละทิ้งหน้าที่เป็นเวลา 3 วันทำงานติดต่อกันโดยไม่มีเหตุอันสมควร</li>
          <li>ได้รับโทษจำคุกตามคำพิพากษาถึงที่สุดให้จำคุก</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
          <p className="flex items-start gap-2 text-blue-900">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span><strong>ข้อแนะนำเพิ่มเติม:</strong> หากลูกจ้างเป็นฝ่าย <strong>"ลาออกเอง"</strong> จะไม่มีสิทธิเรียกร้องเงินชดเชยเลิกจ้าง แต่ยังมีสิทธิได้รับเงินค่าจ้างจนถึงวันสุดท้ายที่ทำงาน รวมถึงเงินชดเชยวันหยุดพักผ่อนประจำปี (ลาพักร้อน) ที่ยังไม่ได้ใช้ตามสัดส่วน</span>
          </p>
        </div>
      </article>
    </div>
  );
}
