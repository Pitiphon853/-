import React, { useState } from 'react';
import { Activity, AlertTriangle, Clock, Info, ShieldCheck } from 'lucide-react';

export default function MTBFCalculator({ lang }: any) {
  const isTH = lang === 'th';
  const [totalTime, setTotalTime] = useState<number | ''>('');
  const [totalDowntime, setTotalDowntime] = useState<number | ''>('');
  const [numFailures, setNumFailures] = useState<number | ''>('');

  const calculateMTBF = () => {
    if (
      typeof totalTime === 'number' &&
      typeof totalDowntime === 'number' &&
      typeof numFailures === 'number' &&
      numFailures > 0 &&
      totalTime >= totalDowntime
    ) {
      const totalUptime = totalTime - totalDowntime;
      return totalUptime / numFailures;
    }
    return null;
  };

  const mtbfResult = calculateMTBF();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-gray-700">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
          <Activity className="w-6 h-6 text-green-600 dark:text-green-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isTH ? 'เครื่องคำนวณ MTBF (Mean Time Between Failures)' : 'MTBF Calculator'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isTH 
              ? 'คำนวณระยะเวลาเฉลี่ยที่ระบบสามารถทำงานได้ตามปกติก่อนเกิดการขัดข้องครั้งถัดไป'
              : 'Calculate the average time a system operates normally between failures'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'เวลาปฏิบัติงานทั้งหมด (ชั่วโมง)' : 'Total Operation Time (Hours)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                placeholder={isTH ? "เช่น 720 (สำหรับ 1 เดือน)" : "e.g. 720 (for 1 month)"}
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'เวลาระบบหยุดชะงักทั้งหมด (ชั่วโมง)' : 'Total Downtime (Hours)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AlertTriangle className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="0.1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                placeholder={isTH ? "เช่น 12" : "e.g. 12"}
                value={totalDowntime}
                onChange={(e) => setTotalDowntime(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'จำนวนครั้งที่เกิดปัญหา (ครั้ง)' : 'Number of Failures'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="1"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                placeholder={isTH ? "เช่น 3" : "e.g. 3"}
                value={numFailures}
                onChange={(e) => setNumFailures(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800 text-center">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
              {isTH ? 'MTBF (เวลาเฉลี่ยระหว่างการขัดข้อง)' : 'MTBF (Mean Time Between Failures)'}
            </h3>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {mtbfResult !== null ? mtbfResult.toFixed(2) : '-'}
            </div>
            <p className="text-sm text-green-600/80 dark:text-green-300/80">
              {isTH ? 'ชั่วโมง' : 'Hours'}
            </p>
          </div>
          
          <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Info className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">
                {isTH ? 'สูตรการคำนวณ:' : 'Formula:'}
              </p>
              <p>
                {isTH 
                  ? 'MTBF = (เวลาปฏิบัติงานทั้งหมด - เวลาระบบหยุดชะงัก) / จำนวนครั้งที่เกิดปัญหา'
                  : 'MTBF = (Total Operation Time - Total Downtime) / Number of Failures'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 prose prose-green dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            MTBF (Mean Time Between Failures) คืออะไร? ดัชนีชี้วัดความน่าเชื่อถือของระบบ
          </h3>
          <p className="mb-4">
            ในโลกของการบริหารจัดการระบบไอที (IT Service Management) และวิศวกรรมความน่าเชื่อถือ (Reliability Engineering) การทำให้ระบบสามารถทำงานได้อย่างต่อเนื่องและมีเสถียรภาพคือเป้าหมายสูงสุด ตัวชี้วัดหนึ่งที่ได้รับความนิยมและมีความสำคัญอย่างยิ่งในการประเมินประสิทธิภาพการทำงานของฮาร์ดแวร์และซอฟต์แวร์คือ <strong>MTBF หรือ Mean Time Between Failures</strong> บทความนี้จะพาคุณไปทำความรู้จักกับ MTBF อย่างละเอียด พร้อมวิธีคำนวณและการนำไปประยุกต์ใช้เพื่อยกระดับระบบไอทีของคุณ
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            MTBF คืออะไร?
          </h4>
          <p className="mb-4">
            <strong>MTBF (Mean Time Between Failures)</strong> คือ "ระยะเวลาเฉลี่ยระหว่างการเกิดเหตุขัดข้องแต่ละครั้ง" เป็นตัวชี้วัดความน่าเชื่อถือ (Reliability) ของอุปกรณ์ ระบบ หรือแอปพลิเคชัน ว่าสามารถทำงานได้อย่างปกติต่อเนื่องเป็นระยะเวลานานเท่าใดก่อนที่จะเกิดปัญหาขัดข้อง (Failure) ในครั้งถัดไป
          </p>
          <p className="mb-4">
            โดยปกติแล้ว MTBF จะใช้สำหรับวัดระบบหรืออุปกรณ์ที่ "สามารถซ่อมแซมได้" (Repairable Items) หากเป็นอุปกรณ์ที่เสียแล้วต้องทิ้งอย่างเดียว จะใช้ตัวชี้วัดที่เรียกว่า MTTF (Mean Time To Failure) แทน การมีค่า MTBF ที่สูง บ่งบอกว่าระบบของคุณมีความเสถียรสูงและมีโอกาสเกิดปัญหาน้อย
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            วิธีการคำนวณ MTBF อย่างถูกต้อง
          </h4>
          <p className="mb-4">
            การคำนวณ MTBF จะพิจารณาเฉพาะ "เวลาที่ระบบทำงานได้จริง" (Uptime) โดยหักเวลาที่ระบบหยุดชะงัก (Downtime) ออกไป จากนั้นหารด้วยจำนวนครั้งที่เกิดปัญหา
            <br /><br />
            <strong className="text-green-600 dark:text-green-400">สูตรคำนวณ: MTBF = (เวลาเปิดใช้งานทั้งหมด - เวลาที่ระบบขัดข้อง) / จำนวนครั้งที่เกิดข้อผิดพลาด</strong>
          </p>
          <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <strong>ตัวอย่างการคำนวณ:</strong> สมมติว่าคุณต้องการประเมินการทำงานของเซิร์ฟเวอร์ในระยะเวลา 1 เดือน (30 วัน = 720 ชั่วโมง)
            <ul className="list-disc pl-6 mt-2">
              <li>เวลาประเมินทั้งหมด (Total Time): 720 ชั่วโมง</li>
              <li>เกิดเซิร์ฟเวอร์ล่ม 3 ครั้ง รวมระยะเวลาดาวน์ไทม์ทั้งหมด (Total Downtime): 12 ชั่วโมง</li>
              <li>จำนวนครั้งที่ล่ม (Number of Failures): 3 ครั้ง</li>
            </ul>
            <p className="mt-2">
              <strong>การคำนวณ:</strong>
              <br />
              Uptime = 720 - 12 = 708 ชั่วโมง
              <br />
              MTBF = 708 / 3 = <strong>236 ชั่วโมง</strong>
            </p>
            <p className="mt-2 text-sm">
              * สรุปได้ว่า เซิร์ฟเวอร์ตัวนี้สามารถทำงานได้อย่างต่อเนื่องโดยเฉลี่ย 236 ชั่วโมง (ประมาณเกือบ 10 วัน) ก่อนที่จะมีโอกาสล่มหนึ่งครั้ง
            </p>
          </div>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ทำไม MTBF จึงสำคัญต่อธุรกิจ?
          </h4>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>การวางแผนบำรุงรักษา (Maintenance Planning):</strong> การทราบค่า MTBF ช่วยให้ทีม IT สามารถคาดการณ์และวางแผนการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance) ได้ก่อนที่ระบบจะล่มจริงๆ
            </li>
            <li>
              <strong>การตัดสินใจจัดซื้อ (Purchasing Decisions):</strong> ใช้เป็นเกณฑ์ในการเปรียบเทียบคุณภาพความทนทานของอุปกรณ์หรือซอฟต์แวร์จากแต่ละผู้ให้บริการ (Vendors)
            </li>
            <li>
              <strong>การคำนวณความพร้อมใช้งาน (Availability):</strong> MTBF มักถูกนำไปใช้ร่วมกับ MTTR (ระยะเวลาเฉลี่ยในการซ่อมแซม) เพื่อคำนวณเปอร์เซ็นต์ Uptime ซึ่งเป็นส่วนสำคัญในการทำ SLA (Service Level Agreement)
            </li>
            <li>
              <strong>การจัดการสต๊อกอะไหล่ (Inventory Management):</strong> ช่วยให้ทราบว่าควรเตรียมอะไหล่สำรอง (Spare parts) ไว้ในคลังมากน้อยเพียงใด เพื่อไม่ให้เกิดความล่าช้าเมื่อต้องซ่อมแซม
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            วิธีเพิ่มค่า MTBF ให้ระบบของคุณ
          </h4>
          <p className="mb-4">
            หากค่า MTBF ต่ำเกินไป แสดงว่าระบบมีปัญหาบ่อย วิธีเพิ่มค่า MTBF ได้แก่:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>บำรุงรักษาเชิงรุก (Proactive Maintenance):</strong> ตรวจเช็คสภาพฮาร์ดแวร์และอัปเดตซอฟต์แวร์/แพตช์ความปลอดภัยอย่างสม่ำเสมอ</li>
            <li><strong>ใช้ส่วนประกอบที่มีคุณภาพ:</strong> เลือกใช้ฮาร์ดแวร์ระดับ Enterprise ที่ทนทาน หรือบริการ Cloud ที่มีชื่อเสียงด้านความเสถียร</li>
            <li><strong>ออกแบบระบบแบบ Redundancy:</strong> การมีระบบสำรอง (เช่น เครือข่ายสำรอง, พาวเวอร์ซัพพลายสำรอง) จะช่วยลดโอกาสที่ระบบโดยรวมจะเกิด Failure อย่างสมบูรณ์</li>
            <li><strong>การวิเคราะห์สาเหตุที่แท้จริง (Root Cause Analysis - RCA):</strong> เมื่อเกิดปัญหา ไม่ควรแค่ซ่อมให้เสร็จ แต่ต้องหาสาเหตุหลักและแก้ไขที่ต้นตอเพื่อไม่ให้เกิดซ้ำ</li>
          </ol>

          <p className="mt-4 text-gray-500 dark:text-gray-400 italic bg-green-50/50 dark:bg-green-900/10 p-4 rounded-lg border-l-4 border-green-500">
            MTBF เป็นดัชนีชี้วัดที่ทรงพลังในการสะท้อน "สุขภาพ" ของระบบไอทีในองค์กรของคุณ การติดตามและปรับปรุงค่า MTBF อย่างต่อเนื่องจะช่วยลดความเสี่ยงจากการหยุดชะงักของธุรกิจ (Business Interruption) และสร้างความมั่นใจให้กับผู้ใช้งาน คุณสามารถใช้เครื่องมือด้านบนเพื่อเริ่มประเมิน MTBF ของระบบคุณได้ทันที!
          </p>
        </article>
      )}
    </div>
  );
}
