import React, { useState } from 'react';
import { Clock, Battery, Sun, Briefcase } from 'lucide-react';

export default function TimeAffluence({ lang }: any) {
  const [workHours, setWorkHours] = useState<number>(40);
  const [commuteHours, setCommuteHours] = useState<number>(5);
  const [sleepHours, setSleepHours] = useState<number>(49); // 7 per night
  const [choreHours, setChoreHours] = useState<number>(10);

  const calculate = () => {
    const totalHoursInWeek = 168;
    const obligatedHours = workHours + commuteHours + sleepHours + choreHours;
    const freeTimeHours = Math.max(0, totalHoursInWeek - obligatedHours);
    
    // Percentage
    const freeTimePercent = (freeTimeHours / totalHoursInWeek) * 100;
    
    let affluenceLevel = '';
    let affluenceDesc = '';

    if (freeTimePercent > 40) {
      affluenceLevel = lang === 'EN' ? 'Time Millionaire' : 'เศรษฐีเวลา';
      affluenceDesc = lang === 'EN' ? 'You have abundant free time to pursue passions.' : 'คุณมีเวลาว่างเหลือเฟือในการทำสิ่งที่คุณรัก';
    } else if (freeTimePercent > 25) {
      affluenceLevel = lang === 'EN' ? 'Time Wealthy' : 'มั่งคั่งทางเวลา';
      affluenceDesc = lang === 'EN' ? 'You have a healthy balance of work and personal time.' : 'คุณมีความสมดุลที่ดีระหว่างงานและเวลาส่วนตัว';
    } else if (freeTimePercent > 15) {
      affluenceLevel = lang === 'EN' ? 'Time Middle-Class' : 'ชนชั้นกลางทางเวลา';
      affluenceDesc = lang === 'EN' ? 'You are busy but still manage to find some personal time.' : 'คุณค่อนข้างยุ่งแต่ก็ยังพอมีเวลาส่วนตัวบ้าง';
    } else {
      affluenceLevel = lang === 'EN' ? 'Time Poor' : 'ยากจนเวลา';
      affluenceDesc = lang === 'EN' ? 'You are extremely busy and lack personal freedom.' : 'คุณยุ่งมากและขาดอิสระในการใช้ชีวิต';
    }

    return { freeTimeHours, freeTimePercent, affluenceLevel, affluenceDesc };
  };

  const { freeTimeHours, freeTimePercent, affluenceLevel, affluenceDesc } = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-indigo-500" />
        {lang === 'EN' ? 'Time Affluence Calculator' : 'คำนวณความมั่งคั่งทางเวลา'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Work Hours per Week' : 'ชั่วโมงทำงานต่อสัปดาห์'}
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={workHours || ''}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Commute Hours per Week' : 'ชั่วโมงเดินทางต่อสัปดาห์'}
            </label>
            <input
              type="number"
              value={commuteHours || ''}
              onChange={(e) => setCommuteHours(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Sleep Hours per Week' : 'ชั่วโมงนอนหลับต่อสัปดาห์'}
            </label>
            <div className="relative">
              <Battery className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={sleepHours || ''}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="49"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {lang === 'EN' ? 'Chores & Errands per Week' : 'ทำงานบ้านและธุระส่วนตัวต่อสัปดาห์ (ชั่วโมง)'}
            </label>
            <input
              type="number"
              value={choreHours || ''}
              onChange={(e) => setChoreHours(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="10"
            />
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col justify-center text-center">
          <Sun className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-indigo-900 mb-2">
            {affluenceLevel}
          </h3>
          <p className="text-indigo-700 mb-6">{affluenceDesc}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? 'Free Time (Hours)' : 'เวลาว่าง (ชั่วโมง)'}</div>
              <div className="text-2xl font-bold text-gray-800">{freeTimeHours}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{lang === 'EN' ? '% of Week' : 'สัดส่วนต่อสัปดาห์'}</div>
              <div className="text-2xl font-bold text-gray-800">{freeTimePercent.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-indigo max-w-none text-gray-700">
        <h2>{lang === 'EN' ? 'What is Time Affluence?' : 'ความมั่งคั่งทางเวลา (Time Affluence) คืออะไร?'}</h2>
        {lang === 'EN' ? (
          <>
            <p>In modern society, we often measure wealth solely by the amount of money in our bank accounts. However, another crucial metric for well-being is "Time Affluence"—the feeling of having enough time to pursue activities that bring personal meaning and satisfaction.</p>
            <p>Being "Time Poor" happens when our days are overly saturated with obligations—such as work, long commutes, and endless chores—leaving us with little to no bandwidth for relaxation, hobbies, or connecting with loved ones. Research consistently shows that time affluence is strongly linked to higher levels of happiness and lower stress.</p>
            <h3>How to Increase Your Time Affluence</h3>
            <ul>
              <li><strong>Prioritize ruthlessly:</strong> Learn to say no to commitments that do not align with your core values or goals.</li>
              <li><strong>Outsource tasks:</strong> If you can afford it, pay for services that save you time, like house cleaning or grocery delivery.</li>
              <li><strong>Reduce commute time:</strong> Negotiate remote work days or consider moving closer to your workplace.</li>
              <li><strong>Unplug from technology:</strong> Reclaim hours lost to mindless scrolling on social media.</li>
            </ul>
            <p>Understanding your current level of time affluence is the first step toward making meaningful changes. By calculating your obligated hours versus your free time, you can objectively see where your time goes each week.</p>
            <p>Remember, time is a non-renewable resource. Unlike money, you cannot earn more of it once it's gone. Striving for a balance where you feel "Time Wealthy" allows you to enjoy life's simple pleasures, invest in relationships, and maintain your physical and mental health. Take a step back, evaluate your weekly routine, and see where you can carve out more precious time for yourself.</p>
          </>
        ) : (
          <>
            <p>ในสังคมสมัยใหม่ เรามักวัดความมั่งคั่งด้วยจำนวนเงินในบัญชีธนาคารเท่านั้น อย่างไรก็ตาม ตัวชี้วัดที่สำคัญอีกประการหนึ่งสำหรับความอยู่ดีมีสุขคือ "ความมั่งคั่งทางเวลา" (Time Affluence) ซึ่งหมายถึงความรู้สึกว่ามีเวลาเพียงพอที่จะทำกิจกรรมที่มีความหมายและสร้างความพึงพอใจส่วนตัว</p>
            <p>การตกอยู่ในสภาวะ "ยากจนเวลา" (Time Poor) เกิดขึ้นเมื่อวันเวลาของเราเต็มไปด้วยภาระผูกพัน เช่น การทำงาน การเดินทางที่ยาวนาน และงานบ้านที่ไม่มีวันจบสิ้น ทำให้เราแทบไม่มีหรือไม่มีเวลาเลยสำหรับการพักผ่อน งานอดิเรก หรืองานสานสัมพันธ์กับคนที่รัก งานวิจัยแสดงให้เห็นอย่างสม่ำเสมอว่าความมั่งคั่งทางเวลามีความเชื่อมโยงอย่างมากกับระดับความสุขที่สูงขึ้นและความเครียดที่ลดลง</p>
            <h3>วิธีเพิ่มความมั่งคั่งทางเวลาของคุณ</h3>
            <ul>
              <li><strong>จัดลำดับความสำคัญอย่างเด็ดขาด:</strong> เรียนรู้ที่จะปฏิเสธข้อผูกมัดที่ไม่สอดคล้องกับค่านิยมหลักหรือเป้าหมายของคุณ</li>
              <li><strong>จ้างงานคนอื่นทำแทน:</strong> หากคุณมีกำลังทรัพย์ ให้จ่ายเงินสำหรับบริการที่ช่วยประหยัดเวลา เช่น การทำความสะอาดบ้าน หรือการส่งของชำ</li>
              <li><strong>ลดเวลาในการเดินทาง:</strong> เจรจาขอวันทำงานจากที่บ้าน หรือพิจารณาย้ายที่อยู่ให้ใกล้ที่ทำงานมากขึ้น</li>
              <li><strong>ลดการใช้เทคโนโลยี:</strong> ทวงคืนเวลาที่สูญเสียไปกับการเลื่อนดูโซเชียลมีเดียอย่างไร้จุดหมาย</li>
            </ul>
            <p>การเข้าใจระดับความมั่งคั่งทางเวลาในปัจจุบันของคุณเป็นก้าวแรกสู่การสร้างการเปลี่ยนแปลงที่มีความหมาย การคำนวณชั่วโมงที่ต้องทำตามหน้าที่เทียบกับเวลาว่าง จะช่วยให้คุณเห็นภาพรวมว่าเวลาของคุณหายไปไหนในแต่ละสัปดาห์ หลายคนอาจพบว่าตนเองมีเวลาน้อยกว่าที่คิด หรือในทางกลับกัน อาจพบว่ามีเวลาซ่อนเร้นที่สามารถนำมาใช้ประโยชน์ได้</p>
            <p>จำไว้ว่า เวลาเป็นทรัพยากรที่ใช้แล้วหมดไป ต่างจากเงินตรงที่คุณไม่สามารถหาเวลาเพิ่มได้เมื่อมันผ่านไปแล้ว การพยายามสร้างสมดุลให้ตนเองรู้สึก "มั่งคั่งทางเวลา" จะช่วยให้คุณสามารถเพลิดเพลินกับความสุขเรียบง่ายในชีวิต ลงทุนในความสัมพันธ์ และรักษาสุขภาพกายและสุขภาพจิตได้ ลองถอยออกมาหนึ่งก้าว ประเมินกิจวัตรประจำสัปดาห์ของคุณ และดูว่าคุณจะสามารถแบ่งปันเวลาอันมีค่าให้กับตัวเองได้มากขึ้นตรงจุดใด</p>
          </>
        )}
      </div>
    </div>
  );
}
