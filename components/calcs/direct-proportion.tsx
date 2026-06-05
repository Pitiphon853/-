import React, { useState } from 'react';
import { Calculator, RefreshCw, Equal } from 'lucide-react';

export default function DirectProportion({ lang }: any) {
    const [valA, setValA] = useState<string>('2');
    const [valB, setValB] = useState<string>('10');
    const [valC, setValC] = useState<string>('5');
    const [result, setResult] = useState<number | null>(25);
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

        if (a === 0) {
            setError('ตัวแปรแรก (A) ต้องไม่เท่ากับ 0 เพื่อป้องกันความผิดพลาดทางคณิตศาสตร์ (Division by Zero)');
            setResult(null);
            return;
        }

        setError('');
        // Direct Proportion: B / A = X / C => X = (B * C) / A
        const ans = (b * c) / a;
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
        setValA('2');
        setValB('10');
        setValC('5');
        setResult(25);
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-600" />
                เครื่องมือคำนวณสัดส่วน / บัญญัติไตรยางศ์ (แปรผันตรง)
            </h1>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6 text-emerald-800 text-sm">
                <strong>หลักการบัญญัติไตรยางศ์แบบแปรผันตรง:</strong> เมื่อปริมาณหนึ่งเพิ่มขึ้น อีกปริมาณหนึ่งจะเพิ่มขึ้นในสัดส่วนที่เท่ากัน หรือเมื่อปริมาณหนึ่งลดลง อีกปริมาณหนึ่งก็จะลดลงด้วย เช่น ไข่ไก่ 2 ฟอง ราคา 10 บาท ถ้าไข่ไก่ 5 ฟอง จะราคาเท่าไหร่?
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">กำหนดค่าตัวแปร</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ถ้าปริมาณเริ่มต้น (A)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valA}
                                onChange={handleAChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="เช่น 2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                เทียบเท่ากับค่าผลลัพธ์ (B)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valB}
                                onChange={handleBChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="เช่น 10"
                            />
                        </div>

                        <div className="border-t pt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                แล้วถ้าปริมาณใหม่ (C)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={valC}
                                onChange={handleCChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                placeholder="เช่น 5"
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

                {/* Output & Explanation */}
                <div className="flex flex-col justify-between bg-emerald-50 p-6 rounded-xl border border-emerald-100 min-h-[300px]">
                    <div>
                        <h2 className="text-lg font-semibold text-emerald-950 mb-4 border-b border-emerald-200 pb-2">
                            ผลลัพธ์การแปรผันตรง (X)
                        </h2>
                        {error ? (
                            <p className="text-red-600 font-medium text-sm">{error}</p>
                        ) : result !== null ? (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-emerald-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">ค่าของ X คือ</p>
                                    <p className="text-4xl font-extrabold text-emerald-600">
                                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                    </p>
                                </div>
                                <div className="space-y-2 text-sm text-emerald-900">
                                    <p className="font-semibold">ขั้นตอนการคำนวณ:</p>
                                    <div className="bg-white p-3 rounded border border-emerald-100 font-mono text-xs space-y-1">
                                        <p>สูตร: X = (B &times; C) &divide; A</p>
                                        <p>แทนค่า: X = ({valB} &times; {valC}) &divide; {valA}</p>
                                        <p>จะได้: X = {parseFloat(valB) * parseFloat(valC)} &divide; {valA}</p>
                                        <p className="font-bold text-emerald-700">คำตอบ: X = {result}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">กรุณากรอกตัวแปรให้ครบเพื่อคำนวณผลลัพธ์</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs text-emerald-800">
                        * บัญญัติไตรยางศ์ตรงใช้เมื่อทิศทางการเปลี่ยนแปลงของตัวแปรทั้งสองเป็นไปในแนวทางเดียวกัน (เพิ่มขึ้นคู่ หรือลดลงคู่)
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-emerald max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    การบัญญัติไตรยางศ์แบบแปรผันตรง (Direct Proportion) คืออะไร?
                </h2>
                <p>
                    การบัญญัติไตรยางศ์แบบแปรผันตรง หรือ <strong>Direct Proportion</strong> คือ ความสัมพันธ์ระหว่างสองปริมาณที่แปรผันตามกันอย่างมีสัดส่วนคงที่ เมื่อปริมาณหนึ่งมีค่าเพิ่มขึ้น อีกปริมาณหนึ่งจะเพิ่มขึ้นตามไปด้วยในอัตราส่วนเดียวกัน และในทางกลับกัน เมื่อปริมาณหนึ่งลดลง ปริมาณที่สองก็จะลดลงตามไปด้วยอย่างสอดคล้องกัน ตัวอย่างที่พบได้บ่อยในชีวิตประจำวัน ได้แก่ การซื้อสินค้า (ยิ่งซื้อจำนวนมาก ราคารวมยิ่งสูงขึ้น), การขับรถยนต์ด้วยความเร็วคงที่ (ระยะทางที่วิ่งได้จะแปรผันตรงกับระยะเวลาที่ใช้วิ่ง), และการแลกเปลี่ยนสกุลเงินต่างประเทศ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรทางคณิตศาสตร์ของการแปรผันตรง</h3>
                <p>
                    หากเรามีสองตัวแปรคือ $x$ และ $y$ ที่แปรผันตรงกัน เราสามารถเขียนความสัมพันธ์ได้เป็น:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center">
                    y &propto; x &rArr; y = kx
                </div>
                <p>
                    โดยที่ <strong>k</strong> คือค่าคงตัวของการแปรผัน (Constant of Variation) ที่ไม่เท่ากับศูนย์
                </p>
                <p>
                    หากเราเทียบปริมาณจากสองสถานการณ์ จะได้สัดส่วนดังนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center">
                    B / A = X / C
                </div>
                <p>
                    เมื่อเราต้องการหาค่าของ <strong>X</strong> ซึ่งเป็นผลลัพธ์สุดท้ายที่เราต้องการทราบ สูตรจะถูกแปลงเป็น:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-emerald-700">
                    X = (B &times; C) &divide; A
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างโจทย์บัญญัติไตรยางศ์แปรผันตรงในชีวิตจริง</h3>
                <p>
                    เพื่อช่วยให้คุณเข้าใจหลักการทำงานนี้ได้ชัดเจนยิ่งขึ้น ลองพิจารณาตัวอย่างสถานการณ์ต่อไปนี้:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>
                        <strong>การคำนวณวัตถุดิบทำอาหาร:</strong> หากสูตรทำเค้กกำหนดให้ใช้แป้ง 200 กรัม สำหรับเค้ก 2 ก้อน (A = 2, B = 200) แต่เราต้องการทำเค้กถึง 5 ก้อน (C = 5) เราจะต้องใช้แป้งกี่กรัม (X)?
                        <br />
                        <em>วิธีทำ:</em> แทนค่าในสูตร X = (200 &times; 5) &divide; 2 = 1,000 &divide; 2 = 500 กรัม
                    </li>
                    <li>
                        <strong>การคำนวณราคาสินค้าต่อหน่วย:</strong> สมมติว่าปากกา 3 แท่ง ราคา 45 บาท (A = 3, B = 45) หากเราซื้อปากกาชนิดเดียวกันนี้ 12 แท่ง (C = 12) เราจะต้องจ่ายเงินทั้งหมดกี่บาท (X)?
                        <br />
                        <em>วิธีทำ:</em> แทนค่าในสูตร X = (45 &times; 12) &divide; 3 = 540 &divide; 3 = 180 บาท
                    </li>
                    <li>
                        <strong>การคำนวณระยะทางกับน้ำมันเชื้อเพลิง:</strong> รถยนต์คันหนึ่งใช้น้ำมัน 5 ลิตร เดินทางได้ระยะทาง 80 กิโลเมตร (A = 5, B = 80) หากน้ำมันในถังมีเหลืออยู่ 15 ลิตร (C = 15) รถคันนี้จะแล่นได้ระยะทางไกลสุดกี่กิโลเมตร (X)?
                        <br />
                        <em>วิธีทำ:</em> แทนค่าในสูตร X = (80 &times; 15) &divide; 5 = 1,200 &divide; 5 = 240 กิโลเมตร
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุปประโยชน์ของโปรแกรมคำนวณแปรผันตรง</h3>
                <p>
                    โปรแกรมคำนวณบัญญัติไตรยางศ์แปรผันตรงนี้ถูกพัฒนาขึ้นเพื่อช่วยอำนวยความสะดวกในการแก้ปัญหาคณิตศาสตร์พื้นฐานได้อย่างรวดเร็ว แม่นยำ ไม่ว่าคุณจะเป็นนักเรียนที่ต้องการตรวจคำตอบวิชาคณิตศาสตร์, พ่อค้าแม่ค้าที่ต้องการเทียบราคาสินค้า, หรือพ่อบ้านแม่บ้านที่กำลังปรับขนาดสูตรอาหาร เพียงแค่กรอกข้อมูลเดิมที่มี (ค่า A และ B) และกรอกปริมาณที่ต้องการเปรียบเทียบใหม่ (ค่า C) ระบบจะช่วยคำนวณหาค่าสุดท้ายให้โดยทันที พร้อมแสดงรายละเอียดสูตรคำนวณอย่างชัดเจนเพื่อประโยชน์ในการทบทวนความรู้ของคุณ
                </p>
            </article>
        </div>
    );
}
