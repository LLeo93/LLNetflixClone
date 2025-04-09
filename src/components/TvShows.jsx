import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TvShows = function ({ title, searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = () => {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=73815f65&s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'True') {
            setMovies(data.Search);
            setSelectedMovie(data.Search[0]); // seleziona il primo film
            setError(null);
          } else {
            setError('Nessun film trovato.');
            setMovies([]);
            setSelectedMovie(null);
          }
        })
        .catch(() => {
          setError('Errore durante il recupero dei dati.');
          setMovies([]);
          setSelectedMovie(null);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMovies();
  }, [searchTerm]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!selectedMovie) return null;

  return (
    <Card className="m-auto w-25">
      <Card.Img
        style={{ height: 350 }}
        variant="top"
        src={
          selectedMovie.Poster !== 'N/A'
            ? selectedMovie.Poster
            : 'https://via.placeholder.com/300x450?text=Nessuna+Immagine'
        }
      />
      <Card.Body>
        <Card.Title>{selectedMovie.Title}</Card.Title>
        <Card.Text>Anno: {selectedMovie.Year}</Card.Text>
        <Button
          variant="primary"
          href={`https://www.imdb.com/title/${selectedMovie.imdbID}`}
          target="_blank"
        >
          Vedi su IMDb
        </Button>
        <Link to={`/details/${selectedMovie.imdbID}`}>
          <Button variant="warning" className="mx-3">
            Dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default TvShows;
