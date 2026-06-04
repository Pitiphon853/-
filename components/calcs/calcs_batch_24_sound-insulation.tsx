"use client";
import { useState } from "react";
import { Calculator, Shield, ArrowRight } from "lucide-react";

export default function SoundInsulation({ lang }: any) {
  const [sourceDb, setSourceDb] = useState(80);
  const [targetDb, setTargetDb] = useState(40);
  const [wallType, setWallType] = useState("concrete150");
  const [result, setResult] = useState<{
    stcNeeded: number;
    recommendation: string;
    materials: { name: string; stc: number; suitable: boolean }[];
  } | null>(null);

  const materials = [
    { name: "กระจกชั้นเดียว 6mm", stc: 28 },
    { name: "ผนังยิปซัม 1 ชั้น (12.5mm)", stc: 33 },
    { name: "ผนังยิปซัม 2 ชั้น + ฉนวน", stc: 45 },
    { name: "ผนังอิฐมอญ 100mm", stc: 40 },
    { name: "ผนังคอนกรีต 150mm", stc: 50 },
    { name: "ผนังคอนกรีต 200mm", stc: 55 },
    { name: "กระจก 2 ชั้น (6-12-6mm)", stc: 35 },
    { name: "กระจกลามิเนต 10.76mm", stc: 38 },
    { name: "ผนังยิปซัม 2 ชั้น + ช่องอากาศ + ฉนวน", stc: 55 },
    { name: "ผนังเบา STC-60 ระบบพิเศษ", stc: 60 },
  ];

  const calculate = () => {
    const stcNeeded = sourceDb - targetDb;

    let recommendation = "";
    if (stcNeeded <= 30) recommendation = "ใช้ผนังมาตรฐานได้เลย ไม่ต้องลงทุนมาก";
    else if (stcNeeded <= 40) recommendation = "ใช้ผนังอิฐหรือยิปซัม 2 ชั้นพร้อมฉนวน";
    else if (stcNeeded <= 50) recommendation = "ต้องใช้ผนังคอนกรีตหรือระบบผนังซ้อน";
    else recommendation = "ต้องใช้ระบบกันเสียงเฉพาะทาง ปรึกษาวิศวกร";

    const materialList = materials.map((m) => ({
      ...m,
      suitable: m.stc >= stcNeeded,
    }));

    setResult({ stcNeeded, recommendation, materials: materialList });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-100 rounded-xl">
            <Shield className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sound Insulation Calculator</h2>
            <p className="text-gray-500 text-sm">คำนวณค่า STC ฉนวนเสียงที่ต้องการ</p>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับเสียงต้นทาง (dB)
            </label>
            <input
              type="range"
              min={30}
              max={130}
              value={sourceDb}
              onChange={(e) => setSourceDb(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>30 dB</span>
              <span className="font-bold text-teal-700 text-lg">{sourceDb} dB</span>
              <span>130 dB</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับเสียงเป้าหมายภายในห้อง (dB)
            </label>
            <input
              type="range"
              min={20}
              max={60}
              value={targetDb}
              onChange={(e) => setTargetDb(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>20 dB</span>
              <span className="font-bold text-teal-700 text-lg">{targetDb} dB</span>
              <span>60 dB</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-3 bg-gray-50 rounded-lg">
            <span className="text-lg font-semibold text-red-500">{sourceDb} dB</span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">ผนังกั้น</span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <span className="text-lg font-semibold text-green-500">{targetDb} dB</span>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" /> คำนวณฉนวนเสียงที่ต้องการ
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-teal-50 rounded-xl p-5 text-center">
              <p className="text-sm text-teal-600 mb-1">ค่า STC ขั้นต่ำที่ต้องการ</p>
              <p className="text-4xl font-bold text-teal-800">{result.stcNeeded}</p>
              <p className="text-sm text-teal-600 mt-2">{result.recommendation}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">วัสดุที่เหมาะสม</h3>
              <div className="space-y-2">
                {result.materials.map((m, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center p-3 rounded-lg text-sm ${
                      m.suitable
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200 opacity-60"
                    }`}
                  >
                    <span className={m.suitable ? "text-green-800" : "text-gray-500"}>
                      {m.suitable ? "✅" : "❌"} {m.name}
                    </span>
                    <span className={`font-semibold ${m.suitable ? "text-green-700" : "text-gray-400"}`}>
                      STC {m.stc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="mt-10 prose prose-gray max-w-none">
        <h2>เครื่องคำนวณฉนวนเสียง (Sound Insulation Calculator)</h2>
        <p>
          การกันเสียงเป็นสิ่งจำเป็นสำหรับอาคารที่พักอาศัย สำนักงาน ห้องประชุม สตูดิโอบันทึกเสียง และโรงพยาบาล ฉนวนเสียงที่ดีช่วยลดเสียงรบกวนจากภายนอก ทำให้ผู้อยู่อาศัยมีคุณภาพชีวิตที่ดีขึ้น เครื่องคำนวณนี้จะช่วยประเมินค่า STC (Sound Transmission Class) ขั้นต่ำที่ผนังหรือวัสดุกันเสียงต้องมี เพื่อลดเสียงจากระดับต้นทางลงมาสู่ระดับเป้าหมาย
        </p>

        <h3>STC คืออะไร?</h3>
        <p>
          STC (Sound Transmission Class) เป็นตัวเลขมาตรฐานที่ใช้วัดประสิทธิภาพการกันเสียงของวัสดุก่อสร้าง ยิ่งค่า STC สูง ยิ่งกันเสียงได้ดี ผนังยิปซัมมาตรฐานอาจมี STC ประมาณ 33-35 ในขณะที่ผนังคอนกรีตหนา 200 มม. อาจมี STC 55 ขึ้นไป ห้องบันทึกเสียงมืออาชีพมักต้องการ STC 60 ขึ้นไป
        </p>

        <h3>ระดับเสียงในสภาพแวดล้อมต่าง ๆ</h3>
        <p>
          ถนนที่มีการจราจรหนาแน่นอาจมีเสียง 70-85 dB เสียงเครื่องจักรในโรงงาน 85-100 dB เสียงเพลงจากผับหรือบาร์ 90-110 dB สำหรับห้องนอนที่เงียบสบายควรอยู่ที่ 30-35 dB ห้องทำงานทั่วไป 40-45 dB และห้องบันทึกเสียง 20-25 dB
        </p>

        <h3>หลักการเลือกวัสดุกันเสียง</h3>
        <p>
          การเลือกวัสดุกันเสียงควรพิจารณาหลายปัจจัย ได้แก่ ค่า STC ที่ต้องการ น้ำหนักของวัสดุ ความหนาที่สามารถรองรับได้ งบประมาณ และความง่ายในการติดตั้ง ผนังที่มีมวลมากกันเสียงได้ดี แต่ระบบผนังซ้อนที่มีช่องอากาศและฉนวนก็ให้ผลใกล้เคียงกันโดยใช้น้ำหนักน้อยกว่า
        </p>

        <h3>เคล็ดลับเพิ่มเติม</h3>
        <p>
          นอกจากผนังแล้ว จุดรั่วซึมของเสียงมักเกิดที่ช่องแอร์ ประตู หน้าต่าง และรอยต่อ การปิดผนึกรอยรั่วทุกจุดสำคัญเท่า ๆ กับการเลือกวัสดุที่ดี ควรใช้ประตูกันเสียง ซีลยาง และหลีกเลี่ยงท่อที่เชื่อมต่อระหว่างห้องโดยตรง
        </p>
      </article>
    </div>
  );
}
