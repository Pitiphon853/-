import React, { useState } from 'react';
import { LineChart, Calculator, TrendingUp, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function FxForwardRateRisk({ lang }: any) {
  const [inputs, setInputs] = useState({
    spotRate: 35.00,
    domesticRate: 2.50, // THB interest rate %
    foreignRate: 5.25,  // USD interest rate %
    days: 90,
    amount: 100000,
    transactionType: 'import', // import or export
    quotedForward: 34.80,
    expectedFutureSpot: 35.50
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));
  };

  // Theoretical Forward Rate calculation based on Interest Rate Parity
  // F = S * (1 + (r_d * t/360)) / (1 + (r_f * t/360))
  const domesticFactor = 1 + (inputs.domesticRate / 100) * (inputs.days / 360);
  const foreignFactor = 1 + (inputs.foreignRate / 100) * (inputs.days / 360);
  const theoreticalForward = inputs.spotRate * (domesticFactor / foreignFactor);

  const forwardPremiumDiscount = inputs.quotedForward - inputs.spotRate;
  const premiumPercentage = (forwardPremiumDiscount / inputs.spotRate) * (360 / inputs.days) * 100;

  // Hedging scenarios
  const hedgedAmountTHB = inputs.amount * inputs.quotedForward;
  const unhedgedAmountTHB = inputs.amount * inputs.expectedFutureSpot;
  
  // Calculate difference
  let hedgingGainLoss = 0;
  if (inputs.transactionType === 'import') {
    // Importer buys foreign currency. Lower THB is better.
    // Gain from hedging = Unhedged Cost - Hedged Cost
    hedgingGainLoss = unhedgedAmountTHB - hedgedAmountTHB;
  } else {
    // Exporter sells foreign currency. Higher THB is better.
    // Gain from hedging = Hedged Revenue - Unhedged Revenue
    hedgingGainLoss = hedgedAmountTHB - unhedgedAmountTHB;
  }

  const formatNumber = (num: number, decimals = 2) => num.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <LineChart className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-800">เครื่องมือคำนวณอัตราแลกเปลี่ยนล่วงหน้า (FX Forward Risk)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> ข้อมูลพื้นฐาน
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Spot Rate (THB/USD)</label>
                  <input type="number" step="0.01" name="spotRate" value={inputs.spotRate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ระยะเวลา (วัน)</label>
                  <input type="number" name="days" value={inputs.days} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ดบ. บาท (Domestic Rate %)</label>
                  <input type="number" step="0.01" name="domesticRate" value={inputs.domesticRate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ดบ. ดอลลาร์ (Foreign Rate %)</label>
                  <input type="number" step="0.01" name="foreignRate" value={inputs.foreignRate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">การประเมินความเสี่ยงและป้องกันความเสี่ยง (Hedging)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">ประเภทธุรกรรม</label>
                  <select name="transactionType" value={inputs.transactionType} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white">
                    <option value="import">ผู้นำเข้า (ต้องซื้อ USD เพื่อจ่ายหนี้)</option>
                    <option value="export">ผู้ส่งออก (รับ USD มาขายเป็น THB)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ยอดเงิน (USD)</label>
                  <input type="number" name="amount" value={inputs.amount} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">เรท Forward ที่แบงก์เสนอ</label>
                  <input type="number" step="0.01" name="quotedForward" value={inputs.quotedForward} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">คาดการณ์ Spot Rate ในอนาคต (ถ้าไม่ Hedge)</label>
                  <input type="number" step="0.01" name="expectedFutureSpot" value={inputs.expectedFutureSpot} onChange={handleChange} className="w-full px-3 py-2 border rounded-md border-amber-300 bg-amber-50" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-100 p-5 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">ผลการวิเคราะห์ทางทฤษฎี (Theoretical Forward)</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-600">Theoretical Forward Rate:</span>
                <span className="text-xl font-bold text-slate-800">{formatNumber(theoreticalForward, 4)} ฿</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Premium / Discount (Annualized):</span>
                <span className={`font-semibold ${premiumPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {premiumPercentage > 0 ? '+' : ''}{formatNumber(premiumPercentage, 2)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                *อัตราทฤษฎีคำนวณจาก Interest Rate Parity. หากอัตราดอกเบี้ยต่างประเทศสูงกว่าไทย ค่าเงินต่างประเทศจะมีแนวโน้มอ่อนค่าลงในอนาคต (Discount).
              </p>
            </div>

            <div className={`p-5 rounded-xl border ${hedgingGainLoss >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {hedgingGainLoss >= 0 ? <ShieldCheck className="w-5 h-5 text-green-600"/> : <AlertTriangle className="w-5 h-5 text-red-600"/>}
                เปรียบเทียบการทำ Forward vs ไม่ทำ
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>กระแสเงินสดหาก <strong>ทำ Forward</strong>:</span>
                  <span className="font-semibold text-slate-800">{formatNumber(hedgedAmountTHB)} ฿</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200">
                  <span>กระแสเงินสดหาก <strong>ไม่ทำ (รอแลก Spot)</strong>:</span>
                  <span className="font-semibold text-slate-800">{formatNumber(unhedgedAmountTHB)} ฿</span>
                </div>
                
                <div className="flex justify-between items-center pt-1">
                  <span className="font-medium">กำไร/ขาดทุนเชิงเปรียบเทียบ (Opportunity):</span>
                  <span className={`text-lg font-bold ${hedgingGainLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {hedgingGainLoss >= 0 ? '+' : ''}{formatNumber(hedgingGainLoss)} ฿
                  </span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white bg-opacity-60 rounded-lg text-sm text-slate-700">
                <strong>สรุป:</strong> หาก Spot Rate ในอนาคตเป็น {formatNumber(inputs.expectedFutureSpot)} ฿ ตามที่คาด การทำ Forward ที่เรท {formatNumber(inputs.quotedForward)} ฿ จะทำให้คุณ{hedgingGainLoss >= 0 ? 'ได้เปรียบ (ประหยัด/ได้เงินเพิ่ม)' : 'เสียเปรียบ (จ่ายแพงกว่า/ได้เงินน้อยกว่ารอแลกวันจริง)'} เป็นเงิน {formatNumber(Math.abs(hedgingGainLoss))} บาท
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">บริหารความเสี่ยงอัตราแลกเปลี่ยนด้วย FX Forward</h2>
        
        <p>ความผันผวนของค่าเงิน (Exchange Rate Volatility) เป็นความเสี่ยงหลักสำหรับผู้นำเข้าและส่งออก การเปลี่ยนแปลงเพียงเล็กน้อยของอัตราแลกเปลี่ยนอาจส่งผลให้กำไรที่คาดหวังหายไป หรือทำให้ต้นทุนพุ่งสูงขึ้นอย่างควบคุมไม่ได้ เครื่องมือพื้นฐานที่ธนาคารเสนอเพื่อปิดความเสี่ยงนี้คือ <strong>สัญญาซื้อขายเงินตราต่างประเทศล่วงหน้า (FX Forward)</strong></p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">FX Forward Contract คืออะไร?</h3>
        <p>FX Forward คือ สัญญาข้อตกลงระหว่างคุณกับธนาคารในการซื้อหรือขายเงินตราต่างประเทศ <strong>ในจำนวนที่กำหนด ที่อัตราแลกเปลี่ยนที่ตกลงกันไว้ล่วงหน้า และส่งมอบในวันที่กำหนดในอนาคต</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>สำหรับผู้นำเข้า (Importer):</strong> ทำ Forward สัญญา "ซื้อ" (Buy Forward) เพื่อล็อคต้นทุนสินค้า ไม่ให้สูงขึ้นหากค่าเงินบาทอ่อนค่าลง</li>
          <li><strong>สำหรับผู้ส่งออก (Exporter):</strong> ทำ Forward สัญญา "ขาย" (Sell Forward) เพื่อล็อครายได้ ไม่ให้ลดลงหากค่าเงินบาทแข็งค่าขึ้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Forward Rate คำนวณอย่างไร (Interest Rate Parity)</h3>
        <p>หลายคนเข้าใจผิดว่า Forward Rate คืออัตราที่ธนาคาร "คาดการณ์" ว่าค่าเงินจะไปถึงในอนาคต แต่ความจริงแล้ว Forward Rate คำนวณมาจาก <strong>ทฤษฎีความเสมอภาคของอัตราดอกเบี้ย (Interest Rate Parity - IRP)</strong> เพื่อป้องกันการทำ Arbitrage (การทำกำไรส่วนต่างโดยปราศจากความเสี่ยง)</p>
        
        <div className="bg-slate-100 p-4 rounded-lg my-4 font-mono text-center overflow-x-auto">
          Forward Rate = Spot Rate × [ (1 + (Domestic Interest Rate × Days/360)) / (1 + (Foreign Interest Rate × Days/360)) ]
        </div>

        <p><strong>กฎเหล็กของ Forward Rate:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>หากดอกเบี้ยของสกุลเงินต่างประเทศ <strong>สูงกว่า</strong> ดอกเบี้ยบาท Forward Rate จะ <strong>ต่ำกว่า</strong> Spot Rate เสมอ (เรียกว่า Forward Discount)</li>
          <li>หากดอกเบี้ยของสกุลเงินต่างประเทศ <strong>ต่ำกว่า</strong> ดอกเบี้ยบาท Forward Rate จะ <strong>สูงกว่า</strong> Spot Rate เสมอ (เรียกว่า Forward Premium)</li>
        </ul>
        <p>ในปัจจุบัน ดอกเบี้ยสหรัฐฯ (USD) สูงกว่าดอกเบี้ยไทย (THB) เราจึงมักเห็น USD/THB Forward Rate อยู่ในภาวะ Discount (เรท Forward ต่ำกว่า Spot)</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมถึงควร Hedge (ป้องกันความเสี่ยง) แม้อาจจะ "เสียเปรียบ" เชิงตัวเลข</h3>
        <p>บางครั้งเมื่อเปรียบเทียบผลลัพธ์ย้อนหลัง อาจพบว่า "ถ้าไม่ทำ Forward รอแลก Spot ได้กำไรมากกว่า" แต่อย่าลืมว่าจุดประสงค์หลักของ FX Forward <strong>ไม่ใช่การทำกำไรหรือเก็งกำไรค่าเงิน</strong> แต่เป็นการ <strong>สร้างความแน่นอน (Certainty)</strong> ให้กับกระแสเงินสดและมาร์จิ้นกำไร (Profit Margin) ของธุรกิจ</p>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mt-6">
          <p className="flex items-start gap-2 text-indigo-900">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span><strong>คำแนะนำ:</strong> ธุรกิจที่มีมาร์จิ้น (Net Profit Margin) บาง เช่น 5-10% ควรทำการ Hedge เป็นสัดส่วนสูง (เช่น 70-100% ของยอดพอร์ต) เพราะค่าเงินที่แกว่งเพียง 5% ก็อาจกินกำไรของบริษัทไปจนหมดสิ้นได้ การใช้ Forward จึงเหมือนการซื้อประกันให้ธุรกิจนอนหลับได้อย่างสบายใจ</span>
          </p>
        </div>
      </article>
    </div>
  );
}
