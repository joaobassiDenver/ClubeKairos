import { TrendingUp, TrendingDown, Minus, BarChart2, LayoutDashboard } from 'lucide-react'
import { DashboardData } from '../types'
import SectionHeader from './SectionHeader'

interface Props {
  data: DashboardData
}

interface StatCardProps {
  label: string
  value: string
  highlight?: boolean
  trend?: 'up' | 'down' | 'neutral'
}

function StatCard({ label, value, highlight, trend }: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-dark-200'

  return (
    <div
      className={`card flex flex-col gap-2 transition-transform hover:-translate-y-0.5 ${
        highlight ? 'border-brand-500/40 bg-brand-500/5' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-dark-200 text-xs font-medium uppercase tracking-wider">{label}</p>
        {trend && <TrendIcon size={14} className={trendColor} />}
      </div>
      <p
        className={`text-2xl font-bold ${highlight ? 'text-brand-300' : 'text-white'}`}
      >
        {value}
      </p>
    </div>
  )
}

export default function OverviewSection({ data }: Props) {
  const { quotaStats } = data

  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 6, maximumFractionDigits: 6 })

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <SectionHeader
        title="Clube de Investimento Kairos"
        subtitle="Gestão profissional com foco em preservação de capital e crescimento sustentável"
        icon={<LayoutDashboard size={18} />}
      />

      {/* Quote */}
      <div className="card border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-dark-700">
        <div className="flex gap-4 items-start">
          <div className="w-1 h-full bg-brand-500 rounded-full flex-shrink-0 self-stretch min-h-[40px]" />
          <div>
            <p className="text-white/90 text-base font-medium leading-relaxed italic">
              "O verdadeiro objetivo não é buscar ganhos rápidos, mas garantir a{' '}
              <span className="text-brand-300 not-italic font-semibold">
                preservação do capital
              </span>{' '}
              e um crescimento sustentável."
            </p>
            <p className="text-dark-200 text-sm mt-2">
              O <strong className="text-white">Clube de Investimento Kairos</strong> tem como
              objetivo a aquisição de ações focadas no longo prazo, buscando retorno sólido
              compatível com o nível de risco aceitável.
            </p>
          </div>
        </div>
      </div>

      {/* Quota Stats */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={16} className="text-brand-400" />
          <h3 className="text-white font-semibold text-base">Estatísticas da Cota</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Cota Atual"
            value={`R$ ${fmt(quotaStats.current)}`}
            highlight
            trend="up"
          />
          <StatCard label="Cota Mínima" value={`R$ ${fmt(quotaStats.min)}`} trend="down" />
          <StatCard label="Cota Média" value={`R$ ${fmt(quotaStats.avg)}`} trend="neutral" />
          <StatCard label="Cota Máxima" value={`R$ ${fmt(quotaStats.max)}`} trend="up" />
        </div>
      </div>
    </div>
  )
}
