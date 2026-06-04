import React, { useState } from 'react';
import { PenTool, Calculator, RotateCcw, Percent, BarChart3, AlertCircle } from 'lucide-react';

export default function NoteTaking({ lang }: any) {
  const [sourceWords, setSourceWords] = useState<number | ''>('');
  const [notesWords, setNotesWords] = useState<number | ''>('');
  const [sourceConcepts, setSourceConcepts] = useState<number | ''>('');
  const [notesConcepts, setNotesConcepts] = useState<number | ''>('');

  const [result, setResult] = useState<{
    conciseness: number;
    coverage: number;
    efficiency: number;
    feedbackTH: string;
    feedbackEN: string;
  } | null>(null);

  const calculate = () => {
    const sw = Number(sourceWords);
    const nw = Number(notesWords);
    const sc = Number(sourceConcepts);
    const nc = Number(notesConcepts);

    if (sw > 0 && nw > 0 && sc > 0 && nc >= 0 && nc <= sc) {
      // Conciseness: How short the notes are relative to source. 
      // If notes are 20% length of source, conciseness ratio is 20%. 
      // A good target is 10-30% usually, but let's just show the ratio.
      const conciseRatio = (nw / sw) * 100;
      
      // Coverage: % of concepts captured
      const coverageRate = (nc / sc) * 100;

      // Efficiency Formula (Custom simple metric): 
      // High coverage is good, being too verbose is bad.
      // E = coverageRate * (1 - (nw/sw)) 
      // Note: if nw >= sw, efficiency drops severely.
      let eff = coverageRate * (1 - (nw / sw));
      if (eff < 0) eff = 0; // If notes are longer than source, 0 efficiency

      let fTH = '';
      let fEN = '';

      if (coverageRate < 50) {
        fTH = 'เนื้อหาขาดหายไปมาก ควรโฟกัสที่ประเด็นสำคัญให้มากขึ้น';
        fEN = 'Low concept coverage. Try to identify and note down more key concepts.';
      } else if (conciseRatio > 50) {
        fTH = 'จดบันทึกยาวเกินไป พยายามสรุปและใช้คำของคุณเองแทนการลอกข้อความ';
        fEN = 'Notes are too verbose. Try summarizing and using your own words instead of verbatim copying.';
      } else if (eff > 70) {
        fTH = 'ยอดเยี่ยม! โน้ตของคุณมีความกระชับและครอบคลุมประเด็นสำคัญได้ดีมาก';
        fEN = 'Excellent! Your notes are concise and cover the key concepts very well.';
      } else {
        fTH = 'ประสิทธิภาพระดับปานกลาง ลองหาวิธีย่อความให้สั้นลงโดยยังคงใจความสำคัญไว้';
        fEN = 'Moderate efficiency. Try to further condense your notes while keeping the main ideas.';
      }

      setResult({
        conciseness: parseFloat(conciseRatio.toFixed(1)),
        coverage: parseFloat(coverageRate.toFixed(1)),
        efficiency: parseFloat(eff.toFixed(1)),
        feedbackTH: fTH,
        feedbackEN: fEN
      });
    }
  };

  const reset = () => {
    setSourceWords('');
    setNotesWords('');
    setSourceConcepts('');
    setNotesConcepts('');
    setResult(null);
  };

  const isTH = lang === 'TH';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 text-violet-600 mb-2">
          <PenTool size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isTH ? 'เครื่องมือประเมินประสิทธิภาพการจดโน้ต' : 'Note-Taking Efficiency Calculator'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isTH 
            ? 'วิเคราะห์ความกระชับและความครอบคลุมของประเด็นสำคัญ เพื่อปรับปรุงทักษะการจดเลคเชอร์ของคุณ' 
            : 'Analyze conciseness and concept coverage to improve your note-taking skills.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-800 border-b pb-2">
                {isTH ? 'ข้อมูลความยาว (Word Count)' : 'Word Count Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isTH ? 'จำนวนคำในเนื้อหาต้นฉบับ' : 'Words in Source Material'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={sourceWords}
                    onChange={(e) => setSourceWords(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isTH ? 'จำนวนคำในโน้ตที่คุณจด' : 'Words in Your Notes'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={notesWords}
                    onChange={(e) => setNotesWords(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 border-b pb-2 pt-4">
                {isTH ? 'ข้อมูลประเด็นสำคัญ (Key Concepts)' : 'Key Concepts Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isTH ? 'จำนวนประเด็นสำคัญในต้นฉบับ' : 'Total Key Concepts in Source'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={sourceConcepts}
                    onChange={(e) => setSourceConcepts(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isTH ? 'จำนวนประเด็นสำคัญที่คุณจดได้' : 'Key Concepts Captured in Notes'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={sourceConcepts === '' ? undefined : Number(sourceConcepts)}
                    value={notesConcepts}
                    onChange={(e) => setNotesConcepts(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl flex flex-col space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  disabled={!sourceWords || !notesWords || !sourceConcepts || notesConcepts === ''}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  {isTH ? 'ประเมินประสิทธิภาพ' : 'Evaluate Efficiency'}
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {result && (
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
                      <div className="text-gray-500 text-sm mb-1">{isTH ? 'ความครอบคลุม' : 'Concept Coverage'}</div>
                      <div className="text-2xl font-bold text-emerald-600">{result.coverage}%</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
                      <div className="text-gray-500 text-sm mb-1">{isTH ? 'อัตราความยาว' : 'Length Ratio'}</div>
                      <div className="text-2xl font-bold text-amber-600">{result.conciseness}%</div>
                    </div>
                  </div>

                  <div className="p-5 bg-violet-100 rounded-xl border border-violet-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="text-violet-600" size={28} />
                      <div>
                        <h3 className="font-semibold text-violet-900">
                          {isTH ? 'คะแนนประสิทธิภาพรวม' : 'Overall Efficiency Score'}
                        </h3>
                        <p className="text-violet-700 text-xs mt-1">
                          {isTH ? '(ยิ่งสูงยิ่งดี, สูงสุดใกล้ 100)' : '(Higher is better, max ~100)'}
                        </p>
                      </div>
                    </div>
                    <div className="text-4xl font-black text-violet-700">
                      {result.efficiency}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-xl flex items-start gap-3 mt-4">
                    <AlertCircle className="text-gray-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700">
                      <strong>{isTH ? 'คำแนะนำ: ' : 'Feedback: '}</strong>
                      {isTH ? result.feedbackTH : result.feedbackEN}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-violet max-w-none mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2>เคล็ดลับการจดโน้ตอย่างมีประสิทธิภาพ (Note-Taking Efficiency)</h2>
        <p>
          การจดบันทึกหรือการจดเลคเชอร์ เป็นหนึ่งในทักษะที่สำคัญที่สุดสำหรับการเรียนรู้และการทำงาน 
          หลายคนมักเข้าใจผิดว่าการจดบันทึกที่ดีคือการจด "ทุกคำพูด" ของผู้บรรยาย หรือการลอกข้อความจากหนังสือมาทั้งหมด (Verbatim Note-taking) 
          แต่นั่นกลับเป็นวิธีที่ทำให้สมองไม่ได้ประมวลผลข้อมูล และเมื่อกลับมาอ่านทบทวนก็ต้องใช้เวลามากเกินไป
        </p>

        <h3>ปัจจัยสำคัญที่ใช้วัดประสิทธิภาพการจดโน้ต</h3>
        <p>เครื่องมือของเราใช้หลักการวิเคราะห์จากสองมิติหลัก เพื่อให้คะแนนประสิทธิภาพการจดบันทึกของคุณ:</p>
        <ul>
          <li>
            <strong>1. ความครอบคลุมของประเด็นสำคัญ (Concept Coverage):</strong> โน้ตที่ดีจะต้องไม่ตกหล่นหัวใจหลักของเรื่องนั้นๆ 
            หากบทความต้นฉบับกล่าวถึง 10 ประเด็นสำคัญ แต่คุณจดมาได้เพียง 3 ประเด็น ถือว่าโน้ตของคุณขาดความครบถ้วน 
            คะแนนความครอบคลุม (Coverage) จึงควรเข้าใกล้ 100% มากที่สุดเท่าที่จะทำได้
          </li>
          <li>
            <strong>2. ความกระชับ (Conciseness & Length Ratio):</strong> หากคุณเขียนยาวเท่ากับต้นฉบับ 
            นั่นหมายความว่าคุณไม่ได้ทำการ "สรุป" เลย โน้ตที่มีประสิทธิภาพมักจะมีความยาวเพียง 10% - 30% ของต้นฉบับเท่านั้น 
            การใช้คำของคุณเอง (Paraphrasing) สัญลักษณ์ หรือแผนผัง จะช่วยลดจำนวนคำลงได้อย่างมหาศาล
          </li>
        </ul>

        <h3>วิธีจดโน้ตให้มีประสิทธิภาพสูงสุด</h3>
        <p>หากคะแนนประสิทธิภาพของคุณยังไม่สูงนัก ลองนำเทคนิคเหล่านี้ไปปรับใช้:</p>
        <ol>
          <li>
            <strong>วิธีจดแบบ Cornell (The Cornell Method):</strong> แบ่งหน้ากระดาษเป็น 3 ส่วน ได้แก่ ส่วนจดโน้ตหลัก 
            ส่วนคีย์เวิร์ด/คำถาม และส่วนสรุปใจความสำคัญด้านล่างสุด วิธีนี้บังคับให้คุณต้องคิดตามและสรุปประเด็นอยู่เสมอ
          </li>
          <li>
            <strong>วิธีทำแผนผังความคิด (Mind Mapping):</strong> เหมาะสำหรับคนที่ชอบเรียนรู้ด้วยภาพ 
            ช่วยลดการจดเป็นประโยคยาวๆ ลงเหลือเพียงคำสำคัญ (Keywords) ที่เชื่อมโยงความสัมพันธ์กัน
          </li>
          <li>
            <strong>การใช้ตัวย่อและสัญลักษณ์:</strong> สร้างระบบตัวย่อของคุณเอง เช่น ใช้ลูกศรแทนคำว่า "นำไปสู่" 
            ใช้เครื่องหมาย + แทนคำว่า "และ" หรือ "ประกอบด้วย" ซึ่งจะช่วยลดจำนวนคำ (Word count) ลงได้อย่างมหาศาล
          </li>
          <li>
            <strong>ฟัง-ประมวลผล-จด (Listen-Process-Write):</strong> อย่าพยายามจดขณะที่กำลังฟังประโยคนั้นทันที 
            ให้ฟังจนจบประโยคหรือจบแนวคิดนั้นก่อน ประมวลผลในสมอง แล้วค่อยเขียนออกมาด้วยถ้อยคำของตนเอง
          </li>
        </ol>
        <p>
          การจดบันทึกเป็นทักษะที่ต้องอาศัยการฝึกฝน ยิ่งคุณฝึกสรุปและจับใจความบ่อยเท่าไหร่ 
          สมองของคุณก็จะยิ่งเชื่อมโยงข้อมูลได้เร็วขึ้นเท่านั้น และมันจะส่งผลดีอย่างยิ่งเมื่อคุณต้องทบทวนความรู้ก่อนสอบ
          หรือนำไปประยุกต์ใช้ในการทำงานจริง!
        </p>
      </article>
    </div>
  );
}
