import React, { useState } from 'react';
import { Hexagon } from 'lucide-react';

export default function PolygonDiagonals({ lang }: any) {
  const [sides, setSides] = useState<string>('');
  const [diagonals, setDiagonals] = useState<number | null>(null);

  const calculate = () => {
    const n = parseInt(sides, 10);
    if (!isNaN(n) && n >= 3) {
      // Formula: n(n-3)/2
      const result = (n * (n - 3)) / 2;
      setDiagonals(result);
    } else {
      setDiagonals(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <Hexagon className="w-8 h-8 text-fuchsia-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณหาจำนวนเส้นทแยงมุมของรูปหลายเหลี่ยม</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนด้านของรูปเหลี่ยม (N)</label>
            <input
              type="number"
              value={sides}
              onChange={(e) => setSides(e.target.value)}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="เช่น 3 (สามเหลี่ยม), 4 (สี่เหลี่ยม), 5 (ห้าเหลี่ยม)"
              min="3"
            />
            <p className="mt-2 text-xs text-gray-500">กรุณากรอกตัวเลขจำนวนเต็มตั้งแต่ 3 ขึ้นไป</p>
          </div>
          <button
            onClick={calculate}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            คำนวณเส้นทแยงมุม
          </button>
        </div>

        <div className="bg-fuchsia-50 p-6 rounded-xl border border-fuchsia-100 flex flex-col items-center justify-center min-h-[160px]">
          {diagonals !== null ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-fuchsia-600 font-medium">รูป {sides} เหลี่ยม มีเส้นทแยงมุมทั้งหมด</p>
              <div className="text-5xl font-bold text-fuchsia-800">
                {diagonals.toLocaleString()} <span className="text-xl font-normal text-fuchsia-600">เส้น</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 italic text-center">
              กรอกจำนวนด้านของรูปหลายเหลี่ยม (N ≥ 3)<br/>เพื่อดูจำนวนเส้นทแยงมุม
            </p>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">เส้นทแยงมุมของรูปหลายเหลี่ยม (Diagonals of a Polygon)</h2>
        <p>
          ในเรขาคณิต <strong>รูปหลายเหลี่ยม (Polygon)</strong> คือรูปปิดบนระนาบ 2 มิติที่ประกอบขึ้นจากส่วนของเส้นตรงที่เชื่อมต่อกันตั้งแต่ 3 เส้นขึ้นไป (เช่น รูปสามเหลี่ยม รูปสี่เหลี่ยม รูปห้าเหลี่ยม เป็นต้น)
        </p>
        <p>
          <strong>เส้นทแยงมุม (Diagonal)</strong> หมายถึงส่วนของเส้นตรงที่ลากเชื่อมระหว่างจุดยอด (Vertex) สองจุดของรูปหลายเหลี่ยม <strong>ที่ไม่ได้อยู่ติดกัน</strong> พูดง่ายๆ คือเป็นเส้นที่ลากข้ามภายในรูปเพื่อเชื่อมมุมสองมุมที่ไม่ใช่มุมประชิด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาจำนวนเส้นทแยงมุมของรูป N เหลี่ยม</h3>
        <p>
          หากเราต้องการหาจำนวนเส้นทแยงมุมทั้งหมดของรูปหลายเหลี่ยมใดๆ ที่มีจำนวนด้านเท่ากับ <strong>n</strong> ด้าน (หรือ n จุดยอด) เราสามารถใช้สูตรคณิตศาสตร์พื้นฐานได้ดังนี้:
        </p>
        <div className="bg-gray-100 p-4 rounded text-center text-lg my-4 font-bold text-fuchsia-900">
          จำนวนเส้นทแยงมุม = n(n - 3) / 2
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ที่มาและคำอธิบายของสูตร</h3>
        <p>
          หลายคนอาจสงสัยว่าทำไมต้องเป็น n(n-3)/2? เราสามารถทำความเข้าใจที่มาของสูตรนี้ได้ง่ายๆ ด้วยหลักการทางคณิตศาสตร์เชิงคอมบินาทอริกส์ (Combinatorics) ดังนี้:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>ลองจินตนาการว่าเรายืนอยู่ที่จุดยอดจุดหนึ่งจากทั้งหมด n จุด</li>
          <li>เราสามารถลากเส้นไปหาจุดยอดอื่นๆ ได้ทั้งหมดกี่จุด? คำตอบคือ ลากไปได้ <strong>n - 3</strong> จุด เพราะเราไม่สามารถลากเส้นทแยงมุมไปหาตัวมันเองได้ (1 จุด) และไม่สามารถลากไปหาจุดที่อยู่ติดกันซ้าย-ขวาได้ เพราะนั่นคือ "เส้นขอบด้าน" ของรูป (2 จุด) ดังนั้น 1 - 2 = 3 (จุดที่ลากไม่ได้)</li>
          <li>เมื่อแต่ละจุดยอดสามารถลากเส้นได้ (n - 3) เส้น และเรามีจุดยอดทั้งหมด n จุด จำนวนเส้นที่ลากได้ทั้งหมดน่าจะเป็น n × (n - 3)</li>
          <li>แต่เดี๋ยวก่อน! การลากเส้นจากจุด A ไปจุด B ถือว่าเป็นเส้นเดียวกันกับการลากจากจุด B กลับมาหาจุด A ดังนั้นเราจึงนับซ้ำไปสองเท่า เราจึงต้อง <strong>หารด้วย 2</strong> เสมอ เพื่อให้ได้จำนวนเส้นทแยงมุมที่แท้จริงไม่ซ้ำซ้อนกัน</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>รูปสามเหลี่ยม (n=3):</strong> 3(3-3)/2 = 3(0)/2 = <strong>0 เส้น</strong> (รูปสามเหลี่ยมไม่มีเส้นทแยงมุม)</li>
          <li><strong>รูปสี่เหลี่ยม (n=4):</strong> 4(4-3)/2 = 4(1)/2 = <strong>2 เส้น</strong> (รูปกากบาทตรงกลาง)</li>
          <li><strong>รูปห้าเหลี่ยม (n=5):</strong> 5(5-3)/2 = 5(2)/2 = <strong>5 เส้น</strong> (รูปดาวห้าแฉกภายใน)</li>
          <li><strong>รูปสิบเหลี่ยม (n=10):</strong> 10(10-3)/2 = 10(7)/2 = <strong>35 เส้น</strong></li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้งาน</h3>
        <p>
          สูตรจำนวนเส้นทแยงมุมนี้ แม้ดูเป็นเพียงทฤษฎีบททางเรขาคณิต แต่มีประโยชน์ในการแก้ปัญหาทางวิศวกรรมโยธาและสถาปัตยกรรมเมื่อต้องออกแบบโครงสร้างถัก (Truss) การวางเครือข่ายเน็ตเวิร์กคอมพิวเตอร์แบบ Mesh (ที่โหนดเชื่อมถึงกันหมดและต้องการหาจำนวนสายลอจิกคอลลิงก์) หรือโจทย์ปัญหาคณิตศาสตร์ระดับมัธยมศึกษาตอนต้น เครื่องมือออนไลน์นี้จึงออกแบบมาเพื่อตอบคำถามและตรวจสอบคำตอบให้ถูกต้องแม่นยำในเวลาอันรวดเร็ว
        </p>
      </article>
    </div>
  );
}
