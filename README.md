# Calculator React

Calculator-React-Go adalah aplikasi kalkulator sederhana berbasis React yang memiliki fitur riwayat perhitungan serta menampilkan hasil dalam bentuk kata menggunakan bahasa Indonesia. Backend aplikasi ini menggunakan bahasa Go dan diletakkan dalam folder backend yang terpisah dari frontend.

## Struktur Folder

Proyek ini memiliki struktur folder sebagai berikut: Folder backend/ berisi proyek backend yang dibuat menggunakan bahasa Go, termasuk file modul go.mod. Folder FE/ adalah aplikasi frontend React yang terdiri dari beberapa folder dan file penting, antara lain: node_modules/ untuk dependensi, public/ yang menyimpan aset publik seperti gambar dan suara (misalnya file "Toom Click.wav"), dan src/ sebagai sumber kode React yang berisi komponen dan file styling. Dalam folder src/ terdapat beberapa komponen utama seperti App.jsx yang merupakan komponen utama kalkulator, Description.jsx beserta Description.css yang berfungsi menampilkan deskripsi aplikasi, History.jsx dengan stylingnya yang menampilkan riwayat perhitungan, serta LatinResult.jsx yang berisi fungsi konversi angka ke kata dalam bahasa Indonesia. File konfigurasi dan styling lainnya juga ada di dalam folder ini. Terakhir, ada file README.md yang berfungsi sebagai dokumentasi proyek.

## Frontend (React)
Pada bagian frontend, App.jsx merupakan komponen utama yang menyimpan state untuk input dan riwayat perhitungan. Komponen ini memiliki berbagai fungsi seperti memasukkan angka dan operator, menghapus karakter atau semua input, melakukan perhitungan hasil, serta menghitung akar kuadrat. Saat tombol ditekan, aplikasi juga memainkan suara klik sebagai umpan balik. Komponen App menampilkan komponen Description yang berisi deskripsi aplikasi dan komponen History yang menampilkan daftar riwayat perhitungan. Komponen Description.jsx bertugas menampilkan pesan sambutan beserta tanggal hari ini serta daftar operasi matematika yang tersedia seperti penjumlahan (+), pengurangan (-), perkalian (x), pembagian (:), persen (%), dan akar kuadrat (√). Sementara itu, History.jsx menampilkan riwayat perhitungan dalam bentuk daftar lengkap dengan tombol hapus untuk setiap item. Komponen ini juga menggunakan LatinResult.jsx untuk mengubah hasil perhitungan numerik menjadi kata-kata dalam bahasa Indonesia.

## Backend (Go) 
*Belum Selesai
Bagian backend proyek ini berada di dalam folder backend/. Backend dikembangkan menggunakan bahasa Go dan terdiri dari modul serta source code utama yang dapat dikembangkan untuk berbagai fitur tambahan seperti autentikasi pengguna, atau pengolahan data lainnya sesuai kebutuhan.

## Cara Menjalankan (Frontend)
Untuk menjalankan frontend, pastikan Node.js dan npm sudah terinstall di komputer Anda. Kemudian buka terminal dan masuk ke folder frontend (FE/). Jalankan perintah npm install untuk menginstal semua dependensi yang dibutuhkan. Setelah itu, jalankan aplikasi React dengan perintah npm run dev. Buka browser dan akses alamat yang muncul (biasanya http://localhost:3000 atau http://localhost:5173) untuk melihat aplikasi berjalan.


