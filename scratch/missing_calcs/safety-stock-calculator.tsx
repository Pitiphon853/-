import React, { useState } from 'react';
import { ShieldCheck, Calculator, AlertTriangle, Clock, TrendingUp, Info } from 'lucide-react';

export default function SafetyStockCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [maxDailyUsage, setMaxDailyUsage] = useState<number | ''>('');
  const [maxLeadTime, setMaxLeadTime] = useState<number | ''>('');
  const [avgDailyUsage, setAvgDailyUsage] = useState<number | ''>('');
  const [avgLeadTime, setAvgLeadTime] = useState<number | ''>('');

  const calculate = () => {
    const maxUse = Number(maxDailyUsage) || 0;
    const maxLT = Number(maxLeadTime) || 0;
    const avgUse = Number(avgDailyUsage) || 0;
    const avgLT = Number(avgLeadTime) || 0;

    // Safety Stock Formula: (Max Daily Usage * Max Lead Time) - (Average Daily Usage * Average Lead Time)
    const maxLeadTimeUsage = maxUse * maxLT;
    const avgLeadTimeUsage = avgUse * avgLT;
    let safetyStock = maxLeadTimeUsage - avgLeadTimeUsage;
    
    if (safetyStock < 0) safetyStock = 0;

    return {
      safetyStock: Math.ceil(safetyStock),
      maxExpected: maxLeadTimeUsage,
      avgExpected: avgLeadTimeUsage
    };
  };

  const results = calculate();

  const resetFields = () => {
    setMaxDailyUsage('');
    setMaxLeadTime('');
    setAvgDailyUsage('');
    setAvgLeadTime('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-100">
        <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            <h2 className="text-2xl font-bold">
              {isTH ? 'โปรแกรมคำนวณ Safety Stock' : 'Safety Stock Calculator'}
            </h2>
          </div>
          <button 
            onClick={resetFields}
            className="text-blue-100 hover:text-white text-sm bg-blue-700/50 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            {isTH ? 'ล้างข้อมูล' : 'Reset'}
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-red-50 p-5 rounded-xl border border-red-100">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {isTH ? 'กรณีเลวร้ายที่สุด (Worst Case)' : 'Worst Case Scenario'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-red-700 mb-1">
                    {isTH ? 'ยอดขาย/การใช้ สูงสุดต่อวัน (ชิ้น)' : 'Max Daily Usage (units)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={maxDailyUsage}
                    onChange={(e) => setMaxDailyUsage(Number(e.target.value))}
                    className="w-full border border-red-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                    placeholder="e.g. 150"
                  />
                </div>
                <div>
                  <label className="block text-sm text-red-700 mb-1">
                    {isTH ? 'ระยะเวลารอสินค้า นานที่สุด (วัน)' : 'Max Lead Time (days)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={maxLeadTime}
                    onChange={(e) => setMaxLeadTime(Number(e.target.value))}
                    className="w-full border border-red-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                    placeholder="e.g. 14"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
              <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {isTH ? 'กรณีปกติเฉลี่ย (Average Case)' : 'Average Case Scenario'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-emerald-700 mb-1">
                    {isTH ? 'ยอดขาย/การใช้ เฉลี่ยต่อวัน (ชิ้น)' : 'Average Daily Usage (units)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={avgDailyUsage}
                    onChange={(e) => setAvgDailyUsage(Number(e.target.value))}
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-emerald-700 mb-1">
                    {isTH ? 'ระยะเวลารอสินค้า เฉลี่ย (วัน)' : 'Average Lead Time (days)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={avgLeadTime}
                    onChange={(e) => setAvgLeadTime(Number(e.target.value))}
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    placeholder="e.g. 10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                {isTH ? 'ผลการคำนวณ (Results)' : 'Calculation Results'}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-slate-100">
                  <span className="text-slate-600 text-sm md:text-base">{isTH ? 'สินค้าที่ต้องใช้ในกรณีเลวร้ายสุด' : 'Max Expected Demand'}</span>
                  <span className="font-semibold text-red-600">{results.maxExpected.toLocaleString()}</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-slate-100">
                  <span className="text-slate-600 text-sm md:text-base">{isTH ? 'สินค้าที่ใช้ในระยะเวลารอของปกติ' : 'Average Expected Demand'}</span>
                  <span className="font-semibold text-emerald-600">{results.avgExpected.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-24 h-24 text-blue-600" />
              </div>
              <p className="text-blue-800 font-medium mb-2 relative z-10">
                {isTH ? 'จำนวนสต็อกปลอดภัยที่ควรมี (Safety Stock)' : 'Recommended Safety Stock'}
              </p>
              <div className="text-5xl font-bold text-blue-600 relative z-10">
                {results.safetyStock.toLocaleString()}
              </div>
              <p className="text-sm text-blue-600 mt-2 relative z-10">
                {isTH ? 'ชิ้น / หน่วย' : 'Units'}
              </p>
            </div>
            
            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                {isTH 
                  ? 'สูตร: (ยอดขายสูงสุด x รอของนานสุด) - (ยอดขายเฉลี่ย x รอของเฉลี่ย) ผลลัพธ์ถูกปัดเศษขึ้นเป็นจำนวนเต็มเพื่อป้องกันความเสี่ยง' 
                  : 'Formula: (Max Usage * Max LT) - (Avg Usage * Avg LT). Result is rounded up to minimize risk.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-slate max-w-none mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-b pb-4">Safety Stock คืออะไร? หัวใจสำคัญของการจัดการสินค้าคงคลัง</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Safety Stock (สต็อกปลอดภัย)</strong> คือปริมาณสินค้าสำรองที่ถูกเก็บไว้เผื่อในกรณีฉุกเฉินหรือเหตุการณ์ที่ไม่คาดฝัน เพื่อป้องกันปัญหา <strong>"สินค้าขาดมือ (Stockout)"</strong> ซึ่งอาจเกิดจากปัจจัยต่างๆ เช่น ความต้องการสินค้า (Demand) พุ่งสูงขึ้นอย่างกะทันหัน หรือซัพพลายเออร์ส่งของล่าช้า (Lead Time Delay) การมี Safety Stock จะช่วยให้ธุรกิจสามารถดำเนินต่อไปได้อย่างราบรื่น ไม่เสียโอกาสในการขาย และรักษาความพึงพอใจของลูกค้าไว้ได้
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ทำไมธุรกิจถึงขาด Safety Stock ไม่ได้?</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>ป้องกันความผันผวนของยอดขาย:</strong> ในบางช่วงเวลา เช่น เทศกาลลดราคา ยอดขายอาจพุ่งสูงกว่าปกติหลายเท่า หากไม่มีของสต็อกเผื่อไว้ คุณจะเสียยอดขายส่วนนี้ไปฟรีๆ</li>
            <li><strong>รับมือกับปัญหา Supply Chain:</strong> ซัพพลายเออร์อาจประสบปัญหาเครื่องจักรเสีย เรือขนส่งติดพายุ หรือศุลกากรตรวจสินค้านานกว่าปกติ ทำให้ Lead time ยืดเยื้อ</li>
            <li><strong>รักษาภาพลักษณ์แบรนด์:</strong> ลูกค้าที่สั่งของแล้วพบว่า "สินค้าหมด" บ่อยๆ จะรู้สึกไม่มั่นใจ และอาจเปลี่ยนไปซื้อสินค้ากับคู่แข่งของคุณแทน</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">สูตรการคำนวณ Safety Stock แบบมาตรฐาน</h3>
          <p className="text-slate-700 mb-4">
            วิธีการคำนวณที่ได้รับความนิยมและแม่นยำที่สุดคือการใช้ข้อมูลในอดีตมาคำนวณหาความต่างระหว่าง "กรณีเลวร้ายที่สุด" และ "กรณีปกติเฉลี่ย" โดยมีตัวแปรที่ต้องใช้ดังนี้:
          </p>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-6">
            <p className="font-semibold text-lg text-blue-900 mb-2">สูตรคำนวณ:</p>
            <p className="text-xl text-blue-800 font-mono bg-white p-3 rounded border border-blue-200 text-center">
              (Max Daily Usage × Max Lead Time) - (Avg Daily Usage × Avg Lead Time)
            </p>
          </div>
          <p className="text-slate-700">
            <strong>คำอธิบายตัวแปร:</strong><br/>
            - <strong>Max Daily Usage:</strong> ยอดขายหรือปริมาณการใช้สินค้าสูงสุดใน 1 วัน (เท่าที่เคยบันทึกสถิติได้)<br/>
            - <strong>Max Lead Time:</strong> ระยะเวลาที่ต้องรอของนานที่สุด (จำนวนวัน)<br/>
            - <strong>Avg Daily Usage:</strong> ยอดขายเฉลี่ยต่อวันในภาวะปกติ<br/>
            - <strong>Avg Lead Time:</strong> ระยะเวลารอสินค้าโดยเฉลี่ยปกติ
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ตัวอย่างการคำนวณแบบเข้าใจง่าย</h3>
          <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200">
            สมมติว่าคุณขายเสื้อยืด:<br/>
            - ปกติขายได้วันละ <strong>50 ตัว</strong> (ยอดขายเฉลี่ย)<br/>
            - แต่บางวันช่วงจัดโปร ขายได้สูงสุด <strong>80 ตัว</strong> (ยอดขายสูงสุด)<br/>
            - ปกติสั่งผลิตจากโรงงานใช้เวลา <strong>10 วัน</strong> ถึงจะได้ของ (รอของเฉลี่ย)<br/>
            - แต่เคยมีปัญหาล่าช้าสุดใช้เวลาถึง <strong>15 วัน</strong> (รอของนานสุด)<br/><br/>
            <strong>วิธีคิด:</strong><br/>
            1. กรณีแย่สุด (Max x Max) = 80 ตัว x 15 วัน = 1,200 ตัว<br/>
            2. กรณีปกติ (Avg x Avg) = 50 ตัว x 10 วัน = 500 ตัว<br/>
            3. นำมาลบกัน = 1,200 - 500 = <strong>700 ตัว</strong><br/><br/>
            <strong>สรุป:</strong> คุณควรมี Safety Stock สำรองไว้ในโกดังอย่างน้อย <strong>700 ตัว</strong> เพื่อให้มั่นใจว่าจะไม่เกิดเหตุการณ์ของขาดสต็อก
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ข้อควรระวังในการเก็บ Safety Stock</h3>
          <p className="text-slate-700 leading-relaxed">
            แม้ว่าการมีสต็อกปลอดภัยจะดี แต่หากมี <strong>"มากเกินไป"</strong> ก็จะกลายเป็น <strong>ต้นทุนจม (Sunk Cost)</strong> ทำให้เสียพื้นที่จัดเก็บ <a href="/business/warehousing-cost" className="text-blue-600 hover:underline">เสียค่าโกดังรายเดือน</a> และเสี่ยงต่อการที่สินค้าจะหมดอายุหรือล้าสมัย ดังนั้น คุณควรนำตัวเลข Safety Stock นี้ไปใช้ร่วมกับการหา <a href="/business/reorder-point-calculator" className="text-blue-600 hover:underline">จุดสั่งซื้อใหม่ (Reorder Point)</a> เพื่อให้ระบบบริหารจัดการสินค้าคงคลังของคุณเกิดประสิทธิภาพและมีต้นทุนต่ำที่สุด
          </p>
        </article>
      )}
    </div>
  );
}
