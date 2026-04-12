import { LayoutDashboard, TrendingUp, PieChart, Shield, Download, Calendar, type LucideIcon } from 'lucide-react'
import { Section } from '../types'

interface SidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  reportDate: string
}

const navItems: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'rentabilidade', label: 'Rentabilidade', icon: TrendingUp },
  { id: 'carteira', label: 'Carteira', icon: PieChart },
  { id: 'risco', label: 'Risco', icon: Shield },
  { id: 'relatorios', label: 'Relatórios', icon: Download },
]

export default function Sidebar({ activeSection, onSectionChange, reportDate }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-dark-700 border-r border-dark-500 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-500">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/30">
            K
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Clube Kairos</p>
            <p className="text-dark-200 text-xs">Denver Asset</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'text-dark-100 hover:bg-dark-600 hover:text-white'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? 'text-brand-400' : 'text-dark-300'}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-500">
        <div className="card-sm bg-dark-800 flex items-center gap-2">
          <Calendar size={14} className="text-brand-400 flex-shrink-0" />
          <div>
            <p className="text-dark-200 text-xs">Relatório em</p>
            <p className="text-white text-xs font-semibold">{reportDate}</p>
          </div>
        </div>
        <p className="text-dark-300 text-xs text-center mt-3">© 2025 Denver Asset</p>
      </div>
    </aside>
  )
}
