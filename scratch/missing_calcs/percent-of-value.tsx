import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function PercentOfValue({ lang }: any) {
    const [percent, setPercent] = useState<string>('15');
    const [totalValue, setTotalValue] = useState<string>('2500');
    const [result, setResult] = useState<number | null>(375);
    const [error, setError] = useState<string>('');

    const calculate = (pStr: string, vStr: string) => {
        const p = parseFloat(pStr);
        const v = parseFloat(vStr);

        if (pStr === '' || vStr === '') {
            setResult(null);
            setError('');
            return;
        }

        if (isNaN(p) || isNaN(v)) {
            setResult(null);
            setError('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }

        setError('');
        // R = (P / 100) * V
        const ans = (p / 100) * v;
        setResult(ans);
    };

    const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPercent(val);
        calculate(val, totalValue);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTotalValue(val);
        calculate(percent, val);
    };

    const handleReset = () => {
        setPercent('15');
        setTotalValue('2500');
        setResult(375);
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-blue-600" />
                เครื่องมือคำนวณหาเปอร์เซ็นต์ของจำนวนเงิน / ค่าทั้งหมด
            </h1>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-blue-800 text-sm">
                <strong>เครื่องมือหาค่าเปอร์เซ็นต์:</strong> ช่วยหาคำตอบว่า กี่เปอร์เซ็นต์ (%) ของจำนวนเงินหรือปริมาณทั้งหมด มีค่าเท่ากับเท่าไหร่ เช่น การหาว่า 15% ของเงิน 2,500 บาท คือกี่บาท?
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">กำหนดข้อมูล</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                เปอร์เซ็นต์ที่ต้องการหา (%)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={percent}
                                onChange={handlePercentChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="เช่น 15"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                จากจำนวนเงิน / ค่าทั้งหมด (Value)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={totalValue}
                                onChange={handleValueChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="เช่น 2500"
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
                <div className="flex flex-col justify-between bg-blue-50 p-6 rounded-xl border border-blue-100 min-h-[300px]">
                    <div>
                        <h2 className="text-lg font-semibold text-blue-950 mb-4 border-b border-blue-200 pb-2">
                            ผลลัพธ์การคำนวณ
                        </h2>
                        {error ? (
                            <p className="text-red-600 font-medium text-sm">{error}</p>
                        ) : result !== null ? (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-blue-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">คำตอบคือ</p>
                                    <p className="text-4xl font-extrabold text-blue-600">
                                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                    </p>
                                </div>
                                <div className="space-y-2 text-sm text-blue-900">
                                    <p className="font-semibold">ขั้นตอนการคำนวณ:</p>
                                    <div className="bg-white p-3 rounded border border-blue-100 font-mono text-xs space-y-1">
                                        <p>สูตร: ผลลัพธ์ = (เปอร์เซ็นต์ &divide; 100) &times; ค่าทั้งหมด</p>
                                        <p>แทนค่า: ผลลัพธ์ = ({percent} &divide; 100) &times; {totalValue}</p>
                                        <p>จะได้: ผลลัพธ์ = {parseFloat(percent) / 100} &times; {totalValue}</p>
                                        <p className="font-bold text-blue-700">คำตอบ: {result}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">กรุณากรอกข้อมูลให้ครบเพื่อคำนวณผลลัพธ์</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-blue-200 text-xs text-blue-800 text-center">
                        {percent}% ของ {totalValue} คือ {result !== null ? result : '-'}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-blue max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    เปอร์เซ็นต์ (ร้อยละ) ของจำนวนเงิน คืออะไร? และคำนวณอย่างไร?
                </h2>
                <p>
                    ในทางคณิตศาสตร์ คำว่า <strong>เปอร์เซ็นต์ (Percentage)</strong> หรือ <strong>ร้อยละ</strong> เป็นการแสดงจำนวนในรูปของเศษส่วนที่มีส่วนเป็น 100 เสมอ คำว่า &ldquo;เปอร์เซ็นต์&rdquo; มาจากภาษาละตินว่า &ldquo;per centum&rdquo; ซึ่งมีความหมายตรงตัวว่า &ldquo;ต่อร้อย&rdquo; หรือ &ldquo;ต่อหนึ่งร้อย&rdquo; ตัวอย่างเช่น 15% หมายถึง 15 ส่วน จากทั้งหมด 100 ส่วน การเข้าใจเรื่องเปอร์เซ็นต์และมีความสามารถในการคำนวณหาค่าจากยอดรวมจึงมีประโยชน์อย่างยิ่งต่อชีวิตประจำวันและการดำเนินธุรกิจ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาค่าเปอร์เซ็นต์ของจำนวนเงิน</h3>
                <p>
                    เมื่อเราต้องการหาค่าเปอร์เซ็นต์เฉพาะเจาะจงของปริมาณค่าหนึ่ง เราจะสามารถแปลงปัญหาดังกล่าวมาเขียนเป็นสมการคณิตศาสตร์ที่เข้าใจง่ายได้ดังนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-blue-700">
                    ผลลัพธ์ (Amount) = (เปอร์เซ็นต์ / 100) &times; ยอดรวมทั้งหมด (Total Value)
                </div>
                <p>
                    ขั้นตอนในการทำความเข้าใจสูตรนี้คือ:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>นำค่าเปอร์เซ็นต์ที่เราต้องการทราบมาเปลี่ยนให้อยู่ในรูปของเศษส่วนหรือทศนิยม โดยการนำมาหารด้วย 100 (เช่น 15% จะกลายเป็น 15/100 หรือ 0.15)</li>
                    <li>นำทศนิยมดังกล่าวมาคูณเข้ากับยอดเงินรวมทั้งหมดหรือปริมาณที่กำหนดไว้</li>
                    <li>ผลคูณที่ได้ก็คือมูลค่าจริงที่สอดคล้องกับเปอร์เซ็นต์ที่กำหนด</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคิดคำนวณในชีวิตจริง</h3>
                <p>
                    การคิดเปอร์เซ็นต์มักใช้ในสถานการณ์ด้านล่างนี้:
                </p>
                <ol className="list-decimal pl-6 space-y-3 mb-4">
                    <li>
                        <strong>การหาค่าส่วนลดสินค้า:</strong> ห้างสรรพสินค้าแห่งหนึ่งติดป้ายลดราคาเสื้อยืดตัวละ 450 บาท ลง 20% เราจะได้ส่วนลดกี่บาท?
                        <br />
                        <em>วิธีคำนวณ:</em> ส่วนลด = (20 &divide; 100) &times; 450 = 0.20 &times; 450 = 90 บาท (ดังนั้น เราจะซื้อเสื้อยืดตัวนี้ในราคา 450 - 90 = 360 บาท)
                    </li>
                    <li>
                        <strong>การคำนวณภาษีมูลค่าเพิ่ม (VAT 7%):</strong> เราไปรับประทานอาหารที่ร้านอาหารแห่งหนึ่ง มียอดค่าอาหารรวม 1,800 บาท ทางร้านคิดภาษีมูลค่าเพิ่ม 7% คิดเป็นเงินกี่บาท?
                        <br />
                        <em>วิธีคำนวณ:</em> ค่าภาษี VAT = (7 &divide; 100) &times; 1,800 = 0.07 &times; 1,800 = 126 บาท
                    </li>
                    <li>
                        <strong>การหาดอกเบี้ยเงินฝากธนาคาร:</strong> ฝากเงินไว้ในบัญชีออมทรัพย์จำนวน 50,000 บาท ได้รับอัตราดอกเบี้ยต่อปีเท่ากับ 1.25% เมื่อสิ้นปีจะได้ดอกเบี้ยสะสมกี่บาท?
                        <br />
                        <em>วิธีคำนวณ:</em> ดอกเบี้ย = (1.25 &divide; 100) &times; 50,000 = 0.0125 &times; 50,000 = 625 บาท
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของการใช้โปรแกรมช่วยคำนวณ</h3>
                <p>
                    แม้ว่าการคิดเปอร์เซ็นต์จะเป็นคณิตศาสตร์ขั้นพื้นฐาน แต่ความผิดพลาดก็อาจเกิดขึ้นได้ง่ายโดยเฉพาะอย่างยิ่งเมื่อต้องรับมือกับทศนิยมหรือยอดเงินจำนวนมาก โปรแกรมคำนวณออนไลน์นี้สร้างขึ้นเพื่อมอบความสะดวกรวดเร็วในการทำงาน เหมาะสำหรับผู้ประกอบการในการคิดเปอร์เซ็นต์กำไร ยอดหักภาษี ณ ที่จ่าย, สำหรับพนักงานขายในการทำตารางโปรโมชั่นลดราคาสินค้า, และสำหรับนักเรียนนักศึกษาที่ศึกษาการคำนวณทางการเงิน ระบบประมวลผลทันทีที่ตัวเลขถูกป้อนลงไปและแสดงที่มาของการคำนวณอย่างโปร่งใส ช่วยส่งเสริมความเข้าใจในบทเรียนการเงินของทุกคนได้อย่างเป็นรูปธรรม
                </p>
            </article>
        </div>
    );
}
