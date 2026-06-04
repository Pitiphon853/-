import React, { useState } from 'react';
import { Scale, Clock, CheckCircle2, AlertOctagon, Coffee, Battery, BatteryMedium, BatteryWarning, BatteryFull } from 'lucide-react';

export default function DecisionFatigue({ lang }: { lang: 'TH' | 'EN' }) {
  const [hoursAwake, setHoursAwake] = useState<number>(8);
  const [minorDecisions, setMinorDecisions] = useState<number>(20);
  const [majorDecisions, setMajorDecisions] = useState<number>(2);
  const [breaks, setBreaks] = useState<number>(1);

  const calculateFatigue = () => {
    const baseFatigue = (hoursAwake * 2) + (minorDecisions * 1) + (majorDecisions * 8);
    const recovery = breaks * 12;
    const net = Math.max(0, baseFatigue - recovery);
    return net;
  };

  const fatigueScore = calculateFatigue();

  const t = {
    title: lang === 'TH' ? 'ประเมินความเหนื่อยล้าจากการตัดสินใจ (Decision Fatigue)' : 'Decision Fatigue Estimator',
    hoursAwake: lang === 'TH' ? 'ตื่นมาแล้วกี่ชั่วโมง?' : 'Hours awake today',
    minorDecisions: lang === 'TH' ? 'การตัดสินใจย่อยๆ (เช่น กินอะไร ใส่ชุดไหน ตอบอีเมลทั่วไป)' : 'Minor decisions (e.g. meals, clothes, routine emails)',
    majorDecisions: lang === 'TH' ? 'การตัดสินใจสำคัญ (เช่น เรื่องเงิน การเจรจา วางกลยุทธ์)' : 'Major decisions (e.g. budget, strategy, negotiations)',
    breaks: lang === 'TH' ? 'จำนวนครั้งที่ได้พักเบรก (พักสมอง 15 นาทีขึ้นไป)' : 'Number of meaningful breaks (15+ mins)',
    resultTitle: lang === 'TH' ? 'ระดับพลังงานสมองของคุณ' : 'Your Mental Energy Level',
    score: lang === 'TH' ? 'คะแนนความล้า' : 'Fatigue Score',
    statusFresh: lang === 'TH' ? 'พลังเต็มเปี่ยม (Fresh)' : 'Fresh & Ready',
    statusMod: lang === 'TH' ? 'เริ่มล้าเล็กน้อย (Moderate)' : 'Moderate Fatigue',
    statusHigh: lang === 'TH' ? 'ล้ามาก (High Fatigue)' : 'High Fatigue',
    statusDepleted: lang === 'TH' ? 'หมดพลัง (Depleted)' : 'Depleted',
    advice: lang === 'TH' ? 'คำแนะนำ:' : 'Advice:',
    advFresh: lang === 'TH' ? 'สมองคุณยังพร้อมลุย! เหมาะสำหรับคิดเรื่องสำคัญๆ หรือวางแผนงานใหญ่' : 'Your brain is ready! Perfect time to tackle important decisions or complex planning.',
    advMod: lang === 'TH' ? 'สมองเริ่มใช้พลังงานไปพอสมควร ลองลุกไปดื่มน้ำ หรือยืดเส้นยืดสายสักพัก' : 'You have used some mental energy. Consider a quick stretch or hydration break.',
    advHigh: lang === 'TH' ? 'คุณตัดสินใจเรื่องต่างๆ มาเยอะมาก เลี่ยงการตัดสินใจเรื่องใหญ่ในตอนนี้ และควรหาเวลาพักด่วน' : 'You have made many decisions today. Avoid making major choices now and take a proper break.',
    advDepleted: lang === 'TH' ? 'พลังสมองหมดเกลี้ยง! อาการนี้อาจทำให้คุณตัดสินใจพลาดหรือเลือกทางที่ง่ายเกินไป (Default) หยุดพักผ่อนทันที' : 'Mental energy depleted! You are prone to poor choices or impulsive decisions. Stop and rest immediately.',
  };

  const getStatus = (s: number) => {
    if (s < 30) return { label: t.statusFresh, color: 'text-green-600', bg: 'bg-green-100', icon: BatteryFull, adv: t.advFresh };
    if (s <= 60) return { label: t.statusMod, color: 'text-yellow-600', bg: 'bg-yellow-100', icon: BatteryMedium, adv: t.advMod };
    if (s <= 90) return { label: t.statusHigh, color: 'text-orange-600', bg: 'bg-orange-100', icon: BatteryWarning, adv: t.advHigh };
    return { label: t.statusDepleted, color: 'text-red-600', bg: 'bg-red-100', icon: Battery, adv: t.advDepleted };
  };

  const status = getStatus(fatigueScore);
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-100">
          <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-teal-500" />
                {t.hoursAwake}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={hoursAwake}
                  onChange={(e) => setHoursAwake(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <span className="font-bold text-gray-700 w-8">{hoursAwake}h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-teal-500" />
                {t.minorDecisions}
              </label>
              <input
                type="number"
                min="0"
                value={minorDecisions}
                onChange={(e) => setMinorDecisions(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <AlertOctagon className="w-4 h-4 mr-2 text-teal-500" />
                {t.majorDecisions}
              </label>
              <input
                type="number"
                min="0"
                value={majorDecisions}
                onChange={(e) => setMajorDecisions(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Coffee className="w-4 h-4 mr-2 text-teal-500" />
                {t.breaks}
              </label>
              <input
                type="number"
                min="0"
                value={breaks}
                onChange={(e) => setBreaks(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.resultTitle}</h3>
            
            <StatusIcon className={`w-20 h-20 mb-4 ${status.color}`} />
            
            <div className={`px-6 py-2 rounded-full font-bold text-lg mb-4 ${status.bg} ${status.color}`}>
              {status.label}
            </div>
            
            <div className="text-gray-500 text-sm mb-6">
              {t.score}: <span className="font-bold text-gray-700">{fatigueScore}</span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full text-left">
              <span className="block text-sm font-bold text-gray-800 mb-2">{t.advice}</span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {status.adv}
              </p>
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="prose prose-teal max-w-none bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <Scale className="w-6 h-6 mr-3 text-teal-600" />
            Decision Fatigue: เมื่อสมองเหนื่อยล้าจากการตัดสินใจ
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            ในแต่ละวัน มนุษย์เราต้องตัดสินใจเรื่องต่างๆ มากมาย ตั้งแต่เรื่องเล็กน้อยอย่าง "เช้านี้จะกินอะไรดี" "จะใส่ชุดไหน" ไปจนถึงเรื่องใหญ่ระดับการงานหรือธุรกิจ งานวิจัยพบว่าเราตัดสินใจเรื่องต่างๆ เฉลี่ยถึงวันละ <strong>35,000 ครั้ง!</strong> และสิ่งนี้ก็นำมาซึ่งภาวะที่เรียกว่า <strong>Decision Fatigue หรือ ความเหนื่อยล้าจากการตัดสินใจ</strong>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">ทำไมคนเก่งๆ ถึงใส่เสื้อผ้าซ้ำๆ แบบเดิม?</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            คุณอาจเคยสังเกตว่าบุคคลระดับโลกอย่าง Steve Jobs ที่มักจะใส่เสื้อคอเต่าสีดำกางเกงยีนส์ หรือ Mark Zuckerberg ที่ใส่เสื้อยืดสีเทาเป็นประจำ นั่นไม่ใช่เพราะพวกเขาไม่มีสไตล์ แต่เป็นกลยุทธ์ในการ <strong>"สงวนพลังงานสมอง"</strong> พวกเขาลดการตัดสินใจเรื่องเล็กๆ น้อยๆ เพื่อเก็บโควต้าพลังงานสมองไว้ใช้กับเรื่องที่สำคัญจริงๆ ในการบริหารบริษัท
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">อาการที่บ่งบอกว่าคุณกำลังเผชิญ Decision Fatigue</h3>
          <ul className="space-y-4 text-gray-600 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-teal-500 font-bold">1.</span>
              <div>
                <strong>ทางลัดสู่ความมักง่าย (Trade-offs avoidance):</strong> สมองเริ่มขี้เกียจเปรียบเทียบข้อดีข้อเสีย และมักจะเลือกตัวเลือกที่ง่ายที่สุด หรือตัวเลือกที่เป็นค่าเริ่มต้น (Default) แม้มันจะไม่ใช่ตัวเลือกที่ดีที่สุดก็ตาม
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-teal-500 font-bold">2.</span>
              <div>
                <strong>การผัดวันประกันพรุ่ง (Procrastination):</strong> "เดี๋ยวค่อยคิดแล้วกัน" เมื่อสมองล้า คุณจะหลีกเลี่ยงการตัดสินใจและผลัดเรื่องนั้นออกไปก่อน
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-teal-500 font-bold">3.</span>
              <div>
                <strong>ตามใจตัวเองมากขึ้น (Impulsive choices):</strong> ความสามารถในการควบคุมตัวเอง (Willpower) จะลดลง ทำให้เรามีแนวโน้มจะซื้อของไร้สาระ หรือกินอาหารขยะในช่วงเย็นของวัน
              </div>
            </li>
          </ul>

          <div className="bg-teal-50 p-6 rounded-xl my-8 border border-teal-100">
            <h3 className="text-lg font-bold text-teal-800 mb-4">วิธีรับมือและลด Decision Fatigue</h3>
            <ul className="space-y-2 text-teal-700">
              <li>• <strong>ทำเรื่องสำคัญตอนเช้า:</strong> ตัดสินใจเรื่องใหญ่ๆ ในตอนที่สมองยังสดชื่นที่สุด (Eat that frog!)</li>
              <li>• <strong>สร้างกิจวัตร (Routine):</strong> กำหนดเมนูอาหารล่วงหน้า เตรียมชุดไว้ตั้งแต่เมื่อคืน เพื่อลดจำนวนการตัดสินใจในแต่ละวัน</li>
              <li>• <strong>จำกัดตัวเลือก:</strong> ยิ่งมีตัวเลือกเยอะยิ่งเหนื่อย (Paradox of Choice) พยายามคัดกรองให้เหลือแค่ 2-3 ตัวเลือกก่อนตัดสินใจ</li>
              <li>• <strong>กินให้อิ่ม:</strong> ระดับน้ำตาลในเลือดมีผลต่อ Willpower การทานของว่างที่มีประโยชน์ช่วยฟื้นฟูพลังสมองได้</li>
            </ul>
          </div>

          <p className="text-gray-600 leading-relaxed mt-6">
            ลองใช้เครื่องมือประเมินด้านบนเพื่อเช็คระดับพลังงานสมองของคุณ หากคะแนนความเหนื่อยล้าอยู่ในระดับสูง อย่าฝืนตัดสินใจเรื่องสำคัญ ให้ลุกไปเดินเล่น ดื่มน้ำ หรือนอนพักสักงีบ แล้วคุณจะพบว่าสมองที่ได้ชาร์จพลัง จะช่วยให้คุณตัดสินใจได้เฉียบคมขึ้นอย่างน่าทึ่ง!
          </p>
        </article>
      )}
    </div>
  );
}
