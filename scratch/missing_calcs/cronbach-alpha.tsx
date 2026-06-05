import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, BookOpen } from 'lucide-react';

export default function CronbachAlphaCalculator({ lang }: any) {
  const [k, setK] = useState<string>('');
  const [sumVar, setSumVar] = useState<string>('');
  const [varTotal, setVarTotal] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateAlpha = () => {
    const kNum = parseFloat(k);
    const sumVarNum = parseFloat(sumVar);
    const varTotalNum = parseFloat(varTotal);

    if (
      !isNaN(kNum) &&
      !isNaN(sumVarNum) &&
      !isNaN(varTotalNum) &&
      kNum > 1 &&
      varTotalNum > 0
    ) {
      const alpha = (kNum / (kNum - 1)) * (1 - sumVarNum / varTotalNum);
      setResult(alpha);
    } else {
      setResult(null);
    }
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณความเชื่อมั่นครอนบาคอัลฟา' : "Cronbach's Alpha Calculator"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'จำนวนข้อคำถาม (k)' : 'Number of items (k)'}
              </label>
              <input
                type="number"
                value={k}
                onChange={(e) => setK(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={isTH ? 'เช่น 10' : 'e.g. 10'}
                min="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'ผลรวมของความแปรปรวนแต่ละข้อ (ΣVi)' : 'Sum of item variances (ΣVi)'}
              </label>
              <input
                type="number"
                value={sumVar}
                onChange={(e) => setSumVar(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={isTH ? 'เช่น 15.5' : 'e.g. 15.5'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isTH ? 'ความแปรปรวนของคะแนนรวม (Vt)' : 'Variance of total scores (Vt)'}
              </label>
              <input
                type="number"
                value={varTotal}
                onChange={(e) => setVarTotal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={isTH ? 'เช่น 65.2' : 'e.g. 65.2'}
              />
            </div>

            <button
              onClick={calculateAlpha}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-200"
            >
              {isTH ? 'คำนวณค่าความเชื่อมั่น' : 'Calculate Reliability'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
            {result !== null ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-500">
                  {isTH ? 'ค่าความเชื่อมั่นของครอนบาคอัลฟา (α)' : "Cronbach's Alpha (α)"}
                </h3>
                <div className="text-5xl font-bold text-blue-600">
                  {result.toFixed(4)}
                </div>
                <div className="mt-4 p-4 bg-white rounded-xl text-gray-700 text-sm border border-gray-100">
                  <p>
                    {isTH ? 'การแปลผล:' : 'Interpretation:'}
                    <span className="font-semibold ml-2">
                      {result >= 0.9 ? (isTH ? 'ดีเยี่ยม (Excellent)' : 'Excellent') :
                       result >= 0.8 ? (isTH ? 'ดี (Good)' : 'Good') :
                       result >= 0.7 ? (isTH ? 'พอใช้ (Acceptable)' : 'Acceptable') :
                       result >= 0.6 ? (isTH ? 'มีคำถามที่ต้องพิจารณา (Questionable)' : 'Questionable') :
                       result >= 0.5 ? (isTH ? 'แย่ (Poor)' : 'Poor') :
                       (isTH ? 'รับไม่ได้ (Unacceptable)' : 'Unacceptable')}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center">
                <Info className="w-12 h-12 mb-3 text-gray-300" />
                <p>{isTH ? 'กรอกข้อมูลให้ครบถ้วนเพื่อดูผลลัพธ์' : 'Enter all values to see the result'}</p>
                <p className="text-sm mt-2 max-w-xs mx-auto">
                  {isTH ? '* จำนวนข้อคำถาม (k) ต้องมากกว่า 1 และความแปรปรวนรวม (Vt) ต้องมากกว่า 0' : '* Number of items (k) must be > 1 and Total Variance (Vt) must be > 0'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          การหาความเชื่อมั่นของแบบสอบถามด้วยค่าอัลฟาของครอนบาค (Cronbach's Alpha)
        </h2>
        
        <p>
          ในการวิจัยหรือการสร้างเครื่องมือวัดทางจิตวิทยา การศึกษา หรือสังคมศาสตร์ สิ่งที่สำคัญที่สุดประการหนึ่งคือ "ความน่าเชื่อถือ" (Reliability) ของเครื่องมือที่ใช้ในการเก็บข้อมูล หากแบบสอบถามหรือแบบทดสอบไม่มีความน่าเชื่อถือ ผลลัพธ์ที่ได้ย่อมไม่สามารถนำไปใช้อ้างอิงหรือสรุปผลได้อย่างมั่นใจ หนึ่งในวิธีการหาความเชื่อมั่นที่เป็นที่นิยมและได้รับการยอมรับอย่างแพร่หลายมากที่สุดคือการใช้ <strong>ค่าสัมประสิทธิ์อัลฟาของครอนบาค (Cronbach's Alpha)</strong>
        </p>

        <h3>ค่าครอนบาคอัลฟาคืออะไร?</h3>
        <p>
          Cronbach's Alpha คือค่าสถิติที่ใช้วัดความสอดคล้องภายใน (Internal Consistency) ของเครื่องมือวัด ซึ่งหมายถึงการตรวจสอบว่าคำถามทุกข้อในมาตรวัด (Scale) เดียวกันนั้น วัดในสิ่งเดียวกันหรือไม่ ค่าของ Alpha จะมีแนวโน้มอยู่ระหว่าง 0 ถึง 1 ยิ่งมีค่าเข้าใกล้ 1 หมายความว่าเครื่องมือวัดมีความเชื่อมั่นและสอดคล้องภายในสูง
        </p>

        <h3>สูตรการคำนวณ (Formula)</h3>
        <div className="bg-blue-50 p-6 rounded-xl my-6 text-center font-serif text-xl border border-blue-100">
          α = (k / (k - 1)) × (1 - (ΣV<sub>i</sub> / V<sub>t</sub>))
        </div>
        <ul>
          <li><strong>α (Alpha)</strong> คือ สัมประสิทธิ์ความเชื่อมั่นของครอนบาค</li>
          <li><strong>k</strong> คือ จำนวนข้อคำถามทั้งหมดในแบบสอบถาม</li>
          <li><strong>ΣV<sub>i</sub></strong> คือ ผลรวมของความแปรปรวนของคะแนนรายข้อ (Sum of item variances)</li>
          <li><strong>V<sub>t</sub></strong> คือ ความแปรปรวนของคะแนนรวมทั้งหมด (Variance of total scores)</li>
        </ul>

        <h3>การแปลผลค่าครอนบาคอัลฟา</h3>
        <p>
          โดยทั่วไปแล้ว นักวิจัยจะยอมรับแบบสอบถามที่มีค่า Alpha ตั้งแต่ 0.70 ขึ้นไป ว่ามีความน่าเชื่อถือเพียงพอ อย่างไรก็ตาม การแปลผลสามารถแบ่งได้ตามเกณฑ์มาตรฐานดังนี้:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left">ค่า Alpha (α)</th>
                <th className="py-3 px-4 border-b text-left">ความหมาย / การแปลผล</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">0.90 ขึ้นไป</td>
                <td className="py-3 px-4 border-b">มีความเชื่อมั่นดีเยี่ยม (Excellent) แต่อาจมีข้อคำถามที่ซ้ำซ้อนกันมากเกินไป</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">0.80 - 0.89</td>
                <td className="py-3 px-4 border-b">มีความเชื่อมั่นดี (Good) เหมาะสมกับการใช้งานทั่วไป</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">0.70 - 0.79</td>
                <td className="py-3 px-4 border-b">พอใช้ (Acceptable) เป็นเกณฑ์ขั้นต่ำที่ยอมรับได้ในงานวิจัยส่วนใหญ่</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">0.60 - 0.69</td>
                <td className="py-3 px-4 border-b">มีคำถามที่ต้องพิจารณา (Questionable) อาจต้องปรับปรุงหรือตัดบางข้อทิ้ง</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">0.50 - 0.59</td>
                <td className="py-3 px-4 border-b">แย่ (Poor) ไม่ควรนำไปใช้วัดผลหากไม่มีการปรับปรุงใหม่ทั้งหมด</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">ต่ำกว่า 0.50</td>
                <td className="py-3 px-4 border-b">รับไม่ได้ (Unacceptable) เครื่องมือไม่มีความน่าเชื่อถือ</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>ปัจจัยที่มีผลต่อค่าครอนบาคอัลฟา</h3>
        <p>
          มีหลายปัจจัยที่ส่งผลต่อการเพิ่มขึ้นหรือลดลงของค่า Alpha ดังนี้:
        </p>
        <ol>
          <li><strong>จำนวนข้อคำถาม (Number of Items):</strong> โดยธรรมชาติแล้ว หากเพิ่มจำนวนข้อคำถามในแบบสอบถาม (ที่วัดเรื่องเดียวกัน) ค่า Alpha มักจะมีแนวโน้มสูงขึ้น</li>
          <li><strong>ความสัมพันธ์ระหว่างข้อคำถาม (Inter-item Correlation):</strong> หากผู้ตอบแบบสอบถามตอบไปในทิศทางเดียวกันในคำถามที่คล้ายกัน ค่าความเชื่อมั่นจะสูงขึ้น</li>
          <li><strong>ความหลากหลายของกลุ่มตัวอย่าง:</strong> กลุ่มตัวอย่างที่มีความแตกต่างกันมาก มักจะให้ค่าความแปรปรวนที่สูง ทำให้ค่า Alpha มีแนวโน้มสูงขึ้นตามไปด้วย</li>
        </ol>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg my-6">
          <h4 className="flex items-center gap-2 font-bold text-yellow-800 m-0 mb-2">
            <AlertCircle className="w-5 h-5" />
            ข้อควรระวัง
          </h4>
          <p className="text-yellow-800 m-0 text-sm">
            ค่า Cronbach's Alpha ที่สูงเกินไป (เช่น มากกว่า 0.95) อาจไม่ได้เป็นเรื่องดีเสมอไป เพราะอาจบ่งบอกถึงปรากฏการณ์ที่เรียกว่า "Redundancy" หรือการที่ข้อคำถามมีความซ้ำซ้อนกันมากเกินไป เหมือนเป็นการถามคำถามเดียวกันซ้ำๆ หลายครั้งในรูปแบบที่ต่างกันเพียงเล็กน้อย ซึ่งนักวิจัยควรพิจารณาตัดทอนข้อคำถามที่ซ้ำซ้อนออกเพื่อลดความยาวของแบบสอบถาม
          </p>
        </div>

        <p>
          เครื่องมือคำนวณค่าครอนบาคอัลฟานี้ ถูกออกแบบมาเพื่อช่วยให้นักศึกษา นักวิจัย และผู้ที่ทำงานเกี่ยวกับการวัดและประเมินผล สามารถหาค่าความเชื่อมั่นของแบบสอบถามได้อย่างรวดเร็ว โดยไม่จำเป็นต้องใช้โปรแกรมทางสถิติที่ซับซ้อน เพียงแค่ทราบจำนวนข้อคำถาม ผลรวมความแปรปรวนรายข้อ และความแปรปรวนของคะแนนรวม ก็สามารถทราบคุณภาพของเครื่องมือที่ใช้ได้ทันที
        </p>
      </article>
    </div>
  );
}
