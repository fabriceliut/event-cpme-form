import { FormGroup, Input, Textarea, SectionCard } from '../ui/index.jsx'

export default function Step5MesureSucces({ data, onChange }) {
  return (
    <SectionCard number="5" title="Mesure de Succès">
      <p className="text-sm text-slate-500 -mt-2">Q9. Comment saurons-nous que c'est réussi ?</p>

      {/* Indicateurs standards */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Indicateurs standards CPME</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Présence mini visée">
            <Input name="indPresenceMini" value={data.indPresenceMini} onChange={onChange} placeholder="Ex : 25 personnes" />
          </FormGroup>
          <FormGroup label="Conversion adhésion">
            <Input name="indConversion" value={data.indConversion} onChange={onChange} placeholder="Ex : ≥ 2 nouvelles adhésions sous 45 j" />
          </FormGroup>
          <FormGroup label="Note d'évaluation post-événement (/10)">
            <Input name="indNote" type="number" min="0" max="10" step="0.5" value={data.indNote} onChange={onChange} placeholder="Ex : 8" />
          </FormGroup>
          <FormGroup label="% recommandation de l'action post-événement">
            <Input name="indRecommandation" type="number" min="0" max="100" value={data.indRecommandation} onChange={onChange} placeholder="Ex : 80" />
          </FormGroup>
        </div>
      </div>

      {/* Indicateurs spécifiques */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
          Indicateurs spécifiques à cette action
          <span className="font-normal normal-case ml-1">(2 max — optionnel, inclure le seuil visé)</span>
        </h3>
        <div className="space-y-3">
          <FormGroup label="Indicateur 1 de réussite spécifique à cette action">
            <Textarea
              name="indSpe1"
              value={data.indSpe1}
              onChange={onChange}
              placeholder="Ex : Mises en relation actées dirigeants ↔ CFA — seuil : ≥ 5 contacts activés sous 30 j"
              className="min-h-[72px]"
            />
          </FormGroup>
          <FormGroup label="Indicateur 2 de réussite spécifique à cette action">
            <Textarea
              name="indSpe2"
              value={data.indSpe2}
              onChange={onChange}
              placeholder="Ex : Témoignages écrits reçus — seuil : ≥ 3 sous 60 j"
              className="min-h-[72px]"
            />
          </FormGroup>
        </div>
      </div>
    </SectionCard>
  )
}
