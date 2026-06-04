import React, { useState } from 'react';
import { Scale, Clock, Briefcase, Heart, Coffee, AlertCircle } from 'lucide-react';

export default function WorkLifeBalanceScore({ lang = 'TH' }: any) {
  const [workHours, setWorkHours] = useState<number>(40);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [leisureHours, setLeisureHours] = useState<number>(14);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [satisfaction, setSatisfaction] = useState<number>(5);

  const calculateScore = () => {
    // 1. Work Hours Score (Optimal 35-45 hours) Max 30 points
    let workScore = 30;
    if (workHours > 45) {
      workScore -= (workHours - 45) * 1.5;
    } else if (workHours < 30) {
      workScore -= (30 - workHours) * 0.5; // less penalty for underworking
    }
    workScore = Math.max(0, Math.min(30, workScore));

    // 2. Sleep Score (Optimal 7-9 hours per night -> 49-63 per week) Max 25 points
    let sleepScore = 25;
    const weeklySleep = sleepHours * 7;
    if (weeklySleep < 49) {
      sleepScore -= (49 - weeklySleep) * 1.5;
    } else if (weeklySleep > 70) {
      sleepScore -= (weeklySleep - 70) * 1;
    }
    sleepScore = Math.max(0, Math.min(25, sleepScore));

    // 3. Leisure/Family Score (Optimal >= 20 hours per week) Max 20 points
    let leisureScore = 20;
    if (leisureHours < 20) {
      leisureScore = (leisureHours / 20) * 20;
    }
    
    // 4. Psychological factors (Stress and Satisfaction) Max 25 points
    // Stress: 1-10 (lower is better), Satisfaction: 1-10 (higher is better)
    const psychScore = ((10 - stressLevel + satisfaction) / 20) * 25;

    const totalScore = Math.round(workScore + sleepScore + leisureScore + psychScore);
    
    return {
      total: totalScore,
      workScore: Math.round(workScore),
      sleepScore: Math.round(sleepScore),
      leisureScore: Math.round(leisureScore),
      psychScore: Math.round(psychScore)
    };
  };

  const result = calculateScore();

  const getStatus = (score: number) => {
    if (score >= 80) return { label: lang === 'EN' ? 'Excellent Balance' : 'สมดุลเยี่ยมยอด', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
    if (score >= 60) return { label: lang === 'EN' ? 'Good Balance' : 'สมดุลในเกณฑ์ดี', color: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500' };
    if (score >= 40) return { label: lang === 'EN' ? 'Needs Improvement' : 'ควรปรับปรุงสมดุล', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
    return { label: lang === 'EN' ? 'Burnout Risk' : 'เสี่ยงภาวะหมดไฟ (Burnout)', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' };
  };

  const status = getStatus(result.total);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'EN' ? 'Work-Life Balance Score' : 'แบบประเมินสมดุลชีวิตและการทำงาน'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              {lang === 'EN' ? 'Time Allocation' : 'การจัดสรรเวลา'}
            </h3>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {lang === 'EN' ? 'Work Hours per Week' : 'ชั่วโมงทำงานต่อสัปดาห์'}</span>
                <span className="text-indigo-600 font-bold">{workHours} hrs</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {lang === 'EN' ? 'Sleep Hours per Night' : 'ชั่วโมงนอนหลับต่อคืน'}</span>
                <span className="text-indigo-600 font-bold">{sleepHours} hrs</span>
              </label>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Coffee className="w-4 h-4" /> {lang === 'EN' ? 'Leisure/Family Hours per Week' : 'เวลาพักผ่อน/ครอบครัว ต่อสัปดาห์'}</span>
                <span className="text-indigo-600 font-bold">{leisureHours} hrs</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={leisureHours}
                onChange={(e) => setLeisureHours(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-8">
              {lang === 'EN' ? 'Mental Well-being' : 'สภาวะจิตใจ'}
            </h3>

            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {lang === 'EN' ? 'Stress Level at Work' : 'ระดับความเครียดจากการทำงาน'}</span>
                <span className="text-red-500 font-bold">{stressLevel}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{lang === 'EN' ? 'Low Stress' : 'เครียดน้อย'}</span>
                <span>{lang === 'EN' ? 'High Stress' : 'เครียดมาก'}</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> {lang === 'EN' ? 'Satisfaction with Personal Time' : 'ความพึงพอใจในเวลาส่วนตัว'}</span>
                <span className="text-green-600 font-bold">{satisfaction}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={satisfaction}
                onChange={(e) => setSatisfaction(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{lang === 'EN' ? 'Dissatisfied' : 'ไม่พอใจเลย'}</span>
                <span>{lang === 'EN' ? 'Very Satisfied' : 'พอใจมาก'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className={`rounded-2xl p-8 text-center flex flex-col justify-center border-2 ${status.bg} border-${status.color.split('-')[1]}-200 h-full`}>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {lang === 'EN' ? 'Your Work-Life Balance Score' : 'คะแนนสมดุลชีวิตและการทำงานของคุณ'}
              </h3>
              
              <div className="text-6xl font-black mb-4 tracking-tight" style={{ color: `var(--tw-color-${status.color.split('-')[1]}-600)` }}>
                <span className={status.color}>{result.total}</span>
                <span className="text-2xl text-gray-400 font-normal">/100</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div className={`h-3 rounded-full ${status.bar} transition-all duration-1000`} style={{ width: `${result.total}%` }}></div>
              </div>

              <div className={`inline-block px-4 py-2 rounded-full font-bold text-lg bg-white shadow-sm ${status.color}`}>
                {status.label}
              </div>

              <div className="mt-8 text-left bg-white/60 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">
                  {lang === 'EN' ? 'Score Breakdown' : 'รายละเอียดคะแนน (เต็มส่วนละ)'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{lang === 'EN' ? 'Work Hours' : 'ชั่วโมงทำงาน (30)'}</span>
                    <span className="font-medium text-gray-800">{result.workScore} pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{lang === 'EN' ? 'Sleep Quality' : 'การนอนหลับ (25)'}</span>
                    <span className="font-medium text-gray-800">{result.sleepScore} pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{lang === 'EN' ? 'Leisure Time' : 'เวลาพักผ่อน (20)'}</span>
                    <span className="font-medium text-gray-800">{result.leisureScore} pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{lang === 'EN' ? 'Mental State' : 'สภาวะจิตใจ (25)'}</span>
                    <span className="font-medium text-gray-800">{result.psychScore} pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Work-Life Balance (สมดุลชีวิตและการทำงาน) คืออะไร ทำไมถึงสำคัญ?
        </h2>
        
        <p>
          ในยุคที่เทคโนโลยีทำให้เราสามารถเชื่อมต่อกับการทำงานได้ตลอด 24 ชั่วโมง เส้นแบ่งระหว่าง "เวลาทำงาน" และ "เวลาส่วนตัว" จึงเริ่มเลือนลางลงอย่างเห็นได้ชัด คำว่า <strong>Work-Life Balance หรือ สมดุลชีวิตและการทำงาน</strong> จึงกลายมาเป็นประเด็นสำคัญที่ถูกพูดถึงอย่างกว้างขวาง โดยความหมายที่แท้จริงของคำนี้ ไม่ใช่การแบ่งเวลา 50:50 ระหว่างงานกับชีวิตส่วนตัวอย่างตายตัว แต่คือ <strong>"การจัดสรรเวลาและพลังงานให้เหมาะสม เพื่อให้สามารถรับผิดชอบหน้าที่การงานได้ดีเยี่ยม โดยไม่สูญเสียความสุข สุขภาพ และความสัมพันธ์ส่วนตัว"</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          สัญญาณเตือนว่า Work-Life Balance ของคุณกำลังพัง
        </h3>
        <p>
          บ่อยครั้งที่เราจมอยู่กับภาระงานจนลืมสังเกตความผิดปกติของตัวเอง หากคุณมีอาการเหล่านี้ นั่นอาจเป็นสัญญาณเตือนว่าสมดุลชีวิตของคุณกำลังอยู่ในเกณฑ์อันตราย:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>ทางร่างกาย:</strong> อ่อนเพลียเรื้อรัง นอนไม่หลับ ปวดหัวไมเกรน ปวดหลังและบ่า (ออฟฟิศซินโดรม) หรือป่วยบ่อยเนื่องจากภูมิคุ้มกันตก</li>
          <li><strong>ทางจิตใจและอารมณ์:</strong> รู้สึกหงุดหงิดง่าย วิตกกังวล ซึมเศร้า ขาดแรงจูงใจในการทำงาน หรือรู้สึกว่าตัวเองไม่มีคุณค่าเมื่อไม่ได้ทำงาน</li>
          <li><strong>ทางสังคม:</strong> ไม่มีเวลาให้กับครอบครัวหรือคนรัก ยกเลิกนัดเพื่อนบ่อยครั้ง และขาดการทำกิจกรรมหรืองานอดิเรกที่เคยชื่นชอบ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          ผลกระทบของการขาดสมดุล: สู่ภาวะ Burnout Syndrome
        </h3>
        <p>
          การทำงานหนักเกินพอดี (Overwork) อย่างต่อเนื่อง มักนำไปสู่ <strong>"ภาวะหมดไฟในการทำงาน (Burnout Syndrome)"</strong> ซึ่งองค์การอนามัยโลก (WHO) ได้จัดให้เป็นปรากฏการณ์ทางอาชีพ (Occupational Phenomenon) ภาวะหมดไฟไม่เพียงแต่ทำลายสุขภาพกายและใจของผู้ทำงาน แต่ยังส่งผลเสียต่อองค์กรด้วย เนื่องจากประสิทธิภาพการทำงาน (Productivity) จะลดต่ำลง ขาดความคิดสร้างสรรค์ และมีโอกาสลาออกสูง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          เทคนิคการสร้าง Work-Life Balance อย่างยั่งยืน
        </h3>
        <p>
          การฟื้นฟูสมดุลชีวิตต้องอาศัยวินัยและการตระหนักรู้ในตนเอง ลองนำเทคนิคเหล่านี้ไปปรับใช้:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li><strong>กำหนดขอบเขต (Set Boundaries) อย่างชัดเจน:</strong> กำหนดเวลาเริ่มและเลิกงานที่แน่นอน ปิดการแจ้งเตือนเรื่องงานในวันหยุดหรือหลังเวลาเลิกงาน ฝึกทักษะการปฏิเสธ (Saying No) อย่างมีศิลปะเมื่องานล้นมือ</li>
          <li><strong>จัดลำดับความสำคัญ (Prioritization):</strong> ใช้หลักการ Eisenhower Matrix เพื่อแยกแยะงานที่ "สำคัญและเร่งด่วน" ออกจากงานที่ "ไม่สำคัญ" มุ่งเน้นทำสิ่งที่สร้าง Impact สูงสุด แทนที่จะพยายามทำทุกอย่างพร้อมกัน</li>
          <li><strong>พักผ่อนให้เป็น (Meaningful Rest):</strong> การพักผ่อนที่ดีไม่ใช่แค่การนอนหลับ แต่รวมถึงการ "ถอดปลั๊ก (Disconnect)" จากหน้าจอ การออกกำลังกาย การทำสมาธิ หรือการใช้เวลากับคนที่รัก เพื่อชาร์จพลังใจให้กลับมาเต็มเปี่ยม</li>
          <li><strong>Work-Life Integration:</strong> สำหรับบางคน การพยายามแยกงานกับชีวิตอาจสร้างความเครียดกว่าเดิม แนวคิด Work-Life Integration จึงเสนอให้ผสมผสานสองสิ่งนี้เข้าด้วยกันอย่างยืดหยุ่น เช่น การออกกำลังกายช่วงพักกลางวัน หรือทำงานจากร้านกาแฟบ้างเพื่อเปลี่ยนบรรยากาศ</li>
        </ol>

        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 my-6">
          <h4 className="text-lg font-bold text-indigo-900 mb-2">ข้อคิดส่งท้าย</h4>
          <p className="text-indigo-800 m-0">
            งานเป็นเพียงส่วนหนึ่งของชีวิต ไม่ใช่ทั้งหมดของชีวิต การประสบความสำเร็จในหน้าที่การงานจะไม่มีความหมายเลย หากคุณสูญเสียสุขภาพร่างกายที่แข็งแรงและคนรอบข้างที่รักคุณไป การหมั่นประเมินคะแนน Work-Life Balance เป็นประจำ จะช่วยให้คุณปรับหางเสือของชีวิตให้อยู่ในเส้นทางที่ถูกต้องและมีความสุขได้อย่างยั่งยืน
          </p>
        </div>
      </article>
    </div>
  );
}
