import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

export default function CompanyRegistrationCost({ lang }: any) {
  const [capital, setCapital] = useState<number | ''>(1000000);
  const [includeStamp, setIncludeStamp] = useState<boolean>(true);
  const [includeCopy, setIncludeCopy] = useState<boolean>(true);
  const [isEregistration, setIsEregistration] = useState<boolean>(false);

  let feeMoc = 0;
  if (capital !== '') {
    feeMoc = isEregistration ? 2750 : 5500;
  }

  const stampDuty = includeStamp ? (capital !== '' ? Math.ceil(capital / 100000) * 10 : 0) : 0; 
  const baseStampDuty = includeStamp ? 250 : 0;
  const copyFee = includeCopy ? 500 : 0; 

  const totalCost = feeMoc + stampDuty + baseStampDuty + copyFee;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Building2 className="mr-2" />
          คำนวณค่าธรรมเนียมจดทะเบียนบริษัท
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ทุนจดทะเบียน (บาท)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น 1000000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isEregistration}
                onChange={(e) => setIsEregistration(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5"
              />
              <span className="text-sm text-gray-700">จดทะเบียนผ่านระบบ e-Registration (ลดค่าธรรมเนียม 50%)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeStamp}
                onChange={(e) => setIncludeStamp(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5"
              />
              <span className="text-sm text-gray-700">รวมค่าอากรแสตมป์ (หนังสือบริคณห์สนธิ, ข้อบังคับ, ใบหุ้น)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCopy}
                onChange={(e) => setIncludeCopy(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5"
              />
              <span className="text-sm text-gray-700">รวมค่ารับรองสำเนาเอกสาร (ประมาณ 500 บาท)</span>
            </label>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">สรุปค่าใช้จ่ายประมาณการ</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>ค่าธรรมเนียมกระทรวงพาณิชย์ (อัตราเหมาจ่าย)</span>
                <span>฿{feeMoc.toLocaleString()}</span>
              </div>
              {includeStamp && (
                <div className="flex justify-between">
                  <span>ค่าอากรแสตมป์โดยประมาณ</span>
                  <span>฿{(stampDuty + baseStampDuty).toLocaleString()}</span>
                </div>
              )}
              {includeCopy && (
                <div className="flex justify-between">
                  <span>ค่ารับรองสำเนาเอกสาร</span>
                  <span>฿{copyFee.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex justify-between items-center text-blue-900 font-bold">
                <span>รวมค่าใช้จ่ายทั้งหมด (โดยประมาณ)</span>
                <span className="text-2xl">฿{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
        <h2>ค่าธรรมเนียมจดทะเบียนบริษัทจำกัด (Company Registration Cost)</h2>
        <p>การเริ่มต้นธุรกิจในรูปแบบของ "บริษัทจำกัด" เป็นก้าวสำคัญที่ช่วยสร้างความน่าเชื่อถือให้กับคู่ค้า และมีการจำกัดความรับผิดชอบของผู้ถือหุ้น แต่หลายคนที่เพิ่งเริ่มต้นอาจมีความกังวลเกี่ยวกับเรื่องค่าใช้จ่ายในการจดทะเบียน ในปัจจุบัน กรมพัฒนาธุรกิจการค้า (DBD) กระทรวงพาณิชย์ ได้มีการปรับปรุงอัตราค่าธรรมเนียมให้เป็นแบบเหมาจ่าย เพื่อความสะดวกและลดภาระแก่ผู้ประกอบการ</p>
        
        <h3>อัตราค่าธรรมเนียมการจดทะเบียนบริษัท (อัปเดตใหม่)</h3>
        <p>ตามกฎกระทรวงกำหนดอัตราค่าธรรมเนียมใหม่ (มีผลบังคับใช้ตั้งแต่ปี 2561 เป็นต้นมา) ได้เปลี่ยนจากการคิดค่าธรรมเนียมตามทุนจดทะเบียน (เดิมคิดทุน 100,000 ละ 500 บาท) มาเป็นการใช้อัตรา <strong>เหมาจ่ายแบบคงที่ (Flat Rate)</strong> เพื่อให้ง่ายต่อการคำนวณและลดค่าใช้จ่ายในการจดทะเบียนตั้งกิจการ โดยมีรายละเอียดดังนี้:</p>
        <ul>
          <li><strong>ค่าธรรมเนียมจดทะเบียนหนังสือบริคณห์สนธิและจัดตั้งบริษัทจำกัด (แบบเหมาจ่าย):</strong> 5,500 บาท (ครอบคลุมทุนจดทะเบียนทุกระดับ)</li>
          <li><strong>ค่ารับรองสำเนาเอกสาร:</strong> หน้าละ 50 บาท (โดยทั่วไปในการจดทะเบียนตั้งบริษัทใหม่จะใช้เอกสารประมาณ 10 หน้า รวมเป็นเงินประมาณ 500 บาท)</li>
          <li><strong>ค่าหนังสือรับรองบริษัท:</strong> ฉบับละ 200 บาท</li>
        </ul>

        <h3>ค่าอากรแสตมป์ที่เกี่ยวข้อง</h3>
        <p>นอกเหนือจากค่าธรรมเนียมของกระทรวงพาณิชย์แล้ว ในกระบวนการจัดตั้งบริษัทยังมีค่าอากรแสตมป์ที่ต้องชำระให้แก่กรมสรรพากร (ซึ่งโดยปกติสามารถซื้อและติดลงในเอกสาร หรือชำระเป็นตัวเงินได้) ได้แก่:</p>
        <ul>
          <li>อากรแสตมป์ติดหนังสือบริคณห์สนธิ: 200 บาท</li>
          <li>อากรแสตมป์ติดข้อบังคับบริษัท: 50 บาท (ถ้ามีข้อบังคับ)</li>
          <li>อากรแสตมป์ติดใบหุ้น: คิดในอัตรา 10 บาท ต่อทุนจดทะเบียนชำระแล้วทุกๆ 100,000 บาท หรือเศษของ 100,000 บาท</li>
        </ul>

        <h3>จดทะเบียนผ่านระบบ e-Registration ประหยัดกว่า</h3>
        <p>เพื่อเป็นการส่งเสริมให้ประชาชนหันมาใช้บริการผ่านช่องทางดิจิทัล กรมพัฒนาธุรกิจการค้าได้มีนโยบายลดหย่อนค่าธรรมเนียมสำหรับการจดทะเบียนนิติบุคคลทางอิเล็กทรอนิกส์ (e-Registration) หากผู้ประกอบการเลือกจดทะเบียนผ่านระบบ e-Registration จะได้รับส่วนลดค่าธรรมเนียมลง 50% ทำให้ค่าธรรมเนียมจดทะเบียนเหมาจ่ายจาก 5,500 บาท ลดเหลือเพียง <strong>2,750 บาท</strong> เท่านั้น ซึ่งช่วยประหยัดต้นทุนตั้งต้นได้อย่างมาก</p>

        <h3>สรุปความคุ้มค่าและคำแนะนำ</h3>
        <p>การเข้าใจถึงโครงสร้างค่าใช้จ่ายในการจดทะเบียนบริษัทจะช่วยให้ผู้ประกอบการสามารถเตรียมเงินทุนได้อย่างถูกต้อง ค่าใช้จ่ายในการจดทะเบียนตามที่กล่าวมาข้างต้นนี้เป็นเพียง "ค่าธรรมเนียมของรัฐและอากรแสตมป์" เท่านั้น หากท่านว่าจ้างสำนักงานบัญชีหรือสำนักงานกฎหมายให้ดำเนินการแทน ก็จะต้องคำนึงถึง "ค่าบริการทางวิชาชีพ" (Service Fee) เพิ่มเติมเข้าไปด้วย ซึ่งมักจะอยู่ระหว่าง 5,000 - 15,000 บาท ขึ้นอยู่กับความซับซ้อนและชื่อเสียงของผู้ให้บริการ</p>
        <p>อย่างไรก็ตาม ด้วยระบบ e-Registration ที่สะดวกและเข้าถึงง่ายขึ้น ผู้ประกอบการหลายรายสามารถศึกษาขั้นตอนและดำเนินการจดทะเบียนด้วยตนเองได้ ซึ่งจะช่วยลดต้นทุนในส่วนของค่าบริการรับจ้างลงไปได้ทั้งหมด ถือเป็นการเริ่มต้นธุรกิจด้วยความคุ้มค่าสูงสุด</p>
      </div>
    </div>
  );
}
