import { exchangeRates, currencies } from '../data/currencies';

const defaultCurrency = currencies.find(c => c.code === 'INR') || currencies[0];

export const formatPrice = (inrPrice, currencyCode) => {
  const rateInfo = exchangeRates[currencyCode] || exchangeRates[defaultCurrency.code];
  const rate = rateInfo.rate;
  const symbol = rateInfo.symbol;
  
  const convertedPrice = inrPrice * rate;
  
  const formattedAmount = convertedPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol}${formattedAmount}`;
};

export const getDefaultCurrency = () => {
    return { 
        ...defaultCurrency,
        symbol: exchangeRates[defaultCurrency.code].symbol 
    };
};