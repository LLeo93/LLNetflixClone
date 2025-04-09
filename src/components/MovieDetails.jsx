import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';

const MovieDetails = () => {
  // Usa useParams() per ottenere il parametro "imdbID" dalla URL
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dei dettagli del film
    fetch(`http://www.omdbapi.com/?apikey=73815f65&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Aggiungi il log per debuggare la risposta

        if (data.Response === 'True') {
          setMovie(data);
          setError(null);
        } else {
          setError('Film non trovato.');
        }
      })
      .catch(() => setError('Errore durante la richiesta'))
      .finally(() => setLoading(false));
  }, [imdbID]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!movie) return null;

  return (
    <Row className="m-auto mt-4 justify-content-center">
      <Col md={6} className="mb-4">
        <Card className="d-flex flex-row" style={{ maxWidth: '600px' }}>
          <Card.Img
            variant="top"
            src={movie.Poster}
            style={{ maxWidth: '200px', height: 'auto' }}
          />
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Plot}</Card.Text>
            <Card.Text>
              <strong>Anno:</strong> {movie.Year} <br />
              <strong>Genere:</strong> {movie.Genre} <br />
              <strong>Attori:</strong> {movie.Actors} <br />
              <strong>Regista:</strong> {movie.Director} <br />
              <strong>Scritto da:</strong> {movie.Writer} <br />
              <strong>Lingua:</strong> {movie.Language} <br />
              <strong>Paese:</strong> {movie.Country} <br />
              <strong>Premi:</strong> {movie.Awards} <br />
              <strong>Valutazione IMDb:</strong> {movie.imdbRating} <br />
              <strong>Durata:</strong> {movie.Runtime} <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MovieDetails;
