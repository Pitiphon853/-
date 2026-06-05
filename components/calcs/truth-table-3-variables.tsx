import React, { useState } from 'react';
import { Calculator, Delete, ArrowRight } from 'lucide-react';

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

export default function TruthTable3Variables({ lang }: { lang: 'TH' | 'EN' }) {
  const [expr, setExpr] = useState('');
  
  const tokens = tokenize(expr);
  const postfix = toPostfix(tokens);
  
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

  const results = combinations.map(([p, q, r]) => {
      try {
          return evaluatePostfix(postfix, p, q, r);
      } catch (e) {
          return null;
      }
  });

  const insertToken = (token: string) => setExpr((prev) => prev + token);
  const clearExpr = () => setExpr('');
  const backspace = () => setExpr((prev) => prev.slice(0, -1));

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <Calculator className="text-blue-500" />
        {lang === 'EN' ? 'Truth Table (3 Variables)' : 'เครื่องมือคำนวณตารางค่าความจริง 3 ตัวแปร'}
      </h2>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {lang === 'EN' ? 'Logic Expression:' : 'นิพจน์ตรรกศาสตร์:'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder={lang === 'EN' ? 'e.g., (P & Q) -> R' : 'เช่น (P & Q) -> R'}
            />
            <button onClick={backspace} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-white hover:bg-gray-300">
              <Delete size={20} />
            </button>
            <button onClick={clearExpr} className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-bold">
              C
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['P', 'Q', 'R', '~', '&', '|', '->', '<->', '(', ')'].map((t) => (
            <button
              key={t}
              onClick={() => insertToken(t)}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition"
            >
              {t === '&' ? '∧' : t === '|' ? '∨' : t === '~' ? '¬' : t === '->' ? '→' : t === '<->' ? '↔' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 border border-gray-300 dark:border-gray-700">P</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Q</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">R</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">{expr || (lang === 'EN' ? 'Result' : 'ผลลัพธ์')}</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map(([p, q, r], i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium text-blue-600 dark:text-blue-400">{p ? 'T' : 'F'}</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium text-blue-600 dark:text-blue-400">{q ? 'T' : 'F'}</td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 font-medium text-blue-600 dark:text-blue-400">{r ? 'T' : 'F'}</td>
                <td className={`p-3 border border-gray-300 dark:border-gray-700 font-bold ${results[i] ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {expr ? (results[i] === null ? '-' : (results[i] ? 'T' : 'F')) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mt-12 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl leading-relaxed">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ตารางค่าความจริง 3 ตัวแปร (Truth Table for 3 Variables) คืออะไร?</h3>
        <p>
          ตารางค่าความจริง (Truth Table) เป็นเครื่องมือทางตรรกศาสตร์คณิตศาสตร์และวิทยาการคอมพิวเตอร์ ที่ใช้สำหรับวิเคราะห์และแจกแจงค่าความจริงที่เป็นไปได้ทั้งหมดของประพจน์เชิงประกอบ (Compound Proposition) ซึ่งประกอบด้วยประพจน์ย่อยตั้งแต่ 1 ตัวขึ้นไป โดยมีตัวเชื่อมทางตรรกศาสตร์ เช่น และ (AND), หรือ (OR), นิเสธ (NOT), ถ้า...แล้ว (IMPLIES) และ ก็ต่อเมื่อ (IFF)
        </p>
        <p>
          ในกรณีของตารางค่าความจริงที่มี 3 ตัวแปร (มักใช้ตัวอักษร P, Q และ R เป็นตัวแทนของประพจน์ย่อย) จำนวนกรณีที่เป็นไปได้ทั้งหมดจะเท่ากับ <strong>2 ยกกำลัง 3 (2³) หรือเท่ากับ 8 กรณี</strong> โดยเรียงลำดับจากกรณีที่ P, Q, R เป็นจริง (T) ทั้งหมด ไปจนถึงกรณีที่เป็นเท็จ (F) ทั้งหมด การเรียงลำดับอย่างเป็นระบบช่วยให้เราไม่พลาดกรณีใดกรณีหนึ่ง และสามารถตรวจสอบความถูกต้องของนิพจน์ทางตรรกศาสตร์ได้อย่างครบถ้วน
        </p>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">สัญลักษณ์และตัวเชื่อมทางตรรกศาสตร์ที่สำคัญ</h4>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>นิเสธ (NOT, ~ หรือ ¬)</strong>: เป็นการกลับค่าความจริง ถ้าประพจน์เดิมเป็นจริง นิเสธจะเป็นเท็จ และถ้าประพจน์เดิมเป็นเท็จ นิเสธจะเป็นจริง</li>
          <li><strong>และ (AND, ∧ หรือ &)</strong>: ประพจน์ผสมจะเป็นจริง (T) ก็ต่อเมื่อประพจน์ย่อยทั้งสองตัวต้องเป็นจริง (T) เท่านั้น ในกรณีอื่นจะเป็นเท็จ (F) ทั้งหมด</li>
          <li><strong>หรือ (OR, ∨ หรือ |)</strong>: ประพจน์ผสมจะเป็นเท็จ (F) ก็ต่อเมื่อประพจน์ย่อยทั้งสองตัวต้องเป็นเท็จ (F) เท่านั้น ในกรณีอื่นจะเป็นจริง (T) ทั้งหมด</li>
          <li><strong>ถ้า...แล้ว (IMPLIES, →)</strong>: ประพจน์ผสมจะเป็นเท็จ (F) ได้เพียงกรณีเดียว คือ ประพจน์เหตุ (ตัวหน้า) เป็นจริง (T) และประพจน์ผล (ตัวหลัง) เป็นเท็จ (F) เท่านั้น กรณีอื่นถือว่าเป็นจริง (T) เสมอ</li>
          <li><strong>ก็ต่อเมื่อ (IFF, ↔)</strong>: ประพจน์ผสมจะเป็นจริง (T) ก็ต่อเมื่อประพจน์ย่อยทั้งสองมีค่าความจริงเหมือนกัน (เป็นจริงทั้งคู่ หรือ เป็นเท็จทั้งคู่)</li>
        </ul>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">การประยุกต์ใช้ตารางค่าความจริง</h4>
        <p>
          การคำนวณและวิเคราะห์ค่าความจริงด้วยตาราง ไม่ได้มีประโยชน์แค่เพียงในการเรียนการสอนวิชาคณิตศาสตร์และตรรกศาสตร์เท่านั้น แต่ยังเป็นรากฐานที่สำคัญอย่างยิ่งในสาขาวิทยาการคอมพิวเตอร์ (Computer Science) และวิศวกรรมคอมพิวเตอร์ โดยเฉพาะอย่างยิ่งในการออกแบบวงจรดิจิทัล (Digital Logic Design) วงจรลอจิกเกต (Logic Gates) สถาปัตยกรรมคอมพิวเตอร์ ตลอดจนถึงการเขียนโปรแกรมและการพัฒนาซอฟต์แวร์
        </p>
        <p>
          นอกจากนี้ ยังสามารถใช้ตารางค่าความจริงในการพิสูจน์การสมมูลทางตรรกศาสตร์ (Logical Equivalence) ซึ่งเป็นการแสดงให้เห็นว่ารูปแบบประพจน์สองรูปแบบให้ผลลัพธ์เหมือนกันทุกกรณี หรือใช้เพื่อตรวจสอบว่าประพจน์นั้นเป็นสัจนิรันดร์ (Tautology) คือมีค่าความจริงเป็นจริงในทุกกรณีหรือไม่ เครื่องมือวิเคราะห์ตรรกศาสตร์ออนไลน์นี้ จึงถูกออกแบบมาเพื่อให้การสร้างและตรวจสอบตารางค่าความจริง 3 ตัวแปรเป็นเรื่องง่าย รวดเร็ว และแม่นยำที่สุด
        </p>
      </article>
    </div>
  );
}
