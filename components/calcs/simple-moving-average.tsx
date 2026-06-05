"use client";

import React, { useState } from 'react';
import { Calculator, Info, TrendingUp } from 'lucide-react';

export default function SimpleMovingAverage({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';
  
  const [dataInput, setDataInput] = useState<string>('');
  const [period, setPeriod] = useState<string>('3');
  
  const [results, setResults] = useState<{ period_start: number; period_end: number; sma: number }[] | null>(null);
  const [latestSma, setLatestSma] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResults(null);
    setLatestSma(null);

    // Parse input
    const rawData = dataInput.split(/[\n, ]+/).filter(x => x.trim() !== '');
    if (rawData.length === 0) {
      setError(isTH ? 'กรุณากรอกข้อมูลตัวเลขอย่างน้อย 1 ตัว' : 'Please enter at least one data point');
      return;
    }

    const data = rawData.map(val => parseFloat(val));
    if (data.some(isNaN)) {
      setError(isTH ? 'พบข้อมูลที่ไม่ใช่ตัวเลข กรุณาตรวจสอบข้อมูล' : 'Invalid data format. Please enter numbers only.');
      return;
    }

    const p = parseInt(period);
    if (isNaN(p) || p <= 0) {
      setError(isTH ? 'คาบเวลา (Period) ต้องเป็นจำนวนเต็มบวก' : 'Period must be a positive integer');
      return;
    }

    if (p > data.length) {
      setError(isTH ? 'คาบเวลา (Period) ต้องไม่มากกว่าจำนวนข้อมูลทั้งหมด' : 'Period cannot be greater than the number of data points');
      return;
    }

    const smaList = [];
    for (let i = p - 1; i < data.length; i++) {
      const slice = data.slice(i - p + 1, i + 1);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      smaList.push({
        period_start: i - p + 2, // 1-indexed
        period_end: i + 1, // 1-indexed
        sma: sum / p,
      });
    }

    setResults(smaList);
    if (smaList.length > 0) {
      setLatestSma(smaList[smaList.length - 1].sma);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
          <TrendingUp size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณค่าเฉลี่ยเคลื่อนที่อย่างง่าย (SMA)' : 'Simple Moving Average Calculator'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isTH ? 'คำนวณ Simple Moving Average (SMA) จากชุดข้อมูล' : 'Calculate SMA from a dataset to identify trends'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ชุดข้อมูล (คั่นด้วยลูกน้ำ, ช่องว่าง หรือขึ้นบรรทัดใหม่)' : 'Dataset (Comma, space, or newline separated)'}
            </label>
            <textarea
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              placeholder="e.g. 10, 12, 15, 14, 18, 20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'คาบเวลา / ช่วงเวลา (Period - N)' : 'Period (N)'}
            </label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="e.g. 3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              min="1"
              step="1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculate}
            className="w-full flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-2"
          >
            <Calculator size={20} />
            <span>{isTH ? 'คำนวณ SMA' : 'Calculate SMA'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-teal-500" />
            {isTH ? 'ผลลัพธ์ (Results)' : 'Results'}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">
                {isTH ? 'ค่า SMA ล่าสุด (Latest SMA)' : 'Latest SMA'}
              </p>
              <p className="text-3xl font-bold text-teal-600">
                {latestSma !== null ? latestSma.toFixed(4) : '-'}
              </p>
            </div>

            {results && results.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-h-48 overflow-y-auto">
                <p className="text-sm text-gray-500 mb-2">{isTH ? 'ลำดับการคำนวณ' : 'Calculation Sequence'}</p>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="pb-2">{isTH ? 'ช่วงที่' : 'Range'}</th>
                      <th className="pb-2 text-right">SMA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((res, idx) => (
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="py-2 text-gray-700">Data {res.period_start} - {res.period_end}</td>
                        <td className="py-2 text-right font-medium text-gray-900">{res.sma.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-teal max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ค่าเฉลี่ยเคลื่อนที่อย่างง่าย (Simple Moving Average - SMA) คืออะไร?
        </h2>
        
        <p>
          <strong>ค่าเฉลี่ยเคลื่อนที่อย่างง่าย (Simple Moving Average หรือย่อว่า SMA)</strong> เป็นหนึ่งในเครื่องมือทางคณิตศาสตร์และสถิติขั้นพื้นฐานที่ได้รับความนิยมมากที่สุด โดยเฉพาะในการวิเคราะห์ทางเทคนิค (Technical Analysis) สำหรับตลาดหุ้น ตลาดฟอเร็กซ์ (Forex) และสินทรัพย์อื่นๆ รวมถึงการพยากรณ์ข้อมูลทางธุรกิจ (Business Forecasting) หน้าที่หลักของ SMA คือการทำให้ข้อมูลดิบที่มีความผันผวนสูง เรียบเนียนขึ้น (Smooth out) ช่วยให้เรามองเห็น <strong>"แนวโน้มหลัก" (Trend)</strong> ได้ชัดเจนยิ่งขึ้น โดยลดสัญญาณรบกวนระยะสั้น (Market Noise) ออกไป
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ SMA</h3>
        <p>
          วิธีการคำนวณ SMA นั้นเรียบง่ายตรงตามชื่อของมัน นั่นคือการนำเอาข้อมูลหรือราคาปิดย้อนหลังจำนวน N วัน (หรือคาบเวลาใดๆ ที่สนใจ) มาบวกกัน แล้วหารด้วยจำนวนวัน N เหล่านั้น เมื่อเวลาผ่านไป ข้อมูลเก่าที่สุดจะถูกตัดออกไป และข้อมูลใหม่ล่าสุดจะถูกเพิ่มเข้ามาในการคำนวณแทน ทำให้ค่าเฉลี่ยนี้ "เคลื่อนที่ (Moving)" ไปข้างหน้าเรื่อยๆ
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg">
          SMA = ( A₁ + A₂ + ... + Aₙ ) / N
        </div>
        
        <p>
          โดยที่:<br/>
          <strong>A</strong> = ข้อมูลในแต่ละช่วงเวลา (เช่น ราคาปิดของหุ้นแต่ละวัน)<br/>
          <strong>N</strong> = จำนวนคาบเวลาทั้งหมด (Period) ที่นำมาพิจารณา<br/>
        </p>

        <p>
          <strong>ตัวอย่างการคำนวณ:</strong> สมมติเราต้องการหา SMA 3 วัน (N = 3) ของราคาหุ้นที่มีราคาปิดดังนี้: 10, 12, 15, 14, 18<br/>
          วันที่ 3 (ใช้ข้อมูลวันที่ 1-3): (10 + 12 + 15) / 3 = 12.33<br/>
          วันที่ 4 (ใช้ข้อมูลวันที่ 2-4): (12 + 15 + 14) / 3 = 13.67<br/>
          วันที่ 5 (ใช้ข้อมูลวันที่ 3-5): (15 + 14 + 18) / 3 = 15.67
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้งานคาบเวลาต่างๆ (Periods)</h3>
        <p>
          การเลือกใช้คาบเวลา (N) มีผลอย่างมากต่อความไวของเส้น SMA โดยทั่วไปมักจะแบ่งออกเป็น 3 ระยะ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>แนวโน้มระยะสั้น (Short-term):</strong> มักใช้ SMA 5 ถึง 20 วัน เส้นจะเคลื่อนที่เกาะติดกับราคาอย่างใกล้ชิดและเปลี่ยนทิศทางได้ไว แต่ก็อาจให้สัญญาณหลอก (False Signal) ได้ง่าย</li>
          <li><strong>แนวโน้มระยะกลาง (Medium-term):</strong> มักใช้ SMA 50 วัน นิยมใช้เพื่อดูทิศทางหลักในรอบ 1-2 เดือน </li>
          <li><strong>แนวโน้มระยะยาว (Long-term):</strong> มักใช้ SMA 200 วัน เป็นตัวชี้วัดสำคัญที่นักลงทุนทั่วโลกใช้ดูว่าตลาดอยู่ในภาวะกระทิง (Bull Market) หรือหมี (Bear Market) หากราคาอยู่เหนือ SMA 200 ถือว่าเป็นเทรนด์ขาขึ้น และในทางกลับกัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อดีและข้อจำกัดของ SMA</h3>
        <p>
          <strong>ข้อดี:</strong> ใช้งานง่าย คำนวณไม่ซับซ้อน และให้ภาพรวมของแนวโน้มได้อย่างชัดเจน เหมาะสำหรับการดูกรอบเวลาใหญ่ๆ<br/>
          <strong>ข้อจำกัด:</strong> เนื่องจากเป็นการให้น้ำหนักข้อมูลทุกตัวเท่าๆ กันหมด (Equal Weighting) ทำให้เส้น SMA มีลักษณะล้าหลัง (Lagging) กล่าวคือเมื่อเกิดการเปลี่ยนแปลงอย่างฉับพลันของข้อมูลล่าสุด เส้น SMA จะใช้เวลาสักระยะกว่าจะปรับตัวตามทัน เพื่อแก้ปัญหานี้ นักวิเคราะห์หลายคนจึงเปลี่ยนไปใช้ค่าเฉลี่ยเคลื่อนที่แบบถ่วงน้ำหนักเอกซ์โพเนนเชียล (EMA) แทน ซึ่งจะให้น้ำหนักกับข้อมูลใหม่มากกว่าข้อมูลเก่า
        </p>
        <p>
          เครื่องมือคำนวณ SMA ออนไลน์นี้ ออกแบบมาเพื่ออำนวยความสะดวกในการหาค่าเฉลี่ยเคลื่อนที่อย่างรวดเร็ว โดยที่คุณสามารถวางชุดข้อมูลดิบที่มีจำนวนมากได้ทันที พร้อมเลือกระบุ Period ที่ต้องการ ระบบจะแสดงการไล่ลำดับการคำนวณในแต่ละช่วงเวลา และสรุปค่าล่าสุดให้คุณทราบโดยอัตโนมัติ
        </p>
      </article>
    </div>
  );
}
