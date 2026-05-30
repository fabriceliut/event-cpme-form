import { Star, Bookmark, PlusCircle } from 'lucide-react'
import { FormGroup, Input, RadioCard, SectionCard } from '../ui/index.jsx'

export default function Step1Identification({ data, onChange, showErrors = false }) {
  return (
    <SectionCard number="1" title="Identification">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormGroup label="Intitulé de l'action" required>
            <Input
              name="intitule"
              value={data.intitule}
              onChange={onChange}
              placeholder="Ex : Visite d'entreprise — Transition Écologique"
              className="text-base font-bold"
              error={showErrors && !data.intitule?.trim()}
            />
          </FormGroup>
        </div>
        <FormGroup label="Pôle / Club porteur" required>
          <Input name="pole" value={data.pole} onChange={onChange} placeholder="Ex : Pôle Industrie" error={showErrors && !data.pole?.trim()} />
        </FormGroup>
        <FormGroup label="Porteur·euse engagé·e" required>
          <Input name="porteur" value={data.porteur} onChange={onChange} placeholder="Nom du porteur" error={showErrors && !data.porteur?.trim()} />
        </FormGroup>
        <FormGroup label="CRE responsable" required>
          <Input name="cre" value={data.cre} onChange={onChange} placeholder="Nom du/de la CRE" error={showErrors && !data.cre?.trim()} />
        </FormGroup>
        <FormGroup label="Date / période envisagée" required>
          <Input name="date" value={data.date} onChange={onChange} placeholder="Ex : Mi-octobre 2026" error={showErrors && !data.date?.trim()} />
        </FormGroup>
        <div className="md:col-span-2">
          <FormGroup label="Lieu envisagé" required>
            <Input name="lieu" value={data.lieu} onChange={onChange} placeholder="Ex : CCI Lyon, Vénissieux…" error={showErrors && !data.lieu?.trim()} />
          </FormGroup>
        </div>
      </div>

      <div className="mt-2">
        <FormGroup label="Niveau de priorité" required>
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <RadioCard
              name="priorite"
              value="Indispensable"
              checked={data.priorite === 'Indispensable'}
              onChange={onChange}
              label="🔴 Indispensable"
              icon={Star}
            />
            <RadioCard
              name="priorite"
              value="Important"
              checked={data.priorite === 'Important'}
              onChange={onChange}
              label="🟠 Important"
              icon={Bookmark}
            />
            <RadioCard
              name="priorite"
              value="Bonus"
              checked={data.priorite === 'Bonus'}
              onChange={onChange}
              label="🟢 Bonus"
              icon={PlusCircle}
            />
          </div>
          {showErrors && !data.priorite && (
            <p className="text-xs text-cpme-red mt-2 font-medium">Veuillez sélectionner un niveau de priorité.</p>
          )}
        </FormGroup>
      </div>
    </SectionCard>
  )
}
