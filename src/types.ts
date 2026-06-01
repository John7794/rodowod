export interface LocalizedString {
  uk: string;
  en: string;
  pl: string;
}

export interface Person {
  id: string;
  parentId: string | null;
  name: string;
  birthDeath: string;
  description: string;
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
  historyPreview: LocalizedString;
  googleSheetCsvUrl: string;
}
