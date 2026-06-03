import React, { useState } from 'react';
import { Calendar, Calculator, RotateCcw, Info, Sunrise } from 'lucide-react';

export default function HarvestTime({ lang }: { lang: 'TH' | 'EN' }) {
  const [plantingDate, setPlantingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [daysToMaturity, setDaysToMaturity] = useState<number | ''>(90);

  const t = {
    title: lang === 'TH' ? 'คำนวณระยะเวลาเก็บเกี่ยว' : 'Expected Harvest Time Calculator',
    plantingDate: lang === 'TH' ? 'วันที่เพาะปลูก' : 'Planting Date',
    daysToMaturity: lang === 'TH' ? 'อายุเก็บเกี่ยว (วัน)' : 'Days to Maturity',
    calculate: lang === 'TH' ? 'คำนวณ' : 'Calculate',
    reset: lang === 'TH' ? 'เริ่มใหม่' : 'Reset',
    harvestDate: lang === 'TH' ? 'วันที่คาดว่าจะเก็บเกี่ยวได้' : 'Expected Harvest Date',
    daysLeft: lang === 'TH' ? 'เหลือเวลาอีก (วัน)' : 'Days Remaining',
    pastHarvest: lang === 'TH' ? 'ผ่านมาแล้ว (วัน)' : 'Days Past Harvest',
    today: lang === 'TH' ? 'วันนี้' : 'Today',
  };

  const calculateDates = () => {
    if (!plantingDate || !daysToMaturity) return { harvestDate: null, diffDays: null };
    
    const start = new Date(plantingDate);
    const end = new Date(start);
    end.setDate(start.getDate() + Number(daysToMaturity));
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const endMidnight = new Date(end);
    endMidnight.setHours(0,0,0,0);
    
    const diffTime = endMidnight.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { harvestDate: end, diffDays };
  };

  const { harvestDate, diffDays } = calculateDates();

  const formatDate = (date: Date) => {
    if (lang === 'TH') {
      const result = date.toLocaleDateString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return result;
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.plantingDate}
              </label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.daysToMaturity}
              </label>
              <input
                type="number"
                value={daysToMaturity}
                onChange={(e) => setDaysToMaturity(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                min="1"
                placeholder="90"
              />
            </div>

            <button
              onClick={() => {
                setPlantingDate(new Date().toISOString().split('T')[0]);
                setDaysToMaturity(90);
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.reset}
            </button>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-4 border border-purple-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
              <Sunrise className="w-8 h-8 text-purple-600" />
            </div>
            <div className="w-full">
              <p className="text-purple-800 text-sm font-medium mb-2">{t.harvestDate}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                {harvestDate ? formatDate(harvestDate) : '-'}
              </p>
            </div>
            
            {diffDays !== null && (
              <div className="pt-4 border-t border-purple-200 w-full mt-4">
                {diffDays > 0 ? (
                  <>
                    <p className="text-gray-600 text-sm mb-1">{t.daysLeft}</p>
                    <p className="text-3xl font-bold text-purple-600">{diffDays}</p>
                  </>
                ) : diffDays === 0 ? (
                  <p className="text-2xl font-bold text-green-600">{t.today}</p>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm mb-1">{t.pastHarvest}</p>
                    <p className="text-3xl font-bold text-red-500">{Math.abs(diffDays)}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article Section */}
      <article className="prose prose-purple max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {lang === 'TH' ? 'การคำนวณระยะเวลาเก็บเกี่ยว: กุญแจสำคัญสู่การวางแผนฟาร์มที่แม่นยำ' : 'Harvest Time Calculation: The Key to Precise Farm Planning'}
        </h2>
        
        {lang === 'TH' ? (
          <>
            <p>
              ความสำเร็จของการทำเกษตรกรรม ไม่ได้สิ้นสุดแค่ตอนลงมือปลูกเท่านั้น แต่รวมถึง <strong>การเก็บเกี่ยว (Harvesting)</strong> ให้ตรงเวลาด้วย การคำนวณระยะเวลาเก็บเกี่ยวล่วงหน้า เป็นเครื่องมือสำคัญที่ช่วยให้เกษตรกรสามารถบริหารจัดการฟาร์มได้อย่างมีประสิทธิภาพ ตั้งแต่การเตรียมคนงาน เครื่องจักร ไปจนถึงการทำการตลาดล่วงหน้า
            </p>

            <h3>ทำไมต้องรู้วันเก็บเกี่ยวที่แน่ชัด?</h3>
            <ul>
              <li><strong>เตรียมพร้อมแรงงานและเครื่องจักร:</strong> ช่วงเก็บเกี่ยวเป็นช่วงที่ใช้แรงงานและอุปกรณ์มากที่สุด หากไม่ทราบวันล่วงหน้า อาจเกิดปัญหาขาดแคลนคนงานหรือหาเช่ารถเกี่ยวไม่ทัน</li>
              <li><strong>วางแผนการขายและโลจิสติกส์:</strong> การติดต่อพ่อค้าคนกลาง การเช่ารถขนส่ง หรือการรับพรีออเดอร์ (Pre-order) จากลูกค้า ต้องอาศัยวันส่งมอบที่แม่นยำ เพื่อไม่ให้เสียเครดิต</li>
              <li><strong>คุณภาพสูงสุดของผลผลิต:</strong> พืชแต่ละชนิดมีช่วงเวลาที่ให้คุณภาพดีที่สุด (Peak Maturity) หากเก็บเกี่ยวเร็วเกินไป น้ำหนักจะน้อยหรือรสชาติไม่ได้ที่ หากเก็บช้าเกินไป ผลผลิตอาจเน่าเสีย ร่วงหล่น หรือถูกแมลงทำลาย</li>
            </ul>

            <h3>"อายุเก็บเกี่ยว" (Days to Maturity) คืออะไร?</h3>
            <p>
              อายุเก็บเกี่ยว คือ จำนวนวันตั้งแต่เริ่มเพาะเมล็ด (หรือตั้งแต่วันย้ายกล้าลงแปลง) จนถึงวันที่พืชเจริญเติบโตเต็มที่พร้อมให้ผลผลิต ตัวเลขนี้มักระบุไว้หลังซองเมล็ดพันธุ์ ตัวอย่างเช่น:
            </p>
            <ul>
              <li><strong>ผักกินใบ (เช่น ผักบุ้ง, กวางตุ้ง):</strong> ประมาณ 25-45 วัน</li>
              <li><strong>ข้าวโพดหวาน:</strong> ประมาณ 70-75 วัน</li>
              <li><strong>ข้าวหอมมะลิ (ไวต่อช่วงแสง):</strong> ขึ้นอยู่กับเดือนที่ปลูก แต่ข้าวไม่ไวแสงมักใช้เวลา 90-120 วัน</li>
              <li><strong>เมล่อน/แคนตาลูป:</strong> ประมาณ 65-85 วัน</li>
            </ul>

            <h3>ปัจจัยที่ทำให้อายุเก็บเกี่ยวคลาดเคลื่อน</h3>
            <p>
              แม้ว่าเครื่องมือ <strong>เครื่องคำนวณระยะเวลาเก็บเกี่ยว (Harvest Time Calculator)</strong> จะให้วันที่คาดการณ์จากคณิตศาสตร์ที่แม่นยำ แต่ในโลกความเป็นจริง ธรรมชาติยังมีผลต่อการเติบโต:
            </p>
            <ol>
              <li><strong>อุณหภูมิและแสงแดด:</strong> ฤดูหนาวพืชมักโตช้ากว่าฤดูร้อนที่แดดจัด</li>
              <li><strong>น้ำและสารอาหาร:</strong> หากพืชขาดน้ำหรือปุ๋ย การเจริญเติบโตจะชะงัก ทำให้ต้องยืดอายุเก็บเกี่ยวออกไป</li>
              <li><strong>โรคและแมลง:</strong> ความเครียดจากศัตรูพืชอาจทำให้พืชสุกแก่เร็วกว่าปกติ (ทิ้งต้น) แต่ผลผลิตจะไม่ได้คุณภาพ</li>
            </ol>

            <p>
              เพื่อลดความผิดพลาด เกษตรกรควรใช้เครื่องคำนวณของเราเพื่อหาวันเก็บเกี่ยว "โดยประมาณ" (Expected Date) จากนั้นเมื่อใกล้ถึงเวลาที่กำหนด (ก่อนประมาณ 1 สัปดาห์) ควรลงแปลงเพื่อประเมินด้วยสายตาและประสบการณ์จริงอีกครั้ง วิธีนี้จะช่วยให้คุณบริหารฟาร์มได้อย่างมืออาชีพ
            </p>
          </>
        ) : (
          <>
            <p>
              A successful agricultural operation isn't just about planting seeds; it hinges heavily on timely <strong>Harvesting</strong>. Calculating your expected harvest time in advance is a vital management tool. It empowers farmers to efficiently coordinate labor, machinery, and marketing strategies well before the crop is ready to leave the field.
            </p>

            <h3>Why Do You Need an Exact Harvest Date?</h3>
            <ul>
              <li><strong>Labor and Machinery Preparation:</strong> The harvest season is incredibly resource-intensive. Without a projected date, you risk labor shortages or unavailability of critical equipment like combine harvesters.</li>
              <li><strong>Marketing and Logistics:</strong> Negotiating with wholesale buyers, booking freight transport, or running pre-order campaigns for a CSA (Community Supported Agriculture) requires precise delivery dates to maintain customer trust.</li>
              <li><strong>Peak Crop Quality:</strong> Every plant has an optimal window for harvest (Peak Maturity). Harvesting too early results in low yields and poor flavor, while harvesting too late increases the risk of over-ripening, rotting, or pest damage.</li>
            </ul>

            <h3>What Does "Days to Maturity" Mean?</h3>
            <p>
              Days to Maturity is the standard number of days it takes for a crop to grow from a seed (or from the day of transplanting) to the point where it is ready to be harvested. This number is usually provided by the seed supplier. For example:
            </p>
            <ul>
              <li><strong>Leafy Greens (e.g., Spinach, Lettuce):</strong> 25-45 days</li>
              <li><strong>Sweet Corn:</strong> 70-75 days</li>
              <li><strong>Determinate Tomatoes:</strong> 70-90 days from transplant</li>
              <li><strong>Watermelon:</strong> 80-100 days</li>
            </ul>

            <h3>Variables That Affect Harvest Time</h3>
            <p>
              While our <strong>Harvest Time Calculator</strong> provides a mathematically accurate projected date, mother nature plays a significant role in actual crop development:
            </p>
            <ol>
              <li><strong>Temperature and Sunlight:</strong> Crops typically grow slower in cooler, overcast weather compared to warm, sunny conditions. Growing Degree Days (GDD) is often a more accurate scientific measure.</li>
              <li><strong>Water and Nutrients:</strong> Drought stress or nutrient deficiencies can stunt growth, thereby delaying the actual harvest date.</li>
              <li><strong>Pest and Disease Pressure:</strong> Severe stress can cause a plant to senesce (ripen and die off) prematurely, leading to an early but low-quality harvest.</li>
            </ol>

            <p>
              To minimize risks, use our calculator to establish a solid "Expected Date." Then, as that date approaches (about a week prior), begin physical scouting of your fields. Combining mathematical projections with real-world observation is the hallmark of professional farm management.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
