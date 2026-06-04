
"use client";
import { useState } from "react";
import { Users, TrendingDown, AlertTriangle, MessageSquare } from "lucide-react";

export default function BrooksLawTeamSize({ lang }: any) {
  const [teamSize, setTeamSize] = useState<number>(8);
  const [taskMonths, setTaskMonths] = useState<number>(12);
  const [rampUpWeeks, setRampUpWeeks] = useState<number>(4);
  const [commOverhead, setCommOverhead] = useState<number>(10);

  const commChannels = (teamSize * (teamSize - 1)) / 2;
  const totalCommOverhead = commChannels * commOverhead;
  const availableHoursPerPerson = 160; // hours/month
  const totalCapacity = teamSize * availableHoursPerPerson;
  const productiveHours = Math.max(0, totalCapacity - totalCommOverhead);
  const efficiency = totalCapacity > 0 ? (productiveHours / totalCapacity) * 100 : 0;

  // Optimal team size calculation (where marginal productivity drops below zero)
  let optimalSize = 1;
  let maxProd = 0;
  for (let n = 1; n <= 100; n++) {
    const ch = (n * (n - 1)) / 2;
    const prod = n * availableHoursPerPerson - ch * commOverhead;
    if (prod > maxProd) {
      maxProd = prod;
      optimalSize = n;
    }
  }

  const effectiveMonths = productiveHours > 0 ? (taskMonths * totalCapacity) / productiveHours : Infinity;

  // Adding new member impact
  const newSize = teamSize + 1;
  const newChannels = (newSize * (newSize - 1)) / 2;
  const newOverhead = newChannels * commOverhead;
  const newProd = newSize * availableHoursPerPerson - newOverhead;
  const rampUpCost = rampUpWeeks * 40; // hours lost for ramp-up
  const addingHelps = newProd > productiveHours;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-violet-100 rounded-xl">
            <Users className="w-6 h-6 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Brook&apos;s Law Team Size Calculator</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ขนาดทีมปัจจุบัน (คน)</label>
              <input type="number" min={1} value={teamSize} onChange={e => setTeamSize(Math.max(1, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ระยะเวลาโปรเจกต์ (man-months)</label>
              <input type="number" min={1} value={taskMonths} onChange={e => setTaskMonths(Math.max(1, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ramp-up คนใหม่ (สัปดาห์)</label>
              <input type="number" min={0} value={rampUpWeeks} onChange={e => setRampUpWeeks(Math.max(0, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เวลาสื่อสาร/ช่องทาง (ชม./เดือน)</label>
              <input type="number" min={0} value={commOverhead} onChange={e => setCommOverhead(Math.max(0, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-violet-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-violet-700 font-medium">ช่องทางสื่อสาร</span>
            </div>
            <p className="text-2xl font-bold text-violet-800">{commChannels} ช่องทาง</p>
            <p className="text-xs text-violet-600 mt-1">Overhead: {totalCommOverhead} ชม./เดือน</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">ประสิทธิภาพทีม</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{efficiency.toFixed(1)}%</p>
            <p className="text-xs text-blue-600 mt-1">{productiveHours.toLocaleString()} / {totalCapacity.toLocaleString()} ชม.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">ขนาดทีมที่เหมาะสม</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{optimalSize} คน</p>
            <p className="text-xs text-green-600 mt-1">ผลผลิตสูงสุด {maxProd.toLocaleString()} ชม./เดือน</p>
          </div>
          <div className={`${addingHelps ? "bg-green-50" : "bg-red-50"} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className={`w-4 h-4 ${addingHelps ? "text-green-600" : "text-red-600"}`} />
              <span className={`text-sm font-medium ${addingHelps ? "text-green-700" : "text-red-700"}`}>เพิ่มคนอีก 1?</span>
            </div>
            <p className={`text-lg font-bold ${addingHelps ? "text-green-800" : "text-red-800"}`}>
              {addingHelps ? "✅ ช่วยได้" : "❌ ไม่ช่วย (Brook's Law)"}
            </p>
            <p className={`text-xs mt-1 ${addingHelps ? "text-green-600" : "text-red-600"}`}>
              Ramp-up: {rampUpCost} ชม. | ผลผลิตใหม่: {newProd.toLocaleString()} ชม.
            </p>
          </div>
        </div>
      </div>

      <article className="prose max-w-none mb-8">
        <h2>Brook&apos;s Law Calculator — ขนาดทีมที่เหมาะสมสำหรับโปรเจกต์ซอฟต์แวร์</h2>
        <p>
          Brook&apos;s Law เป็นหลักการที่ Frederick Brooks เสนอไว้ในหนังสือ The Mythical Man-Month ว่า &quot;การเพิ่มคนเข้าไปในโปรเจกต์ที่ล่าช้า จะทำให้ล่าช้ายิ่งขึ้น&quot; หลักการนี้ยังคงเป็นจริงในอุตสาหกรรมซอฟต์แวร์ทุกวันนี้ เพราะเมื่อทีมมีขนาดใหญ่ขึ้น ช่องทางการสื่อสารจะเพิ่มขึ้นแบบทวีคูณ
        </p>
        <h3>สูตรการคำนวณ</h3>
        <p>
          จำนวนช่องทางสื่อสาร (Communication Channels) คำนวณจากสูตร n(n-1)/2 เมื่อ n คือจำนวนสมาชิกในทีม ทีม 5 คนมี 10 ช่องทาง ทีม 10 คนมี 45 ช่องทาง ทีม 20 คนมีถึง 190 ช่องทาง แต่ละช่องทางใช้เวลาในการสื่อสาร ทำให้เวลาทำงานจริงลดลง
        </p>
        <h3>ทำไมเพิ่มคนแล้วงานไม่เร็วขึ้น</h3>
        <p>
          เมื่อเพิ่มสมาชิกใหม่เข้าทีม จะเกิดต้นทุนหลายอย่าง ได้แก่ Ramp-up Time คือเวลาที่คนใหม่ต้องเรียนรู้โปรเจกต์ก่อนทำงานได้เต็มที่ Communication Overhead คือเวลาที่ทีมต้องใช้ในการสื่อสารกับสมาชิกใหม่ และ Context Switching ที่เกิดจากการประสานงานที่ซับซ้อนขึ้น สิ่งเหล่านี้กินเวลาทำงานจริงจนบางครั้งเพิ่มคนแล้วผลผลิตกลับลดลง
        </p>
        <h3>ขนาดทีมที่เหมาะสม</h3>
        <p>
          งานวิจัยและประสบการณ์จริงชี้ว่าทีมขนาด 5-9 คนมักมีประสิทธิภาพสูงสุด ตรงกับกฎ Two Pizza Rule ของ Amazon ที่ว่าทีมควรเล็กพอที่จะเลี้ยงด้วยพิซซ่า 2 ถาด เครื่องคำนวณนี้จะช่วยหาจุดที่ขนาดทีมเหมาะสมที่สุด โดยพิจารณาจาก overhead ในการสื่อสารจริง
        </p>
        <h3>วิธีใช้เครื่องคำนวณ</h3>
        <p>
          กรอกขนาดทีมปัจจุบัน ระยะเวลาโปรเจกต์ เวลา ramp-up ของคนใหม่ และเวลาสื่อสารต่อช่องทาง ระบบจะแสดงช่องทางสื่อสาร ประสิทธิภาพทีม ขนาดที่เหมาะสม และคำแนะนำว่าควรเพิ่มคนหรือไม่ ข้อมูลเหล่านี้ช่วยให้ผู้จัดการโปรเจกต์ตัดสินใจได้อย่างมีเหตุผล
        </p>
      </article>
    </div>
  );
}
