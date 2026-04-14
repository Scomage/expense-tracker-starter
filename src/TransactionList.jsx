import { useState } from 'react'
import { CATEGORIES, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './constants'
import { formatCurrency } from './formatCurrency'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categoryOptions =
    filterType === "income"  ? INCOME_CATEGORIES  :
    filterType === "expense" ? EXPENSE_CATEGORIES :
    CATEGORIES;

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterCategory("all");
  };

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <label htmlFor="filter-type" className="sr-only">Filter by type</label>
        <select id="filter-type" value={filterType} onChange={handleTypeChange}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="filter-category" className="sr-only">Filter by category</label>
        <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No transactions match the selected filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category.charAt(0).toUpperCase() + t.category.slice(1)}</td>
                <td>
                  <span className={t.type === "income" ? "income-amount" : "expense-amount"}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => onDelete(t.id)} aria-label={`Delete transaction: ${t.description}`}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
