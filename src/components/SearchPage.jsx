import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '73815f65';

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMovies([]);

    if (query.trim() === '') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError('Nessun film trovato.');
      }
    } catch (error) {
      setError('Errore durante la ricerca.');
    }
    setLoading(false);
  };

  const handleMovieClick = async (imdbID) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      setError('Errore durante il recupero dei dettagli.');
    }
    setLoading(false);
  };

  return (
    <div
      className="search-page"
      style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
    >
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Logo Netflix"
            style={{ width: '150px' }}
          />
          <button className="btn btn-outline-light">Accedi</button>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <form onSubmit={handleSearch} className="d-flex w-75 w-md-50">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-danger ms-2">
              Cerca
            </button>
          </form>
        </div>

        <div className="search-results mt-5">
          {loading && (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && movies.length === 0 && !error && <p>Cerca Un Film.</p>}

          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {movies.map((movie) => (
              <Col key={movie.imdbID}>
                <Card
                  className="bg-dark text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  <Card.Img
                    variant="top"
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/200'
                    }
                    alt={movie.Title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {selectedMovie && (
          <div className="movie-details mt-5">
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Anno:</strong> {selectedMovie.Year}
            </p>
            <p>
              <strong>Generi:</strong> {selectedMovie.Genre}
            </p>
            <p>
              <strong>Regista:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Trama:</strong> {selectedMovie.Plot}
            </p>
            <img
              src={
                selectedMovie.Poster !== 'N/A'
                  ? selectedMovie.Poster
                  : 'https://via.placeholder.com/300'
              }
              alt={selectedMovie.Title}
              className="img-fluid"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
