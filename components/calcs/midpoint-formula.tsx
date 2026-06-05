"use client";

import React, { useState } from "react";
import { Calculator, MapPin, RefreshCw } from "lucide-react";

export default function MidpointFormula({ lang }: { lang?: "TH" | "EN" }) {
  const [x1, setX1] = useState<string>("2");
  const [y1, setY1] = useState<string>("4");
  const [x2, setX2] = useState<string>("8");
  const [y2, setY2] = useState<string>("10");

  const [result, setResult] = useState<{
    mx: number;
    my: number;
    stepsX: string;
    stepsY: string;
    coords1: [number, number];
    coords2: [number, number];
  } | null>({
    mx: 5,
    my: 7,
    stepsX: "x_m = (2 + 8) / 2 = 10 / 2 = 5",
    stepsY: "y_m = (4 + 10) / 2 = 14 / 2 = 7",
    coords1: [2, 4],
    coords2: [8, 10],
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

    const mx = (valX1 + valX2) / 2;
    const my = (valY1 + valY2) / 2;

    setResult({
      mx,
      my,
      stepsX: `x_m = (${valX1} + ${valX2}) / 2 = ${valX1 + valX2} / 2 = ${mx}`,
      stepsY: `y_m = (${valY1} + ${valY2}) / 2 = ${valY1 + valY2} / 2 = ${my}`,
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

  // SVG parameters for drawing the points
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
        <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Midpoint Formula Calculator" : "เครื่องมือคำนวณจุดกึ่งกลาง (Midpoint)"}
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₁</label>
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="e.g. 4"
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="e.g. 8"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y₂</label>
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="e.g. 10"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Midpoint" : "คำนวณจุดกึ่งกลาง"}
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
            <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-100 dark:border-teal-800/50 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-300 mb-4 text-center">
                  {lang === "EN" ? "Calculated Midpoint (M)" : "พิกัดจุดกึ่งกลางที่ได้ (M)"}
                </h3>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center border border-teal-50 dark:border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">{lang === "EN" ? "Midpoint Coordinates" : "พิกัดจุดกึ่งกลาง (x_m, y_m)"}</p>
                  <p className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                    ({result.mx.toFixed(2).replace(/\.00$/, "")}, {result.my.toFixed(2).replace(/\.00$/, "")})
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <p><strong>{lang === "EN" ? "Formula:" : "สูตร:"}</strong> M = ((x₁ + x₂) / 2, (y₁ + y₂) / 2)</p>
                  <p><strong>X-axis Step:</strong> {result.stepsX}</p>
                  <p><strong>Y-axis Step:</strong> {result.stepsY}</p>
                </div>
              </div>

              {/* Graphic Representation */}
              <div className="mt-6 flex justify-center bg-white dark:bg-gray-800 rounded-xl p-2 border border-teal-50 dark:border-gray-700">
                <svg width="100%" height="180" viewBox="0 0 300 200" className="overflow-visible">
                  {/* Grid background */}
                  <rect width="300" height="200" fill="#f8fafc" className="dark:fill-gray-900/50" rx="8" />
                  
                  {/* Connecting Line */}
                  <line
                    x1={mapX(result.coords1[0])}
                    y1={mapY(result.coords1[1])}
                    x2={mapX(result.coords2[0])}
                    y2={mapY(result.coords2[1])}
                    stroke="#cbd5e1"
                    strokeWidth="3"
                    strokeDasharray="4"
                    className="dark:stroke-gray-700"
                  />
                  
                  {/* Point A */}
                  <circle
                    cx={mapX(result.coords1[0])}
                    cy={mapY(result.coords1[1])}
                    r="6"
                    fill="#3b82f6"
                  />
                  <text
                    x={mapX(result.coords1[0])}
                    y={mapY(result.coords1[1]) - 10}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400"
                  >
                    A({result.coords1[0]}, {result.coords1[1]})
                  </text>

                  {/* Point B */}
                  <circle
                    cx={mapX(result.coords2[0])}
                    cy={mapY(result.coords2[1])}
                    r="6"
                    fill="#ef4444"
                  />
                  <text
                    x={mapX(result.coords2[0])}
                    y={mapY(result.coords2[1]) - 10}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-red-600 dark:fill-red-400"
                  >
                    B({result.coords2[0]}, {result.coords2[1]})
                  </text>

                  {/* Midpoint M */}
                  <circle
                    cx={mapX(result.mx)}
                    cy={mapY(result.my)}
                    r="8"
                    fill="#0d9488"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={mapX(result.mx)}
                    y={mapY(result.my) + 18}
                    textAnchor="middle"
                    className="text-[11px] font-extrabold fill-teal-600 dark:fill-teal-400"
                  >
                    M({result.mx.toFixed(1).replace(/\.0$/, "")}, {result.my.toFixed(1).replace(/\.0$/, "")})
                  </text>
                </svg>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <MapPin className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter the coordinate values and click Calculate."
                  : "กรอกพิกัดจุด A และ B แล้วกดคำนวณด้านซ้าย เพื่อหาจุดกึ่งกลาง"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-teal dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-teal-900 dark:text-teal-300">
          สูตรจุดกึ่งกลาง (Midpoint Formula) คืออะไร? วิธีหาพิกัดกึ่งกลางระหว่างจุดสองจุดอย่างง่ายดาย
        </h2>
        <p>
          ในวิชาเรขาคณิตวิเคราะห์ (Coordinate Geometry หรือ Analytic Geometry) <strong>จุดกึ่งกลาง (Midpoint)</strong> คือจุดที่อยู่บนส่วนของเส้นตรงและมีระยะห่างจากจุดปลายทั้งสองข้างเท่ากันทุกประการ หรือพูดง่ายๆ ก็คือการแบ่งครึ่งส่วนของเส้นตรงออกเป็นสองส่วนเท่าๆ กันนั่นเอง การหาพิกัดของจุดกึ่งกลางบนระนาบสองมิติ (X และ Y) นั้นใช้สูตรการคำนวณที่ง่าย ตรงไปตรงมา และมีประโยชน์อย่างมากในทางวิทยาศาสตร์ วิศวกรรม และการพัฒนาโปรแกรมกราฟิกคอมพิวเตอร์
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-teal-800 dark:text-teal-400">
          สูตรและสมการจุดกึ่งกลาง
        </h3>
        <p>
          หากเรามีจุดสองจุดบนระนาบคาร์ทีเซียน ได้แก่ จุด A ซึ่งมีพิกัด (x₁, y₁) และจุด B ซึ่งมีพิกัด (x₂, y₂) เราสามารถคำนวณหาพิกัดของจุดกึ่งกลาง M (x_m, y_m) ได้ด้วยสมการดังนี้:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl my-4 border border-gray-200 dark:border-gray-700 overflow-x-auto text-center font-serif text-lg">
          M(x_m, y_m) = ( [x₁ + x₂] / 2 , [y₁ + y₂] / 2 )
        </div>
        <p>
          จากสูตรด้านบน จะเห็นได้ว่า:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>พิกัดแกน X (x_m)</strong> เกิดจากการนำค่าพิกัด X ของจุดปลายทั้งสองมาบวกกัน แล้วหารด้วย 2 (หาค่าเฉลี่ยของแกน X)</li>
          <li><strong>พิกัดแกน Y (y_m)</strong> เกิดจากการนำค่าพิกัด Y ของจุดปลายทั้งสองมาบวกกัน แล้วหารด้วย 2 (หาค่าเฉลี่ยของแกน Y)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-teal-800 dark:text-teal-400">
          ตัวอย่างขั้นตอนการแสดงวิธีทำ
        </h3>
        <p>
          สมมติว่าต้องการหาจุดกึ่งกลางระหว่าง จุด A(2, 4) และ จุด B(8, 10) ขั้นตอนการหาพิกัดจะประกอบด้วย:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>หาพิกัด X:</strong> (x₁ + x₂) / 2 &rArr; (2 + 8) / 2 = 10 / 2 = 5</li>
          <li><strong>หาพิกัด Y:</strong> (y₁ + y₂) / 2 &rArr; (4 + 10) / 2 = 14 / 2 = 7</li>
          <li>ดังนั้น พิกัดจุดกึ่งกลาง M คือ <strong>(5, 7)</strong> ซึ่งตรงกับตัวอย่างแบบจำลองด้านบน</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-teal-800 dark:text-teal-400">
          การนำไปประยุกต์ใช้ในชีวิตจริงและวิทยาศาสตร์
        </h3>
        <p>
          สูตรจุดกึ่งกลางไม่เพียงแต่ใช้สอบในวิชาคณิตศาสตร์ระดับมัธยมปลายเท่านั้น แต่ยังมีประโยชน์ในหลากหลายมิติ:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>สถาปัตยกรรมและการออกแบบ:</strong> การหาจุดศูนย์กลางที่แน่นอนของคานโครงสร้าง หน้าต่าง หรือชิ้นส่วนตกแต่งอาคารเพื่อให้เกิดความสมดุล (Symmetry)</li>
          <li><strong>ระบบสารสนเทศภูมิศาสตร์ (GIS) และแผนที่:</strong> การวิเคราะห์หาตำแหน่งศูนย์กลางระหว่างสองเมือง หรือสองพิกัดละติจูด/ลองจิจูด เพื่อวางตำแหน่งจุดพักรถหรือเสาสัญญาณที่มีระยะทางห่างจากจุดทั้งสองเท่าๆ กัน</li>
          <li><strong>การพัฒนาเกมและการเขียนโปรแกรม:</strong> การคำนวณตำแหน่งสำหรับแสดงวัตถุหรือเอฟเฟกต์กึ่งกลางระหว่างตัวละครสองตัวบนหน้าจอ</li>
        </ul>
        <p>
          เครื่องมือคำนวณหาจุดกึ่งกลางนี้ถูกพัฒนาให้สามารถประมวลผลได้ทั้งเลขจำนวนเต็มและทศนิยม พร้อมแสดงผลลัพธ์เป็นเวกเตอร์กราฟิกแบบเข้าใจง่าย ช่วยลดความซับซ้อนในวิชาฟิสิกส์และเรขาคณิตได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}
