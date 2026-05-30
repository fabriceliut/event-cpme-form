import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles, Check } from 'lucide-react'
import Stepper from './components/Stepper.jsx'
import Step1Identification from './components/steps/Step1Identification.jsx'
import Step2FormatIntention from './components/steps/Step2FormatIntention.jsx'
import Step3CibleCadre from './components/steps/Step3CibleCadre.jsx'
import Step4ChargeRessources from './components/steps/Step4ChargeRessources.jsx'
import Step5MesureSucces from './components/steps/Step5MesureSucces.jsx'
import Step6Orientations from './components/steps/Step6Orientations.jsx'
import Step7Validation from './components/steps/Step7Validation.jsx'
import StepReview from './components/steps/StepReview.jsx'
import { useFormData } from './hooks/useFormData.js'

const TOTAL_STEPS = 8

function validateStep(step, data) {
  const errors = []
  if (step === 1) {
    if (!data.intitule?.trim()) errors.push("L'intitulé de l'action est requis.")
    if (!data.pole?.trim()) errors.push('Le pôle / club porteur est requis.')
    if (!data.porteur?.trim()) errors.push('Le nom du porteur est requis.')
    if (!data.cre?.trim()) errors.push('Le CRE responsable est requis.')
    if (!data.date?.trim()) errors.push('La date / période envisagée est requise.')
    if (!data.lieu?.trim()) errors.push('Le lieu envisagé est requis.')
    if (!data.priorite) errors.push('Le niveau de priorité est requis.')
  }
  if (step === 2) {
    if (!data.format) errors.push('Le format envisagé est requis.')
    if (data.format === 'Autre' && !data.formatAutre?.trim()) errors.push('Précisez le format.')
    if (!data.besoin?.trim()) errors.push('Le besoin adhérent est requis.')
    if (!data.repartAvec?.trim()) errors.push('Le champ "ce avec quoi on repart" est requis.')
  }
  if (step === 3) {
    if (!data.profil?.trim()) errors.push('Le profil dirigeant est requis.')
    if (!data.effectif) errors.push("L'effectif cible est requis.")
    if (data.ratioAdherents === '' || data.ratioAdherents === null) errors.push('Le ratio adhérents est requis.')
    if (!data.fonctionPrincipale) errors.push('La fonction principale est requise.')
    if (!data.pilierDefendre && !data.pilierGrandir && !data.pilierAider) {
      errors.push('Au moins un pilier CPME doit être coché.')
    }
  }
  if (step === 7) {
    if (!data.valPorteurNom?.trim()) errors.push('Le nom du porteur / président est requis.')
    if (!data.valCreNom?.trim()) errors.push('Le nom du CRE est requis.')
    if (!data.valSignatureDate) errors.push('La date de signature est requise.')
  }
  return errors
}

export default function App() {
  const { data, handleChange, resetData, fillDemo, savedAt } = useFormData()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])
  const [showReset, setShowReset] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  useEffect(() => {
    if (!savedAt) return
    setShowSaved(true)
    const t = setTimeout(() => setShowSaved(false), 2000)
    return () => clearTimeout(t)
  }, [savedAt])

  const goNext = () => {
    const errs = validateStep(step, data)
    if (errs.length > 0) {
      setErrors(errs)
      setShowErrors(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors([])
    setShowErrors(false)
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goPrev = () => {
    setErrors([])
    setShowErrors(false)
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const STEPS = [
    <Step1Identification data={data} onChange={handleChange} showErrors={showErrors} />,
    <Step2FormatIntention data={data} onChange={handleChange} showErrors={showErrors} />,
    <Step3CibleCadre data={data} onChange={handleChange} showErrors={showErrors} />,
    <Step4ChargeRessources data={data} onChange={handleChange} />,
    <Step5MesureSucces data={data} onChange={handleChange} />,
    <Step6Orientations data={data} onChange={handleChange} />,
    <Step7Validation data={data} onChange={handleChange} showErrors={showErrors} />,
    <StepReview data={data} />,
  ]

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cpme-blue rounded-xl flex items-center justify-center text-white font-black text-lg select-none flex-shrink-0">
              C
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-tight">Fiche Action / Événement</h1>
              <p className="text-xs font-medium text-slate-500">CPME Rhône · Programme 2026-2027</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {showSaved && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-lg">
                <Check size={12} /> Enregistré
              </span>
            )}
            <button
              onClick={() => { fillDemo(); setStep(1); setErrors([]); setShowErrors(false) }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              title="Remplir avec un exemple"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Exemple</span>
            </button>
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Réinitialiser le formulaire"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
          </div>
        </div>
        {/* Stepper */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 pb-4 pt-2">
          <Stepper current={step} onStepClick={(n) => { setStep(n); setErrors([]); setShowErrors(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
        {/* Erreurs de validation — bandeau compact */}
        {errors.length > 0 && (
          <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-cpme-red text-white text-xs font-black flex items-center justify-center flex-shrink-0">{errors.length}</span>
            <p className="text-sm font-semibold text-red-700">
              {errors.length === 1 ? 'Un champ obligatoire est vide' : `${errors.length} champs obligatoires sont vides`} — ils sont indiqués en rouge ci-dessous.
            </p>
          </div>
        )}

        <form onSubmit={e => e.preventDefault()}>
          <div key={step} className="step-enter">
            {STEPS[step - 1]}
          </div>
        </form>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
            Précédent
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Étape {step} sur {TOTAL_STEPS}
          </span>

          {step < TOTAL_STEPS ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-cpme-blue text-white hover:bg-cpme-lightblue shadow-md shadow-cpme-blue/20 hover:-translate-y-0.5 transition-all"
            >
              Suivant
              <ChevronRight size={18} />
            </button>
          ) : (
            <div className="w-32" /> // placeholder pour garder l'alignement sur la dernière étape
          )}
        </div>
      </div>

      {/* Modal confirmation reset */}
      {showReset && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Réinitialiser le formulaire ?</h3>
            <p className="text-sm text-slate-500 mb-6">Toutes les données saisies seront effacées définitivement.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => { resetData(); setStep(1); setErrors([]); setShowReset(false) }}
                className="flex-1 px-4 py-2.5 bg-cpme-red rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
