import React, { useState } from 'react';
import { Pentagon, Calculator, RefreshCw, ArrowRight } from 'lucide-react';

export default function AreaPentagonCalculator({ lang = 'TH' }: any) {
  const [side, setSide] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult(null);

    const valSide = parseFloat(side);
    if (isNaN(valSide) || valSide <= 0) {
      setError(lang === 'EN' ? 'Please enter a valid positive number for the side length.' : 'กรุณากรอกความยาวด้านที่ถูกต้องและมากกว่า 0');
      return;
    }

    // Formula: Area = (1/4) * sqrt(5 * (5 + 2*sqrt(5))) * a^2
    // Which simplifies to: (5 * a^2) / (4 * tan(pi/5))
    const area = (5 * Math.pow(valSide, 2)) / (4 * Math.tan(Math.PI / 5));
    setResult(area);
  };

  const reset = () => {
    setSide('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
          <Pentagon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'EN' ? 'Regular Pentagon Area Calculator' : 'เครื่องคิดเลขพื้นที่ห้าเหลี่ยมด้านเท่า'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {lang === 'EN' ? 'Side Length (a)' : 'ความยาวด้าน (a)'}
          </label>
          <input
            type="number"
            value={side}
            onChange={(e) => setSide(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-4 pt-4">
          <button
            onClick={calculate}
            className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{lang === 'EN' ? 'Calculate' : 'คำนวณ'}</span>
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

      {result !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ArrowRight className="w-5 h-5 text-purple-500 mr-2" />
            {lang === 'EN' ? 'Calculation Result' : 'ผลการคำนวณ'}
          </h3>
          <div className="text-4xl font-bold text-purple-600">
            {result.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            <span className="text-xl text-gray-600 ml-2 font-normal">
              {lang === 'EN' ? 'square units' : 'ตารางหน่วย'}
            </span>
          </div>
          
          <div className="mt-4 text-gray-600 text-sm">
            <strong>{lang === 'EN' ? 'Formula used:' : 'สูตรที่ใช้:'}</strong>{' '}
            {lang === 'EN' ? 'Area = (5 × a²) / (4 × tan(π/5))' : 'พื้นที่ = (5 × a²) / (4 × tan(π/5))'}
          </div>
        </div>
      )}

      {lang === 'TH' && (
        <article className="mt-12 prose prose-purple max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">การหาพื้นที่รูปห้าเหลี่ยมด้านเท่ามุมเท่า (Regular Pentagon Area)</h2>
          
          <p>
            เรขาคณิตเป็นศาสตร์ที่ว่าด้วยรูปทรงและมิติต่างๆ ในธรรมชาติและสิ่งปลูกสร้าง หนึ่งในรูปทรงที่มีความสวยงามและสมมาตรอย่างยิ่งคือ <strong>รูปห้าเหลี่ยมด้านเท่ามุมเท่า</strong> (Regular Pentagon) รูปห้าเหลี่ยมชนิดนี้มีคุณสมบัติพิเศษคือ มีด้านทั้งห้าด้านยาวเท่ากันทุกประการ และมุมภายในทุกมุมมีขนาดเท่ากัน ซึ่งมุมภายในแต่ละมุมจะมีขนาดเท่ากับ 108 องศา ส่วนผลรวมของมุมภายในทั้งหมดคือ 540 องศา ความสมมาตรเหล่านี้ทำให้รูปห้าเหลี่ยมถูกนำมาใช้ในงานออกแบบระดับโลกหลายแห่ง ตัวอย่างที่เห็นได้ชัดเจนที่สุดคือ อาคารเดอะเพนตากอน (The Pentagon) ซึ่งเป็นที่ทำการของกระทรวงกลาโหมสหรัฐอเมริกา
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรการหาพื้นที่ห้าเหลี่ยมด้านเท่า</h3>
          <p>
            การคำนวณหาพื้นที่ของรูปห้าเหลี่ยมด้านเท่ามุมเท่าสามารถทำได้ง่ายหากเราทราบความยาวของด้านเพียงด้านเดียว (กำหนดให้เป็นตัวแปร a) เนื่องจากทุกด้านยาวเท่ากัน เราจึงสามารถใช้สูตรทางคณิตศาสตร์ที่อาศัยหลักการของตรีโกณมิติเข้ามาช่วยได้ สูตรการหาพื้นที่คือ:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-semibold">
            พื้นที่ = (5 × a²) / (4 × tan(180°/5))<br />
            หรือเขียนในรูปสัดส่วน: พื้นที่ ≈ 1.7204774 × a²
          </div>
          <p>
            ที่มาของสูตรนี้มาจากการแบ่งรูปห้าเหลี่ยมออกเป็นรูปสามเหลี่ยมหน้าจั่วจำนวน 5 รูป ที่มีจุดยอดร่วมกันที่จุดศูนย์กลางของห้าเหลี่ยม เมื่อหาพื้นที่ของสามเหลี่ยมหน้าจั่ว 1 รูป แล้วนำมาคูณด้วย 5 ก็จะได้พื้นที่รวมของห้าเหลี่ยมด้านเท่ามุมเท่าทั้งหมด
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">การประยุกต์ใช้รูปห้าเหลี่ยมในชีวิตประจำวัน</h3>
          <p>
            รูปห้าเหลี่ยมไม่ได้มีอยู่แค่ในตำราคณิตศาสตร์ แต่ปรากฏให้เห็นในชีวิตประจำวันอย่างแพร่หลาย ตัวอย่างที่คุ้นเคยที่สุดคือ ลูกฟุตบอลแบบดั้งเดิม ซึ่งมีลวดลายประกอบด้วยรูปห้าเหลี่ยมสีดำสลับกับรูปหกเหลี่ยมสีขาว การจัดเรียงเช่นนี้เรียกว่า Truncated icosahedron ซึ่งช่วยให้ลูกฟุตบอลมีรูปทรงกลมมนและแข็งแรง
          </p>
          <p>
            นอกจากนี้ ในธรรมชาติเรายังพบรูปห้าเหลี่ยมได้ในดอกไม้หลายชนิดที่มีกลีบดอก 5 กลีบ เช่น ดอกชบา ดอกพุด หรือพืชจำพวกปลาดาวที่มี 5 แฉก ซึ่งสะท้อนให้เห็นถึงความมหัศจรรย์ของเรขาคณิตในธรรมชาติ สำหรับในงานวิศวกรรมและสถาปัตยกรรม การคำนวณพื้นที่ห้าเหลี่ยมถูกใช้ในการคำนวณปริมาณวัสดุที่ต้องใช้ปูพื้นผิว การออกแบบโครงสร้าง หรือการออกแบบลวดลายกราฟิก (Graphic Design) ให้มีความสมดุลและสวยงาม
          </p>
          <p>
            เครื่องคำนวณพื้นที่รูปห้าเหลี่ยมด้านเท่าที่เราพัฒนาขึ้นนี้ ถูกออกแบบมาให้ใช้งานง่าย เพียงแค่คุณกรอกความยาวของด้าน 1 ด้านลงไป ระบบจะคำนวณหาพื้นที่ทั้งหมดให้ทันทีด้วยความแม่นยำสูง เครื่องมือนี้จึงเหมาะสำหรับนักเรียนที่กำลังศึกษาเรื่องเรขาคณิต สถาปนิก หรือวิศวกรที่ต้องการความรวดเร็วในการประเมินพื้นที่ เพื่อวางแผนงานต่อไปได้อย่างมีประสิทธิภาพ
          </p>
        </article>
      )}
    </div>
  );
}
