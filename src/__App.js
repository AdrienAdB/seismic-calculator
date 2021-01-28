import React from 'react';

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ReloadButton from './components/ReloadButton';

const styles = {


}

function Copyright() {
  return (
    <Container mt={2}>
        <a color="primary" href="https://acte.ltd">
          ACTE Services Ltd.
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Container>
  );
}

function OpenSourceProject(){
  return(

    <a target="_blank" color="primary" href="https://github.com/AdrienAdB/seismic-calculator">
      open source project
    </a>
  );
}


export default function App() {

  return (

      <Container fluid>

          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#eta">ETA</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Container>
          <h1>Seismic Calculator</h1>
          <p className="lead">An <OpenSourceProject /> made with ReactJS and Material UI</p>

          <Copyright />
          <ReloadButton />
          </Container>

      </Container>
  );
}
