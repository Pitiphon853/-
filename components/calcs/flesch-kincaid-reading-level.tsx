"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Helper function to count syllables in a word
const countSyllables = (word: string) => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};

export default function FleschKincaidCalculator({ lang }: any) {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    sentences: 0,
    words: 0,
    syllables: 0,
    characters: 0,
  });
  const [scores, setScores] = useState({
    readingEase: 0,
    gradeLevel: 0,
  });

  const analyzeText = (inputText: string) => {
    if (!inputText.trim()) {
      setStats({ sentences: 0, words: 0, syllables: 0, characters: 0 });
      setScores({ readingEase: 0, gradeLevel: 0 });
      return;
    }

    // Rough sentence count (splitting by period, exclamation, question mark followed by space or end of string)
    const sentencesMatch = inputText.match(/[.!?]+(?:\s|$)/g);
    const sentences = sentencesMatch ? sentencesMatch.length : 1;

    // Word count
    const wordsMatch = inputText.match(/\b\w+\b/g);
    const wordsArray = wordsMatch || [];
    const words = wordsArray.length;

    // Syllable count
    let syllables = 0;
    wordsArray.forEach((word) => {
      syllables += countSyllables(word);
    });

    const characters = inputText.replace(/\s/g, '').length;

    setStats({
      sentences: sentences > 0 ? sentences : 1,
      words: words > 0 ? words : 1, // Avoid division by zero
      syllables,
      characters,
    });
  };

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  useEffect(() => {
    if (stats.words === 0) return;

    const wordsPerSentence = stats.words / stats.sentences;
    const syllablesPerWord = stats.syllables / stats.words;

    // Flesch Reading Ease Formula
    // 206.835 - 1.015(Total Words / Total Sentences) - 84.6(Total Syllables / Total Words)
    let readingEase = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
    
    // Flesch-Kincaid Grade Level Formula
    // 0.39(Total Words / Total Sentences) + 11.8(Total Syllables / Total Words) - 15.59
    let gradeLevel = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;

    setScores({
      readingEase: Math.max(0, Math.min(100, readingEase)), // Clamp between 0 and 100 for display normally, though it can go below/above
      gradeLevel: Math.max(0, gradeLevel),
    });
  }, [stats]);

  const getReadingEaseLabel = (score: number) => {
    if (score >= 90) return { label: 'Very Easy', color: 'text-green-500' };
    if (score >= 80) return { label: 'Easy', color: 'text-green-400' };
    if (score >= 70) return { label: 'Fairly Easy', color: 'text-yellow-400' };
    if (score >= 60) return { label: 'Standard', color: 'text-yellow-500' };
    if (score >= 50) return { label: 'Fairly Difficult', color: 'text-orange-500' };
    if (score >= 30) return { label: 'Difficult', color: 'text-red-400' };
    return { label: 'Very Confusing', color: 'text-red-600' };
  };

  const getGradeLevelDescription = (grade: number) => {
    if (grade < 5) return 'Kindergarten to 4th grade';
    if (grade < 7) return '5th to 6th grade (Easy to read)';
    if (grade < 9) return '7th to 8th grade (Conversational English)';
    if (grade < 11) return 'High School Freshman (Standard)';
    if (grade < 13) return 'High School Senior (Fairly difficult)';
    if (grade < 16) return 'College level (Difficult)';
    return 'College Graduate (Very difficult)';
  };

  const easeInfo = getReadingEaseLabel(scores.readingEase);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {lang === 'EN' ? 'Flesch-Kincaid Readability Calculator' : 'เครื่องมือคำนวณระดับการอ่าน Flesch-Kincaid'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'EN'
            ? 'Evaluate the readability and grade level of English text using the standard Flesch-Kincaid formula.'
            : 'ประเมินความยากง่ายในการอ่านข้อความภาษาอังกฤษด้วยสูตร Flesch-Kincaid แบบมาตรฐาน'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Area */}
        <div className="lg:col-span-2 space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {lang === 'EN' ? 'Paste your English text below:' : 'วางข้อความภาษาอังกฤษของคุณที่นี่:'}
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
            placeholder={lang === 'EN' ? 'Enter text here...' : 'พิมพ์หรือวางข้อความ...'}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
              <FileText className="w-4 h-4 text-indigo-500 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Words: <span className="text-gray-900 dark:text-white font-bold ml-1">{stats.words === 1 && text.trim() === '' ? 0 : stats.words}</span>
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Sentences: <span className="text-gray-900 dark:text-white font-bold ml-1">{stats.sentences === 1 && text.trim() === '' ? 0 : stats.sentences}</span>
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Syllables: <span className="text-gray-900 dark:text-white font-bold ml-1">{stats.syllables}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-indigo-200 dark:border-indigo-800 pb-3">
            {lang === 'EN' ? 'Readability Scores' : 'ผลคะแนนการอ่าน'}
          </h3>

          <div className="space-y-6">
            {/* Reading Ease */}
            <div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center justify-between">
                <span>Flesch Reading Ease</span>
                <span className={`text-sm font-bold ${easeInfo.color}`}>{easeInfo.label}</span>
              </div>
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {text.trim() ? scores.readingEase.toFixed(1) : '0.0'}
                <span className="text-lg text-gray-500 ml-1">/ 100</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3">
                <div 
                  className={`h-2.5 rounded-full ${text.trim() ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`} 
                  style={{ width: `${text.trim() ? Math.min(100, Math.max(0, scores.readingEase)) : 0}%` }}
                ></div>
              </div>
            </div>

            <hr className="border-indigo-200 dark:border-indigo-800" />

            {/* Grade Level */}
            <div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Flesch-Kincaid Grade Level
              </div>
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {text.trim() ? scores.gradeLevel.toFixed(1) : '0.0'}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {text.trim() ? getGradeLevelDescription(scores.gradeLevel) : '-'}
              </p>
            </div>
            
            {text.trim() && scores.gradeLevel > 12 && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg flex items-start text-sm mt-4 border border-red-200 dark:border-red-800">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>{lang === 'EN' ? 'This text is quite difficult to read. Consider using shorter sentences and simpler words for a general audience.' : 'ข้อความนี้ค่อนข้างอ่านยาก แนะนำให้ใช้ประโยคที่สั้นลงและคำศัพท์ที่ง่ายขึ้นสำหรับผู้อ่านทั่วไป'}</p>
              </div>
            )}
            
            {text.trim() && scores.gradeLevel <= 12 && scores.gradeLevel >= 7 && (
              <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg flex items-start text-sm mt-4 border border-green-200 dark:border-green-800">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>{lang === 'EN' ? 'Good readability! Your text is easily understandable by most adults.' : 'ความง่ายในการอ่านอยู่ในระดับดี! ข้อความของคุณสามารถเข้าใจได้ง่ายสำหรับผู้ใหญ่ส่วนมาก'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-16 prose prose-indigo max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ระดับการอ่าน Flesch-Kincaid คืออะไร? (Flesch-Kincaid Readability)
        </h2>
        <p>
          ในยุคที่ข้อมูลข่าวสารมีอยู่มากมายบนอินเทอร์เน็ต ความท้าทายหนึ่งของนักเขียน ครีเอเตอร์ และนักการตลาด คือการทำให้เนื้อหาของตน "อ่านง่าย" และ "เข้าใจได้ไว" การใช้ภาษาที่ซับซ้อนเกินความจำเป็นอาจทำให้ผู้อ่านหมดความสนใจและปิดหน้าเว็บไปอย่างรวดเร็ว (Bounce Rate สูง) ด้วยเหตุนี้จึงมีการใช้แบบทดสอบความยากง่ายในการอ่าน หรือที่เรียกว่า <strong>Flesch-Kincaid Readability Test</strong> มาช่วยประเมินคุณภาพของงานเขียน (โดยเฉพาะภาษาอังกฤษ)
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ดัชนี Flesch-Kincaid มี 2 รูปแบบหลัก</h3>
        
        <h4>1. Flesch Reading Ease (ความง่ายในการอ่าน)</h4>
        <p>
          คะแนนนี้จะอยู่ในช่วง 0 ถึง 100 โดยคะแนน <strong>ยิ่งสูง ยิ่งอ่านง่าย</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>90 - 100:</strong> อ่านง่ายมาก เข้าใจได้ระดับเด็กประถม (Very Easy)</li>
          <li><strong>60 - 70:</strong> ระดับมาตรฐานที่เหมาะสมกับผู้อ่านทั่วไป หรือนักเรียนมัธยมต้น (Standard)</li>
          <li><strong>0 - 30:</strong> อ่านยากมาก ต้องใช้สมาธิสูง มักพบในงานวิชาการ กฎหมาย หรือเอกสารทางเทคนิคระดับสูง (Very Confusing)</li>
        </ul>
        <p>
          สูตรการคำนวณใช้ตัวแปรหลัก 2 อย่างคือ <strong>ความยาวของประโยคเฉลี่ย</strong> (จำนวนคำต่อประโยค) และ <strong>ความยาวของคำเฉลี่ย</strong> (จำนวนพยางค์ต่อคำ)
        </p>

        <h4>2. Flesch-Kincaid Grade Level (ระดับชั้นการศึกษา)</h4>
        <p>
          คะแนนนี้จะแปลงผลลัพธ์ให้ออกมาเป็น "ระดับชั้นเรียนในระบบการศึกษาของสหรัฐอเมริกา" เช่น หากคะแนนออกมาเท่ากับ 8.0 หมายความว่าข้อความนั้นเหมาะสมกับนักเรียนเกรด 8 (เทียบเท่ามัธยมศึกษาปีที่ 2) ขึ้นไป หากเป้าหมายของคุณคือผู้อ่านทั่วไปในอินเทอร์เน็ต แนะนำให้เขียนเนื้อหาให้อยู่ในระดับเกรด 7-8 เพื่อการเข้าถึงที่กว้างที่สุด
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">ทำไม Readability จึงสำคัญต่อ SEO ?</h3>
        <p>
          Search Engine อย่าง Google ให้ความสำคัญกับ <strong>User Experience (ประสบการณ์ผู้ใช้)</strong> มากขึ้นเรื่อยๆ หากเนื้อหาของคุณอ่านยากเกินไป ผู้ใช้อาจจะอ่านไม่จบและกดกลับไปยังหน้าผลการค้นหาทันที ซึ่งเป็นการส่งสัญญาณเชิงลบให้แก่อัลกอริทึม การปรับปรุง Readability ให้ดีขึ้น จะช่วยเพิ่มระยะเวลาที่ผู้ใช้อยู่บนเว็บไซต์ (Time on Page) และลดอัตราการออก (Bounce Rate) ซึ่งส่งผลดีต่ออันดับ SEO โดยตรง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">เทคนิคในการปรับปรุงระดับการอ่าน</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>ใช้ประโยคที่สั้นลง:</strong> หลีกเลี่ยงการใช้ประโยคความซ้อนยาวๆ หากมีใจความหลายอย่างในประโยคเดียว ให้แบ่งเป็น 2-3 ประโยคย่อย</li>
          <li><strong>เลือกใช้คำศัพท์ที่เรียบง่าย:</strong> หากมีคำพ้องความหมาย (Synonym) ให้เลือกคำที่มีจำนวนพยางค์น้อยกว่าและเป็นที่รู้จักกว้างขวาง มากกว่าคำศัพท์เฉพาะทาง</li>
          <li><strong>ย่อหน้าสั้นๆ และมีหัวข้อ:</strong> แบ่งย่อหน้าให้ยาวไม่เกิน 3-4 บรรทัด และใช้ Bullet Points เพื่อทำให้การกวาดสายตา (Skimming) เป็นเรื่องง่าย</li>
        </ol>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-6 border-l-4 border-indigo-500">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>หมายเหตุ:</strong> เครื่องมือนี้อ้างอิงสูตรการนับคำและพยางค์โดยประมาณสำหรับ "ภาษาอังกฤษ" เป็นหลัก การนำข้อความภาษาอื่น (เช่น ภาษาไทย) มาวิเคราะห์ อาจได้ผลลัพธ์ที่ไม่ถูกต้องตามความตั้งใจของสูตรต้นฉบับ
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
