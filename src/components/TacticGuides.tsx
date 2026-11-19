import React, { useState } from 'react';
import { TACTIC_GUIDES } from '../data/tactics';
import { Category } from '../types/quiz';
import { 
  Zap, 
  Calculator, 
  Brain, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Search,
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Award,
  ArrowRight,
  TrendingDown,
  Layers,
  HelpCircle
} from 'lucide-react';

export const TacticGuides: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('TIU');
  const [activeCalculator, setActiveCalculator] = useState<'ROOTS' | 'DISCOUNT' | 'ALLIGATION' | 'WORKERS' | 'SPEED' | 'SQUARES' | 'FRACTIONS' | 'CIDR' | 'HANDSHAKE' | 'BRUTO'>('ROOTS');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Akar Serba Cepat
  const [infiniteRootVal, setInfiniteRootVal] = useState<number>(17);
  const [consecutiveN, setConsecutiveN] = useState<number>(7); // 7 * 8 = 56

  // 2. Diskon Berganda
  const [disc1, setDisc1] = useState<number>(40);
  const [disc2, setDisc2] = useState<number>(20);
  const [basePrice, setBasePrice] = useState<number>(250000);

  // 3. Alligation Rasio Rata-Rata Gabungan
  const [avgA, setAvgA] = useState<number>(152);
  const [avgB, setAvgB] = useState<number>(158);
  const [avgGab, setAvgGab] = useState<number>(154);

  // 4. Proyek Pekerja Terhenti
  const [initWorkers, setInitWorkers] = useState<number>(16);
  const [initDays, setInitDays] = useState<number>(30);
  const [daysDone, setDaysDone] = useState<number>(10);
  const [daysHalted, setDaysHalted] = useState<number>(5);

  // 5. Kecepatan Rata-Rata Bolak-Balik & Berpapasan
  const [vGo, setVGo] = useState<number>(40);
  const [vBack, setVBack] = useState<number>(60);
  const [passDist, setPassDist] = useState<number>(180);
  const [vPass1, setVPass1] = useState<number>(60);
  const [vPass2, setVPass2] = useState<number>(40);

  // 6. Selisih Kuadrat Besar & Akhiran 5
  const [sqA, setSqA] = useState<number>(85);
  const [sqB, setSqB] = useState<number>(15);
  const [end5Val, setEnd5Val] = useState<number>(75);

  // 7. Pecahan Sakti
  const [fractionInput, setFractionInput] = useState('');

  // 8. CIDR
  const [selectedCidr, setSelectedCidr] = useState<number>(27);

  // 9. Jabat Tangan & Kombinasi
  const [peopleCount, setPeopleCount] = useState<number>(12);

  // 10. Bruto, Tara, Bunga
  const [brutoKg, setBrutoKg] = useState<number>(100);
  const [taraPct, setTaraPct] = useState<number>(5);
  const [pricePerKg, setPricePerKg] = useState<number>(15000);
  const [modalBank, setModalBank] = useState<number>(10000000);
  const [bungaTahunan, setBungaTahunan] = useState<number>(12);
  const [bulanBank, setBulanBank] = useState<number>(8);

  const activeGuide = TACTIC_GUIDES.find(g => g.category === selectedCategory);

  // Calculation logic
  // Diskon
  const totalDiscPct = disc1 + disc2 - ((disc1 * disc2) / 100);
  const finalPrice = Math.round(basePrice * ((100 - totalDiscPct) / 100));

  // Alligation
  const diffA = Math.abs(avgGab - avgB);
  const diffB = Math.abs(avgA - avgGab);
  // Simplify ratio
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const divisor = gcd(Math.round(diffA), Math.round(diffB)) || 1;
  const ratioA = Math.round(diffA / divisor);
  const ratioB = Math.round(diffB / divisor);

  // Pekerja Terhenti
  const remDays = Math.max(1, initDays - daysDone - daysHalted);
  const neededWorkers = Math.ceil((initWorkers * daysHalted) / remDays);

  // Kecepatan
  const avgSpeedHarmonic = Math.round((2 * vGo * vBack) / (vGo + vBack));
  const avgSpeedTrap = Math.round((vGo + vBack) / 2);
  const meetTimeHours = (passDist / (vPass1 + vPass2)).toFixed(1);
  const meetTimeMinutes = Math.round((passDist / (vPass1 + vPass2)) * 60);

  // Kuadrat
  const sqDiffResult = (sqA + sqB) * (sqA - sqB);
  const end5Prefix = Math.floor(end5Val / 10);
  const end5Result = (end5Prefix * (end5Prefix + 1)) * 100 + 25;

  // Subnetting calculator helper
  const calculateCidrInfo = (cidr: number) => {
    const hostBits = 32 - cidr;
    const totalIps = Math.pow(2, hostBits);
    const validHosts = totalIps - 2;
    const lastOctetMask = 256 - totalIps;
    return {
      mask: `255.255.255.${lastOctetMask}`,
      totalIps,
      validHosts,
      blockSize: totalIps
    };
  };
  const cidrInfo = calculateCidrInfo(selectedCidr);

  // 9. Jabat Tangan & Pertandingan
  const handshakes = peopleCount > 1 ? (peopleCount * (peopleCount - 1)) / 2 : 0;

  // 10. Bruto, Tara, Bunga
  const taraKg = (brutoKg * taraPct) / 100;
  const netoKg = Math.max(0, brutoKg - taraKg);
  const totalPay = netoKg * pricePerKg;
  const bungaDapat = Math.round((modalBank * bungaTahunan * bulanBank) / 1200);
  const totalAkhirBank = modalBank + bungaDapat;

  // Fraction quick match list
  const fractions = [
    { dec: '0.125', frac: '1/8', pct: '12.5%' },
    { dec: '0.166...', frac: '1/6', pct: '16.67%' },
    { dec: '0.25', frac: '1/4', pct: '25%' },
    { dec: '0.333...', frac: '1/3', pct: '33.33%' },
    { dec: '0.375', frac: '3/8', pct: '37.5%' },
    { dec: '0.50', frac: '1/2', pct: '50%' },
    { dec: '0.625', frac: '5/8', pct: '62.5%' },
    { dec: '0.666...', frac: '2/3', pct: '66.67%' },
    { dec: '0.75', frac: '3/4', pct: '75%' },
    { dec: '0.833...', frac: '5/6', pct: '83.33%' },
    { dec: '0.875', frac: '7/8', pct: '87.5%' },
    { dec: '0.888...', frac: '8/9', pct: '88.89%' },
    { dec: '0.0625', frac: '1/16', pct: '6.25%' },
  ];

  const filteredFractions = fractions.filter(f => 
    f.dec.includes(fractionInput) || f.frac.includes(fractionInput) || f.pct.includes(fractionInput)
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 animate-fade-in">
      {/* Hero Banner (Clean Light Style) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Laboratorium Rumus Serba Cepat & Arsenal Taktis
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kompilasi Rumus Kilat & Cheat Sheet BKN 2026
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl leading-relaxed">
              Diadaptasi langsung dari berkas resmi <strong>RUMUS SERBA CEPAT</strong>, <strong>JURUS TERLARANG SKD</strong>, dan <strong>FR Asli BKN</strong> folder /doc. Dirancang untuk memangkas waktu kerja dari 3 menit menjadi 10–25 detik per soal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/70 shrink-0">
            {(['TIU', 'TWK', 'TKP', 'SKB_TI'] as Category[]).map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`ps-3.5 pe-3 py-2 rounded-xl font-bold text-xs transition-all duration-150 ease-out cursor-pointer active:scale-[0.96] ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-tab-active border border-slate-200/50 font-black'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {cat === 'SKB_TI' ? 'SKB TI (Prakom)' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* INTERACTIVE FORMULA LAB (INTERACTIVE CALCULATORS) */}
      {/* ==================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold shadow-sm shadow-amber-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                Laboratorium Simulator Rumus Kilat Interaktif
              </h3>
              <p className="text-xs text-slate-500">
                Ubah parameter angka untuk melihat bagaimana rumus kilat memangkas aljabar berbelit-belit seketika.
              </p>
            </div>
          </div>

          {/* Calculator Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {[
              { id: 'ROOTS', label: 'Akar Tak Hingga' },
              { id: 'DISCOUNT', label: 'Diskon Ganda' },
              { id: 'ALLIGATION', label: 'Alligation (Rasio)' },
              { id: 'WORKERS', label: 'Proyek Terhenti' },
              { id: 'SPEED', label: 'Kecepatan Bolak-Balik' },
              { id: 'SQUARES', label: 'Selisih Kuadrat' },
              { id: 'FRACTIONS', label: 'Pecahan Sakti' },
              { id: 'HANDSHAKE', label: 'Jabat Tangan & Laga' },
              { id: 'BRUTO', label: 'Bruto-Tara & Bunga' },
              { id: 'CIDR', label: 'CIDR Subnet' },
            ].map(calc => {
              const isActive = activeCalculator === calc.id;
              return (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all duration-150 ease-out cursor-pointer active:scale-[0.96] ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-tab-active border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {calc.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. AKAR TAK HINGGA SIMULATOR */}
        {activeCalculator === 'ROOTS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Tipe 1: Perkalian */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-700 uppercase">Tipe 1: Perkalian Akar Tak Hingga</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">1 Detik Selesai</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm text-slate-900 font-bold text-center">
                x = √({infiniteRootVal} √({infiniteRootVal} √({infiniteRootVal} ... )))
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Ubah Nilai a di dalam akar:</label>
                <input 
                  type="number" 
                  value={infiniteRootVal}
                  onChange={e => setInfiniteRootVal(Number(e.target.value) || 1)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                <div className="text-xs font-bold text-emerald-900 font-mono">Hasil Rumus Cepat:</div>
                <div className="text-2xl font-black text-emerald-700 font-mono">x = {infiniteRootVal}</div>
                <p className="text-[11px] text-emerald-800 leading-snug">
                  Tidak perlu memisalkan aljabar x² = ax. Jika polanya perkalian akar tak hingga, nilainya selalu sama persis dengan angka di dalamnya!
                </p>
              </div>
            </div>

            {/* Tipe 2: Penjumlahan & Pengurangan */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Tipe 2: Penjumlahan / Pengurangan Tak Hingga</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">3 Detik Selesai</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm text-slate-900 font-bold text-center">
                x = √({consecutiveN * (consecutiveN + 1)} + √({consecutiveN * (consecutiveN + 1)} + ... ))
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Pilih Nilai Faktor n (di mana a = n × (n+1)):</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min={2} 
                    max={12} 
                    value={consecutiveN}
                    onChange={e => setConsecutiveN(Number(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="font-mono text-xs font-bold text-slate-700 px-2 py-1 rounded bg-white border border-slate-200 min-w-[60px] text-center">
                    n = {consecutiveN}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Angka di dalam akar = {consecutiveN} × {consecutiveN + 1} = <strong>{consecutiveN * (consecutiveN + 1)}</strong>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-300 space-y-1">
                <div className="text-xs font-bold text-blue-900 font-mono">Hasil Rumus Cepat:</div>
                <div className="text-2xl font-black text-blue-700 font-mono">
                  Jika (+): {consecutiveN + 1} | Jika (-): {consecutiveN}
                </div>
                <p className="text-[11px] text-blue-800 leading-snug">
                  Jika tanda operasi (+) ambil angka yang LEBIH BESAR ({consecutiveN + 1}). Jika operasi (-) ambil angka yang LEBIH KECIL ({consecutiveN}).
                </p>
              </div>
            </div>
          </div>
        )}

{/* 9. JABAT TANGAN & PERTANDINGAN */}
        {activeCalculator === 'HANDSHAKE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Kombinasi Jabat Tangan / Laga Setengah Kompetisi</span>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Jumlah Orang / Tim (n):</label>
                <input 
                  type="number" 
                  value={peopleCount}
                  onChange={e => setPeopleCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Di BKN, soal ini sering muncul dalam bentuk: <em>"Dalam suatu ruangan terdapat {peopleCount} orang peserta rapat yang saling berjabat tangan satu sama lain tepat satu kali..."</em>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-900 uppercase">Rumus Kilat: n(n - 1) / 2</span>
              <div className="p-4 rounded-xl bg-white border border-blue-200 space-y-2 font-mono text-xs">
                <div className="text-slate-600">Perhitungan: {peopleCount} × ({peopleCount} - 1) / 2</div>
                <div className="text-slate-800 font-bold">= {peopleCount} × {peopleCount - 1} / 2</div>
                <div className="text-2xl font-black text-blue-700 pt-1">
                  = {handshakes} Jabat Tangan / Laga
                </div>
              </div>
              <p className="text-[11px] text-blue-800">
                ⚡ Jangan buang waktu menghitung kombinasi manual C({peopleCount}, 2) dengan rumus faktorial panjang! Kalikan angka dengan adiknya, lalu bagi 2.
              </p>
            </div>
          </div>
        )}

        {/* 10. BRUTO, TARA & BUNGA BANK */}
        {activeCalculator === 'BRUTO' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Bruto & Tara */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Perhitungan Bruto, Neto & Tara</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Bruto (kg)</label>
                  <input 
                    type="number" 
                    value={brutoKg}
                    onChange={e => setBrutoKg(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Tara (%)</label>
                  <input 
                    type="number" 
                    value={taraPct}
                    onChange={e => setTaraPct(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Harga per kg Neto (Rp)</label>
                <input 
                  type="number" 
                  value={pricePerKg}
                  onChange={e => setPricePerKg(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-xs">
                <div>Tara = {taraKg} kg • Neto = {netoKg} kg</div>
                <div className="text-emerald-700 font-extrabold text-base pt-1">
                  Total Bayar Bersih = Rp {totalPay.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Bunga Tunggal Bank */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase">Bunga Tunggal Tabungan Bank</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Modal Awal Tabungan (Rp)</label>
                  <input 
                    type="number" 
                    value={modalBank}
                    onChange={e => setModalBank(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 font-mono">Bunga per Tahun (%)</label>
                    <input 
                      type="number" 
                      value={bungaTahunan}
                      onChange={e => setBungaTahunan(Number(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 font-mono">Lama Menabung (Bulan)</label>
                    <input 
                      type="number" 
                      value={bulanBank}
                      onChange={e => setBulanBank(Number(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-xs">
                <div>Bunga = Modal × ({bungaTahunan}/100) × ({bulanBank}/12) = Rp {bungaDapat.toLocaleString('id-ID')}</div>
                <div className="text-purple-700 font-extrabold text-base pt-1">
                  Total Tabungan Akhir = Rp {totalAkhirBank.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 2. DISKON GANDA SIMULATOR */}
        {activeCalculator === 'DISCOUNT' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase">Input Parameter Diskon Bertingkat</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Diskon 1 (%)</label>
                  <input 
                    type="number" 
                    value={disc1}
                    onChange={e => setDisc1(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Diskon 2 (%)</label>
                  <input 
                    type="number" 
                    value={disc2}
                    onChange={e => setDisc2(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Harga Awal Barang (Rp)</label>
                <input 
                  type="number" 
                  step={10000}
                  value={basePrice}
                  onChange={e => setBasePrice(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                />
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800">
                <strong>⚠️ Jebakan Klasik BKN:</strong> Menjumlahkan {disc1}% + {disc2}% = {disc1 + disc2}% (SALAH BESAR!).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-900 uppercase">Hasil Hitung Cepat Formula BKN:</span>
                <div className="mt-2 space-y-1 font-mono text-xs text-emerald-950">
                  <div>Rumus: % Total = d1 + d2 - (d1 × d2 / 100)</div>
                  <div className="text-base font-extrabold text-emerald-800">
                    % Total Diskon = {disc1} + {disc2} - ({disc1 * disc2} / 100) = <strong>{totalDiscPct}%</strong>
                  </div>
                  <div className="text-xs text-emerald-900 pt-1">
                    % Yang Wajib Dibayar = 100% - {totalDiscPct}% = <strong>{(100 - totalDiscPct).toFixed(1)}%</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-200">
                <span className="text-[11px] text-slate-500 font-mono uppercase block">Harga Akhir Setelah Diskon</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                  Rp {finalPrice.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block mt-1 font-mono">
                  Hemat Rp {(basePrice - finalPrice).toLocaleString('id-ID')} dari harga normal
                </span>
              </div>
            </div>
          </div>
        )}


        {/* 3. ALLIGATION RASIO RATA-RATA GABUNGAN */}
        {activeCalculator === 'ALLIGATION' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Input Rata-Rata Kedua Kelompok</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Rata-rata Kelas A</label>
                  <input 
                    type="number" 
                    value={avgA}
                    onChange={e => setAvgA(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Rata-rata Kelas B</label>
                  <input 
                    type="number" 
                    value={avgB}
                    onChange={e => setAvgB(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Rata-rata Gabungan (Harus di antara A dan B)</label>
                <input 
                  type="number" 
                  value={avgGab}
                  onChange={e => setAvgGab(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-300 space-y-4">
              <span className="text-xs font-mono font-bold text-blue-900 uppercase">Metode Silang Alligation (3 Detik):</span>
              <div className="p-4 rounded-xl bg-white border border-blue-200 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Selisih Silang untuk Anggota A: |{avgGab} - {avgB}|</span>
                  <span className="font-extrabold text-blue-700">{diffA}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Selisih Silang untuk Anggota B: |{avgA} - {avgGab}|</span>
                  <span className="font-extrabold text-blue-700">{diffB}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-sm font-bold text-slate-900">
                  <span>Perbandingan Jumlah Siswa A : B</span>
                  <span className="text-xl font-black text-blue-700 font-mono">{ratioA} : {ratioB}</span>
                </div>
              </div>
              <p className="text-[11px] text-blue-800">
                Tanpa perlu aljabar panjang (152A + 158B)/(A+B) = 154. Cukup selisihkan silang, langsung ketemu perbandingan jumlah siswa!
              </p>
            </div>
          </div>
        )}


        {/* 4. PROYEK PEKERJA TERHENTI */}
        {activeCalculator === 'WORKERS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Parameter Proyek Pembangunan</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Pekerja Awal (Orang)</label>
                  <input 
                    type="number" 
                    value={initWorkers}
                    onChange={e => setInitWorkers(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Target Rencana (Hari)</label>
                  <input 
                    type="number" 
                    value={initDays}
                    onChange={e => setInitDays(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Hari Sudah Jalan</label>
                  <input 
                    type="number" 
                    value={daysDone}
                    onChange={e => setDaysDone(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Hari Terhenti / Libur</label>
                  <input 
                    type="number" 
                    value={daysHalted}
                    onChange={e => setDaysHalted(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-900 uppercase">Hasil Rumus Cepat BKN:</span>
              <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2 font-mono text-xs">
                <div>Rumus Kilat: (Pekerja Awal × Hari Libur) ÷ Sisa Hari</div>
                <div className="text-slate-600">
                  Sisa Hari = {initDays} - {daysDone} - {daysHalted} = <strong>{remDays} hari</strong>
                </div>
                <div className="text-slate-600">
                  Hitungan = ({initWorkers} × {daysHalted}) ÷ {remDays} = <strong>{((initWorkers * daysHalted) / remDays).toFixed(2)}</strong>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Wajib Tambah Pekerja:</span>
                  <span className="text-2xl font-black text-emerald-700 font-mono">{neededWorkers} Orang</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-800">
                Waktu selesai: 10 detik. Tanpa membuat tabel beban man-days yang berisiko salah hitung di lembar buram.
              </p>
            </div>
          </div>
        )}


        {/* 5. KECEPATAN BOLAK-BALIK & BERPAPASAN */}
        {activeCalculator === 'SPEED' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Bolak Balik */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Kecepatan Rata-Rata Bolak-Balik (Jarak Sama)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">V Berangkat (km/jam)</label>
                  <input 
                    type="number" 
                    value={vGo}
                    onChange={e => setVGo(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">V Pulang (km/jam)</label>
                  <input 
                    type="number" 
                    value={vBack}
                    onChange={e => setVBack(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 font-mono text-xs">
                <div className="text-slate-500">Rumus: 2 × V1 × V2 / (V1 + V2)</div>
                <div className="text-emerald-700 font-extrabold text-lg">
                  Hasil Benar = {avgSpeedHarmonic} km/jam
                </div>
                <div className="text-rose-600 text-[11px] pt-1 border-t border-slate-100">
                  ❌ Jebakan BKN: ({vGo} + {vBack}) / 2 = {avgSpeedTrap} km/jam (SALAH!)
                </div>
              </div>
            </div>

            {/* Berpapasan */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Waktu Berpapasan (Berangkat Bersamaan)</span>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Jarak Total (km)</label>
                  <input 
                    type="number" 
                    value={passDist}
                    onChange={e => setPassDist(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 font-mono">Kecepatan Orang 1</label>
                    <input 
                      type="number" 
                      value={vPass1}
                      onChange={e => setVPass1(Number(e.target.value) || 1)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 font-mono">Kecepatan Orang 2</label>
                    <input 
                      type="number" 
                      value={vPass2}
                      onChange={e => setVPass2(Number(e.target.value) || 1)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-xs">
                <div className="text-slate-500">Rumus: Jarak / (V1 + V2)</div>
                <div className="text-blue-700 font-extrabold text-lg">
                  Waktu Papasan = {meetTimeHours} Jam ({meetTimeMinutes} Menit)
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 6. SELISIH KUADRAT BESAR & AKHIRAN 5 */}
        {activeCalculator === 'SQUARES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* a^2 - b^2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Selisih Kuadrat Besar: a² - b² = (a+b)(a-b)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Nilai a</label>
                  <input 
                    type="number" 
                    value={sqA}
                    onChange={e => setSqA(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 font-mono">Nilai b</label>
                  <input 
                    type="number" 
                    value={sqB}
                    onChange={e => setSqB(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                  />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-xs">
                <div>Hitung: ({sqA} + {sqB}) × ({sqA} - {sqB})</div>
                <div className="text-slate-700 font-bold">= {sqA + sqB} × {sqA - sqB}</div>
                <div className="text-xl font-black text-blue-700 pt-1">= {sqDiffResult.toLocaleString('id-ID')}</div>
              </div>
            </div>

            {/* Akhiran 5 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Kuadrat Cepat Bilangan Berakhiran 5: (n5)²</span>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 font-mono">Pilih Angka Berakhiran 5 (15, 25, 35, ..., 115):</label>
                <input 
                  type="number" 
                  step={10}
                  value={end5Val}
                  onChange={e => setEnd5Val(Number(e.target.value) || 5)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-sm font-bold text-slate-800 mt-1"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-xs">
                <div>Digit Depan: n = {end5Prefix} ➔ n × (n + 1) = {end5Prefix} × {end5Prefix + 1} = <strong>{end5Prefix * (end5Prefix + 1)}</strong></div>
                <div>Sandingkan dengan angka <strong>25</strong> di belakang</div>
                <div className="text-2xl font-black text-emerald-700 pt-1 font-mono">
                  {end5Val}² = {end5Result.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* 7. PECAHAN SAKTI MATCHER */}
        {activeCalculator === 'FRACTIONS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Tabel Matcher Pecahan Sakti BKN</span>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Ketik desimal / pecahan e.g. 0.875..."
                  value={fractionInput}
                  onChange={e => setFractionInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredFractions.map((f, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all cursor-pointer group shadow-xs"
                >
                  <div className="text-[10px] text-slate-400 font-mono uppercase font-semibold">Desimal</div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-blue-700 font-mono">{f.dec}</div>
                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-slate-200/80">
                    <span className="text-xs font-black text-blue-700 font-mono">{f.frac}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{f.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* 8. CIDR SUBNET CALCULATOR */}
        {activeCalculator === 'CIDR' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">Subnetting CIDR /24 s/d /30 (Prakom SKB TI)</span>
              <span className="text-xs text-slate-500 font-mono">Rumus Host: 2^(32-CIDR) - 2</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[24, 25, 26, 27, 28, 29, 30].map(prefix => (
                <button
                  key={prefix}
                  onClick={() => setSelectedCidr(prefix)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCidr === prefix
                      ? 'bg-blue-600 text-white font-black shadow-xs'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  /{prefix}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-[11px] text-slate-500 font-mono">Subnet Mask Desimal</div>
                <div className="text-sm font-black text-slate-900 font-mono mt-1">{cidrInfo.mask}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-mono">Host Valid (Bisa Dipakai)</div>
                <div className="text-lg font-black text-blue-700 font-mono mt-0.5">{cidrInfo.validHosts} Host</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-mono">Total Blok IP</div>
                <div className="text-sm font-bold text-slate-700 font-mono mt-1">{cidrInfo.totalIps} IP</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-mono">Peruntukan Jaringan</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  {selectedCidr === 30 ? 'Point-to-Point Router Link' : selectedCidr >= 28 ? 'Subnet Server Kecil' : 'VLAN Departemen'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* FULL CHEAT SHEET & PEDOMAN TAKTIS PER PILAR */}
      {/* ==================================================== */}
      {activeGuide && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">{activeGuide.title}</h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1">{activeGuide.summary}</p>
            </div>
            <div className="text-xs font-mono text-blue-700 font-bold px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 w-fit">
              Total {activeGuide.tactics.length} Taktik & Rumus Aktif
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {activeGuide.tactics.map((tactic, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 hover:border-slate-300 transition-all space-y-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-700 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200">
                      Taktik #{i + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-2">{tactic.name}</h3>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">{tactic.description}</p>
                  </div>
                </div>

                {tactic.formulaOrRule && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
                    {tactic.formulaOrRule}
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs">
                  <Lightbulb className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-950 block mb-0.5 font-mono uppercase tracking-wide">
                      Mindset & Pola Pikir Refleks:
                    </span>
                    <p className="text-blue-900 leading-relaxed font-medium">{tactic.mentalModel}</p>
                  </div>
                </div>

                {/* Example Problem */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Bedah Efisiensi Kasus Riil:
                  </div>
                  <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                    <div className="font-semibold text-slate-900 text-sm">Soal: {tactic.example.question}</div>
                    <div className="text-rose-700 pl-3 border-l-2 border-rose-400 py-0.5">
                      <strong>Cara Standar (Lambat):</strong> {tactic.example.normalMethod}
                    </div>
                    <div className="text-emerald-900 pl-3 border-l-2 border-emerald-500 py-0.5 font-medium">
                      <strong>Jalan Pintas Taktis:</strong> {tactic.example.tacticalShortcut}
                    </div>
                    <div className="text-right text-[11px] font-mono text-blue-700 font-bold pt-1">
                      ⚡ {tactic.example.timeSaved}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
