"use client";

import React, { useState } from "react";
import { Calculator, ListNumbers, RotateCcw } from "lucide-react";

export default function DecileCalculator({ lang }: any) {
  const [inputData, setInputData] = useState<string>("");
  const [decileVal, setDecileVal] = useState<string>("");
  const [method, setMethod] = useState<"THAI" | "STANDARD">("THAI");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{
    decile: number;
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

  const calculateDecile = () => {
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

    // Validate Decile Value (D1 to D9)
    const d = parseFloat(decileVal);
    if (isNaN(d) || d < 1 || d > 9) {
      setError(
        lang === "EN"
          ? "Decile must be a number between 1 and 9."
          : "ค่าเดไซล์ต้องอยู่ระหว่าง 1 ถึง 9"
      );
      return;
    }

    const n = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);

    let pos = 0;
    if (method === "THAI") {
      // Thai school curriculum: Pos = D/10 * (n + 1)
      pos = (d / 10) * (n + 1);
    } else {
      // Standard statistical (Excel PERCENTILE.INC equivalency): Pos = D/10 * (n - 1) + 1
      pos = (d / 10) * (n - 1) + 1;
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
          ? `Step 2: Find Position using Thai curriculum formula: Position = (D / 10) * (n + 1)`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรหลักสูตรไทย: ตำแหน่ง = (D / 10) * (n + 1)`
      );
      steps.push(`Position = (${d} / 10) * (${n} + 1) = ${pos.toFixed(4)}`);
    } else {
      steps.push(
        lang === "EN"
          ? `Step 2: Find Position using Excel/Standard formula: Position = (D / 10) * (n - 1) + 1`
          : `ขั้นตอนที่ 2: หาตำแหน่งโดยใช้สูตรมาตรฐานสากล: ตำแหน่ง = (D / 10) * (n - 1) + 1`
      );
      steps.push(`Position = (${d} / 10) * (${n} - 1) + 1 = ${pos.toFixed(4)}`);
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
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่าน้อยกว่าหรือเท่ากับ 1 ค่าเดไซล์คือค่าข้อมูลลำดับที่ 1: ${calculatedValue}`
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
          : `ขั้นตอนที่ 3: เนื่องจากตำแหน่งค่ามากกว่าหรือเท่ากับจำนวนข้อมูล (${n}) ค่าเดไซล์คือค่าข้อมูลลำดับสุดท้าย: ${calculatedValue}`
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
          : `ขั้นตอนที่ 4: คำนวณหาค่าโดยการเทียบสัดส่วน (Interpolation): ค่าเดไซล์ = ค่าตำแหน่งล่าง + (ทศนิยมตำแหน่ง * (ค่าตำแหน่งบน - ค่าตำแหน่งล่าง))`
      );
      steps.push(
        `Value = ${lowerVal} + (${fraction.toFixed(4)} * (${upperVal} - ${lowerVal})) = ${calculatedValue.toFixed(4)}`
      );
    }

    setResult({
      decile: d,
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
    setDecileVal("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl">
          <span className="text-xl font-bold font-serif">D</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Decile Calculator" : "เครื่องมือคำนวณเดไซล์ (Decile)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Decile to Find (D1 - D9):" : "เดไซล์ที่ต้องการหา (D1 - D9):"}
            </label>
            <input
              type="number"
              min="1"
              max="9"
              step="any"
              value={decileVal}
              onChange={(e) => setDecileVal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="e.g. 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Calculation Method:" : "วิธีการคำนวณตำแหน่ง:"}
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "THAI" | "STANDARD")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            >
              <option value="THAI">
                {lang === "EN" ? "Thai School Curriculum: D/10 * (n + 1)" : "หลักสูตรไทย: D/10 * (n + 1)"}
              </option>
              <option value="STANDARD">
                {lang === "EN" ? "Standard (Excel): D/10 * (n - 1) + 1" : "สากล (Excel): D/10 * (n - 1) + 1"}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ListNumbers className="w-4 h-4" />
            {lang === "EN"
              ? "Enter dataset (separated by comma, space, or newline):"
              : "ป้อนชุดข้อมูล (คั่นด้วยจุลภาค, ช่องว่าง หรือขึ้นบรรทัดใหม่):"}
          </label>
          <textarea
            rows={4}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g. 5, 8, 12, 15, 18, 20, 22, 25, 29, 30"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateDecile}
            className="flex-1 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Decile" : "คำนวณเดไซล์"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl border border-pink-100 dark:border-pink-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-300 mb-4 text-center">
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
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {result.position.toFixed(2)}
                </p>
              </div>

              <div className="bg-pink-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-pink-100 mb-1">
                  {lang === "EN" ? `Decile D${result.decile}` : `เดไซล์ D${result.decile}`}
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
                  <p key={idx} className="border-l-2 border-pink-300 pl-3">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-pink dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">เดไซล์ (Decile) คืออะไร?</h2>
        <p>
          ในเชิงสถิติและการวิเคราะห์คะแนน <strong>เดไซล์ (Decile หรือเขียนย่อด้วยสัญลักษณ์ D)</strong> เป็นหนึ่งในค่าวัดตำแหน่งของข้อมูล (Measures of Position) ซึ่งทำหน้าที่แบ่งข้อมูลที่จัดเรียงลำดับจากค่าน้อยที่สุดไปยังค่ามากที่สุดออกเป็น 10 ส่วนเท่าๆ กัน ค่าเดไซล์จะบอกให้เราทราบถึงจุดตัดในแต่ละ 10% ของชุดข้อมูลทั้งหมด โดยจะมีค่าเดไซล์ทั้งหมด 9 ค่า ตั้งแต่เดไซล์ที่ 1 ($D_1$) ไปจนถึงเดไซล์ที่ 9 ($D_9$) 
        </p>
        <p>
          ตัวอย่างเช่น หากคุณสอบได้คะแนนที่ตำแหน่งเดไซล์ที่ 7 ($D_7$) หมายความว่า คะแนนของคุณสูงกว่าหรือเท่ากับคะแนนของผู้เข้าสอบประมาณ 70% และมีเพียง 30% ของผู้เข้าสอบทั้งหมดเท่านั้นที่ทำคะแนนได้ดีกว่าคุณ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรที่ใช้ในการหาตำแหน่งเดไซล์ (Decile Position)</h3>
        <p>
          สูตรคำนวณตำแหน่งสำหรับข้อมูลที่ยังไม่ได้แจกแจงความถี่ (Ungrouped Data) จะถูกแบ่งออกตามเป้าหมายและหลักสูตรวิชาการที่ใช้:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <p className="font-bold text-pink-700 dark:text-pink-400">1. วิธีตามหลักสูตรการศึกษาขั้นพื้นฐานไทย (สสวท.)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{ตำแหน่งของ } D_r = \frac{r(n + 1)}{10}$
            </p>
            <p className="text-xs text-gray-500 mt-1">สูตรนี้ใช้สำหรับการเรียนและออกสอบในโรงเรียนและมหาวิทยาลัยส่วนใหญ่ของประเทศไทย</p>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <p className="font-bold text-pink-700 dark:text-pink-400">2. วิธีสากล (หรือเทียบเคียงสัดส่วนในซอฟต์แวร์สถิติทั่วไป)</p>
            <p className="font-serif text-lg mt-1 ml-4">
              $\text{ตำแหน่งของ } D_r = \frac{r(n - 1)}{10} + 1$
            </p>
            <p className="text-xs text-gray-500 mt-1">สูตรนี้คำนวณตำแหน่งโดยใช้ช่วงความห่างเป็นหลัก และเป็นสากลในวงการวิเคราะห์สถิติประยุกต์</p>
          </div>
        </div>

        <p>
          ความหมายของตัวแปรในสูตร:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>$r$ คือ ลำดับเดไซล์ที่สนใจ ซึ่งมีค่าเป็นจำนวนเต็มตั้งแต่ 1 ถึง 9</li>
          <li>$n$ คือ จำนวนรายการข้อมูลทั้งหมดที่มีในระบบ</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ขั้นตอนการคำนวณเดไซล์อย่างละเอียด</h3>
        <p>
          ในการคำนวณเดไซล์จากกลุ่มคะแนนหรือชุดข้อมูลใดๆ จะต้องดำเนินการดังนี้:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>เรียงระดับข้อมูล:</strong> ลำดับข้อมูลดิบจากค่าน้อยที่สุดไปยังค่ามากที่สุด</li>
          <li><strong>คำนวณตำแหน่ง:</strong> นำจำนวนข้อมูลและเลขเดไซล์มาแทนลงในสูตรที่ระบุข้างต้นเพื่อหาตำแหน่ง ($Pos$)</li>
          <li><strong>การคำนวณเชิงเส้น (Linear Interpolation) เมื่อเกิดทศนิยม:</strong> หากตำแหน่งที่หาได้ไม่ใช่จำนวนเต็ม สมมติได้ $Pos = 4.5$ 
            เราจะทำการเทียบตัวเลขระหว่างตำแหน่งที่ 4 และตำแหน่งที่ 5 ของข้อมูล ดังนี้:
            <br />
            $\text{ค่าเดไซล์} = \text{ข้อมูลตัวที่ } 4 + 0.5 \cdot (\text{ข้อมูลตัวที่ } 5 - \text{ข้อมูลตัวที่ } 4)$
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความสัมพันธ์ระหว่างเดไซล์ ควอไทล์ และเปอร์เซ็นต์ไทล์</h3>
        <p>
          การวัดตำแหน่งข้อมูลทั้ง 3 ประเภทนี้มีความสัมพันธ์ที่เกื้อหนุนและทดแทนกันได้ ดังแสดงในตารางเปรียบเทียบต่อไปนี้:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>ค่าเดไซล์ที่ 5 ($D_5$) มีค่าเท่ากับ ควอไทล์ที่ 2 ($Q_2$), เปอร์เซ็นต์ไทล์ที่ 50 ($P_{50}$) และ ค่ามัธยฐาน (Median) เสมอ</li>
          <li>ค่าเดไซล์ที่ 1 ($D_1$) เทียบเท่ากับ เปอร์เซ็นต์ไทล์ที่ 10 ($P_{10}$)</li>
          <li>ค่าเดไซล์ที่ 9 ($D_9$) เทียบเท่ากับ เปอร์เซ็นต์ไทล์ที่ 90 ($P_{90}$)</li>
        </ul>
        
        <p>
          ด้วยระบบคำนวณเดไซล์ออนไลน์ของเรา คุณสามารถคำนวณค่าเดไซล์ได้อย่างง่ายดาย โดยมีตัวเลือกให้เลือกทั้งสองรูปแบบสูตรคำนวณ พร้อมอธิบายวิธีทำทีละสเต็ปอย่างเข้าใจง่าย ช่วยเป็นตัวช่วยเสริมในการเรียนและการคำนวณสถิติประยุกต์อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}
