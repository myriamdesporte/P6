# P6 : Développer une interface utilisateur pour une application web Python<br>- JustStreamIt

## Description

**Site web front-end** permettant d'afficher les données de films récupérées depuis l’API locale **OCMovies-API**.

---

## Fonctionnalités

* Afficher le **meilleur film** et les **films les mieux notés**
* Explorer les films par **catégorie / genre**
* Consulter les **détails d’un film** : description, acteurs, recettes, etc.

---

## Pré-requis

Avant de commencer, assurez-vous d'utiliser les versions suivantes de Python, node et npm :

* **Python 3.12** (pour exécuter l’API OCMovies-API)
* **Node.js v22.18.0** (pour le front-end)
* **npm 10.9.3** 
---

## Dépôt de l’API OCMovies

> ⚠️ Le site ne fonctionne que si l’API est démarrée localement sur `http://localhost:8000`.
 
Assurez-vous d'avoir démarré l'API en local en suivant les instructions disponibles dans le README de l'API OCMovies.

* Dépôt : [OCMovies-API sur GitHub](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
* README officiel : [README.md](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md)

---

## Installation

1. Cloner le dépôt sur votre machine locale :

```bash
git clone https://github.com/myriamdesporte/P6.git
```


2. Installer les dépendances Node :

```bash
npm install
```

3. Vérifier que l’API OCMovies-API est démarrée.

Rappel rapide pour lancer l’API :
```bash
python manage.py runserver
```

---

## Lancement en développement

```bash
npm run dev
```

* Ouvrir l’URL indiquée par Vite (souvent `http://localhost:5173`) dans le navigateur.
* Les modifications sont prises en compte automatiquement.

---

## Build pour production

> ⚠️ Le build n’est pas nécessaire pour le développement local. 
> Il est uniquement requis pour publier une nouvelle version en ligne.
 
Exécuter la commande suivante :

```bash
npm run build
```

* Cette commande crée une version optimisée du site, prête à être publiée en ligne.
* Les fichiers statiques sont générés dans le dossier `dist/`.

> ⚠️ Pour publier sur un **nouveau dépôt GitHub**, il faudra :
> - Adapter la ligne `"build-gh": "vite build --base=/P6/"` dans `package.json`
> - Sur GitHub, activer GitHub Pages dans *Settings → Pages*


---

## Déploiement sur GitHub Pages

* Le contenu du dossier `dist/` est automatiquement publié grâce à GitHub Actions (workflow `deploy.yaml`).  
* URL publique du site: [https://myriamdesporte.github.io/P6/](https://myriamdesporte.github.io/P6/)

> ⚠️ Le site fonctionne uniquement sur Chrome et Firefox. 
> Safari bloque les requêtes locales vers l’API à cause des restrictions CORS.

---


## Structure du projet

```
P6/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ assets/        # images (logo, placeholder)
│  ├─ css/           # styles CSS
│  └─ js/            # scripts (api.js, main.js, ui.js)
```

