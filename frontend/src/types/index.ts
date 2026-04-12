export interface QuotaStats {
  current: number
  min: number
  max: number
  avg: number
}

export interface PerformancePoint {
  date: string
  ibov: number
  kairos: number
}

export interface MonthlyReturn {
  [key: string]: number | string | null
}

export interface SectorAllocation {
  name: string
  value: number
}

export interface AllocationPoint {
  date: string
  category: string
  value: number
}

export interface PortfolioStats {
  beta: number
  dpKairos: number
  dpIbov: number
  selic: number
  selicEquivalente: number
  sharpeKairos: number
  sharpeIbov: number
}

export interface VaRData {
  diasUteis: number
  valorEmRisco: number
  varKairos: number
  varIbov: number
}

export interface DrawdownPoint {
  date: string
  kairos: number
  ibov: number
}

export interface DashboardData {
  reportDate: string
  quotaStats: QuotaStats
  performance: PerformancePoint[]
  monthlyReturns: {
    columns: string[]
    data: MonthlyReturn[]
  }
  sectorAllocation: SectorAllocation[]
  portfolioAllocation: AllocationPoint[]
  portfolioStats: PortfolioStats
  var: VaRData
  drawdown: {
    maxKairos: number
    maxIbov: number
    history: DrawdownPoint[]
  }
}

export type Section = 'overview' | 'rentabilidade' | 'carteira' | 'risco' | 'relatorios'
