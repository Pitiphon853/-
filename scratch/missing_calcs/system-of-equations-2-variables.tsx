import React, { useState } from 'react';
import { Calculator, Grid, RefreshCw, HelpCircle, BookOpen, Layers } from 'lucide-react';

export default function SystemOfEquations2Variables({ lang }: any) {
  const [a1, setA1] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  const [c1, setC1] = useState<string>('');
  const [a2, setA2] = useState<string>('');
  const [b2, setB2] = useState<string>('');
  const [c2, setC2] = useState<string>('');

  const [result, setResult] = useState<{
    x: number | null;
    y: number | null;
    D: number;
    Dx: number;
    Dy: number;
    status: 'unique' | 'none' | 'infinite';
    steps: string[];
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const valA1 = parseFloat(a1);
    const valB1 = parseFloat(b1);
    const valC1 = parseFloat(c1);
    const valA2 = parseFloat(a2);
    const valB2 = parseFloat(b2);
    const valC2 = parseFloat(c2);

    if (
      isNaN(valA1) || isNaN(valB1) || isNaN(valC1) ||
      isNaN(valA2) || isNaN(valB2) || isNaN(valC2)
    ) {
      setError(lang === 'th' ? 'กรุณากรอกสัมประสิทธิ์ให้ครบถ้วนทุกช่อง' : 'Please fill in all coefficients.');
      return;
    }

    // Determinants
    // D = a1*b2 - a2*b1
    // Dx = c1*b2 - c2*b1
    // Dy = a1*c2 - a2*c1
    const D = valA1 * valB2 - valA2 * valB1;
    const Dx = valC1 * valB2 - valC2 * valB1;
    const Dy = valA1 * valC2 - valA2 * valC1;

    const steps: string[] = [];
    if (lang === 'th') {
      steps.push(`1. ตั้งระบบสมการในรูปแบบมาตรฐาน:`);
      steps.push(`   สมการที่ 1: (${valA1})x + (${valB1})y = ${valC1}`);
      steps.push(`   สมการที่ 2: (${valA2})x + (${valB2})y = ${valC2}`);
      steps.push(`2. คำนวณหาดีเทอร์มิแนนต์ของเมทริกซ์สัมประสิทธิ์ (D):`);
      steps.push(`   D = (a1 &times; b2) - (a2 &times; b1) = (${valA1} &times; ${valB2}) - (${valA2} &times; ${valB1}) = ${valA1 * valB2} - ${valA2 * valB1} = ${D}`);
      steps.push(`3. คำนวณหาดีเทอร์มิแนนต์สำหรับตัวแปร x (Dx):`);
      steps.push(`   Dx = (c1 &times; b2) - (c2 &times; b1) = (${valC1} &times; ${valB2}) - (${valC2} &times; ${valB1}) = ${valC1 * valB2} - ${valC2 * valB1} = ${Dx}`);
      steps.push(`4. คำนวณหาดีเทอร์มิแนนต์สำหรับตัวแปร y (Dy):`);
      steps.push(`   Dy = (a1 &times; c2) - (a2 &times; c1) = (${valA1} &times; ${valC2}) - (${valA2} &times; ${valC1}) = ${valA1 * valC2} - ${valA2 * valC1} = ${Dy}`);
    } else {
      steps.push(`1. System of Equations in standard form:`);
      steps.push(`   Eq. 1: (${valA1})x + (${valB1})y = ${valC1}`);
      steps.push(`   Eq. 2: (${valA2})x + (${valB2})y = ${valC2}`);
      steps.push(`2. Compute system determinant (D):`);
      steps.push(`   D = (a1 &times; b2) - (a2 &times; b1) = (${valA1} &times; ${valB2}) - (${valA2} &times; ${valB1}) = ${valA1 * valB2} - ${valA2 * valB1} = ${D}`);
      steps.push(`3. Compute determinant for x (Dx):`);
      steps.push(`   Dx = (c1 &times; b2) - (c2 &times; b1) = (${valC1} &times; ${valB2}) - (${valC2} &times; ${valB1}) = ${valC1 * valB2} - ${valC2 * valB1} = ${Dx}`);
      steps.push(`4. Compute determinant for y (Dy):`);
      steps.push(`   Dy = (a1 &times; c2) - (a2 &times; c1) = (${valA1} &times; ${valC2}) - (${valA2} &times; ${valC1}) = ${valA1 * valC2} - ${valA2 * valC1} = ${Dy}`);
    }

    if (D !== 0) {
      const x = Dx / D;
      const y = Dy / D;
      if (lang === 'th') {
        steps.push(`5. หาคำตอบด้วยกฎของคราเมอร์:`);
        steps.push(`   x = Dx / D = ${Dx} / ${D} = ${x}`);
        steps.push(`   y = Dy / D = ${Dy} / ${D} = ${y}`);
      } else {
        steps.push(`5. Solve using Cramer's Rule:`);
        steps.push(`   x = Dx / D = ${Dx} / ${D} = ${x}`);
        steps.push(`   y = Dy / D = ${Dy} / ${D} = ${y}`);
      }
      setResult({ x, y, D, Dx, Dy, status: 'unique', steps });
    } else {
      // D === 0
      if (Dx === 0 && Dy === 0) {
        if (lang === 'th') {
          steps.push(`5. เนื่องจาก D = 0, Dx = 0, Dy = 0 ระบบสมการนี้มีคำตอบนับไม่ถ้วน (เส้นตรงทับกันพอดี)`);
        } else {
          steps.push(`5. Since D = 0, Dx = 0, and Dy = 0, there are infinitely many solutions (dependent lines).`);
        }
        setResult({ x: null, y: null, D, Dx, Dy, status: 'infinite', steps });
      } else {
        if (lang === 'th') {
          steps.push(`5. เนื่องจาก D = 0 และมี Dx หรือ Dy ที่ไม่เป็นศูนย์ ระบบสมการนี้ไม่มีคำตอบ (เส้นตรงขนานกัน)`);
        } else {
          steps.push(`5. Since D = 0 and Dx or Dy is non-zero, there are no solutions (parallel lines).`);
        }
        setResult({ x: null, y: null, D, Dx, Dy, status: 'none', steps });
      }
    }
  };

  const handleReset = () => {
    setA1('');
    setB1('');
    setC1('');
    setA2('');
    setB2('');
    setC2('');
    setResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Grid className="w-8 h-8 text-indigo-650" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือแก้ระบบสมการเชิงเส้นสองตัวแปร' : 'System of 2 Linear Equations Solver'}
        </h1>
      </div>

      {/* Main UI */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
              {isTH ? 'สมการที่ 1: ax + by = c' : 'Equation 1: ax + by = c'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="a₁"
                value={a1}
                onChange={(e) => setA1(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
              <input
                type="number"
                placeholder="b₁"
                value={b1}
                onChange={(e) => setB1(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
              <input
                type="number"
                placeholder="c₁"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
            </div>
            
            <div className="text-center font-mono text-sm text-gray-500">
              {a1 || 'a₁'}x + {b1 || 'b₁'}y = {c1 || 'c₁'}
            </div>

            <h3 className="text-sm font-semibold text-gray-700 pt-2">
              {isTH ? 'สมการที่ 2: ax + by = c' : 'Equation 2: ax + by = c'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="a₂"
                value={a2}
                onChange={(e) => setA2(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
              <input
                type="number"
                placeholder="b₂"
                value={b2}
                onChange={(e) => setB2(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
              <input
                type="number"
                placeholder="c₂"
                value={c2}
                onChange={(e) => setC2(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-indigo-500"
                step="any"
              />
            </div>

            <div className="text-center font-mono text-sm text-gray-500">
              {a2 || 'a₂'}x + {b2 || 'b₂'}y = {c2 || 'c₂'}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'หาคำตอบ' : 'Solve'}</span>
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

        {/* Output */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Layers className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'คำตอบระบบสมการ' : 'System Solution'}
            </h2>

            {result ? (
              <div className="space-y-6">
                {result.status === 'unique' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <div className="text-sm text-gray-500 mb-1">x</div>
                      <div className="text-3xl font-bold text-indigo-600 font-mono">
                        {result.x !== null && (Number.isInteger(result.x) ? result.x : result.x.toLocaleString('en-US', { maximumFractionDigits: 6 }))}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <div className="text-sm text-gray-500 mb-1">y</div>
                      <div className="text-3xl font-bold text-orange-600 font-mono">
                        {result.y !== null && (Number.isInteger(result.y) ? result.y : result.y.toLocaleString('en-US', { maximumFractionDigits: 6 }))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-4 rounded-lg text-center border font-semibold ${result.status === 'infinite' ? 'bg-amber-50 text-amber-700 border-amber-250' : 'bg-red-50 text-red-700 border-red-250'}`}>
                    {result.status === 'infinite' 
                      ? (isTH ? 'สมการนี้มีคำตอบเป็นจำนวนอนันต์ (Infinitely Many Solutions)' : 'Infinitely Many Solutions') 
                      : (isTH ? 'ระบบสมการนี้ไม่มีคำตอบ (No Solution)' : 'No Solution')}
                  </div>
                )}

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">{isTH ? 'วิธีคำนวณแบบมีขั้นตอน:' : 'Step-by-Step Cramer\'s Breakdown:'}</div>
                  <div className="text-xs font-mono text-gray-650 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {result.steps.map((step, idx) => (
                      <div key={idx} className="border-b border-gray-50 py-1 last:border-0 whitespace-pre-wrap">{step}</div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'ป้อนค่าสัมประสิทธิ์ของระบบสมการด้านซ้ายเพื่อรับการคำนวณเชิงลึก' : 'Fill in coefficients of both equations to compute the intersection point'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-indigo max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-indigo-650" />
          {isTH ? 'ระบบสมการเชิงเส้นสองตัวแปรและการแก้สมการด้วยหลักการคณิตศาสตร์' : 'Solving Systems of 2 Linear Equations'}
        </h2>
        <p className="mb-4">
          <strong>ระบบสมการเชิงเส้นสองตัวแปร (System of 2 Linear Equations)</strong> ประกอบด้วยสมการเชิงเส้นสองสมการที่มีตัวแปรสองตัวที่ไม่ทราบค่า (โดยทั่วไปคือ $x$ และ $y$) เป้าหมายของการแก้ระบบสมการนี้คือการหาพิกัดคู่ลำดับ $(x, y)$ ที่สอดคล้องกับสมการทั้งสองพร้อมกัน ในทางเรขาคณิต ค่า $(x, y)$ นี้คือ <strong>จุดตัด (Intersection point)</strong> ของเส้นตรงสองเส้นบนระนาบ 2 มิติ
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3 รูปแบบคำตอบของระบบสมการเชิงเส้น</h3>
        <p className="mb-4">
          เมื่อเราพิจารณากราฟเส้นตรงสองเส้นบนระนาบ จะมีสถานการณ์เกิดขึ้นได้ 3 รูปแบบ ซึ่งหมายถึงชนิดคำตอบของสมการที่ต่างกัน:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>มีคำตอบเดียว (Unique Solution):</strong> เส้นตรงสองเส้นมีความชันต่างกัน ทำให้ตัดกันที่จุดเพียงจุดเดียว เกิดขึ้นเมื่อดีเทอร์มิแนนต์หลัก $D \ne 0$
          </li>
          <li>
            <strong>ไม่มีคำตอบเลย (No Solution):</strong> เส้นตรงสองเส้นขนานกัน มีความชันเท่ากันแต่มีจุดตัดแกนต่างกัน ทำให้ไม่มีวันบรรจบกัน เกิดขึ้นเมื่อ $D = 0$ แต่ $D_x$ หรือ $D_y$ ตัวใดตัวหนึ่งไม่ใช่ศูนย์
          </li>
          <li>
            <strong>มีคำตอบเป็นจำนวนอนันต์ (Infinitely Many Solutions):</strong> เส้นตรงสองเส้นเป็นเส้นเดียวกัน ทับซ้อนกันสนิท เกิดขึ้นเมื่อทุกดีเทอร์มิแนนต์เป็นศูนย์ทั้งหมด ($D = 0$, $D_x = 0$, $D_y = 0$)
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">การวิเคราะห์ด้วยกฎของคราเมอร์ (Cramer's Rule)</h3>
        <p className="mb-4">
          กฎของคราเมอร์เป็นเทคนิคในวิชาพีชคณิตเชิงเส้น (Linear Algebra) ที่ใช้ในการหาคำตอบของระบบสมการโดยใช้ <strong>ดีเทอร์มิแนนต์ (Determinants)</strong> ของเมทริกซ์ เหมาะสมมากสำหรับระบบสมการที่มีจำนวนตัวแปรเท่ากับจำนวนสมการ โดยระบบสมการ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 text-center font-mono text-gray-800 border border-gray-150">
          a₁x + b₁y = c₁ <br/>
          a₂x + b₂y = c₂
        </div>
        <p className="mb-4">
          สามารถหาค่าตัวแปรได้ผ่านอัตราส่วนดีเทอร์มิแนนต์ของเมทริกซ์ 2&times;2 ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>D (ดีเทอร์มิแนนต์ร่วม):</strong> ดีเทอร์มิแนนต์ของเมทริกซ์สัมประสิทธิ์หลัก = $a_1 b_2 - a_2 b_1$</li>
          <li><strong>Dx (ดีเทอร์มิแนนต์ของ x):</strong> นำค่าคงที่ทางขวามาแทนที่แถวของสัมประสิทธิ์ x = $c_1 b_2 - c_2 b_1$</li>
          <li><strong>Dy (ดีเทอร์มิแนนต์ของ y):</strong> นำค่าคงที่ทางขวามาแทนที่แถวของสัมประสิทธิ์ y = $a_1 c_2 - a_2 c_1$</li>
        </ul>
        <p className="mb-4">
          เมื่อคำนวณแล้ว ค่าของ $x$ และ $y$ จะหาได้จาก $x = D_x / D$ และ $y = D_y / D$
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ความสำคัญในแอปพลิเคชันเชิงพาณิชย์และวิทยาศาสตร์</h3>
        <p className="mb-4">
          การหาจุดตัดของสมการถูกใช้จริงในเศรษฐศาสตร์และธุรกิจอย่างกว้างขวาง เช่น การหา <strong>จุดดุลยภาพของตลาด (Market Equilibrium)</strong> ซึ่งเป็นจุดตัดระหว่างสมการอุปสงค์ (Demand) และอุปทาน (Supply) หรือการหา <strong>จุดคุ้มทุน (Break-even Point)</strong> ระหว่างฟังก์ชันรายได้และฟังก์ชันต้นทุนทั้งหมดของบริษัท
        </p>
      </article>
    </div>
  );
}
