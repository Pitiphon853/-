import React, { useState } from 'react';
import { Key, Building, DollarSign, CheckSquare, Info } from 'lucide-react';

const SpaceRentalDepositCalculator = ({ lang }: any) => {
  const [monthlyRent, setMonthlyRent] = useState<number>(30000);
  const [depositMonths, setDepositMonths] = useState<number>(2); // usually 2-3 months
  const [advanceMonths, setAdvanceMonths] = useState<number>(1); // usually 1 month

  // Other Initial Fees
  const [utilityDeposit, setUtilityDeposit] = useState<number>(5000); // Water/Elec
  const [commonAreaFee, setCommonAreaFee] = useState<number>(0);
  const [keyMoney, setKeyMoney] = useState<number>(0); // แป๊ะเจี๊ยะ
  const [stampDuty, setStampDuty] = useState<boolean>(true); 

  const rentalContractYears = 3;

  // Calculations
  const securityDepositAmount = monthlyRent * depositMonths;
  const advanceRentAmount = monthlyRent * advanceMonths;
  
  // Stamp duty in TH: 0.1% of total contract value (Rent * 12 * years * 0.001)
  const totalContractValue = monthlyRent * 12 * rentalContractYears;
  const stampDutyAmount = stampDuty ? totalContractValue * 0.001 : 0;

  const totalMoveInCost = securityDepositAmount + advanceRentAmount + utilityDeposit + commonAreaFee + keyMoney + stampDutyAmount;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 text-indigo-700">
        <Key className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-bold">เครื่องมือคำนวณเงินมัดจำและค่าเช่าพื้นที่แรกเข้า</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-3 flex items-center">
              <Building className="w-5 h-5 mr-2" /> โครงสร้างค่าเช่าหลัก
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ค่าเช่าพื้นที่ต่อเดือน (บาท)</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">฿</span>
                  </div>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 font-semibold"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">เงินประกัน (เดือน)</label>
                  <select 
                    value={depositMonths} 
                    onChange={(e) => setDepositMonths(Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                  >
                    <option value={1}>1 เดือน</option>
                    <option value={2}>2 เดือน (มาตรฐาน)</option>
                    <option value={3}>3 เดือน (พื้นที่ห้าง)</option>
                    <option value={4}>4 เดือน</option>
                    <option value={6}>6 เดือน</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">ล่วงหน้า (เดือน)</label>
                  <select 
                    value={advanceMonths} 
                    onChange={(e) => setAdvanceMonths(Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                  >
                    <option value={0}>ไม่มี</option>
                    <option value={1}>1 เดือน</option>
                    <option value={2}>2 เดือน</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" /> ค่าใช้จ่ายอื่นๆ วันทำสัญญา
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">เงินประกันน้ำ-ไฟ / ตกแต่ง (บาท)</label>
                <input type="number" value={utilityDeposit} onChange={(e) => setUtilityDeposit(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">ค่าส่วนกลางล่วงหน้า (ถ้ามีแยกเก็บ) (บาท)</label>
                <input type="number" value={commonAreaFee} onChange={(e) => setCommonAreaFee(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">เงินกินเปล่า / แป๊ะเจี๊ยะ (Key Money) (บาท)</label>
                <input type="number" value={keyMoney} onChange={(e) => setKeyMoney(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-indigo-500" />
              </div>
              
              <div className="pt-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={stampDuty} onChange={(e) => setStampDuty(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span>คำนวณค่าอากรแสตมป์ (สัญญาเช่า 3 ปี) 0.1%</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-gray-600 pb-3">
              <CheckSquare className="w-5 h-5 mr-2" /> สรุปยอดเงินที่ต้องเตรียมวันเซ็นสัญญา
            </h3>
            
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">เงินประกันความเสียหาย ({depositMonths} เดือน):</span>
                <span className="font-semibold text-gray-100">฿{securityDepositAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">ค่าเช่าล่วงหน้า ({advanceMonths} เดือน):</span>
                <span className="font-semibold text-gray-100">฿{advanceRentAmount.toLocaleString()}</span>
              </div>
              
              {(utilityDeposit > 0 || commonAreaFee > 0 || keyMoney > 0 || stampDutyAmount > 0) && (
                <div className="py-2 border-y border-gray-700 my-2 space-y-2">
                  {utilityDeposit > 0 && <div className="flex justify-between text-sm text-gray-400"><span>เงินประกันมิเตอร์/ตกแต่ง:</span> <span>฿{utilityDeposit.toLocaleString()}</span></div>}
                  {commonAreaFee > 0 && <div className="flex justify-between text-sm text-gray-400"><span>ค่าส่วนกลาง:</span> <span>฿{commonAreaFee.toLocaleString()}</span></div>}
                  {keyMoney > 0 && <div className="flex justify-between text-sm text-orange-400"><span>เงินกินเปล่า (ไม่คืน):</span> <span>฿{keyMoney.toLocaleString()}</span></div>}
                  {stampDutyAmount > 0 && <div className="flex justify-between text-sm text-gray-400"><span>ค่าอากรแสตมป์:</span> <span>฿{stampDutyAmount.toLocaleString()}</span></div>}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-indigo-500">
              <p className="text-gray-400 text-sm mb-1">ยอดรวมที่ต้องชำระ (Total Move-in Cost)</p>
              <div className="text-4xl font-bold text-indigo-400">
                ฿{totalMoveInCost.toLocaleString()}
              </div>
            </div>

            <div className="mt-6 bg-gray-700 p-3 rounded text-xs text-gray-300 flex items-start">
              <Info className="w-4 h-4 mr-2 flex-shrink-0 text-indigo-300" />
              <p>เงินประกันและค่าเช่าล่วงหน้าเป็นเพียงข้อตกลงมาตรฐาน โปรดตรวจสอบการหักภาษี ณ ที่จ่าย (5% สำหรับค่าเช่า) ในกรณีที่คุณเช่าในนามนิติบุคคล</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 prose max-w-none text-gray-800 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">ทำความเข้าใจโครงสร้างค่าเช่าพื้นที่ธุรกิจ (Space Rental Cost)</h2>
        <p>
          การเปิดหน้าร้าน ออฟฟิศ หรือคลังสินค้า หนึ่งในต้นทุนที่ผู้ประกอบการต้องเตรียมเป็นเงินก้อนใหญ่ที่สุดคือ <strong>"เงินก้อนแรกเข้า" (Move-in Costs)</strong> ในวันเซ็นสัญญาเช่า ซึ่งมักจะสูงกว่าค่าเช่ารายเดือนปกติถึง 3-5 เท่า การคำนวณและเตรียมกระแสเงินสดส่วนนี้ให้พร้อมเป็นสิ่งสำคัญเพื่อไม่ให้กระทบกับงบประมาณการตกแต่งร้านหรือเงินทุนหมุนเวียนอื่นๆ
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">คำศัพท์ที่ต้องรู้ก่อนเซ็นสัญญาเช่า</h3>
        
        <h4 className="text-lg font-medium mt-4 mb-2">1. เงินประกันความเสียหาย (Security Deposit)</h4>
        <p>
          เป็นเงินก้อนที่ผู้ให้เช่าเก็บไว้เพื่อค้ำประกันกรณีที่ผู้เช่าทำผิดสัญญา (เช่น ค้างค่าเช่า, ย้ายออกก่อนกำหนด) หรือทำความเสียหายต่อทรัพย์สิน (เช่น ผนังพัง, แอร์เสีย) 
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>มาตรฐานทั่วไป:</strong> มักเก็บที่ <strong>2 เดือน</strong> ของค่าเช่า</li>
          <li><strong>พื้นที่ในห้างสรรพสินค้า:</strong> มักเก็บสูงถึง <strong>3 - 6 เดือน</strong></li>
          <li><em>ข้อควรจำ:</em> เงินส่วนนี้ <strong>"ได้คืน"</strong> เมื่อสิ้นสุดสัญญาและส่งมอบพื้นที่คืนในสภาพเดิม</li>
        </ul>

        <h4 className="text-lg font-medium mt-4 mb-2">2. ค่าเช่าล่วงหน้า (Advance Rent)</h4>
        <p>
          คือการจ่ายค่าเช่าสำหรับเดือนแรก หรือเดือนที่ระบุไว้ล่วงหน้า (โดยทั่วไปคือ <strong>1 เดือน</strong>) หมายความว่าคุณจ่ายก้อนนี้ไปแล้ว ในเดือนแรกที่คุณย้ายเข้าไปอยู่ก็ไม่ต้องจ่ายค่าเช่าอีก เงินส่วนนี้ถือเป็นค่าใช้จ่ายที่ใช้ไปแล้ว ไม่ใช่เงินที่จะได้คืนตอนเลิกสัญญา
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2">3. เงินประกันสาธารณูปโภคและตกแต่ง (Utility & Fit-out Deposit)</h4>
        <p>
          หากคุณเช่าพื้นที่เปล่า (Bare Shell) แล้วต้องจ้างผู้รับเหมาเข้ามาตกแต่ง อาคารบางแห่งจะเก็บเงินประกันการตกแต่ง (เพื่อป้องกันผู้รับเหมาทำส่วนกลางของอาคารเสียหาย) รวมถึงเงินประกันมิเตอร์น้ำ-ไฟ ซึ่งคุณจะได้คืนเมื่อทำร้านเสร็จหรือเลิกเช่า
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2">4. เงินกินเปล่า / แป๊ะเจี๊ยะ (Key Money / Leasehold Fee)</h4>
        <p>
          มักพบในทำเลทอง (Prime Location) หรือพื้นที่ที่ความต้องการสูงมาก เป็นเงินก้อนที่จ่ายให้เจ้าของที่หรือผู้เช่าเดิมเพื่อ "ซื้อสิทธิ์" ในการเข้ามาเช่าพื้นที่ เงินส่วนนี้ <strong>"ไม่ได้คืน"</strong> ถือเป็นต้นทุนค่าเซ้งสิทธิ์
        </p>

        <h4 className="text-lg font-medium mt-4 mb-2">5. ค่าอากรแสตมป์ (Stamp Duty)</h4>
        <p>
          ตามกฎหมายไทย สัญญาเช่าที่ดินหรือโรงเรือนต้องติดอากรแสตมป์ในอัตรา <strong>1 บาท ต่อทุกจำนวนเงิน 1,000 บาท</strong> (คิดเป็น 0.1%) ของค่าเช่าตลอดอายุสัญญา เพื่อให้สัญญามีผลทางกฎหมายโดยสมบูรณ์ โดยปกติกฎหมายระบุให้ "ผู้ให้เช่า" เป็นผู้เสียอากรแสตมป์ แต่ในทางปฏิบัติมักจะตกลงให้ผู้เช่าเป็นคนจ่าย หรือหารคนละครึ่ง
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">เรื่องภาษีหัก ณ ที่จ่าย (Withholding Tax)</h3>
        <p className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm">
          หากคุณจดทะเบียนเป็น <strong>"นิติบุคคล" (บริษัท/ห้างหุ้นส่วน)</strong> เมื่อจ่ายค่าเช่าให้แก่ผู้ให้เช่า (ไม่ว่าจะเป็นบุคคลหรือบริษัท) คุณมีหน้าที่ต้อง <strong>หักภาษี ณ ที่จ่าย 5%</strong> จากยอดค่าเช่า แล้วนำส่งกรมสรรพากรภายในวันที่ 7 ของเดือนถัดไป (เช่น ค่าเช่า 30,000 บาท คุณโอนให้ผู้เช่า 28,500 บาท และนำส่งสรรพากร 1,500 บาท)
        </p>
      </div>
    </div>
  );
};

export default SpaceRentalDepositCalculator;
