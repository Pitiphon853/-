import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function FractionToDecimal({ lang }: any) {
    const [numerator, setNumerator] = useState<string>('3');
    const [denominator, setDenominator] = useState<string>('4');
    const [result, setResult] = useState<string>('0.75');

    const calculate = (n: string, d: string) => {
        const num = parseFloat(n);
        const den = parseFloat(d);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
            setResult((num / den).toString());
        } else if (den === 0) {
            setResult('หาค่าไม่ได้ (ส่วนเป็นศูนย์)');
        } else {
            setResult('');
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
                <Calculator className="w-8 h-8 text-blue-600" />
                เครื่องมือแปลงเศษส่วนเป็นทศนิยม
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ตัวเศษ (Numerator)</label>
                        <input
                            type="number"
                            value={numerator}
                            onChange={handleNumeratorChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="เช่น 3"
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
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="เช่น 4"
                        />
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl flex flex-col justify-center items-center text-center space-y-4">
                    <h2 className="text-lg font-semibold text-blue-900">ผลลัพธ์ (ทศนิยม)</h2>
                    <div className="text-4xl md:text-5xl font-bold text-blue-600 break-all">
                        {result || '-'}
                    </div>
                    {result && !isNaN(Number(result)) && (
                        <p className="text-sm text-blue-700 mt-4">
                            วิธีคิด: {numerator} ÷ {denominator} = {result}
                        </p>
                    )}
                </div>
            </div>

            <article className="prose prose-blue max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การแปลงเศษส่วนเป็นทศนิยม (Fraction to Decimal)</h2>
                
                <p>การแปลงเศษส่วนให้เป็นทศนิยมเป็นทักษะทางคณิตศาสตร์พื้นฐานที่มีความสำคัญอย่างมากในชีวิตประจำวัน ไม่ว่าจะเป็นการคำนวณส่วนผสมในการทำอาหาร การแบ่งส่วนของเงิน การวัดระยะทาง หรือแม้กระทั่งการวิเคราะห์ข้อมูลทางสถิติ หลายครั้งที่เรามักจะพบเห็นตัวเลขในรูปแบบเศษส่วน แต่การนำไปคำนวณต่อหรือนำไปเปรียบเทียบมักจะทำได้ง่ายกว่าหากเราแปลงให้อยู่ในรูปทศนิยม เครื่องมือแปลงเศษส่วนเป็นทศนิยมออนไลน์ของเราถูกออกแบบมาให้คุณสามารถใช้งานได้อย่างสะดวก รวดเร็ว และแม่นยำ</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เศษส่วนคืออะไร?</h3>
                <p>เศษส่วน (Fraction) คือการแสดงตัวเลขที่แสดงถึงส่วนหนึ่งของทั้งหมด โดยประกอบด้วยสองส่วนสำคัญคือ:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>ตัวเศษ (Numerator)</strong>: ตัวเลขที่อยู่ด้านบนของเส้นแบ่ง แสดงถึงจำนวนส่วนที่เราสนใจ</li>
                    <li><strong>ตัวส่วน (Denominator)</strong>: ตัวเลขที่อยู่ด้านล่างของเส้นแบ่ง แสดงถึงจำนวนส่วนทั้งหมดที่ถูกแบ่งออกเท่าๆ กัน</li>
                </ul>
                <p>ตัวอย่างเช่น เศษส่วน 3/4 หมายถึง เรามี 3 ส่วน จากทั้งหมดที่ถูกแบ่งออกเป็น 4 ส่วนเท่าๆ กัน</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการแปลงเศษส่วนเป็นทศนิยม</h3>
                <p>หลักการง่ายๆ ในการแปลงเศษส่วนให้เป็นทศนิยมคือ <strong>การหารตัวเศษด้วยตัวส่วน</strong> ตัวอย่างเช่น:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>เศษส่วน 1/2 แปลงเป็นทศนิยมโดยการนำ 1 หารด้วย 2 จะได้ 0.5</li>
                    <li>เศษส่วน 3/4 แปลงเป็นทศนิยมโดยการนำ 3 หารด้วย 4 จะได้ 0.75</li>
                    <li>เศษส่วน 5/8 แปลงเป็นทศนิยมโดยการนำ 5 หารด้วย 8 จะได้ 0.625</li>
                    <li>เศษส่วน 1/3 แปลงเป็นทศนิยมโดยการนำ 1 หารด้วย 3 จะได้ 0.333... (ทศนิยมซ้ำ)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงต้องแปลงเป็นทศนิยม?</h3>
                <p>การใช้งานทศนิยมในชีวิตประจำวันมีความแพร่หลายมากกว่าการใช้เศษส่วนในบางกรณี เช่น เครื่องคิดเลขส่วนใหญ่มักแสดงผลลัพธ์เป็นทศนิยม การคำนวณเกี่ยวกับเงินตรา (เช่น 0.50 บาท หรือ 50 สตางค์) การแปลงเศษส่วนเป็นทศนิยมจึงช่วยให้เราสื่อสารและทำความเข้าใจปริมาณต่างๆ ได้อย่างเป็นมาตรฐานเดียวกัน ไม่ต้องมาพะวงกับการบวกลบคูณหารเศษส่วนที่ต้องมานั่งหา ค.ร.น. ให้เสียเวลา</p>

                <p className="mt-4">เครื่องมือแปลงเศษส่วนเป็นทศนิยมที่เราพัฒนาขึ้นมานี้ มุ่งหวังที่จะช่วยให้ผู้ใช้งานทุกเพศทุกวัย ไม่ว่าจะเป็นนักเรียนที่ต้องการตรวจสอบคำตอบการบ้านคณิตศาสตร์ หรือบุคคลทั่วไปที่ต้องใช้งานคำนวณเบื้องต้น สามารถหาคำตอบได้อย่างถูกต้องภายในเสี้ยววินาที เพียงแค่ใส่ตัวเศษและตัวส่วน ระบบจะแสดงผลลัพธ์เป็นตัวเลขทศนิยมให้ทันที พร้อมวิธีการคิดที่เข้าใจง่าย นอกจากนี้ หากคุณต้องการใช้งานเครื่องมือทางคณิตศาสตร์อื่นๆ เว็บไซต์ของเรายังมีเครื่องมือคำนวณที่ครบครันให้เลือกใช้งานฟรีตลอด 24 ชั่วโมง</p>
            </article>
        </div>
    );
}
