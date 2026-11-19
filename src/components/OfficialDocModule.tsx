import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  BookOpen,
  Cpu, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Award, 
  Layers, 
  Flame, 
  Code2, 
  Network, 
  Database, 
  Lock, 
  Cloud, 
  KeyRound,
  FileSpreadsheet
} from 'lucide-react';

export const OfficialDocModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'FR_BKN' | 'UU_ASN' | 'TABEL_UUD' | 'JURUS_TERLARANG' | 'PANCASILA_VAULT' | 'TKP_VAULT' | 'SKB_IT' | 'RINGKASAN_TWK' | 'PASSWORD_INFO'
  >('FR_BKN');

  const tabs = [
    { id: 'FR_BKN', label: 'Bocoran Asli FR BKN', icon: Flame },
    { id: 'UU_ASN', label: 'UU ASN 20/2023 & BerAKHLAK', icon: Award },
    { id: 'TABEL_UUD', label: 'Tabel Praktis UUD 1945', icon: ShieldCheck },
    { id: 'JURUS_TERLARANG', label: 'Jurus Terlarang & Rumus Cepat', icon: Zap },
    { id: 'PANCASILA_VAULT', label: 'Sejarah & Kausa Pancasila', icon: FileText },
    { id: 'TKP_VAULT', label: 'Bongkar Kasus Asli TKP', icon: ShieldCheck },
    { id: 'SKB_IT', label: 'Spesialis SKB TI (Prakom)', icon: Cpu },
    { id: 'RINGKASAN_TWK', label: 'Ringkasan Sakti TWK (72 Hal)', icon: BookOpen },
    { id: 'PASSWORD_INFO', label: 'Sandi Modul Terenkripsi', icon: KeyRound },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Hasil Audit Menyeluruh Semua Folder /doc
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pusat Dokumen & Hasil Dekonstruksi Berkas Vault
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-3xl leading-relaxed">
            Seluruh subfolder materi (<code>MATERI TIU</code>, <code>MATERI TKP</code>, <code>MATERI TWK</code>, <code>KHUSUS SOAL</code>, dan berkas terenkripsi <code>drive-download</code>) telah diekstraksi dan disarikan ke panel interaktif ini.
          </p>
        </div>

        {/* Concentric Segmented Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/70 overflow-x-auto scrollbar-none max-w-full">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`ps-3.5 pe-3 py-2 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 ease-out cursor-pointer active:scale-[0.96] ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-tab-active border border-slate-200/50 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 stroke-[2] ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: FR BOCORAN ASLI BKN */}
      {activeTab === 'FR_BKN' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-rose-700 text-xs font-mono font-bold uppercase mb-2">
                <Flame className="w-4 h-4 text-rose-600" /> Ekstraksi FR_TWK_CPNS.pdf & Big Bank HOTS
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Kasus Lapangan Peserta Asli (Field Report) yang Selalu Keluar di Ujian CAT
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pola-pola kasus berikut terbukti selalu dimunculkan secara konsisten oleh BKN:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-blue-700 block text-sm font-mono">1. Kasus Pelanggaran Hak Cipta & Pembajakan</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Kasus:</strong> Seseorang mengunduh dan menyebarkan karya lagu/buku/software orang lain tanpa izin untuk meraup laba komersial pribadi.
                  <br />
                  <strong>Analisis BKN:</strong> Pelanggaran <strong>Sila ke-5</strong> (Keadilan Sosial), butir <em>"Suka menghargai hasil karya orang lain yang bermanfaat bagi kemajuan dan kesejahteraan bersama"</em>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-rose-700 block text-sm font-mono">2. Kasus Limbah Pabrik Merusak Lingkungan</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Kasus:</strong> Pabrik membuang limbah berbahaya ke sungai demi efisiensi biaya, merusak tambak dan sumber air minum warga.
                  <br />
                  <strong>Analisis BKN:</strong> Pelanggaran <strong>Sila ke-5</strong>, butir <em>"Tidak menggunakan hak milik untuk usaha yang merugikan kepentingan umum"</em>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-amber-700 block text-sm font-mono">3. Kasus Suap Calo Kelulusan CPNS</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Kasus:</strong> Calon peserta CPNS menyuap perantara untuk diluluskan secara tidak sah.
                  <br />
                  <strong>Analisis BKN:</strong> Pelanggaran <strong>Sila ke-5</strong> & <strong>Pasal 27 ayat (1)</strong> karena merampas hak adil peserta lain dan merusak kesetaraan di hadapan hukum dan pemerintahan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-emerald-700 block text-sm font-mono">4. Wacana Masa Jabatan Presiden 3 Periode</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Kasus:</strong> Usulan perpanjangan masa jabatan kepemimpinan eksekutif.
                  <br />
                  <strong>Analisis BKN:</strong> Melanggar <strong>Pasal 7 UUD 1945</strong> (Presiden & Wapres dibatasi maksimal 2 periode) dan mencederai <strong>Sila ke-4</strong> dalam pembatasan kekuasaan demokratis.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-indigo-700 block text-sm font-mono">5. Perjanjian Renville (8 Des 1947)</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Lokasi:</strong> Kapal perang AS USS Renville.
                  <br />
                  <strong>Tokoh Kunci:</strong> Amir Syarifuddin Harahap (RI) vs Kolonel Abdulkadir Widjojoatmodjo (Belanda). Penengah KTN: Frank Porter Graham (AS).
                  <br />
                  <strong>Dampak:</strong> Garis Van Mook, wilayah RI menyempit, dan memicu <em>Wingate Action</em> Letkol Muhammad Sroedji & Divisi Siliwangi.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-extrabold text-teal-700 block text-sm font-mono">6. Tips Skor 5 TKP (Bongkar Soal TKP)</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Strategi:</strong> Layar CAT menampilkan judul submateri (misal: <em>Orientasi Pelayanan</em>, <em>Jejaring Kerja</em>, atau <em>Integritas</em>). Pilihlah jawaban yang <strong>paling agresif menuntaskan masalah utama sesuai judul submateri</strong> tersebut.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: UU ASN 20/2023 & DOKTRIN BERAKHLAK */}
      {activeTab === 'UU_ASN' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
                  <Award className="w-3.5 h-3.5" /> Ekstraksi FUNGSI DAN PERAN ASN.pdf & UU No. 20 Tahun 2023
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Doktrin Manajemen ASN, 3 Fungsi Pokok & Core Values BerAKHLAK
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold shrink-0">
                Regulasi Terbaru 2026
              </span>
            </div>

            {/* 3 Fungsi Pokok ASN */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider font-extrabold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                3 Fungsi Pokok ASN (Pasal 10 UU No. 20 Tahun 2023):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">1. Pelaksana Kebijakan Publik</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Melaksanakan kebijakan yang dibuat oleh Pejabat Pembina Kepegawaian (PPK) sesuai dengan ketentuan peraturan perundang-undangan dengan dedikasi dan profesionalisme tinggi.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">2. Pelayan Publik</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Memberikan pelayanan publik yang profesional, adil, transparan, dan berkualitas prima kepada seluruh masyarakat tanpa diskriminasi suku, agama, ras, dan golongan.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">3. Perekat & Pemersatu Bangsa</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mempererat persatuan dan kesatuan Negara Kesatuan Republik Indonesia (NKRI), menjaga netralitas politik, dan menjadi benteng penangkal disintegrasi serta radikalisme.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values BerAKHLAK */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono uppercase tracking-wider font-extrabold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                7 Core Values ASN "BerAKHLAK" & Panduan Perilaku:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1.5">
                  <strong className="text-blue-900 block font-bold text-sm">Berorientasi Pelayanan</strong>
                  <p className="text-slate-700 leading-relaxed">Memahami dan memenuhi kebutuhan masyarakat; Ramah, cekatan, solutif, dan dapat diandalkan; Melakukan perbaikan tiada henti.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                  <strong className="text-emerald-900 block font-bold text-sm">Akuntabel</strong>
                  <p className="text-slate-700 leading-relaxed">Melaksanakan tugas dengan jujur, bertanggung jawab, cermat, disiplin, dan berintegritas tinggi; Menggunakan BMN secara bertanggung jawab, efektif, dan efisien; Tidak menyalahgunakan kewenangan jabatan.</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1.5">
                  <strong className="text-indigo-900 block font-bold text-sm">Kompeten</strong>
                  <p className="text-slate-700 leading-relaxed">Meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah; Membantu orang lain belajar; Melaksanakan tugas dengan kualitas terbaik.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-1.5">
                  <strong className="text-purple-900 block font-bold text-sm">Harmonis</strong>
                  <p className="text-slate-700 leading-relaxed">Menghargai setiap orang apa pun latar belakangnya; Suka menolong orang lain; Membangun lingkungan kerja yang kondusif.</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
                  <strong className="text-rose-900 block font-bold text-sm">Loyal</strong>
                  <p className="text-slate-700 leading-relaxed">Memegang teguh ideologi Pancasila, UUD 1945, setia kepada NKRI dan pemerintah yang sah; Menjaga nama baik sesama ASN, pimpinan, instansi, dan negara; Menjaga rahasia jabatan dan rahasia negara.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                  <strong className="text-amber-900 block font-bold text-sm">Adaptif</strong>
                  <p className="text-slate-700 leading-relaxed">Cepat menyesuaikan diri menghadapi perubahan; Terus berinovasi dan mengembangkan kreativitas; Bertindak proaktif dalam pelayanan publik.</p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-1.5">
                  <strong className="text-teal-900 block font-bold text-sm">Kolaboratif</strong>
                  <p className="text-slate-700 leading-relaxed">Memberi kesempatan kepada berbagai pihak untuk berkontribusi; Terbuka dalam bekerja sama untuk menghasilkan nilai tambah; Menggerakkan pemanfaatan berbagai sumber daya untuk tujuan bersama.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Employer Branding:</span>
                  <strong className="text-base font-extrabold text-white">"Bangga Melayani Bangsa"</strong>
                  <p className="text-[11px] text-slate-300">Prinsip dasar pengabdian ASN di seluruh nusantara.</p>
                </div>
              </div>
            </div>

            {/* Asas Sistem Merit & Netralitas Politik */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
              <strong className="text-slate-900 font-bold block text-sm">
                ⚖️ Asas Sistem Merit & Kewajiban Netralitas Politik ASN:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                <strong>Sistem Merit:</strong> Pengelolaan manajemen ASN yang didasarkan pada kualifikasi, kompetensi, dan kinerja secara adil dan wajar tanpa membedakan latar belakang politik, ras, warna kulit, agama, asal usul, jenis kelamin, status pernikahan, umur, atau kondisi kecacatan.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Netralitas Pemilu:</strong> ASN dilarang keras menghadiri deklarasi parpol/paslon, menjadi tim sukses, mengunggah/mengomentari konten dukungan di media sosial, atau memfasilitasi kegiatan kampanye menggunakan aset dinas. Pelanggaran dikenakan sanksi disiplin berat hingga pemecatan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TABEL PRAKTIS UUD 1945 */}
      {activeTab === 'TABEL_UUD' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Ekstraksi Tabel Praktis UUD 1945.pdf (16 Bab & 37 Pasal)
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Tabel Ringkas Pasal-Pasal Krusial UUD 1945 Pasca Amandemen
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold shrink-0">
                100% Sesuai Naskah Asli
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-blue-700 uppercase block">BAB I & II: Bentuk & MPR</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 1:</strong> (1) Negara Kesatuan Republik; (2) Kedaulatan di tangan rakyat; (3) Negara Hukum.
                  <br />
                  <strong>Pasal 2:</strong> Anggota DPR + DPD, sidang min 1x dlm 5 tahun di ibu kota negara.
                  <br />
                  <strong>Pasal 3:</strong> Berwenang mengubah & menetapkan UUD, melantik Presiden/Wapres, dan memberhentikan Presiden menurut UUD.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-emerald-700 uppercase block">BAB III: Kekuasaan Presiden</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 4:</strong> Presiden memegang kekuasaan pemerintahan dibantu Wapres.
                  <br />
                  <strong>Pasal 7:</strong> Masa jabatan 5 tahun, dapat dipilih kembali hanya untuk satu kali masa jabatan berikutnya (maksimal 2 periode).
                  <br />
                  <strong>Pasal 10:</strong> Memegang kekuasaan tertinggi atas AD, AL, AU.
                  <br />
                  <strong>Pasal 11:</strong> Menyatakan perang, membuat perdamaian & perjanjian dengan persetujuan DPR.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-purple-700 uppercase block">Hak Prerogatif Presiden</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 13:</strong> Mengangkat duta dan konsul (memperhatikan pertimbangan DPR).
                  <br />
                  <strong>Pasal 14 ayat 1:</strong> Memberikan <strong>Grasi dan Rehabilitasi</strong> dengan pertimbangan <strong>Mahkamah Agung (MA)</strong>.
                  <br />
                  <strong>Pasal 14 ayat 2:</strong> Memberikan <strong>Amnesti dan Abolisi</strong> dengan pertimbangan <strong>DPR</strong>.
                  <br />
                  <strong>Pasal 15:</strong> Memberi gelar, tanda jasa, dan tanda kehormatan lain.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-amber-700 uppercase block">BAB VII & VIIA: DPR & DPD</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 20:</strong> DPR memegang kekuasaan membentuk UU.
                  <br />
                  <strong>Pasal 20A:</strong> DPR memiliki 3 fungsi: <em>Legislasi, Anggaran, Pengawasan</em>.
                  <br />
                  <strong>Hak DPR:</strong> 1. Interpelasi (minta keterangan); 2. Angket (penyelidikan); 3. Menyatakan Pendapat; serta Hak Imunitas.
                  <br />
                  <strong>Pasal 22C-22D:</strong> DPD mewakili daerah provinsi, ikut membahas RUU terkait otonomi daerah & pemekaran.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-rose-700 uppercase block">BAB IX: Kekuasaan Kehakiman</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 24A (MA):</strong> Mengadili tingkat kasasi, menguji peraturan di bawah UU terhadap UU (misal Perpres thd UU).
                  <br />
                  <strong>Pasal 24B (KY):</strong> Mengusulkan calon Hakim Agung dan menegakkan kehormatan/kode etik hakim.
                  <br />
                  <strong>Pasal 24C (MK):</strong> 1. Menguji UU thd UUD; 2. Sengketa kewenangan lembaga negara; 3. Pembubaran parpol; 4. Sengketa hasil pemilu (PHPU). Kewajiban: Sidang pemakzulan Presiden.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-teal-700 uppercase block">BAB XA, XII, XIII & XVI</span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>Pasal 28A-28J:</strong> Hak Asasi Manusia. Hak yang tidak dapat dikurangi (non-derogable: hak hidup, bebas siksaan, beragama, Pasal 28I).
                  <br />
                  <strong>Pasal 30:</strong> Pertahanan & Keamanan: Sishankamrata (TNI/Polri utama, rakyat pendukung).
                  <br />
                  <strong>Pasal 31:</strong> Anggaran pendidikan minimal 20% dari APBN dan APBD.
                  <br />
                  <strong>Pasal 37:</strong> Perubahan UUD: Usul 1/3 MPR, sidang dihadiri 2/3 MPR, putusan 50%+1. <em>Bentuk NKRI tidak dapat diubah</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: JURUS TERLARANG & RUMUS CEPAT BKN */}
      {activeTab === 'JURUS_TERLARANG' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
                  <Zap className="w-3.5 h-3.5" /> Ekstraksi JURUS TERLARANG SKD CPNS.pdf & RUMUS SERBA CEPAT.pdf
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Kompilasi Jurus Kilat TIU (Menyelesaikan Soal dalam 10–25 Detik)
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold shrink-0">
                Waktu Hemat 75%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-blue-700 uppercase block">1. Pola Akar Berulang Tak Hingga</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  • Perkalian: √(a √(a √(a ...))) = <strong>a</strong> (Contoh: √(9 √(9 ...)) = 9).
                  <br />
                  • Penjumlahan: √(a + √(a + ...)) = <strong>Faktor Terbesar</strong> dari a = n(n+1). (Contoh: √(6 + √(6 + ...)) = 3 karena 6 = 2 × 3).
                  <br />
                  • Pengurangan: √(a - √(a - ...)) = <strong>Faktor Terkecil</strong> dari a = n(n+1). (Contoh: √(12 - √(12 - ...)) = 3 karena 12 = 3 × 4).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-emerald-700 uppercase block">2. Proyek Pekerja Terhenti di Tengah</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  Rumus Sakti Tambahan Pekerja:
                  <br />
                  <strong className="text-emerald-800 text-sm">Tambahan = (Hari Libur × Pekerja Awal) / Sisa Hari</strong>
                  <br />
                  <span className="text-slate-600 font-sans">Contoh: 16 pekerja rencana 30 hari. Dikerjakan 10 hari, libur 5 hari. Sisa hari = 30 - 10 - 5 = 15 hari.</span>
                  <br />
                  Tambahan = (5 × 16) / 15 = 80 / 15 = ≈ 6 orang.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-purple-700 uppercase block">3. Kecepatan Berpapasan & Menyusul</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  • <strong>Berpapasan (Berlawanan):</strong> Waktu = Jarak Total / (V1 + V2).
                  <br />
                  • <strong>Menyusul (Searah):</strong> Waktu = Selisih Jarak Awal / (V2 - V1).
                  <br />
                  • <strong>Kecepatan Rata-Rata Bolak-Balik:</strong> V_rata = 2(V1 × V2) / (V1 + V2). (Bukan rata-rata biasa!).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-amber-700 uppercase block">4. Alligation (Rasio Rata-Rata Gabungan)</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  Bila kelompok A (rata-rata a) dan B (rata-rata b) digabung menghasilkan rata-rata c:
                  <br />
                  <strong className="text-amber-800 text-sm">Jumlah A : Jumlah B = |c - b| : |c - a|</strong>
                  <br />
                  <span className="text-slate-600 font-sans">Selesaikan rasio perbandingan pria vs wanita hanya dalam 5 detik tanpa membuat aljabar panjang!</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-rose-700 uppercase block">5. Aljabar Selisih Kuadrat Sakti</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  • a² - b² = (a + b)(a - b)
                  <br />
                  <span className="text-slate-600 font-sans">Contoh: 786² - 714² = (786 + 714)(786 - 714) = 1500 × 72 = 108.000.</span>
                  <br />
                  • (a + b)² - 2ab = a² + b²
                  <br />
                  • Kuadrat akhiran 5: (n5)² = [n × (n+1)] tempel 25. Contoh: 75² = (7×8) tempel 25 = 5625!
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-mono text-xs font-extrabold text-teal-700 uppercase block">6. Jabat Tangan & Pilihan Delegasi</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  • <strong>Jabat Tangan n Orang:</strong> Jabat Tangan = n(n - 1) / 2.
                  <br />
                  <span className="text-slate-600 font-sans">Contoh: 12 orang saling bersalaman = (12 × 11) / 2 = 66 jabat tangan.</span>
                  <br />
                  • <strong>Pertandingan 1 Grup (Setengah Kompetisi):</strong> Jumlah Laga = n(n - 1) / 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'PANCASILA_VAULT' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
                <Award className="w-3.5 h-3.5" /> Bedah Berkas SOAL PENGAMALAN PANCASILA.pdf
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Fakta Konstitusi & Kausalitas Pancasila yang Sering Muncul
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Perancang Lambang Garuda Pancasila</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rancangan resmi lambang negara burung Garuda dibuat oleh <strong>Sultan Hamid II</strong> (Pontianak) yang kemudian disempurnakan oleh Presiden Soekarno dan ditetapkan pada Sidang Kabinet RIS tanggal 11 Februari 1950.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Tata Cara Resmi Pengucapan Pancasila</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tata urutan dan rumusan baku pengucapan sila-sila Pancasila dalam upacara kenegaraan diatur secara sah dalam <strong>Instruksi Presiden (Inpres) No. 12 Tahun 1968</strong> guna mencegah penggunaan rumusan yang simpang siur.
                </p>
              </div>
            </div>

            {/* Teori Kausalitas Notonagoro */}
            <div className="p-5 md:p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
              <h4 className="font-extrabold text-blue-950 text-sm font-mono uppercase">
                4 Kausa Asal Mula Pancasila (Prof. Notonagoro)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <strong className="text-blue-900 block mb-1">1. Kausa Materialis (Bahan)</strong>
                  <p className="text-slate-600">Berasal dari nilai adat istiadat, budaya, dan agama rakyat Indonesia sendiri.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <strong className="text-blue-900 block mb-1">2. Kausa Formalis (Bentuk)</strong>
                  <p className="text-slate-600">Dirumuskan bentuk dan susunannya oleh BPUPKI (Ir. Soekarno & Panitia Sembilan).</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <strong className="text-blue-900 block mb-1">3. Kausa Efisien (Karya)</strong>
                  <p className="text-slate-600">Ditetapkan dan disahkan menjadi dasar negara yang sah oleh PPKI pada 18 Agustus 1945.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs">
                  <strong className="text-blue-900 block mb-1">4. Kausa Finalis (Tujuan)</strong>
                  <p className="text-slate-600">Bertujuan sebagai dasar filsafat negara merdeka untuk pedoman hidup berbangsa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BONGKAR KASUS ASLI TKP */}
      {activeTab === 'TKP_VAULT' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4" /> Ekstraksi dari Tes_Karakteristik_Pribadi_TKP_CPNS.docx (1.123 Paragraf)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Pola Jawaban Skor 5 pada Dilema Moral ASN Sehari-hari
            </h3>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold text-sm">Kasus 1: Pungli / Uang Tanda Terima Kasih Rekan Kantor</strong>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold">Skor 5</span>
                </div>
                <p className="text-slate-600 leading-relaxed mt-1">
                  <strong>Pilihan Skor 5:</strong> <em>"Tidak ingin melakukannya sama sekali dan tetap melayani warga sesuai SOP tanpa memungut biaya apa pun."</em>
                  <br />
                  <strong>Jebakan Skor 1:</strong> Memilih ikut-ikutan karena rekan senior melakukannya atau karena alasan gaji pas-pasan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold text-sm">Kasus 2: Apoteker Rumah Sakit Diminta Obat Tanpa Resep Dokter</strong>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold">Skor 5</span>
                </div>
                <p className="text-slate-600 leading-relaxed mt-1">
                  <strong>Pilihan Skor 5:</strong> <em>"Menolak secara santun, menjelaskan aturan hukum medis demi keselamatan, dan menyarankan pasien segera dibawa ke IGD."</em>
                  <br />
                  <strong>Jebakan Skor 1–2:</strong> Memberikan obat setengah dosis demi rasa kasihan pada kerabat.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold text-sm">Kasus 3: Pimpinan Menunda Penandatanganan Dokumen Penting</strong>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold">Skor 5</span>
                </div>
                <p className="text-slate-600 leading-relaxed mt-1">
                  <strong>Pilihan Skor 5:</strong> Mengingatkan pimpinan dengan santun dan asertif pada saat yang tepat dengan menyertakan ringkasan urgensi dokumen demi kelancaran layanan dinas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPESIALIS SKB TEKNOLOGI INFORMASI 2026 */}
      {activeTab === 'SKB_IT' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
                <Cpu className="w-3.5 h-3.5" /> Silabus Khusus Formasi IT (Dokumen 2026 Halaman 3)
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Pilar Ujian SKB Pranata Komputer & Ahli Teknologi Informasi
              </h3>
              <p className="text-slate-600 text-xs md:text-sm mt-1">
                Kuasai ke-6 domain kompetensi teknis yang diuji pada tahap penentu kelulusan CPNS TI:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Code2 className="w-4 h-4 text-blue-600" /> 1. Algoritma, Struktur Data & Pemrograman
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kompleksitas algoritma (Big O), struktur data (Array, LinkedList, Stack, Queue, Tree, Graph), konsep OOP, Design Pattern, Git Version Control, dan pengujian kode (Unit Test).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-emerald-600" /> 2. Basis Data & SQL Optimization
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prinsip ACID (Atomicity, Consistency, Isolation, Durability), Normalisasi tabel (1NF s.d BCNF), strategi pengindeksan B-Tree (Composite Index), Execution Plan, dan replikasi basis data.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Network className="w-4 h-4 text-amber-600" /> 3. Jaringan Komputer & Subnetting CIDR
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Model 7 Layer OSI vs TCP/IP, perhitungan subnetting CIDR (/24 s.d /30), routing protokol (BGP, OSPF), VLAN, DNS, DHCP, dan konfigurasi Gateway/NAT.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Lock className="w-4 h-4 text-rose-600" /> 4. Keamanan Siber & Mitigasi Kerentanan
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CIA Triad (Confidentiality, Integrity, Availability), Enkripsi Simetris (AES) vs Asimetris (RSA/ECC), mitigasi kerentanan OWASP Top 10 (SQL Injection dengan Prepared Statements, XSS, CSRF), dan audit ISO 27001.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Layers className="w-4 h-4 text-indigo-600" /> 5. E-Government & SPBE (Perpres 95/2018)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Arsitektur SPBE nasional, Interoperabilitas data (Satu Data Indonesia - Perpres 39/2019), Integrasi RESTful API, dan Manajemen Risiko TI (Tata Kelola COBIT/ITIL).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Cloud className="w-4 h-4 text-cyan-600" /> 6. Cloud Computing Dasar & Infrastruktur
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Model layanan (IaaS, PaaS, SaaS), model deployment (Private, Public, Hybrid), Pusat Data Nasional (PDN), kontainerisasi Docker, dan High Availability / Load Balancing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RINGKASAN TWK 72 HALAMAN */}
      {activeTab === 'RINGKASAN_TWK' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-mono font-bold uppercase">
              <BookOpen className="w-4 h-4" /> Matriks Pembeda Utama (Halaman 50–51 PDF)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Perbedaan: Cinta Tanah Air vs Patriotisme vs Nasionalisme vs Bela Negara
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="font-extrabold text-blue-900 block text-sm">Cinta Tanah Air</span>
                <p className="text-blue-950 leading-relaxed">
                  <strong>Kata Kunci:</strong> Timbul dari diri sendiri tanpa paksaan.
                  <br /><br />
                  <strong>Wujud:</strong> Bangga produk lokal, melestarikan pakaian/budaya adat.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-extrabold text-rose-900 block text-sm">Patriotisme</span>
                <p className="text-rose-950 leading-relaxed">
                  <strong>Kata Kunci:</strong> Rela berkorban (harta, jiwa, raga) & pantang menyerah.
                  <br /><br />
                  <strong>Wujud:</strong> Membantu korban bencana tanpa pamrih, heroisme membela kebenaran.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="font-extrabold text-amber-900 block text-sm">Nasionalisme</span>
                <p className="text-amber-950 leading-relaxed">
                  <strong>Kata Kunci:</strong> Kesadaran hidup bersama sebagai satu bangsa berdaulat.
                  <br /><br />
                  <strong>Wujud:</strong> Mengutamakan persatuan bangsa di atas golongan, patuh hukum.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-extrabold text-emerald-900 block text-sm">Bela Negara</span>
                <p className="text-emerald-950 leading-relaxed">
                  <strong>Kata Kunci:</strong> Menjaga eksistensi & kedaulatan negara dari ancaman.
                  <br /><br />
                  <strong>Wujud:</strong> Bela negara sesuai profesi (atlet juara dunia, insinyur IT lawan serangan siber).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PASSWORD INFO & STATUS FILE TERENKRIPSI */}
      {activeTab === 'PASSWORD_INFO' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-mono font-bold uppercase">
              <KeyRound className="w-4 h-4" /> Kunci Password Terverifikasi
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Status Dekripsi Berkas Drive-Download
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Terdapat 3 modul PDF besar di folder <code>drive-download</code> yang diproteksi password. Password resmi yang berhasil diverifikasi:
            </p>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-800 uppercase font-bold block">Password Terbuka:</span>
                <span className="text-2xl font-mono font-black text-emerald-950">BismillahLulus</span>
                <p className="text-xs text-emerald-700 mt-1">(B dan L huruf kapital, tanpa spasi)</p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold font-mono w-fit">
                100% Berhasil Didekripsi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                <strong className="text-slate-900 block font-bold">Mod CPNS 2- Widyastuti</strong>
                <span className="text-slate-500 font-mono text-[11px]">724 Halaman Materi</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                <strong className="text-slate-900 block font-bold">Mod CPNS 4- Tim Sukses</strong>
                <span className="text-slate-500 font-mono text-[11px]">274 Halaman Materi</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                <strong className="text-slate-900 block font-bold">Mod CPNS 7- Garuda Eduka</strong>
                <span className="text-slate-500 font-mono text-[11px]">770 Halaman Materi</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
