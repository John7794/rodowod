import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_FAMILIES } from './data';
import PedigreeView from './components/PedigreeView';
import ContactSection from './components/ContactSection';
import { BookOpen, Menu } from 'lucide-react';
import { FamilyConfig } from './types';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

const getInitialFamily = (): FamilyConfig | null => {
  if (typeof window === 'undefined') return DEFAULT_FAMILIES[0];
  const params = new URLSearchParams(window.location.search);
  const familyId = params.get('family');
  if (familyId) {
    const matched = DEFAULT_FAMILIES.find(f => f.id.toLowerCase() === familyId.toLowerCase());
    if (matched) return matched;
  }
  return DEFAULT_FAMILIES[0];
};

function AppContent() {
  const [selectedFamily, setSelectedFamily] = useState<FamilyConfig | null>(getInitialFamily());
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const familyId = params.get('family');
      if (familyId) {
        const matched = DEFAULT_FAMILIES.find(f => f.id.toLowerCase() === familyId.toLowerCase());
        if (matched) {
          setSelectedFamily(matched);
          return;
        }
      }
      setSelectedFamily(DEFAULT_FAMILIES[0] || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetSelectedFamily = (family: FamilyConfig | null) => {
    setSelectedFamily(family);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (family) {
        params.set('family', family.id);
      } else {
        params.delete('family');
      }
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.pushState({ familyId: family?.id }, '', newUrl);
    }
  };

  const getPageTitle = () => {
    if (selectedFamily) {
      return `${t.titleFamilyPrefix} ${selectedFamily.name[language]} ${t.titleFamilySuffix} ${selectedFamily.coatOfArms[language]} | ${t.titlePrefix} ${t.titleSuffix}`;
    }
    return `${t.titlePrefix} ${t.titleSuffix} - ${t.heroTag}`;
  };

  const getPageDescription = () => {
    if (selectedFamily) {
      if (language === 'uk') return `Генеалогія, родовід та історія походження роду ${selectedFamily.name['uk']} (гербу ${selectedFamily.coatOfArms['uk']}). Дізнайтесь про своїх предків.`;
      if (language === 'pl') return `Genealogia, rodowód i historia pochodzenia rodu ${selectedFamily.name['pl']} (herbu ${selectedFamily.coatOfArms['pl']}). Poznaj swoich przodków.`;
      return `Genealogy, pedigree and family tree of the ${selectedFamily.name['en']} family (coat of arms ${selectedFamily.coatOfArms['en']}). Discover your noble ancestors.`;
    }
    return t.heroSubtitle;
  };

  const getOgImage = () => {
    if (selectedFamily?.coatOfArmsImageUrl) {
      return selectedFamily.coatOfArmsImageUrl;
    }
    return typeof window !== 'undefined' ? `${window.location.origin}/favicon.svg` : '';
  };

  const getLanguageUrl = (targetLang: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://rodowod.vercel.app';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    
    const params = new URLSearchParams();
    if (selectedFamily) {
      params.set('family', selectedFamily.id);
    }
    params.set('lang', targetLang);
    
    return `${baseUrl}${path}?${params.toString()}`;
  };

  const keywords = selectedFamily 
    ? `${selectedFamily.name['uk']}, родовід ${selectedFamily.name['uk']}, ${selectedFamily.name['en']}, genealogia ${selectedFamily.name['pl']}, ${selectedFamily.name['en']} family tree, герб ${selectedFamily.coatOfArms['uk']}, herb ${selectedFamily.coatOfArms['pl']}, pedigree, noble families, шляхта`
    : "Станкевичі, Борковські, Мальчевські, родовід Станкевичів, родовід Борковських, родовід Мальчевських, Stankiewicz, Borkowski, Malczewski, genealogia, family tree, герб Могила, герб Новина, герб Тарнава, шляхта, генеалогія, родоводи шляхти";

  const currentCanonical = getLanguageUrl(language);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={currentCanonical} />
        
        {/* hreflang tags for beautiful multilingual indexation */}
        <link rel="alternate" hrefLang="uk" href={getLanguageUrl('uk')} />
        <link rel="alternate" hrefLang="en" href={getLanguageUrl('en')} />
        <link rel="alternate" hrefLang="pl" href={getLanguageUrl('pl')} />
        <link rel="alternate" hrefLang="x-default" href={getLanguageUrl('uk')} />

        {/* Open Graph Tags for high traction sharing */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentCanonical} />
        <meta property="og:image" content={getOgImage()} />
        <meta property="og:site_name" content={`${t.titlePrefix} ${t.titleSuffix}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="twitter:image" content={getOgImage()} />
      </Helmet>
      {/* Header */}
      <header className="border-b border-parchment-dark bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSetSelectedFamily(null)}>
            <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center">
              <BookOpen className="text-gold w-5 h-5" />
            </div>
            <div className="font-display font-bold text-xl tracking-wide text-ink uppercase hidden sm:block">
              {t.titlePrefix} <span className="text-gold">{t.titleSuffix}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#families" className="text-ink hover:text-crimson transition-colors cursor-pointer">
              {t.navFamilies}
            </a>
            <a href="#about" className="text-ink hover:text-crimson transition-colors cursor-pointer">
              {t.navAbout}
            </a>
            <a href="#contact" className="text-ink hover:text-crimson transition-colors cursor-pointer">
              {t.navContact}
            </a>
            
            <div className="flex items-center gap-2 border-l border-parchment-dark pl-6">
              <button onClick={() => setLanguage('uk')} className={`transition-colors cursor-pointer ${language === 'uk' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>UA</button>
              <button onClick={() => setLanguage('en')} className={`transition-colors cursor-pointer ${language === 'en' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>EN</button>
              <button onClick={() => setLanguage('pl')} className={`transition-colors cursor-pointer ${language === 'pl' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>PL</button>
            </div>
          </nav>
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setLanguage('uk')} className={`text-xs cursor-pointer ${language === 'uk' ? 'text-crimson font-bold' : 'text-ink-light'}`}>UA</button>
              <button onClick={() => setLanguage('en')} className={`text-xs cursor-pointer ${language === 'en' ? 'text-crimson font-bold' : 'text-ink-light'}`}>EN</button>
              <button onClick={() => setLanguage('pl')} className={`text-xs cursor-pointer ${language === 'pl' ? 'text-crimson font-bold' : 'text-ink-light'}`}>PL</button>
            </div>
            <button className="text-ink cursor-pointer">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="about" className="pt-20 pb-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-crimson font-semibold tracking-[0.2em] text-sm uppercase mb-6 block">
              {t.heroTag}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-8 leading-tight">
              {t.heroTitlePart1} <br/>
              <span className="text-gold italic font-normal">{t.heroTitlePart2}</span>
            </h1>
            <p className="text-xl text-ink-light max-w-2xl mx-auto mb-12 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Directory & Pedigree View */}
        <section id="families" className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar with Families */}
            <div className="col-span-1 border border-parchment-dark rounded-xl bg-white p-6 h-fit sticky top-28">
              <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-ink-light mb-4">
                {t.familyList}
              </h3>
              
              <div className="space-y-2">
                {DEFAULT_FAMILIES.map(family => (
                  <button
                    key={family.id}
                    onClick={() => handleSetSelectedFamily(family)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      selectedFamily?.id === family.id 
                        ? 'bg-ink text-parchment shadow-md' 
                        : 'hover:bg-parchment hover:text-crimson'
                    }`}
                  >
                    <span className="font-display font-medium text-lg">{family.name[language]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 lg:col-span-3">
              {selectedFamily ? (
                <PedigreeView family={selectedFamily} />
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-ink-light p-12 border border-dashed border-parchment-dark rounded-xl bg-white/40">
                  <BookOpen className="w-16 h-16 text-gold/30 mb-6" />
                  <p className="text-xl font-display text-center">{t.emptySelection}</p>
                </div>
              )}
            </div>
            
          </div>
        </section>
      </main>

      <div id="contact">
        <ContactSection />
      </div>

      <footer className="bg-ink py-8 border-t border-white/10 text-center">
        <p className="text-parchment-dark/50 text-sm">
          © {new Date().getFullYear()} {t.titlePrefix} {t.titleSuffix}. {t.footerRight}
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
