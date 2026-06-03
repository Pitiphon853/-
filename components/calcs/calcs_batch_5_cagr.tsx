import React, { useState } from 'react';
import { TrendingUp, Calculator, DollarSign, Clock, BarChart3, Info } from 'lucide-react';

export default function CAGRCalculator({ lang }: any) {
  const [beginningValue, setBeginningValue] = useState<number>(100000);
  const [endingValue, setEndingValue] = useState<number>(250000);
  const [years, setYears] = useState<number>(5);

  // CAGR Formula: (Ending / Beginning) ^ (1 / years) - 1
  let cagr = 0;
  if (beginningValue > 0 && years > 0) {
    cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
  }

  const totalReturnPercent = beginningValue > 0 ? ((endingValue - beginningValue) / beginningValue) * 100 : 0;
  const profit = endingValue - beginningValue;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">CAGR Calculator</h2>
        <p className="text-gray-600">คำนวณอัตราการเติบโตเฉลี่ยแบบทบต้นต่อปี (Compound Annual Growth Rate)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-blue-500" />
            ข้อมูลมูลค่าตั้งต้นและปลายทาง
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่าเริ่มต้น (Beginning Value)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={beginningValue}
                  onChange={(e) => setBeginningValue(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่าสิ้นสุด (Ending Value)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={endingValue}
                  onChange={(e) => setEndingValue(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ระยะเวลา (จำนวนปี)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              ผลการวิเคราะห์
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center">
                <p className="text-sm text-gray-500 mb-2">อัตราการเติบโตเฉลี่ยต่อปี (CAGR)</p>
                <p className={`text-5xl font-bold ${cagr >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {cagr >= 0 ? '+' : ''}{cagr.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-400 mt-3">เทียบเท่าการเติบโต {cagr.toFixed(2)}% ต่อเนื่องทุกๆ ปี</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">กำไร / ส่วนต่าง</p>
                  <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profit >= 0 ? '+' : ''}฿{profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">ผลตอบแทนรวมทั้งหมด</p>
                  <p className={`text-xl font-bold ${totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalReturnPercent >= 0 ? '+' : ''}{totalReturnPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              <strong>หมายเหตุ:</strong> CAGR จะบอกเพียง "ค่าเฉลี่ย" การเติบโตแบบทางเรียบตั้งแต่จุดเริ่มต้นถึงจุดสิ้นสุด โดยไม่นำความผันผวนของแต่ละปี (เช่น ปีที่ 2 อาจจะติดลบ ปีที่ 3 อาจจะพุ่งสูง) เข้ามาเกี่ยวข้อง
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-blue max-w-none">
        <h2>CAGR คืออะไร? สำคัญอย่างไรในการลงทุนและธุรกิจ</h2>
        <p>
          <strong>CAGR (Compound Annual Growth Rate)</strong> หรือ <strong>อัตราการเติบโตเฉลี่ยต่อปีแบบทบต้น</strong> เป็นหนึ่งในตัวชี้วัดทางการเงินและธุรกิจที่ได้รับความนิยมมากที่สุด ใช้เพื่อหา "ค่าเฉลี่ย" ของการเติบโตในช่วงระยะเวลาหนึ่ง (มากกว่า 1 ปี) โดยมองข้ามความผันผวนระหว่างทางไป
        </p>
        <p>
          ตัวอย่างเช่น หากคุณลงทุนเปิดธุรกิจด้วยเงิน 100,000 บาท ผ่านไป 5 ปี ธุรกิจมีมูลค่าเพิ่มเป็น 250,000 บาท คุณอาจจะอยากรู้ว่าสรุปแล้ว ธุรกิจของคุณโตเฉลี่ย "ปีละกี่เปอร์เซ็นต์?" คำตอบของคำถามนี้ก็คือการหาค่า CAGR นั่นเอง (ในกรณีนี้ CAGR จะเท่ากับ 20.11% ต่อปี)
        </p>

        <h3>ทำไมต้องใช้ CAGR? ทำไมไม่หารตรงๆ?</h3>
        <p>
          สมมติหุ้น A ให้ผลตอบแทนดังนี้: ปีแรก +100%, ปีที่สอง -50%
        </p>
        <ul>
          <li><strong>ถ้าหาค่าเฉลี่ยธรรมดา (Simple Average):</strong> (100 + (-50)) / 2 = <strong>+25%</strong> ต่อปี <em>(ดูเหมือนกำไร)</em></li>
          <li><strong>แต่ในความเป็นจริง:</strong> ทุน 100 บาท ปีแรกกำไร 100% เป็น 200 บาท พอปีที่สองขาดทุน 50% เงินเหลือ 100 บาท (กลับมาเท่าทุน!)</li>
          <li><strong>ถ้าหาค่า CAGR:</strong> ทุน 100 กลายเป็น 100 ผ่านไป 2 ปี คำนวณ CAGR จะได้ <strong>0%</strong> ซึ่งสะท้อนความจริงอย่างถูกต้อง</li>
        </ul>
        <p>
          จะเห็นว่า CAGR นำเอฟเฟกต์ของ <strong>"ดอกเบี้ยทบต้น" (Compounding)</strong> มาคำนวณด้วยเสมอ ทำให้เป็นตัวเลขที่นักลงทุนและนักธุรกิจใช้เป็นมาตรฐานในการสื่อสารมากกว่าค่าเฉลี่ยปกติ
        </p>

        <h3>สูตรการคำนวณ CAGR</h3>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200">
          CAGR = [ (มูลค่าสิ้นสุด / มูลค่าเริ่มต้น) ^ (1 / จำนวนปี) ] - 1
        </div>

        <h3>การนำ CAGR ไปประยุกต์ใช้งาน</h3>
        <ul>
          <li><strong>การลงทุนหุ้นและกองทุน:</strong> ใช้เปรียบเทียบผลตอบแทนของกองทุนรวม (Mutual Funds) ในระยะ 3 ปี, 5 ปี, หรือ 10 ปี ว่ากองไหนเก่งกว่ากัน</li>
          <li><strong>การประเมินการเติบโตของบริษัท (Business Growth):</strong> เช่น บริษัทมียอดขายเริ่มต้นปี 2020 ที่ 10 ล้านบาท และปี 2024 ยอดขายทะลุ 30 ล้านบาท บริษัทสามารถเคลมในรายงานประจำปีได้ว่า ยอดขายโตด้วย CAGR เท่ากับกี่เปอร์เซ็นต์</li>
          <li><strong>การวางแผนการเงินส่วนบุคคล:</strong> เช่น จะเกษียณในอีก 20 ปีข้างหน้า ถ้าเรามีเงินเก็บ 1 ล้านและอยากให้กลายเป็น 10 ล้าน เราต้องหาการลงทุนที่ให้ผลตอบแทน CAGR ให้ได้อย่างน้อยปีละ 12.2% เป็นต้น</li>
        </ul>

        <h3>ข้อควรระวัง (Limitations of CAGR)</h3>
        <p>
          แม้ CAGR จะมีประโยชน์มาก แต่ก็มีจุดอ่อนที่สำคัญคือ <strong>มันซ่อนความผันผวน (Volatility)</strong> เอาไว้ หากการลงทุน A โตปีละ 5% สม่ำเสมอ และการลงทุน B ปีแรกโต 50% ปีที่สองติดลบ 40% ปีที่สามโต 30% ทั้งสองอาจมี CAGR เท่ากัน แต่ความเสี่ยงของการลงทุน B สูงกว่ามาก ดังนั้นในการวิเคราะห์ทางการเงิน ควรใช้ตัวชี้วัดความเสี่ยงอื่นๆ (เช่น Standard Deviation หรือ Maximum Drawdown) ควบคู่ไปด้วยเสมอ
        </p>
      </div>
    </div>
  );
}
