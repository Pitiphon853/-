import React, { useState } from 'react';
import { Moon, Sun, Clock, Coffee, Thermometer, BatteryCharging, AlertCircle } from 'lucide-react';

export default function CircadianRhythm({ lang }: { lang: 'TH' | 'EN' }) {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake');
  const [time, setTime] = useState<string>('07:00');

  const t = {
    title: lang === 'TH' ? 'คำนวณเวลานอน (วัฏจักรการนอนหลับ)' : 'Sleep Cycle Calculator',
    wakeMode: lang === 'TH' ? 'ฉันต้องการตื่นนอนเวลา...' : 'I want to wake up at...',
    sleepMode: lang === 'TH' ? 'ฉันจะเข้านอนเวลา...' : 'I am going to bed at...',
    timeLabel: lang === 'TH' ? 'เลือกเวลา' : 'Select Time',
    calculate: lang === 'TH' ? 'คำนวณเวลานอน' : 'Calculate',
    resultWake: lang === 'TH' ? 'คุณควรเข้านอนเวลา:' : 'You should go to bed at:',
    resultSleep: lang === 'TH' ? 'คุณควรตื่นนอนเวลา:' : 'You should wake up at:',
    cycles: lang === 'TH' ? 'รอบ (Cycles)' : 'cycles',
    hours: lang === 'TH' ? 'ชั่วโมง' : 'hours',
    recommended: lang === 'TH' ? 'แนะนำ' : 'Recommended',
    fallAsleepText: lang === 'TH' ? '*คำนวณเผื่อเวลาในการเคลิ้มหลับ 15 นาทีแล้ว' : '*Includes 15 minutes to fall asleep.',
  };

  // Convert "HH:MM" to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  // Convert minutes since midnight to "HH:MM AM/PM"
  const minutesToTime = (mins: number) => {
    let m = Math.floor(mins);
    while (m < 0) m += 24 * 60;
    m = m % (24 * 60);
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')} ${ampm}`;
  };

  const getResults = () => {
    const baseMins = timeToMinutes(time);
    const results = [];
    
    // We want 3, 4, 5, 6 cycles
    const cycleMins = 90;
    const fallAsleepMins = 15;

    for (let c = 6; c >= 3; c--) {
      let targetMins = 0;
      let totalSleepMins = c * cycleMins;
      
      if (mode === 'wake') {
        // Bedtime = Wake - (Cycles * 90) - 15
        targetMins = baseMins - totalSleepMins - fallAsleepMins;
      } else {
        // Waketime = Bedtime + 15 + (Cycles * 90)
        targetMins = baseMins + fallAsleepMins + totalSleepMins;
      }

      results.push({
        cycles: c,
        time: minutesToTime(targetMins),
        sleepTimeStr: `${(totalSleepMins / 60).toFixed(1)} ${t.hours}`,
        isRecommended: c === 5 || c === 6 // 7.5h or 9h is recommended
      });
    }

    if (mode === 'sleep') {
      results.reverse();
    }

    return results;
  };

  const results = getResults();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Moon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => setMode('wake')}
            className={`flex-1 py-4 px-6 rounded-xl font-medium text-lg transition-all flex items-center justify-center space-x-2 border-2 ${
              mode === 'wake' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span>{t.wakeMode}</span>
          </button>
          <button
            onClick={() => setMode('sleep')}
            className={`flex-1 py-4 px-6 rounded-xl font-medium text-lg transition-all flex items-center justify-center space-x-2 border-2 ${
              mode === 'sleep' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span>{t.sleepMode}</span>
          </button>
        </div>

        <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-2xl text-center mb-8">
          <label className="block text-gray-700 font-medium mb-4 flex justify-center items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-500" />
            {t.timeLabel}
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="text-4xl text-center font-bold text-gray-800 bg-transparent border-b-2 border-indigo-300 focus:border-indigo-500 outline-none pb-2 w-48"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {mode === 'wake' ? t.resultWake : t.resultSleep}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((res, i) => (
              <div 
                key={i} 
                className={`relative p-5 rounded-xl border-2 transition-all text-center flex flex-col justify-center h-32 ${
                  res.isRecommended 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md transform hover:-translate-y-1' 
                    : 'border-gray-100 bg-white hover:border-indigo-200'
                }`}
              >
                {res.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                    {t.recommended}
                  </div>
                )}
                <div className={`text-2xl font-bold mb-1 ${res.isRecommended ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {res.time}
                </div>
                <div className="text-sm text-gray-500">
                  {res.cycles} {t.cycles} ({res.sleepTimeStr})
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {t.fallAsleepText}
          </p>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <BatteryCharging className="w-6 h-6 mr-3 text-indigo-500" />
            เคล็ดลับตื่นมาสดชื่น ด้วยความเข้าใจเรื่องวัฏจักรการนอนหลับ (Sleep Cycle)
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            คุณเคยสงสัยไหมว่า ทำไมบางคืนเรานอนไปตั้ง 8-9 ชั่วโมง แต่ตื่นมากลับรู้สึกงัวเงีย อ่อนเพลีย ไม่สดชื่นเอาเสียเลย? ในขณะที่บางวันนอนแค่ 6 ชั่วโมงกลับตื่นมาเต็มอิ่มและมีพลังงานล้นเหลือ คำตอบของเรื่องนี้ซ่อนอยู่ในสิ่งที่เรียกว่า <strong>"วัฏจักรการนอนหลับ" (Sleep Cycle)</strong> และนาฬิกาชีวภาพของร่างกาย
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">นาฬิกาชีวภาพ (Circadian Rhythm) คืออะไร?</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Circadian Rhythm หรือนาฬิกาชีวภาพ คือระบบการทำงานของร่างกายที่มีรอบเวลาประมาณ 24 ชั่วโมง ควบคุมการตื่นและการนอนหลับของเรา โดยจะตอบสนองต่อแสงสว่างและความมืดในสิ่งแวดล้อมเป็นหลัก เมื่อแสงสว่างลดลง ร่างกายจะหลั่งฮอร์โมนเมลาโทนินเพื่อทำให้เรารู้สึกง่วง และเมื่อแสงอาทิตย์ยามเช้าสาดส่อง ร่างกายก็จะหยุดหลั่งเมลาโทนินเพื่อให้เราตื่นตัว
          </p>

          <div className="bg-indigo-50 p-6 rounded-xl my-8 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-800 mb-4">กฎ 90 นาทีแห่งการนอนหลับ</h3>
            <p className="text-indigo-700 leading-relaxed">
              การนอนหลับของมนุษย์ไม่ได้ราบเรียบเป็นเส้นตรง แต่จะแบ่งเป็นรอบ (Cycle) โดย 1 รอบใช้เวลาเฉลี่ย <strong>90 นาที</strong> ซึ่งประกอบด้วย 4 ระยะ:
              <br /><br />
              1. NREM 1: เคลิ้มหลับ (หลับตื้นสุดๆ) <br />
              2. NREM 2: หลับตื้น (อุณหภูมิร่างกายลดลง หัวใจเต้นช้าลง)<br />
              3. NREM 3: หลับลึก (ร่างกายซ่อมแซมส่วนที่สึกหรอ ปลุกตื่นยากที่สุด)<br />
              4. REM (Rapid Eye Movement): ช่วงฝัน (สมองจัดการความทรงจำและการเรียนรู้)
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">ทำไมตื่นมาแล้วถึงงัวเงีย (Sleep Inertia)?</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            อาการงัวเงีย (Sleep Inertia) มักเกิดจากการที่เราถูกปลุกให้ตื่นใน <strong>ช่วงหลับลึก (NREM 3)</strong> ร่างกายและสมองยังอยู่ในโหมดพักผ่อนขั้นสุด เมื่อถูกกระชากให้ตื่นทันที จึงทำให้รู้สึกมึนงงและอ่อนเพลีย 
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            ดังนั้น เคล็ดลับของการตื่นมาให้สดชื่นที่สุด คือการตั้งนาฬิกาปลุกให้ตรงกับ <strong>"รอยต่อระหว่างรอบ" (จบช่วง REM และกำลังจะเริ่มรอบใหม่)</strong> ซึ่งร่างกายจะอยู่ในสภาวะหลับตื้นที่สุด นั่นคือเหตุผลที่เราควรนอนให้หารด้วย 90 นาทีลงตัว เช่น 4.5 ชั่วโมง, 6 ชั่วโมง, 7.5 ชั่วโมง หรือ 9 ชั่วโมง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">เคล็ดลับเพิ่มเติมเพื่อการนอนหลับที่ดีเยี่ยม</h3>
          <ul className="space-y-4 text-gray-600 mb-6">
            <li className="flex items-start">
              <Thermometer className="w-5 h-5 mr-3 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>ควบคุมอุณหภูมิห้อง:</strong> อุณหภูมิที่เหมาะสมที่สุดสำหรับการนอนหลับคือประมาณ 22-24 องศาเซลเซียส ร่างกายจะหลับได้ดีเมื่ออุณหภูมิแกนกลางเย็นลงเล็กน้อย
              </div>
            </li>
            <li className="flex items-start">
              <Sun className="w-5 h-5 mr-3 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>จัดการแสงสว่าง:</strong> ปิดไฟให้มืดสนิท เลี่ยงการใช้มือถือหรือหน้าจอคอมพิวเตอร์อย่างน้อย 1 ชั่วโมงก่อนนอน เพื่อไม่ให้แสงสีฟ้าไปรบกวนเมลาโทนิน
              </div>
            </li>
            <li className="flex items-start">
              <Coffee className="w-5 h-5 mr-3 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>งดคาเฟอีนช่วงบ่าย:</strong> ฤทธิ์ของคาเฟอีนสามารถตกค้างในร่างกายได้นาน 6-8 ชั่วโมง จึงควรหลีกเลี่ยงการดื่มกาแฟหรือชาหลังเวลา 14:00 น.
              </div>
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-8 bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
            <strong>บทสรุป:</strong> โปรแกรมคำนวณเวลานอนด้านบน ได้บวกเวลาเผื่อสำหรับการเคลิ้มหลับ (เฉลี่ย 15 นาที) ไว้ให้แล้ว เพียงคุณระบุเวลาที่ต้องการตื่นหรือเวลาที่จะเข้านอน ระบบจะคำนวณเวลาที่ดีที่สุดตามหลักวัฏจักร 90 นาที เพื่อช่วยให้คุณตื่นมารับเช้าวันใหม่ด้วยความสดใสและพร้อมลุยทุกสถานการณ์!
          </p>
        </article>
      )}
    </div>
  );
}
