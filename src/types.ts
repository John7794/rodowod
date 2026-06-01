export interface LocalizedString {
  uk: string;
  en: string;
  pl: string;
}

export interface Person {
  id: string;
  parentId: string | null;
  name: string;
  birthDate: string;
  birthPlace: string;
  deathDate: string;
  deathPlace: string;
  description: string;
  sources: string;
  coatOfArms?: string;
  generation?: number;
  order?: number; // Order within siblings
}

export interface TreeItem extends Person {
  children: TreeItem[];
}

export interface FamilyConfig {
  id: string;
  name: LocalizedString;
  coatOfArms: LocalizedString;
  historyPreview?: LocalizedString;
  googleSheetCsvUrl: LocalizedString;
}
