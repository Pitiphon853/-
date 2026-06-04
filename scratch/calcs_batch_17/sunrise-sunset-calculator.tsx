"use client";
import { useState } from "react";
import { Sun, Sunset, Moon, Calculator, MapPin } from "lucide-react";

const thaiProvinces = [
  { name: "กรุงเทพมหานคร", lat: 13.7563, lng: 100.5018 },
  { name: "เชียงใหม่", lat: 18.7883, lng: 98.9853 },
  { name: "ภูเก็ต", lat: 7.8804, lng: 98.3923 },
  { name: "ขอนแก่น", lat: 16.4322, lng: 102.8236 },
  { name: "สงขลา", lat: 7.1896, lng: 100.5945 },
  { name: "นครราชสีมา", lat: 14.9799, lng: 102.0978 },
  { name: "เชียงราย", lat: 19.9105, lng: 99.8406 },
  { name: "อุดรธานี", lat: 17.4156, lng: 102.7872 },
  { name: "สุราษฎร์ธานี", lat: 9.1382, lng: 99.3216 },
  { name: "นครศรีธรรมราช", lat: 8.4304, lng: 99.9631 },
];

function toJulian(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const A = Math.floor((14 - m) / 12);
  const Y = y + 4800 - A;
  const M = m + 12 * A - 3;
  return d + Math.floor((153 * M + 2) / 5) + 365 * Y + Math.floor(Y / 4) - Math.floor(Y / 100) + Math.floor(Y / 400) - 32045;
}

function calcSunriseSunset(lat: number, lng: number, date: Date, zenith = 90.833) {
  const jd = toJulian(date);
  const n = jd - 2451545.0 + 0.0008;
  const Jstar = n - lng / 360;
  const M = (357.5291 + 0.98560028 * Jstar) % 360;
  const Mrad = (M * Math.PI) / 180;
  const C = 1.9148 * Math.sin(Mrad) + 0.02 * Math.sin(2 * Mrad) + 0.0003 * Math.sin(3 * Mrad);
  const lambda = (M + C + 180 + 102.9372) % 360;
  const lambdaRad = (lambda * Math.PI) / 180;
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(Mrad) - 0.0069 * Math.sin(2 * lambdaRad);
  const sinDec = Math.sin(lambdaRad) * Math.sin((23.4397 * Math.PI) / 180);
  const cosDec = Math.cos(Math.asin(sinDec));
  const latRad = (lat * Math.PI) / 180;
  const cosOmega =
    (Math.cos((zenith * Math.PI) / 180) - Math.sin(latRad) * sinDec) / (Math.cos(latRad) * cosDec);

  if (cosOmega > 1 || cosOmega < -1) return null;

  const omega = (Math.acos(cosOmega) * 180) / Math.PI;
  const Jrise = Jtransit - omega / 360;
  const Jset = Jtransit + omega / 360;

  const toDate = (jd: number) => {
    const msPerDay = 86400000;
    const epoch = new Date("2000-01-01T12:00:00Z").getTime();
    return new Date(epoch + (jd - 2451545.0) * msPerDay);
  };

  return {
    sunrise: toDate(Jrise),
    sunset: toDate(Jset),
    solarNoon: toDate(Jtransit),
    dayLength: ((Jset - Jrise) * 24),
  };
}

