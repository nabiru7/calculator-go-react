import { useState, useRef, useEffect } from 'react' // ditambahkan useEffect (menjaga data saat refresh)
import './App.css'
import History from './History'
import Description from './Description'

function App() {
  // membuat state bernama result untuk menyimpan input 
  const [result, setResult] = useState(() => localStorage.getItem('calc_result') || "")
  // state untuk menyimpan riwayat perhitungan 
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('calc_history')
    return stored ? JSON.parse(stored) : []
  })

  const audioRef = useRef(null) // untuk menyimpan referensi ke elemen audio
  // Supaya kita bisa mengatur suara apa yang dimunculkan ketika di-click

  // Simpan result ke localStorage setiap kali result berubah (supaya tidak hilang saat refresh)
  useEffect(() => {
    localStorage.setItem('calc_result', result)
  }, [result])

  // Simpan history ke localStorage setiap kali history berubah (supaya tidak hilanng saat refresh)
  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history))
  }, [history])

  // Fungsi untuk memutar audio ketika button diclick
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  // function untuk handle click dari setiap button
  const handleClick = e => {
    playClickSound()
    const value = e.target.id

    // Izinkan angka dengan awalan nol ganda seperti "00" agar tampil di layar
    // karena akan ditangani saat proses kalkulasi agar tidak error
    if (value === "00") {
      setResult(result + value)
      return
    }

    setResult(result.concat(value))
  }


  // function untuk hapus seluruh input (di input tab)
  const handleClear = () => {
    playClickSound()
    setResult("")
  }

  // function untuk hapus satu karakter terakhir di input tab
  const deleteBtn = () => {
    playClickSound()
    setResult(result.slice(0, -1))
  }

  const normalizeLeadingZeros = (expr) => {
    // memisahkan string ekspresi berdasarkan operator/non-digit kecuali titik
    // dengan cara ini input seperti 002+3 akan menjadi 2+3 sebelum di-eval, tanpa mengubah 2.05 jadi 2.5.
    return expr.split(/([^0-9.]+)/).map(token => {
      // Token angka bulat tanpa titik, hapus leading zero
      if (/^\d+$/.test(token)) {
        const normalized = token.replace(/^0+/, '') // hapus nol di depan
        return normalized === '' ? '0' : normalized // jika 0 = kosong, kembalikan 0
      }
      // Token angka desimal atau operator/tanda baca, kembalikan apa adanya
      return token
    }).join('')
  }

  const calculate = () => {
    playClickSound()
    try {
      // Ganti persen jadi bentuk desimal
      let replaced = result.replace(/(\d+)%/g, (_, num) => `(${num}*0.01)`)

      // Ganti operator ^ jadi Math.pow()
      replaced = replaced.replace(
        /(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g,
        (match, base, baseDecimal, exponent, exponentDecimal) => {
          return `Math.pow(${base}, ${exponent})`
        }
      )

      // untuk menghapus atau memperbaiki angka-angka yang memiliki awalan nol (leading zero)
      replaced = normalizeLeadingZeros(replaced)

      // untuk kalkulasi sederhana
      const evalResult = eval(replaced).toString()

      // memunculkan hasil-hasil kalkulasi
      setResult(evalResult)
      setHistory([...history, `${result} = ${evalResult}`])
    } catch (error) {
      setResult("Error")
    }
  }


  // untuk menghitung akar kuadrat 
  const squareRoot = () => {
    playClickSound()
    try {
      const value = Math.sqrt(parseFloat(result))
      setResult(value.toString())
    } catch { // jika error
      setResult("Error")
    }
  }

  // untuk menghapus salah satu riwayat perhitungan (by index)
  const deleteHistoryItem = (index) => {
    playClickSound()
    setHistory(history.filter((_, i) => i !== index));
  }

  return (
    // container yang menyimpan calculator, history dan description
    <div className='container'>
      <audio ref={audioRef} src="/assets/Toom Click.wav" preload="auto" />
      <Description />
      <div className="calculator">
        {/* berfungsi sebagai tempat user melihat input dan hasil, tapi tidak bisa langsung diketik */}
        <input type="text" value={result} disabled />
        <div className="buttons">

          <button className="operator" onClick={handleClear}>AC</button>
          <button className="operator" onClick={deleteBtn}>DEL</button>
          <button id="%" className="operator" onClick={handleClick} disabled={result === ""}>%</button>
          <button className="operator" onClick={squareRoot} disabled={result === ""}>√</button>

          <button id="(" className="operator" onClick={handleClick}>(</button>
          <button id=")" className="operator" onClick={handleClick}>)</button>
          <button id="^" className="operator" onClick={handleClick} disabled={result === ""}>^</button>
          <button id="/" className="operator" onClick={handleClick} disabled={result === ""}> :</button>

          <button id="7" className="number" onClick={handleClick}>7</button>
          <button id="8" className="number" onClick={handleClick}>8</button>
          <button id="9" className="number" onClick={handleClick}>9</button>
          <button id="*" className="operator" onClick={handleClick} disabled={result === ""}>x</button>

          <button id="4" className="number" onClick={handleClick}>4</button>
          <button id="5" className="number" onClick={handleClick}>5</button>
          <button id="6" className="number" onClick={handleClick}>6</button>
          <button id="-" className="operator" onClick={handleClick}>-</button>

          <button id="1" className="number" onClick={handleClick}>1</button>
          <button id="2" className="number" onClick={handleClick}>2</button>
          <button id="3" className="number" onClick={handleClick}>3</button>
          <button id="+" className="operator" onClick={handleClick}>+</button>

          <button id="00" className="number" onClick={handleClick}>00</button>
          <button id="0" className="number" onClick={handleClick}>0</button>
          <button id="." className="number" onClick={handleClick} disabled={result === ""}>.</button>
          <button
            id="="
            className="counter"
            onClick={calculate} // supaya saat muncul error, hasilnya tidak dapat dikalkulasi 
            disabled={result === "" || result === "Error"}
          >
            =
          </button>
        </div>
      </div>
      <div className="history-box">
        <History history={history} handleDelete={deleteHistoryItem} />
      </div>
    </div>
  )
}

export default App
