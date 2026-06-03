import React, { useState } from 'react';
import { Snowflake, Expand, Sun, Moon, Home, Calculator, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function AcBtuSizeCalculator({ lang }: any) {
  const [width, setWidth] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [roomType, setRoomType] = useState<string>('bedroom');
  const [sunExposure, setSunExposure] = useState<string>('normal');
  const [ceilingHeight, setCeilingHeight] = useState<string>('normal');

  const calculateBTU = () => {
    const w = Number(width);
    const l = Number(length);

    if (w > 0 && l > 0) {
      const area = w * l;
      
      // Determine multiplier based on room type and sun
      let multiplier = 700; // Default base

      if (roomType === 'bedroom') {
        multiplier = sunExposure === 'sun' ? 800 : 700;
      } else if (roomType === 'living') {
        multiplier = sunExposure === 'sun' ? 900 : 800;
      } else if (roomType === 'office') {
        multiplier = sunExposure === 'sun' ? 1000 : 900;
      } else if (roomType === 'kitchen') {
        multiplier = sunExposure === 'sun' ? 1200 : 1000;
      }

      let btu = area * multiplier;

      // Adjust for high ceiling
      if (ceilingHeight === 'high') {
        btu = btu * 1.15; // Add 15% for ceiling > 3m
      }

      // Find nearest standard AC sizes
      const standardSizes = [9000, 12000, 15000, 18000, 24000, 30000, 36000, 42000, 48000];
      
      let recommendedSize = standardSizes.find(size => size >= btu);
      if (!recommendedSize) recommendedSize = 48000; // Cap at max standard for display

      // If recommended is much higher than calculated, sometimes people choose the exact lower tier if it's very close
      // but standard advice is to round up slightly.

      return {
        area,
        multiplier,
        btuRaw: btu,
        recommendedSize
      };
    }
    return null;
  };

  const results = calculateBTU();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            <Snowflake className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            คำนวณขนาดแอร์ (BTU)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความกว้างห้อง (เมตร)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="เช่น 4"
                    min="1"
                  />
                  <Expand className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความยาวห้อง (เมตร)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value) || '')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="เช่น 5"
                    min="1"
                  />
                  <Expand className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทการใช้งานห้อง
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${roomType === 'bedroom' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" className="hidden" name="roomType" value="bedroom" checked={roomType === 'bedroom'} onChange={() => setRoomType('bedroom')} />
                  <Moon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">ห้องนอน</span>
                </label>
                <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${roomType === 'living' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" className="hidden" name="roomType" value="living" checked={roomType === 'living'} onChange={() => setRoomType('living')} />
                  <Home className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">ห้องนั่งเล่น</span>
                </label>
                <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${roomType === 'office' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" className="hidden" name="roomType" value="office" checked={roomType === 'office'} onChange={() => setRoomType('office')} />
                  <Calculator className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">สำนักงาน/กระจกเยอะ</span>
                </label>
                <label className={`border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${roomType === 'kitchen' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" className="hidden" name="roomType" value="kitchen" checked={roomType === 'kitchen'} onChange={() => setRoomType('kitchen')} />
                  <Sun className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium text-center leading-tight">ร้านอาหาร/ห้องครัว<br/><span className="text-[10px]">(ความร้อนสูง)</span></span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ปัจจัยเรื่องแสงแดด
                </label>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${sunExposure === 'normal' ? 'bg-white text-gray-800 shadow' : 'text-gray-500'}`}
                    onClick={() => setSunExposure('normal')}
                  >
                    ร่มรื่น / โดนแดดเช้า
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${sunExposure === 'sun' ? 'bg-orange-500 text-white shadow' : 'text-gray-500'}`}
                    onClick={() => setSunExposure('sun')}
                  >
                    <Sun className="w-4 h-4"/> โดนแดดบ่าย / แดดจัด
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความสูงของเพดานห้อง
                </label>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${ceilingHeight === 'normal' ? 'bg-white text-gray-800 shadow' : 'text-gray-500'}`}
                    onClick={() => setCeilingHeight('normal')}
                  >
                    ปกติ (ไม่เกิน 3 เมตร)
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${ceilingHeight === 'high' ? 'bg-sky-500 text-white shadow' : 'text-gray-500'}`}
                    onClick={() => setCeilingHeight('high')}
                  >
                    เพดานสูง (เกิน 3 เมตร)
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ผลการคำนวณ
            </h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span className="text-gray-600">พื้นที่ห้อง</span>
                  <span className="font-bold text-gray-900">{results.area.toFixed(2)} ตร.ม.</span>
                </div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span className="text-gray-600">ค่า BTU ที่คำนวณได้</span>
                  <span className="font-bold text-gray-900">{Math.round(results.btuRaw).toLocaleString()} BTU</span>
                </div>

                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 rounded-xl shadow-md text-center text-white mt-4 relative overflow-hidden">
                  <Snowflake className="absolute -right-4 -top-4 w-24 h-24 text-white opacity-10" />
                  <p className="text-sky-100 mb-2 relative z-10 text-sm">ขนาดแอร์ที่แนะนำ (BTU)</p>
                  <p className="text-5xl font-bold relative z-10">
                    {results.recommendedSize.toLocaleString()}
                  </p>
                  <p className="text-sky-100 mt-2 relative z-10 text-sm">
                    หรือขนาดใกล้เคียงที่มีจำหน่าย
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mt-4 flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">ทำไมต้องเลือกแอร์ให้พอดี?</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      หากแอร์ <strong>เล็กเกินไป</strong> คอมเพรสเซอร์จะทำงานหนักตลอดเวลา ทำให้กินไฟและพังไว<br/>
                      หากแอร์ <strong>ใหญ่เกินไป</strong> คอมเพรสเซอร์จะตัดบ่อย ห้องจะมีความชื้นสูง รู้สึกเหนอะหนะ และเปลืองค่าตัวเครื่องตอนซื้อ
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200 p-6 text-center">
                <Snowflake className="w-12 h-12 mb-3 text-sky-200" />
                <p>กรุณาระบุขนาดความกว้างและความยาวห้อง</p>
                <p className="text-sm">เพื่อคำนวณขนาด BTU ที่เหมาะสม</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">วิธีคำนวณขนาดแอร์ (BTU) ให้เหมาะกับห้อง เย็นฉ่ำ ประหยัดไฟ ไม่พังไว</h2>
        
        <p>การเลือกซื้อเครื่องปรับอากาศหรือ "แอร์" สักเครื่อง คำถามแรกที่ทุกคนต้องเจอคือ <strong>"ห้องขนาดนี้ ต้องใช้แอร์กี่ BTU?"</strong> การรู้วิธีคำนวณขนาดเครื่องปรับอากาศ (AC BTU Size Calculator) เป็นสิ่งสำคัญมาก เพราะ BTU (British Thermal Unit) คือหน่วยวัดความสามารถในการทำความเย็นของแอร์ หากเลือกไม่เหมาะสม จะส่งผลเสียทั้งต่อค่าไฟและความทนทานของตัวเครื่อง</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ทำไมถึงห้ามเลือกแอร์ "เล็กไป" หรือ "ใหญ่ไป"?</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>แอร์ BTU น้อยเกินไป (แอร์เล็กกว่าห้อง):</strong> คอมเพรสเซอร์จะต้องทำงานหนักตลอดเวลาเพื่อพยายามทำอุณหภูมิให้ได้ตามที่ตั้งไว้ ผลที่ตามมาคือ แอร์ไม่เย็น ฉ่ำช้า เปลืองค่าไฟมหาศาล และอายุการใช้งานสั้นลงเพราะเครื่องไม่ได้พัก</li>
          <li><strong>แอร์ BTU มากเกินไป (แอร์ใหญ่กว่าห้อง):</strong> หลายคนคิดว่าเผื่อไว้ก่อนดีกว่า แต่ความเป็นจริงคือ คอมเพรสเซอร์จะทำความเย็นถึงจุดที่ตั้งไว้เร็วเกินไปแล้ว "ตัดการทำงาน" บ่อยครั้ง การตัดต่อบ่อยๆ ทำให้กินไฟ และที่สำคัญคือแอร์จะไม่ทันได้ดูดซับความชื้นออกจากห้อง ทำให้รู้สึกเย็นแบบชื้นๆ เหนอะหนะ ไม่สบายตัว</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">สูตรมาตรฐานในการคำนวณ BTU</h3>
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200 my-4">
          <p className="font-semibold text-sky-900 mb-2">BTU = พื้นที่ห้อง (กว้าง × ยาว) × ตัวคูณความร้อน (Cooling Load)</p>
        </div>
        <p>ตัวคูณความร้อนจะแปรผันตามประเภทการใช้งานและการรับแสงแดดของห้อง ดังนี้:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>700 - 800:</strong> สำหรับห้องนอน หรือห้องที่ไม่ค่อยโดนแดด (ใช้งานตอนกลางคืนเป็นหลัก)</li>
          <li><strong>800 - 900:</strong> สำหรับห้องนั่งเล่น ห้องรับแขก หรือห้องนอนที่โดนแดดบ่าย</li>
          <li><strong>900 - 1000:</strong> สำหรับห้องทำงาน โฮมออฟฟิศ หรือห้องที่มีผนังกระจกเยอะ โดนแดดจัด</li>
          <li><strong>1000 - 1200:</strong> สำหรับร้านอาหาร ร้านกาแฟ มินิมาร์ท หรือห้องที่มีคนพลุกพล่าน มีความร้อนจากเครื่องใช้ไฟฟ้า</li>
        </ul>
        <p><em>ตัวอย่าง:</em> ห้องนอนขนาด กว้าง 4 เมตร ยาว 5 เมตร ไม่โดนแดดบ่าย<br/>
        พื้นที่ = 20 ตารางเมตร<br/>
        BTU = 20 × 700 = 14,000 BTU<br/>
        ในกรณีนี้ ควรเลือกซื้อแอร์ขนาด <strong>15,000 BTU</strong> (เนื่องจากแอร์ขนาด 14,000 BTU ไม่มีในตลาดทั่วไป)</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ปัจจัยอื่นๆ ที่ต้องนำมาพิจารณาบวก BTU เพิ่ม</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><strong>ความสูงของเพดาน:</strong> สูตรปกติคำนวณที่ความสูงเพดานไม่เกิน 2.5 - 3 เมตร หากห้องคุณเป็นแบบ Double Volume (เพดานสูงโปร่ง) ต้องบวก BTU เพิ่มอีกประมาณ 10-15% หรือคำนวณเป็นปริมาตร (กว้าง×ยาว×สูง) แทน</li>
          <li><strong>เครื่องใช้ไฟฟ้าในห้อง:</strong> หากในห้องมีคอมพิวเตอร์หลายเครื่อง เซิร์ฟเวอร์ ตู้เย็น หรือเตาแม่เหล็กไฟฟ้า ควรบวก BTU เพิ่มตามความร้อนที่แผ่ออกมา</li>
          <li><strong>จำนวนคน:</strong> ปกติจะเผื่อไว้สำหรับ 1-3 คน หากเป็นห้องประชุมหรือห้องที่คนอยู่รวมกันเยอะๆ ให้บวกเพิ่มอีก 500 BTU ต่อคน (เกินจาก 3 คนแรก)</li>
        </ol>

        <p className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          <strong>แอร์ Inverter ช่วยได้:</strong> ปัจจุบันแอร์ระบบอินเวอร์เตอร์ (Inverter) ได้รับความนิยมมาก เพราะคอมเพรสเซอร์สามารถปรับลดรอบการทำงานได้ตามอุณหภูมิห้องโดยไม่ต้องตัดการทำงาน ทำให้ประหยัดไฟกว่าและอุณหภูมิคงที่กว่า แนะนำให้เผื่อ BTU ให้ใหญ่ขึ้นมาอีก 1 สเต็ป (เช่น คำนวณได้ 11,000 อาจเลือกซื้อ 15,000 BTU อินเวอร์เตอร์) เพื่อให้คอมเพรสเซอร์ทำงานรอบต่ำได้ไวขึ้น ซึ่งจะยิ่งประหยัดไฟในระยะยาว
        </p>
      </article>
    </div>
  );
}
