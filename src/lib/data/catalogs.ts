import { Catalogue, CelestialObject, CollectionStatus, UserCollection } from "@/types/AstroWeb.tofdan";

export const MOCK_CATALOGUES: Catalogue[] = [
  {
    id: "messier",
    name: "Messier Catalogue",
    description: "110 astronomical objects catalogued by Charles Messier in 1771.",
    totalObjects: 110,
    icon: "Telescope"
  },
  {
    id: "constellations",
    name: "88 Modern Constellations",
    description: "The officially recognized constellations covering the celestial sphere.",
    totalObjects: 88,
    icon: "Star"
  },
  {
    id: "ngc",
    name: "New General Catalogue",
    description: "A large catalogue of deep-sky objects covering galaxies, nebulae, and star clusters.",
    totalObjects: 7840,
    icon: "Galaxy"
  }
];

export const MOCK_OBJECTS: CelestialObject[] = [
  {
    id: "M31",
    name: "Andromeda Galaxy",
    catalogueId: "messier",
    type: "Spiral Galaxy",
    description: "The Andromeda Galaxy is a barred spiral galaxy and is the nearest major galaxy to the Milky Way.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Andromeda_Galaxy_with_h-alpha.jpg/800px-Andromeda_Galaxy_with_h-alpha.jpg"
  },
  {
    id: "M42",
    name: "Orion Nebula",
    catalogueId: "messier",
    type: "Diffuse Nebula",
    description: "The Orion Nebula is a diffuse nebula situated south of Orion's Belt in the constellation of Orion.",
    principalStars: ["Theta^1 Orionis"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/800px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg"
  },
  {
    id: "ORI",
    name: "Orion",
    catalogueId: "constellations",
    type: "Constellation",
    description: "Orion is a prominent constellation located on the celestial equator and visible throughout the world.",
    principalStars: ["Rigel", "Betelgeuse", "Bellatrix"],
  }
];

export const MOCK_COLLECTION: UserCollection[] = [
  {
    objectId: "M31",
    status: CollectionStatus.COLLECTED,
    userPhotoUrl: null,
    capturedAt: new Date("2023-10-14T22:00:00Z"),
    notes: "Captured from the backyard with a 200mm lens."
  }
];
