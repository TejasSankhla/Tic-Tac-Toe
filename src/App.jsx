import { useEffect, useState } from "react";

import "./App.css";
function App() {
  const [boardHistory, setboardHistory] = useState([]);
  const [board, setboard] = useState(Array(9).fill(null));
  const [XisNext, setXisNext] = useState(true);
  const [history, sethistory] = useState([]);
  const [status, setstatus] = useState("");
  const [currentMove, setcurrentMove] = useState(0);
  function handleClick(index) {
    if (calculateWinner(board) || board[index]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = XisNext ? "X" : "O";
    setboard(newBoard);
    setXisNext(!XisNext);

    const currentStatus = calculateWinner(newBoard)
      ? `Winner: ${calculateWinner(newBoard)}`
      : `Next player: ${XisNext ? "X" : "O"}`;
    setstatus(currentStatus);
    setcurrentMove(currentMove + 1);
  }
  useEffect(() => {
    setboardHistory([...boardHistory, board]);
  }, [board]);
  useEffect(() => {
    sethistory([...history, status]);
  }, [status]);

  function reset() {
    setboard(Array(9).fill(null));
    setXisNext(true);
    setstatus("");
    sethistory([]);
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  // const winner = calculateWinner(board);

  return (
    <div className=" flex items-center justify-center w-full h-screen max-h-screen flex-col">
      <div className="m-4  flex items-start justify-center w-full ">
        <div className="font-bold text-2xl  ">Tic Tac Toe</div>
      </div>
      <div className=" grid grid-cols-3 m-4 w-80 h-80">
        {board.map((cell, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className=" flex h-full 
               w-full items-center outline justify-center text-lg bg-gray-100 "
            >
              {cell}
            </div>
          );
        })}
      </div>
      <div className="status flex flex-col items-center justify-center w-full">
        {history.map((status, index) => {
          return (
            <div key={index} className="text-center">
              {status}
            </div>
          );
        })}
      </div>
      {currentMove === 9 && <div className="text-center">Tie</div>}
      <button
        onClick={reset}
        className=" text-lg bg-red-500 p-2 text-white rounded-lg"
      >
        Reset
      </button>
    </div>
  );
}

export default App;

// 1 Game session -> Game history->History Array(state)
// ,  Result-> winner/tie/
