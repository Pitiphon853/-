import React, { useState } from 'react';
import { Calculator, FileText, RefreshCw, Clipboard, Check, BookOpen, ToggleLeft, ToggleRight } from 'lucide-react';

export default function NumberToThaiText({ lang }: any) {
  const [numberInput, setNumberInput] = useState<string>('');
  const [isCurrencyMode, setIsCurrencyMode] = useState<boolean>(true);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const digits = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  const positions = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

  const convertIntPart = (str: string): string => {
    if (str === '0' || str === '') return 'ศูนย์';
    let s = str;
    const blocks: string[] = [];
    while (s.length > 0) {
      if (s.length > 6) {
        blocks.push(s.slice(-6));
        s = s.slice(0, -6);
      } else {
        blocks.push(s);
        s = '';
      }
    }

    const read6Digits = (block: string, isLastBlock: boolean): string => {
      let blockText = '';
      const n = block.length;
      for (let i = 0; i < n; i++) {
        const digit = parseInt(block[i]);
        const pos = n - 1 - i;
        if (digit !== 0) {
          let digitWord = digits[digit];
          let posWord = positions[pos];

          if (pos === 1) {
            if (digit === 1) digitWord = '';
            else if (digit === 2) digitWord = 'ยี่';
          } else if (pos === 0) {
            if (digit === 1 && n > 1) {
              const hasPrev = block.slice(0, i).split('').some((c) => c !== '0') || !isLastBlock;
              if (hasPrev) {
                digitWord = 'เอ็ด';
              }
            }
          }
          blockText += digitWord + posWord;
        }
      }
      return blockText;
    };

    let resultText = '';
    for (let idx = blocks.length - 1; idx >= 0; idx--) {
      const block = blocks[idx];
      const isLastBlock = idx === blocks.length - 1;
      let blockText = read6Digits(block, isLastBlock);

      if (idx > 0 && blockText !== '') {
        blockText += 'ล้าน'.repeat(idx);
      }
      resultText += blockText;
    }

    return resultText;
  };

  const calculate = () => {
    setError(null);
    setResult(null);
    setCopied(false);

    if (!numberInput.trim()) {
      setError(lang === 'th' ? 'กรุณากรอกตัวเลข' : 'Please enter a number.');
      return;
    }

    // Parse float checks
    const parsed = parseFloat(numberInput);
    if (isNaN(parsed)) {
      setError(lang === 'th' ? 'รูปแบบตัวเลขไม่ถูกต้อง' : 'Invalid number format.');
      return;
    }

    // We split input by '.' to avoid floating point precision issues
    const parts = numberInput.trim().split('.');
    let integerStr = parts[0].replace(/^0+/, ''); // Remove leading zeros
    if (integerStr === '') integerStr = '0';

    // Check if integer part is too large for simple representation
    if (integerStr.length > 15) {
      setError(lang === 'th' ? 'ตัวเลขมีขนาดใหญ่เกินไปสำหรับการแปลง (รองรับสูงสุด 15 หลัก)' : 'Number is too large (maximum 15 digits supported).');
      return;
    }

    const decimalStr = parts[1] || '';

    if (isCurrencyMode) {
      // Currency mode: Max 2 decimal places for satang
      let satangStr = decimalStr.slice(0, 2);
      if (satangStr.length === 1) satangStr += '0';
      if (satangStr.length === 0) satangStr = '00';
      
      const satangVal = parseInt(satangStr);
      const isZeroInteger = integerStr === '0' || integerStr === '';
      const isZeroSatang = satangVal === 0;

      if (isZeroInteger && isZeroSatang) {
        setResult('ศูนย์บาทถ้วน');
        return;
      }

      let thaiText = '';
      if (!isZeroInteger) {
        thaiText += convertIntPart(integerStr) + 'บาท';
      }

      if (!isZeroSatang) {
        thaiText += convertIntPart(satangStr) + 'สตางค์';
      } else {
        thaiText += 'ถ้วน';
      }

      setResult(thaiText);
    } else {
      // General Number mode
      let thaiText = convertIntPart(integerStr);
      if (decimalStr.length > 0) {
        thaiText += 'จุด';
        for (let i = 0; i < decimalStr.length; i++) {
          const digit = parseInt(decimalStr[i]);
          thaiText += digits[digit];
        }
      }
      setResult(thaiText);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setNumberInput('');
    setResult(null);
    setError(null);
    setCopied(false);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <FileText className="w-8 h-8 text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือแปลงตัวเลขเป็นตัวหนังสือภาษาไทย' : 'Number to Thai Text Converter'}
        </h1>
      </div>

      {/* Main UI */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTH ? 'ป้อนตัวเลข' : 'Enter Number'}
            </label>
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-xl font-mono"
              placeholder={isTH ? 'เช่น 12345.50' : 'e.g., 12345.50'}
              step="any"
            />
          </div>

          {/* Mode Switch */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <span className="block text-sm font-semibold text-gray-800">
                {isTH ? 'โหมดจำนวนเงิน (บาท/สตางค์)' : 'Currency Mode (Baht/Satang)'}
              </span>
              <span className="text-xs text-gray-500">
                {isTH ? 'ลงท้ายด้วย "บาทถ้วน" หรือ "สตางค์"' : 'Appends "Baht" and "Satang" terms'}
              </span>
            </div>
            <button
              onClick={() => setIsCurrencyMode(!isCurrencyMode)}
              className="text-emerald-600 hover:text-emerald-700 transition"
            >
              {isCurrencyMode ? (
                <ToggleRight className="w-12 h-12" />
              ) : (
                <ToggleLeft className="w-12 h-12 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'คำนวณแปลงข้อความ' : 'Convert'}</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <FileText className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'ตัวหนังสือภาษาไทย' : 'Thai Text Result'}
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[120px] flex flex-col justify-center items-center">
                  <div className="text-xl font-bold text-gray-800 text-center leading-relaxed select-all">
                    {result}
                  </div>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="w-full bg-gray-800 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <span>{isTH ? 'คัดลอกสำเร็จ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-5 h-5" />
                      <span>{isTH ? 'คัดลอกข้อความ' : 'Copy to Clipboard'}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'ผลลัพธ์ตัวเขียนสะกดไทยจะแสดงที่นี่หลังจากแปลงข้อมูลเรียบร้อย' : 'The converted Thai spelling will appear here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-emerald max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-emerald-600" />
          {"{"}isTH ? 'ความสำคัญของตัวเขียนภาษาไทยในทางธุรกรรมและการเงิน' : 'Importance of Thai Written Numbers in Finance'{"}"}
        </h2>
        <p className="mb-4">
          การแปลงตัวเลขให้เป็นตัวหนังสือสะกดอย่างเป็นทางการภาษาไทย (เช่น การแปลงจาก 1,500.00 บาท ไปเป็น "หนึ่งพันห้าร้อยบาทถ้วน") เป็นระบบการทำธุรกรรมที่มีความสำคัญอย่างยิ่งในแวดวงการเงิน การบัญชี และกฎหมายไทย การใช้ตัวสะกดที่เป็นลายลักษณ์อักษรจะช่วยป้องกันข้อผิดพลาดและความพยายามในการทุจริตปลอมแปลงเอกสารสำคัญ เช่น เช็คเงินสด สัญญาซื้อขาย และใบเสร็จรับเงิน
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">กฎเกณฑ์ทางกฎหมายเกี่ยวกับตัวเลขและตัวอักษร</h3>
        <p className="mb-4">
          ตามประมวลกฎหมายแพ่งและพาณิชย์ของไทย มีการระบุแนวทางชัดเจนว่า ในกรณีที่จำนวนเงินหรือจำนวนตัวเลขในเอกสารสัญญาระหว่างตัวเลขกับตัวอักษรไม่ตรงกัน <strong>ให้ยึดถือจำนวนที่เป็นตัวอักษรเป็นหลัก</strong> เนื่องจากกระบวนการเขียนตัวสะกดตัวหนังสือมักมีความจงใจและความรอบคอบสูงกว่าการพิมพ์ตัวเลขปกติ ซึ่งอาจเกิดการกดแป้นพิมพ์ผิดพลาดหรือการเพิ่มตัวเลขศูนย์ต่อท้ายโดยไม่เจตนาได้ง่าย
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">หลักเกณฑ์การสะกดตัวเลขภาษาไทยที่เป็นมาตรฐาน</h3>
        <p className="mb-4">
          ภาษาไทยมีข้อตกลงและสัญชาตญาณเฉพาะในการอ่านตัวเลข ซึ่งเครื่องมือแปลงนี้ได้รับการพัฒนาตามเงื่อนไขเหล่านั้น ได้แก่:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>คำว่า "ยี่สิบ":</strong> ในหลักสิบ เลข 2 จะถูกอ่านเปลี่ยนรูปจาก "สองสิบ" เป็น "ยี่สิบ" เสมอ
          </li>
          <li>
            <strong>คำว่า "เอ็ด":</strong> เมื่อเลข 1 อยู่ในตำแหน่งหลักหน่วยของตัวเลขที่มีความยาวตั้งแต่สองหลักขึ้นไป จะต้องสะกดออกเสียงเป็น "เอ็ด" เช่น 11 คือ สิบเอ็ด, 101 คือ หนึ่งร้อยเอ็ด
          </li>
          <li>
            <strong>คำว่า "ถ้วน":</strong> สำหรับการเขียนเช็คหรือจำนวนเงินที่ไม่มีเศษสตางค์ (เศษทศนิยมเป็นศูนย์) จำเป็นต้องลงท้ายด้วยคำว่า "ถ้วน" ทุกครั้ง เพื่อปิดช่องว่างไม่ให้บุคคลอื่นสามารถเติมคำสะกดเกี่ยวกับสตางค์เพิ่มเข้าไปเพื่อเพิ่มยอดเงินได้
          </li>
          <li>
            <strong>ระบบหลักล้าน (ล้านล้าน):</strong> สำหรับตัวเลขขนาดใหญ่มากๆ ภาษาไทยจะวนลูปตัวคูณที่หลัก "ล้าน" (10^6) เช่น 1,000,000,000,000 จะอ่านว่า "หนึ่งล้านล้าน" แทนที่จะใช้คำอื่นที่ไม่มีในภาษาไทย
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">การเลือกใช้งานให้เหมาะสม</h3>
        <p className="mb-4">
          ระบบแปลงของเราช่วยให้คุณเลือกได้ระหว่าง <strong>โหมดจำนวนเงิน</strong> ซึ่งจะได้ผลลัพธ์ลงท้ายด้วย บาท และ สตางค์/ถ้วน เหมาะสมสำหรับเขียนเช็ค จ่ายเช็ค พิมพ์ใบเสนอราคา หรือทำสัญญาการเงิน และ <strong>โหมดอ่านตัวเลขทั่วไป</strong> ซึ่งจะอ่านตัวเลขตามสัญกรณ์คณิตศาสตร์ปกติ (รวมถึงจุดทศนิยมเป็นรายตัว) ซึ่งมีประโยชน์ในการเรียนการสอนวิชาคณิตศาสตร์และเอกสารอ้างอิงทั่วไป
        </p>
      </article>
    </div>
  );
}
