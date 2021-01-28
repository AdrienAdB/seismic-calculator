import React from 'react';
import { Container } from 'react-bootstrap';
import ReloadButton from './ReloadButton';

export default function Footer(props){

  return(
    <footer className="pt-5 pb-2 w-100 d-flex flex-column align-items-center justify-content-center">
      <div>An <a href="https://github.com/AdrienAdB/seismic-calculator">open source project</a> made with ReactJS.</div>
      <div>Powered by <a className="text-orange" href="https://acte.ltd">ACTE Technology Co. Ltd.</a> {new Date().getFullYear()}</div>
      <ReloadButton />
    </footer>

  );

}
