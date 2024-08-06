import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzJjOGJjMzFkM2U2OTUyMGI4ZjU5ODc4YmZmNzAxZCIsIm5iZiI6MTcyMjkzNTk0MS4zNjIzODEsInN1YiI6IjY2YjFlOTczMjE0MmMzNzhjNjM1OGE5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0ZtQuA_tShg3YgTuzAEhb48N2sdkHO-VGsPUWGEW7w'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setApiData(data.results))
      .catch(err => console.error(err));

    const ref = cardsRef.current;
    ref.addEventListener('wheel', handleWheel);
    return () => {
      ref.removeEventListener('wheel', handleWheel);
    };
  }, [category]); // Only category is needed here

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string
};

export default TitleCards;
