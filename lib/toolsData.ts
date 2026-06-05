import * as Icons from "lucide-react";

export type Lang = "TH" | "EN";

export type Calculator = {
  id: string;
  slug: string;
  name: string;
  desc: string;
  category: string;
  icon: any;
};

export const getCalcs = (lang: Lang): Calculator[] => [
  {
    id: "absolute-value",
    slug: "absolute-value",
    name: lang === "TH" ? "เครื่องมือหาค่าสัมบูรณ์" : "Absolute Value Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าสัมบูรณ์ (Absolute Value) ของจำนวนจริง และค่ามอดุลัสของจำนวนเชิงซ้อน พร้อมคำอธิบายทางคณิตศาสตร์" : "Find the absolute value of a real number or the modulus of a complex number.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "ac-repair-cost",
    slug: "คำนวณค่าบริการซ่อมแอร์",
    name: lang === "TH" ? "คำนวณค่าบริการซ่อมแอร์" : "AC Repair & Cleaning Cost Estimator",
    desc: lang === "TH" ? "ประมาณการค่าใช้จ่ายในการซ่อมแซมแอร์ ล้างแอร์ เติมน้ำยาแอร์ หรือเปลี่ยนอะไหล่ตามจริง เพื่อการเตรียมงบประมาณ" : "Estimate the expected cost of air conditioner maintenance, deep cleaning, refrigerant refills, and parts replacement.",
    category: "Utility",
    icon: Icons.Wrench
  },
  {
    id: "acre-to-hectare",
    slug: "acre-to-hectare",
    name: lang === "TH" ? "แปลงเอเคอร์เป็นเฮกตาร์" : "Acre to Hectare Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากเอเคอร์ (Acres) เป็น เฮกตาร์ (Hectares) พร้อมสูตรคำนวณ" : "Convert Acres to Hectares with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "acre-to-rai",
    slug: "acre-to-rai",
    name: lang === "TH" ? "แปลงเอเคอร์เป็นไร่" : "Acre to Rai Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงหน่วยพื้นที่จากเอเคอร์เป็นไร่ งาน และตารางวา" : "Convert area from acres to rai, ngan, and square wa",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "acre-to-sqm",
    slug: "acre-to-sqm",
    name: lang === "TH" ? "แปลงเอเคอร์เป็นตารางเมตร" : "Acre to Sq m Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากเอเคอร์ (Acres) เป็น ตารางเมตร (Square Meters) พร้อมสูตรคำนวณ" : "Convert Acres to Square Meters with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "admission-score-percentage",
    slug: "admission-score-percentage",
    name: lang === "TH" ? "เครื่องมือคำนวณเปรียบเทียบเปอร์เซ็นต์คะแนนสอบคัดเลือก" : "Admission Score Percentage Calculator",
    desc: lang === "TH" ? "คำนวณคะแนนรวมและเปอร์เซ็นต์คะแนนสอบคัดเลือกแบบทั่วไป (TCAS / Admission) ถ่วงน้ำหนักความสำคัญ พร้อมเปรียบเทียบคะแนนย้อนหลัง" : "Calculate and compare your weighted admission score and percentage with previous year cutoffs.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "agile-velocity",
    slug: "agile-velocity",
    name: lang === "TH" ? "คำนวณ Agile Sprint Velocity" : "Agile Sprint Velocity Calculator",
    desc: lang === "TH" ? "คำนวณความเร็วในการทำงานของทีม (Velocity) และคาดการณ์เวลาที่ใช้ในการเคลียร์ Backlog ทั้งหมด" : "Calculate team velocity and forecast the time required to complete the remaining backlog.",
    category: "Technology",
    icon: Icons.Activity
  },
  {
    id: "airbnb-profit-estimator",
    slug: "คำนวณกำไร-airbnb",
    name: lang === "TH" ? "คำนวณกำไรโฮมสเตย์ Airbnb" : "Airbnb Profit Estimator",
    desc: lang === "TH" ? "ประมาณการรายได้ ค่าธรรมเนียมแพลตฟอร์ม ค่าใช้จ่ายดำเนินงาน และกำไรสุทธิจากการปล่อยเช่ารายวัน" : "Estimate monthly revenue, platform fees, operational costs, and net profit for short-term rentals.",
    category: "Finance",
    icon: Icons.Key
  },
  {
    id: "antenna-length-frequency",
    slug: "คำนวณขนาดเสาอากาศ",
    name: lang === "TH" ? "คำนวณขนาดเสาอากาศ" : "Antenna Length and Frequency Calculator",
    desc: lang === "TH" ? "คำนวณความยาวทางกายภาพของเสาอากาศวิทยุประเภทต่างๆ (เช่น Dipole, Monopole) ตามความถี่ที่ต้องการใช้งาน" : "Calculate the physical length of radio antennas (e.g., Dipole, Monopole) based on target frequency and velocity factor.",
    category: "Utility",
    icon: Icons.Radio
  },
  {
    id: "arc-length-calculator",
    slug: "arc-length-calculator",
    name: lang === "TH" ? "เครื่องคำนวณความยาวส่วนโค้ง" : "Arc Length Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาความยาวส่วนโค้งของวงกลม จากรัศมีและมุมที่จุดศูนย์กลาง" : "Calculate the arc length of a circle using radius and central angle.",
    category: "Science",
    icon: Icons.CircleDashed
  },
  {
    id: "area-circle-diameter",
    slug: "area-circle-diameter",
    name: lang === "TH" ? "คำนวณพื้นที่วงกลม (จากเส้นผ่านศูนย์กลาง)" : "Circle Area Calculator (from Diameter)",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่วงกลมจากความยาวเส้นผ่านศูนย์กลาง" : "Calculate the area of a circle from its diameter.",
    category: "Science",
    icon: Icons.CircleDot
  },
  {
    id: "area-circle-radius",
    slug: "area-circle-radius",
    name: lang === "TH" ? "คำนวณพื้นที่วงกลม (จากรัศมี)" : "Circle Area Calculator (from Radius)",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่วงกลมจากความยาวของรัศมี" : "Calculate the area of a circle from its radius.",
    category: "Science",
    icon: Icons.Circle
  },
  {
    id: "area-ellipse",
    slug: "area-ellipse",
    name: lang === "TH" ? "คำนวณพื้นที่วงรี" : "Ellipse Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่วงรี พร้อมอธิบายสูตร" : "Calculate the area of an ellipse.",
    category: "Science",
    icon: Icons.CircleOff
  },
  {
    id: "area-hexagon",
    slug: "area-hexagon",
    name: lang === "TH" ? "พื้นที่หกเหลี่ยมด้านเท่า" : "Hexagon Area Calculator",
    desc: lang === "TH" ? "คำนวณพื้นที่รูปหกเหลี่ยมด้านเท่ามุมเท่า พร้อมสูตรและที่มาของการจัดเรียงแบบรังผึ้ง" : "Calculate the area of a regular hexagon from its side length.",
    category: "Science",
    icon: Icons.Hexagon
  },
  {
    id: "area-irregular-polygon",
    slug: "area-irregular-polygon",
    name: lang === "TH" ? "พื้นที่รูปทรงอิสระ (แบ่งส่วนสามเหลี่ยม)" : "Irregular Polygon Area Calculator (Triangulation)",
    desc: lang === "TH" ? "คำนวณพื้นที่รูปหลายเหลี่ยมด้านไม่เท่า รูปทรงอิสระ หรือที่ดินบิดเบี้ยว ด้วยเทคนิคการแบ่งพื้นที่เป็นรูปสามเหลี่ยม (Triangulation) รองรับสูตรของ Heron" : "Calculate the area of irregular polygons by dividing them into triangles and summing their areas.",
    category: "Science",
    icon: Icons.Shapes
  },
  {
    id: "area-pentagon",
    slug: "area-pentagon",
    name: lang === "TH" ? "พื้นที่ห้าเหลี่ยมด้านเท่า" : "Pentagon Area Calculator",
    desc: lang === "TH" ? "คำนวณพื้นที่รูปห้าเหลี่ยมด้านเท่ามุมเท่า พร้อมสูตร วิธีคิด และความรู้เกี่ยวกับห้าเหลี่ยม" : "Calculate the area of a regular pentagon from its side length.",
    category: "Science",
    icon: Icons.Pentagon
  },
  {
    id: "area-rectangle",
    slug: "area-rectangle",
    name: lang === "TH" ? "คำนวณพื้นที่สี่เหลี่ยมผืนผ้า" : "Rectangle Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่สี่เหลี่ยมผืนผ้าจากความกว้างและความยาว" : "Calculate the area of a rectangle from width and length",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "area-rhombus",
    slug: "area-rhombus",
    name: lang === "TH" ? "พื้นที่สี่เหลี่ยมขนมเปียกปูน" : "Rhombus Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่สี่เหลี่ยมขนมเปียกปูน (Rhombus Area Calculator) พร้อมสูตรและวิธีคิดละเอียด" : "Calculate the area of a rhombus using diagonals or base and height.",
    category: "Science",
    icon: Icons.Square
  },
  {
    id: "area-square",
    slug: "area-square",
    name: lang === "TH" ? "คำนวณพื้นที่สี่เหลี่ยมจัตุรัส" : "Square Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่สี่เหลี่ยมจัตุรัสจากความยาวด้าน" : "Calculate the area of a square from side length",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "area-trapezoid",
    slug: "area-trapezoid",
    name: lang === "TH" ? "คำนวณพื้นที่สี่เหลี่ยมคางหมู" : "Trapezoid Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่สี่เหลี่ยมคางหมู" : "Calculate the area of a trapezoid.",
    category: "Science",
    icon: Icons.Box
  },
  {
    id: "area-triangle",
    slug: "area-triangle",
    name: lang === "TH" ? "คำนวณพื้นที่สามเหลี่ยม" : "Triangle Area Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณพื้นที่สามเหลี่ยม พร้อมสูตรและวิธีการคำนวณ" : "Calculate the area of a triangle with formula and steps.",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "arithmetic-series-sum",
    slug: "arithmetic-series-sum",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลรวมของอนุกรมเลขคณิต (Arithmetic Series)" : "Arithmetic Series Sum Calculator",
    desc: lang === "TH" ? "คำนวณผลรวมของอนุกรมเลขคณิต หาผลบวก N พจน์แรก แสดงสูตรคำนวณและวิธีหาคำตอบแบบทีละขั้นตอนอย่างละเอียด" : "Calculate the sum of an arithmetic series given the initial term, common difference/last term, and number of terms.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "base-10-to-16",
    slug: "base-10-to-16",
    name: lang === "TH" ? "แปลงเลขฐาน 10 เป็นฐาน 16" : "Base 10 to Base 16 Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงเลขฐาน 10 (Decimal) เป็นเลขฐาน 16 (Hexadecimal)" : "Convert decimal (Base 10) numbers to hexadecimal (Base 16) numbers.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "base-10-to-2",
    slug: "base-10-to-2",
    name: lang === "TH" ? "แปลงเลขฐาน 10 เป็นฐาน 2" : "Base 10 to Base 2 Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงเลขฐาน 10 (Decimal) เป็นเลขฐาน 2 (Binary)" : "Convert decimal (Base 10) numbers to binary (Base 2) numbers.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "base-10-to-8",
    slug: "base-10-to-8",
    name: lang === "TH" ? "แปลงเลขฐาน 10 เป็นฐาน 8" : "Base 10 to Base 8 Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงเลขฐาน 10 (Decimal) เป็นเลขฐาน 8 (Octal)" : "Convert decimal (Base 10) numbers to octal (Base 8) numbers.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "base-16-to-10",
    slug: "base-16-to-10",
    name: lang === "TH" ? "เครื่องคำนวณแปลงเลขฐาน 16 เป็นเลขฐาน 10" : "Hexadecimal to Decimal Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงเลขฐาน 16 (Hexadecimal) เป็นเลขฐาน 10 (Decimal) พร้อมวิธีทำออนไลน์" : "Free online hexadecimal (base-16) to decimal (base-10) converter with step-by-step calculation.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "base-16-to-2",
    slug: "base-16-to-2",
    name: lang === "TH" ? "เครื่องคำนวณแปลงเลขฐาน 16 เป็นเลขฐาน 2" : "Hexadecimal to Binary Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงเลขฐาน 16 (Hexadecimal) เป็นเลขฐาน 2 (Binary) ออนไลน์ ใช้งานฟรีและมีวิธีทำ" : "Free online hexadecimal (base-16) to binary (base-2) converter.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "base-2-to-10",
    slug: "base-2-to-10",
    name: lang === "TH" ? "เครื่องคำนวณแปลงเลขฐาน 2 เป็นเลขฐาน 10" : "Binary to Decimal Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงเลขฐาน 2 (Binary) เป็นเลขฐาน 10 (Decimal) ออนไลน์ ใช้งานง่าย พร้อมคำอธิบายและหลักการคำนวณ" : "Free online binary (base-2) to decimal (base-10) converter with easy to understand explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "base-2-to-16",
    slug: "base-2-to-16",
    name: lang === "TH" ? "เครื่องคำนวณแปลงเลขฐาน 2 เป็นเลขฐาน 16" : "Binary to Hexadecimal Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงเลขฐาน 2 (Binary) เป็นเลขฐาน 16 (Hexadecimal) ออนไลน์ ใช้งานง่าย พร้อมคำอธิบาย" : "Free online binary (base-2) to hexadecimal (base-16) converter.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "bayes-theorem",
    slug: "bayes-theorem",
    name: lang === "TH" ? "เครื่องมือคำนวณทฤษฎีบทของเบย์" : "Bayes' Theorem Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าความน่าจะเป็นแบบมีเงื่อนไขตามทฤษฎีบทของเบย์ P(A|B) พร้อมขั้นตอนการคำนวณทีละสเต็ป" : "Calculate conditional probabilities using Bayes' Theorem P(A|B) with step-by-step formula explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "behavioral-life",
    slug: "behavioral-life",
    name: lang === "TH" ? "เครื่องคำนวณอายุขัยจากพฤติกรรม" : "Behavioral Life Expectancy Calculator",
    desc: lang === "TH" ? "ประเมินอายุขัยที่คาดหวังของคุณโดยพิจารณาจากพฤติกรรมและวิถีชีวิต" : "Estimate your life expectancy based on your behaviors and lifestyle choices.",
    category: "General",
    icon: Icons.Activity
  },
  {
    id: "binary-addition-subtraction",
    slug: "binary-addition-subtraction",
    name: lang === "TH" ? "เครื่องคำนวณการบวกลบเลขฐาน 2" : "Binary Addition and Subtraction",
    desc: lang === "TH" ? "โปรแกรมคำนวณการบวกและการลบเลขฐาน 2 (Binary) พร้อมแสดงผลลัพธ์ในฐาน 10" : "Free online binary arithmetic calculator. Add and subtract base-2 numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "binomial-distribution",
    slug: "binomial-distribution",
    name: lang === "TH" ? "คำนวณการแจกแจงทวินาม (Binomial)" : "Binomial Distribution Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณกฎการแจกแจงทวินาม หาความน่าจะเป็นของเหตุการณ์ที่สนใจจากการทดลองแบบอิสระ" : "Calculate Binomial Distribution Probability for a given number of trials and successes.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "blue-light-exposure",
    slug: "blue-light-exposure",
    name: lang === "TH" ? "คำนวณการสัมผัสแสงสีฟ้า" : "Blue Light Exposure Calculator",
    desc: lang === "TH" ? "ประเมินระยะเวลาที่คุณได้รับแสงสีฟ้าจากหน้าจอต่างๆ ในแต่ละวัน พร้อมคำแนะนำในการดูแลสายตา" : "Estimate your daily blue light exposure from screens and get eye care recommendations.",
    category: "Health",
    icon: Icons.MonitorSmartphone
  },
  {
    id: "bts-mrt-vs-car",
    slug: "bts-mrt-vs-car",
    name: lang === "TH" ? "เปรียบเทียบค่าเดินทาง รถไฟฟ้า vs รถส่วนตัว" : "BTS/MRT vs Personal Car Calculator",
    desc: lang === "TH" ? "คำนวณเปรียบเทียบค่าใช้จ่ายรายเดือนระหว่างการใช้รถไฟฟ้า (BTS/MRT) กับการขับรถส่วนตัว" : "Compare monthly expenses between using public transit (BTS/MRT) and driving a personal car",
    category: "Family",
    icon: Icons.Train
  },
  {
    id: "bus-factor",
    slug: "bus-factor",
    name: lang === "TH" ? "ประเมินความเสี่ยง Bus Factor" : "Bus Factor Risk Calculator",
    desc: lang === "TH" ? "ประเมินระดับความเสี่ยงของโปรเจกต์หากทีมงานหลักไม่สามารถทำงานต่อได้ (Bus Factor)" : "Evaluate the risk of a project if key team members are unavailable (Bus Factor).",
    category: "Technology",
    icon: Icons.BusFront
  },
  {
    id: "e-waste-water-footprint",
    slug: "e-waste-water-footprint",
    name: lang === "TH" ? "คำนวณปริมาณน้ำในขยะอิเล็กทรอนิกส์" : "E-waste Water Footprint Calculator",
    desc: lang === "TH" ? "ประเมินปริมาณน้ำซ่อนเร้น (Water Footprint) ที่ถูกใช้ในกระบวนการผลิตอุปกรณ์อิเล็กทรอนิกส์ต่างๆ" : "Estimate the hidden water (Water Footprint) used in manufacturing various electronic devices.",
    category: "Environment",
    icon: Icons.Droplet
  },
  {
    id: "ev-charger-installation-cost",
    slug: "ev-charger-installation-cost",
    name: lang === "TH" ? "คำนวณค่าใช้จ่ายติดตั้งสถานีชาร์จ EV" : "EV Charger Installation Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า (EV Charger) ที่บ้าน รวมถึงการขอเปลี่ยนมิเตอร์" : "Estimate the total cost of installing a home EV charger, including meter upgrades and labor.",
    category: "Environment",
    icon: Icons.PlugZap
  },
  {
    id: "ev-charging-cost",
    slug: "ev-charging-cost",
    name: lang === "TH" ? "คำนวณต้นทุนการชาร์จรถ EV" : "EV Charging Cost per 100km Calculator",
    desc: lang === "TH" ? "คำนวณค่าไฟฟ้าในการชาร์จรถยนต์ไฟฟ้า (EV) และประเมินค่าใช้จ่ายในการเดินทางต่อ 100 กิโลเมตร" : "Calculate the electricity cost of charging an EV and estimate the travel cost per 100 kilometers.",
    category: "Environment",
    icon: Icons.Car
  },
  {
    id: "green-building-score",
    slug: "green-building-score",
    name: lang === "TH" ? "คำนวณคะแนนอาคารสีเขียว (Green Building Score)" : "Green Building Score Calculator",
    desc: lang === "TH" ? "จำลองการประเมินคะแนนอาคารสีเขียวเบื้องต้น (อ้างอิงตามเกณฑ์ LEED) เพื่อดูระดับการรับรองของอาคารคุณ" : "Simulate a basic Green Building score (based on LEED criteria) to see your potential certification level.",
    category: "Environment",
    icon: Icons.Building2
  },
  {
    id: "led-savings",
    slug: "led-savings",
    name: lang === "TH" ? "คำนวณพลังงานที่ประหยัดได้จากเปลี่ยน LED" : "LED Savings Calculator",
    desc: lang === "TH" ? "คำนวณค่าไฟฟ้าและพลังงานที่คุณสามารถประหยัดได้จากการเปลี่ยนหลอดไฟธรรมดาเป็นหลอดไฟ LED" : "Calculate the electricity cost and energy savings from switching to LED bulbs.",
    category: "Environment",
    icon: Icons.Lightbulb
  },
  {
    id: "livestock-methane-emissions",
    slug: "livestock-methane-emissions",
    name: lang === "TH" ? "คำนวณปริมาณมีเทนจากฟาร์มปศุสัตว์" : "Livestock Methane Emissions Calculator",
    desc: lang === "TH" ? "ประเมินปริมาณก๊าซมีเทน (Methane) ที่ปล่อยออกมาจากการทำฟาร์มปศุสัตว์ต่อปี" : "Estimate the annual methane (CH₄) emissions generated by livestock farming.",
    category: "Environment",
    icon: Icons.Tractor
  },
  {
    id: "personal-ecological-footprint",
    slug: "personal-ecological-footprint",
    name: lang === "TH" ? "คำนวณ Ecological Footprint ส่วนตัว" : "Personal Ecological Footprint Calculator",
    desc: lang === "TH" ? "ประเมินรอยเท้านิเวศของคุณ เพื่อดูว่าไลฟ์สไตล์ปัจจุบันใช้ทรัพยากรธรรมชาติไปมากน้อยเพียงใด" : "Estimate your ecological footprint to see how much of the Earth's resources your lifestyle consumes.",
    category: "Environment",
    icon: Icons.Globe
  },
  {
    id: "renewable-vs-grid-electricity",
    slug: "renewable-vs-grid-electricity",
    name: lang === "TH" ? "เปรียบเทียบค่าไฟพลังงานทดแทน vs ไฟฟ้าปกติ" : "Renewable vs Grid Electricity Calculator",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายรายเดือนระหว่างการใช้ไฟฟ้าจากการไฟฟ้าปกติ กับการผสมผสานพลังงานทดแทน" : "Compare monthly electricity costs between standard grid power and a mix of renewable energy.",
    category: "Environment",
    icon: Icons.Zap
  },
  {
    id: "solar-payback-period",
    slug: "solar-payback-period",
    name: lang === "TH" ? "คำนวณระยะเวลาคืนทุนแผงโซลาร์" : "Solar Payback Period Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาคืนทุนของการติดตั้งแผงโซลาร์เซลล์ ประเมินการผลิตไฟและจุดคุ้มทุนเบื้องต้น" : "Estimate the payback period, annual energy generation, and savings for a solar panel installation.",
    category: "Environment",
    icon: Icons.Sun
  },
  {
    id: "tree-co2-offset",
    slug: "tree-co2-offset",
    name: lang === "TH" ? "คำนวณปริมาณ CO₂ ที่ต้นไม้ดูดซับ" : "Tree CO₂ Offset Calculator",
    desc: lang === "TH" ? "คำนวณและประเมินปริมาณก๊าซคาร์บอนไดออกไซด์ (CO₂) ที่ต้นไม้สามารถดูดซับได้ต่อปี" : "Calculate and estimate the amount of carbon dioxide (CO₂) absorbed by trees per year.",
    category: "Environment",
    icon: Icons.TreeDeciduous
  },
  {
    id: "app-dev-cost",
    slug: "app-dev-cost",
    name: lang === "TH" ? "เครื่องมือประเมินค่าใช้จ่ายพัฒนาแอปพลิเคชัน" : "App Development Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการพัฒนาแอป (iOS, Android, Web) ตามขนาดของฟีเจอร์และเรทนักพัฒนา" : "Estimate app development costs (iOS, Android, Web) based on feature size and developer rates.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "app-store-revenue",
    slug: "app-store-revenue",
    name: lang === "TH" ? "เครื่องมือคำนวณรายได้ App Store / Google Play" : "App Store Revenue Calculator",
    desc: lang === "TH" ? "คำนวณรายได้สุทธิและหักค่าคอมมิชชั่นของ Apple App Store และ Google Play Store (15% vs 30%)" : "Calculate net revenue and commissions for Apple App Store and Google Play Store (15% vs 30%).",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "cdn-cost-calculator",
    slug: "cdn-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ CDN Cost" : "CDN Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่าย Content Delivery Network (CDN) รายเดือนตามปริมาณแบนด์วิดท์และ Requests" : "Estimate monthly Content Delivery Network (CDN) costs based on bandwidth and requests.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "cloud-storage-cost",
    slug: "cloud-storage-cost",
    name: lang === "TH" ? "เครื่องมือคำนวณค่าบริการ Cloud Storage" : "Cloud Storage Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายพื้นที่จัดเก็บข้อมูลบนคลาวด์มาตรฐาน (เทียบเท่า AWS S3, GCS) รวมถึงค่าแบนด์วิดท์และ Requests" : "Estimate standard cloud storage costs (comparable to AWS S3, GCS) including bandwidth and requests.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "database-cost",
    slug: "database-cost",
    name: lang === "TH" ? "เครื่องมือคำนวณ Database Cost (Managed DB)" : "Database Cost Calculator (Managed DB)",
    desc: lang === "TH" ? "ประมาณการค่าใช้จ่ายบริการฐานข้อมูลบนคลาวด์ (เช่น RDS) โดยคิดจาก Instance, Storage และ Data Transfer" : "Estimate cloud managed database costs (like RDS) based on Instance, Storage, and Data Transfer.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "facebook-ads-roi-cpa",
    slug: "facebook-ads-roi-cpa",
    name: lang === "TH" ? "เครื่องมือคำนวณ ROI โฆษณา Facebook Ads" : "Facebook Ads ROI & CPA Calculator",
    desc: lang === "TH" ? "คำนวณผลตอบแทนการลงทุน (ROI), ROAS, CPA, และจุดคุ้มทุนสำหรับแคมเปญ Facebook Ads" : "Calculate Return on Investment (ROI), ROAS, CPA, and break-even point for Facebook Ads campaigns.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "google-ads-roi-roas",
    slug: "google-ads-roi-roas",
    name: lang === "TH" ? "เครื่องมือคำนวณ ROI โฆษณา Google Ads" : "Google Ads ROI & ROAS Calculator",
    desc: lang === "TH" ? "คำนวณผลตอบแทนการลงทุน (ROI), ROAS, CPC, และเปรียบเทียบกำไรจากแคมเปญ Google Ads (Search/Display/Shopping)" : "Calculate Return on Investment (ROI), ROAS, CPC, and profitability for Google Ads campaigns.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "ltv-to-cac-ratio",
    slug: "ltv-to-cac-ratio",
    name: lang === "TH" ? "เครื่องมือคำนวณ LTV:CAC Ratio" : "LTV to CAC Ratio Calculator",
    desc: lang === "TH" ? "คำนวณมูลค่าตลอดอายุการใช้งานของลูกค้า (LTV) เทียบกับต้นทุนในการหาลูกค้าใหม่ (CAC) เพื่อวัดสุขภาพของธุรกิจระยะยาว" : "Calculate Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratio to measure long-term business health.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "sms-email-marketing-cost",
    slug: "sms-email-marketing-cost",
    name: lang === "TH" ? "ค่าใช้จ่าย SMS/Email Marketing" : "SMS & Email Marketing Cost",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบต้นทุนการส่งแคมเปญการตลาดผ่าน SMS และ Email พร้อมประเมินค่าใช้จ่ายต่อผู้รับ (Cost per User)" : "Calculate and compare the cost of marketing campaigns via SMS and Email, including Cost per User.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "vps-dedicated-cost",
    slug: "vps-dedicated-cost",
    name: lang === "TH" ? "เครื่องมือเปรียบเทียบค่าใช้จ่าย VPS / Dedicated Server" : "VPS vs Dedicated Server Cost Calculator",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบค่าใช้จ่ายรายเดือนและรายปีของการเช่า Server ไม่ว่าจะเป็น VPS หรือ Dedicated พร้อมค่า Management" : "Calculate and compare monthly and yearly costs of renting VPS or Dedicated servers, including management fees.",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "cro-revenue-impact-calculator",
    slug: "cro-revenue-impact-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณรายได้จาก CRO (Conversion Rate)" : "CRO Revenue Impact Calculator",
    desc: lang === "TH" ? "วิเคราะห์การเติบโตของรายได้ (Revenue Uplift) จากการปรับปรุงอัตราการแปลง (Conversion Rate)" : "Analyze the potential revenue uplift from optimizing your Conversion Rate (CRO).",
    category: "Technology",
    icon: Icons.TrendingUp
  },
  {
    id: "domain-hosting-cost-calculator",
    slug: "domain-hosting-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่าใช้จ่าย Domain & Hosting" : "Domain & Hosting Cost Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนการทำเว็บไซต์ต่อปี ทั้งค่าจดโดเมน ค่าบริการเว็บโฮสติ้ง และส่วนเสริมต่างๆ" : "Calculate the annual cost of running a website, including domain registration, hosting, and addons.",
    category: "Technology",
    icon: Icons.Server
  },
  {
    id: "email-deliverability-score-calculator",
    slug: "email-deliverability-score-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ Email Deliverability Score" : "Email Deliverability Score Calculator",
    desc: lang === "TH" ? "ประเมินคุณภาพและโอกาสที่อีเมลของคุณจะถูกส่งเข้า Inbox จากค่า Bounce Rate และการตั้งค่า DMARC" : "Assess your email inbox placement score based on bounce rates, spam complaints, and authentication (DMARC/SPF/DKIM).",
    category: "Technology",
    icon: Icons.MailCheck
  },
  {
    id: "email-revenue-calculator",
    slug: "email-revenue-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณรายได้จาก Email Marketing" : "Email Revenue Calculator",
    desc: lang === "TH" ? "คำนวณผลตอบแทนและรายได้จากแคมเปญอีเมล จาก Open Rate และ Conversion Rate" : "Calculate ROI and revenue from email campaigns based on Open Rate and Conversion Rate.",
    category: "Technology",
    icon: Icons.Mail
  },
  {
    id: "pwa-vs-native-app-cost-calculator",
    slug: "pwa-vs-native-app-cost-calculator",
    name: lang === "TH" ? "เครื่องมือเปรียบเทียบค่าใช้จ่าย PWA vs Native App" : "PWA vs Native App Cost Calculator",
    desc: lang === "TH" ? "เปรียบเทียบต้นทุนการพัฒนาและดูแลรักษาระหว่าง Progressive Web App และ Native App (iOS/Android)" : "Compare development and maintenance costs between Progressive Web Apps (PWA) and Native Apps.",
    category: "Technology",
    icon: Icons.Smartphone
  },
  {
    id: "saas-stack-total-cost-calculator",
    slug: "saas-stack-total-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่าใช้จ่าย SaaS Stack" : "SaaS Stack Total Cost Calculator",
    desc: lang === "TH" ? "จัดการและประเมินค่าใช้จ่ายรวมของซอฟต์แวร์ SaaS (Software as a Service) ที่องค์กรใช้งาน" : "Manage and calculate the total cost of all your SaaS subscriptions to optimize software spend.",
    category: "Technology",
    icon: Icons.Layers
  },
  {
    id: "seo-value-calculator",
    slug: "seo-value-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ SEO Value" : "SEO Value Calculator",
    desc: lang === "TH" ? "คำนวณมูลค่าของทราฟฟิกออร์แกนิก (SEO Value) จาก Search Volume และ CPC" : "Calculate the organic traffic value (SEO Value) based on Search Volume and CPC.",
    category: "Technology",
    icon: Icons.Search
  },
  {
    id: "sme-cybersecurity-cost-calculator",
    slug: "sme-cybersecurity-cost-calculator",
    name: lang === "TH" ? "เครื่องมือประเมินค่าใช้จ่าย Cybersecurity สำหรับ SME" : "SME Cybersecurity Cost Calculator",
    desc: lang === "TH" ? "ประเมินต้นทุนพื้นฐานในการรักษาความปลอดภัยไซเบอร์รายปี สำหรับองค์กรธุรกิจและ SME" : "Estimate the baseline annual cybersecurity costs for small and medium-sized businesses.",
    category: "Technology",
    icon: Icons.ShieldAlert
  },
  {
    id: "ssl-certificate-cost-calculator",
    slug: "ssl-certificate-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่าใช้จ่าย SSL Certificate" : "SSL Certificate Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการจดทะเบียนและต่ออายุ SSL Certificate ประเภทต่างๆ (DV, OV, EV)" : "Estimate the cost of purchasing and renewing different types of SSL Certificates.",
    category: "Technology",
    icon: Icons.ShieldCheck
  },
  {
    id: "technical-debt-cost-calculator",
    slug: "technical-debt-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณมูลค่า Technical Debt" : "Technical Debt Cost Calculator",
    desc: lang === "TH" ? "ประเมินต้นทุนที่สูญเสียไปจากการรับมือกับโค้ดที่ไม่มีคุณภาพและหนี้ทางเทคนิค (Technical Debt)" : "Evaluate the financial cost of technical debt and time lost dealing with bad code.",
    category: "Technology",
    icon: Icons.Code
  },
  {
    id: "ac-electricity-cost",
    slug: "ac-electricity-cost",
    name: lang === "TH" ? "ค่าไฟแอร์" : "AC Electricity Cost",
    desc: lang === "TH" ? "คำนวณค่าไฟแอร์รายเดือน จากขนาด BTU ค่า SEER และชั่วโมงการใช้งาน" : "Calculate monthly AC electricity cost based on BTU, SEER, and usage hours.",
    category: "Utility",
    icon: Icons.Zap
  },
  {
    id: "built-in-kitchen-cost",
    slug: "built-in-kitchen-cost",
    name: lang === "TH" ? "ค่าใช้จ่ายทำ Kitchen Set Built-in" : "Built-in Kitchen Cost",
    desc: lang === "TH" ? "ประเมินราคางานบิ้วอินชุดครัว ตามความยาวและวัสดุเคาน์เตอร์" : "Estimate cost of built-in kitchen set based on length and materials.",
    category: "Family",
    icon: Icons.Utensils
  },
  {
    id: "condo-maintenance-fee-total",
    slug: "condo-maintenance-fee-total",
    name: lang === "TH" ? "ค่าส่วนกลางคอนโด" : "Condo Maintenance Fee Total",
    desc: lang === "TH" ? "คำนวณค่าส่วนกลางคอนโดรายปี พร้อมค่าที่จอดรถและค่าใช้จ่ายอื่นๆ" : "Calculate total yearly condo maintenance fee including parking and other fees.",
    category: "Family",
    icon: Icons.Building
  },
  {
    id: "condo-purchase-cost",
    slug: "condo-purchase-cost",
    name: lang === "TH" ? "ค่าใช้จ่ายซื้อคอนโด" : "Condo Purchase Cost",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายวันโอนคอนโด ค่ากองทุนส่วนกลาง ค่าจดจำนอง และอื่นๆ" : "Calculate condo transfer day costs, sinking fund, mortgage fee, etc.",
    category: "Family",
    icon: Icons.Building
  },
  {
    id: "condo-rent-vs-buy-to-let-roi",
    slug: "condo-rent-vs-buy-to-let-roi",
    name: lang === "TH" ? "เทียบกำไรถ้าซื้อปล่อยเช่า (ROI)" : "Condo Buy to Let ROI",
    desc: lang === "TH" ? "ประเมินความคุ้มค่าและคำนวณผลตอบแทน (ROI) จากการซื้อคอนโดเพื่อปล่อยเช่า" : "Evaluate profitability and calculate ROI for buying a condo to rent out.",
    category: "Family",
    icon: Icons.TrendingUp
  },
  {
    id: "full-house-furniture-cost",
    slug: "full-house-furniture-cost",
    name: lang === "TH" ? "ค่าใช้จ่ายเปลี่ยนเฟอร์นิเจอร์ทั้งบ้าน" : "Full House Furniture Cost",
    desc: lang === "TH" ? "ประเมินงบประมาณซื้อเฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าสำหรับตกแต่งบ้านใหม่" : "Estimate budget for furnishing a whole house with furniture and appliances.",
    category: "Family",
    icon: Icons.Sofa
  },
  {
    id: "moving-house-cost",
    slug: "moving-house-cost",
    name: lang === "TH" ? "ค่าใช้จ่ายย้ายบ้าน" : "Moving House Cost",
    desc: lang === "TH" ? "ประเมินงบประมาณค่าย้ายบ้าน ค่ารถบรรทุก ค่าเด็กยกของ และค่ากล่อง" : "Estimate budget for moving house, truck, movers, and packing materials.",
    category: "Family",
    icon: Icons.Truck
  },
  {
    id: "new-house-purchase-cost",
    slug: "new-house-purchase-cost",
    name: lang === "TH" ? "ค่าใช้จ่ายซื้อบ้านมือหนึ่ง" : "New House Purchase Cost",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายทั้งหมดในการซื้อบ้านมือหนึ่ง เช่น ค่าจดจำนอง ค่าโอน ค่ามิเตอร์" : "Calculate total costs of buying a new house including mortgage fee, transfer fee, and utility deposits.",
    category: "Family",
    icon: Icons.Home
  },
  {
    id: "property-tax-calculator",
    slug: "property-tax-calculator",
    name: lang === "TH" ? "ค่าภาษีที่ดินและสิ่งปลูกสร้าง" : "Property Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีที่ดินและสิ่งปลูกสร้าง สำหรับบ้านหลังแรก บ้านหลังที่สอง และที่ดินเปล่า" : "Calculate property and land tax for first home, second home, and vacant land.",
    category: "Family",
    icon: Icons.Building
  },
  {
    id: "rental-yield-calculator",
    slug: "rental-yield-calculator",
    name: lang === "TH" ? "คำนวณ Rental Yield" : "Rental Yield Calculator",
    desc: lang === "TH" ? "หาอัตราผลตอบแทนการปล่อยเช่า Gross Yield และ Net Yield เพื่อการลงทุน" : "Calculate Gross and Net Rental Yield for property investments.",
    category: "Family",
    icon: Icons.Percent
  },
  {
    id: "ac-btu-size-calculator",
    slug: "ac-btu-size-calculator",
    name: lang === "TH" ? "คำนวณขนาดแอร์ (BTU)" : "AC BTU Size Calculator",
    desc: lang === "TH" ? "คำนวณขนาดเครื่องปรับอากาศ (BTU) ที่เหมาะสมกับขนาดห้องและสภาพแสงแดด เพื่อความเย็นที่พอดีและประหยัดไฟ" : "Calculate the appropriate Air Conditioner BTU size based on room dimensions and sunlight exposure.",
    category: "Utility",
    icon: Icons.Snowflake
  },
  {
    id: "appliance-electricity-cost",
    slug: "appliance-electricity-cost",
    name: lang === "TH" ? "คำนวณค่าไฟเครื่องใช้ไฟฟ้าแต่ละชนิด" : "Appliance Electricity Cost Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณค่าไฟสำหรับเครื่องใช้ไฟฟ้าแต่ละชนิด ประเมินค่าไฟรายเดือนและรายปี" : "Calculate electricity cost for specific appliances to estimate monthly and yearly expenses.",
    category: "Utility",
    icon: Icons.Zap
  },
  {
    id: "garden-maintenance-cost",
    slug: "garden-maintenance-cost",
    name: lang === "TH" ? "คำนวณค่าดูแลสวน" : "Garden Maintenance Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการดูแลสวนรายเดือน เช่น ค่าจ้างคนสวน ค่าปุ๋ย ค่าน้ำ เพื่อการจัดสรรงบประมาณที่เหมาะสม" : "Estimate monthly garden maintenance costs including gardener fees, fertilizers, and water usage.",
    category: "Family",
    icon: Icons.TreeDeciduous
  },
  {
    id: "home-internet-cost",
    slug: "home-internet-cost",
    name: lang === "TH" ? "เปรียบเทียบค่าอินเทอร์เน็ตบ้าน" : "Home Internet Cost Comparison",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายอินเทอร์เน็ตบ้าน 2 แพ็กเกจ เพื่อหาตัวเลือกที่คุ้มค่าที่สุดตลอดอายุสัญญา" : "Compare 2 home internet plans to find the most cost-effective option over the contract period.",
    category: "Family",
    icon: Icons.Wifi
  },
  {
    id: "home-security-cost",
    slug: "home-security-cost",
    name: lang === "TH" ? "คำนวณค่าใช้จ่ายรักษาความปลอดภัยบ้าน" : "Home Security Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายเบื้องต้นในการติดตั้งระบบรักษาความปลอดภัย เช่น กล้องวงจรปิด สัญญาณกันขโมย และค่าใช้จ่ายรายเดือน" : "Estimate upfront and ongoing costs for home security systems including CCTV, alarms, and monitoring.",
    category: "Family",
    icon: Icons.Shield
  },
  {
    id: "home-solar-installation-cost",
    slug: "home-solar-installation-cost",
    name: lang === "TH" ? "คำนวณค่าติดตั้งและจุดคุ้มทุนโซลาร์รูฟท็อป" : "Home Solar Installation Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายเบื้องต้นในการติดตั้งแผงโซลาร์เซลล์บนหลังคาบ้าน คำนวณค่าไฟที่ประหยัดได้และระยะเวลาคืนทุน" : "Estimate home solar panel installation costs, monthly savings, and payback period.",
    category: "Construction",
    icon: Icons.Sun
  },
  {
    id: "house-painting-cost",
    slug: "house-painting-cost",
    name: lang === "TH" ? "คำนวณค่าทาสีบ้านใหม่" : "House Painting Cost Calculator",
    desc: lang === "TH" ? "ประเมินงบประมาณค่าทาสีบ้าน คำนวณปริมาณสีที่ต้องใช้และค่าแรงช่างตามพื้นที่ตารางเมตร" : "Estimate house painting budget, calculate required paint volume and labor costs based on square meters.",
    category: "Construction",
    icon: Icons.PaintRoller
  },
  {
    id: "household-water-usage-cost",
    slug: "household-water-usage-cost",
    name: lang === "TH" ? "คำนวณค่าน้ำอุปโภคบริโภค" : "Household Water Usage Cost Calculator",
    desc: lang === "TH" ? "คำนวณปริมาณการใช้น้ำและประมาณการค่าน้ำประปารายเดือนของครอบครัว" : "Calculate water usage volume and estimate monthly water bill for your household.",
    category: "Utility",
    icon: Icons.Droplet
  },
  {
    id: "pool-maintenance-cost",
    slug: "pool-maintenance-cost",
    name: lang === "TH" ? "คำนวณค่าดูแลสระว่ายน้ำ" : "Pool Maintenance Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการดูแลรักษาสระว่ายน้ำรายเดือนและรายปี ทั้งค่าสารเคมี ไฟฟ้า น้ำ และบริการทำความสะอาด" : "Estimate monthly and yearly pool maintenance costs including chemicals, electricity, water, and cleaning services.",
    category: "Family",
    icon: Icons.Waves
  },
  {
    id: "roof-replacement-cost",
    slug: "roof-replacement-cost",
    name: lang === "TH" ? "คำนวณค่าเปลี่ยนหลังคาบ้าน" : "Roof Replacement Cost Calculator",
    desc: lang === "TH" ? "ประเมินงบประมาณในการรื้อถอนและเปลี่ยนหลังคาใหม่ ตามพื้นที่และประเภทของวัสดุหลังคา" : "Estimate the budget for roof replacement including demolition and new materials based on roof area.",
    category: "Construction",
    icon: Icons.Home
  },
  {
    id: "car-comparison",
    slug: "car-comparison",
    name: lang === "TH" ? "เปรียบเทียบรถยนต์ 2 คัน (ค่าใช้จ่าย)" : "Car Comparison Calculator",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายรายปีและการผ่อนชำระของรถยนต์ 2 คัน เพื่อประกอบการตัดสินใจ" : "Compare annual costs and loan payments of 2 cars to make a better decision.",
    category: "Finance",
    icon: Icons.ArrowRightLeft
  },
  {
    id: "car-depreciation",
    slug: "car-depreciation",
    name: lang === "TH" ? "คำนวณค่าเสื่อมราคารถ" : "Car Depreciation Calculator",
    desc: lang === "TH" ? "คำนวณและประเมินมูลค่ารถยนต์ที่ลดลงตามกาลเวลา (Depreciation) พร้อมตารางแสดงมูลค่ารายปี" : "Estimate the declining value of a car over time with a yearly depreciation table.",
    category: "Finance",
    icon: Icons.TrendingDown
  },
  {
    id: "car-insurance",
    slug: "car-insurance",
    name: lang === "TH" ? "คำนวณค่าประกันรถยนต์" : "Car Insurance Calculator",
    desc: lang === "TH" ? "ประเมินค่าประกันภัยรถยนต์รายปี รวมพ.ร.บ. และตัวเลือกเสริมต่างๆ" : "Estimate annual car insurance premiums including compulsory insurance and add-ons.",
    category: "Finance",
    icon: Icons.Shield
  },
  {
    id: "car-maintenance",
    slug: "car-maintenance",
    name: lang === "TH" ? "คำนวณค่าบำรุงรักษารถยนต์" : "Car Maintenance Cost Calculator",
    desc: lang === "TH" ? "ประมาณการค่าใช้จ่ายในการซ่อมบำรุงรถยนต์รายปี ตามรอบระยะทาง เช่น น้ำมันเครื่อง ยาง แบตเตอรี่" : "Estimate annual maintenance costs including oil, tires, and battery replacements based on mileage.",
    category: "Finance",
    icon: Icons.Wrench
  },
  {
    id: "car-tco",
    slug: "car-tco",
    name: lang === "TH" ? "เครื่องคำนวณต้นทุนความเป็นเจ้าของรถ TCO" : "Car Total Cost of Ownership (TCO) Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนทั้งหมดในการเป็นเจ้าของรถยนต์ ทั้งค่าผ่อน ค่าน้ำมัน ค่าบำรุงรักษา และค่าเสื่อมราคา" : "Calculate the total cost of owning a car including loan, fuel, maintenance, and depreciation.",
    category: "Finance",
    icon: Icons.CarFront
  },
  {
    id: "ev-cost-per-km",
    slug: "ev-cost-per-km",
    name: lang === "TH" ? "ค่าใช้จ่ายรถ EV ต่อกม." : "EV Cost per KM Calculator",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายพลังงานต่อกิโลเมตร ระหว่างรถยนต์ไฟฟ้า (EV) และรถน้ำมันสันดาป (ICE)" : "Compare energy cost per kilometer between Electric Vehicles (EV) and Internal Combustion Engine (ICE) cars.",
    category: "Finance",
    icon: Icons.Zap
  },
  {
    id: "ev-ice-breakeven",
    slug: "ev-ice-breakeven",
    name: lang === "TH" ? "คำนวณจุดคุ้มทุนรถ EV" : "EV vs ICE Break-even",
    desc: lang === "TH" ? "เปรียบเทียบว่าต้องใช้รถ EV กี่ปี ถึงจะคุ้มส่วนต่างราคาเมื่อเทียบกับรถน้ำมัน" : "Calculate how many years it takes for an EV's fuel savings to offset its higher purchase price.",
    category: "Finance",
    icon: Icons.Scale
  },
  {
    id: "motorcycle-loan",
    slug: "motorcycle-loan",
    name: lang === "TH" ? "คำนวณค่าผ่อนรถมอเตอร์ไซค์" : "Motorcycle Loan Calculator",
    desc: lang === "TH" ? "คำนวณค่างวดรถมอเตอร์ไซค์ ดอกเบี้ยคงที่ต่อเดือน/ต่อปี พร้อมตารางการผ่อนชำระ" : "Calculate motorcycle loan monthly payments with flat interest rates (monthly/yearly).",
    category: "Finance",
    icon: Icons.Bike
  },
  {
    id: "rider-roi",
    slug: "rider-roi",
    name: lang === "TH" ? "คำนวณรายได้จุดคุ้มทุนไรเดอร์" : "Rider ROI & Income Calculator",
    desc: lang === "TH" ? "คำนวณรายได้สุทธิและระยะเวลาคืนทุน (ROI) สำหรับอาชีพขับรถส่งอาหาร (Grab, Lineman, Foodpanda)" : "Calculate net income and ROI payback period for food delivery riders.",
    category: "Finance",
    icon: Icons.Bike
  },
  {
    id: "truck-cost",
    slug: "truck-cost",
    name: lang === "TH" ? "คำนวณต้นทุนรถบรรทุกขนส่ง" : "Truck Operating Cost",
    desc: lang === "TH" ? "คำนวณต้นทุนการวิ่งรถบรรทุกต่อเที่ยวและต่อกิโลเมตร รวมถึงค่าน้ำมันและค่าจ้างคนขับ" : "Calculate truck operating cost per trip and per kilometer, including fuel and driver wages.",
    category: "Finance",
    icon: Icons.Truck
  },
  {
    id: "annual-commute-cost-calculator",
    slug: "annual-commute-cost-calculator",
    name: lang === "TH" ? "เครื่องคำนวณระยะทางและค่าใช้จ่ายไป-กลับทำงานต่อปี" : "Annual Commute Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายและระยะทางรวมที่คุณใช้ในการเดินทางไปทำงานตลอดทั้งปี" : "Calculate the total distance and cost of your annual commute.",
    category: "Travel",
    icon: Icons.MapPin
  },
  {
    id: "car-pool-savings-calculator",
    slug: "car-pool-savings-calculator",
    name: lang === "TH" ? "เครื่องคิดเลขค่าใช้จ่าย Car Pool" : "Car Pool Savings Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายและเงินที่ประหยัดได้จากการนั่งรถตู้คาร์พูลหรือเดินทางไปทำงานด้วยกัน" : "Calculate costs and savings from carpooling.",
    category: "Travel",
    icon: Icons.Users
  },
  {
    id: "monthly-parking-cost-calculator",
    slug: "monthly-parking-cost-calculator",
    name: lang === "TH" ? "เครื่องคิดเลขค่าใช้จ่ายที่จอดรถรายเดือน" : "Monthly Parking Cost Calculator",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบค่าที่จอดรถแบบรายวันกับรายเดือน แบบไหนคุ้มค่ากว่ากัน" : "Compare daily vs monthly parking costs to find the best deal.",
    category: "Travel",
    icon: Icons.Car
  },
  {
    id: "monthly-toll-fee-calculator",
    slug: "monthly-toll-fee-calculator",
    name: lang === "TH" ? "เครื่องคิดเลขค่าทางด่วน/ค่าผ่านทางต่อเดือน" : "Monthly Toll Fee Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายทางด่วน ค่าผ่านทางมอเตอร์เวย์ ต่อเดือนและต่อปี เพื่อการวางแผนเติมเงิน EasyPass/M-Flow" : "Calculate your monthly and annual toll fees for better budget planning.",
    category: "Travel",
    icon: Icons.Navigation
  },
  {
    id: "ride-hailing-vs-own-car-cost-calculator",
    slug: "ride-hailing-vs-own-car-cost-calculator",
    name: lang === "TH" ? "เปรียบเทียบค่าใช้จ่าย เรียกรถ vs รถส่วนตัว" : "Ride Hailing vs Own Car Cost Calculator",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบว่าการใช้แอปเรียกรถ (Grab/Uber) หรือการซื้อรถยนต์ส่วนตัว แบบไหนคุ้มค่ากว่ากัน" : "Compare the true costs of using ride-hailing services versus owning a car.",
    category: "Travel",
    icon: Icons.CarFront
  },
  {
    id: "anniversary-countdown",
    slug: "anniversary-countdown",
    name: lang === "TH" ? "คำนวณวันครบรอบ — เหลืออีกกี่วัน" : "Anniversary Countdown",
    desc: lang === "TH" ? "นับถอยหลังสู่วันครบรอบสำคัญ พร้อมบอกจำนวนวันที่ผ่านมาและวันครบรอบถัดไป" : "Count down to your anniversary with days passed and next anniversary date",
    category: "General",
    icon: Icons.Heart
  },
  {
    id: "event-countdown",
    slug: "event-countdown",
    name: lang === "TH" ? "นับถอยหลัง Countdown วันสำคัญ" : "Event Countdown Timer",
    desc: lang === "TH" ? "นับถอยหลังไปยังวันสำคัญ เช่น ปีใหม่ สงกรานต์ วันเกิด วันแต่งงาน แบบเรียลไทม์" : "Real-time countdown timer to important events like New Year, Songkran, birthdays, and weddings",
    category: "General",
    icon: Icons.CalendarClock
  },
  {
    id: "exact-age-calculator",
    slug: "exact-age-calculator",
    name: lang === "TH" ? "คำนวณอายุเป็นวัน/ชั่วโมง/นาที/วินาที" : "Exact Age Calculator",
    desc: lang === "TH" ? "คำนวณอายุอย่างละเอียดเป็นวัน ชั่วโมง นาที และวินาที พร้อมนับถอยหลังวันเกิดถัดไป" : "Calculate your exact age in days, hours, minutes and seconds with next birthday countdown",
    category: "General",
    icon: Icons.Calendar
  },
  {
    id: "retirement-countdown",
    slug: "retirement-countdown",
    name: lang === "TH" ? "คำนวณวันเกษียณ" : "Retirement Countdown Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนวัน เดือน ปี ที่เหลือก่อนถึงวันเกษียณอายุ พร้อมกราฟความคืบหน้าอาชีพ" : "Calculate days, months, and years remaining until retirement with career progress tracking",
    category: "General",
    icon: Icons.Briefcase
  },
  {
    id: "sunrise-sunset-calculator",
    slug: "sunrise-sunset-calculator",
    name: lang === "TH" ? "เวลาพระอาทิตย์ขึ้น/ตก" : "Sunrise & Sunset Calculator",
    desc: lang === "TH" ? "คำนวณเวลาพระอาทิตย์ขึ้นและพระอาทิตย์ตกตามจังหวัดหรือพิกัดที่ต้องการ" : "Calculate sunrise and sunset times for Thai provinces or custom coordinates",
    category: "General",
    icon: Icons.Sun
  },
  {
    id: "thai-lunar-phase",
    slug: "thai-lunar-phase",
    name: lang === "TH" ? "ข้างขึ้นข้างแรมไทย" : "Thai Lunar Phase Calculator",
    desc: lang === "TH" ? "ตรวจสอบเฟสดวงจันทร์ ข้างขึ้นข้างแรม วันจันทรคติ และความสว่างของดวงจันทร์" : "Check lunar phase, waxing/waning moon, Thai lunar day, and moon illumination",
    category: "General",
    icon: Icons.Moon
  },
  {
    id: "font-size-reading-distance",
    slug: "font-size-reading-distance",
    name: lang === "TH" ? "Font Size ระยะการอ่านที่เหมาะสม" : "Font Size & Reading Distance Calculator",
    desc: lang === "TH" ? "คำนวณขนาดตัวอักษรที่เหมาะสมตามระยะการอ่าน สำหรับจอ สิ่งพิมพ์ และป้าย" : "Calculate appropriate font sizes based on reading distance for screen, print, and signage",
    category: "Utility",
    icon: Icons.Type
  },
  {
    id: "remaining-annual-leave",
    slug: "remaining-annual-leave",
    name: lang === "TH" ? "คำนวณวันลาพักร้อนเหลือกี่วัน" : "Remaining Annual Leave Calculator",
    desc: lang === "TH" ? "คำนวณวันลาพักร้อนคงเหลือ รวมวันลาสะสม วันที่ใช้แล้ว และวันที่รออนุมัติ" : "Calculate remaining annual leave including carry-over, used days, and pending days",
    category: "Business",
    icon: Icons.Calendar
  },
  {
    id: "shift-work-staffing",
    slug: "shift-work-staffing",
    name: lang === "TH" ? "คำนวณเวรยามจำนวนคนต่อกะ" : "Shift Work Staffing Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนพนักงานที่ต้องการสำหรับงานกะ รวมสำรองขาดงาน" : "Calculate staffing requirements for shift work including absence coverage",
    category: "Business",
    icon: Icons.Users
  },
  {
    id: "social-media-image-size",
    slug: "social-media-image-size",
    name: lang === "TH" ? "ขนาดรูปภาพสำหรับ Social Media" : "Social Media Image Size Guide",
    desc: lang === "TH" ? "ค้นหาขนาดรูปภาพที่เหมาะสมสำหรับ Facebook, Instagram, X, YouTube, TikTok, LINE" : "Find the recommended image sizes for Facebook, Instagram, X, YouTube, TikTok, LINE",
    category: "Utility",
    icon: Icons.Image
  },
  {
    id: "customs-broker-fee",
    slug: "customs-broker-fee",
    name: lang === "TH" ? "ค่าธรรมเนียม Customs Broker" : "Customs Broker Fee Calculator",
    desc: lang === "TH" ? "คำนวณค่าธรรมเนียมตัวแทนออกของรวมค่าเอกสาร ค่าตรวจสอบ และค่าขนส่ง" : "Calculate customs broker fees including documentation, inspection, and delivery",
    category: "Business",
    icon: Icons.Calculator
  },
  {
    id: "hs-code-import-tax",
    slug: "hs-code-import-tax",
    name: lang === "TH" ? "HS Code ภาษีนำเข้า" : "HS Code Import Tax Calculator",
    desc: lang === "TH" ? "ค้นหาหมวดสินค้า HS Code และคำนวณภาษีนำเข้าเบื้องต้น" : "Search HS Code categories and estimate import tax",
    category: "Business",
    icon: Icons.Calculator
  },
  {
    id: "import-customs-duty",
    slug: "import-customs-duty",
    name: lang === "TH" ? "คำนวณค่าศุลกากรนำเข้าสินค้า" : "Import Customs Duty Calculator",
    desc: lang === "TH" ? "คำนวณอากรศุลกากร VAT ภาษีสรรพสามิต และต้นทุนรวมจากมูลค่า CIF" : "Calculate customs duty, VAT, excise tax, and total cost from CIF value",
    category: "Business",
    icon: Icons.Calculator
  },
  {
    id: "break-even-time",
    slug: "break-even-time-calculator",
    name: lang === "TH" ? "ระยะเวลาคืนทุน" : "Break-Even Time",
    desc: lang === "TH" ? "คำนวณระยะเวลา (เดือน) ที่ธุรกิจจะคืนทุนจากกระแสเงินสด" : "Calculate months to payback initial investment",
    category: "Finance",
    icon: Icons.Clock
  },
  {
    id: "capacity-utilization-rate",
    slug: "capacity-utilization-rate-calculator",
    name: lang === "TH" ? "อัตราการใช้กำลังการผลิต" : "Capacity Utilization Rate",
    desc: lang === "TH" ? "คำนวณประสิทธิภาพการใช้ทรัพยากรเทียบกับขีดจำกัดสูงสุด" : "Calculate output relative to potential maximum capacity",
    category: "Business",
    icon: Icons.Activity
  },
  {
    id: "cash-flow-projection",
    slug: "12-month-cash-flow-projection",
    name: lang === "TH" ? "ประมาณการกระแสเงินสด 12 เดือน" : "12-Month Cash Flow Projection",
    desc: lang === "TH" ? "วางแผนและคาดการณ์กระแสเงินสดรับจ่ายรายเดือน" : "Forecast monthly cash inflows and outflows",
    category: "Finance",
    icon: Icons.LineChart
  },
  {
    id: "cost-per-unit",
    slug: "manufacturing-cost-per-unit-calculator",
    name: lang === "TH" ? "ต้นทุนต่อหน่วย (ผลิต)" : "Cost per Unit",
    desc: lang === "TH" ? "คำนวณต้นทุนรวมต่อการผลิตสินค้า 1 ชิ้น" : "Calculate total manufacturing cost per unit",
    category: "Business",
    icon: Icons.Factory
  },
  {
    id: "double-declining-depreciation",
    slug: "double-declining-depreciation-calculator",
    name: lang === "TH" ? "ค่าเสื่อมราคาแบบยอดลดลงทวีคูณ" : "Double Declining Balance Depreciation",
    desc: lang === "TH" ? "คำนวณตารางค่าเสื่อมราคาสินทรัพย์แบบเร่งรัด" : "Calculate accelerated depreciation schedule",
    category: "Finance",
    icon: Icons.TrendingDown
  },
  {
    id: "working-capital",
    slug: "working-capital-calculator",
    name: lang === "TH" ? "เงินทุนหมุนเวียนสุทธิ" : "Working Capital",
    desc: lang === "TH" ? "คำนวณเงินทุนหมุนเวียนและอัตราส่วนสภาพคล่อง" : "Calculate net working capital and current ratio",
    category: "Finance",
    icon: Icons.Briefcase
  },
  {
    id: "wholesale-vs-retail-margin",
    slug: "wholesale-retail-margin-calculator",
    name: lang === "TH" ? "คำนวณราคาส่งและราคาปลีก" : "Wholesale vs Retail Margin",
    desc: lang === "TH" ? "คำนวณโครงสร้างราคาขายและอัตรากำไรสำหรับผู้ผลิตและร้านค้า" : "Calculate wholesale and retail prices based on margin",
    category: "Business",
    icon: Icons.Tags
  },
  {
    id: "retail-space-rent-roi",
    slug: "retail-space-rent-roi-calculator",
    name: lang === "TH" ? "ความคุ้มค่าค่าเช่าพื้นที่" : "Retail Space Rent ROI",
    desc: lang === "TH" ? "ประเมินจุดคุ้มทุนและกำไรจากการเช่าหน้าร้าน" : "Evaluate break-even sales and ROI for renting retail space",
    category: "Business",
    icon: Icons.Store
  },
  {
    id: "simplified-p-and-l",
    slug: "simplified-profit-and-loss-calculator",
    name: lang === "TH" ? "งบกำไรขาดทุนอย่างง่าย" : "Simplified P&L",
    desc: lang === "TH" ? "คำนวณงบกำไรขาดทุนและอัตรากำไรสุทธิ" : "Calculate simplified profit and loss statement",
    category: "Finance",
    icon: Icons.FileText
  },
  {
    id: "freelance-vs-fulltime-cost",
    slug: "freelance-vs-fulltime-cost-calculator",
    name: lang === "TH" ? "เปรียบเทียบฟรีแลนซ์และพนักงาน" : "Freelance vs Full-time Cost",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบต้นทุนแฝงในการจ้างงาน" : "Compare true costs of hiring freelance vs full-time",
    category: "Business",
    icon: Icons.UserCheck
  },
  {
    id: "solar-battery-sizing",
    slug: "solar-battery-sizing",
    name: lang === "TH" ? "ขนาดแบตเตอรี่ Solar kWh" : "Solar Battery Sizing Calculator",
    desc: lang === "TH" ? "คำนวณขนาดแบตเตอรี่โซลาร์เซลล์ที่เหมาะสม kWh/Ah พร้อมประมาณราคา" : "Calculate optimal solar battery size in kWh/Ah with cost estimation",
    category: "Utility",
    icon: Icons.Battery
  },
  {
    id: "solar-inverter-sizing",
    slug: "solar-inverter-sizing",
    name: lang === "TH" ? "ขนาด Inverter Solar กำลังวัตต์" : "Solar Inverter Sizing Calculator",
    desc: lang === "TH" ? "คำนวณขนาด Inverter ที่เหมาะสมกับแผงโซลาร์และโหลดไฟฟ้าบ้าน" : "Calculate the right inverter size for your solar panel system and home load",
    category: "Utility",
    icon: Icons.Zap
  },
  {
    id: "tou-electricity-cost",
    slug: "tou-electricity-cost",
    name: lang === "TH" ? "ค่าไฟฟ้า TOU Peak/Off-Peak" : "TOU Electricity Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าไฟฟ้าอัตรา TOU แยก Peak/Off-Peak/วันหยุด เปรียบเทียบกับอัตราปกติ" : "Calculate TOU electricity costs by Peak/Off-Peak/holiday periods vs normal rates",
    category: "Utility",
    icon: Icons.Zap
  },
  {
    id: "cost-of-living-comparison",
    slug: "cost-of-living-comparison",
    name: lang === "TH" ? "เปรียบเทียบค่าครองชีพ กรุงเทพ vs ต่างจังหวัด" : "Cost of Living Comparison",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่ายรายเดือนระหว่างกรุงเทพฯ กับต่างจังหวัด ดูส่วนต่างและเงินออมต่อปี" : "Compare monthly expenses between Bangkok and provincial cities with difference analysis",
    category: "General",
    icon: Icons.Calculator
  },
  {
    id: "qaly-calculator",
    slug: "qaly-calculator",
    name: lang === "TH" ? "คำนวณ QALY ปีชีวิตปรับคุณภาพ" : "QALY Calculator",
    desc: lang === "TH" ? "คำนวณ Quality-Adjusted Life Year เพื่อประเมินคุณภาพชีวิตและความคุ้มค่าของการรักษา" : "Calculate Quality-Adjusted Life Years to assess health interventions cost-effectiveness",
    category: "Health",
    icon: Icons.Calculator
  },
  {
    id: "metcalfe-network-value",
    slug: "metcalfe-network-value",
    name: lang === "TH" ? "Metcalfe's Law Network Value" : "Metcalfe's Law Network Value Calculator",
    desc: lang === "TH" ? "คำนวณมูลค่าเครือข่ายตามกฎของ Metcalfe พร้อมคาดการณ์การเติบโต" : "Calculate network value using Metcalfe's Law with growth projections",
    category: "Technology",
    icon: Icons.Network
  },
  {
    id: "online-course-roi",
    slug: "online-course-roi",
    name: lang === "TH" ? "ค่าใช้จ่ายเรียน Online Course ROI" : "Online Course ROI Calculator",
    desc: lang === "TH" ? "คำนวณผลตอบแทนจากการลงทุนเรียนคอร์สออนไลน์ รวมค่าเสียโอกาสและระยะเวลาคืนทุน" : "Calculate the return on investment for online courses including opportunity cost and payback period",
    category: "General",
    icon: Icons.BookOpen
  },
  {
    id: "viral-coefficient",
    slug: "viral-coefficient",
    name: lang === "TH" ? "Viral Coefficient แอปโตเร็วแค่ไหน" : "Viral Coefficient Calculator",
    desc: lang === "TH" ? "คำนวณ K-Factor และคาดการณ์การเติบโตแบบ Viral ของแอปหรือผลิตภัณฑ์" : "Calculate K-Factor and project viral growth of your app or product",
    category: "Technology",
    icon: Icons.Share2
  },
  {
    id: "automation-roi",
    slug: "automation-roi",
    name: lang === "TH" ? "Automation ROI ลงทุนทำ Bot คืนทุนกี่เดือน" : "Automation ROI Calculator",
    desc: lang === "TH" ? "คำนวณความคุ้มค่าในการลงทุนสร้างระบบอัตโนมัติหรือ Bot โดยวิเคราะห์ระยะเวลาคืนทุนและ ROI" : "Calculate payback period and ROI for investing in automation bots and systems",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "brooks-law-team-size",
    slug: "brooks-law-team-size",
    name: lang === "TH" ? "Brook's Law ขนาดทีมที่เหมาะสม" : "Brook's Law Team Size Calculator",
    desc: lang === "TH" ? "คำนวณขนาดทีมที่เหมาะสมตามกฎ Brook's Law วิเคราะห์ communication overhead และประสิทธิภาพทีม" : "Calculate optimal team size based on Brook's Law, analyzing communication overhead and team efficiency",
    category: "Technology",
    icon: Icons.Calculator
  },
  {
    id: "noise-level-db",
    slug: "noise-level-db",
    name: lang === "TH" ? "คำนวณระดับเสียงสะสม dB" : "Noise Level dB Calculator",
    desc: lang === "TH" ? "คำนวณระดับเสียงรวมจากหลายแหล่ง พร้อมประเมิน Noise Dose ตามมาตรฐาน NIOSH" : "Calculate combined noise levels from multiple sources with NIOSH noise dose assessment",
    category: "Health",
    icon: Icons.Calculator
  },
  {
    id: "sound-insulation",
    slug: "sound-insulation",
    name: lang === "TH" ? "คำนวณฉนวนเสียงที่ต้องการ" : "Sound Insulation Calculator",
    desc: lang === "TH" ? "คำนวณค่า STC ขั้นต่ำที่ต้องการและแนะนำวัสดุกันเสียงที่เหมาะสม" : "Calculate minimum STC rating needed and recommend suitable soundproofing materials",
    category: "Health",
    icon: Icons.Calculator
  },
  {
    id: "flow-state-frequency",
    slug: "flow-state-frequency",
    name: lang === "TH" ? "Flow State Frequency เข้าถึง Flow กี่ครั้ง" : "Flow State Frequency Calculator",
    desc: lang === "TH" ? "คำนวณความถี่ในการเข้าสู่สถานะ Flow และวัดประสิทธิภาพการทำงานลึก" : "Calculate how often you enter flow state and measure deep work effectiveness",
    category: "General",
    icon: Icons.Calculator
  },
  {
    id: "company-registration-cost",
    slug: "company-registration-cost-calculator",
    name: lang === "TH" ? "คำนวณค่าธรรมเนียมจดทะเบียนบริษัท" : "Company Registration Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าธรรมเนียมรัฐและอากรแสตมป์เบื้องต้นในการจดทะเบียนตั้งบริษัท" : "Calculate government fees and stamp duty for company registration",
    category: "Business",
    icon: Icons.Building2
  },
  {
    id: "corporate-tax",
    slug: "corporate-tax-calculator",
    name: lang === "TH" ? "คำนวณภาษีเงินได้นิติบุคคล" : "Corporate Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีเงินได้นิติบุคคลสำหรับ SME และบริษัททั่วไป" : "Calculate corporate income tax for SME and general companies",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "credit-card-mdr-fee",
    slug: "credit-card-mdr-fee-calculator",
    name: lang === "TH" ? "คำนวณค่าธรรมเนียมรูดบัตร (MDR)" : "Credit Card MDR Fee Calculator",
    desc: lang === "TH" ? "คำนวณผลกระทบของค่าธรรมเนียมรูดบัตรเครดิตที่มีต่อกำไรของร้านค้า" : "Calculate the impact of Merchant Discount Rate (MDR) on store profit",
    category: "Finance",
    icon: Icons.CreditCard
  },
  {
    id: "de-ratio",
    slug: "de-ratio-calculator",
    name: lang === "TH" ? "คำนวณอัตราส่วนหนี้สินต่อทุน (D/E)" : "Debt-to-Equity Ratio Calculator",
    desc: lang === "TH" ? "คำนวณอัตราส่วนหนี้สินต่อทุน (D/E Ratio) เพื่อประเมินความเสี่ยงทางการเงิน" : "Calculate Debt-to-Equity Ratio to assess financial risk",
    category: "Finance",
    icon: Icons.Scale
  },
  {
    id: "legal-reserve",
    slug: "legal-reserve-calculator",
    name: lang === "TH" ? "คำนวณทุนสำรองตามกฎหมาย" : "Legal Reserve Calculator",
    desc: lang === "TH" ? "คำนวณเงินสำรองตามกฎหมายที่บริษัทต้องจัดสรรเมื่อมีกำไร" : "Calculate the legal reserve required by law when a company makes a profit",
    category: "Finance",
    icon: Icons.PiggyBank
  },
  {
    id: "markup-imported-materials",
    slug: "markup-imported-materials-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนและราคาขายสินค้านำเข้า" : "Imported Material Markup Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนสินค้านำเข้ารวมภาษีและบวกกำไรเพื่อตั้งราคาขาย" : "Calculate total cost of imported goods including duty and add markup for selling price",
    category: "Business",
    icon: Icons.Package
  },
  {
    id: "pos-system-comparison",
    slug: "pos-system-comparison",
    name: lang === "TH" ? "เปรียบเทียบต้นทุนระบบ POS" : "POS System Comparison",
    desc: lang === "TH" ? "เปรียบเทียบต้นทุนรายปีของระบบ POS แบบซื้อขาด vs แบบเช่า/หัก GP" : "Compare annual cost of POS systems (Upfront vs Subscription/GP)",
    category: "Business",
    icon: Icons.MonitorSmartphone
  },
  {
    id: "quick-current-ratio",
    slug: "quick-current-ratio-calculator",
    name: lang === "TH" ? "คำนวณอัตราส่วนสภาพคล่อง" : "Quick & Current Ratio Calculator",
    desc: lang === "TH" ? "คำนวณ Current Ratio และ Quick Ratio เพื่อประเมินสภาพคล่องระยะสั้น" : "Calculate Current and Quick Ratios to assess short-term liquidity",
    category: "Finance",
    icon: Icons.Activity
  },
  {
    id: "roe-roa-roic",
    slug: "roe-roa-roic-calculator",
    name: lang === "TH" ? "คำนวณ ROE / ROA / ROIC" : "ROE / ROA / ROIC Calculator",
    desc: lang === "TH" ? "คำนวณอัตราผลตอบแทนจากสินทรัพย์ ผู้ถือหุ้น และเงินทุน" : "Calculate Return on Equity, Return on Assets, and Return on Invested Capital",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "sales-commission-structure",
    slug: "sales-commission-structure",
    name: lang === "TH" ? "คำนวณค่าคอมมิชชั่นพนักงานขาย" : "Sales Commission Structure Calculator",
    desc: lang === "TH" ? "คำนวณค่าคอมมิชชั่นแบบ Flat Rate และแบบขั้นบันได (Tiered)" : "Calculate flat rate and tiered sales commission structure",
    category: "Business",
    icon: Icons.Target
  },
  {
    id: "dio",
    slug: "days-inventory-outstanding-calculator",
    name: lang === "TH" ? "คำนวณระยะเวลาขายสินค้าเฉลี่ย (DIO)" : "DIO Calculator",
    desc: lang === "TH" ? "คำนวณ Days Inventory Outstanding (DIO) ระยะเวลาที่สินค้าค้างในสต็อกก่อนขายออก" : "Calculate Days Inventory Outstanding to track how long inventory stays in stock.",
    category: "Finance",
    icon: Icons.Warehouse
  },
  {
    id: "dso",
    slug: "days-sales-outstanding-calculator",
    name: lang === "TH" ? "คำนวณระยะเวลาเก็บหนี้ (DSO)" : "DSO Calculator",
    desc: lang === "TH" ? "คำนวณ Days Sales Outstanding (DSO) หรือระยะเวลาเก็บหนี้เฉลี่ย เพื่อวิเคราะห์สภาพคล่องของธุรกิจ" : "Calculate Days Sales Outstanding to analyze your business liquidity and collection efficiency.",
    category: "Finance",
    icon: Icons.CalendarClock
  },
  {
    id: "employee-bonus",
    slug: "employee-bonus-calculator",
    name: lang === "TH" ? "คำนวณโบนัสพนักงาน (อิงผลงาน)" : "Employee Bonus Calculation",
    desc: lang === "TH" ? "คำนวณโบนัสสิ้นปีโดยใช้ระบบตัวคูณตามผลประกอบการบริษัทและผลงานส่วนบุคคล (KPI)" : "Calculate year-end bonus using performance multipliers for company and individual KPIs.",
    category: "Business",
    icon: Icons.Gift
  },
  {
    id: "expense-ratio",
    slug: "expense-ratio-calculator",
    name: lang === "TH" ? "คำนวณอัตราส่วนค่าใช้จ่าย (Expense Ratio)" : "Expense Ratio Calculator",
    desc: lang === "TH" ? "คำนวณสัดส่วนค่าใช้จ่ายดำเนินงานต่อรายได้รวม (OER) เพื่อวิเคราะห์ประสิทธิภาพการคุมต้นทุน" : "Calculate the Operating Expense Ratio to analyze cost efficiency against total revenue.",
    category: "Finance",
    icon: Icons.PieChart
  },
  {
    id: "gmv-vs-net-revenue",
    slug: "gmv-vs-net-revenue-calculator",
    name: lang === "TH" ? "คำนวณยอดขายแพลตฟอร์ม (GMV vs Net)" : "GMV vs Net Revenue Calculator",
    desc: lang === "TH" ? "แปลงตัวเลขยอดขายรวม (GMV) ให้เป็นรายได้สุทธิ (Net Revenue) หลังหักค่าธรรมเนียมและส่วนลด" : "Convert Gross Merchandise Value (GMV) to true Net Revenue by deducting platform fees.",
    category: "Business",
    icon: Icons.ShoppingCart
  },
  {
    id: "headcount-to-sales",
    slug: "optimal-headcount-sales-calculator",
    name: lang === "TH" ? "คำนวณจำนวนพนักงานขายที่เหมาะสม" : "Optimal Headcount to Sales",
    desc: lang === "TH" ? "คำนวณว่าต้องจ้างพนักงานขายเพิ่มอีกกี่คน เพื่อให้บรรลุเป้าหมายยอดขายใหม่ที่ตั้งไว้" : "Calculate how many sales reps you need to hire to hit your target revenue.",
    category: "Business",
    icon: Icons.Users
  },
  {
    id: "inventory-costing",
    slug: "inventory-costing-fifo-avco",
    name: lang === "TH" ? "คำนวณต้นทุนสินค้า FIFO vs ถัวเฉลี่ย" : "Inventory Costing (FIFO vs AVCO)",
    desc: lang === "TH" ? "เปรียบเทียบการตีราคาต้นทุนสินค้าคงคลังแบบเข้าก่อนออกก่อน (FIFO) กับแบบต้นทุนถัวเฉลี่ย (AVCO)" : "Compare Cost of Goods Sold and Ending Inventory using FIFO and Average Cost (AVCO) methods.",
    category: "Finance",
    icon: Icons.Layers
  },
  {
    id: "landed-cost",
    slug: "landed-cost-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนสินค้านำเข้า" : "Landed Cost Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนสินค้านำเข้ารวมค่าขนส่ง ภาษี และค่าธรรมเนียม เพื่อหาราคาต้นทุนต่อชิ้นที่แท้จริง" : "Calculate the true cost of imported goods including shipping, taxes, and fees.",
    category: "Finance",
    icon: Icons.Ship
  },
  {
    id: "office-vs-wfh",
    slug: "office-vs-wfh-calculator",
    name: lang === "TH" ? "เปรียบเทียบต้นทุน ออฟฟิศ vs WFH" : "Office vs WFH Cost Saving",
    desc: lang === "TH" ? "คำนวณเงินที่องค์กรประหยัดได้จากการให้พนักงาน Work From Home เทียบกับการเช่าออฟฟิศ" : "Calculate the money saved by transitioning from a traditional office to a Work From Home model.",
    category: "Business",
    icon: Icons.Building
  },
  {
    id: "packaging-cost",
    slug: "packaging-cost-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนบรรจุภัณฑ์ต่อชิ้น" : "Packaging Cost per Unit",
    desc: lang === "TH" ? "คำนวณต้นทุนบรรจุภัณฑ์ทั้งหมดที่ใช้ต่อสินค้า 1 ชิ้น รวมถึงกล่อง ฉลาก และค่าแรงแพ็ค" : "Calculate the total packaging cost used per 1 item including box, labels, and labor.",
    category: "Business",
    icon: Icons.Package
  },
  {
    id: "advertising-budget-allocation",
    slug: "advertising-budget-allocation",
    name: lang === "TH" ? "คำนวณสัดส่วนงบโฆษณา (Ad Budget Allocation)" : "Advertising Budget Allocation",
    desc: lang === "TH" ? "คำนวณและจัดสรรงบประมาณโฆษณาเพื่อสร้างยอดขายตามเป้าหมาย (ROAS)" : "Calculate and allocate advertising budget to achieve sales target (ROAS)",
    category: "Business",
    icon: Icons.Megaphone
  },
  {
    id: "cac-payback-period",
    slug: "cac-payback-period-calculator",
    name: lang === "TH" ? "คำนวณระยะเวลาคืนทุนของลูกค้า (CAC Payback)" : "CAC Payback Period Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาที่ใช้ในการคืนทุนค่าใช้จ่ายในการได้ลูกค้าใหม่ (CAC) สำหรับธุรกิจ Subscription หรือ SaaS" : "Calculate the months required to recover Customer Acquisition Cost for subscription businesses",
    category: "Business",
    icon: Icons.Repeat
  },
  {
    id: "ebitda-calculator",
    slug: "ebitda-calculator",
    name: lang === "TH" ? "คำนวณ EBITDA" : "EBITDA Calculator",
    desc: lang === "TH" ? "คำนวณกำไรก่อนหักดอกเบี้ย ภาษี ค่าเสื่อมราคา และค่าตัดจำหน่าย เพื่อประเมินผลการดำเนินงาน" : "Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization",
    category: "Finance",
    icon: Icons.BarChart3
  },
  {
    id: "employee-ot-calculation",
    slug: "employee-ot-calculator",
    name: lang === "TH" ? "คำนวณค่าล่วงเวลา (OT)" : "Employee OT Calculator",
    desc: lang === "TH" ? "คำนวณค่าล่วงเวลาและค่าทำงานในวันหยุดตามกฎหมายแรงงานไทย" : "Calculate overtime pay based on Thai labor laws",
    category: "Business",
    icon: Icons.Clock
  },
  {
    id: "employer-social-security",
    slug: "employer-social-security-calculator",
    name: lang === "TH" ? "คำนวณเงินสมทบประกันสังคม (นายจ้าง)" : "Employer Social Security Cost Calculator",
    desc: lang === "TH" ? "คำนวณภาระต้นทุนเงินสมทบประกันสังคมและกองทุนเงินทดแทนในมุมมองของนายจ้าง" : "Calculate employer contributions to Social Security and Workmen's Compensation Fund",
    category: "Business",
    icon: Icons.ShieldPlus
  },
  {
    id: "fx-forward-rate-risk",
    slug: "fx-forward-rate-calculator",
    name: lang === "TH" ? "คำนวณอัตราแลกเปลี่ยนล่วงหน้า (FX Forward)" : "FX Forward Rate Calculator",
    desc: lang === "TH" ? "คำนวณและประเมินความเสี่ยงอัตราแลกเปลี่ยนด้วยสัญญา Forward" : "Calculate and assess foreign exchange risk with Forward contracts",
    category: "Finance",
    icon: Icons.LineChart
  },
  {
    id: "international-shipping-cost",
    slug: "international-shipping-cost-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนการนำเข้า/ส่งออก (EXW/FOB/CIF)" : "International Shipping Cost Calculator (EXW/FOB/CIF)",
    desc: lang === "TH" ? "คำนวณและเปรียบเทียบต้นทุนการขนส่งสินค้าระหว่างประเทศตามเงื่อนไข Incoterms (EXW, FOB, CIF)" : "Calculate and compare international shipping costs based on Incoterms (EXW, FOB, CIF)",
    category: "Business",
    icon: Icons.Ship
  },
  {
    id: "minimum-wage-province",
    slug: "minimum-wage-thailand-calculator",
    name: lang === "TH" ? "คำนวณและเปรียบเทียบค่าแรงขั้นต่ำรายจังหวัด" : "Minimum Wage by Province Calculator",
    desc: lang === "TH" ? "คำนวณฐานเงินเดือนและเปรียบเทียบค่าแรงขั้นต่ำของแต่ละจังหวัดในประเทศไทย" : "Calculate and compare minimum wages across provinces in Thailand",
    category: "Business",
    icon: Icons.MapPin
  },
  {
    id: "severance-pay-calculation",
    slug: "severance-pay-calculator",
    name: lang === "TH" ? "คำนวณเงินชดเชยเลิกจ้าง" : "Severance Pay Calculator",
    desc: lang === "TH" ? "คำนวณเงินชดเชยเมื่อถูกเลิกจ้างตามอายุงานและกฎหมายแรงงานไทย" : "Calculate severance pay based on tenure and Thai labor laws",
    category: "Business",
    icon: Icons.Briefcase
  },
  {
    id: "warehouse-rent-vs-buy",
    slug: "warehouse-rent-vs-buy-calculator",
    name: lang === "TH" ? "คำนวณเช่า vs ซื้อคลังสินค้า" : "Warehouse Rent vs Buy Calculator",
    desc: lang === "TH" ? "เปรียบเทียบความคุ้มค่าทางการเงินระหว่างการเช่าคลังสินค้ากับการลงทุนสร้าง/ซื้อเองในระยะยาว" : "Compare financial viability between renting a warehouse and building/buying one for long-term",
    category: "Business",
    icon: Icons.Warehouse
  },
  {
    id: "acceptable-cpc",
    slug: "acceptable-cpc-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ Acceptable CPC (ต้นทุนต่อคลิกที่ยอมรับได้)" : "Acceptable CPC Calculator",
    desc: lang === "TH" ? "คำนวณหาค่า CPC สูงสุดที่คุณสามารถจ่ายได้โดยไม่ขาดทุน จาก Conversion Rate และกำไรต่อออเดอร์" : "Calculate the maximum CPC you can afford based on your conversion rate and profit per order.",
    category: "Business",
    icon: Icons.MousePointerClick
  },
  {
    id: "cagr",
    slug: "cagr-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณอัตราการเติบโต (CAGR)" : "CAGR Calculator",
    desc: lang === "TH" ? "คำนวณอัตราการเติบโตเฉลี่ยต่อปีแบบทบต้น (Compound Annual Growth Rate) เพื่อประเมินผลตอบแทนหรือธุรกิจระยะยาว" : "Calculate the Compound Annual Growth Rate (CAGR) to measure smooth investment return or business growth over multiple years.",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "factory-electricity",
    slug: "factory-electricity-calculator",
    name: lang === "TH" ? "เครื่องมือเปรียบเทียบค่าไฟ TOU (ธุรกิจ/โรงงาน)" : "Factory Electricity TOU Calculator",
    desc: lang === "TH" ? "เปรียบเทียบค่าไฟฟ้าสำหรับธุรกิจและโรงงาน ระหว่างอัตราปกติ (Flat Rate) และอัตราตามช่วงเวลา (TOU) เพื่อวางแผนลดต้นทุน" : "Compare business electricity costs between standard flat rates and Time of Use (TOU) rates to optimize overhead expenses.",
    category: "Business",
    icon: Icons.Zap
  },
  {
    id: "franchise-cost",
    slug: "franchise-cost-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณงบลงทุนเปิดแฟรนไชส์ (Total Franchise Cost)" : "Franchise Cost Calculator",
    desc: lang === "TH" ? "คำนวณเงินลงทุนรวมทั้งหมดในการซื้อและเปิดร้านแฟรนไชส์ (ค่าธรรมเนียม, ค่าก่อสร้าง, อุปกรณ์ และเงินทุนหมุนเวียนสำรอง)" : "Calculate the total initial investment required to open a franchise business including fees, build-out, and working capital.",
    category: "Business",
    icon: Icons.Store
  },
  {
    id: "gross-margin-sku",
    slug: "gross-margin-sku-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณกำไรขั้นต้นต่อสินค้า (Gross Margin per SKU)" : "Gross Margin per SKU Calculator",
    desc: lang === "TH" ? "คำนวณกำไรขั้นต้นและอัตรากำไร (Gross Margin %) ของสินค้าแต่ละรายการ เพื่อวิเคราะห์ความคุ้มค่าก่อนตั้งราคาขาย" : "Calculate the Gross Margin percentage and gross profit per SKU to analyze product profitability before pricing.",
    category: "Finance",
    icon: Icons.Package
  },
  {
    id: "nps",
    slug: "nps-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ Net Promoter Score (NPS)" : "NPS Calculator",
    desc: lang === "TH" ? "คำนวณคะแนนความพึงพอใจและวัดความภักดีของลูกค้าที่มีต่อแบรนด์จากผลสำรวจ (NPS)" : "Calculate your Net Promoter Score (NPS) based on customer survey results to gauge brand loyalty and customer satisfaction.",
    category: "Business",
    icon: Icons.Smile
  },
  {
    id: "real-estate-broker-fee",
    slug: "real-estate-broker-fee-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่านายหน้าอสังหาฯ" : "Real Estate Broker Fee Calculator",
    desc: lang === "TH" ? "คำนวณค่านายหน้า (คอมมิชชั่น) อสังหาริมทรัพย์ พร้อมคำนวณภาษีมูลค่าเพิ่ม (VAT) และภาษีหัก ณ ที่จ่าย (WHT)" : "Calculate real estate agent commission fees including VAT and Withholding Tax.",
    category: "Business",
    icon: Icons.Home
  },
  {
    id: "return-rate-impact",
    slug: "return-rate-impact-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณต้นทุนการคืนสินค้า (Return Rate Impact)" : "Cost of Returns Calculator",
    desc: lang === "TH" ? "คำนวณผลกระทบและมูลค่าความเสียหายที่เกิดจากอัตราการคืนสินค้า (Return/COD ตีกลับ) ที่มีต่อกำไรสุทธิของคุณ" : "Calculate the financial impact and hidden costs of your product return rate on overall business profitability.",
    category: "Finance",
    icon: Icons.RotateCcw
  },
  {
    id: "roas",
    slug: "roas-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ ROAS (ผลตอบแทนจากโฆษณา)" : "ROAS Calculator",
    desc: lang === "TH" ? "คำนวณ Return on Ad Spend ประเมินว่าค่าแอดที่จ่ายไปสร้างยอดขายกลับมาได้กี่เท่า พร้อมหาจุดคุ้มทุน (Break-even ROAS)" : "Calculate the Return on Ad Spend (ROAS) to evaluate the effectiveness of your advertising campaigns and find break-even point.",
    category: "Finance",
    icon: Icons.Target
  },
  {
    id: "saas-mrr-arr",
    slug: "saas-mrr-arr-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณ MRR และ ARR (SaaS/Subscription)" : "SaaS MRR & ARR Calculator",
    desc: lang === "TH" ? "คำนวณรายได้ประจำรายเดือน (MRR) และรายได้ประจำรายปี (ARR) ของธุรกิจรูปแบบสมัครสมาชิก" : "Calculate Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR) for Subscription and SaaS businesses.",
    category: "Business",
    icon: Icons.Repeat
  },
  {
    id: "break-even-by-channel",
    slug: "break-even-by-channel",
    name: lang === "TH" ? "จุดคุ้มทุนแยกช่องทาง" : "Break-even by Channel",
    desc: lang === "TH" ? "เปรียบเทียบจุดคุ้มทุนระหว่างการขายหน้าร้าน (Retail) และออนไลน์ (Online)" : "Compare break-even points between retail and online sales channels.",
    category: "Business",
    icon: Icons.Store
  },
  {
    id: "carbon-credit-cost",
    slug: "carbon-credit-cost-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนคาร์บอนเครดิต" : "Carbon Credit Cost Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนการซื้อหรือชดเชยคาร์บอนเครดิตสำหรับธุรกิจ" : "Calculate the cost of purchasing or offsetting carbon credits for business.",
    category: "Business",
    icon: Icons.Leaf
  },
  {
    id: "event-cost-per-attendee",
    slug: "event-cost-per-attendee",
    name: lang === "TH" ? "คำนวณต้นทุนงานอีเวนต์ต่อหัว" : "Event Cost per Attendee Calculator",
    desc: lang === "TH" ? "ประเมินต้นทุนรวมและต้นทุนต่อหัวในการจัดงานอีเวนต์" : "Estimate total event cost and cost per attendee.",
    category: "Business",
    icon: Icons.Users
  },
  {
    id: "iso-certification-cost",
    slug: "iso-certification-cost",
    name: lang === "TH" ? "คำนวณต้นทุนมาตรฐาน ISO" : "ISO Certification Cost",
    desc: lang === "TH" ? "ประเมินค่าใช้จ่ายในการขอรับรองและรักษาระบบมาตรฐาน ISO" : "Estimate the cost of obtaining and maintaining ISO certification.",
    category: "Business",
    icon: Icons.Award
  },
  {
    id: "npv-irr",
    slug: "npv-irr-calculator",
    name: lang === "TH" ? "คำนวณ NPV และ IRR" : "NPV & IRR Calculator",
    desc: lang === "TH" ? "ประเมินมูลค่าปัจจุบันสุทธิ (NPV) และอัตราผลตอบแทนภายใน (IRR) ของโครงการ" : "Calculate Net Present Value and Internal Rate of Return for projects.",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "patent-cost",
    slug: "patent-cost-calculator",
    name: lang === "TH" ? "คำนวณค่าจดสิทธิบัตรและบำรุงรักษา" : "Patent Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายในการยื่นจดสิทธิบัตรและค่าบำรุงรักษารายปี" : "Calculate patent filing fees and annual maintenance costs.",
    category: "Business",
    icon: Icons.FileBadge
  },
  {
    id: "project-payback-period",
    slug: "project-payback-period-calculator",
    name: lang === "TH" ? "คำนวณระยะเวลาคืนทุน" : "Project Payback Period",
    desc: lang === "TH" ? "คำนวณระยะเวลาคืนทุนของโครงการลงทุน (Payback Period)" : "Calculate the payback period for a project investment.",
    category: "Finance",
    icon: Icons.Clock
  },
  {
    id: "royalty-income",
    slug: "royalty-income-calculator",
    name: lang === "TH" ? "คำนวณรายได้ค่าลิขสิทธิ์" : "Royalty Income Calculator",
    desc: lang === "TH" ? "คำนวณรายได้จากค่าลิขสิทธิ์และการหักภาษี ณ ที่จ่าย" : "Calculate royalty income and withholding tax deductions.",
    category: "Finance",
    icon: Icons.Coins
  },
  {
    id: "sensitivity-analysis",
    slug: "sensitivity-analysis-calculator",
    name: lang === "TH" ? "เครื่องมือวิเคราะห์ความอ่อนไหว" : "Sensitivity Analysis Calculator",
    desc: lang === "TH" ? "ประเมินผลกระทบของตัวแปรที่เปลี่ยนแปลงต่อผลกำไรของธุรกิจ" : "Analyze how changes in key variables impact business profit.",
    category: "Finance",
    icon: Icons.Activity
  },
  {
    id: "space-rental-deposit",
    slug: "space-rental-deposit-calculator",
    name: lang === "TH" ? "คำนวณเงินมัดจำเช่าพื้นที่" : "Space Rental Deposit",
    desc: lang === "TH" ? "คำนวณเงินมัดจำ ค่าเช่าล่วงหน้า และค่าใช้จ่ายวันทำสัญญาสำหรับพื้นที่ธุรกิจ" : "Calculate rental deposits, advance payments, and move-in costs.",
    category: "Business",
    icon: Icons.Key
  },
  {
    id: "banana-farming-calculator",
    slug: "banana-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกกล้วย" : "Banana Farming Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณต้นทุน รายรับ และกำไรสุทธิจากการปลูกกล้วย (กล้วยน้ำว้า/กล้วยหอม)" : "Calculate costs, revenue, and net profit for banana farming.",
    category: "Agriculture",
    icon: Icons.Sprout
  },
  {
    id: "broiler-chicken-farm-calculator",
    slug: "broiler-chicken-farm-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรฟาร์มไก่เนื้อ" : "Broiler Chicken Farm Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมประเมินรายรับ ต้นทุน และกำไรจากการเลี้ยงไก่เนื้อ (ต่อรุ่น/ต่อโรงเรือน)" : "Calculate costs, revenue, and net profit for a broiler chicken farm per batch.",
    category: "Agriculture",
    icon: Icons.Bird
  },
  {
    id: "cassava-farming-calculator",
    slug: "cassava-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกมันสำปะหลัง" : "Cassava Farming Profit Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณต้นทุน รายรับ และกำไรสุทธิจากการปลูกมันสำปะหลังต่อไร่" : "Calculate costs, revenue, and net profit for cassava farming per rai.",
    category: "Agriculture",
    icon: Icons.Sprout
  },
  {
    id: "coconut-farming-calculator",
    slug: "coconut-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกมะพร้าว" : "Coconut Farming Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณรายได้ ต้นทุน และกำไรสุทธิจากสวนมะพร้าว (มะพร้าวน้ำหอม/มะพร้าวแกง)" : "Calculate costs, revenue, and net profit for coconut farming per year.",
    category: "Agriculture",
    icon: Icons.Trees
  },
  {
    id: "corn-farming-calculator",
    slug: "corn-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุนและกำไรปลูกข้าวโพด" : "Corn Farming Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณต้นทุน รายได้ และกำไรสุทธิจากการปลูกข้าวโพด ประเมินความคุ้มค่าในการลงทุน" : "Calculate costs, revenue, and net profit for corn farming.",
    category: "Agriculture",
    icon: Icons.Tractor
  },
  {
    id: "mango-farming-calculator",
    slug: "mango-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกมะม่วง" : "Mango Farming Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณรายได้ ต้นทุน และกำไรสุทธิจากสวนมะม่วงเพื่อการค้า" : "Calculate annual costs, revenue, and net profit for a commercial mango orchard.",
    category: "Agriculture",
    icon: Icons.Trees
  },
  {
    id: "oil-palm-farming-calculator",
    slug: "oil-palm-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกปาล์มน้ำมัน" : "Oil Palm Farming Profit Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณต้นทุน รายได้ และกำไรสุทธิจากสวนปาล์มน้ำมันต่อปี" : "Calculate annual costs, revenue, and net profit for oil palm farming.",
    category: "Agriculture",
    icon: Icons.Trees
  },
  {
    id: "rubber-tree-farming-calculator",
    slug: "rubber-tree-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกยางพารา" : "Rubber Tree Farming Profit Calculator",
    desc: lang === "TH" ? "เครื่องมือประเมินรายรับ ต้นทุน และกำไรสุทธิจากสวนยางพาราต่อปี" : "Calculate costs, revenue, and net profit for rubber tree farming per year.",
    category: "Agriculture",
    icon: Icons.Trees
  },
  {
    id: "sugarcane-farming-calculator",
    slug: "sugarcane-farming-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรปลูกอ้อย" : "Sugarcane Farming Profit Calculator",
    desc: lang === "TH" ? "เครื่องมือประเมินรายรับ ต้นทุน และกำไรสุทธิจากการปลูกอ้อยโรงงาน" : "Calculate costs, revenue, and net profit for sugarcane farming.",
    category: "Agriculture",
    icon: Icons.Tractor
  },
  {
    id: "white-shrimp-farm-calculator",
    slug: "white-shrimp-farm-calculator",
    name: lang === "TH" ? "คำนวณต้นทุน/กำไรฟาร์มกุ้งขาว" : "White Shrimp Farm Profit Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณต้นทุน รายได้ และกำไรจากการเลี้ยงกุ้งขาวแวนนาไม (ต่อบ่อ/ต่อรอบ)" : "Calculate costs, revenue, and net profit for white shrimp farming per pond/crop.",
    category: "Agriculture",
    icon: Icons.Fish
  },
  {
    id: "agri-chemical-mix-ratio",
    slug: "agri-chemical-mix-ratio",
    name: lang === "TH" ? "คำนวณสารเคมีเกษตรต่อถัง" : "Agri-Chemical Mix Ratio",
    desc: lang === "TH" ? "คำนวณอัตราส่วนการผสมสารเคมีเกษตร ปุ๋ย และฮอร์โมนต่อน้ำ 1 ถัง" : "Calculate the precise mixing ratio of agricultural chemicals per spray tank.",
    category: "Agriculture",
    icon: Icons.Beaker
  },
  {
    id: "beef-cattle-farm-profit-cost",
    slug: "beef-cattle-farm-profit-cost",
    name: lang === "TH" ? "ต้นทุน/กำไรฟาร์มโคเนื้อ" : "Beef Cattle Farm Profit/Cost",
    desc: lang === "TH" ? "โปรแกรมคำนวณต้นทุนค่าอาหารและประเมินกำไรสำหรับการเลี้ยงโคเนื้อ/โคขุน" : "Calculate costs and profit margin for beef cattle and fattening farms.",
    category: "Agriculture",
    icon: Icons.Activity
  },
  {
    id: "drip-irrigation-cost",
    slug: "drip-irrigation-cost",
    name: lang === "TH" ? "ระบบน้ำหยด - ออกแบบและค่าใช้จ่าย" : "Drip Irrigation Cost",
    desc: lang === "TH" ? "คำนวณความยาวเทปน้ำหยด จำนวนม้วน และประเมินต้นทุนระบบน้ำหยดต่อไร่" : "Estimate materials and costs for installing a drip irrigation system.",
    category: "Agriculture",
    icon: Icons.Waves
  },
  {
    id: "farm-area-from-gps",
    slug: "farm-area-from-gps",
    name: lang === "TH" ? "คำนวณพื้นที่เกษตรจาก GPS Coordinates" : "Farm Area from GPS",
    desc: lang === "TH" ? "แปลงพิกัดละติจูด/ลองจิจูดจากมุมแปลงเป็นขนาดพื้นที่ (ไร่-งาน-ตารางวา)" : "Calculate farm area in Rai and Sqm by inputting GPS coordinates of the field.",
    category: "Agriculture",
    icon: Icons.Map
  },
  {
    id: "farm-break-even-yield",
    slug: "farm-break-even-yield",
    name: lang === "TH" ? "ปริมาณผลผลิตที่ต้องขายเพื่อคืนทุน" : "Farm Break-even Yield",
    desc: lang === "TH" ? "คำนวณปริมาณผลผลิตขั้นต่ำต่อไร่ที่ต้องทำให้ได้เพื่อไม่ให้ขาดทุน" : "Calculate the minimum crop yield required per Rai to break even.",
    category: "Agriculture",
    icon: Icons.Target
  },
  {
    id: "farm-labor-cost-per-rai",
    slug: "farm-labor-cost-per-rai",
    name: lang === "TH" ? "คำนวณค่าจ้างแรงงานเกษตรต่อไร่" : "Farm Labor Cost per Rai",
    desc: lang === "TH" ? "คำนวณต้นทุนค่าแรงเฉลี่ยต่อไร่ และวัดประสิทธิภาพการทำงานของคนงาน (ไร่/คน/วัน)" : "Calculate exact labor cost per Rai and analyze workers' efficiency.",
    category: "Agriculture",
    icon: Icons.Users
  },
  {
    id: "layer-chicken-farm-profit-cost",
    slug: "layer-chicken-farm-profit-cost",
    name: lang === "TH" ? "ต้นทุน/กำไรฟาร์มไก่ไข่" : "Layer Chicken Farm Profit/Cost",
    desc: lang === "TH" ? "คำนวณต้นทุน รายได้ และกำไรสำหรับการทำฟาร์มไก่ไข่เบื้องต้น" : "Calculate costs, revenues, and profit for layer chicken farming.",
    category: "Agriculture",
    icon: Icons.Egg
  },
  {
    id: "pig-farm-profit-cost",
    slug: "pig-farm-profit-cost",
    name: lang === "TH" ? "ต้นทุน/กำไรฟาร์มหมู" : "Pig Farm Profit/Cost",
    desc: lang === "TH" ? "โปรแกรมคำนวณต้นทุน กำไร และประเมินจุดคุ้มทุนสำหรับการเลี้ยงหมูขุน" : "Calculate and estimate profit, costs, and ROI for a commercial pig farm.",
    category: "Agriculture",
    icon: Icons.Activity
  },
  {
    id: "seeds-per-rai-calculator",
    slug: "seeds-per-rai-calculator",
    name: lang === "TH" ? "คำนวณปริมาณเมล็ดพันธุ์ต่อไร่" : "Seeds per Rai Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนต้นต่อไร่และปริมาณเมล็ดพันธุ์ที่ต้องใช้ตามระยะปลูก" : "Calculate the exact amount of seeds needed per Rai based on planting spacing.",
    category: "Agriculture",
    icon: Icons.Sprout
  },
  {
    id: "tractor-rent-vs-buy",
    slug: "tractor-rent-vs-buy",
    name: lang === "TH" ? "ต้นทุนรถไถเช่า vs ซื้อ" : "Tractor Rent vs Buy",
    desc: lang === "TH" ? "เปรียบเทียบต้นทุนและหาจุดคุ้มทุน เลือกระหว่างการซื้อรถไถเองหรือจ้างเหมา" : "Compare costs and find the break-even point between buying a tractor and renting one.",
    category: "Agriculture",
    icon: Icons.Tractor
  },
  {
    id: "farm-land-rent-roi",
    slug: "farm-land-rent-roi",
    name: lang === "TH" ? "คำนวณค่าเช่าที่ดินเกษตร เทียบกำไร" : "Farm Land Rent ROI Calculator",
    desc: lang === "TH" ? "ประเมินความคุ้มค่าของการเช่าที่ดินเพื่อการเกษตร โดยเปรียบเทียบค่าเช่ากับรายได้สุทธิ" : "Evaluate the profitability of renting agricultural land by comparing rent costs with net income.",
    category: "Agriculture",
    icon: Icons.Tractor
  },
  {
    id: "food-carbon-footprint",
    slug: "food-carbon-footprint",
    name: lang === "TH" ? "คำนวณ Carbon Footprint อาหาร" : "Food Carbon Footprint",
    desc: lang === "TH" ? "เปรียบเทียบการปล่อยคาร์บอนระหว่างการบริโภคเนื้อสัตว์และพืชผัก เพื่อทางเลือกที่รักษ์โลก" : "Compare carbon emissions between meat and plant-based foods for eco-friendly choices.",
    category: "Environment",
    icon: Icons.Utensils
  },
  {
    id: "fresh-to-dry-weight",
    slug: "fresh-to-dry-weight",
    name: lang === "TH" ? "คำนวณน้ำหนักผลผลิตสดเป็นแห้ง" : "Fresh to Dry Weight Converter",
    desc: lang === "TH" ? "คำนวณน้ำหนักผลผลิตทางการเกษตรหลังการอบแห้งหรือตากแห้ง โดยอิงจากความชื้น" : "Calculate agricultural product weight after drying based on moisture content.",
    category: "Agriculture",
    icon: Icons.Scale
  },
  {
    id: "germination-rate",
    slug: "germination-rate",
    name: lang === "TH" ? "คำนวณอัตราการงอกของเมล็ดพันธุ์" : "Germination Rate Calculator",
    desc: lang === "TH" ? "คำนวณเปอร์เซ็นต์อัตราการงอกของเมล็ดพันธุ์ เพื่อประเมินคุณภาพเมล็ดก่อนปลูกจริง" : "Calculate the germination rate percentage of seeds to assess seed quality before planting.",
    category: "Agriculture",
    icon: Icons.Sprout
  },
  {
    id: "harvest-time",
    slug: "harvest-time",
    name: lang === "TH" ? "คำนวณระยะเวลาเก็บเกี่ยว" : "Harvest Time from Planting",
    desc: lang === "TH" ? "คำนวณวันเก็บเกี่ยวผลผลิตจากวันปลูกและอายุของพืช เพื่อวางแผนการเก็บเกี่ยว" : "Calculate expected harvest date based on planting date and days to maturity.",
    category: "Agriculture",
    icon: Icons.Calendar
  },
  {
    id: "mill-storage-electricity",
    slug: "mill-storage-electricity",
    name: lang === "TH" ? "คำนวณการใช้ไฟฟ้าโรงสี/โรงเก็บ" : "Mill/Storage Electricity Cost",
    desc: lang === "TH" ? "คำนวณค่าไฟฟ้าของมอเตอร์ เครื่องจักร และระบบระบายอากาศในโรงสีหรือไซโล" : "Calculate electricity costs for motors, machinery, and ventilation in mills or silos.",
    category: "Agriculture",
    icon: Icons.Zap
  },
  {
    id: "product-water-footprint",
    slug: "product-water-footprint",
    name: lang === "TH" ? "คำนวณ Water Footprint สินค้า" : "Product Water Footprint",
    desc: lang === "TH" ? "เปรียบเทียบปริมาณน้ำที่ใช้ในการผลิตสินค้าอุปโภคบริโภคต่างๆ เพื่อสร้างความตระหนักรู้" : "Compare the hidden water used to produce various consumer goods to raise awareness.",
    category: "Environment",
    icon: Icons.Droplets
  },
  {
    id: "recycled-waste-impact",
    slug: "recycled-waste-impact",
    name: lang === "TH" ? "ปริมาณขยะรีไซเคิลที่ลดได้ต่อปี" : "Recycled Waste Impact",
    desc: lang === "TH" ? "คำนวณการลดการปล่อยก๊าซเรือนกระจกจากการคัดแยกและรีไซเคิลขยะประเภทต่างๆ" : "Calculate greenhouse gas emission reductions from sorting and recycling various types of waste.",
    category: "Environment",
    icon: Icons.Recycle
  },
  {
    id: "travel-carbon-footprint",
    slug: "travel-carbon-footprint",
    name: lang === "TH" ? "คำนวณ Carbon Footprint การเดินทาง" : "Travel Carbon Footprint",
    desc: lang === "TH" ? "ประเมินปริมาณการปล่อยก๊าซคาร์บอนไดออกไซด์จากการเดินทางด้วยยานพาหนะประเภทต่างๆ" : "Estimate CO2 emissions from traveling using various modes of transportation.",
    category: "Environment",
    icon: Icons.Car
  },
  {
    id: "water-saving-impact",
    slug: "water-saving-impact",
    name: lang === "TH" ? "ค่าน้ำที่ประหยัดได้จากการเปลี่ยนพฤติกรรม" : "Water Saving Impact",
    desc: lang === "TH" ? "คำนวณปริมาณน้ำและเงินที่ประหยัดได้จากการลดเวลาอาบน้ำหรือปิดน้ำขณะแปรงฟัน" : "Calculate water and money saved by reducing shower time or turning off the tap while brushing.",
    category: "Environment",
    icon: Icons.Droplets
  },
  {
    id: "capacitor-charge",
    slug: "คำนวณ-capacitor-charge",
    name: lang === "TH" ? "คำนวณประจุและพลังงานคาปาซิเตอร์" : "Capacitor Charge & Energy Calculator",
    desc: lang === "TH" ? "คำนวณประจุไฟฟ้า (Q) และพลังงานที่สะสม (E) ในตัวเก็บประจุจากค่าความจุและแรงดัน" : "Calculate the charge (Q) and stored energy (E) in a capacitor given capacitance and voltage.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "car-loan-flat-rate",
    slug: "car-loan-flat-rate",
    name: lang === "TH" ? "คำนวณค่างวดผ่อนรถใหม่ (Flat Rate)" : "New Car Loan Calculator (Flat Rate)",
    desc: lang === "TH" ? "คำนวณค่างวดรถยนต์ป้ายแดง ด้วยดอกเบี้ยแบบ Flat Rate พร้อมยอดจัดและดอกเบี้ยรวม" : "Calculate new car loan monthly payments using a flat interest rate.",
    category: "Finance",
    icon: Icons.Car
  },
  {
    id: "car-loan-used-car",
    slug: "car-loan-used-car",
    name: lang === "TH" ? "คำนวณค่างวดรถมือสอง (รวม VAT 7%)" : "Used Car Loan Calculator (incl. VAT)",
    desc: lang === "TH" ? "คำนวณค่างวดผ่อนรถยนต์มือสอง ที่ต้องบวก VAT 7% ในแต่ละงวด" : "Calculate used car loan payments, including the mandatory 7% VAT.",
    category: "Finance",
    icon: Icons.CarFront
  },
  {
    id: "car-painting-cost",
    slug: "คำนวณราคาพ่นสีรถยนต์",
    name: lang === "TH" ? "คำนวณราคาพ่นสีรถยนต์" : "Car Painting Cost Estimator",
    desc: lang === "TH" ? "ประมาณราคาค่าพ่นสีรถยนต์ตามขนาดของรถ ชนิดของสี และรูปแบบการพ่นสี (ทั้งคัน / เฉพาะจุด)" : "Estimate the cost of painting a car based on vehicle size, paint grade, and full body or panel-by-panel options.",
    category: "Utility",
    icon: Icons.Car
  },
  {
    id: "cartesian-product",
    slug: "cartesian-product",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลคูณคาร์ทีเซียน" : "Cartesian Product Calculator",
    desc: lang === "TH" ? "คำนวณหาผลคูณคาร์ทีเซียน (A x B) ของสองเซต พร้อมแสดงคู่อันดับและตารางจับคู่อย่างละเอียด" : "Calculate the Cartesian Product (A x B) of two sets, displaying the ordered pairs and matching grid.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "cartesian-to-polar",
    slug: "cartesian-to-polar",
    name: lang === "TH" ? "แปลงพิกัดฉากเป็นพิกัดเชิงขั้ว" : "Cartesian to Polar Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงพิกัดฉาก (Cartesian) เป็นพิกัดเชิงขั้ว (Polar)" : "Convert Cartesian coordinates (x, y) to Polar coordinates (r, θ)",
    category: "Science",
    icon: Icons.Compass
  },
  {
    id: "cbm-calculator",
    slug: "cbm-calculator",
    name: lang === "TH" ? "คำนวณ CBM ลูกบาศก์เมตร" : "CBM Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณ CBM (Cubic Meter) สำหรับประเมินปริมาตรสินค้าและค่าขนส่ง" : "CBM (Cubic Meter) calculator for estimating cargo volume and shipping costs.",
    category: "Business",
    icon: Icons.Box
  },
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณเกรดเฉลี่ยสะสมรวมทุกเทอม (GPAX)" : "CGPA (GPAX) Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณเกรดเฉลี่ยสะสมรวมหลายเทอม (GPAX / CGPA) เพียงกรอกเกรดเฉลี่ยและหน่วยกิตของแต่ละเทอม" : "Calculate your cumulative GPA (CGPA or GPAX) across multiple semesters based on semester GPA and credits.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "chi-square",
    slug: "คำนวณ-chi-square",
    name: lang === "TH" ? "คำนวณ Chi-Square Test" : "Chi-Square Calculator",
    desc: lang === "TH" ? "คำนวณการทดสอบไคสแควร์ (Chi-Square Test of Independence / Goodness of Fit)" : "Calculate the Chi-Square statistics for testing independence or goodness of fit.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "china-import-lead-time",
    slug: "china-import-lead-time",
    name: lang === "TH" ? "คำนวณระยะเวลานำเข้าสินค้าจากจีน" : "China Import Lead Time Calculator",
    desc: lang === "TH" ? "คำนวณ Lead Time การสั่งสินค้าจาก Alibaba/1688 มาไทย" : "Calculate Lead Time for importing goods from Alibaba/1688 to Thailand.",
    category: "Business",
    icon: Icons.Ship
  },
  {
    id: "circadian-rhythm",
    slug: "circadian-rhythm",
    name: lang === "TH" ? "คำนวณเวลานอน (วัฏจักรการนอนหลับ)" : "Sleep Cycle Calculator",
    desc: lang === "TH" ? "คำนวณเวลาเข้านอนหรือเวลาตื่นนอนที่เหมาะสม เพื่อให้ตื่นมาสดชื่นไม่งัวเงียตามหลักวัฏจักรการนอนหลับ" : "Calculate the optimal bedtime or wake-up time based on 90-minute sleep cycles.",
    category: "Health",
    icon: Icons.Moon
  },
  {
    id: "circumference-calculator",
    slug: "circumference-calculator",
    name: lang === "TH" ? "เครื่องคำนวณความยาวเส้นรอบวง" : "Circumference Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาความยาวเส้นรอบวงของวงกลม จากรัศมีหรือเส้นผ่านศูนย์กลาง" : "Calculate the circumference of a circle from its radius or diameter.",
    category: "Science",
    icon: Icons.Circle
  },
  {
    id: "code-coverage",
    slug: "code-coverage",
    name: lang === "TH" ? "คำนวณเป้าหมาย Code Coverage" : "Code Coverage Target Calculator",
    desc: lang === "TH" ? "คำนวณเป้าหมายการเขียนเทสต์ (Code Coverage) ที่เหมาะสมสำหรับแต่ละโมดูล โดยพิจารณาจากความเสี่ยง" : "Calculate the appropriate code coverage target for a module based on risk factors.",
    category: "Technology",
    icon: Icons.ShieldCheck
  },
  {
    id: "coefficient-of-variation",
    slug: "coefficient-of-variation",
    name: lang === "TH" ? "เครื่องมือคำนวณสัมประสิทธิ์ความแปรผัน (CV)" : "Coefficient of Variation Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณสัมประสิทธิ์ความแปรผัน (Coefficient of Variation - CV) ทางสถิติ" : "Statistical Coefficient of Variation (CV) Calculator",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "coffee-shop-annual-cost",
    slug: "คำนวณค่ากาแฟนอกบ้านต่อปี",
    name: lang === "TH" ? "คำนวณค่ากาแฟนอกบ้านต่อปี" : "Coffee Shop Annual Cost Calculator",
    desc: lang === "TH" ? "คำนวณและประเมินค่าใช้จ่ายซื้อกาแฟและขนมนอกบ้านสะสมรายปี" : "Evaluate your café expenses, home-brewing savings, and future value growth.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "cognitive-load",
    slug: "cognitive-load",
    name: lang === "TH" ? "ประเมินภาระทางปัญญา (Cognitive Load)" : "Daily Cognitive Load Calculator",
    desc: lang === "TH" ? "ประเมินระดับความเหนื่อยล้าของสมองจากการทำงานในแต่ละวัน เพื่อป้องกันภาวะสมองล้าและหมดไฟ" : "Evaluate your brain's exhaustion level from daily work to prevent burnout.",
    category: "General",
    icon: Icons.Brain
  },
  {
    id: "combination-calculator",
    slug: "combination-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณวิธีการจัดหมู่ (Combination: nCr)" : "Combination Calculator (nCr)",
    desc: lang === "TH" ? "คำนวณจำนวนวิธีการจัดหมู่ของสิ่งของต่างๆ (nCr) แสดงสูตรและวิธีคำนวณอย่างละเอียด พร้อมคำอธิบาย" : "Calculate the number of combinations (nCr) for choosing r items from n, with step-by-step calculation details.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "commercial-cap-rate",
    slug: "คำนวณ-cap-rate-อสังหา",
    name: lang === "TH" ? "คำนวณ Cap Rate อสังหาฯ เชิงพาณิชย์" : "Commercial Property Cap Rate Calculator",
    desc: lang === "TH" ? "คำนวณอัตราผลตอบแทนจากการลงทุนในอสังหาริมทรัพย์เพื่อการพาณิชย์ เช่น อาคารสำนักงาน ร้านค้า หอพัก" : "Calculate the capitalization rate for commercial real estate properties.",
    category: "Finance",
    icon: Icons.Building
  },
  {
    id: "compound-learning-roi",
    slug: "compound-learning-roi",
    name: lang === "TH" ? "Compound Learning ความรู้ที่เพิ่มทบต้น" : "Compound Learning ROI",
    desc: lang === "TH" ? "คำนวณการเติบโตของทักษะความรู้ หากคุณพัฒนาขึ้นเพียงวันละ 1% ตามกฎผลตอบแทนทบต้น" : "Calculate the growth of your knowledge if you improve 1% a day",
    category: "General",
    icon: Icons.BookOpen
  },
  {
    id: "confidence-interval",
    slug: "คำนวณ-confidence-interval",
    name: lang === "TH" ? "คำนวณ Confidence Interval" : "Confidence Interval Calculator",
    desc: lang === "TH" ? "คำนวณหาช่วงความเชื่อมั่นของค่าเฉลี่ยประชากร (90%, 95%, 99%)" : "Calculate the confidence interval for a population mean (90%, 95%, 99%).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "container-weight-capacity",
    slug: "container-weight-capacity",
    name: lang === "TH" ? "คำนวณความจุน้ำหนักตู้คอนเทนเนอร์" : "Container Weight Capacity Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนสินค้าที่สามารถโหลดเข้าตู้ 20/40 ฟุต" : "Calculate the number of items that can be loaded into 20/40 ft containers based on weight and volume.",
    category: "Business",
    icon: Icons.Box
  },
  {
    id: "continuous-compounding",
    slug: "คำนวณดอกเบี้ยทบต้นต่อเนื่อง",
    name: lang === "TH" ? "คำนวณดอกเบี้ยทบต้นต่อเนื่อง" : "Continuous Compounding Calculator",
    desc: lang === "TH" ? "คำนวณเงินต้นรวมดอกเบี้ยทบต้นแบบต่อเนื่องตามเวลาและอัตราดอกเบี้ยรายปี" : "Calculate continuous compounding interest over time with annual interest rate.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "cost-per-wear",
    slug: "คำนวณ-cost-per-wear",
    name: lang === "TH" ? "คำนวณ Cost per Wear" : "Cost per Wear Calculator",
    desc: lang === "TH" ? "คำนวณความคุ้มค่าของเสื้อผ้าและของใช้แฟชั่นต่อการสวมใส่ 1 ครั้ง" : "Calculate the cost-per-wear of clothing and fashion items based on price and usage.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "creativity-score",
    slug: "creativity-score",
    name: lang === "TH" ? "ประเมินคะแนนความคิดสร้างสรรค์" : "Creativity Score Evaluator",
    desc: lang === "TH" ? "ประเมินความคิดสร้างสรรค์ของคุณตามหลักของ Guilford (Fluency, Originality, Flexibility, Elaboration)" : "Evaluate your creativity based on Guilford's components (Fluency, Originality, Flexibility, Elaboration)",
    category: "General",
    icon: Icons.Lightbulb
  },
  {
    id: "credit-card-minimum-payment",
    slug: "credit-card-minimum-payment",
    name: lang === "TH" ? "คำนวณระยะเวลาปลดหนี้บัตรเครดิต (จ่ายขั้นต่ำ)" : "Credit Card Minimum Payment Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาในการปลดหนี้และดอกเบี้ยที่ต้องจ่าย เมื่อคุณเลือกจ่ายแค่ขั้นต่ำของบัตรเครดิต" : "Calculate payoff time and interest paid when making only minimum payments on your credit card.",
    category: "Finance",
    icon: Icons.CreditCard
  },
  {
    id: "cronbach-alpha",
    slug: "cronbach-alpha",
    name: lang === "TH" ? "เครื่องมือคำนวณหาความเชื่อมั่นด้วยครอนบาคอัลฟา" : "Cronbach's Alpha Calculator",
    desc: lang === "TH" ? "คำนวณหาความเชื่อมั่นของแบบสอบถามหรือเครื่องมือวัดด้วยค่าอัลฟาของครอนบาค (Cronbach's Alpha)" : "Calculate the internal consistency reliability of an instrument using Cronbach's Alpha.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "cross-product",
    slug: "cross-product",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลคูณเชิงเวกเตอร์แบบครอส" : "Cross Product Calculator",
    desc: lang === "TH" ? "คำนวณหาผลคูณเชิงเวกเตอร์แบบครอส (Cross Product) ของเวกเตอร์ 3 มิติ พร้อมแสดงวิธีทำ" : "Calculate the cross product of 3D vectors with step-by-step solution.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "cube-root-calculator",
    slug: "cube-root-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหารากที่สาม (Cube Root)" : "Cube Root Calculator",
    desc: lang === "TH" ? "คำนวณรากที่สามของตัวเลข รองรับจำนวนบวกและลบ แสดงคำตอบเป็นทศนิยมและรูปอย่างง่าย พร้อมวิธีคิดอย่างละเอียด" : "Calculate the cube root of a number, simplify, and display step-by-step explanations. Supports both positive and negative values.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "cumulative-noise",
    slug: "cumulative-noise",
    name: lang === "TH" ? "คำนวณระดับเสียงสะสม (dB)" : "Cumulative Noise Level Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณระดับเสียงสะสมเพื่อประเมินความเสี่ยงต่อการสูญเสียการได้ยิน" : "Calculate cumulative noise exposure level to assess hearing loss risk.",
    category: "Health",
    icon: Icons.Volume2
  },
  {
    id: "custom-base-logarithm",
    slug: "custom-base-logarithm",
    name: lang === "TH" ? "คำนวณลอการิทึมฐานใดๆ" : "Custom Base Logarithm Calculator",
    desc: lang === "TH" ? "เครื่องมือหาค่าลอการิทึมของตัวเลขโดยกำหนดฐานได้เอง (log base x of y)" : "Calculate the logarithm of a number with a custom base",
    category: "Science",
    icon: Icons.Sigma
  },
  {
    id: "decile-calculator",
    slug: "decile-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณเดไซล์ (Decile)" : "Decile Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณเดไซล์ (Decile) ของคะแนนชุดข้อมูล แบ่งข้อมูลเรียงลำดับออกเป็น 10 ส่วนเท่าๆ กัน พร้อมอธิบายวิธีคำนวณแต่ละขั้นตอน" : "Calculate the decile (D1 to D9) of a dataset, with both Thai school curriculum and standard statistical options.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "decimal-to-fraction",
    slug: "decimal-to-fraction",
    name: lang === "TH" ? "แปลงทศนิยมเป็นเศษส่วน" : "Decimal to Fraction Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงทศนิยมเป็นเศษส่วนอย่างต่ำ" : "Convert decimals to simplified fractions.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "decimal-to-roman",
    slug: "decimal-to-roman",
    name: lang === "TH" ? "เครื่องมือแปลงเลขฐานสิบเป็นเลขโรมัน" : "Decimal to Roman Converter",
    desc: lang === "TH" ? "แปลงตัวเลขฐานสิบจำนวนเต็ม (ช่วง 1 ถึง 3,999) เป็นเลขโรมัน พร้อมหลักการจำแนกตามหลักตัวเลข" : "Convert decimal integers (1 to 3,999) into Roman numerals, complete with step breakdown.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "decimal-to-scientific-notation",
    slug: "decimal-to-scientific-notation",
    name: lang === "TH" ? "แปลงทศนิยมเป็นสัญกรณ์วิทยาศาสตร์" : "Decimal to Scientific Notation Converter",
    desc: lang === "TH" ? "แปลงตัวเลขปกติหรือทศนิยมให้อยู่ในรูปสัญกรณ์วิทยาศาสตร์ (a x 10^n)" : "Convert decimal numbers to scientific notation (a x 10^n)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "decision-fatigue",
    slug: "decision-fatigue",
    name: lang === "TH" ? "ประเมินความเหนื่อยล้าจากการตัดสินใจ" : "Decision Fatigue Estimator",
    desc: lang === "TH" ? "ประเมินระดับความเหนื่อยล้าของสมองจากการตัดสินใจในแต่ละวัน เพื่อหาจุดสมดุลและฟื้นฟูพลังงาน" : "Estimate your mental fatigue from daily decisions to find balance and restore energy.",
    category: "General",
    icon: Icons.Scale
  },
  {
    id: "deep-work-calculator",
    slug: "deep-work-calculator",
    name: lang === "TH" ? "คำนวณงานลึก vs งานตื้น" : "Deep vs Shallow Work",
    desc: lang === "TH" ? "ประเมินสัดส่วนของ Deep Work เทียบกับ Shallow Work เพื่อเพิ่มประสิทธิภาพในการทำงาน" : "Evaluate the ratio of Deep Work versus Shallow Work in your daily routine.",
    category: "General",
    icon: Icons.Brain
  },
  {
    id: "definite-integral-polynomial",
    slug: "definite-integral-polynomial",
    name: lang === "TH" ? "เครื่องมือคำนวณอินทิกรัลจำกัดเขตพหุนาม" : "Definite Integral of Polynomial Calculator",
    desc: lang === "TH" ? "คำนวณหาอินทิกรัลแบบจำกัดเขต (Definite Integral) ของฟังก์ชันพหุนามในช่วง [a, b]" : "Calculate the definite integral of a polynomial function over the interval [a, b].",
    category: "Science",
    icon: Icons.FunctionSquare
  },
  {
    id: "degree-to-radian",
    slug: "degree-to-radian",
    name: lang === "TH" ? "แปลงองศาเป็นเรเดียน" : "Degree to Radian Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงมุมจากองศา (Degree) เป็นเรเดียน (Radian) อย่างแม่นยำ พร้อมสูตรและวิธีการคำนวณ" : "Convert angle from Degree to Radian accurately.",
    category: "Science",
    icon: Icons.Orbit
  },
  {
    id: "density-converter",
    slug: "คำนวณความหนาแน่น",
    name: lang === "TH" ? "คำนวณและแปลงความหนาแน่น (Density Converter)" : "Density Calculator & Converter",
    desc: lang === "TH" ? "คำนวณความหนาแน่นจากมวลและปริมาตร หรือแปลงหน่วยความหนาแน่นต่างๆ" : "Calculate density from mass and volume, or convert between different density units.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "diet-environment",
    slug: "diet-environment",
    name: lang === "TH" ? "เครื่องคำนวณผลกระทบต่อสิ่งแวดล้อมจากอาหาร" : "Diet Environmental Impact",
    desc: lang === "TH" ? "คำนวณปริมาณคาร์บอนฟุตพริ้นท์และการใช้น้ำจากพฤติกรรมการกินของคุณ" : "Calculate the carbon footprint and water usage based on your dietary choices.",
    category: "Environment",
    icon: Icons.Utensils
  },
  {
    id: "difference-of-squares",
    slug: "difference-of-squares",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลต่างกำลังสอง" : "Difference of Squares Factorization Calculator",
    desc: lang === "TH" ? "คำนวณและแยกตัวประกอบของผลต่างกำลังสอง a² - b² = (a - b)(a + b)" : "Calculate and factorize the difference of squares a² - b² = (a - b)(a + b).",
    category: "Science",
    icon: Icons.MinusSquare
  },
  {
    id: "digital-detox-time",
    slug: "digital-detox-time",
    name: lang === "TH" ? "คำนวณเวลา Digital Detox" : "Digital Detox / Screen Time Calculator",
    desc: lang === "TH" ? "คำนวณเวลาที่สูญเสียไปกับหน้าจอและวางแผน Digital Detox" : "Calculate screen time loss and plan Digital Detox",
    category: "Health",
    icon: Icons.Smartphone
  },
  {
    id: "digital-savings-tier-rate",
    slug: "digital-savings-tier-rate",
    name: lang === "TH" ? "คำนวณดอกเบี้ยออมทรัพย์ดิจิทัลแบบขั้นบันได" : "Tier Rate Digital Savings Calculator",
    desc: lang === "TH" ? "คำนวณดอกเบี้ยเงินฝากออมทรัพย์ดิจิทัลแบบขั้นบันได (Tier Rate)" : "Calculate interest for digital savings accounts with tiered interest rates.",
    category: "Finance",
    icon: Icons.PiggyBank
  },
  {
    id: "direct-proportion",
    slug: "direct-proportion",
    name: lang === "TH" ? "คำนวณสัดส่วน/บัญญัติไตรยางศ์ (แปรผันตรง)" : "Direct Proportion Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณสัดส่วนหรือบัญญัติไตรยางศ์แบบแปรผันตรง หาค่าตัวแปรที่ 4" : "Calculate direct proportions easily using the rule of three.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "disaster-recovery",
    slug: "disaster-recovery",
    name: lang === "TH" ? "เครื่องคำนวณต้นทุนการทำ Disaster Recovery" : "Disaster Recovery Cost Calculator",
    desc: lang === "TH" ? "ประเมินและวิเคราะห์ต้นทุนการทำระบบสำรองฉุกเฉินและการกู้คืนจากภัยพิบัติ (Disaster Recovery) แบบรายปี" : "Estimate and analyze the total annual cost of maintaining a Disaster Recovery (DR) solution.",
    category: "Technology",
    icon: Icons.ShieldAlert
  },
  {
    id: "distance-formula",
    slug: "distance-formula",
    name: lang === "TH" ? "เครื่องมือคำนวณหาระยะทางระหว่างสองจุด" : "Distance Formula Calculator",
    desc: lang === "TH" ? "หาระยะห่างของจุดสองจุดบนระนาบคาร์ทีเซียนโดยอ้างอิงทฤษฎีบทพีทาโกรัส" : "Calculate the Euclidean distance between two points on a 2D plane.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "distraction-cost",
    slug: "distraction-cost",
    name: lang === "TH" ? "ถูกขัดจังหวะเสียเวลาเท่าไหร่" : "Cost of Distraction",
    desc: lang === "TH" ? "คำนวณเวลาที่สูญเสียไปจากการถูกขัดจังหวะในการทำงาน (Distractions) และมูลค่าความเสียหายต่อ Productivity" : "Calculate the time and productivity lost due to daily distractions and context switching.",
    category: "General",
    icon: Icons.AlertCircle
  },
  {
    id: "diy-vs-shop-car-repair",
    slug: "เปรียบเทียบซ่อมรถเองvsอู่",
    name: lang === "TH" ? "เปรียบเทียบซ่อมรถเอง vs อู่" : "DIY vs Shop Car Repair Calculator",
    desc: lang === "TH" ? "เปรียบเทียบค่าใช้จ่าย เวลา และความคุ้มค่าระหว่างการซ่อมแซมรถยนต์ด้วยตนเองกับการส่งซ่อมอู่หรือศูนย์บริการ" : "Compare costs, tools, labor time, and opportunity costs of DIY car repair versus taking it to a professional shop.",
    category: "Utility",
    icon: Icons.Wrench
  },
  {
    id: "dot-product",
    slug: "dot-product",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลคูณเชิงเวกเตอร์แบบดอท" : "Dot Product Calculator",
    desc: lang === "TH" ? "คำนวณหาผลคูณเชิงเวกเตอร์แบบดอท (Dot Product) ระหว่างเวกเตอร์สองตัว ทั้งแบบ 2 มิติ และ 3 มิติ พร้อมแสดงวิธีทำ" : "Calculate the dot product between two vectors (2D and 3D) with step-by-step solution.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "dscr-calculator",
    slug: "คำนวณ-dscr",
    name: lang === "TH" ? "คำนวณ DSCR (อัตราส่วนการชำระหนี้)" : "DSCR (Debt Service Coverage Ratio) Calculator",
    desc: lang === "TH" ? "วิเคราะห์อัตราส่วนความสามารถในการชำระหนี้ (DSCR) สำหรับการลงทุนและขอสินเชื่ออสังหาฯ" : "Calculate the Debt Service Coverage Ratio (DSCR) to evaluate loan viability for properties.",
    category: "Finance",
    icon: Icons.Landmark
  },
  {
    id: "dunbar-number",
    slug: "dunbar-number",
    name: lang === "TH" ? "Dunbar Number จัดการเพื่อน" : "Dunbar's Number Calculator",
    desc: lang === "TH" ? "วิเคราะห์จำนวนเพื่อนบน Social Network ของคุณ ว่าเกินขีดจำกัดทางสมองตามทฤษฎี Dunbar หรือไม่" : "Analyze your social network size against Dunbar's cognitive limit theory",
    category: "Technology",
    icon: Icons.Users
  },
  {
    id: "email-response-time",
    slug: "email-response-time",
    name: lang === "TH" ? "คำนวณผลกระทบเวลาตอบอีเมล" : "Email Response Time Cost",
    desc: lang === "TH" ? "คำนวณเวลาที่สูญเสียไปจากการตอบอีเมลหรือข้อความ และผลกระทบต่อประสิทธิภาพการทำงาน (Productivity)" : "Calculate time lost from checking emails and messages, and its impact on productivity.",
    category: "General",
    icon: Icons.Mail
  },
  {
    id: "energy-converter-new",
    slug: "แปลงหน่วยพลังงาน-j-kwh",
    name: lang === "TH" ? "แปลงหน่วยพลังงาน (Joule, kWh, Calorie)" : "Energy Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพลังงาน เช่น จูล (J) กิโลวัตต์-ชั่วโมง (kWh) และแคลอรี (cal)" : "Convert between energy units such as Joules (J), Kilowatt-hours (kWh), and Calories (cal).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "equilateral-triangle-height",
    slug: "equilateral-triangle-height",
    name: lang === "TH" ? "คำนวณส่วนสูงสามเหลี่ยมด้านเท่า" : "Equilateral Triangle Height Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาความยาวของส่วนสูงในสามเหลี่ยมด้านเท่า พร้อมสูตรและวิธีการคำนวณอย่างละเอียด" : "Calculate the height of an equilateral triangle with step-by-step formula.",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "equilibrium-constant",
    slug: "คำนวณสมดุลเคมี",
    name: lang === "TH" ? "คำนวณค่าคงที่สมดุลเคมี (Kc)" : "Chemical Equilibrium Constant Calculator",
    desc: lang === "TH" ? "คำนวณค่าคงที่สมดุล (Kc) หรือความเข้มข้นสารที่ภาวะสมดุลสำหรับปฏิกิริยาเคมี" : "Calculate the chemical equilibrium constant (Kc) or equilibrium concentrations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "ergonomic-score",
    slug: "ergonomic-score",
    name: lang === "TH" ? "ประเมินตามหลักการยศาสตร์ (Ergonomic Score)" : "Workstation Ergonomic Score Calculator",
    desc: lang === "TH" ? "ประเมินความเหมาะสมของโต๊ะทำงานตามหลักการยศาสตร์ (Ergonomics)" : "Assess your workstation's ergonomic setup and get recommendations.",
    category: "Health",
    icon: Icons.Activity
  },
  {
    id: "even-odd-function-checker",
    slug: "even-odd-function-checker",
    name: lang === "TH" ? "เครื่องมือตรวจสอบฟังก์ชันคู่และฟังก์ชันคี่" : "Even and Odd Function Checker",
    desc: lang === "TH" ? "ตรวจสอบฟังก์ชันพหุนามว่าเป็นฟังก์ชันคู่ (Even) ฟังก์ชันคี่ (Odd) หรือไม่ใช่ทั้งสองอย่าง" : "Check if a polynomial function is Even, Odd, or neither.",
    category: "Science",
    icon: Icons.Sigma
  },
  {
    id: "expected-value",
    slug: "expected-value",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าคาดหมาย" : "Expected Value Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าคาดหมาย (Expected Value: E(X)) ค่าเฉลี่ยถ่วงน้ำหนักความน่าจะเป็น และความแปรปรวน (Variance)" : "Calculate the expected value E(X), probability-weighted average, variance, and standard deviation.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "exponent-calculator",
    slug: "exponent-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณเลขยกกำลัง (Exponent: X ยกกำลัง Y)" : "Exponent Calculator (X^Y)",
    desc: lang === "TH" ? "คำนวณค่าเลขยกกำลัง ฐาน X ยกกำลัง Y แสดงวิธีคิดอย่างละเอียด รองรับทั้งเลขชี้กำลังที่เป็นบวก ลบ และทศนิยม" : "Calculate the exponent of a base X raised to the power Y, with step-by-step math breakdowns.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "exponential-moving-average",
    slug: "exponential-moving-average",
    name: lang === "TH" ? "ค่าเฉลี่ยเคลื่อนที่แบบเอ็กซ์โพเนนเชียล (EMA)" : "Exponential Moving Average (EMA)",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าเฉลี่ยเคลื่อนที่แบบถ่วงน้ำหนักเอ็กซ์โพเนนเชียล (EMA) สำหรับวิเคราะห์แนวโน้มชุดข้อมูลและราคาย้อนหลัง" : "Calculate the Exponential Moving Average (EMA) from a dataset to identify price trends.",
    category: "Science",
    icon: Icons.TrendingUp
  },
  {
    id: "factor-generator",
    slug: "factor-generator",
    name: lang === "TH" ? "เครื่องมือหาตัวประกอบทั้งหมด" : "Factor Generator",
    desc: lang === "TH" ? "ค้นหาตัวประกอบทั้งหมดของตัวเลข หาตัวหารร่วม จำนวนตัวประกอบ ผลบวกตัวประกอบ และการแยกตัวประกอบเฉพาะ" : "Find all factors (divisors) of a number, along with its prime factorization, sum, and count.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "factorial-calculator",
    slug: "factorial-calculator",
    name: lang === "TH" ? "เครื่องคำนวณแฟกทอเรียล" : "Factorial Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าแฟกทอเรียล (n!) ของตัวเลขจำนวนเต็มบวก" : "Calculate the factorial (n!) of a non-negative integer.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "fibonacci-number",
    slug: "fibonacci-number",
    name: lang === "TH" ? "คำนวณหาเลขฟีโบนัชชี" : "Fibonacci Number Calculator",
    desc: lang === "TH" ? "เครื่องมือหาค่าของลำดับฟีโบนัชชีที่ตำแหน่ง N ที่ต้องการ" : "Tool to find the Fibonacci number at position N",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "five-number-summary",
    slug: "five-number-summary",
    name: lang === "TH" ? "สรุปข้อมูล 5 ค่า (Five-Number Summary)" : "Five-Number Summary Calculator",
    desc: lang === "TH" ? "คำนวณค่าต่ำสุด, ควอไทล์ที่ 1, มัธยฐาน, ควอไทล์ที่ 3, และค่าสูงสุด สำหรับสร้างแผนภาพกล่อง" : "Calculate the five-number summary (Min, Q1, Median, Q3, Max) for box plots",
    category: "Science",
    icon: Icons.BarChart
  },
  {
    id: "fixed-deposit-tax-deducted",
    slug: "fixed-deposit-tax-deducted",
    name: lang === "TH" ? "คำนวณดอกเบี้ยเงินฝากประจำ (หักภาษี 15%)" : "Fixed Deposit Calculator (with 15% Tax)",
    desc: lang === "TH" ? "คำนวณดอกเบี้ยเงินฝากประจำ พร้อมหักภาษี ณ ที่จ่าย 15%" : "Calculate fixed deposit interest with 15% withholding tax deduction.",
    category: "Finance",
    icon: Icons.Landmark
  },
  {
    id: "flesch-kincaid-reading-level",
    slug: "flesch-kincaid-reading-level",
    name: lang === "TH" ? "คำนวณระดับการอ่าน Flesch-Kincaid" : "Flesch-Kincaid Reading Level Calculator",
    desc: lang === "TH" ? "ประเมินความยากง่ายในการอ่านข้อความภาษาอังกฤษด้วยสูตร Flesch-Kincaid" : "Evaluate the readability and grade level of English text using the Flesch-Kincaid formula.",
    category: "Utility",
    icon: Icons.BookOpen
  },
  {
    id: "fomo-cost",
    slug: "fomo-cost",
    name: lang === "TH" ? "เครื่องคำนวณต้นทุนความกลัวตกกระแส (FOMO Cost)" : "FOMO Cost Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนเงินและเวลาที่คุณเสียไปกับอาการกลัวพลาดสิ่งของหรือกระแสฮิต" : "Calculate the financial and time cost of Fear Of Missing Out (FOMO) purchases.",
    category: "General",
    icon: Icons.ShoppingCart
  },
  {
    id: "food-delivery-vs-cooking",
    slug: "food-delivery-vs-cooking",
    name: lang === "TH" ? "เปรียบเทียบสั่งอาหารเดลิเวอรี่ vs ทำกินเอง" : "Food Delivery vs Cooking Calculator",
    desc: lang === "TH" ? "คำนวณเปรียบเทียบค่าใช้จ่ายรายเดือนระหว่างการสั่งแอปเดลิเวอรี่กับการซื้อวัตถุดิบมาทำกินเอง" : "Compare monthly food expenses between ordering food delivery and cooking at home",
    category: "Family",
    icon: Icons.Utensils
  },
  {
    id: "force-converter",
    slug: "แปลงหน่วยแรง",
    name: lang === "TH" ? "แปลงหน่วยแรง (Force Converter)" : "Force Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยของแรง เช่น นิวตัน (N) แรงปอนด์ (lbf) และกิโลกรัมแรง (kgf)" : "Convert between different force units including Newtons (N), Pound-force (lbf), and Kilogram-force (kgf).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "forgetting-curve",
    slug: "forgetting-curve",
    name: lang === "TH" ? "เครื่องคำนวณกราฟการลืม (Ebbinghaus Forgetting Curve)" : "Forgetting Curve / Memory Retention Calculator",
    desc: lang === "TH" ? "คำนวณอัตราการลืมเนื้อหาและวางแผนการทบทวนเพื่อเปลี่ยนเป็นความจำระยะยาว" : "Estimate memory retention and plan spaced repetition sessions.",
    category: "General",
    icon: Icons.Brain
  },
  {
    id: "fraction-to-decimal",
    slug: "fraction-to-decimal",
    name: lang === "TH" ? "แปลงเศษส่วนเป็นทศนิยม" : "Fraction to Decimal Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงเศษส่วนเป็นทศนิยม พร้อมอธิบายวิธีทำ" : "Convert fractions to decimals easily with explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "fuse-breaker-sizing",
    slug: "คำนวณขนาดฟิวส์และเบรกเกอร์",
    name: lang === "TH" ? "คำนวณขนาดฟิวส์และเบรกเกอร์" : "Fuse and Breaker Sizing Calculator",
    desc: lang === "TH" ? "คำนวณและประเมินขนาดกระแสของฟิวส์และเซอร์กิตเบรกเกอร์ที่เหมาะสมกับโหลดไฟฟ้าและชนิดของเครื่องใช้ไฟฟ้า" : "Calculate the recommended fuse or circuit breaker size and matching wire gauge for electrical loads.",
    category: "Construction",
    icon: Icons.Zap
  },
  {
    id: "future-value-fv",
    slug: "future-value-fv",
    name: lang === "TH" ? "คำนวณมูลค่าเงินในอนาคต (Future Value)" : "Future Value (FV) Calculator",
    desc: lang === "TH" ? "คำนวณมูลค่าเงินในอนาคต (FV) จากเงินต้น ดอกเบี้ย และระยะเวลา" : "Calculate the future value of an investment based on initial amount, interest, and time.",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "gas-cylinder-duration",
    slug: "คำนวณระยะเวลาใช้ถังแก๊ส",
    name: lang === "TH" ? "คำนวณระยะเวลาใช้ถังแก๊ส" : "LPG Gas Cylinder Duration Calculator",
    desc: lang === "TH" ? "ประเมินระยะเวลาการใช้งานของถังแก๊สหุงต้ม (LPG) ตามขนาดถัง จำนวนหัวเตา และพฤติกรรมการทำอาหารต่อวัน" : "Estimate how many days your LPG gas cylinder will last based on cylinder capacity, burner consumption, and daily usage.",
    category: "Utility",
    icon: Icons.Clock
  },
  {
    id: "gcd-2-numbers",
    slug: "gcd-2-numbers",
    name: lang === "TH" ? "โปรแกรมหา ห.ร.ม. 2 จำนวน" : "GCD of 2 Numbers Calculator",
    desc: lang === "TH" ? "เครื่องมือหาตัวหารร่วมมาก (ห.ร.ม.) ของตัวเลขสองจำนวน พร้อมแสดงขั้นตอนวิธีแบบยุคลิด" : "Calculate the Greatest Common Divisor (GCD) of two numbers with Euclidean algorithm steps.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "gcd-3-numbers",
    slug: "gcd-3-numbers",
    name: lang === "TH" ? "โปรแกรมหา ห.ร.ม. 3 จำนวน" : "GCD of 3 Numbers Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาตัวหารร่วมมาก (ห.ร.ม.) ของตัวเลขสามจำนวน พร้อมแสดงวิธีทำ" : "Calculate the Greatest Common Divisor (GCD) of three numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "geometric-mean",
    slug: "geometric-mean",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าเฉลี่ยเรขาคณิต (Geometric Mean)" : "Geometric Mean Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าเฉลี่ยเรขาคณิต (Geometric Mean) จากชุดข้อมูลตัวเลข" : "Calculate the geometric mean of a dataset of numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "geometric-series-sum",
    slug: "geometric-series-sum",
    name: lang === "TH" ? "เครื่องมือคำนวณผลรวมอนุกรมเรขาคณิต" : "Geometric Series Sum Calculator",
    desc: lang === "TH" ? "คำนวณหาผลรวมของอนุกรมเรขาคณิตจำกัดอย่างรวดเร็วและแม่นยำ เพียงระบุพจน์แรก อัตราส่วนร่วม และจำนวนพจน์" : "Quickly calculate the sum of a finite geometric series by providing the first term, common ratio, and number of terms.",
    category: "Science",
    icon: Icons.Sigma
  },
  {
    id: "gnh-calculator",
    slug: "gnh-calculator",
    name: lang === "TH" ? "ประเมินความสุขมวลรวม (GNH Proxy)" : "GNH Proxy Calculator",
    desc: lang === "TH" ? "แบบประเมินดัชนีความสุขมวลรวมจำลองจากหลากหลายมิติในชีวิต" : "Assess your Gross National Happiness proxy score based on multiple life dimensions.",
    category: "General",
    icon: Icons.Smile
  },
  {
    id: "golden-ratio-calculator",
    slug: "golden-ratio-calculator",
    name: lang === "TH" ? "คำนวณสัดส่วนทองคำ" : "Golden Ratio Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณสัดส่วนตามอัตราส่วนทองคำ (Golden Ratio: 1.618) สำหรับงานออกแบบและศิลปะ" : "Calculate proportions based on the Golden Ratio (1.618)",
    category: "Science",
    icon: Icons.DivideCircle
  },
  {
    id: "gov-pension-gpf",
    slug: "gov-pension-gpf",
    name: lang === "TH" ? "คำนวณบำนาญ กบข." : "GPF Pension Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณเงินบำนาญข้าราชการรายเดือน สำหรับสมาชิกกองทุนบำเหน็จบำนาญข้าราชการ (กบข.)" : "Calculate the monthly government pension for Government Pension Fund (GPF) members.",
    category: "Finance",
    icon: Icons.Landmark
  },
  {
    id: "gov-pension-old",
    slug: "gov-pension-old",
    name: lang === "TH" ? "คำนวณบำนาญสูตรเดิม" : "Old Gov Pension Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณเงินบำนาญข้าราชการสูตรดั้งเดิม (ไม่ได้เป็นสมาชิก กบข.) ใช้เงินเดือนเดือนสุดท้าย" : "Calculate the government pension using the old formula (non-GPF members) based on the final salary.",
    category: "Finance",
    icon: Icons.ScrollText
  },
  {
    id: "gpa-calculator",
    slug: "gpa-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณเกรดเฉลี่ยประจำเทอม (GPA)" : "GPA Calculator",
    desc: lang === "TH" ? "คำนวณเกรดเฉลี่ยสะสมประจำเทอม (GPA) ของแต่ละวิชาเรียน พร้อมระบบเลือกเกรดและหน่วยกิตอย่างง่าย" : "Calculate your Grade Point Average (GPA) for a single semester with custom grades and credit weights.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "gratitude-journal",
    slug: "gratitude-journal",
    name: lang === "TH" ? "คำนวณผลกระทบจากการเขียนบันทึกความขอบคุณ" : "Gratitude Journal Impact",
    desc: lang === "TH" ? "ประเมินผลเชิงบวกที่มีต่ออารมณ์และชีวิตจากการจดบันทึกความขอบคุณ" : "Evaluate the positive emotional and life impact of keeping a gratitude journal",
    category: "General",
    icon: Icons.BookOpen
  },
  {
    id: "gym-supplement-cost",
    slug: "คำนวณค่าฟิตเนสและเวย์โปรตีน",
    name: lang === "TH" ? "คำนวณค่าฟิตเนสและเวย์โปรตีน" : "Gym & Supplement Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าสมาชิกยิม เทรนเนอร์ เวย์โปรตีน และค่าอาหารเสริมต่อเดือน/ปี" : "Estimate fitness fees, personal training, whey protein, and health supplements.",
    category: "Health",
    icon: Icons.Zap
  },
  {
    id: "habit-streak-calculator",
    slug: "habit-streak-calculator",
    name: lang === "TH" ? "คำนวณ Habit Streak (การสร้างนิสัย)" : "Habit Streak Calculator",
    desc: lang === "TH" ? "คำนวณเวลาที่ต้องใช้ในการสร้างนิสัยใหม่และโอกาสสำเร็จ" : "Calculate time needed to build a new habit and success rate",
    category: "General",
    icon: Icons.Target
  },
  {
    id: "hair-treatment-expense",
    slug: "คำนวณค่าทำผมต่อปี",
    name: lang === "TH" ? "คำนวณค่าทำผมต่อปี" : "Annual Hair Treatment Expense Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายในการทำสี ทำเคมี อบไอน้ำ สปาผม และผลิตภัณฑ์ดูแลผมรายปี" : "Aggregate annual hair salon chemistry, premium spa, and product costs.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "haircut-annual-expense",
    slug: "คำนวณค่าตัดผมต่อปี",
    name: lang === "TH" ? "คำนวณค่าตัดผมต่อปี" : "Annual Haircut Expense Calculator",
    desc: lang === "TH" ? "ประมาณการค่าใช้จ่ายในการเข้าร้านตัดผม บาร์เบอร์ หรือซาลอน ตลอดทั้งปี" : "Calculate yearly salon/barber expenses and long-term projections.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "hale-calculator",
    slug: "hale-calculator",
    name: lang === "TH" ? "เครื่องคำนวณอายุขัยที่มีสุขภาพดี (HALE)" : "Healthy Life Expectancy (HALE) Calculator",
    desc: lang === "TH" ? "ประเมินจำนวนปีที่คุณสามารถคาดหวังได้ว่าจะมีสุขภาพดี ปราศจากโรคภัยไข้เจ็บร้ายแรงหรือความพิการ" : "Estimate the number of years you can expect to live in good health, free of disabling diseases or injuries.",
    category: "Health",
    icon: Icons.HeartPulse
  },
  {
    id: "happiness-roi",
    slug: "happiness-roi",
    name: lang === "TH" ? "คำนวณผลตอบแทนความสุขจากการซื้อของ" : "Happiness ROI from Purchases",
    desc: lang === "TH" ? "ประเมินความคุ้มค่าและความสุขที่ได้รับจากการซื้อสิ่งของเทียบกับเงินที่จ่ายไป" : "Evaluate the value and happiness gained from a purchase compared to its cost",
    category: "General",
    icon: Icons.Heart
  },
  {
    id: "harmonic-mean",
    slug: "harmonic-mean",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่ามัธยฐานฮาร์โมนิก (Harmonic Mean)" : "Harmonic Mean Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าเฉลี่ยฮาร์โมนิก (Harmonic Mean) จากชุดข้อมูลตัวเลข" : "Calculate the harmonic mean of a dataset of numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "hectare-to-acre",
    slug: "hectare-to-acre",
    name: lang === "TH" ? "แปลงเฮกตาร์เป็นเอเคอร์" : "Hectare to Acre Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงหน่วยพื้นที่จากเฮกตาร์เป็นเอเคอร์" : "Convert area from hectares to acres",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "hectare-to-rai",
    slug: "hectare-to-rai",
    name: lang === "TH" ? "แปลงเฮกตาร์เป็นไร่" : "Hectare to Rai Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงหน่วยพื้นที่จากเฮกตาร์เป็นไร่ งาน ตารางวา (1 เฮกตาร์ = 6.25 ไร่)" : "Convert area from hectares to rai, ngan, sq wa",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "hectare-to-sqm",
    slug: "hectare-to-sqm",
    name: lang === "TH" ? "แปลงเฮกตาร์เป็นตารางเมตร" : "Hectare to Sq Meter Converter",
    desc: lang === "TH" ? "โปรแกรมแปลงหน่วยพื้นที่จากเฮกตาร์เป็นตารางเมตร" : "Convert area from hectares to square meters",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "herons-formula",
    slug: "herons-formula",
    name: lang === "TH" ? "สูตรของเฮรอน (หาพื้นที่สามเหลี่ยม)" : "Heron's Formula Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาพื้นที่สามเหลี่ยมเมื่อทราบความยาวทั้งสามด้าน" : "Tool to calculate triangle area using Heron's formula",
    category: "Science",
    icon: Icons.BoxSelect
  },
  {
    id: "hex-addition-subtraction",
    slug: "hex-addition-subtraction",
    name: lang === "TH" ? "เครื่องคำนวณการบวกลบเลขฐาน 16" : "Hexadecimal Addition and Subtraction",
    desc: lang === "TH" ? "โปรแกรมคำนวณการบวกและการลบเลขฐาน 16 (Hexadecimal) ออนไลน์ พร้อมแสดงผลเป็นฐาน 10" : "Free online hexadecimal arithmetic calculator. Add and subtract base-16 numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "hidden-home-costs",
    slug: "hidden-home-costs",
    name: lang === "TH" ? "คำนวณต้นทุนแฝงซื้อบ้าน" : "Hidden Home Costs Calculator",
    desc: lang === "TH" ? "คำนวณค่าโอน ค่าจดจำนอง อากรแสตมป์ และค่าใช้จ่ายแฝงอื่นๆ ในการซื้อบ้าน" : "Calculate transfer fees, mortgage fees, and other hidden costs of buying a home.",
    category: "Finance",
    icon: Icons.Home
  },
  {
    id: "home-addition-cost",
    slug: "คำนวณค่าต่อเติมต่อยอดบ้าน",
    name: lang === "TH" ? "คำนวณค่าต่อเติมบ้าน" : "Home Addition Cost Estimator",
    desc: lang === "TH" ? "ประมาณการงบประมาณและค่าใช้จ่ายในการต่อเติมบ้าน ห้องครัว ที่จอดรถ หรือระเบียง ตามขนาดและประเภทฐานราก" : "Estimate the construction budget for home additions, kitchen extensions, and garage roofing based on materials and foundation.",
    category: "Construction",
    icon: Icons.Home
  },
  {
    id: "home-extra-payment",
    slug: "home-extra-payment",
    name: lang === "TH" ? "คำนวณยอดโปะบ้าน หมดหนี้เร็วขึ้นกี่ปี" : "Home Extra Payment Calculator",
    desc: lang === "TH" ? "คำนวณว่าการโปะบ้านเพิ่มต่อเดือน จะช่วยประหยัดดอกเบี้ยและลดเวลาผ่อนได้กี่ปี" : "Calculate how much time and interest you save by making extra payments on your home loan.",
    category: "Finance",
    icon: Icons.Banknote
  },
  {
    id: "home-refinance-savings",
    slug: "home-refinance-savings",
    name: lang === "TH" ? "คำนวณยอดรีไฟแนนซ์บ้าน ส่วนต่างความคุ้มค่า" : "Home Refinance Savings Calculator",
    desc: lang === "TH" ? "เปรียบเทียบความคุ้มค่าในการรีไฟแนนซ์บ้าน พร้อมคำนวณส่วนต่างค่างวดและจุดคุ้มทุน" : "Compare home refinance savings, calculate payment differences and break-even point.",
    category: "Finance",
    icon: Icons.Home
  },
  {
    id: "house-flipping-roi",
    slug: "คำนวณกำไร-flip-บ้าน",
    name: lang === "TH" ? "คำนวณกำไรและ ROI ฟลิปบ้าน/คอนโด" : "House Flipping ROI Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุน กำไรสุทธิ และผลตอบแทน (ROI) สำหรับการซื้ออสังหาริมทรัพย์มาปรับปรุงแล้วขายต่อ" : "Calculate costs, net profit, and ROI for house flipping projects.",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "improper-to-mixed-fraction",
    slug: "improper-to-mixed-fraction",
    name: lang === "TH" ? "แปลงเศษส่วนเกินเป็นเศษส่วนคละ" : "Improper to Mixed Fraction",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงเศษส่วนเกินเป็นเศษส่วนคละหรือจำนวนคละ" : "Convert improper fractions to mixed fractions/numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "inflation-impact-savings",
    slug: "inflation-impact-savings",
    name: lang === "TH" ? "คำนวณผลกระทบเงินเฟ้อต่อเงินออม" : "Inflation Impact on Savings",
    desc: lang === "TH" ? "ประเมินมูลค่าเงินออมและอำนาจซื้อที่ลดลงจากอัตราเงินเฟ้อในอนาคต" : "Assess the impact of inflation on the purchasing power of your savings.",
    category: "Finance",
    icon: Icons.TrendingDown
  },
  {
    id: "integer-division",
    slug: "integer-division",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลหารแบบจำนวนเต็ม" : "Integer Division Calculator",
    desc: lang === "TH" ? "คำนวณหาผลหารแบบจำนวนเต็ม (Integer Division) และเศษเหลือ พร้อมวิธีการหารเบื้องต้น" : "Calculate the integer division (quotient) and remainder with basic steps.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "inverse-matrix",
    slug: "inverse-matrix",
    name: lang === "TH" ? "อินเวอร์สเมทริกซ์ 2x2" : "2x2 Inverse Matrix Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาอินเวอร์สการคูณของเมทริกซ์ขนาด 2x2 (Inverse Matrix) พร้อมแสดงดีเทอร์มิแนนต์และวิธีทำอย่างละเอียด" : "Calculate the inverse of a 2x2 matrix step-by-step, including determinant calculation and validation.",
    category: "Science",
    icon: Icons.Grid
  },
  {
    id: "inverse-proportion",
    slug: "inverse-proportion",
    name: lang === "TH" ? "คำนวณสัดส่วน/บัญญัติไตรยางศ์ (แปรผกผัน)" : "Inverse Proportion Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณสัดส่วนหรือบัญญัติไตรยางศ์แบบแปรผกผัน หาค่าตัวแปรที่ 4" : "Calculate inverse proportions easily using the inverse rule of three.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "krejcie-morgan-sample-size",
    slug: "krejcie-morgan-sample-size",
    name: lang === "TH" ? "เครื่องมือคำนวณขนาดกลุ่มตัวอย่างของเครจซีและมอร์แกน" : "Krejcie & Morgan Sample Size Calculator",
    desc: lang === "TH" ? "คำนวณหาขนาดกลุ่มตัวอย่างขั้นต่ำตามตาราง Krejcie & Morgan ด้วยสูตรทางสถิติ" : "Calculate the minimum required sample size using the Krejcie & Morgan formula.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "kurtosis-calculator",
    slug: "kurtosis-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าความโด่ง (Kurtosis)" : "Kurtosis Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าความโด่งของชุดข้อมูล (Kurtosis) แบบออนไลน์ฟรี" : "Calculate the kurtosis of a dataset to measure its tailedness.",
    category: "Science",
    icon: Icons.BarChart2
  },
  {
    id: "land-price-valuation",
    slug: "คำนวณราคาประเมินที่ดิน",
    name: lang === "TH" ? "คำนวณราคาประเมินที่ดิน (ไร่-งาน-ตร.ว.)" : "Land Price Valuation Calculator",
    desc: lang === "TH" ? "แปลงพื้นที่ดินจาก ไร่-งาน-ตารางวา และคำนวณมูลค่าราคาประเมินและราคาตลาดรวม" : "Convert land area (Rai-Ngan-Wah) and calculate total appraised and estimated market value.",
    category: "Finance",
    icon: Icons.Scale
  },
  {
    id: "land-subdivision-cost",
    slug: "คำนวณค่ารังวัดแบ่งแยกโฉนด",
    name: lang === "TH" ? "คำนวณค่ารังวัดแบ่งแยกโฉนดที่ดิน" : "Land Subdivision & Survey Cost Calculator",
    desc: lang === "TH" ? "ประเมินค่าธรรมเนียมรังวัด ค่าหมุด และค่าใช้จ่ายต่างๆ ในการรังวัดแบ่งแยกโฉนดที่ดิน" : "Estimate survey fees, boundary stone costs, and total expenses for land subdivision.",
    category: "Finance",
    icon: Icons.Compass
  },
  {
    id: "law-of-cosines",
    slug: "law-of-cosines",
    name: lang === "TH" ? "กฎของโคไซน์" : "Law of Cosines Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาความยาวด้านหรือมุมของสามเหลี่ยมด้วยกฎของโคไซน์" : "Tool to calculate side lengths or angles of a triangle using the Law of Cosines",
    category: "Science",
    icon: Icons.TriangleRight
  },
  {
    id: "law-of-sines",
    slug: "law-of-sines",
    name: lang === "TH" ? "กฎของไซน์" : "Law of Sines Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาความยาวด้านหรือมุมของสามเหลี่ยมด้วยกฎของไซน์" : "Tool to calculate side lengths or angles of a triangle using the Law of Sines",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "lcm-2-numbers",
    slug: "lcm-2-numbers",
    name: lang === "TH" ? "โปรแกรมหา ค.ร.น. 2 จำนวน" : "LCM of 2 Numbers Calculator",
    desc: lang === "TH" ? "เครื่องมือหาคูณร่วมน้อย (ค.ร.น.) ของตัวเลขสองจำนวน พร้อมแสดงขั้นตอนความสัมพันธ์ระหว่าง ห.ร.ม. และ ค.ร.น." : "Calculate the Least Common Multiple (LCM) of two numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "lcm-3-numbers",
    slug: "lcm-3-numbers",
    name: lang === "TH" ? "โปรแกรมหา ค.ร.น. 3 จำนวน" : "LCM of 3 Numbers Calculator",
    desc: lang === "TH" ? "เครื่องมือหาคูณร่วมน้อย (ค.ร.น.) ของตัวเลขสามจำนวน พร้อมแสดงขั้นตอนการคำนวณทีละคู่" : "Calculate the Least Common Multiple (LCM) of three numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "learning-rate",
    slug: "learning-rate",
    name: lang === "TH" ? "เครื่องคำนวณอัตราความเร็วการเรียนรู้ (Learning Rate Velocity)" : "Learning Rate Velocity Calculator",
    desc: lang === "TH" ? "ประเมินความเร็วและประสิทธิภาพในการรับรู้และเข้าใจทักษะใหม่" : "Assess your velocity and efficiency in acquiring new skills.",
    category: "General",
    icon: Icons.Rocket
  },
  {
    id: "legacy-score",
    slug: "legacy-score",
    name: lang === "TH" ? "เครื่องประเมินคะแนนมรดกชีวิต" : "Personal Legacy Score Calculator",
    desc: lang === "TH" ? "ประเมินคุณค่าและผลกระทบเชิงบวกที่คุณได้สร้างไว้ให้กับผู้คนและสังคม" : "Assess the value and positive impact you leave behind for people and society.",
    category: "General",
    icon: Icons.Award
  },
  {
    id: "life-satisfaction",
    slug: "life-satisfaction",
    name: lang === "TH" ? "แบบประเมินความพึงพอใจในชีวิต" : "Life Satisfaction Index",
    desc: lang === "TH" ? "ประเมินระดับความสุขและความพึงพอใจโดยรวมในชีวิตของคุณ" : "Evaluate your overall happiness and level of satisfaction with your life.",
    category: "General",
    icon: Icons.Smile
  },
  {
    id: "lifetime-healthcare-cost",
    slug: "lifetime-healthcare-cost",
    name: lang === "TH" ? "คำนวณต้นทุนดูแลสุขภาพตลอดชีวิต" : "Lifetime Healthcare Cost",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายด้านสุขภาพและค่ารักษาพยาบาลตลอดช่วงอายุขัยที่เหลืออยู่" : "Calculate the estimated healthcare costs for the rest of your life.",
    category: "Finance",
    icon: Icons.HeartPulse
  },
  {
    id: "limit-calculator",
    slug: "limit-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าลิมิตของฟังก์ชันพหุนาม" : "Polynomial Limit Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าลิมิตเบื้องต้นของฟังก์ชันพหุนามเมื่อ x เข้าใกล้ค่า a" : "Calculate the basic limit of a polynomial function as x approaches a.",
    category: "Science",
    icon: Icons.Sigma
  },
  {
    id: "linear-regression-line",
    slug: "linear-regression-line",
    name: lang === "TH" ? "เครื่องมือคำนวณสมการเส้นถดถอยเชิงเส้น" : "Linear Regression Line Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาสมการเส้นถดถอยเชิงเส้นอย่างง่าย (Simple Linear Regression Line)" : "Simple Linear Regression Line Calculator",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "log-base-10",
    slug: "log-base-10",
    name: lang === "TH" ? "เครื่องมือคำนวณลอการิทึมฐาน 10" : "Log Base 10 Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าลอการิทึมฐาน 10 (Common Logarithm) อย่างง่ายดายและรวดเร็ว รองรับตัวเลขทศนิยม" : "Easily calculate the common logarithm (base 10) of any positive number.",
    category: "Science",
    icon: Icons.FunctionSquare
  },
  {
    id: "log-base-2",
    slug: "log-base-2",
    name: lang === "TH" ? "เครื่องมือคำนวณลอการิทึมฐาน 2" : "Log Base 2 Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าลอการิทึมฐาน 2 สำหรับใช้ในงานคณิตศาสตร์ วิทยาการคอมพิวเตอร์ และทฤษฎีสารสนเทศ" : "Calculate the binary logarithm (base 2) used extensively in computer science and information theory.",
    category: "Science",
    icon: Icons.Binary
  },
  {
    id: "logic-equivalence-checker",
    slug: "logic-equivalence-checker",
    name: lang === "TH" ? "ตรวจสอบสมมูลตรรกศาสตร์" : "Logic Equivalence Checker",
    desc: lang === "TH" ? "เครื่องมือคำนวณตรวจสอบสมมูลตรรกศาสตร์ของประพจน์" : "Calculator to check logical equivalence of two propositions",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "lpg-pipe-sizing",
    slug: "คำนวณขนาดท่อแก๊ส-lpg",
    name: lang === "TH" ? "คำนวณขนาดท่อแก๊ส LPG" : "LPG Gas Pipe Sizing Calculator",
    desc: lang === "TH" ? "คำนวณขนาดท่อแก๊ส LPG ที่เหมาะสมตามปริมาณการใช้แก๊ส (BTU/hr หรือ kg/hr) และความยาวท่อ" : "Calculate the recommended LPG gas pipe size based on flow demand (BTU/hr or kg/hr) and pipe length.",
    category: "Construction",
    icon: Icons.Flame
  },
  {
    id: "lux-lighting",
    slug: "lux-lighting",
    name: lang === "TH" ? "คำนวณความสว่าง (Lux / Foot-candle)" : "Lux / Foot-candle Lighting Calculator",
    desc: lang === "TH" ? "แปลงค่าความสว่างระหว่าง Lux และ Foot-candle และคำนวณความสว่างที่เหมาะสม" : "Convert illuminance between Lux and Foot-candle and calculate appropriate lighting.",
    category: "Utility",
    icon: Icons.Sun
  },
  {
    id: "matrix-addition-subtraction",
    slug: "matrix-addition-subtraction",
    name: lang === "TH" ? "เครื่องมือคำนวณการบวกและลบเมทริกซ์" : "Matrix Addition & Subtraction Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณการบวกและลบเมทริกซ์ พร้อมแสดงผลลัพธ์ทีละขั้นตอน" : "Calculate the addition and subtraction of two matrices with same dimensions.",
    category: "Science",
    icon: Icons.Grid3x3
  },
  {
    id: "matrix-determinant-2x2",
    slug: "matrix-determinant-2x2",
    name: lang === "TH" ? "โปรแกรมหาดีเทอร์มิแนนต์เมทริกซ์ 2x2" : "Matrix Determinant 2x2 Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าดีเทอร์มิแนนต์ (Determinant) ของเมทริกซ์ขนาด 2x2 พร้อมแสดงวิธีทำ" : "Calculate the determinant of a 2x2 matrix.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "matrix-determinant-3x3",
    slug: "matrix-determinant-3x3",
    name: lang === "TH" ? "โปรแกรมหาดีเทอร์มิแนนต์เมทริกซ์ 3x3" : "Matrix Determinant 3x3 Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าดีเทอร์มิแนนต์ (Determinant) ของเมทริกซ์ขนาด 3x3 พร้อมแสดงวิธีทำอย่างละเอียด" : "Calculate the determinant of a 3x3 matrix with step-by-step details.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "matrix-scalar-multiplication",
    slug: "matrix-scalar-multiplication",
    name: lang === "TH" ? "เครื่องมือคำนวณการคูณเมทริกซ์ด้วยตัวเลข" : "Matrix Scalar Multiplication Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณการคูณเมทริกซ์ด้วยค่าคงตัวหรือสเกลาร์ (Scalar) พร้อมแสดงผลลัพธ์ทีละขั้นตอน" : "Calculate the multiplication of a matrix by a scalar value.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "matrix-transpose",
    slug: "matrix-transpose",
    name: lang === "TH" ? "โปรแกรมหาทรานสโพสของเมทริกซ์" : "Matrix Transpose Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาทรานสโพส (Transpose) ของเมทริกซ์ขนาดต่าง ๆ (ตั้งแต่ 2x2 ถึง 4x4) พร้อมอธิบายวิธีทำและเปรียบเทียบสีแถวต่อคอลัมน์" : "Calculate the transpose of a matrix with dynamic dimensions (from 2x2 to 4x4) and color-coded row-to-column visualization.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "mean-calculator",
    slug: "mean-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าเฉลี่ยเลขคณิต" : "Mean Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าเฉลี่ยเลขคณิต (Mean หรือ Average) จากชุดข้อมูล พร้อมแสดงผลรวมและจำนวนข้อมูล" : "Calculate the arithmetic mean or average from a set of numbers.",
    category: "Science",
    icon: Icons.Sigma
  },
  {
    id: "mean-deviation",
    slug: "mean-deviation",
    name: lang === "TH" ? "เครื่องคำนวณส่วนเบี่ยงเบนเฉลี่ย" : "Mean Deviation Calculator",
    desc: lang === "TH" ? "คำนวณหาส่วนเบี่ยงเบนเฉลี่ย (Mean Deviation) จากชุดข้อมูล" : "Calculate the mean absolute deviation of a dataset.",
    category: "Science",
    icon: Icons.MinusCircle
  },
  {
    id: "median-calculator",
    slug: "median-calculator",
    name: lang === "TH" ? "เครื่องคำนวณค่ามัธยฐาน (Median)" : "Median Calculator",
    desc: lang === "TH" ? "เครื่องคำนวณหาค่ามัธยฐาน (Median) จากชุดข้อมูล พร้อมแสดงขั้นตอนการคำนวณและการเรียงลำดับข้อมูลอย่างละเอียด" : "Find the median of a dataset step-by-step, including sorting and calculation explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "meeting-cost-calculator",
    slug: "meeting-cost-calculator",
    name: lang === "TH" ? "ต้นทุนการประชุม" : "Meeting Cost Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนแฝงที่แท้จริงของการจัดประชุม 1 ครั้ง โดยอ้างอิงจากเงินเดือนของผู้เข้าร่วม" : "Calculate the true cost of a meeting based on attendees' salaries",
    category: "Business",
    icon: Icons.Presentation
  },
  {
    id: "meeting-roi",
    slug: "meeting-roi",
    name: lang === "TH" ? "คำนวณต้นทุนการประชุม (Meeting ROI)" : "Meeting ROI Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนของการประชุมและประเมินความคุ้มค่าของการจัดประชุม (Meeting ROI)" : "Calculate the cost of a meeting and evaluate its Return on Investment (ROI).",
    category: "Business",
    icon: Icons.Users
  },
  {
    id: "midpoint-formula",
    slug: "midpoint-formula",
    name: lang === "TH" ? "เครื่องมือคำนวณพิกัดจุดกึ่งกลาง" : "Midpoint Formula Calculator",
    desc: lang === "TH" ? "หาพิกัดของจุดกึ่งกลางระหว่างจุดสองจุดบนระนาบคาร์ทีเซียนด้วยสูตรคณิตศาสตร์" : "Calculate the coordinates of the midpoint between two points on a Cartesian plane.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "minimalism-score",
    slug: "minimalism-score",
    name: lang === "TH" ? "แบบทดสอบระดับความมินิมอล (Minimalism Score)" : "Minimalism & Clutter Score",
    desc: lang === "TH" ? "ประเมินระดับความรกของบ้านและไลฟ์สไตล์ เพื่อดูว่าคุณมีความเป็นมินิมอลแค่ไหน" : "Assess your clutter level and lifestyle to see how minimalist you are.",
    category: "General",
    icon: Icons.Box
  },
  {
    id: "mixed-to-improper-fraction",
    slug: "mixed-to-improper-fraction",
    name: lang === "TH" ? "แปลงจำนวนคละเป็นเศษส่วนเกิน" : "Mixed to Improper Fraction",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงจำนวนคละเป็นเศษส่วนเกิน พร้อมวิธีคิด" : "Convert mixed numbers into improper fractions with steps.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "mode-calculator",
    slug: "mode-calculator",
    name: lang === "TH" ? "เครื่องคำนวณค่าฐานนิยม (Mode)" : "Mode Calculator",
    desc: lang === "TH" ? "เครื่องคำนวณหาค่าฐานนิยม (Mode) จากชุดข้อมูล ค้นหาข้อมูลที่ซ้ำกันมากที่สุดพร้อมแสดงความถี่แบบละเอียด" : "Calculate the mode of a dataset, finding the most frequent values and their frequencies.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "modulo-calculator",
    slug: "modulo-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาเศษของการหาร" : "Modulo Calculator",
    desc: lang === "TH" ? "คำนวณหาเศษที่เหลือจากการหาร (Modulo หรือ มอดุโล โอเปอเรเตอร์ %) พร้อมแสดงวิธีการคำนวณ" : "Calculate the remainder of a division (Modulo operator %) with steps.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "moq-vs-price",
    slug: "moq-vs-price",
    name: lang === "TH" ? "เปรียบเทียบ MOQ กับ ราคา" : "MOQ vs Price Calculator",
    desc: lang === "TH" ? "เปรียบเทียบความคุ้มค่าของการซื้อจำนวนมาก (MOQ)" : "Compare the cost-effectiveness of buying in bulk (MOQ).",
    category: "Business",
    icon: Icons.BarChart
  },
  {
    id: "mtbf",
    slug: "mtbf",
    name: lang === "TH" ? "เครื่องคำนวณ MTBF (Mean Time Between Failures)" : "MTBF Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาเฉลี่ยระหว่างการขัดข้องแต่ละครั้ง (Mean Time Between Failures) เพื่อประเมินความน่าเชื่อถือของระบบ" : "Calculate the Mean Time Between Failures (MTBF) for systems and equipment.",
    category: "Technology",
    icon: Icons.Activity
  },
  {
    id: "mttr",
    slug: "mttr",
    name: lang === "TH" ? "เครื่องคำนวณ MTTR (Mean Time to Repair)" : "MTTR Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาเฉลี่ยในการซ่อมแซมระบบหรืออุปกรณ์ (Mean Time to Repair) ประเมินประสิทธิภาพการกู้คืนระบบ" : "Calculate the Mean Time to Repair (MTTR) for systems and equipment.",
    category: "Technology",
    icon: Icons.Timer
  },
  {
    id: "multi-rate-ot",
    slug: "multi-rate-ot",
    name: lang === "TH" ? "คำนวณ OT หลายอัตรา (1.5x, 2x, 3x)" : "Multi-Rate OT Calculator",
    desc: lang === "TH" ? "คำนวณค่าล่วงเวลา (OT) ในอัตรา 1.5 เท่า, 2 เท่า และ 3 เท่า ตามกฎหมายแรงงาน" : "Calculate Overtime (OT) pay at 1.5x, 2x, and 3x rates according to labor laws",
    category: "Business",
    icon: Icons.Clock
  },
  {
    id: "nail-care-expense",
    slug: "คำนวณค่าทำเล็บต่อปี",
    name: lang === "TH" ? "คำนวณค่าทำเล็บต่อปี" : "Annual Nail Care Expense Calculator",
    desc: lang === "TH" ? "คำนวณงบประมาณการทำเล็บเจล ต่อเล็บ และบำรุงสุขภาพเล็บรายปี" : "Estimate yearly gel manicure, nail extension, and care costs.",
    category: "Finance",
    icon: Icons.Sparkles
  },
  {
    id: "natural-log",
    slug: "natural-log",
    name: lang === "TH" ? "เครื่องมือคำนวณลอการิทึมธรรมชาติ (ln)" : "Natural Log (ln) Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าลอการิทึมธรรมชาติ หรือ ln (log ฐาน e) ช่วยให้การแก้สมการการเติบโตหรือการสลายตัวเป็นเรื่องง่าย" : "Calculate the natural logarithm (ln or log base e) useful for continuous growth and decay problems.",
    category: "Science",
    icon: Icons.Orbit
  },
  {
    id: "net-income-after-tax",
    slug: "net-income-after-tax",
    name: lang === "TH" ? "คำนวณเงินได้สุทธิและภาษี" : "Net Income & Tax Calculator",
    desc: lang === "TH" ? "คำนวณเงินได้สุทธิหลังหักค่าใช้จ่ายและค่าลดหย่อน พร้อมประเมินภาษีที่ต้องจ่าย" : "Calculate net income after deductions and estimate personal income tax.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "net-metering-revenue",
    slug: "net-metering-revenue",
    name: lang === "TH" ? "คำนวณรายได้ขายไฟคืน Net Metering" : "Net Metering Revenue Calculator",
    desc: lang === "TH" ? "คำนวณรายได้จากการขายไฟฟ้าส่วนเกินคืนให้การไฟฟ้า (โครงการโซลาร์ภาคประชาชน)" : "Calculate potential revenue from selling excess solar electricity back to the grid",
    category: "Utility",
    icon: Icons.Wallet
  },
  {
    id: "ngan-to-rai",
    slug: "ngan-to-rai",
    name: lang === "TH" ? "แปลงงานเป็นไร่" : "Ngan to Rai Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากงานเป็นไร่ (4 งาน = 1 ไร่)" : "Convert area from Ngan to Rai (4 Ngan = 1 Rai)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "ngan-to-sqm",
    slug: "ngan-to-sqm",
    name: lang === "TH" ? "แปลงงานเป็นตารางเมตร" : "Ngan to Square Meters Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากงานเป็นตารางเมตร (1 งาน = 400 ตารางเมตร)" : "Convert area from Ngan to Square Meters (1 Ngan = 400 Sq m)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "ngan-to-sqwa",
    slug: "ngan-to-sqwa",
    name: lang === "TH" ? "แปลงงานเป็นตารางวา" : "Ngan to Square Wa Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากงานเป็นตารางวา (1 งาน = 100 ตารางวา)" : "Convert area from Ngan to Square Wa (1 Ngan = 100 Sq Wa)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "normal-distribution-z-table",
    slug: "normal-distribution-z-table",
    name: lang === "TH" ? "ตารางพื้นที่ใต้เส้นโค้งปกติ (Z-Table)" : "Normal Distribution Z-Table",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาพื้นที่ใต้เส้นโค้งปกติ (Normal Distribution) โดยใช้ค่า Z-Score" : "Calculate the area under the normal distribution curve using a Z-score lookup.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "note-taking",
    slug: "note-taking",
    name: lang === "TH" ? "คำนวณประสิทธิภาพการจดโน้ต" : "Note-taking Efficiency",
    desc: lang === "TH" ? "ประเมินความกระชับและความครอบคลุมของเนื้อหา เพื่อวัดประสิทธิภาพในการจดเลคเชอร์" : "Evaluate conciseness and coverage of concepts to measure note-taking efficiency",
    category: "General",
    icon: Icons.PenTool
  },
  {
    id: "nsf-savings-calculator",
    slug: "nsf-savings-calculator",
    name: lang === "TH" ? "คำนวณเงินออม กอช." : "NSF Savings Calculator",
    desc: lang === "TH" ? "ประมาณการเงินบำนาญและเงินสะสมกองทุนออมแห่งชาติ (กอช.) เมื่ออายุครบ 60 ปี" : "Estimate your pension and total savings in the National Savings Fund (NSF) at age 60.",
    category: "Finance",
    icon: Icons.PiggyBank
  },
  {
    id: "nth-root-calculator",
    slug: "nth-root-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหารากที่ N (Nth Root)" : "Nth Root Calculator",
    desc: lang === "TH" ? "คำนวณหารากที่ N ของตัวเลข X รองรับทศนิยมและแสดงขั้นตอนการคำนวณอย่างละเอียดพร้อมแนวคิด" : "Calculate the Nth root of a number X, with validation for odd/even roots and step-by-step mathematical reasoning.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "number-to-english-text",
    slug: "number-to-english-text",
    name: lang === "TH" ? "แปลงตัวเลขเป็นตัวหนังสือภาษาอังกฤษ" : "Number to English Text Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงตัวเลขเป็นข้อความภาษาอังกฤษสำหรับการเขียนเช็คและเอกสาร" : "Tool to convert numbers to English words for checks and documents",
    category: "Science",
    icon: Icons.Type
  },
  {
    id: "number-to-thai-text",
    slug: "number-to-thai-text",
    name: lang === "TH" ? "เครื่องมือแปลงตัวเลขเป็นตัวหนังสือภาษาไทย" : "Number to Thai Text Converter",
    desc: lang === "TH" ? "แปลงตัวเลขทั่วไปและจำนวนเงินป้อนเข้า ให้กลายเป็นตัวอักษรเขียนภาษาไทยอย่างถูกต้อง (สำหรับเขียนเช็คเงินสดและงานเอกสารการเงิน)" : "Convert numerical values and currency figures to formal Thai text representation.",
    category: "Science",
    icon: Icons.FileText
  },
  {
    id: "ohms-law",
    slug: "คำนวณกฎของโอห์ม",
    name: lang === "TH" ? "คำนวณกฎของโอห์ม (Ohm's Law)" : "Ohm's Law Calculator",
    desc: lang === "TH" ? "คำนวณความต่างศักย์ (V) กระแสไฟฟ้า (I) ความต้านทาน (R) และกำลังไฟฟ้า (P) ตามกฎของโอห์ม" : "Calculate voltage, current, resistance, and power using Ohm's Law.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "on-grid-solar-payback",
    slug: "on-grid-solar-payback",
    name: lang === "TH" ? "คำนวณจุดคุ้มทุนแผงโซลาร์ออนกริด" : "On-Grid Solar Payback Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาคืนทุนจากการติดตั้งโซลาร์เซลล์ระบบออนกริด" : "Calculate the payback period for installing an on-grid solar system",
    category: "Utility",
    icon: Icons.Sun
  },
  {
    id: "outliers-calculator",
    slug: "outliers-calculator",
    name: lang === "TH" ? "เครื่องคำนวณหาค่าผิดปกติ (Outliers)" : "Outliers Calculator",
    desc: lang === "TH" ? "คำนวณหาขอบเขตบนและล่าง เพื่อค้นหาค่าผิดปกติ (Outliers) ในข้อมูล" : "Find upper and lower bounds to identify outliers in a dataset.",
    category: "Science",
    icon: Icons.AlertCircle
  },
  {
    id: "parkinsons-law-calculator",
    slug: "parkinsons-law-calculator",
    name: lang === "TH" ? "คำนวณกฎของพาร์กินสัน (Parkinson's Law)" : "Parkinson's Law Calculator",
    desc: lang === "TH" ? "วิเคราะห์เวลาทำงานตามกฎของพาร์กินสันว่าคุณขยายงานตามเวลาที่ได้รับหรือไม่" : "Analyze your task time based on Parkinson's Law",
    category: "General",
    icon: Icons.Hourglass
  },
  {
    id: "pearson-correlation",
    slug: "pearson-correlation",
    name: lang === "TH" ? "เครื่องมือคำนวณสัมประสิทธิ์สหสัมพันธ์เพียร์สัน" : "Pearson Correlation Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าสัมประสิทธิ์สหสัมพันธ์ของเพียร์สัน (Pearson's r) เพื่อดูความสัมพันธ์ระหว่างตัวแปรสองตัว" : "Pearson Correlation Coefficient (r) Calculator",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "percent-difference",
    slug: "percent-difference",
    name: lang === "TH" ? "เครื่องมือคำนวณหาความแตกต่างเป็นเปอร์เซ็นต์ (Percent Difference)" : "Percent Difference Calculator",
    desc: lang === "TH" ? "คำนวณหาความแตกต่างระหว่างสองค่าหรือสองทศนิยม ให้ออกมาเป็นเปอร์เซ็นต์ (Percent Difference)" : "Calculate the percent difference between two numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "percent-of-value",
    slug: "percent-of-value",
    name: lang === "TH" ? "คำนวณหาเปอร์เซ็นต์จากค่าทั้งหมด" : "Percent of Value Calculator",
    desc: lang === "TH" ? "หาค่าผลลัพธ์ของเปอร์เซ็นต์ที่ต้องการ (เช่น 15% ของ 2,500 คือเท่าไหร่)" : "Find the value that corresponds to a certain percentage of a total.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "percentage-decrease",
    slug: "percentage-decrease",
    name: lang === "TH" ? "คำนวณการลดลงเป็นเปอร์เซ็นต์" : "Percentage Decrease Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณการลดลงเป็นเปอร์เซ็นต์จากค่าเดิม (Percentage Decrease) พร้อมสูตรและวิธีคิด" : "Calculate the percentage decrease from an initial value to a final value.",
    category: "Science",
    icon: Icons.TrendingDown
  },
  {
    id: "percentage-increase",
    slug: "percentage-increase",
    name: lang === "TH" ? "คำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์" : "Percentage Increase Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณการเพิ่มขึ้นเป็นเปอร์เซ็นต์จากค่าเดิม (Percentage Increase) พร้อมสูตรและวิธีคิด" : "Calculate the percentage increase from an initial value to a final value.",
    category: "Science",
    icon: Icons.TrendingUp
  },
  {
    id: "percentile-calculator",
    slug: "percentile-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณเปอร์เซ็นต์ไทล์ (Percentile)" : "Percentile Calculator",
    desc: lang === "TH" ? "คำนวณเปอร์เซ็นต์ไทล์ (Percentile) ของคะแนนชุดข้อมูลแบบเรียงลำดับ เลือกคำนวณได้ทั้งแบบหลักสูตรไทยและแบบสากล" : "Calculate the percentile of a dataset with step-by-step methods, supporting both educational and standard methods.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "permutation-calculator",
    slug: "permutation-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณวิธีการจัดลำดับ (Permutation: nPr)" : "Permutation Calculator (nPr)",
    desc: lang === "TH" ? "คำนวณจำนวนวิธีการจัดลำดับของสิ่งของต่างๆ (nPr) แสดงสูตรและวิธีคำนวณอย่างละเอียด พร้อมคำอธิบาย" : "Calculate the number of permutations (nPr) for arranging r items from n, with step-by-step calculation details.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "permutation-combination",
    slug: "คำนวณ-permutation-combination",
    name: lang === "TH" ? "คำนวณ Permutation & Combination" : "Permutation & Combination Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนวิธีการเรียงสับเปลี่ยน (nPr) และการจัดหมู่ (nCr) ของสิ่งของ" : "Calculate the number of permutations (nPr) and combinations (nCr) for a set of items.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "personal-tax",
    slug: "คำนวณ-ภาษี-2569",
    name: lang === "TH" ? "คำนวณภาษีเงินได้ 2569" : "Personal Income Tax 2026",
    desc: lang === "TH" ? "คำนวณภาษีเงินได้บุคคลธรรมดาพร้อมรายการลดหย่อนทั้งหมด" : "Calculate personal income tax with all deductions",
    category: "Finance",
    icon: Icons.Coins
  },
  {
    id: "ph-buffer",
    slug: "คำนวณ-ph-buffer",
    name: lang === "TH" ? "คำนวณสารละลายบัฟเฟอร์ (pH Buffer)" : "pH Buffer Calculator",
    desc: lang === "TH" ? "คำนวณหาค่า pH ของสารละลายบัฟเฟอร์กรด/เบสด้วยสมการ Henderson-Hasselbalch" : "Calculate the pH of an acidic or basic buffer solution using the Henderson-Hasselbalch equation.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "poisson-distribution",
    slug: "poisson-distribution",
    name: lang === "TH" ? "คำนวณการแจกแจงแบบปัวซง (Poisson)" : "Poisson Distribution Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณกฎการแจกแจงแบบปัวซง สำหรับหาความน่าจะเป็นของจำนวนเหตุการณ์ที่เกิดขึ้นในขอบเขตที่กำหนด" : "Calculate Poisson Distribution Probability for finding the likelihood of a number of events occurring.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "polygon-diagonals",
    slug: "polygon-diagonals",
    name: lang === "TH" ? "คำนวณเส้นทแยงมุมรูปหลายเหลี่ยม" : "Polygon Diagonals Calculator",
    desc: lang === "TH" ? "หาจำนวนเส้นทแยงมุมทั้งหมดของรูป n เหลี่ยม (Polygon)" : "Calculate the total number of diagonals in an n-sided polygon",
    category: "Science",
    icon: Icons.Hexagon
  },
  {
    id: "polygon-exterior-angle",
    slug: "polygon-exterior-angle",
    name: lang === "TH" ? "มุมภายนอกของรูป N เหลี่ยม" : "Regular Polygon Exterior Angle Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหามุมภายนอกของรูปหลายเหลี่ยมด้านเท่า (Regular Polygon Exterior Angle) ขนาด N เหลี่ยม พร้อมสูตรและขั้นตอนวิธีคำนวณอย่างละเอียด" : "Calculate the size of each exterior angle of a regular N-sided polygon with step-by-step math.",
    category: "Science",
    icon: Icons.Shapes
  },
  {
    id: "polygon-interior-angle-sum",
    slug: "polygon-interior-angle-sum",
    name: lang === "TH" ? "หาผลรวมมุมภายในรูปหลายเหลี่ยม" : "Polygon Interior Angle Sum Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาผลรวมของมุมภายใน และขนาดมุมแต่ละมุมของรูปหลายเหลี่ยมด้านเท่า" : "Tool to calculate the sum of interior angles of a polygon",
    category: "Science",
    icon: Icons.Hexagon
  },
  {
    id: "polynomial-derivative",
    slug: "polynomial-derivative",
    name: lang === "TH" ? "เครื่องมือคำนวณหาอนุพันธ์ของฟังก์ชันพหุนาม" : "Polynomial Derivative Calculator",
    desc: lang === "TH" ? "คำนวณหาอนุพันธ์ (Derivative) ของฟังก์ชันพหุนามพื้นฐาน ตามกฎการหาอนุพันธ์ (Power Rule)" : "Calculate the derivative of a basic polynomial function.",
    category: "Science",
    icon: Icons.MoveDownRight
  },
  {
    id: "population-standard-deviation",
    slug: "population-standard-deviation",
    name: lang === "TH" ? "เครื่องคำนวณส่วนเบี่ยงเบนมาตรฐานประชากร (Population S.D.)" : "Population Standard Deviation Calculator",
    desc: lang === "TH" ? "คำนวณหาส่วนเบี่ยงเบนมาตรฐาน (S.D.) และความแปรปรวน (Variance) ของกลุ่มประชากรทั้งหมด พร้อมวิธีทำทีละขั้นตอน" : "Calculate the population standard deviation (S.D.) and variance of a full population with step-by-step math.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "power-converter",
    slug: "แปลงหน่วยกำลัง",
    name: lang === "TH" ? "แปลงหน่วยกำลัง (Watt, Horsepower)" : "Power Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยกำลังไฟฟ้าและกำลังกล เช่น วัตต์ (W) กิโลวัตต์ (kW) และกำลังม้า (hp)" : "Convert between power units such as Watts (W), Kilowatts (kW), and Horsepower (hp).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "power-set-size",
    slug: "power-set-size",
    name: lang === "TH" ? "เครื่องมือคำนวณหาจำนวนสับเซตและพาวเวอร์เซต" : "Power Set Size Calculator",
    desc: lang === "TH" ? "คำนวณหาจำนวนสับเซตทั้งหมด (2^n) และลิสต์รายการพาวเวอร์เซตของเซตอินพุต พร้อมอธิบายความสัมพันธ์" : "Calculate the total number of subsets (2^n) and generate the power set with step-by-step explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "present-value-pv",
    slug: "present-value-pv",
    name: lang === "TH" ? "คำนวณมูลค่าเงินปัจจุบัน (Present Value)" : "Present Value (PV) Calculator",
    desc: lang === "TH" ? "คำนวณมูลค่าเงินปัจจุบัน (PV) เพื่อหามูลค่าที่แท้จริงของเงินในอนาคต" : "Calculate the present value of a future sum of money given a specific rate of return.",
    category: "Finance",
    icon: Icons.TrendingDown
  },
  {
    id: "pressure-converter",
    slug: "แปลงหน่วยความดัน",
    name: lang === "TH" ? "แปลงหน่วยความดัน (Pressure Converter)" : "Pressure Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยความดัน เช่น ปาสกาล (Pa) บาร์ (bar) บรรยากาศ (atm) และปอนด์ต่อตารางนิ้ว (psi)" : "Convert between pressure units such as Pascal (Pa), Bar, Atmosphere (atm), and Psi.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "prime-number-checker",
    slug: "prime-number-checker",
    name: lang === "TH" ? "เครื่องมือตรวจสอบจำนวนเฉพาะ" : "Prime Number Checker",
    desc: lang === "TH" ? "ตรวจสอบว่าตัวเลขของคุณเป็นจำนวนเฉพาะ (Prime Number) หรือไม่ พร้อมแสดงเหตุผลและวิธีเช็ค" : "Check if a number is prime and see its divisors and neighboring prime numbers.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "print-cost-per-page",
    slug: "print-cost-per-page",
    name: lang === "TH" ? "คำนวณต้นทุนการพิมพ์ต่อแผ่น" : "Print Cost Per Page Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนกระดาษ หมึก และค่าใช้จ่ายอื่นๆ ในการพิมพ์แต่ละหน้าอย่างละเอียด" : "Calculate the exact cost of printing per page including paper, ink, and other expenses.",
    category: "Utility",
    icon: Icons.Printer
  },
  {
    id: "probability-calculator",
    slug: "probability-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณความน่าจะเป็นเบื้องต้น (Probability)" : "Basic Probability Calculator",
    desc: lang === "TH" ? "คำนวณค่าความน่าจะเป็นของเหตุการณ์ต่างๆ จากจำนวนเหตุการณ์ที่สนใจและจำนวนเหตุการณ์ทั้งหมดในสเปซตัวอย่าง" : "Calculate the basic probability of an event from the number of favorable outcomes and total possible outcomes.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "projectile-motion",
    slug: "คำนวณ-projectile-motion",
    name: lang === "TH" ? "คำนวณโปรเจกไทล์ (Projectile Motion)" : "Projectile Motion Calculator",
    desc: lang === "TH" ? "คำนวณระยะทางสูงสุด ความสูงสูงสุด และเวลาในการบินของการเคลื่อนที่แบบโปรเจกไทล์" : "Calculate the range, maximum height, and time of flight for a projectile.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "property-taxes-new",
    slug: "คำนวณภาษีที่ดินและธุรกิจเฉพาะ",
    name: lang === "TH" ? "คำนวณค่าโอนและภาษีอสังหาฯ (กรมที่ดิน)" : "Property Transfer Tax & Fees Calculator",
    desc: lang === "TH" ? "คำนวณค่าโอน ภาษีธุรกิจเฉพาะ อากรแสตมป์ และภาษีหัก ณ ที่จ่าย ที่ต้องจ่าย ณ กรมที่ดิน" : "Calculate transfer fee, specific business tax, stamp duty, and withholding tax at the Land Department.",
    category: "Finance",
    icon: Icons.Receipt
  },
  {
    id: "prorate-salary",
    slug: "prorate-salary",
    name: lang === "TH" ? "คำนวณเงินเดือนแบบ Prorate" : "Prorated Salary Calculator",
    desc: lang === "TH" ? "คำนวณสัดส่วนเงินเดือนสำหรับพนักงานเข้าใหม่ ลาออกระหว่างเดือน หรือทำงานไม่เต็มเดือน (Prorate)" : "Calculate prorated salary for new joiners or mid-month resignations",
    category: "Business",
    icon: Icons.Wallet
  },
  {
    id: "pvd-retirement-calculator",
    slug: "pvd-retirement-calculator",
    name: lang === "TH" ? "คำนวณกองทุนสำรองเลี้ยงชีพ PVD" : "Provident Fund Calculator",
    desc: lang === "TH" ? "โปรแกรมประมาณการเงินก้อนกองทุนสำรองเลี้ยงชีพ (Provident Fund) ที่จะได้รับในวันเกษียณอายุ" : "Estimate the total lump sum you will receive from your Provident Fund (PVD) upon retirement.",
    category: "Finance",
    icon: Icons.Briefcase
  },
  {
    id: "pythagoras-hypotenuse",
    slug: "pythagoras-hypotenuse",
    name: lang === "TH" ? "คำนวณด้านตรงข้ามมุมฉาก (พีทาโกรัส)" : "Pythagoras Hypotenuse Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณทฤษฎีบทพีทาโกรัสเพื่อหาความยาวด้านตรงข้ามมุมฉาก (C)" : "Calculate the hypotenuse (C) using the Pythagorean theorem",
    category: "Science",
    icon: Icons.TriangleRight
  },
  {
    id: "pythagoras-leg",
    slug: "pythagoras-leg",
    name: lang === "TH" ? "คำนวณด้านประกอบมุมฉาก (พีทาโกรัส)" : "Pythagoras Leg Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณทฤษฎีบทพีทาโกรัสเพื่อหาความยาวด้านประกอบมุมฉาก (A หรือ B)" : "Calculate the leg of a right triangle (A or B) using the Pythagorean theorem",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "quadratic-equation",
    slug: "quadratic-equation",
    name: lang === "TH" ? "โปรแกรมแก้สมการกำลังสอง (Quadratic)" : "Quadratic Equation Solver",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาคำตอบของสมการกำลังสอง (ax² + bx + c = 0) พร้อมแสดงวิธีทำด้วยสูตร Quadratic Formula" : "Solve quadratic equations (ax² + bx + c = 0) with step-by-step formula.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "quartile-calculator",
    slug: "quartile-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณควอไทล์ (Quartile)" : "Quartile Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าควอไทล์ (Q1, Q2, Q3) ของชุดข้อมูล แบบแสดงวิธีทำและการแบ่งทศนิยมอย่างละเอียด" : "Calculate the quartiles (Q1, Q2, Q3) of a dataset, with both Thai school curriculum and standard statistical options.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "quartile-deviation",
    slug: "quartile-deviation",
    name: lang === "TH" ? "เครื่องคำนวณส่วนเบี่ยงเบนควอไทล์" : "Quartile Deviation Calculator",
    desc: lang === "TH" ? "คำนวณค่าส่วนเบี่ยงเบนควอไทล์ (Quartile Deviation) พร้อมวิธีทำ" : "Calculate the quartile deviation or semi-interquartile range of a dataset.",
    category: "Science",
    icon: Icons.Activity
  },
  {
    id: "radian-to-degree",
    slug: "radian-to-degree",
    name: lang === "TH" ? "แปลงเรเดียนเป็นองศา" : "Radian to Degree Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงมุมจากเรเดียน (Radian) เป็นองศา (Degree) อย่างแม่นยำ พร้อมสูตรและวิธีการคำนวณ" : "Convert angle from Radian to Degree accurately.",
    category: "Science",
    icon: Icons.Orbit
  },
  {
    id: "rai-to-hectare",
    slug: "rai-to-hectare",
    name: lang === "TH" ? "แปลงไร่เป็นเฮกตาร์" : "Rai to Hectare Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากไร่เป็นเฮกตาร์ (1 ไร่ = 0.16 เฮกตาร์)" : "Convert area from Rai to Hectare (1 Rai = 0.16 Hectares)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "rai-to-ngan",
    slug: "rai-to-ngan",
    name: lang === "TH" ? "แปลงไร่เป็นงาน" : "Rai to Ngan Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากไร่เป็นงาน (1 ไร่ = 4 งาน)" : "Convert area from Rai to Ngan (1 Rai = 4 Ngan)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "rai-to-sqm",
    slug: "rai-to-sqm",
    name: lang === "TH" ? "แปลงไร่เป็นตารางเมตร" : "Rai to Square Meters Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากไร่เป็นตารางเมตร (1 ไร่ = 1,600 ตารางเมตร)" : "Convert area from Rai to Square Meters (1 Rai = 1600 Sq m)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "rai-to-sqwa",
    slug: "rai-to-sqwa",
    name: lang === "TH" ? "แปลงไร่เป็นตารางวา" : "Rai to Square Wa Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากไร่เป็นตารางวา (1 ไร่ = 400 ตารางวา)" : "Convert area from Rai to Square Wa (1 Rai = 400 Sq Wa)",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "random-number-generator",
    slug: "random-number-generator",
    name: lang === "TH" ? "เครื่องมือสุ่มตัวเลข" : "Random Number Generator",
    desc: lang === "TH" ? "สุ่มตัวเลขตามช่วงที่ต้องการ สามารถเลือกจำนวนตัวเลขที่สุ่ม กำหนดให้ไม่ซ้ำ และเรียงลำดับผลลัพธ์ได้" : "Generate random numbers within a specific range with options for unique values and sorting.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "range-calculator",
    slug: "range-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าพิสัย (Range)" : "Range Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าพิสัย (Range) ของข้อมูล พร้อมหาค่าสูงสุดและต่ำสุดของข้อมูล" : "Calculate the range of a dataset by finding the difference between maximum and minimum values.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "reading-comprehension",
    slug: "reading-comprehension",
    name: lang === "TH" ? "คำนวณคะแนนความเข้าใจในการอ่าน" : "Reading Comprehension Score",
    desc: lang === "TH" ? "คำนวณอัตราความเข้าใจในการอ่าน ความเร็วในการอ่าน (WPM) และประสิทธิภาพโดยรวม" : "Calculate reading comprehension rate, reading speed (WPM), and overall efficiency score",
    category: "General",
    icon: Icons.BookOpen
  },
  {
    id: "regression-line",
    slug: "คำนวณ-regression-line",
    name: lang === "TH" ? "คำนวณ Regression Line" : "Linear Regression Calculator",
    desc: lang === "TH" ? "คำนวณสมการเส้นถดถอยเชิงเส้นอย่างง่าย (y = mx + c) และหาค่าสหสัมพันธ์ R²" : "Calculate the simple linear regression equation (y = mx + c) and R-squared coefficient.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "relationship-investment",
    slug: "relationship-investment",
    name: lang === "TH" ? "คำนวณเวลาที่ใช้ลงทุนในความสัมพันธ์" : "Relationship Time Investment",
    desc: lang === "TH" ? "วิเคราะห์เวลาที่คุณให้กับคนสำคัญ เพื่อสร้างความสัมพันธ์ที่แน่นแฟ้น" : "Analyze the time you dedicate to loved ones to build strong relationships",
    category: "General",
    icon: Icons.Users
  },
  {
    id: "rental-yield-new",
    slug: "คำนวณ-rental-yield-ห้องชุด",
    name: lang === "TH" ? "คำนวณ Rental Yield คอนโด/ห้องชุด" : "Condo Rental Yield Calculator",
    desc: lang === "TH" ? "หาอัตราผลตอบแทนการปล่อยเช่าคอนโดมิเนียม Gross Yield และ Net Yield แบบละเอียด" : "Calculate Gross and Net Rental Yield for condo and apartment investments.",
    category: "Finance",
    icon: Icons.Percent
  },
  {
    id: "reorder-point-calculator",
    slug: "reorder-point-calculator",
    name: lang === "TH" ? "คำนวณจุดสั่งซื้อใหม่ (Reorder Point)" : "Reorder Point Calculator",
    desc: lang === "TH" ? "คำนวณจุดสั่งซื้อสินค้าใหม่ (ROP) เพื่อให้มีสินค้าพอขายตลอดเวลาและลดต้นทุนจม" : "Calculate the Reorder Point (ROP) to ensure optimal inventory levels.",
    category: "Business",
    icon: Icons.ArrowDownToLine
  },
  {
    id: "roman-to-decimal",
    slug: "roman-to-decimal",
    name: lang === "TH" ? "เครื่องมือแปลงเลขโรมันเป็นเลขฐานสิบ" : "Roman to Decimal Converter",
    desc: lang === "TH" ? "แปลงตัวเลขโรมัน (I, V, X, L, C, D, M) เป็นตัวเลขฐานสิบปกติ พร้อมวิเคราะห์ขั้นตอนวิธีบวกลบ" : "Convert Roman numerals (I, V, X, L, C, D, M) to decimal integers with breakdown steps.",
    category: "Science",
    icon: Icons.Hash
  },
  {
    id: "rto-rpo",
    slug: "rto-rpo",
    name: lang === "TH" ? "เครื่องคำนวณต้นทุน RTO/RPO" : "RTO/RPO Cost Calculator",
    desc: lang === "TH" ? "วิเคราะห์ต้นทุนและความเสียหายจากเป้าหมายเวลาการกู้คืน (RTO) และจุดกู้คืนข้อมูล (RPO)" : "Analyze the potential costs and exposure based on Recovery Time Objective (RTO) and Recovery Point Objective (RPO).",
    category: "Technology",
    icon: Icons.Target
  },
  {
    id: "safety-stock-calculator",
    slug: "safety-stock-calculator",
    name: lang === "TH" ? "คำนวณ Safety Stock" : "Safety Stock Calculator",
    desc: lang === "TH" ? "คำนวณสต็อกปลอดภัย (Safety Stock) เพื่อป้องกันปัญหาสินค้าขาดมือ" : "Calculate safety stock to prevent stockouts and manage inventory efficiently.",
    category: "Business",
    icon: Icons.ShieldCheck
  },
  {
    id: "sample-size",
    slug: "คำนวณขนาดกลุ่มตัวอย่าง",
    name: lang === "TH" ? "คำนวณขนาดกลุ่มตัวอย่าง" : "Sample Size Calculator",
    desc: lang === "TH" ? "คำนวณขนาดกลุ่มตัวอย่างด้วยสูตร Yamane, Taro Yamane หรือ Cochran" : "Calculate the required sample size using Yamane or Cochran formula.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sample-standard-deviation",
    slug: "sample-standard-deviation",
    name: lang === "TH" ? "เครื่องคำนวณส่วนเบี่ยงเบนมาตรฐานกลุ่มตัวอย่าง (Sample S.D.)" : "Sample Standard Deviation Calculator",
    desc: lang === "TH" ? "คำนวณหาส่วนเบี่ยงเบนมาตรฐาน (S.D.) และความแปรปรวน (Variance) ของกลุ่มตัวอย่างด้วยตัวหาร (n - 1) พร้อมรายละเอียดวิธีทำ" : "Calculate the sample standard deviation (S.D.) and sample variance with degrees of freedom (n - 1).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "scientific-notation-to-decimal",
    slug: "scientific-notation-to-decimal",
    name: lang === "TH" ? "แปลงสัญกรณ์วิทยาศาสตร์เป็นทศนิยม" : "Scientific Notation to Decimal Converter",
    desc: lang === "TH" ? "แปลงตัวเลขในรูปสัญกรณ์วิทยาศาสตร์ (a x 10^n) ให้เป็นตัวเลขปกติ" : "Convert scientific notation (a x 10^n) to decimal",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sector-area-calculator",
    slug: "sector-area-calculator",
    name: lang === "TH" ? "เครื่องคำนวณพื้นที่เซกเตอร์" : "Sector Area Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาพื้นที่เซกเตอร์ของวงกลม (ส่วนของวงกลมคล้ายชิ้นพิซซ่า) จากรัศมีและมุม" : "Calculate the area of a circular sector using radius and central angle.",
    category: "Science",
    icon: Icons.PieChart
  },
  {
    id: "severance-pay-calculator",
    slug: "severance-pay-calculator",
    name: lang === "TH" ? "คำนวณเงินชดเชยเลิกจ้าง" : "Severance Pay Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณเงินชดเชยเมื่อถูกเลิกจ้าง (ค่าตกใจ) ตามกฎหมายคุ้มครองแรงงานไทยฉบับล่าสุด" : "Calculate the severance pay you are entitled to under Thai Labor Law when terminated.",
    category: "Finance",
    icon: Icons.Scale
  },
  {
    id: "simple-moving-average",
    slug: "simple-moving-average",
    name: lang === "TH" ? "คำนวณค่าเฉลี่ยเคลื่อนที่อย่างง่าย (SMA)" : "Simple Moving Average Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณค่าเฉลี่ยเคลื่อนที่อย่างง่าย (Simple Moving Average - SMA) จากชุดข้อมูล" : "Calculate the Simple Moving Average (SMA) from a dataset to identify trends.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "six-jars-money-management",
    slug: "six-jars-money-management",
    name: lang === "TH" ? "สัดส่วนการจัดการเงินสูตร 6 Jars (หกไห)" : "Six Jars Money Management Calculator",
    desc: lang === "TH" ? "แบ่งสัดส่วนการเงินตามทฤษฎี 6 Jars (หกไห) ของ T. Harv Eker" : "Allocate your income based on the Six Jars money management system.",
    category: "Finance",
    icon: Icons.PieChart
  },
  {
    id: "skewness-calculator",
    slug: "skewness-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าความเบ้ (Skewness)" : "Skewness Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าความเบ้ของชุดข้อมูล (Skewness) อย่างแม่นยำ พร้อมอธิบายวิธีคิด" : "Calculate the skewness of a dataset to measure its asymmetry.",
    category: "Science",
    icon: Icons.TrendingUp
  },
  {
    id: "skill-half-life",
    slug: "skill-half-life",
    name: lang === "TH" ? "เครื่องคำนวณอายุทักษะ (Skill Half-Life Calculator)" : "Skill Half-Life Calculator",
    desc: lang === "TH" ? "คำนวณว่าทักษะความรู้ในสายอาชีพของคุณจะล้าสมัยไปครึ่งหนึ่งเมื่อใด" : "Estimate how fast your professional skills might become obsolete.",
    category: "General",
    icon: Icons.Hourglass
  },
  {
    id: "skincare-routine-cost",
    slug: "คำนวณค่าใช้จ่ายครีมบำรุงผิว",
    name: lang === "TH" ? "คำนวณค่าใช้จ่ายครีมบำรุงผิว" : "Skincare Routine Cost Calculator",
    desc: lang === "TH" ? "คำนวณยอดเงินสะสมรายเดือนและรายปีของรูทีนสกินแคร์และเครื่องสำอาง" : "Estimate your average monthly and yearly skincare routine costs.",
    category: "Finance",
    icon: Icons.Sparkles
  },
  {
    id: "sla-uptime",
    slug: "sla-uptime",
    name: lang === "TH" ? "เครื่องคำนวณ SLA Uptime (เวลาทำงานเทียบกับเวลาหยุดชะงัก)" : "SLA Uptime Calculator",
    desc: lang === "TH" ? "คำนวณเวลาหยุดชะงัก (Downtime) ที่ยอมรับได้ในแต่ละระดับ SLA (เช่น 99.9%, 99.99%) ต่อวัน สัปดาห์ เดือน และปี" : "Calculate the acceptable downtime for a given SLA percentage (e.g., 99.9%) per day, week, month, and year.",
    category: "Technology",
    icon: Icons.Percent
  },
  {
    id: "sleep-debt-calculator",
    slug: "sleep-debt-calculator",
    name: lang === "TH" ? "คำนวณหนี้การนอน (Sleep Debt)" : "Sleep Debt Calculator",
    desc: lang === "TH" ? "คำนวณชั่วโมงการนอนที่ขาดหายไปและวิธีใช้หนี้การนอน" : "Calculate accumulated sleep debt and how to recover",
    category: "Health",
    icon: Icons.Moon
  },
  {
    id: "slope-formula",
    slug: "slope-formula",
    name: lang === "TH" ? "เครื่องมือคำนวณหาความชันของเส้นตรง" : "Slope Formula Calculator",
    desc: lang === "TH" ? "คำนวณหาความชัน (m) ของเส้นตรงระหว่างจุดสองจุดพร้อมหามุมเอียงและทิศทาง" : "Calculate the slope (m) of a line passing through two coordinates and find its angle.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "slope-intercept-equation",
    slug: "slope-intercept-equation",
    name: lang === "TH" ? "เครื่องมือหาสมการเส้นตรงในรูปความชันและจุดตัดแกน Y" : "Slope-Intercept Equation Calculator",
    desc: lang === "TH" ? "คำนวณหาสมการเส้นตรง y = mx + b จากจุดสองจุด หรือ ความชันและจุดผ่าน" : "Calculate the linear equation in slope-intercept form (y = mx + b) from points or slope.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "smoking-vaping-cost",
    slug: "คำนวณค่าบุหรี่ต่อปี",
    name: lang === "TH" ? "คำนวณค่าบุหรี่ต่อปี" : "Annual Smoking & Vaping Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าใช้จ่ายและประมาณการเงินจมสะสมจากการสูบบุหรี่และพอตไฟฟ้า" : "Estimate your costs related to traditional smoking or electronic vaping.",
    category: "Health",
    icon: Icons.Heart
  },
  {
    id: "social-media-roi",
    slug: "social-media-roi",
    name: lang === "TH" ? "เครื่องคำนวณความคุ้มค่าของการเล่นโซเชียล" : "Personal Social Media ROI",
    desc: lang === "TH" ? "ประเมินมูลค่าเวลาที่คุณใช้ไปกับโซเชียลมีเดียเทียบกับผลตอบแทนที่ได้รับ" : "Calculate the value of time spent on social media versus your hourly worth.",
    category: "General",
    icon: Icons.Smartphone
  },
  {
    id: "social-security-lump-sum",
    slug: "social-security-lump-sum",
    name: lang === "TH" ? "คำนวณบำเหน็จชราภาพประกันสังคม" : "Social Security Lump Sum Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณเงินบำเหน็จชราภาพประกันสังคม (เงินก้อน) สำหรับผู้ที่ส่งเงินสมทบไม่ถึง 180 เดือน" : "Calculate the social security old-age lump sum for those who contributed less than 180 months.",
    category: "Finance",
    icon: Icons.Coins
  },
  {
    id: "social-security-m33-m39",
    slug: "social-security-m33-m39",
    name: lang === "TH" ? "คำนวณเงินสมทบประกันสังคม ม.33 และ ม.39" : "Social Security M33 & M39 Calculator",
    desc: lang === "TH" ? "คำนวณเงินสมทบประกันสังคมมาตรา 33 (พนักงานประจำ) และมาตรา 39 (ผู้ประกันตนโดยสมัครใจ)" : "Calculate social security contributions for Section 33 (Employees) and Section 39 (Voluntary)",
    category: "Finance",
    icon: Icons.Building
  },
  {
    id: "social-security-m40",
    slug: "social-security-m40",
    name: lang === "TH" ? "คำนวณเงินสมทบประกันสังคม ม.40" : "Social Security M40 Calculator",
    desc: lang === "TH" ? "คำนวณเงินสมทบและดูสิทธิประโยชน์ประกันสังคมมาตรา 40 สำหรับอาชีพอิสระ (ทางเลือก 1-3)" : "Calculate contributions and benefits for Social Security Section 40 (Freelance)",
    category: "Finance",
    icon: Icons.UserCheck
  },
  {
    id: "social-security-pension",
    slug: "social-security-pension",
    name: lang === "TH" ? "คำนวณบำนาญชราภาพประกันสังคม" : "Social Security Pension Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณเงินบำนาญชราภาพประกันสังคมรายเดือนที่คุณจะได้รับเมื่อเกษียณอายุ" : "Calculate the monthly social security old-age pension you will receive upon retirement.",
    category: "Finance",
    icon: Icons.PiggyBank
  },
  {
    id: "spaced-repetition",
    slug: "spaced-repetition",
    name: lang === "TH" ? "คำนวณระยะเวลาการทบทวน" : "Spaced Repetition Interval",
    desc: lang === "TH" ? "คำนวณระยะเวลาที่เหมาะสมในการทบทวนเนื้อหาตามหลัก Spaced Repetition (SM-2)" : "Calculate the optimal interval for reviewing content using Spaced Repetition (SM-2 algorithm)",
    category: "General",
    icon: Icons.Brain
  },
  {
    id: "spherical-to-cartesian",
    slug: "spherical-to-cartesian",
    name: lang === "TH" ? "พิกัดทรงกลมเป็นพิกัดฉาก" : "Spherical to Cartesian Converter",
    desc: lang === "TH" ? "เครื่องมือคำนวณแปลงพิกัดทรงกลม (r, θ, φ) เป็นพิกัดฉาก (x, y, z) ในระบบ 3 มิติ" : "Convert spherical coordinates (r, theta, phi) to 3D Cartesian coordinates (x, y, z).",
    category: "Science",
    icon: Icons.Globe
  },
  {
    id: "sqft-to-sqin",
    slug: "sqft-to-sqin",
    name: lang === "TH" ? "แปลงตารางฟุตเป็นตารางนิ้ว" : "Sq Ft to Sq In Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากตารางฟุต (Square Feet) เป็น ตารางนิ้ว (Square Inches) พร้อมสูตรคำนวณ" : "Convert Square Feet to Square Inches with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqft-to-sqm",
    slug: "sqft-to-sqm",
    name: lang === "TH" ? "แปลงตารางฟุตเป็นตารางเมตร" : "Sq Ft to Sq m Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากตารางฟุต (Square Feet) เป็น ตารางเมตร (Square Meters) พร้อมสูตรคำนวณ" : "Convert Square Feet to Square Meters with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqkm-to-acre",
    slug: "sqkm-to-acre",
    name: lang === "TH" ? "แปลงตารางกิโลเมตรเป็นเอเคอร์" : "Sq Km to Acre Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากตารางกิโลเมตร (Square Kilometers) เป็น เอเคอร์ (Acres) พร้อมสูตรคำนวณ" : "Convert Square Kilometers to Acres with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqkm-to-rai",
    slug: "sqkm-to-rai",
    name: lang === "TH" ? "แปลงตารางกิโลเมตรเป็นไร่" : "Square Kilometer to Rai Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางกิโลเมตร (sq.km.) เป็น ไร่ (Rai) ออนไลน์ ใช้งานฟรี" : "Convert Square Kilometers to Rai",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqkm-to-sqm",
    slug: "sqkm-to-sqm",
    name: lang === "TH" ? "แปลงตารางกิโลเมตรเป็นตารางเมตร" : "Square Kilometer to Square Meter Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางกิโลเมตร (sq.km.) เป็นตารางเมตร (sq.m.) ออนไลน์ ใช้งานฟรี" : "Convert Square Kilometers to Square Meters",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqm-to-acre",
    slug: "sqm-to-acre",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นเอเคอร์" : "Square Meter to Acre Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางเมตร (sq.m.) เป็นเอเคอร์ (Acre) แบบออนไลน์ แม่นยำและใช้งานฟรี" : "Convert Square Meters to Acres",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqm-to-ngan",
    slug: "sqm-to-ngan",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นงาน" : "Sq.m to Ngan",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่ตารางเมตรเป็นงาน" : "Convert Square Meters to Ngan.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqm-to-rai",
    slug: "sqm-to-rai",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นไร่" : "Sq.m to Rai",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่ตารางเมตรเป็นไร่" : "Convert Square Meters to Rai.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqm-to-sqft",
    slug: "sqm-to-sqft",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นตารางฟุต" : "Square Meter to Square Foot Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางเมตร (sq.m.) เป็นตารางฟุต (sq.ft.) แบบออนไลน์ ใช้งานฟรี แม่นยำ" : "Convert Square Meters to Square Feet",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqm-to-sqkm",
    slug: "sqm-to-sqkm",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นตารางกิโลเมตร" : "Square Meter to Square Kilometer Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางเมตร (sq.m.) เป็นตารางกิโลเมตร (sq.km.) แบบออนไลน์ ใช้งานฟรี" : "Convert Square Meters to Square Kilometers",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqm-to-sqwa",
    slug: "sqm-to-sqwa",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นตารางวา" : "Sq.m to Sq.Wa",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่ตารางเมตรเป็นตารางวา" : "Convert Square Meters to Square Wa.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqm-to-sqyd",
    slug: "sqm-to-sqyd",
    name: lang === "TH" ? "แปลงตารางเมตรเป็นตารางหลา" : "Square Meter to Square Yard Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงหน่วยพื้นที่จากตารางเมตร (sq.m.) เป็นตารางหลา (sq.yd.) ออนไลน์ ใช้งานฟรี" : "Convert Square Meters to Square Yards",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "square-root-calculator",
    slug: "square-root-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณหารากที่สอง (Square Root)" : "Square Root Calculator",
    desc: lang === "TH" ? "คำนวณรากที่สองของตัวเลข แสดงคำตอบเป็นทศนิยมและรูปกรณฑ์อย่างง่าย (Simplified Radical Form) พร้อมวิธีทำ" : "Calculate the square root of a number, simplify the radical, and show step-by-step explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "sqwa-to-ngan",
    slug: "sqwa-to-ngan",
    name: lang === "TH" ? "แปลงตารางวาเป็นงาน" : "Sq.Wa to Ngan",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่จากตารางวา (Sq.Wa) เป็นงาน (Ngan)" : "Convert Square Wa to Ngan easily.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqwa-to-rai",
    slug: "sqwa-to-rai",
    name: lang === "TH" ? "แปลงตารางวาเป็นไร่" : "Sq.Wa to Rai",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่จากตารางวา (Sq.Wa) เป็นไร่ (Rai)" : "Convert Square Wa to Rai easily.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqwa-to-sqm",
    slug: "sqwa-to-sqm",
    name: lang === "TH" ? "แปลงตารางวาเป็นตารางเมตร" : "Sq.Wa to Sq.m",
    desc: lang === "TH" ? "โปรแกรมแปลงพื้นที่ตารางวาเป็นตารางเมตร" : "Convert Square Wa to Square Meters.",
    category: "Science",
    icon: Icons.Map
  },
  {
    id: "sqyd-to-sqm",
    slug: "sqyd-to-sqm",
    name: lang === "TH" ? "แปลงตารางหลาเป็นตารางเมตร" : "Sq Yd to Sq m Converter",
    desc: lang === "TH" ? "เครื่องมือแปลงพื้นที่จากตารางหลา (Square Yards) เป็น ตารางเมตร (Square Meters) พร้อมสูตรคำนวณ" : "Convert Square Yards to Square Meters with formula",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "standard-deviation",
    slug: "คำนวณ-standard-deviation",
    name: lang === "TH" ? "คำนวณ Standard Deviation" : "Standard Deviation Calculator",
    desc: lang === "TH" ? "คำนวณส่วนเบี่ยงเบนมาตรฐาน (SD) ความแปรปรวน (Variance) และค่าเฉลี่ยของข้อมูล" : "Calculate the standard deviation (SD), variance, and mean for a dataset.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "standard-error-calculator",
    slug: "standard-error-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณความคลาดเคลื่อนมาตรฐาน (SE)" : "Standard Error Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาค่าความคลาดเคลื่อนมาตรฐาน (Standard Error)" : "Standard Error (SE) Calculator",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "standing-desk-ratio",
    slug: "standing-desk-ratio",
    name: lang === "TH" ? "คำนวณสัดส่วนการยืนทำงาน (Standing Desk Ratio)" : "Standing Desk Time Ratio Calculator",
    desc: lang === "TH" ? "คำนวณและวางแผนสัดส่วนการนั่งและการยืนทำงานเพื่อสุขภาพที่ดี" : "Calculate and plan your sitting and standing time ratio for better health.",
    category: "Health",
    icon: Icons.Timer
  },
  {
    id: "streaming-subscriptions-cost",
    slug: "คำนวณค่าสมาชิกรายเดือน-streaming",
    name: lang === "TH" ? "คำนวณค่าสมาชิกรายเดือน streaming" : "Streaming Subscriptions Calculator",
    desc: lang === "TH" ? "รวบรวมและวิเคราะห์ค่าสมาชิกสตรีมมิ่งความบันเทิงรายเดือนและรายปี" : "Audit your monthly streaming services and track potential investment opportunity costs.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "sum-difference-of-cubes",
    slug: "sum-difference-of-cubes",
    name: lang === "TH" ? "เครื่องมือคำนวณหาผลบวกและผลต่างกำลังสาม" : "Sum and Difference of Cubes Calculator",
    desc: lang === "TH" ? "คำนวณและแยกตัวประกอบของผลบวกกำลังสาม (a³ + b³) และผลต่างกำลังสาม (a³ - b³) พร้อมแสดงวิธีทำอย่างละเอียด" : "Calculate and factor the sum (a³ + b³) and difference (a³ - b³) of cubes with step-by-step explanations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "surface-area-cylinder",
    slug: "surface-area-cylinder",
    name: lang === "TH" ? "เครื่องมือคำนวณพื้นที่ผิวทรงกระบอกรวมฝาปิด" : "Cylinder Surface Area Calculator",
    desc: lang === "TH" ? "คำนวณพื้นที่ผิวทั้งหมดของทรงกระบอก (พื้นที่ผิวข้างและพื้นที่ฝาปิดหัวท้าย) พร้อมปริมาตรอย่างละเอียดจากรัศมีและความสูง" : "Calculate the total surface area (including lateral area and two bases) and volume of a cylinder given its radius and height.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "surface-area-sphere",
    slug: "surface-area-sphere",
    name: lang === "TH" ? "เครื่องมือคำนวณพื้นที่ผิวทรงกลม" : "Sphere Surface Area Calculator",
    desc: lang === "TH" ? "คำนวณพื้นที่ผิวของทรงกลมจากรัศมี เส้นผ่านศูนย์กลาง หรือปริมาตร พร้อมสูตรคำนวณและวิธีคำนวณย้อนกลับอย่างละเอียด" : "Calculate the surface area of a sphere from radius, diameter, or volume. Includes reverse calculations and formulas.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "system-of-equations-2-variables",
    slug: "system-of-equations-2-variables",
    name: lang === "TH" ? "เครื่องมือแก้ระบบสมการสองตัวแปร" : "System of Equations (2 Variables) Solver",
    desc: lang === "TH" ? "คำนวณแก้ระบบสมการเชิงเส้น 2 ตัวแปร หาคำตอบค่า x และ y พร้อมการแสดงขั้นตอนการหาดีเทอร์มิแนนต์ตามกฎของคราเมอร์" : "Solve a system of two linear equations in two variables (x and y) using Cramer's Rule with complete steps.",
    category: "Science",
    icon: Icons.Grid
  },
  {
    id: "system-of-equations-3-variables",
    slug: "system-of-equations-3-variables",
    name: lang === "TH" ? "เครื่องมือคำนวณแก้ระบบสมการเชิงเส้นสามตัวแปร" : "System of Linear Equations (3 Variables) Calculator",
    desc: lang === "TH" ? "คำนวณหาคำตอบของระบบสมการเชิงเส้น 3 ตัวแปร (x, y, z) ด้วยหลักการเมทริกซ์ (Cramer's Rule)" : "Calculate the solution to a system of linear equations with 3 variables using matrix principles.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "t-score-calculator",
    slug: "t-score-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่า T-Score" : "T-Score Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณค่า T-Score ทางสถิติ และการประเมินผลการศึกษา" : "Statistical and Educational T-Score Calculator",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "t-test",
    slug: "คำนวณ-t-test",
    name: lang === "TH" ? "คำนวณ T-Test" : "Student's T-Test Calculator",
    desc: lang === "TH" ? "คำนวณการทดสอบที (t-test) เพื่อเปรียบเทียบค่าเฉลี่ยของสองกลุ่มตัวอย่าง" : "Perform Student's t-test (independent or paired) to compare means of two groups.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "taro-yamane-sample-size",
    slug: "taro-yamane-sample-size",
    name: lang === "TH" ? "เครื่องมือคำนวณขนาดกลุ่มตัวอย่างของทาโร่ ยามาเน่" : "Taro Yamane Sample Size Calculator",
    desc: lang === "TH" ? "หาขนาดกลุ่มตัวอย่างที่เหมาะสมในการวิจัยด้วยสูตร Taro Yamane" : "Calculate the required sample size for research using the Taro Yamane formula.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "task-batching",
    slug: "task-batching",
    name: lang === "TH" ? "เครื่องคิดเลข Task Batching" : "Task Batching Calculator",
    desc: lang === "TH" ? "คำนวณเวลาที่คุณจะประหยัดได้จากการจัดกลุ่มงานที่เหมือนกันไว้ทำพร้อมกัน (Task Batching)" : "Calculate the time saved by grouping similar tasks together (Task Batching).",
    category: "General",
    icon: Icons.Layers
  },
  {
    id: "tax-deduction-donation",
    slug: "tax-deduction-donation",
    name: lang === "TH" ? "คำนวณลดหย่อนภาษีเงินบริจาค" : "Donation Tax Deduction Calculator",
    desc: lang === "TH" ? "คำนวณสิทธิประโยชน์ภาษีเงินบริจาคทั่วไป (1 เท่า) และบริจาคเพื่อการศึกษา/โรงพยาบาล (2 เท่า)" : "Calculate tax deduction limits for general and double donations.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "tax-deduction-insurance",
    slug: "tax-deduction-insurance",
    name: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีประกันชีวิต/สุขภาพ" : "Life & Health Insurance Tax Deduction Calculator",
    desc: lang === "TH" ? "คำนวณสิทธิการลดหย่อนภาษีสูงสุดจากเบี้ยประกันชีวิต ประกันสุขภาพ และประกันบำนาญ" : "Calculate maximum tax deduction rights from life, health, and pension insurance premiums",
    category: "Finance",
    icon: Icons.HeartHandshake
  },
  {
    id: "tax-deduction-rmf",
    slug: "tax-deduction-rmf",
    name: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีกองทุน RMF" : "RMF Tax Deduction Calculator",
    desc: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีจากกองทุนรวมเพื่อการเลี้ยงชีพ (RMF) สูงสุด 30% ของรายได้ ไม่เกิน 500,000 บาท" : "Calculate tax deduction from RMF up to 30% of income, max 500,000 THB",
    category: "Finance",
    icon: Icons.Briefcase
  },
  {
    id: "tax-deduction-ssf",
    slug: "tax-deduction-ssf",
    name: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีกองทุน SSF" : "SSF Tax Deduction Calculator",
    desc: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีจากกองทุนรวมเพื่อการออม (SSF) สูงสุด 30% ของรายได้ ไม่เกิน 200,000 บาท" : "Calculate tax deduction from SSF up to 30% of income, max 200,000 THB",
    category: "Finance",
    icon: Icons.TrendingUp
  },
  {
    id: "tax-deduction-thaiesg",
    slug: "tax-deduction-thaiesg",
    name: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีกองทุน ThaiESG" : "ThaiESG Tax Deduction Calculator",
    desc: lang === "TH" ? "คำนวณสิทธิลดหย่อนภาษีจากกองทุน ThaiESG สูงสุด 30% ของรายได้ ไม่เกิน 300,000 บาท (เกณฑ์ใหม่)" : "Calculate tax deduction from ThaiESG up to 30% of income, max 300,000 THB (New rules)",
    category: "Finance",
    icon: Icons.Leaf
  },
  {
    id: "ten-thousand-hours",
    slug: "ten-thousand-hours",
    name: lang === "TH" ? "10,000 ชั่วโมง ชำนาญเมื่อไหร่" : "10,000 Hours Mastery Calculator",
    desc: lang === "TH" ? "คำนวณระยะเวลาในการไปถึง 10,000 ชั่วโมง เพื่อเป็นผู้เชี่ยวชาญตามทฤษฎี" : "Calculate the time to reach 10,000 hours for mastery",
    category: "General",
    icon: Icons.Clock
  },
  {
    id: "thai-post-ems-cost",
    slug: "thai-post-ems-cost",
    name: lang === "TH" ? "คำนวณค่าส่งพัสดุ EMS" : "Thai Post EMS Cost Calculator",
    desc: lang === "TH" ? "คำนวณค่าส่งไปรษณีย์ไทยแบบ EMS ตามน้ำหนัก" : "Calculate Thai Post EMS shipping cost based on weight.",
    category: "Business",
    icon: Icons.Truck
  },
  {
    id: "thai-public-holidays",
    slug: "thai-public-holidays",
    name: lang === "TH" ? "เช็ควันหยุดนักขัตฤกษ์" : "Thai Public Holidays",
    desc: lang === "TH" ? "ตรวจสอบวันหยุดนักขัตฤกษ์ประจำปีว่าเหลือกี่วัน" : "Check remaining Thai public holidays for the year",
    category: "General",
    icon: Icons.Calendar
  },
  {
    id: "time-affluence",
    slug: "time-affluence",
    name: lang === "TH" ? "คำนวณความมั่งคั่งทางเวลา" : "Time Affluence",
    desc: lang === "TH" ? "ประเมินเวลาว่างและอิสระในการใช้ชีวิตของคุณ เพื่อวัดความมั่งคั่งทางเวลา" : "Assess your free time and freedom to measure your time affluence",
    category: "General",
    icon: Icons.Clock
  },
  {
    id: "triangle-centroid",
    slug: "triangle-centroid",
    name: lang === "TH" ? "หาพิกัดเซนทรอยด์ของสามเหลี่ยม" : "Triangle Centroid Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณหาจุดศูนย์ถ่วง (Centroid) ของรูปสามเหลี่ยมจากพิกัด 3 จุด" : "Tool to find the centroid coordinates of a triangle from its 3 vertices",
    category: "Science",
    icon: Icons.Crosshair
  },
  {
    id: "trig-arccos",
    slug: "trig-arccos",
    name: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติย้อนกลับ ArcCos" : "ArcCos Calculator (Inverse Cosine)",
    desc: lang === "TH" ? "คำนวณค่ามุมจากอัตราส่วนโคไซน์ (Cosine) ในฟังก์ชันตรีโกณมิติย้อนกลับ (Arccosine) ได้ทั้งองศาและเรเดียน พร้อมคำอธิบายและสูตรประกอบ" : "Calculate the angle in degrees and radians from a cosine value using the inverse cosine (arccosine) function.",
    category: "Science",
    icon: Icons.Compass
  },
  {
    id: "trig-arcsin",
    slug: "trig-arcsin",
    name: lang === "TH" ? "คำนวณอาร์คไซน์ (ArcSin)" : "ArcSin (Inverse Sine) Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติย้อนกลับเพื่อหามุม (องศา/เรเดียน) จากค่า ArcSine (arcsin หรือ sin⁻¹)" : "Calculate the angle from the ArcSine value (Inverse Sine, sin⁻¹)",
    category: "Science",
    icon: Icons.ActivitySquare
  },
  {
    id: "trig-arctan",
    slug: "trig-arctan",
    name: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติย้อนกลับ ArcTan" : "ArcTan Calculator (Inverse Tangent)",
    desc: lang === "TH" ? "คำนวณค่ามุมจากอัตราส่วนแทนเจนต์ (Tangent) ในฟังก์ชันตรีโกณมิติย้อนกลับ (Arctangent) ได้ทั้งองศาและเรเดียน พร้อมคำอธิบายและสูตรประกอบ" : "Calculate the angle in degrees and radians from a tangent value using the inverse tangent (arctangent) function.",
    category: "Science",
    icon: Icons.Compass
  },
  {
    id: "trig-cos",
    slug: "trig-cos",
    name: lang === "TH" ? "คำนวณค่าโคไซน์ (Cosine)" : "Cosine (Cos) Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติเพื่อหาค่า Cosine (cos) จากมุมที่กำหนด (องศา)" : "Calculate the Cosine (cos) value from a given angle in degrees",
    category: "Science",
    icon: Icons.Activity
  },
  {
    id: "trig-sin",
    slug: "trig-sin",
    name: lang === "TH" ? "คำนวณค่าไซน์ (Sine)" : "Sine (Sin) Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติเพื่อหาค่า Sine (sin) จากมุมที่กำหนด (องศา)" : "Calculate the Sine (sin) value from a given angle in degrees",
    category: "Science",
    icon: Icons.Activity
  },
  {
    id: "trig-tan",
    slug: "trig-tan",
    name: lang === "TH" ? "คำนวณค่าแทนเจนต์ (Tangent)" : "Tangent (Tan) Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณตรีโกณมิติเพื่อหาค่า Tangent (tan) จากมุมที่กำหนด (องศา)" : "Calculate the Tangent (tan) value from a given angle in degrees",
    category: "Science",
    icon: Icons.Activity
  },
  {
    id: "truth-table-2-variables",
    slug: "truth-table-2-variables",
    name: lang === "TH" ? "เครื่องมือคำนวณตารางสัจนิรันดร์ทางตรรกศาสตร์ (2 ตัวแปร)" : "Truth Table Generator (2 Variables)",
    desc: lang === "TH" ? "สร้างตารางค่าความจริงของประพจน์ตรรกศาสตร์ 2 ตัวแปร P, Q พร้อมวิเคราะห์ความเป็นสัจนิรันดร์ (Tautology)" : "Generate truth table for 2-variable logic expressions P, Q and analyze if it is a Tautology.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "truth-table-3-variables",
    slug: "truth-table-3-variables",
    name: lang === "TH" ? "ตารางค่าความจริง 3 ตัวแปร" : "Truth Table 3 Variables",
    desc: lang === "TH" ? "เครื่องมือคำนวณตารางสัจนิรันดร์และค่าความจริง 3 ตัวแปร P, Q, R" : "Truth table calculator for 3 variables P, Q, R",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "valuation-cost-approach",
    slug: "คำนวณมูลค่าอสังหา-cost-approach",
    name: lang === "TH" ? "คำนวณมูลค่าอสังหาฯ วิธีต้นทุน (Cost Approach)" : "Cost Approach Property Valuation Calculator",
    desc: lang === "TH" ? "ประเมินมูลค่าบ้านและที่ดินโดยใช้วิธีต้นทุนทดแทนใหม่ หักค่าเสื่อมราคาสิ่งปลูกสร้างสะสม" : "Estimate property value by combining land value and depreciated building replacement cost.",
    category: "Finance",
    icon: Icons.Home
  },
  {
    id: "valuation-income-approach",
    slug: "คำนวณมูลค่าอสังหา-income-approach",
    name: lang === "TH" ? "คำนวณมูลค่าอสังหาฯ วิธีรายได้ (Income Approach)" : "Income Approach Property Valuation Calculator",
    desc: lang === "TH" ? "ประเมินมูลค่าอสังหาริมทรัพย์โดยอิงจากรายได้สุทธิจากการดำเนินงานและอัตราผลตอบแทนคาดหวัง" : "Estimate property value based on Net Operating Income (NOI) and Capitalization Rate.",
    category: "Finance",
    icon: Icons.Coins
  },
  {
    id: "value-is-what-percent",
    slug: "value-is-what-percent",
    name: lang === "TH" ? "คำนวณหาเปอร์เซ็นต์ของจำนวนเทียบกับยอดรวม" : "Value is What Percent Calculator",
    desc: lang === "TH" ? "หาว่าตัวเลขหนึ่งคิดเป็นกี่เปอร์เซ็นต์ของอีกตัวเลขหนึ่ง (เช่น 50 เป็นกี่ % ของ 200)" : "Calculate what percentage a number is of another number.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "variance-calculator",
    slug: "variance-calculator",
    name: lang === "TH" ? "เครื่องคำนวณค่าความแปรปรวน (Variance)" : "Variance Calculator",
    desc: lang === "TH" ? "คำนวณหาค่าความแปรปรวน (Variance) ทั้งแบบประชากรและกลุ่มตัวอย่าง พร้อมอธิบายสูตรและขั้นตอนอย่างละเอียด" : "Calculate both population and sample variance from a dataset with step-by-step math and formulas.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "vector-magnitude",
    slug: "vector-magnitude",
    name: lang === "TH" ? "เครื่องมือคำนวณหาขนาดความยาวของเวกเตอร์" : "Vector Magnitude Calculator",
    desc: lang === "TH" ? "คำนวณหาขนาดหรือความยาวของเวกเตอร์ (Vector Magnitude) ในระบบ 2 มิติ และ 3 มิติ" : "Calculate the magnitude or length of a vector in 2D and 3D systems.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "venn-diagram-2-sets",
    slug: "venn-diagram-2-sets",
    name: lang === "TH" ? "เครื่องมือคำนวณหาเวนน์ไดอะแกรม (Venn Diagram) 2 เซต" : "2-Set Venn Diagram Calculator",
    desc: lang === "TH" ? "คำนวณหาเซตยูเนียน อินเตอร์เซกชัน ผลต่าง และคอมพลีเมนต์ของ 2 เซต พร้อมวาดรูปเวนน์ไดอะแกรมจำลอง" : "Calculate union, intersection, difference, and complement of 2 sets with an interactive SVG Venn diagram.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "venn-diagram-3-sets",
    slug: "venn-diagram-3-sets",
    name: lang === "TH" ? "เครื่องมือคำนวณหาเวนน์ไดอะแกรม (Venn Diagram) 3 เซต" : "3-Set Venn Diagram Calculator",
    desc: lang === "TH" ? "คำนวณหาความสัมพันธ์ ยูเนียน อินเตอร์เซกชัน และสมาชิกในแต่ละบริเวณของ 3 เซต (A, B, C) พร้อมรูปภาพประกอบ" : "Calculate the relations, union, intersection, and sizes of 3 overlapping sets (A, B, C) with an interactive SVG.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "volume-cone",
    slug: "volume-cone",
    name: lang === "TH" ? "เครื่องมือคำนวณหาปริมาตรทรงกรวย" : "Cone Volume Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณปริมาตรทรงกรวยออนไลน์ เพียงใส่ค่ารัศมีและความสูง พร้อมคำอธิบายสูตรอย่างละเอียด" : "Online cone volume calculator. Enter radius and height to find the volume easily.",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "volume-cube",
    slug: "volume-cube",
    name: lang === "TH" ? "เครื่องมือคำนวณปริมาตรลูกบาศก์" : "Cube Volume Calculator",
    desc: lang === "TH" ? "คำนวณปริมาตร พื้นที่ผิว และความยาวเส้นแทยงมุมของรูปทรงลูกบาศก์แบบสองทิศทาง (ป้อนความยาวด้าน หรือป้อนปริมาตร/พื้นที่ผิว เพื่อหาย้อนกลับ)" : "Calculate the volume, surface area, and diagonal length of a cube. Supports reverse calculations from volume or surface area.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "volume-cylinder",
    slug: "volume-cylinder",
    name: lang === "TH" ? "เครื่องมือคำนวณหาปริมาตรทรงกระบอก" : "Cylinder Volume Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณปริมาตรทรงกระบอกออนไลน์ แค่ใส่รัศมีและความสูง พร้อมสูตรและคำอธิบาย" : "Online cylinder volume calculator. Enter radius and height to calculate.",
    category: "Science",
    icon: Icons.Cylinder
  },
  {
    id: "volume-pyramid",
    slug: "volume-pyramid",
    name: lang === "TH" ? "เครื่องมือคำนวณหาปริมาตรพีระมิดฐานสี่เหลี่ยม" : "Rectangular Pyramid Volume Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณปริมาตรพีระมิดฐานสี่เหลี่ยมออนไลน์ ระบุกว้าง ยาว สูง เพื่อหาคำตอบทันที" : "Calculate the volume of a rectangular or square pyramid online.",
    category: "Science",
    icon: Icons.Triangle
  },
  {
    id: "volume-sphere",
    slug: "volume-sphere",
    name: lang === "TH" ? "เครื่องมือคำนวณหาปริมาตรทรงกลม" : "Sphere Volume Calculator",
    desc: lang === "TH" ? "โปรแกรมคำนวณหาปริมาตรของทรงกลมออนไลน์ เพียงระบุรัศมี พร้อมสูตรและวิธีคิด" : "Calculate the volume of a sphere online by entering the radius.",
    category: "Science",
    icon: Icons.Circle
  },
  {
    id: "volume-triangular-prism",
    slug: "volume-triangular-prism",
    name: lang === "TH" ? "เครื่องมือคำนวณปริมาตรปริซึมสามเหลี่ยม" : "Triangular Prism Volume Calculator",
    desc: lang === "TH" ? "คำนวณปริมาตรของปริซึมสามเหลี่ยมด้วยวิธีที่หลากหลาย เช่น จากขนาดฐานและส่วนสูง หรือจากด้านทั้งสามของฐานตามสูตรเฮรอน พร้อมสูตรคำนวณอย่างละเอียด" : "Calculate the volume of a triangular prism using base dimensions, direct base area, or three side lengths (Heron's formula).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "volumetric-weight",
    slug: "volumetric-weight",
    name: lang === "TH" ? "คำนวณน้ำหนักตามปริมาตร (Volumetric Weight)" : "Volumetric Weight Calculator",
    desc: lang === "TH" ? "คำนวณน้ำหนักตามปริมาตรของกล่องพัสดุ เพื่อประเมินค่าจัดส่งสินค้าและเปรียบเทียบกับน้ำหนักจริง" : "Calculate the volumetric weight of a parcel to estimate shipping costs and compare with actual weight.",
    category: "Business",
    icon: Icons.Box
  },
  {
    id: "wardrobe-budget",
    slug: "คำนวณงบประมาณเสื้อผ้าต่อปี",
    name: lang === "TH" ? "คำนวณงบประมาณเสื้อผ้าต่อปี" : "Annual Wardrobe Budget Calculator",
    desc: lang === "TH" ? "จัดสรรงบประมาณเสื้อผ้าและเครื่องประดับให้สอดคล้องกับรายได้ต่อเดือนอย่างคุ้มค่า" : "Plan and allocate clothing budget wisely based on your monthly income.",
    category: "Finance",
    icon: Icons.Coins
  },
  {
    id: "warehousing-cost",
    slug: "warehousing-cost",
    name: lang === "TH" ? "คำนวณค่าจัดเก็บในคลังสินค้า" : "Warehousing Cost Calculator",
    desc: lang === "TH" ? "คำนวณต้นทุนการจัดเก็บสินค้าในคลังสินค้า รวมถึงค่าฝากเก็บและค่าดำเนินการ" : "Calculate warehousing and storage costs, including storage fees and handling charges.",
    category: "Business",
    icon: Icons.Warehouse
  },
  {
    id: "water-filter-sizing",
    slug: "คำนวณขนาดเครื่องกรองน้ำ",
    name: lang === "TH" ? "คำนวณขนาดเครื่องกรองน้ำ" : "Water Filter Sizing Calculator",
    desc: lang === "TH" ? "คำนวณขนาดและประเภทของเครื่องกรองน้ำดื่ม หรือระบบกรองน้ำใช้ทั้งบ้านที่เหมาะสมกับจำนวนสมาชิกในครอบครัว" : "Calculate the recommended water filter capacity and technology based on household size and water source.",
    category: "Construction",
    icon: Icons.Droplets
  },
  {
    id: "wave-calculator",
    slug: "คำนวณความยาวคลื่น",
    name: lang === "TH" ? "คำนวณคลื่น (ความถี่ ความยาวคลื่น ความเร็ว)" : "Wave Calculator (Frequency, Wavelength)",
    desc: lang === "TH" ? "คำนวณหาความเร็ว ความถี่ หรือความยาวคลื่น ตามสมการคลื่น (v = fλ)" : "Calculate wave speed, frequency, or wavelength using the wave equation (v = fλ).",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "weighted-average",
    slug: "weighted-average",
    name: lang === "TH" ? "เครื่องมือคำนวณหาค่าเฉลี่ยถ่วงน้ำหนัก (Weighted Average)" : "Weighted Average Calculator",
    desc: lang === "TH" ? "คำนวณค่าเฉลี่ยถ่วงน้ำหนัก (Weighted Average) จากรายการค่าและน้ำหนักความสำคัญ พร้อมอธิบายขั้นตอนและสูตรคำนวณ" : "Calculate the weighted average of a set of values with corresponding weights, showing step-by-step calculations.",
    category: "Science",
    icon: Icons.Calculator
  },
  {
    id: "wht-1-percent",
    slug: "wht-1-percent",
    name: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 1%" : "1% Withholding Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 1% สำหรับค่าขนส่งสินค้า" : "Calculate 1% withholding tax for transportation.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "wht-2-percent",
    slug: "wht-2-percent",
    name: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 2%" : "2% Withholding Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 2% สำหรับค่าโฆษณา" : "Calculate 2% withholding tax for advertising.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "wht-3-percent",
    slug: "wht-3-percent",
    name: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 3%" : "3% Withholding Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 3% สำหรับค่าบริการและรับจ้างทำของ" : "Calculate 3% withholding tax for services.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "wht-5-percent",
    slug: "wht-5-percent",
    name: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 5%" : "5% Withholding Tax Calculator",
    desc: lang === "TH" ? "คำนวณภาษีหัก ณ ที่จ่าย 5% สำหรับค่าเช่าอสังหาริมทรัพย์ รถยนต์ และเงินรางวัล" : "Calculate 5% withholding tax for rent and prizes.",
    category: "Finance",
    icon: Icons.Calculator
  },
  {
    id: "willpower-depletion",
    slug: "willpower-depletion",
    name: lang === "TH" ? "เครื่องคำนวณระดับความเหนื่อยล้าทางใจ (Willpower Depletion Score)" : "Willpower Depletion Score Calculator",
    desc: lang === "TH" ? "ประเมินระดับความเหนื่อยล้าจากการตัดสินใจและใช้ความคิดในแต่ละวัน" : "Assess your level of ego depletion and decision fatigue throughout the day.",
    category: "General",
    icon: Icons.BatteryWarning
  },
  {
    id: "wire-gauge-sizing",
    slug: "คำนวณขนาดสายไฟตามกระแส",
    name: lang === "TH" ? "คำนวณขนาดสายไฟตามกระแส" : "Wire Gauge Sizing Calculator",
    desc: lang === "TH" ? "คำนวณขนาดสายไฟทองแดงที่เหมาะสมตามปริมาณกระแสไฟฟ้า ระยะทาง และแรงดันไฟฟ้าเพื่อความปลอดภัย" : "Calculate the recommended copper wire gauge size based on electrical current, distance, and voltage drop.",
    category: "Construction",
    icon: Icons.Zap
  },
  {
    id: "work-life-balance-score",
    slug: "work-life-balance-score",
    name: lang === "TH" ? "ประเมินสมดุลชีวิตและการทำงาน" : "Work-Life Balance Score",
    desc: lang === "TH" ? "คำนวณคะแนนและวิเคราะห์ความสมดุลระหว่างชีวิตส่วนตัวและการทำงาน" : "Calculate your work-life balance score and get recommendations.",
    category: "Health",
    icon: Icons.Scale
  },
  {
    id: "working-days-calculator",
    slug: "working-days-calculator",
    name: lang === "TH" ? "คำนวณวันทำงาน" : "Working Days Calculator",
    desc: lang === "TH" ? "คำนวณจำนวนวันทำงานในแต่ละเดือน หรือ ช่วงเวลาที่กำหนด (ไม่รวมวันหยุด)" : "Calculate the number of working days in a month or given period",
    category: "Business",
    icon: Icons.Briefcase
  },
  {
    id: "wpm-productivity",
    slug: "wpm-productivity",
    name: lang === "TH" ? "คำนวณความเร็วในการพิมพ์ (WPM) และผลิตภาพ" : "WPM Typing Speed & Productivity Calculator",
    desc: lang === "TH" ? "คำนวณความเร็วในการพิมพ์ WPM ความแม่นยำ และประเมินเวลาในการทำงานเอกสาร" : "Calculate WPM typing speed, accuracy, and estimate time required for document tasks.",
    category: "Utility",
    icon: Icons.Keyboard
  },
  {
    id: "z-score-calculator",
    slug: "z-score-calculator",
    name: lang === "TH" ? "เครื่องมือคำนวณค่า Z-Score" : "Z-Score Calculator",
    desc: lang === "TH" ? "เครื่องมือคำนวณค่า Z-Score ทางสถิติ" : "Statistical Z-Score Calculator",
    category: "Science",
    icon: Icons.Calculator
  }
];

export const categories = [
  "Finance",
  "Health",
  "Science",
  "Conversion",
  "Technology",
  "Construction",
  "Family",
  "Utility",
  "Agriculture",
  "Environment",
  "Business",
  "General"
];
