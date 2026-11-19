import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Target, 
  BookOpen, 
  Layers, 
  BarChart3, 
  Terminal,
  FileText,
  ShieldCheck,
  Sparkles,
  Compass,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { getStoredQuestions, getStoredResults } from './utils/storage';
import { Question, QuizResult } from './types/quiz';
import { QuickDrill } from './components/QuickDrill';
import { CatSimulator } from './components/CatSimulator';
import { KisiKisiView } from './components/KisiKisiView';
import { TacticGuides } from './components/TacticGuides';
import { QuestionManager } from './components/QuestionManager';
import { AnalyticsView } from './components/AnalyticsView';
import { OfficialDocModule } from './components/OfficialDocModule';

type Tab = 'DRILL' | 'SIMULASI' | 'KISI_KISI' | 'DOC_2026' | 'TAKTIK' | 'BANK_SOAL' | 'RADAR';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('DRILL');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    setQuestions(getStoredQuestions());
    setResults(getStoredResults());
  }, []);

  const handleQuestionsUpdated = (updated: Question[]) => {
    setQuestions(updated);
  };

  const highestScore = results.length > 0 ? Math.max(...results.map(r => r.totalScore)) : 0;

  const navItems = [
    { id: 'DRILL' as Tab, label: 'Drill Kilat', icon: Zap, badge: `${questions.length || 1500}+` },
    { id: 'KISI_KISI' as Tab, label: 'Kisi-Kisi BKN', icon: Compass, badge: 'Resmi' },
    { id: 'SIMULASI' as Tab, label: 'Simulasi CAT', icon: Target },
    { id: 'DOC_2026' as Tab, label: 'Modul Dokumen', icon: FileText, badge: 'FR' },
    { id: 'TAKTIK' as Tab, label: 'Arsenal Taktis', icon: BookOpen },
    { id: 'BANK_SOAL' as Tab, label: 'Bank Soal', icon: Layers, badge: `${questions.length || 1500}` },
    { id: 'RADAR' as Tab, label: 'Radar Evaluasi', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { id: 'TAKTIK' as Tab, label: 'Arsenal Taktis', desc: 'Rumus Kilat, Kausa Pancasila & Logika Silogisme', icon: BookOpen },
    { id: 'BANK_SOAL' as Tab, label: 'Bank Soal 1500+', desc: 'Audit, Search & Manajemen Vault Soal', icon: Layers, badge: `${questions.length || 1500}` },
    { id: 'RADAR' as Tab, label: 'Radar Evaluasi', desc: 'Analisis Passing Grade & Prediksi Ranking 3x', icon: BarChart3 },
  ];

  const handleSelectTab = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Editorial Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between gap-4">
          
          {/* Brand & Monogram */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => handleSelectTab('DRILL')}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-slate-800 transition-colors">
              <Terminal className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">
                CPNS Tactical
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                2026
              </span>
            </div>
          </div>

          {/* Concentric Segmented Tab Navigation (Desktop >= lg) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/80 border border-slate-200/70 p-1 rounded-xl">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`ps-3 pe-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer select-none transition-all duration-150 ease-out active:scale-[0.96] ${
                    isActive
                      ? 'bg-white text-slate-900 font-semibold shadow-tab-active border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 stroke-[2] ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/60' 
                        : 'bg-slate-200/70 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2">
            {/* Live Target Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200/80 bg-slate-50 text-xs font-mono text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 hidden xs:inline">Target</span>
              <span className="font-bold text-slate-900">≥ 440</span>
              {highestScore > 0 && (
                <span className="text-slate-400 pl-1 border-l border-slate-200 hidden sm:inline">
                  Best: <b className="text-slate-900 font-bold">{highestScore}</b>
                </span>
              )}
            </div>

            {/* Quick CAT Test Action Button */}
            <button
              onClick={() => handleSelectTab('SIMULASI')}
              className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs active:scale-[0.96] transition-all cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden xs:inline">Simulasi CAT</span>
              <span className="xs:hidden">CAT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with bottom safe padding for mobile dock */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-12 animate-fade-in">
        {activeTab === 'DRILL' && (
          <QuickDrill 
            questions={questions} 
            onOpenTactics={() => handleSelectTab('TAKTIK')}
          />
        )}

        {activeTab === 'KISI_KISI' && (
          <KisiKisiView 
            questions={questions}
            onStartDrill={() => handleSelectTab('DRILL')}
          />
        )}

        {activeTab === 'SIMULASI' && (
          <CatSimulator 
            questions={questions} 
            onFinish={() => setResults(getStoredResults())}
          />
        )}

        {activeTab === 'DOC_2026' && (
          <OfficialDocModule />
        )}

        {activeTab === 'TAKTIK' && (
          <TacticGuides />
        )}

        {activeTab === 'BANK_SOAL' && (
          <QuestionManager 
            questions={questions} 
            onQuestionsUpdated={handleQuestionsUpdated}
          />
        )}

        {activeTab === 'RADAR' && (
          <AnalyticsView 
            results={results} 
            onStartExam={() => handleSelectTab('SIMULASI')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Dock (Native iOS/Android feel, Thumb Zone) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shadow-lg pb-safe">
        <button
          onClick={() => handleSelectTab('DRILL')}
          className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all active:scale-[0.92] ${
            activeTab === 'DRILL' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'DRILL' ? 'bg-slate-100 text-slate-900' : ''}`}>
            <Zap className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span>Drill Kilat</span>
        </button>

        <button
          onClick={() => handleSelectTab('KISI_KISI')}
          className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all active:scale-[0.92] ${
            activeTab === 'KISI_KISI' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'KISI_KISI' ? 'bg-slate-100 text-slate-900' : ''}`}>
            <Compass className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span>Kisi-Kisi</span>
        </button>

        {/* Center Prominent CAT Simulator Button */}
        <button
          onClick={() => handleSelectTab('SIMULASI')}
          className="flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all active:scale-[0.92]"
        >
          <div className={`p-1.5 -mt-3 rounded-xl shadow-xs transition-all ${
            activeTab === 'SIMULASI'
              ? 'bg-blue-600 text-white shadow-blue-500/30'
              : 'bg-slate-900 text-white shadow-slate-900/20'
          }`}>
            <Target className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className={activeTab === 'SIMULASI' ? 'text-blue-600 font-bold' : 'text-slate-700 font-semibold'}>
            Simulasi CAT
          </span>
        </button>

        <button
          onClick={() => handleSelectTab('DOC_2026')}
          className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all active:scale-[0.92] ${
            activeTab === 'DOC_2026' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'DOC_2026' ? 'bg-slate-100 text-slate-900' : ''}`}>
            <FileText className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span>Modul FR</span>
        </button>

        {/* More / Menu Drawer Toggle */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all active:scale-[0.92] ${
            ['TAKTIK', 'BANK_SOAL', 'RADAR'].includes(activeTab) || mobileMenuOpen
              ? 'text-slate-900 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${
            ['TAKTIK', 'BANK_SOAL', 'RADAR'].includes(activeTab) || mobileMenuOpen
              ? 'bg-slate-100 text-slate-900'
              : ''
          }`}>
            <Menu className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span>Lainnya</span>
        </button>
      </nav>

      {/* Mobile "Lainnya" Slide-Up Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sheet Container */}
          <div className="relative bg-white border-t border-slate-200 rounded-t-3xl p-5 pb-8 shadow-2xl space-y-4 animate-fade-in z-10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-700" />
                <span className="font-bold text-sm text-slate-900">Modul Tambahan & Analisis</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {secondaryNavItems.map(item => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 active:scale-[0.98] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-2xs border border-slate-200/60'}`}>
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">{item.label}</div>
                        <div className={`text-[11px] leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <div className="text-[11px] font-mono text-slate-400">
                Passing Grade Resmi: TWK 65 • TIU 80 • TKP 166
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Polished Tactical Footer (Hidden on mobile or compact) */}
      <footer className="hidden lg:block border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500 font-mono space-y-1">
        <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          <span>CPNS 2026 TACTICAL DRILL PLATFORM • SKD & TEKNIK INFORMATIKA</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Ambang Batas Resmi: TWK 65, TIU 80, TKP 166 • Target Kuota Ranking 3x Formasi: ≥ 440 Poin.
        </div>
      </footer>
    </div>
  );
};
