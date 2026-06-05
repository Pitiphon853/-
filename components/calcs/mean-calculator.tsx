"use client";

import React, { useState } from "react";
import { Calculator, Sigma, ListOrdered, RotateCcw } from "lucide-react";

export default function MeanCalculator({ lang }: { lang?: "TH" | "EN" }) {
  const [inputData, setInputData] = useState<string>("");
  const [result, setResult] = useState<{ mean: number; sum: number; count: number } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateMean = () => {
    setError("");
    setResult(null);

    if (!inputData.trim()) {
      setError(lang === "EN" ? "Please enter some numbers." : "กรุณาป้อนตัวเลข");
      return;
    }

    // Replace newlines and commas with spaces, then split by spaces
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

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const count = numbers.length;
    const mean = sum / count;

    setResult({ mean, sum, count });
  };

  const clearData = () => {
    setInputData("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <Sigma className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Mean (Average) Calculator" : "เครื่องมือคำนวณค่าเฉลี่ยเลขคณิต (Mean)"}
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <ListOrdered className="w-4 h-4" />
            {lang === "EN" ? "Enter numbers (separated by comma, space, or newline):" : "ป้อนชุดตัวเลข (คั่นด้วยจุลภาค, ช่องว่าง หรือขึ้นบรรทัดใหม่):"}
          </label>
          <textarea
            rows={5}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
            placeholder="e.g. 10, 20, 30, 40, 50"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateMean}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Calculator className="w-5 h-5" />
            {lang === "EN" ? "Calculate Mean" : "คำนวณหาค่าเฉลี่ย"}
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
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 text-center">
              {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณ"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{lang === "EN" ? "Count (n)" : "จำนวนข้อมูล (n)"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.count}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{lang === "EN" ? "Sum (Σx)" : "ผลรวม (Σx)"}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{result.sum.toLocaleString('en-US', {maximumFractionDigits: 6})}</p>
              </div>
              
              <div className="bg-blue-600 dark:bg-blue-600 p-4 rounded-xl shadow-md text-center transform scale-105">
                <p className="text-sm text-blue-100 mb-1">{lang === "EN" ? "Mean (x̄)" : "ค่าเฉลี่ย (x̄)"}</p>
                <p className="text-3xl font-bold text-white">{result.mean.toLocaleString('en-US', {maximumFractionDigits: 6})}</p>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>{lang === "EN" ? "Formula used:" : "สูตรที่ใช้คำนวณ:"} <strong className="font-serif italic">x̄ = Σx / n</strong></p>
              <p className="font-serif italic text-base mt-1">
                = {result.sum.toLocaleString('en-US', {maximumFractionDigits: 4})} / {result.count} = {result.mean.toLocaleString('en-US', {maximumFractionDigits: 6})}
              </p>
            </div>
          </div>
        )}
      </div>

      <article className="mt-16 prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">ค่าเฉลี่ยเลขคณิต (Arithmetic Mean) คืออะไร?</h2>
        <p>
          ในทางสถิติ <strong>ค่าเฉลี่ยเลขคณิต (Arithmetic Mean)</strong> หรือที่คนส่วนใหญ่มักเรียกสั้นๆ ว่า "ค่าเฉลี่ย" หรือ "Average" เป็นหนึ่งในค่าวัดแนวโน้มเข้าสู่ส่วนกลาง (Measures of Central Tendency) ที่นิยมใช้มากที่สุด การหาค่าเฉลี่ยคือการนำค่าของข้อมูลทั้งหมดมารวมกัน แล้วหารด้วยจำนวนข้อมูลทั้งหมดที่มี เพื่อหา "ค่ากลาง" หรือตัวแทนของข้อมูลชุดนั้นๆ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">สูตรการคำนวณค่าเฉลี่ยเลขคณิต</h3>
        <p>
          สูตรพื้นฐานสำหรับการหาค่าเฉลี่ยเลขคณิตนั้นสามารถเขียนได้ 2 รูปแบบหลักๆ ขึ้นอยู่กับว่าชุดข้อมูลนั้นเป็นข้อมูลระดับประชากร (Population) หรือระดับกลุ่มตัวอย่าง (Sample) ถึงแม้วิธีการคำนวณจะเหมือนกันทุกประการ แต่สัญลักษณ์ที่ใช้จะแตกต่างกัน:
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <p className="font-bold mb-2">1. ค่าเฉลี่ยของประชากร (Population Mean)</p>
          <p className="font-serif text-xl mb-4 ml-4">$\mu = \frac{"{"}\sum X{"}"}{"{"}N{"}"}$</p>
          <ul className="text-sm list-none pl-4 space-y-1">
            <li>$\mu$ (มิว) = ค่าเฉลี่ยของประชากร</li>
            <li>$\sum X$ (ซิกมา เอ็กซ์) = ผลรวมของข้อมูลทุกตัวในประชากร</li>
            <li>$N$ = จำนวนประชากรทั้งหมด</li>
          </ul>

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <p className="font-bold mb-2">2. ค่าเฉลี่ยของกลุ่มตัวอย่าง (Sample Mean)</p>
          <p className="font-serif text-xl mb-4 ml-4">$\bar{"{"}x{"}"} = \frac{"{"}\sum x{"}"}{"{"}n{"}"}$</p>
          <ul className="text-sm list-none pl-4 space-y-1">
            <li>$\bar{"{"}x{"}"}$ (เอ็กซ์บาร์) = ค่าเฉลี่ยของกลุ่มตัวอย่าง</li>
            <li>$\sum x$ (ซิกมา เอ็กซ์) = ผลรวมของข้อมูลทุกตัวในกลุ่มตัวอย่าง</li>
            <li>$n$ = จำนวนกลุ่มตัวอย่าง</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">จุดเด่นและข้อจำกัดของค่าเฉลี่ย</h3>
        <p>
          <strong>จุดเด่น:</strong> ค่าเฉลี่ยเป็นค่าที่คำนวณได้ง่าย มีความหมายที่เข้าใจได้ทันที และที่สำคัญที่สุดคือเป็นตัวแทนที่นำ <strong>"ข้อมูลทุกตัว"</strong> มาคำนวณ ทำให้สะท้อนภาพรวมของชุดข้อมูลได้อย่างครบถ้วน 
        </p>
        <p>
          <strong>ข้อจำกัด:</strong> เนื่องจากค่าเฉลี่ยนำข้อมูลทุกตัวมาคำนวณ มันจึงมีความ <strong>"อ่อนไหวต่อค่าสุดโต่ง (Outliers)"</strong> เป็นอย่างมาก หากข้อมูลชุดนั้นมีค่าที่สูงผิดปกติหรือต่ำผิดปกติปะปนอยู่เพียงแค่ 1 หรือ 2 ตัว ค่าเฉลี่ยจะถูกดึงให้สูงขึ้นหรือต่ำลงตามค่านั้นทันที จนอาจทำให้ค่าเฉลี่ยไม่สามารถเป็นตัวแทนที่ดีของชุดข้อมูลนั้นได้อีกต่อไป
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เมื่อไหร่ที่ควร (และไม่ควร) ใช้ค่าเฉลี่ย?</h3>
        <p>
          เราควรใช้ค่าเฉลี่ยเมื่อข้อมูลนั้นมีการกระจายตัวแบบปกติ (Normal Distribution) คล้ายรูประฆังคว่ำ และไม่มีค่าสุดโต่ง (Outliers) ในกรณีเช่นนี้ ค่าเฉลี่ย ค่ามัธยฐาน (Median) และค่าฐานนิยม (Mode) จะมีค่าใกล้เคียงกันมาก 
        </p>
        <p>
          แต่หากคุณกำลังวิเคราะห์ข้อมูลรายได้ของประชากร ซึ่งมักจะมีกลุ่มคนจำนวนน้อยที่มีรายได้สูงปรี๊ด (ระดับมหาเศรษฐี) ข้อมูลลักษณะนี้เรียกว่าข้อมูลเบ้ขวา การใช้ "ค่าเฉลี่ย" จะทำให้ตัวเลขรายได้ดูสูงกว่าความเป็นจริงของคนส่วนใหญ่มาก ในสถานการณ์เช่นนี้ การใช้ "ค่ามัธยฐาน (Median)" จะเป็นตัวแทนที่ดีและสะท้อนความเป็นจริงได้ดีกว่า
        </p>
        <p>
          เครื่องมือคำนวณหาค่าเฉลี่ย (Mean Calculator) ถูกสร้างขึ้นเพื่ออำนวยความสะดวกในการหาผลรวมและคำนวณค่าเฉลี่ยของชุดข้อมูลขนาดใหญ่ โดยช่วยลดข้อผิดพลาดจากการกดเครื่องคิดเลขและการนับจำนวนข้อมูล ช่วยให้นักเรียน นักศึกษา หรือผู้ที่ต้องทำงานกับตัวเลขสามารถหาค่าตัวแทนข้อมูลได้อย่างถูกต้องแม่นยำและรวดเร็ว
        </p>
      </article>
    </div>
  );
}
