import React, { useState } from 'react';
import { Calculator, Beaker, FlaskConical, Droplets } from 'lucide-react';

export default function AgriChemicalMixRatio({ lang }: { lang: any }) {
  const [labelRatio, setLabelRatio] = useState(20); // cc/g per 20 liters
  const [labelWaterVolume, setLabelWaterVolume] = useState(20); // standard is usually 20L
  const [tankCapacity, setTankCapacity] = useState(200); // liters
  const [tanksNeeded, setTanksNeeded] = useState(1);
  const [bottleSize, setBottleSize] = useState(1000); // cc/g

  // Calculation per tank
  // Chemical per tank = (labelRatio / labelWaterVolume) * tankCapacity
  const chemicalPerTank = labelWaterVolume > 0 ? (labelRatio / labelWaterVolume) * tankCapacity : 0;
  
  // Total chemical needed
  const totalChemical = chemicalPerTank * tanksNeeded;
  
  // Bottles needed
  const bottlesNeeded = bottleSize > 0 ? totalChemical / bottleSize : 0;

  const t = lang === 'EN' ? {
    title: "Agri-Chemical Mix Ratio Calculator",
    inputs: "Mixing Parameters",
    labelRatio: "Chemical Label Dosage (cc or g)",
    labelWaterVolume: "Per Water Volume (Liters)",
    tankCapacity: "Sprayer Tank Capacity (Liters)",
    tanksNeeded: "Number of Tanks to Spray",
    bottleSize: "Bottle/Packaging Size (cc or g)",
    summary: "Mixing Results",
    chemicalPerTank: "Chemical per Tank",
    totalChemical: "Total Chemical Needed",
    bottlesNeeded: "Packaging Needed",
    bottles: "bottles / packs",
    unit: "cc / g",
    desc: "Calculate the precise amount of agricultural chemicals needed for your sprayer tank."
  } : {
    title: "โปรแกรมคำนวณอัตราผสมสารเคมีเกษตร",
    inputs: "ข้อมูลการผสม",
    labelRatio: "อัตราการใช้ตามฉลาก (ซีซี หรือ กรัม)",
    labelWaterVolume: "ต่อน้ำ (ลิตร) (ปกติ 20 ลิตร)",
    tankCapacity: "ความจุถังฉีดพ่น (ลิตร)",
    tanksNeeded: "จำนวนถังที่ต้องการฉีดพ่น",
    bottleSize: "ขนาดบรรจุภัณฑ์ (ซีซี หรือ กรัม)",
    summary: "ผลการคำนวณ",
    chemicalPerTank: "ปริมาณยาที่ต้องใส่ต่อ 1 ถัง",
    totalChemical: "ปริมาณยาทั้งหมดที่ต้องใช้",
    bottlesNeeded: "จำนวนขวด/ซองที่ต้องเตรียม",
    bottles: "ขวด/ซอง",
    unit: "ซีซี / กรัม",
    desc: "คำนวณปริมาณสารเคมี ปุ๋ยเกล็ด หรือฮอร์โมนที่ต้องผสมน้ำต่อถัง เพื่อความแม่นยำและปลอดภัย"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
          <Beaker className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-500" />
            {t.inputs}
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-800 mb-3">อัตราส่วนตามฉลากยา</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labelRatio}</label>
                  <input type="number" value={labelRatio} onChange={(e) => setLabelRatio(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.labelWaterVolume}</label>
                  <input type="number" value={labelWaterVolume} onChange={(e) => setLabelWaterVolume(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.tankCapacity}</label>
                <input type="number" value={tankCapacity} onChange={(e) => setTankCapacity(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.tanksNeeded}</label>
                <input type="number" value={tanksNeeded} onChange={(e) => setTanksNeeded(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.bottleSize}</label>
              <input type="number" value={bottleSize} onChange={(e) => setBottleSize(Number(e.target.value) || 0)} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
              <span className="font-semibold text-purple-800">{t.chemicalPerTank}</span>
              <span className="text-xl font-bold text-purple-600">{chemicalPerTank.toLocaleString(undefined, {maximumFractionDigits: 1})} {t.unit}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700">{t.totalChemical}</span>
              <span className="font-semibold text-blue-700">{totalChemical.toLocaleString(undefined, {maximumFractionDigits: 1})} {t.unit}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{t.bottlesNeeded}</span>
              <span className="font-semibold">{Math.ceil(bottlesNeeded)} {t.bottles}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
            <strong>ข้อควรระวัง:</strong> ควรใส่เครื่องป้องกัน (หน้ากาก ถุงมือ) ทุกครั้งเมื่อผสมสารเคมี และอ่านฉลากอย่างละเอียดก่อนใช้งาน
          </div>
        </div>
      </div>

      <article className="prose prose-purple max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ความสำคัญของการคำนวณอัตราผสมสารเคมีเกษตรให้ถูกต้อง
        </h2>
        
        <p className="mb-4">
          ในการทำเกษตรกรรม ไม่ว่าจะเป็นการฉีดพ่นปุ๋ยทางใบ ฮอร์โมนพืช สารป้องกันกำจัดแมลง หรือสารกำจัดวัชพืช <strong>"อัตราส่วนผสม"</strong> ถือเป็นหัวใจสำคัญที่กำหนดประสิทธิภาพและความปลอดภัยของผลผลิต เกษตรกรหลายท่านมักใช้วิธีการกะตวงด้วยสายตา หรือใช้ช้อนตวงที่ไม่มาตรฐาน ซึ่งอาจก่อให้เกิดผลเสียตามมาอย่างคาดไม่ถึง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ผลกระทบของการผสมสารเคมีผิดอัตราส่วน
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ผสมเข้มข้นเกินไป (Overdosing):</strong> หลายคนมีความเชื่อผิดๆ ว่ายิ่งใส่ยาเยอะ แมลงยิ่งตายเร็ว แต่ในความเป็นจริง การใช้สารเคมีเข้มข้นเกินกว่าที่ฉลากระบุ จะทำให้เกิดอาการ <em>"ใบไหม้"</em> หรือ <em>"พืชชะงักการเจริญเติบโต"</em> (Phytotoxicity) นอกจากนี้ยังเป็นการเพิ่มต้นทุนโดยเปล่าประโยชน์ และทิ้งสารตกค้างในผลผลิตและสิ่งแวดล้อมมากเกินเกณฑ์มาตรฐาน</li>
          <li><strong>ผสมเจือจางเกินไป (Underdosing):</strong> การใส่ยาน้อยเกินไปเพื่อประหยัดต้นทุน จะทำให้ประสิทธิภาพในการกำจัดศัตรูพืชลดลง แมลงหรือเชื้อราไม่ตายสนิท และเป็นสาเหตุหลักที่ทำให้เกิด <em>"การดื้อยา"</em> ในระยะยาว ซึ่งจะทำให้ต้องเปลี่ยนไปใช้ยาที่แรงและแพงขึ้นในอนาคต</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ทำความเข้าใจฉลากสารเคมีเกษตร
        </h3>
        <p className="mb-4">
          โดยทั่วไป บนฉลากสารเคมีจะระบุอัตราการใช้ไว้ในรูปแบบ <strong>ซีซี (cc หรือ ml) ต่อน้ำ 20 ลิตร</strong> หรือ <strong>กรัม (g) ต่อน้ำ 20 ลิตร</strong> เนื่องจากในอดีตเกษตรกรนิยมใช้ถังพ่นยาแบบสะพายหลังที่มีความจุประมาณ 20 ลิตร 
        </p>
        <p className="mb-4">
          แต่ในปัจจุบัน ฟาร์มขนาดใหญ่มีการพัฒนามาใช้ถังพ่นยาลากสายขนาด 200 ลิตร หรือโดรนการเกษตร การเทียบบัญญัติไตรยางศ์เพื่อหาปริมาณยาที่ต้องใส่ต่อถังจึงเป็นสิ่งจำเป็น หากคำนวณผิดพลาดเพียงเล็กน้อย เมื่อคูณกับปริมาณน้ำหลายร้อยลิตร ก็จะกลายเป็นความผิดพลาดระดับหลายขวดได้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ตัวช่วยลดความผิดพลาด: โปรแกรมคำนวณอัตราผสมสารเคมี
        </h3>
        <p className="mb-4">
          เพื่อป้องกันความผิดพลาดจากการคำนวณด้วยตนเอง <em>โปรแกรมคำนวณอัตราผสมสารเคมีเกษตร</em> ของเราออกแบบมาให้ใช้งานง่าย เพียงแค่คุณนำตัวเลขจากฉลากยามาใส่ (เช่น 20 ซีซี ต่อน้ำ 20 ลิตร) และระบุขนาดถังพ่นยาของคุณ (เช่น 200 ลิตร) ระบบจะบอกทันทีว่าคุณต้องตวงยาใส่ถังนั้นปริมาณเท่าใด และยังช่วยคำนวณจำนวนขวดทั้งหมดที่คุณต้องเตรียมไปแปลงเกษตร ทำให้การทำงานรวดเร็ว แม่นยำ และปลอดภัยต่อทั้งพืชผลและตัวเกษตรกรเอง
        </p>
      </article>
    </div>
  );
}
