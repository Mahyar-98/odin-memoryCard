import { useState, useEffect } from "react";
import "./App.css";

import PropTypes from "prop-types";

function Card({ id, handleChangeScore, shuffleCards }) {
  const [cardData, setCardData] = useState({
    id: "",
    name: "",
    artworkUrl: "",
    clicked: false,
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCardData({
          id: id,
          name: data.name,
          artworkUrl: data.sprites.other["official-artwork"].front_default,
          clicked: false,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleCardClick = () => {
    handleChangeScore(cardData.clicked);
    shuffleCards();
    setCardData((prevCardData) => ({
      ...prevCardData,
      clicked: !prevCardData.clicked,
    }));
  };

  return (
    <div onClick={handleCardClick}>
      <img src={cardData.artworkUrl} alt={`Pokemon: ${cardData.name}`} />
      <br />
      <strong>{cardData.name + " " + cardData.clicked}</strong>
    </div>
  );
}
Card.propTypes = {
  id: PropTypes.string.isRequired,
  handleChangeScore: PropTypes.func.isRequired,
  shuffleCards: PropTypes.func.isRequired,
};

function CardList({ num, handleChangeScore, reset, onReset }) {
  const [idList, setIdList] = useState([]);

  const getId = () => (Math.floor(Math.random() * 1025) + 1).toString();

  const generateIds = () => {
    const newIdList = [];
    for (let i = 0; i < num; i++) {
      newIdList.push(getId());
    }
    setIdList(newIdList);
  };

  const shuffleCards = () => {
    setIdList((prevIdList) => {
      const shuffledIds = [...prevIdList];
      shuffledIds.sort(() => Math.random() - 0.5);
      return shuffledIds;
    });
  };

  useEffect(() => {
    generateIds();
  }, []);

  useEffect(() => {
    if (reset) {
      generateIds();
      onReset();
    }
  }, [reset]);

  const cardList = idList.map((id) => (
    <Card
      key={id}
      id={id}
      handleChangeScore={handleChangeScore}
      shuffleCards={shuffleCards}
    />
  ));

  return <>{cardList}</>;
}
CardList.propTypes = {
  num: PropTypes.number.isRequired,
  handleChangeScore: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

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
      <h1>Score: {score}</h1>
      <CardList
        num={4}
        handleChangeScore={handleChangeScore}
        reset={reset}
        onReset={() => setReset(false)}
      />
    </>
  );
}

export default App;
