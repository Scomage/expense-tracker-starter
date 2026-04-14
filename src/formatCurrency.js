export const formatCurrency = (n) => {
  if (typeof n !== 'number' || isNaN(n)) return '$0.00';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
