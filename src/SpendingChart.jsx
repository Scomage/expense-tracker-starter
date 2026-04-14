import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { formatCurrency } from './formatCurrency'

// Colors cycle if there are more categories than entries in this array
const COLORS = ['#0D7377', '#14919B', '#0EA5E9', '#7C3AED', '#047857', '#D97706', '#DC2626']

const TICK_STYLE = { fill: '#9CA3AF', fontSize: 12, fontFamily: 'Manrope, sans-serif', fontWeight: 500 }

const TOOLTIP_STYLE = {
  background: '#FFFFFF',
  border: '1px solid #E4E8EC',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  color: '#111827',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 13,
  fontWeight: 500,
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
          <CartesianGrid vertical={false} stroke="#EEF1F4" />
          <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => formatCurrency(v)} tick={TICK_STYLE} axisLine={false} tickLine={false} width={80} />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Amount']}
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart
