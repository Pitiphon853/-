"use client";

import React, { useState } from 'react';
import { Calculator, Info, Activity } from 'lucide-react';

export default function PoissonDistribution({ lang }: any) {
  const isTH = lang === 'th' || lang === 'TH';
  
  const [lambda, setLambda] = useState<string>('');
  const [events, setEvents] = useState<string>('');
  
  const [resultEqual, setResultEqual] = useState<number | null>(null);
  const [resultLess, setResultLess] = useState<number | null>(null);
  const [resultGreater, setResultGreater] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Factorial function
  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) {
      res *= i;
    }
    return res;
  };

  const calculatePoisson = (l: number, k: number): number => {
    return (Math.exp(-l) * Math.pow(l, k)) / factorial(k);
  };

  const calculate = () => {
    setError('');
    setResultEqual(null);
    setResultLess(null);
    setResultGreater(null);

    const l = parseFloat(lambda);
    const k = parseInt(events);

    if (isNaN(l) || l <= 0) {
      setError(isTH ? 'ค่าเฉลี่ย (λ) ต้องเป็นตัวเลขที่มากกว่า 0' : 'Average rate (λ) must be greater than 0');
      return;
    }
    if (isNaN(k) || k < 0) {
      setError(isTH ? 'จำนวนเหตุการณ์ (x) ต้องเป็นจำนวนเต็มบวกหรือศูนย์' : 'Number of events (x) must be a non-negative integer');
      return;
    }

    const probEqual = calculatePoisson(l, k);
    
    let probLessOrEqual = 0;
    for (let i = 0; i <= k; i++) {
      probLessOrEqual += calculatePoisson(l, i);
    }
    
    // P(X >= k) = 1 - P(X <= k - 1)
    let probLessStrict = 0;
    for (let i = 0; i < k; i++) {
      probLessStrict += calculatePoisson(l, i);
    }
    const probGreaterOrEqual = 1 - probLessStrict;

    setResultEqual(probEqual);
    setResultLess(probLessOrEqual);
    setResultGreater(Math.max(0, probGreaterOrEqual)); // prevent negative floating point artifacts
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
          <Activity size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isTH ? 'คำนวณการแจกแจงแบบปัวซง (Poisson)' : 'Poisson Distribution Calculator'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isTH ? 'คำนวณหาความน่าจะเป็นจากกฎการแจกแจงปัวซง' : 'Calculate probability using Poisson distribution'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'ค่าเฉลี่ยของเหตุการณ์ที่เกิดขึ้น (λ หรือ Lambda)' : 'Average rate of success (λ)'}
            </label>
            <input
              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              min="0.0001"
              step="any"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isTH ? 'จำนวนเหตุการณ์ที่สนใจ (x)' : 'Number of events observed (x)'}
            </label>
            <input
              type="number"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
              placeholder="e.g. 4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              min="0"
              step="1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculate}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-2"
          >
            <Calculator size={20} />
            <span>{isTH ? 'คำนวณ' : 'Calculate'}</span>
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info size={20} className="mr-2 text-purple-500" />
            {isTH ? 'ผลลัพธ์ความน่าจะเป็น' : 'Probability Results'}
          </h3>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X = x) {isTH ? 'เท่ากับ x พอดี' : 'Exactly x'}</p>
              <p className="text-2xl font-bold text-purple-600">
                {resultEqual !== null ? resultEqual.toFixed(6) : '-'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X &lt;= x) {isTH ? 'น้อยกว่าหรือเท่ากับ x' : 'At most x'}</p>
              <p className="text-xl font-bold text-gray-700">
                {resultLess !== null ? resultLess.toFixed(6) : '-'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">P(X &gt;= x) {isTH ? 'มากกว่าหรือเท่ากับ x' : 'At least x'}</p>
              <p className="text-xl font-bold text-gray-700">
                {resultGreater !== null ? resultGreater.toFixed(6) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 pt-8 border-t border-gray-200 prose prose-purple max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การแจกแจงแบบปัวซง (Poisson Distribution) คืออะไร?
        </h2>
        
        <p>
          <strong>การแจกแจงแบบปัวซง (Poisson Distribution)</strong> ตั้งชื่อตาม Siméon Denis Poisson นักคณิตศาสตร์ชาวฝรั่งเศส เป็นแบบจำลองทางสถิติที่ใช้อธิบายความน่าจะเป็นของ "จำนวนครั้งที่เกิดเหตุการณ์หนึ่งๆ" ภายในช่วงเวลา หรือขอบเขตพื้นที่ที่กำหนดไว้อย่างชัดเจน โดยเหตุการณ์เหล่านั้นจะต้องเกิดขึ้นอย่างอิสระต่อกัน และมีอัตราการเกิดเฉลี่ยคงที่ การแจกแจงแบบนี้มักใช้ในการนับจำนวนเหตุการณ์ที่เกิดขึ้นได้ยาก (Rare Events) หรือมีโอกาสเกิดขึ้นน้อยมากในแต่ละช่วงเวลาย่อยๆ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เมื่อใดที่ควรใช้การแจกแจงแบบปัวซง?</h3>
        <p>
          เราจะใช้การแจกแจงปัวซงก็ต่อเมื่อสถานการณ์หรือข้อมูลของเรามีลักษณะเข้าข่าย 3 ประการ ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>เหตุการณ์เกิดขึ้นอย่างสุ่มและเป็นอิสระ:</strong> การเกิดเหตุการณ์หนึ่งจะต้องไม่ส่งผลกระทบให้โอกาสการเกิดเหตุการณ์ถัดไปเพิ่มขึ้นหรือลดลง</li>
          <li><strong>อัตราเฉลี่ย (λ) คงที่:</strong> จำนวนเหตุการณ์เฉลี่ยที่เกิดขึ้นในหน่วยเวลาหรือขอบเขตหนึ่งๆ จะต้องมีค่าคงที่เสมอ ไม่ผันผวนไปตามเวลา</li>
          <li><strong>ไม่สามารถเกิดพร้อมกันได้ในเวลาเดียวกัน:</strong> ในช่วงเวลาหรือพื้นที่ที่เล็กมากๆ โอกาสที่จะเกิดเหตุการณ์มากกว่า 1 ครั้งจะเข้าใกล้ศูนย์</li>
        </ul>
        <p>
          <strong>ตัวอย่างที่พบได้ในชีวิตประจำวัน:</strong> จำนวนลูกค้าที่เดินเข้ามาในร้านกาแฟใน 1 ชั่วโมง, จำนวนอุบัติเหตุบนสี่แยกใน 1 เดือน, จำนวนอีเมลสแปมที่ได้รับต่อวัน, หรือจำนวนข้อบกพร่องที่พบในผ้า 1 ม้วน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรคณิตศาสตร์ของการแจกแจงปัวซง</h3>
        <p>
          การหาความน่าจะเป็นที่จะเกิดเหตุการณ์จำนวน x ครั้ง เมื่อกำหนดอัตราเฉลี่ยคือ λ (แลมบ์ดา) สามารถคำนวณได้จากสูตร:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center text-lg overflow-x-auto whitespace-nowrap">
          P(X = x) = (e^(-λ) · λ^x) / x!
        </div>
        
        <p>
          โดยที่:<br/>
          <strong>P(X = x)</strong> = ความน่าจะเป็นที่จะเกิดเหตุการณ์จำนวน x ครั้ง<br/>
          <strong>e</strong> = ค่าคงที่ทางคณิตศาสตร์ (Euler's number) มีค่าประมาณ 2.71828<br/>
          <strong>λ (Lambda)</strong> = ค่าเฉลี่ยของจำนวนครั้งที่เกิดเหตุการณ์ในหนึ่งหน่วยเวลาหรือพื้นที่<br/>
          <strong>x</strong> = จำนวนครั้งที่เกิดเหตุการณ์ที่เราสนใจ (0, 1, 2, ...)<br/>
          <strong>x!</strong> = แฟกทอเรียลของ x
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการใช้งานเพื่อคำนวณความน่าจะเป็น</h3>
        <p>
          <strong>ตัวอย่าง:</strong> ธนาคารแห่งหนึ่งมีลูกค้าเข้ามาใช้บริการโดยเฉลี่ย 3 คนต่อนาที (λ = 3) จงหาความน่าจะเป็นที่จะมีลูกค้าเข้ามาใช้บริการ 5 คน (x = 5) ในเวลา 1 นาที<br/>
          <strong>วิธีทำ:</strong><br/>
          แทนค่าลงในสูตร: P(X = 5) = (e^(-3) · 3^5) / 5!<br/>
          P(X = 5) = (0.0498 · 243) / 120<br/>
          P(X = 5) ≈ 0.1008 หรือประมาณ 10.08%
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ประโยชน์ของเครื่องมือคำนวณ (Calculator)</h3>
        <p>
          ในการทำงานจริง โดยเฉพาะสายงานวิศวกรรมอุตสาหการ (Industrial Engineering) การจัดการแถวคอย (Queuing Theory) หรืองานด้านประกันภัย การคำนวณความน่าจะเป็นด้วยสูตรปัวซงมักจะมีความซับซ้อนเมื่อต้องการหาความน่าจะเป็นแบบสะสม เช่น "ความน่าจะเป็นที่จะมีลูกค้าเข้ามาอย่างน้อย 5 คน" P(X ≥ 5) ซึ่งต้องนำค่า P(x) หลายๆ ค่ามารวมกัน 
          การใช้ <em>Poisson Distribution Calculator</em> จะช่วยประหยัดเวลาได้อย่างมหาศาล เพียงแค่ระบุค่า λ และค่า x เครื่องมือของเราจะประมวลผลให้แบบเรียลไทม์ พร้อมแสดงผลลัพธ์ทั้งแบบเท่ากับ น้อยกว่า และมากกว่า ให้ครบจบในที่เดียว
        </p>
      </article>
    </div>
  );
}
