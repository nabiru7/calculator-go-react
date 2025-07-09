import React from "react";

// Fungsi konversi angka ke kata (Bahasa Indonesia)
function numberToWordsID(number) {
  const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

  function inWords(n) {
    if (n < 10) return satuan[n];
    if (n === 10) return "sepuluh";
    if (n === 11) return "sebelas";
    if (n < 20) return satuan[n - 10] + " belas";
    if (n < 100) return satuan[Math.floor(n / 10)] + " puluh " + satuan[n % 10];
    if (n < 200) return "seratus " + inWords(n - 100);
    if (n < 1000) return satuan[Math.floor(n / 100)] + " ratus " + inWords(n % 100);
    if (n < 2000) return "seribu " + inWords(n - 1000);
    if (n < 1000000) return inWords(Math.floor(n / 1000)) + " ribu " + inWords(n % 1000);
    if (n < 1000000000) return inWords(Math.floor(n / 1000000)) + " juta " + inWords(n % 1000000);
    return "Angka terlalu besar";
  }

  if (number === 0) return "nol";
  return inWords(number).replace(/\s+/g, " ").trim();
}

// Komponen LatinResult
const LatinResult = ({ result }) => {
  const parsed = parseFloat(result?.toString().split("=").pop());
  if (isNaN(parsed)) return null;

  return (
    <div className="latin-result">
      <em>{numberToWordsID(parsed)}</em>
    </div>
  );
};

export default LatinResult;
