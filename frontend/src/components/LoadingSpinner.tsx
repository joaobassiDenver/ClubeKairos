export default function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-dark-800">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-dark-500" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-500 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-brand-500/10 flex items-center justify-center">
            <span className="text-brand-400 font-bold text-lg">K</span>
          </div>
        </div>
        <p className="text-white font-semibold text-sm">Carregando dados</p>
        <p className="text-dark-200 text-xs mt-1">Clube de Investimento Kairos</p>
      </div>
    </div>
  )
}
