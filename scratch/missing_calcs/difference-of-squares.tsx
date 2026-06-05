import React, { useState } from 'react';
import { Calculator, MinusSquare, RefreshCw, Layers, BookOpen, HelpCircle } from 'lucide-react';

export default function DifferenceOfSquares({ lang }: any) {
  const [activeTab, setActiveTab] = useState<'numeric' | 'algebraic'>('numeric');

  // Numeric states
  const [numA, setNumA] = useState<string>('');
  const [numB, setNumB] = useState<string>('');
  const [numericResult, setNumericResult] = useState<{
    aSq: number;
    bSq: number;
    diff: number;
    aMinusB: number;
    aPlusB: number;
    factoredProduct: number;
  } | null>(null);

  // Algebraic states (Ax^2 - B)
  const [coeffA, setCoeffA] = useState<string>('1');
  const [constB, setConstB] = useState<string>('');
  const [algebraicResult, setAlgebraicResult] = useState<{
    expr: string;
    factoredPerfect: string;
    factoredDecimal: string;
    hasPerfectSquare: boolean;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const isPerfectSquare = (n: number): boolean => {
    if (n < 0) return false;
    const r = Math.round(Math.sqrt(n));
    return r * r === n;
  };

  const calculateNumeric = () => {
    setError(null);
    setNumericResult(null);

    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if (isNaN(a) || isNaN(b)) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลขให้ครบถ้วน' : 'Please enter numbers for both a and b.');
      return;
    }

    const aSq = a * a;
    const bSq = b * b;
    const diff = aSq - bSq;
    const aMinusB = a - b;
    const aPlusB = a + b;
    const factoredProduct = aMinusB * aPlusB;

    setNumericResult({
      aSq,
      bSq,
      diff,
      aMinusB,
      aPlusB,
      factoredProduct,
    });
  };

  const calculateAlgebraic = () => {
    setError(null);
    setAlgebraicResult(null);

    const A = parseFloat(coeffA);
    const B = parseFloat(constB);

    if (isNaN(A) || isNaN(B)) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลขสำหรับ A และ B' : 'Please enter valid coefficients A and B.');
      return;
    }

    if (A <= 0 || B <= 0) {
      setError(
        lang === 'th'
          ? 'สูตรผลต่างกำลังสองต้องการให้สัมประสิทธิ์ A และค่าคงที่ B เป็นจำนวนบวก (เพื่อให้ได้รูปแบบ Ax² - B)'
          : 'For difference of squares, both A and B must be positive numbers to form Ax² - B.'
      );
      return;
    }

    const rootA = Math.sqrt(A);
    const rootB = Math.sqrt(B);

    const isAPerfect = isPerfectSquare(A);
    const isBPerfect = isPerfectSquare(B);

    const aPartPerfect = isAPerfect ? `${Math.round(rootA)}` : `√${A}`;
    const bPartPerfect = isBPerfect ? `${Math.round(rootB)}` : `√${B}`;

    const factoredPerfect = `(${aPartPerfect}x - ${bPartPerfect})(${aPartPerfect}x + ${bPartPerfect})`;
    const factoredDecimal = `(${rootA.toFixed(4)}x - ${rootB.toFixed(4)})(${rootA.toFixed(4)}x + ${rootB.toFixed(4)})`;

    setAlgebraicResult({
      expr: `${A !== 1 ? A : ''}x² - ${B}`,
      factoredPerfect,
      factoredDecimal,
      hasPerfectSquare: isAPerfect && isBPerfect,
    });
  };

  const handleReset = () => {
    setNumA('');
    setNumB('');
    setCoeffA('1');
    setConstB('');
    setNumericResult(null);
    setAlgebraicResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <MinusSquare className="w-8 h-8 text-rose-650" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณผลต่างกำลังสอง (Difference of Squares)' : 'Difference of Squares Calculator'}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => { setActiveTab('numeric'); setError(null); }}
          className={`py-2 px-4 font-semibold text-sm transition-colors duration-150 border-b-2 ${
            activeTab === 'numeric'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {isTH ? 'คำนวณตัวเลข (Arithmetic)' : 'Numerical Mode'}
        </button>
        <button
          onClick={() => { setActiveTab('algebraic'); setError(null); }}
          className={`py-2 px-4 font-semibold text-sm transition-colors duration-150 border-b-2 ${
            activeTab === 'algebraic'
              ? 'border-rose-600 text-rose-600 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {isTH ? 'แยกตัวประกอบพหุนาม (Algebraic Ax² - B)' : 'Algebraic Mode'}
        </button>
      </div>

      {/* Main UI grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input panel */}
        <div className="space-y-6">
          {activeTab === 'numeric' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ตัวเลข a' : 'Value of a'}
                </label>
                <input
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-lg font-mono"
                  placeholder="e.g. 10"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ตัวเลข b' : 'Value of b'}
                </label>
                <input
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-lg font-mono"
                  placeholder="e.g. 3"
                  step="any"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-rose-50 p-4 rounded-lg text-sm text-rose-850 font-semibold mb-2">
                {isTH ? 'นิพจน์: Ax² - B' : 'Expression: Ax² - B'}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'สัมประสิทธิ์ A (หน้า x²)' : 'Coefficient A (of x²)'}
                </label>
                <input
                  type="number"
                  value={coeffA}
                  onChange={(e) => setCoeffA(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-lg font-mono"
                  placeholder="e.g. 4"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ค่าคงที่ B' : 'Constant B'}
                </label>
                <input
                  type="number"
                  value={constB}
                  onChange={(e) => setConstB(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-lg font-mono"
                  placeholder="e.g. 9"
                  step="any"
                />
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={activeTab === 'numeric' ? calculateNumeric : calculateAlgebraic}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'คำนวณ' : 'Calculate'}</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Output panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Layers className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'ผลลัพธ์คำตอบ' : 'Solution Output'}
            </h2>

            {activeTab === 'numeric' && numericResult ? (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="text-sm text-gray-500 mb-1">a² - b²</div>
                  <div className="text-4xl font-bold text-rose-600 font-mono">
                    {numericResult.diff.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm space-y-2 font-mono">
                  <div className="flex justify-between border-b py-1">
                    <span className="text-gray-500">a²</span>
                    <span className="font-semibold">{numericResult.aSq}</span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span className="text-gray-500">b²</span>
                    <span className="font-semibold">{numericResult.bSq}</span>
                  </div>
                  <div className="flex justify-between border-b py-1 text-rose-700">
                    <span className="font-bold">a² - b²</span>
                    <span className="font-bold">{numericResult.diff}</span>
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-gray-800 mb-1">{isTH ? 'ตรวจสอบจากสูตรตัวประกอบ:' : 'Verify using factors:'}</div>
                    <div className="bg-rose-50 p-2 rounded text-xs text-rose-900">
                      (a - b)(a + b) <br/>
                      = ({numericResult.aMinusB}) &times; ({numericResult.aPlusB}) <br/>
                      = {numericResult.aMinusB * numericResult.aPlusB}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'algebraic' && algebraicResult ? (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="text-sm text-gray-500 mb-1">{isTH ? 'ตัวประกอบแยกได้' : 'Factored Expression'}</div>
                  <div className="text-2xl font-bold text-rose-600 font-mono break-all mt-1">
                    {algebraicResult.factoredPerfect}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm space-y-2 font-mono">
                  <div>
                    <span className="text-gray-500 block mb-1">{isTH ? 'นิพจน์ตั้งต้น:' : 'Original Expression:'}</span>
                    <span className="font-bold text-gray-800 text-lg">{algebraicResult.expr}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-gray-500 block mb-1">{isTH ? 'ในรูปทศนิยมโดยประมาณ (Decimal Form):' : 'Decimal factored form approximation:'}</span>
                    <span className="text-gray-800 block text-xs bg-gray-50 p-2 rounded">{algebraicResult.factoredDecimal}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'กรอกตัวแปรด้านซ้ายเพื่อแยกตัวประกอบผลต่างกำลังสอง' : 'Input variables to factorization results using difference of squares identity'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-rose max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-rose-600" />
          {isTH ? 'สูตรผลต่างกำลังสอง (Difference of Squares) และการนำไปประยุกต์ใช้' : 'The Difference of Squares Formula & Applications'}
        </h2>
        <p className="mb-4">
          ในทางพีชคณิต <strong>ผลต่างกำลังสอง (Difference of Squares)</strong> คือเอกลักษณ์ทางคณิตศาสตร์ที่เป็นรากฐานสำคัญในการแยกตัวประกอบของพหุนามดีกรีสอง ตัวสูตรแสดงถึงความสัมพันธ์เมื่อนำเลขยกกำลังสองของตัวแปรสองตัวมาลบกัน ซึ่งสามารถกระจายออกเป็นผลคูณของผลลบและผลบวกของเลขฐานทั้งสองได้ดังสมการ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 text-center font-mono text-gray-800 border border-gray-150">
          a² - b² = (a - b)(a + b)
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">พิสูจน์เชิงเรขาคณิต (Geometric Proof)</h3>
        <p className="mb-4">
          ความสวยงามของผลต่างกำลังสองคือเราสามารถอธิบายให้เห็นภาพได้ผ่านพื้นที่ทางเรขาคณิต:
          สมมติให้เรามีรูปสี่เหลี่ยมจัตุรัสรูปใหญ่รูปหนึ่งที่มีความยาวด้านเท่ากับ $a$ ซึ่งจะมีพื้นที่เท่ากับ $a^2$
          ต่อมาเราตัดสี่เหลี่ยมจัตุรัสรูปเล็กที่มีความยาวด้านเป็น $b$ ออกจากมุมหนึ่งของสี่เหลี่ยมรูปใหญ่ (ซึ่งมีพื้นที่เท่ากับ $b^2$)
          ดังนั้นพื้นที่ส่วนที่เหลืออยู่จะมีค่าเท่ากับ $a^2 - b^2$ (พื้นที่เป็นรูปทรงตัว L)
        </p>
        <p className="mb-4">
          หากเราตัดแบ่งรูปทรงตัว L นี้ออกเป็นสองชิ้นส่วนแล้วนำมาจัดเรียงต่อกันใหม่เป็นรูปสี่เหลี่ยมผืนผ้าชิ้นเดียว เราจะได้สี่เหลี่ยมผืนผ้าที่มีความกว้างเท่ากับ $(a - b)$ และมีความยาวเท่ากับ $(a + b)$ พอดี ซึ่งมีพื้นที่เท่ากับ $(a - b)(a + b)$ นั่นเอง นี่คือการพิสูจน์ที่ประจักษ์ชัดว่าทำไมพื้นที่ทั้งสองแบบนี้จึงเท่ากันอย่างสมบูรณ์
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">การแยกตัวประกอบในรูปพหุนาม</h3>
        <p className="mb-4">
          เรานิยมใช้สูตรนี้ในการลดรูปพหุนาม โดยมองตัวหน้าเป็นกล่องยกกำลังสองและตัวหลังเป็นกล่องยกกำลังสอง เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4 font-mono text-sm">
          <li>x² - 16 = x² - 4² = (x - 4)(x + 4)</li>
          <li>4x² - 9 = (2x)² - 3² = (2x - 3)(2x + 3)</li>
          <li>3x² - 5 = (√3x)² - (√5)² = (√3x - √5)(√3x + √5)</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ประโยชน์ในการคำนวณทางลัดเชิงตัวเลข</h3>
        <p className="mb-4">
          เราสามารถใช้ความสัมพันธ์ของผลต่างกำลังสองในการคิดเลขในใจได้อย่างรวดเร็วมาก เช่น การคำนวณ $99 \times 101$:
          แทนที่จะตั้งคูณแบบดั้งเดิม ให้เรามองเป็น $(100 - 1)(100 + 1)$
          จากนั้นแปลงกลับเป็นผลต่างกำลังสอง: $100^2 - 1^2$
          ซึ่งก็คือ $10,000 - 1 = 9,999$ เป็นทางลัดการคิดคำนวณที่มีประสิทธิภาพและลดความผิดพลาดในการคิดคำนวณลงอย่างมหาศาล
        </p>
      </article>
    </div>
  );
}
