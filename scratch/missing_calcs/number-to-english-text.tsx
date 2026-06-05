"use client";

import React, { useState } from 'react';
import { Type, Copy, CheckCircle2 } from 'lucide-react';

export default function NumberToEnglishText({ lang }: { lang: 'th' | 'en' }) {
  const [numStr, setNumStr] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const t = {
    title: lang === 'th' ? 'แปลงตัวเลขเป็นตัวหนังสือภาษาอังกฤษ' : 'Number to English Text',
    desc: lang === 'th' ? 'กรอกตัวเลขเพื่อแปลงเป็นข้อความภาษาอังกฤษ' : 'Enter a number to convert to English words',
    placeholder: lang === 'th' ? 'เช่น 1234.56' : 'e.g. 1234.56',
    result: lang === 'th' ? 'ผลลัพธ์:' : 'Result:',
    copy: lang === 'th' ? 'คัดลอก' : 'Copy',
    copied: lang === 'th' ? 'คัดลอกแล้ว' : 'Copied',
    error: lang === 'th' ? 'โปรดระบุตัวเลขที่ถูกต้อง' : 'Please enter a valid number',
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return 'zero';

    const belowTwenty = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];

    let words = '';
    let scaleIdx = 0;
    
    let n = Math.floor(Math.abs(num));

    const chunkToWords = (nChunk: number): string => {
      let chunkStr = '';
      if (nChunk >= 100) {
        chunkStr += belowTwenty[Math.floor(nChunk / 100)] + ' hundred ';
        nChunk %= 100;
      }
      if (nChunk >= 20) {
        chunkStr += tens[Math.floor(nChunk / 10)] + ' ';
        nChunk %= 10;
      }
      if (nChunk > 0) {
        chunkStr += belowTwenty[nChunk] + ' ';
      }
      return chunkStr.trim();
    };

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk > 0) {
        words = chunkToWords(chunk) + (scales[scaleIdx] ? ' ' + scales[scaleIdx] : '') + (words ? ' ' + words : '');
      }
      n = Math.floor(n / 1000);
      scaleIdx++;
    }

    if (num < 0) {
      words = 'negative ' + words;
    }

    return words.trim();
  };

  const convert = (str: string) => {
    if (!str.trim()) return '';
    const cleanStr = str.replace(/,/g, '');
    const num = parseFloat(cleanStr);
    if (isNaN(num)) return t.error;

    if (num > Number.MAX_SAFE_INTEGER) return 'Number is too large';
    
    const parts = cleanStr.split('.');
    const intPart = parseFloat(parts[0]);
    let result = numberToWords(intPart);
    
    if (parts[1]) {
      const decPartStr = parts[1].slice(0, 2);
      if (parseInt(decPartStr, 10) > 0) {
        result += ' and ' + decPartStr + '/100';
      }
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const handleCopy = () => {
    const res = convert(numStr);
    if (res && res !== t.error && res !== 'Number is too large') {
      navigator.clipboard.writeText(res);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const output = convert(numStr);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Type className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.desc}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {lang === 'th' ? 'ตัวเลข' : 'Number'}
          </label>
          <input
            type="text"
            value={numStr}
            onChange={(e) => setNumStr(e.target.value)}
            placeholder={t.placeholder}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {output && (
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 relative">
            <h3 className="text-sm font-medium text-indigo-900 mb-2">{t.result}</h3>
            <p className="text-lg text-indigo-950 font-semibold mb-4 leading-relaxed break-words">{output}</p>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm hover:bg-indigo-50 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : t.copy}</span>
            </button>
          </div>
        )}
      </div>

      <article className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">เครื่องมือแปลงตัวเลขเป็นตัวหนังสือภาษาอังกฤษ (Number to English Text)</h2>
        <p>
          ในโลกของธุรกิจ การเงิน และกฎหมาย การเขียนตัวเลขในรูปแบบตัวหนังสือหรือข้อความ (Text) เป็นสิ่งที่หลีกเลี่ยงไม่ได้ โดยเฉพาะการเขียนเช็คสั่งจ่ายเงินสด การทำสัญญาซื้อขาย หรือเอกสารทางบัญชีที่ต้องการความแม่นยำสูงสุด 
          การแปลงตัวเลขเป็นตัวหนังสือภาษาอังกฤษ (Number to English Text / Number to Words) ช่วยป้องกันการปลอมแปลงตัวเลข และลดความผิดพลาดในการสื่อสารได้อย่างมีประสิทธิภาพ
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ทำไมการเขียนตัวเลขเป็นตัวหนังสือจึงสำคัญ?</h3>
        <p>
          การเขียนจำนวนเงินบนเอกสารสำคัญเพียงแค่ตัวเลข (เช่น 1,500.00) มีความเสี่ยงที่จะถูกแก้ไขหรือเติมเลขศูนย์เข้าไปได้ง่าย (เช่น กลายเป็น 15,000.00) 
          การกำกับด้วยตัวหนังสือภาษาอังกฤษ (เช่น One thousand five hundred and 00/100) จะเป็นการยืนยันจำนวนเงินที่แท้จริง ซึ่งตามกฎหมายสากลและมาตรฐานธนาคาร หากตัวเลขและตัวหนังสือไม่ตรงกัน จะยึดถือจำนวนเงินที่ระบุเป็นตัวหนังสือเป็นหลักเสมอ
        </p>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">หลักการเขียนตัวเลขเป็นข้อความภาษาอังกฤษ</h3>
        <p>การแปลงตัวเลขเป็นคำภาษาอังกฤษมีกฎและโครงสร้างที่ชัดเจน โดยแบ่งตัวเลขออกเป็นกลุ่มละ 3 หลัก (หลักพัน หลักล้าน หลักพันล้าน) ได้แก่:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>หลักหน่วยถึงหลักสิบ:</strong> zero ถึง ninety-nine</li>
          <li><strong>หลักร้อย:</strong> ใช้คำว่า "hundred" (เช่น One hundred, Two hundred)</li>
          <li><strong>หลักพัน:</strong> ใช้คำว่า "thousand"</li>
          <li><strong>หลักล้าน:</strong> ใช้คำว่า "million"</li>
          <li><strong>หลักพันล้าน:</strong> ใช้คำว่า "billion"</li>
          <li><strong>จุดทศนิยมสำหรับการเงิน (Cents):</strong> มักจะเขียนในรูปเศษส่วน เช่น <code>and 50/100</code> สำหรับ 50 เซนต์ เป็นต้น</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">รูปแบบการใช้งาน (Use Cases)</h3>
        <p>
          โปรแกรมหรือเครื่องมือแปลงตัวเลขเป็นตัวอักษรนี้ ถูกนำไปประยุกต์ใช้อย่างกว้างขวางในหลายสถานการณ์ เช่น:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li><strong>การเขียนเช็ค (Check Writing):</strong> ธนาคารในประเทศที่ใช้ภาษาอังกฤษ รวมถึงการทำธุรกรรมระหว่างประเทศ จะต้องกรอกยอดเงินเป็นข้อความกำกับเสมอ</li>
          <li><strong>การทำสัญญาทางกฎหมาย:</strong> เอกสารสัญญาต่างๆ เช่น สัญญาเช่า สัญญาจ้าง หรือสัญญากู้ยืมเงิน มักจะระบุตัวเลขและวงเล็บตัวอักษรกำกับไว้ด้านหลังเพื่อป้องกันการตีความผิดพลาด</li>
          <li><strong>การออกใบเสร็จรับเงินหรือใบแจ้งหนี้ (Invoice/Receipt):</strong> ระบบบัญชีและ ERP หลายแห่งมักจะรวมฟีเจอร์แปลงตัวเลขเป็นตัวอักษรไว้ในท้ายเอกสารเพื่อความชัดเจน</li>
          <li><strong>การเรียนรู้ภาษาอังกฤษ:</strong> สำหรับนักเรียนหรือผู้ที่กำลังศึกษาภาษาอังกฤษ เครื่องมือนี้ช่วยให้สามารถเข้าใจวิธีการสะกดคำศัพท์ตัวเลขที่ซับซ้อนได้อย่างถูกต้อง</li>
        </ol>

        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">ขีดจำกัดและข้อควรระวัง</h3>
        <p>
          ระบบนี้ออกแบบมาเพื่อรองรับตัวเลขขนาดใหญ่มากๆ ได้ (ถึงระดับ Quadrillion หรือล้านล้านล้าน) อย่างไรก็ตาม ในการใช้งานจริง 
          ควรระวังเรื่องทศนิยมที่อาจถูกปัดเศษตามความเหมาะสมของการใช้งาน (เช่น ระบบนี้จะแสดงทศนิยม 2 ตำแหน่งแรกในรูปแบบ <code>xx/100</code> ซึ่งเหมาะสำหรับการเงิน) 
          นอกจากนี้ การสะกดคำในบางบริบทระหว่างอังกฤษแบบอเมริกันและอังกฤษแบบบริติช อาจมีความแตกต่างกันเล็กน้อยเกี่ยวกับการใช้คำว่า "and" หลังหลักร้อย ซึ่งระบบของเรารองรับมาตรฐานที่เป็นที่ยอมรับโดยทั่วไป
        </p>

        <p className="mt-4">
          หวังว่าเครื่องมือ Number to English Text Converter นี้จะช่วยอำนวยความสะดวกในการจัดทำเอกสาร การเรียนรู้ และการจัดการธุรกรรมทางการเงินของคุณได้อย่างรวดเร็ว แม่นยำ และปราศจากข้อผิดพลาดครับ
        </p>
      </article>
    </div>
  );
}
