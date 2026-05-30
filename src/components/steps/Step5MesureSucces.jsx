import { FormGroup, Input, SectionCard } from '../ui/index.jsx'

export default function Step5MesureSucces({ data, onChange }) {
  return (
    <SectionCard number="5" title="Mesure de Succès">
      <p className="text-sm text-slate-500 -mt-2">Q9. Comment saurons-nous que c'est réussi ?</p>

      {/* Indicateurs standards */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Indicateurs standards CPME</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Présence minimum visée">
            <Input name="indPresenceReelle" value={data.indPresenceReelle} onChange={onChange} placeholder="Ex : 20 personnes" />
          </FormGroup>
          <FormGroup label="Présence idéale" required>
            <Input name="indPresenceCible" type="number" min="0" value={data.indPresenceCible} onChange={onChange} placeholder="Ex : 40 personnes" />
          </FormGroup>
          <FormGroup label="Conversion adhésion à 30 j">
            <Input name="indConversion" value={data.indConversion} onChange={onChange} placeholder="Ex : 2 nouvelles adhésions" />
          </FormGroup>
          <FormGroup label="NPS post-événement (/10)">
            <Input name="indNps" type="number" min="0" max="10" step="0.5" value={data.indNps} onChange={onChange} placeholder="Ex : 8" />
          </FormGroup>
        </div>
      </div>

      {/* Indicateurs spécifiques */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
          Indicateurs spécifiques à cette action <span className="font-normal normal-case">(2 max, avec seuils — optionnel)</span>
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <FormGroup label="Indicateur 1" className="flex-1">
              <Input name="indSpe1Nom" value={data.indSpe1Nom} onChange={onChange} placeholder="Nom de l'indicateur" />
            </FormGroup>
            <div className="sm:w-28 sm:flex-shrink-0">
              <FormGroup label="Seuil visé">
                <Input name="indSpe1Seuil" value={data.indSpe1Seuil} onChange={onChange} placeholder="Ex : 85%" />
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <FormGroup label="Indicateur 2" className="flex-1">
              <Input name="indSpe2Nom" value={data.indSpe2Nom} onChange={onChange} placeholder="Nom de l'indicateur" />
            </FormGroup>
            <div className="sm:w-28 sm:flex-shrink-0">
              <FormGroup label="Seuil visé">
                <Input name="indSpe2Seuil" value={data.indSpe2Seuil} onChange={onChange} placeholder="Ex : > 3" />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
