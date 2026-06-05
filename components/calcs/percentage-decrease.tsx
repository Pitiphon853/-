"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingDown } from 'lucide-react';

export default function PercentageDecrease({ lang }: any) {
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

    const diff = initial - final;
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
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 sm:p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <TrendingDown className="h-8 w-8" />
              {lang === 'EN' ? 'Percentage Decrease Calculator' : 'เครื่องมือคำนวณการลดลงเป็นเปอร์เซ็นต์'}
            </h2>
            <p className="text-red-100 opacity-90">
              {lang === 'EN' ? 'Calculate how much a value has decreased in percentage.' : 'คำนวณการลดลงหรือการหดตัวของค่าเป็นเปอร์เซ็นต์อย่างง่ายดาย'}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-lg"
                placeholder="200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-lg"
                placeholder="150"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={calculate}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
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
            <div className={`p-6 rounded-xl border-2 transition-all ${difference !== null && parseFloat(difference.replace(/,/g, '')) >= 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
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
                        <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
                          -{result}%
                        </div>
                        <p className="text-red-800">
                          {lang === 'EN' ? `Decreased by ${difference}` : `ลดลง ${difference}`}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                          +{Math.abs(parseFloat(result.replace(/,/g, '')))}%
                        </div>
                        <p className="text-green-800">
                          {lang === 'EN' ? `Actually increased by ${Math.abs(parseFloat(difference.replace(/,/g, '')))}` : `กลับเพิ่มขึ้น ${Math.abs(parseFloat(difference.replace(/,/g, '')))}`}
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

      <article className="prose prose-red max-w-none bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          เครื่องมือคำนวณการลดลงเป็นเปอร์เซ็นต์ (Percentage Decrease Calculator)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          ยินดีต้อนรับสู่ <strong>เครื่องมือคำนวณการลดลงเป็นเปอร์เซ็นต์ (Percentage Decrease Calculator)</strong> สำหรับใครก็ตามที่ต้องการทราบว่าตัวเลขหรือมูลค่าต่างๆ ลดลงกี่เปอร์เซ็นต์จากค่าเริ่มต้น เครื่องมือนี้คือคำตอบสำหรับคุณ! การหาเปอร์เซ็นต์ที่ลดลงนั้นมีประโยชน์อย่างมากในหลายมิติของชีวิต ไม่ว่าจะเป็นการคำนวณส่วนลดสินค้าในช่วงโปรโมชั่น การประเมินการลดน้ำหนักของตนเอง หรือแม้แต่การวิเคราะห์ต้นทุนทางธุรกิจที่ลดลง เครื่องมือของเราจะทำให้เรื่องตัวเลขที่ดูซับซ้อน กลายเป็นเรื่องง่ายในชั่วพริบตา
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">การลดลงเป็นเปอร์เซ็นต์ คืออะไร?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>การลดลงเป็นเปอร์เซ็นต์ (Percentage Decrease)</strong> คือการประเมินสัดส่วนการลดลงของปริมาณจากจุดเริ่มต้น โดยเทียบเป็นร้อยละ (%) การแสดงผลลัพธ์ในรูปแบบเปอร์เซ็นต์ช่วยให้เราเปรียบเทียบการเปลี่ยนแปลงของข้อมูลที่มีขนาดแตกต่างกันได้อย่างมีประสิทธิภาพ เช่น การที่คุณซื้อเสื้อที่มีราคา 1,000 บาท แล้วได้ส่วนลด 200 บาท คิดเป็นส่วนลด 20% เมื่อเทียบกับการที่คุณซื้อรถยนต์ราคา 1,000,000 บาท แล้วได้ส่วนลด 200,000 บาท ก็คิดเป็น 20% เท่ากัน ซึ่งร้อยละจะเป็นตัวบ่งชี้สัดส่วนการลดลงได้อย่างสมมาตร
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">สูตรการคำนวณการลดลงเป็นเปอร์เซ็นต์</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          การคำนวณหาเปอร์เซ็นต์การลดลงนั้น ใช้หลักการคล้ายคลึงกับการหาเปอร์เซ็นต์เพิ่มขึ้น โดยนำผลต่างของการลดลงมาเทียบกับค่าเริ่มต้น ซึ่งสูตรมาตรฐานที่ใช้ในการคำนวณคือ:
        </p>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <p className="font-mono text-lg text-center font-bold text-gray-800">
            เปอร์เซ็นต์การลดลง = ((ค่าเริ่มต้น - ค่าสุดท้าย) / ค่าเริ่มต้น) × 100
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>ขั้นตอนการคำนวณด้วยตนเอง:</strong><br/>
          1. หาผลต่างการลดลง โดยนำ <strong>ค่าเริ่มต้น (Initial Value)</strong> ลบด้วย <strong>ค่าสุดท้าย (Final Value)</strong><br/>
          2. นำผลต่างส่วนที่ลดลงมาหารด้วย <strong>ค่าเริ่มต้น (Initial Value)</strong> เสมอ<br/>
          3. นำผลลัพธ์จากการหารไปคูณด้วย 100 จะได้ค่าเปอร์เซ็นต์การลดลงที่ถูกต้อง
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ตัวอย่างการใช้งานเพื่อการคำนวณจริง</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          เพื่อให้คุณเห็นภาพการประยุกต์ใช้ในสถานการณ์ต่างๆ ขอยกตัวอย่างดังนี้:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
          <li>
            <strong>ตัวอย่างโปรโมชั่นสินค้า:</strong> สมาร์ทโฟนรุ่นใหม่ ปกติราคา 30,000 บาท จัดโปรโมชั่นลดราคาเหลือเพียง 24,000 บาท<br/>
            วิธีคิด: ((30,000 - 24,000) / 30,000) × 100 = (6,000 / 30,000) × 100 = <strong>20%</strong><br/>
            <em>แปลว่าคุณได้รับส่วนลดในการซื้อสมาร์ทโฟนเครื่องนี้ 20% จากราคาเต็ม</em>
          </li>
          <li>
            <strong>ตัวอย่างการลดน้ำหนัก:</strong> คุณตั้งเป้าหมายลดน้ำหนัก โดยน้ำหนักเดิมอยู่ที่ 80 กิโลกรัม หลังจากออกกำลังกาย น้ำหนักลดลงเหลือ 72 กิโลกรัม<br/>
            วิธีคิด: ((80 - 72) / 80) × 100 = (8 / 80) × 100 = <strong>10%</strong><br/>
            <em>แปลว่าคุณสามารถลดน้ำหนักตัวลงไปได้แล้วถึง 10% ซึ่งเป็นผลลัพธ์ที่ดีเยี่ยม!</em>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">ทำไมคุณจึงควรใช้เครื่องมือของเรา?</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          แทนที่คุณจะต้องมากดเครื่องคิดเลขหลายขั้นตอน หรือเสี่ยงกับความผิดพลาดจากการป้อนตัวเลขผิด เครื่องมือ <strong>Percentage Decrease Calculator</strong> ของเราพร้อมช่วยให้คุณได้คำตอบในเสี้ยววินาที เพียงกรอกค่าเริ่มต้นและค่าสุดท้าย เครื่องมือจะแสดงผลลัพธ์ของเปอร์เซ็นต์ที่ลดลง พร้อมสรุปส่วนต่างของค่า (Difference) ให้เห็นชัดเจน 
          <br/><br/>
          เครื่องมือนี้ถูกออกแบบให้ใช้งานง่าย รวดเร็ว และรองรับตัวเลขขนาดใหญ่หรือตัวเลขที่มีจุดทศนิยมได้อย่างแม่นยำ ไม่ว่าจะเป็นการเช็คส่วนลดสินค้า หรือทำรายงานประเมินผล เครื่องมือของเราจะทำให้ทุกอย่างรวดเร็วและถูกต้อง 100%
        </p>
      </article>
    </div>
  );
}
