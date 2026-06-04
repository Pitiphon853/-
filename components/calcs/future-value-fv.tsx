"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, RefreshCw } from 'lucide-react';

export default function FutureValueCalculator({ lang = 'th' }: { lang?: string }) {
  const [pv, setPv] = useState<number | string>(10000);
  const [pmt, setPmt] = useState<number | string>(1000);
  const [rate, setRate] = useState<number | string>(5);
  const [years, setYears] = useState<number | string>(10);
  const [frequency, setFrequency] = useState<number>(12); // 12 = monthly, 1 = annually

  const [fv, setFv] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateFV();
  }, [pv, pmt, rate, years, frequency]);

  const calculateFV = () => {
    const presentValue = Number(pv) || 0;
    const payment = Number(pmt) || 0;
    const annualRate = Number(rate) || 0;
    const timeInYears = Number(years) || 0;
    const freq = Number(frequency);

    const r = annualRate / 100 / freq;
    const n = timeInYears * freq;

    let futureValue = 0;
    
    if (r === 0) {
      futureValue = presentValue + (payment * n);
    } else {
      futureValue = presentValue * Math.pow(1 + r, n) + payment * ((Math.pow(1 + r, n) - 1) / r);
    }

    const invested = presentValue + (payment * n);
    const interest = futureValue - invested;

    setFv(futureValue);
    setTotalInvested(invested);
    setTotalInterest(interest > 0 ? interest : 0);
  };

  const isTh = lang === 'th';

  const texts = {
    title: isTh ? "เครื่องคำนวณมูลค่าเงินในอนาคต (FV)" : "Future Value (FV) Calculator",
    subtitle: isTh ? "คำนวณเงินก้อนในอนาคตจากการลงทุนหรือการออมของคุณ" : "Calculate the future value of your investments or savings",
    initialInvestment: isTh ? "เงินต้นเริ่มต้น (บาท)" : "Initial Investment (PV)",
    regularContribution: isTh ? "เงินสมทบต่องวด (บาท)" : "Regular Contribution (PMT)",
    annualRate: isTh ? "อัตราผลตอบแทนต่อปี (%)" : "Annual Interest Rate (%)",
    timePeriod: isTh ? "ระยะเวลา (ปี)" : "Time Period (Years)",
    freqLabel: isTh ? "ความถี่ในการสมทบและทบต้น" : "Contribution & Compounding Frequency",
    freqMonthly: isTh ? "รายเดือน" : "Monthly",
    freqAnnually: isTh ? "รายปี" : "Annually",
    resultFV: isTh ? "มูลค่าเงินในอนาคต (FV)" : "Future Value (FV)",
    resultInvested: isTh ? "เงินต้นรวมที่ลงทุน" : "Total Invested",
    resultInterest: isTh ? "ผลตอบแทนรวมที่ได้รับ" : "Total Interest Earned",
    summary: isTh ? "สรุปผลการคำนวณ" : "Calculation Summary"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <TrendingUp className="w-8 h-8" />
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
              <DollarSign className="w-4 h-4 text-blue-500" /> {texts.initialInvestment}
            </label>
            <input
              type="number"
              value={pv}
              onChange={(e) => setPv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-green-500" /> {texts.regularContribution}
            </label>
            <input
              type="number"
              value={pmt}
              onChange={(e) => setPmt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{texts.freqLabel}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFrequency(12)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition ${frequency === 12 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {texts.freqMonthly}
              </button>
              <button
                type="button"
                onClick={() => setFrequency(1)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition ${frequency === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {texts.freqAnnually}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-500" /> {texts.annualRate}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="0"
              step="1"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> {texts.summary}
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <p className="text-sm text-gray-500 mb-1">{texts.resultFV}</p>
              <p className="text-3xl font-bold text-blue-700">
                {fv.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{texts.resultInvested}</p>
                <p className="text-lg font-semibold text-gray-700">
                  {totalInvested.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{texts.resultInterest}</p>
                <p className="text-lg font-semibold text-green-600">
                  +{totalInterest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Simple Visual Chart */}
            <div className="pt-4">
              <div className="h-4 flex rounded-full overflow-hidden w-full bg-gray-200">
                <div 
                  className="bg-blue-500 h-full" 
                  style={{ width: `${fv > 0 ? (totalInvested / fv) * 100 : 0}%` }}
                ></div>
                <div 
                  className="bg-green-400 h-full" 
                  style={{ width: `${fv > 0 ? (totalInterest / fv) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> เงินต้น</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> ดอกเบี้ย</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTh && (
        <div className="mt-12 pt-8 border-t border-gray-200 prose prose-blue max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Future Value (FV) หรือ มูลค่าเงินในอนาคต คืออะไร?</h2>
          
          <p>
            Future Value (FV) หรือ <strong>มูลค่าเงินในอนาคต</strong> คือแนวคิดทางการเงินที่ใช้ประเมินว่า เงินจำนวนหนึ่งที่เรามีอยู่ในปัจจุบัน (Present Value) จะมีมูลค่าเท่าใดในอนาคตเมื่อเวลาผ่านไป โดยพิจารณาจาก <em>อัตราผลตอบแทน</em> หรือ <em>อัตราดอกเบี้ย</em> (Interest Rate) ที่คาดว่าจะได้รับ และ <em>ระยะเวลา</em> (Time) ในการลงทุน
          </p>
          
          <p>
            แนวคิดนี้อยู่บนพื้นฐานของ <strong>มูลค่าเงินตามเวลา (Time Value of Money)</strong> ซึ่งเชื่อว่าเงิน 100 บาทในวันนี้ มีค่ามากกว่าเงิน 100 บาทในอีก 10 ปีข้างหน้า เพราะเงินในวันนี้สามารถนำไปลงทุนเพื่อสร้างผลตอบแทนหรือดอกเบี้ยให้งอกเงยได้ (Compound Interest)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณมูลค่าเงินในอนาคต (FV)</h3>
          <p>สูตรพื้นฐานในการคำนวณ FV คือ:</p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            FV = PV × (1 + r)ⁿ
          </div>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>FV (Future Value):</strong> มูลค่าเงินในอนาคตที่เราต้องการหา</li>
            <li><strong>PV (Present Value):</strong> เงินต้นหรือมูลค่าเงินในปัจจุบัน</li>
            <li><strong>r (Interest Rate):</strong> อัตราดอกเบี้ยหรือผลตอบแทนต่องวด (เช่น ต่อปี)</li>
            <li><strong>n (Number of Periods):</strong> จำนวนงวดหรือระยะเวลาที่ลงทุน (เช่น จำนวนปี)</li>
          </ul>
          
          <p>
            แต่ในความเป็นจริง การลงทุนมักจะมีการฝากเงินเพิ่ม หรือลงทุนเพิ่มเป็นประจำทุกงวด (เช่น ทุกเดือน หรือทุกปี) ซึ่งเราเรียกว่า PMT (Payment) ทำให้สูตรต้องรวมมูลค่าของเงินลงทุนรายงวดเข้าไปด้วย เครื่องมือคำนวณนี้จึงถูกออกแบบมาให้ครอบคลุมการลงทุนแบบ DCA (Dollar-Cost Averaging) อย่างสมบูรณ์
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการคำนวณ Future Value</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li><strong>การวางแผนเกษียณอายุ:</strong> ช่วยให้รู้ว่าหากเก็บเงินเดือนละเท่านี้ ไปจนถึงอายุ 60 ปี จะมีเงินก้อนเท่าไร เพียงพอต่อการใช้ชีวิตหรือไม่</li>
            <li><strong>การตั้งเป้าหมายทางการเงิน:</strong> ไม่ว่าจะเป็นการซื้อบ้าน ซื้อรถ หรือทุนการศึกษาบุตร FV ช่วยให้เราคำนวณย้อนกลับได้ว่าต้องเก็บเงินเดือนละเท่าใด</li>
            <li><strong>เปรียบเทียบทางเลือกการลงทุน:</strong> ช่วยเปรียบเทียบสินทรัพย์ที่มีอัตราผลตอบแทนต่างกัน ว่าในระยะยาวให้ผลลัพธ์ที่แตกต่างกันมากเพียงใด</li>
            <li><strong>เข้าใจพลังของดอกเบี้ยทบต้น:</strong> กราฟหรือตัวเลขจากการคำนวณ จะแสดงให้เห็นชัดเจนว่าในช่วงปีหลังๆ ดอกเบี้ยที่ทบต้นเข้าไปจะทำให้เงินเติบโตอย่างก้าวกระโดด</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวังในการพิจารณา FV</h3>
          <p>
            แม้ว่าเครื่องคำนวณจะแสดงตัวเลขที่น่าประทับใจ แต่ในโลกแห่งความเป็นจริง มีปัจจัยอื่นที่ส่งผลกระทบต่อมูลค่าเงินในอนาคต ได้แก่ <strong>อัตราเงินเฟ้อ (Inflation)</strong> ซึ่งทำให้ค่าเงินลดลง และ <strong>ความผันผวนของการลงทุน</strong> ผลตอบแทนที่นำมาคำนวณมักเป็นค่าเฉลี่ย ซึ่งในความเป็นจริงอาจมีปีที่ได้กำไรมากและปีที่ขาดทุน ดังนั้น การประเมินผลตอบแทนควรอยู่บนพื้นฐานของความอนุรักษ์นิยม (Conservative) และหมั่นทบทวนแผนการเงินอย่างสม่ำเสมอ
          </p>
        </div>
      )}
    </div>
  );
}
