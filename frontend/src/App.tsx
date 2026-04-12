import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import LoadingSpinner from './components/LoadingSpinner'
import OverviewSection from './components/OverviewSection'
import RentabilidadeSection from './components/RentabilidadeSection'
import CarteiraSection from './components/CarteiraSection'
import RiscoSection from './components/RiscoSection'
import RelatoriosSection from './components/RelatoriosSection'
import { DashboardData, Section } from './types'

function App() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<Section>('overview')

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((d: DashboardData) => {
        setData(d)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingSpinner />

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-800">
        <div className="card text-center max-w-md">
          <p className="text-red-400 text-lg font-semibold mb-2">Erro ao carregar dados</p>
          <p className="text-dark-200 text-sm">{error ?? 'Dados indisponíveis'}</p>
          <p className="text-dark-300 text-xs mt-3">
            Verifique se o servidor backend está em execução na porta 8000.
          </p>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection data={data} />
      case 'rentabilidade':
        return <RentabilidadeSection data={data} />
      case 'carteira':
        return <CarteiraSection data={data} />
      case 'risco':
        return <RiscoSection data={data} />
      case 'relatorios':
        return <RelatoriosSection reportDate={data.reportDate} />
    }
  }

  return (
    <div className="flex h-screen bg-dark-800 overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        reportDate={data.reportDate}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 animate-fade-in">{renderSection()}</div>
      </main>
    </div>
  )
}

export default App
