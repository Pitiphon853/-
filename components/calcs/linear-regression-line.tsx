import React, { useState } from 'react';
import { Calculator, TrendingUp, Info, AlertCircle } from 'lucide-react';

export default function LinearRegressionLine({ lang }: any) {
  const [xValues, setXValues] = useState('');
  const [yValues, setYValues] = useState('');
  const [slopeB, setSlopeB] = useState<number | null>(null);
  const [interceptA, setInterceptA] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const calculateRegression = () => {
    setErrorMsg('');
    const xArray = xValues.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));
    const yArray = yValues.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));

    if (xArray.length === 0 || yArray.length === 0) {
      setErrorMsg(lang === 'EN' ? 'Please enter numeric values.' : 'กรุณาระบุตัวเลขที่ถูกต้อง');
      setSlopeB(null);
      setInterceptA(null);
      return;
    }

    if (xArray.length !== yArray.length) {
      setErrorMsg(lang === 'EN' ? 'The number of X and Y values must be equal.' : 'จำนวนข้อมูลของ X และ Y ต้องเท่ากัน');
      setSlopeB(null);
      setInterceptA(null);
      return;
    }

    if (xArray.length < 2) {
      setErrorMsg(lang === 'EN' ? 'At least 2 pairs of data are required.' : 'ต้องมีข้อมูลอย่างน้อย 2 คู่');
      setSlopeB(null);
      setInterceptA(null);
      return;
    }

    const n = xArray.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += xArray[i];
      sumY += yArray[i];
      sumXY += xArray[i] * yArray[i];
      sumX2 += xArray[i] ** 2;
    }

    const meanX = sumX / n;
    const meanY = sumY / n;

    const numeratorB = (n * sumXY) - (sumX * sumY);
    const denominatorB = (n * sumX2) - (sumX ** 2);

    if (denominatorB === 0) {
      setErrorMsg(lang === 'EN' ? 'Cannot calculate (denominator is 0, X values are constant).' : 'คำนวณไม่ได้ (ค่า X ทั้งหมดมีค่าเท่ากัน)');
      setSlopeB(null);
      setInterceptA(null);
    } else {
      const b = numeratorB / denominatorB;
      const a = meanY - b * meanX;
      setSlopeB(b);
      setInterceptA(a);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-sky-700 flex items-center justify-center gap-3">
        <TrendingUp className="w-8 h-8" />
        {lang === 'EN' ? 'Linear Regression Line Calculator' : 'โปรแกรมคำนวณสมการเส้นถดถอยเชิงเส้น'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
          <h2 className="text-xl font-semibold mb-4 text-sky-800 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {lang === 'EN' ? 'Data Input' : 'ข้อมูลสำหรับการคำนวณ'}
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {lang === 'EN' 
                ? 'Enter comma-separated values for independent (X) and dependent (Y) variables.' 
                : 'ระบุตัวเลขโดยคั่นด้วยเครื่องหมายจุลภาค สำหรับตัวแปรอิสระ (X) และตัวแปรตาม (Y)'}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Independent Variable (X)' : 'ตัวแปรอิสระ (X)'}
              </label>
              <textarea
                rows={3}
                value={xValues}
                onChange={(e) => setXValues(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                placeholder="1, 2, 3, 4, 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'EN' ? 'Dependent Variable (Y)' : 'ตัวแปรตาม (Y)'}
              </label>
              <textarea
                rows={3}
                value={yValues}
                onChange={(e) => setYValues(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                placeholder="2, 4, 5, 4, 5"
              />
            </div>
            
            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              onClick={calculateRegression}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {lang === 'EN' ? 'Calculate Regression Line' : 'คำนวณสมการเส้นถดถอย'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-600" />
            {lang === 'EN' ? 'Regression Line Equation' : 'ผลลัพธ์สมการเส้นถดถอย'}
          </h2>
          {slopeB !== null && interceptA !== null ? (
            <div className="text-center w-full">
              <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">
                {lang === 'EN' ? 'Equation (y = a + bx)' : 'รูปแบบสมการ (y = a + bx)'}
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-sky-600 mb-6 bg-sky-50 p-4 rounded-xl inline-block border border-sky-100">
                y = {interceptA.toFixed(4)} {slopeB >= 0 ? '+' : '-'} {Math.abs(slopeB).toFixed(4)}x
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                  <span className="block text-gray-500 mb-1">{lang === 'EN' ? 'Intercept (a):' : 'จุดตัดแกน Y (a):'}</span>
                  <span className="font-semibold text-lg text-gray-800">{interceptA.toFixed(4)}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                  <span className="block text-gray-500 mb-1">{lang === 'EN' ? 'Slope (b):' : 'ความชัน (b):'}</span>
                  <span className="font-semibold text-lg text-gray-800">{slopeB.toFixed(4)}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 text-left bg-blue-50 p-3 rounded border border-blue-100">
                <strong>{lang === 'EN' ? 'Meaning of Slope:' : 'ความหมายของความชัน (b):'} </strong>
                {lang === 'EN' 
                  ? `For every 1 unit increase in X, Y is expected to ${slopeB >= 0 ? 'increase' : 'decrease'} by ${Math.abs(slopeB).toFixed(4)} units.` 
                  : `หากค่า X เพิ่มขึ้น 1 หน่วย ค่า Y จะ${slopeB >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'}ประมาณ ${Math.abs(slopeB).toFixed(4)} หน่วย`}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{lang === 'EN' ? 'Enter data points to generate linear regression equation.' : 'ระบุข้อมูล X และ Y เพื่อสร้างสมการเส้นถดถอยเชิงเส้น'}</p>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-sky max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">การวิเคราะห์การถดถอยเชิงเส้นอย่างง่าย (Simple Linear Regression) คืออะไร?</h2>
        
        <p>
          ในการวิเคราะห์ข้อมูลทางสถิติเพื่อดูความสัมพันธ์ระหว่างตัวแปรสองตัว การหาค่าสหสัมพันธ์ (Correlation) เพียงอย่างเดียวอาจบอกได้แค่ว่าตัวแปรทั้งสองมีความสัมพันธ์กันหรือไม่ และมีทิศทางอย่างไร แต่ไม่สามารถนำมาใช้ในการพยากรณ์หรือทำนายค่าได้ หากเราต้องการที่จะ <strong>"สร้างโมเดลเพื่อพยากรณ์ค่าของตัวแปรหนึ่ง จากอีกตัวแปรหนึ่ง"</strong> เราจะต้องใช้เทคนิคที่เรียกว่า <strong>การวิเคราะห์การถดถอยเชิงเส้น (Linear Regression Analysis)</strong>
        </p>

        <p>
          <strong>การถดถอยเชิงเส้นอย่างง่าย (Simple Linear Regression)</strong> จะเกี่ยวข้องกับตัวแปร 2 ตัว ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ตัวแปรอิสระ (Independent Variable)</strong> มักแทนด้วย <strong>X</strong> คือ ตัวแปรที่เราใช้เพื่ออธิบายหรือทำนาย (Predictor)</li>
          <li><strong>ตัวแปรตาม (Dependent Variable)</strong> มักแทนด้วย <strong>Y</strong> คือ ตัวแปรเป้าหมายที่เราต้องการทำนายผลลัพธ์ (Response)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">สมการเส้นตรง (Linear Equation)</h3>
        <p>
          เป้าหมายหลักของการวิเคราะห์การถดถอยเชิงเส้นคือ การสร้างสมการเส้นตรงที่ดีที่สุดที่สามารถเป็นตัวแทนของข้อมูลทั้งหมดได้ (Line of Best Fit) โดยสมการจะอยู่ในรูปแบบ:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center font-serif text-xl my-4 text-sky-800 font-bold">
          Y = a + bX
        </div>
        <p><em>(บางตำราอาจเขียนเป็น Y = β0 + β1X หรือ y = mx + c)</em></p>
        
        <p>โดยที่ความหมายของแต่ละตัวแปรคือ:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Y</strong> คือ ค่าที่เราต้องการทำนาย (ตัวแปรตาม)</li>
          <li><strong>X</strong> คือ ค่าที่เรากำหนดหรือตัวแปรอิสระ</li>
          <li><strong>a (Intercept หรือ จุดตัดแกน Y)</strong> คือ ค่าของ Y เมื่อ X มีค่าเท่ากับศูนย์</li>
          <li><strong>b (Slope หรือ ความชัน)</strong> คือ อัตราการเปลี่ยนแปลงของ Y เมื่อ X เปลี่ยนแปลงไป 1 หน่วย</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">วิธีการหาระยะที่น้อยที่สุด (Method of Least Squares)</h3>
        <p>
          ค่าสัมประสิทธิ์การถดถอย a และ b ถูกคำนวณมาจากหลักการทางคณิตศาสตร์ที่เรียกว่า <em>"วิธีกำลังสองน้อยที่สุด" (Ordinary Least Squares - OLS)</em> โดยเส้นตรงที่วาดขึ้นมานั้น จะต้องทำให้ผลรวมของกำลังสองของระยะห่างระหว่างจุดข้อมูลจริงกับเส้นตรง (Error หรือ Residual) มีค่าน้อยที่สุด
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">ประโยชน์และการประยุกต์ใช้งาน</h3>
        <p>
          สมการเส้นถดถอยเชิงเส้นมีประโยชน์อย่างมากในหลากหลายวงการ เช่น:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>การตลาดและธุรกิจ:</strong> พยากรณ์ยอดขายในอนาคต (Y) จากงบประมาณโฆษณา (X)</li>
          <li><strong>การแพทย์:</strong> พยากรณ์ระดับน้ำตาลในเลือด (Y) จากน้ำหนักตัวผู้ป่วย (X)</li>
          <li><strong>ทรัพยากรบุคคล:</strong> ทำนายประสิทธิภาพการทำงาน (Y) จากชั่วโมงการฝึกอบรมที่พนักงานได้รับ (X)</li>
        </ol>
        <p>
          อย่างไรก็ตาม สมการเส้นถดถอยนี้จะใช้ทำนายได้อย่างแม่นยำก็ต่อเมื่อข้อมูลจริงมีลักษณะความสัมพันธ์เป็นแบบเส้นตรง และการทำนายนอกขอบเขตของข้อมูลที่ใช้สร้างโมเดล (Extrapolation) อาจนำไปสู่ความคลาดเคลื่อนที่สูงมากได้
        </p>
      </article>
    </div>
  );
}
