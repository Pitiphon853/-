import React, { useState } from 'react';
import { Calculator, RotateCcw, Info, Hash } from 'lucide-react';

export default function MatrixDeterminant2x2({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [matrix, setMatrix] = useState({
    a11: '',
    a12: '',
    a21: '',
    a22: '',
  });

  const handleInputChange = (name: keyof typeof matrix, val: string) => {
    // Allows decimal points and negative signs
    if (/^-?\d*\.?\d*$/.test(val)) {
      setMatrix(prev => ({ ...prev, [name]: val }));
    }
  };

  const handleReset = () => {
    setMatrix({
      a11: '',
      a12: '',
      a21: '',
      a22: '',
    });
  };

  const handleRandom = () => {
    setMatrix({
      a11: (Math.floor(Math.random() * 19) - 9).toString(),
      a12: (Math.floor(Math.random() * 19) - 9).toString(),
      a21: (Math.floor(Math.random() * 19) - 9).toString(),
      a22: (Math.floor(Math.random() * 19) - 9).toString(),
    });
  };

  // Convert inputs to numbers
  const n11 = parseFloat(matrix.a11) || 0;
  const n12 = parseFloat(matrix.a12) || 0;
  const n21 = parseFloat(matrix.a21) || 0;
  const n22 = parseFloat(matrix.a22) || 0;

  // Check if there is some input to calculate
  const hasInput = matrix.a11 !== '' || matrix.a12 !== '' || matrix.a21 !== '' || matrix.a22 !== '';

  // det(A) = a11 * a22 - a12 * a21
  const diag1 = n11 * n22;
  const diag2 = n12 * n21;
  const determinantValue = diag1 - diag2;

  // Inverse matrix calculation for bonus info
  const isSingular = determinantValue === 0;
  const inv11 = isSingular ? 0 : n22 / determinantValue;
  const inv12 = isSingular ? 0 : -n12 / determinantValue;
  const inv21 = isSingular ? 0 : -n21 / determinantValue;
  const inv22 = isSingular ? 0 : n11 / determinantValue;

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) return num.toString();
    return parseFloat(num.toFixed(4)).toString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Calculator size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {isTH ? 'เครื่องมือคำนวณดีเทอร์มิแนนต์เมทริกซ์ 2x2' : '2x2 Matrix Determinant Calculator'}
              </h2>
              <p className="text-sm text-gray-500">
                {isTH ? 'หาค่า Determinant (det) ของเมทริกซ์ขนาด 2 มิติ' : 'Find the determinant (det) of a 2D matrix'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRandom}
              className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              {isTH ? 'สุ่มตัวเลข' : 'Random'}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title={isTH ? 'ล้างข้อมูล' : 'Reset'}
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Matrix Input Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-500 mb-2">Matrix A</span>
            
            {/* Matrix brackets container */}
            <div className="relative flex items-center px-4 py-6 bg-gray-50/50 rounded-xl border border-gray-100">
              {/* Left bracket */}
              <div className="absolute left-1 top-0 bottom-0 w-3 border-t-2 border-b-2 border-l-2 border-gray-800 rounded-l-md"></div>
              
              {/* Inputs Grid */}
              <div className="grid grid-cols-2 gap-4 w-48">
                <div>
                  <input
                    type="text"
                    value={matrix.a11}
                    onChange={(e) => handleInputChange('a11', e.target.value)}
                    placeholder="a₁₁"
                    className="w-full text-center py-3 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={matrix.a12}
                    onChange={(e) => handleInputChange('a12', e.target.value)}
                    placeholder="a₁₂"
                    className="w-full text-center py-3 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={matrix.a21}
                    onChange={(e) => handleInputChange('a21', e.target.value)}
                    placeholder="a₂₁"
                    className="w-full text-center py-3 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={matrix.a22}
                    onChange={(e) => handleInputChange('a22', e.target.value)}
                    placeholder="a₂₂"
                    className="w-full text-center py-3 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Right bracket */}
              <div className="absolute right-1 top-0 bottom-0 w-3 border-t-2 border-b-2 border-r-2 border-gray-800 rounded-r-md"></div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2">
              <Info size={18} />
              {isTH ? 'การคำนวณเมทริกซ์ 2x2' : '2x2 Matrix Calculation'}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isTH ? (
                <span>
                  ดีเทอร์มิแนนต์ของเมทริกซ์ 2x2 หาได้จากสูตร: <br />
                  <strong className="font-mono text-blue-900">det(A) = (a₁₁ × a₂₂) - (a₁₂ × a₂₁)</strong> <br />
                  หรือเรียกว่า &quot;คูณลง ลบ คูณขึ้น&quot;
                </span>
              ) : (
                <span>
                  The determinant of a 2x2 matrix is computed as: <br />
                  <strong className="font-mono text-blue-900">det(A) = (a₁₁ × a₂₂) - (a₁₂ × a₂₁)</strong> <br />
                  often remembered as &quot;downward diagonal minus upward diagonal&quot;.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Results Section */}
        {hasInput && (
          <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {isTH ? 'ผลลัพธ์ (Result)' : 'Result'}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-gray-500 font-mono text-lg">det(A) = |A| =</span>
                <span className="text-4xl font-black text-blue-600">{formatNumber(determinantValue)}</span>
              </div>
            </div>

            {/* Step by Step Breakdown */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <Hash size={16} />
                {isTH ? 'แสดงวิธีทำอย่างละเอียด' : 'Detailed Calculation Steps'}
              </h4>

              <div className="space-y-3 text-sm text-gray-600 font-mono">
                {/* Step 1: Write variables */}
                <div>
                  <span className="text-blue-600 font-bold">1. {isTH ? 'แทนค่าจากเมทริกซ์:' : 'Identify values from the matrix:'}</span>
                  <div className="pl-4 mt-1 grid grid-cols-2 gap-x-8 max-w-xs">
                    <span>a₁₁ = {n11}</span>
                    <span>a₁₂ = {n12}</span>
                    <span>a₂₁ = {n21}</span>
                    <span>a₂₂ = {n22}</span>
                  </div>
                </div>

                {/* Step 2: Formula */}
                <div>
                  <span className="text-blue-600 font-bold">2. {isTH ? 'สูตรดีเทอร์มิแนนต์:' : 'Apply Formula:'}</span>
                  <div className="pl-4 mt-1">
                    det(A) = (a₁₁ × a₂₂) - (a₁₂ × a₂₁)
                  </div>
                </div>

                {/* Step 3: Calculation */}
                <div>
                  <span className="text-blue-600 font-bold">3. {isTH ? 'คำนวณผลคูณทแยงมุม:' : 'Multiply diagonals:'}</span>
                  <div className="pl-4 mt-1 space-y-1">
                    <div>{isTH ? 'คูณทแยงลง (a₁₁ × a₂₂):' : 'Downward Diagonal:'} {n11} × {n22} = {diag1}</div>
                    <div>{isTH ? 'คูณทแยงขึ้น (a₁₂ × a₂₁):' : 'Upward Diagonal:'} {n12} × {n21} = {diag2}</div>
                  </div>
                </div>

                {/* Step 4: Final Step */}
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-blue-600 font-bold">4. {isTH ? 'ผลรวม (คูณลง - คูณขึ้น):' : 'Subtract Upward from Downward:'}</span>
                  <div className="pl-4 mt-1 text-base font-bold text-gray-800">
                    det(A) = {diag1} - ({diag2}) = {formatNumber(determinantValue)}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info: Invertibility */}
            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
              <h4 className="font-semibold text-gray-800">
                {isTH ? 'คุณสมบัติของเมทริกซ์นี้' : 'Properties of this Matrix'}
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>
                  {isTH ? (
                    <span>
                      เนื่องจาก det(A) {isSingular ? 'เท่ากับ 0' : 'ไม่เท่ากับ 0'} เมทริกซ์นี้จึงเป็น{' '}
                      <strong>{isSingular ? 'เมทริกซ์เอกฐาน (Singular Matrix)' : 'เมทริกซ์ไม่เอกฐาน (Non-singular Matrix)'}</strong>
                    </span>
                  ) : (
                    <span>
                      Since det(A) is {isSingular ? 'equal to 0' : 'not equal to 0'}, this matrix is a{' '}
                      <strong>{isSingular ? 'Singular Matrix' : 'Non-singular Matrix'}</strong>.
                    </span>
                  )}
                </li>
                <li>
                  {isTH ? (
                    <span>
                      {isSingular 
                        ? 'เมทริกซ์นี้ไม่มีอินเวอร์สการคูณ (Inverse Matrix)' 
                        : `มีอินเวอร์สการคูณ (Inverse Matrix) ซึ่งมีค่าเท่ากับ:`}
                    </span>
                  ) : (
                    <span>
                      {isSingular 
                        ? 'This matrix has no multiplicative inverse.' 
                        : 'This matrix is invertible. Its inverse matrix A⁻¹ is:'}
                    </span>
                  )}
                  
                  {!isSingular && (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="font-mono text-xs">A⁻¹ =</span>
                      <div className="relative flex items-center px-3 py-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="absolute left-0.5 top-0 bottom-0 w-2 border-t border-b border-l border-gray-800 rounded-l"></div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-center">
                          <span className="w-14">{formatNumber(inv11)}</span>
                          <span className="w-14">{formatNumber(inv12)}</span>
                          <span className="w-14">{formatNumber(inv21)}</span>
                          <span className="w-14">{formatNumber(inv22)}</span>
                        </div>
                        <div className="absolute right-0.5 top-0 bottom-0 w-2 border-t border-b border-r border-gray-800 rounded-r"></div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* SEO Article */}
      <article className="prose prose-blue max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การหาดีเทอร์มิแนนต์ของเมทริกซ์ 2x2 (Matrix Determinant 2x2) คืออะไร?
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          ในวิชาพีชคณิตเชิงเส้น (Linear Algebra) <strong>ดีเทอร์มิแนนต์ (Determinant)</strong> หรือมักเขียนย่อว่า <strong>det</strong> คือค่าสเกลาร์ที่คำนวณได้จากเมทริกซ์จัตุรัส (Square Matrix) ค่าที่ได้นี้มีความสำคัญอย่างยิ่ง เนื่องจากเป็นตัวบ่งชี้หลักเกี่ยวกับคุณสมบัติทางเรขาคณิตและพีชคณิตของเมทริกซ์นั้นๆ สำหรับเมทริกซ์ขนาด 2x2 ซึ่งเป็นเมทริกซ์จัตุรัสที่มีขนาดเล็กที่สุดที่เป็นที่นิยมศึกษา การหาดีเทอร์มิแนนต์สามารถทำได้ง่าย รวดเร็ว และเป็นพื้นฐานที่สำคัญที่สุดก่อนที่จะขยับไปคำนวณในเมทริกซ์ที่มีมิติสูงขึ้น เช่น เมทริกซ์ขนาด 3x3 หรือ 4x4
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณดีเทอร์มิแนนต์ของเมทริกซ์ 2x2</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          กำหนดให้เมทริกซ์ A มีมิติ 2x2 ดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-gray-800">
          A = [ [a₁₁, a₁₂], [a₂₁, a₂₂] ]
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          สูตรในการหาดีเทอร์มิแนนต์ของเมทริกซ์ A (เขียนแทนด้วย det(A) หรือ |A|) คือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-blue-900">
          det(A) = |A| = (a₁₁ × a₂₂) - (a₁₂ × a₂₁)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          กฎการคำนวณง่ายๆ ที่เรามักใช้ในการจดจำสูตรนี้คือ <strong>&quot;คูณลง ลบ คูณขึ้น&quot;</strong> โดยที่:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-1">
          <li><strong>คูณทแยงมุมลง:</strong> นำสมาชิกในแถวที่ 1 คอลัมน์ที่ 1 คูณกับ สมาชิกในแถวที่ 2 คอลัมน์ที่ 2 นั่นคือ (a₁₁ × a₂₂)</li>
          <li><strong>คูณทแยงมุมขึ้น:</strong> นำสมาชิกในแถวที่ 2 คอลัมน์ที่ 1 คูณกับ สมาชิกในแถวที่ 1 คอลัมน์ที่ 2 นั่นคือ (a₁₂ × a₂₁)</li>
          <li>นำผลการคูณทแยงมุมลงมาตั้ง แล้วลบด้วยผลการคูณทแยงมุมขึ้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณจริง</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          เพื่อให้เข้าใจการคำนวณอย่างลึกซึ้ง สมมติให้เมทริกซ์ B คือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-gray-800">
          B = [ [3, 7], [2, 5] ]
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          เมื่อทำตามสูตร &quot;คูณลง ลบ คูณขึ้น&quot;:
        </p>
        <ul className="list-decimal pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li>ผลคูณแนวทแยงลง = 3 × 5 = 15</li>
          <li>ผลคูณแนวทแยงขึ้น = 7 × 2 = 14</li>
          <li>คำนวณความแตกต่าง = 15 - 14 = 1</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ดังนั้น ค่าดีเทอร์มิแนนต์ของเมทริกซ์ B คือ det(B) = 1 ซึ่งสามารถนำไปใช้หาอินเวอร์สการคูณต่อไปได้ทันที
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความหมายทางเรขาคณิตของ Determinant</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในทางเรขาคณิต ค่าสัมบูรณ์ของดีเทอร์มิแนนต์ของเมทริกซ์ 2x2 คือ <strong>พื้นที่ของสี่เหลี่ยมด้านขนาน (Area of a Parallelogram)</strong> ที่ถูกสร้างขึ้นจากเวกเตอร์แถวหรือเวกเตอร์คอลัมน์ของเมทริกซ์นั้นๆ บนระนาบ 2 มิติ ตัวอย่างเช่น หากเรากำหนดเวกเตอร์สองตัวคือ u = [a₁₁, a₁₂] และ v = [a₂₁, a₂₂] พื้นที่สี่เหลี่ยมด้านขนานที่มีด้านประชิดเป็นเวกเตอร์ทั้งสองนี้จะมีขนาดเท่ากับ |det(A)| เสมอ
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          นอกจากนี้ เครื่องหมายของดีเทอร์มิแนนต์ (บวกหรือลบ) จะบ่งบอกถึงการวางทิศทาง (Orientation) ของเวกเตอร์ หากเป็นบวก หมายถึงทิศทางของเวกเตอร์เป็นไปในทิศทวนเข็มนาฬิกา และหากเป็นลบ จะเป็นทิศตามเข็มนาฬิกา
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ดีเทอร์มิแนนต์ในระบบสมการและการจำแนกเมทริกซ์</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ดีเทอร์มิแนนต์มีบทบาทสำคัญในการวิเคราะห์ระบบสมการเชิงเส้นและหาเมทริกซ์ผกผัน ดังนี้:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li>
            <strong>การตัดสินคุณสมบัติการมีอินเวอร์ส (Invertibility):</strong> เมทริกซ์ A จะมีเมทริกซ์ผกผันหรืออินเวอร์ส (A⁻¹) ก็ต่อเมื่อ det(A) ≠ 0 ถ้าหาก det(A) = 0 เราจะเรียกเมทริกซ์นั้นว่า <em>เมทริกซ์เอกฐาน (Singular Matrix)</em> ซึ่งไม่สามารถหาอินเวอร์สได้
          </li>
          <li>
            <strong>การแก้ระบบสมการเชิงเส้นโดยใช้กฎของคราเมอร์ (Cramer&apos;s Rule):</strong> ในระบบสมการที่มีจำนวนตัวแปรและสมการเท่ากัน เราสามารถใช้ดีเทอร์มิแนนต์หาค่าตัวแปรแต่ละตัวได้โดยตรงจากการแบ่งสัดส่วนดีเทอร์มิแนนต์ ซึ่งช่วยหลีกเลี่ยงกระบวนการกำจัดตัวแปรแบบเกาส์ (Gaussian Elimination) ที่อาจซับซ้อนในมิติต่ำๆ
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป</h3>
        <p className="text-gray-700 leading-relaxed">
          แม้ว่าดีเทอร์มิแนนต์ของเมทริกซ์ขนาด 2x2 จะเป็นเรื่องที่ดูง่ายและสั้น แต่เป็นเสาหลักทางคณิตศาสตร์ที่มีการประยุกต์ใช้อย่างแพร่หลายทั้งในระบบปัญญาประดิษฐ์ กราฟิกคอมพิวเตอร์ ฟิสิกส์วิเคราะห์ และวิศวกรรมไฟฟ้า การเลือกใช้เครื่องมือคำนวณอัตโนมัติจะช่วยประหยัดเวลา ตรวจสอบความถูกต้องของคำตอบ และช่วยให้ผู้เรียนมองเห็นภาพรวมของคำตอบและขั้นตอนการคำนวณได้อย่างชัดเจนเป็นระบบ
        </p>
      </article>
    </div>
  );
}
