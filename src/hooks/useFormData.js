import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cpme_form_data'

const DEMO_DATA = {
  // Step 1 — Identification
  intitule: 'Déjeuner Club Industrie · Recrutement et attractivité industrielle',
  pole: 'Club Industrie',
  porteur: 'Marie Dupont',
  cre: 'Thomas Bernard',
  date: '2026-10-15',
  lieu: 'Siège CPME Rhône — Salle Confluence, Lyon 2',
  priorite: 'Indispensable',

  // Step 2 — Format & Intention
  format: 'Déjeuner',
  formatAutre: '',
  besoin: 'Tension recrutement remontée par 8 adhérents industriels sur 12 lors du dernier P&V (mars 2026). Sujet n°1 du bilan Club Industrie 2025 et récurrent dans les verbatims AG. Les dirigeants manquent de méthodes concrètes et de contacts directs avec les acteurs de la formation.',
  repartAvec: '• 2 dispositifs d\'attractivité concrets et transposables immédiatement\n• Les contacts directs des 3 intervenants experts\n• Une liste qualifiée d\'acteurs alternance / lycées pros activables sous 30 j\n• Une mise en relation 1:1 entre dirigeants et CFA souhaitée le jour J',

  // Step 3 — Cible & Cadre
  profil: 'Dirigeants industriels PME et ETI (20–250 salariés), secteurs métallurgie, plasturgie, agroalimentaire',
  effectif: '35',
  ratioAdherents: '85',
  ratioNonAdherents: '15',
  fonctionPrincipale: 'Travailler',
  fonctionSecondaire: 'Réseauter',
  pilierDefendre: false,
  pilierGrandir: true,
  pilierAider: true,

  // Step 4 — Charge, Ressources & Écosystème
  prepaOps: '16',
  prepaComm: '6',
  prepaLogistique: '4',
  jourOps: '4',
  jourComm: '2',
  jourLogistique: '3',
  coutTotal: '1800',
  coutDetail: 'Traiteur déjeuner 35 couverts : 1 200 €\nSupports impression (programmes, badges) : 150 €\nMission intervenant externe : 450 €',
  besoinsMateriels: 'Salle siège CPME (Confluence) avec vidéoprojecteur\nSonorisation portable\nBadges nominatifs + kakémono CPME\nListe émargement',
  partenaireType: 'coconstruit',
  partenaireQui: 'CFA de l\'Industrie Rhône-Alpes',
  partenaireRoles: 'CPME : lead organisation, animation, invitations adhérents\nCFA : co-construction programme volet alternance, présentation de 2 dispositifs concrets',
  financementQui: 'CFA de l\'Industrie Rhône-Alpes',
  financementMontant: '600',
  financementContrepartie: 'Logo sur invitation et programme · Prise de parole 10 min en début de repas',
  ponts: 'Fédération de la métallurgie locale\nARDI (Agence Régionale Développement Industriel)\nMission Locale Dirigeants\nLycées professionnels partenaires (Bac Pro Usinage)',

  // Step 5 — Mesure de Succès
  indPresenceReelle: '20',
  indPresenceCible: '35',
  indConversion: '≥ 1 nouvelle adhésion dans les 30 j post-événement',
  indNps: '8',
  indSpe1Nom: 'Mises en relation actées (dirigeants ↔ CFA / lycées pros)',
  indSpe1Seuil: '≥ 5 contacts activés sous 30 j',
  indSpe2Nom: 'Retours d\'expérience écrits remontés à l\'équipe CPME',
  indSpe2Seuil: '≥ 3 témoignages sous 60 j',

  // Step 6 — Orientations
  echFrank: 'Oui',
  echFrankModalite: 'Ouverture de séance — 5 min de cadrage stratégique CPME sur l\'enjeu recrutement industriel',
  divHorsDej: 'Non',
  divHorsDejPrec: '',
  mercredi: 'Oui',
  mercrediJour: 'Mercredi 15 octobre 2026 — 12h00 à 14h30',

  // Step 7 — Validation
  valPorteurNom: 'Marie Dupont',
  valCreNom: 'Thomas Bernard',
  valSignatureDate: '2026-06-20',
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
  prepaOps: '',
  prepaComm: '',
  prepaLogistique: '',
  jourOps: '',
  jourComm: '',
  jourLogistique: '',
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
  valCreNom: '',
  valSignatureDate: '',
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
  const [savedAt, setSavedAt] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setData(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
    setSavedAt(Date.now())
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

  return { data, handleChange, resetData, fillDemo, savedAt }
}
