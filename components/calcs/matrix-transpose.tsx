import React, { useState } from 'react';
import { Calculator, RotateCcw, Info, Hash, Columns, ArrowRightLeft } from 'lucide-react';

const rowColors = [
  { bg: 'bg-red-50/70', focus: 'focus:ring-red-500 focus:border-red-500', text: 'text-red-700', border: 'border-red-300', tag: 'bg-red-100 text-red-800' },
  { bg: 'bg-emerald-50/70', focus: 'focus:ring-emerald-500 focus:border-emerald-500', text: 'text-emerald-700', border: 'border-emerald-300', tag: 'bg-emerald-100 text-emerald-800' },
  { bg: 'bg-blue-50/70', focus: 'focus:ring-blue-500 focus:border-blue-500', text: 'text-blue-700', border: 'border-blue-300', tag: 'bg-blue-100 text-blue-800' },
  { bg: 'bg-amber-50/70', focus: 'focus:ring-amber-500 focus:border-amber-500', text: 'text-amber-700', border: 'border-amber-300', tag: 'bg-amber-100 text-amber-800' },
];

export default function MatrixTransposeCalculator({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [grid, setGrid] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const handleSizeChange = (newRows: number, newCols: number) => {
    const newGrid = Array.from({ length: newRows }, (_, r) =>
      Array.from({ length: newCols }, (_, c) => (grid[r]?.[c] !== undefined ? grid[r][c] : ''))
    );
    setRows(newRows);
    setCols(newCols);
    setGrid(newGrid);
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    if (/^-?\d*\.?\d*$/.test(val)) {
      const updated = grid.map((rowArr, rowIndex) =>
        rowArr.map((cellVal, colIndex) => (rowIndex === r && colIndex === c ? val : cellVal))
      );
      setGrid(updated);
    }
  };

  const handleReset = () => {
    const updated = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
    setGrid(updated);
  };

  const handleRandom = () => {
    const updated = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.floor(Math.random() * 19) - 9).toString())
    );
    setGrid(updated);
  };

  // Compute Transpose
  const transposeGrid = Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => grid[r]?.[c] || '')
  );

  const hasInput = grid.some(rowArr => rowArr.some(cell => cell !== ''));

  const formatNumber = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '0';
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <ArrowRightLeft size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {isTH ? 'เครื่องมือหาทรานสโพสของเมทริกซ์' : 'Matrix Transpose Calculator'}
              </h2>
              <p className="text-sm text-gray-500">
                {isTH ? 'หาเมทริกซ์สลับเปลี่ยน (Transpose) โดยการสลับแถวและหลัก' : 'Convert rows into columns and columns into rows'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRandom}
              className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              {isTH ? 'สุ่มตัวเลข' : 'Random'}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title={isTH ? 'ล้างข้อมูล' : 'Reset'}
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Matrix Size Controls */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-wrap gap-6 items-center border border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {isTH ? 'ขนาดของเมทริกซ์ตั้งต้น' : 'Original Matrix Dimension'}
            </label>
            <div className="flex items-center gap-3">
              {/* Rows Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{isTH ? 'แถว:' : 'Rows:'}</span>
                <select
                  value={rows}
                  onChange={(e) => handleSizeChange(parseInt(e.target.value), cols)}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              <span className="text-gray-400 font-mono">×</span>

              {/* Columns Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{isTH ? 'หลัก:' : 'Cols:'}</span>
                <select
                  value={cols}
                  onChange={(e) => handleSizeChange(rows, parseInt(e.target.value))}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-2 text-xs text-gray-500 pl-6 border-l border-gray-200">
            <Info size={16} className="text-teal-600 shrink-0" />
            <p>
              {isTH 
                ? 'เราใช้รหัสสีตามแถว เพื่อช่วยให้เห็นภาพการสลับตำแหน่งไปยังหลักในผลลัพธ์ได้อย่างชัดเจน'
                : 'Rows are color-coded to visualize how they map into columns in the transposed matrix.'}
            </p>
          </div>
        </div>

        {/* Input Matrix Visualization */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Original Matrix A */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-gray-700">Matrix A</span>
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                {rows} × {cols}
              </span>
            </div>

            <div className="relative flex items-center px-4 py-5 bg-gray-50/50 rounded-xl border border-gray-100 w-full justify-center">
              {/* Left bracket */}
              <div className="absolute left-1.5 top-0 bottom-0 w-3 border-t-2 border-b-2 border-l-2 border-gray-800 rounded-l-md"></div>

              {/* Dynamic Grid */}
              <div 
                className="grid gap-3 w-full max-w-[280px]"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {grid.map((rowArr, r) =>
                  rowArr.map((cellVal, c) => (
                    <div key={`orig-${r}-${c}`} className="relative">
                      <input
                        type="text"
                        value={cellVal}
                        onChange={(e) => handleCellChange(r, c, e.target.value)}
                        placeholder={`a${r+1}${c+1}`}
                        className={`w-full text-center py-2.5 font-semibold text-gray-800 border rounded-lg focus:ring-2 outline-none transition-all text-sm ${
                          rowColors[r]?.bg || 'bg-white'
                        } ${rowColors[r]?.border || 'border-gray-300'} ${rowColors[r]?.focus || 'focus:ring-teal-500'}`}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Right bracket */}
              <div className="absolute right-1.5 top-0 bottom-0 w-3 border-t-2 border-b-2 border-r-2 border-gray-800 rounded-r-md"></div>
            </div>
          </div>

          {/* Transposed Matrix A^T */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-gray-700">
                  Matrix A<sup>T</sup> (Transpose)
                </span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                  {cols} × {rows}
                </span>
              </div>

              <div className="relative flex items-center px-4 py-5 bg-gray-50/50 rounded-xl border border-gray-100 w-full justify-center">
                {/* Left bracket */}
                <div className="absolute left-1.5 top-0 bottom-0 w-3 border-t-2 border-b-2 border-l-2 border-gray-800 rounded-l-md"></div>

                {/* Transposed Grid */}
                <div 
                  className="grid gap-3 w-full max-w-[280px]"
                  style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}
                >
                  {transposeGrid.map((rowArr, c) =>
                    rowArr.map((cellVal, r) => (
                      <div 
                        key={`trans-${c}-${r}`} 
                        className={`text-center py-2.5 font-bold border rounded-lg text-sm transition-all ${
                          rowColors[r]?.bg || 'bg-gray-100 text-gray-400'
                        } ${rowColors[r]?.border || 'border-gray-200'} ${rowColors[r]?.text || 'text-gray-800'}`}
                      >
                        {cellVal !== '' ? formatNumber(cellVal) : `a${r+1}${c+1}`}
                      </div>
                    ))
                  )}
                </div>

                {/* Right bracket */}
                <div className="absolute right-1.5 top-0 bottom-0 w-3 border-t-2 border-b-2 border-r-2 border-gray-800 rounded-r-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map Details */}
        {hasInput && (
          <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {isTH ? 'รายละเอียดการสลับเปลี่ยนตำแหน่ง (Transpose Mapping)' : 'Mapping Details'}
              </h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Hash size={16} />
                  {isTH ? 'วิเคราะห์การเปลี่ยนแบบแถวต่อหลัก:' : 'Row to Column Transformation:'}
                </h4>

                <div className="space-y-4 text-sm font-mono">
                  {grid.map((rowArr, r) => {
                    const rowText = rowArr.map(v => formatNumber(v)).join(', ');
                    const colText = transposeGrid.map(rowOfT => formatNumber(rowOfT[r])).join(', ');
                    return (
                      <div key={`step-${r}`} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200/60 pb-3 last:border-0 last:pb-0 gap-2">
                        <div>
                          <span className={`px-2 py-0.5 rounded text-xs font-sans ${rowColors[r]?.tag}`}>
                            {isTH ? `แถวที่ ${r+1}` : `Row ${r+1}`}
                          </span>
                          <span className="text-gray-700 ml-2">[{rowText}]</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-sans">
                          {isTH ? 'กลายเป็น' : 'becomes'}
                          <span className="font-mono text-gray-600">&rarr;</span>
                        </div>
                        <div>
                          <span className={`px-2 py-0.5 rounded text-xs font-sans ${rowColors[r]?.tag}`}>
                            {isTH ? `หลักที่ ${r+1}` : `Column ${r+1}`}
                          </span>
                          <span className="text-gray-700 ml-2">[{colText}]</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-teal max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การหาทรานสโพสของเมทริกซ์ (Matrix Transpose) คืออะไร?
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          ในวิชาพีชคณิตเชิงเส้น (Linear Algebra) <strong>การหาทรานสโพส (Transpose)</strong> หรือเรียกอย่างเป็นทางการในภาษาไทยว่า <strong>เมทริกซ์สลับเปลี่ยน</strong> คือการดำเนินการทางคณิตศาสตร์แบบง่ายๆ แต่มีความจำเป็นอย่างยิ่งกับเมทริกซ์ โดยการทำทรานสโพสจะนำสมาชิกของแถว (Row) ในเมทริกซ์ต้นแบบมาเขียนใหม่เป็นหลัก (Column) และในทางกลับกัน สมาชิกของหลักเดิมก็จะถูกสลับมาเป็นแถวใหม่ สัญลักษณ์ที่ใช้แสดงการทรานสโพสของเมทริกซ์ A จะเขียนอยู่ในรูป <strong>A<sup>T</sup></strong> หรือในตำราบางเล่มอาจใช้สัญลักษณ์ A&apos; (A-prime)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามทางคณิตศาสตร์อย่างเป็นทางการ</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ถ้าเรามีเมทริกซ์ A ที่มีมิติ m × n (แถว × หลัก) โดยที่สมาชิกในแถวที่ i และหลักที่ j เขียนแทนด้วย A<sub>ij</sub> เมื่อเราทำการหาทรานสโพส จะได้เมทริกซ์ A<sup>T</sup> ที่มีมิติเป็น n × m (สลับจำนวนแถวและหลักกัน) และมีเงื่อนไขสลับดัชนีของสมาชิกภายในดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-teal-900">
          (A<sup>T</sup>)<sub>ji</sub> = A<sub>ij</sub>
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ตัวอย่างเช่น สมาชิกในแถวที่ 1 หลักที่ 2 ของเมทริกซ์เดิม (A<sub>12</sub>) จะถูกนำไปเขียนในแถวที่ 2 หลักที่ 1 ของเมทริกซ์ทรานสโพส ((A<sup>T</sup>)<sub>21</sub>)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างเปรียบเทียบการสลับเปลี่ยนมิติ</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          การหาทรานสโพสส่งผลโดยตรงต่อมิติของเมทริกซ์ โดยเราสามารถยกตัวอย่างกรณีศึกษาได้ดังนี้:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li>
            <strong>เมทริกซ์จัตุรัส (Square Matrix):</strong> หากเมทริกซ์เริ่มต้นมีขนาด 3x3 ทรานสโพสของมันจะมีขนาด 3x3 เท่าเดิม แต่ตำแหน่งของสมาชิกที่ไม่อยู่บนเส้นทแยงมุมหลักจะสลับกัน
          </li>
          <li>
            <strong>เมทริกซ์ผืนผ้า (Rectangular Matrix):</strong> หากเมทริกซ์เริ่มต้นมีขนาด 2x3 (2 แถว 3 หลัก) ทรานสโพสของมันจะมีขนาดสลับกันเป็น 3x2 (3 แถว 2 หลัก) ทันที
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">คุณสมบัติที่สำคัญของการหาทรานสโพส</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          การทำทรานสโพสมีคุณสมบัติที่สำคัญในการคำนวณพีชคณิตชั้นสูง ซึ่งนักศึกษาควรจดจำนำไปใช้สอบหรือพัฒนาโปรแกรมคำนวณดังนี้:
        </p>
        <ul className="list-decimal pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>(A<sup>T</sup>)<sup>T</sup> = A :</strong> การนำเมทริกซ์ที่ผ่านการทรานสโพสแล้วมาทรานสโพสอีกครั้ง จะได้เมทริกซ์เริ่มต้นกลับคืนมา</li>
          <li><strong>(A + B)<sup>T</sup> = A<sup>T</sup> + B<sup>T</sup> :</strong> ทรานสโพสของผลบวกเมทริกซ์ มีค่าเท่ากับผลบวกของทรานสโพสแต่ละตัว</li>
          <li><strong>(cA)<sup>T</sup> = cA<sup>T</sup> :</strong> เมื่อ c เป็นสเกลาร์ (ตัวเลขเดี่ยว) ทรานสโพสของตัวเลขคูณเมทริกซ์สามารถแยกออกมาคูณข้างนอกได้</li>
          <li><strong>(AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup> :</strong> ข้อนี้สำคัญมาก! ทรานสโพสของผลคูณเมทริกซ์สองตัว จะมีค่าเท่ากับผลคูณของทรานสโพสของเมทริกซ์เหล่านั้น แต่ต้องสลับลำดับคูณ (จาก AB เป็น B<sup>T</sup> คูณ A<sup>T</sup>)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประเภทเมทริกซ์ที่เกี่ยวข้องกับทรานสโพส</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          มีนิยามของเมทริกซ์พิเศษบางชนิดที่สร้างขึ้นโดยอ้างอิงจากความสัมพันธ์กับทรานสโพส:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>เมทริกซ์สมมาตร (Symmetric Matrix):</strong> คือเมทริกซ์ที่เมื่อทำทรานสโพสแล้วยังได้ค่าเท่ากับเมทริกซ์ตัวเดิม นั่นคือ A<sup>T</sup> = A (มักพบในรูปทรงเรขาคณิตที่สมมาตร)</li>
          <li><strong>เมทริกซ์กึ่งสมมาตร (Skew-Symmetric Matrix):</strong> คือเมทริกซ์ที่ทรานสโพสแล้วได้ค่าติดลบของเมทริกซ์เดิม นั่นคือ A<sup>T</sup> = -A โดยสมาชิกแนวทแยงมุมหลักทั้งหมดจะต้องมีค่าเป็น 0 เสมอ</li>
          <li><strong>เมทริกซ์เชิงตั้งฉาก (Orthogonal Matrix):</strong> คือเมทริกซ์ที่เมื่อนำตัวมันเองมาคูณกับทรานสโพสของตัวมันเองแล้ว จะได้เมทริกซ์เอกลักษณ์ (Identity Matrix) นั่นคือ AA<sup>T</sup> = I ซึ่งหมายความว่า A<sup>T</sup> = A<sup>-1</sup></li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ในเทคโนโลยีสมัยใหม่</h3>
        <p className="text-gray-700 leading-relaxed">
          ปัจจุบัน การหาทรานสโพสไม่ได้เป็นเพียงแค่ทฤษฎีในกระดาษ แต่ถูกบรรจุอยู่ใน Library การประมวลผลขนาดใหญ่ เช่น NumPy ในภาษา Python, TensorFlow และ PyTorch ซึ่งเป็นหัวใจสำคัญของการเทรนปัญญาประดิษฐ์และโครงข่ายประสาทเทียม (Neural Networks) เนื่องจากโครงสร้างของข้อมูลขาเข้าและน้ำหนัก (Weights) ของแต่ละ Layer ในระบบ Deep Learning มักต้องการการเปลี่ยนมิติ (Reshaping และ Transposing) เพื่อให้สอดคล้องกับโครงสร้างมิติของเมทริกซ์ที่สามารถคูณกันได้ในการประมวลผลผ่าน GPU
        </p>
      </article>
    </div>
  );
}
