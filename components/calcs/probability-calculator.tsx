import React, { useState } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, BarChart2 } from 'lucide-react';

export default function ProbabilityCalculator({ lang = 'TH' }: any) {
  const [favorable, setFavorable] = useState<string>('2');
  const [total, setTotal] = useState<string>('6');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>({
    probDecimal: 0.333333,
    probPercent: 33.3333,
    probFraction: '1/3',
    compDecimal: 0.666667,
    compPercent: 66.6667,
    compFraction: '2/3',
    oddsFor: '1 : 2',
    oddsAgainst: '2 : 1'
  });

  const getGcd = (a: number, b: number): number => {
    return b === 0 ? a : getGcd(b, a % b);
  };

  const calculateProbability = (fav: number, tot: number) => {
    if (isNaN(fav) || isNaN(tot)) {
      setError(lang === 'TH' ? 'กรุณากรอกตัวเลขให้ถูกต้อง' : 'Please enter valid numbers');
      return;
    }
    if (fav < 0 || tot <= 0) {
      setError(lang === 'TH' ? 'เหตุการณ์ที่สนใจต้องไม่ติดลบ และเหตุการณ์ทั้งหมดต้องมากกว่า 0' : 'Favorable outcomes must be >= 0 and total outcomes must be > 0');
      return;
    }
    if (fav > tot) {
      setError(lang === 'TH' ? 'จำนวนเหตุการณ์ที่สนใจห้ามมากกว่าจำนวนเหตุการณ์ทั้งหมด' : 'Favorable outcomes cannot exceed total outcomes');
      return;
    }

    setError('');

    const probDec = fav / tot;
    const probPct = probDec * 100;

    const compFav = tot - fav;
    const compDec = compFav / tot;
    const compPct = compDec * 100;

    // Fractions
    const gcdFav = getGcd(fav, tot);
    const simplifiedFav = fav / gcdFav;
    const simplifiedTot = tot / gcdFav;
    const fracStr = `${simplifiedFav}/${simplifiedTot}`;

    const gcdComp = getGcd(compFav, tot);
    const simplifiedComp = compFav / gcdComp;
    const simplifiedCompTot = tot / gcdComp;
    const compFracStr = `${simplifiedComp}/${simplifiedCompTot}`;

    // Odds
    const gcdOdds = getGcd(fav, compFav);
    const oddsForStr = compFav === 0 ? '1 : 0' : `${fav / gcdOdds} : ${compFav / gcdOdds}`;
    const oddsAgainstStr = fav === 0 ? '1 : 0' : `${compFav / gcdOdds} : ${fav / gcdOdds}`;

    setResult({
      probDecimal: probDec,
      probPercent: probPct,
      probFraction: fracStr,
      compDecimal: compDec,
      compPercent: compPct,
      compFraction: compFracStr,
      oddsFor: oddsForStr,
      oddsAgainst: oddsAgainstStr
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateProbability(parseInt(favorable), parseInt(total));
  };

  const handleReset = () => {
    setFavorable('2');
    setTotal('6');
    setError('');
    setResult({
      probDecimal: 0.333333,
      probPercent: 33.3333,
      probFraction: '1/3',
      compDecimal: 0.666667,
      compPercent: 66.6667,
      compFraction: '2/3',
      oddsFor: '1 : 2',
      oddsAgainst: '2 : 1'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            {lang === 'TH' ? 'เครื่องมือคำนวณความน่าจะเป็นเบื้องต้น (Probability)' : 'Basic Probability Calculator'}
          </h1>
        </div>
        <p className="mt-2 text-blue-100 text-sm md:text-base">
          {lang === 'TH'
            ? 'วิเคราะห์ความน่าจะเป็นของเหตุการณ์ โอกาสในการเกิดขึ้นในรูปแบบเศษส่วน ทศนิยม เปอร์เซ็นต์ และอัตราส่วนต่อรอง (Odds)'
            : 'Analyze probability of an event, displaying results as fractions, decimals, percentages, and odds.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'TH' ? 'กรอกข้อมูลเหตุการณ์' : 'Input Event Data'}
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนเหตุการณ์ที่สนใจ n(E)' : 'Number of favorable outcomes n(E)'}
              </label>
              <input
                type="number"
                min="0"
                value={favorable}
                onChange={(e) => setFavorable(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="เช่น 2"
                required
              />
              <span className="text-xs text-gray-400">
                {lang === 'TH' ? 'จำนวนผลลัพธ์ที่เป็นไปได้ตามเงื่อนไขที่ต้องการ' : 'Favorable outcomes matching the condition'}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === 'TH' ? 'จำนวนเหตุการณ์ทั้งหมด n(S)' : 'Total number of possible outcomes n(S)'}
              </label>
              <input
                type="number"
                min="1"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="เช่น 6"
                required
              />
              <span className="text-xs text-gray-400">
                {lang === 'TH' ? 'จำนวนผลลัพธ์ทั้งหมดในแซมเปิลสเปซ' : 'Total outcomes in the sample space'}
              </span>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-sm text-center"
              >
                {lang === 'TH' ? 'คำนวณ' : 'Calculate'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition duration-150 ease-in-out"
                title={lang === 'TH' ? 'ล้างค่า' : 'Reset'}
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Output Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 border-b pb-3 mb-4">
              <Info className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {lang === 'TH' ? 'ผลลัพธ์ความน่าจะเป็น P(E)' : 'Probability Results P(E)'}
              </h2>
            </div>

            {result !== null && !error ? (
              <div className="space-y-6">
                {/* Main probability display */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {lang === 'TH' ? 'เปอร์เซ็นต์ (%)' : 'Percentage'}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-blue-900">
                      {result.probPercent.toFixed(2)}%
                    </span>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {lang === 'TH' ? 'ทศนิยม' : 'Decimal'}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-blue-900">
                      {result.probDecimal.toFixed(4)}
                    </span>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {lang === 'TH' ? 'เศษส่วนอย่างต่ำ' : 'Fraction'}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-blue-900 font-mono">
                      {result.probFraction}
                    </span>
                  </div>
                </div>

                {/* Additional statistics */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 text-sm text-gray-700">
                  <h3 className="font-semibold text-gray-800 text-base mb-1">
                    {lang === 'TH' ? 'การวิเคราะห์และข้อมูลเชิงลึก:' : 'Detailed Statistics & Complementary Values:'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs md:text-sm">
                    <div>
                      <span className="text-gray-500 block">{lang === 'TH' ? 'โอกาสไม่เกิดขึ้น P(E\')' : 'Complement P(E\')'}</span>
                      <span className="font-semibold text-gray-900">{result.compFraction} ({result.compPercent.toFixed(2)}%)</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">{lang === 'TH' ? 'สูตรความน่าจะเป็น' : 'Formula Used'}</span>
                      <span className="font-semibold text-gray-900">P(E) = n(E) / n(S)</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">{lang === 'TH' ? 'อัตราส่วนต่อรองที่จะชนะ (Odds For)' : 'Odds For'}</span>
                      <span className="font-semibold text-emerald-600">{result.oddsFor}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">{lang === 'TH' ? 'อัตราส่วนต่อรองที่จะแพ้ (Odds Against)' : 'Odds Against'}</span>
                      <span className="font-semibold text-red-600">{result.oddsAgainst}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                {lang === 'TH' ? 'ป้อนค่า n(E) และ n(S) เพื่อคำนวณผลลัพธ์' : 'Enter values to see details'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thai SEO Article */}
      <article className="prose prose-blue max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-gray-800 space-y-6">
        <header className="border-b pb-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            ความน่าจะเป็นเบื้องต้น (Probability) คืออะไร? วิธีคำนวณแบบเข้าใจง่าย
          </h2>
          <p className="text-gray-500 text-sm">
            เจาะลึกทฤษฎีความน่าจะเป็นพื้นฐาน สูตรคำนวณเศษส่วน ทศนิยม เปอร์เซ็นต์ และการประยุกต์ใช้เพื่อวิเคราะห์โอกาส
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">1. ความน่าจะเป็น (Probability) คืออะไร?</h3>
          <p>
            ในทางคณิตศาสตร์ <strong>ความน่าจะเป็น (Probability)</strong> คือ ตัวเลขที่ระบุถึงโอกาสที่จะเกิดขึ้นของเหตุการณ์ใดเหตุการณ์หนึ่ง 
            ตัวเลขนี้จะมีค่าอยู่ระหว่าง 0 ถึง 1 เสมอ (หรือคิดเป็น 0% ถึง 100%) โดยมีความหมายดังนี้:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ค่าความน่าจะเป็นเท่ากับ 0 (หรือ 0%):</strong> หมายถึง เหตุการณ์นั้น <em>ไม่มีทางเกิดขึ้นอย่างแน่นอน (Impossible)</em> เช่น การทอดลูกเต๋า 6 หน้าแต่ได้เลข 8</li>
            <li><strong>ค่าความน่าจะเป็นเท่ากับ 1 (หรือ 100%):</strong> หมายถึง เหตุการณ์นั้น <em>จะเกิดขึ้นอย่างแน่นอน (Certain)</em> เช่น การหยิบได้ลูกบอลสีแดงจากกล่องที่มีเฉพาะลูกบอลสีแดง</li>
            <li><strong>ค่าความน่าจะเป็นอยู่ระหว่าง 0 ถึง 1:</strong> แสดงระดับความมีโอกาสเกิดขึ้นของเหตุการณ์ ยิ่งเข้าใกล้ 1 หรือ 100% มากขึ้น โอกาสเกิดขึ้นก็ยิ่งมีสูง</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">2. สูตรการหาค่าความน่าจะเป็นของเหตุการณ์</h3>
          <p>
            การคำนวณหาค่าความน่าจะเป็นของเหตุการณ์ในกรณีปกติ (Classical Probability) หาได้จากการนำจำนวนเหตุการณ์ที่เราสนใจ 
            หารด้วยจำนวนผลลัพธ์ที่เป็นไปได้ทั้งหมดในแซมเปิลสเปซ โดยตั้งสูตรดังนี้:
          </p>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center font-mono my-4">
            <span className="block text-lg font-bold text-blue-950">P(E) = n(E) / n(S)</span>
          </div>
          <p>
            โดยรายละเอียดสัญลักษณ์มีดังนี้:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>P(E)</strong> คือ ความน่าจะเป็นของเหตุการณ์ E (Probability of Event)</li>
            <li><strong>n(E)</strong> คือ จำนวนผลลัพธ์ในเหตุการณ์ที่เราให้ความสนใจ (Number of Favorable Outcomes)</li>
            <li><strong>n(S)</strong> คือ จำนวนผลลัพธ์ที่เป็นไปได้ทั้งหมดจากการทดลองสุ่ม (Total Outcomes in Sample Space)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">3. สถิติเพิ่มเติมที่เกี่ยวข้อง: Complement และ Odds</h3>
          <p>
            เมื่อศึกษาเรื่องความน่าจะเป็น จะมีอีกสองหัวข้อสำคัญที่ใช้ในการคิดคำนวณควบคู่กัน:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>เหตุการณ์ตรงกันข้าม หรือ Complement (P(E&apos;)):</strong> คือความน่าจะเป็นที่เหตุการณ์ที่เราสนใจ 
              จะไม่เกิดขึ้น คำนวณโดยใช้สมการ P(E&apos;) = 1 - P(E) ตัวอย่างเช่น โอกาสฝนตกคือ 30% โอกาสฝนไม่ตกก็จะเป็น 100% - 30% = 70%
            </li>
            <li>
              <strong>อัตราส่วนต่อรอง (Odds Ratio):</strong> เป็นอีกหนึ่งรูปแบบในการบ่งบอกโอกาสการชนะหรือแพ้ 
              <strong>Odds For</strong> คืออัตราส่วนระหว่างโอกาสเกิดต่อโอกาสไม่เกิด [n(E) : n(S) - n(E)] 
              ส่วน <strong>Odds Against</strong> คืออัตราส่วนระหว่างโอกาสไม่เกิดต่อโอกาสเกิด
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">4. ตัวอย่างการแก้โจทย์ความน่าจะเป็น</h3>
          <p className="font-semibold">โจทย์ตัวอย่าง: หยิบไพ่ 1 ใบออกจากสำรับไพ่มาตรฐาน (มี 52 ใบ) จงหาความน่าจะเป็นที่จะหยิบได้ไพ่หัวใจ (Heart)?</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <p><strong>วิธีทำ:</strong></p>
            <p>1. หาแซมเปิลสเปซ n(S): ไพ่ในสำรับมีทั้งหมด 52 ใบ ดังนั้น n(S) = 52</p>
            <p>2. หาจำนวนเหตุการณ์ที่สนใจ n(E): ไพ่หัวใจ (โพแดง) ในสำรับมีทั้งหมด 13 ใบ ดังนั้น n(E) = 13</p>
            <p>3. คำนวณความน่าจะเป็น:</p>
            <p className="font-mono">P(E) = n(E) / n(S)</p>
            <p className="font-mono">P(E) = 13 / 52</p>
            <p>ทอนเป็นเศษส่วนอย่างต่ำโดยการหารด้วย 13 ทั้งเศษและส่วน:</p>
            <p className="font-mono">P(E) = 1 / 4</p>
            <p>หากเขียนในรูปทศนิยมจะได้: 0.25 และเป็นเปอร์เซ็นต์คือ: 25%</p>
            <p><strong>คำตอบ:</strong> ความน่าจะเป็นที่จะสุ่มหยิบได้ไพ่โพแดงคิดเป็น 1/4 หรือ 25%</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">5. บทบาทของเครื่องคำนวณความน่าจะเป็นออนไลน์</h3>
          <p>
            ความน่าจะเป็นเป็นหัวข้อสำคัญในสาขาวิทยาศาสตร์ข้อมูล (Data Science) ประกันภัย การเงิน และสถิติการทดลองวิจัย 
            การใช้เครื่องคำนวณออนไลน์ช่วยให้คำนวณค่าต่างๆ ออกมาเป็นทั้งเปอร์เซ็นต์ ทศนิยม และเศษส่วนอย่างต่ำได้อย่างรวดเร็ว 
            รวมไปถึงการคำนวณค่าตรงกันข้าม (Complement) และอัตราส่วนต่อรอง (Odds) โดยไม่ต้องยุ่งยาก 
            ลดโอกาสคิดเลขผิดพลาดและเอื้อต่อการทบทวนตำราเรียนได้อย่างสะดวกสบาย
          </p>
        </section>
      </article>
    </div>
  );
}
