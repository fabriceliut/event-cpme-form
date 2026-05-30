import { useState, useRef } from 'react'
import { FileDown, Loader2, X, Download, CheckCircle2 } from 'lucide-react'
import PdfTemplate from '../PdfTemplate.jsx'

const LABEL = {
  intitule: 'Intitulé',
  pole: 'Pôle / Club',
  porteur: 'Porteur·euse',
  cre: 'CRE',
  date: 'Date',
  lieu: 'Lieu',
  priorite: 'Priorité',
  format: 'Format',
  besoin: 'Q2 Besoin adhérent',
  repartAvec: 'Q3 Ce avec quoi on repart',
  profil: 'Profil dirigeant',
  effectif: 'Effectif cible',
  fonctionPrincipale: 'Fonction principale',
  indPresenceCible: 'Présence cible',
  indNps: 'NPS',
  indConversion: 'Conversion 30j',
}

function ReviewRow({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0 gap-4">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-slate-800 text-right">{String(value)}</span>
    </div>
  )
}

export default function StepReview({ data }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(null)
  const templateRef = useRef(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('pdf-template')
      const filename = `Fiche_Event_${data.intitule ? data.intitule.replace(/\s+/g, '_').slice(0, 40) : 'CPME'}.pdf`

      const opt = {
        margin: [10, 10, 15, 10],
        filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], before: '.page-break', avoid: '.avoid-break' },
      }

      const blob = await html2pdf().set(opt).from(element).outputPdf('blob')
      const url = URL.createObjectURL(blob)
      setPdfUrl({ url, filename })
    } catch (err) {
      console.error('PDF error:', err)
      alert('Erreur lors de la génération du PDF.')
    } finally {
      setIsGenerating(false)
    }
  }

  const piliers = [
    data.pilierDefendre && 'Défendre la voix des patrons',
    data.pilierGrandir && 'Faire grandir les dirigeants',
    data.pilierAider && 'Aider les entreprises',
  ].filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header récap */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-cpme-blue text-white flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Récapitulatif &amp; Génération PDF</h2>
          <p className="text-sm text-slate-500">Vérifiez les informations avant de générer le document final.</p>
        </div>
      </div>

      {/* Cartes récap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: '1 · Identification',
            rows: [
              ['Intitulé', data.intitule],
              ['Pôle / Club', data.pole],
              ['Porteur·euse', data.porteur],
              ['CRE', data.cre],
              ['Date', data.date],
              ['Lieu', data.lieu],
              ['Priorité', data.priorite],
            ]
          },
          {
            title: '2 · Format & Intention',
            rows: [
              ['Format', data.format === 'Autre' ? data.formatAutre : data.format],
              ['Besoin adhérent', data.besoin],
              ['Ce avec quoi on repart', data.repartAvec],
            ]
          },
          {
            title: '3 · Cible & Cadre',
            rows: [
              ['Profil', data.profil],
              ['Effectif cible', data.effectif],
              ['Ratio Adh./Non-adh.', `${data.ratioAdherents || 0}% / ${Math.max(0, 100 - Number(data.ratioAdherents || 0))}%`],
              ['Fonction principale', data.fonctionPrincipale],
              ['Fonction secondaire', data.fonctionSecondaire],
              ['Piliers CPME', piliers.join(', ')],
            ]
          },
          {
            title: '4 · Charge & Ressources',
            rows: [
              ['Coût total', data.coutTotal ? `${data.coutTotal} €` : null],
              ['Partenaire', data.partenaireType === 'coconstruit' ? data.partenaireQui : 'CPME seule'],
              ['Financement', data.financementQui ? `${data.financementQui} (${data.financementMontant})` : null],
            ]
          },
          {
            title: '5 · Mesure de Succès',
            rows: [
              ['Présence cible', data.indPresenceCible],
              ['Conversion 30j', data.indConversion],
              ['NPS', data.indNps ? `${data.indNps}/10` : null],
              [data.indSpe1Nom || null, data.indSpe1Seuil],
              [data.indSpe2Nom || null, data.indSpe2Seuil],
            ].filter(([l]) => l)
          },
          {
            title: '6 & 7 · Orientations & Validation',
            rows: [
              ['Échange Frank MORIZE', data.echFrank],
              ['Hors Petit-déj/Soirée', data.divHorsDej],
              ['Créneau Mercredi', data.mercredi],
              ['Porteur (signature)', data.valPorteurNom],
              ['CRE (signature)', data.valCreNom],
            ]
          },
        ].map(card => (
          <div key={card.title} className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-bold text-cpme-blue uppercase tracking-wide mb-3">{card.title}</h3>
            {card.rows.map(([lbl, val], i) => <ReviewRow key={i} label={lbl} value={val} />)}
          </div>
        ))}
      </div>

      {/* Bouton génération */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-lg transition-all
            ${isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-cpme-blue hover:bg-cpme-lightblue hover:-translate-y-0.5 shadow-cpme-blue/20'}`}
        >
          {isGenerating
            ? <><Loader2 size={20} className="animate-spin" /> Génération en cours…</>
            : <><FileDown size={20} /> Générer le PDF final</>
          }
        </button>
      </div>

      {/* Gabarit PDF caché */}
      <div id="pdf-template-wrapper">
        <PdfTemplate data={data} />
      </div>

      {/* Modale aperçu */}
      {pdfUrl && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <FileDown size={20} className="text-cpme-lightblue" />
                Aperçu du document final
              </h3>
              <div className="flex gap-3">
                <a
                  href={pdfUrl.url}
                  download={pdfUrl.filename}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cpme-blue text-white rounded-xl text-sm font-bold hover:bg-cpme-lightblue transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Télécharger le PDF
                </a>
                <button
                  onClick={() => { URL.revokeObjectURL(pdfUrl.url); setPdfUrl(null) }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  <X size={16} />
                  Fermer
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-200 p-4 overflow-hidden">
              <object data={pdfUrl.url} type="application/pdf" className="w-full h-full rounded-xl shadow-lg">
                <p className="p-4 text-center text-slate-600">
                  Votre navigateur ne peut pas afficher l'aperçu PDF.{' '}
                  <a href={pdfUrl.url} download={pdfUrl.filename} className="text-cpme-lightblue font-bold underline">
                    Cliquez ici pour télécharger
                  </a>.
                </p>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
