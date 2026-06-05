import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, BookOpen } from 'lucide-react';

export default function GeometricMeanCalculator({ lang }: any) {
  const [dataInput, setDataInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateGeometricMean = () => {
    setError('');
    if (!dataInput.trim()) {
      setResult(null);
      return;
    }

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
        setError(lang === 'th' ? 'ข้อมูลทั้งหมดต้องมากกว่า 0 สำหรับค่าเฉลี่ยเรขาคณิต' : 'All values must be strictly greater than 0 for Geometric Mean.');
        setResult(null);
        return;
      }
      values.push(num);
    }

    if (values.length === 0) {
      setResult(null);
      return;
    }

    // Using log sum approach to avoid overflow/underflow for large/small numbers
    let sumLog = 0;
    for (let val of values) {
      sumLog += Math.log(val);
    }
    
    const n = values.length;
    const geometricMean = Math.exp(sumLog / n);
    setResult(geometricMean);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณหาค่าเฉลี่ยเรขาคณิต' : "Geometric Mean Calculator"}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32"
                placeholder={isTH ? 'เช่น 1.05, 1.10, 1.08 หรือ 1.05 1.10 1.08' : 'e.g. 1.05, 1.10, 1.08'}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={calculateGeometricMean}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-purple-200"
            >
              {isTH ? 'คำนวณค่าเฉลี่ยเรขาคณิต' : 'Calculate Geometric Mean'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
            {result !== null ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-500">
                  {isTH ? 'ค่าเฉลี่ยเรขาคณิต (G)' : "Geometric Mean (G)"}
                </h3>
                <div className="text-5xl font-bold text-purple-600 break-all">
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
          <BookOpen className="w-6 h-6 text-purple-600" />
          ทำความรู้จักกับค่าเฉลี่ยเรขาคณิต (Geometric Mean)
        </h2>
        
        <p>
          ในการวิเคราะห์ข้อมูลทางสถิติ หลายครั้งเราจำเป็นต้องหาค่ากลางของชุดข้อมูลที่ไม่ได้มีลักษณะเพิ่มขึ้นแบบคงที่ (Additive) แต่เป็นการเปลี่ยนแปลงในลักษณะทวีคูณ (Multiplicative) เช่น การเติบโตของประชากร อัตราผลตอบแทนจากการลงทุน หรือการเพิ่มขึ้นของแบคทีเรีย ในสถานการณ์เหล่านี้ การใช้ค่าเฉลี่ยเลขคณิตธรรมดา (Arithmetic Mean) อาจให้ภาพที่ผิดเพี้ยนไปจากความเป็นจริงอย่างมาก เครื่องมือทางสถิติที่เหมาะสมและแม่นยำกว่าในกรณีนี้คือ <strong>ค่าเฉลี่ยเรขาคณิต (Geometric Mean)</strong>
        </p>

        <h3>ค่าเฉลี่ยเรขาคณิต คืออะไร?</h3>
        <p>
          Geometric Mean คือค่าเฉลี่ยที่ได้จากการนำข้อมูลทุกตัวมาคูณกัน (แทนที่จะนำมาบวกกัน) แล้วถอดรากที่ n ของผลคูณนั้น โดยที่ n คือจำนวนของข้อมูลทั้งหมด ค่าเฉลี่ยชนิดนี้เหมาะมากสำหรับข้อมูลที่เป็นอัตราส่วน (Ratios) หรือเปอร์เซ็นต์ที่แสดงถึงการเปลี่ยนแปลงจากช่วงเวลาหนึ่งไปยังอีกช่วงเวลาหนึ่ง
        </p>

        <h3>สูตรการคำนวณ (Geometric Mean Formula)</h3>
        <p>หากเรามีชุดข้อมูลที่มีจำนวน N ตัว ประกอบด้วย x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, ..., x<sub>n</sub> สูตรในการคำนวณคือ:</p>
        <div className="bg-purple-50 p-6 rounded-xl my-6 text-center font-serif text-xl border border-purple-100">
          G = (x<sub>1</sub> × x<sub>2</sub> × x<sub>3</sub> × ... × x<sub>n</sub>)<sup>1/n</sup>
        </div>
        <p>
          หรือสามารถเขียนในรูปของรากที่ n ได้ดังนี้: <strong>G = <sup>n</sup>√(x<sub>1</sub> × x<sub>2</sub> × ... × x<sub>n</sub>)</strong>
        </p>

        <h3>ความแตกต่างระหว่าง Arithmetic Mean และ Geometric Mean</h3>
        <p>
          ลองพิจารณาตัวอย่างการลงทุนที่มีผลตอบแทนดังนี้: 
          ปีที่ 1 ได้กำไร 100% (เงินทุนเพิ่มเป็น 2 เท่า)
          ปีที่ 2 ขาดทุน 50% (เงินทุนลดลงเหลือครึ่งหนึ่ง)
        </p>
        <ul>
          <li><strong>ถ้าใช้ค่าเฉลี่ยเลขคณิต (Arithmetic Mean):</strong> (100% + (-50%)) / 2 = +25% ต่อปี ซึ่งในความเป็นจริง หากคุณเริ่มลงทุนด้วยเงิน 100 บาท สิ้นปีที่ 1 จะมี 200 บาท และสิ้นปีที่ 2 จะเหลือ 100 บาท (เท่าทุน) การบอกว่าได้กำไร 25% ต่อปี จึงเป็นความเข้าใจที่ผิด!</li>
          <li><strong>ถ้าใช้ค่าเฉลี่ยเรขาคณิต (Geometric Mean):</strong> เราต้องมองการเปลี่ยนแปลงในรูปตัวคูณ คือปีแรกคูณ 2 (2.0) ปีที่สองคูณ 0.5 <br/>
          G = √(2.0 × 0.5) = √1 = 1.0 <br/>
          ค่าผลคูณเฉลี่ยต่อปีคือ 1.0 (หรือ 0%) ซึ่งสะท้อนความเป็นจริงได้อย่างถูกต้อง 100%</li>
        </ul>

        <h3>ข้อจำกัดและข้อควรระวัง</h3>
        <p>
          แม้ค่าเฉลี่ยเรขาคณิตจะมีประโยชน์มากในหลายสถานการณ์ แต่ก็มีข้อจำกัดที่สำคัญที่ผู้ใช้จำเป็นต้องทราบ:
        </p>
        <ol>
          <li><strong>ข้อมูลต้องเป็นบวกเท่านั้น:</strong> หากมีข้อมูลตัวใดตัวหนึ่งในชุดเป็น 0 (ศูนย์) ผลคูณทั้งหมดจะกลายเป็นศูนย์ และค่าเฉลี่ยเรขาคณิตจะเท่ากับศูนย์ทันที ซึ่งทำให้เสียความหมายของข้อมูลโดยรวมไป</li>
          <li><strong>ไม่รองรับค่าลบ:</strong> ไม่สามารถคำนวณหารากที่เป็นเลขคู่ของผลคูณที่มีค่าเป็นลบได้ (ในระบบจำนวนจริง) ดังนั้นข้อมูลทั้งหมดจึงต้องมีค่ามากกว่าศูนย์อย่างเคร่งครัด ในกรณีของการคำนวณผลตอบแทนที่ติดลบ (เช่น ขาดทุน 10%) เราต้องปรับให้อยู่ในรูปตัวคูณก่อน (เช่น เหลือ 90% หรือ 0.90) จึงจะสามารถนำมาคำนวณในสูตรนี้ได้</li>
        </ol>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg my-6">
          <h4 className="flex items-center gap-2 font-bold text-yellow-800 m-0 mb-2">
            <Info className="w-5 h-5" />
            สรุปการนำไปใช้งาน
          </h4>
          <p className="text-yellow-800 m-0 text-sm">
            ควรเลือกใช้ Geometric Mean เสมอเมื่อคุณต้องการหาค่าเฉลี่ยของการเปลี่ยนแปลงที่เป็นอัตราส่วน เปอร์เซ็นต์ ทวีคูณ หรือการเติบโตสะสม (Compound Growth) เช่น อัตราดอกเบี้ยทบต้น ดัชนีราคาผู้บริโภค หรือตัวชี้วัดทางเศรษฐศาสตร์ที่มีการเปลี่ยนแปลงเชิงโครงสร้าง
          </p>
        </div>
      </article>
    </div>
  );
}
