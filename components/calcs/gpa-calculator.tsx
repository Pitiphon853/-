"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, RotateCcw, GraduationCap } from "lucide-react";

interface SubjectRow {
  id: number;
  name: string;
  gradePoint: string;
  credits: string;
}

const GRADE_OPTIONS = [
  { label: "A (4.00)", value: "4.0" },
  { label: "B+ (3.50)", value: "3.5" },
  { label: "B (3.00)", value: "3.0" },
  { label: "C+ (2.50)", value: "2.5" },
  { label: "C (2.00)", value: "2.0" },
  { label: "D+ (1.50)", value: "1.5" },
  { label: "D (1.00)", value: "1.0" },
  { label: "F (0.00)", value: "0.0" },
];

export default function GpaCalculator({ lang }: any) {
  const [rows, setRows] = useState<SubjectRow[]>([
    { id: 1, name: "", gradePoint: "4.0", credits: "1.5" },
    { id: 2, name: "", gradePoint: "3.0", credits: "1.5" },
    { id: 3, name: "", gradePoint: "3.5", credits: "3.0" },
    { id: 4, name: "", gradePoint: "2.0", credits: "1.0" },
  ]);

  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    steps: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const addRow = () => {
    setRows([...rows, { id: Date.now(), name: "", gradePoint: "4.0", credits: "1.5" }]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) {
      setError(lang === "EN" ? "At least one subject is required." : "ต้องมีวิชาเรียนอย่างน้อย 1 วิชา");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: keyof SubjectRow, val: string) => {
    setError("");
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: val };
        }
        return row;
      })
    );
  };

  const calculateGpa = () => {
    setError("");
    setResult(null);

    const validRows: { name: string; gradePoint: number; credits: number }[] = [];

    for (let i = 0; i < rows.length; i++) {
      const { name, gradePoint, credits } = rows[i];

      if (credits.trim() === "") {
        continue; // Skip rows with empty credits
      }

      const gp = parseFloat(gradePoint);
      const cred = parseFloat(credits);

      if (isNaN(gp) || isNaN(cred)) {
        setError(
          lang === "EN"
            ? `Row ${i + 1} has invalid inputs. Please enter valid numbers.`
            : `แถวที่ ${i + 1} มีวิชาเรียนที่ระบุเกรดหรือหน่วยกิตไม่ถูกต้อง`
        );
        return;
      }

      if (cred <= 0) {
        setError(
          lang === "EN"
            ? `Credits in Row ${i + 1} must be greater than 0.`
            : `จำนวนหน่วยกิตในแถวที่ ${i + 1} ต้องมากกว่า 0`
        );
        return;
      }

      validRows.push({
        name: name.trim() || (lang === "EN" ? `Subject ${i + 1}` : `วิชาที่ ${i + 1}`),
        gradePoint: gp,
        credits: cred,
      });
    }

    if (validRows.length === 0) {
      setError(
        lang === "EN"
          ? "Please enter grades and credits for at least one subject."
          : "กรุณากรอกข้อมูลเกรดและหน่วยกิตอย่างน้อย 1 วิชา"
      );
      return;
    }

    const totalCredits = validRows.reduce((sum, r) => sum + r.credits, 0);
    const totalPoints = validRows.reduce((sum, r) => sum + r.gradePoint * r.credits, 0);
    const gpa = totalPoints / totalCredits;

    // Create steps
    const terms = validRows.map((r) => `(${r.gradePoint.toFixed(2)} * ${r.credits.toFixed(1)})`).join(" + ");
    const creditsTerm = validRows.map((r) => r.credits.toFixed(1)).join(" + ");
    const steps = `GPA = [ ${terms} ] / [ ${creditsTerm} ]\n= [ ${totalPoints.toFixed(3)} ] / [ ${totalCredits.toFixed(1)} ]\n= ${gpa.toFixed(4)} \n≈ ${gpa.toFixed(2)}`;

    setResult({
      gpa,
      totalCredits,
      totalPoints,
      steps,
    });
  };

  const clearData = () => {
    setRows([
      { id: 1, name: "", gradePoint: "4.0", credits: "1.5" },
      { id: 2, name: "", gradePoint: "3.0", credits: "1.5" },
      { id: 3, name: "", gradePoint: "3.5", credits: "3.0" },
      { id: 4, name: "", gradePoint: "2.0", credits: "1.0" },
    ]);
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "GPA Calculator" : "เครื่องมือคำนวณเกรดเฉลี่ยประจำเทอม (GPA)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="py-2 px-3 w-8 text-center">#</th>
                <th className="py-2 px-3">{lang === "EN" ? "Subject Name (Optional)" : "ชื่อวิชา (ไม่บังคับ)"}</th>
                <th className="py-2 px-3 w-44">{lang === "EN" ? "Grade" : "เกรด"}</th>
                <th className="py-2 px-3 w-32">{lang === "EN" ? "Credits" : "หน่วยกิต"}</th>
                <th className="py-2 px-3 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-55/50 dark:hover:bg-gray-800/30">
                  <td className="py-3 px-3 text-center text-sm font-medium text-gray-500">{index + 1}</td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                      placeholder={lang === "EN" ? `e.g. Science` : `เช่น วิทยาศาสตร์`}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select
                      value={row.gradePoint}
                      onChange={(e) => handleRowChange(row.id, "gradePoint", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                    >
                      {GRADE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={row.credits}
                      onChange={(e) => handleRowChange(row.id, "credits", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 1.5"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-55 dark:hover:bg-red-900/20 transition-all"
                      title={lang === "EN" ? "Delete Row" : "ลบแถว"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3">
          <button
            onClick={addRow}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl font-medium transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            {lang === "EN" ? "Add Subject" : "เพิ่มวิชาเรียน"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={calculateGpa}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate GPA" : "คำนวณเกรดเฉลี่ย (GPA)"}
          </button>
          <button
            onClick={clearData}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold transition-all active:scale-95"
            title={lang === "EN" ? "Clear" : "ล้างข้อมูล"}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Total Credits" : "หน่วยกิตรวมประจำเทอม"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.totalCredits.toFixed(1)}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Total Grade Points" : "ผลรวมแต้มคะแนนสะสม"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.totalPoints.toFixed(2)}
                </p>
              </div>

              <div className="bg-emerald-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-emerald-100 mb-1">
                  {lang === "EN" ? "Grade Point Average (GPA)" : "เกรดเฉลี่ยประจำเทอม (GPA)"}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.gpa.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {lang === "EN" ? "Step-by-Step Explanation" : "แสดงรายละเอียดวิธีคำนวณ:"}
              </h4>
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                {result.steps}
              </pre>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-emerald dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">เกรดเฉลี่ย (GPA) คืออะไร?</h2>
        <p>
          <strong>GPA ย่อมาจาก Grade Point Average</strong> หรือที่ภาษาไทยเรียกว่า <strong>"เกรดเฉลี่ย"</strong> เป็นค่าวัดทางสถิติระดับการศึกษาที่แสดงถึงระดับผลการเรียนเฉลี่ยของนักเรียนหรือนักศึกษาในภาคการศึกษาหนึ่งๆ (ประจำเทอม) การคำนวณเกรดเฉลี่ยแบบนี้ไม่ได้อาศัยค่าเฉลี่ยแบบบวกกันแล้วหารด้วยจำนวนวิชาโดยตรง แต่จะต้องนำ <strong>หน่วยกิต (Credits)</strong> ของแต่ละวิชาเข้ามามีส่วนในการร่วมถ่วงน้ำหนักความสำคัญด้วย
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">แต้มระดับคะแนน (Grade Points) ในสถาบันการศึกษาไทย</h3>
        <p>
          ในระบบการศึกษาขั้นพื้นฐานและระดับอุดมศึกษาของประเทศไทยส่วนใหญ่จะกำหนดให้เกรดที่เป็นตัวอักษรมีแต้มคะแนนสำหรับใช้คำนวณ GPA ดังนี้:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-250 dark:divide-gray-700 my-4 text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left font-semibold">
                <th className="py-2 px-4">ระดับผลการเรียน (Grade)</th>
                <th className="py-2 px-4">ความหมายของเกรด</th>
                <th className="py-2 px-4">แต้มคะแนน (Grade Point)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="py-2 px-4 font-bold">A</td>
                <td className="py-2 px-4">ดีเยี่ยม (Excellent)</td>
                <td className="py-2 px-4">4.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">B+</td>
                <td className="py-2 px-4">ดีมาก (Very Good)</td>
                <td className="py-2 px-4">3.50</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">B</td>
                <td className="py-2 px-4">ดี (Good)</td>
                <td className="py-2 px-4">3.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">C+</td>
                <td className="py-2 px-4">ดีพอใช้ (Fairly Good)</td>
                <td className="py-2 px-4">2.50</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">C</td>
                <td className="py-2 px-4">พอใช้ (Fair)</td>
                <td className="py-2 px-4">2.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">D+</td>
                <td className="py-2 px-4">อ่อน (Poor)</td>
                <td className="py-2 px-4">1.50</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">D</td>
                <td className="py-2 px-4">อ่อนมาก (Very Poor)</td>
                <td className="py-2 px-4">1.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold">F</td>
                <td className="py-2 px-4">ตก/ไม่ผ่าน (Failed)</td>
                <td className="py-2 px-4">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรที่ใช้ในการคิดเกรดเฉลี่ย (GPA)</h3>
        <p>
          สูตรคิด GPA จะนำความรู้เรื่องค่าเฉลี่ยถ่วงน้ำหนักมาใช้ โดยนำ <em>แต้มคะแนนคูณหน่วยกิตของแต่ละวิชา</em> แล้วหารด้วย <em>ผลรวมหน่วยกิตทั้งหมดของเทอมนั้น</em>:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            $\text{"{"}GPA{"}"} = \frac{"{"}\sum (\text{"{"}เกรด{"}"}_i \cdot \text{"{"}หน่วยกิต{"}"}_i){"}"}{"{"}\sum \text{"{"}หน่วยกิต{"}"}_i{"}"}$
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างวิธีการคิดเกรดเฉลี่ยในภาคเรียน</h3>
        <p>
          สมมติในภาคเรียนนี้ คุณลงทะเบียนวิชาเรียน 4 วิชาด้วยกัน ได้แก่:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>วิชาภาษาไทย (3 หน่วยกิต):</strong> สอบได้เกรด B (3.0) &rarr; คิดเป็นแต้มรวมได้ $3 \cdot 3.0 = 9.0$</li>
          <li><strong>วิชาคณิตศาสตร์ (1.5 หน่วยกิต):</strong> สอบได้เกรด A (4.0) &rarr; คิดเป็นแต้มรวมได้ $1.5 \cdot 4.0 = 6.0$</li>
          <li><strong>วิชาเคมี (1.5 หน่วยกิต):</strong> สอบได้เกรด B+ (3.5) &rarr; คิดเป็นแต้มรวมได้ $1.5 \cdot 3.5 = 5.25$</li>
          <li><strong>วิชาพละศึกษา (0.5 หน่วยกิต):</strong> สอบได้เกรด C (2.0) &rarr; คิดเป็นแต้มรวมได้ $0.5 \cdot 2.0 = 1.0$</li>
        </ol>
        <p>
          <strong>ขั้นตอนสุดท้ายในการคิดเกรด:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>หาผลรวมแต้มระดับคะแนนสะสม:</strong> $9.0 + 6.0 + 5.25 + 1.0 = 21.25$</li>
          <li><strong>หาผลรวมหน่วยกิตสะสมในภาคเรียน:</strong> $3 + 1.5 + 1.5 + 0.5 = 6.5$ หน่วยกิต</li>
          <li><strong>หารหาเกรดเฉลี่ยสะสมประจำภาคการศึกษา:</strong> GPA = $21.25 / 6.5 \approx 3.27$</li>
        </ul>
        <p>
          ดังนั้น เกรดเฉลี่ยสะสมประจำเทอมนี้ของคุณคือ <strong>3.27</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมเกรดเฉลี่ยจึงมีความสำคัญต่อชีวิตนักเรียนนักศึกษา?</h3>
        <p>
          เกรดเฉลี่ยไม่ใช่แค่ตัวเลขวัดระดับผลการเรียนธรรมดา แต่ยังมีประโยชน์อย่างมากต่อการกำหนดอนาคตการศึกษา:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>การยื่นพิจารณารับตรง (TCAS):</strong> มหาวิทยาลัยหลายแห่งกำหนดเกรดขั้นต่ำในการเข้าเรียนหรือใช้เกรดเฉลี่ยสะสมเป็นเปอร์เซ็นต์ส่วนแบ่งในคะแนนรวมของรอบพอร์ตหรือโควตา</li>
          <li><strong>สิทธิสมัครชิงทุนการศึกษา:</strong> ทุนส่วนใหญ่มักมีเงื่อนไขว่าจะต้องได้ GPA ไม่ต่ำกว่า 3.00 หรือ 3.50 ในแต่ละปีหรือเทอม</li>
          <li><strong>การรักษาเกียรตินิยม:</strong> ในระดับอุดมศึกษา การได้รับเกียรตินิยมอันดับ 1 หรืออันดับ 2 จะอิงคะแนนเกรดเฉลี่ยสะสมรวมเมื่อเรียนจบหลักสูตร</li>
        </ul>
        <p>
          ด้วยเครื่องคำนวณเกรดเฉลี่ย GPA นี้ คุณเพียงเลือกระบุเกรดที่สอบได้และพิมพ์กรอกจำนวนหน่วยกิตวิชานั้นๆ โปรแกรมจะช่วยคำนวณออกมาเป็นผลลัพธ์ที่ถูกต้อง รวดเร็ว ป้องกันการคิดเลขผิดเพี้ยนในการประเมินคะแนนประจำเทอมของคุณ
        </p>
      </article>
    </div>
  );
}
