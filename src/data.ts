// MOCK DATA for preview purposes
// In reality, this data is fetched from the Google Sheets CSV format

import { FamilyConfig, Person } from "./types";

export const DEFAULT_FAMILIES: FamilyConfig[] = [
  {
    id: "stankiewicz",
    name: { uk: "Станкевич", en: "Stankiewicz", pl: "Stankiewicz" },
    coatOfArms: { uk: "Могила", en: "Mogila", pl: "Mogiła" },
    coatOfArmsImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/POL_COA_Mogi%C5%82a.svg/960px-POL_COA_Mogi%C5%82a.svg.png",
    googleSheetCsvUrl: {
      uk: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=0&single=true&output=csv",
      en: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThdbZf_ncPCK9SyD7bUa2WdDuzNvqdhuB3HWm6Wq8EHhI2Pbg_ti_njJ5vJKCgAiTu8zc18mFLz4GW/pub?gid=0&single=true&output=csv",
      pl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3mKot3oNgFEiHTk6-cv1ORXenut0rGvLmQoz_P10JrldJju56l79GuTo7aHuG9Ak6IKSiN_dxoSFm/pub?gid=0&single=true&output=csv"
    }
  },
  {
    id: "borkowski",
    name: { uk: "Борковські", en: "Borkowski", pl: "Borkowscy" },
    coatOfArms: { uk: "Новина", en: "Nowina", pl: "Nowina" },
    coatOfArmsImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/POL_COA_Nowina.svg/960px-POL_COA_Nowina.svg.png",
    googleSheetCsvUrl: {
      uk: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=890862162&single=true&output=csv",
      en: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThdbZf_ncPCK9SyD7bUa2WdDuzNvqdhuB3HWm6Wq8EHhI2Pbg_ti_njJ5vJKCgAiTu8zc18mFLz4GW/pub?gid=1028903225&single=true&output=csv",
      pl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3mKot3oNgFEiHTk6-cv1ORXenut0rGvLmQoz_P10JrldJju56l79GuTo7aHuG9Ak6IKSiN_dxoSFm/pub?gid=1775358468&single=true&output=csv"
    }
  },
  {
    id: "malczewski",
    name: { uk: "Мальчевські", en: "Malczewski", pl: "Malczewscy" },
    coatOfArms: { uk: "Тарнава", en: "Tarnawa", pl: "Tarnawa" },
    coatOfArmsImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/POL_COA_Tarnawa_alt.svg/960px-POL_COA_Tarnawa_alt.svg.png",
    googleSheetCsvUrl: {
      uk: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=1162183860&single=true&output=csv",
      en: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThdbZf_ncPCK9SyD7bUa2WdDuzNvqdhuB3HWm6Wq8EHhI2Pbg_ti_njJ5vJKCgAiTu8zc18mFLz4GW/pub?gid=1870595796&single=true&output=csv",
      pl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3mKot3oNgFEiHTk6-cv1ORXenut0rGvLmQoz_P10JrldJju56l79GuTo7aHuG9Ak6IKSiN_dxoSFm/pub?gid=228211469&single=true&output=csv"
    }
  }
];