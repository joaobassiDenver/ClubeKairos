import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'
import { AllocationPoint } from '../types'

interface Props {
  data: AllocationPoint[]
}

const COLORS = [
  '#8A03F8', '#F59E0B', '#10B981', '#3B82F6',
  '#EC4899', '#06B6D4', '#EF4444', '#84CC16', '#C77DFF',
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
}

function pivotData(data: AllocationPoint[]) {
  const categories = Array.from(new Set(data.map((d) => d.category)))
  const dateMap: Record<string, Record<string, number | string>> = {}

  data.forEach(({ date, category, value }) => {
    if (!dateMap[date]) dateMap[date] = { date }
    dateMap[date][category] = value
  })

  return { pivoted: Object.values(dateMap), categories }
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null
  const d = new Date(label ?? '')
  const fmt = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-3 shadow-2xl">
      <p className="text-dark-200 text-xs mb-2">{fmt}</p>
      {payload
        .filter((e) => e.value > 0)
        .map((e) => (
          <div key={e.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-dark-100">{e.name}:</span>
            <span className="text-white font-semibold">{e.value.toFixed(1)}%</span>
          </div>
        ))}
    </div>
  )
}

export default function AllocationAreaChart({ data }: Props) {
  const { pivoted, categories } = useMemo(() => pivotData(data), [data])

  const sampled = pivoted.filter((_, i) => i % Math.max(1, Math.floor(pivoted.length / 40)) === 0)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={sampled} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          {categories.map((cat, i) => (
            <linearGradient key={cat} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.5} />
              <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
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
          tickFormatter={(v: number) => `${v.toFixed(0)}%`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ color: '#c0c0d8', fontSize: '12px', paddingTop: '12px' }}
        />
        {categories.map((cat, i) => (
          <Area
            key={cat}
            type="monotone"
            dataKey={cat}
            stackId="1"
            stroke={COLORS[i % COLORS.length]}
            fill={`url(#grad-${i})`}
            strokeWidth={1.5}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
