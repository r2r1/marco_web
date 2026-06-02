export const LEAD_SERVICE_OPTIONS = [
  { value: 'management', label: 'Есть квартира для сдачи' },
  { value: 'renovation', label: 'Нужен ремонт под аренду' },
  { value: 'profit', label: 'Хочу увеличить доходность' },
  { value: 'consultation', label: 'Нужна консультация' },
] as const;

export type LeadServiceValue = (typeof LEAD_SERVICE_OPTIONS)[number]['value'];
