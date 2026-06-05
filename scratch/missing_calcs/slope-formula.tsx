"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, RefreshCw } from "lucide-react";

export default function SlopeFormula({ lang }: { lang?: "TH" | "EN" }) {
  const [x1, setX1] = useState<string>("2");
  const [y1, setY1] = useState<string>("3");
  const [x2, setX2] = useState<string>("5");
  const [y2, setY2] = useState<string>("9");

  const [result, setResult] = useState<{
    slope: number | "undefined";
    angleDegrees: number;
    dx: number;
    dy: number;
    slopeType: "positive" | "negative" | "zero" | "undefined";
    steps: string;
    coords1: [number, number];
    coords2: [number, number];
  } | null>({
    slope: 2,
    angleDegrees: 63.43,
    dx: 3,
    dy: 6,
    slopeType: "positive",
    steps: "m = (9 - 3) / (5 - 2) = 6 / 3 = 2",
    coords1: [2, 3],
    coords2: [5, 9],
  });

  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    const valX1 = parseFloat(x1);
    const valY1 = parseFloat(y1);
    const valX2 = parseFloat(x2);
    const valY2 = parseFloat(y2);

    if (isNaN(valX1) || isNaN(valY1) || isNaN(valX2) || isNaN(valY2)) {
      setError(
        lang === "EN"
          ? "Please enter valid numbers for all coordinates."
          : "กรุณากรอกตัวเลขพิกัดที่ถูกต้องทุกช่อง"
      );
      return;
    }

    const dx = valX2 - valX1;
    const dy = valY2 - valY1;

    if (dx === 0) {
      // Undefined slope (vertical line)
      setResult({
        slope: "undefined",
        angleDegrees: 90,
        dx,
        dy,
        slopeType: "undefined",
        steps: `m = (${valY2} - ${valY1}) / (${valX2} - ${valX1}) = ${dy} / 0 (ไม่มีนิยาม เนื่องจากตัวหารเป็นศูนย์)`,
        coords1: [valX1, valY1],
        coords2: [valX2, valY2],
      });
      return;
    }

    const slope = dy / dx;
    const angleRad = Math.atan(slope);
    const angleDegrees = (angleRad * 180) / Math.PI;

    let slopeType: "positive" | "negative" | "zero" = "zero";
    if (slope > 0) slopeType = "positive";
    else if (slope < 0) slopeType = "negative";

    const steps = `m = (${valY2} - ${valY1}) / (${valX2} - ${valX1}) = ${dy.toFixed(2).replace(/\.00$/, "")} / ${dx.toFixed(2).replace(/\.00$/, "")} = ${slope.toFixed(4).replace(/\.0000$/, "")}`;

    setResult({
      slope,
      angleDegrees,
      dx,
      dy,
      slopeType,
      steps,
      coords1: [valX1, valY1],
      coords2: [valX2, valY2],
    });
  };

  const clear = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
    setError("");
  };

  // SVG parameters
  let mapX = (x: number) => 150;
  let mapY = (y: number) => 100;
  if (result) {
    const [cx1, cy1] = result.coords1;
    const [cx2, cy2] = result.coords2;
    const pad = 40;
    const width = 300;
    const height = 200;

    const xMin = Math.min(cx1, cx2);
    const xMax = Math.max(cx1, cx2);
    const yMin = Math.min(cy1, cy2);
    const yMax = Math.max(cy1, cy2);

    const dx = xMax - xMin || 1;
    const dy = yMax - yMin || 1;

    mapX = (x: number) => pad + ((x - xMin) / dx) * (width - 2 * pad);
    mapY = (y: number) => height - (pad + ((y - yMin) / dy) * (height - 2 * pad));
  }

  const getSlopeTypeLabel = (type: string) => {
    if (lang === "EN") {
      switch (type) {
        case "positive": return "Positive Slope (Rises left to right)";
        case "negative": return "Negative Slope (Falls left to right)";
        case "zero": return "Zero Slope (Horizontal line)";
        default: return "Undefined Slope (Vertical line)";
      }
    } else {
      switch (type) {
        case "positive": return "ความชันเป็นบวก (ทำมุมแหลมกับแกน X จากซ้ายไปขวา)";
        case "negative": return "ความชันเป็นลบ (ทำมุมป้านกับแกน X จากซ้ายไปขวา)";
        case "zero": return "ความชันเป็นศูนย์ (เส้นตรงแนวนอนขนานแกน X)";
        default: return "ความชันไม่มีนิยาม (เส้นตรงตั้งฉากกับแกน X)";
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Slope Formula Calculator" : "เครื่องมือคำนวณหาความชัน (Slope)"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {lang === "EN" ? "Point A (x₁, y₁)" : "จุดที่ 1: Point A (x₁, y₁)"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">x₁</label>
                <input
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₁</label>
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. 3"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {lang === "EN" ? "Point B (x₂, y₂)" : "จุดที่ 2: Point B (x₂, y₂)"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">x₂</label>
                <input
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₂</label>
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. 9"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Slope" : "คำนวณหาความชัน"}
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

        <div className="flex flex-col justify-between space-y-4">
          {result ? (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-teal-300 mb-4 text-center">
                  {lang === "EN" ? "Calculation Result" : "ผลลัพธ์การคำนวณความชัน"}
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-center border border-blue-50 dark:border-gray-700">
                    <p className="text-[11px] text-gray-400 mb-1">{lang === "EN" ? "Slope (m)" : "ค่าความชัน (m)"}</p>
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                      {result.slope === "undefined" ? "Undefined" : result.slope.toFixed(4).replace(/\.?0+$/, "")}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-center border border-blue-50 dark:border-gray-700">
                    <p className="text-[11px] text-gray-400 mb-1">{lang === "EN" ? "Angle (θ)" : "มุมเอียง (θ)"}</p>
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                      {result.angleDegrees.toFixed(2)}&deg;
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-50 dark:border-gray-700 text-center mb-4">
                  <p className="text-[11px] text-gray-400 mb-1">{lang === "EN" ? "Slope Type" : "ประเภทความชัน"}</p>
                  <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                    {getSlopeTypeLabel(result.slopeType)}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <p><strong>{lang === "EN" ? "Slope Formula:" : "สูตรความชัน:"}</strong> m = (y₂ - y₁) / (x₂ - x₁)</p>
                  <p className="font-mono bg-gray-50 dark:bg-gray-800/80 p-2 rounded text-center overflow-x-auto whitespace-nowrap">
                    {result.steps}
                  </p>
                </div>
              </div>

              {/* Graphical representation of the slope line */}
              <div className="mt-4 flex justify-center bg-white dark:bg-gray-800 rounded-xl p-2 border border-blue-50 dark:border-gray-700">
                <svg width="100%" height="160" viewBox="0 0 300 200" className="overflow-visible">
                  <rect width="300" height="200" fill="#f8fafc" className="dark:fill-gray-900/50" rx="8" />
                  
                  {/* Grid Lines helper (horizontal and vertical) */}
                  <line
                    x1={mapX(result.coords1[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords1[1])}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                    className="dark:stroke-gray-700"
                  />
                  <line
                    x1={mapX(result.coords2[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords2[1])}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                    className="dark:stroke-gray-700"
                  />

                  {/* Slope line connection */}
                  <line
                    x1={mapX(result.coords1[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords2[1])}
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                  
                  {/* Point A */}
                  <circle cx={mapX(result.coords1[0])} cy={mapY(result.coords1[1])} r="5" fill="#10b981" />
                  <text
                    x={mapX(result.coords1[0]) - 10}
                    y={mapY(result.coords1[1]) - 5}
                    textAnchor="end"
                    className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400"
                  >
                    A({result.coords1[0]}, {result.coords1[1]})
                  </text>

                  {/* Point B */}
                  <circle cx={mapX(result.coords2[0])} cy={mapY(result.coords2[1])} r="5" fill="#ef4444" />
                  <text
                    x={mapX(result.coords2[0]) + 10}
                    y={mapY(result.coords2[1]) + 12}
                    textAnchor="start"
                    className="text-[10px] font-bold fill-red-600 dark:fill-red-400"
                  >
                    B({result.coords2[0]}, {result.coords2[1]})
                  </text>

                  {/* Rise / Run text */}
                  <text
                    x={(mapX(result.coords1[0]) + mapX(result.coords2[0])) / 2}
                    y={mapY(result.coords1[1]) + (result.coords2[1] >= result.coords1[1] ? 12 : -5)}
                    textAnchor="middle"
                    className="text-[9px] fill-gray-500"
                  >
                    Run (Δx) = {result.dx.toFixed(1).replace(/\.0$/, "")}
                  </text>

                  <text
                    x={mapX(result.coords2[0]) + 8}
                    y={(mapY(result.coords1[1]) + mapY(result.coords2[1])) / 2}
                    textAnchor="start"
                    className="text-[9px] fill-gray-500"
                  >
                    Rise (Δy) = {result.dy.toFixed(1).replace(/\.0$/, "")}
                  </text>
                </svg>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <TrendingUp className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter the coordinate values and click Calculate."
                  : "กรอกพิกัดจุด A และ B แล้วกดคำนวณด้านซ้าย เพื่อหาความชัน"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-300">
          สูตรคำนวณหาความชัน (Slope Formula) คืออะไร? เจาะลึกนิยามและวิธีการหาค่าอัตราส่วนความชัน
        </h2>
        <p>
          ในคณิตศาสตร์เรขาคณิต <strong>ความชัน (Slope)</strong> ซึ่งมักจะใช้สัญลักษณ์แทนด้วยตัวแปร <strong>m</strong> เป็นการวัดระดับความลาดเอียงและทิศทางของเส้นตรง โดยความชันเป็นอัตราส่วนของ "ระยะทางในแนวตั้งที่เปลี่ยนไป" (Rise) ต่อ "ระยะทางในแนวนอนที่เปลี่ยนไป" (Run) ระหว่างจุดสองจุดใดๆ บนเส้นตรงนั้น ความชันเป็นแกนหลักของการเรียนรู้พีชคณิต เรขาคณิตวิเคราะห์ และเป็นพื้นฐานที่สำคัญยิ่งในระดับแคลคูลัสเกี่ยวกับการหาอนุพันธ์ (Derivatives)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-800 dark:text-blue-400">
          สูตรความชันและหลักการคำนวณ
        </h3>
        <p>
          หากเราทราบพิกัดของจุดสองจุดบนเส้นตรง ได้แก่ จุด A ซึ่งมีพิกัด (x₁, y₁) และจุด B ซึ่งมีพิกัด (x₂, y₂) เราจะสามารถคำนวณหาความชัน m ได้จากสมการ:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center font-serif text-lg">
          m = (y₂ - y₁) / (x₂ - x₁)
        </div>
        <p>
          สูตรนี้เรียกกันโดยทั่วไปว่า <strong>"Rise over Run"</strong> โดยที่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Rise (y₂ - y₁):</strong> คือระยะการเปลี่ยนแปลงตามแนวดิ่ง (แนวตั้ง)</li>
          <li><strong>Run (x₂ - x₁):</strong> คือระยะการเปลี่ยนแปลงตามแนวราบ (แนวนอน)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-800 dark:text-blue-400">
          การจำแนกความชันออกเป็น 4 ประเภทหลัก
        </h3>
        <p>
          ทิศทางและลักษณะของเส้นตรงสามารถบอกค่าความชันของเส้นตรงนั้นได้โดยตรง ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>ความชันเป็นบวก (Positive Slope, m &gt; 0):</strong> เส้นตรงจะเฉียงขึ้นจากด้านซ้ายไปด้านขวา ซึ่งหมายความว่าเมื่อค่า X เพิ่มขึ้น ค่า Y จะเพิ่มขึ้นตามไปด้วย ทำมุมแหลม (น้อยกว่า 90&deg;) กับแกน X ทางฝั่งบวก</li>
          <li><strong>ความชันเป็นลบ (Negative Slope, m &lt; 0):</strong> เส้นตรงจะลาดลงจากด้านซ้ายไปด้านขวา ซึ่งหมายความว่าเมื่อค่า X เพิ่มขึ้น ค่า Y จะลดลงแทน ทำมุมป้าน (มากกว่า 90&deg; แต่ไม่ถึง 180&deg;) กับแกน X ทางฝั่งบวก</li>
          <li><strong>ความชันเป็นศูนย์ (Zero Slope, m = 0):</strong> เกิดขึ้นเมื่อพิกัดในแนวตั้งคงที่ (y₁ = y₂) แต่พิกัดแนวนอนเปลี่ยนไป เส้นตรงในลักษณะนี้จะเป็นเส้นตรงแนวนอนที่ขนานกับแกน X</li>
          <li><strong>ความชันไม่มีนิยาม (Undefined Slope):</strong> เกิดขึ้นเมื่อพิกัดในแนวนอนคงที่ (x₁ = x₂) ซึ่งจะทำให้เกิดการหารด้วยศูนย์ (Division by Zero) ในทางคณิตศาสตร์จะไม่มีนิยามค่าความชันนี้ และเส้นตรงจะเป็นเส้นแนวตั้งฉากกับแกน X</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-800 dark:text-blue-400">
          ตัวอย่างการประยุกต์ใช้นอกห้องเรียน
        </h3>
        <p>
          ความชันนำมาใช้ในการคำนวณทางวิศวกรรมและการใช้ชีวิตจริงในหลายด้าน:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>การสร้างถนนและทางรถไฟ:</strong> การควบคุมเปอร์เซ็นต์ความชันของทางลาดเขาเพื่อให้รถยนต์หรือรถไฟสามารถแล่นขึ้นได้อย่างปลอดภัยโดยไม่ลื่นไถลหรือคว่ำ</li>
          <li><strong>การสร้างระบบระบายน้ำ:</strong> ท่อระบายน้ำหรือรางน้ำฝนต้องมีความลาดชันที่เหมาะสม (เช่น 1:100 หรือ 1:50) เพื่อให้น้ำไหลตามแรงโน้มถ่วงได้สะดวกและไม่ขัง</li>
          <li><strong>ความชันของทางลาดสำหรับผู้พิการ (Wheelchair Ramp):</strong> มาตรฐานสากลระบุให้มีความลาดชันที่ไม่เกิน 1:12 เพื่อให้ผู้ใช้รถเข็นสามารถเคลื่อนที่ขึ้นด้วยตัวเองได้สะดวก</li>
        </ul>
        <p>
          โปรแกรมคำนวณความชันนี้ช่วยวิเคราะห์จุดสองพิกัดใดๆ ทันที พร้อมหาค่ามุมทำมุมลาดเอียงของแกน X ในหน่วยองศา และสรุปทิศทางความชันพร้อมแผนภาพเส้นเวกเตอร์ เหมาะสำหรับผู้เริ่มต้นศึกษาคณิตศาสตร์และวิศวกรออกแบบโครงสร้าง
        </p>
      </article>
    </div>
  );
}
