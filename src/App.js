import React, { useEffect, useState } from 'react'

const Square = ({value, onSquareClick})=>{
  return(
    <button className="h-10 w-10 mr-1 bg-white text-2xl text-slate-950 " onClick={onSquareClick} >{value}</button>  
  )
}

export default function App() {

  const [isXNext, setIsXNext] = useState(true)
  const [square, setSquare] = useState(Array(9).fill(null))
  const [hasPlayed, setHasPlayed] = useState(false)
  const [error, setError] = useState("")
  const [showButton, setShowButton] = useState(false)

  
 
  // Gets triggered after each square click
  const handleClick =(i)=>{
  //Checks if a box is occupied 
      if (square[i]){
        setHasPlayed(hasPlayed)
        console.log("Played")
        setError("Box occupied, play elsewhere")
        return hasPlayed
      } else if(!square[i]){
        setHasPlayed(!hasPlayed)
        setError('')
      }
//Checks if a box is occupied or if there's a winner already
    if(square[i] || calculateWinner(square)){
      return ;
    }
//Check for the next player
    const nextSquare = square.slice()
    if(isXNext){
      nextSquare[i] ='X'
    }
    else{
      nextSquare[i] = 'O'
    }

    setSquare(nextSquare)
    setIsXNext(!isXNext)
    console.log(nextSquare)
  }

 
//Check and shows the winner of the game
  let status
  let player;
  const winner = calculateWinner(square)
  if (winner){
    status = "The Winner is player '" + winner + "' 😊" + ". Great job!👍";
    console.log("Winner is: ", winner)
    
  }

  //Checks for the next player
  if(!winner && isXNext){
    player ="Player 'X' is next"
  }else if(!winner && !isXNext){
    player ="Player 'O' is next"
  }else{
    player ="Game Over !"
  }

  //Checks if there's no winner
let tie;
  if(!winner && !square.includes(null)){
    player = "Game Over !"
    tie= "No winner 😔, try again."
    status =tie
  }

//Handles the page reload to play again
  const handleRefresh =()=>{
    window.location.reload()
  }

  //Checks and render the "Try Again" button if there's Game Over in the player variable
  useEffect(()=>{
    if(player === "Game Over !"){
      setShowButton(true)
    }
  },[player])

  return (
    <div className=" flex bg-slate-500 h-screen">
      <div className=' flex flex-col items-center m-auto bg-slate-600 h-2/3 w-2/4 rounded-lg sm: h-2/3 w-2/3'>
        <h1 className=" p-3 text-center text-slate-50 font-bold text-2xl">TIC TAC TOE GAME</h1> 
        <div className='flex-col'>
          <div className='flex m-1'>
              <Square value={square[0]} onSquareClick={()=>handleClick(0)}/>
              <Square value={square[1]} onSquareClick={()=>handleClick(1)}/>
              <Square value={square[2]} onSquareClick={()=>handleClick(2)}/>
            </div>
            <div className='flex m-1'>
              <Square value={square[3]} onSquareClick={()=>handleClick(3)}/>
              <Square value={square[4]} onSquareClick={()=>handleClick(4)}/>
              <Square value={square[5]} onSquareClick={()=>handleClick(5)}/>
            </div>
            <div className='flex m-1 '>
              <Square value={square[6]} onSquareClick={()=>handleClick(6)}/>
              <Square value={square[7]} onSquareClick={()=>handleClick(7)}/>
              <Square value={square[8]} onSquareClick={()=>handleClick(8)}/>
            </div>
            
        </div>
        <p className={`${player==="Game Over !" ?  ' text-red-500 font-bold': 'text-white'} `}>{player}</p>
        <h1 className={`${status===tie ? "text-yellow-400" : "text-slate-50 font-serif mt-5"}`}>{status} </h1>
        <p className='  error-text'>{error}</p>
        {showButton && <button onClick={handleRefresh} className=' bg-slate-800 text-white rounded px-4 py-1 mt-3'>Play Again</button>}
      </div>
      
      
    </div>
  )
}

//Function to check for a winner in the game
const calculateWinner = (square) =>{
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for(let i=0; i < lines.length; i++){
    const [a, b, c] = lines[i]
    if(square[a] && square[a] === square[b] && square[a] === square[c]){
      console.log(lines[i])
      return (square[a])
    }
  }
  return null;
}
