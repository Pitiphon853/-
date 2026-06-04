import React, { useState } from 'react';
import { ArrowDownToLine, Package, Truck, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function ReorderPointCalculator({ lang }: any) {
  const isTH = lang === 'TH';

  const [dailyUsage, setDailyUsage] = useState<number | ''>('');
  const [leadTime, setLeadTime] = useState<number | ''>('');
  const [safetyStock, setSafetyStock] = useState<number | ''>('');

  const calculate = () => {
    const usage = Number(dailyUsage) || 0;
    const lt = Number(leadTime) || 0;
    const ss = Number(safetyStock) || 0;

    // ROP Formula: (Average Daily Usage * Lead Time) + Safety Stock
    const leadTimeDemand = usage * lt;
    const rop = leadTimeDemand + ss;

    return {
      leadTimeDemand: Math.ceil(leadTimeDemand),
      rop: Math.ceil(rop)
    };
  };

  const results = calculate();

  const resetFields = () => {
    setDailyUsage('');
    setLeadTime('');
    setSafetyStock('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-violet-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowDownToLine className="w-8 h-8" />
            <h2 className="text-2xl font-bold">
              {isTH ? 'เครื่องมือคำนวณจุดสั่งซื้อใหม่ (Reorder Point)' : 'Reorder Point Calculator'}
            </h2>
          </div>
          <button 
            onClick={resetFields}
            className="text-violet-100 hover:text-white text-sm bg-violet-700/50 hover:bg-violet-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            {isTH ? 'ล้างข้อมูล' : 'Reset'}
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
              
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Package className="w-4 h-4 text-violet-500" />
                  {isTH ? 'ยอดขายเฉลี่ยต่อวัน (ชิ้น/วัน)' : 'Average Daily Usage (units/day)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={dailyUsage}
                  onChange={(e) => setDailyUsage(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none text-lg"
                  placeholder="e.g. 50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {isTH ? 'จำนวนสินค้าที่คุณขายได้โดยเฉลี่ยใน 1 วัน' : 'Average number of units sold per day'}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Truck className="w-4 h-4 text-violet-500" />
                  {isTH ? 'ระยะเวลารอสินค้า (วัน)' : 'Lead Time (days)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={leadTime}
                  onChange={(e) => setLeadTime(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none text-lg"
                  placeholder="e.g. 10"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {isTH ? 'เวลานับตั้งแต่สั่งซื้อจนของมาส่งถึงโกดัง' : 'Time from placing order to receiving goods'}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <ShieldAlert className="w-4 h-4 text-violet-500" />
                  {isTH ? 'สต็อกปลอดภัย (ชิ้น)' : 'Safety Stock (units)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={safetyStock}
                  onChange={(e) => setSafetyStock(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none text-lg"
                  placeholder="e.g. 100"
                />
                <p className="text-xs text-slate-500 mt-1 flex justify-between">
                  <span>{isTH ? 'จำนวนสินค้าสำรองกันของขาด' : 'Buffer stock to prevent stockouts'}</span>
                  {isTH && <a href="/business/safety-stock-calculator" className="text-violet-600 hover:underline">ไม่รู้ค่านี้? คำนวณที่นี่</a>}
                </p>
              </div>

            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-violet-50 rounded-2xl p-6 border border-violet-100 flex-grow flex flex-col justify-center items-center text-center">
              
              <div className="mb-8 w-full">
                <div className="bg-white/60 p-4 rounded-xl border border-violet-200 flex justify-between items-center w-full">
                  <span className="text-slate-600 font-medium text-sm md:text-base">
                    {isTH ? 'สินค้าที่ถูกขายระหว่างรอของ (Lead Time Demand)' : 'Lead Time Demand'}
                  </span>
                  <span className="font-bold text-lg text-slate-800">{results.leadTimeDemand.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-full w-48 h-48 flex flex-col justify-center items-center shadow-lg border-4 border-violet-200 mb-6 relative">
                <CheckCircle className="absolute -top-3 -right-3 w-10 h-10 text-emerald-500 bg-white rounded-full" />
                <p className="text-slate-500 font-medium text-sm mb-1">{isTH ? 'จุดสั่งซื้อใหม่ (ROP)' : 'Reorder Point'}</p>
                <div className="text-5xl font-black text-violet-700">{results.rop.toLocaleString()}</div>
                <p className="text-slate-400 text-xs mt-1">{isTH ? 'ชิ้น (Units)' : 'Units'}</p>
              </div>

              <p className="text-violet-800 font-medium px-4">
                {isTH 
                  ? `เมื่อสต็อกของคุณลดลงเหลือ ${results.rop.toLocaleString()} ชิ้น คุณควรสั่งซื้อสินค้าล็อตใหม่ทันที!` 
                  : `When your inventory drops to ${results.rop.toLocaleString()} units, place a new order immediately!`}
              </p>

            </div>
            
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex gap-3 text-amber-800 text-sm">
              <Info className="w-5 h-5 shrink-0 text-amber-500" />
              <p>
                {isTH 
                  ? 'การตั้งค่า ROP ที่แม่นยำ จะช่วยป้องกันไม่ให้สต็อกจม (Overstock) และป้องกันสินค้าขาดมือ (Stockout) ในเวลาเดียวกัน'
                  : 'An accurate ROP prevents both overstocking (sunk costs) and stockouts (lost sales).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-slate max-w-none mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-b pb-4">Reorder Point (ROP) คืออะไร? และสำคัญอย่างไรต่อการจัดการสต็อก</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Reorder Point (ROP)</strong> หรือ <strong>จุดสั่งซื้อใหม่</strong> คือระดับของสินค้าคงคลังที่เป็น "สัญญาณเตือน" ให้คุณรู้ว่า <strong>"ถึงเวลาต้องสั่งของเพิ่มแล้ว"</strong> หากปริมาณสินค้าในโกดังลดลงมาจนแตะถึงจุดนี้ คุณต้องรีบทำการสั่งซื้อ (PO) ล็อตใหม่ทันที เพื่อให้ของล็อตใหม่มาส่งถึงคลังสินค้าของคุณพอดีกับจังหวะที่ของล็อตเก่ากำลังจะหมดไป การคำนวณ ROP อย่างถูกต้องคือเคล็ดลับของธุรกิจระดับโลกในการบริหารกระแสเงินสดและลดต้นทุนจม
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ทำไมธุรกิจถึงต้องรู้ "จุดสั่งซื้อใหม่"?</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>ป้องกันของขาดมือ (Prevent Stockouts):</strong> หากสั่งช้าเกินไป ของล็อตเก่าหมดก่อนของใหม่จะมาถึง คุณจะเสียโอกาสในการขาย และเสียลูกค้าไปให้คู่แข่ง</li>
            <li><strong>ป้องกันสต็อกบวม (Avoid Overstocking):</strong> หากสั่งเร็วเกินไป หรือสั่งมาตุนไว้เยอะๆ โดยไม่จำเป็น คุณจะเสีย <strong>ค่าจัดเก็บคลังสินค้า</strong> เพิ่มขึ้น เงินทุนจม และสินค้าอาจเสื่อมสภาพ</li>
            <li><strong>ระบบทำงานอัตโนมัติ:</strong> เมื่อรู้ตัวเลข ROP ที่ชัดเจน คุณสามารถตั้งค่าในระบบซอฟต์แวร์จัดการคลังสินค้า (WMS/ERP) ให้แจ้งเตือนอัตโนมัติเมื่อสต็อกถึงจุดที่กำหนด ลดภาระการตรวจนับด้วยคน</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">สูตรการคำนวณ Reorder Point (ROP)</h3>
          <p className="text-slate-700 mb-4">
            การคำนวณ ROP มีสมการที่ตรงไปตรงมา โดยอาศัยตัวแปรหลัก 3 ตัว ได้แก่ ยอดขายเฉลี่ย ระยะเวลารอของ และสต็อกปลอดภัย
          </p>
          <div className="bg-violet-50 p-6 rounded-xl border border-violet-100 my-6">
            <p className="font-semibold text-lg text-violet-900 mb-2">สูตรคำนวณมาตรฐาน:</p>
            <p className="text-xl text-violet-800 font-mono bg-white p-3 rounded border border-violet-200 text-center">
              Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock
            </p>
          </div>
          
          <p className="text-slate-700">
            <strong>1. ยอดขายเฉลี่ยต่อวัน (Average Daily Usage):</strong> จำนวนชิ้นของสินค้าที่ขายออกไปในแต่ละวันโดยเฉลี่ย<br/>
            <strong>2. ระยะเวลารอสินค้า (Lead Time):</strong> นับตั้งแต่วันที่กดสั่งซื้อ, ซัพพลายเออร์ผลิต, ขนส่ง, ผ่านศุลกากร, จนถึงของมาวางบนชั้นพร้อมขาย (หน่วยเป็นวัน)<br/>
            <strong>3. สต็อกปลอดภัย (Safety Stock):</strong> จำนวนสินค้าที่กันไว้เผื่อฉุกเฉิน (หากไม่รู้ค่านี้ แนะนำให้ไปใช้เครื่องมือ <a href="/business/safety-stock-calculator" className="text-violet-600 hover:underline">คำนวณ Safety Stock</a> ก่อน)
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ตัวอย่างการประยุกต์ใช้งานจริง</h3>
          <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200">
            สมมติว่าคุณเป็นร้านขายกาแฟเมล็ดคั่ว:<br/>
            - แต่ละวันคุณใช้เมล็ดกาแฟเฉลี่ย <strong>20 ถุง</strong><br/>
            - กว่าโรงคั่วจะส่งกาแฟล็อตใหม่มาถึงร้าน ต้องใช้เวลา <strong>5 วัน</strong><br/>
            - คุณเผื่อเมล็ดกาแฟกันเหนียวไว้ (Safety Stock) <strong>30 ถุง</strong><br/><br/>
            <strong>วิธีคิด:</strong><br/>
            1. หา Lead Time Demand: 20 ถุง/วัน x 5 วัน = 100 ถุง (แปลว่าระหว่าง 5 วันที่รอของ คุณจะต้องใช้กาแฟแน่ๆ 100 ถุง)<br/>
            2. บวก Safety Stock: 100 + 30 = <strong>130 ถุง</strong><br/><br/>
            <strong>สรุป:</strong> จุด ROP ของคุณคือ <strong>130 ถุง</strong> หมายความว่า ทันทีที่เมล็ดกาแฟในสต็อกหลังร้านลดลงเหลือ 130 ถุง คุณต้องยกหูโทรสั่งโรงคั่วทันที! เมื่อผ่านไป 5 วัน กาแฟ 100 ถุงจะถูกใช้หมดไปพอดี และของล็อตใหม่ก็จะมาเติมสต็อกโดยที่คุณไม่ต้องไปแตะต้อง Safety Stock 30 ถุงนั้นเลย
          </p>
        </article>
      )}
    </div>
  );
}
