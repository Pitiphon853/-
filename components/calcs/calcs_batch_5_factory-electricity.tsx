import React, { useState } from 'react';
import { Zap, Calculator, Moon, Sun, DollarSign, TrendingDown, Info, Percent } from 'lucide-react';

export default function FactoryElectricityCalculator({ lang }: any) {
  const [totalUnits, setTotalUnits] = useState<number>(10000);
  const [peakUsagePercent, setPeakUsagePercent] = useState<number>(40);
  
  const [flatRate, setFlatRate] = useState<number>(4.7); // อัตราเฉลี่ย
  const [touPeakRate, setTouPeakRate] = useState<number>(5.8);
  const [touOffPeakRate, setTouOffPeakRate] = useState<number>(2.6);

  // Calculations
  const peakUnits = totalUnits * (peakUsagePercent / 100);
  const offPeakUnits = totalUnits - peakUnits;

  const costFlat = totalUnits * flatRate;
  const costTouPeak = peakUnits * touPeakRate;
  const costTouOffPeak = offPeakUnits * touOffPeakRate;
  const costTouTotal = costTouPeak + costTouOffPeak;

  const savings = costFlat - costTouTotal;
  const isTouBetter = savings > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mx-auto mb-4">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">TOU vs Flat Rate Electricity Calculator</h2>
        <p className="text-gray-600">เปรียบเทียบค่าไฟฟ้าแบบอัตราปกติ กับอัตราตามช่วงเวลา (TOU) สำหรับธุรกิจ/โรงงาน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-yellow-500" />
            ข้อมูลการใช้ไฟฟ้า (รายเดือน)
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ปริมาณการใช้ไฟฟ้ารวม (หน่วย/เดือน)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Zap className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                <span>สัดส่วนการใช้ไฟช่วง Peak (%)</span>
                <span className="text-yellow-600">{peakUsagePercent}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={peakUsagePercent}
                onChange={(e) => setPeakUsagePercent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>(Peak 09:00 - 22:00)</span>
                <span>Off-Peak: {100 - peakUsagePercent}%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h4 className="text-sm font-medium text-gray-700">ตั้งค่าอัตราค่าไฟ (บาท/หน่วย)</h4>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">เรตปกติ (Flat Rate)</label>
                <input
                  type="number"
                  step="0.1"
                  value={flatRate}
                  onChange={(e) => setFlatRate(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1 text-orange-600"><Sun className="w-3 h-3 inline mr-1"/> TOU Peak Rate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={touPeakRate}
                    onChange={(e) => setTouPeakRate(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-orange-200 rounded text-sm bg-orange-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1 text-indigo-600"><Moon className="w-3 h-3 inline mr-1"/> TOU Off-Peak Rate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={touOffPeakRate}
                    onChange={(e) => setTouOffPeakRate(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-indigo-200 rounded text-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              เปรียบเทียบค่าไฟ (ยังไม่รวม Ft/VAT)
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">แบบอัตราเดียว (Flat Rate)</p>
                  <p className="text-xs text-gray-400">ทุกช่วงเวลา {flatRate} บ./หน่วย</p>
                </div>
                <p className="text-xl font-bold text-gray-800">
                  ฿{costFlat.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">แบบ TOU (Time of Use)</p>
                  </div>
                  <p className="text-xl font-bold text-blue-700">
                    ฿{costTouTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-xs text-gray-500 flex flex-col gap-1">
                  <span className="flex items-center"><Sun className="w-3 h-3 mr-1 text-orange-500"/> กลางวัน (Peak): ฿{costTouPeak.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  <span className="flex items-center"><Moon className="w-3 h-3 mr-1 text-indigo-500"/> กลางคืน (Off-Peak): ฿{costTouOffPeak.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg shadow-sm text-white ${isTouBetter ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
                <p className="text-sm opacity-90 mb-1 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {isTouBetter ? 'สรุป: เปลี่ยนเป็น TOU ประหยัดกว่า' : 'สรุป: ใช้เรตปกติประหยัดกว่า (ไม่ควรเปลี่ยน)'}
                </p>
                <p className="text-3xl font-bold">
                  {isTouBetter ? 'ลดต้นทุนได้ ' : 'แพงกว่าเดิม '} 
                  ฿{Math.abs(savings).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">/เดือน</span>
                </p>
                {isTouBetter && (
                  <p className="text-xs mt-1 text-green-100">ประหยัดต่อปีประมาณ ฿{(savings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              <strong>ข้อควรระวัง:</strong> ตัวเลขนี้ใช้เพื่อการตัดสินใจและเปรียบเทียบเบื้องต้นเท่านั้น ค่าไฟจริงที่เรียกเก็บโดยการไฟฟ้า (MEA/PEA) จะมีการบวกค่าบริการรายเดือน, ค่าความต้องการพลังงานไฟฟ้า (Demand Charge สำหรับกิจการขนาดใหญ่), ค่า Ft, และ VAT 7% เข้าไปด้วย
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-yellow max-w-none">
        <h2>ค่าไฟ TOU คืออะไร? เคล็ดลับลดต้นทุนของโรงงานและ SME</h2>
        <p>
          สำหรับธุรกิจขนาดกลางถึงขนาดย่อม (SME) ไปจนถึงโรงงานอุตสาหกรรม "ค่าไฟฟ้า" ถือเป็นต้นทุนคงที่ (Overhead Cost) ที่หนักหน่วงที่สุดรองจากค่าแรงงาน หนึ่งในวิธีลดต้นทุนที่ได้ผลที่สุดโดยไม่ต้องลดกำลังการผลิตคือ <strong>การเปลี่ยนไปใช้มิเตอร์ไฟฟ้าแบบ TOU (Time of Use)</strong>
        </p>

        <h3>ความแตกต่างระหว่างอัตราปกติ (Flat Rate) กับ TOU</h3>
        <ul>
          <li>
            <strong>อัตราปกติ (Flat Rate / อัตราก้าวหน้า):</strong> ยิ่งใช้ไฟเยอะ ยิ่งจ่ายแพง โดยเฉลี่ยจะตกอยู่ที่ประมาณ 4.5 - 5 บาทต่อหน่วย ไม่ว่าคุณจะเปิดเครื่องจักรตอนเที่ยงวัน หรือตอนตี 2 ก็เสียค่าไฟต่อหน่วยเท่ากัน
          </li>
          <li>
            <strong>อัตรา TOU (Time of Use):</strong> คิดค่าไฟตาม <strong>"ช่วงเวลา"</strong> ที่ใช้งาน เนื่องจากในช่วงกลางวันที่คนใช้งานเยอะ (Peak) โรงไฟฟ้าต้องทำงานหนัก การไฟฟ้าจึงคิดค่าไฟแพง แต่ถ้าเป็นช่วงดึกหรือวันหยุดที่คนใช้ไฟน้อย (Off-Peak) การไฟฟ้าจะลดราคาค่าไฟลงมาให้ <strong>"ถูกกว่าครึ่งหนึ่ง"</strong> เพื่อจูงใจให้คนย้ายเวลาใช้ไฟ
          </li>
        </ul>

        <h3>ช่วงเวลาของมิเตอร์ TOU (อ้างอิงจากการไฟฟ้า)</h3>
        <p>การแบ่งช่วงเวลาของการไฟฟ้า (MEA/PEA) โดยทั่วไปจะเป็นดังนี้:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <h4 className="text-orange-800 mt-0">☀️ ช่วง Peak (ค่าไฟแพง)</h4>
            <p className="mb-0 text-sm">
              <strong>วันจันทร์ - ศุกร์:</strong> เวลา 09.00 - 22.00 น.
              <br/>(อัตราค่าไฟเฉลี่ย 5.8 บาท/หน่วย)
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
            <h4 className="text-indigo-800 mt-0">🌙 ช่วง Off-Peak (ค่าไฟถูก)</h4>
            <p className="mb-0 text-sm">
              <strong>วันจันทร์ - ศุกร์:</strong> เวลา 22.00 - 09.00 น.
              <br/><strong>วันเสาร์-อาทิตย์ และวันหยุดราชการ:</strong> ทั้งวัน (00.00-24.00 น.)
              <br/>(อัตราค่าไฟเฉลี่ย 2.6 บาท/หน่วย)
            </p>
          </div>
        </div>

        <h3>ธุรกิจแบบไหนที่ "ควรเปลี่ยน" ไปใช้มิเตอร์ TOU?</h3>
        <p>
          ไม่ใช่ทุกธุรกิจที่เปลี่ยนเป็น TOU แล้วจะรอด! หากธุรกิจของคุณทำงานเฉพาะช่วงกลางวันและปิดร้านตอนเย็น การเปลี่ยนเป็น TOU อาจทำให้คุณ <strong>จ่ายค่าไฟแพงขึ้น</strong> (เพราะโดนเรต Peak เต็มๆ)
        </p>
        <p>ธุรกิจที่เหมาะกับการใช้ TOU มากที่สุด คือธุรกิจที่มีสัดส่วนการใช้ไฟในช่วงกลางคืน (Off-Peak) หรือวันหยุด สูงกว่ากลางวัน หรือธุรกิจที่สามารถ "ปรับเปลี่ยนเวลา" การทำงานของเครื่องจักรที่กินไฟเยอะๆ ไปเปิดตอนกลางคืนได้ เช่น:</p>
        <ul>
          <li>โรงงานอุตสาหกรรมที่เดินเครื่องจักร 24 ชั่วโมง (มีกะกลางคืน)</li>
          <li>โรงน้ำแข็ง, ห้องเย็น, โกดังเก็บอาหารแช่แข็ง ที่คอมเพรสเซอร์แอร์ต้องทำงานตลอดเวลา</li>
          <li>โรงแรม, หอพัก, อพาร์ตเมนต์ ที่ลูกค้ามักใช้แอร์ในเวลากลางคืน</li>
          <li>ธุรกิจปั๊มชาร์จรถยนต์ไฟฟ้า (EV Station)</li>
          <li>ธุรกิจที่ติด <strong>โซลาร์เซลล์ (Solar Roof)</strong> (ตอนกลางวันใช้ไฟฟรีจากโซลาร์เซลล์ ส่วนตอนกลางคืนที่โซลาร์ไม่ผลิตไฟ ก็ดึงไฟการไฟฟ้าในเรต Off-Peak ที่ถูกแสนถูกมาใช้แทน)</li>
        </ul>

        <h3>ขั้นตอนการขอเปลี่ยนมิเตอร์เป็น TOU</h3>
        <p>
          คุณสามารถติดต่อการไฟฟ้านครหลวง (MEA) หรือการไฟฟ้าส่วนภูมิภาค (PEA) ในเขตของคุณ เพื่อยื่นเรื่องขอเปลี่ยนประเภทมิเตอร์เป็นแบบ TOU ได้ โดยจะมีค่าใช้จ่ายในการเปลี่ยนมิเตอร์ประมาณ 3,000 - 10,000 บาท (ขึ้นอยู่กับขนาดของมิเตอร์) ซึ่งหากคำนวณแล้วว่าประหยัดค่าไฟได้เดือนละหลายพันบาท การลงทุนเปลี่ยนมิเตอร์ครั้งนี้ก็จะคืนทุนได้ในเวลาไม่กี่เดือนเท่านั้น!
        </p>
      </div>
    </div>
  );
}
