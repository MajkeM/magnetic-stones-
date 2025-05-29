import React from "react";

export default function Player({ remainingMagnets, isActive, playerColor }) {
    const playerStyle = {
        padding: '10px',
        margin: '10px',
        border: '2px solid #444',
        borderRadius: '5px',
        backgroundColor: isActive ? '#e0e0e0' : '#f5f5f5',
        display: 'inline-block',
        minWidth: '150px',
        textAlign: 'center'
    };

    const magnetStyle = {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        margin: '0 5px',
        backgroundColor: playerColor,
        borderRadius: '50%',
        border: '1px solid #666'
    };

    return (
        <div style={playerStyle}>
            <h3 style={{ margin: '0 0 10px 0' }}>Player {playerColor}</h3>
            <div>
                {[...Array(remainingMagnets)].map((_, index) => (
                    <span key={index} style={magnetStyle} />
                ))}
            </div>
        </div>
    );
} 