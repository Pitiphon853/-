"use client";

import React, { useState } from "react";
import { Calculator, Hash, X, ArrowRight } from "lucide-react";

export default function MatrixScalarMultiplication({ lang }: { lang?: "TH" | "EN" }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [scalar, setScalar] = useState<number | string>(2);
  const [result, setResult] = useState<number[][] | null>(null);

  const handleDimensionsChange = (newRows: number, newCols: number) => {
    if (newRows < 1 || newRows > 5 || newCols < 1 || newCols > 5) return;
    setRows(newRows);
    setCols(newCols);
    setMatrixA(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setResult(null);
  };

  const updateMatrixA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrixA];
    newMatrix[r][c] = parseFloat(value) || 0;
    if (value === "" || value === "-") newMatrix[r][c] = value as any;
    setMatrixA(newMatrix);
  };

  const calculate = () => {
    const k = parseFloat(scalar as string) || 0;
    const newResult = Array(rows).fill(0).map(() => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const valA = Number(matrixA[i][j]) || 0;
        newResult[i][j] = Number((k * valA).toFixed(6)); // Prevent floating point issues
      }
    }
    setResult(newResult);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <Hash className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Matrix Scalar Multiplication" : "การคูณเมทริกซ์ด้วยตัวเลข (Scalar)"}
        </h2>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-purple-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-purple-100 dark:border-gray-700">
          <label className="font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {lang === "EN" ? "Matrix Dimensions:" : "ขนาดเมทริกซ์ (แถว × หลัก):"}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="5"
              value={rows}
              onChange={(e) => handleDimensionsChange(parseInt(e.target.value) || 1, cols)}
              className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-gray-500 font-bold">×</span>
            <input
              type="number"
              min="1"
              max="5"
              value={cols}
              onChange={(e) => handleDimensionsChange(rows, parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <span className="text-xs text-gray-500 ml-2">Max 5x5</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
          
          {/* Scalar Input */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Scalar (k)</h3>
            <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner h-[116px]">
              <input
                type="number"
                value={scalar}
                onChange={(e) => setScalar(e.target.value)}
                className="w-20 h-14 text-center text-xl font-bold rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 focus:ring-2 focus:ring-purple-500 shadow-sm"
                placeholder="k"
              />
            </div>
          </div>

          <div className="text-gray-400 font-bold text-2xl"><X className="w-8 h-8" /></div>

          {/* Matrix Input */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Matrix A</h3>
            <div 
              className="grid gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {matrixA.map((row, i) =>
                row.map((val, j) => (
                  <input
                    key={`A-${i}-${j}`}
                    type="text"
                    value={val === 0 && typeof val !== "string" ? "" : val}
                    onChange={(e) => updateMatrixA(i, j, e.target.value)}
                    className="w-14 h-14 text-center rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 shadow-sm"
                    placeholder="0"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={calculate}
            className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate (k × A)" : "คำนวณผลคูณ"}
          </button>
        </div>

        {result && (
          <div className="flex flex-col items-center justify-center mt-10 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
              <ArrowRight className="w-5 h-5" />
              <h3 className="font-bold text-xl uppercase tracking-wider">Result (k × A)</h3>
            </div>
            <div 
              className="grid gap-2 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/50 shadow-xl"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {result.map((row, i) =>
                row.map((val, j) => (
                  <div
                    key={`res-${i}-${j}`}
                    className="min-w-[4rem] px-2 h-16 flex items-center justify-center text-lg font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 shadow-sm"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">การคูณเมทริกซ์ด้วยค่าคงตัวหรือตัวเลข (Scalar Multiplication of Matrices)</h2>
        <p>
          ในพีชคณิตเชิงเส้น (Linear Algebra) การดำเนินการพื้นฐานอย่างหนึ่งที่สำคัญมากคือ <strong>การคูณเมทริกซ์ด้วยค่าคงตัว (Scalar Multiplication)</strong> โดยคำว่า "สเกลาร์ (Scalar)" ในที่นี้หมายถึงตัวเลขธรรมดาทั่วไป เช่น จำนวนเต็ม เศษส่วน จำนวนทศนิยม หรือแม้กระทั่งจำนวนติดลบ ซึ่งมีความแตกต่างจากเมทริกซ์ที่เป็นกลุ่มของตัวเลขที่จัดเรียงกันเป็นแถวและหลัก
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">หลักการคำนวณการคูณด้วยสเกลาร์</h3>
        <p>
          การคูณเมทริกซ์ด้วยสเกลาร์นั้นมีวิธีการคำนวณที่เรียบง่ายและตรงไปตรงมามาก หลักการคือ <strong>การนำค่าสเกลาร์นั้นไปคูณกับสมาชิก (Element) ทุกตัวที่อยู่ภายในเมทริกซ์</strong> โดยที่ขนาดหรือมิติ (Dimension) ของเมทริกซ์ผลลัพธ์จะยังคงเท่าเดิมไม่เปลี่ยนแปลง
        </p>
        <p>
          สมมติให้เรามีสเกลาร์ $k$ และเมทริกซ์ $A$ ขนาด $m \times n$:
        </p>
        <p>
          $A = \begin{bmatrix} a &amp; b \\ c &amp; d \end{bmatrix}$ 
        </p>
        <p>
          เมื่อนำ $k$ ไปคูณกับเมทริกซ์ $A$ จะได้ผลลัพธ์คือ $kA$ ดังนี้:<br />
          $k \times A = \begin{bmatrix} k \cdot a &amp; k \cdot b \\ k \cdot c &amp; k \cdot d \end{bmatrix}$
        </p>
        <p>
          <strong>ตัวอย่าง:</strong> หาก $A = \begin{bmatrix} 1 &amp; -2 \\ 3 &amp; 4 \end{bmatrix}$ และต้องการหา $3A$<br />
          จะได้ $3A = \begin{bmatrix} 3(1) &amp; 3(-2) \\ 3(3) &amp; 3(4) \end{bmatrix} = \begin{bmatrix} 3 &amp; -6 \\ 9 &amp; 12 \end{bmatrix}$
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">คุณสมบัติสำคัญของการคูณสเกลาร์</h3>
        <p>
          การคูณเมทริกซ์ด้วยสเกลาร์มีคุณสมบัติทางคณิตศาสตร์ที่ช่วยให้การคำนวณสมการเมทริกซ์ที่มีความซับซ้อนง่ายขึ้น ดังนี้ (กำหนดให้ $k$ และ $l$ เป็นสเกลาร์, $A$ และ $B$ เป็นเมทริกซ์ขนาดเดียวกัน):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>สมบัติการแจกแจงต่อการบวกเมทริกซ์ (Distributive property over matrix addition):</strong> <br/>$k(A + B) = kA + kB$ <br/>หมายความว่า หากบวกเมทริกซ์ก่อนแล้วค่อยคูณสเกลาร์ จะมีค่าเท่ากับนำสเกลาร์ไปคูณแต่ละเมทริกซ์แล้วนำผลลัพธ์มาบวกกัน</li>
          <li><strong>สมบัติการแจกแจงต่อการบวกสเกลาร์ (Distributive property over scalar addition):</strong> <br/>$(k + l)A = kA + lA$</li>
          <li><strong>สมบัติการเปลี่ยนหมู่ทางสเกลาร์ (Associative property for scalars):</strong> <br/>$k(lA) = (kl)A$</li>
          <li><strong>เอกลักษณ์การคูณ (Multiplicative identity):</strong> <br/>$1 \cdot A = A$ และ $-1 \cdot A = -A$</li>
          <li><strong>คุณสมบัติการคูณด้วยศูนย์:</strong> <br/>$0 \cdot A = O$ (ได้เมทริกซ์ศูนย์)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประโยชน์และการประยุกต์ใช้</h3>
        <p>
          ความเข้าใจเรื่องการคูณเมทริกซ์ด้วยสเกลาร์เป็นพื้นฐานที่สำคัญในศาสตร์ต่างๆ เช่น ในสาขาวิทยาการคอมพิวเตอร์และกราฟิก 3 มิติ (3D Graphics) การคูณสเกลาร์ถูกใช้เพื่อการย่อหรือขยายขนาดของวัตถุ (Scaling) หากสเกลาร์มีค่ามากกว่า 1 วัตถุจะขยายใหญ่ขึ้น แต่หากอยู่ระหว่าง 0 ถึง 1 วัตถุจะมีขนาดเล็กลง นอกจากนี้ในฟิสิกส์ การคูณสเกลาร์ถูกนำมาใช้กับการคำนวณเวกเตอร์ (ซึ่งมองเป็นเมทริกซ์แบบหนึ่งมิติ) เพื่อเปลี่ยนแปลงขนาดของแรงหรือความเร็วโดยที่ยังคงทิศทางเดิมไว้ เครื่องมือนี้จึงถูกพัฒนาขึ้นเพื่อให้นักศึกษาและผู้ใช้งานทั่วไปสามารถคำนวณผลลัพธ์ได้อย่างสะดวกรวดเร็วและลดข้อผิดพลาดในการคำนวณด้วยตนเอง
        </p>
      </article>
    </div>
  );
}
