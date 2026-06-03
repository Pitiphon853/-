import React, { useState } from 'react';
import { MailOpen, MousePointer2, ShoppingCart, DollarSign } from 'lucide-react';

export default function EmailRevenueCalculator({ lang }: any) {
  const [subscribers, setSubscribers] = useState<number>(10000);
  const [openRate, setOpenRate] = useState<number>(20);
  const [ctr, setCtr] = useState<number>(3);
  const [conversionRate, setConversionRate] = useState<number>(5);
  const [aov, setAov] = useState<number>(50);

  const emailsOpened = Math.round(subscribers * (openRate / 100));
  const emailsClicked = Math.round(subscribers * (ctr / 100));
  const totalConversions = Math.round(emailsClicked * (conversionRate / 100));
  const totalRevenue = totalConversions * aov;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {lang === 'TH' ? 'เครื่องมือคำนวณรายได้จาก Email Marketing' : 'Email Revenue Calculator'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'TH' ? 'ประเมินยอดขายจากแคมเปญอีเมลของคุณผ่านตัวชี้วัดต่างๆ' : 'Estimate sales from your email campaigns through various metrics.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'จำนวนผู้ติดตามทั้งหมด (Total Subscribers)' : 'Total Subscribers'}
            </label>
            <input
              type="number"
              value={subscribers}
              onChange={(e) => setSubscribers(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'อัตราการเปิดอีเมล (Open Rate %)' : 'Open Rate (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={openRate}
              onChange={(e) => setOpenRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'อัตราการคลิกลิงก์ (Click-Through Rate %)' : 'Click-Through Rate (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'อัตราการซื้อสินค้า (Conversion Rate %)' : 'Conversion Rate (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'TH' ? 'มูลค่าเฉลี่ยต่อการสั่งซื้อ (Average Order Value)' : 'Average Order Value'}
            </label>
            <input
              type="number"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl space-y-4">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">
            {lang === 'TH' ? 'ผลลัพธ์แคมเปญอีเมล' : 'Campaign Results'}
          </h3>
          
          <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <MailOpen className="w-8 h-8 text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? 'จำนวนคนที่เปิดอ่าน' : 'Emails Opened'}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {emailsOpened.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <MousePointer2 className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? 'จำนวนคนที่คลิกลิงก์' : 'Emails Clicked'}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {emailsClicked.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <ShoppingCart className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? 'จำนวนการสั่งซื้อ (Conversions)' : 'Total Conversions'}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalConversions.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-green-500 mt-6">
            <DollarSign className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang === 'TH' ? 'รายได้รวมคาดการณ์ (Total Revenue)' : 'Estimated Total Revenue'}
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2>เครื่องมือคำนวณรายได้จาก Email Marketing คืออะไร?</h2>
        <p>Email Revenue Calculator คือเครื่องมือวิเคราะห์และคาดการณ์รายได้ที่คุณจะได้รับจากการส่งอีเมลแคมเปญไปยังฐานลูกค้าหรือสมาชิกของคุณ การตลาดผ่านอีเมล (Email Marketing) ถือเป็นหนึ่งในกลยุทธ์การตลาดดิจิทัลที่มี Return on Investment (ROI) หรือผลตอบแทนต่อการลงทุนที่สูงที่สุด เนื่องจากคุณไม่ต้องจ่ายเงินค่าโฆษณาตามยอดคลิก หรือกังวลกับอัลกอริธึมของโซเชียลมีเดีย คุณสื่อสารกับลูกค้าได้โดยตรงและเป็นส่วนตัว</p>

        <h3>ตัวแปรสำคัญใน Email Marketing Funnel</h3>
        <p>เพื่อให้แคมเปญประสบความสำเร็จและสร้างรายได้ คุณจำเป็นต้องเข้าใจและวัดผลตัวแปรต่างๆ ดังนี้:</p>
        <ul>
          <li><strong>Total Subscribers:</strong> ขนาดของฐานข้อมูลลูกค้าหรือผู้ติดตาม ยิ่งมีจำนวนมาก ยิ่งมีโอกาสสร้างยอดขายได้มาก แต่ต้องมั่นใจว่าเป็นรายชื่อที่ยินยอม (Opt-in) และมีคุณภาพ</li>
          <li><strong>Open Rate (อัตราการเปิด):</strong> สัดส่วนเปอร์เซ็นต์ของผู้ที่เปิดอ่านอีเมลของคุณเทียบกับจำนวนที่ส่งสำเร็จ (Delivered) หัวข้ออีเมล (Subject Line) ที่ดึงดูดใจ และชื่อผู้ส่งที่น่าเชื่อถือ มีผลโดยตรงต่อการเพิ่ม Open Rate อย่างมหาศาล</li>
          <li><strong>Click-Through Rate (CTR):</strong> จำนวนคนที่คลิกลิงก์ต่างๆ ในเนื้อหาอีเมล เพื่อเข้าไปยังหน้าเว็บไซต์หรือร้านค้าของคุณ การออกแบบอีเมลให้มี Call to Action (CTA) ที่ชัดเจนจะช่วยเพิ่ม CTR</li>
          <li><strong>Conversion Rate:</strong> อัตราของผู้ที่เข้ามาแล้วตัดสินใจซื้อสินค้าหรือทำตามเป้าหมายที่คุณวางไว้ เช่น การลงทะเบียน การซื้อแพ็กเกจ หรือกรอกฟอร์ม ข้อมูลตรงนี้สะท้อนถึงคุณภาพของสินค้าและ Landing Page</li>
          <li><strong>Average Order Value (AOV):</strong> ยอดซื้อเฉลี่ยต่อหนึ่งออเดอร์ เมื่อนำมาคูณกับ Conversion ทั้งหมด ก็จะได้รายได้รวม (Total Revenue)</li>
        </ul>

        <h3>ทำไมทุกธุรกิจควรโฟกัสที่ Email Marketing</h3>
        <p>หลายคนมักคิดว่า “อีเมลตายไปแล้ว” หรือคนไม่อ่านอีเมลกันแล้ว แต่ความจริงคือ การใช้อีเมลในการสื่อสารแบบ B2B (Business to Business) และ B2C (Business to Consumer) โดยเฉพาะแบรนด์ E-Commerce ยังสร้างเม็ดเงินมหาศาล ข้อดีหลักๆ คือ</p>
        <ol>
          <li><strong>ต้นทุนต่ำแต่ได้ผลกำไรสูง:</strong> ค่าใช้จ่ายในการส่งอีเมลผ่านแพลตฟอร์มอย่าง Mailchimp, Klaviyo หรือ HubSpot มักจะเป็นรายเดือนแบบคงที่ เมื่อเทียบกับการยิง Ads ที่ยิ่งเข้าถึงคนเยอะยิ่งจ่ายแพง อีเมลจึงประหยัดงบได้มากกว่ามาก</li>
          <li><strong>ข้อมูลลูกค้าเป็นของคุณ (Owned Media):</strong> ในยุคที่แพลตฟอร์มโซเชียลมีเดียเปลี่ยนแปลงนโยบายและลดการมองเห็น (Reach) ได้ทุกเมื่อ การมี Email List ที่เป็นของตัวเองช่วยรับประกันว่าคุณจะมีช่องทางติดต่อลูกค้าเสมอ</li>
          <li><strong>ทำ Automation ได้:</strong> คุณสามารถสร้างระบบตอบกลับอัตโนมัติ (Automated Flows) เช่น อีเมลต้อนรับลูกค้าใหม่ อีเมลทวงคืนตะกร้าสินค้าที่ถูกทิ้งไว้ (Abandoned Cart) ซึ่งจะช่วยทำเงินให้ธุรกิจคุณได้ตลอด 24 ชั่วโมงแม้ในขณะที่คุณหลับ</li>
        </ol>

        <h3>เคล็ดลับการเพิ่มยอดขายจาก Email Marketing</h3>
        <p>หากผลลัพธ์ในเครื่องคำนวณยังไม่เป็นที่น่าพอใจ ลองปรับปรุงกลยุทธ์ของคุณผ่าน 3 แนวทางนี้: 1. ทำ A/B Testing ค้นหาเวลาและหัวข้อที่คนชอบเปิดอ่านที่สุด 2. จัดกลุ่มลูกค้าเป้าหมาย (Segmentation) ส่งอีเมลที่เข้ากับพฤติกรรมแต่ละกลุ่ม ไม่หว่านแห และ 3. ทำความสะอาดรายชื่ออีเมล (List Cleaning) โดยคัดคนที่ไม่อ่านอีเมลออกเป็นระยะ เพื่อรักษาชื่อเสียงของผู้ส่ง (Sender Reputation) ให้ดีอยู่เสมอ และรับประกันว่าอีเมลของคุณจะไม่ตกไปอยู่ในถังขยะ Spam</p>
      </div>
    </div>
  );
}
