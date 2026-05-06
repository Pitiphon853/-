"use client";

import { Lang } from "./dictionary";
import { BMICalculator, SleepCalculator, TDEECalculator, WaterCalculator as HealthWaterCalculator, FoodRandomizer } from "./calcs/HealthCalcs";
import { ChildHeightCalculator } from "./calcs/FamilyCalcs";
import { DiscountCalculator, CarLoanCalculator, MortgageCalculator, CompoundInterest, BillSplitter, CurrencyConverter } from "./calcs/FinanceCalcs";
import { VatCalculator, MarginCalculator } from "./calcs/BusinessCalcs";
import { BTUCalculator, ElectricCalculator, WaterCalculator as UtilityWaterCalculator, BaseNCalculator, GPACalculator, FuelCostCalculator } from "./calcs/UtilityCalcs";
import { RandomizerCalculator, WordCounter, AgeCalculator } from "./calcs/GeneralCalcs";
import { CookingUnitConverter, TileAreaCalculator } from "./calcs/ConversionCalcs";
import { FermentationTimeCalculator, FoodEnergyCalculator, FertilizerCalculator, IrrigationCalculator, YieldCalculator } from "./calcs/AgricultureCalcs";
import { HousePaintCalculator, CementCalculator, WallpaperCalculator, RoofAreaCalculator, WaterTankCalculator, PoolVolumeCalculator, InsulationCalculator, RenovationCostCalculator } from "./calcs/ConstructionCalcs";

export function Calculators({ activeCalc, lang, setCalc }: { activeCalc: string, lang: Lang, setCalc: (id: string) => void }) {
  // Health & Diet
  if (activeCalc === "bmi") return <BMICalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "sleep") return <SleepCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "tdee") return <TDEECalculator lang={lang} />;
  if (activeCalc === "water-intake") return <HealthWaterCalculator lang={lang} />;
  if (activeCalc === "food-random") return <FoodRandomizer lang={lang} />;

  // Family
  if (activeCalc === "child-height") return <ChildHeightCalculator lang={lang} />;

  // Finance
  if (activeCalc === "discount") return <DiscountCalculator lang={lang} />;
  if (activeCalc === "car-loan") return <CarLoanCalculator lang={lang} />;
  if (activeCalc === "mortgage") return <MortgageCalculator lang={lang} />;
  if (activeCalc === "compound-interest") return <CompoundInterest lang={lang} />;
  if (activeCalc === "bill-splitter") return <BillSplitter lang={lang} />;
  if (activeCalc === "currency-converter") return <CurrencyConverter lang={lang} />;

  // Business
  if (activeCalc === "vat") return <VatCalculator lang={lang} />;
  if (activeCalc === "margin") return <MarginCalculator lang={lang} />;

  // Utility
  if (activeCalc === "btu") return <BTUCalculator lang={lang} />;
  if (activeCalc === "electric") return <ElectricCalculator lang={lang} />;
  if (activeCalc === "water-bill") return <UtilityWaterCalculator lang={lang} />;
  if (activeCalc === "basen") return <BaseNCalculator lang={lang} />;
  if (activeCalc === "gpa") return <GPACalculator lang={lang} />;
  if (activeCalc === "fuel-cost") return <FuelCostCalculator lang={lang} />;
  if (activeCalc === "cooking-unit") return <CookingUnitConverter lang={lang} />;
  if (activeCalc === "tile-area") return <TileAreaCalculator lang={lang} />;

  // Agriculture
  if (activeCalc === "ferm-time") return <FermentationTimeCalculator lang={lang} />;
  if (activeCalc === "food-energy") return <FoodEnergyCalculator lang={lang} />;
  if (activeCalc === "fertilizer") return <FertilizerCalculator lang={lang} />;
  if (activeCalc === "irrigation") return <IrrigationCalculator lang={lang} />;
  if (activeCalc === "yield") return <YieldCalculator lang={lang} />;

  // Construction
  if (activeCalc === "house-paint") return <HousePaintCalculator lang={lang} />;
  if (activeCalc === "cement") return <CementCalculator lang={lang} />;
  if (activeCalc === "wallpaper") return <WallpaperCalculator lang={lang} />;
  if (activeCalc === "roof-area") return <RoofAreaCalculator lang={lang} />;
  if (activeCalc === "water-tank") return <WaterTankCalculator lang={lang} />;
  if (activeCalc === "pool-vol") return <PoolVolumeCalculator lang={lang} />;
  if (activeCalc === "insulation") return <InsulationCalculator lang={lang} />;
  if (activeCalc === "reno-cost") return <RenovationCostCalculator lang={lang} />;

  // General
  if (activeCalc === "randomizer") return <RandomizerCalculator lang={lang} />;
  if (activeCalc === "word-counter") return <WordCounter lang={lang} />;
  if (activeCalc === "age") return <AgeCalculator lang={lang} />;

  return (
    <div className="text-center p-12 text-gray-500">
      {lang === "TH" ? "กรุณาเลือกเครื่องมือคำนวณจากเมนูด้านซ้าย" : "Please select a calculator from the menu"}
    </div>
  );
}
