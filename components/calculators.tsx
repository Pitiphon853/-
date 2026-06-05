"use client";
import { useTheme } from "./ThemeProvider";
import AbsoluteValue from "./calcs/absolute-value";
import AcreToHectare from "./calcs/acre-to-hectare";
import AcreToRai from "./calcs/acre-to-rai";
import AcreToSqM from "./calcs/acre-to-sqm";
import AdmissionScorePercentageCalculator from "./calcs/admission-score-percentage";
import AgileVelocityCalculator from "./calcs/agile-velocity";
import ArcLengthCalculator from "./calcs/arc-length-calculator";
import AreaCircleDiameter from "./calcs/area-circle-diameter";
import AreaCircleRadius from "./calcs/area-circle-radius";
import AreaEllipse from "./calcs/area-ellipse";
import AreaHexagonCalculator from "./calcs/area-hexagon";
import AreaIrregularPolygonCalculator from "./calcs/area-irregular-polygon";
import AreaPentagonCalculator from "./calcs/area-pentagon";
import AreaRectangle from "./calcs/area-rectangle";
import AreaRhombusCalculator from "./calcs/area-rhombus";
import AreaSquare from "./calcs/area-square";
import AreaTrapezoid from "./calcs/area-trapezoid";
import AreaTriangle from "./calcs/area-triangle";
import ArithmeticSeriesSum from "./calcs/arithmetic-series-sum";
import Base10To16 from "./calcs/base-10-to-16";
import Base10To2 from "./calcs/base-10-to-2";
import Base10To8 from "./calcs/base-10-to-8";
import Base16To10 from "./calcs/base-16-to-10";
import Base16To2 from "./calcs/base-16-to-2";
import Base2To10 from "./calcs/base-2-to-10";
import Base2To16 from "./calcs/base-2-to-16";
import BayesTheorem from "./calcs/bayes-theorem";
import BehavioralLife from "./calcs/behavioral-life";
import BinaryArithmetic from "./calcs/binary-addition-subtraction";
import BinomialDistribution from "./calcs/binomial-distribution";
import BlueLightExposure from "./calcs/blue-light-exposure";
import BtsMrtVsCar from "./calcs/bts-mrt-vs-car";
import BusFactorCalculator from "./calcs/bus-factor";
import EWasteWaterFootprint from "./calcs/calcs_batch_10_e-waste-water-footprint";
import EVChargerInstallationCost from "./calcs/calcs_batch_10_ev-charger-installation-cost";
import EVChargingCost from "./calcs/calcs_batch_10_ev-charging-cost";
import GreenBuildingScore from "./calcs/calcs_batch_10_green-building-score";
import LEDSavingsCalculator from "./calcs/calcs_batch_10_led-savings";
import LivestockMethaneEmissions from "./calcs/calcs_batch_10_livestock-methane-emissions";
import PersonalEcologicalFootprint from "./calcs/calcs_batch_10_personal-ecological-footprint";
import RenewableVsGridElectricity from "./calcs/calcs_batch_10_renewable-vs-grid-electricity";
import SolarPaybackPeriodCalculator from "./calcs/calcs_batch_10_solar-payback-period";
import TreeCO2OffsetCalculator from "./calcs/calcs_batch_10_tree-co2-offset";
import AppDevCostCalculator from "./calcs/calcs_batch_11_app-dev-cost";
import AppStoreRevenueCalculator from "./calcs/calcs_batch_11_app-store-revenue";
import CdnCostCalculator from "./calcs/calcs_batch_11_cdn-cost-calculator";
import CloudStorageCostCalculator from "./calcs/calcs_batch_11_cloud-storage-cost";
import DatabaseCostCalculator from "./calcs/calcs_batch_11_database-cost";
import FacebookAdsRoiCalculator from "./calcs/calcs_batch_11_facebook-ads-roi-cpa";
import GoogleAdsRoiCalculator from "./calcs/calcs_batch_11_google-ads-roi-roas";
import LtvCacRatioCalculator from "./calcs/calcs_batch_11_ltv-to-cac-ratio";
import SmsEmailCostCalculator from "./calcs/calcs_batch_11_sms-email-marketing-cost";
import VpsDedicatedCostCalculator from "./calcs/calcs_batch_11_vps-dedicated-cost";
import CroRevenueImpactCalculator from "./calcs/calcs_batch_12_cro-revenue-impact-calculator";
import DomainHostingCostCalculator from "./calcs/calcs_batch_12_domain-hosting-cost-calculator";
import EmailDeliverabilityScoreCalculator from "./calcs/calcs_batch_12_email-deliverability-score-calculator";
import EmailRevenueCalculator from "./calcs/calcs_batch_12_email-revenue-calculator";
import PwaVsNativeAppCostCalculator from "./calcs/calcs_batch_12_pwa-vs-native-app-cost-calculator";
import SaasStackTotalCostCalculator from "./calcs/calcs_batch_12_saas-stack-total-cost-calculator";
import SeoValueCalculator from "./calcs/calcs_batch_12_seo-value-calculator";
import SmeCybersecurityCostCalculator from "./calcs/calcs_batch_12_sme-cybersecurity-cost-calculator";
import SslCertificateCostCalculator from "./calcs/calcs_batch_12_ssl-certificate-cost-calculator";
import TechnicalDebtCostCalculator from "./calcs/calcs_batch_12_technical-debt-cost-calculator";
import ACElectricityCost from "./calcs/calcs_batch_13_ac-electricity-cost";
import BuiltInKitchenCost from "./calcs/calcs_batch_13_built-in-kitchen-cost";
import CondoMaintenanceFeeTotal from "./calcs/calcs_batch_13_condo-maintenance-fee-total";
import CondoPurchaseCost from "./calcs/calcs_batch_13_condo-purchase-cost";
import CondoRentVsBuyToLetROI from "./calcs/calcs_batch_13_condo-rent-vs-buy-to-let-roi";
import FullHouseFurnitureCost from "./calcs/calcs_batch_13_full-house-furniture-cost";
import MovingHouseCost from "./calcs/calcs_batch_13_moving-house-cost";
import NewHousePurchaseCost from "./calcs/calcs_batch_13_new-house-purchase-cost";
import PropertyTaxCalculator from "./calcs/calcs_batch_13_property-tax-calculator";
import RentalYieldCalculator from "./calcs/calcs_batch_13_rental-yield-calculator";
import AcBtuSizeCalculator from "./calcs/calcs_batch_14_ac-btu-size-calculator";
import ApplianceElectricityCost from "./calcs/calcs_batch_14_appliance-electricity-cost";
import GardenMaintenanceCost from "./calcs/calcs_batch_14_garden-maintenance-cost";
import HomeInternetCost from "./calcs/calcs_batch_14_home-internet-cost";
import HomeSecurityCost from "./calcs/calcs_batch_14_home-security-cost";
import HomeSolarInstallationCost from "./calcs/calcs_batch_14_home-solar-installation-cost";
import HousePaintingCost from "./calcs/calcs_batch_14_house-painting-cost";
import HouseholdWaterUsageCost from "./calcs/calcs_batch_14_household-water-usage-cost";
import PoolMaintenanceCost from "./calcs/calcs_batch_14_pool-maintenance-cost";
import RoofReplacementCost from "./calcs/calcs_batch_14_roof-replacement-cost";
import CarComparisonCalculator from "./calcs/calcs_batch_15_car-comparison";
import CarDepreciationCalculator from "./calcs/calcs_batch_15_car-depreciation";
import CarInsuranceCalculator from "./calcs/calcs_batch_15_car-insurance";
import CarMaintenanceCalculator from "./calcs/calcs_batch_15_car-maintenance";
import CarTcoCalculator from "./calcs/calcs_batch_15_car-tco";
import EvCostPerKmCalculator from "./calcs/calcs_batch_15_ev-cost-per-km";
import EvIceBreakevenCalculator from "./calcs/calcs_batch_15_ev-ice-breakeven";
import MotorcycleLoanCalculator from "./calcs/calcs_batch_15_motorcycle-loan";
import RiderRoiCalculator from "./calcs/calcs_batch_15_rider-roi";
import TruckCostCalculator from "./calcs/calcs_batch_15_truck-cost";
import AnnualCommuteCalculator from "./calcs/calcs_batch_16_annual-commute-cost-calculator";
import CarPoolCalculator from "./calcs/calcs_batch_16_car-pool-savings-calculator";
import MonthlyParkingCalculator from "./calcs/calcs_batch_16_monthly-parking-cost-calculator";
import TollFeeCalculator from "./calcs/calcs_batch_16_monthly-toll-fee-calculator";
import RideHailingVsOwnCarCalculator from "./calcs/calcs_batch_16_ride-hailing-vs-own-car-cost-calculator";
import AnniversaryCountdown from "./calcs/calcs_batch_17_anniversary-countdown";
import EventCountdown from "./calcs/calcs_batch_17_event-countdown";
import ExactAgeCalculator from "./calcs/calcs_batch_17_exact-age-calculator";
import RetirementCountdown from "./calcs/calcs_batch_17_retirement-countdown";
import SunriseSunsetCalculator from "./calcs/calcs_batch_17_sunrise-sunset-calculator";
import ThaiLunarPhase from "./calcs/calcs_batch_17_thai-lunar-phase";
import FontSizeReadingDistance from "./calcs/calcs_batch_18_font-size-reading-distance";
import RemainingAnnualLeave from "./calcs/calcs_batch_18_remaining-annual-leave";
import ShiftWorkStaffing from "./calcs/calcs_batch_18_shift-work-staffing";
import SocialMediaImageSize from "./calcs/calcs_batch_18_social-media-image-size";
import CustomsBrokerFeeCalculator from "./calcs/calcs_batch_19_customs-broker-fee";
import HsCodeImportTaxCalculator from "./calcs/calcs_batch_19_hs-code-import-tax";
import ImportCustomsDutyCalculator from "./calcs/calcs_batch_19_import-customs-duty";
import BreakEvenTime from "./calcs/calcs_batch_1_break-even-time";
import CapacityUtilizationRate from "./calcs/calcs_batch_1_capacity-utilization-rate";
import CashFlowProjection from "./calcs/calcs_batch_1_cash-flow-projection";
import CostPerUnit from "./calcs/calcs_batch_1_cost-per-unit";
import DoubleDecliningDepreciation from "./calcs/calcs_batch_1_double-declining-depreciation";
import WorkingCapital from "./calcs/calcs_batch_1_working-capital";
import WholesaleVsRetailMargin from "./calcs/calcs_batch_1_wholesale-vs-retail-margin";
import RetailSpaceRentRoi from "./calcs/calcs_batch_1_retail-space-rent-roi";
import SimplifiedPL from "./calcs/calcs_batch_1_simplified-p-and-l";
import FreelanceVsFulltimeCost from "./calcs/calcs_batch_1_freelance-vs-fulltime-cost";
import SolarBatterySizing from "./calcs/calcs_batch_20_solar-battery-sizing";
import SolarInverterSizing from "./calcs/calcs_batch_20_solar-inverter-sizing";
import TouElectricityCost from "./calcs/calcs_batch_20_tou-electricity-cost";
import CostOfLivingComparison from "./calcs/calcs_batch_21_cost-of-living-comparison";
import QalyCalculator from "./calcs/calcs_batch_21_qaly-calculator";
import MetcalfeNetworkValue from "./calcs/calcs_batch_22_metcalfe-network-value";
import OnlineCourseRoi from "./calcs/calcs_batch_22_online-course-roi";
import ViralCoefficient from "./calcs/calcs_batch_22_viral-coefficient";
import AutomationROI from "./calcs/calcs_batch_23_automation-roi";
import BrooksLawTeamSize from "./calcs/calcs_batch_23_brooks-law-team-size";
import NoiseLevelDb from "./calcs/calcs_batch_24_noise-level-db";
import SoundInsulation from "./calcs/calcs_batch_24_sound-insulation";
import FlowStateFrequency from "./calcs/calcs_batch_25_flow-state-frequency";
import CompanyRegistrationCost from "./calcs/calcs_batch_2_company-registration-cost";
import CorporateTaxCalculator from "./calcs/calcs_batch_2_corporate-tax";
import CreditCardMdrFee from "./calcs/calcs_batch_2_credit-card-mdr-fee";
import DeRatio from "./calcs/calcs_batch_2_de-ratio";
import LegalReserveCalculator from "./calcs/calcs_batch_2_legal-reserve";
import MarkupImportedMaterials from "./calcs/calcs_batch_2_markup-imported-materials";
import PosSystemComparison from "./calcs/calcs_batch_2_pos-system-comparison";
import QuickCurrentRatio from "./calcs/calcs_batch_2_quick-current-ratio";
import RoeRoaRoic from "./calcs/calcs_batch_2_roe-roa-roic";
import SalesCommissionStructure from "./calcs/calcs_batch_2_sales-commission-structure";
import AdvertisingBudgetAllocation from "./calcs/calcs_batch_4_advertising-budget-allocation";
import CacPaybackPeriod from "./calcs/calcs_batch_4_cac-payback-period";
import EbitdaCalculator from "./calcs/calcs_batch_4_ebitda-calculator";
import EmployeeOtCalculation from "./calcs/calcs_batch_4_employee-ot-calculation";
import EmployerSocialSecurity from "./calcs/calcs_batch_4_employer-social-security";
import FxForwardRateRisk from "./calcs/calcs_batch_4_fx-forward-rate-risk";
import InternationalShippingCost from "./calcs/calcs_batch_4_international-shipping-cost";
import MinimumWageProvince from "./calcs/calcs_batch_4_minimum-wage-province";
import SeverancePayCalculation from "./calcs/calcs_batch_4_severance-pay-calculation";
import WarehouseRentVsBuy from "./calcs/calcs_batch_4_warehouse-rent-vs-buy";
import AcceptableCPCCalculator from "./calcs/calcs_batch_5_acceptable-cpc";
import CAGRCalculator from "./calcs/calcs_batch_5_cagr";
import FactoryElectricityCalculator from "./calcs/calcs_batch_5_factory-electricity";
import FranchiseCostCalculator from "./calcs/calcs_batch_5_franchise-cost";
import GrossMarginSkuCalculator from "./calcs/calcs_batch_5_gross-margin-sku";
import NPSCalculator from "./calcs/calcs_batch_5_nps";
import RealEstateBrokerFeeCalculator from "./calcs/calcs_batch_5_real-estate-broker-fee";
import ReturnRateImpactCalculator from "./calcs/calcs_batch_5_return-rate-impact";
import ROASCalculator from "./calcs/calcs_batch_5_roas";
import SaasMrrArrCalculator from "./calcs/calcs_batch_5_saas-mrr-arr";
import BananaFarmingCalculator from "./calcs/calcs_batch_7_banana-farming-calculator";
import BroilerChickenFarmCalculator from "./calcs/calcs_batch_7_broiler-chicken-farm-calculator";
import CassavaFarmingCalculator from "./calcs/calcs_batch_7_cassava-farming-calculator";
import CoconutFarmingCalculator from "./calcs/calcs_batch_7_coconut-farming-calculator";
import CornFarmingCalculator from "./calcs/calcs_batch_7_corn-farming-calculator";
import MangoFarmingCalculator from "./calcs/calcs_batch_7_mango-farming-calculator";
import OilPalmFarmingCalculator from "./calcs/calcs_batch_7_oil-palm-farming-calculator";
import RubberTreeFarmingCalculator from "./calcs/calcs_batch_7_rubber-tree-farming-calculator";
import SugarcaneFarmingCalculator from "./calcs/calcs_batch_7_sugarcane-farming-calculator";
import WhiteShrimpFarmCalculator from "./calcs/calcs_batch_7_white-shrimp-farm-calculator";
import AgriChemicalMixRatio from "./calcs/calcs_batch_8_agri-chemical-mix-ratio";
import BeefCattleFarmProfitCost from "./calcs/calcs_batch_8_beef-cattle-farm-profit-cost";
import DripIrrigationCost from "./calcs/calcs_batch_8_drip-irrigation-cost";
import FarmAreaFromGps from "./calcs/calcs_batch_8_farm-area-from-gps";
import FarmBreakEvenYield from "./calcs/calcs_batch_8_farm-break-even-yield";
import FarmLaborCostPerRai from "./calcs/calcs_batch_8_farm-labor-cost-per-rai";
import LayerChickenFarmProfitCost from "./calcs/calcs_batch_8_layer-chicken-farm-profit-cost";
import PigFarmProfitCost from "./calcs/calcs_batch_8_pig-farm-profit-cost";
import SeedsPerRaiCalculator from "./calcs/calcs_batch_8_seeds-per-rai-calculator";
import TractorRentVsBuy from "./calcs/calcs_batch_8_tractor-rent-vs-buy";
import FarmLandRentRoi from "./calcs/calcs_batch_9_farm-land-rent-roi";
import FoodCarbonFootprint from "./calcs/calcs_batch_9_food-carbon-footprint";
import FreshToDryWeight from "./calcs/calcs_batch_9_fresh-to-dry-weight";
import GerminationRate from "./calcs/calcs_batch_9_germination-rate";
import HarvestTime from "./calcs/calcs_batch_9_harvest-time";
import MillStorageElectricity from "./calcs/calcs_batch_9_mill-storage-electricity";
import ProductWaterFootprint from "./calcs/calcs_batch_9_product-water-footprint";
import RecycledWasteImpact from "./calcs/calcs_batch_9_recycled-waste-impact";
import TravelCarbonFootprint from "./calcs/calcs_batch_9_travel-carbon-footprint";
import WaterSavingImpact from "./calcs/calcs_batch_9_water-saving-impact";
import CarLoanFlatRate from "./calcs/car-loan-flat-rate";
import CarLoanUsedCar from "./calcs/car-loan-used-car";
import CartesianProduct from "./calcs/cartesian-product";
import CartesianToPolar from "./calcs/cartesian-to-polar";
import CbmCalculator from "./calcs/cbm-calculator";
import CgpaCalculator from "./calcs/cgpa-calculator";
import ChinaImportLeadTime from "./calcs/china-import-lead-time";
import CircadianRhythm from "./calcs/circadian-rhythm";
import CircumferenceCalculator from "./calcs/circumference-calculator";
import CodeCoverageCalculator from "./calcs/code-coverage";
import CoefficientOfVariation from "./calcs/coefficient-of-variation";
import CognitiveLoad from "./calcs/cognitive-load";
import CombinationCalculator from "./calcs/combination-calculator";
import CompoundLearning from "./calcs/compound-learning-roi";
import ContainerCapacity from "./calcs/container-weight-capacity";
import CreativityScore from "./calcs/creativity-score";
import CreditCardMinimumPayment from "./calcs/credit-card-minimum-payment";
import CronbachAlphaCalculator from "./calcs/cronbach-alpha";
import CrossProductCalculator from "./calcs/cross-product";
import CubeRootCalculator from "./calcs/cube-root-calculator";
import CumulativeNoise from "./calcs/cumulative-noise";
import CustomBaseLogarithm from "./calcs/custom-base-logarithm";
import DecileCalculator from "./calcs/decile-calculator";
import DecimalToFraction from "./calcs/decimal-to-fraction";
import DecimalToRoman from "./calcs/decimal-to-roman";
import DecimalToScientificNotation from "./calcs/decimal-to-scientific-notation";
import DecisionFatigue from "./calcs/decision-fatigue";
import DeepWorkCalculator from "./calcs/deep-work-calculator";
import DefiniteIntegralPolynomial from "./calcs/definite-integral-polynomial";
import DegreeToRadian from "./calcs/degree-to-radian";
import DietEnvironment from "./calcs/diet-environment";
import DifferenceOfSquares from "./calcs/difference-of-squares";
import DigitalDetoxTime from "./calcs/digital-detox-time";
import DigitalSavingsTierRate from "./calcs/digital-savings-tier-rate";
import DirectProportion from "./calcs/direct-proportion";
import DisasterRecoveryCalculator from "./calcs/disaster-recovery";
import DistanceFormula from "./calcs/distance-formula";
import DistractionCostCalculator from "./calcs/distraction-cost";
import DotProductCalculator from "./calcs/dot-product";
import DunbarNumber from "./calcs/dunbar-number";
import EmailResponseTimeCalculator from "./calcs/email-response-time";
import EquilateralTriangleHeight from "./calcs/equilateral-triangle-height";
import ErgonomicScore from "./calcs/ergonomic-score";
import EvenOddFunctionChecker from "./calcs/even-odd-function-checker";
import ExpectedValue from "./calcs/expected-value";
import ExponentCalculator from "./calcs/exponent-calculator";
import ExponentialMovingAverage from "./calcs/exponential-moving-average";
import FactorGenerator from "./calcs/factor-generator";
import FactorialCalculator from "./calcs/factorial-calculator";
import FibonacciNumber from "./calcs/fibonacci-number";
import FiveNumberSummary from "./calcs/five-number-summary";
import FixedDepositCalculator from "./calcs/fixed-deposit-tax-deducted";
import FleschKincaidCalculator from "./calcs/flesch-kincaid-reading-level";
import FomoCost from "./calcs/fomo-cost";
import FoodDeliveryVsCooking from "./calcs/food-delivery-vs-cooking";
import ForgettingCurve from "./calcs/forgetting-curve";
import FractionToDecimal from "./calcs/fraction-to-decimal";
import FutureValueCalculator from "./calcs/future-value-fv";
import Gcd2Numbers from "./calcs/gcd-2-numbers";
import Gcd3Numbers from "./calcs/gcd-3-numbers";
import GeometricMeanCalculator from "./calcs/geometric-mean";
import GeometricSeriesSum from "./calcs/geometric-series-sum";
import GNHCalculator from "./calcs/gnh-calculator";
import GoldenRatioCalculator from "./calcs/golden-ratio-calculator";
import GovPensionGpf from "./calcs/gov-pension-gpf";
import GovPensionOld from "./calcs/gov-pension-old";
import GpaCalculator from "./calcs/gpa-calculator";
import GratitudeJournal from "./calcs/gratitude-journal";
import HabitStreakCalculator from "./calcs/habit-streak-calculator";
import HaleCalculator from "./calcs/hale-calculator";
import HappinessRoi from "./calcs/happiness-roi";
import HarmonicMeanCalculator from "./calcs/harmonic-mean";
import HectareToAcre from "./calcs/hectare-to-acre";
import HectareToRai from "./calcs/hectare-to-rai";
import HectareToSqm from "./calcs/hectare-to-sqm";
import HeronsFormula from "./calcs/herons-formula";
import HexAdditionSubtraction from "./calcs/hex-addition-subtraction";
import HiddenHomeCosts from "./calcs/hidden-home-costs";
import HomeExtraPayment from "./calcs/home-extra-payment";
import HomeRefinanceSavings from "./calcs/home-refinance-savings";
import ImproperToMixedFraction from "./calcs/improper-to-mixed-fraction";
import InflationImpactSavings from "./calcs/inflation-impact-savings";
import IntegerDivision from "./calcs/integer-division";
import InverseMatrix from "./calcs/inverse-matrix";
import InverseProportion from "./calcs/inverse-proportion";
import KrejcieMorganSampleSize from "./calcs/krejcie-morgan-sample-size";
import KurtosisCalculator from "./calcs/kurtosis-calculator";
import LawOfCosines from "./calcs/law-of-cosines";
import LawOfSines from "./calcs/law-of-sines";
import Lcm2Numbers from "./calcs/lcm-2-numbers";
import Lcm3Numbers from "./calcs/lcm-3-numbers";
import LearningRate from "./calcs/learning-rate";
import LegacyScore from "./calcs/legacy-score";
import LifeSatisfaction from "./calcs/life-satisfaction";
import LifetimeHealthcareCost from "./calcs/lifetime-healthcare-cost";
import LimitCalculator from "./calcs/limit-calculator";
import LinearRegressionLine from "./calcs/linear-regression-line";
import LogBase10 from "./calcs/log-base-10";
import LogBase2 from "./calcs/log-base-2";
import LogicEquivalenceChecker from "./calcs/logic-equivalence-checker";
import LuxLighting from "./calcs/lux-lighting";
import MatrixAdditionSubtraction from "./calcs/matrix-addition-subtraction";
import MatrixDeterminant2x2 from "./calcs/matrix-determinant-2x2";
import MatrixDeterminant3x3 from "./calcs/matrix-determinant-3x3";
import MatrixScalarMultiplication from "./calcs/matrix-scalar-multiplication";
import MatrixTransposeCalculator from "./calcs/matrix-transpose";
import MeanCalculator from "./calcs/mean-calculator";
import MeanDeviationCalculator from "./calcs/mean-deviation";
import MedianCalculator from "./calcs/median-calculator";
import MeetingCostCalculator from "./calcs/meeting-cost-calculator";
import MeetingRoiCalculator from "./calcs/meeting-roi";
import MidpointFormula from "./calcs/midpoint-formula";
import MinimalismScore from "./calcs/minimalism-score";
import MixedToImproperFraction from "./calcs/mixed-to-improper-fraction";
import ModeCalculator from "./calcs/mode-calculator";
import ModuloCalculator from "./calcs/modulo-calculator";
import MoqVsPrice from "./calcs/moq-vs-price";
import MTBFCalculator from "./calcs/mtbf";
import MTTRCalculator from "./calcs/mttr";
import MultiRateOT from "./calcs/multi-rate-ot";
import NaturalLog from "./calcs/natural-log";
import NetIncomeAfterTaxCalculator from "./calcs/net-income-after-tax";
import NetMeteringRevenue from "./calcs/net-metering-revenue";
import NganToRai from "./calcs/ngan-to-rai";
import NganToSqm from "./calcs/ngan-to-sqm";
import NganToSqwa from "./calcs/ngan-to-sqwa";
import NormalDistributionZTable from "./calcs/normal-distribution-z-table";
import NoteTaking from "./calcs/note-taking";
import NsfSavingsCalculator from "./calcs/nsf-savings-calculator";
import NthRootCalculator from "./calcs/nth-root-calculator";
import NumberToEnglishText from "./calcs/number-to-english-text";
import NumberToThaiText from "./calcs/number-to-thai-text";
import OnGridSolarPayback from "./calcs/on-grid-solar-payback";
import OutliersCalculator from "./calcs/outliers-calculator";
import ParkinsonsLawCalculator from "./calcs/parkinsons-law-calculator";
import PearsonCorrelation from "./calcs/pearson-correlation";
import PercentDifferenceCalculator from "./calcs/percent-difference";
import PercentOfValue from "./calcs/percent-of-value";
import PercentageDecrease from "./calcs/percentage-decrease";
import PercentageIncrease from "./calcs/percentage-increase";
import PercentileCalculator from "./calcs/percentile-calculator";
import PermutationCalculator from "./calcs/permutation-calculator";
import PoissonDistribution from "./calcs/poisson-distribution";
import PolygonDiagonals from "./calcs/polygon-diagonals";
import PolygonExteriorAngle from "./calcs/polygon-exterior-angle";
import PolygonInteriorAngleSum from "./calcs/polygon-interior-angle-sum";
import PolynomialDerivative from "./calcs/polynomial-derivative";
import PopulationStandardDeviation from "./calcs/population-standard-deviation";
import PowerSetSize from "./calcs/power-set-size";
import PresentValueCalculator from "./calcs/present-value-pv";
import PrimeNumberChecker from "./calcs/prime-number-checker";
import PrintCostPerPageCalculator from "./calcs/print-cost-per-page";
import ProbabilityCalculator from "./calcs/probability-calculator";
import ProrateSalary from "./calcs/prorate-salary";
import PvdRetirementCalculator from "./calcs/pvd-retirement-calculator";
import PythagorasHypotenuse from "./calcs/pythagoras-hypotenuse";
import PythagorasLeg from "./calcs/pythagoras-leg";
import QuadraticEquation from "./calcs/quadratic-equation";
import QuartileCalculator from "./calcs/quartile-calculator";
import QuartileDeviationCalculator from "./calcs/quartile-deviation";
import RadianToDegree from "./calcs/radian-to-degree";
import RaiToHectare from "./calcs/rai-to-hectare";
import RaiToNgan from "./calcs/rai-to-ngan";
import RaiToSqm from "./calcs/rai-to-sqm";
import RaiToSqwa from "./calcs/rai-to-sqwa";
import RandomNumberGenerator from "./calcs/random-number-generator";
import RangeCalculator from "./calcs/range-calculator";
import ReadingComprehension from "./calcs/reading-comprehension";
import LinearRegressionLine1 from "./calcs/linear-regression-line";
import RelationshipInvestment from "./calcs/calcs_batch_26_relationship-investment";
import ReorderPointCalculator from "./calcs/reorder-point-calculator";
import RomanToDecimal from "./calcs/roman-to-decimal";
import RtoRpoCalculator from "./calcs/rto-rpo";
import SafetyStockCalculator from "./calcs/safety-stock-calculator";
import KrejcieMorganSampleSize1 from "./calcs/krejcie-morgan-sample-size";
import SampleStandardDeviation from "./calcs/sample-standard-deviation";
import ScientificNotationToDecimal from "./calcs/scientific-notation-to-decimal";
import SectorAreaCalculator from "./calcs/sector-area-calculator";
import SeverancePayCalculator from "./calcs/severance-pay-calculator";
import SimpleMovingAverage from "./calcs/simple-moving-average";
import SixJarsCalculator from "./calcs/six-jars-money-management";
import SkewnessCalculator from "./calcs/skewness-calculator";
import SkillHalfLife from "./calcs/skill-half-life";
import SLAUptimeCalculator from "./calcs/sla-uptime";
import SleepDebtCalculator from "./calcs/sleep-debt-calculator";
import SlopeFormula from "./calcs/slope-formula";
import SlopeInterceptEquation from "./calcs/slope-intercept-equation";
import SocialMediaROI from "./calcs/social-media-roi";
import SocialSecurityLumpSum from "./calcs/social-security-lump-sum";
import SocialSecurityM33M39 from "./calcs/social-security-m33-m39";
import SocialSecurityM40 from "./calcs/social-security-m40";
import SocialSecurityPension from "./calcs/social-security-pension";
import SpacedRepetition from "./calcs/spaced-repetition";
import SphericalToCartesian from "./calcs/spherical-to-cartesian";
import SqFtToSqIn from "./calcs/sqft-to-sqin";
import SqFtToSqM from "./calcs/sqft-to-sqm";
import SqKmToAcre from "./calcs/sqkm-to-acre";
import SqkmToRai from "./calcs/sqkm-to-rai";
import SqkmToSqm from "./calcs/sqkm-to-sqm";
import SqmToAcre from "./calcs/sqm-to-acre";
import SqmToNgan from "./calcs/sqm-to-ngan";
import SqmToRai from "./calcs/sqm-to-rai";
import SqmToSqft from "./calcs/sqm-to-sqft";
import SqmToSqkm from "./calcs/sqm-to-sqkm";
import SqmToSqwa from "./calcs/sqm-to-sqwa";
import SqmToSqyd from "./calcs/sqm-to-sqyd";
import SquareRootCalculator from "./calcs/square-root-calculator";
import SqwaToNgan from "./calcs/sqwa-to-ngan";
import SqwaToRai from "./calcs/sqwa-to-rai";
import SqwaToSqm from "./calcs/sqwa-to-sqm";
import SqYdToSqM from "./calcs/sqyd-to-sqm";
import PopulationStandardDeviation1 from "./calcs/population-standard-deviation";
import StandardErrorCalculator from "./calcs/standard-error-calculator";
import StandingDeskRatio from "./calcs/standing-desk-ratio";
import SumDifferenceOfCubes from "./calcs/sum-difference-of-cubes";
import SurfaceAreaCylinder from "./calcs/surface-area-cylinder";
import SurfaceAreaSphere from "./calcs/surface-area-sphere";
import SystemOfEquations2Variables from "./calcs/system-of-equations-2-variables";
import SystemOfEquations3Variables from "./calcs/system-of-equations-3-variables";
import TScoreCalculator from "./calcs/t-score-calculator";
import TaroYamaneSampleSize from "./calcs/taro-yamane-sample-size";
import TaskBatchingCalculator from "./calcs/task-batching";
import TaxDeductionDonationCalculator from "./calcs/tax-deduction-donation";
import TaxDeductionInsurance from "./calcs/tax-deduction-insurance";
import TaxDeductionRMF from "./calcs/tax-deduction-rmf";
import TaxDeductionSSF from "./calcs/tax-deduction-ssf";
import TaxDeductionThaiESG from "./calcs/tax-deduction-thaiesg";
import TenThousandHours from "./calcs/ten-thousand-hours";
import ThaiPostEmsCost from "./calcs/thai-post-ems-cost";
import ThaiPublicHolidays from "./calcs/thai-public-holidays";
import TimeAffluence from "./calcs/time-affluence";
import TriangleCentroid from "./calcs/triangle-centroid";
import TrigArcCos from "./calcs/trig-arccos";
import TrigArcSin from "./calcs/trig-arcsin";
import TrigArcTan from "./calcs/trig-arctan";
import TrigCos from "./calcs/trig-cos";
import TrigSin from "./calcs/trig-sin";
import TrigTan from "./calcs/trig-tan";
import TruthTable2Variables from "./calcs/truth-table-2-variables";
import TruthTable3Variables from "./calcs/truth-table-3-variables";
import ValueIsWhatPercent from "./calcs/value-is-what-percent";
import VarianceCalculator from "./calcs/variance-calculator";
import VectorMagnitudeCalculator from "./calcs/vector-magnitude";
import VennDiagram2Sets from "./calcs/venn-diagram-2-sets";
import VennDiagram3Sets from "./calcs/venn-diagram-3-sets";
import VolumeCone from "./calcs/volume-cone";
import VolumeCube from "./calcs/volume-cube";
import VolumeCylinder from "./calcs/volume-cylinder";
import VolumePyramid from "./calcs/volume-pyramid";
import VolumeSphere from "./calcs/volume-sphere";
import VolumeTriangularPrism from "./calcs/volume-triangular-prism";
import VolumetricWeightCalculator from "./calcs/volumetric-weight";
import WarehousingCost from "./calcs/warehousing-cost";
import WeightedAverageCalculator from "./calcs/weighted-average";
import WHT1PercentCalculator from "./calcs/wht-1-percent";
import WHT2PercentCalculator from "./calcs/wht-2-percent";
import WHT3PercentCalculator from "./calcs/wht-3-percent";
import WHT5PercentCalculator from "./calcs/wht-5-percent";
import WillpowerDepletion from "./calcs/willpower-depletion";
import WorkLifeBalanceScore from "./calcs/work-life-balance-score";
import WorkingDaysCalculator from "./calcs/working-days-calculator";
import WpmProductivityCalculator from "./calcs/wpm-productivity";
import ZScoreCalculator from "./calcs/z-score-calculator";

