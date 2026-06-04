import React, { useState } from 'react';
import { Triangle, Calculator, Info, CheckCircle2 } from 'lucide-react';

export default function AreaTriangle({ lang = 'th' }: any) {
  const [base, setBase] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);

  const t = {
    title: lang === 'en' ? 'Triangle Area Calculator' : 'โปรแกรมคำนวณพื้นที่สามเหลี่ยม',
    base: lang === 'en' ? 'Base Length' : 'ความยาวฐาน (Base)',
    height: lang === 'en' ? 'Height' : 'ความสูง (Height)',
    calculate: lang === 'en' ? 'Calculate Area' : 'คำนวณพื้นที่',
    result: lang === 'en' ? 'Area of the Triangle' : 'พื้นที่สามเหลี่ยม',
    unit: lang === 'en' ? 'square units' : 'ตารางหน่วย',
    placeholder: lang === 'en' ? 'Enter value' : 'กรอกตัวเลข',
  };

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
      setArea(0.5 * b * h);
    } else {
      setArea(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-blue-600 p-6 text-white text-center">
          <Triangle className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.base}</label>
                <input
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.height}</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min="0"
                  step="any"
                />
              </div>
              <button
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {t.calculate}
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-100">
              <h3 className="text-lg font-medium text-blue-900 mb-2">{t.result}</h3>
              {area !== null ? (
                <div>
                  <div className="text-4xl font-bold text-blue-700 mb-2">
                    {area.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div className="text-blue-600 font-medium">{t.unit}</div>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Info className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">โปรดกรอกความยาวฐานและความสูง<br/>เพื่อดูผลลัพธ์</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-blue max-w-none text-gray-700 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-600" />
          ความรู้เบื้องต้นเกี่ยวกับการหาพื้นที่สามเหลี่ยม
        </h2>
        
        <p>
          รูปสามเหลี่ยม (Triangle) เป็นหนึ่งในรูปเรขาคณิตพื้นฐานที่มีความสำคัญอย่างมากในวิชาคณิตศาสตร์และเรขาคณิต 
          ประกอบด้วยจุดยอดสามจุดที่ไม่ได้อยู่ในแนวเส้นตรงเดียวกันและมีด้านประกอบสามด้าน 
          การทำความเข้าใจวิธีการคำนวณพื้นที่ของรูปสามเหลี่ยมจึงเป็นรากฐานสำคัญสำหรับการศึกษาในระดับที่สูงขึ้นไป 
          รวมถึงการประยุกต์ใช้งานจริงในสาขาวิชาชีพต่างๆ เช่น วิศวกรรมศาสตร์ สถาปัตยกรรมศาสตร์ และการออกแบบ
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">สูตรการหาพื้นที่รูปสามเหลี่ยม</h3>
        <p>
          การหาพื้นที่ของรูปสามเหลี่ยมทั่วไปนั้น มีสูตรมาตรฐานที่ได้รับการยอมรับและใช้งานอย่างแพร่หลายที่สุดคือ:
        </p>
        <div className="bg-blue-50 p-4 rounded-lg my-4 text-center font-bold text-lg text-blue-800 border border-blue-200">
          พื้นที่สามเหลี่ยม = 1/2 × ความยาวฐาน × ความสูง
        </div>
        <p>
          โดยที่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ความยาวฐาน (Base):</strong> คือความยาวของด้านใดด้านหนึ่งของรูปสามเหลี่ยมที่ถูกกำหนดให้เป็นฐาน</li>
          <li><strong>ความสูง (Height):</strong> คือระยะทางที่ตั้งฉากจากฐาน (หรือส่วนต่อขยายของฐาน) ไปยังจุดยอดที่อยู่ตรงข้าม</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ตัวอย่างการคำนวณ</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 1: สามเหลี่ยมที่มีฐานและความสูงชัดเจน</h4>
            <p>สมมติว่าเรามีรูปสามเหลี่ยมรูปหนึ่งที่มีความยาวฐานเท่ากับ 10 เซนติเมตร และมีความสูงเท่ากับ 8 เซนติเมตร</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              พื้นที่ = 1/2 × ฐาน × สูง<br/>
              พื้นที่ = 1/2 × 10 × 8<br/>
              พื้นที่ = 5 × 8<br/>
              พื้นที่ = 40 ตารางเซนติเมตร
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">ตัวอย่างที่ 2: การประยุกต์ใช้ในชีวิตจริง</h4>
            <p>ช่างไม้ต้องการตัดแผ่นไม้อัดเป็นรูปสามเหลี่ยมเพื่อทำหน้าจั่วของบ้านสุนัข โดยต้องการให้ฐานกว้าง 60 ซม. และสูง 45 ซม. แผ่นไม้นี้จะมีพื้นที่เท่าใด?</p>
            <p className="mt-2 text-gray-600">
              วิธีทำ:<br/>
              พื้นที่ = 1/2 × 60 × 45<br/>
              พื้นที่ = 30 × 45<br/>
              พื้นที่ = 1,350 ตารางเซนติเมตร
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ทำไมสูตรจึงมีค่าเป็นครึ่งหนึ่งของสี่เหลี่ยม?</h3>
        <p>
          หลายคนอาจสงสัยว่าทำไมสูตรการหาพื้นที่สามเหลี่ยมจึงต้องคูณด้วย 1/2 เหตุผลทางเรขาคณิตนั้นเข้าใจได้ง่ายมาก 
          หากเรานำรูปสี่เหลี่ยมผืนผ้า (หรือสี่เหลี่ยมด้านขนาน) ที่มีความกว้างเท่ากับฐานของสามเหลี่ยมและมีความยาวเท่ากับความสูงของสามเหลี่ยม 
          มาลากเส้นทแยงมุมเพื่อแบ่งครึ่งสี่เหลี่ยมนั้น เราจะได้รูปสามเหลี่ยมสองรูปที่ขนาดเท่ากันพอดี 
          ดังนั้นพื้นที่ของสามเหลี่ยมหนึ่งรูปจึงมีค่าเป็นครึ่งหนึ่ง (1/2) ของพื้นที่สี่เหลี่ยมที่มีฐานและความสูงเท่ากันนั่นเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">การประยุกต์ใช้ในชีวิตประจำวัน</h3>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานสถาปัตยกรรมและก่อสร้าง:</strong> การคำนวณพื้นที่หน้าจั่วหลังคา พื้นที่กระเบื้องทรงสามเหลี่ยม หรือโครงสร้างเหล็ก (Truss)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>งานออกแบบศิลปะและกราฟิก:</strong> การจัดสรรพื้นที่บนหน้ากระดาษหรือการออกแบบลวดลายรูปทรงเลขาคณิต</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>เกษตรกรรม:</strong> การคำนวณพื้นที่เพาะปลูกในที่ดินที่มีลักษณะรูปทรงเป็นสามเหลี่ยม เพื่อคำนวณปริมาณเมล็ดพันธุ์หรือปุ๋ยที่ต้องใช้</span>
          </li>
        </ul>

        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-2">ข้อควรระวังในการคำนวณ</h4>
          <p className="text-yellow-900 text-sm">
            สิ่งสำคัญที่ผู้คำนวณมักผิดพลาดคือ การจำสับสนระหว่าง "ความยาวของด้านข้าง" กับ "ความสูง" 
            โปรดจำไว้เสมอว่า <strong>ความสูง (Height) ต้องเป็นเส้นที่ลากตั้งฉากกับฐานเท่านั้น</strong> ไม่ใช่ความยาวของด้านข้างของสามเหลี่ยม (เว้นแต่ในกรณีของสามเหลี่ยมมุมฉากที่ด้านประกอบมุมฉากด้านหนึ่งสามารถทำหน้าที่เป็นความสูงได้)
            นอกจากนี้ หน่วยของฐานและความสูงจะต้องเป็นหน่วยเดียวกันเสมอ หากโจทย์กำหนดหน่วยมาต่างกัน จะต้องแปลงหน่วยให้ตรงกันก่อนทำการคำนวณ
          </p>
        </div>
      </article>
    </div>
  );
}
