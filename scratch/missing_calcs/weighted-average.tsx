"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, RotateCcw } from "lucide-react";

interface RowItem {
  id: number;
  value: string;
  weight: string;
}

export default function WeightedAverageCalculator({ lang }: any) {
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, value: "", weight: "" },
    { id: 2, value: "", weight: "" },
    { id: 3, value: "", weight: "" },
  ]);
  const [result, setResult] = useState<{
    weightedSum: number;
    totalWeight: number;
    weightedAverage: number;
    steps: string;
    details: { value: number; weight: number; product: number }[];
  } | null>(null);
  const [error, setError] = useState<string>("");

  const addRow = () => {
    setRows([...rows, { id: Date.now(), value: "", weight: "" }]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) {
      setError(lang === "EN" ? "At least one row is required." : "ต้องมีข้อมูลอย่างน้อย 1 แถว");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: "value" | "weight", val: string) => {
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

  const calculateWeightedAverage = () => {
    setError("");
    setResult(null);

    const validRows: { value: number; weight: number }[] = [];

    for (let i = 0; i < rows.length; i++) {
      const { value, weight } = rows[i];
      if (value.trim() === "" && weight.trim() === "") {
        continue; // skip empty rows
      }

      const valNum = parseFloat(value);
      const weightNum = parseFloat(weight);

      if (isNaN(valNum) || isNaN(weightNum)) {
        setError(
          lang === "EN"
            ? `Row ${i + 1} contains invalid input. Please enter valid numbers.`
            : `แถวที่ ${i + 1} มีข้อมูลไม่ถูกต้อง กรุณากรอกตัวเลขที่ถูกต้อง`
        );
        return;
      }

      if (weightNum < 0) {
        setError(
          lang === "EN"
            ? `Weight in Row ${i + 1} cannot be negative.`
            : `ค่าน้ำหนักในแถวที่ ${i + 1} ไม่สามารถเป็นค่าติดลบได้`
        );
        return;
      }

      validRows.push({ value: valNum, weight: weightNum });
    }

    if (validRows.length === 0) {
      setError(
        lang === "EN"
          ? "Please enter at least one value and weight pair."
          : "กรุณากรอกข้อมูลค่าและค่าน้ำหนักอย่างน้อย 1 คู่"
      );
      return;
    }

    const totalWeight = validRows.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) {
      setError(
        lang === "EN"
          ? "Total weight cannot be zero."
          : "ผลรวมค่าน้ำหนักทั้งหมดต้องไม่เท่ากับ 0"
      );
      return;
    }

    const details = validRows.map((item) => ({
      value: item.value,
      weight: item.weight,
      product: item.value * item.weight,
    }));

    const weightedSum = details.reduce((sum, item) => sum + item.product, 0);
    const weightedAverage = weightedSum / totalWeight;

    // Build math step explanation
    const terms = details.map((item) => `(${item.value} * ${item.weight})`).join(" + ");
    const weightTerms = details.map((item) => item.weight).join(" + ");
    const steps = `Weighted Average = [ ${terms} ] / [ ${weightTerms} ]\n= [ ${weightedSum.toLocaleString("en-US", {
      maximumFractionDigits: 4,
    })} ] / [ ${totalWeight.toLocaleString("en-US", { maximumFractionDigits: 4 })} ]\n= ${weightedAverage.toLocaleString("en-US", {
      maximumFractionDigits: 6,
    })}`;

    setResult({
      weightedSum,
      totalWeight,
      weightedAverage,
      steps,
      details,
    });
  };

  const clearData = () => {
    setRows([
      { id: 1, value: "", weight: "" },
      { id: 2, value: "", weight: "" },
      { id: 3, value: "", weight: "" },
    ]);
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Weighted Average Calculator" : "เครื่องมือคำนวณหาค่าเฉลี่ยถ่วงน้ำหนัก (Weighted Average)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="py-2 px-3 w-12 text-center">#</th>
                <th className="py-2 px-3">{lang === "EN" ? "Value (Score)" : "ค่าข้อมูล (คะแนน / ค่า)"}</th>
                <th className="py-2 px-3">{lang === "EN" ? "Weight (Credits/Importance)" : "น้ำหนัก (หน่วยกิต / ความสำคัญ)"}</th>
                <th className="py-2 px-3 w-16 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-3 px-3 text-center text-sm font-medium text-gray-500">{index + 1}</td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="any"
                      value={row.value}
                      onChange={(e) => handleRowChange(row.id, "value", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. 85"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="any"
                      value={row.weight}
                      onChange={(e) => handleRowChange(row.id, "weight", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. 3"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
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

        <div className="flex flex-wrap gap-3">
          <button
            onClick={addRow}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            {lang === "EN" ? "Add Item" : "เพิ่มรายการ"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={calculateWeightedAverage}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Average" : "คำนวณค่าเฉลี่ยถ่วงน้ำหนัก"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Sum of Weighted Values" : "ผลคูณข้อมูลกับน้ำหนัก (Σ w·x)"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.weightedSum.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Total Weight" : "ผลรวมค่าน้ำหนัก (Σ w)"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {result.totalWeight.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>

              <div className="bg-blue-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-blue-100 mb-1">
                  {lang === "EN" ? "Weighted Average" : "ค่าเฉลี่ยถ่วงน้ำหนัก"}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.weightedAverage.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {lang === "EN" ? "Step-by-Step Explanation" : "แสดงวิธีทำคณิตศาสตร์:"}
              </h4>
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                {result.steps}
              </pre>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">ค่าเฉลี่ยถ่วงน้ำหนัก (Weighted Average) คืออะไร?</h2>
        <p>
          ในวิชาคณิตศาสตร์และวิเคราะห์สถิติ <strong>ค่าเฉลี่ยถ่วงน้ำหนัก (Weighted Average หรือ Weighted Mean)</strong> คือ ค่าเฉลี่ยเลขคณิตของข้อมูลที่แต่ละจุดข้อมูลมีความสำคัญหรือน้ำหนัก (Weight) ไม่เท่ากัน ต่างจากค่าเฉลี่ยธรรมดา (Simple Average) ที่จะถือว่าข้อมูลทุกตัวมีน้ำหนักความสำคัญเท่าเทียมกันทั้งหมด
        </p>
        <p>
          การคิดค่าเฉลี่ยถ่วงน้ำหนักจะช่วยป้องกันไม่ให้ข้อมูลที่มีความสำคัญน้อยเข้ามาดึงตัวเลขค่าเฉลี่ยให้ผิดไปจากความจริง เช่น การคิดเกรดเฉลี่ยสะสม (GPA) วิชาที่มีหน่วยกิตเยอะ (เช่น 3 หน่วยกิต) ย่อมมีน้ำหนักต่อเกรดเฉลี่ยมากกว่าวิชาที่มีหน่วยกิตน้อย (เช่น 1 หน่วยกิต)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการหาค่าเฉลี่ยถ่วงน้ำหนัก</h3>
        <p>
          สูตรพื้นฐานที่ใช้ในการคำนวณ มีรูปแบบดังนี้:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="font-serif text-2xl font-bold text-blue-600 dark:text-blue-400">
            $W.A. = \frac{\sum (w_i \cdot x_i)}{\sum w_i}$
          </p>
          <div className="mt-3 text-sm text-left inline-block">
            <p>ความหมายของตัวแปร:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>$x_i$ คือ ค่าข้อมูล หรือคะแนนในรายการที่ $i$</li>
              <li>$w_i$ คือ น้ำหนัก (Weight) หรือความสำคัญ หรือหน่วยกิตของข้อมูลในรายการที่ $i$</li>
              <li>$\sum (w_i \cdot x_i)$ คือ ผลรวมของคูณระหว่างข้อมูลแต่ละตัวกับน้ำหนักของตัวมันเอง</li>
              <li>$\sum w_i$ คือ ผลรวมของน้ำหนักทั้งหมด</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างรูปธรรมในการคำนวณค่าเฉลี่ยถ่วงน้ำหนัก</h3>
        <p>
          สมมติว่าคุณเป็นนักศึกษาและต้องการคิดเกรดเฉลี่ยสะสมวิชาเรียนในภาคเรียนนี้ โดยได้วิชาต่างๆ ดังนี้:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>วิชาคณิตศาสตร์:</strong> เกรด 4.00 (น้ำหนัก/หน่วยกิต = 3.0)</li>
          <li><strong>วิชาฟิสิกส์:</strong> เกรด 3.00 (น้ำหนัก/หน่วยกิต = 3.0)</li>
          <li><strong>วิชาพละศึกษา:</strong> เกรด 2.00 (น้ำหนัก/หน่วยกิต = 1.0)</li>
        </ul>
        <p>
          หากหาค่าเฉลี่ยแบบทั่วไป: $(4.00 + 3.00 + 2.00) / 3 = 3.00$
        </p>
        <p>
          แต่หากคิดตาม <strong>ค่าเฉลี่ยถ่วงน้ำหนัก (ซึ่งเป็นวิธีคิดเกรดเฉลี่ยที่ถูกต้อง):</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>หาผลรวมของผลคูณ (เกรด * หน่วยกิต):</strong>
            <br />
            $\sum (w_i \cdot x_i) = (3.0 \cdot 4.00) + (3.0 \cdot 3.00) + (1.0 \cdot 2.00) = 12.0 + 9.0 + 2.0 = 23.0$
          </li>
          <li><strong>หาผลรวมของน้ำหนัก/หน่วยกิตทั้งหมด:</strong>
            <br />
            $\sum w_i = 3.0 + 3.0 + 1.0 = 7.0$
          </li>
          <li><strong>คำนวณเกรดเฉลี่ย:</strong>
            <br />
            $\text{เกรดเฉลี่ยถ่วงน้ำหนัก} = 23.0 / 7.0 \approx 3.29$
          </li>
        </ol>
        <p>
          จะเห็นได้ว่าเกรดเฉลี่ยจริงคือ 3.29 ซึ่งสูงกว่าการคิดเฉลี่ยแบบธรรมดา (3.00) เนื่องจากวิชาคณิตศาสตร์ซึ่งได้เกรดดีนั้นมีหน่วยกิตความสำคัญเยอะกว่าวิชาพละศึกษา
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">การประยุกต์ใช้ในตลาดหุ้นและพอร์ตการลงทุน</h3>
        <p>
          นอกเหนือจากเรื่องการเรียนแล้ว ค่าเฉลี่ยถ่วงน้ำหนักยังมีบทบาทสำคัญในด้านการเงิน เช่น:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>การคำนวณผลตอบแทนพอร์ตลงทุน (Portfolio Return):</strong> หากซื้อหุ้น 3 ตัวด้วยสัดส่วนวงเงินลงทุนที่ไม่เท่ากัน ผลตอบแทนรวมจะต้องถ่วงน้ำหนักด้วยมูลค่าของเงินลงทุนในแต่ละหุ้นตัวนั้น</li>
          <li><strong>การเฉลี่ยต้นทุนการซื้อหุ้น (DCA):</strong> เมื่อคุณซื้อหุ้นจำนวนเดิมในแต่ละเดือนด้วยราคาที่ไม่เท่ากัน ต้นทุนเฉลี่ยของหุ้นต่อตัวจะคิดด้วยค่าเฉลี่ยถ่วงน้ำหนัก ไม่ใช่การเฉลี่ยธรรมดา</li>
        </ul>
        <p>
          ระบบคำนวณค่าเฉลี่ยถ่วงน้ำหนักนี้ออกแบบขึ้นมาเพื่อให้คุณกรอกข้อมูลและระบุระดับน้ำหนักได้อย่างคล่องตัว มีช่องสำหรับเพิ่มหรือลดแถวรายการได้อย่างไม่จำกัด พร้อมโชว์สูตรแก้โจทย์เลขทีละบรรทัดเพื่อความมั่นใจในความถูกต้องของงานของคุณ
        </p>
      </article>
    </div>
  );
}
