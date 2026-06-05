"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';

export default function PercentageIncrease({ lang }: any) {
  const [initialValue, setInitialValue] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [difference, setDifference] = useState<string | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);

    if (isNaN(initial) || isNaN(final)) {
      setResult(lang === 'EN' ? 'Please enter valid numbers.' : 'กรุณากรอกตัวเลขที่ถูกต้อง');
      setDifference(null);
      return;
    }

    if (initial === 0) {
      setResult(lang === 'EN' ? 'Initial value cannot be zero.' : 'ค่าเริ่มต้นต้องไม่เป็นศูนย์');
      setDifference(null);
      return;
    }

    const diff = final - initial;
    const percentage = (diff / initial) * 100;
    
    setDifference(diff.toLocaleString('en-US', { maximumFractionDigits: 4 }));
    setResult(percentage.toLocaleString('en-US', { maximumFractionDigits: 4 }));
  };

  const clear = () => {
    setInitialValue('');
    setFinalValue('');
    setResult(null);
    setDifference(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="h-8 w-8" />
              {lang === 'EN' ? 'Percentage Increase Calculator' : 'เครื่องมือคำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์'}
            </h2>
            <p className="text-green-100 opacity-90">
              {lang === 'EN' ? 'Calculate how much a value has grown in percentage.' : 'คำนวณการเติบโตหรือการเพิ่มขึ้นของค่าเป็นเปอร์เซ็นต์อย่างง่ายดาย'}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Initial Value' : 'ค่าเริ่มต้น (Initial Value)'}
              </label>
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="100"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'EN' ? 'Final Value' : 'ค่าสุดท้าย (Final Value)'}
              </label>
              <input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="150"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={calculate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Calculator className="h-5 w-5" />
              {lang === 'EN' ? 'Calculate' : 'คำนวณเลย'}
            </button>
            <button
              onClick={clear}
              className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium text-lg transition-colors"
            >
              {lang === 'EN' ? 'Clear' : 'ล้างค่า'}
            </button>
          </div>

          {result !== null && (
            <div className={`p-6 rounded-xl border-2 transition-all ${difference !== null && parseFloat(difference.replace(/,/g, '')) >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {lang === 'EN' ? 'Result' : 'ผลลัพธ์การคำนวณ'}
                </p>
                {difference !== null ? (
                  <>
                    <div className="flex items-center justify-center gap-4 text-gray-800 text-lg sm:text-xl font-medium mb-4">
                      <span>{initialValue}</span>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <span>{finalValue}</span>
                    </div>
                    {parseFloat(difference.replace(/,/g, '')) >= 0 ? (
                      <div>
                        <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                          +{result}%
                        </div>
                        <p className="text-green-800">
                          {lang === 'EN' ? `Increased by ${difference}` : `เพิ่มขึ้น ${difference}`}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
                          {result}%
                        </div>
                        <p className="text-red-800">
                          {lang === 'EN' ? `Decreased by ${Math.abs(parseFloat(difference.replace(/,/g, '')))}` : `ลดลง ${Math.abs(parseFloat(difference.replace(/,/g, '')))}`}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-red-500 font-medium">{result}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="prose prose-green max-w-none bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          เครื่องมือคำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์ (Percentage Increase Calculator)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          ยินดีต้อนรับสู่ <strong>เครื่องมือคำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์ (Percentage Increase Calculator)</strong> ของเรา เครื่องมือนี้ถูกออกแบบมาเพื่อช่วยให้คุณสามารถคำนวณหาอัตราการเติบโต หรือสัดส่วนที่เพิ่มขึ้นของค่าต่างๆ ได้อย่างรวดเร็วและแม่นยำ ไม่ว่าคุณจะเป็นนักธุรกิจที่ต้องการคำนวณยอดขายที่เติบโต นักลงทุนที่วิเคราะห์ผลกำไร หรือแม้แต่นักเรียนนักศึกษาที่กำลังทำการบ้านคณิตศาสตร์ เครื่องมือนี้จะช่วยลดความซับซ้อนและประหยัดเวลาให้กับคุณได้อย่างมหาศาล
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">การเพิ่มขึ้นเป็นเปอร์เซ็นต์ คืออะไร?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>การเพิ่มขึ้นเป็นเปอร์เซ็นต์ (Percentage Increase)</strong> คือการวัดการเปลี่ยนแปลงของปริมาณหรือมูลค่าจากจุดเริ่มต้นไปยังจุดสุดท้าย โดยแสดงผลลัพธ์ในรูปแบบของร้อยละ (%) การวัดด้วยเปอร์เซ็นต์ช่วยให้เราเห็นภาพการเปลี่ยนแปลงที่ชัดเจนกว่าการบอกเพียงตัวเลขดิบๆ ยกตัวอย่างเช่น ถ้ายอดขายเพิ่มขึ้น 10,000 บาท จากยอดเดิม 100,000 บาท ย่อมให้ความรู้สึกแตกต่างจากการเพิ่มขึ้น 10,000 บาท จากยอดเดิมเพียง 20,000 บาท การใช้เปอร์เซ็นต์จึงทำให้การเปรียบเทียบเป็นมาตรฐานเดียวกัน
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">สูตรการคำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          การคำนวณหาเปอร์เซ็นต์การเพิ่มขึ้นนั้น ใช้หลักคณิตศาสตร์พื้นฐานที่คุณสามารถทำความเข้าใจได้ง่ายๆ โดยสูตรมาตรฐานที่ใช้ในการคำนวณคือ:
        </p>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
          <p className="font-mono text-lg text-center font-bold text-gray-800">
            เปอร์เซ็นต์การเพิ่มขึ้น = ((ค่าสุดท้าย - ค่าเริ่มต้น) / ค่าเริ่มต้น) × 100
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ขั้นตอนการคำนวณ:</strong><br/>
          1. หาผลต่างโดยนำ <strong>ค่าสุดท้าย (Final Value)</strong> ลบด้วย <strong>ค่าเริ่มต้น (Initial Value)</strong><br/>
          2. นำผลต่างที่ได้มาหารด้วย <strong>ค่าเริ่มต้น (Initial Value)</strong><br/>
          3. นำผลลัพธ์จากการหารไปคูณด้วย 100 เพื่อแปลงค่าเป็นเปอร์เซ็นต์ (%)
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ตัวอย่างการคำนวณในชีวิตจริง</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เพื่อให้เห็นภาพชัดเจนยิ่งขึ้น ลองพิจารณาตัวอย่างเหล่านี้:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
          <li>
            <strong>ตัวอย่างยอดขายธุรกิจ:</strong> สมมติว่าร้านกาแฟของคุณมียอดขายในเดือนมกราคมอยู่ที่ 50,000 บาท และในเดือนกุมภาพันธ์ยอดขายเพิ่มขึ้นเป็น 65,000 บาท<br/>
            วิธีคิด: ((65,000 - 50,000) / 50,000) × 100 = (15,000 / 50,000) × 100 = <strong>30%</strong><br/>
            <em>แปลว่ายอดขายของร้านกาแฟเติบโตขึ้นถึง 30% จากเดือนที่แล้ว</em>
          </li>
          <li>
            <strong>ตัวอย่างการลงทุน:</strong> คุณซื้อหุ้นในราคา 120 บาทต่อหุ้น และต่อมาราคาหุ้นปรับตัวสูงขึ้นเป็น 150 บาทต่อหุ้น<br/>
            วิธีคิด: ((150 - 120) / 120) × 100 = (30 / 120) × 100 = <strong>25%</strong><br/>
            <em>แปลว่าคุณได้รับผลตอบแทนเพิ่มขึ้น 25% จากเงินลงทุนก้อนแรก</em>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ทำไมคุณจึงควรใช้เครื่องมือของเรา?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          แม้ว่าสูตรคณิตศาสตร์ด้านบนจะดูเรียบง่าย แต่ในโลกแห่งความเป็นจริง ตัวเลขที่คุณต้องรับมืออาจมีจุดทศนิยมหรือเป็นจำนวนหลักล้าน เครื่องมือ <strong>Percentage Increase Calculator</strong> ของเราจะช่วยตัดปัญหาความผิดพลาดในการคำนวณด้วยตนเอง (Human Error) ออกไป 
          <br/><br/>
          ไม่เพียงเท่านั้น เครื่องมือของเรายังแสดงผลต่างที่แท้จริงให้คุณเห็นด้วย ทำให้คุณสามารถนำข้อมูลไปประกอบการตัดสินใจ หรือจัดทำรายงานสรุปได้อย่างมืออาชีพ และที่สำคัญที่สุดคือ สามารถใช้งานได้ฟรี ไม่มีข้อจำกัด รองรับการทำงานทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ เพื่อให้คุณคำนวณเปอร์เซ็นต์ได้ทุกที่ทุกเวลาที่คุณต้องการ!
        </p>
      </article>
    </div>
  );
}
