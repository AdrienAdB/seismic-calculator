import React from 'react';
import { Container } from 'react-bootstrap';

export default function Header(props){

  return(
    <div className="header pb-3 pt-3 d-flex flex-column align-items-center">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );

}
