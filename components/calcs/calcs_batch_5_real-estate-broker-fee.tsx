import React, { useState } from 'react';
import { Home, Calculator, DollarSign, Percent, FileText, CheckCircle, Info } from 'lucide-react';

export default function RealEstateBrokerFeeCalculator({ lang }: any) {
  const [propertyPrice, setPropertyPrice] = useState<number>(3000000);
  const [commissionRate, setCommissionRate] = useState<number>(3);
  
  const [hasVat, setHasVat] = useState<boolean>(true);
  const [hasWht, setHasWht] = useState<boolean>(true);
  const [whtRate, setWhtRate] = useState<number>(3); // 3% สำหรับนิติบุคคล 5% อาชีพนายหน้าบุคคล

  const commissionBase = propertyPrice * (commissionRate / 100);
  const vatAmount = hasVat ? commissionBase * 0.07 : 0;
  const whtAmount = hasWht ? commissionBase * (whtRate / 100) : 0;
  
  const netPayable = commissionBase + vatAmount - whtAmount;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mx-auto mb-4">
          <Home className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Real Estate Broker Fee Calculator</h2>
        <p className="text-gray-600">คำนวณค่านายหน้าขายอสังหาริมทรัพย์ (คอมมิชชั่น) พร้อมภาษี</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-purple-500" />
            ข้อมูลการซื้อขาย (ฝั่งผู้ขายจ่าย)
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ราคาขายอสังหาริมทรัพย์ (Property Price)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-semibold text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อัตราค่านายหน้า (Commission %)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">มาตรฐานทั่วไปคือ 3% ของราคาขาย</p>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h4 className="text-sm font-medium text-gray-700">การตั้งค่าภาษีสำหรับนายหน้า</h4>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={hasVat}
                  onChange={(e) => setHasVat(e.target.checked)}
                  className="mt-1 h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <strong>มี VAT 7%</strong> <br/>
                  (กรณีบริษัทนายหน้าจดทะเบียนภาษีมูลค่าเพิ่ม)
                </span>
              </label>

              <div>
                <label className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    checked={hasWht}
                    onChange={(e) => setHasWht(e.target.checked)}
                    className="mt-1 h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <strong>มีภาษีหัก ณ ที่จ่าย (Withholding Tax)</strong>
                  </span>
                </label>
                
                {hasWht && (
                  <div className="ml-6 flex items-center space-x-4">
                    <label className="flex items-center text-sm">
                      <input type="radio" checked={whtRate === 3} onChange={() => setWhtRate(3)} className="mr-1 text-purple-600 focus:ring-purple-500" />
                      3% (นิติบุคคล)
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="radio" checked={whtRate === 5} onChange={() => setWhtRate(5)} className="mr-1 text-purple-600 focus:ring-purple-500" />
                      5% (บุคคลธรรมดา)
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              สรุปยอดรับเงินนายหน้า
            </h3>
            
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>ค่านายหน้าก่อนหักภาษี (Gross Commission)</span>
                <span className="font-semibold">฿{commissionBase.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              {hasVat && (
                <div className="flex justify-between text-gray-600">
                  <span>บวก: VAT 7%</span>
                  <span>+ ฿{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              
              {hasWht && (
                <div className="flex justify-between text-red-600">
                  <span>หัก: ภาษี ณ ที่จ่าย ({whtRate}%)</span>
                  <span>- ฿{whtAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
              <p className="text-sm text-gray-500 mb-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                ยอดเงินสุทธิที่นายหน้าจะได้รับ (Net Payable)
              </p>
              <p className="text-3xl font-bold text-purple-700">
                ฿{netPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              <strong>ความรู้:</strong> หากผู้ขายเป็นบริษัท(นิติบุคคล) จ้างนายหน้าบุคคลธรรมดา จะถูกหักภาษี ณ ที่จ่าย 5% ของค่านายหน้า แต่ถ้านายหน้าทำในรูปแบบบริษัท จะถูกหักเพียง 3%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-purple max-w-none">
        <h2>ค่านายหน้าอสังหาริมทรัพย์ (Broker Fee) คิดกันอย่างไร?</h2>
        <p>
          อาชีพนายหน้าอสังหาริมทรัพย์ หรือ เอเจนต์ (Real Estate Agent / Broker) เป็นอาชีพที่ได้ผลตอบแทนตามผลงาน (Commission-based) โดยทำหน้าที่เป็นตัวกลางในการเจรจา จับคู่ระหว่าง "ผู้ขาย" (หรือผู้ให้เช่า) และ "ผู้ซื้อ" (หรือผู้เช่า) ให้บรรลุข้อตกลงกัน 
        </p>

        <h3>1. อัตรามาตรฐานสำหรับ "การขาย" (Sale)</h3>
        <p>
          ในตลาดอสังหาริมทรัพย์ของประเทศไทย เรตมาตรฐานที่เป็นที่ยอมรับทั่วไปสำหรับค่านายหน้าขายบ้าน คอนโด หรือที่ดิน คือ <strong>3% ของราคาขาย</strong> (บางแห่งอาจคิดจากราคาประเมิน หรือราคาที่ตกลงกันในสัญญา แล้วแต่เงื่อนไขที่ตกลงไว้ในสัญญาปิด/สัญญาเปิด)
        </p>
        <p>
          อย่างไรก็ตาม เรตนี้อาจมีการปรับเปลี่ยนได้ เช่น 
          หากเป็นทรัพย์สินที่มีมูลค่าสูงมากๆ (ระดับ 100 ล้านบาทขึ้นไป) นายหน้าและผู้ขายอาจตกลงกันที่เรต 2% 
          หรือในทางกลับกัน หากเป็นทรัพย์ที่ขายยาก (เช่น ที่ดินตาบอด) ผู้ขายอาจตั้งรางวัลพิเศษเพิ่มให้เป็น 4-5% เพื่อจูงใจเอเจนต์
        </p>

        <h3>2. อัตรามาตรฐานสำหรับ "การปล่อยเช่า" (Rent)</h3>
        <p>
          สำหรับการปล่อยเช่าคอนโดหรือบ้าน ค่านายหน้าจะถูกคำนวณตาม <strong>ระยะเวลาของสัญญาเช่า</strong> โดยมีหลักเกณฑ์สากลดังนี้:
        </p>
        <ul>
          <li><strong>สัญญาเช่า 1 ปี:</strong> ค่านายหน้า = ค่าเช่า 1 เดือนเต็ม</li>
          <li><strong>สัญญาเช่า 6 เดือน:</strong> ค่านายหน้า = ค่าเช่าครึ่งเดือน (0.5 เดือน)</li>
          <li><strong>สัญญาเช่า 2-3 ปี:</strong> ค่านายหน้า = ค่าเช่า 1.5 เดือน ถึง 2 เดือน (ขึ้นอยู่กับการเจรจา)</li>
        </ul>
        <p><em>* ค่านายหน้านี้ "ผู้ให้เช่า" (เจ้าของห้อง) เป็นผู้จ่ายเสมอ ไม่ใช่การเก็บจากผู้เช่า</em></p>

        <h3>เรื่องของ "ภาษี" ที่นายหน้าต้องรู้ (VAT & WHT)</h3>
        <p>
          เมื่อการโอนกรรมสิทธิ์เสร็จสิ้น และนายหน้าต้องรับเงินค่าคอมมิชชั่น จะมีเรื่องของภาษีเข้ามาเกี่ยวข้องดังนี้:
        </p>
        <ul>
          <li>
            <strong>ภาษีหัก ณ ที่จ่าย (Withholding Tax - WHT):</strong> 
            ตามกฎหมายของกรมสรรพากร เงินค่านายหน้าถือเป็นเงินได้พึงประเมินมาตรา 40(2) 
            <br/> - หากคุณเป็น <strong>"บุคคลธรรมดา"</strong> ผู้จ่ายเงิน(ที่เป็นนิติบุคคล) จะต้องหักภาษีคุณไว้ <strong>5%</strong> 
            <br/> - หากคุณจดทะเบียนเป็น <strong>"บริษัท (นิติบุคคล)"</strong> จะถูกหักภาษี ณ ที่จ่าย <strong>3%</strong>
          </li>
          <li>
            <strong>ภาษีมูลค่าเพิ่ม (VAT 7%):</strong>
            หากบริษัทนายหน้า (หรือนายหน้าอิสระ) มีรายได้ต่อปีเกิน 1.8 ล้านบาท และจดทะเบียน VAT เรียบร้อยแล้ว นายหน้ามีสิทธิบวก VAT 7% เข้าไปในใบแจ้งหนี้ (Invoice) เพื่อเรียกเก็บจากผู้ขายเพิ่มเติมได้ แต่ต้องออกใบกำกับภาษีให้ผู้ขายอย่างถูกต้องด้วย
          </li>
        </ul>

        <p>
          ดังนั้น การตกลงค่านายหน้าตั้งแต่เริ่มรับงาน (Listing) ควรระบุให้ชัดเจนในสัญญาว่า <strong>"ค่านายหน้า 3% นี้ เป็นราคาที่รวม VAT (Inclusive) หรือ ยังไม่รวม VAT (Exclusive)"</strong> เพื่อป้องกันการผิดใจกันในวันจ่ายเงิน ณ กรมที่ดินครับ
        </p>
      </div>
    </div>
  );
}
