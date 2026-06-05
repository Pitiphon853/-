import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function DecimalToFraction({ lang }: any) {
    const [decimal, setDecimal] = useState<string>('0.75');
    const [fraction, setFraction] = useState<{ n: number; d: number } | null>({ n: 3, d: 4 });
    const [error, setError] = useState<string>('');

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculate = (val: string) => {
        const num = parseFloat(val);
        if (isNaN(num)) {
            setFraction(null);
            setError('');
            return;
        }

        const isNegative = num < 0;
        const absNum = Math.abs(num);
        
        // Handle decimals
        const strVal = absNum.toString();
        let decimals = 0;
        if (strVal.includes('.')) {
            decimals = strVal.split('.')[1].length;
        }

        // Limit to reasonable number of decimals to avoid overflow
        if (decimals > 10) {
            setError('ทศนิยมยาวเกินไป อาจทำให้ผลลัพธ์คลาดเคลื่อน');
            setFraction(null);
            return;
        }

        setError('');
        const denominator = Math.pow(10, decimals);
        const numerator = Math.round(absNum * denominator);
        
        const divisor = gcd(numerator, denominator);
        setFraction({
            n: (isNegative ? -1 : 1) * (numerator / divisor),
            d: denominator / divisor
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDecimal(e.target.value);
        calculate(e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-indigo-600" />
                เครื่องมือแปลงทศนิยมเป็นเศษส่วน
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-50 p-6 rounded-xl flex flex-col justify-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">ตัวเลขทศนิยม (Decimal)</label>
                    <input
                        type="number"
                        step="any"
                        value={decimal}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                        placeholder="เช่น 0.75"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl flex flex-col justify-center items-center text-center space-y-4 min-h-[160px]">
                    <h2 className="text-lg font-semibold text-indigo-900">ผลลัพธ์ (เศษส่วนอย่างต่ำ)</h2>
                    {fraction ? (
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-3xl md:text-4xl font-bold text-indigo-600 px-4 pb-2 border-b-4 border-indigo-600">
                                {fraction.n}
                            </span>
                            <span className="text-3xl md:text-4xl font-bold text-indigo-600 px-4 pt-2">
                                {fraction.d}
                            </span>
                        </div>
                    ) : (
                        <div className="text-2xl text-indigo-400 font-medium">
                            -
                        </div>
                    )}
                </div>
            </div>

            <article className="prose prose-indigo max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีการแปลงทศนิยมเป็นเศษส่วน (Decimal to Fraction)</h2>
                
                <p>การแปลงทศนิยมเป็นเศษส่วนเป็นกระบวนการทางคณิตศาสตร์ที่มีประโยชน์อย่างมากในการทำให้ตัวเลขที่อยู่ในรูปทศนิยมกลายเป็นตัวเลขที่อ่านและเข้าใจได้ง่ายขึ้นในรูปแบบสัดส่วน บางครั้งการใช้ทศนิยมในการบวก ลบ คูณ หาร อาจทำให้เกิดการปัดเศษและส่งผลให้ค่าคลาดเคลื่อน การทำให้อยู่ในรูปเศษส่วนอย่างต่ำจึงเป็นทางออกที่ดีที่สุดในการรักษาความแม่นยำของตัวเลข</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ขั้นตอนการแปลงทศนิยมเป็นเศษส่วน</h3>
                <p>ในการแปลงทศนิยมให้กลายเป็นเศษส่วนอย่างต่ำ เราสามารถทำได้ตามขั้นตอนดังต่อไปนี้:</p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>เขียนทศนิยมเป็นเศษส่วนที่มีส่วนเป็น 1</strong>: ตัวอย่างเช่น หากมีทศนิยม 0.75 ให้เขียนเป็น 0.75 / 1</li>
                    <li><strong>คูณด้วย 10 ตามจำนวนตำแหน่งทศนิยม</strong>: หากเป็นทศนิยม 1 ตำแหน่ง ให้คูณด้วย 10 ทั้งเศษและส่วน หากเป็นทศนิยม 2 ตำแหน่ง ให้คูณด้วย 100 เป็นต้น สำหรับ 0.75 มีทศนิยม 2 ตำแหน่ง ให้คูณด้วย 100 จะได้ (0.75 × 100) / (1 × 100) = 75 / 100</li>
                    <li><strong>ทอนให้เป็นเศษส่วนอย่างต่ำ</strong>: หาตัวหารร่วมมาก (ห.ร.ม. หรือ GCD) ของตัวเศษและตัวส่วน แล้วนำไปหารทั้งคู่ สำหรับ 75 และ 100 ห.ร.ม. คือ 25 เมื่อนำ 25 ไปหาร จะได้ (75 ÷ 25) / (100 ÷ 25) = 3 / 4</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการแปลงทศนิยมที่พบได้บ่อย</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>0.5 = 5/10 = 1/2</li>
                    <li>0.25 = 25/100 = 1/4</li>
                    <li>0.2 = 20/100 = 1/5</li>
                    <li>0.125 = 125/1000 = 1/8</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความสำคัญและประโยชน์</h3>
                <p>การทำความเข้าใจความสัมพันธ์ระหว่างทศนิยมและเศษส่วนช่วยให้เราพัฒนาทักษะเชิงตรรกะในคณิตศาสตร์ได้เป็นอย่างดี ในบางสายอาชีพ เช่น วิศวกรรม งานช่าง งานก่อสร้าง หรืองานออกแบบ การวัดสัดส่วนต่างๆ มักนิยมใช้หน่วยที่เป็นเศษส่วน (เช่น นิ้วเศษส่วน) เครื่องมือแปลงทศนิยมเป็นเศษส่วนที่เราเตรียมไว้ให้นี้ จะทำงานโดยอัตโนมัติเมื่อคุณป้อนตัวเลข มันจะคำนวณหาเศษส่วนที่เทียบเท่า พร้อมกับทอนให้เป็นเศษส่วนอย่างต่ำโดยใช้หลักการหา ห.ร.ม. ทำให้คุณได้ผลลัพธ์ที่ถูกต้องและนำไปใช้งานต่อได้ทันที เครื่องมือนี้จึงเหมาะสำหรับทั้งนักเรียน นิสิต นักศึกษา ตลอดจนผู้ปกครองที่ต้องการตรวจการบ้านบุตรหลาน หรือใครก็ตามที่ต้องการใช้ตัวเลขเศษส่วนเพื่อความแม่นยำสูงสุดในงานของตนเองอย่างรวดเร็วและไม่มีข้อผิดพลาด</p>
            </article>
        </div>
    );
}
