import React, {useEffect, useState} from "react";
import Magnet from "./Magnet";
import Player from "./Player1";

export default function Board(){
    const [magnets, setMagnets] = useState([]);
    const [maps, setMaps] = useState([
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            backgroundColor: '#f0f0f0',
        },
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            backgroundColor: '#f0f0f0',
            borderRadius: "50%"
        },
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            backgroundColor: '#e8f4f8',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        },
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            backgroundColor: '#f0f0f0',
            borderRadius: '20px',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
        },
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            backgroundColor: '#f8e8e8',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
        },
        {
            position: 'relative',
            width: '600px',
            height: '400px',
            border: '2px solid #444',
            margin: '20px auto',
            background: 'linear-gradient(45deg, #f0f0f0 25%, #e8e8e8 25%, #e8e8e8 50%, #f0f0f0 50%, #f0f0f0 75%, #e8e8e8 75%)',
            backgroundSize: '40px 40px'
        }
    ]);
    const [currentMap, setCurrentMap] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState('red');
    const [remainingMagnets, setRemainingMagnets] = useState({
        red: 10 ,
        blue: 10
    });

    const handleClick = (e) => {
        if (remainingMagnets[currentPlayer] <= 0) return;
        
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMagnets([...magnets, {x, y}]);
        setRemainingMagnets(prev => ({
            ...prev,
            [currentPlayer]: prev[currentPlayer] - 1
        }));
        
        setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
    };

    const handleWinner = () => {
        if (magnets.length >= 2) {
            const lastMagnet = magnets[magnets.length - 1];
            const secondLastMagnet = magnets[magnets.length - 2];
            if (lastMagnet && secondLastMagnet && lastMagnet.style && secondLastMagnet.style) {
                alert(`${secondLastMagnet.style.backgroundColor} wins!`);
                handleEndGame(secondLastMagnet.style.backgroundColor);
            }
        }
    }


    const handleEndGame = (looser) => {
        setMagnets([]);
        setRemainingMagnets({
            blue: 10,
            red: 10,
        });
        setCurrentPlayer(looser);
    }


    const generateRandomBoard = () => {
        
    }

    useEffect(() => {
        if (magnets.length < 2) return;

        const lastMagnet = magnets[magnets.length - 1];
        
        const isTooClose = magnets.slice(0, -1).some(otherMagnet => {
            const dx = lastMagnet.x - otherMagnet.x;
            const dy = lastMagnet.y - otherMagnet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < 100;
        });

        if (isTooClose) {
            alert("Game Over! You placed a magnet too close to another one!");
            handleEndGame(currentPlayer);
        }
    }, [magnets]);

    // Separate useEffect for checking if a player has run out of magnets
    useEffect(() => {
        if (remainingMagnets.red <= 0) {
            alert("Game Over! Blue wins!");
            handleEndGame("red");
        } else if (remainingMagnets.blue <= 0) {
            alert("Game Over! Red wins!");
            handleEndGame("blue");
        }
    }, [remainingMagnets]);

    useEffect(() => {
        const random = Math.floor(Math.random() * maps.length);
        setCurrentMap(random);
    }, []);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    };

    const playersContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        width: '100%'
    };

    return (
        <div style={containerStyle}>
            <div style={playersContainerStyle}>
                <Player 
                    remainingMagnets={remainingMagnets.red}
                    isActive={currentPlayer === 'red'}
                    playerColor="red"
                />
                <Player 
                    remainingMagnets={remainingMagnets.blue}
                    isActive={currentPlayer === 'blue'}
                    playerColor="blue"
                />
            </div>
            <div style={maps[currentMap]} onClick={handleClick}>
                {magnets.map((magnet, index) => (
                    <Magnet 
                        key={index} 
                        x={magnet.x} 
                        y={magnet.y} 
                        index={index}
                    />     
                ))}
            </div>
        </div>
    );
}