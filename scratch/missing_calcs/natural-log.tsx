import React, { useState } from 'react';
import { Calculator, Orbit, Activity, Info } from 'lucide-react';

export default function NaturalLog({ lang }: any) {
  const [x, setX] = useState<string>('');
  const [result, setResult] = useState<number | null | 'error'>(null);

  const calculate = () => {
    const xVal = parseFloat(x);
    if (!isNaN(xVal)) {
      if (xVal > 0) {
        setResult(Math.log(xVal));
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
        <Orbit className="w-8 h-8 text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาค่าลอการิทึมธรรมชาติ (Natural Log - ln)' : 'Natural Log (ln) Calculator'}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-mono"
              placeholder={isTH ? 'เช่น 2.718' : 'e.g. 2.718'}
              step="any"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{isTH ? 'คำนวณ ln(x)' : 'Calculate ln(x)'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-emerald-500" />
            {isTH ? 'ผลลัพธ์การคำนวณ' : 'Calculation Result'}
          </h2>
          {result === 'error' ? (
             <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center border border-red-200">
               {isTH ? 'ข้อผิดพลาด: ค่า X ต้องมากกว่า 0 (ไม่สามารถหาค่า ln ของตัวเลขที่ติดลบหรือเท่ากับ 0 ได้)' : 'Error: X must be greater than 0 as natural logarithm of zero or negative numbers is undefined.'}
             </div>
          ) : result !== null ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-sm text-gray-500 mb-2">ln({parseFloat(x)}) = </div>
              <div className="text-4xl font-bold text-emerald-600 break-all font-mono">
                {Number.isInteger(result) ? result : result.toLocaleString('en-US', { maximumFractionDigits: 8 })}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>{isTH ? 'กรุณากรอกค่า X เพื่อคำนวณหาค่า ln(x)' : 'Enter a value for X to calculate ln(x)'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-emerald max-w-none text-gray-600">
        <h2 className="text-xl font-bold text-gray-800">{isTH ? 'ลอการิทึมธรรมชาติ (Natural Logarithm) หรือ ln คืออะไร?' : 'What is Natural Logarithm (ln)?'}</h2>
        <p>{isTH ? 'ลอการิทึมธรรมชาติ ซึ่งมักเขียนย่อว่า "ln" (อ่านว่า ลอน หรือ แอลเอ็น) คือลอการิทึมที่มีฐานเป็นจำนวนของออยเลอร์ (Euler\'s number) หรือตัว e ซึ่งมีค่าประมาณ 2.71828... ดังนั้น ln(x) จึงมีความหมายเหมือนกับ logₑ(x)' : 'The natural logarithm, commonly written as "ln", is the logarithm to the base of Euler\'s number (e), where e is an irrational and transcendental constant approximately equal to 2.71828. Therefore, ln(x) is identical to logₑ(x).'}</p>
        <p>{isTH ? 'จำนวน e เป็นค่าคงที่ทางคณิตศาสตร์ที่มีความสำคัญมากเทียบเท่ากับพาย (π) มันปรากฏขึ้นตามธรรมชาติในหลายๆ ปรากฏการณ์ที่เกี่ยวข้องกับการเติบโตหรือการสลายตัวอย่างต่อเนื่อง (Continuous Growth or Decay)' : 'The number e is a fundamental mathematical constant, as important as pi (π). It naturally occurs in many phenomena related to continuous growth or decay.'}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'ทำไมเราต้องใช้ลอการิทึมธรรมชาติ?' : 'Why Use Natural Logarithms?'}</h3>
        <p>{isTH ? 'ลอการิทึมธรรมชาติมีความเกี่ยวพันกับ "เวลา" และ "อัตรา" หากอธิบายให้เห็นภาพ ค่า e เปรียบเสมือนผลลัพธ์สูงสุดของการเติบโตแบบต่อเนื่องในช่วงเวลาหนึ่ง ในขณะที่ ln เปรียบเสมือนตัวคำนวณย้อนกลับ ว่าต้องใช้เวลาเท่าไรเพื่อให้ปริมาณเติบโตถึงจุดที่เราต้องการ ด้วยอัตราการเติบโตที่กำหนดไว้' : 'Natural logarithms are deeply connected to "time" and "rate". If e represents the maximum output of continuous growth over a period, ln is the inverse—it tells us the time needed to reach a specific level of growth at a continuous rate.'}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">{isTH ? 'การนำ ln ไปใช้งานในหลากหลายสาขา' : 'Applications in Various Fields'}</h3>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>คณิตศาสตร์และแคลคูลัส:</strong> {isTH ? 'ในแคลคูลัส การหาอนุพันธ์และอินทิกรัลของฟังก์ชันเอกซ์โพเนนเชียลและลอการิทึมจะง่ายที่สุดเมื่อใช้ฐาน e ฟังก์ชัน y = eˣ มีเอกลักษณ์คืออนุพันธ์ของมันก็เท่ากับตัวมันเอง (eˣ)' : 'In calculus, derivatives and integrals of exponential and logarithmic functions are mathematically simplest when base e is used.'}</li>
          <li><strong>การเงินและเศรษฐศาสตร์:</strong> {isTH ? 'ใช้คำนวณดอกเบี้ยทบต้นแบบต่อเนื่อง (Continuous Compounding) ซึ่งสะท้อนการเติบโตของผลตอบแทนที่แม่นยำยิ่งขึ้น' : 'Used in calculating continuous compound interest in finance.'}</li>
          <li><strong>ฟิสิกส์และวิศวกรรม:</strong> {isTH ? 'ในการศึกษาเรื่องอุณหพลศาสตร์, วงจรไฟฟ้า (การชาร์จ/ดิสชาร์จตัวเก็บประจุ), และการคำนวณครึ่งชีวิตของการสลายตัวของสารกัมมันตรังสี กฎของนิวตันว่าด้วยการเย็นตัวก็อาศัยฟังก์ชันลอการิทึมธรรมชาติเช่นกัน' : 'Used in thermodynamics, electrical circuits (capacitor charging/discharging), calculating radioactive half-lives, and Newton\'s law of cooling.'}</li>
          <li><strong>ชีววิทยาและประชากรศาสตร์:</strong> {isTH ? 'แบบจำลองการเติบโตของประชากร แบคทีเรีย หรือเซลล์ที่เพิ่มจำนวนขึ้นในลักษณะทวีคูณ จะสามารถวิเคราะห์ได้ดีที่สุดผ่านสมการเชิงอนุพันธ์ที่อิงหลักการของตัว e และ ln' : 'Models of population growth, bacteria, or cell reproduction are best analyzed using differential equations based on e and ln.'}</li>
        </ul>

        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 mt-6 rounded-r-lg">
          <p className="text-sm text-emerald-900">
            <strong>{isTH ? 'ข้อควรรู้เกี่ยวกับ ln:' : 'Things to know about ln:'}</strong> 
            <br />• ln(1) = 0 {isTH ? '(เพราะ e⁰ = 1)' : '(since e⁰ = 1)'}
            <br />• ln(e) = 1 {isTH ? '(เพราะ e¹ = e)' : '(since e¹ = e)'}
            <br />• {isTH ? 'ln ของตัวเลขที่อยู่ระหว่าง 0 ถึง 1 จะมีค่าติดลบเสมอ' : 'ln of a number between 0 and 1 is always negative.'}
          </p>
        </div>
      </article>
    </div>
  );
}
