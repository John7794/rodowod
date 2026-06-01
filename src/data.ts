// MOCK DATA for preview purposes
// In reality, this data is fetched from the Google Sheets CSV format

import { FamilyConfig, Person } from "./types";

export const DEFAULT_FAMILIES: FamilyConfig[] = [
  {
    id: "ostrozki",
    name: { uk: "Острозькі", en: "Ostrozky", pl: "Ostrogscy" },
    coatOfArms: { uk: "Острозький", en: "Ostrozky", pl: "Ostrogski" },
    historyPreview: { 
      uk: "Один із наймогутніших і найбагатших князівських родів Великого князівства Литовського та Речі Посполитої.",
      en: "One of the most powerful and wealthiest princely families of the Grand Duchy of Lithuania and the Polish-Lithuanian Commonwealth.",
      pl: "Jeden z najpotężniejszych i najbogatszych rodów książęcych Wielkiego Księstwa Litewskiego i Rzeczypospolitej Obojga Narodów."
    },
    googleSheetCsvUrl: "mock"
  },
  {
    id: "vyshnevetski",
    name: { uk: "Вишневецькі", en: "Vyshnevetsky", pl: "Wiśniowieccy" },
    coatOfArms: { uk: "Корибут", en: "Korybut", pl: "Korybut" },
    historyPreview: {
      uk: "Український магнатський рід гербу Корибут, що походив від турово-пінських або волинських Рюриковичів (через князів Збаразьких) або від Гедиміновичів.",
      en: "A Ukrainian magnate family of the Korybut coat of arms, descended from the Turov-Pinsk or Volhynian Rurikids.",
      pl: "Ukraiński ród magnacki herbu Korybut, wywodzący się od Rurykowiczów turowsko-pińskich lub wołyńskich."
    },
    googleSheetCsvUrl: "mock2"
  }
];

export const MOCK_SHEET_CSV = `id,parentId,name,birthDeath,description,order
1,,Костянтин Іванович Острозький,1460-1530,"Великий гетьман литовський, каштелян віленський, воєвода троцький.",1
2,1,Ілля Костянтинович Острозький,1510-1539,"Князь, син від першого шлюбу з Тетяною Гольшанською.",1
3,1,Василь-Костянтин Костянтинович Острозький,1526-1608,"Київський воєвода, маршалок волинський, засновник Острозької академії.",2
4,2,Гальшка Острозька,1539-1582,"Княжна, фундаторка Острозької академії, одна з найвідоміших меценаток.",1
5,3,Януш Костянтинович Острозький,1554-1620,"Останній представник чоловічої лінії роду. Каштелян краківський.",1
6,3,Олександр Костянтинович Острозький,1570-1603,"Воєвода волинський.",2
7,6,Софія Олександрівна Острозька,1595-1622,"Дружина Станіслава Любомирського.",1
`;
