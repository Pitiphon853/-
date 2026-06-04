import React, { useState } from 'react';
import { Timer, AlertCircle, Wrench, Info, Clock } from 'lucide-react';

export default function MTTRCalculator({ lang }: any) {
  const isTH = lang === 'th';
  const [totalDowntime, setTotalDowntime] = useState<number | ''>('');
  const [numIncidents, setNumIncidents] = useState<number | ''>('');

  const calculateMTTR = () => {
    if (typeof totalDowntime === 'number' && typeof numIncidents === 'number' && numIncidents > 0) {
      return totalDowntime / numIncidents;
    }
    return null;
  };

  const mttrResult = calculateMTTR();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-gray-700">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <Timer className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isTH ? 'เครื่องคำนวณ MTTR (Mean Time to Repair)' : 'MTTR Calculator'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isTH 
              ? 'คำนวณระยะเวลาเฉลี่ยในการซ่อมแซมระบบหรืออุปกรณ์หลังจากเกิดเหตุขัดข้อง'
              : 'Calculate the average time to repair a system or equipment after a failure'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'เวลาระบบหยุดชะงักทั้งหมด (ชั่วโมง)' : 'Total Downtime (Hours)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="0.1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isTH ? "เช่น 12.5" : "e.g. 12.5"}
                value={totalDowntime}
                onChange={(e) => setTotalDowntime(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'จำนวนเหตุการณ์ที่ขัดข้อง (ครั้ง)' : 'Number of Incidents'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isTH ? "เช่น 5" : "e.g. 5"}
                value={numIncidents}
                onChange={(e) => setNumIncidents(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 text-center">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
              {isTH ? 'MTTR (เวลาเฉลี่ยในการซ่อมแซม)' : 'MTTR (Mean Time to Repair)'}
            </h3>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {mttrResult !== null ? mttrResult.toFixed(2) : '-'}
            </div>
            <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
              {isTH ? 'ชั่วโมง/ครั้ง' : 'Hours/Incident'}
            </p>
          </div>
          
          <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <p>
              {isTH 
                ? 'สูตรการคำนวณ: MTTR = เวลาระบบหยุดชะงักทั้งหมด / จำนวนเหตุการณ์ขัดข้อง'
                : 'Formula: MTTR = Total Downtime / Number of Incidents'}
            </p>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-blue-500" />
            MTTR (Mean Time to Repair) คืออะไร? และสำคัญอย่างไรกับธุรกิจของคุณ
          </h3>
          <p className="mb-4">
            ในยุคดิจิทัลที่เทคโนโลยีเข้ามามีบทบาทสำคัญในการขับเคลื่อนธุรกิจ ความเสถียรและความพร้อมใช้งานของระบบ (System Availability) ถือเป็นหัวใจหลักที่ส่งผลต่อรายได้และความน่าเชื่อถือขององค์กร แต่ในโลกความเป็นจริง ระบบและอุปกรณ์ไอทีต่างๆ ย่อมมีโอกาสที่จะเกิดเหตุขัดข้อง (Downtime) ได้เสมอ ไม่ว่าจะเป็นปัญหาฮาร์ดแวร์ ซอฟต์แวร์ หรือการโจมตีทางไซเบอร์ คำถามที่สำคัญคือ เมื่อเกิดปัญหาขึ้น ทีมงานของคุณสามารถกู้คืนระบบให้กลับมาทำงานได้รวดเร็วแค่ไหน? นี่คือจุดที่ <strong>MTTR (Mean Time to Repair)</strong> เข้ามามีบทบาทสำคัญ
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ทำความเข้าใจความหมายของ MTTR
          </h4>
          <p className="mb-4">
            MTTR ย่อมาจาก Mean Time to Repair หมายถึง "ระยะเวลาเฉลี่ยในการซ่อมแซม" ระบบ อุปกรณ์ หรือบริการที่เกิดเหตุขัดข้อง ให้กลับมาใช้งานได้ตามปกติอีกครั้ง โดยระยะเวลานี้จะเริ่มต้นนับตั้งแต่ที่มีการตรวจพบปัญหา ไปจนถึงขั้นตอนการวินิจฉัย การลงมือแก้ไข และการทดสอบระบบจนมั่นใจว่ากลับมาทำงานได้อย่างสมบูรณ์
          </p>
          <p className="mb-4">
            บางครั้งตัวอักษร R อาจหมายถึง Mean Time to <em>Recovery</em>, Mean Time to <em>Respond</em>, หรือ Mean Time to <em>Resolve</em> ซึ่งมีความหมายแตกต่างกันเล็กน้อยในรายละเอียดของขั้นตอน แต่โดยรวมแล้วคือการวัดความรวดเร็วในการจัดการกับเหตุขัดข้องนั่นเอง
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            วิธีการคำนวณ MTTR
          </h4>
          <p className="mb-4">
            การคำนวณ MTTR นั้นทำได้ง่ายมาก โดยใช้สูตร:
            <br />
            <strong className="text-blue-600 dark:text-blue-400">MTTR = เวลาระบบหยุดชะงักทั้งหมด (Total Downtime) / จำนวนเหตุการณ์ขัดข้อง (Number of Incidents)</strong>
          </p>
          <p className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <strong>ตัวอย่าง:</strong> หากในเดือนที่ผ่านมาระบบเซิร์ฟเวอร์ของคุณมีปัญหาขัดข้องจำนวน 3 ครั้ง โดยครั้งแรกใช้เวลาแก้ไข 2 ชั่วโมง ครั้งที่สอง 1 ชั่วโมง และครั้งที่สาม 3 ชั่วโมง รวมเวลาที่ระบบหยุดชะงักทั้งสิ้น 6 ชั่วโมง
            <br /><br />
            การคำนวณ: MTTR = 6 ชั่วโมง / 3 ครั้ง = <strong>2 ชั่วโมงต่อครั้ง</strong>
            <br />
            นั่นหมายความว่า โดยเฉลี่ยแล้วทีมงานของคุณใช้เวลา 2 ชั่วโมงในการแก้ไขปัญหาแต่ละครั้ง
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ทำไมองค์กรถึงต้องให้ความสำคัญกับ MTTR?
          </h4>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>ลดความสูญเสียทางธุรกิจ (Minimize Financial Loss):</strong> ทุกนาทีที่ระบบล่มหมายถึงรายได้ที่หายไป โดยเฉพาะธุรกิจ E-commerce หรือบริการออนไลน์ การมี MTTR ที่ต่ำจะช่วยลดความสูญเสียเหล่านี้ได้
            </li>
            <li>
              <strong>รักษาความพึงพอใจของลูกค้า (Customer Satisfaction):</strong> ลูกค้าในปัจจุบันคาดหวังบริการที่ใช้งานได้ตลอด 24/7 หากระบบขัดข้องบ่อยและใช้เวลานานในการแก้ไข ลูกค้าอาจเปลี่ยนไปใช้บริการของคู่แข่งได้ทันที
            </li>
            <li>
              <strong>ตัวชี้วัดประสิทธิภาพการทำงาน (Performance Metric):</strong> MTTR เป็นหนึ่งใน KPI สำคัญที่ใช้ประเมินประสิทธิภาพการทำงานของทีม IT Support, DevOps และ SRE (Site Reliability Engineering)
            </li>
            <li>
              <strong>ปรับปรุงกระบวนการตอบสนอง (Incident Response):</strong> การติดตาม MTTR ช่วยให้องค์กรมองเห็นจุดอ่อนในกระบวนการแก้ไขปัญหา และนำไปสู่การปรับปรุงขั้นตอนหรือจัดหาเครื่องมือใหม่ๆ เข้ามาช่วย
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            วิธีลดค่า MTTR เพื่อให้ระบบกลับมาทำงานเร็วขึ้น
          </h4>
          <p className="mb-4">
            การทำให้ MTTR มีค่าน้อยที่สุดเท่าที่จะทำได้คือเป้าหมายของทุกองค์กร ซึ่งสามารถทำได้ผ่านแนวทางต่างๆ ดังนี้:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>ติดตั้งระบบ Monitoring และ Alert ที่มีประสิทธิภาพ:</strong> การรู้ว่าเกิดปัญหาให้เร็วที่สุดคือจุดเริ่มต้นของการแก้ไขที่รวดเร็ว</li>
            <li><strong>จัดทำคู่มือ Runbooks และ Playbooks:</strong> เตรียมขั้นตอนการแก้ไขปัญหาที่พบบ่อยไว้ล่วงหน้า เพื่อให้ทีมงานสามารถทำตามได้ทันทีโดยไม่ต้องเสียเวลาหาสาเหตุใหม่ตั้งแต่ต้น</li>
            <li><strong>เสริมสร้างทักษะของทีมงาน:</strong> การอบรมและพัฒนาทักษะของทีมวิศวกรให้สามารถวินิจฉัยปัญหาได้อย่างแม่นยำ</li>
            <li><strong>ใช้เครื่องมือ Automation:</strong> นำระบบอัตโนมัติมาช่วยในการกู้คืนระบบเบื้องต้น เช่น การรีสตาร์ทเซอร์วิส หรือการสลับไปใช้เซิร์ฟเวอร์สำรอง (Failover)</li>
          </ol>

          <p className="mt-4 text-gray-500 dark:text-gray-400 italic bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-500">
            การวัดผลและการปรับปรุง MTTR อย่างต่อเนื่อง ไม่เพียงแต่ช่วยให้ระบบไอทีของคุณมีความเสถียรมากขึ้น แต่ยังเป็นการสร้างรากฐานที่แข็งแกร่งสำหรับการเติบโตของธุรกิจในระยะยาว ลองใช้เครื่องคำนวณด้านบนเพื่อประเมินประสิทธิภาพการทำงานของทีมคุณตั้งแต่วันนี้!
          </p>
        </article>
      )}
    </div>
  );
}
