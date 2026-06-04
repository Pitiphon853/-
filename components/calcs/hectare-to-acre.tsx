import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowLeftRight, Info } from 'lucide-react';

export default function HectareToAcre({ lang }: { lang: 'TH' | 'EN' }) {
  const [inputValue, setInputValue] = useState<string>('');
  const [direction, setDirection] = useState<'h2a' | 'a2h'>('h2a');

  // 1 Hectare = 2.471053814671653 Acres
  const h2aRatio = 10000 / 4046.8564224;

  const calculate = (val: number) => {
    if (direction === 'h2a') {
      return val * h2aRatio;
    } else {
      return val / h2aRatio;
    }
  };

  const val = parseFloat(inputValue);
  const isValid = !isNaN(val) && val >= 0;
  const result = isValid ? calculate(val) : 0;

  const getLabel = (isInput: boolean) => {
    if (direction === 'h2a') {
      return isInput 
        ? (lang === 'TH' ? 'เฮกตาร์ (Hectare)' : 'Hectare')
        : (lang === 'TH' ? 'เอเคอร์ (Acre)' : 'Acre');
    } else {
      return isInput 
        ? (lang === 'TH' ? 'เอเคอร์ (Acre)' : 'Acre')
        : (lang === 'TH' ? 'เฮกตาร์ (Hectare)' : 'Hectare');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {lang === 'TH' ? 'แปลงเฮกตาร์เป็นเอเคอร์' : 'Hectare to Acre Converter'}
            </h1>
          </div>
          <button
            onClick={() => setDirection(d => d === 'h2a' ? 'a2h' : 'h2a')}
            className="flex items-center space-x-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors self-start sm:self-auto"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>{lang === 'TH' ? 'สลับหน่วย' : 'Swap Units'}</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {/* Input */}
          <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {lang === 'TH' ? 'ระบุพื้นที่' : 'Enter Area'} ({getLabel(true)})
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-4 text-xl bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-gray-800"
              placeholder="0.00"
            />
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center px-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <label className="block text-sm font-semibold text-blue-800 mb-2">
              {lang === 'TH' ? 'ผลลัพธ์' : 'Result'} ({getLabel(false)})
            </label>
            <div className="w-full px-4 py-4 text-2xl bg-white rounded-lg border border-blue-200 font-bold text-blue-700 overflow-x-auto whitespace-nowrap">
              {isValid ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0.000000'}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg flex items-start space-x-3 text-sm text-gray-600 border border-gray-100">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
          <div>
            <p><strong>{lang === 'TH' ? 'สูตรการคำนวณเบื้องต้น:' : 'Basic Formula:'}</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>1 Hectare (เฮกตาร์) ≈ 2.47105 Acres (เอเคอร์)</li>
              <li>1 Acre (เอเคอร์) ≈ 0.404686 Hectares (เฮกตาร์)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          เฮกตาร์ (Hectare) และ เอเคอร์ (Acre) คืออะไร? และวิธีการแปลงหน่วยทำได้อย่างไร
        </h2>
        
        <p>
          ในการวัดขนาดที่ดินและพื้นที่ขนาดใหญ่ มีหน่วยวัดที่เป็นมาตรฐานสากลและถูกใช้งานอย่างแพร่หลายทั่วโลกอยู่สองระบบหลักๆ ที่มักจะทำให้หลายคนสับสน นั่นคือ <strong>เฮกตาร์ (Hectare)</strong> และ <strong>เอเคอร์ (Acre)</strong> แม้ว่าทั้งคู่จะใช้สำหรับวัดที่ดินผืนใหญ่ทางการเกษตรหรือผืนป่าเหมือนกัน แต่มีที่มาและขนาดที่แตกต่างกันอย่างสิ้นเชิง การทำความเข้าใจและสามารถแปลงหน่วยระหว่าง เฮกตาร์ และ เอเคอร์ ได้นั้น จะเป็นประโยชน์อย่างมากในการอ่านเอกสารสากล ข้อมูลทางภูมิศาสตร์ หรือการวิเคราะห์ตลาดอสังหาริมทรัพย์ทั่วโลก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">มารู้จักกับ "เฮกตาร์" (Hectare)</h3>
        <p>
          <strong>เฮกตาร์ (Hectare)</strong> เป็นหน่วยวัดพื้นที่ใน <em>ระบบเมตริก (Metric System)</em> ซึ่งเป็นระบบการวัดที่เป็นมาตรฐานและใช้งานอย่างเป็นทางการในประเทศส่วนใหญ่ทั่วโลก (ยกเว้นสหรัฐอเมริกา และอีกไม่กี่ประเทศ) สัญลักษณ์ของเฮกตาร์คือ <strong>ha</strong>
        </p>
        <p>
          คำว่า เฮกตาร์ มาจากคำว่า <em>hecto-</em> ที่แปลว่า 100 และ <em>are</em> ที่เป็นหน่วยพื้นที่ดั้งเดิม โดย 1 เฮกตาร์ ถูกกำหนดให้มีพื้นที่เท่ากับ <strong>10,000 ตารางเมตร</strong> (หรือคิดง่ายๆ คือที่ดินรูปสี่เหลี่ยมจัตุรัสที่มีความกว้าง 100 เมตร และยาว 100 เมตร) เฮกตาร์เป็นหน่วยที่เหมาะมากสำหรับการบอกขนาดฟาร์ม สวนป่า หรือพื้นที่เมือง เพราะมีสัดส่วนที่เข้าใจง่ายและสอดคล้องกับหน่วยตารางกิโลเมตร (1 ตารางกิโลเมตร = 100 เฮกตาร์)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">มารู้จักกับ "เอเคอร์" (Acre)</h3>
        <p>
          <strong>เอเคอร์ (Acre)</strong> เป็นหน่วยวัดพื้นที่ใน <em>ระบบอังกฤษ (Imperial System)</em> และ <em>ระบบอเมริกัน (US Customary System)</em> แม้ว่าสหราชอาณาจักรจะเปลี่ยนไปใช้ระบบเมตริกเป็นส่วนใหญ่แล้ว แต่การซื้อขายที่ดินในสหรัฐอเมริกาและหลายประเทศที่เคยเป็นอาณานิคมของอังกฤษ ยังคงนิยมใช้เอเคอร์เป็นหน่วยมาตรฐาน สัญลักษณ์ของเอเคอร์คือ <strong>ac</strong>
        </p>
        <p>
          ในเชิงคณิตศาสตร์ 1 เอเคอร์ มีขนาดเท่ากับ <strong>43,560 ตารางฟุต</strong> หรือ 4,840 ตารางหลา หากแปลงเป็นระบบเมตริกจะเทียบเท่ากับ <strong>ประมาณ 4,046.86 ตารางเมตร</strong> ขนาดของมันเล็กกว่าครึ่งหนึ่งของเฮกตาร์เล็กน้อย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">อัตราการแปลงหน่วย เฮกตาร์ เป็น เอเคอร์</h3>
        <p>
          เพื่อให้ง่ายต่อการเปรียบเทียบและการแปลงหน่วย เราสามารถใช้หลักการคำนวณพื้นฐานดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>1 เฮกตาร์ (Hectare)</strong> = 10,000 ตารางเมตร</li>
          <li><strong>1 เอเคอร์ (Acre)</strong> = 4,046.8564 ตารางเมตร</li>
        </ul>
        <p>
          เมื่อนำพื้นที่ของเฮกตาร์มาหารด้วยพื้นที่ของเอเคอร์ (10,000 ÷ 4,046.8564) เราจะได้ความสัมพันธ์ว่า:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg font-bold text-lg text-blue-900 text-center">
          1 เฮกตาร์ (Hectare) ≈ 2.47105 เอเคอร์ (Acre)
        </blockquote>
        <p>
          และในทางกลับกัน หากต้องการแปลงจากเอเคอร์กลับเป็นเฮกตาร์:
        </p>
        <blockquote className="bg-gray-50 border-l-4 border-gray-400 p-4 my-4 rounded-r-lg font-bold text-lg text-gray-700 text-center">
          1 เอเคอร์ (Acre) ≈ 0.404686 เฮกตาร์ (Hectare)
        </blockquote>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการใช้งานและการคำนวณ</h3>
        <p>
          สมมติว่าคุณอ่านข่าวสารทางเศรษฐกิจพบว่า "เกิดไฟป่าครอบคลุมพื้นที่กว่า 5,000 เฮกตาร์ในออสเตรเลีย" และคุณต้องการทราบว่าพื้นที่นี้ใหญ่แค่ไหนในหน่วยเอเคอร์แบบที่คนอเมริกันเข้าใจ
        </p>
        <p>
          <strong>วิธีคำนวณ:</strong> นำจำนวนเฮกตาร์มาคูณด้วย 2.47105<br/>
          <code>5,000 ha × 2.47105 = 12,355.25 ac</code><br/>
          คำตอบคือ พื้นที่ไฟป่ากินอาณาบริเวณกว้างถึง 12,355 เอเคอร์
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุปความสำคัญ</h3>
        <p>
          การทราบอัตราแลกเปลี่ยนระหว่างสองหน่วยนี้มีความสำคัญสำหรับผู้ที่ทำงานในแวดวงเกษตรกรรมระหว่างประเทศ นักวิจัยที่ต้องวิเคราะห์ข้อมูลจากหลากหลายแหล่งที่มา รวมไปถึงนักลงทุนอสังหาริมทรัพย์ที่กำลังมองหาโอกาสในต่างประเทศ ด้วยเครื่องมือคำนวณแปลงหน่วย เฮกตาร์ เป็น เอเคอร์ (หรือสลับกัน) ที่เราจัดเตรียมไว้ให้นี้ คุณจะสามารถประมวลผลข้อมูลตัวเลขได้อย่างรวดเร็ว ถูกต้อง และแม่นยำ ไม่ต้องเสียเวลากดเครื่องคิดเลขหลายขั้นตอนอีกต่อไป
        </p>
      </article>
    </div>
  );
}
