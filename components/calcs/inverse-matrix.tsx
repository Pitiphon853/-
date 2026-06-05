"use client";

import React, { useState } from 'react';
import { Calculator, Info, AlertTriangle, RefreshCw, Grid } from 'lucide-react';

export default function InverseMatrix({ lang }: any) {
  const isEN = lang === 'en';
  
  // Matrix cells:
  // [ a  b ]
  // [ c  d ]
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');

  const [det, setDet] = useState<number | null>(null);
  const [inverse, setInverse] = useState<{ a: number; b: number; c: number; d: number } | null>(null);
  const [error, setError] = useState<string>('');
  const [showSteps, setShowSteps] = useState<boolean>(false);

  const t = {
    title: isEN ? '2x2 Inverse Matrix Calculator' : 'เครื่องมือคำนวณหาอินเวอร์สเมทริกซ์ 2x2',
    desc: isEN ? 'Find the multiplicative inverse of any 2x2 matrix with step-by-step calculations.' : 'คำนวณหาอินเวอร์สการคูณของเมทริกซ์มิติ 2x2 พร้อมแสดงขั้นตอนวิธีคิดอย่างละเอียด',
    matrixInput: isEN ? 'Enter Matrix A Elements:' : 'กรอกสมาชิกของเมทริกซ์ A:',
    btnCalculate: isEN ? 'Calculate Inverse' : 'คำนวณอินเวอร์ส',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    detResult: isEN ? 'Determinant (det A)' : 'ดีเทอร์มิแนนต์ (det A)',
    inverseResult: isEN ? 'Inverse Matrix (A⁻¹)' : 'อินเวอร์สเมทริกซ์ (A⁻¹)',
    invalidInputs: isEN ? 'Please enter valid numbers for all 4 cells.' : 'กรุณากรอกตัวเลขที่ถูกต้องให้ครบทั้ง 4 ช่อง',
    zeroDetError: isEN ? 'Determinant is 0. This matrix is singular (non-invertible) and has no inverse.' : 'ดีเทอร์มิแนนต์มีค่าเป็น 0 เมทริกซ์นี้เป็นเมทริกซ์เอกฐาน (Singular Matrix) จึงไม่มีอินเวอร์สการคูณ',
    stepTitle: isEN ? 'Step-by-Step Explanation:' : 'วิธีทำทีละขั้นตอน:',
  };

  const handleCalculate = () => {
    setError('');
    setDet(null);
    setInverse(null);
    setShowSteps(false);

    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    const valD = parseFloat(d);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC) || isNaN(valD)) {
      setError(t.invalidInputs);
      return;
    }

    const calculatedDet = valA * valD - valB * valC;
    setDet(calculatedDet);

    if (calculatedDet === 0) {
      setError(t.zeroDetError);
      return;
    }

    // A^-1 = (1 / det) * [ d  -b ]
    //                     [ -c  a ]
    const invA = valD / calculatedDet;
    const invB = -valB / calculatedDet;
    const invC = -valC / calculatedDet;
    const invD = valA / calculatedDet;

    setInverse({ a: invA, b: invB, c: invC, d: invD });
    setShowSteps(true);
  };

  const handleClear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setDet(null);
    setInverse(null);
    setError('');
    setShowSteps(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Grid className="w-8 h-8 text-indigo-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-indigo-100 opacity-90">{t.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 text-lg">{t.matrixInput}</h3>
              <div className="grid grid-cols-2 gap-4 max-w-[280px] mx-auto md:mx-0 p-4 bg-gray-50 rounded-2xl border border-gray-200 relative">
                {/* Visual bracket lines for Matrix notation */}
                <div className="absolute left-1 top-2 bottom-2 w-2 border-l-2 border-t-2 border-b-2 border-gray-400 rounded-l"></div>
                <div className="absolute right-1 top-2 bottom-2 w-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r"></div>
                
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="a"
                  className="w-full text-center py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-lg font-bold"
                />
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="b"
                  className="w-full text-center py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-lg font-bold"
                />
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="c"
                  className="w-full text-center py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-lg font-bold"
                />
                <input
                  type="number"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  placeholder="d"
                  className="w-full text-center py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-lg font-bold"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm max-w-[280px] mx-auto md:mx-0">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 justify-start max-w-[280px] mx-auto md:mx-0">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Calculator className="w-4 h-4" />
                  {t.btnCalculate}
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium p-3 rounded-xl transition-colors flex items-center justify-center"
                  title={t.btnReset}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {det !== null && (
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <p className="text-sm font-semibold text-gray-500">{t.detResult}</p>
                  <p className="text-2xl font-bold text-indigo-700 font-mono">
                    det(A) = {det}
                  </p>
                </div>
              )}

              {inverse !== null && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-3">{t.inverseResult}</p>
                  <div className="grid grid-cols-2 gap-4 max-w-[240px] p-4 bg-white rounded-xl border border-gray-300 relative">
                    <div className="absolute left-1 top-2 bottom-2 w-2 border-l-2 border-t-2 border-b-2 border-gray-400 rounded-l"></div>
                    <div className="absolute right-1 top-2 bottom-2 w-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r"></div>
                    
                    <div className="text-center font-mono text-lg font-bold text-indigo-800 py-2">
                      {Number(inverse.a.toFixed(4))}
                    </div>
                    <div className="text-center font-mono text-lg font-bold text-indigo-800 py-2">
                      {Number(inverse.b.toFixed(4))}
                    </div>
                    <div className="text-center font-mono text-lg font-bold text-indigo-800 py-2">
                      {Number(inverse.c.toFixed(4))}
                    </div>
                    <div className="text-center font-mono text-lg font-bold text-indigo-800 py-2">
                      {Number(inverse.d.toFixed(4))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          {showSteps && det !== null && inverse !== null && (
            <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-950">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                {t.stepTitle}
              </h3>
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <p>
                  1. คำนวณหาค่า Determinant (ดีเทอร์มิแนนต์):<br />
                  &nbsp;&nbsp;&nbsp;det(A) = (a × d) - (b × c)<br />
                  &nbsp;&nbsp;&nbsp;det(A) = ({a} × {d}) - ({b} × {c}) = {det}
                </p>
                <p>
                  2. สลับตำแหน่งสมาชิกแนวทแยงหลัก (a กับ d) และสลับเครื่องหมายแนวทแยงรอง (b กับ c):<br />
                  &nbsp;&nbsp;&nbsp;Adj(A) = [ d &nbsp;-b ] = [ {d} &nbsp;{-parseFloat(b)} ]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ -c &nbsp;&nbsp;a ] &nbsp;&nbsp;[ {-parseFloat(c)} &nbsp;&nbsp;{a} ]
                </p>
                <p>
                  3. คูณเมทริกซ์ Adj(A) ด้วยเศษส่วน 1 / det(A):<br />
                  &nbsp;&nbsp;&nbsp;A⁻¹ = 1 / {det} × [ {d} &nbsp;{-parseFloat(b)} ]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ {-parseFloat(c)} &nbsp;&nbsp;{a} ]
                </p>
                <p>
                  &nbsp;&nbsp;&nbsp;A⁻¹ = [ {d}/{det} &nbsp;{-parseFloat(b)}/{det} ] = [ {Number(inverse.a.toFixed(4))} &nbsp;{Number(inverse.b.toFixed(4))} ]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ {-parseFloat(c)}/{det} &nbsp;&nbsp;{a}/{det} ] &nbsp;&nbsp;[ {Number(inverse.c.toFixed(4))} &nbsp;{Number(inverse.d.toFixed(4))} ]
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-indigo max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-indigo-600" />
          อินเวอร์สเมทริกซ์ (Inverse Matrix) คืออะไร? เรียนรู้วิธีหาตัวผกผันการคูณของเมทริกซ์ 2x2
        </h2>
        
        <p>
          ในพีชคณิตเชิงเส้น (Linear Algebra) <strong>อินเวอร์สของเมทริกซ์ (Inverse of a Matrix)</strong> หรือที่เรียกว่า เมทริกซ์ตัวผกผันการคูณ เปรียบเสมือนตัวส่วนกลับ (Reciprocal) ในการคำนวณจำนวนจริงปกติ ตัวอย่างเช่น ส่วนกลับของเลข 5 คือ 1/5 ซึ่งเมื่อนำมาคูณกันจะได้ผลลัพธ์เป็น 1 ทำนองเดียวกันสำหรับเมทริกซ์จัตุรัส A หากมีเมทริกซ์ A⁻¹ (อ่านว่า A อินเวอร์ส) ที่มีสมบัติว่าเมื่อนำไปคูณกับเมทริกซ์ A แล้วจะได้เมทริกซ์เอกลักษณ์ (Identity Matrix, I) นั่นคือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          A × A⁻¹ = A⁻¹ × A = I
        </div>
        <p>
          โดยที่เมทริกซ์เอกลักษณ์สำหรับมิติ 2x2 คือเมทริกซ์ที่มีสมาชิกแนวทแยงหลักเป็น 1 และสมาชิกตัวอื่นเป็น 0 หรือเขียนในรูป <code>I = [[1, 0], [0, 1]]</code>
        </p>

        <h3>สูตรคำนวณหาอินเวอร์สของเมทริกซ์ขนาด 2x2</h3>
        <p>
          กำหนดให้เมทริกซ์ A มิติ 2x2 มีสมาชิกดังนี้:<br />
          <code>A = [[a, b], [c, d]]</code><br />
          อินเวอร์สการคูณของเมทริกซ์ A จะหาได้จากสูตร:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-md">
          A⁻¹ = (1 / det(A)) × [[d, -b], [-c, a]]
        </div>
        <p>
          เมื่อ <code>det(A)</code> คือ ค่าดีเทอร์มิแนนต์ (Determinant) ของเมทริกซ์ A ซึ่งมีค่าเท่ากับ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-md">
          det(A) = ad - bc (คูณลง - คูณขึ้น)
        </div>

        <h3>เงื่อนไขการมีอินเวอร์สการคูณ</h3>
        <p>
          สิ่งที่สำคัญที่สุดในการหาอินเวอร์สเมทริกซ์คือ การตรวจสอบค่าดีเทอร์มิแนนต์ (det) โดยค่าดีเทอร์มิแนนต์จะบอกคุณสมบัติของเมทริกซ์ได้ดังนี้:
        </p>
        <ul>
          <li><strong>เมทริกซ์ไม่เอกฐาน (Non-Singular Matrix):</strong> คือเมทริกซ์ที่มีค่า <code>det(A) ≠ 0</code> เมทริกซ์ในกลุ่มนี้จะมีอินเวอร์สการคูณเสมอ</li>
          <li><strong>เมทริกซ์เอกฐาน (Singular Matrix):</strong> คือเมทริกซ์ที่มีค่า <code>det(A) = 0</code> เมทริกซ์ชนิดนี้ <strong>จะไม่มีอินเวอร์สการคูณ</strong> เนื่องจากไม่สามารถนำ 0 ไปเป็นตัวส่วน (1 / 0) ในสูตรคำนวณคณิตศาสตร์ได้</li>
        </ul>

        <h3>ประโยชน์และการประยุกต์ใช้งานในทางปฏิบัติ</h3>
        <p>
          การหาอินเวอร์สเมทริกซ์มีประโยชน์อย่างยิ่งในการคำนวณหาค่าตัวแปรในระบบสมการเชิงเส้นหลายตัวแปร (Systems of Linear Equations) ซึ่งเขียนในรูปสมการเมทริกซ์ <code>AX = B</code> เราสามารถแก้สมการเพื่อหาคำตอบของกลุ่มตัวแปร X ได้อย่างรวดเร็วโดยคำนวณจากสูตร <code>X = A⁻¹B</code> นอกจากนี้ เมทริกซ์และตัวผกผันยังถูกใช้เป็นวงกว้างในวิศวกรรมคอมพิวเตอร์กราฟิกส์ 3 มิติ เพื่อทำการแปลงพิกัด (Transformations), การหมุนวัตถุ (Rotation), และการบีบย่อหรือขยายขนาดรูปทรงบนหน้าจอคอมพิวเตอร์
        </p>
      </article>
    </div>
  );
}
