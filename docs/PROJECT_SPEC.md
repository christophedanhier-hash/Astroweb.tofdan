# 🌌 Spécifications Techniques & Business - Projet AstroWeb.tofdan

## 1. Vision Produit
AstroWeb.tofdan est une plateforme communautaire et de suivi pour astronomes amateurs. Le but est de numériser l'exploration spatiale en permettant aux utilisateurs de "collectionner" des astres issus de catalogues reconnus en y associant leurs propres photographies.

Le site doit-être en Francais exclusivement

## 2. Modèles de Données (Typage TypeScript attendu)

### A. L'entité `Catalogue`
Regroupe un ensemble d'objets célestes.
- `id` (string): Identifiant unique (ex: "constellations", "messier").
- `name` (string): Nom d'affichage (ex: "Messier Catalogue").
- `description` (string): Sous-titre explicatif.
- `totalObjects` (number): Nombre total d'astres dans ce catalogue.

### B. L'entité `CelestialObject`
L'astre en lui-même.
- `id` (string): Identifiant officiel (ex: "AND", "M31").
- `name` (string): Nom courant (ex: "Andromeda").
- `catalogueId` (string): Clé étrangère vers le catalogue.
- `type` (string): Constellation, Galaxy, Nebula, etc.
- `principalStars` (string[]): Tableau des étoiles majeures (ex: ["Alpheratz", "Mirach"]).
- `description` (string): Historique et mythe.

### C. L'entité `UserCollection` (Logique de Gamification)
Gère l'état d'un objet pour un utilisateur donné.
- `objectId` (string): Clé étrangère vers l'astre.
- `status` (enum): `AWAITING_DISCOVERY` | `COLLECTED`.
- `userPhotoUrl` (string | null): Lien vers l'image uploadée (Google Drive).
- `capturedAt` (Date | null): Date de la prise de vue.

## 3. Analyse des Écrans (User Flow)

### Écran 1 : Dashboard (Accueil)
- **Objectif :** Point d'entrée pointant vers les différentes "quêtes" (Catalogues).
- **UI Composants :** Grille de `CatalogueCard`. Chaque carte affiche une icône, un titre, une description et le décompte des objets (ex: "88 objects").
- **Actions :** Boutons "Browse" (navigation vers l'Écran 2) et "Share" (copie de lien/API Web Share).

### Écran 2 : Grille d'Exploration (Listing d'un catalogue)
- **Objectif :** Afficher tous les astres d'un catalogue spécifique avec recherche.
- **UI Composants :** 
  - `SearchBar` en haut de page (filtrage par nom ou ID).
  - Grille de `ObjectCard`.
- **Logique d'affichage :** Si `UserCollection.status` est `AWAITING_DISCOVERY`, afficher l'icône de télescope par défaut. Si `COLLECTED`, afficher l'image thumbnail. Indicateur visuel "Not Collected" vs "Collected" via une icône radio/check.
- **Actions :** Clic sur "View Details" -> Navigation vers l'Écran 3.

### Écran 3 : Fiche Détail (Objet Spécifique)
- **Objectif :** Afficher les métadonnées de l'astre et permettre la soumission de l'observation.
- **UI Composants :**
  - Section Héros : Image en pleine largeur (ou placeholder).
  - Panneau `Details` : Liste "Clé/Valeur" (Catalogue ID, Type, Constellation) et tags pour les "Principal Stars".
  - Panneau `My Collection` : Composant interactif indiquant le statut actuel.
- **Actions :** Bouton principal "Add Photo" -> Ouvre une modale ou trigger un upload vers le stockage (Google Drive via API Next.js).

## 4. Stack & Règles UI
- **Framework :** Next.js (App Router).
- **Styling :** Tailwind CSS. Mode sombre obligatoire (`bg-[#121212]` ou `bg-slate-950`), couleurs d'accentuation violettes/indigo (`bg-indigo-500`).
- **Composants :** Utilisation d'un système de design type *shadcn/ui* pour les boutons, badges et modales afin de gagner du temps.
