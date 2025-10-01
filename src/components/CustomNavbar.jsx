import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Nav.css';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = function (props) {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={props.tema}
        data-bs-theme={props.tema}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="/NetflixLogo.jpg" width={150} alt="Netflix Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
            <div className="d-flex justify-content-between w-100">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="text-white fw-bold">
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/TvShows"
                  className="text-white fw-bold"
                >
                  TV Shows
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/SearchPage"
                  className="text-white fw-bold"
                >
                  Search
                </Nav.Link>
              </Nav>

              <Nav className="d-flex align-items-center">
                <Nav.Link
                  as={Link}
                  to="/user-profile"
                  className="text-white fw-bold"
                >
                  Profilo
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/settings"
                  className="text-white fw-bold"
                >
                  Settings
                </Nav.Link>

                <Nav.Link
                  href="#"
                  className="text-white"
                  as={Link}
                  to="/SearchPage"
                >
                  <i className="bi bi-search"></i>
                </Nav.Link>
                <Nav.Link href="#" className="text-white fw-bold">
                  KIDS
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  <i className="bi bi-bell"></i>
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  <i className="bi bi-person-circle"></i>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-between text-white bg-black p-3">
        <div className="d-flex align-items-center">
          <Nav.Link as={Link} to="/TvShows">
            <h2 className="mb-0 ps-4">TV Shows</h2>
          </Nav.Link>
          <Dropdown className="ms-4 mt-1">
            <Dropdown.Toggle
              variant="secondary"
              size="sm"
              className="rounded-0"
              style={{ backgroundColor: '#221f1f', border: 'none' }}
            >
              Genres
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Item href="#">Comedy</Dropdown.Item>
              <Dropdown.Item href="#">Drama</Dropdown.Item>
              <Dropdown.Item href="#">Thriller</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <i className="bi bi-grid icons me-2 px-1"></i>
          <i className="bi bi-grid-3x3 icons px-1"></i>
        </div>
      </div>
    </>
  );
};

export default CustomNavbar;
