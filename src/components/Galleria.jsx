import { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FilmGallery = ({ title, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getSlidesPerView = () => {
    if (windowWidth < 576) return 1;
    if (windowWidth < 992) return 3;
    return 5;
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSlidesPerView(getSlidesPerView());
  }, [windowWidth]);

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
        } else {
          setError('Nessun film trovato.');
          setMovies([]);
        }
      } catch {
        setError('Errore durante il recupero dei dati.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const slides = [];
  for (let i = 0; i < movies.length; i += slidesPerView) {
    slides.push(movies.slice(i, i + slidesPerView));
  }

  const handleClick = (movieID) => {
    setSelectedMovie(selectedMovie === movieID ? null : movieID);
  };

  return (
    <div className="film-gallery">
      <h3 className="text-white">{title}</h3>
      <Container fluid style={{ padding: 0 }}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Carousel
              activeIndex={activeMovieIndex}
              onSelect={(selectedIndex) => setActiveMovieIndex(selectedIndex)}
              interval={null}
              key={slidesPerView}
            >
              {slides.map((group, index) => (
                <Carousel.Item key={index} className="bg-black text-white">
                  <Row className="d-flex justify-content-center">
                    {group.map((movie) => (
                      <Col key={movie.imdbID} xs={12} sm={4} md={4} lg={2}>
                        <div
                          className="carousel-item-wrapper position-relative"
                          onClick={() => handleClick(movie.imdbID)}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <Link to={`/movie/${movie.imdbID}`}>
                            <img
                              className="d-block w-100 img-fluid"
                              src={
                                movie.Poster !== 'N/A'
                                  ? movie.Poster
                                  : 'https://via.placeholder.com/300x450?text=Nessuna+Immagine'
                              }
                              alt={movie.Title}
                              style={{
                                maxHeight: '300px',
                                minHeight: '200px',
                                maxWidth: '300px',
                                minWidth: '200px',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out',
                              }}
                            />
                          </Link>

                          <div
                            className={`carousel-item-text position-absolute w-100 text-center p-3 text-white ${
                              selectedMovie === movie.imdbID
                                ? 'd-block'
                                : 'd-none'
                            }`}
                            style={{
                              bottom: 0,
                              left: 0,
                              backgroundColor: 'rgba(0,0,0,0.7)',
                            }}
                          >
                            <h5>{movie.Title}</h5>
                            <p>{movie.Year}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilmGallery;
