import { PieChart } from 'lucide-react'
import { DashboardData } from '../types'
import SectionHeader from './SectionHeader'
import SectorPieChart from './SectorPieChart'
import AllocationAreaChart from './AllocationAreaChart'

interface Props {
  data: DashboardData
}

export default function CarteiraSection({ data }: Props) {
  return (
    <div className="space-y-8 animate-slide-up">
      <SectionHeader
        title="Carteira"
        subtitle="Composição e evolução da alocação do portfólio"
        icon={<PieChart size={18} />}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sector Pie Chart */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-white font-semibold">Diversificação por Setor</h3>
            <p className="text-dark-200 text-xs mt-1">
              Participação percentual de cada setor no patrimônio
            </p>
          </div>
          <SectorPieChart data={data.sectorAllocation} />
        </div>

        {/* Allocation Area Chart */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-white font-semibold">Evolução da Alocação por Categoria</h3>
            <p className="text-dark-200 text-xs mt-1">
              Distribuição percentual ao longo do tempo
            </p>
          </div>
          <AllocationAreaChart data={data.portfolioAllocation} />
        </div>
      </div>
    </div>
  )
}
