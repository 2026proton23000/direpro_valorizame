Parfait ! Voici un README complet et professionnel pour ton projet. Il est rédigé en français (langue principale du développeur) mais le projet étant internationalisé, tu peux l'adapter.

---

# 🌱 Valorizame Tacna – Site institutionnel de la DIREPRO

Site statique moderne pour la **Direction Régionale de la Production (DIREPRO)** du Gouvernement Régional de Tacna (Pérou). Il a pour objectif de promouvoir le projet **Valorizame**, qui accompagne les PMI/PME locales dans la valorisation des déchets organiques et inorganiques.

🔗 **URL du site** : [https://2026proton23000.github.io/](https://2026proton23000.github.io/)

---

## ✨ Fonctionnalités

- **Design moderne** et responsive (inspiré des tendances actuelles, avec une identité forte aux couleurs de Tacna).
- **Internationalisation** (français, espagnol, anglais) – sélecteur de langue en header.
- **Blog / Solutions** : articles classés par catégorie (organique / inorganique), avec filtres.
- **Actualités "La Voz de Tacna"** : section dédiée aux nouvelles du GORE, avec galerie d'images et zoom modal.
- **Carte interactive** des entreprises participantes (Leaflet).
- **Pages institutionnelles** : À propos, Contact, page dédiée aux entreprises.
- **Formulaire de contact et demande de visite** : envoi direct vers un **bot Telegram** (pas de serveur backend).
- **Gestion de contenu** via fichiers JSON (pas de base de données, mise à jour simple).
- **Hébergé sur GitHub Pages** – gratuit, rapide, sécurisé.

---

## 🧱 Structure du projet

```
DIREPRO_Tacna/
├── index.html                 # Accueil
├── a-propos.html              # Page "Le projet"
├── solutions.html             # Liste des solutions (blog)
├── article.html               # Template d'un article (solution)
├── voz-tacna.html             # Actualités "La Voz"
├── voz-article.html           # Template d'une actualité (avec galerie)
├── carte.html                 # Carte interactive
├── contact.html               # Page de contact
├── entreprise.html            # Landing page pour les entreprises
├── css/
│   └── style.css              # Styles principaux
├── js/
│   ├── i18n.js                # Gestionnaire de langue
│   ├── articles.js            # Chargement des solutions
│   ├── article.js             # Affichage d'un article (solution)
│   ├── voz.js                 # Chargement des actualités
│   ├── voz-article.js         # Affichage d'une actualité (avec galerie)
│   ├── carte.js               # Carte Leaflet
│   ├── contact.js             # Formulaire de contact
│   ├── entreprise.js          # Formulaire de demande de visite
│   ├── telegram-contact.js    # Client Telegram (envoi des messages)
│   ├── app.js                 # Initialisation commune
│   └── utils.js               # Fonctions utilitaires
├── data/
│   ├── translations/          # Fichiers JSON de traduction (fr, es, en)
│   ├── articles/              # Articles (solutions) avec leurs traductions
│   ├── voz/                   # Actualités avec leurs traductions
│   └── entreprises.json       # Données des entreprises pour la carte
└── images/
    ├── articles/              # Images des solutions
    ├── voz/                   # Images des actualités (dossiers par article)
    └── entreprises.jpg        # Image d'illustration
```

---

## 🚀 Installation et test en local

1. **Cloner le dépôt** :
   ```bash
   git clone git@github.com:2026proton23000/2026proton23000.github.io.git
   cd 2026proton23000.github.io
   ```

2. **Lancer un serveur local** (nécessaire pour les appels `fetch`) :
   ```bash
   python3 -m http.server 8000
   ```
   ou avec l'extension **Live Server** de VSCode.

3. **Ouvrir le navigateur** à `http://localhost:8000`

---

## 🛠️ Personnalisation

### 🔁 Changer le bot Telegram
Les formulaires envoient les messages à un bot Telegram. Pour utiliser le vôtre :

1. Créez un bot via [@BotFather](https://t.me/botfather) et récupérez le token.
2. Obtenez votre `chat_id` (en envoyant un message au bot puis en visitant `https://api.telegram.org/bot<TOKEN>/getUpdates`).
3. Modifiez les variables dans `js/telegram-contact.js` :
   ```javascript
   this.botToken = 'VOTRE_TOKEN';
   this.chatId = 'VOTRE_CHAT_ID';
   ```

### 📝 Ajouter / modifier des articles (solutions)
- Les articles sont dans `data/articles/XXX.json` (avec `XXX` = numéro à 3 chiffres).
- Chaque fichier contient les trois langues.
- Pour ajouter un article :
  1. Créez un nouveau fichier `004.json` avec la même structure.
  2. Ajoutez son ID dans `data/articles/index.json` (liste des IDs).

### 📰 Ajouter / modifier des actualités ("La Voz")
- Même principe dans `data/voz/XXX.json` et `data/voz/index.json`.
- Les images doivent être placées dans `images/voz/XXX/` avec :
  - `thumbnail.jpg` pour la miniature
  - `01.jpg`, `02.jpg`, … pour la galerie.

### 🗺️ Modifier les entreprises sur la carte
- Fichier `data/entreprises.json` : chaque entrée contient les coordonnées GPS et les traductions du nom et de la description.

### 🌐 Modifier les traductions de l'interface
- Fichiers dans `data/translations/` (`fr.json`, `es.json`, `en.json`). Les clés correspondent aux attributs `data-i18n` dans le HTML.

---

## 📦 Déploiement sur GitHub Pages

1. Poussez les modifications sur la branche `main` :
   ```bash
   git add .
   git commit -m "Description des changements"
   git push origin main
   ```
2. Sur GitHub, allez dans **Settings > Pages**.
3. Sélectionnez la branche `main` et le dossier `/ (root)`.
4. Cliquez sur **Save**.
5. Après 1-2 minutes, votre site est en ligne à `https://2026proton23000.github.io/`.

---

## 🧰 Technologies utilisées

- **HTML5 / CSS3** (Flexbox, Grid)
- **JavaScript** (ES6, modules, fetch API)
- **[Leaflet](https://leafletjs.com/)** – carte interactive
- **Telegram Bot API** – réception des messages de contact
- **GitHub Pages** – hébergement

---

## 📄 Licence

Ce projet est la propriété du **Gobierno Regional de Tacna / DIREPRO**. Toute utilisation ou modification doit faire l'objet d'un accord préalable.

---

## 👨‍💻 Auteur

Développé par **[ton nom / ta structure]** pour la DIREPRO Tacna.  
Pour toute question : [ton email] *(optionnel)*

---

### 🙏 Remerciements

- Aux équipes de la DIREPRO pour leur confiance.
- Aux producteurs et entreprises de Tacna qui participent au projet Valorizame.

---

**¡Valorizame Tacna, économie circulaire en action !** ♻️

---

Ce README est prêt à être placé à la racine du dépôt. Tu peux bien sûr ajuster les sections "Auteur" et "Licence" selon ton contexte.