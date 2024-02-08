import { useState } from "react";
import "./App.css";

import CardList from "./components/CardList";

function App() {
  const [intro, setIntro] = useState(true);
  const [levelBtn, setLevelBtn] = useState(["Easy", "8"]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [reset, setReset] = useState(false);

  const levels = [
    ["Easy", 8],
    ["Medium", 12],
    ["Hard", 16],
    ["Expert", 20],
  ];

  const levelButtons = levels.map((pair) => (
    <button
      key={pair[0]}
      className={pair[0] === levelBtn[0] ? "active" : ""}
      onClick={() => setLevelBtn(pair)}
    >
      {pair[0]}
    </button>
  ));

  const handleChangeScore = (clicked) => {
    if (clicked) {
      setScore(0);
      setReset(true);
    } else {
      setScore((prevScore) => prevScore + 1);
      bestScore <= score ? setBestScore((prevScore) => prevScore + 1) : null;
    }
  };

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
      </header>
      <div className="bg-image">
        {intro ? (
          <div className="intro">
            <h2>Welcome to our Pokemon game!</h2>
            <p>
              The rules are simple!
              <br />
              Click on images to score points, but here&apos;s the twist -
              don&apos;t get click-happy and click on the same image more than
              once! It&apos;s all fun and games until you double-click!
            </p>
            <hr />
            <strong>Please choose your level:</strong>
            <div className="level-btns">{levelButtons}</div>
            <button className="start-btn" onClick={() => setIntro(false)}>
              Start Game
            </button>
          </div>
        ) : (
          <div className="game-ui">
            <div className="score">
              <strong>Current Score: {score}</strong>
              <hr />
              <strong>Best Score: {bestScore}</strong>
            </div>
            <CardList
              num={levelBtn[1]}
              handleChangeScore={handleChangeScore}
              reset={reset}
              onReset={() => setReset(false)}
            />
            <button className="reset-btn" onClick={() => setIntro(true)}>
              Reset Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
