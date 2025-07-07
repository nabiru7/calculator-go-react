import React from "react";
import "./History.css";

// Komponen History menerima dua props:
// 1. history perhitungam
// 2. handleDelete sebagai function untuk menghapus item riwayat berdasarkan index
const History = ({ history, handleDelete}) => {
    return(
        <div className="history-container">
            <h2>History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}> 
                        {item}
                        <button className="del-button" onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default History