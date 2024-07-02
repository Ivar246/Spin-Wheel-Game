// src/components/SpinWheel.js
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
    const [angle, setAngle] = useState(0);

    // isSpinning state for disabling spin button while spinning
    const [isSpinning, setIsSpinning] = useState(false);
    const [win, setWin] = useState(null);

    const prizes = ['1$', '50$', 'NOTHING', '100$', '5$', 'JACKPOT', '8', '9', '10', '0', 'ZERO', 'TRY AGAIN', 'Wai Wai', 'Happy Happy', 'Good day']
    // '4', '5', '6', 'JACKPOT', 'NOTHING'
    const [bgcolors] = useState(generateColors(prizes.length));
    console.log({ angle: angle, win })
    const spin = () => {

        if (isSpinning) return;
        setAngle(0)
        setIsSpinning(true);
        setWin(null);

        const newAngle = angle + 360 * 5 + Math.floor(Math.random() * 360);
        setAngle(newAngle);

        setTimeout(() => {
            const winningIndex = calculateWinner(newAngle);
            setWin(prizes[winningIndex])
            setIsSpinning(false);
        }, 5000); // Duration of the spin
    };

    const calculateWinner = (finalAngle) => {
        const normalizedAngle = finalAngle % 360;
        const segmentAngle = 360 / prizes.length;
        const winningIndex = Math.floor((360 - normalizedAngle) / segmentAngle);
        return winningIndex;
    }

    return (
        <>
            <div className='container'>
                <div className="spin-wheel-container">
                    <div className='pointer'></div>
                    <div
                        className="wheel"

                        style={{
                            transform: `rotate(${angle}deg)`,
                            background: `
                    repeating-conic-gradient(from 0deg,
                        ${prizes.map((el, i) => {

                                return `${bgcolors[i]} ${(100 / prizes.length) * i}deg calc(3.6deg * ${(i + 1) * (100 / prizes.length)})`
                            }).join(", ")})
                    ` }}
                    >
                        {prizes.map((prize, index) => {


                            return (
                                <div className="segment" key={index} style={{
                                    transform: `rotate(${(index) * (360 / prizes.length)}deg)`
                                }}>
                                    <p>{prize}</p>
                                </div>
                            )
                        }
                        )}
                    </div>

                </div >
                <button onClick={spin} disabled={isSpinning}>
                    {isSpinning ? 'Spinning...' : 'Spin'}
                </button>

                <div className="winner">
                    {(win) ? ` Hurrah! You won ${win} ` : "Please try again."}
                </div>
            </div>
        </>

    );
};

export default SpinWheel;
