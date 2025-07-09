import React from "react"
import "./History.css"
import LatinResult from "./LatinResult";

// Komponen History menerima dua props:
// 1. history perhitungam
// 2. handleDelete sebagai function untuk menghapus item riwayat berdasarkan index
const History = ({ history, handleDelete }) => {
    return (
        <div className="history-container">
            <h2>History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        <div className="left-content">
                            {/* untuk menampilkan output dari kalkulasi */}
                            <div>{item}</div>

                            {/* untuk menampilkan output dari kalkulasi dalam bentuk kata */}
                            <LatinResult result={item} /> 
                        </div>
                        <button className="del-button" onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default History