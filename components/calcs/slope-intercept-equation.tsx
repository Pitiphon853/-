"use client";

import React, { useState } from "react";
import { Calculator, Milestone, RefreshCw, Sliders } from "lucide-react";

export default function SlopeInterceptEquation({ lang }: { lang?: "TH" | "EN" }) {
  const [mode, setMode] = useState<"two-points" | "point-slope" | "slope-intercept">("two-points");

  // Two points inputs
  const [x1, setX1] = useState<string>("2");
  const [y1, setY1] = useState<string>("5");
  const [x2, setX2] = useState<string>("4");
  const [y2, setY2] = useState<string>("9");

  // Point-slope inputs
  const [mInput, setMInput] = useState<string>("2");
  const [px, setPx] = useState<string>("2");
  const [py, setPy] = useState<string>("5");

  // Slope-intercept inputs
  const [mIntercept, setMIntercept] = useState<string>("2");
  const [bIntercept, setBIntercept] = useState<string>("1");

  const [result, setResult] = useState<{
    slope: number | "undefined";
    yIntercept: number | null;
    equation: string;
    generalForm: string;
    steps: string;
    points: [number, number][]; // coordinates for plotting
  } | null>({
    slope: 2,
    yIntercept: 1,
    equation: "y = 2x + 1",
    generalForm: "2x - y + 1 = 0",
    steps: "1. หาความชัน (m) = (9 - 5) / (4 - 2) = 4 / 2 = 2\n2. หาจุดตัดแกน Y (b) จากสูตร y - mx = b\n   b = 5 - (2 * 2) = 1\n3. แทนค่าในสมการ y = mx + b จะได้ y = 2x + 1",
    points: [[2, 5], [4, 9]],
  });

  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    let slope: number | "undefined" = 0;
    let yIntercept: number | null = 0;
    let equation = "";
    let generalForm = "";
    let steps = "";
    let plotPoints: [number, number][] = [];

    if (mode === "two-points") {
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

      if (valX1 === valX2) {
        // Vertical line
        slope = "undefined";
        yIntercept = null;
        equation = `x = ${parseFloat(valX1.toFixed(4))}`;
        generalForm = valX1 >= 0 
          ? `x - ${parseFloat(Math.abs(valX1).toFixed(4))} = 0` 
          : `x + ${parseFloat(Math.abs(valX1).toFixed(4))} = 0`;
        if (valX1 === 0) generalForm = "x = 0";

        steps = lang === "EN" 
          ? `1. The x-coordinates are equal (x₁ = x₂ = ${valX1}).\n2. This represents a vertical line where the slope is undefined.\n3. The equation is x = ${valX1}.`
          : `1. พิกัดแกน X เท่ากัน (x₁ = x₂ = ${valX1})\n2. ส่งผลให้เส้นตรงนี้เป็นเส้นแนวตั้ง ซึ่งมีค่าความชันไม่มีนิยาม (หารด้วยศูนย์)\n3. สมการเส้นตรงคือ x = ${valX1}`;

        plotPoints = [[valX1, valY1], [valX2, valY2]];
      } else {
        const dy = valY2 - valY1;
        const dx = valX2 - valX1;
        slope = dy / dx;
        yIntercept = valY1 - slope * valX1;

        equation = formatSlopeIntercept(slope, yIntercept);
        generalForm = formatGeneralForm(slope, yIntercept);

        steps = lang === "EN"
          ? `1. Calculate slope (m):\n   m = (y₂ - y₁) / (x₂ - x₁)\n   m = (${valY2} - ${valY1}) / (${valX2} - ${valX1}) = ${dy} / ${dx} = ${parseFloat(slope.toFixed(4))}\n2. Find Y-intercept (b) using point (x₁, y₁):\n   b = y₁ - m * x₁\n   b = ${valY1} - (${parseFloat(slope.toFixed(4))} * ${valX1}) = ${parseFloat(yIntercept.toFixed(4))}\n3. Substitute into y = mx + b:\n   ${equation}`
          : `1. คำนวณหาความชัน (m):\n   m = (y₂ - y₁) / (x₂ - x₁)\n   m = (${valY2} - ${valY1}) / (${valX2} - ${valX1}) = ${dy} / ${dx} = ${parseFloat(slope.toFixed(4))}\n2. หาจุดตัดแกน Y (b) โดยแทนค่าจุด (x₁, y₁):\n   b = y₁ - m * x₁\n   b = ${valY1} - (${parseFloat(slope.toFixed(4))} * ${valX1}) = ${parseFloat(yIntercept.toFixed(4))}\n3. แทนค่าลงในสมการ y = mx + b:\n   จะได้ ${equation}`;

        plotPoints = [[valX1, valY1], [valX2, valY2]];
      }
    } else if (mode === "point-slope") {
      const valM = parseFloat(mInput);
      const valPx = parseFloat(px);
      const valPy = parseFloat(py);

      if (isNaN(valM) || isNaN(valPx) || isNaN(valPy)) {
        setError(
          lang === "EN"
            ? "Please enter valid numbers for slope and coordinates."
            : "กรุณากรอกตัวเลขความชันและพิกัดจุดที่ถูกต้อง"
        );
        return;
      }

      slope = valM;
      yIntercept = valPy - slope * valPx;
      equation = formatSlopeIntercept(slope, yIntercept);
      generalForm = formatGeneralForm(slope, yIntercept);

      steps = lang === "EN"
          ? `1. Use Point-Slope formula: y - y₁ = m(x - x₁)\n   y - (${valPy}) = ${valM}(x - (${valPx}))\n2. Solve for y:\n   y = ${valM}x - (${valM} * ${valPx}) + ${valPy}\n   y = ${valM}x - ${valM * valPx} + ${valPy}\n   y = ${valM}x + ${parseFloat(yIntercept.toFixed(4))}\n3. Equation:\n   ${equation}`
          : `1. ใช้สูตร Point-Slope: y - y₁ = m(x - x₁)\n   y - (${valPy}) = ${valM}(x - (${valPx}))\n2. จัดรูปสมการหา y:\n   y = ${valM}x - (${valM} * ${valPx}) + ${valPy}\n   y = ${valM}x - ${valM * valPx} + ${valPy}\n   จะได้ ${equation}`;

      plotPoints = [[valPx, valPy], [0, yIntercept]];
    } else {
      const valM = parseFloat(mIntercept);
      const valB = parseFloat(bIntercept);

      if (isNaN(valM) || isNaN(valB)) {
        setError(
          lang === "EN"
            ? "Please enter valid numbers for slope and Y-intercept."
            : "กรุณากรอกตัวเลขความชันและจุดตัดแกน Y ที่ถูกต้อง"
        );
        return;
      }

      slope = valM;
      yIntercept = valB;
      equation = formatSlopeIntercept(slope, yIntercept);
      generalForm = formatGeneralForm(slope, yIntercept);

      steps = lang === "EN"
          ? `1. Given slope (m) = ${valM} and Y-intercept (b) = ${valB}.\n2. Directly substitute into y = mx + b:\n   ${equation}`
          : `1. กำหนดให้ความชัน (m) = ${valM} และจุดตัดแกน Y (b) = ${valB}\n2. แทนค่าลงในสมการ y = mx + b ได้โดยตรง:\n   จะได้ ${equation}`;

      plotPoints = [[0, valB], [2, valM * 2 + valB]];
    }

    setResult({
      slope,
      yIntercept,
      equation,
      generalForm,
      steps,
      points: plotPoints,
    });
  };

  const formatSlopeIntercept = (m: number | "undefined", b: number | null): string => {
    if (m === "undefined") return `x = ${b}`;
    if (m === 0) return `y = ${parseFloat((b || 0).toFixed(4))}`;

    const mStr = m === 1 ? "" : m === -1 ? "-" : `${parseFloat(m.toFixed(4))}`;
    const bVal = b || 0;
    if (bVal === 0) return `y = ${mStr}x`;

    const bSign = bVal > 0 ? " + " : " - ";
    const bAbsStr = `${parseFloat(Math.abs(bVal).toFixed(4))}`;
    return `y = ${mStr}x${bSign}${bAbsStr}`;
  };

  const formatGeneralForm = (m: number | "undefined", b: number | null): string => {
    if (m === "undefined") {
      const val = b || 0;
      if (val === 0) return "x = 0";
      return val > 0 
        ? `x - ${parseFloat(val.toFixed(4))} = 0` 
        : `x + ${parseFloat(Math.abs(val).toFixed(4))} = 0`;
    }

    // mx - y + b = 0
    const aVal = m;
    const bVal = b || 0;

    const aStr = aVal === 1 ? "x" : aVal === -1 ? "-x" : `${parseFloat(aVal.toFixed(4))}x`;
    const bSign = bVal > 0 ? " + " : " - ";
    const bAbsStr = `${parseFloat(Math.abs(bVal).toFixed(4))}`;

    return `${aStr} - y${bVal === 0 ? "" : `${bSign}${bAbsStr}`} = 0`;
  };

  const clear = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setMInput("");
    setPx("");
    setPy("");
    setMIntercept("");
    setBIntercept("");
    setResult(null);
    setError("");
  };

  // Plotting points mapping for SVG visualizer
  let mapX = (x: number) => 150;
  let mapY = (y: number) => 100;
  let drawLine = false;
  let lineCoords: [number, number, number, number] = [0, 0, 0, 0];

  if (result) {
    drawLine = true;
    const pad = 40;
    const width = 300;
    const height = 200;

    if (result.slope === "undefined") {
      // vertical line at x = points[0][0]
      const pxVal = result.points[0][0];
      const cx = pxVal;
      const xMin = cx - 5;
      const xMax = cx + 5;
      const yMin = -5;
      const yMax = 15;

      const dx = xMax - xMin || 1;
      const dy = yMax - yMin || 1;

      mapX = (x: number) => pad + ((x - xMin) / dx) * (width - 2 * pad);
      mapY = (y: number) => height - (pad + ((y - yMin) / dy) * (height - 2 * pad));

      lineCoords = [mapX(cx), mapY(yMin), mapX(cx), mapY(yMax)];
    } else {
      const m = result.slope;
      const b = result.yIntercept || 0;

      // evaluate line from x = -10 to x = 10
      const xMin = -5;
      const xMax = 5;
      const yMin = m * xMin + b;
      const yMax = m * xMax + b;

      const padXMin = Math.min(xMin, ...result.points.map(p => p[0]));
      const padXMax = Math.max(xMax, ...result.points.map(p => p[0]));
      const padYMin = Math.min(yMin, yMax, ...result.points.map(p => p[1]));
      const padYMax = Math.max(yMin, yMax, ...result.points.map(p => p[1]));

      const dx = padXMax - padXMin || 1;
      const dy = padYMax - padYMin || 1;

      mapX = (x: number) => pad + ((x - padXMin) / dx) * (width - 2 * pad);
      mapY = (y: number) => height - (pad + ((y - padYMin) / dy) * (height - 2 * pad));

      lineCoords = [mapX(padXMin), mapY(m * padXMin + b), mapX(padXMax), mapY(m * padXMax + b)];
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Milestone className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "EN" ? "Slope-Intercept Equation Calculator" : "เครื่องมือหาสมการเส้นตรง y = mx + b"}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        <button
          onClick={() => { setMode("two-points"); setError(""); }}
          className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
            mode === "two-points"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {lang === "EN" ? "Two Points" : "จุดสองจุด"}
        </button>
        <button
          onClick={() => { setMode("point-slope"); setError(""); }}
          className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
            mode === "point-slope"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {lang === "EN" ? "Point & Slope" : "จุดและความชัน"}
        </button>
        <button
          onClick={() => { setMode("slope-intercept"); setError(""); }}
          className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
            mode === "slope-intercept"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {lang === "EN" ? "Slope & Y-Intercept" : "ความชันและจุดตัด Y"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {mode === "two-points" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Point 1 (x₁, y₁)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="x₁"
                  />
                  <input
                    type="number"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="y₁"
                  />
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Point 2 (x₂, y₂)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="x₂"
                  />
                  <input
                    type="number"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="y₂"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "point-slope" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === "EN" ? "Slope (m)" : "ค่าความชัน (m)"}
                </label>
                <input
                  type="number"
                  value={mInput}
                  onChange={(e) => setMInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
                  placeholder="m"
                />
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Point (x₁, y₁)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={px}
                    onChange={(e) => setPx(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800"
                    placeholder="x₁"
                  />
                  <input
                    type="number"
                    value={py}
                    onChange={(e) => setPy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800"
                    placeholder="y₁"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "slope-intercept" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === "EN" ? "Slope (m)" : "ค่าความชัน (m)"}
                </label>
                <input
                  type="number"
                  value={mIntercept}
                  onChange={(e) => setMIntercept(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800"
                  placeholder="m"
                />
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {lang === "EN" ? "Y-Intercept (b)" : "จุดตัดแกน Y (b)"}
                </label>
                <input
                  type="number"
                  value={bIntercept}
                  onChange={(e) => setBIntercept(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800"
                  placeholder="b"
                />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calculator className="w-5 h-5" />
              {lang === "EN" ? "Calculate Equation" : "คำนวณหาสมการ"}
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
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex flex-col h-full justify-between animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 text-center">
                  {lang === "EN" ? "Equation Result" : "ผลลัพธ์สมการเส้นตรง"}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-center border border-indigo-50 dark:border-gray-700">
                    <p className="text-[10px] text-gray-400 mb-1">{lang === "EN" ? "Slope-Intercept Form" : "รูปแบบความชันและจุดตัดแกน Y (y = mx + b)"}</p>
                    <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                      {result.equation}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-center border border-indigo-50 dark:border-gray-700">
                    <p className="text-[10px] text-gray-400 mb-1">{lang === "EN" ? "General Form" : "รูปแบบสมการทั่วไป (Ax + By + C = 0)"}</p>
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300 font-mono">
                      {result.generalForm}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <p className="font-semibold">{lang === "EN" ? "Step-by-step Solution:" : "ขั้นตอนคำนวณแสดงวิธีทำ:"}</p>
                  <p className="font-mono bg-white dark:bg-gray-800 p-3 rounded-lg border border-indigo-50 dark:border-gray-700 whitespace-pre-line text-left leading-relaxed">
                    {result.steps}
                  </p>
                </div>
              </div>

              {/* Graphical representation of the line */}
              {drawLine && (
                <div className="mt-2 flex justify-center bg-white dark:bg-gray-800 rounded-xl p-2 border border-indigo-50 dark:border-gray-700">
                  <svg width="100%" height="150" viewBox="0 0 300 200" className="overflow-visible">
                    <rect width="300" height="200" fill="#f8fafc" className="dark:fill-gray-900/50" rx="8" />
                    
                    {/* Draw coordinate axes */}
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="150" y1="0" x2="150" y2="200" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Calculated Line */}
                    <line
                      x1={lineCoords[0]}
                      y1={lineCoords[1]}
                      x2={lineCoords[2]}
                      y2={lineCoords[3]}
                      stroke="#4f46e5"
                      strokeWidth="3"
                    />

                    {/* Plot Points */}
                    {result.points.map((pt, idx) => (
                      <g key={idx}>
                        <circle cx={mapX(pt[0])} cy={mapY(pt[1])} r="5" fill="#f59e0b" />
                        <text
                          x={mapX(pt[0]) + 8}
                          y={mapY(pt[1]) - 4}
                          className="text-[9px] font-bold fill-amber-600 dark:fill-amber-400"
                        >
                          P{idx+1}({pt[0].toFixed(1).replace(/\.0$/, "")}, {pt[1].toFixed(1).replace(/\.0$/, "")})
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 text-center">
              <Sliders className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">
                {lang === "EN"
                  ? "Enter the values and click Calculate to find the linear equation."
                  : "กรอกข้อมูลตามโหมดที่ต้องการ แล้วกดคำนวณด้านซ้าย เพื่อหาสมการเส้นตรง"}
              </p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">
          ทำความเข้าใจสมการเส้นตรงในรูปความชันและจุดตัดแกน Y (Slope-Intercept Form)
        </h2>
        <p>
          ในพีชคณิตเรขาคณิต <strong>สมการเส้นตรง (Linear Equation)</strong> ถือเป็นหนึ่งในรากฐานที่สำคัญที่สุดของการวิเคราะห์ข้อมูลเชิงเส้น และรูปแบบที่เป็นมิตรและเข้าใจง่ายที่สุดรูปแบบหนึ่งคือ <strong>สมการเส้นตรงในรูปความชันและจุดตัดแกน Y (Slope-Intercept Form)</strong> ซึ่งเขียนแทนด้วยสมการมาตรฐานคือ <strong>y = mx + b</strong> สมการนี้นิยมนำมาใช้อย่างแพร่หลายเนื่องจากสามารถบ่งบอกพฤติกรรมของเส้นตรงได้ทันทีจากโครงสร้างตัวแปร
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          ความหมายขององค์ประกอบย่อยในรูปสมการ
        </h3>
        <p>
          เมื่อเราพิจารณาสมการ <strong>y = mx + b</strong> จะมีตัวแปรและค่าคงที่ที่มีหน้าที่เฉพาะดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>y:</strong> ตัวแปรตาม (Dependent Variable) หรือค่าพิกัดบนแกนตั้ง</li>
          <li><strong>x:</strong> ตัวแปรต้น (Independent Variable) หรือค่าพิกัดบนแกนนอน</li>
          <li><strong>m (ความชัน - Slope):</strong> แสดงถึงระดับความชันและความเอียงของเส้นตรง ถ้า m เป็นบวก เส้นตรงจะเฉียงขึ้น ถ้า m เป็นลบ เส้นตรงจะเฉียงลง และถ้า m เป็นศูนย์ เส้นตรงจะขนานแนวราบ</li>
          <li><strong>b (จุดตัดแกน Y - Y-Intercept):</strong> คือจุดที่เส้นตรงนี้ตัดผ่านแกน Y เมื่อค่า x = 0 พิกัดที่เส้นตรงตัดผ่านแกนดิ่งจึงเขียนได้เป็นพิกัด (0, b)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          การหาไฟล์สมการจากจุดหรือข้อมูลรูปแบบอื่นๆ
        </h3>
        <p>
          เราสามารถหาสมการ y = mx + b ได้จากรูปแบบอินพุตที่แตกต่างกันถึง 3 วิธี:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>เมื่อทราบจุดสองจุด (Two Points):</strong> 
            <br />หากเรามีจุด (x₁, y₁) และ (x₂, y₂) ขั้นแรกเราต้องหาความชันก่อนด้วยสูตร m = (y₂ - y₁) / (x₂ - x₁) จากนั้นนำค่าความชัน m และพิกัดจุดหนึ่งจุดมาหาค่า b ด้วยสูตร b = y₁ - m * x₁
          </li>
          <li><strong>เมื่อทราบจุดหนึ่งจุดและความชัน (Point-Slope):</strong>
            <br />หากเรามีจุด (x₁, y₁) และความชัน m เราสามารถใช้สูตร Point-Slope: y - y₁ = m(x - x₁) จากนั้นจัดรูปสมการย้ายข้างเพื่อหาค่า Y จะได้รูปแบบ y = mx + b โดยที่ b = y₁ - m * x₁
          </li>
          <li><strong>เมื่อทราบความชันและจุดตัดแกน Y โดยตรง:</strong>
            <br />นี่เป็นวิธีที่ง่ายที่สุดเพราะสามารถนำค่าคงที่ทั้งสองตัวมาประกอบเข้าในเทมเพลต y = mx + b ได้ทันทีโดยไม่ต้องทำการแก้สมการใดๆ เพิ่มเติม
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800 dark:text-indigo-400">
          การประยุกต์ใช้ในธุรกิจและวิทยาศาสตร์
        </h3>
        <p>
          สมการรูปแบบนี้ถูกนำไปใช้โมเดลความสัมพันธ์ของสิ่งต่างๆ ในชีวิตจริง:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>การคำนวณต้นทุนการผลิต:</strong> สมการต้นทุนรวม C = mx + b โดยที่ m คือต้นทุนผันแปรต่อชิ้น (Variable Cost) x คือจำนวนชิ้น และ b คือต้นทุนคงที่ (Fixed Cost เช่น ค่าเช่าโรงงาน หรือค่าเครื่องจักร)</li>
          <li><strong>การคาดการณ์ยอดขาย:</strong> การเขียนกราฟพยากรณ์แนวโน้มยอดขายตามเวลา (Linear Trend Line) เพื่อดูทิศทางและอัตราการเติบโตรายปี</li>
          <li><strong>วิชาฟิสิกส์:</strong> การเคลื่อนที่แนวตรงตามสมการ v = at + v₀ โดยความเร็ว v สัมพันธ์กับเวลา t ซึ่งมีอัตราเร่ง a เป็นความชัน และความเร็วเริ่มต้น v₀ เป็นจุดตัดแกน</li>
        </ul>
        <p>
          โปรแกรมคำนวณสมการเส้นตรงในรูปความชันและจุดตัดแกน Y นี้ เป็นตัวช่วยที่ครอบคลุมทุกโหมดการแทนค่าพิกัดและการสร้างภาพกราฟิกแบบไดนามิก เพื่อให้นักเรียน นักศึกษา และผู้วิเคราะห์ข้อมูล สามารถหาคำตอบรวมถึงรูปแบบสมการทั่วไป Ax + By + C = 0 ได้อย่างง่ายดายในวินาทีเดียว
        </p>
      </article>
    </div>
  );
}
