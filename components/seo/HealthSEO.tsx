import React from 'react';

export const HealthSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-pink-600 dark:text-pink-400 mb-6">1. บทนำ: ทำไมเราต้องคำนวณและใส่ใจตัวเลขด้านสุขภาพและอาหาร?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        "สุขภาพดีไม่มีขาย ถ้าอยากได้ต้องสร้างเอง" ประโยคนี้ยังคงเป็นความจริงเสมอในยุคปัจจุบัน ปัญหาใหญ่ (Pain Point) ของผู้คนที่พยายามลดน้ำหนัก หรือสร้างกล้ามเนื้อ คือการ "กะปริมาณเอาเอง" หรือ "กินตามความรู้สึก" 
        ซึ่งนำไปสู่ผลลัพธ์ที่ล้มเหลว ทำไมออกกำลังกายแทบตายแต่น้ำหนักไม่ลด? ทำไมกินน้อยแล้วแต่ไขมันยังสะสม? คำตอบคือคุณอาจจะกำลังคำนวณพลังงาน <strong>TDEE</strong> ผิดพลาด หรือไม่ได้ให้ความสำคัญกับสัดส่วน <strong>Macro Split</strong> และ <strong>โปรตีนที่ควรได้รับ</strong> ในแต่ละวัน
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        การนำวิทยาศาสตร์การกีฬาและโภชนาการมาประยุกต์ใช้ผ่าน "เครื่องมือคำนวณสุขภาพ" คือทางออกที่ดีที่สุด เว็บไซต์ของเราได้รวบรวมสุดยอดเครื่องมือสำหรับสายสุขภาพกว่า 16 รายการ ตั้งแต่การหาค่าพื้นฐานอย่าง <strong>BMI (ดัชนีมวลกาย)</strong>, การคำนวณ <strong>เปอร์เซ็นต์ไขมัน (Body Fat %)</strong>, ปริมาณ <strong>น้ำดื่ม</strong> ที่เหมาะสม ไปจนถึงเครื่องมือสำหรับนักวิ่งและนักยกน้ำหนัก เช่น <strong>1RM</strong>, <strong>โซนหัวใจ (Heart Rate Zone)</strong> และ <strong>Pace วิ่ง</strong> เครื่องมือทั้งหมดนี้จะเปลี่ยนการเดาสุ่ม ให้กลายเป็นการวางแผนสุขภาพที่มีตัวเลขสถิติรองรับอย่างแม่นยำ
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "สุขภาพและอาหาร" แบบง่ายๆ</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้คุณไปถึงเป้าหมาย ไม่ว่าจะเป็นการลดน้ำหนัก เพิ่มกล้ามเนื้อ หรือรักษาสุขภาพ เราได้แบ่งวิธีการใช้งานเครื่องมือออกเป็น 3 หมวดหมู่หลัก ดังนี้:</p>
      
      <div className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-3">หมวดโภชนาการและควบคุมน้ำหนัก (TDEE, BMI, Macro Split, ปริมาณน้ำดื่ม)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ประเมินร่างกายตัวเอง:</strong> เริ่มจากการใช้เครื่องมือ <strong>BMI</strong> หรือ <strong>เปอร์เซ็นต์ไขมัน (Body Fat)</strong> โดยกรอกน้ำหนัก ส่วนสูง อายุ และเพศ เพื่อดูว่าปัจจุบันคุณอยู่ในเกณฑ์ปกติ ท้วม หรืออันตราย</li>
          <li><strong>คำนวณพลังงานที่ใช้ต่อวัน:</strong> เลือกเครื่องมือ <strong>TDEE Calculator</strong> ระบุระดับการออกกำลังกายของคุณ (ตั้งแต่นั่งโต๊ะทั้งวัน ไปจนถึงออกกำลังกายหนักมาก) ระบบจะบอกตัวเลขแคลอรี่ที่คุณเผาผลาญในแต่ละวัน</li>
          <li><strong>กำหนดเป้าหมายโภชนาการ:</strong> หากต้องการลดน้ำหนัก ให้นำค่า TDEE ไปหักออก 300-500 แคลอรี่ แล้วใช้เครื่องมือ <strong>Macro Split</strong> เพื่อแบ่งว่าแคลอรี่เหล่านั้นควรมาจากคาร์โบไฮเดรต โปรตีน และไขมัน อย่างละกี่กรัม</li>
        </ol>
      </div>

      <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-3">หมวดการออกกำลังกายและฟิตเนส (1RM, โซนหัวใจ, แคลอรี่ออกกำลังกาย, Pace วิ่ง)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ตั้งค่าการฝึกซ้อม:</strong> หากคุณเป็นสายเวทเทรนนิ่ง ให้ใช้เครื่องมือ <strong>1RM (One Rep Max)</strong> กรอกน้ำหนักที่ยกได้และจำนวนครั้ง ระบบจะคำนวณน้ำหนักสูงสุดที่คุณยกได้ 1 ครั้ง เพื่อนำไปจัดตารางฝึกซ้อมได้อย่างปลอดภัย</li>
          <li><strong>วัดอัตราการเต้นของหัวใจ:</strong> สำหรับสายคาร์ดิโอ ให้คำนวณ <strong>Heart Rate Zone</strong> เพื่อหาช่วงจังหวะการเต้นของหัวใจที่เหมาะสมที่สุดในการ "เผาผลาญไขมัน" (Fat Burn Zone)</li>
          <li><strong>คำนวณผลลัพธ์:</strong> เมื่อออกกำลังกายเสร็จ คุณสามารถใช้เครื่องมือ <strong>แคลอรี่ออกกำลังกาย</strong> หรือ <strong>แปลงก้าวเดิน (Steps Converter)</strong> เพื่อดูว่าคุณใช้พลังงานไปทั้งหมดกี่กิโลแคลอรี่</li>
        </ol>
      </div>

      <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-3">หมวดสุขภาพทั่วไป (การนอนหลับ, ค่าน้ำตาลในเลือด, เอวต่อสะโพก WHR)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>วางแผนการนอนหลับ:</strong> ใช้เครื่องมือ <strong>Sleep Cycle</strong> โดยระบุเวลาที่คุณต้องการตื่น ระบบจะคำนวณเวลานอนที่สอดคล้องกับรอบวงจรการนอนหลับ (รอบละ 90 นาที) เพื่อให้คุณตื่นมาสดชื่น ไม่รู้สึกงัวเงีย</li>
          <li><strong>เช็คความเสี่ยงโรคภัย:</strong> ใช้เครื่องมือ <strong>เอวต่อสะโพก (WHR)</strong> เพื่อประเมินความเสี่ยงโรคหัวใจและเบาหวาน ซึ่งมีความแม่นยำและเจาะจงมากกว่าการดูแค่ค่า BMI เพียงอย่างเดียว</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณด้านสุขภาพและอาหารด้วยตัวเอง (แจกสูตรแบบละเอียด)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">เพื่อความเข้าใจที่ลึกซึ้งยิ่งขึ้น นี่คือสูตรคำนวณทางการแพทย์และวิทยาศาสตร์การกีฬามาตรฐานสากล ที่คุณสามารถกดเครื่องคิดเลขคำนวณด้วยตัวเองได้:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">⚖️ สูตรคำนวณค่า BMI (ดัชนีมวลกาย)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">BMI (Body Mass Index) เป็นค่าสากลที่องค์การอนามัยโลก (WHO) ใช้เพื่อประเมินภาวะอ้วนหรือผอมของบุคคลทั่วไป:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-pink-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">BMI = น้ำหนักตัว (กิโลกรัม) ÷ [ส่วนสูง (เมตร)]²</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> สมมติคุณมีน้ำหนัก 70 กิโลกรัม และมีส่วนสูง 170 เซนติเมตร (ต้องแปลงเป็นเมตรคือ 1.70 เมตร)<br/><br/>
        BMI = 70 ÷ (1.70 × 1.70)<br/>
        BMI = 70 ÷ 2.89<br/>
        BMI = <strong>24.22</strong><br/><br/>
        *เกณฑ์ของคนเอเชีย: 18.5 - 22.9 คือปกติ, 23.0 - 24.9 คือท้วม, 25.0 ขึ้นไปถือว่าอ้วน
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🔥 สูตรคำนวณ BMR และ TDEE (พลังงานที่เผาผลาญต่อวัน)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้การลดน้ำหนักเป็นไปอย่างแม่นยำ คุณต้องรู้ค่า BMR (พลังงานพื้นฐานที่ใช้ขณะพัก) และ TDEE (พลังงานรวมเมื่อรวมการขยับร่างกาย) โดยสูตรที่นิยมและแม่นยำที่สุดคือสูตร Mifflin-St Jeor:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-rose-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>สูตร BMR สำหรับผู้ชาย:</strong> BMR = (10 × น้ำหนัก kg) + (6.25 × ส่วนสูง cm) - (5 × อายุ) + 5</li>
          <li><strong>สูตร BMR สำหรับผู้หญิง:</strong> BMR = (10 × น้ำหนัก kg) + (6.25 × ส่วนสูง cm) - (5 × อายุ) - 161</li>
          <li><strong>การหาค่า TDEE:</strong> ให้นำค่า BMR ไปคูณกับตัวคูณกิจกรรม (Activity Multiplier)
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>นั่งทำงาน ไม่ค่อยออกกำลังกาย: BMR × 1.2</li>
              <li>ออกกำลังกายเบาๆ (1-3 วัน/สัปดาห์): BMR × 1.375</li>
              <li>ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์): BMR × 1.55</li>
              <li>ออกกำลังกายหนัก (6-7 วัน/สัปดาห์): BMR × 1.725</li>
            </ul>
          </li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> ผู้หญิง น้ำหนัก 60 kg, ส่วนสูง 160 cm, อายุ 30 ปี, ออกกำลังกาย 3-5 วันต่อสัปดาห์<br/><br/>
        BMR = (10 × 60) + (6.25 × 160) - (5 × 30) - 161<br/>
        BMR = 600 + 1000 - 150 - 161 = 1,289 kcal (พลังงานที่ใช้เพื่อมีชีวิตรอด)<br/>
        TDEE = 1,289 × 1.55 = <strong>1,997.95 kcal</strong> (พลังงานทั้งหมดที่เผาผลาญในแต่ละวัน)<br/>
        *หากต้องการลดน้ำหนัก ควรทานให้น้อยกว่า TDEE ประมาณ 300-500 แคลอรี่ (ประมาณ 1,500 kcal/วัน)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🥩 สูตรคำนวณสัดส่วนโภชนาการ Macro Split (โปรตีน/คาร์บ/ไขมัน)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การนับแค่แคลอรี่รวมไม่เพียงพอ คุณต้องรู้สัดส่วนของสารอาหาร (Macronutrients) เพื่อรักษามวลกล้ามเนื้อและลดไขมัน:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-2xl border border-red-100 dark:border-red-800">
          <h4 className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">โปรตีน (Protein)</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>พลังงาน:</strong> 1 กรัม = 4 แคลอรี่<br/>
            <strong>สูตร:</strong> น้ำหนักตัว (kg) × 1.6 ถึง 2.2 กรัม<br/>
            (สำคัญมากสำหรับการซ่อมแซมกล้ามเนื้อ ช่วยให้อิ่มนานและเผาผลาญได้ดีขึ้น)
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-5 rounded-2xl border border-yellow-100 dark:border-yellow-800">
          <h4 className="font-bold text-yellow-600 dark:text-yellow-400 text-lg mb-2">ไขมันดี (Fat)</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>พลังงาน:</strong> 1 กรัม = 9 แคลอรี่<br/>
            <strong>สูตร:</strong> น้ำหนักตัว (kg) × 0.8 ถึง 1.0 กรัม<br/>
            (ห้ามงดไขมันเด็ดขาด เพราะจำเป็นต่อการสร้างฮอร์โมนเพศและการดูดซึมวิตามิน)
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-800">
          <h4 className="font-bold text-green-600 dark:text-green-400 text-lg mb-2">คาร์โบไฮเดรต (Carbs)</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>พลังงาน:</strong> 1 กรัม = 4 แคลอรี่<br/>
            <strong>สูตร:</strong> โควต้าแคลอรี่ที่เหลือทั้งหมด ÷ 4<br/>
            (เป็นแหล่งพลังงานหลักในการออกกำลังกาย ควรเลือกคาร์บเชิงซ้อนเช่น ข้าวกล้อง มันเทศ)
          </p>
        </div>
      </div>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม ด้านสุขภาพและอาหาร</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>คุณไม่สามารถลดไขมันเฉพาะส่วนได้ (Spot Reduction is a Myth):</strong> การซิทอัพวันละ 100 ครั้ง ไม่ได้ช่วยลดหน้าท้อง หากค่า TDEE ของคุณยังล้นอยู่ ร่างกายจะดึงไขมันมาใช้จากทั่วร่างกายตามพันธุกรรม ทางแก้เดียวคือการสร้าง "Caloric Deficit" หรือกินให้น้อยกว่าที่เผาผลาญ
        </li>
        <li>
          <strong>การดื่มน้ำ สำคัญพอๆ กับการกิน:</strong> การขาดน้ำเพียงเล็กน้อยทำให้ระบบเผาผลาญทำงานช้าลงถึง 3% ควรใช้เครื่องมือ <strong>ปริมาณน้ำดื่ม</strong> เพื่อหาสัดส่วนที่ร่างกายต้องการจริงๆ (โดยเฉลี่ยประมาณ 2.5 - 3 ลิตรต่อวัน ขึ้นอยู่กับน้ำหนักและการสูญเสียเหงื่อ)
        </li>
        <li>
          <strong>BMI ไม่ได้บอกทุกอย่าง:</strong> นักเพาะกายที่มีกล้ามเนื้อแน่น อาจมีค่า BMI ตกอยู่ในเกณฑ์ "อ้วน" ได้ เพราะกล้ามเนื้อหนักกว่าไขมันในปริมาตรที่เท่ากัน ดังนั้นควรใช้เครื่องมือคำนวณ <strong>เปอร์เซ็นต์ไขมัน (Body Fat %)</strong> ควบคู่ไปด้วยเสมอ
        </li>
        <li>
          <strong>คุณภาพการนอนคือจุดชี้ชะตา:</strong> การนอนหลับลึกในช่วง Non-REM Sleep ร่างกายจะหลั่ง Growth Hormone ออกมาซ่อมแซมร่างกาย หากคุณนอนไม่พอหรือตื่นผิดรอบ <strong>Sleep Cycle</strong> ความเครียดจะทำให้ฮอร์โมนคอร์ติซอลหลั่ง ส่งผลให้ร่างกายกักเก็บไขมันไว้มากกว่าปกติ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับอาหารและสุขภาพ)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: ทำ IF (Intermittent Fasting) แล้วสามารถกินเกินค่า TDEE ได้ไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ไม่ได้ครับ! กฎพื้นฐานของการลดน้ำหนักคือ Caloric Deficit การทำ IF เป็นเพียงการ "จำกัดเวลาในการกิน" เพื่อคุมอินซูลิน ไม่ใช่ข้ออ้างในการสวาปาม หากคุณอดอาหาร 16 ชั่วโมง แต่ในช่วง 8 ชั่วโมงกินแคลอรี่เกินกว่าที่ร่างกายใช้ คุณก็ยังอ้วนขึ้นอยู่ดีครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ควรชั่งน้ำหนักบ่อยแค่ไหน และทำไมน้ำหนักถึงสวิงขึ้นลงทุกวัน?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: น้ำหนักของเราสามารถแกว่งได้ 1-2 กิโลกรัมในวันเดียว! ซึ่งเป็นผลมาจาก อาหารที่ตกค้างในลำไส้, โซเดียมที่ทำให้ตัวบวมน้ำ, หรือน้ำในกล้ามเนื้อ (ไกลโคเจน) แนะนำให้ชั่งน้ำหนักสัปดาห์ละ 1-2 ครั้ง ในตอนเช้าหลังตื่นนอนและเข้าห้องน้ำเรียบร้อยแล้ว เพื่อให้ได้ค่าที่นิ่งที่สุดครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: โปรตีนจำเป็นเฉพาะคนที่เล่นกล้ามและยกเวทเท่านั้น จริงหรือไม่?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ไม่จริงครับ โปรตีนเป็นสารอาหารจำเป็นที่มนุษย์ทุกคนต้องได้รับ แม้แต่คนที่ไม่ได้ออกกำลังกายก็ควรทานโปรตีนให้ได้วันละ 1 กรัมต่อน้ำหนักตัว 1 กิโลกรัม เพื่อรักษามวลกล้ามเนื้อที่มีอยู่ ซ่อมแซมเซลล์ที่สึกหรอ และโปรตีนยังช่วยให้อิ่มนาน ลดอาการหิวจุกจิกได้ดีเยี่ยม
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ถ้าค่าดัชนีมวลกาย (BMI) อยู่ในเกณฑ์ปกติ แปลว่าเรามีสุขภาพดีและไม่มีไขมันใช่ไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ไม่เสมอไปครับ! มีภาวะที่เรียกว่า Skinny Fat หรือ "อ้วนซ่อนรูป" คือคนที่มีน้ำหนักและ BMI อยู่ในเกณฑ์ปกติ แต่เมื่อวัดเปอร์เซ็นต์ไขมัน (Body Fat) กลับพบว่ามีไขมันสะสมในช่องท้องและรอบอวัยวะจำนวนมาก ซึ่งเกิดจากการขาดการออกกำลังกายและกินอาหารขยะนั่นเองครับ
          </p>
        </div>
      </div>
    </article>
  );
};
