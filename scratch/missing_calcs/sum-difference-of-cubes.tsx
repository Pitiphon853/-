import React, { useState } from 'react';
import { Calculator, RefreshCw, HelpCircle } from 'lucide-react';

export default function SumDifferenceOfCubes({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');

    const [mode, setMode] = useState<'numerical' | 'algebraic'>('numerical');

    // Numerical State
    const [numA, setNumA] = useState<string>('3');
    const [numB, setNumB] = useState<string>('4');

    // Algebraic State
    const [coeffA, setCoeffA] = useState<string>('2');
    const [coeffB, setCoeffB] = useState<string>('3');
    const [varX, setVarX] = useState<string>('x');
    const [varY, setVarY] = useState<string>('y');

    const handleReset = () => {
        if (mode === 'numerical') {
            setNumA('3');
            setNumB('4');
        } else {
            setCoeffA('2');
            setCoeffB('3');
            setVarX('x');
            setVarY('y');
        }
    };

    // Numerical Calculations
    const aVal = parseFloat(numA);
    const bVal = parseFloat(numB);
    const isNumValid = !isNaN(aVal) && !isNaN(bVal);

    const aCubed = isNumValid ? aVal ** 3 : 0;
    const bCubed = isNumValid ? bVal ** 3 : 0;

    const sumResult = aCubed + bCubed;
    const diffResult = aCubed - bCubed;

    const aSq = isNumValid ? aVal ** 2 : 0;
    const bSq = isNumValid ? bVal ** 2 : 0;
    const abProduct = isNumValid ? aVal * bVal : 0;

    // Algebraic Calculations
    const cA = parseFloat(coeffA);
    const cB = parseFloat(coeffB);
    const isAlgValid = !isNaN(cA) && !isNaN(cB) && varX.trim() !== '' && varY.trim() !== '';

    const cACubed = isAlgValid ? cA ** 3 : 0;
    const cBCubed = isAlgValid ? cB ** 3 : 0;

    const cASq = isAlgValid ? cA ** 2 : 0;
    const cBSq = isAlgValid ? cB ** 2 : 0;
    const cABProduct = isAlgValid ? cA * cB : 0;

    // Formatter helpers to clean up minus signs or brackets
    const formatTerm = (coef: number, power: number, variable: string) => {
        if (coef === 0) return '';
        const coefStr = coef === 1 && power > 0 ? '' : coef === -1 && power > 0 ? '-' : coef.toString();
        const powStr = power === 1 ? '' : power === 0 ? '' : `^${power}`;
        const varStr = power === 0 ? '' : variable;
        return `${coefStr}${varStr}${powStr}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-indigo-600" />
                {isTh ? 'เครื่องมือคำนวณหาผลบวกและผลต่างกำลังสาม' : 'Sum and Difference of Cubes Calculator'}
            </h1>

            {/* Mode Select Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setMode('numerical')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'numerical'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'คำนวณแบบตัวเลข (Numerical)' : 'Numerical Calculation'}
                </button>
                <button
                    onClick={() => setMode('algebraic')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'algebraic'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'แยกตัวประกอบพหุนาม (Algebraic)' : 'Algebraic Factoring'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs Column */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุค่าอินพุต' : 'Input Values'}
                        </h2>

                        {mode === 'numerical' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'ค่าของ a (พจน์แรก)' : 'Value of a (First term)'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={numA}
                                        onChange={(e) => setNumA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold text-indigo-950"
                                        placeholder="เช่น 3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'ค่าของ b (พจน์หลัง)' : 'Value of b (Second term)'}
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={numB}
                                        onChange={(e) => setNumB(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold text-indigo-950"
                                        placeholder="เช่น 4"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 font-medium">
                                    {isTh ? 'ในรูปพจน์ยกกำลังสาม: (ax)³ ± (by)³' : 'Expression format: (ax)³ ± (by)³'}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isTh ? 'สัมประสิทธิ์ a' : 'Coefficient a'}
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={coeffA}
                                            onChange={(e) => setCoeffA(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold"
                                            placeholder="เช่น 2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isTh ? 'ตัวแปรพจน์แรก' : 'Variable of a'}
                                        </label>
                                        <input
                                            type="text"
                                            value={varX}
                                            onChange={(e) => setVarX(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="เช่น x"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isTh ? 'สัมประสิทธิ์ b' : 'Coefficient b'}
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={coeffB}
                                            onChange={(e) => setCoeffB(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold"
                                            placeholder="เช่น 3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isTh ? 'ตัวแปรพจน์หลัง' : 'Variable of b'}
                                        </label>
                                        <input
                                            type="text"
                                            value={varY}
                                            onChange={(e) => setVarY(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="เช่น y"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตเป็นค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* Outputs Column */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col justify-between">
                    {mode === 'numerical' ? (
                        isNumValid ? (
                            <div className="space-y-6">
                                {/* Sum of Cubes */}
                                <div>
                                    <h3 className="text-md font-semibold text-indigo-950 mb-2 border-b border-indigo-200 pb-1">
                                        1. {isTh ? 'ผลบวกกำลังสาม' : 'Sum of Cubes'} (a³ + b³)
                                    </h3>
                                    <div className="bg-white p-3 rounded-lg border border-indigo-150 mb-2 text-center">
                                        <div className="text-xs text-gray-400 font-mono">{aVal}³ + {bVal}³ =</div>
                                        <div className="text-2xl font-black text-indigo-700">{sumResult}</div>
                                    </div>
                                    <div className="text-xs text-indigo-900 bg-indigo-100/50 p-2.5 rounded font-mono space-y-1">
                                        <p className="font-semibold">{isTh ? 'วิธีคำนวณตามสูตร:' : 'Factoring expansion:'}</p>
                                        <p>a³ + b³ = (a + b)(a² - ab + b²)</p>
                                        <p>= ({aVal} + {bVal})({aVal}² - ({aVal})({bVal}) + {bVal}²)</p>
                                        <p>= ({aVal + bVal})({aSq} - {abProduct} + {bSq})</p>
                                        <p>= ({aVal + bVal})({aSq - abProduct + bSq})</p>
                                        <p className="font-bold text-indigo-800">= {sumResult}</p>
                                    </div>
                                </div>

                                {/* Difference of Cubes */}
                                <div>
                                    <h3 className="text-md font-semibold text-indigo-950 mb-2 border-b border-indigo-200 pb-1">
                                        2. {isTh ? 'ผลต่างกำลังสาม' : 'Difference of Cubes'} (a³ - b³)
                                    </h3>
                                    <div className="bg-white p-3 rounded-lg border border-indigo-150 mb-2 text-center">
                                        <div className="text-xs text-gray-400 font-mono">{aVal}³ - {bVal}³ =</div>
                                        <div className="text-2xl font-black text-indigo-700">{diffResult}</div>
                                    </div>
                                    <div className="text-xs text-indigo-900 bg-indigo-100/50 p-2.5 rounded font-mono space-y-1">
                                        <p className="font-semibold">{isTh ? 'วิธีคำนวณตามสูตร:' : 'Factoring expansion:'}</p>
                                        <p>a³ - b³ = (a - b)(a² + ab + b²)</p>
                                        <p>= ({aVal} - {bVal})({aVal}² + ({aVal})({bVal}) + {bVal}²)</p>
                                        <p>= ({aVal - bVal})({aSq} + {abProduct} + {bSq})</p>
                                        <p>= ({aVal - bVal})({aSq + abProduct + bSq})</p>
                                        <p className="font-bold text-indigo-800">= {diffResult}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">{isTh ? 'กรุณากรอกตัวเลขอินพุตที่ถูกต้อง' : 'Please provide valid input numbers'}</p>
                        )
                    ) : (
                        isAlgValid ? (
                            <div className="space-y-6">
                                {/* Sum of Cubes Factoring */}
                                <div>
                                    <h3 className="text-md font-semibold text-indigo-950 mb-2 border-b border-indigo-200 pb-1">
                                        1. {isTh ? 'แยกตัวประกอบผลบวกกำลังสาม' : 'Sum of Cubes Factoring'}
                                    </h3>
                                    <div className="bg-white p-3 rounded-lg border border-indigo-150 mb-2 text-center">
                                        <div className="text-xs text-gray-400 font-mono">
                                            ({cA}{varX})³ + ({cB}{varY})³ = {cACubed}{varX}³ + {cBCubed}{varY}³
                                        </div>
                                        <div className="text-sm font-bold text-indigo-700 mt-1">
                                            = ({cA}{varX} + {cB}{varY})({cASq}{varX}² - {cABProduct}{varX}{varY} + {cBSq}{varY}²)
                                        </div>
                                    </div>
                                    <div className="text-xs text-indigo-950 bg-indigo-100/50 p-2.5 rounded font-mono space-y-1">
                                        <p className="font-bold">{isTh ? 'วิเคราะห์สัมประสิทธิ์:' : 'Coefficient breakdown:'}</p>
                                        <p>A = {cA}{varX}, B = {cB}{varY}</p>
                                        <p>A² = {cASq}{varX}²</p>
                                        <p>AB = {cABProduct}{varX}{varY}</p>
                                        <p>B² = {cBSq}{varY}²</p>
                                    </div>
                                </div>

                                {/* Difference of Cubes Factoring */}
                                <div>
                                    <h3 className="text-md font-semibold text-indigo-950 mb-2 border-b border-indigo-200 pb-1">
                                        2. {isTh ? 'แยกตัวประกอบผลต่างกำลังสาม' : 'Difference of Cubes Factoring'}
                                    </h3>
                                    <div className="bg-white p-3 rounded-lg border border-indigo-150 mb-2 text-center">
                                        <div className="text-xs text-gray-400 font-mono">
                                            ({cA}{varX})³ - ({cB}{varY})³ = {cACubed}{varX}³ - {cBCubed}{varY}³
                                        </div>
                                        <div className="text-sm font-bold text-indigo-700 mt-1">
                                            = ({cA}{varX} - {cB}{varY})({cASq}{varX}² + {cABProduct}{varX}{varY} + {cBSq}{varY}²)
                                        </div>
                                    </div>
                                    <div className="text-xs text-indigo-950 bg-indigo-100/50 p-2.5 rounded font-mono space-y-1">
                                        <p className="font-bold">{isTh ? 'วิเคราะห์สัมประสิทธิ์:' : 'Coefficient breakdown:'}</p>
                                        <p>A = {cA}{varX}, B = {cB}{varY}</p>
                                        <p>A² = {cASq}{varX}²</p>
                                        <p>AB = {cABProduct}{varX}{varY}</p>
                                        <p>B² = {cBSq}{varY}²</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">{isTh ? 'กรุณากรอกตัวแปรและสัมประสิทธิ์ที่ถูกต้อง' : 'Please provide valid variables and coefficients'}</p>
                        )
                    )}

                    <div className="mt-6 pt-4 border-t border-indigo-200 text-xs text-indigo-800 text-center">
                        * {isTh ? 'ผลบวกและผลต่างกำลังสามช่วยในการลดรูปพหุนามระดับสูง' : 'Sum & difference of cubes helps simplify higher degree polynomials.'}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-indigo max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    สูตรผลบวกและผลต่างกำลังสาม (Sum and Difference of Cubes) คืออะไร? วิธีแยกตัวประกอบพหุนามอย่างละเอียด
                </h2>
                <p>
                    ในการเรียนวิชาพีชคณิต (Algebra) เรื่องการแยกตัวประกอบพหุนาม ดีกรีสามถือเป็นหนึ่งในหัวข้อสำคัญที่นักเรียนมักจะได้พบเจอ บ่อยครั้งที่เราต้องลดรูปสมการพหุนามที่อยู่ในรูปเลขยกกำลังสามให้อยู่ในรูปตัวคูณของพหุนามที่มีดีกรีต่ำลง ซึ่งวิธีการที่ได้ผลลัพธ์รวดเร็วและแม่นยำที่สุดคือการใช้ <strong>&ldquo;สูตรผลบวกกำลังสาม&rdquo;</strong> และ <strong>&ldquo;สูตรผลต่างกำลังสาม&rdquo;</strong>
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. สูตรผลบวกกำลังสาม (Sum of Cubes Formula)</h3>
                <p>
                    สูตรนี้ใช้สำหรับการแยกตัวประกอบของพหุนามที่มีรูปแบบเป็นตัวเลขหรือตัวแปรสองตัวยกกำลังสามบวกกัน นิยามคือ:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-indigo-700">
                    a³ + b³ = (a + b)(a² - ab + b²)
                </div>
                <p>
                    <strong>ข้อสังเกตและเทคนิคการจำเครื่องหมาย:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>พจน์วงเล็บแรกจะมีเครื่องหมายบวกตามโจทย์: <span className="font-bold">(a + b)</span></li>
                    <li>พจน์วงเล็บหลัง พจน์ตรงกลางจะมีเครื่องหมายสลับเป็นลบ: <span className="font-bold">- ab</span></li>
                    <li>พจน์สุดท้ายจะเป็นบวกเสมอ: <span className="font-bold">+ b²</span></li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. สูตรผลต่างกำลังสาม (Difference of Cubes Formula)</h3>
                <p>
                    สูตรนี้ใช้สำหรับการแยกตัวประกอบของพหุนามที่มีรูปแบบเป็นตัวเลขหรือตัวแปรสองตัวยกกำลังสามลบกัน นิยามคือ:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-indigo-700">
                    a³ - b³ = (a - b)(a² + ab + b²)
                </div>
                <p>
                    <strong>ข้อสังเกตและเทคนิคการจำเครื่องหมาย:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>พจน์วงเล็บแรกจะมีเครื่องหมายลบตามโจทย์: <span className="font-bold">(a - b)</span></li>
                    <li>พจน์วงเล็บหลัง พจน์ตรงกลางจะมีเครื่องหมายเป็นบวก: <span className="font-bold">+ ab</span></li>
                    <li>พจน์สุดท้ายจะเป็นบวกเสมอ: <span className="font-bold">+ b²</span></li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการแยกตัวประกอบ</h3>
                <p>
                    <strong>ตัวอย่างที่ 1 (ผลบวกกำลังสาม):</strong> จงแยกตัวประกอบของ $8x³ + 27$
                    <br />
                    <em>วิธีทำ:</em> จัดรูปให้อยู่ในรูปกำลังสามสมบูรณ์ก่อน
                    <br />
                    จะได้ $8x³ = (2x)³$ และ $27 = 3³$
                    <br />
                    จากสูตร $a³ + b³ = (a + b)(a² - ab + b²)$ ให้ $a = 2x$ และ $b = 3$
                    <br />
                    จะได้: $(2x + 3)((2x)² - (2x)(3) + 3²) = (2x + 3)(4x² - 6x + 9)$
                </p>
                <p>
                    <strong>ตัวอย่างที่ 2 (ผลต่างกำลังสาม):</strong> จงแยกตัวประกอบของ $x³ - 64$
                    <br />
                    <em>วิธีทำ:</em> จัดรูปให้อยู่ในรูปกำลังสาม
                    <br />
                    จะได้ $x³ - 4³$
                    <br />
                    จากสูตร $a³ - b³ = (a - b)(a² + ab + b²)$ ให้ $a = x$ และ $b = 4$
                    <br />
                    จะได้: $(x - 4)(x² + 4x + 16)$
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ประโยชน์ในชีวิตจริง</h3>
                <p>
                    การเรียนเรื่องผลบวกและผลต่างกำลังสามไม่ได้จำกัดอยู่เฉพาะการสอบวัดผลในโรงเรียนเท่านั้น แต่ยังเป็นพื้นฐานสำคัญในสาขาวิศวกรรมศาสตร์ วิทยาศาสตร์ และคอมพิวเตอร์กราฟิกส์ ตัวอย่างการใช้งานจริง ได้แก่:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>การวิเคราะห์ฟังก์ชันและการอินทิเกรตในแคลคูลัส:</strong> การแยกตัวประกอบทำให้การตัดทอนตัวเศษและตัวส่วน (Simplify Fraction) ทำได้ง่ายขึ้น ปลดล็อกการหาลิมิตอินฟินิตี้หรือรูปแบบ 0/0</li>
                    <li><strong>คอมพิวเตอร์กราฟิกส์แบบ 3 มิติ:</strong> การทำเรนเดอร์พื้นผิวโค้งระดับกำลังสาม (เช่น Cubic Bezier Curves และ Surfaces) มักเกี่ยวข้องกับการแก้สมการกำลังสามในระบบพิกัดฉาก</li>
                    <li><strong>ฟิสิกส์เชิงโครงสร้าง:</strong> การหาจุดศูนย์ถ่วงหรือโมเมนต์ความเฉื่อยของรูปทรงปริมาตรบางชนิดที่เกิดจากการหมุนฟังก์ชันกำลังสาม</li>
                </ol>
                <p>
                    ด้วยเครื่องมือคำนวณออนไลน์นี้ คุณสามารถสลับโหมดการคำนวณทางตัวเลขเพื่อตรวจสอบคำตอบ หรือใช้เพื่อแสดงขั้นตอนการแยกตัวประกอบของสัมประสิทธิ์ตัวแปรอย่างรวดเร็ว สะดวก และถูกต้อง 100%
                </p>
            </article>
        </div>
    );
}
