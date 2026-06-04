import React, { useState } from 'react';
import { SmartphoneOff, Clock, Calendar, AlertCircle, Heart } from 'lucide-react';

export default function DigitalDetoxTime({ lang }: any) {
  const isTH = lang === 'th';
  
  const [currentHours, setCurrentHours] = useState<number>(6);
  const [currentMinutes, setCurrentMinutes] = useState<number>(0);
  const [goalHours, setGoalHours] = useState<number>(2);
  const [goalMinutes, setGoalMinutes] = useState<number>(0);

  const calculateDetox = () => {
    const currentTotalMins = (currentHours || 0) * 60 + (currentMinutes || 0);
    const goalTotalMins = (goalHours || 0) * 60 + (goalMinutes || 0);
    
    const savedMinsPerDay = Math.max(0, currentTotalMins - goalTotalMins);
    const savedMinsPerWeek = savedMinsPerDay * 7;
    const savedMinsPerYear = savedMinsPerDay * 365;
    
    const daysSavedPerYear = (savedMinsPerYear / (24 * 60)).toFixed(1);
    
    return {
      savedMinsPerDay,
      savedMinsPerWeek,
      savedMinsPerYear,
      daysSavedPerYear
    };
  };

  const results = calculateDetox();

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (isTH) {
      return `${h > 0 ? `${h} ชม. ` : ''}${m > 0 ? `${m} นาที` : ''}` || '0 นาที';
    }
    return `${h > 0 ? `${h} hr ` : ''}${m > 0 ? `${m} min` : ''}` || '0 min';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <SmartphoneOff size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณเวลา Digital Detox' : 'Digital Detox Time Calculator'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {isTH ? 'เวลาที่ใช้อยู่หน้าจอต่อวัน (ปัจจุบัน)' : 'Current Screen Time (Per Day)'}
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={currentHours}
                      onChange={(e) => setCurrentHours(Number(e.target.value))}
                      className="w-full px-4 py-2 outline-none"
                      placeholder="0"
                    />
                    <span className="px-4 text-gray-500 bg-gray-50 border-l border-gray-300">
                      {isTH ? 'ชม.' : 'hr'}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={currentMinutes}
                      onChange={(e) => setCurrentMinutes(Number(e.target.value))}
                      className="w-full px-4 py-2 outline-none"
                      placeholder="0"
                    />
                    <span className="px-4 text-gray-500 bg-gray-50 border-l border-gray-300">
                      {isTH ? 'นาที' : 'min'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <label className="block text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                {isTH ? 'เป้าหมายที่ต้องการลดเหลือ (ต่อวัน)' : 'Goal Screen Time (Per Day)'}
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-blue-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={goalHours}
                      onChange={(e) => setGoalHours(Number(e.target.value))}
                      className="w-full px-4 py-2 outline-none"
                      placeholder="0"
                    />
                    <span className="px-4 text-gray-500 bg-gray-50 border-l border-blue-200">
                      {isTH ? 'ชม.' : 'hr'}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-blue-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={goalMinutes}
                      onChange={(e) => setGoalMinutes(Number(e.target.value))}
                      className="w-full px-4 py-2 outline-none"
                      placeholder="0"
                    />
                    <span className="px-4 text-gray-500 bg-gray-50 border-l border-blue-200">
                      {isTH ? 'นาที' : 'min'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calendar size={120} />
            </div>
            
            <h3 className="text-xl font-medium mb-6 opacity-90 relative z-10">
              {isTH ? 'เวลาที่คุณจะได้คืนมา' : 'Time You Will Get Back'}
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-blue-400/30 pb-4">
                <span className="text-blue-100">{isTH ? 'ต่อวัน' : 'Per Day'}</span>
                <span className="text-2xl font-bold">{formatTime(results.savedMinsPerDay)}</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-blue-400/30 pb-4">
                <span className="text-blue-100">{isTH ? 'ต่อสัปดาห์' : 'Per Week'}</span>
                <span className="text-2xl font-bold">{formatTime(results.savedMinsPerWeek)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-100">{isTH ? 'ใน 1 ปี คุณจะมีเวลาเพิ่ม' : 'In 1 Year, you gain'}</span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-yellow-300">
                    {results.daysSavedPerYear} {isTH ? 'วัน' : 'Days'}
                  </div>
                  <div className="text-sm opacity-80 mt-1">
                    ({formatTime(results.savedMinsPerYear)})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {results.savedMinsPerDay > 0 && (
          <div className="mt-8 bg-green-50 text-green-800 p-4 rounded-lg flex items-start border border-green-200">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base">
              {isTH 
                ? `ยอดเยี่ยม! คุณจะได้เวลาคืนมาถึง ${results.daysSavedPerYear} วันต่อปี เอาเวลานี้ไปอ่านหนังสือ ออกกำลังกาย หรือใช้เวลากับครอบครัวได้เลย!` 
                : `Awesome! You will gain ${results.daysSavedPerYear} days per year. You can use this time to read, exercise, or spend time with family!`}
            </p>
          </div>
        )}
      </div>

      {isTH && (
        <article className="prose prose-blue max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Detox คืออะไร? ทำไมเราถึงควรให้ความสำคัญ</h2>
          <p>
            ในยุคปัจจุบันที่เราแทบจะเชื่อมต่อกับโลกออนไลน์ตลอด 24 ชั่วโมง การใช้เวลาอยู่หน้าจอมือถือ แท็บเล็ต หรือคอมพิวเตอร์ (Screen Time) จึงเพิ่มสูงขึ้นอย่างที่ไม่เคยมีมาก่อน <strong>Digital Detox (ดิจิทัล ดีท็อกซ์)</strong> หรือการบำบัดการเสพติดสื่อดิจิทัล จึงกลายมาเป็นเทรนด์สุขภาพที่สำคัญมาก เพราะมันคือการเว้นระยะห่างจากการใช้อุปกรณ์อิเล็กทรอนิกส์และอินเทอร์เน็ต เพื่อฟื้นฟูสุขภาพกายและสุขภาพจิตของเราให้กลับมาสมดุลอีกครั้ง
          </p>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">สัญญาณเตือนว่าคุณควรเริ่มทำ Digital Detox</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>รู้สึกกระวนกระวายหรือหงุดหงิดเมื่อไม่ได้จับมือถือหรือไม่มีสัญญาณอินเทอร์เน็ต</li>
            <li>มีอาการปวดตา ตามัว หรือปวดคอบ่าไหล่ (Office Syndrome) จากการก้มมองจอ</li>
            <li>นอนหลับยากขึ้น หรือตื่นมาแล้วรู้สึกไม่สดชื่น เพราะแสงสีฟ้าจากจอทำลายฮอร์โมนเมลาโทนิน</li>
            <li>สมาธิสั้นลง ไม่สามารถจดจ่อกับการทำงานหรือการอ่านหนังสือได้นานเหมือนเมื่อก่อน</li>
            <li>รู้สึกเปรียบเทียบตัวเองกับคนอื่นในโซเชียลมีเดียจนเกิดความเครียดหรือซึมเศร้า</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ประโยชน์ของการลด Screen Time</h3>
          <p>
            การนำเวลาที่เคยสูญเสียไปกับการไถฟีดโซเชียลมีเดียกลับคืนมา จะทำให้ชีวิตของคุณเปลี่ยนไปในทิศทางที่ดีขึ้นอย่างเหลือเชื่อ หากคุณลดการเล่นมือถือลงได้เพียงวันละ 2 ชั่วโมง ใน 1 ปีคุณจะได้เวลาชีวิตกลับคืนมาถึง <strong>30 วัน หรือ 1 เดือนเต็มๆ!</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>สุขภาพจิตดีขึ้น:</strong> ลดความวิตกกังวล ความเครียด และอาการซึมเศร้าที่เกิดจากการเสพข่าวสารและโซเชียลมีเดียมากเกินไป</li>
            <li><strong>เพิ่ม Productivity:</strong> สมาธิในการทำงานดีขึ้น ทำงานเสร็จเร็วขึ้น และมีเวลาโฟกัสกับเป้าหมายที่แท้จริง</li>
            <li><strong>ความสัมพันธ์ดีขึ้น:</strong> มีเวลาใส่ใจและพูดคุยกับคนรอบข้างในโลกความจริงมากขึ้น ไม่ใช่เพียงการกดไลก์ในโลกออนไลน์</li>
            <li><strong>คุณภาพการนอนหลับยอดเยี่ยม:</strong> การงดใช้หน้าจออย่างน้อย 1-2 ชั่วโมงก่อนนอน ช่วยให้สมองผ่อนคลายและหลับสนิทขึ้น</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">วิธีเริ่มต้นทำ Digital Detox ง่ายๆ สำหรับผู้เริ่มต้น</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>กำหนดเขตปลอดหน้าจอ (Tech-Free Zones):</strong> เช่น ห้องนอน ห้องน้ำ หรือโต๊ะอาหาร ห้ามนำมือถือเข้าไปใช้งานเด็ดขาด</li>
            <li><strong>ตั้งเวลาใช้งานแอปพลิเคชัน (App Limits):</strong> ใช้ฟีเจอร์ Screen Time ในมือถือเพื่อจำกัดเวลาเล่นแอปโซเชียลมีเดีย</li>
            <li><strong>ปิดการแจ้งเตือน (Turn off Notifications):</strong> ปิดการแจ้งเตือนที่ไม่จำเป็น เพื่อลดการถูกรบกวนสมาธิระหว่างวัน</li>
            <li><strong>หาพฤติกรรมทดแทน:</strong> เมื่อรู้สึกอยากจับมือถือ ให้เปลี่ยนไปอ่านหนังสือกระดาษ จัดโต๊ะทำงาน ดื่มน้ำ หรือเดินยืดเส้นยืดสายแทน</li>
            <li><strong>ลองปิดมือถือ 1 วันเต็มช่วงวันหยุด:</strong> ลองเริ่มต้นจากการออฟไลน์ 24 ชั่วโมงในวันอาทิตย์ แล้วคุณจะพบว่าโลกออฟไลน์มีอะไรให้ทำอีกมากมาย</li>
          </ol>
          
          <p>
            การทำ Digital Detox ไม่ได้แปลว่าคุณต้องเลิกใช้เทคโนโลยีไปเลย แต่คือการเรียนรู้ที่จะ <strong>"ควบคุม"</strong> การใช้งาน ไม่ให้เทคโนโลยีมาเป็นฝ่ายควบคุมชีวิตของเรา เริ่มต้นคำนวณเวลาที่คุณสูญเสียไปในแต่ละวัน แล้วตั้งเป้าหมายที่จะทวงคืนเวลาอันมีค่าของคุณกลับมาตั้งแต่วันนี้!
          </p>
        </article>
      )}
    </div>
  );
}
