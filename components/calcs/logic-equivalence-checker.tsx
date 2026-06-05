import React, { useState } from 'react';
import { Calculator, CheckCircle, XCircle } from 'lucide-react';

const tokenize = (str: string) => {
    return str.match(/(<->|->|&&|\|\||[&|~!()PQRpqrTFtf])/g) || [];
};

const precedence: Record<string, number> = {
    '<->': 1,
    '->': 2,
    '||': 3,
    '|': 3,
    '&&': 4,
    '&': 4,
    '~': 5,
    '!': 5
};

const toPostfix = (tokens: string[]) => {
    const output: string[] = [];
    const stack: string[] = [];
    for (const token of tokens) {
        if (/^[PQRpqrTFtf]$/.test(token)) {
            output.push(token.toUpperCase());
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop()!);
            }
            if (stack.length) stack.pop();
        } else {
            while (stack.length && stack[stack.length - 1] !== '(' && precedence[stack[stack.length - 1]] >= precedence[token]) {
                output.push(stack.pop()!);
            }
            stack.push(token);
        }
    }
    while (stack.length) {
        output.push(stack.pop()!);
    }
    return output;
};

const evaluatePostfix = (postfix: string[], p: boolean, q: boolean, r: boolean): boolean => {
    const stack: boolean[] = [];
    for (const token of postfix) {
        if (token === 'P') stack.push(p);
        else if (token === 'Q') stack.push(q);
        else if (token === 'R') stack.push(r);
        else if (token === 'T') stack.push(true);
        else if (token === 'F') stack.push(false);
        else if (token === '~' || token === '!') {
            if (stack.length < 1) return false;
            const val = stack.pop()!;
            stack.push(!val);
        } else {
            if (stack.length < 2) return false;
            const b = stack.pop()!;
            const a = stack.pop()!;
            if (token === '&&' || token === '&') stack.push(a && b);
            else if (token === '||' || token === '|') stack.push(a || b);
            else if (token === '->') stack.push(!a || b);
            else if (token === '<->') stack.push(a === b);
        }
    }
    return stack[0] ?? false;
};

