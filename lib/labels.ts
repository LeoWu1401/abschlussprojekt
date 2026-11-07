import type { FederalState, PostType } from "@/app/generated/prisma/client";

export const postTypes: Record<PostType, string> = {
  FLASH_DAY: "Flash Day",
  GUEST_SPOT: "Guest Spot",
  CONVENTION: "Convention",
  PROJECT: "Gemeinsames Projekt",
  OTHER: "Sonstiges",
};

export const federalStates: Record<FederalState, string> = {
  BW: "Baden-Württemberg",
  BY: "Bayern",
  BE: "Berlin",
  BB: "Brandenburg",
  HB: "Bremen",
  HH: "Hamburg",
  HE: "Hessen",
  MV: "Mecklenburg-Vorpommern",
  NI: "Niedersachsen",
  NW: "Nordrhein-Westfalen",
  RP: "Rheinland-Pfalz",
  SL: "Saarland",
  SN: "Sachsen",
  ST: "Sachsen-Anhalt",
  SH: "Schleswig-Holstein",
  TH: "Thüringen",
};
