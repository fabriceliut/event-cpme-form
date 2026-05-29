import { FormGroup, Input, SectionCard } from '../ui/index.jsx'

export default function Step7Validation({ data, onChange }) {
  return (
    <SectionCard number="7" title="Validation">
      <p className="text-sm text-slate-500 -mt-2">
        Retour souhaité d'ici le <strong>22 juin 2026</strong> — pour appui ou question, contacter Gaëlle.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Porteur */}
        <div className="p-4 bg-white border-2 border-slate-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Porteur·euse engagé·e</h4>
          <FormGroup label="Nom">
            <Input name="valPorteurNom" value={data.valPorteurNom} onChange={onChange} placeholder="Nom et prénom" />
          </FormGroup>
          <FormGroup label="Date">
            <Input type="date" name="valPorteurDate" value={data.valPorteurDate} onChange={onChange} />
          </FormGroup>
        </div>

        {/* CRE */}
        <div className="p-4 bg-white border-2 border-slate-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">CRE Responsable</h4>
          <FormGroup label="Nom">
            <Input name="valCreNom" value={data.valCreNom} onChange={onChange} placeholder="Nom et prénom" />
          </FormGroup>
          <FormGroup label="Date">
            <Input type="date" name="valCreDate" value={data.valCreDate} onChange={onChange} />
          </FormGroup>
        </div>

        {/* Frank Lebel — champ date libre, nom fixe */}
        <div className="p-4 bg-green-50 border-2 border-green-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest">Validation Frank Lebel</h4>
          <p className="text-xs text-green-600 font-medium">Frank Lebel — CPME Rhône</p>
          <FormGroup label="Date de validation">
            <Input type="date" name="valFrankDate" value={data.valFrankDate} onChange={onChange} className="!bg-white" />
          </FormGroup>
        </div>

        {/* Gaëlle — champ date libre, nom fixe */}
        <div className="p-4 bg-green-50 border-2 border-green-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest">Validation Gaëlle</h4>
          <p className="text-xs text-green-600 font-medium">Gaëlle — CPME Rhône</p>
          <FormGroup label="Date de validation">
            <Input type="date" name="valGaelleDate" value={data.valGaelleDate} onChange={onChange} className="!bg-white" />
          </FormGroup>
        </div>
      </div>
    </SectionCard>
  )
}
