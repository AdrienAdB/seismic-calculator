import React from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Result from '../components/Result';
import PageHeader from '../components/PageHeader';

import { displayETA, getETA, getTimeFromArrival } from '../calculations/eta';
import { secondsToTime, kntsToMs } from '../calculations/utils';

const defaultValues = {
  distance: 1000,
  speedK: 5
}

export default function ETAForm(){

  const [distance, setDistance] = useState(localStorage.getItem('ETAForm.distance') || defaultValues.distance);

  //speed in knots
  const [speedK, setSpeedK] = useState(localStorage.getItem('speedK') || defaultValues.speedK);

  //speed in meter/second
  const [speedMs, setSpeedMs] = useState(null);

  //speed on km/h
  const [speedKmH, setSpeedKmH] = useState(null);

  //ETA time
  const [eta, setETA] = useState(null);

  //string time
  const [time, setTime] = useState(null);

  //calculate on speedK
  useEffect(() => {

    //set time on speed
    var sMs = speedK*kntsToMs;
    var sKmS = sMs*3.6;

    setSpeedMs(sMs.toFixed(2));
    setSpeedKmH(sKmS.toFixed(0));

    calculateTime();
    localStorage.setItem('speedK', speedK);

  // eslint-disable-next-line
  }, [speedK]);


  //set time on distance
  useEffect(() => {

    calculateTime();
    localStorage.setItem('ETAForm.distance', distance);

  // eslint-disable-next-line
  }, [distance]);

  //run onComponentMount
  useEffect(() => {
    calculateTime();

  // eslint-disable-next-line
  }, []);

  function handleFocus(e){
    e.target.select();
  }

  function calculateTime(){
    if(distance && speedK){
      var t = getTimeFromArrival(distance, speedK);
      var eta = getETA(t);
      setETA(eta);
      setTime( secondsToTime(t) );
    } else {
      setTime('N/A');
    }
  }


  return (
    <Container>

    <PageHeader title="ETA Estimated Arrival Time" />

    <Row container spacing={3}>

      <Col item xs={12} md={6}>
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

      <Col item xs={12} md={6}>
          <Form.Label htmlFor="distance">Distance (m)</Form.Label>
          <Form.Control
            fullWidth
            type="number"
            name="distance"
            placeholder="Enter distance between shots..."
            step={100}
            min={0}
            value={distance}
            onInput={(e) => setDistance(e.target.value)}
            onFocus={handleFocus}
            variant="outlined"/>
      </Col>

    </Row>

    <Row pt={8}>
        <Col item xs={12} md={6}>
            <Result
              title="Time"
              value={time}
              description={displayETA(eta)}/>
        </Col>
        <Col item xs={12} md={6}>
            <Result
              title="Speed"
              value={speedMs+' m/s'}
              description={speedKmH+' km/h'}/>
        </Col>
    </Row>
    </Container>


  );
}
