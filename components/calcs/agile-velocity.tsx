import React, { useState } from 'react';
import { Activity, Target, Calendar, Plus, Trash2, TrendingUp, Info } from 'lucide-react';

interface SprintData {
  id: string;
  name: string;
  points: number;
}

export default function AgileVelocityCalculator({ lang }: any) {
  const [sprintLength, setSprintLength] = useState<number>(2); // in weeks
  const [backlogSize, setBacklogSize] = useState<number>(100);
  const [sprints, setSprints] = useState<SprintData[]>([
    { id: '1', name: 'Sprint 1', points: 22 },
    { id: '2', name: 'Sprint 2', points: 18 },
    { id: '3', name: 'Sprint 3', points: 25 },
  ]);

  const addSprint = () => {
    const nextNum = sprints.length + 1;
    setSprints([...sprints, { id: Date.now().toString(), name: `Sprint ${nextNum}`, points: 20 }]);
  };

  const removeSprint = (id: string) => {
    if (sprints.length > 1) {
      setSprints(sprints.filter(s => s.id !== id));
    }
  };

  const updateSprint = (id: string, field: keyof SprintData, value: string | number) => {
    setSprints(sprints.map(s => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  // Calculations
  const totalPoints = sprints.reduce((sum, s) => sum + s.points, 0);
  const averageVelocity = sprints.length > 0 ? (totalPoints / sprints.length) : 0;
  
  // Forecast
  const sprintsNeeded = averageVelocity > 0 ? Math.ceil(backlogSize / averageVelocity) : 0;
  const weeksNeeded = sprintsNeeded * sprintLength;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Agile Sprint Velocity Calculator' : 'เครื่องมือคำนวณ Agile Sprint Velocity'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Calculate average velocity and forecast time to complete the backlog.'
            : 'คำนวณความเร็วของทีม (Velocity) และคาดการณ์เวลาที่ใช้เคลียร์ Backlog ทั้งหมด'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              {lang === 'EN' ? 'Project Details' : 'ข้อมูลโปรเจกต์'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'EN' ? 'Total Backlog (Points)' : 'Backlog ที่เหลือ (Story Points)'}
                </label>
                <input
                  type="number"
                  value={backlogSize}
                  onChange={(e) => setBacklogSize(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'EN' ? 'Sprint Length (Weeks)' : 'ระยะเวลาต่อ 1 Sprint (สัปดาห์)'}
                </label>
                <input
                  type="number"
                  value={sprintLength}
                  onChange={(e) => setSprintLength(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                {lang === 'EN' ? 'Past Sprints History' : 'ประวัติ Sprint ที่ผ่านมา'}
              </h3>
              <button
                onClick={addSprint}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {lang === 'EN' ? 'Add Sprint' : 'เพิ่ม Sprint'}
              </button>
            </div>

            <div className="space-y-3">
              {sprints.map((sprint) => (
                <div key={sprint.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={sprint.name}
                    onChange={(e) => updateSprint(sprint.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-sm"
                    placeholder={lang === 'EN' ? 'Sprint name' : 'ชื่อ Sprint'}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={sprint.points}
                      onChange={(e) => updateSprint(sprint.id, 'points', Math.max(0, Number(e.target.value)))}
                      className="w-20 px-2 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-gray-800 dark:text-white text-sm"
                      min="0"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {lang === 'EN' ? 'pts' : 'แต้ม'}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSprint(sprint.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title={lang === 'EN' ? 'Remove' : 'ลบ'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-blue-100 font-medium mb-1">
              {lang === 'EN' ? 'Average Velocity' : 'ความเร็วเฉลี่ย (Average Velocity)'}
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold">{averageVelocity.toFixed(1)}</span>
              <span className="text-xl text-blue-200 mb-1">
                {lang === 'EN' ? 'pts / sprint' : 'แต้ม / Sprint'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <TrendingUp className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {lang === 'EN' ? 'Sprints Needed' : 'จำนวน Sprint ที่ต้องใช้'}
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {sprintsNeeded} <span className="text-base font-normal text-gray-500">Sprints</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {lang === 'EN' ? 'Est. Time to Complete' : 'เวลาที่ใช้โดยประมาณ'}
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {weeksNeeded} <span className="text-base font-normal text-gray-500">{lang === 'EN' ? 'Weeks' : 'สัปดาห์'}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200 flex gap-3">
            <Info className="w-6 h-6 flex-shrink-0" />
            <p>
              {lang === 'EN' 
                ? 'Forecast assumes the team size, sprint length, and project complexity remain constant. Velocity should be used for planning, not as a performance metric.' 
                : 'การคาดการณ์นี้อ้างอิงจากสมมติฐานที่ว่าขนาดของทีม ระยะเวลา และความยากของโปรเจกต์ยังคงที่ ควรใช้ Velocity เพื่อการวางแผนเท่านั้น ไม่ใช่เพื่อประเมินผลงาน (KPI)'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agile Sprint Velocity คืออะไร? ตัวช่วยในการประเมินเวลาจบโปรเจกต์</h2>
        
        <p>
          ในการพัฒนาซอฟต์แวร์แบบ Agile หรือ Scrum คำถามยอดฮิตที่ทีมพัฒนามักถูกถามจากลูกค้าหรือผู้บริหารคือ <strong>"โปรเจกต์นี้จะเสร็จเมื่อไหร่?"</strong> การตอบคำถามนี้แบบกะประมาณจากความรู้สึกอาจนำไปสู่ปัญหาได้ในอนาคต นี่คือเหตุผลที่ <strong>Velocity</strong> เข้ามามีบทบาทสำคัญ
        </p>

        <p>
          <strong>Sprint Velocity</strong> คือหน่วยวัดปริมาณงาน (โดยทั่วไปจะใช้ Story Points) ที่ทีมพัฒนาสามารถทำสำเร็จลุล่วงได้ภายใน 1 รอบการทำงาน (Sprint) เช่น หากทีมทำไปได้ 25 Points ใน Sprint ที่ 1 และ 20 Points ใน Sprint ที่ 2 แสดงว่าทีมมีความเร็วเฉลี่ยอยู่ที่ 22.5 Points ต่อ Sprint
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">ทำไมถึงต้องวัด Velocity?</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>เพื่อการคาดการณ์ที่แม่นยำ (Forecasting):</strong> เมื่อเรารู้ว่าใน Product Backlog เหลืองานทั้งหมดกี่แต้ม และทีมทำได้เฉลี่ยกี่แต้มต่อ Sprint เราก็จะสามารถคำนวณได้ว่าต้องใช้เวลากี่สัปดาห์ หรือกี่เดือน ถึงจะปล่อยของออกไปได้ทั้งหมด</li>
          <li><strong>เพื่อการวางแผนที่สมจริง (Capacity Planning):</strong> ช่วยให้ Product Owner (PO) หรือ Scrum Master รู้ว่าใน Sprint ถัดไป ควรดึงงานเข้ามาทำแค่ไหนถึงจะพอดี ไม่เยอะเกินไปจนทีม Burnout หรือน้อยเกินไปจนมีเวลาว่าง</li>
          <li><strong>เพื่อดูพัฒนาการของทีม (Continuous Improvement):</strong> เมื่อทีมทำงานด้วยกันนานขึ้น จะมีประสบการณ์และเข้าใจระบบมากขึ้น ซึ่งมักจะส่งผลให้ Velocity ค่อยๆ เสถียรและเพิ่มขึ้นอย่างเป็นธรรมชาติ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">กฎเหล็ก 3 ข้อที่ต้องจำไว้เกี่ยวกับการใช้ Velocity</h3>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-300">1. ห้ามใช้ Velocity เปรียบเทียบระหว่างทีม</h4>
            <p className="text-sm text-red-700 dark:text-red-200 mt-1">
              Story Point ของทีม A อาจจะไม่เท่ากับทีม B เพราะแต่ละทีมมีบรรทัดฐานและความเข้าใจเรื่องความยากง่ายไม่เหมือนกัน ทีมที่ได้ 50 Points อาจจะไม่ได้ทำงานเร็วกว่าทีมที่ได้ 20 Points เสมอไป
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-300">2. ห้ามใช้ Velocity เป็น KPI เด็ดขาด</h4>
            <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
              เมื่อไหร่ที่ผู้บริหารตั้งเป้าว่า "Sprint หน้าทีมต้องได้ Points มากขึ้น 20%" เมื่อนั้นทีมจะเริ่มทำการ "Inflation" หรือการปั่นแต้มให้เว่อร์เกินจริง เพื่อให้ได้ตามเป้าหมาย ซึ่งจะทำให้ประโยชน์ในการทำ Forecasting พังทลายลงทันที
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">3. นับเฉพาะงานที่ "เสร็จจริง" (Definition of Done)</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              ถ้าระบุแต้มไว้ 5 แต้ม แต่ทำงานไปได้ 90% ในช่วงปิด Sprint เราจะไม่นับแต้มนั้นเลย (ได้ 0) งานต้องผ่านเกณฑ์ Definition of Done ครบถ้วน ถึงจะนำแต้มไปรวมใน Velocity ได้
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">จะทำอย่างไรให้ Velocity เสถียรขึ้น?</h3>
        <p>
          ความท้าทายหลักคือการประเมิน Story Points ที่ไม่แม่นยำ หรือมีงานแทรกบ่อย (Unplanned work) สิ่งที่ควรทำคือ:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>ซอยงานใน Backlog ให้เล็กลง (Breakdown Tasks) งานที่ชิ้นเล็กจะประเมินได้แม่นยำกว่างานชิ้นใหญ่ๆ</li>
          <li>ใช้เทคนิค Planning Poker เพื่อให้ทุกคนในทีมได้ออกความเห็น และลดความลำเอียงในการประเมินแต้ม</li>
          <li>เผื่อเวลาสำหรับ Tech Debt และบั๊กที่โผล่มากลางคันเสมอ</li>
        </ul>
        
        <p className="mt-6 font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl">
          ลองใช้เครื่องคิดเลข Agile Sprint Velocity ด้านบน เพื่อทดลองจำลองสถานการณ์โปรเจกต์ของคุณดู เพียงแค่ใส่แต้มที่ทำได้ในอดีตและงานที่เหลืออยู่ ระบบจะคำนวณให้ทันทีว่าคุณยังต้องสู้รบกับโปรเจกต์นี้ไปอีกกี่สัปดาห์!
        </p>
      </div>
    </div>
  );
}
