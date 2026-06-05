import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function MixedToImproperFraction({ lang }: any) {
    const [whole, setWhole] = useState<string>('2');
    const [numerator, setNumerator] = useState<string>('1');
    const [denominator, setDenominator] = useState<string>('3');
    const [result, setResult] = useState<{ n: number; d: number } | null>({ n: 7, d: 3 });

    const calculate = (wStr: string, nStr: string, dStr: string) => {
        const w = parseInt(wStr, 10);
        const n = parseInt(nStr, 10);
        const d = parseInt(dStr, 10);

        if (!isNaN(w) && !isNaN(n) && !isNaN(d) && d !== 0) {
            // formula: (whole * denominator) + numerator
            // handle negative whole properly (e.g. -2 1/3 is actually -7/3)
            const isNegative = w < 0;
            const absW = Math.abs(w);
            const numResult = (absW * Math.abs(d)) + Math.abs(n);
            
            setResult({
                n: isNegative ? -numResult : numResult,
                d: Math.abs(d)
            });
        } else {
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-orange-600" />
                เครื่องมือแปลงจำนวนคละเป็นเศษส่วนเกิน
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h2 className="font-semibold text-gray-800 mb-4">จำนวนคละ (Mixed Number)</h2>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนเต็ม</label>
                            <input
                                type="number"
                                value={whole}
                                onChange={(e) => {
                                    setWhole(e.target.value);
                                    calculate(e.target.value, numerator, denominator);
                                }}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ตัวเศษ</label>
                                <input
                                    type="number"
                                    value={numerator}
                                    onChange={(e) => {
                                        setNumerator(e.target.value);
                                        calculate(whole, e.target.value, denominator);
                                    }}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                            <div className="h-px bg-gray-400 my-1"></div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ตัวส่วน</label>
                                <input
                                    type="number"
                                    value={denominator}
                                    onChange={(e) => {
                                        setDenominator(e.target.value);
                                        calculate(whole, numerator, e.target.value);
                                    }}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl flex flex-col justify-center items-center text-center min-h-[250px]">
                    <h2 className="text-lg font-semibold text-orange-900 mb-6">ผลลัพธ์ (เศษส่วนเกิน)</h2>
                    {result ? (
                        <div className="flex flex-col items-center justify-center text-orange-600">
                            <span className="text-5xl md:text-6xl font-bold px-6 pb-2 border-b-4 border-orange-600">
                                {result.n}
                            </span>
                            <span className="text-5xl md:text-6xl font-bold px-6 pt-2">
                                {result.d}
                            </span>
                        </div>
                    ) : (
                        <div className="text-2xl text-orange-400 font-medium">-</div>
                    )}
                </div>
            </div>

            <article className="prose prose-orange max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การแปลงจำนวนคละเป็นเศษส่วนเกิน (Mixed Number to Improper Fraction)</h2>
                
                <p>จำนวนคละ (Mixed Number หรือ Mixed Fraction) คือการนำเสนอตัวเลขด้วยการผสมผสานระหว่างจำนวนเต็มและเศษส่วนเข้าด้วยกัน ทำให้มนุษย์อย่างเราเข้าใจปริมาณได้ง่ายขึ้น เช่น "ฉันกินพิซซ่าไป 2 ถาดครึ่ง" (2 1/2) ซึ่งฟังดูเป็นธรรมชาติมากกว่าการพูดว่า "ฉันกินพิซซ่าไป 5/2 ถาด" แต่ในโลกของคณิตศาสตร์ การนำจำนวนคละไป บวก ลบ คูณ หาร มักจะมีความยุ่งยากมากกว่า ดังนั้นก่อนที่จะทำการคำนวณใดๆ เราจึงต้องแปลง "จำนวนคละ" ให้กลับไปเป็น "เศษส่วนเกิน" (Improper Fraction) เสียก่อนเพื่อลดความสับสนในการใช้สูตรคณิตศาสตร์พื้นฐาน</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรและวิธีการคำนวณ</h3>
                <p>หลักการในการแปลงจำนวนคละให้เป็นเศษส่วนเกินนั้นง่ายมาก เพียงแค่คุณใช้สูตรสั้นๆ ดังต่อไปนี้:</p>
                <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold text-lg my-4">
                    ตัวเศษใหม่ = (จำนวนเต็ม × ตัวส่วน) + ตัวเศษเดิม
                </div>
                <p>หลังจากได้ตัวเศษตัวใหม่แล้ว ให้นำมาวางไว้เหนือตัวส่วนเดิม เพียงเท่านี้คุณก็จะได้เศษส่วนเกินที่ถูกต้องพร้อมนำไปใช้งานต่อได้อย่างสบายใจ</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคิดทีละขั้นตอน</h3>
                <p>สมมติว่าเราต้องการแปลงจำนวนคละ <strong>3 2/5 (สามเศษสองส่วนห้า)</strong> ให้เป็นเศษส่วนเกิน</p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>ระบุส่วนประกอบ:</strong> จำนวนเต็มคือ 3, ตัวเศษคือ 2, และตัวส่วนคือ 5</li>
                    <li><strong>คูณจำนวนเต็มกับตัวส่วน:</strong> นำ 3 ไปคูณ 5 จะได้ผลลัพธ์เป็น 15 (3 × 5 = 15)</li>
                    <li><strong>บวกตัวเศษเข้าไป:</strong> นำผลลัพธ์ที่ได้ไปบวกกับตัวเศษเดิม คือ 15 + 2 = 17</li>
                    <li><strong>เขียนในรูปเศษส่วน:</strong> นำผลลัพธ์สุดท้ายเป็นตัวเศษใหม่ ส่วนตัวส่วนยังคงเดิมเป็น 5 คำตอบที่ได้คือ <strong>17/5</strong></li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เครื่องมือของเราช่วยคุณได้อย่างไร?</h3>
                <p>แม้ว่าสูตรในการแปลงจะดูเหมือนง่าย แต่หลายครั้งเมื่อต้องเผชิญกับตัวเลขที่เยอะหรือมีความซับซ้อน เช่น การคำนวณทางบัญชี การคำนวณปริมาณสารเคมี หรือแม้กระทั่งการทำข้อสอบคณิตศาสตร์แบบเร่งด่วน การคำนวณด้วยตนเองอาจทำให้เกิดความผิดพลาดจากความสะเพร่า (Human Error) เครื่องมือแปลงจำนวนคละเป็นเศษส่วนเกินบนเว็บไซต์ของเรานี้ จะทำให้กระบวนการทั้งหมดจบลงในพริบตาเดียว เพียงแค่กรอกจำนวนเต็ม ตัวเศษ และตัวส่วนลงในช่องที่กำหนด ระบบจะทำการประมวลผลทันทีและแสดงคำตอบที่ถูกต้องแม่นยำ พร้อมนำไปใช้ในการเรียนการสอนหรือต่อยอดในการคำนวณขั้นสูงต่อไปได้เลย ไม่ว่าจะเป็นโจทย์คณิตศาสตร์ที่ซับซ้อนแค่ไหน เครื่องมือของเราก็ช่วยลดเวลาคิดเลขของคุณให้สั้นลงได้อย่างแน่นอน</p>
            </article>
        </div>
    );
}
