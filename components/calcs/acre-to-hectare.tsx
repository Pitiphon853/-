'use client'

import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowDown } from 'lucide-react';

export default function AcreToHectare({ lang }: { lang: 'TH' | 'EN' }) {
  const [val, setVal] = useState<string>('');

  const num = parseFloat(val);
  // 1 acre = 0.404685642 hectares
  const result = isNaN(num) ? null : num * 0.404685642;

  const t = {
    title: lang === 'TH' ? 'แปลงเอเคอร์เป็นเฮกตาร์' : 'Acre to Hectare Converter',
    input: lang === 'TH' ? 'เอเคอร์ (acres)' : 'Acres (ac)',
    output: lang === 'TH' ? 'เฮกตาร์ (hectares)' : 'Hectares (ha)',
    placeholder: lang === 'TH' ? 'ระบุค่า...' : 'Enter value...',
    resultLabel: lang === 'TH' ? 'ผลลัพธ์:' : 'Result:'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 flex flex-col">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          {t.title}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.input}</label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
            />
          </div>
          
          <div className="hidden md:flex justify-center w-full md:w-1/5">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
          <div className="md:hidden flex justify-center w-full my-2">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>

          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.output}</label>
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-semibold min-h-[52px] flex items-center text-lg overflow-x-auto">
              {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '-'}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex-grow">
        <h2>เจาะลึกการแปลงหน่วยพื้นที่: เอเคอร์ (Acres) สู่ เฮกตาร์ (Hectares)</h2>
        <p>
          ในวงการเกษตรกรรม การป่าไม้ และการจัดการที่ดินขนาดใหญ่ทั่วโลก เรามักจะพบเห็นหน่วยวัดพื้นที่อยู่ 2 หน่วยหลักที่มีความสำคัญอย่างมาก นั่นก็คือ <strong>"เอเคอร์" (Acre)</strong> และ <strong>"เฮกตาร์" (Hectare)</strong> 
          เนื่องจากทั้งสองหน่วยนี้ใช้ในการระบุพื้นที่ของฟาร์ม ผืนป่า หรืออุทยานแห่งชาติ จึงหลีกเลี่ยงไม่ได้ที่เกษตรกร นักวิจัย นักอนุรักษ์ธรรมชาติ และผู้ลงทุนในที่ดิน 
          จะต้องมีความรู้และทักษะในการแปลงค่าไปมาระหว่างสองหน่วยนี้
        </p>
        <p>
          บทความนี้จะพาทุกท่านไปทำความรู้จักกับทั้งเอเคอร์และเฮกตาร์ พร้อมแนะนำสูตรและวิธีการคำนวณเพื่อให้ได้ผลลัพธ์ที่แม่นยำ 
          รวมถึงอธิบายว่าทำไมความเข้าใจในเรื่องนี้จึงมีความสำคัญต่อเศรษฐกิจและสิ่งแวดล้อมโลก
        </p>

        <h3>เอเคอร์ (Acre) คืออะไร?</h3>
        <p>
          เอเคอร์เป็นหน่วยวัดพื้นที่ที่มาจากระบบอิมพีเรียล (Imperial) และเป็นที่นิยมใช้อย่างแพร่หลายในสหรัฐอเมริกา สหราชอาณาจักร 
          และบางประเทศที่เคยอยู่ภายใต้อิทธิพลของอังกฤษ ในเชิงประวัติศาสตร์ 1 เอเคอร์หมายถึงพื้นที่ที่โค 1 ตัวและชาย 1 คนสามารถไถพรวนได้ในระยะเวลาหนึ่งวัน 
          ในปัจจุบัน 1 เอเคอร์ ถูกกำหนดให้มีค่าเท่ากับ 43,560 ตารางฟุต
        </p>

        <h3>เฮกตาร์ (Hectare) คืออะไร?</h3>
        <p>
          เฮกตาร์ (ใช้สัญลักษณ์ว่า ha) เป็นหน่วยวัดพื้นที่ในระบบเมตริก (Metric System) ที่นิยมใช้กันทั่วโลก (รวมถึงในทวีปยุโรป ออสเตรเลีย และเอเชีย) 
          1 เฮกตาร์ มีค่าเท่ากับ 10,000 ตารางเมตร (หรือคิดเป็นพื้นที่สี่เหลี่ยมจัตุรัสขนาดกว้าง 100 เมตร ยาว 100 เมตร) 
          หน่วยเฮกตาร์ถูกออกแบบมาเพื่อให้การจัดการตัวเลขขนาดใหญ่ในการวัดที่ดินทำได้ง่ายกว่าการใช้ตารางเมตรโดยตรง
        </p>

        <h3>สูตรการแปลงเอเคอร์เป็นเฮกตาร์</h3>
        <p>
          หากเรานำหน่วยทั้งสองมาเทียบกัน จะพบว่า 1 เฮกตาร์ มีขนาดใหญ่กว่า 1 เอเคอร์ (ประมาณ 2.47 เท่า) 
          ดังนั้นสูตรสำหรับการแปลงพื้นที่จากเอเคอร์มาเป็นเฮกตาร์จึงมีรูปแบบการคูณด้วยค่าคงที่ ดังนี้:
        </p>
        <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
          <p className="font-semibold text-blue-900 m-0">1 เอเคอร์ (acre) = 0.404685642 เฮกตาร์ (hectare)</p>
        </blockquote>
        <p>
          เพื่อให้ได้พื้นที่ในหน่วยเฮกตาร์ คุณเพียงแค่นำตัวเลขของพื้นที่ในหน่วยเอเคอร์ คูณด้วย 0.404685642
        </p>

        <h3>ตัวอย่างการประยุกต์ใช้งานจริง</h3>
        <p>
          <strong>ตัวอย่างที่ 1: การซื้อขายไร่นา</strong><br />
          สมมติว่าคุณกำลังศึกษาข้อมูลของฟาร์มสตรอว์เบอร์รีในรัฐแคลิฟอร์เนีย ซึ่งระบุว่ามีพื้นที่ทั้งหมด 150 เอเคอร์ 
          คุณต้องการทราบว่าฟาร์มนี้มีขนาดเท่าไหร่ในหน่วยเฮกตาร์เพื่อให้เทียบกับมาตรฐานทางยุโรปได้<br />
          วิธีการคำนวณ: 150 &times; 0.404685642 = 60.7028463 เฮกตาร์<br />
          คำตอบคือ ฟาร์มแห่งนี้มีขนาดประมาณ 60.7 เฮกตาร์
        </p>
        <p>
          <strong>ตัวอย่างที่ 2: งานวิจัยทางสิ่งแวดล้อม</strong><br />
          ในรายงานข่าวเรื่องไฟป่าระบุว่า มีพื้นที่ป่าถูกทำลายไปกว่า 5,000 เอเคอร์ เมื่อนักวิจัยชาวเอเชียต้องการนำข้อมูลนี้ไปทำรายงานในระดับสากล 
          ก็จะนำมาแปลงเป็นเฮกตาร์: 5,000 &times; 0.404685642 &asymp; 2,023.4 เฮกตาร์ ซึ่งช่วยให้องค์กรระหว่างประเทศสามารถประเมินความเสียหายได้อย่างเข้าใจตรงกัน
        </p>

        <h3>ทำไมถึงควรใช้เครื่องมือคำนวณแบบออนไลน์?</h3>
        <p>
          การทราบสูตรนั้นเป็นประโยชน์อย่างยิ่งในเชิงวิชาการ แต่ในการทำงานที่ต้องแข่งกับเวลา หรือมีการนำเข้าข้อมูลตัวเลขจำนวนมาก 
          การใช้เครื่องมือคำนวณผ่านเว็บไซต์ (Converter Tool) จะช่วยเพิ่มความสะดวกสบาย ลดข้อผิดพลาดของมนุษย์ (Human Error) ที่เกิดจากการคูณทศนิยมผิดพลาด 
          และยังสามารถนำผลลัพธ์ที่ได้ไปคัดลอกลงในรายงานหรือแอปพลิเคชันอื่นๆ ได้ทันที
        </p>
        <p>
          ไม่ว่าคุณจะเป็นนักวิเคราะห์อสังหาริมทรัพย์ข้ามชาติ เกษตรกรที่กำลังศึกษาเทคโนโลยีต่างประเทศ หรือนักวิชาการ 
          การเข้าใจถึงความแตกต่างและวิธีการแปลงพื้นที่จากเอเคอร์เป็นเฮกตาร์นับเป็นอีกหนึ่งเครื่องมือความรู้ที่จะติดตัวไปใช้งานได้อย่างแน่นอน
        </p>
      </article>
    </div>
  );
}
