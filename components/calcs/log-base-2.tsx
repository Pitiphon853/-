import React, { useState } from 'react';
import { Calculator, Binary, Database, Info } from 'lucide-react';

export default function LogBase2({ lang }: any) {
  const [x, setX] = useState<string>('');
  const [result, setResult] = useState<number | null | 'error'>(null);

  const calculate = () => {
    const xVal = parseFloat(x);
    if (!isNaN(xVal)) {
      if (xVal > 0) {
        setResult(Math.log2(xVal));
      } else {
        setResult('error');
      }
    } else {
      setResult(null);
    }
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Binary className="w-8 h-8 text-cyan-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาค่าลอการิทึมฐาน 2 (Log Base 2)' : 'Log Base 2 Calculator'}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ค่า X (ต้องมากกว่า 0)' : 'Value of X (must be > 0)'}
            </label>
            <input
              type="number"
              value={x}
              onChange={(e) => { setX(e.target.value); if (result !== null) setResult(null); }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-lg font-mono"
              placeholder={isTH ? 'เช่น 256' : 'e.g. 256'}
              step="any"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{isTH ? 'คำนวณ log₂(x)' : 'Calculate log₂(x)'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-cyan-500" />
            {isTH ? 'ผลลัพธ์การคำนวณ' : 'Calculation Result'}
          </h2>
          {result === 'error' ? (
             <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-200">
               {isTH ? 'ข้อผิดพลาด: ค่า X ต้องมากกว่า 0' : 'Error: X must be greater than 0.'}
             </div>
          ) : result !== null ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-sm text-gray-500 mb-2">log₂({parseFloat(x)}) = </div>
              <div className="text-4xl font-bold text-cyan-600 break-all font-mono">
                {Number.isInteger(result) ? result : result.toLocaleString('en-US', { maximumFractionDigits: 8 })}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>{isTH ? 'กรุณากรอกค่า X เพื่อคำนวณหาค่าลอการิทึมฐาน 2' : 'Enter a value for X to calculate log base 2'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-cyan max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-800">{"{"}isTH ? 'ลอการิทึมฐาน 2 (Binary Logarithm) คืออะไร?' : 'What is Log Base 2 (Binary Logarithm)?'{"}"}</h2>
        <p>{"{"}isTH ? 'ลอการิทึมฐาน 2 หรือที่เรียกว่า Binary Logarithm (มักเขียนเป็น log₂(x) หรือ lb(x) หรือ lg(x) ในทางวิทยาการคอมพิวเตอร์) คือการตอบคำถามที่ว่า "เราต้องคูณเลข 2 เข้าด้วยกันกี่ครั้ง เพื่อให้ได้ค่า x" หรือกล่าวอีกนัยหนึ่งคือ 2 ยกกำลังอะไรถึงจะได้ x ยกตัวอย่างเช่น log₂(8) = 3 เพราะว่า 2³ = 2 × 2 × 2 = 8' : 'The base-2 logarithm, also known as the binary logarithm (often written as log₂(x), lb(x), or lg(x) in computer science), answers the question: "To what power must 2 be raised to obtain the value x?" For example, log₂(8) = 3 because 2³ = 2 × 2 × 2 = 8.'{"}"}</p>
        
        <h3 className="text-lg font-semibold text-gray-800 mt-6">{"{"}isTH ? 'บทบาทสำคัญในวิทยาการคอมพิวเตอร์' : 'Crucial Role in Computer Science'{"}"}</h3>
        <p>{"{"}isTH ? 'ในขณะที่มนุษย์นับเลขและคำนวณด้วยเลขฐาน 10 คอมพิวเตอร์ประมวลผลทุกอย่างเป็นเลขฐาน 2 (0 และ 1 หรือ บิต - Bits) ลอการิทึมฐาน 2 จึงเป็นหัวใจสำคัญในการอธิบายระบบดิจิทัลและเทคโนโลยีสารสนเทศ:' : 'While humans count in base-10, computers process everything in base-2 (0s and 1s, or bits). Thus, the binary logarithm is the core of digital systems and information technology:'{"}"}</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>การวัดปริมาณข้อมูล (Information Theory):</strong> {"{"}isTH ? 'ตามทฤษฎีสารสนเทศของ Claude Shannon ค่า entropy หรือปริมาณข้อมูลมักวัดเป็น "บิต" ซึ่งหาได้จากการใช้ลอการิทึมฐาน 2 เช่น ถ้าคุณมีทางเลือก 256 ทาง คุณต้องใช้ข้อมูล log₂(256) = 8 บิตในการระบุทางเลือกนั้นๆ' : 'In Claude Shannon\'s information theory, entropy or information content is measured in "bits" using base-2 logarithms. e.g., to specify one of 256 options, you need log₂(256) = 8 bits.'{"}"}</li>
          <li><strong>ความซับซ้อนของอัลกอริทึม (Algorithm Complexity):</strong> {"{"}isTH ? 'คุณสมบัติของ log₂ ปรากฏใน "ความซับซ้อนของเวลา" (Time Complexity) เช่น O(log n) ซึ่งพบได้บ่อยในอัลกอริทึมการค้นหาแบบทวิภาค (Binary Search) หรือต้นไม้ค้นหา (Binary Search Trees) อัลกอริทึมเหล่านี้จะแบ่งข้อมูลออกเป็นครึ่งหนึ่งซ้ำๆ ทำให้ค้นหาข้อมูลนับล้านรายการได้ด้วยการเปรียบเทียบเพียง 20 ครั้ง (เพราะ 2²⁰ ≈ 1,000,000)' : 'The properties of log₂ appear in time complexities like O(log n), common in Binary Search or Binary Search Trees. These algorithms repeatedly halve the dataset, meaning they can search a million items in just about 20 comparisons.'{"}"}</li>
          <li><strong>โครงสร้างข้อมูล (Data Structures):</strong> {"{"}isTH ? 'ใช้คำนวณความสูงของโครงสร้างข้อมูลแบบต้นไม้ (Tree height) และความจุในการอ้างอิงหน่วยความจำ' : 'Used to calculate the height of tree data structures and memory addressing capacities.'{"}"}</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{"{"}isTH ? 'คุณสมบัติทางคณิตศาสตร์' : 'Mathematical Properties'{"}"}</h3>
        <p>{"{"}isTH ? 'แม้จะดูผูกพันกับคอมพิวเตอร์ แต่ log₂(x) ก็มีคุณสมบัติพื้นฐานเหมือนลอการิทึมฐานอื่นๆ:' : 'Despite its association with computers, log₂(x) shares the fundamental properties of other logarithms:'{"}"}</p>
        <div className="bg-cyan-50 p-4 rounded-lg my-4 font-mono text-cyan-800">
          <p>• log₂(x × y) = log₂(x) + log₂(y)</p>
          <p>• log₂(x / y) = log₂(x) - log₂(y)</p>
          <p>• log₂(xʸ) = y × log₂(x)</p>
          <p>• log₂(1) = 0</p>
          <p>• log₂(2) = 1</p>
        </div>

        <p className="mt-4">{"{"}isTH ? 'หากเครื่องคิดเลขของคุณไม่มีปุ่ม log₂ คุณสามารถคำนวณได้โดยอาศัยกฎการเปลี่ยนฐาน (Change of Base Formula):' : 'If your physical calculator lacks a log₂ button, you can compute it using the Change of Base Formula:'{"}"}</p>
        <p className="font-semibold text-center mt-2">log₂(x) = ln(x) / ln(2) = log₁₀(x) / log₁₀(2)</p>
      </article>
    </div>
  );
}
