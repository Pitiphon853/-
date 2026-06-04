"use client";
import { useState } from "react";
import { Heart, Users, Clock, TrendingUp } from "lucide-react";

export default function RelationshipInvestment({ lang }: any) {
  const [partner, setPartner] = useState(0);
  const [family, setFamily] = useState(0);
  const [closeFriends, setCloseFriends] = useState(0);
  const [colleagues, setColleagues] = useState(0);
  const [community, setCommunity] = useState(0);
  const [selfCare, setSelfCare] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const totalHours = partner + family + closeFriends + colleagues + community + selfCare;
  const awakeHours = 112; // 16 hours * 7 days
  const investmentPercent = awakeHours > 0 ? (totalHours / awakeHours) * 100 : 0;

  const getScore = () => {
    let score = 0;
    if (partner >= 5) score += 20;
    else if (partner >= 2) score += 10;
    if (family >= 3) score += 20;
    else if (family >= 1) score += 10;
    if (closeFriends >= 2) score += 20;
    else if (closeFriends >= 1) score += 10;
    if (selfCare >= 3) score += 20;
    else if (selfCare >= 1) score += 10;
    if (community >= 1) score += 10;
    const balance = Math.max(0, 10 - Math.abs(partner - family) - Math.abs(closeFriends - selfCare));
    score += balance;
    return Math.min(100, score);
  };

  const score = getScore();

  const getGrade = () => {
    if (score >= 80) return { label: "ยอดเยี่ยม", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 60) return { label: "ดี", color: "text-blue-600", bg: "bg-blue-50" };
    if (score >= 40) return { label: "พอใช้", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { label: "ควรปรับปรุง", color: "text-red-600", bg: "bg-red-50" };
  };

  const grade = getGrade();

  const fields = [
    { label: "คู่รัก/คู่ครอง", value: partner, setter: setPartner, icon: <Heart className="w-4 h-4 text-pink-500" /> },
    { label: "ครอบครัว", value: family, setter: setFamily, icon: <Users className="w-4 h-4 text-orange-500" /> },
    { label: "เพื่อนสนิท", value: closeFriends, setter: setCloseFriends, icon: <Users className="w-4 h-4 text-blue-500" /> },
    { label: "เพื่อนร่วมงาน", value: colleagues, setter: setColleagues, icon: <Users className="w-4 h-4 text-gray-500" /> },
    { label: "ชุมชน/อาสาสมัคร", value: community, setter: setCommunity, icon: <Users className="w-4 h-4 text-green-500" /> },
    { label: "ดูแลตัวเอง (Self-care)", value: selfCare, setter: setSelfCare, icon: <Heart className="w-4 h-4 text-purple-500" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 rounded-xl">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Relationship Time Investment</h2>
            <p className="text-gray-500 text-sm">คำนวณเวลาที่คุณให้กับคนสำคัญในแต่ละสัปดาห์</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {fields.map((f, i) => (
            <div key={i}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                {f.icon} {f.label} (ชั่วโมง/สัปดาห์)
              </label>
              <input
                type="number"
                min={0}
                max={112}
                step={0.5}
                value={f.value}
                onChange={(e) => f.setter(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition"
        >
          คำนวณ
        </button>

        {calculated && (
          <div className="mt-6 space-y-4">
            <div className={`${grade.bg} rounded-xl p-6 text-center`}>
              <p className="text-sm text-gray-500 mb-1">คะแนนการลงทุนความสัมพันธ์</p>
              <p className={`text-5xl font-bold ${grade.color}`}>{score}</p>
              <p className={`text-lg font-semibold ${grade.color} mt-1`}>{grade.label}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{totalHours.toFixed(1)}</p>
                <p className="text-xs text-gray-500">ชม./สัปดาห์ ทั้งหมด</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">{investmentPercent.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">ของเวลาตื่น</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-3">สัดส่วนเวลา</h3>
              {fields.map((f, i) => {
                const pct = totalHours > 0 ? (f.value / totalHours) * 100 : 0;
                return (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{f.label}</span>
                      <span>{pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-pink-50 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">💡 คำแนะนำ:</p>
              {partner < 3 && <p>• ลองจัดเวลา Date Night สัปดาห์ละ 1 ครั้ง</p>}
              {family < 2 && <p>• โทรหาครอบครัวอย่างน้อยสัปดาห์ละ 1 ครั้ง</p>}
              {closeFriends < 1 && <p>• นัดพบเพื่อนสนิทเดือนละ 1-2 ครั้ง</p>}
              {selfCare < 2 && <p>• อย่าลืมดูแลตัวเองด้วย ออกกำลังกายหรือทำสิ่งที่ชอบ</p>}
              {score >= 80 && <p>• คุณจัดสรรเวลาได้สมดุลดีมาก! รักษาไว้</p>}
            </div>
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700">
        <h2 className="text-xl font-bold mb-3">Relationship Time Investment: วัดเวลาที่คุณให้กับคนสำคัญ</h2>
        <p>
          ในยุคที่ทุกคนต่างยุ่งวุ่นวายกับการทำงาน การใช้เวลากับโซเชียลมีเดีย และภาระหน้าที่ต่าง ๆ สิ่งหนึ่งที่มักถูกมองข้ามคือ
          &quot;เวลาที่เราให้กับคนสำคัญ&quot; ไม่ว่าจะเป็นคู่ครอง ครอบครัว เพื่อนสนิท หรือแม้แต่ตัวเราเอง งานวิจัยด้านจิตวิทยาเชิงบวก
          (Positive Psychology) ชี้ว่า ความสัมพันธ์ที่ดีเป็นปัจจัยสำคัญที่สุดในการสร้างความสุขระยะยาว
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">ทำไมต้องวัดเวลาที่ลงทุนในความสัมพันธ์?</h3>
        <p>
          การ &quot;ลงทุนเวลา&quot; ในความสัมพันธ์ไม่ใช่แค่การอยู่ด้วยกัน แต่หมายถึง &quot;เวลาที่มีคุณภาพ&quot; (Quality Time) เช่น
          การพูดคุยอย่างตั้งใจ การทำกิจกรรมร่วมกัน หรือแม้แต่การฟังอย่างเข้าใจ เครื่องมือนี้ช่วยให้คุณมองเห็นภาพรวมว่า
          ในแต่ละสัปดาห์คุณใช้เวลากับใครมากน้อยแค่ไหน และมีความสมดุลหรือไม่
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">วิธีใช้เครื่องมือนี้</h3>
        <p>
          กรอกจำนวนชั่วโมงต่อสัปดาห์ที่คุณใช้กับแต่ละกลุ่มคน ระบบจะคำนวณคะแนนการลงทุนความสัมพันธ์ของคุณ โดยพิจารณาจาก
          ความสมดุลระหว่างกลุ่มต่าง ๆ และเปรียบเทียบกับเวลาตื่นทั้งหมดในสัปดาห์ (ประมาณ 112 ชั่วโมง)
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">ผลวิจัยที่น่าสนใจ</h3>
        <p>
          งานวิจัย Harvard Study of Adult Development ซึ่งเป็นการศึกษาระยะยาวกว่า 80 ปี พบว่าคนที่มีความสัมพันธ์ที่ดีและใกล้ชิด
          มีสุขภาพกายและสุขภาพจิตที่ดีกว่า มีอายุยืนกว่า และมีความสุขมากกว่าคนที่โดดเดี่ยว การให้เวลากับคนสำคัญไม่เพียงแต่
          ทำให้เรามีความสุข แต่ยังเป็นการลงทุนในสุขภาพของตัวเราเองอีกด้วย
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">เคล็ดลับการจัดสรรเวลา</h3>
        <p>
          ผู้เชี่ยวชาญแนะนำให้จัดสรรเวลาอย่างมีจุดมุ่งหมาย เช่น กำหนด &quot;วันครอบครัว&quot; สัปดาห์ละครั้ง นัดเพื่อนสนิททานข้าว
          เดือนละครั้ง หรือตั้งกฎว่าจะไม่ใช้โทรศัพท์ระหว่างมื้ออาหาร การวางแผนเวลาสำหรับความสัมพันธ์เป็นสิ่งสำคัญเช่นเดียวกับ
          การวางแผนการเงินหรือการงาน เพราะความสัมพันธ์ที่ดีไม่ได้เกิดขึ้นเอง แต่ต้องอาศัยความตั้งใจและการทุ่มเทเวลา
        </p>
        <p>
          ลองใช้เครื่องมือนี้เป็นประจำทุกเดือนเพื่อติดตามพัฒนาการของตัวคุณเอง แล้วคุณจะเห็นว่าชีวิตมีคุณภาพดีขึ้นอย่างเห็นได้ชัด
        </p>
      </article>
    </div>
  );
}
