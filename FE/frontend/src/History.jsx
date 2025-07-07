import React from "react";
import "./History.css";

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