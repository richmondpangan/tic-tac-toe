import React from 'react'

function Scoreboard({playerXScore, playerOScore}) {
  return (
    <div className='scoreboard'>
      <h3>Player X: {playerXScore}</h3>
      <h3>Player O: {playerOScore}</h3>
    </div>
  )
}

export default Scoreboard
