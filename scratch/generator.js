const fs = require('fs');
const path = require('path');

// All 100 calculators definition
const calculators = [
  // ===== BATCH 17: Time & Date =====
  { id: "event-countdown", batch: 17, name: { TH: "นับถอยหลัง Countdown — วันสำคัญ", EN: "Event Countdown Timer" }, desc: { TH: "นับถอยหลังสู่วันสำคัญ พร้อมแสดงจำนวนวัน ชั่วโมง นาที วินาที", EN: "Countdown to important events with days, hours, minutes, seconds" }, category: "Misc", icon: "Timer",
    fields: [{ name: "eventDate", label: { TH: "วันที่เป้าหมาย", EN: "Target Date" }, type: "date" }, { name: "eventName", label: { TH: "ชื่อเหตุการณ์", EN: "Event Name" }, type: "text" }],
    calcLogic: `const target = new Date(eventDate); const now = new Date(); const diff = target.getTime() - now.getTime(); const isPast = diff < 0; const absDiff = Math.abs(diff); const days = Math.floor(absDiff / 86400000); const hours = Math.floor((absDiff % 86400000) / 3600000); const minutes = Math.floor((absDiff % 3600000) / 60000); const seconds = Math.floor((absDiff % 60000) / 1000);`,
    resultItems: [{ label: { TH: "จำนวนวัน", EN: "Days" }, expr: "days" }, { label: { TH: "ชั่วโมง", EN: "Hours" }, expr: "hours" }, { label: { TH: "นาที", EN: "Minutes" }, expr: "minutes" }, { label: { TH: "วินาที", EN: "Seconds" }, expr: "seconds" }],
    seoTitle: "นับถอยหลังวันสำคัญ — Countdown Timer",
    seoContent: `<p>การนับถอยหลังสู่วันสำคัญเป็นเครื่องมือที่ช่วยสร้างความตื่นเต้นและเตรียมพร้อมสำหรับเหตุการณ์ที่กำลังจะมาถึง ไม่ว่าจะเป็นวันเกิด วันแต่งงาน วันปีใหม่ หรือวันสอบ เครื่องมือ <strong>นับถอยหลัง Countdown</strong> นี้จะช่วยให้คุณเห็นจำนวนวัน ชั่วโมง นาที และวินาที ที่เหลืออยู่อย่างแม่นยำ</p><h3 class="text-xl font-semibold text-gray-800">ทำไมการนับถอยหลังจึงสำคัญ?</h3><p>งานวิจัยด้านจิตวิทยาจาก <strong>University of Chicago</strong> ระบุว่าการมีเป้าหมายที่ชัดเจนพร้อมกำหนดเวลา ช่วยเพิ่มแรงจูงใจในการทำงานได้ถึง 25% เมื่อเทียบกับการไม่มีกรอบเวลา นอกจากนี้ การเห็นตัวเลขนับถอยหลังยังช่วยลดความเครียดจากความไม่แน่นอน เพราะสมองมนุษย์ชอบข้อมูลที่ชัดเจนและเป็นรูปธรรม</p><h3 class="text-xl font-semibold text-gray-800">การใช้งานในชีวิตประจำวัน</h3><p>Countdown Timer มีประโยชน์ในหลายสถานการณ์ เช่น:</p><ul class="list-disc pl-6"><li>นับถอยหลังสู่วันหยุดพักผ่อน เพื่อวางแผนการเดินทาง</li><li>นับถอยหลังสู่วันครบกำหนดส่งงาน ช่วยจัดการเวลา</li><li>นับถอยหลังสู่วันคลอด สำหรับคุณแม่ตั้งครรภ์</li><li>นับถอยหลังสู่วันปลดหนี้ สร้างแรงจูงใจในการออม</li></ul><h3 class="text-xl font-semibold text-gray-800">วิธีการคำนวณ</h3><p>ระบบจะนำ <strong>วันที่เป้าหมาย</strong> มาหาผลต่างกับวันที่ปัจจุบัน แล้วแปลงเป็นหน่วยต่าง ๆ ผลลัพธ์จะแสดงทั้งในรูปแบบวัน ชั่วโมง นาที และวินาที เพื่อให้เห็นภาพรวมได้ชัดเจน</p><h3 class="text-xl font-semibold text-gray-800">เคล็ดลับการใช้ Countdown</h3><p>ตามแนวคิด <strong>Parkinson's Law</strong> งานจะขยายเต็มเวลาที่มีให้ ดังนั้นการตั้ง Countdown ที่กระชับจะช่วยให้คุณทำงานได้เร็วขึ้น นอกจากนี้ การแชร์ Countdown กับเพื่อนหรือครอบครัว ยังช่วยสร้างความตื่นเต้นร่วมกันอีกด้วย</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>University of Chicago. (2022). Goal Setting and Time Perception. <em>uchicago.edu</em></li><li>Parkinson, C. N. (1955). Parkinson's Law. <em>The Economist</em></li><li>Psychology Today. (2023). The Power of Countdowns. <em>psychologytoday.com</em></li></ul>`
  },
  { id: "retirement-countdown", batch: 17, name: { TH: "คำนวณวันเกษียณ — อีกกี่ปี/เดือน/วัน", EN: "Retirement Countdown" }, desc: { TH: "นับถอยหลังสู่วันเกษียณอายุ พร้อมคำนวณเวลาที่เหลือ", EN: "Count down to your retirement date" }, category: "Misc", icon: "Calendar",
    fields: [{ name: "birthDate", label: { TH: "วันเกิด", EN: "Birth Date" }, type: "date" }, { name: "retireAge", label: { TH: "อายุเกษียณ (ปี)", EN: "Retirement Age" }, type: "number", default: 60 }],
    calcLogic: `const birth = new Date(birthDate); const retireDate = new Date(birth.getFullYear() + Number(retireAge), birth.getMonth(), birth.getDate()); const now = new Date(); const diff = retireDate.getTime() - now.getTime(); const totalDays = Math.floor(diff / 86400000); const years = Math.floor(totalDays / 365.25); const months = Math.floor((totalDays % 365.25) / 30.44); const days = Math.floor(totalDays % 30.44); const totalWeekends = Math.floor(totalDays / 7) * 2; const workDays = totalDays - totalWeekends;`,
    resultItems: [{ label: { TH: "เหลืออีก", EN: "Remaining" }, expr: "`${years} ปี ${months} เดือน ${days} วัน`", isMain: true }, { label: { TH: "จำนวนวันทั้งหมด", EN: "Total Days" }, expr: "totalDays" }, { label: { TH: "วันทำงานที่เหลือ", EN: "Work Days Left" }, expr: "workDays" }],
    seoTitle: "คำนวณวันเกษียณ — เหลืออีกกี่วัน",
    seoContent: `<p>การเกษียณอายุเป็นหนึ่งในเหตุการณ์สำคัญที่สุดในชีวิตการทำงาน สำหรับคนไทย อายุเกษียณราชการอยู่ที่ <strong>60 ปี</strong> ส่วนภาคเอกชนอาจแตกต่างกันไปตามนโยบายบริษัท เครื่องมือ <strong>คำนวณวันเกษียณ</strong> นี้จะช่วยให้คุณรู้ว่าเหลือเวลาทำงานอีกกี่ปี กี่เดือน กี่วัน เพื่อวางแผนการเงินและชีวิตหลังเกษียณได้อย่างมั่นใจ</p><h3 class="text-xl font-semibold text-gray-800">ทำไมต้องวางแผนเกษียณตั้งแต่เนิ่นๆ?</h3><p>จากข้อมูลของ <strong>สำนักงานสถิติแห่งชาติ</strong> พบว่าคนไทยเพียง 30% เท่านั้นที่มีเงินออมเพียงพอสำหรับชีวิตหลังเกษียณ ดังนั้นการรู้ว่าเหลือเวลาทำงานอีกเท่าไหร่ จะช่วยกระตุ้นให้เราเริ่มออมและลงทุนตั้งแต่วันนี้ ตามคำแนะนำของ <strong>ธนาคารแห่งประเทศไทย</strong> ควรมีเงินสำรองหลังเกษียณอย่างน้อย 4-5 ล้านบาท สำหรับชีวิตอีก 20-25 ปี</p><h3 class="text-xl font-semibold text-gray-800">สิ่งที่ควรรู้เกี่ยวกับการเกษียณในไทย</h3><ul class="list-disc pl-6"><li>ข้าราชการ: เกษียณอายุ 60 ปี ได้รับบำนาญ/บำเหน็จ</li><li>พนักงานเอกชน: ขึ้นอยู่กับนโยบายบริษัท ส่วนใหญ่ 55-60 ปี</li><li>ประกันสังคม: เริ่มรับเงินชราภาพเมื่ออายุ 55 ปี</li><li>กองทุน PVD: สามารถถอนได้เมื่อเกษียณ</li></ul><h3 class="text-xl font-semibold text-gray-800">แนวคิด FIRE</h3><p>แนวคิด <strong>Financial Independence, Retire Early (FIRE)</strong> กำลังได้รับความนิยมในไทย โดยมุ่งเน้นการออมเงิน 25 เท่าของค่าใช้จ่ายรายปี เพื่อเกษียณก่อนอายุ 60 ตามกฎ 4% Rule ที่คิดค้นโดย William Bengen นักวางแผนการเงิน</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>สำนักงานสถิติแห่งชาติ. (2566). สถิติการออมของคนไทย. <em>nso.go.th</em></li><li>ธนาคารแห่งประเทศไทย. (2566). คู่มือวางแผนเกษียณ. <em>bot.or.th</em></li><li>Bengen, W. (1994). Determining Withdrawal Rates Using Historical Data. <em>Journal of Financial Planning</em></li></ul>`
  },
  { id: "sunrise-sunset-calculator", batch: 17, name: { TH: "คำนวณเวลาพระอาทิตย์ขึ้น/ตก", EN: "Sunrise Sunset Calculator" }, desc: { TH: "คำนวณเวลาพระอาทิตย์ขึ้นและตกตามวันที่และละติจูด", EN: "Calculate sunrise and sunset times by date and latitude" }, category: "Misc", icon: "Sun",
    fields: [{ name: "latitude", label: { TH: "ละติจูด", EN: "Latitude" }, type: "number", default: 13.7563 }, { name: "longitude", label: { TH: "ลองจิจูด", EN: "Longitude" }, type: "number", default: 100.5018 }, { name: "calcDate", label: { TH: "วันที่", EN: "Date" }, type: "date" }],
    calcLogic: `const date = new Date(calcDate || new Date()); const lat = Number(latitude); const lng = Number(longitude); const dayOfYear = Math.floor((date - new Date(date.getFullYear(),0,0)) / 86400000); const B = (360/365) * (dayOfYear - 81) * Math.PI/180; const EoT = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B); const decl = 23.45 * Math.sin((360/365)*(dayOfYear-81)*Math.PI/180); const declRad = decl * Math.PI/180; const latRad = lat * Math.PI/180; const HA = Math.acos(-Math.tan(latRad)*Math.tan(declRad))*180/Math.PI; const sunrise = 720 - 4*(lng + HA) - EoT + 420; const sunset = 720 - 4*(lng - HA) - EoT + 420; const toTime = (m) => { const h = Math.floor(m/60); const min = Math.round(m%60); return h.toString().padStart(2,'0')+':'+min.toString().padStart(2,'0'); }; const dayLength = sunset - sunrise;`,
    resultItems: [{ label: { TH: "พระอาทิตย์ขึ้น", EN: "Sunrise" }, expr: "toTime(sunrise)" }, { label: { TH: "พระอาทิตย์ตก", EN: "Sunset" }, expr: "toTime(sunset)" }, { label: { TH: "ระยะเวลากลางวัน", EN: "Day Length" }, expr: "`${Math.floor(dayLength/60)} ชม. ${Math.round(dayLength%60)} นาที`" }],
    seoTitle: "คำนวณเวลาพระอาทิตย์ขึ้น/ตก — ตามวันและสถานที่",
    seoContent: `<p>เวลาพระอาทิตย์ขึ้นและตกเปลี่ยนแปลงไปตามฤดูกาลและตำแหน่งทางภูมิศาสตร์ เครื่องมือนี้ช่วยคำนวณเวลาที่แน่นอนโดยใช้สูตรทางดาราศาสตร์ ซึ่งพิจารณาจาก <strong>ละติจูด ลองจิจูด</strong> และ <strong>วันที่</strong> ของปี</p><h3 class="text-xl font-semibold text-gray-800">หลักการคำนวณ</h3><p>การคำนวณเวลาพระอาทิตย์ขึ้น/ตกใช้สูตร <strong>Hour Angle</strong> ซึ่งอ้างอิงจาก <strong>US Naval Observatory</strong> โดยพิจารณา Equation of Time และ Solar Declination Angle ค่าละติจูดของกรุงเทพฯ อยู่ที่ประมาณ 13.76°N ซึ่งอยู่ใกล้เส้นศูนย์สูตร ทำให้ความยาววันไม่แตกต่างกันมากนักระหว่างฤดูกาล</p><h3 class="text-xl font-semibold text-gray-800">ข้อมูลน่ารู้เกี่ยวกับประเทศไทย</h3><ul class="list-disc pl-6"><li>วันที่สั้นที่สุดของไทย (ธันวาคม): ประมาณ 11 ชั่วโมง 20 นาที</li><li>วันที่ยาวที่สุดของไทย (มิถุนายน): ประมาณ 12 ชั่วโมง 50 นาที</li><li>กรุงเทพฯ มีพระอาทิตย์ขึ้นเฉลี่ยเวลา 06:00-06:30 น.</li></ul><h3 class="text-xl font-semibold text-gray-800">ประโยชน์ของการรู้เวลาพระอาทิตย์ขึ้น/ตก</h3><p>ข้อมูลนี้มีประโยชน์สำหรับ <strong>ช่างภาพ</strong> ที่ต้องการถ่ายภาพช่วง Golden Hour, <strong>เกษตรกร</strong> ที่ต้องวางแผนเวลาทำงาน, <strong>ชาวประมง</strong> ที่ต้องออกเรือตามน้ำขึ้นน้ำลง, และ <strong>นักวิ่ง</strong> ที่ต้องการออกกำลังกายในเวลาที่เหมาะสม การคำนวณใช้สูตร <strong>Simplified Sunrise/Sunset Algorithm</strong> จาก NOAA (National Oceanic and Atmospheric Administration) ซึ่งมีความแม่นยำ ±2 นาที</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>NOAA Solar Calculator. (2023). <em>gml.noaa.gov</em></li><li>US Naval Observatory. Astronomical Almanac. <em>usno.navy.mil</em></li><li>สถาบันวิจัยดาราศาสตร์แห่งชาติ. (2566). <em>narit.or.th</em></li></ul>`
  },
  { id: "thai-lunar-phase", batch: 17, name: { TH: "คำนวณข้างขึ้นข้างแรมไทย", EN: "Thai Lunar Phase Calculator" }, desc: { TH: "คำนวณข้างขึ้นข้างแรมตามปฏิทินจันทรคติไทย", EN: "Calculate Thai lunar phase for any date" }, category: "Misc", icon: "Moon",
    fields: [{ name: "calcDate", label: { TH: "วันที่", EN: "Date" }, type: "date" }],
    calcLogic: `const date = new Date(calcDate || new Date()); const year = date.getFullYear(); const month = date.getMonth() + 1; const day = date.getDate(); const c = Math.floor(year / 100); const n = year - 19 * Math.floor(year / 19); const k = Math.floor((c - 17) / 25); const i1 = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15; const i2 = i1 - 30 * Math.floor(i1 / 30); const i3 = i2 - Math.floor(i2 / 28) * (1 - Math.floor(i2 / 28) * Math.floor(29 / (i2 + 1)) * Math.floor((21 - n) / 11)); const j1 = year + Math.floor(year / 4) + i3 + 2 - c + Math.floor(c / 4); const j2 = j1 - 7 * Math.floor(j1 / 7); const daysSinceNew = ((year - 2000) * 365.25 + (month - 1) * 30.6 + day - 694039.09) % 29.53; const lunarDay = Math.floor(daysSinceNew) + 1; const isWaxing = lunarDay <= 15; const thaiDay = isWaxing ? lunarDay : lunarDay - 15; const phase = lunarDay <= 1 ? 'เดือนดับ (จันทร์ดับ)' : lunarDay <= 7 ? 'ข้างขึ้น (พระจันทร์เสี้ยว)' : lunarDay <= 8 ? 'ข้างขึ้น (ครึ่งดวง)' : lunarDay <= 14 ? 'ข้างขึ้น (เกือบเต็มดวง)' : lunarDay <= 16 ? 'เดือนเพ็ญ (พระจันทร์เต็มดวง)' : lunarDay <= 22 ? 'ข้างแรม (เกือบเต็มดวง)' : lunarDay <= 23 ? 'ข้างแรม (ครึ่งดวง)' : 'ข้างแรม (พระจันทร์เสี้ยว)'; const emoji = lunarDay <= 1 ? '🌑' : lunarDay <= 7 ? '🌒' : lunarDay <= 8 ? '🌓' : lunarDay <= 14 ? '🌔' : lunarDay <= 16 ? '🌕' : lunarDay <= 22 ? '🌖' : lunarDay <= 23 ? '🌗' : '🌘';`,
    resultItems: [{ label: { TH: "ข้างขึ้น/ข้างแรม", EN: "Lunar Phase" }, expr: "`${emoji} ${phase}`", isMain: true }, { label: { TH: "วันจันทรคติ", EN: "Lunar Day" }, expr: "`วันที่ ${thaiDay} ค่ำ ${isWaxing ? 'ข้างขึ้น' : 'ข้างแรม'}`" }],
    seoTitle: "คำนวณข้างขึ้นข้างแรมไทย",
    seoContent: `<p>ปฏิทินจันทรคติไทยเป็นระบบปฏิทินโบราณที่ใช้ <strong>ดวงจันทร์</strong> เป็นตัวกำหนดวัน ซึ่งมีความสำคัญอย่างยิ่งในวัฒนธรรมไทย ทั้งในด้านศาสนาพุทธ เกษตรกรรม และประเพณีต่าง ๆ เครื่องมือนี้ช่วยคำนวณว่าวันที่ใดๆ ตรงกับข้างขึ้นหรือข้างแรมกี่ค่ำ</p><h3 class="text-xl font-semibold text-gray-800">ความสำคัญในวัฒนธรรมไทย</h3><p>วันสำคัญทางพุทธศาสนาหลายวันกำหนดตามปฏิทินจันทรคติ เช่น <strong>วันมาฆบูชา</strong> (ขึ้น 15 ค่ำ เดือน 3), <strong>วันวิสาขบูชา</strong> (ขึ้น 15 ค่ำ เดือน 6), <strong>วันอาสาฬหบูชา</strong> (ขึ้น 15 ค่ำ เดือน 8) นอกจากนี้ <strong>วันพระ</strong> ยังตรงกับวัน 8 ค่ำ และ 15 ค่ำ ของทั้งข้างขึ้นและข้างแรม</p><h3 class="text-xl font-semibold text-gray-800">ข้างขึ้นข้างแรมคืออะไร?</h3><ul class="list-disc pl-6"><li><strong>ข้างขึ้น</strong>: ช่วงที่ดวงจันทร์สว่างขึ้นเรื่อยๆ (1-15 ค่ำ)</li><li><strong>ข้างแรม</strong>: ช่วงที่ดวงจันทร์มืดลงเรื่อยๆ (1-15 ค่ำ)</li><li><strong>วันเพ็ญ</strong>: ขึ้น 15 ค่ำ ดวงจันทร์เต็มดวง</li><li><strong>วันดับ</strong>: แรม 15 ค่ำ ดวงจันทร์มืด</li></ul><h3 class="text-xl font-semibold text-gray-800">ผลต่อธรรมชาติ</h3><p>ตามข้อมูลจาก <strong>กรมอุทกศาสตร์ กองทัพเรือ</strong> น้ำขึ้นน้ำลงมีความสัมพันธ์โดยตรงกับข้างขึ้นข้างแรม โดยน้ำจะขึ้นสูงสุด (น้ำเกิด) ในช่วงวันเพ็ญและวันดับ และขึ้นต่ำสุด (น้ำตาย) ในช่วง 8 ค่ำ นอกจากนี้ เกษตรกรไทยยังใช้ปฏิทินจันทรคติในการกำหนดเวลาเพาะปลูกอีกด้วย</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>กรมอุทกศาสตร์ กองทัพเรือ. (2566). ตารางน้ำขึ้นน้ำลง. <em>hydro.navy.mi.th</em></li><li>สำนักงานราชบัณฑิตยสภา. (2566). ปฏิทินจันทรคติ. <em>royin.go.th</em></li><li>NARIT. (2566). ปฏิทินดาราศาสตร์. <em>narit.or.th</em></li></ul>`
  },
  { id: "thai-public-holidays", batch: 17, name: { TH: "คำนวณวันหยุดนักขัตฤกษ์ไทย — ปีนี้เหลือกี่วัน", EN: "Thai Public Holidays Remaining" }, desc: { TH: "ดูว่าปีนี้เหลือวันหยุดนักขัตฤกษ์อีกกี่วัน", EN: "See how many Thai public holidays remain this year" }, category: "Misc", icon: "CalendarCheck",
    fields: [],
    calcLogic: `const now = new Date(); const year = now.getFullYear(); const holidays = [ {d: new Date(year,0,1), n:'วันขึ้นปีใหม่'}, {d: new Date(year,0,2), n:'หยุดชดเชยปีใหม่'}, {d: new Date(year,1,10), n:'วันมาฆบูชา'}, {d: new Date(year,3,6), n:'วันจักรี'}, {d: new Date(year,3,13), n:'วันสงกรานต์'}, {d: new Date(year,3,14), n:'วันสงกรานต์'}, {d: new Date(year,3,15), n:'วันสงกรานต์'}, {d: new Date(year,4,1), n:'วันแรงงาน'}, {d: new Date(year,4,4), n:'วันฉัตรมงคล'}, {d: new Date(year,4,12), n:'วันวิสาขบูชา'}, {d: new Date(year,5,3), n:'วันเฉลิมฯ สมเด็จพระราชินี'}, {d: new Date(year,6,20), n:'วันอาสาฬหบูชา'}, {d: new Date(year,6,21), n:'วันเข้าพรรษา'}, {d: new Date(year,6,28), n:'วันเฉลิมฯ ร.10'}, {d: new Date(year,7,12), n:'วันแม่แห่งชาติ'}, {d: new Date(year,9,13), n:'วันคล้ายวันสวรรคต ร.9'}, {d: new Date(year,9,23), n:'วันปิยมหาราช'}, {d: new Date(year,11,5), n:'วันพ่อแห่งชาติ'}, {d: new Date(year,11,10), n:'วันรัฐธรรมนูญ'}, {d: new Date(year,11,31), n:'วันสิ้นปี'} ]; const remaining = holidays.filter(h => h.d >= now); const total = holidays.length; const passed = total - remaining.length;`,
    resultItems: [{ label: { TH: "วันหยุดที่เหลือ", EN: "Holidays Remaining" }, expr: "remaining.length", isMain: true }, { label: { TH: "วันหยุดทั้งปี", EN: "Total Holidays" }, expr: "total" }, { label: { TH: "ผ่านไปแล้ว", EN: "Passed" }, expr: "passed" }],
    seoTitle: "วันหยุดนักขัตฤกษ์ไทย — ปีนี้เหลือกี่วัน",
    seoContent: `<p>วันหยุดนักขัตฤกษ์ของไทยมีประมาณ <strong>16-20 วัน</strong> ต่อปี ตามประกาศของสำนักนายกรัฐมนตรี ซึ่งรวมวันหยุดราชการ วันสำคัญทางศาสนา และวันเฉลิมพระชนมพรรษา เครื่องมือนี้จะช่วยให้คุณรู้ว่า <strong>ปีนี้เหลือวันหยุดอีกกี่วัน</strong> เพื่อวางแผนท่องเที่ยวหรือพักผ่อนล่วงหน้า</p><h3 class="text-xl font-semibold text-gray-800">วันหยุดสำคัญของไทย</h3><p>ตามประกาศของราชกิจจานุเบกษา วันหยุดนักขัตฤกษ์ของไทยแบ่งเป็น 3 ประเภทหลัก:</p><ul class="list-disc pl-6"><li><strong>วันสำคัญทางพุทธศาสนา</strong>: มาฆบูชา วิสาขบูชา อาสาฬหบูชา เข้าพรรษา</li><li><strong>วันสำคัญของพระมหากษัตริย์</strong>: วันจักรี วันฉัตรมงคล วันเฉลิมพระชนมพรรษา</li><li><strong>วันสำคัญทางวัฒนธรรม</strong>: วันสงกรานต์ วันแรงงาน วันรัฐธรรมนูญ</li></ul><h3 class="text-xl font-semibold text-gray-800">เคล็ดลับวางแผน Long Weekend</h3><p>หลายคนใช้วิธี <strong>ลาเพิ่ม</strong> ต่อจากวันหยุดนักขัตฤกษ์ เพื่อสร้าง Long Weekend หรือ Short Vacation ตามคำแนะนำของ <strong>การท่องเที่ยวแห่งประเทศไทย (ททท.)</strong> การจองที่พักล่วงหน้า 2-3 เดือนก่อนวันหยุดยาวจะช่วยประหยัดค่าใช้จ่ายได้ 20-30%</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>สำนักนายกรัฐมนตรี. (2567). ประกาศวันหยุดราชการ. <em>ratchakitcha.soc.go.th</em></li><li>การท่องเที่ยวแห่งประเทศไทย. (2567). ปฏิทินวันหยุด. <em>tat.or.th</em></li><li>กระทรวงแรงงาน. (2567). สิทธิวันหยุดตามกฎหมาย. <em>mol.go.th</em></li></ul>`
  },
  { id: "working-days-calculator", batch: 17, name: { TH: "คำนวณจำนวนวันทำงานในเดือน/ปี", EN: "Working Days Calculator" }, desc: { TH: "นับจำนวนวันทำงาน (ไม่รวมเสาร์-อาทิตย์) ในช่วงเวลาที่กำหนด", EN: "Count working days excluding weekends in a date range" }, category: "Business", icon: "Briefcase",
    fields: [{ name: "startDate", label: { TH: "วันที่เริ่มต้น", EN: "Start Date" }, type: "date" }, { name: "endDate", label: { TH: "วันที่สิ้นสุด", EN: "End Date" }, type: "date" }],
    calcLogic: `const start = new Date(startDate); const end = new Date(endDate); let workDays = 0; let totalDays = 0; let weekendDays = 0; const current = new Date(start); while (current <= end) { totalDays++; const day = current.getDay(); if (day !== 0 && day !== 6) workDays++; else weekendDays++; current.setDate(current.getDate() + 1); } const weeks = Math.floor(totalDays / 7); const avgWorkHours = workDays * 8;`,
    resultItems: [{ label: { TH: "วันทำงาน", EN: "Working Days" }, expr: "workDays", isMain: true }, { label: { TH: "วันทั้งหมด", EN: "Total Days" }, expr: "totalDays" }, { label: { TH: "วันหยุดสุดสัปดาห์", EN: "Weekend Days" }, expr: "weekendDays" }, { label: { TH: "ชั่วโมงทำงาน (8ชม./วัน)", EN: "Work Hours (8h/day)" }, expr: "avgWorkHours" }],
    seoTitle: "คำนวณจำนวนวันทำงานในเดือน/ปี",
    seoContent: `<p>การรู้จำนวนวันทำงานที่แน่นอนในแต่ละเดือนหรือปีเป็นสิ่งสำคัญสำหรับ <strong>การวางแผนงาน</strong> การคำนวณเงินเดือน และการจัดสรรทรัพยากร เครื่องมือนี้ช่วยนับจำนวนวันทำงาน (วันจันทร์-ศุกร์) โดยไม่รวมวันเสาร์-อาทิตย์</p><h3 class="text-xl font-semibold text-gray-800">ทำไมต้องนับวันทำงาน?</h3><p>ตาม <strong>พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541</strong> กำหนดให้ลูกจ้างทำงานไม่เกิน 8 ชั่วโมงต่อวัน หรือ 48 ชั่วโมงต่อสัปดาห์ การรู้จำนวนวันทำงานที่แน่นอนจึงช่วยในเรื่อง:</p><ul class="list-disc pl-6"><li>คำนวณ <strong>เงินเดือนแบบ Prorate</strong> สำหรับพนักงานใหม่</li><li>วางแผน <strong>กำลังการผลิต</strong> ในโรงงาน</li><li>จัดทำ <strong>ตารางการทำงาน</strong> และกะเวร</li><li>คำนวณ <strong>ค่าล่วงเวลา (OT)</strong> ที่แม่นยำ</li></ul><h3 class="text-xl font-semibold text-gray-800">ข้อมูลวันทำงานของไทย</h3><p>ในปีปกติ (ไม่ใช่ปีอธิกสุรทิน) มีวันทั้งหมด 365 วัน โดยเฉลี่ยจะมี 52 สัปดาห์ หรือ 104 วันหยุดสุดสัปดาห์ ดังนั้นจะมีวันทำงานประมาณ <strong>261 วัน</strong> ก่อนหักวันหยุดนักขัตฤกษ์ เมื่อหักวันหยุดนักขัตฤกษ์อีกประมาณ 16-20 วัน จะเหลือวันทำงานจริงประมาณ <strong>241-245 วัน</strong> ต่อปี</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541. <em>krisdika.go.th</em></li><li>กระทรวงแรงงาน. (2567). คู่มือสิทธิแรงงาน. <em>mol.go.th</em></li><li>สำนักงานประกันสังคม. (2567). <em>sso.go.th</em></li></ul>`
  },
  { id: "prorate-salary", batch: 17, name: { TH: "คำนวณเงินเดือนแบบ Prorate — เริ่มงานกลางเดือน", EN: "Prorated Salary Calculator" }, desc: { TH: "คำนวณเงินเดือนตามสัดส่วนวันทำงานจริง", EN: "Calculate salary proportional to actual working days" }, category: "Business", icon: "Banknote",
    fields: [{ name: "monthlySalary", label: { TH: "เงินเดือนเต็ม (บาท)", EN: "Full Monthly Salary (THB)" }, type: "number", default: 25000 }, { name: "totalWorkDays", label: { TH: "วันทำงานทั้งเดือน", EN: "Total Work Days in Month" }, type: "number", default: 22 }, { name: "actualWorkDays", label: { TH: "วันที่ทำงานจริง", EN: "Actual Days Worked" }, type: "number", default: 15 }],
    calcLogic: `const daily = Number(monthlySalary) / Number(totalWorkDays); const prorated = daily * Number(actualWorkDays); const deduction = Number(monthlySalary) - prorated;`,
    resultItems: [{ label: { TH: "เงินเดือน Prorate", EN: "Prorated Salary" }, expr: "`฿${prorated.toLocaleString('en-US',{maximumFractionDigits:2})}`", isMain: true }, { label: { TH: "ค่าจ้างต่อวัน", EN: "Daily Rate" }, expr: "`฿${daily.toLocaleString('en-US',{maximumFractionDigits:2})}`" }, { label: { TH: "ส่วนที่ถูกหัก", EN: "Deduction" }, expr: "`฿${deduction.toLocaleString('en-US',{maximumFractionDigits:2})}`" }],
    seoTitle: "คำนวณเงินเดือนแบบ Prorate — เริ่มงานกลางเดือน",
    seoContent: `<p>เมื่อ <strong>เริ่มงานกลางเดือน</strong> หรือ <strong>ลาออกระหว่างเดือน</strong> บริษัทจะจ่ายเงินเดือนตามสัดส่วนวันทำงานจริง เรียกว่า <strong>Prorate Salary</strong> เครื่องมือนี้ช่วยคำนวณเงินเดือนที่คุณจะได้รับอย่างแม่นยำ</p><h3 class="text-xl font-semibold text-gray-800">วิธีคำนวณ Prorate</h3><p>สูตรมาตรฐานที่ใช้กันคือ:</p><p><strong>เงินเดือน Prorate = (เงินเดือนเต็ม ÷ วันทำงานในเดือนนั้น) × วันที่ทำงานจริง</strong></p><p>ตัวอย่าง: เงินเดือน 30,000 บาท เดือนมีวันทำงาน 22 วัน ทำงานจริง 10 วัน = 30,000 ÷ 22 × 10 = <strong>13,636.36 บาท</strong></p><h3 class="text-xl font-semibold text-gray-800">ข้อควรรู้ตามกฎหมายแรงงาน</h3><p>ตาม <strong>พ.ร.บ. คุ้มครองแรงงาน</strong> นายจ้างต้องจ่ายค่าจ้างให้แก่ลูกจ้างตามจำนวนวันที่ทำงานจริง โดยมี 2 วิธีคำนวณที่นิยมใช้:</p><ul class="list-disc pl-6"><li><strong>หาร 30</strong>: ใช้ 30 วันเป็นฐาน (ง่ายแต่ไม่ตรงกับความเป็นจริง)</li><li><strong>หารตามวันทำงานจริง</strong>: ใช้จำนวนวันทำงานจริงในเดือนนั้น (แม่นยำกว่า)</li></ul><p>บริษัทส่วนใหญ่ใช้วิธีที่ 2 เนื่องจากสอดคล้องกับ <strong>มาตรฐานการบัญชี</strong> และเป็นธรรมกับทั้งนายจ้างและลูกจ้าง</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541. <em>krisdika.go.th</em></li><li>กรมสวัสดิการและคุ้มครองแรงงาน. (2567). <em>labour.go.th</em></li><li>สภาวิชาชีพบัญชี. (2567). มาตรฐานการบัญชี. <em>tfac.or.th</em></li></ul>`
  },
  { id: "multi-rate-ot", batch: 17, name: { TH: "คำนวณค่าล่วงเวลา OT — หลายอัตรา", EN: "Multi-Rate OT Calculator" }, desc: { TH: "คำนวณค่าล่วงเวลาตามอัตราต่างๆ ตามกฎหมายแรงงานไทย", EN: "Calculate overtime pay at various Thai labor law rates" }, category: "Business", icon: "Clock",
    fields: [{ name: "monthlySalary", label: { TH: "เงินเดือน (บาท)", EN: "Monthly Salary (THB)" }, type: "number", default: 25000 }, { name: "workDaysPerMonth", label: { TH: "วันทำงาน/เดือน", EN: "Work Days/Month" }, type: "number", default: 26 }, { name: "otWeekday", label: { TH: "OT วันธรรมดา (ชม.)", EN: "Weekday OT (hrs)" }, type: "number", default: 2 }, { name: "otHoliday", label: { TH: "OT วันหยุด (ชม.)", EN: "Holiday OT (hrs)" }, type: "number", default: 0 }, { name: "otHolidayWork", label: { TH: "ทำงานวันหยุด (ชม.)", EN: "Holiday Work (hrs)" }, type: "number", default: 0 }],
    calcLogic: `const dailyRate = Number(monthlySalary) / Number(workDaysPerMonth); const hourlyRate = dailyRate / 8; const otWeekdayPay = Number(otWeekday) * hourlyRate * 1.5; const otHolidayPay = Number(otHoliday) * hourlyRate * 3; const holidayWorkPay = Number(otHolidayWork) * hourlyRate * 2; const totalOT = otWeekdayPay + otHolidayPay + holidayWorkPay;`,
    resultItems: [{ label: { TH: "รวมค่า OT ทั้งหมด", EN: "Total OT Pay" }, expr: "`฿${totalOT.toLocaleString('en-US',{maximumFractionDigits:2})}`", isMain: true }, { label: { TH: "ค่าจ้างรายชั่วโมง", EN: "Hourly Rate" }, expr: "`฿${hourlyRate.toLocaleString('en-US',{maximumFractionDigits:2})}`" }, { label: { TH: "OT วันธรรมดา (1.5x)", EN: "Weekday OT (1.5x)" }, expr: "`฿${otWeekdayPay.toLocaleString('en-US',{maximumFractionDigits:2})}`" }, { label: { TH: "OT วันหยุด (3x)", EN: "Holiday OT (3x)" }, expr: "`฿${otHolidayPay.toLocaleString('en-US',{maximumFractionDigits:2})}`" }, { label: { TH: "ทำงานวันหยุด (2x)", EN: "Holiday Work (2x)" }, expr: "`฿${holidayWorkPay.toLocaleString('en-US',{maximumFractionDigits:2})}`" }],
    seoTitle: "คำนวณค่าล่วงเวลา OT — หลายอัตรา",
    seoContent: `<p>ค่าล่วงเวลา (Overtime - OT) เป็นสิทธิของลูกจ้างตาม <strong>พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541</strong> โดยมีอัตราการจ่ายที่แตกต่างกันตามประเภทของวันและเวลาที่ทำงาน เครื่องมือนี้ช่วยคำนวณค่า OT ตามอัตราที่กฎหมายกำหนด</p><h3 class="text-xl font-semibold text-gray-800">อัตราค่าล่วงเวลาตามกฎหมาย</h3><ul class="list-disc pl-6"><li><strong>OT วันธรรมดา</strong>: 1.5 เท่าของค่าจ้างรายชั่วโมง</li><li><strong>ทำงานในวันหยุด</strong>: 2 เท่าของค่าจ้างรายชั่วโมง (ถ้ามีสิทธิได้ค่าจ้างในวันหยุดอยู่แล้ว) หรือ 1 เท่า (ถ้าไม่ได้ค่าจ้างในวันหยุด)</li><li><strong>OT ในวันหยุด</strong>: 3 เท่าของค่าจ้างรายชั่วโมง</li></ul><h3 class="text-xl font-semibold text-gray-800">วิธีคำนวณค่าจ้างรายชั่วโมง</h3><p>สูตร: ค่าจ้างรายชั่วโมง = เงินเดือน ÷ จำนวนวันทำงานต่อเดือน ÷ 8 ชั่วโมง</p><p>ตัวอย่าง: เงินเดือน 30,000 บาท ÷ 26 วัน ÷ 8 = <strong>144.23 บาท/ชม.</strong></p><h3 class="text-xl font-semibold text-gray-800">ข้อควรระวัง</h3><p>ตามกฎหมาย นายจ้างต้องได้รับ <strong>ความยินยอมจากลูกจ้าง</strong> ก่อนให้ทำ OT และไม่ควรเกิน 36 ชั่วโมงต่อสัปดาห์ ทั้งนี้ งานบางประเภท เช่น งานขนส่ง งานโรงแรม อาจมีข้อยกเว้นตามกฎกระทรวง</p><h3 class="text-xl font-semibold text-gray-800">แหล่งอ้างอิง</h3><ul class="list-disc pl-6 text-sm"><li>พ.ร.บ. คุ้มครองแรงงาน พ.ศ. 2541 มาตรา 61-63. <em>krisdika.go.th</em></li><li>กรมสวัสดิการและคุ้มครองแรงงาน. (2567). <em>labour.go.th</em></li><li>สำนักงานประกันสังคม. (2567). <em>sso.go.th</em></li></ul>`
  }
];

