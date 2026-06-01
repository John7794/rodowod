import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Person, TreeItem, FamilyConfig } from '../types';
import { buildGenerationalTree, flattenGenerationalTreeClassic } from '../lib/treeUtils';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

function formatTextWithLinks(text: string) {
  if (!text) return '';
  const escapeHtml = (str: string) => str.replace(/[&<>"']/g, match => {
    const escape: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return escape[match] || match;
  });
  let safeText = escapeHtml(text);
  
  const tokens: string[] = [];
  safeText = safeText.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, url) => {
    const token = `@@LINK${tokens.length}@@`;
    tokens.push(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-crimson hover:text-crimson-dark underline decoration-crimson/30 underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1"><span>${label}</span><svg class="w-3 h-3 opacity-70 -mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l6 6-6 6"/><path d="M4 12h16"/></svg></a>`);
    return token;
  });

  safeText = safeText.replace(/(https?:\/\/[^\s<]+)/g, (match) => {
    const token = `@@LINK${tokens.length}@@`;
    tokens.push(`<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-crimson hover:text-crimson-dark underline decoration-crimson/30 underline-offset-2 transition-colors break-all cursor-pointer inline-flex items-center gap-1"><span>${match}</span><svg class="w-3 h-3 opacity-70 -mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l6 6-6 6"/><path d="M4 12h16"/></svg></a>`);
    return token;
  });

  tokens.forEach((html, i) => {
    safeText = safeText.replace(`@@LINK${i}@@`, html);
  });
  
  safeText = safeText.replace(/\n/g, '<br/>');
  return safeText;
}

interface PedigreeViewProps {
  family: FamilyConfig;
}

