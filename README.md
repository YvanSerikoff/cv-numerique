# CV numérique étudiant — Template

Un site statique, responsive et accessible pour présenter votre CV en ligne. Sections incluses :
- Hard Skills
- Soft Skills
- Formations
- Expériences
- Projets
- Loisirs
- Contact

## Aperçu rapide

- Thèmes clair/sombre (persistants)
- Navigation ancrée et sticky
- SEO de base (Open Graph + JSON‑LD)
- Formulaire HTML (compatible Netlify Forms)
- Déploiement GitHub Pages via workflow Actions

## Utilisation

1. Remplacez les contenus dans `index.html` (nom, tags, liens).
2. Remplacez `assets/profile.jpg` par votre photo (carrée ~512x512).
3. Optionnel : ajoutez `assets/CV.pdf` pour le bouton “Télécharger le CV”.
4. Modifiez les couleurs/typos dans `css/styles.css`.

### Formulaire de contact

- Par défaut, c’est un formulaire HTML standard (attribut `data-netlify="true"` pour compat Netlify).
- Alternatives :
  - Utiliser `mailto:` (déjà présent dans la note sous le bouton).
  - Utiliser un service type Formspree : remplacez `<form ...>` par l’endpoint Formspree.

### Déploiement GitHub Pages

- Activez GitHub Pages sur la branche `gh-pages` ou via le workflow fourni.
- Ce repo inclut un workflow Actions pour Pages. Après le premier push sur `main`:
  1. Allez dans Settings → Pages, choisissez “GitHub Actions”.
  2. Le workflow `pages.yml` publiera automatiquement sur chaque push.

## Développement local

- Ouvrez `index.html` dans votre navigateur.
- Sinon, servez localement :
  - Python : `python3 -m http.server 5173`
  - Node (serve) : `npx serve .`

## Personnalisation

- Icônes via Font Awesome (CDN). Vous pouvez retirer si non nécessaire.
- Mots‑clés SEO : modifiez `<meta name="description">`, Open Graph, JSON‑LD.
