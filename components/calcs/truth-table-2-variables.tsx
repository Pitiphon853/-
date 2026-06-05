import React, { useState } from 'react';
import { Calculator, Delete, RotateCcw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const tokenize = (str: string) => {
    return str.match(/(<->|->|&&|\|\||[&|~!()PQpqTFtf])/g) || [];
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
        if (/^[PQpqTFtf]$/.test(token)) {
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

const evaluatePostfix = (postfix: string[], p: boolean, q: boolean): boolean => {
    const stack: boolean[] = [];
    for (const token of postfix) {
        if (token === 'P') stack.push(p);
        else if (token === 'Q') stack.push(q);
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

export default function TruthTable2Variables({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');
    const [expr, setExpr] = useState('P && Q -> P');

    const tokens = tokenize(expr);
    const postfix = toPostfix(tokens);

    const combinations = [
        [true, true],
        [true, false],
        [false, true],
        [false, false],
    ];

    const results = combinations.map(([p, q]) => {
        try {
            return evaluatePostfix(postfix, p, q);
        } catch (e) {
            return null;
        }
    });

    const insertToken = (token: string) => setExpr((prev) => prev + token);
    const clearExpr = () => setExpr('');
    const backspace = () => setExpr((prev) => prev.slice(0, -1));

    // Analyze statement type
    let analysisText = '';
    let analysisType: 'tautology' | 'contradiction' | 'contingent' | 'empty' = 'empty';

    if (expr.trim() === '') {
        analysisType = 'empty';
    } else {
        const allTrue = results.every(r => r === true);
        const allFalse = results.every(r => r === false);
        if (allTrue) {
            analysisType = 'tautology';
            analysisText = isTh
                ? 'ประพจน์นี้เป็น "สัจนิรันดร์ (Tautology)" เนื่องจากมีค่าความจริงเป็นจริงในทุกกรณี'
                : 'This expression is a "Tautology" because it is true in all cases.';
        } else if (allFalse) {
            analysisType = 'contradiction';
            analysisText = isTh
                ? 'ประพจน์นี้เป็น "ข้อขัดแย้ง (Contradiction)" เนื่องจากมีค่าความจริงเป็นเท็จในทุกกรณี'
                : 'This expression is a "Contradiction" because it is false in all cases.';
        } else {
            analysisType = 'contingent';
            analysisText = isTh
                ? 'ประพจน์นี้เป็น "ประพจน์ทั่วไป (Contingency)" เนื่องจากมีค่าความจริงที่เป็นไปได้ทั้งจริงและเท็จสลับกัน'
                : 'This expression is a "Contingency" because it has mixed truth values.';
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-blue-600" />
                {isTh ? 'เครื่องมือคำนวณตารางสัจนิรันดร์ทางตรรกศาสตร์ (2 ตัวแปร)' : 'Truth Table & Tautology Calculator (2 Variables)'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs & Virtual Keyboard */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ป้อนนิพจน์ตรรกศาสตร์' : 'Enter Logical Expression'}
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={expr}
                                    onChange={(e) => setExpr(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 font-mono text-lg"
                                    placeholder={isTh ? 'เช่น (P && Q) -> P' : 'e.g., (P && Q) -> P'}
                                />
                                <button
                                    onClick={backspace}
                                    className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
                                    title={isTh ? 'ลบทีละตัว' : 'Backspace'}
                                >
                                    <Delete size={20} />
                                </button>
                                <button
                                    onClick={clearExpr}
                                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-bold transition"
                                    title={isTh ? 'ล้างทั้งหมด' : 'Clear'}
                                >
                                    C
                                </button>
                            </div>

                            {/* Keyboard controls */}
                            <div className="grid grid-cols-5 gap-2">
                                {[
                                    { display: 'P', value: 'P' },
                                    { display: 'Q', value: 'Q' },
                                    { display: '(', value: '(' },
                                    { display: ')', value: ')' },
                                    { display: '¬ (~)', value: '~' },
                                    { display: '∧ (&&)', value: ' && ' },
                                    { display: '∨ (||)', value: ' || ' },
                                    { display: '→ (->)', value: ' -> ' },
                                    { display: '↔ (<->)', value: ' <-> ' },
                                    { display: 'T (True)', value: 'T' }
                                ].map((btn) => (
                                    <button
                                        key={btn.display}
                                        onClick={() => insertToken(btn.value)}
                                        className="py-2.5 px-1 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition text-xs sm:text-sm text-center"
                                    >
                                        {btn.display}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setExpr('P && Q -> P')}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> {isTh ? 'รีเซ็ตเป็นตัวอย่างเริ่มต้น' : 'Reset to Default Example'}
                    </button>
                </div>

                {/* Truth Table and Analysis */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-blue-950 mb-4 border-b border-blue-200 pb-2">
                            {isTh ? 'ตารางค่าความจริงและผลวิเคราะห์' : 'Truth Table & Analysis'}
                        </h2>

                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg border border-blue-200 bg-white mb-6">
                            <table className="w-full text-center border-collapse">
                                <thead>
                                    <tr className="bg-blue-600 text-white font-semibold">
                                        <th className="p-3 border-r border-blue-500">P</th>
                                        <th className="p-3 border-r border-blue-500">Q</th>
                                        <th className="p-3">
                                            <span className="font-mono text-sm">{expr || '?'}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-100">
                                    {combinations.map(([p, q], i) => (
                                        <tr key={i} className="hover:bg-blue-50/50">
                                            <td className="p-3 border-r border-blue-100 font-bold text-gray-700">
                                                {p ? 'T' : 'F'}
                                            </td>
                                            <td className="p-3 border-r border-blue-100 font-bold text-gray-700">
                                                {q ? 'T' : 'F'}
                                            </td>
                                            <td className={`p-3 font-extrabold ${results[i] ? 'text-green-600' : 'text-red-600'}`}>
                                                {expr.trim() === '' ? '-' : (results[i] ? 'T' : 'F')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Analysis Card */}
                        {analysisType !== 'empty' && (
                            <div className={`p-4 rounded-lg flex items-start gap-3 ${
                                analysisType === 'tautology'
                                    ? 'bg-green-100 border border-green-200 text-green-800'
                                    : analysisType === 'contradiction'
                                        ? 'bg-red-100 border border-red-200 text-red-800'
                                        : 'bg-yellow-100 border border-yellow-200 text-yellow-800'
                            }`}>
                                {analysisType === 'tautology' && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />}
                                {analysisType === 'contradiction' && <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
                                {analysisType === 'contingent' && <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />}
                                <div>
                                    <p className="font-bold text-sm">
                                        {analysisType === 'tautology' && (isTh ? 'สัจนิรันดร์' : 'Tautology')}
                                        {analysisType === 'contradiction' && (isTh ? 'ข้อขัดแย้ง' : 'Contradiction')}
                                        {analysisType === 'contingent' && (isTh ? 'ประพจน์ทั่วไป' : 'Contingency')}
                                    </p>
                                    <p className="text-xs mt-1">{analysisText}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-blue-200 text-xs text-blue-800 text-center font-mono">
                        {isTh ? 'ตารางครอบคลุม 2² = 4 กรณีที่เป็นไปได้ทั้งหมด' : 'Table covers 2² = 4 possible combinations.'}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-blue max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ตารางค่าความจริง 2 ตัวแปร (P, Q) และการตรวจสอบความเป็นสัจนิรันดร์ (Tautology)
                </h2>
                <p>
                    ในวิชาตรรกศาสตร์คณิตศาสตร์ (Mathematical Logic) <strong>ประพจน์ (Proposition)</strong> คือประโยคบอกเล่าหรือปฏิเสธที่มีค่าความจริงเป็นจริง (True - T) หรือเท็จ (False - F) อย่างใดอย่างหนึ่งเท่านั้น เมื่อนำประพจน์ย่อยมารวมกันด้วย <strong>ตัวเชื่อมตรรกศาสตร์ (Logical Connectives)</strong> จะเกิดเป็นประพจน์ผสม เพื่อการแจกแจงประเมินค่าความจริงในทุกกรณีที่เป็นไปได้ เราจะใช้ <strong>ตารางค่าความจริง (Truth Table)</strong> เป็นเครื่องมือหลัก
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การจัดกรณีค่าความจริงสำหรับ 2 ตัวแปร</h3>
                <p>
                    หากเรามีตัวแปรประพจน์ 2 ตัว คือ $P$ และ $Q$ จะมีความเป็นไปได้ในการจับคู่ค่าความจริงทั้งหมด $2^2 = 4$ กรณี ซึ่งนิยมเรียงจากจริงคู่จนถึงเท็จคู่ ดังนี้:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>กรณีที่ 1: $P$ เป็นจริง ($T$) และ $Q$ เป็นจริง ($T$)</li>
                    <li>กรณีที่ 2: $P$ เป็นจริง ($T$) และ $Q$ เป็นเท็จ ($F$)</li>
                    <li>กรณีที่ 3: $P$ เป็นเท็จ ($F$) และ $Q$ เป็นจริง ($T$)</li>
                    <li>กรณีที่ 4: $P$ เป็นเท็จ ($F$) และ $Q$ เป็นเท็จ ($F$)</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวเชื่อมทางตรรกศาสตร์พื้นฐานที่ควรรู้</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>และ (AND - ∧ / &&):</strong> จะเป็นจริงเมื่อทั้ง $P$ และ $Q$ มีค่าเป็นจริงทั้งคู่เท่านั้น</li>
                    <li><strong>หรือ (OR - ∨ / ||):</strong> จะเป็นเท็จเมื่อทั้ง $P$ และ $Q$ มีค่าเป็นเท็จทั้งคู่เท่านั้น</li>
                    <li><strong>ถ้า...แล้ว (Conditional - → / {"->"}):</strong> จะเป็นเท็จเมื่อเหตุ (หน้า) เป็นจริง และผล (หลัง) เป็นเท็จเพียงกรณีเดียว</li>
                    <li><strong>ก็ต่อเมื่อ (Biconditional - ↔ / &lt;-&gt;):</strong> จะเป็นจริงเมื่อมีค่าความจริงเหมือนกัน (T กับ T หรือ F กับ F)</li>
                    <li><strong>นิเสธ (Negation - ~ / ¬):</strong> สลับค่าความจริงของประพจน์ย่อย</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สัจนิรันดร์ (Tautology) คืออะไร?</h3>
                <p>
                    <strong>สัจนิรันดร์ (Tautology)</strong> คือรูปแบบของประพจน์ที่มีค่าความจริงเป็น <strong>&ldquo;จริง&rdquo; เสมอในทุกกรณี</strong> ไม่ว่าตัวแปรย่อย (เช่น P, Q) จะมีค่าความจริงเป็นอย่างไรก็ตาม
                    <br />
                    การพิสูจน์สัจนิรันดร์ทำได้หลากหลายวิธี เช่น การสร้างตารางค่าความจริง (หากคำตอบช่องสุดท้ายเป็นจริง (T) ทั้ง 4 แถว แสดงว่าเป็นสัจนิรันดร์) หรือการพิสูจน์โดยหาข้อขัดแย้ง (Proof by Contradiction)
                </p>
                <p>
                    ตัวอย่างของสัจนิรันดร์ที่พบบ่อย:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>$P \lor \sim P$ (กฎการละเว้นค่ากลาง - Law of Excluded Middle): เป็นจริงเสมอเพราะประพจน์ต้องเป็นจริงหรือเท็จอย่างใดอย่างหนึ่ง</li>
                    <li>$(P \land Q) \to P$: ถ้าทั้งสองเป็นจริง พจน์แรกย่อมเป็นจริงด้วย</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อขัดแย้ง (Contradiction) และประพจน์ทั่วไป (Contingency)</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>ข้อขัดแย้ง (Contradiction):</strong> คือประพจน์ที่มีค่าความจริงเป็น <strong>&ldquo;เท็จ&rdquo; ในทุกกรณี</strong> (เช่น $P \land \sim P$)</li>
                    <li><strong>ประพจน์ทั่วไป (Contingency):</strong> คือประพจน์ที่ไม่ใช่ทั้งสัจนิรันดร์และไม่ใช่ข้อขัดแย้ง กล่าวคือมีผลลัพธ์เป็นได้ทั้งจริงและเท็จขึ้นอยู่กับค่าของ $P$ และ $Q$</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้งาน</h3>
                <p>
                    การทำความเข้าใจสัจนิรันดร์และตรรกศาสตร์ 2 ตัวแปรเป็นบันไดขั้นสำคัญสำหรับการเขียนโค้ดคำสั่งควบคุมทิศทางโปรแกรม (เช่น โครงสร้างคำสั่งเงื่อนไข if-else), การลดรูปวงจรไฟฟ้าดิจิทัล (Boolean Algebra Simplification) เพื่อประหยัดฮาร์ดแวร์ในไมโครโปรเซสเซอร์ และการวิเคราะห์การเขียนแบบเงื่อนไขสัญญากฎหมายเพื่อตรวจสอบช่องโหว่ความไม่สอดคล้องกันของเงื่อนไข เครื่องมือนี้ช่วยให้นักเรียนและนักพัฒนาคำนวณตรวจสอบความถูกต้องของนิพจน์ตรรกศาสตร์ได้อย่างสะดวกรวดเร็วและไม่มีข้อผิดพลาด
                </p>
            </article>
        </div>
    );
}
