import React, { useState } from 'react';
import { Clock, Calendar, Target, Award, Brain, Info } from 'lucide-react';

export default function TenThousandHours({ lang = 'TH' }: any) {
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [currentHours, setCurrentHours] = useState<number>(0);

  const t = {
    title: lang === 'TH' ? '10,000 ชั่วโมง ชำนาญเมื่อไหร่' : '10,000 Hours Mastery Calculator',
    desc: lang === 'TH' 
      ? 'คำนวณระยะเวลาที่คุณจะไปถึง 10,000 ชั่วโมง เพื่อเป็นผู้เชี่ยวชาญในทักษะใดทักษะหนึ่ง' 
      : 'Calculate the time required to reach 10,000 hours of deliberate practice.',
    hoursPerDayLabel: lang === 'TH' ? 'ชั่วโมงฝึกฝนต่อวัน' : 'Hours per day',
    daysPerWeekLabel: lang === 'TH' ? 'วันฝึกฝนต่อสัปดาห์' : 'Days per week',
    currentHoursLabel: lang === 'TH' ? 'ชั่วโมงที่ฝึกมาแล้ว (ถ้ามี)' : 'Current hours practiced',
    target: lang === 'TH' ? 'เป้าหมาย' : 'Target',
    remainingHours: lang === 'TH' ? 'ชั่วโมงที่เหลือ' : 'Remaining Hours',
    estimatedTime: lang === 'TH' ? 'ระยะเวลาที่คาดว่าจะใช้' : 'Estimated Time',
    years: lang === 'TH' ? 'ปี' : 'Years',
    months: lang === 'TH' ? 'เดือน' : 'Months',
    days: lang === 'TH' ? 'วัน' : 'Days',
    congrats: lang === 'TH' ? 'ยินดีด้วย! คุณสะสมครบ 10,000 ชั่วโมงแล้ว' : 'Congratulations! You have reached 10,000 hours.',
    keepGoing: lang === 'TH' ? 'หนทางสู่ความเชี่ยวชาญรอคุณอยู่!' : 'The path to mastery awaits!',
    articleTitle: lang === 'TH' ? 'ทฤษฎี 10,000 ชั่วโมง: หนทางสู่ความเชี่ยวชาญระดับโลก' : 'The 10,000-Hour Rule: The Path to World-Class Mastery'
  };

  const targetHours = 10000;
  const safeCurrentHours = isNaN(currentHours) || currentHours < 0 ? 0 : currentHours;
  const remainingHours = Math.max(0, targetHours - safeCurrentHours);
  
  const safeHoursPerDay = isNaN(hoursPerDay) || hoursPerDay <= 0 ? 0 : hoursPerDay;
  const safeDaysPerWeek = isNaN(daysPerWeek) || daysPerWeek <= 0 ? 0 : Math.min(7, daysPerWeek);
  
  const hoursPerWeek = safeHoursPerDay * safeDaysPerWeek;
  
  let years = 0;
  let months = 0;
  let days = 0;

  if (hoursPerWeek > 0 && remainingHours > 0) {
    const totalDaysNeeded = (remainingHours / hoursPerWeek) * 7;
    years = Math.floor(totalDaysNeeded / 365.25);
    months = Math.floor((totalDaysNeeded % 365.25) / 30.44);
    days = Math.floor((totalDaysNeeded % 365.25) % 30.44);
  }

  const progressPercentage = Math.min(100, (safeCurrentHours / targetHours) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full mb-2">
          <Clock className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" />
            ข้อมูลการฝึกฝน
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.hoursPerDayLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={hoursPerDay || ''}
                  onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.daysPerWeekLabel} (สูงสุด 7)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={daysPerWeek || ''}
                  onChange={(e) => setDaysPerWeek(parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentHoursLabel}</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={currentHours === 0 ? '' : currentHours}
                  onChange={(e) => setCurrentHours(parseFloat(e.target.value))}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                />
                <Award className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-500" />
            ผลลัพธ์
          </h2>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">ความคืบหน้า</span>
                <span className="text-sm font-bold text-indigo-600">{progressPercentage.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                สะสมแล้ว {safeCurrentHours.toLocaleString()} / 10,000 ชั่วโมง
              </p>
            </div>

            {remainingHours === 0 ? (
              <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center space-y-3">
                <Award className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold text-green-800">{t.congrats}</h3>
                <p className="text-green-600">คุณอยู่ในระดับปรมาจารย์แล้ว!</p>
              </div>
            ) : hoursPerWeek > 0 ? (
              <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-indigo-600 font-medium mb-1">{t.estimatedTime}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    {years > 0 && <span className="text-3xl font-black text-indigo-900">{years} <span className="text-lg font-medium text-indigo-700">{t.years}</span></span>}
                    {months > 0 && <span className="text-3xl font-black text-indigo-900">{months} <span className="text-lg font-medium text-indigo-700">{t.months}</span></span>}
                    {years === 0 && months === 0 && days > 0 && <span className="text-3xl font-black text-indigo-900">{days} <span className="text-lg font-medium text-indigo-700">{t.days}</span></span>}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-indigo-200 flex justify-between items-center text-sm text-indigo-800">
                  <span>{t.remainingHours}:</span>
                  <span className="font-bold text-lg">{remainingHours.toLocaleString()} ชม.</span>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 text-center">
                <Info className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-orange-800">โปรดระบุชั่วโมงและวันฝึกฝนต่อสัปดาห์ เพื่อคำนวณระยะเวลา</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8 text-gray-700 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.articleTitle}</h2>
        
        <p>
          คุณเคยสงสัยไหมว่า อะไรทำให้คนบางคนกลายเป็นผู้เชี่ยวชาญระดับโลกในสายอาชีพของพวกเขา? ไม่ว่าจะเป็นนักดนตรีคลาสสิก นักกีฬาโอลิมปิก หรือโปรแกรมเมอร์ที่เก่งกาจ ทฤษฎีหนึ่งที่ได้รับความนิยมอย่างมากในการอธิบายความสำเร็จเหล่านี้คือ <strong>"กฎ 10,000 ชั่วโมง" (The 10,000-Hour Rule)</strong> ซึ่งถูกทำให้โด่งดังโดย Malcolm Gladwell ในหนังสือที่ชื่อว่า <em>Outliers: The Story of Success</em>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">กฎ 10,000 ชั่วโมง คืออะไร?</h3>
        <p>
          กฎ 10,000 ชั่วโมง ระบุว่า การจะเป็นผู้เชี่ยวชาญระดับปรมาจารย์ (Mastery) ในทักษะใดทักษะหนึ่ง คุณจำเป็นต้องใช้เวลาในการ <strong>"ฝึกฝนอย่างมีเป้าหมาย" (Deliberate Practice)</strong> เป็นเวลาประมาณ 10,000 ชั่วโมง Gladwell ได้อ้างอิงงานวิจัยของนักจิตวิทยา Anders Ericsson ที่ศึกษาพัฒนาการของนักไวโอลินในสถาบันดนตรี ซึ่งพบว่าความแตกต่างระหว่างนักดนตรีระดับ "ดี" กับ "ระดับโลก" คือจำนวนชั่วโมงที่พวกเขาใช้ในการฝึกซ้อมอย่างตั้งใจ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">ต้องใช้เวลานานแค่ไหนกว่าจะถึง 10,000 ชั่วโมง?</h3>
        <p>
          หากเราลองนำตัวเลข 10,000 ชั่วโมงมาหารเฉลี่ยเป็นรายวัน เราจะเห็นภาพที่ชัดเจนขึ้น:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>หากคุณฝึกฝน <strong>8 ชั่วโมงต่อวัน</strong> (5 วันต่อสัปดาห์): คุณจะใช้เวลาประมาณ <strong>5 ปี</strong></li>
          <li>หากคุณฝึกฝน <strong>4 ชั่วโมงต่อวัน</strong> (5 วันต่อสัปดาห์): คุณจะใช้เวลาประมาณ <strong>10 ปี</strong></li>
          <li>หากคุณฝึกฝน <strong>2 ชั่วโมงต่อวัน</strong> (5 วันต่อสัปดาห์): คุณจะใช้เวลาประมาณ <strong>20 ปี</strong></li>
        </ul>
        <p>
          จากตัวเลขเหล่านี้ จะเห็นได้ว่าความเชี่ยวชาญไม่ใช่สิ่งที่เกิดขึ้นชั่วข้ามคืน แต่ต้องอาศัยความสม่ำเสมอและความพยายามอย่างยาวนาน เครื่องมือคำนวณด้านบนจึงถูกสร้างขึ้นเพื่อช่วยให้คุณเห็นภาพระยะเวลาที่คุณต้องใช้ตามเป้าหมายและความถี่ที่คุณสะดวก
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">ไม่ใช่แค่เรื่องของ "เวลา" แต่คือ "คุณภาพ"</h3>
        <p>
          สิ่งสำคัญที่หลายคนมักเข้าใจผิดเกี่ยวกับกฎ 10,000 ชั่วโมง คือการคิดว่าแค่ทำสิ่งเดิมๆ ซ้ำๆ ให้ครบ 10,000 ชั่วโมงก็จะเก่งขึ้น ซึ่งในความเป็นจริง Anders Ericsson ผู้เป็นต้นขั้วของงานวิจัยนี้ ได้เน้นย้ำถึงคำว่า <strong>"Deliberate Practice"</strong> หรือ <strong>การฝึกฝนอย่างมีเจตนา</strong>
        </p>
        <p>
          Deliberate Practice หมายถึง การฝึกฝนที่ผลักดันขีดจำกัดของตัวเองอยู่เสมอ มีการตั้งเป้าหมายย่อยที่ชัดเจน ได้รับฟีดแบ็กหรือคำติชมที่รวดเร็วเพื่อนำมาแก้ไขจุดบกพร่อง และต้องใช้สมาธิอย่างสูงในการทำความเข้าใจจุดที่ตัวเองยังทำได้ไม่ดี การตีกอล์ฟเล่นๆ กับเพื่อนทุกวันหยุด แม้จะทำครบ 10,000 ชั่วโมง ก็ไม่สามารถทำให้คุณเป็น Tiger Woods ได้ หากไม่มีการจ้างโค้ชมาช่วยวิเคราะห์วงสวิงและแก้ไขจุดอ่อนของคุณ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">เราทุกคนต้องทำถึง 10,000 ชั่วโมงหรือไม่?</h3>
        <p>
          ทฤษฎีนี้มักถูกนำมาอ้างอิงเพื่อสร้างแรงบันดาลใจ แต่อย่าลืมว่าเป้าหมายของทุกคนไม่จำเป็นต้องเป็นการเป็น "ที่สุดของโลก" (World-Class) ในโลกแห่งความเป็นจริง การใช้เวลาเพียง 20 ชั่วโมงในการเริ่มฝึกทักษะใหม่ๆ อย่างจริงจังตามกฎ <em>The First 20 Hours</em> ของ Josh Kaufman ก็เพียงพอแล้วที่จะทำให้คุณทำสิ่งนั้นได้ในระดับ "ดีพอใช้" (Good Enough) เช่น การเล่นกีตาร์เป็นเพลง หรือการพูดภาษาใหม่เบื้องต้น
        </p>
        <p>
          อย่างไรก็ตาม หากคุณมีเป้าหมายที่ยิ่งใหญ่ และต้องการก้าวขึ้นเป็นระดับท็อป 1% ของสายอาชีพ เครื่องมือคำนวณ 10,000 ชั่วโมงนี้ จะเป็นตัวช่วยเตือนใจว่า <strong>"ความสำเร็จที่ยิ่งใหญ่ ต้องอาศัยเวลาและความมุ่งมั่นอย่างยาวนานเสมอ"</strong> เริ่มต้นตั้งแต่วันนี้ สะสมชั่วโมงบินของคุณอย่างมีคุณภาพ แล้ววันหนึ่งคุณจะไปถึงจุดนั้นอย่างแน่นอน!
        </p>
      </div>
    </div>
  );
}
