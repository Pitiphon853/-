import React, { useState } from 'react';
import { BarChart } from 'lucide-react';

export default function FiveNumberSummary({ lang }: any) {
  const [dataInput, setDataInput] = useState<string>('');
  const [summary, setSummary] = useState<{
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    sorted: number[];
  } | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    
    // Parse input
    const numStrings = dataInput.split(/[\s,]+/).filter(s => s.trim() !== '');
    const nums = numStrings.map(s => parseFloat(s)).filter(n => !isNaN(n));

    if (nums.length < 3) {
      setError('กรุณาป้อนชุดข้อมูลตัวเลขอย่างน้อย 3 ตัวขึ้นไป โดยคั่นด้วยช่องว่างหรือเครื่องหมายจุลภาค (,)');
      setSummary(null);
      return;
    }

    // Sort numbers ascending
    const sorted = [...nums].sort((a, b) => a - b);
    
    // Helper function to find median
    const getMedian = (arr: number[]) => {
      const mid = Math.floor(arr.length / 2);
      if (arr.length % 2 === 0) {
        return (arr[mid - 1] + arr[mid]) / 2;
      }
      return arr[mid];
    };

    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const median = getMedian(sorted);

    // Find Q1 and Q3 based on standard statistical method (splitting array into two halves)
    // There are a few methods for Q1/Q3, we'll use the exclusive method 
    // (excluding median if n is odd) which is common in many textbooks.
    const midIndex = Math.floor(sorted.length / 2);
    let lowerHalf: number[];
    let upperHalf: number[];

    if (sorted.length % 2 === 0) {
      lowerHalf = sorted.slice(0, midIndex);
      upperHalf = sorted.slice(midIndex);
    } else {
      lowerHalf = sorted.slice(0, midIndex);
      upperHalf = sorted.slice(midIndex + 1);
    }

    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);

    setSummary({ min, q1, median, q3, max, sorted });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex items-center space-x-4 mb-6">
        <BarChart className="w-8 h-8 text-orange-600" />
        <h1 className="text-2xl font-bold text-gray-800">เครื่องมือคำนวณสรุปข้อมูล 5 ค่า (Five-Number Summary)</h1>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          กรอกชุดตัวเลขของคุณ (คั่นด้วยช่องว่าง หรือ ลูกน้ำ)
        </label>
        <textarea
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 min-h-[100px]"
          placeholder="เช่น 15, 20, 22, 25, 30, 31, 35, 40, 45, 50"
        />
        <button
          onClick={calculate}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          คำนวณค่าสถิติ
        </button>

        {error && (
          <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}
      </div>

      {summary && (
        <div className="mt-8 bg-orange-50 p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">ผลลัพธ์การสรุปข้อมูล 5 ค่า</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-white p-4 rounded shadow-sm border border-orange-100">
              <p className="text-xs text-gray-500 mb-1">ค่าต่ำสุด (Min)</p>
              <p className="text-xl font-bold text-orange-700">{summary.min}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-orange-100">
              <p className="text-xs text-gray-500 mb-1">ควอร์ไทล์ที่ 1 (Q1)</p>
              <p className="text-xl font-bold text-orange-700">{summary.q1}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-orange-100 col-span-2 md:col-span-1">
              <p className="text-xs text-gray-500 mb-1">มัธยฐาน (Median/Q2)</p>
              <p className="text-xl font-bold text-orange-700">{summary.median}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-orange-100">
              <p className="text-xs text-gray-500 mb-1">ควอร์ไทล์ที่ 3 (Q3)</p>
              <p className="text-xl font-bold text-orange-700">{summary.q3}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-orange-100">
              <p className="text-xs text-gray-500 mb-1">ค่าสูงสุด (Max)</p>
              <p className="text-xl font-bold text-orange-700">{summary.max}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-orange-200">
            <p className="text-sm text-gray-600 font-medium mb-2">ข้อมูลที่เรียงลำดับแล้ว (จำนวน {summary.sorted.length} ค่า):</p>
            <p className="text-sm text-gray-500 break-all">{summary.sorted.join(', ')}</p>
          </div>
        </div>
      )}

      <article className="mt-12 prose prose-slate max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การสรุปข้อมูล 5 ค่า (Five-Number Summary) คืออะไร?</h2>
        <p>
          ในการศึกษาสถิติเชิงพรรณนา (Descriptive Statistics) <strong>การสรุปข้อมูล 5 ค่า (Five-Number Summary)</strong> เป็นชุดของค่าสถิติเชิงปริมาณที่ใช้เพื่อให้ภาพรวมของการแจกแจงข้อมูล (Distribution) ของชุดข้อมูลหนึ่งๆ ซึ่งช่วยให้นักสถิติและนักวิจัยสามารถเข้าใจลักษณะเด่น การกระจายตัว และแนวโน้มศูนย์กลางของข้อมูลได้อย่างรวดเร็ว โดยไม่จำเป็นต้องพิจารณาตัวเลขดิบทุกตัว
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">องค์ประกอบของสรุป 5 ค่า</h3>
        <p>
          การสรุปข้อมูลแบบ 5 ค่า ประกอบไปด้วยค่าทางสถิติ 5 ตัว ซึ่งต้องทำการเรียงลำดับข้อมูลทั้งหมดจากน้อยไปหามากเสียก่อน ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>1. ค่าต่ำสุด (Minimum):</strong> ค่าที่น้อยที่สุดในชุดข้อมูลทั้งหมด บ่งบอกถึงจุดเริ่มต้นของการกระจายตัว</li>
          <li><strong>2. ควอร์ไทล์ที่ 1 (First Quartile - Q1):</strong> คือค่ามัธยฐานของครึ่งล่างของข้อมูล แสดงถึงตำแหน่งที่ข้อมูล 25% แรกมีค่าน้อยกว่าหรือเท่ากับค่านี้</li>
          <li><strong>3. มัธยฐาน หรือ ควอร์ไทล์ที่ 2 (Median / Q2):</strong> ค่าที่อยู่ตรงกลางของชุดข้อมูลพอดี แสดงว่ามีข้อมูล 50% ที่น้อยกว่า และอีก 50% ที่มากกว่าค่านี้ เป็นตัวแทนของค่ากลางชุดข้อมูล</li>
          <li><strong>4. ควอร์ไทล์ที่ 3 (Third Quartile - Q3):</strong> คือค่ามัธยฐานของครึ่งบนของข้อมูล แสดงถึงตำแหน่งที่ข้อมูล 75% แรกมีค่าน้อยกว่าหรือเท่ากับค่านี้ (หรืออีก 25% ที่เหลือมีค่ามากกว่า)</li>
          <li><strong>5. ค่าสูงสุด (Maximum):</strong> ค่าที่มากที่สุดในชุดข้อมูลทั้งหมด บ่งบอกถึงจุดสิ้นสุดของการกระจายตัว</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การนำไปประยุกต์ใช้: แผนภาพกล่อง (Box Plot)</h3>
        <p>
          ประโยชน์ที่สำคัญที่สุดของการสรุปข้อมูล 5 ค่า คือการนำไปใช้สร้างกราฟที่เรียกว่า <strong>แผนภาพกล่อง (Box Plot หรือ Box-and-Whisker Plot)</strong> 
        </p>
        <p>
          ในแผนภาพกล่อง กล่องสี่เหลี่ยมตรงกลางจะถูกสร้างขึ้นโดยมีขอบล่างอยู่ที่ Q1 และขอบบนอยู่ที่ Q3 ความกว้างของกล่องนี้เรียกว่า <strong>พิสัยระหว่างควอร์ไทล์ (Interquartile Range: IQR = Q3 - Q1)</strong> ซึ่งแสดงถึงการกระจายตัวของข้อมูล 50% ตรงกลาง เส้นขีดตรงกลางกล่องคือมัธยฐาน (Median) ส่วนเส้นที่ลากยื่นออกไป (Whiskers) จะลากไปหาค่าต่ำสุดและค่าสูงสุด (หรือในบางกรณีจะลากไปยังค่าที่ไม่ใช่ Outlier หรือ ค่าผิดปกติ)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ความสำคัญในการวิเคราะห์ข้อมูล</h3>
        <p>
          การสรุป 5 ค่านี้ มีข้อดีกว่าการใช้แค่ค่าเฉลี่ย (Mean) และส่วนเบี่ยงเบนมาตรฐาน (Standard Deviation) อย่างมาก ในกรณีที่ชุดข้อมูลมี<strong>การแจกแจงแบบเบ้ (Skewed Distribution)</strong> หรือมี<strong>ค่าผิดปกติ (Outliers)</strong> มากเกินไป 
        </p>
        <p>
          ค่าเฉลี่ยมักจะถูกดึงให้บิดเบือนไปตามค่า Outlier ที่สูงมากหรือต่ำมากๆ แต่ค่ามัธยฐานและควอร์ไทล์ (ซึ่งอิงจากตำแหน่งและอันดับของข้อมูล) จะได้รับผลกระทบจากค่าเหล่านี้ได้ยากกว่า (Robustness) การดูว่าค่ามัธยฐานค่อนไปทาง Q1 หรือ Q3 มากกว่ากัน ช่วยให้เราทราบถึงลักษณะความเบ้ซ้าย-ขวาของข้อมูลได้อย่างรวดเร็ว
        </p>
        <p>
          เครื่องคำนวณออนไลน์นี้สร้างขึ้นเพื่ออำนวยความสะดวกในการหารายละเอียด 5 ค่าทางสถิตินี้โดยอัตโนมัติ ช่วยประหยัดเวลาในการนั่งเรียงลำดับชุดตัวเลขจำนวนมาก และลดข้อผิดพลาดในการหาตำแหน่งของควอร์ไทล์ตามทฤษฎีได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </div>
  );
}
