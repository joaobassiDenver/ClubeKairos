import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PerformancePoint } from '../types'

interface Props {
  data: PerformancePoint[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null
  const d = new Date(label ?? '')
  const formatted = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-3 shadow-2xl">
      <p className="text-dark-200 text-xs mb-2">{formatted}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-dark-100">{entry.name}:</span>
          <span className="text-white font-semibold">
            R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PerformanceChart({ data }: Props) {
  const sampled = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 60)) === 0)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={sampled} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a50" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: '#8080a0', fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: '#2a2a50' }}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: '#8080a0', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `R$${v.toFixed(0)}`}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ color: '#c0c0d8', fontSize: '12px', paddingTop: '12px' }}
          formatter={(value) => (value === 'kairos' ? 'Kairos' : 'Ibovespa')}
        />
        <Line
          type="monotone"
          dataKey="kairos"
          name="kairos"
          stroke="#8A03F8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#8A03F8' }}
        />
        <Line
          type="monotone"
          dataKey="ibov"
          name="ibov"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#F59E0B' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
