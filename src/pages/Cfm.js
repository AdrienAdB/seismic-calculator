import React from 'react';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import PageHeader from '../components/PageHeader';
import Result from '../components/Result';

import { getVolumePerMinute } from '../calculations/cfm';
import { mlToCuin } from '../calculations/utils';

const defaultValues = {
  subarray: 2400,
  interval: 12.5,
  speedK: 5,
  temperature: 20
}

export const Cfm = () => {

  //sub-array volume
  const [volume, setVolume] = useState(localStorage.getItem('subarray') || defaultValues.subarray);

  //speed in knots
  const [speedK, setSpeedK] = useState(localStorage.getItem('speedK') || defaultValues.speedK);

  //SP interval
  const [interval, setInterval] = useState(localStorage.getItem('cfm.interval') || defaultValues.interval);

  //Inlet temperature
  const [temperature, setTemperature] = useState(localStorage.getItem('cfm.temperature') || defaultValues.temperature);


  //cubic foot per minute
  const [cfm, setCfm] = useState(null);

  //cubic meter per hour
  const [cmh, setCmh] = useState(null);


  function handleFocus(e){
    e.target.select();
  }


  useEffect(() => {

    let v = getVolumePerMinute(speedK, interval, volume);
    setCfm(v.cfm);
    setCmh(v.cmh);

    localStorage.setItem('speedK', speedK);
    localStorage.setItem('cfm.interval', interval);
    localStorage.setItem('subarray', volume);


  }, [volume, speedK, interval]);

  return (

    <Container>

      <PageHeader title="CFM: Cubic Foot per Minute - Compressor air delivery"/>

      <Row>


      <Col md={3}>
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


      <Col md={3}>
          <Form.Label htmlFor="interval">SP Interval (m)</Form.Label>
          <Form.Control
            fullWidth
            type="number"
            name="interval"
            placeholder="Enter distance between shots..."
            step={1}
            min={0}
            value={interval}
            onInput={(e) => setInterval(e.target.value)}
            onFocus={handleFocus}
            variant="outlined"/>
      </Col>

      <Col md={3}>
          <Form.Label htmlFor="volume">Sub-array volume (cu.in)</Form.Label>
          <Form.Control
            fullWidth
            type="number"
            name="volume"
            placeholder="Enter sub-array volume in cu.in.."
            step={10}
            min={0}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            onFocus={handleFocus}
            variant="outlined"/>
      </Col>

      <Col md={3}>
          <Form.Label htmlFor="temperature">Air Inlet Temperature (°C)</Form.Label>
          <Form.Control
            fullWidth
            type="number"
            name="temperature"
            placeholder="Enter inlet air temperature"
            disabled
            step={5}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            onFocus={handleFocus}
            variant="outlined"/>
      </Col>

        <Col md={6}>
            <Result
              title="Cubic foot per minute"
              value={cfm+" foot³/min"}
              description=""/>
        </Col>
        <Col md={6}>
            <Result
              title="Cubic meter per hour"
              value={cmh+" m³/hour"}
              description=""/>
        </Col>
      </Row>

    </Container>

  );
}


export default Cfm;
