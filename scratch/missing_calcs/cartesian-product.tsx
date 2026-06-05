import React, { useState } from 'react';
import { Calculator, RefreshCw, Layers } from 'lucide-react';

export default function CartesianProduct({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');

    // States for Sets A and B
    const [setAInput, setSetAInput] = useState<string>('a, b, c');
    const [setBInput, setSetBInput] = useState<string>('1, 2, 3');

    const handleReset = () => {
        setSetAInput('a, b, c');
        setSetBInput('1, 2, 3');
    };

    // Parse inputs to unique arrays (sets)
    const parseSet = (str: string) => {
        const parsed = str
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
        return Array.from(new Set(parsed)); // Unique elements
    };

    const arrA = parseSet(setAInput);
    const arrB = parseSet(setBInput);

    const sizeA = arrA.length;
    const sizeB = arrB.length;
    const totalPairs = sizeA * sizeB;

    // Calculate A x B
    const getCartesianProduct = (set1: string[], set2: string[]) => {
        const prod: [string, string][] = [];
        for (const item1 of set1) {
            for (const item2 of set2) {
                prod.push([item1, item2]);
            }
        }
        return prod;
    };

    const productAB = getCartesianProduct(arrA, arrB);
    const productBA = getCartesianProduct(arrB, arrA);

    // Limit grid rendering for performance
    const renderLimit = 15;
    const isGridLimited = sizeA > renderLimit || sizeB > renderLimit;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-600" />
                {isTh ? 'เครื่องมือคำนวณหาผลคูณคาร์ทีเซียน (Cartesian Product)' : 'Cartesian Product Calculator'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุชุดสมาชิกในเซต' : 'Define Sets'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {isTh ? 'เซต A (คั่นด้วยเครื่องหมายจุลภาค)' : 'Set A (Comma-separated)'}
                                </label>
                                <input
                                    type="text"
                                    value={setAInput}
                                    onChange={(e) => setSetAInput(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-semibold text-amber-950"
                                    placeholder="เช่น a, b, c"
                                />
                                <span className="text-xs text-gray-400 mt-1 block">
                                    n(A) = {sizeA} {isTh ? 'สมาชิก' : 'elements'}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {isTh ? 'เซต B (คั่นด้วยเครื่องหมายจุลภาค)' : 'Set B (Comma-separated)'}
                                </label>
                                <input
                                    type="text"
                                    value={setBInput}
                                    onChange={(e) => setSetBInput(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-semibold text-amber-950"
                                    placeholder="เช่น 1, 2, 3"
                                />
                                <span className="text-xs text-gray-400 mt-1 block">
                                    n(B) = {sizeB} {isTh ? 'สมาชิก' : 'elements'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* Sizes and Product Lists */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-amber-950 mb-4 border-b border-amber-200 pb-2">
                            {isTh ? 'ผลการคำนวณผลคูณ' : 'Calculation Results'}
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-white p-3 rounded-lg border border-amber-100 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-450 font-bold">n(A × B) = n(A) × n(B)</p>
                                    <p className="text-lg font-extrabold text-amber-700">
                                        {sizeA} × {sizeB} = {totalPairs}
                                    </p>
                                </div>
                                <Layers className="w-8 h-8 text-amber-400" />
                            </div>

                            {totalPairs > 0 ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-amber-900 mb-1">A × B ({isTh ? 'ผลลัพธ์' : 'Result'}):</p>
                                        <div className="bg-white p-2.5 rounded border border-amber-150 font-mono text-xs max-h-[90px] overflow-y-auto break-all">
                                            {"{ "}
                                            {productAB.map((pair, idx) => (
                                                <span key={idx}>
                                                    ({pair[0]}, {pair[1]}){idx < productAB.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                            {" }"}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-amber-900 mb-1">B × A ({isTh ? 'ผลลัพธ์กลับกัน' : 'Reverse Result'}):</p>
                                        <div className="bg-white p-2.5 rounded border border-amber-150 font-mono text-xs max-h-[90px] overflow-y-auto break-all">
                                            {"{ "}
                                            {productBA.map((pair, idx) => (
                                                <span key={idx}>
                                                    ({pair[0]}, {pair[1]}){idx < productBA.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                            {" }"}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    {isTh ? 'กรุณากรอกข้อมูลในเซตเพื่อเริ่มคำนวณ' : 'Please fill in set elements.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Matching Grid/Matrix Visualization */}
            {totalPairs > 0 && (
                <div className="mb-8 bg-white p-6 rounded-xl border border-gray-150">
                    <h3 className="text-md font-bold text-gray-800 mb-3">
                        {isTh ? 'ตารางพิกัดผลคูณคาร์ทีเซียน A × B (Grid Representation)' : 'Grid Representation of A × B'}
                    </h3>
                    {isGridLimited ? (
                        <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                            {isTh 
                                ? '* ขนาดเซตใหญ่เกินกว่าจะแสดงแบบตารางพิกัดได้อย่างสวยงาม (จำกัดแถวและคอลัมน์ไม่เกิน 15 ตัว)' 
                                : '* Sets are too large to display as a grid (limit set size to 15 to view grid).'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-center border-collapse">
                                <thead>
                                    <tr className="bg-amber-100 text-amber-900">
                                        <th className="p-2 border border-amber-250 font-bold bg-amber-50">
                                            A \ B
                                        </th>
                                        {arrB.map((bEl, bIdx) => (
                                            <th key={bIdx} className="p-2 border border-amber-250 font-mono font-bold">
                                                {bEl}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrA.map((aEl, aIdx) => (
                                        <tr key={aIdx} className="hover:bg-amber-50/50">
                                            <td className="p-2 border border-amber-250 font-bold bg-amber-50 font-mono text-amber-900">
                                                {aEl}
                                            </td>
                                            {arrB.map((bEl, bIdx) => (
                                                <td key={bIdx} className="p-2 border border-amber-200 font-mono text-xs text-gray-750">
                                                    ({aEl}, {bEl})
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* SEO Article */}
            <article className="prose prose-amber max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ผลคูณคาร์ทีเซียน (Cartesian Product) คืออะไร? ทฤษฎีบท คู่อันดับ และตัวอย่างการนำไปใช้
                </h2>
                <p>
                    ในทางคณิตศาสตร์ <strong>ผลคูณคาร์ทีเซียน (Cartesian Product)</strong> เป็นการดำเนินการพื้นฐานระหว่างเซตสองเซตที่ทำให้เกิดเซตใหม่ของ <strong>คู่อันดับ (Ordered Pairs)</strong> ผลคูณคาร์ทีเซียนตั้งชื่อตาม <em>เรอเน เดส์การ์ตส์ (Ren&eacute; Descartes)</em> นักคณิตศาสตร์ชาวฝรั่งเศสผู้บุกเบิกการประสานเรขาคณิตเข้ากับพีชคณิต (เป็นที่มาของระบบพิกัดฉากคาร์ทีเซียน)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามและเครื่องหมายทางคณิตศาสตร์</h3>
                <p>
                    สำหรับเซตสองเซต $A$ และ $B$ ผลคูณคาร์ทีเซียนเขียนแทนด้วยสัญลักษณ์ $A \times B$ อ่านออกเสียงว่า &ldquo;เอ คูณ บี&rdquo; นิยามคือ เซตของคู่อันดับ $(a, b)$ ทั้งหมดโดยที่สมาชิกตัวหน้า $a$ จะต้องมาจากเซต $A$ และสมาชิกตัวหลัง $b$ จะต้องมาจากเซต $B$
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-amber-700">
                    A × B = {'{'} (a, b) | a ∈ A และ b ∈ B {'}'}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติสำคัญของผลคูณคาร์ทีเซียน</h3>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>สมบัติไม่มีการสลับที่ (Non-commutative):</strong> โดยทั่วไป $A \times B \neq B \times A$ ยกเว้นกรณีที่ $A = B$ หรือเซตใดเซตหนึ่งเป็นเซตว่าง ($\emptyset$) ตัวอย่างเช่น ถ้า $A = \{a\}$ และ $B = \{1\}$ จะได้ $A \times B = \{(a, 1)\}$ ในขณะที่ $B \times A = \{(1, a)\}$ ซึ่งไม่เหมือนกัน</li>
                    <li><strong>จำนวนสมาชิก (Cardinality):</strong> จำนวนสมาชิกของผลคูณคาร์ทีเซียนมีค่าเท่ากับผลคูณของจำนวนสมาชิกของเซตตั้งต้นทั้งสองตัว:
                        <div className="font-mono text-xs my-2 text-center text-amber-800 font-bold">n(A × B) = n(A) × n(B)</div>
                        ถ้าเซต $A$ มีสมาชิก 3 ตัว และเซต $B$ มีสมาชิก 4 ตัว จำนวนคู่อันดับใน $A \times B$ จะเท่ากับ $3 \times 4 = 12$ คู่อันดับ
                    <li><strong>ผลคูณกับเซตว่าง:</strong> ผลคูณคาร์ทีเซียนของเซตใดๆ กับเซตว่าง จะได้ผลลัพธ์เป็นเซตว่างเสมอ ($A \times \emptyset = \emptyset$) เนื่องจากไม่มีสมาชิกในเซตว่างที่จะสามารถจับคู่คู่อันดับได้</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
                <p>
                    สมมติให้ เซต $A = \{x, y\}$ และ เซต $B = \{1, 2, 3\}$
                    <br />
                    การจับคู่ $A \times B$ จะทำการนำสมาชิกของ $A$ เป็นหลักไปจับคู่กับสมาชิกของ $B$ ทุกตัว:
                    <br />
                    จะได้: $A \times B = \{(x, 1), (x, 2), (x, 3), (y, 1), (y, 2), (y, 3)\}$
                    <br />
                    การจับคู่ $B \times A$ จะทำการนำสมาชิกของ $B$ เป็นหลักไปจับคู่กับสมาชิกของ $A$ ทุกตัว:
                    <br />
                    จะได้: $B \times A = \{(1, x), (1, y), (2, x), (2, y), (3, x), (3, y)\}$
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การนำไปใช้ประโยชน์ในเชิงเทคโนโลยี</h3>
                <p>
                    ผลคูณคาร์ทีเซียนไม่ใช่เรื่องไกลตัว แต่เป็นหัวใจของระบบซอฟต์แวร์และการจัดการข้อมูลหลายตัว ได้แก่:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>การทำ Cartesian Join (CROSS JOIN) ในฐานข้อมูล SQL:</strong> เมื่อผู้เขียนโปรแกรมสั่ง Join ตารางข้อมูลสองตารางโดยไม่มีเงื่อนไขคีย์เชื่อมโยง ฐานข้อมูลจะส่งผลคูณคาร์ทีเซียนของทุกแถวจากตารางแรกจับคู่กับทุกแถวจากตารางสอง ซึ่งเป็นประโยชน์ในการสร้างชุดข้อมูลจำลองหรือแมทริกซ์การรวมเงื่อนไขทั้งหมด</li>
                    <li><strong>การสร้างหน้าตัวเลือกสินค้าอีคอมเมิร์ซ (Product Variants Matrix):</strong> เช่น หากเสื้อรุ่นหนึ่งมีไซส์ $S, M, L$ (3 ไซส์) และมีสี $แดง, น้ำเงิน$ (2 สี) การสร้างรายการสินค้าคงคลัง (SKUs) ทั้งหมดเกิดจากผลคูณคาร์ทีเซียนของ ไซส์ $\times$ สี ได้เป็น $3 \times 2 = 6$ รูปแบบสินค้า</li>
                </ol>
                <p>
                    ด้วยโปรแกรมคำนวณหาผลคูณคาร์ทีเซียนนี้ คุณสามารถใส่เซตข้อมูลขนาดต่างๆ เพื่อวิเคราะห์และดึงรายการคู่อันดับอย่างสะดวกรวดเร็วและนำไปใช้ทำงานจริงได้อย่างสะดวกง่ายดาย
                </p>
            </article>
        </div>
    );
}
