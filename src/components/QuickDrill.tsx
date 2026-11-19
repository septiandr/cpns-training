import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, OptionKey, Category } from '../types/quiz';
import { 
  Zap, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Flame,
  Sparkles,
  Shuffle,
  Keyboard,
  RotateCcw,
  CheckCheck,
  Filter,
  EyeOff
} from 'lucide-react';
import { 
  toggleBookmark, 
  getBookmarkedIds, 
  getDrillHistory, 
  recordDrillAnswer, 
  clearDrillHistory,
  DrillHistoryRecord 
} from '../utils/storage';

interface QuickDrillProps {
  questions: Question[];
  onOpenTactics?: () => void;
}

// Fisher-Yates Shuffle Algorithm for uniform randomization
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuickDrill: React.FC<QuickDrillProps> = ({ questions }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNANSWERED' | 'WRONG'>('UNANSWERED');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedIds());
  const [drillHistory, setDrillHistory] = useState<Record<string, DrillHistoryRecord>>(getDrillHistory());
  
  // Drill session stats
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Compute category pool counts
  const categoryPool = useMemo(() => {
    return selectedCategory === 'ALL'
      ? questions
      : questions.filter(q => q.category === selectedCategory);
  }, [questions, selectedCategory]);

  const unansweredCount = useMemo(() => {
    return categoryPool.filter(q => !drillHistory[q.id]).length;
  }, [categoryPool, drillHistory]);

  const wrongCount = useMemo(() => {
    return categoryPool.filter(q => drillHistory[q.id] && !drillHistory[q.id].isCorrect).length;
  }, [categoryPool, drillHistory]);

  const answeredInCatCount = categoryPool.length - unansweredCount;

  // Filter & randomize questions whenever category, statusFilter, or questions change
  const buildShuffledQueue = useCallback(() => {
    if (categoryPool.length === 0) {
      setShuffledQuestions([]);
      return;
    }

    let filtered = categoryPool;
    if (statusFilter === 'UNANSWERED') {
      const unanswered = categoryPool.filter(q => !drillHistory[q.id]);
      filtered = unanswered.length > 0 ? unanswered : categoryPool;
    } else if (statusFilter === 'WRONG') {
      const wrong = categoryPool.filter(q => drillHistory[q.id] && !drillHistory[q.id].isCorrect);
      filtered = wrong;
    }

    setShuffledQuestions(shuffleArray(filtered));
    setCurrentIndex(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setSecondsSpent(0);
    setTimerActive(true);
  }, [categoryPool, statusFilter, drillHistory]);

  useEffect(() => {
    buildShuffledQueue();
  }, [selectedCategory, statusFilter]);

  const handleReshuffle = () => {
    buildShuffledQueue();
  };

  const handleResetHistory = () => {
    if (window.confirm('Reset riwayat pengerjaan Drill Kilat? Seluruh catatan soal yang sudah dijawab akan dikembalikan ke status belum dijawab.')) {
      clearDrillHistory();
      setDrillHistory({});
      setStatusFilter('UNANSWERED');
      setTimeout(() => {
        handleReshuffle();
      }, 50);
    }
  };

  const currentQ: Question | undefined = shuffledQuestions[currentIndex % Math.max(1, shuffledQuestions.length)];

  // Timer per question
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isAnswered) {
      interval = setInterval(() => {
        setSecondsSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isAnswered]);

  const handleSelectOption = useCallback((opt: OptionKey) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(opt);
    setIsAnswered(true);
    setTimerActive(false);

    setTotalAnswered(prev => prev + 1);
    
    let isCorrect = false;
    if (currentQ.category === 'TKP') {
      const score = currentQ.optionScores?.[opt] || 0;
      isCorrect = score === 5;
    } else {
      isCorrect = opt === currentQ.correctOption;
    }

    if (isCorrect) {
      setStreak(prev => prev + 1);
      setCorrectCount(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Persist to drill history so questions never repeat in UNANSWERED mode
    const updatedHistory = recordDrillAnswer(currentQ.id, isCorrect, opt);
    setDrillHistory(updatedHistory);
  }, [isAnswered, currentQ]);

  const handleNext = useCallback(() => {
    setIsAnswered(false);
    setSelectedOption(null);
    setSecondsSpent(0);
    setTimerActive(true);
    setCurrentIndex(prev => (prev + 1) % Math.max(1, shuffledQuestions.length));
  }, [shuffledQuestions.length]);

  // Keyboard Shortcuts (A, B, C, D, E for answer, Enter / Right Arrow for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (!isAnswered && ['A', 'B', 'C', 'D', 'E'].includes(key)) {
        handleSelectOption(key as OptionKey);
      } else if (isAnswered && (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ')) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleSelectOption, handleNext]);

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setBookmarkedIds(updated);
  };

  if (!currentQ || shuffledQuestions.length === 0) {
    return (
      <div className="max-w-xl mx-auto space-y-6 pt-10 text-center animate-fade-in">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-2xs">
            <CheckCheck className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {statusFilter === 'UNANSWERED' 
              ? 'Seluruh Soal Sudah Dikerjakan!' 
              : statusFilter === 'WRONG'
                ? 'Tidak Ada Soal Salah'
                : 'Tidak Ada Soal'}
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            {statusFilter === 'UNANSWERED'
              ? `Hebat! Anda telah menuntaskan seluruh ${categoryPool.length} soal unik dalam topik ${selectedCategory}. Tidak ada lagi soal yang tersisa dalam antrean belum dijawab.`
              : statusFilter === 'WRONG'
                ? 'Semua soal yang Anda kerjakan dalam topik ini terjawab benar atau belum ada catatan soal salah.'
                : 'Belum ada soal yang tersedia pada kriteria ini.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 active:scale-[0.96] transition-transform cursor-pointer"
            >
              Ulangi Semua Soal ({categoryPool.length})
            </button>
            {wrongCount > 0 && statusFilter !== 'WRONG' && (
              <button
                onClick={() => setStatusFilter('WRONG')}
                className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs hover:bg-rose-100 active:scale-[0.96] transition-transform cursor-pointer"
              >
                Latih {wrongCount} Soal Pernah Salah
              </button>
            )}
            <button
              onClick={handleResetHistory}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 active:scale-[0.96] transition-transform cursor-pointer"
            >
              Reset Riwayat Drill
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(currentQ.id);
  const isTkp = currentQ.category === 'TKP';
  const selectedScore = selectedOption && isTkp ? (currentQ.optionScores?.[selectedOption] ?? 0) : 0;
  const isPerfect = isTkp ? selectedScore === 5 : selectedOption === currentQ.correctOption;

  // Tough-Love Drill Reality Evaluation
  const getCoachComment = () => {
    if (!isAnswered) return null;
    if (secondsSpent > 54) {
      return {
        type: 'danger',
        msg: `⚠️ Waktu pengerjaan Anda (${secondsSpent} detik) MELEBIHI batas aman 54 detik CAT! Di ujian sebenarnya, ini merampas jatah waktu Anda di pilar TIU.`
      };
    }
    if (isPerfect) {
      return {
        type: 'success',
        msg: `🔥 Presisi tepat! Anda menyelesaikan soal ini dalam ${secondsSpent} detik (${secondsSpent <= 30 ? 'Refleks Luar Biasa Cepat!' : 'Dalam batas aman'}). Pertahankan!`
      };
    }
    if (isTkp) {
      return {
        type: 'warning',
        msg: `❌ Jawaban Anda bernilai Skor ${selectedScore}/5! Masih terlalu pasif atau ragu mengambil tanggung jawab. Di TKP, selisih 1 poin adalah selisih kursi formasi!`
      };
    }
    return {
      type: 'danger',
      msg: `💀 SALAH! Anda terjebak pengecoh karena kurang cermat menganalisis premis. Pelajari celah kesalahannya di bawah!`
    };
  };

  const coachFeedback = getCoachComment();

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-20 animate-fade-in">
      {/* Top Controller Bar - Refined Concentric Dock */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 space-y-3 shadow-xs">
        {/* Row 1: Category Filter & Anti-Repeat Status Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Category Filter Segmented Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 overflow-x-auto scrollbar-none max-w-full">
            {(['ALL', 'TWK', 'TIU', 'TKP', 'SKB_TI'] as const).map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ease-out cursor-pointer active:scale-[0.96] shrink-0 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-tab-active border border-slate-200/40'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua Topik' : cat === 'SKB_TI' ? 'SKB TI' : cat}
                </button>
              );
            })}
          </div>

          {/* Mode Selector: Belum Dijawab (Anti-Berulang) vs Semua vs Salah */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold overflow-x-auto scrollbar-none shrink-0">
            <button
              onClick={() => setStatusFilter('UNANSWERED')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'UNANSWERED'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Prioritaskan 100% soal yang belum pernah dijawab (Anti-Berulang)"
            >
              Belum Dijawab ({unansweredCount})
            </button>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan semua soal teracak"
            >
              Semua ({categoryPool.length})
            </button>
            {wrongCount > 0 && (
              <button
                onClick={() => setStatusFilter('WRONG')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === 'WRONG'
                    ? 'bg-rose-600 text-white shadow-xs font-bold'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
                title="Latih kembali soal-soal yang pernah salah"
              >
                Salah ({wrongCount})
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Live Metrics Dock & Reset */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleReshuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs font-mono font-bold border border-slate-200/80 active:scale-[0.96] transition-all cursor-pointer"
              title="Acak ulang antrean soal sekarang"
            >
              <Shuffle className="w-3.5 h-3.5 text-blue-600 stroke-[2.2]" />
              <span>Acak Soal</span>
            </button>

            {streak > 1 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-mono shadow-2xs">
                <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{streak} Streak</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/80">
              <span className="text-slate-500">Akurasi:</span>
              <span className="font-extrabold text-slate-900">
                {totalAnswered > 0 ? `${Math.round((correctCount / totalAnswered) * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Progress: <strong className="text-slate-800">{answeredInCatCount}</strong> / {categoryPool.length} Unik
            </span>
            <div className="text-xs font-mono font-bold text-slate-800 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80">
              {(currentIndex % Math.max(1, shuffledQuestions.length)) + 1} / {shuffledQuestions.length}
            </div>
            {Object.keys(drillHistory).length > 0 && (
              <button
                onClick={handleResetHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Reset seluruh riwayat pengerjaan drill"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Question Surface with Concentric Alignment */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
        {/* Card Header Info */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-extrabold uppercase tracking-wide">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-600 font-bold">
              {currentQ.subCategory}
            </span>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${
              currentQ.difficulty.includes('Hard') 
                ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
              secondsSpent > 54 
                ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse' 
                : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}>
              <Clock className={`w-3.5 h-3.5 stroke-[2] ${secondsSpent > 54 ? 'text-rose-600' : 'text-blue-600'}`} />
              <span>{secondsSpent}s</span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(Batas 54s)</span>
            </div>

            {/* Bookmark button with active scale */}
            <button
              onClick={() => handleToggleBookmark(currentQ.id)}
              className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-50 active:scale-[0.96] transition-all cursor-pointer border border-transparent hover:border-slate-200"
              title={isBookmarked ? 'Hapus bookmark' : 'Simpan soal ini'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500/20" />
              ) : (
                <Bookmark className="w-5 h-5 stroke-[1.8]" />
              )}
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-base md:text-lg text-slate-900 font-medium leading-relaxed whitespace-pre-line tracking-normal">
          {currentQ.question}
        </div>

        {/* Code Snippet Box (for TI / Prakom questions) */}
        {currentQ.codeSnippet && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
            {currentQ.codeSnippet}
          </div>
        )}

        {/* Options List with Concentric Inner Radius and Optical Nudge */}
        <div className="space-y-2.5 pt-1">
          {(['A', 'B', 'C', 'D', 'E'] as OptionKey[]).map(opt => {
            const isSelected = selectedOption === opt;
            const isCorrectAnswer = !isTkp && currentQ.correctOption === opt;
            const tkpScore = isTkp ? currentQ.optionScores?.[opt] : null;

            let buttonStyle = 'bg-slate-50/70 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:bg-white';

            if (isAnswered) {
              if (isTkp) {
                if (tkpScore === 5) {
                  buttonStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold shadow-xs';
                } else if (isSelected) {
                  buttonStyle = 'bg-amber-50/90 border-amber-400 text-amber-950 font-medium shadow-xs';
                } else {
                  buttonStyle = 'bg-slate-50/40 border-slate-200/60 text-slate-400 opacity-60';
                }
              } else {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold shadow-xs';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'bg-rose-50/90 border-rose-400 text-rose-950 font-medium shadow-xs';
                } else {
                  buttonStyle = 'bg-slate-50/40 border-slate-200/60 text-slate-400 opacity-60';
                }
              }
            } else if (isSelected) {
              buttonStyle = 'bg-blue-50 border-blue-600 text-blue-950 shadow-xs font-medium';
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`w-full ps-3.5 pe-4 py-3.5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 ease-out cursor-pointer ${buttonStyle} ${
                  !isAnswered ? 'active:scale-[0.98]' : ''
                }`}
              >
                <span className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                  isSelected 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {opt}
                </span>

                <span className="text-sm md:text-base leading-snug flex-1 pt-0.5">
                  {currentQ.options[opt]}
                </span>

                {isAnswered && (
                  <span className="shrink-0 text-xs font-mono font-bold pt-0.5">
                    {isTkp ? (
                      <span className={`px-2.5 py-1 rounded-md ${
                        tkpScore === 5 ? 'bg-emerald-100 text-emerald-800 font-extrabold' : 'bg-slate-200 text-slate-700'
                      }`}>
                        +{tkpScore} Poin
                      </span>
                    ) : isCorrectAnswer ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.2]" /> Benar (+5)
                      </span>
                    ) : isSelected ? (
                      <span className="text-rose-700 flex items-center gap-1 font-bold">
                        <AlertCircle className="w-4 h-4 stroke-[2.2]" /> Salah (0)
                      </span>
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Coach Drill Reality Feedback */}
        {coachFeedback && (
          <div className={`p-4 rounded-2xl border text-xs md:text-sm font-medium ${
            coachFeedback.type === 'success' 
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
              : coachFeedback.type === 'warning'
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}>
            {coachFeedback.msg}
          </div>
        )}

        {/* In-depth Review Drawer with Tactile Editorial Cards */}
        {isAnswered && (
          <div className="space-y-4 pt-6 border-t border-slate-100 animate-fade-in">
            {/* Speedhack Card */}
            <div className="bg-slate-50 border-l-3 border-blue-600 rounded-r-2xl p-4 md:p-5 border-y border-r border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-900 font-mono text-xs font-extrabold uppercase tracking-wide mb-1.5">
                <Zap className="w-4 h-4 text-blue-600 fill-blue-600" /> Trik Kilat & Jalan Pintas (15–30 Detik):
              </div>
              <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-mono font-medium">
                {currentQ.speedHack}
              </p>
            </div>

            {/* Trap Analysis */}
            <div className="bg-slate-50 border-l-3 border-rose-600 rounded-r-2xl p-4 md:p-5 border-y border-r border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-900 font-mono text-xs font-extrabold uppercase tracking-wide mb-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" /> Bedah Celah Kesalahan & Pengecoh:
              </div>
              <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                {currentQ.trapAnalysis}
              </p>
            </div>

            {/* Official Academic Explanation */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 text-xs md:text-sm text-slate-700 space-y-1.5 shadow-2xs">
              <span className="font-bold text-slate-900 block uppercase text-[11px] font-mono tracking-wider">
                Penjelasan Akademis & Konteks Regulasi:
              </span>
              <p className="leading-relaxed whitespace-pre-line text-slate-600">
                {currentQ.explanation}
              </p>
            </div>

            {/* Next Question Tactical Trigger & Shortcut Hint */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Keyboard className="w-4 h-4 text-slate-400" />
                <span>Tekan <code>[Enter]</code> atau <code>[→]</code> untuk lanjut</span>
              </div>
              <button
                onClick={handleNext}
                className="ps-6 pe-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs active:scale-[0.96] transition-transform cursor-pointer"
              >
                <span>Soal Berikutnya</span>
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Quick Next Bar (Thumb Zone) */}
      {isAnswered && (
        <div className="fixed bottom-14 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 px-4 flex items-center justify-between shadow-xl animate-fade-in pb-safe">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
              isTkp
                ? selectedScore === 5 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                : isPerfect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {isTkp ? `Skor ${selectedScore}/5` : isPerfect ? 'Benar (+5)' : 'Salah (0)'}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {secondsSpent}s
            </span>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-slate-900 active:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-[0.96] transition-transform cursor-pointer"
          >
            <span>Lanjut Soal</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
