import React from 'react';

export const BusinessSEO = ({ lang }: { lang: "TH" | "EN" }) => {
  if (lang !== "TH") return null;

  return (
    <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto mt-16 p-6 md:p-10 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
      
      {/* 1. บทนำ */}
      <h2 className="text-3xl font-black text-green-600 dark:text-green-400 mb-6">1. บทนำ: ทำไมทำธุรกิจหรือเป็นแม่ค้าออนไลน์ ต้องเป๊ะเรื่องตัวเลขและสถิติ?</h2>
      <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        ในโลกของการทำธุรกิจและการขายของออนไลน์ "ยอดขาย (Revenue)" ไม่ใช่ตัวชี้วัดความสำเร็จเสมอไป ปัญหาใหญ่ที่สุด (Pain Point) ที่แม่ค้าพ่อค้าออนไลน์และเจ้าของธุรกิจ SME มักจะตกม้าตายคืออาการ "ขายดีจนเจ๊ง" 
        อาการนี้เกิดจากการตั้งราคาโดยไม่บวก <strong>ค่าธรรมเนียมขายของ (Marketplace Fee)</strong> บน Shopee, Lazada, TikTok เข้าไปใน <strong>ต้นทุนขาย (COGS)</strong> ทำให้เมื่อโดนหักแพลตฟอร์มฟีแล้ว กำไรที่ควรจะได้กลับกลายเป็นขาดทุนยับเยิน 
        นอกจากนี้ การไม่รู้จักคำนวณ <strong>จุดคุ้มทุน (Break-even)</strong> หรือการมองข้าม <strong>ค่าใช้จ่ายแฝง</strong> เช่น <strong>ค่าเสื่อมราคา (Depreciation)</strong> อุปกรณ์ ก็เป็นรอยรั่วที่สูบเงินออกจากบริษัทโดยที่คุณไม่รู้ตัว
      </p>
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        เว็บไซต์ของเราออกแบบเครื่องมือสำหรับ "ธุรกิจและแม่ค้า" กว่า 16 รายการ เพื่ออุดรอยรั่วทางการเงินเหล่านั้น ไม่ว่าจะเป็นเครื่องมือพื้นฐานอย่างการ <strong>คำนวณ VAT</strong>, <strong>เงินเดือนพนักงาน (Payroll)</strong> 
        ไปจนถึงเครื่องมือระดับผู้บริหารอย่างการหา <strong>Customer LTV</strong> (มูลค่าลูกค้าตลอดชีพ) และ <strong>CAC (ต้นทุนได้ลูกค้าใหม่)</strong> เครื่องมือเหล่านี้จะช่วยให้คุณตั้ง <strong>Margin (กำไร)</strong> และ <strong>Markup (มาร์กอัป)</strong> ได้อย่างถูกต้อง 
        ทำให้คุณรู้ตัวเลขที่แท้จริง ตัดสินใจแคมเปญการตลาดได้อย่างเฉียบขาด และนำพากิจการไปสู่การเติบโตอย่างยั่งยืน
      </p>

      {/* 2. วิธีใช้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">2. วิธีใช้เครื่องมือคำนวณ "ธุรกิจ/แม่ค้าออนไลน์" แบบเข้าใจง่าย</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เพื่อให้ครอบคลุมทุกมิติของการทำธุรกิจ เราแบ่งเครื่องมือออกเป็น 3 หมวดหมู่ย่อย ให้คุณเลือกใช้ตามสเตปการทำงาน:</p>
      
      <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">หมวดตั้งราคาและประเมินต้นทุน (Markup, Margin, COGS, Break-even)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>หาต้นทุนที่แท้จริง:</strong> เริ่มจากการใช้เครื่องมือ <strong>ต้นทุนขาย (COGS)</strong> โดยใส่ต้นทุนวัตถุดิบ ค่าแพ็กเกจจิ้ง และค่าแรง เพื่อให้ได้ต้นทุนต่อชิ้นที่แม่นยำ</li>
          <li><strong>ตั้งราคาขาย:</strong> นำต้นทุนที่ได้ มาใส่ในเครื่องมือ <strong>ตั้งราคาจากต้นทุน (Markup Pricing)</strong> หรือ <strong>คำนวณราคาขาย (Margin)</strong> ระบบจะช่วยบอกว่าต้องขายกี่บาทถึงจะได้เปอร์เซ็นต์กำไรตามที่คุณตั้งเป้าไว้</li>
          <li><strong>ประเมินเป้าหมายยอดขาย:</strong> ใช้เครื่องมือ <strong>จุดคุ้มทุน (Break-even)</strong> โดยกรอกค่าใช้จ่ายคงที่ (เช่น ค่าเช่าที่ ค่าจ้างพนักงาน) ระบบจะบอกว่าเดือนนี้คุณต้องขายให้ได้ "กี่ชิ้น" จึงจะไม่ขาดทุน</li>
        </ol>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">หมวดแม่ค้าออนไลน์ (Marketplace Fee, Shipping Cost, Return Rate)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>คำนวณการถูกหักเงิน:</strong> สำคัญมาก! ใช้เครื่องมือ <strong>ค่าธรรมเนียมขายของ (Marketplace Fee)</strong> เพื่อจำลองว่าถ้าขายราคานี้บนแพลตฟอร์ม โดนหักค่าคอมมิชชั่น ค่าส่งฟรี และ VAT แล้ว จะเหลือเงินโอนเข้าบัญชีคุณจริงๆ กี่บาท</li>
          <li><strong>จัดการความเสี่ยงจากของตีกลับ:</strong> หากขายแบบเก็บเงินปลายทาง (COD) ให้ใช้เครื่องมือประเมิน <strong>ผลกระทบตีกลับ (Return Rate Impact)</strong> เพื่อนำค่าส่งที่เสียฟรีและค่ากล่องที่พังไปบวกเพิ่มเป็นต้นทุนแฝงล่วงหน้า</li>
          <li><strong>เปรียบเทียบค่าส่ง:</strong> ใช้เครื่องมือ <strong>เปรียบเทียบค่าส่ง (Shipping Cost)</strong> ระหว่างขนส่งเจ้าต่างๆ (เช่น Kerry, Flash, J&T) เพื่อหาเรทที่คุ้มค่าที่สุด</li>
        </ol>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/10 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-3">หมวดบริหารกิจการและองค์กร (VAT, Payroll, CAC, LTV)</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>ออกใบกำกับภาษี:</strong> ใช้เครื่องมือ <strong>คำนวณ VAT</strong> เพื่อถอด VAT ใน (Include VAT) หรือบวกเพิ่ม VAT นอก (Exclude VAT) 7% ออกมาเป็นตัวเลขเป๊ะๆ สำหรับลงบัญชี</li>
          <li><strong>ทำเงินเดือนพนักงาน:</strong> สิ้นเดือนไม่ต้องปวดหัว ใช้เครื่องมือ <strong>Payroll</strong> เพื่อคำนวณเงินเดือนสุทธิหลังหักประกันสังคม (5%) และภาษีหัก ณ ที่จ่าย</li>
          <li><strong>วัดประสิทธิภาพการตลาด:</strong> ถ้ายิงแอดโฆษณา ให้คำนวณ <strong>ต้นทุนได้ลูกค้าใหม่ (CAC)</strong> เทียบกับ <strong>มูลค่าลูกค้าตลอดชีพ (LTV)</strong> หาก LTV สูงกว่า CAC 3 เท่าขึ้นไป แปลว่าธุรกิจคุณกำลังไปได้สวย</li>
        </ol>
      </div>

      {/* 3. สูตรคำนวณ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">3. สูตรคำนวณบริหารธุรกิจด้วยตัวเอง (แจกสูตรแบบละเอียด)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">การรู้สูตรคำนวณเบื้องหลัง จะช่วยให้คุณประยุกต์ใช้กับ Excel หรือกดเครื่องคิดเลขแม่ค้าได้อย่างรวดเร็ว นี่คือ 3 สูตรพื้นฐานที่คุณต้องจำให้ขึ้นใจ:</p>

      <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white flex items-center gap-2">📊 สูตรการตั้งราคา Margin VS Markup (อย่าสับสน!)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">พ่อค้าแม่ค้ากว่า 80% ขาดทุนเพราะสับสนระหว่าง Margin (อัตรากำไรขั้นต้น) กับ Markup (การบวกราคาเพิ่มจากต้นทุน) สองอย่างนี้มีสูตรไม่เหมือนกันครับ:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-green-500 text-gray-800 dark:text-gray-200">
        <ul className="list-none space-y-3">
          <li><strong>Markup (ตั้งราคาแบบบวกเพิ่ม):</strong> เป็นการคิดกำไรจากฐาน "ต้นทุน"<br/> 
          <span className="font-mono text-sm bg-white/50 dark:bg-black/20 p-1 rounded">ราคาขาย = ต้นทุน + (ต้นทุน × %Markup)</span></li>
          <li><strong>Margin (อัตรากำไร):</strong> เป็นการคิดกำไรจากฐาน "ราคาขาย" (แพลตฟอร์มต่างๆ และห้างสรรพสินค้าจะเก็บค่าธรรมเนียมแบบ Margin)<br/> 
          <span className="font-mono text-sm bg-white/50 dark:bg-black/20 p-1 rounded">ราคาขาย = ต้นทุน ÷ (1 - %Margin)</span></li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง (ต้องการกำไร 30% จากต้นทุน 100 บาท):</strong><br/>
        ❌ <strong>คิดแบบ Markup:</strong> ราคาขาย = 100 + (100 × 0.3) = <strong>130 บาท</strong> (ถ้าคุณถูก Shopee หักค่าฟี 30% คุณจะโดนหัก 39 บาท กลายเป็นขาดทุนทันที!)<br/>
        ✅ <strong>คิดแบบ Margin:</strong> ราคาขาย = 100 ÷ (1 - 0.30) = 100 ÷ 0.70 = <strong>142.85 บาท</strong> (นี่คือราคาที่คุณต้องตั้ง เพื่อให้ได้กำไร 30% ของยอดขายที่แท้จริง)
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🎯 สูตรคำนวณจุดคุ้มทุน (Break-even Point)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">ก่อนเริ่มเปิดร้านหรือจ้างพนักงานเพิ่ม คุณต้องคำนวณก่อนว่าต้องขายของกี่ชิ้นจึงจะครอบคลุมค่าเช่า (ค่าใช้จ่ายคงที่):</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-emerald-500 font-mono text-center overflow-x-auto">
        <span className="text-xl font-bold text-gray-900 dark:text-white">จำนวนชิ้นที่ต้องขาย = ค่าใช้จ่ายคงที่ (Fixed Costs) ÷ (ราคาขายต่อชิ้น - ต้นทุนผันแปรต่อชิ้น)</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่างการคำนวณ:</strong> คุณเช่าตึกเปิดร้านกาแฟ มีค่าเช่าและเงินเดือนพนักงานรวม 30,000 บาท/เดือน (Fixed Costs)<br/>
        กาแฟขายแก้วละ 80 บาท, มีต้นทุนเมล็ดกาแฟ/แก้ว/หลอด แก้วละ 30 บาท (ต้นทุนผันแปรต่อชิ้น)<br/><br/>
        จุดคุ้มทุน = 30,000 ÷ (80 - 30)<br/>
        จุดคุ้มทุน = 30,000 ÷ 50 = <strong>600 แก้วต่อเดือน</strong><br/>
        *(หมายความว่า คุณต้องขายให้ได้วันละ 20 แก้วเป็นอย่างต่ำ เพื่อไม่ให้ขาดทุน แก้วที่ 601 เป็นต้นไปจึงคือกำไร)*
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-900 dark:text-white flex items-center gap-2">🧮 สูตรถอด VAT 7% จากราคาที่รวมภาษีแล้ว (Include VAT)</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">เวลาไปซื้อของแม็คโครหรือซื้ออุปกรณ์เข้าร้าน แล้วต้องทำบัญชีเพื่อขอคืนภาษี คุณไม่สามารถเอา 7% ไปคูณดื้อๆ ได้:</p>
      <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl mb-4 border-l-4 border-teal-500">
        <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200">
          <li><strong>สูตรหาราคาก่อน VAT:</strong> ราคาเต็มที่จ่ายไป × 100 ÷ 107</li>
          <li><strong>สูตรหาจำนวนเงิน VAT 7%:</strong> ราคาเต็มที่จ่ายไป × 7 ÷ 107</li>
        </ul>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <strong>ตัวอย่าง:</strong> ซื้อปริ้นเตอร์ราคา 5,350 บาท (ราคานี้รวม VAT แล้ว)<br/><br/>
        ราคาสินค้าจริง (ก่อน VAT) = 5,350 × 100 ÷ 107 = <strong>5,000 บาท</strong><br/>
        จำนวนภาษีมูลค่าเพิ่ม = 5,350 × 7 ÷ 107 = <strong>350 บาท</strong><br/>
        *(คุณสามารถนำตัวเลข VAT 350 บาทนี้ ไปลงบันทึกเป็น "ภาษีซื้อ" เพื่อเคลมกับสรรพากรได้)*
      </p>

      {/* 4. ข้อควรรู้ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">4. ข้อควรรู้และคำแนะนำเพิ่มเติม สำหรับการทำธุรกิจยุคดิจิทัล</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>การตัดราคาคือหายนะ:</strong> ก่อนที่คุณจะลดราคาแข่งกับคู่แข่ง ควรใช้เครื่องมือ <strong>Margin</strong> ตรวจสอบก่อนทุกครั้ง การลดราคาขายลง 10% อาจทำให้คุณต้องขายของ "เพิ่มขึ้นถึง 50%" เพื่อให้ได้กำไรเข้ากระเป๋าเท่าเดิม (เพราะต้นทุนคงที่ไม่ได้ลดตาม)
        </li>
        <li>
          <strong>สินค้าค้างสต็อก = ต้นทุนจม:</strong> อย่าตุนของเยอะเกินไป ให้ใช้เครื่องมือ <strong>รอบหมุนเวียนสินค้า (Inventory Turnover)</strong> และ <strong>จุดสั่งซื้อ (Safety Stock)</strong> เพื่อคำนวณว่าควรสั่งของเติมเมื่อไหร่ เพื่อไม่ให้เงินทุนไปจมอยู่กับสต็อกที่ขายไม่ออก
        </li>
        <li>
          <strong>LTV สำคัญกว่า CAC:</strong> <strong>ต้นทุนได้ลูกค้าใหม่ (CAC)</strong> จากการยิงแอดมักจะแพงขึ้นเรื่อยๆ ธุรกิจที่รอดคือธุรกิจที่ทำ Customer Retention เก่ง (ให้ลูกค้ากลับมาซื้อซ้ำ) จนทำให้ <strong>มูลค่าลูกค้าตลอดชีพ (LTV)</strong> สูงกว่าค่าแอดที่เสียไป
        </li>
        <li>
          <strong>อย่าลืมคิด "ค่าแรงตัวเอง":</strong> พ่อค้าแม่ค้ามือใหม่มักจะไม่เอา "ค่าแรงตัวเอง" ไปรวมใน <strong>ต้นทุนขาย (COGS)</strong> ทำให้รู้สึกว่าขายได้กำไรเยอะ แต่จริงๆ แล้วคุณแค่กำลังทำงานฟรีโดยไม่มีเงินเดือน ดังนั้นจงบวกค่าแรงของตัวเองเข้าไปในโครงสร้างราคาด้วยเสมอ
        </li>
      </ul>

      {/* 5. FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">5. คำถามที่พบบ่อย (FAQ เกี่ยวกับธุรกิจและการคำนวณบัญชี)</h2>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q1: ทำไมขายดี ออเดอร์เยอะ แต่พอสิ้นเดือนกลับไม่มีเงินสดเหลือเลย?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: นี่คืออาการ "เงินจม" ครับ สาเหตุหลักมาจาก 1) คุณตั้ง <strong>Margin</strong> ผิด ทำให้กำไรไม่พอกับค่าธรรมเนียม 2) เงินสดไปจมอยู่กับสต็อกสินค้า (ใช้เครื่องมือ Inventory Turnover เช็คดู) 3) ลืมหักค่าใช้จ่ายแฝง เช่น ค่ากล่องพัง ค่าเทปกาว หรือลูกค้าตีกลับ (Return Rate)
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q2: ค่าเสื่อมราคา (Depreciation) คืออะไร ทำไมแม่ค้าออนไลน์ถึงต้องสนใจ?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: <strong>ค่าเสื่อมราคา</strong> คือการกระจายต้นทุนของสินทรัพย์ชิ้นใหญ่ เช่น คอมพิวเตอร์ หรือเครื่องปริ้นใบปะหน้า สมมติคุณซื้อเครื่องปริ้นมา 5,000 บาท ใช้งานได้ 5 ปี แปลว่าคุณมีค่าใช้จ่ายแฝงปีละ 1,000 บาท (หรือเดือนละ 83 บาท) การนำตัวเลขนี้ไปบวกเป็นต้นทุน จะช่วยให้คุณมีเงินสะสมพอสำหรับซื้อเครื่องใหม่เมื่อของเก่าพังครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q3: อัตราการเปลี่ยนเป็นยอดขาย (Conversion Rate) ที่ดีควรอยู่ที่เท่าไหร่?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: โดยเฉลี่ยในวงการ E-commerce <strong>Conversion Rate</strong> (จำนวนคนซื้อ ÷ จำนวนคนคลิกดูสินค้า × 100) จะอยู่ที่ประมาณ 1.5% - 3% ครับ หากของคุณต่ำกว่า 1% แปลว่าโฆษณาอาจจะไม่ตรงกลุ่มเป้าหมาย หรือรายละเอียดสินค้า/รูปภาพ ยังไม่ดึงดูดใจพอให้คนกดสั่งซื้อครับ
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Q4: ถ้าจะจด VAT (ภาษีมูลค่าเพิ่ม) ต้องมีรายได้ต่อปีเท่าไหร่?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            A: ตามกฎหมายสรรพากร บุคคลธรรมดาหรือนิติบุคคลที่มี "รายรับ" (ไม่ใช่กำไร) ถึง 1.8 ล้านบาทต่อปี จะต้องจดทะเบียนภาษีมูลค่าเพิ่มภายใน 30 วันครับ เมื่อจดแล้วคุณสามารถใช้เครื่องมือ <strong>คำนวณ VAT</strong> ของเราเพื่อคำนวณภาษีขายและภาษีซื้อสำหรับนำส่งสรรพากรในแต่ละเดือนได้เลยครับ
          </p>
        </div>
      </div>
    </article>
  );
};
