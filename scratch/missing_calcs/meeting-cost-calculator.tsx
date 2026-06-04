import React, { useState, useEffect } from 'react';
import { Presentation, Users, Clock, Banknote, Calculator, Lightbulb, AlertTriangle } from 'lucide-react';

export default function MeetingCostCalculator({ lang = 'TH' }: any) {
  const [attendees, setAttendees] = useState<number>(5);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [avgSalary, setAvgSalary] = useState<number>(40000);
  const [meetingsPerMonth, setMeetingsPerMonth] = useState<number>(4);

  // Time is running in the background for dramatic effect during meeting
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const t = {
    title: lang === 'TH' ? 'ต้นทุนการประชุม (Meeting Cost)' : 'Meeting Cost Calculator',
    desc: lang === 'TH' 
      ? 'เวลาคือเงินทอง มาดูกันว่าการประชุมหนึ่งครั้ง บริษัทต้องจ่ายเงินไปเท่าไหร่' 
      : 'Time is money. Discover the hidden cost of your meetings based on attendees\' salaries.',
    attendeesLabel: lang === 'TH' ? 'จำนวนผู้เข้าร่วมประชุม (คน)' : 'Number of Attendees',
    durationLabel: lang === 'TH' ? 'ระยะเวลา (นาที)' : 'Duration (Minutes)',
    salaryLabel: lang === 'TH' ? 'เงินเดือนเฉลี่ย/คน (บาท)' : 'Average Monthly Salary (THB)',
    frequencyLabel: lang === 'TH' ? 'ประชุมแบบนี้กี่ครั้ง/เดือน' : 'How many times per month?',
    costPerMeeting: lang === 'TH' ? 'ต้นทุนต่อการประชุม 1 ครั้ง' : 'Cost per Meeting',
    costPerYear: lang === 'TH' ? 'ต้นทุนรวมต่อปี' : 'Total Annual Cost',
    realtimeCost: lang === 'TH' ? 'จำลองเงินที่ไหลออกขณะประชุม' : 'Real-time Cost Simulator',
    start: lang === 'TH' ? 'เริ่มจับเวลา' : 'Start',
    stop: lang === 'TH' ? 'หยุด' : 'Stop',
    reset: lang === 'TH' ? 'รีเซ็ต' : 'Reset',
    currency: lang === 'TH' ? 'บาท' : 'THB',
    articleTitle: lang === 'TH' ? 'ต้นทุนแฝงของการประชุม: ทำไมการประชุมที่ไร้ประสิทธิภาพถึงทำลายองค์กร?' : 'The Hidden Cost of Meetings: Why Inefficient Meetings Ruin Companies'
  };

  const safeAttendees = isNaN(attendees) || attendees < 0 ? 0 : attendees;
  const safeDuration = isNaN(durationMinutes) || durationMinutes < 0 ? 0 : durationMinutes;
  const safeSalary = isNaN(avgSalary) || avgSalary < 0 ? 0 : avgSalary;
  const safeFrequency = isNaN(meetingsPerMonth) || meetingsPerMonth < 0 ? 0 : meetingsPerMonth;

  // Assume 22 working days per month, 8 hours per day = 176 hours/month = 10560 minutes/month
  const workMinutesPerMonth = 22 * 8 * 60;
  
  const costPerMinutePerPerson = safeSalary / workMinutesPerMonth;
  const costPerMinuteTotal = costPerMinutePerPerson * safeAttendees;
  
  const totalCost = costPerMinuteTotal * safeDuration;
  const annualCost = totalCost * safeFrequency * 12;

  const currentBurn = costPerMinuteTotal * (elapsedSeconds / 60);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-2">
          <Banknote className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-500" />
            ข้อมูลการประชุม
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.attendeesLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  value={attendees || ''}
                  onChange={(e) => setAttendees(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.durationLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={durationMinutes || ''}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.salaryLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={avgSalary || ''}
                  onChange={(e) => setAvgSalary(parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Banknote className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.frequencyLabel}</label>
              <input
                type="number"
                min="1"
                value={meetingsPerMonth || ''}
                onChange={(e) => setMeetingsPerMonth(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t.costPerMeeting}</h2>
            
            <div className="text-center">
              <div className="text-5xl font-black text-red-600 mb-2">
                {totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})} <span className="text-2xl text-red-400">{t.currency}</span>
              </div>
              <p className="text-sm text-gray-500">
                หรือนาทีละ {costPerMinuteTotal.toFixed(2)} บาท
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600 font-medium mb-2">{t.costPerYear}</p>
              <div className="text-3xl font-bold text-gray-900">
                {annualCost.toLocaleString(undefined, {maximumFractionDigits: 0})} <span className="text-lg text-gray-500">{t.currency}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                {t.realtimeCost}
              </h2>
            </div>
            
            <div className="text-center py-4">
              <div className="text-5xl font-mono text-green-400 font-bold mb-4">
                ฿{currentBurn.toFixed(2)}
              </div>
              <div className="text-sm text-slate-400 mb-6 font-mono">
                {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
              </div>
              
              <div className="flex justify-center gap-3">
                {!isRunning ? (
                  <button 
                    onClick={() => setIsRunning(true)}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                  >
                    {t.start}
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsRunning(false)}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                  >
                    {t.stop}
                  </button>
                )}
                <button 
                  onClick={() => { setIsRunning(false); setElapsedSeconds(0); }}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
                >
                  {t.reset}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 text-gray-700 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.articleTitle}</h2>
        
        <p>
          "เวลาคือเงินคือทอง" (Time is money) เป็นวลีที่ทุกคนคุ้นเคยดี แต่เมื่อพูดถึง <strong>"การประชุม" (Meeting)</strong> ในที่ทำงาน หลายองค์กรกลับลืมหลักการนี้ไปอย่างสิ้นเชิง เรามักจะนัดประชุมกันอย่างง่ายดาย ดึงคนจำนวนมากเข้ามาในห้อง (หรือใน Zoom) โดยไม่ตระหนักเลยว่า นั่นคือการละลายงบประมาณของบริษัททิ้งไปวินาทีต่อวินาที
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">ทำไมการประชุมถึงมีราคาแพงกว่าที่คุณคิด?</h3>
        <p>
          ลองจินตนาการดูว่า หากคุณเชิญผู้จัดการและพนักงานอาวุโสจำนวน 10 คน ที่มีเงินเดือนเฉลี่ยคนละ 50,000 บาท เข้ามานั่งฟังการอัปเดตสเตตัสงานเป็นเวลา 1 ชั่วโมง ต้นทุนที่แท้จริงของการประชุมครั้งนั้น ไม่ใช่แค่ค่าไฟหรือค่ากาแฟ แต่คือ <strong>"ค่าแรง"</strong> ของพนักงานทั้ง 10 คน ซึ่งหากคำนวณออกมา การประชุม 1 ชั่วโมงครั้งนั้นอาจมีต้นทุนสูงถึงเกือบ 3,000 บาท!
        </p>
        <p>
          และนั่นคือแค่การประชุมครั้งเดียว หากเป็นการประชุมประจำสัปดาห์ (Weekly Meeting) เมื่อคูณ 52 สัปดาห์ บริษัทอาจต้องสูญเสียเงินนับแสนบาทต่อปี ไปกับการประชุมเพียงหัวข้อเดียว ยิ่งไปกว่านั้น ยังไม่รวม <strong>Opportunity Cost (ต้นทุนค่าเสียโอกาส)</strong> ที่พนักงานกลุ่มนั้นถูกดึงเวลาไปจากการทำงานที่สร้างมูลค่า (Productive Work) จริงๆ
        </p>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 my-6">
          <h4 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5" />
            3 กฎทองแดงเพื่อการประชุมที่มีประสิทธิภาพ
          </h4>
          <ul className="list-decimal pl-5 space-y-3 text-amber-800">
            <li>
              <strong>กฎพิซซ่า 2 ถาดของ Jeff Bezos (Two-Pizza Rule):</strong> หากการประชุมมีคนเยอะเกินกว่าที่จะกินพิซซ่า 2 ถาดอิ่ม (ประมาณไม่เกิน 8 คน) แปลว่าการประชุมนั้นมีคนมากเกินไป คนยิ่งเยอะ ยิ่งตัดสินใจยาก
            </li>
            <li>
              <strong>ลดเวลาพื้นฐานจาก 60 เหลือ 45 นาที:</strong> ตามกฎของพาร์กินสัน (Parkinson's Law) "งานจะขยายตัวออกจนเต็มเวลาที่กำหนดไว้" หากคุณตั้งเวลาประชุม 1 ชั่วโมง มันก็จะใช้เวลา 1 ชั่วโมง ลองลดเวลาลงเหลือ 45 หรือ 30 นาที คุณจะพบว่าทุกคนคุยกันเข้าประเด็นเร็วขึ้น
            </li>
            <li>
              <strong>ไม่มี Agenda ห้ามจัดประชุม (No Agenda, No Meeting):</strong> ทุกการประชุมต้องมีเป้าหมายที่ชัดเจน และต้องส่งหัวข้อให้ผู้เข้าร่วมทราบล่วงหน้าเสมอ หากเป็นเพียงการอัปเดตข้อมูลทางเดียว ให้ใช้วิธีส่งอีเมล หรือส่งข้อความผ่านแชทบริษัทแทน
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">เมื่อไหร่ที่ควรจัดประชุม?</h3>
        <p>
          เราไม่ได้บอกว่าการประชุมเป็นสิ่งเลวร้าย การประชุมที่ดียังคงเป็นกลไกสำคัญในการขับเคลื่อนองค์กร แต่ควรจำกัดไว้สำหรับสถานการณ์เหล่านี้เท่านั้น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>การระดมสมอง (Brainstorming)</strong> ที่ต้องการความคิดสร้างสรรค์แบบเรียลไทม์</li>
          <li><strong>การแก้ปัญหาที่ซับซ้อน (Complex Problem Solving)</strong> ที่หากพิมพ์คุยกันอาจเกิดความเข้าใจผิด</li>
          <li><strong>การตัดสินใจระดับนโยบาย (Critical Decision Making)</strong> ที่ต้องอาศัยการถกเถียงและโหวตเสียงจากหลายฝ่าย</li>
          <li><strong>การกระชับความสัมพันธ์ (Team Building)</strong> เพื่อสร้างกำลังใจ หรือฉลองความสำเร็จ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">เริ่มต้นเปลี่ยนแปลงวัฒนธรรมองค์กร</h3>
        <p>
          เครื่องมือ <strong>"คำนวณต้นทุนการประชุม"</strong> ด้านบน ถูกสร้างขึ้นเพื่อให้หัวหน้างานและผู้บริหารได้ตระหนักถึงมูลค่าของเวลา ก่อนที่จะกดส่ง Meeting Invite ครั้งต่อไป ลองถามตัวเองดูว่า <em>"ผู้เข้าร่วมคนนี้จำเป็นต้องอยู่ตลอดการประชุมไหม?"</em> หรือ <em>"เราสามารถสรุปเรื่องนี้ภายใน 15 นาทีแทนที่จะเป็น 30 นาทีได้หรือไม่?"</em>
        </p>
        <p>
          การปกป้องเวลาของทีม ก็คือการปกป้องต้นทุนและความสามารถในการแข่งขันของบริษัทนั่นเอง
        </p>
      </div>
    </div>
  );
}
