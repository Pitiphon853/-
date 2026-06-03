import React, { useState } from 'react';
import { Repeat, Users, DollarSign, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CacPaybackPeriod({ lang }: any) {
  const [inputs, setInputs] = useState({
    marketingSpend: 100000,
    salesSpend: 50000,
    newCustomers: 100,
    arpu: 1000,          // Average Revenue Per User (Monthly)
    grossMargin: 80      // %
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  // 1. Calculate CAC (Customer Acquisition Cost)
  const totalAcquisitionCost = inputs.marketingSpend + inputs.salesSpend;
  const cac = inputs.newCustomers > 0 ? totalAcquisitionCost / inputs.newCustomers : 0;

  // 2. Calculate Gross Profit per Customer per Month
  const gpPerCustomer = inputs.arpu * (inputs.grossMargin / 100);

  // 3. Calculate Payback Period (Months)
  const paybackMonths = gpPerCustomer > 0 ? cac / gpPerCustomer : 0;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const formatDecimal = (num: number) => num.toLocaleString('th-TH', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Repeat className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-800">คำนวณระยะเวลาคืนทุนต่อลูกค้า (CAC Payback Period)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                <Users className="w-5 h-5" /> ต้นทุนในการหาลูกค้าใหม่
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">งบการตลาดรายเดือน (Marketing Spend)</label>
                  <input type="number" name="marketingSpend" value={inputs.marketingSpend} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าใช้จ่ายทีมขายรายเดือน (Sales Spend)</label>
                  <input type="number" name="salesSpend" value={inputs.salesSpend} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">จำนวนลูกค้าใหม่ที่หาได้ในเดือนนั้น (คน)</label>
                  <input type="number" name="newCustomers" value={inputs.newCustomers} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> รายได้และกำไรต่อลูกค้า
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">รายได้เฉลี่ยต่อคนต่อเดือน (Monthly ARPU)</label>
                  <input type="number" name="arpu" value={inputs.arpu} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">อัตรากำไรขั้นต้น (Gross Margin %)</label>
                  <input type="number" name="grossMargin" value={inputs.grossMargin} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">ผลการวิเคราะห์</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-600 mb-1">ต้นทุนต่อลูกค้า 1 ราย (CAC)</div>
                <div className="text-2xl font-bold text-purple-700">{formatNumber(cac)} ฿</div>
                <div className="text-xs text-slate-500 mt-1">Acquisition Cost</div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div className="text-sm font-semibold text-slate-600 mb-1">กำไรต่อคนต่อเดือน</div>
                <div className="text-2xl font-bold text-emerald-700">{formatNumber(gpPerCustomer)} ฿</div>
                <div className="text-xs text-slate-500 mt-1">Monthly Gross Profit</div>
              </div>
            </div>

            <div className="bg-purple-900 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
              <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-purple-800 opacity-50" />
              <h4 className="text-purple-200 font-medium mb-2 relative z-10">ระยะเวลาคืนทุน (CAC Payback Period)</h4>
              <div className="text-5xl font-bold mb-1 relative z-10">
                {formatDecimal(paybackMonths)} <span className="text-2xl font-normal">เดือน</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              paybackMonths <= 12 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              {paybackMonths <= 12 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              
              <div>
                <h4 className={`font-bold ${paybackMonths <= 12 ? 'text-emerald-900' : 'text-amber-900'}`}>
                  {paybackMonths <= 12 ? 'สุขภาพธุรกิจยอดเยี่ยม' : 'ต้องระวังกระแสเงินสด'}
                </h4>
                <p className={`text-sm mt-1 ${paybackMonths <= 12 ? 'text-emerald-800' : 'text-amber-800'}`}>
                  {paybackMonths <= 12 
                    ? `ธุรกิจของคุณใช้เวลาเพียง ${formatDecimal(paybackMonths)} เดือนในการคืนทุนค่าการตลาด ถือว่าอยู่ในเกณฑ์มาตรฐานที่ยอดเยี่ยม (< 12 เดือน) สามารถเร่งอัดฉีดงบเพื่อเติบโตได้` 
                    : `การที่ระยะเวลาคืนทุนนานกว่า 12 เดือน (ใช้เวลา ${formatDecimal(paybackMonths)} เดือน) อาจทำให้ธุรกิจมีปัญหา Cash flow หากมีลูกค้า Churn (ยกเลิก) ก่อนจุดคุ้มทุน ควรลด CAC หรือเพิ่ม ARPU`}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">CAC Payback Period: ตัวชี้วัดความเป็นความตายของธุรกิจ Subscription และ SaaS</h2>
        
        <p>ในโมเดลธุรกิจที่เก็บเงินเป็นรายเดือน (Subscription) เช่น ซอฟต์แวร์ SaaS, ฟิตเนส, บริการสตรีมมิ่ง หรือแม้แต่การขายประกัน รายได้จากลูกค้ามักจะไม่ได้มาเป็นก้อนใหญ่ในวันแรก แต่จะค่อยๆ ทยอยรับรู้เป็นรายเดือน ในขณะที่ <strong>"ค่าใช้จ่ายในการหาลูกค้า" (CAC)</strong> มักจะต้องจ่ายก้อนใหญ่ล่วงหน้า เช่น ค่าโฆษณา ค่านายหน้าเซลส์</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">CAC Payback Period คืออะไร?</h3>
        <p><strong>CAC Payback Period (ระยะเวลาคืนทุนค่าหาลูกค้า)</strong> คือจำนวนเดือนที่ธุรกิจต้องรอ เพื่อให้ "กำไร" ที่เก็บได้จากลูกค้ารายใหม่ ครอบคลุม "ต้นทุน" ที่เราจ่ายไปเพื่อให้ได้เขามา ตัวเลขนี้บอกได้เลยว่าธุรกิจของคุณกำลังเผาเงิน (Burn Cash) เร็วแค่ไหน และใช้เวลานานเท่าไรเงินก้อนนั้นถึงจะไหลกลับมา</p>
        
        <div className="bg-slate-50 p-4 rounded-lg my-4 font-mono text-center">
          Payback Period (Months) = CAC ÷ (ARPU × Gross Margin)
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">องค์ประกอบสำคัญในการคำนวณ</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>CAC (Customer Acquisition Cost):</strong> ต้นทุนต่อลูกค้าใหม่ 1 ราย คิดรวมทั้งงบการตลาด เงินเดือนทีมขาย และค่าคอมมิชชั่น หารด้วยจำนวนลูกค้าใหม่ที่ปิดได้</li>
          <li><strong>ARPU (Average Revenue Per User):</strong> รายได้เฉลี่ยรายเดือนที่เก็บจากลูกค้า 1 ราย</li>
          <li><strong>Gross Margin (%):</strong> อัตรากำไรขั้นต้น เนื่องจากเราไม่สามารถนำรายได้ (Revenue) มาคืนทุนได้เต็ม 100% ต้องหักต้นทุนการให้บริการ (Cost of Goods/Services Sold) ออกก่อน เช่น ค่า Server, ค่าธรรมเนียม Payment Gateway</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">เกณฑ์มาตรฐาน (Benchmark) ที่ดีควรเป็นเท่าไร?</h3>
        <p>สำหรับสตาร์ทอัพและธุรกิจแบบ Subscription ทั่วโลก <strong>ระยะเวลา 12 เดือน คือมาตรฐานทองคำ (Gold Standard)</strong></p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h4 className="font-bold text-emerald-800">&lt; 12 เดือน (ยอดเยี่ยม)</h4>
            <p className="text-sm mt-1 text-emerald-700">กระแสเงินสดจะหมุนเร็วมาก คุณจะสามารถนำกำไรกลับมาลงทุนหาลูกค้าใหม่ได้อย่างรวดเร็ว เหมาะแก่การ Scale อย่างหนัก</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-800">12 - 18 เดือน (ปานกลาง)</h4>
            <p className="text-sm mt-1 text-blue-700">เป็นระดับปกติสำหรับธุรกิจ Enterprise ที่สัญญาผูกพันระยะยาว (Annual Contract) แต่บริษัทต้องมีสายป่านเงินทุนที่ยาวพอ</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-800">&gt; 18 เดือน (อันตราย)</h4>
            <p className="text-sm mt-1 text-red-700">เงินจม เสี่ยงต่อปัญหา Cash Flow และถ้าลูกค้าเลิกใช้บริการ (Churn) ก่อนถึงจุดคุ้มทุน บริษัทจะขาดทุนทันที</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">วิธีลดระยะเวลาคืนทุน</h3>
        <p>หาก Payback Period ของคุณสูงเกินไป สามารถปรับแก้ได้ 3 ทางหลัก:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>ลด CAC:</strong> ปรับปรุงประสิทธิภาพโฆษณา ลดกระบวนการขายที่เยิ่นเย้อ เน้นช่องทางที่ได้ลูกค้าด้วยต้นทุนต่ำ (เช่น SEO หรือ Referral)</li>
          <li><strong>เพิ่ม ARPU:</strong> เสนอขายสินค้าที่แพงขึ้น (Upsell) หรือฟีเจอร์เสริม (Cross-sell) ทันทีในเดือนแรก</li>
          <li><strong>เพิ่มเงินดาวน์ (Upfront Payment):</strong> จูงใจให้ลูกค้าจ่ายรายปีแทนรายเดือน โดยให้ส่วนลด วิธีนี้ทำให้ Payback Period กลายเป็น 0 เดือนทันที (ได้เงินก้อนคลุมค่า CAC ทันที)</li>
        </ol>
      </article>
    </div>
  );
}
