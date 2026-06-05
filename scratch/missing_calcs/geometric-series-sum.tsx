import React, { useState } from 'react';
import { Calculator, Sigma, TrendingUp, Info } from 'lucide-react';

export default function GeometricSeriesSum({ lang }: any) {
  const [a, setA] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [result, setResult] = useState<{ sum: number | null, nthTerm: number | null }>({ sum: null, nthTerm: null });

  const calculate = () => {
    const aVal = parseFloat(a);
    const rVal = parseFloat(r);
    const nVal = parseInt(n, 10);

    if (!isNaN(aVal) && !isNaN(rVal) && !isNaN(nVal) && nVal > 0) {
      let sum = 0;
      if (rVal === 1) {
        sum = aVal * nVal;
      } else {
        sum = aVal * (1 - Math.pow(rVal, nVal)) / (1 - rVal);
      }
      const nthTerm = aVal * Math.pow(rVal, nVal - 1);
      setResult({ sum, nthTerm });
    } else {
      setResult({ sum: null, nthTerm: null });
    }
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Sigma className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาผลรวมของอนุกรมเรขาคณิต (Geometric Series)' : 'Geometric Series Sum Calculator'}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'พจน์แรก (a₁)' : 'First Term (a₁)'}
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={isTH ? 'เช่น 2' : 'e.g. 2'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'อัตราส่วนร่วม (r)' : 'Common Ratio (r)'}
            </label>
            <input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={isTH ? 'เช่น 3' : 'e.g. 3'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'จำนวนพจน์ (n)' : 'Number of Terms (n)'}
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={isTH ? 'เช่น 10 (ต้องเป็นจำนวนเต็มบวก)' : 'e.g. 10 (positive integer)'}
              min="1"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{isTH ? 'คำนวณผลรวม' : 'Calculate Sum'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            {isTH ? 'ผลลัพธ์การคำนวณ' : 'Calculation Results'}
          </h2>
          {result.sum !== null ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">{isTH ? 'ผลรวมทั้งหมด (Sₙ)' : 'Sum of Series (Sₙ)'}</div>
                <div className="text-3xl font-bold text-blue-600 break-all">{result.sum.toLocaleString('en-US', { maximumFractionDigits: 6 })}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">{isTH ? 'ค่าของพจน์ที่ n (aₙ)' : 'nth Term (aₙ)'}</div>
                <div className="text-xl font-semibold text-gray-800 break-all">{result.nthTerm?.toLocaleString('en-US', { maximumFractionDigits: 6 })}</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>{isTH ? 'กรุณากรอกข้อมูลให้ครบถ้วนเพื่อดูผลลัพธ์' : 'Enter all values to see the results'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-blue max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-800">{isTH ? 'อนุกรมเรขาคณิต (Geometric Series) คืออะไร?' : 'What is a Geometric Series?'}</h2>
        <p>{isTH ? 'อนุกรมเรขาคณิต (Geometric Series) คือผลบวกของพจน์ต่างๆ ในลำดับเรขาคณิต ซึ่งเป็นลำดับที่อัตราส่วนระหว่างพจน์ที่ติดกันมีค่าคงที่เสมอ ค่าคงที่นี้เรียกว่า "อัตราส่วนร่วม" (Common Ratio) แทนด้วยสัญลักษณ์ r อนุกรมเรขาคณิตมีความสำคัญอย่างมากในคณิตศาสตร์ประยุกต์ โดยเฉพาะในด้านการเงิน เศรษฐศาสตร์ วิทยาศาสตร์ และวิศวกรรมศาสตร์' : 'A geometric series is the sum of an infinite or finite geometric sequence of numbers. A geometric sequence is one in which the ratio of consecutive terms is constant, known as the common ratio (r).'}</p>
        
        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'สูตรการหาผลรวมของอนุกรมเรขาคณิต' : 'Geometric Series Sum Formula'}</h3>
        <p>{isTH ? 'ในการหาผลรวมของอนุกรมเรขาคณิตจำกัดที่มี n พจน์ สามารถใช้สูตรต่อไปนี้:' : 'To find the sum of a finite geometric series with n terms, we use the following formula:'}</p>
        <div className="bg-blue-50 p-4 rounded-lg my-4 text-center font-mono text-lg text-blue-800">
          Sₙ = a₁(1 - rⁿ) / (1 - r) , {isTH ? 'เมื่อ' : 'where'} r ≠ 1
        </div>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Sₙ</strong> {isTH ? 'คือ ผลรวมของอนุกรม n พจน์แรก' : 'is the sum of the first n terms'}</li>
          <li><strong>a₁</strong> {isTH ? 'คือ พจน์แรกของอนุกรม' : 'is the first term'}</li>
          <li><strong>r</strong> {isTH ? 'คือ อัตราส่วนร่วม' : 'is the common ratio'}</li>
          <li><strong>n</strong> {isTH ? 'คือ จำนวนพจน์' : 'is the number of terms'}</li>
        </ul>
        <p className="mt-4">{isTH ? 'ในกรณีที่ r = 1 ผลรวมจะเท่ากับ a₁ × n เนื่องจากทุกพจน์จะมีค่าเท่ากับ a₁' : 'If r = 1, the sum is simply a₁ × n since all terms are equal to a₁.'}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'การนำอนุกรมเรขาคณิตไปประยุกต์ใช้งาน' : 'Applications of Geometric Series'}</h3>
        <p>{isTH ? 'การคำนวณอนุกรมเรขาคณิตไม่ได้มีเพียงแค่ในห้องเรียน แต่มีการใช้งานในชีวิตจริงอย่างกว้างขวาง ยกตัวอย่างเช่น:' : 'Geometric series calculations are not just for the classroom, but are widely used in real life. For example:'}</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>การเงินและการลงทุน:</strong> {isTH ? 'ใช้คำนวณมูลค่าในอนาคตของการออมเงินแบบดอกเบี้ยทบต้น การผ่อนชำระสินเชื่อบ้าน และมูลค่าปัจจุบันของเงินสดในอนาคต (Present Value)' : 'Calculating future value of compound interest savings, mortgage payments, and present value of cash flows.'}</li>
          <li><strong>วิทยาศาสตร์:</strong> {isTH ? 'อธิบายการสลายตัวของธาตุกัมมันตรังสี ซึ่งมีครึ่งชีวิตที่ลดลงเป็นสัดส่วนคงที่ในแต่ละช่วงเวลา' : 'Describing radioactive decay where the amount halves over fixed time intervals.'}</li>
          <li><strong>การแพร่กระจายของข้อมูลและไวรัส:</strong> {isTH ? 'การขยายตัวของเครือข่าย หรือการแพร่ระบาดของโรคที่คนหนึ่งคนสามารถส่งต่อเชื้อให้คนอื่นได้ในอัตราคงที่' : 'Network expansion or viral spread where one entity infects a fixed number of others.'}</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'ความแตกต่างระหว่างอนุกรมจำกัดและอนุกรมอนันต์' : 'Finite vs Infinite Geometric Series'}</h3>
        <p>{isTH ? 'อนุกรมเรขาคณิตจำกัดมีจุดสิ้นสุดเสมอ (คำนวณหาผลรวมได้ตามสูตรด้านบน) แต่สำหรับ "อนุกรมเรขาคณิตอนันต์" ซึ่งมีพจน์ต่อไปเรื่อยๆ อย่างไม่มีที่สิ้นสุด จะสามารถหาผลรวมได้ก็ต่อเมื่อค่าสัมบูรณ์ของ r น้อยกว่า 1 (|r| < 1) ซึ่งหมายความว่าพจน์ที่อยู่ลึกๆ ลงไปจะมีค่าเข้าใกล้ศูนย์ ทำให้ผลรวมลู่เข้าหาค่าใดค่าหนึ่ง สูตรสำหรับอนุกรมอนันต์คือ S = a₁ / (1 - r)' : 'A finite geometric series always has an end. For an infinite geometric series, the sum converges to a finite value only if the absolute value of r is less than 1 (|r| < 1). The formula for an infinite geometric series is S = a₁ / (1 - r).'}</p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <p className="text-sm text-yellow-800">
            <strong>{isTH ? 'เกร็ดความรู้:' : 'Tip:'}</strong> {isTH ? 'เครื่องมือคำนวณด้านบนนี้ออกแบบมาสำหรับอนุกรมจำกัด (Finite Series) เพื่อช่วยลดความยุ่งยากในการกดเครื่องคิดเลข โดยเฉพาะเมื่อค่า n มีจำนวนมาก การใช้สูตรจะช่วยประหยัดเวลาได้อย่างมหาศาล' : 'The calculator above is designed for finite series to simplify complex calculations, especially when n is large.'}
          </p>
        </div>
      </article>
    </div>
  );
}
