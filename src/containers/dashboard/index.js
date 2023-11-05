import React, { useState, useRef, useEffect } from "react";
import Dice from "../../components/dicecomp/dice";
import DiceBet from "../../components/dicecomp/betBtn";
import DiceRoller from "../../components/dicecomp/diceRoller";
import Counter from "../../components/dicecomp/counter";
import "./styles.css";

function Dashboard() {
  const [balance, updateBalance] = useState(100);
  const [showdice, setShowdice] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [shouldResetGame, setShouldResetGame] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0]);
  const [totalPlay, setTotalPlay] = useState(0);
  const [wins, setWins] = useState(0);
  const [lost, setLost] = useState(0);
  const [rolledValue, setRolledValue] = useState(0);

  const setGame = (isReset) => {
    setShowdice(false);
    setStartGame(false);
    setBets([0, 0, 0, 0, 0, 0]);
    setShowScore(false);
    if (isReset) {
      setScore(0);
      updateBalance(100);
      setShouldResetGame(false);
      setTotalPlay(0);
      setWins(0);
      setLost(0);
    }
  };
  useEffect(() => {
    if (balance < 0) {
      setShouldResetGame(true);
    }
  }, [balance]);

  const onSetBet = (i) => {
    if (!startGame || showdice || shouldResetGame) {
      return;
    }
    setBets((bets) => bets.map((bet, betId) => (i === betId ? bet + 1 : bet)));
  };

  const onRollerStop = (num) => {
    const _score = bets.reduce((acc, bet, i) => {
      if (i === num - 1) {
        acc = acc + 2 * bet;
      } else {
        acc = acc - bet;
      }
      return acc;
    }, 0);
    setRolledValue(num);
    setShowScore(true);
    setScore(_score);
    setShowdice(false);
    updateBalance((balance) => balance + _score);
    if (_score !== 0) {
      setTotalPlay((totalPlay) => totalPlay + 1);
      if (_score > 0) {
        setWins((wins) => wins + 1);
      } else {
        setLost((lost) => lost + 1);
      }
    }
    setTimeout(() => {
      setGame();
    }, 5000);
  };

  const onStartGame = () => {
    setStartGame(true);
  };
  const onCounterEnd = () => {
    setShowdice(true);
    setStartGame(false);
  };
  const isAtleastOneBet = () => {
    let filtered = bets.filter((data) => data > 0);
    return filtered?.length;
  };
  const won = score >= 0;
  return (
    <div className="board-container">
      <div className="board">
        <div className="score-board">
          <div className="attempts balance">
            <h2 className="total-no">Balance: {balance}</h2>
            <h2 className="total-no">Last Score: {score}</h2>
          </div>
          <h2> &#128512;Dice Game ! Happy Gaming &#128512;</h2>
          <div className="attempts">
            <h2 className="total-no">Total Attempts: {totalPlay}</h2>
            <h2 className="total-no">Wins: {wins}</h2>
            <h2 className="total-no">Lost: {lost}</h2>
          </div>
        </div>
        <div className="board-wrapper">
          <div className="play-board">
            {shouldResetGame && (
              <div className="reset-header">
                Insufficient funds. Please reset.{" "}
              </div>
            )}
            {showScore && <Dice face={rolledValue} />}
            {startGame && !showdice && (
              <div className="game-caution">
                {" "}
                Hurry Up! Select dice to make a bet
              </div>
            )}
            {!showScore && !showdice && !shouldResetGame && (
              <Counter startTimer={startGame} onTimerEnd={onCounterEnd} />
            )}
            {showdice && (
              <div>
                <DiceRoller onRollerStop={onRollerStop} />
              </div>
            )}
            {!showScore && !startGame && !showdice && !shouldResetGame && (
              <button
                className="start-game"
                onClick={() => {
                  onStartGame();
                }}
              >
                Start Game
              </button>
            )}
            {shouldResetGame && (
              <button
                className="reset-game"
                onClick={() => {
                  setGame(true);
                }}
              >
                Reset Game
              </button>
            )}
          </div>
          <div className="info-section">
            <div>
              <h2>Information</h2>
              <ul>
                {(startGame || showdice) &&
                  isAtleastOneBet() != 0 &&
                  bets.map((data, i) => {
                    if (!data) {
                      return null;
                    }
                    return (
                      <li>
                        Bet on {i + 1} : {data}$
                      </li>
                    );
                  })}
                {(startGame || showdice) && isAtleastOneBet() === 0 && (
                  <div className="game-caution"> Please make a bet</div>
                )}
                {!showScore && !startGame && !showdice && !shouldResetGame && (
                  <>
                    <li>
                      Click on Start Game buttom. A timer will show. The user is
                      given 10 seconds to make his moves.
                    </li>
                    <li>
                      The user can click on each bet position. Each click will
                      increment the bet by $1.
                    </li>
                    <li>
                      After 10 seconds, all positions will got disabled. No more
                      bets allowed.
                    </li>
                    <li>
                      After 2 seconds,we will show the result and update the
                      balance amount.
                    </li>
                    <li>Repeat the game again.</li>
                  </>
                )}
              </ul>
              {showScore && (
                <div className={`score-card ${won ? "won" : "lost"}`}>
                  {`You ${won ? "won" : "lost"} ${Math.abs(score)}$`}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="dice-board">
          <div className="dice-row">
            {bets?.map((bet, index) => {
              return <Dice face={index + 1} />;
            })}
          </div>
          <div className="bet-row">
            {bets.map((bet, id) => (
              <DiceBet
                bet={bet}
                isDisabled={!startGame || showdice || shouldResetGame}
                setBet={() => onSetBet(id)}
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
