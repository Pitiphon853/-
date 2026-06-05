"use client";
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function SystemOfEquations3Variables({ lang }: { lang: 'en' | 'th' }) {
  const [matrix, setMatrix] = useState([
    [1, 1, 1, 6],
    [0, 2, 5, -4],
    [2, 5, -1, 27]
  ]);

  const [result, setResult] = useState<{
    x: number | null,
    y: number | null,
    z: number | null,
    det: number,
    dx: number,
    dy: number,
    dz: number,
    message: string
  } | null>(null);

  const calculate = () => {
    const [[a1, b1, c1, d1], [a2, b2, c2, d2], [a3, b3, c3, d3]] = matrix;

    const det = a1 * (b2 * c3 - c2 * b3) - b1 * (a2 * c3 - c2 * a3) + c1 * (a2 * b3 - b2 * a3);
    const dx = d1 * (b2 * c3 - c2 * b3) - b1 * (d2 * c3 - c2 * d3) + c1 * (d2 * b3 - b2 * d3);
    const dy = a1 * (d2 * c3 - c2 * d3) - d1 * (a2 * c3 - c2 * a3) + c1 * (a2 * d3 - d2 * a3);
    const dz = a1 * (b2 * d3 - d2 * b3) - b1 * (a2 * d3 - d2 * a3) + d1 * (a2 * b3 - b2 * a3);

    if (det === 0) {
      if (dx === 0 && dy === 0 && dz === 0) {
        setResult({ x: null, y: null, z: null, det, dx, dy, dz, message: lang === 'th' ? "มีหลายคำตอบ (Dependent System)" : "Infinite Solutions (Dependent System)" });
      } else {
        setResult({ x: null, y: null, z: null, det, dx, dy, dz, message: lang === 'th' ? "ไม่มีคำตอบ (Inconsistent System)" : "No Solution (Inconsistent System)" });
      }
    } else {
      setResult({
        x: dx / det,
        y: dy / det,
        z: dz / det,
        det, dx, dy, dz,
        message: lang === 'th' ? "คำตอบเฉพาะ (Unique Solution)" : "Unique Solution"
      });
    }
  };

  const handleChange = (r: number, c: number, val: string) => {
    const num = parseFloat(val);
    const newMatrix = [...matrix];
    newMatrix[r][c] = isNaN(num) ? 0 : num;
    setMatrix(newMatrix);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {lang === 'th' ? 'แก้ระบบสมการเชิงเส้น 3 ตัวแปร' : 'Solve System of Linear Equations (3 Variables)'}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            {lang === 'th' ? 'กรอกสัมประสิทธิ์ a, b, c และค่าคงที่ d ในสมการรูปแบบ ax + by + cz = d' : 'Enter coefficients a, b, c and constant d for equations in the form ax + by + cz = d'}
          </p>

          <div className="space-y-4">
            {[1, 2, 3].map((row, rIdx) => (
              <div key={row} className="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-xl">
                <span className="font-medium text-gray-700 mr-2">eq{row}:</span>
                <input
                  type="number"
                  value={matrix[rIdx][0]}
                  onChange={(e) => handleChange(rIdx, 0, e.target.value)}
                  className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                />
                <span className="text-gray-600 font-medium">x +</span>
                <input
                  type="number"
                  value={matrix[rIdx][1]}
                  onChange={(e) => handleChange(rIdx, 1, e.target.value)}
                  className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                />
                <span className="text-gray-600 font-medium">y +</span>
                <input
                  type="number"
                  value={matrix[rIdx][2]}
                  onChange={(e) => handleChange(rIdx, 2, e.target.value)}
                  className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                />
                <span className="text-gray-600 font-medium">z =</span>
                <input
                  type="number"
                  value={matrix[rIdx][3]}
                  onChange={(e) => handleChange(rIdx, 3, e.target.value)}
                  className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                />
              </div>
            ))}
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            {lang === 'th' ? 'คำนวณหาคำตอบ' : 'Calculate Solution'}
          </button>

          {result && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                {lang === 'th' ? 'ผลลัพธ์' : 'Result'}
              </h3>
              <p className="text-blue-800 mb-4 font-medium">{result.message}</p>
              
              {result.x !== null && result.y !== null && result.z !== null && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50 text-center">
                    <span className="text-gray-500 text-sm">x =</span>
                    <div className="text-2xl font-bold text-blue-700">{Number.isInteger(result.x) ? result.x : result.x.toFixed(4)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50 text-center">
                    <span className="text-gray-500 text-sm">y =</span>
                    <div className="text-2xl font-bold text-blue-700">{Number.isInteger(result.y) ? result.y : result.y.toFixed(4)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50 text-center">
                    <span className="text-gray-500 text-sm">z =</span>
                    <div className="text-2xl font-bold text-blue-700">{Number.isInteger(result.z) ? result.z : result.z.toFixed(4)}</div>
                  </div>
                </div>
              )}

              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  {lang === 'th' ? 'ดูวิธีทำด้วยกฎของคราเมอร์ (Cramer\'s Rule)' : 'View steps using Cramer\'s Rule'}
                </summary>
                <div className="mt-4 space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-blue-100">
                  <p>Det(A) = {result.det}</p>
                  <p>Det(X) = {result.dx}</p>
                  <p>Det(Y) = {result.dy}</p>
                  <p>Det(Z) = {result.dz}</p>
                  {result.det !== 0 && (
                    <>
                      <p className="mt-2">x = Det(X) / Det(A) = {result.dx} / {result.det} = {result.x}</p>
                      <p>y = Det(Y) / Det(A) = {result.dy} / {result.det} = {result.y}</p>
                      <p>z = Det(Z) / Det(A) = {result.dz} / {result.det} = {result.z}</p>
                    </>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>

      <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ระบบสมการเชิงเส้นสามตัวแปร (System of Linear Equations in 3 Variables)</h2>
        <p>
          ระบบสมการเชิงเส้น 3 ตัวแปร เป็นชุดของสมการเชิงเส้น 3 สมการที่มีตัวแปร 3 ตัว (มักนิยมใช้ x, y, z) 
          การหาคำตอบของระบบสมการนี้คือการหาค่าของ x, y และ z ที่ทำให้สมการทั้ง 3 เป็นจริงพร้อมกันทั้งหมด 
          ในทางเรขาคณิต สมการแต่ละเส้นจะแทนระนาบ (Plane) 1 ระนาบในปริภูมิสามมิติ คำตอบของระบบสมการนี้คือจุดตัดของระนาบทั้งสามนั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">รูปแบบทั่วไปของระบบสมการ</h3>
        <p>ระบบสมการเชิงเส้น 3 ตัวแปร มักเขียนในรูปแบบ:</p>
        <ul className="list-none pl-4 space-y-2 font-mono bg-gray-50 p-4 rounded-lg">
          <li>a₁x + b₁y + c₁z = d₁</li>
          <li>a₂x + b₂y + c₂z = d₂</li>
          <li>a₃x + b₃y + c₃z = d₃</li>
        </ul>
        <p className="mt-4">
          โดยที่ a, b, c เป็นสัมประสิทธิ์ของตัวแปร และ d เป็นค่าคงที่
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การแก้สมการด้วยกฎของคราเมอร์ (Cramer's Rule)</h3>
        <p>
          กฎของคราเมอร์เป็นวิธีทางคณิตศาสตร์ที่ใช้ดีเทอร์มิแนนต์ (Determinant) ของเมทริกซ์ในการหาคำตอบของระบบสมการเชิงเส้น 
          วิธีนี้มีประสิทธิภาพและตรงไปตรงมาเมื่อดีเทอร์มิแนนต์ของเมทริกซ์สัมประสิทธิ์หลักไม่เท่ากับศูนย์
        </p>
        
        <h4 className="font-semibold mt-4">ขั้นตอนการหาคำตอบ:</h4>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>หาค่า Det(A):</strong> หาดีเทอร์มิแนนต์ของเมทริกซ์สัมประสิทธิ์หลัก (a, b, c)
            <br />ถ้า Det(A) = 0 ระบบสมการนี้อาจไม่มีคำตอบ หรือมีคำตอบมากมายนับไม่ถ้วน
          </li>
          <li>
            <strong>หาค่า Det(X), Det(Y), Det(Z):</strong> 
            <ul>
              <li>Det(X) หาได้จากการแทนที่คอลัมน์ของสัมประสิทธิ์ x ด้วยค่าคงที่ d</li>
              <li>Det(Y) หาได้จากการแทนที่คอลัมน์ของสัมประสิทธิ์ y ด้วยค่าคงที่ d</li>
              <li>Det(Z) หาได้จากการแทนที่คอลัมน์ของสัมประสิทธิ์ z ด้วยค่าคงที่ d</li>
            </ul>
          </li>
          <li>
            <strong>คำนวณตัวแปร:</strong>
            <p className="font-mono mt-2">
              x = Det(X) / Det(A)<br />
              y = Det(Y) / Det(A)<br />
              z = Det(Z) / Det(A)
            </p>
          </li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ลักษณะของคำตอบที่อาจเกิดขึ้น</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>มีคำตอบเดียว (Unique Solution):</strong> เมื่อระนาบทั้ง 3 ตัดกันที่จุดเดียว (Det(A) ≠ 0)</li>
          <li><strong>ไม่มีคำตอบ (No Solution หรือ Inconsistent):</strong> เมื่อระนาบขนานกันอย่างน้อย 2 ระนาบ หรือตัดกันเป็นคู่ๆ โดยไม่ร่วมจุดเดียวกัน (Det(A) = 0 และดีเทอร์มิแนนต์ตัวอื่นไม่เท่ากับ 0)</li>
          <li><strong>มีหลายคำตอบ (Infinite Solutions หรือ Dependent):</strong> เมื่อระนาบทับซ้อนกัน หรือตัดกันเป็นเส้นตรงเดียวกัน (Det(A) = 0 และดีเทอร์มิแนนต์ตัวอื่นเป็น 0 ทั้งหมด)</li>
        </ul>

        <p className="mt-6 text-gray-600 text-sm">
          การแก้ระบบสมการเชิงเส้น 3 ตัวแปร มีบทบาทสำคัญอย่างยิ่งในหลากหลายสาขาวิชา ทั้งทางด้านวิศวกรรมศาสตร์ เศรษฐศาสตร์ 
          ฟิสิกส์ การออกแบบกราฟิก 3 มิติ และศาสตร์อื่นๆ ที่ต้องการวิเคราะห์ตัวแปรที่สัมพันธ์กันหลายมิติ
        </p>
      </article>
    </div>
  );
}
