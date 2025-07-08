import { useState, useRef } from 'react'
import './App.css'
import History from './History'
import Description from './Description'

function App() {
  const [result, setResult] = useState("") // membuat state bernama result untuk menyimpan input 
  const [history, setHistory] = useState([]); // state untuk menyimpan riwayat perhitungan
  const audioRef = useRef(null) // untuk memunculkan audio ketika diclick

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

    // Cegah angka dengan awalan nol ganda setelah operator atau di awal
    if (value === "00") {
      // Jika input kosong atau setelah operator, tambahkan hanya satu "0"
      if (
        result === "" ||
        /[+\-*/(]$/.test(result) // logicnya
      ) {
        setResult(result + "0")
        return
      }
      // Jika sebelumnya sudah ada satu nol setelah operator, jangan tambah lagi
      const lastOperatorMatch = result.match(/([+\-*/(])0$/)
      if (lastOperatorMatch) {
        return
      }
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

  // untuk kalkulasi setiap angka yang diinput oleh user
  const calculate = () => {
    playClickSound()
    try {
      const replaced = result.replace(/(\d+)%/g, (_, num) => `(${num}*0.01)`) // untuk persen
      const evalResult = eval(replaced).toString() // menghitung hasil output
      setResult(evalResult) // mengatur atau memunculkan bagian histori dari hasil kalkulasi
      setHistory([...history, `${result} = ${evalResult}`])
    } catch (error) { // jika error
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
    <div className='container'>
      <audio ref={audioRef} src="/assets/Toom Click.wav" preload="auto" />
      <Description />
      <div className="calculator">
        <input type="text" value={result} disabled />

        <div className="buttons">

          <button className="operator" onClick={handleClear}>AC</button>
          <button className="operator" onClick={deleteBtn}>DEL</button>
          <button id="%" className="operator" onClick={handleClick} disabled={result === ""}>%</button>
          <button className="operator" onClick={squareRoot} disabled={result === ""}>√</button>

          <button id="(" className="operator" onClick={handleClick}>(</button>
          <button id=")" className="operator" onClick={handleClick}>)</button>
          <button id="." className="operator" onClick={handleClick} disabled={result === ""}>.</button>
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
