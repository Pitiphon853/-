import React, { useState } from 'react';
import { Calculator, Scaling } from 'lucide-react';

export default function VectorMagnitudeCalculator({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [dimension, setDimension] = useState<2 | 3>(3);
  const [v, setV] = useState({ x: '', y: '', z: '' });

  const calculate = () => {
    const x = parseFloat(v.x) || 0;
    const y = parseFloat(v.y) || 0;
    const z = dimension === 3 ? (parseFloat(v.z) || 0) : 0;
    
    const x2 = x * x;
    const y2 = y * y;
    const z2 = dimension === 3 ? z * z : 0;
    
    const sum = x2 + y2 + z2;
    const magnitude = Math.sqrt(sum);

    return {
      x, y, z, x2, y2, z2, sum, magnitude
    };
  };

  const data = calculate();

  const handleInputChange = (axis: 'x' | 'y' | 'z', value: string) => {
    setV(prev => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Scaling size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {isTH ? 'คำนวณขนาดของเวกเตอร์ (Vector Magnitude)' : 'Vector Magnitude Calculator'}
          </h2>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setDimension(2)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dimension === 2 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isTH ? 'เวกเตอร์ 2 มิติ (2D)' : '2D Vector'}
          </button>
          <button
            onClick={() => setDimension(3)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dimension === 3 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isTH ? 'เวกเตอร์ 3 มิติ (3D)' : '3D Vector'}
          </button>
        </div>

        <div className="max-w-md mb-8 space-y-4">
          <h3 className="font-semibold text-gray-700">
            {isTH ? 'กำหนดค่าเวกเตอร์ (Vector v)' : 'Input Vector v'}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 text-center font-mono font-bold text-gray-500">X</span>
              <input
                type="number"
                value={v.x}
                onChange={(e) => handleInputChange('x', e.target.value)}
                placeholder="0"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-center font-mono font-bold text-gray-500">Y</span>
              <input
                type="number"
                value={v.y}
                onChange={(e) => handleInputChange('y', e.target.value)}
                placeholder="0"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
            {dimension === 3 && (
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Z</span>
                <input
                  type="number"
                  value={v.z}
                  onChange={(e) => handleInputChange('z', e.target.value)}
                  placeholder="0"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isTH ? 'ขนาดความยาว (Magnitude / Length)' : 'Magnitude / Length'}
          </h3>
          <div className="text-4xl font-bold text-green-600 mb-4 break-all">
            |v| = {Number.isInteger(data.magnitude) ? data.magnitude : data.magnitude.toFixed(4)}
          </div>
          
          <div className="space-y-3 text-gray-600 font-mono bg-white p-4 rounded-lg border border-gray-100 text-sm md:text-base">
            <p>v = [{data.x}, {data.y}{dimension === 3 ? `, ${data.z}` : ''}]</p>
            <p className="border-t border-gray-100 pt-2">
              |v| = √({data.x}² + {data.y}²{dimension === 3 ? ` + ${data.z}²` : ''})
            </p>
            <p>
              |v| = √({data.x2} + {data.y2}{dimension === 3 ? ` + ${data.z2}` : ''})
            </p>
            <p>
              |v| = √({data.sum})
            </p>
            <p className="font-bold text-gray-800">
              |v| ≈ {data.magnitude}
            </p>
          </div>
        </div>
      </div>

      <article className="prose prose-green max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การคำนวณหาขนาดความยาวของเวกเตอร์ (Vector Magnitude)
        </h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          เมื่อกล่าวถึง "เวกเตอร์ (Vector)" ในทางคณิตศาสตร์หรือฟิสิกส์ เรากำลังพูดถึงปริมาณที่มีทั้ง <strong>ขนาด (Magnitude)</strong> และ <strong>ทิศทาง (Direction)</strong> ต่างจากปริมาณสเกลาร์ (Scalar) ที่มีเฉพาะขนาดเท่านั้น เครื่องมือคำนวณหาขนาดเวกเตอร์นี้ถูกออกแบบมาเพื่อหาความยาวหรือขนาดที่แท้จริงของเวกเตอร์ ซึ่งเป็นการเปลี่ยนข้อมูลพิกัด (Coordinates) ให้กลับมาเป็นปริมาณสเกลาร์ที่เป็นบวกเสมอ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ขนาดของเวกเตอร์คืออะไร?</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ขนาดของเวกเตอร์ (มักจะใช้สัญลักษณ์ |v| หรือ ||v||) หมายถึงความยาวของเส้นตรงที่ลากจากจุดเริ่มต้น (Origin) ไปยังจุดปลายของเวกเตอร์นั้นๆ ในอวกาศ ซึ่งอาจเป็นระบบพิกัด 2 มิติ หรือ 3 มิติ แนวคิดในการหาความยาวนี้อ้างอิงมาจาก <strong>ทฤษฎีบทพีทาโกรัส (Pythagorean Theorem)</strong> โดยตรง ซึ่งเป็นการหาระยะทางในระบบยูคลิด (Euclidean Distance หรือ Euclidean Norm)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการคำนวณ (Formula)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          การคำนวณหาขนาดเวกเตอร์มีสูตรที่เรียบง่ายแต่ทรงพลัง โดยขึ้นอยู่กับจำนวนมิติที่กำลังทำงานอยู่:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left font-mono text-sm md:text-base text-gray-800 overflow-x-auto space-y-3">
          <p><strong>ในระบบ 2 มิติ (2D):</strong> หาก v = [x, y]<br/>|v| = √(x² + y²)</p>
          <p><strong>ในระบบ 3 มิติ (3D):</strong> หาก v = [x, y, z]<br/>|v| = √(x² + y² + z²)</p>
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          อย่างที่คุณเห็น สูตรนี้เป็นการนำองค์ประกอบ (Components) ในแต่ละแกนมายกกำลังสอง นำมาบวกกันทั้งหมด แล้วจึงถอดรากที่สอง (Square Root) ผลลัพธ์ที่ได้จะเป็นจำนวนจริงบวกหรือศูนย์เสมอ ขนาดของเวกเตอร์จะเป็นศูนย์ (0) ก็ต่อเมื่อเวกเตอร์นั้นคือเวกเตอร์ศูนย์ (Zero Vector) ซึ่งไม่มีความยาวและทิศทางที่ชัดเจน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">เวกเตอร์หนึ่งหน่วย (Unit Vector)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          การรู้ขนาดของเวกเตอร์นำไปสู่แนวคิดที่สำคัญอีกอย่างหนึ่งคือ <strong>เวกเตอร์หนึ่งหน่วย (Unit Vector)</strong> เวกเตอร์หนึ่งหน่วยคือเวกเตอร์ใดๆ ก็ตามที่มีขนาดหรือความยาวเท่ากับ 1 พอดี มักใช้เพื่อระบุทิศทางเพียงอย่างเดียว โดยเราสามารถแปลงเวกเตอร์ใดๆ ให้กลายเป็นเวกเตอร์หนึ่งหน่วยได้ (เรียกว่ากระบวนการ Normalization) โดยการนำเวกเตอร์นั้นมาหารด้วยขนาดของตัวมันเอง สูตรคือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-gray-800">
          û = v / |v|
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          การทำให้เวกเตอร์เป็น Normalization เป็นสิ่งที่ใช้บ่อยมากๆ ในการเขียนโปรแกรมกราฟิก (Computer Graphics) เพื่อจัดการแสงเงา ตลอดจนวิชาฟิสิกส์เมื่อเราสนใจเพียงทิศทางของแรงโดยไม่สนใจขนาด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุปและการนำไปประยุกต์ใช้</h3>
        <p className="text-gray-700 leading-relaxed">
          การหาขนาดของเวกเตอร์คือทักษะขั้นพื้นฐานที่จำเป็นอย่างยิ่ง ไม่ว่าคุณกำลังจะหาความเร็วรวมของวัตถุ (Speed จาก Velocity Vector) หาแรงลัพธ์ (Net Force) ในระบบวิศวกรรม หรือหาระยะห่างระหว่างสองจุดในเรขาคณิตวิเคราะห์ เครื่องมือนี้จะช่วยลดข้อผิดพลาดในการคำนวณที่มักเกิดจากการถอดรากที่สองและการยกกำลัง ให้ผลลัพธ์ที่แม่นยำและแสดงวิธีทำเป็นขั้นตอนอย่างชัดเจน
        </p>
      </article>
    </div>
  );
}
