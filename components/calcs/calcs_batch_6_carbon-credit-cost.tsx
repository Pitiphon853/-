import React, { useState } from 'react';
import { Leaf, Calculator, AlertCircle } from 'lucide-react';

const CarbonCreditCostCalculator = ({ lang }: any) => {
  const [emissions, setEmissions] = useState<number>(1000);
  const [reductionTarget, setReductionTarget] = useState<number>(50); // percentage
  const [pricePerTon, setPricePerTon] = useState<number>(300); // THB
  const [certificationCost, setCertificationCost] = useState<number>(50000); // THB

  const requiredCredits = (emissions * reductionTarget) / 100;
  const creditsCost = requiredCredits * pricePerTon;
  const totalCost = creditsCost + certificationCost;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-green-600">
        <Leaf className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณต้นทุนคาร์บอนเครดิต (Carbon Credit Cost)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">การปล่อยก๊าซเรือนกระจก (ตันคาร์บอนเทียบเท่า: tCO2e)</label>
            <input
              type="number"
              value={emissions}
              onChange={(e) => setEmissions(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">เป้าหมายการชดเชย (%)</label>
            <input
              type="number"
              value={reductionTarget}
              onChange={(e) => setReductionTarget(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ราคาคาร์บอนเครดิตต่อตัน (บาท)</label>
            <input
              type="number"
              value={pricePerTon}
              onChange={(e) => setPricePerTon(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ค่าใช้จ่ายอื่นๆ เช่น ค่าที่ปรึกษา/การรับรอง (บาท)</label>
            <input
              type="number"
              value={certificationCost}
              onChange={(e) => setCertificationCost(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2" /> สรุปค่าใช้จ่าย
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">ปริมาณคาร์บอนที่ต้องชดเชย:</span>
              <span className="font-semibold">{requiredCredits.toLocaleString()} tCO2e</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">ต้นทุนซื้อคาร์บอนเครดิต:</span>
              <span className="font-semibold text-blue-600">฿{creditsCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">ค่าที่ปรึกษา/การรับรอง:</span>
              <span className="font-semibold text-orange-500">฿{certificationCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-800">ต้นทุนรวมสุทธิ:</span>
              <span className="text-2xl font-bold text-green-600">฿{totalCost.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-md flex items-start text-sm text-green-800">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              ต้นทุนเฉลี่ยต่อตันของการชดเชยคาร์บอนในโปรเจกต์นี้คือ <strong>฿{(totalCost / (requiredCredits || 1)).toLocaleString(undefined, {maximumFractionDigits: 2})} / ตัน</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-green-700">การคำนวณต้นทุนคาร์บอนเครดิต (Carbon Credit Cost) คืออะไร?</h2>
        <p>
          ในยุคที่ทั่วโลกให้ความสำคัญกับปัญหาการเปลี่ยนแปลงสภาพภูมิอากาศ (Climate Change) การจัดการก๊าซเรือนกระจกกลายเป็นวาระสำคัญของภาคธุรกิจ ไม่ว่าจะเป็นการลดการปล่อยก๊าซเรือนกระจกด้วยตนเองหรือการซื้อ <strong>คาร์บอนเครดิต (Carbon Credit)</strong> เพื่อชดเชยปริมาณการปล่อยก๊าซ (Carbon Offsetting) ดังนั้นการคำนวณ <strong>ต้นทุนคาร์บอนเครดิต</strong> จึงเป็นสิ่งจำเป็นสำหรับการวางแผนทางการเงินและยุทธศาสตร์ความยั่งยืนขององค์กร (ESG)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">คาร์บอนเครดิต (Carbon Credit) คืออะไร?</h3>
        <p>
          คาร์บอนเครดิต คือ สิทธิที่เกิดจากการลดปริมาณการปล่อยก๊าซคาร์บอนไดออกไซด์ หรือก๊าซเรือนกระจกสู่สิ่งแวดล้อม โดย 1 คาร์บอนเครดิต จะเท่ากับการลดการปล่อยก๊าซคาร์บอนไดออกไซด์เทียบเท่า (tCO2e) จำนวน 1 ตัน ธุรกิจที่ไม่สามารถลดการปล่อยก๊าซเรือนกระจกได้ตามเป้าหมาย มักจะต้องซื้อคาร์บอนเครดิตจากองค์กรอื่นที่ทำโครงการลดก๊าซเรือนกระจก (เช่น ปลูกป่า พลังงานสะอาด) เพื่อทำให้องค์กรบรรลุเป้าหมายความเป็นกลางทางคาร์บอน (Carbon Neutrality) หรือ Net Zero
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">วิธีการคำนวณต้นทุนคาร์บอนเครดิต</h3>
        <p>การคำนวณต้นทุนสำหรับคาร์บอนเครดิตของธุรกิจ ประกอบด้วยปัจจัยหลัก ได้แก่:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>ปริมาณการปล่อยก๊าซเรือนกระจก (Total Emissions):</strong> คำนวณจากกิจกรรมทางธุรกิจทั้งหมด (Scope 1, 2, 3) ในหน่วยตันคาร์บอนเทียบเท่า</li>
          <li><strong>สัดส่วนการชดเชยเป้าหมาย (Reduction Target):</strong> เช่น ธุรกิจตั้งเป้าลดก๊าซเรือนกระจก 50% ของที่ปล่อยทั้งหมด</li>
          <li><strong>ราคาต่อตันคาร์บอนเครดิต (Price per Ton):</strong> ราคาตลาดของคาร์บอนเครดิต ซึ่งอาจแตกต่างกันขึ้นอยู่กับชนิดโครงการ (เช่น โครงการป่าไม้ โครงการพลังงานหมุนเวียน) และมาตรฐานที่ใช้รับรอง (เช่น T-VER, VCS, Gold Standard)</li>
          <li><strong>ค่าใช้จ่ายอื่นๆ ในการดำเนินการ (Certification & Verification Costs):</strong> เช่น ค่าจ้างที่ปรึกษาในการประเมิน Carbon Footprint ค่าทวนสอบ (Verification) และขึ้นทะเบียน</li>
        </ul>
        <p className="font-semibold">สมการเบื้องต้น:</p>
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <code>ปริมาณคาร์บอนที่ต้องชดเชย = ปริมาณการปล่อยทั้งหมด × เป้าหมายการชดเชย (%)</code><br/><br/>
          <code>ต้นทุนคาร์บอนเครดิตรวม = (ปริมาณคาร์บอนที่ต้องชดเชย × ราคาต่อตัน) + ค่าใช้จ่ายในการดำเนินการและรับรอง</code>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">ทำไมธุรกิจถึงต้องให้ความสำคัญกับต้นทุนคาร์บอนเครดิต?</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>เพิ่มความสามารถในการแข่งขันและตอบรับกระแสโลก:</strong> คู่ค้าและนักลงทุนระดับโลกมักมีเงื่อนไขด้าน ESG การบรรลุ Carbon Neutrality จะช่วยสร้างความได้เปรียบทางธุรกิจ</li>
          <li><strong>เตรียมพร้อมรับมือกฎหมายและภาษีคาร์บอน:</strong> หลายประเทศเริ่มมีมาตรการบังคับใช้ภาษีคาร์บอน (Carbon Tax) และมาตรการปรับราคาคาร์บอนก่อนข้ามพรมแดน (CBAM) ของสหภาพยุโรป การวางแผนรับมือเรื่องคาร์บอนเครดิตช่วยป้องกันผลกระทบทางภาษีต่อธุรกิจส่งออก</li>
          <li><strong>เสริมสร้างภาพลักษณ์องค์กร:</strong> แบรนด์ที่ใส่ใจสิ่งแวดล้อมมักได้รับความไว้วางใจจากผู้บริโภคมากกว่า</li>
          <li><strong>วางแผนงบประมาณแม่นยำ:</strong> ราคาของคาร์บอนเครดิตในตลาดมีแนวโน้มปรับตัวสูงขึ้นเรื่อยๆ การคาดการณ์ต้นทุนและทยอยลงทุนล่วงหน้าจะช่วยประหยัดค่าใช้จ่ายระยะยาว</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">กลยุทธ์การลดต้นทุนคาร์บอน</h3>
        <p>
          นอกจากใช้เงินทุนในการ "ซื้อ" คาร์บอนเครดิตแล้ว ธุรกิจควรให้ความสำคัญกับการ "ลด" จากต้นทาง เช่น การปรับปรุงประสิทธิภาพการใช้พลังงาน การเปลี่ยนมาใช้พลังงานแสงอาทิตย์ (Solar Rooftop) หรือการจัดการขยะที่ดีขึ้น การทำเช่นนี้ในระยะยาวจะคุ้มค่ากว่าและลดความเสี่ยงจากความผันผวนของราคาคาร์บอนเครดิตในตลาดโลก
        </p>
      </div>
    </div>
  );
};

export default CarbonCreditCostCalculator;
