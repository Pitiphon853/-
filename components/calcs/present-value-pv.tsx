"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, DollarSign, Clock } from 'lucide-react';

export default function PresentValueCalculator({ lang = 'th' }: { lang?: string }) {
  const [fv, setFv] = useState<number | string>(1000000);
  const [rate, setRate] = useState<number | string>(5);
  const [years, setYears] = useState<number | string>(10);
  const [compounding, setCompounding] = useState<number>(1); // 1 = Annually, 12 = Monthly

  const [pv, setPv] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    calculatePV();
  }, [fv, rate, years, compounding]);

  const calculatePV = () => {
    const futureValue = Number(fv) || 0;
    const annualRate = Number(rate) || 0;
    const timeInYears = Number(years) || 0;
    const n = Number(compounding);

    const r = annualRate / 100 / n;
    const periods = timeInYears * n;

    let presentValue = 0;
    if (r === 0) {
      presentValue = futureValue;
    } else {
      presentValue = futureValue / Math.pow(1 + r, periods);
    }

    setPv(presentValue);
    setDiscountAmount(futureValue - presentValue);
  };

  const isTh = lang === 'th';

  const texts = {
    title: isTh ? "เครื่องคำนวณมูลค่าเงินปัจจุบัน (PV)" : "Present Value (PV) Calculator",
    subtitle: isTh ? "หามูลค่าที่แท้จริงในปัจจุบันของเงินที่คุณจะได้รับในอนาคต" : "Calculate the current value of a future sum of money",
    futureValue: isTh ? "มูลค่าเงินในอนาคตที่ต้องการ (FV)" : "Future Value (FV)",
    annualRate: isTh ? "อัตราคิดลด / ผลตอบแทนต่อปี (%)" : "Discount Rate / Annual Return (%)",
    timePeriod: isTh ? "ระยะเวลา (ปี)" : "Time Period (Years)",
    compounding: isTh ? "ความถี่ในการทบต้น" : "Compounding Frequency",
    compAnnually: isTh ? "รายปี" : "Annually",
    compMonthly: isTh ? "รายเดือน" : "Monthly",
    resultPV: isTh ? "มูลค่าปัจจุบัน (PV)" : "Present Value (PV)",
    resultDiscount: isTh ? "มูลค่าที่ถูกหักออก (Discount)" : "Total Discount",
    summary: isTh ? "ผลการคำนวณ" : "Results"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
          <TrendingDown className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{texts.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{texts.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-500" /> {texts.futureValue}
            </label>
            <input
              type="number"
              value={fv}
              onChange={(e) => setFv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-500" /> {texts.annualRate}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" /> {texts.timePeriod}
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              min="0"
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{texts.compounding}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCompounding(1)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition ${compounding === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {texts.compAnnually}
              </button>
              <button
                type="button"
                onClick={() => setCompounding(12)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition ${compounding === 12 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {texts.compMonthly}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-indigo-600" /> {texts.summary}
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <p className="text-sm text-gray-500 mb-1">{texts.resultPV}</p>
              <p className="text-3xl font-bold text-indigo-700">
                {pv.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{texts.resultDiscount}</p>
              <p className="text-lg font-semibold text-red-500">
                -{discountAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="text-sm text-gray-600 bg-indigo-100/50 p-4 rounded-lg">
              {isTh 
                ? `เพื่อที่จะมีเงิน ${Number(fv).toLocaleString('th-TH')} บาท ในอีก ${years} ปีข้างหน้า ด้วยอัตราผลตอบแทน ${rate}% ต่อปี คุณจะต้องใช้เงินลงทุนในวันนี้จำนวน ${pv.toLocaleString('th-TH', {maximumFractionDigits:0})} บาท` 
                : `To have ${Number(fv).toLocaleString('en-US')} in ${years} years at a ${rate}% annual return, you need to invest ${pv.toLocaleString('en-US', {maximumFractionDigits:0})} today.`}
            </div>
          </div>
        </div>
      </div>

      {isTh && (
        <div className="mt-12 pt-8 border-t border-gray-200 prose prose-indigo max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Present Value (PV) หรือ มูลค่าเงินปัจจุบัน คืออะไร?</h2>
          
          <p>
            Present Value (PV) หรือ <strong>มูลค่าเงินปัจจุบัน</strong> คือ มูลค่าของเงินจำนวนหนึ่งในอนาคต หากคิดลด (Discount) กลับมาเป็นค่าเงินในวันนี้ โดยหลักการนี้อยู่บนแนวคิดเรื่อง <strong>มูลค่าเงินตามเวลา (Time Value of Money)</strong> ที่ว่า "เงินจำนวนเท่ากันในวันนี้ ย่อมมีค่ามากกว่าเงินในอนาคต"
          </p>

          <p>
            สาเหตุที่เป็นเช่นนั้น เพราะหากเรามีเงิน 100 บาทในวันนี้ เราสามารถนำไปลงทุน ฝากธนาคาร หรือซื้อสินทรัพย์ที่ให้ผลตอบแทน ทำให้ในอีก 1 ปีข้างหน้าเงิน 100 บาทนั้นอาจกลายเป็น 105 บาท ในทางกลับกัน หากมีคนสัญญาว่าจะให้เงินเรา 100 บาทในอีก 1 ปีข้างหน้า มูลค่าที่แท้จริงของ 100 บาทนั้นในวันนี้ จะต้องน้อยกว่า 100 บาทแน่นอน (อาจจะเหลือแค่ 95 บาท) ซึ่งการหาว่า 95 บาทนั้นมาจากไหน คือการหา Present Value นั่นเอง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณมูลค่าปัจจุบัน (PV)</h3>
          <p>สูตรที่ใช้ในการคำนวณ PV คือ:</p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            PV = FV / (1 + r)ⁿ
          </div>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>PV (Present Value):</strong> มูลค่าเงินปัจจุบันที่เราต้องการทราบ</li>
            <li><strong>FV (Future Value):</strong> มูลค่าเงินในอนาคตที่คาดว่าจะได้รับ</li>
            <li><strong>r (Discount Rate):</strong> อัตราคิดลด หรืออัตราผลตอบแทนที่คาดหวัง</li>
            <li><strong>n (Number of Periods):</strong> ระยะเวลาหรือจำนวนงวด (เช่น จำนวนปี)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">อัตราคิดลด (Discount Rate) คืออะไร?</h3>
          <p>
            ในสมการข้างต้น ตัวแปรที่สำคัญและมักสร้างความสับสนคือ <strong>r</strong> หรืออัตราคิดลด (Discount Rate) ซึ่งสามารถมองได้ 2 มุม:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>มุมของการลงทุน:</strong> มันคือ "อัตราผลตอบแทนที่เราคาดหวัง" (Expected Return) หรือต้นทุนค่าเสียโอกาส (Opportunity Cost) ของเรา</li>
            <li><strong>มุมของเงินเฟ้อ:</strong> หากต้องการทราบอำนาจซื้อที่แท้จริงในอนาคต เราสามารถใช้ "อัตราเงินเฟ้อ" เป็นอัตราคิดลดได้ เช่น เพื่อดูว่าเงิน 1 ล้านในอีก 10 ปี จะมีค่าเท่ากับการซื้อของกี่บาทในวันนี้</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ Present Value ในชีวิตจริง</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li><strong>ประเมินความคุ้มค่าของการลงทุน:</strong> หากเราต้องการซื้อพันธบัตรหรือหุ้นที่รับปากว่าจะให้เงินคืน 100,000 บาทใน 5 ปี การหา PV จะบอกได้ว่า เราควรจ่ายเงินซื้อสินทรัพย์นั้นในราคาเท่าไรในวันนี้ (หากราคาสินทรัพย์ในตลาดถูกกว่า PV แสดงว่าน่าลงทุน)</li>
            <li><strong>การเปรียบเทียบข้อเสนอทางการเงิน:</strong> เช่น ถูกรางวัลลอตเตอรี่แล้วมีข้อเสนอให้เลือกรับเงินก้อนทันที 10 ล้านบาท หรือรับ 1 ล้านบาททุกปีเป็นเวลา 15 ปี (รวม 15 ล้าน) การหา PV ของกระแสเงินสดในอนาคตจะช่วยให้เปรียบเทียบมูลค่าที่แท้จริงได้อย่างยุติธรรม</li>
            <li><strong>ประเมินมูลค่าหุ้น (DCF Model):</strong> ในการวิเคราะห์มูลค่าที่แท้จริงของหุ้น (Intrinsic Value) นักวิเคราะห์มักใช้วิธี Discounted Cash Flow ซึ่งมีรากฐานมาจากสมการ Present Value</li>
          </ol>
        </div>
      )}
    </div>
  );
}
