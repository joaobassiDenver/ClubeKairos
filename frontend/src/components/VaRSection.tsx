import { AlertTriangle } from 'lucide-react'
import { VaRData } from '../types'

interface Props {
  varData: VaRData
}

export default function VaRSection({ varData }: Props) {
  const { diasUteis, valorEmRisco, varKairos, varIbov } = varData

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <AlertTriangle size={16} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">VaR — Value at Risk</h3>
          <p className="text-dark-200 text-xs">
            Perda máxima esperada com {diasUteis} dias úteis e confiança de 95%
          </p>
        </div>
      </div>

      <div className="card-sm bg-dark-800 text-xs text-dark-100 leading-relaxed mb-5">
        <strong className="text-white">(*) VaR:</strong> Mede a perda máxima esperada em um
        intervalo de <strong className="text-white">{diasUteis} dias úteis</strong> com intervalo
        de confiança de <strong className="text-white">95%</strong>, considerando um investimento
        de <strong className="text-white">R$ {valorEmRisco.toFixed(2)}</strong>.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kairos VaR */}
        <div className="card-sm bg-dark-800 border-brand-500/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <span className="text-white font-semibold text-sm">Clube Kairos</span>
          </div>
          <p className="text-dark-200 text-xs leading-relaxed">
            Temos uma probabilidade de <strong className="text-white">5%</strong> de perder um
            valor superior a:
          </p>
          <p className="text-3xl font-bold text-red-400 mt-2">
            R$ {varKairos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-dark-300 text-xs mt-1">em {diasUteis} dias úteis</p>
        </div>

        {/* Ibovespa VaR */}
        <div className="card-sm bg-dark-800 border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-white font-semibold text-sm">Ibovespa</span>
          </div>
          <p className="text-dark-200 text-xs leading-relaxed">
            Temos uma probabilidade de <strong className="text-white">5%</strong> de perder um
            valor superior a:
          </p>
          <p className="text-3xl font-bold text-amber-400 mt-2">
            R$ {varIbov.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-dark-300 text-xs mt-1">em {diasUteis} dias úteis</p>
        </div>
      </div>
    </div>
  )
}
