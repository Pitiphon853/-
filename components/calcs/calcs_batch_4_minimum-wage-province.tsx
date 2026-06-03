import React, { useState } from 'react';
import { MapPin, Users, Calendar, TrendingUp, AlertCircle, Building } from 'lucide-react';

const WAGE_DATA = [
  { group: "370 บาท", provinces: ["ภูเก็ต", "ชลบุรี", "ระยอง"] },
  { group: "363 บาท", provinces: ["กรุงเทพมหานคร", "นครปฐม", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "สมุทรสาคร"] },
  { group: "361 บาท", provinces: ["ฉะเชิงเทรา"] },
  { group: "350 บาท", provinces: ["พระนครศรีอยุธยา"] },
  { group: "349 บาท", provinces: ["ปราจีนบุรี"] },
  { group: "348 บาท", provinces: ["ชลบุรี (พัทยา)", "สงขลา", "ขอนแก่น", "เชียงใหม่", "นครราชสีมา", "สระบุรี"] }, // Simplified for grouping
  { group: "345 บาท", provinces: ["กาญจนบุรี", "ประจวบคีรีขันธ์", "สุราษฎร์ธานี", "นครศรีธรรมราช", "เพชรบุรี", "จันทบุรี", "นครนายก", "สระแก้ว", "หนองคาย"] },
  { group: "340 บาท", provinces: ["อุบลราชธานี", "อุดรธานี", "ตราด", "บุรีรัมย์", "พิษณุโลก", "พังงา", "ระนอง", "สกลนคร", "หนองบัวลำภู", "สระแก้ว", "เลย"] },
  { group: "338 บาท", provinces: ["กระบี่", "ชุมพร", "ตรัง", "นครสวรรค์", "ยะลา", "พัทลุง", "สุพรรณบุรี", "สุรินทร์", "เพชรบูรณ์", "อุตรดิตถ์", "สมุทรสงคราม"] },
  { group: "330 บาท", provinces: ["นราธิวาส", "ปัตตานี", "แม่ฮ่องสอน", "ตาก", "แพร่", "มุกดาหาร", "อำนาจเจริญ", "น่าน", "ศรีสะเกษ", "ยโสธร", "ชัยภูมิ"] },
];

// Flatten for dropdown
const ALL_PROVINCES = WAGE_DATA.flatMap(g => 
  g.provinces.map(p => ({ name: p, wage: parseInt(g.group) }))
).sort((a, b) => a.name.localeCompare(b.name, 'th'));

