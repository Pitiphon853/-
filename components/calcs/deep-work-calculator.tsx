"use client";

import React, { useState } from 'react';
import { Brain, Clock, Users, Mail, FileText, Target, Zap, AlertTriangle } from 'lucide-react';

export default function DeepWorkCalculator({ lang }: { lang: 'TH' | 'EN' }) {
  const isTH = lang === 'TH';

  const [totalHours, setTotalHours] = useState<number>(8);
  const [meetingHours, setMeetingHours] = useState<number>(2);
  const [commHours, setCommHours] = useState<number>(1.5);
  const [adminHours, setAdminHours] = useState<number>(1);

  const shallowWorkHours = meetingHours + commHours + adminHours;
  const deepWorkHours = Math.max(0, totalHours - shallowWorkHours);

  const deepWorkPercent = totalHours > 0 ? (deepWorkHours / totalHours) * 100 : 0;
  const shallowWorkPercent = totalHours > 0 ? (shallowWorkHours / totalHours) * 100 : 0;

  const getStatus = (percent: number) => {
    if (percent >= 50) return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', text: isTH ? 'ดีเยี่ยม' : 'Excellent', icon: <Target className="w-6 h-6 text-emerald-600" /> };
    if (percent >= 25) return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', text: isTH ? 'ปานกลาง' : 'Moderate', icon: <Zap className="w-6 h-6 text-amber-600" /> };
    return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', text: isTH ? 'ต้องปรับปรุง' : 'Needs Improvement', icon: <AlertTriangle className="w-6 h-6 text-rose-600" /> };
  };

  const status = getStatus(deepWorkPercent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-700 p-6 text-white flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isTH ? "เครื่องมือคำนวณ Deep Work vs Shallow Work" : "Deep Work Calculator"}
            </h2>
            <p className="text-violet-100 mt-1">
              {isTH ? "วิเคราะห์สัดส่วนเวลาที่คุณใช้กับงานที่ต้องใช้สมาธิสูงเทียบกับงานทั่วไป" : "Analyze the ratio of high-focus work to shallow tasks."}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-600" />
              {isTH ? "การจัดสรรเวลา (ชั่วโมง/วัน)" : "Time Allocation (Hours/Day)"}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? "ชั่วโมงทำงานทั้งหมด" : "Total Work Hours"}
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={totalHours || ''}
                  onChange={(e) => setTotalHours(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-semibold"
                  min="1"
                  max="24"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {isTH ? "งานตื้น (Shallow Work Tasks)" : "Shallow Work Tasks"}
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                    <span>{isTH ? "เวลาเข้าประชุม" : "Meetings"}</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.5"
                      value={meetingHours || ''}
                      onChange={(e) => setMeetingHours(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                    <span>{isTH ? "เวลาตอบอีเมล/แชท" : "Emails & Chats"}</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.5"
                      value={commHours || ''}
                      onChange={(e) => setCommHours(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                    <span>{isTH ? "งานแอดมิน/เอกสารยิบย่อย" : "Admin & Misc"}</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.5"
                      value={adminHours || ''}
                      onChange={(e) => setAdminHours(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-600" />
              {isTH ? "ผลลัพธ์การวิเคราะห์" : "Analysis Result"}
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-semibold text-violet-900">{isTH ? "งานลึก (Deep Work)" : "Deep Work"}</span>
                  <span className="text-2xl font-bold text-violet-600">{deepWorkHours.toFixed(1)} {isTH ? "ชม." : "hrs"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-violet-600 h-4 rounded-full transition-all duration-500" style={{ width: `${Math.min(deepWorkPercent, 100)}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">{deepWorkPercent.toFixed(1)}% {isTH ? "ของเวลาทั้งหมด" : "of total time"}</p>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-semibold text-gray-700">{isTH ? "งานตื้น (Shallow Work)" : "Shallow Work"}</span>
                  <span className="text-2xl font-bold text-gray-500">{shallowWorkHours.toFixed(1)} {isTH ? "ชม." : "hrs"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gray-400 h-4 rounded-full transition-all duration-500" style={{ width: `${Math.min(shallowWorkPercent, 100)}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">{shallowWorkPercent.toFixed(1)}% {isTH ? "ของเวลาทั้งหมด" : "of total time"}</p>
              </div>

              <div className={`mt-6 p-5 rounded-xl border flex items-start gap-4 ${status.bg} ${status.border}`}>
                <div className={`p-2 rounded-full bg-white shadow-sm`}>
                  {status.icon}
                </div>
                <div>
                  <p className={`text-sm font-medium text-gray-800`}>
                    {isTH ? "สถานะการโฟกัส:" : "Focus Status:"} <span className={`font-bold ${status.color}`}>{status.text}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isTH 
                      ? (deepWorkPercent >= 50 ? "คุณบริหารจัดการเวลาสำหรับงานที่ใช้ความคิดสร้างสรรค์และสมาธิได้ดีเยี่ยม" : 
                         deepWorkPercent >= 25 ? "คุณยังมีเวลาสำหรับงานที่ต้องใช้สมาธิอยู่บ้าง แต่น่าจะลองลดงานยิบย่อยลงอีกนิด" : 
                         "ระวัง! คุณกำลังหมดเวลาไปกับงานยิบย่อยมากเกินไป จนอาจไม่มีเวลาสร้างผลงานที่มีอิมแพ็คสูง")
                      : (deepWorkPercent >= 50 ? "Excellent balance. You have ample time for high-impact focus work." : 
                         deepWorkPercent >= 25 ? "Moderate focus. Consider delegating or batching shallow tasks." : 
                         "Warning: Shallow tasks are consuming your day. You need to block time for deep focus.")}
                  </p>
                </div>
              </div>
              
              {shallowWorkHours > totalHours && (
                <div className="p-4 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">
                  {isTH ? "ข้อควรระวัง: เวลางานตื้นรวมกันมากกว่าเวลาทำงานทั้งหมด โปรดตรวจสอบตัวเลขอีกครั้ง" : "Warning: Shallow work hours exceed total work hours. Please check your inputs."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-violet max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Deep Work คืออะไร? ทำไมงานลึกถึงสร้างความแตกต่างในยุคนี้
          </h2>
          <p>
            แนวคิดเรื่อง <strong>Deep Work</strong> หรือ "การทำงานแบบดำดิ่ง" ถูกนำเสนอและทำให้โด่งดังโดย <em>Cal Newport</em> ศาสตราจารย์ด้านวิทยาการคอมพิวเตอร์และนักเขียน 
            เขาได้แบ่งประเภทของการทำงานออกเป็นสองฝั่งหลักๆ คือ <strong>Deep Work (งานลึก)</strong> และ <strong>Shallow Work (งานตื้น)</strong> 
            ซึ่งการทำความเข้าใจความแตกต่างของสองสิ่งนี้ คือกุญแจสำคัญสู่ความสำเร็จและการเพิ่ม Productivity อย่างแท้จริง
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ความแตกต่างระหว่าง Deep Work และ Shallow Work
          </h3>
          <ul>
            <li>
              <strong>Deep Work (งานลึก):</strong> คือกิจกรรมการทำงานที่ต้องใช้สมาธิสูง ดำเนินการในสภาวะที่ปราศจากการรบกวน 
              เป็นงานที่ดึงศักยภาพทางความคิดของคุณออกมาใช้จนถึงขีดสุด งานประเภทนี้มักสร้างมูลค่าใหม่ พัฒนาทักษะ และเป็นงานที่ลอกเลียนแบบได้ยาก 
              เช่น การเขียนบทความวิเคราะห์, การเขียนโค้ดโปรแกรมที่ซับซ้อน, การวางแผนกลยุทธ์ธุรกิจ หรือการออกแบบโครงสร้างสถาปัตยกรรม
            </li>
            <li>
              <strong>Shallow Work (งานตื้น):</strong> คือกิจกรรมที่ไม่ต้องใช้ความพยายามทางสมองมากนัก มักเป็นงานด้านโลจิสติกส์หรืองานแอดมิน 
              และสามารถทำได้แม้ขณะที่คุณถูกรบกวน เช่น การเช็คและตอบอีเมลทั่วไป, การเข้าร่วมการประชุมที่แจ้งเพื่อทราบ (Status update), 
              การจัดเรียงไฟล์ หรือการตอบข้อความแชท งานเหล่านี้แทบไม่สร้างมูลค่าใหม่ให้โลก และคนอื่นก็สามารถทำแทนได้ง่าย
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            ทำไม Deep Work ถึงกลายเป็นทักษะที่หายาก?
          </h3>
          <p>
            ในยุคที่ทุกอย่างเชื่อมต่อถึงกันด้วยอินเทอร์เน็ต เรามีเครื่องมือสื่อสารที่พร้อมจะขัดจังหวะเราทุกๆ 5 นาที ไม่ว่าจะเป็น LINE, Slack, Microsoft Teams 
            หรืออีเมล ทำให้เวลาที่คนส่วนใหญ่จะสามารถจดจ่อกับสิ่งใดสิ่งหนึ่งได้นานๆ ลดลงอย่างน่าตกใจ เมื่อเราคุ้นชินกับการสลับสับเปลี่ยนความสนใจไปมา (Context Switching) 
            สมองของเราจะสูญเสียความสามารถในการทำงานแบบ Deep Work ลงเรื่อยๆ ส่งผลให้เรายุ่งตลอดวัน แต่กลับสร้างสรรค์ผลงานชิ้นโบแดงไม่ได้เลย
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            วิธีเพิ่มสัดส่วน Deep Work ในชีวิตประจำวัน
          </h3>
          <ol>
            <li><strong>Time Blocking (ล็อกเวลาให้ชัดเจน):</strong> กำหนดตารางเวลาสำหรับ Deep Work ไว้ในปฏิทินล่วงหน้า เช่น 09:00 - 11:30 น. และปฏิบัติต่อช่วงเวลานั้นเหมือนเป็นการประชุมสำคัญที่คุณไม่สามารถยกเลิกได้</li>
            <li><strong>Batching Shallow Work:</strong> จัดกลุ่มงานตื้นๆ ไว้ทำพร้อมกันในรวดเดียว เช่น กำหนดเวลาเช็คและตอบอีเมลแค่วันละ 2 ครั้ง ตอน 11:30 น. และ 16:00 น. แทนที่จะเปิดหน้าต่างอีเมลทิ้งไว้ทั้งวัน</li>
            <li><strong>ฝึกฝนสมาธิ:</strong> การทำงานแบบ Deep Work ต้องใช้การฝึกฝนในช่วงแรก ลองเริ่มจากรอบละ 60 นาทีก่อน แล้วค่อยๆ ขยับเพิ่มเป็น 90 นาที หรือ 120 นาที</li>
            <li><strong>กำจัดสิ่งรบกวน:</strong> ปิด Notification โทรศัพท์มือถือ ปิดแท็บเบราว์เซอร์ที่ไม่เกี่ยวข้อง หรือหากต้องใช้ความเงียบขั้นสุด ลองใส่หูฟังตัดเสียงรบกวน (Noise Cancelling) ระหว่างที่เข้าสู่โหมด Deep Work</li>
          </ol>

          <p className="mt-6 font-semibold">
            สรุป: การประเมินตนเองด้วย Deep Work Calculator จะทำให้คุณเห็นความจริงว่า คุณสูญเสียเวลาไปกับ "ความยุ่งที่ว่างเปล่า" มากแค่ไหน 
            เป้าหมายไม่ใช่การกำจัด Shallow Work ให้เหลือศูนย์ เพราะบางงานก็เป็นสิ่งจำเป็นที่หลีกเลี่ยงไม่ได้ แต่คือการรักษาสมดุล 
            และปกป้องเวลาสำหรับ Deep Work ให้มากพอที่จะสร้างผลงานระดับมาสเตอร์พีซให้กับชีวิตการทำงานของคุณต่างหาก
          </p>
        </article>
      )}
    </div>
  );
}
