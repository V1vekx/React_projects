import React, { useState } from 'react'
import './TicTacToe.css'

let data =["","","","","","","","","",]


export const TicTacToe = () => {

    const [data, setData] = useState(Array(9).fill(""));
    let [count,setCount]= useState(0);
    let [lock,setLock]=useState(false);
    let [winner, setWinner] = useState(null);

    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];


    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        let newData = [...data];
        newData[num] = count % 2 === 0 ? 'x' : 'o';

        e.target.innerHTML = count % 2 === 0 ? 'X' : 'O';
        e.target.classList.add(count % 2 === 0 ? 'styleX' : 'styleO');

        setData(newData);
        setCount(count + 1);
        checkWinner(newData);
    }
     
    const checkWinner = (currentData) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                setWinner(currentData[a]);
                setLock(true);
                return;
            }
        }
        if (count === 8 && !winner) {
            setWinner('Draw');
            setLock(true);
        }
        
    }
    const resetGame = () => {
        setData(Array(9).fill("")); // Reset the state with an empty array
    setCount(0);
    setLock(false);
    setWinner(null);
    document.querySelectorAll('.boxes').forEach(box => {
        box.innerHTML = '';
        box.classList.remove('styleX', 'styleO');
        })
    }
  return (
    <div className='container'>
         <h1 className='title'>Tic Tac Toe</h1>
         <div className="board">
            <div className='row1'>
             <div className='boxes' onClick={(e)=>{toggle(e,0)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,1)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,2)}}></div>
            </div>
            <div className='row2'>    
             <div className='boxes' onClick={(e)=>{toggle(e,3)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,4)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,5)}}></div>
            </div>     
            <div className='row3'>
             <div className='boxes' onClick={(e)=>{toggle(e,6)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,7)}}></div>
             <div className='boxes' onClick={(e)=>{toggle(e,8)}}></div>
            </div>          
         </div>
         {winner && <h2 className='winner'>{winner === 'Draw'  ? "Draw !!!" : `${winner} wins!`}</h2>}
        <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  )
}
