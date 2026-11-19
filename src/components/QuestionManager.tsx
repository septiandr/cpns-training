import React, { useState, useMemo, useRef } from 'react';
import { Question, Category, OptionKey } from '../types/quiz';
import { 
  Plus, 
  Search, 
  BookmarkCheck, 
  Sparkles, 
  FileDown,
  FileUp,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  RotateCcw,
  Database
} from 'lucide-react';
import { 
  saveQuestion, 
  toggleBookmark, 
  getBookmarkedIds, 
  importQuestions, 
  resetToDefaultMegaBank 
} from '../utils/storage';

interface QuestionManagerProps {
  questions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
}

const ITEMS_PER_PAGE = 20;

export const QuestionManager: React.FC<QuestionManagerProps> = ({ 
  questions, 
  onQuestionsUpdated 
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'BOOKMARKS'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedIds());
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add Question Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    category: 'TIU' as Category,
    subCategory: 'Hitung Cepat',
    difficulty: 'HOTS / Hard' as const,
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    correctOption: 'A' as OptionKey,
    speedHack: '',
    trapAnalysis: '',
    explanation: ''
  });

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setBookmarkedIds(updated);
  };

  // Filtered Questions
  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchesTab = activeTab === 'ALL' || bookmarkedIds.includes(q.id);
      const matchesCat = selectedCategory === 'ALL' || q.category === selectedCategory;
      const matchesSearch = search === '' || 
        q.question.toLowerCase().includes(search.toLowerCase()) || 
        q.subCategory.toLowerCase().includes(search.toLowerCase()) ||
        q.speedHack?.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesCat && matchesSearch;
    });
  }, [questions, activeTab, bookmarkedIds, selectedCategory, search]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  
  // Slice for current page
  const paginatedQuestions = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, validCurrentPage]);

  const handleSaveNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.optionA.trim()) {
      alert('Isi pertanyaan dan minimal pilihan jawaban!');
      return;
    }

    const newQ: Question = {
      id: `custom-${Date.now()}`,
      category: formData.category,
      subCategory: formData.subCategory,
      difficulty: formData.difficulty,
      question: formData.question,
      options: {
        A: formData.optionA,
        B: formData.optionB,
        C: formData.optionC,
        D: formData.optionD,
        E: formData.optionE
      },
      correctOption: formData.category === 'TKP' ? undefined : formData.correctOption,
      optionScores: formData.category === 'TKP' ? { A: 5, B: 4, C: 3, D: 2, E: 1 } : undefined,
      explanation: formData.explanation || 'Pembahasan mandiri.',
      trapAnalysis: formData.trapAnalysis || 'Kenali premis jebakan.',
      speedHack: formData.speedHack || 'Gunakan rumus eliminasi cepat.'
    };

    const updated = saveQuestion(newQ);
    onQuestionsUpdated(updated);
    setShowAddModal(false);
    // Reset form
    setFormData({
      category: 'TIU',
      subCategory: 'Hitung Cepat',
      difficulty: 'HOTS / Hard',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      correctOption: 'A',
      speedHack: '',
      trapAnalysis: '',
      explanation: ''
    });
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cpns-bank-${questions.length}-soal-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!Array.isArray(parsed)) {
          alert('Format file salah! Harus berupa file JSON berisi array objek soal.');
          return;
        }
        const updated = importQuestions(parsed);
        onQuestionsUpdated(updated);
        alert(`Berhasil mengimpor! Total bank soal kini menjadi ${updated.length} soal.`);
      } catch (err) {
        alert('Gagal membaca file JSON: Format tidak valid.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleResetMegaBank = () => {
    if (window.confirm('Reset bank soal ke versi standar resmi 1.500 soal? Soal kustom buatan Anda akan digantikan dengan data master.')) {
      const refreshed = resetToDefaultMegaBank();
      onQuestionsUpdated(refreshed);
      alert('Bank soal berhasil disinkronisasi ke 1.500 soal master resmi!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Hidden File Input for Import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept=".json" 
        onChange={handleImportFileChosen} 
        className="hidden" 
      />

      {/* Top Banner (Clean Light Style) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase">
            <Database className="w-3.5 h-3.5 text-blue-600" /> Bank Soal Skala Besar (Unlimited Capacity)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bank Soal & Manajemen Arsenalisasi ({questions.length} Butir Aktif)
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl leading-relaxed">
            Bank soal kini telah diekspansi menjadi <strong>{questions.length} Soal</strong>. Anda dapat menambah soal tak terbatas melalui form mandiri, atau mengimpor file JSON bank soal tambahan dari luar kapan saja.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="ps-3 pe-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 active:scale-[0.96] transition-all cursor-pointer"
            title="Import soal dari file JSON eksternal"
          >
            <FileUp className="w-4 h-4 text-blue-600 stroke-[2.2]" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={handleExportJson}
            className="ps-3 pe-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 active:scale-[0.96] transition-all cursor-pointer"
            title="Download cadangan bank soal JSON"
          >
            <FileDown className="w-4 h-4 text-slate-600 stroke-[2.2]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleResetMegaBank}
            className="ps-3 pe-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 active:scale-[0.96] transition-all cursor-pointer"
            title="Sinkronkan ulang ke 1.500 soal master"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
            <span>Sync Master</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="ps-4 pe-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-[0.96] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Tambah Soal</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('ALL'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Semua Soal ({questions.length})
          </button>
          <button
            onClick={() => { setActiveTab('BOOKMARKS'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'BOOKMARKS'
                ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" /> Tersimpan ({bookmarkedIds.length})
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full">
            {(['ALL', 'TWK', 'TIU', 'TKP', 'SKB_TI'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat === 'SKB_TI' ? 'SKB TI' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <input
              type="text"
              placeholder="Cari kata kunci..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 w-full"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-3">
            <FolderOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-slate-700 font-bold text-base">Tidak ada soal yang cocok dengan filter ini.</p>
            <p className="text-slate-500 text-xs">Coba ubah kata kunci pencarian atau ganti kategori di atas.</p>
          </div>
        ) : (
          paginatedQuestions.map((q, idx) => {
            const isBookmarked = bookmarkedIds.includes(q.id);
            const globalIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE + idx + 1;
            const isExpanded = expandedId === q.id;

            return (
              <div 
                key={q.id} 
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      #{globalIndex}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-600 font-mono font-medium">
                      {q.subCategory}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 font-bold">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-50 transition-colors cursor-pointer"
                      title={isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                      ) : (
                        <BookmarkCheck className="w-5 h-5 opacity-40 hover:opacity-100" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-900 leading-relaxed font-medium">
                  {q.question}
                </p>

                {q.codeSnippet && (
                  <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                    {q.codeSnippet}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700 font-mono">
                  {(['A', 'B', 'C', 'D', 'E'] as OptionKey[]).map(opt => {
                    const isKey = q.correctOption === opt;
                    const tkpPts = q.optionScores?.[opt];

                    return (
                      <div 
                        key={opt}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                          isKey 
                            ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 font-bold' 
                            : 'border-slate-200 bg-slate-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                            isKey ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {opt}
                          </span>
                          <span>{q.options[opt]}</span>
                        </div>
                        {tkpPts !== undefined && (
                          <span className="text-[11px] font-bold text-slate-500">{tkpPts} Pts</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Collapsible Shortcut & Trap Drawer */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-mono font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    {isExpanded ? 'Sembunyikan Trik & Jebakan [-]' : 'Lihat Shortcut & Analisis Jebakan [+]'}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 animate-fade-in">
                      <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950">
                        <strong className="text-blue-800 font-mono block mb-1">⚡ SHORTCUT & TRIK KILAT:</strong>
                        {q.speedHack}
                      </div>
                      <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-950">
                        <strong className="text-rose-800 font-mono block mb-1">💀 BEDAH JEBAKAN:</strong>
                        {q.trapAnalysis}
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700">
                        <strong className="text-slate-900 font-mono block mb-1">📚 PEMBAHASAN RESMI:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
          <div className="text-xs text-slate-600 font-mono">
            Menampilkan halaman <b className="text-slate-900">{validCurrentPage}</b> dari <b className="text-slate-900">{totalPages}</b> ({filtered.length} butir terfilter)
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>

            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-extrabold">
              {validCurrentPage} / {totalPages}
            </span>

            <button
              disabled={validCurrentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Tambah Soal Mandiri Baru
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
                  >
                    <option value="TWK">TWK</option>
                    <option value="TIU">TIU</option>
                    <option value="TKP">TKP</option>
                    <option value="SKB_TI">SKB TI (Prakom)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Sub-Topik</label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
                    placeholder="e.g. Silogisme, SPBE, dll"
                  />
                </div>

                {formData.category !== 'TKP' && (
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">Kunci Jawaban</label>
                    <select
                      value={formData.correctOption}
                      onChange={e => setFormData({ ...formData, correctOption: e.target.value as OptionKey })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-blue-700 font-bold"
                    >
                      <option value="A">Opsi A</option>
                      <option value="B">Opsi B</option>
                      <option value="C">Opsi C</option>
                      <option value="D">Opsi D</option>
                      <option value="E">Opsi E</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-bold">Teks Pertanyaan / Soal</label>
                <textarea
                  rows={3}
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-medium"
                  placeholder="Ketik soal lengkap di sini..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Opsi A</label>
                  <input
                    type="text"
                    value={formData.optionA}
                    onChange={e => setFormData({ ...formData, optionA: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Pilihan A"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Opsi B</label>
                  <input
                    type="text"
                    value={formData.optionB}
                    onChange={e => setFormData({ ...formData, optionB: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Pilihan B"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Opsi C</label>
                  <input
                    type="text"
                    value={formData.optionC}
                    onChange={e => setFormData({ ...formData, optionC: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Pilihan C"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Opsi D</label>
                  <input
                    type="text"
                    value={formData.optionD}
                    onChange={e => setFormData({ ...formData, optionD: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Pilihan D"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-700 block mb-1 font-bold">Opsi E</label>
                  <input
                    type="text"
                    value={formData.optionE}
                    onChange={e => setFormData({ ...formData, optionE: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Pilihan E"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Shortcut / Trik Kilat</label>
                  <input
                    type="text"
                    value={formData.speedHack}
                    onChange={e => setFormData({ ...formData, speedHack: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Trik 15 detik..."
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-bold">Bedah Jebakan</label>
                  <input
                    type="text"
                    value={formData.trapAnalysis}
                    onChange={e => setFormData({ ...formData, trapAnalysis: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                    placeholder="Kesalahan umum peserta..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Simpan ke Bank Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
