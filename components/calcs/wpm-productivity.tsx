"use client";

import React, { useState } from 'react';
import { Keyboard, Clock, AlertCircle, FileText, Zap, RefreshCw } from 'lucide-react';

export default function WpmProductivityCalculator({ lang }: any) {
  const [totalKeystrokes, setTotalKeystrokes] = useState<number | string>('1500');
  const [errors, setErrors] = useState<number | string>('5');
  const [minutes, setMinutes] = useState<number | string>('5');

  // For time estimation
  const [targetWords, setTargetWords] = useState<number | string>('1000');

  const calculateWPM = () => {
    const keys = parseFloat(totalKeystrokes.toString()) || 0;
    const errs = parseFloat(errors.toString()) || 0;
    const mins = parseFloat(minutes.toString()) || 0;

    // Standard word = 5 keystrokes
    const grossWPM = mins > 0 ? (keys / 5) / mins : 0;
    const netWPM = mins > 0 ? ((keys / 5) - errs) / mins : 0;
    
    // Accuracy
    const totalWords = keys / 5;
    const accuracy = totalWords > 0 ? ((totalWords - errs) / totalWords) * 100 : 0;

    const finalNetWPM = Math.max(0, netWPM);
    const finalAccuracy = Math.max(0, Math.min(100, accuracy));

    return {
      grossWPM,
      netWPM: finalNetWPM,
      accuracy: finalAccuracy
    };
  };

  const results = calculateWPM();

  const calculateEstimation = () => {
    const target = parseFloat(targetWords.toString()) || 0;
    const speed = results.netWPM;

    if (speed <= 0 || target <= 0) return 0;
    return target / speed; // in minutes
  };

  const estimatedMinutes = calculateEstimation();

  const handleReset = () => {
    setTotalKeystrokes('1500');
    setErrors('5');
    setMinutes('5');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
      <div className="text-center mb-8">
        <Keyboard className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'WPM Typing Speed & Productivity' : 'เครื่องมือคำนวณความเร็วการพิมพ์ WPM'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Calculate your typing speed, accuracy, and estimate task duration.'
            : 'คำนวณความเร็วในการพิมพ์ (Words Per Minute) ความแม่นยำ และประเมินเวลาในการทำเอกสาร'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Variables */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-teal-500" />
            {lang === 'EN' ? 'Typing Data' : 'ข้อมูลการพิมพ์'}
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Keyboard className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Total Keystrokes' : 'จำนวนการกดแป้นพิมพ์ทั้งหมด (Keystrokes)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={totalKeystrokes}
                  onChange={(e) => setTotalKeystrokes(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 1500"
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'EN' ? '*Standard metric: 5 keystrokes = 1 word' : '*ตามมาตรฐาน: การกดแป้นพิมพ์ 5 ครั้ง = 1 คำ'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Time Taken (Minutes)' : 'เวลาที่ใช้ (นาที)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 5"
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />
                {lang === 'EN' ? 'Uncorrected Errors (Words)' : 'จำนวนคำที่พิมพ์ผิดและไม่ได้แก้'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={errors}
                  onChange={(e) => setErrors(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 5"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {lang === 'EN' ? 'Reset' : 'รีเซ็ต'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-teal-600 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-teal-100">
              <Zap className="w-5 h-5 mr-2" />
              {lang === 'EN' ? 'Your Typing Speed' : 'ความเร็วในการพิมพ์ของคุณ'}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-teal-700/50 p-4 rounded-lg text-center">
                <div className="text-teal-200 text-sm mb-1">{lang === 'EN' ? 'Gross WPM' : 'ความเร็วรวม (Gross WPM)'}</div>
                <div className="text-3xl font-bold">{Math.round(results.grossWPM)}</div>
              </div>
              <div className="bg-teal-700/50 p-4 rounded-lg text-center">
                <div className="text-teal-200 text-sm mb-1">{lang === 'EN' ? 'Accuracy' : 'ความแม่นยำ'}</div>
                <div className="text-3xl font-bold">{results.accuracy.toFixed(1)}%</div>
              </div>
            </div>

            <div className="bg-teal-500 p-5 rounded-lg border border-teal-400 shadow-inner text-center">
              <div className="text-teal-100 text-lg mb-1">{lang === 'EN' ? 'Net WPM (Actual Speed)' : 'ความเร็วสุทธิ (Net WPM)'}</div>
              <div className="text-5xl font-extrabold text-white flex items-baseline justify-center">
                {Math.round(results.netWPM)}
                <span className="text-xl font-normal text-teal-200 ml-2">WPM</span>
              </div>
            </div>
          </div>

          {/* Productivity Estimation */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-500" />
              {lang === 'EN' ? 'Task Estimation' : 'ประเมินเวลาในการทำงาน'}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-grow w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {lang === 'EN' ? 'Target Document Size (Words)' : 'ขนาดเอกสารเป้าหมาย (จำนวนคำ)'}
                </label>
                <input
                  type="number"
                  value={targetWords}
                  onChange={(e) => setTargetWords(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 1000"
                  min="1"
                />
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800 w-full sm:w-auto flex-shrink-0 min-w-[150px]">
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">{lang === 'EN' ? 'Est. Time' : 'เวลาโดยประมาณ'}</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {estimatedMinutes > 0 ? (
                    estimatedMinutes >= 60 ? (
                      `${Math.floor(estimatedMinutes / 60)}h ${Math.round(estimatedMinutes % 60)}m`
                    ) : (
                      `${Math.round(estimatedMinutes)} min`
                    )
                  ) : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-16 prose prose-teal max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          WPM คืออะไร และการคำนวณความเร็วในการพิมพ์มีความสำคัญอย่างไร?
        </h2>
        <p>
          <strong>WPM ย่อมาจาก Words Per Minute</strong> หรือจำนวนคำต่อนาที เป็นมาตรวัดสากลที่ใช้ในการประเมินความเร็วและความคล่องแคล่วในการพิมพ์ดีดของผู้ใช้ ไม่ว่าจะเป็นการพิมพ์บนคีย์บอร์ดคอมพิวเตอร์ หรือหน้าจอสมาร์ทโฟน ในยุคดิจิทัลที่การสื่อสารและการทำงานส่วนใหญ่ผ่านตัวอักษร ทักษะการพิมพ์ที่รวดเร็วและแม่นยำจึงเป็นหนึ่งในปัจจัยที่เพิ่ม <strong>ผลิตภาพ (Productivity)</strong> ในการทำงานได้อย่างมหาศาล
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">วิธีการคำนวณ WPM มาตรฐานสากล</h3>
        <p>
          หลายคนอาจสงสัยว่า "คำ" ในที่นี้วัดจากอะไร เพราะคำศัพท์ภาษาอังกฤษบางคำยาวบางคำสั้น (เช่น "a" เทียบกับ "encyclopedia") เพื่อให้การวัดผลเป็นมาตรฐานเดียวกันทั่วโลก จึงมีการกำหนดให้ <strong>1 คำ (Word) = การกดแป้นพิมพ์ 5 ครั้ง (5 Keystrokes)</strong> ซึ่งรวมถึงการเว้นวรรคและเครื่องหมายวรรคตอนด้วย
        </p>
        
        <p>ในการคำนวณความเร็วการพิมพ์ จะมีคำศัพท์หลักๆ อยู่ 2 คำ ได้แก่:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Gross WPM (ความเร็วรวม):</strong> คำนวณจากจำนวนคำทั้งหมดที่พิมพ์ได้ใน 1 นาที โดยไม่ได้หักลบข้อผิดพลาด</li>
          <li><strong>Net WPM (ความเร็วสุทธิ):</strong> คือ Gross WPM ที่ถูกหักลบจำนวนคำที่พิมพ์ผิดและไม่ได้แก้ไขออกไปแล้ว นี่คือความเร็ว <em>ที่แท้จริงและใช้งานได้จริง</em> ของคุณ</li>
        </ul>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm border-l-4 border-teal-500">
          <p><strong>สูตรการคำนวณ:</strong></p>
          <p>Gross WPM = (จำนวนการกดแป้นทั้งหมด / 5) / นาที</p>
          <p>Net WPM = Gross WPM - (จำนวนคำที่ผิด / นาที)</p>
          <p>Accuracy (ความแม่นยำ) = ((คำทั้งหมด - คำที่ผิด) / คำทั้งหมด) x 100</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">เกณฑ์ความเร็วในการพิมพ์ทั่วไป</h3>
        <p>คุณอาจจะสงสัยว่าความเร็วในการพิมพ์ของคุณอยู่ในระดับไหน ลองเทียบกับเกณฑ์ค่าเฉลี่ยสากลได้ดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>ผู้เริ่มต้น / พิมพ์สัมผัสเบื้องต้น:</strong> 20 - 30 WPM</li>
          <li><strong>ผู้ใช้งานทั่วไป:</strong> 35 - 45 WPM (ค่าเฉลี่ยของคนส่วนใหญ่)</li>
          <li><strong>พนักงานออฟฟิศระดับโปร:</strong> 50 - 70 WPM</li>
          <li><strong>มืออาชีพ (เช่น นักข่าว, พนักงานคีย์ข้อมูล):</strong> 70 - 90 WPM</li>
          <li><strong>ระดับแข่งขัน (Typing Competitions):</strong> 100 - 150+ WPM</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ประโยชน์ของการรู้ความเร็วในการพิมพ์ (Productivity Estimation)</h3>
        <p>
          นอกจากไว้ใช้อวดเพื่อนๆ แล้ว การทราบ Net WPM ยังช่วยในการประเมินระยะเวลาการทำงานได้อีกด้วย ยกตัวอย่างเช่น หากคุณเป็นนักเขียนอิสระ หรือฟรีแลนซ์ที่รับจ้างพิมพ์งาน การทราบความเร็วของตนเองจะช่วยให้คุณตอบลูกค้าได้ว่าเอกสารขนาด 2,000 คำ คุณจะต้องใช้เวลานานเท่าใดในการพิมพ์ฉบับร่าง ซึ่งช่วยให้การวางแผนงาน (Time Management) แม่นยำขึ้นมาก ลดปัญหาการส่งงานล่าช้าได้อย่างเป็นรูปธรรม
        </p>
        <p>
          ฝึกพิมพ์สัมผัสเป็นประจำ และใช้เครื่องมือ <strong>คำนวณ WPM</strong> ของเราเพื่อติดตามความก้าวหน้า จำไว้ว่า <em>"ความแม่นยำต้องมาก่อนความเร็วเสมอ"</em> (Accuracy over Speed) เพราะการต้องกลับมาแก้ไขคำผิดบ่อยๆ จะทำให้ความเร็วสุทธิของคุณลดลงอย่างน่าตกใจ!
        </p>
      </article>
    </div>
  );
}
