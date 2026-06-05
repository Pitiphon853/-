import React, { useState } from 'react';
import { Calculator, MoveRight } from 'lucide-react';

export default function CrossProductCalculator({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [v1, setV1] = useState({ x: '', y: '', z: '' });
  const [v2, setV2] = useState({ x: '', y: '', z: '' });

  const calculate = () => {
    const x1 = parseFloat(v1.x) || 0;
    const y1 = parseFloat(v1.y) || 0;
    const z1 = parseFloat(v1.z) || 0;
    
    const x2 = parseFloat(v2.x) || 0;
    const y2 = parseFloat(v2.y) || 0;
    const z2 = parseFloat(v2.z) || 0;

    const cx = (y1 * z2) - (z1 * y2);
    const cy = (z1 * x2) - (x1 * z2);
    const cz = (x1 * y2) - (y1 * x2);
    
    return {
      x1, y1, z1, x2, y2, z2, cx, cy, cz
    };
  };

  const data = calculate();

  const handleInputChange = (vec: 1 | 2, axis: 'x' | 'y' | 'z', value: string) => {
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
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Calculator size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {isTH ? 'คำนวณผลคูณเชิงเวกเตอร์แบบครอส (Cross Product)' : 'Cross Product Calculator'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Vector A */}
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
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Y₁</span>
                <input
                  type="number"
                  value={v1.y}
                  onChange={(e) => handleInputChange(1, 'y', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Z₁</span>
                <input
                  type="number"
                  value={v1.z}
                  onChange={(e) => handleInputChange(1, 'z', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Vector B */}
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
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Y₂</span>
                <input
                  type="number"
                  value={v2.y}
                  onChange={(e) => handleInputChange(2, 'y', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-mono font-bold text-gray-500">Z₂</span>
                <input
                  type="number"
                  value={v2.z}
                  onChange={(e) => handleInputChange(2, 'z', e.target.value)}
                  placeholder="0"
                  className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isTH ? 'ผลลัพธ์เวกเตอร์ (Result Vector)' : 'Result Vector'}
          </h3>
          <div className="text-3xl font-bold text-indigo-600 mb-4 break-all">
            A × B = [{data.cx}, {data.cy}, {data.cz}]
          </div>
          
          <div className="space-y-4 text-gray-600 font-mono bg-white p-4 rounded-lg border border-gray-100 text-sm md:text-base">
            <div>
              <p className="font-semibold text-gray-800 mb-1">การคำนวณแกน X (i):</p>
              <p>C<sub>x</sub> = (Y₁ × Z₂) - (Z₁ × Y₂)</p>
              <p>C<sub>x</sub> = ({data.y1} × {data.z2}) - ({data.z1} × {data.y2}) = {data.cx}</p>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <p className="font-semibold text-gray-800 mb-1">การคำนวณแกน Y (j):</p>
              <p>C<sub>y</sub> = (Z₁ × X₂) - (X₁ × Z₂)</p>
              <p>C<sub>y</sub> = ({data.z1} × {data.x2}) - ({data.x1} × {data.z2}) = {data.cy}</p>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <p className="font-semibold text-gray-800 mb-1">การคำนวณแกน Z (k):</p>
              <p>C<sub>z</sub> = (X₁ × Y₂) - (Y₁ × X₂)</p>
              <p>C<sub>z</sub> = ({data.x1} × {data.y2}) - ({data.y1} × {data.x2}) = {data.cz}</p>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-indigo max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          การหาผลคูณเชิงเวกเตอร์แบบครอส (Cross Product) ในระบบ 3 มิติ
        </h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในวิชาคณิตศาสตร์และฟิสิกส์ <strong>การหาผลคูณเชิงเวกเตอร์แบบครอส (Cross Product)</strong> หรือที่เรียกว่าผลคูณเชิงเวกเตอร์ (Vector Product) เป็นหนึ่งในการดำเนินการกับเวกเตอร์ 3 มิติที่สำคัญที่สุด แตกต่างจาก Dot Product ที่ให้ผลลัพธ์เป็นค่าสเกลาร์ตัวเลขเดี่ยวๆ ผลลัพธ์ของ Cross Product จะเป็น <strong>เวกเตอร์ใหม่</strong> ที่มีทิศทางตั้งฉากกับเวกเตอร์ตั้งต้นทั้งสองตัว เครื่องมือของเราช่วยให้การคำนวณนี้เป็นไปอย่างรวดเร็วและถูกต้องแม่นยำ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">นิยามและสูตรการคำนวณ Cross Product</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          หากเรามีเวกเตอร์ A = [A<sub>x</sub>, A<sub>y</sub>, A<sub>z</sub>] และเวกเตอร์ B = [B<sub>x</sub>, B<sub>y</sub>, B<sub>z</sub>] การคำนวณ Cross Product หรือ A × B จะได้ผลลัพธ์เป็นเวกเตอร์ C = [C<sub>x</sub>, C<sub>y</sub>, C<sub>z</sub>] ซึ่งคำนวณได้จากเมทริกซ์ดีเทอร์มิแนนต์ (Determinant) ตามสูตรดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left font-mono text-sm md:text-base text-gray-800 overflow-x-auto">
          C<sub>x</sub> = (A<sub>y</sub> × B<sub>z</sub>) - (A<sub>z</sub> × B<sub>y</sub>)<br/>
          C<sub>y</sub> = (A<sub>z</sub> × B<sub>x</sub>) - (A<sub>x</sub> × B<sub>z</sub>)<br/>
          C<sub>z</sub> = (A<sub>x</sub> × B<sub>y</sub>) - (A<sub>y</sub> × B<sub>x</sub>)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          ผลลัพธ์ที่ได้คือเวกเตอร์ที่ตั้งฉากกับระนาบที่สร้างโดยเวกเตอร์ A และ B เสมอ ซึ่งทิศทางของเวกเตอร์ C นี้สามารถหาได้โดยใช้ <strong>กฎมือขวา (Right-hand Rule)</strong> โดยให้ปลายนิ้วทั้งสี่ชี้ไปตามทิศทางของเวกเตอร์ตัวแรก (A) แล้วกำมือไปหาเวกเตอร์ตัวที่สอง (B) นิ้วหัวแม่มือจะชี้ไปในทิศทางของเวกเตอร์ผลลัพธ์ (C) ทันที
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความหมายทางเรขาคณิตและสูตรขนาด (Magnitude)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          หากพิจารณาถึงขนาด (Magnitude หรือ ความยาว) ของเวกเตอร์ผลลัพธ์ สามารถคำนวณได้จากสูตร:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-gray-800">
          |A × B| = |A| |B| sin(θ)
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          โดยที่ θ คือมุมระหว่างเวกเตอร์ A และ B ขนาดของ Cross Product |A × B| ยังมีความหมายทางเรขาคณิตที่สำคัญ คือมันมีค่าเท่ากับ <strong>พื้นที่ของสี่เหลี่ยมด้านขนาน (Area of a Parallelogram)</strong> ที่ถูกสร้างขึ้นจากเวกเตอร์ A และ B และหากหารด้วย 2 ก็จะได้พื้นที่ของสามเหลี่ยมที่ประกอบจากเวกเตอร์ทั้งสองนั่นเอง นอกจากนี้ หาก A × B = 0 หมายความว่าเวกเตอร์ทั้งสองนั้นขนานกัน (Parallel) เนื่องจาก sin(0°) หรือ sin(180°) มีค่าเท่ากับศูนย์
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ในฟิสิกส์และวิศวกรรม</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>โมเมนต์หรือทอร์ก (Torque):</strong> ในกลศาสตร์ ทอร์ก (τ) คำนวณจาก τ = r × F โดยที่ r คือเวกเตอร์ตำแหน่ง (Position Vector) จากจุดหมุนถึงจุดที่แรงกระทำ และ F คือเวกเตอร์แรง (Force Vector) Cross Product จะบอกทิศทางของแกนการหมุนและขนาดของโมเมนต์</li>
          <li><strong>แรงแม่เหล็ก (Magnetic Force):</strong> แรงที่กระทำต่อประจุไฟฟ้าที่เคลื่อนที่ในบริเวณที่มีสนามแม่เหล็ก หาได้จากสมการ F = q(v × B) ทิศทางของแรงจะตั้งฉากกับความเร็ว (v) และสนามแม่เหล็ก (B) เสมอ</li>
          <li><strong>การคำนวณเวกเตอร์ตั้งฉากพื้นผิว (Surface Normal):</strong> ในคอมพิวเตอร์กราฟิกส์ 3 มิติ (3D Graphics) มีการใช้ Cross Product ของขอบของสามเหลี่ยมเพื่อหาเวกเตอร์ตั้งฉาก (Normal Vector) ซึ่งจำเป็นสำหรับการคำนวณแสงและเงาให้สมจริง</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวัง</h3>
        <p className="text-gray-700 leading-relaxed">
          สิ่งสำคัญที่ต้องจำคือ Cross Product <strong>ไม่มีคุณสมบัติการสลับที่ (Not Commutative)</strong> นั่นคือ A × B ≠ B × A แต่อันที่จริงแล้ว A × B = -(B × A) การสลับลำดับเวกเตอร์จะทำให้ทิศทางของเวกเตอร์ผลลัพธ์กลับทิศทางตรงกันข้ามทันที ดังนั้นผู้ใช้ควรระมัดระวังในการป้อนค่าเวกเตอร์ A และ B ให้ตรงตามลำดับที่ต้องการเพื่อความถูกต้องของผลลัพธ์ เครื่องมือนี้จึงถูกออกแบบมาเพื่อให้การคำนวณที่มีความซับซ้อนนี้ถูกต้องและตรวจสอบได้ในทุกขั้นตอน
        </p>
      </article>
    </div>
  );
}
