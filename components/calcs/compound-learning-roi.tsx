import React, { useState } from 'react';
import { BookOpen, TrendingUp, Calendar, Zap, Lightbulb } from 'lucide-react';

export default function CompoundLearning({ lang = 'TH' }: any) {
  const [dailyImprovement, setDailyImprovement] = useState<number>(1);
  const [days, setDays] = useState<number>(365);

  const t = {
    title: lang === 'TH' ? 'Compound Learning ความรู้ทบต้น' : 'Compound Learning ROI',
    desc: lang === 'TH' 
      ? 'คำนวณพลังของการพัฒนาตัวเองเพียงเล็กน้อยในทุกๆ วัน ตามหลักการดอกเบี้ยทบต้น' 
      : 'Calculate the power of small daily improvements using compound interest principles.',
    improvementLabel: lang === 'TH' ? 'พัฒนาขึ้นวันละ (%)' : 'Daily Improvement (%)',
    daysLabel: lang === 'TH' ? 'ระยะเวลา (วัน)' : 'Duration (Days)',
    resultTitle: lang === 'TH' ? 'ผลลัพธ์การเติบโต' : 'Growth Result',
    multiplier: lang === 'TH' ? 'เท่า' : 'x',
    worseTitle: lang === 'TH' ? 'แย่ลงวันละ' : 'Daily Decline',
    worseMultiplier: lang === 'TH' ? 'เหลือเพียง' : 'Reduces to',
    articleTitle: lang === 'TH' ? 'Compound Learning: ทำไมเก่งขึ้นวันละ 1% ถึงเปลี่ยนชีวิตคุณได้' : 'Compound Learning: Why 1% Better Every Day Changes Your Life'
  };

  const safeImprovement = isNaN(dailyImprovement) ? 0 : dailyImprovement;
  const safeDays = isNaN(days) || days < 0 ? 0 : days;

  // Formula: (1 + rate)^days
  const improvementRate = safeImprovement / 100;
  const growthMultiplier = Math.pow(1 + improvementRate, safeDays);
  
  // Calculate decline for contrast (e.g. -1%)
  const declineMultiplier = Math.pow(1 - improvementRate, safeDays);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-2">
          <BookOpen className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            ตั้งค่าการเติบโต
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.improvementLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={dailyImprovement === 0 ? '' : dailyImprovement}
                  onChange={(e) => setDailyImprovement(parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                />
                <TrendingUp className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.daysLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={days === 0 ? '' : days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                />
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setDays(30)} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">30 วัน</button>
                <button onClick={() => setDays(180)} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">ครึ่งปี</button>
                <button onClick={() => setDays(365)} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">1 ปี</button>
                <button onClick={() => setDays(1825)} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">5 ปี</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-blue-500" />
            {t.resultTitle}
          </h2>

          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-center">
              <p className="text-sm text-blue-600 font-medium mb-2">เมื่อผ่านไป {safeDays} วัน คุณจะเก่งขึ้นถึง</p>
              <div className="text-5xl font-black text-blue-700 mb-2">
                {growthMultiplier >= 1000 ? growthMultiplier.toLocaleString(undefined, {maximumFractionDigits: 0}) : growthMultiplier.toFixed(2)} <span className="text-2xl text-blue-500">{t.multiplier}</span>
              </div>
              <p className="text-xs text-blue-500 bg-blue-100 inline-block px-3 py-1 rounded-full">
                สูตร: (1 + {safeImprovement/100})^{safeDays}
              </p>
            </div>

            <div className="p-6 bg-red-50 rounded-xl border border-red-100 text-center">
              <p className="text-sm text-red-600 font-medium mb-2">ในทางกลับกัน หาก{t.worseTitle} {safeImprovement}%</p>
              <div className="text-3xl font-bold text-red-700 mb-1">
                {t.worseMultiplier} {declineMultiplier.toFixed(4)} <span className="text-xl text-red-500">{t.multiplier}</span>
              </div>
              <p className="text-xs text-red-500">
                สูตร: (1 - {safeImprovement/100})^{safeDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 text-gray-700 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.articleTitle}</h2>
        
        <p>
          คุณเคยได้ยินประโยคที่ว่า <em>"ให้พัฒนาตัวเองวันละ 1% แล้วใน 1 ปี คุณจะเก่งขึ้นถึง 37 เท่า"</em> หรือไม่? ประโยคนี้โด่งดังมากจากหนังสือยอดฮิตอย่าง <strong>Atomic Habits</strong> ของ James Clear ซึ่งได้อธิบายถึงพลังของการเปลี่ยนแปลงเล็กๆ น้อยๆ ที่สะสมพอกพูนตามกาลเวลา แนวคิดนี้มักถูกเรียกว่า <strong>Compound Learning</strong> หรือการเรียนรู้แบบทบต้น
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">กฎของดอกเบี้ยทบต้น (Compound Interest) สู่การเรียนรู้</h3>
        <p>
          อัลเบิร์ต ไอน์สไตน์ เคยกล่าวไว้ว่า "ดอกเบี้ยทบต้นคือสิ่งมหัศจรรย์อันดับ 8 ของโลก" ในโลกของการเงิน หากคุณลงทุนและได้ผลตอบแทนทบต้น เงินของคุณจะเติบโตแบบก้าวกระโดด (Exponential Growth) เช่นเดียวกัน ในโลกของการพัฒนาตัวเอง <strong>ความรู้ ทักษะ และนิสัยของเราก็ทำงานแบบทบต้นเช่นกัน</strong>
        </p>
        <p>
          หากคุณสามารถเก่งขึ้นได้เพียง 1% ทุกวันติดต่อกันเป็นเวลา 365 วัน (1 ปี) สมการคณิตศาสตร์ <code>(1.01)^365</code> จะบอกเราว่าผลลัพธ์สุดท้ายจะเท่ากับ <strong>37.78 เท่า</strong> หมายความว่าเมื่อสิ้นปี คุณจะเป็นคนเก่งขึ้นกว่าวันแรกเกือบ 38 เท่า!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-6">
          <p className="font-semibold text-blue-900">ตัวอย่างของ 1% ในชีวิตประจำวัน:</p>
          <ul className="list-disc pl-5 mt-2 text-blue-800 space-y-1">
            <li>อ่านหนังสือเพิ่มขึ้นวันละ 2 หน้า</li>
            <li>เรียนคำศัพท์ใหม่วันละ 3 คำ</li>
            <li>ฝึกซ้อมทักษะใหม่ๆ วันละ 15 นาที</li>
            <li>ทบทวนโค้ด หรือบทเรียนที่เรียนไปวันนี้</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">หลุมพรางของการพยายามทำสิ่งที่ยิ่งใหญ่ในรวดเดียว</h3>
        <p>
          ปัญหาของคนส่วนใหญ่คือ มักจะตั้งเป้าหมายใหญ่โตและคาดหวังผลลัพธ์ที่รวดเร็ว เช่น อยากลดน้ำหนัก 10 กิโลกรัมใน 1 เดือน หรืออยากพูดภาษาใหม่ให้คล่องภายในไม่กี่สัปดาห์ เมื่อทำไม่ได้ตามหวังก็จะท้อแท้และเลิกล้มไป 
        </p>
        <p>
          James Clear ชี้ให้เห็นว่า การเปลี่ยนแปลงที่ยิ่งใหญ่ไม่ได้เกิดจากการทำสิ่งยิ่งใหญ่เพียงครั้งเดียว แต่เกิดจาก <strong>"นิสัยเล็กๆ" (Atomic Habits)</strong> ที่ทำซ้ำๆ อย่างสม่ำเสมอ การตั้งเป้าแค่ "เก่งขึ้นวันละ 1%" ทำให้สมองไม่รู้สึกต่อต้าน เพราะมันเป็นเรื่องง่ายที่ใครๆ ก็ทำได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">ระวังการถดถอยแบบทบต้น</h3>
        <p>
          เหรียญมีสองด้านเสมอ เครื่องมือคำนวณด้านบนได้แสดงให้เห็นถึงผลลัพธ์ของการ <em>"แย่ลงวันละ 1%"</em> เช่นกัน หากคุณปล่อยปละละเลย กินอาหารขยะ เลื่อนงานไปเรื่อยๆ หรือไม่ยอมเรียนรู้อะไรใหม่ๆ วันละ 1% เมื่อเวลาผ่านไป 1 ปี ความสามารถหรือคุณภาพชีวิตของคุณจะลดลงเหลือเพียง <strong>0.03</strong> (แทบจะเหลือศูนย์) 
        </p>
        <p>
          เวลาคือดาบสองคม มันจะขยายผลสิ่งที่คุณทำอยู่เสมอ ไม่ว่าสิ่งนั้นจะเป็นนิสัยที่ดีหรือนิสัยที่แย่ก็ตาม หากคุณมีนิสัยที่ดี เวลาคือเพื่อนที่แสนดีของคุณ แต่หากคุณมีนิสัยที่แย่ เวลาจะเป็นศัตรูตัวฉกาจ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">เริ่มต้นสะสมความรู้แบบทบต้นตั้งแต่วันนี้</h3>
        <p>
          Warren Buffett มหาเศรษฐีนักลงทุนผู้ยิ่งใหญ่ อ่านหนังสือวันละ 500 หน้า เขาเคยกล่าวว่า <em>"อ่านหนังสือวันละ 500 หน้าทุกวัน นั่นคือวิธีที่ความรู้ทำงาน มันจะก่อตัวขึ้นเหมือนดอกเบี้ยทบต้น"</em>
        </p>
        <p>
          คุณไม่จำเป็นต้องเริ่มด้วย 500 หน้า แค่หาเพียง <strong>1%</strong> ของคุณในวันนี้ให้เจอ ถามตัวเองง่ายๆ ในทุกๆ เช้าว่า <strong>"วันนี้ฉันจะทำให้ตัวเองดีกว่าเมื่อวาน 1% ได้อย่างไร?"</strong> แล้วปล่อยให้ความสม่ำเสมอและพลังของกฎทบต้นทำงานที่เหลือแทนคุณ
        </p>
      </div>
    </div>
  );
}
