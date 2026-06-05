import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function ValueIsWhatPercent({ lang }: any) {
    const [partValue, setPartValue] = useState<string>('50');
    const [wholeValue, setWholeValue] = useState<string>('200');
    const [result, setResult] = useState<number | null>(25);
    const [error, setError] = useState<string>('');

    const calculate = (pStr: string, wStr: string) => {
        const part = parseFloat(pStr);
        const whole = parseFloat(wStr);

        if (pStr === '' || wStr === '') {
            setResult(null);
            setError('');
            return;
        }

        if (isNaN(part) || isNaN(whole)) {
            setResult(null);
            setError('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }

        if (whole === 0) {
            setError('ค่าทั้งหมด (ตัวหาร) ต้องไม่เท่ากับ 0 เพื่อหลีกเลี่ยงข้อผิดพลาดทางคณิตศาสตร์');
            setResult(null);
            return;
        }

        setError('');
        // P = (Part / Whole) * 100
        const ans = (part / whole) * 100;
        setResult(ans);
    };

    const handlePartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPartValue(val);
        calculate(val, wholeValue);
    };

    const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setWholeValue(val);
        calculate(partValue, val);
    };

    const handleReset = () => {
        setPartValue('50');
        setWholeValue('200');
        setResult(25);
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-indigo-600" />
                เครื่องมือคำนวณหาเปอร์เซ็นต์ (A เป็นกี่ % ของ B)
            </h1>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 text-indigo-800 text-sm">
                <strong>เครื่องมือเปรียบเทียบสัดส่วนเปอร์เซ็นต์:</strong> ใช้เปรียบเทียบเพื่อหาว่า ตัวเลขจำนวนหนึ่ง (A) คิดเป็นกี่เปอร์เซ็นต์ของตัวเลขอีกจำนวนหนึ่งที่เป็นยอดรวม (B) เช่น คะแนนสอบ 50 คะแนน จากคะแนนเต็ม 200 คะแนน คิดเป็นกี่เปอร์เซ็นต์?
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">กำหนดข้อมูล</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ตัวเลขที่เป็นส่วนย่อย (A)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={partValue}
                                onChange={handlePartChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="เช่น 50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ตัวเลขทั้งหมดที่เป็นยอดรวม (B)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={wholeValue}
                                onChange={handleWholeChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="เช่น 200"
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
                <div className="flex flex-col justify-between bg-indigo-50 p-6 rounded-xl border border-indigo-100 min-h-[300px]">
                    <div>
                        <h2 className="text-lg font-semibold text-indigo-950 mb-4 border-b border-indigo-200 pb-2">
                            ผลลัพธ์เปอร์เซ็นต์ที่ได้
                        </h2>
                        {error ? (
                            <p className="text-red-600 font-medium text-sm">{error}</p>
                        ) : result !== null ? (
                            <div className="space-y-6">
                                <div className="text-center py-6 bg-white rounded-lg border border-indigo-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">คำตอบคือ</p>
                                    <p className="text-4xl font-extrabold text-indigo-600">
                                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}%
                                    </p>
                                </div>
                                <div className="space-y-2 text-sm text-indigo-900">
                                    <p className="font-semibold">ขั้นตอนการคำนวณ:</p>
                                    <div className="bg-white p-3 rounded border border-indigo-100 font-mono text-xs space-y-1">
                                        <p>สูตร: เปอร์เซ็นต์ = (ตัวเลขย่อย &divide; ยอดรวมทั้งหมด) &times; 100</p>
                                        <p>แทนค่า: เปอร์เซ็นต์ = ({partValue} &divide; {wholeValue}) &times; 100</p>
                                        <p>จะได้: เปอร์เซ็นต์ = {parseFloat(partValue) / parseFloat(wholeValue)} &times; 100</p>
                                        <p className="font-bold text-indigo-700">คำตอบ: {result}%</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">กรุณากรอกข้อมูลให้ครบเพื่อคำนวณผลลัพธ์</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-indigo-200 text-xs text-indigo-800 text-center font-medium">
                        สรุป: {partValue} คิดเป็น {result !== null ? result : '-'}% ของ {wholeValue}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-indigo max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    วิธีคำนวณหาว่าตัวเลขเป็นกี่เปอร์เซ็นต์ของยอดทั้งหมด (A เป็นกี่เปอร์เซ็นต์ของ B)
                </h2>
                <p>
                    หนึ่งในการคำนวณสถิติและคณิตศาสตร์ที่พวกเราเจอบ่อยที่สุดในการใช้ชีวิตประจำวันคือการตรวจสอบว่า <strong>&ldquo;จำนวนส่วนย่อยหนึ่งคิดเป็นกี่เปอร์เซ็นต์ของจำนวนหลัก&rdquo;</strong> หรือคิดเป็นร้อยละเท่าใด ตัวอย่างเช่น หากคุณเป็นนักเรียนคุณอาจอยากรู้ว่าคะแนนสอบที่ทำได้คิดเป็นกี่เปอร์เซ็นต์ หรือหากคุณทำงานคุณย่อมต้องการวิเคราะห์สัดส่วนยอดขายสะสมเมื่อเทียบกับเป้าหมายรวมขององค์กร
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรทางคณิตศาสตร์ในการคำนวณหาอัตราส่วนเปอร์เซ็นต์</h3>
                <p>
                    หลักการคำนวณคือการสร้างความสัมพันธ์แบบเศษส่วนระหว่างตัวเลขส่วนย่อยและยอดรวมทั้งหมด จากนั้นจึงนำไปคูณด้วย 100 เพื่อแปลงค่าให้อยู่ในมาตรฐานร้อยละ ดังสมการนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-indigo-700">
                    เปอร์เซ็นต์ (%) = (จำนวนส่วนย่อย (A) &divide; จำนวนทั้งหมด (B)) &times; 100
                </div>
                <p>
                    ข้อควรระวังประการสำคัญในการคำนวณด้วยสูตรนี้คือ ตัวเศษและตัวส่วนจะต้องมีหน่วยวัดชนิดเดียวกัน และจำนวนทั้งหมดที่เป็นตัวหาร (B) จะต้องไม่เท่ากับศูนย์ เนื่องจากในหลักการคณิตศาสตร์ไม่นิยามการหารด้วยศูนย์ (Division by zero)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างโจทย์และการคิดในสถานการณ์จริง</h3>
                <p>
                    ลองมาศึกษาตัวอย่างและกรณีศึกษาต่อไปนี้เพื่อช่วยให้เห็นภาพการประยุกต์ใช้งานได้ง่ายขึ้น:
                </p>
                <ol className="list-decimal pl-6 space-y-3 mb-4">
                    <li>
                        <strong>การคำนวณเกรดหรือคะแนนสอบ:</strong> หากเด็กหญิงสมศรีทำข้อสอบวิชาประวัติศาสตร์ได้คะแนน 35 คะแนน จากคะแนนเต็มทั้งหมด 40 คะแนน คิดเป็นกี่เปอร์เซ็นต์ของคะแนนเต็ม?
                        <br />
                        <em>วิธีคำนวณ:</em> เปอร์เซ็นต์คะแนน = (35 &divide; 40) &times; 100 = 0.875 &times; 100 = 87.5%
                    </li>
                    <li>
                        <strong>การคำนวณความคืบหน้าของยอดขาย:</strong> พนักงานขายคนหนึ่งได้รับเป้าหมายยอดขายประจำเดือนที่ 150,000 บาท ผ่านไปสองสัปดาห์เขาสามารถปิดการขายไปได้แล้ว 60,000 บาท ยอดขายที่ทำได้นี้คิดเป็นกี่เปอร์เซ็นต์ของเป้าหมายยอดขายทั้งหมด?
                        <br />
                        <em>วิธีคำนวณ:</em> เปอร์เซ็นต์ยอดขายที่บรรลุ = (60,000 &divide; 150,000) &times; 100 = 0.4 &times; 100 = 40%
                    </li>
                    <li>
                        <strong>สัดส่วนการสูญเสียหรือเศษชิ้นงาน:</strong> โรงงานอุตสาหกรรมผลิตชิ้นส่วนรถยนต์ทั้งหมด 5,000 ชิ้น ตรวจพบชิ้นงานที่ไม่ได้คุณภาพหรือชิ้นงานเสีย (Defects) จำนวน 150 ชิ้น อัตราของชิ้นงานที่เสียคิดเป็นกี่เปอร์เซ็นต์ของชิ้นงานที่ผลิตทั้งหมด?
                        <br />
                        <em>วิธีคำนวณ:</em> อัตราของเสีย = (150 &divide; 5,000) &times; 100 = 0.03 &times; 100 = 3%
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">บทสรุปของเครื่องมือคำนวณ</h3>
                <p>
                    โปรแกรมคิดเปอร์เซ็นต์ของเราเป็นระบบอัจฉริยะที่ช่วยวิเคราะห์โจทย์คำถาม &ldquo;A เป็นกี่เปอร์เซ็นต์ของ B&rdquo; ได้ในเสี้ยววินาที ลดขั้นตอนที่ต้องคิดเลขด้วยตนเองหรือการกดเครื่องคิดเลขหลายๆ ครั้ง เครื่องมือนี้เหมาะสมสำหรับนักเรียน นิสิต นักศึกษาที่ต้องการคำนวณคะแนนเก็บ ตลอดจนนักธุรกิจ นักการตลาดที่ต้องวิเคราะห์สัดส่วนตลาด (Market Share) และข้อมูลสถิติที่สำคัญทางการเงิน การแสดงสูตรคำนวณขั้นตอนทีละบรรทัดช่วยให้ผู้ใช้ได้รับความรู้ควบคู่กับความรวดเร็วและแม่นยำในการนำข้อมูลไปใช้งานต่อ
                </p>
            </article>
        </div>
    );
}
