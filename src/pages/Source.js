import React from 'react';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import PageHeader from '../components/PageHeader';
import Result from '../components/Result';

const mlToCuin = 0.06102;

const defaultValues = {
  volume: '---.-',
  manufacturer: 'bolt',
  type: '1900',
  ml: '',
  formula: 'V = -- - -.----- - --'
}

export default function BoltVolumeForm(){


  const [volume, setVolume] = useState(defaultValues.volume);
  const [manufacturer] = useState(defaultValues.manufacturer);
  const [type, setType] = useState(defaultValues.type);
  const [ml, setMl] = useState(defaultValues.ml);
  const [formula, setFormula] = useState(defaultValues.formula);

  useEffect(() => {

    if(manufacturer === 'bolt' && ml){
      if(type === '1900'){
          setVolume( ((ml*mlToCuin)+8.9).toFixed(1) );
          setFormula( 'V = ml x '+mlToCuin+' + 8.9' );
      }

      if(type === '1500'){
          setVolume( ((ml*mlToCuin)+30).toFixed(1) );
          setFormula( 'V = ml x '+mlToCuin+' + 30' );
      }

      if(type === '1519'){
          setVolume( ((ml*mlToCuin)+35).toFixed(1) );
          setFormula( 'V = ml x '+mlToCuin+' + 35' );
      }
    }

  }, [manufacturer, type, ml]);


  function handleFocus(e){
    e.target.select();
  }

  return (

    <Container>

      <PageHeader title="Airgun chamber water testing" />

      <Row>
        <Col md={4}>
          <Form.Label htmlFor="manufacturer">Manufacturer</Form.Label>
          <Form.Control
              as="select"
              fullWidth
              label="Manufacturer"
              name="manufacturer"
              value={manufacturer}
            >
              <option disabled>-- select manufacturer --</option>
              <option value="bolt" selected>Bolt</option>
          </Form.Control>
        </Col>



        <Col md={4}>
          <Form>
          <Form.Label htmlFor="type">Type</Form.Label>
          <Form.Control
            aria-label="type"
            as="select"
            name="type"
            type="radio"
            onChange={(e) => setType(e.target.value)}
            value={type}>
              <option value="1900">1900LLXT</option>
              <option value="1500">1500</option>
              <option value="1519">1500 (+1519 ring)</option>
          </Form.Control>
          </Form>
        </Col>

        <Col md={4}>
            <Form.Label htmlFor="ml">Chamber volume (ml)</Form.Label>
            <Form.Control
              fullWidth
              type="number"
              name="ml"
              placeholder="Enter chamber volume in ml.."
              step={10}
              min={0}
              value={ml}
              onChange={(e) => setMl(e.target.value)}
              onFocus={handleFocus}
              variant="outlined"/>
        </Col>

        <Col md={12}>
            <Result
              title="Volume"
              value={volume+"cu.in"}
              description={formula}/>
        </Col>
      </Row>
    </Container>

  );
}
