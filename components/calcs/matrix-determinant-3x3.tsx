import React, { useState } from 'react';
import { Calculator, RotateCcw, Info, Hash, Grid3X3 } from 'lucide-react';

export default function MatrixDeterminant3x3({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [matrix, setMatrix] = useState({
    a11: '', a12: '', a13: '',
    a21: '', a22: '', a23: '',
    a31: '', a32: '', a33: '',
  });

  const handleInputChange = (name: keyof typeof matrix, val: string) => {
    if (/^-?\d*\.?\d*$/.test(val)) {
      setMatrix(prev => ({ ...prev, [name]: val }));
    }
  };

  const handleReset = () => {
    setMatrix({
      a11: '', a12: '', a13: '',
      a21: '', a22: '', a23: '',
      a31: '', a32: '', a33: '',
    });
  };

  const handleRandom = () => {
    setMatrix({
      a11: (Math.floor(Math.random() * 15) - 7).toString(),
      a12: (Math.floor(Math.random() * 15) - 7).toString(),
      a13: (Math.floor(Math.random() * 15) - 7).toString(),
      a21: (Math.floor(Math.random() * 15) - 7).toString(),
      a22: (Math.floor(Math.random() * 15) - 7).toString(),
      a23: (Math.floor(Math.random() * 15) - 7).toString(),
      a31: (Math.floor(Math.random() * 15) - 7).toString(),
      a32: (Math.floor(Math.random() * 15) - 7).toString(),
      a33: (Math.floor(Math.random() * 15) - 7).toString(),
    });
  };

  // Parsing values
  const n11 = parseFloat(matrix.a11) || 0;
  const n12 = parseFloat(matrix.a12) || 0;
  const n13 = parseFloat(matrix.a13) || 0;
  const n21 = parseFloat(matrix.a21) || 0;
  const n22 = parseFloat(matrix.a22) || 0;
  const n23 = parseFloat(matrix.a23) || 0;
  const n31 = parseFloat(matrix.a31) || 0;
  const n32 = parseFloat(matrix.a32) || 0;
  const n33 = parseFloat(matrix.a33) || 0;

  const hasInput = Object.values(matrix).some(v => v !== '');

  // Cofactor expansion along first row:
  // det = a11*C11 + a12*C12 + a13*C13
  // C11 = +1 * (a22*a33 - a23*a32)
  // C12 = -1 * (a21*a33 - a23*a31)
  // C13 = +1 * (a21*a32 - a22*a31)

  const m11 = n22 * n33 - n23 * n32;
  const m12 = n21 * n33 - n23 * n31;
  const m13 = n21 * n32 - n22 * n31;

  const term1 = n11 * m11;
  const term2 = -n12 * m12;
  const term3 = n13 * m13;

  const determinantValue = term1 + term2 + term3;
  const isSingular = determinantValue === 0;

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) return num.toString();
    return parseFloat(num.toFixed(4)).toString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Main UI Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Grid3X3 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {isTH ? 'เครื่องมือคำนวณดีเทอร์มิแนนต์เมทริกซ์ 3x3' : '3x3 Matrix Determinant Calculator'}
              </h2>
              <p className="text-sm text-gray-500">
                {isTH ? 'หาค่า Determinant ของเมทริกซ์ 3x3 พร้อมการกระจายโคแฟกเตอร์' : 'Compute the determinant of a 3x3 matrix step-by-step'}
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

        {/* Matrix Inputs & Visual Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-500 mb-2">Matrix A (3x3)</span>
            
            {/* Brackets */}
            <div className="relative flex items-center px-5 py-6 bg-gray-50/55 rounded-xl border border-gray-100">
              <div className="absolute left-1 top-0 bottom-0 w-3 border-t-2 border-b-2 border-l-2 border-gray-800 rounded-l-md"></div>
              
              <div className="grid grid-cols-3 gap-3 w-64">
                {/* Row 1 */}
                <input
                  type="text"
                  value={matrix.a11}
                  onChange={(e) => handleInputChange('a11', e.target.value)}
                  placeholder="a₁₁"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a12}
                  onChange={(e) => handleInputChange('a12', e.target.value)}
                  placeholder="a₁₂"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a13}
                  onChange={(e) => handleInputChange('a13', e.target.value)}
                  placeholder="a₁₃"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                {/* Row 2 */}
                <input
                  type="text"
                  value={matrix.a21}
                  onChange={(e) => handleInputChange('a21', e.target.value)}
                  placeholder="a₂₁"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a22}
                  onChange={(e) => handleInputChange('a22', e.target.value)}
                  placeholder="a₂₂"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a23}
                  onChange={(e) => handleInputChange('a23', e.target.value)}
                  placeholder="a₂₃"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                {/* Row 3 */}
                <input
                  type="text"
                  value={matrix.a31}
                  onChange={(e) => handleInputChange('a31', e.target.value)}
                  placeholder="a₃₁"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a32}
                  onChange={(e) => handleInputChange('a32', e.target.value)}
                  placeholder="a₃₂"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={matrix.a33}
                  onChange={(e) => handleInputChange('a33', e.target.value)}
                  placeholder="a₃₃"
                  className="w-full text-center py-2.5 bg-white font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="absolute right-1 top-0 bottom-0 w-3 border-t-2 border-b-2 border-r-2 border-gray-800 rounded-r-md"></div>
            </div>
          </div>

          {/* Quick Explanation */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-indigo-800 flex items-center gap-2">
              <Info size={18} />
              {isTH ? 'วิธีกระจายตัวประกอบร่วมเกี่ยว (Cofactor Expansion)' : 'Cofactor Expansion Method'}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
              <p>
                {isTH ? (
                  <span>
                    การคำนวณทำได้โดยการเลือกแถวที่ 1 แล้วหาดีเทอร์มิแนนต์ของเมทริกซ์ย่อย 2x2 (Minor) ดังนี้:
                  </span>
                ) : (
                  <span>
                    The determinant of a 3x3 matrix can be calculated using cofactor expansion along the first row:
                  </span>
                )}
              </p>
              <div className="font-mono bg-white p-2.5 rounded border border-indigo-100 text-xs">
                det(A) = a₁₁ × M₁₁ - a₁₂ × M₁₂ + a₁₃ × M₁₃
              </div>
              <p className="text-xs text-gray-500">
                {isTH ? '*โปรดระวังเครื่องหมายลบหน้าพจน์กลาง (a₁₂)' : '*Notice the negative sign in front of the second term (a₁₂).'}
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {hasInput && (
          <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {isTH ? 'ผลการคำนวณ' : 'Calculation Result'}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-gray-500 font-mono text-lg">det(A) =</span>
                <span className="text-4xl font-black text-indigo-600">{formatNumber(determinantValue)}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <Hash size={16} />
                {isTH ? 'แสดงวิธีทำตามขั้นตอน' : 'Step-by-Step Breakdown'}
              </h4>

              <div className="space-y-4 text-sm text-gray-600 font-mono">
                {/* Step 1: Minor Determinants */}
                <div className="space-y-2">
                  <span className="text-indigo-600 font-bold">1. {isTH ? 'คำนวณไมเนอร์ (Minor 2x2):' : 'Calculate 2x2 Minors:'}</span>
                  <div className="pl-4 space-y-3">
                    {/* Minor 11 */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <span>
                        M₁₁ = det | {n22} {n23} | <br className="sm:hidden" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| {n32} {n33} |
                      </span>
                      <span>= ({n22} × {n33}) - ({n23} × {n32}) = {formatNumber(m11)}</span>
                    </div>

                    {/* Minor 12 */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <span>
                        M₁₂ = det | {n21} {n23} | <br className="sm:hidden" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| {n31} {n33} |
                      </span>
                      <span>= ({n21} × {n33}) - ({n23} × {n31}) = {formatNumber(m12)}</span>
                    </div>

                    {/* Minor 13 */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <span>
                        M₁₃ = det | {n21} {n22} | <br className="sm:hidden" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| {n31} {n32} |
                      </span>
                      <span>= ({n21} × {n32}) - ({n22} × {n31}) = {formatNumber(m13)}</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Combine terms */}
                <div>
                  <span className="text-indigo-600 font-bold">2. {isTH ? 'แทนค่าลงในสมการขยายโคแฟกเตอร์:' : 'Substitute back into Cofactor equation:'}</span>
                  <div className="pl-4 mt-1 space-y-1">
                    <div>
                      det(A) = a₁₁ × M₁₁ - a₁₂ × M₁₂ + a₁₃ × M₁₃
                    </div>
                    <div className="text-indigo-900 font-semibold">
                      det(A) = ({n11} × {formatNumber(m11)}) - ({n12} × {formatNumber(m12)}) + ({n13} × {formatNumber(m13)})
                    </div>
                    <div>
                      det(A) = {formatNumber(term1)} - ({formatNumber(n12 * m12)}) + {formatNumber(term3)}
                    </div>
                  </div>
                </div>

                {/* Step 3: Final Answer */}
                <div className="pt-3 border-t border-gray-200 font-bold text-gray-800 text-base">
                  det(A) = {formatNumber(determinantValue)}
                </div>
              </div>
            </div>

            {/* Matrix Properties */}
            <div className="p-4 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">
                {isTH ? 'คุณสมบัติของเมทริกซ์นี้' : 'Matrix Properties'}
              </h4>
              <p className="text-sm text-gray-600">
                {isTH ? (
                  <span>
                    เมทริกซ์ A นี้คือ <strong>{isSingular ? 'เมทริกซ์เอกฐาน (Singular Matrix)' : 'เมทริกซ์ไม่เอกฐาน (Non-singular Matrix)'}</strong> เพราะค่าดีเทอร์มิแนนต์เท่ากับ {formatNumber(determinantValue)} ซึ่ง {isSingular ? 'เป็น 0' : 'ไม่เท่ากับ 0'}{' '}
                    {isSingular ? 'ส่งผลให้ไม่สามารถคำนวณอินเวอร์สได้' : 'ทำให้สามารถคำนวณหาอินเวอร์ส (Inverse Matrix) ได้'}
                  </span>
                ) : (
                  <span>
                    This matrix is a <strong>{isSingular ? 'Singular Matrix' : 'Non-singular Matrix'}</strong> because its determinant is {formatNumber(determinantValue)} which is {isSingular ? 'equal to' : 'not equal to'} 0. It is {isSingular ? 'non-invertible' : 'invertible'}.
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SEO Optimized Thai Article */}
      <article className="prose prose-indigo max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การหาดีเทอร์มิแนนต์ของเมทริกซ์ 3x3 (Determinant 3x3) อย่างละเอียด
        </h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในคณิตศาสตร์ระดับมัธยมปลายและระดับมหาวิทยาลัย <strong>เมทริกซ์ขนาด 3x3</strong> เป็นหนึ่งในเมทริกซ์ที่มีบทบาทสำคัญและใช้กันบ่อยมากที่สุด ทั้งในการคำนวณเวกเตอร์ในระบบพิกัดฉาก 3 มิติ และการแก้ระบบสมการเชิงเส้นที่มีสามตัวแปร การทำความเข้าใจวิธีการคำนวณ <strong>ดีเทอร์มิแนนต์ (Determinant)</strong> ของเมทริกซ์ 3x3 จึงเป็นพื้นฐานที่สำคัญยิ่งในการเรียนรู้วิชาพีชคณิตเชิงเส้น (Linear Algebra)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          วิธีการคำนวณดีเทอร์มิแนนต์ของเมทริกซ์ 3x3
        </h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          มีวิธีการยอดนิยมอยู่ 2 วิธีในการหาค่าดีเทอร์มิแนนต์ของเมทริกซ์ขนาด 3x3 ซึ่งให้ผลลัพธ์เท่ากันเสมอ ผู้เรียนสามารถเลือกใช้ตามความเหมาะสมและสะดวกดังนี้:
        </p>

        <h4 className="text-lg font-bold text-indigo-700 mt-4 mb-2">
          วิธีที่ 1: กฎของซาร์รัส (Sarrus&apos; Rule) หรือการต่อคอลัมน์
        </h4>
        <p className="mb-4 text-gray-700 leading-relaxed">
          วิธีนี้ง่ายและจดจำง่ายทางภาพ โดยมีขั้นตอนดังต่อไปนี้:
        </p>
        <ul className="list-decimal pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li>นำคอลัมน์ที่ 1 และ 2 ของเมทริกซ์มาเขียนต่อท้ายคอลัมน์ที่ 3 ทางด้านขวา</li>
          <li>คำนวณผลคูณตามเส้นทแยงมุมลงทั้ง 3 เส้น แล้วนำมาบวกกัน (เรียกว่าผลคูณทแยงมุมลง)</li>
          <li>คำนวณผลคูณตามเส้นทแยงมุมขึ้นทั้ง 3 เส้น แล้วนำมาบวกกัน (เรียกว่าผลคูณทแยงมุมขึ้น)</li>
          <li>นำผลรวมของคูณลง ลบด้วยผลรวมของคูณขึ้น สูตรจะเป็นดังนี้: <br />
            <span className="font-mono font-bold block bg-gray-50 p-2 text-center rounded my-2 text-gray-800">
              det(A) = (คูณลง₁ + คูณลง₂ + คูณลง₃) - (คูณขึ้น₁ + คูณขึ้น₂ + คูณขึ้น₃)
            </span>
          </li>
        </ul>

        <h4 className="text-lg font-bold text-indigo-700 mt-4 mb-2">
          วิธีที่ 2: การกระจายโคแฟกเตอร์ (Cofactor Expansion)
        </h4>
        <p className="mb-4 text-gray-700 leading-relaxed">
          วิธีนี้มีความเป็นสากลและเป็นระบบมากที่สุด เพราะเป็นวิธีหลักที่สามารถนำไปใช้กับเมทริกซ์ขนาดใหญ่ขึ้นได้ (เช่น 4x4, 5x5 เป็นต้น) โดยสำหรับเมทริกซ์ 3x3 เมื่อเรากระจายตามแถวที่ 1 สูตรคำนวณจะเป็นดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-indigo-900">
          det(A) = a₁₁ × det(M₁₁) - a₁₂ × det(M₁₂) + a₁₃ × det(M₁₃)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          โดยที่ M₁₁, M₁₂, M₁₃ คือ <strong>ไมเนอร์ (Minor)</strong> ของสมาชิกแต่ละตัว ซึ่งเป็นเมทริกซ์ขนาด 2x2 ที่เหลืออยู่หลังจากทำการตัดแถวและคอลัมน์ของสมาชิกนั้นๆ ออกไป เช่น:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>M₁₁</strong> ได้จากการตัดแถวที่ 1 และคอลัมน์ที่ 1</li>
          <li><strong>M₁₂</strong> ได้จากการตัดแถวที่ 1 และคอลัมน์ที่ 2</li>
          <li><strong>M₁₃</strong> ได้จากการตัดแถวที่ 1 และคอลัมน์ที่ 3</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">
          เมื่อคำนวณดีเทอร์มิแนนต์ของไมเนอร์ซึ่งเป็นเมทริกซ์ 2x2 แล้วนำไปคูณกลับเข้ากับสัมประสิทธิ์ a ของแถวแรกตามโครงสร้างสูตรที่มีเครื่องหมายบวกลบสลับกัน ก็จะได้ค่าดีเทอร์มิแนนต์ 3x3 ออกมาทันที
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ความหมายเชิงเรขาคณิตและการประยุกต์ใช้งาน
        </h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ดีเทอร์มิแนนต์ของเมทริกซ์ 3x3 มีความหมายทางเรขาคณิตที่ลึกซึ้ง นั่นคือค่าสัมบูรณ์ของดีเทอร์มิแนนต์เท่ากับ <strong>ปริมาตรของรูปทรงสี่เหลี่ยมหน้าขนาน (Volume of a Parallelepiped)</strong> ในมิติ 3 มิติ ที่สร้างขึ้นโดยเวกเตอร์สามมิติจำนวนสามตัวที่เป็นสมาชิกในคอลัมน์หรือแถวของเมทริกซ์นั้นๆ
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในวิชาวิศวกรรมและฟิสิกส์ ดีเทอร์มิแนนต์ 3x3 ถูกนำมาใช้ในการคำนวณผลคูณเชิงเวกเตอร์ (Cross Product) ของเวกเตอร์ในระบบ 3 มิติ และนำมาใช้ในการแก้ปัญหาทางจลนศาสตร์และโครงสร้าง นอกจากนี้ยังทำหน้าที่เป็นส่วนสำคัญในระบบภาพกราฟิกสามมิติ (3D computer graphics) เพื่อหมุน ย่อ ขยาย หรือแปลงพิกัดของออบเจกต์ในแบบเรียลไทม์
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ข้อดีของการใช้เครื่องมือคำนวณออนไลน์
        </h3>
        <p className="text-gray-700 leading-relaxed">
          การคำนวณดีเทอร์มิแนนต์ขนาด 3x3 ด้วยมือนั้น มักทำให้เกิดความผิดพลาดได้ง่ายมากเนื่องจากการคูณเลขติดลบและการสลับเครื่องหมายบวกลบในสูตร เครื่องคิดเลขดีเทอร์มิแนนต์ 3x3 ของเราไม่เพียงแต่ให้คำตอบที่รวดเร็วทันใจ แต่ยังแสดงรายละเอียดวิธีทำทีละขั้นตอนอย่างโปร่งใส ช่วยให้ผู้เรียนตรวจสอบได้ว่าเกิดข้อผิดพลาดตรงจุดใดในการฝึกทำโจทย์ เป็นเครื่องมือเพื่อการศึกษาและการทำงานระดับมืออาชีพอย่างแท้จริง
        </p>
      </article>
    </div>
  );
}
