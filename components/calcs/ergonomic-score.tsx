import React, { useState } from 'react';
import { Activity, CheckCircle2, XCircle, AlertCircle, Monitor, PersonStanding } from 'lucide-react';

export default function ErgonomicScore({ lang = 'EN' }: any) {
  const isTH = lang === 'TH';

  const [heightCm, setHeightCm] = useState<number>(170);

  // Ergonomic Dimensions based on height (approximations)
  // Chair height roughly height * 0.25
  // Desk height roughly height * 0.43
  // Monitor height (to eye level) roughly height * 0.65 (when sitting)
  const chairHeight = heightCm * 0.25;
  const deskHeight = heightCm * 0.42;
  const eyeLevelSitting = heightCm * 0.67;

  const [checklist, setChecklist] = useState<boolean[]>([
    true, true, false, false, false, false, false, false
  ]);

  const questions = [
    {
      th: 'เท้าของคุณวางราบกับพื้นหรือที่วางเท้าได้พอดีหรือไม่?',
      en: 'Are your feet flat on the floor or a footrest?'
    },
    {
      th: 'ข้อเข่าของคุณงอทำมุมประมาณ 90 องศาหรือไม่?',
      en: 'Are your knees bent at approximately a 90-degree angle?'
    },
    {
      th: 'พนักพิงเก้าอี้รองรับส่วนเว้าของหลังล่าง (Lumbar support) หรือไม่?',
      en: 'Does your chair backrest support your lower back (lumbar)?'
    },
    {
      th: 'ไหล่ของคุณอยู่ในท่าที่ผ่อนคลาย ไม่ยกสูงขึ้นขณะพิมพ์งานหรือไม่?',
      en: 'Are your shoulders relaxed (not elevated) while typing?'
    },
    {
      th: 'ข้อศอกของคุณงอทำมุมประมาณ 90-100 องศาและแนบชิดลำตัวหรือไม่?',
      en: 'Are your elbows bent at 90-100 degrees and close to your body?'
    },
    {
      th: 'ขอบบนของจอคอมพิวเตอร์อยู่ในระดับสายตาหรือต่ำกว่าเล็กน้อยหรือไม่?',
      en: 'Is the top of your monitor at or slightly below eye level?'
    },
    {
      th: 'ระยะห่างของจอภาพอยู่ห่างออกไปประมาณหนึ่งช่วงแขนหรือไม่?',
      en: 'Is your monitor placed about an arm’s length away?'
    },
    {
      th: 'คุณลุกขึ้นเปลี่ยนอิริยาบถอย่างน้อยทุกๆ 1 ชั่วโมงหรือไม่?',
      en: 'Do you take a break to move around at least every hour?'
    }
  ];

  const toggleCheck = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const score = checklist.filter(Boolean).length;
  const maxScore = questions.length;

  const getScoreInfo = () => {
    if (score === maxScore) {
      return { 
        color: 'text-green-600', 
        bg: 'bg-green-100',
        th: 'ยอดเยี่ยม (Perfect)', 
        en: 'Perfect',
        descTh: 'สภาพแวดล้อมการทำงานของคุณถูกต้องตามหลักการยศาสตร์ ลดความเสี่ยงออฟฟิศซินโดรมได้อย่างดี',
        descEn: 'Your workstation setup is ergonomically excellent, minimizing the risk of injury.'
      };
    }
    if (score >= 6) {
      return { 
        color: 'text-blue-600', 
        bg: 'bg-blue-100',
        th: 'ดี (Good)', 
        en: 'Good',
        descTh: 'สภาพแวดล้อมดี แต่อาจมีบางจุดที่ปรับปรุงได้เพื่อความสบายยิ่งขึ้น',
        descEn: 'Good setup, but a few adjustments could make it even better.'
      };
    }
    if (score >= 4) {
      return { 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-100',
        th: 'ควรปรับปรุง (Needs Improvement)', 
        en: 'Needs Improvement',
        descTh: 'คุณมีความเสี่ยงที่จะเกิดอาการปวดเมื่อย ควรปรับเปลี่ยนจุดที่คุณตอบ "ไม่" ให้ถูกต้อง',
        descEn: 'You are at risk of discomfort. Adjust the areas you answered "No" to.'
      };
    }
    return { 
      color: 'text-red-600', 
      bg: 'bg-red-100',
      th: 'เสี่ยงอันตราย (High Risk)', 
      en: 'High Risk',
      descTh: 'สภาพแวดล้อมการทำงานมีความเสี่ยงสูงที่จะก่อให้เกิดโรคออฟฟิศซินโดรม ควรปรับปรุงโดยด่วน',
      descEn: 'High risk of musculoskeletal disorders. Urgent changes to your workstation are recommended.'
    };
  };

  const scoreInfo = getScoreInfo();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-lg">
          <Activity className="w-6 h-6 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? 'ประเมินการตั้งค่าโต๊ะทำงาน (Ergonomic Score)' : 'Workstation Ergonomic Score'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 bg-teal-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-teal-600" />
            {isTH ? 'คำนวณความสูงที่เหมาะสม' : 'Ideal Setup Heights'}
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ส่วนสูงของคุณ (ซม.)' : 'Your Height (cm)'}
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="100"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-xs text-gray-500 mb-1">{isTH ? 'ความสูงเก้าอี้' : 'Chair Height'}</span>
              <span className="text-xl font-bold text-gray-800">~{chairHeight.toFixed(1)} <span className="text-sm font-normal text-gray-500">cm</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-xs text-gray-500 mb-1">{isTH ? 'ความสูงโต๊ะ' : 'Desk Height'}</span>
              <span className="text-xl font-bold text-gray-800">~{deskHeight.toFixed(1)} <span className="text-sm font-normal text-gray-500">cm</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-xs text-gray-500 mb-1">{isTH ? 'ระดับสายตา (ขณะนั่ง)' : 'Eye Level (Sitting)'}</span>
              <span className="text-xl font-bold text-gray-800">~{eyeLevelSitting.toFixed(1)} <span className="text-sm font-normal text-gray-500">cm</span></span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {isTH 
                ? '* ค่าประมาณเบื้องต้น อาจปรับเปลี่ยนเล็กน้อยตามสัดส่วนของแต่ละบุคคล' 
                : '* Approximate values. Adjust slightly based on individual body proportions.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PersonStanding className="w-5 h-5 mr-2 text-teal-600" />
            {isTH ? 'แบบประเมินความเสี่ยง' : 'Ergonomic Checklist'}
          </h3>
          
          <div className="space-y-3 mb-6">
            {questions.map((q, index) => (
              <div 
                key={index} 
                onClick={() => toggleCheck(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-start transition-colors ${
                  checklist[index] 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="mt-0.5 mr-3 flex-shrink-0">
                  {checklist[index] ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <p className={`text-sm ${checklist[index] ? 'text-teal-900 font-medium' : 'text-gray-600'}`}>
                  {isTH ? q.th : q.en}
                </p>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-2xl ${scoreInfo.bg}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">
                  {isTH ? 'คะแนนของคุณ' : 'Your Score'}
                </p>
                <h4 className={`text-2xl font-bold mb-2 ${scoreInfo.color}`}>
                  {isTH ? scoreInfo.th : scoreInfo.en}
                </h4>
                <p className="text-gray-700 text-sm max-w-md">
                  {isTH ? scoreInfo.descTh : scoreInfo.descEn}
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white rounded-full w-24 h-24 shadow-sm flex-shrink-0">
                <span className={`text-3xl font-bold ${scoreInfo.color}`}>{score}</span>
                <span className="text-xs text-gray-400">/ {maxScore}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl">
        {isTH ? (
          <article className="prose prose-teal max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">การยศาสตร์ (Ergonomics) และการจัดโต๊ะทำงานเพื่อป้องกันออฟฟิศซินโดรม</h2>
            <p>
              <strong>การยศาสตร์ (Ergonomics)</strong> คือศาสตร์ที่ศึกษาเกี่ยวกับการปรับเปลี่ยนสภาพแวดล้อมการทำงานให้เหมาะสมกับสรีระและข้อจำกัดของมนุษย์ เป้าหมายหลักคือเพื่อเพิ่มประสิทธิภาพในการทำงาน และลดความเสี่ยงในการเกิดอาการบาดเจ็บหรือความผิดปกติของระบบกระดูกและกล้ามเนื้อ ซึ่งในยุคปัจจุบันมักเป็นที่รู้จักกันในชื่อ <strong>กลุ่มอาการออฟฟิศซินโดรม (Office Syndrome)</strong>
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมการจัดโต๊ะทำงานจึงสำคัญ?</h3>
            <p>
              การนั่งทำงานหน้าคอมพิวเตอร์ในท่าทางที่ไม่ถูกต้องติดต่อกันหลายชั่วโมงต่อวัน ทำให้กล้ามเนื้อคอ บ่า ไหล่ และหลัง ทำงานหนักเกินไป เกิดการเกร็งตัวสะสม จนกลายเป็นพังผืดและทำให้รู้สึกปวดเรื้อรัง หากปล่อยทิ้งไว้อาจนำไปสู่ภาวะหมอนรองกระดูกทับเส้นประสาท หรืออาการชาเรื้อรังได้ การจัดสภาพแวดล้อมให้ถูกต้องตามหลักการยศาสตร์จึงเป็นการแก้ปัญหาที่ต้นเหตุ
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">หลักการจัดโต๊ะทำงานที่ถูกต้อง (Ergonomic Setup)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>เก้าอี้และท่านั่ง:</strong> ควรปรับความสูงของเก้าอี้ให้เท้าของคุณวางราบกับพื้นได้พอดี (หากเท้าลอยควรหาที่วางเท้า) ข้อเข่าและข้อศอกควรงอทำมุมประมาณ 90-100 องศา นั่งหลังตรงโดยให้พนักพิงรองรับช่วงหลังล่าง (Lumbar)
              </li>
              <li>
                <strong>โต๊ะทำงาน:</strong> ความสูงของโต๊ะควรอยู่ในระดับเดียวกับข้อศอกขณะปล่อยแขนทิ้งลงข้างลำตัว หากโต๊ะสูงเกินไปคุณจะเผลอยกไหล่ขณะพิมพ์งาน ทำให้ปวดบ่าและคอ
              </li>
              <li>
                <strong>จอคอมพิวเตอร์:</strong> วางจอห่างออกไปประมาณ 1 ช่วงแขน ปรับความสูงของจอให้ขอบบนของจออยู่ระดับเดียวกับสายตา หรือต่ำกว่าเล็กน้อย เพื่อให้คอตั้งตรง ไม่ต้องก้มหรือเงยหน้ามากเกินไป หากใช้แล็ปท็อป (Laptop) ควรใช้ขาตั้งจอร่วมกับคีย์บอร์ดแยก
              </li>
              <li>
                <strong>เมาส์และคีย์บอร์ด:</strong> วางไว้ในระยะที่มือเอื้อมถึงได้สบายโดยไม่ต้องยืดแขน ข้อควรระวังคือข้อมือต้องไม่กระดกขึ้นหรือหักลงขณะใช้งาน
              </li>
            </ul>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
              <h4 className="font-semibold text-teal-800 mb-1">เคล็ดลับเพิ่มเติม: กฎ 20-20-20</h4>
              <p className="text-sm text-teal-700">
                แม้จะจัดโต๊ะดีแค่ไหน แต่การอยู่นิ่งๆ นานๆ ก็เป็นผลเสีย ควรใช้กฎ 20-20-20 คือ <strong>ทุกๆ 20 นาที ให้พักสายตามองไกลออกไป 20 ฟุต เป็นเวลา 20 วินาที</strong> และควรลุกขึ้นเดินยืดเส้นยืดสายอย่างน้อยทุกๆ 1 ชั่วโมง
              </p>
            </div>
            
            <p className="mt-4">
              การลงทุนกับโต๊ะหรือเก้าอี้ตามหลักสรีรศาสตร์ (Ergonomic chair/desk) อาจดูมีราคาสูง แต่เมื่อเทียบกับค่ารักษาพยาบาลจากโรคออฟฟิศซินโดรมแล้ว ถือเป็นการลงทุนที่คุ้มค่าระยะยาว ลองใช้เครื่องมือคำนวณด้านบนเพื่อหาสัดส่วนที่เหมาะสมกับส่วนสูงของคุณ และเช็คลิสต์ว่าคุณตั้งค่าโต๊ะทำงานได้ถูกต้องแล้วหรือยัง
            </p>
          </article>
        ) : (
          <article className="prose prose-teal max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ergonomics and Workstation Setup to Prevent Office Syndrome</h2>
            <p>
              <strong>Ergonomics</strong> is the applied science of designing the workspace to fit the worker. The main goal is to increase efficiency and productivity while reducing discomfort and the risk of Work-Related Musculoskeletal Disorders (WMSDs), commonly known as Office Syndrome.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Why Proper Workstation Setup Matters</h3>
            <p>
              Sitting at a computer in an awkward posture for hours a day causes continuous strain on the muscles in your neck, shoulders, and back. Over time, this muscle fatigue can lead to chronic pain, nerve compression, or herniated discs. Arranging your workspace according to ergonomic principles is the best preventative measure.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Key Principles of an Ergonomic Setup</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Chair and Posture:</strong> Adjust chair height so your feet rest flat on the floor (use a footrest if necessary). Knees and elbows should be bent at roughly 90-100 degrees. Sit back in the chair so the backrest supports the natural curve of your lower back (lumbar support).
              </li>
              <li>
                <strong>Desk Height:</strong> The desk surface should be at or slightly below your elbow height when your shoulders are relaxed. A desk that is too high forces you to elevate your shoulders while typing, leading to neck and shoulder tension.
              </li>
              <li>
                <strong>Monitor Placement:</strong> Place the monitor about an arm's length away. The top line of the screen should be at or slightly below eye level. If you use a laptop constantly, invest in a laptop stand and an external keyboard/mouse.
              </li>
              <li>
                <strong>Keyboard and Mouse:</strong> Keep them close enough so you don't have to stretch forward. Your wrists should remain straight, not bent up or down, while operating them.
              </li>
            </ul>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
              <h4 className="font-semibold text-teal-800 mb-1">Pro Tip: The 20-20-20 Rule</h4>
              <p className="text-sm text-teal-700">
                No matter how perfect your setup is, prolonged static posture is harmful. Follow the 20-20-20 rule: <strong>Every 20 minutes, look at something 20 feet away for 20 seconds.</strong> Also, make sure to stand up and stretch at least once an hour.
              </p>
            </div>
            
            <p className="mt-4">
              Use the calculator above to find the ideal height dimensions for your chair, desk, and monitor based on your physical height, and use the checklist to ensure you're working safely and comfortably.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
