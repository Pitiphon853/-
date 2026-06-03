import React, { useState } from 'react';
import { Sun, Zap, Coins, TrendingUp, PiggyBank, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function HomeSolarInstallationCost({ lang }: any) {
  const [systemSizeKw, setSystemSizeKw] = useState<number>(5);
  const [costPerKw, setCostPerKw] = useState<number | ''>(35000);
  const [savingPerKwMonthly, setSavingPerKwMonthly] = useState<number | ''>(500);

  const calculateSolar = () => {
    const size = Number(systemSizeKw);
    const costKw = Number(costPerKw) || 0;
    const saveKwMo = Number(savingPerKwMonthly) || 0;

    if (size > 0 && costKw > 0) {
      const totalCost = size * costKw;
      const monthlySaving = size * saveKwMo;
      const yearlySaving = monthlySaving * 12;
      
      let paybackYears = 0;
      let paybackMonths = 0;
      if (yearlySaving > 0) {
        paybackYears = totalCost / yearlySaving;
        paybackMonths = (paybackYears - Math.floor(paybackYears)) * 12;
      }

      // Estimate roof area needed (approx 5-6 sqm per kW)
      const roofAreaNeeded = size * 6;

      return {
        totalCost,
        monthlySaving,
        yearlySaving,
        paybackYears: Math.floor(paybackYears),
        paybackMonths: Math.round(paybackMonths),
        paybackRaw: paybackYears,
        roofAreaNeeded
      };
    }
    return null;
  };

  const results = calculateSolar();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Sun className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณความคุ้มค่า โซลาร์รูฟท็อป
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ขนาดระบบที่ต้องการติดตั้ง (กิโลวัตต์ - kW)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <button
                  onClick={() => setSystemSizeKw(3)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${systemSizeKw === 3 ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                >
                  3 kW<br/><span className="text-[10px] font-normal opacity-80">(บ้านทั่วไป)</span>
                </button>
                <button
                  onClick={() => setSystemSizeKw(5)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${systemSizeKw === 5 ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                >
                  5 kW<br/><span className="text-[10px] font-normal opacity-80">(บ้าน 2-3 แอร์)</span>
                </button>
                <button
                  onClick={() => setSystemSizeKw(10)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${systemSizeKw === 10 ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                >
                  10 kW<br/><span className="text-[10px] font-normal opacity-80">(บ้านหลังใหญ่)</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={systemSizeKw}
                  onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="font-bold text-amber-600 min-w-[3rem] text-right">{systemSizeKw} kW</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                <span>ราคาประเมินค่าติดตั้ง (บาท / 1 kW)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={costPerKw}
                  onChange={(e) => setCostPerKw(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="เช่น 35000"
                  min="0"
                />
                <Coins className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">ราคาเฉลี่ยในตลาดอยู่ที่ 30,000 - 45,000 บาท ต่อ 1 kW</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค่าไฟที่คาดว่าจะประหยัดได้ (บาท / เดือน / 1 kW)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={savingPerKwMonthly}
                  onChange={(e) => setSavingPerKwMonthly(Number(e.target.value) || '')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="เช่น 500"
                  min="0"
                />
                <Zap className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">1 kW ผลิตไฟได้ประมาณ 4-5 หน่วย/วัน ประหยัดได้ราว 500-600 บ./เดือน (ขึ้นกับการใช้ไฟตอนกลางวัน)</p>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              สรุปความคุ้มค่าการลงทุน
            </h3>
            
            {results ? (
              <div className="space-y-4">
                
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">งบประมาณการติดตั้งทั้งหมด</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ฿{results.totalCost.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Sun className="w-3 h-3"/> ใช้พื้นที่หลังคาประมาณ {results.roofAreaNeeded} ตร.ม.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                    <p className="text-xs text-green-700 mb-1 flex items-center gap-1"><PiggyBank className="w-3 h-3"/> ประหยัดรายเดือน</p>
                    <p className="text-xl font-bold text-green-600">
                      ฿{results.monthlySaving.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                    <p className="text-xs text-green-700 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> ประหยัดรายปี</p>
                    <p className="text-xl font-bold text-green-600">
                      ฿{results.yearlySaving.toLocaleString()}
                    </p>
                  </div>
                </div>

                {results.paybackRaw > 0 && (
                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl shadow-sm mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-amber-800 flex items-center gap-1">
                        <Clock className="w-4 h-4"/> ระยะเวลาคืนทุน (Payback Period)
                      </p>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-bold text-amber-600">{results.paybackYears}</p>
                      <p className="text-lg text-amber-700 mb-1 font-medium">ปี</p>
                      {results.paybackMonths > 0 && (
                        <>
                          <p className="text-4xl font-bold text-amber-600 ml-2">{results.paybackMonths}</p>
                          <p className="text-lg text-amber-700 mb-1 font-medium">เดือน</p>
                        </>
                      )}
                    </div>
                    
                    {results.paybackRaw <= 5 ? (
                      <div className="mt-3 text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded inline-flex items-center gap-1 font-medium">
                        เป็นการลงทุนที่คุ้มค่ามาก คืนทุนไว!
                      </div>
                    ) : results.paybackRaw <= 8 ? (
                      <div className="mt-3 text-xs bg-blue-100 text-blue-800 px-3 py-1.5 rounded inline-flex items-center gap-1 font-medium">
                        ความคุ้มค่าระดับมาตรฐาน
                      </div>
                    ) : (
                      <div className="mt-3 text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded inline-flex items-center gap-1 font-medium">
                        ใช้เวลาคืนทุนค่อนข้างนาน (ลองพิจารณาพฤติกรรมการใช้ไฟกลางวัน)
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 text-center px-2">
                  *ผลลัพธ์นี้เป็นการประเมินเบื้องต้นตามเงื่อนไขที่กำหนด การประหยัดไฟจริงขึ้นอยู่กับพฤติกรรมการใช้ไฟในช่วงกลางวัน (ตอนที่มีแดด)
                </p>

              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200 p-6 text-center">
                <TrendingUp className="w-12 h-12 mb-3 text-gray-300" />
                <p>กรุณาระบุขนาดระบบโซลาร์ (kW)</p>
                <p className="text-sm">เพื่อประเมินความคุ้มค่า</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">คุ้มไหมที่จะติด? เจาะลึกค่าติดตั้งโซลาร์รูฟท็อปและวิธีคำนวณจุดคืนทุน</h2>
        
        <p>ด้วยสภาพอากาศที่ร้อนอบอ้าวของประเทศไทย และค่าไฟฟ้าที่มีแนวโน้มปรับตัวสูงขึ้นอย่างต่อเนื่อง ทำให้หลายครอบครัวหันมาสนใจพลังงานสะอาดอย่าง <strong>"โซลาร์รูฟท็อป" (Solar Rooftop)</strong> หรือการติดแผงโซลาร์เซลล์บนหลังคาบ้าน เพื่อผลิตไฟฟ้าใช้เองในตอนกลางวันและลดบิลค่าไฟรายเดือน แต่คำถามยอดฮิตที่ตามมาคือ <em>"ติดแล้วจะคุ้มไหม? ต้องใช้เงินลงทุนเท่าไหร่? และกี่ปีถึงจะคืนทุน?"</em> การใช้เครื่องมือประเมินงบประมาณ (Home Solar Installation Cost) จะช่วยไขข้อข้องใจเหล่านี้ได้</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ขนาดระบบโซลาร์เซลล์ (kW) คืออะไร? เลือกอย่างไรให้เหมาะกับบ้าน</h3>
        <p>ขนาดของระบบโซลาร์เซลล์มีหน่วยเป็น กิโลวัตต์ (kW) ยิ่งตัวเลขสูง หมายถึงความสามารถในการผลิตไฟฟ้าได้มาก (และใช้พื้นที่หลังคาในการติดแผงเยอะขึ้นตามไปด้วย) การเลือกขนาดระบบที่เหมาะสม ควรดูจากบิลค่าไฟรายเดือน และ <strong>"พฤติกรรมการใช้ไฟในช่วงกลางวัน"</strong> เป็นหลัก:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ระบบ 3 kW (งบประมาณ 100,000 - 130,000 บาท):</strong> เหมาะสำหรับบ้านที่มีค่าไฟเดือนละ 1,500 - 3,000 บาท มีคนอยู่บ้านตอนกลางวัน เปิดแอร์ 1 ตัว และตู้เย็น</li>
          <li><strong>ระบบ 5 kW (งบประมาณ 150,000 - 190,000 บาท):</strong> เป็นขนาดที่ได้รับความนิยมที่สุด เหมาะสำหรับบ้านที่มีค่าไฟเดือนละ 3,000 - 5,000 บาท เปิดแอร์กลางวัน 2-3 ตัว (สามารถติดตั้งได้ทั้งระบบไฟ 1 เฟส และ 3 เฟส)</li>
          <li><strong>ระบบ 10 kW (งบประมาณ 280,000 - 350,000 บาท):</strong> เหมาะสำหรับบ้านหลังใหญ่ โฮมออฟฟิศ หรือบ้านที่มีรถยนต์ไฟฟ้า (EV) เสียบชาร์จตอนกลางวัน ค่าไฟเดิมมักจะสูงกว่า 6,000 บาทขึ้นไป (มักต้องใช้ระบบไฟแบบ 3 เฟส)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เข้าใจหลักการ "จุดคืนทุน" (Payback Period)</h3>
        <p>โซลาร์รูฟท็อประบบออนกริด (On-Grid) ซึ่งเป็นแบบที่นิยมติดกันตามบ้านเรือน (ไม่มีแบตเตอรี่กักเก็บไฟ ใช้ไฟร่วมกับการไฟฟ้า) ถือเป็นการ "ลงทุนระยะยาว" โดยปกติแผงโซลาร์เซลล์มีอายุการใช้งานยาวนานถึง 20-25 ปี ในขณะที่อินเวอร์เตอร์ (Inverter) มีอายุราว 10-15 ปี</p>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 my-4">
          <p className="font-semibold text-amber-900 mb-2">วิธีคำนวณระยะเวลาคืนทุนแบบง่ายๆ:</p>
          <p>ระยะเวลาคืนทุน (ปี) = ค่าติดตั้งทั้งหมด ÷ ค่าไฟที่ประหยัดได้ต่อปี</p>
          <p><em>ตัวอย่าง:</em> ติดตั้งระบบ 5 kW ราคา 160,000 บาท ช่วยประหยัดค่าไฟได้เดือนละ 2,500 บาท (หรือ 30,000 บาท/ปี)<br/>
          ระยะเวลาคืนทุน = 160,000 ÷ 30,000 = <strong>ประมาณ 5 ปี 4 เดือน</strong></p>
        </div>
        <p>หลังจาดระยะเวลา 5 ปี 4 เดือนผ่านไป ค่าไฟรายเดือนที่คุณประหยัดได้ (ปีละ 30,000 บาท) จะกลายเป็น <strong>"กำไร"</strong> หรือผลตอบแทนจากการลงทุนแบบเต็มเม็ดเต็มหน่วย ไปอีก 15-20 ปีเลยทีเดียว</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยที่ทำให้คืนทุน "ช้า" หรือ "เร็ว"</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>พฤติกรรมการใช้ไฟ:</strong> ระบบ On-Grid จะคุ้มที่สุดเมื่อคุณ <em>"ผลิตไฟมาแล้วถูกใช้ทันที"</em> หากคุณไปทำงานนอกบ้านตอนกลางวัน ปล่อยบ้านทิ้งไว้ ไฟที่ผลิตได้จะไหลย้อนกลับการไฟฟ้า (ขายคืนได้ในราคาหน่วยละ 2.20 บาท ซึ่งถูกกว่าตอนซื้อไฟเข้ามาใช้มาก) ทำให้คืนทุนช้ากว่าบ้านที่เปิดแอร์ทำงาน WFH ตลอดวัน</li>
          <li><strong>ทิศทางและมุมหลังคา:</strong> หลังคาที่หันไปทาง ทิศใต้ และ ทิศตะวันตกเฉียงใต้ จะรับแสงแดดในประเทศไทยได้ดีที่สุด ทำให้ผลิตไฟได้เต็มเม็ดเต็มหน่วย</li>
          <li><strong>เงาบดบัง:</strong> หากมีต้นไม้ใหญ่ อาคารสูง หรือเสาไฟ บดบังแสงแดดตกลงบนแผงโซลาร์เซลล์ จะทำให้ประสิทธิภาพการผลิตไฟลดลงอย่างเห็นได้ชัด</li>
        </ol>

        <p className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          <strong>ข้อเสนอแนะ:</strong> ปัจจุบันธนาคารหลายแห่งมีสินเชื่อสีเขียว (Green Loan) สำหรับการติดตั้งโซลาร์เซลล์โดยเฉพาะ ซึ่งมีดอกเบี้ยต่ำ บางกรณีเงินผ่อนรายเดือนกับธนาคาร อาจจะใกล้เคียงหรือน้อยกว่าค่าไฟที่คุณต้องจ่ายให้การไฟฟ้าเสียอีก (เอาค่าไฟที่ประหยัดได้มาผ่อนโซลาร์) ทำให้แทบไม่ต้องควักเงินก้อนใหญ่ในตอนแรก
        </p>
      </article>
    </div>
  );
}
