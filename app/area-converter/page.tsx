import { Metadata } from "next";
import { AreaUnitConverter } from "../../components/calcs/ConversionCalcs2";

export const metadata: Metadata = {
  title: "วิธีแปลงไร่เป็นตารางเมตร | โปรแกรมคำนวณพื้นที่",
  description: "เครื่องมือคำนวณและวิธีแปลงไร่เป็นตารางเมตร แปลงตารางวาเป็นไร่ ง่ายๆ พร้อมสูตรการคำนวณพื้นที่ที่แม่นยำที่สุด",
  alternates: {
    canonical: '/area-converter',
  }
};

export default function AreaConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-black text-center mb-6 text-gray-900 dark:text-white">เครื่องมือคำนวณพื้นที่ (Area Converter)</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          วิธีแปลงไร่เป็นตารางเมตร งาน ตารางวา และหน่วยพื้นที่สากล เช่น เอเคอร์ (Acre) หรือ เฮกตาร์ (Hectare) 
          คุณสามารถกรอกตัวเลขด้านล่างเพื่อแปลงหน่วยได้ทันที
        </p>
        
        <div className="bg-purple-50/50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800/30">
          <AreaUnitConverter lang="TH" />
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">สูตรการแปลงหน่วยพื้นที่ที่สำคัญ</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>1 ไร่ = 4 งาน = 400 ตารางวา = 1,600 ตารางเมตร</li>
            <li>1 งาน = 100 ตารางวา = 400 ตารางเมตร</li>
            <li>1 ตารางวา = 4 ตารางเมตร</li>
            <li>1 เอเคอร์ (Acre) ≈ 2.529 ไร่ ≈ 4,046.86 ตารางเมตร</li>
            <li>1 เฮกตาร์ (Hectare) = 10,000 ตารางเมตร = 6.25 ไร่</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