function formatTime(d: Date, offset = 7) {
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const local = new Date(utc + offset * 3600000);
  return local.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatHoursMin(hrs: number) {
  const h = Math.floor(hrs);
  const m = Math.round((hrs - h) * 60);
  return `${h} ชม. ${m} นาที`;
}

export default function SunriseSunsetCalculator({ lang }: any) {
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [customLat, setCustomLat] = useState("");
  const [customLng, setCustomLng] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<ReturnType<typeof calcSunriseSunset> | null>(null);
  const [locationName, setLocationName] = useState("");

  const calculate = () => {
    const lat = useCustom ? parseFloat(customLat) : thaiProvinces[selectedProvince].lat;
    const lng = useCustom ? parseFloat(customLng) : thaiProvinces[selectedProvince].lng;
    const name = useCustom ? `พิกัด ${lat}, ${lng}` : thaiProvinces[selectedProvince].name;
    if (isNaN(lat) || isNaN(lng)) return;
    const date = new Date(selectedDate);
    const r = calcSunriseSunset(lat, lng, date);
    setResult(r);
    setLocationName(name);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div className="flex items-center gap-3 text-orange-500">
          <Sun className="w-7 h-7" />
          <h2 className="text-xl font-bold">เวลาพระอาทิตย์ขึ้น/ตก</h2>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm mb-3">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="rounded text-orange-500"
            />
            ระบุพิกัดเอง (Latitude / Longitude)
          </label>

          {!useCustom ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เลือกจังหวัด</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              >
                {thaiProvinces.map((p, i) => (
                  <option key={p.name} value={i}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  placeholder="13.7563"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={customLng}
                  onChange={(e) => setCustomLng(e.target.value)}
                  placeholder="100.5018"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          <Calculator className="w-4 h-4" /> คำนวณ
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-br from-orange-400 via-pink-400 to-indigo-600 rounded-2xl shadow-lg p-6 text-white space-y-4">
          <div className="flex items-center gap-2 opacity-90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{locationName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-xl p-5 text-center">
              <Sun className="w-10 h-10 mx-auto mb-2 text-yellow-200" />
              <div className="text-xs opacity-80">พระอาทิตย์ขึ้น</div>
              <div className="text-2xl font-bold mt-1">{formatTime(result.sunrise)}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-5 text-center">
              <Sun className="w-10 h-10 mx-auto mb-2 text-yellow-100" />
              <div className="text-xs opacity-80">เที่ยงสุริยะ</div>
              <div className="text-2xl font-bold mt-1">{formatTime(result.solarNoon)}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-5 text-center">
              <Sunset className="w-10 h-10 mx-auto mb-2 text-orange-200" />
              <div className="text-xs opacity-80">พระอาทิตย์ตก</div>
              <div className="text-2xl font-bold mt-1">{formatTime(result.sunset)}</div>
            </div>
          </div>

          <div className="bg-white/15 rounded-xl p-4 text-center">
            <Moon className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm opacity-80">ระยะเวลากลางวัน</div>
            <div className="text-xl font-bold">{formatHoursMin(result.dayLength)}</div>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <article className="prose max-w-none bg-white rounded-2xl shadow p-6">
        <h2>เวลาพระอาทิตย์ขึ้นและพระอาทิตย์ตก – คำนวณออนไลน์ฟรี</h2>
        <p>
          เวลาพระอาทิตย์ขึ้นและพระอาทิตย์ตกเป็นข้อมูลสำคัญสำหรับหลายกิจกรรม
          ตั้งแต่การถ่ายภาพ Golden Hour การวางแผนกิจกรรมกลางแจ้ง
          การเกษตร ไปจนถึงการละหมาดของชาวมุสลิม
          เครื่องมือของเราช่วยคำนวณเวลาพระอาทิตย์ขึ้นและตกสำหรับจังหวัดสำคัญในประเทศไทย
          หรือพิกัดใด ๆ บนโลก
        </p>
        <h3>วิธีการคำนวณ</h3>
        <p>
          การคำนวณใช้สูตรทางดาราศาสตร์ที่อิงจาก Julian Date และตำแหน่งดวงอาทิตย์บนท้องฟ้า
          โดยพิจารณาจากละติจูดและลองจิจูดของสถานที่ วันที่ที่ต้องการ
          และมุมเซนิธมาตรฐาน 90.833 องศา ซึ่งรวมการหักเหของบรรยากาศแล้ว
          ผลลัพธ์ที่ได้จะเป็นเวลาตามเวลามาตรฐานประเทศไทย (UTC+7)
        </p>
        <h3>ปัจจัยที่มีผลต่อเวลาพระอาทิตย์ขึ้น/ตก</h3>
        <ul>
          <li>ตำแหน่งทางภูมิศาสตร์ – ละติจูดที่สูงขึ้นจะมีความแตกต่างของเวลากลางวันในแต่ละฤดูมากกว่า</li>
          <li>ฤดูกาล – ในฤดูร้อนกลางวันจะยาวกว่าฤดูหนาว</li>
          <li>ระดับความสูงจากน้ำทะเล – ยิ่งอยู่สูงยิ่งเห็นพระอาทิตย์ขึ้นเร็วและตกช้ากว่า</li>
          <li>สภาพบรรยากาศ – ความชื้นและอุณหภูมิมีผลต่อการหักเหของแสง</li>
        </ul>
        <h3>ประโยชน์สำหรับคนไทย</h3>
        <p>
          สำหรับชาวนาและเกษตรกร เวลาพระอาทิตย์ขึ้นช่วยวางแผนการทำนาและเพาะปลูก
          ช่างภาพสามารถใช้ข้อมูลนี้เพื่อวางแผนถ่ายภาพ Golden Hour ได้อย่างแม่นยำ
          นักวิ่งและนักปั่นจักรยานสามารถวางแผนออกกำลังกายให้เหมาะกับแสงสว่างธรรมชาติ
          ใช้งานฟรีและคำนวณได้ทันทีโดยไม่ต้องสมัครสมาชิก
        </p>
      </article>
    </div>
  );
}
