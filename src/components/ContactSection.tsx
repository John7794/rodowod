import React from 'react';
import { Mail, ArrowRight, Scroll } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactSection() {
  const authorEmail = "www.johnsel771994@gmail.com";
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-ink text-parchment">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Scroll className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl md:text-5xl font-display mb-6 text-parchment">
          {t.contactTitle}
        </h2>
        <p className="text-parchment-dark/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.contactDesc1}
        </p>
        
        <div className="bg-ink-light/30 border border-gold/20 p-8 md:p-12 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm">
          <h3 className="text-2xl font-display mb-4">{t.contactSectionTitle}</h3>
          <p className="text-parchment-dark/70 mb-8">
            {t.contactDesc2}
          </p>
          <a 
            href={`mailto:${authorEmail}`}
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-ink px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
            {t.contactButton}
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
