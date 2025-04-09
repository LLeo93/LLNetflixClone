import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Funzione per ottenere la data formattata in italiano
function getFormattedDate() {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Date().toLocaleString('it-IT', options);
}

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getFormattedDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row">
              <div className="col mb-2">
                <i className="bi bi-facebook footer-icon me-2"></i>
                <i className="bi bi-instagram footer-icon me-2"></i>
                <i className="bi bi-twitter-x footer-icon me-2"></i>
                <i className="bi bi-youtube footer-icon"></i>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              {[
                [
                  'Audio and Subtitles',
                  'Media Center',
                  'Privacy',
                  'Contact us',
                ],
                ['Audio Description', 'Investor Relations', 'Legal Notices'],
                ['Help Center', 'Jobs', 'Cookie Preferences'],
                ['Gift Cards', 'Terms of Use', 'Corporate Information'],
              ].map((column, index) => (
                <div className="col" key={index}>
                  <div className="footer-links">
                    {column.map((link, i) => (
                      <p key={i}>
                        <a href="#" className="text-light text-decoration-none">
                          {link}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col mb-2">
                <button
                  type="button"
                  className="btn btn-sm footer-button rounded-0 mt-3"
                >
                  Service Code
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col mb-2 mt-2 copyright text-center">
                © 1997-{new Date().getFullYear()} Netflix, Inc.
              </div>
            </div>

            <div className="row">
              <div className="col text-center">
                <small>{currentDate}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
