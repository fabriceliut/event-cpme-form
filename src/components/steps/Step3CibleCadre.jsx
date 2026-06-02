import { Users } from 'lucide-react'
import { FormGroup, Input, RadioCard, Checkbox, SectionCard } from '../ui/index.jsx'

const FONCTIONS = ['Réseauter', 'Mettre en avant', 'Travailler', 'Défendre & Représenter']

export default function Step3CibleCadre({ data, onChange, showErrors = false }) {
  return (
    <SectionCard number="3" title="Cible &amp; Cadre CPME">
      {/* Q4 */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Users size={16} className="text-cpme-lightblue" />
          Q4. Qui doit être présent et combien ?
        </h3>
        <p className="text-xs text-slate-500 mb-4">Profil dirigeant, nbre de participants</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormGroup label="Profil dirigeant" required>
            <Input name="profil" value={data.profil} onChange={onChange} placeholder="Ex : PME Industrielles" error={showErrors && !data.profil?.trim()} />
          </FormGroup>
          <FormGroup label="Nbre de participants" required>
            <Input name="nbParticipants" type="number" min="0" value={data.nbParticipants} onChange={onChange} placeholder="Ex : 35" error={showErrors && !data.nbParticipants} />
          </FormGroup>
          <FormGroup label="Ratio Adhérents %" required>
            <div className="flex items-center gap-2">
              <Input
                name="ratioAdherents"
                type="number" min="0" max="100"
                value={data.ratioAdherents}
                onChange={onChange}
                placeholder="80"
                className="text-center"
                error={showErrors && (data.ratioAdherents === '' || data.ratioAdherents === null)}
              />
              <span className="text-slate-400 font-bold text-sm flex-shrink-0">%</span>
            </div>
            {data.ratioAdherents !== '' && (
              <p className="text-xs text-slate-400 mt-1">Non-adhérents : {Math.max(0, 100 - Number(data.ratioAdherents))}%</p>
            )}
          </FormGroup>
        </div>
      </div>

      {/* Q5 */}
      <FormGroup
        label="Q5. Fonction principale de l'action"
        required
        hint="Une seule principale — secondaire facultative"
      >
        <div className="grid grid-cols-2 gap-3 mt-1">
          {FONCTIONS.map(f => (
            <RadioCard
              key={f}
              name="fonctionPrincipale"
              value={f}
              checked={data.fonctionPrincipale === f}
              onChange={onChange}
              label={f}
            />
          ))}
        </div>        {showErrors && !data.fonctionPrincipale && (
          <p className="text-xs text-cpme-red mt-1 font-medium">Veuillez sélectionner une fonction principale.</p>
        )}        <div className="mt-3">
          <FormGroup label="Fonction secondaire (optionnel)">
            <div className="flex flex-wrap gap-2">
              {FONCTIONS.filter(f => f !== data.fonctionPrincipale).map(f => (
                <label key={f}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-semibold cursor-pointer transition-all
                    ${data.fonctionSecondaire === f
                      ? 'bg-slate-600 text-white border-slate-600'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                    }`}
                >
                  <input type="radio" name="fonctionSecondaire" value={f} checked={data.fonctionSecondaire === f} onChange={onChange} className="hidden" />
                  {f}
                </label>
              ))}
              {data.fonctionSecondaire && (
                <button type="button" onClick={() => onChange({ target: { name: 'fonctionSecondaire', value: '' } })}
                  className="px-3 py-1.5 border rounded-lg text-xs font-semibold text-slate-400 border-dashed border-slate-300 hover:text-slate-600 transition-colors"
                >
                  Aucune
                </button>
              )}
            </div>
          </FormGroup>
        </div>
      </FormGroup>

      {/* Q6 */}
      <FormGroup label="Q6. Pilier CPME servi" required hint="Au moins un">
        <div className={`flex flex-col gap-2 mt-1 rounded-xl transition-all ${showErrors && !data.pilierDefendre && !data.pilierGrandir && !data.pilierAider ? 'p-3 border border-cpme-red bg-red-50' : ''}`}>
          <Checkbox name="pilierDefendre" checked={data.pilierDefendre} onChange={onChange} label="Représenter et défendre la voix patronale" />
          <Checkbox name="pilierGrandir" checked={data.pilierGrandir} onChange={onChange} label="Faire grandir les dirigeants et les entreprises" />
          <Checkbox name="pilierAider" checked={data.pilierAider} onChange={onChange} label="Rompre la solitude du dirigeant par le réseau, les collectifs et les mises en relation" />
        </div>
        {showErrors && !data.pilierDefendre && !data.pilierGrandir && !data.pilierAider && (
          <p className="text-xs text-cpme-red mt-1 font-medium">Cochez au moins un pilier CPME.</p>
        )}
      </FormGroup>
    </SectionCard>
  )
}
