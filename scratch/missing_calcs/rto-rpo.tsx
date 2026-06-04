import React, { useState } from 'react';
import { Target, Clock, Database, DollarSign, Calculator, AlertOctagon } from 'lucide-react';

export default function RtoRpoCalculator({ lang }: any) {
  const isTH = lang === 'th';
  const [rtoHours, setRtoHours] = useState<number | ''>(4);
  const [rpoHours, setRpoHours] = useState<number | ''>(1);
  const [downtimeCostPerHour, setDowntimeCostPerHour] = useState<number | ''>(10000);
  const [dataLossCostPerHour, setDataLossCostPerHour] = useState<number | ''>(50000);

  const downtimeCost = (typeof rtoHours === 'number' && typeof downtimeCostPerHour === 'number') 
    ? rtoHours * downtimeCostPerHour 
    : 0;
    
  const dataLossCost = (typeof rpoHours === 'number' && typeof dataLossCostPerHour === 'number') 
    ? rpoHours * dataLossCostPerHour 
    : 0;

  const totalExposure = downtimeCost + dataLossCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isTH ? 'th-TH' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-gray-700">
        <div className="p-3 bg-rose-100 dark:bg-rose-900 rounded-xl">
          <Target className="w-6 h-6 text-rose-600 dark:text-rose-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isTH ? 'เครื่องคำนวณต้นทุน RTO / RPO' : 'RTO / RPO Cost Analysis'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isTH 
              ? 'ประเมินความเสียหายทางการเงินจากเป้าหมายการกู้คืนระบบ (RTO) และข้อมูล (RPO)'
              : 'Estimate financial exposure based on Recovery Time and Recovery Point Objectives'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            {isTH ? 'เป้าหมายและต้นทุนระบบ (RTO)' : 'System Target & Cost (RTO)'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'RTO เป้าหมายระยะเวลากู้คืน (ชั่วโมง)' : 'RTO - Recovery Time Objective (Hours)'}
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-rose-500 focus:border-rose-500"
              value={rtoHours}
              onChange={(e) => setRtoHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ความเสียหายเมื่อระบบล่ม (ต่อชั่วโมง)' : 'Cost of Downtime (Per Hour)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-rose-500 focus:border-rose-500"
                value={downtimeCostPerHour}
                onChange={(e) => setDowntimeCostPerHour(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-500" />
            {isTH ? 'เป้าหมายและต้นทุนข้อมูล (RPO)' : 'Data Target & Cost (RPO)'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'RPO เป้าหมายจุดกู้คืนข้อมูล (ชั่วโมง)' : 'RPO - Recovery Point Objective (Hours)'}
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-rose-500 focus:border-rose-500"
              value={rpoHours}
              onChange={(e) => setRpoHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isTH ? 'ความเสียหายเมื่อข้อมูลสูญหาย (ต่อชั่วโมง)' : 'Cost of Data Loss (Per Hour)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-rose-500 focus:border-rose-500"
                value={dataLossCostPerHour}
                onChange={(e) => setDataLossCostPerHour(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 border-2 border-rose-100 dark:border-rose-900/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-rose-50 dark:bg-rose-900/30 px-6 py-4 border-b border-rose-100 dark:border-rose-900/50">
          <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-300 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {isTH ? 'ผลการประเมินความเสียหาย (Financial Exposure)' : 'Financial Exposure Summary'}
          </h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {isTH ? 'มูลค่าความเสียหายเมื่อระบบล่ม (Downtime)' : 'Cost of System Downtime'}
            </label>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {formatCurrency(downtimeCost)}
            </div>
          </div>
          
          <div className="text-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {isTH ? 'มูลค่าความเสียหายเมื่อข้อมูลหาย (Data Loss)' : 'Cost of Data Loss'}
            </p>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {formatCurrency(dataLossCost)}
            </div>
          </div>

          <div className="text-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 bg-rose-50/50 dark:bg-rose-900/10 rounded-xl md:rounded-none md:bg-transparent -mx-6 md:mx-0 p-4 md:p-0">
            <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-wider">
              {isTH ? 'ความเสียหายรวมโดยประมาณ' : 'Total Potential Exposure'}
            </p>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-500">
              {formatCurrency(totalExposure)}
            </div>
          </div>
        </div>
      </div>

      {isTH && (
        <article className="mt-12 prose prose-rose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <AlertOctagon className="w-5 h-5 text-rose-500" />
            รู้จัก RTO และ RPO หัวใจสำคัญของการวางแผน Disaster Recovery (DR)
          </h3>
          <p className="mb-4">
            ภัยพิบัติทางไอที ไม่ว่าจะเป็นระบบล่ม ไฟดับ เซิร์ฟเวอร์พัง หรือถูกโจมตีด้วย Ransomware สามารถเกิดขึ้นได้ตลอดเวลาและสร้างความเสียหายอย่างมหาศาลให้กับธุรกิจ การเตรียมพร้อมด้วยแผนการกู้คืนระบบจากภัยพิบัติ (Disaster Recovery Plan หรือ DRP) จึงเป็นสิ่งจำเป็น 불가พ และในการวางแผน DR นี้ มีสองคำศัพท์ที่สำคัญที่สุดที่คุณต้องกำหนดค่าให้ชัดเจน นั่นคือ <strong>RTO (Recovery Time Objective)</strong> และ <strong>RPO (Recovery Point Objective)</strong>
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            1. RTO (Recovery Time Objective) คืออะไร?
          </h4>
          <p className="mb-4">
            <strong>RTO</strong> คือ "เป้าหมายระยะเวลาสูงสุด" ที่ธุรกิจยอมรับได้ให้ระบบหยุดทำงาน หรือพูดง่ายๆ คือ <strong>"เราต้องกู้ระบบกลับมาให้ใช้งานได้ภายในกี่ชั่วโมง?"</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>หากกำหนด RTO = 4 ชั่วโมง หมายความว่า เมื่อเกิดเหตุระบบล่ม ทีมงานมีเวลาเพียง 4 ชั่วโมงในการทำให้ระบบกลับมาทำงานตามปกติ หากใช้เวลานานกว่านั้น ธุรกิจอาจเกิดความเสียหายอย่างร้ายแรง</li>
            <li>RTO เน้นเรื่อง <strong>"เวลาที่สูญเสียไป" (Downtime)</strong></li>
            <li>ความเสียหายจาก Downtime อาจรวมถึง: ยอดขายที่หายไป พนักงานไม่สามารถทำงานได้ (เสียค่าจ้างเปล่า) ความน่าเชื่อถือของแบรนด์ลดลง หรือค่าปรับผิดสัญญากับคู่ค้า (SLA Penalties)</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            2. RPO (Recovery Point Objective) คืออะไร?
          </h4>
          <p className="mb-4">
            <strong>RPO</strong> คือ "เป้าหมายจุดเวลาที่ยอมรับให้ข้อมูลสูญหายได้สูงสุด" หรือพูดง่ายๆ คือ <strong>"เรายอมให้ข้อมูลหายย้อนหลังไปได้สูงสุดกี่ชั่วโมง?"</strong> ซึ่งเป็นตัวกำหนดความถี่ในการแบ็คอัปข้อมูล
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>หากกำหนด RPO = 1 ชั่วโมง หมายความว่า คุณต้องมีการสำรองข้อมูล (Backup) ทุกๆ 1 ชั่วโมงเป็นอย่างน้อย เพื่อที่ว่าหากระบบพังตอน 12:00 น. คุณจะมีข้อมูลล่าสุดตอน 11:00 น. มาใช้กู้คืน (ข้อมูลระหว่าง 11:00 - 12:00 จะสูญหายไป 1 ชั่วโมง)</li>
            <li>RPO เน้นเรื่อง <strong>"ข้อมูลที่สูญเสียไป" (Data Loss)</strong></li>
            <li>ความเสียหายจาก Data Loss อาจรวมถึง: ออเดอร์ลูกค้าที่บันทึกไม่ทัน ข้อมูลธุรกรรมทางการเงินที่ต้องทำซ้ำ ค่าปรับจากข้อบังคับทางกฎหมาย (PDPA/GDPR)</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            ทำไมต้องประเมินมูลค่าความเสียหาย (Cost Analysis)?
          </h4>
          <p className="mb-4">
            หลายองค์กรเมื่อถูกถามว่าอยากได้ RTO/RPO เท่าไหร่ มักจะตอบว่า "อยากให้ระบบไม่ล่มเลยและข้อมูลไม่หายเลย" หรือ <strong>RTO = 0, RPO = 0</strong>
          </p>
          <p className="mb-4">
            ในทางทฤษฎีนั้นทำได้ (เรียกว่าระบบ High Availability แบบ Active-Active) แต่ในทางปฏิบัติ <strong>การจะทำตัวเลขเข้าใกล้ 0 นั้นมีต้นทุน (Cost of Recovery Solution) ที่สูงมหาศาลระดับทวีคูณ</strong>
          </p>
          <p className="mb-4">
            การประเมิน <strong>Cost of Downtime</strong> และ <strong>Cost of Data Loss</strong> จึงช่วยให้ผู้บริหารมีตัวเลขที่ชัดเจนว่า หากระบบล่มตาม RTO/RPO ที่ตั้งไว้ ธุรกิจจะสูญเงินเท่าไหร่ เพื่อนำไปเปรียบเทียบว่า <em>"ต้นทุนในการซื้อโซลูชันเพื่อป้องกันระบบนั้น คุ้มค่ากับความเสียหายที่จะเกิดขึ้นหรือไม่?"</em> 
          </p>
          <p className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <strong>หลักการคือหาจุดสมดุล:</strong> อย่าจ่ายค่าโซลูชัน Disaster Recovery มากกว่ามูลค่าความเสียหายทางธุรกิจที่อาจเกิดขึ้น
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            วิธีตั้งค่า RTO / RPO ที่เหมาะสม
          </h4>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>
              <strong>จัดกลุ่มความสำคัญของระบบ (Tiering):</strong> ไม่จำเป็นต้องตั้งค่า RTO/RPO เท่ากันทุกระบบในองค์กร
              <ul className="list-disc pl-6 mt-1 text-gray-600 dark:text-gray-400">
                <li>Tier 1 (Mission Critical): ระบบจ่ายเงิน, เว็บไซต์หลัก (RTO/RPO ต้องต่ำมาก ระดับนาที)</li>
                <li>Tier 2 (Business Important): ระบบอีเมลภายใน (RTO/RPO ระดับ 4-8 ชั่วโมง)</li>
                <li>Tier 3 (Non-critical): ระบบทดสอบ (RTO/RPO ระดับวัน)</li>
              </ul>
            </li>
            <li><strong>ปรึกษาผู้มีส่วนได้ส่วนเสีย:</strong> ให้แต่ละแผนกประเมินว่าหากขาดระบบนั้นไป จะทำงานต่อได้หรือไม่ และจะเกิดความเสียหายต่อบริษัทเท่าไหร่ต่อชั่วโมง (Business Impact Analysis - BIA)</li>
            <li><strong>พิจารณาข้อกำหนดทางกฎหมาย:</strong> บางธุรกิจเช่น การเงิน ธนาคาร หรือสุขภาพ มีข้อกำหนดบังคับว่าต้องเก็บรักษาข้อมูลอย่างเข้มงวด ทำให้ RPO ต้องต่ำมาก</li>
          </ol>
        </article>
      )}
    </div>
  );
}
