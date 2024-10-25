import React, { useRef, useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleref = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num]) {
            return;
        }

        const newData = [...data];
        const currentPlayer = count % 2 === 0 ? "x" : "o";
        newData[num] = currentPlayer;
        setData(newData);
        setCount(count + 1);

        checkWin(newData, currentPlayer);
    };

    const checkWin = (newData, player) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let combo of winningCombinations) {
            if (newData[combo[0]] === player && newData[combo[1]] === player && newData[combo[2]] === player) {
                won(player);
                return;
            }
        }

        // Check for draw
        if (newData.every(cell => cell) && count === 8) {
            setLock(true);
            titleref.current.innerHTML = `DRAW`;
        }
    };

    const won = (winner) => {
        setLock(true);
        const winnerImage = winner === "x" ? cross_icon : circle_icon;
        titleref.current.innerHTML = `Congratulations <img src='${winnerImage}' alt='Winner' />`;
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleref.current.innerHTML = "Tic <span>Tac</span> Toe";
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleref}>Tic <span>Tac</span> Toe</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}>{data[0] === "x" ? <img src={cross_icon} alt="X" /> : data[0] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}>{data[1] === "x" ? <img src={cross_icon} alt="X" /> : data[1] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}>{data[2] === "x" ? <img src={cross_icon} alt="X" /> : data[2] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}>{data[3] === "x" ? <img src={cross_icon} alt="X" /> : data[3] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}>{data[4] === "x" ? <img src={cross_icon} alt="X" /> : data[4] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}>{data[5] === "x" ? <img src={cross_icon} alt="X" /> : data[5] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}>{data[6] === "x" ? <img src={cross_icon} alt="X" /> : data[6] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}>{data[7] === "x" ? <img src={cross_icon} alt="X" /> : data[7] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}>{data[8] === "x" ? <img src={cross_icon} alt="X" /> : data[8] === "o" ? <img src={circle_icon} alt="O" /> : null}</div>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
}

export default TicTacToe;