export default function LogicEquivalenceChecker({ lang }: { lang: 'TH' | 'EN' }) {
  const [expr1, setExpr1] = useState('');
  const [expr2, setExpr2] = useState('');
  
  const tokens1 = tokenize(expr1);
  const postfix1 = toPostfix(tokens1);
  const tokens2 = tokenize(expr2);
  const postfix2 = toPostfix(tokens2);
  
  const combinations = [
    [true, true, true],
    [true, true, false],
    [true, false, true],
    [true, false, false],
    [false, true, true],
    [false, true, false],
    [false, false, true],
    [false, false, false],
  ];

  let isEquivalent = true;
  let hasValidInput = expr1.length > 0 && expr2.length > 0;

  const results = combinations.map(([p, q, r]) => {
      try {
          const r1 = evaluatePostfix(postfix1, p, q, r);
          const r2 = evaluatePostfix(postfix2, p, q, r);
          if (r1 !== r2) isEquivalent = false;
          return [r1, r2];
      } catch (e) {
          hasValidInput = false;
          return [null, null];
      }
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <Calculator className="text-blue-500" />
        {lang === 'EN' ? 'Logic Equivalence Checker' : 'เครื่องมือตรวจสอบสมมูลตรรกศาสตร์'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'EN' ? 'Expression 1:' : 'นิพจน์ที่ 1:'}
          </label>
          <input
            type="text"
            value={expr1}
            onChange={(e) => setExpr1(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ~(P & Q)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'EN' ? 'Expression 2:' : 'นิพจน์ที่ 2:'}
          </label>
          <input
            type="text"
            value={expr2}
            onChange={(e) => setExpr2(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ~P | ~Q"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {lang === 'EN' 
          ? 'Use operators: &, |, ~, ->, <->. Variables: P, Q, R. Example: De Morgan\'s Laws ~(P & Q) and ~P | ~Q'
          : 'ตัวดำเนินการ: & (และ), | (หรือ), ~ (นิเสธ), -> (ถ้าแล้ว), <-> (ก็ต่อเมื่อ). ตัวแปร P, Q, R'}
      </div>

      {hasValidInput && (
        <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${isEquivalent ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
          {isEquivalent ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          <div>
            <div className="font-bold text-lg">
              {isEquivalent 
                ? (lang === 'EN' ? 'Expressions are Logically Equivalent!' : 'นิพจน์ทั้งสองสมมูลกัน!')
                : (lang === 'EN' ? 'Expressions are NOT Logically Equivalent.' : 'นิพจน์ทั้งสองไม่สมมูลกัน!')}
            </div>
            <div className="text-sm opacity-90">
              {isEquivalent 
                ? (lang === 'EN' ? 'They produce the exact same truth values for all possible combinations.' : 'ทั้งสองประพจน์ให้ค่าความจริงเหมือนกันในทุกกรณี')
                : (lang === 'EN' ? 'There is at least one case where their truth values differ.' : 'มีอย่างน้อย 1 กรณีที่ค่าความจริงไม่ตรงกัน')}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 border border-gray-300 dark:border-gray-700">P</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Q</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">R</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">{expr1 || 'Expr 1'}</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">{expr2 || 'Expr 2'}</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map(([p, q, r], i) => {
              const [r1, r2] = results[i];
              const mismatch = hasValidInput && r1 !== r2;
              return (
                <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${mismatch ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400">{p ? 'T' : 'F'}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400">{q ? 'T' : 'F'}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400">{r ? 'T' : 'F'}</td>
                  <td className={`p-3 border border-gray-300 dark:border-gray-700 font-bold ${r1 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {expr1 ? (r1 === null ? '-' : (r1 ? 'T' : 'F')) : '-'}
                  </td>
                  <td className={`p-3 border border-gray-300 dark:border-gray-700 font-bold ${r2 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {expr2 ? (r2 === null ? '-' : (r2 ? 'T' : 'F')) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mt-12 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl leading-relaxed">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">การสมมูลทางตรรกศาสตร์ (Logical Equivalence) คืออะไร?</h3>
        <p>
          ในทางตรรกศาสตร์ <strong>การสมมูล (Logical Equivalence)</strong> หรือที่มักเขียนแทนด้วยสัญลักษณ์ "≡" หรือ "⇔" เป็นการบอกความสัมพันธ์ของประพจน์ (Propositions) ตั้งแต่ 2 ประพจน์ขึ้นไป ว่ามีค่าความจริง (Truth Values) ที่เหมือนกันตรงกันทุกประการแบบกรณีต่อกรณี (Row-by-Row) เมื่อเทียบในตารางค่าความจริง
        </p>
        <p>
          ถ้าประพจน์สองประพจน์สมมูลกัน หมายความว่าเราสามารถนำประพจน์ใดประพจน์หนึ่งไปใช้แทนอีกประพจน์หนึ่งได้อย่างสมบูรณ์ โดยไม่ทำให้ค่าความจริงโดยรวมของระบบเปลี่ยนแปลงไป ซึ่งมีประโยชน์อย่างมากในการลดรูป (Simplification) ของสมการตรรกะที่ซับซ้อนให้สั้นลงและเข้าใจง่ายขึ้น ทั้งในเชิงการคำนวณคณิตศาสตร์ และในกระบวนการออกแบบและปรับปรุงประสิทธิภาพของระบบดิจิทัล (Digital Circuit Optimization)
        </p>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">กฎการสมมูลที่สำคัญที่ควรทราบ (Laws of Logical Equivalence)</h4>
        <p>
          เพื่อให้ง่ายต่อการวิเคราะห์นิพจน์ตรรกศาสตร์ยาวๆ เรามักจะใช้ "กฎการสมมูล" เพื่อช่วยลดรูปประพจน์โดยไม่ต้องเสียเวลาสร้างตารางค่าความจริงทั้งหมด กฎที่ถูกใช้บ่อยในวิชาคณิตศาสตร์ ม.ปลาย และวิทยาการคอมพิวเตอร์ ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>กฎของเดอมอร์แกน (De Morgan's Laws):</strong> <br/> ~(P ∧ Q) ≡ ~P ∨ ~Q <br/> ~(P ∨ Q) ≡ ~P ∧ ~Q</li>
          <li><strong>กฎการสลับที่ (Commutative Laws):</strong> <br/> P ∧ Q ≡ Q ∧ P <br/> P ∨ Q ≡ Q ∨ P</li>
          <li><strong>กฎการเปลี่ยนหมู่ (Associative Laws):</strong> <br/> (P ∧ Q) ∧ R ≡ P ∧ (Q ∧ R) <br/> (P ∨ Q) ∨ R ≡ P ∨ (Q ∨ R)</li>
          <li><strong>กฎการแจกแจง (Distributive Laws):</strong> <br/> P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R) <br/> P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)</li>
          <li><strong>กฎของการเป็นเงื่อนไข (Implication Laws):</strong> <br/> P → Q ≡ ~P ∨ Q <br/> ~(P → Q) ≡ P ∧ ~Q</li>
        </ul>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">ประโยชน์ของการตรวจสอบสมมูลทางตรรกศาสตร์</h4>
        <p>
          การใช้เครื่องมือตรวจสอบสมมูล (Logic Equivalence Checker) ของเรา จะช่วยให้คุณประหยัดเวลาอย่างมากในการตรวจสอบข้อสอบ พิสูจน์ทฤษฎีบท หรือแก้ปัญหาโจทย์ตรรกศาสตร์ที่ซับซ้อน เพียงแค่คุณป้อนนิพจน์ตรรกศาสตร์ 2 นิพจน์ที่ต้องการเปรียบเทียบ ระบบจะสร้างตารางค่าความจริงแบบอัตโนมัติ พร้อมทั้งเปรียบเทียบผลลัพธ์ในทุกกรณี และรายงานผลทันทีว่าประพจน์ทั้งสอง "สมมูลกัน" หรือไม่ ทำให้คุณเรียนรู้ได้อย่างมีประสิทธิภาพและมั่นใจในผลลัพธ์มากยิ่งขึ้น
        </p>
      </article>
    </div>
  );
}
