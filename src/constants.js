export const INCOME_CATEGORIES = ["salary", "freelance", "other"];
export const EXPENSE_CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "other"];

// Combined list used for the filter dropdown (all possible categories)
export const CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];
