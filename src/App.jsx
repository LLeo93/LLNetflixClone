import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CustomNavbar from './components/CustomNavbar';
import Footer from './components/Footer';
import FilmGallery from './components/Galleria';
import Settings from './components/Settings';
import UserProfile from './components/Profilo';
import HomeAlert from './components/HomeAlert';
import TvShows from './components/TvShows';
import MovieDetails from './components/MovieDetails';
function App() {
  return (
    <Router>
      <main className="bg-black">
        <CustomNavbar tema="black" />

        <div className="container mt-5">
          <Routes>
            <Route path="/details/:imdbID" element={<MovieDetails />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
            <Route
              path="/TvShows"
              element={
                <TvShows title="Harry Potter" searchTerm="Harry Potter" />
              }
            />

            <Route
              path="/"
              element={
                <>
                  <HomeAlert
                    message="Ciao Stefano! questo alert sparirà tra 20 secondi o al tuo click della x. 
                  la pagina è responsive e ci ho collegato profile page e setting page,
                   i pulsanti dinamici sono home profilo settings le foto e il carosello,
                    in mobile pure i dropdown e il pulsante osceno col bg grigio bruttissimo
                    le opzioni delle altre pagine sono dinamiche e il carosello mostra meno slide 
                    in base ai breakpoints"
                  />
                  <h1 className="text-white my-4">Film In Evidenza</h1>
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery
                      title="Harry Potter"
                      searchTerm="Harry Potter"
                    />
                  </div>
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery
                      title="Lord of the Rings"
                      searchTerm="Lord of the Rings"
                    />
                  </div>
                  <div className="mb-md-3 mb-lg-5 mb-sm-2">
                    <FilmGallery title="Star Wars" searchTerm="Star Wars" />
                  </div>
                </>
              }
            />

            <Route path="/settings" element={<Settings />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
