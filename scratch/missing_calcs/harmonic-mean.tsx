import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, BookOpen } from 'lucide-react';

export default function HarmonicMeanCalculator({ lang }: any) {
  const [dataInput, setDataInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateHarmonicMean = () => {
    setError('');
    if (!dataInput.trim()) {
      setResult(null);
      return;
    }

    // Split by comma, space, or newline
    const rawValues = dataInput.split(/[\s,]+/).filter(v => v.trim() !== '');
    const values: number[] = [];

    for (let str of rawValues) {
      const num = parseFloat(str);
      if (isNaN(num)) {
        setError(lang === 'th' ? 'กรุณากรอกเฉพาะตัวเลขเท่านั้น' : 'Please enter valid numbers only.');
        setResult(null);
        return;
      }
      if (num <= 0) {
        setError(lang === 'th' ? 'ข้อมูลทั้งหมดต้องมากกว่า 0 สำหรับค่าเฉลี่ยฮาร์โมนิก' : 'All values must be strictly greater than 0 for Harmonic Mean.');
        setResult(null);
        return;
      }
      values.push(num);
    }

    if (values.length === 0) {
      setResult(null);
      return;
    }

    let sumInverse = 0;
    for (let val of values) {
      sumInverse += 1 / val;
    }

    const n = values.length;
    const harmonicMean = n / sumInverse;
    setResult(harmonicMean);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณหาค่ามัธยฐานฮาร์โมนิก' : "Harmonic Mean Calculator"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'กรอกชุดข้อมูลตัวเลข (คั่นด้วยเครื่องหมายจุลภาค หรือเว้นวรรค)' : 'Enter dataset (comma or space separated)'}
              </label>
              <textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all h-32"
                placeholder={isTH ? 'เช่น 10, 20, 30, 40 หรือ 10 20 30 40' : 'e.g. 10, 20, 30, 40'}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={calculateHarmonicMean}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-emerald-200"
            >
              {isTH ? 'คำนวณค่ามัธยฐานฮาร์โมนิก' : 'Calculate Harmonic Mean'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
            {result !== null ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-500">
                  {isTH ? 'ค่ามัธยฐานฮาร์โมนิก (H)' : "Harmonic Mean (H)"}
                </h3>
                <div className="text-5xl font-bold text-emerald-600 break-all">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center">
                <Info className="w-12 h-12 mb-3 text-gray-300" />
                <p>{isTH ? 'กรอกชุดข้อมูลเพื่อดูผลลัพธ์' : 'Enter data to see the result'}</p>
                <p className="text-sm mt-2 max-w-xs mx-auto">
                  {isTH ? '* ข้อมูลทุกตัวต้องมีค่ามากกว่า 0 เสมอ' : '* All numbers must be strictly greater than 0'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          การหาค่ามัธยฐานฮาร์โมนิก หรือ ค่าเฉลี่ยฮาร์โมนิก (Harmonic Mean)
        </h2>
        
        <p>
          ในทางสถิติและคณิตศาสตร์ การหาค่ากลางของข้อมูลมีด้วยกันหลายรูปแบบ รูปแบบที่เราคุ้นเคยกันมากที่สุดคือ "ค่าเฉลี่ยเลขคณิต (Arithmetic Mean)" แต่ในบางสถานการณ์ การใช้ค่าเฉลี่ยเลขคณิตธรรมดาอาจทำให้ได้คำตอบที่ผิดเพี้ยนไปจากความเป็นจริงอย่างมาก หนึ่งในตัวแทนค่ากลางที่ถูกนำมาใช้ในกรณีเฉพาะเจาะจงเหล่านั้นคือ <strong>ค่าเฉลี่ยฮาร์โมนิก (Harmonic Mean)</strong> หรือที่ในบางบริบทอาจเรียกว่าค่ามัธยฐานฮาร์โมนิก
        </p>

        <h3>ค่าเฉลี่ยฮาร์โมนิก คืออะไร?</h3>
        <p>
          Harmonic Mean คือส่วนกลับของค่าเฉลี่ยเลขคณิตของส่วนกลับของข้อมูลทั้งหมด พูดง่ายๆ คือเราจะเอาข้อมูลแต่ละตัวมากลับเศษเป็นส่วน (1/x) นำมาหาค่าเฉลี่ย แล้วจึงเอาผลลัพธ์ที่ได้กลับเศษเป็นส่วนอีกครั้งหนึ่ง ค่าเฉลี่ยฮาร์โมนิกมักจะถูกนำไปใช้ในกรณีที่ข้อมูลอยู่ในรูปของ <em>อัตราส่วน (Rates)</em> หรือ <em>อัตรา (Ratios)</em>
        </p>

        <h3>สูตรการคำนวณ (Harmonic Mean Formula)</h3>
        <p>สำหรับประชากร หรือชุดข้อมูลที่มีจำนวน N ตัว สูตรในการคำนวณคือ:</p>
        <div className="bg-emerald-50 p-6 rounded-xl my-6 text-center font-serif text-xl border border-emerald-100">
          H = N / [ (1/x<sub>1</sub>) + (1/x<sub>2</sub>) + ... + (1/x<sub>n</sub>) ]
        </div>
        <p>
          โดยที่:
        </p>
        <ul>
          <li><strong>H</strong> คือ ค่าเฉลี่ยฮาร์โมนิก</li>
          <li><strong>N</strong> คือ จำนวนข้อมูลทั้งหมด</li>
          <li><strong>x<sub>i</sub></strong> คือ ข้อมูลแต่ละตัวในชุดข้อมูล</li>
        </ul>

        <h3>เมื่อไหร่ควรใช้ค่าเฉลี่ยฮาร์โมนิก?</h3>
        <p>
          คุณสมบัติที่สำคัญที่สุดของค่าเฉลี่ยฮาร์โมนิกคือ มันถูกออกแบบมาเพื่อหาค่ากลางของข้อมูลที่เป็นอัตราส่วน เช่น:
        </p>
        <ul>
          <li><strong>อัตราความเร็ว (Speed):</strong> ระยะทางต่อเวลา (เช่น กิโลเมตรต่อชั่วโมง) หากคุณขับรถระยะทางเท่ากันแต่ใช้ความเร็วต่างกันในแต่ละช่วง ค่าเฉลี่ยฮาร์โมนิกคือตัววัดความเร็วเฉลี่ยที่ถูกต้องที่สุด ไม่ใช่ค่าเฉลี่ยเลขคณิต</li>
          <li><strong>อัตราสิ้นเปลืองน้ำมัน:</strong> กิโลเมตรต่อลิตร (km/L) หรือ ไมล์ต่อแกลลอน (MPG)</li>
          <li><strong>อัตราส่วนทางการเงิน:</strong> เช่น P/E Ratio (Price-to-Earnings Ratio) ในบางกรณีการใช้ Harmonic Mean จะช่วยลดการบิดเบือนจากบริษัทที่มี P/E สูงผิดปกติได้ดีกว่าค่าเฉลี่ยปกติ</li>
          <li><strong>F1 Score ใน Machine Learning:</strong> เป็นการหาค่าเฉลี่ยฮาร์โมนิกระหว่าง Precision และ Recall เพื่อประเมินประสิทธิภาพของโมเดล</li>
        </ul>

        <h3>ตัวอย่างการประยุกต์ใช้ในชีวิตจริง</h3>
        <p>
          ลองจินตนาการว่าคุณขับรถจากกรุงเทพฯ ไปพัทยาด้วยความเร็ว 60 กม./ชม. และขับกลับจากพัทยามากรุงเทพฯ ด้วยความเร็ว 120 กม./ชม. ความเร็วเฉลี่ยของการเดินทางไป-กลับของคุณคือเท่าไหร่?
        </p>
        <p>
          หลายคนอาจจะเอา (60 + 120) / 2 = 90 กม./ชม. ซึ่งเป็น<strong>คำตอบที่ผิด!</strong> เพราะเวลาที่คุณใช้ในช่วงที่ขับช้า (60 กม./ชม.) นั้นนานกว่าช่วงที่ขับเร็วมาก ทำให้ความเร็ว 60 กม./ชม. ส่งผลต่อการเดินทางโดยรวมมากกว่า 
        </p>
        <p>
          วิธีคิดที่ถูกต้องคือการใช้ค่าเฉลี่ยฮาร์โมนิก: <br/>
          H = 2 / [ (1/60) + (1/120) ] <br/>
          H = 2 / [ (2/120) + (1/120) ] <br/>
          H = 2 / (3/120) = 240 / 3 = <strong>80 กม./ชม.</strong>
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg my-6">
          <h4 className="flex items-center gap-2 font-bold text-blue-800 m-0 mb-2">
            <Info className="w-5 h-5" />
            ข้อจำกัดที่ควรทราบ
          </h4>
          <p className="text-blue-800 m-0 text-sm">
            ค่าเฉลี่ยฮาร์โมนิกไม่สามารถคำนวณได้หากมีข้อมูลตัวใดตัวหนึ่งในชุดข้อมูลมีค่าเป็น "0" (ศูนย์) เพราะไม่สามารถหาค่า 1/0 ได้ และตามนิยาม ข้อมูลมักจะต้องเป็นค่าบวกทั้งหมด (Positive numbers) หากมีค่าลบรวมอยู่ด้วย อาจส่งผลให้ผลลัพธ์ไม่สามารถตีความหมายทางกายภาพหรือสถิติที่ถูกต้องได้
          </p>
        </div>

        <p>
          ความเข้าใจในเรื่องของค่าเฉลี่ยฮาร์โมนิก จะช่วยให้เราสามารถเลือกใช้สถิติได้ถูกต้องเหมาะสมกับธรรมชาติของข้อมูล โดยเฉพาะอย่างยิ่งในการวิเคราะห์ข้อมูลที่เป็น "อัตราส่วน" หรือมีความสัมพันธ์เชิงผกผัน เครื่องมือนี้จึงมีประโยชน์อย่างยิ่งสำหรับวิศวกร นักวิทยาศาสตร์ข้อมูล นักการเงิน และนักวิเคราะห์ทั่วไป
        </p>
      </article>
    </div>
  );
}
