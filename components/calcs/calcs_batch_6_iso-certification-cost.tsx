import React, { useState } from 'react';
import { Award, Briefcase, FileCheck, RefreshCw } from 'lucide-react';

const IsoCertificationCostCalculator = ({ lang }: any) => {
  const [employees, setEmployees] = useState<number>(50);
  
  // Base costs estimation parameters (These are highly variable in real life, user can edit)
  const [consultingFee, setConsultingFee] = useState<number>(150000); // 100k - 300k THB usually
  const [internalCost, setInternalCost] = useState<number>(50000); // Staff time, training
  
  // Certification Body (CB) fees
  const [stage12AuditFee, setStage12AuditFee] = useState<number>(80000); 
  const [annualSurveillanceFee, setAnnualSurveillanceFee] = useState<number>(40000);

  // Suggestions based on employee count (rough estimate for ISO 9001)
  const suggestValues = () => {
    if (employees <= 20) {
      setConsultingFee(80000);
      setInternalCost(20000);
      setStage12AuditFee(50000);
      setAnnualSurveillanceFee(25000);
    } else if (employees <= 100) {
      setConsultingFee(150000);
      setInternalCost(50000);
      setStage12AuditFee(80000);
      setAnnualSurveillanceFee(40000);
    } else if (employees <= 300) {
      setConsultingFee(250000);
      setInternalCost(100000);
      setStage12AuditFee(120000);
      setAnnualSurveillanceFee(60000);
    } else {
      setConsultingFee(400000);
      setInternalCost(200000);
      setStage12AuditFee(200000);
      setAnnualSurveillanceFee(100000);
    }
  };

  const year1Cost = consultingFee + internalCost + stage12AuditFee;
  const year2Cost = annualSurveillanceFee;
  const year3Cost = annualSurveillanceFee;
  const total3YearCost = year1Cost + year2Cost + year3Cost;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-teal-600">
        <Award className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือประเมินต้นทุนการทำระบบ ISO (ISO Certification Cost)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
            <label className="block text-sm font-semibold text-teal-800 mb-2">จำนวนพนักงานในองค์กร (คน)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-teal-300 rounded-md focus:ring-teal-500"
                min="1"
              />
              <button 
                onClick={suggestValues}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium transition-colors"
              >
                ประเมินค่าเริ่มต้น
              </button>
            </div>
            <p className="text-xs text-teal-600 mt-2">* จำนวนพนักงานมีผลต่อจำนวน Man-day ที่ผู้ตรวจประเมิน (Auditor) ต้องใช้</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" /> 1. ค่าใช้จ่ายในการเตรียมระบบ (Preparation Costs)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">ค่าที่ปรึกษา (Consultant Fee) ฿</label>
                <input type="number" value={consultingFee} onChange={(e) => setConsultingFee(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-teal-500" />
                <p className="text-xs text-gray-500 mt-1">ค่าจ้างผู้เชี่ยวชาญมาช่วยวางระบบและอบรมพนักงาน</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700">ต้นทุนภายใน/แฝง (Internal Costs/Training) ฿</label>
                <input type="number" value={internalCost} onChange={(e) => setInternalCost(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-teal-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center">
              <FileCheck className="w-4 h-4 mr-2" /> 2. ค่าใช้จ่ายผู้ตรวจประเมิน (Certification Body Fees)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">ค่าตรวจรับรองครั้งแรก (Stage 1 & Stage 2) ฿</label>
                <input type="number" value={stage12AuditFee} onChange={(e) => setStage12AuditFee(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าตรวจติดตามรายปี (Surveillance Audit) ฿ / ปี</label>
                <input type="number" value={annualSurveillanceFee} onChange={(e) => setAnnualSurveillanceFee(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-teal-500" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">สรุปงบประมาณ (วัฏจักร 3 ปี)</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-teal-500">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-700">ปีที่ 1 (จัดทำระบบ + ขอใบรับรอง)</span>
                  <span className="font-bold text-teal-700">฿{year1Cost.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 mt-2">
                  <div className="flex justify-between"><span>ค่าที่ปรึกษา & ภายใน:</span> <span>฿{(consultingFee + internalCost).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>ค่าตรวจ CB (Stage 1,2):</span> <span>฿{stage12AuditFee.toLocaleString()}</span></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-400">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-700 flex items-center"><RefreshCw className="w-3 h-3 mr-1"/> ปีที่ 2 (ตรวจติดตามผล ครั้งที่ 1)</span>
                  <span className="font-bold text-blue-700">฿{year2Cost.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-400">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-700 flex items-center"><RefreshCw className="w-3 h-3 mr-1"/> ปีที่ 3 (ตรวจติดตามผล ครั้งที่ 2)</span>
                  <span className="font-bold text-blue-700">฿{year3Cost.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">รวมงบประมาณ 3 ปี (Total 3-Year Cost)</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-2 text-right">
                  ฿{total3YearCost.toLocaleString()}
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              * ข้อมูลนี้เป็นการประมาณการเบื้องต้น ค่าใช้จ่ายจริงขึ้นอยู่กับขอบเขตการรับรอง (Scope), ความซับซ้อนของกระบวนการทำงาน, สถาบันรับรอง (CB) ที่เลือกใช้, และความพร้อมของบริษัทท่าน
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">การประเมินต้นทุนการขอรับรองมาตรฐาน ISO (ISO Certification Cost)</h2>
        <p>
          มาตรฐาน <strong>ISO (International Organization for Standardization)</strong> เช่น ISO 9001 (ระบบบริหารงานคุณภาพ), ISO 14001 (การจัดการสิ่งแวดล้อม), หรือ ISO 27001 (ความมั่นคงปลอดภัยสารสนเทศ) ถือเป็น "พาสปอร์ตทางธุรกิจ" ที่ช่วยยกระดับความน่าเชื่อถือ ทำให้สามารถประมูลงานราชการ หรือรับงานจากบริษัทข้ามชาติได้ แต่การจะได้มาซึ่งใบรับรองนี้ องค์กรจะต้องเตรียมงบประมาณทั้งในส่วนของการ "สร้างระบบ" และ "รักษาระบบ"
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">โครงสร้างค่าใช้จ่ายในการทำ ISO</h3>
        <p>การขอใบรับรอง ISO มีวัฏจักรตามมาตรฐานคือ <strong>3 ปี (3-Year Cycle)</strong> โดยแบ่งค่าใช้จ่ายออกเป็น 2 หมวดหลักๆ ดังนี้:</p>

        <h4 className="text-lg font-medium mt-4 mb-2 text-teal-800">1. ค่าใช้จ่ายในการเตรียมการและพัฒนาระบบ (Preparation & Implementation)</h4>
        <p>เกิดขึ้นหนักที่สุดในช่วง "ปีแรก" ก่อนที่จะเรียกผู้ตรวจสอบมาดูระบบ ประกอบด้วย:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>ค่าจ้างที่ปรึกษา (Consulting Fee):</strong> ส่วนใหญ่บริษัทมักจ้างที่ปรึกษาภายนอกมาช่วยวิเคราะห์ช่องว่าง (Gap Analysis) ร่างเอกสาร ขั้นตอนการทำงาน (SOP) และฝึกอบรมพนักงาน ค่าใช้จ่ายส่วนนี้จะผันแปรตามขนาดขององค์กร</li>
          <li><strong>ต้นทุนภายใน (Internal/Hidden Costs):</strong> คือเวลาของพนักงานที่ต้องเสียไปกับการเข้าอบรม การเขียนเอกสาร และการปรับปรุงสถานที่ทำงาน (เช่น หากทำ ISO 14001 อาจต้องซื้อถังขยะแยกประเภท หรือทำ ISO 45001 อาจต้องซื้ออุปกรณ์เซฟตี้เพิ่ม)</li>
        </ul>

        <h4 className="text-lg font-medium mt-4 mb-2 text-blue-800">2. ค่าธรรมเนียมสถาบันรับรอง (Certification Body - CB Fees)</h4>
        <p>องค์กรต้องจ้างสถาบันรับรองภายนอก (Third Party) หรือ CB มาตรวจสอบและออกใบรับรองให้ ค่าตรวจจะคิดตาม <strong>จำนวนคน-วัน (Man-days)</strong> ซึ่งอิงจากจำนวนพนักงานและความเสี่ยงของธุรกิจ</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>ปีที่ 1 (Initial Certification Audit):</strong> การตรวจรับรองครั้งแรก จะแบ่งเป็น Stage 1 (ตรวจเอกสารเบื้องต้น) และ Stage 2 (ตรวจหน้างานจริง) ค่าใช้จ่ายจะสูงที่สุด</li>
          <li><strong>ปีที่ 2 และ 3 (Surveillance Audit):</strong> การตรวจติดตามผลประจำปี เพื่อดูว่าบริษัทคุณยังคงรักษาระบบไว้ได้หรือไม่ ค่าตรวจจะถูกกว่าปีแรก (มักจะประมาณ 30-50% ของปีแรก)</li>
          <li><strong>ปีที่ 4 (Recertification Audit):</strong> เมื่อครบ 3 ปี ใบรับรองจะหมดอายุ ต้องทำการตรวจประเมินใหม่ทั้งระบบ (Re-cert) ซึ่งค่าใช้จ่ายจะกลับมาสูงใกล้เคียงกับปีที่ 1</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">ความคุ้มค่าของการลงทุน (ROI) กับ ISO</h3>
        <p>
          แม้จะมีค่าใช้จ่ายหลายแสนบาทในวัฏจักร 3 ปี แต่ผลประโยชน์ที่องค์กรได้รับมักจะคุ้มค่าในระยะยาว เช่น:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>ลดของเสียและข้อผิดพลาด (Defect Reduction):</strong> กระบวนการที่เป็นระบบช่วยลด Rework หรือของเสียจากการผลิต</li>
          <li><strong>เพิ่มโอกาสในการขาย:</strong> ลบข้อจำกัดในการยื่นประมูลงานหรือเป็นซัพพลายเออร์ให้บริษัทขนาดใหญ่ ที่มักตั้งเงื่อนไขว่าผู้รับเหมาต้องมี ISO 9001</li>
          <li><strong>ระบบอยู่ได้แม้คนออก:</strong> การมีเอกสารคู่มือการทำงาน (Documented Information) ที่ชัดเจน ทำให้บริษัทไม่ยึดติดกับตัวบุคคล (Turnover risks)</li>
        </ol>
      </div>
    </div>
  );
};

export default IsoCertificationCostCalculator;
