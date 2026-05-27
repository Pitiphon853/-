"use client";

import React from 'react';
import { Zap, PaintBucket, Wind, Cuboid, Hammer, Grid, Users, Droplet, MoveDiagonal } from 'lucide-react';
import { useLocalState, SEOFAQ, FAQItem } from './shared';
import { AdPlaceholder } from '../AdPlaceholder';

type Lang = any;

const inputClass = "w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-800 bg-white shadow-sm";
const labelClass = "block text-sm font-semibold text-amber-900 mb-2";
const cardClass = "bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-amber-100";
const resultClass = "mt-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-amber-900";

export function SolarPanelCalculator({ lang }: { lang: Lang }) {
    const [solarKwh, setSolarKwh] = useLocalState('calc2-solar-kwh', '500');
    const [solarWatt, setSolarWatt] = useLocalState('calc2-solar-watt', '550');
    const [solarHours, setSolarHours] = useLocalState('calc2-solar-hours', '4.5');

    const calcSolar = () => {
        const k = parseFloat(solarKwh)||0, w = parseFloat(solarWatt)||0, h = parseFloat(solarHours)||0;
        if(!k || !w || !h) return null;
        const cap = (k / 30) / h / 0.8;
        return { cap: cap.toFixed(2), panels: Math.ceil((cap * 1000) / w) };
    };

    const rSolar = calcSolar();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Zap className="text-amber-500" /> คำนวณแผงโซลาร์เซลล์ (Solar Panel Calculator)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>การใช้ไฟฟ้าต่อเดือน (Monthly kWh)</label>
                        <input type="number" className={inputClass} value={solarKwh} onChange={e => setSolarKwh(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>กำลังผลิตต่อแผง (Panel Wattage - W)</label>
                        <input type="number" className={inputClass} value={solarWatt} onChange={e => setSolarWatt(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ชั่วโมงแสงแดดเฉลี่ย (Peak Sun Hours)</label>
                        <input type="number" className={inputClass} value={solarHours} onChange={e => setSolarHours(e.target.value)} />
                    </div>
                </div>
                {rSolar && (
                    <div className={resultClass}>
                        <p className="text-lg">กำลังการผลิตติดตั้งที่ต้องการ: <strong className="text-2xl">{rSolar.cap} kW</strong></p>
                        <p className="text-lg">จำนวนแผงที่แนะนำ: <strong className="text-2xl">{rSolar.panels} แผง</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"มาตรฐานการออกแบบและติดตั้งระบบโซลาร์เซลล์มีอะไรบ้างและอ้างอิงจากแหล่งใด?":""} a={lang==="TH"?`การออกแบบและติดตั้งระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคา (Solar Rooftop) ต้องดำเนินการตามมาตรฐานวิศวกรรมที่เข้มงวดเพื่อความปลอดภัยและประสิทธิภาพสูงสุด ในประเทศไทย มาตรฐานหลักที่ใช้อ้างอิงคือ มาตรฐานการติดตั้งทางไฟฟ้าสำหรับประเทศไทย พ.ศ. 2564 (วสท. หรือ EIT Standard) ซึ่งครอบคลุมถึงการกำหนดขนาดสายไฟ อุปกรณ์ป้องกันกระแสเกิน และระบบสายดิน นอกจากนี้ยังมีมาตรฐานสากลเช่น IEEE 1547 ที่ว่าด้วยการเชื่อมต่อระบบผลิตไฟฟ้าแบบกระจายตัวเข้ากับโครงข่ายไฟฟ้า (Grid Interconnection) และมาตรฐาน NEC (National Electrical Code) Article 690 ที่เจาะจงเฉพาะเรื่องระบบโซลาร์เซลล์ การปฏิบัติตามมาตรฐานเหล่านี้ช่วยป้องกันอันตรายจากไฟฟ้าลัดวงจร ไฟไหม้ และการทำงานผิดปกติของอินเวอร์เตอร์ (Inverter) รวมไปถึงการคำนวณขนาดของแผง (PV Array Sizing) ที่ต้องพิจารณาปัจจัยด้านอุณหภูมิ (Temperature Coefficient) และแรงดันไฟฟ้าสูงสุดของระบบไม่ให้เกินขีดจำกัดของอุปกรณ์ ซึ่งเป็นหลักการทางวิศวกรรมไฟฟ้าที่สำคัญอย่างยิ่ง`:""} />
                    <FAQItem q={lang==="TH"?"การคำนวณหาจำนวนแผงโซลาร์เซลล์ที่เหมาะสมต้องพิจารณาปัจจัยทางวิศวกรรมอะไรบ้าง?":""} a={lang==="TH"?`การคำนวณจำนวนแผงโซลาร์เซลล์ไม่ได้พิจารณาแค่ความต้องการพลังงาน (kWh) ต่อเดือนเท่านั้น แต่ยังต้องคำนึงถึงความสูญเสียในระบบ (System Losses หรือ Derating Factors) ตามหลักวิศวกรรมพลังงาน ปัจจัยเหล่านี้ได้แก่ ประสิทธิภาพของอินเวอร์เตอร์ (Inverter Efficiency) ซึ่งมักอยู่ที่ประมาณ 95-98%, ความสูญเสียจากอุณหภูมิที่สูงขึ้น (Temperature Loss) เนื่องจากเมื่อแผงร้อนขึ้นแรงดันจะลดลงตามมาตรฐานการทดสอบ STC (Standard Test Conditions), ความสูญเสียจากฝุ่นละออง (Soiling Loss), และความสูญเสียในสายไฟ (Wiring Loss) ตามมาตรฐาน ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) มีการรวบรวมข้อมูลสภาพอากาศ (Weather Data) เพื่อหาค่าชั่วโมงแสงแดดเฉลี่ย (Peak Sun Hours) ซึ่งในประเทศไทยเฉลี่ยอยู่ที่ประมาณ 4.5 ถึง 5 ชั่วโมงต่อวัน ดังนั้นสมการในการคำนวณกำลังการผลิตติดตั้ง (kW) จึงต้องหารด้วยค่าประสิทธิภาพรวมของระบบ (Performance Ratio - PR) ซึ่งโดยทั่วไปวิศวกรจะประเมินไว้ที่ประมาณ 75% ถึง 80% เพื่อให้ได้ระบบที่สามารถผลิตไฟฟ้าได้เพียงพอต่อการใช้งานจริงในระยะยาว`:""} />
                    <FAQItem q={lang==="TH"?"ข้อควรระวังในการติดตั้งแผงโซลาร์เซลล์บนหลังคาตามมาตรฐานวิศวกรรมโครงสร้างคืออะไร?":""} a={lang==="TH"?`การติดตั้งแผงโซลาร์เซลล์บนหลังคาเป็นการเพิ่มน้ำหนักบรรทุกจร (Live Load) และน้ำหนักบรรทุกคงที่ (Dead Load) ให้กับโครงสร้างอาคาร ซึ่งต้องได้รับการประเมินและรับรองโดยวิศวกรโยธาตามมาตรฐานของวิศวกรรมสถานแห่งประเทศไทย (วสท.) และข้อกำหนดของกรมโยธาธิการและผังเมือง แผงโซลาร์เซลล์หนึ่งแผงมีน้ำหนักประมาณ 20-25 กิโลกรัม รวมกับอุปกรณ์จับยึด (Mounting Structure) ทำให้เกิดน้ำหนักเพิ่มขึ้นบนโครงหลังคา นอกจากนี้ยังต้องคำนวณแรงลม (Wind Load) ที่กระทำต่อแผงโซลาร์เซลล์ตามมาตรฐาน ASCE 7 (American Society of Civil Engineers) เนื่องจากแผงที่ติดตั้งแบบเอียงจะทำหน้าที่เสมือนใบเรือรับลม การคำนวณต้องตรวจสอบความสามารถในการรับแรงดึง (Pull-out Strength) ของสกรูยึดหลังคา โครงสร้างแป และโครงถัก (Truss) ว่าสามารถทนต่อแรงยก (Uplift Force) ในกรณีเกิดพายุลมแรงได้หรือไม่ การละเลยการตรวจสอบทางวิศวกรรมโครงสร้างอาจนำไปสู่ความเสียหายร้ายแรง เช่น หลังคาพังถล่ม หรือแผงปลิวหลุดจากหลังคา ซึ่งเป็นอันตรายต่อชีวิตและทรัพย์สิน`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function InteriorCostCalculator({ lang }: { lang: Lang }) {
    const [intArea, setIntArea] = useLocalState('calc2-int-area', '50');
    const [intGrade, setIntGrade] = useLocalState('calc2-int-grade', '18000');

    const calcInt = () => {
        const a = parseFloat(intArea)||0, g = parseFloat(intGrade)||0;
        if(!a || !g) return null;
        return { total: (a * g).toLocaleString() };
    };

    const rInt = calcInt();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <PaintBucket className="text-amber-500" /> ประเมินค่าตกแต่งภายใน (Interior Cost Estimate)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>พื้นที่ใช้สอย (ตารางเมตร)</label>
                        <input type="number" className={inputClass} value={intArea} onChange={e => setIntArea(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ระดับเกรดวัสดุและการออกแบบ</label>
                        <select className={inputClass} value={intGrade} onChange={e => setIntGrade(e.target.value)}>
                            <option value="12000">Economy (ประมาณ 12,000 บาท/ตร.ม.)</option>
                            <option value="18000">Standard (ประมาณ 18,000 บาท/ตร.ม.)</option>
                            <option value="25000">Premium (ประมาณ 25,000 บาท/ตร.ม.)</option>
                            <option value="40000">Luxury (เริ่มต้น 40,000 บาท/ตร.ม.)</option>
                        </select>
                    </div>
                </div>
                {rInt && (
                    <div className={resultClass}>
                        <p className="text-lg">งบประมาณตกแต่งภายในเบื้องต้น: <strong className="text-2xl">{rInt.total} บาท</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"การประเมินราคาค่าตกแต่งภายในมีมาตรฐานวิชาชีพหรือหลักการทางสถาปัตยกรรมที่ใช้อ้างอิงอย่างไร?":""} a={lang==="TH"?`การประเมินราคาค่าตกแต่งภายในในระดับวิชาชีพต้องอาศัยหลักเกณฑ์และมาตรฐานที่ได้รับการยอมรับ เช่น แนวทางปฏิบัติของสมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ (ASA - Association of Siamese Architects) ซึ่งมีการระบุวิธีการคำนวณค่าบริการวิชาชีพและการประเมินต้นทุนก่อสร้างเบื้องต้น การประมาณราคาแบ่งออกเป็นการประเมินแบบคร่าวๆ ตามพื้นที่ใช้สอย (Cost per Square Meter) และการประเมินแบบละเอียดด้วยบัญชีแสดงปริมาณวัสดุและราคา (Bill of Quantities - BOQ) การประเมินราคาต่อตารางเมตรเป็นวิธีที่ได้รับความนิยมในขั้นตอน Conceptual Design เพื่อตั้งงบประมาณโครงการ โดยแบ่งระดับความพรีเมียมของวัสดุ (Grade) เช่น ระดับมาตรฐาน (Standard) ระดับพรีเมียม (Premium) และระดับหรูหรา (Luxury) ซึ่งแต่ละระดับจะมีต้นทุนวัสดุปิดผิว (Finishing Materials) งานระบบไฟฟ้าแสงสว่าง และงานระบบปรับอากาศที่แตกต่างกันอย่างมีนัยสำคัญตามหลักการประเมินราคาทางวิศวกรรมสถาปัตยกรรม`:""} />
                    <FAQItem q={lang==="TH"?"ปัจจัยที่มีผลต่อความผันผวนของราคาค่าตกแต่งภายในในเชิงวิศวกรรมวัสดุศาสตร์มีอะไรบ้าง?":""} a={lang==="TH"?`ราคาค่าตกแต่งภายในมีความผันผวนขึ้นอยู่กับการเลือกใช้วัสดุตามหลักวิศวกรรมวัสดุศาสตร์ (Materials Science Engineering) ตัวอย่างเช่น การเลือกใช้วัสดุดูดซับเสียงที่ต้องผ่านมาตรฐาน ค่า STC (Sound Transmission Class) หรือ NRC (Noise Reduction Coefficient) สำหรับห้องประชุมหรือโฮมเธียเตอร์ จะทำให้ต้นทุนสูงขึ้น วัสดุป้องกันไฟลามที่ต้องเป็นไปตามมาตรฐาน NFPA 101 (Life Safety Code) หรือมาตรฐาน ASTM สำหรับการทนไฟและการปล่อยสารระเหยอินทรีย์ (VOCs Emissions) ต่ำเพื่อคุณภาพอากาศภายในอาคาร (IAQ) นอกจากนี้ ระบบแสงสว่างที่ออกแบบตามมาตรฐาน IESNA (Illuminating Engineering Society of North America) ที่เน้นความสบายตา (Visual Comfort) และการประหยัดพลังงานด้วยระบบควบคุมอัตโนมัติ ล้วนเป็นปัจจัยทางวิศวกรรมที่สะท้อนออกมาในรูปแบบของต้นทุนที่เพิ่มขึ้นเมื่อเทียบกับการใช้วัสดุเกรดประหยัด`:""} />
                    <FAQItem q={lang==="TH"?"การจัดการงบประมาณตามหลักการบริหารโครงการวิศวกรรม (Engineering Project Management) สำหรับงานตกแต่งภายในควรทำอย่างไร?":""} a={lang==="TH"?`การบริหารจัดการงบประมาณตกแต่งภายในเพื่อให้ไม่เกิดปัญหางบปานปลาย จำเป็นต้องประยุกต์ใช้หลักการบริหารโครงการวิศวกรรมตามมาตรฐาน PMBOK (Project Management Body of Knowledge) โดยเฉพาะอย่างยิ่งการบริหารต้นทุนโครงการ (Project Cost Management) เริ่มตั้งแต่การจัดทำ Cost Baseline การเผื่องบประมาณสำรองฉุกเฉิน (Contingency Reserve) ประมาณ 5-10% ของมูลค่าโครงการเพื่อรองรับความเสี่ยงที่มองไม่เห็น (Unforeseen Conditions) เช่น การแก้ไขระบบท่อประปาหรือระบบไฟฟ้าเดิมที่ซ่อนอยู่ในผนัง นอกจากนี้ยังควรใช้วิธีการวิศวกรรมคุณค่า (Value Engineering - VE) ซึ่งเป็นกระบวนการวิเคราะห์ฟังก์ชันการใช้งานของวัสดุและอุปกรณ์ต่างๆ เพื่อหาวิธีลดต้นทุนโดยไม่ลดทอนคุณภาพ ความสวยงาม และความปลอดภัย การพิจารณาต้นทุนตลอดอายุการใช้งาน (Life Cycle Costing) ก็เป็นอีกหนึ่งกลยุทธ์สำคัญในการเลือกใช้วัสดุที่มีความทนทานและการบำรุงรักษาต่ำในระยะยาว`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function AchVentilationCalculator({ lang }: { lang: Lang }) {
    const [achCfm, setAchCfm] = useLocalState('calc2-ach-cfm', '100');
    const [achW, setAchW] = useLocalState('calc2-ach-w', '4');
    const [achL, setAchL] = useLocalState('calc2-ach-l', '5');
    const [achH, setAchH] = useLocalState('calc2-ach-h', '2.8');

    const calcAch = () => {
        const c = parseFloat(achCfm)||0, w = parseFloat(achW)||0, l = parseFloat(achL)||0, h = parseFloat(achH)||0;
        if(!c || !w || !l || !h) return null;
        const vol = (w * l * h) * 35.3147;
        return { ach: ((c * 60) / vol).toFixed(2), vol: vol.toFixed(2) };
    };

    const rAch = calcAch();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Wind className="text-amber-500" /> คำนวณอัตราการหมุนเวียนอากาศ (ACH)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className={labelClass}>ปริมาณลมพัดลม (CFM)</label>
                        <input type="number" className={inputClass} value={achCfm} onChange={e => setAchCfm(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความกว้างห้อง (ม.)</label>
                        <input type="number" className={inputClass} value={achW} onChange={e => setAchW(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความยาวห้อง (ม.)</label>
                        <input type="number" className={inputClass} value={achL} onChange={e => setAchL(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความสูงห้อง (ม.)</label>
                        <input type="number" className={inputClass} value={achH} onChange={e => setAchH(e.target.value)} />
                    </div>
                </div>
                {rAch && (
                    <div className={resultClass}>
                        <p className="text-lg">ปริมาตรห้อง: <strong className="text-xl">{rAch.vol} ลูกบาศก์ฟุต (Cubic Feet)</strong></p>
                        <p className="text-lg mt-2">อัตราการหมุนเวียนอากาศ: <strong className="text-2xl text-amber-600">{rAch.ach} รอบต่อชั่วโมง (ACH)</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"มาตรฐาน ASHRAE 62.1 กำหนดอัตราการระบายอากาศ (Air Changes per Hour - ACH) ไว้อย่างไรสำหรับอาคารแต่ละประเภท?":""} a={lang==="TH"?`มาตรฐาน ASHRAE Standard 62.1 (Ventilation for Acceptable Indoor Air Quality) เป็นมาตรฐานสากลที่วิศวกรปรับอากาศทั่วโลกใช้อ้างอิงในการออกแบบระบบระบายอากาศ มาตรฐานนี้กำหนดอัตราการระบายอากาศขั้นต่ำที่ต้องการเพื่อคุณภาพอากาศภายในอาคาร (IAQ) ที่ดี โดยไม่ได้ระบุเพียงแค่ค่า ACH (Air Changes per Hour) เท่านั้น แต่ยังกำหนดในรูปแบบของ CFM ต่อตารางฟุต (พื้นที่) และ CFM ต่อคน (จำนวนผู้อาศัย) เช่น ห้องเรียน ห้องประชุม หรือโรงพยาบาล จะมีข้อกำหนดการระบายอากาศที่สูงกว่าห้องทำงานทั่วไป การคำนวณค่า ACH อย่างถูกต้อง (ACH = CFM x 60 / ปริมาตรห้อง) จึงเป็นสิ่งจำเป็นเพื่อตรวจสอบว่าระบบสามารถดึงอากาศบริสุทธิ์ (Outdoor Air) เข้ามาเจือจางมลพิษทางอากาศ คาร์บอนไดออกไซด์ (CO2) และสารอินทรีย์ระเหยง่าย (VOCs) ได้เพียงพอตามที่วิศวกรรมปรับอากาศ (HVAC Engineering) กำหนดไว้หรือไม่`:""} />
                    <FAQItem q={lang==="TH"?"การคำนวณหาค่า CFM จากปริมาตรห้องตามหลักการวิศวกรรมปรับอากาศมีความสำคัญอย่างไรต่อสุขภาพและประสิทธิภาพการใช้พลังงาน?":""} a={lang==="TH"?`ในทางวิศวกรรมปรับอากาศ (Air-Conditioning Engineering) การคำนวณหาอัตราการไหลของอากาศ (CFM - Cubic Feet per Minute) ที่เหมาะสมมีความสำคัญอย่างยิ่งต่อความสมดุลระหว่างสุขภาพของผู้ใช้อาคารและประสิทธิภาพการใช้พลังงาน หากระบบมีค่า ACH หรือ CFM ต่ำเกินไป (Under-ventilation) จะส่งผลให้เกิดปรากฏการณ์ตึกป่วย (Sick Building Syndrome - SBS) ผู้ใช้อาคารจะรู้สึกอึดอัด อ่อนเพลีย และประสิทธิภาพการทำงานลดลง ในทางกลับกัน หากมีการดูดอากาศเข้ามามากเกินไป (Over-ventilation) ระบบปรับอากาศจะต้องรับภาระความร้อนแฝง (Latent Heat) และความร้อนสัมผัส (Sensible Heat) จากอากาศภายนอกมากขึ้นอย่างมหาศาล ทำให้สิ้นเปลืองพลังงานไฟฟ้าเกินความจำเป็น การออกแบบที่ถูกต้องจึงต้องอ้างอิงข้อมูลด้าน Psychrometrics และมาตรฐานของวิศวกรรมสถานแห่งประเทศไทย (EIT Standard) เพื่อหาจุดที่เหมาะสมที่สุด (Optimization)`:""} />
                    <FAQItem q={lang==="TH"?"วิธีการวัดและทดสอบระบบระบายอากาศ (Testing, Adjusting, and Balancing - TAB) เพื่อให้ได้ค่า ACH ตามที่คำนวณไว้ทำได้อย่างไร?":""} a={lang==="TH"?`หลังจากการติดตั้งระบบระบายอากาศเสร็จสิ้น ขั้นตอนทางวิศวกรรมที่ขาดไม่ได้คือการทดสอบ ปรับแต่ง และสร้างสมดุล (TAB - Testing, Adjusting, and Balancing) ซึ่งต้องดำเนินการตามมาตรฐานขององค์กรวิชาชีพ เช่น NEBB (National Environmental Balancing Bureau) หรือ AABC (Associated Air Balance Council) วิศวกรจะใช้เครื่องมือวัดความเร็วลมและปริมาตรลม เช่น Balometer หรือ Anemometer ในการวัดลมที่จ่ายออกจากหน้ากากแอร์ (Diffuser) หรือช่องดูดอากาศ (Return/Exhaust Grille) นำค่าปริมาตรลม (CFM) ที่วัดได้จริงมาคำนวณกลับหาค่า ACH เพื่อเปรียบเทียบกับค่าการออกแบบ (Design Values) นอกจากนี้ยังต้องมีการทดสอบการรั่วไหลของท่อลม (Duct Leakage Testing) ตามมาตรฐาน SMACNA เพื่อให้มั่นใจว่าอากาศไม่สูญเสียไประหว่างทาง และระบบทำงานได้อย่างมีประสิทธิภาพสูงสุดตามหลักพลศาสตร์ของไหล (Fluid Dynamics)`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function ConcreteVolumeCalculator({ lang }: { lang: Lang }) {
    const [conW, setConW] = useLocalState('calc2-con-w', '4');
    const [conL, setConL] = useLocalState('calc2-con-l', '5');
    const [conT, setConT] = useLocalState('calc2-con-t', '0.15');

    const calcCon = () => {
        const w = parseFloat(conW)||0, l = parseFloat(conL)||0, t = parseFloat(conT)||0;
        if(!w || !l || !t) return null;
        const v = w * l * t;
        return { v: v.toFixed(2), t: (v * 1.05).toFixed(2) };
    };

    const rCon = calcCon();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Cuboid className="text-amber-500" /> คำนวณปริมาตรคอนกรีต (Concrete Volume m³)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>ความกว้าง (ม.)</label>
                        <input type="number" className={inputClass} value={conW} onChange={e => setConW(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความยาว (ม.)</label>
                        <input type="number" className={inputClass} value={conL} onChange={e => setConL(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความหนา (ม.)</label>
                        <input type="number" className={inputClass} value={conT} onChange={e => setConT(e.target.value)} />
                    </div>
                </div>
                {rCon && (
                    <div className={resultClass}>
                        <p className="text-lg">ปริมาตรสุทธิ: <strong className="text-xl">{rCon.v} m³ (คิว)</strong></p>
                        <p className="text-lg mt-2">ปริมาตรสั่งเผื่อสูญเสีย (Waste +5%): <strong className="text-2xl text-amber-600">{rCon.t} m³ (คิว)</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"การคำนวณปริมาตรคอนกรีตและการเผื่อความสูญเสีย (Waste Margin) ตามมาตรฐานวิศวกรรมก่อสร้างมีหลักเกณฑ์อย่างไร?":""} a={lang==="TH"?`ในการประเมินปริมาณคอนกรีตสำหรับงานก่อสร้าง หลักการวิศวกรรมประเมินราคา (Cost Engineering) กำหนดให้ต้องมีการเผื่อความสูญเสีย (Waste Margin) เพื่อชดเชยปัจจัยความคลาดเคลื่อนที่หลีกเลี่ยงไม่ได้ในหน้างานก่อสร้าง สาเหตุหลักมาจากความไม่สม่ำเสมอของระดับดินเดิม (Subgrade Irregularities) การปูดบวมของไม้แบบ (Formwork Bulging) อันเกิดจากแรงดันด้านข้างของคอนกรีตเหลว และคอนกรีตที่ติดค้างในรถโม่หรือปั๊มคอนกรีต โดยทั่วไป มาตรฐานการก่อสร้างจะแนะนำให้เผื่อปริมาตรคอนกรีตไว้ประมาณ 5% ถึง 10% ของปริมาตรที่คำนวณได้ตามแบบ (Theoretical Volume) การไม่เผื่อปริมาณคอนกรีตอาจทำให้คอนกรีตขาดระหว่างการเท ส่งผลให้เกิดรอยต่อเย็น (Cold Joint) ซึ่งทำให้ความแข็งแรงของโครงสร้างลดลงอย่างมีนัยสำคัญและขัดต่อมาตรฐานการออกแบบโครงสร้าง ACI 318`:""} />
                    <FAQItem q={lang==="TH"?"มาตรฐาน ACI 318 และมาตรฐาน วสท. (EIT) กำหนดคุณสมบัติและกำลังอัดของคอนกรีต (Compressive Strength) ไว้อย่างไรบ้าง?":""} a={lang==="TH"?`การเลือกใช้คอนกรีตผสมเสร็จไม่ได้ดูแค่ปริมาตรเท่านั้น แต่ต้องระบุกำลังอัด (Compressive Strength) ให้ถูกต้องตามการออกแบบของวิศวกรโครงสร้าง มาตรฐาน ACI 318 (American Concrete Institute) และมาตรฐานของวิศวกรรมสถานแห่งประเทศไทย (วสท.) กำหนดให้ต้องมีการทดสอบกำลังอัดของคอนกรีตที่อายุ 28 วัน โดยใช้ก้อนตัวอย่างทรงกระบอก (Cylinder) หรือทรงลูกบาศก์ (Cube) การออกแบบส่วนผสม (Mix Design) ต้องพิจารณาอัตราส่วนน้ำต่อซีเมนต์ (W/C Ratio) เพื่อควบคุมความพรุนและความทนทานของคอนกรีต นอกจากนี้ยังต้องทดสอบค่าความยุบตัว (Slump Test) ก่อนเทเพื่อประเมินความสามารถในการทำงานได้ (Workability) ของคอนกรีต หากคอนกรีตมีค่ายุบตัวไม่ผ่านเกณฑ์ ห้ามมิให้มีการเติมน้ำที่หน้างานอย่างเด็ดขาด เพราะจะทำให้กำลังอัดลดลงและเกิดการแตกร้าวจากการหดตัว (Shrinkage Cracks)`:""} />
                    <FAQItem q={lang==="TH"?"ผลกระทบทางวิศวกรรมหากคำนวณปริมาตรคอนกรีตผิดพลาดและมีการเทคอนกรีตไม่ต่อเนื่อง (Cold Joint) จะแก้ไขอย่างไร?":""} a={lang==="TH"?`หากการคำนวณปริมาตรคอนกรีตผิดพลาดจนทำให้คอนกรีตหมดระหว่างการเทโครงสร้างหลัก เช่น คาน หรือพื้น จะทำให้เกิดรอยต่อที่เรียกว่า Cold Joint ซึ่งเป็นจุดอ่อนที่วิกฤตที่สุดในทางวิศวกรรมโครงสร้าง รอยต่อนี้จะไม่สามารถรับแรงเฉือน (Shear Force) และแรงดัด (Bending Moment) ได้ตามที่ออกแบบไว้ การแก้ไขปัญหาเฉพาะหน้าต้องปฏิบัติตามมาตรฐาน ACI 301 (Specifications for Structural Concrete) โดยวิศวกรควบคุมงานต้องกำหนดตำแหน่งรอยต่อก่อสร้าง (Construction Joint) ให้อยู่ในบริเวณที่มีแรงเฉือนต่ำที่สุด (เช่น บริเวณกึ่งกลางช่วงคาน) การเทคอนกรีตในครั้งต่อไปจะต้องทำการสกัดผิวหน้าคอนกรีตเดิมให้หยาบ ทำความสะอาด และทาน้ำยาประสานคอนกรีต (Bonding Agent) ก่อนเทคอนกรีตใหม่ เพื่อให้เกิดการถ่ายเทแรงสถิตยศาสตร์ (Static Force Transfer) อย่างสมบูรณ์`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function RebarWeightCalculator({ lang }: { lang: Lang }) {
    const [rebarD, setRebarD] = useLocalState('calc2-rebar-d', '12');
    const [rebarL, setRebarL] = useLocalState('calc2-rebar-l', '10');
    const [rebarQ, setRebarQ] = useLocalState('calc2-rebar-q', '100');

    const calcRebar = () => {
        const d = parseFloat(rebarD)||0, l = parseFloat(rebarL)||0, q = parseFloat(rebarQ)||0;
        if(!d || !l || !q) return null;
        const wpm = (d * d) / 162;
        return { wpm: wpm.toFixed(3), tw: (wpm * l * q).toFixed(2) };
    };

    const rRebar = calcRebar();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Hammer className="text-amber-500" /> คำนวณน้ำหนักเหล็กเสริม (Rebar Weight)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>ขนาดเส้นผ่านศูนย์กลาง (มม.)</label>
                        <input type="number" className={inputClass} value={rebarD} onChange={e => setRebarD(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความยาวต่อเส้น (ม.)</label>
                        <input type="number" className={inputClass} value={rebarL} onChange={e => setRebarL(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>จำนวนเส้น</label>
                        <input type="number" className={inputClass} value={rebarQ} onChange={e => setRebarQ(e.target.value)} />
                    </div>
                </div>
                {rRebar && (
                    <div className={resultClass}>
                        <p className="text-lg">น้ำหนักต่อเมตร: <strong className="text-xl">{rRebar.wpm} กก./ม.</strong></p>
                        <p className="text-lg mt-2">น้ำหนักรวม: <strong className="text-2xl text-amber-600">{rRebar.tw} กิโลกรัม (kg)</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"วิธีการคำนวณน้ำหนักเหล็กเสริมตามมาตรฐานและสมการที่ใช้อ้างอิงจากหลักการทางวิศวกรรมคืออะไร?":""} a={lang==="TH"?`การคำนวณน้ำหนักของเหล็กเสริม (Rebar) ในงานวิศวกรรมก่อสร้างอ้างอิงจากความหนาแน่นของเหล็ก (Density of Steel) ซึ่งมีค่ามาตรฐานอยู่ที่ 7,850 กิโลกรัมต่อลูกบาศก์เมตร สมการที่วิศวกรนิยมใช้ในการหาค่าประมาณน้ำหนักเหล็กต่อความยาวหนึ่งเมตรคือ W = (D^2) / 162 โดยที่ D คือเส้นผ่านศูนย์กลางของเหล็กในหน่วยมิลลิเมตร สมการนี้เกิดจากการคำนวณพื้นที่หน้าตัดของเหล็กทรงกระบอก (πD^2/4) คูณด้วยความยาว 1 เมตรและคูณด้วยความหนาแน่น 7,850 kg/m³ ซึ่งเมื่อปรับรูปสมการทางคณิตศาสตร์แล้วจะได้ตัวหารประมาณ 162 ค่านี้เป็นค่าคงที่ที่ใช้กันอย่างแพร่หลายในวงการวิศวกรรมโยธาและได้ผลลัพธ์ที่สอดคล้องกับมาตรฐานอุตสาหกรรม (มอก. 20 และ มอก. 24) ทั้งเหล็กเส้นกลม (Round Bar) และเหล็กข้ออ้อย (Deformed Bar)`:""} />
                    <FAQItem q={lang==="TH"?"ความสำคัญของการคำนวณน้ำหนักและปริมาณเหล็กเสริมในโครงสร้างคอนกรีตเสริมเหล็กตามมาตรฐาน ACI 318 คืออะไร?":""} a={lang==="TH"?`ในทางวิศวกรรมโครงสร้าง คอนกรีตรับแรงอัดได้ดีแต่รับแรงดึงได้น้อยมาก จึงต้องมีการเสริมเหล็กเพื่อรับแรงดึงแทน การคำนวณปริมาณเหล็กเสริมต้องเป็นไปตามมาตรฐาน ACI 318 ซึ่งกำหนดอัตราส่วนเหล็กเสริม (Reinforcement Ratio) ที่เหมาะสม การใส่เหล็กน้อยเกินไป (Under-reinforced) อาจทำให้โครงสร้างพังทลายอย่างกะทันหัน แต่การใส่เหล็กมากเกินไป (Over-reinforced) ก็เป็นอันตรายเช่นกัน เพราะโครงสร้างจะสูญเสียความเหนียว (Ductility) เมื่อเกิดพฤติกรรมวิบัติ คอนกรีตจะแตกสลายก่อนที่เหล็กจะยืดตัว ทำให้ผู้อาศัยไม่มีเวลาอพยพ ดังนั้นการคำนวณและประเมินปริมาณเหล็กด้วยความแม่นยำจึงไม่เพียงแต่ช่วยเรื่องการประมาณราคา แต่ยังเป็นการรับประกันความปลอดภัยของโครงสร้างต่อแผ่นดินไหว (Seismic Detailing) และแรงกระทำแบบพลศาสตร์อื่นๆ อีกด้วย`:""} />
                    <FAQItem q={lang==="TH"?"การเผื่อระยะทาบ (Lap Splice) และงอขอ (Hook) ในการคำนวณน้ำหนักเหล็กเสริมรวมมีมาตรฐานกำหนดไว้อย่างไร?":""} a={lang==="TH"?`การถอดแบบปริมาณเหล็กเสริม (Bar Cut List) ไม่สามารถคำนวณเพียงแค่ระยะตามเส้นตรงเท่านั้น แต่ต้องพิจารณาระยะทาบต่อ (Lap Splice) และระยะงอขอ (Standard Hooks) ซึ่งกินปริมาณเหล็กเพิ่มขึ้นอย่างมีนัยสำคัญ มาตรฐาน ACI 318 บทที่ 25 (Chapter 25: Reinforcement Details) กำหนดความยาวระยะฝัง (Development Length) และระยะทาบอย่างละเอียด ซึ่งขึ้นอยู่กับชนิดของคอนกรีต กำลังครากของเหล็ก (Yield Strength) และตำแหน่งของเหล็ก (เช่น เหล็กรับแรงดึงหรือเหล็กรับแรงอัด) ระยะทาบโดยทั่วไปมักคิดที่ประมาณ 40 เท่าของเส้นผ่านศูนย์กลาง (40D) สำหรับเหล็กรับแรงดึง การละเลยการเผื่อความยาวในส่วนเหล่านี้จะทำให้ปริมาณน้ำหนักเหล็กที่สั่งซื้อไม่เพียงพอต่อการก่อสร้าง และหากผู้รับเหมาลดระยะทาบเพื่อให้เหล็กพอใช้ จะส่งผลร้ายแรงต่อความแข็งแรงของจุดต่อ (Joints) ในโครงสร้างทันที`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function AacBlocksCalculator({ lang }: { lang: Lang }) {
    const [aacW, setAacW] = useLocalState('calc2-aac-w', '4');
    const [aacH, setAacH] = useLocalState('calc2-aac-h', '3');

    const calcAac = () => {
        const w = parseFloat(aacW)||0, h = parseFloat(aacH)||0;
        if(!w || !h) return null;
        const a = w * h;
        return { a: a.toFixed(2), b: Math.ceil(a * 8.33 * 1.05) };
    };

    const rAac = calcAac();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Grid className="text-amber-500" /> คำนวณอิฐมวลเบา (AAC Blocks)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>ความกว้างผนัง (ม.)</label>
                        <input type="number" className={inputClass} value={aacW} onChange={e => setAacW(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความสูงผนัง (ม.)</label>
                        <input type="number" className={inputClass} value={aacH} onChange={e => setAacH(e.target.value)} />
                    </div>
                </div>
                {rAac && (
                    <div className={resultClass}>
                        <p className="text-lg">พื้นที่ผนังรวม: <strong className="text-xl">{rAac.a} ตร.ม.</strong></p>
                        <p className="text-lg mt-2">จำนวนอิฐมวลเบาที่ใช้ (รวมเผื่อสูญเสีย 5%): <strong className="text-2xl text-amber-600">{rAac.b} ก้อน</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"มาตรฐานอุตสาหกรรม (มอก.) และมาตรฐานวิศวกรรมที่เกี่ยวข้องกับการใช้อิฐมวลเบา (AAC Blocks) มีอะไรบ้าง?":""} a={lang==="TH"?`อิฐมวลเบา (Autoclaved Aerated Concrete - AAC) เป็นวัสดุก่อสร้างที่ได้รับความนิยมอย่างสูงเนื่องจากมีน้ำหนักเบาและเป็นฉนวนกันความร้อนที่ดี ในประเทศไทย การผลิตและการใช้งานอิฐมวลเบาต้องเป็นไปตามมาตรฐานผลิตภัณฑ์อุตสาหกรรม มอก. 1505 (TIS 1505) ซึ่งครอบคลุมข้อกำหนดด้านกำลังอัด (Compressive Strength) ความหนาแน่น (Density) และการหดตัวจากการแห้ง (Drying Shrinkage) นอกจากนี้ ในระดับสากลยังอ้างอิงมาตรฐาน ASTM C1693 (Standard Specification for Autoclaved Aerated Concrete) คุณสมบัติทางฟิสิกส์เชิงวิศวกรรมที่สำคัญคือค่าการนำความร้อน (Thermal Conductivity) ที่ต่ำมาก ช่วยลดภาระการทำความเย็นของระบบปรับอากาศ และค่าพิกัดการทนไฟ (Fire Rating) ที่สามารถทนไฟได้นาน 2-4 ชั่วโมงตามความหนาของอิฐ ซึ่งเป็นไปตามกฎหมายควบคุมอาคารว่าด้วยความปลอดภัยด้านอัคคีภัย`:""} />
                    <FAQItem q={lang==="TH"?"การคำนวณหาจำนวนอิฐมวลเบาและปูนก่อปูนฉาบมีหลักการคำนวณเชิงปริมาณ (Quantity Surveying) อย่างไร?":""} a={lang==="TH"?`การถอดปริมาณงานสถาปัตยกรรม (Quantity Surveying) สำหรับผนังอิฐมวลเบานั้น อิงจากขนาดมาตรฐานของอิฐในท้องตลาดคือ กว้าง 20 ซม. ยาว 60 ซม. ซึ่งมีพื้นที่ต่อก้อนเท่ากับ 0.12 ตารางเมตร ดังนั้นในพื้นที่ผนัง 1 ตารางเมตร จะใช้อิฐจำนวนประมาณ 8.33 ก้อนเสมอ นอกเหนือจากจำนวนอิฐแล้ว ยังต้องคำนวณปริมาณปูนก่อมวลเบา (AAC Adhesive Mortar) ซึ่งใช้ความหนาเพียง 2-3 มิลลิเมตร และปูนฉาบสำหรับมวลเบา (AAC Plastering Mortar) ที่มีความหนาเฉลี่ย 10-15 มิลลิเมตรต่อด้าน ในทางวิศวกรรมประเมินราคา จะมีการเผื่อความสูญเสีย (Wastage) จากการตัดเศษอิฐและการแตกหักระหว่างการขนส่งไว้ที่ประมาณ 5% ของปริมาณทั้งหมด เพื่อให้มั่นใจว่างบประมาณและวัสดุเพียงพอต่อการดำเนินโครงการโดยไม่สะดุด`:""} />
                    <FAQItem q={lang==="TH"?"ข้อควรระวังในการออกแบบและก่อสร้างผนังอิฐมวลเบาตามหลักวิศวกรรมโครงสร้างคืออะไร?":""} a={lang==="TH"?`แม้ผนังอิฐมวลเบาจะไม่ได้ทำหน้าที่รับน้ำหนักบรรทุกหลักของอาคาร (Non-load Bearing Wall) แต่การออกแบบและก่อสร้างยังคงต้องปฏิบัติตามมาตรฐานวิศวกรรมโครงสร้างอย่างเคร่งครัด ผนังอิฐมวลเบามีความต้านทานแรงดึงต่ำ จึงเสี่ยงต่อการแตกร้าวจากการทรุดตัวแบบไม่เท่ากัน (Differential Settlement) หรือการแอ่นตัวของคานที่รองรับ (Beam Deflection) มาตรฐานของ วสท. (EIT) แนะนำให้มีการเทเอ็นคอนกรีตเสริมเหล็ก (Stiffener Columns and Beams) รัดรอบช่องเปิดของประตูหน้าต่าง และทับหลังทุกๆ ความสูง 2.5 ถึง 3.0 เมตร หรือพื้นที่ผนังเกิน 9-12 ตารางเมตร นอกจากนี้ยังต้องมีการติดตั้งลวดตาข่ายกรงไก่ (Wire Mesh) บริเวณรอยต่อระหว่างวัสดุต่างชนิดและการเซาะร่อง (Control Joint) เพื่อป้องกันปัญหาผนังแตกร้าวลายงา (Hairline Cracks) ที่ส่งผลต่อความสวยงามและการซึมผ่านของน้ำ`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function LaborCostCalculator({ lang }: { lang: Lang }) {
    const [labArea, setLabArea] = useLocalState('calc2-lab-area', '100');
    const [labRate, setLabRate] = useLocalState('calc2-lab-rate', '300');

    const calcLab = () => {
        const a = parseFloat(labArea)||0, r = parseFloat(labRate)||0;
        if(!a || !r) return null;
        return { t: (a * r).toLocaleString() };
    };

    const rLab = calcLab();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Users className="text-amber-500" /> คำนวณค่าแรงงานต่อตารางเมตร (Labor Cost/sqm)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>ปริมาณพื้นที่งาน (ตร.ม.)</label>
                        <input type="number" className={inputClass} value={labArea} onChange={e => setLabArea(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>อัตราค่าแรง (บาท/ตร.ม.)</label>
                        <input type="number" className={inputClass} value={labRate} onChange={e => setLabRate(e.target.value)} />
                    </div>
                </div>
                {rLab && (
                    <div className={resultClass}>
                        <p className="text-lg">รวมค่าแรงงาน: <strong className="text-2xl">{rLab.t} บาท</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"หลักเกณฑ์การประเมินราคาค่าแรงงานต่อตารางเมตรในงานก่อสร้างและมาตรฐานการจัดการต้นทุนโครงการวิศวกรรมคืออะไร?":""} a={lang==="TH"?`การประเมินค่าแรงงานในงานก่อสร้างอ้างอิงจากหลักการจัดการต้นทุนโครงการวิศวกรรม (Engineering Project Cost Management) ซึ่งมีทั้งต้นทุนทางตรง (Direct Labor Cost) และต้นทุนทางอ้อม (Indirect Labor Cost) ในประเทศไทย การประเมินค่าแรงมักอ้างอิงบัญชีราคามาตรฐานค่าแรงงานของกรมบัญชีกลาง หรือราคากลางที่สมาคมวิศวกรรมสถานแห่งประเทศไทย (วสท.) และสมาคมสถาปนิกสยามฯ แนะนำ การคิดค่าแรงต่อตารางเมตรเป็นวิธีที่สะดวกรวดเร็วสำหรับการประเมินราคางานสถาปัตยกรรม เช่น งานปูกระเบื้อง งานทาสี หรืองานฝ้าเพดาน อย่างไรก็ตาม ตัวเลขเหล่านี้เป็นเพียงค่าเฉลี่ยทางสถิติ (Statistical Average) วิศวกรประเมินราคาต้องปรับปรุงตัวเลขนี้โดยคำนึงถึงความซับซ้อนของรูปแบบงาน (Design Complexity) ความยากง่ายในการเข้าถึงพื้นที่ (Site Accessibility) และข้อจำกัดด้านเวลาในการทำงานเพื่อความแม่นยำสูงสุด`:""} />
                    <FAQItem q={lang==="TH"?"ปัจจัยที่ส่งผลกระทบต่อประสิทธิภาพการทำงาน (Productivity) และค่าแรงงานในการก่อสร้างมีอะไรบ้างตามหลักวิศวกรรมอุตสาหการ?":""} a={lang==="TH"?`การวิเคราะห์ประสิทธิภาพการทำงานในสถานที่ก่อสร้างสามารถอธิบายได้ด้วยหลักวิศวกรรมอุตสาหการ (Industrial Engineering) โดยเฉพาะการศึกษาเวลาและการเคลื่อนไหว (Time and Motion Study) ปัจจัยที่ทำให้ค่าแรงงานผันผวน ได้แก่ สภาพภูมิอากาศ (Weather Conditions) เช่น ฝนตกหนักหรือความร้อนจัดที่ทำให้คนงานเหนื่อยล้าเร็วขึ้น การจัดการโลจิสติกส์ในหน่วยงานก่อสร้าง (Site Logistics) หากจุดกองเก็บวัสดุอยู่ไกลจากจุดทำงาน จะทำให้สูญเสียเวลาและพลังงานในการขนย้าย (Handling Loss) นอกจากนี้ อัตราการเรียนรู้ (Learning Curve) ของทีมช่างก็มีผลอย่างยิ่ง ช่างที่มีความชำนาญสูงจะใช้เวลาน้อยกว่าในการทำผลงานที่มีคุณภาพสูงกว่า ดังนั้น วิศวกรบริหารโครงการจึงต้องให้ความสำคัญกับหลักสรีรศาสตร์ (Ergonomics) และการวางแผนลำดับงาน (Workflow) เพื่อเพิ่มผลิตภาพและควบคุมต้นทุนค่าแรง`:""} />
                    <FAQItem q={lang==="TH"?"วิธีการคำนวณและการจัดสรรบุคลากรในโครงการวิศวกรรม (Resource Leveling) เพื่อควบคุมต้นทุนค่าแรงให้เป็นไปตามงบประมาณทำได้อย่างไร?":""} a={lang==="TH"?`เพื่อไม่ให้ต้นทุนค่าแรงงานเกินงบประมาณที่วางไว้ ผู้จัดการโครงการก่อสร้างจะต้องใช้วิธีการจัดตารางเวลาเครือข่ายวิกฤต (Critical Path Method - CPM) ร่วมกับการจัดการทรัพยากร (Resource Allocation and Leveling) การคำนวณหาระยะเวลาและจำนวนคนงานที่เหมาะสมจะช่วยลดปัญหาการจ้างแรงงานมากเกินความจำเป็นในบางช่วงเวลา (Peaks) หรือการปล่อยให้คนงานว่างงาน (Idle Time) ในช่วงที่รองานก่อนหน้าเสร็จสมบูรณ์ นอกจากนี้ การนำระบบการจัดการมูลค่าที่ได้รับ (Earned Value Management - EVM) มาประยุกต์ใช้เพื่อติดตามผลการทำงานของแรงงานอย่างต่อเนื่อง เปรียบเทียบต้นทุนแรงงานที่ใช้ไปจริง (Actual Cost) กับปริมาณงานที่ทำเสร็จจริง (Earned Value) จะทำให้วิศวกรสามารถวิเคราะห์และพยากรณ์ความเสี่ยงด้านค่าแรงล่วงหน้าและดำเนินการแก้ไข (Corrective Actions) ได้ทันท่วงที`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function PlumbingPipeCalculator({ lang }: { lang: Lang }) {
    const [plumL, setPlumL] = useLocalState('calc2-plum-l', '50');
    const [plumP, setPlumP] = useLocalState('calc2-plum-p', '40');
    const [plumF, setPlumF] = useLocalState('calc2-plum-f', '20');
    const [plumFP, setPlumFP] = useLocalState('calc2-plum-fp', '15');

    const calcPlum = () => {
        const l = parseFloat(plumL)||0, p = parseFloat(plumP)||0, f = parseFloat(plumF)||0, fp = parseFloat(plumFP)||0;
        if(!l || !p) return null;
        return { t: ((l * p) + (f * fp)).toLocaleString() };
    };

    const rPlum = calcPlum();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <Droplet className="text-amber-500" /> คำนวณท่อประปาและข้อต่อ (Plumbing Pipe)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className={labelClass}>ความยาวท่อรวม (ม.)</label>
                        <input type="number" className={inputClass} value={plumL} onChange={e => setPlumL(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ราคาต่อเมตร (บาท)</label>
                        <input type="number" className={inputClass} value={plumP} onChange={e => setPlumP(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>จำนวนข้อต่อ (ชิ้น)</label>
                        <input type="number" className={inputClass} value={plumF} onChange={e => setPlumF(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ราคาเฉลี่ยข้อต่อ (บาท)</label>
                        <input type="number" className={inputClass} value={plumFP} onChange={e => setPlumFP(e.target.value)} />
                    </div>
                </div>
                {rPlum && (
                    <div className={resultClass}>
                        <p className="text-lg">มูลค่ารวมของวัสดุท่อและข้อต่อ: <strong className="text-2xl">{rPlum.t} บาท</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"มาตรฐานระบบท่อประปาตาม Uniform Plumbing Code (UPC) และมาตรฐาน วสท. กำหนดหลักการออกแบบอย่างไร?":""} a={lang==="TH"?`การออกแบบระบบสุขาภิบาลและท่อประปาภายในอาคารต้องปฏิบัติตามมาตรฐานวิศวกรรมสุขาภิบาลและสิ่งแวดล้อมอย่างเคร่งครัด มาตรฐานที่ยอมรับในระดับสากลคือ Uniform Plumbing Code (UPC) และในไทยใช้มาตรฐานของ วสท. (EIT) หลักการออกแบบเริ่มต้นจากการคำนวณหน่วยสุขภัณฑ์ (Water Supply Fixture Units - WSFU) เพื่อประเมินความต้องการใช้น้ำสูงสุด (Peak Demand) จากนั้นจึงทำการปรับขนาดท่อ (Pipe Sizing) โดยคำนึงถึงความเร็วของน้ำในท่อ (Flow Velocity) ซึ่งวิศวกรกำหนดไว้ไม่ควรเกิน 1.2 ถึง 2.4 เมตรต่อวินาที เพื่อป้องกันปัญหาเสียงดังและการเกิดค้อนน้ำ (Water Hammer) ที่สามารถทำลายข้อต่อและลิ้นวาล์วได้ นอกจากนี้ การคำนวณความสูญเสียแรงเสียดทาน (Friction Loss) ตามสมการ Hazen-Williams ก็เป็นส่วนสำคัญในการกำหนดขนาดของปั๊มน้ำให้มีประสิทธิภาพ`:""} />
                    <FAQItem q={lang==="TH"?"การคำนวณความยาวท่อและการประเมินราคาข้อต่อ (Fittings) มีความสำคัญอย่างไรในการประมาณราคาตามหลักวิศวกรรม?":""} a={lang==="TH"?`ในการประมาณราคาระบบท่อ การวัดเพียงแค่ความยาวท่อแนวตรง (Linear Length) ไม่เพียงพอต่อการได้ต้นทุนที่แท้จริง ข้อต่อท่อ (Fittings) เช่น ข้องอ (Elbows), สามทาง (Tees), และข้อลด (Reducers) มีราคาสูงและมีผลกระทบทางวิศวกรรมพลศาสตร์ของไหลโดยตรง ข้อต่อแต่ละชนิดจะสร้างแรงเสียดทานเพิ่มเติม ซึ่งวิศวกรจะแปลงค่านี้เป็น "ความยาวท่อเทียบเท่า" (Equivalent Pipe Length) เพื่อนำไปคำนวณ Total Dynamic Head (TDH) ในการเลือกปั๊ม ในมุมมองของการถอดแบบแสดงรายการวัสดุ (Bill of Materials - BOM) ค่าใช้จ่ายของข้อต่อและวาล์วต่างๆ อาจมีมูลค่าสูงถึง 30-50% ของมูลค่าท่อทั้งหมด การประเมินราคาอย่างละเอียดและแม่นยำจึงต้องนับจำนวนข้อต่ออย่างครบถ้วนเพื่อไม่ให้ผู้รับเหมาประสบปัญหางบประมาณขาดแคลน`:""} />
                    <FAQItem q={lang==="TH"?"การเลือกวัสดุท่อประปา (เช่น PVC, PPR, HDPE) มีมาตรฐานและคุณสมบัติทางวิศวกรรมที่แตกต่างกันอย่างไรที่มีผลต่อต้นทุน?":""} a={lang==="TH"?`วัสดุที่ใช้ผลิตท่อประปามีคุณสมบัติทางวิศวกรรมวัสดุและกลศาสตร์ที่แตกต่างกัน ซึ่งส่งผลต่อต้นทุนและอายุการใช้งาน ท่อ PVC (Polyvinyl Chloride) ตามมาตรฐาน มอก. 17 (TIS 17) มีราคาถูกและติดตั้งง่าย แต่เปราะแตกง่ายเมื่อโดนรังสียูวี และไม่เหมาะกับน้ำร้อน ท่อ PPR (Polypropylene Random Copolymer) ได้รับความนิยมสูงสำหรับระบบน้ำร้อนและน้ำเย็น ทนแรงดันและอุณหภูมิได้สูง การเชื่อมต่อใช้วิธีหลอมด้วยความร้อน (Thermocasting) ทำให้เนื้อพลาสติกผสานเป็นเนื้อเดียวกัน ไร้รอยรั่วซึม ท่อ HDPE (High-Density Polyethylene) มีความยืดหยุ่นสูง ทนต่อการทรุดตัวของดิน นิยมใช้เป็นท่อเมนใต้ดิน การเลือกใช้วัสดุต้องพิจารณาค่าทนแรงดัน (Pressure Rating) เช่น PN10 หรือ PN20 ตามความเหมาะสมของระบบ ซึ่งการเลือกวัสดุที่มีประสิทธิภาพสูงย่อมตามมาด้วยต้นทุนค่าวัสดุและค่าแรงในการติดตั้งที่เพิ่มสูงขึ้น`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}

export function SlopeGradeCalculator({ lang }: { lang: Lang }) {
    const [slopeRise, setSlopeRise] = useLocalState('calc2-slope-rise', '1');
    const [slopeRun, setSlopeRun] = useLocalState('calc2-slope-run', '12');

    const calcSlope = () => {
        const r = parseFloat(slopeRise)||0, rn = parseFloat(slopeRun)||0;
        if(!r || !rn) return null;
        return { p: ((r / rn) * 100).toFixed(2), d: (Math.atan(r / rn) * (180 / Math.PI)).toFixed(2) };
    };

    const rSlope = calcSlope();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <section className={cardClass}>
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-b border-amber-200 pb-3">
                    <MoveDiagonal className="text-amber-500" /> คำนวณความลาดชัน (Slope/Grade)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>ความสูง (Rise)</label>
                        <input type="number" className={inputClass} value={slopeRise} onChange={e => setSlopeRise(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ความยาวแนวราบ (Run)</label>
                        <input type="number" className={inputClass} value={slopeRun} onChange={e => setSlopeRun(e.target.value)} />
                    </div>
                </div>
                {rSlope && (
                    <div className={resultClass}>
                        <p className="text-lg">อัตราความลาดชัน: <strong className="text-xl">{rSlope.p}%</strong></p>
                        <p className="text-lg mt-2">มุมองศา: <strong className="text-2xl text-amber-600">{rSlope.d}° (องศา)</strong></p>
                    </div>
                )}
                <div className="my-8"><AdPlaceholder type="in-article" /></div>
                <SEOFAQ title={lang==="TH"?"FAQ - การคำนวณและประมาณราคางานก่อสร้าง":"Construction & Estimation FAQ"}>
                    <FAQItem q={lang==="TH"?"มาตรฐานการออกแบบความลาดชัน (Slope) สำหรับทางลาด ทางเดิน และถนน ตามหลักวิศวกรรมขนส่งและสถาปัตยกรรมมีอะไรบ้าง?":""} a={lang==="TH"?`การออกแบบความลาดชันหรือ Grade เป็นพารามิเตอร์ที่สำคัญอย่างยิ่งในงานสถาปัตยกรรมและวิศวกรรมโยธา สำหรับทางลาดสำหรับคนพิการ (Wheelchair Ramps) กฎหมายควบคุมอาคารและมาตรฐานสากล ADA (Americansิลป์ Disabilities Act) กำหนดอัตราส่วนความลาดชันสูงสุดไว้ที่ 1:12 (ประมาณ 8.33%) เพื่อความปลอดภัยและลดความเครียดทางกายภาพของผู้ใช้งาน ในส่วนของวิศวกรรมขนส่งและทางหลวง (Highway Engineering) มาตรฐาน AASHTO (American Association of State Highway and Transportation Officials) กำหนดความลาดชันตามยาว (Longitudinal Grade) ของถนนให้เหมาะสมกับความเร็วออกแบบของยานพาหนะ และต้องมีความลาดชันขวาง (Cross Slope) ประมาณ 1.5% ถึง 2.0% เพื่อการระบายน้ำฝนออกจากผิวจราจร ป้องกันการเกิดแผ่นฟิล์มน้ำและปรากฏการณ์เหินน้ำ (Hydroplaning) ซึ่งเป็นอันตรายอย่างยิ่งต่อการขับขี่`:""} />
                    <FAQItem q={lang==="TH"?"การคำนวณหาค่าเปอร์เซ็นต์ความลาดชันและองศามีความสัมพันธ์กับเสถียรภาพของดิน (Slope Stability) ตามหลักวิศวกรรมปฐพีอย่างไร?":""} a={lang==="TH"?`ในทางวิศวกรรมปฐพี (Geotechnical Engineering) การพิจารณาความลาดชันไม่ได้จำกัดอยู่แค่พื้นผิวหน้า แต่เกี่ยวโยงอย่างลึกซึ้งกับเสถียรภาพของลาดดิน (Slope Stability) การคำนวณเปอร์เซ็นต์ความลาดชันมีผลต่อการวิเคราะห์แรงเฉือน (Shear Strength) ของมวลดิน หากความลาดชันมีค่ามากกว่ามุมเสียดทานภายในของดิน (Angle of Internal Friction) ดินจะสูญเสียเสถียรภาพและเกิดการพังทลาย (Landslide) วิศวกรจะใช้ทฤษฎีแรงดันดินของ Rankine หรือ Coulomb ในการออกแบบกำแพงกันดิน (Retaining Walls) เพื่อรักษาระดับความลาดชันให้ปลอดภัย นอกจากนี้ การวิเคราะห์ค่าอัตราส่วนความปลอดภัย (Factor of Safety - F.S.) จะต้องคำนึงถึงแรงดันน้ำในโพรงดิน (Pore Water Pressure) ที่จะเพิ่มขึ้นในช่วงฤดูฝน ซึ่งเป็นตัวการสำคัญที่บั่นทอนเสถียรภาพของความลาดชัน`:""} />
                    <FAQItem q={lang==="TH"?"ปัญหาทางวิศวกรรมที่อาจเกิดขึ้นหากกำหนดความลาดชันของท่อระบายน้ำไม่ถูกต้องตามมาตรฐานคืออะไร?":""} a={lang==="TH"?`ระบบท่อระบายน้ำทิ้ง (Sanitary Sewer Systems) อาศัยแรงโน้มถ่วง (Gravity Flow) ในการขับเคลื่อนของเสีย ดังนั้นความลาดชันของท่อจึงเป็นหัวใจสำคัญของการออกแบบตามมาตรฐาน ASPE (American Society of Plumbing Engineers) และ วสท. หากกำหนดความลาดชันน้อยเกินไป น้ำจะไหลช้า ความเร็วของน้ำจะต่ำกว่าค่าความเร็วทำความสะอาดตัวเอง (Self-Cleansing Velocity) ซึ่งโดยทั่วไปกำหนดไว้ไม่ต่ำกว่า 0.6 เมตรต่อวินาที ส่งผลให้กากตะกอนอุดตันสะสมในเส้นท่อ ในทางตรงข้าม หากท่อมีความลาดชันมากเกินไป น้ำจะไหลด้วยความเร็วสูงมาก ทิ้งกากของแข็งไว้เบื้องหลัง และอาจกัดเซาะผิวภายในท่อหรือทำให้จุดเชื่อมต่อหลุดร่อนได้ การคำนวณสมการการไหลในช่องเปิด (Manning's Equation) จึงเป็นเครื่องมือสำคัญที่วิศวกรใช้เพื่อหาความลาดชันที่สร้างสมดุลเชิงพลศาสตร์ที่สมบูรณ์แบบ`:""} />
                </SEOFAQ>
            </section>
        </div>
    );
}
