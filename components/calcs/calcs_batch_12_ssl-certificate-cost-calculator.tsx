import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CalendarDays } from 'lucide-react';

export default function SslCertificateCostCalculator({ lang }: any) {
  const [sslType, setSslType] = useState<string>('dv');
  const [years, setYears] = useState<number>(1);
  const [setupFee, setSetupFee] = useState<number>(0);

  const sslBasePrices: Record<string, number> = {
    free: 0,
    dv: 15,
    ov: 60,
    ev: 150,
    wildcard: 100,
    multidomain: 120
  };

  const baseCostPerYear = sslBasePrices[sslType];
  const totalSslCost = baseCostPerYear * years;
  const totalCost = totalSslCost + setupFee;
  const averageCostPerYear = years > 0 ? totalCost / years : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณค่าใช้จ่าย SSL Certificate' : 'SSL Certificate Cost Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินต้นทุนรายปีและตลอดอายุการใช้งานของใบรับรองความปลอดภัยเว็บไซต์' : 'Estimate annual and lifetime costs of your website security certificates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'ประเภทของ SSL Certificate' : 'SSL Certificate Type'}
            </label>
            <select
              value={sslType}
              onChange={(e) => setSslType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="free">Free Let's Encrypt / Auto SSL ($0/yr)</option>
              <option value="dv">Domain Validation (DV) (~$15/yr)</option>
              <option value="ov">Organization Validation (OV) (~$60/yr)</option>
              <option value="ev">Extended Validation (EV) (~$150/yr)</option>
              <option value="wildcard">Wildcard SSL (~$100/yr)</option>
              <option value="multidomain">Multi-Domain (SAN) (~$120/yr)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'ระยะเวลาที่ต้องการสั่งซื้อ (ปี)' : 'Duration (Years)'}
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'TH' ? 'ปัจจุบันเบราว์เซอร์ยอมรับอายุ SSL สูงสุด 398 วัน แต่การซื้อหลายปีจะช่วยล็อกราคาไว้ได้' : 'Browsers now only trust 1-year certs, but buying multi-year locks in the price.'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'ค่าบริการติดตั้ง/ตั้งค่าโดยผู้เชี่ยวชาญ (ถ้ามี)' : 'Installation / Setup Fee ($)'}
            </label>
            <input
              type="number"
              value={setupFee}
              onChange={(e) => setSetupFee(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-xl space-y-4">
          <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-300 mb-4">
            {lang === 'TH' ? 'สรุปค่าใช้จ่าย' : 'Cost Summary'}
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? 'ค่า SSL พื้นฐาน/ปี' : 'Base Cost / Year'}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${baseCostPerYear}</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-blue-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? `รวมค่า SSL (${years} ปี)` : `Total SSL Cost (${years} Years)`}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${totalSslCost}</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-emerald-500 mt-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'TH' ? 'ค่าใช้จ่ายรวมสุทธิ' : 'Total Net Cost'}
                </p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${totalCost}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {lang === 'TH' ? `เฉลี่ย $${averageCostPerYear.toFixed(2)} / ปี` : `Avg $${averageCostPerYear.toFixed(2)} / year`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณค่าใช้จ่าย SSL Certificate คืออะไร?</h2>
        <p>SSL (Secure Sockets Layer) Certificate คือใบรับรองความปลอดภัยทางอิเล็กทรอนิกส์ ซึ่งจะช่วยเพิ่มระดับความปลอดภัยในการสื่อสารและรับส่งข้อมูลบนเครือข่ายอินเทอร์เน็ตระหว่างเครื่องเซิร์ฟเวอร์และเว็บบราว์เซอร์ของผู้ใช้งาน โดยจะเปลี่ยนโปรโตคอลจาก HTTP ให้กลายเป็น HTTPS เครื่องมือนี้จะช่วยคุณประเมินค่าใช้จ่ายในการติดตั้งและบำรุงรักษาความปลอดภัยของเว็บไซต์คุณแบบรายปี หรือตามระยะเวลาการใช้งานของคุณ</p>

        <h3>ประเภทของ SSL Certificate แตกต่างกันอย่างไร?</h3>
        <p>ในท้องตลาดจะมี SSL Certificate หลากหลายรูปแบบที่ตอบโจทย์โครงสร้างเว็บไซต์และระดับการตรวจสอบองค์กรที่แตกต่างกัน ดังนี้:</p>
        <ul>
          <li><strong>Domain Validation (DV):</strong> เป็นรูปแบบเบสิคที่สุดและมักมีราคาถูก (หรือสามารถใช้ของฟรีอย่าง Let's Encrypt ได้) มีการตรวจสอบเฉพาะความเป็นเจ้าของโดเมน เหมาะสำหรับเว็บไซต์ทั่วไป บล็อก หรือเว็บไซต์ที่ไม่ได้มีการทำธุรกรรมทางการเงินสูงนัก</li>
          <li><strong>Organization Validation (OV):</strong> ต้องมีการส่งเอกสารเพื่อยืนยันตัวตนองค์กรกับหน่วยงานผู้ออกใบรับรอง (CA - Certificate Authority) จึงมีความน่าเชื่อถือกว่า ผู้ใช้งานสามารถคลิกดูชื่อบริษัทในใบรับรองได้ เหมาะกับเว็บไซต์บริษัทและร้านค้า e-Commerce ชั้นนำ</li>
          <li><strong>Extended Validation (EV):</strong> เป็น SSL ระดับสูงสุด มีขั้นตอนการตรวจสอบองค์กรที่เข้มงวดที่สุด ในอดีตจะแสดงชื่อบริษัทสีเขียวบนแถบที่อยู่เว็บ (Address bar) ปัจจุบันแม้จะไม่มีชื่อสีเขียวแล้ว แต่ก็ยังสามารถตรวจสอบชื่อบริษัทในใบรับรองได้ ช่วยสร้างความมั่นใจสูงสุด เหมาะกับเว็บไซต์ธนาคาร การเงิน หรือเว็บไซต์แบรนด์ระดับสากล</li>
          <li><strong>Wildcard SSL:</strong> สามารถใช้คุ้มครองโดเมนหลักและซับโดเมน (Sub-domains) ได้ไม่จำกัดภายใต้ชื่อโดเมนเดียวกัน (เช่น *.yourdomain.com) เหมาะสำหรับบริษัทที่มีบริการย่อยหลายระบบ</li>
          <li><strong>Multi-Domain (SAN) SSL:</strong> เหมาะสำหรับธุรกิจที่มีหลายชื่อโดเมน สามารถนำ SSL ใบเดียวไปใช้คุ้มครองเว็บไซต์ทั้งหมดได้ ช่วยประหยัดต้นทุนและลดภาระในการบริหารจัดการใบรับรองหลายๆ ใบ</li>
        </ul>

        <h3>ทำไมเว็บไซต์ถึงต้องติดตั้ง SSL Certificate?</h3>
        <p>การมี SSL ไม่ได้เป็นเพียง "ตัวเลือก" อีกต่อไป แต่กลายเป็น "ข้อบังคับพื้นฐาน" สำหรับการทำเว็บไซต์ในปัจจุบันด้วยเหตุผลหลักๆ 3 ประการ คือ:</p>
        <ol>
          <li><strong>ปกป้องข้อมูลส่วนบุคคลของลูกค้า:</strong> ข้อมูลรหัสผ่าน บัตรเครดิต และข้อมูลส่วนตัวจะถูกเข้ารหัส (Encryption) ยากต่อการถูกดักจับและขโมยโดยแฮกเกอร์ (Man-in-the-middle attacks)</li>
          <li><strong>หลีกเลี่ยงการถูกแจ้งเตือน "Not Secure":</strong> เบราว์เซอร์ชั้นนำอย่าง Google Chrome, Firefox, Safari จะแสดงคำเตือนสีแดง "ไม่ปลอดภัย" อย่างชัดเจนบนเว็บไซต์ที่ไม่มี HTTPS ซึ่งจะทำให้ผู้เข้าชมเว็บไซต์เกิดความไม่มั่นใจและอาจกดปิดเว็บหนีทันที</li>
          <li><strong>ส่งผลดีต่ออันดับบน Google (SEO):</strong> Google ได้ประกาศอย่างเป็นทางการมานานแล้วว่า HTTPS เป็นหนึ่งในปัจจัย (Ranking Factor) ในการจัดอันดับบน Google Search หากคุณต้องการทำ SEO ให้ได้ผลดี การติดตั้ง SSL ถือเป็นก้าวแรกที่คุณต้องทำให้เสร็จเรียบร้อย</li>
        </ol>

        <h3>เคล็ดลับการลดต้นทุนและดูแล SSL</h3>
        <p>สำหรับเว็บไซต์ขนาดเล็ก แนะนำให้ใช้ Auto SSL ฟรีจากผู้ให้บริการโฮสติ้ง ซึ่งครอบคลุมเพียงพอแล้ว แต่หากทำธุรกิจ E-commerce ควรลงทุนกับ OV หรือ EV เพื่อสร้างความน่าเชื่อถือ นอกจากนี้ ปัจจุบันอุตสาหกรรมเบราว์เซอร์ได้จำกัดอายุใช้งานต่อใบของ SSL ให้เหลือเพียงระยะสั้น (ไม่เกิน 398 วัน) เพื่อให้ผู้ดูแลระบบต้องยืนยันตัวตนบ่อยขึ้น แต่คุณสามารถซื้อ Subscription แพ็กเกจหลายปีล่วงหน้าเพื่อล็อคราคาเดิมไว้ได้ และผู้ให้บริการจะช่วยออกใบรับรองใบใหม่ให้ในแต่ละปี</p>
      </div>
    </div>
  );
}
