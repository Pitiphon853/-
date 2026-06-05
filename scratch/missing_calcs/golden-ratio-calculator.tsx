import React, { useState, useEffect } from 'react';
import { DivideCircle } from 'lucide-react';

export default function GoldenRatioCalculator({ lang }: any) {
  const [total, setTotal] = useState<string>('');
  const [partA, setPartA] = useState<string>(''); // larger
  const [partB, setPartB] = useState<string>(''); // smaller
  const [activeInput, setActiveInput] = useState<'total' | 'a' | 'b'>('total');

  const PHI = 1.61803398875;

  const handleTotalChange = (val: string) => {
    setTotal(val);
    setActiveInput('total');
    const t = parseFloat(val);
    if (!isNaN(t) && t > 0) {
      const a = t / PHI;
      const b = t - a;
      setPartA(a.toFixed(4));
      setPartB(b.toFixed(4));
    } else {
      setPartA('');
      setPartB('');
    }
  };

  const handlePartAChange = (val: string) => {
    setPartA(val);
    setActiveInput('a');
    const a = parseFloat(val);
    if (!isNaN(a) && a > 0) {
      const b = a / PHI;
      const t = a + b;
      setTotal(t.toFixed(4));
      setPartB(b.toFixed(4));
    } else {
      setTotal('');
      setPartB('');
    }
  };

  const handlePartBChange = (val: string) => {
    setPartB(val);
    setActiveInput('b');
    const b = parseFloat(val);
    if (!isNaN(b) && b > 0) {
      const a = b * PHI;
      const t = a + b;
      setTotal(t.toFixed(4));
      setPartA(a.toFixed(4));
    } else {
      setTotal('');
      setPartA('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <DivideCircle className="w-8 h-8 text-yellow-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณสัดส่วนทองคำ (Golden Ratio)</h1>
      </div>

      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
        <p className="text-gray-600 mb-6 text-sm">
          กรอกค่าใดค่าหนึ่งเพื่อคำนวณหาสัดส่วนอื่นๆ โดยอัตโนมัติตามหลักสัดส่วนทองคำ (อัตราส่วน 1 : 1.618)
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ความยาวทั้งหมด (Total: A + B)</label>
            <input
              type="number"
              step="any"
              value={total}
              onChange={(e) => handleTotalChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 transition-colors ${activeInput === 'total' ? 'bg-white border-yellow-400' : 'bg-gray-50'}`}
              placeholder="ความยาวรวม..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ส่วนที่ใหญ่กว่า (Part A)</label>
              <input
                type="number"
                step="any"
                value={partA}
                onChange={(e) => handlePartAChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 transition-colors ${activeInput === 'a' ? 'bg-white border-yellow-400' : 'bg-gray-50'}`}
                placeholder="ส่วนที่ยาวกว่า..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ส่วนที่เล็กกว่า (Part B)</label>
              <input
                type="number"
                step="any"
                value={partB}
                onChange={(e) => handlePartBChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 transition-colors ${activeInput === 'b' ? 'bg-white border-yellow-400' : 'bg-gray-50'}`}
                placeholder="ส่วนที่สั้นกว่า..."
              />
            </div>
          </div>
        </div>

        {/* Visualization Bar */}
        <div className="mt-8">
           <p className="text-xs text-gray-500 mb-2 font-medium">ภาพจำลองสัดส่วน (Visualization)</p>
           <div className="w-full h-12 flex rounded-lg overflow-hidden border border-gray-300">
             <div 
               className="bg-yellow-400 h-full flex items-center justify-center text-yellow-900 font-bold text-sm transition-all duration-300"
               style={{ width: `${(1 / PHI) * 100}%` }}
             >
                Part A (61.8%)
             </div>
             <div 
               className="bg-yellow-200 h-full flex items-center justify-center text-yellow-800 font-bold text-sm transition-all duration-300"
               style={{ width: `${(1 - 1/PHI) * 100}%` }}
             >
                Part B (38.2%)
             </div>
           </div>
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">อัตราส่วนทองคำ (Golden Ratio) คืออะไร?</h2>
        <p>
          <strong>อัตราส่วนทองคำ (Golden Ratio)</strong> ซึ่งมักจะแทนด้วยตัวอักษรกรีก ฟาย (Phi, <strong>Φ</strong> หรือ <strong>φ</strong>) คือค่าคงที่ทางคณิตศาสตร์ที่มีค่าประมาณ <strong>1.6180339887...</strong> เป็นสัดส่วนที่ได้รับการยกย่องมาตั้งแต่สมัยโบราณกาลว่าเป็น "สัดส่วนที่สมบูรณ์แบบที่สุด" และให้ความรู้สึกงดงาม สบายตาที่สุดเมื่อมนุษย์มองเห็น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามทางคณิตศาสตร์ของอัตราส่วนทองคำ</h3>
        <p>
          ในทางคณิตศาสตร์ อัตราส่วนทองคำจะเกิดขึ้นเมื่อเราแบ่งเส้นตรงออกเป็นสองส่วน คือ <strong>ส่วนยาว (A)</strong> และ <strong>ส่วนสั้น (B)</strong> โดยมีเงื่อนไขว่า:
        </p>
        <p className="italic font-medium text-center bg-gray-50 p-4 rounded-lg my-4">
          "อัตราส่วนของความยาวทั้งหมด (A + B) ต่อส่วนยาว (A) ต้องเท่ากับ อัตราส่วนของส่วนยาว (A) ต่อส่วนสั้น (B)"
        </p>
        <p>
          สามารถเขียนเป็นสมการได้ว่า: <strong>(A + B) / A = A / B = Φ (ประมาณ 1.618)</strong>
        </p>
        <p>
          เมื่อเราแก้สมการหาค่า Φ จะได้รากที่เป็นบวกของสมการกำลังสอง x² - x - 1 = 0 ซึ่งก็คือ (1 + √5) / 2 ทำให้ได้ค่า Φ = 1.61803... นั่นเอง นอกจากนี้ยังมีความเชื่อมโยงอย่างลึกซึ้งกับ<strong>ลำดับฟีโบนัชชี (Fibonacci Sequence)</strong> โดยเมื่อนำตัวเลขฟีโบนัชชีตัวที่ติดกันมาหารกัน (เช่น 13/8, 21/13, 34/21) ยิ่งค่ามากเท่าใด ผลหารจะยิ่งเข้าใกล้ค่า 1.618 มากขึ้นเท่านั้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การปรากฏอยู่ในธรรมชาติและงานศิลปะ</h3>
        <p>
          สัดส่วนนี้ไม่ได้เป็นเพียงแค่ตัวเลขบนหน้ากระดาษ แต่ถูกพบอย่างน่าอัศจรรย์ในธรรมชาติรอบตัวเรา เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ธรรมชาติวิทยา:</strong> การจัดเรียงเกสรของดอกทานตะวัน, เปลือกหอยงวงช้าง (Nautilus) ที่ม้วนตัวเป็นเกลียวลอการิทึม, ลวดลายบนลูกสน, หรือแม้แต่สัดส่วนบางอย่างในร่างกายมนุษย์</li>
          <li><strong>สถาปัตยกรรมระดับโลก:</strong> วิหารพาร์เธนอนที่กรุงเอเธนส์, พีระมิดกีซาในอียิปต์, ไปจนถึงสถาปัตยกรรมสมัยใหม่ ล้วนมีการซ่อนสัดส่วน 1:1.618 ไว้ในการออกแบบ</li>
          <li><strong>ศิลปะภาพวาด:</strong> ภาพ "โมนาลิซา" หรือ "The Sacrament of the Last Supper" ของ ดาลี (Salvador Dalí) ศิลปินเอกระดับโลกมักจัดองค์ประกอบภาพให้อยู่ในตารางของสี่เหลี่ยมผืนผ้าทองคำ (Golden Rectangle)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ในงานออกแบบปัจจุบัน (UI/UX, Graphic Design)</h3>
        <p>
          ปัจจุบัน นักออกแบบกราฟิก (Graphic Designer) ดีไซเนอร์ (UI/UX) และช่างภาพ มักจะนำเครื่องมือ <strong>Golden Ratio Calculator</strong> มาช่วยในการแบ่งสัดส่วนเลย์เอาต์หน้าเว็บไซต์ การออกแบบโลโก้ การครอบตัดรูปภาพ (Cropping) หรือการจัดวางฟอนต์ ให้ดูลงตัวและมีจุดดึงดูดสายตาอย่างเป็นธรรมชาติ
        </p>
        <p>
          เช่น หากมีหน้าจอกว้าง 1000px และต้องการแบ่งส่วนเมนูด้านซ้ายและเนื้อหาหลัก การใช้สัดส่วนทองคำจะแบ่งได้เป็น ส่วนเนื้อหา (Part A) = 618px และส่วนเมนู (Part B) = 382px ซึ่งจะสร้างความสมดุลและความสวยงามได้อย่างลงตัว โปรแกรมคำนวณนี้จึงเป็นผู้ช่วยคนสำคัญของนักออกแบบเพื่อหาตัวเลขที่แม่นยำภายในเสี้ยววินาที
        </p>
      </article>
    </div>
  );
}
