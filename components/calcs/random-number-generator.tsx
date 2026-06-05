import React, { useState } from 'react';
import { Calculator, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';

export default function RandomNumberGenerator({ lang }: any) {
    const [min, setMin] = useState<string>('1');
    const [max, setMax] = useState<string>('100');
    const [count, setCount] = useState<string>('1');
    const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
    const [sortAsc, setSortAsc] = useState<boolean>(false);
    const [results, setResults] = useState<number[]>([42]);
    const [copied, setCopied] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const generateNumbers = () => {
        const minVal = parseInt(min, 10);
        const maxVal = parseInt(max, 10);
        const countVal = parseInt(count, 10);

        if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
            setError('กรุณากรอกตัวเลขทั้งหมดให้ถูกต้อง');
            return;
        }

        if (minVal > maxVal) {
            setError('ค่าต่ำสุด (Min) ต้องน้อยกว่าหรือเท่ากับค่าสูงสุด (Max)');
            return;
        }

        if (countVal <= 0) {
            setError('จำนวนตัวเลขที่ต้องการสุ่มต้องมีค่ามากกว่า 0');
            return;
        }

        if (countVal > 1000) {
            setError('เพื่อประสิทธิภาพการแสดงผล กรุณาสุ่มตัวเลขครั้งละไม่เกิน 1,000 ตัว');
            return;
        }

        const range = maxVal - minVal + 1;
        if (!allowDuplicates && countVal > range) {
            setError(`ไม่สามารถสุ่มตัวเลขแบบไม่ซ้ำจำนวน ${countVal} ตัวจากช่วง ${minVal} ถึง ${maxVal} ได้ (มีตัวเลือกทั้งหมดเพียง ${range} ตัวเท่านั้น)`);
            return;
        }

        setError('');
        const nums: number[] = [];

        if (!allowDuplicates) {
            const uniqueSet = new Set<number>();
            while (uniqueSet.size < countVal) {
                const rand = Math.floor(Math.random() * range) + minVal;
                uniqueSet.add(rand);
            }
            nums.push(...Array.from(uniqueSet));
        } else {
            for (let i = 0; i < countVal; i++) {
                const rand = Math.floor(Math.random() * range) + minVal;
                nums.push(rand);
            }
        }

        if (sortAsc) {
            nums.sort((a, b) => a - b);
        }

        setResults(nums);
        setCopied(false);
    };

    const handleCopy = () => {
        if (results.length === 0) return;
        const text = results.join(', ');
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleReset = () => {
        setMin('1');
        setMax('100');
        setCount('1');
        setAllowDuplicates(false);
        setSortAsc(false);
        setResults([42]);
        setError('');
        setCopied(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-600" />
                เครื่องมือสุ่มตัวเลข (Random Number Generator)
            </h1>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-amber-800 text-sm">
                <strong>เครื่องมือสุ่มตัวเลข:</strong> สามารถระบุขอบเขตต่ำสุด-สูงสุด กำหนดจำนวนตัวเลขที่ต้องการสุ่ม เลือกว่าจะให้มีตัวเลขซ้ำกันได้หรือไม่ และจัดเรียงลำดับจากน้อยไปมากได้อย่างสะดวกสบาย
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">กำหนดเงื่อนไขการสุ่ม</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ค่าต่ำสุด (Min)
                                </label>
                                <input
                                    type="number"
                                    step="1"
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-center font-semibold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ค่าสูงสุด (Max)
                                </label>
                                <input
                                    type="number"
                                    step="1"
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-center font-semibold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                จำนวนตัวเลขที่ต้องการสุ่ม (Count)
                            </label>
                            <input
                                type="number"
                                step="1"
                                min="1"
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-center font-semibold"
                            />
                        </div>

                        {/* Options */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={!allowDuplicates}
                                    onChange={(e) => setAllowDuplicates(!e.target.checked)}
                                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                                />
                                ห้ามสุ่มได้ตัวเลขซ้ำกัน (Unique Values)
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={sortAsc}
                                    onChange={(e) => setSortAsc(e.target.checked)}
                                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                                />
                                เรียงลำดับจากน้อยไปมาก (Sort Ascending)
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button
                            onClick={handleReset}
                            className="py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            <RefreshCw className="w-4 h-4" /> รีเซ็ตเงื่อนไข
                        </button>
                        <button
                            onClick={generateNumbers}
                            className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                        >
                            <Sparkles className="w-4 h-4" /> สุ่มตัวเลข
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="flex flex-col justify-between bg-amber-50 p-6 rounded-xl border border-amber-100 min-h-[300px]">
                    <div>
                        <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-4">
                            <h2 className="text-lg font-semibold text-amber-950">
                                ผลลัพธ์จากการสุ่ม ({results.length} จำนวน)
                            </h2>
                            {results.length > 0 && (
                                <button
                                    onClick={handleCopy}
                                    className="p-2 bg-white text-amber-700 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors flex items-center gap-1 text-xs font-semibold"
                                    title="คัดลอกตัวเลขทั้งหมด"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'คัดลอกแล้ว!' : 'คัดลอกผลลัพธ์'}
                                </button>
                            )}
                        </div>

                        {results.length > 0 ? (
                            <div className="bg-white p-4 rounded-lg border border-amber-200 max-h-[180px] overflow-y-auto shadow-inner flex flex-wrap gap-2 justify-center items-center">
                                {results.map((n, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 border border-amber-200 text-amber-900 rounded-full font-bold text-lg font-mono shadow-sm transition-all duration-300 transform scale-100 hover:scale-105"
                                    >
                                        {n}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-10">กดปุ่มสุ่มตัวเลขเพื่อแสดงผลลัพธ์</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-amber-800 text-center font-medium">
                        ตัวเลขที่สุ่มจะอยู่ระหว่าง {min} ถึง {max} (แบบปิด [Min, Max])
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-amber max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    เครื่องมือสุ่มตัวเลข (Random Number Generator) คืออะไร? ความสุ่มแท้กับความสุ่มเทียมในระบบคอมพิวเตอร์
                </h2>
                <p>
                    <strong>การสุ่มตัวเลข (Random Number Generation)</strong> คือกระบวนการคัดเลือกตัวเลขอย่างใดอย่างหนึ่งหรือหลายจำนวนจากกลุ่มตัวเลขที่กำหนด โดยไม่สามารถพยากรณ์หรือคาดเดาล่วงหน้าได้ว่าตัวเลขถัดไปจะเป็นเลขอะไร ในชีวิตประจำวันเราคุ้นเคยกับการสุ่มผ่านการโยนเหรียญหัว-ก้อย, การทอยลูกเต๋า, หรือการสับกองการ์ดเกม แต่ในยุคดิจิทัล การสุ่มตัวเลขจะทำผ่านโปรแกรมคอมพิวเตอร์เพื่อความถูกต้อง รวดเร็ว และรองรับข้อมูลขนาดใหญ่
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความต่างระหว่างความสุ่มแท้ (TRNG) และความสุ่มเทียม (PRNG)</h3>
                <p>
                    ในวิทยาการคอมพิวเตอร์ การสุ่มจะแบ่งออกเป็น 2 ประเภทหลักตามแหล่งที่มาและวิธีการสร้างเลขสุ่ม:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>
                        <strong>เครื่องสุ่มตัวเลขเทียม (Pseudo-Random Number Generator - PRNG):</strong> เป็นอัลกอริทึมที่ใช้สมการคณิตศาสตร์เพื่อคำนวณและจำลองชุดตัวเลขที่ดูเหมือนสุ่ม ตัวเลขเหล่านี้จะเริ่มต้นจากค่าตั้งต้นตัวหนึ่งที่เรียกว่า <em>ค่าเมล็ดพันธุ์ (Seed)</em> ข้อดีของ PRNG คือการประมวลผลที่รวดเร็วอย่างยิ่งและสามารถสร้างเลขสุ่มซ้ำรูปแบบเดิมได้หากใช้ Seed ตัวเดิม ซึ่งมีประโยชน์มากในการทดสอบโปรแกรม ฟังก์ชัน <code>Math.random()</code> ในภาษา JavaScript ที่เครื่องมือนี้ใช้งานก็จัดอยู่ในกลุ่ม PRNG เช่นกัน
                    </li>
                    <li>
                        <strong>เครื่องสุ่มตัวเลขแท้ (True Random Number Generator - TRNG):</strong> เป็นระบบสุ่มที่เก็บข้อมูลจากปรากฏการณ์ทางฟิสิกส์ธรรมชาติที่คาดเดาไม่ได้ เช่น สัญญาณรบกวนในบรรยากาศ (Atmospheric Noise) หรือการสลายตัวของสารกัมมันตรังสี TRNG มีความปลอดภัยสูงที่สุดและไม่สามารถคาดเดารูปแบบล่วงหน้าได้เลย แต่มักจะทำงานได้ช้ากว่าและต้องการอุปกรณ์เฉพาะทาง
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้งานการสุ่มตัวเลขในโลกแห่งความเป็นจริง</h3>
                <p>
                    การสุ่มตัวเลขมีบทบาทสำคัญและถูกนำไปใช้ประโยชน์ในหลากหลายมิติรอบตัวเรา:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                        <strong>การรักษาความปลอดภัยทางไซเบอร์ (Cryptography):</strong> การเข้ารหัสข้อมูล ข้อมูลส่วนตัว รหัสผ่านแบบใช้ครั้งเดียว (OTP) และเหรียญดิจิทัลจำเป็นต้องพึ่งพาระบบสุ่มระดับความปลอดภัยสูงเพื่อป้องกันไม่ให้แฮกเกอร์คาดเดากุญแจถอดรหัสได้
                    </li>
                    <li>
                        <strong>การเขียนเกมคอมพิวเตอร์ (Gaming):</strong> ตั้งแต่ความเสียหายของการโจมตีของตัวละคร (Critical Hit), การสุ่มแจกไอเทม (Loot Boxes), ไปจนถึงการจัดสำรับไพ่ในบอร์ดเกมออนไลน์ ล้วนใช้อัลกอริทึมสุ่มเพื่อเพิ่มความสนุกและความท้าทาย
                    </li>
                    <li>
                        <strong>การเลือกตัวอย่างทางสถิติ (Statistical Sampling):</strong> ในการวิจัยตลาด การเลือกกลุ่มประชากรตัวอย่างเพื่อทดสอบระดับความพึงพอใจ หรือการสุ่มหาผู้โชคดีสำหรับกิจกรรมส่งเสริมการขาย (Lucky Draws) เพื่อรับประกันความเท่าเทียมและเที่ยงธรรมสำหรับผู้ร่วมกิจกรรมทุกคน
                    </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำแนะนำการใช้งานเครื่องมือ</h3>
                <p>
                    โปรแกรม Random Number Generator นี้สามารถปรับแต่งช่วงขอบเขตต่ำสุด-สูงสุดที่ต้องการสุ่มได้ตามอิสระ รวมถึงสุ่มตัวเลขเป็นจำนวนมากพร้อมกันในคลิกเดียว เหมาะอย่างยิ่งสำหรับผู้ควบคุมการประมูลสินค้า พ่อค้าแม่ค้าออนไลน์ที่จัดสุ่มกิจกรรมแจกรางวัลให้แฟนเพจ หรือคุณครูที่สุ่มเลขที่ของนักเรียนเพื่อตอบคำถามในชั้นเรียน สามารถกดสุ่มใหม่ได้ไม่จำกัดและคัดลอกผลลัพธ์ลงคลิปบอร์ดเพื่อนำไปใช้ส่งต่อหรือรายงานผลได้อย่างรวดเร็ว
                </p>
            </article>
        </div>
    );
}
