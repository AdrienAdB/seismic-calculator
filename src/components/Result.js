import React from 'react';
import { Container } from 'react-bootstrap';

export default function Result(props){

  return(
    <Container className="border py-3 my-5 box z-depth-1 result">
      <p className="text-center title">
        {props.title}
      </p>
      <p className="text-center value">
        {props.value}
      </p>
      <p className="text-center description">
        {props.description}
      </p>
    </Container>
  );

}
