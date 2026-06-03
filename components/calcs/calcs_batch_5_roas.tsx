import React, { useState } from 'react';
import { Target, Calculator, DollarSign, Percent, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ROASCalculator({ lang }: any) {
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [adRevenue, setAdRevenue] = useState<number>(50000);
  const [profitMargin, setProfitMargin] = useState<number>(40);

  const roasMultiplier = adSpend > 0 ? adRevenue / adSpend : 0;
  const roasPercentage = roasMultiplier * 100;
  
  const breakEvenRoas = profitMargin > 0 ? (1 / (profitMargin / 100)) : 0;
  const breakEvenRoasPercent = breakEvenRoas * 100;

  const isProfitable = roasMultiplier > breakEvenRoas;
  const profitFromAds = adRevenue * (profitMargin / 100) - adSpend;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto mb-4">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ROAS Calculator</h2>
        <p className="text-gray-600">คำนวณผลตอบแทนจากค่าโฆษณา และหาจุดคุ้มทุน (Break-even ROAS)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calculator className="w-5 h-5 mr-2 text-green-500" />
            ข้อมูลการลงทุนโฆษณา
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ค่าโฆษณาที่จ่ายไป (Ad Spend)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ยอดขายจากโฆษณา (Revenue from Ads)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={adRevenue}
                onChange={(e) => setAdRevenue(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">อัตรากำไรขั้นต้น (Gross Profit Margin %)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Percent className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">จำเป็นสำหรับการหาจุดคุ้มทุน (Break-even ROAS)</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              ผลลัพธ์ ROAS ของคุณ
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-50 text-center">
                <p className="text-sm text-gray-500 mb-1">ผลตอบแทนที่ได้ (ROAS)</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">{roasMultiplier.toFixed(2)}x</span>
                  <span className="text-lg text-gray-500">หรือ {roasPercentage.toFixed(0)}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">จ่ายค่าแอด 1 บาท ได้ยอดขายกลับมา {roasMultiplier.toFixed(2)} บาท</p>
              </div>

              {profitMargin > 0 && (
                <div className={`p-4 rounded-lg shadow-sm text-white ${isProfitable ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">สถานะแคมเปญ:</p>
                    {isProfitable ? (
                      <span className="flex items-center text-sm font-medium bg-white/20 px-2 py-1 rounded"><CheckCircle2 className="w-4 h-4 mr-1" /> กำไร</span>
                    ) : (
                      <span className="flex items-center text-sm font-medium bg-white/20 px-2 py-1 rounded"><AlertTriangle className="w-4 h-4 mr-1" /> ขาดทุน</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm opacity-90 mb-1">กำไรสุทธิ (หลังหักค่าแอด & ต้นทุน)</p>
                      <p className="text-2xl font-bold">
                        ฿{profitFromAds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {profitMargin > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-semibold mb-1">เป้าหมายจุดคุ้มทุน (Break-even ROAS)</p>
                <p className="text-sm text-blue-800">
                  เพื่อให้ไม่ขาดทุน คุณต้องทำ ROAS ให้ได้อย่างน้อย <strong>{breakEvenRoas.toFixed(2)}x</strong> ({breakEvenRoasPercent.toFixed(0)}%)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 prose prose-green max-w-none">
        <h2>ROAS คืออะไร? สำคัญอย่างไรในการลงโฆษณาออนไลน์</h2>
        <p>
          <strong>ROAS (Return on Ad Spend)</strong> คือ ตัวชี้วัดที่ใช้ประเมินประสิทธิภาพของแคมเปญโฆษณา ว่าเม็ดเงินที่เราลงทุนจ่ายค่าโฆษณาไปนั้น สามารถสร้าง "ยอดขาย" (Revenue) กลับคืนมาได้เป็นมูลค่าเท่าไหร่ (กี่เท่า) ของเงินที่จ่ายไป
        </p>
        <p>
          ตัวอย่างเช่น: หากคุณจ่ายค่าโฆษณาไป 10,000 บาท และสร้างยอดขายได้ 50,000 บาท หมายความว่าคุณมี ROAS = 5 เท่า (5x หรือ 500%) ซึ่งแปลว่าจ่ายค่าแอด 1 บาท ได้ยอดขายกลับมา 5 บาทนั่นเอง
        </p>

        <h3>วิธีคำนวณ ROAS</h3>
        <p>สูตรการคำนวณ ROAS นั้นง่ายมาก โดยนำยอดขายที่เกิดจากโฆษณามาหารด้วยค่าโฆษณา:</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200 text-lg">
          ROAS = ยอดขายที่เกิดจากแอด (Ad Revenue) ÷ ค่าโฆษณา (Ad Spend)
        </div>

        <h3>อย่าดูแค่ ROAS สูง ต้องรู้ "Break-even ROAS" ด้วย</h3>
        <p>
          หลายคนเข้าใจผิดว่าถ้า ROAS มากกว่า 1x (คือได้ยอดขายมากกว่าค่าแอด) แปลว่าได้กำไรแล้ว <strong>ซึ่งเป็นความเข้าใจที่ผิด!</strong> เพราะยอดขาย (Revenue) ยังไม่ได้หัก "ต้นทุนสินค้า" 
        </p>
        <p>
          ดังนั้น สิ่งที่สำคัญกว่า ROAS ทั่วไป คือการหา <strong>Break-even ROAS (จุดคุ้มทุน)</strong> ซึ่งจะบอกว่าเราต้องทำ ROAS ได้กี่เท่าถึงจะไม่ขาดทุน (หักต้นทุนสินค้าและค่าแอดแล้วเหลือ 0)
        </p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-center my-4 border border-gray-200 text-lg">
          Break-even ROAS = 1 ÷ อัตรากำไรขั้นต้น (Gross Margin %)
        </div>
        <p>
          <strong>ตัวอย่าง:</strong> ถ้าสินค้าของคุณมีอัตรากำไร (Margin) อยู่ที่ 40% (ต้นทุน 60%)<br />
          Break-even ROAS = 1 ÷ 0.4 = 2.5x <br />
          แปลว่า: แคมเปญโฆษณาของคุณต้องทำ ROAS ให้ได้ <strong>มากกว่า 2.5 เท่า</strong> คุณถึงจะเริ่มมีกำไรเข้ากระเป๋าจริงๆ หากทำได้แค่ 2.0x แม้ยอดขายจะดูเยอะกว่าค่าแอด แต่ในความเป็นจริงแล้วคุณกำลัง "ขาดทุน"
        </p>

        <h3>วิธีปรับปรุงและเพิ่ม ROAS ให้สูงขึ้น</h3>
        <ul>
          <li><strong>เพิ่มอัตราการแปลง (Conversion Rate):</strong> ทำเว็บไซต์ให้โหลดเร็ว, สร้างความน่าเชื่อถือ, รีวิวชัดเจน, และมีระบบชำระเงินที่ง่าย</li>
          <li><strong>เพิ่มมูลค่าการสั่งซื้อเฉลี่ย (AOV):</strong> จัดโปรโมชั่นซื้อคู่ถูกกว่า (Bundle), ทำ Upsell/Cross-sell หรือจัดส่งฟรีเมื่อซื้อครบยอดที่กำหนด</li>
          <li><strong>ลดค่าคลิก (CPC/CPM):</strong> ปรับปรุงคุณภาพโฆษณา (Ad Creative), เจาะจงกลุ่มเป้าหมายให้แม่นยำขึ้น หรือสร้างสรรค์คอนเทนต์วิดีโอที่ดึงดูดสายตาคนได้มากกว่า</li>
          <li><strong>Retargeting:</strong> ลูกค้ามักไม่ซื้อในการเห็นแอดครั้งแรก การทำ Retargeting ตามไปย้ำเตือนมักจะให้ค่า ROAS ที่สูงกว่าแคมเปญปกติเสมอ</li>
        </ul>

        <p>
          จำไว้เสมอว่า ROAS เป็นการดูเพียงผลตอบแทนระยะสั้นที่เกิดจากแอดเท่านั้น (Short-term) ธุรกิจที่แข็งแรงควรพิจารณาร่วมกับ <strong>LTV (Lifetime Value)</strong> ของลูกค้าประกอบด้วย เพราะบางธุรกิจอาจยอมให้แอด ROAS ต่ำในครั้งแรก แต่ลูกค้ากลับมาซื้อซ้ำเรื่อยๆ ในอนาคต
        </p>
      </div>
    </div>
  );
}
