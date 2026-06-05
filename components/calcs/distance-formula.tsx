"use client";

import React, { useState } from "react";
import { Calculator, Milestone, RefreshCw } from "lucide-react";

export default function DistanceFormula({ lang }: { lang?: "TH" | "EN" }) {
  const [x1, setX1] = useState<string>("1");
  const [y1, setY1] = useState<string>("2");
  const [x2, setX2] = useState<string>("4");
  const [y2, setY2] = useState<string>("6");

  const [result, setResult] = useState<{
    distance: number;
    dx: number;
    dy: number;
    sumSquares: number;
    steps: string;
    coords1: [number, number];
    coords2: [number, number];
  } | null>({
    distance: 5,
    dx: 3,
    dy: 4,
    sumSquares: 25,
    steps: "d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5",
    coords1: [1, 2],
    coords2: [4, 6],
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
    const sumSquares = dx * dx + dy * dy;
    const distance = Math.sqrt(sumSquares);

    const steps = `d = √(([${valX2}] - [${valX1}])² + ([${valY2}] - [${valY1}])²) = √(${dx.toFixed(2).replace(/\.00$/, "")}² + ${dy.toFixed(2).replace(/\.00$/, "")}²) = √(${Math.pow(dx, 2).toFixed(2).replace(/\.00$/, "")} + ${Math.pow(dy, 2).toFixed(2).replace(/\.00$/, "")}) = √${sumSquares.toFixed(2).replace(/\.00$/, "")} = ${distance.toFixed(4).replace(/\.0000$/, "")}`;

    setResult({
      distance,
      dx,
      dy,
      sumSquares,
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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <Milestone className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Distance Formula Calculator" : "เครื่องมือคำนวณหาระยะทางระหว่างสองจุด (Distance)"}
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₁</label>
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g. 2"
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g. 4"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₂</label>
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g. 6"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Distance" : "คำนวณหาระยะทาง"}
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
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-teal-300 mb-4 text-center">
                  {lang === "EN" ? "Calculated Distance (d)" : "ผลรวมระยะทางที่ได้ (d)"}
                </h3>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-emerald-50 dark:border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">{lang === "EN" ? "Euclidean Distance" : "ระยะห่างทางตรง"}</p>
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {result.distance.toFixed(6).replace(/\.?0+$/, "")}
                  </p>
                </div>

                <div className="mt-4 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <p><strong>{lang === "EN" ? "Formula:" : "สูตร:"}</strong> d = √((x₂ - x₁)² + (y₂ - y₁)²)</p>
                  <p className="font-mono bg-gray-50 dark:bg-gray-800/80 p-2 rounded text-center overflow-x-auto whitespace-nowrap">
                    {result.steps}
                  </p>
                </div>
              </div>

              {/* Graphical representation of the right-angled triangle */}
              <div className="mt-6 flex justify-center bg-white dark:bg-gray-800 rounded-xl p-2 border border-emerald-50 dark:border-gray-700">
                <svg width="100%" height="180" viewBox="0 0 300 200" className="overflow-visible">
                  <rect width="300" height="200" fill="#f8fafc" className="dark:fill-gray-900/50" rx="8" />
                  
                  {/* Grid Lines helper (horizontal and vertical to form right triangle) */}
                  <line
                    x1={mapX(result.coords1[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords1[1])}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                  />
                  <line
                    x1={mapX(result.coords2[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords2[1])}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                  />

                  {/* Direct connection (Hypotenuse) */}
                  <line
                    x1={mapX(result.coords1[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords2[1])}
                    stroke="#059669"
                    strokeWidth="3"
                  />
                  
                  {/* Point A */}
                  <circle cx={mapX(result.coords1[0])} cy={mapY(result.coords1[1])} r="5" fill="#3b82f6" />
                  <text
                    x={mapX(result.coords1[0]) - 10}
                    y={mapY(result.coords1[1]) - 5}
                    textAnchor="end"
                    className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400"
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

                  {/* Horizontal delta label */}
                  <text
                    x={(mapX(result.coords1[0]) + mapX(result.coords2[0])) / 2}
                    y={mapY(result.coords1[1]) + (result.coords2[1] >= result.coords1[1] ? 12 : -5)}
                    textAnchor="middle"
                    className="text-[9px] fill-gray-500 font-semibold"
                  >
                    Δx = {result.dx.toFixed(1).replace(/\.0$/, "")}
                  </text>

                  {/* Vertical delta label */}
                  <text
                    x={mapX(result.coords2[0]) + 8}
                    y={(mapY(result.coords1[1]) + mapY(result.coords2[1])) / 2}
                    textAnchor="start"
                    className="text-[9px] fill-gray-500 font-semibold"
                  >
                    Δy = {result.dy.toFixed(1).replace(/\.0$/, "")}
                  </text>

                  {/* Hypotenuse label (distance) */}
                  <text
                    x={(mapX(result.coords1[0]) + mapX(result.coords2[0])) / 2 - 10}
                    y={(mapY(result.coords1[1]) + mapY(result.coords2[1])) / 2 - 10}
                    textAnchor="end"
                    className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400"
                  >
                    d = {result.distance.toFixed(2).replace(/\.00$/, "")}
                  </text>
                </svg>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <Milestone className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter the coordinate values and click Calculate."
                  : "กรอกพิกัดจุด A และ B แล้วกดคำนวณด้านซ้าย เพื่อหาระยะทาง"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-emerald dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-300">
          สูตรคำนวณหาระยะทางระหว่างจุดสองจุด (Distance Formula) และความเกี่ยวโยงกับทฤษฎีพีทาโกรัส
        </h2>
        <p>
          ในทางเรขาคณิตและการวิเคราะห์ทางคณิตศาสตร์ <strong>ระยะทางระหว่างจุดสองจุด (Distance between two points)</strong> คือความยาวของเส้นตรงที่สั้นที่สุดที่เชื่อมโยงจุดปลายทั้งสองข้างบนระบบพิกัดฉาก (Cartesian Coordinate System) การรู้วิธีคำนวณระยะทางนี้ถือเป็นรากฐานที่สำคัญอย่างยิ่งในวิชาตรีโกณมิติ ฟิสิกส์ และวิศวกรรม โดยสูตรนี้มีที่มาจากหนึ่งในทฤษฎีที่คุ้นเคยที่สุดอย่าง "ทฤษฎีบทพีทาโกรัส (Pythagorean Theorem)"
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-800 dark:text-emerald-400">
          การพิสูจน์และที่มาของสูตร
        </h3>
        <p>
          ลองจินตนาการจุดสองจุดบนกระดาษกราฟ คือ จุด A(x₁, y₁) และ จุด B(x₂, y₂) หากเราวาดเส้นตรงในแนวตั้งและแนวนอนจากจุดทั้งสองมาตัดกัน จะเกิดจุดสมมติ C ขึ้นที่พิกัด (x₂, y₁) ซึ่งทำให้เกิดสามเหลี่ยมมุมฉาก ABC โดยที่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ความยาวของด้านแนวนอน AC:</strong> เท่ากับผลต่างของแกน X ซึ่งก็คือ |x₂ - x₁|</li>
          <li><strong>ความยาวของด้านแนวตั้ง BC:</strong> เท่ากับผลต่างของแกน Y ซึ่งก็คือ |y₂ - y₁|</li>
          <li><strong>ความยาวของด้านตรงข้ามมุมฉาก AB (หรือ d):</strong> คือระยะห่างทางตรงที่เราต้องการค้นหา</li>
        </ul>
        <p>
          จากทฤษฎีบทพีทาโกรัสที่ว่า c² = a² + b² เราสามารถแทนค่าความยาวด้านได้เป็น:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl my-3 text-center font-serif text-base">
          d² = (x₂ - x₁)² + (y₂ - y₁)²
        </div>
        <p>
          เมื่อทำการถอดสแควร์รูท (Square Root) ของทั้งสองข้าง เราจะได้สมการมาตรฐานของ <strong>สูตรหาระยะทางระหว่างสองจุด</strong> ดังนี้:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center font-serif text-lg">
          d = √[ (x₂ - x₁)² + (y₂ - y₁)² ]
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-800 dark:text-emerald-400">
          ตัวอย่างการคำนวณอย่างเป็นขั้นตอน
        </h3>
        <p>
          ลองคำนวณหาระยะห่างระหว่าง จุด A(1, 2) และ จุด B(4, 6):
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>คำนวณผลต่างของพิกัด X:</strong> (x₂ - x₁) = 4 - 1 = 3</li>
          <li><strong>คำนวณผลต่างของพิกัด Y:</strong> (y₂ - y₁) = 6 - 2 = 4</li>
          <li><strong>นำมาหาผลรวมยกกำลังสอง:</strong> 3² + 4² = 9 + 16 = 25</li>
          <li><strong>ถอดรากที่สองของผลลัพธ์:</strong> d = √25 = 5</li>
          <li>ดังนั้น ระยะทางระหว่างจุด A และ B เท่ากับ <strong>5 หน่วย</strong></li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-800 dark:text-emerald-400">
          ประโยชน์และการนำไปประยุกต์ใช้งาน
        </h3>
        <p>
          สูตรนี้ถูกนำไปขยายผลและใช้งานในอุตสาหกรรมเทคโนโลยีที่ล้ำสมัยมากมาย:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>การพัฒนาแอปพลิเคชันแผนที่และ GPS:</strong> การหาระยะทางของเส้นทางเบื้องต้นระหว่างจุดสองจุดบนพิกัดทางภูมิศาสตร์เพื่อคำนวณระยะการขับรถ</li>
          <li><strong>วิทยาการคำนวณและ AI:</strong> การใช้ Euclidean Distance ในการหาความใกล้เคียงของข้อมูล เช่น อัลกอริทึม K-Nearest Neighbors (KNN) เพื่อแบ่งประเภทข้อมูลหรือจัดกลุ่มผลิตภัณฑ์ที่ผู้ใช้ชอบ</li>
          <li><strong>ความปลอดภัยและระบบจำลอง:</strong> การคำนวณระยะปลอดภัยของโดรนหรือรถยนต์ขับเคลื่อนอัตโนมัติจากสิ่งกีดขวางที่ตรวจจับได้จากเซนเซอร์ LiDAR</li>
        </ul>
        <p>
          ระบบคำนวณระยะทางระหว่างจุดสองจุดนี้ได้รับการออกแบบมาเพื่อให้ทุกคนสามารถป้อนค่าพิกัดลบหรือบวกได้อย่างอิสระ รวมถึงพิกัดทศนิยม ช่วยลดความยุ่งยากของการป้อนข้อมูลลงเครื่องคิดเลขและสร้างภาพกราฟิกประกอบเพื่อให้เห็นสัณฐานสามเหลี่ยมมุมฉากที่แท้จริง
        </p>
      </article>
    </div>
  );
}
