"use client";
import React, { useState } from 'react';
import { MoveDownRight, Plus, Trash2 } from 'lucide-react';

interface Term {
  id: string;
  coeff: string;
  exp: string;
}

export default function PolynomialDerivative({ lang }: { lang: 'en' | 'th' }) {
  const [terms, setTerms] = useState<Term[]>([
    { id: '1', coeff: '4', exp: '3' },
    { id: '2', coeff: '-2', exp: '2' },
    { id: '3', coeff: '7', exp: '1' },
    { id: '4', coeff: '5', exp: '0' }
  ]);

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

  const formatPolynomial = (termList: {c: number, e: number}[], isDerivative = false) => {
    if (termList.length === 0) return '0';

    let str = '';
    termList.forEach((term, index) => {
      const { c, e } = term;
      if (c === 0) return;

      if (index > 0 && c > 0 && str !== '') str += ' + ';
      if (c < 0) {
        str += (str === '' ? '-' : ' - ');
      }

      const absC = Math.abs(c);
      if (absC !== 1 || e === 0) {
        str += absC;
      }

      if (e === 1) str += 'x';
      else if (e !== 0) str += `x^${e}`;
    });
    
    return str || '0';
  };

  const calculateDerivative = () => {
    const validTerms = terms
      .map(t => ({ c: parseFloat(t.coeff || '0'), e: parseInt(t.exp || '0', 10) }))
      .filter(t => !isNaN(t.c) && !isNaN(t.e) && t.c !== 0)
      .sort((a, b) => b.e - a.e);

    const fStr = formatPolynomial(validTerms);

    const derivativeTerms = validTerms.map(t => {
      if (t.e === 0) return { c: 0, e: 0 };
      return { c: t.c * t.e, e: t.e - 1 };
    }).filter(t => t.c !== 0);

    const dfStr = formatPolynomial(derivativeTerms, true);

    return { fStr, dfStr };
  };

  const result = calculateDerivative();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-lg text-red-600">
            <MoveDownRight className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'th' ? 'คำนวณหาอนุพันธ์ (Derivative)' : 'Polynomial Derivative Calculator'}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            {lang === 'th' ? 'กำหนดฟังก์ชันพหุนาม f(x) เครื่องมือจะคำนวณหา f\'(x) อัตโนมัติ' : 'Define polynomial function f(x) to automatically calculate f\'(x).'}
          </p>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">{lang === 'th' ? 'แก้ไขพจน์พหุนาม f(x)' : 'Edit Polynomial Terms for f(x)'}</h3>
            {terms.map((term, index) => (
              <div key={term.id} className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <input
                  type="number"
                  value={term.coeff}
                  onChange={(e) => updateTerm(term.id, 'coeff', e.target.value)}
                  placeholder="Coeff"
                  className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-center"
                />
                <span className="text-lg font-medium italic">x</span>
                <span className="text-lg font-bold">^</span>
                <input
                  type="number"
                  value={term.exp}
                  onChange={(e) => updateTerm(term.id, 'exp', e.target.value)}
                  placeholder="Exp"
                  className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-center"
                />
                
                {terms.length > 1 && (
                  <button
                    onClick={() => removeTerm(term.id)}
                    className="ml-auto p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={addTerm}
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              {lang === 'th' ? 'เพิ่มพจน์ (Add Term)' : 'Add Term'}
            </button>
          </div>

          <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-2">
                  {lang === 'th' ? 'ฟังก์ชันเดิม' : 'Original Function'}
                </h3>
                <div className="text-xl font-mono text-gray-900 bg-white p-4 rounded-lg border border-red-100">
                  f(x) = {result.fStr}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-2">
                  {lang === 'th' ? 'อนุพันธ์ (Derivative)' : 'Derivative'}
                </h3>
                <div className="text-2xl font-mono text-red-700 bg-white p-4 rounded-lg border border-red-200 shadow-inner">
                  f'(x) = {result.dfStr}
                </div>
              </div>
              
              <div className="text-sm text-red-700 bg-white p-4 rounded-lg">
                <p><strong>{lang === 'th' ? 'สูตรที่ใช้ (Power Rule):' : 'Formula Used (Power Rule):'}</strong></p>
                <p className="mt-1 font-mono">d/dx (c · xⁿ) = c · n · xⁿ⁻¹</p>
                <p className="mt-1 font-mono">d/dx (c) = 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-red max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การหาอนุพันธ์ของฟังก์ชันพหุนาม (Derivative of Polynomials)</h2>
        <p>
          <strong>อนุพันธ์ (Derivative)</strong> เป็นเครื่องมือหลักในวิชาแคลคูลัส ที่ใช้สำหรับหา "อัตราการเปลี่ยนแปลงขณะใดขณะหนึ่ง" (Instantaneous Rate of Change) 
          หรือใช้สำหรับหา "ความชันของเส้นโค้ง" (Slope of the tangent line) ณ จุดใดๆ บนกราฟ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สัญลักษณ์ของอนุพันธ์</h3>
        <p>
          หากเรามีฟังก์ชัน y = f(x) สัญลักษณ์ที่ใช้แทนอนุพันธ์อันดับที่ 1 ของฟังก์ชันนี้มีหลายรูปแบบตามแต่ผู้ที่คิดค้น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>f'(x)</strong> (อ่านว่า เอฟ ไพรม์ ของ เอกซ์) แบบลากรองจ์ (Lagrange)</li>
          <li><strong>dy/dx</strong> (อ่านว่า ดีวาย บาย ดีเอกซ์) แบบไลบ์นิทซ์ (Leibniz)</li>
          <li><strong>y'</strong> (อ่านว่า วาย ไพรม์)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กฎการหาอนุพันธ์ที่สำคัญ (Power Rule)</h3>
        <p>
          สำหรับการหาอนุพันธ์ของฟังก์ชันพหุนาม (Polynomials) เราจะใช้กฎพื้นฐานที่เรียกว่า <strong>Power Rule</strong> หรือ กฎของเลขชี้กำลัง ซึ่งมีใจความว่า:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 text-lg">
          d/dx [ xⁿ ] = n · xⁿ⁻¹
        </div>
        <p>
          ความหมายคือ "ตบเลขชี้กำลังลงมาคูณด้านหน้า แล้วลดเลขชี้กำลังเดิมลงไป 1"
        </p>
        
        <h4 className="font-semibold text-gray-700 mt-4">กฎพื้นฐานอื่นๆ ที่ต้องใช้ร่วมกัน:</h4>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>อนุพันธ์ของค่าคงที่ (Constant Rule):</strong>
            <br />d/dx [ c ] = 0 (อนุพันธ์ของตัวเลขโดดๆ มีค่าเท่ากับศูนย์เสมอ เพราะกราฟค่าคงที่เป็นเส้นตรงแนวนอน ความชันเป็น 0)
          </li>
          <li>
            <strong>อนุพันธ์ของค่าคงที่คูณฟังก์ชัน (Constant Multiple Rule):</strong>
            <br />d/dx [ c · f(x) ] = c · f'(x)
          </li>
          <li>
            <strong>อนุพันธ์ของผลบวกและผลต่าง (Sum and Difference Rule):</strong>
            <br />d/dx [ f(x) ± g(x) ] = f'(x) ± g'(x) (สามารถกระจายดิฟเข้าไปในพจน์บวกลบได้เลย)
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการหาอนุพันธ์</h3>
        <p>สมมติเราต้องการหาอนุพันธ์ของ f(x) = 4x³ - 2x² + 7x + 5</p>
        <ul className="list-none space-y-2 bg-gray-50 p-4 rounded-lg">
          <li>f'(x) = d/dx(4x³) - d/dx(2x²) + d/dx(7x) + d/dx(5)</li>
          <li>f'(x) = (4)(3)x³⁻¹ - (2)(2)x²⁻¹ + (7)(1)x¹⁻¹ + 0</li>
          <li>f'(x) = 12x² - 4x + 7x⁰</li>
          <li><strong>f'(x) = 12x² - 4x + 7</strong> (เพราะ x⁰ = 1)</li>
        </ul>

        <p className="mt-6 text-gray-600 text-sm">
          การหาอนุพันธ์นอกจากจะช่วยให้เรารู้ความชันของกราฟแล้ว ในทางฟิสิกส์ยังประยุกต์ใช้ในการหาความเร็ว (Velocity) จากสมการตำแหน่ง (Position) 
          และความเร่ง (Acceleration) จากสมการความเร็วได้อีกด้วย
        </p>
      </article>
    </div>
  );
}
