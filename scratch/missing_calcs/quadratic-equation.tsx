"use client";
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function QuadraticEquation({ lang }: { lang: 'TH' | 'EN' }) {
  const [valA, setValA] = useState<string>('');
  const [valB, setValB] = useState<string>('');
  const [valC, setValC] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const solveQuadratic = () => {
    const a = parseFloat(valA);
    const b = parseFloat(valB);
    const c = parseFloat(valC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setResult({ error: lang === 'TH' ? "โปรดกรอกค่าสัมประสิทธิ์ a, b และ c ให้ครบถ้วน" : "Please enter all coefficients (a, b, c)." });
      return;
    }

    if (a === 0) {
      setResult({ error: lang === 'TH' ? "ค่า a ต้องไม่เป็น 0 (เพราะจะไม่ใช่สมการกำลังสอง)" : "Value of 'a' cannot be 0 for a quadratic equation." });
      return;
    }

    const discriminant = (b * b) - (4 * a * c);
    
    let roots = [];
    let rootType = '';
    
    if (discriminant > 0) {
      rootType = 'two_real';
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      roots = [root1, root2];
    } else if (discriminant === 0) {
      rootType = 'one_real';
      const root1 = -b / (2 * a);
      roots = [root1];
    } else {
      rootType = 'complex';
      const realPart = (-b / (2 * a));
      const imagPart = (Math.sqrt(Math.abs(discriminant)) / (2 * a));
      roots = [
        { real: realPart, imag: imagPart, sign: '+' },
        { real: realPart, imag: imagPart, sign: '-' }
      ];
    }

    setResult({
      a, b, c,
      discriminant,
      rootType,
      roots
    });
  };

  const handleClear = () => {
    setValA('');
    setValB('');
    setValC('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-100 p-3 rounded-xl">
          <Calculator className="w-6 h-6 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'TH' ? 'เครื่องมือแก้สมการกำลังสอง' : 'Quadratic Equation Solver'}
        </h2>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 text-center">
        <div className="text-2xl font-serif text-slate-800 italic">
          ax² + bx + c = 0
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            a (สัมประสิทธิ์หน้า x²)
          </label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
            placeholder="a"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            b (สัมประสิทธิ์หน้า x)
          </label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
            placeholder="b"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            c (ค่าคงที่)
          </label>
          <input
            type="number"
            value={valC}
            onChange={(e) => setValC(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
            placeholder="c"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={solveQuadratic}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {lang === 'TH' ? 'คำนวณหาคำตอบ (Solve)' : 'Solve Equation'}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors duration-200"
        >
          {lang === 'TH' ? 'ล้างค่า' : 'Clear'}
        </button>
      </div>

      {result && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
          {result.error ? (
            <div className="text-red-500 font-medium text-center p-4">
              {result.error}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {lang === 'TH' ? 'วิธีทำและผลลัพธ์ (Solution)' : 'Step-by-step Solution'}
              </h3>
              
              <div className="space-y-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm font-mono text-sm md:text-base">
                <div className="border-b pb-3 border-slate-100">
                  <div className="font-semibold text-slate-700 mb-1">สมการของคุณ:</div>
                  <div>
                    {result.a}x² {result.b >= 0 ? '+' : ''} {result.b}x {result.c >= 0 ? '+' : ''} {result.c} = 0
                  </div>
                </div>

                <div className="border-b pb-3 border-slate-100">
                  <div className="font-semibold text-slate-700 mb-1">1. สูตรการหาคำตอบ (Quadratic Formula):</div>
                  <div>x = [-b ± √(b² - 4ac)] / 2a</div>
                </div>

                <div className="border-b pb-3 border-slate-100">
                  <div className="font-semibold text-slate-700 mb-1">2. หาค่า Discriminant (Δ = b² - 4ac):</div>
                  <div>Δ = ({result.b})² - 4({result.a})({result.c})</div>
                  <div>Δ = {result.b * result.b} - {4 * result.a * result.c}</div>
                  <div className="font-bold text-rose-600 mt-1">Δ = {result.discriminant}</div>
                </div>

                <div>
                  <div className="font-semibold text-slate-700 mb-2">3. ผลลัพธ์ของสมการ (Roots):</div>
                  
                  {result.rootType === 'two_real' && (
                    <>
                      <div className="text-slate-600 mb-2 text-sm">เนื่องจาก Δ &gt; 0 สมการนี้มี 2 คำตอบที่เป็นจำนวนจริง:</div>
                      <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                        <div className="font-bold text-lg text-rose-800">x₁ = {result.roots[0].toFixed(5)}</div>
                        <div className="font-bold text-lg text-rose-800 mt-2">x₂ = {result.roots[1].toFixed(5)}</div>
                      </div>
                    </>
                  )}

                  {result.rootType === 'one_real' && (
                    <>
                      <div className="text-slate-600 mb-2 text-sm">เนื่องจาก Δ = 0 สมการนี้มีคำตอบเดียวที่เป็นจำนวนจริง:</div>
                      <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                        <div className="font-bold text-lg text-rose-800">x = {result.roots[0].toFixed(5)}</div>
                      </div>
                    </>
                  )}

                  {result.rootType === 'complex' && (
                    <>
                      <div className="text-slate-600 mb-2 text-sm">เนื่องจาก Δ &lt; 0 สมการนี้ไม่มีคำตอบที่เป็นจำนวนจริง (คำตอบเป็นจำนวนเชิงซ้อน):</div>
                      <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                        <div className="font-bold text-lg text-rose-800">
                          x₁ = {result.roots[0].real.toFixed(5)} {result.roots[0].sign} {result.roots[0].imag.toFixed(5)}i
                        </div>
                        <div className="font-bold text-lg text-rose-800 mt-2">
                          x₂ = {result.roots[1].real.toFixed(5)} {result.roots[1].sign} {result.roots[1].imag.toFixed(5)}i
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">การแก้สมการกำลังสอง (Quadratic Equation) ด้วยสูตร</h2>
          
          <p>
            สมการกำลังสอง หรือ <strong>Quadratic Equation</strong> เป็นหนึ่งในสมการพื้นฐานทางคณิตศาสตร์ที่พบเห็นได้บ่อยที่สุดตั้งแต่ระดับมัธยมศึกษาไปจนถึงการประยุกต์ใช้งานจริงในสายวิศวกรรมศาสตร์และวิทยาศาสตร์ รูปแบบมาตรฐานของสมการนี้คือ:
          </p>

          <div className="bg-slate-100 p-4 rounded-lg text-center font-serif text-xl font-bold text-slate-800 my-4 shadow-sm">
            ax² + bx + c = 0
          </div>
          
          <p>
            โดยที่ <code>a</code>, <code>b</code>, และ <code>c</code> เป็นค่าคงที่ (ตัวเลขใดๆ ก็ได้) แต่เงื่อนไขสำคัญคือ <strong>a ต้องไม่เท่ากับ 0</strong> (หาก a เป็นศูนย์ มันจะกลายเป็นสมการเชิงเส้นแทน) และ <code>x</code> คือตัวแปรที่เราต้องการหาคำตอบ (Roots)
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">สูตรสมการกำลังสอง (The Quadratic Formula)</h3>
          <p>
            ในการแก้สมการกำลังสองเพื่อหาค่า x หากตัวเลขไม่ลงตัวและเราไม่สามารถแยกตัวประกอบเป็นสองวงเล็บได้อย่างง่ายดาย วิธีที่แน่นอนและทรงประสิทธิภาพที่สุดคือการใช้ <strong>สูตรควอดราติก</strong> ดังนี้:
          </p>

          <div className="bg-slate-100 p-4 rounded-lg text-center font-serif text-xl font-bold text-slate-800 my-4 shadow-sm border border-slate-200">
            x = [ -b ± √(b² - 4ac) ] / 2a
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ดิสคริมิแนนต์ (Discriminant) คืออะไร?</h3>
          <p>
            จากสูตรด้านบน สังเกตส่วนที่อยู่ใต้รากที่สอง (Square root) นั่นคือ <strong>b² - 4ac</strong> ค่านี้ถูกเรียกว่า "ดิสคริมิแนนต์" มักแทนด้วยสัญลักษณ์สามเหลี่ยมเดลต้า (Δ) ค่านี้มีความสำคัญมากเพราะมันช่วยบอก "ลักษณะคำตอบ" ของสมการให้เราทราบล่วงหน้าได้ทันที:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>หาก Δ &gt; 0 (เป็นบวก):</strong> สมการจะมี <strong>2 คำตอบ</strong> ที่เป็นจำนวนจริง (Two distinct real roots) กราฟพาราโบลาจะตัดแกน X สองจุด</li>
            <li><strong>หาก Δ = 0:</strong> สมการจะมีเพียง <strong>1 คำตอบ</strong> ที่เป็นจำนวนจริง (One real root) กราฟพาราโบลาจะแตะแกน X พอดีหนึ่งจุด</li>
            <li><strong>หาก Δ &lt; 0 (ติดลบ):</strong> สมการจะ <strong>ไม่มีคำตอบที่เป็นจำนวนจริง</strong> (No real roots) แต่คำตอบจะเป็นจำนวนเชิงซ้อน (Complex numbers) ที่มีค่า i (จินตภาพ) เข้ามาเกี่ยวข้อง กราฟพาราโบลาจะลอยอยู่เหนือหรือใต้แกน X โดยไม่ตัดเลย</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">ตัวอย่างการใช้งานในชีวิตจริง</h3>
          <p>
            การแก้สมการกำลังสองไม่ได้มีไว้แค่สอบผ่าน แต่เป็นเครื่องมือจำลองสถานการณ์ที่มีความโค้งหรือพาราโบลาเข้ามาเกี่ยวข้อง เช่น:
          </p>
          <ul>
            <li><strong>วิถีโปรเจกไทล์ (Projectile Motion):</strong> เมื่อคุณโยนลูกบอล เตะฟุตบอล หรือยิงจรวด การคำนวณว่าวัตถุจะตกถึงพื้นเมื่อไหร่ หรือจะลอยขึ้นไปสูงสุดที่ระยะเท่าใด ล้วนอธิบายได้ด้วยสมการกำลังสอง</li>
            <li><strong>การคำนวณพื้นที่:</strong> หากคุณมีลวดยาวจำกัดและต้องการล้อมรั้วพื้นที่สี่เหลี่ยมให้ได้พื้นที่มากที่สุด สมการกำลังสองช่วยหาขนาดความกว้างยาวที่เหมาะสมที่สุดได้ (Optimization)</li>
            <li><strong>เศรษฐศาสตร์และธุรกิจ:</strong> การหาระดับการผลิตที่ทำให้บริษัทได้กำไรสูงสุด (Maximized profit) หรือมีต้นทุนต่ำสุด ซึ่งเส้นกราฟผลกำไรมักเป็นรูปพาราโบลาคว่ำ</li>
          </ul>

          <p>
            ด้วยโปรแกรมเครื่องมือแก้สมการบนหน้าเว็บนี้ คุณเพียงแค่ใส่สัมประสิทธิ์ a, b และ c ระบบก็จะคำนวณและแสดงวิธีทำเป็นขั้นตอนอย่างละเอียดให้คุณโดยอัตโนมัติ ช่วยให้คุณประหยัดเวลาและเห็นภาพการทำงานของสูตรได้อย่างชัดเจน!
          </p>
        </article>
      )}
    </div>
  );
}
