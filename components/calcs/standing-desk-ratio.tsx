import React, { useState } from 'react';
import { Timer, ArrowRight, Flame, Clock, CalendarDays } from 'lucide-react';

export default function StandingDeskRatio({ lang = 'EN' }: any) {
  const isTH = lang === 'TH';

  const [workHours, setWorkHours] = useState<number>(8);
  const [ratio, setRatio] = useState<string>('3:1'); // Sit:Stand

  const ratios: Record<string, { sitPart: number; standPart: number, descTH: string, descEN: string }> = {
    '1:0': { sitPart: 1, standPart: 0, descTH: 'นั่งตลอดเวลา (ไม่แนะนำ)', descEN: 'Sit all day (Not recommended)' },
    '4:1': { sitPart: 4, standPart: 1, descTH: 'ระดับเริ่มต้น (นั่ง 45 นาที / ยืน 15 นาที)', descEN: 'Beginner (Sit 45m / Stand 15m)' },
    '3:1': { sitPart: 3, standPart: 1, descTH: 'ระดับทั่วไป (นั่ง 45 นาที / ยืน 15 นาที) หรือ (นั่ง 1.5 ชม. / ยืน 30 นาที)', descEN: 'Standard (Sit 45m / Stand 15m)' },
    '2:1': { sitPart: 2, standPart: 1, descTH: 'ระดับปานกลาง (นั่ง 40 นาที / ยืน 20 นาที)', descEN: 'Moderate (Sit 40m / Stand 20m)' },
    '1:1': { sitPart: 1, standPart: 1, descTH: 'ระดับสูง (นั่ง 30 นาที / ยืน 30 นาที)', descEN: 'Advanced (Sit 30m / Stand 30m)' },
  };

  const currentRatio = ratios[ratio];
  const totalParts = currentRatio.sitPart + currentRatio.standPart;
  
  // Total Daily Times in Hours
  const totalSitHours = totalParts === 0 ? workHours : (currentRatio.sitPart / totalParts) * workHours;
  const totalStandHours = totalParts === 0 ? 0 : (currentRatio.standPart / totalParts) * workHours;

  // Per Hour Breakdown in Minutes
  const sitMinsPerHour = totalParts === 0 ? 60 : Math.round((currentRatio.sitPart / totalParts) * 60);
  const standMinsPerHour = totalParts === 0 ? 0 : Math.round((currentRatio.standPart / totalParts) * 60);

  // Extra calories: Standing burns approx 8 kcal more per hour than sitting
  const extraKcal = totalStandHours * 8;

  // Format hours and mins
  const formatTime = (hoursFloat: number) => {
    const h = Math.floor(hoursFloat);
    const m = Math.round((hoursFloat - h) * 60);
    if (h > 0 && m > 0) return `${h} ${isTH ? 'ชม.' : 'hr'} ${m} ${isTH ? 'นาที' : 'min'}`;
    if (h > 0) return `${h} ${isTH ? 'ชม.' : 'hr'}`;
    return `${m} ${isTH ? 'นาที' : 'min'}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Timer className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณสัดส่วนการยืนทำงาน (Standing Desk Ratio)' : 'Standing Desk Time Ratio Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ชั่วโมงทำงานต่อวัน (ชั่วโมง)' : 'Working Hours per Day'}
            </label>
            <input
              type="number"
              min="1"
              max="24"
              step="0.5"
              value={workHours}
              onChange={(e) => setWorkHours(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'เลือกสัดส่วน นั่ง : ยืน' : 'Select Ratio (Sit : Stand)'}
            </label>
            <div className="space-y-2">
              {Object.keys(ratios).map((r) => (
                <label 
                  key={r} 
                  className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                    ratio === r ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="ratio"
                    value={r}
                    checked={ratio === r}
                    onChange={(e) => setRatio(e.target.value)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 mr-3"
                  />
                  <div>
                    <span className="font-medium text-gray-800 mr-2">{r}</span>
                    <span className="text-sm text-gray-500">
                      - {isTH ? ratios[r].descTH : ratios[r].descEN}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <CalendarDays className="w-5 h-5 mr-2 text-purple-600" />
              {isTH ? 'แผนการทำงานต่อวัน' : 'Daily Work Plan'}
            </h3>

            <div className="flex items-center justify-between mb-4">
              <div className="w-5/12 text-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{isTH ? 'เวลานั่งรวม' : 'Total Sitting'}</div>
                <div className="text-xl font-bold text-gray-800">{formatTime(totalSitHours)}</div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300" />
              <div className="w-5/12 text-center bg-purple-100 p-4 rounded-xl shadow-sm border border-purple-200">
                <div className="text-sm text-purple-700 mb-1">{isTH ? 'เวลายืนรวม' : 'Total Standing'}</div>
                <div className="text-xl font-bold text-purple-900">{formatTime(totalStandHours)}</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              {isTH ? 'เป้าหมายรายชั่วโมง' : 'Hourly Goal'}
            </h3>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex border border-gray-200 h-12">
              <div 
                className="bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 transition-all duration-500"
                style={{ width: `${(sitMinsPerHour/60)*100}%` }}
              >
                {sitMinsPerHour > 0 ? `${isTH ? 'นั่ง' : 'Sit'} ${sitMinsPerHour} ${isTH ? 'นาที' : 'm'}` : ''}
              </div>
              <div 
                className="bg-purple-500 flex items-center justify-center text-sm font-medium text-white transition-all duration-500"
                style={{ width: `${(standMinsPerHour/60)*100}%` }}
              >
                {standMinsPerHour > 0 ? `${isTH ? 'ยืน' : 'Stand'} ${standMinsPerHour} ${isTH ? 'นาที' : 'm'}` : ''}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start">
            <Flame className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-orange-900 mb-1">
                {isTH ? 'เผาผลาญแคลอรีเพิ่มขึ้น' : 'Extra Calories Burned'}
              </div>
              <div className="text-orange-800 text-sm">
                {isTH 
                  ? `การยืนทำงานช่วยเผาผลาญพลังงานเพิ่มขึ้นประมาณ ${Math.round(extraKcal)} กิโลแคลอรีต่อวัน (เมื่อเทียบกับการนั่งเฉยๆ)` 
                  : `Standing burns approximately ${Math.round(extraKcal)} extra kcal per day (compared to just sitting).`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl">
        {isTH ? (
          <article className="prose prose-purple max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">สัดส่วนการยืนทำงาน (Standing Desk Ratio) ที่ดีเพื่อสุขภาพ</h2>
            <p>
              ในยุคปัจจุบันที่ผู้คนใช้เวลาส่วนใหญ่นั่งทำงานหน้าคอมพิวเตอร์ การนั่งนานเกินไป (Prolonged Sitting) ได้กลายเป็นปัจจัยเสี่ยงต่อสุขภาพที่ถูกขนานนามว่า "Sitting is the new smoking" การใช้<strong>โต๊ะปรับระดับได้ (Standing Desk)</strong> จึงได้รับความนิยมอย่างมากเพื่อช่วยแก้ปัญหานี้ อย่างไรก็ตาม การยืนทำงานนานเกินไปก็ไม่ใช่เรื่องดีเช่นกัน ดังนั้นการหาสัดส่วนที่พอเหมาะระหว่าง "การนั่ง" และ "การยืน" จึงเป็นกุญแจสำคัญ
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมถึงไม่ควรนั่งตลอดเวลา?</h3>
            <p>
              การนั่งติดเก้าอี้เป็นเวลาหลายชั่วโมงติดต่อกัน ทำให้ระบบการเผาผลาญในร่างกายทำงานช้าลง ระดับน้ำตาลในเลือดเพิ่มสูงขึ้น และเพิ่มความเสี่ยงต่อโรคอ้วน โรคหัวใจ รวมถึงอาการปวดหลังคอและบ่า (ออฟฟิศซินโดรม) การลุกขึ้นยืนหรือขยับร่างกายเป็นระยะจะช่วยกระตุ้นการไหลเวียนเลือดและลดแรงกดทับที่กระดูกสันหลัง
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">สัดส่วน นั่ง:ยืน ที่เหมาะสม (Sit to Stand Ratio)</h3>
            <p>
              ไม่มีกฎตายตัวว่าต้องยืนนานเท่าไหร่ถึงจะดีที่สุด แต่ผู้เชี่ยวชาญด้านการยศาสตร์และสุขภาพมักแนะนำให้เริ่มจากสัดส่วนที่ทำได้ง่ายก่อน แล้วค่อยๆ ปรับเพิ่มขึ้น:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>สัดส่วน 4:1 หรือ 3:1 (ระดับเริ่มต้น-ทั่วไป):</strong> นั่งประมาณ 45 นาที และยืน 15 นาที ใน 1 ชั่วโมง สัดส่วนนี้เหมาะสำหรับผู้ที่เพิ่งเริ่มใช้โต๊ะปรับระดับ ร่างกายจะไม่รู้สึกล้าจนเกินไป
              </li>
              <li>
                <strong>สัดส่วน 2:1 (ระดับปานกลาง):</strong> นั่ง 40 นาที ยืน 20 นาที หรือ นั่ง 2 ชั่วโมง ยืน 1 ชั่วโมง
              </li>
              <li>
                <strong>สัดส่วน 1:1 (ระดับสูง):</strong> นั่ง 30 นาที ยืน 30 นาที สลับกันไปตลอดวัน เหมาะสำหรับคนที่ร่างกายคุ้นชินกับการยืนแล้ว
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">การเผาผลาญแคลอรี (Calories Burned)</h3>
            <p>
              แม้การยืนจะไม่ได้เผาผลาญพลังงานเทียบเท่ากับการออกกำลังกาย แต่การยืนเฉยๆ สามารถเผาผลาญแคลอรีได้มากกว่าการนั่งประมาณ 8 กิโลแคลอรีต่อชั่วโมง หากคุณเปลี่ยนจากการนั่งมายืนทำงานวันละ 3-4 ชั่วโมง จะสามารถเผาผลาญแคลอรีเพิ่มขึ้นได้ประมาณ 25-35 กิโลแคลอรีต่อวัน ซึ่งเมื่อสะสมไปเรื่อยๆ เป็นปี ก็สามารถช่วยป้องกันน้ำหนักตัวเพิ่มขึ้นจากวัยทำงานได้
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">ข้อควรระวังในการยืนทำงาน</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>อย่ายืนนานเกินไป:</strong> การยืนอยู่กับที่นานๆ เกิน 1-2 ชั่วโมง อาจทำให้เลือดไปคั่งที่ขา เกิดเส้นเลือดขอด และทำให้ปวดส้นเท้าหรือข้อเข่าได้</li>
              <li><strong>ใส่รองเท้าที่สบาย:</strong> หากต้องยืนทำงาน ควรใส่รองเท้าที่รองรับส้นเท้า หรือใช้แผ่นรองยืนต้านความเมื่อยล้า (Anti-fatigue mat) เพื่อลดแรงกดทับที่ฝ่าเท้า</li>
              <li><strong>ปรับระดับโต๊ะให้พอดี:</strong> เมื่อปรับโต๊ะขึ้นยืน ความสูงของโต๊ะควรอยู่ในระดับข้อศอกพอดี เพื่อให้ไหล่ไม่ยกและไม่ก้มหลัง</li>
            </ul>
            <p className="mt-4">
              หัวใจสำคัญของการมีสุขภาพดีในที่ทำงานคือ <strong>การเคลื่อนไหว</strong> ไม่ใช่แค่การเปลี่ยนจากนั่งเป็นยืน แต่การหมั่นสลับอิริยาบถ ลุกเดินไปดื่มน้ำ หรือยืดเส้นยืดสายบ้าง คือวิธีที่ดีที่สุดในการปกป้องร่างกายจากออฟฟิศซินโดรม
            </p>
          </article>
        ) : (
          <article className="prose prose-purple max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finding the Ideal Standing Desk Ratio</h2>
            <p>
              "Sitting is the new smoking." Prolonged sitting has been linked to numerous health issues, including obesity, high blood pressure, and cardiovascular disease. To combat this, standing desks have become a staple in modern offices. However, standing all day comes with its own set of problems, such as joint pain and varicose veins. The key is to find the right balance—a healthy Sit-to-Stand ratio.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Recommended Sit-to-Stand Ratios</h3>
            <p>
              Experts generally recommend varying your posture throughout the day. Here are common ratios used to transition into healthier habits:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>3:1 or 4:1 (Beginner/Standard):</strong> Sit for 45 minutes, stand for 15 minutes per hour. This is a great starting point if you are new to standing desks. It prevents fatigue while still offering the benefits of breaking up static sitting.</li>
              <li><strong>2:1 (Moderate):</strong> Sit for 40 minutes, stand for 20 minutes per hour.</li>
              <li><strong>1:1 (Advanced):</strong> Sit for 30 minutes, stand for 30 minutes. This provides an even split but requires good stamina and a proper anti-fatigue mat.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Calories Burned Standing vs. Sitting</h3>
            <p>
              While standing isn't a replacement for exercise, it does burn slightly more calories than sitting. On average, standing burns about 8 more kilocalories (kcal) per hour than sitting. Standing for an extra 3 hours a day could help you burn an additional 24 kcal per day, which adds up over a year to help mitigate weight gain.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Tips for Using a Standing Desk</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Don't stand still:</strong> Shift your weight often, do light calf stretches, or use a balance board. Movement is more important than posture alone.</li>
              <li><strong>Use an anti-fatigue mat:</strong> Standing on a hard floor can cause foot and lower back pain. A cushioned mat makes a significant difference.</li>
              <li><strong>Check your ergonomics:</strong> When standing, your desk should be at elbow height so your forearms rest parallel to the floor, and your monitor should still be at eye level.</li>
            </ul>
            <p className="mt-4">
              Remember, the best posture is your <em>next</em> posture. Use this calculator to plan your workday and make sure you are changing positions regularly.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
