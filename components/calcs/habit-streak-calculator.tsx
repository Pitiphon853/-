import React, { useState } from 'react';
import { Target, Flame, CalendarDays, TrendingUp, Trophy } from 'lucide-react';

export default function HabitStreakCalculator({ lang }: any) {
  const isTH = lang === 'th';
  
  const [streak, setStreak] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<number>(66);

  const calculateProgress = () => {
    const validStreak = Math.max(0, streak);
    const progressPercent = Math.min(100, Math.round((validStreak / difficulty) * 100));
    const daysLeft = Math.max(0, difficulty - validStreak);
    
    let message = '';
    let status = '';
    
    if (progressPercent < 20) {
      status = 'beginner';
      message = isTH ? 'จุดเริ่มต้นที่ยากที่สุด คุณทำได้!' : 'The hardest part is starting. Keep going!';
    } else if (progressPercent < 50) {
      status = 'developing';
      message = isTH ? 'ร่างกายเริ่มชินแล้ว อย่าเพิ่งยอมแพ้' : 'You are getting used to it. Don\'t give up!';
    } else if (progressPercent < 80) {
      status = 'forming';
      message = isTH ? 'มาเกินครึ่งทางแล้ว นิสัยนี้กำลังจะกลายเป็นส่วนหนึ่งของคุณ' : 'Over halfway there! This is becoming part of you.';
    } else if (progressPercent < 100) {
      status = 'solidifying';
      message = isTH ? 'อีกนิดเดียวเท่านั้น นิสัยนี้ฝังรากลึกแล้ว' : 'Almost there! The habit is deeply rooted now.';
    } else {
      status = 'mastered';
      message = isTH ? 'ยินดีด้วย! คุณสร้างนิสัยใหม่สำเร็จแล้ว' : 'Congratulations! You have successfully built the habit.';
    }

    return { progressPercent, daysLeft, message, status };
  };

  const result = calculateProgress();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <Flame size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณระยะเวลาสร้างนิสัย (Habit Streak)' : 'Habit Streak Calculator'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                {isTH ? 'จำนวนวันที่ทำต่อเนื่อง (Streak ปัจจุบัน)' : 'Current Streak (Days)'}
              </label>
              <input
                type="number"
                min="0"
                value={streak}
                onChange={(e) => setStreak(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 bg-white text-xl font-bold text-center"
              />
            </div>

            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
              <label className="block text-sm font-semibold text-orange-900 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                {isTH ? 'ระดับความยากของนิสัยใหม่' : 'Habit Difficulty Level'}
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors bg-white hover:bg-orange-100/50 border-gray-200">
                  <input
                    type="radio"
                    name="difficulty"
                    value={21}
                    checked={difficulty === 21}
                    onChange={() => setDifficulty(21)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="ml-3 font-medium text-gray-700">
                    {isTH ? 'ง่าย (ดื่มน้ำ, เก็บที่นอน)' : 'Easy (Drink water, Make bed)'}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">21 {isTH ? 'วัน' : 'days'}</span>
                </label>
                
                <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors bg-white hover:bg-orange-100/50 border-orange-300 ring-1 ring-orange-200">
                  <input
                    type="radio"
                    name="difficulty"
                    value={66}
                    checked={difficulty === 66}
                    onChange={() => setDifficulty(66)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="ml-3 font-medium text-gray-700">
                    {isTH ? 'ปานกลาง (ออกกำลังกาย, อ่านหนังสือ)' : 'Medium (Exercise, Reading)'}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">66 {isTH ? 'วัน' : 'days'}</span>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors bg-white hover:bg-orange-100/50 border-gray-200">
                  <input
                    type="radio"
                    name="difficulty"
                    value={254}
                    checked={difficulty === 254}
                    onChange={() => setDifficulty(254)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="ml-3 font-medium text-gray-700">
                    {isTH ? 'ยากมาก (เลิกบุหรี่, เปลี่ยนชีวิต)' : 'Hard (Quit smoking, Life change)'}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">254 {isTH ? 'วัน' : 'days'}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-gradient-to-br from-red-600 to-orange-500 text-white rounded-xl p-6 sm:p-8 flex flex-col shadow-lg relative overflow-hidden justify-center items-center text-center">
            <div className="absolute top-0 left-0 p-4 opacity-10">
              <Target size={150} />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto">
              <h3 className="text-xl font-medium mb-8 text-orange-50">
                {isTH ? 'ความคืบหน้าของคุณ' : 'Your Progress'}
              </h3>
              
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-white/20 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-white stroke-current drop-shadow-md"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${result.progressPercent * 2.51327} 251.327`}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black drop-shadow-md">{result.progressPercent}%</span>
                </div>
              </div>

              {result.daysLeft > 0 ? (
                <div className="mb-4">
                  <span className="text-lg text-orange-100">{isTH ? 'เหลืออีก' : 'Remaining'} </span>
                  <span className="text-3xl font-bold bg-white/20 px-4 py-1 rounded-lg mx-2">
                    {result.daysLeft}
                  </span>
                  <span className="text-lg text-orange-100"> {isTH ? 'วัน' : 'days'}</span>
                </div>
              ) : (
                <div className="mb-4 flex justify-center items-center text-yellow-300">
                  <Trophy className="w-8 h-8 mr-2" />
                  <span className="text-2xl font-bold">{isTH ? 'เป้าหมายสำเร็จ!' : 'Goal Achieved!'}</span>
                </div>
              )}

              <div className="mt-6 p-4 bg-black/10 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="font-medium text-lg text-white">
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-red max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">การสร้างนิสัยใหม่ (Habit Formation) ใช้เวลากี่วันกันแน่?</h2>
          <p>
            เราคงเคยได้ยินคำกล่าวที่ว่า <strong>"การเปลี่ยนนิสัยต้องใช้เวลา 21 วัน"</strong> แนวคิดนี้โด่งดังมากจากหนังสือ Psycho-Cybernetics ของ นพ.แมกซ์เวลล์ มอลตซ์ (Maxwell Maltz) ศัลยแพทย์ตกแต่งที่สังเกตว่าคนไข้ของเขามักใช้เวลาประมาณ 21 วันในการทำความคุ้นเคยกับใบหน้าใหม่หลังศัลยกรรม อย่างไรก็ตาม ในความเป็นจริงแล้ว กฎ 21 วันอาจไม่ได้ครอบคลุมกับนิสัยทุกประเภท โดยเฉพาะนิสัยที่มีความซับซ้อน
          </p>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ความจริงจากงานวิจัย: ทฤษฎี 66 วัน</h3>
          <p>
            งานวิจัยของ Philippa Lally จากมหาวิทยาลัย University College London (UCL) ได้ทำการศึกษาการสร้างนิสัยใหม่ในกลุ่มตัวอย่าง และพบความจริงที่น่าสนใจว่า <strong>ระยะเวลาโดยเฉลี่ยที่คนเราจะสร้างนิสัยใหม่จนทำได้แบบอัตโนมัติ (Automaticity) คือ 66 วัน</strong> ไม่ใช่ 21 วันอย่างที่หลายคนเข้าใจ
          </p>
          <p>
            ที่สำคัญกว่านั้น ระยะเวลาที่ใช้อาจแกว่งอยู่ตั้งแต่ <strong>18 วัน ไปจนถึง 254 วัน</strong> ขึ้นอยู่กับความยากง่ายของนิสัย:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>นิสัยที่ง่าย (Easy):</strong> เช่น การดื่มน้ำ 1 แก้วหลังตื่นนอน อาจใช้เวลาเพียง 18-21 วันก็ติดเป็นนิสัยแล้ว</li>
            <li><strong>นิสัยระดับกลาง (Medium):</strong> เช่น การกินผลไม้พร้อมมื้อเที่ยง หรือการออกกำลังกายเบาๆ มักจะใช้เวลาประมาณ 66 วัน</li>
            <li><strong>นิสัยที่ยากและซับซ้อน (Hard):</strong> เช่น การตื่นไปวิ่ง 5 กิโลเมตรทุกเช้า หรือการเลิกสูบบุหรี่ อาจต้องใช้ความพยายามต่อเนื่องนานถึง 250 วันขึ้นไป</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">เคล็ดลับการรักษา Streak (Don't Break the Chain)</h3>
          <p>
            การรักษาความต่อเนื่อง หรือที่เรียกว่า Streak เป็นกลยุทธ์ทางจิตวิทยาที่ทรงพลังมาก คอนเซปต์ <strong>"Don't break the chain" (อย่าให้สายโซ่ขาด)</strong> ของเจอร์รี ไซน์เฟลด์ (Jerry Seinfeld) แนะนำให้กากบาทลงบนปฏิทินทุกวันที่เราทำนิสัยนั้นสำเร็จ เมื่อเห็นกากบาทต่อกันยาวๆ สมองเราจะไม่อยากทำให้มันขาดตอน
          </p>
          
          <h4 className="font-bold text-gray-800 mt-4 mb-2">วิธีรับมือเมื่อหลุดโฟกัส:</h4>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>กฎห้ามพลาด 2 วันติด (Never miss twice):</strong> งานวิจัยของ Lally พบว่าการลืมทำนิสัยใหม่ 1 วัน ไม่ได้ส่งผลกระทบต่อกระบวนการสร้างนิสัยในระยะยาว ตราบใดที่คุณไม่ยอมให้มันขาดช่วง 2 วันติดกัน</li>
            <li><strong>ลดสเกลในวันที่แย่:</strong> ถ้านิสัยของคุณคือวิดพื้น 50 ครั้ง แต่คุณเหนื่อยมาก ให้วิดพื้นแค่ 5 ครั้งแล้วพอ เพื่อรักษา Streak ไว้ สมองจะยังบันทึกว่าคุณได้ลงมือทำแล้ว</li>
            <li><strong>เชื่อมโยงกับนิสัยเดิม (Habit Stacking):</strong> นำนิสัยใหม่ไปผูกกับสิ่งที่คุณทำอยู่แล้วทุกวัน เช่น "หลังจากแปรงฟันเสร็จ (นิสัยเดิม) ฉันจะอ่านหนังสือ 2 หน้า (นิสัยใหม่)"</li>
          </ol>
          
          <p>
            การสร้างนิสัยไม่ใช่การวิ่งแข่งระยะสั้น แต่มันคือการวิ่งมาราธอน สิ่งสำคัญที่สุดไม่ใช่ว่าคุณใช้เวลากี่วัน แต่คือความสม่ำเสมอ เริ่มต้นจากก้าวเล็กๆ ค่อยๆ สะสมชัยชนะไปทีละวัน แล้วในที่สุดพฤติกรรมนั้นจะกลายเป็นส่วนหนึ่งของตัวตนคุณโดยสมบูรณ์!
          </p>
        </article>
      )}
    </div>
  );
}
