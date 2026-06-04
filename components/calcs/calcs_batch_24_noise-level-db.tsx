"use client";
import { useState } from "react";
import { Calculator, Plus, Trash2, Volume2, AlertTriangle } from "lucide-react";

interface NoiseSource {
  id: number;
  name: string;
  db: number;
  hours: number;
}

export default function NoiseLevelDb({ lang }: any) {
  const [sources, setSources] = useState<NoiseSource[]>([
    { id: 1, name: "แอร์สำนักงาน", db: 50, hours: 8 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [result, setResult] = useState<{
    combinedDb: number;
    dose: number;
    maxHours: number;
    risk: string;
  } | null>(null);

  const addSource = () => {
    setSources([...sources, { id: nextId, name: "", db: 50, hours: 1 }]);
    setNextId(nextId + 1);
  };

  const removeSource = (id: number) => {
    if (sources.length > 1) {
      setSources(sources.filter((s) => s.id !== id));
    }
  };

  const updateSource = (id: number, field: keyof NoiseSource, value: any) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculate = () => {
    if (sources.length === 0) return;

    // Combined dB = 10 * log10(sum of 10^(Li/10))
    const sumIntensity = sources.reduce((sum, s) => {
      return sum + Math.pow(10, s.db / 10);
    }, 0);
    const combinedDb = 10 * Math.log10(sumIntensity);

    // Noise dose based on NIOSH criteria (85 dB for 8 hours)
    let dose = 0;
    sources.forEach((s) => {
      const allowedHours = 8 / Math.pow(2, (s.db - 85) / 3);
      dose += (s.hours / allowedHours) * 100;
    });

    // Max safe exposure at combined level
    const maxHours = 8 / Math.pow(2, (combinedDb - 85) / 3);

    let risk = "ปลอดภัย";
    if (dose > 100) risk = "อันตราย — เกินขีดจำกัด!";
    else if (dose > 50) risk = "เสี่ยงปานกลาง";
    else if (dose > 25) risk = "เสี่ยงต่ำ";

    setResult({
      combinedDb: Math.round(combinedDb * 10) / 10,
      dose: Math.round(dose * 10) / 10,
      maxHours: Math.round(maxHours * 10) / 10,
      risk,
    });
  };

  const getRiskColor = (risk: string) => {
    if (risk.includes("อันตราย")) return "text-red-600 bg-red-50 border-red-200";
    if (risk.includes("ปานกลาง")) return "text-orange-600 bg-orange-50 border-orange-200";
    if (risk.includes("ต่ำ")) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Volume2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Noise Level dB Calculator</h2>
            <p className="text-gray-500 text-sm">คำนวณระดับเสียงสะสมและความเสี่ยงต่อการได้ยิน</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-700">แหล่งเสียง</h3>
          {sources.map((source, idx) => (
            <div key={source.id} className="flex flex-wrap gap-3 items-end p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-[140px]">
                <label className="text-xs text-gray-500 block mb-1">ชื่อแหล่งเสียง</label>
                <input
                  type="text"
                  value={source.name}
                  onChange={(e) => updateSource(source.id, "name", e.target.value)}
                  placeholder={`แหล่งเสียง ${idx + 1}`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-gray-500 block mb-1">dB</label>
                <input
                  type="number"
                  value={source.db}
                  onChange={(e) => updateSource(source.id, "db", Number(e.target.value))}
                  min={0}
                  max={200}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-gray-500 block mb-1">ชั่วโมง/วัน</label>
                <input
                  type="number"
                  value={source.hours}
                  onChange={(e) => updateSource(source.id, "hours", Number(e.target.value))}
                  min={0}
                  max={24}
                  step={0.5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>
              <button
                onClick={() => removeSource(source.id)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                disabled={sources.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addSource}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> เพิ่มแหล่งเสียง
          </button>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" /> คำนวณระดับเสียงสะสม
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-sm text-purple-600 mb-1">เสียงรวม</p>
                <p className="text-3xl font-bold text-purple-800">{result.combinedDb}</p>
                <p className="text-xs text-purple-500">dB</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-600 mb-1">Noise Dose</p>
                <p className="text-3xl font-bold text-blue-800">{result.dose}%</p>
                <p className="text-xs text-blue-500">ของขีดจำกัดต่อวัน</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">เวลาสัมผัสเสียงปลอดภัยสูงสุด (ที่ระดับรวม)</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.maxHours > 1000 ? "ไม่จำกัด" : `${result.maxHours} ชม.`}
              </p>
            </div>

            <div className={`rounded-xl p-4 text-center border ${getRiskColor(result.risk)}`}>
              {result.risk.includes("อันตราย") && <AlertTriangle className="w-5 h-5 mx-auto mb-1" />}
              <p className="font-semibold">{result.risk}</p>
            </div>
          </div>
        )}
      </div>

      <article className="mt-10 prose prose-gray max-w-none">
        <h2>เครื่องคำนวณระดับเสียงสะสม (Noise Level dB Calculator)</h2>
        <p>
          เสียงรบกวนเป็นปัจจัยสำคัญที่ส่งผลกระทบต่อสุขภาพของคนทำงานและประชาชนทั่วไป การสัมผัสเสียงดังเป็นเวลานานอาจนำไปสู่ปัญหาการได้ยินเสื่อม ความเครียด ความดันโลหิตสูง และปัญหาสุขภาพอื่น ๆ เครื่องคำนวณระดับเสียงสะสม (Noise Level dB Calculator) ช่วยให้คุณประเมินระดับเสียงรวมจากแหล่งเสียงหลายแห่ง และคำนวณ Noise Dose ที่ร่างกายได้รับในแต่ละวัน
        </p>

        <h3>หลักการคำนวณ</h3>
        <p>
          ระดับเสียงวัดเป็นหน่วยเดซิเบล (dB) ซึ่งเป็นหน่วยลอการิทึม การรวมเสียงจากหลายแหล่งไม่ได้เป็นการบวกตรง ๆ แต่ใช้สูตร dB รวม = 10 × log₁₀(ΣI) โดยที่ I = 10^(dB/10) สำหรับแต่ละแหล่ง ตัวอย่างเช่น เสียง 2 แหล่งที่ 80 dB เท่ากัน เมื่อรวมกันจะได้ประมาณ 83 dB ไม่ใช่ 160 dB
        </p>

        <h3>มาตรฐาน NIOSH</h3>
        <p>
          สถาบันความปลอดภัยและอาชีวอนามัยแห่งชาติสหรัฐอเมริกา (NIOSH) กำหนดว่าระดับเสียง 85 dB เป็นขีดจำกัดที่ปลอดภัยสำหรับการสัมผัสนาน 8 ชั่วโมงต่อวัน ทุก ๆ เสียงที่เพิ่มขึ้น 3 dB เวลาที่ปลอดภัยจะลดลงครึ่งหนึ่ง เช่น 88 dB สัมผัสได้เพียง 4 ชั่วโมง และ 91 dB เพียง 2 ชั่วโมง
        </p>

        <h3>Noise Dose คืออะไร?</h3>
        <p>
          Noise Dose คือเปอร์เซ็นต์ของการสัมผัสเสียงต่อวันเมื่อเทียบกับขีดจำกัดที่ปลอดภัย ถ้า Noise Dose เกิน 100% หมายความว่าคุณสัมผัสเสียงเกินมาตรฐานที่ปลอดภัยแล้ว ซึ่งมีความเสี่ยงต่อการสูญเสียการได้ยินระยะยาว เครื่องมือนี้จะคำนวณ Noise Dose จากทุกแหล่งเสียงที่คุณระบุ
        </p>

        <h3>ตัวอย่างระดับเสียงทั่วไป</h3>
        <p>
          เสียงกระซิบอยู่ที่ประมาณ 30 dB, สำนักงานทั่วไป 50-60 dB, การจราจรบนถนน 70-80 dB, เครื่องตัดหญ้า 90 dB, คอนเสิร์ต 100-120 dB และเสียงปืน 140 dB ขึ้นไป การรู้ระดับเสียงของกิจกรรมต่าง ๆ จะช่วยให้คุณป้องกันตัวเองได้ดีขึ้น
        </p>

        <h3>วิธีป้องกันอันตรายจากเสียง</h3>
        <p>
          หากคุณต้องอยู่ในสภาพแวดล้อมที่มีเสียงดัง ควรใช้อุปกรณ์ป้องกันเสียง เช่น ear plug หรือ ear muff พักจากเสียงดังเป็นระยะ ลดระดับเสียงที่แหล่งกำเนิด และตรวจการได้ยินเป็นประจำ เครื่องคำนวณนี้ช่วยให้คุณประเมินสถานการณ์และวางแผนการป้องกันได้อย่างเหมาะสม
        </p>
      </article>
    </div>
  );
}
