import React, { useState, useEffect } from 'react';
import { Hash, Calculator, Info, Target, Settings, AlertCircle } from 'lucide-react';

export default function FactorialCalculator({ lang }: { lang: any }) {
  const isTH = lang === 'TH';
  const [n, setN] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (n === '') {
      setResult(null);
      setError(null);
      return;
    }

    const num = parseInt(n, 10);
    
    if (isNaN(num) || num < 0) {
      setError(isTH ? 'กรุณาระบุจำนวนเต็มบวกหรือศูนย์' : 'Please enter a non-negative integer');
      setResult(null);
      return;
    }
    
    if (num > 5000) {
      setError(isTH ? 'ตัวเลขมีค่ามากเกินไป (รองรับสูงสุด 5,000)' : 'Number too large (max 5,000)');
      setResult(null);
      return;
    }

    setError(null);

    // Compute factorial using BigInt
    let fact = BigInt(1);
    for (let i = 2; i <= num; i++) {
      fact *= BigInt(i);
    }
    
    let resultStr = fact.toString();
    // If it's too long, truncate it and show length
    if (resultStr.length > 50) {
      // Create a simplified scientific notation-like display
      // e.g. 1.23456... x 10^n
      const head = resultStr.substring(0, 6);
      const formatted = `${head[0]}.${head.substring(1)} × 10^${resultStr.length - 1}`;
      setResult(`${formatted}`);
    } else {
      setResult(resultStr);
    }

  }, [n]);

  const handleClear = () => {
    setN('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-800 p-6 md:p-8 text-white text-center">
          <Hash className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isTH ? 'เครื่องคำนวณแฟกทอเรียล' : 'Factorial Calculator'}
          </h1>
          <p className="text-purple-100 text-lg">
            {isTH ? 'คำนวณหาค่า แฟกทอเรียล (n!) อย่างรวดเร็วและแม่นยำ' : 'Calculate the factorial (n!) quickly and accurately'}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ตัวเลข (n)' : 'Number (n)'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder={isTH ? 'ระบุจำนวนเต็มบวก (เช่น 5)' : 'Enter non-negative integer (e.g., 5)'}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={handleClear}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2 mt-4"
              >
                <Settings className="w-5 h-5" />
                {isTH ? 'ล้างค่า' : 'Clear'}
              </button>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-purple-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                {isTH ? 'ผลการคำนวณ' : 'Results'}
              </h3>
              
              {result !== null && !error ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center">
                  <div className="text-sm text-purple-600 mb-2">{isTH ? 'ค่าแฟกทอเรียล' : 'Factorial Value'} ({n}!)</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 break-all">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <Target className="w-12 h-12 text-purple-200 mb-3" />
                  <p>{isTH ? 'กรุณาระบุตัวเลข n เพื่อดูผลลัพธ์' : 'Enter number n to see results'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-purple max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Info className="w-7 h-7 text-purple-600" />
          แฟกทอเรียล (Factorial) คืออะไร? สัญลักษณ์ n! มีความหมายอย่างไร?
        </h2>
        
        <p>
          ในทางคณิตศาสตร์ <strong>แฟกทอเรียล (Factorial)</strong> ของจำนวนเต็มบวก n ใดๆ คือผลคูณของจำนวนเต็มบวกทั้งหมดที่น้อยกว่าหรือเท่ากับ n สัญลักษณ์ที่ใช้แทนแฟกทอเรียลคือเครื่องหมายอัศเจรีย์ <strong>(!)</strong> ต่อท้ายตัวเลข เช่น 5! (อ่านว่า ห้าแฟกทอเรียล) การคำนวณแฟกทอเรียลมักจะถูกนำไปใช้อย่างแพร่หลายในเรื่องของ <em>ความน่าจะเป็น (Probability)</em> และ <em>ทฤษฎีการจัดหมู่และการจัดลำดับ (Combinatorics)</em>
        </p>

        <h3>หลักการคำนวณแฟกทอเรียล</h3>
        <p>
          สูตรพื้นฐานของแฟกทอเรียลเขียนได้ดังนี้:<br />
          <code>n! = n &times; (n - 1) &times; (n - 2) &times; ... &times; 3 &times; 2 &times; 1</code>
        </p>
        <p>ลองมาดูตัวอย่างการคำนวณที่เข้าใจง่าย:</p>
        <ul>
          <li><strong>1!</strong> = 1</li>
          <li><strong>2!</strong> = 2 &times; 1 = 2</li>
          <li><strong>3!</strong> = 3 &times; 2 &times; 1 = 6</li>
          <li><strong>4!</strong> = 4 &times; 3 &times; 2 &times; 1 = 24</li>
          <li><strong>5!</strong> = 5 &times; 4 &times; 3 &times; 2 &times; 1 = 120</li>
        </ul>
        <p>
          จะเห็นได้ว่าเมื่อค่า n เพิ่มขึ้นเพียงเล็กน้อย ผลลัพธ์ของ n! จะเพิ่มขึ้นอย่างมหาศาลทวีคูณ (Exponential growth) ตัวอย่างเช่น 10! มีค่าถึง 3,628,800 ดังนั้นในการคำนวณตัวเลขที่ใหญ่มากๆ เราจึงจำเป็นต้องใช้เครื่องมือหรือคอมพิวเตอร์เข้าช่วย
        </p>

        <h3>กรณีพิเศษ: ทำไม 0! จึงเท่ากับ 1 ?</h3>
        <p>
          นี่เป็นหนึ่งในคำถามยอดฮิตทางคณิตศาสตร์ <strong>0! มีค่าเท่ากับ 1 เสมอ</strong> ซึ่งอาจดูขัดกับสามัญสำนึกในตอนแรก เหตุผลหลักที่นักคณิตศาสตร์นิยามให้ 0! = 1 เป็นเพราะว่า:
        </p>
        <ol>
          <li><strong>เพื่อให้สูตรทางคณิตศาสตร์ยังคงความถูกต้อง:</strong> เช่นสูตรของแฟกทอเรียลที่ลดรูปคือ <code>n! = n &times; (n - 1)!</code> ถ้าเราแทนค่า n = 1 จะได้ <code>1! = 1 &times; 0!</code> ดังนั้นเพื่อให้ได้ 1! = 1 ค่าของ 0! จึงต้องบังคับให้เป็น 1 นั่นเอง</li>
          <li><strong>การจัดลำดับ (Permutation):</strong> ความหมายของ n! คือจำนวนวิธีการจัดเรียงสิ่งของ n ชิ้น ถ้าคุณมีของ 0 ชิ้น จำนวนวิธีที่คุณจะ "จัดเรียงความว่างเปล่า" นั้นก็คือ 1 วิธี (คือไม่ทำอะไรเลย) นั่นเอง</li>
        </ol>

        <h3>การประยุกต์ใช้งานแฟกทอเรียล</h3>
        <p>
          แฟกทอเรียลไม่ใช่แค่ตัวเลขที่คูณกันไปเรื่อยๆ แต่มันเป็นรากฐานของหลายสาขาวิชา:
        </p>
        <ul>
          <li><strong>การจัดลำดับ (Permutation - nPr):</strong> การคำนวณหาจำนวนวิธีในการเลือกสิ่งของ r ชิ้นจากทั้งหมด n ชิ้น โดย<strong>คำนึงถึงลำดับ</strong> เช่น การตั้งรหัสผ่าน หรือการจัดคนนั่งเก้าอี้</li>
          <li><strong>การจัดหมู่ (Combination - nCr):</strong> การคำนวณหาจำนวนวิธีในการเลือกสิ่งของ r ชิ้นจาก n ชิ้น โดย<strong>ไม่คำนึงถึงลำดับ</strong> เช่น การสุ่มหยิบลูกบอลสี การจับฉลาก</li>
          <li><strong>ความน่าจะเป็นและสถิติ:</strong> แฟกทอเรียลถูกใช้ในสมการความน่าจะเป็นต่างๆ เช่น ทฤษฎีบททวินาม (Binomial theorem) และการแจกแจงแบบปัวซง (Poisson distribution)</li>
          <li><strong>วิทยาการคอมพิวเตอร์:</strong> การวิเคราะห์ประสิทธิภาพของอัลกอริทึมบางประเภท (เช่น การแก้ปัญหา Traveling Salesman Problem) ที่มีความซับซ้อนระดับ O(n!)</li>
        </ul>
        
        <p>
          เครื่องคำนวณนี้ถูกออกแบบมาเพื่อรองรับการคำนวณตัวเลขแฟกทอเรียลที่ใหญ่มาก หากผลลัพธ์มีความยาวมากกว่า 50 หลัก ระบบจะแสดงผลในรูปแบบสัญกรณ์วิทยาศาสตร์ (Scientific Notation) เพื่อให้อ่านค่าได้ง่ายขึ้น
        </p>
      </article>
    </div>
  );
}
