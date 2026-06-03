import React, { useState } from 'react';
import { Waves, Zap, Droplet, Hammer, Beaker, Calendar, Coins, Sparkles } from 'lucide-react';

export default function PoolMaintenanceCost({ lang }: any) {
  // Monthly costs
  const [cleaningService, setCleaningService] = useState<number | ''>('');
  const [chemicals, setChemicals] = useState<number | ''>('');
  const [electricity, setElectricity] = useState<number | ''>('');
  const [waterTopUp, setWaterTopUp] = useState<number | ''>('');

  // Yearly costs
  const [annualMaintenance, setAnnualMaintenance] = useState<number | ''>('');

  const calculateCosts = () => {
    const service = Number(cleaningService) || 0;
    const chem = Number(chemicals) || 0;
    const elec = Number(electricity) || 0;
    const water = Number(waterTopUp) || 0;
    const annual = Number(annualMaintenance) || 0;

    const monthlyTotal = service + chem + elec + water;
    const yearlyTotal = (monthlyTotal * 12) + annual;

    return {
      monthlyTotal,
      yearlyTotal,
      breakdown: { service, chem, elec, water, annual }
    };
  };

  const results = calculateCosts();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-cyan-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
            <Waves className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณค่าดูแลสระว่ายน้ำ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            {/* Monthly Costs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500"/>
                ค่าใช้จ่ายรายเดือน (บาท/เดือน)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าบริการทำความสะอาดสระ
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={cleaningService}
                    onChange={(e) => setCleaningService(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="เช่น 2,000 (ถ้าจ้างคนนอก)"
                    min="0"
                  />
                  <Sparkles className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าสารเคมี (คลอรีน / เกลือ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={chemicals}
                    onChange={(e) => setChemicals(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="เช่น 500"
                    min="0"
                  />
                  <Beaker className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าไฟฟ้า (สำหรับปั๊มน้ำสระ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="ประเมินค่าไฟรายเดือน"
                    min="0"
                  />
                  <Zap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าน้ำประปา (สำหรับเติมสระ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={waterTopUp}
                    onChange={(e) => setWaterTopUp(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="ค่าน้ำประปารายเดือน"
                    min="0"
                  />
                  <Droplet className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Yearly Costs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500"/>
                ค่าซ่อมบำรุงรายปี (บาท/ปี)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าเปลี่ยนทรายกรอง ซ่อมปั๊มน้ำ
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={annualMaintenance}
                    onChange={(e) => setAnnualMaintenance(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="เช่น 5,000"
                    min="0"
                  />
                  <Hammer className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Coins className="w-5 h-5 text-cyan-500"/>
              สรุปค่าดูแลรักษาสระว่ายน้ำ
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-cyan-100 text-center">
                <p className="text-sm text-cyan-800 mb-2">ค่าใช้จ่ายเฉลี่ยต่อเดือน</p>
                <p className="text-4xl font-bold text-cyan-600">
                  ฿{results.monthlyTotal.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center mt-4">
                <p className="text-sm text-gray-600 mb-2">ค่าใช้จ่ายรวมต่อปี (ประมาณ)</p>
                <p className="text-2xl font-bold text-gray-800">
                  ฿{results.yearlyTotal.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  (รวมค่าซ่อมบำรุงรายปีแล้ว)
                </p>
              </div>

              {/* Progress/Breakdown visual */}
              {results.yearlyTotal > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">สัดส่วนค่าใช้จ่ายรายเดือน</p>
                  <div className="space-y-3">
                    {results.breakdown.service > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1"><Sparkles className="w-3 h-3"/> ทำความสะอาด</span>
                        <span className="font-medium">{(results.breakdown.service / results.monthlyTotal * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {results.breakdown.chem > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1"><Beaker className="w-3 h-3"/> สารเคมี</span>
                        <span className="font-medium">{(results.breakdown.chem / results.monthlyTotal * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {results.breakdown.elec > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1"><Zap className="w-3 h-3"/> ไฟฟ้า</span>
                        <span className="font-medium">{(results.breakdown.elec / results.monthlyTotal * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    {results.breakdown.water > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1"><Droplet className="w-3 h-3"/> น้ำประปา</span>
                        <span className="font-medium">{(results.breakdown.water / results.monthlyTotal * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">เจาะลึกค่าใช้จ่ายดูแลสระว่ายน้ำส่วนตัว (Pool Maintenance Cost) ก่อนตัดสินใจสร้าง</h2>
        
        <p>การมีสระว่ายน้ำส่วนตัวในบ้านเป็นความฝันของหลายครอบครัว เพราะนอกจากจะเป็นพื้นที่พักผ่อน ออกกำลังกาย และทำกิจกรรมร่วมกันแล้ว ยังช่วยเพิ่มมูลค่าและความสวยงามให้กับตัวบ้านอีกด้วย แต่การสร้างสระว่ายน้ำนั้น "ค่าก่อสร้าง" เป็นเพียงจุดเริ่มต้นเท่านั้น สิ่งที่เจ้าของบ้านต้องเผชิญในระยะยาวคือ <strong>"ค่าดูแลรักษาสระว่ายน้ำ" (Pool Maintenance Cost)</strong> ซึ่งเป็นค่าใช้จ่ายประจำที่หลีกเลี่ยงไม่ได้ หากต้องการให้น้ำใสสะอาดและปลอดภัยอยู่เสมอ</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4 ค่าใช้จ่ายหลักรายเดือนที่คุณต้องรู้</h3>
        <p>การประเมินงบประมาณรายเดือนในการดูแลสระว่ายน้ำ ประกอบด้วย 4 ส่วนสำคัญ ดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>1. ค่าบริการทำความสะอาด (Cleaning Service):</strong> หากคุณไม่มีเวลาดูแลเอง การจ้างผู้รับเหมาหรือบริษัทรับดูแลสระว่ายน้ำถือเป็นทางเลือกยอดนิยม โดยปกติจะเข้ามาทำความสะอาดสระ ดูดฝุ่นตะกอน ล้างเครื่องกรอง และเติมสารเคมี สัปดาห์ละ 1-2 ครั้ง ค่าบริการมักเริ่มต้นที่ 2,000 - 5,000 บาทต่อเดือน ขึ้นอยู่กับขนาดของสระ</li>
          <li><strong>2. ค่าสารเคมี (Chemicals):</strong> สระว่ายน้ำต้องการสารเคมีเพื่อฆ่าเชื้อโรคและปรับสภาพน้ำ ไม่ว่าจะเป็นสระระบบคลอรีน หรือระบบเกลือ (ซึ่งต้องเติมเกลือและอาจมีคลอรีนช็อคบ้าง) รวมถึงน้ำยาปรับค่า pH หรือน้ำยาแก้น้ำเขียว ค่าใช้จ่ายส่วนนี้มักตกอยู่หลักร้อยถึงพันต้นๆ ต่อเดือน</li>
          <li><strong>3. ค่าไฟฟ้า (Electricity):</strong> ปั๊มน้ำของสระว่ายน้ำจำเป็นต้องทำงานทุกวันเพื่อหมุนเวียนน้ำผ่านระบบกรอง (โดยทั่วไปวันละ 6-8 ชั่วโมง) ซึ่งปั๊มน้ำมักกินไฟค่อนข้างมาก ค่าไฟที่เพิ่มขึ้นจากส่วนนี้อาจสูงถึง 1,000 - 3,000 บาทต่อเดือน</li>
          <li><strong>4. ค่าน้ำประปา (Water):</strong> น้ำในสระจะมีการระเหยไปตามธรรมชาติ รวมถึงสูญเสียน้ำจากการทำความสะอาดระบบกรอง (Backwash) ทำให้ต้องเปิดน้ำประปาเติมสระเป็นระยะๆ แม้จะไม่มากเท่าตอนเติมสระครั้งแรก แต่ก็เป็นค่าใช้จ่ายที่เพิ่มเข้ามา</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ค่าซ่อมบำรุงรายปี (Annual Maintenance) ที่ไม่ควรมองข้าม</h3>
        <p>นอกจากค่าใช้จ่ายรายเดือนแล้ว อุปกรณ์สระว่ายน้ำย่อมมีการเสื่อมสภาพตามกาลเวลา เจ้าของบ้านควรเผื่องบประมาณสำหรับการบำรุงรักษารายปีไว้ด้วย เช่น:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การเปลี่ยนสารกรอง:</strong> เช่น การเปลี่ยนทรายในถังกรอง (Sand Filter) ซึ่งควรทำทุกๆ 1-3 ปี เพื่อให้ระบบกรองทำงานได้อย่างมีประสิทธิภาพ</li>
          <li><strong>การบำรุงรักษาปั๊มน้ำและระบบเกลือ:</strong> การล้างเซลล์เครื่องทำคลอรีนจากเกลือ (Salt Chlorinator Cell) หรือการเปลี่ยนซีลยางต่างๆ ในปั๊มน้ำ</li>
          <li><strong>การซ่อมแซมโครงสร้าง:</strong> เช่น ยาแนวกระเบื้องที่หลุดร่อน หรือหลอดไฟใต้น้ำที่ขาด</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีลดค่าดูแลสระว่ายน้ำให้ประหยัดที่สุด</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ดูแลด้วยตัวเอง (DIY Maintenance):</strong> หากมีเวลาและพร้อมเรียนรู้ การทำความสะอาดสระและวัดค่าสารเคมีด้วยตัวเอง จะช่วยประหยัดค่าจ้างบริการไปได้มากถึง 50-70% เลยทีเดียว</li>
          <li><strong>เลือกใช้ปั๊มน้ำแบบ Inverter:</strong> หรือ Variable Speed Pump ซึ่งสามารถปรับความเร็วรอบการทำงานได้ ช่วยประหยัดค่าไฟฟ้าได้มากกว่าปั๊มแบบธรรมดา (Single Speed) ค่อนข้างมาก แม้ราคาเครื่องตอนแรกจะสูงกว่าก็ตาม</li>
          <li><strong>ใช้ผ้าคลุมสระ (Pool Cover):</strong> เมื่อไม่ได้ใช้งานสระ การคลุมสระจะช่วยลดการระเหยของน้ำ ลดการสูญเสียคลอรีนจากแสงแดด และป้องกันเศษใบไม้ตกลงสระ ซึ่งช่วยลดภาระการทำความสะอาดและลดค่าสารเคมีได้</li>
        </ol>

        <p className="mt-6 p-4 bg-cyan-50 text-cyan-900 rounded-lg">
          <strong>สรุป:</strong> ก่อนตัดสินใจสร้างสระว่ายน้ำ ควรนำค่าใช้จ่ายเหล่านี้มาคำนวณและประเมินกำลังทรัพย์ในระยะยาว เพื่อให้สระว่ายน้ำในฝันสร้างความสุขให้ครอบครัวได้อย่างแท้จริง โดยไม่ต้องมานั่งปวดหัวกับค่าบำรุงรักษาที่บานปลายในภายหลัง
        </p>
      </article>
    </div>
  );
}
