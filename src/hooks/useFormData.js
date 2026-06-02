import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cpme_form_data'

const DEMO_DATA = {
  // Step 1 — Identification
  intitule: 'Déjeuner Club Industrie — Recruter et fidéliser dans l\'industrie rhônalpine',
  pole: 'Club Industrie CPME Rhône',
  president: 'Jean-Pierre Favre',
  chefProjet: 'Sophie Mercier',
  date: '2026-10-14',
  lieu: 'Siège CPME Rhône — Salle Confluence, 22 rue de la Charité, Lyon 2e',
  priorite: 'Indispensable',

  // Step 2 — Format & Intention
  format: 'Déjeuner',
  formatAutre: '',
  duree: '12h00 à 14h30 — déjeuner debout, 2h30 dont 45 min d\'échanges experts + permanence conseiller en fin de séance',
  besoin: 'Lors du bilan annuel du Club Industrie (mars 2026), 11 dirigeants sur 14 ont classé la difficulté de recrutement comme obstacle n°1 à leur croissance. Le sujet revient à chaque Regards & Visions et représente 70 % des verbatims de l\'AG 2025. Les adhérents manquent à la fois de méthodes concrètes et de contacts directs avec les acteurs locaux de la formation industrielle. Dernier événement CPME Rhône sur ce sujet : 2023 — besoin de réactualiser.',
  repartAvec: '• 3 leviers d\'attractivité employeur activables immédiatement en PME industrielle (marque employeur, alternance, partenariats lycées pros)\n• Les coordonnées directes des intervenants (OPCO 2i, CFA Industrie ARA) pour donner suite sans intermédiaire\n• La cartographie des dispositifs d\'aide au recrutement disponibles dans le Rhône en 2026–2027\n• Une mise en relation 1:1 initiée le jour J entre les dirigeants volontaires et les partenaires formation présents',

  // Step 3 — Cible & Cadre
  profil: 'Dirigeants et DRH de PME industrielles (15–250 salariés) — métallurgie, plasturgie, mécanique de précision, agroalimentaire du Rhône',
  nbParticipants: '35',
  ratioAdherents: '80',
  fonctionPrincipale: 'Travailler',
  fonctionSecondaire: 'Réseauter',
  pilierDefendre: false,
  pilierGrandir: true,
  pilierAider: true,

  // Step 4 — Charge, Ressources & Écosystème
  prepaOps: '18',
  prepaComm: '7',
  prepaLogistique: '4',
  jourOps: '5',
  jourComm: '2',
  jourLogistique: '3',
  coutTotal: '1750',
  coutDetail: 'Traiteur déjeuner 35 couverts : 1 100 €\nDéfraiement intervenants externes : 400 €\nImpressions (programmes, fiches dispositifs, badges) : 180 €\nDivers (signalétique, fournitures) : 70 €',
  besoinsMateriels: 'Salle Confluence, siège CPME Rhône — configuration U, 40 places\nVidéoprojecteur + écran de projection\nMicro HF sans fil (intervenants)\nBadges nominatifs + kakémonos CPME Rhône\nListe d\'émargement + pochettes participant avec supports',
  partenaireType: 'coconstruit',
  partenaireQui: 'CFA de l\'Industrie Auvergne-Rhône-Alpes + OPCO 2i',
  partenaireRoles: 'CPME Rhône : lead organisation, animation, invitations adhérents, communication\nCFA Industrie ARA : co-construction du programme volet alternance, présentation de 2 dispositifs d\'accueil apprentis\nOPCO 2i : présentation des aides mobilisables en 2026 + permanence conseiller en fin de séance',
  financementQui: 'CFA de l\'Industrie Auvergne-Rhône-Alpes',
  financementMontant: '500',
  financementContrepartie: 'Logo sur l\'invitation, le programme et les supports numériques\nPrise de parole dédiée 10 min en ouverture de séance\nMention dans le compte-rendu diffusé aux participants',
  ponts: 'UIMM Rhône-Alpes\nARDI — Agence Régionale Développement Industriel\nMission locale Grand Lyon\nLycées professionnels du Rhône (Bac Pro Usinage, MEI)\nRégion ARA — dispositifs emploi industriel',

  // Step 5 — Mesure de Succès
  indPresenceMini: '22',
  indConversion: '≥ 2 nouvelles adhésions ou renouvellements actés dans les 45 j post-événement',
  indNote: '8',
  indRecommandation: '80',
  indSpe1: 'Dirigeants ayant initié un contact opérationnel (CFA / OPCO / lycée pro) dans les 30 j — seuil : ≥ 6',
  indSpe2: 'Témoignages écrits exploitables reçus pour capitalisation CPME — seuil : ≥ 3 sous 60 j',

  // Step 6 — Orientations
  echFrank: 'Oui',
  divHorsDej: 'Oui',
  devPartenariats: 'Oui',
  devReseaux: 'Oui',
  appuiPartenaires: 'Non',

  // Step 7 — Validation
  valPorteurNom: 'Jean-Pierre Favre',
  valCreNom: 'Sophie Mercier',
  valSignatureDate: '2026-06-30',
}

const INITIAL_DATA = {
  // Step 1 — Identification
  intitule: '',
  pole: '',
  president: '',
  chefProjet: '',
  date: '',
  lieu: '',
  priorite: '',

  // Step 2 — Format & Intention
  format: '',
  formatAutre: '',
  duree: '',
  besoin: '',
  repartAvec: '',

  // Step 3 — Cible & Cadre
  profil: '',
  nbParticipants: '',
  ratioAdherents: '',
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
  indPresenceMini: '',
  indConversion: '',
  indNote: '',
  indRecommandation: '',
  indSpe1: '',
  indSpe2: '',

  // Step 6 — Orientations
  echFrank: 'Non',
  divHorsDej: 'Non',
  devPartenariats: 'Non',
  devReseaux: 'Non',
  appuiPartenaires: 'Non',

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
