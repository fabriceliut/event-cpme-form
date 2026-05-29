import { Users } from 'lucide-react'
import { FormGroup, Input, Textarea, RadioCard, SectionCard } from '../ui/index.jsx'

const TEAM = [
  { key: 'Cre', label: 'CRE' },
  { key: 'Gaelle', label: 'Gaëlle' },
  { key: 'Frank', label: 'Frank' },
  { key: 'Presta', label: 'Prestataire' },
]

export default function Step4ChargeRessources({ data, onChange }) {
  return (
    <SectionCard number="4" title="Charge, Ressources &amp; Écosystème">
      {/* Q7 Jours-équipe */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} className="text-cpme-lightblue" />
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Q7. Charge équipe &amp; ressources</span>
          <span className="text-xs text-slate-400">— à remplir avec la CRE responsable</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pb-3 pr-4 text-xs font-bold text-slate-500 uppercase tracking-wide w-32"></th>
                {TEAM.map(m => (
                  <th key={m.key} className="pb-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wide text-center">{m.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-4 py-2">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Préparation (j)</span>
                </td>
                {TEAM.map(m => (
                  <td key={m.key} className="px-2 py-2">
                    <Input
                      name={`prepa${m.key}`}
                      type="number"
                      min="0"
                      step="0.5"
                      value={data[`prepa${m.key}`]}
                      onChange={onChange}
                      placeholder="0"
                      className="text-center !px-2 !py-2"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="pr-4 py-2">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Jour J (j)</span>
                </td>
                {TEAM.map(m => (
                  <td key={m.key} className="px-2 py-2">
                    <Input
                      name={`jour${m.key}`}
                      type="number"
                      min="0"
                      step="0.5"
                      value={data[`jour${m.key}`]}
                      onChange={onChange}
                      placeholder="0"
                      className="text-center !px-2 !py-2"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Coûts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <FormGroup label="Coût direct estimé (€)" hint="Lieu, intervenants, restauration, communication, supports">
          <Input name="coutTotal" type="number" min="0" value={data.coutTotal} onChange={onChange} placeholder="Ex : 1500" className="font-bold text-cpme-red" />
        </FormGroup>
        <FormGroup label="Détail du coût">
          <Textarea name="coutDetail" value={data.coutDetail} onChange={onChange} placeholder="Ex : Petit-déjeuner d'accueil (300€)…" className="min-h-[80px]" />
        </FormGroup>
        <div className="md:col-span-2">
          <FormGroup label="Besoins matériels" hint="Salle, équipement, logistique">
            <Textarea name="besoinsMateriels" value={data.besoinsMateriels} onChange={onChange} placeholder="Ex : Sono portable, badges, vidéoprojecteur…" className="min-h-[80px]" />
          </FormGroup>
        </div>
      </div>

      {/* Q8 Partenaires */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Q8. Partenaires &amp; réseaux externes</h3>

        <FormGroup label="Co-construction">
          <div className="flex gap-3 mt-1">
            <RadioCard name="partenaireType" value="seule" checked={data.partenaireType === 'seule'} onChange={onChange} label="CPME seule" />
            <RadioCard name="partenaireType" value="coconstruit" checked={data.partenaireType === 'coconstruit'} onChange={onChange} label="Co-construit" />
          </div>
          {data.partenaireType === 'coconstruit' && (
            <div className="mt-3 space-y-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <Input name="partenaireQui" value={data.partenaireQui} onChange={onChange} placeholder="Nom du partenaire" />
              <Input name="partenaireRoles" value={data.partenaireRoles} onChange={onChange} placeholder="Répartition des rôles" />
            </div>
          )}
        </FormGroup>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup label="Financement / Sponsoring" hint="Sponsoring, partenaires, subventions, partage des coûts">
            <div className="flex gap-2 mb-2">
              <Input name="financementQui" value={data.financementQui} onChange={onChange} placeholder="Sponsor / organisme" className="flex-1" />
              <Input name="financementMontant" value={data.financementMontant} onChange={onChange} placeholder="Montant" className="w-28" />
            </div>
            <Input name="financementContrepartie" value={data.financementContrepartie} onChange={onChange} placeholder="Contrepartie (ex : Logo, prise de parole…)" />
          </FormGroup>

          <FormGroup label="Ponts vers d'autres écosystèmes" hint="Clubs sectoriels, fédérations, acteurs publics, innovation">
            <Textarea name="ponts" value={data.ponts} onChange={onChange} placeholder="Ex : CCI, pôle de compétitivité, Ruche Industrielle…" className="min-h-[80px]" />
          </FormGroup>
        </div>
      </div>
    </SectionCard>
  )
}
