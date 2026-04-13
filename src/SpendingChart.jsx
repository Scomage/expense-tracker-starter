import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1']

function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')

  const totals = {}
  for (const t of expenses) {
    totals[t.category] = (totals[t.category] || 0) + t.amount
  }

  const data = Object.entries(totals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  if (data.length === 0) return null

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 13 }} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="value">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart
