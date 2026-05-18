"use client";

import { Lang } from "./dictionary";
import { BMICalculator, SleepCalculator, TDEECalculator, WaterCalculator as HealthWaterCalculator, FoodRandomizer } from "./calcs/HealthCalcs";
import { ExerciseCaloriesCalculator, ProteinCalculator, BodyFatCalculator, WHRCalculator, HeartRateZoneCalculator, MacroCalculator, BloodSugarConverter, IBWCalculator, StepsCalculator, OneRepMaxCalculator, PaceCalculator } from "./calcs/HealthCalcs2";
import { ChildHeightCalculator } from "./calcs/FamilyCalcs";
import { PregnancyDueCalculator, OvulationCalculator, BloodTypePredictor, ZodiacCalculator, PetAgeCalculator, FetalWeightCalculator, ChildCostCalculator, ChildMilestoneCalculator } from "./calcs/FamilyCalcs2";
import { TimeZoneConverter, TravelBudgetCalculator, FlightTimeCalculator, PackingListGenerator, RoadTripCostCalculator, BaggageWeightChecker } from "./calcs/TravelCalcs";
import { DiscountCalculator, CarLoanCalculator, MortgageCalculator, CompoundInterest, BillSplitter, CurrencyConverter } from "./calcs/FinanceCalcs";
import { SavingsGoalCalculator, InflationCalculator, SalaryToHourlyCalculator, NetWorthCalculator, DebtPayoffCalculator, RetirementCalculator, StockProfitCalculator, ROICalculator } from "./calcs/FinanceCalcs2";
import { DCACalculator, StockFeeCalculator, NetSalaryCalculator, ExpenseTrackerCalculator } from "./calcs/FinanceCalcs3";
import { VatCalculator, MarginCalculator } from "./calcs/BusinessCalcs";
import { BreakEvenCalculator, MarkupCalculator, DepreciationCalculator, PayrollCalculator, COGSCalculator, LTVCalculator, CACCalculator, ConversionRateCalculator, InventoryTurnoverCalculator } from "./calcs/BusinessCalcs2";
import { FinancialRatioCalculator, MarketplaceFeeCalculator, SafetyStockCalculator, ShippingCostCalculator, ReturnRateCalculator } from "./calcs/BusinessCalcs3";
import { BTUCalculator, ElectricCalculator, WaterCalculator as UtilityWaterCalculator, BaseNCalculator, GPACalculator, FuelCostCalculator } from "./calcs/UtilityCalcs";
import { GradeConverter, TargetGPACalculator, PercentileCalculator, ReadingTimeCalculator } from "./calcs/UtilityCalcs2";
import { RandomizerCalculator, WordCounter, AgeCalculator } from "./calcs/GeneralCalcs";
import { CookingUnitConverter, TileAreaCalculator } from "./calcs/ConversionCalcs";
import { DigitalUnitConverter, AngleConverter, ColorConverter, TemperatureConverter, SpeedConverter, AreaUnitConverter, WeightUnitConverter, RomanNumeralConverter, AreaShapeCalculator, VolumeShapeCalculator, WorkingDaysCalculator } from "./calcs/ConversionCalcs2";
import { PantoneConverter } from "./calcs/ConversionCalcs3";
import { FermentationTimeCalculator, FoodEnergyCalculator, FertilizerCalculator, IrrigationCalculator, YieldCalculator } from "./calcs/AgricultureCalcs";
import { HousePaintCalculator, CementCalculator, WallpaperCalculator, RoofAreaCalculator, WaterTankCalculator, PoolVolumeCalculator, InsulationCalculator, RenovationCostCalculator } from "./calcs/ConstructionCalcs";
import { BandwidthCalculator, ServerCostCalculator, ImageSizeCalculator, IPSubnetCalculator, VideoBitrateCalculator, BatteryLifeCalculator, HashRateCalculator } from "./calcs/TechnologyCalcs";
import { DurianCalculator } from "./calcs/AgricultureCalcs2";
import { LotteryChecker } from "./calcs/UtilityCalcs3";
import { HoroscopeCalculator } from "./calcs/FamilyCalcs3";
import { TarotReadingCalculator } from "./calcs/TarotCalcs";
import { LenormandCalculator, OracleCalculator, PlayingCardCalculator, KipperCalculator } from "./calcs/CardReadingCalcs";

