import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/Card.css";

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
    <div className="card" onClick={handleCardClick}>
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

export default Card;
