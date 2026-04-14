import { useState } from 'react'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [descriptionError, setDescriptionError] = useState("");
  const [amountError, setAmountError] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);

    let hasError = false;

    if (!description.trim()) {
      setDescriptionError("Description cannot be blank.");
      hasError = true;
    }

    if (isNaN(parsed) || parsed < 0.01) {
      setAmountError("Please enter a valid amount greater than zero.");
      hasError = true;
    }

    if (hasError) return;

    setDescriptionError("");
    setAmountError("");
    onAdd({
      description: description.trim(),
      amount: parsed,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(EXPENSE_CATEGORIES[0]);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    // Reset category to first option of the new type to avoid cross-type mismatch
    const newCategories = newType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setCategory(newCategories[0]);
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description" className="sr-only">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); if (descriptionError) setDescriptionError(""); }}
          aria-describedby={descriptionError ? "description-error" : undefined}
          aria-invalid={!!descriptionError}
        />
        {descriptionError && <span id="description-error" className="field-error">{descriptionError}</span>}
        <label htmlFor="amount" className="sr-only">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          min="0.01"
          step="0.01"
          onChange={(e) => { setAmount(e.target.value); if (amountError) setAmountError(""); }}
          aria-describedby={amountError ? "amount-error" : undefined}
          aria-invalid={!!amountError}
        />
        {amountError && <span id="amount-error" className="field-error">{amountError}</span>}
        <label htmlFor="type" className="sr-only">Type</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="category" className="sr-only">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
