import React, { useState } from 'react';
import { Volume2, Plus, Trash2, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CumulativeNoise({ lang = 'EN' }: any) {
  const isTH = lang === 'TH';

  const [sources, setSources] = useState<{ id: number; db: number; hours: number }[]>([
    { id: 1, db: 85, hours: 8 },
  ]);

  const addSource = () => {
    setSources([...sources, { id: Date.now(), db: 80, hours: 1 }]);
  };

  const removeSource = (id: number) => {
    setSources(sources.filter((s) => s.id !== id));
  };

  const updateSource = (id: number, field: 'db' | 'hours', value: number) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // NIOSH standard: 85 dBA for 8 hours. Every 3 dBA increase halves the allowed time.
  // Allowed time T = 8 / (2 ^ ((L - 85) / 3))
  // Dose D = 100 * sum(C_i / T_i)
  let dose = 0;
  sources.forEach((s) => {
    if (s.hours > 0 && s.db > 0) {
      const allowedTime = 8 / Math.pow(2, (s.db - 85) / 3);
      dose += (s.hours / allowedTime) * 100;
    }
  });

  const twa = dose > 0 ? 10 * Math.log10(dose / 100) + 85 : 0;
  
  const isUnsafe = dose > 100;
  const showWarning = dose >= 50 && dose <= 100;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Volume2 className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isTH ? 'คำนวณระดับเสียงสะสม (Cumulative Noise)' : 'Cumulative Noise Level Calculator'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {isTH ? 'แหล่งกำเนิดเสียงและระยะเวลา' : 'Noise Sources & Duration'}
          </h3>
          
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={source.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-600">
                    {isTH ? `แหล่งเสียงที่ ${index + 1}` : `Source ${index + 1}`}
                  </span>
                  {sources.length > 1 && (
                    <button
                      onClick={() => removeSource(source.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      {isTH ? 'ระดับเสียง (dBA)' : 'Noise Level (dBA)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={source.db || ''}
                      onChange={(e) => updateSource(source.id, 'db', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      {isTH ? 'ระยะเวลา (ชั่วโมง)' : 'Duration (Hours)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={source.hours || ''}
                      onChange={(e) => updateSource(source.id, 'hours', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addSource}
            className="mt-4 flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isTH ? 'เพิ่มแหล่งเสียง' : 'Add Noise Source'}
          </button>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800 flex items-start">
            <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              {isTH 
                ? 'ใช้มาตรฐานของ NIOSH (สถาบันอาชีวอนามัยและความปลอดภัยแห่งชาติสหรัฐอเมริกา) โดยถือว่า 85 dBA เป็นเวลา 8 ชั่วโมงคือขีดจำกัดสูงสุด (100% Dose) ทุกๆ ระดับเสียงที่เพิ่มขึ้น 3 dBA จะทำให้เวลาที่ปลอดภัยลดลงครึ่งหนึ่ง'
                : 'Based on NIOSH standard: 85 dBA for 8 hours is the maximum limit (100% Dose). For every 3 dBA increase, the safe exposure time is halved.'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {isTH ? 'ผลการคำนวณ' : 'Calculation Results'}
          </h3>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="mb-6">
              <span className="block text-sm text-gray-500 mb-1">
                {isTH ? 'ปริมาณเสียงสะสม (Noise Dose)' : 'Cumulative Noise Dose'}
              </span>
              <div className="flex items-end">
                <span className="text-4xl font-bold text-gray-800">{dose.toFixed(1)}</span>
                <span className="text-lg text-gray-500 ml-1 mb-1">%</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="block text-sm text-gray-500 mb-1">
                {isTH ? 'ค่าเฉลี่ยระดับเสียง (TWA - 8 hr)' : 'Time-Weighted Average (8 hr)'}
              </span>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-gray-800">{twa > 0 ? twa.toFixed(1) : '0.0'}</span>
                <span className="text-lg text-gray-500 ml-1 mb-1">dBA</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start ${isUnsafe ? 'bg-red-100 text-red-800' : showWarning ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              {isUnsafe ? (
                <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
              ) : (
                <ShieldCheck className="w-6 h-6 mr-3 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-semibold mb-1">
                  {isTH 
                    ? (isUnsafe ? 'อันตราย!' : showWarning ? 'ควรระวัง' : 'ปลอดภัย')
                    : (isUnsafe ? 'Dangerous!' : showWarning ? 'Warning' : 'Safe')}
                </h4>
                <p className="text-sm">
                  {isTH 
                    ? (isUnsafe 
                        ? 'ปริมาณเสียงสะสมเกิน 100% ซึ่งเกินกว่ามาตรฐานความปลอดภัย มีความเสี่ยงต่อการสูญเสียการได้ยิน ต้องสวมใส่อุปกรณ์ป้องกันเสียง' 
                        : showWarning 
                          ? 'ปริมาณเสียงสะสมถึงระดับที่ควรเฝ้าระวัง ควรตรวจวัดการได้ยินและลดการสัมผัสเสียงหากทำได้'
                          : 'ปริมาณเสียงสะสมอยู่ในเกณฑ์ที่ปลอดภัย')
                    : (isUnsafe 
                        ? 'Cumulative noise dose exceeds 100%, which is above safe limits. High risk of hearing loss. Hearing protection is required.'
                        : showWarning
                          ? 'Noise dose is at an action level. Consider monitoring and reducing exposure.'
                          : 'Cumulative noise dose is within safe limits.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl">
        {isTH ? (
          <article className="prose prose-blue max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">การคำนวณระดับเสียงสะสม (Cumulative Noise Dose) เพื่อป้องกันการสูญเสียการได้ยิน</h2>
            <p>
              ในชีวิตประจำวันและการทำงาน เรามักจะต้องเผชิญกับเสียงดังจากหลายแหล่ง เช่น เสียงเครื่องจักรในโรงงาน เสียงการจราจรบนท้องถนน หรือแม้แต่เสียงดนตรีดังๆ ในหูฟัง การสัมผัสกับเสียงดังเป็นเวลานานอาจทำให้เกิด <strong>การสูญเสียการได้ยินจากเสียงดัง (Noise-Induced Hearing Loss: NIHL)</strong> ซึ่งเป็นการสูญเสียการได้ยินที่ไม่สามารถรักษาให้กลับมาเป็นปกติได้
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมต้องคำนวณปริมาณเสียงสะสม?</h3>
            <p>
              บ่อยครั้งที่เราไม่ได้อยู่กับเสียงระดับความดังเดียวตลอดทั้งวัน เช่น อาจจะอยู่ในพื้นที่เสียงดัง 90 dBA เป็นเวลา 2 ชั่วโมง แล้วเปลี่ยนไปอยู่ในพื้นที่เสียงเบาลง 80 dBA อีก 4 ชั่วโมง การประเมินความเสี่ยงจึงไม่สามารถดูที่ระดับความดังสูงสุดเพียงอย่างเดียวได้ แต่ต้องประเมินเป็น <strong>ปริมาณเสียงสะสม (Cumulative Noise Dose)</strong>
            </p>
            <p>
              เครื่องมือคำนวณระดับเสียงสะสมนี้ใช้มาตรฐานของ NIOSH (The National Institute for Occupational Safety and Health) ซึ่งกำหนดเกณฑ์ความปลอดภัยไว้ที่ระดับเสียง 85 เดซิเบลเอ (dBA) ในระยะเวลา 8 ชั่วโมงต่อวัน โดยทุกๆ ระดับเสียงที่เพิ่มขึ้น 3 dBA ระยะเวลาที่ปลอดภัยจะลดลงครึ่งหนึ่ง (Exchange Rate = 3 dB)
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Time-Weighted Average (TWA) คืออะไร?</h3>
            <p>
              <strong>TWA (Time-Weighted Average)</strong> คือ ค่าเฉลี่ยระดับเสียงตลอดระยะเวลาการทำงาน 8 ชั่วโมง ซึ่งคำนวณมาจากค่า Noise Dose หากค่า TWA ของคุณเกินกว่า 85 dBA ถือว่าอยู่ในระดับที่อันตรายและจำเป็นต้องมีมาตรการป้องกัน
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">อันตรายจากเสียงดังและวิธีป้องกัน</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ระดับเสียงที่เริ่มอันตราย:</strong> เสียงที่ดังเกิน 85 dBA ขึ้นไป เช่น เสียงเครื่องตัดหญ้า หรือเสียงเลื่อยไฟฟ้า หากฟังนานเกินไปจะทำให้เซลล์ขนในหูชั้นในเสื่อมสภาพ</li>
              <li><strong>อาการเตือน:</strong> หากคุณมีอาการหูอื้อหลังจากสัมผัสเสียงดัง หรือรู้สึกว่าต้องให้คนอื่นพูดดังขึ้น นั่นอาจเป็นสัญญาณเตือนว่าเริ่มมีการสูญเสียการได้ยินชั่วคราว</li>
              <li><strong>การป้องกัน:</strong> หากไม่สามารถหลีกเลี่ยงการอยู่ในพื้นที่เสียงดังได้ ควรใช้อุปกรณ์ป้องกันเสียงส่วนบุคคล (PPE) เช่น ที่อุดหู (Earplugs) หรือที่ครอบหู (Earmuffs) ซึ่งสามารถลดระดับเสียง (NRR) ลงได้ 15-30 เดซิเบล</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">วิธีใช้งานเครื่องมือคำนวณ</h3>
            <p>
              1. กดปุ่ม "เพิ่มแหล่งเสียง" ตามจำนวนกิจกรรมหรือพื้นที่ที่คุณไปสัมผัสเสียงมา<br />
              2. ระบุ <strong>ระดับเสียง (dBA)</strong> และ <strong>ระยะเวลา (ชั่วโมง)</strong> ของแต่ละกิจกรรม<br />
              3. ระบบจะคำนวณออกมาเป็นเปอร์เซ็นต์ Dose หากเกิน 100% แสดงว่าคุณรับเสียงเกินเกณฑ์มาตรฐานความปลอดภัย<br />
              4. ค่า TWA จะแสดงเป็นระดับเสียงเทียบเท่า หากเกิน 85 dBA จะถือว่าอันตรายต่อหู
            </p>
            <p className="mt-4">
              สุขภาพการได้ยินเป็นเรื่องสำคัญ การสูญเสียการได้ยินมักเกิดขึ้นอย่างช้าๆ จนเราไม่ทันสังเกต การใช้เครื่องมือนี้ประเมินความเสี่ยงและป้องกันตั้งแต่เนิ่นๆ จะช่วยรักษาสุขภาพหูของคุณให้อยู่กับคุณไปได้ยาวนาน
            </p>
          </article>
        ) : (
          <article className="prose prose-blue max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cumulative Noise Exposure & Hearing Conservation</h2>
            <p>
              Exposure to high levels of noise over an extended period can lead to Noise-Induced Hearing Loss (NIHL). Because people often move between different noise environments throughout the day, it is crucial to calculate the cumulative noise dose rather than just looking at a single sound level.
            </p>
            <p>
              This calculator uses the NIOSH standard, which recommends an exposure limit of 85 dBA for an 8-hour shift. It uses a 3-dB exchange rate, meaning that for every 3 dBA increase in noise level, the allowable exposure time is reduced by half. For instance, an environment at 88 dBA is only safe for 4 hours.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Understanding the Results</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Noise Dose:</strong> Represents your total noise exposure as a percentage. A dose of 100% is the maximum allowable daily exposure. Anything over 100% is considered hazardous.</li>
              <li><strong>TWA (Time-Weighted Average):</strong> Represents your noise exposure as a steady 8-hour equivalent level. A TWA over 85 dBA requires hearing protection.</li>
            </ul>
            <p className="mt-4">
              Always wear proper hearing protection (earplugs or earmuffs) when working in or visiting high-noise environments. Hearing loss is permanent, but highly preventable with the right precautions.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
