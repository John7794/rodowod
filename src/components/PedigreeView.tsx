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
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-2">
          {t.titleFamilyPrefix} {family.name[language]} {t.titleFamilySuffix} {family.coatOfArms[language]}
        </h2>
        {family.historyPreview?.[language] && (
          <p className="text-ink-light text-sm italic max-w-4xl mx-auto mt-4 px-4">
            [{family.historyPreview[language]}]
          </p>
        )}
      </div>

      <div className="font-mono text-[13px] md:text-[14px] text-ink-light leading-relaxed whitespace-pre-wrap">
        {flattened.map((person) => (
          <div 
            key={person.id} 
            style={{ 
              paddingLeft: `${(person.level - 1) * 1.5}rem`, 
              textIndent: '-1.5rem', 
              marginLeft: '1.5rem' 
            }} 
            className="mb-1"
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
            
            {person.description && (
              <div 
                className="mt-0.5" 
                style={{ textIndent: '0' }}
              >
                {person.description.split(/(?:\n|(?=\s*∞))/).map((part, i) => {
                  const trimmed = part.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('∞')) {
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
        ))}
      </div>
    </div>
  );
}
