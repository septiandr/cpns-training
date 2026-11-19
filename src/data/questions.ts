import { Question } from '../types/quiz';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // TWK QUESTIONS
  // ==========================================
  {
    id: 'twk-001',
    category: 'TWK',
    subCategory: 'Bela Negara & Kedaulatan',
    difficulty: 'HOTS / Hard',
    question: `Sebuah startup teknologi asal Indonesia berhasil menciptakan sistem enkripsi pertahanan berbasis kecerdasan buatan (AI) yang mampu mendeteksi intrusi siber asing. Perusahaan multinasional dari negara adidaya berniat membeli paten teknologi tersebut seharga Rp 500 Miliar dengan syarat hak cipta penuh dialihkan ke negara mereka. Pendiri startup menolak tawaran tersebut dan memilih mengintegrasikannya ke Badan Siber dan Sandi Negara (BSSN) meski dengan kompensasi yang jauh lebih kecil. Tindakan pendiri startup tersebut merupakan manifestasi dari:`,
    options: {
      A: 'Nasionalisme etnosentris yang mengutamakan prestise korporasi domestik',
      B: 'Bela negara nirmiliter dalam dimensi menjaga kedaulatan informasi dan pertahanan digital negara',
      C: 'Patriotisme pasif yang berfokus pada penolakan diplomasi perdagangan internasional',
      D: 'Pilar keadilan sosial dalam kerangka pemerataan distribusi laba korporasi',
      E: 'Tindakan altruisme murni tanpa dasar kewajiban konstitusional'
    },
    correctOption: 'B',
    explanation: `Penolakan akuisisi asing demi mengamankan sistem enkripsi negara adalah wujud nyata Pembelaan Negara (Bela Negara) pada ranah Nirmiliter / Cyber Defense. Bela negara tidak hanya mengangkat senjata di medan perang, melainkan menjaga kedaulatan bangsa dari segala bentuk ancaman kontemporer (termasuk ancaman siber dan kebocoran kedaulatan data nasional).`,
    trapAnalysis: `Opsi A mengecoh dengan kata 'Nasionalisme' namun diberi imbuhan negatif 'etnosentris'. Opsi C menyebut 'Patriotisme pasif' padahal ini aksi aktif. Opsi E mereduksi bela negara seolah hanya altruisme biasa tanpa nilai konstitusi (Pasal 27 ayat 3 & Pasal 30 ayat 1 UUD 1945).`,
    speedHack: `Cari katakunci: "Pertahanan siber asing" + "Menjaga sistem negara dari ancaman luar" -> Otomatis masuk kategori BELA NEGARA (Pertahanan Nirmiliter).`
  },
  {
    id: 'twk-002',
    category: 'TWK',
    subCategory: 'Integritas & Etika Publik',
    difficulty: 'HOTS / Hard',
    question: `Seorang staf Pengadaan Barang dan Jasa (PBJ) di sebuah kementerian didatangi kerabat dekat yang memohon agar dokumen penawaran lelang perusahaannya diloloskan dalam evaluasi administrasi. Kerabat tersebut beralasan perusahaannya sedang di ambang kebangkrutan dan melibatkan nasib ratusan buruh lokal. Sikap staf tersebut yang paling mencerminkan integritas nilai kejujuran dan keadilan adalah:`,
    options: {
      A: 'Meloloskan dokumen administrasi tersebut demi menyelamatkan nasib ratusan buruh lokal sesuai nilai kemanusiaan yang adil dan beradab',
      B: 'Menolak permintaan tersebut dengan tegas, tetap menilai dokumen secara objektif sesuai pedoman lelang, dan menyarankan kerabat mengikuti prosedur sanggah bila ada kendala',
      C: 'Mengundurkan diri dari kepanitiaan lelang agar tidak terjadi benturan kepentingan pribadi dan keluarga',
      D: 'Membantu memperbaiki kekurangan dokumen lelang kerabat di luar jam kerja secara sukarela',
      E: 'Melaporkan kerabat tersebut langsung ke kepolisian atas dugaan percobaan tindak pidana korupsi'
    },
    correctOption: 'B',
    explanation: `Nilai Integritas Kejujuran dan Keadilan (Fairness) menuntut setiap abdi negara memperlakukan semua peserta lelang secara setara (*equal treatment*) tanpa diskriminasi atau favoritisme kekeluargaan. Menolak permintaan kolutif secara tegas namun tetap bekerja profesional dan memedomani aturan adalah standar mutlak ASN berintegritas.`,
    trapAnalysis: `Opsi A adalah jebakan moralitas semu (mengatasnamakan nasib buruh untuk membenarkan kolusi). Opsi C adalah sikap lari dari tanggung jawab. Opsi D adalah kolusi terselubung. Opsi E berlebihan (*overkill*) sebelum adanya transaksi suap material.`,
    speedHack: `Di soal integritas: Jangan pernah berkompromi dengan aturan formal demi urusan keluarga/emosional. Opsi yang tegas pada SOP dan objektif selalu menang.`
  },
  {
    id: 'twk-003',
    category: 'TWK',
    subCategory: 'Pilar Negara (Pancasila)',
    difficulty: 'Medium',
    question: `Pemerintah membangun infrastruktur jaringan serat optik Palapa Ring hingga ke daerah 3T (Terdepan, Terluar, Tertinggal) agar seluruh rakyat Indonesia, tanpa terkecuali, dapat menikmati akses internet berkecepatan tinggi dengan tarif yang terjangkau. Pembangunan ini merupakan perwujudan konkret dari nilai Pancasila, khususnya:`,
    options: {
      A: 'Sila ke-2 (Kemanusiaan yang Adil dan Beradab)',
      B: 'Sila ke-3 (Persatuan Indonesia)',
      C: 'Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan)',
      D: 'Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia)',
      E: 'Sila ke-1 (Ketuhanan Yang Maha Esa)'
    },
    correctOption: 'D',
    explanation: `Sila ke-5 berfokus pada pemerataan hak, akses, dan keadilan fasilitas pembangunan bagi seluruh lapisan rakyat Indonesia (menghilangkan kesenjangan digital antara kota besar dengan daerah pelosok 3T). Butir Sila ke-5 menekankan pemanfaatan fasilitas negara secara adil dan merata demi kesejahteraan umum.`,
    trapAnalysis: `Banyak peserta terkecoh memilih Sila ke-3 (Persatuan) karena ada kata 'menghubungkan seluruh nusantara'. Namun substansi utama soal adalah akses fasilitas setara tanpa diskriminasi ekonomi/wilayah, yang merupakan esensi keadilan sosial (Sila 5).`,
    speedHack: `Katakunci: "Daerah 3T", "Akses merata bagi seluruh rakyat", "Tarif terjangkau / pemerataan" -> Identik dengan Keadilan Sosial (Sila ke-5).`
  },
  {
    id: 'twk-004',
    category: 'TWK',
    subCategory: 'Bahasa Indonesia (Kalimat Efektif)',
    difficulty: 'Medium',
    question: `Manakah di antara kalimat berikut yang memenuhi kaidah kalimat efektif sesuai EYD / PUEBI?`,
    options: {
      A: 'Bagi seluruh peserta seleksi kompetensi dasar diharapkan hadir tiga puluh menit sebelum ujian dimulai.',
      B: 'Server e-Katalog pemerintah yang mengalami gangguan teknis sejak kemarin malam sudah berhasil diperbaiki oleh tim teknis.',
      C: 'Untuk mempersingkat waktu, acara peluncuran aplikasi SPBE segera kita mulai bersama-sama.',
      D: 'Meskipun pembangunan pusat data nasional itu memerlukan biaya besar, tetapi manfaatnya sangat dirasakan oleh masyarakat.',
      E: 'Para bupati-bupati se-Jawa Timur menghadiri rapat koordinasi transformasi digital di Surabaya.'
    },
    correctOption: 'B',
    explanation: `Kalimat B memiliki unsur subjek ('Server e-Katalog pemerintah yang mengalami gangguan teknis sejak kemarin malam') dan predikat ('sudah berhasil diperbaiki') yang jelas, tanpa kerancuan atau pemborosan kata.`,
    trapAnalysis: `Opsi A: Salah karena diawali preposisi 'Bagi' sehingga kalimat kehilangan subjek. Opsi C: Frasa 'mempersingkat waktu' tidak logis (waktu tidak bisa disingkat, yang benar 'mengefisienkan waktu'). Opsi D: Pleonasme konjungsi (jangan gunakan 'Meskipun' bersamaan dengan 'tetapi'). Opsi E: Pleonasme jamak ('Para' sudah jamak, tidak boleh diikuti kata ulang 'bupati-bupati').`,
    speedHack: `Cek 3 racun kalimat: 1) Ada 'Bagi/Kepada' di depan subjek? 2) Ada 'Meskipun... tetapi'? 3) Ada 'Para peserta-peserta'? Jika ada, langsung coret!`
  },

  // ==========================================
  // TIU QUESTIONS
  // ==========================================
  {
    id: 'tiu-001',
    category: 'TIU',
    subCategory: 'Hitung Cepat & Pecahan Sakti',
    difficulty: 'Medium',
    question: `Berapakah nilai dari ekspresi berikut:
X = (0,375 × 0,888... × √144) / (0,666... × 0,75)`,
    options: {
      A: '4',
      B: '6',
      C: '8',
      D: '12',
      E: '16'
    },
    correctOption: 'C',
    explanation: `Konversi ke pecahan sakti:
0,375 = 3/8
0,888... = 8/9
√144 = 12
0,666... = 2/3
0,75 = 3/4

Pembilang = (3/8) × (8/9) × 12
-> Coret 8 atas-bawah = (3/9) × 12 = (1/3) × 12 = 4.

Penyebut = (2/3) × (3/4)
-> Coret 3 atas-bawah = 2/4 = 1/2.

Maka X = 4 / (1/2) = 4 × 2 = 8.`,
    trapAnalysis: `Peserta yang mengalikan desimal berkoma akan kehabisan waktu menghitung 0,375 * 0,888... di kertas buram dan rawan salah desimal menjadi 0,8 atau 80.`,
    speedHack: `3/8 * 8/9 = 1/3. Dikalikan 12 = 4. Dibagi (2/3 * 3/4 = 1/2). 4 dibagi setengah = 8. Selesai dalam 10 detik tanpa kertas!`
  },
  {
    id: 'tiu-002',
    category: 'TIU',
    subCategory: 'Silogisme Kuantor',
    difficulty: 'HOTS / Hard',
    question: `Premis 1: Semua insinyur perangkat lunak menguasai struktur data.
Premis 2: Sebagian insinyur perangkat lunak adalah kontributor open-source.
Premis 3: Semua kontributor open-source memiliki profil GitHub aktif.

Kesimpulan yang paling sah secara silogisme logis adalah:`,
    options: {
      A: 'Semua orang yang memiliki profil GitHub aktif menguasai struktur data.',
      B: 'Sebagian orang yang memiliki profil GitHub aktif menguasai struktur data.',
      C: 'Semua kontributor open-source adalah insinyur perangkat lunak.',
      D: 'Orang yang menguasai struktur data pasti memiliki profil GitHub aktif.',
      E: 'Tidak ada insinyur perangkat lunak yang tidak memiliki profil GitHub aktif.'
    },
    correctOption: 'B',
    explanation: `Dari Premis 2: Sebagian insinyur perangkat lunak (I) adalah kontributor open-source (O).
Karena semua kontributor open-source punya GitHub aktif (G), maka 'Sebagian I' tersebut juga pasti punya GitHub aktif (G).
Dan karena 'Semua I' menguasai struktur data (S), maka 'Sebagian I yang punya GitHub aktif' tersebut pasti menguasai struktur data (S).
Dengan demikian: "Sebagian pemilik profil GitHub aktif menguasai struktur data".`,
    trapAnalysis: `Opsi A & D salah membalik kuantor universal (dari 'Semua X adalah Y' tidak bisa dibalik menjadi 'Semua Y adalah X'). Opsi C salah menggeneralisasi premis 2.`,
    speedHack: `Hukum Kuat Kuantor: Jika ada premis "Semua" digabung dengan premis "Sebagian", kesimpulan AKHIR WAJIB diawali kata "Sebagian/Beberapa". Coret langsung opsi A, C, D, E yang bertipe 'Semua / Tidak ada'!`
  },
  {
    id: 'tiu-003',
    category: 'TIU',
    subCategory: 'Deret Angka HOTS',
    difficulty: 'HOTS / Hard',
    question: `Tentukan dua angka kelanjutan dari deret berikut:
3, 5, 9, 17, 33, 65, ..., ...`,
    options: {
      A: '128, 256',
      B: '129, 257',
      C: '130, 260',
      D: '127, 255',
      E: '133, 265'
    },
    correctOption: 'B',
    explanation: `Perhatikan pola selisih antar angka:
3 ke 5 (+2)
5 ke 9 (+4)
9 ke 17 (+8)
17 ke 33 (+16)
33 ke 65 (+32)
Pola penambahan selalu berlipat ganda: 2, 4, 8, 16, 32, ...
Maka penambahan berikutnya adalah +64:
65 + 64 = 129.
Penambahan berikutnya adalah +128:
129 + 128 = 257.
Atau pola: (n × 2) - 1:
(65 × 2) - 1 = 129
(129 × 2) - 1 = 257.`,
    trapAnalysis: `Banyak yang langsung menghafal kelipatan 2^n murni (64, 128, 256) sehingga salah memilih opsi A (128, 256).`,
    speedHack: `Rumus alternatif n × 2 - 1. 65 × 2 = 130 - 1 = 129. Hanya opsi B yang diawali 129!`
  },
  {
    id: 'tiu-004',
    category: 'TIU',
    subCategory: 'Aritmatika Sosial & Kerja Bersama',
    difficulty: 'Medium',
    question: `Sebuah proyek migrasi database pemerintahan jika dikerjakan oleh Tim Alpha butuh waktu 12 hari. Jika dikerjakan oleh Tim Beta butuh waktu 6 hari. Jika dikerjakan oleh Tim Gamma butuh waktu 4 hari. Jika ketiga tim bekerja bersama-sama secara serentak, dalam berapa hari proyek migrasi tersebut selesai?`,
    options: {
      A: '2 hari',
      B: '3 hari',
      C: '4 hari',
      D: '5 hari',
      E: '6 hari'
    },
    correctOption: 'A',
    explanation: `Gunakan rumus kerja bersama:
1/T_gabungan = 1/12 + 1/6 + 1/4
Samakan penyebut ke 12:
1/T_gabungan = 1/12 + 2/12 + 3/12 = 6/12 = 1/2.
Maka T_gabungan = 2 hari.`,
    trapAnalysis: `Banyak peserta merata-rata hari: (12 + 6 + 4)/3 = 7,3 hari lalu panik mencari pilihan ganda. Kerja bersama selalu menghasilkan waktu yang LEBIH CEPAT dari anggota tercepat (harus < 4 hari).`,
    speedHack: `Logika Cepat: Alpha = 1 unit/hari, Beta = 2 unit/hari, Gamma = 3 unit/hari. Total kecepatan = 1 + 2 + 3 = 6 unit/hari. Total beban = 12 unit. Waktu = 12 / 6 = 2 hari!`
  },

  // ==========================================
  // TKP QUESTIONS
  // ==========================================
  {
    id: 'tkp-001',
    category: 'TKP',
    subCategory: 'Pelayanan Publik & TIK',
    difficulty: 'HOTS / Hard',
    question: `Anda adalah petugas Pranata Komputer di dinas kependudukan. Saat antrean masyarakat memadati ruang layanan, sistem perekaman biometrik e-KTP tiba-tiba freeze dan gagal menyimpan data ke database server pusat. Puluhan warga yang sudah mengantre sejak pagi mulai gaduh dan emosi. Rekan kerja Anda di loket tampak kebingungan dan meminta Anda segera mengambil tindakan. Tindakan terbaik Anda:`,
    options: {
      A: 'Menghadapi warga secara tenang, menjelaskan secara transparan kendala teknis jaringan pusat, meminta maaf, serta berkoordinasi dengan petugas loket untuk mencatat berkas fisik pemohon sementara agar saat sistem pulih data langsung diinput berurutan tanpa warga perlu antre ulang.',
      B: 'Langsung menutup pintu loket untuk mencegah amarah warga menjalar, lalu fokus sendirian di ruang server melakukan restart hardware hingga tuntas.',
      C: 'Menyarankan atasan membuat pengumuman pembatalan layanan hari ini dan meminta warga kembali esok hari dengan membawa nomor antrean yang sama.',
      D: 'Meminta satpam menertibkan warga yang berteriak, sementara Anda menelepon call center penyedia internet dinas dan menunggu teknisi mereka datang.',
      E: 'Mencoba melakukan bypass validasi sistem secara manual pada database agar warga bisa langsung foto tanpa verifikasi data terlebih dahulu demi meredakan situasi.'
    },
    optionScores: {
      A: 5,
      D: 3,
      C: 2,
      B: 2,
      E: 1
    },
    explanation: `Opsi A (Skor 5) merefleksikan kompetensi Pelayanan Publik prima: empati kepada masyarakat (transparan, meminta maaf), solutif taktis (mencatat fisik agar masyarakat tidak rugi waktu antrean), dan koordinatif.`,
    trapAnalysis: `Opsi E (Skor 1) sangat fatal karena melanggar integritas data kependudukan demi alasan instan. Opsi B & C tidak solutif dan egois. Opsi D pasif menyerahkan nasib ke teknisi luar.`,
    speedHack: `Cari opsi yang menyelesaikan 2 hal sekaligus: 1) Ketenangan dan kepastian warga terjamin tanpa langgar SOP, 2) Pemecahan masalah teknis tetap berjalan paralel.`
  },
  {
    id: 'tkp-002',
    category: 'TKP',
    subCategory: 'Jejaring Kerja & Kolaborasi',
    difficulty: 'Medium',
    question: `Anda ditunjuk menjadi ketua tim integrasi data antar-dinas. Salah satu anggota tim yang merupakan perwakilan dari dinas lain memiliki karakter pasif, sering terlambat menghadiri rapat koordinasi teknis (API review), dan belum menyerahkan skema data instansinya padahal tenggat waktu (*deadline*) tinggal 3 hari lagi. Sikap yang Anda ambil:`,
    options: {
      A: 'Melaporkan ketidakdisiplinan anggota tersebut langsung kepada kepala dinasnya agar diberikan teguran resmi dan diganti personel baru.',
      B: 'Mengambil alih seluruh pembuatan skema data instansi tersebut sendirian dan mengerjakannya lembur demi mengejar deadline proyek.',
      C: 'Mengajaknya berdiskusi secara personal empat mata untuk mengidentifikasi kendala teknis atau beban kerja yang dihadapinya, menawarkan pendampingan teknis bila diperlukan, serta menegaskan kembali komitmen batas waktu demi keberhasilan bersama.',
      D: 'Menyindir keterlambatannya di dalam grup WhatsApp koordinasi agar anggota tersebut merasa malu dan segera menyelesaikan tanggung jawabnya.',
      E: 'Mengabaikan keterlambatan anggota tersebut dan tetap mengirimkan laporan integrasi data dinas lain apa adanya tanpa melibatkan dinasnya.'
    },
    optionScores: {
      C: 5,
      B: 3,
      A: 3,
      E: 2,
      D: 1
    },
    explanation: `Opsi C (Skor 5) menunjukkan kematangan kepemimpinan dalam Jejaring Kerja: persuasif, mendengar hambatan bawahan/mitra, memberikan jalan keluar kolaboratif, namun tetap memegang kendali tenggat waktu.`,
    trapAnalysis: `Opsi B (Skor 3) terkesan heroik tapi merusak sistem kerja tim (martir syndrome). Opsi A memicu friksi antar-instansi tanpa tabayun. Opsi D destruktif dan tidak profesional (toxic).`,
    speedHack: `Dalam Jejaring Kerja: Pemimpin ideal selalu mencari akar masalah secara personal (komunikasi asertif) sebelum menjatuhkan sanksi atau kerja sendirian.`
  },
  {
    id: 'tkp-003',
    category: 'TKP',
    subCategory: 'Anti-Radikalisme & Integritas Kebangsaan',
    difficulty: 'HOTS / Hard',
    question: `Di grup media sosial internal pegawai kantor Anda, seorang rekan kerja senior yang dihormati membagikan konten yang mengkritik salah satu upacara adat daerah tertentu dan menyebutnya bertentangan dengan ajaran moral, disertai seruan agar ASN tidak perlu menghadiri festival budaya daerah yang digelar pemerintah daerah. Tanggapan Anda:`,
    options: {
      A: 'Mendiamkan saja pesan tersebut demi menjaga hubungan baik dan rasa hormat kepada rekan senior tersebut.',
      B: 'Membalas pesannya di grup secara frontal dan menuduhnya sebagai penyebar intoleransi dan radikalisme.',
      C: 'Mengingatkan rekan senior tersebut secara santun melalui pesan pribadi bahwa keberagaman budaya adalah kekayaan bangsa yang dilindungi Pancasila dan ASN wajib menjadi perekat bangsa, serta melaporkan secara berkala kepada pembina kepegawaian bila konten serupa berulang.',
      D: 'Meninggalkan grup media sosial tersebut karena merasa lingkungan kerja sudah tidak kondusif.',
      E: 'Menyukai postingan tersebut untuk menghargai kebebasan berpendapat rekan senior di ruang media sosial.'
    },
    optionScores: {
      C: 5,
      B: 3,
      A: 2,
      D: 2,
      E: 1
    },
    explanation: `Opsi C (Skor 5) mencerminkan peran ASN sebagai Perekat dan Pemersatu Bangsa (UU ASN Pasal 66): berani mengoreksi narasi intoleran secara bijak (jalur pribadi demi menjaga marwah rekan) namun memiliki ketegasan eskalasi struktural bila berulang.`,
    trapAnalysis: `Opsi A apatis. Opsi B emosional dan memicu kegaduhan publik di grup. Opsi E mendukung narasi intoleran (Skor 1).`,
    speedHack: `Kunci Anti-Radikalisme: Tegas bela Pancasila/kebinekaan, cara menegur harus elegan (tidak mempermalukan di forum umum), dan ada kontrol kepatuhan regulasi.`
  },

  // ==========================================
  // SKB TEKNIK INFORMATIKA (BONUS ESSENTIALS)
  // ==========================================
  {
    id: 'skb-001',
    category: 'SKB_TI',
    subCategory: 'Jaringan & Keamanan Komputer',
    difficulty: 'HOTS / Hard',
    question: `Sebuah router gerbang (*gateway*) pemerintah dengan subnet mask 255.255.255.224 mengalokasikan IP untuk server web di alamat 192.168.10.35. Berapakah alamat Network ID dan Broadcast ID dari subnet tersebut, serta berapa jumlah host maksimal yang dapat ditampung?`,
    options: {
      A: 'Network: 192.168.10.0, Broadcast: 192.168.10.31, Host: 30',
      B: 'Network: 192.168.10.32, Broadcast: 192.168.10.63, Host: 30',
      C: 'Network: 192.168.10.32, Broadcast: 192.168.10.64, Host: 32',
      D: 'Network: 192.168.10.16, Broadcast: 192.168.10.47, Host: 14',
      E: 'Network: 192.168.10.32, Broadcast: 192.168.10.63, Host: 62'
    },
    correctOption: 'B',
    explanation: `Mask 255.255.255.224 adalah CIDR /27 (32 - 27 = 5 bit host).
Blok subnet = 256 - 224 = 32.
Rentang subnet:
Subnet 1: 0 - 31
Subnet 2: 32 - 63 (IP 192.168.10.35 berada di blok ini!)
Network ID = 192.168.10.32
Broadcast ID = 192.168.10.63
Host valid = 32 - 2 = 30 host (dari .33 sampai .62).`,
    trapAnalysis: `Banyak yang lupa bahwa Network ID dan Broadcast ID tidak boleh dihitung sebagai host valid (harus dikurangi 2).`,
    speedHack: `256 - 224 = 32. Angka 35 berada di antara 32 dan 63. Network = 32, Broadcast = 63. Host = 32 - 2 = 30. Langsung pilih B!`
  },
  {
    id: 'skb-002',
    category: 'SKB_TI',
    subCategory: 'Basis Data & SQL Tuning',
    difficulty: 'HOTS / Hard',
    question: `Sebuah query pelaporan rekapitulasi data bansos mengalami waktu eksekusi lambat (18 detik) pada tabel yang memiliki 5 juta baris:
SELECT nama, nik, alamat FROM penerima_bansos WHERE status_verifikasi = 'SUDAH' AND kode_kabupaten = '3578';
Diketahui kolom status_verifikasi memiliki kardinalitas sangat rendah (hanya bernilai 'SUDAH' 80% dan 'BELUM' 20%), sedangkan kode_kabupaten memiliki kardinalitas tinggi. Strategi pengindeksan (*indexing*) manakah yang paling efektif mempercepat query tersebut?`,
    options: {
      A: 'Membuat single-column B-Tree index pada kolom status_verifikasi',
      B: 'Membuat composite index B-Tree dengan urutan (kode_kabupaten, status_verifikasi)',
      C: 'Membuat composite index B-Tree dengan urutan (status_verifikasi, kode_kabupaten)',
      D: 'Melakukan de-normalisasi tabel ke 1NF',
      E: 'Mengubah tipe data kolom status_verifikasi menjadi TEXT'
    },
    correctOption: 'B',
    explanation: `Aturan baku pembuatan Composite Index: tempatkan kolom dengan kardinalitas / selektivitas paling tinggi di urutan pertama (Leading Column). Kolom 'kode_kabupaten' menyaring data jauh lebih spesifik dibanding 'status_verifikasi' yang 80%-nya sama. Dengan menaruh 'kode_kabupaten' di depan, database engine langsung memangkas 99% pencarian pada B-Tree.`,
    trapAnalysis: `Opsi C salah urutan (status_verifikasi memiliki selektivitas sangat buruk, query optimizer sering melakukan full table scan jika kolom berselektivitas rendah ditaruh di depan).`,
    speedHack: `Prinsip Composite Index SQL: "High Cardinality FIRST". Urutan: (Kolom Banyak Variasi, Kolom Sedikit Variasi).`
  }
];
