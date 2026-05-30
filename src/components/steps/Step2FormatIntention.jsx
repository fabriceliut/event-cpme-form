import { FormGroup, Input, Textarea, PillRadio, SectionCard } from '../ui/index.jsx'

const FORMATS = ['Apéro', 'Petit-déj', 'Visite', 'Atelier', 'AG', 'Table-ronde', 'Webinaire', 'Autre']

export default function Step2FormatIntention({ data, onChange, showErrors = false }) {
  return (
    <SectionCard number="2" title="Format &amp; Intention">
      <FormGroup label="Q1. Format envisagé" required>
        <div className="flex flex-wrap gap-2 mt-1">
          {FORMATS.map(fmt => (
            <PillRadio
              key={fmt}
              name="format"
              value={fmt}
              checked={data.format === fmt}
              onChange={onChange}
              label={fmt}
            />
          ))}
        </div>
        {data.format === 'Autre' && (
          <div className="mt-3">
            <Input
              name="formatAutre"
              value={data.formatAutre}
              onChange={onChange}
              placeholder="Précisez le format…"
            />
          </div>
        )}
        {showErrors && !data.format && (
          <p className="text-xs text-cpme-red mt-1 font-medium">Veuillez sélectionner un format.</p>
        )}
      </FormGroup>

      <FormGroup
        label="Q2. Besoin adhérent auquel répond cette action"
        required
        hint="Au moins une preuve : demandes, bilan précédent, retour adhérent"
      >
        <Textarea
          name="besoin"
          value={data.besoin}
          onChange={onChange}
          placeholder="Ex : Forte demande des adhérents industriels suite au bilan de l'AG 2025…"
          error={showErrors && !data.besoin?.trim()}
        />
      </FormGroup>

      <FormGroup
        label="Q3. Ce avec quoi le·la participant·e repart"
        hint="Connaissance, contact, méthode, document, décision, mise en relation — mobilisable sous 30 j"
      >
        <Textarea
          name="repartAvec"
          value={data.repartAvec}
          onChange={onChange}
          placeholder="Ex : Un carnet de contacts qualifiés, un guide pratique…"
        />
      </FormGroup>
    </SectionCard>
  )
}
