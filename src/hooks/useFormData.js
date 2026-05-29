import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cpme_form_data'

const INITIAL_DATA = {
  // Step 1 — Identification
  intitule: '',
  pole: '',
  porteur: '',
  cre: '',
  date: '',
  lieu: '',
  priorite: '',

  // Step 2 — Format & Intention
  format: '',
  formatAutre: '',
  besoin: '',
  repartAvec: '',

  // Step 3 — Cible & Cadre
  profil: '',
  effectif: '',
  ratioAdherents: '',
  ratioNonAdherents: '',
  fonctionPrincipale: '',
  fonctionSecondaire: '',
  pilierDefendre: false,
  pilierGrandir: false,
  pilierAider: false,

  // Step 4 — Charge & Ressources
  prepaCre: '',
  prepaGaelle: '',
  prepaFrank: '',
  prepaPresta: '',
  jourCre: '',
  jourGaelle: '',
  jourFrank: '',
  jourPresta: '',
  coutTotal: '',
  coutDetail: '',
  besoinsMateriels: '',
  partenaireType: 'seule',
  partenaireQui: '',
  partenaireRoles: '',
  financementQui: '',
  financementMontant: '',
  financementContrepartie: '',
  ponts: '',

  // Step 5 — Mesure de succès
  indPresenceReelle: '',
  indPresenceCible: '',
  indConversion: '',
  indNps: '',
  indSpe1Nom: '',
  indSpe1Seuil: '',
  indSpe2Nom: '',
  indSpe2Seuil: '',

  // Step 6 — Orientations
  echFrank: 'Non',
  echFrankModalite: '',
  divHorsDej: 'Non',
  divHorsDejPrec: '',
  mercredi: 'Non',
  mercrediJour: '',

  // Step 7 — Validation
  valPorteurNom: '',
  valPorteurDate: '',
  valCreNom: '',
  valCreDate: '',
  valFrankDate: '',
  valGaelleDate: '',
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_DATA
    return { ...INITIAL_DATA, ...JSON.parse(raw) }
  } catch {
    return INITIAL_DATA
  }
}

export function useFormData() {
  const [data, setData] = useState(() => loadFromStorage())

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setData(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setData(INITIAL_DATA)
  }, [])

  return { data, handleChange, resetData }
}
