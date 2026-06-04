import React, { useState } from 'react';
import { Calculator, Info, LayoutDashboard } from 'lucide-react';

export default function HectareToRai({ lang }: { lang: 'TH' | 'EN' }) {
  const [hectares, setHectares] = useState<string>('');

  const calculateRai = (haValue: number) => {
    // 1 Hectare = 10,000 sq meters
    // 1 Rai = 1,600 sq meters
    // 1 Ngan = 400 sq meters
    // 1 Sq Wa = 4 sq meters
    // 1 Hectare = 6.25 Rai exactly.
    const totalSqMeters = haValue * 10000;
    const totalRai = Math.floor(totalSqMeters / 1600);
    const remainingAfterRai = totalSqMeters % 1600;
    const totalNgan = Math.floor(remainingAfterRai / 400);
    const remainingAfterNgan = remainingAfterRai % 400;
    const totalSqWa = remainingAfterNgan / 4;

    return { rai: totalRai, ngan: totalNgan, sqWa: totalSqWa, exactRai: totalSqMeters / 1600 };
  };

  const val = parseFloat(hectares);
  const isValid = !isNaN(val) && val >= 0;
  const result = isValid ? calculateRai(val) : null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {lang === 'TH' ? 'เครื่องคิดเลขแปลงเฮกตาร์เป็นไร่' : 'Hectare to Rai Converter'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'TH' ? 'พื้นที่ (เฮกตาร์ - Hectares)' : 'Area (Hectares)'}
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-xl"
                placeholder="0.00"
              />
            </div>

            <div className="bg-amber-50 text-amber-800 p-4 rounded-lg flex items-start space-x-3 text-sm border border-amber-100">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
              <p>
                {lang === 'TH' 
                  ? 'ค่าคงที่: 1 เฮกตาร์ (Hectare) เท่ากับ 10,000 ตารางเมตร ซึ่งจะแปลงเป็นค่า 6 ไร่ 1 งาน ได้พอดีเป๊ะ (6.25 ไร่)' 
                  : 'Constant: 1 Hectare equals 10,000 sq meters, which is exactly 6.25 Rai (6 Rai 1 Ngan).'}
              </p>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex flex-col justify-center min-h-[250px]">
            <h2 className="text-sm font-semibold text-green-800 mb-4 uppercase tracking-wider">
              {lang === 'TH' ? 'ผลลัพธ์การแปลงหน่วยไทย' : 'Converted Thai Units'}
            </h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                    <div className="text-3xl font-bold text-green-600">{result.rai}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">{lang === 'TH' ? 'ไร่' : 'Rai'}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                    <div className="text-3xl font-bold text-green-600">{result.ngan}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">{lang === 'TH' ? 'งาน' : 'Ngan'}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                    <div className="text-3xl font-bold text-green-600">{result.sqWa % 1 === 0 ? result.sqWa : result.sqWa.toFixed(2)}</div>
                    <div className="text-sm font-medium text-gray-500 mt-1">{lang === 'TH' ? 'ตารางวา' : 'Sq.Wa'}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-green-200/50 mt-4">
                  <div className="flex justify-between items-center text-green-800 font-semibold">
                    <span>{lang === 'TH' ? 'รวมเป็นไร่ (ทศนิยม):' : 'Total in Decimal Rai:'}</span>
                    <span className="text-xl">{result.exactRai.toLocaleString(undefined, { maximumFractionDigits: 4 })} {lang === 'TH' ? 'ไร่' : 'Rai'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-green-600/60 py-8">
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">{lang === 'TH' ? 'กรุณาระบุพื้นที่เฮกตาร์เพื่อคำนวณ' : 'Enter hectares to see the result'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 prose prose-green max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          แปลงพื้นที่จาก "เฮกตาร์" (Hectare) เป็น "ไร่" แบบง่ายๆ ตรงเป๊ะ ไม่มีเศษ!
        </h2>
        
        <p>
          ในการรายงานข้อมูลสถิติระดับประเทศ ข่าวสารเรื่องการเกษตร ข้อมูลป่าไม้ หรือคาร์บอนเครดิต (Carbon Credit) หน่วยวัดพื้นที่ที่มักจะถูกหยิบยกขึ้นมาใช้เป็นมาตรฐานสากลก็คือ <strong>"เฮกตาร์" (Hectare)</strong> อย่างไรก็ตาม สำหรับคนไทย เรามีความคุ้นเคยกับหน่วย <strong>"ไร่ งาน ตารางวา"</strong> มากกว่า ทำให้หลายๆ ครั้งเวลาได้ยินข้อมูลตัวเลขเป็นเฮกตาร์ เราอาจจะนึกภาพไม่ออกว่ามันกว้างใหญ่แค่ไหน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำความเข้าใจ: 1 เฮกตาร์ มีขนาดเท่าใด?</h3>
        <p>
          <strong>เฮกตาร์ (Hectare ย่อว่า ha)</strong> เป็นหน่วยวัดพื้นที่ในระบบเมตริก นิยามของ 1 เฮกตาร์ คือพื้นที่สี่เหลี่ยมจัตุรัสที่มีด้านกว้าง 100 เมตร และด้านยาว 100 เมตร ดังนั้นเมื่อคูณกันจะได้พื้นที่เท่ากับ <strong>10,000 ตารางเมตร</strong> พอดีเป๊ะ หน่วยเฮกตาร์นี้เป็นที่นิยมใช้อย่างมากทั่วโลก รวมถึงเป็นหน่วยหลักที่องค์การอาหารและเกษตรแห่งสหประชาชาติ (FAO) ใช้ในการเก็บสถิติ
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">หน่วยไร่ของไทย และการเทียบกับระบบเมตริก</h3>
        <p>
          ระบบการวัดพื้นที่ที่ดินแบบไทยนั้น โชคดีมากที่ถูกออกแบบมาให้สอดคล้องกับระบบเมตริก (ตารางเมตร) ได้อย่างลงตัวสมบูรณ์แบบ โดยไม่มีเศษทศนิยมให้ปวดหัว:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>1 ตารางวา</strong> = 4 ตารางเมตร</li>
          <li><strong>1 งาน</strong> = 100 ตารางวา = 400 ตารางเมตร</li>
          <li><strong>1 ไร่</strong> = 4 งาน = 400 ตารางวา = <strong>1,600 ตารางเมตร</strong></li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรตายตัว: 1 เฮกตาร์ = 6.25 ไร่</h3>
        <p>
          เมื่อเราทราบแล้วว่า 1 เฮกตาร์ เท่ากับ 10,000 ตารางเมตร และ 1 ไร่ เท่ากับ 1,600 ตารางเมตร การหาว่า 1 เฮกตาร์มีกี่ไร่ จึงทำได้โดยการนำ 10,000 หารด้วย 1,600
        </p>
        <blockquote className="bg-green-50 border-l-4 border-green-500 p-4 my-4 rounded-r-lg font-bold text-lg text-green-900 text-center">
          10,000 ÷ 1,600 = 6.25 
        </blockquote>
        <p>
          ผลลัพธ์คือ <strong>1 เฮกตาร์ เท่ากับ 6.25 ไร่</strong> ถ้วน ไม่มีเศษทศนิยมยืดเยื้อ ซึ่งหมายความว่า 1 เฮกตาร์ จะเท่ากับพื้นที่ <strong>6 ไร่ กับอีก 1 งาน</strong> อย่างพอดิบพอดี (0.25 ไร่ = 1 ใน 4 ของไร่ = 1 งาน)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ตารางเปรียบเทียบ เฮกตาร์ เป็น ไร่ ที่พบบ่อย</h3>
        <p>
          เพื่อความสะดวกในการจดจำ คุณสามารถใช้สูตรคูณแม่ 6.25 เพื่อประเมินพื้นที่คร่าวๆ ได้ ดังนี้:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600">พื้นที่ (เฮกตาร์)</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">พื้นที่ (ตารางเมตร)</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">พื้นที่ (ไร่-งาน-ตร.ว.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">1 เฮกตาร์</td>
                <td className="py-2 px-4 border-b">10,000 ตร.ม.</td>
                <td className="py-2 px-4 border-b">6 ไร่ 1 งาน</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b">2 เฮกตาร์</td>
                <td className="py-2 px-4 border-b">20,000 ตร.ม.</td>
                <td className="py-2 px-4 border-b">12 ไร่ 2 งาน</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">10 เฮกตาร์</td>
                <td className="py-2 px-4 border-b">100,000 ตร.ม.</td>
                <td className="py-2 px-4 border-b">62 ไร่ 2 งาน</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b">100 เฮกตาร์</td>
                <td className="py-2 px-4 border-b">1,000,000 ตร.ม. (1 ตร.กม.)</td>
                <td className="py-2 px-4 border-b">625 ไร่</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมความรู้นี้จึงสำคัญ?</h3>
        <p>
          ปัจจุบันในประเทศไทยเริ่มมีการผลักดันโครงการเกี่ยวกับการปลูกป่าเพื่อคาร์บอนเครดิต หรือการทำเกษตรกรรมที่ต้องอ้างอิงมาตรฐานสากล เช่น GAP, FSC ซึ่งเอกสารจากหน่วยงานต่างชาติเหล่านี้จะระบุพื้นที่เป็นเฮกตาร์ทั้งหมด การที่เจ้าของที่ดินหรือเกษตรกรไทยสามารถแปลงหน่วยเฮกตาร์กลับมาเป็นไร่ได้อย่างถูกต้อง จะช่วยให้การคำนวณต้นทุน การใส่ปุ๋ย การประเมินผลผลิตต่อไร่ ตลอดจนการวางแผนการใช้ประโยชน์ที่ดินเป็นไปอย่างมีประสิทธิภาพและไม่เกิดความผิดพลาด
        </p>
        <p>
          หากคุณต้องการแปลงหน่วยพื้นที่แบบเร่งด่วนและไม่ต้องการคูณตัวเลขเอง สามารถใช้งาน <strong>เครื่องคิดเลขแปลงเฮกตาร์เป็นไร่</strong> ด้านบนของเราได้ฟรี เพียงแค่พิมพ์ตัวเลขเฮกตาร์ลงไป ระบบจะคำนวณออกมาเป็น ไร่ งาน ตารางวา ให้ทันที พร้อมเสิร์ฟความสะดวกสบายให้คุณ!
        </p>
      </article>
    </div>
  );
}
