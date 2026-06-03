import React, { useState } from 'react';
import { TreeDeciduous, Scissors, Droplets, Leaf, Flower2, CalendarDays, Coins } from 'lucide-react';

export default function GardenMaintenanceCost({ lang }: any) {
  const [gardenerFee, setGardenerFee] = useState<number | ''>('');
  const [gardenerVisits, setGardenerVisits] = useState<number | ''>(1);
  const [fertilizerCost, setFertilizerCost] = useState<number | ''>('');
  const [waterCost, setWaterCost] = useState<number | ''>('');
  const [extraPlants, setExtraPlants] = useState<number | ''>('');

  const calculateCosts = () => {
    const fee = Number(gardenerFee) || 0;
    const visits = Number(gardenerVisits) || 0;
    const fert = Number(fertilizerCost) || 0;
    const water = Number(waterCost) || 0;
    const extra = Number(extraPlants) || 0;

    const totalGardener = fee * visits;
    const monthlyTotal = totalGardener + fert + water + extra;
    const yearlyTotal = monthlyTotal * 12;

    return {
      totalGardener,
      monthlyTotal,
      yearlyTotal,
      breakdown: {
        gardener: totalGardener,
        fertilizer: fert,
        water,
        extra
      }
    };
  };

  const results = calculateCosts();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TreeDeciduous className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณค่าดูแลสวน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-gray-500"/>
                ค่าใช้จ่ายรายเดือน
              </h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ค่าจ้างคนสวน (บาท/ครั้ง)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={gardenerFee}
                      onChange={(e) => setGardenerFee(Number(e.target.value) || '')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="เช่น 1500"
                      min="0"
                    />
                    <Scissors className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวนครั้ง
                  </label>
                  <input
                    type="number"
                    value={gardenerVisits}
                    onChange={(e) => setGardenerVisits(Number(e.target.value) || '')}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-center"
                    placeholder="ต่อเดือน"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าปุ๋ย ดิน และยากำจัดแมลง (บาท/เดือน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="ประเมินต่อเดือน"
                    min="0"
                  />
                  <Leaf className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าน้ำประปาสำหรับรดน้ำ (บาท/เดือน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={waterCost}
                    onChange={(e) => setWaterCost(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="ประเมินค่าน้ำที่เพิ่มขึ้น"
                    min="0"
                  />
                  <Droplets className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค่าต้นไม้ ดอกไม้ หรือของแต่งสวน (บาท/เดือน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={extraPlants}
                    onChange={(e) => setExtraPlants(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="ซื้อเพิ่ม หรือเปลี่ยนต้นไม้"
                    min="0"
                  />
                  <Flower2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-500"/>
              สรุปงบประมาณดูแลสวน
            </h3>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 text-center shadow-sm">
                <p className="text-sm text-emerald-800 mb-2">ค่าใช้จ่ายรวมต่อเดือน</p>
                <p className="text-4xl font-bold text-emerald-600">
                  ฿{results.monthlyTotal.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center mt-4">
                <span className="text-gray-600 text-sm">ประเมินค่าใช้จ่ายต่อปี</span>
                <span className="text-xl font-bold text-gray-800">
                  ฿{results.yearlyTotal.toLocaleString()}
                </span>
              </div>

              {results.monthlyTotal > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">สัดส่วนค่าใช้จ่าย</p>
                  <div className="space-y-2">
                    {results.breakdown.gardener > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">จ้างคนสวน</span>
                        <span className="font-medium text-gray-900">฿{results.breakdown.gardener.toLocaleString()}</span>
                      </div>
                    )}
                    {results.breakdown.fertilizer > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ปุ๋ย/ดิน</span>
                        <span className="font-medium text-gray-900">฿{results.breakdown.fertilizer.toLocaleString()}</span>
                      </div>
                    )}
                    {results.breakdown.water > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ค่าน้ำ</span>
                        <span className="font-medium text-gray-900">฿{results.breakdown.water.toLocaleString()}</span>
                      </div>
                    )}
                    {results.breakdown.extra > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ต้นไม้เพิ่ม</span>
                        <span className="font-medium text-gray-900">฿{results.breakdown.extra.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">สำรวจและคำนวณค่าดูแลสวน (Garden Maintenance Cost) ให้บ้านร่มรื่นแบบงบไม่บานปลาย</h2>
        
        <p>การมีพื้นที่สีเขียวหรือสวนสวยๆ ภายในบริเวณบ้าน ไม่เพียงแต่ช่วยสร้างบรรยากาศที่ร่มรื่นและผ่อนคลาย แต่ยังสะท้อนถึงรสนิยมและความเอาใจใส่ของเจ้าของบ้านอีกด้วย อย่างไรก็ตาม ต้นไม้และสนามหญ้าเป็นสิ่งมีชีวิตที่ต้องการการดูแลรักษาอย่างสม่ำเสมอ การปล่อยปละละเลยอาจทำให้สวนกลายเป็นป่ารกทึบ เป็นแหล่งเพาะพันธุ์ยุง และทำลายทัศนียภาพของบ้าน การคำนวณและประเมิน <strong>"ค่าดูแลสวน" (Garden Maintenance Cost)</strong> จึงเป็นสิ่งสำคัญที่เจ้าของบ้านควรทราบ เพื่อเตรียมงบประมาณได้อย่างถูกต้อง</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ค่าใช้จ่ายแฝงในสวนที่คุณอาจนึกไม่ถึง</h3>
        <p>หลายคนมักคิดว่ามีเพียง "ค่าจ้างคนสวน" เท่านั้น แต่ในความเป็นจริง การดูแลสวนมีค่าใช้จ่ายย่อยๆ ที่ประกอบกันเป็นรายจ่ายรายเดือน ดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>ค่าบริการตัดหญ้าและตัดแต่งกิ่ง:</strong> หากพื้นที่สวนกว้าง หรือมีต้นไม้ใหญ่ การจ้างมืออาชีพเป็นเรื่องจำเป็น โดยปกติมักคิดราคาเป็นรายครั้ง ขึ้นอยู่กับขนาดพื้นที่และปริมาณงาน อาจเริ่มต้นที่ 500 ไปจนถึง 3,000 บาทต่อครั้ง หากจ้างเดือนละ 1-2 ครั้ง ก็ถือเป็นรายจ่ายหลัก</li>
          <li><strong>ค่าน้ำประปาสำหรับการรดน้ำ:</strong> ในช่วงหน้าแล้ง การรดน้ำต้นไม้และสนามหญ้าทุกวันอาจทำให้ค่าน้ำประปาพุ่งสูงขึ้นอย่างเห็นได้ชัด การติดตั้งระบบรดน้ำสปริงเกลอร์ (Sprinkler) แบบตั้งเวลา แม้จะเสียค่าติดตั้งในตอนแรก แต่ในระยะยาวอาจช่วยควบคุมปริมาณน้ำได้ดีกว่าการฉีดรดด้วยสายยาง</li>
          <li><strong>ค่าปุ๋ย ดิน และยากำจัดศัตรูพืช:</strong> ต้นไม้ต้องการสารอาหารเพื่อการเจริญเติบโตที่สวยงาม การใส่ปุ๋ยคอก ปุ๋ยเคมี หรือการเติมดินใหม่ตามฤดูกาล รวมถึงค่ายากำจัดแมลงหรือฮอร์โมนบำรุงต่างๆ ก็เป็นค่าใช้จ่ายจิปาถะที่รวมกันแล้วไม่น้อยเลย</li>
          <li><strong>ค่าซ่อมแซมและซื้อของตกแต่งเพิ่มเติม:</strong> เช่น การซื้อดอกไม้ประดับตามฤดูกาลมาเปลี่ยน การซ่อมแซมไฟในสวน หรือการเปลี่ยนต้นไม้ที่ตายไป</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำอย่างไรให้สวนสวยแต่ประหยัดค่าดูแล?</h3>
        <p>หากคุณพบว่าค่าดูแลสวนรายเดือนเริ่มสูงเกินไป ลองพิจารณาแนวทางเหล่านี้เพื่อลดภาระค่าใช้จ่าย:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>เปลี่ยนมาจัดสวนแนว Softscape ที่ดูแลรักษาง่าย (Low-Maintenance Garden):</strong> เลือกปลูกต้นไม้สายพันธุ์ท้องถิ่นที่ทนทานต่อสภาพอากาศ ไม่ผลัดใบเยอะ และไม่ต้องการน้ำหรือปุ๋ยมากนัก หลีกเลี่ยงต้นไม้ที่ต้องตัดแต่งทรงบ่อยๆ</li>
          <li><strong>ลดพื้นที่สนามหญ้า (Lawn Reduction):</strong> สนามหญ้าเป็นส่วนที่ต้องดูแลรักษาสูงที่สุด (ต้องรดน้ำและตัดบ่อย) การเปลี่ยนพื้นที่บางส่วนมาเป็นสวนหิน ทางเดินกรวด ไม้พุ่มทนแล้ง หรือแม้แต่หญ้าเทียม จะช่วยลดค่าจ้างตัดหญ้าและค่าน้ำลงได้อย่างมหาศาล</li>
          <li><strong>ทำปุ๋ยหมักใช้เอง (Composting):</strong> นำเศษใบไม้ที่ร่วงหล่น หรือเศษอาหารจากในครัวมาหมักเป็นปุ๋ยชีวภาพ นอกจากจะช่วยลดปริมาณขยะแล้ว ยังได้ปุ๋ยชั้นดีไว้บำรุงต้นไม้แบบฟรีๆ อีกด้วย</li>
          <li><strong>ลงมือทำด้วยตัวเองบางส่วน:</strong> กิจกรรมเบาๆ เช่น การรดน้ำต้นไม้ การถอนวัชพืช หรือการใส่ปุ๋ย สามารถทำเป็นกิจกรรมผ่อนคลายหรือออกกำลังกายในวันหยุดของครอบครัวได้ ซึ่งจะช่วยลดจำนวนครั้งที่ต้องจ้างคนสวนลง</li>
        </ol>

        <p className="mt-6 p-4 bg-emerald-50 text-emerald-900 rounded-lg">
          <strong>สรุป:</strong> ความสวยงามของสวนแปรผันตรงกับเวลาและเงินที่ลงทุนไป การวางแผนงบประมาณผ่านเครื่องมือประเมินค่าดูแลสวน จะช่วยให้คุณเห็นภาพรวมและสามารถปรับเปลี่ยนรูปแบบสวนให้เหมาะสมกับไลฟ์สไตล์และกำลังทรัพย์ของคุณได้อย่างยั่งยืน
        </p>
      </article>
    </div>
  );
}
