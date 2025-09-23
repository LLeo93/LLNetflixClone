import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TvShows = ({ title, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (import.meta.env.VITE_OMDB_API_KEY) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }&s=${encodeURIComponent(searchTerm)}`
          );
          data = await res.json();
        } else {
          const res = await fetch(
            `/api/omdb?s=${encodeURIComponent(searchTerm)}`
          );
          data = await res.json();
        }

        if (data.Response === 'True') {
          setMovies(data.Search);
          setSelectedMovie(data.Search[0]);
        } else {
          setError('Nessun film trovato.');
          setMovies([]);
          setSelectedMovie(null);
        }
      } catch {
        setError('Errore durante il recupero dei dati.');
        setMovies([]);
        setSelectedMovie(null);
      } finally {
        setLoading(false);
      }
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
                className="flex-fill text-white"
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
