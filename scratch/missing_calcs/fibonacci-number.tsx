"use client";

import React, { useState } from 'react';
import { Hash } from 'lucide-react';

export default function FibonacciNumber({ lang }: { lang: 'th' | 'en' }) {
  const [n, setN] = useState<number | ''>('');

  const t = {
    title: lang === 'th' ? 'คำนวณหาเลขฟีโบนัชชี' : 'Fibonacci Number Calculator',
    desc: lang === 'th' ? 'หาค่าลำดับฟีโบนัชชีที่ตำแหน่ง N' : 'Find the Fibonacci sequence value at position N',
    inputN: lang === 'th' ? 'ตำแหน่งที่ N (0 ถึง 1000)' : 'Position N (0 to 1000)',
    calcBtn: lang === 'th' ? 'คำนวณ' : 'Calculate',
    result: lang === 'th' ? 'ค่าฟีโบนัชชีที่ N =' : 'Fibonacci value at N =',
    error: lang === 'th' ? 'โปรดระบุค่า N ระหว่าง 0 ถึง 1000' : 'Please enter N between 0 and 1000',
  };

  const calculateFibonacci = (nTerm: number): string => {
    if (nTerm < 0) return t.error;
    if (nTerm === 0) return '0';
    if (nTerm === 1) return '1';
    
    let a = BigInt(0);
    let b = BigInt(1);
    let c = BigInt(1);
    
    for (let i = 2; i <= nTerm; i++) {
      c = a + b;
      a = b;
      b = c;
    }
    
    return c.toString();
  };

  const handleCalculate = () => {
    // calculation happens on render based on state to stay reactive,
    // but we can just use the state directly.
  };

  const isInvalid = typeof n === 'number' && (n < 0 || n > 1000 || !Number.isInteger(n));
  const result = typeof n === 'number' && !isInvalid ? calculateFibonacci(n) : '';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Hash className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t.inputN}
          </label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value === '' ? '' : Number(e.target.value))}
            min="0"
            max="1000"
            className="w-full sm:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {isInvalid && typeof n === 'number' && (
          <p className="text-red-500 text-sm">{t.error}</p>
        )}

        {result && (
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-blue-900 mb-2">{t.result} {n}</h3>
            <p className="text-xl sm:text-2xl text-blue-950 font-bold break-words">{result}</p>
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">ลำดับฟีโบนัชชี (Fibonacci Sequence) คืออะไร?</h2>
        <p>
          ลำดับฟีโบนัชชี (Fibonacci Sequence) เป็นหนึ่งในชุดตัวเลขที่มีชื่อเสียงและพบได้บ่อยที่สุดในคณิตศาสตร์และธรรมชาติ 
          มันถูกนำเสนอโดยนักคณิตศาสตร์ชาวอิตาลีที่ชื่อว่า Leonardo of Pisa หรือที่รู้จักในนาม <strong>Fibonacci</strong> 
          โดยลำดับนี้มีกฎการสร้างที่เรียบง่ายมาก นั่นคือ <em>"ตัวเลขในลำดับถัดไป จะเท่ากับผลบวกของตัวเลขสองตัวก่อนหน้าเสมอ"</em>
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">สูตรทางคณิตศาสตร์ของฟีโบนัชชี</h3>
        <p>
          หากเรากำหนดให้ <code>F(n)</code> เป็นตัวเลขฟีโบนัชชีที่ตำแหน่ง n เราสามารถเขียนความสัมพันธ์ในรูปแบบความสัมพันธ์เวียนเกิด (Recurrence Relation) ได้ดังนี้:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg my-4 overflow-x-auto">
          <code>
            F(0) = 0<br/>
            F(1) = 1<br/>
            F(n) = F(n-1) + F(n-2) เมื่อ n &ge; 2
          </code>
        </div>
        <p>
          จากสูตรดังกล่าว เมื่อเราลองไล่ลำดับตัวเลขออกมา จะได้ชุดตัวเลขดังนี้:<br />
          <strong>0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, ...</strong>
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">อัตราส่วนทองคำ (Golden Ratio) และความเชื่อมโยงกับฟีโบนัชชี</h3>
        <p>
          ความน่าทึ่งของลำดับฟีโบนัชชีไม่ได้หยุดอยู่แค่การบวกตัวเลข แต่หากเรานำตัวเลขฟีโบนัชชีที่ติดกัน (ตัวหลังหารด้วยตัวหน้า) มาหารกัน เช่น 13/8, 21/13, 34/21 
          ยิ่งเราใช้ตัวเลขที่อยู่ในตำแหน่งที่สูงขึ้นเท่าไร ผลหารที่ได้จะยิ่งลู่เข้าหาค่าคงที่ค่าหนึ่งเสมอ นั่นคือประมาณ <strong>1.6180339887...</strong> 
          ซึ่งตัวเลขนี้ถูกขนานนามว่า <strong>อัตราส่วนทองคำ (Golden Ratio)</strong> หรือแทนด้วยสัญลักษณ์ &phi; (Phi)
        </p>
        <p>
          อัตราส่วนทองคำได้รับการยอมรับว่าเป็นสัดส่วนที่มีความสวยงามมากที่สุดในเชิงสุนทรียศาสตร์ ศิลปินและสถาปนิกหลายยุคหลายสมัยได้นำสัดส่วนนี้ไปใช้ในผลงานของตน 
          ไม่ว่าจะเป็นวิหารพาร์เธนอน ภาพวาดโมนาลิซ่า ไปจนถึงการออกแบบโลโก้ของแบรนด์ดังในยุคปัจจุบัน
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ฟีโบนัชชีในธรรมชาติ (Fibonacci in Nature)</h3>
        <p>
          นอกจากในวงการศิลปะและคณิตศาสตร์แล้ว เรายังสามารถพบเจอลำดับฟีโบนัชชีได้ในธรรมชาติรอบตัวเรา เช่น:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>เกลียวของเมล็ดทานตะวัน:</strong> หากนับจำนวนเกลียวที่หมุนตามเข็มนาฬิกาและทวนเข็มนาฬิกาบนดอกทานตะวัน มักจะพบว่าเป็นตัวเลขที่อยู่ในลำดับฟีโบนัชชีเสมอ (เช่น 34 และ 55)</li>
          <li><strong>กลีบดอกไม้:</strong> ดอกไม้หลายชนิดมีจำนวนกลีบตรงกับเลขฟีโบนัชชี เช่น ดอกลิลลี่มี 3 กลีบ ดอกบัตเตอร์คัพมี 5 กลีบ ดอกเดลฟินเนียมมี 8 กลีบ เป็นต้น</li>
          <li><strong>เปลือกหอยนอติลุส (Nautilus shell):</strong> การขยายตัวของเปลือกหอยมีลักษณะเป็นรูปเกลียวล็อกการิทึมที่เติบโตด้วยสัดส่วนของอัตราส่วนทองคำ</li>
          <li><strong>ตากระบองเพชรและตาสับปะรด:</strong> มีการเรียงตัวเป็นเกลียวที่สอดคล้องกับลำดับฟีโบนัชชีเช่นกัน</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">การประยุกต์ใช้ในวิทยาการคอมพิวเตอร์</h3>
        <p>
          ลำดับฟีโบนัชชียังเป็นหัวข้อที่นิยมนำมาใช้ในการเรียนการสอนวิทยาการคอมพิวเตอร์และการเขียนโปรแกรม เนื่องจากเป็นตัวอย่างที่ชัดเจนในการอธิบายแนวคิดเรื่อง ฟังก์ชันเวียนเกิด (Recursion) 
          และการใช้กำหนดการพลวัต (Dynamic Programming) เพื่อลดเวลาประมวลผลอัลกอริทึม นอกจากนี้ยังมีโครงสร้างข้อมูลอย่าง Fibonacci Heap ที่ใช้ในการปรับปรุงประสิทธิภาพของอัลกอริทึมด้านกราฟ (เช่น Dijkstra's Algorithm) อีกด้วย
        </p>

        <p className="mt-4">
          ด้วยโปรแกรมคำนวณหาเลขฟีโบนัชชีหน้านี้ คุณสามารถตรวจสอบและหาค่าของตัวเลขฟีโบนัชชีในตำแหน่งต่างๆ ได้อย่างรวดเร็ว (รองรับค่า N จำนวนมากด้วยระบบ BigInt) หวังว่าเครื่องมือนี้จะเป็นประโยชน์ทั้งในด้านการศึกษาและงานวิจัยของคุณครับ
        </p>
      </article>
    </div>
  );
}
