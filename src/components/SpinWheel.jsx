import React, { useRef, useState } from 'react';
import './SpinWheel.css';

const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    if (colors.every((color, i, colors) => colors[0] === color))
        return generateColors(count)
    return colors;
};

const SpinWheel = () => {
    const prizes = ['1$', '50$', 'NOTHING', '100$', '5$', 'JACKPOT', '8', '9', '10', '0', 'ZERO', 'TRY AGAIN', 'Wai Wai', 'Happy Happy', 'Good day'];
    const [bgcolors] = useState(generateColors(prizes.length));
    const [angle, setAngle] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [win, setWin] = useState(null);
    const [winMessage, setWinMessage] = useState("");

    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWin(null);
        setWinMessage("");

        const newAngle = angle + 360 * 5 + Math.floor(Math.random() * 360);
        setAngle(newAngle);

        setTimeout(() => {
            const selectedIndex = calculateWinner(newAngle);
            setWin(prizes[selectedIndex]);
            if (prizes[selectedIndex] === 'NOTHING')
                setWinMessage(`Oops! you won ${prizes[selectedIndex]}`);
            else
                setWinMessage(`Hurrah! you won ${prizes[selectedIndex]}`);
            setIsSpinning(false);
        }, 5000);
    };

    const calculateWinner = (finalAngle) => {
        const normalizedAngle = finalAngle % 360;
        const segmentAngle = 360 / prizes.length;
        const winningIndex = Math.floor((360 - normalizedAngle) / segmentAngle);
        return winningIndex;
    };

    return (
        <>
            <div className='container'>
                <div className="tag">Spinning Wheel Game</div>
                <div className="spin-wheel-container">
                    <div className='pointer'></div>
                    <div
                        className="wheel"
                        style={{
                            transform: `rotate(${angle}deg)`,
                            background: `repeating-conic-gradient(
                                from 0deg,
                                ${prizes.map((el, i) => `${bgcolors[i]} ${(100 / prizes.length) * i}deg calc(3.6deg * ${(i + 1) * (100 / prizes.length)})`).join(", ")}
                            )`
                        }}
                    >
                        {prizes.map((prize, index) => (
                            <div className="segment" key={index} style={{
                                transform: `rotate(${(index) * (360 / prizes.length)}deg)`
                            }}>
                                <p style={{ transform: "rotate(306deg) translateX(-40px)", paddingRight: "0px" }}>{prize}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={spin} disabled={isSpinning}>
                    {isSpinning ? 'Spinning...' : 'Spin'}
                </button>
                <div className="win">
                    {win ? winMessage : "Please Spin to win the prize."}
                </div>
            </div>
        </>
    );
};

export default SpinWheel;
