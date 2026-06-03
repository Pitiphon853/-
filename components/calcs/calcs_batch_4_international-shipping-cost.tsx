import React, { useState } from 'react';
import { Ship, Info, ArrowRight, Anchor, Truck, Package } from 'lucide-react';

export default function InternationalShippingCost({ lang }: any) {
  const [inputs, setInputs] = useState({
    productCost: 100000,
    originInland: 5000,
    originCustoms: 2000,
    mainFreight: 20000,
    insurance: 1500,
    destCustoms: 2500,
    destInland: 6000,
    importDutyRate: 5,
    vatRate: 7
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  // EXW = Product Cost
  const exwCost = inputs.productCost;

  // FOB = EXW + Origin Inland + Origin Customs
  const fobCost = exwCost + inputs.originInland + inputs.originCustoms;

  // CIF = FOB + Main Freight + Insurance
  const cifCost = fobCost + inputs.mainFreight + inputs.insurance;

  // Duty and VAT calculation (typically based on CIF)
  const dutyCost = cifCost * (inputs.importDutyRate / 100);
  const vatCost = (cifCost + dutyCost) * (inputs.vatRate / 100);

  // DDP = CIF + Duty + Dest Customs + Dest Inland (excluding VAT, or including VAT depending on agreement, usually DDP includes duty, sometimes VAT. Here we show total landed cost including VAT for importer)
  const totalLandedCost = cifCost + dutyCost + vatCost + inputs.destCustoms + inputs.destInland;

  const formatNumber = (num: number) => num.toLocaleString('th-TH', { maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Ship className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">เครื่องมือคำนวณต้นทุนนำเข้า/ส่งออก (EXW/FOB/CIF)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-slate-500" /> ต้นทุนสินค้าและประเทศต้นทาง
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าสินค้า (Product Cost)</label>
                  <input type="number" name="productCost" value={inputs.productCost} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าขนส่งในประเทศต้นทาง (Origin Inland Freight)</label>
                  <input type="number" name="originInland" value={inputs.originInland} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าพิธีการศุลกากรต้นทาง (Origin Customs Clearance)</label>
                  <input type="number" name="originCustoms" value={inputs.originCustoms} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Anchor className="w-5 h-5 text-slate-500" /> การขนส่งระหว่างประเทศ
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าขนส่งทางเรือ/อากาศ (Main Freight)</label>
                  <input type="number" name="mainFreight" value={inputs.mainFreight} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าประกันภัย (Insurance)</label>
                  <input type="number" name="insurance" value={inputs.insurance} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-500" /> ประเทศปลายทาง
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ภาษีนำเข้า (%)</label>
                  <input type="number" name="importDutyRate" value={inputs.importDutyRate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ภาษีมูลค่าเพิ่ม (%)</label>
                  <input type="number" name="vatRate" value={inputs.vatRate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าพิธีการศุลกากรปลายทาง</label>
                  <input type="number" name="destCustoms" value={inputs.destCustoms} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ค่าขนส่งในประเทศปลายทาง</label>
                  <input type="number" name="destInland" value={inputs.destInland} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">สรุปต้นทุนตาม Incoterms</h3>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700">EXW (Ex Works)</span>
                <span className="text-lg font-bold text-slate-800">{formatNumber(exwCost)}</span>
              </div>
              <p className="text-xs text-slate-500">ต้นทุนเฉพาะค่าสินค้า ณ หน้าโรงงานผู้ขาย</p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowRight className="w-5 h-5 transform rotate-90 md:rotate-0" />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-blue-800">FOB (Free on Board)</span>
                <span className="text-lg font-bold text-blue-800">{formatNumber(fobCost)}</span>
              </div>
              <p className="text-xs text-blue-600">EXW + ค่าขนส่งและศุลกากรฝั่งขาออก</p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowRight className="w-5 h-5 transform rotate-90 md:rotate-0" />
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-indigo-800">CIF (Cost, Insurance & Freight)</span>
                <span className="text-lg font-bold text-indigo-800">{formatNumber(cifCost)}</span>
              </div>
              <p className="text-xs text-indigo-600">FOB + ค่าระวางเรือ/เครื่องบิน + ค่าประกันภัย</p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowRight className="w-5 h-5 transform rotate-90 md:rotate-0" />
            </div>

            <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-green-900">Total Landed Cost</span>
                <span className="text-2xl font-bold text-green-700">{formatNumber(totalLandedCost)}</span>
              </div>
              <p className="text-sm text-green-700 mb-3">ต้นทุนรวมทั้งหมดจนถึงคลังสินค้าผู้ซื้อ (Landed Cost)</p>
              
              <div className="border-t border-green-200 pt-3 mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">อากรขาเข้า (Duty)</span>
                  <span className="font-medium">{formatNumber(dutyCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">ภาษีมูลค่าเพิ่ม (VAT)</span>
                  <span className="font-medium">{formatNumber(vatCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">ค่าศุลกากรและขนส่งปลายทาง</span>
                  <span className="font-medium">{formatNumber(inputs.destCustoms + inputs.destInland)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Incoterms คืออะไร? ทำความเข้าใจ EXW, FOB, CIF สำหรับการนำเข้าและส่งออก</h2>
        
        <p>ในการค้าระหว่างประเทศ การตกลงเรื่องความรับผิดชอบ ค่าใช้จ่าย และความเสี่ยงระหว่างผู้ซื้อและผู้ขายเป็นเรื่องสำคัญยิ่ง หอการค้านานาชาติ (ICC) จึงได้กำหนดมาตรฐานที่เรียกว่า <strong>Incoterms (International Commercial Terms)</strong> ขึ้นมา เพื่อเป็นข้อตกลงสากลที่ใช้กันทั่วโลก Incoterms ฉบับล่าสุดคือปี 2020</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">คำศัพท์พื้นฐาน Incoterms ที่พบบ่อย (EXW, FOB, CIF)</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-slate-800">1. EXW (Ex Works)</h4>
            <p><strong>ความหมาย:</strong> ผู้ขายรับผิดชอบเพียงแค่เตรียมสินค้าให้พร้อมส่งมอบ ณ สถานที่ของผู้ขาย (เช่น หน้าโรงงานหรือโกดังของผู้ขาย) ผู้ซื้อต้องรับผิดชอบค่าใช้จ่ายและความเสี่ยงทั้งหมดหลังจากนั้น ตั้งแต่การยกสินค้าขึ้นรถ ค่าขนส่งในประเทศต้นทาง ค่าพิธีการศุลกากรขาออก ค่าระวางเรือ จนถึงปลายทาง</p>
            <p className="text-sm text-slate-600 mt-1"><em>เหมาะสำหรับ:</em> ผู้ซื้อที่มีความเชี่ยวชาญด้านโลจิสติกส์ในประเทศต้นทาง และสามารถจัดการขนส่งได้เองด้วยต้นทุนที่ต่ำกว่า</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-blue-800">2. FOB (Free on Board)</h4>
            <p><strong>ความหมาย:</strong> ผู้ขายรับผิดชอบค่าใช้จ่ายและความเสี่ยงจนกระทั่งสินค้าถูกโหลดขึ้นเรือ ณ ท่าเรือต้นทางที่ระบุไว้ ผู้ขายต้องเป็นผู้ทำพิธีการศุลกากรขาออกให้เรียบร้อย หลังจากสินค้าวางบนเรือแล้ว ความเสี่ยงและค่าใช้จ่าย (ค่าระวางเรือ, ประกันภัย, ค่าใช้จ่ายปลายทาง) จะตกเป็นของผู้ซื้อ</p>
            <p className="text-sm text-slate-600 mt-1"><em>ข้อควรรู้:</em> FOB ใช้สำหรับการขนส่งทางทะเลหรือทางน้ำภายในประเทศเท่านั้น ไม่ครอบคลุมการขนส่งทางอากาศ (ควรใช้ FCA แทน)</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-indigo-800">3. CIF (Cost, Insurance, and Freight)</h4>
            <p><strong>ความหมาย:</strong> ผู้ขายรับผิดชอบค่าใช้จ่ายทั้งหมดจนถึงท่าเรือปลายทางที่ระบุ รวมถึงค่าระวางเรือและค่าประกันภัยสินค้า (ขั้นต่ำ) แต่ <strong>ความเสี่ยง</strong> โอนไปยังผู้ซื้อตั้งแต่สินค้าถูกโหลดขึ้นเรือที่ต้นทางแล้ว หมายความว่าหากสินค้าเสียหายระหว่างทาง ผู้ซื้อจะต้องไปเคลมประกันเอง</p>
            <p className="text-sm text-slate-600 mt-1"><em>ข้อควรรู้:</em> เช่นเดียวกับ FOB เงื่อนไข CIF ใช้กับการขนส่งทางน้ำเท่านั้น หากเป็นทางอากาศหรือขนส่งหลายรูปแบบรวมกันจะใช้ CIP แทน</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Landed Cost หรือต้นทุนรวมจนถึงคลังสินค้า</h3>
        <p>เวลาคำนวณต้นทุนสินค้านำเข้า ผู้ประกอบการมักจะไม่ได้ดูแค่ราคา FOB หรือ CIF แต่จะดูที่ <strong>Landed Cost (ต้นทุนสินค้าส่งถึงมือ)</strong> ซึ่งจะรวมถึง:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าสินค้าเบื้องต้น (Product Cost)</strong></li>
          <li><strong>ค่าขนส่งระหว่างประเทศและประกันภัย (Freight & Insurance)</strong></li>
          <li><strong>อากรขาเข้า (Import Duty):</strong> คำนวณจากฐานราคา CIF (ราคาของ + ค่าขนส่ง + ค่าประกันภัย) x อัตราอากรของสินค้านั้นๆ (HS Code)</li>
          <li><strong>ภาษีมูลค่าเพิ่ม (VAT):</strong> สำหรับประเทศไทยอยู่ที่ 7% โดยฐานในการคำนวณ VAT คือ (CIF + อากรขาเข้า + ภาษีสรรพสามิตถ้ามี) x 7%</li>
          <li><strong>ค่าพิธีการและค่าธรรมเนียมปลายทาง:</strong> เช่น ค่าบริการชิปปิ้ง ค่าธรรมเนียมท่าเรือ (THC) และค่ารถบรรทุกจากท่าเรือมายังโกดังของผู้ซื้อ</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมการเลือก Incoterms ถึงสำคัญ?</h3>
        <p>การเลือก Incoterms ที่เหมาะสมมีผลโดยตรงต่อต้นทุนแฝงและการบริหารความเสี่ยง หากคุณเป็นผู้นำเข้ามือใหม่ การตกลงซื้อแบบ CIF หรือ DAP/DDP อาจจะสะดวกกว่าเพราะไม่ต้องจัดการโลจิสติกส์มากนัก แต่ผู้ขายมักจะบวกกำไร (Markup) ลงไปในค่าขนส่งทำให้ต้นทุนสินค้ารวมสูงขึ้น</p>
        <p>ในทางกลับกัน หากซื้อแบบ EXW หรือ FOB คุณอาจได้ราคาของที่ถูกกว่า และสามารถหา Freight Forwarder ที่ให้เรทค่าระวางเรือที่ดีกว่ามาจัดการแทนได้ แต่คุณก็ต้องรับภาระและความเสี่ยงในการติดต่อประสานงานที่มากขึ้น</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
          <p className="flex items-start gap-2 text-blue-800">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span><strong>ข้อแนะนำ:</strong> ควรขอใบเสนอราคาทั้งแบบ EXW, FOB และ CIF จากผู้ขาย จากนั้นนำมาเทียบกับค่าขนส่งจาก Forwarder ของคุณเอง เพื่อหาทางเลือกที่ประหยัดและคุ้มค่าที่สุด</span>
          </p>
        </div>
      </article>
    </div>
  );
}
