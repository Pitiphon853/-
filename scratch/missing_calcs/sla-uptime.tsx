import React, { useState } from 'react';
import { Percent, Clock, Calendar, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export default function SLAUptimeCalculator({ lang }: any) {
  const isTH = lang === 'th';
  const [slaPercentage, setSlaPercentage] = useState<number | ''>(99.9);

  // Time constants in seconds
  const secondsPerDay = 24 * 60 * 60;
  const secondsPerWeek = 7 * secondsPerDay;
  const secondsPerMonth = 30.436875 * secondsPerDay; // average month (365.2425 days / 12)
  const secondsPerYear = 365.2425 * secondsPerDay; // Gregorian year

  const formatDowntime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return isTH ? '0 วินาที' : '0 seconds';
    
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Number((totalSeconds % 60).toFixed(1));

    const parts = [];
    if (days > 0) parts.push(`${days} ${isTH ? 'วัน' : 'd'}`);
    if (hours > 0) parts.push(`${hours} ${isTH ? 'ชั่วโมง' : 'h'}`);
    if (minutes > 0) parts.push(`${minutes} ${isTH ? 'นาที' : 'm'}`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ${isTH ? 'วินาที' : 's'}`);

    return parts.join(' ');
  };

  const calculateDowntime = (periodSeconds: number) => {
    if (typeof slaPercentage !== 'number' || slaPercentage < 0 || slaPercentage > 100) return null;
    const downtimePercentage = (100 - slaPercentage) / 100;
    return periodSeconds * downtimePercentage;
  };

  const presetSLAs = [99.0, 99.9, 99.95, 99.99, 99.999];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-gray-700">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
          <Percent className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isTH ? 'เครื่องคำนวณ SLA Uptime / Downtime' : 'SLA Uptime Calculator'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isTH 
              ? 'แปลงค่าเปอร์เซ็นต์ SLA เป็นระยะเวลาที่ระบบสามารถหยุดทำงานได้จริง'
              : 'Convert SLA percentage into acceptable downtime duration'}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isTH ? 'ระบุระดับ SLA (%)' : 'Enter SLA Level (%)'}
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.001"
              className="block w-full pl-10 pr-3 py-3 border-2 border-purple-200 dark:border-purple-800/50 rounded-xl bg-purple-50/30 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500 text-lg font-semibold"
              placeholder="e.g. 99.99"
              value={slaPercentage}
              onChange={(e) => setSlaPercentage(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {presetSLAs.map(preset => (
              <button
                key={preset}
                onClick={() => setSlaPercentage(preset)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  slaPercentage === preset
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {typeof slaPercentage === 'number' && slaPercentage >= 0 && slaPercentage <= 100 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: isTH ? 'รายวัน' : 'Daily', icon: Clock, seconds: secondsPerDay },
            { label: isTH ? 'รายสัปดาห์' : 'Weekly', icon: Calendar, seconds: secondsPerWeek },
            { label: isTH ? 'รายเดือน' : 'Monthly', icon: Calendar, seconds: secondsPerMonth },
            { label: isTH ? 'รายปี' : 'Yearly', icon: Calendar, seconds: secondsPerYear },
          ].map((period, idx) => {
            const downtime = calculateDowntime(period.seconds);
            return (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-2 mb-3 text-gray-500 dark:text-gray-400">
                  <period.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{period.label}</span>
                </div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-400">
                  {downtime !== null ? formatDowntime(downtime) : '-'}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {isTH ? 'เวลาหยุดชะงักที่ยอมรับได้' : 'Acceptable downtime'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isTH && (
        <article className="mt-12 prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-purple-500" />
            SLA (Service Level Agreement) และ Uptime 99.9% หมายถึงอะไร? สำคัญแค่ไหนกับธุรกิจ
          </h3>
          <p className="mb-4">
            เมื่อคุณเลือกซื้อบริการทางเทคโนโลยีต่างๆ เช่น Cloud Hosting, อินเทอร์เน็ตองค์กร, ระบบเซิร์ฟเวอร์, หรือบริการ SaaS (Software as a Service) คำศัพท์หนึ่งที่คุณจะพบเสมอในสัญญาคือ <strong>SLA</strong> หรือ <strong>Service Level Agreement</strong> พร้อมกับตัวเลขเปอร์เซ็นต์ที่ดูใกล้เคียง 100% มากๆ เช่น 99.9% (สามเก้า) หรือ 99.99% (สี่เก้า) ตัวเลขเหล่านี้ไม่ได้ตั้งขึ้นมาลอยๆ แต่มันคือ "คำมั่นสัญญา" ที่ผู้ให้บริการรับประกันว่าระบบของพวกเขาจะทำงานได้ปกติ (Uptime) นานแค่ไหน และคุณยอมให้ระบบล่ม (Downtime) ได้นานสูงสุดเท่าใด
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            SLA Uptime คืออะไร?
          </h4>
          <p className="mb-4">
            <strong>SLA (Service Level Agreement)</strong> คือ ข้อตกลงระดับบริการระหว่างผู้ให้บริการ (Service Provider) และลูกค้า โดยระบุคุณภาพ มาตรฐาน และระยะเวลาการให้บริการที่ตกลงกันไว้ ส่วน <strong>Uptime</strong> คือระยะเวลาที่ระบบนั้นสามารถเปิดใช้งานและให้บริการได้ตามปกติ
          </p>
          <p className="mb-4">
            ดังนั้น <strong>SLA Uptime</strong> คือการรับประกันจากผู้ให้บริการว่า ในรอบบิลหนึ่งๆ (เช่น รายเดือนหรือรายปี) ระบบจะมีความพร้อมใช้งานเป็นกี่เปอร์เซ็นต์ หากผู้ให้บริการทำไม่ได้ตามที่ระบุไว้ใน SLA มักจะต้องมีบทลงโทษ เช่น การคืนเงิน (Service Credit) หรือชดเชยให้ลูกค้าตามที่ตกลงกันในสัญญา
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ตัวเลข 99.9% หรือ "Class of Nines" แปลว่าล่มได้นานแค่ไหน?
          </h4>
          <p className="mb-4">
            ในวงการไอที มักจะเรียกความน่าเชื่อถือของระบบด้วยจำนวนของเลข "9" หรือที่เรียกว่า Nines ยิ่งมีเลข 9 มากเท่าไหร่ แสดงว่าระบบมีโอกาสล่มน้อยมากเท่านั้น ลองมาดูตัวอย่างการแปลงตัวเลขเหล่านี้ให้เป็น Downtime ที่ยอมรับได้ต่อปี:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-purple-50 dark:bg-purple-900/30">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-purple-900 dark:text-purple-300 border-b">ระดับความพร้อม (Availability)</th>
                  <th className="py-3 px-4 text-left font-semibold text-purple-900 dark:text-purple-300 border-b">จำนวนเลข 9</th>
                  <th className="py-3 px-4 text-left font-semibold text-purple-900 dark:text-purple-300 border-b">Downtime ต่อปี (ประมาณ)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4">99%</td>
                  <td className="py-3 px-4">Two Nines</td>
                  <td className="py-3 px-4">3 วัน 15 ชั่วโมง</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4">99.9%</td>
                  <td className="py-3 px-4">Three Nines</td>
                  <td className="py-3 px-4">8 ชั่วโมง 45 นาที</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-purple-50/30 dark:bg-purple-900/10">
                  <td className="py-3 px-4 font-bold">99.99%</td>
                  <td className="py-3 px-4 font-bold">Four Nines</td>
                  <td className="py-3 px-4 font-bold">52 นาที 35 วินาที</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4">99.999%</td>
                  <td className="py-3 px-4">Five Nines</td>
                  <td className="py-3 px-4">5 นาที 15 วินาที</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">99.9999%</td>
                  <td className="py-3 px-4">Six Nines</td>
                  <td className="py-3 px-4">31.5 วินาที</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            * สังเกตว่าความแตกต่างเพียง 0.09% (ระหว่าง 99.9% กับ 99.99%) ทำให้ระยะเวลาที่ระบบล่มได้ต่อปี ลดลงจากเกือบ 9 ชั่วโมง เหลือเพียง ไม่ถึง 1 ชั่วโมง!
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ทำไมถึงต้องเข้าใจเรื่อง SLA ก่อนตัดสินใจซื้อ?
          </h4>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>
              <strong>ประเมินความเสี่ยงต่อธุรกิจ:</strong> หากระบบของคุณเป็นแอปพลิเคชัน E-commerce ที่สร้างรายได้ตลอดเวลา การเลือกระบบที่มี SLA 99% อาจทำให้คุณสูญเสียรายได้ไปถึง 3 วันเต็มในหนึ่งปี คุณอาจจำเป็นต้องลงทุนกับบริการระดับ 99.99% เพื่อลดความเสี่ยงนี้
            </li>
            <li>
              <strong>ความคุ้มค่า (Cost vs Benefit):</strong> การจะทำให้ระบบมีความพร้อมใช้งานระดับ Five Nines (99.999%) ต้องแลกมาด้วยต้นทุนในการวางโครงสร้างพื้นฐานระดับ Enterprise ที่สูงมาก คุณจึงควรประเมินว่าระบบนั้นมีความสำคัญต่อธุรกิจในระดับคอขาดบาดตาย (Mission Critical) จริงหรือไม่ หรือระดับ 99.9% ก็เพียงพอแล้ว
            </li>
            <li>
              <strong>รักษาสิทธิ์ตามสัญญา:</strong> เมื่อระบบล่มเกินเวลาที่กำหนดใน SLA คุณมีสิทธิ์ที่จะเรียกร้องค่าชดเชยจากผู้ให้บริการ (Service Credit) ซึ่งโดยปกติผู้ให้บริการมักจะไม่ชดเชยให้โดยอัตโนมัติ คุณในฐานะลูกค้าต้องเป็นผู้มอนิเตอร์และยื่นเรื่องเคลมเอง
            </li>
          </ol>

          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800/50">
            <h5 className="font-semibold text-purple-900 dark:text-purple-300 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5" />
              ข้อควรระวังในการดู SLA
            </h5>
            <p className="text-sm">
              เวลา Downtime ที่นับใน SLA <strong>มักจะไม่รวม "Planned Downtime"</strong> หรือเวลาซ่อมบำรุงตามรอบปกติ (Maintenance window) ที่ผู้ให้บริการแจ้งล่วงหน้า นอกจากนี้ ปัญหาที่เกิดจากฝั่งผู้ใช้งานเอง (เช่น เขียนโค้ดผิดพลาด หรือการโจมตีทางไซเบอร์ที่เจาะจงเป้าหมายมาที่ลูกค้า) ก็มักจะไม่อยู่ในเงื่อนไขการรับประกัน ดังนั้น ควรอ่านรายละเอียดในสัญญาให้รอบคอบทุกครั้ง!
            </p>
          </div>
        </article>
      )}
    </div>
  );
}
