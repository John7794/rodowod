import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Person, TreeItem, FamilyConfig } from '../types';
import { buildGenerationalTree, flattenGenerationalTree, romanize } from '../lib/treeUtils';
import { MOCK_SHEET_CSV } from '../data';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

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
    
    // For this demonstration, we simulate network delay and use our mock CSV data
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
        
        Papa.parse(MOCK_SHEET_CSV, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              setError(t.errorDesc);
              return;
            }
            
            const parsedPeople: Person[] = results.data.map((row: any) => ({
              id: row.id,
              parentId: row.parentId || null,
              name: row.name || 'Невідомо',
              birthDeath: row.birthDeath || '',
              description: row.description || '',
              coatOfArms: row.coatOfArms || undefined,
              order: row.order ? parseInt(row.order) : undefined,
            }));
            
            setPeople(parsedPeople);
          },
          error: (err: any) => {
            setError(err.message);
          }
        });
      } catch (err: any) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [family, t.errorDesc]);

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
  const flattened = flattenGenerationalTree(tree);

  // Group by generation level
  const generations = flattened.reduce((acc, person) => {
    const level = person.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(person);
    return acc;
  }, {} as Record<number, typeof flattened>);

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white/60 p-6 md:p-12 shadow-sm rounded-xl border border-parchment-dark/50 backdrop-blur-sm relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display text-ink mb-4">{t.familyPrefix} {family.name[language]}</h2>
        {family.coatOfArms[language] && (
          <p className="text-ink-light italic mb-6">{t.coatOfArmsPrefix} {family.coatOfArms[language]}</p>
        )}
        <div className="w-24 h-[1px] bg-gold mx-auto mb-6"></div>
        <p className="text-ink-light leading-relaxed max-w-2xl mx-auto">{family.historyPreview[language]}</p>
      </div>

      <div className="space-y-16">
        {Object.entries(generations).map(([levelNum, members]) => {
          const genRoman = romanize(parseInt(levelNum));
          return (
            <div key={levelNum} className="relative">
              <h3 className="text-2xl font-display text-crimson mb-8 border-b border-parchment-dark pb-2 flex items-center gap-4">
                <span className="text-gold font-sans font-medium text-sm tracking-widest uppercase">{t.generation}</span>
                {genRoman}
              </h3>
              
              <div className="space-y-8 pl-0 md:pl-8">
                {members.map((person) => (
                  <div key={person.id} className="relative group">
                    <div className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300 hidden md:block"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                      <span className="font-mono text-gold-light text-sm hidden md:inline-block w-8">
                        {person.itemIndex}
                      </span>
                      <h4 className="text-xl font-display font-semibold text-ink">
                        {person.name}
                      </h4>
                      {person.birthDeath && (
                        <span className="text-ink-light text-sm italic">
                          ({person.birthDeath})
                        </span>
                      )}
                    </div>
                    
                    {person.description && (
                      <p className="text-ink-light leading-relaxed text-sm md:pl-12">
                        {person.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
