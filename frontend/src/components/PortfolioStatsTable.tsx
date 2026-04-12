import { PortfolioStats } from '../types'

interface Props {
  stats: PortfolioStats
}

function StatRow({ label, kairosVal, ibovVal, unit = '', note }: {
  label: string
  kairosVal: string
  ibovVal?: string
  unit?: string
  note?: string
}) {
  return (
    <tr className="border-t border-dark-600 hover:bg-dark-600/40 transition-colors">
      <td className="px-4 py-3 text-dark-100 text-sm">
        {label}
        {note && <span className="text-dark-300 ml-1 text-xs">{note}</span>}
      </td>
      <td className="px-4 py-3 text-center text-white font-semibold text-sm">
        {kairosVal}{unit}
      </td>
      {ibovVal !== undefined && (
        <td className="px-4 py-3 text-center text-amber-300 font-semibold text-sm">
          {ibovVal}{unit}
        </td>
      )}
    </tr>
  )
}

export default function PortfolioStatsTable({ stats }: Props) {
  const fmt = (n: number, d = 4) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="bg-dark-600 text-left px-4 py-2.5 rounded-tl-lg text-dark-200 text-xs font-semibold uppercase tracking-wider">
              Métrica
            </th>
            <th className="bg-dark-600 text-center px-4 py-2.5 text-brand-300 text-xs font-semibold uppercase tracking-wider">
              Kairos
            </th>
            <th className="bg-dark-600 text-center px-4 py-2.5 rounded-tr-lg text-amber-400 text-xs font-semibold uppercase tracking-wider">
              Ibovespa
            </th>
          </tr>
        </thead>
        <tbody>
          <StatRow label="Beta" kairosVal={fmt(stats.beta, 2)} ibovVal="1,00" />
          <StatRow
            label="Desvio Padrão"
            kairosVal={fmt(stats.dpKairos)}
            ibovVal={fmt(stats.dpIbov)}
            unit="%"
          />
          <StatRow
            label="Taxa Selic (a.a.)"
            kairosVal={fmt(stats.selic)}
            ibovVal={fmt(stats.selic)}
            unit="%"
          />
          <StatRow
            label="Selic Equivalente (3m)"
            kairosVal={fmt(stats.selicEquivalente)}
            ibovVal={fmt(stats.selicEquivalente)}
            unit="%"
          />
          <StatRow
            label="Índice de Sharpe"
            kairosVal={fmt(stats.sharpeKairos)}
            ibovVal={fmt(stats.sharpeIbov)}
            note="(*)"
          />
        </tbody>
      </table>
    </div>
  )
}
