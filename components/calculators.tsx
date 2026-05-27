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
import { GoldPriceCalculator } from "./calcs/GoldCalcs";
import { VO2MaxCalculator, SwimPaceCalculator, CyclingPowerZones } from "./calcs/ExerciseCalcs";
import { RacePredictor, LiftingPyramid, RowingSplit, CarbEnduranceCalc } from "./calcs/ExerciseCalcs2";
import { FiberCalculator, VitaminDCalculator, BMIKidsCalculator } from "./calcs/HealthCalcs3";
import { WeddingBudget, NewbornCost, PetCost, FoodExpiration, RentVsBuyCalc } from "./calcs/FamilyCalcs4";
import { EOQCalculator, ChurnRetentionCalc, ShrinkageCalc, ImportMarkupCalc, FreelanceRate } from "./calcs/BusinessCalcs4";
import { EnglishTestConverter, PomodoroTimer, FlashCardTimer } from "./calcs/EducationCalcs";
import { VatCalculator, MarginCalculator } from "./calcs/BusinessCalcs";
import { BreakEvenCalculator, MarkupCalculator, DepreciationCalculator, PayrollCalculator, COGSCalculator, LTVCalculator, CACCalculator, ConversionRateCalculator, InventoryTurnoverCalculator } from "./calcs/BusinessCalcs2";
import { FinancialRatioCalculator, MarketplaceFeeCalculator, SafetyStockCalculator, ShippingCostCalculator, ReturnRateCalculator } from "./calcs/BusinessCalcs3";
import { BTUCalculator, ElectricCalculator, WaterCalculator as UtilityWaterCalculator, BaseNCalculator, GPACalculator, FuelCostCalculator } from "./calcs/UtilityCalcs";
import { GradeConverter, TargetGPACalculator, PercentileCalculator, ReadingTimeCalculator } from "./calcs/UtilityCalcs2";
import { WordCounter, AgeCalculator } from "./calcs/GeneralCalcs";
import { CookingUnitConverter, TileAreaCalculator } from "./calcs/ConversionCalcs";
import { DigitalUnitConverter, AngleConverter, ColorConverter, TemperatureConverter, SpeedConverter, AreaUnitConverter, WeightUnitConverter, RomanNumeralConverter, AreaShapeCalculator, VolumeShapeCalculator, WorkingDaysCalculator } from "./calcs/ConversionCalcs2";
import { PantoneConverter } from "./calcs/ConversionCalcs3";
import { FoodEnergyCalculator, FertilizerCalculator, IrrigationCalculator, YieldCalculator } from "./calcs/AgricultureCalcs";
import { HousePaintCalculator, CementCalculator, WallpaperCalculator, RoofAreaCalculator, WaterTankCalculator, PoolVolumeCalculator, InsulationCalculator, RenovationCostCalculator } from "./calcs/ConstructionCalcs";
import { BandwidthCalculator, ServerCostCalculator, ImageSizeCalculator, IPSubnetCalculator, VideoBitrateCalculator, BatteryLifeCalculator, HashRateCalculator } from "./calcs/TechnologyCalcs";
import { RaidCalculator, PpiCalculator, ApiCostCalculator, UpsRuntimeCalculator, MorseCodeConverter, AsciiConverter, CacheHitRateCalculator } from "./calcs/TechnologyCalcs2";
import { DurianCalculator } from "./calcs/AgricultureCalcs2";
import { SoilPhCalculator, LivestockProfitCalculator, SprayVolumeCalculator, FisheryIncomeCalculator, YieldGapCalculator } from "./calcs/AgricultureCalcs3";
import { JetLagCalculator, RoamingCostCalculator } from "./calcs/TravelCalcs2";
import { SolarPanelCalculator, InteriorCostCalculator, AchVentilationCalculator, ConcreteVolumeCalculator, RebarWeightCalculator, AacBlocksCalculator, LaborCostCalculator, PlumbingPipeCalculator, SlopeGradeCalculator } from "./calcs/ConstructionCalcs2";
import { CarbonFootprintCalculator, WindEnergyCalculator, WaterSavingsCalculator, PlasticFootprintCalculator } from "./calcs/EnvironmentCalcs";
import { QuadraticCalculator, PHCalculator } from "./calcs/ScienceCalcs";

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
  if (activeCalc === "vo2-max") return <VO2MaxCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "swim-pace") return <SwimPaceCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "cycling-power") return <CyclingPowerZones lang={lang} setCalc={setCalc} />;
  if (activeCalc === "race-predictor") return <RacePredictor lang={lang} setCalc={setCalc} />;
  if (activeCalc === "lifting-pyramid") return <LiftingPyramid lang={lang} setCalc={setCalc} />;
  if (activeCalc === "rowing-split") return <RowingSplit lang={lang} setCalc={setCalc} />;
  if (activeCalc === "carb-endurance") return <CarbEnduranceCalc lang={lang} setCalc={setCalc} />;
  if (activeCalc === "fiber-intake") return <FiberCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "vitamin-d") return <VitaminDCalculator lang={lang} setCalc={setCalc} />;

  if (activeCalc === "bmi-kids") return <BMIKidsCalculator lang={lang} setCalc={setCalc} />;

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
  if (activeCalc === "gold-price") return <GoldPriceCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "wedding-budget") return <WeddingBudget lang={lang} setCalc={setCalc} />;
  if (activeCalc === "newborn-cost") return <NewbornCost lang={lang} setCalc={setCalc} />;
  if (activeCalc === "pet-cost") return <PetCost lang={lang} setCalc={setCalc} />;
  if (activeCalc === "food-expiration") return <FoodExpiration lang={lang} setCalc={setCalc} />;
  if (activeCalc === "rent-vs-buy") return <RentVsBuyCalc lang={lang} setCalc={setCalc} />;
  
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
  if (activeCalc === "eoq") return <EOQCalculator lang={lang} setCalc={setCalc} />;
  if (activeCalc === "churn-retention") return <ChurnRetentionCalc lang={lang} setCalc={setCalc} />;
  if (activeCalc === "shrinkage") return <ShrinkageCalc lang={lang} setCalc={setCalc} />;
  if (activeCalc === "import-markup") return <ImportMarkupCalc lang={lang} setCalc={setCalc} />;
  if (activeCalc === "freelance-rate") return <FreelanceRate lang={lang} setCalc={setCalc} />;

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

  if (activeCalc === "english-test") return <EnglishTestConverter lang={lang} setCalc={setCalc} />;
  if (activeCalc === "pomodoro") return <PomodoroTimer lang={lang} />;
  if (activeCalc === "flashcard-timer") return <FlashCardTimer lang={lang} />;

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
  if (activeCalc === "raid-calc") return <RaidCalculator lang={lang} />;
  if (activeCalc === "ppi-calc") return <PpiCalculator lang={lang} />;
  if (activeCalc === "api-cost") return <ApiCostCalculator lang={lang} />;
  if (activeCalc === "ups-runtime") return <UpsRuntimeCalculator lang={lang} />;
  if (activeCalc === "morse-code") return <MorseCodeConverter lang={lang} />;
  if (activeCalc === "ascii-converter") return <AsciiConverter lang={lang} />;
  if (activeCalc === "cache-hit-rate") return <CacheHitRateCalculator lang={lang} />;

  // Agriculture 3
  if (activeCalc === "soil-ph") return <SoilPhCalculator lang={lang} />;
  if (activeCalc === "livestock-profit") return <LivestockProfitCalculator lang={lang} />;
  if (activeCalc === "spray-volume") return <SprayVolumeCalculator lang={lang} />;
  if (activeCalc === "fishery-income") return <FisheryIncomeCalculator lang={lang} />;
  if (activeCalc === "yield-gap") return <YieldGapCalculator lang={lang} />;

  // Travel 2
  if (activeCalc === "jet-lag") return <JetLagCalculator lang={lang} />;
  if (activeCalc === "roaming-cost") return <RoamingCostCalculator lang={lang} />;

  // Construction 2
  if (activeCalc === "solar-panel") return <SolarPanelCalculator lang={lang} />;
  if (activeCalc === "interior-cost") return <InteriorCostCalculator lang={lang} />;
  if (activeCalc === "ach-calc") return <AchVentilationCalculator lang={lang} />;
  if (activeCalc === "concrete-vol") return <ConcreteVolumeCalculator lang={lang} />;
  if (activeCalc === "rebar-weight") return <RebarWeightCalculator lang={lang} />;
  if (activeCalc === "aac-blocks") return <AacBlocksCalculator lang={lang} />;
  if (activeCalc === "labor-cost-sqm") return <LaborCostCalculator lang={lang} />;
  if (activeCalc === "plumbing-pipe") return <PlumbingPipeCalculator lang={lang} />;
  if (activeCalc === "slope-grade") return <SlopeGradeCalculator lang={lang} />;

  // Environment
  if (activeCalc === "carbon-footprint") return <CarbonFootprintCalculator lang={lang} />;
  if (activeCalc === "wind-energy") return <WindEnergyCalculator lang={lang} />;
  if (activeCalc === "water-savings") return <WaterSavingsCalculator lang={lang} />;
  if (activeCalc === "plastic-footprint") return <PlasticFootprintCalculator lang={lang} />;

  // Science
  if (activeCalc === "quadratic-eq") return <QuadraticCalculator lang={lang} />;
  if (activeCalc === "ph-poh") return <PHCalculator lang={lang} />;

  return (
    <div className="text-center p-12 text-gray-500">
      {lang === "TH" ? "กรุณาเลือกเครื่องมือคำนวณจากเมนูด้านซ้าย" : "Please select a calculator from the menu"}
    </div>
  );
}
