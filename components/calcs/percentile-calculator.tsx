"use client";

import React, { useState } from "react";
import { Calculator, Percent, ListOrdered, RotateCcw } from "lucide-react";

export default function PercentileCalculator({ lang }: any) {
  const [inputData, setInputData] = useState<string>("");
  const [percentileVal, setPercentileVal] = useState<string>("");
  const [method, setMethod] = useState<"THAI" | "STANDARD">("THAI");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{
    percentile: number;
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

  const calculatePercentile = () => {
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

    // Validate Percentile Value
    const p = parseFloat(percentileVal);
    if (isNaN(p) || p < 0 || p > 100) {
      setError(
        lang === "EN"
          ? "Percentile must be a number between 0 and 100."
          : "ค่าเปอร์เซ็นต์ไทล์ต้องอยู่ระหว่าง 0 ถึง 100"
      );
      return;
    }

    const n = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);

    let pos = 0;
    if (method === "THAI") {
      // Thai school curriculum: Pos = P/100 * (n + 1)
      pos = (p / 100) * (n + 1);
    } else {
      // Standard statistical (Excel PERCENTILE.INC): Pos = P/100 * (n - 1) + 1
      pos = (p / 100) * (n - 1) + 1;
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
          ? `Step 2: Find Position using Thai curriculum formula: Position = (P / 100) * (n + 1)`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรหลักสูตรไทย: ตำแหน่ง = (P / 100) * (n + 1)`
      );
      steps.push(`Position = (${p} / 100) * (${n} + 1) = ${pos.toFixed(4)}`);
    } else {
      steps.push(
        lang === "EN"
          ? `Step 2: Find Position using Excel/Standard formula: Position = (P / 100) * (n - 1) + 1`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรมาตรฐานสากล: ตำแหน่ง = (P / 100) * (n - 1) + 1`
      );
      steps.push(`Position = (${p} / 100) * (${n} - 1) + 1 = ${pos.toFixed(4)}`);
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
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่าน้อยกว่าหรือเท่ากับ 1 ค่าเปอร์เซ็นต์ไทล์คือค่าข้อมูลลำดับที่ 1: ${calculatedValue}`
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
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่ามากกว่าหรือเท่ากับจำนวนข้อมูล (${n}) ค่าเปอร์เซ็นต์ไทล์คือค่าข้อมูลลำดับสุดท้าย: ${calculatedValue}`
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
          : `ขั้นตอนที่ 4: คำนวณหาค่าโดยการเทียบสัดส่วน (Interpolation): ค่าเปอร์เซ็นต์ไทล์ = ค่าตำแหน่งล่าง + (ทศนิยมตำแหน่ง * (ค่าตำแหน่งบน - ค่าตำแหน่งล่าง))`
      );
      steps.push(
        `Value = ${lowerVal} + (${fraction.toFixed(4)} * (${upperVal} - ${lowerVal})) = ${calculatedValue.toFixed(4)}`
      );
    }

    setResult({
      percentile: p,
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
    setPercentileVal("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <Percent className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Percentile Calculator" : "เครื่องมือคำนวณเปอร์เซ็นต์ไทล์ (Percentile)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Percentile to Find (P):" : "เปอร์เซ็นต์ไทล์ที่ต้องการหา (P):"}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              value={percentileVal}
              onChange={(e) => setPercentileVal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g. 75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Calculation Method:" : "วิธีการคำนวณตำแหน่ง:"}
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "THAI" | "STANDARD")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="THAI">
                {lang === "EN" ? "Thai School Curriculum: P/100 * (n + 1)" : "หลักสูตรไทย: P/100 * (n + 1)"}
              </option>
              <option value="STANDARD">
                {lang === "EN" ? "Standard (Excel INC): P/100 * (n - 1) + 1" : "สากล (Excel INC): P/100 * (n - 1) + 1"}
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
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g. 12, 16, 20, 21, 25, 27, 30, 32"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculatePercentile}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Percentile" : "คำนวณเปอร์เซ็นต์ไทล์"}
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
                  {lang === "EN" ? "Data Count (n)" : "จำนวนข้อมูล (n)"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.count}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Calculated Position" : "ตำแหน่งที่คำนวณได้"}
                </p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {result.position.toFixed(2)}
                </p>
              </div>

              <div className="bg-purple-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-purple-100 mb-1">
                  {lang === "EN" ? `Percentile P${result.percentile}` : `เปอร์เซ็นต์ไทล์ P${result.percentile}`}
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
                  <p key={idx} className="border-l-2 border-purple-300 pl-3">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">เปอร์เซ็นต์ไทล์ (Percentile) คืออะไร?</h2>
        <p>
          ในทางสถิติ <strong>เปอร์เซ็นต์ไทล์ (Percentile หรือสัญลักษณ์ P)</strong> คือค่าวัดตำแหน่งของข้อมูล (Measures of Position) ที่แบ่งข้อมูลทั้งหมดซึ่งได้รับการจัดเรียงจากน้อยไปมากออกเป็น 100 ส่วนเท่าๆ กัน ค่าเปอร์เซ็นต์ไทล์หนึ่งๆ จะบอกให้เราทราบว่า มีข้อมูลอยู่กี่เปอร์เซ็นต์ที่มีค่าต่ำกว่าหรือเท่ากับค่านั้นๆ เช่น ถ้าคะแนนสอบของคุณอยู่ในเปอร์เซ็นต์ไทล์ที่ 85 ($P_{"{"}85{"}"}$) หมายความว่า มีเพื่อนนักเรียนอยู่ 85% ของทั้งหมดที่มีคะแนนเท่ากับหรือน้อยกว่าคุณ และมีเพียง 15% เท่านั้นที่ได้คะแนนสูงกว่าคุณ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการหาตำแหน่งเปอร์เซ็นต์ไทล์ของข้อมูลที่ยังไม่ได้แจกแจงความถี่</h3>
        <p>
          วิธีการหาค่าเปอร์เซ็นต์ไทล์มักจะมีจุดแตกต่างสำคัญอยู่ที่ <strong>"สูตรการหาตำแหน่ง"</strong> ของข้อมูล สำหรับข้อมูลเดี่ยวๆ (Ungrouped Data) ที่จัดเรียงแล้ว มีสูตรคำนวณยอดนิยมหลักๆ 2 วิธีดังนี้:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <p className="font-bold text-purple-700 dark:text-purple-400">1. วิธีตามหลักสูตรระดับมัธยมศึกษาไทย (สสวท.)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}ตำแหน่งของ {"}"} P_r = \frac{"{"}r(n + 1){"}"}{"{"}100{"}"}$
            </p>
            <p className="text-xs text-gray-500 mt-1">สูตรนี้มักใช้ในการเรียนการสอบวิชาคณิตศาสตร์ของนักเรียนชั้นมัธยมปลายในประเทศไทย</p>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <p className="font-bold text-purple-700 dark:text-purple-400">2. วิธีมาตรฐานสากล (Excel PERCENTILE.INC)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{"{"}ตำแหน่งของ {"}"} P_r = \frac{"{"}r(n - 1){"}"}{"{"}100{"}"} + 1$
            </p>
            <p className="text-xs text-gray-500 mt-1">สูตรมาตรฐานทางวิทยาศาสตร์ข้อมูลและเครื่องคิดเลขทางสถิติระดับสากล เหมาะกับข้อมูลกลุ่มตัวอย่าง</p>
          </div>
        </div>

        <p>
          โดยที่:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>$r$ คือ ลำดับเปอร์เซ็นต์ไทล์ที่ต้องการหา ($0 \le r \le 100$)</li>
          <li>$n$ คือ จำนวนข้อมูลทั้งหมดในชุดข้อมูล</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ขั้นตอนการคำนวณเปอร์เซ็นต์ไทล์และวิธีการเทียบตำแหน่งทศนิยม</h3>
        <p>
          เมื่อคำนวณตำแหน่งที่ได้มาแล้ว หากตำแหน่งไม่ได้เป็นจำนวนเต็ม เราจะใช้วิธีที่เรียกว่า <strong>การประมาณค่าในช่วงเชิงเส้น (Linear Interpolation)</strong> เพื่อหาค่าที่ถูกต้อง ตัวอย่างขั้นตอน:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>เรียงลำดับข้อมูล:</strong> นำข้อมูลในมือเรียงลำดับจากน้อยไปมาก</li>
          <li><strong>หาตำแหน่ง:</strong> แทนค่าในสูตรตำแหน่งที่ต้องการ เช่น หา $P_{"{"}75{"}"}$ ของข้อมูลที่มีอยู่ 7 ตัวโดยใช้สูตรไทย: ตำแหน่ง = $75 \cdot (7 + 1) / 100 = 6.0$ แสดงว่าคำตอบคือค่าลำดับที่ 6 ทันที</li>
          <li><strong>การเฉลี่ยในกรณีเป็นทศนิยม:</strong> สมมติได้ตำแหน่ง 6.25 หมายความว่าค่าของเปอร์เซ็นต์ไทล์นี้จะอยู่ระหว่างตัวที่ 6 และตัวที่ 7 ของข้อมูลที่เรียงแล้ว โดยเราหาคำตอบได้จาก:
            <br />
            $\text{"{"}ค่าเปอร์เซ็นต์ไทล์{"}"} = \text{"{"}ข้อมูลตัวที่ {"}"} 6 + 0.25 \cdot (\text{"{"}ข้อมูลตัวที่ {"}"} 7 - \text{"{"}ข้อมูลตัวที่ {"}"} 6)$
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">การนำเปอร์เซ็นต์ไทล์ไปใช้งานจริง</h3>
        <p>
          เปอร์เซ็นต์ไทล์มีประโยชน์สูงมากในการรายงานข้อมูลเปรียบเทียบในกลุ่มประชากรขนาดใหญ่:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>เกณฑ์น้ำหนักและส่วนสูงของเด็ก:</strong> สมุดบันทึกสุขภาพเด็กมักมีกราฟแสดงเปอร์เซ็นต์ไทล์เพื่อแสดงว่าการเจริญเติบโตของบุตรหลานอยู่ในเกณฑ์เฉลี่ยหรือไม่</li>
          <li><strong>การวัดผลคะแนนสอบเข้ามหาวิทยาลัย:</strong> ในการสอบมาตรฐานระดับโลกหรือระดับชาติ เช่น SAT, GRE หรือการทดสอบอื่นๆ มักแสดงคะแนนพร้อมค่าเปอร์เซ็นต์ไทล์เพื่อให้เห็นความโดดเด่นเมื่อเทียบกับผู้สอบทั้งหมด</li>
          <li><strong>การเงินและวิเคราะห์ข้อมูล:</strong> ใช้ดูพฤติกรรมการใช้จ่ายของผู้บริโภค เช่น การจำแนกกลุ่มลูกค้าที่มียอดสั่งซื้อสูงสุด 10% แรก ($P_{"{"}90{"}"}$)</li>
        </ul>
        <p>
          เครื่องมือคำนวณเปอร์เซ็นต์ไทล์ตัวนี้ช่วยอำนวยความสะดวกให้นักเรียนและนักวิจัยคำนวณตำแหน่งเปอร์เซ็นต์ไทล์ได้แม่นยำ พร้อมแสดงวิธีทำและการปัดส่วนต่างทศนิยมอย่างชัดเจน
        </p>
      </article>
    </div>
  );
}
