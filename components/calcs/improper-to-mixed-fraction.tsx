import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function ImproperToMixedFraction({ lang }: any) {
    const [numerator, setNumerator] = useState<string>('7');
    const [denominator, setDenominator] = useState<string>('3');
    const [result, setResult] = useState<{ whole: number; n: number; d: number } | null>({ whole: 2, n: 1, d: 3 });

    const calculate = (numStr: string, denStr: string) => {
        const num = parseInt(numStr, 10);
        const den = parseInt(denStr, 10);

        if (!isNaN(num) && !isNaN(den) && den !== 0) {
            const whole = Math.floor(Math.abs(num) / Math.abs(den));
            const remainder = Math.abs(num) % Math.abs(den);
            
            // Manage sign
            const isNegative = (num < 0 && den > 0) || (num > 0 && den < 0);
            
            setResult({
                whole: isNegative ? -whole : whole,
                n: remainder,
                d: Math.abs(den)
            });
        } else {
            setResult(null);
        }
    };

    const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumerator(e.target.value);
        calculate(e.target.value, denominator);
    };

    const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDenominator(e.target.value);
        calculate(numerator, e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-green-600" />
                เครื่องมือแปลงเศษส่วนเกินเป็นเศษส่วนคละ
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                    <h2 className="font-semibold text-gray-800">เศษส่วนเกิน (Improper Fraction)</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ตัวเศษ (Numerator)</label>
                        <input
                            type="number"
                            value={numerator}
                            onChange={handleNumeratorChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            placeholder="เช่น 7"
                        />
                    </div>
                    
                    <div className="w-full h-px bg-gray-300 my-4 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-sm text-gray-500">
                            ส่วนด้วย
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ตัวส่วน (Denominator)</label>
                        <input
                            type="number"
                            value={denominator}
                            onChange={handleDenominatorChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            placeholder="เช่น 3"
                        />
                    </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl flex flex-col justify-center items-center text-center min-h-[250px]">
                    <h2 className="text-lg font-semibold text-green-900 mb-6">ผลลัพธ์ (จำนวนคละ)</h2>
                    {result ? (
                        <div className="flex items-center gap-4 text-green-700">
                            {result.whole !== 0 && (
                                <span className="text-5xl md:text-6xl font-bold">{result.whole}</span>
                            )}
                            {result.n !== 0 && (
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold px-3 pb-1 border-b-4 border-green-700">
                                        {result.n}
                                    </span>
                                    <span className="text-3xl font-bold px-3 pt-1">
                                        {result.d}
                                    </span>
                                </div>
                            )}
                            {result.whole === 0 && result.n === 0 && (
                                <span className="text-5xl font-bold">0</span>
                            )}
                        </div>
                    ) : (
                        <div className="text-2xl text-green-400 font-medium">-</div>
                    )}
                </div>
            </div>

            <article className="prose prose-green max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การแปลงเศษส่วนเกินเป็นเศษคละ (Improper to Mixed Fraction)</h2>
                
                <p>หลายครั้งเมื่อเราทำการคำนวณทางคณิตศาสตร์ที่เกี่ยวข้องกับการบวกหรือคูณเศษส่วน ผลลัพธ์ที่ได้มักจะอยู่ในรูปแบบของ "เศษส่วนเกิน" (Improper Fraction) ซึ่งหมายถึงเศษส่วนที่มีตัวเศษ (ตัวเลขด้านบน) มากกว่าหรือเท่ากับตัวส่วน (ตัวเลขด้านล่าง) การปล่อยคำตอบไว้ในรูปแบบนี้อาจทำให้ยากต่อการจินตนาการขนาดที่แท้จริงของค่าต่างๆ ดังนั้น การแปลงเศษส่วนเกินให้เป็น "จำนวนคละ" (Mixed Number) จึงเป็นวิธีที่ทำให้ตัวเลขเข้าใจได้ง่ายขึ้นมาก</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เศษส่วนเกินและจำนวนคละคืออะไร?</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>เศษส่วนเกิน (Improper Fraction):</strong> เศษส่วนที่มีค่าตัวเศษมากกว่าตัวส่วน เช่น 7/3, 5/2, หรือ 12/5 ซึ่งแสดงให้เห็นว่าค่านั้นมีขนาดมากกว่า 1 เต็มๆ</li>
                    <li><strong>จำนวนคละ หรือ เศษคละ (Mixed Fraction/Number):</strong> ตัวเลขที่ประกอบด้วยสองส่วน คือ ส่วนที่เป็น "จำนวนเต็ม" และส่วนที่เป็น "เศษส่วนแท้" (ตัวเศษน้อยกว่าตัวส่วน) เช่น 2 1/3 (สองเศษหนึ่งส่วนสาม)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีคำนวณแปลงเศษส่วนเกินเป็นเศษคละ</h3>
                <p>การคำนวณเพื่อแปลงค่าสามารถทำได้ด้วยวิธีการหารยาวแบบหาเศษ (Division with Remainder) โดยมีขั้นตอนดังนี้:</p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>นำตัวเศษตั้ง หารด้วยตัวส่วน:</strong> ให้ใช้ตัวเศษเป็นตัวตั้ง และตัวส่วนเป็นตัวหาร</li>
                    <li><strong>ผลหารที่เป็นจำนวนเต็ม:</strong> ผลลัพธ์จากการหาร (ไม่นับเศษ) จะกลายมาเป็นจำนวนเต็มด้านหน้าของจำนวนคละ</li>
                    <li><strong>เศษที่เหลือจากการหาร:</strong> เศษที่ได้จากการหารจะกลายเป็นตัวเศษตัวใหม่ในส่วนของเศษส่วนแท้</li>
                    <li><strong>ตัวส่วนคงเดิม:</strong> ให้ใช้ตัวส่วนตัวเดิมไม่เปลี่ยนแปลง</li>
                </ol>

                <p className="mt-4"><strong>ตัวอย่างการคำนวณ:</strong> ต้องการแปลง 7/3 เป็นจำนวนคละ</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>นำ 7 หารด้วย 3 (7 ÷ 3)</li>
                    <li>ได้ผลหารคือ 2 (3 × 2 = 6) และเหลือเศษ 1 (7 - 6 = 1)</li>
                    <li>นำจำนวนเต็ม (2) มาเขียนไว้ด้านหน้า และนำเศษ (1) ไปเป็นตัวเศษใหม่ ส่วนตัวส่วนยังคงเป็น 3 เหมือนเดิม</li>
                    <li>คำตอบที่ได้คือ 2 1/3 (สองเศษหนึ่งส่วนสาม)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อดีของการใช้เครื่องมือคำนวณของเรา</h3>
                <p>การเข้าใจวิธีการแปลงด้วยตนเองเป็นสิ่งสำคัญ แต่ในกรณีที่มีตัวเลขปริมาณมาก หรือมีความซับซ้อน เช่น การคำนวณสูตรอาหาร การแบ่งวัตถุดิบ หรืองานวิศวกรรม เครื่องมือแปลงเศษส่วนเกินเป็นเศษส่วนคละของเราจะช่วยให้คุณประหยัดเวลาและลดข้อผิดพลาดในการคำนวณลงได้ เพียงแค่ใส่ตัวเศษและตัวส่วน ระบบจะคำนวณและแสดงผลออกมาในรูปจำนวนเต็มและเศษส่วนอย่างถูกต้อง ชัดเจน และรวดเร็ว ทำให้คุณสามารถนำผลลัพธ์ไปใช้งานจริงได้อย่างมั่นใจ ทั้งหมดนี้เพื่อให้การใช้งานคณิตศาสตร์ในชีวิตประจำวันของคุณเป็นเรื่องง่ายดายและไม่มีข้อจำกัดใดๆ ในเรื่องการคำนวณตัวเลขยากๆ อีกต่อไป</p>
            </article>
        </div>
    );
}
