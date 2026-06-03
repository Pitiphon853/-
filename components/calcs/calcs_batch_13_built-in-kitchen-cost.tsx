import React, { useState } from 'react';
import { ChefHat, Calculator } from 'lucide-react';

export default function BuiltInKitchenCost({ lang }: any) {
  const isTH = lang === 'TH';
  const [lengthMeters, setLengthMeters] = useState<number>(3);
  const [cabinetMaterial, setCabinetMaterial] = useState<string>('hmr');
  const [topMaterial, setTopMaterial] = useState<string>('artificial_stone');
  const [includeAppliances, setIncludeAppliances] = useState<boolean>(true);
  const [applianceBudget, setApplianceBudget] = useState<number>(25000); // Sink, Hob, Hood
  const [installationFee, setInstallationFee] = useState<number>(5000);

  // Prices per meter
  const cabinetPrices: any = {
    particle: 6000,
    mdf: 8000,
    hmr: 12000,
    plastwood: 15000
  };

  const topPrices: any = {
    laminate: 2000,
    granite: 4000,
    artificial_stone: 6000,
    quartz: 9000
  };

  const cabinetCost = lengthMeters * cabinetPrices[cabinetMaterial];
  const topCost = lengthMeters * topPrices[topMaterial];
  const totalApplianceCost = includeAppliances ? applianceBudget : 0;
  
  const totalCost = cabinetCost + topCost + totalApplianceCost + installationFee;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <ChefHat className="w-8 h-8 text-amber-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'ประเมินราคาชุดครัวบิ้วอิน (Built-in Kitchen)' : 'Built-in Kitchen Cost Estimator'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ความยาวชุดครัว (เมตร)' : 'Kitchen Length (Meters)'}</label>
            <input type="number" step="0.1" value={lengthMeters} onChange={(e) => setLengthMeters(Number(e.target.value))} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-amber-500" />
            <p className="text-xs text-gray-500 mt-1">{isTH ? 'รวมเคาน์เตอร์ล่างและตู้แขวนบน' : 'Includes lower counter and upper wall cabinets'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'วัสดุโครงตู้และหน้าบาน' : 'Cabinet Material'}</label>
            <select value={cabinetMaterial} onChange={(e) => setCabinetMaterial(e.target.value)} className="w-full p-2 border rounded-lg">
              <option value="particle">{isTH ? 'Particle Board (ราคาประหยัด ไม่กันน้ำ)' : 'Particle Board'}</option>
              <option value="mdf">{isTH ? 'MDF (เรียบเนียน ทำสีสวย กันชื้นปานกลาง)' : 'MDF'}</option>
              <option value="hmr">{isTH ? 'HMR (ไม้กันชื้น ยอดนิยมสำหรับครัว)' : 'HMR (Moisture Resistant)'}</option>
              <option value="plastwood">{isTH ? 'Plastwood (กันน้ำ กันปลวก 100%)' : 'Plastwood (Water/Termite Proof)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'วัสดุท็อปเคาน์เตอร์' : 'Countertop Material'}</label>
            <select value={topMaterial} onChange={(e) => setTopMaterial(e.target.value)} className="w-full p-2 border rounded-lg">
              <option value="laminate">{isTH ? 'ลามิเนต (Laminate) - ราคาถูก ลายไม้สวย' : 'Laminate'}</option>
              <option value="granite">{isTH ? 'หินแกรนิต (Granite) - ทนทาน ธรรมชาติ' : 'Granite'}</option>
              <option value="artificial_stone">{isTH ? 'หินสังเคราะห์ (Artificial Stone) - ไร้รอยต่อ สีขาวสวย' : 'Artificial Stone'}</option>
              <option value="quartz">{isTH ? 'หินควอตซ์ (Quartz) - ทนรอยขีดข่วน พรีเมียม' : 'Quartz'}</option>
            </select>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="flex items-center space-x-2 cursor-pointer mb-3">
              <input type="checkbox" checked={includeAppliances} onChange={(e) => setIncludeAppliances(e.target.checked)} className="rounded text-amber-600 focus:ring-amber-500" />
              <span className="font-medium text-gray-700">{isTH ? 'รวมงบเครื่องใช้ไฟฟ้า (ซิงค์, เตา, ฮูด)' : 'Include Appliances (Sink, Hob, Hood)'}</span>
            </label>
            {includeAppliances && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">{isTH ? 'งบประมาณเครื่องใช้ไฟฟ้า (บาท)' : 'Appliance Budget (THB)'}</label>
                <input type="number" value={applianceBudget} onChange={(e) => setApplianceBudget(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isTH ? 'ค่าแรงติดตั้ง/ขนส่ง (บาท)' : 'Installation & Delivery Fee'}</label>
            <input type="number" value={installationFee} onChange={(e) => setInstallationFee(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-amber-900 mb-6">{isTH ? 'สรุปประเมินราคางานครัว' : 'Kitchen Cost Estimate'}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าโครงตู้และหน้าบาน' : 'Cabinet Cost'}:</span>
              <span>฿{cabinetCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าท็อปเคาน์เตอร์' : 'Countertop Cost'}:</span>
              <span>฿{topCost.toLocaleString()}</span>
            </div>
            {includeAppliances && (
              <div className="flex justify-between text-gray-700">
                <span>{isTH ? 'เครื่องใช้ไฟฟ้า' : 'Appliances'}:</span>
                <span>฿{totalApplianceCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-700">
              <span>{isTH ? 'ค่าแรงติดตั้ง' : 'Installation'}:</span>
              <span>฿{installationFee.toLocaleString()}</span>
            </div>
            
            <div className="pt-6 mt-4 border-t border-amber-200">
              <div className="text-center">
                <span className="block text-sm text-gray-600 mb-2">{isTH ? 'ยอดประเมินรวมสุทธิ' : 'Estimated Total Cost'}</span>
                <span className="text-5xl font-extrabold text-amber-600">฿{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-10 prose prose-amber max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isTH ? 'บิ้วอินครัวราคาเท่าไหร่? คู่มือเลือกวัสดุให้เหมาะกับงบประมาณ' : 'Planning Your Built-in Kitchen Budget'}
        </h2>
        {isTH ? (
          <>
            <p>ห้องครัวเปรียบเสมือนหัวใจของบ้าน การทำ "ชุดครัวบิ้วอิน" (Built-in Kitchen) จึงเป็นการลงทุนที่หลายคนให้ความสำคัญ เพราะได้ครัวที่สวยงาม พอดีกับพื้นที่ และตอบโจทย์การใช้งานจริง แต่ราคาของครัวบิ้วอินนั้นแกว่งมาก ขึ้นอยู่กับ "ความยาว" และ "วัสดุ" ที่คุณเลือกใช้</p>
            <h3>1. วัสดุโครงตู้และหน้าบาน</h3>
            <ul>
              <li><strong>Particle Board:</strong> ราคาถูกที่สุด นิยมใช้ในครัวโครงการคอนโดทั่วไป ข้อเสียคือไม่ทนน้ำ หากโดนน้ำขังจะบวมพองได้ง่าย</li>
              <li><strong>MDF (Medium Density Fiberboard):</strong> เนื้อไม้เนียนละเอียดกว่า ทำสีพ่นได้สวยงาม แต่ความทนน้ำยังอยู่ในระดับปานกลาง</li>
              <li><strong>HMR (High Moisture Resistance board):</strong> ไม้อัดทนชื้น (มักมีเนื้อสีเขียว) เป็นที่นิยมสูงสุดสำหรับการทำครัวบิ้วอินในปัจจุบัน เพราะทนความชื้นได้ดีและราคาจับต้องได้</li>
              <li><strong>Plastwood:</strong> แผ่นพลาสติกผสมไม้ กันน้ำและกันปลวกได้ 100% เหมาะสำหรับบ้านที่มีปัญหาเรื่องปลวก หรือบริเวณซิงค์ล้างจาน แต่มีราคาสูงที่สุด</li>
            </ul>
            <h3>2. วัสดุท็อปเคาน์เตอร์ (Countertop)</h3>
            <ul>
              <li><strong>ลามิเนต (Laminate):</strong> ราคาประหยัด มีลายไม้ให้เลือกเยอะ แต่ไม่ทนความร้อนและรอยขีดข่วน</li>
              <li><strong>หินแกรนิต (Granite):</strong> แข็งแรง ทนทาน ทนความร้อน นิยมใช้ทำครัวไทย แต่มีรอยต่อของหิน</li>
              <li><strong>หินสังเคราะห์ (Artificial Stone):</strong> สีสันสวยงาม (เช่น สีขาวล้วน) ไร้รอยต่อ ทำความสะอาดง่าย แต่ระวังคราบฝังลึกจากเครื่องเทศ เช่น ขมิ้น</li>
              <li><strong>หินควอตซ์ (Quartz):</strong> หรูหราพรีเมียม แข็งแรงมาก ทนรอยขีดข่วนและไม่ซึมน้ำ แต่ราคาสูง</li>
            </ul>
            <h3>สรุป</h3>
            <p>นอกจากค่าไม้และหินแล้ว อย่าลืมเผื่องบประมาณสำหรับ "เครื่องใช้ไฟฟ้าในครัว" เช่น ซิงค์ล้างจาน เตาแก๊ส/เตาแม่เหล็กไฟฟ้า และเครื่องดูดควัน (Hood) ซึ่งโดยเฉลี่ยมักจะใช้งบประมาณ 20,000 - 40,000 บาทขึ้นไป การใช้เครื่องคำนวณของเราจะช่วยให้คุณออกแบบงบประมาณครัวในฝันได้อย่างสมจริงที่สุด</p>
          </>
        ) : (
          <p>The cost of a built-in kitchen largely depends on its length and the materials used for cabinets and countertops. Particle board and laminate are budget-friendly but less durable against moisture. HMR (High Moisture Resistance) wood and artificial stone offer a great balance of durability and price. For ultimate longevity, Plastwood and Quartz are top-tier choices. Use our calculator to mix and match materials and estimate your kitchen project budget accurately, including essential appliances.</p>
        )}
      </article>
    </div>
  );
}