export function Calculators({ activeCalc, lang, setCalc }: { activeCalc: string, lang: Lang, setCalc: (id: string) => void }) {
  // Health & Diet
  if (activeCalc === "bmi") return <BMICalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "sleep") return <SleepCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "tdee") return <TDEECalculator lang={lang} />;
  if (activeCalc === "water-intake") return <HealthWaterCalculator lang={lang} />;
  if (activeCalc === "food-random") return <FoodRandomizer lang={lang} />;
  if (activeCalc === "exercise-calories") return <ExerciseCaloriesCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "protein-daily") return <ProteinCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "body-fat") return <BodyFatCalculator lang={lang} />;
  if (activeCalc === "whr") return <WHRCalculator lang={lang} />;
  if (activeCalc === "heart-rate-zone") return <HeartRateZoneCalculator lang={lang} />;
  if (activeCalc === "macro") return <MacroCalculator lang={lang} />;
  if (activeCalc === "blood-sugar") return <BloodSugarConverter lang={lang} />;
  if (activeCalc === "ibw") return <IBWCalculator lang={lang} />;
  if (activeCalc === "steps-converter") return <StepsCalculator lang={lang} />;
  if (activeCalc === "1rm") return <OneRepMaxCalculator lang={lang} />;
  if (activeCalc === "pace") return <PaceCalculator lang={lang} />;

  // Family
  if (activeCalc === "child-height") return <ChildHeightCalculator lang={lang} />;
  if (activeCalc === "pregnancy-due") return <PregnancyDueCalculator lang={lang} />;
  if (activeCalc === "ovulation") return <OvulationCalculator lang={lang} />;
  if (activeCalc === "blood-type") return <BloodTypePredictor lang={lang} />;
  if (activeCalc === "zodiac") return <ZodiacCalculator lang={lang} />;
  if (activeCalc === "pet-age") return <PetAgeCalculator lang={lang} />;
  if (activeCalc === "fetal-weight") return <FetalWeightCalculator lang={lang} />;
  if (activeCalc === "child-cost") return <ChildCostCalculator lang={lang} />;
  if (activeCalc === "child-milestone") return <ChildMilestoneCalculator lang={lang} />;
  if (activeCalc === "horoscope") return <HoroscopeCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "tarot") return <TarotReadingCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "lenormand") return <LenormandCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "oracle") return <OracleCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "playing-card") return <PlayingCardCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "kipper") return <KipperCalculator lang={lang} setCalc={setCalc} />;
  
  // Travel
  if (activeCalc === "time-zone") return <TimeZoneConverter lang={lang} />;
  if (activeCalc === "travel-budget") return <TravelBudgetCalculator lang={lang} />;
  if (activeCalc === "flight-time") return <FlightTimeCalculator lang={lang} />;
  if (activeCalc === "packing-list") return <PackingListGenerator lang={lang} />;
  if (activeCalc === "road-trip") return <RoadTripCostCalculator lang={lang} />;
  if (activeCalc === "baggage-weight") return <BaggageWeightChecker lang={lang} />;

  // Finance
  if (activeCalc === "discount") return <DiscountCalculator lang={lang} />;
  if (activeCalc === "car-loan") return <CarLoanCalculator lang={lang} />;
  if (activeCalc === "mortgage") return <MortgageCalculator lang={lang} />;
  if (activeCalc === "compound-interest") return <CompoundInterest lang={lang} />;
  if (activeCalc === "bill-splitter") return <BillSplitter lang={lang} />;
  if (activeCalc === "currency-converter") return <CurrencyConverter lang={lang} />;
  if (activeCalc === "savings-goal") return <SavingsGoalCalculator lang={lang} />;
  if (activeCalc === "inflation") return <InflationCalculator lang={lang} />;
  if (activeCalc === "salary-hourly") return <SalaryToHourlyCalculator lang={lang} />;
  if (activeCalc === "net-worth") return <NetWorthCalculator lang={lang} />;
  if (activeCalc === "debt-payoff") return <DebtPayoffCalculator lang={lang} />;
  if (activeCalc === "retirement") return <RetirementCalculator lang={lang} />;
  if (activeCalc === "stock-profit") return <StockProfitCalculator lang={lang} />;
  if (activeCalc === "roi") return <ROICalculator lang={lang} />;
  if (activeCalc === "dca") return <DCACalculator lang={lang} />;
  if (activeCalc === "stock-fee") return <StockFeeCalculator lang={lang} />;
  if (activeCalc === "net-salary") return <NetSalaryCalculator lang={lang} />;
  if (activeCalc === "expense-tracker") return <ExpenseTrackerCalculator lang={lang} />;

  // Business
  if (activeCalc === "vat") return <VatCalculator lang={lang} />;
  if (activeCalc === "margin") return <MarginCalculator lang={lang} />;
  if (activeCalc === "break-even") return <BreakEvenCalculator lang={lang} />;
  if (activeCalc === "markup") return <MarkupCalculator lang={lang} />;
  if (activeCalc === "depreciation") return <DepreciationCalculator lang={lang} />;
  if (activeCalc === "payroll") return <PayrollCalculator lang={lang} />;
  if (activeCalc === "cogs") return <COGSCalculator lang={lang} />;
  if (activeCalc === "ltv") return <LTVCalculator lang={lang} />;
  if (activeCalc === "cac") return <CACCalculator lang={lang} />;
  if (activeCalc === "conversion-rate") return <ConversionRateCalculator lang={lang} />;
  if (activeCalc === "inventory-turnover") return <InventoryTurnoverCalculator lang={lang} />;
  if (activeCalc === "financial-ratio") return <FinancialRatioCalculator lang={lang} />;
  if (activeCalc === "marketplace-fee") return <MarketplaceFeeCalculator lang={lang} />;
  if (activeCalc === "safety-stock") return <SafetyStockCalculator lang={lang} />;
  if (activeCalc === "shipping-cost") return <ShippingCostCalculator lang={lang} />;
  if (activeCalc === "return-rate") return <ReturnRateCalculator lang={lang} />;

  // Utility
  if (activeCalc === "btu") return <BTUCalculator lang={lang} />;
  if (activeCalc === "electric") return <ElectricCalculator lang={lang} />;
  if (activeCalc === "water-bill") return <UtilityWaterCalculator lang={lang} />;
  if (activeCalc === "basen") return <BaseNCalculator lang={lang} />;
  if (activeCalc === "gpa") return <GPACalculator lang={lang} />;
  if (activeCalc === "fuel-cost") return <FuelCostCalculator lang={lang} />;
  if (activeCalc === "grade-converter") return <GradeConverter lang={lang} />;
  if (activeCalc === "target-gpa") return <TargetGPACalculator lang={lang} />;
  if (activeCalc === "percentile") return <PercentileCalculator lang={lang} />;
  if (activeCalc === "reading-time") return <ReadingTimeCalculator lang={lang} />;
  if (activeCalc === "lottery") return <LotteryChecker lang={lang} setCalc={setCalc} />;

  // Conversion
  if (activeCalc === "cooking-unit") return <CookingUnitConverter lang={lang} />;
  if (activeCalc === "tile-area") return <TileAreaCalculator lang={lang} />;
  if (activeCalc === "digital-unit") return <DigitalUnitConverter lang={lang} />;
  if (activeCalc === "angle") return <AngleConverter lang={lang} />;
  if (activeCalc === "color") return <ColorConverter lang={lang} />;
  if (activeCalc === "temperature") return <TemperatureConverter lang={lang} />;
  if (activeCalc === "speed") return <SpeedConverter lang={lang} />;
  if (activeCalc === "area-unit") return <AreaUnitConverter lang={lang} />;
  if (activeCalc === "weight-unit") return <WeightUnitConverter lang={lang} />;
  if (activeCalc === "roman") return <RomanNumeralConverter lang={lang} />;
  if (activeCalc === "area-shape") return <AreaShapeCalculator lang={lang} />;
  if (activeCalc === "volume-shape") return <VolumeShapeCalculator lang={lang} />;
  if (activeCalc === "working-days") return <WorkingDaysCalculator lang={lang} />;
  if (activeCalc === "pantone") return <PantoneConverter lang={lang} />;

  // Agriculture
  if (activeCalc === "ferm-time") return <FermentationTimeCalculator lang={lang} />;
  if (activeCalc === "food-energy") return <FoodEnergyCalculator lang={lang} />;
  if (activeCalc === "fertilizer") return <FertilizerCalculator lang={lang} />;
  if (activeCalc === "irrigation") return <IrrigationCalculator lang={lang} />;
  if (activeCalc === "yield") return <YieldCalculator lang={lang} />;
  if (activeCalc === "durian") return <DurianCalculator lang={lang} setCalc={setCalc} />;

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
  
  // Technology
  if (activeCalc === "bandwidth") return <BandwidthCalculator lang={lang} />;
  if (activeCalc === "server-cost") return <ServerCostCalculator lang={lang} />;
  if (activeCalc === "image-size") return <ImageSizeCalculator lang={lang} />;
  if (activeCalc === "ip-subnet") return <IPSubnetCalculator lang={lang} />;
  if (activeCalc === "video-bitrate") return <VideoBitrateCalculator lang={lang} />;
  if (activeCalc === "battery-life") return <BatteryLifeCalculator lang={lang} />;
  if (activeCalc === "hash-rate") return <HashRateCalculator lang={lang} />;

  return (
    <div className="text-center p-12 text-gray-500">
      {lang === "TH" ? "กรุณาเลือกเครื่องมือคำนวณจากเมนูด้านซ้าย" : "Please select a calculator from the menu"}
    </div>
  );
}
