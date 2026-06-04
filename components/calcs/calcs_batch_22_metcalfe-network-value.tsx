"use client";
import { useState } from "react";
import { Network, Users, TrendingUp, BarChart3 } from "lucide-react";

export default function MetcalfeNetworkValue({ lang }: any) {
  const [users, setUsers] = useState<number>(1000);
  const [valuePerConnection, setValuePerConnection] = useState<number>(0.5);
  const [growthRate, setGrowthRate] = useState<number>(10);
  const [months, setMonths] = useState<number>(12);

  const connections = (users * (users - 1)) / 2;
  const networkValue = connections * valuePerConnection;

  const projections = Array.from({ length: months }, (_, i) => {
    const month = i + 1;
    const futureUsers = Math.round(users * Math.pow(1 + growthRate / 100, month));
    const futureConnections = (futureUsers * (futureUsers - 1)) / 2;
    const futureValue = futureConnections * valuePerConnection;
    return { month, users: futureUsers, connections: futureConnections, value: futureValue };
  });

  const finalProjection = projections[projections.length - 1];
  const growthMultiple = networkValue > 0 ? finalProjection.value / networkValue : 0;

  const formatNumber = (n: number) => {
    if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toFixed(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Network className="text-violet-600 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Metcalfe&apos;s Law Network Value Calculator</h2>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้ใช้ปัจจุบัน</label>
              <input type="number" value={users} onChange={e => setUsers(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่าต่อ Connection (บาท)</label>
              <input type="number" step="0.01" value={valuePerConnection} onChange={e => setValuePerConnection(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อัตราเติบโตต่อเดือน (%)</label>
              <input type="number" step="0.1" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเดือนที่คาดการณ์</label>
              <input type="number" value={months} onChange={e => setMonths(Math.min(24, Math.max(1, Number(e.target.value))))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Current State */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-violet-500" /> สถานะปัจจุบัน
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-1 text-violet-500" />
              <p className="text-xs text-gray-500">ผู้ใช้</p>
              <p className="text-xl font-bold text-violet-700">{formatNumber(users)}</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <Network className="w-6 h-6 mx-auto mb-1 text-violet-500" />
              <p className="text-xs text-gray-500">Connections</p>
              <p className="text-xl font-bold text-violet-700">{formatNumber(connections)}</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-1 text-violet-500" />
              <p className="text-xs text-gray-500">มูลค่าเครือข่าย</p>
              <p className="text-xl font-bold text-violet-700">{formatNumber(networkValue)} ฿</p>
            </div>
          </div>
        </div>

        {/* Projection */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">📈 คาดการณ์ใน {months} เดือน</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">ผู้ใช้ที่คาดการณ์</p>
              <p className="text-2xl font-extrabold text-green-700">{formatNumber(finalProjection.users)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">มูลค่าเครือข่ายที่คาดการณ์</p>
              <p className="text-2xl font-extrabold text-green-700">{formatNumber(finalProjection.value)} ฿</p>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600">มูลค่าเพิ่มขึ้น</p>
            <p className="text-3xl font-extrabold text-indigo-700">{growthMultiple.toFixed(1)}x</p>
          </div>

          <div className="mt-4 max-h-48 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">เดือน</th>
                  <th className="px-3 py-2 text-right">ผู้ใช้</th>
                  <th className="px-3 py-2 text-right">Connections</th>
                  <th className="px-3 py-2 text-right">มูลค่า</th>
                </tr>
              </thead>
              <tbody>
                {projections.map(p => (
                  <tr key={p.month} className="border-b border-gray-100">
                    <td className="px-3 py-1.5">{p.month}</td>
                    <td className="px-3 py-1.5 text-right">{formatNumber(p.users)}</td>
                    <td className="px-3 py-1.5 text-right">{formatNumber(p.connections)}</td>
                    <td className="px-3 py-1.5 text-right">{formatNumber(p.value)} ฿</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="prose max-w-2xl mx-auto text-gray-700">
        <h2>Metcalfe&apos;s Law คืออะไร? กฎที่อธิบายมูลค่าของเครือข่าย</h2>
        <p>
          Metcalfe&apos;s Law เป็นกฎที่ตั้งชื่อตาม Robert Metcalfe ผู้ร่วมคิดค้น Ethernet โดยระบุว่ามูลค่าของเครือข่ายจะเพิ่มขึ้น
          ตามสัดส่วนกำลังสองของจำนวนผู้ใช้ในเครือข่าย หรือพูดง่ายๆ ว่า ถ้าจำนวนผู้ใช้เพิ่มเป็น 2 เท่า มูลค่าของเครือข่ายจะเพิ่มเป็น 4 เท่า
          นี่คือหลักการพื้นฐานที่อธิบายว่าทำไมบริษัทอย่าง Facebook, LINE และ WeChat ถึงมีมูลค่ามหาศาล
        </p>
        <h3>สูตรการคำนวณ Metcalfe&apos;s Law</h3>
        <p>
          สูตรพื้นฐานคือ V = n(n-1)/2 โดย V คือจำนวน Connection ที่เป็นไปได้ และ n คือจำนวนผู้ใช้ในเครือข่าย
          เมื่อกำหนดมูลค่าต่อ Connection แต่ละอัน ก็สามารถประมาณมูลค่ารวมของเครือข่ายได้ ตัวอย่างเช่น เครือข่ายที่มีผู้ใช้ 1,000 คน
          จะมี Connection ที่เป็นไปได้ถึง 499,500 Connection ซึ่งมากกว่าจำนวนผู้ใช้อย่างเห็นได้ชัด
        </p>
        <h3>การนำไปใช้ในธุรกิจและเทคโนโลยี</h3>
        <p>
          Metcalfe&apos;s Law ถูกนำไปใช้อย่างกว้างขวางในการประเมินมูลค่าของ Social Network, Marketplace Platform และ Communication App ต่างๆ
          นักลงทุนมักใช้กฎนี้ในการวิเคราะห์ว่า Startup ที่กำลังสร้างเครือข่ายมีศักยภาพเติบโตมากแค่ไหน เพราะเมื่อเครือข่ายผ่านจุด Critical Mass
          มูลค่าจะเพิ่มขึ้นอย่างก้าวกระโดด นี่คือเหตุผลที่บริษัทเทคโนโลยีมักเน้นหา User Growth ก่อนที่จะหา Revenue
        </p>
        <h3>ข้อจำกัดของ Metcalfe&apos;s Law</h3>
        <p>
          แม้ว่ากฎนี้จะเป็นเครื่องมือที่มีประโยชน์ แต่ก็มีข้อจำกัด เพราะในความเป็นจริง ไม่ใช่ทุก Connection ที่มีมูลค่าเท่ากัน
          ผู้ใช้แต่ละคนมีความสัมพันธ์กับผู้ใช้บางส่วนเท่านั้น ไม่ได้เชื่อมต่อกับทุกคนในเครือข่าย นักวิจัยบางกลุ่มเสนอว่า
          ควรใช้สูตร n × log(n) แทน n² เพื่อให้สะท้อนความเป็นจริงมากขึ้น อย่างไรก็ตาม Metcalfe&apos;s Law ยังคงเป็นกรอบคิดที่ดี
          สำหรับเข้าใจ Network Effects และการเติบโตแบบ Exponential ของธุรกิจแพลตฟอร์มในยุคดิจิทัล
        </p>
      </article>
    </div>
  );
}
