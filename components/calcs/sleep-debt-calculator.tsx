import React, { useState } from 'react';
import { Moon, Sun, Battery, Activity, AlertTriangle, Info } from 'lucide-react';

export default function SleepDebtCalculator({ lang }: any) {
  const isTH = lang === 'th';
  
  const [targetSleep, setTargetSleep] = useState<number>(8);
  const [sleepLog, setSleepLog] = useState<number[]>([7, 6, 6.5, 7, 5, 8, 9]);

  const handleSleepChange = (index: number, value: number) => {
    const newLog = [...sleepLog];
    newLog[index] = value;
    setSleepLog(newLog);
  };

  const calculateDebt = () => {
    const totalTarget = targetSleep * 7;
    const totalActual = sleepLog.reduce((a, b) => a + (b || 0), 0);
    const debt = Math.max(0, totalTarget - totalActual);
    const surplus = Math.max(0, totalActual - totalTarget);
    
    return {
      totalActual,
      debt,
      surplus
    };
  };

  const result = calculateDebt();
  
  const daysOfWeek = isTH 
    ? ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Moon size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณหนี้การนอน (Sleep Debt)' : 'Sleep Debt Calculator'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Sun className="w-4 h-4 mr-2 text-orange-500" />
                {isTH ? 'เป้าหมายการนอนต่อคืน (ชั่วโมง)' : 'Target Sleep Per Night (Hours)'}
              </label>
              <input
                type="number"
                min="4"
                max="12"
                step="0.5"
                value={targetSleep}
                onChange={(e) => setTargetSleep(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                {isTH ? '* ผู้ใหญ่ทั่วไปควรนอน 7-9 ชั่วโมงต่อคืน' : '* Average adults need 7-9 hours of sleep'}
              </p>
            </div>

            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
              <label className="block text-sm font-semibold text-indigo-900 mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                {isTH ? 'ชั่วโมงการนอนของคุณใน 7 วันที่ผ่านมา' : 'Your Sleep in the Last 7 Days'}
              </label>
              <div className="space-y-3">
                {sleepLog.map((hours, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">
                      {daysOfWeek[index]}
                    </span>
                    <div className="flex items-center flex-1 ml-4">
                      <input
                        type="range"
                        min="0"
                        max="14"
                        step="0.5"
                        value={hours}
                        onChange={(e) => handleSleepChange(index, Number(e.target.value))}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <span className="w-16 text-right text-sm font-bold text-indigo-700">
                        {hours} {isTH ? 'ชม.' : 'hr'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white rounded-xl p-6 sm:p-8 flex flex-col shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Battery size={120} />
            </div>
            
            <h3 className="text-xl font-medium mb-2 opacity-90 relative z-10">
              {isTH ? 'ผลลัพธ์หนี้การนอนของคุณ' : 'Your Sleep Debt Result'}
            </h3>
            
            <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 my-6">
              {result.debt > 0 ? (
                <>
                  <div className="text-sm text-indigo-200 mb-2">
                    {isTH ? 'คุณมีหนี้การนอนสะสม' : 'Accumulated Sleep Debt'}
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-red-400 drop-shadow-md mb-2">
                    {result.debt.toFixed(1)} <span className="text-2xl font-medium">{isTH ? 'ชั่วโมง' : 'hrs'}</span>
                  </div>
                  <div className="inline-flex items-center mt-4 px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {isTH ? 'ร่างกายของคุณต้องการการพักผ่อนเพิ่ม' : 'Your body needs more rest'}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-indigo-200 mb-2">
                    {isTH ? 'สถานะการนอนของคุณ' : 'Your Sleep Status'}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-emerald-400 drop-shadow-md mb-2">
                    {isTH ? 'พักผ่อนเพียงพอ!' : 'Well Rested!'}
                  </div>
                  {result.surplus > 0 && (
                    <div className="text-emerald-200 text-sm mt-2">
                      {isTH ? `กำไรการนอน ${result.surplus.toFixed(1)} ชั่วโมง` : `${result.surplus.toFixed(1)} hours surplus`}
                    </div>
                  )}
                </>
              )}
            </div>

            {result.debt > 0 && (
              <div className="mt-auto bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <h4 className="font-semibold text-sm mb-2 text-indigo-100 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  {isTH ? 'แผนใช้หนี้การนอน (Recovery Plan)' : 'Recovery Plan'}
                </h4>
                <p className="text-sm text-indigo-50 leading-relaxed">
                  {isTH 
                    ? `แนะนำให้นอนเพิ่มวันละ 30 นาที เป็นเวลา ${Math.ceil(result.debt / 0.5)} วัน ไม่แนะนำให้นอนชดเชยรวดเดียวในวันหยุดเพราะจะทำให้ระบบนาฬิกาชีวภาพรวน`
                    : `We recommend sleeping an extra 30 mins per day for ${Math.ceil(result.debt / 0.5)} days. Do not binge-sleep on weekends as it disrupts your circadian rhythm.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTH && (
        <article className="prose prose-indigo max-w-none bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">หนี้การนอน (Sleep Debt) คืออะไร? ทำไมเราถึงขาดทุนโดยไม่รู้ตัว</h2>
          <p>
            หลายคนอาจคุ้นเคยกับคำว่า "หนี้สิน" ในทางการเงิน แต่ในทางสุขภาพ ร่างกายของเราก็สามารถสะสม <strong>"หนี้การนอน" (Sleep Debt)</strong> ได้เช่นกัน หนี้การนอน คือ ความแตกต่างระหว่างจำนวนชั่วโมงที่คุณควรนอนเพื่อสุขภาพที่ดี (โดยทั่วไปคือ 7-9 ชั่วโมงสำหรับผู้ใหญ่) กับจำนวนชั่วโมงที่คุณนอนหลับได้จริงๆ 
          </p>
          <p>
            ตัวอย่างเช่น หากร่างกายคุณต้องการการนอนหลับ 8 ชั่วโมง แต่คุณนอนไปเพียง 6 ชั่วโมง คุณจะเกิดหนี้การนอน 2 ชั่วโมงในคืนนั้น และหากคุณทำพฤติกรรมนี้ต่อเนื่องไป 5 วันทำการ หนี้การนอนของคุณจะสะสมเป็น 10 ชั่วโมง ซึ่งเปรียบเสมือนการที่คุณไม่ได้นอนเลยมากกว่า 1 คืนเต็มๆ!
          </p>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">ผลกระทบที่น่ากลัวของการสะสมหนี้การนอน</h3>
          <p>
            การอดนอนสะสมไม่ได้ทำให้คุณแค่รู้สึกง่วงเหงาหาวนอนระหว่างวันเท่านั้น แต่มันส่งผลกระทบอย่างลึกซึ้งต่อระบบต่างๆ ในร่างกาย:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>สมองทำงานช้าลง:</strong> การตัดสินใจแย่ลง ความจำระยะสั้นเสื่อมถอย ขาดสมาธิ และมีโอกาสเกิดอุบัติเหตุสูงขึ้น</li>
            <li><strong>ระบบภูมิคุ้มกันอ่อนแอ:</strong> ป่วยง่ายขึ้น และหายจากอาการป่วยช้าลง เพราะร่างกายไม่มีเวลาซ่อมแซมตัวเอง</li>
            <li><strong>น้ำหนักขึ้นง่าย:</strong> การอดนอนทำให้ฮอร์โมนเลปติน (ฮอร์โมนอิ่ม) ลดลง และเกรลิน (ฮอร์โมนหิว) เพิ่มขึ้น ทำให้คุณอยากกินของหวานและอาหารขยะมากขึ้น</li>
            <li><strong>แก่ก่อนวัย:</strong> ร่างกายหลั่งคอร์ติซอล (ฮอร์โมนความเครียด) มากขึ้น ซึ่งจะไปทำลายคอลลาเจนในผิวหนัง ทำให้ผิวหมองคล้ำและเกิดริ้วรอย</li>
            <li><strong>ความเสี่ยงโรคเรื้อรัง:</strong> เพิ่มความเสี่ยงต่อโรคเบาหวานประเภทที่ 2, โรคหัวใจ, ความดันโลหิตสูง และภาวะซึมเศร้า</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">วิธีชดใช้ "หนี้การนอน" ที่ถูกต้อง</h3>
          <p>
            ความเชื่อที่ว่า "อดนอนมาทั้งอาทิตย์ เดี๋ยวค่อยไปนอนชดเชยรวดเดียว 12 ชั่วโมงในวันหยุด" เป็นความเชื่อที่ <strong>ผิด</strong> และอาจส่งผลเสียมากกว่าผลดี เพราะการนอนตื่นสายผิดปกติในวันหยุดจะทำให้ <strong>นาฬิกาชีวภาพ (Circadian Rhythm)</strong> ของร่างกายรวน ทำให้คืนวันอาทิตย์นอนไม่หลับ และเช้าวันจันทร์ยิ่งอ่อนเพลียกว่าเดิม (Social Jetlag)
          </p>
          <p><strong>วิธีปลดหนี้การนอนที่แพทย์ผู้เชี่ยวชาญแนะนำ มีดังนี้:</strong></p>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>ทยอยจ่ายหนี้ทีละน้อย:</strong> หากคุณมีหนี้การนอนสะสม 10 ชั่วโมง ให้เข้านอนเร็วขึ้นวันละ 15-30 นาที จนกว่าจะรู้สึกตื่นมาแล้วสดชื่นโดยไม่ต้องพึ่งนาฬิกาปลุก</li>
            <li><strong>งีบหลับสั้นๆ (Power Nap):</strong> การงีบหลับ 10-20 นาทีในช่วงบ่าย (ก่อน 15.00 น.) ช่วยลดความเหนื่อยล้าสะสมได้โดยไม่รบกวนการนอนตอนกลางคืน</li>
            <li><strong>รักษากฎกติกาในวันหยุด:</strong> ในวันหยุดสุดสัปดาห์ คุณสามารถนอนตื่นสายขึ้นได้ แต่ไม่ควรเกิน 1-2 ชั่วโมงจากเวลาตื่นปกติในวันทำงาน</li>
            <li><strong>จัดสภาพแวดล้อมห้องนอน:</strong> ทำให้ห้องมืดสนิท เงียบ และเย็น และหลีกเลี่ยงการเล่นหน้าจอมือถืออย่างน้อย 1 ชั่วโมงก่อนนอน เพื่อให้การนอนหลับลึกและมีคุณภาพสูงสุด</li>
          </ol>
          
          <p>
            จำไว้ว่า <strong>"การนอนหลับไม่ใช่การเสียเวลา แต่คือการลงทุนที่ให้ผลตอบแทนคุ้มค่าที่สุดสำหรับสุขภาพของคุณ"</strong> เริ่มต้นบริหารจัดการหนี้การนอนของคุณตั้งแต่วันนี้ เพื่อให้ร่างกายกลับมาสดชื่นและมีพลังเต็มร้อยในทุกๆ วัน!
          </p>
        </article>
      )}
    </div>
  );
}
