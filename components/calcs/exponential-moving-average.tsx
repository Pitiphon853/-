"use client";

import React, { useState } from 'react';
import { Calculator, Info, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

interface EmaResultRow {
  index: number;
  value: number;
  ema: number | null;
  note: string;
}

export default function ExponentialMovingAverage({ lang }: any) {
  const isEN = lang === 'en';

  const [dataInput, setDataInput] = useState<string>('');
  const [period, setPeriod] = useState<string>('5');
  
  const [results, setResults] = useState<EmaResultRow[] | null>(null);
  const [latestEma, setLatestEma] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const t = {
    title: isEN ? 'Exponential Moving Average (EMA) Calculator' : 'เครื่องมือคำนวณหาค่าเฉลี่ยเคลื่อนที่แบบเอ็กซ์โพเนนเชียล (EMA)',
    desc: isEN ? 'Calculate EMA from a sequence of data points with step-by-step math.' : 'คำนวณค่าเฉลี่ยเคลื่อนที่แบบถ่วงน้ำหนักเอ็กซ์โพเนนเชียลจากชุดข้อมูล พร้อมสูตรและลำดับขั้นตอนการคิด',
    labelData: isEN ? 'Dataset (Comma, space, or newline separated)' : 'ชุดข้อมูล (คั่นด้วยเครื่องหมายจุลภาค, ช่องว่าง หรือขึ้นบรรทัดใหม่)',
    placeholderData: isEN ? 'e.g. 10, 12, 15, 14, 18, 20, 22' : 'เช่น 10, 12, 15, 14, 18, 20, 22',
    labelPeriod: isEN ? 'Period (N)' : 'คาบเวลา / ช่วงเวลา (Period - N)',
    placeholderPeriod: isEN ? 'e.g. 5' : 'เช่น 5',
    btnCalculate: isEN ? 'Calculate EMA' : 'คำนวณ EMA',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    latestEmaResult: isEN ? 'Latest EMA' : 'ค่า EMA ล่าสุด',
    multiplierLabel: isEN ? 'Smoothing Factor (α)' : 'ตัวคูณความเรียบ (α - Smoothing Factor)',
    invalidData: isEN ? 'Invalid data format. Please enter numbers only.' : 'รูปแบบชุดข้อมูลไม่ถูกต้อง กรุณากรอกเฉพาะตัวเลขเท่านั้น',
    emptyData: isEN ? 'Please enter at least one data point.' : 'กรุณากรอกชุดข้อมูลตัวเลข',
    invalidPeriod: isEN ? 'Period must be an integer greater than 1.' : 'คาบเวลาต้องเป็นจำนวนเต็มบวกที่มากกว่า 1',
    periodTooLarge: isEN ? 'Period cannot be greater than the number of data points.' : 'คาบเวลาต้องไม่มากกว่าจำนวนข้อมูลทั้งหมดที่มี',
    sequenceTitle: isEN ? 'Calculation Table' : 'ตารางลำดับการคำนวณทีละช่วงเวลา',
    colIndex: isEN ? 'Index' : 'ลำดับที่',
    colValue: isEN ? 'Value' : 'ข้อมูล',
    colEma: isEN ? 'EMA Value' : 'ค่า EMA',
    colNote: isEN ? 'Method/Note' : 'หมายเหตุ',
    stepTitle: isEN ? 'EMA Calculation Logic:' : 'หลักการและตัวคูณคำนวณ EMA:',
  };

  const handleCalculate = () => {
    setError('');
    setResults(null);
    setLatestEma(null);
    setMultiplier(null);

    const rawData = dataInput.split(/[\n, ]+/).filter(x => x.trim() !== '');
    if (rawData.length === 0) {
      setError(t.emptyData);
      return;
    }

    const data = rawData.map(val => parseFloat(val));
    if (data.some(isNaN)) {
      setError(t.invalidData);
      return;
    }

    const n = parseInt(period, 10);
    if (isNaN(n) || n <= 1) {
      setError(t.invalidPeriod);
      return;
    }

    if (n > data.length) {
      setError(t.periodTooLarge);
      return;
    }

    // alpha = 2 / (N + 1)
    const alpha = 2 / (n + 1);
    setMultiplier(alpha);

    const emaList: EmaResultRow[] = [];

    // The first N-1 points don't have an EMA
    for (let i = 0; i < n - 1; i++) {
      emaList.push({
        index: i + 1,
        value: data[i],
        ema: null,
        note: isEN ? 'Waiting for enough periods' : 'ข้อมูลไม่เพียงพอต่อการเริ่มคำนวณ',
      });
    }

    // The N-th point is calculated as SMA
    const firstNSlice = data.slice(0, n);
    const firstNSum = firstNSlice.reduce((sum, val) => sum + val, 0);
    const initialSma = firstNSum / n;

    emaList.push({
      index: n,
      value: data[n - 1],
      ema: initialSma,
      note: isEN ? `Initial EMA (SMA of first ${n} points)` : `จุดเริ่มต้น (ใช้ค่า SMA ของข้อมูล ${n} ตัวแรก)`,
    });

    // Subsequent points are calculated recursively:
    // EMA_t = (Value_t * alpha) + (EMA_{t-1} * (1 - alpha))
    let prevEma = initialSma;
    for (let i = n; i < data.length; i++) {
      const val = data[i];
      const curEma = (val * alpha) + (prevEma * (1 - alpha));
      emaList.push({
        index: i + 1,
        value: val,
        ema: curEma,
        note: isEN 
          ? `(${val.toFixed(2)} × ${alpha.toFixed(4)}) + (${prevEma.toFixed(2)} × ${(1 - alpha).toFixed(4)})`
          : `(${val.toFixed(2)} × ${alpha.toFixed(4)}) + (${prevEma.toFixed(2)} × ${(1 - alpha).toFixed(4)})`,
      });
      prevEma = curEma;
    }

    setResults(emaList);
    setLatestEma(emaList[emaList.length - 1].ema);
  };

  const handleClear = () => {
    setDataInput('');
    setPeriod('5');
    setResults(null);
    setLatestEma(null);
    setMultiplier(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
          <TrendingUp size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{t.desc}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Input Panel */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labelData}</label>
            <textarea
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              placeholder={t.placeholderData}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-32 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labelPeriod}</label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder={t.placeholderPeriod}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
              min="2"
              step="1"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <Calculator size={20} />
              <span>{t.btnCalculate}</span>
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
              title={t.btnReset}
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-indigo-500" />
            {isEN ? 'Results Summary' : 'สรุปผลการคำนวณ'}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{t.latestEmaResult}</p>
              <p className="text-3xl font-bold text-indigo-600 font-mono">
                {latestEma !== null ? latestEma.toFixed(4) : '-'}
              </p>
            </div>

            {multiplier !== null && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm">
                <p className="text-gray-500 mb-1">{t.multiplierLabel}</p>
                <p className="font-semibold text-gray-800 font-mono">
                  α = 2 ÷ (N + 1) = 2 ÷ ({period} + 1) = {multiplier.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calculations Table */}
      {results && results.length > 0 && (
        <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200">
          <h3 className="font-bold text-lg text-gray-800 mb-3">{t.sequenceTitle}</h3>
          <div className="max-h-80 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm text-left border-collapse font-mono">
              <thead className="bg-gray-50 text-gray-600 border-b sticky top-0">
                <tr>
                  <th className="py-2 px-3">{t.colIndex}</th>
                  <th className="py-2 px-3 text-right">{t.colValue}</th>
                  <th className="py-2 px-3 text-right">{t.colEma}</th>
                  <th className="py-2 px-3 pl-6">{t.colNote}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.index} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-500">{row.index}</td>
                    <td className="py-2 px-3 text-right text-gray-800">{row.value}</td>
                    <td className="py-2 px-3 text-right font-bold text-indigo-600">
                      {row.ema !== null ? row.ema.toFixed(4) : '-'}
                    </td>
                    <td className="py-2 px-3 pl-6 text-xs text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-indigo max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-indigo-600" />
          ค่าเฉลี่ยเคลื่อนที่แบบเอ็กซ์โพเนนเชียล (Exponential Moving Average - EMA) คืออะไร? สูตรและการวิเคราะห์แนวโน้ม
        </h2>
        
        <p>
          ในการวิเคราะห์ทางเทคนิค (Technical Analysis) ของตลาดการเงินและการวิเคราะห์ชุดข้อมูลเชิงสถิติ เครื่องมือชี้วัดกลุ่ม Moving Average ถือเป็นเครื่องมือยอดนิยมที่มีประสิทธิภาพสูง โดยหลักๆ จะถูกใช้ในการกรองความผันผวนระยะสั้น (Market Noise) เพื่อค้นหาทิศทางแนวโน้มหลัก (Trend Line) ของราคาหรือข้อมูลดิบ และในบรรดาค่าเฉลี่ยเคลื่อนที่เหล่านั้น <strong>ค่าเฉลี่ยเคลื่อนที่แบบเอ็กซ์โพเนนเชียล (Exponential Moving Average หรือ EMA)</strong> เป็นดัชนีที่ได้รับการยอมรับและใช้งานอย่างแพร่หลายมากที่สุดตัวหนึ่ง
        </p>

        <h3>ความแตกต่างระหว่าง EMA และ SMA</h3>
        <p>
          ค่าเฉลี่ยเคลื่อนที่อย่างง่าย (Simple Moving Average - SMA) จะคำนวณโดยนำข้อมูลทั้งหมดมาหาค่าเฉลี่ยทางคณิตศาสตร์ธรรมดา ส่งผลให้ข้อมูลในอดีต (เช่น ราคาเมื่อ 10 วันก่อน) และข้อมูลปัจจุบัน (ราคาของวันนี้) ได้รับน้ำหนักเท่ากันทั้งหมดในการคำนวณ ในทางกลับกัน <strong>EMA จะให้ความสำคัญอย่างมากกับข้อมูลตัวล่าสุด (Recent Data)</strong> และจะลดน้ำหนักของข้อมูลเก่าลงแบบทวีคูณ (Exponentially) เมื่อย้อนเวลาห่างออกไป ทำให้เส้น EMA ตอบสนองต่อการเปลี่ยนแปลงแนวโน้มล่าสุดได้รวดเร็วกว่า และช่วยลดปัญหาความล้าหลัง (Lagging) ที่มักเกิดขึ้นในระบบของ SMA
        </p>

        <h3>สูตรและวิธีการคำนวณค่า EMA</h3>
        <p>
          การคำนวณค่า EMA มีลักษณะเป็นสมการแบบเวียนเกิด (Recursive Equation) ซึ่งแปลว่าค่าในปัจจุบันจะถูกคำนวณขึ้นโดยพึ่งพาค่าเฉลี่ยสะสมในอดีต โดยมีสมการหลักดังต่อไปนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-md">
          EMA_t = (Value_t × &alpha;) + (EMA_{"{"}"t-1"{"}"} × (1 - &alpha;))
        </div>
        <p>
          โดยที่ตัวแปรประกอบด้วย:
        </p>
        <ul>
          <li><strong>EMA_t:</strong> ค่าเฉลี่ยเคลื่อนที่แบบเอ็กซ์โพเนนเชียลในปัจจุบัน</li>
          <li><strong>Value_t:</strong> ค่าข้อมูลหรือราคาปิดตัวล่าสุด ณ ช่วงเวลาปัจจุบัน</li>
          <li><strong>EMA_{"{"}"t-1"{"}"}:</strong> ค่าเฉลี่ย EMA ในรอบเวลาก่อนหน้า (ก่อนหน้านี้ 1 สเต็ป)</li>
          <li><strong>&alpha; (Alpha):</strong> Smoothing Factor หรือตัวคูณความเรียบ ซึ่งคำนวณได้จากสูตร: <code>&alpha; = 2 / (N + 1)</code> (โดย N คือความยาวของช่วงเวลาหรือ Period เช่น EMA 5 วัน)</li>
        </ul>

        <h3>การตั้งค่าจุดเริ่มต้นของการคำนวณ EMA</h3>
        <p>
          เนื่องจากสูตรของ EMA จำเป็นต้องใช้ค่า <code>EMA_{"{"}"t-1"{"}"}</code> ของวันก่อนหน้าในการประมวลผลคำนวณรอบใหม่ ทำให้ในวันแรกสุดที่เราเริ่มทำการวัดผล (คือ ณ จุดสิ้นสุดคาบเวลาแรกพอดี) เราจะยังไม่มีค่าเฉลี่ย EMA สะสมในวันก่อนหน้า วิธีการมาตรฐานที่เป็นสากลนิยมจึงเป็น <strong>การหาค่าเฉลี่ยอย่างง่าย (SMA) ของข้อมูลในช่วงแรกจำนวน N วันก่อน</strong> เพื่อใช้ตัวเลขเฉลี่ยดังกล่าวเป็นตัวแทนของค่าตั้งต้นของสมการ EMA ตัวแรกสุด จากนั้นจุดถัดๆ ไปจึงค่อยนำค่าสมการหลักมาคำนวณวนซ้ำต่อไปเรื่อยๆ
        </p>

        <h3>การประยุกต์ใช้ EMA ในการลงทุน</h3>
        <p>
          นักเทรดและนักวิเคราะห์ทางเทคนิคนำ EMA ไปใช้ในการระบุจุดซื้อจุดขายและทิศทางเทรนด์ในรูปแบบหลักๆ ดังนี้:
        </p>
        <ol>
          <li><strong>ระบุทิศทางของเทรนด์:</strong> หากราคายืนอยู่เหนือเส้น EMA ถือเป็นแนวโน้มขาขึ้น (Bullish) แต่หากราคาลงมาต่ำกว่าเส้น EMA จะมองเป็นแนวโน้มขาลง (Bearish)</li>
          <li><strong>จุดตัดตัดกันของเส้นค่าเฉลี่ย (Moving Average Crossovers):</strong> เช่น การใช้เส้น EMA ระยะสั้นตัดเส้น EMA ระยะยาว หากเส้นสั้นตัดขึ้นด้านบน (Golden Cross) ถือเป็นสัญญาณซื้อ และหากเส้นสั้นตัดลงมาด้านล่าง (Death Cross) ถือเป็นสัญญาณขาย</li>
          <li><strong>ใช้เป็นแนวรับแนวต้านแบบเคลื่อนที่ (Dynamic Support and Resistance):</strong> บ่อยครั้งที่ราคาหุ้นจะย่อตัวลงมาสัมผัสที่เส้นค่าเฉลี่ย EMA แล้วสามารถเกิดแรงซื้อกลับเด้งฟื้นตัวขึ้นต่อได้ ทำให้เส้นนี้ทำหน้าที่เป็นแนวรับที่คอยเคลื่อนตัวตามราคาตลาดอย่างชาญฉลาด</li>
        </ol>
      </article>
    </div>
  );
}
