import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function AbsoluteValue({ lang }: any) {
    const [mode, setMode] = useState<'real' | 'complex'>('real');
    
    // Real number states
    const [realInput, setRealInput] = useState<string>('-15.5');
    const [realResult, setRealResult] = useState<number | null>(15.5);
    const [realError, setRealError] = useState<string>('');

    // Complex number states
    const [compA, setCompA] = useState<string>('3');
    const [compB, setCompB] = useState<string>('4');
    const [complexResult, setComplexResult] = useState<number | null>(5);
    const [complexError, setComplexError] = useState<string>('');

    const calculateReal = (valStr: string) => {
        if (valStr === '') {
            setRealResult(null);
            setRealError('');
            return;
        }
        const val = parseFloat(valStr);
        if (isNaN(val)) {
            setRealResult(null);
            setRealError('กรุณากรอกจำนวนจริงที่ถูกต้อง');
            return;
        }
        setRealError('');
        setRealResult(Math.abs(val));
    };

    const calculateComplex = (aStr: string, bStr: string) => {
        if (aStr === '' || bStr === '') {
            setComplexResult(null);
            setComplexError('');
            return;
        }
        const a = parseFloat(aStr);
        const b = parseFloat(bStr);
        if (isNaN(a) || isNaN(b)) {
            setComplexResult(null);
            setComplexError('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }
        setComplexError('');
        // Modulus = sqrt(a^2 + b^2)
        const ans = Math.sqrt(a * a + b * b);
        setComplexResult(ans);
    };

    const handleRealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setRealInput(val);
        calculateReal(val);
    };

    const handleCompAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCompA(val);
        calculateComplex(val, compB);
    };

    const handleCompBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCompB(val);
        calculateComplex(compA, val);
    };

    const handleReset = () => {
        if (mode === 'real') {
            setRealInput('-15.5');
            setRealResult(15.5);
            setRealError('');
        } else {
            setCompA('3');
            setCompB('4');
            setComplexResult(5);
            setComplexError('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-violet-600" />
                เครื่องมือคำนวณหาค่าสัมบูรณ์ (Absolute Value)
            </h1>

            {/* Mode Select Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setMode('real')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'real'
                            ? 'border-violet-600 text-violet-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    จำนวนจริง (Real Number)
                </button>
                <button
                    onClick={() => setMode('complex')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'complex'
                            ? 'border-violet-600 text-violet-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    จำนวนเชิงซ้อน (Complex Modulus)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {mode === 'real' ? 'คำนวณค่าสัมบูรณ์จำนวนจริง' : 'คำนวณค่ามอดุลัสจำนวนเชิงซ้อน'}
                        </h2>

                        {mode === 'real' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ตัวเลขจำนวนจริง (x)
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={realInput}
                                        onChange={handleRealChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-bold text-violet-900"
                                        placeholder="เช่น -15.5"
                                    />
                                    {realError && <p className="text-red-500 text-sm mt-1">{realError}</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 font-medium">ในรูปแบบ z = a + bi</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ส่วนจริง / Real Part (a)
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={compA}
                                        onChange={handleCompAChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-bold"
                                        placeholder="เช่น 3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ส่วนจินตภาพ / Imaginary Part (b)
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={compB}
                                        onChange={handleCompBChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-bold"
                                        placeholder="เช่น 4"
                                    />
                                </div>
                                {complexError && <p className="text-red-500 text-sm mt-1">{complexError}</p>}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset ค่าเริ่มต้น
                    </button>
                </div>

                {/* Output */}
                <div className="flex flex-col justify-between bg-violet-50 p-6 rounded-xl border border-violet-100 min-h-[300px]">
                    {mode === 'real' ? (
                        <div>
                            <h2 className="text-lg font-semibold text-violet-950 mb-4 border-b border-violet-200 pb-2">
                                ผลลัพธ์ค่าสัมบูรณ์ |x|
                            </h2>
                            {realResult !== null ? (
                                <div className="space-y-6">
                                    <div className="text-center py-6 bg-white rounded-lg border border-violet-200 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">|{realInput}| คือ</p>
                                        <p className="text-4xl font-extrabold text-violet-600">{realResult}</p>
                                    </div>
                                    <div className="space-y-2 text-sm text-violet-900">
                                        <p className="font-semibold">ขั้นตอนการคิด:</p>
                                        <div className="bg-white p-3 rounded border border-violet-100 font-mono text-xs space-y-1">
                                            <p>เนื่องจากค่าสัมบูรณ์หมายถึงระยะทางจาก 0 บนเส้นจำนวน</p>
                                            <p>หาก x &lt; 0 ให้เปลี่ยนเป็นบวก: |{realInput}| = -({realInput}) = {realResult}</p>
                                            <p className="font-bold text-violet-700">คำตอบ: {realResult}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">กรุณากรอกค่า x เพื่อเริ่มคำนวณ</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold text-violet-950 mb-4 border-b border-violet-200 pb-2">
                                มอดุลัสของจำนวนเชิงซ้อน |z|
                            </h2>
                            {complexResult !== null ? (
                                <div className="space-y-6">
                                    <div className="text-center py-6 bg-white rounded-lg border border-violet-200 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">|{compA} + {compB}i| คือ</p>
                                        <p className="text-4xl font-extrabold text-violet-600">
                                            {complexResult.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                        </p>
                                    </div>
                                    <div className="space-y-2 text-sm text-violet-900">
                                        <p className="font-semibold">ขั้นตอนการคำนวณ:</p>
                                        <div className="bg-white p-3 rounded border border-violet-100 font-mono text-xs space-y-1">
                                            <p>สูตร: |z| = &radic;(a&sup2; + b&sup2;)</p>
                                            <p>แทนค่า: |z| = &radic;(({compA})&sup2; + ({compB})&sup2;)</p>
                                            <p>จะได้: |z| = &radic;({parseFloat(compA)*parseFloat(compA)} + {parseFloat(compB)*parseFloat(compB)})</p>
                                            <p>จะได้: |z| = &radic;({parseFloat(compA)*parseFloat(compA) + parseFloat(compB)*parseFloat(compB)})</p>
                                            <p className="font-bold text-violet-700">คำตอบ: {complexResult}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">กรุณากรอกตัวเลขส่วนจริงและจินตภาพ</p>
                            )}
                        </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-violet-200 text-xs text-violet-800 text-center">
                        * ค่าสัมบูรณ์เป็นระยะทางทางเรขาคณิต ผลลัพธ์จึงมีค่าเป็นจำนวนจริงบวกหรือศูนย์เสมอ
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-violet max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ค่าสัมบูรณ์ (Absolute Value) คืออะไร? นิยามทางคณิตศาสตร์และตัวอย่างการประยุกต์ใช้
                </h2>
                <p>
                    ในทางคณิตศาสตร์ <strong>ค่าสัมบูรณ์ (Absolute Value)</strong> หรือบางครั้งเรียกว่า <em>ขนาด (Magnitude)</em> ของจำนวนจริงใดๆ คือ ค่าที่เป็นบวกเสมอหรือเป็นศูนย์ โดยไม่คำนึงถึงเครื่องหมายบวกหรือลบที่อยู่ข้างหน้าตัวเลขนั้น เราสามารถอธิบายความหมายทางกายภาพของค่าสัมบูรณ์ได้ง่ายที่สุดคือ <strong>&ldquo;ระยะห่างระหว่างตัวเลขนั้นกับศูนย์บนเส้นจำนวน&rdquo;</strong> เนื่องจากระยะทางไม่สามารถมีค่าติดลบได้ ค่าสัมบูรณ์ของตัวเลขใดๆ จึงมีค่าเป็นบวกหรือศูนย์เสมอ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามฟังก์ชันค่าสัมบูรณ์อย่างเป็นทางการ</h3>
                <p>
                    สำหรับจำนวนจริงใดๆ $x$ สัญลักษณ์ที่ใช้แทนค่าสัมบูรณ์ของ $x$ คือ $|x|$ (มีเส้นขีดแนวตั้งขนาบข้างสองฝั่ง) ซึ่งนิยามด้วยฟังก์ชันแบบแบ่งช่วงได้ดังนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center">
                    |x| = x เมื่อ x &ge; 0
                    <br />
                    |x| = -x เมื่อ x &lt; 0
                </div>
                <p>
                    ตัวอย่างเช่น:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>หาก $x = 5$ เนื่องจาก 5 มีค่ามากกว่าศูนย์ ดังนั้น $|5| = 5$</li>
                    <li>หาก $x = -8.4$ เนื่องจาก -8.4 มีค่าน้อยกว่าศูนย์ ดังนั้น $|-8.4| = -(-8.4) = 8.4$</li>
                    <li>หาก $x = 0$ จะได้ $|0| = 0$</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติที่สำคัญของค่าสัมบูรณ์</h3>
                <p>
                    ค่าสัมบูรณ์มีคุณสมบัติเฉพาะตัวทางพีชคณิตที่นำไปใช้ในการแก้สมการและอสมการคณิตศาสตร์ระดับสูงดังนี้:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>ความเป็นบวกเสมอ (Non-negativity):</strong> $|x| \ge 0$ สำหรับจำนวนจริง $x$ ทุกตัว</li>
                    <li><strong>สมบัติการคูณ (Multiplicative Property):</strong> $|a \times b| = |a| \times |b|$</li>
                    <li><strong>อสมการอิงสามเหลี่ยม (Triangle Inequality):</strong> $|a + b| \le |a| + |b|$ (ผลรวมของขนาดมีค่าไม่น้อยกว่าขนาดของผลรวม)</li>
                    <li><strong>รากที่สองของกำลังสอง:</strong> $\sqrt{x^2} = |x|$</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ค่าสัมบูรณ์ของจำนวนเชิงซ้อน (Modulus of Complex Numbers)</h3>
                <p>
                    เมื่อเราขยายระบบจำนวนจากจำนวนจริงไปยังระบบจำนวนเชิงซ้อน (Complex Number) ในรูปแบบ $z = a + bi$ (โดยที่ $a$ คือส่วนจริง และ $b$ คือส่วนจินตภาพ) ค่าสัมบูรณ์หรือมอดุลัส $|z|$ จะหมายถึงระยะทางจากจุดกำเนิด $(0, 0)$ ไปยังจุดพิกัด $(a, b)$ บนระนาบเชิงซ้อน ซึ่งคำนวณได้โดยการใช้ทฤษฎีบทพีทาโกรัส:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-violet-700">
                    |z| = &radic;(a&sup2; + b&sup2;)
                </div>
                <p>
                    ตัวอย่างเช่น ค่ามอดุลัสของจำนวนเชิงซ้อน $3 + 4i$ คือ $|3 + 4i| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการนำไปใช้ประโยชน์</h3>
                <p>
                    ค่าสัมบูรณ์มีบทบาทสำคัญอย่างมากในวิทยาศาสตร์และวิศวกรรมศาสตร์ เช่น การวิเคราะห์ทางกลศาสตร์ (ความเร็วของรถยนต์เป็นขนาดของเวกเตอร์ความเร็ว ซึ่งมีค่าเป็นบวกเสมอแม้รถยนต์จะถอยหลัง), การเขียนโปรแกรมคอมพิวเตอร์เพื่อสลับการแสดงผลภาพ, และการคำนวณข้อผิดพลาดทางสถิติ เช่น <strong>Mean Absolute Error (MAE)</strong> เพื่อประเมินความคลาดเคลื่อนเฉลี่ยของการพยากรณ์ข้อมูล โปรแกรม Absolute Value Calculator นี้จึงเอื้อประโยชน์ต่อนักเรียน นักศึกษา และนักวิจัยในการหาคำตอบที่ถูกต้องแม่นยำ พร้อมช่วยทบทวนสูตรและหลักคณิตศาสตร์อย่างเป็นรูปธรรม
                </p>
            </article>
        </div>
    );
}
