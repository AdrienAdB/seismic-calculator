/*
TurnForm
*/

import React from 'react';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import PageHeader from '../components/PageHeader';
import Result from '../components/Result';

const defaultValues = {
  speedK: 5,
  turn: {
    rate: 9.8,
    radius: 900,
  }
}

export default function TurnForm(){

  //speed in knots
  const [speedK, setSpeedK] = useState(localStorage.getItem('speedK') || defaultValues.speedK);

  //turn radius in meters
  const [radius, setRadius] = useState(localStorage.getItem('turnForm.radius') || defaultValues.turn.radius);

  //turn rate in deg/min
  const [rate, setRate] = useState(localStorage.getItem('turnForm.rate') || defaultValues.turn.rate);


  //Maths
  const pi = Math.PI;

  const [focus, setFocus] = useState(null);

  function handleFocus(e){
    setFocus(e.target.name);
    e.target.select();
  }

  // set turn rate and radius
  // prevent infinite loop with input focus
  useEffect(() => {

    function getTurnRate(){
      var rate = 360*speedK*1852/(radius*120*pi);
      localStorage.setItem('turnForm.rate', rate.toFixed(1));
      return rate;
    }

    function getTurnRadius(){
      var radius = 360/((2*pi*rate/(speedK*1852))*60);
      localStorage.setItem('turnForm.radius', radius.toFixed(0));
      return radius;
    }

    if(focus && speedK){

      switch (focus) {
        case 'radius':
          setRate(getTurnRate().toFixed(1));
          break;
        case 'rate':
          setRadius(getTurnRadius().toFixed(0));
          break;
        case 'speedK':
          localStorage.setItem('speedK', speedK);
          setRate(getTurnRate().toFixed(1));
          break;
        default:

      }

    }
  }, [speedK, rate, radius, focus, pi]);


  return (
    <Container>

      <PageHeader title="Turn rate and radius" />

      <Row>
        <Col md={4}>
            <Form.Label htmlFor="speedK">Speed BSP (knts)</Form.Label>
            <Form.Control
              fullWidth
              type="number"
              name="speedK"
              placeholder="Enter speed in knots..."
              step={0.1}
              min={0}
              value={speedK}
              onChange={(e) => setSpeedK(e.target.value)}
              onFocus={handleFocus}
              variant="outlined"/>
        </Col>

        <Col md={4}>
            <Form.Label htmlFor="radius">Turn Radius (m)</Form.Label>
            <Form.Control
              fullWidth
              type="number"
              name="radius"
              placeholder="Enter turn radius in m..."
              step={100}
              min={0}
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              onFocus={handleFocus}
              variant="outlined"/>
        </Col>

        <Col md={4}>
            <Form.Label htmlFor="rate">Turn Rate (deg/min)</Form.Label>
            <Form.Control
              fullWidth
              type="number"
              name="rate"
              placeholder="Enter turn rate in deg/min..."
              step={1}
              min={0}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onFocus={handleFocus}
              variant="outlined"/>
        </Col>
      </Row>

      <Row pt={8}>
          <Col item xs={12} md={6}>
              <Result
                title="Radius"
                value={radius+' m'}
                description=''/>
          </Col>
          <Col item xs={12} md={6}>
              <Result
                title="Rate"
                value={rate+'°/min'}
                description=''/>
          </Col>
      </Row>
    </Container>


  );
}
