"use client";
import { useState } from "react";
import { Type, Calculator, RotateCcw, Eye, Info } from "lucide-react";

export default function FontSizeReadingDistance({ lang }: any) {
  const [mode, setMode] = useState<"distance" | "fontSize">("distance");
  const [fontSize, setFontSize] = useState<number>(16);
  const [distance, setDistance] = useState<number>(50);
  const [medium, setMedium] = useState<string>("screen");
  const [showResult, setShowResult] = useState(false);

  // Rule of thumb: font size (pt) ≈ distance (cm) / 30 for comfortable reading
  // For screens: 1pt ≈ 1.333px at 96dpi
  const calcRecommendedDistance = (fs: number) => {
    const ptSize = medium === "screen" ? fs * 0.75 : fs;
    return ptSize * 30;
  };

  const calcRecommendedFontSize = (dist: number) => {
    const ptSize = dist / 30;
    return medium === "screen" ? ptSize / 0.75 : ptSize;
  };

  const recommendedDistance = calcRecommendedDistance(fontSize);
  const recommendedFontSize = calcRecommendedFontSize(distance);

  const presets = [
    { label: "มือถือ", distance: 30, fontSize: 14, icon: "📱" },
    { label: "คอมพิวเตอร์", distance: 50, fontSize: 16, icon: "💻" },
    { label: "แท็บเล็ต", distance: 40, fontSize: 16, icon: "📋" },
    { label: "ป้ายโปสเตอร์ (1 ม.)", distance: 100, fontSize: 24, icon: "🖼️" },
    { label: "ป้ายนำเสนอ (3 ม.)", distance: 300, fontSize: 72, icon: "📺" },
    { label: "ป้ายถนน (20 ม.)", distance: 2000, fontSize: 500, icon: "🛣️" },
  ];

  const handleReset = () => {
    setFontSize(16);
    setDistance(50);
    setMedium("screen");
    setShowResult(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-violet-100 rounded-xl">
            <Type className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Font Size & ระยะการอ่านที่เหมาะสม</h2>
            <p className="text-sm text-gray-500">คำนวณขนาดตัวอักษรและระยะการอ่านที่เหมาะสม</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode("distance"); setShowResult(false); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "distance" ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            คำนวณระยะการอ่าน
          </button>
          <button
            onClick={() => { setMode("fontSize"); setShowResult(false); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "fontSize" ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            คำนวณขนาดตัวอักษร
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทสื่อ</label>
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
            >
              <option value="screen">หน้าจอ (px)</option>
              <option value="print">สิ่งพิมพ์ (pt)</option>
            </select>
          </div>

          {mode === "distance" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ขนาดตัวอักษร ({medium === "screen" ? "px" : "pt"})
              </label>
              <input
                type="number"
                min={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ระยะการอ่าน (ซม.)
              </label>
              <input
                type="number"
                min={1}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowResult(true)}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Calculator className="w-5 h-5" /> คำนวณ
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> ล้าง
          </button>
        </div>

        {showResult && (
          <div className="space-y-4">
            <div className="bg-violet-50 border border-violet-200 p-5 rounded-xl text-center">
              {mode === "distance" ? (
                <>
                  <p className="text-sm text-gray-600 mb-1">ระยะการอ่านที่แนะนำ</p>
                  <p className="text-4xl font-bold text-violet-700">
                    {recommendedDistance >= 100
                      ? `${(recommendedDistance / 100).toFixed(1)} ม.`
                      : `${recommendedDistance.toFixed(0)} ซม.`}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    สำหรับขนาดตัวอักษร {fontSize} {medium === "screen" ? "px" : "pt"}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-1">ขนาดตัวอักษรที่แนะนำ</p>
                  <p className="text-4xl font-bold text-violet-700">
                    {recommendedFontSize.toFixed(1)}{" "}
                    <span className="text-lg font-normal">{medium === "screen" ? "px" : "pt"}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    สำหรับระยะอ่าน {distance} ซม.
                  </p>
                </>
              )}
            </div>

            {mode === "distance" && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> ตัวอย่างข้อความ
                </p>
                <p style={{ fontSize: `${Math.min(fontSize, 60)}px` }} className="text-gray-800 break-words">
                  ตัวอย่าง: สวัสดีครับ Hello World
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">ค่าแนะนำสำหรับสถานการณ์ต่าง ๆ</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setFontSize(p.fontSize);
                  setDistance(p.distance);
                  setShowResult(true);
                }}
                className="bg-gray-50 hover:bg-violet-50 rounded-lg p-3 text-left transition"
              >
                <span className="text-xl">{p.icon}</span>
                <p className="text-sm font-medium text-gray-700 mt-1">{p.label}</p>
                <p className="text-xs text-gray-400">{p.fontSize}px / {p.distance}cm</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl p-4 flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            หลักการพื้นฐาน: ขนาดตัวอักษร (pt) ≈ ระยะการอ่าน (ซม.) ÷ 30 เหมาะสำหรับคนสายตาปกติ
          </p>
        </div>
      </div>

      <article className="prose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Font Size และระยะการอ่านที่เหมาะสม: เคล็ดลับออกแบบที่ควรรู้</h2>

        <p>
          การเลือกขนาดตัวอักษร (Font Size) ที่เหมาะสมกับระยะการอ่านเป็นหลักการพื้นฐานสำคัญของการออกแบบ ไม่ว่าจะเป็นเว็บไซต์ แอปมือถือ สิ่งพิมพ์ หรือป้ายโฆษณา หากตัวอักษรเล็กเกินไปสำหรับระยะการอ่าน ผู้อ่านจะรู้สึกเหนื่อยตาและไม่สะดวกในการอ่าน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">หลักการคำนวณขนาดตัวอักษร</h3>
        <p>
          หลักการที่ใช้กันอย่างแพร่หลายคือ ขนาดตัวอักษร (หน่วย pt) ควรเท่ากับระยะการอ่าน (หน่วยเซนติเมตร) หารด้วย 30 เช่น หากอ่านจากระยะ 60 เซนติเมตร (ระยะเฉลี่ยของจอคอมพิวเตอร์) ขนาดตัวอักษรควรอย่างน้อย 2 pt หรือประมาณ 2.67 px
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ขนาดตัวอักษรแนะนำสำหรับอุปกรณ์ต่าง ๆ</h3>
        <p>
          สำหรับเว็บไซต์ ขนาดตัวอักษรเนื้อหาหลักควรอย่างน้อย 16px แอปมือถือแนะนำ 14-16px เอกสารพิมพ์ (A4) ใช้ 10-12pt ป้ายนำเสนอ (Presentation) ที่อ่านจากระยะ 3 เมตรควรใช้อย่างน้อย 72pt และป้ายถนนที่มองจากระยะไกลต้องใช้ตัวอักษรขนาดใหญ่มาก
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ความแตกต่างระหว่าง px และ pt</h3>
        <p>
          px (pixel) เป็นหน่วยที่ใช้บนหน้าจอ ส่วน pt (point) ใช้ในงานพิมพ์ โดยทั่วไป 1pt ≈ 1.333px ที่ความละเอียด 96dpi (ค่ามาตรฐานของจอคอมพิวเตอร์) อย่างไรก็ตามจอความละเอียดสูง (Retina Display) จะมีค่า DPI สูงกว่า ทำให้ 1px มีขนาดเล็กลง
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ปัจจัยอื่นที่ส่งผลต่อความสามารถในการอ่าน</h3>
        <p>
          นอกจากขนาดตัวอักษรและระยะการอ่านแล้ว ยังมีปัจจัยอื่นที่สำคัญ ได้แก่ คอนทราสต์ระหว่างสีตัวอักษรและพื้นหลัง ประเภทฟอนต์ (Sans-Serif อ่านง่ายกว่าบนจอ) ระยะห่างบรรทัด (Line Height) ควรอยู่ที่ 1.4-1.6 เท่า และความยาวบรรทัดที่เหมาะสม (45-75 ตัวอักษรต่อบรรทัด) เครื่องมือนี้ช่วยให้คุณเลือกขนาดตัวอักษรได้อย่างเหมาะสมสำหรับทุกสถานการณ์
        </p>
      </article>
    </div>
  );
}
