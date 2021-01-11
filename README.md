# MAR Portfolio - Guide conception

## I - User stories

#### A - Utilisateurs
| En tant que | Je veux | Afin de |
|-------------|---------|---------| 
| visiteur | accéder à la page d'accueil | voir les différentes réalisations du propriétaire du site |
| visiteur | accéder à chaque réalisation | voir les détails et/ou explications de chaque réalisation |
| visiteur | voir une navbar | pouvoir rejoindre les différentes pages accessibles sur le site |
| visiteur | accéder à la page d'information du propriétaire du site | découvrir l'auteur des réalisations et d'en apprendre plus sur lui |
| visiteur | voir les différents moyens de rentrer en contact avec le propriétaire du site | le joindre pour discuter de son travail et de sa disponibilité pour réaliser une commande |
---

#### B - Administrateur
| En tant que | Je veux | Afin de |
|-------------|---------|---------| 
| administrateur | me connecter au backoffice | rejoindre la partie administration du site |
| administrateur | me déconnecter du backoffice | quitter la partie administration du site |
| administrateur | accéder au backoffice | de gérer les opérations de CRUD pour les réalisations que je veux partager (create/delete/edit) |
---

## II - ROUTES

#### A - Front
| Route | Method | Description |
|-------|--------|-------------|
| / | GET | Page d’accueil lors de l’arrivée sur le site |
| /backoffice/login | GET | Permet d'accéder à la page de connexion du backoffice |
| /infos | GET | Permet de se connecter au backoffice |
| /{realisation} | GET | Permet de voir le détail d'une réalisation en particulier |
---

#### B - API
| Route | Method |Controller|Description|
|-------|--------|----------|-----------|
| /api/home | GET | ??? | Récupération de la liste des réalisations pour les afficher sur la page d'accueil du site |
| /api/realisation/{id} | GET | ??? | Retourne la réalisation spécifique pour afficher les détails à l'utilisateur |
| /api/login | POST | ??? | Récupère les identifiants du front pour autoriser la connexion au backoffice |
---

####  C - Backoffice
|Route|Method|Controller|Description|
|-----|------|----------|-----------|
| /backoffice/home | GET | ??? | Affiche la page d'accueil du backoffice une fois connecté |
| /backoffice/logout | GET | ??? | Redirige vers la page d'accueil du site en tant que visiteur non connecté |
| /backoffice/realisations | GET | ??? | Affiche la liste de toutes les réalisations sauvegardées pour afficher sur le site |
| /backoffice/realisations/{id} | GET | ??? | Affiche une réalisation précise |
| /backoffice/realisations/create | POST | ??? | Enregistre une nouvelle réalisation pour la sauvegarder en BDD |
| /backoffice/realisations/{id} | PATCH | ??? | Modifie des éléments d'une réalisation  (titre, description, ...) |
| /backoffice/realisations/{id} | DELETE | ??? | Supprime une réalisation dans la BDD |
---

## III - Technologies (liste non définitive, vouée à évoluer selon besoin)

#### A - Front
* React pour la gestion de l'ui coté client.
* React-router-dom pour la gestion des routes de l'application.
* React-transition pour les transitions lors du changement de page.
* React-admin pour la partie backoffice du site.

#### B - Back
* Node pour créer l'API.
* Express pour le framework node.
* Multer pour gestion des fichiers à télécharger.
* Mongoose pour intéragir avec la base de données

## IV - BDD (modélisation non définitive, juste un premier jet)

#### a - project
|Property|Type|Specificity|Description|
|--------|----|-----------|-----------|
| id | OBJECTID | NOT NULL | Identifiant unique de la réalisation |
| title | STRING | NOT NULL | Titre de la réalisation |
| image | STRING | NOT NULL | URL de l'image associée à la réalisation |
| description | STRING | NOT NULL | Adresse de l'utilisateur |
---

#### b - admin
|Property|Type|Specificity|Description|
|--------|----|-----------|-----------|
| id | OBJECTID | NOT NULL | Identifiant unique de l'administrateur |
| firstname | STRING | NOT NULL | Prénom de l'administrateur |
| lastname | STRING | NOT NULL | Nom de l'administrateur |
| email | STRING | NOT NULL | adresse mail de l'administrateur |
| password | STRING | NOT NULL, HASHED | mot de passe de l'administrateur |
---