"use client";

import React, { useState } from 'react';
import { Calculator, Info, AlertTriangle, RefreshCw, Globe, ArrowRight } from 'lucide-react';

export default function SphericalToCartesian({ lang }: any) {
  const isEN = lang === 'en';

  const [radial, setRadial] = useState<string>('');
  const [theta, setTheta] = useState<string>('');
  const [phi, setPhi] = useState<string>('');
  const [unit, setUnit] = useState<'deg' | 'rad'>('deg');

  const [coordX, setCoordX] = useState<number | null>(null);
  const [coordY, setCoordY] = useState<number | null>(null);
  const [coordZ, setCoordZ] = useState<number | null>(null);
  
  const [error, setError] = useState<string>('');
  const [showSteps, setShowSteps] = useState<boolean>(false);

  const t = {
    title: isEN ? 'Spherical to Cartesian Coordinator Converter' : 'เครื่องมือคำนวณพิกัดทรงกลมเป็นพิกัดฉาก',
    desc: isEN ? 'Convert 3D spherical coordinates (r, θ, φ) to Cartesian coordinates (x, y, z).' : 'แปลงระบบพิกัดทรงกลมสามมิติ (r, θ, φ) ให้เป็นพิกัดฉาก (x, y, z) ได้อย่างรวดเร็ว',
    labelRadial: isEN ? 'Radial Distance (r)' : 'รัศมี / ระยะห่างจากจุดกำเนิด (r)',
    labelTheta: isEN ? 'Polar Angle / Inclination (θ)' : 'มุมโพลาร์ / มุมเอียงจากแกน Z (θ)',
    labelPhi: isEN ? 'Azimuthal Angle (φ)' : 'มุมอะซิมุท / มุมระนาบ XY (φ)',
    labelUnit: isEN ? 'Angle Unit' : 'หน่วยของมุม',
    unitDeg: isEN ? 'Degrees (°)' : 'องศา (°)',
    unitRad: isEN ? 'Radians (rad)' : 'เรเดียน (rad)',
    btnConvert: isEN ? 'Convert' : 'แปลงพิกัด',
    btnReset: isEN ? 'Clear' : 'ล้างข้อมูล',
    placeholderR: isEN ? 'e.g. 5' : 'เช่น 5',
    placeholderTheta: isEN ? 'e.g. 45' : 'เช่น 45',
    placeholderPhi: isEN ? 'e.g. 60' : 'เช่น 60',
    resultTitle: isEN ? 'Cartesian Coordinates (x, y, z)' : 'ผลลัพธ์พิกัดฉาก (x, y, z)',
    invalidInputs: isEN ? 'Please enter valid positive numbers for r and valid numbers for angles.' : 'กรุณากรอกตัวเลขเชิงบวกสำหรับรัศมี r และตัวเลขที่ถูกต้องสำหรับมุมต่างๆ',
    stepTitle: isEN ? 'Conversion Formulas & Calculation Steps:' : 'สูตรและขั้นตอนการคำนวณอย่างละเอียด:',
  };

  const handleConvert = () => {
    setError('');
    setCoordX(null);
    setCoordY(null);
    setCoordZ(null);
    setShowSteps(false);

    const rVal = parseFloat(radial);
    const thetaVal = parseFloat(theta);
    const phiVal = parseFloat(phi);

    if (isNaN(rVal) || isNaN(thetaVal) || isNaN(phiVal)) {
      setError(t.invalidInputs);
      return;
    }

    if (rVal < 0) {
      setError(isEN ? 'Radial distance (r) cannot be negative.' : 'ระยะทางจากจุดกำเนิด (r) ต้องไม่ติดลบ');
      return;
    }

    // Convert angles to radians if they are in degrees
    const thetaRad = unit === 'deg' ? (thetaVal * Math.PI) / 180 : thetaVal;
    const phiRad = unit === 'deg' ? (phiVal * Math.PI) / 180 : phiVal;

    // x = r * sin(theta) * cos(phi)
    // y = r * sin(theta) * sin(phi)
    // z = r * cos(theta)
    const sinTheta = Math.sin(thetaRad);
    const cosTheta = Math.cos(thetaRad);
    const sinPhi = Math.sin(phiRad);
    const cosPhi = Math.cos(phiRad);

    const x = rVal * sinTheta * cosPhi;
    const y = rVal * sinTheta * sinPhi;
    const z = rVal * cosTheta;

    setCoordX(x);
    setCoordY(y);
    setCoordZ(z);
    setShowSteps(true);
  };

  const handleClear = () => {
    setRadial('');
    setTheta('');
    setPhi('');
    setCoordX(null);
    setCoordY(null);
    setCoordZ(null);
    setError('');
    setShowSteps(false);
  };

  // Pre-calculate display trig functions for step details
  const thetaRadDisplay = unit === 'deg' ? (parseFloat(theta) * Math.PI) / 180 : parseFloat(theta);
  const phiRadDisplay = unit === 'deg' ? (parseFloat(phi) * Math.PI) / 180 : parseFloat(phi);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-emerald-200" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-emerald-100 opacity-90">{t.desc}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labelUnit}</label>
                <div className="flex rounded-lg overflow-hidden border border-gray-300 w-full max-w-[280px]">
                  <button
                    type="button"
                    onClick={() => setUnit('deg')}
                    className={`flex-1 py-2 font-semibold text-xs text-center transition-colors ${unit === 'deg' ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t.unitDeg}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('rad')}
                    className={`flex-1 py-2 font-semibold text-xs text-center transition-colors ${unit === 'rad' ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {t.unitRad}
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-w-sm">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labelRadial}</label>
                  <input
                    type="number"
                    value={radial}
                    onChange={(e) => setRadial(e.target.value)}
                    placeholder={t.placeholderR}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {t.labelTheta} ({unit === 'deg' ? '0° - 180°' : '0 - π rad'})
                  </label>
                  <input
                    type="number"
                    value={theta}
                    onChange={(e) => setTheta(e.target.value)}
                    placeholder={t.placeholderTheta}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {t.labelPhi} ({unit === 'deg' ? '0° - 360°' : '0 - 2π rad'})
                  </label>
                  <input
                    type="number"
                    value={phi}
                    onChange={(e) => setPhi(e.target.value)}
                    placeholder={t.placeholderPhi}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm max-w-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 justify-start max-w-sm">
                <button
                  onClick={handleConvert}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  {t.btnConvert}
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium p-3 rounded-xl transition-colors flex items-center justify-center"
                  title={t.btnReset}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results output */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 text-lg">{t.resultTitle}</h3>
              {coordX !== null && coordY !== null && coordZ !== null ? (
                <div className="space-y-4 max-w-sm">
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-800 mb-1">X Coordinate</p>
                    <p className="text-xl font-bold font-mono text-emerald-900">{Number(coordX.toFixed(6))}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-800 mb-1">Y Coordinate</p>
                    <p className="text-xl font-bold font-mono text-emerald-900">{Number(coordY.toFixed(6))}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-800 mb-1">Z Coordinate</p>
                    <p className="text-xl font-bold font-mono text-emerald-900">{Number(coordZ.toFixed(6))}</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-gray-400 font-mono text-sm max-w-sm">
                  {isEN ? 'Enter inputs and click Convert to see (x, y, z) output.' : 'กรอกพิกัดทรงกลมและกดปุ่มแปลงพิกัดเพื่อแสดงผลลัพธ์'}
                </div>
              )}
            </div>
          </div>

          {/* Steps section */}
          {showSteps && coordX !== null && coordY !== null && coordZ !== null && (
            <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-emerald-800">
                <Info className="w-5 h-5 text-emerald-600" />
                {t.stepTitle}
              </h3>
              
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-700">1. แปลงมุมเป็นหน่วยเรเดียน (สำหรับการคำนวณทางคณิตศาสตร์):</p>
                  <p className="pl-4">
                    θ = {theta}° = {Number(thetaRadDisplay.toFixed(5))} rad<br />
                    φ = {phi}° = {Number(phiRadDisplay.toFixed(5))} rad
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">2. คำนวณค่าฟังก์ชันตรีโกณมิติ:</p>
                  <p className="pl-4">
                    sin(θ) = {Number(Math.sin(thetaRadDisplay).toFixed(5))}<br />
                    cos(θ) = {Number(Math.cos(thetaRadDisplay).toFixed(5))}<br />
                    sin(φ) = {Number(Math.sin(phiRadDisplay).toFixed(5))}<br />
                    cos(φ) = {Number(Math.cos(phiRadDisplay).toFixed(5))}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">3. คำนวณพิกัดฉาก:</p>
                  <div className="pl-4 space-y-1">
                    <p>
                      x = r × sin(θ) × cos(φ)<br />
                      x = {radial} × {Number(Math.sin(thetaRadDisplay).toFixed(4))} × {Number(Math.cos(phiRadDisplay).toFixed(4))} = <span className="font-bold text-emerald-700">{Number(coordX.toFixed(6))}</span>
                    </p>
                    <p>
                      y = r × sin(θ) × sin(φ)<br />
                      y = {radial} × {Number(Math.sin(thetaRadDisplay).toFixed(4))} × {Number(Math.sin(phiRadDisplay).toFixed(4))} = <span className="font-bold text-emerald-700">{Number(coordY.toFixed(6))}</span>
                    </p>
                    <p>
                      z = r × cos(θ)<br />
                      z = {radial} × {Number(Math.cos(thetaRadDisplay).toFixed(4))} = <span className="font-bold text-emerald-700">{Number(coordZ.toFixed(6))}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="mt-12 prose prose-emerald max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-6 h-6 text-emerald-600" />
          พิกัดทรงกลมเป็นพิกัดฉาก (Spherical to Cartesian): ความเข้าใจ ทฤษฎีสามมิติ และสูตรตรีโกณมิติ
        </h2>
        
        <p>
          ในวิชาแคลคูลัส เรขาคณิตวิเคราะห์ และฟิสิกส์ขั้นสูง การระบุตำแหน่งของวัตถุหรือจุดในพื้นที่สามมิติ (3D Space) สามารถทำได้หลากหลายระบบพิกัด โดยทั่วไปพิกัดที่เราคุ้นเคยกันดีที่สุดคือ <strong>ระบบพิกัดฉาก (Cartesian Coordinate System, x, y, z)</strong> ที่บอกตำแหน่งโดยการอ้างอิงระยะตามแนวแกนตั้งฉากกันสามแกน แต่ในโครงสร้างบางประเภทที่มีความโค้งหรือมีความสมมาตรรอบจุดกำเนิด เช่น การคำนวณคลื่นแม่เหล็กไฟฟ้า การเคลื่อนที่ของวงโคจรดาวเทียม หรือโครงสร้างอะตอม <strong>ระบบพิกัดทรงกลม (Spherical Coordinate System, r, θ, φ)</strong> จะตอบโจทย์และทำให้สมการการคำนวณง่ายลงอย่างมหาศาล
        </p>

        <h3>ความเข้าใจเกี่ยวกับระบบพิกัดทรงกลม (Spherical Coordinates)</h3>
        <p>
          ระบบพิกัดทรงกลมระบุตำแหน่งของจุดด้วยตัวแปร 3 ตัว ได้แก่:
        </p>
        <ul>
          <li><strong>รัศมี r (หรือ $\rho$ ในบางตำรา):</strong> คือระยะทางตรงจากจุดกำเนิด (Origin) ไปยังจุดที่ต้องการวัด โดยรัศมีจะต้องมีค่ามากกว่าหรือเท่ากับศูนย์เสมอ (r &ge; 0)</li>
          <li><strong>มุมขั้วหรือมุมเอียง &theta; (Polar / Inclination Angle):</strong> คือมุมที่ทำกับแกน Z ในแนวบวก โดยมีค่าตั้งแต่มุม 0 ถึง 180 องศา (หรือ 0 ถึง $\pi$ เรเดียน) ซึ่งเป็นมุมชี้จากด้านบนลงมาด้านล่าง</li>
          <li><strong>มุมอะซิมุท &phi; (Azimuthal Angle):</strong> คือมุมบนระนาบ XY ที่หมุนเริ่มจากแกน X ในทิศทางบวกทวนเข็มนาฬิกา มีค่าตั้งแต่มุม 0 ถึง 360 องศา (หรือ 0 ถึง $2\pi$ เรเดียน)</li>
        </ul>

        <h3>สูตรคณิตศาสตร์ในการแปลงพิกัดทรงกลมเป็นพิกัดฉาก</h3>
        <p>
          การหาพิกัดฉาก (x, y, z) เมื่อเราทราบค่าระยะทางและมุม (r, &theta;, &phi;) อาศัยหลักวิชาตรีโกณมิติ โดยสามารถเขียนเป็นสมการความสัมพันธ์ได้ดังนี้:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-center space-y-1">
          <p>x = r × sin(&theta;) × cos(&phi;)</p>
          <p>y = r × sin(&theta;) × sin(&phi;)</p>
          <p>z = r × cos(&theta;)</p>
        </div>
        <p>
          สมการเหล่านี้มาจากการโปรเจกต์เวกเตอร์ความยาว r ลงบนแกนแนวตั้ง Z ซึ่งจะได้ <code>z = r cos(&theta;)</code> และเมื่อโปรเจกต์ลงบนระนาบ XY จะได้เวกเตอร์ความยาว <code>r sin(&theta;)</code> จากนั้นนำเงาบนระนาบ XY นี้มาแยกองค์ประกอบเป็นแกน X และ Y โดยใช้ฟังก์ชันตรีโกณมิติของมุมแนวราบ &phi;
        </p>

        <h3>ตัวอย่างการคำนวณแปลงพิกัดทรงกลม</h3>
        <p>
          สมมติให้พิกัดทรงกลมของจุดหนึ่งในอวกาศเป็น <code>(r = 5, &theta; = 45°, &phi; = 60°)</code> มาทำการคำนวณแปลงเป็นพิกัดฉาก:
        </p>
        <ol>
          <li>คำนวณหาค่ามุมตรีโกณมิติ:<br />
            &nbsp;&nbsp;&nbsp;sin(45°) = 0.7071, cos(45°) = 0.7071<br />
            &nbsp;&nbsp;&nbsp;sin(60°) = 0.8660, cos(60°) = 0.5000
          </li>
          <li>คำนวณหาค่า x:<br />
            &nbsp;&nbsp;&nbsp;x = 5 × sin(45°) × cos(60°) = 5 × 0.7071 × 0.5 = 1.7678
          </li>
          <li>คำนวณหาค่า y:<br />
            &nbsp;&nbsp;&nbsp;y = 5 × sin(45°) × sin(60°) = 5 × 0.7071 × 0.866 = 3.0619
          </li>
          <li>คำนวณหาค่า z:<br />
            &nbsp;&nbsp;&nbsp;z = 5 × cos(45°) = 5 × 0.7071 = 3.5355
          </li>
        </ol>
        <p>
          ดังนั้น พิกัดฉาก 3 มิติคือ <strong>(x ≈ 1.7678, y ≈ 3.0619, z ≈ 3.5355)</strong>
        </p>

        <h3>ประโยชน์ในฟิสิกส์ คอมพิวเตอร์ และภูมิศาสตร์</h3>
        <p>
          การคำนวณลักษณะนี้ถูกใช้อย่างกว้างขวางในเทคโนโลยีการสำรวจทางอากาศและดาวเทียม ระบบนำทาง GPS บนเครื่องบิน ที่ต้องการคำนวณตำแหน่งจากมุมสูงเหนือระนาบศูนย์สูตรและพิกัดเส้นแวง (Longitude) ไปเป็นแกนสามมิติฉาก นอกจากนี้ ในการพัฒนาเกม 3D ตัวแปลงพิกัดทรงกลมยังช่วยในการคำนวณการเลื่อนมุมกล้องอิสระรอบจุดศูนย์กลางเป้าหมาย (Orbit Camera control) อย่างลื่นไหลเป็นธรรมชาติ
        </p>
      </article>
    </div>
  );
}
