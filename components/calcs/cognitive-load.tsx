import React, { useState } from 'react';
import { Brain, ListTodo, Users, ArrowRightLeft, Focus, Clock, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function CognitiveLoad({ lang }: { lang: 'TH' | 'EN' }) {
  const [tasks, setTasks] = useState<number>(5);
  const [meetings, setMeetings] = useState<number>(2);
  const [contextSwitching, setContextSwitching] = useState<number>(1.2);
  const [deepFocus, setDeepFocus] = useState<number>(2);
  const [adminWork, setAdminWork] = useState<number>(2);

  const calculateScore = () => {
    const baseScore = (tasks * 5) + (meetings * 10) + (deepFocus * 10) + (adminWork * 5);
    const totalScore = baseScore * contextSwitching;
    return Math.round(totalScore);
  };

  const score = calculateScore();

  const t = {
    title: lang === 'TH' ? 'ประเมินภาระทางปัญญา (Cognitive Load)' : 'Daily Cognitive Load Score',
    tasks: lang === 'TH' ? 'จำนวนงาน/โปรเจกต์ที่ทำวันนี้' : 'Number of tasks/projects today',
    meetings: lang === 'TH' ? 'จำนวนการประชุม' : 'Number of meetings',
    contextSwitch: lang === 'TH' ? 'ความถี่ในการสลับงาน (Context Switching)' : 'Context Switching Frequency',
    switchLow: lang === 'TH' ? 'ต่ำ (โฟกัสงานยาวๆ ได้)' : 'Low (Long focus blocks)',
    switchMed: lang === 'TH' ? 'ปานกลาง (มีคนทักบ้าง)' : 'Medium (Occasional interruptions)',
    switchHigh: lang === 'TH' ? 'สูง (ตอบแชทสลับทำงานบ่อย)' : 'High (Frequent chat & work)',
    switchConstant: lang === 'TH' ? 'ตลอดเวลา (งานด่วนแทรกตลอด)' : 'Constant (Always interrupted)',
    deepFocus: lang === 'TH' ? 'ชั่วโมงการทำงานแบบโฟกัสลึก (Deep Work)' : 'Deep focus work (hours)',
    adminWork: lang === 'TH' ? 'ชั่วโมงการทำงานทั่วไป/เอกสาร (Admin Work)' : 'Administrative work (hours)',
    resultTitle: lang === 'TH' ? 'คะแนนภาระสมองของคุณ' : 'Your Cognitive Load Score',
    score: lang === 'TH' ? 'คะแนน' : 'Score',
    statusLow: lang === 'TH' ? 'ต่ำ (สบายๆ)' : 'Low (Relaxed)',
    statusOpt: lang === 'TH' ? 'เหมาะสม (ท้าทายกำลังดี)' : 'Optimal (Productive)',
    statusHigh: lang === 'TH' ? 'สูง (สมองเริ่มล้า)' : 'High (Fatiguing)',
    statusOver: lang === 'TH' ? 'วิกฤต (เสี่ยงหมดไฟ)' : 'Overload (Burnout risk)',
    advice: lang === 'TH' ? 'คำแนะนำ:' : 'Advice:',
    advLow: lang === 'TH' ? 'วันนี้สมองคุณทำงานแบบสบายๆ อาจจะหากิจกรรมท้าทายใหม่ๆ หรือเรียนรู้ทักษะเพิ่ม' : 'Your brain had a relaxed day. Consider taking on a new challenge or learning a skill.',
    advOpt: lang === 'TH' ? 'ยอดเยี่ยม! คุณบริหารพลังสมองได้ดีเยี่ยม ได้งานที่มีประสิทธิภาพและยังไม่ล้าจนเกินไป' : 'Excellent! You managed your brain power well. Productive without being overly exhausted.',
    advHigh: lang === 'TH' ? 'สมองคุณทำงานหนักมากในวันนี้ แนะนำให้ลดการสลับงานไปมา และควรพักผ่อนให้เต็มที่ในคืนนี้' : 'Your brain worked very hard today. Try to reduce context switching and get a good night rest.',
    advOver: lang === 'TH' ? 'อันตราย! สมองคุณรับภาระหนักเกินไป เสี่ยงต่อภาวะหมดไฟ (Burnout) ควรปฏิเสธงานแทรกและจัดลำดับความสำคัญใหม่ด่วน' : 'Danger! Extreme cognitive overload. High risk of burnout. You need to say no to interruptions and re-prioritize.',
  };

  const getStatus = (s: number) => {
    if (s < 40) return { label: t.statusLow, color: 'text-green-600', bg: 'bg-green-100', icon: ShieldCheck, adv: t.advLow };
    if (s <= 75) return { label: t.statusOpt, color: 'text-blue-600', bg: 'bg-blue-100', icon: Zap, adv: t.advOpt };
    if (s <= 110) return { label: t.statusHigh, color: 'text-orange-600', bg: 'bg-orange-100', icon: AlertTriangle, adv: t.advHigh };
    return { label: t.statusOver, color: 'text-red-600', bg: 'bg-red-100', icon: Brain, adv: t.advOver };
  };

  const status = getStatus(score);
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-100">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <ListTodo className="w-4 h-4 mr-2 text-purple-500" />
                  {t.tasks}
                </label>
                <input
                  type="number"
                  min="0"
                  value={tasks}
                  onChange={(e) => setTasks(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  {t.meetings}
                </label>
                <input
                  type="number"
                  min="0"
                  value={meetings}
                  onChange={(e) => setMeetings(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Focus className="w-4 h-4 mr-2 text-purple-500" />
                  {t.deepFocus}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={deepFocus}
                  onChange={(e) => setDeepFocus(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-500" />
                  {t.adminWork}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={adminWork}
                  onChange={(e) => setAdminWork(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <ArrowRightLeft className="w-4 h-4 mr-2 text-purple-500" />
                {t.contextSwitch}
              </label>
              <select
                value={contextSwitching}
                onChange={(e) => setContextSwitching(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              >
                <option value={1.0}>{t.switchLow}</option>
                <option value={1.2}>{t.switchMed}</option>
                <option value={1.5}>{t.switchHigh}</option>
                <option value={2.0}>{t.switchConstant}</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className={`h-full rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden ${status.bg} border border-white/50 shadow-inner`}>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <h3 className="text-gray-700 font-semibold">{t.resultTitle}</h3>
                
                <div className="flex items-baseline space-x-1">
                  <span className={`text-6xl font-black ${status.color}`}>{score}</span>
                  <span className="text-gray-500 font-medium">/ 100+</span>
                </div>

                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/60 font-bold ${status.color} shadow-sm`}>
                  <StatusIcon className="w-5 h-5 mr-2" />
                  {status.label}
                </div>

                <div className="mt-6 pt-6 border-t border-black/5 text-left">
                  <span className="block text-sm font-bold text-gray-800 mb-2">{t.advice}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {status.adv}
                  </p>
                </div>
              </div>
              
              {/* Background decoration */}
              <Brain className={`absolute -bottom-10 -right-10 w-48 h-48 opacity-5 ${status.color}`} />
            </div>
          </div>
        </div>
      </div>

      {lang === 'TH' && (
        <article className="prose prose-purple max-w-none bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <Brain className="w-6 h-6 mr-3 text-purple-600" />
            Cognitive Load: เมื่อสมองรับภาระหนักเกินไป และวิธีป้องกันภาวะสมองล้า
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            คุณเคยทำงานไปได้แค่ครึ่งวัน แต่กลับรู้สึกเหนื่อยล้าเหมือนวิ่งมาราธอนมาหรือไม่? อาการนี้ไม่ได้เกิดจากร่างกายที่เหนื่อยล้า แต่เป็น <strong>"สมอง"</strong> ที่ทำงานหนักเกินไป สิ่งนี้ในทางจิตวิทยาเรียกว่า <strong>Cognitive Load หรือ ภาระทางปัญญา</strong> ซึ่งเป็นตัวแปรสำคัญที่กำหนดประสิทธิภาพการทำงานและความเสี่ยงในการเกิดภาวะหมดไฟ (Burnout) ของคุณในยุคปัจจุบัน
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Cognitive Load คืออะไร?</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Cognitive Load คือปริมาณความพยายามทางสมอง (Mental Effort) ที่ถูกใช้ไปในหน่วยความจำขณะทำงาน (Working Memory) ซึ่งสมองของคนเรามีพื้นที่จำกัด เปรียบเหมือน RAM ของคอมพิวเตอร์ หากเราเปิดโปรแกรมหลายๆ ตัวพร้อมกัน เครื่องก็จะเริ่มอืดและค้าง สมองของเราก็เช่นเดียวกัน หากรับข้อมูลหรืองานมากเกินไป ก็จะเกิดภาวะ <strong>Overload</strong>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">ประเภทของ Cognitive Load</h3>
          <ul className="space-y-4 text-gray-600 mb-6">
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Intrinsic Load (ภาระโดยธรรมชาติของงาน):</strong> ความยากง่ายของตัวงานเอง เช่น การเขียนโค้ดโปรแกรมที่ซับซ้อน ย่อมใช้สมองมากกว่าการตอบอีเมลทั่วไป
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Extraneous Load (ภาระส่วนเกิน):</strong> สิ่งรบกวนที่ไม่เกี่ยวกับงานหลัก เช่น เสียงดัง การจัดรูปแบบไฟล์ที่ซับซ้อน หรือระบบที่ใช้งานยาก ภาระส่วนนี้เราควร <em>ลดให้เหลือน้อยที่สุด</em>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Germane Load (ภาระเพื่อการเรียนรู้):</strong> การใช้สมองเพื่อสร้างความเข้าใจและเก็บข้อมูลเป็นความทรงจำระยะยาว เป็นภาระที่ <em>มีประโยชน์</em> ต่อการพัฒนาตัวเอง
              </div>
            </li>
          </ul>

          <div className="bg-purple-50 p-6 rounded-xl my-8 border border-purple-100">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
              <ArrowRightLeft className="w-5 h-5 mr-2" />
              ภัยร้ายที่มองไม่เห็น: Context Switching
            </h3>
            <p className="text-purple-700 leading-relaxed">
              การสลับงานไปมา (Context Switching) เช่น การพิมพ์เอกสารอยู่แล้วสลับไปตอบแชท จากนั้นกลับมาทำเอกสารต่อ เป็นตัวการสำคัญที่ทำให้ Cognitive Load พุ่งสูงปรี๊ด งานวิจัยพบว่าทุกครั้งที่คุณถูกขัดจังหวะ สมองต้องใช้เวลาเฉลี่ยถึง <strong>23 นาที</strong> ในการดึงสมาธิกลับมาจดจ่อกับงานเดิมได้ลึกซึ้งเท่าเดิม!
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">วิธีบริหารจัดการ Cognitive Load ให้มีประสิทธิภาพ</h3>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li><strong>1. ทำงานแบบ Time Blocking:</strong> จัดสรรเวลาสำหรับ Deep Work ปิดแจ้งเตือนทุกอย่างเพื่อลด Context Switching</li>
            <li><strong>2. ลดการตัดสินใจยิบย่อย:</strong> เตรียมชุดที่จะใส่ หรืออาหารที่จะกินล่วงหน้า เพื่อเก็บพลังสมองไว้ตัดสินใจเรื่องสำคัญ</li>
            <li><strong>3. จดบันทึกแทนการจำ (Externalize):</strong> อย่าพยายามจำทุกอย่างไว้ในหัว ให้จดลงสมุดหรือแอปพลิเคชัน เพื่อเคลียร์พื้นที่ Working Memory</li>
            <li><strong>4. พักผ่อนสมอง (Brain Break):</strong> การเดินเล่น มองต้นไม้ หรือหลับตาเฉยๆ โดยไม่ไถมือถือ ช่วยล้างขยะในสมองและลด Cognitive Load ได้ดีที่สุด</li>
          </ul>

          <p className="text-gray-600 leading-relaxed font-medium bg-gray-50 p-4 rounded-lg">
            การประเมินคะแนน Cognitive Load ในแต่ละวัน จะช่วยให้คุณรู้ลิมิตของตัวเอง หากวันไหนคะแนนพุ่งสูงปรี๊ด จงอนุญาตให้ตัวเองได้พักผ่อนอย่างเต็มที่ เพราะ "สมองที่ได้พัก คือสมองที่พร้อมสร้างสรรค์สิ่งใหม่"
          </p>
        </article>
      )}
    </div>
  );
}
