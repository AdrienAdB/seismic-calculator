/*
SpeedForm

Calculate interval cycle time from shot interval distance and speed (knts)

*/

import React from 'react';

import {Box, Grid} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { InputLabel, Input } from '@material-ui/core';

import Result from './Result';

const defaultValues = {
  distance: '25',
  speedK: '5',
}


export default function SpeedForm(){

  const [distance, setDistance] = useState(defaultValues.distance);
  const [speedK, setSpeedK] = useState(defaultValues.speedK);
  const [speedMs, setSpeedMs] = useState(null);
  const [speedKmH, setSpeedKmH] = useState(null);

  const [time, setTime] = useState(null);
  var kntsToMs = 0.5144447;

  useEffect(() => {
    var sMs = speedK*kntsToMs;
    var sKmS = sMs*3.6;

    var t;
    if(distance){
      t = (distance/sMs).toFixed(1);
    } else {
      t = 'N/A';
    }

    setTime(t);
    setSpeedMs(sMs.toFixed(2));
    setSpeedKmH(sKmS.toFixed(0));

  }, [speedK, distance, kntsToMs]);

  return (
    <div>
    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
          <InputLabel htmlFor="distance">Shot Interval (m)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="distance"
            placeholder="Enter distance between shots..."
            value={distance}
            onInput={(e) => setDistance(e.target.value)}
            variant="outlined"/>
      </Grid>

      <Grid item xs={12} md={6}>
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
    </Grid>

    <Box pt={8}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <Result
              title="Interval cycle time"
              value={time+" s"}
              description='between shot'/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Result
              title="Speed"
              value={speedMs+' m/s'}
              description={speedKmH+' km/h'}/>
        </Grid>
      </Grid>
    </Box>
    </div>


  );
}
