import React, { useState } from 'react';
import { Lightbulb, Calculator, RotateCcw, Sparkles, Activity, Layers, Maximize } from 'lucide-react';

export default function CreativityScore({ lang }: any) {
  const [fluency, setFluency] = useState<number | ''>('');
  const [originality, setOriginality] = useState<number | ''>('');
  const [flexibility, setFlexibility] = useState<number | ''>('');
  const [elaboration, setElaboration] = useState<number | ''>('');

  const [result, setResult] = useState<{
    totalScore: number;
    profileTH: string;
    profileEN: string;
  } | null>(null);

  const calculate = () => {
    const fl = Number(fluency);
    const org = Number(originality);
    const flex = Number(flexibility);
    const elab = Number(elaboration);

    // Basic weighted formula for illustrative creativity scoring
    // Originality is typically most prized (weight 2.0)
    // Flexibility shows diversity of thought (weight 1.5)
    // Fluency is raw output (weight 1.0)
    // Elaboration is detail (weight 1.0)
    const score = (fl * 1.0) + (org * 2.0) + (flex * 1.5) + (elab * 1.0);

    let pTH = '';
    let pEN = '';

    if (score >= 40) {
      pTH = 'ยอดเยี่ยมมาก! คุณเป็นนักคิดสร้างสรรค์ขั้นสูง (Highly Creative)';
      pEN = 'Outstanding! You are highly creative and an out-of-the-box thinker.';
    } else if (score >= 25) {
      pTH = 'ดีมาก คุณมีความคิดสร้างสรรค์ที่โดดเด่นและสามารถนำไปประยุกต์ใช้ได้ดี';
      pEN = 'Great! You have solid creative abilities and can apply them well.';
    } else if (score >= 10) {
      pTH = 'ระดับทั่วไป คุณสามารถคิดอะไรใหม่ๆ ได้บ้าง แต่ยังต้องการการฝึกฝนเพิ่มเติม';
      pEN = 'Average. You have creative potential but need more practice exploring ideas.';
    } else {
      pTH = 'ควรพัฒนา ลองเปิดใจเรียนรู้สิ่งใหม่ๆ และฝึกมองปัญหาจากหลายมุมมอง';
      pEN = 'Needs development. Try to practice divergent thinking and open your mind to new ideas.';
    }

    setResult({
      totalScore: parseFloat(score.toFixed(1)),
      profileTH: pTH,
      profileEN: pEN
    });
  };

  const reset = () => {
    setFluency('');
    setOriginality('');
    setFlexibility('');
    setElaboration('');
    setResult(null);
  };

  const isTH = lang === 'TH';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-2">
          <Lightbulb size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isTH ? 'เครื่องมือประเมินความคิดสร้างสรรค์' : 'Creativity Score Evaluator'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isTH 
            ? 'ประเมินศักยภาพการคิดเชิงอเนกนัย (Divergent Thinking) ตามทฤษฎีของ J.P. Guilford' 
            : 'Evaluate your divergent thinking potential based on J.P. Guilford\'s model.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>{isTH ? 'วิธีใช้งานเบื้องต้น:' : 'How to use:'}</strong> 
                  {isTH 
                    ? ' สมมติว่าคุณทำแบบทดสอบ "ประโยชน์ของอิฐบล็อก" (ให้คิดประโยชน์ให้ได้มากที่สุด) ให้นำจำนวนไอเดียที่คุณคิดได้มากรอกตามหมวดหมู่ด้านล่าง'
                    : ' Based on an Alternative Uses Task (e.g., uses of a brick), enter your counts for each category below.'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Activity size={16} className="text-blue-500" />
                    {isTH ? '1. ความคล่องแคล่ว (Fluency)' : '1. Fluency'}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? 'จำนวนไอเดียทั้งหมดที่คุณคิดได้ (เช่น 15 อย่าง)' : 'Total number of ideas generated.'}
                  </p>
                  <input
                    type="number"
                    min="0"
                    value={fluency}
                    onChange={(e) => setFluency(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Layers size={16} className="text-green-500" />
                    {isTH ? '2. ความยืดหยุ่น (Flexibility)' : '2. Flexibility'}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? 'จำนวนหมวดหมู่ของไอเดียที่แตกต่างกัน (เช่น หมวดก่อสร้าง, หมวดอาวุธ, หมวดศิลปะ)' : 'Number of different categories the ideas fall into.'}
                  </p>
                  <input
                    type="number"
                    min="0"
                    value={flexibility}
                    onChange={(e) => setFlexibility(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Sparkles size={16} className="text-purple-500" />
                    {isTH ? '3. ความคิดริเริ่ม (Originality)' : '3. Originality'}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? 'จำนวนไอเดียที่แปลกใหม่ ไม่ซ้ำใคร (ไม่มีใครคิดได้)' : 'Number of statistically rare or unique ideas.'}
                  </p>
                  <input
                    type="number"
                    min="0"
                    value={originality}
                    onChange={(e) => setOriginality(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Maximize size={16} className="text-red-500" />
                    {isTH ? '4. ความละเอียดลออ (Elaboration)' : '4. Elaboration'}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {isTH ? 'จำนวนรายละเอียดเพิ่มเติมที่อธิบายให้ไอเดียนั้นสมบูรณ์ขึ้น' : 'Amount of detail added to the ideas.'}
                  </p>
                  <input
                    type="number"
                    min="0"
                    value={elaboration}
                    onChange={(e) => setElaboration(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl flex flex-col pt-12">
              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  disabled={fluency === '' || originality === '' || flexibility === '' || elaboration === ''}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  {isTH ? 'คำนวณคะแนน' : 'Calculate Score'}
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {result && (
                <div className="mt-8 space-y-6 flex-1">
                  <div className="p-6 bg-yellow-100 rounded-xl border border-yellow-200 text-center shadow-inner">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      {isTH ? 'คะแนนความคิดสร้างสรรค์รวม' : 'Total Creativity Score'}
                    </h3>
                    <div className="text-5xl font-black text-yellow-600">
                      {result.totalScore}
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {isTH ? 'ผลการประเมิน' : 'Evaluation'}
                    </h4>
                    <p className="text-lg font-medium text-gray-800">
                      {isTH ? result.profileTH : result.profileEN}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-yellow max-w-none mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2>ทำความรู้จักกับองค์ประกอบของความคิดสร้างสรรค์ตามทฤษฎีของ Guilford</h2>
        <p>
          เมื่อพูดถึง "ความคิดสร้างสรรค์" (Creativity) หลายคนมักจะนึกถึงศิลปิน นักดนตรี หรือผู้ที่สามารถสร้างสรรค์ผลงานศิลปะชิ้นเอก 
          แต่ในความเป็นจริงแล้ว ความคิดสร้างสรรค์เป็นทักษะทางปัญญาที่ทุกคนสามารถฝึกฝนและพัฒนาได้ 
          และมีความจำเป็นอย่างยิ่งในทุกสายอาชีพ ไม่ว่าจะเป็นการแก้ปัญหาเชิงธุรกิจ การออกแบบวิศวกรรม หรือแม้แต่การเขียนโค้ดโปรแกรม
        </p>

        <h3>ทฤษฎีการคิดอเนกนัย (Divergent Thinking)</h3>
        <p>
          J.P. Guilford นักจิตวิทยาชาวอเมริกัน ผู้ศึกษาโครงสร้างทางสติปัญญาของมนุษย์ ได้เสนอแนวคิดที่โด่งดังเรื่อง 
          <strong>Divergent Thinking</strong> หรือ "การคิดแบบอเนกนัย" ซึ่งหมายถึงความสามารถในการคิดแตกฉาน 
          จินตนาการหาคำตอบหรือทางออกของปัญหาให้ได้มากที่สุดและหลากหลายที่สุด ตรงข้ามกับการคิดแบบเอกนัย (Convergent Thinking) 
          ที่มุ่งหาคำตอบที่ถูกต้องเพียงหนึ่งเดียว
        </p>

        <h3>4 เสาหลักของความคิดสร้างสรรค์</h3>
        <p>Guilford ได้แบ่งองค์ประกอบของความคิดสร้างสรรค์ออกเป็น 4 ด้านหลัก ซึ่งเป็นที่มาของเครื่องมือประเมินด้านบน ดังนี้:</p>
        <ol>
          <li>
            <strong>ความคล่องแคล่วในการคิด (Fluency):</strong> คือปริมาณ (Quantity) หมายถึงความสามารถในการผลิตไอเดียจำนวนมากๆ 
            ในเวลาที่จำกัด เช่น เมื่อถามว่า "คลิปหนีบกระดาษใช้ทำอะไรได้บ้าง" ผู้ที่มีความคล่องแคล่วสูงจะสามารถเขียนคำตอบออกมาได้เป็นสิบๆ ข้ออย่างรวดเร็ว
          </li>
          <li>
            <strong>ความยืดหยุ่นในการคิด (Flexibility):</strong> คือความหลากหลายของไอเดีย หมายถึงการไม่ยึดติดกับกรอบความคิดเดิมๆ 
            เช่น ในกรณีคลิปหนีบกระดาษ หากตอบแต่เรื่องการหนีบกระดาษ หนีบธนบัตร หนีบถุงขนม (หมวดการหนีบทั้งหมด) ถือว่าขาดความยืดหยุ่น 
            แต่ถ้านำไปเป็นสายไฟ ดัดเป็นตะขอ หรือทำเป็นเข็มทิศ ถือว่ามีการข้ามหมวดหมู่และมีความยืดหยุ่นสูง
          </li>
          <li>
            <strong>ความคิดริเริ่ม (Originality):</strong> คือความแปลกใหม่ แหวกแนว ไม่ซ้ำใคร ซึ่งมักจะเป็นไอเดียที่คนส่วนใหญ่ (95% ขึ้นไป) คิดไม่ถึง 
            ความคิดริเริ่มนี้ถือเป็นแก่นที่สำคัญที่สุดของความคิดสร้างสรรค์ที่แท้จริง
          </li>
          <li>
            <strong>ความละเอียดลออ (Elaboration):</strong> คือความสามารถในการต่อยอด ขยายความ หรือลงรายละเอียดให้กับไอเดียตั้งต้น 
            เพื่อเปลี่ยนจากนามธรรมให้กลายเป็นรูปธรรมที่นำไปใช้ได้จริง หรือทำให้ไอเดียนั้นมีความสวยงาม สมบูรณ์แบบมากยิ่งขึ้น
          </li>
        </ol>

        <h3>วิธีฝึกฝนความคิดสร้างสรรค์</h3>
        <p>
          คุณสามารถฝึกทักษะเหล่านี้ได้ด้วยการเล่นเกม <strong>Alternative Uses Task</strong> ง่ายๆ โดยหยิบสิ่งของรอบตัวขึ้นมาหนึ่งชิ้น 
          (เช่น ปากกา แก้วน้ำ หรือกล่องกระดาษ) แล้วจับเวลา 3 นาที พยายามเขียนประโยชน์ใช้สอยของสิ่งนั้นให้ได้มากที่สุด แปลกที่สุด 
          และหลุดกรอบมากที่สุด จากนั้นนำคะแนนมาวิเคราะห์ในเครื่องมือของเราเป็นประจำ 
          แล้วคุณจะพบว่าสมองของคุณจะสามารถผลิตไอเดียที่ยอดเยี่ยมออกมาได้อย่างน่าทึ่ง!
        </p>
      </article>
    </div>
  );
}
