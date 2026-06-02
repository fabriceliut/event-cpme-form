export default function PdfTemplate({ data }) {
  const piliers = [
    data.pilierDefendre && 'Représenter et défendre la voix patronale',
    data.pilierGrandir && 'Faire grandir les dirigeants et les entreprises',
    data.pilierAider && 'Rompre la solitude du dirigeant par le réseau, les collectifs et les mises en relation',
  ].filter(Boolean)

  const fmt = (v, fallback = '—') => (v && String(v).trim()) ? v : fallback

  return (
    <div id="pdf-template" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: 'white', padding: '12mm', color: '#1e293b', fontSize: '13px' }}>

      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '4px solid #0F3057', paddingBottom: '14px', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#E63946', marginBottom: '4px' }}>
            Programme 2026-2027
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F3057', textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1, margin: 0 }}>
            Fiche Action / Événement
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px', color: '#0F3057', lineHeight: 1 }}>
            CPME<span style={{ color: '#E63946' }}>.</span>
          </div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Rhône</div>
        </div>
      </div>

      {/* Section 1 */}
      <div style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
        <SectionHeader label="1 · Identification" />
        <Table rows={[
          ['Intitulé', <strong style={{ color: '#0F3057', fontSize: '14px' }}>{fmt(data.intitule)}</strong>],
          ['Pôle / Club', fmt(data.pole)],
          ['Présidence engagée', fmt(data.president)],
          ['Chef de projet', fmt(data.chefProjet)],
          ['Date', fmt(data.date)],
          ['Lieu', fmt(data.lieu)],
          ['Priorité', <strong style={{ color: '#E63946' }}>{fmt(data.priorite)}</strong>],
        ]} />
      </div>

      {/* Section 2 */}
      <div style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
        <SectionHeader label="2 · Format &amp; Intention" />
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
          <Row label="Format envisagé">
            <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, color: '#0F3057' }}>
              {data.format === 'Autre' ? fmt(data.formatAutre) : fmt(data.format)}
            </span>
          </Row>
          {data.duree && <Row label="Durée / horaires">{fmt(data.duree)}</Row>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
            <div>
              <Label>Q2 — Besoin adhérent</Label>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{fmt(data.besoin)}</p>
            </div>
            <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
              <Label>Q3 — Ce avec quoi le participant repart</Label>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{fmt(data.repartAvec)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
        <SectionHeader label="3 · Cible &amp; Cadre CPME" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Table rows={[
            ['Profil dirigeant', fmt(data.profil)],
          ['Nbre de participants', fmt(data.nbParticipants)],
            ['Ratio (Adh. / Non-adh.)', `${fmt(data.ratioAdherents, '0')}% / ${Math.max(0, 100 - Number(data.ratioAdherents || 0))}%`],
          ]} />
          <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
            <Row label="Fonction principale">
              <strong style={{ color: '#0F3057' }}>{fmt(data.fonctionPrincipale)}</strong>
              {data.fonctionSecondaire && <span style={{ color: '#64748b' }}> / {data.fonctionSecondaire}</span>}
            </Row>
            <div style={{ marginTop: '8px' }}>
              <Label>Piliers CPME</Label>
              {piliers.length > 0 ? piliers.map(p => <div key={p} style={{ margin: '2px 0' }}>• {p}</div>) : <span>—</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Saut de page */}
      <div style={{ pageBreakBefore: 'always', height: '4mm' }} />

      {/* Section 4 */}
      <div style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
        <SectionHeader label="4 · Charge, Ressources &amp; Écosystème" />

        {/* Tableau jours */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          {[
            { title: 'Temps Préparation (heures)', keys: ['prepaOps', 'prepaComm', 'prepaLogistique'] },
            { title: 'Temps Jour J (heures)', keys: ['jourOps', 'jourComm', 'jourLogistique'] },
          ].map(block => (
            <div key={block.title} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#f1f5f9', padding: '6px 10px', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#475569', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>{block.title}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', textAlign: 'center', padding: '8px 0' }}>
                {['Opération', 'Communication', 'Logistique'].map((lbl, i) => (
                  <div key={lbl}>
                    <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{lbl}</div>
                    <div style={{ fontWeight: 700 }}>{fmt(data[block.keys[i]], '0')}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '8px' }}>
            <Label>Coût direct estimé</Label>
            <strong style={{ color: '#E63946', fontSize: '16px' }}>{data.coutTotal ? `${data.coutTotal} €` : '—'}</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><Label>Détail financier</Label><p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{fmt(data.coutDetail)}</p></div>
            <div><Label>Besoins matériels</Label><p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{fmt(data.besoinsMateriels)}</p></div>
          </div>
        </div>

        <Table rows={[
          ['Co-construction', data.partenaireType === 'seule' ? 'CPME seule' : `Avec : ${fmt(data.partenaireQui)} — Rôles : ${fmt(data.partenaireRoles)}`],
          ['Financement externe', data.financementQui ? `${data.financementQui} (${data.financementMontant}) — Contrepartie : ${data.financementContrepartie}` : '—'],
          ['Ponts écosystème', fmt(data.ponts)],
        ]} />
      </div>

      {/* Sections 5 & 6 côte à côte */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', pageBreakInside: 'avoid' }}>
        <div>
          <SectionHeader label="5 · Mesure de Succès" />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <tbody>
              {[
                ['Présence mini visée', fmt(data.indPresenceMini)],
                ['Conversion adhésion', fmt(data.indConversion)],
                ['Note évaluation (/10)', fmt(data.indNote)],
                ['% recommandation', data.indRecommandation ? `${data.indRecommandation}%` : '—'],
                data.indSpe1 && ['Indicateur 1', data.indSpe1],
                data.indSpe2 && ['Indicateur 2', data.indSpe2],
              ].filter(Boolean).map(([lbl, val], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white', borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600, fontSize: '11px' }}>{lbl}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700, textAlign: 'right', color: '#0F3057' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <SectionHeader label="6 · Orientations" />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <tbody>
              {[
                ['Format d\'échange avec Frank Morize', data.echFrank],
                ['Diversification hors petit-déj/déj/soirée', data.divHorsDej],
                ['Développement de partenariats', data.devPartenariats],
                ['Développement des relations réseaux', data.devReseaux],
                ['Appui partenaires / réseaux externes', data.appuiPartenaires],
              ].map(([lbl, val], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white', borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600, fontSize: '11px' }}>{lbl}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 700, textAlign: 'right' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 7 */}
      <div style={{ pageBreakInside: 'avoid' }}>
        <SectionHeader label="7 · Validation (Signatures)" dark />
        <div style={{ border: '2px solid #1e293b', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[
              { role: 'Porteur·euse / Président·e de club', nom: data.valPorteurNom },
              { role: 'CRE Responsable', nom: data.valCreNom },
            ].map((v, i) => (
              <div key={i} style={{ padding: '16px 14px', textAlign: 'center', background: 'white', borderLeft: i > 0 ? '2px solid #1e293b' : 'none' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{v.role}</div>
                <div style={{ fontWeight: 700, color: '#0F3057', fontSize: '13px', marginBottom: '24px', minHeight: '20px' }}>{fmt(v.nom)}</div>
                <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', fontSize: '9px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Signature</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px solid #1e293b', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Date de signature</span>
            <span style={{ fontWeight: 700, color: '#0F3057' }}>{fmt(data.valSignatureDate)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '9px', fontWeight: 600, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '2px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        Confidentiel · Usage Interne CPME Rhône
      </div>
    </div>
  )
}

/* Petits helpers de rendu PDF */
function SectionHeader({ label, dark }) {
  return (
    <div style={{
      background: dark ? '#1e293b' : '#0F3057',
      color: 'white',
      padding: '6px 12px',
      display: 'block',
      fontWeight: 700,
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      borderRadius: '5px',
      marginBottom: '12px',
    }}>
      {label}
    </div>
  )
}

function Table({ rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
      <tbody>
        {rows.map(([lbl, val], i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white', borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '7px 10px', width: '38%', color: '#64748b', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', verticalAlign: 'top' }}>{lbl}</td>
            <td style={{ padding: '7px 10px', fontWeight: 500, color: '#1e293b', lineHeight: 1.5 }}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Row({ label, children }) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <Label>{label}</Label>
      <div>{children}</div>
    </div>
  )
}

function Label({ children }) {
  return (
    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '3px' }}>
      {children}
    </div>
  )
}
