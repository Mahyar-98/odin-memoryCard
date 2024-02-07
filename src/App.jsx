import { useState, useEffect } from "react";
import "./App.css";

import PropTypes from 'prop-types'

function Card({ id }) {
  const [cardData, setCardData] = useState({
    id: "",
    name: "",
    artworkUrl: "",
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCardData({
          id: id,
          name: data.name,
          artworkUrl: data.sprites.other["official-artwork"].front_default,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
  <div>
    <img src={cardData.artworkUrl} alt={`Pokemon: ${cardData.name}`} />
    <br />
    <strong>{cardData.name}</strong>
  </div>)
}
Card.propTypes = {
  id: PropTypes.string.isRequired,
};

function CardList({ num }) {
  const getId = () => (Math.floor(Math.random() * 1025) + 1).toString();
  const idList = [];
  for (let i = 0; i < num; i++) {
    idList.push(getId());
  }
  return (
    <>
      {idList.map((id) => (
        <Card key={id} id={id} />
      ))}
    </>
  );
}
CardList.propTypes = {
  num: PropTypes.number.isRequired,
};

function App() {
  return <CardList num={4} />;
}

export default App;
