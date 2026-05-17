import React from 'react';

export const AgricultureSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-green-600 dark:text-green-400 mb-6">1. บทนำ: สู่ยุคเกษตรอัจฉริยะ (Smart Farming) ทำไมต้องพึ่งพาการคำนวณ?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        "ทำเกษตรแบบเดิม ทำเท่าไหร่ก็ไม่รวย" คำกล่าวนี้สะท้อน Pain Point หลักของเกษตรกรไทยได้เป็นอย่างดี ปัญหาใหญ่ที่สุดของการทำเกษตรกรรมยุคดั้งเดิมคือการ "กะปริมาณด้วยสายตา" ไม่ว่าจะเป็นการใส่ปุ๋ย การให้น้ำ หรือการหมักปุ๋ยชีวภาพ 
        การขาดตัวเลขทางวิทยาศาสตร์มารองรับทำให้เกิดต้นทุนแฝงมหาศาล เช่น การใส่ <strong>ปุ๋ยต่อไร่ (Fertilizer)</strong> มากเกินความจำเป็นจนทำให้ดินเสียและสิ้นเปลืองเงิน หรือการให้น้ำ <strong>ชลประทาน (Irrigation)</strong> น้อยเกินไปจนผลผลิตแคระแกร็น 
        นอกจากนี้ การไม่รู้จักวิธีคำนวณ <strong>ผลผลิตต่อไร่ (Crop Yield)</strong> ล่วงหน้า ยังทำให้เกษตรกรไม่สามารถต่อรองราคากับพ่อค้าคนกลางได้
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เพื่อยกระดับผลผลิตและลดต้นทุน เว็บไซต์ของเราจึงได้รวบรวมเครื่องมือคำนวณหมวด "การเกษตรและอุตสาหกรรมอาหาร" ที่แม่นยำที่สุดมาให้คุณใช้งานฟรี ไม่ว่าคุณจะเป็น Smart Farmer, นักวิชาการเกษตร, หรือผู้ประกอบการแปรรูปอาหาร 
        เครื่องมืออย่างการคำนวณ <strong>เวลาหมักดอง (Fermentation Time)</strong> หรือการแปลงหน่วย <strong>พลังงานอาหาร (Food Energy)</strong> จะช่วยเปลี่ยนการทำเกษตรแบบพึ่งดวง ให้กลายเป็นการทำธุรกิจที่ควบคุมต้นทุนและคาดการณ์กำไรได้ 100%
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "การเกษตรและอาหาร" แบบง่ายๆ</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การใช้งานเครื่องมือในหมวดหมู่นี้ถูกออกแบบมาให้ตอบโจทย์วงจรการเพาะปลูกและการแปรรูป โดยแบ่งออกเป็น 3 ขั้นตอน ดังนี้:</p>
      
      <div className="bg-lime-50 dark:bg-lime-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-lime-700 dark:text-lime-400 mb-3">ช่วงที่ 1: การดูแลดิน น้ำ และธาตุอาหารพืช (ปุ๋ยต่อไร่, น้ำชลประทาน)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>คำนวณธาตุอาหาร NPK:</strong> ใช้เครื่องมือ <strong>ปุ๋ยต่อไร่</strong> โดยกรอกชนิดพืชที่คุณปลูก (เช่น ข้าว ข้าวโพด ยางพารา) ระบบจะบอกทันทีว่าต้องใช้สูตรปุ๋ยอะไร และใช้ปริมาณกี่กิโลกรัมต่อไร่ เพื่อให้พืชได้รับสารอาหารครบถ้วนโดยที่ดินไม่เค็ม</li>
          <li><strong>วางระบบน้ำ:</strong> ใช้เครื่องมือ <strong>น้ำชลประทาน</strong> กรอกขนาดพื้นที่เป็นไร่หรืองาน และชนิดของพืช เพื่อคำนวณลูกบาศก์เมตร (คิว) ของน้ำที่พืชต้องการต่อวัน ช่วยให้คุณเลือกซื้อปั๊มน้ำหรือสปริงเกลอร์ได้ตรงสเปก</li>
        </ol>
      </div>

      <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">ช่วงที่ 2: การเก็บเกี่ยวและการขาย (ผลผลิตต่อไร่)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ประเมินรายได้ล่วงหน้า:</strong> ก่อนถึงฤดูเก็บเกี่ยว ให้สุ่มเก็บตัวอย่างพื้นที่เล็กๆ แล้วใช้เครื่องมือ <strong>ผลผลิตต่อไร่ (Crop Yield)</strong> เพื่อจำลองตัวเลขว่าในพื้นที่ 1 ไร่ คุณจะได้ผลผลิตรวมกี่ตัน</li>
          <li><strong>คำนวณจุดคุ้มทุน:</strong> เมื่อได้ตัวเลขผลผลิตรวม ให้นำไปคูณกับราคาตลาด เพื่อประเมินว่ารายได้ทั้งหมดจะคุ้มค่ากับต้นทุนปุ๋ยและยาที่ลงทุนไปหรือไม่</li>
        </ol>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-3">ช่วงที่ 3: การแปรรูปอาหารและเครื่องดื่ม (เวลาหมักดอง, พลังงานอาหาร)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ควบคุมคุณภาพสินค้า:</strong> หากคุณทำแหนม, โยเกิร์ต, หรือไวน์ ให้ใช้เครื่องมือ <strong>เวลาหมักดอง (Fermentation Time)</strong> โดยใส่อุณหภูมิห้องปัจจุบัน ระบบจะคำนวณเวลาที่เหมาะสมในการหมัก เพื่อให้ได้รสชาติและเชื้อจุลินทรีย์ที่สมบูรณ์ที่สุด</li>
          <li><strong>ทำฉลากโภชนาการ:</strong> ใช้เครื่องมือ <strong>พลังงานอาหาร (Food Energy)</strong> เพื่อแปลงหน่วยระหว่างจูล (Joule) และกิโลแคลอรี่ (kcal) ซึ่งเป็นมาตรฐานที่ อย. กำหนดในการทำฉลากโภชนาการหลังบรรจุภัณฑ์</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณการเกษตรระดับมืออาชีพด้วยตัวเอง (แจกสูตร)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">หากคุณอยู่ในแปลงเกษตรและต้องการคำนวณอย่างรวดเร็ว นี่คือสูตรคณิตศาสตร์ทางเกษตรกรรมที่คุณสามารถใช้เครื่องคิดเลขทั่วไปกดตามได้เลย:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🌱 สูตรคำนวณความต้องการปุ๋ยต่อไร่</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เวลาไปร้านขายปุ๋ย คุณจะเห็นตัวเลข 3 ตัว เช่น 15-15-15 (N-P-K) การคำนวณเนื้อปุ๋ยบริสุทธิ์เพื่อไม่ให้ใส่มากเกินไป มีวิธีคิดดังนี้:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-lime-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">เนื้อธาตุอาหาร (กก.) = (น้ำหนักปุ๋ย × เปอร์เซ็นต์สูตร) ÷ 100</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> คุณซื้อปุ๋ยยูเรีย สูตร 46-0-0 มา 1 กระสอบ (น้ำหนัก 50 กิโลกรัม) อยากรู้ว่ามีไนโตรเจน (N) จริงๆ เท่าไหร่<br/><br/>
        เนื้อไนโตรเจน = (50 × 46) ÷ 100<br/>
        เนื้อไนโตรเจน = 2300 ÷ 100 = <strong>23 กิโลกรัม</strong><br/><br/>
        *อีก 27 กิโลกรัมที่เหลือคือสารเติมเต็ม (Filler) เพื่อให้ปุ๋ยปั้นเป็นเม็ดได้ การรู้เนื้อปุ๋ยบริสุทธิ์จะช่วยให้คุณจับคู่กับความต้องการของพืช (เช่น ข้าวต้องการ N 15 กก./ไร่) ได้อย่างแม่นยำ*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🌾 สูตรคำนวณประเมินผลผลิตต่อไร่ (Crop Yield Estimation)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">การประเมินผลผลิตล่วงหน้าช่วยให้คุณกะจำนวนรถบรรทุกหรือพื้นที่โกดังเก็บได้ สูตรมาตรฐานที่ใช้ประเมินนาข้าวหรือไร่ข้าวโพดคือ:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-green-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>สูตรผลผลิตรวม =</strong> พื้นที่ทั้งหมด (ตารางเมตร) × (น้ำหนักผลผลิตที่สุ่มตวงได้ ÷ ขนาดพื้นที่ที่สุ่มตวง)</li>
          <li><em>ข้อควรรู้: 1 ไร่ = 1,600 ตารางเมตร</em></li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> คุณมีนาข้าว 10 ไร่ (16,000 ตารางเมตร) คุณลองเกี่ยวข้าวในพื้นที่สุ่มขนาด 1x1 เมตร (1 ตารางเมตร) นำมาชั่งได้น้ำหนัก 0.6 กิโลกรัม<br/><br/>
        ผลผลิตรวม = 16,000 × (0.6 ÷ 1)<br/>
        ผลผลิตรวม = <strong>9,600 กิโลกรัม (หรือ 9.6 ตัน)</strong><br/><br/>
        *(หากราคาข้าวตันละ 10,000 บาท คุณสามารถคาดการณ์รายได้ล่วงหน้าได้ทันทีว่ารอบนี้จะได้เงินประมาณ 96,000 บาท)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">💧 สูตรคำนวณปริมาตรน้ำชลประทานและสระกักเก็บน้ำ</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">ในยุคโลกร้อน การขุดสระเก็บน้ำคือหัวใจของการทำเกษตรรอดตาย การคำนวณคิวบิกเมตร (ลูกบาศก์เมตร) คือสิ่งที่เกษตรกรต้องรู้:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-cyan-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">ปริมาตรน้ำ (คิว) = กว้าง × ยาว × ลึก</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> คุณขุดสระน้ำขนาด กว้าง 20 เมตร, ยาว 20 เมตร, และลึก 3 เมตร<br/><br/>
        ปริมาตรน้ำ = 20 × 20 × 3 = <strong>1,200 ลูกบาศก์เมตร (หรือ 1,200 คิว)</strong><br/><br/>
        *(หมายเหตุ: น้ำ 1 คิว = 1,000 ลิตร ดังนั้นสระนี้จุน้ำได้ 1.2 ล้านลิตร คุณสามารถนำไปหารกับอัตราการกินน้ำของพืชต่อวัน เพื่อดูว่าสระนี้จะเลี้ยงสวนคุณให้รอดหน้าแล้งได้กี่เดือน)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับชาวเกษตรกร</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>กฎของการใส่ปุ๋ย: "น้อยไปพืชไม่โต มากไปพืชตายดินเสีย"</strong> ไม่ควรใส่ <strong>ปุ๋ยต่อไร่</strong> เกินกว่าปริมาณที่ระบบคำนวณให้ เพราะพืชมีขีดจำกัดในการดูดซึม ปุ๋ยที่เหลือจะตกค้างทำให้ดินเป็นกรด (ดินเสีย) และถูกชะล้างลงแม่น้ำทำให้เสียเงินฟรี
        </li>
        <li>
          <strong>เวลาหมักดอง แปรผันตามอุณหภูมิ:</strong> ในการแปรรูปสินค้าเกษตร เช่น ปลาร้า แหนม หรือปุ๋ยหมัก อุณหภูมิคือตัวแปรหลัก หากอากาศร้อนจุลินทรีย์จะทำงานเร็ว <strong>เวลาหมักดอง</strong> จะสั้นลง หากอากาศเย็นเวลาจะนานขึ้น ควรใช้เครื่องมือเพื่อตั้งเวลาให้แม่นยำ ป้องกันสินค้าเน่าเสีย
        </li>
        <li>
          <strong>การคำนวณน้ำ ต้องเผื่อการระเหยด้วย:</strong> แม้คุณจะคำนวณ <strong>น้ำชลประทาน</strong> และขุดสระเก็บน้ำไว้แล้ว แต่ในประเทศไทยมีอัตราการระเหยของน้ำเฉลี่ยถึงวันละ 4-5 มิลลิเมตร ดังนั้นควรขุดสระให้ลึกกว่าที่คำนวณไว้ประมาณ 20-30% หรือปลูกแฝก/ไม้ยืนต้นรอบสระเพื่อบังลมและลดการระเหย
        </li>
        <li>
          <strong>รู้เขารู้เรา รบร้อยครั้งชนะร้อยครั้ง:</strong> การจดบันทึกตัวเลข <strong>ผลผลิตต่อไร่</strong> และต้นทุนในแต่ละฤดูกาล จะเป็น Data ชั้นดีที่ทำให้คุณสามารถยื่นขอกู้เงินกับ ธ.ก.ส. หรือนักลงทุน เพื่อขยายสเกลฟาร์มของคุณได้ง่ายขึ้น
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับการเกษตรและการแปรรูป)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: ปุ๋ยสูตรเสมอ 15-15-15 เหมาะกับพืชทุกชนิดจริงไหม?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ไม่จริงครับ ปุ๋ยสูตรเสมอเหมาะสำหรับการบำรุงต้นทั่วไป แต่พืชในแต่ละระยะต้องการอาหารต่างกัน เช่น ระยะบำรุงใบต้องการไนโตรเจนสูง (N) ระยะออกดอกต้องการฟอสฟอรัสสูง (P) และระยะเพิ่มความหวาน/ขนาดผลต้องการโพแทสเซียมสูง (K) ควรเลือกสูตรปุ๋ยให้ตรงกับระยะการเจริญเติบโตครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: การให้น้ำพืช (Irrigation) แบบไหนประหยัดและมีประสิทธิภาพที่สุด?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ระบบน้ำหยด (Drip Irrigation) ครับ เพราะน้ำจะหยดลงที่รากพืชโดยตรง ทำให้อัตราการสูญเสียจากการระเหยน้อยที่สุด ประหยัดน้ำกว่าระบบสปริงเกลอร์หรือการปล่อยน้ำท่วมแปลงได้ถึง 50-70% เหมาะมากกับพื้นที่หน้าแล้งครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: พลังงานอาหาร (Food Energy) หน่วย Joule และ kcal ต่างกันอย่างไร?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ทั้งคู่คือหน่วยวัดพลังงานครับ กิโลแคลอรี่ (kcal) เป็นหน่วยที่คุ้นเคยในชีวิตประจำวันเวลาเราดูฉลากโภชนาการ ส่วนกิโลจูล (kJ) เป็นหน่วยสากลทางวิทยาศาสตร์ (SI unit) โดย 1 kcal จะมีค่าเท่ากับ 4.184 kJ ซึ่งหลายประเทศในยุโรปและออสเตรเลียบังคับให้ใช้หน่วย kJ บนฉลากอาหารครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ถ้าอยากปลูกพืชเพื่อให้ได้ ผลผลิตต่อไร่ (Yield) สูงสุด ต้องทำอย่างไร?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ต้องเริ่มตั้งแต่การ "ตรวจค่าดิน" ก่อนปลูกครับ เพื่อให้รู้ว่าดินขาดธาตุอาหารอะไรและปรับค่า pH ให้เหมาะสม (5.5-6.5) จากนั้นจึงเลือกเมล็ดพันธุ์สายพันธุ์ดี ให้น้ำสม่ำเสมอ และฉีดพ่นฮอร์โมน/ยาป้องกันแมลงตามระยะเวลาอย่างเคร่งครัด การทำเกษตรประณีตจะได้ผลผลิตสูงกว่าการทำเกษตรแบบปล่อยปละละเลยเสมอครับ
          </p>
        </div>
      </div>
    </article>
  );
};
