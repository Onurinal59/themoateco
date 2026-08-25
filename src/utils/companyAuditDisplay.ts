const DEFAULT_COMPANY_NAME_EN = "New Analyzed Company (TICKER)";
const DEFAULT_COMPANY_NAME_TR = "Yeni Analiz Edilen Şirket (TICKER)";

export const getDisplayName = (name: string, isEnglish: boolean): string => {
  const isDefault = name === DEFAULT_COMPANY_NAME_EN || name === DEFAULT_COMPANY_NAME_TR;

  if (isDefault) {
    return isEnglish ? DEFAULT_COMPANY_NAME_EN : DEFAULT_COMPANY_NAME_TR;
  }

  return name;
};

export { DEFAULT_COMPANY_NAME_EN, DEFAULT_COMPANY_NAME_TR };
