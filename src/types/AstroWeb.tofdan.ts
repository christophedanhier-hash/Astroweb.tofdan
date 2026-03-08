// 🌌 Spécifications Techniques & Business - Projet AstroWeb.tofdan

/**
 * L'entité `Catalogue`
 * Regroupe un ensemble d'objets célestes.
 */
export interface Catalogue {
  id: string;
  name: string;
  description: string;
  totalObjects: number;
  imageUrl?: string;
  icon?: string;
}

/**
 * L'entité `CelestialObject`
 * L'astre en lui-même.
 */
export interface CelestialObject {
  id: string; // Identifiant officiel (ex: "AND", "M31")
  name: string; // Nom courant (ex: "Andromeda")
  catalogueId: string; // Clé étrangère vers le catalogue
  type: string; // Constellation, Galaxy, Nebula, etc.
  principalStars?: string[]; // Tableau des étoiles majeures
  description: string; // Historique et mythe
  imageUrl?: string; // Image d'illustration par défaut
}

/**
 * Statut de collection pour un objet
 */
export enum CollectionStatus {
  AWAITING_DISCOVERY = "AWAITING_DISCOVERY",
  COLLECTED = "COLLECTED",
}

/**
 * L'entité `UserCollection` (Logique de Gamification)
 * Gère l'état d'un objet pour un utilisateur donné.
 */
export interface UserCollection {
  objectId: string; // Clé étrangère vers l'astre
  status: CollectionStatus;
  userPhotoUrl: string | null; // Lien vers l'image uploadée
  capturedAt: Date | null; // Date de la prise de vue
  notes?: string;
}
