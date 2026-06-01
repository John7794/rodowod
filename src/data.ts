// MOCK DATA for preview purposes
// In reality, this data is fetched from the Google Sheets CSV format

import { FamilyConfig, Person } from "./types";

export const DEFAULT_FAMILIES: FamilyConfig[] = [
  {
    id: "stankiewicz",
    name: { uk: "Станкевич", en: "Stankiewicz", pl: "Stankiewicz" },
    coatOfArms: { uk: "Могила", en: "Mogila", pl: "Mogiła" },
    googleSheetCsvUrl: {
      uk: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=0&single=true&output=csv",
      en: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThdbZf_ncPCK9SyD7bUa2WdDuzNvqdhuB3HWm6Wq8EHhI2Pbg_ti_njJ5vJKCgAiTu8zc18mFLz4GW/pub?gid=0&single=true&output=csv",
      pl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3mKot3oNgFEiHTk6-cv1ORXenut0rGvLmQoz_P10JrldJju56l79GuTo7aHuG9Ak6IKSiN_dxoSFm/pub?gid=0&single=true&output=csv"
    }
  },
];