export default function MinimumWageProvince({ lang }: any) {
  const [inputs, setInputs] = useState({
    prov1: ALL_PROVINCES.find(p => p.name === "กรุงเทพมหานคร")?.name || "",
    prov2: ALL_PROVINCES.find(p => p.name === "ภูเก็ต")?.name || "",
    workers: 50,
    daysPerMonth: 26,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));
  };

  const wage1 = ALL_PROVINCES.find(p => p.name === inputs.prov1)?.wage || 0;
  const wage2 = ALL_PROVINCES.find(p => p.name === inputs.prov2)?.wage || 0;

  const monthlyCost1 = wage1 * inputs.daysPerMonth;
  const monthlyCost2 = wage2 * inputs.daysPerMonth;

  const totalMonthlyCost1 = monthlyCost1 * inputs.workers;
  const totalMonthlyCost2 = monthlyCost2 * inputs.workers;

  const diffMonthly = totalMonthlyCost1 - totalMonthlyCost2;
  const diffYearly = diffMonthly * 12;

  const formatNumber = (num: number) => num.toLocaleString('th-TH');

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-50 text-slate-800">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-rose-600" />
          <h2 className="text-2xl font-bold text-slate-800">เปรียบเทียบต้นทุนค่าแรงขั้นต่ำรายจังหวัด</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-rose-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-rose-900 flex items-center gap-2">
                <Users className="w-5 h-5" /> ข้อมูลพนักงานและการทำงาน
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">จำนวนพนักงาน (คน)</label>
                  <input type="number" name="workers" value={inputs.workers} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">วันทำงานต่อเดือน (วัน)</label>
                  <input type="number" name="daysPerMonth" value={inputs.daysPerMonth} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Building className="w-5 h-5 text-slate-500" /> เลือกจังหวัดที่ต้องการเปรียบเทียบ
              </h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50/50">
                  <label className="block text-sm font-bold text-blue-800 mb-2">จังหวัดที่ 1 (พื้นที่ A)</label>
                  <select name="prov1" value={inputs.prov1} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white">
                    {ALL_PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  <div className="mt-2 text-sm text-slate-600">อัตราค่าแรง: <span className="font-bold text-blue-700">{wage1} บาท/วัน</span></div>
                </div>

                <div className="p-4 border rounded-lg bg-emerald-50/50">
                  <label className="block text-sm font-bold text-emerald-800 mb-2">จังหวัดที่ 2 (พื้นที่ B)</label>
                  <select name="prov2" value={inputs.prov2} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white">
                    {ALL_PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  <div className="mt-2 text-sm text-slate-600">อัตราค่าแรง: <span className="font-bold text-emerald-700">{wage2} บาท/วัน</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">เปรียบเทียบต้นทุนค่าจ้าง</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="text-sm font-bold text-blue-800 mb-1 truncate">{inputs.prov1}</div>
                <div className="space-y-2 mt-3">
                  <div>
                    <div className="text-xs text-slate-500">ต้นทุนต่อคน/เดือน</div>
                    <div className="font-semibold">{formatNumber(monthlyCost1)} ฿</div>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <div className="text-xs text-slate-500">ต้นทุนรวม ({inputs.workers} คน)/เดือน</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(totalMonthlyCost1)} ฿</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="text-sm font-bold text-emerald-800 mb-1 truncate">{inputs.prov2}</div>
                <div className="space-y-2 mt-3">
                  <div>
                    <div className="text-xs text-slate-500">ต้นทุนต่อคน/เดือน</div>
                    <div className="font-semibold">{formatNumber(monthlyCost2)} ฿</div>
                  </div>
                  <div className="pt-2 border-t border-emerald-200">
                    <div className="text-xs text-slate-500">ต้นทุนรวม ({inputs.workers} คน)/เดือน</div>
                    <div className="text-lg font-bold text-emerald-900">{formatNumber(totalMonthlyCost2)} ฿</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${Math.abs(diffMonthly) > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-100 border-slate-200'}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600"/> สรุปส่วนต่างต้นทุน
              </h3>
              
              {Math.abs(diffMonthly) === 0 ? (
                <p className="text-slate-600">ทั้งสองจังหวัดมีฐานค่าแรงเท่ากัน ไม่มีส่วนต่างต้นทุนค่าจ้าง</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    หากตั้งสถานประกอบการที่ <strong>{diffMonthly > 0 ? inputs.prov2 : inputs.prov1}</strong> จะประหยัดค่าจ้างกว่า <strong>{diffMonthly > 0 ? inputs.prov1 : inputs.prov2}</strong>
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>ประหยัดได้ต่อเดือน:</span>
                    <span className="font-bold text-amber-700">{formatNumber(Math.abs(diffMonthly))} ฿</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-amber-200">
                    <span>ประหยัดได้ต่อปี:</span>
                    <span className="font-bold text-amber-700 text-xl">{formatNumber(Math.abs(diffYearly))} ฿</span>
                  </div>
                  
                  <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    หมายเหตุ: การคำนวณนี้คิดจากฐานค่าแรงขั้นต่ำเท่านั้น ยังไม่รวมค่าล่วงเวลา (OT) สวัสดิการ หรือค่าใช้จ่ายด้านโลจิสติกส์อื่นๆ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">เจาะลึกนโยบายค่าแรงขั้นต่ำของไทย: ปัจจัยสำคัญในการเลือกทำเลที่ตั้งธุรกิจ</h2>
        
        <p>อัตราค่าจ้างขั้นต่ำ (Minimum Wage) ถือเป็นหนึ่งในปัจจัยทางเศรษฐศาสตร์ที่มีผลอย่างมากต่อการตัดสินใจลงทุนและการดำเนินธุรกิจในประเทศไทย โดยเฉพาะอุตสาหกรรมที่ใช้แรงงานเข้มข้น (Labor-intensive) เช่น ภาคการผลิต ภาคการเกษตร และภาคบริการ</p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมค่าแรงขั้นต่ำในแต่ละจังหวัดจึงไม่เท่ากัน?</h3>
        <p>ประเทศไทยมีการกำหนดค่าแรงขั้นต่ำโดย <strong>คณะกรรมการค่าจ้าง (ไตรภาคี)</strong> ซึ่งประกอบด้วยตัวแทนรัฐบาล นายจ้าง และลูกจ้าง โดยจะพิจารณาจากปัจจัยทางเศรษฐกิจที่แตกต่างกันในแต่ละพื้นที่ ได้แก่:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ดัชนีค่าครองชีพ (Cost of Living):</strong> จังหวัดที่เป็นเมืองท่องเที่ยวหรือศูนย์กลางเศรษฐกิจ เช่น ภูเก็ต กทม. ชลบุรี จะมีค่าใช้จ่ายพื้นฐานสูงกว่า</li>
          <li><strong>อัตราเงินเฟ้อ:</strong> การปรับตัวขึ้นของราคาสินค้าอุปโภคบริโภคในพื้นที่นั้นๆ</li>
          <li><strong>มาตรฐานการครองชีพ:</strong> ความจำเป็นพื้นฐานของลูกจ้างในการดำรงชีพอย่างเหมาะสม</li>
          <li><strong>ความสามารถในการจ่ายของนายจ้าง:</strong> ศักยภาพของธุรกิจในจังหวัดนั้นๆ ต้นทุนการผลิต และผลกำไร</li>
          <li><strong>ผลิตภาพแรงงาน (Labor Productivity) และภาวะเศรษฐกิจมวลรวม:</strong> GDP ของจังหวัด และอัตราการเจริญเติบโตทางเศรษฐกิจ</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ผลกระทบต่อการเลือกทำเลที่ตั้งโรงงาน (Plant Location Strategy)</h3>
        <p>สำหรับนักลงทุนและผู้ประกอบการ การเลือกจังหวัดเพื่อตั้งโรงงานหรือสถานประกอบการ ไม่สามารถมองแค่ตัวเลขค่าแรงที่ถูกที่สุดเพียงอย่างเดียว แต่ต้องพิจารณาปัจจัยเชิงกลยุทธ์ด้านโลจิสติกส์ควบคู่ไปด้วย (Total Landed Cost)</p>
        
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">ข้อดีของจังหวัดค่าแรงสูง (เช่น โซน EEC)</h4>
            <ul className="list-disc pl-5 text-sm mt-2 text-slate-700">
              <li>โครงสร้างพื้นฐานดีเยี่ยม ใกล้ท่าเรือ (แหลมฉบัง) ใกล้สนามบิน</li>
              <li>ค่าขนส่งสินค้าระหว่างประเทศต่ำกว่า ประหยัดค่า Logistics</li>
              <li>หาแรงงานทักษะสูง (Skilled Labor) ได้ง่ายกว่า</li>
              <li>สิทธิประโยชน์ทางภาษีจาก BOI หรือ EEC</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-bold text-emerald-800">ข้อดีของจังหวัดค่าแรงต่ำ (เช่น ภาคอีสาน/เหนือ)</h4>
            <ul className="list-disc pl-5 text-sm mt-2 text-slate-700">
              <li>ประหยัดต้นทุนค่าจ้างแรงงานฝ่ายผลิตได้อย่างมหาศาล</li>
              <li>อัตราการหมุนเวียนพนักงาน (Turnover Rate) มักจะต่ำกว่า เพราะแรงงานได้อยู่ใกล้ภูมิลำเนา</li>
              <li>ราคาที่ดินสำหรับตั้งโรงงานหรือโกดังถูกกว่ามาก</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ข้อควรระวังสำหรับนายจ้าง</h3>
        <p>ตามกฎหมายคุ้มครองแรงงาน นายจ้างต้องจ่ายค่าจ้าง <strong>ไม่น้อยกว่า</strong> อัตราค่าจ้างขั้นต่ำของจังหวัดที่สถานประกอบการนั้นตั้งอยู่ หากฝ่าฝืนมีโทษทางอาญาทั้งจำและปรับ นอกจากนี้ การจ่ายค่าล่วงเวลา (OT) การทำงานในวันหยุด หรือการคำนวณเงินชดเชยต่างๆ ล้วนต้องใช้ฐานค่าจ้างขั้นต่ำนี้เป็นเกณฑ์ในการคำนวณทั้งสิ้น การวางแผนต้นทุนแรงงานอย่างรอบคอบจึงเป็นหัวใจสำคัญในการรักษาความสามารถในการแข่งขันของธุรกิจ</p>
      </article>
    </div>
  );
}
