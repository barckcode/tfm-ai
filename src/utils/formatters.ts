export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

export const formatPercentage = (num: number): string => {
  return `${(num * 100).toFixed(1)}%`;
};

export const formatDecimal = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatMonthYear = (year: number, month: number): string => {
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long'
  }).format(date);
};

export const getMonthName = (month: number): string => {
  const date = new Date(2000, month - 1, 1);
  return new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date);
};

export const getCountryName = (code: string): string => {
  const countries: Record<string, string> = {
    'ES': 'España',
    'UK': 'Reino Unido',
    'DE': 'Alemania',
    'FR': 'Francia',
    'IT': 'Italia',
    'NL': 'Países Bajos',
    'SE': 'Suecia',
    'PT': 'Portugal'
  };
  return countries[code] || code;
};