export const Calculators = ({ activeCalc, lang, setCalc }: { activeCalc: string; lang: any; setCalc: any }) => {
    switch (activeCalc) {
      case "absolute-value":
        return <AbsoluteValue lang={lang} />;
      case "acre-to-hectare":
        return <AcreToHectare lang={lang} />;
      case "acre-to-rai":
        return <AcreToRai lang={lang} />;
      case "acre-to-sqm":
        return <AcreToSqM lang={lang} />;
      case "admission-score-percentage":
        return <AdmissionScorePercentageCalculator lang={lang} />;
      case "agile-velocity":
        return <AgileVelocityCalculator lang={lang} />;
      case "arc-length-calculator":
        return <ArcLengthCalculator lang={lang} />;
      case "area-circle-diameter":
        return <AreaCircleDiameter lang={lang} />;
      case "area-circle-radius":
        return <AreaCircleRadius lang={lang} />;
      case "area-ellipse":
        return <AreaEllipse lang={lang} />;
      case "area-hexagon":
        return <AreaHexagonCalculator lang={lang} />;
      case "area-irregular-polygon":
        return <AreaIrregularPolygonCalculator lang={lang} />;
      case "area-pentagon":
        return <AreaPentagonCalculator lang={lang} />;
      case "area-rectangle":
        return <AreaRectangle lang={lang} />;
      case "area-rhombus":
        return <AreaRhombusCalculator lang={lang} />;
      case "area-square":
        return <AreaSquare lang={lang} />;
      case "area-trapezoid":
        return <AreaTrapezoid lang={lang} />;
      case "area-triangle":
        return <AreaTriangle lang={lang} />;
      case "arithmetic-series-sum":
        return <ArithmeticSeriesSum lang={lang} />;
      case "base-10-to-16":
        return <Base10To16 lang={lang} />;
      case "base-10-to-2":
        return <Base10To2 lang={lang} />;
      case "base-10-to-8":
        return <Base10To8 lang={lang} />;
      case "base-16-to-10":
        return <Base16To10 lang={lang} />;
      case "base-16-to-2":
        return <Base16To2 lang={lang} />;
      case "base-2-to-10":
        return <Base2To10 lang={lang} />;
      case "base-2-to-16":
        return <Base2To16 lang={lang} />;
      case "bayes-theorem":
        return <BayesTheorem lang={lang} />;
      case "behavioral-life":
        return <BehavioralLife lang={lang} />;
      case "binary-addition-subtraction":
        return <BinaryArithmetic lang={lang} />;
      case "binomial-distribution":
        return <BinomialDistribution lang={lang} />;
      case "blue-light-exposure":
        return <BlueLightExposure lang={lang} />;
      case "bts-mrt-vs-car":
        return <BtsMrtVsCar lang={lang} />;
      case "bus-factor":
        return <BusFactorCalculator lang={lang} />;
      case "e-waste-water-footprint":
        return <EWasteWaterFootprint lang={lang} />;
      case "ev-charger-installation-cost":
        return <EVChargerInstallationCost lang={lang} />;
      case "ev-charging-cost":
        return <EVChargingCost lang={lang} />;
      case "green-building-score":
        return <GreenBuildingScore lang={lang} />;
      case "led-savings":
        return <LEDSavingsCalculator lang={lang} />;
      case "livestock-methane-emissions":
        return <LivestockMethaneEmissions lang={lang} />;
      case "personal-ecological-footprint":
        return <PersonalEcologicalFootprint lang={lang} />;
      case "renewable-vs-grid-electricity":
        return <RenewableVsGridElectricity lang={lang} />;
      case "solar-payback-period":
        return <SolarPaybackPeriodCalculator lang={lang} />;
      case "tree-co2-offset":
        return <TreeCO2OffsetCalculator lang={lang} />;
      case "app-dev-cost":
        return <AppDevCostCalculator lang={lang} />;
      case "app-store-revenue":
        return <AppStoreRevenueCalculator lang={lang} />;
      case "cdn-cost-calculator":
        return <CdnCostCalculator lang={lang} />;
      case "cloud-storage-cost":
        return <CloudStorageCostCalculator lang={lang} />;
      case "database-cost":
        return <DatabaseCostCalculator lang={lang} />;
      case "facebook-ads-roi-cpa":
        return <FacebookAdsRoiCalculator lang={lang} />;
      case "google-ads-roi-roas":
        return <GoogleAdsRoiCalculator lang={lang} />;
      case "ltv-to-cac-ratio":
        return <LtvCacRatioCalculator lang={lang} />;
      case "sms-email-marketing-cost":
        return <SmsEmailCostCalculator lang={lang} />;
      case "vps-dedicated-cost":
        return <VpsDedicatedCostCalculator lang={lang} />;
      case "cro-revenue-impact-calculator":
        return <CroRevenueImpactCalculator lang={lang} />;
      case "domain-hosting-cost-calculator":
        return <DomainHostingCostCalculator lang={lang} />;
      case "email-deliverability-score-calculator":
        return <EmailDeliverabilityScoreCalculator lang={lang} />;
      case "email-revenue-calculator":
        return <EmailRevenueCalculator lang={lang} />;
      case "pwa-vs-native-app-cost-calculator":
        return <PwaVsNativeAppCostCalculator lang={lang} />;
      case "saas-stack-total-cost-calculator":
        return <SaasStackTotalCostCalculator lang={lang} />;
      case "seo-value-calculator":
        return <SeoValueCalculator lang={lang} />;
      case "sme-cybersecurity-cost-calculator":
        return <SmeCybersecurityCostCalculator lang={lang} />;
      case "ssl-certificate-cost-calculator":
        return <SslCertificateCostCalculator lang={lang} />;
      case "technical-debt-cost-calculator":
        return <TechnicalDebtCostCalculator lang={lang} />;
      case "ac-electricity-cost":
        return <ACElectricityCost lang={lang} />;
      case "built-in-kitchen-cost":
        return <BuiltInKitchenCost lang={lang} />;
      case "condo-maintenance-fee-total":
        return <CondoMaintenanceFeeTotal lang={lang} />;
      case "condo-purchase-cost":
        return <CondoPurchaseCost lang={lang} />;
      case "condo-rent-vs-buy-to-let-roi":
        return <CondoRentVsBuyToLetROI lang={lang} />;
      case "full-house-furniture-cost":
        return <FullHouseFurnitureCost lang={lang} />;
      case "moving-house-cost":
        return <MovingHouseCost lang={lang} />;
      case "new-house-purchase-cost":
        return <NewHousePurchaseCost lang={lang} />;
      case "property-tax-calculator":
        return <PropertyTaxCalculator lang={lang} />;
      case "rental-yield-calculator":
        return <RentalYieldCalculator lang={lang} />;
      case "ac-btu-size-calculator":
        return <AcBtuSizeCalculator lang={lang} />;
      case "appliance-electricity-cost":
        return <ApplianceElectricityCost lang={lang} />;
      case "garden-maintenance-cost":
        return <GardenMaintenanceCost lang={lang} />;
      case "home-internet-cost":
        return <HomeInternetCost lang={lang} />;
      case "home-security-cost":
        return <HomeSecurityCost lang={lang} />;
      case "home-solar-installation-cost":
        return <HomeSolarInstallationCost lang={lang} />;
      case "house-painting-cost":
        return <HousePaintingCost lang={lang} />;
      case "household-water-usage-cost":
        return <HouseholdWaterUsageCost lang={lang} />;
      case "pool-maintenance-cost":
        return <PoolMaintenanceCost lang={lang} />;
      case "roof-replacement-cost":
        return <RoofReplacementCost lang={lang} />;
      case "car-comparison":
        return <CarComparisonCalculator lang={lang} />;
      case "car-depreciation":
        return <CarDepreciationCalculator lang={lang} />;
      case "car-insurance":
        return <CarInsuranceCalculator lang={lang} />;
      case "car-maintenance":
        return <CarMaintenanceCalculator lang={lang} />;
      case "car-tco":
        return <CarTcoCalculator lang={lang} />;
      case "ev-cost-per-km":
        return <EvCostPerKmCalculator lang={lang} />;
      case "ev-ice-breakeven":
        return <EvIceBreakevenCalculator lang={lang} />;
      case "motorcycle-loan":
        return <MotorcycleLoanCalculator lang={lang} />;
      case "rider-roi":
        return <RiderRoiCalculator lang={lang} />;
      case "truck-cost":
        return <TruckCostCalculator lang={lang} />;
      case "annual-commute-cost-calculator":
        return <AnnualCommuteCalculator lang={lang} />;
      case "car-pool-savings-calculator":
        return <CarPoolCalculator lang={lang} />;
      case "monthly-parking-cost-calculator":
        return <MonthlyParkingCalculator lang={lang} />;
      case "monthly-toll-fee-calculator":
        return <TollFeeCalculator lang={lang} />;
      case "ride-hailing-vs-own-car-cost-calculator":
        return <RideHailingVsOwnCarCalculator lang={lang} />;
      case "anniversary-countdown":
        return <AnniversaryCountdown lang={lang} />;
      case "event-countdown":
        return <EventCountdown lang={lang} />;
      case "exact-age-calculator":
        return <ExactAgeCalculator lang={lang} />;
      case "retirement-countdown":
        return <RetirementCountdown lang={lang} />;
      case "sunrise-sunset-calculator":
        return <SunriseSunsetCalculator lang={lang} />;
      case "thai-lunar-phase":
        return <ThaiLunarPhase lang={lang} />;
      case "font-size-reading-distance":
        return <FontSizeReadingDistance lang={lang} />;
      case "remaining-annual-leave":
        return <RemainingAnnualLeave lang={lang} />;
      case "shift-work-staffing":
        return <ShiftWorkStaffing lang={lang} />;
      case "social-media-image-size":
        return <SocialMediaImageSize lang={lang} />;
      case "customs-broker-fee":
        return <CustomsBrokerFeeCalculator lang={lang} />;
      case "hs-code-import-tax":
        return <HsCodeImportTaxCalculator lang={lang} />;
      case "import-customs-duty":
        return <ImportCustomsDutyCalculator lang={lang} />;
      case "break-even-time":
        return <BreakEvenTime lang={lang} />;
      case "capacity-utilization-rate":
        return <CapacityUtilizationRate lang={lang} />;
      case "cash-flow-projection":
        return <CashFlowProjection lang={lang} />;
      case "cost-per-unit":
        return <CostPerUnit lang={lang} />;
      case "double-declining-depreciation":
        return <DoubleDecliningDepreciation lang={lang} />;
      case "working-capital":
        return <WorkingCapital lang={lang} />;
      case "wholesale-vs-retail-margin":
        return <WholesaleVsRetailMargin lang={lang} />;
      case "retail-space-rent-roi":
        return <RetailSpaceRentRoi lang={lang} />;
      case "simplified-p-and-l":
        return <SimplifiedPL lang={lang} />;
      case "freelance-vs-fulltime-cost":
        return <FreelanceVsFulltimeCost lang={lang} />;
      case "solar-battery-sizing":
        return <SolarBatterySizing lang={lang} />;
      case "solar-inverter-sizing":
        return <SolarInverterSizing lang={lang} />;
      case "tou-electricity-cost":
        return <TouElectricityCost lang={lang} />;
      case "cost-of-living-comparison":
        return <CostOfLivingComparison lang={lang} />;
      case "qaly-calculator":
        return <QalyCalculator lang={lang} />;
      case "metcalfe-network-value":
        return <MetcalfeNetworkValue lang={lang} />;
      case "online-course-roi":
        return <OnlineCourseRoi lang={lang} />;
      case "viral-coefficient":
        return <ViralCoefficient lang={lang} />;
      case "automation-roi":
        return <AutomationROI lang={lang} />;
      case "brooks-law-team-size":
        return <BrooksLawTeamSize lang={lang} />;
      case "noise-level-db":
        return <NoiseLevelDb lang={lang} />;
      case "sound-insulation":
        return <SoundInsulation lang={lang} />;
      case "flow-state-frequency":
        return <FlowStateFrequency lang={lang} />;
      case "company-registration-cost":
        return <CompanyRegistrationCost lang={lang} />;
      case "corporate-tax":
        return <CorporateTaxCalculator lang={lang} />;
      case "credit-card-mdr-fee":
        return <CreditCardMdrFee lang={lang} />;
      case "de-ratio":
        return <DeRatio lang={lang} />;
      case "legal-reserve":
        return <LegalReserveCalculator lang={lang} />;
      case "markup-imported-materials":
        return <MarkupImportedMaterials lang={lang} />;
      case "pos-system-comparison":
        return <PosSystemComparison lang={lang} />;
      case "quick-current-ratio":
        return <QuickCurrentRatio lang={lang} />;
      case "roe-roa-roic":
        return <RoeRoaRoic lang={lang} />;
      case "sales-commission-structure":
        return <SalesCommissionStructure lang={lang} />;
      case "advertising-budget-allocation":
        return <AdvertisingBudgetAllocation lang={lang} />;
      case "cac-payback-period":
        return <CacPaybackPeriod lang={lang} />;
      case "ebitda-calculator":
        return <EbitdaCalculator lang={lang} />;
      case "employee-ot-calculation":
        return <EmployeeOtCalculation lang={lang} />;
      case "employer-social-security":
        return <EmployerSocialSecurity lang={lang} />;
      case "fx-forward-rate-risk":
        return <FxForwardRateRisk lang={lang} />;
      case "international-shipping-cost":
        return <InternationalShippingCost lang={lang} />;
      case "minimum-wage-province":
        return <MinimumWageProvince lang={lang} />;
      case "severance-pay-calculation":
        return <SeverancePayCalculation lang={lang} />;
      case "warehouse-rent-vs-buy":
        return <WarehouseRentVsBuy lang={lang} />;
      case "acceptable-cpc":
        return <AcceptableCPCCalculator lang={lang} />;
      case "cagr":
        return <CAGRCalculator lang={lang} />;
      case "factory-electricity":
        return <FactoryElectricityCalculator lang={lang} />;
      case "franchise-cost":
        return <FranchiseCostCalculator lang={lang} />;
      case "gross-margin-sku":
        return <GrossMarginSkuCalculator lang={lang} />;
      case "nps":
        return <NPSCalculator lang={lang} />;
      case "real-estate-broker-fee":
        return <RealEstateBrokerFeeCalculator lang={lang} />;
      case "return-rate-impact":
        return <ReturnRateImpactCalculator lang={lang} />;
      case "roas":
        return <ROASCalculator lang={lang} />;
      case "saas-mrr-arr":
        return <SaasMrrArrCalculator lang={lang} />;
      case "banana-farming-calculator":
        return <BananaFarmingCalculator lang={lang} />;
      case "broiler-chicken-farm-calculator":
        return <BroilerChickenFarmCalculator lang={lang} />;
      case "cassava-farming-calculator":
        return <CassavaFarmingCalculator lang={lang} />;
      case "coconut-farming-calculator":
        return <CoconutFarmingCalculator lang={lang} />;
      case "corn-farming-calculator":
        return <CornFarmingCalculator lang={lang} />;
      case "mango-farming-calculator":
        return <MangoFarmingCalculator lang={lang} />;
      case "oil-palm-farming-calculator":
        return <OilPalmFarmingCalculator lang={lang} />;
      case "rubber-tree-farming-calculator":
        return <RubberTreeFarmingCalculator lang={lang} />;
      case "sugarcane-farming-calculator":
        return <SugarcaneFarmingCalculator lang={lang} />;
      case "white-shrimp-farm-calculator":
        return <WhiteShrimpFarmCalculator lang={lang} />;
      case "agri-chemical-mix-ratio":
        return <AgriChemicalMixRatio lang={lang} />;
      case "beef-cattle-farm-profit-cost":
        return <BeefCattleFarmProfitCost lang={lang} />;
      case "drip-irrigation-cost":
        return <DripIrrigationCost lang={lang} />;
      case "farm-area-from-gps":
        return <FarmAreaFromGps lang={lang} />;
      case "farm-break-even-yield":
        return <FarmBreakEvenYield lang={lang} />;
      case "farm-labor-cost-per-rai":
        return <FarmLaborCostPerRai lang={lang} />;
      case "layer-chicken-farm-profit-cost":
        return <LayerChickenFarmProfitCost lang={lang} />;
      case "pig-farm-profit-cost":
        return <PigFarmProfitCost lang={lang} />;
      case "seeds-per-rai-calculator":
        return <SeedsPerRaiCalculator lang={lang} />;
      case "tractor-rent-vs-buy":
        return <TractorRentVsBuy lang={lang} />;
      case "farm-land-rent-roi":
        return <FarmLandRentRoi lang={lang} />;
      case "food-carbon-footprint":
        return <FoodCarbonFootprint lang={lang} />;
      case "fresh-to-dry-weight":
        return <FreshToDryWeight lang={lang} />;
      case "germination-rate":
        return <GerminationRate lang={lang} />;
      case "harvest-time":
        return <HarvestTime lang={lang} />;
      case "mill-storage-electricity":
        return <MillStorageElectricity lang={lang} />;
      case "product-water-footprint":
        return <ProductWaterFootprint lang={lang} />;
      case "recycled-waste-impact":
        return <RecycledWasteImpact lang={lang} />;
      case "travel-carbon-footprint":
        return <TravelCarbonFootprint lang={lang} />;
      case "water-saving-impact":
        return <WaterSavingImpact lang={lang} />;
      case "car-loan-flat-rate":
        return <CarLoanFlatRate lang={lang} />;
      case "car-loan-used-car":
        return <CarLoanUsedCar lang={lang} />;
      case "cartesian-product":
        return <CartesianProduct lang={lang} />;
      case "cartesian-to-polar":
        return <CartesianToPolar lang={lang} />;
      case "cbm-calculator":
        return <CbmCalculator lang={lang} />;
      case "cgpa-calculator":
        return <CgpaCalculator lang={lang} />;
      case "china-import-lead-time":
        return <ChinaImportLeadTime lang={lang} />;
      case "circadian-rhythm":
        return <CircadianRhythm lang={lang} />;
      case "circumference-calculator":
        return <CircumferenceCalculator lang={lang} />;
      case "code-coverage":
        return <CodeCoverageCalculator lang={lang} />;
      case "coefficient-of-variation":
        return <CoefficientOfVariation lang={lang} />;
      case "cognitive-load":
        return <CognitiveLoad lang={lang} />;
      case "combination-calculator":
        return <CombinationCalculator lang={lang} />;
      case "compound-learning-roi":
        return <CompoundLearning lang={lang} />;
      case "container-weight-capacity":
        return <ContainerCapacity lang={lang} />;
      case "creativity-score":
        return <CreativityScore lang={lang} />;
      case "credit-card-minimum-payment":
        return <CreditCardMinimumPayment lang={lang} />;
      case "cronbach-alpha":
        return <CronbachAlphaCalculator lang={lang} />;
      case "cross-product":
        return <CrossProductCalculator lang={lang} />;
      case "cube-root-calculator":
        return <CubeRootCalculator lang={lang} />;
      case "cumulative-noise":
        return <CumulativeNoise lang={lang} />;
      case "custom-base-logarithm":
        return <CustomBaseLogarithm lang={lang} />;
      case "decile-calculator":
        return <DecileCalculator lang={lang} />;
      case "decimal-to-fraction":
        return <DecimalToFraction lang={lang} />;
      case "decimal-to-roman":
        return <DecimalToRoman lang={lang} />;
      case "decimal-to-scientific-notation":
        return <DecimalToScientificNotation lang={lang} />;
      case "decision-fatigue":
        return <DecisionFatigue lang={lang} />;
      case "deep-work-calculator":
        return <DeepWorkCalculator lang={lang} />;
      case "definite-integral-polynomial":
        return <DefiniteIntegralPolynomial lang={lang} />;
      case "degree-to-radian":
        return <DegreeToRadian lang={lang} />;
      case "diet-environment":
        return <DietEnvironment lang={lang} />;
      case "difference-of-squares":
        return <DifferenceOfSquares lang={lang} />;
      case "digital-detox-time":
        return <DigitalDetoxTime lang={lang} />;
      case "digital-savings-tier-rate":
        return <DigitalSavingsTierRate lang={lang} />;
      case "direct-proportion":
        return <DirectProportion lang={lang} />;
      case "disaster-recovery":
        return <DisasterRecoveryCalculator lang={lang} />;
      case "distance-formula":
        return <DistanceFormula lang={lang} />;
      case "distraction-cost":
        return <DistractionCostCalculator lang={lang} />;
      case "dot-product":
        return <DotProductCalculator lang={lang} />;
      case "dunbar-number":
        return <DunbarNumber lang={lang} />;
      case "email-response-time":
        return <EmailResponseTimeCalculator lang={lang} />;
      case "equilateral-triangle-height":
        return <EquilateralTriangleHeight lang={lang} />;
      case "ergonomic-score":
        return <ErgonomicScore lang={lang} />;
      case "even-odd-function-checker":
        return <EvenOddFunctionChecker lang={lang} />;
      case "expected-value":
        return <ExpectedValue lang={lang} />;
      case "exponent-calculator":
        return <ExponentCalculator lang={lang} />;
      case "exponential-moving-average":
        return <ExponentialMovingAverage lang={lang} />;
      case "factor-generator":
        return <FactorGenerator lang={lang} />;
      case "factorial-calculator":
        return <FactorialCalculator lang={lang} />;
      case "fibonacci-number":
        return <FibonacciNumber lang={lang} />;
      case "five-number-summary":
        return <FiveNumberSummary lang={lang} />;
      case "fixed-deposit-tax-deducted":
        return <FixedDepositCalculator lang={lang} />;
      case "flesch-kincaid-reading-level":
        return <FleschKincaidCalculator lang={lang} />;
      case "fomo-cost":
        return <FomoCost lang={lang} />;
      case "food-delivery-vs-cooking":
        return <FoodDeliveryVsCooking lang={lang} />;
      case "forgetting-curve":
        return <ForgettingCurve lang={lang} />;
      case "fraction-to-decimal":
        return <FractionToDecimal lang={lang} />;
      case "future-value-fv":
        return <FutureValueCalculator lang={lang} />;
      case "gcd-2-numbers":
        return <Gcd2Numbers lang={lang} />;
      case "gcd-3-numbers":
        return <Gcd3Numbers lang={lang} />;
      case "geometric-mean":
        return <GeometricMeanCalculator lang={lang} />;
      case "geometric-series-sum":
        return <GeometricSeriesSum lang={lang} />;
      case "gnh-calculator":
        return <GNHCalculator lang={lang} />;
      case "golden-ratio-calculator":
        return <GoldenRatioCalculator lang={lang} />;
      case "gov-pension-gpf":
        return <GovPensionGpf lang={lang} />;
      case "gov-pension-old":
        return <GovPensionOld lang={lang} />;
      case "gpa-calculator":
        return <GpaCalculator lang={lang} />;
      case "gratitude-journal":
        return <GratitudeJournal lang={lang} />;
      case "habit-streak-calculator":
        return <HabitStreakCalculator lang={lang} />;
      case "hale-calculator":
        return <HaleCalculator lang={lang} />;
      case "happiness-roi":
        return <HappinessRoi lang={lang} />;
      case "harmonic-mean":
        return <HarmonicMeanCalculator lang={lang} />;
      case "hectare-to-acre":
        return <HectareToAcre lang={lang} />;
      case "hectare-to-rai":
        return <HectareToRai lang={lang} />;
      case "hectare-to-sqm":
        return <HectareToSqm lang={lang} />;
      case "herons-formula":
        return <HeronsFormula lang={lang} />;
      case "hex-addition-subtraction":
        return <HexAdditionSubtraction lang={lang} />;
      case "hidden-home-costs":
        return <HiddenHomeCosts lang={lang} />;
      case "home-extra-payment":
        return <HomeExtraPayment lang={lang} />;
      case "home-refinance-savings":
        return <HomeRefinanceSavings lang={lang} />;
      case "improper-to-mixed-fraction":
        return <ImproperToMixedFraction lang={lang} />;
      case "inflation-impact-savings":
        return <InflationImpactSavings lang={lang} />;
      case "integer-division":
        return <IntegerDivision lang={lang} />;
      case "inverse-matrix":
        return <InverseMatrix lang={lang} />;
      case "inverse-proportion":
        return <InverseProportion lang={lang} />;
      case "krejcie-morgan-sample-size":
        return <KrejcieMorganSampleSize lang={lang} />;
      case "kurtosis-calculator":
        return <KurtosisCalculator lang={lang} />;
      case "law-of-cosines":
        return <LawOfCosines lang={lang} />;
      case "law-of-sines":
        return <LawOfSines lang={lang} />;
      case "lcm-2-numbers":
        return <Lcm2Numbers lang={lang} />;
      case "lcm-3-numbers":
        return <Lcm3Numbers lang={lang} />;
      case "learning-rate":
        return <LearningRate lang={lang} />;
      case "legacy-score":
        return <LegacyScore lang={lang} />;
      case "life-satisfaction":
        return <LifeSatisfaction lang={lang} />;
      case "lifetime-healthcare-cost":
        return <LifetimeHealthcareCost lang={lang} />;
      case "limit-calculator":
        return <LimitCalculator lang={lang} />;
      case "linear-regression-line":
        return <LinearRegressionLine lang={lang} />;
      case "log-base-10":
        return <LogBase10 lang={lang} />;
      case "log-base-2":
        return <LogBase2 lang={lang} />;
      case "logic-equivalence-checker":
        return <LogicEquivalenceChecker lang={lang} />;
      case "lux-lighting":
        return <LuxLighting lang={lang} />;
      case "matrix-addition-subtraction":
        return <MatrixAdditionSubtraction lang={lang} />;
      case "matrix-determinant-2x2":
        return <MatrixDeterminant2x2 lang={lang} />;
      case "matrix-determinant-3x3":
        return <MatrixDeterminant3x3 lang={lang} />;
      case "matrix-scalar-multiplication":
        return <MatrixScalarMultiplication lang={lang} />;
      case "matrix-transpose":
        return <MatrixTransposeCalculator lang={lang} />;
      case "mean-calculator":
        return <MeanCalculator lang={lang} />;
      case "mean-deviation":
        return <MeanDeviationCalculator lang={lang} />;
      case "median-calculator":
        return <MedianCalculator lang={lang} />;
      case "meeting-cost-calculator":
        return <MeetingCostCalculator lang={lang} />;
      case "meeting-roi":
        return <MeetingRoiCalculator lang={lang} />;
      case "midpoint-formula":
        return <MidpointFormula lang={lang} />;
      case "minimalism-score":
        return <MinimalismScore lang={lang} />;
      case "mixed-to-improper-fraction":
        return <MixedToImproperFraction lang={lang} />;
      case "mode-calculator":
        return <ModeCalculator lang={lang} />;
      case "modulo-calculator":
        return <ModuloCalculator lang={lang} />;
      case "moq-vs-price":
        return <MoqVsPrice lang={lang} />;
      case "mtbf":
        return <MTBFCalculator lang={lang} />;
      case "mttr":
        return <MTTRCalculator lang={lang} />;
      case "multi-rate-ot":
        return <MultiRateOT lang={lang} />;
      case "natural-log":
        return <NaturalLog lang={lang} />;
      case "net-income-after-tax":
        return <NetIncomeAfterTaxCalculator lang={lang} />;
      case "net-metering-revenue":
        return <NetMeteringRevenue lang={lang} />;
      case "ngan-to-rai":
        return <NganToRai lang={lang} />;
      case "ngan-to-sqm":
        return <NganToSqm lang={lang} />;
      case "ngan-to-sqwa":
        return <NganToSqwa lang={lang} />;
      case "normal-distribution-z-table":
        return <NormalDistributionZTable lang={lang} />;
      case "note-taking":
        return <NoteTaking lang={lang} />;
      case "nsf-savings-calculator":
        return <NsfSavingsCalculator lang={lang} />;
      case "nth-root-calculator":
        return <NthRootCalculator lang={lang} />;
      case "number-to-english-text":
        return <NumberToEnglishText lang={lang} />;
      case "number-to-thai-text":
        return <NumberToThaiText lang={lang} />;
      case "on-grid-solar-payback":
        return <OnGridSolarPayback lang={lang} />;
      case "outliers-calculator":
        return <OutliersCalculator lang={lang} />;
      case "parkinsons-law-calculator":
        return <ParkinsonsLawCalculator lang={lang} />;
      case "pearson-correlation":
        return <PearsonCorrelation lang={lang} />;
      case "percent-difference":
        return <PercentDifferenceCalculator lang={lang} />;
      case "percent-of-value":
        return <PercentOfValue lang={lang} />;
      case "percentage-decrease":
        return <PercentageDecrease lang={lang} />;
      case "percentage-increase":
        return <PercentageIncrease lang={lang} />;
      case "percentile-calculator":
        return <PercentileCalculator lang={lang} />;
      case "permutation-calculator":
        return <PermutationCalculator lang={lang} />;
      case "poisson-distribution":
        return <PoissonDistribution lang={lang} />;
      case "polygon-diagonals":
        return <PolygonDiagonals lang={lang} />;
      case "polygon-exterior-angle":
        return <PolygonExteriorAngle lang={lang} />;
      case "polygon-interior-angle-sum":
        return <PolygonInteriorAngleSum lang={lang} />;
      case "polynomial-derivative":
        return <PolynomialDerivative lang={lang} />;
      case "population-standard-deviation":
        return <PopulationStandardDeviation lang={lang} />;
      case "power-set-size":
        return <PowerSetSize lang={lang} />;
      case "present-value-pv":
        return <PresentValueCalculator lang={lang} />;
      case "prime-number-checker":
        return <PrimeNumberChecker lang={lang} />;
      case "print-cost-per-page":
        return <PrintCostPerPageCalculator lang={lang} />;
      case "probability-calculator":
        return <ProbabilityCalculator lang={lang} />;
      case "prorate-salary":
        return <ProrateSalary lang={lang} />;
      case "pvd-retirement-calculator":
        return <PvdRetirementCalculator lang={lang} />;
      case "pythagoras-hypotenuse":
        return <PythagorasHypotenuse lang={lang} />;
      case "pythagoras-leg":
        return <PythagorasLeg lang={lang} />;
      case "quadratic-equation":
        return <QuadraticEquation lang={lang} />;
      case "quartile-calculator":
        return <QuartileCalculator lang={lang} />;
      case "quartile-deviation":
        return <QuartileDeviationCalculator lang={lang} />;
      case "radian-to-degree":
        return <RadianToDegree lang={lang} />;
      case "rai-to-hectare":
        return <RaiToHectare lang={lang} />;
      case "rai-to-ngan":
        return <RaiToNgan lang={lang} />;
      case "rai-to-sqm":
        return <RaiToSqm lang={lang} />;
      case "rai-to-sqwa":
        return <RaiToSqwa lang={lang} />;
      case "random-number-generator":
        return <RandomNumberGenerator lang={lang} />;
      case "range-calculator":
        return <RangeCalculator lang={lang} />;
      case "reading-comprehension":
        return <ReadingComprehension lang={lang} />;
      case "regression-line":
        return <LinearRegressionLine1 lang={lang} />;
      case "relationship-investment":
        return <RelationshipInvestment lang={lang} />;
      case "reorder-point-calculator":
        return <ReorderPointCalculator lang={lang} />;
      case "roman-to-decimal":
        return <RomanToDecimal lang={lang} />;
      case "rto-rpo":
        return <RtoRpoCalculator lang={lang} />;
      case "safety-stock-calculator":
        return <SafetyStockCalculator lang={lang} />;
      case "sample-size":
        return <KrejcieMorganSampleSize1 lang={lang} />;
      case "sample-standard-deviation":
        return <SampleStandardDeviation lang={lang} />;
      case "scientific-notation-to-decimal":
        return <ScientificNotationToDecimal lang={lang} />;
      case "sector-area-calculator":
        return <SectorAreaCalculator lang={lang} />;
      case "severance-pay-calculator":
        return <SeverancePayCalculator lang={lang} />;
      case "simple-moving-average":
        return <SimpleMovingAverage lang={lang} />;
      case "six-jars-money-management":
        return <SixJarsCalculator lang={lang} />;
      case "skewness-calculator":
        return <SkewnessCalculator lang={lang} />;
      case "skill-half-life":
        return <SkillHalfLife lang={lang} />;
      case "sla-uptime":
        return <SLAUptimeCalculator lang={lang} />;
      case "sleep-debt-calculator":
        return <SleepDebtCalculator lang={lang} />;
      case "slope-formula":
        return <SlopeFormula lang={lang} />;
      case "slope-intercept-equation":
        return <SlopeInterceptEquation lang={lang} />;
      case "social-media-roi":
        return <SocialMediaROI lang={lang} />;
      case "social-security-lump-sum":
        return <SocialSecurityLumpSum lang={lang} />;
      case "social-security-m33-m39":
        return <SocialSecurityM33M39 lang={lang} />;
      case "social-security-m40":
        return <SocialSecurityM40 lang={lang} />;
      case "social-security-pension":
        return <SocialSecurityPension lang={lang} />;
      case "spaced-repetition":
        return <SpacedRepetition lang={lang} />;
      case "spherical-to-cartesian":
        return <SphericalToCartesian lang={lang} />;
      case "sqft-to-sqin":
        return <SqFtToSqIn lang={lang} />;
      case "sqft-to-sqm":
        return <SqFtToSqM lang={lang} />;
      case "sqkm-to-acre":
        return <SqKmToAcre lang={lang} />;
      case "sqkm-to-rai":
        return <SqkmToRai lang={lang} />;
      case "sqkm-to-sqm":
        return <SqkmToSqm lang={lang} />;
      case "sqm-to-acre":
        return <SqmToAcre lang={lang} />;
      case "sqm-to-ngan":
        return <SqmToNgan lang={lang} />;
      case "sqm-to-rai":
        return <SqmToRai lang={lang} />;
      case "sqm-to-sqft":
        return <SqmToSqft lang={lang} />;
      case "sqm-to-sqkm":
        return <SqmToSqkm lang={lang} />;
      case "sqm-to-sqwa":
        return <SqmToSqwa lang={lang} />;
      case "sqm-to-sqyd":
        return <SqmToSqyd lang={lang} />;
      case "square-root-calculator":
        return <SquareRootCalculator lang={lang} />;
      case "sqwa-to-ngan":
        return <SqwaToNgan lang={lang} />;
      case "sqwa-to-rai":
        return <SqwaToRai lang={lang} />;
      case "sqwa-to-sqm":
        return <SqwaToSqm lang={lang} />;
      case "sqyd-to-sqm":
        return <SqYdToSqM lang={lang} />;
      case "standard-deviation":
        return <PopulationStandardDeviation1 lang={lang} />;
      case "standard-error-calculator":
        return <StandardErrorCalculator lang={lang} />;
      case "standing-desk-ratio":
        return <StandingDeskRatio lang={lang} />;
      case "sum-difference-of-cubes":
        return <SumDifferenceOfCubes lang={lang} />;
      case "surface-area-cylinder":
        return <SurfaceAreaCylinder lang={lang} />;
      case "surface-area-sphere":
        return <SurfaceAreaSphere lang={lang} />;
      case "system-of-equations-2-variables":
        return <SystemOfEquations2Variables lang={lang} />;
      case "system-of-equations-3-variables":
        return <SystemOfEquations3Variables lang={lang} />;
      case "t-score-calculator":
        return <TScoreCalculator lang={lang} />;
      case "taro-yamane-sample-size":
        return <TaroYamaneSampleSize lang={lang} />;
      case "task-batching":
        return <TaskBatchingCalculator lang={lang} />;
      case "tax-deduction-donation":
        return <TaxDeductionDonationCalculator lang={lang} />;
      case "tax-deduction-insurance":
        return <TaxDeductionInsurance lang={lang} />;
      case "tax-deduction-rmf":
        return <TaxDeductionRMF lang={lang} />;
      case "tax-deduction-ssf":
        return <TaxDeductionSSF lang={lang} />;
      case "tax-deduction-thaiesg":
        return <TaxDeductionThaiESG lang={lang} />;
      case "ten-thousand-hours":
        return <TenThousandHours lang={lang} />;
      case "thai-post-ems-cost":
        return <ThaiPostEmsCost lang={lang} />;
      case "thai-public-holidays":
        return <ThaiPublicHolidays lang={lang} />;
      case "time-affluence":
        return <TimeAffluence lang={lang} />;
      case "triangle-centroid":
        return <TriangleCentroid lang={lang} />;
      case "trig-arccos":
        return <TrigArcCos lang={lang} />;
      case "trig-arcsin":
        return <TrigArcSin lang={lang} />;
      case "trig-arctan":
        return <TrigArcTan lang={lang} />;
      case "trig-cos":
        return <TrigCos lang={lang} />;
      case "trig-sin":
        return <TrigSin lang={lang} />;
      case "trig-tan":
        return <TrigTan lang={lang} />;
      case "truth-table-2-variables":
        return <TruthTable2Variables lang={lang} />;
      case "truth-table-3-variables":
        return <TruthTable3Variables lang={lang} />;
      case "value-is-what-percent":
        return <ValueIsWhatPercent lang={lang} />;
      case "variance-calculator":
        return <VarianceCalculator lang={lang} />;
      case "vector-magnitude":
        return <VectorMagnitudeCalculator lang={lang} />;
      case "venn-diagram-2-sets":
        return <VennDiagram2Sets lang={lang} />;
      case "venn-diagram-3-sets":
        return <VennDiagram3Sets lang={lang} />;
      case "volume-cone":
        return <VolumeCone lang={lang} />;
      case "volume-cube":
        return <VolumeCube lang={lang} />;
      case "volume-cylinder":
        return <VolumeCylinder lang={lang} />;
      case "volume-pyramid":
        return <VolumePyramid lang={lang} />;
      case "volume-sphere":
        return <VolumeSphere lang={lang} />;
      case "volume-triangular-prism":
        return <VolumeTriangularPrism lang={lang} />;
      case "volumetric-weight":
        return <VolumetricWeightCalculator lang={lang} />;
      case "warehousing-cost":
        return <WarehousingCost lang={lang} />;
      case "weighted-average":
        return <WeightedAverageCalculator lang={lang} />;
      case "wht-1-percent":
        return <WHT1PercentCalculator lang={lang} />;
      case "wht-2-percent":
        return <WHT2PercentCalculator lang={lang} />;
      case "wht-3-percent":
        return <WHT3PercentCalculator lang={lang} />;
      case "wht-5-percent":
        return <WHT5PercentCalculator lang={lang} />;
      case "willpower-depletion":
        return <WillpowerDepletion lang={lang} />;
      case "work-life-balance-score":
        return <WorkLifeBalanceScore lang={lang} />;
      case "working-days-calculator":
        return <WorkingDaysCalculator lang={lang} />;
      case "wpm-productivity":
        return <WpmProductivityCalculator lang={lang} />;
      case "z-score-calculator":
        return <ZScoreCalculator lang={lang} />;

      default:
        return <div className="text-center p-10 text-gray-500">Calculator not found.</div>;
    }
}
