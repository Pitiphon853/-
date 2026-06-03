import React, { useState } from 'react';
import { Shield, Camera, Lock, Bell, Cloud, Calendar, Coins, ShieldCheck } from 'lucide-react';

export default function HomeSecurityCost({ lang }: any) {
  // One-time costs
  const [cctvCost, setCctvCost] = useState<number | ''>('');
  const [alarmCost, setAlarmCost] = useState<number | ''>('');
  const [smartLockCost, setSmartLockCost] = useState<number | ''>('');
  const [installationCost, setInstallationCost] = useState<number | ''>('');

  // Recurring costs
  const [monitoringFee, setMonitoringFee] = useState<number | ''>('');
  const [cloudStorageFee, setCloudStorageFee] = useState<number | ''>('');

  const calculateCosts = () => {
    const cctv = Number(cctvCost) || 0;
    const alarm = Number(alarmCost) || 0;
    const lock = Number(smartLockCost) || 0;
    const install = Number(installationCost) || 0;

    const monitoring = Number(monitoringFee) || 0;
    const cloud = Number(cloudStorageFee) || 0;

    const totalUpfront = cctv + alarm + lock + install;
    const monthlyRecurring = monitoring + cloud;
    const yearlyRecurring = monthlyRecurring * 12;

    const total1Year = totalUpfront + yearlyRecurring;
    const total3Years = totalUpfront + (yearlyRecurring * 3);

    return {
      totalUpfront,
      monthlyRecurring,
      yearlyRecurring,
      total1Year,
      total3Years
    };
  };

  const results = calculateCosts();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณค่าระบบรักษาความปลอดภัยบ้าน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            {/* Upfront Costs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Coins className="w-5 h-5 text-gray-500"/>
                ค่าอุปกรณ์และติดตั้ง (จ่ายครั้งเดียว)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชุดกล้องวงจรปิด (CCTV)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={cctvCost}
                    onChange={(e) => setCctvCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="รวมค่ากล้องและเครื่องบันทึก"
                    min="0"
                  />
                  <Camera className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ระบบสัญญาณกันขโมย
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={alarmCost}
                    onChange={(e) => setAlarmCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="เซนเซอร์ประตู/หน้าต่าง ฯลฯ"
                    min="0"
                  />
                  <Bell className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สมาร์ทล็อค (Smart Door Lock)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={smartLockCost}
                    onChange={(e) => setSmartLockCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="ค่ากลอนประตูดิจิตอล"
                    min="0"
                  />
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าแรงช่าง / ค่าติดตั้ง
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={installationCost}
                    onChange={(e) => setInstallationCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="ค่าเดินสายไฟ เซ็ตระบบ"
                    min="0"
                  />
                  <ShieldCheck className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Recurring Costs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500"/>
                ค่าใช้จ่ายรายเดือน (ถ้ามี)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าบริการบริษัทรักษาความปลอดภัย (บาท/เดือน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={monitoringFee}
                    onChange={(e) => setMonitoringFee(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="เช่น ค่าดูแล 24 ชม."
                    min="0"
                  />
                  <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าบริการ Cloud สี่หรับกล้อง (บาท/เดือน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={cloudStorageFee}
                    onChange={(e) => setCloudStorageFee(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="ค่าเก็บข้อมูลย้อนหลัง"
                    min="0"
                  />
                  <Cloud className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              สรุปงบประมาณ
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ค่าอุปกรณ์และติดตั้งรวม</p>
                  <p className="text-xs text-gray-400">จ่ายครั้งเดียว</p>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  ฿{results.totalUpfront.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ค่าใช้จ่ายต่อเนื่อง</p>
                  <p className="text-xs text-gray-400">รายเดือน</p>
                </div>
                <p className="text-xl font-bold text-red-600">
                  ฿{results.monthlyRecurring.toLocaleString()}
                </p>
              </div>

              <div className="my-6 border-t border-gray-200"></div>

              <div className="bg-red-50 border border-red-100 p-5 rounded-xl shadow-sm">
                <p className="text-sm text-red-800 mb-2">ค่าใช้จ่ายรวมในปีแรก</p>
                <p className="text-3xl font-bold text-red-600 mb-2">
                  ฿{results.total1Year.toLocaleString()}
                </p>
                <p className="text-xs text-red-600 opacity-80 mt-2">
                  รวมค่าติดตั้งและค่าบริการ 12 เดือน
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600">ประเมินค่าใช้จ่ายรวม 3 ปี</p>
                <p className="text-lg font-bold text-gray-900">
                  ฿{results.total3Years.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วางแผนงบประมาณ "ระบบรักษาความปลอดภัยบ้าน" แบบเข้าใจง่าย ไม่บานปลาย</h2>
        
        <p>บ้านคือสถานที่ที่ควรให้ความรู้สึกปลอดภัยที่สุด การลงทุนกับ <strong>"ระบบรักษาความปลอดภัยบ้าน" (Home Security System)</strong> จึงไม่ใช่เรื่องฟุ่มเฟือย แต่คือการซื้อความอุ่นใจให้กับตัวคุณและคนที่คุณรัก อย่างไรก็ตาม หลายคนมักกังวลว่าการติดตั้งระบบเหล่านี้จะมีราคาแพง และไม่แน่ใจว่าต้องเตรียมงบประมาณไว้เท่าไหร่ การคำนวณและแจกแจงค่าใช้จ่าย (Home Security Cost) จะช่วยให้คุณวางแผนได้ดีขึ้นและเลือกซื้ออุปกรณ์ได้ตรงกับความต้องการและเงินในกระเป๋า</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เจาะลึก 2 ส่วนหลักของค่าใช้จ่ายระบบความปลอดภัย</h3>
        <p>การประเมินงบประมาณระบบความปลอดภัยสามารถแบ่งออกได้เป็น 2 ส่วนใหญ่ๆ คือ ค่าใช้จ่ายแบบจ่ายครั้งเดียว (Upfront Costs) และค่าใช้จ่ายต่อเนื่อง (Recurring Costs)</p>

        <h4 className="text-lg font-medium text-gray-800 mt-4 mb-2">1. ค่าใช้จ่ายแบบจ่ายครั้งเดียว (Upfront Costs)</h4>
        <p>เป็นค่าอุปกรณ์และค่าแรงช่างในการติดตั้งครั้งแรก ประกอบด้วย:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>กล้องวงจรปิด (CCTV):</strong> หัวใจสำคัญของระบบความปลอดภัย ปัจจุบันมีทั้งแบบเดินสาย (Analog/IP Camera) ที่เสถียรแต่ติดตั้งยาก และแบบไร้สาย (Wi-Fi Camera) ที่ติดตั้งง่ายราคาถูก แต่อาจมีข้อจำกัดเรื่องสัญญาณ งบประมาณส่วนนี้มีตั้งแต่หลักพันต้นๆ ไปจนถึงหลักหมื่น ขึ้นอยู่กับจำนวนกล้องและความละเอียด</li>
          <li><strong>ระบบสัญญาณกันขโมย (Alarm System):</strong> รวมถึงเซนเซอร์ตรวจจับการเคลื่อนไหว (Motion Sensor) และเซนเซอร์ประตู/หน้าต่าง (Magnetic Sensor) หากมีผู้บุกรุกระบบจะส่งเสียงร้องและแจ้งเตือนเข้ามือถือ</li>
          <li><strong>สมาร์ทล็อค (Smart Door Lock):</strong> กลอนประตูดิจิตอลที่ปลดล็อคด้วยลายนิ้วมือ รหัสผ่าน หรือคีย์การ์ด ช่วยแก้ปัญหาลืมกุญแจและยังเช็คประวัติการเข้าออกได้</li>
          <li><strong>ค่าแรงติดตั้ง:</strong> บางยี่ห้ออาจฟรีค่าติดตั้งหากซื้อครบยอดที่กำหนด แต่หากซื้อแยกมาติดตั้งเอง ควรเผื่อค่าจ้างช่างเดินสายไฟและการเซ็ตอัพระบบไว้ด้วย</li>
        </ul>

        <h4 className="text-lg font-medium text-gray-800 mt-4 mb-2">2. ค่าใช้จ่ายต่อเนื่องรายเดือน/รายปี (Recurring Costs)</h4>
        <p>หลายคนมักลืมคิดถึงส่วนนี้ ซึ่งอาจกลายเป็นภาระระยะยาวได้:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ค่าพื้นที่จัดเก็บข้อมูลบนคลาวด์ (Cloud Storage Fee):</strong> กล้อง Wi-Fi รุ่นใหม่ๆ นิยมให้บันทึกวิดีโอลงระบบ Cloud ซึ่งปลอดภัยกว่าการบันทึกใส่เมมโมรี่การ์ดที่อาจถูกขโมยไปพร้อมกล้อง แต่ต้องแลกมากับค่าบริการรายเดือน</li>
          <li><strong>ค่าบริการศูนย์เฝ้าระวัง (Monitoring Service):</strong> หากคุณใช้บริการของบริษัทรักษาความปลอดภัยชั้นนำ จะมีศูนย์เฝ้าระวังตลอด 24 ชั่วโมง หากสัญญาณเตือนดัง ทางศูนย์จะโทรแจ้งคุณ หรือส่งเจ้าหน้าที่/ตำรวจไปยังบ้านคุณทันที ซึ่งบริการระดับนี้จะมีค่าใช้จ่ายรายเดือนค่อนข้างสูง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เทคนิคการเลือกระบบความปลอดภัยให้คุ้มค่า</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>เริ่มจากจุดเสี่ยงที่สุด:</strong> หากมีงบจำกัด ไม่จำเป็นต้องติดกล้องทุกมุมบ้าน ให้เน้นติดจุดที่เป็นทางเข้าออกหลัก เช่น ประตูหน้าบ้าน ประตูหลังบ้าน และโรงจอดรถ</li>
          <li><strong>เลือกซื้อแบบ DIY:</strong> ปัจจุบันอุปกรณ์ Smart Home หลายชิ้นออกแบบมาให้ติดตั้งเองได้ง่าย (DIY) เช่น กล้อง Wi-Fi หรือเซนเซอร์ประตูแบบไร้สาย ช่วยประหยัดค่าช่างติดตั้งไปได้มาก</li>
          <li><strong>เปรียบเทียบค่าบริการ Cloud:</strong> ก่อนซื้อกล้องยี่ห้อไหน ควรเช็คราคาค่าบริการ Cloud รายเดือน/รายปีก่อน บางยี่ห้อตัวกล้องถูกมากแต่ค่า Cloud แพงมาก ในขณะที่บางยี่ห้ออาจให้บันทึกฟรี 7 วันแบบหมุนวน</li>
        </ol>

        <p className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          <strong>ข้อคิด:</strong> ไม่มีระบบรักษาความปลอดภัยใดในโลกที่ป้องกันได้ 100% การติดตั้งกล้องและสัญญาณกันขโมยเป็นการ <strong>"ป้องปราม"</strong> ให้โจรเปลี่ยนใจ และเป็นการ <strong>"เก็บหลักฐาน"</strong> หากเกิดเหตุการณ์ขึ้น การสร้างความสัมพันธ์ที่ดีกับเพื่อนบ้าน และการตรวจสอบความแข็งแรงของประตูหน้าต่าง ก็เป็นปัจจัยสำคัญที่ไม่ควรมองข้าม
        </p>
      </article>
    </div>
  );
}
