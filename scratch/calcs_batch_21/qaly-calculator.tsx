"use client";
import { useState } from "react";
import { Heart, Calendar, Activity, TrendingUp, Info } from "lucide-react";

export default function QalyCalculator({ lang }: any) {
  const [age, setAge] = useState("35");
  const [lifeExpectancy, setLifeExpectancy] = useState("77");
  const [qualityScore, setQualityScore] = useState("0.8");
  const [scenarioName, setScenarioName] = useState("หลังการรักษา");
  const [scenarioQuality, setScenarioQuality] = useState("0.9");
  const [scenarioCost, setScenarioCost] = useState("500000");

  const currentAge = parseFloat(age) || 0;
  const le = parseFloat(lifeExpectancy) || 77;
  const qs = parseFloat(qualityScore) || 0;
  const sq = parseFloat(scenarioQuality) || 0;
  const sc = parseFloat(scenarioCost) || 0;

  const remainingYears = Math.max(0, le - currentAge);
  const qalyBaseline = remainingYears * qs;
  const qalyScenario = remainingYears * sq;
  const qalyGained = qalyScenario - qalyBaseline;
  const costPerQaly = qalyGained > 0 ? sc / qalyGained : 0;

  const getQualityLabel = (score: number) => {
    if (score >= 0.9) return { text: "สุขภาพดีมาก", color: "text-green-600" };
    if (score >= 0.7) return { text: "สุขภาพดี", color: "text-blue-600" };
    if (score >= 0.5) return { text: "สุขภาพปานกลาง", color: "text-yellow-600" };
    if (score >= 0.3) return { text: "สุขภาพไม่ดี", color: "text-orange-600" };
    return { text: "สุขภาพแย่มาก", color: "text-red-600" };
  };

  const getCostEffectiveness = (cpq: number) => {
    if (cpq <= 0) return { text: "-", color: "text-gray-400" };
    if (cpq <= 160000) return { text: "คุ้มค่ามาก (ต่ำกว่า 1 GDP per capita)", color: "text-green-600" };
    if (cpq <= 480000) return { text: "คุ้มค่า (1-3 GDP per capita)", color: "text-blue-600" };
    return { text: "ไม่คุ้มค่า (มากกว่า 3 GDP per capita)", color: "text-red-600" };
  };

  const baselineLabel = getQualityLabel(qs);
  const scenarioLabel = getQualityLabel(sq);
  const costLabel = getCostEffectiveness(costPerQaly);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">QALY Calculator</h2>
            <p className="text-gray-500 text-sm">Quality-Adjusted Life Year</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baseline */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> ข้อมูลพื้นฐาน
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">อายุปัจจุบัน (ปี)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">อายุขัยคาดการณ์ (ปี)</label>
              <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                คุณภาพชีวิตปัจจุบัน (0-1)
              </label>
              <input type="number" step="0.05" min="0" max="1" value={qualityScore}
                onChange={(e) => setQualityScore(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              <p className={`text-xs mt-1 ${baselineLabel.color}`}>{baselineLabel.text}</p>
            </div>
          </div>

          {/* Scenario */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Activity className="w-4 h-4" /> สถานการณ์เปรียบเทียบ
            </h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">ชื่อสถานการณ์</label>
              <input type="text" value={scenarioName} onChange={(e) => setScenarioName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                คุณภาพชีวิตหลังการเปลี่ยนแปลง (0-1)
              </label>
              <input type="number" step="0.05" min="0" max="1" value={scenarioQuality}
                onChange={(e) => setScenarioQuality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              <p className={`text-xs mt-1 ${scenarioLabel.color}`}>{scenarioLabel.text}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">ค่าใช้จ่ายสำหรับการเปลี่ยนแปลง (บาท)</label>
              <input type="number" value={scenarioCost} onChange={(e) => setScenarioCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-5 border border-rose-200">
          <p className="text-sm text-rose-600 mb-1">ปีที่เหลือ</p>
          <p className="text-2xl font-bold text-rose-700">{remainingYears.toFixed(0)}</p>
          <p className="text-xs text-rose-500">ปี</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">QALY ปัจจุบัน</p>
          <p className="text-2xl font-bold text-blue-700">{qalyBaseline.toFixed(1)}</p>
          <p className="text-xs text-blue-500">Quality-Adjusted Life Years</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-5 border border-green-200">
          <p className="text-sm text-green-600 mb-1">QALY {scenarioName}</p>
          <p className="text-2xl font-bold text-green-700">{qalyScenario.toFixed(1)}</p>
          <p className="text-xs text-green-500">Quality-Adjusted Life Years</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <p className="text-sm text-purple-600 mb-1">QALY ที่ได้เพิ่ม</p>
          <p className="text-2xl font-bold text-purple-700">{qalyGained.toFixed(1)}</p>
          <p className="text-xs text-purple-500">ปีคุณภาพที่ได้เพิ่ม</p>
        </div>
      </div>

      {/* Cost Effectiveness */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> ความคุ้มค่าทางเศรษฐศาสตร์
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">ต้นทุนต่อ QALY</p>
            <p className="text-xl font-bold text-gray-800">
              {qalyGained > 0 ? `฿${costPerQaly.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
            </p>
            <p className={`text-sm mt-1 ${costLabel.color}`}>{costLabel.text}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500">
              WHO แนะนำว่าการรักษาที่มีต้นทุนต่อ QALY น้อยกว่า 1 เท่าของ GDP per capita ถือว่าคุ้มค่ามาก
              GDP per capita ของไทยอยู่ที่ประมาณ 160,000 บาท
            </p>
          </div>
        </div>

        {/* Visual bar */}
        {qalyGained > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">เปรียบเทียบ QALY</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>ก่อน (Baseline)</span>
                  <span>{qalyBaseline.toFixed(1)} QALYs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-5">
                  <div className="bg-blue-500 h-5 rounded-full" style={{ width: `${qalyScenario > 0 ? (qalyBaseline / qalyScenario) * 100 : 0}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{scenarioName}</span>
                  <span>{qalyScenario.toFixed(1)} QALYs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-5">
                  <div className="bg-green-500 h-5 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 prose prose-gray max-w-none">
        <h2 className="text-xl font-bold text-gray-800 mb-4">QALY คืออะไร? ทำไมต้องใช้คำนวณคุณภาพชีวิต</h2>
        <p>
          QALY หรือ Quality-Adjusted Life Year คือหน่วยวัดทางเศรษฐศาสตร์สาธารณสุขที่รวมทั้ง &quot;ปริมาณ&quot; และ &quot;คุณภาพ&quot; ของชีวิตเข้าด้วยกัน เป็นเครื่องมือสำคัญที่ใช้ในการประเมินความคุ้มค่าของการรักษาพยาบาล นโยบายสาธารณสุข และการตัดสินใจทางการแพทย์ทั่วโลก รวมถึงประเทศไทยที่ HITAP (โครงการประเมินเทคโนโลยีและนโยบายด้านสุขภาพ) ใช้ QALY เป็นตัวชี้วัดหลัก
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">หลักการคำนวณ QALY</h3>
        <p>
          QALY คำนวณโดยการคูณจำนวนปีที่เหลือของชีวิตกับคะแนนคุณภาพชีวิต (Utility Score) ที่มีค่าตั้งแต่ 0 (เสียชีวิต) ถึง 1 (สุขภาพสมบูรณ์แบบ) ตัวอย่างเช่น ถ้าคุณมีชีวิตอีก 40 ปี ด้วยคุณภาพชีวิต 0.8 คุณจะมี QALY เท่ากับ 32 ปี ซึ่งหมายความว่าคุณภาพชีวิตของคุณเทียบเท่ากับการมีสุขภาพสมบูรณ์ 32 ปี
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">การใช้ QALY ในการตัดสินใจ</h3>
        <p>
          QALY ช่วยในการตัดสินใจหลายระดับ ตั้งแต่ระดับบุคคลไปจนถึงระดับนโยบาย สำหรับบุคคล คุณสามารถใช้เปรียบเทียบทางเลือกในการรักษาต่าง ๆ ว่าทางเลือกใดให้ QALY มากกว่าเมื่อเทียบกับค่าใช้จ่าย สำหรับระดับนโยบาย รัฐบาลและหน่วยงานสาธารณสุขใช้ QALY ในการจัดสรรงบประมาณด้านสุขภาพอย่างมีประสิทธิภาพ
        </p>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">เกณฑ์ความคุ้มค่าของ WHO</h3>
        <p>
          องค์การอนามัยโลก (WHO) กำหนดเกณฑ์ความคุ้มค่าโดยเทียบกับ GDP per capita ของแต่ละประเทศ หากต้นทุนต่อ QALY น้อยกว่า 1 เท่าของ GDP per capita ถือว่าคุ้มค่ามาก หากอยู่ระหว่าง 1-3 เท่า ถือว่าคุ้มค่า และหากมากกว่า 3 เท่า ถือว่าไม่คุ้มค่า สำหรับประเทศไทย GDP per capita อยู่ที่ประมาณ 160,000 บาท เครื่องมือคำนวณ QALY นี้ช่วยให้คุณเห็นภาพรวมของคุณภาพชีวิตและความคุ้มค่าของการลงทุนด้านสุขภาพอย่างชัดเจน
        </p>
      </article>
    </div>
  );
}
