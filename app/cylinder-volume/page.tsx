import { Metadata } from "next";
import { VolumeShapeCalculator } from "../../components/calcs/ConversionCalcs2";

export const metadata: Metadata = {
  title: "สูตรหาปริมาตรทรงกระบอก | โปรแกรมคำนวณปริมาตร",
  description: "เครื่องมือคำนวณสูตรหาปริมาตรทรงกระบอก ทรงกลม และกล่องสี่เหลี่ยม กรอกตัวเลขแล้วรู้ผลทันที พร้อมวิธีคำนวณ",
  alternates: {
    canonical: '/cylinder-volume',
  }
};

export default function CylinderVolumePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-black text-center mb-6 text-gray-900 dark:text-white">สูตรหาปริมาตรทรงกระบอก</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          โปรแกรมช่วยคำนวณปริมาตรของรูปทรง 3 มิติ เช่น ทรงกระบอก (Cylinder), กล่องสี่เหลี่ยม (Box) และ ทรงกลม (Sphere) 
          คุณสามารถเลือกรูปทรงและกรอกตัวเลขเพื่อคำนวณความจุได้ทันที
        </p>
        
        <div className="bg-purple-50/50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800/30">
          <VolumeShapeCalculator lang="TH" />
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">สูตรการหาปริมาตรที่พบบ่อย</h3>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>สูตรหาปริมาตรทรงกระบอก:</strong> ปริมาตร = πr²h 
              <br/><em>(พาย x รัศมีกำลังสอง x ความสูง) โดยที่ π ≈ 3.14159</em>
            </li>
            <li>
              <strong>สูตรหาปริมาตรกล่องสี่เหลี่ยม:</strong> ปริมาตร = กว้าง x ยาว x สูง
            </li>
            <li>
              <strong>สูตรหาปริมาตรทรงกลม:</strong> ปริมาตร = (4/3)πr³
              <br/><em>(สี่ส่วนสาม x พาย x รัศมีกำลังสาม)</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
