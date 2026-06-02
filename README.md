# Fiche Action / Événement CPME Rhône

Wizard React multi-étapes pour préparer et formaliser une action ou un événement CPME Rhône. Génère une fiche PDF récapitulative.

## Stack

- **Vite 6 + React 18** — SPA, build vers `dist/`
- **Tailwind CSS 3** — design system CPME (bleu `#0F3057`, rouge `#E63946`)
- **html2pdf.js** — génération PDF côté client (chargé dynamiquement)
- **Cloudflare Workers** — hébergement via `wrangler.toml` (`[assets] directory = "dist"`)
- **localStorage** — persistance automatique du formulaire entre sessions

## Étapes du wizard

| # | Étape | Champs clés |
|---|-------|------------|
| 1 | Identification | Intitulé, Pôle/Club, Présidence engagée, Chef de projet, Date, Lieu, Priorité |
| 2 | Format & Intention | Format, Durée/horaires, Besoin adhérent (Q2), Ce avec quoi on repart (Q3) |
| 3 | Cible & Cadre | Profil dirigeant, Nbre de participants, Piliers stratégiques, Fonction principale |
| 4 | Charge & Ressources | Budget, intervenants, logistique |
| 5 | Mesure de Succès | Présence mini, Conversion adhésion, Note /10, % recommandation, 2 indicateurs spécifiques libres |
| 6 | Orientations 2026-2027 | 5 toggles Oui/Non : échange Frank Morize, diversification format, partenariats, réseaux, appui externe |
| 7 | Validation | Signatures porteur / CRE |
| — | Récapitulatif | Résumé complet + export PDF |

## Développement local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
npm run preview    # prévisualise le build
```

## Déploiement

Le déploiement est automatique via GitHub → Cloudflare Workers à chaque push sur `main`.

```bash
# déploiement manuel si besoin
npx wrangler deploy
```
