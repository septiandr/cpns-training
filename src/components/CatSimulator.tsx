import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Question, OptionKey, QuizResult } from '../types/quiz';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  RotateCcw,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  AlertTriangle,
  Layers,
  X
} from 'lucide-react';
import { saveQuizResult } from '../utils/storage';

interface CatSimulatorProps {
  questions: Question[];
  onFinish?: () => void;
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const CatSimulator: React.FC<CatSimulatorProps> = ({ questions, onFinish }) => {
  const [examStarted, setExamStarted] = useState(false);
  const [examMode, setExamMode] = useState<'FULL_110' | 'MINI_30'>('MINI_30');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User state
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [doubtful, setDoubtful] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});
  
  // Overall timer
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [initialTotalSeconds, setInitialTotalSeconds] = useState(25 * 60);
  const [examCompleted, setExamCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Matrix drawer / view state
  const [matrixFilter, setMatrixFilter] = useState<'ALL' | 'UNANSWERED' | 'DOUBTFUL'>('ALL');
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'DOUBT'>('ALL');
  const [mobileMatrixOpen, setMobileMatrixOpen] = useState(false);

  // Start exam handler with authentic BKN composition and full randomization
  const startExam = (mode: 'FULL_110' | 'MINI_30') => {
    setExamMode(mode);
    let selected: Question[] = [];

    const twkPool = shuffleArray(questions.filter(q => q.category === 'TWK'));
    const tiuPool = shuffleArray(questions.filter(q => q.category === 'TIU'));
    const tkpPool = shuffleArray(questions.filter(q => q.category === 'TKP'));
    const skbPool = shuffleArray(questions.filter(q => q.category === 'SKB_TI'));

    if (mode === 'MINI_30') {
      // Balanced 30 questions: 8 TWK, 10 TIU, 9 TKP, 3 SKB
      const sampleTwk = twkPool.slice(0, 8);
      const sampleTiu = tiuPool.slice(0, 10);
      const sampleTkp = tkpPool.slice(0, 9);
      const sampleSkb = skbPool.slice(0, 3);
      selected = shuffleArray([...sampleTwk, ...sampleTiu, ...sampleTkp, ...sampleSkb]);

      setRemainingSeconds(25 * 60);
      setInitialTotalSeconds(25 * 60);
    } else {
      // Authentic Full CAT BKN composition: Exactly 30 TWK, 35 TIU, 45 TKP = 110 Soal
      const sampleTwk = twkPool.slice(0, 30);
      const sampleTiu = tiuPool.slice(0, 35);
      const sampleTkp = tkpPool.slice(0, 45);
      // In BKN CAT, standard order is TWK (1-30), TIU (31-65), TKP (66-110)
      selected = [...sampleTwk, ...sampleTiu, ...sampleTkp];

      setRemainingSeconds(100 * 60);
      setInitialTotalSeconds(100 * 60);
    }

    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setDoubtful({});
    setTimeSpent({});
    setExamCompleted(false);
    setResult(null);
    setExamStarted(true);
  };

  // Timer tick
  useEffect(() => {
    if (!examStarted || examCompleted) return;

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });

      const currentQId = examQuestions[currentIndex]?.id;
      if (currentQId) {
        setTimeSpent(prev => ({
          ...prev,
          [currentQId]: (prev[currentQId] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examCompleted, currentIndex, examQuestions]);

  const handleSelectOption = useCallback((opt: OptionKey) => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setAnswers(prev => ({
      ...prev,
      [q.id]: opt
    }));
  }, [examQuestions, currentIndex]);

  const handleToggleDoubt = useCallback(() => {
    const q = examQuestions[currentIndex];
    if (!q) return;
    setDoubtful(prev => ({
      ...prev,
      [q.id]: !prev[q.id]
    }));
  }, [examQuestions, currentIndex]);

  // Keyboard Shortcuts: A, B, C, D, E for answers; R for ragu; Left/Right for nav
  useEffect(() => {
    if (!examStarted || examCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
        handleSelectOption(key as OptionKey);
      } else if (key === 'R') {
        handleToggleDoubt();
      } else if (e.key === 'ArrowRight' && currentIndex < examQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [examStarted, examCompleted, currentIndex, examQuestions.length, handleSelectOption, handleToggleDoubt]);

  const finishExam = () => {
    let scoreTWK = 0;
    let scoreTIU = 0;
    let scoreTKP = 0;
    let scoreSKB = 0;

    const answerRecords: Record<string, any> = {};

    examQuestions.forEach(q => {
      const ans = answers[q.id];
      const isDoubt = doubtful[q.id] || false;
      const spent = timeSpent[q.id] || 0;

      answerRecords[q.id] = {
        questionId: q.id,
        selectedOption: ans,
        isDoubtful: isDoubt,
        timeSpentSeconds: spent
      };

      if (!ans) return;

      if (q.category === 'TKP') {
        const pts = q.optionScores?.[ans] || 1;
        scoreTKP += pts;
      } else if (q.category === 'TWK') {
        if (ans === q.correctOption) scoreTWK += 5;
      } else if (q.category === 'TIU') {
        if (ans === q.correctOption) scoreTIU += 5;
      } else if (q.category === 'SKB_TI') {
        if (ans === q.correctOption) scoreSKB += 5;
      }
    });

    const total = scoreTWK + scoreTIU + scoreTKP + scoreSKB;

    // Standard BKN Passing Grade thresholds
    const passedTWK = scoreTWK >= (examMode === 'MINI_30' ? 20 : 65);
    const passedTIU = scoreTIU >= (examMode === 'MINI_30' ? 25 : 80);
    const passedTKP = scoreTKP >= (examMode === 'MINI_30' ? 40 : 166);
    const passedOverall = passedTWK && passedTIU && passedTKP;
    const targetRankingAchieved = examMode === 'MINI_30' ? total >= 115 : total >= 440;

    const quizResult: QuizResult = {
      id: `sim-${Date.now()}`,
      timestamp: Date.now(),
      mode: examMode === 'FULL_110' ? 'CAT_FULL_110' : 'MINI_CAT_30',
      totalDurationSeconds: initialTotalSeconds - remainingSeconds,
      totalScore: total,
      scoreBreakdown: {
        TWK: scoreTWK,
        TIU: scoreTIU,
        TKP: scoreTKP,
        SKB_TI: scoreSKB
      },
      passingGradeStatus: {
        TWK: passedTWK,
        TIU: passedTIU,
        TKP: passedTKP,
        overall: passedOverall,
        targetRankingAchieved
      },
      answers: answerRecords,
      weakestSubCategories: []
    };

    saveQuizResult(quizResult);
    setResult(quizResult);
    setExamCompleted(true);
    if (onFinish) onFinish();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Time progress percentage
  const timeProgressPercent = Math.max(0, Math.min(100, ((initialTotalSeconds - remainingSeconds) / initialTotalSeconds) * 100));
  const answeredCount = Object.keys(answers).length;
  const doubtfulCount = Object.values(doubtful).filter(Boolean).length;
  const progressPercent = examQuestions.length > 0 ? Math.round((answeredCount / examQuestions.length) * 100) : 0;

  // Pre-flight briefing screen
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wide">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Standar Seleksi CAT BKN Resmi 2026
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Simulasi Ujian CAT SKD & SKB
              </h1>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
                Ujian bertekanan tinggi dengan sistem kalkulasi baku BKN. Waktu dihitung mundur riil, tidak ada jeda pause, dan evaluasi membongkar celah fatal passing grade Anda.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shrink-0 min-w-[160px]">
              <span className="text-[11px] font-mono text-slate-500 font-semibold block uppercase">Target Kelulusan</span>
              <span className="text-2xl font-black text-slate-900 font-mono">≥ 440 Poin</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Ranking 3x Formasi Aman</span>
            </div>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Mode 1: Mini Drill */}
            <div className="p-6 md:p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-[11px] font-mono font-bold uppercase">
                    Rekomendasi Latihan Harian
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">25 Menit</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Mini-CAT Refleks (30 Soal)
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  30 Soal HOTS representatif (TWK, TIU, TKP, SKB TI). Melatih eksekusi kilat dan insting eliminasi jawaban dalam durasi 50 detik per soal.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-200/70">
                  <span>🎯 30 Soal HOTS</span>
                  <span>⏱️ 50s / soal</span>
                  <span>⚡ Evaluasi Instan</span>
                </div>
              </div>

              <button
                onClick={() => startExam('MINI_30')}
                className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all text-sm shadow-sm shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                Mulai Mini-CAT (25 Menit) <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mode 2: Full CAT Marathon */}
            <div className="p-6 md:p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 text-[11px] font-mono font-bold uppercase">
                    Simulasi Marathon Penuh
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">100 Menit</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                  Full CAT BKN (110 Soal)
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  100 Menit nonstop tanpa pause. Menguji ketahanan stamina otak agar tidak terjadi <em>cognitive exhaustion</em> saat menghitung soal TIU di nomor 60 ke atas.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-200/70">
                  <span>🔥 110 Soal Penuh</span>
                  <span>⏱️ 54s / soal</span>
                  <span>💀 Skala Nyata BKN</span>
                </div>
              </div>

              <button
                onClick={() => startExam('FULL_110')}
                className="mt-6 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-all text-sm cursor-pointer shadow-sm flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                Mulai Full Marathon (100 Menit) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tactical Pre-Flight Checklist */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 font-mono text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" /> DOKTRIN & TAKTIK TEMPUR CAT:
            </div>
            <ul className="space-y-1.5 text-slate-700 pl-6 list-disc leading-relaxed">
              <li><strong>Manajemen Urutan:</strong> Langsung lewati ke nomor TKP (soal 66-110) di 25 menit awal selagi pikiran masih jernih dan belum lelah menghitung.</li>
              <li><strong>Aturan 54 Detik:</strong> Jika dalam 45 detik membaca soal TIU Anda belum menemukan pola angka/silogisme, pilih tebakan rasional, tandai <em>Ragu-Ragu</em>, lalu lanjutkan.</li>
              <li><strong>Zero Blank Rule:</strong> Sistem CAT BKN <strong>tidak ada nilai minus</strong> (Benar +5, Salah 0, TKP 1-5). Pastikan 100% nomor terisi sebelum timer habis!</li>
              <li><strong>Keyboard Navigation:</strong> Gunakan tuts keyboard <code>A</code>, <code>B</code>, <code>C</code>, <code>D</code>, <code>E</code> untuk memilih jawaban, <code>R</code> untuk menandai ragu-ragu, dan tombol panah <code>←</code> <code>→</code> untuk berpindah nomor.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Result Report Card (Clean Light Mode)
  if (examCompleted && result) {
    const isPassingGradeLolos = result.passingGradeStatus.overall;
    const isRankingSafe = result.passingGradeStatus.targetRankingAchieved;

    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
        {/* Results Banner */}
        <div className={`p-6 md:p-8 rounded-3xl border ${
          isRankingSafe 
            ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' 
            : isPassingGradeLolos 
            ? 'bg-amber-50/80 border-amber-300 shadow-sm' 
            : 'bg-rose-50/80 border-rose-300 shadow-sm'
        } space-y-5`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                isRankingSafe 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : isPassingGradeLolos 
                  ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {isRankingSafe 
                  ? '🔥 SKOR AMAN — TIKET EMAS PERANG RANKING 3X FORMASI' 
                  : isPassingGradeLolos 
                  ? '⚠️ LOLOS PASSING GRADE — TAPI RAWAN TERCOROT DI PERANG RANKING' 
                  : '💀 GAGAL PASSING GRADE — TERELIMINASI OTOMATIS'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Total Perolehan: <span className="text-blue-700 font-mono">{result.totalScore}</span> Poin
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Waktu pengerjaan: {formatTime(result.totalDurationSeconds)} • Mode: {result.mode}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setExamStarted(false)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi Ujian
              </button>
            </div>
          </div>

          {/* Coach Brutal Analysis */}
          <div className="p-4 md:p-5 rounded-2xl bg-white border border-slate-200/90 text-xs md:text-sm leading-relaxed shadow-xs space-y-2">
            <span className="font-extrabold text-slate-900 block font-mono uppercase tracking-wider text-xs">
              ⚡ Evaluasi Disiplin AI Coach:
            </span>
            {!result.passingGradeStatus.TWK && (
              <p className="text-rose-700 font-medium">
                ❌ <strong>TWK Lemah ({result.scoreBreakdown.TWK}):</strong> Anda gagal melewati ambang batas TWK! Di seleksi BKN, gugur 1 pilar berarti gugur seluruhnya. Buka modul Dokumen FR untuk memperkuat kausa Pancasila dan pasal-pasal krusial UUD 1945.
              </p>
            )}
            {!result.passingGradeStatus.TIU && (
              <p className="text-rose-700 font-medium">
                ❌ <strong>TIU Tenggelam ({result.scoreBreakdown.TIU}):</strong> Anda kehilangan terlalu banyak waktu pada hitungan rumit atau baper pada silogisme. Kuasai rumus serba cepat (selisih kuadrat, pecahan sakti) untuk memangkas waktu pengerjaan menjadi 15 detik!
              </p>
            )}
            {!result.passingGradeStatus.TKP && (
              <p className="text-rose-700 font-medium">
                ❌ <strong>TKP Kurang Tajam ({result.scoreBreakdown.TKP}):</strong> Skor TKP Anda di bawah batas standar 166. Anda memilih jawaban yang egois atau menghindari tanggung jawab dinas. Terapkan pola pikir ASN berintegritas tinggi.
              </p>
            )}
            {isPassingGradeLolos && !isRankingSafe && (
              <p className="text-amber-800 font-medium">
                ⚠️ <strong>Peringatan Realistis:</strong> Skor {result.totalScore} Anda lolos passing grade, tetapi di formasi sengit seperti Pranata Komputer, hanya peringkat 1 sampai 3 yang berhak maju ke SKB. Tingkatkan target latihan hingga minimal 440 poin!
              </p>
            )}
            {isRankingSafe && (
              <p className="text-emerald-800 font-medium">
                ✅ <strong>Performa Solid:</strong> Kecepatan dan ketepatan Anda sudah masuk jajaran atas. Terus pertahankan ritme ini dalam drill harian dan jangan lengah di materi spesifik SKB TI!
              </p>
            )}
          </div>

          {/* Breakdown Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>TWK (Ambang 65)</span>
                {result.passingGradeStatus.TWK ? (
                  <span className="text-emerald-600 font-bold">Lolos</span>
                ) : (
                  <span className="text-rose-600 font-bold">Gagal</span>
                )}
              </div>
              <div className={`text-2xl font-black font-mono mt-1 ${result.passingGradeStatus.TWK ? 'text-emerald-600' : 'text-rose-600'}`}>
                {result.scoreBreakdown.TWK} <span className="text-xs text-slate-400 font-normal">Pts</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full ${result.passingGradeStatus.TWK ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${Math.min(100, (result.scoreBreakdown.TWK / 150) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>TIU (Ambang 80)</span>
                {result.passingGradeStatus.TIU ? (
                  <span className="text-emerald-600 font-bold">Lolos</span>
                ) : (
                  <span className="text-rose-600 font-bold">Gagal</span>
                )}
              </div>
              <div className={`text-2xl font-black font-mono mt-1 ${result.passingGradeStatus.TIU ? 'text-emerald-600' : 'text-rose-600'}`}>
                {result.scoreBreakdown.TIU} <span className="text-xs text-slate-400 font-normal">Pts</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full ${result.passingGradeStatus.TIU ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${Math.min(100, (result.scoreBreakdown.TIU / 175) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>TKP (Ambang 166)</span>
                {result.passingGradeStatus.TKP ? (
                  <span className="text-emerald-600 font-bold">Lolos</span>
                ) : (
                  <span className="text-rose-600 font-bold">Gagal</span>
                )}
              </div>
              <div className={`text-2xl font-black font-mono mt-1 ${result.passingGradeStatus.TKP ? 'text-emerald-600' : 'text-rose-600'}`}>
                {result.scoreBreakdown.TKP} <span className="text-xs text-slate-400 font-normal">Pts</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full ${result.passingGradeStatus.TKP ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${Math.min(100, (result.scoreBreakdown.TKP / 225) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Rata-rata Waktu</span>
                <span className="text-blue-600 font-bold">Laju</span>
              </div>
              <div className="text-2xl font-black text-slate-800 font-mono mt-1">
                {Math.round(result.totalDurationSeconds / Math.max(1, examQuestions.length))}s <span className="text-xs text-slate-400 font-normal">/soal</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-2">
                Batas ideal: ≤ 54 detik
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" /> Bedah Jawaban & Analisis Jebakan Soal
            </h3>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['ALL', 'WRONG', 'DOUBT'] as const).map(flt => (
                <button
                  key={flt}
                  onClick={() => setReviewFilter(flt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === flt
                      ? 'bg-white text-blue-700 shadow-sm font-extrabold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {flt === 'ALL' ? 'Semua' : flt === 'WRONG' ? 'Salah Saja' : 'Ragu-Ragu'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {examQuestions.map((q, idx) => {
              const userAns = answers[q.id];
              const isDoubt = doubtful[q.id];
              const isTkp = q.category === 'TKP';
              const isCorrect = isTkp ? (q.optionScores?.[userAns] === 5) : (userAns === q.correctOption);

              if (reviewFilter === 'WRONG' && isCorrect) return null;
              if (reviewFilter === 'DOUBT' && !isDoubt) return null;

              return (
                <div key={q.id} className="p-6 md:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        #{idx + 1}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
                        {q.category} • {q.subCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDoubt && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                          Ragu-ragu
                        </span>
                      )}
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                        isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isTkp ? `Poin: ${userAns ? q.optionScores?.[userAns] : 0}/5` : isCorrect ? 'Benar (+5)' : 'Salah (0)'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-slate-900 leading-relaxed font-medium">
                    {q.question}
                  </p>

                  <div className="space-y-2 pt-1">
                    {(['A', 'B', 'C', 'D', 'E'] as OptionKey[]).map(opt => {
                      const isChosen = userAns === opt;
                      const isKey = !isTkp && q.correctOption === opt;
                      const tkpScore = isTkp ? q.optionScores?.[opt] : null;

                      let style = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isTkp) {
                        if (tkpScore === 5) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        else if (isChosen) style = 'bg-amber-50 border-amber-400 text-amber-950 font-medium';
                      } else {
                        if (isKey) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        else if (isChosen && !isKey) style = 'bg-rose-50 border-rose-400 text-rose-950';
                      }

                      return (
                        <div key={opt} className={`p-3 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-colors ${style}`}>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                            isChosen ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {opt}
                          </span>
                          <span className="flex-1 leading-snug">{q.options[opt]}</span>
                          {isTkp && <span className="text-xs font-mono font-bold text-slate-500 shrink-0">{tkpScore} Pts</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Deep Pedagogical Corrections */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950">
                      <strong className="text-blue-800 font-mono block mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> TRIK KILAT & SHORTCUT:
                      </strong>
                      {q.speedHack}
                    </div>
                    <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-950">
                      <strong className="text-rose-800 font-mono block mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> BEDAH JEBAKAN / KESALAHAN:
                      </strong>
                      {q.trapAnalysis}
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                      <strong className="text-slate-900 font-mono block mb-1">📚 PEMBAHASAN RESMI:</strong>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam View (Real CAT Screen Simulation)
  const activeQuestion = examQuestions[currentIndex];
  const activeAns = activeQuestion ? answers[activeQuestion.id] : undefined;
  const isCurrentDoubt = activeQuestion ? doubtful[activeQuestion.id] : false;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Real CAT Sticky Header Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 sticky top-4 z-40 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase">
            {activeQuestion?.category} ({activeQuestion?.subCategory})
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Soal <b className="text-slate-900 font-extrabold">{currentIndex + 1}</b> dari {examQuestions.length}
          </span>
        </div>

        {/* Live Timer Countdown */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono text-sm md:text-base font-extrabold shadow-xs transition-colors ${
          remainingSeconds < 300 
            ? 'bg-rose-50 text-rose-600 border border-rose-300 animate-pulse' 
            : 'bg-slate-100 text-slate-800 border border-slate-200'
        }`}>
          <Clock className={`w-4 h-4 ${remainingSeconds < 300 ? 'text-rose-600' : 'text-blue-600'}`} />
          <span>Sisa Waktu: {formatTime(remainingSeconds)}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Question Matrix Drawer Button */}
          <button
            onClick={() => setMobileMatrixOpen(true)}
            className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200/90 flex items-center gap-1.5 active:scale-[0.96] transition-transform cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Nomor ({answeredCount}/{examQuestions.length})</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin menyelesaikan simulasi sekarang? Semua nomor kosong tidak akan mendapat nilai.')) {
                finishExam();
              }
            }}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-[0.96] transition-transform cursor-pointer"
          >
            Selesaikan Ujian
          </button>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Interface (Left 3 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          {/* Question Text */}
          <div className="text-base md:text-lg text-slate-900 font-medium leading-relaxed whitespace-pre-line min-h-[100px]">
            {activeQuestion?.question}
          </div>

          {activeQuestion?.codeSnippet && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
              {activeQuestion.codeSnippet}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 pt-2">
            {(['A', 'B', 'C', 'D', 'E'] as OptionKey[]).map(opt => {
              const isSelected = activeAns === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full ps-3.5 pe-4 py-3.5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 ease-out active:scale-[0.98] cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-medium shadow-xs ring-1 ring-blue-600' 
                      : 'bg-slate-50/70 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                    isSelected ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {opt}
                  </span>
                  <span className="text-sm md:text-base leading-snug flex-1">
                    {activeQuestion?.options[opt]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-200">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-transform"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>

            <button
              onClick={handleToggleDoubt}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border active:scale-[0.96] transition-all cursor-pointer ${
                isCurrentDoubt
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isCurrentDoubt ? 'fill-current text-amber-600' : ''}`} />
              {isCurrentDoubt ? 'Ditandai Ragu' : 'Tandai Ragu-Ragu [R]'}
            </button>

            <button
              disabled={currentIndex === examQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="ps-5 pe-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs active:scale-[0.96] transition-transform cursor-pointer"
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop CAT Question Matrix Grid (Right 1 col, Hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-1 bg-white border border-slate-200/90 rounded-3xl p-5 space-y-4 h-fit shadow-sm sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase font-mono tracking-wider">
              Daftar Nomor Soal
            </h4>
            <span className="text-[10px] font-mono text-slate-500 font-bold">
              {answeredCount} / {examQuestions.length} ({progressPercent}%)
            </span>
          </div>

          {/* Quick Filter buttons */}
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <button
              onClick={() => setMatrixFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer active:scale-[0.96] transition-transform ${
                matrixFilter === 'ALL' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setMatrixFilter('UNANSWERED')}
              className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer active:scale-[0.96] transition-transform ${
                matrixFilter === 'UNANSWERED' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Kosong ({examQuestions.length - answeredCount})
            </button>
            <button
              onClick={() => setMatrixFilter('DOUBTFUL')}
              className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer active:scale-[0.96] transition-transform ${
                matrixFilter === 'DOUBTFUL' ? 'bg-amber-500 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ragu ({doubtfulCount})
            </button>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-600 border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Terjawab
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Ragu
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Kosong
            </div>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto pr-1">
            {examQuestions.map((q, idx) => {
              const hasAns = answers[q.id] !== undefined;
              const isDoubt = doubtful[q.id];
              const isCurrent = currentIndex === idx;

              if (matrixFilter === 'UNANSWERED' && hasAns) return null;
              if (matrixFilter === 'DOUBTFUL' && !isDoubt) return null;

              let btnBg = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
              if (isDoubt) btnBg = 'bg-amber-400 text-amber-950 font-bold border-amber-400 shadow-xs';
              else if (hasAns) btnBg = 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center active:scale-[0.96] transition-all cursor-pointer ${btnBg} ${
                    isCurrent ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 z-10' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Question Matrix Slide-Up Sheet */}
      {mobileMatrixOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMatrixOpen(false)}
          />
          <div className="relative bg-white border-t border-slate-200 rounded-t-3xl p-5 pb-8 shadow-2xl space-y-4 animate-fade-in z-10 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm">
                  Daftar Nomor Soal ({answeredCount}/{examQuestions.length})
                </h4>
              </div>
              <button
                onClick={() => setMobileMatrixOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setMatrixFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer active:scale-[0.96] transition-transform ${
                  matrixFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setMatrixFilter('UNANSWERED')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer active:scale-[0.96] transition-transform ${
                  matrixFilter === 'UNANSWERED' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Kosong ({examQuestions.length - answeredCount})
              </button>
              <button
                onClick={() => setMatrixFilter('DOUBTFUL')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer active:scale-[0.96] transition-transform ${
                  matrixFilter === 'DOUBTFUL' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Ragu ({doubtfulCount})
              </button>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-600 border-t border-slate-100 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Terjawab
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Ragu
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Kosong
              </div>
            </div>

            {/* Grid buttons on Mobile: 6 columns for easy tapping */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 overflow-y-auto max-h-[50vh] pr-1 py-1">
              {examQuestions.map((q, idx) => {
                const hasAns = answers[q.id] !== undefined;
                const isDoubt = doubtful[q.id];
                const isCurrent = currentIndex === idx;

                if (matrixFilter === 'UNANSWERED' && hasAns) return null;
                if (matrixFilter === 'DOUBTFUL' && !isDoubt) return null;

                let btnBg = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isDoubt) btnBg = 'bg-amber-400 text-amber-950 font-bold border-amber-400 shadow-xs';
                else if (hasAns) btnBg = 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setMobileMatrixOpen(false);
                    }}
                    className={`h-10 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center active:scale-[0.94] transition-all cursor-pointer ${btnBg} ${
                      isCurrent ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 z-10' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