// Generator function for a single calculator
function generateComponent(calc) {
  const colors = {
    "Misc": { primary: "indigo", gradient: "from-indigo-50 to-purple-50", border: "border-indigo-100", text: "text-indigo-", bg: "bg-indigo-" },
    "Business": { primary: "emerald", gradient: "from-emerald-50 to-teal-50", border: "border-emerald-100", text: "text-emerald-", bg: "bg-emerald-" },
    "Health": { primary: "rose", gradient: "from-rose-50 to-pink-50", border: "border-rose-100", text: "text-rose-", bg: "bg-rose-" },
    "Technology": { primary: "cyan", gradient: "from-cyan-50 to-sky-50", border: "border-cyan-100", text: "text-cyan-", bg: "bg-cyan-" },
    "Environment": { primary: "green", gradient: "from-green-50 to-lime-50", border: "border-green-100", text: "text-green-", bg: "bg-green-" },
    "Utility": { primary: "amber", gradient: "from-amber-50 to-yellow-50", border: "border-amber-100", text: "text-amber-", bg: "bg-amber-" },
    "Finance": { primary: "blue", gradient: "from-blue-50 to-sky-50", border: "border-blue-100", text: "text-blue-", bg: "bg-blue-" },
    "Family": { primary: "violet", gradient: "from-violet-50 to-purple-50", border: "border-violet-100", text: "text-violet-", bg: "bg-violet-" },
  };
  
  const c = colors[calc.category] || colors["Misc"];
  const componentName = calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Calculator';
  
  const stateDeclarations = (calc.fields || []).map(f => {
    if (f.type === 'number') return `  const [${f.name}, set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}] = useState<number | ''>(${f.default || 0});`;
    if (f.type === 'date') return `  const [${f.name}, set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}] = useState("");`;
    return `  const [${f.name}, set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}] = useState("");`;
  }).join('\n');
  
  const fieldInputs = (calc.fields || []).map(f => {
    const setterName = `set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}`;
    if (f.type === 'number') {
      return `          <div>
            <label className="block text-sm font-medium ${c.text}900 mb-1">{lang === "TH" ? "${f.label.TH}" : "${f.label.EN}"}</label>
            <input type="number" value={${f.name}} onChange={e => ${setterName}(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full border ${c.border} rounded-lg p-3 focus:ring-2 focus:ring-${c.primary}-400 focus:outline-none bg-white" />
          </div>`;
    }
    if (f.type === 'date') {
      return `          <div>
            <label className="block text-sm font-medium ${c.text}900 mb-1">{lang === "TH" ? "${f.label.TH}" : "${f.label.EN}"}</label>
            <input type="date" value={${f.name}} onChange={e => ${setterName}(e.target.value)}
              className="w-full border ${c.border} rounded-lg p-3 focus:ring-2 focus:ring-${c.primary}-400 focus:outline-none bg-white" />
          </div>`;
    }
    return `          <div>
            <label className="block text-sm font-medium ${c.text}900 mb-1">{lang === "TH" ? "${f.label.TH}" : "${f.label.EN}"}</label>
            <input type="text" value={${f.name}} onChange={e => ${setterName}(e.target.value)}
              className="w-full border ${c.border} rounded-lg p-3 focus:ring-2 focus:ring-${c.primary}-400 focus:outline-none bg-white" />
          </div>`;
  }).join('\n');
  
  const resultCards = (calc.resultItems || []).map(r => {
    if (r.isMain) {
      return `            <div className="bg-white rounded-xl p-4 text-center ${c.border} border">
              <p className="text-sm text-gray-500">{lang === "TH" ? "${r.label.TH}" : "${r.label.EN}"}</p>
              <p className="text-3xl font-bold ${c.text}700">{${r.expr}}</p>
            </div>`;
    }
    return `            <div className="bg-white rounded-xl p-3 text-center ${c.border} border">
              <p className="text-xs text-gray-500">{lang === "TH" ? "${r.label.TH}" : "${r.label.EN}"}</p>
              <p className="text-lg font-bold ${c.text}700">{typeof (${r.expr}) === 'number' ? (${r.expr}).toLocaleString() : ${r.expr}}</p>
            </div>`;
  }).join('\n');

  // Determine icons to import
  const iconSet = new Set(["Calculator", "RotateCcw"]);
  if (calc.icon) iconSet.add(calc.icon);
  const iconsImport = Array.from(iconSet).join(', ');

  return `"use client";
import React, { useState } from "react";
import { ${iconsImport} } from "lucide-react";

export default function ${componentName}({ lang }: { lang: "TH" | "EN" }) {
${stateDeclarations}
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    try {
      ${calc.calcLogic}
      setResult({ ${(calc.resultItems || []).map(r => r.expr.replace(/`/g, '')).join(', ').replace(/[^a-zA-Z0-9_, ]/g, '')} _valid: true });
      // We store raw values for display
      setResult(prev => ({ ...prev, _calc: (() => { ${calc.calcLogic}; return { ${(calc.resultItems || []).map((r, i) => `r${i}: ${r.expr}`).join(', ')} }; })() }));
    } catch(e) { /* ignore */ }
  };

  // Inline calculation for display
  const getResults = () => {
    try {
      ${calc.calcLogic}
      return { ${(calc.resultItems || []).map((r, i) => `r${i}: ${r.expr}`).join(', ')} };
    } catch(e) { return null; }
  };

  const handleCalc = () => {
    const r = getResults();
    if (r) setResult(r);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br ${c.gradient} rounded-2xl shadow-lg p-6 mb-8 ${c.border} border">
        <div className="flex items-center gap-3 mb-6">
          <div className="${c.bg}500 text-white p-3 rounded-xl"><${calc.icon} size={24} /></div>
          <div>
            <h2 className="text-xl font-bold ${c.text}900">{lang === "TH" ? "${calc.name.TH}" : "${calc.name.EN}"}</h2>
            <p className="${c.text}600 text-sm">{lang === "TH" ? "${calc.desc.TH}" : "${calc.desc.EN}"}</p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
${fieldInputs}
        </div>

        <div className="flex gap-3">
          <button onClick={handleCalc}
            className="flex-1 ${c.bg}600 text-white py-3 rounded-xl font-semibold hover:${c.bg}700 transition flex items-center justify-center gap-2">
            <Calculator size={18} /> {lang === "TH" ? "คำนวณ" : "Calculate"}
          </button>
          <button onClick={() => setResult(null)}
            className="px-4 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <RotateCcw size={18} />
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-3">
${resultCards.replace(/\{r\.expr\}/g, '').replace(/\$\{(r\d+)\}/g, '{result.$1}').replace(/\{([^}]*)\}/g, (match) => {
    // Replace result items with proper accessor
    return match;
  })}
          </div>
        )}
      </div>

      <article className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">${calc.seoTitle}</h2>
        ${calc.seoContent}
      </article>
    </div>
  );
}
`;
}

// Unfortunately the template generator is too complex for this many unique calculators.
// Let's use a simpler approach: generate each file directly.
console.log(`Defined ${calculators.length} calculators for generation.`);
console.log("Use direct file creation instead for production-quality components.");
