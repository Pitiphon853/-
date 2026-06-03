import React, { useState } from 'react';
import { Building, Home, DollarSign, Users, ArrowRight } from 'lucide-react';

const OfficeVsWfhCalculator = ({ lang }: any) => {
  const [employees, setEmployees] = useState<number>(50);
  
  // Office Costs (Monthly)
  const [officeRent, setOfficeRent] = useState<number>(150000);
  const [utilities, setUtilities] = useState<number>(20000);
  const [officeSupplies, setOfficeSupplies] = useState<number>(10000);
  const [cleaningSecurity, setCleaningSecurity] = useState<number>(15000);
  
  // WFH Costs (Monthly)
  const [wfhStipendPerEmployee, setWfhStipendPerEmployee] = useState<number>(1000);
  const [softwareSubscriptions, setSoftwareSubscriptions] = useState<number>(15000);
  const [coWorkingSpace, setCoWorkingSpace] = useState<number>(5000); // Occasional meetups

  const totalOfficeCost = officeRent + utilities + officeSupplies + cleaningSecurity;
  const totalWfhCost = (wfhStipendPerEmployee * employees) + softwareSubscriptions + coWorkingSpace;
  
  const monthlySavings = totalOfficeCost - totalWfhCost;
  const yearlySavings = monthlySavings * 12;
  const savingsPerEmployeeYear = yearlySavings / employees;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Home className="w-8 h-8 text-cyan-600" />
        <h2 className="text-2xl font-bold text-gray-800">Office vs WFH Cost Savings</h2>
      </div>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <Users className="w-4 h-4" /> Total Employees (จำนวนพนักงาน)
        </label>
        <input
          type="number"
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Office Costs */}
        <div className="space-y-4 border border-gray-200 p-5 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3 mb-4">
            <Building className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-800">Traditional Office (Monthly)</h3>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Rent & Lease (ค่าเช่าออฟฟิศ)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input type="number" value={officeRent} onChange={(e) => setOfficeRent(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Utilities & Internet (ค่าน้ำ ไฟ เน็ต)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Supplies & Snacks (อุปกรณ์/ของว่าง)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input type="number" value={officeSupplies} onChange={(e) => setOfficeSupplies(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cleaning & Security (แม่บ้าน/รปภ)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <input type="number" value={cleaningSecurity} onChange={(e) => setCleaningSecurity(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400" />
            </div>
          </div>
          <div className="pt-3 border-t">
            <div className="flex justify-between font-bold text-gray-800">
              <span>Total Office:</span>
              <span>฿{totalOfficeCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* WFH Costs */}
        <div className="space-y-4 border border-cyan-200 p-5 rounded-xl bg-cyan-50 shadow-sm">
          <div className="flex items-center gap-2 border-b border-cyan-200 pb-3 mb-4">
            <Home className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Work From Home (Monthly)</h3>
          </div>
          
          <div>
            <label className="block text-sm text-cyan-800 mb-1">WFH Stipend/Emp (เงินอุดหนุน WFH/คน)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-cyan-500" />
              </div>
              <input type="number" value={wfhStipendPerEmployee} onChange={(e) => setWfhStipendPerEmployee(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-cyan-300 rounded focus:ring-1 focus:ring-cyan-500 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-cyan-800 mb-1">Software/Tools (ค่าซอฟต์แวร์/Zoom/Slack)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-cyan-500" />
              </div>
              <input type="number" value={softwareSubscriptions} onChange={(e) => setSoftwareSubscriptions(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-cyan-300 rounded focus:ring-1 focus:ring-cyan-500 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-cyan-800 mb-1">Co-working / Meetups (พื้นที่เช่าประชุม)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-cyan-500" />
              </div>
              <input type="number" value={coWorkingSpace} onChange={(e) => setCoWorkingSpace(Number(e.target.value))} className="w-full pl-9 pr-3 py-1.5 text-sm border border-cyan-300 rounded focus:ring-1 focus:ring-cyan-500 bg-white" />
            </div>
          </div>
          
          <div className="pt-9 border-t border-cyan-200">
            <div className="flex justify-between font-bold text-cyan-900">
              <span>Total WFH:</span>
              <span>฿{totalWfhCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-xl text-white text-center">
        <h3 className="text-lg font-medium opacity-90 mb-2">Total Estimated Savings (WFH)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-cyan-400">
          <div className="pt-2 md:pt-0">
            <div className="text-sm opacity-80 uppercase tracking-wider mb-1">Monthly Savings</div>
            <div className="text-4xl font-bold">฿{monthlySavings.toLocaleString()}</div>
          </div>
          <div className="pt-4 md:pt-0">
            <div className="text-sm opacity-80 uppercase tracking-wider mb-1">Yearly Savings</div>
            <div className="text-4xl font-bold text-yellow-300">฿{yearlySavings.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-cyan-400/30 text-sm opacity-90 flex justify-center items-center gap-2">
          Savings per Employee/Year: <span className="font-bold text-lg">฿{savingsPerEmployeeYear.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
        </div>
      </div>

      <div className="mt-12 prose prose-cyan max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Office vs WFH: การประเมินความคุ้มค่าทางการเงิน</h2>
        <p>
          นับตั้งแต่ยุคการระบาดของโควิด-19 รูปแบบการทำงานแบบ <strong>Work From Home (WFH)</strong> หรือ Remote Work ได้กลายมาเป็น New Normal สำหรับหลายบริษัท แม้ในปัจจุบันสถานการณ์จะปกติแล้ว แต่หลายองค์กรยังคงเลือกใช้นโยบายทำงานที่บ้านแบบ 100% หรือแบบผสมผสาน (Hybrid) เหตุผลหลักนอกจากความยืดหยุ่นของพนักงานแล้ว <strong>"การประหยัดต้นทุน" (Cost Savings)</strong> ถือเป็นปัจจัยระดับองค์กรที่ผู้บริหารนำมาพิจารณา
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ต้นทุนที่แฝงอยู่ในสำนักงาน (Traditional Office Costs)</h3>
        <p>
          การเช่าพื้นที่สำนักงานแบบดั้งเดิมมีค่าใช้จ่ายคงที่ (Fixed Costs) ที่สูงมาก ได้แก่:
        </p>
        <ul>
          <li><strong>ค่าเช่าพื้นที่ (Rent & Lease):</strong> มักเป็นรายจ่ายก้อนใหญ่ที่สุด ยิ่งอยู่ในทำเล CBD (Central Business District) ยิ่งมีราคาสูง</li>
          <li><strong>ค่าน้ำ ค่าไฟ และอินเทอร์เน็ต (Utilities):</strong> แอร์ ไฟส่องสว่าง และอินเทอร์เน็ตระดับองค์กร</li>
          <li><strong>ค่าใช้จ่ายเบ็ดเตล็ด (Supplies & Maintenance):</strong> กระดาษ เครื่องเขียน กาแฟ ขนมขบเคี้ยว ไปจนถึงค่าจ้างแม่บ้านทำความสะอาดและ รปภ.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ต้นทุนใหม่ที่เกิดขึ้นเมื่อทำงานที่บ้าน (WFH Costs)</h3>
        <p>
          การเปลี่ยนมาทำงานที่บ้านไม่ได้แปลว่าต้นทุนของบริษัทจะกลายเป็นศูนย์ บริษัทที่ดูแลพนักงานดี มักจะต้องมีการสนับสนุนอุปกรณ์และสวัสดิการเพิ่มเติม:
        </p>
        <ul>
          <li><strong>Stipend / Allowance:</strong> เงินช่วยเหลือค่าไฟ ค่าอินเทอร์เน็ต หรือค่าจัดโต๊ะทำงานตามหลักสรีรศาสตร์ (Ergonomics) ที่บ้าน</li>
          <li><strong>Software Subscriptions:</strong> ค่าไลเซนส์ระบบ Cloud, แพลตฟอร์มประชุมออนไลน์ (Zoom, Teams), เครื่องมือติดตามงาน (Asana, Jira) ที่ต้องอัปเกรดเพื่อรองรับคนจำนวนมาก</li>
          <li><strong>Co-working Spaces:</strong> งบประมาณสำหรับการนัดพบปะของทีม (Team Building) เป็นครั้งคราว เพื่อรักษาความสัมพันธ์</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ผลกระทบเชิงบวกต่อบรรทัดสุดท้าย (Bottom Line Impact)</h3>
        <p>
          โดยทั่วไป องค์กรสามารถประหยัดงบประมาณได้หลายหมื่นถึงหลายแสนบาทต่อปี "ต่อพนักงาน 1 คน" เมื่อเปลี่ยนเป็นระบบ WFH อย่างเต็มรูปแบบ เงินส่วนที่ประหยัดได้นี้สามารถนำไปลงทุนในการพัฒนาผลิตภัณฑ์ เพิ่มโบนัสให้กับพนักงาน หรือจ้างคนเก่งๆ จากทั่วโลก (Global Talent Pool) โดยไม่ต้องกังวลเรื่องพื้นที่โต๊ะทำงานไม่พอ 
        </p>
        <p>
          อย่างไรก็ตาม การตัดสินใจระหว่าง Office กับ WFH ไม่ได้ขึ้นอยู่กับตัวเลขทางการเงินเพียงอย่างเดียว ต้องคำนึงถึง <strong>วัฒนธรรมองค์กร (Company Culture)</strong> และ <strong>ประสิทธิภาพการทำงาน (Productivity)</strong> ร่วมด้วย
        </p>
        
        <p className="mt-4 text-sm text-gray-500">
          อ้างอิง: งานวิจัยด้านเศรษฐศาสตร์การทำงานระดับองค์กร (Remote Work Economics) และการประเมินค่าใช้จ่ายในการดำเนินงาน (Operating Expense Optimization)
        </p>
      </div>
    </div>
  );
};

export default OfficeVsWfhCalculator;
