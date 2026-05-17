import React from 'react';

export const TravelSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-sky-600 dark:text-sky-500 mb-6">1. บทนำ: ทำไมการเดินทางและท่องเที่ยว ต้องวางแผนและคำนวณตัวเลขล่วงหน้า?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        การท่องเที่ยวควรจะเป็นเรื่องสนุกและผ่อนคลาย แต่ในความเป็นจริง ปัญหาหลัก (Pain Point) ที่ทำลายบรรยากาศการเดินทางมากที่สุดคือ "การจัดการงบประมาณและเวลาที่ผิดพลาด" 
        ไม่ว่าจะเป็นการขับรถทางไกลโดยไม่ได้คำนวณ <strong>ค่าน้ำมัน (Fuel Cost)</strong> และ <strong>ระยะทาง (Distance)</strong> ล่วงหน้า ทำให้งบเที่ยวบานปลายและเหนื่อยล้าจากการขับรถนานเกินไป 
        หรือการจัดทริปไปต่างประเทศโดยลืมเช็ค <strong>โซนเวลา (Time Zone)</strong> ทำให้ไปถึงแล้วมีอาการ Jet Lag อย่างรุนแรง หรือช็อปปิ้งเพลินจนลืมเช็คเรท <strong>แปลงสกุลเงิน (Currency)</strong> ในบัตรเครดิต ทำให้กลับมาเจอบิลช็อก (Bill Shock) รูดเกินงบไปหลายหมื่น
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เพื่อป้องกันทริปล่มและเงินเกลี้ยงกระเป๋า เว็บไซต์ของเราจึงสร้างเครื่องมือหมวด "การเดินทางและท่องเที่ยว" ที่เปรียบเสมือนผู้ช่วยจัดทริป (Trip Planner) ส่วนตัวของคุณ 
        คุณสามารถใช้เครื่องมือ <strong>งบประมาณท่องเที่ยว (Travel Budget)</strong> เพื่อจำลองค่าใช้จ่ายทั้งทริป ไปจนถึงการเป็นนักท่องเที่ยวสายรักษ์โลกด้วยการคำนวณ <strong>คาร์บอนฟุตพริ้นท์ (Flight CO2)</strong> ของเที่ยวบินที่คุณเลือก 
        เครื่องมือทั้งหมดนี้ถูกสร้างมาเพื่อเปลี่ยนทริปที่เต็มไปด้วยความกังวล ให้เป็นทริปที่คุณสามารถควบคุมได้ทุกสถานการณ์
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ท่องเที่ยวและการเดินทาง" แบบโปร</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้ครอบคลุมการเดินทางทั้งในประเทศและต่างประเทศ เราได้ออกแบบเครื่องมือออกเป็น 3 หมวดการใช้งาน ดังนี้:</p>
      
      <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-sky-700 dark:text-sky-400 mb-3">ช่วงที่ 1: การเดินทางภายในประเทศ (ค่าน้ำมัน, ระยะทาง)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>คำนวณค่าน้ำมันรถ:</strong> ใช้เครื่องมือ <strong>ค่าน้ำมัน (Fuel Cost)</strong> โดยใส่ระยะทางที่กะเกณฑ์ไว้, อัตรากินน้ำมันของรถคุณ (กิโลเมตร/ลิตร) และราคาน้ำมันปัจจุบัน ระบบจะบอกเลยว่าทริปนี้ต้องเตรียมเงินเติมน้ำมันไป-กลับกี่บาท</li>
          <li><strong>กะเวลาถึงที่หมาย:</strong> ใช้เครื่องมือ <strong>ระยะทาง/เวลา/ความเร็ว (Distance)</strong> หากคุณรู้ว่าจุดหมายไกล 400 กม. และขับรถเฉลี่ย 90 กม./ชม. ระบบจะคำนวณเวลาที่ใช้บนท้องถนน (ประมาณ 4 ชั่วโมงครึ่ง) ช่วยให้คุณจัดตารางแวะปั๊มได้อย่างแม่นยำ</li>
        </ol>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">ช่วงที่ 2: การเดินทางต่างประเทศ (สกุลเงิน, โซนเวลา)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>เช็คเรทแลกเงิน:</strong> ใช้เครื่องมือ <strong>แปลงสกุลเงิน (Currency)</strong> เพื่อเทียบอัตราแลกเปลี่ยนแบบ Real-time ก่อนไปร้านแลกเงิน (Superrich) หรือเช็คราคาสินค้าเวลาช็อปปิ้งว่าถูกกว่าซื้อที่ไทยจริงหรือไม่</li>
          <li><strong>นัดหมายไม่พลาด:</strong> ใช้เครื่องมือ <strong>โซนเวลา (Time Zone)</strong> เพื่อดูเวลาท้องถิ่นเปรียบเทียบกับเวลาไทย ช่วยให้คุณจองตั๋วรถไฟ ร้านอาหาร หรือโทรกลับหาครอบครัวได้ในเวลาที่เหมาะสม</li>
        </ol>
      </div>

      <div className="bg-cyan-50 dark:bg-cyan-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-3">ช่วงที่ 3: สรุปงบและรักษ์โลก (Travel Budget, Flight CO2)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>หารบิลกองกลาง:</strong> ใช้เครื่องมือ <strong>งบประมาณท่องเที่ยว (Travel Budget)</strong> เพื่อลิสต์รายการค่าโรงแรม ค่าเช่ารถ ค่ากิน แล้วให้ระบบหารเฉลี่ยต่อคนออกมาอย่างยุติธรรม</li>
          <li><strong>ชดเชยคาร์บอน:</strong> หากคุณบินบ่อย ให้ใช้เครื่องมือ <strong>Flight CO2 Emissions</strong> ระบบจะประเมินการปล่อยก๊าซเรือนกระจกจากไฟลท์ของคุณ เพื่อให้คุณสามารถไปซื้อคาร์บอนเครดิตชดเชย หรือเลือกบริจาคปลูกต้นไม้แทนได้</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณค่าน้ำมันและการเดินทางด้วยตัวเอง (แจกสูตร)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">ความรู้ติดตัวสำหรับสาย Road Trip เวลาอินเทอร์เน็ตใช้งานไม่ได้ คุณก็ยังสามารถจิ้มเครื่องคิดเลขมือถือคำนวณสูตรเหล่านี้ได้:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">⛽ สูตรคำนวณค่าน้ำมันตลอดทริป</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">วิธีคำนวณที่แม่นยำ คุณต้องรู้ "อัตราสิ้นเปลือง" ของรถคุณก่อน (ดูได้จากหน้าปัดรถยนต์ หน่วยเป็น km/L):</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-sky-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ค่าน้ำมันทริปนี้ (บาท) = (ระยะทางรวมทั้งหมด ÷ อัตราสิ้นเปลือง km/L) × ราคาน้ำมันต่อลิตร</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ขับรถจาก กทม. ไปเชียงใหม่ (ระยะทางไป-กลับ ประมาณ 1,400 กม.) รถเก๋งวิ่งเฉลี่ย 15 km/L ราคาน้ำมันลิตรละ 35 บาท<br/><br/>
        1. หาจำนวนลิตรที่ต้องใช้ = 1,400 ÷ 15 = 93.3 ลิตร<br/>
        2. คิดเป็นเงิน = 93.3 × 35 = <strong>3,265.5 บาท</strong><br/><br/>
        *(ถ้าไปกัน 4 คน เท่ากับเสียค่าเดินทางคนละ 816 บาท ซึ่งอาจจะถูกหรือแพงกว่าตั๋วเครื่องบิน/รถทัวร์ คุณสามารถนำตัวเลขนี้ไปเปรียบเทียบก่อนตัดสินใจได้)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🏎️ สูตรความสัมพันธ์ ระยะทาง-ความเร็ว-เวลา (S = v × t)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">นี่คือสูตรฟิสิกส์พื้นฐานที่นำมาใช้ประโยชน์ในชีวิตจริงได้ดีที่สุด เพื่อกะเวลาถึงที่หมาย:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-blue-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>หาเวลาที่ใช้เดินทาง (ชั่วโมง) =</strong> ระยะทาง (กิโลเมตร) ÷ ความเร็วเฉลี่ย (กิโลเมตร/ชั่วโมง)</li>
          <li><strong>หาความเร็วที่ต้องเหยียบ =</strong> ระยะทาง (กิโลเมตร) ÷ เวลาที่มี (ชั่วโมง)</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> คุณตื่นสาย! นัดเพื่อนไว้ที่พัทยา (ระยะทาง 150 กม.) ภายใน 1 ชั่วโมงครึ่ง (1.5 ชั่วโมง) คุณต้องขับรถเร็วแค่ไหน?<br/><br/>
        ความเร็วที่ต้องใช้ = 150 ÷ 1.5 = <strong>100 กิโลเมตรต่อชั่วโมง</strong><br/>
        *(ดังนั้นคุณต้องเหยียบเฉลี่ย 100 ตลอดทาง ห้ามแวะพัก หากรถติดก็อาจจะต้องเหยียบเกินกฎหมายกำหนด ซึ่งเตือนไว้ก่อนว่าความปลอดภัยต้องมาก่อนเสมอนะครับ!)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับการเดินทาง</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>ค่าบัตรเครดิตที่ซ่อนอยู่ (FX Rate):</strong> เวลาไปรูดบัตรที่ญี่ปุ่นหรือเกาหลี เรท <strong>แปลงสกุลเงิน (Currency)</strong> ที่แบงก์ชาร์จมักจะบวกความเสี่ยงความผันผวนของค่าเงินเพิ่มไปอีก 2-2.5% เสมอ แนะนำให้ใช้บัตรประเภท Travel Card หรือแอปแลกเงินล่วงหน้าเพื่อล็อกเรทไว้ดีที่สุด
        </li>
        <li>
          <strong>การขับรถที่ประหยัดน้ำมันที่สุด:</strong> เครื่องมือคำนวณ <strong>ค่าน้ำมัน</strong> อาจไม่ตรง 100% เพราะรถทุกคันมีช่วง "Sweet Spot" ของความเร็วที่ประหยัดที่สุด (มักจะอยู่ระหว่าง 80-100 กม./ชม.) หากคุณเหยียบเกิน 120 กม./ชม. อัตราสิ้นเปลืองจะร่วงลงฮวบฮาบจากแรงต้านอากาศครับ
        </li>
        <li>
          <strong>ตั้งรับ Jet Lag ด้วยการคำนวณเวลา:</strong> อาการ Jet Lag มักเกิดขึ้นเมื่อข้าม <strong>โซนเวลา (Time Zone)</strong> มากกว่า 3 โซนขึ้นไป กฎจำง่ายๆ คือ ร่างกายต้องการเวลาปรับตัว 1 วัน ต่อทุกๆ 1 ชั่วโมงที่เปลี่ยนไป ดังนั้นควรจองไฟลท์ที่ถึงปลายทางในช่วงเย็น แล้วเข้านอนเลย ร่างกายจะปรับตัวได้เร็วที่สุด
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับการท่องเที่ยว)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: เครื่องมือคำนวณ Travel Budget รวมค่าเผื่อฉุกเฉินหรือยัง?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เราแนะนำให้ผู้ใช้งานตั้งหมวดหมู่ "ฉุกเฉิน" (Emergency Fund) เพิ่มเข้าไปในงบประมาณเสมอครับ โดยปกติควรกันเงินไว้ประมาณ 10-15% ของงบรวมทั้งหมด เผื่อตกเครื่อง กระเป๋าหาย หรือเจ็บป่วยกะทันหันครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ทำไมคำนวณระยะทางและเวลาในแผนที่ ถึงคลาดเคลื่อนกับความเป็นจริง?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เพราะแอปแผนที่ (GPS) มักจะคำนวณเวลาแบบ "ไม่พัก" ตามขีดจำกัดความเร็วถนนครับ แต่ในโลกความจริง เราต้องแวะเข้าห้องน้ำ แวะกินข้าว แวะปั๊ม กฎที่นักเดินทางใช้คือให้บวกเวลาเพิ่ม 15 นาที ต่อการขับรถทุกๆ 2 ชั่วโมงครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: เที่ยวบินแบบต่อเครื่อง (Connecting Flight) ปล่อยก๊าซ CO2 เยอะกว่าบินตรงหรือไม่?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ใช่ครับ! การขึ้นและลงจอด (Take-off & Landing) เป็นช่วงที่เครื่องบินเผาผลาญเชื้อเพลิงมากที่สุด ดังนั้นเที่ยวบินแบบบินตรง (Direct Flight) นอกจากจะประหยัดเวลาคุณแล้ว ยังเป็นมิตรต่อโลกมากกว่าในเรื่องของ <strong>Flight CO2</strong> ด้วยครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ถ้าไปเที่ยวแล้วต้อง หารค่าอาหาร (Split Bill) ใช้เครื่องมือไหนดีที่สุด?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เราแนะนำให้ใช้เครื่องมือ <strong>Split Bill</strong> ในหมวดสาธารณูปโภคครับ เพราะสามารถตั้งค่าได้ว่าใครดื่มแอลกอฮอล์ ใครกินมังสวิรัติ และบวกรวม VAT หรือ Service Charge 10% ก่อนหาร ทำให้ยุติธรรมกับเพื่อนร่วมทริปทุกคนมากที่สุดครับ
          </p>
        </div>
      </div>
    </article>
  );
};
