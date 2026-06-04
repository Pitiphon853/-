"use client";
import { useState } from "react";
import { Zap, Users, TrendingUp, Share2 } from "lucide-react";

export default function ViralCoefficient({ lang }: any) {
  const [currentUsers, setCurrentUsers] = useState<number>(100);
  const [invitesSent, setInvitesSent] = useState<number>(5);
  const [conversionRate, setConversionRate] = useState<number>(20);
  const [cycleDays, setCycleDays] = useState<number>(7);
  const [projectionCycles, setProjectionCycles] = useState<number>(10);

  const kFactor = invitesSent * (conversionRate / 100);
  const isViral = kFactor > 1;

  const projections = Array.from({ length: projectionCycles }, (_, i) => {
    const cycle = i + 1;
    let totalUsers = currentUsers;
    let newThisCycle = currentUsers;
    for (let c = 0; c < cycle; c++) {
      newThisCycle = newThisCycle * kFactor;
      totalUsers += newThisCycle;
    }
    return {
      cycle,
      day: cycle * cycleDays,
      users: Math.round(totalUsers),
      newUsers: Math.round(newThisCycle),
    };
  });

  const formatNum = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Share2 className="text-orange-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Viral Coefficient Calculator</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้ใช้ปัจจุบัน</label>
            <input type="number" value={currentUsers} onChange={e => setCurrentUsers(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวน Invite ที่ส่งต่อผู้ใช้</label>
              <input type="number" value={invitesSent} onChange={e => setInvitesSent(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Rate (%)</label>
              <input type="number" step="0.1" value={conversionRate} onChange={e => setConversionRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ระยะเวลาต่อ Cycle (วัน)</label>
              <input type="number" value={cycleDays} onChange={e => setCycleDays(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวน Cycle ที่คาดการณ์</label>
              <input type="number" value={projectionCycles} onChange={e => setProjectionCycles(Math.min(20, Math.max(1, Number(e.target.value))))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* K-Factor Result */}
        <div className="mt-8 space-y-4">
          <div className={`rounded-2xl p-6 text-center ${isViral ? "bg-green-50 border-2 border-green-300" : "bg-yellow-50 border-2 border-yellow-300"}`}>
            <Zap className={`w-10 h-10 mx-auto mb-2 ${isViral ? "text-green-500" : "text-yellow-500"}`} />
            <p className="text-sm text-gray-600 mb-1">K-Factor (Viral Coefficient)</p>
            <p className={`text-5xl font-extrabold ${isViral ? "text-green-700" : "text-yellow-700"}`}>{kFactor.toFixed(2)}</p>
            <p className={`text-sm mt-2 font-medium ${isViral ? "text-green-600" : "text-yellow-600"}`}>
              {isViral ? "🚀 แอปของคุณมี Viral Growth! (K &gt; 1)" : "⚠️ ยังไม่ Viral (K &lt; 1) ต้องเพิ่ม Invite หรือ Conversion"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">ผู้ใช้ใหม่ต่อ Cycle</p>
              <p className="text-xl font-bold text-gray-700">{(currentUsers * kFactor).toFixed(0)} คน</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">เวลาต่อ Cycle</p>
              <p className="text-xl font-bold text-gray-700">{cycleDays} วัน</p>
            </div>
          </div>
        </div>

        {/* Projection Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" /> คาดการณ์การเติบโต
          </h3>
          <div className="max-h-56 overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">Cycle</th>
                  <th className="px-3 py-2 text-right">วันที่</th>
                  <th className="px-3 py-2 text-right">ผู้ใช้ใหม่</th>
                  <th className="px-3 py-2 text-right">ผู้ใช้รวม</th>
                </tr>
              </thead>
              <tbody>
                {projections.map(p => (
                  <tr key={p.cycle} className="border-b border-gray-100">
                    <td className="px-3 py-1.5">{p.cycle}</td>
                    <td className="px-3 py-1.5 text-right">วันที่ {p.day}</td>
                    <td className="px-3 py-1.5 text-right text-green-600 font-medium">+{formatNum(p.newUsers)}</td>
                    <td className="px-3 py-1.5 text-right font-bold">{formatNum(p.users)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="prose max-w-2xl mx-auto text-gray-700">
        <h2>Viral Coefficient คืออะไร? วัดว่าแอปโตเร็วแค่ไหนด้วย K-Factor</h2>
        <p>
          Viral Coefficient หรือ K-Factor เป็นตัวชี้วัดสำคัญที่บอกว่าผลิตภัณฑ์หรือแอปของคุณมีการเติบโตแบบ Viral หรือไม่ แนวคิดนี้
          มาจากการวิเคราะห์ว่าผู้ใช้แต่ละคนสามารถดึงดูดผู้ใช้ใหม่เข้ามาได้กี่คน ถ้า K-Factor มากกว่า 1 หมายความว่า ผู้ใช้ทุกคน
          สร้างผู้ใช้ใหม่ได้มากกว่า 1 คน ทำให้เกิดการเติบโตแบบ Exponential อย่างแท้จริง
        </p>
        <h3>สูตรคำนวณ Viral Coefficient</h3>
        <p>
          K-Factor = จำนวน Invite ที่ผู้ใช้แต่ละคนส่ง × อัตรา Conversion ของ Invite เช่น ถ้าผู้ใช้แต่ละคนชวนเพื่อน 5 คน
          และ 20% ของคนที่ถูกชวนสมัครใช้งาน K-Factor จะเท่ากับ 5 × 0.20 = 1.0 ซึ่งเป็นจุดที่การเติบโตเริ่มเป็น Viral พอดี
          หาก K-Factor สูงกว่า 1 แม้เพียงเล็กน้อย ผลลัพธ์ก็จะเปลี่ยนแปลงอย่างมากเมื่อเวลาผ่านไป
        </p>
        <h3>ตัวอย่าง Viral Growth ที่ประสบความสำเร็จ</h3>
        <p>
          แอปอย่าง Dropbox ใช้กลยุทธ์ Referral Program ที่ให้พื้นที่เก็บข้อมูลเพิ่มเมื่อชวนเพื่อน ทำให้ K-Factor สูงมาก
          Hotmail เพิ่มข้อความ &quot;Get your free email at Hotmail&quot; ท้ายอีเมลทุกฉบับ ทำให้เติบโตจาก 0 ถึง 12 ล้านผู้ใช้ใน 18 เดือน
          WhatsApp ใช้ Network Effect โดยธรรมชาติ เพราะยิ่งมีเพื่อนใช้มาก ยิ่งมีเหตุผลให้สมัคร
        </p>
        <h3>วิธีเพิ่ม K-Factor ให้แอปของคุณ</h3>
        <p>
          มีสองทางหลักในการเพิ่ม K-Factor คือ เพิ่มจำนวน Invite ที่ส่งต่อผู้ใช้ หรือเพิ่ม Conversion Rate ของ Invite
          วิธีเพิ่ม Invite ได้แก่ ทำให้การแชร์ง่ายขึ้น สร้าง Incentive ให้ชวนเพื่อน หรือทำให้เนื้อหามีความน่าสนใจจนอยากแชร์
          ส่วนวิธีเพิ่ม Conversion ได้แก่ ปรับปรุง Landing Page ให้น่าสนใจ ลดขั้นตอนการสมัคร และสร้าง First Experience ที่ดี
          นอกจากนี้ การลดระยะเวลาต่อ Viral Cycle ก็สำคัญ เพราะถ้า Cycle สั้นลง การเติบโตก็จะเร็วขึ้นตามไปด้วย
        </p>
      </article>
    </div>
  );
}
