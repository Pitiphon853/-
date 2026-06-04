import React, { useState } from 'react';
import { Layers, Clock, Timer, Zap, CheckCircle, Info } from 'lucide-react';

export default function TaskBatchingCalculator({ lang }: any) {
  const [tasks, setTasks] = useState<number>(10);
  const [taskTime, setTaskTime] = useState<number>(5);
  const [contextSwitchTime, setContextSwitchTime] = useState<number>(15);
  const [batchSetupTime, setBatchSetupTime] = useState<number>(10);

  const timeWithoutBatching = tasks * (taskTime + contextSwitchTime);
  const timeWithBatching = batchSetupTime + (tasks * taskTime);
  const timeSaved = Math.max(0, timeWithoutBatching - timeWithBatching);
  const percentageSaved = timeWithoutBatching > 0 ? (timeSaved / timeWithoutBatching) * 100 : 0;

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    if (h > 0 && m > 0) return `${h} ชม. ${m} นาที`;
    if (h > 0) return `${h} ชม.`;
    return `${m} นาที`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Task Batching Calculator' : 'เครื่องคิดเลขคำนวณ Task Batching'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Calculate how much time you save by grouping tasks.'
            : 'คำนวณเวลาที่คุณจะประหยัดได้จากการจัดกลุ่มงานไว้ทำพร้อมกัน'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'EN' ? 'Number of Tasks' : 'จำนวนงานทั้งหมด (ชิ้น)'}
            </label>
            <input
              type="number"
              value={tasks}
              onChange={(e) => setTasks(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'EN' ? 'Average Time per Task (mins)' : 'เวลาที่ใช้ทำงานเฉลี่ยต่อ 1 ชิ้น (นาที)'}
            </label>
            <input
              type="number"
              value={taskTime}
              onChange={(e) => setTaskTime(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'EN' ? 'Context Switch Time (mins per task)' : 'เวลาเตรียมตัว/สลับงานต่อ 1 ชิ้น (นาที)'}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {lang === 'EN' ? 'Time lost switching to a task if done separately.' : 'เวลาที่เสียไปกับการตั้งสติและสลับโปรแกรม หากทำงานแยกกัน'}
            </p>
            <input
              type="number"
              value={contextSwitchTime}
              onChange={(e) => setContextSwitchTime(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lang === 'EN' ? 'Batch Setup Time (mins)' : 'เวลาเตรียมตัวสำหรับการทำแบบรวมกลุ่ม (นาที)'}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {lang === 'EN' ? 'Setup time once for the whole batch.' : 'เวลาที่ใช้จัดเตรียมและตั้งสติก่อนลุยงานทั้งหมดรวดเดียว'}
            </p>
            <input
              type="number"
              value={batchSetupTime}
              onChange={(e) => setBatchSetupTime(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-300" />
              <h3 className="text-lg font-semibold">{lang === 'EN' ? 'Time Saved' : 'ประหยัดเวลาได้ทั้งหมด'}</h3>
            </div>
            <div className="text-4xl font-bold mb-1">{formatTime(timeSaved)}</div>
            <div className="text-blue-100 text-sm">
              {lang === 'EN' ? `Or ${percentageSaved.toFixed(1)}% of your time` : `คิดเป็น ${percentageSaved.toFixed(1)}% ของเวลาที่ใช้ทั้งหมด`}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'EN' ? 'Without Batching' : 'ถ้าไม่จัดกลุ่ม (ทำสลับไปมา)'}</span>
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{formatTime(timeWithoutBatching)}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400">
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'EN' ? 'With Batching' : 'ถ้าจัดกลุ่ม (Task Batching)'}</span>
              </div>
              <div className="text-xl font-bold text-green-800 dark:text-green-300">{formatTime(timeWithBatching)}</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200 flex gap-3">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p>
              {lang === 'EN' 
                ? 'Context switching is the invisible productivity killer. By grouping similar tasks, you eliminate the mental transition time between unrelated activities.' 
                : 'การสลับบริบท (Context Switching) คือตัวทำลายประสิทธิผลที่มองไม่เห็น การจัดกลุ่มงานช่วยลดเวลาที่คุณต้องใช้ตั้งสติและสลับความคิดระหว่างกิจกรรมที่แตกต่างกัน'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Batching คืออะไร และทำไมถึงช่วยประหยัดเวลาได้มหาศาล</h2>
        
        <p>
          คุณเคยรู้สึกไหมว่าทำงานทั้งวันแต่กลับรู้สึกว่างานไม่คืบหน้าเท่าที่ควร? หนึ่งในสาเหตุหลักคือสิ่งที่เราเรียกว่า <strong>"Context Switching"</strong> หรือการสลับบริบทการทำงานไปมา เช่น กำลังเขียนโค้ดอยู่ดีๆ ก็สลับไปตอบอีเมล หรือกำลังทำรายงานอยู่ก็มีแจ้งเตือนให้เข้าไปเช็คโซเชียลมีเดีย การสลับสมองจากงานรูปแบบหนึ่งไปยังอีกรูปแบบหนึ่งต้องใช้เวลา "ตั้งสติ" (Setup Time) เสมอ แม้จะเป็นเวลาเพียงแค่ไม่กี่นาที แต่เมื่อรวมกันทั้งวันแล้ว มันอาจกินเวลาของคุณไปนับชั่วโมง
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">ทฤษฎีเบื้องหลัง Task Batching</h3>
        <p>
          <strong>Task Batching (การจัดกลุ่มงาน)</strong> คือเทคนิคการบริหารเวลา (Time Management Technique) ที่นำงานที่มีลักษณะคล้ายคลึงกัน หรือต้องใช้ชุดความคิดและเครื่องมือแบบเดียวกัน มารวมไว้ทำพร้อมกันในคราวเดียว เพื่อลดต้นทุนแอบแฝงที่เกิดจากการสลับบริบท (Context Switch Penalty)
        </p>
        <p>
          ตัวอย่างเช่น แทนที่คุณจะเช็คอีเมลและตอบกลับทุกๆ 30 นาทีตลอดทั้งวัน (ซึ่งอาจจะต้องสลับหน้าจอไปมาถึง 16 ครั้ง) คุณเปลี่ยนมากำหนดเวลาเช็คอีเมลแค่วันละ 2 ครั้ง คือ 10:00 น. และ 15:00 น. ในช่วงเวลานั้นคุณจะตอบอีเมลทั้งหมด 20 ฉบับรวดเดียว วิธีนี้จะทำให้สมองของคุณเข้าสู่ "Flow State" ในการตอบอีเมล และใช้เวลาน้อยลงกว่าการทำแบบกระจัดกระจายอย่างแน่นอน
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">วิธีการนำ Task Batching ไปใช้ในชีวิตจริง</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>ระบุงานที่ต้องทำซ้ำๆ:</strong> จดรายการงานทั้งหมดที่คุณต้องทำเป็นประจำในแต่ละวันหรือแต่ละสัปดาห์</li>
          <li><strong>จัดกลุ่มตามบริบท:</strong> จับกลุ่มงานที่คล้ายกัน เช่น <em>กลุ่มงานติดต่อสื่อสาร</em> (ตอบอีเมล, โทรศัพท์, แชท), <em>กลุ่มงานสร้างสรรค์</em> (เขียนบทความ, ออกแบบ, วางแผน), <em>กลุ่มงานธุรการ</em> (จัดเอกสาร, อนุมัติงบ, ทำบัญชี)</li>
          <li><strong>บล็อกเวลา (Time Blocking):</strong> กำหนดช่วงเวลาเฉพาะเจาะจงในปฏิทินสำหรับการทำแต่ละกลุ่มงาน เช่น จัดเวลา 13:00 - 15:00 น. ของวันพุธ เพื่อประชุมติดต่อกันให้เสร็จสิ้น (Meeting Batching)</li>
          <li><strong>ปิดการแจ้งเตือนรบกวน:</strong> ขณะที่กำลังทำ Task Batching ควรงดรับการแจ้งเตือนจากแอปพลิเคชันอื่นๆ เพื่อให้สามารถโฟกัสกับกลุ่มงานนั้นได้อย่างเต็มที่ 100%</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">ข้อควรระวังในการทำ Task Batching</h3>
        <p>
          แม้ Task Batching จะมีประโยชน์อย่างมาก แต่ก็ไม่เหมาะกับทุกสถานการณ์เสมอไป หากงานของคุณเป็นงานที่ต้องแก้ไขปัญหาเฉพาะหน้าตลอดเวลา (เช่น ฝ่ายสนับสนุนลูกค้า หรือ Customer Support) การรวบรวมงานไว้ทำทีเดียวอาจจะทำให้ตอบสนองลูกค้าได้ช้าเกินไป นอกจากนี้ การ Batch งานที่ต้องใช้ความเครียดสูงมากเกินไปในคราวเดียว อาจจะทำให้เกิดภาวะสมองล้า (Burnout) ได้เร็วกว่าปกติ จึงควรพิจารณาความเหมาะสมและจัดช่วงพักเบรก (Pomodoro Technique) ควบคู่ไปด้วย
        </p>
        
        <p className="font-medium bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4 border border-gray-200 dark:border-gray-700">
          ลองใช้เครื่องคิดเลข Task Batching ด้านบนเพื่อคำนวณดูว่า ในหนึ่งสัปดาห์คุณสูญเสียเวลาไปกับการ "ตั้งสติ" หรือสลับบริบทการทำงานไปมากเท่าไร และจะประหยัดเวลาได้กี่ชั่วโมงหากคุณเริ่มจัดกลุ่มงานตั้งแต่วันนี้! ตัวเลขที่คุณเห็นอาจจะทำให้คุณตกใจเลยทีเดียว
        </p>
      </div>
    </div>
  );
}
