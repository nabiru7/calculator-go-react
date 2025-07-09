import React from "react";

function numberToWordsID(number) {
  const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

  function inWords(n) {
    if (n === 0) return "";
    if (n < 10) return satuan[Math.floor(n)];
    if (n === 10) return "sepuluh";
    if (n === 11) return "sebelas";
    if (n < 20) return satuan[Math.floor(n) - 10] + " belas";
    if (n < 100) return satuan[Math.floor(n / 10)] + " puluh " + inWords(n % 10);
    if (n < 200) return "seratus " + inWords(n - 100);
    if (n < 1000) return satuan[Math.floor(n / 100)] + " ratus " + inWords(n % 100);
    if (n < 2000) return "seribu " + inWords(n - 1000);
    if (n < 1000000) return inWords(Math.floor(n / 1000)) + " ribu " + inWords(n % 1000);
    if (n < 1000000000) return inWords(Math.floor(n / 1000000)) + " juta " + inWords(n % 1000000);
    return "Angka terlalu besar";
  }

  if (typeof number !== "number" || isNaN(number)) return "";
  if (number === 0) return "nol";

  let result = "";

  if (number < 0) {
    result = "minus ";
    number = Math.abs(number);
  }

  const integerPart = Math.floor(number);
  const decimalPart = number - integerPart;

  result += inWords(integerPart).replace(/\s+/g, " ").trim();

  if (decimalPart > 0) {
    const decimalStr = decimalPart.toString().split(".")[1];
    result += " koma";
    for (const digit of decimalStr) {
      result += " " + satuan[parseInt(digit)];
    }
  }

  return result.trim();
}

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
