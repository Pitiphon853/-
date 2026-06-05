"use client";

import React, { useState } from "react";
import { Calculator, Grid3X3, Plus, Minus, ArrowRight } from "lucide-react";

export default function MatrixAdditionSubtraction({ lang }: { lang?: "TH" | "EN" }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [operation, setOperation] = useState<"add" | "sub">("add");

  const handleDimensionsChange = (newRows: number, newCols: number) => {
    if (newRows < 1 || newRows > 5 || newCols < 1 || newCols > 5) return;
    setRows(newRows);
    setCols(newCols);
    setMatrixA(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setMatrixB(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
  };

  const updateMatrixA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrixA];
    newMatrix[r][c] = parseFloat(value) || 0;
    if (value === "" || value === "-") newMatrix[r][c] = value as any; // Allow typing minus
    setMatrixA(newMatrix);
  };

  const updateMatrixB = (r: number, c: number, value: string) => {
    const newMatrix = [...matrixB];
    newMatrix[r][c] = parseFloat(value) || 0;
    if (value === "" || value === "-") newMatrix[r][c] = value as any;
    setMatrixB(newMatrix);
  };

  const calculate = (op: "add" | "sub") => {
    setOperation(op);
    const newResult = Array(rows).fill(0).map(() => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const valA = Number(matrixA[i][j]) || 0;
        const valB = Number(matrixB[i][j]) || 0;
        newResult[i][j] = op === "add" ? valA + valB : valA - valB;
      }
    }
    setResult(newResult);
  };

  const renderMatrixInput = (
    title: string,
    matrix: number[][],
    onChange: (r: number, c: number, v: string) => void
  ) => (
    <div className="flex flex-col items-center">
      <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h3>
      <div 
        className="grid gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              value={val === 0 && typeof val !== "string" ? "" : val}
              onChange={(e) => onChange(i, j, e.target.value)}
              className="w-14 h-14 text-center rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              placeholder="0"
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <Grid3X3 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Matrix Addition & Subtraction" : "เครื่องมือคำนวณการบวกและลบเมทริกซ์"}
        </h2>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-blue-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-blue-100 dark:border-gray-700">
          <label className="font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {lang === "EN" ? "Matrix Dimensions (Rows × Cols):" : "ขนาดเมทริกซ์ (แถว × หลัก):"}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="5"
              value={rows}
              onChange={(e) => handleDimensionsChange(parseInt(e.target.value) || 1, cols)}
              className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 font-bold">×</span>
            <input
              type="number"
              min="1"
              max="5"
              value={cols}
              onChange={(e) => handleDimensionsChange(rows, parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-gray-500 ml-2">Max 5x5</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
          {renderMatrixInput("Matrix A", matrixA, updateMatrixA)}
          
          <div className="flex lg:flex-col gap-4">
            <button
              onClick={() => calculate("add")}
              className={`p-4 rounded-full transition-all duration-300 ${operation === "add" && result ? "bg-blue-600 text-white shadow-lg scale-110" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-gray-700"}`}
              title="Add Matrices"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={() => calculate("sub")}
              className={`p-4 rounded-full transition-all duration-300 ${operation === "sub" && result ? "bg-rose-600 text-white shadow-lg scale-110" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-gray-700"}`}
              title="Subtract Matrices"
            >
              <Minus className="w-6 h-6" />
            </button>
          </div>

          {renderMatrixInput("Matrix B", matrixB, updateMatrixB)}
        </div>

        {result && (
          <div className="flex flex-col items-center justify-center mt-10 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-5 h-5" />
              <h3 className="font-bold text-xl uppercase tracking-wider">Result (A {operation === "add" ? "+" : "-"} B)</h3>
            </div>
            <div 
              className="grid gap-2 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/50 shadow-xl"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {result.map((row, i) =>
                row.map((val, j) => (
                  <div
                    key={`res-${i}-${j}`}
                    className="w-16 h-16 flex items-center justify-center text-lg font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 shadow-sm"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">การบวกและลบเมทริกซ์ (Matrix Addition and Subtraction)</h2>
        <p>
          ในทางคณิตศาสตร์ <strong>เมทริกซ์ (Matrix)</strong> คือกลุ่มของตัวเลขที่ถูกนำมาจัดเรียงในรูปแบบของตารางสี่เหลี่ยมจัตุรัสหรือสี่เหลี่ยมผืนผ้า โดยมีการจัดเป็นแถว (row) และหลัก (column) ซึ่งเรามักจะระบุขนาดของเมทริกซ์ในรูปแบบของ $m \times n$ (อ่านว่า เอ็มคูณเอ็น) โดย $m$ คือจำนวนแถว และ $n$ คือจำนวนหลักของเมทริกซ์นั้นๆ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เงื่อนไขสำคัญของการบวกและลบเมทริกซ์</h3>
        <p>
          ก่อนที่จะทำการบวกหรือลบเมทริกซ์สองชุดใดๆ ได้นั้น มีกฎเกณฑ์ที่สำคัญที่สุดเพียงข้อเดียวคือ <strong>"เมทริกซ์ทั้งสองจะต้องมีมิติหรือขนาดที่เท่ากัน"</strong> นั่นหมายความว่า หากเมทริกซ์ A มีขนาด $m \times n$ เมทริกซ์ B ก็จำเป็นจะต้องมีขนาด $m \times n$ ด้วยเช่นเดียวกัน หากเมทริกซ์ทั้งสองมีขนาดไม่เท่ากัน (เช่น 2x2 กับ 3x3 หรือ 2x3 กับ 3x2) เราจะไม่สามารถนำมาบวกหรือลบกันได้เลย
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีการบวกและลบเมทริกซ์</h3>
        <p>
          เมื่อแน่ใจแล้วว่าเมทริกซ์ทั้งสองมีขนาดเท่ากัน วิธีการคำนวณนั้นถือว่าตรงไปตรงมาและเข้าใจได้ง่ายมาก โดยหลักการคือการนำสมาชิก (Element) ที่อยู่ในตำแหน่งเดียวกันของแต่ละเมทริกซ์มาบวกหรือลบกันโดยตรง 
        </p>
        <p>
          สมมติให้ $A$ และ $B$ เป็นเมทริกซ์ขนาด $2 \times 2$:<br />
          $A = \begin{"{"}bmatrix{"}"} a &amp; b \\ c &amp; d \end{"{"}bmatrix{"}"}$, 
          $B = \begin{"{"}bmatrix{"}"} e &amp; f \\ g &amp; h \end{"{"}bmatrix{"}"}$
        </p>
        <p>
          <strong>การบวก ($A + B$):</strong><br />
          $A + B = \begin{"{"}bmatrix{"}"} a+e &amp; b+f \\ c+g &amp; d+h \end{"{"}bmatrix{"}"}$
        </p>
        <p>
          <strong>การลบ ($A - B$):</strong><br />
          $A - B = \begin{"{"}bmatrix{"}"} a-e &amp; b-f \\ c-g &amp; d-h \end{"{"}bmatrix{"}"}$
        </p>
        <p>
          จะเห็นได้ว่าสมาชิกที่อยู่ตำแหน่งแถวที่ 1 หลักที่ 1 ของ $A$ ก็จะบวกหรือลบกับสมาชิกในตำแหน่งแถวที่ 1 หลักที่ 1 ของ $B$ ไปเรื่อยๆ จนครบทุกตำแหน่ง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">คุณสมบัติของการบวกเมทริกซ์</h3>
        <p>
          การบวกเมทริกซ์มีคุณสมบัติที่น่าสนใจและคล้ายคลึงกับการบวกจำนวนจริงทั่วไป ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>สมบัติการสลับที่ (Commutative Property):</strong> $A + B = B + A$ การสลับตำแหน่งของเมทริกซ์ในการบวกไม่ทำให้ผลลัพธ์เปลี่ยนแปลง</li>
          <li><strong>สมบัติการเปลี่ยนหมู่ (Associative Property):</strong> $(A + B) + C = A + (B + C)$ ไม่ว่าจะบวกคู่ใดก่อน ผลลัพธ์สุดท้ายจะเท่ากันเสมอ</li>
          <li><strong>เอกลักษณ์การบวก (Additive Identity):</strong> เมทริกซ์ศูนย์ (Zero Matrix, $O$) คือเมทริกซ์ที่สมาชิกทุกตัวเป็น 0 หากนำไปบวกกับเมทริกซ์ใดๆ จะได้เมทริกซ์เดิมเสมอ นั่นคือ $A + O = A$</li>
          <li><strong>อินเวอร์สการบวก (Additive Inverse):</strong> สำหรับเมทริกซ์ $A$ ใดๆ จะมีเมทริกซ์ $-A$ (ที่สมาชิกทุกตัวมีเครื่องหมายตรงกันข้ามกับ $A$) ซึ่งเมื่อนำมาบวกกันจะได้ผลลัพธ์เป็นเมทริกซ์ศูนย์ ($A + (-A) = O$)</li>
        </ul>
        
        <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-200 dark:border-rose-800 mt-6">
          <p className="text-sm m-0 text-rose-800 dark:text-rose-200">
            <strong>ข้อควรระวัง:</strong> การลบเมทริกซ์ <strong>ไม่มีสมบัติการสลับที่</strong> ($A - B \neq B - A$) และ <strong>ไม่มีสมบัติการเปลี่ยนหมู่</strong> เช่นเดียวกับการลบตัวเลขทั่วไป 
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">การประยุกต์ใช้งานในชีวิตจริง</h3>
        <p>
          แม้ว่าการบวกและลบเมทริกซ์อาจดูเป็นคณิตศาสตร์นามธรรม แต่ความจริงแล้วมันถูกใช้งานอย่างกว้างขวางในหลายสาขาวิชา เช่น ในงานคอมพิวเตอร์กราฟิก (Computer Graphics) เมทริกซ์ถูกใช้เพื่อเก็บค่าสีของพิกเซล การบวกเมทริกซ์อาจหมายถึงการผสมภาพหรือเพิ่มความสว่าง นอกจากนี้ในด้านเศรษฐศาสตร์ ยังใช้เมทริกซ์เพื่อรวบรวมและวิเคราะห์ข้อมูลต้นทุน ยอดขาย หรือการเปลี่ยนแปลงของสินค้าคงคลังในแต่ละช่วงเวลาได้อย่างมีระบบและรวดเร็ว เครื่องมือคำนวณออนไลน์นี้จึงออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา และผู้ที่สนใจสามารถตรวจสอบคำตอบ ทำความเข้าใจ และประหยัดเวลาในการคำนวณเมทริกซ์ที่มีขนาดใหญ่หรือมีความซับซ้อนได้อย่างแม่นยำ
        </p>
      </article>
    </div>
  );
}
