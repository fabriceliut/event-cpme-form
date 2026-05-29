import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Identification' },
  { number: 2, label: 'Format' },
  { number: 3, label: 'Cible' },
  { number: 4, label: 'Ressources' },
  { number: 5, label: 'Succès' },
  { number: 6, label: 'Orientations' },
  { number: 7, label: 'Validation' },
  { number: 8, label: 'PDF' },
]

export default function Stepper({ current }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-max px-4 md:px-0">
        {STEPS.map((step, idx) => {
          const isCompleted = step.number < current
          const isActive = step.number === current
          return (
            <div key={step.number} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${isCompleted ? 'bg-cpme-lightblue text-white' : ''}
                  ${isActive ? 'bg-cpme-blue text-white ring-4 ring-cpme-blue/20' : ''}
                  ${!isCompleted && !isActive ? 'bg-slate-200 text-slate-400' : ''}
                `}>
                  {isCompleted
                    ? <CheckCircle2 size={16} />
                    : <span className="text-xs font-bold">{step.number}</span>
                  }
                </div>
                <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors
                  ${isActive ? 'text-cpme-blue' : isCompleted ? 'text-cpme-lightblue' : 'text-slate-400'}
                `}>
                  {step.label}
                </span>
              </div>
              {/* Connector */}
              {idx < STEPS.length - 1 && (
                <div className={`h-0.5 w-8 md:w-12 mx-1 mb-4 transition-colors
                  ${step.number < current ? 'bg-cpme-lightblue' : 'bg-slate-200'}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
