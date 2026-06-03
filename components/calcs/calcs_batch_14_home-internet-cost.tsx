import React, { useState } from 'react';
import { Wifi, Wallet, CalendarDays, Tag, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomeInternetCost({ lang }: any) {
  const [plan1, setPlan1] = useState({
    name: 'แพ็กเกจ A',
    monthlyFee: 599,
    setupFee: 0,
    discountTotal: 0,
    contractMonths: 12
  });

  const [plan2, setPlan2] = useState({
    name: 'แพ็กเกจ B',
    monthlyFee: 799,
    setupFee: 890,
    discountTotal: 1200,
    contractMonths: 24
  });

  const calculatePlan = (plan: typeof plan1) => {
    const m = Number(plan.monthlyFee) || 0;
    const s = Number(plan.setupFee) || 0;
    const d = Number(plan.discountTotal) || 0;
    const c = Number(plan.contractMonths) || 12;

    if (c > 0) {
      const totalMonthlyFees = m * c;
      const totalCost = totalMonthlyFees + s - d;
      const averagePerMonth = totalCost / c;

      return {
        totalMonthlyFees,
        totalCost: Math.max(0, totalCost),
        averagePerMonth: Math.max(0, averagePerMonth)
      };
    }
    return { totalMonthlyFees: 0, totalCost: 0, averagePerMonth: 0 };
  };

  const res1 = calculatePlan(plan1);
  const res2 = calculatePlan(plan2);

  const diffAverage = Math.abs(res1.averagePerMonth - res2.averagePerMonth);
  const diffTotal = Math.abs(res1.totalCost - res2.totalCost);

  let winner = 0; // 0 = tie, 1 = plan1, 2 = plan2
  if (res1.averagePerMonth < res2.averagePerMonth) winner = 1;
  if (res2.averagePerMonth < res1.averagePerMonth) winner = 2;

  const renderInput = (
    plan: typeof plan1,
    setPlan: React.Dispatch<React.SetStateAction<typeof plan1>>,
    title: string,
    colorClass: string,
    ringClass: string
  ) => (
    <div className={`p-5 rounded-2xl border ${colorClass} bg-white shadow-sm space-y-4`}>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ชื่อแพ็กเกจ (ตัวเลือก)
        </label>
        <input
          type="text"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 ${ringClass} focus:border-transparent transition-all`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ค่าบริการรายเดือน (บาท)
        </label>
        <div className="relative">
          <input
            type="number"
            value={plan.monthlyFee === 0 ? '' : plan.monthlyFee}
            onChange={(e) => setPlan({ ...plan, monthlyFee: Number(e.target.value) })}
            className={`w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 ${ringClass} focus:border-transparent transition-all`}
            min="0"
          />
          <Wallet className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ค่าติดตั้ง / ค่าอุปกรณ์ (บาท)
        </label>
        <div className="relative">
          <input
            type="number"
            value={plan.setupFee === 0 ? '' : plan.setupFee}
            onChange={(e) => setPlan({ ...plan, setupFee: Number(e.target.value) })}
            className={`w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 ${ringClass} focus:border-transparent transition-all`}
            min="0"
          />
          <Wifi className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ส่วนลดรวมทั้งหมดตลอดสัญญา (บาท)
        </label>
        <div className="relative">
          <input
            type="number"
            value={plan.discountTotal === 0 ? '' : plan.discountTotal}
            onChange={(e) => setPlan({ ...plan, discountTotal: Number(e.target.value) })}
            className={`w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 ${ringClass} focus:border-transparent transition-all`}
            min="0"
          />
          <Tag className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 mt-1">เช่น ส่วนลด 50% นาน 6 เดือน ให้นำมาบวกกันทั้งหมด</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ระยะเวลาสัญญา (เดือน)
        </label>
        <div className="relative">
          <input
            type="number"
            value={plan.contractMonths === 0 ? '' : plan.contractMonths}
            onChange={(e) => setPlan({ ...plan, contractMonths: Number(e.target.value) })}
            className={`w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 ${ringClass} focus:border-transparent transition-all`}
            min="1"
          />
          <CalendarDays className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            เปรียบเทียบค่าอินเทอร์เน็ตบ้าน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {renderInput(plan1, setPlan1, "แพ็กเกจที่ 1", "border-indigo-100", "focus:ring-indigo-500")}
          {renderInput(plan2, setPlan2, "แพ็กเกจที่ 2", "border-pink-100", "focus:ring-pink-500")}
        </div>

        {/* Results Section */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">สรุปผลการเปรียบเทียบ (เฉลี่ยต่อเดือน)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan 1 Result */}
            <div className={`p-5 rounded-xl border-2 transition-all ${winner === 1 ? 'border-indigo-500 bg-indigo-50' : 'border-transparent bg-white shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-gray-800">{plan1.name || 'แพ็กเกจ 1'}</h4>
                {winner === 1 && <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> คุ้มกว่า</span>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ค่าบริการรวม ({plan1.contractMonths} เดือน)</span>
                  <span className="font-medium text-gray-900">฿{res1.totalMonthlyFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ค่าติดตั้ง/อุปกรณ์</span>
                  <span className="font-medium text-gray-900">฿{plan1.setupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>ส่วนลดรวม</span>
                  <span className="font-medium">-฿{plan1.discountTotal.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-gray-700">จ่ายสุทธิตลอดสัญญา</span>
                  <span className="font-bold text-gray-900">฿{res1.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2">
                  <span className="text-sm text-gray-500">เฉลี่ยต่อเดือน</span>
                  <p className={`text-3xl font-bold mt-1 ${winner === 1 ? 'text-indigo-600' : 'text-gray-800'}`}>
                    ฿{res1.averagePerMonth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan 2 Result */}
            <div className={`p-5 rounded-xl border-2 transition-all ${winner === 2 ? 'border-pink-500 bg-pink-50' : 'border-transparent bg-white shadow-sm'}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-gray-800">{plan2.name || 'แพ็กเกจ 2'}</h4>
                {winner === 2 && <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> คุ้มกว่า</span>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ค่าบริการรวม ({plan2.contractMonths} เดือน)</span>
                  <span className="font-medium text-gray-900">฿{res2.totalMonthlyFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ค่าติดตั้ง/อุปกรณ์</span>
                  <span className="font-medium text-gray-900">฿{plan2.setupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>ส่วนลดรวม</span>
                  <span className="font-medium">-฿{plan2.discountTotal.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-gray-700">จ่ายสุทธิตลอดสัญญา</span>
                  <span className="font-bold text-gray-900">฿{res2.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2">
                  <span className="text-sm text-gray-500">เฉลี่ยต่อเดือน</span>
                  <p className={`text-3xl font-bold mt-1 ${winner === 2 ? 'text-pink-600' : 'text-gray-800'}`}>
                    ฿{res2.averagePerMonth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {winner !== 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <p className="text-green-800">
                <strong>{winner === 1 ? plan1.name || 'แพ็กเกจที่ 1' : plan2.name || 'แพ็กเกจที่ 2'}</strong> คุ้มค่ากว่าเมื่อคิดเฉลี่ยต่อเดือน!
              </p>
              <p className="text-sm text-green-700 mt-1">
                ประหยัดกว่าเฉลี่ยเดือนละ <strong>฿{diffAverage.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> (ตลอดสัญญาประหยัดไป ฿{diffTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })})
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีเปรียบเทียบค่าอินเทอร์เน็ตบ้าน เลือกโปรแบบไหนให้คุ้มค่าที่สุด?</h2>
        
        <p>ปัจจุบันอินเทอร์เน็ตบ้านกลายเป็นสิ่งจำเป็นสำหรับทุกครอบครัว ไม่ว่าจะใช้สำหรับทำงาน (Work from Home), เรียนออนไลน์, ดูหนังซีรีส์ หรือเล่นเกม แต่ด้วยโปรโมชันจากผู้ให้บริการ (ISP) ที่แข่งขันกันดุเดือด ทั้งลดราคา แถมอุปกรณ์ หรือแถมซิมเน็ตฟรี บางครั้งก็ทำให้เราสับสนว่า <strong>"สรุปแล้วโปรไหนคุ้มที่สุด?"</strong> การใช้เครื่องมือเปรียบเทียบค่าอินเทอร์เน็ตบ้าน (Home Internet Cost Comparison) จะช่วยให้คุณเห็นค่าใช้จ่ายที่แท้จริงตลอดอายุสัญญา</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">อย่าดูแค่ "ค่าบริการรายเดือน" อย่างเดียว</h3>
        <p>หลายคนมักตัดสินใจเลือกโปรโมชันเพียงเพราะเห็นตัวเลขค่าบริการรายเดือนที่ถูกกว่า แต่ในความเป็นจริง การคำนวณความคุ้มค่าต้องนำปัจจัยแฝงอื่นๆ มาคิดรวมด้วย:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ค่าแรกเข้า หรือ ค่าติดตั้ง:</strong> บางโปรโมชันรายเดือนถูกมาก แต่มีค่าอุปกรณ์เร้าเตอร์ หรือค่าเดินสายเพิ่มเติมในบิลแรก</li>
          <li><strong>ส่วนลดระยะสั้น:</strong> โปรโมชันยอดฮิต เช่น "ลด 50% นาน 6 เดือน" (หลังจากนั้นจ่ายราคาเต็ม) ทำให้เราจ่ายถูกแค่ช่วงแรก พอหารเฉลี่ยตลอดสัญญาก็อาจไม่ได้ถูกอย่างที่คิด</li>
          <li><strong>ระยะเวลาสัญญา (Contract):</strong> สัญญามีตั้งแต่ 12 เดือน ไปจนถึง 24 เดือน สัญญาที่ยาวกว่าอาจมาพร้อมของแถมที่มากกว่า แต่เราก็จะถูกผูกมัดนานขึ้น หากยกเลิกก่อนกำหนดจะมีค่าปรับ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคำนวณ "ค่าเฉลี่ยต่อเดือน" (Average Monthly Cost)</h3>
        <p>หัวใจสำคัญของการเปรียบเทียบคือการหา <strong>"ค่าเฉลี่ยสุทธิต่อเดือนตลอดสัญญา"</strong> โดยมีสูตรการคิดง่ายๆ ดังนี้:</p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
          <p className="font-semibold text-gray-900 mb-2">ขั้นตอนการคำนวณ:</p>
          <p>1. <strong>รวมค่าบริการปกติ:</strong> ค่าบริการต่อเดือน × จำนวนเดือนในสัญญา</p>
          <p>2. <strong>บวกค่าใช้จ่ายเพิ่มเติม:</strong> นำผลลัพธ์จากข้อ 1 มาบวก ค่าติดตั้ง หรือค่าแรกเข้า (ถ้ามี)</p>
          <p>3. <strong>หักส่วนลด:</strong> ลบด้วยส่วนลดทั้งหมดที่ได้ตลอดสัญญา</p>
          <p>4. <strong>หาค่าเฉลี่ย:</strong> นำยอดสุทธิทั้งหมด หารด้วย จำนวนเดือนในสัญญา</p>
        </div>
        <p>ตัวอย่างเช่น: <br/>
        <strong>โปร A:</strong> เดือนละ 500 บาท สัญญา 12 เดือน ค่าติดตั้ง 1,000 บาท ไม่มีส่วนลด<br/>
        รวมจ่าย (500×12)+1000 = 7,000 บาท (เฉลี่ย <strong>583 บาท/เดือน</strong>)<br/><br/>
        <strong>โปร B:</strong> เดือนละ 600 บาท สัญญา 12 เดือน ฟรีค่าติดตั้ง และลด 50% ให้ 3 เดือนแรก (ลดไป 300×3 = 900 บาท)<br/>
        รวมจ่าย (600×12) - 900 = 6,300 บาท (เฉลี่ย <strong>525 บาท/เดือน</strong>)<br/>
        <em>จะเห็นได้ว่าโปร B คุ้มกว่า แม้ค่าบริการรายเดือนปกติจะสูงกว่าก็ตาม!</em>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สิ่งอื่นๆ ที่ต้องพิจารณานอกเหนือจาก "ราคา"</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ความเร็วที่ตอบโจทย์ (Speed):</strong> สำหรับการใช้งานทั่วไป 300-500 Mbps ก็เพียงพอแล้ว แต่หากบ้านไหนมีคนใช้งานเยอะ หรือชอบโหลดไฟล์ใหญ่ๆ อาจต้องมองหาโปรระดับ 1 Gbps</li>
          <li><strong>เทคโนโลยีเร้าเตอร์:</strong> โปรโมชันใหม่ๆ มักมาพร้อมเราเตอร์ Wi-Fi 6 ซึ่งส่งสัญญาณได้ไกลและเสถียรกว่า Wi-Fi 5 หากบ้านหลังใหญ่ ควรพิจารณาโปรที่มีบริการ Mesh Wi-Fi (เพิ่มจุดกระจายสัญญาณ) ด้วย</li>
          <li><strong>บริการเสริม:</strong> บางค่ายแถมซิมเน็ตมือถือ, กล่องทีวี, หรือแอปดูหนังฟรี ซึ่งถ้าเราต้องใช้บริการเหล่านี้อยู่แล้ว การได้มาฟรีก็ถือเป็นความคุ้มค่าที่นำมาหักลบกับค่าอินเทอร์เน็ตได้</li>
          <li><strong>บริการหลังการขาย:</strong> หากพื้นที่แถวบ้านคุณมีปัญหาสายขาดบ่อย ค่ายที่มีช่างซ่อมไว หรือมีคอลเซ็นเตอร์ติดต่อได้ 24 ชั่วโมง ย่อมทำให้คุณสบายใจกว่า</li>
        </ol>

        <p className="mt-6 p-4 bg-purple-50 text-purple-900 rounded-lg">
          <strong>สรุป:</strong> ก่อนตัดสินใจเปลี่ยนค่ายหรือสมัครโปรโมชันใหม่ทุกครั้ง แนะนำให้ใช้เครื่องมือเปรียบเทียบของเราเพื่อคำนวณหาราคาเฉลี่ยต่อเดือนที่แท้จริง และอย่าลืมสอบถามผู้ให้บริการถึงภาษีมูลค่าเพิ่ม 7% ว่ารวมอยู่ในราคาที่โฆษณาแล้วหรือยัง เพื่อไม่ให้งบบานปลายในภายหลัง
        </p>
      </article>
    </div>
  );
}
