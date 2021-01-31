import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import Footer from './components/Footer';

import Welcome from './pages/Welcome';
import Eta from './pages/Eta';
import Turn from './pages/Turn';
import Source from './pages/Source';
import Cfm from './pages/Cfm';


function usePageViews() {

  let location = useLocation();

  useEffect(() => {

    /* Analytics */
    try {

      window._paq.push(['setCustomUrl', location.pathname+location.search]);
      window._paq.push(['deleteCustomVariables', 'page']);
      setTimeout(function(){ window._paq.push(['trackPageView']) }, 500);

    } catch (e) {
        console.log(e);
    }
  }, [location]);

}

function Switcher(props){

  usePageViews();

  return(
    <Switch>
      <Route exact path="/eta" component={Eta} />
      <Route exact path="/turn" component={Turn} />
      <Route exact path="/cfm" component={Cfm} />
      <Route exact path="/source" component={Source} />
      <Route exact path="/" component={Welcome} />
    </Switch>
  );

}


const NavComponent = () => {

  return(

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>

        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>Seismic Calculator</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">

          <Nav className="mr-auto">

            <LinkContainer to="/eta">
              <Nav.Link>ETA</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/turn">
              <Nav.Link>Turn</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/source">
              <Nav.Link>Source</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cfm">
              <Nav.Link>CFM</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>

      </Navbar>

  );

}


const App = (props) => {

  return (
      <Router>
        <NavComponent />

        <Container fluid className="py-5" id="page">
          <Container className="wrapper z-depth-1">
            <Switcher />
          </Container>
        </Container>

        <Footer />
      </Router>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
