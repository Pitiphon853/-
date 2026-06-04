import React, { useState } from 'react';
import { Brain, Calculator, RotateCcw, Calendar, TrendingUp, Info } from 'lucide-react';

export default function SpacedRepetition({ lang }: any) {
  const [interval, setInterval] = useState<number>(0);
  const [easeFactor, setEaseFactor] = useState<number>(2.5);
  const [quality, setQuality] = useState<number>(4);

  const [result, setResult] = useState<{ nextInterval: number; newEaseFactor: number } | null>(null);

  const calculate = () => {
    let nextI = 0;
    let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    
    if (newEF < 1.3) newEF = 1.3;

    if (quality < 3) {
      nextI = 1;
    } else {
      if (interval === 0) {
        nextI = 1;
      } else if (interval === 1) {
        nextI = 6;
      } else {
        nextI = Math.round(interval * easeFactor);
      }
    }

    setResult({
      nextInterval: nextI,
      newEaseFactor: parseFloat(newEF.toFixed(2))
    });
  };

  const reset = () => {
    setInterval(0);
    setEaseFactor(2.5);
    setQuality(4);
    setResult(null);
  };

  const isTH = lang === 'TH';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-2">
          <Brain size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isTH ? 'เครื่องมือคำนวณระยะเวลาการทบทวน (Spaced Repetition)' : 'Spaced Repetition Calculator'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isTH 
            ? 'คำนวณระยะเวลาที่เหมาะสมที่สุดในการทบทวนเนื้อหาหรือคำศัพท์ โดยใช้ขั้นตอนวิธีอัลกอริทึม SM-2' 
            : 'Calculate the optimal interval for reviewing study materials using the SM-2 algorithm.'}
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ระยะเวลาที่เว้นไปปัจจุบัน (วัน)' : 'Current Interval (days)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={interval}
                  onChange={(e) => setInterval(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="0 สำหรับเนื้อหาใหม่"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {isTH ? '* ใส่ 0 หากเพิ่งเริ่มเรียนรู้ครั้งแรก' : '* Enter 0 if this is newly learned material'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'ค่าความง่ายดาย (Ease Factor)' : 'Current Ease Factor'}
                </label>
                <input
                  type="number"
                  min="1.3"
                  step="0.1"
                  value={easeFactor}
                  onChange={(e) => setEaseFactor(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {isTH ? '* ค่าเริ่มต้นคือ 2.5' : '* Default starting value is 2.5'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isTH ? 'คุณภาพการนึกออก (Quality of Recall: 0-5)' : 'Quality of Recall (0-5)'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 ({isTH ? 'ลืมสนิท' : 'Complete Blackout'})</span>
                  <span>5 ({isTH ? 'จำได้แม่น' : 'Perfect Recall'})</span>
                </div>
                <div className="mt-2 text-center text-sm font-semibold text-indigo-600">
                  {isTH ? 'ระดับที่เลือก:' : 'Selected Level:'} {quality}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl flex flex-col justify-center space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  {isTH ? 'คำนวณ' : 'Calculate'}
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                  title={isTH ? 'รีเซ็ต' : 'Reset'}
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {result && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-indigo-100 rounded-xl border border-indigo-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-indigo-900">
                        {isTH ? 'รอบการทบทวนครั้งถัดไป' : 'Next Review Interval'}
                      </h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-700 flex items-baseline gap-2">
                      {result.nextInterval} <span className="text-lg font-normal">{isTH ? 'วัน' : 'days'}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-1">
                      <TrendingUp className="text-green-600" size={20} />
                      <h3 className="font-semibold text-green-900">
                        {isTH ? 'ค่า Ease Factor ใหม่' : 'New Ease Factor'}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {result.newEaseFactor}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="flex items-center gap-2 font-semibold text-blue-900 mb-4">
          <Info size={20} />
          {isTH ? 'ระดับคุณภาพการนึกออก (0-5)' : 'Quality of Recall Guide (0-5)'}
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li><strong>5:</strong> {isTH ? 'จำได้อย่างสมบูรณ์แบบ ตอบได้ทันทีโดยไม่ต้องพยายาม' : 'Perfect response, no hesitation.'}</li>
          <li><strong>4:</strong> {isTH ? 'จำได้ถูกต้อง แต่มีอาการลังเลเล็กน้อย' : 'Correct response after a hesitation.'}</li>
          <li><strong>3:</strong> {isTH ? 'จำได้ถูกต้อง แต่ต้องใช้ความพยายามในการนึกพอสมควร' : 'Correct response recalled with serious difficulty.'}</li>
          <li><strong>2:</strong> {isTH ? 'จำผิด แต่พอมองเฉลยแล้วรู้สึกคุ้นเคยและนึกออก' : 'Incorrect response; where the correct one seemed easy to recall.'}</li>
          <li><strong>1:</strong> {isTH ? 'จำผิด แต่พอมองเฉลยแล้วพอจำได้ลางๆ' : 'Incorrect response; the correct one remembered.'}</li>
          <li><strong>0:</strong> {isTH ? 'ลืมสนิท ไม่เหลือความทรงจำใดๆ เลย' : 'Complete blackout.'}</li>
        </ul>
      </div>

      {/* SEO Article */}
      <article className="prose prose-indigo max-w-none mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2>เคล็ดลับการจำด้วย Spaced Repetition (การเว้นระยะทบทวน)</h2>
        <p>
          คุณเคยสงสัยหรือไม่ว่า ทำไมเวลาเราท่องจำคำศัพท์หรืออ่านหนังสือเตรียมสอบอย่างหนักหน่วงในคืนเดียวก่อนสอบ (Cramming) 
          หลังจากการสอบผ่านไปเพียงไม่กี่สัปดาห์ ความรู้เหล่านั้นมักจะเลือนหายไปจากสมองอย่างรวดเร็ว? คำตอบสำหรับเรื่องนี้ถูกอธิบายไว้โดย
          Hermann Ebbinghaus นักจิตวิทยาชาวเยอรมัน ผู้ค้นพบ <strong>Forgetting Curve (เส้นโค้งแห่งการลืม)</strong> ซึ่งชี้ให้เห็นว่า 
          มนุษย์เราจะลืมข้อมูลที่เพิ่งเรียนรู้ไปมากกว่า 50% ภายในเวลาเพียงไม่กี่วัน หากไม่มีการนำกลับมาทบทวนซ้ำอย่างถูกวิธี
        </p>

        <h3>Spaced Repetition คืออะไร?</h3>
        <p>
          <strong>Spaced Repetition System (SRS)</strong> หรือระบบการทบทวนแบบเว้นระยะ คือเทคนิคการเรียนรู้ที่อาศัยการทบทวนเนื้อหา
          ในช่วงเวลาที่เหมาะสมที่สุด โดยอัลกอริทึมจะคำนวณช่วงเวลาที่คุณ "กำลังจะลืม" เนื้อหานั้นพอดี แล้วนำมันกลับมาให้คุณทบทวนใหม่ 
          เมื่อคุณสามารถดึงข้อมูลนั้นกลับมาจากความจำได้ในช่วงเวลาที่ยากลำบากที่สุดก่อนจะลืม รอยประทับในสมอง (Memory Trace) ของคุณจะแข็งแรงขึ้น 
          ส่งผลให้ช่วงเวลาที่คุณจะลืมในครั้งถัดไปยืดออกไปเรื่อยๆ จนกระทั่งความรู้นั้นกลายเป็นความจำระยะยาว (Long-term Memory) ในที่สุด
        </p>

        <h3>อัลกอริทึม SM-2 ทำงานอย่างไร?</h3>
        <p>
          ระบบ Spaced Repetition ที่ได้รับความนิยมและเป็นรากฐานของโปรแกรมชื่อดังหลายตัว เช่น Anki หรือ SuperMemo 
          คืออัลกอริทึม <strong>SuperMemo-2 (SM-2)</strong> ซึ่งเครื่องมือคำนวณด้านบนของเราได้จำลองการทำงานพื้นฐานของอัลกอริทึมนี้ 
          โดยใช้ตัวแปรหลัก 3 ตัว ได้แก่:
        </p>
        <ul>
          <li><strong>Current Interval:</strong> ระยะเวลาเป็นวันที่เว้นไปตั้งแต่การทบทวนครั้งล่าสุด ยิ่งคุณจำได้แม่น ช่วงเวลานี้จะยิ่งทวีคูณ</li>
          <li><strong>Ease Factor (EF):</strong> ตัวคูณความยากง่าย เริ่มต้นที่ 2.5 หมายความว่าถ้ารอบนี้คุณจำได้ รอบถัดไประยะเวลาทบทวนจะถูกคูณด้วย 2.5 
          แต่ถ้าคุณจำเนื้อหาได้ยากลำบาก (Quality ต่ำ) ค่า EF จะลดลง ทำให้ช่วงเวลาทบทวนสั้นลงเพื่อความปลอดภัย</li>
          <li><strong>Quality of Recall (0-5):</strong> คะแนนประเมินตัวเองว่าตอนที่คุณทบทวนนั้น คุณดึงข้อมูลออกมาจากสมองได้ง่ายแค่ไหน 
          การประเมินตัวเองอย่างซื่อสัตย์คือหัวใจสำคัญที่สุดในการใช้ระบบนี้</li>
        </ul>

        <h3>ประโยชน์ของการใช้ Spaced Repetition ในการศึกษา</h3>
        <p>
          การนำเทคนิค Spaced Repetition มาประยุกต์ใช้ในการเรียน ไม่ว่าจะเป็นการท่องศัพท์ภาษาอังกฤษ การจำสูตรคณิตศาสตร์ กฎหมาย 
          หรือแม้แต่รายละเอียดทางกายวิภาคศาสตร์ของนักศึกษาแพทย์ จะช่วยลดระยะเวลาในการอ่านหนังสือลงได้อย่างมหาศาล 
          แทนที่คุณจะต้องอ่านหนังสือทั้งเล่มซ้ำแล้วซ้ำเล่า คุณจะถูกระบบบังคับให้อ่านหรือทบทวน "เฉพาะสิ่งที่คุณกำลังจะลืม" เท่านั้น 
          นอกจากนี้ มันยังช่วยลดความเครียดจากการยัดเยียดข้อมูลเข้าสมอง และทำให้ผลการเรียนมีประสิทธิภาพสูงสุดอย่างเป็นวิทยาศาสตร์
        </p>
        <p>
          เริ่มใช้งานเครื่องมือคำนวณ Spaced Repetition ของเราตั้งแต่วันนี้ เพื่อวางแผนการทบทวนตำราเรียนของคุณ 
          แล้วคุณจะพบว่าสมองของมนุษย์นั้นมีศักยภาพในการจดจำสิ่งต่างๆ ได้อย่างไร้ขีดจำกัด หากเรามีกลยุทธ์ที่ถูกต้องและสอดคล้องกับธรรมชาติของการทำงานของสมอง
        </p>
      </article>
    </div>
  );
}
