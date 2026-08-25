import type { CompanyAuditDossier, FinancialMetricInputs } from "../types";

const MOAT_LEVELS = new Set(["düşük", "orta", "yüksek"]);
const ADVANTAGE_TYPES = new Set(["tüketici_avantajı", "üretim_avantajı", "ölçek_avantajı", "yok"]);
const DISCIPLINE_LEVELS = new Set(["mükemmel", "ortalama", "kötü"]);
const MOAT_WIDTHS = new Set(["Geniş Hendek (Wide)", "Dar Hendek (Narrow)", "Hendek Yok (None)"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown, min = -Infinity, max = Infinity): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFinancialMetricInputs(value: unknown): value is FinancialMetricInputs {
  if (!isRecord(value)) return false;

  return (
    isFiniteNumber(value.revenue, 0) &&
    isFiniteNumber(value.operatingIncome) &&
    isFiniteNumber(value.effectiveTaxRate, 0, 100) &&
    isFiniteNumber(value.totalAssets, 0) &&
    isFiniteNumber(value.cashAndEquivalents, 0) &&
    isFiniteNumber(value.nonInterestCurrentLiabilities, 0) &&
    isFiniteNumber(value.wacc, 0, 100)
  );
}

export function isCompanyAuditDossier(value: unknown): value is CompanyAuditDossier {
  if (!isRecord(value)) return false;
  if (!isNonEmptyString(value.id) || !isNonEmptyString(value.companyName) || !isNonEmptyString(value.ticker)) return false;
  if (!isNonEmptyString(value.industry) || typeof value.description !== "string") return false;
  if (!isFinancialMetricInputs(value.financials)) return false;
  if (!isRecord(value.industryStructure) || !isRecord(value.competitiveAdvantage)) return false;
  if (!isRecord(value.interactionAndDiscipline) || !isRecord(value.sustainability)) return false;

  const industry = value.industryStructure;
  if (
    !MOAT_LEVELS.has(String(industry.supplierPower)) ||
    !MOAT_LEVELS.has(String(industry.buyerPower)) ||
    !MOAT_LEVELS.has(String(industry.threatOfNewEntrants)) ||
    !MOAT_LEVELS.has(String(industry.threatOfSubstitutes)) ||
    !MOAT_LEVELS.has(String(industry.industryRivalry)) ||
    typeof industry.profitPoolPosition !== "string"
  ) {
    return false;
  }

  const advantage = value.competitiveAdvantage;
  if (
    !ADVANTAGE_TYPES.has(String(advantage.primaryType)) ||
    !Array.isArray(advantage.subDrivers) ||
    !advantage.subDrivers.every((driver) => typeof driver === "string") ||
    typeof advantage.pricingPowerEvidence !== "string" ||
    typeof advantage.costAdvantageEvidence !== "string"
  ) {
    return false;
  }

  const discipline = value.interactionAndDiscipline;
  if (
    !MOAT_LEVELS.has(String(discipline.capacityDiscipline)) ||
    !MOAT_LEVELS.has(String(discipline.priceWarRisk)) ||
    !DISCIPLINE_LEVELS.has(String(discipline.managementCapitalAllocation))
  ) {
    return false;
  }

  const sustainability = value.sustainability;
  if (
    !isFiniteNumber(sustainability.estimatedCapYears, 0) ||
    !MOAT_WIDTHS.has(String(sustainability.moatWidth)) ||
    typeof sustainability.keyVulnerability !== "string"
  ) {
    return false;
  }

  if (typeof value.notes !== "string" || typeof value.updatedAt !== "string") return false;
  if (value.createdAt !== undefined && typeof value.createdAt !== "string") return false;
  if (value.isCustom !== undefined && typeof value.isCustom !== "boolean") return false;
  if (value.lastStep !== undefined && (!isFiniteNumber(value.lastStep, 1, 5) || !Number.isInteger(value.lastStep))) return false;
  if (value.tags !== undefined && (!Array.isArray(value.tags) || !value.tags.every((tag) => typeof tag === "string"))) return false;

  return true;
}

export function isCompanyAuditDossierArray(value: unknown): value is CompanyAuditDossier[] {
  return Array.isArray(value) && value.length > 0 && value.every(isCompanyAuditDossier);
}
