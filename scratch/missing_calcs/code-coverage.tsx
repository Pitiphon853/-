import React, { useState } from 'react';
import { ShieldCheck, Target, AlertCircle, Cpu, RefreshCw, Info, CheckCircle } from 'lucide-react';

export default function CodeCoverageCalculator({ lang }: any) {
  const [impact, setImpact] = useState<string>('high');
  const [frequency, setFrequency] = useState<string>('medium');
  const [complexity, setComplexity] = useState<string>('medium');

  // Base coverage
  const baseCoverage = 40;

  // Modifiers
  const getImpactBonus = (val: string) => val === 'high' ? 30 : val === 'medium' ? 15 : 0;
  const getFrequencyBonus = (val: string) => val === 'high' ? 15 : val === 'medium' ? 5 : 0;
  const getComplexityBonus = (val: string) => val === 'high' ? 15 : val === 'medium' ? 5 : 0;

  let target = baseCoverage + getImpactBonus(impact) + getFrequencyBonus(frequency) + getComplexityBonus(complexity);
  if (target > 100) target = 100;

  const getTargetColor = (val: number) => {
    if (val >= 85) return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
    if (val >= 70) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (val >= 50) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
  };

  const getRecommendation = () => {
    if (target >= 85) {
      return lang === 'EN' 
        ? 'Critical component. Write extensive unit, integration, and edge-case tests. Aim for near perfection.'
        : 'เป็นโมดูลที่สำคัญระดับวิกฤต ควรเขียน Unit, Integration และครอบคลุม Edge-case ให้ได้มากที่สุด';
    }
    if (target >= 70) {
      return lang === 'EN'
        ? 'Important component. Focus on happy paths, main business logic, and common error handling.'
        : 'เป็นโมดูลสำคัญ ควรโฟกัสการเทสต์ Happy Path, ลอจิกหลักของธุรกิจ และการจัดการ Error พื้นฐาน';
    }
    if (target >= 50) {
      return lang === 'EN'
        ? 'Standard component. Test the main positive flows. Don\'t over-engineer the test cases.'
        : 'เป็นโมดูลมาตรฐาน เทสต์เฉพาะ Flow หลักๆ ที่ใช้บ่อย ไม่จำเป็นต้องเสียเวลาเขียนเทสต์ให้ครอบคลุมทุกกรณี';
    }
    return lang === 'EN'
      ? 'Low priority. Manual testing or basic smoke tests might be sufficient. Only test if you have spare time.'
      : 'เป็นโมดูลความเสี่ยงต่ำ การเทสต์แบบ Manual หรือ Smoke Test เบื้องต้นก็อาจเพียงพอแล้ว';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Risk-based Code Coverage Target' : 'คำนวณเป้าหมาย Code Coverage (อิงความเสี่ยง)'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Stop chasing 100% coverage everywhere. Find the right target for specific modules.'
            : 'หยุดตั้งเป้า 100% ทุกที่ คำนวณหา % ที่เหมาะสมกับแต่ละโมดูล เพื่อให้ทีมใช้เวลาอย่างคุ้มค่า'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
            
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <AlertCircle className="w-4 h-4 text-red-500" />
                {lang === 'EN' ? 'Business Impact if it fails' : 'ผลกระทบต่อธุรกิจหากโมดูลนี้พัง'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'low', label: lang === 'EN' ? 'Low (Internal UI)' : 'ต่ำ (เช่น UI ภายใน)' },
                  { val: 'medium', label: lang === 'EN' ? 'Medium (Normal feature)' : 'กลาง (ฟีเจอร์ทั่วไป)' },
                  { val: 'high', label: lang === 'EN' ? 'High (Payment, Auth)' : 'สูง (เช่น ระบบจ่ายเงิน)' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setImpact(opt.val)}
                    className={`py-2 px-1 text-sm rounded-lg border transition-colors ${
                      impact === opt.val
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <RefreshCw className="w-4 h-4 text-blue-500" />
                {lang === 'EN' ? 'Frequency of Changes' : 'ความถี่ในการแก้ไขโค้ดส่วนนี้'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'low', label: lang === 'EN' ? 'Rarely (< 1/year)' : 'น้อยมาก (< ปีละครั้ง)' },
                  { val: 'medium', label: lang === 'EN' ? 'Sometimes (Monthly)' : 'ปานกลาง (รายเดือน)' },
                  { val: 'high', label: lang === 'EN' ? 'Often (Weekly/Daily)' : 'บ่อย (รายสัปดาห์/วัน)' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setFrequency(opt.val)}
                    className={`py-2 px-1 text-sm rounded-lg border transition-colors ${
                      frequency === opt.val
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                <Cpu className="w-4 h-4 text-purple-500" />
                {lang === 'EN' ? 'Code Complexity' : 'ความซับซ้อนของลอจิก (Complexity)'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'low', label: lang === 'EN' ? 'Simple (CRUD, HTML)' : 'ง่าย (CRUD ทั่วไป)' },
                  { val: 'medium', label: lang === 'EN' ? 'Moderate logic' : 'ปานกลาง' },
                  { val: 'high', label: lang === 'EN' ? 'Complex algorithms' : 'ซับซ้อน (Algorithm ยากๆ)' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setComplexity(opt.val)}
                    className={`py-2 px-1 text-sm rounded-lg border transition-colors ${
                      complexity === opt.val
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className={`absolute top-0 w-full h-2 ${getTargetColor(target).split(' ')[1]}`} />
            
            <Target className={`w-12 h-12 mb-4 ${getTargetColor(target).split(' ')[0]}`} />
            
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">
              {lang === 'EN' ? 'Recommended Target Coverage' : 'เป้าหมาย Coverage ที่แนะนำ'}
            </h3>
            
            <div className="flex items-end justify-center gap-1 mb-4">
              <span className={`text-7xl font-bold ${getTargetColor(target).split(' ')[0]}`}>
                {target}
              </span>
              <span className={`text-4xl font-bold pb-1 ${getTargetColor(target).split(' ')[0]}`}>
                %
              </span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${getTargetColor(target)}`}>
              <CheckCircle className="w-4 h-4" />
              {lang === 'EN' ? 'Risk Profile Analysed' : 'วิเคราะห์ตามระดับความเสี่ยงแล้ว'}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-200">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              {lang === 'EN' ? 'Actionable Advice' : 'คำแนะนำในการเขียนเทสต์'}
            </h4>
            <p className="text-sm leading-relaxed">
              {getRecommendation()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ทำไมเป้าหมาย Code Coverage แบบ 100% ถึงเป็นเรื่องหลอกลวง (Anti-Pattern)</h2>
        
        <p>
          ในวงการพัฒนาซอฟต์แวร์ เรามักจะได้ยินคำกล่าวที่ว่า <em>"โค้ดที่ดีต้องมี Automated Test และ Code Coverage ต้องถึง 80% หรือ 100%"</em> ซึ่งในทางทฤษฎีนั้นฟังดูดีมาก แต่ในโลกแห่งความเป็นจริง การตั้งเป้าหมายแบบเหมาเข่ง (Flat Target) ให้ทุกบรรทัดในโปรเจกต์ต้องถูกเทสต์ มักจะนำไปสู่ผลลัพธ์ที่ตรงกันข้ามกับที่คาดหวัง
        </p>

        <p>
          เมื่อทีมถูกบีบด้วย KPI ให้ทำ Coverage ถึง 80% นักพัฒนามักจะเลือกเขียนเทสต์ให้กับ "โค้ดที่เขียนเทสต์ง่าย" (เช่น Getter/Setter หรือฟังก์ชันบวกเลขธรรมดา) เพื่อปั่นตัวเลขให้ถึงเป้า แต่กลับละเลยโค้ดที่มีความซับซ้อนและสำคัญจริงๆ เพราะมันเขียนเทสต์ยากและใช้เวลานาน ปรากฏการณ์นี้เรียกว่า <strong>"Coverage Inflation"</strong> ซึ่งหลอกให้เรารู้สึกปลอดภัย ทั้งที่ระบบจริงๆ ยังเปราะบาง
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Risk-based Testing คือคำตอบ</h3>
        <p>
          แทนที่จะพยายามเทสต์ทุกอย่าง เราควรเปลี่ยนมุมมองมาใช้ <strong>Risk-based Code Coverage</strong> หรือการกำหนดเป้าหมายการเทสต์ตามความเสี่ยงของแต่ละโมดูล (Module) โดยพิจารณาจาก 3 ปัจจัยหลัก ได้แก่:
        </p>
        
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>1. ผลกระทบต่อธุรกิจ (Business Impact):</strong>
            <br />
            โมดูลเกี่ยวกับการชำระเงิน (Payment Gateway) หรือการยืนยันตัวตน (Authentication) หากเกิดบั๊กขึ้นมา อาจทำให้บริษัทเสียรายได้มหาศาลหรือเสียชื่อเสียง โมดูลกลุ่มนี้ควรตั้งเป้า Coverage ไว้ที่ 90-100% และเขียนเทสต์ให้ครอบคลุมทุก Edge Case ในขณะที่หน้า UI ภายในหลังบ้าน (Admin Dashboard) อาจจะมี Coverage แค่ 30-40% ก็เพียงพอแล้ว
          </li>
          <li>
            <strong>2. ความถี่ในการเปลี่ยนแปลง (Frequency of Changes):</strong>
            <br />
            โค้ดที่ถูกแก้ไขบ่อย มีโอกาสสูงที่คนเข้ามาแก้ทีหลังจะเผลอทำพัง (Regression) โค้ดส่วนนี้จึงจำเป็นต้องมี Automated Test ที่รัดกุมคอยเป็นตาข่ายรองรับ (Safety Net) ส่วนโค้ดประเภท Boilerplate หรือ Configuration ที่เขียนครั้งเดียวแล้วไม่เคยแก้อีกเลยเป็นปีๆ การเสียเวลาเขียน Unit Test ให้มันอาจจะไม่คุ้มค่าแรง
          </li>
          <li>
            <strong>3. ความซับซ้อน (Code Complexity):</strong>
            <br />
            หากคุณมีฟังก์ชันที่รับพารามิเตอร์ 5 ตัว และมี if-else ซ้อนกันหลายชั้น (High Cyclomatic Complexity) มนุษย์จะไม่สามารถจำลองสถานการณ์ทั้งหมดในหัวได้หมด ฟังก์ชันแบบนี้จำเป็นต้องใช้ Unit Test เข้ามาช่วยยืนยันความถูกต้อง ส่วนฟังก์ชันง่ายๆ ที่อ่านบรรทัดเดียวก็รู้เรื่อง การเขียนเทสต์อาจจะไม่ได้เพิ่มมูลค่าเท่าไหร่นัก
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">วิธีนำแนวคิดนี้ไปปรับใช้ในทีม</h3>
        <p>
          เริ่มต้นโดยการแบ่งโปรเจกต์ของคุณออกเป็นส่วนๆ (Components/Modules) แล้วใช้เครื่องมือคำนวณด้านบนเพื่อประเมินเป้าหมาย Coverage ที่เหมาะสมสำหรับแต่ละส่วน จากนั้นในระบบ CI/CD ให้ตั้งค่าเกณฑ์ขั้นต่ำ (Threshold) แยกตามแฟ้มหรือโฟลเดอร์ แทนที่จะตั้งค่ารวมทั้งโปรเจกต์
        </p>
        <p>
          จำไว้เสมอว่า Code Coverage เป็นเพียงเครื่องมือที่ช่วยบอกว่า "โค้ดส่วนไหนยังไม่ได้ถูกเทสต์" ไม่ใช่เครื่องมือที่บอกว่า "โค้ดที่เทสต์แล้วมีคุณภาพดีเยี่ยม" การมี Coverage 60% ที่เทสต์เฉพาะส่วนสำคัญที่สุด มีค่ามากกว่า Coverage 90% ที่เกิดจากการปั่นเทสต์ที่ไม่มีความหมายเลย
        </p>
      </div>
    </div>
  );
}
