import React, { useState } from 'react';
import { Bus, AlertTriangle, CheckCircle, Plus, Trash2, ShieldAlert, Users } from 'lucide-react';

interface ComponentKnowledge {
  id: string;
  name: string;
  experts: number;
}

export default function BusFactorCalculator({ lang }: any) {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [components, setComponents] = useState<ComponentKnowledge[]>([
    { id: '1', name: 'Database Architecture', experts: 1 },
    { id: '2', name: 'Payment Gateway', experts: 2 },
    { id: '3', name: 'Frontend Core', experts: 3 },
  ]);

  const addComponent = () => {
    setComponents([...components, { id: Date.now().toString(), name: 'New Component', experts: 1 }]);
  };

  const removeComponent = (id: string) => {
    if (components.length > 1) {
      setComponents(components.filter(c => c.id !== id));
    }
  };

  const updateComponent = (id: string, field: keyof ComponentKnowledge, value: string | number) => {
    setComponents(components.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const busFactor = components.length > 0 
    ? Math.min(...components.map(c => c.experts)) 
    : 0;

  const getRiskLevel = (factor: number) => {
    if (factor <= 1) return { label: lang === 'EN' ? 'Critical Risk' : 'ความเสี่ยงวิกฤต', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' };
    if (factor === 2) return { label: lang === 'EN' ? 'High Risk' : 'ความเสี่ยงสูง', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    if (factor >= 3 && factor >= teamSize * 0.3) return { label: lang === 'EN' ? 'Low Risk' : 'ความเสี่ยงต่ำ', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' };
    return { label: lang === 'EN' ? 'Moderate Risk' : 'ความเสี่ยงปานกลาง', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
  };

  const risk = getRiskLevel(busFactor);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Bus Factor Risk Calculator' : 'ประเมินความเสี่ยง Bus Factor'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Identify knowledge silos and calculate how many team members can be hit by a bus before your project stalls.'
            : 'ประเมินจำนวนคนที่หายไปได้ก่อนที่โปรเจกต์จะหยุดชะงัก (ยิ่งน้อย ยิ่งเสี่ยงสูง)'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Users className="w-5 h-5" />
              <span className="font-medium">{lang === 'EN' ? 'Total Team Members' : 'จำนวนคนในทีมทั้งหมด'}</span>
            </div>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
              className="w-24 px-3 py-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-800 dark:text-white"
              min="1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {lang === 'EN' ? 'Project Components & Knowledge' : 'ระบบย่อยและคนที่รู้เรื่องนี้'}
              </h3>
              <button
                onClick={addComponent}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {lang === 'EN' ? 'Add' : 'เพิ่มระบบ'}
              </button>
            </div>

            <div className="space-y-3">
              {components.map((comp) => (
                <div key={comp.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={comp.name}
                    onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-sm"
                    placeholder={lang === 'EN' ? 'Component name' : 'ชื่อระบบ'}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                      {lang === 'EN' ? 'Experts:' : 'จำนวนคนที่รู้:'}
                    </span>
                    <input
                      type="number"
                      value={comp.experts}
                      onChange={(e) => updateComponent(comp.id, 'experts', Math.min(teamSize, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-gray-800 dark:text-white text-sm"
                      min="0"
                      max={teamSize}
                    />
                  </div>
                  <button
                    onClick={() => removeComponent(comp.id)}
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
          <div className={`p-6 rounded-2xl border ${risk.bg} border-transparent flex flex-col items-center justify-center text-center h-full min-h-[250px]`}>
            <Bus className={`w-12 h-12 mb-4 ${risk.color}`} />
            <h3 className="text-gray-600 dark:text-gray-300 mb-1 font-medium">
              {lang === 'EN' ? 'Overall Bus Factor' : 'ค่า Bus Factor ของทีม'}
            </h3>
            <div className={`text-6xl font-bold mb-4 ${risk.color}`}>
              {busFactor}
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-sm text-sm font-semibold ${risk.color}`}>
              {busFactor <= 2 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              {risk.label}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bus Factor คืออะไร และทำไมทีมพัฒนาซอฟต์แวร์ต้องใส่ใจ</h2>
        
        <p>
          ในโลกของการพัฒนาซอฟต์แวร์และการทำงานเป็นทีม มีคำศัพท์หนึ่งที่ฟังดูน่ากลัวแต่กลับมีความสำคัญอย่างมาก นั่นคือ <strong>"Bus Factor"</strong> (หรือบางครั้งเรียกว่า Truck Factor) ซึ่งหมายถึง <em>"จำนวนสมาชิกในทีมขั้นต่ำที่สุดที่จะต้องถูกรถบัสชน (หรือหายตัวไปกะทันหัน) แล้วส่งผลให้โปรเจกต์หยุดชะงัก ไม่สามารถเดินหน้าต่อไปได้"</em>
        </p>

        <p>
          แน่นอนว่าไม่มีใครอยากให้เกิดอุบัติเหตุขึ้นจริง แต่คำว่า "ถูกรถบัสชน" ในที่นี้เป็นเพียงการเปรียบเปรยถึงเหตุการณ์ไม่คาดฝันต่างๆ เช่น การลาออกกะทันหัน, การเจ็บป่วยระยะยาว, การย้ายแผนก, หรือแม้แต่การลางานไปพักร้อน หากโปรเจกต์ของคุณมีค่า Bus Factor เท่ากับ 1 นั่นหมายความว่า <strong>"ความรู้ถูกผูกติดอยู่กับคนเพียงคนเดียว (Knowledge Silo)"</strong> และความเสี่ยงของโปรเจกต์นั้นอยู่ในระดับวิกฤต
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">วิธีการคำนวณและประเมินความเสี่ยง</h3>
        <p>
          การคำนวณ Bus Factor สามารถทำได้โดยการแยกระบบงาน (Components) หรือความเชี่ยวชาญต่างๆ ในโปรเจกต์ออกมา แล้วนับว่ามีใครบ้างที่เข้าใจและสามารถแก้ไขโค้ดในส่วนนั้นได้ ค่า Bus Factor ของโปรเจกต์จะเท่ากับ "ตัวเลขที่น้อยที่สุด" ในบรรดาระบบงานทั้งหมด
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Bus Factor = 1 (ความเสี่ยงวิกฤต):</strong> มีระบบสำคัญที่รู้แค่คนเดียว ถ้าคนนี้ไม่อยู่ งานส่วนนี้จะไม่มีใครแก้ได้เลย ต้องใช้เวลาเรียนรู้ใหม่ทั้งหมด (Hero Culture)</li>
          <li><strong>Bus Factor = 2 (ความเสี่ยงสูง):</strong> เริ่มดีขึ้นมาหน่อย มีคนทำแทนได้ 1 คน แต่ถ้าสองคนนี้ลาพักร้อนพร้อมกัน โปรเจกต์ก็ยังเสี่ยงอยู่ดี</li>
          <li><strong>Bus Factor &gt; 2 (ความเสี่ยงปานกลาง-ต่ำ):</strong> ยิ่งตัวเลขนี้สูงเมื่อเทียบกับขนาดทีม ยิ่งแสดงให้เห็นถึงความยืดหยุ่นและการกระจายความรู้ที่ดี (Knowledge Sharing)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">วิธีเพิ่มค่า Bus Factor (ลดความเสี่ยงให้ทีม)</h3>
        <p>
          การทำให้ความเสี่ยงลดลง (หรือเพิ่มตัวเลข Bus Factor) ไม่ใช่แค่การจ้างคนเพิ่ม แต่เป็นการบริหารจัดการความรู้ภายในทีมให้กระจายตัวอย่างทั่วถึง ซึ่งสามารถทำได้ผ่านวิธีปฏิบัติต่างๆ ดังนี้:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Pair Programming
            </h4>
            <p className="text-sm">การจับคู่เขียนโค้ดช่วยให้คนที่สองได้เรียนรู้ลอจิกและโครงสร้างของระบบนั้นๆ ไปพร้อมกับคนที่เขียนหลักทันที เป็นการถ่ายทอดความรู้ที่มีประสิทธิภาพสูงสุด</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Code Review อย่างจริงจัง
            </h4>
            <p className="text-sm">ไม่ควรให้ผ่านโค้ดโดยไม่อ่าน การรีวิวโค้ดข้ามโมดูลหรือข้ามความเชี่ยวชาญจะช่วยให้คนอื่นในทีมรับรู้ว่าระบบส่วนอื่นๆ ทำงานอย่างไร</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              Documentation
            </h4>
            <p className="text-sm">เขียนเอกสารคู่มือ (ReadMe, Wiki, Architecture Decision Records) ให้ชัดเจน เพื่อเป็นแหล่งอ้างอิงให้คนที่จะมารับช่วงต่อ</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
              Cross-Training
            </h4>
            <p className="text-sm">จัดการอบรมภายใน หรือสลับหน้าที่รับผิดชอบ (Rotation) ให้สมาชิกทีมได้ลองไปทำงานในส่วนที่ตนเองไม่คุ้นเคยบ้าง</p>
          </div>
        </div>

        <p className="mt-6">
          สรุปแล้ว การวัดผล Bus Factor เป็นเครื่องมือที่ช่วยให้ Tech Lead หรือ Project Manager มองเห็นจุดอ่อนของทีมที่อาจจะถูกมองข้ามในช่วงที่ทุกอย่างกำลังไปได้สวย อย่ารอให้เกิดวิกฤตแล้วค่อยแก้ปัญหา เริ่มประเมินความเสี่ยงและทำ Knowledge Sharing ตั้งแต่วันนี้ เพื่อให้ทีมของคุณเติบโตได้อย่างยั่งยืนและแข็งแกร่ง
        </p>
      </div>
    </div>
  );
}
