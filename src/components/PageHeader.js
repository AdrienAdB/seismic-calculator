import React from 'react';
import { Container } from 'react-bootstrap';

export default function Header(props){

  return(
    <div className="text-orange pb-5 pt-3">
      <h2 className="pb-3">{props.title}</h2>
      {props.children}
      <hr />
    </div>
  );

}
