import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

export default function CapacityUtilizationRate({ lang }: any) {
  const [actualOutput, setActualOutput] = useState<number | string>('');
  const [maxOutput, setMaxOutput] = useState<number | string>('');

  const actual = Number(actualOutput) || 0;
  const max = Number(maxOutput) || 0;

  const utilizationRate = max > 0 ? (actual / max) * 100 : 0;

  let statusMessage = '';
  let statusColor = 'text-gray-500';
  if (utilizationRate > 0) {
    if (utilizationRate < 70) {
      statusMessage = 'มีการปล่อยกำลังการผลิตว่างเปล่าจำนวนมาก ควรหาลูกค้าเพิ่มเพื่อใช้ทรัพยากรให้คุ้มค่า';
      statusColor = 'text-yellow-600';
    } else if (utilizationRate <= 85) {
      statusMessage = 'อยู่ในเกณฑ์ที่ดีมาก มีประสิทธิภาพและยังมีพื้นที่เผื่อสำหรับการบำรุงรักษาเครื่องจักร';
      statusColor = 'text-green-600';
    } else {
      statusMessage = 'ทำงานเต็มกำลังมากเกินไป อาจส่งผลเสียต่อเครื่องจักรและพนักงานในระยะยาว ควรพิจารณาขยายกำลังการผลิต';
      statusColor = 'text-red-500';
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-cyan-100 rounded-full">
          <Activity className="w-8 h-8 text-cyan-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณอัตราการใช้กำลังการผลิต (Capacity Utilization Rate)</h1>
          <p className="text-gray-500">ประเมินประสิทธิภาพการใช้ทรัพยากรของโรงงานหรือธุรกิจบริการ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-800 mb-2">ปริมาณการผลิตจริง (Actual Output)</label>
            <input
              type="number"
              value={actualOutput}
              onChange={(e) => setActualOutput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
              placeholder="เช่น 8000"
            />
            <p className="text-xs text-gray-500 mt-2">จำนวนชิ้นที่ผลิตได้จริง หรือจำนวนลูกค้าที่ให้บริการจริง ในช่วงเวลาหนึ่ง</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-800 mb-2">กำลังการผลิตสูงสุด (Potential Maximum Output)</label>
            <input
              type="number"
              value={maxOutput}
              onChange={(e) => setMaxOutput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
              placeholder="เช่น 10000"
            />
            <p className="text-xs text-gray-500 mt-2">ขีดความสามารถสูงสุดของเครื่องจักร/พนักงาน หากทำงาน 100% โดยไม่มีการหยุดพัก</p>
          </div>
        </div>

        <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-cyan-900 mb-4">อัตราการใช้กำลังการผลิต</h2>
          
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={utilizationRate > 85 ? '#ef4444' : utilizationRate >= 70 ? '#10b981' : '#f59e0b'}
                strokeWidth="10"
              strokeDasharray={`${Math.min(utilizationRate, 100) * 2.827} 282.7`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{utilizationRate.toFixed(1)}%</span>
            </div>
          </div>

          {max > 0 && (
            <div className="mt-2 p-3 bg-white rounded shadow-sm flex items-start text-left max-w-sm">
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 mr-2 ${statusColor}`} />
              <p className={`text-sm ${statusColor}`}>{statusMessage}</p>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      <article className="prose prose-cyan max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">อัตราการใช้กำลังการผลิต (Capacity Utilization Rate) คืออะไร และมีความสำคัญอย่างไร</h2>
        
        <p>
          ไม่ว่าคุณจะมีโรงงานผลิตสินค้า มีโรงแรม หรือมีร้านอาหาร คุณย่อมมีการลงทุนใน <strong>"กำลังการผลิต (Capacity)"</strong> ไปแล้ว เช่น ซื้อเครื่องจักร ซื้อเตาอบ เช่าห้องพัก หรือจัดเตรียมโต๊ะอาหาร 
          คำถามคือ คุณกำลังใช้ประโยชน์จากการลงทุนเหล่านั้นได้อย่างคุ้มค่าเต็มที่แล้วหรือยัง? ตัวชี้วัดที่จะตอบคำถามนี้คือ <strong>Capacity Utilization Rate</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามของ Capacity Utilization Rate</h3>
        <p>
          อัตราการใช้กำลังการผลิต คือ สัดส่วนร้อยละ (%) ของผลผลิตจริงที่ทำได้ (Actual Output) เปรียบเทียบกับขีดความสามารถสูงสุดที่เป็นไปได้ (Potential Maximum Output) ในช่วงเวลาเดียวกัน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ</h3>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center">
          อัตราการใช้กำลังการผลิต = (ปริมาณการผลิตจริง / กำลังการผลิตสูงสุด) × 100
        </div>
        <p>
          <strong>ตัวอย่าง:</strong> โรงงานผลิตน้ำดื่มมีเครื่องจักรที่สามารถผลิตน้ำได้สูงสุดวันละ 10,000 ขวด (นี่คือกำลังการผลิตสูงสุด) 
          แต่วันนี้มีออเดอร์และเดินเครื่องผลิตจริงได้เพียง 7,500 ขวด<br/>
          อัตราการใช้กำลังการผลิต = (7,500 / 10,000) × 100 = <strong>75%</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เป้าหมายคือ 100% ใช่หรือไม่?</h3>
        <p>
          หลายคนอาจคิดว่าตัวเลข 100% คือสิ่งที่ดีที่สุด แต่ในโลกความเป็นจริง <strong>การดันเครื่องจักรหรือพนักงานให้ทำงาน 100% ตลอดเวลาเป็นเรื่องอันตราย</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ต่ำกว่า 70%:</strong> ถือว่าประสิทธิภาพต่ำ คุณมีต้นทุนคงที่ (ค่าเสื่อม ค่าสถานที่) ที่กำลังสูญเปล่า ควรเร่งหาลูกค้าเพิ่ม หรือรับจ้างผลิต (OEM) เพื่อดึงอัตรานี้ให้สูงขึ้น</li>
          <li><strong>ระหว่าง 75% ถึง 85%:</strong> เป็นช่วงเวลาที่ <em>ดีที่สุด (Optimal)</em> เรียกว่า "จุดน่าสบาย" (Sweet Spot) เพราะคุณใช้งานทรัพยากรได้คุ้มค่า และยังมีเวลาว่างเหลือพอสำหรับการหยุดซ่อมบำรุงเครื่องจักร หรือรองรับออเดอร์แทรกฉุกเฉินได้</li>
          <li><strong>เข้าใกล้ 100%:</strong> อาจดูเหมือนได้กำไรเยอะ แต่ในระยะยาวเครื่องจักรจะพังเร็ว พนักงานจะหมดไฟ (Burnout) และหากมีเครื่องจักรเสียเพียงตัวเดียว สายพานการผลิตทั้งหมดจะหยุดชะงักทันที นี่คือสัญญาณเตือนว่าคุณถึงเวลาต้อง <em>ขยายโรงงานหรือซื้อเครื่องจักรเพิ่ม</em> แล้ว</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้กับธุรกิจบริการ</h3>
        <p>
          นอกจากโรงงานผลิตแล้ว ธุรกิจบริการก็ใช้ดัชนีนี้ได้ดีมาก เช่น:
          <br/>- <strong>โรงแรม:</strong> อัตราการเข้าพัก (Occupancy Rate) ก็คือรูปแบบหนึ่งของ Capacity Utilization (ห้องที่ขายได้ / ห้องทั้งหมด)
          <br/>- <strong>ร้านอาหาร:</strong> อัตราการหมุนเวียนโต๊ะ (Table Turnover Rate)
          <br/>- <strong>สายการบิน:</strong> อัตราส่วนการบรรทุกผู้โดยสาร (Load Factor)
        </p>
        <p>
          การติดตามตัวเลขนี้อย่างใกล้ชิด จะช่วยให้ผู้บริหารรู้ว่าเมื่อใดควรจัดโปรโมชั่นลดราคาเพื่อเติมเต็มความจุที่ว่างอยู่ และเมื่อใดควรลงทุนขยายกิจการ
        </p>
      </article>
    </div>
  );
}
