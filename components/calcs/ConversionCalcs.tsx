import { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { useLocalState, inputClass, labelClass, SEOFAQ, FAQItem, CalculationSteps, ExportResult, RelatedCalcs } from "./shared";
import { motion } from "framer-motion";

export function CookingUnitConverter({ lang }: { lang: Lang }) {
  const [cups, setCups] = useState<number>(1);
  const [ingredient, setIngredient] = useState<string>("flour");

  // Densities (grams per cup)
  const densities: Record<string, number> = {
    flour: 120, // All-purpose flour
    sugar: 200, // Granulated sugar
    brownSugar: 220, // Packed brown sugar
    butter: 227, // Butter
    cocoa: 100, // Cocoa powder
    milk: 240, // Milk / Water
    honey: 340, // Honey
  };

  const ingredientsList = [
    { id: "flour", th: "แป้งอเนกประสงค์", en: "All-Purpose Flour" },
    { id: "sugar", th: "น้ำตาลทราย", en: "Granulated Sugar" },
    { id: "brownSugar", th: "น้ำตาลทรายแดง", en: "Brown Sugar" },
    { id: "butter", th: "เนย", en: "Butter" },
    { id: "cocoa", th: "ผงโกโก้", en: "Cocoa Powder" },
    { id: "milk", th: "นม/น้ำ", en: "Milk / Water" },
    { id: "honey", th: "น้ำผึ้ง", en: "Honey" },
  ];

  const grams = cups * (densities[ingredient] || 120);
  const ounces = grams / 28.3495;
  const tablespoons = cups * 16;
  const milliliters = cups * 240;

  const currentIngredientName = ingredientsList.find(i => i.id === ingredient)?.[lang.toLowerCase() as "th"|"en"] || "";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "แปลงหน่วยทำอาหาร (ถ้วยตวง ↔ กรัม)" : "Cooking Unit Converter"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{lang === "TH" ? "จำนวนถ้วยตวง (Cups)" : "Number of Cups"}</label>
          <input 
            type="number" 
            min="0" step="0.25"
            value={cups || ""} 
            onChange={(e) => setCups(parseFloat(e.target.value) || 0)} 
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{lang === "TH" ? "ประเภทวัตถุดิบ" : "Ingredient Type"}</label>
          <select 
            value={ingredient} 
            onChange={(e) => setIngredient(e.target.value)}
            className={inputClass}
          >
            {ingredientsList.map(item => (
              <option key={item.id} value={item.id}>{item[lang.toLowerCase() as "th"|"en"]}</option>
            ))}
          </select>
        </div>
      </div>

      {cups > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="cooking-result">
          <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-500/30 p-6 rounded-2xl text-center shadow-neo">
            <h3 className="text-sm font-bold text-purple-800 dark:text-purple-300 mb-2 uppercase tracking-wide">
              {lang === "TH" ? "ผลลัพธ์การแปลงหน่วย" : "Conversion Result"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 font-bold text-lg">
              {cups} Cups of {currentIngredientName}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-purple-100 dark:border-purple-500/20">
                <p className="text-4xl font-black text-purple-600 dark:text-purple-400">{grams.toFixed(0)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">{lang === "TH" ? "กรัม (g)" : "Grams (g)"}</p>
              </div>
              <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-purple-100 dark:border-purple-500/20">
                <p className="text-4xl font-black text-purple-600 dark:text-purple-400">{ounces.toFixed(1)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">{lang === "TH" ? "ออนซ์ (oz)" : "Ounces (oz)"}</p>
              </div>
              <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-purple-100 dark:border-purple-500/20">
                <p className="text-2xl font-black text-purple-500 dark:text-purple-400">{tablespoons.toFixed(0)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">{lang === "TH" ? "ช้อนโต๊ะ (tbsp)" : "Tablespoons"}</p>
              </div>
              <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-purple-100 dark:border-purple-500/20">
                <p className="text-2xl font-black text-purple-500 dark:text-purple-400">{milliliters.toFixed(0)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">{lang === "TH" ? "มิลลิลิตร (ml)" : "Milliliters (ml)"}</p>
              </div>
            </div>
          </div>

          <CalculationSteps 
            title={lang === "TH" ? "วิธีคำนวณ" : "How it works"}
            steps={
              <ul className="list-disc list-inside">
                <li>{lang === "TH" ? "วัตถุดิบมีความหนาแน่นต่างกัน 1 ถ้วยตวงจึงหนักไม่เท่ากัน" : "Different ingredients have different densities."}</li>
                <li>{lang === "TH" ? `ความหนาแน่นของ ${currentIngredientName} คือ ${densities[ingredient]} กรัม/ถ้วยตวง` : `Density of ${currentIngredientName} is ${densities[ingredient]} g/cup.`}</li>
                <li>{lang === "TH" ? `คำนวณกรัม: ${cups} × ${densities[ingredient]} = ${grams.toFixed(0)} กรัม` : `Grams: ${cups} × ${densities[ingredient]} = ${grams.toFixed(0)} g`}</li>
                <li>{lang === "TH" ? `คำนวณออนซ์: ${grams.toFixed(0)} ÷ 28.35 = ${ounces.toFixed(1)} ออนซ์` : `Ounces: ${grams.toFixed(0)} ÷ 28.35 = ${ounces.toFixed(1)} oz`}</li>
              </ul>
            }
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (แปลงหน่วยทำอาหาร)" : "Cooking Unit Converter FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไม 1 ถ้วยตวงถึงหนักไม่เท่ากัน?" : "Why doesn't 1 cup always weigh the same?"}
          a={lang === "TH" ? "เพราะความหนาแน่นของวัตถุดิบแต่ละชนิดต่างกัน เช่น เนย 1 ถ้วยตวงจะหนักกว่าแป้ง 1 ถ้วยตวงถึงเกือบเท่าตัว เนื่องจากเนยมีความหนาแน่นสูงกว่าและไม่มีช่องว่างของอากาศมากเท่าแป้ง" : "Because ingredients have different densities. A cup of butter weighs much more than a cup of flour because it's denser and has less air."}
        />
        <FAQItem 
          q={lang === "TH" ? "1 ถ้วยตวง เท่ากับกี่กรัม?" : "How many grams in 1 cup?"}
          a={lang === "TH" ? "ขึ้นอยู่กับวัตถุดิบ เช่น แป้งอเนกประสงค์ = 120 กรัม, น้ำตาลทราย = 200 กรัม, เนย = 227 กรัม, น้ำ/นม = 240 กรัม" : "It depends on the ingredient. All-purpose flour = 120g, Granulated sugar = 200g, Butter = 227g, Water/Milk = 240g."}
        />
        <FAQItem 
          q={lang === "TH" ? "ช้อนโต๊ะ กับ ถ้วยตวง แปลงยังไง?" : "How to convert tablespoons to cups?"}
          a={lang === "TH" ? "สูตรมาตรฐานคือ 16 ช้อนโต๊ะ (Tablespoons) จะเท่ากับ 1 ถ้วยตวง (Cup) พอดี ไม่ว่าจะเป็นวัตถุดิบอะไรก็ตาม เพราะเป็นการวัดปริมาตรเหมือนกัน" : "The standard formula is 16 tablespoons equals exactly 1 cup, regardless of the ingredient, because both measure volume."}
        />
      </SEOFAQ>
    </div>
  );
}

export function TileAreaCalculator({ lang }: { lang: Lang }) {
  const [width, setWidth] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [tileSize, setTileSize] = useState<string>("60x60");
  const [wastePercent, setWastePercent] = useState<number>(5);

  const tiles = [
    { id: "20x20", name: "20 x 20 cm (8x8 inch)", areaSqM: 0.04, inBox: 25 },
    { id: "30x30", name: "30 x 30 cm (12x12 inch)", areaSqM: 0.09, inBox: 11 },
    { id: "40x40", name: "40 x 40 cm (16x16 inch)", areaSqM: 0.16, inBox: 6 },
    { id: "60x60", name: "60 x 60 cm (24x24 inch)", areaSqM: 0.36, inBox: 4 },
    { id: "80x80", name: "80 x 80 cm (32x32 inch)", areaSqM: 0.64, inBox: 3 },
    { id: "60x120", name: "60 x 120 cm (24x48 inch)", areaSqM: 0.72, inBox: 2 },
  ];

  const area = width * length;
  const selectedTile = tiles.find(t => t.id === tileSize) || tiles[3];
  
  const exactTiles = area / selectedTile.areaSqM;
  const tilesWithWaste = exactTiles * (1 + (wastePercent / 100));
  const roundedTiles = Math.ceil(tilesWithWaste);
  const boxes = Math.ceil(roundedTiles / selectedTile.inBox);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white text-center">
        {lang === "TH" ? "คำนวณพื้นที่ปูกระเบื้อง" : "Tile Area Calculator"}
      </h2>
      
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4">{lang === "TH" ? "1. ขนาดพื้นที่ (เมตร)" : "1. Room Size (Meters)"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ความกว้าง (m)" : "Width (m)"}</label>
            <input type="number" min="0" step="0.1" value={width || ""} onChange={e => setWidth(parseFloat(e.target.value) || 0)} className={inputClass} placeholder="เช่น 4" />
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "ความยาว (m)" : "Length (m)"}</label>
            <input type="number" min="0" step="0.1" value={length || ""} onChange={e => setLength(parseFloat(e.target.value) || 0)} className={inputClass} placeholder="เช่น 5" />
          </div>
        </div>
        {area > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center text-blue-800 dark:text-blue-300 font-bold">
            {lang === "TH" ? `พื้นที่รวม: ${area.toFixed(2)} ตารางเมตร` : `Total Area: ${area.toFixed(2)} sq.m`}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4">{lang === "TH" ? "2. เลือกกระเบื้องและการเผื่อ" : "2. Tile Size & Waste"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{lang === "TH" ? "ขนาดกระเบื้อง" : "Tile Size"}</label>
            <select value={tileSize} onChange={e => setTileSize(e.target.value)} className={inputClass}>
              {tiles.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{lang === "TH" ? "เผื่อความเสียหาย (Waste %)" : "Waste Percentage"}</label>
            <select value={wastePercent} onChange={e => setWastePercent(parseFloat(e.target.value))} className={inputClass}>
              <option value="0">0% ({lang==="TH"?"ไม่เผื่อเลย":"No waste"})</option>
              <option value="5">5% ({lang==="TH"?"ห้องสี่เหลี่ยมปกติ":"Standard Room"})</option>
              <option value="10">10% ({lang==="TH"?"ห้องมีมุม/เสาเยอะ":"Complex Room"})</option>
              <option value="15">15% ({lang==="TH"?"ปูแนวทแยง":"Diagonal Laying"})</option>
            </select>
          </div>
        </div>
      </div>

      {area > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="tile-result">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-500/30 p-6 rounded-2xl text-center shadow-neo">
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 uppercase tracking-wide">
              {lang === "TH" ? "จำนวนกระเบื้องที่ต้องใช้" : "Required Tiles"}
            </h3>
            
            <div className="flex flex-col items-center gap-4">
              <div>
                <p className="text-5xl font-black text-blue-600 dark:text-blue-400">{roundedTiles}</p>
                <p className="text-gray-600 dark:text-gray-400 font-bold">{lang === "TH" ? "แผ่น (รวมเผื่อแล้ว)" : "Tiles (waste included)"}</p>
              </div>
              <div className="w-full h-px bg-blue-200 dark:bg-blue-500/30 my-2"></div>
              <div className="w-full flex justify-between px-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                <span>{lang === "TH" ? "ซื้อเป็นกล่อง:" : "Buy in Boxes:"}</span>
                <span className="text-xl text-blue-600 dark:text-blue-400">{boxes} {lang === "TH" ? "กล่อง" : "Boxes"}</span>
              </div>
              <p className="text-xs text-gray-500 text-right w-full">
                *1 {lang==="TH"?"กล่อง":"box"} = {selectedTile.inBox} {lang==="TH"?"แผ่น":"tiles"}
              </p>
            </div>
          </div>

          <CalculationSteps 
            title={lang === "TH" ? "วิธีคำนวณ" : "How it works"}
            steps={
              <ul className="list-disc list-inside">
                <li>{lang === "TH" ? `พื้นที่รวม: ${width} × ${length} = ${area.toFixed(2)} ตร.ม.` : `Area: ${width} × ${length} = ${area.toFixed(2)} sq.m`}</li>
                <li>{lang === "TH" ? `กระเบื้อง 1 แผ่น (${tileSize}) มีพื้นที่ = ${selectedTile.areaSqM} ตร.ม.` : `1 Tile area = ${selectedTile.areaSqM} sq.m`}</li>
                <li>{lang === "TH" ? `จำนวนแผ่นพอดี: ${area.toFixed(2)} ÷ ${selectedTile.areaSqM} = ${exactTiles.toFixed(1)} แผ่น` : `Exact tiles: ${area.toFixed(2)} ÷ ${selectedTile.areaSqM} = ${exactTiles.toFixed(1)} tiles`}</li>
                <li>{lang === "TH" ? `เผื่อความเสียหาย ${wastePercent}%: ${(exactTiles * (wastePercent/100)).toFixed(1)} แผ่น` : `Waste ${wastePercent}%: ${(exactTiles * (wastePercent/100)).toFixed(1)} tiles`}</li>
                <li>{lang === "TH" ? `รวมทั้งหมดที่ต้องซื้อ: ${roundedTiles} แผ่น` : `Total required: ${roundedTiles} tiles`}</li>
              </ul>
            }
          />
        </motion.div>
      )}

      <SEOFAQ title={lang === "TH" ? "คำถามที่พบบ่อย (ปูกระเบื้อง)" : "Tile Calculator FAQ"}>
        <FAQItem 
          q={lang === "TH" ? "ทำไมต้องเผื่อกระเบื้อง 5-10%?" : "Why add 5-10% tile waste?"}
          a={lang === "TH" ? "ในการปูกระเบื้อง มักจะมีการตัดเศษบริเวณขอบห้อง เข้ามุม หรือตัดหลบเสา ทำให้กระเบื้องบางส่วนเสียไป รวมถึงป้องกันกระเบื้องแตกหักระหว่างขนส่ง หากไม่เผื่อไว้ กระเบื้องอาจจะไม่พอ และถ้าไปซื้อลอตใหม่ สีอาจจะเพี้ยนจากเดิม (Shade variation)" : "Tile installation requires cutting around corners, edges, and obstacles. Tiles can also break during transit. Adding waste ensures you have enough from the same color batch."}
        />
        <FAQItem 
          q={lang === "TH" ? "ถ้าปูแนวทแยง ต้องเผื่อกี่เปอร์เซ็นต์?" : "How much waste for diagonal laying?"}
          a={lang === "TH" ? "การปูแนวทแยง (Diagonal หรือ Diamond pattern) จะมีการตัดมุมขอบห้องเยอะกว่าปกติ ควรเผื่อความเสียหายอย่างน้อย 15% เพื่อความปลอดภัย" : "Diagonal patterns require more cutting at the edges. You should allow at least 15% waste."}
        />
      </SEOFAQ>
    </div>
  );
}
