import React, { useState } from 'react';
import { Compass } from 'lucide-react';

export default function CartesianToPolar({ lang }: any) {
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');
  const [r, setR] = useState<number | null>(null);
  const [thetaDeg, setThetaDeg] = useState<number | null>(null);
  const [thetaRad, setThetaRad] = useState<number | null>(null);

  const calculate = () => {
    const xVal = parseFloat(x);
    const yVal = parseFloat(y);
    if (!isNaN(xVal) && !isNaN(yVal)) {
      const radius = Math.sqrt(xVal * xVal + yVal * yVal);
      const angleRad = Math.atan2(yVal, xVal);
      let angleDeg = angleRad * (180 / Math.PI);
      if (angleDeg < 0) {
        angleDeg += 360; // Standardize to 0-360
      }
      let positiveAngleRad = angleRad;
      if (positiveAngleRad < 0) {
        positiveAngleRad += 2 * Math.PI;
      }
      setR(radius);
      setThetaRad(positiveAngleRad);
      setThetaDeg(angleDeg);
    } else {
      setR(null);
      setThetaDeg(null);
      setThetaRad(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <Compass className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณแปลงพิกัดฉากเป็นพิกัดเชิงขั้ว</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">พิกัดฉาก (Cartesian Coordinates)</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่า X</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="เช่น 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ค่า Y</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="เช่น 4"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            คำนวณ
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">พิกัดเชิงขั้ว (Polar Coordinates)</h2>
          <div className="bg-blue-50 p-6 rounded-lg space-y-4 border border-blue-100 h-full">
            {r !== null ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">รัศมี (r)</p>
                  <p className="text-2xl font-bold text-blue-700">{r.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">มุม (θ) องศา</p>
                  <p className="text-2xl font-bold text-blue-700">{thetaDeg?.toFixed(4)}°</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">มุม (θ) เรเดียน</p>
                  <p className="text-xl font-bold text-blue-600">{thetaRad?.toFixed(4)} rad</p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic">
                กรุณากรอกค่า X และ Y เพื่อดูผลลัพธ์
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การแปลงพิกัดฉากเป็นพิกัดเชิงขั้ว 2 มิติ (Cartesian to Polar)</h2>
        <p>
          ระบบพิกัดฉาก (Cartesian Coordinate System) และระบบพิกัดเชิงขั้ว (Polar Coordinate System) เป็นวิธีการสองแบบที่ใช้ในการระบุตำแหน่งของจุดบนระนาบ 2 มิติ ในการประยุกต์ใช้งานจริงทางคณิตศาสตร์ ฟิสิกส์ และวิศวกรรมศาสตร์ เรามักจะต้องแปลงข้อมูลระหว่างสองระบบพิกัดนี้อยู่เสมอ
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความแตกต่างระหว่างสองระบบพิกัด</h3>
        <p>
          <strong>1. ระบบพิกัดฉาก (x, y):</strong> ระบุตำแหน่งโดยใช้ระยะทางตามแนวแกน X (แนวนอน) และแกน Y (แนวตั้ง) ที่ตัดกันเป็นมุมฉาก เป็นระบบที่เราคุ้นเคยกันดีที่สุด<br/>
          <strong>2. ระบบพิกัดเชิงขั้ว (r, θ):</strong> ระบุตำแหน่งโดยใช้ระยะห่างจากจุดกำเนิด (r) และมุมที่วัดจากแกนอ้างอิงหรือแกน X ในทิศทางทวนเข็มนาฬิกา (θ)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการแปลงพิกัดฉากเป็นพิกัดเชิงขั้ว</h3>
        <p>
          หากเราทราบพิกัด (x, y) ในระบบพิกัดฉาก เราสามารถหาค่ารัศมี (r) และมุม (θ) ในระบบพิกัดเชิงขั้วได้โดยใช้หลักการของตรีโกณมิติและทฤษฎีบทพีทาโกรัส ดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>การหารัศมี (r):</strong> ใช้ทฤษฎีบทพีทาโกรัส <br/> <code>r = √(x² + y²)</code></li>
          <li><strong>การหามุม (θ):</strong> ใช้ฟังก์ชันอาร์กแทนเจนต์ (arctan หรือ tan⁻¹) <br/> <code>θ = arctan(y/x)</code></li>
        </ul>
        
        <p>
          ในการคำนวณหามุม θ นั้น สิ่งสำคัญที่ต้องระวังคือ <strong>ตำแหน่งของจตุภาค (Quadrant)</strong> ที่จุด (x,y) นั้นตกอยู่ เนื่องจากฟังก์ชัน arctan ทั่วไป (หรือ tan⁻¹) จะให้ค่ามุมในช่วง -90° ถึง 90° (หรือ -π/2 ถึง π/2 เรเดียน) เท่านั้น ทำให้ในทางปฏิบัติเรามักจะใช้ฟังก์ชัน <code>atan2(y, x)</code> ซึ่งสามารถพิจารณาเครื่องหมายของทั้ง x และ y เพื่อระบุมุมที่ถูกต้องในทั้งสี่จตุภาค (ตั้งแต่ 0° ถึง 360° หรือ 0 ถึง 2π เรเดียน) ได้อย่างแม่นยำ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตัวอย่างการคำนวณ</h3>
        <p>
          สมมติว่าเรามีจุดในพิกัดฉากคือ (3, 4) ต้องการแปลงเป็นพิกัดเชิงขั้ว:<br/>
          1. <strong>หารัศมี r:</strong> <code>r = √(3² + 4²) = √(9 + 16) = √25 = 5</code><br/>
          2. <strong>หามุม θ:</strong> <code>θ = arctan(4/3) ≈ 53.13 องศา</code><br/>
          ดังนั้น พิกัดเชิงขั้วของจุด (3, 4) คือ (5, 53.13°) หรือถ้าคิดเป็นเรเดียนจะอยู่ที่ประมาณ 0.927 เรเดียน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้งาน</h3>
        <p>
          การแปลงพิกัดทั้งสองระบบนี้มีความสำคัญอย่างมากในหลายสายงาน เช่น 
          <strong>การควบคุมทิศทางหุ่นยนต์</strong> หรือเรดาร์ ที่มักจะระบุตำแหน่งวัตถุเป็นระยะทางและทิศทาง (พิกัดเชิงขั้ว) แต่เมื่อต้องการแสดงผลบนหน้าจอหรือพล็อตจุดลงบนแผนที่แบบตารางจะใช้พิกัดฉาก 
          ในทาง<strong>ฟิสิกส์</strong> การวิเคราะห์การเคลื่อนที่แบบวงกลม ฟลูอิดไดนามิกส์ หรือสนามแม่เหล็กไฟฟ้า การใช้พิกัดเชิงขั้วจะทำให้สมการที่เกี่ยวข้องง่ายขึ้นอย่างมากเมื่อเทียบกับการใช้พิกัดฉาก
        </p>
        <p>
          เครื่องมือแปลงพิกัดฉากเป็นพิกัดเชิงขั้วนี้ออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา วิศวกร และผู้ที่สนใจ สามารถแปลงค่าระหว่างสองระบบได้อย่างรวดเร็ว ถูกต้อง และไม่จำเป็นต้องเสียเวลาคำนวณด้วยตนเอง หรือกังวลเกี่ยวกับปัญหาการหาค่ามุม θ ในจตุภาคต่างๆ
        </p>
      </article>
    </div>
  );
}
