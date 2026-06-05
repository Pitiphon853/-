import React, { useState } from 'react';
import { Calculator, Crosshair, RefreshCw, Info, BookOpen, Layers } from 'lucide-react';

export default function TriangleCentroid({ lang }: any) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [x3, setX3] = useState<string>('');
  const [y3, setY3] = useState<string>('');

  const [result, setResult] = useState<{
    cx: number;
    cy: number;
    svgPoints: { ax: number; ay: number; bx: number; by: number; cx: number; cy: number; gx: number; gy: number };
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const valX1 = parseFloat(x1);
    const valY1 = parseFloat(y1);
    const valX2 = parseFloat(x2);
    const valY2 = parseFloat(y2);
    const valX3 = parseFloat(x3);
    const valY3 = parseFloat(y3);

    if (
      isNaN(valX1) || isNaN(valY1) ||
      isNaN(valX2) || isNaN(valY2) ||
      isNaN(valX3) || isNaN(valY3)
    ) {
      setError(lang === 'th' ? 'กรุณากรอกพิกัด X และ Y ให้ครบถ้วนทั้ง 3 จุด' : 'Please enter X and Y coordinates for all 3 vertices.');
      return;
    }

    // Centroid formula
    const cx = (valX1 + valX2 + valX3) / 3;
    const cy = (valY1 + valY2 + valY3) / 3;

    // SVG coordinates mapping for visualization
    // We want a bounding box of points X1, X2, X3 and Cx
    const xs = [valX1, valX2, valX3, cx];
    const ys = [valY1, valY2, valY3, cy];

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const dx = (maxX - minX) || 1;
    const dy = (maxY - minY) || 1;

    // Map to a 300x200 SVG canvas with 30px padding
    const mapX = (x: number) => 30 + ((x - minX) / dx) * 240;
    const mapY = (y: number) => 170 - ((y - minY) / dy) * 140; // Invert Y for mathematical representation

    setResult({
      cx,
      cy,
      svgPoints: {
        ax: mapX(valX1),
        ay: mapY(valY1),
        bx: mapX(valX2),
        by: mapY(valY2),
        cx: mapX(valX3),
        cy: mapY(valY3),
        gx: mapX(cx),
        gy: mapY(cy),
      }
    });
  };

  const handleReset = () => {
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setX3('');
    setY3('');
    setResult(null);
    setError(null);
  };

  const isTH = lang === 'th';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-4">
        <Crosshair className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          {isTH ? 'เครื่องมือคำนวณหาพิกัดเซนทรอยด์ของรูปสามเหลี่ยม' : 'Triangle Centroid Calculator'}
        </h1>
      </div>

      {/* Grid UI */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-3">
              {isTH ? 'ระบุพิกัดจุดยอด (Vertices Coordinate)' : 'Enter Vertices Coordinate'}
            </h3>
            
            <div className="space-y-4">
              {/* Point A */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-sm font-bold text-gray-700">Point A (x₁, y₁):</span>
                <input
                  type="number"
                  placeholder="x₁"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
                <input
                  type="number"
                  placeholder="y₁"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
              </div>

              {/* Point B */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-sm font-bold text-gray-700">Point B (x₂, y₂):</span>
                <input
                  type="number"
                  placeholder="x₂"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
                <input
                  type="number"
                  placeholder="y₂"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
              </div>

              {/* Point C */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-sm font-bold text-gray-700">Point C (x₃, y₃):</span>
                <input
                  type="number"
                  placeholder="x₃"
                  value={x3}
                  onChange={(e) => setX3(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
                <input
                  type="number"
                  placeholder="y₃"
                  value={y3}
                  onChange={(e) => setY3(e.target.value)}
                  className="p-2 border rounded font-mono text-center"
                  step="any"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>{isTH ? 'คำนวณเซนทรอยด์' : 'Find Centroid'}</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Layers className="w-5 h-5 mr-2 text-green-500" />
              {isTH ? 'พิกัดจุดเซนทรอยด์' : 'Centroid Coordinate Result'}
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="text-sm text-gray-500 mb-1">{isTH ? 'จุดศูนย์ถ่วง G (x, y)' : 'Centroid G (x, y)'}</div>
                  <div className="text-3xl font-bold text-blue-600 font-mono">
                    ({result.cx.toLocaleString('en-US', { maximumFractionDigits: 4 })}, {result.cy.toLocaleString('en-US', { maximumFractionDigits: 4 })})
                  </div>
                </div>

                {/* SVG Visualizer */}
                <div className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">{isTH ? 'แผนภาพจำลองของรูปสามเหลี่ยม' : 'Triangle Schematic Visualizer'}</div>
                  <svg className="w-full max-w-[300px] h-[200px] bg-slate-50 rounded border border-gray-100" viewBox="0 0 300 200">
                    {/* Draw Triangle Lines */}
                    <polygon
                      points={`${result.svgPoints.ax},${result.svgPoints.ay} ${result.svgPoints.bx},${result.svgPoints.by} ${result.svgPoints.cx},${result.svgPoints.cy}`}
                      className="fill-blue-50 stroke-blue-500 stroke-2"
                    />
                    
                    {/* Draw Medians (G to vertices for reference) */}
                    <line x1={result.svgPoints.ax} y1={result.svgPoints.ay} x2={(result.svgPoints.bx + result.svgPoints.cx)/2} y2={(result.svgPoints.by + result.svgPoints.cy)/2} className="stroke-gray-300 stroke-1 stroke-dasharray-[2]" />
                    <line x1={result.svgPoints.bx} y1={result.svgPoints.by} x2={(result.svgPoints.ax + result.svgPoints.cx)/2} y2={(result.svgPoints.ay + result.svgPoints.cy)/2} className="stroke-gray-300 stroke-1 stroke-dasharray-[2]" />
                    <line x1={result.svgPoints.cx} y1={result.svgPoints.cy} x2={(result.svgPoints.ax + result.svgPoints.bx)/2} y2={(result.svgPoints.ay + result.svgPoints.by)/2} className="stroke-gray-300 stroke-1 stroke-dasharray-[2]" />

                    {/* Vertices Dots */}
                    <circle cx={result.svgPoints.ax} cy={result.svgPoints.ay} r="4" className="fill-red-500" />
                    <text x={result.svgPoints.ax - 10} y={result.svgPoints.ay - 5} className="text-[10px] font-mono font-bold fill-red-650">A</text>

                    <circle cx={result.svgPoints.bx} cy={result.svgPoints.by} r="4" className="fill-red-500" />
                    <text x={result.svgPoints.bx + 8} y={result.svgPoints.by + 10} className="text-[10px] font-mono font-bold fill-red-650">B</text>

                    <circle cx={result.svgPoints.cx} cy={result.svgPoints.cy} r="4" className="fill-red-500" />
                    <text x={result.svgPoints.cx - 5} y={result.svgPoints.cy + 12} className="text-[10px] font-mono font-bold fill-red-650">C</text>

                    {/* Centroid Dot */}
                    <circle cx={result.svgPoints.gx} cy={result.svgPoints.gy} r="5" className="fill-blue-600 stroke-white stroke-2" />
                    <text x={result.svgPoints.gx + 8} y={result.svgPoints.gy - 5} className="text-[11px] font-mono font-bold fill-blue-700">G (Centroid)</text>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Info className="w-16 h-16 mx-auto mb-4 opacity-10" />
                <p className="text-sm">
                  {isTH ? 'กรอกพิกัดจุดยอด x และ y ของ A, B และ C เพื่อเริ่มคำนวณหาจุดศูนย์กลางถ่วง' : 'Enter coordinates of vertices to view the calculated centroid and shape outline'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Article */}
      <article className="mt-12 prose prose-blue max-w-none text-gray-600 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
          {isTH ? 'จุดเซนทรอยด์ (Centroid) ของรูปสามเหลี่ยมคืออะไร?' : 'Understanding the Centroid of a Triangle'}
        </h2>
        <p className="mb-4">
          ในทางเรขาคณิต <strong>จุดเซนทรอยด์ (Centroid)</strong> หรือที่เรียกว่าจุดศูนย์กลางเรขาคณิต หรือจุดศูนย์กลางมวล (Center of Mass) สำหรับแผ่นสามเหลี่ยมระนาบแผ่นบางที่มีมวลสม่ำเสมอ คือจุดตัดของเส้นมัธยฐาน (Medians) ทั้งสามเส้นของรูปสามเหลี่ยมนั้นๆ จุดนี้มีความสำคัญทั้งในเชิงคณิตศาสตร์ ฟิสิกส์ และงานวิศวกรรมโครงสร้าง
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">คุณลักษณะของเส้นมัธยฐานและจุดเซนทรอยด์</h3>
        <p className="mb-4">
          เส้นมัธยฐาน (Median) คือเส้นตรงที่เชื่อมต่อระหว่างจุดยอดจุดหนึ่งของสามเหลี่ยมไปยังจุดกึ่งกลางของด้านตรงข้าม สามเหลี่ยมทุกรูปจะมีเส้นมัธยฐานทั้งหมด 3 เส้น และเส้นมัธยฐานทั้ง 3 เส้นนี้จะตัดกันที่จุดเดียวเสมอ ซึ่งจุดนั้นคือจุดเซนทรอยด์ (แทนด้วยตัวอักษร G)
        </p>
        <p className="mb-4">
          คุณสมบัติเด่นของจุดเซนทรอยด์ที่สำคัญคือ:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>อัตราส่วนการแบ่งเส้น:</strong> จุดเซนทรอยด์จะแบ่งความยาวของเส้นมัธยฐานออกเป็นอัตราส่วน 2:1 เสมอ โดยระยะทางจากจุดยอดไปยังจุดเซนทรอยด์จะเป็นสองเท่าของระยะทางจากจุดเซนทรอยด์ไปยังจุดกึ่งกลางด้านตรงข้าม
          </li>
          <li>
            <strong>จุดสมดุลฟิสิกส์:</strong> หากคุณมีรูปสามเหลี่ยมที่ทำจากวัสดุที่มีความหนาแน่นสม่ำเสมอ คุณจะสามารถใช้วัสดุปลายแหลมวางค้ำใต้จุดเซนทรอยด์เพื่อรักษาสมดุลของรูปสามเหลี่ยมนั้นให้อยู่บนระนาบขนานได้โดยไม่เอียงหล่น
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-850 mt-6 mb-2">สูตรการคำนวณพิกัดเซนทรอยด์</h3>
        <p className="mb-4">
          การคำนวณหาพิกัดจุดเซนทรอยด์บนระบบพิกัดคาร์ทีเซียนแบบ 2 มิติ ($x, y$) นั้นง่ายมาก โดยการหาค่าเฉลี่ยทางคณิตศาสตร์ (Arithmetic Mean) ของพิกัดจุดยอดทั้งสามจุดนั่นเอง:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4 text-center font-mono text-gray-800 border border-gray-150">
          Gx = (x₁ + x₂ + x₃) / 3 <br/>
          Gy = (y₁ + y₂ + y₃) / 3
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">ตัวอย่างการหาจุดเซนทรอยด์</h3>
        <p className="mb-4">
          สมมติให้พิกัดของรูปสามเหลี่ยมมีค่าดังต่อไปนี้:
          $A(2, 4)$, $B(6, 8)$, และ $C(10, 3)$
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>คำนวณพิกัด X:</strong> $x_g = (2 + 6 + 10) / 3 = 18 / 3 = 6$</li>
          <li><strong>คำนวณพิกัด Y:</strong> $y_g = (4 + 8 + 3) / 3 = 15 / 3 = 5$</li>
          <li>ดังนั้น พิกัดของเซนทรอยด์ $G$ คือ <strong>(6, 5)</strong></li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">การนำไปใช้งานในชีวิตจริง</h3>
        <p className="mb-4">
          จุดเซนทรอยด์มีบทบาทสำคัญในการออกแบบและวิศวกรรม เช่น การคำนวณหาจุดศูนย์กลางในการรับแรงดันของอาคาร การหาจุดถ่วงน้ำหนักของพาหนะและเรือขนส่งสินค้าเพื่อป้องกันการพลิกคว่ำ ตลอดจนในระบบสารสนเทศภูมิศาสตร์ (GIS) เพื่อคำนวณหาจุดศูนย์กลางของพื้นที่จังหวัดหรือประเทศในการวางจุดยุทธศาสตร์จัดส่งสินค้า
        </p>
      </article>
    </div>
  );
}
