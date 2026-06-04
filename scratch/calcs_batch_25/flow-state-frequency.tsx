"use client";
import { useState } from "react";
import { Calculator, Brain, Zap, TrendingUp, Info } from "lucide-react";

export default function FlowStateFrequency({ lang }: any) {
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<number>(40);
  const [flowSessionsPerWeek, setFlowSessionsPerWeek] = useState<number>(5);
  const [avgFlowDuration, setAvgFlowDuration] = useState<number>(90);
  const [distractionFrequency, setDistractionFrequency] = useState<number>(3);
  const [taskComplexity, setTaskComplexity] = useState<number>(7);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => setCalculated(true);

  const totalFlowMinutes = flowSessionsPerWeek * avgFlowDuration;
  const totalWorkMinutes = workHoursPerWeek * 60;
  const flowPercentage = totalWorkMinutes > 0 ? (totalFlowMinutes / totalWorkMinutes) * 100 : 0;
  const distractionPenalty = Math.max(0, 1 - distractionFrequency * 0.08);
  const complexityBonus = taskComplexity / 10;
  const effectiveFlowScore = Math.min(100, flowPercentage * distractionPenalty * complexityBonus * 2.5);
  const productivityMultiplier = 1 + (effectiveFlowScore / 100) * 4;
  const weeklyFlowHours = totalFlowMinutes / 60;

  const getFlowLevel = (score: number) => {
    if (score >= 80) return { label: "Flow Master", color: "text-green-400", bg: "bg-green-900/30" };
    if (score >= 60) return { label: "Flow Adept", color: "text-blue-400", bg: "bg-blue-900/30" };
    if (score >= 40) return { label: "Flow Learner", color: "text-yellow-400", bg: "bg-yellow-900/30" };
    if (score >= 20) return { label: "Flow Beginner", color: "text-orange-400", bg: "bg-orange-900/30" };
    return { label: "Flow Novice", color: "text-red-400", bg: "bg-red-900/30" };
  };

  const level = getFlowLevel(effectiveFlowScore);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Flow State Frequency Calculator</h1>
          <p className="text-gray-400 text-lg">วัดความถี่ในการเข้าสู่สถานะ Flow ของคุณ</p>
        </div>

        {/* Calculator Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ชั่วโมงทำงานต่อสัปดาห์
              </label>
              <input
                type="number"
                value={workHoursPerWeek}
                onChange={(e) => setWorkHoursPerWeek(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                min={1}
                max={168}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                จำนวนครั้งที่เข้า Flow ต่อสัปดาห์
              </label>
              <input
                type="number"
                value={flowSessionsPerWeek}
                onChange={(e) => setFlowSessionsPerWeek(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                min={0}
                max={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ระยะเวลาเฉลี่ยต่อ Flow Session (นาที)
              </label>
              <input
                type="number"
                value={avgFlowDuration}
                onChange={(e) => setAvgFlowDuration(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                min={10}
                max={480}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                สิ่งรบกวนต่อชั่วโมง (ครั้ง)
              </label>
              <input
                type="number"
                value={distractionFrequency}
                onChange={(e) => setDistractionFrequency(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                min={0}
                max={20}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ความซับซ้อนของงาน (1-10)
              </label>
              <input
                type="range"
                value={taskComplexity}
                onChange={(e) => setTaskComplexity(Number(e.target.value))}
                className="w-full accent-purple-500"
                min={1}
                max={10}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>ง่าย (1)</span>
                <span className="text-purple-400 font-medium">{taskComplexity}</span>
                <span>ซับซ้อนมาก (10)</span>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            คำนวณ Flow Frequency
          </button>
        </div>

        {/* Results */}
        {calculated && (
          <div className="space-y-6 mb-10">
            {/* Main Score */}
            <div className={`${level.bg} border border-gray-800 rounded-2xl p-6 text-center`}>
              <p className="text-sm text-gray-400 mb-1">Flow State Score</p>
              <p className={`text-5xl font-bold ${level.color} mb-2`}>{effectiveFlowScore.toFixed(1)}</p>
              <p className={`text-lg font-medium ${level.color}`}>{level.label}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Flow Time / สัปดาห์</p>
                <p className="text-2xl font-bold text-white">{weeklyFlowHours.toFixed(1)} ชม.</p>
                <p className="text-xs text-gray-500">{flowPercentage.toFixed(1)}% ของเวลาทำงาน</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">ตัวคูณ Productivity</p>
                <p className="text-2xl font-bold text-white">{productivityMultiplier.toFixed(1)}x</p>
                <p className="text-xs text-gray-500">เทียบกับการทำงานปกติ</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Distraction Penalty</p>
                <p className="text-2xl font-bold text-white">{((1 - distractionPenalty) * 100).toFixed(0)}%</p>
                <p className="text-xs text-gray-500">ประสิทธิภาพที่สูญเสีย</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">คำแนะนำเพิ่ม Flow</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• ปิดแจ้งเตือนทั้งหมดระหว่างทำงาน Deep Work</li>
                <li>• เลือกงานที่ท้าทายพอดี — ไม่ง่ายไป ไม่ยากไป</li>
                <li>• ตั้งเป้าหมายชัดเจนก่อนเริ่มงานแต่ละชิ้น</li>
                <li>• จัดสภาพแวดล้อมให้เอื้อต่อสมาธิ</li>
                <li>• ฝึกสมาธิอย่างสม่ำเสมอ 10-15 นาทีต่อวัน</li>
              </ul>
            </div>
          </div>
        )}

        {/* SEO Article */}
        <article className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Flow State Frequency คืออะไร? ทำไมการเข้าถึง Flow ถึงสำคัญต่อประสิทธิภาพการทำงาน</h2>
          <p>
            Flow State หรือสถานะ Flow คือสภาวะทางจิตที่บุคคลมีสมาธิจดจ่ออยู่กับกิจกรรมใดกิจกรรมหนึ่งอย่างลึกซึ้ง จนลืมเวลา ลืมสิ่งรอบข้าง และรู้สึกว่าทุกอย่างไหลลื่นอย่างเป็นธรรมชาติ แนวคิดนี้ถูกพัฒนาโดย Mihaly Csikszentmihalyi นักจิตวิทยาชาวฮังการี-อเมริกัน ซึ่งค้นพบว่าผู้คนจะมีความสุขและทำงานได้ดีที่สุดเมื่ออยู่ในสถานะนี้
          </p>
          <p>
            การวัด Flow State Frequency หรือความถี่ในการเข้าสู่สถานะ Flow เป็นเครื่องมือสำคัญในการประเมินประสิทธิภาพการทำงานของตัวเอง งานวิจัยจาก McKinsey พบว่าพนักงานที่อยู่ในสถานะ Flow สามารถทำงานได้มากกว่าคนทั่วไปถึง 500% นั่นหมายความว่าถ้าคุณสามารถเพิ่มเวลาที่อยู่ใน Flow ได้มากขึ้น ผลงานของคุณจะดีขึ้นอย่างมหาศาล
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">ปัจจัยที่ส่งผลต่อการเข้าสู่ Flow State</h3>
          <p>
            การเข้าสู่ Flow State ขึ้นอยู่กับหลายปัจจัย ได้แก่ ความท้าทายของงานที่ต้องเหมาะกับระดับทักษะ (Challenge-Skill Balance) เป้าหมายที่ชัดเจน (Clear Goals) ผลตอบรับที่รวดเร็ว (Immediate Feedback) และสภาพแวดล้อมที่ปราศจากสิ่งรบกวน สิ่งรบกวนเป็นอุปสรรคสำคัญที่สุด เพราะงานวิจัยชี้ว่าหลังถูกขัดจังหวะ คนต้องใช้เวลาเฉลี่ย 23 นาทีในการกลับเข้าสู่สมาธิลึกอีกครั้ง
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">วิธีคำนวณ Flow State Frequency</h3>
          <p>
            เครื่องมือนี้คำนวณจากอัตราส่วนของเวลาที่อยู่ใน Flow เทียบกับเวลาทำงานทั้งหมด ปรับด้วยค่าสิ่งรบกวน (Distraction Penalty) และความซับซ้อนของงาน งานที่มีความซับซ้อนเหมาะสมจะทำให้เข้า Flow ได้ง่ายกว่า ในขณะที่สิ่งรบกวนจะลดโอกาสในการเข้าสู่ Flow อย่างมาก
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">เทคนิคเพิ่มความถี่ในการเข้า Flow</h3>
          <p>
            หากต้องการเพิ่ม Flow Frequency ควรเริ่มจากการจัด Time Block สำหรับ Deep Work อย่างน้อย 90 นาทีต่อครั้ง ปิดแจ้งเตือนทุกอย่าง เลือกงานที่ยากพอดีกับทักษะ และฝึกสมาธิเป็นประจำ การนอนหลับให้เพียงพอและออกกำลังกายก็ช่วยให้เข้า Flow ได้ง่ายขึ้น นักวิจัยจาก Harvard Business Review แนะนำให้เริ่มต้นวันด้วยงานที่สำคัญที่สุดในช่วงที่พลังงานสูง เพื่อเพิ่มโอกาสเข้าสู่ Flow State ได้อย่างเต็มที่
          </p>
          <p>
            การติดตาม Flow Frequency เป็นประจำจะช่วยให้คุณเข้าใจรูปแบบการทำงานของตัวเอง และปรับปรุงสภาพแวดล้อมและนิสัยการทำงานให้เอื้อต่อการเข้า Flow มากยิ่งขึ้น ลองใช้เครื่องมือนี้ทุกสัปดาห์เพื่อดูพัฒนาการของตัวเอง
          </p>
        </article>
      </div>
    </div>
  );
}
