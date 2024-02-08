import { useState } from "react";
import "./App.css";

import CardList from "./components/CardList";

function App() {
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);

  const handleChangeScore = (clicked) => {
    if (clicked) {
      setScore(0);
      setReset(true);
    } else {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <>
      <header>
        <h1>Pokemon Card Game</h1>
      </header>
      <div className="bg-image">
        <div className="game-ui">
          <div className="score">
            <strong>Score: {score}</strong>
          </div>
          <CardList
            num={12}
            handleChangeScore={handleChangeScore}
            reset={reset}
            onReset={() => setReset(false)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
