import { TacticGuide } from '../types/quiz';

export const TACTIC_GUIDES: TacticGuide[] = [
  {
    id: 'tiu-master-tactics',
    category: 'TIU',
    title: 'TIU: Arsenal Hitung Kilat, Aljabar & Logika Dingin',
    subtitle: '18 Rumus Serba Cepat Asli Vault /doc untuk Tembus Skor ≥ 140',
    summary: '90% peserta gagal di TIU bukan karena rumus rumit, melainkan menghabiskan 3 menit per soal dengan cara sekolah dasar. Gunakan 18 rumus serba cepat ini untuk menyelesaikan soal dalam 10–25 detik.',
    tactics: [
      {
        name: '1. Akar Perkalian Tak Hingga (Rumus 1 Detik)',
        description: 'Jika ada perkalian bilangan yang sama di dalam akar berulang tanpa batas hingga tak hingga, hasilnya adalah bilangan itu sendiri.',
        formulaOrRule: '√(a √(a √(a √(a ...)))) = a',
        mentalModel: 'Jangan kuadratkan dua sisi secara manual. Begitu melihat pola akar berulang perkalian tak hingga, jawabannya adalah angka di dalam akar.',
        example: {
          question: 'Jika x = √(13 √(13 √(13 √(13 ...)))), tentukan nilai dari x!',
          normalMethod: 'Memisalkan x = √(13x) -> x² = 13x -> x² - 13x = 0 -> x(x - 13) = 0 -> x = 13 (Memakan waktu 1 menit).',
          tacticalShortcut: 'Rumus kilat: Pola perkalian akar tak terhingga = a. Langsung jawab x = 13 dalam 1 detik!',
          timeSaved: 'Hemat 59 detik'
        }
      },
      {
        name: '2. Akar Penjumlahan & Pengurangan Tak Hingga',
        description: 'Jika ada akar penjumlahan/pengurangan berulang, faktorkan angka di dalam akar menjadi perkalian dua bilangan bulat berurutan n × (n + 1).',
        formulaOrRule: `√(a + √(a + √(a + ...))) = n + 1 (Ambil angka yang LEBIH BESAR jika tanda '+')
√(a - √(a - √(a - ...))) = n     (Ambil angka yang LEBIH KECIL jika tanda '-')
Di mana a = n × (n + 1)`,
        mentalModel: 'Contoh faktorisasi n(n+1): 6 = 2×3, 12 = 3×4, 20 = 4×5, 30 = 5×6, 42 = 6×7, 56 = 7×8, 72 = 8×9, 90 = 9×10.',
        example: {
          question: 'Hitunglah nilai x = √(56 + √(56 + √(56 + ...))) dan y = √(42 - √(42 - √(42 - ...)))!',
          normalMethod: 'Membuat persamaan kuadrat x² - x - 56 = 0 dan y² + y - 42 = 0.',
          tacticalShortcut: '56 = 7 × 8 (karena tanda +, ambil 8). 42 = 6 × 7 (karena tanda -, ambil 6). Selesai dalam 5 detik!',
          timeSaved: 'Hemat 1 menit 30 detik'
        }
      },
      {
        name: '3. Diskon Berganda (Double Discount Shortcut)',
        description: 'Menghitung diskon bertingkat (misal diskon 30% lalu diskon lagi 20%) tanpa menghitung harga satu per satu.',
        formulaOrRule: '% Total Diskon = %d1 + %d2 - ((%d1 × %d2) / 100)%',
        mentalModel: 'Harga setelah diskon = 100% - % Total Diskon. BKN sangat sering menguji ini untuk menjebak peserta yang menjumlahkan langsung (30% + 20% = 50% SALAH).',
        example: {
          question: 'Baju seharga Rp 200.000 mendapat diskon 40% + 20%. Berapa harga yang harus dibayar?',
          normalMethod: '200.000 × 40% = 80.000 (sisa 120.000). 120.000 × 20% = 24.000. Bayar = 120.000 - 24.000 = 96.000.',
          tacticalShortcut: '% Disc Total = 40 + 20 - (40×20/100) = 60 - 8 = 52%. Yang dibayar = (100 - 52)% = 48%. 48% × 200.000 = Rp 96.000.',
          timeSaved: 'Hemat 40 detik'
        }
      },
      {
        name: '4. Rasio Rata-Rata Gabungan (Metode Alligation / Silang)',
        description: 'Mencari perbandingan jumlah anggota dua kelompok jika diketahui rata-rata masing-masing kelompok dan rata-rata gabungannya.',
        formulaOrRule: `Kelompok A (x̄A)               Kelompok B (x̄B)
               Rata-rata Gab (x̄G)
|x̄G - x̄B|                      |x̄A - x̄G|
Rasio Jumlah A : B = |x̄G - x̄B| : |x̄A - x̄G|`,
        mentalModel: 'Selisih silang rata-rata gabungan terhadap kelas A dan B langsung menghasilkan rasio pembandingnya!',
        example: {
          question: 'Rata-rata tinggi kelas A = 152 cm, kelas B = 155 cm. Rata-rata gabungan kedua kelas = 154 cm. Tentukan perbandingan jumlah siswa A dan B!',
          normalMethod: 'Membuat aljabar: (152A + 155B) / (A + B) = 154 -> 152A + 155B = 154A + 154B -> B = 2A -> A/B = 1/2.',
          tacticalShortcut: 'Silang: |154 - 155| = 1 (untuk A). |152 - 154| = 2 (untuk B). Maka Rasio A : B = 1 : 2. Beres 3 detik!',
          timeSaved: 'Hemat 1 menit'
        }
      },
      {
        name: '5. Proyek Pekerja Terhenti (Shortcut Penambahan Pekerja)',
        description: 'Proyek yang terhenti beberapa hari di tengah jalan dan harus selesai tepat waktu sesuai deadline awal.',
        formulaOrRule: 'Tambahan Pekerja = (Pekerja Awal × Hari Libur/Terhenti) ÷ Sisa Hari Kerja',
        mentalModel: 'Sisa hari = Hari Total Rencana - Hari yang Sudah Berjalan - Hari Libur/Mogok.',
        example: {
          question: 'Proyek 30 hari dikerjakan 15 orang. Setelah berjalan 10 hari, pekerjaan terhenti 5 hari. Berapa pekerja tambahan agar selesai tepat waktu?',
          normalMethod: 'Menghitung total beban kerja: 30 × 15 = 450 man-days. Sisa kerja: 450 - (10×15) = 300 man-days. Sisa hari: 30 - 10 - 5 = 15 hari. Pekerja total: 300/15 = 20 orang. Tambahan: 20 - 15 = 5 orang.',
          tacticalShortcut: 'Rumus kilat: (15 × 5) / (30 - 10 - 5) = 75 / 15 = 5 orang! Selesai dalam 10 detik.',
          timeSaved: 'Hemat 1 menit 15 detik'
        }
      },
      {
        name: '6. Kerja Bersama 2 & 3 Orang (Pekerjaan Gabungan)',
        description: 'Menghitung waktu yang dibutuhkan jika beberapa orang mengerjakan satu pekerjaan bersama-sama.',
        formulaOrRule: `Dua Pekerja (A dan B): T_gab = (A × B) / (A + B)
Tiga Pekerja (A, B, C): T_gab = (A × B × C) / (AB + BC + AC)`,
        mentalModel: 'Untuk 2 pekerja: Kali dibagi Jumlah. Untuk 3 pekerja: Hasil kali ketiganya dibagi jumlah pasangan perkalian.',
        example: {
          question: 'Andi mengecat dinding dalam 4 jam, Budi dalam 6 jam. Jika bersama-sama, berapa jam?',
          normalMethod: '1/T = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 -> T = 12/5 = 2,4 jam.',
          tacticalShortcut: '(4 × 6) / (4 + 6) = 24 / 10 = 2,4 jam (2 jam 24 menit). Hitung di kepala!',
          timeSaved: 'Hemat 30 detik'
        }
      },
      {
        name: '7. Kecepatan Rata-Rata Bolak-Balik Jarak Sama',
        description: 'Perjalanan pergi dan pulang dengan rute dan jarak yang sama persis tetapi kecepatan berbeda.',
        formulaOrRule: 'V_rata = (2 × V1 × V2) ÷ (V1 + V2)',
        mentalModel: 'JEBAKAN BKN: Jangan pernah membagi dua (V1 + V2)/2! Karena waktu tempuh berbeda, kecepatan rata-rata harmonik selalu lebih kecil dari rata-rata aritmatika.',
        example: {
          question: 'Pergi dengan kecepatan 40 km/jam, pulang dengan kecepatan 60 km/jam. Kecepatan rata-rata bolak-balik?',
          normalMethod: 'Memisalkan jarak S, menghitung t1 = S/40, t2 = S/60, total waktu = 5S/120, V_rata = 2S / (5S/120) = 48 km/jam.',
          tacticalShortcut: '(2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/jam. Tepat dan kilat!',
          timeSaved: 'Hemat 50 detik'
        }
      },
      {
        name: '8. Waktu Berpapasan (Berangkat Sama & Berangkat Beda)',
        description: 'Dua orang bergerak saling mendekat dari dua titik berlawanan.',
        formulaOrRule: `Jam Berangkat Sama: t = Jarak_Total ÷ (V1 + V2)
Jam Berangkat Beda: t = (Jarak_Total - (V1 × Δt)) ÷ (V1 + V2)`,
        mentalModel: 'Kecepatan dijumlahkan karena mereka saling mendekat. Jika jam beda, kurangi dulu jarak yang sudah ditempuh orang pertama.',
        example: {
          question: 'Jarak kota A-B = 180 km. Ali berangkat dari A pukul 08.00 (60 km/jam). Budi dari B pukul 08.30 (40 km/jam). Pukul berapa mereka berpapasan?',
          normalMethod: 'Membuat aljabar persamaan jarak S1 + S2 = 180.',
          tacticalShortcut: 'Δt = 30 menit (0,5 jam). Ali sudah jalan = 60 × 0,5 = 30 km. Sisa jarak = 180 - 30 = 150 km. t = 150 / (60 + 40) = 1,5 jam (90 menit). Waktu berpapasan = 08.30 + 1 jam 30 menit = 10.00.',
          timeSaved: 'Hemat 1 menit'
        }
      },
      {
        name: '9. Waktu Menyusul Kendaraan',
        description: 'Dua orang berangkat searah dari titik yang sama dengan kecepatan berbeda dan selisih waktu.',
        formulaOrRule: 't_susul = (V1 × Δt) ÷ (V2 - V1)',
        mentalModel: 'Kecepatan dikurangkan karena orang kedua mengejar ketertinggalan jarak.',
        example: {
          question: 'Rian berangkat pukul 07.00 (40 km/jam). Dian menyusul pukul 07.30 (60 km/jam). Pukul berapa Dian menyusul?',
          normalMethod: 'S1 = S2 -> 40 × (t + 0,5) = 60 × t -> 40t + 20 = 60t -> 20t = 20 -> t = 1 jam.',
          tacticalShortcut: 't_susul = (40 × 0,5) / (60 - 40) = 20 / 20 = 1 jam. Waktu menyusul = 07.30 + 1 jam = 08.30.',
          timeSaved: 'Hemat 35 detik'
        }
      },
      {
        name: '10. Selisih Kuadrat Besar',
        description: 'Menghitung pengurangan dua kuadrat bilangan besar tanpa mengalikan kuadratnya masing-masing.',
        formulaOrRule: 'a² - b² = (a + b) × (a - b)',
        mentalModel: 'Begitu melihat angka kuadrat besar berdekatan, langsung jumlahkan lalu kalikan selisihnya!',
        example: {
          question: 'Hitung nilai dari 75² - 25² dan 103² - 97²!',
          normalMethod: '75² = 5625, 25² = 625 -> 5625 - 625 = 5000.',
          tacticalShortcut: '(75 + 25) × (75 - 25) = 100 × 50 = 5.000! Untuk 103² - 97² = (103 + 97) × (103 - 97) = 200 × 6 = 1.200!',
          timeSaved: 'Hemat 45 detik'
        }
      },
      {
        name: '11. Kuadrat Cepat Bilangan Berakhiran 5',
        description: 'Trik mengkuadratkan angka yang berakhiran digit 5 dalam 2 detik.',
        formulaOrRule: '(n5)² = (n × (n + 1)) disandingkan dengan 25',
        mentalModel: 'Kalikan angka depan (n) dengan kakaknya (n+1), lalu tempelkan angka 25 di belakangnya.',
        example: {
          question: 'Berapakah nilai dari 35², 65², dan 85²?',
          normalMethod: 'Perkalian susun ke bawah 35 × 35, 65 × 65.',
          tacticalShortcut: '35² -> 3 × 4 = 12 tempel 25 = 1.225. 65² -> 6 × 7 = 42 tempel 25 = 4.225. 85² -> 8 × 9 = 72 tempel 25 = 7.225.',
          timeSaved: 'Hemat 30 detik'
        }
      },
      {
        name: '12. Perkalian Dua Bilangan Selisih Genap (Kuadrat Tengah)',
        description: 'Mengalikan dua bilangan yang memiliki rata-rata bulat (selisih genap) menggunakan rumus kuadrat selisih.',
        formulaOrRule: 'a × b = ((a + b)/2)² - ((b - a)/2)²',
        mentalModel: 'Cari angka tengahnya (m), lalu m² dikurangi kuadrat selisih jaraknya.',
        example: {
          question: 'Berapakah 38 × 42 dan 59 × 61?',
          normalMethod: 'Menghitung perkalian susun 38 × 42.',
          tacticalShortcut: '38 dan 42 angka tengahnya 40 (jarak 2). Maka 40² - 2² = 1600 - 4 = 1.596! 59 × 61 tengahnya 60 (jarak 1) -> 60² - 1² = 3.599!',
          timeSaved: 'Hemat 40 detik'
        }
      },
      {
        name: '13. Tabel Pecahan Sakti & Persentase (Hafal Mutlak)',
        description: 'Konversi instan desimal berulang menjadi pecahan sederhana yang langsung dicoret dengan pembagi.',
        formulaOrRule: `1/2 = 0,50 (50%)
1/3 = 0,333... (33,33%) | 2/3 = 0,666... (66,67%)
1/4 = 0,25 (25%) | 3/4 = 0,75 (75%)
1/5 = 0,20 (20%) | 2/5 = 0,40 | 3/5 = 0,60 | 4/5 = 0,80
1/6 = 0,166... (16,67%) | 5/6 = 0,833... (83,33%)
1/8 = 0,125 (12,5%) | 3/8 = 0,375 | 5/8 = 0,625 | 7/8 = 0,875
1/9 = 0,111... | 2/9 = 0,222... | 8/9 = 0,888...
1/16 = 0,0625 (6,25%)`,
        mentalModel: 'Ketika melihat 0,875 ganti jadi 7/8. Lihat 0,833... ganti jadi 5/6. Coret langsung dengan angka soal!',
        example: {
          question: 'Hitung: 0,875 × 64 + 0,166... × 54',
          normalMethod: 'Mengalikan desimal bertingkat 0,875 × 64.',
          tacticalShortcut: '(7/8 × 64) + (1/6 × 54) = (7 × 8) + 9 = 56 + 9 = 65. Beres 8 detik!',
          timeSaved: 'Hemat 1 menit 10 detik'
        }
      },
      {
        name: '14. Banyak Bilangan Ganjil & Genap (DARI vs ANTARA)',
        description: 'Menghitung cepat jumlah bilangan genap atau ganjil dalam suatu rentang interval.',
        formulaOrRule: `Tipe DARI (inklusif A dan B): Total = (B - A + 1) / 2
Tipe ANTARA (eksklusif A dan B): Total = (B - A - 1) / 2
Ketentuan pembulatan:
- Jika hasil desimal dan angka batas sama-sama ganjil: bulatkan ke atas untuk ganjil, ke bawah untuk genap.
- Jika hasil bulat: jumlah ganjil = jumlah genap.`,
        mentalModel: 'Bedakan kata DARI (batas ikut) dengan kata ANTARA (batas tidak ikut).',
        example: {
          question: 'Berapa banyak bilangan ganjil antara 12 dan 50?',
          normalMethod: 'Mendaftar manual di kertas satu per satu.',
          tacticalShortcut: 'Tipe ANTARA: (50 - 12 - 1) / 2 = 37 / 2 = 18,5. Karena 12 genap dan 50 genap, maka ganjil = 19 bilangan.',
          timeSaved: 'Hemat 40 detik'
        }
      },
      {
        name: '15. Jabat Tangan & Pertandingan (Kombinasi C(n,2))',
        description: 'Menghitung banyak jabat tangan antara n orang atau banyak pertandingan setengah kompetisi.',
        formulaOrRule: 'Total Jabat Tangan = (n × (n - 1)) / 2',
        mentalModel: 'Setiap jabat tangan membutuhkan 2 orang tanpa mempedulikan urutan.',
        example: {
          question: 'Dalam sebuah rapat dinas dihadiri 12 orang kepala seksi. Jika setiap orang saling bersalaman satu kali, berapa kali jabat tangan terjadi?',
          normalMethod: 'Membuat rumus kombinasi 12! / (2! × 10!).',
          tacticalShortcut: '(12 × 11) / 2 = 6 × 11 = 66 kali. Selesai 3 detik!',
          timeSaved: 'Hemat 30 detik'
        }
      },
      {
        name: '16. Permutasi Siklis (Meja Bundar)',
        description: 'Menyusun posisi duduk melingkar mengelilingi meja rapat.',
        formulaOrRule: 'P_siklis = (n - 1)!',
        mentalModel: 'Satu orang dikunci sebagai patokan putaran, sisanya disusun secara faktorial biasa.',
        example: {
          question: '6 orang anggota panitia CPNS duduk melingkar di meja bundar. Berapa banyak susunan posisi duduk yang mungkin?',
          normalMethod: 'Bingung rumus permutasi linear 6! = 720.',
          tacticalShortcut: '(6 - 1)! = 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan.',
          timeSaved: 'Menghindari salah jawab 720'
        }
      },
      {
        name: '17. Bunga Tunggal Bank & Aritmatika Sosial',
        description: 'Kalkulasi cepat bunga tabungan bank, harga beli, dan persentase keuntungan.',
        formulaOrRule: `Bunga Bank: B = Modal × (% Bunga Tahunan) × (b / 12)
Harga Beli: HB = Harga Jual ÷ (1 + %Untung) atau HB = Harga Jual ÷ (1 - %Rugi)`,
        mentalModel: 'Jangan mencari 1% dulu. Gunakan faktor pembagi (1 + p) untuk langsung menemukan modal awal.',
        example: {
          question: 'Barang dijual Rp 1.150.000 dengan keuntungan 15%. Berapakah modal awal barang tersebut?',
          normalMethod: 'Membuat aljabar x + 0,15x = 1.150.000.',
          tacticalShortcut: 'HB = 1.150.000 / 1,15 = Rp 1.000.000. Langsung beres!',
          timeSaved: 'Hemat 30 detik'
        }
      },
      {
        name: '18. Taktik Angka Satuan (Last Digit Elimination)',
        description: 'Untuk perkalian atau kuadrat bilangan besar, kalikan hanya digit satuannya lalu cocokkan dengan pilihan ganda.',
        formulaOrRule: 'Digit Satuan Hasil = (Satuan A × Satuan B) mod 10',
        mentalModel: 'Jika pilihan ganda A, B, C, D, E memiliki digit akhir yang berbeda, Anda tidak perlu menghitung angka depannya sama sekali!',
        example: {
          question: '4.897 × 6.328 = ... (A) 30.988.214  (B) 30.988.216  (C) 30.988.218  (D) 30.988.222',
          normalMethod: 'Menghitung perkalian susun 4 digit kali 4 digit di kertas buram (2 menit).',
          tacticalShortcut: 'Cek digit terakhir: 7 × 8 = 56 (digit terakhir 6). Opsi yang berakhiran 6 hanya B! Langsung pilih B dalam 3 detik.',
          timeSaved: 'Hemat 1 menit 50 detik'
        }
      }
    ]
  },
  {
    id: 'twk-master-tactics',
    category: 'TWK',
    title: 'TWK: Nalar Kebangsaan HOTS, 4 Kausa, & Tabel Cepat UUD 1945',
    subtitle: 'Senjata Tembus Ambang Batas 65 Menuju Target 120+',
    summary: 'BKN tidak lagi menanyakan pasal mentah. BKN menguji analisis kasus: Sila 2 vs Sila 5, 4 Kausa Notonagoro, wewenang lembaga negara pasca-amandemen, dan 9 Nilai Integritas KPK.',
    tactics: [
      {
        name: '1. Empat Kausa Notonagoro (Asal Mula Pancasila)',
        description: 'Prof. Mr. Notonagoro merumuskan 4 Kausa asal mula Pancasila yang wajib dipahami perbedaannya.',
        formulaOrRule: `1. Causa Materialis (Asal Mula Bahan): Nilai digali dari adat istiadat, kebudayaan, dan nilai religius bangsa Indonesia sendiri.
2. Causa Formalis (Asal Mula Bentuk): Bentuk dan rumusannya dirumuskan oleh BPUPKI dan Panitia Sembilan.
3. Causa Efisien (Asal Mula Karya): Ditetapkan dan disahkan sebagai dasar negara oleh PPKI pada 18 Agustus 1945.
4. Causa Finalis (Asal Mula Tujuan): Bertujuan untuk dijadikan dasar filsafat dan ideologi negara merdeka.`,
        mentalModel: 'Kata Kunci: Materialis = Bahan/Adat/Agama. Formalis = Bentuk/BPUPKI. Efisien = Pengesahan/PPKI. Finalis = Tujuan/Ideologi.',
        example: {
          question: 'Soal menanyakan: "PPKI yang mengesahkan Pancasila pada 18 Agustus 1945 berkedudukan sebagai kausa apa?"',
          normalMethod: 'Bingung antara Causa Formalis dan Causa Efisien.',
          tacticalShortcut: 'Pengesahan = Karya penetapan = Causa Efisien!',
          timeSaved: 'Poin mutlak TWK'
        }
      },
      {
        name: '2. Pembeda Sila 2 vs Sila 5 (Kasus HOTS BKN)',
        description: 'BKN sering menjebak peserta dengan kasus keadilan dan kemanusiaan.',
        formulaOrRule: `SILA 2 (Kemanusiaan):
- Hubungan antarpribadi manusia (orang per orang).
- Penghormatan HAM, adab bertutur, tidak semena-mena.
- Menolong korban bencana / empati individu.

SILA 5 (Keadilan Sosial):
- Hubungan manusia dengan KEPENTINGAN PUBLIK / MASYARAKAT LUAS.
- Pembajakan karya cipta orang lain (merugikan kesejahteraan bersama).
- Membuang limbah pabrik merusak lingkungan (merugikan kepentingan umum).
- Gaya hidup boros / pamer harta (anti-flexing).
- Nepotisme, calo CPNS, korupsi anggaran publik.`,
        mentalModel: 'Tanyakan: Apakah ini melukai individu manusia (Sila 2) atau merusak ketertiban & kesejahteraan fasilitas sosial masyarakat luas (Sila 5)?',
        example: {
          question: 'Seorang warga membajak software karya orang lain dan menjualnya murah di internet demi keuntungan pribadi.',
          normalMethod: 'Memilih Sila 2 karena merasa mengambil hak milik orang.',
          tacticalShortcut: 'Analisis BKN: Menghargai hasil karya orang lain adalah BUTIR SILA KE-5! Jawab Sila 5.',
          timeSaved: 'Menghindari salah jawab klasik'
        }
      },
      {
        name: '3. Tabel Cepat Pasal Krusial UUD 1945 Pasca-Amandemen',
        description: 'Hafalkan nomor pasal kunci yang paling sering keluar di ujian CAT BKN.',
        formulaOrRule: `Pasal 1: (1) Negara Kesatuan, (2) Kedaulatan Rakyat, (3) Negara Hukum.
Pasal 7: Masa jabatan Presiden maks 2 periode (5 tahun per periode).
Pasal 11: Presiden menyatakan perang, perdamaian, perjanjian internasional dengan persetujuan DPR.
Pasal 14: Grasi & Rehabilitasi (pertimbangan MA); Amnesti & Abolisi (pertimbangan DPR).
Pasal 20: DPR memegang kekuasaan membentuk Undang-Undang.
Pasal 22E: Pemilu diselenggarakan secara Luber Jurdil setiap 5 tahun sekali.
Pasal 23: APBN & BPK.
Pasal 24A: Mahkamah Agung (Kasasi, PK, Uji Peraturan di bawah UU terhadap UU).
Pasal 24C: Mahkamah Konstitusi (Uji UU thdp UUD, Sengketa Lembaga, Bubarkan Parpol, PHPU Pemilu).
Pasal 27 ayat (3): Hak & kewajiban Bela Negara bagi setiap warga negara.
Pasal 30 ayat (1): Hak & kewajiban pertahanan dan keamanan negara (Sishankamrata).
Pasal 33: Perekonomian disusun atas asas kekeluargaan (ayat 1); Cabang produksi penting & SDA dikuasai negara (ayat 2 & 3).`,
        mentalModel: 'Grasi/Rehabilitasi = MA (Urusan Hukum). Amnesti/Abolisi = DPR (Urusan Politik). MK = Sengketa Pemilu & Uji UU.',
        example: {
          question: 'Presiden memberikan amnesti kepada terpidana kasus politik. Lembaga manakah yang wajib memberikan pertimbangan?',
          normalMethod: 'Terkecoh menjawab Mahkamah Agung.',
          tacticalShortcut: 'Amnesti & Abolisi = pertimbangan DPR (Pasal 14 ayat 2). Grasi & Rehabilitasi baru MA!',
          timeSaved: 'Tepat sasaran 5 poin'
        }
      },
      {
        name: '4. 9 Nilai Integritas KPK (Jembatan Anti-Korupsi)',
        description: 'Akronim sakti untuk membedah seluruh soal bertema integritas dinas.',
        formulaOrRule: `Akronim: JU-TA-DI-MAN-KER-JA-SE-BER-PE-ADIL
1. Nilai Inti: Jujur, Tanggung Jawab, Disiplin.
2. Nilai Etos Kerja: Mandiri, Kerja Keras, Sederhana.
3. Nilai Sikap: Berani, Peduli, Adil.`,
        mentalModel: 'Segala tawaran hadiah/fasilitas dari pihak ketiga ke ASN = GRATIFIKASI HARAM. Wajib ditolak atau dilaporkan ke UPG dalam 30 hari.',
        example: {
          question: 'Seorang pejabat menolak tiket pesawat liburan dari rekanan pemenang lelang proyek TI.',
          normalMethod: 'Menganalisis panjang lebar.',
          tacticalShortcut: 'Tindakan menolak gratifikasi mencerminkan nilai Integritas JUJUR dan BERANI.',
          timeSaved: 'Analisis 10 detik'
        }
      }
    ]
  },
  {
    id: 'tkp-master-tactics',
    category: 'TKP',
    title: 'TKP: Bedah Pola Pikir 5 Poin ASN Berintegritas',
    subtitle: 'Strategi Mengamankan Skor 200+ (Ambang Batas 166)',
    summary: 'Di TKP semua opsi bernilai 1 sampai 5. Anda wajib meraih poin 5 sebanyak mungkin. BKN mencari ASN yang solutif, bertanggung jawab tuntas, berorientasi pelayanan publik, dan taat SOP.',
    tactics: [
      {
        name: '1. Anatomi Pembeda Poin 4 vs Poin 5 BKN',
        description: 'Kenali perbedaan tipis antara opsi skor 4 (baik tapi pasif) dengan opsi skor 5 (sempurna dan solutif).',
        formulaOrRule: 'Skor 5 = Tindakan Nyata Mandiri/Koordinatif + Solusi Saat Ini + Mitigasi Jangka Panjang + Taat SOP.',
        mentalModel: 'Opsi Skor 4: "Mendengarkan keluhan warga dan meminta bersabar." Opsi Skor 5: "Mendengarkan keluhan warga, memberikan solusi alternatif sementara, dan langsung memperbaiki sistem agar tidak terulang."',
        example: {
          question: 'Aplikasi antrean digital error saat warga sedang ramai di lobi kantor dinas.',
          normalMethod: 'Memilih opsi "Meminta warga tenang dan bersabar menunggu teknisi datang" (Skor 3 atau 4).',
          tacticalShortcut: 'Pilih opsi yang aktif mengatasi masalah: "Mengalihkan antrean sementara ke tiket fisik manual sembari berkoordinasi dengan teknisi IT untuk memperbaiki server secepatnya." (Skor 5)',
          timeSaved: 'Poin 5 terjamin'
        }
      },
      {
        name: '2. Prinsip Anti-Gratifikasi & Integritas Kedinasan',
        description: 'Aturan mutlak penanganan pemberian barang/fasilitas dari pihak yang terkait jabatan.',
        formulaOrRule: 'Tolak dengan santun dan tegas -> Jelaskan kode etik ASN -> Jika terlanjur dikirim ke rumah, laporkan ke UPG (Unit Pengendalian Gratifikasi) Inspektorat.',
        mentalModel: 'DILARANG memilih opsi "menerima lalu membagikannya ke panti asuhan/teman kantor". Itu adalah jebakan skor 1!',
        example: {
          question: 'Vendor pemenang tender mengirim parcel mewah ke rumah Anda.',
          normalMethod: 'Menerima karena tidak enak hati menolak di depan kurir lalu disumbangkan.',
          tacticalShortcut: 'Tolak tegas dan laporkan ke atasan dan UPG. (Skor 5 mutlak)',
          timeSaved: 'Menghindari jebakan skor 1'
        }
      },
      {
        name: '3. Pilar TIK & Transformasi Digital Layanan',
        description: 'BKN mencari ASN modern yang pro-digitalisasi dan adaptif terhadap perubahan teknologi.',
        formulaOrRule: 'Ada sistem/aplikasi baru -> Dukung penuh -> Pelajari mandiri -> Buatkan panduan / dampingi rekan senior yang kesulitan -> Beri masukan konstruktif.',
        mentalModel: 'Tolak sikap konservatif yang ingin kembali ke sistem kertas manual.',
        example: {
          question: 'Instansi menerapkan sistem absensi mobile GPS yang membingungkan pegawai senior.',
          normalMethod: 'Mengusulkan kembali ke absensi manual fingerprint.',
          tacticalShortcut: 'Mempelajari sistem tersebut dan membuatkan panduan ringkas satu lembar serta membantu melatih pegawai senior. (Skor 5)',
          timeSaved: 'Skor 5 terjamin'
        }
      }
    ]
  },
  {
    id: 'skb-ti-tactics',
    category: 'SKB_TI',
    title: 'SKB TI: Core Knowledge Pranata Komputer & Ahli Teknologi Informasi',
    subtitle: 'Kuasai Subnetting, Normalisasi Database, CIA Triad, & SPBE',
    summary: 'Materi penentu kelulusan tahap akhir setelah lolos perang ranking SKD. Meliputi arsitektur jaringan, basis data relasional, keamanan informasi, dan tata kelola SPBE nasional.',
    tactics: [
      {
        name: '1. Subnetting Kilat CIDR (/24 s.d. /30)',
        description: 'Kalkulasi subnet mask, jumlah IP, dan usable host tanpa konversi biner.',
        formulaOrRule: `Host Valid = (2^(32 - CIDR)) - 2
/24 -> 256 Total IP, 254 Host Valid (Netmask: 255.255.255.0)
/25 -> 128 Total IP, 126 Host Valid (Netmask: 255.255.255.128)
/26 -> 64 Total IP,  62 Host Valid  (Netmask: 255.255.255.192)
/27 -> 32 Total IP,  30 Host Valid  (Netmask: 255.255.255.224)
/28 -> 16 Total IP,  14 Host Valid  (Netmask: 255.255.255.240)
/29 -> 8 Total IP,   6 Host Valid   (Netmask: 255.255.255.248)
/30 -> 4 Total IP,   2 Host Valid   (Netmask: 255.255.255.252) -> Point to Point`,
        mentalModel: 'Hafalkan blok kelipatan 2: 4, 8, 16, 32, 64, 128, 256. Kurangi 2 untuk host valid (kurangi Network ID dan Broadcast ID).',
        example: {
          question: 'Sebuah dinas membutuhkan jaringan untuk 28 komputer klien. Berapakah prefix CIDR yang paling hemat dan efisien?',
          normalMethod: 'Menghitung biner 32 bit.',
          tacticalShortcut: '/28 hanya muat 14 host. /27 muat 30 host. Maka prefix paling hemat adalah /27 (Netmask: 255.255.255.224).',
          timeSaved: 'Hemat 1 menit 20 detik'
        }
      },
      {
        name: '2. Normalisasi Basis Data (1NF, 2NF, 3NF)',
        description: 'Kriteria baku perancangan database relasional untuk menghilangkan redundansi data.',
        formulaOrRule: `1NF: Nilai kolom harus atomik (tidak ada repeating groups / kolom ganda).
2NF: Memenuhi 1NF dan menghilangkan ketergantungan parsial (semua atribut non-key harus bergantung penuh pada Primary Key).
3NF: Memenuhi 2NF dan menghilangkan ketergantungan transitif (atribut non-key tidak boleh bergantung pada atribut non-key lainnya).`,
        mentalModel: 'Kunci Hafalan: 1NF = Atomik. 2NF = Hilangkan Parsial. 3NF = Hilangkan Transitif.',
        example: {
          question: 'Sebuah tabel memiliki kolom ID_Pegawai (PK), Kode_Jabatan, dan Nama_Jabatan. Mengapa tabel ini belum 3NF?',
          normalMethod: 'Menganalisis relasi kompleks.',
          tacticalShortcut: 'Karena Nama_Jabatan bergantung pada Kode_Jabatan (atribut non-key bergantung pada atribut non-key) -> Ketergantungan Transitif! Wajib dipecah ke tabel terpisah.',
          timeSaved: 'Poin mutlak SKB TI'
        }
      },
      {
        name: '3. SPBE (Perpres No. 95 Tahun 2018) & Keamanan Informasi',
        description: 'Regulasi wajib arsitektur Sistem Pemerintahan Berbasis Elektronik dan CIA Triad.',
        formulaOrRule: `Tujuan SPBE: Keterpaduan, Efisiensi, Transparansi, dan Akuntabilitas Layanan Publik melalui Interoperabilitas dan Bagi-Pakai Data Nasional (Satu Data Indonesia).
CIA Triad:
- Confidentiality (Kerahasiaan): Hanya pihak berwenang yang dapat mengakses (Enkripsi AES/RSA).
- Integrity (Keutuhan): Data tidak dapat dimodifikasi ilegal (Hashing SHA-256).
- Availability (Ketersediaan): Layanan selalu aktif dan dapat diakses saat dibutuhkan (Cluster & Load Balancer).`,
        mentalModel: 'SPBE melarang instansi membuat aplikasi silo yang berdiri sendiri tanpa terhubung ke Pusat Data Nasional (PDN).',
        example: {
          question: 'Prinsip SPBE apa yang menjamin bahwa sistem antar-kementerian dapat saling bertukar data tanpa batasan format tertutup?',
          normalMethod: 'Bingung antara integrasi dan skalabilitas.',
          tacticalShortcut: 'Jawaban resmi SPBE: Interoperabilitas Data!',
          timeSaved: 'Poin penuh SKB TI'
        }
      }
    ]
  }
];
