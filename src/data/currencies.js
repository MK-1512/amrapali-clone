export const exchangeRates = {
  // Base currency is INR (1 INR = X foreign currency)
  INR: { rate: 1, symbol: '₹' },
  USD: { rate: 0.012, symbol: '$' }, // 1 INR ~ $0.012 (Mock Rate)
  EUR: { rate: 0.011, symbol: '€' },  // 1 INR ~ €0.011 (Mock Rate)
  JPY: { rate: 1.8, symbol: '¥' },  // 1 INR ~ ¥1.8 (Mock Rate)
  GBP: { rate: 0.0095, symbol: '£' },// 1 INR ~ £0.0095 (Mock Rate)
  AUD: { rate: 0.018, symbol: 'A$' },
  CAD: { rate: 0.016, symbol: 'C$' },
  CHF: { rate: 0.0108, symbol: 'Fr' },
  CNY: { rate: 0.087, symbol: '¥' },
  BRL: { rate: 0.06, symbol: 'R$' },
  RUB: { rate: 1.11, symbol: '₽' },
  ZAR: { rate: 0.21, symbol: 'R' },
  SGD: { rate: 0.016, symbol: 'S$' },
  NZD: { rate: 0.0175, symbol: 'NZ$' },
  AED: { rate: 0.044, symbol: 'Dhs' }, // Added AED (Mock Rate based on video preview)
};

export const currencies = [
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'USD', name: 'United States Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'AED', name: 'United Arab Emirates Dirham', flag: '🇦🇪' },
];