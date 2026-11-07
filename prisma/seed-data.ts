import { FederalState, PostType } from "../app/generated/prisma/client";

export const users = [
  {
    name: "Mira Black",
    email: "mira@example.com",
    posts: [
      {
        title: "Flash Day für den guten Zweck",
        type: PostType.FLASH_DAY,
        federalState: FederalState.NW,
        city: "Köln",
        address: "Studio Schwarzlicht, Ehrenstraße 12",
        date: new Date("2026-12-12"),
        description:
          "Wir stechen einen Tag lang Flash-Motive. Der Erlös geht an das Tierheim Köln. Drei Plätze im Studio sind noch frei. Wer macht mit?",
        contact: "mira@example.com",
      },
    ],
  },
  {
    name: "Jonas Weber",
    email: "jonas@example.com",
    posts: [
      {
        title: "Fahrgemeinschaft zur Convention",
        type: PostType.CONVENTION,
        federalState: FederalState.HE,
        city: "Frankfurt",
        address: "Treffpunkt: Hauptbahnhof, Ausgang Süd",
        date: new Date("2027-01-16"),
        description:
          "Ich fahre mit dem Auto zur Convention und habe noch zwei Plätze frei. Maschinen und Farben passen in den Kofferraum.",
        contact: "jonas@example.com",
      },
    ],
  },
  {
    name: "Tom Richter",
    email: "tom@example.com",
    posts: [
      {
        title: "Gemeinsames Flash-Heft",
        type: PostType.PROJECT,
        federalState: FederalState.SN,
        city: "Leipzig",
        date: new Date("2027-02-20"),
        description:
          "Wir sammeln Motive von mehreren Artists und drucken daraus ein Heft. Jede Person steuert zwei Seiten bei.",
        contact: "tom@example.com",
      },
    ],
  },
  {
    name: "Lea Brandt",
    email: "lea@example.com",
    posts: [
      {
        title: "Suche Guest Spot im März",
        type: PostType.GUEST_SPOT,
        federalState: FederalState.HH,
        city: "Hamburg",
        date: new Date("2027-03-01"),
        description:
          "Ich suche für zwei Wochen einen Platz in einem Studio in Hamburg. Mein Stil ist Neo Traditional.",
        contact: "lea@example.com",
      },
    ],
  },
  {
    name: "Ali Demir",
    email: "ali@example.com",
    posts: [
      {
        title: "Workshop Linework",
        type: PostType.OTHER,
        federalState: FederalState.BY,
        city: "München",
        address: "Studio Nadelöhr, Schellingstraße 40",
        date: new Date("2027-04-10"),
        description:
          "Ein Tag zum Üben von sauberen Linien, mit Austausch über Nadeln und Maschinen. Es sind noch fünf Plätze frei.",
        contact: "ali@example.com",
      },
    ],
  },
  {
    name: "Sara König",
    email: "sara@example.com",
    posts: [
      {
        title: "Freitag der 13. Flash Day",
        type: PostType.FLASH_DAY,
        federalState: FederalState.BE,
        city: "Berlin",
        address: "Studio Kiezink, Oranienstraße 7",
        date: new Date("2027-08-13"),
        description:
          "Der Klassiker unter den Flash Days. Wir suchen noch zwei Artists, die einen Tag mitstechen.",
        contact: "sara@example.com",
      },
    ],
  },
];
