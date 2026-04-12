import { Shield } from 'lucide-react'
import { DashboardData } from '../types'
import SectionHeader from './SectionHeader'
import PortfolioStatsTable from './PortfolioStatsTable'
import VaRSection from './VaRSection'
import DrawdownChart from './DrawdownChart'

interface Props {
  data: DashboardData
}

export default function RiscoSection({ data }: Props) {
  return (
    <div className="space-y-8 animate-slide-up">
      <SectionHeader
        title="Gestão de Risco"
        subtitle="Métricas de risco e retorno ajustado do portfólio"
        icon={<Shield size={18} />}
      />

      {/* Portfolio Stats */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-white font-semibold">Estatísticas do Portfólio</h3>
          <p className="text-dark-200 text-xs mt-1">
            Beta, Sharpe Ratio, Selic e desvio padrão
          </p>
        </div>
        <PortfolioStatsTable stats={data.portfolioStats} />
        <div className="mt-3 card-sm bg-dark-800 text-xs text-dark-100 leading-relaxed">
          <strong className="text-white">(*) Índice de Sharpe:</strong> mede a relação entre risco
          e retorno de um investimento, indicando se os retornos obtidos foram suficientes para
          compensar a volatilidade assumida. Quanto maior o índice, melhor a rentabilidade
          ajustada ao risco.
        </div>
      </div>

      {/* VaR */}
      <VaRSection varData={data.var} />

      {/* Drawdown */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-white font-semibold">Drawdown Máximo</h3>
          <p className="text-dark-200 text-xs mt-1">
            Queda máxima acumulada em relação ao pico anterior
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-sm bg-dark-800 text-center">
            <p className="text-dark-200 text-xs mb-1">Drawdown Máx. — Kairos</p>
            <p className="text-2xl font-bold text-red-400">
              {data.drawdown.maxKairos.toFixed(2)}%
            </p>
          </div>
          <div className="card-sm bg-dark-800 text-center">
            <p className="text-dark-200 text-xs mb-1">Drawdown Máx. — Ibovespa</p>
            <p className="text-2xl font-bold text-amber-400">
              {data.drawdown.maxIbov.toFixed(2)}%
            </p>
          </div>
        </div>
        <DrawdownChart data={data.drawdown.history} />
      </div>
    </div>
  )
}
