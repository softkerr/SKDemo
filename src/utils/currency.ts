export const formatCurrency = (amount: number, currency: 'USD' | 'EUR'): string => {
  const symbol = currency === 'USD' ? '$' : '€';
  return `${symbol}${amount.toLocaleString()}`;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: 'USD' | 'EUR',
  toCurrency: 'USD' | 'EUR',
  rate: number = 0.9
): number => {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === 'USD' ? amount * rate : amount / rate;
};
