"use client";
import React, { useState } from 'react';
import { Sigma, Plus, Trash2 } from 'lucide-react';

interface Term {
  id: string;
  coeff: string;
  exp: string;
}

export default function LimitCalculator({ lang }: { lang: 'en' | 'th' }) {
  const [terms, setTerms] = useState<Term[]>([
    { id: '1', coeff: '1', exp: '2' },
    { id: '2', coeff: '3', exp: '1' },
    { id: '3', coeff: '-4', exp: '0' }
  ]);
  const [limitA, setLimitA] = useState<string>('2');
  const [limitType, setLimitType] = useState<'number' | 'inf' | '-inf'>('number');

  const addTerm = () => {
    setTerms([...terms, { id: Math.random().toString(36).substring(7), coeff: '1', exp: '1' }]);
  };

  const removeTerm = (id: string) => {
    if (terms.length > 1) {
      setTerms(terms.filter(t => t.id !== id));
    }
  };

  const updateTerm = (id: string, field: 'coeff' | 'exp', val: string) => {
    setTerms(terms.map(t => t.id === id ? { ...t, [field]: val } : t));
  };

  const formatPolynomial = () => {
    const validTerms = terms.filter(t => parseFloat(t.coeff || '0') !== 0);
    if (validTerms.length === 0) return '0';

    // Sort by exponent descending for display
    const sorted = [...validTerms].sort((a, b) => parseInt(b.exp || '0') - parseInt(a.exp || '0'));

    let str = '';
    sorted.forEach((term, index) => {
      const c = parseFloat(term.coeff || '0');
      const e = parseInt(term.exp || '0', 10);

      if (index > 0 && c > 0) str += ' + ';
      if (c < 0) {
        str += index === 0 ? '-' : ' - ';
      }

      const absC = Math.abs(c);
      if (absC !== 1 || e === 0) {
        str += absC;
      }

      if (e === 1) str += 'x';
      else if (e !== 0) str += `x^${e}`;
    });
    return str;
  };

  const calculateLimit = () => {
    const validTerms = terms.filter(t => parseFloat(t.coeff || '0') !== 0);
    if (validTerms.length === 0) return { val: '0', steps: [] };

    // Group terms by exponent and sum coefficients
    const termMap = new Map<number, number>();
    validTerms.forEach(t => {
      const e = parseInt(t.exp || '0', 10);
      const c = parseFloat(t.coeff || '0');
      termMap.set(e, (termMap.get(e) || 0) + c);
    });

    const combinedTerms = Array.from(termMap.entries())
      .filter(([_, c]) => c !== 0)
      .sort((a, b) => b[0] - a[0]); // Sort desc

    if (combinedTerms.length === 0) return { val: '0', steps: [] };

    if (limitType === 'number') {
      const a = parseFloat(limitA);
      if (isNaN(a)) return { val: 'Invalid input', steps: [] };

      let sum = 0;
      const steps = [];
      for (const [e, c] of combinedTerms) {
        const val = c * Math.pow(a, e);
        sum += val;
        steps.push(`${c}(${a})^${e} = ${val}`);
      }
      return { val: sum.toString(), steps };
    } else {
      // Infinity limits determined by term with highest exponent
      const highestTerm = combinedTerms[0]; // Already sorted
      const [maxE, maxC] = highestTerm;

      if (maxE === 0) {
        return { val: maxC.toString(), steps: [`Highest degree is 0, limit is constant ${maxC}`] };
      }

      if (maxE < 0) {
        return { val: '0', steps: [`Limit of x^${maxE} as x -> ∞ is 0`] };
      }

      let resultSign = maxC > 0 ? 1 : -1;
      
      if (limitType === '-inf') {
        if (maxE % 2 !== 0) { // odd power preserves negative
          resultSign *= -1;
        }
      }

      const res = resultSign > 0 ? '+∞' : '-∞';
      const steps = [
        `Highest degree term dominates: ${maxC}x^${maxE}`,
        `As x -> ${limitType === 'inf' ? '∞' : '-∞'}, ${maxC}x^${maxE} -> ${res}`
      ];
      return { val: res, steps };
    }
  };

  const result = calculateLimit();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <Sigma className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'th' ? 'คำนวณลิมิตของฟังก์ชันพหุนาม' : 'Polynomial Limit Calculator'}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            {lang === 'th' ? 'กำหนดฟังก์ชันพหุนาม f(x) และค่า x ที่ลู่เข้าหา' : 'Define polynomial function f(x) and the value x approaches.'}
          </p>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold text-lg text-gray-700">lim</span>
              <div className="flex flex-col items-center mr-4">
                <span className="text-xs text-gray-500 mb-1">x →</span>
                <div className="flex items-center gap-2">
                  <select
                    value={limitType}
                    onChange={(e) => setLimitType(e.target.value as any)}
                    className="px-2 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="number">{lang === 'th' ? 'ตัวเลข' : 'Number'}</option>
                    <option value="inf">+∞</option>
                    <option value="-inf">-∞</option>
                  </select>
                  {limitType === 'number' && (
                    <input
                      type="number"
                      value={limitA}
                      onChange={(e) => setLimitA(e.target.value)}
                      placeholder="a"
                      className="w-20 px-2 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </div>
              </div>

              <div className="text-xl font-mono text-indigo-900 flex-1">
                [ {formatPolynomial()} ]
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="font-medium text-gray-700">{lang === 'th' ? 'แก้ไขพจน์พหุนาม' : 'Edit Polynomial Terms'}</h3>
            {terms.map((term, index) => (
              <div key={term.id} className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="font-medium text-gray-400 w-6">#{index + 1}</span>
                <input
                  type="number"
                  value={term.coeff}
                  onChange={(e) => updateTerm(term.id, 'coeff', e.target.value)}
                  placeholder="Coeff"
                  className="w-20 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center"
                />
                <span className="text-lg font-medium italic">x</span>
                <span className="text-sm font-bold">^</span>
                <input
                  type="number"
                  value={term.exp}
                  onChange={(e) => updateTerm(term.id, 'exp', e.target.value)}
                  placeholder="Exp"
                  className="w-20 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center"
                />
                
                {terms.length > 1 && (
                  <button
                    onClick={() => removeTerm(term.id)}
                    className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={addTerm}
              className="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              {lang === 'th' ? 'เพิ่มพจน์' : 'Add Term'}
            </button>
          </div>

          <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">
              {lang === 'th' ? 'ผลลัพธ์ (Result):' : 'Result:'}
            </h3>
            <div className="text-3xl font-bold text-indigo-700 mb-4 bg-white p-4 rounded-lg border border-indigo-100 text-center">
              {result.val}
            </div>

            {result.steps.length > 0 && (
              <div className="text-sm text-indigo-800 bg-white p-4 rounded-lg opacity-90">
                <p className="font-bold mb-2">{lang === 'th' ? 'วิธีคิด (Steps):' : 'Steps:'}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {result.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ลิมิตของฟังก์ชัน (Limit of a Function)</h2>
        <p>
          <strong>ลิมิต (Limit)</strong> เป็นแนวคิดพื้นฐานที่สำคัญที่สุดในวิชาแคลคูลัส (Calculus) ลิมิตถูกใช้เพื่ออธิบายพฤติกรรมของฟังก์ชันเมื่อตัวแปรอิสระเข้าใกล้ค่าใดค่าหนึ่ง 
          แต่ไม่จำเป็นต้องเท่ากับค่านั้น การศึกษาลิมิตเป็นจุดเริ่มต้นที่นำไปสู่ความเข้าใจเรื่องความต่อเนื่องของฟังก์ชัน (Continuity) การหาอนุพันธ์ (Derivative) และการหาปริพันธ์ (Integral)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความหมายของลิมิต</h3>
        <p>
          เมื่อเราเขียนว่า <strong>lim (x → a) f(x) = L</strong> หมายความว่า "เมื่อ x มีค่าเข้าใกล้ a มากๆ (ทั้งจากทางซ้ายและทางขวา) ค่าของฟังก์ชัน f(x) จะมีค่าเข้าใกล้ L"
        </p>
        <p>
          สำหรับ <strong>ฟังก์ชันพหุนาม (Polynomial Function)</strong> ซึ่งมีรูปแบบ f(x) = cₙxⁿ + cₙ₋₁xⁿ⁻¹ + ... + c₁x + c₀ เป็นฟังก์ชันที่มีความต่อเนื่องในทุกช่วง (Continuous everywhere) บนจำนวนจริง 
          ดังนั้นการหาลิมิตของฟังก์ชันพหุนามเมื่อ x เข้าใกล้จำนวนจริง a จึงสามารถทำได้ง่ายๆ ด้วยการ <em>"แทนค่าโดยตรง"</em> (Direct Substitution) เข้าไปในสมการได้เลย
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การหาลิมิตของฟังก์ชันพหุนาม</h3>
        <h4 className="font-semibold text-gray-700 mt-4">1. เมื่อ x เข้าใกล้จำนวนจริง a</h4>
        <p>
          เราสามารถหาคำตอบได้โดยการแทนค่า x = a ลงในฟังก์ชัน f(x) ทันที
          <br />
          <strong>ตัวอย่าง:</strong> lim (x → 2) (3x² - 4x + 5)
          <br />
          = 3(2)² - 4(2) + 5 
          <br />
          = 3(4) - 8 + 5 
          <br />
          = 12 - 8 + 5 = 9
        </p>

        <h4 className="font-semibold text-gray-700 mt-4">2. เมื่อ x เข้าใกล้อนันต์ (Infinity: ∞ หรือ -∞)</h4>
        <p>
          เมื่อ x มีค่าเข้าใกล้บวกอนันต์ (+∞) หรือลบอนันต์ (-∞) ค่าของฟังก์ชันพหุนามจะถูกควบคุมโดย <strong>พจน์ที่มีดีกรีสูงสุด (Highest degree term)</strong> เท่านั้น 
          เนื่องจากเมื่อ x มีค่ามหาศาล พจน์ที่มีกำลังสูงสุดจะเติบโตเร็วกว่าพจน์อื่นๆ จนพจน์อื่นๆ แทบไม่มีความหมาย
        </p>
        <p>
          <strong>ตัวอย่าง:</strong> lim (x → ∞) (-2x³ + 5x² - 100)
          <br />
          พิจารณาเฉพาะพจน์ -2x³
          <br />
          เมื่อ x มีค่าบวกมหาศาล x³ จะมีค่าบวกมหาศาล แต่คูณกับสัมประสิทธิ์ -2 จะทำให้กลายเป็นลบมหาศาล
          <br />
          ดังนั้น lim (x → ∞) = -∞
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทฤษฎีบทเกี่ยวกับลิมิต (Limit Laws)</h3>
        <p>การคำนวณลิมิตมีความยืดหยุ่นด้วยคุณสมบัติต่างๆ สมมติให้ lim f(x) = L และ lim g(x) = M เมื่อ x → a</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>กฎผลบวก:</strong> lim [f(x) + g(x)] = L + M</li>
          <li><strong>กฎผลต่าง:</strong> lim [f(x) - g(x)] = L - M</li>
          <li><strong>กฎผลคูณด้วยค่าคงที่:</strong> lim [c · f(x)] = c · L (เมื่อ c เป็นค่าคงที่)</li>
          <li><strong>กฎผลคูณ:</strong> lim [f(x) · g(x)] = L · M</li>
          <li><strong>กฎผลหาร:</strong> lim [f(x) / g(x)] = L / M (โดยมีเงื่อนไขว่า M ต้องไม่เท่ากับ 0)</li>
        </ul>

        <p className="mt-6 text-gray-600 text-sm">
          เครื่องมือนี้ช่วยให้คุณตรวจสอบค่าลิมิตของฟังก์ชันพหุนามพื้นฐานได้อย่างรวดเร็ว เพื่อใช้เป็นแนวทางในการตรวจคำตอบจากการคำนวณด้วยมือ 
          หากต้องการหาลิมิตของฟังก์ชันตรรกยะ (เศษส่วนพหุนาม) ในกรณีที่เกิดรูปแบบ 0/0 อาจต้องใช้วิธีแยกตัวประกอบ (Factoring) หรือกฎของโลปิตาล (L'Hôpital's Rule) ซึ่งมีความซับซ้อนขึ้น
        </p>
      </article>
    </div>
  );
}
