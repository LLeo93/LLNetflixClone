import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';

const Settings = () => {
  return (
    <Container fluid className="bg-dark text-white ">
      <Tab.Container id="settings-tabs" defaultActiveKey="profile">
        <Row>
          <Col xs={12} md={3} className="bg-black p-4">
            <h2>Impostazioni Account</h2>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile" className="text-white">
                  Profilo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="plan" className="text-white">
                  Piano
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notifications" className="text-white">
                  Notifiche
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="privacy" className="text-white">
                  Privacy
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="security" className="text-white">
                  Sicurezza
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xs={12} md={9} className="p-4 bg-secondary">
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <h3>Impostazioni del profilo</h3>
                <p>Modifica il tuo profilo.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="plan">
                <h3>Piano</h3>
                <p>Acquista il tuo piano</p>
              </Tab.Pane>
              <Tab.Pane eventKey="notifications">
                <h3>Impostazioni notifiche</h3>
                <p>Scegli le tue preferenze</p>
              </Tab.Pane>
              <Tab.Pane eventKey="privacy">
                <h3>Impostazioni privacy</h3>
                <p>Scegli le tue impostazioni per la privacy</p>
              </Tab.Pane>
              <Tab.Pane eventKey="security">
                <h3>Impostazioni di sicurezza</h3>
                <p>Scegli le tue impostazioni per la tua sicurezza</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Settings;
