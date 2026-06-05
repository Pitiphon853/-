"use client";
import React, { useState } from 'react';
import { FunctionSquare, Plus, Trash2 } from 'lucide-react';

interface Term {
  id: string;
  coeff: string;
  exp: string;
}

export default function EvenOddFunctionChecker({ lang }: { lang: 'en' | 'th' }) {
  const [terms, setTerms] = useState<Term[]>([
    { id: '1', coeff: '1', exp: '2' }
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

  const checkSymmetry = () => {
    if (terms.length === 0) return null;

    let hasEven = false;
    let hasOdd = false;

    // Filter out terms with coefficient 0
    const validTerms = terms.filter(t => parseFloat(t.coeff || '0') !== 0);

    if (validTerms.length === 0) {
      // f(x) = 0 is both even and odd, but usually treated as even because 0 = 0.
      // Actually f(-x) = 0 = f(x) and f(-x) = 0 = -f(x). So it's both. Let's call it even for simplicity, or "Both".
      return { type: 'zero', th: 'ฟังก์ชันศูนย์ (เป็นทั้งฟังก์ชันคู่และฟังก์ชันคี่)', en: 'Zero function (Both even and odd)' };
    }

    for (const term of validTerms) {
      const exp = parseInt(term.exp || '0', 10);
      if (exp % 2 === 0) {
        hasEven = true;
      } else {
        hasOdd = true;
      }
    }

    if (hasEven && !hasOdd) {
      return { type: 'even', th: 'ฟังก์ชันคู่ (Even Function)', en: 'Even Function' };
    } else if (!hasEven && hasOdd) {
      return { type: 'odd', th: 'ฟังก์ชันคี่ (Odd Function)', en: 'Odd Function' };
    } else {
      return { type: 'neither', th: 'ไม่ใช่ทั้งฟังก์ชันคู่และฟังก์ชันคี่ (Neither)', en: 'Neither Even nor Odd' };
    }
  };

  const formatPolynomial = () => {
    const validTerms = terms.filter(t => parseFloat(t.coeff || '0') !== 0);
    if (validTerms.length === 0) return 'f(x) = 0';

    let str = 'f(x) = ';
    validTerms.forEach((term, index) => {
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

  const result = checkSymmetry();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <FunctionSquare className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'th' ? 'ตรวจสอบฟังก์ชันคู่และฟังก์ชันคี่' : 'Even / Odd Function Checker'}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            {lang === 'th' ? 'เพิ่มพจน์พหุนามเพื่อตรวจสอบว่าฟังก์ชันเป็นฟังก์ชันคู่ ฟังก์ชันคี่ หรือไม่ใช่ทั้งสองอย่าง' : 'Add polynomial terms to check if the function is even, odd, or neither.'}
          </p>

          <div className="space-y-3">
            {terms.map((term, index) => (
              <div key={term.id} className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-xl">
                <span className="font-medium text-gray-500 w-8">#{index + 1}</span>
                <input
                  type="number"
                  value={term.coeff}
                  onChange={(e) => updateTerm(term.id, 'coeff', e.target.value)}
                  placeholder="Coeff"
                  className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-center"
                />
                <span className="text-lg font-medium italic">x</span>
                <span className="text-lg">^</span>
                <input
                  type="number"
                  value={term.exp}
                  onChange={(e) => updateTerm(term.id, 'exp', e.target.value)}
                  placeholder="Exp"
                  className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-center"
                />
                
                {terms.length > 1 && (
                  <button
                    onClick={() => removeTerm(term.id)}
                    className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title={lang === 'th' ? 'ลบพจน์นี้' : 'Remove term'}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addTerm}
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            {lang === 'th' ? 'เพิ่มพจน์ใหม่' : 'Add Term'}
          </button>

          <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {lang === 'th' ? 'ฟังก์ชันปัจจุบัน:' : 'Current Function:'}
            </h3>
            <div className="text-xl font-mono text-purple-800 mb-6 bg-white p-4 rounded-lg border border-purple-200">
              {formatPolynomial()}
            </div>

            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {lang === 'th' ? 'ผลการตรวจสอบ:' : 'Result:'}
            </h3>
            {result && (
              <div className={`p-4 rounded-lg font-bold text-lg text-center ${
                result.type === 'even' ? 'bg-blue-100 text-blue-800' :
                result.type === 'odd' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {lang === 'th' ? result.th : result.en}
              </div>
            )}
            
            <div className="mt-4 text-sm text-purple-800 bg-white p-4 rounded-lg">
              <p><strong>{lang === 'th' ? 'เงื่อนไขทางคณิตศาสตร์:' : 'Mathematical Condition:'}</strong></p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Even:</strong> f(-x) = f(x)</li>
                <li><strong>Odd:</strong> f(-x) = -f(x)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-purple max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ฟังก์ชันคู่และฟังก์ชันคี่ (Even and Odd Functions)</h2>
        <p>
          ในการศึกษาวิชาคณิตศาสตร์และแคลคูลัส การตรวจสอบสมมาตรของฟังก์ชันเป็นสิ่งที่มีประโยชน์อย่างมาก 
          เพราะช่วยให้เราสามารถวาดกราฟได้ง่ายขึ้น และช่วยลดขั้นตอนในการคำนวณอินทิกรัลแบบจำกัดเขต (Definite Integral) ลงไปได้มาก 
          ฟังก์ชันสามารถแบ่งตามลักษณะสมมาตรได้เป็น <strong>ฟังก์ชันคู่ (Even Function)</strong> และ <strong>ฟังก์ชันคี่ (Odd Function)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. ฟังก์ชันคู่ (Even Function)</h3>
        <p>
          ฟังก์ชัน f(x) จะเป็นฟังก์ชันคู่ ก็ต่อเมื่อเป็นจริงตามเงื่อนไข:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 text-lg">
          f(-x) = f(x)
        </div>
        <p>
          <strong>ลักษณะสมมาตร:</strong> กราฟของฟังก์ชันคู่จะมี <em>สมมาตรเทียบกับแกน y</em> (Y-axis symmetry) 
          นั่นหมายความว่า หากพับกราฟตามแนวแกน y ซ้ายและขวาจะทับกันสนิทพอดี
        </p>
        <p><strong>ตัวอย่างฟังก์ชันคู่:</strong> f(x) = x², f(x) = x⁴ + 3, f(x) = cos(x), f(x) = |x|</p>
        <p><em>ข้อสังเกตสำหรับฟังก์ชันพหุนาม:</em> หากเลขชี้กำลังของตัวแปร x ในทุกพจน์เป็น <strong>เลขคู่</strong> (รวมถึงค่าคงที่ ซึ่งถือเป็น x⁰) ฟังก์ชันนั้นจะเป็นฟังก์ชันคู่</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. ฟังก์ชันคี่ (Odd Function)</h3>
        <p>
          ฟังก์ชัน f(x) จะเป็นฟังก์ชันคี่ ก็ต่อเมื่อเป็นจริงตามเงื่อนไข:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 text-lg">
          f(-x) = -f(x)
        </div>
        <p>
          <strong>ลักษณะสมมาตร:</strong> กราฟของฟังก์ชันคี่จะมี <em>สมมาตรเทียบกับจุดกำเนิด</em> (Origin symmetry) 
          นั่นหมายความว่า หากหมุนกราฟ 180 องศารอบจุดกำเนิด (0,0) กราฟจะกลับมาทับตำแหน่งเดิม
        </p>
        <p><strong>ตัวอย่างฟังก์ชันคี่:</strong> f(x) = x³, f(x) = x⁵ - 2x, f(x) = sin(x), f(x) = tan(x)</p>
        <p><em>ข้อสังเกตสำหรับฟังก์ชันพหุนาม:</em> หากเลขชี้กำลังของตัวแปร x ในทุกพจน์เป็น <strong>เลขคี่</strong> โดยไม่มีค่าคงที่บวกอยู่ ฟังก์ชันนั้นจะเป็นฟังก์ชันคี่</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. ฟังก์ชันที่ไม่ใช่ทั้งคู่และคี่ (Neither)</h3>
        <p>
          ฟังก์ชันส่วนใหญ่ในโลกคณิตศาสตร์มักจะไม่ใช่ทั้งฟังก์ชันคู่และฟังก์ชันคี่ ซึ่งหมายความว่า f(-x) ไม่เท่ากับ f(x) และไม่เท่ากับ -f(x)
        </p>
        <p><strong>ตัวอย่าง:</strong> f(x) = x² + x (ประกอบด้วยเลขชี้กำลังที่เป็นทั้งคู่และคี่ปะปนกัน)</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการทราบว่าฟังก์ชันเป็นคู่หรือคี่</h3>
        <p>หนึ่งในประโยชน์ที่สำคัญที่สุดคือการใช้ช่วยคำนวณอินทิกรัลแบบจำกัดเขตในช่วง [-a, a] สมมาตร:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ถ้า f(x) เป็นฟังก์ชันคี่:</strong> ∫ (จาก -a ถึง a) f(x) dx = 0 (พื้นที่ด้านบนและด้านล่างแกน x จะหักล้างกันหมดพอดี)</li>
          <li><strong>ถ้า f(x) เป็นฟังก์ชันคู่:</strong> ∫ (จาก -a ถึง a) f(x) dx = 2 * ∫ (จาก 0 ถึง a) f(x) dx (คำนวณแค่ครึ่งเดียวแล้วคูณสอง ช่วยให้คิดเลขได้ไวขึ้น)</li>
        </ul>
      </article>
    </div>
  );
}
