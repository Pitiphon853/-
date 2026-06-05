import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

export default function VennDiagram3Sets({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');
    const [calcMode, setCalcMode] = useState<'elements' | 'cardinality'>('elements');

    // Elements Mode State
    const [elementsA, setElementsA] = useState<string>('1, 2, 3, 4, 7');
    const [elementsB, setElementsB] = useState<string>('2, 3, 5, 6, 8');
    const [elementsC, setElementsC] = useState<string>('3, 4, 5, 9, 10');
    const [elementsU, setElementsU] = useState<string>('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12');

    // Cardinality Mode State
    const [nA, setNA] = useState<string>('30');
    const [nB, setNB] = useState<string>('25');
    const [nC, setNC] = useState<string>('20');
    const [nAB, setNAB] = useState<string>('12');
    const [nBC, setNBC] = useState<string>('8');
    const [nAC, setNAC] = useState<string>('10');
    const [nABC, setNABC] = useState<string>('5');
    const [nU, setNU] = useState<string>('60');

    const handleReset = () => {
        if (calcMode === 'elements') {
            setElementsA('1, 2, 3, 4, 7');
            setElementsB('2, 3, 5, 6, 8');
            setElementsC('3, 4, 5, 9, 10');
            setElementsU('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12');
        } else {
            setNA('30');
            setNB('25');
            setNC('20');
            setNAB('12');
            setNBC('8');
            setNAC('10');
            setNABC('5');
            setNU('60');
        }
    };

    const parseElements = (str: string) => {
        return str
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
    };

    // Calculate elements mode values
    const arrA = parseElements(elementsA);
    const arrB = parseElements(elementsB);
    const arrC = parseElements(elementsC);
    const arrU = elementsU.trim() === ''
        ? Array.from(new Set([...arrA, ...arrB, ...arrC]))
        : parseElements(elementsU);

    const setA = new Set(arrA);
    const setB = new Set(arrB);
    const setC = new Set(arrC);
    const setU = new Set(arrU);

    // Sync sets with U (if elements of A, B, or C are missing in U, append them)
    const allInU = [...arrA, ...arrB, ...arrC].every(el => setU.has(el));
    const finalU = allInU ? arrU : Array.from(new Set([...arrU, ...arrA, ...arrB, ...arrC]));
    const finalSetU = new Set(finalU);

    // Overlaps for Elements Mode
    const onlyA = arrA.filter(x => !setB.has(x) && !setC.has(x));
    const onlyB = arrB.filter(x => !setA.has(x) && !setC.has(x));
    const onlyC = arrC.filter(x => !setA.has(x) && !setB.has(x));

    const intersectionAB = arrA.filter(x => setB.has(x));
    const intersectionBC = arrB.filter(x => setC.has(x));
    const intersectionAC = arrA.filter(x => setC.has(x));
    const intersectionABC = intersectionAB.filter(x => setC.has(x));

    const onlyAB = intersectionAB.filter(x => !setC.has(x));
    const onlyBC = intersectionBC.filter(x => !setA.has(x));
    const onlyAC = intersectionAC.filter(x => !setB.has(x));

    const union = Array.from(new Set([...arrA, ...arrB, ...arrC]));
    const outside = finalU.filter(x => !setA.has(x) && !setB.has(x) && !setC.has(x));

    // Cardinality Mode calculations
    const numNA = parseInt(nA) || 0;
    const numNB = parseInt(nB) || 0;
    const numNC = parseInt(nC) || 0;
    const numNAB = parseInt(nAB) || 0;
    const numNBC = parseInt(nBC) || 0;
    const numNAC = parseInt(nAC) || 0;
    const numNABC = parseInt(nABC) || 0;
    const numNU = parseInt(nU) || 0;

    let cardError = '';
    const cardOnlyAB = numNAB - numNABC;
    const cardOnlyBC = numNBC - numNABC;
    const cardOnlyAC = numNAC - numNABC;

    const cardOnlyA = numNA - cardOnlyAB - cardOnlyAC - numNABC;
    const cardOnlyB = numNB - cardOnlyAB - cardOnlyBC - numNABC;
    const cardOnlyC = numNC - cardOnlyAC - cardOnlyBC - numNABC;

    const cardUnion = cardOnlyA + cardOnlyB + cardOnlyC + cardOnlyAB + cardOnlyBC + cardOnlyAC + numNABC;
    const cardOutside = numNU - cardUnion;

    if (calcMode === 'cardinality') {
        if (numNABC > numNAB || numNABC > numNBC || numNABC > numNAC) {
            cardError = isTh ? 'n(A ∩ B ∩ C) ไม่สามารถมากกว่า n(A ∩ B), n(B ∩ C) หรือ n(A ∩ C) ได้' : 'n(A ∩ B ∩ C) cannot exceed double intersections.';
        } else if (cardOnlyA < 0 || cardOnlyB < 0 || cardOnlyC < 0 || cardOnlyAB < 0 || cardOnlyBC < 0 || cardOnlyAC < 0) {
            cardError = isTh ? 'ตัวเลขจำนวนสมาชิกที่กรอก ขัดแย้งกันทางคณิตศาสตร์ (บางพื้นที่ติดลบ)' : 'Inconsistent sizes (produces negative region sizes).';
        } else if (numNU < cardUnion) {
            cardError = isTh ? `n(U) ต้องมีค่าไม่ต่ำกว่า n(A ∪ B ∪ C) = ${cardUnion}` : `n(U) cannot be less than n(A ∪ B ∪ C) = ${cardUnion}`;
        }
    }

    // Display sizes
    const dispOnlyA = calcMode === 'elements' ? onlyA.length : cardOnlyA;
    const dispOnlyB = calcMode === 'elements' ? onlyB.length : cardOnlyB;
    const dispOnlyC = calcMode === 'elements' ? onlyC.length : cardOnlyC;
    const dispOnlyAB = calcMode === 'elements' ? onlyAB.length : cardOnlyAB;
    const dispOnlyBC = calcMode === 'elements' ? onlyBC.length : cardOnlyBC;
    const dispOnlyAC = calcMode === 'elements' ? onlyAC.length : cardOnlyAC;
    const dispABC = calcMode === 'elements' ? intersectionABC.length : numNABC;
    const dispOutside = calcMode === 'elements' ? outside.length : cardOutside;

    // SVG parameters
    const svgW = 400;
    const svgH = 300;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-teal-600" />
                {isTh ? 'เครื่องมือคำนวณเวนน์ไดอะแกรม 3 เซต' : '3-Set Venn Diagram Calculator'}
            </h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setCalcMode('elements')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        calcMode === 'elements'
                            ? 'border-teal-600 text-teal-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'กรอกสมาชิกของเซต (A, B, C)' : 'Set Elements Input'}
                </button>
                <button
                    onClick={() => setCalcMode('cardinality')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        calcMode === 'cardinality'
                            ? 'border-teal-600 text-teal-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'กรอกจำนวนสมาชิก (Cardinality)' : 'Cardinality / Sizes Input'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs Column */}
                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุข้อมูลเซตทั้งสาม' : 'Enter 3-Set Data'}
                        </h2>

                        {calcMode === 'elements' ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เซต A (คั่นด้วยจุลภาค)</label>
                                    <input
                                        type="text"
                                        value={elementsA}
                                        onChange={(e) => setElementsA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เซต B (คั่นด้วยจุลภาค)</label>
                                    <input
                                        type="text"
                                        value={elementsB}
                                        onChange={(e) => setElementsB(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เซต C (คั่นด้วยจุลภาค)</label>
                                    <input
                                        type="text"
                                        value={elementsC}
                                        onChange={(e) => setElementsC(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">เอกภพสัมพัทธ์ U (ระบุหรือไม่ก็ได้)</label>
                                    <input
                                        type="text"
                                        value={elementsU}
                                        onChange={(e) => setElementsU(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm font-mono text-gray-600"
                                        placeholder="เช่น 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="col-span-2 text-xs text-gray-500 font-semibold mb-1">
                                    * {isTh ? 'กรอกขนาดสมาชิก (จำนวนเต็มบวก):' : 'Fill in the sizes (positive integers):'}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(A)</label>
                                    <input type="number" min="0" value={nA} onChange={e => setNA(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(B)</label>
                                    <input type="number" min="0" value={nB} onChange={e => setNB(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(C)</label>
                                    <input type="number" min="0" value={nC} onChange={e => setNC(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(A ∩ B)</label>
                                    <input type="number" min="0" value={nAB} onChange={e => setNAB(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(B ∩ C)</label>
                                    <input type="number" min="0" value={nBC} onChange={e => setNBC(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(A ∩ C)</label>
                                    <input type="number" min="0" value={nAC} onChange={e => setNAC(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(A ∩ B ∩ C)</label>
                                    <input type="number" min="0" value={nABC} onChange={e => setNABC(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-bold text-teal-800" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">n(U)</label>
                                    <input type="number" min="0" value={nU} onChange={e => setNU(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                {cardError && (
                                    <div className="col-span-2 text-red-500 text-xs font-semibold mt-1">
                                        {cardError}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* SVG Visual and Text results Column */}
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-teal-950 mb-4 border-b border-teal-200 pb-2">
                            {isTh ? 'แผนภาพจำลอง 3 เซต' : '3-Set Venn Diagram'}
                        </h2>

                        {/* Venn Diagram SVG */}
                        <div className="bg-white p-3 rounded-lg border border-teal-100 flex justify-center mb-6 shadow-inner">
                            <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-[340px]">
                                {/* Universal Set border */}
                                <rect x="10" y="10" width="380" height="280" fill="none" stroke="#64748b" strokeWidth="2" rx="8" />
                                <text x="25" y="30" fill="#64748b" className="font-mono text-sm font-bold">U</text>

                                {/* Circles */}
                                {/* A (Top Left) - Red */}
                                <circle cx="160" cy="110" r="65" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
                                <text x="100" y="65" fill="#ef4444" className="font-bold text-sm">A</text>

                                {/* B (Top Right) - Blue */}
                                <circle cx="240" cy="110" r="65" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5" />
                                <text x="300" y="65" fill="#3b82f6" className="font-bold text-sm">B</text>

                                {/* C (Bottom) - Yellow/Orange */}
                                <circle cx="200" cy="170" r="65" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
                                <text x="130" y="235" fill="#d97706" className="font-bold text-sm">C</text>

                                {/* Labels for individual regions */}
                                {/* Only A */}
                                <text x="120" y="90" textAnchor="middle" fill="#dc2626" className="font-bold text-sm">
                                    {cardError ? '?' : dispOnlyA}
                                </text>
                                {/* Only B */}
                                <text x="280" y="90" textAnchor="middle" fill="#2563eb" className="font-bold text-sm">
                                    {cardError ? '?' : dispOnlyB}
                                </text>
                                {/* Only C */}
                                <text x="200" y="215" textAnchor="middle" fill="#d97706" className="font-bold text-sm">
                                    {cardError ? '?' : dispOnlyC}
                                </text>
                                {/* Only AB */}
                                <text x="200" y="85" textAnchor="middle" fill="#7c3aed" className="font-bold text-xs">
                                    {cardError ? '?' : dispOnlyAB}
                                </text>
                                {/* Only AC */}
                                <text x="160" y="160" textAnchor="middle" fill="#b45309" className="font-bold text-xs">
                                    {cardError ? '?' : dispOnlyAC}
                                </text>
                                {/* Only BC */}
                                <text x="240" y="160" textAnchor="middle" fill="#047857" className="font-bold text-xs">
                                    {cardError ? '?' : dispOnlyBC}
                                </text>
                                {/* ABC Intersection */}
                                <text x="200" y="125" textAnchor="middle" fill="#111827" className="font-black text-sm">
                                    {cardError ? '?' : dispABC}
                                </text>
                                {/* Outside */}
                                <text x="350" y="270" textAnchor="middle" fill="#64748b" className="font-bold text-xs">
                                    {cardError ? '?' : dispOutside}
                                </text>
                            </svg>
                        </div>

                        {/* List details */}
                        {!cardError && (
                            <div className="space-y-2 text-xs text-teal-950 font-mono bg-white p-3 rounded border border-teal-100 max-h-[140px] overflow-y-auto">
                                <p><strong>n(A ∪ B ∪ C):</strong> {calcMode === 'elements' ? union.length : cardUnion}</p>
                                {calcMode === 'elements' && (
                                    <>
                                        <p><strong>A ∩ B ∩ C:</strong> {`{ ${intersectionABC.join(', ')} }`}</p>
                                        <p><strong>A ∪ B ∪ C:</strong> {`{ ${union.join(', ')} }`}</p>
                                        <p><strong>Only A:</strong> {`{ ${onlyA.join(', ')} }`}</p>
                                        <p><strong>Only B:</strong> {`{ ${onlyB.join(', ')} }`}</p>
                                        <p><strong>Only C:</strong> {`{ ${onlyC.join(', ')} }`}</p>
                                        <p><strong>Outside:</strong> {`{ ${outside.join(', ')} }`}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-teal max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    แผนภาพเวนน์ 3 เซต (3-Set Venn Diagram) และการคำนวณจำนวนสมาชิกอย่างถูกต้อง
                </h2>
                <p>
                    ในทฤษฎีเซตและการคิดวิเคราะห์ข้อมูล การใช้ <strong>แผนภาพเวนน์-ออยเลอร์ 3 เซต</strong> ช่วยให้เราจัดการความสัมพันธ์ระหว่างกลุ่มชุดข้อมูลย่อย 3 ชุดที่แตกต่างกันแต่มีส่วนที่ซ้อนทับกัน เช่น เซต $A$, $B$ และ $C$ การใช้ไดอะแกรม 3 เซตนี้ช่วยจัดหมวดหมู่ข้อมูลออกเป็นทั้งหมด <strong>8 ส่วนแยกกัน (8 Disjoint Regions)</strong> ซึ่งประกอบด้วยข้อมูลส่วนตัวของแต่ละเซต ส่วนที่ซ้ำกันระหว่าง 2 เซต ส่วนซ้ำกันทั้งหมด และส่วนภายนอกวงกลม
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาจำนวนสมาชิกของ 3 เซต (Union of Three Sets)</h3>
                <p>
                    สูตรคณิตศาสตร์หลักในการรวมชุดข้อมูล 3 ชุดเข้าด้วยกันโดยไม่ให้นับข้อมูลที่ซ้ำกันซ้ำซ้อน มีดังนี้:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-teal-700">
                    n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(A ∩ C) + n(A ∩ B ∩ C)
                </div>
                <p>
                    <strong>เหตุผลเบื้องหลังของสูตรนี้:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>เราเริ่มต้นจากการนำสมาชิกทั้งหมดของ $A$, $B$ และ $C$ มาบวกกัน</li>
                    <li>ซึ่งจะทำให้สมาชิกส่วนที่เป็นจุดร่วมคู่กัน ($A \cap B$, $B \cap C$, $A \cap C$) ถูกบวกไป 2 ครั้ง เราจึงจำต้องลบอินเตอร์เซกชันคู่พวกนี้ออกอย่างละ 1 รอบ</li>
                    <li>เมื่อลบออกไปแล้ว สมาชิกจุดศูนย์กลางร่วมทั้งหมดอย่าง $n(A \cap B \cap C)$ ซึ่งเดิมทีถูกบวกไป 3 ครั้งและถูกลบไป 3 ครั้ง จะกลายเป็นศูนย์ (ไม่ได้ถูกนับเลย) ดังนั้นเราจึงต้องบวก $n(A \cap B \cap C)$ กลับเข้ามาอีก 1 รอบ</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การแบ่งพื้นที่ 8 ส่วนในแผนภาพ 3 เซต</h3>
                <p>
                    เมื่อวิเคราะห์แผนภาพเวนน์ 3 เซตแบบสมบูรณ์ พื้นที่จะถูกแบ่งอย่างเด็ดขาดออกเป็น:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>พื้นที่ A เท่านั้น (Only A):</strong> สมาชิกใน $A$ ที่ไม่ได้อยู่ใน $B$ หรือ $C$</li>
                    <li><strong>พื้นที่ B เท่านั้น (Only B):</strong> สมาชิกใน $B$ ที่ไม่ได้อยู่ใน $A$ หรือ $C$</li>
                    <li><strong>พื้นที่ C เท่านั้น (Only C):</strong> สมาชิกใน $C$ ที่ไม่ได้อยู่ใน $A$ หรือ $B$</li>
                    <li><strong>พื้นที่ A ∩ B เท่านั้น (Only A ∩ B):</strong> สมาชิกที่ซ้ำเฉพาะใน $A$ และ $B$ แต่ไม่อยู่ใน $C$</li>
                    <li><strong>พื้นที่ B ∩ C เท่านั้น (Only B ∩ C):</strong> สมาชิกที่ซ้ำเฉพาะใน $B$ และ $C$ แต่ไม่อยู่ใน $A$</li>
                    <li><strong>พื้นที่ A ∩ C เท่านั้น (Only A ∩ C):</strong> สมาชิกที่ซ้ำเฉพาะใน $A$ และ $C$ แต่ไม่อยู่ใน $B$</li>
                    <li><strong>พื้นที่ร่วมตรงกลาง (A ∩ B ∩ C):</strong> สมาชิกที่อยู่ในทั้งสามเซต</li>
                    <li><strong>พื้นที่รอบนอก (Outside):</strong> สมาชิกในเอกภพสัมพัทธ์ที่ไม่ได้อยู่ใน $A, B,$ หรือ $C$ เลย</li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์และการประยุกต์ใช้ในอุตสาหกรรม</h3>
                <p>
                    การประมวลผลความสัมพันธ์ 3 เซตด้วยวิธีของเวนน์เป็นรากฐานสำคัญในหลากหลายสาขา เช่น:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>ชีววิทยาการแพทย์:</strong> การจำแนกประเภทสารแอนติเจนในกลุ่มเลือดหรือการวิเคราะห์ปฏิกิริยาของยา 3 ชนิดที่อาจมีผลทับซ้อนกัน</li>
                    <li><strong>วิทยาการข้อมูลและการตลาด:</strong> การแบ่งกลุ่มตลาดลูกค้าเป้าหมาย (Market Segmentation) เช่น ลูกค้าที่กดไลก์เพจ A, ซื้อสินค้าจากร้าน B, และดาวน์โหลดแอป C เพื่อนำเสนอโฆษณาที่ตรงใจเฉพาะบุคคล</li>
                    <li><strong>การทำวิจัยประชากรศาสตร์:</strong> การหาความสัมพันธ์และสถิติประชากรที่ใช้ภาษาหรือนับถือศาสนาต่างๆ 3 รูปแบบ</li>
                </ol>
                <p>
                    โปรแกรม Venn Diagram 3 Sets Calculator นี้มีฟังก์ชันการคำนวณที่ยืดหยุ่น สามารถสลับวิเคราะห์ได้ทั้งเชิงสัญลักษณ์สมาชิก และแบบเชิงปริมาณจำนวน เพื่ออำนวยความสะดวกในทุกการตรวจสอบทางคณิตศาสตร์อย่างถูกต้อง
                </p>
            </article>
        </div>
    );
}
