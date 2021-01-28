import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import PageHeader from '../components/PageHeader';
import Contributors from '../components/Contributors';


const Welcome = () => {

  return(

      <Container>

      <PageHeader title="Seismic Calculator">
        <p className="lead">In need of another formula? Post an request on <a href="https://github.com/AdrienAdB/seismic-calculator/issues">GitHub</a></p>
      </PageHeader>

      <ul className="links">

        <li>
          <LinkContainer to="/eta">
            <Nav.Link>ETA Estimated Arrival Time</Nav.Link>
          </LinkContainer>
        </li>

        <li>
          <LinkContainer to="/turn">
            <Nav.Link>Turn radius & turn rate</Nav.Link>
          </LinkContainer>
        </li>

        <li>
          <LinkContainer to="/source">
            <Nav.Link>Airgun chamber water testing</Nav.Link>
          </LinkContainer>
        </li>

        <li>
          <LinkContainer to="/cfm">
            <Nav.Link>Compressor air delivery. Cubic Foot per Minute. Cubic Meter per Hour.</Nav.Link>
          </LinkContainer>
        </li>

      </ul>

      <hr className="hr my-5"/>

      <Contributors />

      <div className="pt-5">
        Powered by <a className="text-orange" href="https://acte.ltd">ACTE Technology Co., Ltd.</a>
      </div>

      </Container>

  );

}

export default Welcome;
