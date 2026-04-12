import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import SectionHeader from './SectionHeader'

interface Props {
  reportDate: string
}

export default function RelatoriosSection({ reportDate }: Props) {
  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <SectionHeader
        title="Relatórios"
        subtitle="Faça o download dos relatórios gerenciais do clube"
        icon={<Download size={18} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quota History */}
        <div className="card hover:border-brand-500/40 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet size={22} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Histórico de Cota</h3>
              <p className="text-dark-200 text-sm mb-1">
                Histórico completo de cotas, patrimônio e rentabilidade do clube.
              </p>
              <p className="text-dark-300 text-xs mb-4">
                Referência: {reportDate}
              </p>
              <button
                onClick={() => handleDownload('/api/download/quota-history')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors"
              >
                <Download size={14} />
                Baixar Excel
              </button>
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <div className="card border-dashed opacity-60">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-dark-600 border border-dark-500 flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-dark-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Composição da Carteira</h3>
              <p className="text-dark-200 text-sm mb-1">
                Ativos, setores e pesos da carteira na data de referência.
              </p>
              <p className="text-dark-300 text-xs mb-4">Em breve</p>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-600 border border-dark-500 text-dark-300 rounded-lg text-sm font-medium cursor-not-allowed w-fit">
                <Download size={14} />
                Baixar Excel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="card-sm bg-dark-700 border-dark-500 text-xs text-dark-200 leading-relaxed">
        <strong className="text-white">Aviso:</strong> Os relatórios são gerados com base nos dados
        atualizados da planilha gerencial e estão disponíveis para uso exclusivo dos cotistas do
        Clube de Investimento Kairos.
      </div>
    </div>
  )
}
