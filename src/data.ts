// MOCK DATA for preview purposes
// In reality, this data is fetched from the Google Sheets CSV format

import { FamilyConfig, Person } from "./types";

export const DEFAULT_FAMILIES: FamilyConfig[] = [
  {
    id: "stankiewicz",
    name: { uk: "Станкевич", en: "Stankiewicz", pl: "Stankiewicz" },
    coatOfArms: { uk: "Могила", en: "Mogila", pl: "Mogiła" },
    googleSheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=0&single=true&output=csv"
  },
];