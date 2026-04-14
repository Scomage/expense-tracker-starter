export const formatCurrency = (n) => {
  if (typeof n !== 'number' || isNaN(n)) {
    if (process.env.NODE_ENV !== 'production') console.warn('formatCurrency received non-number:', n);
    return '$0.00';
  }
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
