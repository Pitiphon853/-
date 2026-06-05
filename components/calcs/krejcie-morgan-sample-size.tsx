"use client";

import React, { useState } from "react";
import { Calculator, HelpCircle, RefreshCw, Layers } from "lucide-react";

export default function KrejcieMorganSampleSize({ lang }: { lang?: "TH" | "EN" }) {
  const [population, setPopulation] = useState<string>("1000");
  const [confidenceLevel, setConfidenceLevel] = useState<string>("95");
  const [marginOfError, setMarginOfError] = useState<string>("5");
  const [proportion, setProportion] = useState<string>("50");
  const [result, setResult] = useState<{
    sampleSize: number;
    exactValue: number;
    chiSquare: number;
    formulaSteps: string;
  } | null>({
    sampleSize: 278,
    exactValue: 277.7121,
    chiSquare: 3.841,
    formulaSteps: "s = (3.841 * 1000 * 0.25) / ((0.05)^2 * (999) + 3.841 * 0.25)",
  });
  const [error, setError] = useState<string>("");

  const chiSquareMap: { [key: string]: number } = {
    "90": 2.706,
    "95": 3.841,
    "99": 6.635,
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const N = parseFloat(population);
    const dPercent = parseFloat(marginOfError);
    const pPercent = parseFloat(proportion);

    if (isNaN(N) || N <= 0) {
      setError(
        lang === "EN"
          ? "Please enter a valid population size greater than 0."
          : "กรุณากรอกจำนวนประชากรที่มากกว่า 0"
      );
      return;
    }

    if (isNaN(dPercent) || dPercent <= 0 || dPercent >= 100) {
      setError(
        lang === "EN"
          ? "Please enter a valid margin of error (d) between 0% and 100%."
          : "กรุณากรอกความคลาดเคลื่อนที่ยอมรับได้ระหว่าง 0% ถึง 100%"
      );
      return;
    }

    if (isNaN(pPercent) || pPercent <= 0 || pPercent >= 100) {
      setError(
        lang === "EN"
          ? "Please enter a valid population proportion (P) between 0% and 100%."
          : "กรุณากรอกสัดส่วนประชากรระหว่าง 0% ถึง 100%"
      );
      return;
    }

    const d = dPercent / 100;
    const P = pPercent / 100;
    const chiSquare = chiSquareMap[confidenceLevel] || 3.841;

    // Formula: s = (X² * N * P * (1-P)) / (d² * (N-1) + X² * P * (1-P))
    const numerator = chiSquare * N * P * (1 - P);
    const denominator = Math.pow(d, 2) * (N - 1) + chiSquare * P * (1 - P);

    if (denominator <= 0) {
      setError(
        lang === "EN"
          ? "Calculation error: Denominator is 0. Check your inputs."
          : "ข้อผิดพลาดในการคำนวณ: ตัวหารมีค่าเท่ากับหรือน้อยกว่า 0 กรุณาตรวจสอบค่าที่กรอก"
      );
      return;
    }

    const sExact = numerator / denominator;
    const sRounded = Math.ceil(sExact);

    setResult({
      sampleSize: sRounded,
      exactValue: sExact,
      chiSquare: chiSquare,
      formulaSteps: `s = (${chiSquare} * ${N} * ${P * (1 - P)}) / ((${d.toFixed(4)})^2 * (${N - 1}) + ${chiSquare} * ${P * (1 - P)})`,
    });
  };

  const clear = () => {
    setPopulation("");
    setConfidenceLevel("95");
    setMarginOfError("5");
    setProportion("50");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN"
            ? "Krejcie & Morgan Sample Size Calculator"
            : "เครื่องมือคำนวณขนาดกลุ่มตัวอย่าง Krejcie & Morgan"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Population Size (N)" : "จำนวนประชากรทั้งหมด (N)"}
            </label>
            <input
              type="number"
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g. 1000"
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === "EN" ? "Confidence Level" : "ระดับความเชื่อมั่น"}
              </label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="90">90% (χ² = 2.706)</option>
                <option value="95">95% (χ² = 3.841)</option>
                <option value="99">99% (χ² = 6.635)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === "EN" ? "Margin of Error (d)" : "ความคลาดเคลื่อน (d)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={marginOfError}
                  onChange={(e) => setMarginOfError(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-8"
                  placeholder="e.g. 5"
                  step="0.1"
                  min="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Population Proportion (P)" : "สัดส่วนประชากรที่สนใจ (P)"}
            </label>
            <div className="relative">
              <input
                type="number"
                value={proportion}
                onChange={(e) => setProportion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-8"
                placeholder="e.g. 50"
                step="1"
                min="1"
                max="99"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {lang === "EN"
                ? "50% is standard (provides the most conservative/largest sample size)."
                : "ค่ามาตรฐานคือ 50% ซึ่งให้ขนาดกลุ่มตัวอย่างที่ครอบคลุมและมากที่สุด"}
            </p>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Size" : "คำนวณขนาดตัวอย่าง"}
            </button>
            <button
              onClick={clear}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold transition-all active:scale-95"
              title={lang === "EN" ? "Clear" : "ล้างค่า"}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4 text-center">
                {lang === "EN" ? "Resulting Sample Size" : "ผลการคำนวณขนาดกลุ่มตัวอย่าง"}
              </h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border border-purple-50 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Minimum Required Sample Size (s)" : "จำนวนตัวอย่างขั้นต่ำที่ต้องการ (s)"}
                </p>
                <p className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 my-2">
                  {result.sampleSize}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {lang === "EN" ? `Exact value: ~${result.exactValue.toFixed(4)} (Rounded Up)` : `ค่าที่คำนวณได้จริง: ~${result.exactValue.toFixed(4)} (ปัดเศษขึ้น)`}
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {lang === "EN" ? "Formula Parameters:" : "พารามิเตอร์ที่ใช้ในสูตร:"}
                  </p>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>χ² (Chi-Square) = {result.chiSquare}</li>
                    <li>P = {parseFloat(proportion)/100}</li>
                    <li>d (Error Margin) = {parseFloat(marginOfError)/100}</li>
                  </ul>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {lang === "EN" ? "Calculation Steps:" : "ขั้นตอนคำนวณ:"}
                  </p>
                  <p className="font-mono text-xs overflow-x-auto whitespace-pre-wrap text-center">
                    {result.formulaSteps}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <Layers className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter population details, confidence, error, and click Calculate."
                  : "กรอกข้อมูลประชากร ระดับความเชื่อมั่น และความคลาดเคลื่อน แล้วกดปุ่มคำนวณด้านซ้าย"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-300">
          สูตรของเครจซีและมอร์แกน (Krejcie &amp; Morgan) คืออะไร? ทางเลือกสากลสำหรับการกำหนดกลุ่มตัวอย่าง
        </h2>
        <p>
          ในการวางแผนระเบียบวิธีวิจัย การวิเคราะห์ข้อมูลจากกลุ่มตัวอย่างที่มีมาตรฐานจำเป็นต้องพึ่งพาสูตรทางสถิติที่มีความน่าเชื่อถือสูง ซึ่งสูตรที่นิยมอย่างแพร่หลายทั่วโลกร่วมกับสูตร Taro Yamane ก็คือ <strong>สูตรคำนวณขนาดกลุ่มตัวอย่างของ Krejcie &amp; Morgan</strong> (เครจซีและมอร์แกน) ซึ่งถูกนำเสนอในปี ค.ศ. 1970 โดย Robert V. Krejcie และ Daryle W. Morgan ในบทความวิชาการที่ชื่อว่า <i>"Determining Sample Size for Research Activities"</i>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-purple-800 dark:text-purple-400">
          ความแตกต่างและสูตรทางคณิตศาสตร์
        </h3>
        <p>
          สูตร Krejcie &amp; Morgan พัฒนามาจากสูตรคำนวณทั่วไปของสถิติไคสแควร์ (Chi-Square) บนเงื่อนไขที่กำหนดระดับนัยสำคัญหรือความน่าเชื่อถือ ซึ่งต่างจาก Taro Yamane ตรงที่มีการเปิดเผยและรวมค่าไคสแควร์ (χ²) ในสมการโดยตรง ทำให้มีความยืดหยุ่นในการปรับระดับความเชื่อมั่นตามเงื่อนไขทางวิชาการ
        </p>
        <p>
          สมการคำนวณของ Krejcie &amp; Morgan:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center font-serif text-lg">
          s = [χ² * N * P * (1 - P)] / [d² * (N - 1) + χ² * P * (1 - P)]
        </div>
        <p>
          ความหมายของตัวแปรต่างๆ ในสมการ:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>s</strong> คือ ขนาดของกลุ่มตัวอย่างที่เหมาะสมตามเป้าหมาย (Required Sample Size)</li>
          <li><strong>χ² (Chi-Square)</strong> คือ ค่าวิกฤตไคสแควร์ที่ระดับองศาอิสระเท่ากับ 1 (d.f. = 1) ณ ระดับความเชื่อมั่นที่เลือก
            <ul className="list-disc pl-6 mt-1">
              <li>ระดับความเชื่อมั่น 95% ค่า χ² = 3.841 (ใช้แพร่หลายที่สุดในตารางสากล)</li>
              <li>ระดับความเชื่อมั่น 99% ค่า χ² = 6.635</li>
              <li>ระดับความเชื่อมั่น 90% ค่า χ² = 2.706</li>
            </ul>
          </li>
          <li><strong>N</strong> คือ ขนาดของประชากรทั้งหมด (Population Size)</li>
          <li><strong>P</strong> คือ สัดส่วนของลักษณะประชากรที่คาดหวังในการวิจัย (Population Proportion) โดยปกติกำหนดไว้ที่ 0.50 (หรือ 50%) ซึ่งเป็นสัดส่วนที่ให้ขนาดกลุ่มตัวอย่างที่ปลอดภัยที่สุด</li>
          <li><strong>d</strong> คือ ระดับความคลาดเคลื่อนที่ผู้วิจัยยอมรับได้ในรูปของทศนิยม (Margin of Error) เช่น 5% จะได้ค่า d = 0.05</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-purple-800 dark:text-purple-400">
          เปรียบเทียบสูตร Taro Yamane กับ Krejcie &amp; Morgan
        </h3>
        <p>
          ผู้วิจัยมือใหม่หลายคนมักสงสัยว่าควรใช้สูตรใดดีกว่ากันระหว่างสองสูตรนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ความง่ายในการใช้:</strong> สูตร Taro Yamane มีรูปแบบสมการที่สั้นและง่ายกว่ามาก เพราะมีการลดรูปสมการโดยตัดเอาส่วนที่เป็นค่าสถิติ Chi-Square และสัดส่วนประชากรออกไปโดยปริยาย (คิดรวมไปกับเศษส่วนและจำกัดไว้ที่ความเชื่อมั่น 95% เท่านั้น)</li>
          <li><strong>จำนวนกลุ่มตัวอย่างที่ได้:</strong> เมื่อคำนวณที่ประชากรขนาดเล็ก (เช่น Nต่ำกว่า 500) สูตร Krejcie &amp; Morgan มักจะให้ขนาดกลุ่มตัวอย่างที่เล็กลงมาและสอดคล้องกับตารางสากลที่เหมาะสมกับพฤติกรรมกลุ่มประชากรจริง แต่สำหรับประชากรกลุ่มใหญ่ขึ้น ทั้งสองสูตรจะให้ผลลัพธ์ที่ใกล้เคียงกันอย่างมีนัยสำคัญ</li>
          <li><strong>การยอมรับในเชิงสากล:</strong> ทั้งสองสูตรได้รับการยอมรับอย่างกว้างขวางในระดับอุดมศึกษาและการทำงานวิจัยของไทย อย่างไรก็ดี หากผู้วิจัยต้องการอ้างอิงระดับความเชื่อมั่นอื่นๆ นอกเหนือจาก 95% (เช่น 99% ในการทดสอบสถิติคุณภาพวิชาการขั้นสูง) การเลือกใช้สูตร Krejcie &amp; Morgan จะตอบโจทย์และถูกต้องเหมาะสมกว่า</li>
        </ul>
        <p>
          โปรแกรมคำนวณขนาดกลุ่มตัวอย่าง Krejcie &amp; Morgan นี้ช่วยจำลองตารางค่าสำเร็จรูปของนักสถิติชื่อดังคู่นี้ ให้คุณสามารถกรอกค่าประชากรใดๆ และระดับความแปรปรวนที่ต้องการ เพื่อประมวลผลเป็นตัวเลขจริงได้อย่างแม่นยำ พร้อมทั้งระบุขั้นตอนคำนวณตามหลักคณิตศาสตร์
        </p>
      </article>
    </div>
  );
}
