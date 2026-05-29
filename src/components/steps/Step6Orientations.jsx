import { Input, ToggleRow, SectionCard } from '../ui/index.jsx'

export default function Step6Orientations({ data, onChange }) {
  return (
    <SectionCard number="6" title="Articulation avec les orientations 2026-2027">
      <p className="text-sm text-slate-500 -mt-2">
        À cocher même si non concerné — aide Frank et Gaëlle à arbitrer la cohérence du programme.
      </p>

      <div className="space-y-3">
        <ToggleRow
          label="Format d'échange avec Frank MORIZE"
          name="echFrank"
          value={data.echFrank}
          onChange={onChange}
        >
          <Input
            name="echFrankModalite"
            value={data.echFrankModalite}
            onChange={onChange}
            placeholder="Modalité d'échange (ex : mot d'introduction, table-ronde…)"
          />
        </ToggleRow>

        <ToggleRow
          label="Diversification hors petit-déj / déj / soirée"
          name="divHorsDej"
          value={data.divHorsDej}
          onChange={onChange}
        >
          <Input
            name="divHorsDejPrec"
            value={data.divHorsDejPrec}
            onChange={onChange}
            placeholder="Précision (ex : visite terrain active, atelier…)"
          />
        </ToggleRow>

        <ToggleRow
          label="Créneau mercredi privilégié"
          name="mercredi"
          value={data.mercredi}
          onChange={onChange}
        >
          <Input
            name="mercrediJour"
            value={data.mercrediJour}
            onChange={onChange}
            placeholder="Jour pressenti (ex : Mercredi matin)"
          />
        </ToggleRow>
      </div>
    </SectionCard>
  )
}
