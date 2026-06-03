import React, { useState } from 'react';
import { Droplets, Shirt, Coffee, Smartphone, Calculator, RotateCcw, Droplet } from 'lucide-react';

export default function ProductWaterFootprint({ lang }: { lang: 'TH' | 'EN' }) {
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [product, setProduct] = useState<string>('jeans');

  const t = {
    title: lang === 'TH' ? 'คำนวณวอเตอร์ฟุตพริ้นท์ (ร่องรอยการใช้น้ำ)' : 'Product Water Footprint Calculator',
    quantity: lang === 'TH' ? 'จำนวนชิ้น/แก้ว' : 'Quantity',
    product: lang === 'TH' ? 'ประเภทสินค้า' : 'Product Type',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    result: lang === 'TH' ? 'ปริมาณน้ำที่ซ่อนอยู่ในการผลิต (ลิตร)' : 'Hidden Water Used (Liters)',
    bottleEquivalent: lang === 'TH' ? 'เทียบเท่าน้ำดื่มขวด 1.5 ลิตร' : 'Eq. to 1.5L water bottles',
    bottles: lang === 'TH' ? 'ขวด' : 'bottles',
    products: {
      jeans: lang === 'TH' ? 'กางเกงยีนส์ 1 ตัว' : '1 Pair of Jeans',
      tshirt: lang === 'TH' ? 'เสื้อยืดคอตตอน 1 ตัว' : '1 Cotton T-Shirt',
      smartphone: lang === 'TH' ? 'สมาร์ทโฟน 1 เครื่อง' : '1 Smartphone',
      coffee: lang === 'TH' ? 'กาแฟ 1 แก้ว' : '1 Cup of Coffee',
      chocolate: lang === 'TH' ? 'ช็อกโกแลต 1 บาร์ (100g)' : '1 Chocolate Bar (100g)',
      beef_burger: lang === 'TH' ? 'แฮมเบอร์เกอร์เนื้อ 1 ชิ้น' : '1 Beef Burger',
      paper: lang === 'TH' ? 'กระดาษ A4 1 รีม (500 แผ่น)' : '1 Ream of A4 Paper',
    }
  };

  // Approximate hidden water (liters per unit) based on Water Footprint Network data
  const waterFactors: Record<string, number> = {
    jeans: 7500, // Cotton growing + dyeing
    tshirt: 2500, // Cotton growing + processing
    smartphone: 12000, // Mining rare earths + manufacturing
    coffee: 140, // Growing beans + roasting per cup (125ml)
    chocolate: 1700, // Cocoa farming per 100g
    beef_burger: 2400, // Feed growing + processing
    paper: 5000, // 10L per sheet * 500
  };

  const getProductIcon = (type: string) => {
    if (['jeans', 'tshirt'].includes(type)) return <Shirt className="w-5 h-5 text-indigo-500" />;
    if (['coffee', 'chocolate', 'beef_burger'].includes(type)) return <Coffee className="w-5 h-5 text-amber-600" />;
    if (['smartphone'].includes(type)) return <Smartphone className="w-5 h-5 text-gray-700" />;
    return <Droplets className="w-5 h-5 text-blue-500" />;
  };

  const totalWater = (Number(quantity) || 0) * waterFactors[product];
  const equivalentBottles = totalWater / 1.5;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Droplets className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.quantity}
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                placeholder="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.product}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getProductIcon(product)}
                </div>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {Object.entries(t.products).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setQuantity(1);
                setProduct('jeans');
              }}
              className="w-full mt-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-sky-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-sky-100">
            <div className="w-full">
              <p className="text-sky-800 text-sm font-medium mb-2">{t.result}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-sky-600">
                  {totalWater.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-lg text-sky-700 font-medium">L</span>
              </div>
            </div>
            
            {totalWater > 0 && (
              <div className="w-full pt-4 border-t border-sky-200/60">
                <p className="text-gray-600 text-sm mb-2">{t.bottleEquivalent}</p>
                <div className="flex items-center justify-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-800">
                    {equivalentBottles.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-gray-600">{t.bottles}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-blue max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'วอเตอร์ฟุตพริ้นท์ (Water Footprint): น้ำปริศนาที่ซ่อนอยู่ในของใช้รอบตัว' : 'Product Water Footprint: The Hidden Water in Everyday Goods'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              เวลาเราพูดถึงการ "ประหยัดน้ำ" ภาพแรกที่คนส่วนใหญ่นึกถึงคือการปิดก๊อกขณะแปรงฟัน หรือใช้เวลาอาบน้ำให้น้อยลง นั่นคือ <strong>"การใช้น้ำทางตรง" (Direct Water Use)</strong> แต่คุณรู้หรือไม่ว่า น้ำส่วนใหญ่ที่เราใช้ในแต่ละวัน กลับเป็น <strong>"น้ำที่ซ่อนอยู่" (Virtual Water หรือ Hidden Water)</strong> ซึ่งแฝงอยู่ในกระบวนการผลิตอาหารและข้าวของเครื่องใช้ต่างๆ หรือที่เรียกว่า <strong>วอเตอร์ฟุตพริ้นท์ (Water Footprint)</strong> นั่นเอง
            </p>

            <h3>Water Footprint คืออะไร?</h3>
            <p>
              วอเตอร์ฟุตพริ้นท์ คือ ปริมาณน้ำจืดทั้งหมดที่ใช้ (หรือทำให้ปนเปื้อน) ในกระบวนการผลิตสินค้าหนึ่งชิ้น ตั้งแต่จุดเริ่มต้นไปจนถึงมือผู้บริโภค โดยแบ่งออกเป็น 3 ประเภทหลัก:
            </p>
            <ul>
              <li><strong>น้ำสีเขียว (Green Water):</strong> น้ำฝนที่ถูกพืชดูดซับไปใช้ในการเจริญเติบโต (พบมากในสินค้าเกษตร)</li>
              <li><strong>น้ำสีฟ้า (Blue Water):</strong> น้ำผิวดินหรือน้ำใต้ดินที่ถูกปั๊มมาใช้ในอุตสาหกรรม การชลประทาน หรือการอุปโภค</li>
              <li><strong>น้ำสีเทา (Grey Water):</strong> ปริมาณน้ำจืดที่ต้องใช้เพื่อเจือจางน้ำเสียจากกระบวนการผลิตให้กลับมาอยู่ในเกณฑ์มาตรฐานความปลอดภัย</li>
            </ul>

            <h3>ความจริงที่น่าตกใจของ "น้ำที่ซ่อนอยู่"</h3>
            <p>
              ตัวเลขจาก <em>Water Footprint Network</em> ชี้ให้เห็นว่าสินค้าในชีวิตประจำวันของเราสูบน้ำจากโลกไปมหาศาล:
            </p>
            <ul>
              <li><strong>กางเกงยีนส์ 1 ตัว (7,500 ลิตร):</strong> ฝ้ายเป็นพืชที่กระหายน้ำมาก การปลูกฝ้าย ไปจนถึงกระบวนการฟอกย้อมและซักเพื่อให้เกิดลวดลาย ใช้น้ำเทียบเท่ากับที่คุณอาบน้ำฝักบัวทุกวันต่อเนื่องนานถึง 3-4 เดือน!</li>
              <li><strong>สมาร์ทโฟน 1 เครื่อง (12,000 ลิตร):</strong> กระบวนการทำเหมืองแร่หายาก (Rare Earth) การสกัดโลหะ และการชะล้างชิ้นส่วนไมโครชิปในโรงงาน ใช้น้ำบริสุทธิ์จำนวนมหาศาลและสร้างน้ำเสียสูงมาก</li>
              <li><strong>กาแฟ 1 แก้ว (140 ลิตร):</strong> กาแฟยามเช้า 1 แก้วเล็กๆ ไม่ได้ใช้น้ำแค่ปริมาตรในแก้ว แต่ต้องรวมน้ำที่ใช้รดต้นกาแฟตลอดวงจรชีวิตของมันด้วย</li>
            </ul>

            <h3>เราจะช่วยลด Water Footprint ได้อย่างไร?</h3>
            <p>
              วิธีที่ดีที่สุดคือ <strong>"การลดการบริโภคเกินความจำเป็น" (Reduce)</strong> และ <strong>"ยืดอายุการใช้งาน" (Reuse)</strong>:
            </p>
            <ol>
              <li>ใส่เสื้อผ้าให้นานขึ้น สนับสนุนแฟชั่นมือสอง (Second-hand fashion) แทน Fast Fashion</li>
              <li>ใช้สมาร์ทโฟนและอุปกรณ์อิเล็กทรอนิกส์จนกว่าจะพัง ไม่เปลี่ยนตามเทรนด์ทุกปี</li>
              <li>ลดปริมาณขยะอาหาร (Food Waste) เพราะการทิ้งอาหาร เท่ากับการทิ้งน้ำหลายพันลิตรที่ใช้ผลิตมันขึ้นมา</li>
            </ol>
            <p>
              ใช้ <em>เครื่องคำนวณ Water Footprint</em> ของเรา เพื่อตระหนักถึงคุณค่าของทรัพยากรธรรมชาติที่ซ่อนอยู่ในของทุกชิ้นที่คุณซื้อ ก่อนตัดสินใจจ่ายเงินครั้งต่อไป!
            </p>
          </>
        ) : (
          <>
            <p>
              When we talk about "water conservation," most people think about taking shorter showers or turning off the tap while brushing their teeth. That represents our <strong>Direct Water Use</strong>. However, the vast majority of our daily water consumption is actually <strong>"Virtual Water" (or Hidden Water)</strong> embedded in the products we buy and the food we eat. This is measured by a metric known as the <strong>Product Water Footprint</strong>.
            </p>

            <h3>What is a Water Footprint?</h3>
            <p>
              A product's water footprint is the total volume of freshwater used, evaporated, or polluted across its entire supply chain—from raw material extraction to the final product. It consists of three components:
            </p>
            <ul>
              <li><strong>Green Water:</strong> Rainwater that is stored in the soil and evaporated by crops (dominant in agriculture).</li>
              <li><strong>Blue Water:</strong> Surface or groundwater extracted from lakes, rivers, or aquifers for irrigation, industry, or domestic use.</li>
              <li><strong>Grey Water:</strong> The volume of freshwater required to dilute pollutants generated during production back to acceptable water quality standards.</li>
            </ul>

            <h3>The Shocking Reality of Hidden Water</h3>
            <p>
              Data from the <em>Water Footprint Network</em> reveals the astronomical amounts of water hidden in everyday items:
            </p>
            <ul>
              <li><strong>One Pair of Jeans (7,500 Liters):</strong> Cotton is a highly thirsty crop. Growing the cotton, combined with the intense washing and chemical dyeing processes, uses enough water to sustain your daily showers for over 3 months!</li>
              <li><strong>One Smartphone (12,000 Liters):</strong> Mining rare earth metals, fabricating microchips in ultra-clean environments, and cooling manufacturing facilities requires massive amounts of highly purified water.</li>
              <li><strong>One Cup of Coffee (140 Liters):</strong> That 125ml morning brew requires 140 liters of water to grow, process, roast, and ship the coffee beans required to make it.</li>
            </ul>

            <h3>How Can We Reduce Our Water Footprint?</h3>
            <p>
              The most effective strategy is practicing mindful consumption—focusing on <strong>Reducing</strong> and <strong>Reusing</strong>:
            </p>
            <ol>
              <li>Extend the life of your wardrobe. Embrace second-hand clothing and reject the disposable nature of "Fast Fashion."</li>
              <li>Use your electronics and smartphones until they break, rather than upgrading annually for minor feature bumps.</li>
              <li>Minimize Food Waste. Throwing away food means throwing away the thousands of liters of virtual water used to grow it.</li>
            </ol>
            <p>
              Use our <em>Product Water Footprint Calculator</em> to visualize the hidden ecological cost of your purchases. Becoming aware of virtual water is the first step toward building a more sustainable, resource-conscious lifestyle!
            </p>
          </>
        )}
      </article>
    </div>
  );
}
