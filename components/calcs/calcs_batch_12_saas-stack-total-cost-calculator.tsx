import React, { useState } from 'react';
import { Layers, Plus, Trash2, PieChart, DollarSign } from 'lucide-react';

interface SaaSItem {
  id: number;
  name: string;
  costPerUser: number;
  users: number;
}

export default function SaasStackTotalCostCalculator({ lang }: any) {
  const [tools, setTools] = useState<SaaSItem[]>([
    { id: 1, name: 'Google Workspace / M365', costPerUser: 6, users: 20 },
    { id: 2, name: 'Slack / MS Teams', costPerUser: 8, users: 20 },
    { id: 3, name: 'CRM (e.g. HubSpot, Salesforce)', costPerUser: 50, users: 5 },
    { id: 4, name: 'Project Mgmt (e.g. Jira, Asana)', costPerUser: 10, users: 20 },
    { id: 5, name: 'Design / Dev (e.g. Figma, GitHub)', costPerUser: 15, users: 8 }
  ]);

  const [totalEmployees, setTotalEmployees] = useState<number>(20);

  const addTool = () => {
    const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1;
    setTools([...tools, { id: newId, name: 'New Software', costPerUser: 0, users: 1 }]);
  };

  const removeTool = (id: number) => {
    setTools(tools.filter(t => t.id !== id));
  };

  const updateTool = (id: number, field: keyof SaaSItem, value: string | number) => {
    setTools(tools.map(t => {
      if (t.id === id) {
        return { ...t, [field]: value };
      }
      return t;
    }));
  };

  const totalMonthlyCost = tools.reduce((acc, tool) => acc + (tool.costPerUser * tool.users), 0);
  const totalYearlyCost = totalMonthlyCost * 12;
  const costPerEmployee = totalEmployees > 0 ? totalYearlyCost / totalEmployees : 0;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณค่าใช้จ่าย SaaS Stack' : 'SaaS Stack Total Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'จัดการและติดตามค่าบริการซอฟต์แวร์รายเดือน/รายปี เพื่อป้องกันงบประมาณบานปลาย' : 'Track and manage your monthly/yearly software subscriptions to prevent budget sprawl.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              {lang === 'TH' ? 'รายการซอฟต์แวร์ (Software Subscriptions)' : 'Software Subscriptions'}
            </h3>
            <button
              onClick={addTool}
              className="flex items-center gap-1 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg transition-colors dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
            >
              <Plus className="w-4 h-4" />
              {lang === 'TH' ? 'เพิ่มรายการ' : 'Add Tool'}
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-3 bg-gray-100 dark:bg-gray-700/50 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="col-span-5">{lang === 'TH' ? 'ชื่อเครื่องมือ / ซอฟต์แวร์' : 'Software Name'}</div>
              <div className="col-span-3 text-right">{lang === 'TH' ? 'ราคาต่อบัญชี ($)' : 'Cost/User ($)'}</div>
              <div className="col-span-2 text-right">{lang === 'TH' ? 'ผู้ใช้งาน' : 'Users'}</div>
              <div className="col-span-2 text-center">{lang === 'TH' ? 'ลบ' : 'Remove'}</div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {tools.map((tool) => (
                <div key={tool.id} className="p-3 sm:grid sm:grid-cols-12 sm:gap-4 flex flex-col gap-3 items-center">
                  <div className="w-full sm:col-span-5">
                    <input
                      type="text"
                      value={tool.name}
                      onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder={lang === 'TH' ? 'ชื่อซอฟต์แวร์...' : 'Software Name...'}
                    />
                  </div>
                  <div className="w-full sm:col-span-3 flex items-center justify-between sm:justify-end">
                    <span className="text-xs text-gray-500 sm:hidden">{lang === 'TH' ? 'ราคา ($):' : 'Cost ($):'}</span>
                    <input
                      type="number"
                      value={tool.costPerUser}
                      onChange={(e) => updateTool(tool.id, 'costPerUser', Number(e.target.value))}
                      className="w-24 px-3 py-1.5 text-sm text-right border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end">
                    <span className="text-xs text-gray-500 sm:hidden">{lang === 'TH' ? 'ผู้ใช้งาน:' : 'Users:'}</span>
                    <input
                      type="number"
                      value={tool.users}
                      onChange={(e) => updateTool(tool.id, 'users', Number(e.target.value))}
                      className="w-20 px-3 py-1.5 text-sm text-right border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="w-full sm:col-span-2 flex justify-end sm:justify-center">
                    <button
                      onClick={() => removeTool(tool.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title={lang === 'TH' ? 'ลบรายการ' : 'Remove item'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {tools.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                  {lang === 'TH' ? 'ยังไม่มีรายการซอฟต์แวร์ คลิกปุ่ม "เพิ่มรายการ" เพื่อเริ่มต้น' : 'No software added. Click "Add Tool" to begin.'}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl border border-indigo-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-6 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-indigo-600" />
              {lang === 'TH' ? 'สรุปงบประมาณ SaaS' : 'SaaS Budget Summary'}
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lang === 'TH' ? 'รวมค่าใช้จ่ายรายเดือน' : 'Total Monthly Cost'}
                </p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-gray-400" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalMonthlyCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md text-white">
                <p className="text-indigo-100 text-sm mb-1">
                  {lang === 'TH' ? 'รวมค่าใช้จ่ายรายปี (Annual Run Rate)' : 'Total Yearly Cost (ARR)'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold">
                    ${totalYearlyCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === 'TH' ? 'จำนวนพนักงานทั้งหมดในบริษัท (คน)' : 'Total Company Employees'}
              </label>
              <input
                type="number"
                value={totalEmployees}
                onChange={(e) => setTotalEmployees(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mb-3"
              />
              <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg text-sm">
                <span className="text-gray-600 dark:text-gray-300">{lang === 'TH' ? 'ต้นทุนซอฟต์แวร์ต่อพนักงาน/ปี' : 'Software Spend / Employee / Year'}</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">${costPerEmployee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณค่าใช้จ่าย SaaS Stack คืออะไร?</h2>
        <p>SaaS (Software as a Service) คือรูปแบบการให้บริการซอฟต์แวร์ผ่านระบบคลาวด์ ที่ผู้ใช้งานไม่ต้องติดตั้งโปรแกรมลงในเครื่อง แต่จ่ายค่าบริการเป็นรายเดือนหรือรายปีแทน (Subscription-based) ปัจจุบันธุรกิจแทบทุกแห่งขับเคลื่อนด้วย SaaS อย่างหลีกเลี่ยงไม่ได้ เครื่องมือนี้ถูกสร้างขึ้นมาเพื่อช่วยผู้บริหารและฝ่ายไอที รวบรวมและวิเคราะห์ "ค่าใช้จ่ายซอฟต์แวร์แอบแฝง" ทั้งหมด เพื่อป้องกันปัญหาที่เรียกว่า SaaS Sprawl (การกระจายตัวของซอฟต์แวร์จนควบคุมไม่ได้)</p>

        <h3>ปัญหา SaaS Sprawl คืออะไร?</h3>
        <p>เมื่อบริษัทของคุณเติบโตขึ้น ปัญหาหนึ่งที่มักจะเกิดขึ้นคือ แต่ละแผนกจะแอบไปซื้อซอฟต์แวร์มาใช้งานกันเอง (Shadow IT) โดยไม่ได้ผ่านการอนุมัติส่วนกลาง เช่น ฝ่ายการตลาดใช้ Asana, ฝ่ายพัฒนาโปรแกรมใช้ Jira, ส่วนฝ่ายบุคคลใช้ Trello ทั้งๆ ที่ทั้งสามตัวนี้เป็นเครื่องมือจัดการโปรเจกต์เหมือนกัน ผลที่ตามมาคือ:</p>
        <ul>
          <li><strong>การจ่ายเงินซ้ำซ้อน (Duplicated Spend):</strong> บริษัทจ่ายเงินค่าบริการเครื่องมือที่มีฟีเจอร์เหมือนกันหลายตัว</li>
          <li><strong>บัญชีผี (Zombie Accounts):</strong> พนักงานลาออกไปแล้ว 6 เดือน แต่บริษัทยังคงตัดบัตรเครดิตจ่ายค่าไลเซนส์ของพนักงานคนนั้นทุกเดือน</li>
          <li><strong>ข้อมูลกระจัดกระจาย (Data Silos):</strong> ข้อมูลลูกค้าและข้อมูลงานถูกเก็บแยกกันคนละแพลตฟอร์ม ทำให้การทำงานข้ามแผนกไร้ประสิทธิภาพ</li>
        </ul>

        <h3>วิธีบริหารจัดการ SaaS Stack ให้มีประสิทธิภาพ</h3>
        <p>เพื่อลดต้นทุนและเพิ่มประสิทธิภาพ (Optimize SaaS Spend) คุณควรทำตามขั้นตอนต่อไปนี้:</p>
        <ol>
          <li><strong>Auditing (การตรวจสอบบัญชีซอฟต์แวร์):</strong> ใช้เครื่องมือคำนวณด้านบนเพื่อลิสต์รายชื่อโปรแกรมทั้งหมดที่บริษัทใช้อยู่ โดยเช็คจากรายการหักบัตรเครดิตบริษัท คุณอาจจะตกใจเมื่อพบยอดรวมรายปีที่แท้จริง</li>
          <li><strong>Consolidation (การยุบรวมเครื่องมือ):</strong> มองหาซอฟต์แวร์ที่ทำงานทับซ้อนกัน แล้วบังคับใช้มาตรฐานเดียวกันทั้งบริษัท (เช่น ให้ทุกคนใช้ Google Workspace สำหรับแชร์ไฟล์แทนที่จะมีทั้ง Google Drive, Dropbox และ OneDrive ปนกันไปหมด)</li>
          <li><strong>Right-sizing (การปรับลดแพ็กเกจ):</strong> ซอฟต์แวร์ส่วนใหญ่มีหลายระดับราคา (Tiers) ตรวจสอบว่าคุณกำลังจ่ายเงินสำหรับแพ็กเกจ Enterprise ที่มีฟีเจอร์หรูหราเกินความจำเป็นที่ทีมคุณใช้งานจริงอยู่หรือไม่</li>
          <li><strong>Annual Billing (เปลี่ยนเป็นจ่ายรายปี):</strong> เมื่อคัดกรองจนเหลือแต่ซอฟต์แวร์ที่จำเป็นจริงๆ (Core Tools) ให้เปลี่ยนการจ่ายเงินจากรายเดือนเป็นรายปี ซึ่งส่วนใหญ่มักจะได้ส่วนลดถึง 15% - 20%</li>
        </ol>

        <h3>เกณฑ์มาตรฐาน (Benchmark) ที่ควรรู้</h3>
        <p>โดยเฉลี่ยแล้ว ธุรกิจขนาดกลาง (SME) มักจะมีต้นทุนซอฟต์แวร์ SaaS อยู่ที่ประมาณ $1,000 ถึง $3,000 ต่อพนักงาน 1 คนต่อปี หากค่าเฉลี่ยของคุณสูงกว่านี้มาก อาจถึงเวลาที่คุณต้องเริ่มกระบวนการตัดลดรายจ่ายด้านไอทีอย่างเร่งด่วน</p>
      </div>
    </div>
  );
}
