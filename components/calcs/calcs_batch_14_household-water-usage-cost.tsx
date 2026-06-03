import React, { useState } from 'react';
import { Droplet, Users, Calculator, Info, Wallet, Bath, ShowerHead } from 'lucide-react';

export default function HouseholdWaterUsageCost({ lang }: any) {
  const [people, setPeople] = useState<number | ''>(1);
  const [litersPerPerson, setLitersPerPerson] = useState<number | ''>(200); // 200 liters/day average
  const [daysPerMonth, setDaysPerMonth] = useState<number | ''>(30);
  const [ratePerCubicMeter, setRatePerCubicMeter] = useState<number | ''>(15); // Average MWA/PWA rate

  const calculateCost = () => {
    const p = Number(people);
    const l = Number(litersPerPerson);
    const d = Number(daysPerMonth);
    const r = Number(ratePerCubicMeter);

    if (p > 0 && l > 0 && d > 0 && r > 0) {
      const litersPerDay = p * l;
      const litersPerMonth = litersPerDay * d;
      const cubicMetersPerMonth = litersPerMonth / 1000;
      const costPerMonth = cubicMetersPerMonth * r;

      return {
        litersPerDay,
        litersPerMonth,
        cubicMetersPerMonth,
        costPerMonth
      };
    }
    return null;
  };

  const results = calculateCost();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Droplet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณค่าน้ำประปาเบื้องต้น
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนสมาชิกในบ้าน (คน)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="เช่น 4"
                  min="1"
                />
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปริมาณการใช้น้ำเฉลี่ยต่อคน (ลิตร/วัน)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={litersPerPerson}
                  onChange={(e) => setLitersPerPerson(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ค่าเฉลี่ยคนไทย 200 ลิตร"
                  min="0"
                />
                <Bath className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">คนทั่วไปใช้น้ำเฉลี่ย 200 ลิตร/วัน</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนวัน (วัน/เดือน)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="เช่น 30"
                  min="1"
                  max="31"
                />
                <Calculator className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค่าน้ำประปาต่อหน่วย (บาท/ลูกบาศก์เมตร)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={ratePerCubicMeter}
                  onChange={(e) => setRatePerCubicMeter(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="เช่น 15"
                  min="0"
                  step="0.1"
                />
                <Wallet className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" />
              ผลการประเมินการใช้น้ำ
            </h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">ปริมาณน้ำที่ใช้ทั้งหมด (ลิตร/เดือน)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.litersPerMonth.toLocaleString('th-TH')} <span className="text-base font-normal">ลิตร</span>
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1">เทียบเท่าลูกบาศก์เมตร (คิว)</p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.cubicMetersPerMonth.toLocaleString('th-TH', { maximumFractionDigits: 2 })} <span className="text-base font-normal">ลบ.ม. (คิว)</span>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl shadow-sm mt-4">
                  <p className="text-sm text-blue-800 mb-1">ประมาณการค่าน้ำ (เดือน)</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ฿{results.costPerMonth.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-blue-600 mt-2 opacity-80">
                    * ไม่รวมค่าบริการรายเดือนและภาษีมูลค่าเพิ่ม
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                <ShowerHead className="w-12 h-12 mb-3 text-gray-300" />
                <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <p className="text-sm">เพื่อดูผลการประเมินค่าน้ำ</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีคำนวณค่าน้ำอุปโภคบริโภค รู้จักการใช้น้ำของครอบครัวคุณ</h2>
        
        <p>น้ำเป็นทรัพยากรที่จำเป็นต่อการดำรงชีวิต ในแต่ละเดือนครอบครัวของเราต้องมีค่าใช้จ่ายส่วนหนึ่งที่เป็น <strong>ค่าน้ำประปา</strong> แต่คุณรู้หรือไม่ว่าในแต่ละวันสมาชิกในบ้านใช้น้ำกันกี่ลิตร? การคำนวณและประเมินค่าน้ำอุปโภคบริโภคเบื้องต้น จะช่วยให้เราสามารถสังเกตพฤติกรรมการใช้น้ำ หากพบว่าปริมาณการใช้สูงผิดปกติก็อาจหมายถึงท่อรั่วซึม หรือการใช้น้ำอย่างสิ้นเปลืองได้</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คนเราใช้น้ำกันวันละเท่าไหร่?</h3>
        <p>ตามสถิติแล้ว ค่าเฉลี่ยการใช้น้ำของคนไทยในเขตเมืองจะอยู่ที่ประมาณ 200 ลิตร ต่อคน ต่อวัน (ทั้งนี้ขึ้นอยู่กับพฤติกรรมส่วนบุคคลและกิจกรรมในแต่ละวัน) โดยปริมาณน้ำเหล่านี้ถูกใช้ไปกับหลายๆ กิจกรรม เช่น:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>การอาบน้ำ:</strong> ฝักบัวใช้น้ำประมาณ 9-15 ลิตรต่อนาที การอาบน้ำในอ่างอาจใช้ถึง 100-200 ลิตร</li>
          <li><strong>การชักโครก:</strong> ชักโครกรุ่นเก่าอาจใช้น้ำ 9-12 ลิตรต่อครั้ง รุ่นประหยัดจะใช้เพียง 3-6 ลิตร</li>
          <li><strong>การซักผ้า:</strong> เครื่องซักผ้าแบบฝาบนใช้น้ำค่อนข้างมาก ส่วนแบบฝาหน้าจะประหยัดกว่ามาก</li>
          <li><strong>การล้างจาน ล้างรถ หรือรดน้ำต้นไม้:</strong> กิจกรรมเหล่านี้มักใช้น้ำในปริมาณหลายสิบลิตรถึงหลักร้อยลิตร หากเปิดน้ำทิ้งไว้ตลอด</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">น้ำ 1 คิว คืออะไร? คำนวณอย่างไร?</h3>
        <p>หน่วยวัดน้ำประปาที่เราเห็นในบิล มักจะระบุเป็น "ลูกบาศก์เมตร" หรือที่เราเรียกกันติดปากว่า <strong>"คิว" (Cubic Meter)</strong> โดย 1 คิว จะเท่ากับน้ำ 1,000 ลิตร (หรือถังน้ำขนาด 200 ลิตร จำนวน 5 ถัง)</p>
        <p>หากคุณต้องการแปลงปริมาณน้ำที่ใช้เป็นคิว สามารถทำได้ง่ายๆ โดยนำปริมาณน้ำรวมทั้งหมด (หน่วยเป็นลิตร) มาหารด้วย 1,000 ยกตัวอย่างเช่น ถ้าครอบครัวคุณใช้น้ำไป 25,000 ลิตรในหนึ่งเดือน ปริมาณน้ำคิดเป็นคิวจะเท่ากับ 25 คิวนั่นเอง เมื่อนำไปคูณกับอัตราค่าน้ำประปาต่อหน่วย (ซึ่งแตกต่างกันไปตามการประปานครหลวง การประปาส่วนภูมิภาค และประเภทผู้ใช้) ก็จะได้เป็นค่าน้ำประปาเบื้องต้น</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีง่ายๆ ในการประหยัดน้ำและลดค่าใช้จ่าย</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ตรวจสอบรอยรั่วซึม:</strong> ปิดก๊อกน้ำทุกจุดในบ้านแล้วไปดูที่มาตรวัดน้ำ (มิเตอร์) หากมิเตอร์ยังหมุนอยู่ แสดงว่ามีจุดรั่วซึม ควรรีบตามช่างมาแก้ไขทันที เพราะรอยรั่วเล็กๆ อาจทำให้เสียน้ำไปฟรีๆ หลายร้อยลิตรต่อวัน</li>
          <li><strong>เปลี่ยนมาใช้ก๊อกน้ำหรือชักโครกประหยัดน้ำ:</strong> อุปกรณ์รุ่นใหม่ๆ มักออกแบบมาให้ประหยัดน้ำมากขึ้น เช่น ชักโครกแบบ Dual Flush ที่เลือกระดับน้ำได้ หรือหัวก๊อกที่มีตัวเติมอากาศ (Aerator) ที่ช่วยให้น้ำฟุ้งกระจายแต่ใช้น้ำน้อยลง</li>
          <li><strong>ปรับเปลี่ยนพฤติกรรม:</strong> ปิดน้ำขณะแปรงฟัน ถูสบู่ หรือล้างจาน รองน้ำใส่กะละมังล้างผักผลไม้แทนการเปิดน้ำไหลผ่าน หรือใช้ฝักบัวอาบน้ำแทนการแช่ในอ่าง</li>
        </ol>

        <p className="mt-6 p-4 bg-yellow-50 text-yellow-900 rounded-lg border border-yellow-200">
          <Info className="inline-block w-5 h-5 mr-2 -mt-1" />
          <strong>หมายเหตุเกี่ยวกับการประเมินค่าน้ำ:</strong> โปรแกรมคำนวณค่าน้ำนี้เป็นการประเมินเบื้องต้นแบบเส้นตรง (อัตราคงที่) แต่ในความเป็นจริง การประปาจะคิดอัตราก้าวหน้า (ยิ่งใช้เยอะ หน่วยหลังๆ จะยิ่งแพง) และยังมีค่าบริการรายเดือน รวมถึงภาษีมูลค่าเพิ่ม 7% ดังนั้นค่าน้ำในบิลจริงอาจสูงกว่าที่คำนวณได้เล็กน้อย
        </p>
      </article>
    </div>
  );
}
