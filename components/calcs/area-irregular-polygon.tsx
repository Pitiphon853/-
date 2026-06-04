import React, { useState } from 'react';
import { Shapes, Calculator, RefreshCw, Plus, Trash2, ArrowRight } from 'lucide-react';

type Triangle = {
  id: string;
  method: 'heron' | 'base-height';
  a: string;
  b: string;
  c: string;
  base: string;
  height: string;
  area: number | null;
  error: string;
};

export default function AreaIrregularPolygonCalculator({ lang = 'TH' }: any) {
  const [triangles, setTriangles] = useState<Triangle[]>([
    { id: '1', method: 'heron', a: '', b: '', c: '', base: '', height: '', area: null, error: '' }
  ]);
  const [totalArea, setTotalArea] = useState<number | null>(null);

  const addTriangle = () => {
    setTriangles([
      ...triangles,
      { id: Date.now().toString(), method: 'heron', a: '', b: '', c: '', base: '', height: '', area: null, error: '' }
    ]);
  };

  const removeTriangle = (id: string) => {
    if (triangles.length === 1) return;
    setTriangles(triangles.filter((t) => t.id !== id));
  };

  const updateTriangle = (id: string, field: keyof Triangle, value: string) => {
    setTriangles(triangles.map((t) => (t.id === id ? { ...t, [field]: value, error: '', area: null } : t)));
    setTotalArea(null);
  };

  const calculate = () => {
    let sum = 0;
    let hasError = false;

    const newTriangles = triangles.map((t) => {
      let area = null;
      let error = '';

      if (t.method === 'heron') {
        const a = parseFloat(t.a);
        const b = parseFloat(t.b);
        const c = parseFloat(t.c);

        if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
          error = lang === 'EN' ? 'Please enter valid side lengths.' : 'กรุณากรอกความยาวด้านให้ถูกต้อง';
          hasError = true;
        } else if (a + b <= c || a + c <= b || b + c <= a) {
          error = lang === 'EN' ? 'Invalid triangle (sum of any 2 sides must be greater than the 3rd).' : 'รูปสามเหลี่ยมเป็นไปไม่ได้ (ผลบวก 2 ด้านต้องมากกว่าด้านที่ 3)';
          hasError = true;
        } else {
          const s = (a + b + c) / 2;
          area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          sum += area;
        }
      } else {
        const base = parseFloat(t.base);
        const height = parseFloat(t.height);

        if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
          error = lang === 'EN' ? 'Please enter valid base and height.' : 'กรุณากรอกฐานและความสูงให้ถูกต้อง';
          hasError = true;
        } else {
          area = 0.5 * base * height;
          sum += area;
        }
      }

      return { ...t, area, error };
    });

    setTriangles(newTriangles);
    if (!hasError) {
      setTotalArea(sum);
    } else {
      setTotalArea(null);
    }
  };

  const reset = () => {
    setTriangles([{ id: Date.now().toString(), method: 'heron', a: '', b: '', c: '', base: '', height: '', area: null, error: '' }]);
    setTotalArea(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
          <Shapes className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'EN' ? 'Irregular Polygon Area Calculator (Triangulation)' : 'เครื่องคิดเลขพื้นที่รูปทรงอิสระ (แบ่งส่วนสามเหลี่ยม)'}
        </h2>
      </div>

      <div className="mb-6 p-4 bg-teal-50 rounded-lg text-teal-800 text-sm">
        {lang === 'EN' 
          ? 'Divide your irregular shape into smaller triangles and enter their dimensions below to calculate the total area.' 
          : 'แบ่งรูปทรงอิสระของคุณออกเป็นรูปสามเหลี่ยมย่อยๆ หลายรูป แล้วกรอกขนาดของแต่ละรูปลงในช่องด้านล่างเพื่อหาพื้นที่รวมทั้งหมด'}
      </div>

      <div className="space-y-6">
        {triangles.map((t, index) => (
          <div key={t.id} className="p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">
                {lang === 'EN' ? `Triangle ${index + 1}` : `รูปสามเหลี่ยมส่วนที่ ${index + 1}`}
              </h3>
              {triangles.length > 1 && (
                <button
                  onClick={() => removeTriangle(t.id)}
                  className="text-red-500 hover:text-red-700 p-1 transition-colors"
                  title={lang === 'EN' ? 'Remove' : 'ลบส่วนนี้'}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mb-4">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={t.method === 'heron'}
                    onChange={() => updateTriangle(t.id, 'method', 'heron')}
                    className="form-radio text-teal-600 h-4 w-4"
                  />
                  <span className="text-sm">{lang === 'EN' ? '3 Sides (Heron)' : 'ความยาว 3 ด้าน'}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={t.method === 'base-height'}
                    onChange={() => updateTriangle(t.id, 'method', 'base-height')}
                    className="form-radio text-teal-600 h-4 w-4"
                  />
                  <span className="text-sm">{lang === 'EN' ? 'Base & Height' : 'ฐานและความสูง'}</span>
                </label>
              </div>
            </div>

            {t.method === 'heron' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {lang === 'EN' ? 'Side a' : 'ด้าน a'}
                  </label>
                  <input
                    type="number"
                    value={t.a}
                    onChange={(e) => updateTriangle(t.id, 'a', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {lang === 'EN' ? 'Side b' : 'ด้าน b'}
                  </label>
                  <input
                    type="number"
                    value={t.b}
                    onChange={(e) => updateTriangle(t.id, 'b', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {lang === 'EN' ? 'Side c' : 'ด้าน c'}
                  </label>
                  <input
                    type="number"
                    value={t.c}
                    onChange={(e) => updateTriangle(t.id, 'c', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {lang === 'EN' ? 'Base' : 'ความยาวฐาน'}
                  </label>
                  <input
                    type="number"
                    value={t.base}
                    onChange={(e) => updateTriangle(t.id, 'base', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {lang === 'EN' ? 'Height' : 'ความสูง'}
                  </label>
                  <input
                    type="number"
                    value={t.height}
                    onChange={(e) => updateTriangle(t.id, 'height', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
              </div>
            )}

            {t.error && <p className="text-red-500 text-xs mt-2">{t.error}</p>}
            {t.area !== null && !t.error && (
              <p className="text-teal-700 text-sm mt-2 font-medium">
                {lang === 'EN' ? 'Area:' : 'พื้นที่ส่วนนี้:'} {t.area.toLocaleString('en-US', { maximumFractionDigits: 4 })}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={addTriangle}
            className="flex items-center space-x-2 text-teal-600 font-medium hover:text-teal-800 transition-colors bg-teal-50 px-4 py-2 rounded-lg border border-teal-200"
          >
            <Plus className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Add Another Triangle' : 'เพิ่มส่วนรูปสามเหลี่ยม'}</span>
          </button>
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={calculate}
            className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Calculate Total Area' : 'คำนวณพื้นที่รวม'}</span>
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Reset' : 'เริ่มใหม่'}</span>
          </button>
        </div>
      </div>

      {totalArea !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ArrowRight className="w-5 h-5 text-teal-600 mr-2" />
            {lang === 'EN' ? 'Total Area Result' : 'ผลรวมพื้นที่รูปทรงอิสระ'}
          </h3>
          <div className="text-4xl font-bold text-teal-600">
            {totalArea.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            <span className="text-xl text-gray-600 ml-2 font-normal">
              {lang === 'EN' ? 'square units' : 'ตารางหน่วย'}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {lang === 'EN' 
              ? `Calculated from ${triangles.length} triangular sections.` 
              : `คำนวณจากรูปสามเหลี่ยมย่อยทั้งหมดจำนวน ${triangles.length} ส่วน`}
          </p>
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-teal max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">การหาพื้นที่รูปทรงอิสระด้วยการแบ่งเป็นรูปสามเหลี่ยม (Irregular Polygon Area by Triangulation)</h2>
          
          <p>
            ในความเป็นจริง พื้นที่ดินหรือวัสดุต่างๆ ที่เราพบเจอในชีวิตประจำวันมักไม่ได้มีรูปทรงเรขาคณิตที่สมบูรณ์แบบ เช่น สี่เหลี่ยมจัตุรัส หรือวงกลมเสมอไป บางครั้งเราอาจต้องคำนวณพื้นที่ของแปลงที่ดินที่มีขอบเขตบิดเบี้ยว ไม่สม่ำเสมอ หรือที่เรียกว่า <strong>รูปหลายเหลี่ยมด้านไม่เท่า (Irregular Polygon)</strong> การจะหาพื้นที่ของรูปทรงแบบนี้ด้วยสูตรเดียวจึงเป็นไปไม่ได้ ดังนั้น วิธีที่ได้รับการยอมรับและแม่นยำที่สุดในทางวิศวกรรมการสำรวจ (Land Surveying) คือวิธีการแบ่งพื้นที่ออกเป็นรูปสามเหลี่ยมย่อยๆ (Triangulation Method)
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมต้องแบ่งเป็นรูปสามเหลี่ยม?</h3>
          <p>
            รูปสามเหลี่ยมเป็นรูปทรงเรขาคณิตพื้นฐานที่สุดและมีโครงสร้างที่คงตัว (Rigid shape) การนำรูปหลายเหลี่ยมที่ซับซ้อนมาลากเส้นทแยงมุมเพื่อแบ่งออกเป็นสามเหลี่ยมหลายๆ รูป จะช่วยให้เราสามารถคำนวณหาพื้นที่ของแต่ละส่วนได้ง่ายขึ้น และเมื่อนำพื้นที่ของสามเหลี่ยมทุกรูปมารวมกัน ก็จะได้พื้นที่รวมของรูปทรงอิสระนั้นๆ ได้อย่างแม่นยำ 
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรที่ใช้ในการคำนวณพื้นที่สามเหลี่ยม</h3>
          <p>
            ในการคำนวณพื้นที่ของสามเหลี่ยมแต่ละส่วน คุณสามารถเลือกใช้สูตรได้ตามข้อมูลที่วัดมาได้ ดังนี้:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>สูตรของฮีรอน (Heron's Formula):</strong> ใช้ในกรณีที่คุณสามารถวัดความยาวด้านของรูปสามเหลี่ยมได้ครบทั้ง 3 ด้าน (a, b, c) โดยไม่ต้องทราบมุมหรือความสูง ซึ่งมักจะเป็นวิธีที่สะดวกที่สุดในการรังวัดที่ดิน<br/>
              สูตรคือ <code>พื้นที่ = √(s(s - a)(s - b)(s - c))</code> โดยที่ <code>s = (a + b + c) / 2</code> (ครึ่งหนึ่งของเส้นรอบรูป)
            </li>
            <li>
              <strong>สูตรฐานและความสูง (Base & Height):</strong> ใช้ในกรณีที่สามารถวัดความยาวฐานและลากเส้นตั้งฉากจากจุดยอดมายังฐานเพื่อวัดความสูงได้<br/>
              สูตรคือ <code>พื้นที่ = (1/2) × ฐาน × สูง</code>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้งานในชีวิตจริง</h3>
          <p>
            วิธีการนี้มีการใช้งานอย่างแพร่หลายในวงการรังวัดที่ดินและวิศวกรรมโยธา เมื่อเจ้าหน้าที่กรมที่ดินหรือช่างสำรวจลงพื้นที่เพื่อวัดขนาดที่ดินแปลงใหม่ที่ไม่ได้เป็นรูปสี่เหลี่ยม พวกเขาจะทำการรังวัดขอบเขตและลากเส้นโยงภายในแปลงที่ดินให้กลายเป็นตาข่ายรูปสามเหลี่ยม จากนั้นจึงใช้กล้องสำรวจ (Theodolite หรือ Total Station) วัดระยะทางแต่ละด้านเพื่อนำมาคำนวณพื้นที่ด้วยสูตรของฮีรอน 
          </p>
          <p>
            นอกจากงานที่ดินแล้ว วิธีการแบ่งเป็นรูปสามเหลี่ยม (Triangulation) ยังถูกนำไปประยุกต์ใช้ในคอมพิวเตอร์กราฟิก (Computer Graphics) 3 มิติ โดยโมเดลสามมิติทุกชิ้นที่คุณเห็นในเกมหรือภาพยนตร์แอนิเมชัน ล้วนถูกสร้างขึ้นจากการต่อกันของรูปสามเหลี่ยมเล็กๆ จำนวนมหาศาล (Polygon Mesh) ทั้งสิ้น
          </p>
          <p>
            โปรแกรมคำนวณพื้นที่รูปทรงอิสระด้วยการแบ่งส่วนนี้ ถูกสร้างขึ้นเพื่อเป็นผู้ช่วยให้คุณสามารถคำนวณพื้นที่ที่ซับซ้อนได้อย่างเป็นระบบ โดยคุณสามารถเพิ่มส่วนของรูปสามเหลี่ยมได้ตามจำนวนที่คุณแบ่งไว้ และกรอกข้อมูลทีละส่วน ระบบจะทำหน้าที่รวมผลลัพธ์ที่ถูกต้องแม่นยำให้กับคุณ ช่วยประหยัดเวลาและลดข้อผิดพลาดในการคำนวณด้วยตนเองลงได้อย่างมาก
          </p>
        </article>
      )}
    </div>
  );
}
