import React, { useState } from 'react';
import { Calculator, Info, MoveRight, HelpCircle } from 'lucide-react';

export default function DotProductCalculator({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [dimension, setDimension] = useState<2 | 3>(3);
  const [v1, setV1] = useState({ x: '', y: '', z: '' });
  const [v2, setV2] = useState({ x: '', y: '', z: '' });

  const calculate = () => {
    const x1 = parseFloat(v1.x) || 0;
    const y1 = parseFloat(v1.y) || 0;
    const z1 = dimension === 3 ? (parseFloat(v1.z) || 0) : 0;
    
    const x2 = parseFloat(v2.x) || 0;
    const y2 = parseFloat(v2.y) || 0;
    const z2 = dimension === 3 ? (parseFloat(v2.z) || 0) : 0;

    const result = (x1 * x2) + (y1 * y2) + (z1 * z2);
    
    return {
      x1, y1, z1, x2, y2, z2, result
    };
  };

  const data = calculate();

  const handleInputChange = (vec: 1 | 2, axis: 'x' | 'y' | 'z', value: string) => {
    // allow numbers, minus, dot
    if (vec === 1) {
      setV1(prev => ({ ...prev, [axis]: value }));
    } else {
      setV2(prev => ({ ...prev, [axis]: value }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calculator size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {isTH ? 'คำนวณผลคูณเชิงเวกเตอร์แบบดอท (Dot Product)' : 'Dot Product Calculator'}
          </h2>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setDimension(2)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dimension === 2 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isTH ? 'เวกเตอร์ 2 มิติ (2D)' : '2D Vector'}
          </button>
          <button
            onClick={() => setDimension(3)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dimension === 3 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isTH ? 'เวกเตอร์ 3 มิติ (3D)' : '3D Vector'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Vector 1 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              Vector A <MoveRight className="text-gray-400" size={16} />
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">X₁</span>
                <input
                  type="number"
                  value={v1.x}
                  onChange={(e) => handleInputChange(1, 'x', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Y₁</span>
                <input
                  type="number"
                  value={v1.y}
                  onChange={(e) => handleInputChange(1, 'y', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              {dimension === 3 && (
                <div className="flex items-center gap-3">
                  <span className="w-8 text-center font-mono font-bold text-gray-500">Z₁</span>
                  <input
                    type="number"
                    value={v1.z}
                    onChange={(e) => handleInputChange(1, 'z', e.target.value)}
                    placeholder="0"
                    className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Vector 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              Vector B <MoveRight className="text-gray-400" size={16} />
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">X₂</span>
                <input
                  type="number"
                  value={v2.x}
                  onChange={(e) => handleInputChange(2, 'x', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Y₂</span>
                <input
                  type="number"
                  value={v2.y}
                  onChange={(e) => handleInputChange(2, 'y', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              {dimension === 3 && (
                <div className="flex items-center gap-3">
                  <span className="w-8 text-center font-mono font-bold text-gray-500">Z₂</span>
                  <input
                    type="number"
                    value={v2.z}
                    onChange={(e) => handleInputChange(2, 'z', e.target.value)}
                    placeholder="0"
                    className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isTH ? 'ผลลัพธ์การคำนวณ (Result)' : 'Result'}
          </h3>
          <div className="text-4xl font-bold text-blue-600 mb-4">
            A · B = {data.result}
          </div>
          
          <div className="space-y-2 text-gray-600 font-mono bg-white p-4 rounded-lg border border-gray-100">
            <p>A = [{data.x1}, {data.y1}{dimension === 3 ? `, ${data.z1}` : ''}]</p>
            <p>B = [{data.x2}, {data.y2}{dimension === 3 ? `, ${data.z2}` : ''}]</p>
            <p className="mt-2 pt-2 border-t border-gray-100">
              A · B = ({data.x1} × {data.x2}) + ({data.y1} × {data.y2})
              {dimension === 3 ? ` + (${data.z1} × ${data.z2})` : ''}
            </p>
            <p>
              A · B = {data.x1 * data.x2} + {data.y1 * data.y2}
              {dimension === 3 ? ` + ${data.z1 * data.z2}` : ''}
            </p>
            <p className="font-bold text-gray-800">A · B = {data.result}</p>
          </div>
        </div>
      </div>

      <article className="prose prose-blue max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การหาผลคูณเชิงเวกเตอร์แบบดอท (Dot Product) คืออะไร? สาระน่ารู้ทางคณิตศาสตร์
        </h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในทางคณิตศาสตร์และฟิสิกส์ การดำเนินการกับเวกเตอร์เป็นสิ่งที่มีความสำคัญเป็นอย่างยิ่ง หนึ่งในการดำเนินการที่ถูกใช้บ่อยที่สุดคือ <strong>การหาผลคูณเชิงเวกเตอร์แบบดอท (Dot Product)</strong> หรือที่บางครั้งเรียกว่าผลคูณเชิงสเกลาร์ (Scalar Product) เครื่องมือคำนวณของเราออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา และวิศวกร สามารถหาค่า Dot Product ระหว่างเวกเตอร์สองตัวได้อย่างรวดเร็วและแม่นยำ ไม่ว่าจะเป็นเวกเตอร์ในระบบ 2 มิติ หรือ 3 มิติก็ตาม
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความหมายและสูตรการคำนวณ Dot Product</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Dot Product เป็นการนำเวกเตอร์สองตัวมาคูณกันเพื่อให้ได้ผลลัพธ์เป็น <strong>ปริมาณสเกลาร์ (Scalar)</strong> ซึ่งหมายถึงปริมาณที่มีเพียงแค่ขนาด (Magnitude) แต่ไม่มีทิศทาง (Direction) แตกต่างจาก Cross Product ที่ผลลัพธ์จะออกมาเป็นเวกเตอร์
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          สูตรการคำนวณทางพีชคณิตพื้นฐานสำหรับการหา Dot Product ระหว่างเวกเตอร์ A และเวกเตอร์ B ในระบบพิกัดฉาก 3 มิติ (3D) มีดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-gray-800">
          A · B = (A<sub>x</sub> × B<sub>x</sub>) + (A<sub>y</sub> × B<sub>y</sub>) + (A<sub>z</sub> × B<sub>z</sub>)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          หากเวกเตอร์อยู่ในระบบ 2 มิติ (2D) เราก็เพียงแค่ตัดตัวแปรในแกน z ออกไป สูตรจะกลายเป็น A · B = (A<sub>x</sub> × B<sub>x</sub>) + (A<sub>y</sub> × B<sub>y</sub>) นั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามทางเรขาคณิต (Geometric Definition)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          นอกจากการคำนวณโดยใช้ส่วนประกอบของเวกเตอร์ (Components) แล้ว Dot Product ยังมีความหมายทางเรขาคณิตที่ลึกซึ้ง ซึ่งมีความสัมพันธ์กับขนาดของเวกเตอร์ทั้งสองและมุมที่กระทำต่อกัน สูตรทางเรขาคณิตคือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-gray-800">
          A · B = |A| |B| cos(θ)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          โดยที่ |A| และ |B| คือขนาด (Magnitude หรือ Length) ของเวกเตอร์ A และ B ตามลำดับ ส่วน θ คือมุมระหว่างเวกเตอร์ทั้งสอง นิยามนี้นำไปสู่คุณสมบัติที่สำคัญมากอย่างหนึ่ง นั่นคือ หากเรานำเวกเตอร์สองตัวมาดอทกันแล้วได้ผลลัพธ์เป็นศูนย์ (0) ในขณะที่เวกเตอร์ทั้งสองไม่ใช่เวกเตอร์ศูนย์ เราสามารถสรุปได้ทันทีว่า <strong>เวกเตอร์ทั้งสองนั้นตั้งฉากกัน (Orthogonal)</strong> เนื่องจาก cos(90°) = 0
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ในชีวิตจริงและสาขาวิชาต่างๆ</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>ฟิสิกส์และกลศาสตร์:</strong> งาน (Work) ในทางฟิสิกส์ถูกคำนวณจากผลคูณเชิงสเกลาร์ของแรง (Force) และการกระจัด (Displacement) โดย W = F · d ซึ่งบอกให้เรารู้ว่าแรงที่กระทำในทิศทางเดียวกับการเคลื่อนที่จะก่อให้เกิดงานอย่างเต็มที่</li>
          <li><strong>คอมพิวเตอร์กราฟิก (Computer Graphics):</strong> Dot Product ถูกใช้เพื่อคำนวณแสงตกกระทบ (Lighting Calculation) โดยใช้มุมระหว่างเวกเตอร์ทิศทางของแสงและเวกเตอร์ตั้งฉากกับพื้นผิว (Normal Vector) เพื่อดูว่าพื้นผิวนั้นควรจะสว่างแค่ไหน รวมถึงการตรวจจับการมองเห็น (Visibility หรือ Backface culling)</li>
          <li><strong>ปัญญาประดิษฐ์และ Machine Learning:</strong> ในการเปรียบเทียบความคล้ายคลึงของข้อมูล (Cosine Similarity) เช่น ในระบบแนะนำสินค้า (Recommendation Systems) หรือการวิเคราะห์ข้อความ (Text Analysis) การคำนวณ Dot Product ของเวกเตอร์คุณลักษณะ (Feature Vectors) เป็นส่วนสำคัญของขั้นตอนเหล่านี้</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป</h3>
        <p className="text-gray-700 leading-relaxed">
          การหาผลคูณเชิงสเกลาร์หรือ Dot Product นั้นเป็นมากกว่าแค่การจับตัวเลขมาคูณแล้วบวกกัน แต่ยังเป็นเครื่องมือทรงพลังที่ซ่อนความหมายทางเรขาคณิต และถูกนำไปใช้อย่างแพร่หลายตั้งแต่วิชาฟิสิกส์พื้นฐานไปจนถึงอัลกอริทึมปัญญาประดิษฐ์ที่ซับซ้อน เครื่องมือคำนวณ Dot Product ของเรามุ่งหวังที่จะช่วยให้ผู้ใช้งานลดข้อผิดพลาดในการคำนวณ และสามารถนำเวลาไปมุ่งเน้นกับการตีความหมายและการประยุกต์ใช้ผลลัพธ์ได้อย่างเต็มที่
        </p>
      </article>
    </div>
  );
}
