import React from "react";

function numberToWordsIDString(numStr) {
  const satuan = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

  if (!/^\-?\d+(\.\d+)?$/.test(numStr)) return "Error";

  let result = "";

  // Tangani angka negatif
  if (numStr.startsWith("-")) {
    result += "minus ";
    numStr = numStr.slice(1);
  }

  const [integerStr, decimalStr] = numStr.split(".");

  // Tangani bagian sebelum koma
  result += convertIntegerWithZero(integerStr, satuan);

  // Tangani bagian setelah koma
  if (decimalStr) {
    result += " koma";
    for (const digit of decimalStr) {
      result += " " + satuan[parseInt(digit)];
    }
  }

  return result.trim();
}

function convertIntegerWithZero(str, satuan) {
  if (/^0+$/.test(str)) return "nol";

  // Jika benar-benar leading zero seperti "003", "0005", baca satu-satu
  if (/^0\d+/.test(str)) {
    return str.split("").map(d => satuan[parseInt(d)]).join(" ");
  }

  // Kalau enggak ada leading zero (angka biasa), baca normal
  return convertIntegerPart(parseInt(str), satuan);
}



function convertIntegerPart(n, satuan) {
  if (n === 0) return "";
  if (n < 10) return satuan[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return satuan[n - 10] + " belas";

  if (n < 100) {
    const puluhan = satuan[Math.floor(n / 10)] + " puluh";
    const satuanDigit = n % 10 === 0 ? "" : " " + convertIntegerPart(n % 10, satuan);
    return puluhan + satuanDigit;
  }

  if (n < 200) {
    const sisa = n - 100;
    const sisaKata = sisa === 0 ? "" : " " + convertIntegerPart(sisa, satuan);
    return "seratus" + sisaKata;
  }

  if (n < 1000) {
    const ratusan = satuan[Math.floor(n / 100)] + " ratus";
    const sisa = n % 100;
    const sisaKata = sisa === 0 ? "" : " " + convertIntegerPart(sisa, satuan);
    return ratusan + sisaKata;
  }

  if (n < 2000) {
    const sisa = n - 1000;
    const sisaKata = sisa === 0 ? "" : " " + convertIntegerPart(sisa, satuan);
    return "seribu" + sisaKata;
  }

  if (n < 1000000) {
    const ribuan = convertIntegerPart(Math.floor(n / 1000), satuan) + " ribu";
    const sisa = n % 1000;
    const sisaKata = sisa === 0 ? "" : " " + convertIntegerPart(sisa, satuan);
    return ribuan + sisaKata;
  }

  if (n < 1000000000) {
    const juta = convertIntegerPart(Math.floor(n / 1000000), satuan) + " juta";
    const sisa = n % 1000000;
    const sisaKata = sisa === 0 ? "" : " " + convertIntegerPart(sisa, satuan);
    return juta + sisaKata;
  }

  return "Angka terlalu besar";
}


const LatinResult = ({ result }) => {
  const raw = result?.toString().split("=").pop()?.trim();
  if (!raw) return null;

  return (
    <div className="latin-result">
      <em>{numberToWordsIDString(raw)}</em>
    </div>
  );
};

export default LatinResult;
