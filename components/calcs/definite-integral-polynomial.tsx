"use client";
import React, { useState } from 'react';
import { FunctionSquare, Plus, Trash2 } from 'lucide-react';

interface Term {
  id: string;
  coeff: string;
  exp: string;
}

export default function DefiniteIntegralPolynomial({ lang }: { lang: 'en' | 'th' }) {
  const [terms, setTerms] = useState<Term[]>([
    { id: '1', coeff: '3', exp: '2' },
    { id: '2', coeff: '-2', exp: '1' },
    { id: '3', coeff: '1', exp: '0' }
  ]);
  const [lowerBound, setLowerBound] = useState<string>('0');
  const [upperBound, setUpperBound] = useState<string>('2');

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

  const formatPolynomial = (termList: {c: number, e: number}[], isIntegral = false) => {
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
      
      // format coefficient
      if (isIntegral && !Number.isInteger(c)) {
        str += absC.toFixed(4).replace(/\.?0+$/, '');
      } else {
        if (absC !== 1 || e === 0) {
          str += absC;
        }
      }

      if (e === 1) str += 'x';
      else if (e !== 0) str += `x^${e}`;
    });
    
    return str || '0';
  };

  const calculateIntegral = () => {
    const a = parseFloat(lowerBound);
    const b = parseFloat(upperBound);
    if (isNaN(a) || isNaN(b)) return null;

    const validTerms = terms
      .map(t => ({ c: parseFloat(t.coeff || '0'), e: parseInt(t.exp || '0', 10) }))
      .filter(t => !isNaN(t.c) && !isNaN(t.e) && t.c !== 0)
      .sort((a, b) => b.e - a.e);

    const fStr = formatPolynomial(validTerms);

    // F(x)
    const integralTerms = validTerms.map(t => {
      return { c: t.c / (t.e + 1), e: t.e + 1 };
    });

    const FStr = formatPolynomial(integralTerms, true);

    const calcF = (x: number) => {
      return integralTerms.reduce((sum, t) => sum + t.c * Math.pow(x, t.e), 0);
    };

    const Fb = calcF(b);
    const Fa = calcF(a);
    const result = Fb - Fa;

    return { fStr, FStr, Fb, Fa, result, a, b };
  };

  const result = calculateIntegral();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <FunctionSquare className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'th' ? 'คำนวณอินทิกรัลจำกัดเขต' : 'Definite Integral Calculator'}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            {lang === 'th' ? 'กำหนดฟังก์ชันพหุนาม f(x) และขอบเขต [a, b] เพื่อหาพื้นที่ใต้กราฟ' : 'Define polynomial function f(x) and bounds [a, b] to find area under curve.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Bounds Setup */}
            <div className="flex flex-col justify-center items-center gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input
                type="number"
                value={upperBound}
                onChange={(e) => setUpperBound(e.target.value)}
                placeholder="b"
                title={lang === 'th' ? "ขอบเขตบน (b)" : "Upper bound (b)"}
                className="w-20 px-2 py-1 bg-white border border-gray-300 rounded text-center focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-3xl font-light text-gray-400">∫</span>
              <input
                type="number"
                value={lowerBound}
                onChange={(e) => setLowerBound(e.target.value)}
                placeholder="a"
                title={lang === 'th' ? "ขอบเขตล่าง (a)" : "Lower bound (a)"}
                className="w-20 px-2 py-1 bg-white border border-gray-300 rounded text-center focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Terms Setup */}
            <div className="flex-1 space-y-3">
              {terms.map((term, index) => (
                <div key={term.id} className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <input
                    type="number"
                    value={term.coeff}
                    onChange={(e) => updateTerm(term.id, 'coeff', e.target.value)}
                    placeholder="Coeff"
                    className="w-20 px-2 py-1 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-center"
                  />
                  <span className="text-lg font-medium italic">x</span>
                  <span className="text-lg font-bold">^</span>
                  <input
                    type="number"
                    value={term.exp}
                    onChange={(e) => updateTerm(term.id, 'exp', e.target.value)}
                    placeholder="Exp"
                    className="w-20 px-2 py-1 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-center"
                  />
                  
                  {terms.length > 1 && (
                    <button
                      onClick={() => removeTerm(term.id)}
                      className="ml-auto p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={addTerm}
                className="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-gray-300 text-gray-500 hover:border-emerald-400 hover:text-emerald-600 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                {lang === 'th' ? 'เพิ่มพจน์' : 'Add Term'}
              </button>
            </div>
            
            <div className="flex items-center">
              <span className="text-2xl font-light text-gray-400">dx</span>
            </div>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                {lang === 'th' ? 'ผลลัพธ์ (Result)' : 'Result'}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <p className="text-sm text-emerald-700 mb-1">{lang === 'th' ? 'ฟังก์ชันอินทิเกรต F(x):' : 'Antiderivative F(x):'}</p>
                  <p className="font-mono text-lg">F(x) = {result.FStr}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <p className="text-sm text-emerald-700 mb-1">{lang === 'th' ? 'แทนค่าขอบเขต (F(b) - F(a)):' : 'Evaluate Bounds (F(b) - F(a)):'}</p>
                  <p className="font-mono mt-1">F({result.b}) = {result.Fb % 1 !== 0 ? result.Fb.toFixed(4) : result.Fb}</p>
                  <p className="font-mono">F({result.a}) = {result.Fa % 1 !== 0 ? result.Fa.toFixed(4) : result.Fa}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm text-center">
                  <p className="text-sm text-emerald-700 mb-2">{lang === 'th' ? 'ค่าอินทิกรัลจำกัดเขต:' : 'Definite Integral Value:'}</p>
                  <p className="text-4xl font-bold text-emerald-600">
                    {result.result % 1 !== 0 ? parseFloat(result.result.toFixed(6)) : result.result}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="prose prose-emerald max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">อินทิกรัลจำกัดเขต (Definite Integral)</h2>
        <p>
          <strong>อินทิกรัล (Integral)</strong> หรือปริพันธ์ เป็นเครื่องมือหลักในวิชาแคลคูลัส (Calculus) ที่มีความสำคัญเทียบเท่ากับการหาอนุพันธ์ (Derivative) 
          หากอนุพันธ์คือการหา "อัตราการเปลี่ยนแปลง (ความชัน)" อินทิกรัลก็คือการหา "ผลรวมสะสม (พื้นที่ใต้กราฟ)" กระบวนการหาอินทิกรัลเรียกว่า การอินทิเกรต (Integration)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทฤษฎีบทหลักมูลของแคลคูลัส (Fundamental Theorem of Calculus)</h3>
        <p>
          อินทิกรัลจำกัดเขตเป็นการหาพื้นที่ใต้กราฟของฟังก์ชัน f(x) บนช่วง [a, b] จาก x = a ถึง x = b 
          ตามทฤษฎีบทหลักมูลของแคลคูลัส เราสามารถคำนวณค่านี้ได้โดยใช้ฟังก์ชันปฏิยานุพันธ์ (Antiderivative) หรือ F(x) ซึ่งมีสมบัติว่า F'(x) = f(x)
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 text-lg">
          ∫(a ถึง b) f(x) dx = F(b) - F(a)
        </div>
        <p>
          ความหมายคือ เมื่อเราหาฟังก์ชัน F(x) ได้แล้ว ให้แทนค่าขอบเขตบน (b) ลงไป แล้วลบด้วยค่าที่ได้จากการแทนขอบเขตล่าง (a) 
          ผลลัพธ์ที่ได้จะเป็นตัวเลข ซึ่งแทนขนาดของพื้นที่ใต้กราฟ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กฎการอินทิเกรตพหุนาม (Power Rule for Integration)</h3>
        <p>
          การอินทิเกรตฟังก์ชันพหุนาม จะทำงานตรงข้ามกับ Power Rule ของการหาอนุพันธ์ โดยมีสูตรดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 text-lg">
          ∫ xⁿ dx = [ xⁿ⁺¹ / (n + 1) ] + C  (เมื่อ n ≠ -1)
        </div>
        <p>
          ความหมายคือ "เพิ่มเลขชี้กำลังขึ้น 1 แล้วหารด้วยเลขชี้กำลังตัวใหม่นั้น" 
          (สำหรับอินทิกรัลจำกัดเขต ค่าคงที่ C จะถูกหักล้างไปตอนนำ F(b) - F(a) เราจึงละค่า C ทิ้งไปได้)
        </p>
        
        <h4 className="font-semibold text-gray-700 mt-4">ตัวอย่างการคำนวณ</h4>
        <p>จงหา ∫(0 ถึง 2) (3x² - 2x + 1) dx</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>หา F(x):</strong>
            <br />∫ 3x² dx = 3(x³ / 3) = x³
            <br />∫ -2x dx = -2(x² / 2) = -x²
            <br />∫ 1 dx = x
            <br />ดังนั้น F(x) = x³ - x² + x
          </li>
          <li><strong>แทนค่าขอบเขตบน (b = 2):</strong> F(2) = (2)³ - (2)² + 2 = 8 - 4 + 2 = 6</li>
          <li><strong>แทนค่าขอบเขตล่าง (a = 0):</strong> F(0) = (0)³ - (0)² + 0 = 0</li>
          <li><strong>ผลลัพธ์:</strong> F(2) - F(0) = 6 - 0 = <strong>6</strong></li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การตีความพื้นที่ (Area Interpretation)</h3>
        <p>
          สิ่งสำคัญที่ต้องระวังในการใช้อินทิกรัลจำกัดเขตหาพื้นที่คือ ค่าอินทิกรัล <em>สามารถติดลบได้</em> 
          หากกราฟของฟังก์ชันอยู่ใต้แกน X ค่าอินทิกรัลในช่วงนั้นจะมีค่าเป็นลบ 
          ดังนั้น ถ้าโจทย์ต้องการ "พื้นที่ (Area)" รวมทั้งหมดจริงๆ เราจะต้องแบ่งช่วงอินทิเกรตตรงจุดตัดแกน X และใส่ค่าสัมบูรณ์ (Absolute Value) ให้กับส่วนที่อยู่ใต้แกน X 
          แต่ถ้าโจทย์ให้หา "ค่าอินทิกรัล" ก็สามารถตอบตามที่คำนวณได้เลย
        </p>
      </article>
    </div>
  );
}
