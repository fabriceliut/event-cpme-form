import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cpme_form_data'

const DEMO_DATA = {
  // Step 1
  intitule: 'Déjeuner Club Industrie · Recrutement et attractivité industrielle',
  pole: 'Club Industrie',
  porteur: 'Président·e du Club Industrie',
  cre: 'CRE Industrie',
  date: 'À définir — automne 2026',
  lieu: 'Siège CPME Rhône',
  priorite: 'Indispensable',
  // Step 2
  format: 'Autre',
  formatAutre: 'Déjeuner thématique',
  besoin: 'Tension recrutement remontée par 8 adhérents industriels sur 12 lors du dernier P&V (mars 2026). Sujet n°1 du bilan Club Industrie 2025 et récurrent dans les verbatims AG.',
  repartAvec: '2 dispositifs d\'attractivité concrets transposables · les contacts directs des intervenants · une liste qualifiée d\'acteurs alternance / lycées pros activables sous 30 j · une mise en relation 1:1 sollicitée le jour J.',
  // Step 3
  profil: 'Dirigeants industriels PME et ETI (20-250 salariés)',
  effectif: '35',
  ratioAdherents: '90',
  ratioNonAdherents: '10',
  fonctionPrincipale: 'Travailler',
  fonctionSecondaire: 'Réseauter',
  pilierDefendre: false,
  pilierGrandir: true,
  pilierAider: true,
  // Step 4
  prepaCre: '2',
  prepaGaelle: '0.5',
  prepaFrank: '0.5',
  prepaPresta: '0',
  jourCre: '0.5',
  jourGaelle: '0.5',
  jourFrank: '0.5',
  jourPresta: '0',
  coutTotal: '1800',
  coutDetail: 'Salle siège mutualisée, traiteur 35 couverts, supports impression',
  besoinsMateriels: 'Salle siège CPME, équipement projection, signalétique',
  partenaireType: 'coconstruit',
  partenaireQui: 'CFA partenaire (piste : CFA de l\'Industrie)',
  partenaireRoles: 'Club Industrie : lead événement. CFA : co-construction volet alternance.',
  financementQui: '',
  financementMontant: '',
  financementContrepartie: '',
  ponts: 'Fédération métallurgie locale, ARDI, mission locale dirigeants',
  // Step 5
  indPresenceReelle: '',
  indPresenceCible: '35',
  indConversion: '≥ 1 adhésion dans les 30 j post-événement',
  indNps: '8',
  indSpe1Nom: 'Mises en relation actées (alternance / lycées pros)',
  indSpe1Seuil: '≥ 5 sous 30 j',
  indSpe2Nom: 'Retours d\'expérience écrits remontés',
  indSpe2Seuil: '≥ 3 sous 60 j',
  // Step 6
  echFrank: 'Oui',
  echFrankModalite: 'Créneau introductif 10 min en ouverture',
  divHorsDej: 'Non',
  divHorsDejPrec: '',
  mercredi: 'Non',
  mercrediJour: '',
  // Step 7
  valPorteurNom: 'Président·e Club Industrie',
  valPorteurDate: '',
  valCreNom: 'CRE Industrie',
  valCreDate: '',
  valFrankDate: '',
  valGaelleDate: '',
}

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

  const fillDemo = useCallback(() => {
    const next = { ...INITIAL_DATA, ...DEMO_DATA }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setData(next)
  }, [])

  return { data, handleChange, resetData, fillDemo }
}
