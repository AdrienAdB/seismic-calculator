import React from 'react';
import { Container } from 'react-bootstrap';
import ReloadButton from './ReloadButton';
import PoweredBy from './PoweredBy';

export default function Footer(props){

  return(
    <footer className="pt-5 pb-2 w-100 d-flex flex-column align-items-center justify-content-center">
      <div>An <a href="https://github.com/AdrienAdB/seismic-calculator">open source project</a> made with ReactJS.</div>
      <PoweredBy date />
      <ReloadButton />
    </footer>

  );

}
