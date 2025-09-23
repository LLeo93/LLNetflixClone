import { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [activeKey, setActiveKey] = useState('profile');

  return (
    <Container fluid className="bg-dark text-white">
      <Row>
        <Col xs={12} md={3} className="bg-black p-4">
          <h2>Il tuo Profilo</h2>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                eventKey="profile"
                className="text-white"
                onClick={() => setActiveKey('profile')}
              >
                Profilo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="plan"
                className="text-white"
                onClick={() => setActiveKey('plan')}
              >
                Piano
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="preferences"
                className="text-white"
                onClick={() => setActiveKey('preferences')}
              >
                Preferenze
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="password"
                className="text-white"
                onClick={() => setActiveKey('password')}
              >
                Modifica Password
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col xs={12} md={9} className="p-4 bg-secondary">
          <Tab.Container id="profile-tabs" activeKey={activeKey}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <h3>Dettagli del Profilo</h3>
                <p>Nome: Pippo</p>
                <p>Email: Pippo@Franco.com</p>
                <p>Data di registrazione: 17/11/2001</p>
              </Tab.Pane>

              <Tab.Pane eventKey="plan">
                <h3>Piano di Abbonamento</h3>
                <p>Abbonamento: Premium</p>
                <Button variant="primary">Modifica Piano</Button>
              </Tab.Pane>

              <Tab.Pane eventKey="preferences">
                <h3>Preferenze</h3>
                <Form>
                  <Form.Check
                    type="checkbox"
                    label="Ricevi notifiche via email"
                    className="text-white"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Attiva notifiche push"
                    className="text-white"
                  />
                  <Button variant="primary" className="mt-3">
                    Salva Preferenze
                  </Button>
                </Form>
              </Tab.Pane>

              <Tab.Pane eventKey="password">
                <h3>Modifica Password</h3>
                <Form>
                  <Form.Group>
                    <Form.Label className="text-white">
                      Nuova Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci nuova password"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-white">
                      Conferma Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Conferma nuova password"
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-3">
                    Cambia Password
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
