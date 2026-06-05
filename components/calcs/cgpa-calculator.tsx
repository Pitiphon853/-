"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, RotateCcw, GraduationCap } from "lucide-react";

interface SemesterRow {
  id: number;
  name: string;
  gpa: string;
  credits: string;
}

export default function CgpaCalculator({ lang }: any) {
  const [rows, setRows] = useState<SemesterRow[]>([
    { id: 1, name: "", gpa: "", credits: "" },
    { id: 2, name: "", gpa: "", credits: "" },
  ]);

  const [result, setResult] = useState<{
    cgpa: number;
    totalCredits: number;
    totalPoints: number;
    steps: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const addRow = () => {
    setRows([...rows, { id: Date.now(), name: "", gpa: "", credits: "" }]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) {
      setError(lang === "EN" ? "At least one semester is required." : "ต้องมีข้อมูลอย่างน้อย 1 เทอม");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: keyof SemesterRow, val: string) => {
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

  const calculateCgpa = () => {
    setError("");
    setResult(null);

    const validRows: { name: string; gpa: number; credits: number }[] = [];

    for (let i = 0; i < rows.length; i++) {
      const { name, gpa, credits } = rows[i];

      if (gpa.trim() === "" && credits.trim() === "") {
        continue; // Skip completely empty rows
      }

      const gpaNum = parseFloat(gpa);
      const creditsNum = parseFloat(credits);

      if (isNaN(gpaNum) || isNaN(creditsNum)) {
        setError(
          lang === "EN"
            ? `Row ${i + 1} has invalid inputs. Please enter valid numbers.`
            : `แถวที่ ${i + 1} มีข้อมูลเกรดเฉลี่ยหรือหน่วยกิตรวมไม่ถูกต้อง`
        );
        return;
      }

      if (gpaNum < 0 || gpaNum > 4) {
        setError(
          lang === "EN"
            ? `GPA in Row ${i + 1} must be between 0.00 and 4.00.`
            : `เกรดเฉลี่ยในแถวที่ ${i + 1} ต้องมีค่าอยู่ระหว่าง 0.00 ถึง 4.00`
        );
        return;
      }

      if (creditsNum <= 0) {
        setError(
          lang === "EN"
            ? `Credits in Row ${i + 1} must be greater than 0.`
            : `หน่วยกิตในแถวที่ ${i + 1} ต้องมากกว่า 0`
        );
        return;
      }

      validRows.push({
        name: name.trim() || (lang === "EN" ? `Semester ${i + 1}` : `เทอมที่ ${i + 1}`),
        gpa: gpaNum,
        credits: creditsNum,
      });
    }

    if (validRows.length === 0) {
      setError(
        lang === "EN"
          ? "Please enter GPA and credits for at least one semester."
          : "กรุณากรอกเกรดเฉลี่ย (GPA) และหน่วยกิตรวมสะสมอย่างน้อย 1 เทอม"
      );
      return;
    }

    const totalCredits = validRows.reduce((sum, r) => sum + r.credits, 0);
    const totalPoints = validRows.reduce((sum, r) => sum + r.gpa * r.credits, 0);
    const cgpa = totalPoints / totalCredits;

    // Create steps explanation
    const terms = validRows.map((r) => `(${r.gpa.toFixed(2)} * ${r.credits.toFixed(1)})`).join(" + ");
    const creditsTerm = validRows.map((r) => r.credits.toFixed(1)).join(" + ");
    const steps = `GPAX (CGPA) = [ ${terms} ] / [ ${creditsTerm} ]\n= [ ${totalPoints.toFixed(3)} ] / [ ${totalCredits.toFixed(1)} ]\n= ${cgpa.toFixed(4)} \n≈ ${cgpa.toFixed(2)}`;

    setResult({
      cgpa,
      totalCredits,
      totalPoints,
      steps,
    });
  };

  const clearData = () => {
    setRows([
      { id: 1, name: "", gpa: "", credits: "" },
      { id: 2, name: "", gpa: "", credits: "" },
    ]);
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "CGPA (GPAX) Calculator" : "เครื่องมือคำนวณเกรดเฉลี่ยสะสมหลายเทอม (GPAX / CGPA)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="py-2 px-3 w-8 text-center">#</th>
                <th className="py-2 px-3">{lang === "EN" ? "Semester Name (Optional)" : "ชื่อเทอม / ภาคการศึกษา (ไม่บังคับ)"}</th>
                <th className="py-2 px-3 w-44">{lang === "EN" ? "Semester GPA" : "เกรดเฉลี่ยประจำเทอม (GPA)"}</th>
                <th className="py-2 px-3 w-44">{lang === "EN" ? "Total Credits in Semester" : "หน่วยกิตรวมของเทอมนั้น"}</th>
                <th className="py-2 px-3 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-3 px-3 text-center text-sm font-medium text-gray-500">{index + 1}</td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder={lang === "EN" ? `e.g. Semester 1/2026` : `เช่น ม.4 เทอม 1`}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={row.gpa}
                      onChange={(e) => handleRowChange(row.id, "gpa", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 3.45"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={row.credits}
                      onChange={(e) => handleRowChange(row.id, "credits", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 15.5"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      title={lang === "EN" ? "Delete Semester" : "ลบเทอม"}
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
            {lang === "EN" ? "Add Semester" : "เพิ่มภาคการเรียน"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={calculateCgpa}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate CGPA" : "คำนวณเกรดสะสม (GPAX)"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Total Cumulative Credits" : "หน่วยกิตสะสมรวมทุกเทอม"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.totalCredits.toFixed(1)}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Total Cumulative Grade Points" : "ผลแต้มสะสมรวมทุกเทอม"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.totalPoints.toFixed(2)}
                </p>
              </div>

              <div className="bg-purple-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-purple-100 mb-1">
                  {lang === "EN" ? "Cumulative GPA (GPAX)" : "เกรดเฉลี่ยสะสมรวม (GPAX)"}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.cgpa.toFixed(2)}
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

      <article className="mt-16 prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">เกรดสะสมรวมทุกเทอม (GPAX / CGPA) คืออะไร?</h2>
        <p>
          ในการวัดประสิทธิภาพการเรียนของนักเรียนหรือนักศึกษาตลอดหลักสูตรการศึกษา <strong>GPAX (Grade Point Average Cumulative)</strong> หรือ <strong>CGPA (Cumulative Grade Point Average)</strong> คือ <strong>"เกรดเฉลี่ยสะสมรวม"</strong> ของผลการเรียนทุกภาคเรียนหรือหลายๆ ภาคเรียนรวมกัน ซึ่งแตกต่างจาก GPA ของเทอมเดี่ยวๆ เนื่องจากเป็นการสะสมข้อมูลผลสัมฤทธิ์ทั้งหมดที่คุณได้ศึกษามาตั้งแต่ต้น
        </p>
        <p>
          หัวใจสำคัญของการคิดเกรดสะสมรวม (GPAX) ที่หลายคนอาจจะสับสนคือ <em>เราไม่สามารถนำเกรดเฉลี่ย (GPA) ของแต่ละภาคการศึกษามาบวกกันแล้วหารด้วยจำนวนเทอมโดยตรงได้</em> เว้นเสียแต่ว่าจำนวนหน่วยกิตรวมของแต่ละภาคเรียนจะเท่ากันทุกประการ แต่ในความเป็นจริง หน่วยกิตรวมในแต่ละเทอมมักแตกต่างกัน ดังนั้น วิธีการคำนวณ GPAX จึงจำเป็นต้องใช้วิธีหาค่าเฉลี่ยถ่วงน้ำหนักโดยอิงหน่วยกิตสะสมที่แท้จริง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคิดเกรดเฉลี่ยสะสมรวม (GPAX)</h3>
        <p>
          การคำนวณ GPAX จะนำเกรดเฉลี่ยแต่ละเทอมคูณกับจำนวนหน่วยกิตสะสมรวมของเทอมนั้นๆ เพื่อหาผลรวมของแต้มคะแนน แล้วหารด้วยหน่วยกิตรวมสะสมของทุกเทอม:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="font-serif text-2xl font-bold text-purple-600 dark:text-purple-400">
            $\text{"{"}GPAX{"}"} = \frac{"{"}\sum (\text{"{"}GPA{"}"}_i \cdot \text{"{"}หน่วยกิต{"}"}_i){"}"}{"{"}\sum \text{"{"}หน่วยกิต{"}"}_i{"}"}$
          </p>
          <div className="mt-3 text-sm text-left inline-block">
            <p>ความหมายของตัวแปร:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>$\text{"{"}GPA{"}"}_i$ คือ เกรดเฉลี่ยของเทอมที่ $i$</li>
              <li>$\text{"{"}หน่วยกิต{"}"}_i$ คือ จำนวนหน่วยกิตสะสมทั้งหมดของเทอมที่ $i$</li>
              <li>$\sum (\text{"{"}GPA{"}"}_i \cdot \text{"{"}หน่วยกิต{"}"}_i)$ คือ ผลรวมของคะแนนถ่วงน้ำหนักทุกเทอม</li>
              <li>$\sum \text{"{"}หน่วยกิต{"}"}_i$ คือ หน่วยกิตสะสมรวมทุกเทอมรวมกัน</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างเปรียบเทียบข้อผิดพลาดในการคำนวณ GPAX</h3>
        <p>
          สมมติว่าคุณต้องการคำนวณเกรดสะสมรวมของ 2 ภาคเรียน:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>เทอมที่ 1:</strong> GPA = 3.80 (หน่วยกิตรวม = 20.0)</li>
          <li><strong>เทอมที่ 2:</strong> GPA = 2.90 (หน่วยกิตรวม = 10.0)</li>
        </ul>
        <p>
          <strong>วิธีที่ผิด (เฉลี่ยตรงๆ):</strong> $(3.80 + 2.90) / 2 = 3.35$
        </p>
        <p>
          <strong>วิธีที่ถูกต้อง (ถ่วงน้ำหนักหน่วยกิต):</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>คำนวณแต้มคะแนนรวมสะสม:</strong>
            <br />
            $\sum (\text{"{"}GPA{"}"}_i \cdot \text{"{"}หน่วยกิต{"}"}_i) = (3.80 \cdot 20.0) + (2.90 \cdot 10.0) = 76.0 + 29.0 = 105.0$
          </li>
          <li><strong>หาผลรวมหน่วยกิตรวมสะสม:</strong>
            <br />
            $\sum \text{"{"}หน่วยกิต{"}"}_i = 20.0 + 10.0 = 30.0$
          </li>
          <li><strong>คำนวณเกรดเฉลี่ยสะสม:</strong>
            <br />
            $\text{"{"}GPAX{"}"} = 105.0 / 30.0 = 3.50$
          </li>
        </ol>
        <p>
          จะเห็นได้ว่าเกรดเฉลี่ยสะสมจริงคือ 3.50 ซึ่งแตกต่างกับ 3.35 อย่างชัดเจน เนื่องจากเทอมที่ 1 ที่ทำผลการเรียนได้ดีมีหน่วยกิตที่เรียนมากกว่าเทอมที่ 2 ถึงสองเท่าตัว
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประโยชน์ของ GPAX ในระบบคัดเลือกเข้าเรียนต่อ (TCAS) ของไทย</h3>
        <p>
          ในระบบรับสมัครและคัดเลือกบุคคลเข้าศึกษาต่อระดับอุดมศึกษาในประเทศไทย (TCAS) เกรดเฉลี่ยสะสมรวมหรือ GPAX มีความสำคัญอย่างยิ่งยวด:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>รอบที่ 1 Portfolio:</strong> คณะและมหาวิทยาลัยชั้นนำเกือบทุกแห่งมักกำหนดเกรดเฉลี่ยสะสม 5 ภาคเรียนขั้นต่ำในการยื่นแฟ้มสะสมผลงาน</li>
          <li><strong>รอบที่ 2 Quota:</strong> ใช้ GPAX เป็นหนึ่งในส่วนคะแนนร่วมพิจารณาความพร้อมด้านการศึกษาของผู้สมัครในเขตพื้นที่หรือเงื่อนไขพิเศษ</li>
          <li><strong>รอบที่ 3 Admission:</strong> ใช้ GPAX เป็นสัดส่วนคะแนนดิบ โดยนำไปคำนวณร่วมกับคะแนนสอบอื่นๆ (เช่น TGAT, TPAT, A-Level) หรือใช้เป็นเกณฑ์ขั้นต่ำในการสมัคร</li>
        </ul>
        <p>
          ด้วยเครื่องคำนวณเกรดเฉลี่ยสะสมหลายเทอมนี้ จะช่วยให้คุณประเมินสถานการณ์ความก้าวหน้าทางการเรียนได้อย่างมั่นใจ เพียงป้อน GPA และจำนวนหน่วยกิตสะสมรวมรายเทอม ระบบจะประมวลผลออกมาให้ทันทีเพื่อใช้วางแผนอนาคตการเรียนต่อของคุณได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}
