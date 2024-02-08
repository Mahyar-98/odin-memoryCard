import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/CardList.css";
import Card from "./Card";

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

  return <div className="card-list">{cardList}</div>;
}
CardList.propTypes = {
  num: PropTypes.number.isRequired,
  handleChangeScore: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CardList;
