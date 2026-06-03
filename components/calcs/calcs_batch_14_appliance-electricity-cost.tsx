import React, { useState } from 'react';
import { Zap, Calculator, Info, Lightbulb, Clock, CalendarDays, Receipt } from 'lucide-react';

export default function ApplianceElectricityCost({ lang }: any) {
  const [wattage, setWattage] = useState<number | ''>('');
  const [hoursPerDay, setHoursPerDay] = useState<number | ''>('');
  const [daysPerMonth, setDaysPerMonth] = useState<number | ''>(30);
  const [ratePerKwh, setRatePerKwh] = useState<number | ''>(4.72);

  const calculateCost = () => {
    const p = Number(wattage);
    const h = Number(hoursPerDay);
    const d = Number(daysPerMonth);
    const r = Number(ratePerKwh);

    if (p > 0 && h > 0 && d > 0 && r > 0) {
      const unitsPerDay = (p * h) / 1000;
      const unitsPerMonth = unitsPerDay * d;
      const costPerDay = unitsPerDay * r;
      const costPerMonth = unitsPerMonth * r;
      const costPerYear = costPerDay * 365;

      return {
        unitsPerMonth,
        costPerDay,
        costPerMonth,
        costPerYear
      };
    }
    return null;
  };

  const results = calculateCost();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณค่าไฟเครื่องใช้ไฟฟ้า
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                กำลังไฟฟ้า (วัตต์ / Watts)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={wattage}
                  onChange={(e) => setWattage(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="เช่น 1000"
                  min="0"
                />
                <Zap className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">ดูได้จากฉลากหลังเครื่องใช้ไฟฟ้า</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชั่วโมงที่ใช้งานต่อวัน (ชั่วโมง)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="เช่น 8"
                  min="0"
                  max="24"
                />
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนวันที่ใช้งานใน 1 เดือน (วัน)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="เช่น 30"
                  min="0"
                  max="31"
                />
                <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค่าไฟต่อหน่วย (บาท / kWh)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={ratePerKwh}
                  onChange={(e) => setRatePerKwh(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="ค่าเฉลี่ยประมาณ 4.72"
                  min="0"
                  step="0.01"
                />
                <Receipt className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              ผลการประเมินค่าไฟ
            </h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">หน่วยไฟที่ใช้ (เดือน)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.unitsPerMonth.toLocaleString('th-TH', { maximumFractionDigits: 2 })} <span className="text-base font-normal">หน่วย</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                    <p className="text-sm text-gray-500 mb-1">ค่าไฟต่อวัน</p>
                    <p className="text-xl font-bold text-yellow-600">
                      ฿{results.costPerDay.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                    <p className="text-sm text-gray-500 mb-1">ค่าไฟต่อปี (ประมาณ)</p>
                    <p className="text-xl font-bold text-red-600">
                      ฿{results.costPerYear.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow-sm mt-4">
                  <p className="text-sm text-yellow-800 mb-1">ค่าไฟต่อเดือน (ประมาณ)</p>
                  <p className="text-4xl font-bold text-yellow-600">
                    ฿{results.costPerMonth.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                <Lightbulb className="w-12 h-12 mb-3 text-gray-300" />
                <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <p className="text-sm">เพื่อดูผลการคำนวณ</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีคำนวณค่าไฟเครื่องใช้ไฟฟ้าแต่ละชนิด รู้ไว้ช่วยประหยัดเงินในกระเป๋า</h2>
        
        <p>คุณเคยสงสัยหรือไม่ว่า เครื่องใช้ไฟฟ้าภายในบ้านแต่ละชิ้นกินไฟเท่าไหร่? การรู้วิธี <strong>คำนวณค่าไฟเครื่องใช้ไฟฟ้า</strong> จะช่วยให้เราสามารถวางแผนการใช้พลังงานในบ้านได้อย่างมีประสิทธิภาพ และที่สำคัญคือช่วยลดภาระค่าใช้จ่ายรายเดือนได้เป็นอย่างดี ในบทความนี้เราจะมาเจาะลึกถึงวิธีการคำนวณอย่างง่ายๆ และเทคนิคการประหยัดไฟที่คุณอาจไม่เคยรู้มาก่อน</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงต้องคำนวณค่าไฟรายเครื่อง?</h3>
        <p>หลายคนอาจตกใจเมื่อเห็นบิลค่าไฟตอนสิ้นเดือน แต่ไม่รู้ว่าสาเหตุหลักมาจากเครื่องใช้ไฟฟ้าชิ้นไหน การแยกคำนวณค่าไฟของเครื่องใช้ไฟฟ้าแต่ละชนิด (Appliance Electricity Cost) จะช่วยชี้เป้า "ตัวการกินไฟ" ภายในบ้าน เช่น เครื่องปรับอากาศเก่าที่อาจทำงานหนักเกินไป หรือตู้เย็นที่ตั้งอุณหภูมิเย็นจัดตลอดเวลา เมื่อเรารู้ว่าอุปกรณ์ไหนกินไฟเยอะ เราก็สามารถปรับพฤติกรรมการใช้งาน หรือพิจารณาเปลี่ยนไปใช้เครื่องใช้ไฟฟ้าที่ประหยัดพลังงานมากขึ้น (เช่น ฉลากเบอร์ 5)</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณค่าไฟฟ้าแบบเข้าใจง่าย</h3>
        <p>การคำนวณค่าไฟนั้นไม่ได้ซับซ้อนอย่างที่คิด สิ่งที่คุณต้องเตรียมคือข้อมูลเบื้องต้นดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>กำลังไฟฟ้า (Watts):</strong> ดูได้จากฉลากหรือสติ๊กเกอร์หลังเครื่องใช้ไฟฟ้า</li>
          <li><strong>ระยะเวลาที่ใช้งาน (ชั่วโมง/วัน):</strong> จำนวนชั่วโมงโดยเฉลี่ยที่ใช้งานในหนึ่งวัน</li>
          <li><strong>ค่าไฟต่อหน่วย (บาท/kWh):</strong> อัตราค่าไฟฟ้าตามจริงของการไฟฟ้า ปัจจุบันเฉลี่ยอยู่ที่ประมาณ 4-5 บาทต่อหน่วย</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
          <p className="font-semibold text-gray-900 mb-2">สูตรคำนวณ:</p>
          <p>1. หาจำนวนหน่วยไฟ (Unit) = (กำลังไฟฟ้า (วัตต์) × จำนวนชั่วโมงที่ใช้) / 1000</p>
          <p>2. หาค่าไฟ = จำนวนหน่วยไฟ × อัตราค่าไฟต่อหน่วย</p>
        </div>
        <p>ตัวอย่างเช่น: พัดลมตั้งโต๊ะขนาด 50 วัตต์ เปิดใช้งานวันละ 10 ชั่วโมง</p>
        <p className="pl-4 border-l-4 border-yellow-400 my-2 text-gray-700 italic">
          หน่วยไฟ = (50 × 10) / 1000 = 0.5 หน่วยต่อวัน<br/>
          หากค่าไฟหน่วยละ 4.7 บาท จะเสียค่าไฟ = 0.5 × 4.7 = 2.35 บาทต่อวัน หรือประมาณ 70.5 บาทต่อเดือน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทริคการลดค่าไฟฟ้าแบบเห็นผล</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ถอดปลั๊กเมื่อไม่ใช้งาน:</strong> เครื่องใช้ไฟฟ้าหลายชนิด เช่น โทรทัศน์ เครื่องเสียง หรือกล่องรับสัญญาณ แม้จะปิดเครื่องแล้วแต่หากยังเสียบปลั๊กอยู่ก็ยังคงมีการใช้กระแสไฟฟ้า (Standby power) การถอดปลั๊กหรือใช้ปลั๊กพ่วงแบบมีสวิตช์ปิด-เปิดจะช่วยลดการสูญเสียพลังงานส่วนนี้ได้</li>
          <li><strong>เลือกใช้เครื่องใช้ไฟฟ้าที่มีฉลากประหยัดไฟเบอร์ 5:</strong> โดยเฉพาะเครื่องใช้ไฟฟ้าที่ต้องทำงานตลอดเวลาอย่างตู้เย็น หรือเครื่องปรับอากาศ ควรเลือกรุ่นที่ได้รับการรับรองฉลากประหยัดไฟเบอร์ 5 (ยิ่งดาวเยอะยิ่งประหยัด) ซึ่งแม้จะมีราคาเริ่มต้นสูงกว่า แต่คุ้มค่าในระยะยาวแน่นอน</li>
          <li><strong>บำรุงรักษาอย่างสม่ำเสมอ:</strong> เช่น การล้างแอร์ทุกๆ 6 เดือน การละลายน้ำแข็งในตู้เย็น หรือการทำความสะอาดไส้กรองเครื่องฟอกอากาศ จะช่วยให้เครื่องทำงานได้อย่างมีประสิทธิภาพและไม่กินไฟ</li>
        </ol>

        <p className="mt-6 p-4 bg-blue-50 text-blue-900 rounded-lg">
          <Info className="inline-block w-5 h-5 mr-2 -mt-1" />
          <strong>ข้อควรระวัง:</strong> อัตราค่าไฟฟ้าที่นำมาคำนวณเป็นเพียงค่าเฉลี่ยเบื้องต้น ค่าไฟฟ้าจริงอาจมีการเปลี่ยนแปลงตามอัตราก้าวหน้า (ยิ่งใช้เยอะ หน่วยหลังๆ ยิ่งแพง) และค่า Ft ในแต่ละรอบเดือน ดังนั้นควรตรวจสอบบิลค่าไฟของการไฟฟ้านครหลวง (MEA) หรือการไฟฟ้าส่วนภูมิภาค (PEA) เพื่อความแม่นยำสูงสุด
        </p>
      </article>
    </div>
  );
}
