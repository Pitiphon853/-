import React, { useState } from 'react';
import { Sigma } from 'lucide-react';

export default function CustomBaseLogarithm({ lang }: any) {
  const [base, setBase] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<number | null | string>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const x = parseFloat(value);
    
    if (isNaN(b) || isNaN(x)) {
      setResult(null);
      return;
    }

    if (b <= 0 || b === 1) {
      setResult('ข้อผิดพลาด: ฐานต้องมากกว่า 0 และไม่เท่ากับ 1');
      return;
    }

    if (x <= 0) {
      setResult('ข้อผิดพลาด: ค่า (x) ต้องมากกว่า 0');
      return;
    }

    const logValue = Math.log(x) / Math.log(b);
    setResult(logValue);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <Sigma className="w-8 h-8 text-rose-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณหาค่าลอการิทึมที่มีฐานใดๆ</h1>
      </div>

      <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 flex flex-col items-center">
        <div className="flex items-end gap-2 text-3xl font-serif text-gray-800 mb-8">
          <span>log</span>
          <div className="flex flex-col w-16 mb-[-10px]">
             <input
              type="number"
              step="any"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="text-sm px-2 py-1 border rounded focus:ring-2 focus:ring-rose-500 font-sans"
              placeholder="ฐาน (b)"
            />
          </div>
          <div className="flex flex-col w-24">
             <input
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg px-2 py-1 border rounded focus:ring-2 focus:ring-rose-500 font-sans ml-1"
              placeholder="ค่า (x)"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-8 rounded-lg transition-colors mb-6"
        >
          คำนวณ
        </button>

        {result !== null && (
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
             <p className="text-sm text-gray-500 mb-1">ผลลัพธ์</p>
             {typeof result === 'string' ? (
                <p className="text-red-500 font-medium">{result}</p>
             ) : (
                <p className="text-3xl font-bold text-rose-600">{result.toFixed(6)}</p>
             )}
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ลอการิทึม (Logarithm) ฐานใดๆ คืออะไร?</h2>
        <p>
          ในวิชาคณิตศาสตร์ <strong>ลอการิทึม (Logarithm)</strong> เป็นการดำเนินการผกผัน (Inverse operation) ของการยกกำลัง พูดง่ายๆ คือ ลอการิทึมเป็นการหาคำตอบของคำถามที่ว่า "ฐาน (Base) ต้องยกกำลังเท่าใด จึงจะได้ค่าที่ต้องการ?"
        </p>
        <p>
          ตัวอย่างเช่น <br/>
          ถ้า 2<sup>3</sup> = 8 <br/>
          ดังนั้นในรูปลอการิทึมจะเขียนได้ว่า <strong>log<sub>2</sub>(8) = 3</strong> (อ่านว่า "ล็อก 8 ฐาน 2 เท่ากับ 3")
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการเปลี่ยนฐานลอการิทึม (Change of Base Formula)</h3>
        <p>
          เครื่องคิดเลขวิทยาศาสตร์ส่วนใหญ่มักจะมีปุ่มสำหรับคำนวณลอการิทึมเพียง 2 ฐานเท่านั้น ได้แก่ <strong>ลอการิทึมฐาน 10 (log หรือ Common logarithm)</strong> และ <strong>ลอการิทึมธรรมชาติฐาน e (ln หรือ Natural logarithm)</strong> 
        </p>
        <p>
          หากเราต้องการหาค่าลอการิทึมที่มีฐานอื่นๆ เช่น ฐาน 2, ฐาน 3, ฐาน 5 หรือฐานใดๆ เราจำเป็นต้องใช้กฎข้อหนึ่งของลอการิทึมที่เรียกว่า <strong>"สูตรการเปลี่ยนฐาน" (Change of Base Formula)</strong> ซึ่งมีรูปแบบดังนี้:
        </p>
        <div className="bg-gray-100 p-4 rounded text-center text-lg my-4 font-serif">
          log<sub>b</sub>(x) = log<sub>c</sub>(x) / log<sub>c</sub>(b)
        </div>
        <p>
          โดยส่วนใหญ่ เพื่อให้สามารถกดเครื่องคิดเลขได้ง่าย เรามักจะเลือกให้ฐาน c เป็นฐาน 10 (log) หรือ ฐาน e (ln) ทำให้ได้สูตรในการคำนวณจริงคือ:
          <br/><strong>log<sub>b</sub>(x) = ln(x) / ln(b)</strong> หรือ <strong>log<sub>b</sub>(x) = log(x) / log(b)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เงื่อนไขและข้อจำกัดของลอการิทึม</h3>
        <p>
          ในการคำนวณลอการิทึม log<sub>b</sub>(x) จะมีกฎเกณฑ์ทางคณิตศาสตร์ที่สำคัญซึ่งต้องเป็นจริงเสมอ ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ค่าของ x (Argument):</strong> ต้องเป็นจำนวนจริงบวก (x &gt; 0) เท่านั้น ไม่สามารถหาค่าล็อกของจำนวนลบหรือศูนย์ในระบบจำนวนจริงได้</li>
          <li><strong>ค่าของ b (Base หรือ ฐาน):</strong> ต้องเป็นจำนวนจริงบวกที่มากกว่า 0 และ <strong>ต้องไม่เท่ากับ 1</strong> (b &gt; 0 และ b ≠ 1) สาเหตุที่ฐานเป็น 1 ไม่ได้ เพราะ 1 ยกกำลังอะไรก็ได้ 1 เสมอ ทำให้ไม่สามารถนิยามลอการิทึมฐาน 1 ได้</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การนำไปใช้งาน</h3>
        <p>
          ลอการิทึมถูกนำไปประยุกต์ใช้อย่างกว้างขวางในวิทยาศาสตร์หลายสาขา เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>วิทยาการคอมพิวเตอร์:</strong> ลอการิทึมฐาน 2 (log<sub>2</sub>x) ถูกใช้ในการคำนวณความซับซ้อนของอัลกอริทึม (Time Complexity) เช่น Binary Search รวมไปถึงทฤษฎีข้อมูลและเอนโทรปี</li>
          <li><strong>วิทยาศาสตร์:</strong> ลอการิทึมฐาน 10 (log<sub>10</sub>x) ถูกใช้ในระดับมาตราส่วนต่างๆ เช่น มาตราริกเตอร์สำหรับวัดแผ่นดินไหว, ระดับความดังของเสียง (เดซิเบล), และการวัดค่าความเป็นกรด-ด่าง (pH)</li>
          <li><strong>การเงินและเศรษฐศาสตร์:</strong> ลอการิทึมธรรมชาติ (ln หรือฐาน e) นิยมใช้ในการคำนวณอัตราดอกเบี้ยทบต้นอย่างต่อเนื่อง (Continuous Compounding) และการเติบโตแบบทวีคูณ</li>
        </ul>
        <p>
          เครื่องมือนี้เป็นตัวช่วยให้นักเรียนและนักศึกษาลดความซับซ้อนในการต้องกดเครื่องคิดเลขสองครั้งและนำมาหารกัน เพียงแค่ระบุค่า ฐาน และ ค่าเป้าหมาย ก็สามารถหาคำตอบที่แม่นยำได้ในทันที
        </p>
      </article>
    </div>
  );
}