export default function PedigreeView({ family }: PedigreeViewProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setError(null);

    // In a real application, you would fetch the public Google Sheets CSV URL:
    // fetch(family.googleSheetCsvUrl).then(res => res.text()).then(...)
    
    const loadData = async () => {
      try {
        const processResults = (results: Papa.ParseResult<any>) => {
          if (results.errors.length > 0) {
            setError(t.errorDesc);
            setLoading(false);
            return;
          }
          
          const parsedPeople: Person[] = results.data.map((row: any) => ({
            id: String(row.id),
            parentId: row.parentId ? String(row.parentId) : null,
            name: row.name || 'Невідомо',
            birthDate: row.birthDate || '',
            birthPlace: row.birthPlace || '',
            deathDate: row.deathDate || '',
            deathPlace: row.deathPlace || '',
            marriageDate: row.marriageDate || '',
            marriagePlace: row.marriagePlace || '',
            description: row.description || '',
            sources: row.sources || '',
            coatOfArms: row.coatOfArms || undefined,
            order: row.order ? parseInt(row.order) : undefined,
          }));
          
          setPeople(parsedPeople);
          setLoading(false);
        };

        const url = family.googleSheetCsvUrl[language];
        if (url && url.startsWith('http')) {
          Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: processResults,
            error: (err: any) => {
              setError(err.message);
              setLoading(false);
            }
          });
        } else {
          setError('Google Sheet CSV URL is missing or invalid.');
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message || 'Error');
        setLoading(false);
      }
    };

    loadData();
  }, [family, language, t.errorDesc]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-ink-light">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-gold" />
        <p className="font-display italic text-lg">{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-6 rounded-lg max-w-2xl mx-auto flex items-start gap-4">
        <AlertCircle className="shrink-0 w-6 h-6 text-red-600" />
        <div>
          <h3 className="font-bold text-lg mb-1">{t.errorTitle}</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const tree = buildGenerationalTree(people);
  const flattened = flattenGenerationalTreeClassic(tree);

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-[#fdfbf7] p-6 md:p-12 shadow-sm rounded border border-[#e8dfc9] relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      
      <div className="sticky top-[64px] md:top-20 z-30 bg-[#fdfbf7] py-3 md:py-4 mb-6 border-b border-[#e8dfc9] -mx-6 px-6 md:-mx-12 md:px-12 -mt-6 md:-mt-12 rounded-t shadow-sm">
        <div className="flex flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-left flex-1">
            <h2 className="text-lg md:text-3xl font-display font-medium text-ink mb-0.5 md:mb-1 leading-tight">
              <span className="block">{t.titleFamilyPrefix} {family.name[language]}</span>
              <span className="block">{t.titleFamilySuffix} {family.coatOfArms[language]}</span>
            </h2>
            {family.historyPreview?.[language] && (
              <p className="text-ink-light text-[10px] md:text-xs italic mt-0.5 md:mt-1 text-left line-clamp-2 md:line-clamp-none">
                [{family.historyPreview[language]}]
              </p>
            )}
          </div>
          
          <div className="shrink-0 flex items-center justify-center border-l border-[#e8dfc9] pl-4 md:pl-6">
            {family.coatOfArmsImageUrl ? (
              <img 
                src={family.coatOfArmsImageUrl} 
                alt={`${family.coatOfArms[language]} coat of arms`} 
                className="w-auto h-12 md:h-20 filter drop-shadow opacity-95 hover:opacity-100 transition-opacity"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" className="w-10 h-12 md:w-16 md:h-20 filter drop-shadow opacity-95 hover:opacity-100 transition-opacity">
                <path d="M 10 10 L 90 10 L 90 60 C 90 90, 50 115, 50 115 C 50 115, 10 90, 10 60 Z" fill="#991b1b" stroke="#c5a059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 35 110 C 35 95, 65 95, 65 110" fill="#a4a4a4" stroke="#c5a059" strokeWidth="1.5" />
                <rect x="46" y="40" width="8" height="55" fill="#f8fafc" rx="2" />
                <rect x="30" y="55" width="40" height="8" fill="#f8fafc" rx="2" />
                <rect x="18" y="70" width="16" height="4" fill="#f8fafc" rx="1" transform="rotate(45 26 72)" />
                <rect x="24" y="64" width="4" height="16" fill="#f8fafc" rx="1" transform="rotate(45 26 72)" />
                <rect x="66" y="70" width="16" height="4" fill="#f8fafc" rx="1" transform="rotate(-45 74 72)" />
                <rect x="72" y="64" width="4" height="16" fill="#f8fafc" rx="1" transform="rotate(-45 74 72)" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="font-mono text-[13px] md:text-[14px] text-ink-light leading-relaxed whitespace-pre-wrap">
        {flattened.map((person, index) => (
          <React.Fragment key={person.id}>
            {person.level === 1 && index > 0 && (
              <div className="h-px bg-gold/40 w-full my-6 md:my-8" />
            )}
            <div 
              style={{ 
                paddingLeft: `${(person.level - 1) * 1.5}rem`, 
                textIndent: '-1.5rem', 
                marginLeft: '1.5rem' 
              }} 
              className={`mb-1 ${person.level === 1 ? 'mt-4 font-bold' : ''}`}
            >
            <span className="font-medium text-ink mr-2">{person.treeIndex}</span>
            <span className="font-bold text-ink">{person.name}</span>
            
            {(person.birthDate || person.deathDate || person.birthPlace || person.deathPlace) && (
              <span className="ml-1 opacity-90">
                (* {person.birthDate || '?'} 
                {person.birthPlace ? ` {${t.bornAbbr} ${person.birthPlace}}` : ''} 
                {' '}† {person.deathDate || '?'}
                {person.deathPlace ? ` {${t.diedAbbr} ${person.deathPlace}}` : ''})
              </span>
            )}

            {(person.marriageDate || person.marriagePlace) && (
              <span className="ml-2 font-medium opacity-90 text-crimson-dark">
                (∞ {person.marriageDate || '?'}
                {person.marriagePlace ? ` {${person.marriagePlace}}` : ''})
              </span>
            )}
            
            {person.description && (
              <div 
                className="mt-0.5" 
                style={{ textIndent: '0' }}
              >
                {person.description.split(/(?:\n|(?=\s*(?:∞|Дружина:|Wife:|Żona:|Чоловік:|Husband:|Mąż:)))/).map((part, i) => {
                  const trimmed = part.trim();
                  if (!trimmed) return null;
                  const isMarriage = /^(∞|Дружина:|Wife:|Żona:|Чоловік:|Husband:|Mąż:)/i.test(trimmed);
                  if (isMarriage) {
                    return (
                      <div key={i} className="pl-4 md:pl-6 text-ink/95 font-medium mt-1">
                        <span dangerouslySetInnerHTML={{ __html: formatTextWithLinks(trimmed) }} />
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="text-ink-light pl-2" dangerouslySetInnerHTML={{ __html: formatTextWithLinks(trimmed) }} />
                  );
                })}
              </div>
            )}
            
            {person.sources && (
              <div className="ml-2 mt-1 mb-2 opacity-70 border-l border-gold/40 pl-2 lg:pl-3" style={{ textIndent: '0' }}>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-0.5">
                  {t.sources}
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatTextWithLinks(person.sources) }} />
              </div>
            )}
          </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
