import { Star, Bookmark, PlusCircle } from 'lucide-react'
import { FormGroup, Input, RadioCard, SectionCard } from '../ui/index.jsx'

export default function Step1Identification({ data, onChange }) {
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
            />
          </FormGroup>
        </div>
        <FormGroup label="Pôle / Club porteur">
          <Input name="pole" value={data.pole} onChange={onChange} placeholder="Ex : Pôle Industrie" />
        </FormGroup>
        <FormGroup label="Porteur·euse engagé·e" required>
          <Input name="porteur" value={data.porteur} onChange={onChange} placeholder="Nom du porteur" />
        </FormGroup>
        <FormGroup label="CRE responsable" required>
          <Input name="cre" value={data.cre} onChange={onChange} placeholder="Nom du/de la CRE" />
        </FormGroup>
        <FormGroup label="Date / période envisagée">
          <Input name="date" value={data.date} onChange={onChange} placeholder="Ex : Mi-octobre 2026" />
        </FormGroup>
        <div className="md:col-span-2">
          <FormGroup label="Lieu envisagé">
            <Input name="lieu" value={data.lieu} onChange={onChange} placeholder="Ex : CCI Lyon, Vénissieux…" />
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
        </FormGroup>
      </div>
    </SectionCard>
  )
}
