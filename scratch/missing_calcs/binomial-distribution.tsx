"use client";

import React, { useState } from 'react';
import { Calculator, Info, BarChart2 } from 'lucide-react';

export default function BinomialDistribution({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';
  
  const [trials, setTrials] = useState<string>('');
  const [successes, setSuccesses] = useState<string>('');
  const [probability, setProbability] = useState<string>('');
  
  const [resultEqual, setResultEqual] = useState<number | null>(null);
  const [resultLess, setResultLess] = useState<number | null>(null);
  const [resultGreater, setResultGreater] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Factorial function
  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) {
      res *= i;
    }
    return res;
  };

  // Combination function nCr
  const combination = (n: number, r: number): number => {
    if (r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const calculateBinomial = (n: number, k: number, p: number): number => {
    return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  };

  const calculate = () => {
    setError('');
    setResultEqual(null);
    setResultLess(null);
    setResultGreater(null);

    const n = parseInt(trials);
    const k = parseInt(successes);
    const p = parseFloat(probability);

    if (isNaN(n) || n < 0) {
      setError(isTH ? 'จำนวนการทดลอง (n) ต้องเป็นจำนวนเต็มบวกหรือศูนย์' : 'Number of trials (n) must be a non-negative integer');
      return;
    }
    if (isNaN(k) || k < 0 || k > n) {
      setError(isTH ? 'จำนวนครั้งที่สำเร็จ (x) ต้องอยู่ระหว่าง 0 ถึง n' : 'Number of successes (x) must be between 0 and n');
      return;
    }
    if (isNaN(p) || p < 0 || p > 1) {
      setError(isTH ? 'ความน่าจะเป็น (p) ต้องอยู่ระหว่าง 0 ถึง 1' : 'Probability (p) must be between 0 and 1');
      return;
    }

    const probEqual = calculateBinomial(n, k, p);
    
    let probLessOrEqual = 0;
    for (let i = 0; i <= k; i++) {
      probLessOrEqual += calculateBinomial(n, i, p);
    }
    
    let probGreaterOrEqual = 0;
    for (let i = k; i <= n; i++) {
      probGreaterOrEqual += calculateBinomial(n, i, p);
    }

    setResultEqual(probEqual);
    setResultLess(probLessOrEqual);
    setResultGreater(probGreaterOrEqual);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
          <BarChart2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณการแจกแจงทวินาม (Binomial)' : 'Binomial Distribution Calculator'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isTH ? 'คำนวณหาความน่าจะเป็นจากกฎการแจกแจงทวินาม' : 'Calculate probability using binomial distribution'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'จำนวนการทดลองทั้งหมด (n)' : 'Number of trials (n)'}
            </label>
            <input
              type="number"
              value={trials}
              onChange={(e) => setTrials(e.target.value)}
              placeholder="e.g. 10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              min="0"
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ความน่าจะเป็นที่จะสำเร็จใน 1 ครั้ง (p)' : 'Probability of success on a single trial (p)'}
            </label>
            <input
              type="number"
              value={probability}
              onChange={(e) => setProbability(e.target.value)}
              placeholder="e.g. 0.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              min="0"
              max="1"
              step="any"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'จำนวนครั้งที่ต้องการให้สำเร็จ (x)' : 'Number of successes (x)'}
            </label>
            <input
              type="number"
              value={successes}
              onChange={(e) => setSuccesses(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              min="0"
              step="1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculate}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-2"
          >
            <Calculator size={20} />
            <span>{isTH ? 'คำนวณ' : 'Calculate'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-indigo-500" />
            {isTH ? 'ผลลัพธ์ความน่าจะเป็น' : 'Probability Results'}
          </h3>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X = x) {isTH ? 'เท่ากับ x พอดี' : 'Exactly x'}</p>
              <p className="text-2xl font-bold text-indigo-600">
                {resultEqual !== null ? resultEqual.toFixed(6) : '-'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X &lt;= x) {isTH ? 'น้อยกว่าหรือเท่ากับ x' : 'At most x'}</p>
              <p className="text-xl font-bold text-gray-700">
                {resultLess !== null ? resultLess.toFixed(6) : '-'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X &gt;= x) {isTH ? 'มากกว่าหรือเท่ากับ x' : 'At least x'}</p>
              <p className="text-xl font-bold text-gray-700">
                {resultGreater !== null ? resultGreater.toFixed(6) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การแจกแจงทวินาม (Binomial Distribution) คืออะไร?
        </h2>
        
        <p>
          ในการศึกษาวิชาความน่าจะเป็นและสถิติ <strong>การแจกแจงทวินาม (Binomial Distribution)</strong> เป็นหนึ่งในการแจกแจงความน่าจะเป็นแบบไม่ต่อเนื่อง (Discrete Probability Distribution) ที่มีความสำคัญอย่างมาก โดยจะใช้เพื่อคำนวณหาความน่าจะเป็นของความสำเร็จในจำนวนครั้งที่กำหนด จากการทดลองซ้ำๆ กันทั้งหมด n ครั้ง ภายใต้เงื่อนไขที่เรียกว่า <em>การทดลองแบบแบร์นูลลี (Bernoulli Trial)</em>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติของการทดลองทวินาม</h3>
        <p>
          ก่อนที่จะใช้สูตรการแจกแจงทวินามได้ การทดลองหรือเหตุการณ์นั้นๆ จะต้องมีคุณสมบัติครบทั้ง 4 ข้อ ดังต่อไปนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li><strong>มีผลลัพธ์เพียง 2 แบบเท่านั้น:</strong> ในแต่ละครั้งที่ทำการทดลอง ผลลัพธ์จะต้องแยกออกเป็น 2 กรณีอย่างชัดเจน คือ "สำเร็จ (Success)" และ "ไม่สำเร็จ (Failure)" เท่านั้น</li>
          <li><strong>ความน่าจะเป็นคงที่:</strong> ความน่าจะเป็นที่จะเกิดผลลัพธ์แบบ "สำเร็จ" (แทนด้วย p) ต้องมีค่าเท่าเดิมคงที่ในการทดลองทุกๆ ครั้ง และความน่าจะเป็นของ "ไม่สำเร็จ" จะเท่ากับ 1 - p (หรือ q) เสมอ</li>
          <li><strong>เป็นการทดลองที่อิสระต่อกัน (Independent):</strong> ผลลัพธ์จากการทดลองครั้งหนึ่ง จะต้องไม่ส่งผลกระทบใดๆ ต่อผลลัพธ์ของการทดลองในครั้งถัดไป</li>
          <li><strong>จำนวนครั้งที่ทดลองแน่นอน:</strong> ต้องมีการกำหนดจำนวนครั้งที่ทำการทดลองทั้งหมดไว้อย่างชัดเจน (แทนด้วย n)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณการแจกแจงทวินาม</h3>
        <p>
          หากการทดลองตรงตามเงื่อนไขทั้ง 4 ข้อข้างต้น เราสามารถหาความน่าจะเป็นที่จะเกิดเหตุการณ์ "สำเร็จ" เป็นจำนวน x ครั้ง จากการทดลองทั้งหมด n ครั้ง ได้จากสูตร:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg overflow-x-auto whitespace-nowrap">
          P(X = x) = ⁿCₓ · pˣ · (1-p)ⁿ⁻ˣ
        </div>
        
        <p>
          โดยที่:<br/>
          <strong>P(X = x)</strong> = ความน่าจะเป็นที่จะเกิดความสำเร็จจำนวน x ครั้ง<br/>
          <strong>n</strong> = จำนวนครั้งของการทดลองทั้งหมด<br/>
          <strong>x</strong> = จำนวนครั้งของความสำเร็จที่เราสนใจ (0, 1, 2, ..., n)<br/>
          <strong>p</strong> = ความน่าจะเป็นของความสำเร็จในการทดลอง 1 ครั้ง<br/>
          <strong>ⁿCₓ</strong> = จำนวนวิธีในการจัดหมู่ (Combination) เท่ากับ n! / (x!(n - x)!)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการนำไปใช้งาน (Use Case)</h3>
        <p>
          <strong>ตัวอย่างที่ 1: การโยนเหรียญ</strong><br/>
          โยนเหรียญที่สมดุล 10 ครั้ง (n = 10) จงหาความน่าจะเป็นที่เหรียญจะออกหัวพอดี 5 ครั้ง (x = 5) โดยความน่าจะเป็นที่จะออกหัวในแต่ละครั้งคือ 0.5 (p = 0.5)<br/>
          จากสูตรจะได้ P(X=5) = ¹⁰C₅ · (0.5)⁵ · (0.5)⁵ ≈ 0.24609 หรือประมาณ 24.6%
        </p>
        <p>
          <strong>ตัวอย่างที่ 2: การตรวจสอบคุณภาพสินค้า (QC)</strong><br/>
          โรงงานผลิตหลอดไฟพบว่ามีโอกาส 2% ที่หลอดไฟจะเสีย (p = 0.02) หากสุ่มหยิบหลอดไฟมา 20 หลอด (n = 20) ความน่าจะเป็นที่จะไม่พบหลอดไฟเสียเลย (x = 0)<br/>
          จากสูตรจะได้ P(X=0) = ²⁰C₀ · (0.02)⁰ · (0.98)²⁰ ≈ 0.6676 หรือประมาณ 66.76%
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงควรใช้โปรแกรมคำนวณ?</h3>
        <p>
          แม้ว่าสูตรการแจกแจงทวินามจะมีหลักการที่ชัดเจน แต่การคำนวณด้วยมือ (Manual Calculation) จะมีความซับซ้อนและยุ่งยากมากเมื่อค่า n มีขนาดใหญ่ เนื่องจากการหาค่า แฟกทอเรียล (Factorial) และเลขยกกำลังจะให้ผลลัพธ์ที่เป็นตัวเลขมหาศาล เครื่องมือ <em>Binomial Distribution Calculator</em> ของเรา จึงถูกพัฒนาขึ้นมาเพื่อแก้ปัญหานี้ ช่วยให้คุณหาค่าความน่าจะเป็นแบบ P(X = x), แบบสะสม P(X ≤ x) หรือ P(X ≥ x) ได้ภายในเสี้ยววินาที มีความแม่นยำสูง เหมาะสำหรับนักเรียน นักศึกษา หรือสายงานที่ต้องวิเคราะห์ข้อมูลเชิงสถิติเป็นประจำ
        </p>
      </article>
    </div>
  );
}
