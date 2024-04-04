import {useState, useEffect} from 'react';
import Board from './Board';
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import Scoreboard from './Scoreboard';

const Player_X = "X";
const Player_O = "O";

const winningCombinations = [
    // Horizontal
    {combo:[0, 1, 2], strikeClass: "strike-row-1"},
    {combo:[3, 4, 5], strikeClass: "strike-row-2"},
    {combo:[6, 7, 8], strikeClass: "strike-row-3"},

    // Vertical
    {combo:[0, 3, 6], strikeClass: "strike-column-1"},
    {combo:[1, 4, 7], strikeClass: "strike-column-2"},
    {combo:[2, 5, 8], strikeClass: "strike-column-3"},

    // Diagonal
    {combo:[0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo:[2, 4, 6], strikeClass: "strike-diagonal-2"}
]


function checkWinner(tiles, setStrikeClass, setGameState, playerXScore, setPlayerXScore, playerOScore, setPlayerOScore) {

    // Display the winner if a combo has a match
    for (const {combo, strikeClass} of winningCombinations) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass);
            if (tileValue1 === Player_X) {
                setGameState(GameState.playerXWins);
                setPlayerXScore(playerXScore += 1); // Updates the score of Player X
            }
            else {
                setGameState(GameState.playerOWins);
                setPlayerOScore(playerOScore += 1) // Updates the score of Player O
            }
            return;
        }
    }

    // Display draw if the the tiles are all filled without having a match
    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    if (areAllTilesFilledIn) {
        setGameState(GameState.draw);
    }
}

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(Player_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [playerXScore, setPlayerXScore] = useState(0);
    const [playerOScore, setPlayerOScore] = useState(0);

    const handleTileClick = (index) => {
        // Prevents the tile to be marked if a player already wins
        if (gameState !== GameState.inProgress) {
            return;
        }

        // Prevents the mark on the tile to be changed if it already has a mark
        if (tiles[index] !== null) {
            return;
        }

        // Places the current player's turn inside the board when a tile is clicked
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if (playerTurn === Player_X) {
            setPlayerTurn(Player_O);
        }
        else {
            setPlayerTurn(Player_X);
        }
    };

    // Resets everything when Play Again button is clicked
    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(Player_X);
        setStrikeClass(null);
    }

    // Every time the tiles change, it is going to call the checkWinner function
    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState, playerXScore, setPlayerXScore, playerOScore, setPlayerOScore);
    }, [tiles]);

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Scoreboard playerXScore={playerXScore} playerOScore={playerOScore} />
      <Board 
        playerTurn={playerTurn} 
        tiles={tiles} 
        onTileClick={handleTileClick} 
        strikeClass={strikeClass}
      />

      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  )
}

export default TicTacToe
