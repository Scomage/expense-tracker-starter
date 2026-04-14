import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#B45309', '#2563EB', '#15803D', '#DC2626', '#7C3AED', '#0891B2', '#D97706']

const TICK_STYLE = { fill: '#A1A1AA', fontSize: 12, fontFamily: 'Figtree, sans-serif' }
const TOOLTIP_STYLE = {
  background: '#FFFFFF',
  border: '1px solid #E4E0D9',
  borderRadius: '8px',
  color: '#18181B',
  fontFamily: 'Figtree, sans-serif',
  fontSize: 13,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

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
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
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
