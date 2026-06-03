import React, { useState } from 'react';
import { FileBadge, ShieldAlert, BarChart3, Clock } from 'lucide-react';

const PatentCostCalculator = ({ lang }: any) => {
  const [patentType, setPatentType] = useState<'invention' | 'petty' | 'design'>('invention');
  const [agentFee, setAgentFee] = useState<number>(30000);
  const [translationFee, setTranslationFee] = useState<number>(5000);
  const [maintenanceYears, setMaintenanceYears] = useState<number>(5);

  // Patent official fees approximation (Thailand DIP baseline reference)
  // These are roughly estimated base fees.
  const filingFees = {
    invention: { filing: 1000, publication: 500, examination: 1000, grant: 1000 },
    petty: { filing: 500, publication: 500, examination: 0, grant: 1000 },
    design: { filing: 500, publication: 500, examination: 0, grant: 1000 },
  };

  // Rough estimation of annual maintenance fees progression
  const getMaintenanceFeeForYear = (type: string, year: number) => {
    if (type === 'invention') {
      if (year < 5) return 0;
      if (year === 5) return 2000;
      return 2000 + ((year - 5) * 1000); // Increases over time
    } else if (type === 'petty') {
      if (year < 5) return 0;
      if (year === 5) return 1000;
      return 1000 + ((year - 5) * 500); 
    } else { // design
      if (year < 5) return 0;
      if (year === 5) return 1000;
      return 1000 + ((year - 5) * 500);
    }
  };

  const currentFilingFees = filingFees[patentType];
  const officialFilingTotal = currentFilingFees.filing + currentFilingFees.publication + currentFilingFees.examination + currentFilingFees.grant;
  
  const totalInitialCost = officialFilingTotal + agentFee + translationFee;

  let totalMaintenanceFees = 0;
  const maintenanceBreakdown = [];
  
  for (let y = 1; y <= maintenanceYears; y++) {
    const fee = getMaintenanceFeeForYear(patentType, y);
    totalMaintenanceFees += fee;
    if (fee > 0) {
      maintenanceBreakdown.push({ year: y, fee: fee });
    }
  }

  const grandTotal = totalInitialCost + totalMaintenanceFees;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-indigo-600">
        <FileBadge className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณค่าจดสิทธิบัตรและค่าบำรุงรักษา (Patent Cost)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">ประเภททรัพย์สินทางปัญญา</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPatentType('invention')}
                className={`py-2 px-3 border rounded-md text-sm font-medium ${patentType === 'invention' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                สิทธิบัตรการประดิษฐ์
              </button>
              <button
                type="button"
                onClick={() => setPatentType('petty')}
                className={`py-2 px-3 border rounded-md text-sm font-medium ${patentType === 'petty' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                อนุสิทธิบัตร
              </button>
              <button
                type="button"
                onClick={() => setPatentType('design')}
                className={`py-2 px-3 border rounded-md text-sm font-medium ${patentType === 'design' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                สิทธิบัตรการออกแบบ
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-medium text-gray-800">ค่าธรรมเนียมวิชาชีพ (กรณีจ้างตัวแทน)</h3>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">ค่าจ้างสำนักงานทนายความ/ตัวแทน (บาท)</label>
              <input
                type="number"
                value={agentFee}
                onChange={(e) => setAgentFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">ค่าแปลเอกสาร และค่าดำเนินการอื่นๆ (บาท)</label>
              <input
                type="number"
                value={translationFee}
                onChange={(e) => setTranslationFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> จำนวนปีที่คาดว่าจะถือครองสิทธิ (เพื่อคำนวณค่าบำรุงรักษา)
            </label>
            <input
              type="range"
              min="1"
              max={patentType === 'invention' ? 20 : 10}
              value={maintenanceYears}
              onChange={(e) => setMaintenanceYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-right text-sm text-indigo-600 font-bold">{maintenanceYears} ปี</div>
            <p className="text-xs text-gray-500">
              * อายุความคุ้มครองสูงสุด: การประดิษฐ์ 20 ปี / อนุสิทธิบัตรและออกแบบ 10 ปี
            </p>
          </div>
        </div>

        <div>
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" /> สรุปค่าใช้จ่ายตลอดโครงการ
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 border-b border-indigo-200 pb-1 mb-2">1. ค่าใช้จ่ายเริ่มต้น (จดทะเบียน)</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>ค่าธรรมเนียมราชการ (โดยประมาณ):</span>
                  <span>฿{officialFilingTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>ค่าบริการตัวแทน & ค่าแปล:</span>
                  <span>฿{(agentFee + translationFee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-indigo-800 mt-2">
                  <span>รวมค่าเริ่มต้น:</span>
                  <span>฿{totalInitialCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-indigo-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">2. ค่าบำรุงรักษารายปี (ปีที่ 5 ถึง {maintenanceYears})</h4>
                {maintenanceBreakdown.length > 0 ? (
                  <div className="max-h-24 overflow-y-auto text-xs text-gray-500 space-y-1 mb-2 bg-white p-2 rounded border border-indigo-100">
                    {maintenanceBreakdown.map((item) => (
                      <div key={item.year} className="flex justify-between">
                        <span>ปีที่ {item.year}</span>
                        <span>฿{item.fee.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mb-2 italic">ไม่มีค่าบำรุงรักษาในช่วง 4 ปีแรก</p>
                )}
                <div className="flex justify-between font-semibold text-indigo-800">
                  <span>รวมค่าบำรุงรักษา {maintenanceYears} ปี:</span>
                  <span>฿{totalMaintenanceFees.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-indigo-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">ประมาณการรวมทั้งหมด:</span>
                  <span className="text-2xl font-bold text-indigo-600">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-md flex items-start text-xs text-gray-500">
              <ShieldAlert className="w-4 h-4 mr-2 flex-shrink-0 text-orange-500" />
              <p>นี่เป็นการประมาณการค่าธรรมเนียมเบื้องต้นในประเทศไทย ตัวเลขจริงอาจแตกต่างกันตามความซับซ้อนของคำขอ จำนวนข้อถือสิทธิ และการประกาศใช้กฎกระทรวงในอนาคต</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">คำนวณต้นทุนการจดสิทธิบัตร (Patent Registration & Maintenance Cost)</h2>
        <p>
          <strong>สิทธิบัตร (Patent)</strong> คือ ทรัพย์สินทางปัญญาประเภทหนึ่งที่รัฐออกให้เพื่อคุ้มครองการประดิษฐ์หรือการออกแบบผลิตภัณฑ์ใหม่ ให้สิทธิผูกขาดแก่เจ้าของผลงานในช่วงระยะเวลาหนึ่ง แลกกับการเปิดเผยรายละเอียดของการประดิษฐ์นั้นสู่สาธารณะ การปกป้องนวัตกรรมด้วยสิทธิบัตรเป็นกลยุทธ์ทางธุรกิจที่สำคัญ แต่ในขณะเดียวกันก็มี <strong>"ต้นทุน"</strong> ที่ธุรกิจต้องเตรียมพร้อม ทั้งค่าใช้จ่ายตั้งต้นและค่าบำรุงรักษารายปี
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">โครงสร้างต้นทุนของการจดสิทธิบัตร</h3>
        <p>ค่าใช้จ่ายในการคุ้มครองสิทธิบัตรแบ่งออกเป็น 2 ส่วนหลักๆ ได้แก่:</p>

        <h4 className="text-lg font-medium mt-4 mb-2">1. ต้นทุนเริ่มต้น (Initial Filing & Prosecution Costs)</h4>
        <p>นี่คือค่าใช้จ่ายที่เกิดขึ้นตั้งแต่เริ่มเตรียมเอกสารจนถึงวันที่ได้รับอนุมัติสิทธิบัตร ประกอบด้วย:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ค่าธรรมเนียมทางราชการ (Official Fees):</strong> เช่น ค่าธรรมเนียมการยื่นคำขอ ค่าประกาศโฆษณา ค่าขอให้ตรวจสอบการประดิษฐ์ และค่ารับจดทะเบียน</li>
          <li><strong>ค่าบริการตัวแทนหรือทนายความสิทธิบัตร (Patent Attorney/Agent Fees):</strong> การร่างข้อถือสิทธิ (Claims) และรายละเอียดการประดิษฐ์มีความซับซ้อนทางกฎหมายและเทคนิคสูงมาก การใช้ผู้เชี่ยวชาญจึงจำเป็น ค่าใช้จ่ายส่วนนี้มักจะสูงกว่าค่าธรรมเนียมราชการหลายเท่า</li>
          <li><strong>ค่าแปลเอกสารและวาดแบบ (Translation & Drafting Fees):</strong> หากสิทธิบัตรอ้างอิงเอกสารต่างประเทศ หรือมีแบบร่างวิศวกรรมที่ซับซ้อน</li>
        </ul>

        <h4 className="text-lg font-medium mt-4 mb-2">2. ค่าบำรุงรักษารายปี (Annual Maintenance Fees)</h4>
        <p>
          สิทธิบัตรไม่ได้คุ้มครองฟรีไปตลอดอายุ เมื่อได้รับอนุมัติแล้ว (หรือตั้งแต่ปีที่ 5 เป็นต้นไปตามกฎหมายไทย) เจ้าของสิทธิบัตรจะต้องจ่าย <strong>ค่าธรรมเนียมรายปี</strong> เพื่อรักษาสถานะความคุ้มครองเอาไว้
        </p>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 my-4">
          <p className="font-semibold text-indigo-800">รู้หรือไม่?</p>
          <p className="text-sm mt-1">อัตราค่าบำรุงรักษาสิทธิบัตรมักจะ <strong>"เพิ่มขึ้นแบบขั้นบันได"</strong> ในปีท้ายๆ เช่น ปีที่ 5 อาจจะถูก แต่ปีที่ 15-20 จะแพงขึ้นมาก ทั้งนี้เพื่อกระตุ้นให้เทคโนโลยีที่ไม่มีมูลค่าเชิงพาณิชย์แล้วถูกปล่อยเป็นสาธารณสมบัติ (Public Domain) ให้ผู้อื่นนำไปต่อยอดได้</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ประเภทของสิทธิบัตรและอายุความคุ้มครอง (ประเทศไทย)</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>สิทธิบัตรการประดิษฐ์ (Invention Patent):</strong> คุ้มครองนวัตกรรมที่มีขั้นการประดิษฐ์สูงขึ้นแก้ปัญหาทางเทคนิค มีอายุการคุ้มครองสูงสุด <strong>20 ปี</strong> (ค่าบำรุงรักษาแพงที่สุด)</li>
          <li><strong>อนุสิทธิบัตร (Petty Patent):</strong> คุ้มครองการประดิษฐ์ที่พัฒนาขึ้นใหม่แต่ไม่มีขั้นการประดิษฐ์ที่สูงมาก (ใช้งานได้จริง) คุ้มครองเริ่มต้น 6 ปี และต่ออายุได้ 2 ครั้ง รวมสูงสุด <strong>10 ปี</strong></li>
          <li><strong>สิทธิบัตรการออกแบบผลิตภัณฑ์ (Design Patent):</strong> คุ้มครองรูปร่าง ลวดลาย หรือสีสันภายนอกของสินค้า คุ้มครองสูงสุด <strong>10 ปี</strong></li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมธุรกิจต้องประเมินค่าใช้จ่ายล่วงหน้า?</h3>
        <p>
          การจดสิทธิบัตรใน "ทุกประเทศ" ทั่วโลกต้องใช้เงินมหาศาล (จดประเทศไหน คุ้มครองประเทศนั้น) หากบริษัทมีพอร์ตโฟลิโอสิทธิบัตร (Patent Portfolio) จำนวนมาก ค่าบำรุงรักษารายปีรวมกันอาจเป็นหลักล้านบาท ผู้บริหารจึงต้องวิเคราะห์ <strong>ความคุ้มค่าเชิงพาณิชย์ (ROI)</strong> ว่าสิทธิบัตรใบไหนสร้างรายได้ และใบไหนควรหยุดจ่ายค่าบำรุงรักษาเพื่อลดต้นทุน
        </p>
      </div>
    </div>
  );
};

export default PatentCostCalculator;
