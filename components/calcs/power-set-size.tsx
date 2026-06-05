import React, { useState } from 'react';
import { Calculator, RefreshCw, Network } from 'lucide-react';

export default function PowerSetSize({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');

    const [mode, setMode] = useState<'elements' | 'size'>('elements');

    // Element mode state
    const [elementsInput, setElementsInput] = useState<string>('A, B, C');
    
    // Size mode state
    const [setSize, setSetSize] = useState<string>('5');

    const handleReset = () => {
        if (mode === 'elements') {
            setElementsInput('A, B, C');
        } else {
            setSetSize('5');
        }
    };

    // Parsing Elements
    const parseSet = (str: string) => {
        const parsed = str
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
        return Array.from(new Set(parsed)); // Unique elements
    };

    const arrElements = parseSet(elementsInput);
    const n = arrElements.length;

    // Generate Power Set (Only if n <= 10 to prevent browser crash)
    const generatePowerSet = (arr: string[]) => {
        const result: string[][] = [[]];
        for (const element of arr) {
            const length = result.length;
            for (let i = 0; i < length; i++) {
                result.push([...result[i], element]);
            }
        }
        // Sort by subset length for cleaner display
        return result.sort((a, b) => a.length - b.length);
    };

    let powerSetList: string[][] = [];
    if (mode === 'elements' && n <= 10) {
        powerSetList = generatePowerSet(arrElements);
    }

    // Size mode calculations (using BigInt for large numbers)
    const inputSize = parseInt(setSize) || 0;
    const sizeN = mode === 'elements' ? n : inputSize;

    let totalSubsetsStr = '0';
    let properSubsetsStr = '0';

    try {
        if (sizeN >= 0) {
            let total = BigInt(1);
            for (let i = 0; i < sizeN; i++) {
                total *= BigInt(2);
            }
            totalSubsetsStr = total.toLocaleString();
            properSubsetsStr = (total - BigInt(1)).toLocaleString();
        }
    } catch (e) {
        totalSubsetsStr = '∞';
        properSubsetsStr = '∞';
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                {isTh ? 'เครื่องมือคำนวณหาจำนวนสับเซตและพาวเวอร์เซต' : 'Power Set Size Calculator'}
            </h1>

            {/* Mode Select Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setMode('elements')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'elements'
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'ป้อนสมาชิกของเซต' : 'From Set Elements'}
                </button>
                <button
                    onClick={() => setMode('size')}
                    className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        mode === 'size'
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {isTh ? 'ป้อนเฉพาะจำนวนสมาชิก (n)' : 'From Set Size (n)'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs Column */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                            {isTh ? 'ระบุตัวแปร' : 'Define Set Variables'}
                        </h2>

                        {mode === 'elements' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'สมาชิกของเซต (คั่นด้วยจุลภาค)' : 'Set Elements (Comma-separated)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={elementsInput}
                                        onChange={(e) => setElementsInput(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-semibold text-purple-950"
                                        placeholder="เช่น A, B, C"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    {isTh 
                                        ? `ตรวจพบจำนวนสมาชิก n = ${n} ตัว`
                                        : `Detected n = ${n} elements`}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {isTh ? 'จำนวนสมาชิกของเซต (n)' : 'Number of Elements (n)'}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="500"
                                        value={setSize}
                                        onChange={(e) => setSetSize(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-bold"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {isTh 
                                            ? '* รองรับการคำนวณกำลังเลขคณิตขนาดใหญ่ด้วย BigInt' 
                                            : '* Supports arbitrary precision computations using BigInt.'}
                                    </p>
                                </div>
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

                {/* Outputs Column */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-purple-950 mb-4 border-b border-purple-200 pb-2">
                            {isTh ? 'ผลรวมสับเซตและพาวเวอร์เซต' : 'Subsets & Power Set Size'}
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-white p-3 rounded-lg border border-purple-150 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-xs text-gray-450 font-bold">
                                        {isTh ? 'จำนวนสับเซตทั้งหมด (2ⁿ)' : 'Total Subsets (2ⁿ)'}
                                    </p>
                                    <p className="text-2xl font-black text-purple-700 break-all">
                                        {totalSubsetsStr}
                                    </p>
                                </div>
                                <Network className="w-8 h-8 text-purple-400 shrink-0" />
                            </div>

                            <div className="bg-white p-3 rounded-lg border border-purple-150 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-xs text-gray-450 font-bold">
                                        {isTh ? 'จำนวนสับเซตแท้ (2ⁿ - 1)' : 'Proper Subsets (2ⁿ - 1)'}
                                    </p>
                                    <p className="text-xl font-extrabold text-purple-600 break-all">
                                        {properSubsetsStr}
                                    </p>
                                </div>
                            </div>

                            {/* Elements List if applicable */}
                            {mode === 'elements' && (
                                <div className="mt-2 text-xs">
                                    <p className="font-bold text-purple-900 mb-1">
                                        {isTh ? 'รายการพาวเวอร์เซต P(S):' : 'Power Set List P(S):'}
                                    </p>
                                    {n <= 10 ? (
                                        <div className="bg-white p-3 rounded border border-purple-200 max-h-[140px] overflow-y-auto font-mono leading-relaxed">
                                            {"{ "}
                                            {powerSetList.map((subset, idx) => (
                                                <span key={idx} className="inline-block mr-2">
                                                    {subset.length === 0 ? 'Ø' : `{${subset.join(', ')}}`}
                                                    {idx < powerSetList.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                            {" }"}
                                        </div>
                                    ) : (
                                        <p className="text-amber-600 bg-amber-50 p-2.5 rounded border border-amber-200">
                                            {isTh 
                                                ? '* สมาชิกเซตมีขนาดใหญ่เกินไปสำหรับการจำลองสับเซตแบบรายการ' 
                                                : '* Set elements size is too large to list subsets.'}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Article */}
            <article className="prose prose-purple max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    พาวเวอร์เซต (Power Set) และสับเซตคืออะไร? ทฤษฎีจำนวนสับเซตและวิธีการหาอย่างสมบูรณ์
                </h2>
                <p>
                    ในวิชาคณิตศาสตร์ หัวข้อที่สำคัญและเป็นแกนกลางของทฤษฎีเซต (Set Theory) คือ <strong>สับเซต (Subset)</strong> และ <strong>พาวเวอร์เซต (Power Set)</strong> การทำความเข้าใจความสัมพันธ์เหล่านี้เป็นจุดเริ่มต้นที่ดีในการทำความเข้าใจการนับ รูปแบบความน่าจะเป็น และโครงสร้างข้อมูลทางคอมพิวเตอร์
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. สับเซต (Subset) คืออะไร?</h3>
                <p>
                    เซต $A$ จะเป็น <strong>สับเซต</strong> ของเซต $B$ (เขียนแทนด้วย $A \subseteq B$) ก็ต่อเมื่อ <strong>สมาชิกทุกตัวของเซต $A$ เป็นสมาชิกของเซต $B$</strong> 
                    <br />
                    มีข้อตกลงที่ต้องจำคือ:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>เซตว่าง (Empty Set - ∅ หรือ {"{"}'{"{"}{"}"}'{"}"}):</strong> เป็นสับเซตของทุกๆ เซตเสมอ ($ \emptyset \subseteq S $)</li>
                    <li><strong>ตัวเซตเอง:</strong> เซตทุกเซตเป็นสับเซตของตัวมันเองเสมอ ($ S \subseteq S $)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. สับเซตแท้ (Proper Subset) คืออะไร?</h3>
                <p>
                    เซต $A$ จะเป็น <strong>สับเซตแท้</strong> ของเซต $B$ (เขียนแทนด้วย $A \subset B$) ก็ต่อเมื่อ $A$ เป็นสับเซตของ $B$ แต่ <strong>$A$ ต้องไม่เท่ากับ $B$</strong> (กล่าวคือ ต้องมีสมาชิกอย่างน้อยหนึ่งตัวใน $B$ ที่ไม่มีใน $A$) ดังนั้น จำนวนสับเซตแท้จึงมีจำนวนเท่ากับจำนวนสับเซตทั้งหมดหักออกไป 1 (คือหักตัวมันเองออก)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. พาวเวอร์เซต (Power Set) และสูตรคำนวณจำนวนสมาชิก</h3>
                <p>
                    <strong>พาวเวอร์เซต</strong> ของเซต $S$ (เขียนแทนด้วย $P(S)$ หรือ $2^S$) คือ <strong>เซตที่รวบรวมสับเซตที่เป็นไปได้ทั้งหมดของเซต $S$</strong> เอาไว้เป็นสมาชิก
                    <br />
                    หากเซต $S$ มีจำนวนสมาชิกจำกัดเท่ากับ $n$ ตัว จำนวนสมาชิกของพาวเวอร์เซต $P(S)$ หรือจำนวนสับเซตทั้งหมดจะสอดคล้องกับสูตร:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-purple-700">
                    จำนวนสับเซตทั้งหมด = 2ⁿ
                    <br />
                    จำนวนสับเซตแท้ทั้งหมด = 2ⁿ - 1
                </div>
                <p>
                    <strong>ตัวอย่าง:</strong>
                    <br />
                    กำหนดให้เซต $S = \{"{"}a, b\{"}"}$ (จำนวนสมาชิก $n = 2$)
                    <br />
                    สับเซตทั้งหมดมี $2^2 = 4$ สับเซต ได้แก่: $\emptyset$, $\{"{"}a\{"}"}$, $\{"{"}b\{"}"}$, $\{"{"}a, b\{"}"}$
                    <br />
                    พาวเวอร์เซตคือ: $P(S) = \{"{"}\emptyset, \{"{"}a\{"}"}, \{"{"}b\{"}"}, \{"{"}a, b\{"}"}\{"}"}$
                    <br />
                    สับเซตแท้มี $2^2 - 1 = 3$ สับเซต ได้แก่: $\emptyset$, $\{"{"}a\{"}"}$, $\{"{"}b\{"}"}$
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ในทางวิทยาการคอมพิวเตอร์</h3>
                <p>
                    พาวเวอร์เซตมีบทบาทสำคัญมากในการคำนวณความจุข้อมูลและอัลกอริทึม เช่น:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>การแก้ปัญหาการจัดกลุ่มย่อย (Combinatorial Problems):</strong> ในวิชาคอมพิวเตอร์ ปัญหาการหาผลรวมซับเซต (Subset Sum Problem) หรือการเลือกหยิบสินค้าใส่กระเป๋า (Knapsack Problem) จำเป็นต้องสำรวจตรวจสอบสมาชิกในพาวเวอร์เซตทั้งหมด</li>
                    <li><strong>ระบบสิทธิ์การเข้าถึง (Bitmasking/Permissions):</strong> การเข้ารหัสสิทธิ์ใช้งานระบบ เช่น สิทธิ์ อ่าน (Read), เขียน (Write), และ ประหารคำสั่ง (Execute) ใช้หลักการจับคู่สิทธิ์ในพาวเวอร์เซตของสิทธิ์ที่มีทั้งหมด</li>
                </ol>
                <p>
                    เครื่องมือคำนวณหาสับเซตและพาวเวอร์เซตนี้ได้รับการออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา และนักพัฒนาคำนวณขนาดและจำลองพาวเวอร์เซตของชุดข้อมูลที่ต้องการได้อย่างสะดวก รวดเร็ว และเป็นระเบียบที่สุด
                </p>
            </article>
        </div>
    );
}
