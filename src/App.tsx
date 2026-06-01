import React, { useState, useEffect } from 'react';
import { DEFAULT_FAMILIES } from './data';
import PedigreeView from './components/PedigreeView';
import ContactSection from './components/ContactSection';
import { BookOpen, Search, Menu, MousePointerClick } from 'lucide-react';
import { FamilyConfig } from './types';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const [selectedFamily, setSelectedFamily] = useState<FamilyConfig | null>(DEFAULT_FAMILIES[0]);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    document.title = `${t.titlePrefix} ${t.titleSuffix}`;
  }, [t.titlePrefix, t.titleSuffix]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-parchment-dark bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedFamily(null)}>
            <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center">
              <BookOpen className="text-gold w-5 h-5" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-wide text-ink uppercase hidden sm:block">
              {t.titlePrefix} <span className="text-gold">{t.titleSuffix}</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#families" className="text-ink hover:text-crimson transition-colors flex items-center gap-1.5 cursor-pointer">
              <MousePointerClick className="w-3.5 h-3.5 text-crimson" />
              {t.navFamilies}
            </a>
            <a href="#about" className="text-ink hover:text-crimson transition-colors flex items-center gap-1.5 cursor-pointer">
              <MousePointerClick className="w-3.5 h-3.5 text-crimson" />
              {t.navAbout}
            </a>
            <a href="#contact" className="text-ink hover:text-crimson transition-colors flex items-center gap-1.5 cursor-pointer">
              <MousePointerClick className="w-3.5 h-3.5 text-crimson" />
              {t.navContact}
            </a>
            
            <div className="flex items-center gap-2 border-l border-parchment-dark pl-6">
              <MousePointerClick className="w-4 h-4 text-crimson mr-1" />
              <button onClick={() => setLanguage('uk')} className={`transition-colors cursor-pointer ${language === 'uk' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>UA</button>
              <button onClick={() => setLanguage('en')} className={`transition-colors cursor-pointer ${language === 'en' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>EN</button>
              <button onClick={() => setLanguage('pl')} className={`transition-colors cursor-pointer ${language === 'pl' ? 'text-crimson font-bold' : 'text-ink-light hover:text-ink'}`}>PL</button>
            </div>
          </nav>
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-crimson" />
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
            <h2 className="text-5xl md:text-7xl font-display font-bold text-ink mb-8 leading-tight">
              {t.heroTitlePart1} <br/>
              <span className="text-gold italic font-normal">{t.heroTitlePart2}</span>
            </h2>
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
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-parchment-dark bg-parchment focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-ink-light/50" />
              </div>
              
              <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-ink-light mb-4">
                {t.familyList}
              </h3>
              
              <div className="space-y-2">
                {DEFAULT_FAMILIES.map(family => (
                  <button
                    key={family.id}
                    onClick={() => setSelectedFamily(family)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
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
