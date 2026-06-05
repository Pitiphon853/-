import React, { useState } from 'react';
import { Calculator, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface Row {
    id: number;
    valX: string;
    probP: string;
}

export default function ExpectedValue({ lang }: any) {
    const isTh = lang === 'th' || !lang || lang.toLowerCase().startsWith('th');

    const initialRows: Row[] = [
        { id: 1, valX: '10', probP: '0.2' },
        { id: 2, valX: '20', probP: '0.5' },
        { id: 3, valX: '30', probP: '0.3' }
    ];

    const [rows, setRows] = useState<Row[]>(initialRows);
    const [rowIdCounter, setRowIdCounter] = useState<number>(4);

    const handleReset = () => {
        setRows([
            { id: 1, valX: '10', probP: '0.2' },
            { id: 2, valX: '20', probP: '0.5' },
            { id: 3, valX: '30', probP: '0.3' }
        ]);
        setRowIdCounter(4);
    };

    const handleAddRow = () => {
        setRows([...rows, { id: rowIdCounter, valX: '', probP: '' }]);
        setRowIdCounter(rowIdCounter + 1);
    };

    const handleRemoveRow = (id: number) => {
        if (rows.length <= 1) return; // keep at least 1 row
        setRows(rows.filter(row => row.id !== id));
    };

    const handleInputChange = (id: number, field: 'valX' | 'probP', value: string) => {
        setRows(rows.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        }));
    };

    // Calculate E(X), E(X^2), Var(X), SD(X)
    let sumProb = 0;
    let expectedValue = 0;
    let expectedValueSq = 0;
    let hasError = false;

    const parsedRows = rows.map(row => {
        const x = parseFloat(row.valX);
        const p = parseFloat(row.probP);
        const isValid = !isNaN(x) && !isNaN(p);
        if (isValid) {
            sumProb += p;
            expectedValue += x * p;
            expectedValueSq += (x ** 2) * p;
        } else if (row.valX !== '' || row.probP !== '') {
            hasError = true;
        }
        return {
            ...row,
            x,
            p,
            isValid,
            xTimesP: isValid ? x * p : 0,
            xSqTimesP: isValid ? (x ** 2) * p : 0
        };
    });

    const variance = expectedValueSq - (expectedValue ** 2);
    const stdDev = variance >= 0 ? Math.sqrt(variance) : 0;

    // Tolerance check for probability sum to be 1.0 (approx)
    const isSumOk = Math.abs(sumProb - 1.0) < 0.0001;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-600" />
                {isTh ? 'เครื่องมือคำนวณหาค่าคาดหมายทางสถิติ (Expected Value)' : 'Expected Value Calculator'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                {/* Inputs Column */}
                <div className="lg:col-span-7 space-y-4 bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {isTh ? 'ตารางตัวแปรสุ่ม X และความน่าจะเป็น P(X)' : 'Random Variable X & Probability P(X)'}
                            </h2>
                            <button
                                onClick={handleAddRow}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" /> {isTh ? 'เพิ่มแถว' : 'Add Row'}
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-12 gap-2 font-bold text-xs text-gray-500 uppercase px-1">
                                <div className="col-span-5">{isTh ? 'ค่าที่เป็นไปได้ (X)' : 'Value (X)'}</div>
                                <div className="col-span-5">{isTh ? 'ความน่าจะเป็น P(X)' : 'Probability P(X)'}</div>
                                <div className="col-span-2 text-center">{isTh ? 'ลบ' : 'Del'}</div>
                            </div>

                            {rows.map((row, idx) => (
                                <div key={row.id} className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-5">
                                        <input
                                            type="number"
                                            step="any"
                                            value={row.valX}
                                            onChange={(e) => handleInputChange(row.id, 'valX', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
                                            placeholder={`x${idx + 1}`}
                                        />
                                    </div>
                                    <div className="col-span-5">
                                        <input
                                            type="number"
                                            step="any"
                                            min="0"
                                            max="1"
                                            value={row.probP}
                                            onChange={(e) => handleInputChange(row.id, 'probP', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
                                            placeholder={`P(x${idx + 1})`}
                                        />
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <button
                                            onClick={() => handleRemoveRow(row.id)}
                                            disabled={rows.length <= 1}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Probability Sum Validation */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                                isSumOk 
                                    ? 'bg-green-150 border border-green-200 text-green-800'
                                    : 'bg-amber-100 border border-amber-200 text-amber-800'
                            }`}>
                                {isSumOk ? (
                                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                                )}
                                <div>
                                    <p className="font-bold">
                                        {isTh ? 'ผลรวมความน่าจะเป็น (Σ P(X))' : 'Sum of Probabilities (Σ P(X))'} = {parseFloat(sumProb.toFixed(6))}
                                    </p>
                                    {!isSumOk && (
                                        <p className="text-xs mt-0.5">
                                            {isTh 
                                                ? '* เพื่อความแม่นยำทางทฤษฎี ผลรวมควรมีค่าเท่ากับ 1.0' 
                                                : '* The sum should be exactly 1.0 for valid calculations.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-2 mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> {isTh ? 'รีเซ็ตเป็นค่าเริ่มต้น' : 'Reset to Default'}
                    </button>
                </div>

                {/* Outputs Column */}
                <div className="lg:col-span-5 bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-emerald-950 mb-4 border-b border-emerald-200 pb-2">
                            {isTh ? 'สรุปสถิติผลลัพธ์' : 'Statistical Summary'}
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-white p-3 rounded-lg border border-emerald-150 shadow-sm">
                                <p className="text-xs text-gray-500 font-bold mb-1">
                                    {isTh ? 'ค่าคาดหมาย (Expected Value: E(X))' : 'Expected Value E(X)'}
                                </p>
                                <p className="text-3xl font-black text-emerald-700">
                                    {parseFloat(expectedValue.toFixed(6))}
                                </p>
                            </div>

                            <div className="bg-white p-3 rounded-lg border border-emerald-150 shadow-sm">
                                <p className="text-xs text-gray-500 font-bold mb-1">
                                    {isTh ? 'ความแปรปรวน (Variance: Var(X))' : 'Variance Var(X)'}
                                </p>
                                <p className="text-xl font-extrabold text-emerald-650">
                                    {parseFloat(variance.toFixed(6))}
                                </p>
                            </div>

                            <div className="bg-white p-3 rounded-lg border border-emerald-150 shadow-sm">
                                <p className="text-xs text-gray-500 font-bold mb-1">
                                    {isTh ? 'ส่วนเบี่ยงเบนมาตรฐาน (SD)' : 'Standard Deviation (SD)'}
                                </p>
                                <p className="text-xl font-extrabold text-emerald-650">
                                    {parseFloat(stdDev.toFixed(6))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-emerald-200 text-xs text-emerald-800 text-center font-mono">
                        E(X) = Σ x_i P(x_i)
                    </div>
                </div>
            </div>

            {/* Calculations Step Table */}
            {parsedRows.some(r => r.isValid) && (
                <div className="mb-8 bg-white p-6 rounded-xl border border-gray-150">
                    <h3 className="text-md font-bold text-gray-800 mb-3">
                        {isTh ? 'ขั้นตอนคำนวณแต่ละพจน์ (Table Breakdown)' : 'Calculation Breakdown Table'}
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-center border-collapse text-sm">
                            <thead>
                                <tr className="bg-emerald-100 text-emerald-950 font-bold">
                                    <th className="p-2 border border-emerald-200">i</th>
                                    <th className="p-2 border border-emerald-200">x_i</th>
                                    <th className="p-2 border border-emerald-200">P(x_i)</th>
                                    <th className="p-2 border border-emerald-200">x_i · P(x_i)</th>
                                    <th className="p-2 border border-emerald-200">x_i² · P(x_i)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parsedRows.map((row, idx) => (
                                    <tr key={row.id} className="hover:bg-emerald-50/30">
                                        <td className="p-2 border border-gray-200 font-bold">{idx + 1}</td>
                                        <td className="p-2 border border-gray-200 font-mono">{row.isValid ? row.x : '-'}</td>
                                        <td className="p-2 border border-gray-200 font-mono">{row.isValid ? row.p : '-'}</td>
                                        <td className="p-2 border border-gray-200 font-mono font-semibold text-emerald-700">
                                            {row.isValid ? parseFloat(row.xTimesP.toFixed(6)) : '-'}
                                        </td>
                                        <td className="p-2 border border-gray-200 font-mono text-gray-600">
                                            {row.isValid ? parseFloat(row.xSqTimesP.toFixed(6)) : '-'}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50 font-bold">
                                    <td className="p-2 border border-gray-200">{isTh ? 'ผลรวม (Σ)' : 'Sum'}</td>
                                    <td className="p-2 border border-gray-200">-</td>
                                    <td className="p-2 border border-gray-200 font-mono">{parseFloat(sumProb.toFixed(6))}</td>
                                    <td className="p-2 border border-gray-200 font-mono text-emerald-700 text-base">E(X) = {parseFloat(expectedValue.toFixed(6))}</td>
                                    <td className="p-2 border border-gray-200 font-mono text-gray-600">E(X²) = {parseFloat(expectedValueSq.toFixed(6))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* SEO Article */}
            <article className="prose prose-emerald max-w-none text-gray-700 mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ค่าคาดหมายทางสถิติ (Expected Value) คืออะไร? สูตรการคำนวณและความแปรปรวนสำหรับตัวแปรสุ่ม
                </h2>
                <p>
                    ในทางสถิติศาสตร์และทฤษฎีความน่าจะเป็น <strong>ค่าคาดหมาย (Expected Value)</strong> หรือบางครั้งเรียกว่า <em>ค่าคาดหวัง</em> หรือ <em>หวังผล (Mean Value)</em> เขียนแทนด้วยสัญลักษณ์ $E(X)$ หรือ $\mu$ เป็นตัววัดแนวโน้มเข้าสู่ส่วนกลางที่สำคัญอย่างยิ่ง มันคือ <strong>&ldquo;ค่าเฉลี่ยถ่วงน้ำหนักด้วยความน่าจะเป็นของเหตุการณ์ทั้งหมดที่เป็นไปได้&rdquo;</strong> ของตัวแปรสุ่มดิสครีต (Discrete Random Variable)
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรคณิตศาสตร์ในการหาค่าคาดหมาย</h3>
                <p>
                    สำหรับตัวแปรสุ่มแบบไม่ต่อเนื่อง $X$ ที่มีค่าผลลัพธ์ $x_1, x_2, \dots, x_n$ และมีความน่าจะเป็นของการเกิดแต่ละค่าเท่ากับ $P(x_1), P(x_2), \dots, P(x_n)$ สูตรคำนวณคือ:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm my-4 border border-gray-200 text-center font-bold text-emerald-700">
                    E(X) = Σ x_i · P(x_i)
                </div>
                <p>
                    กล่าวคือ ให้เอาผลลัพธ์ของเหตุการณ์คูณกับค่าความน่าจะเป็นที่จะเกิดเหตุการณ์นั้น แล้วนำผลคูณในแต่ละกรณีมาบวกกันทั้งหมดจนครบทุกแถว
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความแปรปรวน (Variance) และส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation)</h3>
                <p>
                    นอกจากต้องการทราบค่ากลาง (ค่าคาดหมาย) แล้ว ในทางสถิติเรายังจำเป็นต้องวัดการกระจายตัวของข้อมูลด้วย ซึ่งคำนวณหาได้จาก:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>ความแปรปรวน (Variance: $Var(X)$):</strong> วัดระดับการกระจายของตัวแปรสุ่มรอบๆ ค่าคาดหมาย สูตรคูณหาคือ:
                        <div className="font-mono text-xs my-2 text-center text-emerald-800 font-bold">Var(X) = E(X²) - [E(X)]²</div>
                        โดยที่ $E(X^2) = \sum x_i^2 \cdot P(x_i)$ (นำค่าผลลัพธ์ยกกำลังสองแล้วถ่วงน้ำหนักก่อนรวม)
                    </li>
                    <li><strong>ส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation: $SD$):</strong> เป็นการถอดรากที่สองของความแปรปรวน เพื่อให้ได้หน่วยวัดเดียวกันกับข้อมูลตั้งต้น:
                        <div className="font-mono text-xs my-2 text-center text-emerald-800 font-bold">SD = √Var(X)</div>
                    </li>
                </ol>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการประยุกต์ใช้งานในชีวิตจริง</h3>
                <p>
                    แนวคิดเรื่องค่าคาดหมายและค่าเฉลี่ยความน่าจะเป็นถูกนำไปประยุกต์ใช้เพื่อการประเมินความเสี่ยงและสร้างประโยชน์ในภาคธุรกิจ:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>การลงทุนและบริหารพอร์ตฟอลิโอ (Finance & Investing):</strong> นักวิเคราะห์การลงทุนใช้ค่าคาดหมายเพื่อคำนวณหาผลตอบแทนคาดหวังของหุ้นหรือทรัพย์สินต่างๆ โดยเปรียบเทียบระหว่าง โอกาสเกิดสภาวะตลาดกระทิง ตลาดหมี หรือตลาดปกติ ร่วมกับผลตอบแทนในแต่ละสภาวะ</li>
                    <li><strong>ธุรกิจการรับประกันภัย (Insurance):</strong> บริษัทประกันภัยรถยนต์หรือสุขภาพคำนวณหา Expected Value ของความเสียหายที่อาจเกิดขึ้นต่อลูกค้า เพื่อกำหนดเบี้ยประกันราคาที่คุ้มค่ากับค่าใช้จ่ายเฉลี่ยที่ต้องจ่ายสินไหมและสร้างกำไรให้บริษัท</li>
                    <li><strong>ทฤษฎีเกมและการออกแบบเกม (Game Theory & Casino):</strong> ในคาสิโน เกมอย่างรูเล็ต ไฮโล หรือการเล่นสลอตแมชชีน ได้รับการวิเคราะห์ทางสถิติให้ค่าคาดหมายมีผลลัพธ์ติดลบสำหรับผู้เล่น (House Edge) เสมอในระยะยาว ซึ่งยืนยันว่าบริษัทคาสิโนจะมีกำไรเสมอ</li>
                </ol>
                <p>
                    ด้วยเครื่องคิดเลขคำนวณหาค่าคาดหมาย Expected Value นี้ คุณสามารถป้อนทางเลือกความคุ้มค่าของการลงทุนหรือเช็กโจทย์การบ้าน พร้อมตรวจสอบค่าเฉลี่ย ความแปรปรวน และการกระจายมาตรฐานได้อย่างครบถ้วน ใช้งานง่าย รวดเร็ว และประหยัดเวลาอย่างยิ่ง
                </p>
            </article>
        </div>
    );
}
