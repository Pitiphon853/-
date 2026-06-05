import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function InverseProportion({ lang }: any) {
    const [valA, setValA] = useState<string>('4');
    const [valB, setValB] = useState<string>('6');
    const [valC, setValC] = useState<string>('8');
    const [result, setResult] = useState<number | null>(3);
    const [error, setError] = useState<string>('');

    const calculate = (aStr: string, bStr: string, cStr: string) => {
        const a = parseFloat(aStr);
        const b = parseFloat(bStr);
        const c = parseFloat(cStr);

        if (aStr === '' || bStr === '' || cStr === '') {
            setResult(null);
            setError('');
            return;
        }

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            setResult(null);
            setError('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }

        if (c === 0) {
            setError('ตัวแปรที่สาม (C) ต้องไม่เท่ากับ 0 เพื่อป้องกันความผิดพลาดทางคณิตศาสตร์ (Division by Zero)');
            setResult(null);
            return;
        }

        setError('');
        // Inverse Proportion: A * B = C * X => X = (A * B) / C
        const ans = (a * b) / c;
        setResult(ans);
    };

    const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValA(v);
        calculate(v, valB, valC);
    };

    const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValB(v);
        calculate(valA, v, valC);
    };

    const handleCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValC(v);
        calculate(valA, valB, v);
    };

    const handleReset = () => {
        setValA('4');
        setValB('6');
        setValC('8');
        setResult(3);
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-teal-600" />
                เครื่องมือคำนวณสัดส่วน / บัญญัติไตรยางศ์ (แปรผกผัน)
            </h1>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 text-teal-800 text-sm">
                <strong>หลักการบัญญัติไตรยางศ์แบบแปรผกผัน:</strong> เมื่อปริมาณหนึ่งเพิ่มขึ้น อีกปริมาณหนึ่งจะลดลงในสัดส่วนที่เท่ากัน เพื่อให้ผลคูณรวมมีค่าคงเดิม เช่น คนงาน 4 คน สร้างกำแพงเสร็จใน 6 วัน ถ้าเพิ่มคนงานเป็น 8 คน จะใช้เวลากี่วัน? (คนเยอะขึ้น ย่อมทำเสร็จเร็วขึ้น)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">กำหนดค่าตัวแปร</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ถ้าปัจจัยเริ่มต้น (A)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valA}
                                onChange={handleAChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="เช่น 4 (คนงาน)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ใช้เวลารวม / ผลลัพธ์เริ่มต้น (B)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valB}
                                onChange={handleBChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="เช่น 6 (วัน)"
                            />
                        </div>

                        <div className="border-t pt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                แล้วถ้าปัจจัยใหม่เปลี่ยนเป็น (C)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valC}
                                onChange={handleCChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="เช่น 8 (คนงาน)"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset ค่าเริ่มต้น
                    </button>
                </div>

                {/* Output */}
                <div className="flex flex-col justify-between bg-teal-50 p-6 rounded-xl border border-teal-100 min-h-[300px]">
                    <div>
                        <h2 className="text-lg font-semibold text-teal-950 mb-4 border-b border-teal-200 pb-2">
                            ผลลัพธ์การแปรผกผัน (X)
                        </h2>
                        {error ? (
                            <p className="text-red-600 font-medium text-sm">{error}</p>
                        ) : result !== null ? (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-teal-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">ค่าของ X คือ</p>
                                    <p className="text-4xl font-extrabold text-teal-600">
                                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                    </p>
                                </div>
                                <div className="space-y-2 text-sm text-teal-900">
                                    <p className="font-semibold">ขั้นตอนการคำนวณ:</p>
                                    <div className="bg-white p-3 rounded border border-teal-100 font-mono text-xs space-y-1">
                                        <p>สูตร: X = (A &times; B) &divide; C</p>
                                        <p>แทนค่า: X = ({valA} &times; {valB}) &divide; {valC}</p>
                                        <p>จะได้: X = {parseFloat(valA) * parseFloat(valB)} &divide; {valC}</p>
                                        <p className="font-bold text-teal-700">คำตอบ: X = {result}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">กรุณากรอกตัวแปรให้ครบเพื่อคำนวณผลลัพธ์</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-teal-200 text-xs text-teal-800">
                        * บัญญัติไตรยางศ์ผกผันใช้เมื่อทิศทางการเปลี่ยนแปลงของสองตัวแปรมีลักษณะสวนทางกัน (ตัวหนึ่งเพิ่ม อีกตัวลด)
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-teal max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ทำความเข้าใจการบัญญัติไตรยางศ์แบบแปรผกผัน (Inverse Proportion)
                </h2>
                <p>
                    ในการศึกษาคณิตศาสตร์พื้นฐาน นอกเหนือจากการแปรผันตรงแล้ว อีกความสัมพันธ์หนึ่งที่มีบทบาทสำคัญอย่างมากคือ <strong>การแปรผกผัน (Inverse Proportion)</strong> หรือการบัญญัติไตรยางศ์ผกผัน ซึ่งหมายถึง ความสัมพันธ์ของสองตัวแปรที่เคลื่อนที่ในทิศทางตรงกันข้ามอย่างเป็นสัดส่วน กล่าวคือ เมื่อตัวแปรแรกเพิ่มจำนวนขึ้น ตัวแปรที่สองจะลดลงในอัตราส่วนที่เทียบเท่ากัน หรือในทางกลับกัน เมื่อตัวแปรแรกมีค่าน้อยลง ตัวแปรที่สองก็จะมีค่าเพิ่มสูงขึ้น
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรคณิตศาสตร์ของการแปรผกผัน</h3>
                <p>
                    หากให้ $y$ แปรผกผันกับ $x$ เราสามารถเขียนสมการความสัมพันธ์ได้เป็น:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center">
                    y &propto; 1/x &rArr; y = k/x &rArr; x &times; y = k
                </div>
                <p>
                    โดยที่ <strong>k</strong> คือค่าคงตัวของการแปรผัน (Constant of Variation) ที่ผลคูณระหว่างสองตัวแปรต้องคงที่อยู่เสมอ
                </p>
                <p>
                    เมื่อเขียนเปรียบเทียบในรูปแบบบัญญัติไตรยางศ์ 2 สถานการณ์ จะได้ความสัมพันธ์ว่า:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center">
                    A &times; B = C &times; X
                </div>
                <p>
                    ดังนั้น สูตรหาค่าตัวแปรผลลัพธ์ใหม่ <strong>X</strong> จึงเท่ากับ:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-teal-700">
                    X = (A &times; B) &divide; C
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">กรณีศึกษาและตัวอย่างในชีวิตประจำวัน</h3>
                <p>
                    การทำความเข้าใจด้วยตัวอย่างแบบเห็นภาพชัดเจนจะช่วยให้เราใช้เครื่องมือได้อย่างเต็มประสิทธิภาพ:
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-4">
                    <li>
                        <strong>แรงงานคนและเวลาทำงาน:</strong> หากงานชิ้นหนึ่งใช้คนงาน 4 คนสร้างเสร็จใน 6 วัน (A = 4, B = 6) หากเราต้องการเร่งงานโดยเพิ่มคนงานเป็น 8 คน (C = 8) งานจะเสร็จภายในกี่วัน (X)?
                        <br />
                        <em>คำนวณ:</em> X = (4 &times; 6) &divide; 8 = 24 &divide; 8 = 3 วัน (จะเห็นว่าคนงานเพิ่มขึ้นเป็น 2 เท่า ทำให้เวลาลดลงครึ่งหนึ่ง)
                    </li>
                    <li>
                        <strong>อัตราเร็วและเวลาในการเดินทาง:</strong> รถยนต์ขับด้วยความเร็วเฉลี่ย 80 กม./ชม. เดินทางถึงเป้าหมายในเวลา 3 ชั่วโมง (A = 80, B = 3) หากเราเพิ่มความเร็วเป็น 120 กม./ชม. (C = 120) จะใช้เวลาเดินทางเหลือเท่าใด (X)?
                        <br />
                        <em>คำนวณ:</em> X = (80 &times; 3) &divide; 120 = 240 &divide; 120 = 2 ชั่วโมง
                    </li>
                    <li>
                        <strong>การแบ่งปันทรัพยากร:</strong> มีอาหารแห้งเพียงพอสำหรับลูกเสือ 10 คน กินได้ 12 วัน (A = 10, B = 12) หากมีลูกเสือย้ายเข้ามาเพิ่มอีกเป็น 15 คน (C = 15) อาหารชุดนี้จะแจกจ่ายให้กินอิ่มได้กี่วัน (X)?
                        <br />
                        <em>คำนวณ:</em> X = (10 &times; 12) &divide; 15 = 120 &divide; 15 = 8 วัน
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุปประโยชน์การใช้งาน</h3>
                <p>
                    เว็บบล็อกและเครื่องมือนี้เป็นตัวช่วยชิ้นสำคัญสำหรับทุกคน ไม่ว่าจะเป็นนักเรียนที่เรียนวิชาคณิตศาสตร์ หัวหน้างานในสายการผลิตที่ต้องวางแผนจำนวนคนกับเวลาทำงาน หรือผู้ควบคุมการขนส่งที่ต้องการเปรียบเทียบความเร็วระยะทางและระยะเวลา การคำนวณอย่างถูกต้องจะช่วยประหยัดเวลาและลดข้อผิดพลาดในการวางแผนปฏิบัติงานได้อย่างมีประสิทธิภาพ โปรแกรมของเราพร้อมวิเคราะห์ขั้นตอนสูตรและคำนวณผลลัพธ์ได้อย่างแม่นยำในเสี้ยววินาที
                </p>
            </article>
        </div>
    );
}
