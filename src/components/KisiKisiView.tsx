import React, { useState, useMemo } from 'react';
import { 
  Question, 
  Category, 
  OptionKey 
} from '../types/quiz';
import { 
  Compass, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Zap, 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Flame,
  CheckCheck,
  RotateCcw,
  FileText,
  Bookmark,
  BookmarkCheck,
  GraduationCap,
  Layers,
  FolderOpen
} from 'lucide-react';
import { toggleBookmark, getBookmarkedIds, recordDrillAnswer } from '../utils/storage';

export interface KisiKisiTopic {
  id: string;
  category: Category;
  title: string;
  officialScope: string;
  sourceDoc: string;
  competencyDesc: string;
  theoryPoints: string[];
  speedHack: string;
  matchingSubCategories: string[];
}

export const COMPREHENSIVE_KISI_KISI: KisiKisiTopic[] = [
  // ==========================================
  // TWK: TES WAWASAN KEBANGSAAN (12 KISI-KISI DARI VAULT DOC)
  // ==========================================
  {
    id: 'twk-kausa-notonagoro',
    category: 'TWK',
    title: 'Pancasila: 4 Kausa Asal Mula Prof. Notonagoro',
    officialScope: 'PermenPAN-RB No. 321 — Asal Mula Filsafat Dasar Negara',
    sourceDoc: '/doc/MATERI TWK/Materi - Modul Pancasila.pdf',
    competencyDesc: 'Mengukur pemahaman ontologis mengenai asal mula Pancasila menurut teori 4 Kausa Aristoteles yang diadaptasi Prof. Mr. Notonagoro: Causa Materialis, Formalis, Efisien, dan Finalis.',
    theoryPoints: [
      'Causa Materialis (Bahan): Digali dari adat istiadat, kebudayaan luhur, dan nilai religius rakyat Indonesia sehari-hari.',
      'Causa Formalis (Bentuk): Dirumuskan susunan dan tata bentuknya oleh BPUPKI dan Panitia Sembilan.',
      'Causa Efisien (Karya/Kekuasaan): Disahkan secara sah sebagai dasar negara oleh PPKI pada 18 Agustus 1945.',
      'Causa Finalis (Tujuan): Bertujuan menjadi pedoman bernegara dan dasar filsafat bangsa merdeka.'
    ],
    speedHack: 'Materialis = Adat/Budaya (Bahan); Formalis = BPUPKI (Rumusan Bentuk); Efisien = PPKI Sahkan (Karya); Finalis = Tujuan Bernegara.',
    matchingSubCategories: ['Pancasila & Kausa Notonagoro', 'Kedudukan & Fungsi Filosofis Pancasila']
  },
  {
    id: 'twk-sejarah-bpupki-ppki',
    category: 'TWK',
    title: 'Sejarah Perumusan Pancasila: BPUPKI & Panitia Sembilan',
    officialScope: 'Sidang BPUPKI I & II, Piagam Jakarta 22 Juni 1945 & Dekrit Presiden',
    sourceDoc: '/doc/MATERI TWK/RANGKUMAN_WAWASAN_KEBANGSAAN.pdf',
    competencyDesc: 'Menguasai kronologi pembentukan BPUPKI (Dokuritsu Junbi Chosakai), usulan dasar negara (Moh. Yamin, Soepomo, Soekarno), Panitia Sembilan, dan perubahan Piagam Jakarta.',
    theoryPoints: [
      'BPUPKI: Dibentuk 29 April 1945 (ulang tahun Kaisar Hirohito), Ketua Dr. Radjiman Wedyodiningrat, 62 anggota inti.',
      'Sidang I BPUPKI (29 Mei - 1 Juni 1945): Pidato Soekarno 1 Juni mencetuskan pertama kali nama "Pancasila" (Hari Lahir Pancasila).',
      'Panitia Sembilan (22 Juni 1945): Menghasilkan Piagam Jakarta (Jakarta Charter).',
      'Sidang PPKI 18 Agustus 1945: Penghapusan 7 kata Piagam Jakarta ("dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya") demi persatuan NKRI.'
    ],
    speedHack: '1 Juni = Istilah Pancasila (Soekarno); 22 Juni = Piagam Jakarta (Panitia 9); 18 Agustus = Pengesahan UUD & Pancasila (PPKI).',
    matchingSubCategories: ['Sejarah Perumusan Pancasila & BPUPKI']
  },
  {
    id: 'twk-45-butir-pancasila',
    category: 'TWK',
    title: 'Pengamalan 45 Butir Pancasila: Etika ASN & Birokrasi',
    officialScope: 'Ketetapan MPR No. I/MPR/2003 — Pengamalan Kontekstual Sila 1 s.d. 5',
    sourceDoc: '/doc/MATERI TWK/KHUSUS SOAL TWK/SOAL PENGAMALAN PANCASILA.pdf',
    competencyDesc: 'Mengukur kepekaan dalam menerapkan 45 butir pengamalan sila dalam studi kasus birokrasi, pencegahan hedonisme, dan pelayanan publik non-diskriminatif.',
    theoryPoints: [
      'Sila 1 (Ketuhanan): Kebebasan beribadah, toleransi antarumat beragama, tidak memaksakan agama.',
      'Sila 2 (Kemanusiaan): Persamaan derajat, tenggang rasa, aksi kemanusiaan, menjunjung HAM.',
      'Sila 3 (Persatuan): Cinta tanah air, rela berkorban, bangga bertanah air Indonesia, Bhinneka Tunggal Ika.',
      'Sila 4 (Kerakyatan): Musyawarah mufakat, tidak memaksakan kehendak, menghormati keputusan rapat.',
      'Sila 5 (Keadilan Sosial): Menghargai hasil karya orang lain, tidak bergaya hidup mewah, menjaga fasilitas umum.'
    ],
    speedHack: 'Tenggang rasa/HAM = Sila 2; Cinta produk lokal/Rela lembur bencana = Sila 3; Musyawarah/Rapat = Sila 4; Anti-pamer harta/Keadilan fasilitas = Sila 5.',
    matchingSubCategories: ['Pengamalan 45 Butir Pancasila ASN']
  },
  {
    id: 'twk-kedudukan-pancasila',
    category: 'TWK',
    title: 'Kedudukan & Fungsi Pancasila: Staatsfundamentalnorm',
    officialScope: 'Sumber Segala Sumber Hukum Negara (UU No. 12 Tahun 2011) & Ideologi Terbuka',
    sourceDoc: '/doc/MATERI TWK/Materi Tes Wawasan Kebangsaan.pdf',
    competencyDesc: 'Menganalisis kedudukan yuridis konstitusional Pancasila sebagai norma fundamental negara, kepribadian bangsa, pandangan hidup (Weltanschauung), dan 3 dimensi ideologi terbuka.',
    theoryPoints: [
      'Sumber Segala Sumber Hukum (Pasal 2 UU 12/2011): Seluruh hierarki regulasi dari UU sampai Perda wajib selaras dengan Pancasila.',
      'Dasar Negara (Staatsfundamentalnorm): Landasan yuridis formal tata ketatanegaraan RI.',
      'Ideologi Terbuka: Memiliki 3 dimensi — Dimensi Realitas (hidup di masyarakat), Dimensi Idealisme (tujuan luhur masa depan), dan Dimensi Fleksibilitas (adaptif thd perkembangan zaman).'
    ],
    speedHack: 'Hierarki Hukum = Sumber Segala Sumber Hukum; Falsafah Moral = Pandangan Hidup; Penyelenggaraan Negara = Dasar Negara; Adaptif = Ideologi Terbuka.',
    matchingSubCategories: ['Kedudukan & Fungsi Filosofis Pancasila']
  },
  {
    id: 'twk-uud-amandemen',
    category: 'TWK',
    title: 'UUD 1945: Sejarah Amandemen I s.d. IV (1999–2002)',
    officialScope: 'Tahapan Amandemen, Latar Belakang Reformasi & Batas Kekuasaan',
    sourceDoc: '/doc/MATERI TWK/Materi - Hafalan UUD 1945 Amandemen.pdf',
    competencyDesc: 'Menguasai latar belakang, tahun pengesahan, dan substansi perubahan UUD 1945 dari Amandemen I (1999) hingga Amandemen IV (2002).',
    theoryPoints: [
      'Amandemen I (19-21 Okt 1999): Pembatasan masa jabatan presiden (maksimal 2 periode, Pasal 7) dan pergeseran kekuasaan legislasi ke DPR (Pasal 20).',
      'Amandemen II (7-18 Ags 2000): Otonomi Daerah (Pasal 18), Hak Asasi Manusia (Pasal 28A-28J), dan Pertahanan Keamanan (Pasal 30).',
      'Amandemen III (1-9 Nov 2001): Bentuk negara dan kedaulatan rakyat (Pasal 1), pembentukan MK, KY, BPK, dan Pemilu langsung.',
      'Amandemen IV (1-11 Ags 2002): Komposisi MPR (DPR + DPD), Pendidikan (Pasal 31 anggaran 20%), Perekonomian & Bank Sentral (Pasal 33-34).'
    ],
    speedHack: 'Amandemen 1 = Presiden (Pasal 7); Amandemen 2 = HAM (28A-J) & Pemda (18); Amandemen 3 = MK, KY & Pemilu; Amandemen 4 = DPD & Pendidikan 20%.',
    matchingSubCategories: ['UUD 1945 Pasca Amandemen & Wewenang Lembaga']
  },
  {
    id: 'twk-lembaga-negara',
    category: 'TWK',
    title: 'Lembaga Negara & Trias Politica: MK, MA, KY, BPK & DPR',
    officialScope: 'Tabel Praktis UUD 1945 — Pembagian Kekuasaan & Checks and Balances',
    sourceDoc: '/doc/MATERI TWK/Tabel Praktis UUD 1945.pdf',
    competencyDesc: 'Menguji wewenang dan kewajiban konstitusional Mahkamah Konstitusi, Mahkamah Agung, Komisi Yudisial, BPK, DPR, DPD, dan hak prerogatif Presiden.',
    theoryPoints: [
      'Wewenang MK (Pasal 24C): 1. Menguji UU thd UUD; 2. Memutus sengketa lembaga negara; 3. Memutus pembubaran parpol; 4. Memutus sengketa hasil pemilu (PHPU). Kewajiban: Sidang pemakzulan.',
      'Wewenang MA (Pasal 24A): Mengadili kasasi, menguji peraturan di bawah UU thd UU (Perpres/PP/Permen), dan Peninjauan Kembali (PK).',
      'Komisi Yudisial (Pasal 24B): Mengusulkan hakim agung ke DPR dan menegakkan kehormatan/etik hakim.',
      'Hak DPR: Angket (penyelidikan menyeluruh), Interpelasi (minta keterangan kebijakan), Menyatakan Pendapat, serta Hak Imunitas.',
      'Prerogatif Presiden: Grasi & Rehabilitasi (butuh pertimbangan MA); Amnesti & Abolisi (butuh pertimbangan DPR).'
    ],
    speedHack: 'Grasi/Rehabilitasi = MA; Amnesti/Abolisi = DPR; Uji UU vs UUD = MK; Uji Regulasi di bawah UU = MA; Etik Hakim = KY.',
    matchingSubCategories: ['UUD 1945 Pasca Amandemen & Wewenang Lembaga']
  },
  {
    id: 'twk-diplomasi-perjanjian',
    category: 'TWK',
    title: 'Sejarah Perjuangan: Diplomasi Kemerdekaan (1945–1949)',
    officialScope: 'Perjanjian Linggarjati, Renville, Roem-Royen & Konferensi Meja Bundar (KMB)',
    sourceDoc: '/doc/MATERI TWK/KHUSUS SOAL TWK/FR_TWK_CPNS.pdf',
    competencyDesc: 'Mengukur pemahaman diplomasi internasional bangsa Indonesia mempertahankan kedaulatan melawan agresi militer Belanda I & II.',
    theoryPoints: [
      'Perjanjian Linggarjati (1946): Belanda mengakui de facto wilayah RI hanya Jawa, Madura, dan Sumatera (dipimpin Sutan Sjahrir).',
      'Perjanjian Renville (1948): Disepakati di atas kapal USS Renville, melahirkan Garis Van Mook yang merugikan wilayah RI dan memicu long march Wingate Action Letkol Mochammad Sroedji.',
      'Perjanjian Roem-Royen (1949): Gencatan senjata, kembalinya Pemerintah RI ke Yogyakarta, dan rencana pembentukan KMB.',
      'KMB (Konferensi Meja Bundar di Den Haag, 1949): Belanda resmi mengakui kedaulatan Indonesia dalam bentuk Republik Indonesia Serikat (RIS).'
    ],
    speedHack: 'Hafalan Urutan: Linggarjati (de facto 3 pulau) -> Renville (Garis Van Mook) -> Roem-Royen (Balik ke Yogya) -> KMB (Pengakuan Kedaulatan RIS).',
    matchingSubCategories: ['Sejarah Perjuangan & Tokoh Bangsa']
  },
  {
    id: 'twk-pahlawan-tokoh',
    category: 'TWK',
    title: 'Tokoh Pahlawan & Keteladanan Heroisme Nasional',
    officialScope: 'Integrasi Nilai Patriotisme, Pergerakan Nasional & Pertempuran Kemerdekaan',
    sourceDoc: '/doc/MATERI TWK/RANGKUMAN_MATERI_TES_WAWASAN_KEBANGSAAN.pdf',
    competencyDesc: 'Menganalisis nilai integritas perjuangan tokoh-tokoh pahlawan nasional (Mochammad Sroedji, I Gusti Ngurah Rai, Bung Tomo, Ki Hajar Dewantara, Tan Malaka).',
    theoryPoints: [
      'Letkol Mochammad Sroedji: Komandan Brigade III Damarwulan yang gugur memimpin Wingate Action gerilya menembus kepungan Belanda di Jawa Timur.',
      'I Gusti Ngurah Rai: Memimpin perang Puputan Margarana di Bali sampai titik darah penghabisan demi kedaulatan tanah air.',
      'Bung Tomo: Orator radio membakar heroisme arek-arek Suroboyo dalam Pertempuran 10 November 1945 (Hari Pahlawan).',
      'Ki Hajar Dewantara: Bapak Pendidikan Nasional pendiri Taman Siswa (Semboyan: Ing ngarso sung tulodo, ing madyo mangun karso, tut wuri handayani).'
    ],
    speedHack: 'Soal keteladanan pahlawan di BKN selalu menguji unsur: "Rela Berkorban Demi Bangsa di Atas Kepentingan Pribadi".',
    matchingSubCategories: ['Sejarah Perjuangan & Tokoh Bangsa']
  },
  {
    id: 'twk-5-unsur-bela-negara',
    category: 'TWK',
    title: 'Bela Negara: 5 Unsur Pokok & Sishankamrata',
    officialScope: 'Modul Pelatihan Dasar Bela Negara LAN RI & UU PSDN No. 23/2019',
    sourceDoc: '/doc/MATERI TWK/MODUL BELA NEGARA.pdf',
    competencyDesc: 'Mengidentifikasi aplikasi 5 nilai dasar bela negara dalam kehidupan berbangsa dan kesiapsiagaan menghadapi ancaman hibrida/siber.',
    theoryPoints: [
      '1. Cinta Tanah Air: Memakai produk lokal, menjaga lingkungan hidup, mengharumkan nama bangsa.',
      '2. Sadar Berbangsa & Bernegara: Disiplin jam kerja ASN, menaati regulasi hukum, menghargai keberagaman.',
      '3. Setia pada Pancasila: Menjadikan Pancasila pedoman moral dinas, menolak paham radikalisme.',
      '4. Rela Berkorban: Mengorbankan waktu/tenaga demi bangsa tanpa pamrih, tanggap darurat bencana.',
      '5. Kemampuan Awal Bela Negara: Kesiapan fisik, integritas mental, kecerdasan emosional dan spiritual.'
    ],
    speedHack: 'Produk lokal = Cinta Tanah Air; Taat aturan dinas = Sadar Berbangsa; Tangkal radikal = Setia Pancasila; Lembur darurat bencana = Rela Berkorban; Fisik bugar = Kemampuan Awal.',
    matchingSubCategories: ['5 Unsur Pokok Bela Negara']
  },
  {
    id: 'twk-anti-radikalisme',
    category: 'TWK',
    title: 'Anti-Radikalisme, Terorisme & Ketahanan Ideologi',
    officialScope: 'Pencegahan Intoleransi, Ekstremisme & Netralitas ASN',
    sourceDoc: '/doc/MATERI TWK/TWK RADIKALISME.pdf',
    competencyDesc: 'Mengukur kewaspadaan terhadap tahapan radikalisasi (intoleransi -> radikalisme -> terorisme), penyebaran hoaks pemecah belah, dan penguatan moderasi beragama.',
    theoryPoints: [
      'Tahapan Radikalisasi: Dimulai dari sikap intoleran (menolak perbedaan), berkembang menjadi radikal (ingin mengganti sistem negara secara inkonstitusional), hingga aksi teror kekerasan.',
      'Peran ASN: Sebagai perekat pemersatu bangsa, ASN wajib bersikap netral, tidak menyebarkan pesan provokatif di grup komunikasi, dan segera melapor ke atasan/inspektorat.'
    ],
    speedHack: 'Sikap ASN terhadap narasi intoleransi: Tenang, jangan teruskan (no share), tegaskan netralitas persatuan, dan laporkan ke pejabat berwenang!',
    matchingSubCategories: ['5 Unsur Pokok Bela Negara', 'Integritas & Nilai Anti-Korupsi KPK']
  },
  {
    id: 'twk-integritas-kpk',
    category: 'TWK',
    title: 'Integritas: 9 Nilai KPK & Tipologi Tipikor',
    officialScope: 'UU No. 31/1999 jo UU No. 20/2001 — Gratifikasi, Suap, Pemerasan & LHKPN',
    sourceDoc: '/doc/MATERI TWK/Materi TWK Integritas.pdf',
    competencyDesc: 'Menguasai 9 nilai integritas KPK (Jujur, Peduli, Mandiri, Disiplin, Tanggung Jawab, Kerja Keras, Sederhana, Berani, Adil) dan pembedaan delik korupsi.',
    theoryPoints: [
      'Jembatan Keledai 9 Nilai: "Jumat Bersepeda KK" (Jujur, Mandiri, Tanggung Jawab, Berani, Sederhana, Peduli, Disiplin, Adil, Kerja Keras).',
      'Gratifikasi (Pasal 12B): Pemberian dalam arti luas yang berhubungan dengan jabatan. Wajib dilaporkan ke KPK dalam tempo maksimal 30 hari kerja.',
      'Suap (Bribery): Ada transaksi/kesepakatan timbal balik untuk memengaruhi keputusan jabatan.',
      'Pemerasan (Extortion): Pejabat secara sepihak menyalahgunakan kekuasaan memaksa pihak lain memberikan uang.'
    ],
    speedHack: 'Vendor kasih hadiah tiket/voucher liburan = GRATIFIKASI HARAM = Wajib ditolak atau dilaporkan dalam 30 hari kerja ke KPK!',
    matchingSubCategories: ['Integritas & Nilai Anti-Korupsi KPK']
  },
  {
    id: 'twk-bahasa-indonesia',
    category: 'TWK',
    title: 'Bahasa Indonesia: Kalimat Efektif, EYD V & Surat Dinas',
    officialScope: 'Kaidah Ejaan Resmi Bahasa Indonesia & Tata Naskah Dinas Pemerintahan',
    sourceDoc: '/doc/MATERI TWK/BAHASA INDONESIA.pdf',
    competencyDesc: 'Menguji kemampuan menyusun kalimat efektif (subjek-predikat lengkap), mengeliminasi pleonasme, kaidah penulisan gelar/jabatan, dan menemukan ide pokok paragraf.',
    theoryPoints: [
      'Kalimat Efektif: Memenuhi unsur kesepadanan struktur (SPOK), kehematan kata (anti-pleonasme), kecermatan, dan kelogisan.',
      'Hindari Kata Ganda: "Agar supaya" (pilih salah satu), "Demi untuk", "Saling tolong-menolong", "Semua para hadirin".',
      'Penulisan Gelar Akademik & Kedinasan: Menggunakan tanda titik pada tiap singkatan (contoh: Prof. Dr. Ir. Budi Hartono, M.Sc.).'
    ],
    speedHack: 'Singkirkan opsi yang ada kata mubazir seperti "daripada", "di mana" sebagai perantara, atau kata jamak ganda ("semua peserta-peserta").',
    matchingSubCategories: ['Bahasa Indonesia Resmi Kedinasan']
  },

  // ==========================================
  // TIU: TES INTELIGENSIA UMUM (14 KISI-KISI DARI VAULT DOC)
  // ==========================================
  {
    id: 'tiu-rumus-cepat-akar',
    category: 'TIU',
    title: 'Hitung Cepat: Pola Akar Berulang Tak Hingga',
    officialScope: 'Rumus Serba Cepat TIU — Perkalian, Penjumlahan & Pengurangan Akar',
    sourceDoc: '/doc/MATERI TIU/RUMUS SERBA CEPAT.pdf',
    competencyDesc: 'Menguasai trik kilat 1 detik menyelesaikan bentuk akar bertingkat tak hingga tanpa kalkulator dan tanpa persamaan kuadrat manual.',
    theoryPoints: [
      '1. Perkalian Akar Tak Hingga: Jika x = √(a √(a √(a ...))), maka kuadratkan kedua ruas x² = a x => x = a.',
      '2. Penjumlahan Akar Tak Hingga: Jika x = √(v + √(v + ...)), pecah v = n × (n+1). Karena tanda (+), hasilnya angka TERBESAR: (n+1).',
      '3. Pengurangan Akar Tak Hingga: Jika x = √(v - √(v - ...)), pecah v = n × (n+1). Karena tanda (-), hasilnya angka TERKECIL: n.'
    ],
    speedHack: 'Akar Kali = Angka itu sendiri (√9√9... = 9). Akar Tambah (+) = Ambil yang besar (√12+√12... = 3×4 => 4). Akar Kurang (-) = Ambil yang kecil (√12-√12... => 3).',
    matchingSubCategories: [
      'Hitung Cepat (Akar Serba Cepat)',
      'Hitung Cepat (Akar Jumlah Tak Hingga)',
      'Hitung Cepat (Akar Kurang Tak Hingga)'
    ]
  },
  {
    id: 'tiu-aljabar-kuadrat',
    category: 'TIU',
    title: 'Hitung Cepat: Aljabar Selisih Kuadrat Sakti',
    officialScope: 'Bentuk Aljabar a² - b² = (a-b)(a+b) & Pemfaktoran Kilat',
    sourceDoc: '/doc/MATERI TIU/TIU SUB ALJABAR.pdf',
    competencyDesc: 'Menyelesaikan perkalian dan selisih bilangan kuadrat besar dengan mendekomposisikan ke bentuk selisih kuadrat aljabar.',
    theoryPoints: [
      'Identitas Aljabar Utama: a² - b² = (a - b)(a + b).',
      'Contoh Kasus BKN: (87)² - (13)² = (87 - 13)(87 + 13) = 74 × 100 = 7.400.',
      'Bentuk Kuadrat Sempurna: (a + b)² = a² + 2ab + b²; (a - b)² = a² - 2ab + b².'
    ],
    speedHack: 'Jangan pernah menghitung 87 × 87! Cukup kurangkan (87-13 = 74) lalu kalikan dengan hasil jumlahnya (87+13 = 100) -> 7.400 dalam 5 detik!',
    matchingSubCategories: ['Hitung Cepat (Aljabar Kuadrat Sakti)']
  },
  {
    id: 'tiu-pecahan-desimal',
    category: 'TIU',
    title: 'Hitung Cepat: Pecahan Sakti & Desimal Berulang',
    officialScope: 'Konversi Fraksi Spesial 1/8, 3/8, 5/8, 7/8, 1/3, 2/3, 1/6, 5/6',
    sourceDoc: '/doc/MATERI TIU/TIU SUB PROSENTASE.pdf',
    competencyDesc: 'Menghafal nilai konversi pecahan istimewa untuk mengeliminasi operasi perkalian desimal panjang di kertas buram ujian CAT.',
    theoryPoints: [
      'Keluarga 1/8: 0,125 = 1/8; 0,375 = 3/8; 0,625 = 5/8; 0,875 = 7/8.',
      'Keluarga 1/3 & 1/6: 0,333... = 1/3; 0,666... = 2/3; 0,166... = 1/6; 0,833... = 5/6.',
      'Keluarga 1/9: 0,111... = 1/9; 0,444... = 4/9; 0,888... = 8/9.'
    ],
    speedHack: 'Jika muncul soal "0,375 × 64", jangan kali desimal! Langsung tulis: (3/8) × 64 = 3 × 8 = 24. Selesai 3 detik!',
    matchingSubCategories: ['Hitung Cepat (Pecahan Sakti)']
  },
  {
    id: 'tiu-diskon-bertingkat',
    category: 'TIU',
    title: 'Aritmatika Sosial: Diskon Bertingkat & Persentase',
    officialScope: 'Formula Diskon Ganda (d1% + d2%) & Hubungan x terhadap y',
    sourceDoc: '/doc/MATERI TIU/TIU SUB ARITMATIKA SOSIAL.pdf',
    competencyDesc: 'Mengoreksi kesalahpahaman umum mengenai promo diskon bertingkat dan menghitung persentase keuntungan neto secara akurat.',
    theoryPoints: [
      'Diskon Ganda Tidak Dijumlahkan: Diskon 50% + 20% BUKAN 70%!',
      'Rumus Diskon Riil: Diskon Total = d1 + d2 - ((d1 × d2) / 100).',
      'Contoh 50% + 20%: 50 + 20 - (1000 / 100) = 70 - 10 = 60% diskon sebenarnya.'
    ],
    speedHack: 'Formula Kilat: Jumlahkan kedua diskon lalu kurangkan dengan hasil kali keduanya dibagi 100.',
    matchingSubCategories: ['Hitung Cepat (Diskon Bertingkat)', 'Aritmatika Sosial Persentase Untung']
  },
  {
    id: 'tiu-deret-aritmatika-geometri',
    category: 'TIU',
    title: 'Deret Angka: Pola Selisih Bertingkat & Geometri',
    officialScope: 'Barisan Bilangan Berlipat Ganda, Beda Bertingkat & Rasio',
    sourceDoc: '/doc/MATERI TIU/BARIS DERET TIU.pdf',
    competencyDesc: 'Mendeteksi lonjakan pola angka yang selisihnya mengalami multiplikasi geometri (+2, +4, +8, +16) atau pola selisih kuadrat sempurna.',
    theoryPoints: [
      'Pola Selisih Ganda: Selisih antar-suku dikali 2 pada tiap lompatan suku.',
      'Pola Multiplikasi: Suku ke-(n+1) = (Suku ke-n × k) - c.',
      'Pola Kuadrat Bergeser: Suku ke-n adalah n² + k (misal 1+k, 4+k, 9+k, 16+k, 25+k).'
    ],
    speedHack: 'Tulis selisih antar-angka di bawah deret. Jika selisihnya 3, 6, 12, 24 -> selisih berikutnya pasti 48!',
    matchingSubCategories: [
      'Deret Angka HOTS (Pola Selisih Ganda)',
      'Deret Angka HOTS (Pola Multiplikasi)',
      'Deret Angka HOTS (Pola Kuadrat Bergeser)'
    ]
  },
  {
    id: 'tiu-deret-fibonacci-larik',
    category: 'TIU',
    title: 'Deret Angka: Pola Fibonacci & Dua Larik Berseling',
    officialScope: 'Jumlahan Dua Suku Sebelumnya & Larik Berseling Ganjil-Genap',
    sourceDoc: '/doc/MATERI TIU/TIU SUB DERET ANGKA DAN HURUF.pdf',
    competencyDesc: 'Menguasai pola barisan Fibonacci murni dan pola dua barisan terpisah yang dianyam berselang-seling satu sama lain.',
    theoryPoints: [
      'Pola Fibonacci: Suku ke-3 = Suku 1 + Suku 2. Suku ke-4 = Suku 2 + Suku 3.',
      'Dua Larik Berseling: Larik 1 pada posisi ganjil (suku 1, 3, 5, 7) memiliki pola sendiri; Larik 2 pada posisi genap (suku 2, 4, 6) memiliki pola berbeda.'
    ],
    speedHack: 'Jika angka naik-turun zigzag (contoh: 2, 50, 5, 46, 8, 42), JANGAN cari selisih berdampingan! Langsung lompat 1 angka: 2-5-8 (+3) dan 50-46-42 (-4).',
    matchingSubCategories: [
      'Deret Angka HOTS (Pola Fibonacci)',
      'Deret Angka HOTS (Dua Larik Berseling)'
    ]
  },
  {
    id: 'tiu-deret-huruf-abjad',
    category: 'TIU',
    title: 'Deret Huruf Abjad BKN: Konversi Posisi Alfabet',
    officialScope: 'Lompatan Huruf Alfabet A-Z dengan Pola Aritmatika Posisi',
    sourceDoc: '/doc/MATERI TIU/TIU SUB DERET ANGKA DAN HURUF.pdf',
    competencyDesc: 'Mengubah deret abjad menjadi angka nomor urut 1 sampai 26 untuk memecahkan pola selisih lompat huruf tanpa mengeja manual.',
    theoryPoints: [
      'Tabel Konversi Posisi: A=1, B=2, C=3, D=4, E=5, J=10, O=15, T=20, Y=25, Z=26.',
      'Pola Selisih Posisi: Selisih lompatan huruf bisa konstan (+3), bertingkat (+2, +3, +4, +5), atau berseling.'
    ],
    speedHack: 'Hafalkan jangkar 5 huruf sakti: E(5) - J(10) - O(15) - T(20) - Y(25). Huruf apa pun langsung diketahui nomor urutnya tanpa mengulang dari A!',
    matchingSubCategories: ['Deret Huruf Abjad BKN']
  },
  {
    id: 'tiu-silogisme-kuantor',
    category: 'TIU',
    title: 'Silogisme: Kuantor Universal & Eksistensial (Semua vs Sebagian)',
    officialScope: 'Hukum Silogisme Formal, Diagram Venn Himpunan & Pernyataan Kuantor',
    sourceDoc: '/doc/MATERI TIU/MATERI TIU penalaran SILOGISME dan ANALITIK.pdf',
    competencyDesc: 'Menarik kesimpulan sah dari premis kuantor universal ("Semua") dan kuantor eksistensial ("Sebagian / Sementara / Beberapa") tanpa terjebak over-generalisasi.',
    theoryPoints: [
      'Aturan Universal: Premis "Semua A adalah B" berarti seluruh anggota himpunan A berada di dalam B.',
      'Aturan Partikular: Jika salah satu premis berupa "Sebagian", maka kesimpulan yang sah WAJIB berbentuk "Sebagian".',
      'Subjek Individu: Jika "Semua ASN wajib berintegritas" dan "Budi adalah seorang ASN", kesimpulannya mutlak: "Budi pasti berintegritas".'
    ],
    speedHack: 'Hukum Emas Silogisme: Jika ada satu premis kata "Sebagian/Sementara", kesimpulan PASTI diawali kata "Sebagian/Sementara"!',
    matchingSubCategories: ['Silogisme & Logika Formal HOTS']
  },
  {
    id: 'tiu-silogisme-modus',
    category: 'TIU',
    title: 'Silogisme: Modus Ponens, Tollens & Kontraposisi',
    officialScope: 'Kaidah Implikasi (p → q), Invers, Konvers & Kontraposisi (~q → ~p)',
    sourceDoc: '/doc/MATERI TIU/PENALARAN LOGIS.pdf',
    competencyDesc: 'Menarik kesimpulan deduktif sah berdasarkan hukum inferensi logika proposisional dan menentukan pernyataan majemuk yang ekivalen.',
    theoryPoints: [
      'Modus Ponens: Premis 1: p → q. Premis 2: p. Kesimpulan: q.',
      'Modus Tollens: Premis 1: p → q. Premis 2: ~q. Kesimpulan: ~p.',
      'Silogisme Hipotesis: Premis 1: p → q. Premis 2: q → r. Kesimpulan: p → r.',
      'Kontraposisi: (p → q) secara mutlak EKIVALEN dengan (~q → ~p).'
    ],
    speedHack: 'Modus Tollens: Jika P maka Q. Ternyata Tidak Q -> Kesimpulan pasti Tidak P! Kontraposisi: Balik posisi dan balik tanda (P->Q ≡ ~Q->~P).',
    matchingSubCategories: ['Silogisme & Logika Formal HOTS']
  },
  {
    id: 'tiu-analitis-posisi-baris',
    category: 'TIU',
    title: 'Penalaran Analitis: Posisi Barisan Sebaris 6 Kursi',
    officialScope: 'Teknik Kunci Slot Duduk & Penggabungan Blok Pasangan Terikat',
    sourceDoc: '/doc/MATERI TIU/TIU SUB ANALITIS.pdf',
    competencyDesc: 'Menyusun urutan posisi tempat duduk sebaris 6 calon ASN berdasarkan petunjuk sebelah kiri, kanan, di antara, dan posisi ujung.',
    theoryPoints: [
      'Langkah 1: Gambar 6 garis slot bernomor 1 sampai 6 dari kiri ke kanan.',
      'Langkah 2: Cari informasi yang memiliki posisi absolut mati (misalnya "Doni duduk di kursi paling kanan").',
      'Langkah 3: Satukan blok nama yang terikat (misal "Eka tepat di kiri Farah" -> blok [Eka, Farah]; "Bima tepat di kanan Farah" -> blok [Eka, Farah, Bima]).',
      'Langkah 4: Tempatkan blok nama ke slot kosong yang tersisa.'
    ],
    speedHack: 'Kunci posisi ujung terlebih dahulu, lalu gabungkan nama-nama yang berdampingan menjadi satu kesatuan blok.',
    matchingSubCategories: ['Penalaran Analitik Urutan Baris']
  },
  {
    id: 'tiu-analitis-meja-bundar',
    category: 'TIU',
    title: 'Penalaran Analitis: Meja Bundar & Penjadwalan Dinas',
    officialScope: 'Posisi Melingkar Berhadapan, Arah Jarum Jam & Jadwal Piket 6 Hari',
    sourceDoc: '/doc/MATERI TIU/KHUSUS SOAL TIU/SOAL TIU ANALITIS.pdf',
    competencyDesc: 'Menganalisis posisi duduk melingkar 6 orang yang saling berhadapan serta mengunci jadwal piket harian Senin sampai Sabtu.',
    theoryPoints: [
      'Meja Bundar 6 Kursi: Posisi berhadapan berselisih 3 kursi (arah jam 12 berhadapan jam 6).',
      'Arah Pandang Meja Bundar: Orang yang duduk menghadap ke pusat meja memiliki tangan kanan searah jarum jam dan tangan kiri berlawanan arah.',
      'Penjadwalan Hari: Buat tabel 6 hari (Senin - Sabtu), masukkan hari yang pasti, lalu terapkan syarat selisih hari ("2 hari sebelum").'
    ],
    speedHack: 'Gambar lingkaran jam dinding. Kunci posisi jam 12 dan jam 6. Sebelah kanan jam 12 adalah jam 2 (searah jarum jam).',
    matchingSubCategories: [
      'Penalaran Analitik Meja Bundar',
      'Penalaran Analitik Penjadwalan Dinas',
      'Penalaran Analitik Peringkat Nilai',
      'Penalaran Analitik Kepanitiaan Bersyarat'
    ]
  },
  {
    id: 'tiu-pekerja-proyek',
    category: 'TIU',
    title: 'Perbandingan Berbalik Nilai: Proyek Terhenti & Pekerja Tambahan',
    officialScope: 'Formula Kilat 10 Detik Pekerja Tambahan Tanpa Tabel Hari',
    sourceDoc: '/doc/MATERI TIU/TIU SUB PERBANDING.pdf',
    competencyDesc: 'Menghitung jumlah pekerja tambahan yang harus direkrut agar proyek selesai tepat waktu setelah sempat terhenti beberapa hari.',
    theoryPoints: [
      'Konsep Dasar: Beban pekerjaan tetap sama. Pekerja Awal × Hari Total = (Pekerja Awal × Hari Kerja) + ((Pekerja Awal + Tambahan) × Sisa Hari).',
      'Formula Kilat BKN: Tambahan Pekerja = (Pekerja Awal × Hari Terhenti / Libur) ÷ Sisa Hari Kerja.',
      'Sisa Hari = Hari Total Rencana - Hari Sudah Bekerja - Hari Terhenti.'
    ],
    speedHack: 'Rumus 10 Detik: (Awal × Libur) ÷ Sisa Hari. Langsung dapat hasilnya tanpa menghitung total beban hari!',
    matchingSubCategories: ['Perbandingan Berbalik Nilai (Proyek)']
  },
  {
    id: 'tiu-kecepatan-papasan',
    category: 'TIU',
    title: 'Kecepatan, Jarak & Waktu: Berpapasan & Menyusul',
    officialScope: 'Waktu Berpapasan Berlawanan, Menyusul Searah & V Rata-Rata',
    sourceDoc: '/doc/MATERI TIU/TIU SUB JARAK, WAKTU, KECEPATAN.pdf',
    competencyDesc: 'Menguasai perhitungan waktu tempuh mobil dinas berpapasan berlawanan arah, menyusul dengan selisih waktu keberangkatan, dan kecepatan rata-rata bolak-balik.',
    theoryPoints: [
      '1. Berpapasan Berlawanan Arah: Waktu t = Jarak Total S ÷ (V1 + V2).',
      '2. Menyusul Searah: Waktu t = Selisih Jarak yang Sudah Ditempuh Awal ÷ (V2 - V1).',
      '3. Kecepatan Rata-Rata Bolak-Balik: V_rata = (2 × V1 × V2) ÷ (V1 + V2).'
    ],
    speedHack: 'Berpapasan = Jarak dibagi JUMLAH kecepatan. Menyusul = Selisih Jarak dibagi SELISIH kecepatan. Rata-rata pulang-pergi = 2ab/(a+b).',
    matchingSubCategories: [
      'Kecepatan Berpapasan Berlawanan Arah',
      'Kecepatan Menyusul Searah',
      'Kecepatan Rata-Rata Bolak-Balik'
    ]
  },
  {
    id: 'tiu-figural-spasial',
    category: 'TIU',
    title: 'Logika Figural: Rotasi Derajat Spasial Matriks 3×3',
    officialScope: 'Perubahan Sudut, Pencerminan & Pola Transformasi Gambar',
    sourceDoc: '/doc/MATERI TIU/FIGURAL.pdf',
    competencyDesc: 'Mengukur ketajaman visual dalam mendeteksi akumulasi perputaran sudut figural searah atau berlawanan jarum jam pada matriks kotak 3×3.',
    theoryPoints: [
      'Perpindahan Matriks Horizontal: Dari kolom 1 ke kolom 3 terjadi 2 kali rotasi.',
      'Arah Perputaran: Searah jarum jam (Utara -> Timur -> Selatan -> Barat); Berlawanan jarum jam (Utara -> Barat -> Selatan -> Timur).'
    ],
    speedHack: 'Fokus pada satu titik jangkar (misal ujung mata panah). Hitung kelipatan rotasi: Langkah ke-3 = Rotasi Awal + 2×(Besar Rotasi).',
    matchingSubCategories: ['Logika Figural & Rotasi Spasial']
  },

  // ==========================================
  // TKP: TES KARAKTERISTIK PRIBADI (8 KISI-KISI DARI VAULT DOC)
  // ==========================================
  {
    id: 'tkp-pelayanan-publik-kepuasan',
    category: 'TKP',
    title: 'Pelayanan Publik: Kepuasan Pemohon & Tanggap Antrean',
    officialScope: 'PermenPAN-RB No. 321 — Keramahan, Ketepatan Waktu & Sikap Solutif',
    sourceDoc: '/doc/MATERI TKP/TKP Pelayanan Publik.pdf',
    competencyDesc: 'Menilai kemampuan memberikan pelayanan prima kepada masyarakat tanpa membeda-bedakan status sosial dan tanggap mengatasi antrean menumpuk.',
    theoryPoints: [
      'Kriteria Skor 5: Proaktif menghampiri pemohon, menawarkan bantuan langsung, transparan menginformasikan kendala teknis, dan menyiapkan solusi alternatif.',
      'Kriteria Skor 1-2: Bersikap pasif menunggu instruksi, menyalahkan sistem jaringan, atau bersikap ketus kepada pemohon.'
    ],
    speedHack: 'Kunci Skor 5: "Tindakan Konkret Cepat Selesai + Empati Bahasa Santun + Kepuasan Pemohon Nomor Satu".',
    matchingSubCategories: ['Pelayanan Publik']
  },
  {
    id: 'tkp-pelayanan-inklusif',
    category: 'TKP',
    title: 'Pelayanan Publik: Inklusivitas Lansia & Penyandang Disabilitas',
    officialScope: 'Pelayanan Berkeadilan Sosial & Perlindungan Kelompok Rentan',
    sourceDoc: '/doc/MATERI TKP/BONGKAR SEMUA SOAL TKP.pdf',
    competencyDesc: 'Menguji kepekaan nurani dalam mendahulukan dan mendampingi pemohon dari kelompok rentan (lansia, ibu hamil, disabilitas) di loket pelayanan.',
    theoryPoints: [
      'Kriteria Skor 5: Turun langsung dari balik loket untuk menuntun dan mendampingi warga lansia/disabilitas mengisi formulir hingga berkas tuntas.',
      'Kriteria Skor 1-2: Menyuruh pemohon lansia membaca sendiri panduan teknis yang rumit di dinding.'
    ],
    speedHack: 'Jika ada pemohon lansia/disabilitas kesulitan: Pilihan Skor 5 selalu berupa pendampingan langsung dengan penuh kesabaran!',
    matchingSubCategories: ['Pelayanan Publik']
  },
  {
    id: 'tkp-jejaring-mediasi',
    category: 'TKP',
    title: 'Jejaring Kerja: Mediasi Konflik Rapat & Komunikasi Asertif',
    officialScope: 'Sinergi Antar-Divisi, Negosiasi Titik Temu & Kolaborasi Tim',
    sourceDoc: '/doc/MATERI TKP/TKP Jejaring Kerja.pdf',
    competencyDesc: 'Menilai kematangan kepemimpinan dalam meredakan perdebatan sengit saat rapat dinas dan merumuskan titik temu yang menguntungkan instansi.',
    theoryPoints: [
      'Kriteria Skor 5: Bertindak sebagai mediator netral, membedah kelebihan kedua opsi usulan, dan mengintegrasikan kekuatan ide kedua pihak.',
      'Kriteria Skor 1-2: Memihak pejabat yang lebih senior atau memilih diam bersikap pasif (cuek).'
    ],
    speedHack: 'Kunci Skor 5: "Jembatani Perbedaan + Ambil Esensi Terbaik Kedua Pihak + Satukan Dalam Kepentingan Bersama".',
    matchingSubCategories: ['Jejaring Kerja & Kolaborasi']
  },
  {
    id: 'tkp-jejaring-anggota-pasif',
    category: 'TKP',
    title: 'Jejaring Kerja: Membina Rekan Tim yang Pasif / Lambat',
    officialScope: 'Pemberdayaan Rekan Kerja & Pembagian Beban Tugas Proporsional',
    sourceDoc: '/doc/MATERI TKP/TKP Jejaring Kerja.pdf',
    competencyDesc: 'Mengukur empati manajerial dalam mengidentifikasi hambatan kerja rekan satu tim tanpa mengambil alih seluruh tugasnya (anti-hero syndrome).',
    theoryPoints: [
      'Kriteria Skor 5: Mengajak berdiskusi santai empat mata, menanyakan kendala teknis yang dihadapi, lalu memberikan bimbingan pendampingan.',
      'Kriteria Skor 1-2: Langsung melaporkan ke atasan agar diberi surat peringatan atau membiarkan tugas terbengkalai.'
    ],
    speedHack: 'Jangan langsung lapor bos (itu bukan kerja tim)! Dekati rekan tersebut secara empatik dan bantu selesaikan hambatannya bersama.',
    matchingSubCategories: ['Jejaring Kerja & Kolaborasi']
  },
  {
    id: 'tkp-sosial-budaya-3t',
    category: 'TKP',
    title: 'Sosial Budaya: Adaptasi di Daerah 3T & Kearifan Lokal',
    officialScope: 'Penempatan Wilayah Terluar, Menghormati Adat & Mengatasi Etnosentrisme',
    sourceDoc: '/doc/MATERI TKP/TKP Sosial Budaya.pdf',
    competencyDesc: 'Menilai fleksibilitas sosial dan keterbukaan budaya saat bertugas di daerah perbatasan/terpencil dengan adat istiadat yang berbeda dari daerah asal.',
    theoryPoints: [
      'Kriteria Skor 5: Menunjukkan antusiasme mempelajari bahasa dan adat lokal, bersilaturahmi dengan tetua adat, serta berbaur dalam tradisi masyarakat.',
      'Kriteria Skor 1-2: Membatasi pergaulan hanya dengan sesama rekan perantau sedaerah atau memaksakan budaya asal.'
    ],
    speedHack: 'Kunci Skor 5: "Di mana bumi dipijak, di situ langit dijunjung" — Selalu hormati norma lokal dan jadilah perekat kebersamaan.',
    matchingSubCategories: ['Sosial Budaya & Keberagaman']
  },
  {
    id: 'tkp-tik-adopsi-siber',
    category: 'TKP',
    title: 'Teknologi Informasi: Adopsi Cloud & Kewaspadaan CSIRT',
    officialScope: 'Transformasi Digital Perkantoran, Keamanan Kredensial & Anti-Phishing',
    sourceDoc: '/doc/MATERI TKP/TKP TIK.pdf',
    competencyDesc: 'Mengukur inisiatif digitalisasi, kesediaan membuat panduan aplikasi bagi rekan senior, serta kesadaran siber menolak tautan email phishing.',
    theoryPoints: [
      'Kriteria Skor 5: Proaktif membuat panduan ringkas visual dan segera melaporkan temuan tautan phishing mencurigakan kepada tim IT/CSIRT dinas.',
      'Kriteria Skor 1-2: Mengabaikan rekan senior yang kesulitan menggunakan aplikasi atau mengklik tautan berbahaya secara sembarangan.'
    ],
    speedHack: 'Kunci Skor 5: Cepat tanggap teknologi + Rangkul rekan yang gaptek + Waspada proteksi kata sandi kedinasan!',
    matchingSubCategories: ['Teknologi Informasi & Komunikasi']
  },
  {
    id: 'tkp-profesionalisme-prioritas',
    category: 'TKP',
    title: 'Profesionalisme: Manajemen Skala Prioritas & Deadline',
    officialScope: 'Tanggung Jawab Penuntasan Tugas, Efisiensi Waktu & Lembur Darurat',
    sourceDoc: '/doc/MATERI TKP/TKP Profesionalisme.pdf',
    competencyDesc: 'Menilai kedewasaan dalam memilah mana tugas mendesak-penting, bertanggung jawab penuh atas tugas utama, dan tidak menunda pekerjaan.',
    theoryPoints: [
      'Kriteria Skor 5: Memetakan matriks Eisenhower (mendesak & penting), menyelesaikan tugas pokok tepat waktu, lalu membantu divisi lain secara proporsional.',
      'Kriteria Skor 1-2: Menolak mentah-mentah permintaan atasan atau meninggalkan laporan dinas terbengkalai.'
    ],
    speedHack: 'Kunci Skor 5: "Komunikasikan batas waktu secara santun + Selesaikan tugas prioritas utama lebih dulu + Berikan solusi cepat untuk tugas darurat".',
    matchingSubCategories: ['Profesionalisme & Anti-Radikalisme']
  },
  {
    id: 'tkp-anti-radikalisme-netralitas',
    category: 'TKP',
    title: 'Anti-Radikalisme: Netralitas ASN & Komitmen Kebangsaan',
    officialScope: 'Ketegasan Menolak Ujaran Kebencian & Kepatuhan Netralitas Politik',
    sourceDoc: '/doc/MATERI TKP/TKP Anti Radikalisme.pdf',
    competencyDesc: 'Menilai keteguhan sikap menolak narasi perpecahan di media sosial/grup kantor dan komitmen menjaga netralitas ASN di masa pemilu/pilkada.',
    theoryPoints: [
      'Kriteria Skor 5: Menolak secara tegas narasi intoleransi, mengingatkan rekan kerja tentang sumpah netralitas ASN, dan melapor ke pimpinan jika ada pelanggaran berat.',
      'Kriteria Skor 1-2: Ikut menyebarkan ujaran kebencian atau bersikap apatis membiarkan radikalisme berkembang.'
    ],
    speedHack: 'Pilihan Skor 5: Tegas tolak ujaran intoleran + Ingatkan etika ASN + Laporkan secara berjenjang ke inspektorat.',
    matchingSubCategories: ['Profesionalisme & Anti-Radikalisme']
  },

  // ==========================================
  // SKB TI: PRANATA KOMPUTER (8 KISI-KISI TEKNIS DARI VAULT DOC)
  // ==========================================
  {
    id: 'skb-subnetting-cidr',
    category: 'SKB_TI',
    title: 'Jaringan Komputer: Subnetting IPv4 CIDR /24 s.d. /30',
    officialScope: 'Perhitungan Host Valid, Subnet Mask Desimal Bertitik & Network ID',
    sourceDoc: '/doc/MATERI TIU 2/SEMUA MATERI TIU.pdf',
    competencyDesc: 'Menguasai perhitungan alokasi blok IP kedinasan, penentuan broadcast address, dan efisiensi prefix CIDR jaringan LAN pemerintah.',
    theoryPoints: [
      'Konsep CIDR: /24 (254 host, .0); /25 (126 host, .128); /26 (62 host, .192); /27 (30 host, .224); /28 (14 host, .240); /29 (6 host, .248); /30 (2 host point-to-point, .252).',
      'Host Valid = 2^(32 - prefix) - 2 (karena 1 IP untuk Network Address dan 1 IP untuk Broadcast Address).',
      'Subnet Mask Oktet Terakhir = 256 - 2^(32 - prefix).'
    ],
    speedHack: 'Hafalkan blok kelipatan 2: /27=32 (host 30), /28=16 (host 14), /29=8 (host 6), /30=4 (host 2). Nilai mask = 256 - total IP.',
    matchingSubCategories: ['Jaringan Komputer & Subnetting CIDR']
  },
  {
    id: 'skb-osi-tcpip-routing',
    category: 'SKB_TI',
    title: 'Infrastruktur Jaringan: Model 7 Layer OSI, VLAN & Routing',
    officialScope: 'Arsitektur Jaringan SPBE, Routing Statis/Dinamis (OSPF, BGP) & DNS',
    sourceDoc: '/doc/MATERI TIU 2/SEMUA TTG TIU.pdf',
    competencyDesc: 'Menguasai konsep fungsi tiap lapisan OSI (Physical s.d. Application), protokol TCP/IP, segmentasi VLAN 802.1Q, serta resolusi DNS dinas.',
    theoryPoints: [
      'Layer OSI: 1. Physical (Kabel/Bit); 2. Data Link (MAC, Switch, Frame); 3. Network (IP, Router, Packet); 4. Transport (TCP/UDP, Port); 5. Session; 6. Presentation (SSL/Enkripsi); 7. Application (HTTP/DNS).',
      'VLAN (Virtual LAN): Membagi domain siaran (broadcast domain) secara logis pada switch managed layer 2/3.',
      'Protokol Inti: TCP (connection-oriented andal) vs UDP (connectionless cepat).'
    ],
    speedHack: 'Hafalan 7 Layer (Bawah ke Atas): "Please Do Not Throw Sausage Pizza Away" (Physical, DataLink, Network, Transport, Session, Presentation, Application).',
    matchingSubCategories: ['Jaringan Komputer & Subnetting CIDR']
  },
  {
    id: 'skb-keamanan-cia-triad',
    category: 'SKB_TI',
    title: 'Keamanan Siber: Pilar CIA Triad & Standar ISO/IEC 27001',
    officialScope: 'Kerahasiaan (Confidentiality), Keutuhan (Integrity) & Ketersediaan (Availability)',
    sourceDoc: '/doc/MATERI TIU 2/TIU SUB ARITMATIKA DAN GEOMETRI.pdf',
    competencyDesc: 'Menganalisis implementasi sistem manajemen keamanan informasi (SMKI) SPBE berdasarkan prinsip confidentiality, integrity, dan availability.',
    theoryPoints: [
      'Confidentiality: Menjamin data sensitif hanya dapat dibaca oleh pihak berwenang via enkripsi dan RBAC (Role-Based Access Control).',
      'Integrity: Menjamin data tidak dimodifikasi secara ilegal via algoritma hashing (SHA-256) dan digital signature.',
      'Availability: Menjamin layanan portal selalu siap diakses tanpa downtime via redundansi server, failover cluster, dan proteksi anti-DDoS.'
    ],
    speedHack: 'Confidentiality = Cegah Bocor; Integrity = Cegah Modifikasi (Hash); Availability = Cegah Server Down (DDoS).',
    matchingSubCategories: ['Keamanan Informasi & Kriptografi SPBE']
  },
  {
    id: 'skb-kriptografi-siber',
    category: 'SKB_TI',
    title: 'Kriptografi & Mitigasi Serangan Siber (OWASP Top 10)',
    officialScope: 'Kriptografi Simetris (AES) vs Asimetris (RSA), SQLi, XSS & Ransomware',
    sourceDoc: '/doc/MATERI TIU 2/TIU.pdf',
    competencyDesc: 'Menguasai enkripsi transmisi data SSL/TLS, algoritma asimetris public-private key, serta mitigasi celah keamanan aplikasi web pemerintah.',
    theoryPoints: [
      'Kriptografi Simetris: Menggunakan 1 kunci yang sama untuk enkripsi dan dekripsi (AES, DES). Cepat untuk enkripsi data massal.',
      'Kriptografi Asimetris: Menggunakan sepasang kunci: Public Key (enkripsi) dan Private Key (dekripsi) seperti RSA dan ECC.',
      'SQL Injection (SQLi): Serangan injeksi perintah basis data pada form web. Mitigasi: Gunakan Prepared Statements / Parameterized Queries.'
    ],
    speedHack: 'SSL/TLS di web = Kriptografi Asimetris. Mitigasi SQL Injection = Selalu gunakan Prepared Statements (hindari concate SQL mentah)!',
    matchingSubCategories: ['Keamanan Informasi & Kriptografi SPBE']
  },
  {
    id: 'skb-normalisasi-basis-data',
    category: 'SKB_TI',
    title: 'Basis Data: Normalisasi Skema Relasional 1NF, 2NF & 3NF',
    officialScope: 'Penghilangan Redundansi, Partial Dependency & Transitive Dependency',
    sourceDoc: '/doc/MATERI TIU 2/SEMUA MATERI TIU.pdf',
    competencyDesc: 'Merancang arsitektur basis data relasional SPBE yang optimal dan bebas anomali pembaruan (update, delete, insert anomaly).',
    theoryPoints: [
      '1NF (Bentuk Normal Pertama): Setiap sel tabel harus bernilai atomik (tidak boleh ada repeating groups / array nilai berganda).',
      '2NF (Bentuk Normal Kedua): Memenuhi 1NF dan tidak ada ketergantungan fungsional sebagian (partial dependency) terhadap primary key komposit.',
      '3NF (Bentuk Normal Ketiga): Memenuhi 2NF dan tidak ada ketergantungan transitif (atribut non-key tidak boleh bergantung pada atribut non-key lainnya).'
    ],
    speedHack: '1NF = Nilai Atomik; 2NF = Hilangkan Ketergantungan Parsial; 3NF = Hilangkan Ketergantungan Transitif antar-kolom non-kunci.',
    matchingSubCategories: ['Basis Data Relasional & Normalisasi SQL']
  },
  {
    id: 'skb-acid-indexing-sql',
    category: 'SKB_TI',
    title: 'Basis Data: Transaksi ACID, Indexing B-Tree & Query JOIN',
    officialScope: 'Atomicity, Consistency, Isolation, Durability & Optimasi Query SQL',
    sourceDoc: '/doc/MATERI TIU 2/ARITMATIKA.pdf',
    competencyDesc: 'Menguasai jaminan keandalan transaksi finansial/administrasi database pemerintah dan percepatan query SELECT via index.',
    theoryPoints: [
      'Atomicity: Transaksi dieksekusi tuntas seluruhnya atau dibatalkan sama sekali (All or Nothing via Commit/Rollback).',
      'Consistency: Data harus valid sesuai batasan skema sebelum dan sesudah transaksi.',
      'Isolation: Transaksi konkuren yang berjalan bersamaan tidak boleh saling mengganggu.',
      'Durability: Data yang sudah di-commit tersimpan permanen di media disk tahan crash server.',
      'B-Tree Index: Struktur pohon berimbang untuk mempercepat pencarian data dengan kompleksitas O(log n).'
    ],
    speedHack: 'Atomicity = All or Nothing (Gagal = Rollback!). Index B-Tree = Percepat pencarian klausa WHERE kolom penting.',
    matchingSubCategories: ['Basis Data Relasional & Normalisasi SQL']
  },
  {
    id: 'skb-agile-git-devops',
    category: 'SKB_TI',
    title: 'Rekayasa Perangkat Lunak: Agile Scrum, Git & Docker Container',
    officialScope: 'Sprint, Backlog, Git Rebase vs Merge, Containerization & CI/CD',
    sourceDoc: '/doc/MATERI TIU 2/SEMUA TTG TIU.pdf',
    competencyDesc: 'Menguasai siklus pengembangan software modern pemerintah, kolaborasi kode tim via Git branching, dan containerization aplikasi.',
    theoryPoints: [
      'Agile Scrum: Siklus sprint 1-4 minggu, product backlog, sprint review, daily standup rapat 15 menit.',
      'Git Workflow: git merge membuat merge commit baru; git rebase memindahkan basis commit agar riwayat komit tetap linier dan rapi.',
      'Docker Container: Mengisolasi aplikasi beserta pustaka dependensinya di atas kernel OS host tanpa perlu overhead guest OS penuh seperti VM.'
    ],
    speedHack: 'Rebase = Riwayat komit tetap linier rapi. Docker = Ringan & portabel karena berbagi kernel OS induk.',
    matchingSubCategories: ['Rekayasa Perangkat Lunak & DevOps']
  },
  {
    id: 'skb-rest-api-spbe',
    category: 'SKB_TI',
    title: 'Integrasi Web & Tata Kelola SPBE: REST API & Perpres 95/2018',
    officialScope: 'HTTP Status Codes, Interoperabilitas Satu Data & Manajemen Risiko',
    sourceDoc: '/doc/MATERI TIU 2/RUMUS SERBA CEPAT.pdf',
    competencyDesc: 'Menguasai standar pertukaran data API antar-instansi pemerintah serta regulasi nasional Arsitektur SPBE dan Satu Data Indonesia.',
    theoryPoints: [
      'HTTP Status Codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized / Butuh Login), 403 (Forbidden / Tidak Ada Izin Akses), 404 (Not Found), 500 (Server Error).',
      'Perpres No. 95 Tahun 2018: Landasan hukum utama penyelenggaraan Sistem Pemerintahan Berbasis Elektronik (SPBE).',
      'Perpres No. 39 Tahun 2019: Tata kelola Satu Data Indonesia (prinsip interoperabilitas, standar data, metadata baku).'
    ],
    speedHack: '401 = Butuh Login (Unauthenticated); 403 = Akun Tidak Berwenang (Unauthorized); Perpres 95/2018 = SPBE; Perpres 39/2019 = Satu Data.',
    matchingSubCategories: [
      'Rekayasa Perangkat Lunak & DevOps',
      'Tata Kelola SPBE & Regulasi TIK Nasional'
    ]
  },

  // ==========================================
  // TOPIC EKSPANSI VAULT DOKUMEN /DOC (8 TOPIK TAMBAHAN)
  // ==========================================
  {
    id: 'twk-uu-asn-berakhlak',
    category: 'TWK',
    title: 'Manajemen ASN: UU No. 20 Tahun 2023 & Core Values BerAKHLAK',
    officialScope: 'UU No. 20/2023, SE MenPAN-RB No. 20/2021 & Netralitas ASN',
    sourceDoc: '/doc/drive-download-20261112T063556Z-1-001/FUNGSI DAN PERAN ASN.pdf',
    competencyDesc: 'Menguasai 3 fungsi pokok ASN (Pelaksana Kebijakan Publik, Pelayan Publik, Perekat & Pemersatu Bangsa), sistem meritokrasi, asas netralitas politik, dan 7 pilar Core Values BerAKHLAK.',
    theoryPoints: [
      '3 Fungsi Pokok ASN (Pasal 10 UU 20/2023): 1. Pelaksana kebijakan publik; 2. Pelayan publik; 3. Perekat dan pemersatu bangsa.',
      'Core Values BerAKHLAK: Berorientasi Pelayanan (ramah, cekatan, solutif), Akuntabel (jujur, bertanggung jawab, anti-korupsi), Kompeten (terus belajar), Harmonis (peduli, hargai keberagaman), Loyal (setia NKRI & pimpinan sah), Adaptif (antusias hadapi perubahan digital), Kolaboratif (sinergi lintas instansi).',
      'Employer Branding ASN: "Bangga Melayani Bangsa".',
      'Asas Sistem Merit: Pengelolaan ASN berbasis kualifikasi, kompetensi, dan kinerja adil tanpa membedakan latar belakang politik, ras, agama, atau gender.'
    ],
    speedHack: 'Fungsi ASN = Kebijakan, Layanan, Persatuan; Core Values = BerAKHLAK; Mutasi & Promosi = Sistem Merit (Kinerja & Kualifikasi, bukan koneksi).',
    matchingSubCategories: ['Pengamalan 45 Butir Pancasila ASN', 'Integritas & Nilai Anti-Korupsi KPK']
  },
  {
    id: 'twk-wawasan-nusantara',
    category: 'TWK',
    title: 'Wawasan Nusantara & Geopolitik: Deklarasi Djuanda 1957',
    officialScope: 'Deklarasi Djuanda 13 Des 1957, Konvensi UNCLOS 1982 & Konsep Astagatra',
    sourceDoc: '/doc/MATERI TWK/RANGKUMAN_WAWASAN_KEBANGSAAN.pdf',
    competencyDesc: 'Menguasai sejarah penetapan batas wilayah kedaulatan laut kepulauan Indonesia, asas negara kepulauan (Archipelagic State), serta komponen Trigatra dan Pancagatra.',
    theoryPoints: [
      'Deklarasi Djuanda (13 Des 1957): Menghapus batas laut kolonial 3 mil antarpulau (Ordonansi 1939). Menyatakan bahwa laut di antara dan menghubungkan pulau adalah satu kesatuan NKRI, dengan batas laut teritorial 12 mil laut dari garis pangkal terluar.',
      'UNCLOS 1982: Konvensi Hukum Laut Internasional PBB yang mengesahkan konsep negara kepulauan Indonesia dan menetapkan Zona Ekonomi Eksklusif (ZEE) sejauh 200 mil laut.',
      'Astagatra Ketahanan Nasional: Trigatra Statis (Letak Geografis, Keadaan Penduduk, Kekayaan Alam) + Pancagatra Dinamis (Ideologi, Politik, Ekonomi, Sosial Budaya, Pertahanan Keamanan).'
    ],
    speedHack: 'Djuanda 1957 = Laut Pemersatu (12 mil); UNCLOS 1982 = Pengakuan Dunia & ZEE (200 mil); Trigatra = Alamiah/Statis; Pancagatra = Sosial/Dinamis.',
    matchingSubCategories: ['5 Unsur Pokok Bela Negara', 'Sejarah Perjuangan & Tokoh Bangsa']
  },
  {
    id: 'twk-bhinneka-tunggal-ika',
    category: 'TWK',
    title: 'Bhinneka Tunggal Ika: Kitab Sutasoma & Integrasi Nasional',
    officialScope: 'Empat Pilar Kebangsaan — Harmonisasi Keragaman SARA & Resolusi Konflik',
    sourceDoc: '/doc/MATERI TWK/Empat_Pilar_Kebangsaan.pdf',
    competencyDesc: 'Memahami asal-usul semboyan Bhinneka Tunggal Ika, faktor pendorong dan penghambat integrasi nasional, serta bahaya primordialisme dan etnosentrisme.',
    theoryPoints: [
      'Asal Mula Semboyan: Berasal dari Kitab Sutasoma karya Mpu Tantular era Kerajaan Majapahit abad ke-14 (Raja Hayam Wuruk): "Bhinneka tunggal ika tan hana dharma mangrwa" (Berbeda-beda itu, satu itu, tak ada kebenaran yang mendua).',
      'Lambang Garuda Pancasila: Dirancang oleh Sultan Hamid II dari Pontianak, disempurnakan Presiden Soekarno, dan diresmikan pada Sidang Kabinet RIS 11 Februari 1950.',
      'Faktor Penghambat Integrasi: Etnosentrisme (merasa sukunya paling unggul), Primordialisme (ikatan berlebihan thd kedaerahan), dan Chauvinisme (cinta tanah air sempit yang memandang rendah bangsa lain).'
    ],
    speedHack: 'Mpu Tantular = Sutasoma; Sultan Hamid II = Perancang Garuda; Suku Unggul = Etnosentrisme; Kedaerahan = Primordialisme; Cinta Buta = Chauvinisme.',
    matchingSubCategories: ['5 Unsur Pokok Bela Negara']
  },
  {
    id: 'twk-tabel-uud-lembaga',
    category: 'TWK',
    title: 'Tabel UUD 1945: Hak Prerogatif Presiden & Hak DPR',
    officialScope: 'Tabel Praktis UUD 1945 — Pembagian Bab, Pasal & Mekanisme Ketatanegaraan',
    sourceDoc: '/doc/MATERI TWK/Tabel Praktis UUD 1945.pdf',
    competencyDesc: 'Menghafal pasal-pasal kunci kewenangan Presiden (Pasal 10 s.d. 16), fungsi DPR (Pasal 20A), pemakzulan (Pasal 7A-7B), dan syarat perubahan pasal UUD (Pasal 37).',
    theoryPoints: [
      'Hak Prerogatif Presiden (Pasal 14): Memberikan Grasi & Rehabilitasi dengan pertimbangan MA; Memberikan Amnesti & Abolisi dengan pertimbangan DPR.',
      'Hak DPR (Pasal 20A ayat 2): Hak Interpelasi (meminta keterangan kebijakan pemerintah), Hak Angket (penyelidikan pelaksanaan UU), dan Hak Menyatakan Pendapat.',
      'Pasal 37 (Perubahan UUD): Diajukan minimal 1/3 anggota MPR, sidang dihadiri minimal 2/3 anggota MPR, persetujuan minimal 50% + 1 anggota MPR. Khusus bentuk NKRI tidak dapat diubah (Pasal 37 ayat 5).',
      'Kekuasaan Peradilan (Pasal 24-24C): MK menguji UU thd UUD; MA menguji aturan di bawah UU (PP/Permen) thd UU.'
    ],
    speedHack: 'Grasi/Rehabilitasi = Pertimbangan MA; Amnesti/Abolisi = Pertimbangan DPR; Khusus NKRI = Harga mati tidak bisa diubah (Pasal 37 ayat 5).',
    matchingSubCategories: ['UUD 1945 Pasca Amandemen & Wewenang Lembaga']
  },
  {
    id: 'tiu-peluang-kombinasi',
    category: 'TIU',
    title: 'Kaidah Pencacahan: Permutasi, Kombinasi & Jabat Tangan',
    officialScope: 'Permutasi Urutan, Kombinasi Pemilihan Delegasi & Teori Peluang Dadu/Koin',
    sourceDoc: '/doc/MATERI TIU/TIU SUB PELUANG.pdf',
    competencyDesc: 'Membedakan kasus yang memperhatikan urutan (Permutasi) dengan yang tidak memperhatikan urutan (Kombinasi), serta menyelesaikan variasi soal jabat tangan dan delegasi tim.',
    theoryPoints: [
      'Permutasi (Urutan penting: Juara I, II, III; Jabatan Ketua-Sekretaris-Bendahara): P(n, r) = n! / (n - r)!',
      'Permutasi Siklis (Duduk melingkar di meja rapat): P_siklis = (n - 1)!',
      'Kombinasi (Urutan bebas: Memilih delegasi tim, mengambil kelereng acak): C(n, r) = n! / [r! * (n - r)!]',
      'Rumus Cepat Jabat Tangan: n orang saling bersalaman = n(n - 1) / 2.',
      'Peluang Suatu Kejadian: P(A) = n(A) / n(S), dengan rentang 0 <= P(A) <= 1. Komplemen peluang: P(A) + P(A\') = 1.'
    ],
    speedHack: 'Jabatan/Urutan = Permutasi (P); Kelompok/Tim/Jabat Tangan = Kombinasi (C); Jabat tangan = n*(n-1)/2.',
    matchingSubCategories: ['Hitung Cepat (Aljabar Kuadrat Sakti)', 'Penalaran Analitik Urutan Baris']
  },
  {
    id: 'tiu-bruto-neto-tara-bunga',
    category: 'TIU',
    title: 'Aritmatika Sosial: Bruto, Neto, Tara & Bunga Tunggal Bank',
    officialScope: 'Perhitungan Komersial, Persentase Potongan Berat & Bunga Simpanan',
    sourceDoc: '/doc/MATERI TIU/TIU SUB ARITMATIKA SOSIAL.pdf',
    competencyDesc: 'Menghitung hubungan Bruto (berat kotor), Neto (berat bersih), dan Tara (berat kemasan), serta menghitung bunga tunggal simpanan dan pinjaman bulanan.',
    theoryPoints: [
      'Bruto = Neto + Tara; Neto = Bruto - Tara; Tara = %Tara * Bruto.',
      'Harga Bayar Bersih = Harga satuan per kg * Neto (Tara tidak boleh dibayar seharga barang!).',
      'Bunga Tunggal Bank: Bunga = Modal * (Persen Bunga Tahunan / 100) * (Bulan / 12).',
      'Pajak PPN (menambah biaya beli): Harga Akhir = Harga Pokok + (PPN% * Harga Pokok).',
      'Pajak PPh (mengurangi penghasilan): Gaji Bersih = Gaji Kotor - (PPh% * Gaji Kotor).'
    ],
    speedHack: 'Bruto = Total kotor; Neto = Isi bersih; Tara = Bungkus/Kemasan. Bunga bulanan = Modal * %Bunga * (Bulan/12).',
    matchingSubCategories: ['Aritmatika Sosial Persentase Untung', 'Hitung Cepat (Diskon Bertingkat)']
  },
  {
    id: 'tiu-perbandingan-compound',
    category: 'TIU',
    title: 'Perbandingan Bertingkat 3 Variabel: Pekerja, Waktu & Output',
    officialScope: 'Compound Proportion — Hubungan Multivariabel Kapasitas Produksi',
    sourceDoc: '/doc/MATERI TIU/PERBANDINGAN TIU.pdf',
    competencyDesc: 'Menyelesaikan problem perbandingan yang melibatkan 3 variabel sekaligus: jumlah pekerja, durasi waktu/hari, dan volume output hasil pekerjaan.',
    theoryPoints: [
      'Kaidah Universal Compound Proportion: (Pekerja * Waktu) / Hasil Output = Konstan. Rumus: (W1 * T1) / O1 = (W2 * T2) / O2.',
      'Hubungan Variabel: Pekerja dan waktu berbalik nilai; Pekerja dan output senilai; Waktu dan output senilai.',
      'Proyek Terhenti di Tengah Jalan: Pekerja Tambahan = (Hari Terhenti * Pekerja Awal) / Sisa Hari Tersedia.'
    ],
    speedHack: '(Orang * Hari) / Barang = (Orang * Hari) / Barang. Pekerja Tambahan = (Libur * Orang) / Sisa Hari.',
    matchingSubCategories: ['Perbandingan Berbalik Nilai (Proyek)', 'Perbandingan Pengisian Pipa Air']
  },
  {
    id: 'tiu-figural-analogi-serial',
    category: 'TIU',
    title: 'Logika Figural: Analogi, Ketidaksamaan & Serial Gambar',
    officialScope: 'Kemampuan Spasial Silabus BKN — Transformasi, Simetri & Seri Pola',
    sourceDoc: '/doc/MATERI TIU/FIGURAL.pdf',
    competencyDesc: 'Menganalisis pola transformasi bentuk geometri, perputaran sudut searah/berlawanan jarum jam, penambahan elemen bertahap, dan membedakan 1 gambar ganjil (odd one out).',
    theoryPoints: [
      'Analogi Gambar (A : B = C : D): Temukan aturan perubahan bentuk, arsiran, dan rotasi dari A ke B, lalu terapkan identik pada C untuk menemukan D.',
      'Ketidaksamaan Gambar (Odd One Out): Cari 1 gambar yang menyalahi pola mayoritas (misalnya 4 gambar berputar searah jarum jam, 1 berlawanan; atau jumlah sudut kelipatan 2 vs ganjil).',
      'Serial Gambar: Lanjutkan urutan ke-4/ke-5 dengan melacak pergerakan elemen (+45 derajat, +90 derajat, atau penambahan titik hitam +1, +2, +3).'
    ],
    speedHack: 'Fokus lacak 1 elemen paling menonjol (misal titik hitam). Cek arah rotasi (searah vs berlawanan jarum jam). Langsung eliminasi 3 opsi salah!',
    matchingSubCategories: ['Logika Figural & Rotasi Spasial']
  }
];

