// MOCK DATA and detailed historical context for SEO and knowledge base
import { FamilyConfig } from "./types";

export const DEFAULT_FAMILIES: FamilyConfig[] = [
  {
    id: "stankiewicz",
    name: { uk: "Станкевич", en: "Stankiewicz", pl: "Stankiewicz" },
    coatOfArms: { uk: "Могила", en: "Mogila", pl: "Mogiła" },
    coatOfArmsImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/POL_COA_Mogi%C5%82a.svg/960px-POL_COA_Mogi%C5%82a.svg.png",
    coatOfArmsDesc: {
      uk: "Герб Могила (Mogiła) — старовинний шляхетський герб: у срібному (або синьому) полі два срібні хрести, на срібній могилі або кургані. Нашоломник складається з трьох або п'яти страусових пер.",
      pl: "Herb Mogiła — starodawny herb szlachecki: na srebrnej lub błękitnej mogile dwa srebrne krzyże kawalerskie. W klejnocie trzy lub pięć piór strusich.",
      en: "Mogiła coat of arms — an ancient noble armorial bearing depicting two crosses upon a mound/tomb in a field, crested with ostrich feathers."
    },
    origins: {
      uk: "Велике князівство Литовське, Волинь, Київщина, Поділля, Віленське та Новогрудське воєводства.",
      pl: "Wielkie Księstwo Litewskie, Wołyń, Kijowszczyzna, Podole, województwa wileńskie i nowogródzkie.",
      en: "Grand Duchy of Lithuania, Volhynia, Kyiv and Podolia regions, Vilnius and Nowogródek voivodeships."
    },
    historyPreview: {
      uk: "Давній шляхетський рід Великого князівства Литовського та Речі Посполитої, гілки якого розселилися на Волині, Київщині та Поділлі.",
      pl: "Starożytny ród szlachecki Wielkiego Księstwa Litewskiego i Rzeczypospolitej, którego gałęzie osiadły na Wołyniu, Kijowszczyźnie i Podolu.",
      en: "Ancient noble lineage of the Grand Duchy of Lithuania and Polish-Lithuanian Commonwealth, with branches across Volhynia and Podolia."
    },
    historyFull: {
      uk: "Рід Станкевичів гербу Могила належить до шляхетських родин руського та литовського походження, відомих з XVI століття. Представники роду обіймали посади підкоморіїв, ротмістрів та войських у Великому князівстві Литовському, а пізніше були підтверджені у дворянстві Російської імперії по Волинській, Київській та Мінській губерніях.",
      pl: "Ród Stankiewiczów herbu Mogiła należy do rodzin szlacheckich pochodzenia litewsko-ruskiego, znanych od XVI wieku. Przedstawiciele rodu pełnili urzędy podkomorzych, rotmistrzów i wojskich w Wielkim Księstwie Litewskim, a w XIX wieku uzyskali potwierdzenie szlachectwa w guberniach wołyńskiej i kijowskiej.",
      en: "The Stankiewicz family bearing the Mogiła coat of arms is a historical noble family attested from the 16th century, holding offices in the Grand Duchy of Lithuania and registered in Volhynian noble assemblies."
    },
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
    coatOfArmsDesc: {
      uk: "Герб Новина (Nowina) — у синьому полі срібна кінська підкова шипами догори, посередині якої золотий або срібний хрест чи меч. Над шоломом — зігнута в лікті закута рука з мечем.",
      pl: "Herb Nowina — w polu błękitnym podkowa srebrna barkiem na dół, z krzyżem lub mieczem pośrodku. W klejnocie ręka zbrojna z mieczem.",
      en: "Nowina coat of arms — azure field featuring a silver horseshoe pointing upwards with a cross or sword within, crested with an armored hand bearing a sword."
    },
    origins: {
      uk: "Малопольща, Волинь, Поділля, Галичина та Брацлавське воєводство.",
      pl: "Małopolska, Wołyń, Podole, Ruś Czerwona oraz województwo bracławskie.",
      en: "Lesser Poland, Volhynia, Podolia, Red Ruthenia, and Bracław Voivodeship."
    },
    historyPreview: {
      uk: "Відомий шляхетський рід гербу Новина, представники якого брали активну участь у житті Речі Посполитої, відзначилися у військових походах та засідали в земських судах.",
      pl: "Słynny ród szlachecki herbu Nowina, którego członkowie aktywnie uczestniczyli w życiu publicznym Rzeczypospolitej, sejmikach ziemskich i wyprawach wojennych.",
      en: "Prominent noble family bearing the Nowina armorial achievement, distinguished in regional assemblies, judicial offices and military service."
    },
    historyFull: {
      uk: "Борковські гербу Новина згадуються в актах коронних земель з XV століття. Численні гілки роду осіли на українських землях Волині та Поділля, де володіли маєтками, родичалися з місцевою шляхтою і пізніше підтвердили дворянську гідність у Дворянських депутатських зборах.",
      pl: "Borkowscy herbu Nowina notowani są w źródłach koronnych od XV stulecia. Liczne linie rodu osiedliły się na ziemiach ukrainnych, na Wołyniu i Podolu, posiadając majątki ziemskie i wchodząc w związki z tamtejszą szlachtą.",
      en: "The Borkowski lineage of the Nowina armorial is recorded in Crown records since the 15th century, with notable branches establishing estates throughout Volhynia and Podolia."
    },
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
    coatOfArmsDesc: {
      uk: "Герб Тарнава (Tarnawa) — у червоному полі срібний хрест, на нижньому рамені якого спирається срібний півмісяць рогами догори або вліво. У клейноді — п'ять страусових пер.",
      pl: "Herb Tarnawa — w polu czerwonym krzyż kawalerski srebrny, pod nim półksiężyc rogami do góry. W klejnocie pięć piór strusich.",
      en: "Tarnawa coat of arms — gules field bearing a silver cross with a silver crescent below, crested with ostrich plumes."
    },
    origins: {
      uk: "Сандомирське воєводство, Волинь, Поділля, Київська губернія.",
      pl: "Województwo sandomierskie, Wołyń, Podole, gubernia kijowska.",
      en: "Sandomierz Voivodeship, Volhynia, Podolia, Kyiv Governorate."
    },
    historyPreview: {
      uk: "Старовинний шляхетський рід гербу Тарнава, який дав видатних діячів культури, воєначальників та урядників (зокрема поета Антонія Мальчевського).",
      pl: "Starożytny ród szlachecki herbu Tarnawa, z którego wywodzili się wybitni wojskowi, politycy i poeci (w tym Antoni Malczewski).",
      en: "Distinguished noble family bearing the Tarnawa arms, known for illustrious military leaders, statesmen, and cultural figures."
    },
    historyFull: {
      uk: "Мальчевські гербу Тарнава походять із Мальчева в Сандомирській землі. З часом рід розгалузився на кілька ліній, одна з яких осіла на Волині (поетична батьківщина автора поеми 'Марія' Антонія Мальчевського), володіла помістями у Дубненському та Луцькому повітах.",
      pl: "Malczewscy herbu Tarnawa wywodzą się z Malczewa w ziemi sandomierskiej. W późniejszych wiekach jedna z linii osiadła na Wołyniu, związana z okolicami Dubna i Łucka, wydając znakomitych twórców i działaczy społecznych.",
      en: "The Malczewski family originates from Malczew in the Sandomierz region. Branches flourished throughout Volhynia (home of renowned poet Antoni Malczewski) and Podolia with confirmed entries in nobility registers."
    },
    googleSheetCsvUrl: {
      uk: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBhmc6cg3Q0tplWVtpUBJCWwyykgM44B8pa2sB62sgvm7-nh7kIuw8O1CyNX3Cb3VSC3TijYakIJNA/pub?gid=1162183860&single=true&output=csv",
      en: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThdbZf_ncPCK9SyD7bUa2WdDuzNvqdhuB3HWm6Wq8EHhI2Pbg_ti_njJ5vJKCgAiTu8zc18mFLz4GW/pub?gid=1870595796&single=true&output=csv",
      pl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3mKot3oNgFEiHTk6-cv1ORXenut0rGvLmQoz_P10JrldJju56l79GuTo7aHuG9Ak6IKSiN_dxoSFm/pub?gid=228211469&single=true&output=csv"
    }
  }
];