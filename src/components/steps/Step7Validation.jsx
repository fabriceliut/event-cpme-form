import { FormGroup, Input, SectionCard } from '../ui/index.jsx'

export default function Step7Validation({ data, onChange, showErrors = false }) {
  return (
    <SectionCard number="7" title="Validation">
      <p className="text-sm text-slate-500 -mt-2">
        Retour souhaité d'ici le <strong>22 juin 2026</strong> — pour appui ou question, contacter Gaëlle.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Porteur / Président */}
        <div className="p-4 bg-white border-2 border-slate-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Porteur·euse / Président·e de club</h4>
          <FormGroup label="Nom et prénom" required>
            <Input name="valPorteurNom" value={data.valPorteurNom} onChange={onChange} placeholder="Nom et prénom" error={showErrors && !data.valPorteurNom?.trim()} />
          </FormGroup>
        </div>

        {/* CRE */}
        <div className="p-4 bg-white border-2 border-slate-100 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">CRE Responsable</h4>
          <FormGroup label="Nom et prénom" required>
            <Input name="valCreNom" value={data.valCreNom} onChange={onChange} placeholder="Nom et prénom" error={showErrors && !data.valCreNom?.trim()} />
          </FormGroup>
        </div>
      </div>

      <div className="mt-4">
        <FormGroup label="Date de signature" required>
          <Input type="date" name="valSignatureDate" value={data.valSignatureDate} onChange={onChange} error={showErrors && !data.valSignatureDate} />
        </FormGroup>
      </div>

      <div className="mt-4 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
        <p className="text-xs text-slate-500 font-medium">
          📩 La validation finale par Frank Lebel et Gaëlle sera complétée par l'équipe CPME Rhône après réception de la fiche.
        </p>
      </div>
    </SectionCard>
  )
}
