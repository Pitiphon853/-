import React, { useState } from 'react';
import { Calculator, RefreshCw, HelpCircle, AlertTriangle } from 'lucide-react';

export default function BayesTheorem({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');

    const [mode, setMode] = useState<'simple' | 'diagnostic'>('diagnostic');
    const [format, setFormat] = useState<'decimal' | 'percent'>('percent');

    // Simple Mode State
    const [pA, setPA] = useState<string>('10');
    const [pBA, setPBA] = useState<string>('80');
    const [pB, setPB] = useState<string>('20');

    // Diagnostic/Extended Mode State
    const [prevA, setPrevA] = useState<string>('1'); // Prior P(A)
    const [sensBgivenA, setSensBgivenA] = useState<string>('99'); // True Positive P(B|A)
    const [falsePosBgivenNotA, setFalsePosBgivenNotA] = useState<string>('5'); // False Positive P(B|A')

    const handleReset = () => {
        if (mode === 'simple') {
            setPA(format === 'decimal' ? '0.1' : '10');
            setPBA(format === 'decimal' ? '0.8' : '80');
            setPB(format === 'decimal' ? '0.2' : '20');
        } else {
            setPrevA(format === 'decimal' ? '0.01' : '1');
            setSensBgivenA(format === 'decimal' ? '0.99' : '99');
            setFalsePosBgivenNotA(format === 'decimal' ? '0.05' : '5');
        }
    };

    // Helper to convert inputs based on format
    const toDecimal = (valStr: string) => {
        const num = parseFloat(valStr);
        if (isNaN(num)) return NaN;
        return format === 'percent' ? num / 100 : num;
    };

    const fromDecimal = (num: number) => {
        if (isNaN(num)) return '';
        const raw = format === 'percent' ? num * 100 : num;
        return parseFloat(raw.toFixed(6)).toString();
    };

    // Simple calculations
    const valPA = toDecimal(pA);
    const valPBA = toDecimal(pBA);
    const valPB = toDecimal(pB);

    let simpleError = '';
    let simpleResult = NaN;
    if (mode === 'simple') {
        if (isNaN(valPA) || isNaN(valPBA) || isNaN(valPB)) {
            simpleError = isTh ? 'กรุณากรอกข้อมูลตัวเลขให้ครบถ้วน' : 'Please fill in all fields with valid numbers.';
        } else if (valPA < 0 || valPA > 1 || valPBA < 0 || valPBA > 1 || valPB < 0 || valPB > 1) {
            simpleError = isTh ? 'ความน่าจะเป็นต้องอยู่ระหว่าง 0 ถึง 1 (หรือ 0% ถึง 100%)' : 'Probabilities must be between 0 and 1 (or 0% to 100%).';
        } else if (valPBA * valPA > valPB) {
            simpleError = isTh 
                ? 'เป็นไปไม่ได้ทางตรรกะ: P(B|A) × P(A) ไม่สามารถมีค่าเกินกว่า P(B) ได้'
                : 'Logical impossibility: P(B|A) × P(A) cannot exceed P(B).';
        } else if (valPB === 0) {
            simpleError = isTh ? 'P(B) ไม่สามารถเป็น 0 ได้ (เนื่องจากเป็นตัวหาร)' : 'P(B) cannot be 0.';
        } else {
            simpleResult = (valPBA * valPA) / valPB;
        }
    }

    // Diagnostic calculations
    const valPrev = toDecimal(prevA); // P(A)
    const valSens = toDecimal(sensBgivenA); // P(B|A)
    const valFalsePos = toDecimal(falsePosBgivenNotA); // P(B|A')

    let diagError = '';
    let diagResult = NaN;
    let valPNotA = NaN;
    let valPBTotal = NaN;

    if (mode === 'diagnostic') {
        if (isNaN(valPrev) || isNaN(valSens) || isNaN(valFalsePos)) {
            diagError = isTh ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields.';
        } else if (valPrev < 0 || valPrev > 1 || valSens < 0 || valSens > 1 || valFalsePos < 0 || valFalsePos > 1) {
            diagError = isTh ? 'ค่าความน่าจะเป็นต้องอยู่ระหว่าง 0 ถึง 1 (หรือ 0% ถึง 100%)' : 'Probabilities must be between 0 and 1 (or 0% to 100%).';
        } else {
            valPNotA = 1 - valPrev;
            valPBTotal = (valSens * valPrev) + (valFalsePos * valPNotA);
            if (valPBTotal === 0) {
                diagError = isTh ? 'ผลรวมโอกาสการเกิดเหตุการณ์ B เป็น 0 ไม่สามารถคำนวณตัวหารได้' : 'Total probability of B is 0. Cannot compute division.';
            } else {
                diagResult = (valSens * valPrev) / valPBTotal;
            }
        }
    }

    const showAsResult = (dec: number) => {
        if (isNaN(dec)) return '-';
        return format === 'percent' 
            ? `${(dec * 100).toFixed(4).replace(/\.?0+$/, '')}%`
            : dec.toFixed(6).replace(/\.?0+$/, '');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-sky-600" />
                {isTh ? 'เครื่องมือคำนวณทฤษฎีบทของเบย์ (Bayes\' Theorem)' : 'Bayes\' Theorem Calculator'}
            </h1>

            {/* Config controls */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                        onClick={() => setMode('diagnostic')}
                        className={`py-1.5 px-3 text-xs sm:text-sm font-semibold transition-colors ${
                            mode === 'diagnostic' ? 'bg-sky-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isTh ? 'โหมดวิเคราะห์ผลการตรวจโรค' : 'Diagnostic Test'}
                    </button>
                    <button
                        onClick={() => setMode('simple')}
                        className={`py-1.5 px-3 text-xs sm:text-sm font-semibold transition-colors ${
                            mode === 'simple' ? 'bg-sky-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isTh ? 'โหมดสูตรทั่วไป (Simple)' : 'Simple Formula'}
                    </button>
                </div>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                        onClick={() => setFormat('percent')}
                        className={`py-1.5 px-3 text-xs sm:text-sm font-semibold transition-colors ${
                            format === 'percent' ? 'bg-sky-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isTh ? 'เปอร์เซ็นต์ (%)' : 'Percentage (%)'}
                    </button>
                    <button
                        onClick={() => setFormat('decimal')}
                        className={`py-1.5 px-3 text-xs sm:text-sm font-semibold transition-colors ${
                            format === 'decimal' ? 'bg-sky-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isTh ? 'ทศนิยม (0-1)' : 'Decimal (0-1)'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุตัวแปรความน่าจะเป็น' : 'Probability Inputs'}
                        </h2>

                        {mode === 'simple' ? (
                            <div className="space-y-4 text-sm">
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(A) - {isTh ? 'โอกาสเกิดเหตุการณ์ A' : 'Probability of A'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={pA}
                                        onChange={(e) => setPA(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold"
                                        placeholder={format === 'percent' ? '10' : '0.1'}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(B|A) - {isTh ? 'โอกาสเกิด B เมื่อเกิด A แล้ว' : 'Probability of B given A'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={pBA}
                                        onChange={(e) => setPBA(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold"
                                        placeholder={format === 'percent' ? '80' : '0.8'}
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(B) - {isTh ? 'โอกาสรวมที่จะเกิดเหตุการณ์ B' : 'Probability of B'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={pB}
                                        onChange={(e) => setPB(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold"
                                        placeholder={format === 'percent' ? '20' : '0.2'}
                                    />
                                </div>
                                {simpleError && (
                                    <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5">
                                        <AlertTriangle className="w-4 h-4" /> {simpleError}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 text-sm">
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(A) - {isTh ? 'อัตราการชุก/โอกาสมีโรคเริ่มต้น (Prior)' : 'Prior probability of disease P(A)'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={prevA}
                                        onChange={(e) => setPrevA(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold text-sky-950"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(B|A) - {isTh ? 'ความไวของการตรวจโรค/พบเชื้อเมื่อมีโรค (Sensitivity)' : 'True positive rate P(B|A)'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={sensBgivenA}
                                        onChange={(e) => setSensBgivenA(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-305 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold text-sky-950"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        P(B|A&apos;) - {isTh ? 'อัตราผลบวกลวง/ตรวจพบเชื้อทั้งที่ไม่เป็นโรค (False Positive Rate)' : 'False positive rate P(B|A\')'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={falsePosBgivenNotA}
                                        onChange={(e) => setFalsePosBgivenNotA(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold text-sky-950"
                                    />
                                </div>
                                {diagError && (
                                    <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5">
                                        <AlertTriangle className="w-4 h-4" /> {diagError}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* Outputs & Explanations */}
                <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-sky-950 mb-4 border-b border-sky-200 pb-2">
                            {isTh ? 'ผลลัพธ์ความน่าจะเป็น P(A|B)' : 'Posterior Probability P(A|B)'}
                        </h2>

                        {mode === 'simple' && !simpleError && !isNaN(simpleResult) && (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-sky-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">P(A|B) คือ</p>
                                    <p className="text-4xl font-extrabold text-sky-600">
                                        {showAsResult(simpleResult)}
                                    </p>
                                </div>

                                <div className="space-y-2 text-xs text-sky-900 font-mono bg-white p-3 rounded border border-sky-100">
                                    <p className="font-bold">{isTh ? 'สูตรและแทนค่า:' : 'Formula & substitutions:'}</p>
                                    <p>P(A|B) = [ P(B|A) × P(A) ] / P(B)</p>
                                    <p>= [ {valPBA} × {valPA} ] / {valPB}</p>
                                    <p>= {valPBA * valPA} / {valPB}</p>
                                    <p className="font-bold text-sky-700">= {showAsResult(simpleResult)}</p>
                                </div>
                            </div>
                        )}

                        {mode === 'diagnostic' && !diagError && !isNaN(diagResult) && (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-sky-200 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">
                                        {isTh ? 'โอกาสเป็นโรคจริงหากผลการตรวจเป็นบวก P(A|B)' : 'Posterior probability of disease if positive P(A|B)'}
                                    </p>
                                    <p className="text-4xl font-extrabold text-sky-600">
                                        {showAsResult(diagResult)}
                                    </p>
                                </div>

                                <div className="space-y-2 text-xs text-sky-950 font-mono bg-white p-3 rounded border border-sky-100">
                                    <p className="font-bold">{isTh ? 'ขั้นตอนวิเคราะห์ความน่าจะเป็นทั้งหมด:' : 'Calculations breakdown:'}</p>
                                    <p>1. P(A&apos;) [โอกาสไม่มีโรค] = 1 - P(A) = {parseFloat(valPNotA.toFixed(6))}</p>
                                    <p>2. P(B) [โอกาสผลบวกทั้งหมด] = P(B|A)P(A) + P(B|A&apos;)P(A&apos;)</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;= ({valSens} × {valPrev}) + ({valFalsePos} × {parseFloat(valPNotA.toFixed(6))})</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;= {parseFloat((valSens * valPrev).toFixed(6))} + {parseFloat((valFalsePos * valPNotA).toFixed(6))}</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;= {parseFloat(valPBTotal.toFixed(6))}</p>
                                    <p>3. P(A|B) = [ P(B|A) × P(A) ] / P(B)</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;= [ {valSens} × {valPrev} ] / {parseFloat(valPBTotal.toFixed(6))}</p>
                                    <p className="font-bold text-sky-700">&nbsp;&nbsp;&nbsp;&nbsp;= {showAsResult(diagResult)}</p>
                                </div>
                            </div>
                        )}
                        
                        {(simpleError || diagError) && (
                            <p className="text-gray-500 text-sm">
                                {isTh ? 'รอข้อมูลนำเข้าที่ถูกต้อง' : 'Awaiting valid inputs...'}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-sky-200 text-xs text-sky-800 text-center">
                        * {isTh ? 'ทฤษฎีบทของเบย์แสดงให้เห็นว่าทำไมอัตราความชุกเริ่มต้น (Prior) จึงมีความสำคัญมาก' : 'Bayes\' Theorem demonstrates why base rates are critical in probability.'}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-sky max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ทฤษฎีบทของเบย์ (Bayes&apos; Theorem) คืออะไร? สูตรการหาความน่าจะเป็นแบบมีเงื่อนไขและตัวอย่างเชิงลึก
                </h2>
                <p>
                    ในวิชาคณิตศาสตร์ แขนงสถิติและความน่าจะเป็น <strong>ทฤษฎีบทของเบย์ (Bayes&apos; Theorem)</strong> (หรือชื่ออื่นๆ เช่น กฎของเบย์ หรือโมเดลเบย์) เป็นหนึ่งในทฤษฎีที่มีอิทธิพลสูงที่สุด ทฤษฎีนี้แสดงวิธีการปรับเปลี่ยนความเชื่อหรือ <strong>ความน่าจะเป็นเดิม (Prior Probability)</strong> เมื่อเราได้รับข้อมูลหลักฐานหรือผลการพิสูจน์ใหม่เข้ามา ส่งผลให้ได้ค่า <strong>ความน่าจะเป็นใหม่ (Posterior Probability)</strong>
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรทางคณิตศาสตร์ของทฤษฎีบทของเบย์</h3>
                <p>
                    สูตรดั้งเดิมแบบง่ายของทฤษฎีบทของเบย์ มีนิยามดังนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-sky-700">
                    P(A|B) = [ P(B|A) × P(A) ] / P(B)
                </div>
                <p>
                    <strong>ความหมายของแต่ละสัญลักษณ์:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>$P(A|B)$ (Posterior):</strong> ความน่าจะเป็นที่จะเกิดเหตุการณ์ $A$ เมื่อทราบว่าเกิดเหตุการณ์ $B$ ขึ้นแล้ว</li>
                    <li><strong>$P(B|A)$ (Likelihood):</strong> ความน่าจะเป็นที่จะเกิดเหตุการณ์ $B$ เมื่อทราบว่าเกิดเหตุการณ์ $A$ ขึ้นก่อน</li>
                    <li><strong>$P(A)$ (Prior):</strong> ความน่าจะเป็นพื้นฐานเริ่มต้นที่จะเกิดเหตุการณ์ $A$ (โอกาสเกิดโดยไม่มีปัจจัยอื่น)</li>
                    <li><strong>$P(B)$ (Marginal/Evidence):</strong> ความน่าจะเป็นทั้งหมดที่จะเกิดเหตุการณ์ $B$</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ทฤษฎีเบย์ในระบบตรวจโรค (Diagnostic Testing)</h3>
                <p>
                    ตัวอย่างยอดนิยมที่ทำให้เห็นความสำคัญอย่างชัดเจนของกฎเบย์คือ การวินิจฉัยโรคทางการแพทย์ สมมติว่าโรคชนิดหนึ่งมีผู้ป่วยเพียง $1\%$ ของประชากรทั้งหมด ($P(A) = 0.01$) และเรามีชุดตรวจหาเชื้อที่มีความแม่นยำสูง (Sensitivity หรือโอกาสที่คนป่วยจะตรวจเจอเชื้อ) อยู่ที่ $99\%$ ($P(B|A) = 0.99$) แต่อัตราการตรวจเชื้อผิดพลาด (False Positive Rate หรือโอกาสที่คนปกติจะตรวจพบเชื้อ) อยู่ที่ $5\%$ ($P(B|A&apos;) = 0.05$)
                    <br />
                    หากเราสุ่มหยิบประชากรมาหนึ่งคนและทำการตรวจ ปรากฏว่า <strong>&ldquo;ผลการตรวจออกมาเป็นบวก (ตรวจเจอเชื้อ)&rdquo;</strong> คนผู้นั้นจะมีโอกาสเป็นโรคจริงเท่าใด?
                </p>
                <p>
                    คนส่วนใหญ่มักจะตอบทันทีว่า $99\%$ เพราะคิดว่าชุดตรวจแม่นยำมาก แต่หากลองใช้ทฤษฎีบทของเบย์คำนวณ:
                    <br />
                    $P(B) = P(B|A)P(A) + P(B|A&apos;)P(A&apos;) = (0.99 \times 0.01) + (0.05 \times 0.99) = 0.0099 + 0.0495 = 0.0594$
                    <br />
                    จะได้: $P(A|B) = \frac{0.0099}{0.0594} \approx 0.1667$ หรือประมาณ <strong>$16.67\%$</strong> เท่านั้น!
                </p>
                <p>
                    ตัวเลขนี้บอกอะไรเรา? มันบอกเราว่าถึงแม้ผลการตรวจจะเป็นบวก แต่โอกาสเป็นโรคจริงมีไม่ถึง $17\%$ เนื่องจากตัวโรคมีอัตราความชุกเริ่มต้น (Prior) ที่ต่ำมาก ($1\%$) ทำให้กลุ่มคนที่เกิดผลบวกลวง ($5\%$ ของคนไม่ป่วยจำนวนมาก) มีสัดส่วนมากกว่าจำนวนคนป่วยจริงอย่างมีนัยสำคัญ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การนำไปใช้ประโยชน์ในเทคโนโลยียุคใหม่</h3>
                <p>
                    ทฤษฎีบทของเบย์กลายเป็นหัวใจของเทคโนโลยีการคำนวณและปัญญาประดิษฐ์ (AI) ในปัจจุบัน:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>ระบบกรองอีเมลขยะ (Naive Bayes Spam Filtering):</strong> ตัวกรองจะสแกนคำศัพท์ในอีเมลเพื่อปรับค่าความน่าจะเป็นที่อีเมลนั้นจะเป็นสแปมตามความถี่ของคำขยะที่เคยบันทึกไว้</li>
                    <li><strong>การทำ Machine Learning และ Data Science:</strong> อัลกอริทึม Naive Bayes เป็นหนึ่งในโมเดลทำนายการจำแนกประเภท (Classification Model) ที่ทำงานได้รวดเร็วและเหมาะกับข้อมูลขนาดใหญ่</li>
                    <li><strong>การตัดสินใจในยานยนต์ไร้คนขับ:</strong> กล้องและเซนเซอร์ของรถยนต์ไร้คนขับใช้หลักเบย์เพื่อประเมินความน่าจะเป็นที่วัตถุข้างหน้าจะเป็นมนุษย์เดินถนนหรือสิ่งกีดขวางตามการอัปเดตข้อมูลกล้องแบบเรียลไทม์</li>
                </ol>
                <p>
                    โปรแกรมเครื่องคิดเลขทฤษฎีบทของเบย์นี้ จึงเหมาะสำหรับนักเรียนแพทย์ นักสถิติ และโปรแกรมเมอร์ที่ต้องการคำนวณประเมินค่าโอกาสแบบมีเงื่อนไขและขั้นตอนวิธีทำอย่างโปร่งใสและถูกต้องที่สุด
                </p>
            </article>
        </div>
    );
}
