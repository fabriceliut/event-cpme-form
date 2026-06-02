import { ToggleRow, SectionCard } from '../ui/index.jsx'

export default function Step6Orientations({ data, onChange }) {
  return (
    <SectionCard number="6" title="Articulation avec les orientations 2026-2027">
      <p className="text-sm text-slate-500 -mt-2">
        À renseigner même si non concerné — aide Frank et Gaëlle à arbitrer la cohérence du programme.
      </p>

      <div className="space-y-3">
        <ToggleRow
          label="Format d'échange avec Frank Morize"
          name="echFrank"
          value={data.echFrank}
          onChange={onChange}
        />
        <ToggleRow
          label="Diversification hors petit-déj / déj / soirée"
          name="divHorsDej"
          value={data.divHorsDej}
          onChange={onChange}
        />
        <ToggleRow
          label="Développement de partenariats"
          name="devPartenariats"
          value={data.devPartenariats}
          onChange={onChange}
        />
        <ToggleRow
          label="Développement des relations avec des réseaux"
          name="devReseaux"
          value={data.devReseaux}
          onChange={onChange}
        />
        <ToggleRow
          label="Appui sur des actions construites / organisées par des partenaires ou réseaux externes"
          name="appuiPartenaires"
          value={data.appuiPartenaires}
          onChange={onChange}
        />
      </div>
    </SectionCard>
  )
}
