import React, { useState } from 'react';
import { Warehouse, Calculator, DollarSign, PackageOpen, Settings, Info } from 'lucide-react';

export default function WarehousingCost({ lang }: any) {
  const isTH = lang === 'TH';

  const [pallets, setPallets] = useState<number | ''>('');
  const [costPerPallet, setCostPerPallet] = useState<number | ''>('');
  const [inboundCost, setInboundCost] = useState<number | ''>('');
  const [outboundCost, setOutboundCost] = useState<number | ''>('');
  const [otherCosts, setOtherCosts] = useState<number | ''>('');
  
  // Volume variables
  const [inboundVolume, setInboundVolume] = useState<number | ''>('');
  const [outboundVolume, setOutboundVolume] = useState<number | ''>('');

  const calculate = () => {
    const p = Number(pallets) || 0;
    const storageRate = Number(costPerPallet) || 0;
    const inRate = Number(inboundCost) || 0;
    const outRate = Number(outboundCost) || 0;
    const others = Number(otherCosts) || 0;
    const inVol = Number(inboundVolume) || 0;
    const outVol = Number(outboundVolume) || 0;

    const totalStorage = p * storageRate;
    const totalInbound = inVol * inRate;
    const totalOutbound = outVol * outRate;
    const totalHandling = totalInbound + totalOutbound;

    const totalCost = totalStorage + totalHandling + others;

    return {
      totalStorage: totalStorage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalHandling: totalHandling.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalCost: totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-emerald-600 p-6 text-white flex items-center gap-3">
          <Warehouse className="w-8 h-8" />
          <h2 className="text-2xl font-bold">
            {isTH ? 'เครื่องมือคำนวณค่าจัดเก็บในคลังสินค้า' : 'Warehousing Cost Calculator'}
          </h2>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <PackageOpen className="w-5 h-5 text-emerald-500" />
                {isTH ? 'ข้อมูลการจัดเก็บสินค้า (Storage)' : 'Storage Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'จำนวนพาเลท / หน่วย (ชิ้น)' : 'Number of Pallets / Units'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={pallets}
                    onChange={(e) => setPallets(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'ค่าเช่าพื้นที่ต่อพาเลท (ต่อเดือน)' : 'Cost per Pallet (Monthly)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={costPerPallet}
                    onChange={(e) => setCostPerPallet(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" />
                {isTH ? 'ค่าดำเนินการรับเข้า - จ่ายออก (Handling)' : 'Handling Costs'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'จำนวนสินค้ารับเข้า (พาเลท)' : 'Inbound Volume (Pallets)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={inboundVolume}
                    onChange={(e) => setInboundVolume(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none mb-3"
                    placeholder="0"
                  />
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'ค่าแรงรับเข้า (ต่อพาเลท)' : 'Inbound Cost per Pallet'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={inboundCost}
                    onChange={(e) => setInboundCost(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'จำนวนสินค้าจ่ายออก (พาเลท)' : 'Outbound Volume (Pallets)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={outboundVolume}
                    onChange={(e) => setOutboundVolume(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none mb-3"
                    placeholder="0"
                  />
                  <label className="block text-sm text-slate-600 mb-1">
                    {isTH ? 'ค่าแรงจ่ายออก (ต่อพาเลท)' : 'Outbound Cost per Pallet'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={outboundCost}
                    onChange={(e) => setOutboundCost(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                {isTH ? 'ค่าใช้จ่ายอื่นๆ ต่อเดือน' : 'Other Monthly Costs'}
              </h3>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  {isTH ? 'เช่น ค่าประกัน, ค่าไฟ, ค่าระบบ WMS (รวม)' : 'e.g. Insurance, Electricity, WMS Software'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 sticky top-6">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 text-center">
                {isTH ? 'สรุปค่าใช้จ่ายคลังสินค้า' : 'Cost Summary'}
              </h3>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>{isTH ? 'ค่าเช่าพื้นที่ (Storage)' : 'Total Storage'}</span>
                    <span>{results.totalStorage}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>{isTH ? 'ค่าแรงและบริการ (Handling)' : 'Total Handling'}</span>
                    <span>{results.totalHandling}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>{isTH ? 'ค่าใช้จ่ายอื่นๆ (Others)' : 'Other Costs'}</span>
                    <span>{(Number(otherCosts) || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 text-center shadow-sm">
                <p className="text-emerald-700 font-medium mb-1">
                  {isTH ? 'ต้นทุนรวมสุทธิ (Total Cost)' : 'Total Monthly Cost'}
                </p>
                <div className="text-3xl font-bold text-emerald-600 break-all">
                  {results.totalCost}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {isTH ? '* หน่วยเป็นสกุลเงินที่คุณใช้งาน' : '* In your local currency'}
                </p>
              </div>
              
              <div className="mt-4 bg-emerald-100/50 p-3 rounded-lg text-xs text-emerald-700 flex gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <p>{isTH ? 'ตัวเลขนี้เป็นการประมาณการเบื้องต้น อาจมีภาษีหรือค่าบริการแอบแฝงอื่นๆ ขึ้นอยู่กับสัญญาของแต่ละคลังสินค้า' : 'This is an estimate. Actual costs may vary based on specific warehouse contracts and taxes.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-slate max-w-none mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-b pb-4">Warehousing Cost (ค่าจัดเก็บในคลังสินค้า) คืออะไร? และสำคัญอย่างไรต่อธุรกิจ</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>ต้นทุนคลังสินค้า (Warehousing Cost)</strong> คือค่าใช้จ่ายทั้งหมดที่เกิดขึ้นจากกระบวนการจัดเก็บ ดูแล และบริหารจัดการสินค้าคงคลัง (Inventory) ให้อยู่ในสภาพพร้อมขายหรือพร้อมใช้งาน ไม่ว่าคุณจะมีคลังสินค้าเป็นของตนเอง หรือใช้บริการเช่าพื้นที่คลังสินค้าภายนอก (Third-Party Logistics - 3PL / Fulfillment) การคำนวณและควบคุมต้นทุนส่วนนี้อย่างแม่นยำถือเป็นหัวใจสำคัญที่จะช่วยรักษาอัตรากำไรของธุรกิจคุณไว้ได้
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">โครงสร้างของค่าใช้จ่ายคลังสินค้าประกอบด้วยอะไรบ้าง?</h3>
          <p className="text-slate-700">
            เพื่อให้การคำนวณมีความถูกต้องสมบูรณ์ เราจำเป็นต้องทำความเข้าใจโครงสร้างหลักของค่าใช้จ่ายในคลังสินค้า ซึ่งมักจะแบ่งออกเป็น 3 ส่วนหลัก ได้แก่:
          </p>
          
          <div className="space-y-4 mt-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg text-emerald-700 mb-2">1. ค่าเช่าพื้นที่จัดเก็บ (Storage Costs)</h4>
              <p className="text-slate-700 text-sm md:text-base">
                คือค่าบริการพื้นฐานสำหรับการใช้พื้นที่ในคลังสินค้า มักจะคิดราคาตามหน่วยปริมาตร เช่น <strong>ต่อตารางเมตร (sqm)</strong>, <strong>ต่อลูกบาศก์เมตร (CBM)</strong> หรือที่นิยมมากที่สุดในระบบคลังสินค้าสมัยใหม่คือ <strong>คิดราคาต่อพาเลท (Per Pallet)</strong> การคิดราคาอาจเป็นรายวัน หรือรายเดือน ขึ้นอยู่กับเงื่อนไขที่ตกลงกัน
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg text-emerald-700 mb-2">2. ค่าดำเนินการรับ-จ่ายสินค้า (Handling Costs)</h4>
              <p className="text-slate-700 text-sm md:text-base">
                หรือที่มักเรียกกันว่าค่า In/Out เป็นค่าแรงงานและค่าเครื่องจักร (เช่น รถโฟล์คลิฟท์) ในการเคลื่อนย้ายสินค้า แบ่งเป็นสองขาคือ <br/>
                - <strong>Handling In:</strong> ค่าเอาของลงจากรถบรรทุก ตรวจนับ และยกขึ้นชั้นวาง (Racking) <br/>
                - <strong>Handling Out:</strong> ค่าไปหยิบของจากชั้นวาง (Picking) แพ็ค และนำไปโหลดขึ้นรถเพื่อจัดส่ง
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg text-emerald-700 mb-2">3. ค่าบริหารจัดการและอื่นๆ (Administrative & Other Costs)</h4>
              <p className="text-slate-700 text-sm md:text-base">
                รวมถึงค่าซอฟต์แวร์ระบบจัดการคลังสินค้า (WMS), ค่าประกันภัยสินค้าขโมยหรือไฟไหม้, ค่าสาธารณูปโภค (น้ำ ไฟ อินเทอร์เน็ต), ค่ารักษาความปลอดภัย และค่าอุปกรณ์แพ็คเกจจิ้งต่างๆ 
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">ทำไมคุณจึงควรคำนวณ Warehousing Cost ล่วงหน้า?</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>เพื่อตั้งราคาสินค้าได้อย่างถูกต้อง:</strong> หากคุณไม่รู้ต้นทุนคลังสินค้า คุณอาจตั้งราคาขายต่ำเกินไปจนเมื่อหักค่าส่งและค่าแพ็คแล้วแทบไม่เหลือกำไร</li>
            <li><strong>ช่วยในการตัดสินใจเช่าหรือสร้าง:</strong> ตัวเลขนี้ช่วยให้คุณเปรียบเทียบได้ว่า เมื่อยอดขายถึงจุดใด การสร้างคลังสินค้าเองจึงจะคุ้มค่ากว่าการจ้าง 3PL</li>
            <li><strong>วิเคราะห์สินค้าค้างสต็อก (Dead Stock):</strong> สินค้าที่ขายไม่ออก จะกินพื้นที่และสร้างค่า Storage Cost ทุกๆ เดือน การคำนวณต้นทุนสะสมจะช่วยเตือนให้คุณรีบจัดโปรโมชั่นล้างสต็อกก่อนที่ทุนจะจมหายไป</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">เทคนิคการลดต้นทุนคลังสินค้า</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            นอกจากการต่อรองราคากับผู้ให้บริการคลังสินค้าแล้ว การลดต้นทุนที่ดีที่สุดคือการทำ <strong>Inventory Optimization</strong> เช่น การใช้เครื่องมือคำนวณ <a href="/business/reorder-point-calculator" className="text-emerald-600 hover:underline">Reorder Point</a> และ <a href="/business/safety-stock-calculator" className="text-emerald-600 hover:underline">Safety Stock</a> เพื่อให้มีของในคลังในปริมาณที่ "พอดี" ไม่มากเกินไปจนเสียค่าเช่าที่แพง และไม่น้อยเกินไปจนเสียโอกาสในการขาย รวมไปถึงการจัดระเบียบสินค้าในคลังให้เป็นหมวดหมู่ (ABC Analysis) เพื่อลดเวลาและค่าใช้จ่ายในการทำ Handling Out
          </p>
        </article>
      )}
    </div>
  );
}
