import { useState, useEffect } from 'react';
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
            setSelectedMovie(data.Search[0]);
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
    <Row className="m-auto mt-4 justify-content-center">
      <Col xs={10} md={6}>
        <Card className="m-auto">
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
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                href={`https://www.imdb.com/title/${selectedMovie.imdbID}`}
                target="_blank"
                className="flex-fill"
              >
                Vedi su IMDb
              </Button>

              <Button
                as={Link}
                to={`/details/${selectedMovie.imdbID}`}
                variant="warning"
                className="flex-fill, text-white"
              >
                Dettagli
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TvShows;
