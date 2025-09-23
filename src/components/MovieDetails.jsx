import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';

const MovieDetails = () => {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (import.meta.env.VITE_OMDB_API_KEY) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }&i=${imdbID}`
          );
          data = await res.json();
        } else {
          const res = await fetch(`/api/omdb?i=${imdbID}`);
          data = await res.json();
        }

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError('Film non trovato.');
        }
      } catch {
        setError('Errore durante la richiesta.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!movie) return null;

  return (
    <Row className="m-auto mt-4 justify-content-center">
      <Col lg={6} className="mb-4">
        <Card
          className="d-flex flex-column flex-md-row"
          style={{ maxWidth: '600px' }}
        >
          <Card.Img
            variant="top"
            src={
              movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/300x450?text=Nessuna+Immagine'
            }
            className="w-100 w-md-auto"
            style={{ height: 'auto' }}
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
