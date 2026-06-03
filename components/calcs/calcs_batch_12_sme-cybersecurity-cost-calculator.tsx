import React, { useState } from 'react';
import { ShieldAlert, Users, Server, Lock, AlertTriangle } from 'lucide-react';

export default function SmeCybersecurityCostCalculator({ lang }: any) {
  const [employees, setEmployees] = useState<number>(50);
  const [edrCost, setEdrCost] = useState<number>(60);
  const [trainingCost, setTrainingCost] = useState<number>(30);
  const [firewallCost, setFirewallCost] = useState<number>(1200);
  const [auditCost, setAuditCost] = useState<number>(3000);

  const perUserCost = (edrCost + trainingCost) * employees;
  const fixedCost = firewallCost + auditCost;
  const totalYearlyCost = perUserCost + fixedCost;

  const costPerEmployee = totalYearlyCost / employees;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือประเมินงบประมาณ Cybersecurity (SME)' : 'SME Cybersecurity Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'คำนวณค่าใช้จ่ายขั้นพื้นฐานเพื่อปกป้องธุรกิจของคุณจากภัยคุกคามทางไซเบอร์' : 'Calculate baseline expenses to protect your business from digital threats.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              {lang === 'TH' ? 'ต้นทุนแปรผันตามจำนวนพนักงาน' : 'Per-User Costs'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'จำนวนพนักงาน/ผู้ใช้งาน (คน)' : 'Number of Employees'}
                </label>
                <input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'ค่า Antivirus/EDR ต่อคนต่อปี ($)' : 'Endpoint Security (EDR) / User / Year ($)'}
                </label>
                <input
                  type="number"
                  value={edrCost}
                  onChange={(e) => setEdrCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'ค่าอบรมพนักงาน (Security Training) ต่อคน/ปี ($)' : 'Security Awareness Training / User / Year ($)'}
                </label>
                <input
                  type="number"
                  value={trainingCost}
                  onChange={(e) => setTrainingCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              {lang === 'TH' ? 'ต้นทุนคงที่รายปี' : 'Fixed Annual Costs'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'ค่าบำรุงรักษา Network / Firewall ($)' : 'Network / Firewall Security ($)'}
                </label>
                <input
                  type="number"
                  value={firewallCost}
                  onChange={(e) => setFirewallCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'TH' ? 'ค่าจ้างตรวจสอบระบบ / Pen Test (VAPT) ($)' : 'External Audit / Penetration Testing ($)'}
                </label>
                <input
                  type="number"
                  value={auditCost}
                  onChange={(e) => setAuditCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-slate-800 dark:bg-slate-900 p-6 rounded-xl text-white flex-grow flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              {lang === 'TH' ? 'สรุปงบประมาณการรักษาความปลอดภัยไซเบอร์' : 'Cybersecurity Budget Summary'}
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-slate-300">{lang === 'TH' ? 'รวมต้นทุนรายคน (ผู้ใช้)' : 'Total User-based Cost'}</span>
                <span className="font-semibold">${perUserCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-slate-300">{lang === 'TH' ? 'รวมต้นทุนระบบเครือข่าย' : 'Total Infrastructure Cost'}</span>
                <span className="font-semibold">${fixedCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-700/50 p-5 rounded-xl border border-slate-600 text-center">
              <p className="text-slate-300 text-sm mb-1">
                {lang === 'TH' ? 'รวมค่าใช้จ่ายต่อปี (Total Yearly Cost)' : 'Total Yearly Cost'}
              </p>
              <p className="text-4xl font-bold text-emerald-400 mb-2">
                ${totalYearlyCost.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 bg-slate-800 inline-block px-3 py-1 rounded-full">
                {lang === 'TH' ? `เฉลี่ยต่อพนักงาน $${costPerEmployee.toFixed(0)} / คน / ปี` : `Avg $${costPerEmployee.toFixed(0)} / employee / year`}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700/50 flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {lang === 'TH' 
                ? 'ค่าเฉลี่ยความเสียหายจากการถูกแรนซัมแวร์ (Ransomware) โจมตีของ SME อยู่ที่ราว $100,000 - $500,000 การลงทุนป้องกันล่วงหน้าจึงคุ้มค่ากว่ามาก' 
                : 'The average cost of a ransomware attack for SMEs is between $100k - $500k. Investing in prevention is significantly cheaper than recovery.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือประเมินค่าใช้จ่าย Cybersecurity สำหรับ SME คืออะไร?</h2>
        <p>หลายคนมักมีความเชื่อผิดๆ ว่า "บริษัทของฉันเป็นแค่ SME เล็กๆ แฮกเกอร์คงไม่สนใจจะมาเจาะระบบหรอก" แต่ในความเป็นจริงแล้ว แฮกเกอร์มักจะใช้โปรแกรมอัตโนมัติ (Automated Bots) ในการสแกนหาช่องโหว่บนอินเทอร์เน็ต และมักจะพุ่งเป้าไปที่ธุรกิจขนาดกลางและขนาดย่อม (SME) เพราะรู้ว่าบริษัทเหล่านี้มักไม่มีงบประมาณจ้างทีมไอทีรักษาความปลอดภัยที่แข็งแกร่ง เครื่องมือนี้จึงถูกออกแบบมาเพื่อให้เจ้าของธุรกิจเห็นภาพโครงสร้างพื้นฐานด้านความปลอดภัยไซเบอร์ (Cybersecurity Baseline) ที่ควรต้องลงทุนในแต่ละปี</p>

        <h3>โครงสร้างต้นทุนความปลอดภัยขั้นพื้นฐาน (Cybersecurity Stack)</h3>
        <p>งบประมาณด้านไอทีของคุณควรถูกแบ่งออกเป็น 2 ส่วนหลักๆ คือ ค่าใช้จ่ายที่แปรผันตามจำนวนพนักงาน และค่าใช้จ่ายแบบเหมาจ่ายสำหรับองค์กร:</p>
        <ul>
          <li><strong>Endpoint Security (EDR/MDR):</strong>หมดยุคของการใช้แค่ Antivirus ธรรมดา (ที่เป็นแบบ Signature-based) แล้ว ปัจจุบันธุรกิจควรใช้ระบบ EDR (Endpoint Detection and Response) เพื่อป้องกันไวรัสเรียกค่าไถ่ (Ransomware) และมัลแวร์ขั้นสูง ค่าใช้จ่ายมักจะคิดเป็นรายเครื่อง/รายปี (ประมาณ $50 - $100 ต่อคน)</li>
          <li><strong>Security Awareness Training:</strong> ช่องโหว่ที่ใหญ่ที่สุดของทุกองค์กรไม่ใช่ระบบเซิร์ฟเวอร์ แต่คือ "พนักงาน" การถูกหลอกให้คลิกลิงก์ฟิชชิ่ง (Phishing) เป็นสาเหตุหลักของการถูกแฮก การฝึกอบรมพนักงานเป็นประจำจึงเป็นการลงทุนที่คุ้มค่าและมีราคาถูกมาก</li>
          <li><strong>Network Security & Firewall:</strong> แม้ปัจจุบันระบบหลายอย่างจะย้ายไปอยู่บนคลาวด์แล้ว แต่หากคุณมีออฟฟิศที่พนักงานต้องเข้ามาทำงาน การมีระบบ Firewall ที่ทันสมัยระดับองค์กร (Next-Gen Firewall) ก็เป็นสิ่งจำเป็นเพื่อคัดกรองทราฟฟิกขาเข้าและขาออก</li>
          <li><strong>Vulnerability Assessment and Penetration Testing (VAPT):</strong> การจ้างบุคคลภายนอกมาเจาะระบบองค์กรอย่างน้อยปีละ 1 ครั้ง หรือการตรวจสอบ (Audit) เพื่อให้เป็นไปตามกฎหมาย PDPA หรือมาตรฐาน ISO 27001 สิ่งนี้ถือเป็นค่าใช้จ่ายคงที่ที่มีมูลค่าสูง แต่จำเป็นเพื่อรับรองมาตรฐานกับพาร์ทเนอร์ทางธุรกิจ</li>
        </ul>

        <h3>ความคุ้มค่าของการลงทุน (ROI of Cybersecurity)</h3>
        <p>การลงทุนด้าน Cybersecurity มักถูกมองว่าเป็น "รายจ่ายที่สูญเปล่า" เพราะไม่ก่อให้เกิดรายได้โดยตรง แต่หากมองในมุมของการบริหารความเสี่ยง (Risk Management) แล้ว ถือเป็นการตัดสินใจที่สำคัญที่สุด เพราะเมื่อเกิดเหตุการณ์ข้อมูลหลุด (Data Breach) หรือถูก Ransomware โจมตี ธุรกิจ SME กว่า 60% มักจะต้องปิดกิจการลงภายใน 6 เดือน สาเหตุมาจาก:</p>
        <ol>
          <li><strong>ค่าปรับทางกฎหมาย:</strong> เช่น กฎหมาย PDPA (หรือ GDPR ในยุโรป) มีบทลงโทษรุนแรงหากข้อมูลส่วนบุคคลของลูกค้าหลุดรอดออกไป</li>
          <li><strong>ความเสียหายต่อชื่อเสียง (Reputation Damage):</strong> ลูกค้าและคู่ค้าจะสูญเสียความไว้วางใจ และเปลี่ยนไปใช้บริการคู่แข่งแทน</li>
          <li><strong>ระบบหยุดชะงัก (Downtime):</strong> หากไม่สามารถใช้คอมพิวเตอร์หรือระบบบัญชีได้ ธุรกิจจะไม่สามารถดำเนินงานได้ ส่งผลต่อกระแสเงินสด (Cash Flow) โดยตรง</li>
        </ol>

        <h3>คำแนะนำเพิ่มเติม</h3>
        <p>งบประมาณด้าน Cybersecurity ที่เหมาะสมควรอยู่ที่ประมาณ 10% - 15% ของงบประมาณ IT ทั้งหมดขององค์กร หากคุณมีงบจำกัด ให้เริ่มต้นด้วยการบังคับเปิดใช้งาน <strong>MFA (Multi-Factor Authentication)</strong> ให้กับทุกบัญชีในบริษัท ซึ่งเป็นวิธีที่ฟรีและป้องกันการถูกแฮกรหัสผ่านได้กว่า 99% จากนั้นจึงค่อยลงทุนซื้อระบบ EDR และฝึกอบรมพนักงานตามลำดับ</p>
      </div>
    </div>
  );
}
