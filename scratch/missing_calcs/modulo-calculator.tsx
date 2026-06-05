import React, { useState } from 'react';
import { Calculator, Percent } from 'lucide-react';

export default function ModuloCalculator({ lang }: { lang: 'th' | 'en' }) {
  const isTH = lang === 'th';
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');

  const calculate = () => {
    const a = parseFloat(dividend);
    const n = parseFloat(divisor);

    if (isNaN(a) || isNaN(n)) return null;
    if (n === 0) return { error: isTH ? 'ตัวหารต้องไม่เป็นศูนย์' : 'Divisor cannot be zero' };

    // Standard programming modulo (%)
    const result = a % n;
    
    // Mathematical Euclidean modulo (always positive remainder)
    const euclideanResult = ((a % n) + Math.abs(n)) % Math.abs(n);
    
    const quotient = Math.floor(a / n);

    return {
      a,
      n,
      result,
      euclideanResult,
      quotient,
      standardEquation: `${a} = (${n} × ${Math.trunc(a/n)}) + ${result}`,
      euclideanEquation: `${a} = (${n} × ${Math.floor(a/n)}) + ${euclideanResult}`
    };
  };

  const data = calculate();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
            <Percent size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {isTH ? 'เครื่องมือคำนวณหาเศษของการหาร (Modulo)' : 'Modulo Calculator'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {isTH ? 'ตัวตั้ง (Dividend / a)' : 'Dividend (a)'}
            </label>
            <input
              type="number"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
              placeholder="e.g. 17"
              className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {isTH ? 'ตัวหาร (Divisor / n)' : 'Divisor (n)'}
            </label>
            <input
              type="number"
              value={divisor}
              onChange={(e) => setDivisor(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
            />
          </div>
        </div>

        {data && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            {data.error ? (
              <div className="text-red-500 font-medium text-center p-4">
                {data.error}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {isTH ? 'ผลลัพธ์ (Result)' : 'Result'}
                </h3>
                
                <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
                  <div className="text-center md:text-left">
                    <span className="text-sm text-gray-500 font-medium mb-1 block">
                      {isTH ? 'เศษตามหลักโปรแกรมมิ่ง (Standard %)' : 'Standard Modulo'}
                    </span>
                    <div className="text-4xl font-bold text-pink-600">
                      {data.a} mod {data.n} = {data.result}
                    </div>
                  </div>
                  
                  {data.result !== data.euclideanResult && (
                    <div className="text-center md:text-left border-l-2 border-gray-200 pl-6">
                      <span className="text-sm text-gray-500 font-medium mb-1 block">
                        {isTH ? 'เศษตามหลักคณิตศาสตร์ (Euclidean)' : 'Euclidean Modulo'}
                      </span>
                      <div className="text-3xl font-bold text-purple-600">
                        {data.euclideanResult}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-gray-600 font-mono bg-white p-4 rounded-lg border border-gray-100 text-sm md:text-base">
                  <p className="font-semibold text-gray-800 border-b border-gray-100 pb-2">
                    {isTH ? 'วิธีการคำนวณ (Steps)' : 'Calculation Steps'}
                  </p>
                  <p>1. หารตัวตั้งด้วยตัวหาร: {data.a} ÷ {data.n} = {data.a / data.n}</p>
                  <p>2. เอาเฉพาะส่วนจำนวนเต็ม (Quotient): {Math.trunc(data.a/data.n)}</p>
                  <p>3. นำจำนวนเต็มคูณตัวหาร: {Math.trunc(data.a/data.n)} × {data.n} = {Math.trunc(data.a/data.n) * data.n}</p>
                  <p>4. นำตัวตั้งลบผลลัพธ์ข้อ 3 จะได้เศษ: {data.a} - {Math.trunc(data.a/data.n) * data.n} = {data.result}</p>
                  <p className="mt-2 pt-2 border-t border-gray-100 text-pink-600 font-bold">
                    สมการ: {data.standardEquation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <article className="prose prose-pink max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          มอดุโล (Modulo) คืออะไร? สาระความรู้เกี่ยวกับการหาเศษของการหาร
        </h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          ในชีวิตประจำวัน เมื่อเราต้องแบ่งของออกเป็นส่วนๆ ให้เท่ากัน มักจะมี "เศษ" หรือของที่เหลืออยู่เสมอ ในทางคณิตศาสตร์และวิทยาการคอมพิวเตอร์ การหาเศษที่เหลือจากการหารนี้ถูกเรียกว่า <strong>มอดุโล (Modulo Operation)</strong> ซึ่งเป็นหนึ่งในการดำเนินการทางคณิตศาสตร์พื้นฐานที่ถูกนำไปใช้ประโยชน์อย่างมหาศาล โดยเฉพาะในสายงานการเขียนโปรแกรม (Programming) และวิทยาการรหัสลับ (Cryptography)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การทำงานของ Modulo (เครื่องหมาย %)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Modulo มักถูกแทนด้วยสัญลักษณ์เปอร์เซ็นต์ <code>%</code> หรือคำว่า <code>mod</code> โดยรูปแบบทั่วไปคือ <code>a mod n</code> ซึ่งหมายถึง <strong>"เศษที่เหลือจากการนำ a มาหารด้วย n"</strong> ตัวอย่างเช่น 17 mod 5 จะได้ผลลัพธ์คือ 2 เนื่องจากเมื่อเรานำ 17 ไปหารด้วย 5 จะได้ผลหารคือ 3 และเหลือเศษอีก 2 นั่นเอง 
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          สมการพื้นฐานที่อธิบายการหารแบบเหลือเศษ (Division Algorithm) คือ:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center font-mono font-bold text-lg text-gray-800">
          a = (n × q) + r
        </div>
        <p className="mb-4 text-gray-700 leading-relaxed">
          โดยที่ <strong>a</strong> คือตัวตั้ง (Dividend), <strong>n</strong> คือตัวหาร (Divisor), <strong>q</strong> คือผลหาร (Quotient) และ <strong>r</strong> คือเศษ (Remainder หรือผลลัพธ์ของ Modulo) โดยปกติแล้ว r จะมีค่าตั้งแต่ 0 ถึง n-1 เสมอ (ในกรณีที่ทำงานกับเลขบวก)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ข้อควรระวังเรื่องจำนวนเต็มลบ (Negative Numbers)</h3>
        <p className="mb-4 text-gray-700 leading-relaxed">
          สิ่งหนึ่งที่สร้างความสับสนบ่อยครั้งคือเมื่อมีจำนวนลบเข้ามาเกี่ยวข้อง ภาษาโปรแกรมคอมพิวเตอร์แต่ละภาษาอาจจะจัดการ <code>-a mod n</code> แตกต่างกันออกไป บางภาษา (เช่น C, Java, JavaScript) จะให้ผลลัพธ์ที่เป็นลบตามตัวตั้ง ในขณะที่ทฤษฎีทางคณิตศาสตร์ (Euclidean Modulo) หรือภาษาอย่าง Python จะกำหนดให้เศษที่เหลือมีค่าเป็น <strong>บวกเสมอ</strong> เครื่องมือของเราจึงแสดงผลลัพธ์ที่คำนวณตามหลักคณิตศาสตร์แบบ Euclidean แยกออกมาให้เห็นด้วย ในกรณีที่ค่ามีความแตกต่างกัน
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้ Modulo ในชีวิตจริงและคอมพิวเตอร์</h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><strong>การตรวจสอบเลขคู่-เลขคี่ (Even/Odd Check):</strong> เป็นท่าไม้ตายคลาสสิกของโปรแกรมเมอร์ หาก <code>x % 2 == 0</code> แสดงว่าค่านั้นเป็นเลขคู่ หากเท่ากับ 1 แสดงว่าเป็นเลขคี่</li>
          <li><strong>ระบบเวลาและนาฬิกา:</strong> เวลาทำงานในรูปแบบรอบ (Cyclic) เช่น นาฬิกา 12 ชั่วโมง หรือ 24 ชั่วโมง ตัวอย่างเช่น หากตอนนี้เวลา 22:00 น. และผ่านไป 5 ชั่วโมง เวลาจะกลายเป็น (22 + 5) mod 24 = 3:00 น.</li>
          <li><strong>การหมุนเวียนคิว (Circular Queue / Array Wrap-around):</strong> หากต้องการวนลูปอ่านข้อมูลใน Array ไม่ให้เกินขอบเขต (Out of bounds) สามารถใช้ Index = (Index + 1) % ArraySize เพื่อให้ค่ากลับมาเริ่มที่ 0 ทันทีที่ถึงจุดสิ้นสุด</li>
          <li><strong>การเข้ารหัสลับ (Cryptography):</strong> อัลกอริทึมการเข้ารหัสที่มีความปลอดภัยสูงระดับโลกอย่าง RSA อาศัยคุณสมบัติของ Modular Arithmetic เป็นแกนหลัก ซึ่งทำให้กระบวนการหาค่ากลับทำได้ยากมากในทางคอมพิวเตอร์ (Trapdoor Function)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สรุป</h3>
        <p className="text-gray-700 leading-relaxed">
          มอดุโล (Modulo) ไม่ใช่แค่เรื่องของ "เศษเหลือ" ธรรมดาๆ แต่เป็นแนวคิดที่อยู่เบื้องหลังระบบดิจิทัลและการคำนวณแบบวนซ้ำแทบทั้งหมด การเข้าใจวิธีการหาเศษที่ถูกต้อง รวมถึงความแตกต่างระหว่างภาษาคอมพิวเตอร์ต่างๆ จะช่วยให้คุณสามารถนำไปประยุกต์ใช้แก้ปัญหาเชิงตรรกะได้เฉียบคมมากยิ่งขึ้น และหวังว่าเครื่องมือของเราจะเป็นส่วนหนึ่งในการสนับสนุนความเข้าใจของคุณให้กระจ่างชัดขึ้น
        </p>
      </article>
    </div>
  );
}
