"use client";

import React, { useState } from "react";
import { Calculator, Users, Percent, RotateCcw } from "lucide-react";

export default function TaroYamaneSampleSize({ lang }: { lang?: "TH" | "EN" }) {
  const [population, setPopulation] = useState<string>("1000");
  const [errorMargin, setErrorMargin] = useState<string>("5");
  const [result, setResult] = useState<{
    sampleSize: number;
    exactValue: number;
    formulaSteps: string;
  } | null>({
    sampleSize: 286,
    exactValue: 285.714,
    formulaSteps: "n = 1000 / (1 + 1000 * (0.05)^2)",
  });
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    const N = parseFloat(population);
    const ePercent = parseFloat(errorMargin);

    if (isNaN(N) || N <= 0) {
      setError(
        lang === "EN"
          ? "Please enter a valid population size greater than 0."
          : "กรุณากรอกจำนวนประชากรที่มากกว่า 0"
      );
      return;
    }

    if (isNaN(ePercent) || ePercent <= 0 || ePercent >= 100) {
      setError(
        lang === "EN"
          ? "Please enter a valid margin of error between 0% and 100%."
          : "กรุณากรอกความคลาดเคลื่อนระหว่าง 0% ถึง 100%"
      );
      return;
    }

    const e = ePercent / 100;
    const denominator = 1 + N * Math.pow(e, 2);
    const nExact = N / denominator;
    const nRounded = Math.ceil(nExact);

    setResult({
      sampleSize: nRounded,
      exactValue: nExact,
      formulaSteps: `n = ${N} / (1 + ${N} * (${e})^2)`,
    });
  };

  const clear = () => {
    setPopulation("");
    setErrorMargin("5");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN"
            ? "Taro Yamane Sample Size Calculator"
            : "เครื่องมือคำนวณขนาดกลุ่มตัวอย่าง Taro Yamane"}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g. 1000"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === "EN" ? "Margin of Error (e) %" : "ระดับความคลาดเคลื่อนที่ยอมรับได้ (e) %"}
            </label>
            <div className="relative">
              <input
                type="number"
                value={errorMargin}
                onChange={(e) => setErrorMargin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12"
                placeholder="e.g. 5"
                step="0.1"
                min="0.1"
                max="99"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">
                %
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              {["1", "5", "10"].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  onClick={() => setErrorMargin(percent)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    errorMargin === percent
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {percent}% ({lang === "EN" ? "e = " : "e = "}{parseFloat(percent)/100})
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Size" : "คำนวณขนาดตัวอย่าง"}
            </button>
            <button
              onClick={clear}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold transition-all active:scale-95"
              title={lang === "EN" ? "Clear" : "ล้างค่า"}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
              <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 text-center">
                {lang === "EN" ? "Resulting Sample Size" : "ผลการคำนวณขนาดกลุ่มตัวอย่าง"}
              </h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border border-indigo-50 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Minimum Required Sample Size (n)" : "จำนวนตัวอย่างขั้นต่ำที่ต้องการ (n)"}
                </p>
                <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-2">
                  {result.sampleSize}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {lang === "EN" ? `Exact value: ~${result.exactValue.toFixed(4)} (Rounded Up)` : `ค่าที่คำนวณได้จริง: ~${result.exactValue.toFixed(4)} (ปัดเศษขึ้น)`}
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {lang === "EN" ? "Yamane's Formula:" : "สูตร Taro Yamane ที่ใช้:"}
                  </p>
                  <p className="font-mono text-center text-indigo-600 dark:text-indigo-400">
                    n = N / (1 + N * e&sup2;)
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {lang === "EN" ? "Calculation Steps:" : "ขั้นตอนแทนค่าในสูตร:"}
                  </p>
                  <p className="font-mono text-xs overflow-x-auto whitespace-nowrap text-center">
                    {result.formulaSteps}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <Users className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter population size and error margin, then click Calculate."
                  : "กรอกข้อมูลประชากรและความคลาดเคลื่อน แล้วกดปุ่มคำนวณด้านซ้าย"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">
          สูตรทาโร่ ยามาเน่ (Taro Yamane) คืออะไร? และสำคัญอย่างไรในการทำงานวิจัย?
        </h2>
        <p>
          ในการทำวิจัยเชิงปริมาณ (Quantitative Research) หนึ่งในอุปสรรคสำคัญที่ผู้วิจัยต้องเผชิญคือ "การเก็บข้อมูล" เนื่องจากในความเป็นจริงแล้ว ผู้วิจัยมักไม่สามารถจัดเก็บข้อมูลจากประชากรทั้งหมด (Population) ได้ เนื่องจากมีข้อจำกัดในเรื่องของเวลา งบประมาณ และกำลังคน ดังนั้น การเลือกใช้กลุ่มตัวอย่าง (Sample) ที่มีขนาดเหมาะสมและเป็นตัวแทนที่ดีจึงมีความสำคัญเป็นอย่างยิ่ง และหนึ่งในสูตรคำนวณที่ได้รับความนิยมอย่างแพร่หลายในประเทศไทยคือ <strong>สูตรทาโร่ ยามาเน่ (Taro Yamane)</strong>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          ประวัติความเป็นมาและสูตรการคำนวณ
        </h3>
        <p>
          สูตรนี้ถูกนำเสนอโดยนักสถิติชื่อ Taro Yamane ในปี ค.ศ. 1967 เพื่อเป็นวิธีที่รวดเร็วและง่ายในการคำนวณขนาดกลุ่มตัวอย่างที่ต้องการ โดยมีเงื่อนไขว่าผู้วิจัยจะต้องทราบจำนวนประชากรที่แน่นอน (Finite Population) และยอมรับระดับความคลาดเคลื่อน (Margin of Error) ที่เกิดขึ้นได้จากการสุ่มกลุ่มตัวอย่าง
        </p>
        <p>
          สูตรของทาโร่ ยามาเน่ เขียนได้ดังนี้:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center font-serif text-xl">
          n = N / [1 + N * e&sup2;]
        </div>
        <p>
          โดยที่ตัวแปรต่างๆ มีความหมายดังต่อไปนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>n</strong> คือ ขนาดของกลุ่มตัวอย่างขั้นต่ำที่ต้องการ (Sample Size)</li>
          <li><strong>N</strong> คือ ขนาดของประชากรทั้งหมดที่ศึกษา (Population Size)</li>
          <li><strong>e</strong> คือ ระดับความคลาดเคลื่อนที่ผู้วิจัยยอมรับได้ (Margin of Error) เช่น หากยอมรับความคลาดเคลื่อน 5% จะได้ค่า e = 0.05 หากยอมรับความคลาดเคลื่อน 1% จะได้ e = 0.01</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          ตัวอย่างการคำนวณอย่างเป็นขั้นตอน
        </h3>
        <p>
          สมมติว่าคุณต้องการทำการวิจัยโดยมีประชากรเป้าหมายทั้งหมด 1,000 คน (N = 1000) และยอมรับระดับความคลาดเคลื่อนได้ 5% (e = 0.05) ผู้วิจัยสามารถแทนค่าในสูตรได้ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>คำนวณส่วนยกกำลังสองของความคลาดเคลื่อน: e&sup2; = 0.05 * 0.05 = 0.0025</li>
          <li>คูณประชากรกับความคลาดเคลื่อนยกกำลังสอง: N * e&sup2; = 1000 * 0.0025 = 2.5</li>
          <li>บวกด้วยหนึ่ง: 1 + 2.5 = 3.5</li>
          <li>หารจำนวนประชากรทั้งหมดด้วยผลลัพธ์ข้างต้น: n = 1000 / 3.5 &asymp; 285.71</li>
          <li>ปัดเศษขึ้นเสมอเพื่อให้มั่นใจว่าได้กลุ่มตัวอย่างไม่น้อยกว่าสัดส่วนที่ต้องการ ดังนั้น ขนาดกลุ่มตัวอย่างที่ต้องใช้คือ <strong>286 คน</strong></li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          ข้อกำหนดและข้อจำกัดของการใช้สูตร Taro Yamane
        </h3>
        <p>
          แม้ว่าสูตรของทาโร่ ยามาเน่ จะสะดวกและคำนวณง่าย แต่ผู้วิจัยจำเป็นต้องตระหนักถึงเงื่อนไขพื้นฐานดังต่อไปนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ต้องทราบจำนวนประชากรทั้งหมด (N) ที่แน่นอน:</strong> หากไม่ทราบจำนวนประชากรที่แน่นอน จะไม่สามารถคำนวณด้วยสูตรนี้ได้ และควรเปลี่ยนไปใช้สูตรอื่น เช่น สูตรของ Cochran</li>
          <li><strong>ระดับความเชื่อมั่นถูกกำหนดไว้คงที่:</strong> สูตรนี้มีพื้นฐานมาจากระดับความเชื่อมั่น (Confidence Level) ที่ 95% และสัดส่วนของลักษณะที่สนใจในประชากร (p) เท่ากับ 0.5 (ระดับความแปรปรวนสูงสุด) ซึ่งช่วยอำนวยความสะดวกให้ผู้วิจัยไม่ต้องกรอกค่าสถิติ Z เพิ่มเติม</li>
          <li><strong>ความคลาดเคลื่อนเชิงสถิติ:</strong> การเลือกค่า e ควรเหมาะสมกับระดับความละเอียดของงานวิจัย โดยทั่วไปในสังคมศาสตร์นิยมใช้ e = 0.05 (คลาดเคลื่อน 5%) ส่วนงานวิจัยเชิงวิทยาศาสตร์หรือการแพทย์มักนิยม e = 0.01 (คลาดเคลื่อน 1%) หรือเล็กกว่านั้น</li>
        </ul>
        <p>
          ระบบคำนวณขนาดกลุ่มตัวอย่างของทาโร่ ยามาเน่ (Taro Yamane Sample Size Calculator) นี้สร้างขึ้นเพื่อช่วยให้นักศึกษาและนักวิจัยลดข้อผิดพลาดในการคิดคำนวณและสามารถกำหนดขนาดกลุ่มตัวอย่างที่ต้องการสำหรับโครงร่างวิจัย (Research Proposal) ได้อย่างถูกต้องรวดเร็ว
        </p>
      </article>
    </div>
  );
}