interface KisiKisiViewProps {
  questions: Question[];
  onStartDrill?: (category: Category) => void;
}

export const KisiKisiView: React.FC<KisiKisiViewProps> = ({ questions }) => {
  const [selectedPillar, setSelectedPillar] = useState<'ALL' | Category>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrillTopic, setActiveDrillTopic] = useState<KisiKisiTopic | null>(null);

  // Drill State for in-view targeted practice
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillSelectedOption, setDrillSelectedOption] = useState<OptionKey | null>(null);
  const [drillAnswered, setDrillAnswered] = useState(false);
  const [drillSeconds, setDrillSeconds] = useState(0);
  const [drillBookmarkedIds, setDrillBookmarkedIds] = useState<string[]>(getBookmarkedIds());
  const [drillStreak, setDrillStreak] = useState(0);
  const [drillScoreTotal, setDrillScoreTotal] = useState(0);

  // Filter topics based on pillar and search query
  const filteredTopics = useMemo(() => {
    return COMPREHENSIVE_KISI_KISI.filter(topic => {
      const matchPillar = selectedPillar === 'ALL' || topic.category === selectedPillar;
      if (!matchPillar) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.competencyDesc.toLowerCase().includes(q) ||
        topic.officialScope.toLowerCase().includes(q) ||
        topic.speedHack.toLowerCase().includes(q) ||
        topic.sourceDoc.toLowerCase().includes(q) ||
        topic.theoryPoints.some(tp => tp.toLowerCase().includes(q))
      );
    });
  }, [selectedPillar, searchQuery]);

  // Pillar counts
  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: COMPREHENSIVE_KISI_KISI.length, TWK: 0, TIU: 0, TKP: 0, SKB_TI: 0 };
    COMPREHENSIVE_KISI_KISI.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Count questions in vault for each topic
  const getQuestionCountForTopic = (topic: KisiKisiTopic) => {
    return questions.filter(q => 
      q.category === topic.category && 
      topic.matchingSubCategories.includes(q.subCategory)
    ).length;
  };

  // Launch targeted drill for this topic
  const handleLaunchDrill = (topic: KisiKisiTopic) => {
    const matched = questions.filter(q => 
      q.category === topic.category && 
      topic.matchingSubCategories.includes(q.subCategory)
    );

    // If few questions match exact subcategories, fallback to category pool
    const pool = matched.length > 0 ? matched : questions.filter(q => q.category === topic.category);

    // Shuffle questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setDrillQuestions(shuffled);
    setDrillIndex(0);
    setDrillSelectedOption(null);
    setDrillAnswered(false);
    setDrillSeconds(0);
    setDrillStreak(0);
    setDrillScoreTotal(0);
    setActiveDrillTopic(topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDrill = () => {
    setActiveDrillTopic(null);
    setDrillQuestions([]);
  };

  // Timer for active drill
  React.useEffect(() => {
    let timer: any = null;
    if (activeDrillTopic && !drillAnswered) {
      timer = setInterval(() => {
        setDrillSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeDrillTopic, drillAnswered]);

  const currentDrillQ = drillQuestions[drillIndex];

  const handleDrillSelectOption = (opt: OptionKey) => {
    if (drillAnswered || !currentDrillQ) return;
    setDrillSelectedOption(opt);
    setDrillAnswered(true);

    const isTkp = currentDrillQ.category === 'TKP';
    let isCorrect = false;
    let earned = 0;
    if (isTkp) {
      earned = currentDrillQ.optionScores?.[opt] || 0;
      isCorrect = earned === 5;
    } else {
      isCorrect = opt === currentDrillQ.correctOption;
      earned = isCorrect ? 5 : 0;
    }

    if (isCorrect) {
      setDrillStreak(s => s + 1);
    } else {
      setDrillStreak(0);
    }
    setDrillScoreTotal(s => s + earned);

    // Persist to history
    recordDrillAnswer(currentDrillQ.id, isCorrect, opt);
  };

  const handleDrillNext = () => {
    setDrillAnswered(false);
    setDrillSelectedOption(null);
    setDrillSeconds(0);
    setDrillIndex(prev => (prev + 1) % Math.max(1, drillQuestions.length));
  };

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setDrillBookmarkedIds(updated);
  };

  // RENDER: If Active Drill Mode is active, show Focused Drill View
  if (activeDrillTopic && currentDrillQ) {
    const isTkp = currentDrillQ.category === 'TKP';
    const isBookmarked = drillBookmarkedIds.includes(currentDrillQ.id);
    const selectedScore = drillSelectedOption && isTkp ? (currentDrillQ.optionScores?.[drillSelectedOption] ?? 0) : 0;
    const isCorrectChoice = isTkp ? selectedScore === 5 : drillSelectedOption === currentDrillQ.correctOption;

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in">
        {/* Header Bar: Topic and Back Button */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCloseDrill}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.96] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Katalog Kisi-Kisi</span>
            </button>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold border border-blue-200 mr-2">
                {activeDrillTopic.category}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {activeDrillTopic.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <div className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
              Soal {drillIndex + 1} / {drillQuestions.length}
            </div>
            {drillStreak > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{drillStreak} Streak</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">
                {currentDrillQ.subCategory}
              </span>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                • {activeDrillTopic.sourceDoc}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold ${
                drillSeconds > 54 ? 'bg-rose-50 text-rose-700 border border-rose-300' : 'bg-slate-100 text-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{drillSeconds}s</span>
              </div>
              <button
                onClick={() => handleToggleBookmark(currentDrillQ.id)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
                title="Tandai Soal (Bookmark)"
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base md:text-lg text-slate-900 font-medium leading-relaxed whitespace-pre-line">
            {currentDrillQ.question}
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {(['A', 'B', 'C', 'D', 'E'] as const).map(opt => {
              const optText = currentDrillQ.options[opt];
              if (!optText) return null;

              let style = 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/90 hover:border-slate-300 text-slate-800';

              if (drillAnswered) {
                if (isTkp) {
                  const score = currentDrillQ.optionScores?.[opt] ?? 0;
                  if (opt === drillSelectedOption) {
                    style = score === 5
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500/20'
                      : 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-500/20';
                  } else if (score === 5) {
                    style = 'bg-emerald-50/70 border-emerald-300 text-emerald-900 border-dashed';
                  } else {
                    style = 'opacity-50 border-slate-200 text-slate-600';
                  }
                } else {
                  if (opt === currentDrillQ.correctOption) {
                    style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                  } else if (opt === drillSelectedOption) {
                    style = 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-500/20';
                  } else {
                    style = 'opacity-40 border-slate-200 text-slate-600';
                  }
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleDrillSelectOption(opt)}
                  disabled={drillAnswered}
                  className={`w-full text-left p-4 rounded-2xl border text-sm flex items-start gap-3.5 transition-all duration-150 active:scale-[0.99] cursor-pointer ${style}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-slate-700 shadow-2xs">
                    {opt}
                  </span>
                  <div className="flex-1 leading-relaxed pt-0.5">
                    {optText}
                  </div>
                  {drillAnswered && isTkp && (
                    <span className="px-2 py-0.5 rounded font-mono font-extrabold text-xs bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      Skor {currentDrillQ.optionScores?.[opt] ?? 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Drawer */}
          {drillAnswered && (
            <div className="pt-4 border-t border-slate-100 space-y-4 animate-fade-in">
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isCorrectChoice ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                {isCorrectChoice ? (
                  <CheckCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {isCorrectChoice ? 'Jawaban Tepat! Refleks Analisis Akurat.' : 'Jawaban Kurang Tepat!'}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {isTkp
                      ? `Anda memilih opsi ${drillSelectedOption} dengan Skor ${selectedScore}/5.`
                      : `Kunci jawaban resmi adalah ${currentDrillQ.correctOption}.`}
                  </p>
                </div>
              </div>

              {/* Full Discussion */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200/60 pb-2">
                  <span className="font-bold uppercase tracking-wider">Pembahasan Sesuai Dokumen Vault</span>
                  <span>{activeDrillTopic.sourceDoc}</span>
                </div>
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                  {currentDrillQ.explanation}
                </div>

                {currentDrillQ.trapAnalysis && (
                  <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <strong>⚠️ Jebakan Pengecoh BKN:</strong> {currentDrillQ.trapAnalysis}
                  </div>
                )}

                {currentDrillQ.speedHack && (
                  <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-900 leading-relaxed">
                    <strong>⚡ Rumus Kilat & Trik Taktis:</strong> {currentDrillQ.speedHack}
                  </div>
                )}
              </div>

          {/* Next Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleDrillNext}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-xs active:scale-[0.96] transition-all cursor-pointer"
                >
                  <span>Lanjut Soal Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sticky Quick Next Bar in Kisi-Kisi Drill */}
        {drillAnswered && (
          <div className="fixed bottom-14 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 px-4 flex items-center justify-between shadow-xl animate-fade-in pb-safe">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                isTkp
                  ? selectedScore === 5 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  : isCorrectChoice ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {isTkp ? `Skor ${selectedScore}/5` : isCorrectChoice ? 'Benar (+5)' : 'Salah (0)'}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {drillSeconds}s
              </span>
            </div>

            <button
              onClick={handleDrillNext}
              className="px-4 py-2.5 rounded-xl bg-slate-900 active:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-[0.96] transition-transform cursor-pointer"
            >
              <span>Lanjut Soal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // RENDER: Catalog of 42 Granular Kisi-Kisi
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-fade-in">
      {/* Editorial Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Ekstraksi Autentik {COMPREHENSIVE_KISI_KISI.length} Topik Silabus Modul /doc & PermenPAN-RB No. 321
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Katalog Lengkap Kisi-Kisi & Silabus SKD / SKB 2026
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Seluruh kisi-kisi diekstraksi langsung dari puluhan modul, rangkuman, buku panduan, dan Field Report (FR) BKN di folder <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">/doc</code>. Dilengkapi teori kunci, trik rumus kilat &lt;30 detik, dan latihan soal terarah.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-mono">Passing Grade Resmi</div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">TWK 65 • TIU 80 • TKP 166</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-mono">Target Aman Ranking</div>
              <div className="text-sm font-extrabold text-emerald-600 font-mono">≥ 440 Poin</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-slate-100">
          {/* Segmented Category Filter with dynamic counts */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 overflow-x-auto scrollbar-none max-w-full">
            {(['ALL', 'TWK', 'TIU', 'TKP', 'SKB_TI'] as const).map(cat => {
              const isActive = selectedPillar === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedPillar(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 ease-out cursor-pointer active:scale-[0.96] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-tab-active border border-slate-200/40'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span>{cat === 'ALL' ? 'Semua Kisi-Kisi' : cat === 'SKB_TI' ? 'SKB TI' : cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    {pillarCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari indikator, kausa, silogisme, CIDR, dokumen..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid of 42 Kisi-Kisi Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTopics.map(topic => {
          const count = getQuestionCountForTopic(topic);
          return (
            <div
              key={topic.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header Tag, Source Document & Available Questions Badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-extrabold uppercase tracking-wide border ${
                      topic.category === 'TWK' 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : topic.category === 'TIU'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : topic.category === 'TKP'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {topic.category}
                    </span>

                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80 flex items-center gap-1">
                      <FolderOpen className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[190px]" title={topic.sourceDoc}>{topic.sourceDoc.split('/').pop()}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-600 font-bold flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80">
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span>{count} Soal di Vault</span>
                  </span>
                </div>

                {/* Topic Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {topic.officialScope}
                  </div>
                </div>

                {/* Competency Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {topic.competencyDesc}
                </p>

                {/* Key Theory Bullet Points */}
                <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-3.5 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-slate-500">
                    Poin Kunci Materi
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {topic.theoryPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tactical Speed Hack */}
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-blue-950 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5 text-blue-900 text-[11px] font-mono uppercase mb-0.5">
                    <Zap className="w-3.5 h-3.5 fill-current text-blue-600" />
                    <span>Speed Hack / Trik Kilat</span>
                  </div>
                  <div>{topic.speedHack}</div>
                </div>
              </div>

              {/* Bottom Action: Practice Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[11px] text-slate-400 font-mono">
                  {topic.matchingSubCategories.length} Sub-kategori Terhubung
                </span>

                <button
                  onClick={() => handleLaunchDrill(topic)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-[0.96] transition-all cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Latihan Soal Kisi-Kisi Ini ({count})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto stroke-[1.8]" />
          <h3 className="font-bold text-slate-900 text-base">Tidak ada kisi-kisi yang cocok</h3>
          <p className="text-xs text-slate-500">Coba gunakan kata kunci pencarian yang berbeda atau pilih pilar materi lain.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedPillar('ALL'); }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 active:scale-[0.96] transition-transform cursor-pointer"
          >
            Tampilkan Semua Kisi-Kisi
          </button>
        </div>
      )}
    </div>
  );
};
