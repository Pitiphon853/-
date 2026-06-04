import React, { useState } from 'react';
import { BookOpen, Calculator, RotateCcw, Clock, Target, Zap } from 'lucide-react';

export default function ReadingComprehension({ lang }: any) {
  const [totalWords, setTotalWords] = useState<number | ''>('');
  const [timeMinutes, setTimeMinutes] = useState<number | ''>('');
  const [totalQuestions, setTotalQuestions] = useState<number | ''>('');
  const [correctAnswers, setCorrectAnswers] = useState<number | ''>('');

  const [result, setResult] = useState<{
    comprehensionRate: number;
    wpm: number;
    efficiencyScore: number;
  } | null>(null);

  const calculate = () => {
    const words = Number(totalWords);
    const time = Number(timeMinutes);
    const questions = Number(totalQuestions);
    const correct = Number(correctAnswers);

    if (words > 0 && time > 0 && questions > 0 && correct >= 0 && correct <= questions) {
      const compRate = (correct / questions) * 100;
      const speed = words / time;
      const eff = speed * (compRate / 100);

      setResult({
        comprehensionRate: parseFloat(compRate.toFixed(2)),
        wpm: Math.round(speed),
        efficiencyScore: Math.round(eff)
      });
    }
  };

  const reset = () => {
    setTotalWords('');
    setTimeMinutes('');
    setTotalQuestions('');
    setCorrectAnswers('');
    setResult(null);
  };

  const isTH = lang === 'TH';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isTH ? 'เครื่องมือคำนวณประสิทธิภาพการอ่าน' : 'Reading Comprehension Calculator'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isTH 
            ? 'ประเมินความเร็วในการอ่าน (WPM) อัตราความเข้าใจ และประสิทธิภาพการอ่านโดยรวมของคุณ' 
            : 'Evaluate your reading speed (WPM), comprehension rate, and overall reading efficiency score.'}
        </p>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'จำนวนคำทั้งหมด (Total Words)' : 'Total Words in Text'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalWords}
                  onChange={(e) => setTotalWords(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder={isTH ? 'เช่น 1500' : 'e.g. 1500'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'เวลาที่ใช้ในการอ่าน (นาที)' : 'Time Taken (Minutes)'}
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder={isTH ? 'เช่น 5.5' : 'e.g. 5.5'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'จำนวนคำถามทดสอบ (Total Questions)' : 'Total Questions'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder={isTH ? 'เช่น 10' : 'e.g. 10'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'จำนวนที่ตอบถูก (Correct Answers)' : 'Correct Answers'}
                </label>
                <input
                  type="number"
                  min="0"
                  max={totalQuestions === '' ? undefined : Number(totalQuestions)}
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder={isTH ? 'เช่น 8' : 'e.g. 8'}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl flex flex-col justify-center space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  disabled={!totalWords || !timeMinutes || !totalQuestions || correctAnswers === ''}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  {isTH ? 'ประเมินผล' : 'Evaluate'}
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {result && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="text-emerald-600" size={24} />
                      <h3 className="font-semibold text-emerald-900">
                        {isTH ? 'ความเข้าใจ' : 'Comprehension'}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {result.comprehensionRate}%
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="text-blue-600" size={24} />
                      <h3 className="font-semibold text-blue-900">
                        {isTH ? 'ความเร็วในการอ่าน' : 'Reading Speed'}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      {result.wpm} <span className="text-sm font-normal">WPM</span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="text-amber-600" size={24} />
                      <h3 className="font-semibold text-amber-900">
                        {isTH ? 'ประสิทธิภาพ (E-WPM)' : 'Efficiency (E-WPM)'}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-amber-700">
                      {result.efficiencyScore}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="prose prose-emerald max-w-none mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2>วัดความเร็วและความเข้าใจในการอ่านของคุณ (Reading Comprehension & WPM)</h2>
        <p>
          ในยุคที่ข้อมูลข่าวสารล้นหลาม ทักษะการอ่านถือเป็นหนึ่งในทักษะที่สำคัญที่สุด ไม่ว่าคุณจะเป็นนักเรียน นิสิตนักศึกษา 
          หรือวัยทำงาน การสามารถอ่านข้อมูลจำนวนมากได้อย่างรวดเร็วและจับใจความได้อย่างถูกต้องแม่นยำ 
          คือข้อได้เปรียบที่จะช่วยให้คุณเรียนรู้ได้เร็วกว่าและประหยัดเวลาอันมีค่าได้อย่างมหาศาล เครื่องมือประเมินประสิทธิภาพการอ่านของเรา 
          ถูกออกแบบมาเพื่อช่วยให้คุณสามารถวัดและติดตามพัฒนาการทักษะการอ่านของคุณได้อย่างเป็นระบบ
        </p>

        <h3>ความเร็วในการอ่าน (WPM - Words Per Minute) คืออะไร?</h3>
        <p>
          <strong>Words Per Minute (WPM)</strong> เป็นหน่วยวัดความเร็วในการอ่านมาตรฐานระดับสากล 
          โดยคำนวณจากการนำจำนวนคำทั้งหมดที่อ่าน หารด้วยเวลาที่ใช้ในการอ่าน (เป็นนาที) 
          ตัวอย่างเช่น หากคุณอ่านบทความยาว 1,000 คำ จบภายในเวลา 5 นาที ความเร็วในการอ่านของคุณคือ 200 WPM
        </p>
        <p>
          <strong>เกณฑ์ความเร็วในการอ่านทั่วไป (สำหรับภาษาอังกฤษและบริบททั่วไป):</strong>
        </p>
        <ul>
          <li><strong>200 - 250 WPM:</strong> ระดับความเร็วเฉลี่ยของคนทั่วไป เหมาะสำหรับการอ่านเพื่อความเพลิดเพลินหรือนิยาย</li>
          <li><strong>300 - 400 WPM:</strong> ระดับความเร็วนักศึกษามหาวิทยาลัยที่มีทักษะการอ่านที่ดี</li>
          <li><strong>500 - 700 WPM:</strong> ระดับนักอ่านเร็ว (Speed Reader) มักอาศัยเทคนิคการกวาดสายตา (Skimming/Scanning)</li>
          <li><strong>1,000+ WPM:</strong> ระดับผู้เชี่ยวชาญการอ่านเร็วขั้นสูง</li>
        </ul>

        <h3>ความเข้าใจ (Comprehension) และประสิทธิภาพโดยรวม (Effective WPM)</h3>
        <p>
          การอ่านเร็วเพียงอย่างเดียวจะไม่มีประโยชน์เลย หากผู้อ่านไม่สามารถจดจำหรือทำความเข้าใจสิ่งที่อ่านได้ 
          นั่นจึงเป็นที่มาของการวัด <strong>อัตราความเข้าใจ (Comprehension Rate)</strong> ซึ่งวัดจากการทำแบบทดสอบหลังการอ่าน
        </p>
        <p>
          เมื่อนำความเร็วในการอ่าน (WPM) มาคูณกับอัตราความเข้าใจ (%) เราจะได้ค่าที่เรียกว่า <strong>Effective WPM (E-WPM)</strong> 
          หรือความเร็วในการอ่านที่มีประสิทธิภาพที่แท้จริง ตัวอย่างเช่น: หากคุณอ่านด้วยความเร็ว 400 WPM แต่อัตราความเข้าใจของคุณอยู่ที่ 50% 
          ค่า E-WPM ของคุณจะเท่ากับ 200 (400 x 0.5) ซึ่งหมายความว่าคุณรับรู้ข้อมูลได้อย่างแท้จริงเพียง 200 คำต่อนาทีเท่านั้น
        </p>

        <h3>วิธีพัฒนาทักษะการอ่านของคุณ</h3>
        <p>
          หากคุณต้องการเพิ่มความเร็วและความเข้าใจในการอ่าน ขอแนะนำเทคนิคเบื้องต้นต่อไปนี้:
        </p>
        <ol>
          <li><strong>เลิกอ่านออกเสียงในใจ (Subvocalization):</strong> พยายามกวาดสายตาไปที่คำศัพท์แทนการอ่านทีละคำในหัว</li>
          <li><strong>ใช้ปากกาหรือนิ้วนำสายตา (Pointer):</strong> การใช้ปลายนิ้วหรือปากกาชี้กวาดไปตามบรรทัด จะช่วยให้สายตาเคลื่อนที่ได้เร็วและสม่ำเสมอขึ้น</li>
          <li><strong>ขยายขอบเขตการมองเห็น (Peripheral Vision):</strong> ฝึกมองคำเป็นกลุ่ม (Chunking) 3-4 คำในครั้งเดียว แทนที่จะเพ่งไปที่คำใดคำหนึ่ง</li>
          <li><strong>ตั้งสมาธิ:</strong> ปิดสิ่งรบกวนรอบข้างก่อนเริ่มอ่านทุกครั้ง ความเข้าใจจะแปรผันตรงกับระดับของสมาธิ</li>
        </ol>
        <p>
          ใช้เครื่องมือคำนวณของเราเพื่อตั้งเป้าหมายและทดสอบพัฒนาการของคุณอย่างสม่ำเสมอ การฝึกฝนอย่างถูกวิธีจะทำให้คุณกลายเป็นนักอ่านที่เก่งและรวดเร็วยิ่งขึ้น!
        </p>
      </article>
    </div>
  );
}
