/*
TurnForm
*/

import React from 'react';

import {Box, Grid} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { InputLabel, Input } from '@material-ui/core';

import Result from './Result';

const defaultValues = {
  speedK: 5,
  turn: {
    rate: '5.0',
    radius: 1769,
  }
}


export default function TurnForm(){

  //speed in knots
  const [speedK, setSpeedK] = useState(defaultValues.speedK);

  //turn radius in meters
  const [radius, setRadius] = useState(defaultValues.turn.radius);

  //turn rate in deg/min
  const [rate, setRate] = useState(defaultValues.turn.rate);


  //Maths
  const pi = Math.PI;

  const [focus, setFocus] = useState(null);


  // set turn rate
  useEffect(() => {

    if( speedK && radius && focus && (focus !== 'rate') ){
      var turnRate = 360*speedK*1852/(radius*120*pi);
      setRate(turnRate.toFixed(1));
    }

  }, [speedK, radius, focus, pi]);


  // set turn radius
  useEffect(() => {

    if(speedK && rate && (focus !== 'radius') ){
      var turnRadius = 360/((2*pi*rate/(speedK*1852))*60);
      setRadius(turnRadius.toFixed(0));
    }

  }, [speedK, rate, focus, pi]);



  return (
    <div>
    <Grid container spacing={3}>


      <Grid item xs={12}>
          <InputLabel htmlFor="speedK">Speed BSP (knts)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="speedK"
            placeholder="Enter speed in knots..."
            inputProps={{
              min: '0',
              step: '0.1'
            }}
            value={speedK}
            onChange={(e) => setSpeedK(e.target.value)}
            variant="outlined"/>
      </Grid>

      <Grid item xs={12}>
          <InputLabel htmlFor="radius">Turn Radius (m)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="radius"
            placeholder="Enter turn radius in m..."
            inputProps={{
              min: '0',
              step: '100'
            }}
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            variant="outlined"/>
      </Grid>

      <Grid item xs={12}>
          <InputLabel htmlFor="rate">Turn Rate (deg/min)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="rate"
            placeholder="Enter turn rate in deg/min..."
            inputProps={{
              min: '0',
              step: '1'
            }}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            variant="outlined"/>
      </Grid>
    </Grid>



    <Box pt={8}>
      <Grid container spacing={1}>

        <Grid item xs={12} md={6}>
            <Result
              title="Radius"
              value={radius+' m'}
              description=''/>

        </Grid>
        <Grid item xs={12} md={6}>
            <Result
              title="Rate"
              value={rate+'°/min'}
              description=''/>
        </Grid>

      </Grid>
    </Box>
    </div>


  );
}
