import React, { createContext, useState } from 'react';
import { currencies, exchangeRates } from '../data/currencies';
import { getDefaultCurrency } from '../utils/currencyUtils';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const initialCurrency = getDefaultCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);

  const updateCurrency = (currencyCode) => {
    const currencyInfo = currencies.find(c => c.code === currencyCode);
    if (currencyInfo && exchangeRates[currencyCode]) {
      setSelectedCurrency({
        ...currencyInfo,
        symbol: exchangeRates[currencyCode].symbol,
        rate: exchangeRates[currencyCode].rate,
      });
    }
  };

  const contextValue = {
    selectedCurrency,
    updateCurrency,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};