import React from 'react';

export const UtilitySEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-6">1. บทนำ: จัดการเรื่องบ้านและบิลรายเดือนให้เป๊ะ ด้วยเครื่องมือคำนวณสาธารณูปโภค</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        "รายได้เท่าไหร่ไม่สำคัญ สำคัญที่เหลือเก็บเท่าไหร่" คำพูดนี้เป็นความจริงที่สุดเมื่อพูดถึงค่าใช้จ่ายในบ้าน ปัญหาใหญ่ (Pain Point) ที่ทำให้มนุษย์เงินเดือนชักหน้าไม่ถึงหลัง คือ "ค่าใช้จ่ายแฝงรายเดือน" ที่เรามองไม่เห็น 
        ไม่ว่าจะเป็น <strong>ค่าไฟ (Electricity Bill)</strong> ที่พุ่งปรี๊ดในช่วงหน้าร้อนโดยที่เราไม่รู้เลยว่าเครื่องใช้ไฟฟ้าชิ้นไหนกินไฟที่สุด หรือการจ่าย <strong>ค่าน้ำ (Water Bill)</strong> ที่แพงผิดปกติจากการลืมปิดก๊อกน้ำ 
        รวมถึงอาการหนักใจตอนไปสังสรรค์แล้วต้องมานั่ง <strong>หารค่าอาหาร (Split Bill)</strong> และคำนวณ <strong>ทิป (Tip Calculator)</strong> ให้ลงตัวโดยไม่ผิดใจกับเพื่อนฝูง
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เว็บไซต์ของเราได้ออกแบบชุดเครื่องมือ "บ้านและสาธารณูปโภค" กว่า 12 รายการ เพื่อเข้ามาอุดรอยรั่วทางการเงินในชีวิตประจำวันของคุณ ไม่ว่าจะเป็นการเช็คจุดคุ้มทุนของการติด <strong>แผงโซลาร์เซลล์ (Solar Panel)</strong> 
        ประเมิน <strong>ค่าก๊าซหุงต้ม (Gas Cost)</strong> เทียบกับเตาแม่เหล็กไฟฟ้า หรือแม้แต่การเปรียบเทียบค่าโดยสาร <strong>Grab Fare</strong> กับ <strong>ค่าทางด่วน (Toll Cost)</strong> และ <strong>ค่าที่จอดรถ (Parking Fee)</strong> ว่าแบบไหนคุ้มกว่ากันเมื่อต้องเข้าเมือง 
        ด้วยเครื่องมือเหล่านี้ คุณจะสามารถควบคุมทุกบิลรายเดือน และก้าวสู่การเป็นผู้เชี่ยวชาญด้านการจัดการงบประมาณในบ้านได้อย่างแท้จริง
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ค่าใช้จ่ายในบ้านและสาธารณูปโภค"</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้ชีวิตง่ายขึ้น เราแบ่งเครื่องมือสาธารณูปโภคออกเป็น 3 หมวดการใช้งานที่คุณต้องเจอในชีวิตประจำวัน:</p>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">ช่วงที่ 1: จัดการบิลภายในบ้าน (ค่าไฟ, ค่าน้ำ, โซลาร์เซลล์)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>หาต้นตอค่าไฟแพง:</strong> ใช้เครื่องมือ <strong>ค่าไฟ (Electricity)</strong> กรอกกำลังวัตต์ (Watt) ของแอร์ ตู้เย็น หรือเตารีด และชั่วโมงที่เปิดใช้งาน ระบบจะบอกเลยว่าเครื่องใช้ไฟฟ้านี้กินไฟเดือนละกี่บาท (คิดตามอัตราก้าวหน้าของการไฟฟ้า)</li>
          <li><strong>เช็คบิลค่าน้ำ:</strong> ใช้เครื่องมือ <strong>ค่าน้ำ (Water)</strong> เพื่อประเมินปริมาณการใช้น้ำของคนในบ้านเปรียบเทียบกับบิลของประปา หากตัวเลขที่คำนวณได้ต่างจากบิลมาก แสดงว่าท่อประปาในบ้านอาจรั่ว</li>
          <li><strong>คำนวณความคุ้มค่าโซลาร์เซลล์:</strong> ใช้เครื่องมือ <strong>โซลาร์เซลล์ (Solar Panel)</strong> ใส่ค่าไฟรายเดือนที่ต้องการลด ระบบจะคำนวณจำนวนแผง (kW) ที่ต้องติด และบอกจุดคืนทุน (Payback Period) ให้ทราบทันที</li>
        </ol>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">ช่วงที่ 2: ค่าเดินทางในชีวิตประจำวัน (Grab, ทางด่วน, ที่จอดรถ)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>เปรียบเทียบความคุ้มค่า:</strong> วันนี้จะเอารถไปเองหรือนั่ง Grab ดี? ใช้เครื่องมือคำนวณ <strong>Grab Fare</strong> เทียบกับ <strong>ค่าที่จอดรถ (Parking)</strong> + <strong>ค่าทางด่วน (Toll)</strong> ระบบจะช่วยคุณประหยัดเงินในกระเป๋าได้หลักร้อยบาทต่อวัน</li>
        </ol>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-3">ช่วงที่ 3: ไลฟ์สไตล์และเบ็ดเตล็ด (หารบิล, ค่าทิป, โอกาสถูกหวย)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>เคลียร์บิลร้านอาหารแบบแฟร์ๆ:</strong> ใช้เครื่องมือ <strong>หารบิล (Split Bill)</strong> และ <strong>ค่าทิป (Tip)</strong> โดยคุณสามารถเลือกได้ว่าใครสั่งเมนูพิเศษ หรือรวม Service charge/VAT ลงไปแล้วหารเฉพาะคนที่กิน เพื่อความยุติธรรม 100%</li>
          <li><strong>เช็คดวงความน่าจะเป็น:</strong> แวะใช้เครื่องมือ <strong>โอกาสถูกสลาก (Lottery Chances)</strong> เพื่อดูสถิติทางคณิตศาสตร์ว่าโอกาสที่คุณจะถูกรางวัลที่ 1 มีน้อยแค่ไหน (ช่วยลดความอยากซื้อหวยและเพิ่มเงินออมได้!)</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณค่าไฟและบิลบ้านด้วยตัวเอง (แจกสูตร)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">การรู้สูตรคำนวณพื้นฐาน จะช่วยให้คุณปรับพฤติกรรมการใช้พลังงานและเลือกซื้อเครื่องใช้ไฟฟ้าได้ฉลาดขึ้น:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">⚡ สูตรคำนวณหน่วยไฟฟ้า (Unit) และค่าไฟรายเดือน</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เครื่องใช้ไฟฟ้าทุกชนิดจะมีป้ายบอกกำลังไฟฟ้าเป็น วัตต์ (Watt) เราต้องแปลงค่านี้เป็น "หน่วย (Unit)" ก่อนนำไปคูณเรทค่าไฟของการไฟฟ้า (เฉลี่ยประมาณ 4-5 บาท/หน่วย):</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-indigo-500 text-gray-800 dark:text-gray-200">
        <ul className="list-none space-y-3">
          <li><strong>1. หาจำนวนหน่วย (Unit) =</strong> (กำลังไฟฟ้า Watt × จำนวนเครื่อง × ชั่วโมงที่เปิดต่อวัน) ÷ 1,000</li>
          <li><strong>2. หาค่าไฟรายเดือน (บาท) =</strong> จำนวนหน่วยที่ใช้ต่อวัน × 30 วัน × อัตราค่าไฟต่อหน่วย (ประมาณ 4.5 บาท)</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> เปิดแอร์ 12,000 BTU (กินไฟ 1,000 วัตต์) เปิดนอนทุกคืน วันละ 10 ชั่วโมง<br/><br/>
        หาจำนวนหน่วยต่อวัน = (1,000 × 1 เครื่อง × 10 ชม.) ÷ 1,000 = 10 หน่วย/วัน<br/>
        ค่าไฟแอร์เครื่องนี้ต่อเดือน = 10 หน่วย × 30 วัน × 4.5 บาท = <strong>1,350 บาท/เดือน</strong><br/>
        *(ถ้าคุณตั้งอุณหภูมิแอร์จาก 23 องศา เป็น 26 องศา คอมเพรสเซอร์จะทำงานน้อยลง ซึ่งสามารถลดค่าไฟตัวนี้ลงได้ถึง 10-20% เลยทีเดียว!)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🍽️ สูตรคำนวณบิลร้านอาหารที่มีทั้ง VAT 7% และ Service Charge 10%</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เวลาไปกินบุฟเฟต์ หรือร้านอาหารหรูที่เขียนว่า "ราคา Net" หรือ "ราคา ++" ถ้าคุณจะหารบิลกับเพื่อน คุณต้องคำนวณภาษีสะสมให้ถูกต้อง ป้องกันการเก็บเงินเพื่อนขาด:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-purple-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ราคาสุทธิแบบ ++ = (ราคาอาหาร × 1.10) × 1.07</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ไปกินอาหาร ราคาป้ายบอกว่า 1,000 บาท++ (ต้องบวก Service 10% และ VAT 7%)<br/><br/>
        ราคาหลังบวก Service Charge = 1,000 × 10% = 1,100 บาท<br/>
        ราคาหลังบวก VAT = 1,100 × 7% = 77 บาท<br/>
        ราคาสุทธิที่ต้องจ่าย = 1,100 + 77 = <strong>1,177 บาท</strong><br/>
        *(จำตัวเลข <strong>1.177</strong> ไว้ให้ดี เวลาร้านเขียนว่า ++ ให้นำ 1.177 ไปคูณราคาป้าย จะได้ราคาที่ต้องจ่ายจริงเสมอครับ)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับการจัดการบิล</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>ค่าไฟอัตราก้าวหน้า ยิ่งใช้เยอะยิ่งแพง:</strong> <strong>ค่าไฟ (Electricity)</strong> ของไทยคิดแบบก้าวหน้า แปลว่า 150 หน่วยแรก จะราคาถูก (ประมาณ 3.2 บาท/หน่วย) แต่ถ้าเกิน 400 หน่วย จะกระโดดไป 4.4 บาท/หน่วย การพยายามประหยัดไฟไม่ให้ข้ามสเตป จึงช่วยเซฟเงินได้มหาศาล
        </li>
        <li>
          <strong>โซลาร์เซลล์ ไม่ได้เหมาะกับทุกคน:</strong> การติด <strong>แผงโซลาร์ (Solar Panel)</strong> แบบ On-grid จะคุ้มค่าก็ต่อเมื่อคุณมีคนอยู่บ้านและใช้แอร์ในเวลากลางวันเยอะเท่านั้น หากคุณใช้ไฟแค่ตอนกลางคืน การคืนทุนอาจใช้เวลานานถึง 7-8 ปี ควรประเมินพฤติกรรมการใช้ไฟด้วยเครื่องมือของเราก่อนลงทุนหลักแสน
        </li>
        <li>
          <strong>ตรวจเช็คท่อน้ำรั่วด้วยตัวเอง:</strong> หาก <strong>ค่าน้ำ (Water Bill)</strong> เดือนนี้พุ่งทะยานผิดปกติ วิธีเช็คง่ายๆ คือ ปิดก๊อกน้ำทุกจุดในบ้าน แล้วไปดูมิเตอร์น้ำหน้าบ้านว่าใบพัดยังหมุนอยู่หรือไม่ ถ้าหมุนแปลว่าท่อรั่วใต้ดิน ต้องรีบเรียกช่างทันที
        </li>
        <li>
          <strong>คณิตศาสตร์เตือนสติเรื่องหวย:</strong> เครื่องมือ <strong>โอกาสถูกสลาก (Lottery)</strong> ชี้ให้เห็นว่า โอกาสถูกรางวัลที่ 1 คือ 1 ใน 1,000,000 (0.0001%) ถ้าคุณซื้อลอตเตอรี่งวดละ 2 ใบ (200 บาท) ตลอด 30 ปี คุณจะเสียเงินไป 144,000 บาท! สู้เอาไปลงทุนในหุ้นหรือกองทุนเพื่อรับดอกเบี้ยทบต้นดีกว่าครับ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับสาธารณูปโภคและบิล)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: ถอดปลั๊กทีวีและเครื่องใช้ไฟฟ้าทุกครั้งเมื่อไม่ใช้งาน ช่วยประหยัดค่าไฟได้จริงไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ช่วยได้จริงครับ! อุปกรณ์ที่มีไฟ LED สแตนด์บาย (เช่น ทีวี กล่องเน็ต ไมโครเวฟ) จะมีอาการสูบไฟทิ้ง (Vampire Power) ตลอด 24 ชม. แม้จะกินไฟน้อยมาก แต่เมื่อรวมกันหลายๆ เครื่อง ก็อาจทำให้เสียค่าไฟฟรีๆ ได้ 50-100 บาทต่อเดือนเลยครับ การใช้ปลั๊กพ่วงแบบมีสวิตช์เปิด-ปิดจะสะดวกที่สุดครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ระหว่างมิเตอร์ไฟแบบปกติ กับแบบ TOU แบบไหนคุ้มกว่ากัน?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: มิเตอร์ TOU (Time of Use) จะคิดค่าไฟกลางคืน (22.00 - 09.00 น. และวันหยุด) ในราคาถูกมาก เพียง 2.6 บาท/หน่วย แต่กลางวันจะแพงถึง 5.7 บาท/หน่วย หากคุณทำงานนอกบ้านทั้งวัน หรือชาร์จรถยนต์ไฟฟ้า (EV) ตอนดึก การเปลี่ยนมาใช้ TOU จะประหยัดค่าไฟลงได้เกือบครึ่งครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: เครื่องคิดเลข Date Difference (ระยะห่างของวัน) มีประโยชน์อย่างไรในบ้าน?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: เครื่องมือ <strong>Date Difference</strong> นิยมใช้คำนวณรอบครบกำหนดต่อภาษีรถยนต์, รอบล้างแอร์ (ทุกๆ 6 เดือน), รอบเปลี่ยนไส้กรองเครื่องกรองน้ำ ไปจนถึงการนับถอยหลังวันครบรอบแต่งงาน เพื่อไม่ให้พลาดบิลหรือวันสำคัญในครอบครัวครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ควรให้ทิป (Tip) ในร้านอาหารเท่าไหร่ถึงจะเหมาะสม และไม่ดูน่าเกลียด?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ธรรมเนียมการให้ <strong>ทิป</strong> ขึ้นอยู่กับประเทศและบริการครับ ในประเทศไทย หากร้านชาร์จ Service Charge 10% ไปแล้ว คุณไม่จำเป็นต้องให้เพิ่มก็ได้ แต่หากเป็นร้านธรรมดา การให้ทิปประมาณ 5-10% ของบิล (หรือการปัดเศษเงินทอน) ถือเป็นมารยาทที่เหมาะสมและสร้างกำลังใจให้พนักงานครับ
          </p>
        </div>
      </div>
    </article>
  );
};
