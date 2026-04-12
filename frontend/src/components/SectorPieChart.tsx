import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SectorAllocation } from '../types'

interface Props {
  data: SectorAllocation[]
}

const COLORS = [
  '#8A03F8', '#5E17EB', '#C77DFF', '#F59E0B', '#10B981',
  '#3B82F6', '#EF4444', '#EC4899', '#06B6D4', '#84CC16',
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload || !payload.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-dark-700 border border-dark-500 rounded-xl p-3 shadow-2xl">
      <p className="text-white font-semibold text-sm">{name}</p>
      <p className="text-brand-300 font-bold">{value.toFixed(2)}%</p>
    </div>
  )
}

function CustomLabel({
  cx, cy, midAngle, outerRadius, name, percent,
}: {
  cx: number; cy: number; midAngle: number; outerRadius: number; name: string; percent: number
}) {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const r = outerRadius + 20
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#c0c0d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  )
}

export default function SectorPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={50}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          label={(props) => <CustomLabel {...props} />}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ color: '#c0c0d8', fontSize: '12px' }}
          formatter={(value) => <span className="text-dark-100">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
