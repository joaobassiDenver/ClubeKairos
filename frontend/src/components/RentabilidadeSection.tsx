import { TrendingUp } from 'lucide-react'
import { DashboardData } from '../types'
import SectionHeader from './SectionHeader'
import PerformanceChart from './PerformanceChart'
import MonthlyReturnsTable from './MonthlyReturnsTable'

interface Props {
  data: DashboardData
}

export default function RentabilidadeSection({ data }: Props) {
  return (
    <div className="space-y-8 animate-slide-up">
      <SectionHeader
        title="Rentabilidade"
        subtitle="Comparativo de performance entre Kairos e o Ibovespa"
        icon={<TrendingUp size={18} />}
      />

      {/* Accumulated Performance Chart */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-white font-semibold">Rentabilidade Acumulada — Kairos × Ibovespa</h3>
          <p className="text-dark-200 text-xs mt-1">
            Evolução de R$ 100,00 investidos desde o início do período
          </p>
        </div>
        <PerformanceChart data={data.performance} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="card-sm bg-dark-800 text-xs text-dark-100 leading-relaxed">
            <strong className="text-white">(¹) Ibovespa:</strong> Principal índice do mercado
            acionário brasileiro, composto pelas empresas mais representativas. Utilizado como
            benchmark para comparação.
          </div>
          <div className="card-sm bg-dark-800 text-xs text-dark-100 leading-relaxed">
            <strong className="text-white">(²) Rentabilidade Acumulada:</strong> Calculada a partir
            de 31/12/2025 até a presente data, considerando um investimento inicial de{' '}
            <strong className="text-white">R$ 100</strong>.
          </div>
        </div>
      </div>

      {/* Monthly Returns Table */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-white font-semibold">Quadro de Rentabilidade Mensal</h3>
          <p className="text-dark-200 text-xs mt-1">
            Retornos mensais do Clube Kairos versus Ibovespa
          </p>
        </div>
        <MonthlyReturnsTable data={data.monthlyReturns} />
      </div>
    </div>
  )
}
