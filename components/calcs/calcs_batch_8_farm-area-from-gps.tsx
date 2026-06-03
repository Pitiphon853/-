import React, { useState } from 'react';
import { Calculator, Map, Crosshair, MapPin } from 'lucide-react';

export default function FarmAreaFromGps({ lang }: { lang: any }) {
  const [points, setPoints] = useState([
    { lat: 13.7563, lon: 100.5018 },
    { lat: 13.7563, lon: 100.5028 },
    { lat: 13.7553, lon: 100.5028 },
    { lat: 13.7553, lon: 100.5018 }
  ]);

  const handlePointChange = (index: number, field: 'lat' | 'lon', value: string) => {
    const newPoints = [...points];
    newPoints[index][field] = Number(value) || 0;
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, { lat: 0, lon: 0 }]);
  };

  const removePoint = (index: number) => {
    if (points.length > 3) {
      const newPoints = [...points];
      newPoints.splice(index, 1);
      setPoints(newPoints);
    }
  };

  // Calculate area using a simplified flat-earth approximation for small areas
  const calculateArea = () => {
    if (points.length < 3) return 0;

    // Calculate average latitude for longitude scaling
    let sumLat = 0;
    for (const p of points) sumLat += p.lat;
    const avgLat = sumLat / points.length;

    // Meters per degree
    const latToMeters = 111139; // approx meters per degree of latitude
    const lonToMeters = 111139 * Math.cos((avgLat * Math.PI) / 180);

    // Convert lat/lon to local x/y in meters (relative to first point to keep numbers small)
    const baseLat = points[0].lat;
    const baseLon = points[0].lon;

    const projected = points.map(p => ({
      x: (p.lon - baseLon) * lonToMeters,
      y: (p.lat - baseLat) * latToMeters
    }));

    // Shoelace formula
    let area = 0;
    let j = projected.length - 1;
    for (let i = 0; i < projected.length; i++) {
      area += (projected[j].x + projected[i].x) * (projected[j].y - projected[i].y);
      j = i;
    }
    return Math.abs(area / 2);
  };

  const areaSqm = calculateArea();
  
  // Convert to Thai units
  const totalWah = areaSqm / 4;
  const rai = Math.floor(totalWah / 400);
  const ngan = Math.floor((totalWah % 400) / 100);
  const wah = totalWah % 100;
  
  const acres = areaSqm / 4046.86;
  const hectares = areaSqm / 10000;

  const t = lang === 'EN' ? {
    title: "Farm Area from GPS Coordinates",
    inputs: "GPS Points (Decimal Degrees)",
    lat: "Latitude",
    lon: "Longitude",
    addPoint: "+ Add Point",
    remove: "Remove",
    summary: "Calculated Area",
    sqm: "Square Meters",
    raiUnit: "Rai - Ngan - Sq.Wah",
    acres: "Acres",
    hectares: "Hectares",
    minPoints: "Minimum 3 points required",
    desc: "Calculate approximate farm area by entering GPS coordinates of the field boundaries."
  } : {
    title: "คำนวณพื้นที่เกษตรจากพิกัด GPS",
    inputs: "จุดพิกัด (ละติจูด, ลองจิจูด แบบทศนิยม)",
    lat: "ละติจูด (Lat)",
    lon: "ลองจิจูด (Lon)",
    addPoint: "+ เพิ่มจุด",
    remove: "ลบ",
    summary: "พื้นที่ที่คำนวณได้",
    sqm: "ตารางเมตร",
    raiUnit: "ไร่ - งาน - ตารางวา",
    acres: "เอเคอร์",
    hectares: "เฮกตาร์",
    minPoints: "ต้องมีอย่างน้อย 3 จุด",
    desc: "คำนวณขนาดพื้นที่แปลงเกษตรโดยประมาณ จากการป้อนพิกัด GPS บริเวณมุมแปลง"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
          <Map className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-teal-500" />
              {t.inputs}
            </h2>
            <button 
              onClick={addPoint}
              className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
            >
              {t.addPoint}
            </button>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {points.map((point, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-teal-200 relative">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span className="font-medium text-sm text-gray-700">Point {index + 1}</span>
                  {points.length > 3 && (
                    <button 
                      onClick={() => removePoint(index)}
                      className="ml-auto text-xs text-red-500 hover:text-red-700"
                    >
                      {t.remove}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">{t.lat}</label>
                    <input 
                      type="number" 
                      step="0.000001"
                      value={point.lat} 
                      onChange={(e) => handlePointChange(index, 'lat', e.target.value)} 
                      className="w-full px-2 py-1 text-sm rounded border focus:ring-1 focus:ring-teal-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">{t.lon}</label>
                    <input 
                      type="number" 
                      step="0.000001"
                      value={point.lon} 
                      onChange={(e) => handlePointChange(index, 'lon', e.target.value)} 
                      className="w-full px-2 py-1 text-sm rounded border focus:ring-1 focus:ring-teal-500 focus:outline-none" 
                    />
                  </div>
                </div>
              </div>
            ))}
            {points.length < 3 && (
              <div className="text-red-500 text-sm mt-2">{t.minPoints}</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-500" />
            {t.summary}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
              <div className="text-sm text-teal-800 mb-1">{t.raiUnit}</div>
              <div className="text-2xl font-bold text-teal-700">
                {rai} ไร่ {ngan} งาน {wah.toFixed(1)} ตร.ว.
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.sqm}</span>
              <span className="font-semibold">{areaSqm.toLocaleString(undefined, {maximumFractionDigits: 2})} m²</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.acres}</span>
              <span className="font-semibold">{acres.toLocaleString(undefined, {maximumFractionDigits: 3})} ac</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t.hectares}</span>
              <span className="font-semibold">{hectares.toLocaleString(undefined, {maximumFractionDigits: 3})} ha</span>
            </div>
            
            <div className="mt-4 text-xs text-gray-400">
              * การคำนวณนี้เป็นการประมาณการจากพิกัด (Flat-earth approximation) เหมาะสำหรับแปลงขนาดไม่ใหญ่มาก อาจมีความคลาดเคลื่อนเล็กน้อยเมื่อเทียบกับการรังวัดทางวิศวกรรม
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-teal max-w-none mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          การหาขนาดพื้นที่แปลงเกษตรด้วยพิกัด GPS ง่ายและแม่นยำแค่ไหน?
        </h2>
        
        <p className="mb-4">
          ในอดีต การวัดขนาดพื้นที่ไร่นาต้องอาศัยการเดินสายเทปวัด หรือจ้างช่างรังวัดที่ดินมาดำเนินการ ซึ่งมีค่าใช้จ่ายและเสียเวลา แต่ในยุคดิจิทัลที่สมาร์ทโฟนทุกเครื่องมีระบบ GPS (Global Positioning System) อยู่ในตัว เกษตรกรสามารถหาขนาดพื้นที่แปลงของตนเองได้อย่างง่ายดาย เพียงแค่เดินไปที่มุมของแปลงและบันทึกพิกัด <strong>ละติจูด (Latitude)</strong> และ <strong>ลองจิจูด (Longitude)</strong> เก็บไว้
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ทำไมต้องรู้ขนาดพื้นที่แปลงเกษตรอย่างแม่นยำ?
        </h3>
        <p className="mb-4">
          การทราบขนาดพื้นที่ (จำนวนไร่ งาน ตารางวา) เป็นหัวใจสำคัญของการจัดการฟาร์ม เพราะตัวเลขนี้จะถูกนำไปใช้ในแทบทุกขั้นตอน:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>การคำนวณเมล็ดพันธุ์:</strong> ซื้อมาพอดี ไม่ขาดไม่เหลือทิ้ง</li>
          <li><strong>การสั่งปุ๋ยและยา:</strong> ใส่ปุ๋ยในปริมาณที่ถูกต้องตามหลักวิชาการ ไม่สิ้นเปลืองต้นทุน และไม่ทำให้ดินเสียจากการใส่ปุ๋ยมากเกินไป</li>
          <li><strong>การประเมินผลผลิต:</strong> สามารถพยากรณ์ล่วงหน้าได้ว่าแปลงนี้จะได้ข้าวกี่ตัน อ้อยกี่ตัน เพื่อเตรียมติดต่อโรงสีหรือผู้รับซื้อ</li>
          <li><strong>การจ้างแรงงาน/รถไถ:</strong> จ่ายค่าจ้างเหมาตามขนาดพื้นที่จริง ป้องกันการถูกเอาเปรียบ</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          การทำงานของโปรแกรมคำนวณพื้นที่จาก GPS
        </h3>
        <p className="mb-4">
          โปรแกรม <em>คำนวณพื้นที่เกษตรจากพิกัด GPS</em> ของเรา ใช้หลักการทางคณิตศาสตร์ที่เรียกว่า <strong>Shoelace Formula</strong> (สมการผูกเชือกรองเท้า) ร่วมกับการแปลงค่าพิกัดโลกให้เป็นระยะทางบนพื้นราบ (Flat-earth approximation)
        </p>
        <p className="mb-4">
          วิธีการใช้งานนั้นง่ายมาก เพียงคุณใช้แอพพลิเคชั่นแผนที่ในมือถือ (เช่น Google Maps) จิ้มที่มุมแปลงทีละจุด แล้วนำตัวเลขพิกัดแบบทศนิยมมาใส่ในโปรแกรมให้ครบทุกมุม (อย่างน้อย 3 จุด สำหรับแปลงสามเหลี่ยม หรือ 4 จุดสำหรับแปลงสี่เหลี่ยม) โปรแกรมจะคำนวณพื้นที่ออกมาเป็นตารางเมตร พร้อมแปลงหน่วยเป็น ไร่-งาน-ตารางวา ให้คุณทันที โดยไม่ต้องปวดหัวกับการคิดเลขเอง
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          ข้อควรระวัง
        </h3>
        <p className="mb-4">
          การคำนวณด้วยพิกัด GPS จากสมาร์ทโฟนอาจมีความคลาดเคลื่อน (Error) ประมาณ 2-5 เมตร ขึ้นอยู่กับคุณภาพของสัญญาณและอุปกรณ์ในขณะนั้น ดังนั้น พื้นที่ที่คำนวณได้จึงเป็น <strong>"การประมาณการอย่างใกล้เคียง"</strong> ซึ่งเพียงพอสำหรับการจัดการฟาร์มทั่วไป แต่หากต้องการนำไปใช้เพื่อการซื้อขายที่ดินหรือข้อพิพาททางกฎหมาย ควรใช้โฉนดที่ดินหรือการรังวัดจากกรมที่ดินเป็นหลัก
        </p>
      </article>
    </div>
  );
}
