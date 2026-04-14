export const formatCurrency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
