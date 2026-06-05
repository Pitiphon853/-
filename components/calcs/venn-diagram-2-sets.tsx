import React, { useState } from 'react';
import { Calculator, RefreshCw, Info } from 'lucide-react';

export default function VennDiagram2Sets({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');
    const [calcMode, setCalcMode] = useState<'elements' | 'cardinality'>('elements');

    // State for Elements Mode
    const [elementsA, setElementsA] = useState<string>('1, 2, 3, 4');
    const [elementsB, setElementsB] = useState<string>('3, 4, 5, 6');
    const [elementsU, setElementsU] = useState<string>('1, 2, 3, 4, 5, 6, 7, 8, 9');

    // State for Cardinality Mode
    const [nA, setNA] = useState<string>('25');
    const [nB, setNB] = useState<string>('20');
    const [nIntersection, setNIntersection] = useState<string>('8');
    const [nU, setNU] = useState<string>('50');

    const handleReset = () => {
        if (calcMode === 'elements') {
            setElementsA('1, 2, 3, 4');
            setElementsB('3, 4, 5, 6');
            setElementsU('1, 2, 3, 4, 5, 6, 7, 8, 9');
        } else {
            setNA('25');
            setNB('20');
            setNIntersection('8');
            setNU('50');
        }
    };

    // Helper to parse elements string to Array
    const parseElements = (str: string) => {
        return str
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
    };

    // Calculate elements results
    const arrA = parseElements(elementsA);
    const arrB = parseElements(elementsB);
    const arrU = elementsU.trim() === '' ? Array.from(new Set([...arrA, ...arrB])) : parseElements(elementsU);

    const setA = new Set(arrA);
    const setB = new Set(arrB);
    const setU = new Set(arrU);

    // Sync sets with U (ensure elements of A and B are in U if U is specified)
    const allElementsInU = [...arrA, ...arrB].every(el => setU.has(el));
    const finalU = allElementsInU ? arrU : Array.from(new Set([...arrU, ...arrA, ...arrB]));
    const finalSetU = new Set(finalU);

    const intersection = arrA.filter(x => setB.has(x));
    const union = Array.from(new Set([...arrA, ...arrB]));
    const onlyA = arrA.filter(x => !setB.has(x));
    const onlyB = arrB.filter(x => !setA.has(x));
    const outside = finalU.filter(x => !setA.has(x) && !setB.has(x));

    const complementA = finalU.filter(x => !setA.has(x));
    const complementB = finalU.filter(x => !setB.has(x));

    // Cardinality mode calculations
    const numNA = parseInt(nA) || 0;
    const numNB = parseInt(nB) || 0;
    const numNInter = parseInt(nIntersection) || 0;
    const numNU = parseInt(nU) || 0;

    let cardError = '';
    if (calcMode === 'cardinality') {
        if (numNInter > numNA || numNInter > numNB) {
            cardError = isTh 
                ? 'n(A ∩ B) ไม่สามารถมากกว่า n(A) หรือ n(B) ได้' 
                : 'n(A ∩ B) cannot exceed n(A) or n(B)';
        }
        const unionSize = numNA + numNB - numNInter;
        if (numNU < unionSize) {
            cardError = isTh
                ? `n(U) ต้องมีค่าไม่น้อยกว่า n(A ∪ B) = ${unionSize}`
                : `n(U) must be at least n(A ∪ B) = ${unionSize}`;
        }
    }

    const cardOnlyA = Math.max(0, numNA - numNInter);
    const cardOnlyB = Math.max(0, numNB - numNInter);
    const cardUnion = numNA + numNB - numNInter;
    const cardOutside = Math.max(0, numNU - cardUnion);

    // SVG parameters
    const svgW = 400;
    const svgH = 250;

    // Display values for SVG diagram
    const dispOnlyA = calcMode === 'elements' ? onlyA.length : cardOnlyA;
    const dispOnlyB = calcMode === 'elements' ? onlyB.length : cardOnlyB;
    const dispInter = calcMode === 'elements' ? intersection.length : numNInter;
    const dispOutside = calcMode === 'elements' ? outside.length : cardOutside;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-600" />
                {isTh ? 'เครื่องมือคำนวณเวนน์ไดอะแกรม 2 เซต' : '2-Set Venn Diagram Calculator'}
            </h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setCalcMode('elements')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        calcMode === 'elements'
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'กรอกสมาชิกของเซต' : 'Set Elements Input'}
                </button>
                <button
                    onClick={() => setCalcMode('cardinality')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        calcMode === 'cardinality'
                            ? 'border-emerald-600 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'กรอกจำนวนสมาชิก' : 'Cardinality / Sizes Input'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs Column */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุข้อมูลเซต' : 'Enter Set Data'}
                        </h2>

                        {calcMode === 'elements' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'เซต A (คั่นด้วยเครื่องหมายจุลภาค)' : 'Set A (Comma-separated)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={elementsA}
                                        onChange={(e) => setElementsA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="เช่น 1, 2, 3, 4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'เซต B (คั่นด้วยเครื่องหมายจุลภาค)' : 'Set B (Comma-separated)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={elementsB}
                                        onChange={(e) => setElementsB(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="เช่น 3, 4, 5, 6"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'เอกภพสัมพัทธ์ U (ระบุหรือไม่ก็ได้)' : 'Universal Set U (Optional)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={elementsU}
                                        onChange={(e) => setElementsU(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-650"
                                        placeholder="เช่น 1, 2, 3, 4, 5, 6, 7, 8, 9"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {isTh 
                                            ? '* หากเว้นว่างไว้ จะถือว่าเอกภพสัมพัทธ์คือ A ∪ B' 
                                            : '* If left blank, Universal set defaults to A ∪ B'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        n(A) - {isTh ? 'จำนวนสมาชิกเซต A' : 'Size of Set A'}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={nA}
                                        onChange={(e) => setNA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        n(B) - {isTh ? 'จำนวนสมาชิกเซต B' : 'Size of Set B'}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={nB}
                                        onChange={(e) => setNB(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        n(A ∩ B) - {isTh ? 'จำนวนสมาชิกในส่วนซ้ำกัน' : 'Size of Intersection'}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={nIntersection}
                                        onChange={(e) => setNIntersection(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        n(U) - {isTh ? 'จำนวนสมาชิกทั้งหมด (เอกภพสัมพัทธ์)' : 'Size of Universal Set U'}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={nU}
                                        onChange={(e) => setNU(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                {cardError && (
                                    <p className="text-red-500 text-sm font-semibold">{cardError}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* Diagram and Outputs Column */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-emerald-950 mb-4 border-b border-emerald-200 pb-2">
                            {isTh ? 'แผนภาพเวนน์และผลลัพธ์' : 'Venn Diagram & Results'}
                        </h2>

                        {/* Interactive SVG Venn Diagram */}
                        <div className="bg-white p-3 rounded-lg border border-emerald-100 flex justify-center mb-6 shadow-inner">
                            <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-[340px]">
                                {/* U outer bounding box */}
                                <rect x="10" y="10" width="380" height="230" fill="none" stroke="#64748b" strokeWidth="2" rx="8" />
                                <text x="25" y="30" fill="#64748b" className="font-mono text-sm font-bold">U</text>

                                {/* Left Circle (A) - Blue */}
                                <circle cx="150" cy="125" r="70" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                                <text x="100" y="75" fill="#1d4ed8" className="font-bold">A</text>

                                {/* Right Circle (B) - Pink/Red */}
                                <circle cx="250" cy="125" r="70" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                                <text x="290" y="75" fill="#b91c1c" className="font-bold">B</text>

                                {/* Count text positions */}
                                {/* Only A */}
                                <text x="120" y="130" textAnchor="middle" fill="#1d4ed8" className="font-extrabold text-base">
                                    {cardError ? '?' : dispOnlyA}
                                </text>
                                {/* Intersection */}
                                <text x="200" y="130" textAnchor="middle" fill="#047857" className="font-extrabold text-lg">
                                    {cardError ? '?' : dispInter}
                                </text>
                                {/* Only B */}
                                <text x="280" y="130" textAnchor="middle" fill="#b91c1c" className="font-extrabold text-base">
                                    {cardError ? '?' : dispOnlyB}
                                </text>
                                {/* Outside */}
                                <text x="350" y="220" textAnchor="middle" fill="#64748b" className="font-extrabold text-sm">
                                    {cardError ? '?' : dispOutside}
                                </text>
                            </svg>
                        </div>

                        {/* List Results */}
                        {!cardError && (
                            <div className="space-y-3 text-sm text-emerald-950">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white p-2 rounded border border-emerald-100">
                                        <p className="font-semibold text-xs text-gray-500">n(A ∪ B)</p>
                                        <p className="text-lg font-bold text-emerald-800">
                                            {calcMode === 'elements' ? union.length : cardUnion}
                                        </p>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-emerald-100">
                                        <p className="font-semibold text-xs text-gray-500">n(A ∩ B)</p>
                                        <p className="text-lg font-bold text-emerald-800">
                                            {calcMode === 'elements' ? intersection.length : numNInter}
                                        </p>
                                    </div>
                                </div>

                                {calcMode === 'elements' && (
                                    <div className="space-y-2 mt-4 text-xs font-mono bg-white p-3 rounded border border-emerald-100 max-h-[150px] overflow-y-auto">
                                        <p><strong>A ∪ B:</strong> {`{ ${union.join(', ')} }`}</p>
                                        <p><strong>A ∩ B:</strong> {`{ ${intersection.join(', ')} }`}</p>
                                        <p><strong>A - B:</strong> {`{ ${onlyA.join(', ')} }`}</p>
                                        <p><strong>B - A:</strong> {`{ ${onlyB.join(', ')} }`}</p>
                                        <p><strong>A&apos;:</strong> {`{ ${complementA.join(', ')} }`}</p>
                                        <p><strong>B&apos;:</strong> {`{ ${complementB.join(', ')} }`}</p>
                                        <p><strong>Outside:</strong> {`{ ${outside.join(', ')} }`}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-emerald max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    แผนภาพเวนน์-ออยเลอร์ 2 เซต (2-Set Venn Diagram) และการคำนวณทางเซตพื้นฐาน
                </h2>
                <p>
                    ในวิชาคณิตศาสตร์เรื่องเซต <strong>แผนภาพเวนน์-ออยเลอร์ (Venn-Euler Diagram)</strong> เป็นเครื่องมือทางเรขาคณิตที่ช่วยให้ผู้เรียนเข้าใจโครงสร้าง ความสัมพันธ์ และสมาชิกของเซตได้อย่างเป็นรูปธรรม แผนภาพนี้ถูกคิดค้นโดยจอห์น เวนน์ (John Venn) นักคณิตศาสตร์ชาวอังกฤษ เพื่อใช้แสดงความสัมพันธ์เชิงตรรกศาสตร์ระหว่างกลุ่มข้อมูลหรือเซตต่างๆ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ส่วนประกอบสำคัญในแผนภาพเวนน์ 2 เซต</h3>
                <p>
                    เมื่อเรามีสองเซตย่อย ได้แก่ เซต $A$ และ เซต $B$ ภายใต้เอกภพสัมพัทธ์ $U$ แผนภาพจะประกอบไปด้วยวงกลมสองวงที่ซ้อนทับกัน ซึ่งจะแบ่งพื้นที่ออกเป็น 4 โซนย่อยหลัก:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>พื้นที่เฉพาะเซต A เท่านั้น (Only A):</strong> แทนสมาชิกที่อยู่ใน $A$ แต่ไม่อยู่ใน $B$ เขียนแทนด้วยเครื่องหมายผลต่างคือ $A - B$ หรือ $A \cap B&apos;$</li>
                    <li><strong>พื้นที่เฉพาะเซต B เท่านั้น (Only B):</strong> แทนสมาชิกที่อยู่ใน $B$ แต่ไม่อยู่ใน $A$ เขียนแทนด้วยเครื่องหมายผลต่างคือ $B - A$ หรือ $B \cap A&apos;$</li>
                    <li><strong>พื้นที่ทับซ้อนตรงกลาง (Intersection):</strong> แทนสมาชิกที่เป็นของทั้งสองเซตพร้อมๆ กัน เขียนแทนด้วยสัญลักษณ์อินเตอร์เซกชัน $A \cap B$</li>
                    <li><strong>พื้นที่ด้านนอกวงกลม (Outside):</strong> แทนสมาชิกในเอกภพสัมพัทธ์ $U$ ที่ไม่อยู่ทั้งใน $A$ และ $B$ เขียนแทนด้วย $(A \cup B)&apos;$</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาจำนวนสมาชิก 2 เซต</h3>
                <p>
                    สูตรคำนวณจำนวนสมาชิกที่พบบ่อยและมีความจำเป็นอย่างยิ่งสำหรับการแก้โจทย์ปัญหาคณิตศาสตร์ระดับมัธยมศึกษาคือ <strong>สูตรยูเนียนของสองเซต:</strong>
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-emerald-700">
                    n(A ∪ B) = n(A) + n(B) - n(A ∩ B)
                </div>
                <p>
                    สาเหตุที่ต้องลบด้วย $n(A \cap B)$ เนื่องจากเวลาที่เรานับจำนวนสมาชิกในเซต $A$ และนำไปบวกกับจำนวนสมาชิกในเซต $B$ สมาชิกในส่วนที่ซ้ำกันจะถูกบวกเพิ่มไปถึง 2 รอบ เราจึงต้องหักออก 1 รอบเพื่อให้ได้ผลรวมที่ถูกต้องแม่นยำ
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คำอธิบายการดำเนินการทางเซต (Set Operations)</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>ยูเนียน (Union - ∪):</strong> การรวมสมาชิกของทั้งสองเซตเข้าด้วยกันทั้งหมด $A \cup B$</li>
                    <li><strong>อินเตอร์เซกชัน (Intersection - ∩):</strong> การหาเฉพาะสมาชิกที่มีร่วมกันในทั้งสองเซต $A \cap B$</li>
                    <li><strong>ผลต่างระหว่างเซต (Set Difference - A - B):</strong> การเอาเฉพาะสมาชิกที่อยู่ในเซตหน้าแต่ไม่อยู่ในเซตหลัง</li>
                    <li><strong>คอมพลีเมนต์ (Complement - A&apos;):</strong> การเอาสมาชิกทั้งหมดในเอกภพสัมพัทธ์ $U$ ยกเว้นสมาชิกที่อยู่ในเซต $A$</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้</h3>
                <p>
                    ความเข้าใจเรื่องเซตและแผนภาพเวนน์ 2 เซตถูกใช้ประโยชน์อย่างสูงในระบบจัดการฐานข้อมูล (Database) โดยเฉพาะการเขียนคำสั่ง <strong>SQL Joins</strong> เช่น INNER JOIN (เปรียบเสมือนอินเตอร์เซกชัน), LEFT JOIN (เปรียบเสมือนเฉพาะเซต A และอินเตอร์เซกชัน), และ FULL OUTER JOIN (เปรียบเสมือนยูเนียน) ตลอดจนการทำวิทยาศาสตร์ข้อมูล (Data Science) เพื่อจัดกลุ่มกลุ่มลูกค้าเป้าหมายที่ตรงตามเกณฑ์ 2 เงื่อนไข โปรแกรม Venn Diagram 2 Sets นี้จึงจัดทำขึ้นเพื่อช่วยประมวลผลเซตและสร้างโมเดลจำลองแผนภาพได้อย่างรวดเร็วและถูกต้อง
                </p>
            </article>
        </div>
    );
}
