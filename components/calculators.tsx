"use client";
import { useTheme } from "./ThemeProvider";
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

export const Calculators = ({ activeCalc, lang, setCalc }: { activeCalc: string; lang: any; setCalc?: any }) => {
    switch (activeCalc) {
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

      default:
        return <div className="text-center p-10 text-gray-500">Calculator not found.</div>;
    }
}
