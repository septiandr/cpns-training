import React from 'react';
import { QuizResult } from '../types/quiz';
import { 
  TrendingUp, 
  Target, 
  Skull, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Flame, 
  Zap, 
  BookOpen, 
  ArrowUpRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AnalyticsViewProps {
  results: QuizResult[];
  onStartExam: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ results, onStartExam }) => {
  if (results.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center bg-white border border-slate-200/90 rounded-3xl space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <Target className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Belum Ada Rekam Jejak Ujian</h3>
        <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Anda belum pernah menuntaskan simulasi CAT BKN. Jangan berasumsi Anda sudah siap sebelum diuji dengan batas waktu 54 detik per soal.
        </p>
        <button
          onClick={onStartExam}
          className="mt-4 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-sm shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 mx-auto"
        >
          <Zap className="w-4 h-4" /> Mulai Uji Nyali Sekarang (Simulasi CAT)
        </button>
      </div>
    );
  }

  const totalExams = results.length;
  const highestScore = Math.max(...results.map(r => r.totalScore));
  const avgScore = Math.round(results.reduce((acc, r) => acc + r.totalScore, 0) / totalExams);
  const passedPassingGradeCount = results.filter(r => r.passingGradeStatus.overall).length;
  const passedRankingTargetCount = results.filter(r => r.passingGradeStatus.targetRankingAchieved).length;

  // Calculate pillar averages
  const avgTWK = Math.round(results.reduce((acc, r) => acc + (r.scoreBreakdown.TWK || 0), 0) / totalExams);
  const avgTIU = Math.round(results.reduce((acc, r) => acc + (r.scoreBreakdown.TIU || 0), 0) / totalExams);
  const avgTKP = Math.round(results.reduce((acc, r) => acc + (r.scoreBreakdown.TKP || 0), 0) / totalExams);

  let zoneColor = 'text-rose-950 border-rose-300 bg-rose-50/80';
  let zoneTitle = 'ZONA GUGUR PASSING GRADE';
  let zoneBadge = 'RISIKO TINGGI ELIMINASI';
  let zoneDescription = 'Nilai Anda belum konsisten menembus ambang batas minimal ketiga pilar SKD. Jika tes diadakan hari ini, Anda langsung tereliminasi pada pengumuman sesi.';

  if (highestScore >= 440) {
    zoneColor = 'text-emerald-950 border-emerald-300 bg-emerald-50/80';
    zoneTitle = 'ZONA KURSI PNS (TOP TIER)';
    zoneBadge = 'KOMPETITIF 3X FORMASI';
    zoneDescription = 'Skor Anda sudah di atas 440. Untuk formasi Pranata Komputer / TI, perolehan ini menempatkan Anda di peringkat atas untuk melaju ke tahap SKB!';
  } else if (highestScore >= 360) {
    zoneColor = 'text-amber-950 border-amber-300 bg-amber-50/80';
    zoneTitle = 'ZONA REMAH RENGGINANG (RAWAN GUGUR RANKING)';
    zoneBadge = 'LOLOS PG RAWAN RANKING';
    zoneDescription = 'Lolos passing grade tetapi rawan tersingkir dari kuota 3x formasi. Selisih 10-15 poin di TIU atau TKP akan membuat posisi Anda tergeser oleh peserta lain.';
  }

  // Reverse list for recent charts (show up to last 10)
  const recentResults = [...results].slice(0, 10).reverse();
  const maxChartScore = Math.max(500, highestScore + 20);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Top Banner Status (Clean Light Style) */}
      <div className={`p-6 md:p-8 rounded-3xl border ${zoneColor} space-y-4 shadow-sm`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <Skull className="w-4 h-4 text-rose-600 shrink-0" />
            <span>DIAGNOSA KELAYAKAN FORMASI RESMI</span>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-slate-300 text-slate-800 w-fit">
            {zoneBadge}
          </span>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {zoneTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-3xl mt-2 font-medium">
            {zoneDescription}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 border-t border-slate-200/60">
          <span>🎯 Target Minimal Perang Ranking: <strong>440 Pts</strong></span>
          <span>•</span>
          <span>🏆 Skor Terbaik Anda: <strong>{highestScore} Pts</strong></span>
          <span>•</span>
          <span>📊 Rata-rata: <strong>{avgScore} Pts</strong></span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Skor Tertinggi</span>
          <div className="text-3xl font-black text-blue-700 font-mono tracking-tight">
            {highestScore}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
            Target 3x: <span className="font-bold text-slate-800">≥ 440</span>
          </div>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Rata-Rata Skor</span>
          <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
            {avgScore}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Dari total {totalExams} sesi tryout
          </div>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Lolos Passing Grade</span>
          <div className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
            {Math.round((passedPassingGradeCount / totalExams) * 100)}%
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {passedPassingGradeCount} dari {totalExams} kali lolos
          </div>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Lolos Ranking (≥440)</span>
          <div className={`text-3xl font-black font-mono tracking-tight ${passedRankingTargetCount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {passedRankingTargetCount} <span className="text-xs text-slate-400 font-normal">kali</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Peluang melaju ke SKB TI
          </div>
        </div>
      </div>

      {/* Visual Chart of Recent Sessions */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Trajektori Skor Terkini
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Grafik 10 sesi terakhir terhadap garis target aman perang ranking (440 Poin)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <span className="w-3 h-0.5 bg-emerald-500" /> Target 440
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Skor Anda
            </span>
          </div>
        </div>

        {/* SVG/CSS Bar Chart */}
        <div className="h-56 w-full flex items-end gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-slate-200 relative">
          {/* Target 440 Line */}
          <div 
            className="absolute left-0 right-0 border-b-2 border-dashed border-emerald-400 z-10 flex items-center justify-end pr-2 pointer-events-none"
            style={{ bottom: `${(440 / maxChartScore) * 100}%` }}
          >
            <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shadow-xs">
              Target 440
            </span>
          </div>

          {/* Ambang Batas 311 Line */}
          <div 
            className="absolute left-0 right-0 border-b border-dashed border-amber-300 z-10 flex items-center justify-end pr-2 pointer-events-none"
            style={{ bottom: `${(311 / maxChartScore) * 100}%` }}
          >
            <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              PG 311
            </span>
          </div>

          {recentResults.map((r, i) => {
            const heightPct = Math.max(10, Math.min(100, (r.totalScore / maxChartScore) * 100));
            const isSafe = r.totalScore >= 440;
            const isPassing = r.passingGradeStatus.overall;

            return (
              <div key={r.id} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono py-1 px-2 rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-30">
                  {r.totalScore} Pts ({new Date(r.timestamp).toLocaleDateString('id-ID')})
                </div>

                <div 
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-xs ${
                    isSafe ? 'bg-emerald-600 hover:bg-emerald-500' : isPassing ? 'bg-blue-600 hover:bg-blue-500' : 'bg-rose-500 hover:bg-rose-400'
                  }`}
                  style={{ height: `${heightPct}%` }}
                >
                  <span className="hidden sm:inline">{r.totalScore}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-2">
                  #{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pillar Breakdown & Weakness Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar Progress (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" /> Rata-Rata Perolehan Pilar SKD
          </h3>

          <div className="space-y-5">
            {/* TWK */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">Tes Wawasan Kebangsaan (TWK)</span>
                <span className="text-slate-600">Rata-rata: <b className={avgTWK >= 65 ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>{avgTWK}</b> / 150 (Min 65)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
                <div 
                  className={`h-full transition-all duration-500 ${avgTWK >= 65 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(100, (avgTWK / 150) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Ambang batas BKN: 65 poin (13 nomor benar dari 30 soal).
              </p>
            </div>

            {/* TIU */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">Tes Inteligensia Umum (TIU)</span>
                <span className="text-slate-600">Rata-rata: <b className={avgTIU >= 80 ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>{avgTIU}</b> / 175 (Min 80)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
                <div 
                  className={`h-full transition-all duration-500 ${avgTIU >= 80 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(100, (avgTIU / 175) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Ambang batas BKN: 80 poin (16 nomor benar dari 35 soal). Wajib kuasai trik eliminasi silogisme & selisih kuadrat.
              </p>
            </div>

            {/* TKP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">Tes Karakteristik Pribadi (TKP)</span>
                <span className="text-slate-600">Rata-rata: <b className={avgTKP >= 166 ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>{avgTKP}</b> / 225 (Min 166)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
                <div 
                  className={`h-full transition-all duration-500 ${avgTKP >= 166 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min(100, (avgTKP / 225) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Ambang batas BKN: 166 poin dari 45 soal (rata-rata minimal 3.7 poin per soal).
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Recommendation Card (Right 1 col) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> Rekomendasi Taktis
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Langkah Selanjutnya untuk Amankan Ranking:
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Fokus drill kilat pada <strong>Hitung Cepat & Deret Angka</strong> untuk memotong waktu berpikir menjadi di bawah 30 detik.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Buka tab <strong>Modul Dokumen 2026</strong> untuk membaca 4 Kausa Pancasila Notonagoro dan 45 butir pengamalan resmi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Lakukan 1 sesi <strong>Full CAT 100 Menit</strong> minimal 2 kali seminggu untuk membangun daya tahan konsentrasi.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartExam}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs active:scale-[0.96] transition-transform cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Mulai Ujian Sekarang</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" /> Riwayat Rekam Jejak Ujian
        </h3>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          {results.map((r, i) => (
            <div key={r.id} className="py-4 flex items-center justify-between gap-4 text-xs font-mono hover:bg-slate-50/60 px-2 rounded-xl transition-colors">
              <div>
                <span className="font-bold text-slate-900 text-sm">Sesi #{results.length - i} • {r.mode}</span>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {new Date(r.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} • Durasi {Math.round(r.totalDurationSeconds / 60)} menit
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:flex items-center gap-4 text-slate-600 text-xs">
                  <span>TWK: <b className={r.passingGradeStatus.TWK ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{r.scoreBreakdown.TWK}</b></span>
                  <span>TIU: <b className={r.passingGradeStatus.TIU ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{r.scoreBreakdown.TIU}</b></span>
                  <span>TKP: <b className={r.passingGradeStatus.TKP ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{r.scoreBreakdown.TKP}</b></span>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-blue-700 font-mono">{r.totalScore} Pts</div>
                  <div>
                    {r.passingGradeStatus.targetRankingAchieved ? (
                      <span className="text-emerald-600 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        Top Ranking
                      </span>
                    ) : r.passingGradeStatus.overall ? (
                      <span className="text-amber-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                        Lolos PG
                      </span>
                    ) : (
                      <span className="text-rose-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                        Gagal PG
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
