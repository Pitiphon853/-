"use client";

import React, { useState } from "react";
import { Calculator, ArrowUpDown, ListOrdered, RotateCcw } from "lucide-react";

export default function RangeCalculator({ lang }: any) {
  const [inputData, setInputData] = useState<string>("");
  const [result, setResult] = useState<{
    min: number;
    max: number;
    range: number;
    count: number;
    sorted: number[];
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateRange = () => {
    setError("");
    setResult(null);

    if (!inputData.trim()) {
      setError(lang === "EN" ? "Please enter some numbers." : "กรุณาป้อนตัวเลข");
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

    if (numbers.length < 2) {
      setError(lang === "EN" ? "Please enter at least 2 numbers." : "กรุณาป้อนตัวเลขอย่างน้อย 2 ตัว");
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    setResult({
      min,
      max,
      range,
      count: numbers.length,
      sorted,
    });
  };

  const clearData = () => {
    setInputData("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <ArrowUpDown className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Range Calculator" : "เครื่องมือคำนวณหาค่าพิสัย (Range)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ListOrdered className="w-4 h-4" />
            {lang === "EN"
              ? "Enter dataset (separated by comma, space, or newline):"
              : "ป้อนชุดข้อมูล (คั่นด้วยจุลภาค, ช่องว่าง หรือขึ้นบรรทัดใหม่):"}
          </label>
          <textarea
            rows={5}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g. 15, 23, 8, 42, 35, 19"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateRange}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Range" : "คำนวณหาค่าพิสัย"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Count (n)" : "จำนวนข้อมูล (n)"}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.count}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Minimum (Min)" : "ค่าต่ำสุด (Min)"}
                </p>
                <p className="text-2xl font-bold text-red-500 dark:text-red-400">
                  {result.min.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === "EN" ? "Maximum (Max)" : "ค่าสูงสุด (Max)"}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {result.max.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>

              <div className="bg-indigo-600 dark:bg-indigo-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-indigo-100 mb-1">
                  {lang === "EN" ? "Range (R)" : "ค่าพิสัย (R)"}
                </p>
                <p className="text-3xl font-bold text-white">
                  {result.range.toLocaleString("en-US", { maximumFractionDigits: 6 })}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>{lang === "EN" ? "Sorted Dataset:" : "ข้อมูลที่เรียงลำดับแล้ว (จากน้อยไปมาก):"}</strong>{" "}
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  {result.sorted.map((val) => val.toString()).join(", ")}
                </span>
              </p>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
              <p className="text-center">
                {lang === "EN" ? "Formula used:" : "สูตรที่ใช้คำนวณ:"}{" "}
                <strong className="font-serif italic text-base">Range = Max - Min</strong>
              </p>
              <p className="text-center font-mono italic text-indigo-600 dark:text-indigo-400">
                Range = {result.max.toLocaleString("en-US", { maximumFractionDigits: 4 })} -{" "}
                {result.min.toLocaleString("en-US", { maximumFractionDigits: 4 })} ={" "}
                {result.range.toLocaleString("en-US", { maximumFractionDigits: 6 })}
              </p>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">ค่าพิสัย (Range) ในทางสถิติคืออะไร?</h2>
        <p>
          ในวิชาสถิติศาสตร์ <strong>พิสัย (Range)</strong> คือค่าวัดการกระจาย (Measures of Dispersion) ที่ง่ายที่สุดและเป็นพื้นฐานที่สุด เป็นค่าที่แสดงถึงระยะความแตกต่างระหว่างข้อมูลที่มีค่าสูงสุดและข้อมูลที่มีค่าต่ำสุดในชุดข้อมูลนั้นๆ การหาค่าพิสัยช่วยให้เราทราบว่าข้อมูลชุดดังกล่าวมีขอบเขตการกระจายตัวกว้างมากน้อยเพียงใดอย่างรวดเร็ว
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคำนวณค่าพิสัย</h3>
        <p>
          สูตรในการคำนวณหาค่าพิสัยนั้นไม่มีความซับซ้อนใดๆ โดยมีสูตรคณิตศาสตร์ดังนี้:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center">
          <p className="font-serif text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            $R = X_{"{"}max{"}"} - X_{"{"}min{"}"}$
          </p>
          <div className="mt-3 text-sm text-left inline-block">
            <p>โดยที่:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>$R$ คือ ค่าพิสัย (Range)</li>
              <li>$X_{"{"}max{"}"}$ คือ ค่าที่สูงที่สุดในชุดข้อมูล (Maximum Value)</li>
              <li>$X_{"{"}min{"}"}$ คือ ค่าที่ต่ำที่สุดในชุดข้อมูล (Minimum Value)</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ตัวอย่างการคำนวณหาค่าพิสัย</h3>
        <p>
          สมมติว่าเรามีคะแนนสอบของนักเรียนกลุ่มหนึ่ง ได้แก่ 15, 23, 8, 42, 35 และ 19 คะแนน
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>เรียงลำดับข้อมูล:</strong> ทำการเรียงลำดับจากน้อยไปมาก เพื่อให้หาค่าสูงสุดและต่ำสุดได้ง่ายขึ้น จะได้: 8, 15, 19, 23, 35, 42</li>
          <li><strong>ระบุค่าสูงสุดและต่ำสุด:</strong> ค่าต่ำสุด ($X_{"{"}min{"}"}$) คือ 8 และค่าสูงสุด ($X_{"{"}max{"}"}$) คือ 42</li>
          <li><strong>แทนค่าในสูตร:</strong> พิสัย = 42 - 8 = 34 คะแนน</li>
        </ol>
        <p>
          ดังนั้น ค่าพิสัยของคะแนนสอบชุดนี้คือ 34 คะแนน ซึ่งหมายความว่าช่วงของคะแนนมีความกว้างเท่ากับ 34
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประโยชน์และข้อจำกัดของค่าพิสัย</h3>
        <p>
          <strong>ประโยชน์:</strong> จุดเด่นที่สุดของพิสัยคือคำนวณได้สะดวก รวดเร็ว และเข้าใจได้ง่ายมากที่สุดเมื่อเปรียบเทียบกับการวัดการกระจายรูปแบบอื่น เช่น ส่วนเบี่ยงเบนมาตรฐาน (SD) หรือความแปรปรวน (Variance) เหมาะสำหรับการสำรวจข้อมูลในเบื้องต้นเพื่อดูระยะห่างคร่าวๆ
        </p>
        <p>
          <strong>ข้อจำกัด:</strong> เนื่องจากพิสัยใช้เพียงข้อมูลแค่ 2 ตัวเท่านั้น คือค่าสูงสุดและค่าต่ำสุด โดยไม่สนใจการกระจายตัวของข้อมูลตัวอื่นๆ ที่อยู่ตรงกลางเลย ทำให้มันเป็นค่าวัดที่ไม่มีความเสถียร หากชุดข้อมูลมีค่าใดค่าหนึ่งที่สูงหรือต่ำเกินไปอย่างผิดปกติ (Outliers) ค่าพิสัยจะเปลี่ยนไปทันที ซึ่งอาจส่งผลให้เกิดการตีความที่คลาดเคลื่อนเกี่ยวกับการกระจายตัวที่แท้จริงของข้อมูลส่วนใหญ่ได้
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">การประยุกต์ใช้งาน</h3>
        <p>
          แม้ว่าพิสัยจะมีข้อจำกัดในการวิเคราะห์สถิติขั้นสูง แต่ในชีวิตประจำวันและการทำงานหลายด้านก็ยังคงนิยมใช้ เช่น:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>การรายงานสภาพอากาศ:</strong> การบอกอุณหภูมิสูงสุดและต่ำสุดประจำวันเพื่อรายงานช่วงอุณหภูมิที่เปลี่ยนแปลง</li>
          <li><strong>ตลาดหุ้น:</strong> การแสดงราคาซื้อขายสูงสุดและต่ำสุดในรอบวันเพื่อดูความผันผวนของราคาหุ้น</li>
          <li><strong>การควบคุมคุณภาพการผลิต (Quality Control):</strong> การสร้างแผนภูมิควบคุม (Control Charts) ในโรงงานอุตสาหกรรม มักใช้พิสัยในการตรวจสอบความแปรผันของกระบวนการผลิตในระยะสั้น</li>
        </ul>
        <p>
          เครื่องมือคำนวณพิสัยออนไลน์นี้ช่วยให้คุณประหยัดเวลาและลดความผิดพลาดในการเรียงข้อมูลและคำนวณ เพียงแค่กรอกชุดข้อมูลที่ต้องการ ระบบจะเรียงลำดับข้อมูล ดึงค่าสูงสุด ต่ำสุด และลบกันเพื่อแสดงผลลัพธ์เป็นค่าพิสัยที่ถูกต้องทันที
        </p>
      </article>
    </div>
  );
}
