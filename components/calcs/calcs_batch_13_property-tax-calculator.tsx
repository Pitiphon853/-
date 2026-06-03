import React, { useState } from 'react';
import { Landmark, Calculator } from 'lucide-react';

export default function PropertyTaxCalculator({ lang }: any) {
  const isTH = lang === 'TH';
  const [propertyType, setPropertyType] = useState<string>('first_home');
  const [appraisedValue, setAppraisedValue] = useState<number>(5000000);

  // Simple tax calculation based on Thai law
  let taxAmount = 0;
  let exemption = 0;
  let taxRateStr = "0%";

  if (propertyType === 'first_home') {
    // Exemption up to 50 million THB
    exemption = 50000000;
    if (appraisedValue > exemption) {
      const taxable = appraisedValue - exemption;
      if (taxable <= 25000000) {
        taxAmount = taxable * 0.0003;
        taxRateStr = "0.03%";
      } else if (taxable <= 50000000) {
        taxAmount = (25000000 * 0.0003) + ((taxable - 25000000) * 0.0005);
        taxRateStr = "0.03% - 0.05%";
      } else {
        taxAmount = (25000000 * 0.0003) + (25000000 * 0.0005) + ((taxable - 50000000) * 0.001);
        taxRateStr = "0.03% - 0.1%";
      }
    }
  } else if (propertyType === 'second_home') {
    // No exemption for second home
    if (appraisedValue <= 50000000) {
      taxAmount = appraisedValue * 0.0002;
      taxRateStr = "0.02%";
    } else if (appraisedValue <= 75000000) {
      taxAmount = (50000000 * 0.0002) + ((appraisedValue - 50000000) * 0.0003);
      taxRateStr = "0.02% - 0.03%";
    } else {
      taxAmount = (50000000 * 0.0002) + (25000000 * 0.0003) + ((appraisedValue - 75000000) * 0.0005);
      taxRateStr = "0.02% - 0.05%";
    }
  } else if (propertyType === 'vacant') {
    if (appraisedValue <= 50000000) {
      taxAmount = appraisedValue * 0.003;
      taxRateStr = "0.3%";
    } else {
      taxAmount = (50000000 * 0.003) + ((appraisedValue - 50000000) * 0.004);
      taxRateStr = "0.3% - 0.4%";
    }
  } else if (propertyType === 'commercial') {
    if (appraisedValue <= 50000000) {
      taxAmount = appraisedValue * 0.003;
      taxRateStr = "0.3%";
    } else {
      taxAmount = (50000000 * 0.003) + ((appraisedValue - 50000000) * 0.004);
      taxRateStr = "0.3% - 0.4%";
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Landmark className="w-8 h-8 text-rose-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องคำนวณภาษีที่ดินและสิ่งปลูกสร้าง' : 'Property Tax Calculator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{isTH ? 'ประเภทอสังหาริมทรัพย์' : 'Property Type'}</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="propType" value="first_home" checked={propertyType === 'first_home'} onChange={(e) => setPropertyType(e.target.value)} className="text-rose-600 focus:ring-rose-500" />
                <span className="text-sm">{isTH ? 'บ้านหลังหลัก (มีชื่อในทะเบียนบ้าน)' : 'First Home (Registered in House Particulars)'}</span>
              </label>
              <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="propType" value="second_home" checked={propertyType === 'second_home'} onChange={(e) => setPropertyType(e.target.value)} className="text-rose-600 focus:ring-rose-500" />
                <span className="text-sm">{isTH ? 'บ้านหลังที่สอง (เพื่ออยู่อาศัย / ปล่อยเช่า)' : 'Second Home / Residential'}</span>
              </label>
              <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="propType" value="commercial" checked={propertyType === 'commercial'} onChange={(e) => setPropertyType(e.target.value)} className="text-rose-600 focus:ring-rose-500" />
                <span className="text-sm">{isTH ? 'ใช้ประโยชน์เชิงพาณิชย์ / อื่นๆ' : 'Commercial / Others'}</span>
              </label>
              <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="propType" value="vacant" checked={propertyType === 'vacant'} onChange={(e) => setPropertyType(e.target.value)} className="text-rose-600 focus:ring-rose-500" />
                <span className="text-sm">{isTH ? 'ที่ดินรกร้างว่างเปล่า' : 'Vacant Land'}</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ราคาประเมิน (บาท)' : 'Appraised Value (THB)'}</label>
            <input type="number" value={appraisedValue} onChange={(e) => setAppraisedValue(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-rose-500 text-lg" />
            <p className="text-xs text-gray-500 mt-1">{isTH ? '* ใช้ราคาประเมินจากกรมธนารักษ์ ไม่ใช่ราคาซื้อขาย' : '* Use official Treasury Department appraised value, not market price.'}</p>
          </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-rose-900 mb-6">{isTH ? 'สรุปภาษีที่ต้องชำระ (ต่อปี)' : 'Annual Tax Summary'}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'มูลค่าฐานภาษี' : 'Tax Base Value'}:</span>
              <span>฿{appraisedValue.toLocaleString()}</span>
            </div>
            
            {propertyType === 'first_home' && (
              <div className="flex justify-between text-green-600">
                <span>{isTH ? 'ได้รับการยกเว้น' : 'Tax Exemption'}:</span>
                <span>{isTH ? 'สูงสุด 50 ล้านบาท' : 'Up to 50M THB'}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'อัตราภาษีที่ใช้' : 'Applied Tax Rate'}:</span>
              <span>{taxRateStr}</span>
            </div>
            
            <div className="pt-6 mt-4 border-t border-rose-200">
              <div className="text-center">
                <span className="block text-sm text-gray-600 mb-2">{isTH ? 'ภาษีที่ต้องชำระ' : 'Tax to Pay'}</span>
                {taxAmount === 0 ? (
                  <span className="text-4xl font-extrabold text-green-500">{isTH ? 'ไม่ต้องเสียภาษี' : 'Tax Exempted'}</span>
                ) : (
                  <span className="text-5xl font-extrabold text-rose-600">฿{taxAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-rose max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'ภาษีที่ดินและสิ่งปลูกสร้างคืออะไร? ใครบ้างที่ต้องจ่าย?' : 'Understanding Thailand Property Tax'}
        </h2>
        {isTH ? (
          <>
            <p>ภาษีที่ดินและสิ่งปลูกสร้าง เป็นภาษีที่จัดเก็บเป็นรายปี โดยจัดเก็บจากเจ้าของที่ดินและสิ่งปลูกสร้าง (บ้าน, คอนโด, อาคารพาณิชย์, ที่ดินเปล่า) ตามกฎหมายใหม่ที่เริ่มบังคับใช้เพื่อลดความเหลื่อมล้ำและกระตุ้นให้เกิดการใช้ประโยชน์ในที่ดิน อย่างไรก็ตาม ไม่ใช่ทุกคนที่ต้องเสียภาษีนี้ มาดูหลักเกณฑ์กัน</p>
            <h3>1. บ้านหลังหลัก (มีชื่อในทะเบียนบ้าน)</h3>
            <p>หากคุณเป็นเจ้าของบ้านและที่ดิน และมีชื่ออยู่ในทะเบียนบ้านนั้นในวันที่ 1 มกราคมของปีภาษี จะถือว่าเป็น "บ้านหลังหลัก" กฎหมายให้สิทธิยกเว้นภาษีสำหรับมูลค่าที่ประเมินไม่เกิน 50 ล้านบาท (ซึ่งคนส่วนใหญ่ของประเทศมักจะไม่เกินเกณฑ์นี้ จึงไม่ต้องเสียภาษี) แต่หากมูลค่าเกิน 50 ล้านบาท จะเสียภาษีเฉพาะส่วนที่เกินในอัตราเริ่มต้น 0.03%</p>
            <h3>2. บ้านหลังที่สองหรือเพื่ออยู่อาศัยอื่นๆ</h3>
            <p>หากคุณมีบ้านหลายหลัง (เช่น มีคอนโดปล่อยเช่า หรือบ้านตากอากาศ) บ้านที่ไม่มีชื่อคุณในทะเบียนบ้านจะถูกจัดเป็นบ้านหลังอื่นๆ ซึ่งไม่มีการยกเว้นมูลค่าฐานภาษี คุณจะต้องเสียภาษีตั้งแต่บาทแรก ในอัตราเริ่มต้น 0.02% (คิดเป็น 200 บาท ต่อมูลค่า 1 ล้านบาท)</p>
            <h3>3. ที่ดินรกร้างว่างเปล่า</h3>
            <p>รัฐบาลต้องการแก้ปัญหาการกักตุนที่ดิน หากคุณมีที่ดินแต่ไม่ได้ทำประโยชน์อะไร จะโดนจัดเก็บภาษีในอัตราที่สูง เริ่มต้นที่ 0.3% และจะเพิ่มขึ้นเรื่อยๆ 0.3% ทุกๆ 3 ปี (สูงสุดไม่เกิน 3%) เพื่อบีบให้เจ้าของนำที่ดินมาทำประโยชน์หรือขายออก</p>
            <h3>4. การใช้ประโยชน์เชิงพาณิชย์ (อื่นๆ)</h3>
            <p>สำหรับอาคารพาณิชย์ ร้านค้า โรงแรม หรือโรงงาน จะเสียภาษีในอัตราเริ่มต้น 0.3% เช่นเดียวกัน</p>
            <p><strong>ข้อควรระวัง:</strong> การคำนวณภาษีจะใช้ "ราคาประเมินทุนทรัพย์" จากกรมธนารักษ์ ไม่ใช่ราคาตลาดหรือราคาที่ซื้อขายกันจริง ดังนั้นควรตรวจสอบราคาประเมินของทรัพย์สินคุณให้ชัดเจนก่อนคำนวณ เพื่อการวางแผนภาษีที่ถูกต้อง</p>
          </>
        ) : (
          <p>Thailand's Land and Building Tax is an annual tax imposed on property owners. The rate depends on how the property is used. If it's your "First Home" (you own it and your name is in its house registration), you are exempt from tax for appraised values up to 50 million THB. "Second homes" or investment properties face a base tax rate starting at 0.02%. Commercial properties and vacant land have higher starting rates of 0.3%. The tax is calculated based on the official appraised value by the Treasury Department, not the market price.</p>
        )}
      </article>
    </div>
  );
}
