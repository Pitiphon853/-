import React, { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function PrimeNumberChecker({ lang }: any) {
    const [numberInput, setNumberInput] = useState<string>('97');
    const [result, setResult] = useState<{
        isPrime: boolean;
        reason: string;
        checked: boolean;
        next?: number;
        prev?: number | null;
    } | null>({
        isPrime: true,
        reason: 'เนื่องจากมีเพียง 1 และ 97 เท่านั้นที่หารมันลงตัว',
        checked: true,
        next: 101,
        prev: 89
    });
    const [error, setError] = useState<string>('');

    const checkIsPrime = (num: number): { isPrime: boolean; reason: string } => {
        if (num <= 1) {
            return { isPrime: false, reason: 'จำนวนเฉพาะต้องเป็นจำนวนเต็มบวกที่มีค่ามากกว่า 1' };
        }
        if (!Number.isInteger(num)) {
            return { isPrime: false, reason: 'จำนวนเฉพาะจะต้องเป็นจำนวนเต็ม (Integer) เท่านั้น' };
        }
        if (num === 2) return { isPrime: true, reason: 'เนื่องจาก 2 เป็นจำนวนเฉพาะที่เป็นเลขคู่เพียงตัวเดียว' };
        if (num === 3) return { isPrime: true, reason: 'เนื่องจากมีเพียง 1 และ 3 เท่านั้นที่หารลงตัว' };
        if (num % 2 === 0) {
            return { isPrime: false, reason: `หารด้วย 2 ลงตัว (2 &times; ${num / 2} = ${num})` };
        }
        if (num % 3 === 0) {
            return { isPrime: false, reason: `หารด้วย 3 ลงตัว (3 &times; ${num / 3} = ${num})` };
        }

        const limit = Math.sqrt(num);
        for (let i = 5; i <= limit; i += 6) {
            if (num % i === 0) {
                return { isPrime: false, reason: `หารด้วย ${i} ลงตัว (${i} &times; ${num / i} = ${num})` };
            }
            if (num % (i + 2) === 0) {
                const factor = i + 2;
                return { isPrime: false, reason: `หารด้วย ${factor} ลงตัว (${factor} &times; ${num / factor} = ${num})` };
            }
        }

        return { isPrime: true, reason: `เนื่องจากไม่มีจำนวนเต็มบวกใดๆ (นอกจาก 1 และตัวมันเอง) ที่อยู่ระหว่าง 2 ถึง ${Math.floor(limit)} หารมันได้ลงตัว` };
    };

    const getNextPrime = (start: number): number => {
        let n = Math.floor(start) + 1;
        if (n <= 2) return 2;
        while (true) {
            if (checkIsPrime(n).isPrime) return n;
            n++;
        }
    };

    const getPrevPrime = (start: number): number | null => {
        let n = Math.floor(start) - 1;
        if (n < 2) return null;
        while (n >= 2) {
            if (checkIsPrime(n).isPrime) return n;
            n--;
        }
        return null;
    };

    const handleCheck = (val: string) => {
        if (val === '') {
            setResult(null);
            setError('');
            return;
        }

        const num = parseFloat(val);
        if (isNaN(num)) {
            setResult(null);
            setError('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }

        if (num > 1000000000000) {
            setResult(null);
            setError('เพื่อความเร็วในการประมวลผล กรุณากรอกตัวเลขไม่เกิน 1,000,000,000,000 (หนึ่งล้านล้าน)');
            return;
        }

        if (num < 0) {
            setResult(null);
            setError('จำนวนเฉพาะต้องเป็นจำนวนเต็มบวกที่มากกว่า 1');
            return;
        }

        setError('');
        const checkResult = checkIsPrime(num);
        const nextP = getNextPrime(num);
        const prevP = getPrevPrime(num);

        setResult({
            isPrime: checkResult.isPrime,
            reason: checkResult.reason,
            checked: true,
            next: nextP,
            prev: prevP
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNumberInput(val);
        handleCheck(val);
    };

    const handleReset = () => {
        setNumberInput('97');
        setResult({
            isPrime: true,
            reason: 'เนื่องจากมีเพียง 1 และ 97 เท่านั้นที่หารมันลงตัว',
            checked: true,
            next: 101,
            prev: 89
        });
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-rose-600" />
                เครื่องมือตรวจสอบจำนวนเฉพาะ (Prime Number Checker)
            </h1>

            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6 text-rose-800 text-sm">
                <strong>จำนวนเฉพาะ (Prime Number):</strong> คือจำนวนเต็มที่มีค่ามากกว่า 1 และไม่มีตัวหารลงตัวนอกจากเลข 1 และตัวมันเองเท่านั้น เช่น 2, 3, 5, 7, 11...
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">ป้อนตัวเลข</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ตัวเลขที่ต้องการตรวจสอบ (จำนวนเต็มบวก)
                        </label>
                        <input
                            type="number"
                            step="1"
                            value={numberInput}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-xl font-bold"
                            placeholder="เช่น 97"
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
                <div className="flex flex-col justify-between bg-rose-50 p-6 rounded-xl border border-rose-100 min-h-[300px]">
                    <div>
                        <h2 className="text-lg font-semibold text-rose-950 mb-4 border-b border-rose-200 pb-2">
                            ผลลัพธ์การตรวจสอบ
                        </h2>
                        {result ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
                                    {result.isPrime ? (
                                        <>
                                            <CheckCircle2 className="w-12 h-12 text-emerald-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-2xl font-bold text-emerald-700">
                                                    {numberInput} เป็นจำนวนเฉพาะ
                                                </p>
                                                <p className="text-xs text-emerald-600 font-medium">Prime Number</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-12 h-12 text-rose-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-2xl font-bold text-rose-700">
                                                    {numberInput} ไม่เป็นจำนวนเฉพาะ
                                                </p>
                                                <p className="text-xs text-rose-600 font-medium">Composite Number / อื่นๆ</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="text-sm text-rose-900 space-y-2">
                                    <p><strong>เหตุผล:</strong> {result.reason}</p>
                                    
                                    {(result.next !== undefined || result.prev !== undefined) && (
                                        <div className="bg-white p-3 rounded border border-rose-100 mt-2 space-y-1 font-mono text-xs">
                                            {result.prev && <p>&bull; จำนวนเฉพาะก่อนหน้า: {result.prev}</p>}
                                            {result.next && <p>&bull; จำนวนเฉพาะถัดไป: {result.next}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">กรุณากรอกตัวเลขเพื่อทำการตรวจสอบ</p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-rose-200 text-xs text-rose-800">
                        * จำนวนเฉพาะต้องมีตัวหารลงตัวเพียง 2 ตัวเท่านั้น คือ 1 และตัวมันเอง ตัวเลข 1 และเลข 0 ไม่จัดเป็นจำนวนเฉพาะ
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-rose max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    จำนวนเฉพาะ (Prime Number) คืออะไร? ประวัติศาสตร์และความสำคัญทางคณิตศาสตร์
                </h2>
                <p>
                    ในทางคณิตศาสตร์ <strong>จำนวนเฉพาะ (Prime Number)</strong> คือ จำนวนเต็มบวกที่มีค่ามากกว่า 1 โดยที่ไม่มีตัวหารใดๆ ลงตัวนอกจากตัวเลข 1 และตัวมันเอง ตัวเลขที่ตรงข้ามกับจำนวนเฉพาะ เรียกว่า <em>จำนวนประกอบ (Composite Number)</em> ซึ่งเป็นตัวเลขที่สามารถเขียนให้อยู่ในรูปของการคูณกันของสองจำนวนที่มากกว่า 1 ได้
                </p>
                <p>
                    ตัวอย่างเช่น เลข 5 เป็นจำนวนเฉพาะ เนื่องจากไม่มีจำนวนใดหารมันลงตัวนอกจาก 1 และ 5 ในทางตรงกันข้าม เลข 6 ไม่ใช่จำนวนเฉพาะ เนื่องจากสามารถนำ 2 และ 3 ไปหารได้ลงตัว (2 &times; 3 = 6)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไม &ldquo;เลข 1&rdquo; จึงไม่เป็นจำนวนเฉพาะ?</h3>
                <p>
                    หลายคนมักสงสัยและคิดว่าเลข 1 ควรจัดอยู่ในกลุ่มจำนวนเฉพาะ เพราะสามารถหารด้วย 1 และตัวมันเองได้ แต่ในทางคณิตศาสตร์สากลได้กำหนดไว้ให้ <strong>เลข 1 ไม่เป็นจำนวนเฉพาะ</strong> เนื่องจากทฤษฎีบทมูลฐานของเลขคณิต (Fundamental Theorem of Arithmetic) ระบุไว้ว่า:
                </p>
                <blockquote>
                    &ldquo;จำนวนเต็มบวกทุกตัวที่มีค่ามากกว่า 1 สามารถเขียนแทนในรูปของการคูณกันของตัวประกอบเฉพาะได้เพียงรูปแบบเดียวเท่านั้น (ไม่นับรวมการเรียงลำดับ)&rdquo;
                </blockquote>
                <p>
                    หากเรายอมรับให้เลข 1 เป็นจำนวนเฉพาะ ความเป็นเอกลักษณ์ของการแยกตัวประกอบนี้จะสูญเสียไปทันที เพราะเราจะสามารถคูณ 1 เข้าไปได้ไม่สิ้นสุด (เช่น 6 = 2 &times; 3 = 2 &times; 3 &times; 1 = 2 &times; 3 &times; 1 &times; 1 ...)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">วิธีการตรวจสอบจำนวนเฉพาะ</h3>
                <p>
                    การตรวจหาว่าตัวเลขใดๆ เป็นจำนวนเฉพาะหรือไม่ สามารถทำได้หลายวิธี ตั้งแต่ระดับง่ายไปจนถึงระดับสูง:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>
                        <strong>การทดลองหาร (Trial Division):</strong> เป็นวิธีพื้นฐานที่สุดโดยทดลองนำตัวเลขตั้งแต่ 2 ไปจนถึง $\sqrt{"{"}N{"}"}$ มาทดลองหารค่า N หากไม่มีตัวเลขใดหารลงตัว แสดงว่า N เป็นจำนวนเฉพาะ การตรวจสอบทำถึงเพียงสแควร์รูทของ N เนื่องจากตัวประกอบใดๆ ที่เกินสแควร์รูทของ N จะต้องจับคู่คูณกับตัวประกอบที่มีค่าน้อยกว่าสแควร์รูทของ N เสมอ
                    </li>
                    <li>
                        <strong>ตะแกรงของเอราทอสเทนีส (Sieve of Eratosthenes):</strong> เป็นวิธีโบราณที่ใช้วิธีตัดจำนวนที่เป็นพหุคูณของจำนวนเฉพาะออกไปเรื่อยๆ วิธีนี้เหมาะสำหรับการหาจำนวนเฉพาะทั้งหมดในช่วงตัวเลขขนาดเล็กถึงปานกลางอย่างรวดเร็ว
                    </li>
                    <li>
                        <strong>การทดสอบความเป็นจำนวนเฉพาะแบบความน่าจะเป็น (Probabilistic Primality Tests):</strong> เช่น Miller-Rabin algorithm หรือ Fermat Primality Test นิยมใช้ในการสุ่มตรวจหาจำนวนเฉพาะที่มีขนาดใหญ่เป็นพิเศษ (หลักหลายร้อยหลัก) ในระบบความปลอดภัยคอมพิวเตอร์
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้งานในยุคปัจจุบัน</h3>
                <p>
                    ในอดีต จำนวนเฉพาะถูกมองว่าเป็นเพียงเรื่องของคณิตศาสตร์บริสุทธิ์ (Pure Mathematics) แต่ในปัจจุบัน จำนวนเฉพาะกลายเป็นหัวใจสำคัญของ <strong>การเข้ารหัสลับ (Cryptography)</strong> และความปลอดภัยทางคอมพิวเตอร์ที่พวกเราใช้ทุกวัน เช่น โปรโตคอล HTTPS, การทำธุรกรรมทางการเงินออนไลน์ และการถอดรหัสสาธารณะอย่าง RSA ซึ่งทำงานบนพื้นฐานการนำตัวประกอบเฉพาะขนาดใหญ่ 2 ตัวมาคูณกัน การหาตัวประกอบของเลขผลคูณขนาดใหญ่ทำได้ยากมากในคอมพิวเตอร์ทั่วไป ทำให้จำนวนเฉพาะเป็นดั่งกุญแจสำคัญในการรักษาความลับและความปลอดภัยในโลกอินเทอร์เน็ต
                </p>
            </article>
        </div>
    );
}
