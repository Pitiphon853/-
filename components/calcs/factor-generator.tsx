import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function FactorGenerator({ lang }: any) {
    const [inputVal, setInputVal] = useState<string>('12');
    const [result, setResult] = useState<{
        factors: number[];
        primeFactors: { [key: number]: number };
        count: number;
        sum: number;
        numberType: string;
    } | null>({
        factors: [1, 2, 3, 4, 6, 12],
        primeFactors: { 2: 2, 3: 1 },
        count: 6,
        sum: 28,
        numberType: 'Abundant Number (จำนวนพรั่งพร้อม)'
    });
    const [error, setError] = useState<string>('');

    const calculateFactors = (valStr: string) => {
        if (valStr === '') {
            setResult(null);
            setError('');
            return;
        }

        const num = parseInt(valStr, 10);
        if (isNaN(num)) {
            setResult(null);
            setError('กรุณากรอกตัวเลขจำนวนเต็มที่ถูกต้อง');
            return;
        }

        if (num <= 0) {
            setResult(null);
            setError('กรุณากรอกตัวเลขจำนวนเต็มบวกที่มีค่ามากกว่า 0');
            return;
        }

        if (num > 100000000) {
            setResult(null);
            setError('เพื่อป้องการค้างของเบราว์เซอร์ กรุณาเลือกตัวเลขไม่เกิน 100,000,000 (หนึ่งร้อยล้าน)');
            return;
        }

        setError('');

        const factors: number[] = [];
        const limit = Math.sqrt(num);
        for (let i = 1; i <= limit; i++) {
            if (num % i === 0) {
                factors.push(i);
                if (i !== num / i) {
                    factors.push(num / i);
                }
            }
        }
        factors.sort((a, b) => a - b);

        // Prime Factors
        let temp = num;
        const primeFactors: { [key: number]: number } = {};
        let divisor = 2;
        while (temp >= 2 && divisor * divisor <= temp) {
            if (temp % divisor === 0) {
                primeFactors[divisor] = (primeFactors[divisor] || 0) + 1;
                temp = temp / divisor;
            } else {
                divisor = divisor === 2 ? 3 : divisor + 2;
            }
        }
        if (temp > 1) {
            primeFactors[temp] = (primeFactors[temp] || 0) + 1;
        }

        const sum = factors.reduce((acc, curr) => acc + curr, 0);
        
        // Classify number (Perfect, Abundant, Deficient)
        // Proper divisors sum = total sum - num
        const properSum = sum - num;
        let numberType = 'Deficient Number (จำนวนบกพร่อง)';
        if (num > 1) {
            if (properSum === num) {
                numberType = 'Perfect Number (จำนวนสมบูรณ์)';
            } else if (properSum > num) {
                numberType = 'Abundant Number (จำนวนพรั่งพร้อม)';
            }
        } else {
            numberType = 'จำนวนเต็มบวกพื้นฐาน';
        }

        setResult({
            factors,
            primeFactors,
            count: factors.length,
            sum,
            numberType
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputVal(val);
        calculateFactors(val);
    };

    const handleReset = () => {
        setInputVal('12');
        setResult({
            factors: [1, 2, 3, 4, 6, 12],
            primeFactors: { 2: 2, 3: 1 },
            count: 6,
            sum: 28,
            numberType: 'Abundant Number (จำนวนพรั่งพร้อม)'
        });
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-cyan-600" />
                เครื่องมือหาตัวประกอบทั้งหมด (Factor Generator)
            </h1>

            <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 mb-6 text-cyan-800 text-sm">
                <strong>ตัวประกอบ (Factor):</strong> คือ ตัวเลขที่สามารถหารเลขเป้าหมายได้ลงตัวโดยไม่มีเศษเหลือ เช่น ตัวประกอบของ 12 คือ 1, 2, 3, 4, 6, และ 12
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">ป้อนตัวเลข</h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            จำนวนเต็มบวกที่ต้องการหาตัวประกอบ
                        </label>
                        <input
                            type="number"
                            step="1"
                            value={inputVal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-xl font-bold text-cyan-900"
                            placeholder="เช่น 12"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset ค่าเริ่มต้น
                    </button>
                </div>

                {/* Output */}
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 min-h-[300px] flex flex-col justify-between">
                    {result ? (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-cyan-950 border-b border-cyan-200 pb-2">
                                วิเคราะห์ตัวเลข {inputVal}
                            </h2>

                            <div className="space-y-4 text-sm text-cyan-900">
                                <div>
                                    <span className="font-semibold block mb-1">ตัวประกอบทั้งหมด ({result.count} ตัว):</span>
                                    <div className="bg-white p-3 rounded border border-cyan-200 flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
                                        {result.factors.map((f) => (
                                            <span key={f} className="px-2 py-1 bg-cyan-50 border border-cyan-100 text-cyan-700 rounded font-mono text-xs">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded border border-cyan-200">
                                        <span className="text-xs text-gray-500 block">ผลรวมตัวประกอบ</span>
                                        <span className="text-lg font-bold text-cyan-700">{result.sum}</span>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-cyan-200">
                                        <span className="text-xs text-gray-500 block">ประเภทตัวเลข</span>
                                        <span className="text-xs font-semibold text-cyan-700 block mt-1 leading-tight">{result.numberType}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="font-semibold block mb-1">การแยกตัวประกอบเฉพาะ (Prime Factorization):</span>
                                    <div className="bg-white p-3 rounded border border-cyan-200 font-mono text-lg font-bold text-cyan-700 text-center">
                                        {inputVal} = {Object.keys(result.primeFactors).length === 0 ? 'ไม่มี' : (
                                            Object.entries(result.primeFactors).map(([prime, exp], idx) => (
                                                <span key={prime}>
                                                    {idx > 0 && <span className="mx-2 text-gray-400">&times;</span>}
                                                    {prime}
                                                    {exp > 1 && <sup className="text-xs text-cyan-600 align-super">{exp}</sup>}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">กรุณากรอกจำนวนเต็มเพื่อประมวลผลตัวประกอบ</p>
                    )}
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-cyan max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ตัวประกอบของตัวเลข (Number Factors) คืออะไร? เรียนรู้วิธีหาตัวประกอบและการประยุกต์ใช้
                </h2>
                <p>
                    ในทางคณิตศาสตร์ <strong>ตัวประกอบ (Factor)</strong> คือ จำนวนเต็มใดๆ ที่สามารถนำไปหารจำนวนเป้าหมายได้ลงตัวโดยไม่มีเศษเหลือ หรือก็คือผลหารเป็นจำนวนเต็ม ตัวอย่างเช่น ตัวประกอบของ 12 ได้แก่ 1, 2, 3, 4, 6 และ 12 เพราะตัวเลขทุกตัวในชุดนี้สามารถนำไปหาร 12 ได้ลงตัวทั้งหมด การหาตัวประกอบเป็นรากฐานของหัวข้อต่างๆ ในวิชาคณิตศาสตร์ เช่น เศษส่วนอย่างต่ำ การหา ห.ร.ม. (ตัวหารร่วมมาก) และ ค.ร.น. (คูณร่วมน้อย)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการหาตัวประกอบทั้งหมดอย่างเป็นระบบ</h3>
                <p>
                    หากต้องการหาตัวประกอบทั้งหมดของตัวเลขอย่างมีประสิทธิภาพโดยไม่ตกหล่น สามารถทำตามขั้นตอนต่อไปนี้ได้:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>
                        <strong>หาเป็นคู่ (Factor Pairs):</strong> ตัวประกอบจะมาในลักษณะคู่คูณเสมอ ตัวอย่างเช่น หากหาตัวประกอบของ 24 ให้เริ่มจาก 1 &times; 24, 2 &times; 12, 3 &times; 8, 4 &times; 6.
                    </li>
                    <li>
                        <strong>ตรวจสอบไปจนถึงรากที่สอง (Square Root):</strong> เราไม่จำเป็นต้องไล่ตรวจจำนวนหารตั้งแต่ 1 ไปจนถึงตัวเลขนั้นทั้งหมดเพื่อประหยัดเวลา ให้ทำถึงเพียงรากที่สอง ($\sqrt{"{"}N{"}"}$) ของตัวเลขนั้นๆ เท่านั้น ตัวอย่างเช่น ของ 24 รากที่สองจะอยู่ระหว่าง 4 กับ 5 ดังนั้นตรวจหาตัวหารเฉพาะ 1, 2, 3, 4 ซึ่งพอได้พาร์ทเนอร์คู่คูณครบ เราก็จะได้ตัวประกอบทั้งหมดโดยปริยาย
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การแยกตัวประกอบเฉพาะ (Prime Factorization)</h3>
                <p>
                    <strong>การแยกตัวประกอบเฉพาะ</strong> เป็นกระบวนการที่แตกต่างจากการหาตัวประกอบทั้งหมด โดยหมายถึงการแสดงจำนวนเต็มใดๆ ให้อยู่ในรูปของการคูณกันของจำนวนเฉพาะเท่านั้น ตัวอย่างเช่น การแยกตัวประกอบเฉพาะของ 12 เขียนแทนได้ด้วย:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-cyan-700">
                    12 = 2 &times; 2 &times; 3 = 2<sup>2</sup> &times; 3
                </div>
                <p>
                    การแยกตัวประกอบเฉพาะนี้เปรียบเสมือน &ldquo;พิมพ์เขียวทางพันธุกรรม&rdquo; ของตัวเลข เพราะตามทฤษฎีบทมูลฐานของเลขคณิต ตัวเลขประกอบทุกตัวจะมีความสัมพันธ์การแยกตัวประกอบเฉพาะที่เป็นรูปแบบเฉพาะของตนเองเพียงรูปแบบเดียวเท่านั้น
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประเภทของตัวเลขวิเคราะห์จากผลรวมตัวประกอบ</h3>
                <p>
                    เราสามารถจำแนกตัวเลขได้ 3 ประเภทหลักโดยอ้างอิงจากผลรวมของตัวประกอบแท้ (ตัวประกอบทั้งหมดที่ไม่รวมตัวมันเอง):
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                        <strong>จำนวนสมบูรณ์ (Perfect Number):</strong> ผลรวมของตัวประกอบแท้มีค่าเท่ากับตัวมันเองพอดี เช่น 6 (1 + 2 + 3 = 6) และ 28 (1 + 2 + 4 + 7 + 14 = 28)
                    </li>
                    <li>
                        <strong>จำนวนพรั่งพร้อม (Abundant Number):</strong> ผลรวมของตัวประกอบแท้มีค่ามากกว่าตัวมันเอง เช่น 12 (1 + 2 + 3 + 4 + 6 = 16 ซึ่งมากกว่า 12)
                    </li>
                    <li>
                        <strong>จำนวนบกพร่อง (Deficient Number):</strong> ผลรวมของตัวประกอบแท้มีค่าน้อยกว่าตัวมันเอง เช่น 8 (1 + 2 + 4 = 7 ซึ่งน้อยกว่า 8)
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ในชีวิตประจำวันและการเรียน</h3>
                <p>
                    ตัวประกอบมีบทบาทเด่นในการแก้ปัญหาทั่วไป เช่น การจัดสิ่งของหรือแบ่งจำนวนนักเรียนให้อยู่ในกลุ่มที่เท่ากันโดยไม่เหลือเศษ การคำนวณขนาดและอัตราส่วนในหน้าจออุปกรณ์ดิจิทัล (Aspect Ratio) ตลอดจนการย่อขยายขนาดภาพถ่ายโดยยังคงรักษาสัดส่วนความยาวและความกว้าง โปรแกรม Factor Generator นี้ออกแบบมาให้คำนวณตัวประกอบของตัวเลขได้อย่างรวดเร็ว เหมาะสำหรับการเรียนการสอนวิชาคณิตศาสตร์และวิศวกรรมต่างๆ
                </p>
            </article>
        </div>
    );
}
