"use client";

import React, { useState } from "react";
import { Calculator, ListOrdered, RotateCcw } from "lucide-react";

export default function QuartileCalculator({ lang }: any) {
  const [inputData, setInputData] = useState<string>("");
  const [quartileVal, setQuartileVal] = useState<string>("1");
  const [method, setMethod] = useState<"THAI" | "STANDARD">("THAI");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{
    quartile: number;
    value: number;
    count: number;
    position: number;
    sorted: number[];
    lowerIndex: number;
    upperIndex: number;
    lowerValue: number;
    upperValue: number;
    fraction: number;
    steps: string[];
  } | null>(null);

  const calculateQuartile = () => {
    setError("");
    setResult(null);

    // Validate dataset
    if (!inputData.trim()) {
      setError(lang === "EN" ? "Please enter some numbers." : "กรุณาป้อนตัวเลขข้อมูล");
      return;
    }

    const rawNumbers = inputData
      .replace(/[\n,]/g, " ")
      .split(" ")
      .map((n) => n.trim())
      .filter((n) => n !== "");

    if (rawNumbers.length === 0) {
      setError(lang === "EN" ? "No valid numbers found." : "ไม่พบตัวเลขที่ถูกต้อง");
      return;
    }

    const numbers = rawNumbers.map(Number);
    if (numbers.some(isNaN)) {
      setError(lang === "EN" ? "Please enter valid numbers only." : "กรุณาป้อนเฉพาะตัวเลขที่ถูกต้องเท่านั้น");
      return;
    }

    // Validate Quartile Value (Q1, Q2, Q3)
    const q = parseInt(quartileVal);
    if (isNaN(q) || q < 1 || q > 3) {
      setError(
        lang === "EN"
          ? "Quartile must be 1, 2, or 3."
          : "ค่าควอไทล์ต้องเป็น 1, 2 หรือ 3 เท่านั้น"
      );
      return;
    }

    const n = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);

    let pos = 0;
    if (method === "THAI") {
      // Thai school curriculum: Pos = Q/4 * (n + 1)
      pos = (q / 4) * (n + 1);
    } else {
      // Standard statistical (Excel PERCENTILE.INC equivalency): Pos = Q/4 * (n - 1) + 1
      pos = (q / 4) * (n - 1) + 1;
    }

    let calculatedValue = 0;
    let lowerIdx = 0;
    let upperIdx = 0;
    let lowerVal = 0;
    let upperVal = 0;
    let fraction = 0;
    const steps: string[] = [];

    steps.push(
      lang === "EN"
        ? `Step 1: Sort data in ascending order: ${sorted.join(", ")}`
        : `ขั้นตอนที่ 1: เรียงลำดับข้อมูลจากน้อยไปมาก: ${sorted.join(", ")}`
    );

    if (method === "THAI") {
      steps.push(
        lang === "EN"
          ? `Step 2: Find Position using Thai curriculum formula: Position = (Q / 4) * (n + 1)`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรหลักสูตรไทย: ตำแหน่ง = (Q / 4) * (n + 1)`
      );
      steps.push(`Position = (${q} / 4) * (${n} + 1) = ${pos.toFixed(4)}`);
    } else {
      steps.push(
        lang === "EN"
          ? `Step 2: Find Position using Excel/Standard formula: Position = (Q / 4) * (n - 1) + 1`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรมาตรฐานสากล: ตำแหน่ง = (Q / 4) * (n - 1) + 1`
      );
      steps.push(`Position = (${q} / 4) * (${n} - 1) + 1 = ${pos.toFixed(4)}`);
    }

    if (pos <= 1) {
      calculatedValue = sorted[0];
      lowerIdx = 0;
      upperIdx = 0;
      lowerVal = sorted[0];
      upperVal = sorted[0];
      fraction = 0;
      steps.push(
        lang === "EN"
          ? `Step 3: Since the position is <= 1, the value is the first data point: ${calculatedValue}`
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่าน้อยกว่าหรือเท่ากับ 1 ค่าควอไทล์คือค่าข้อมูลลำดับที่ 1: ${calculatedValue}`
      );
    } else if (pos >= n) {
      calculatedValue = sorted[n - 1];
      lowerIdx = n - 1;
      upperIdx = n - 1;
      lowerVal = sorted[n - 1];
      upperVal = sorted[n - 1];
      fraction = 0;
      steps.push(
        lang === "EN"
          ? `Step 3: Since the position is >= ${n}, the value is the last data point: ${calculatedValue}`
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่ามากกว่าหรือเท่ากับจำนวนข้อมูล (${n}) ค่าควอไทล์คือค่าข้อมูลลำดับสุดท้าย: ${calculatedValue}`
      );
    } else {
      const k = Math.floor(pos); // 1-based lower index
      fraction = pos - k;
      lowerIdx = k - 1; // 0-based index
      upperIdx = k; // 0-based index
      lowerVal = sorted[lowerIdx];
      upperVal = sorted[upperIdx];
      calculatedValue = lowerVal + fraction * (upperVal - lowerVal);

      steps.push(
        lang === "EN"
          ? `Step 3: The position lies between index ${k} (value: ${lowerVal}) and index ${k + 1} (value: ${upperVal})`
          : `ขั้นตอนที่ 3: ตำแหน่งดังกล่าวอยู่ระหว่างลำดับที่ ${k} (ค่า: ${lowerVal}) และลำดับที่ ${k + 1} (ค่า: ${upperVal})`
      );
      steps.push(
        lang === "EN"
          ? `Step 4: Interpolate value: Value = LowerValue + (PositionFraction * (UpperValue - LowerValue))`
          : `ขั้นตอนที่ 4: คำนวณหาค่าโดยการเทียบสัดส่วน (Interpolation): ค่าควอไทล์ = ค่าตำแหน่งล่าง + (ทศนิยมตำแหน่ง * (ค่าตำแหน่งบน - ค่าตำแหน่งล่าง))`
      );
      steps.push(
        `Value = ${lowerVal} + (${fraction.toFixed(4)} * (${upperVal} - ${lowerVal})) = ${calculatedValue.toFixed(4)}`
      );
    }

    setResult({
      quartile: q,
      value: calculatedValue,
      count: n,
      position: pos,
      sorted,
      lowerIndex: lowerIdx,
      upperIndex: upperIdx,
      lowerValue: lowerVal,
      upperValue: upperVal,
      fraction,
      steps,
    });
  };

  const clearData = () => {
    setInputData("");
    setQuartileVal("1");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
          <span className="text-xl font-bold font-serif">Q</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Quartile Calculator" : "เครื่องมือคำนวณควอไทล์ (Quartile)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Quartile to Find (Q1, Q2, Q3):" : "ควอไทล์ที่ต้องการหา (Q1, Q2, Q3):"}
            </label>
            <select
              value={quartileVal}
              onChange={(e) => setQuartileVal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="1">{lang === "EN" ? "Q1 (First Quartile / 25th Percentile)" : "Q1 (ควอไทล์ที่ 1 / เปอร์เซ็นต์ไทล์ที่ 25)"}</option>
              <option value="2">{lang === "EN" ? "Q2 (Second Quartile / Median / 50th Percentile)" : "Q2 (ควอไทล์ที่ 2 / มัธยฐาน / เปอร์เซ็นต์ไทล์ที่ 50)"}</option>
              <option value="3">{lang === "EN" ? "Q3 (Third Quartile / 75th Percentile)" : "Q3 (ควอไทล์ที่ 3 / เปอร์เซ็นต์ไทล์ที่ 75)"}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Calculation Method:" : "วิธีการคำนวณตำแหน่ง:"}
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "THAI" | "STANDARD")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="THAI">
                {lang === "EN" ? "Thai School Curriculum: Q/4 * (n + 1)" : "หลักสูตรไทย: Q/4 * (n + 1)"}
              </option>
              <option value="STANDARD">
                {lang === "EN" ? "Standard (Excel): Q/4 * (n - 1) + 1" : "สากล (Excel): Q/4 * (n - 1) + 1"}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ListOrdered className="w-4 h-4" />
            {lang === "EN"
              ? "Enter dataset (separated by comma, space, or newline):"
              : "ป้อนชุดข้อมูล (คั่นด้วยจุลภาค, ช่องว่าง หรือขึ้นบรรทัดใหม่):"}
          </label>
          <textarea
            rows={4}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g. 10, 15, 20, 22, 24, 28, 30, 32, 35"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateQuartile}
            className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Quartile" : "คำนวณควอไทล์"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-100 dark:border-teal-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Data Count (n)" : "จำนวนข้อมูล (n)"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.count}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Calculated Position" : "ตำแหน่งที่คำนวณได้"}
                </p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {result.position.toFixed(2)}
                </p>
              </div>

              <div className="bg-teal-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-teal-100 mb-1">
                  {lang === "EN" ? `Quartile Q${result.quartile}` : `ควอไทล์ Q${result.quartile}`}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.value.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {lang === "EN" ? "Step-by-Step Explanation" : "ขั้นตอนการคำนวณโดยละเอียด:"}
              </h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
                {result.steps.map((step, idx) => (
                  <p key={idx} className="border-l-2 border-teal-300 pl-3">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-teal dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">ควอไทล์ (Quartile) คืออะไร?</h2>
        <p>
          ในทางสถิติและการวิเคราะห์ข้อมูล <strong>ควอไทล์ (Quartile หรือสัญลักษณ์ Q)</strong> คือค่าวัดตำแหน่งข้อมูลที่แบ่งชุดข้อมูลที่มีการจัดเรียงจากน้อยไปหามากออกเป็น 4 ส่วนเท่าๆ กัน โดยแต่ละส่วนจะมีจำนวนข้อมูลเท่ากับ 25% ของข้อมูลทั้งหมด ดังนั้นการแบ่งในลักษณะนี้จะเกิดจุดตัดหรือค่าควอไทล์ขึ้นมาทั้งหมด 3 ค่า ได้แก่:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>ควอไทล์ที่ 1 ($Q_1$):</strong> จุดตัดที่แสดงว่ามีข้อมูล 25% ที่มีค่าน้อยกว่าหรือเท่ากับค่านี้ (เรียกอีกอย่างว่า เปอร์เซ็นต์ไทล์ที่ 25)</li>
          <li><strong>ควอไทล์ที่ 2 ($Q_2$):</strong> จุดตัดตรงกลางพอดี ซึ่งแบ่งข้อมูลออกเป็นสองส่วนเท่าๆ กัน (50%) ค่านี้จะตรงกับ <em>ค่ามัธยฐาน (Median)</em> และเปอร์เซ็นต์ไทล์ที่ 50</li>
          <li><strong>ควอไทล์ที่ 3 ($Q_3$):</strong> จุดตัดที่แสดงว่ามีข้อมูล 75% ที่มีค่าน้อยกว่าหรือเท่ากับค่านี้ และมี 25% ที่มีค่ามากกว่า (เรียกอีกอย่างว่า เปอร์เซ็นต์ไทล์ที่ 75)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการหาตำแหน่งควอไทล์ของข้อมูลที่ยังไม่ได้แจกแจงความถี่</h3>
        <p>
          ความแตกต่างในการคำนวณควอไทล์อยู่ที่สูตรการหาตำแหน่ง ($Pos$) ซึ่งมี 2 วิธีที่เป็นที่นิยม:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <p className="font-bold text-teal-700 dark:text-teal-400">1. สูตรหลักสูตรมัธยมศึกษาไทย (สสวท.)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}ตำแหน่งของ {"}"} Q_r = \frac{"{"}r(n + 1){"}"}{"{"}4{"}"}$
            </p>
            <p className="text-xs text-gray-500 mt-1">ใช้สอนอย่างแพร่หลายในวิชาคณิตศาสตร์ ม.ปลาย ของประเทศไทย</p>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <p className="font-bold text-teal-700 dark:text-teal-400">2. สูตรมาตรฐานสากล (Excel PERCENTILE.INC)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}ตำแหน่งของ {"}"} Q_r = \frac{"{"}r(n - 1){"}"}{"{"}4{"}"} + 1$
            </p>
            <p className="text-xs text-gray-500 mt-1">สูตรคำนวณสำหรับโปรแกรมคอมพิวเตอร์และสถิติวิเคราะห์ระดับสูงทั่วไป</p>
          </div>
        </div>

        <p>
          คำอธิบายตัวแปร:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>$r$ คือ ลำดับควอไทล์ที่ต้องการหา ซึ่งก็คือ 1, 2 หรือ 3</li>
          <li>$n$ คือ จำนวนรายการข้อมูลที่มีอยู่ทั้งหมด</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ขั้นตอนและวิธีการเทียบสัดส่วนคำนวณควอไทล์</h3>
        <p>
          เมื่อแทนค่าในสูตรด้านบนเพื่อระบุตำแหน่งแล้ว หากตำแหน่งที่ได้ออกมาเป็นทศนิยม เราจะนำไปเปรียบเทียบเชิงเส้น (Linear Interpolation) เช่นเดียวกับวิธีคำนวณเดไซล์และเปอร์เซ็นต์ไทล์ ตัวอย่างเช่น:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>เรียงลำดับข้อมูลดิบ:</strong> จากน้อยไปหามากเสมอ</li>
          <li><strong>ระบุตำแหน่ง:</strong> สมมติข้อมูลมี 9 ตัว นำมาหา $Q_3$ ตามสูตรไทย จะได้ตำแหน่ง = $3 \cdot (9 + 1) / 4 = 7.5$</li>
          <li><strong>คำนวณเปรียบเทียบ:</strong> เนื่องจากตำแหน่งคือ 7.5 ค่าควอไทล์จะอยู่กึ่งกลางระหว่างตัวเลขลำดับที่ 7 และลำดับที่ 8 ของข้อมูลที่จัดเรียงแล้ว นำสูตรมาแทนค่าดังนี้:
            <br />
            $\text{"{"}ค่า {"}"} Q_3 = \text{"{"}ข้อมูลตัวที่ {"}"} 7 + 0.5 \cdot (\text{"{"}ข้อมูลตัวที่ {"}"} 8 - \text{"{"}ข้อมูลตัวที่ {"}"} 7)$
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">การประยุกต์ใช้งานควอไทล์ในสถิติวิเคราะห์</h3>
        <p>
          ควอไทล์ถูกใช้อย่างแพร่หลายในการสรุปข้อมูลเชิงพรรณนาและการจัดรูปแบบการกระจายตัวของข้อมูล:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>แผนภาพกล่อง (Box Plot):</strong> แผนภูมิชนิดนี้นิยมใช้สำหรับแสดงการกระจายตัวของข้อมูล โดยใช้ค่าต่ำสุด, ค่าสูงสุด, $Q_1$, $Q_2$ (Median) และ $Q_3$ ในการสร้างขอบเขตกล่องและหนวดแมว (Whiskers)</li>
          <li><strong>การวิเคราะห์หาค่านอกเกณฑ์ (Outlier Analysis):</strong> ใช้คำนวณระยะห่างระหว่างควอไทล์ (Interquartile Range: $IQR = Q_3 - Q_1$) เพื่อใช้กำหนดเกณฑ์หาข้อมูลที่มีความแปลกแยกหรือสูง/ต่ำผิดปกติ ($1.5 \cdot IQR$)</li>
          <li><strong>การแบ่งกลุ่มการประเมินผลการเรียน:</strong> การจัดเกรดหรือการประเมินผลระดับชั้นในหลายหลักสูตรจะอิงการตัดยอดคะแนนที่เปอร์เซ็นไทล์หรือควอไทล์ต่าง ๆ</li>
        </ul>
        <p>
          เว็บเครื่องคิดเลขควอไทล์นี้ถูกสร้างขึ้นเพื่ออำนวยความสะดวกแก่นักเรียน นักศึกษา และนักสถิติ เพื่อการประมวลผลตำแหน่งควอไทล์อย่างแม่นยำ ปราศจากความเสี่ยงในการคำนวณทศนิยมผิดพลาด
        </p>
      </article>
    </div>
  );
}
