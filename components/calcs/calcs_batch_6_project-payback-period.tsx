import React, { useState } from 'react';
import { Clock, Briefcase, ChevronRight, Info } from 'lucide-react';

const ProjectPaybackPeriodCalculator = ({ lang }: any) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(500000);
  const [isEvenCashFlow, setIsEvenCashFlow] = useState<boolean>(true);
  
  // For even cash flow
  const [annualCashFlow, setAnnualCashFlow] = useState<number>(150000);

  // For uneven cash flow
  const [cashFlows, setCashFlows] = useState<number[]>([100000, 150000, 200000, 200000, 250000]);

  const handleCashFlowChange = (index: number, value: string) => {
    const newFlows = [...cashFlows];
    newFlows[index] = Number(value);
    setCashFlows(newFlows);
  };

  const addYear = () => setCashFlows([...cashFlows, 0]);
  const removeYear = () => {
    if (cashFlows.length > 1) {
      setCashFlows(cashFlows.slice(0, -1));
    }
  };

  let paybackYears = 0;
  let paybackMonths = 0;
  let isRecovered = false;
  let cumulativeData: {year: number, flow: number, cumulative: number}[] = [];

  if (isEvenCashFlow) {
    if (annualCashFlow > 0 && initialInvestment > 0) {
      const rawYears = initialInvestment / annualCashFlow;
      paybackYears = Math.floor(rawYears);
      paybackMonths = Math.round((rawYears - paybackYears) * 12);
      isRecovered = true;
      if (paybackMonths === 12) {
        paybackYears += 1;
        paybackMonths = 0;
      }
    }
  } else {
    let cumulative = -initialInvestment;
    cumulativeData.push({ year: 0, flow: -initialInvestment, cumulative: cumulative });
    
    for (let i = 0; i < cashFlows.length; i++) {
      const prevCumulative = cumulative;
      cumulative += cashFlows[i];
      cumulativeData.push({ year: i + 1, flow: cashFlows[i], cumulative: cumulative });

      if (prevCumulative < 0 && cumulative >= 0) {
        paybackYears = i; // The year before it turned positive
        const remainingToRecover = Math.abs(prevCumulative);
        const fractionOfYear = remainingToRecover / cashFlows[i];
        paybackMonths = Math.round(fractionOfYear * 12);
        isRecovered = true;
        if (paybackMonths === 12) {
          paybackYears += 1;
          paybackMonths = 0;
        }
        break;
      }
    }
    
    // Fill the rest of cumulative data if recovered early just for table display
    if (isRecovered) {
        for(let i = paybackYears + 2; i <= cashFlows.length; i++) {
            cumulative += cashFlows[i-1];
            cumulativeData.push({ year: i, flow: cashFlows[i-1], cumulative: cumulative});
        }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-indigo-600">
        <Clock className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณระยะเวลาคืนทุน (Payback Period)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-semibold text-gray-800 mb-2">เงินลงทุนเริ่มต้น (Initial Investment)</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">รูปแบบกระแสเงินสดรับ (Cash Flow Type)</label>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" checked={isEvenCashFlow} onChange={() => setIsEvenCashFlow(true)} className="text-indigo-600 focus:ring-indigo-500" />
                <span className="text-gray-700">รับเท่ากันทุกปี (Even)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" checked={!isEvenCashFlow} onChange={() => setIsEvenCashFlow(false)} className="text-indigo-600 focus:ring-indigo-500" />
                <span className="text-gray-700">รับไม่เท่ากัน (Uneven)</span>
              </label>
            </div>

            {isEvenCashFlow ? (
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">กระแสเงินสดรับสุทธิต่อปี (Annual Cash Flow)</label>
                <input
                  type="number"
                  value={annualCashFlow}
                  onChange={(e) => setAnnualCashFlow(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                  min="0"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">กระแสเงินสดรับสุทธิรายปี:</span>
                  <div className="space-x-2">
                    <button onClick={removeYear} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">- ลดปี</button>
                    <button onClick={addYear} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs">+ เพิ่มปี</button>
                  </div>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {cashFlows.map((flow, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-12 text-sm text-gray-600">ปีที่ {index + 1}</span>
                      <input
                        type="number"
                        value={flow}
                        onChange={(e) => handleCashFlowChange(index, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" /> สรุประยะเวลาคืนทุน
            </h3>
            
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-indigo-100 mb-6">
              <p className="text-gray-500 mb-2 font-medium">Payback Period</p>
              {isRecovered ? (
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 flex items-baseline justify-center space-x-2">
                    <span>{paybackYears}</span> <span className="text-lg font-medium text-indigo-800">ปี</span>
                    {paybackMonths > 0 && (
                      <>
                        <span>{paybackMonths}</span> <span className="text-lg font-medium text-indigo-800">เดือน</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-xl font-bold text-red-500">
                  ไม่คืนทุนในช่วงเวลาที่ระบุ
                </div>
              )}
            </div>

            {!isEvenCashFlow && cumulativeData.length > 0 && (
              <div className="mt-4 bg-white p-3 rounded border border-gray-200 text-sm overflow-hidden">
                <h4 className="font-semibold text-gray-700 mb-2 text-xs uppercase tracking-wider">กระแสเงินสดสะสม (Cumulative Cash Flow)</h4>
                <div className="max-h-40 overflow-y-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b">
                        <th className="pb-1">ปีที่</th>
                        <th className="pb-1 text-right">เงินสดรับ</th>
                        <th className="pb-1 text-right">ยอดสะสม</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {cumulativeData.map((row, idx) => (
                        <tr key={idx} className={`border-b border-gray-50 ${row.cumulative >= 0 && cumulativeData[idx-1]?.cumulative < 0 ? 'bg-green-50 font-semibold' : ''}`}>
                          <td className="py-1.5">{row.year}</td>
                          <td className="py-1.5 text-right">{row.flow.toLocaleString()}</td>
                          <td className={`py-1.5 text-right ${row.cumulative >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {row.cumulative.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-start text-xs text-gray-600">
              <Info className="w-4 h-4 mr-2 flex-shrink-0 text-indigo-400 mt-0.5" />
              <p>ระยะเวลาคืนทุนที่สั้นกว่า ย่อมมีความเสี่ยงน้อยกว่า แต่การคำนวณนี้ไม่ได้นำมูลค่าของเงินตามเวลา (Time Value of Money) มาคิดร่วมด้วย</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">ระยะเวลาคืนทุน (Payback Period) คืออะไร?</h2>
        <p>
          <strong>ระยะเวลาคืนทุน (Payback Period)</strong> คือ ระยะเวลาที่กระแสเงินสดรับสุทธิจากการลงทุน สะสมรวมกันจนเท่ากับเงินลงทุนเริ่มต้นพอดี หรือพูดง่ายๆ คือ "ใช้เวลากี่ปี กี่เดือน ถึงจะได้ทุนคืน" เป็นหนึ่งในเครื่องมือทางการเงินที่เก่าแก่และเป็นที่นิยมที่สุดในการประเมินความน่าสนใจของโครงการลงทุน เนื่องจากคำนวณง่ายและเข้าใจได้ทันที
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีการคำนวณระยะเวลาคืนทุน</h3>
        <p>การคำนวณจะแบ่งออกเป็น 2 กรณี ตามลักษณะของกระแสเงินสดรับ:</p>

        <h4 className="text-lg font-medium mt-4 mb-2">1. กรณีรับกระแสเงินสดเท่ากันทุกปี (Even Cash Flows)</h4>
        <p>หากโครงการสร้างรายได้สุทธิเท่ากันทุกๆ ปี สามารถใช้สูตรหารได้โดยตรง:</p>
        <div className="bg-gray-100 p-3 rounded-md my-2 font-mono text-sm text-center">
          ระยะเวลาคืนทุน = เงินลงทุนเริ่มต้น ÷ กระแสเงินสดรับสุทธิรายปี
        </div>
        <p className="text-sm text-gray-600">
          <em>ตัวอย่าง:</em> ลงทุน 500,000 บาท ได้กำไรปีละ 100,000 บาท = 500,000 / 100,000 = 5 ปี คืนทุน
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2">2. กรณีรับกระแสเงินสดไม่เท่ากัน (Uneven Cash Flows)</h4>
        <p>ในโลกธุรกิจจริง รายได้แต่ละปีมักจะไม่เท่ากัน บางปีน้อย บางปีมาก กรณีนี้ต้องหา "กระแสเงินสดสะสม (Cumulative Cash Flow)" แบบปีต่อปี จนกว่ายอดสะสมจะเปลี่ยนจากติดลบเป็นบวก</p>
        <div className="bg-gray-100 p-3 rounded-md my-2 font-mono text-sm text-center">
          ระยะเวลาคืนทุน = ปีที่อยู่ก่อนปีที่คืนทุน + (ยอดเงินลงทุนที่ยังขาดอยู่ ÷ กระแสเงินสดของปีที่คืนทุน)
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อดีของการใช้ Payback Period</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>เข้าใจง่าย:</strong> ผู้บริหารที่ไม่ได้มีพื้นฐานด้านการเงินก็สามารถเข้าใจภาพรวมความเสี่ยงได้ทันที</li>
          <li><strong>สะท้อนสภาพคล่อง:</strong> ธุรกิจที่มีเงินทุนจำกัด ต้องการโครงการที่คืนทุนไว เพื่อนำเงินสดไปหมุนเวียนทำอย่างอื่นต่อ</li>
          <li><strong>ประเมินความเสี่ยงเบื้องต้น:</strong> โครงการที่คืนทุนเร็ว ย่อมมีความเสี่ยงจากความไม่แน่นอนในอนาคต (เช่น เทคโนโลยีเปลี่ยน คู่แข่งใหม่) น้อยกว่าโครงการที่คืนทุนช้า</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ข้อจำกัดที่ควรระวัง (ทำไมถึงใช้ร่วมกับ NPV/IRR)</h3>
        <p>
          แม้จะใช้งานง่าย แต่ Payback Period แบบดั้งเดิมมีจุดอ่อนที่สำคัญมาก 2 ประการ:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>ไม่คำนึงถึงมูลค่าของเงินตามเวลา (Time Value of Money):</strong> มันมองว่าเงิน 100 บาทในปีที่ 1 มีค่าเท่ากับ 100 บาทในปีที่ 5 ซึ่งในความเป็นจริง เงินในอนาคตมีค่าน้อยกว่าเนื่องจากอัตราเงินเฟ้อและค่าเสียโอกาส (เพื่อแก้ปัญหานี้ บางคนจึงใช้ <em>Discounted Payback Period</em> แทน)</li>
          <li><strong>เพิกเฉยต่อกระแสเงินสดหลังคืนทุน:</strong> หากโครงการ A คืนทุนใน 2 ปี แต่ปีที่ 3-5 ไม่มีรายได้เลย เทียบกับโครงการ B คืนทุนใน 3 ปี แต่ปีที่ 4-10 ได้กำไรมหาศาล หากดูแค่ Payback Period จะเลือกโครงการ A ซึ่งอาจเป็นการตัดสินใจที่ผิดพลาดในระยะยาว</li>
        </ol>
      </div>
    </div>
  );
};

export default ProjectPaybackPeriodCalculator;
