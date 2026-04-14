import { useState } from 'react'
import { CATEGORIES } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);

    if (!description.trim()) {
      setDescriptionError("Description cannot be blank.");
      return;
    }

    if (isNaN(parsed) || parsed <= 0) return;

    setDescriptionError("");
    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parsed,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
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
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="type" className="sr-only">Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="category" className="sr-only">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
