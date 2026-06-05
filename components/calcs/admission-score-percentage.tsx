"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, RotateCcw, Award, CheckCircle, AlertTriangle } from "lucide-react";

interface AdmissionRow {
  id: number;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

export default function AdmissionScorePercentageCalculator({ lang }: any) {
  const [rows, setRows] = useState<AdmissionRow[]>([
    { id: 1, name: "GPAX", score: "3.5", maxScore: "4.0", weight: "20" },
    { id: 2, name: "TGAT", score: "70", maxScore: "100", weight: "30" },
    { id: 3, name: "TPAT / A-Level", score: "65", maxScore: "100", weight: "50" },
  ]);

  const [cutoffScore, setCutoffScore] = useState<string>("");
  const [cutoffScale, setCutoffScale] = useState<"PERCENT" | "POINTS_10K" | "POINTS_30K">("PERCENT");

  const [result, setResult] = useState<{
    totalWeight: number;
    scorePercent: number;
    points10k: number;
    points30k: number;
    cutoffDiff: number | null;
    cutoffDiffPercent: number | null;
    details: { name: string; score: number; maxScore: number; weight: number; contribution: number }[];
  } | null>(null);

  const [error, setError] = useState<string>("");

  const addRow = () => {
    setRows([...rows, { id: Date.now(), name: "", score: "", maxScore: "100", weight: "" }]);
  };

  const removeRow = (id: number) => {
    if (rows.length <= 1) {
      setError(lang === "EN" ? "At least one criteria is required." : "ต้องมีเกณฑ์คำนวณอย่างน้อย 1 รายการ");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: number, field: keyof AdmissionRow, val: string) => {
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

  const calculateAdmissionScore = () => {
    setError("");
    setResult(null);

    const validRows: { name: string; score: number; maxScore: number; weight: number }[] = [];

    for (let i = 0; i < rows.length; i++) {
      const { name, score, maxScore, weight } = rows[i];

      if (score.trim() === "" && weight.trim() === "") {
        continue;
      }

      const s = parseFloat(score);
      const m = parseFloat(maxScore);
      const w = parseFloat(weight);

      if (isNaN(s) || isNaN(m) || isNaN(w)) {
        setError(
          lang === "EN"
            ? `Row ${i + 1} has invalid inputs. Please enter valid numbers.`
            : `แถวที่ ${i + 1} มีข้อมูลไม่ถูกต้อง กรุณากรอกตัวเลขที่ถูกต้อง`
        );
        return;
      }

      if (m <= 0) {
        setError(
          lang === "EN"
            ? `Max Score in Row ${i + 1} must be greater than 0.`
            : `คะแนนเต็มในแถวที่ ${i + 1} ต้องมากกว่า 0`
        );
        return;
      }

      if (s < 0 || s > m) {
        setError(
          lang === "EN"
            ? `Score in Row ${i + 1} must be between 0 and ${m}.`
            : `คะแนนที่ได้ในแถวที่ ${i + 1} ต้องอยู่ระหว่าง 0 ถึงคะแนนเต็ม (${m})`
        );
        return;
      }

      if (w < 0) {
        setError(
          lang === "EN"
            ? `Weight in Row ${i + 1} cannot be negative.`
            : `ค่าน้ำหนักสัดส่วนในแถวที่ ${i + 1} ต้องไม่เป็นค่าติดลบ`
        );
        return;
      }

      validRows.push({
        name: name.trim() || (lang === "EN" ? `Criteria ${i + 1}` : `เกณฑ์ที่ ${i + 1}`),
        score: s,
        maxScore: m,
        weight: w,
      });
    }

    if (validRows.length === 0) {
      setError(
        lang === "EN"
          ? "Please enter score, max score, and weight for at least one criteria."
          : "กรุณากรอกข้อมูลคะแนนและค่าน้ำหนักอย่างน้อย 1 รายการ"
      );
      return;
    }

    const totalWeight = validRows.reduce((sum, r) => sum + r.weight, 0);
    if (totalWeight <= 0) {
      setError(
        lang === "EN"
          ? "Total weight must be greater than 0%."
          : "ผลรวมค่าน้ำหนักสัดส่วนต้องมากกว่า 0%"
      );
      return;
    }

    const details = validRows.map((r) => {
      const contribution = (r.score / r.maxScore) * r.weight;
      return {
        ...r,
        contribution,
      };
    });

    // Score out of the cumulative weight sum
    const totalEarnedWeight = details.reduce((sum, r) => sum + r.contribution, 0);
    
    // Convert to percentage (out of 100)
    const scorePercent = (totalEarnedWeight / totalWeight) * 100;
    const points10k = (scorePercent / 100) * 10000;
    const points30k = (scorePercent / 100) * 30000;

    // Cutoff comparison
    let cutoffDiff: number | null = null;
    let cutoffDiffPercent: number | null = null;

    if (cutoffScore.trim() !== "") {
      const cutVal = parseFloat(cutoffScore);
      if (!isNaN(cutVal)) {
        let userComparableScore = scorePercent;
        if (cutoffScale === "POINTS_10K") {
          userComparableScore = points10k;
        } else if (cutoffScale === "POINTS_30K") {
          userComparableScore = points30k;
        }
        cutoffDiff = userComparableScore - cutVal;
        cutoffDiffPercent = (cutoffDiff / cutVal) * 100;
      }
    }

    setResult({
      totalWeight,
      scorePercent,
      points10k,
      points30k,
      cutoffDiff,
      cutoffDiffPercent,
      details,
    });
  };

  const clearData = () => {
    setRows([
      { id: 1, name: "GPAX", score: "3.5", maxScore: "4.0", weight: "20" },
      { id: 2, name: "TGAT", score: "70", maxScore: "100", weight: "30" },
      { id: 3, name: "TPAT / A-Level", score: "65", maxScore: "100", weight: "50" },
    ]);
    setCutoffScore("");
    setCutoffScale("PERCENT");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Admission Score & Percent Calculator" : "เครื่องมือคำนวณเปรียบเทียบเปอร์เซ็นต์คะแนนสอบคัดเลือก"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="py-2 px-3 w-8 text-center">#</th>
                <th className="py-2 px-3">{lang === "EN" ? "Admission Subject / Criteria" : "วิชาสอบ / เกณฑ์ที่ใช้"}</th>
                <th className="py-2 px-3 w-32">{lang === "EN" ? "Your Score" : "คะแนนที่ได้"}</th>
                <th className="py-2 px-3 w-32">{lang === "EN" ? "Full Score" : "คะแนนเต็ม"}</th>
                <th className="py-2 px-3 w-32">{lang === "EN" ? "Weight (%)" : "สัดส่วน (%)"}</th>
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
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. TGAT"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={row.score}
                      onChange={(e) => handleRowChange(row.id, "score", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 75"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="any"
                      min="0.1"
                      value={row.maxScore}
                      onChange={(e) => handleRowChange(row.id, "maxScore", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 100"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={row.weight}
                      onChange={(e) => handleRowChange(row.id, "weight", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-55 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
                      placeholder="e.g. 30"
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
            {lang === "EN" ? "Add Subject/Criteria" : "เพิ่มวิชาหรือเกณฑ์คัดเลือก"}
          </button>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            {lang === "EN" ? "Cutoff Comparison (Optional)" : "เปรียบเทียบคะแนนต่ำสุด/คะแนนขั้นต่ำที่คัดเลือกปีที่แล้ว (ไม่บังคับ)"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                {lang === "EN" ? "Cutoff Score:" : "คะแนนต่ำสุดย้อนหลัง:"}
              </label>
              <input
                type="number"
                step="any"
                value={cutoffScore}
                onChange={(e) => setCutoffScore(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
                placeholder={lang === "EN" ? "e.g. 62.5 or 18750" : "เช่น 62.5 หรือ 18750"}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                {lang === "EN" ? "Scale of Cutoff Score:" : "ฐานคะแนนที่ป้อนเปรียบเทียบ:"}
              </label>
              <select
                value={cutoffScale}
                onChange={(e) => setCutoffScale(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
              >
                <option value="PERCENT">{lang === "EN" ? "Percentage (%) (e.g. 0-100)" : "เปอร์เซ็นต์ (%) (เช่น 0-100)"}</option>
                <option value="POINTS_10K">{lang === "EN" ? "Points out of 10,000" : "คะแนนเต็ม 10,000"}</option>
                <option value="POINTS_30K">{lang === "EN" ? "Points out of 30,000" : "คะแนนเต็ม 30,000 (TCAS เก่า/ปัจจุบัน)"}</option>
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={calculateAdmissionScore}
            className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Score" : "คำนวณคะแนนคัดเลือก"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl border border-rose-100 dark:border-rose-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์คะแนนรวมสอบคัดเลือก"}
            </h3>

            {result.totalWeight !== 100 && (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  {lang === "EN"
                    ? `Warning: Total Weight is ${result.totalWeight}%. Standard admission usually sums to 100%. We have scaled the final result out of 100%.`
                    : `ข้อแนะนำ: สัดส่วนคะแนนรวมคิดเป็น ${result.totalWeight}% (ปกติสัดส่วนการคำนวณ Admission มักรวมกันได้ครบ 100%) ทางระบบได้ทำการปรับสัดส่วนเพื่อเฉลี่ยคะแนนให้แล้ว`}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Percentage Earned" : "สัดส่วนเปอร์เซ็นต์ที่ได้"}
                </p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  {result.scorePercent.toFixed(3)}%
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Points (Scale 10,000)" : "คะแนนดิบ (ฐาน 10,000)"}
                </p>
                <p className="text-2xl font-bold text-gray-855 dark:text-gray-100">
                  {result.points10k.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-rose-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-rose-100 mb-1">
                  {lang === "EN" ? "Points (Scale 30,000)" : "คะแนนดิบ (ฐาน 30,000)"}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.points30k.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {result.cutoffDiff !== null && (
              <div className={`p-4 rounded-xl text-center mb-6 border ${
                result.cutoffDiff >= 0 
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
              }`}>
                <p className="text-xs uppercase tracking-wider font-semibold mb-1">
                  {lang === "EN" ? "Comparison with Cutoff Score" : "ผลการเปรียบเทียบกับคะแนนต่ำสุดปีที่แล้ว"}
                </p>
                <p className="text-xl font-bold">
                  {result.cutoffDiff >= 0 ? "+" : ""}
                  {result.cutoffDiff.toLocaleString("en-US", { maximumFractionDigits: 3 })} 
                  {" "}
                  {cutoffScale === "PERCENT" ? "%" : lang === "EN" ? "points" : "คะแนน"}
                </p>
                <p className="text-xs mt-1">
                  {result.cutoffDiff >= 0 
                    ? (lang === "EN" ? "Your score is ABOVE the cutoff. Good chance of admission!" : "คะแนนของคุณสูงกว่าคะแนนต่ำสุด มีโอกาสสอบติดสูง!")
                    : (lang === "EN" ? "Your score is BELOW the cutoff. Admission might be risky." : "คะแนนของคุณยังต่ำกว่าคะแนนต่ำสุดปีที่แล้ว ควรสมัครเผื่อลือกวิชาอื่นร่วมด้วย")}
                </p>
              </div>
            )}

            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-250 text-sm">
                {lang === "EN" ? "Breakdown of Contributions:" : "รายละเอียดคะแนนถ่วงน้ำหนักรายเกณฑ์:"}
              </h4>
              <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                {result.details.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>
                      <strong>{item.name}</strong> (ค่าน้ำหนัก {item.weight}%)
                    </span>
                    <span className="font-mono">
                      {item.score} / {item.maxScore} &rarr; ได้สะสม <strong>{item.contribution.toFixed(3)}%</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-rose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">การคำนวณคะแนนสอบคัดเลือก (Admission Score) คืออะไร?</h2>
        <p>
          ระบบการสอบคัดเลือกเข้าเรียนต่อในมหาวิทยาลัยของไทยในปัจจุบัน (ระบบ TCAS) หรือระบบการแข่งขันรับตรงทั่วไป มักใช้เกณฑ์วิชาการคัดเลือกผู้สมัครเรียนโดยการ <strong>ถ่วงน้ำหนักเปอร์เซ็นต์ (Score Weighting)</strong> ในสัดส่วนที่แตกต่างกันตามคณะและสถาบันกำหนด เช่น การใช้คะแนนสอบวัดสมรรถนะทั่วไป (TGAT) คะแนนวัดสมรรถนะวิชาชีพ (TPAT) คะแนนสอบวิชาการเชิงลึก (A-Level) รวมถึง เกรดสะสม (GPAX) มาประกอบเข้าเป็นคะแนนเต็ม 100% (หรือแปลงเป็นฐาน 10,000 หรือ 30,000 คะแนนตามมาตรฐาน)
        </p>
        <p>
          การคำนวณหา <strong>เปอร์เซ็นต์คะแนนรวมสะสม</strong> ของตัวเอง ช่วยให้สามารถนำคะแนนนี้ไปทำ <strong>"การเปรียบเทียบกับคะแนนต่ำสุด (Cutoff Score)"</strong> หรือคะแนนเฉลี่ยย้อนหลังของปีก่อนๆ เพื่อประเมินความเป็นไปได้และระดับความปลอดภัยในการเลือกคณะนั้นๆ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคิดคะแนนสอบคัดเลือกแบบถ่วงน้ำหนัก</h3>
        <p>
          สูตรพื้นฐานที่ใช้ในการคำนวณคะแนนแต่ละส่วนให้กลายเป็นสัดส่วนเปอร์เซ็นต์ที่แท้จริง มีดังนี้:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <p className="font-bold text-rose-700 dark:text-rose-455">1. การคำนวณคะแนนสะสมย่อยของแต่ละเกณฑ์</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}คะแนนสะสมย่อย{"}"} = \left( \frac{"{"}\text{"{"}คะแนนที่คุณสอบได้{"}"}{"}"}{"{"}\text{"{"}คะแนนเต็มของวิชานั้น{"}"}{"}"} \right) \cdot \text{"{"}ค่าน้ำหนักสัดส่วน (\%){"}"}$
            </p>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <p className="font-bold text-rose-700 dark:text-rose-455">2. การคำนวณสัดส่วนเปอร์เซ็นต์คะแนนสอบคัดเลือกรวม</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}เปอร์เซ็นต์คะแนนรวม{"}"} = \sum (\text{"{"}คะแนนสะสมย่อย{"}"})$
            </p>
            <p className="text-xs text-gray-500 mt-1">หมายเหตุ: หากเปอร์เซ็นต์น้ำหนักรวมไม่ครบ 100% จะต้องคำนวณปรับฐานอัตราส่วนให้เป็นร้อยละ 100 เสมอ</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างวิธีการคำนวณคะแนนสะสมจริงในระบบ TCAS</h3>
        <p>
          สมมติคณะรัฐศาสตร์กำหนดสัดส่วนรับคัดเลือก Admission ดังนี้:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>เกณฑ์ที่ 1: เกรดสะสม (GPAX)</strong> สัดส่วน 20% (คะแนนเต็มฐาน 4.00) &rarr; คุณได้เกรด 3.60
            <br />
            $\text{"{"}แต้มสะสม{"}"} = (3.60 / 4.00) \cdot 20 = 18.00\%$
          </li>
          <li><strong>เกณฑ์ที่ 2: วิชา TGAT</strong> สัดส่วน 30% (คะแนนเต็มฐาน 100) &rarr; คุณได้คะแนน 65.00
            <br />
            $\text{"{"}แต้มสะสม{"}"} = (65.00 / 100.00) \cdot 30 = 19.50\%$
          </li>
          <li><strong>เกณฑ์ที่ 3: วิชา A-Level สังคมศึกษา</strong> สัดส่วน 50% (คะแนนเต็มฐาน 100) &rarr; คุณได้คะแนน 70.00
            <br />
            $\text{"{"}แต้มสะสม{"}"} = (70.00 / 100.00) \cdot 50 = 35.00\%$
          </li>
        </ul>
        <p>
          <strong>ขั้นตอนรวมคะแนนสะสม:</strong>
        </p>
        <p>
          นำแต้มสะสมแต่ละวิชามาบวกกันจะได้: $18.00\% + 19.50\% + 35.00\% = 72.50\%$ (คะแนนรวมคิดเป็น 72.50 คะแนนจากคะแนนเต็ม 100)
        </p>
        <p>
          <strong>การแปลงฐานคะแนน (เช่น สู่ฐาน 30,000 คะแนน):</strong>
        </p>
        <p>
          นำเปอร์เซ็นต์ที่ได้คูณค่าฐานคะแนนรวมของสถาบันนั้นๆ: $72.50\% \cdot 30,000 = 21,750$ คะแนน
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">การวิเคราะห์เปรียบเทียบคะแนนเพื่อประเมินความปลอดภัย (Safety Margin)</h3>
        <p>
          ในการเลือกสมัครเรียนต่อ มักจะนำคะแนนรวมของตัวเองไปลบออกด้วย <strong>คะแนนต่ำสุดของปีก่อนหน้า</strong> เพื่อคำนวณหาส่วนต่างเบี่ยงเบน:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>ส่วนต่างมีค่าเป็นบวกมากๆ (เช่น &gt; +5% หรือ &gt; +1,500 คะแนน):</strong> มีความปลอดภัยสูงมาก โอกาสสอบติดสูงยิ่งยวด</li>
          <li><strong>ส่วนต่างเบี่ยงเบนเล็กน้อย (เช่น ระหว่าง -1% ถึง +1%):</strong> อยู่ในระดับความเสี่ยงปานกลาง ความผันผวนของแนวโน้มวิชาสอบอาจส่งผลต่อการติด/ไม่ติดในรอบนั้นๆ</li>
          <li><strong>ส่วนต่างมีค่าเป็นลบมากๆ (เช่น &lt; -5% หรือ &lt; -1,500 คะแนน):</strong> มีความเสี่ยงสูงมากที่จะหลุดการคัดเลือก ควรมีคณะสำรองที่มีคะแนนต่างเป็นบวกไว้รับรอง</li>
        </ul>
        <p>
          เครื่องคำนวณสัดส่วนคะแนนสอบคัดเลือก Admission ตัวนี้ จะช่วยอำนวยความสะดวกให้นักเรียนสามารถจำลองสัดส่วนคะแนนได้หลายรูปแบบ เพื่อเปรียบเทียบระดับคะแนนกับเกณฑ์ต่ำสุดของคณะต่างๆ ได้อย่างทันที โดยไม่ต้องเปิดคำนวณทีละวิชาด้วยเครื่องคิดเลขมือถือ
        </p>
      </article>
    </div>
  );
}
