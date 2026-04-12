import { MonthlyReturn } from '../types'

interface Props {
  data: {
    columns: string[]
    data: MonthlyReturn[]
  }
}

function formatCell(value: number | string | null): { text: string; cls: string } {
  if (value === null || value === undefined) return { text: '—', cls: 'text-dark-300' }
  if (typeof value === 'number') {
    const pct = (value * 100).toFixed(2)
    const cls = value > 0 ? 'text-emerald-400 font-semibold' : value < 0 ? 'text-red-400 font-semibold' : 'text-dark-200'
    return { text: `${value > 0 ? '+' : ''}${pct}%`, cls }
  }
  return { text: String(value), cls: 'text-dark-100 font-medium' }
}

const ROW_LABELS: Record<number, { label: string; color: string }> = {
  0: { label: 'Kairos', color: 'text-brand-300' },
  1: { label: 'Ibovespa', color: 'text-amber-400' },
}

export default function MonthlyReturnsTable({ data }: Props) {
  const { columns, data: rows } = data

  const displayCols = columns.filter((c) => c !== 'Unnamed: 0' && c.trim() !== '')

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="bg-dark-600 text-left px-4 py-2.5 rounded-tl-lg text-dark-200 text-xs font-semibold uppercase tracking-wider w-24 sticky left-0">
              Fundo
            </th>
            {displayCols.map((col) => (
              <th
                key={col}
                className="bg-dark-600 text-center px-3 py-2.5 text-dark-200 text-xs font-semibold uppercase tracking-wider whitespace-nowrap last:rounded-tr-lg"
              >
                {col === 'Total' ? 'Total' : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const meta = ROW_LABELS[rowIdx] ?? { label: `Linha ${rowIdx + 1}`, color: 'text-white' }
            return (
              <tr
                key={rowIdx}
                className="border-t border-dark-600 hover:bg-dark-600/50 transition-colors"
              >
                <td className="px-4 py-2.5 sticky left-0 bg-dark-700 font-semibold text-sm whitespace-nowrap">
                  <span className={meta.color}>{meta.label}</span>
                </td>
                {displayCols.map((col) => {
                  const val = row[col]
                  const { text, cls } = formatCell(val as number | string | null)
                  return (
                    <td key={col} className={`px-3 py-2.5 text-center whitespace-nowrap ${cls}`}>
                      {text}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
